import type { Appointment } from '../types/appointment'
import { Link } from 'react-router-dom'


interface AppointmentListItemProps {
	appointment: Appointment
}

export function AppointmentListItem({ appointment } : AppointmentListItemProps) {
	return(
		<li>
			<strong>{appointment.status}</strong>
      {" - "}
      ${appointment.price_cents}
      {" - "}
      {new Date(appointment.starts_at).toLocaleString()}
      <Link to={`/appointments/${appointment.id}/edit`}>Edit</Link>
    </li>
	)
}
