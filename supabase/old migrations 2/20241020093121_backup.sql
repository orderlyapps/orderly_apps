SET
  statement_timeout = 0;

SET
  lock_timeout = 0;

SET
  idle_in_transaction_session_timeout = 0;

SET
  client_encoding = 'UTF8';

SET
  standard_conforming_strings = on;

SELECT
  pg_catalog.set_config('search_path', '', false);

SET
  check_function_bodies = false;

SET
  xmloption = content;

SET
  client_min_messages = warning;

SET
  row_security = off;

CREATE EXTENSION IF NOT EXISTS "pg_net" WITH SCHEMA "extensions";

CREATE EXTENSION IF NOT EXISTS "pgsodium" WITH SCHEMA "pgsodium";

COMMENT ON SCHEMA "public" IS 'standard public schema';

CREATE EXTENSION IF NOT EXISTS "moddatetime" WITH SCHEMA "extensions";

CREATE EXTENSION IF NOT EXISTS "pg_graphql" WITH SCHEMA "graphql";

CREATE EXTENSION IF NOT EXISTS "pg_stat_statements" WITH SCHEMA "extensions";

CREATE EXTENSION IF NOT EXISTS "pgcrypto" WITH SCHEMA "extensions";

CREATE EXTENSION IF NOT EXISTS "pgjwt" WITH SCHEMA "extensions";

CREATE EXTENSION IF NOT EXISTS "supabase_vault" WITH SCHEMA "vault";

CREATE EXTENSION IF NOT EXISTS "uuid-ossp" WITH SCHEMA "extensions";

CREATE
OR REPLACE FUNCTION "public"."handle_new_user"() RETURNS "trigger" LANGUAGE "plpgsql" SECURITY DEFINER
SET
  "search_path" TO '' AS $ $ begin
insert into
  public.users (id, created_by, updated_by)
values
  (new.id, new.id, new.id);

return new;

end;

$ $;

ALTER FUNCTION "public"."handle_new_user"() OWNER TO "postgres";

SET
  default_tablespace = '';

SET
  default_table_access_method = "heap";

CREATE TABLE IF NOT EXISTS "public"."congregations" (
  "id" "uuid" DEFAULT "gen_random_uuid"() NOT NULL,
  "name" "text" DEFAULT 'Unnamed' :: "text" NOT NULL,
  "created_by" "uuid" DEFAULT "auth"."uid"() NOT NULL,
  "created_at" timestamp with time zone DEFAULT ("now"() AT TIME ZONE 'utc' :: "text") NOT NULL,
  "updated_by" "uuid" DEFAULT "auth"."uid"() NOT NULL,
  "updated_at" timestamp with time zone DEFAULT ("now"() AT TIME ZONE 'utc' :: "text") NOT NULL
);

ALTER TABLE
  "public"."congregations" OWNER TO "postgres";

CREATE TABLE IF NOT EXISTS "public"."users" (
  "id" "uuid" DEFAULT "gen_random_uuid"() NOT NULL,
  "display_name" "text",
  "first_name" "text",
  "middle_name" "text",
  "last_name" "text",
  "congregation_id" "uuid",
  "created_at" timestamp with time zone DEFAULT ("now"() AT TIME ZONE 'utc' :: "text") NOT NULL,
  "updated_at" timestamp with time zone DEFAULT ("now"() AT TIME ZONE 'utc' :: "text") NOT NULL,
  "updated_by" "uuid" DEFAULT "auth"."uid"() NOT NULL,
  "created_by" "uuid" DEFAULT "auth"."uid"() NOT NULL
);

ALTER TABLE
  "public"."users" OWNER TO "postgres";

ALTER TABLE
  ONLY "public"."congregations"
ADD
  CONSTRAINT "congregations_pkey" PRIMARY KEY ("id");

ALTER TABLE
  ONLY "public"."users"
ADD
  CONSTRAINT "users_pkey" PRIMARY KEY ("id");

CREATE
OR REPLACE TRIGGER "handle_updated_at" BEFORE
UPDATE
  ON "public"."congregations" FOR EACH ROW EXECUTE FUNCTION "extensions"."moddatetime"('updated_at');

CREATE
OR REPLACE TRIGGER "handle_updated_at" BEFORE
UPDATE
  ON "public"."users" FOR EACH ROW EXECUTE FUNCTION "extensions"."moddatetime"('updated_at');

ALTER TABLE
  ONLY "public"."congregations"
ADD
  CONSTRAINT "congregations_created_by_fkey" FOREIGN KEY ("created_by") REFERENCES "public"."users"("id");

ALTER TABLE
  ONLY "public"."congregations"
ADD
  CONSTRAINT "congregations_updated_by_fkey" FOREIGN KEY ("updated_by") REFERENCES "public"."users"("id");

ALTER TABLE
  ONLY "public"."users"
ADD
  CONSTRAINT "users_congregation_id_fkey" FOREIGN KEY ("congregation_id") REFERENCES "public"."congregations"("id") ON DELETE
SET
  NULL;

ALTER TABLE
  ONLY "public"."users"
ADD
  CONSTRAINT "users_created_by_fkey" FOREIGN KEY ("created_by") REFERENCES "public"."users"("id");

ALTER TABLE
  ONLY "public"."users"
ADD
  CONSTRAINT "users_updated_by_fkey" FOREIGN KEY ("updated_by") REFERENCES "public"."users"("id");

ALTER PUBLICATION "supabase_realtime" OWNER TO "postgres";

GRANT USAGE ON SCHEMA "public" TO "postgres";

GRANT USAGE ON SCHEMA "public" TO "anon";

GRANT USAGE ON SCHEMA "public" TO "authenticated";

GRANT USAGE ON SCHEMA "public" TO "service_role";

GRANT ALL ON FUNCTION "public"."handle_new_user"() TO "anon";

GRANT ALL ON FUNCTION "public"."handle_new_user"() TO "authenticated";

GRANT ALL ON FUNCTION "public"."handle_new_user"() TO "service_role";

GRANT ALL ON TABLE "public"."congregations" TO "anon";

GRANT ALL ON TABLE "public"."congregations" TO "authenticated";

GRANT ALL ON TABLE "public"."congregations" TO "service_role";

GRANT ALL ON TABLE "public"."users" TO "anon";

GRANT ALL ON TABLE "public"."users" TO "authenticated";

GRANT ALL ON TABLE "public"."users" TO "service_role";

ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON SEQUENCES TO "postgres";

ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON SEQUENCES TO "anon";

ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON SEQUENCES TO "authenticated";

ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON SEQUENCES TO "service_role";

ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON FUNCTIONS TO "postgres";

ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON FUNCTIONS TO "anon";

ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON FUNCTIONS TO "authenticated";

ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON FUNCTIONS TO "service_role";

ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON TABLES TO "postgres";

ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON TABLES TO "anon";

ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON TABLES TO "authenticated";

ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON TABLES TO "service_role";

RESET ALL;

--
-- Dumped schema changes for auth and storage
--