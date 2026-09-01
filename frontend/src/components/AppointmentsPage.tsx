import { AppointmentList } from './AppointmentList'
import { AppointmentForm } from './AppointmentForm'
import type { Appointment } from '../types/appointment'

interface AppointmentsPageProps {
  appointments: Appointment[]
}

export function AppointmentsPage({ appointments }: AppointmentsPageProps) {
	return(
		<section id="center">
      <h1>Appointments</h1>
      <AppointmentForm/>
      <AppointmentList appointments={appointments} />
      
    </section>
	)
}
