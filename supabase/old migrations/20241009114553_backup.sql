revoke delete on table "public"."public_talks" from "anon";

revoke insert on table "public"."public_talks" from "anon";

revoke references on table "public"."public_talks" from "anon";

revoke select on table "public"."public_talks" from "anon";

revoke trigger on table "public"."public_talks" from "anon";

revoke truncate on table "public"."public_talks" from "anon";

revoke update on table "public"."public_talks" from "anon";

revoke delete on table "public"."public_talks" from "authenticated";

revoke insert on table "public"."public_talks" from "authenticated";

revoke references on table "public"."public_talks" from "authenticated";

revoke select on table "public"."public_talks" from "authenticated";

revoke trigger on table "public"."public_talks" from "authenticated";

revoke truncate on table "public"."public_talks" from "authenticated";

revoke update on table "public"."public_talks" from "authenticated";

revoke delete on table "public"."public_talks" from "service_role";

revoke insert on table "public"."public_talks" from "service_role";

revoke references on table "public"."public_talks" from "service_role";

revoke select on table "public"."public_talks" from "service_role";

revoke trigger on table "public"."public_talks" from "service_role";

revoke truncate on table "public"."public_talks" from "service_role";

revoke update on table "public"."public_talks" from "service_role";

alter table "public"."public_talks" drop constraint "public_talks_congregation_id_fkey";

alter table "public"."public_talks" drop constraint "public_talks_speaker_id_fkey";

alter table "public"."public_talks" drop constraint "unique_week_congregation_combination";

drop view if exists "public"."schedule";

drop view if exists "public"."publishers";

drop view if exists "public"."incoming_speakers";

drop view if exists "public"."outgoing_speakers";

alter table "public"."public_talks" drop constraint "public_talks_pkey";

drop index if exists "public"."public_talks_pkey";

drop index if exists "public"."unique_week_congregation_combination";

drop table "public"."public_talks";

create table "public"."public_talks_speaker" (
    "week" date not null,
    "speaker_id" uuid not null default gen_random_uuid(),
    "congregation_id" uuid not null default gen_random_uuid(),
    "outline_id" text
);


create table "public"."speaker_availability" (
    "speaker_id" uuid not null default gen_random_uuid(),
    "availability" smallint not null default '0'::smallint
);


create table "public"."speaker_outlines" (
    "speaker_id" uuid not null default gen_random_uuid(),
    "outline_id" text not null default gen_random_uuid()
);


alter table "public"."speaker_outlines" enable row level security;

alter table "public"."outlines" disable row level security;

alter table "public"."people" drop column "outlines";

alter table "public"."people" disable row level security;

CREATE UNIQUE INDEX speaker_availability_pkey ON public.speaker_availability USING btree (speaker_id);

CREATE UNIQUE INDEX speaker_outlines_pkey ON public.speaker_outlines USING btree (speaker_id, outline_id);

CREATE UNIQUE INDEX public_talks_pkey ON public.public_talks_speaker USING btree (week, speaker_id);

CREATE UNIQUE INDEX unique_week_congregation_combination ON public.public_talks_speaker USING btree (week, congregation_id);

alter table "public"."public_talks_speaker" add constraint "public_talks_pkey" PRIMARY KEY using index "public_talks_pkey";

alter table "public"."speaker_availability" add constraint "speaker_availability_pkey" PRIMARY KEY using index "speaker_availability_pkey";

alter table "public"."speaker_outlines" add constraint "speaker_outlines_pkey" PRIMARY KEY using index "speaker_outlines_pkey";

alter table "public"."public_talks_speaker" add constraint "public_talks_congregation_id_fkey" FOREIGN KEY (congregation_id) REFERENCES congregations(id) not valid;

alter table "public"."public_talks_speaker" validate constraint "public_talks_congregation_id_fkey";

alter table "public"."public_talks_speaker" add constraint "public_talks_outline_id_fkey" FOREIGN KEY (outline_id) REFERENCES outlines(id) ON UPDATE CASCADE ON DELETE CASCADE not valid;

