import React from 'react';
import Navbar from '../components/Navbar.js';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid'; // Mesečni prikaz
import timeGridPlugin from '@fullcalendar/timegrid'; // Nedeljni i dnevni prikaz
import interactionPlugin from '@fullcalendar/interaction'; // Omogućava interakcije (klik na datum)
import '../styles/Dashboard.css'; // Vaš postojeći CSS

const Dashboard = () => {
  // Hardkodirane aktivnosti za testiranje
  const events = [
    { title: 'Exam: Projektovanje softvera', date: '2025-03-25' },
    { title: 'Exercise: ITEH', date: '2025-03-26' },
    { title: 'Project: Web Development', date: '2025-03-26' },
    { title: 'Exam: Simulacija i simulacioni jezici', date: '2025-03-27' },
  ];

  return (
    <div className="dashboard">
      <Navbar />
      <div className="dashboard-content">
        {/* Panel sa leve strane */}
        <div>
          <div className="welcome-panel">
            <h2>Hello, username!</h2>
            <p>Success starts with good planning – let’s go!</p>
          </div>
        </div>

        {/* Kalendar sa desne strane */}
        <div className="calendar-panel">
          <FullCalendar
            plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
            initialView="dayGridMonth" // Početni prikaz (mesečni)
            headerToolbar={{
              left: 'prev,next today', // Dugmad za navigaciju
              center: 'title', // Naslov (npr. "March 2025")
              right: 'dayGridMonth,timeGridWeek,timeGridDay', // Prikazi: mesečni, nedeljni, dnevni
            }}
            events={events} // Događaji
            dateClick={(info) => console.log(info.date)} // Klik na datum
            height="540px" // Automatska visina
          />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;