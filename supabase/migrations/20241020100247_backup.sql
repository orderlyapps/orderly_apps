create extension if not exists "moddatetime" with schema "extensions";


create table "public"."congregations" (
    "id" uuid not null default gen_random_uuid(),
    "name" text not null default 'Unnamed'::text,
    "created_by" uuid not null default auth.uid(),
    "created_at" timestamp with time zone not null default (now() AT TIME ZONE 'utc'::text),
    "updated_by" uuid not null default auth.uid(),
    "updated_at" timestamp with time zone not null default (now() AT TIME ZONE 'utc'::text)
);


create table "public"."incoming_speakers" (
    "speaker_id" uuid not null default gen_random_uuid(),
    "congregation_id" uuid not null default gen_random_uuid(),
    "outline_id" text default gen_random_uuid(),
    "updated_at" timestamp with time zone not null default (now() AT TIME ZONE 'utc'::text),
    "updated_by" uuid not null default auth.uid(),
    "week_id" date not null
);


create table "public"."outgoing_speakers" (
    "speaker_id" uuid not null default gen_random_uuid(),
    "congregation_id" uuid not null default gen_random_uuid(),
    "outline_id" text default gen_random_uuid(),
    "updated_at" timestamp with time zone not null default (now() AT TIME ZONE 'utc'::text),
    "updated_by" uuid not null default auth.uid(),
    "week_id" date not null
);


create table "public"."outlines" (
    "id" text not null,
    "theme" text not null
);


alter table "public"."outlines" enable row level security;

create table "public"."users" (
    "id" uuid not null default gen_random_uuid(),
    "display_name" text,
    "first_name" text,
    "middle_name" text,
    "last_name" text,
    "congregation_id" uuid,
    "created_at" timestamp with time zone not null default (now() AT TIME ZONE 'utc'::text),
    "updated_at" timestamp with time zone not null default (now() AT TIME ZONE 'utc'::text),
    "updated_by" uuid not null default auth.uid(),
    "created_by" uuid not null default auth.uid()
);


CREATE UNIQUE INDEX congregations_pkey ON public.congregations USING btree (id);

CREATE UNIQUE INDEX incoming_speakers_pkey ON public.incoming_speakers USING btree (speaker_id, week_id);

CREATE UNIQUE INDEX outgoing_speakers_pkey ON public.outgoing_speakers USING btree (speaker_id, week_id);

CREATE UNIQUE INDEX outlines_pkey ON public.outlines USING btree (id);

CREATE UNIQUE INDEX users_pkey ON public.users USING btree (id);

alter table "public"."congregations" add constraint "congregations_pkey" PRIMARY KEY using index "congregations_pkey";

alter table "public"."incoming_speakers" add constraint "incoming_speakers_pkey" PRIMARY KEY using index "incoming_speakers_pkey";

alter table "public"."outgoing_speakers" add constraint "outgoing_speakers_pkey" PRIMARY KEY using index "outgoing_speakers_pkey";

alter table "public"."outlines" add constraint "outlines_pkey" PRIMARY KEY using index "outlines_pkey";

alter table "public"."users" add constraint "users_pkey" PRIMARY KEY using index "users_pkey";

alter table "public"."congregations" add constraint "congregations_created_by_fkey" FOREIGN KEY (created_by) REFERENCES users(id) not valid;

alter table "public"."congregations" validate constraint "congregations_created_by_fkey";

alter table "public"."congregations" add constraint "congregations_updated_by_fkey" FOREIGN KEY (updated_by) REFERENCES users(id) not valid;

alter table "public"."congregations" validate constraint "congregations_updated_by_fkey";

alter table "public"."incoming_speakers" add constraint "incoming_speakers_congregation_id_fkey" FOREIGN KEY (congregation_id) REFERENCES congregations(id) ON DELETE CASCADE not valid;

alter table "public"."incoming_speakers" validate constraint "incoming_speakers_congregation_id_fkey";

alter table "public"."incoming_speakers" add constraint "incoming_speakers_outline_id_fkey" FOREIGN KEY (outline_id) REFERENCES outlines(id) ON DELETE CASCADE not valid;

alter table "public"."incoming_speakers" validate constraint "incoming_speakers_outline_id_fkey";

