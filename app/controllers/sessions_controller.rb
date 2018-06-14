class SessionsController < ApplicationController
  def new
    @user = User.new
  end

  def create
    @user = User.find_or_create_by(uid: auth['uid']) do |user|
      user.name = auth['info']['name']
      user.email = auth['info']['email']
      user.image = auth['info']['image']
    end

    session[:user_id] = @user.id

    render 'welcome/home'
    # @user = User.find_by(email: params[:emal])

    # if @user && @user.authenticate[params[:password]]
    #   session[:user_id] = @user.id
    #   redirect_to user_path(@user)
    # end
  end

  def destroy
    session.delete(:user_id)
    redirect_to root_path
  end
end