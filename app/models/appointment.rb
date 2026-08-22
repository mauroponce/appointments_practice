class Appointment < ApplicationRecord
  belongs_to :account
  belongs_to :customer
  belongs_to :professional
  belongs_to :service

  validates :starts_at, presence: true
  validates :status, inclusion: { in: %w[pending confirmed cancelled] }
end
