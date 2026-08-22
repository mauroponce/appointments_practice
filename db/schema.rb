# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# This file is the source Rails uses to define your schema when running `bin/rails
# db:schema:load`. When creating a new database, `bin/rails db:schema:load` tends to
# be faster and is potentially less error prone than running all of your
# migrations from scratch. Old migrations may fail to apply correctly if those
# migrations use external dependencies or application code.
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema[8.1].define(version: 2026_08_22_012135) do
  # These are extensions that must be enabled in order to support this database
  enable_extension "pg_catalog.plpgsql"

  create_table "accounts", force: :cascade do |t|
    t.boolean "active", default: true, null: false
    t.datetime "created_at", null: false
    t.string "name", null: false
    t.datetime "updated_at", null: false
  end

  create_table "appointments", force: :cascade do |t|
    t.bigint "account_id", null: false
    t.datetime "created_at", null: false
    t.bigint "customer_id", null: false
    t.integer "price_cents", default: 0, null: false
    t.datetime "starts_at", null: false
    t.string "status", default: "pending", null: false
    t.datetime "updated_at", null: false
    t.index ["account_id"], name: "index_appointments_on_account_id"
    t.index ["customer_id"], name: "index_appointments_on_customer_id"
  end

  create_table "customers", force: :cascade do |t|
    t.bigint "account_id", null: false
    t.boolean "active", default: true, null: false
    t.datetime "created_at", null: false
    t.string "email"
    t.string "name", null: false
    t.datetime "updated_at", null: false
    t.index ["account_id"], name: "index_customers_on_account_id"
  end

  create_table "professional_services", force: :cascade do |t|
    t.datetime "created_at", null: false
    t.bigint "professional_id", null: false
    t.bigint "service_id", null: false
    t.datetime "updated_at", null: false
    t.index ["professional_id", "service_id"], name: "index_professional_services_on_professional_id_and_service_id", unique: true
    t.index ["service_id"], name: "index_professional_services_on_service_id"
  end

  create_table "professionals", force: :cascade do |t|
    t.bigint "account_id", null: false
    t.boolean "active", default: true, null: false
    t.datetime "created_at", null: false
    t.string "email"
    t.string "name", null: false
    t.datetime "updated_at", null: false
    t.index ["account_id"], name: "index_professionals_on_account_id"
  end

  create_table "services", force: :cascade do |t|
    t.bigint "account_id", null: false
    t.boolean "active", default: true, null: false
    t.datetime "created_at", null: false
    t.integer "duration_minutes", null: false
    t.string "name", null: false
    t.integer "price_cents", default: 0, null: false
    t.datetime "updated_at", null: false
    t.index ["account_id"], name: "index_services_on_account_id"
  end

  add_foreign_key "appointments", "accounts"
  add_foreign_key "appointments", "customers"
  add_foreign_key "customers", "accounts"
  add_foreign_key "professional_services", "professionals"
  add_foreign_key "professional_services", "services"
  add_foreign_key "professionals", "accounts"
  add_foreign_key "services", "accounts"
end
