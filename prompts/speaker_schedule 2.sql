create view
  public.speaker_schedule as
with
  all_weeks as (
    select distinct
      combined_weeks.week_id,
      combined_weeks.congregation_id
    from
      (
        select
          speakers_incoming.week_id,
          speakers_incoming.congregation_id
        from
          speakers_incoming
        union
        select
          speakers_outgoing.week_id,
          speakers_outgoing.congregation_id
        from
          speakers_outgoing
      ) combined_weeks
  )
select
  aw.week_id,
  aw.congregation_id,
  jsonb_build_object(
    'id',
    u.id,
    'outline',
    jsonb_build_object('id', o.id, 'theme', o.theme),
    'name',
    jsonb_build_object(
      'first_name',
      u.first_name,
      'last_name',
      u.last_name,
      'middle_name',
      u.middle_name,
      'display_name',
      u.display_name
    ),
    'congregation',
    jsonb_build_object('id', c.id, 'name', c.name),
    'outlines',
    (
      select
        jsonb_agg(
          jsonb_build_object('id', "out".id, 'theme', "out".theme)
        ) as jsonb_agg
      from
        speaker_outlines so
        join outlines "out" on so.outline_id = "out".id
      where
        so.speaker_id = si.speaker_id
    ),
    'visiting',
    case
      when u.congregation_id <> aw.congregation_id then true
      else false
    end,
    'speaker_confirmed',
    (
      select
        (
          exists (
            select
              1
            from
              speakers_outgoing so
            where
              so.week_id = si.week_id
              and so.speaker_id = si.speaker_id
              and so.congregation_id = u.congregation_id
          )
        ) as "exists"
    ),
    'outline_confirmed',
    (
      select
        (
          exists (
            select
              1
            from
              speakers_outgoing so
            where
              so.week_id = si.week_id
              and so.speaker_id = si.speaker_id
              and so.outline_id = si.outline_id
              and so.congregation_id = u.congregation_id
          )
        ) as "exists"
    )
  ) as speaker_details
from
  all_weeks aw
  left join speakers_incoming si on aw.week_id = si.week_id
  and aw.congregation_id = si.congregation_id
  left join users u on si.speaker_id = u.id
  left join congregations c on u.congregation_id = c.id
  left join outlines o on si.outline_id = o.id;




add to the view:


outgoing_speakers: an array of objects in the shape of...
    id: the speakers user id

    name: an object in the shape 
    
        {first_name: the speakers first name, 
        last_name: the speakers last name, 
        middle_name: the speakers middle name, 
        display_name: the speakers display name}

    congregation: an object in the shape 
        {id: the speakers congregation id, 
        name: the name of the speakerscongregation}

    outlines: an array of the speakers outlines in the shape 
        {id: the outlines id, 
        theme: the outlines theme}

         match each object by first finding the speakers_id in each row of the outgoing_speakers table with matching week_id and congregation_id. 
         then match outgoing_speakers.speaker_id to users.id in the users table
         then match users.congregation_id to congregations.id in the congregations table

         to create the outlines array first 
         match outgoing_speakers.speaker_id to speaker_outlines.speaker_id in the speaker_outlines table
         match speaker_outlines.outline_id to outlines.id in the outlines table




