# == Schema Information
#
# Table name: chart_metrics
#
#  id         :integer          not null, primary key
#  name       :string           not null
#  metrics    :text             not null
#  data_id    :integer          not null
#  created_at :datetime         not null
#  updated_at :datetime         not null
#

class ChartMetric < ActiveRecord::Base
  validates :name, :metrics, :data_id, presence: true

  belongs_to :data_source, foreign_key: :data_id
end
