drop view if exists "public"."speakers";

create or replace view "public"."speakers" as  SELECT users.id,
    row_to_json(users.*) AS name,
    row_to_json(congregations.*) AS congregation,
    json_agg(outlines.*) AS outlines,
    speaker_availability.availability
   FROM ((((speaker_availability
     LEFT JOIN users ON ((users.id = speaker_availability.speaker_id)))
     LEFT JOIN congregations ON ((congregations.id = users.congregation_id)))
     LEFT JOIN speaker_outlines ON ((speaker_outlines.speaker_id = users.id)))
     LEFT JOIN outlines ON ((outlines.id = speaker_outlines.outline_id)))
  GROUP BY users.id, congregations.*, speaker_availability.availability;



