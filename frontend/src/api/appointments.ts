import type { Appointment } from './types/appointment'
import { apiRequest } from './client.ts'

export async function fetchAppointments(): Promise<Appointment[]> {
  return apiRequest<Appointment[]>("/appointments")
}

export async function fetchAppointment(
  id: number
): Promise<Appointment> {
  return apiRequest<Appointment>(`/appointments/${id}`)
}
