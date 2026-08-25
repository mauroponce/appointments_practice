import type { Appointment, CreateAppointmentParams } from './types/appointment'
import { apiRequest } from './client.ts'

export async function fetchAppointments(): Promise<Appointment[]> {
  return apiRequest<Appointment[]>("/appointments")
}

export async function fetchAppointment(
  id: number
): Promise<Appointment> {
  return apiRequest<Appointment>(`/appointments/${id}`)
}

export async function createAppointment(
  params: CreateAppointmentParams
): Promise<Appointment> {
  return apiRequest<Appointment>("/appointments", {
    method: "POST",
    body: JSON.stringify({
      appointment: params
    })
  })
}

/*

const appointment = await createAppointment({
  customer_id: 2
  professional_id: 1
  service_id: 1
  price_cents: 20000
  status: "pending"
  starts_at: "2026-08-30T15:00:00-03:00"
})
*/
