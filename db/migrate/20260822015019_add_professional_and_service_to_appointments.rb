class AddProfessionalAndServiceToAppointments < ActiveRecord::Migration[8.1]
  def change
    add_reference :appointments, :professional, null: false, foreign_key: true
    add_reference :appointments, :service, null: false, foreign_key: true
  end
end
