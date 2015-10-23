# encoding: UTF-8
# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# Note that this schema.rb definition is the authoritative source for your
# database schema. If you need to create the application database on another
# system, you should be using db:schema:load, not running all the migrations
# from scratch. The latter is a flawed and unsustainable approach (the more migrations
# you'll amass, the slower it'll run and the greater likelihood for issues).
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema.define(version: 20151022221324) do

  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "chart_metrics", force: :cascade do |t|
    t.string   "name",       null: false
    t.text     "metrics",    null: false
    t.integer  "data_id",    null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.string   "chart_type"
  end

  add_index "chart_metrics", ["data_id"], name: "index_chart_metrics_on_data_id", using: :btree

  create_table "data_sources", force: :cascade do |t|
    t.string   "name",                        null: false
    t.string   "url"
    t.text     "description"
    t.integer  "user_id",                     null: false
    t.boolean  "processed",   default: false
    t.datetime "created_at",                  null: false
    t.datetime "updated_at",                  null: false
    t.text     "data"
  end

  add_index "data_sources", ["user_id"], name: "index_data_sources_on_user_id", using: :btree

  create_table "data_tables", force: :cascade do |t|
    t.string   "table_name", null: false
    t.integer  "data_id",    null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  add_index "data_tables", ["data_id"], name: "index_data_tables_on_data_id", using: :btree

  create_table "demo__sepal_petal_data", force: :cascade do |t|
    t.float  "sepalLength"
    t.float  "sepalWidth"
    t.float  "petalLength"
    t.float  "petalWidth"
    t.string "species"
  end

  create_table "demo_user__age_population_data", force: :cascade do |t|
    t.string  "age"
    t.integer "population"
  end

  create_table "demo_user__age_population_data2", force: :cascade do |t|
    t.string  "age"
    t.integer "population"
  end

  create_table "demo_user__sepal_petal_data", force: :cascade do |t|
    t.float  "sepalLength"
    t.float  "sepalWidth"
    t.float  "petalLength"
    t.float  "petalWidth"
    t.string "species"
  end

  create_table "users", force: :cascade do |t|
    t.string   "username",                        null: false
    t.string   "password_digest",                 null: false
    t.string   "session_token",                   null: false
    t.boolean  "premium",         default: false, null: false
    t.datetime "created_at",                      null: false
    t.datetime "updated_at",                      null: false
  end

  add_index "users", ["username"], name: "index_users_on_username", using: :btree

end
