export type AppointmentStatus = | "pending" | "confirmed" | "cancelled"

export interface Appointment {
  id: number
  customer_id: number
  professional_id: number
  service_id: number
  price_cents: number
  status: AppointmentStatus
  starts_at: string
}

export interface CreateAppointmentParams {
  customer_id: number
  professional_id: number
  service_id: number
  status: AppointmentStatus
  starts_at: string
}

export interface AppointmentsFormData {
  customers:     { id: number, name: string }[]
  services:      { id: number, name: string }[]
  professionals: { id: number, name: string }[]
}