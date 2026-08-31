import { AppointmentList } from './AppointmentList'
import { AppointmentForm } from './AppointmentForm'

export function AppointmentsPage({ appointments }) {
	return(
		<section id="center">
      <h1>Appointments</h1>
      <AppointmentForm/>
      <AppointmentList appointments={appointments} />
      
    </section>
	)
}