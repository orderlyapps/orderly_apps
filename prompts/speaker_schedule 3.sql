

CREATE OR REPLACE VIEW public.speaker_schedule AS
WITH all_weeks AS (
    SELECT DISTINCT
        combined_weeks.week_id
    FROM (
        SELECT week_id FROM speakers_incoming
        UNION
        SELECT week_id FROM speakers_outgoing
    ) combined_weeks
)
SELECT
    aw.week_id,
    cg.id AS congregation_id,
    cg.name AS congregation_name,
    CASE
        WHEN si.speaker_id IS NOT NULL THEN
            jsonb_build_object(
                'id', u.id,
                'outline', jsonb_build_object('id', o.id, 'theme', o.theme),
                'name', jsonb_build_object(
                    'first_name', u.first_name,
                    'last_name', u.last_name,
                    'middle_name', u.middle_name,
                    'display_name', u.display_name
                ),
                'congregation', jsonb_build_object('id', c.id, 'name', c.name),
                'outlines', (
                    SELECT jsonb_agg(jsonb_build_object('id', "out".id, 'theme', "out".theme))
                    FROM speaker_outlines so
                    JOIN outlines "out" ON so.outline_id = "out".id
                    WHERE so.speaker_id = si.speaker_id
                ),
                'visiting', CASE WHEN u.congregation_id <> cg.id THEN true ELSE false END,
                'speaker_confirmed', (
                    SELECT EXISTS (
                        SELECT 1
                        FROM speakers_outgoing so
                        WHERE so.week_id = si.week_id
                        AND so.speaker_id = si.speaker_id
                        AND so.congregation_id = cg.id
                    )
                ),
                'outline_confirmed', (
                    SELECT EXISTS (
                        SELECT 1
                        FROM speakers_outgoing so
                        WHERE so.week_id = si.week_id
                        AND so.speaker_id = si.speaker_id
                        AND so.outline_id = si.outline_id
                        AND so.congregation_id = cg.id
                    )
                )
            )
        ELSE NULL
    END AS speaker_details,
    (
        SELECT jsonb_agg(
            jsonb_build_object(
                'id', ou.id,
                'name', jsonb_build_object(
                    'first_name', ou.first_name,
                    'last_name', ou.last_name,
                    'middle_name', ou.middle_name,
                    'display_name', ou.display_name
                ),
                'congregation', jsonb_build_object(
                    'id', oc.id,
                    'name', oc.name
                ),
                'outlines', (
                    SELECT jsonb_agg(jsonb_build_object('id', oo.id, 'theme', oo.theme))
                    FROM speaker_outlines oso
                    JOIN outlines oo ON oso.outline_id = oo.id
                    WHERE oso.speaker_id = so.speaker_id
                ),
                'outline',
                jsonb_build_object('id', ogo.id, 'theme', ogo.theme)
            )
        )
        FROM speakers_outgoing so
        JOIN users ou ON so.speaker_id = ou.id
        JOIN congregations oc ON so.congregation_id = oc.id
        JOIN outlines ogo ON so.outline_id = ogo.id
        WHERE so.week_id = aw.week_id AND ou.congregation_id = cg.id
    ) AS outgoing_speakers
FROM all_weeks aw
CROSS JOIN congregations cg
LEFT JOIN speakers_incoming si ON aw.week_id = si.week_id AND cg.id = si.congregation_id
LEFT JOIN users u ON si.speaker_id = u.id
LEFT JOIN congregations c ON u.congregation_id = c.id
LEFT JOIN outlines o ON si.outline_id = o.id;


please makes the following changes to the view:

