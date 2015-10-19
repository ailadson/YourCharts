class SessionsController < ApplicationController
  def new
  end

  def create
    @user = User.find_by_credentials(params[:user][:username],
                                     params[:user][:password])

    if @user
      login(@user)
      redirect_to root_url
    else
      redirect_to new_user_url
    end
  end

  def destroy
    logout!
    render json: {}
  end
end
