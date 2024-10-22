drop trigger if exists "handle_updated_at" on "public"."incoming_speakers";

drop trigger if exists "handle_updated_at" on "public"."outgoing_speakers";

revoke delete on table "public"."incoming_speakers" from "anon";

revoke insert on table "public"."incoming_speakers" from "anon";

revoke references on table "public"."incoming_speakers" from "anon";

revoke select on table "public"."incoming_speakers" from "anon";

revoke trigger on table "public"."incoming_speakers" from "anon";

revoke truncate on table "public"."incoming_speakers" from "anon";

revoke update on table "public"."incoming_speakers" from "anon";

revoke delete on table "public"."incoming_speakers" from "authenticated";

revoke insert on table "public"."incoming_speakers" from "authenticated";

revoke references on table "public"."incoming_speakers" from "authenticated";

revoke select on table "public"."incoming_speakers" from "authenticated";

revoke trigger on table "public"."incoming_speakers" from "authenticated";

revoke truncate on table "public"."incoming_speakers" from "authenticated";

revoke update on table "public"."incoming_speakers" from "authenticated";

revoke delete on table "public"."incoming_speakers" from "service_role";

revoke insert on table "public"."incoming_speakers" from "service_role";

revoke references on table "public"."incoming_speakers" from "service_role";

revoke select on table "public"."incoming_speakers" from "service_role";

revoke trigger on table "public"."incoming_speakers" from "service_role";

revoke truncate on table "public"."incoming_speakers" from "service_role";

revoke update on table "public"."incoming_speakers" from "service_role";

revoke delete on table "public"."outgoing_speakers" from "anon";

revoke insert on table "public"."outgoing_speakers" from "anon";

revoke references on table "public"."outgoing_speakers" from "anon";

revoke select on table "public"."outgoing_speakers" from "anon";

revoke trigger on table "public"."outgoing_speakers" from "anon";

revoke truncate on table "public"."outgoing_speakers" from "anon";

revoke update on table "public"."outgoing_speakers" from "anon";

revoke delete on table "public"."outgoing_speakers" from "authenticated";

revoke insert on table "public"."outgoing_speakers" from "authenticated";

revoke references on table "public"."outgoing_speakers" from "authenticated";

revoke select on table "public"."outgoing_speakers" from "authenticated";

revoke trigger on table "public"."outgoing_speakers" from "authenticated";

revoke truncate on table "public"."outgoing_speakers" from "authenticated";

revoke update on table "public"."outgoing_speakers" from "authenticated";

revoke delete on table "public"."outgoing_speakers" from "service_role";

revoke insert on table "public"."outgoing_speakers" from "service_role";

revoke references on table "public"."outgoing_speakers" from "service_role";

revoke select on table "public"."outgoing_speakers" from "service_role";

revoke trigger on table "public"."outgoing_speakers" from "service_role";

revoke truncate on table "public"."outgoing_speakers" from "service_role";

revoke update on table "public"."outgoing_speakers" from "service_role";

alter table "public"."incoming_speakers" drop constraint "incoming_speakers_congregation_id_fkey";

alter table "public"."incoming_speakers" drop constraint "incoming_speakers_outline_id_fkey";

alter table "public"."incoming_speakers" drop constraint "incoming_speakers_speaker_id_fkey";

alter table "public"."incoming_speakers" drop constraint "incoming_speakers_updated_by_fkey";

alter table "public"."outgoing_speakers" drop constraint "outgoing_speakers_congregation_id_fkey";

alter table "public"."outgoing_speakers" drop constraint "outgoing_speakers_outline_id_fkey";

alter table "public"."outgoing_speakers" drop constraint "outgoing_speakers_speaker_id_fkey";

alter table "public"."outgoing_speakers" drop constraint "outgoing_speakers_updated_by_fkey";

alter table "public"."incoming_speakers" drop constraint "incoming_speakers_pkey";

alter table "public"."outgoing_speakers" drop constraint "outgoing_speakers_pkey";

drop index if exists "public"."incoming_speakers_pkey";

drop index if exists "public"."outgoing_speakers_pkey";

drop table "public"."incoming_speakers";

drop table "public"."outgoing_speakers";

create table "public"."speaker_availability" (
    "speaker_id" uuid not null default gen_random_uuid(),
    "availability" smallint not null default '4'::smallint,
    "updated_at" timestamp with time zone not null default (now() AT TIME ZONE 'utc'::text),
    "updated_by" uuid not null default auth.uid()
);


