create table "public"."outlines" (
    "id" text not null,
    "theme" text not null default ''::text
);


alter table "public"."outlines" enable row level security;

create table "public"."public_talks" (
    "week" date not null,
    "speaker_id" uuid not null default gen_random_uuid(),
    "congregation_id" uuid not null default gen_random_uuid()
);


CREATE UNIQUE INDEX outlines_pkey ON public.outlines USING btree (id);

CREATE UNIQUE INDEX public_talks_pkey ON public.public_talks USING btree (week, speaker_id);

CREATE UNIQUE INDEX unique_week_congregation_combination ON public.public_talks USING btree (week, congregation_id);

alter table "public"."outlines" add constraint "outlines_pkey" PRIMARY KEY using index "outlines_pkey";

alter table "public"."public_talks" add constraint "public_talks_pkey" PRIMARY KEY using index "public_talks_pkey";

alter table "public"."public_talks" add constraint "public_talks_congregation_id_fkey" FOREIGN KEY (congregation_id) REFERENCES congregations(id) not valid;

alter table "public"."public_talks" validate constraint "public_talks_congregation_id_fkey";

alter table "public"."public_talks" add constraint "public_talks_speaker_id_fkey" FOREIGN KEY (speaker_id) REFERENCES people(id) not valid;

alter table "public"."public_talks" validate constraint "public_talks_speaker_id_fkey";

alter table "public"."public_talks" add constraint "unique_week_congregation_combination" UNIQUE using index "unique_week_congregation_combination";

create or replace view "public"."incoming_speakers" as  SELECT pt.week,
    c.id AS congregation_id,
    c.name AS congregation_name,
    jsonb_build_object('speaker_id', p.id, 'first_name', p.first_name, 'last_name', p.last_name, 'middle_name', p.middle_name, 'display_name', p.display_name, 'congregation_id', p.congregation_id, 'congregation_name', p.congregation_name) AS public_talk_details
   FROM ((public_talks pt
     JOIN publishers p ON ((pt.speaker_id = p.id)))
     JOIN congregations c ON ((pt.congregation_id = c.id)));


create or replace view "public"."outgoing_speakers" as  SELECT pt.week,
    p.congregation_id,
    p.congregation_name,
    array_agg(jsonb_build_object('first_name', p.first_name, 'middle_name', p.middle_name, 'last_name', p.last_name, 'display_name', p.display_name, 'congregation_id', p.congregation_id, 'congregation_name', p.congregation_name)) AS details
   FROM (public_talks pt
     LEFT JOIN publishers p ON ((pt.speaker_id = p.id)))
  GROUP BY pt.week, p.congregation_id, p.congregation_name;


create or replace view "public"."schedule" as  SELECT incoming_speakers.week,
    incoming_speakers.congregation_id,
    incoming_speakers.congregation_name,
    incoming_speakers.public_talk_details,
    outgoing_speakers.details AS outgoing_speakers
   FROM (incoming_speakers
     JOIN outgoing_speakers ON ((incoming_speakers.week = outgoing_speakers.week)));


grant delete on table "public"."outlines" to "anon";

grant insert on table "public"."outlines" to "anon";

grant references on table "public"."outlines" to "anon";

grant select on table "public"."outlines" to "anon";

grant trigger on table "public"."outlines" to "anon";

grant truncate on table "public"."outlines" to "anon";

grant update on table "public"."outlines" to "anon";

grant delete on table "public"."outlines" to "authenticated";

grant insert on table "public"."outlines" to "authenticated";

grant references on table "public"."outlines" to "authenticated";

grant select on table "public"."outlines" to "authenticated";

grant trigger on table "public"."outlines" to "authenticated";

grant truncate on table "public"."outlines" to "authenticated";

grant update on table "public"."outlines" to "authenticated";

grant delete on table "public"."outlines" to "service_role";

grant insert on table "public"."outlines" to "service_role";

grant references on table "public"."outlines" to "service_role";

grant select on table "public"."outlines" to "service_role";

grant trigger on table "public"."outlines" to "service_role";

grant truncate on table "public"."outlines" to "service_role";

grant update on table "public"."outlines" to "service_role";

grant delete on table "public"."public_talks" to "anon";

grant insert on table "public"."public_talks" to "anon";

grant references on table "public"."public_talks" to "anon";

grant select on table "public"."public_talks" to "anon";

grant trigger on table "public"."public_talks" to "anon";

grant truncate on table "public"."public_talks" to "anon";

grant update on table "public"."public_talks" to "anon";

grant delete on table "public"."public_talks" to "authenticated";

grant insert on table "public"."public_talks" to "authenticated";

grant references on table "public"."public_talks" to "authenticated";

grant select on table "public"."public_talks" to "authenticated";

grant trigger on table "public"."public_talks" to "authenticated";

grant truncate on table "public"."public_talks" to "authenticated";

grant update on table "public"."public_talks" to "authenticated";

grant delete on table "public"."public_talks" to "service_role";

grant insert on table "public"."public_talks" to "service_role";

grant references on table "public"."public_talks" to "service_role";

grant select on table "public"."public_talks" to "service_role";

grant trigger on table "public"."public_talks" to "service_role";

grant truncate on table "public"."public_talks" to "service_role";

grant update on table "public"."public_talks" to "service_role";


