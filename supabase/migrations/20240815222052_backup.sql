drop policy "Enable insert for users based on user_id" on "public"."congregations";

alter table "public"."congregations" alter column "id" set default gen_random_uuid();

alter table "public"."people" alter column "created_at" drop not null;

alter table "public"."people" enable row level security;

set check_function_bodies = off;

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

create policy "Enable insert for authenticated users only"
on "public"."congregations"
as permissive
for insert
to authenticated
with check (true);


CREATE TRIGGER handle_updated_at BEFORE UPDATE ON public.congregations FOR EACH ROW EXECUTE FUNCTION moddatetime('updated_at');


