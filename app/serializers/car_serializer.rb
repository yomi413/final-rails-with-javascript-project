class CarSerializer < ActiveModel::Serializer
  attributes :id, :make, :model, :year, :color, :size

  belongs_to :user
  has_one :parking_space
end