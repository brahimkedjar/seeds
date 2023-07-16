class CreateImages < ActiveRecord::Migration[6.1]
  create_table "images", force: :cascade do |t|
    t.string "name"
    t.text "description"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.bigint "user_id"
    t.index ["user_id"], name: "index_images_on_user_id"
  end
end
