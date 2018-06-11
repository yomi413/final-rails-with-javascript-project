class UsersController < ApplicationController
  def new
    @user = User.new
  end

  def create
    @user = User.new(user_params)
    redirect_to user_path(@user)
  end

  private

  def user_params
    params.require(:user).permit(:name, :email, :password, :image, :uid)
  end
end
