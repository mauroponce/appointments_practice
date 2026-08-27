class Professional < ApplicationRecord
  belongs_to :account
  has_many :professional_services
  has_many :services, through: :professional_services
  has_many :appointments

  validates :name, presence: true

  scope :active, -> { where(active: true) }
end
