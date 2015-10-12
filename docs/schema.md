# Schema Information

## users
column name     | data type | details
----------------|-----------|-----------------------
id              | integer   | not null, primary key
username        | string    | not null, indexed, unique
password_digest | string    | not null
session_token   | string    | not null, indexed, unique
premium         | boolean   | not null, default: false

## data_sources
column name | data type | details
------------|-----------|-----------------------
id          | integer   | not null, primary key
name        | string    | not null
url         | text      | not null
description | text      | not null
user_id     | integer   | not null, foreign key (references users), indexed
public      | boolean   | not null, default: false

## chart_metrics
column name | data type | details
------------|-----------|-----------------------
id          | integer   | not null, primary key
name        | string    | not null
metrics     | text      | not null, (json string)
data_id     | integer   | not null, foreign key (references data_sources), indexed

## shares
column name | data type | details
------------|-----------|-----------------------
id          | integer   | not null, primary key
owner_id    | string    | not null, foreign key (references users), indexed
shared_id   | text      | not null, foreign key (references users), indexed
data_id     | integer   | not null, foreign key (references data_sources), indexed

## data_tables
column name | data type | details
------------|-----------|-----------------------
id          | integer   | not null, primary key
table_name  | string    | not null
data_id     | text      | not null, foreign key (references data_sources), indexed
user_id     | integer   | not null, foreign key (references users), indexed
