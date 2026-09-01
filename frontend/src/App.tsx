import { Routes, Route } from 'react-router-dom'
import './App.css'
import { fetchAppointments } from './api/appointments'
import { AppointmentsPage } from './components/AppointmentsPage'
import { EditAppointmentPage } from './components/EditAppointmentPage'

import { useQuery } from '@tanstack/react-query'

function App() {
  const {
    data: appointments = [],
    isLoading,
    error
  } = useQuery({
    queryKey: ["appointments", "list"], // The cached resource
    queryFn: fetchAppointments // How to fetch that resource
  })

  if(isLoading) {
    return <p>Loading appointments...</p>
  }

  if(error) {
    return <p>Error: {error.message}</p>
  }

  return (
    <Routes>
      <Route path="/" element={<AppointmentsPage appointments={appointments} />} />
      <Route path="/appointments/:id/edit" element={<EditAppointmentPage />}/>
    </Routes>
  )
}

export default App
