class CreateGroupsNumber < ActiveRecord::Migration[7.0]
  def change
    create_table :groups_numbers do |t|
      t.integer :group_id
      t.integer :patients_number
      t.datetime :created_at
      t.datetime :updated_at
    end
  end
end
