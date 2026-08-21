class CreateAppointments < ActiveRecord::Migration[8.1]
  def change
    create_table :appointments do |t|
      t.references :account, null: false, foreign_key: true
      t.references :customer, null: false, foreign_key: true
      t.datetime :starts_at
      t.string :status
      t.integer :price_cents

      t.timestamps
    end
  end
end
