class AddBaladiaToUsers < ActiveRecord::Migration[5.2]
  def change
    add_column :users, :baladia, :string
  end
end