alter table "public"."public_talks_speaker" validate constraint "public_talks_outline_id_fkey";

alter table "public"."public_talks_speaker" add constraint "public_talks_speaker_id_fkey" FOREIGN KEY (speaker_id) REFERENCES people(id) not valid;

alter table "public"."public_talks_speaker" validate constraint "public_talks_speaker_id_fkey";

alter table "public"."public_talks_speaker" add constraint "unique_week_congregation_combination" UNIQUE using index "unique_week_congregation_combination";

alter table "public"."speaker_availability" add constraint "speaker_availability_speaker_id_fkey" FOREIGN KEY (speaker_id) REFERENCES people(id) ON UPDATE CASCADE ON DELETE CASCADE not valid;

alter table "public"."speaker_availability" validate constraint "speaker_availability_speaker_id_fkey";

alter table "public"."speaker_outlines" add constraint "speaker_outlines_outline_id_fkey" FOREIGN KEY (outline_id) REFERENCES outlines(id) ON UPDATE CASCADE ON DELETE CASCADE not valid;

alter table "public"."speaker_outlines" validate constraint "speaker_outlines_outline_id_fkey";

alter table "public"."speaker_outlines" add constraint "speaker_outlines_speaker_id_fkey" FOREIGN KEY (speaker_id) REFERENCES people(id) ON UPDATE CASCADE ON DELETE CASCADE not valid;

alter table "public"."speaker_outlines" validate constraint "speaker_outlines_speaker_id_fkey";

create or replace view "public"."publishers" as  SELECT people.id,
    people.updated_at,
    people.username,
    people.full_name,
    people.avatar_url,
    people.website,
    people.first_name,
    people.middle_name,
    people.last_name,
    people.display_name,
    people.created_at,
    people.congregation_id,
        CASE
            WHEN (admins.congregation_id IS NULL) THEN false
            ELSE true
        END AS is_admin,
    congregations.name AS congregation_name,
    COALESCE(( SELECT count(*) AS count
           FROM admins admins_1
          WHERE (admins_1.person_id = people.id)), (0)::bigint) AS admin_count,
    speaker_availability.availability AS speaker_availability,
    array_agg(outlines.id) AS outlines
   FROM (((((people
     LEFT JOIN speaker_outlines ON ((people.id = speaker_outlines.speaker_id)))
     LEFT JOIN speaker_availability ON ((people.id = speaker_availability.speaker_id)))
     LEFT JOIN congregations ON ((people.congregation_id = congregations.id)))
     LEFT JOIN admins ON (((people.id = admins.person_id) AND (people.congregation_id = admins.congregation_id))))
     LEFT JOIN outlines ON ((outlines.id = speaker_outlines.outline_id)))
  GROUP BY people.id, admins.congregation_id, congregations.name, speaker_availability.availability;


create or replace view "public"."public_talk_details" as  SELECT pt.week,
    pt.speaker_id,
    pt.congregation_id,
    pt.outline_id,
    p.congregation_id AS home_congregation_id,
    p.congregation_name AS home_congregation_name,
    p.first_name,
    p.middle_name,
    p.last_name,
    p.display_name,
    o.theme,
    c.name AS congregation_name
   FROM (((public_talks_speaker pt
     LEFT JOIN publishers p ON ((pt.speaker_id = p.id)))
     LEFT JOIN outlines o ON ((pt.outline_id = o.id)))
     LEFT JOIN congregations c ON ((pt.congregation_id = c.id)));


create or replace view "public"."speakers" as  SELECT publishers.id,
    publishers.updated_at,
    publishers.username,
    publishers.full_name,
    publishers.avatar_url,
    publishers.website,
    publishers.first_name,
    publishers.middle_name,
    publishers.last_name,
    publishers.display_name,
    publishers.created_at,
    publishers.congregation_id,
    publishers.is_admin,
    publishers.congregation_name,
    publishers.admin_count,
    publishers.speaker_availability,
    publishers.outlines
   FROM publishers
  WHERE (publishers.speaker_availability IS NOT NULL);


