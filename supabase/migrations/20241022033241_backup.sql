create or replace view "public"."publishers" as  SELECT users.id,
    row_to_json(users.*) AS name,
    row_to_json(congregations.*) AS congregation
   FROM (users
     LEFT JOIN congregations ON ((users.congregation_id = congregations.id)));



