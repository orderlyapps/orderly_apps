drop view if exists "public"."speakers";

alter table "public"."speakers_incoming" drop constraint "incoming_speakers_pkey";

drop index if exists "public"."incoming_speakers_pkey";

alter table "public"."users" add column "auth" boolean not null default false;

CREATE UNIQUE INDEX speakers_incoming_pkey ON public.speakers_incoming USING btree (congregation_id, week_id);

alter table "public"."speakers_incoming" add constraint "speakers_incoming_pkey" PRIMARY KEY using index "speakers_incoming_pkey";

alter table "public"."users" add constraint "users_id_fkey" FOREIGN KEY (id) REFERENCES auth.users(id) ON DELETE CASCADE not valid;

alter table "public"."users" validate constraint "users_id_fkey";

set check_function_bodies = off;

create or replace view "public"."speaker_details" as  SELECT speakers_incoming.speaker_id,
    speakers_incoming.congregation_id,
    speakers_incoming.outline_id,
    speakers_incoming.updated_at,
    speakers_incoming.updated_by,
    speakers_incoming.week_id,
    outline.theme AS outline_theme,
    row_to_json(speaker.*) AS speakers_name,
    row_to_json(speakers_congregation.*) AS speakers_congregation,
    json_agg(speakers_outlines.*) AS speakers_outlines,
        CASE
            WHEN (speakers_congregation.id <> speakers_incoming.congregation_id) THEN false
            ELSE true
        END AS local,
    ( SELECT (EXISTS ( SELECT 1
                   FROM speakers_outgoing
                  WHERE ((speakers_outgoing.week_id = speakers_incoming.week_id) AND (speakers_outgoing.speaker_id = speakers_incoming.speaker_id) AND (speakers_outgoing.congregation_id = speakers_incoming.congregation_id)))) AS "exists") AS speaker_confirmed,
    ( SELECT (EXISTS ( SELECT 1
                   FROM speakers_outgoing
                  WHERE ((speakers_outgoing.week_id = speakers_incoming.week_id) AND (speakers_outgoing.speaker_id = speakers_incoming.speaker_id) AND (speakers_outgoing.congregation_id = speakers_incoming.congregation_id) AND (speakers_outgoing.outline_id = speakers_incoming.outline_id)))) AS "exists") AS outline_confirmed,
    ( SELECT row_to_json(proposed_outline.*) AS row_to_json
           FROM (speakers_outgoing
             LEFT JOIN outlines proposed_outline ON ((proposed_outline.id = speakers_outgoing.outline_id)))
          WHERE ((speakers_outgoing.week_id = speakers_incoming.week_id) AND (speakers_outgoing.speaker_id = speakers_incoming.speaker_id) AND (speakers_outgoing.congregation_id = speakers_incoming.congregation_id))) AS proposed_outline
   FROM (((((speakers_incoming
     LEFT JOIN outlines outline ON ((outline.id = speakers_incoming.outline_id)))
     LEFT JOIN users speaker ON ((speaker.id = speakers_incoming.speaker_id)))
     LEFT JOIN congregations speakers_congregation ON ((speakers_congregation.id = speaker.congregation_id)))
     LEFT JOIN speaker_outlines ON ((speaker_outlines.speaker_id = speaker.id)))
     LEFT JOIN outlines speakers_outlines ON ((speakers_outlines.id = speaker_outlines.outline_id)))
  GROUP BY speakers_incoming.speaker_id, speakers_incoming.congregation_id, speakers_incoming.outline_id, speakers_incoming.updated_at, speakers_incoming.updated_by, speakers_incoming.week_id, outline.theme, speaker.*, speakers_congregation.*, speakers_congregation.id;


