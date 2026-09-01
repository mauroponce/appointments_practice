import type { Appointment } from '../types/appointment'
import { AppointmentListItem } from './AppointmentListItem'

interface AppointmentListProps {
  appointments: Appointment[]
}

export function AppointmentList({ appointments } : AppointmentListProps){

  if(appointments.length === 0) {
    return <p>No appointments found.</p>
  }

  return (
    <ul>
      {appointments.map(appointment => <AppointmentListItem appointment={appointment} key={appointment.id}/>)}
    </ul>
  )
}

