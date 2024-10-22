create extension if not exists "moddatetime" with schema "extensions";


create table "public"."people" (
    "id" uuid not null,
    "updated_at" timestamp with time zone default now(),
    "username" text,
    "full_name" text,
    "avatar_url" text,
    "website" text,
    "first_name" text,
    "middle_name" text,
    "last_name" text,
    "display_name" text,
    "outlines" text[],
    "created_at" timestamp with time zone not null default now()
);


alter table "public"."people" enable row level security;

CREATE UNIQUE INDEX people_pkey ON public.people USING btree (id);

CREATE UNIQUE INDEX people_username_key ON public.people USING btree (username);

alter table "public"."people" add constraint "people_pkey" PRIMARY KEY using index "people_pkey";

alter table "public"."people" add constraint "people_id_fkey" FOREIGN KEY (id) REFERENCES auth.users(id) ON DELETE CASCADE not valid;

alter table "public"."people" validate constraint "people_id_fkey";

alter table "public"."people" add constraint "people_username_key" UNIQUE using index "people_username_key";

alter table "public"."people" add constraint "username_length" CHECK ((char_length(username) >= 3)) not valid;

alter table "public"."people" validate constraint "username_length";

set check_function_bodies = off;

CREATE OR REPLACE FUNCTION public.handle_new_user()
 RETURNS trigger
 LANGUAGE plpgsql
 SECURITY DEFINER
AS $function$
begin
  insert into public.people (id, full_name, avatar_url)
  values (new.id, new.raw_user_meta_data->>'full_name', new.raw_user_meta_data->>'avatar_url');
  return new;
end;
$function$
;

grant delete on table "public"."people" to "anon";

grant insert on table "public"."people" to "anon";

grant references on table "public"."people" to "anon";

grant select on table "public"."people" to "anon";

grant trigger on table "public"."people" to "anon";

grant truncate on table "public"."people" to "anon";

grant update on table "public"."people" to "anon";

grant delete on table "public"."people" to "authenticated";

grant insert on table "public"."people" to "authenticated";

grant references on table "public"."people" to "authenticated";

grant select on table "public"."people" to "authenticated";

grant trigger on table "public"."people" to "authenticated";

grant truncate on table "public"."people" to "authenticated";

grant update on table "public"."people" to "authenticated";

grant delete on table "public"."people" to "service_role";

grant insert on table "public"."people" to "service_role";

grant references on table "public"."people" to "service_role";

grant select on table "public"."people" to "service_role";

grant trigger on table "public"."people" to "service_role";

grant truncate on table "public"."people" to "service_role";

grant update on table "public"."people" to "service_role";

create policy "Public people are viewable by everyone."
on "public"."people"
as permissive
for select
to public
using (true);


create policy "Users can insert their own profile."
on "public"."people"
as permissive
for insert
to public
with check ((( SELECT auth.uid() AS uid) = id));


create policy "Users can update own profile."
on "public"."people"
as permissive
for update
to public
using ((( SELECT auth.uid() AS uid) = id));


CREATE TRIGGER handle_updated_at BEFORE UPDATE ON public.people FOR EACH ROW EXECUTE FUNCTION moddatetime('updated_at');


