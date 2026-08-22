class Service < ApplicationRecord
  belongs_to :account
  has_many :professional_services
  has_many :professionals, through: :professional_services

  validates :name, presence: true
  validates :duration_minutes, presence: true
  validates :price_cents, presence: true
end
