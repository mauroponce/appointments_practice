class Api::V1::BaseController < ApplicationController
  skip_before_action :verify_authenticity_token
  before_action :set_current_account

  attr_reader :current_account

  def set_current_account
    @current_account = Account.find(request.headers['X-Account-Id'])
  end
end