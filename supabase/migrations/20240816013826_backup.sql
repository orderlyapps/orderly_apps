drop policy "Enable insert for users based on id" on "public"."congregations";

alter table "public"."people" drop constraint "people_id_fkey";

create table "public"."admins" (
    "congregation_id" uuid not null default gen_random_uuid(),
    "person_id" uuid not null default gen_random_uuid()
);


alter table "public"."admins" enable row level security;

alter table "public"."congregations" alter column "id" set default gen_random_uuid();

alter table "public"."people" add column "congregation_id" uuid;

alter table "public"."people" alter column "created_at" drop not null;

alter table "public"."people" alter column "id" set default gen_random_uuid();

CREATE UNIQUE INDEX admins_pkey ON public.admins USING btree (congregation_id, person_id);

alter table "public"."admins" add constraint "admins_pkey" PRIMARY KEY using index "admins_pkey";

alter table "public"."admins" add constraint "public_admins_congregation_id_fkey" FOREIGN KEY (congregation_id) REFERENCES congregations(id) ON UPDATE CASCADE ON DELETE CASCADE not valid;

alter table "public"."admins" validate constraint "public_admins_congregation_id_fkey";

alter table "public"."admins" add constraint "public_admins_person_id_fkey" FOREIGN KEY (person_id) REFERENCES people(id) ON UPDATE CASCADE ON DELETE CASCADE not valid;

alter table "public"."admins" validate constraint "public_admins_person_id_fkey";

alter table "public"."people" add constraint "public_people_congregation_id_fkey" FOREIGN KEY (congregation_id) REFERENCES congregations(id) ON UPDATE CASCADE ON DELETE SET NULL not valid;

alter table "public"."people" validate constraint "public_people_congregation_id_fkey";

set check_function_bodies = off;

CREATE OR REPLACE FUNCTION public.handle_new_congregation()
 RETURNS trigger
 LANGUAGE plpgsql
 SECURITY DEFINER
AS $function$begin
  insert into public.admins (congregation_id, person_id)
  values (new.id, auth.uid());
  UPDATE public.people as p SET congregation_id = new.id where p.id = new.id ;
    return new;
end;$function$
;

CREATE OR REPLACE FUNCTION public.is_admin(congregation_id uuid, person_id uuid)
 RETURNS boolean
 LANGUAGE plpgsql
AS $function$BEGIN
    RAISE NOTICE 'Checking admin status for congregation_id: %, person_id: %', $1, $2;

    RETURN EXISTS (
        SELECT 1
        FROM admins a
        WHERE a.congregation_id = $1
        AND a.person_id = $2
    );
END;$function$
;

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
    people.outlines,
    people.created_at,
    people.congregation_id,
        CASE
            WHEN (admins.congregation_id IS NULL) THEN false
            ELSE true
        END AS is_admin,
    congregations.name AS congregation_name
   FROM ((people
     LEFT JOIN congregations ON ((people.congregation_id = congregations.id)))
     LEFT JOIN admins ON (((people.id = admins.person_id) AND (people.congregation_id = admins.congregation_id))));


CREATE OR REPLACE FUNCTION public.handle_new_user()
 RETURNS trigger
 LANGUAGE plpgsql
 SECURITY DEFINER
AS $function$begin
  insert into public.people (id, full_name, avatar_url)
  values (new.id, new.raw_user_meta_data->>'full_name', new.raw_user_meta_data->>'avatar_url');
  return new;
end;$function$
;

grant delete on table "public"."admins" to "anon";

grant insert on table "public"."admins" to "anon";

grant references on table "public"."admins" to "anon";

grant select on table "public"."admins" to "anon";

grant trigger on table "public"."admins" to "anon";

grant truncate on table "public"."admins" to "anon";

grant update on table "public"."admins" to "anon";

grant delete on table "public"."admins" to "authenticated";

grant insert on table "public"."admins" to "authenticated";

grant references on table "public"."admins" to "authenticated";

grant select on table "public"."admins" to "authenticated";

grant trigger on table "public"."admins" to "authenticated";

grant truncate on table "public"."admins" to "authenticated";

grant update on table "public"."admins" to "authenticated";

grant delete on table "public"."admins" to "service_role";

grant insert on table "public"."admins" to "service_role";

grant references on table "public"."admins" to "service_role";

grant select on table "public"."admins" to "service_role";

grant trigger on table "public"."admins" to "service_role";

grant truncate on table "public"."admins" to "service_role";

grant update on table "public"."admins" to "service_role";

create policy "Enable read access for all users"
on "public"."admins"
as permissive
for select
to authenticated
using (true);


create policy "Enable insert for authenticated users only"
on "public"."congregations"
as permissive
for insert
to authenticated
with check (true);


create policy "is admin check"
on "public"."congregations"
as permissive
for update
to authenticated
using (is_admin(id, auth.uid()));


CREATE TRIGGER handle_updated_at BEFORE UPDATE ON public.congregations FOR EACH ROW EXECUTE FUNCTION moddatetime('updated_at');

CREATE TRIGGER on_congregation_created AFTER INSERT ON public.congregations FOR EACH ROW EXECUTE FUNCTION handle_new_congregation();


