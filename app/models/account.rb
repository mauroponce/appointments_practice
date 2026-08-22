class Account < ApplicationRecord
  has_many :customers
  has_many :appointments
  has_many :professionals
  has_many :services

  validates :name, presence: true
end
