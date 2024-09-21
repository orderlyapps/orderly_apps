You are an expert in supabase

Only do the following prompts if specifically asked to...

given...
create view public.outgoing_speakers as
select
  pt.week,
  p.congregation_id,
  p.congregation_name,
  ARRAY_AGG(p.first_name) as details
from
  public_talks pt
  left join publishers p on pt.speaker_id = p.id
group by
  pt.week, p.congregation_id, p.congregation_name;





