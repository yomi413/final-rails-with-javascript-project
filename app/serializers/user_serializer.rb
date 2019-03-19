class UserSerializer < ActiveModel::Serializer
  attributes :id, :name

  has_many :cars
  has_many :parking_spaces
end