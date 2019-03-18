class CarSerializer < ActiveModel::Serializer
  attributes :id, :make, :model, :year, :color, :size
end