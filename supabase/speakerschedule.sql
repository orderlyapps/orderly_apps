drop view speaker_schedule;
drop view speaker_offers;
drop view speaker_requests;

CREATE OR REPLACE VIEW
  public.speaker_schedule AS
WITH
  speaker_offers_cte AS (
    SELECT
      speakers_outgoing.week_id,
      json_build_object(
        'name',
        json_build_object(
          'first_name',
          uso.first_name,
          'middle_name',
          uso.middle_name,
          'last_name',
          uso.last_name,
          'display_name',
          uso.display_name,
          'updated_at',
          uso.updated_at,
          'updated_by',
          uso.updated_by
        ),
        'outline_id',
        speakers_outgoing.outline_id,
        'theme',
        oso.theme,
        'speaker_id',
        speakers_outgoing.speaker_id,
        'updated_at',
        speakers_outgoing.updated_at,
        'updated_by',
        speakers_outgoing.updated_by,
        'congregation_id',
        speakers_outgoing.congregation_id,
        'congregation_name',
        cso.name,
        'outlines',
        json_agg(
          json_build_object('id', oso.id, 'theme', oso.theme)
        )
      ) AS speaker_offers
    FROM
      speakers_outgoing
      LEFT JOIN users uso ON uso.id = speakers_outgoing.speaker_id
      LEFT JOIN congregations cso ON speakers_outgoing.congregation_id = cso.id
      LEFT JOIN speaker_outlines soso ON soso.speaker_id = speakers_outgoing.speaker_id
      LEFT JOIN outlines oso ON oso.id = soso.outline_id
    GROUP BY
      speakers_outgoing.week_id,
      speakers_outgoing.outline_id,
      speakers_outgoing.speaker_id,
      speakers_outgoing.updated_at,
      speakers_outgoing.updated_by,
      speakers_outgoing.congregation_id,
      uso.first_name,
      uso.middle_name,
      uso.last_name,
      uso.display_name,
      uso.updated_at,
      uso.updated_by,
      cso.name,
      oso.theme
  ),
  speaker_requests_cte AS (
    SELECT
      speakers_incoming.week_id,
      json_build_object(
        'name',
        json_build_object(
          'first_name',
          uso.first_name,
          'middle_name',
          uso.middle_name,
          'last_name',
          uso.last_name,
          'display_name',
          uso.display_name,
          'updated_at',
          uso.updated_at,
          'updated_by',
          uso.updated_by
        ),
        'outline_id',
        speakers_incoming.outline_id,
        'theme',
        oso.theme,
        'speaker_id',
        speakers_incoming.speaker_id,
        'updated_at',
        speakers_incoming.updated_at,
        'updated_by',
        speakers_incoming.updated_by,
        'congregation_id',
        speakers_incoming.congregation_id,
        'congregation_name',
        cso.name,
        'outlines',
        json_agg(
          json_build_object('id', oso.id, 'theme', oso.theme)
        )
      ) AS speaker_requests
    FROM
      speakers_incoming
      LEFT JOIN users uso ON uso.congregation_id = speakers_incoming.congregation_id
      LEFT JOIN congregations cso ON speakers_incoming.congregation_id = cso.id
      LEFT JOIN speaker_outlines soso ON soso.speaker_id = speakers_incoming.speaker_id
      LEFT JOIN outlines oso ON oso.id = soso.outline_id
    GROUP BY
      speakers_incoming.week_id,
      speakers_incoming.outline_id,
      speakers_incoming.speaker_id,
      speakers_incoming.updated_at,
      speakers_incoming.updated_by,
      speakers_incoming.congregation_id,
      uso.first_name,
      uso.middle_name,
      uso.last_name,
      uso.display_name,
      uso.updated_at,
      uso.updated_by,
      cso.name,
      oso.theme
  )
SELECT
  (
    SELECT
      json_agg(speaker_offers)
    FROM
      speaker_offers_cte
    WHERE
      speaker_offers_cte.week_id = speakers_incoming.week_id
  ) AS speaker_offers,
  (
    SELECT
      json_agg(speaker_requests)
    FROM
      speaker_requests_cte
    WHERE
      speaker_requests_cte.week_id = speakers_incoming.week_id
  ) AS speaker_requests,
  speakers_incoming.speaker_id,
  speakers_incoming.updated_at,
  speakers_incoming.updated_by,
  speakers_incoming.week_id,
  speakers_incoming.congregation_id,
  speakers_incoming.outline_id,
  o.theme,
  c.name AS congregation_name,
  json_build_object(
    'first_name',
    u.first_name,
    'middle_name',
    u.middle_name,
    'last_name',
    u.last_name,
    'display_name',
    u.display_name
  ) AS name,
  speaker_availability.availability
FROM
  speakers_incoming
  LEFT JOIN users u ON speakers_incoming.speaker_id = u.id
  LEFT JOIN speaker_availability ON speakers_incoming.speaker_id = speaker_availability.speaker_id
  LEFT JOIN speaker_outlines so ON so.speaker_id = speakers_incoming.speaker_id
  LEFT JOIN outlines o ON o.id = so.outline_id
  LEFT JOIN congregations c ON u.congregation_id = c.id
GROUP BY
  speakers_incoming.speaker_id,
  speakers_incoming.outline_id,
  speakers_incoming.updated_at,
  speakers_incoming.updated_by,
  speakers_incoming.week_id,
  speakers_incoming.congregation_id,
  u.first_name,
  u.middle_name,
  u.last_name,
  u.display_name,
  speaker_availability.availability,
  c.name,
  o.theme;
