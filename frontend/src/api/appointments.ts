import type { Appointment } from './types/appointment'

export async function fetchAppointments(): Promise<Appointment[]> {
  const response = await fetch(`http://localhost:3004/api/v1/appointments`, {
    headers: {
      "X-Account-Id": "2"
    }
  })

  if(!response.ok) { // fetch only rejects the Promise for network errors, not 404, 422, 500, we have to check the response
    throw new Error(`Request failed with status: ${response.status}`)
  }

  return response.json()
}

export async function fetchAppointment(
	id: number
): Promise<Appointment> {
	const response = await fetch(`http://localhost:3004/api/v1/appointments/${id}`, {
		headers: {
			"X-Account-Id": "2"
		}
	})

	if(!response.ok) { // fetch only rejects the Promise for network errors, not 404, 422, 500, we have to check the response
    throw new Error(`Request failed with status: ${response.status}`)
  }

  return response.json()
}