alter table "public"."speaker_availability" enable row level security;

create table "public"."speaker_outlines" (
    "outline_id" text not null,
    "speaker_id" uuid not null default gen_random_uuid()
);


alter table "public"."speaker_outlines" enable row level security;

create table "public"."speakers_incoming" (
    "speaker_id" uuid not null default gen_random_uuid(),
    "congregation_id" uuid not null default gen_random_uuid(),
    "outline_id" text default gen_random_uuid(),
    "updated_at" timestamp with time zone not null default (now() AT TIME ZONE 'utc'::text),
    "updated_by" uuid not null default auth.uid(),
    "week_id" date not null
);


create table "public"."speakers_outgoing" (
    "speaker_id" uuid not null default gen_random_uuid(),
    "congregation_id" uuid not null default gen_random_uuid(),
    "outline_id" text default gen_random_uuid(),
    "updated_at" timestamp with time zone not null default (now() AT TIME ZONE 'utc'::text),
    "updated_by" uuid not null default auth.uid(),
    "week_id" date not null
);


CREATE UNIQUE INDEX speaker_availability_pkey ON public.speaker_availability USING btree (speaker_id);

CREATE UNIQUE INDEX speaker_outlines_pkey ON public.speaker_outlines USING btree (outline_id, speaker_id);

CREATE UNIQUE INDEX incoming_speakers_pkey ON public.speakers_incoming USING btree (speaker_id, week_id);

CREATE UNIQUE INDEX outgoing_speakers_pkey ON public.speakers_outgoing USING btree (speaker_id, week_id);

alter table "public"."speaker_availability" add constraint "speaker_availability_pkey" PRIMARY KEY using index "speaker_availability_pkey";

alter table "public"."speaker_outlines" add constraint "speaker_outlines_pkey" PRIMARY KEY using index "speaker_outlines_pkey";

alter table "public"."speakers_incoming" add constraint "incoming_speakers_pkey" PRIMARY KEY using index "incoming_speakers_pkey";

alter table "public"."speakers_outgoing" add constraint "outgoing_speakers_pkey" PRIMARY KEY using index "outgoing_speakers_pkey";

alter table "public"."speaker_availability" add constraint "speaker_availability_speaker_id_fkey" FOREIGN KEY (speaker_id) REFERENCES users(id) ON DELETE CASCADE not valid;

alter table "public"."speaker_availability" validate constraint "speaker_availability_speaker_id_fkey";

alter table "public"."speaker_availability" add constraint "speaker_availability_updated_by_fkey" FOREIGN KEY (updated_by) REFERENCES users(id) not valid;

alter table "public"."speaker_availability" validate constraint "speaker_availability_updated_by_fkey";

alter table "public"."speaker_outlines" add constraint "speaker_outlines_outline_id_fkey" FOREIGN KEY (outline_id) REFERENCES outlines(id) ON DELETE CASCADE not valid;

alter table "public"."speaker_outlines" validate constraint "speaker_outlines_outline_id_fkey";

alter table "public"."speaker_outlines" add constraint "speaker_outlines_speaker_id_fkey" FOREIGN KEY (speaker_id) REFERENCES users(id) ON DELETE CASCADE not valid;

alter table "public"."speaker_outlines" validate constraint "speaker_outlines_speaker_id_fkey";

alter table "public"."speakers_incoming" add constraint "incoming_speakers_congregation_id_fkey" FOREIGN KEY (congregation_id) REFERENCES congregations(id) ON DELETE CASCADE not valid;

alter table "public"."speakers_incoming" validate constraint "incoming_speakers_congregation_id_fkey";

alter table "public"."speakers_incoming" add constraint "incoming_speakers_outline_id_fkey" FOREIGN KEY (outline_id) REFERENCES outlines(id) ON DELETE CASCADE not valid;

alter table "public"."speakers_incoming" validate constraint "incoming_speakers_outline_id_fkey";

alter table "public"."speakers_incoming" add constraint "incoming_speakers_speaker_id_fkey" FOREIGN KEY (speaker_id) REFERENCES users(id) ON DELETE CASCADE not valid;

alter table "public"."speakers_incoming" validate constraint "incoming_speakers_speaker_id_fkey";

alter table "public"."speakers_incoming" add constraint "incoming_speakers_updated_by_fkey" FOREIGN KEY (updated_by) REFERENCES users(id) not valid;

alter table "public"."speakers_incoming" validate constraint "incoming_speakers_updated_by_fkey";