create or replace view "public"."speaker_schedule" as  WITH all_weeks AS (
         SELECT DISTINCT combined_weeks.week_id
           FROM ( SELECT speakers_incoming.week_id
                   FROM speakers_incoming
                UNION
                 SELECT speakers_outgoing.week_id
                   FROM speakers_outgoing) combined_weeks
        )
 SELECT aw.week_id,
    cg.id AS congregation_id,
    cg.name AS congregation_name,
        CASE
            WHEN (si.speaker_id IS NOT NULL) THEN jsonb_build_object('id', u.id, 'outline', jsonb_build_object('id', o.id, 'theme', o.theme), 'name', jsonb_build_object('first_name', u.first_name, 'last_name', u.last_name, 'middle_name', u.middle_name, 'display_name', u.display_name), 'congregation', jsonb_build_object('id', c.id, 'name', c.name), 'outlines', ( SELECT jsonb_agg(jsonb_build_object('id', "out".id, 'theme', "out".theme)) AS jsonb_agg
               FROM (speaker_outlines so
                 JOIN outlines "out" ON ((so.outline_id = "out".id)))
              WHERE (so.speaker_id = si.speaker_id)), 'visiting',
            CASE
                WHEN (u.congregation_id <> cg.id) THEN true
                ELSE false
            END, 'speaker_confirmed', ( SELECT (EXISTS ( SELECT 1
                       FROM speakers_outgoing so
                      WHERE ((so.week_id = si.week_id) AND (so.speaker_id = si.speaker_id) AND (so.congregation_id = cg.id)))) AS "exists"), 'outline_confirmed', ( SELECT (EXISTS ( SELECT 1
                       FROM speakers_outgoing so
                      WHERE ((so.week_id = si.week_id) AND (so.speaker_id = si.speaker_id) AND (so.outline_id = si.outline_id) AND (so.congregation_id = cg.id)))) AS "exists"), 'preferred_outline', ( SELECT json_build_object('id', po.id, 'theme', po.theme) AS json_build_object
               FROM (speakers_outgoing so
                 LEFT JOIN outlines po ON ((po.id = so.outline_id)))
              WHERE ((so.week_id = si.week_id) AND (so.speaker_id = si.speaker_id) AND (so.congregation_id = cg.id))))
            ELSE NULL::jsonb
        END AS speaker_details,
    ( SELECT jsonb_agg(jsonb_build_object('id', ou.id, 'name', jsonb_build_object('first_name', ou.first_name, 'last_name', ou.last_name, 'middle_name', ou.middle_name, 'display_name', ou.display_name), 'congregation', jsonb_build_object('id', oc.id, 'name', oc.name), 'outlines', ( SELECT jsonb_agg(jsonb_build_object('id', oo.id, 'theme', oo.theme)) AS jsonb_agg
                   FROM (speaker_outlines oso
                     JOIN outlines oo ON ((oso.outline_id = oo.id)))
                  WHERE (oso.speaker_id = so.speaker_id)), 'outline', jsonb_build_object('id', ogo.id, 'theme', ogo.theme))) AS jsonb_agg
           FROM (((speakers_outgoing so
             JOIN users ou ON ((so.speaker_id = ou.id)))
             JOIN congregations oc ON ((so.congregation_id = oc.id)))
             JOIN outlines ogo ON ((so.outline_id = ogo.id)))
          WHERE ((so.week_id = aw.week_id) AND (ou.congregation_id = cg.id))) AS outgoing_speakers
   FROM (((((all_weeks aw
     CROSS JOIN congregations cg)
     LEFT JOIN speakers_incoming si ON (((aw.week_id = si.week_id) AND (cg.id = si.congregation_id))))
     LEFT JOIN users u ON ((si.speaker_id = u.id)))
     LEFT JOIN congregations c ON ((u.congregation_id = c.id)))
     LEFT JOIN outlines o ON ((si.outline_id = o.id)));


CREATE OR REPLACE FUNCTION public.handle_new_user()
 RETURNS trigger
 LANGUAGE plpgsql
 SECURITY DEFINER
 SET search_path TO ''
AS $function$begin
  insert into public.users (id, created_by, updated_by, auth)
  values (new.id, new.id, new.id, true);
  return new;
end;$function$
;

create or replace view "public"."speakers" as  SELECT u.id,
    u.congregation_id,
    c.name AS congregation_name,
    json_build_object('first_name', u.first_name, 'middle_name', u.middle_name, 'last_name', u.last_name, 'display_name', u.display_name) AS name,
    json_agg(o.*) AS outlines,
    sa.availability
   FROM ((((speaker_availability sa
     LEFT JOIN users u ON ((u.id = sa.speaker_id)))
     LEFT JOIN congregations c ON ((c.id = u.congregation_id)))
     LEFT JOIN speaker_outlines so ON ((so.speaker_id = u.id)))
     LEFT JOIN outlines o ON ((o.id = so.outline_id)))
  GROUP BY u.id, sa.availability, c.name;



