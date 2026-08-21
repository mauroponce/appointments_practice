class Appointment < ApplicationRecord
  belongs_to :account
  belongs_to :customer

  validates :starts_at, presence: true
  validates :status, inclusion: { in: %w[pending confirmed cancelled] }
end
