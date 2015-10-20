# == Schema Information
#
# Table name: data_sources
#
#  id          :integer          not null, primary key
#  name        :string           not null
#  url         :string           not null
#  description :text
#  user_id     :integer          not null
#  processed   :boolean          default(FALSE)
#  created_at  :datetime         not null
#  updated_at  :datetime         not null
#

class DataSource < ActiveRecord::Base
  validates :name, :url, :user_id, presence: true

  belongs_to :user
  has_many :metrics, class_name: "ChartMetric", foreign_key: :data_id
  has_many :tables, class_name: "DataTables", foreign_key: :data_id
end
