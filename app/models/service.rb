class Service < ApplicationRecord
  belongs_to :account

  validates :name, presence: true
  validates :duration_minutes, presence: true
  validates :price_cents, presence: true
end
