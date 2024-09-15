create policy "Enable all for admins of congregation"
on "public"."people"
as permissive
for all
to authenticated
using (is_admin(congregation_id, auth.uid()));



