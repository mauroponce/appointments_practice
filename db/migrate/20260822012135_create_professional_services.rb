class CreateProfessionalServices < ActiveRecord::Migration[8.1]
  def change
    create_table :professional_services do |t|
      t.references :professional, null: false, foreign_key: true, index: false
      t.references :service, null: false, foreign_key: true

      t.timestamps
    end

    add_index :professional_services, [ :professional_id, :service_id ], unique: true
  end
end