alter table "public"."speakers_outgoing" add constraint "outgoing_speakers_congregation_id_fkey" FOREIGN KEY (congregation_id) REFERENCES congregations(id) ON DELETE CASCADE not valid;

alter table "public"."speakers_outgoing" validate constraint "outgoing_speakers_congregation_id_fkey";

alter table "public"."speakers_outgoing" add constraint "outgoing_speakers_outline_id_fkey" FOREIGN KEY (outline_id) REFERENCES outlines(id) ON DELETE CASCADE not valid;

alter table "public"."speakers_outgoing" validate constraint "outgoing_speakers_outline_id_fkey";

alter table "public"."speakers_outgoing" add constraint "outgoing_speakers_speaker_id_fkey" FOREIGN KEY (speaker_id) REFERENCES users(id) ON DELETE CASCADE not valid;

alter table "public"."speakers_outgoing" validate constraint "outgoing_speakers_speaker_id_fkey";

alter table "public"."speakers_outgoing" add constraint "outgoing_speakers_updated_by_fkey" FOREIGN KEY (updated_by) REFERENCES users(id) not valid;

alter table "public"."speakers_outgoing" validate constraint "outgoing_speakers_updated_by_fkey";

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

grant delete on table "public"."speakers_incoming" to "anon";

grant insert on table "public"."speakers_incoming" to "anon";

grant references on table "public"."speakers_incoming" to "anon";

grant select on table "public"."speakers_incoming" to "anon";

grant trigger on table "public"."speakers_incoming" to "anon";

grant truncate on table "public"."speakers_incoming" to "anon";

grant update on table "public"."speakers_incoming" to "anon";

grant delete on table "public"."speakers_incoming" to "authenticated";

grant insert on table "public"."speakers_incoming" to "authenticated";

grant references on table "public"."speakers_incoming" to "authenticated";

grant select on table "public"."speakers_incoming" to "authenticated";

grant trigger on table "public"."speakers_incoming" to "authenticated";

grant truncate on table "public"."speakers_incoming" to "authenticated";

grant update on table "public"."speakers_incoming" to "authenticated";

grant delete on table "public"."speakers_incoming" to "service_role";

grant insert on table "public"."speakers_incoming" to "service_role";

grant references on table "public"."speakers_incoming" to "service_role";

grant select on table "public"."speakers_incoming" to "service_role";

grant trigger on table "public"."speakers_incoming" to "service_role";

grant truncate on table "public"."speakers_incoming" to "service_role";

grant update on table "public"."speakers_incoming" to "service_role";

grant delete on table "public"."speakers_outgoing" to "anon";

grant insert on table "public"."speakers_outgoing" to "anon";

grant references on table "public"."speakers_outgoing" to "anon";

grant select on table "public"."speakers_outgoing" to "anon";

grant trigger on table "public"."speakers_outgoing" to "anon";

grant truncate on table "public"."speakers_outgoing" to "anon";

grant update on table "public"."speakers_outgoing" to "anon";

grant delete on table "public"."speakers_outgoing" to "authenticated";

grant insert on table "public"."speakers_outgoing" to "authenticated";

grant references on table "public"."speakers_outgoing" to "authenticated";

grant select on table "public"."speakers_outgoing" to "authenticated";

grant trigger on table "public"."speakers_outgoing" to "authenticated";

grant truncate on table "public"."speakers_outgoing" to "authenticated";

grant update on table "public"."speakers_outgoing" to "authenticated";

grant delete on table "public"."speakers_outgoing" to "service_role";

grant insert on table "public"."speakers_outgoing" to "service_role";

grant references on table "public"."speakers_outgoing" to "service_role";

grant select on table "public"."speakers_outgoing" to "service_role";

grant trigger on table "public"."speakers_outgoing" to "service_role";

grant truncate on table "public"."speakers_outgoing" to "service_role";

grant update on table "public"."speakers_outgoing" to "service_role";

CREATE TRIGGER handle_updated_at BEFORE UPDATE ON public.speaker_availability FOR EACH ROW EXECUTE FUNCTION moddatetime('updated_at');

CREATE TRIGGER handle_updated_at BEFORE UPDATE ON public.speakers_incoming FOR EACH ROW EXECUTE FUNCTION moddatetime('updated_at');

CREATE TRIGGER handle_updated_at BEFORE UPDATE ON public.speakers_outgoing FOR EACH ROW EXECUTE FUNCTION moddatetime('updated_at');


