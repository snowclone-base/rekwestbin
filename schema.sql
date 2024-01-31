CREATE TABLE bins (
  id uuid PRIMARY KEY,
  bin_path uuid,
  created_at timestamp
);

CREATE TABLE requests (
  id uuid PRIMARY KEY,
  bin_id uuid
    NOT NULL
    REFERENCES bins (id)
    ON DELETE CASCADE,
  mongo_id varchar,
  received_at timestamp,
  http_method varchar,
  http_path varchar
);