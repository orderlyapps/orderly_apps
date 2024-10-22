drop policy "Enable insert for authenticated users only" on "public"."congregations";

alter table "public"."congregations" add column "created_by" uuid default auth.uid();

create policy "Enable insert if is admin less than 3 times"
on "public"."congregations"
as permissive
for insert
to authenticated
with check ((( SELECT count(*) AS count
   FROM admins a
  WHERE (a.person_id = auth.uid())) < 3));



