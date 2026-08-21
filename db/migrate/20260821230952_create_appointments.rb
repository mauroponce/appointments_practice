class CreateAppointments < ActiveRecord::Migration[8.1]
  def change
    create_table :appointments do |t|
      t.references :account, null: false, foreign_key: true
      t.references :customer, null: false, foreign_key: true
      t.datetime   :starts_at, null: false
      t.string     :status, null: false, default: "pending"
      t.integer    :price_cents, null: false, default: 0

      t.timestamps
    end
  end
end
