class Api::V1::AppointmentsController < Api::V1::BaseController
  before_action :set_appointment, only: %i[show update]

  def index
    appointments = current_account.appointments.order(:starts_at)

    render json: appointments
  end

  def show
    render json: @appointment
  end

  def create
    appointment = current_account.appointments.create!(
      resolved_appointment_attributes.merge(price_cents: selected_service.price_cents)
    )
    
    render json: appointment, status: :created
  end

  def update
    @appointment.update!(resolved_appointment_attributes)
  
    render json: @appointment
  end

  def form_data
    render json: {
      customers: current_account.customers.active
        .pluck(:id, :name)
        .map{|id, name| { id:, name: }},

      professionals: current_account.professionals.active
        .pluck(:id, :name)
        .map{|id, name| { id:, name: }},

      services: current_account.services.active
        .pluck(:id, :name)
        .map{|id, name| { id:, name: }}
    }
  end

  private

  def set_appointment
    @appointment = current_account.appointments.find(params[:id])
  end

  def appointment_params
    params.require(:appointment).permit(
      :customer_id,
      :professional_id,
      :service_id,
      :status,
      :starts_at
    )
  end

  def resolved_appointment_attributes
    attributes = appointment_params.to_h.symbolize_keys

    if attributes[:customer_id].present?
      attributes[:customer] = current_account.customers.find(attributes.delete(:customer_id))
    end

    if attributes[:professional_id].present?
      attributes[:professional] = current_account.professionals.find(attributes.delete(:professional_id))
    end

    if attributes[:service_id].present?
      attributes[:service] = current_account.services.find(attributes.delete(:service_id))
    end

    attributes
  end

  def selected_service
    service_id = appointment_params[:service_id]
    service = current_account.services.find(service_id)
  end
end
