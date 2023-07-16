class AddNumeroCliniqueAndExperienceToDoctors < ActiveRecord::Migration[7.0]
  def change
    add_column :doctors, :numero_clinique, :string
    add_column :doctors, :experience, :string
  end
end
