create table "public"."congregations" (
    "id" uuid not null default auth.uid(),
    "created_at" timestamp with time zone not null default now(),
    "updated_at" timestamp with time zone default now(),
    "name" text not null default ''::text
);


alter table "public"."congregations" enable row level security;

CREATE UNIQUE INDEX congregations_pkey ON public.congregations USING btree (id);

alter table "public"."congregations" add constraint "congregations_pkey" PRIMARY KEY using index "congregations_pkey";

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

create policy "Enable insert for users based on id"
on "public"."congregations"
as permissive
for insert
to authenticated
with check ((( SELECT auth.uid() AS uid) = id));


create policy "Enable read access for all users"
on "public"."congregations"
as permissive
for select
to public
using (true);



