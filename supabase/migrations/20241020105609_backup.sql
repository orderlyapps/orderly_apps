alter table "public"."speakers_incoming" drop constraint "incoming_speakers_speaker_id_fkey";

alter table "public"."speakers_outgoing" drop constraint "outgoing_speakers_speaker_id_fkey";

alter table "public"."speakers_incoming" alter column "outline_id" set not null;

alter table "public"."speakers_outgoing" alter column "outline_id" set not null;

alter table "public"."speakers_incoming" add constraint "speakers_incoming_speaker_id_outline_id_fkey" FOREIGN KEY (speaker_id, outline_id) REFERENCES speaker_outlines(speaker_id, outline_id) ON DELETE CASCADE not valid;

alter table "public"."speakers_incoming" validate constraint "speakers_incoming_speaker_id_outline_id_fkey";

alter table "public"."speakers_outgoing" add constraint "speakers_outgoing_speaker_id_outline_id_fkey" FOREIGN KEY (speaker_id, outline_id) REFERENCES speaker_outlines(speaker_id, outline_id) ON DELETE CASCADE not valid;

alter table "public"."speakers_outgoing" validate constraint "speakers_outgoing_speaker_id_outline_id_fkey";

create or replace view "public"."speakers" as  SELECT u.id,
    u.first_name,
    u.middle_name,
    u.last_name,
    u.display_name,
    u.congregation_id,
    c.name AS congregation_name,
    json_agg(o.*) AS outlines
   FROM (((users u
     LEFT JOIN congregations c ON ((c.id = u.congregation_id)))
     LEFT JOIN speaker_outlines so ON ((so.speaker_id = u.id)))
     LEFT JOIN outlines o ON ((o.id = so.outline_id)))
  GROUP BY u.id, c.name;



