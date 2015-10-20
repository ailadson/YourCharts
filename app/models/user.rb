# == Schema Information
#
# Table name: users
#
#  id              :integer          not null, primary key
#  username        :string           not null
#  password_digest :string           not null
#  session_token   :string           not null
#  premium         :boolean          default(FALSE), not null
#  created_at      :datetime         not null
#  updated_at      :datetime         not null
#

class User < ActiveRecord::Base
  validates :username, :password_digest, :session_token, presence: true
  validates :password, length: { minimum: 6, allow_nil: true }

  after_initialize :ensure_session_token

  has_many :data_sources
  has_many :metrics, through: :data_sources, source: :metrics
  has_many :tables, through: :data_sources, source: :tables

  attr_reader :password

  def self.generate_session_token
    SecureRandom.urlsafe_base64(32)
  end

  def self.find_by_credentials(username, password)
    user = User.find_by_username(username)
    user if user && user.is_Password?(password)
  end

  def password=(password)
    @password = password
    self.password_digest = BCrypt::Password.create(password)
  end

  def is_Password?(password)
    BCrypt::Password.new(self.password_digest).is_password?(password)
  end

  def reset_session_token
    self.session_token = User.generate_session_token
    save!
  end

  def ensure_session_token
    self.session_token ||= User.generate_session_token
  end
end
