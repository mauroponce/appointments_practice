class CreateCustomers < ActiveRecord::Migration[8.1]
  def change
    create_table :customers do |t|
      t.references :account, null: false, foreign_key: true
      t.string :name
      t.string :email
      t.boolean :active

      t.timestamps
    end
  end
end