grant delete on table "public"."public_talks_speaker" to "anon";

grant insert on table "public"."public_talks_speaker" to "anon";

grant references on table "public"."public_talks_speaker" to "anon";

grant select on table "public"."public_talks_speaker" to "anon";

grant trigger on table "public"."public_talks_speaker" to "anon";

grant truncate on table "public"."public_talks_speaker" to "anon";

grant update on table "public"."public_talks_speaker" to "anon";

grant delete on table "public"."public_talks_speaker" to "authenticated";

grant insert on table "public"."public_talks_speaker" to "authenticated";

grant references on table "public"."public_talks_speaker" to "authenticated";

grant select on table "public"."public_talks_speaker" to "authenticated";

grant trigger on table "public"."public_talks_speaker" to "authenticated";

grant truncate on table "public"."public_talks_speaker" to "authenticated";

grant update on table "public"."public_talks_speaker" to "authenticated";

grant delete on table "public"."public_talks_speaker" to "service_role";

grant insert on table "public"."public_talks_speaker" to "service_role";

grant references on table "public"."public_talks_speaker" to "service_role";

grant select on table "public"."public_talks_speaker" to "service_role";

grant trigger on table "public"."public_talks_speaker" to "service_role";

grant truncate on table "public"."public_talks_speaker" to "service_role";

grant update on table "public"."public_talks_speaker" to "service_role";

grant delete on table "public"."speaker_availability" to "anon";

grant insert on table "public"."speaker_availability" to "anon";

grant references on table "public"."speaker_availability" to "anon";

grant select on table "public"."speaker_availability" to "anon";

grant trigger on table "public"."speaker_availability" to "anon";

grant truncate on table "public"."speaker_availability" to "anon";

grant update on table "public"."speaker_availability" to "anon";

grant delete on table "public"."speaker_availability" to "authenticated";

grant insert on table "public"."speaker_availability" to "authenticated";

grant references on table "public"."speaker_availability" to "authenticated";

grant select on table "public"."speaker_availability" to "authenticated";

grant trigger on table "public"."speaker_availability" to "authenticated";

grant truncate on table "public"."speaker_availability" to "authenticated";

grant update on table "public"."speaker_availability" to "authenticated";

grant delete on table "public"."speaker_availability" to "service_role";

grant insert on table "public"."speaker_availability" to "service_role";

grant references on table "public"."speaker_availability" to "service_role";

grant select on table "public"."speaker_availability" to "service_role";

grant trigger on table "public"."speaker_availability" to "service_role";

grant truncate on table "public"."speaker_availability" to "service_role";

grant update on table "public"."speaker_availability" to "service_role";

grant delete on table "public"."speaker_outlines" to "anon";

grant insert on table "public"."speaker_outlines" to "anon";

grant references on table "public"."speaker_outlines" to "anon";

grant select on table "public"."speaker_outlines" to "anon";

grant trigger on table "public"."speaker_outlines" to "anon";

grant truncate on table "public"."speaker_outlines" to "anon";

grant update on table "public"."speaker_outlines" to "anon";

grant delete on table "public"."speaker_outlines" to "authenticated";

grant insert on table "public"."speaker_outlines" to "authenticated";

grant references on table "public"."speaker_outlines" to "authenticated";

grant select on table "public"."speaker_outlines" to "authenticated";

grant trigger on table "public"."speaker_outlines" to "authenticated";

grant truncate on table "public"."speaker_outlines" to "authenticated";

grant update on table "public"."speaker_outlines" to "authenticated";

grant delete on table "public"."speaker_outlines" to "service_role";

grant insert on table "public"."speaker_outlines" to "service_role";

grant references on table "public"."speaker_outlines" to "service_role";

grant select on table "public"."speaker_outlines" to "service_role";

grant trigger on table "public"."speaker_outlines" to "service_role";

grant truncate on table "public"."speaker_outlines" to "service_role";

grant update on table "public"."speaker_outlines" to "service_role";


