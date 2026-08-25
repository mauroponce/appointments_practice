import type { Appointment } from './types/appointment'


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
    </li>
	)
}