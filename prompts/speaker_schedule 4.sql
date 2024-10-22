create view public.speaker_schedule as with all_weeks as (
    select
        distinct combined_weeks.week_id
    from
        (
            select
                speakers_incoming.week_id
            from
                speakers_incoming
            union
            select
                speakers_outgoing.week_id
            from
                speakers_outgoing
        ) combined_weeks
)
select
    aw.week_id,
    cg.id as congregation_id,
    cg.name as congregation_name,
    case
        when si.speaker_id is not null then jsonb_build_object(
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
                when u.congregation_id <> cg.id then true
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
                                and so.congregation_id = cg.id
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
                                and so.congregation_id = cg.id
                        )
                    ) as "exists"
            ),
            'preferred_outline',
            (
                select
                    json_build_object('id', po.id, 'theme', po.theme) as json_build_object
                from
                    speakers_outgoing so
                    left join outlines po on po.id = so.outline_id
                where
                    so.week_id = si.week_id
                    and so.speaker_id = si.speaker_id
                    and so.congregation_id = cg.id
            )
        )
        else null :: jsonb
    end as speaker_details,
    (
        select
            jsonb_agg(
                jsonb_build_object(
                    'id',
                    ou.id,
                    'name',
                    jsonb_build_object(
                        'first_name',
                        ou.first_name,
                        'last_name',
                        ou.last_name,
                        'middle_name',
                        ou.middle_name,
                        'display_name',
                        ou.display_name
                    ),
                    'congregation',
                    jsonb_build_object('id', oc.id, 'name', oc.name),
                    'outlines',
                    (
                        select
                            jsonb_agg(
                                jsonb_build_object('id', oo.id, 'theme', oo.theme)
                            ) as jsonb_agg
                        from
                            speaker_outlines oso
                            join outlines oo on oso.outline_id = oo.id
                        where
                            oso.speaker_id = so.speaker_id
                    ),
                    'outline',
                    jsonb_build_object('id', ogo.id, 'theme', ogo.theme)
                )
            ) as jsonb_agg
        from
            speakers_outgoing so
            join users ou on so.speaker_id = ou.id
            join congregations oc on so.congregation_id = oc.id
            join outlines ogo on so.outline_id = ogo.id
        where
            so.week_id = aw.week_id
            and ou.congregation_id = cg.id
    ) as outgoing_speakers
from
    all_weeks aw
    cross join congregations cg
    left join speakers_incoming si on aw.week_id = si.week_id
    and cg.id = si.congregation_id
    left join users u on si.speaker_id = u.id
    left join congregations c on u.congregation_id = c.id
    left join outlines o on si.outline_id = o.id;