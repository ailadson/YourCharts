class StaticPagesController < ApplicationController
  before_filter :ensure_login
  
  def root
  end

  private
  def ensure_login
    redirect_to new_user_url unless logged_in?
  end
end
