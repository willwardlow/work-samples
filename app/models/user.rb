class User < ApplicationRecord
  has_secure_password

  belongs_to :organization
  has_many :shifts

  validates :name, presence: true, uniqueness: true
  validates :email_address, presence: true, uniqueness: true
  validates :email_address, format: { with: URI::MailTo::EMAIL_REGEXP }
  validates :password, length: {within: 6..20}

end
