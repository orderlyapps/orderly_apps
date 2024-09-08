create view
  public.publishers as
select
  people.id,
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
  case
    when admins.congregation_id is null then false
    else true
  end as is_admin,
  COUNT(
    CASE
      WHEN admins.person_id = people.id THEN 1
    END
  ) AS admin_count,
  congregations.name as congregation_name,
  (
    SELECT
      COUNT(*)
    FROM
      admins
    WHERE
      person_id = people.id
  ) AS admin_count
from
  people
  left join congregations on people.congregation_id = congregations.id
  left join admins on people.id = admins.person_id
  and people.congregation_id = admins.congregation_id;
