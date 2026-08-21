class Account < ApplicationRecord
  has_many :customers
  has_many :appointments

  validates :name, presence: true
end
