import { useQuery } from '@tanstack/react-query'
import { useParams } from 'react-router-dom'
import { fetchAppointment } from '../api/appointments'
import { AppointmentForm } from '../components/AppointmentForm'

export function EditAppointmentPage() {
	const { id } = useParams()
	const {
    data: appointment,
    isLoading,
    error
  } = useQuery({
    queryKey: ["appointments", Number(id)],
    queryFn: () => fetchAppointment(Number(id))
  })

  if(isLoading) {
    return <p>Loading appointments...</p>
  }

  if(error) {
    return <p>Error: {error.message}</p>
  }

  if (!appointment) {
    return <p>Appointment not found.</p>
  }

	return (
		<section id="center">
      <AppointmentForm appointment={appointment}/>
    </section>
	)
}
