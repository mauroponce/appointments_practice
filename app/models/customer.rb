class Customer < ApplicationRecord
  belongs_to :account
  has_many :appointments

  validates :name, presence: true
end
