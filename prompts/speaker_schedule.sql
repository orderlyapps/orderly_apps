create table public.congregations (
    id uuid not null default gen_random_uuid (),
    name text not null default 'Unnamed' :: text,
    created_by uuid not null default auth.uid (),
    created_at timestamp with time zone not null default (now() at time zone 'utc' :: text),
    updated_by uuid not null default auth.uid (),
    updated_at timestamp with time zone not null default (now() at time zone 'utc' :: text),
    constraint congregations_pkey primary key (id),
    constraint congregations_updated_by_fkey foreign key (updated_by) references users (id),
    constraint congregations_created_by_fkey foreign key (created_by) references users (id)
) tablespace pg_default;

create table public.speakers_incoming (
    speaker_id uuid not null default gen_random_uuid (),
    congregation_id uuid not null default gen_random_uuid (),
    outline_id text not null default gen_random_uuid (),
    updated_at timestamp with time zone not null default (now() at time zone 'utc' :: text),
    updated_by uuid not null default auth.uid (),
    week_id date not null,
    constraint speakers_incoming_pkey primary key (congregation_id, week_id),
    constraint incoming_speakers_updated_by_fkey foreign key (updated_by) references users (id),
    constraint incoming_speakers_outline_id_fkey foreign key (outline_id) references outlines (id) on delete cascade,
    constraint incoming_speakers_congregation_id_fkey foreign key (congregation_id) references congregations (id) on delete cascade,
    constraint speakers_incoming_speaker_id_outline_id_fkey foreign key (speaker_id, outline_id) references speaker_outlines (speaker_id, outline_id) on delete cascade
) tablespace pg_default;

create table public.speakers_outgoing (
    speaker_id uuid not null default gen_random_uuid (),
    congregation_id uuid not null default gen_random_uuid (),
    outline_id text not null default gen_random_uuid (),
    updated_at timestamp with time zone not null default (now() at time zone 'utc' :: text),
    updated_by uuid not null default auth.uid (),
    week_id date not null,
    constraint outgoing_speakers_pkey primary key (speaker_id, week_id),
    constraint outgoing_speakers_congregation_id_fkey foreign key (congregation_id) references congregations (id) on delete cascade,
    constraint outgoing_speakers_outline_id_fkey foreign key (outline_id) references outlines (id) on delete cascade,
    constraint outgoing_speakers_updated_by_fkey foreign key (updated_by) references users (id),
    constraint speakers_outgoing_speaker_id_outline_id_fkey foreign key (speaker_id, outline_id) references speaker_outlines (speaker_id, outline_id) on delete cascade
) tablespace pg_default;

create table public.outlines (
    id text not null,
    theme text not null,
    constraint outlines_pkey primary key (id)
) tablespace pg_default;

create table public.users (
    id uuid not null default gen_random_uuid (),
    display_name text null,
    first_name text null,
    middle_name text null,
    last_name text null,
    congregation_id uuid null,
    created_at timestamp with time zone not null default (now() at time zone 'utc' :: text),
    updated_at timestamp with time zone not null default (now() at time zone 'utc' :: text),
    updated_by uuid not null default auth.uid (),
    created_by uuid not null default auth.uid (),
    auth boolean not null default false,
    constraint users_pkey primary key (id),
    constraint users_updated_by_fkey foreign key (updated_by) references users (id),
    constraint users_created_by_fkey foreign key (created_by) references users (id),
    constraint users_congregation_id_fkey foreign key (congregation_id) references congregations (id) on delete
    set
        null,
        constraint users_id_fkey foreign key (id) references auth.users (id) on delete cascade
) tablespace pg_default;

create table public.speaker_outlines (
    outline_id text not null,
    speaker_id uuid not null default gen_random_uuid (),
    constraint speaker_outlines_pkey primary key (outline_id, speaker_id),
    constraint speaker_outlines_outline_id_fkey foreign key (outline_id) references outlines (id) on delete cascade,
    constraint speaker_outlines_speaker_id_fkey foreign key (speaker_id) references users (id) on delete cascade
) tablespace pg_default;

prompt is below...i am using postgres.

create a view called speaker_schedule that 
creates a unique row for each unique week_id found in the incoming and outgoing speakers tables and for each congregation

each row should have the following columns...

week_id: all unique week_ids found in the incoming and outgoing speakers tables for each congregation
congregation_id: the id of the congregation in the incoming and outgoing speakers tables


speaker_details: an object in the shape 
    id: the speakers user id

    outline: based on the outline_id from incoming_speakers, an object in the shape 
        {id: the outlines id, 
        theme: the outlines theme}

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

    visiting: a boolean indicating whether the speakers congregation_id matches the rows congregation_id

    speaker_confirmed: a boolean indicating whether the there is a matching row in the speakers_incoming and the speakers_outgoing table. 

            there is a match if a row can be found in the incoming speakers table where week_id, speaker_id and congregation_id matches 
            a row  in the outgoing speakers table where week_id, speaker_id and the speakers congregation_id matches
            get the speakers congregation_id by matching the incoming speakers id in the user table
            then user.congregation_id should match speakers_outgoing.congregation_id
            
         

    outline_confirmed: a boolean indicating whether the there is a matching row in the speakers_incoming and the speakers_outgoing table.

            there is a match if a row can be found in the incoming speakers table where week_id, speaker_id, outline_id and congregation_id matches 
            a row  in the outgoing speakers table where week_id, speaker_id, outline_id and the speakers congregation_id matches
            get the speakers congregation_id by matching the incoming speakers id in the user table
            then user.congregation_id should match speakers_outgoing.congregation_id

         match the object by first finding the speakers_id in the speakers_incoming table where week_id and congregation_id are matching.
         then match speakers_incoming.speaker_id to users.id in the users table
         then match users.congregation_id to congregations.id in the congregations table

         to create the outline match the speakers_id in the speakers_incoming table where week_id and congregation_id are matching.
         then match speakers_incoming.speaker_id to outlines.id in the outlines table

         to create the outlines array first 
         match speakers_incoming.speaker_id to speaker_outlines.speaker_id in the speaker_outlines table
         match speaker_outlines.outline_id to outlines.id in the outlines table


ignore the rest of this prompt...


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




