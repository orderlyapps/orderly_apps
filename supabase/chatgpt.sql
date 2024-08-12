-- create a table called congregations with a primary key of id uuid and name text
CREATE TABLE congregations (id UUID PRIMARY KEY, name TEXT);

-- create a table called people with a primary key of id uuid and congregation_id uuid which has a foreign key relation to congregations column id
CREATE TABLE people (
    id UUID PRIMARY KEY,
    congregation_id UUID,
    FOREIGN KEY (congregation_id) REFERENCES congregations(id);

-- create a table called admins with a composite primary key of congregation_id uuid which has a foreign key relation to congregations column id and person_id uuid which has a foreign key relation to people column id
CREATE TABLE admins (
    congregation_id UUID,
    person_id UUID,
    PRIMARY KEY (congregation_id, person_id),
    FOREIGN KEY (congregation_id) REFERENCES congregations(id),
    FOREIGN KEY (person_id) REFERENCES people(id)
);

-- create a view called publishers that gets all the people data plus returns is_admin if the person is found with in the admins table
CREATE VIEW publishers AS
SELECT
    people.*,
    CASE
        WHEN admins.congregation_id IS NULL THEN false
        ELSE true
    END AS "is_admin"
FROM
    people
    LEFT JOIN admins ON people.id = admins.person_id;

CREATE TRIGGER handle_updated_at BEFORE
UPDATE
    ON public.congregations FOR EACH ROW EXECUTE FUNCTION moddatetime('updated_at');