alter table "public"."incoming_speakers" add constraint "incoming_speakers_speaker_id_fkey" FOREIGN KEY (speaker_id) REFERENCES users(id) ON DELETE CASCADE not valid;

alter table "public"."incoming_speakers" validate constraint "incoming_speakers_speaker_id_fkey";

alter table "public"."incoming_speakers" add constraint "incoming_speakers_updated_by_fkey" FOREIGN KEY (updated_by) REFERENCES users(id) not valid;

alter table "public"."incoming_speakers" validate constraint "incoming_speakers_updated_by_fkey";

alter table "public"."outgoing_speakers" add constraint "outgoing_speakers_congregation_id_fkey" FOREIGN KEY (congregation_id) REFERENCES congregations(id) ON DELETE CASCADE not valid;

alter table "public"."outgoing_speakers" validate constraint "outgoing_speakers_congregation_id_fkey";

alter table "public"."outgoing_speakers" add constraint "outgoing_speakers_outline_id_fkey" FOREIGN KEY (outline_id) REFERENCES outlines(id) ON DELETE CASCADE not valid;

alter table "public"."outgoing_speakers" validate constraint "outgoing_speakers_outline_id_fkey";

alter table "public"."outgoing_speakers" add constraint "outgoing_speakers_speaker_id_fkey" FOREIGN KEY (speaker_id) REFERENCES users(id) ON DELETE CASCADE not valid;

alter table "public"."outgoing_speakers" validate constraint "outgoing_speakers_speaker_id_fkey";

alter table "public"."outgoing_speakers" add constraint "outgoing_speakers_updated_by_fkey" FOREIGN KEY (updated_by) REFERENCES users(id) not valid;

alter table "public"."outgoing_speakers" validate constraint "outgoing_speakers_updated_by_fkey";

alter table "public"."users" add constraint "users_congregation_id_fkey" FOREIGN KEY (congregation_id) REFERENCES congregations(id) ON DELETE SET NULL not valid;

alter table "public"."users" validate constraint "users_congregation_id_fkey";

alter table "public"."users" add constraint "users_created_by_fkey" FOREIGN KEY (created_by) REFERENCES users(id) not valid;

alter table "public"."users" validate constraint "users_created_by_fkey";

alter table "public"."users" add constraint "users_updated_by_fkey" FOREIGN KEY (updated_by) REFERENCES users(id) not valid;

alter table "public"."users" validate constraint "users_updated_by_fkey";

set check_function_bodies = off;

CREATE OR REPLACE FUNCTION public.handle_new_user()
 RETURNS trigger
 LANGUAGE plpgsql
 SECURITY DEFINER
 SET search_path TO ''
AS $function$
begin
  insert into public.users (id, created_by, updated_by)
  values (new.id, new.id, new.id);
  return new;
end;
$function$
;

grant delete on table "public"."congregations" to "anon";

grant insert on table "public"."congregations" to "anon";

grant references on table "public"."congregations" to "anon";

grant select on table "public"."congregations" to "anon";

grant trigger on table "public"."congregations" to "anon";

grant truncate on table "public"."congregations" to "anon";

grant update on table "public"."congregations" to "anon";

grant delete on table "public"."congregations" to "authenticated";

grant insert on table "public"."congregations" to "authenticated";

grant references on table "public"."congregations" to "authenticated";

grant select on table "public"."congregations" to "authenticated";

grant trigger on table "public"."congregations" to "authenticated";

grant truncate on table "public"."congregations" to "authenticated";

grant update on table "public"."congregations" to "authenticated";

grant delete on table "public"."congregations" to "service_role";

grant insert on table "public"."congregations" to "service_role";

grant references on table "public"."congregations" to "service_role";

grant select on table "public"."congregations" to "service_role";

grant trigger on table "public"."congregations" to "service_role";

grant truncate on table "public"."congregations" to "service_role";

grant update on table "public"."congregations" to "service_role";

grant delete on table "public"."incoming_speakers" to "anon";

grant insert on table "public"."incoming_speakers" to "anon";

grant references on table "public"."incoming_speakers" to "anon";

grant select on table "public"."incoming_speakers" to "anon";

grant trigger on table "public"."incoming_speakers" to "anon";

