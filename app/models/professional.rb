class Professional < ApplicationRecord
  belongs_to :account
  has_many :professional_services
  has_many :services, through: :professional_services

  validates :name, presence: true
end
