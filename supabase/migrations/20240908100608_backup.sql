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
    congregations.name AS congregation_name,
    ( SELECT count(*) AS count
           FROM admins admins_1
          WHERE (admins_1.person_id = people.id)) AS admin_count
   FROM ((people
     LEFT JOIN congregations ON ((people.congregation_id = congregations.id)))
     LEFT JOIN admins ON (((people.id = admins.person_id) AND (people.congregation_id = admins.congregation_id))));