grant truncate on table "public"."incoming_speakers" to "anon";

grant update on table "public"."incoming_speakers" to "anon";

grant delete on table "public"."incoming_speakers" to "authenticated";

grant insert on table "public"."incoming_speakers" to "authenticated";

grant references on table "public"."incoming_speakers" to "authenticated";

grant select on table "public"."incoming_speakers" to "authenticated";

grant trigger on table "public"."incoming_speakers" to "authenticated";

grant truncate on table "public"."incoming_speakers" to "authenticated";

grant update on table "public"."incoming_speakers" to "authenticated";

grant delete on table "public"."incoming_speakers" to "service_role";

grant insert on table "public"."incoming_speakers" to "service_role";

grant references on table "public"."incoming_speakers" to "service_role";

grant select on table "public"."incoming_speakers" to "service_role";

grant trigger on table "public"."incoming_speakers" to "service_role";

grant truncate on table "public"."incoming_speakers" to "service_role";

grant update on table "public"."incoming_speakers" to "service_role";

grant delete on table "public"."outgoing_speakers" to "anon";

grant insert on table "public"."outgoing_speakers" to "anon";

grant references on table "public"."outgoing_speakers" to "anon";

grant select on table "public"."outgoing_speakers" to "anon";

grant trigger on table "public"."outgoing_speakers" to "anon";

grant truncate on table "public"."outgoing_speakers" to "anon";

grant update on table "public"."outgoing_speakers" to "anon";

grant delete on table "public"."outgoing_speakers" to "authenticated";

grant insert on table "public"."outgoing_speakers" to "authenticated";

grant references on table "public"."outgoing_speakers" to "authenticated";

grant select on table "public"."outgoing_speakers" to "authenticated";

grant trigger on table "public"."outgoing_speakers" to "authenticated";

grant truncate on table "public"."outgoing_speakers" to "authenticated";

grant update on table "public"."outgoing_speakers" to "authenticated";

grant delete on table "public"."outgoing_speakers" to "service_role";

grant insert on table "public"."outgoing_speakers" to "service_role";

grant references on table "public"."outgoing_speakers" to "service_role";

grant select on table "public"."outgoing_speakers" to "service_role";

grant trigger on table "public"."outgoing_speakers" to "service_role";

grant truncate on table "public"."outgoing_speakers" to "service_role";

grant update on table "public"."outgoing_speakers" to "service_role";

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

grant delete on table "public"."users" to "anon";

grant insert on table "public"."users" to "anon";

grant references on table "public"."users" to "anon";

grant select on table "public"."users" to "anon";

grant trigger on table "public"."users" to "anon";

grant truncate on table "public"."users" to "anon";

grant update on table "public"."users" to "anon";

grant delete on table "public"."users" to "authenticated";

grant insert on table "public"."users" to "authenticated";

grant references on table "public"."users" to "authenticated";

grant select on table "public"."users" to "authenticated";

grant trigger on table "public"."users" to "authenticated";

grant truncate on table "public"."users" to "authenticated";

grant update on table "public"."users" to "authenticated";

grant delete on table "public"."users" to "service_role";

grant insert on table "public"."users" to "service_role";

grant references on table "public"."users" to "service_role";

grant select on table "public"."users" to "service_role";

grant trigger on table "public"."users" to "service_role";

grant truncate on table "public"."users" to "service_role";

grant update on table "public"."users" to "service_role";

create policy "Enable read access for all users"
on "public"."outlines"
as permissive
for select
to public
using (true);


CREATE TRIGGER handle_updated_at BEFORE UPDATE ON public.congregations FOR EACH ROW EXECUTE FUNCTION moddatetime('updated_at');

CREATE TRIGGER handle_updated_at BEFORE UPDATE ON public.incoming_speakers FOR EACH ROW EXECUTE FUNCTION moddatetime('updated_at');

CREATE TRIGGER handle_updated_at BEFORE UPDATE ON public.outgoing_speakers FOR EACH ROW EXECUTE FUNCTION moddatetime('updated_at');

CREATE TRIGGER handle_updated_at BEFORE UPDATE ON public.users FOR EACH ROW EXECUTE FUNCTION moddatetime('updated_at');


