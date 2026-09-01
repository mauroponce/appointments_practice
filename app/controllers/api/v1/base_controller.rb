class Api::V1::BaseController < ApplicationController
  skip_before_action :verify_authenticity_token
  before_action :set_current_account

  rescue_from ActiveRecord::RecordNotFound, with: :render_record_not_found
  rescue_from ActiveRecord::RecordInvalid, with: :render_record_invalid

  private

  attr_reader :current_account

  def set_current_account
    @current_account = Account.find(request.headers["X-Account-Id"])
  end

  def render_record_not_found(exception)
    render json: { error: "Record not found", message: exception.message }, status: :not_found # 404
  end

  def render_record_invalid(exception)
    render json: { error: "Record invalid", errors: exception.record.errors.to_hash }, status: :unprocessable_entity # 422
  end
end
