import React, { useState, useEffect } from 'react';
import Navbar from '../components/Navbar.js';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import { useNavigate } from 'react-router-dom';
import '../styles/StudentDashboard.css';


function generateICS(activities) {
  let icsContent = `BEGIN:VCALENDAR
VERSION:2.0
CALSCALE:GREGORIAN
PRODID:-//StudentKalendar//EN
`;

  activities.forEach((activity) => {
    // Parsiraj datum i vreme iz formata "YYYY-MM-DD HH:mm:ss"
    const parseDate = (dateTimeStr) => {
      if (!dateTimeStr) return { date: '', time: '' };
      const [date, time] = dateTimeStr.split(' ');
      return {
        date: date || '',
        time: time ? time.slice(0, 8) : '', // HH:mm:ss
      };
    };

    const start = parseDate(activity.start_date);
    const end = parseDate(activity.end_date);

    const name = activity.name || '';
    const description = activity.description || '';
    const type = activity.type || '';

    // Da li je celodnevni događaj (nema vremena)
    const isAllDay = !start.time || start.time === '00:00:00';

    let dtStart, dtEnd;

    if (isAllDay) {
      // DTEND za celodnevni događaj je sledeći dan
      const startDateObj = new Date(start.date);
      const endDateObj = end.date ? new Date(end.date) : new Date(start.date);
      endDateObj.setDate(endDateObj.getDate() + 1);
      dtStart = `DTSTART;VALUE=DATE:${startDateObj.toISOString().slice(0,10).replace(/-/g, '')}`;
      dtEnd = `DTEND;VALUE=DATE:${endDateObj.toISOString().slice(0,10).replace(/-/g, '')}`;
    } else {
      // Ako ima vremena, koristi format YYYYMMDDTHHmmss
      const formatDateTime = (date, time) => {
        if (!date) return '';
        const t = time && time !== '00:00:00' ? time : '00:00:00';
        return date.replace(/-/g, '') + 'T' + t.replace(/:/g, '');
      };

      // Ako nema end_time, koristi start_time + 1 sat za DTEND
      let endTime = end.time;
      if ((!endTime || endTime === '00:00:00') && start.time && start.time !== '00:00:00') {
        // Dodaj 1 sat na start_time
        const [h, m, s] = start.time.split(':');
        let hour = parseInt(h, 10) + 1;
        if (hour === 24) hour = '00';
        else if (hour < 10) hour = '0' + hour;
        else hour = hour.toString();
        endTime = `${hour}:${m}:${s || '00'}`;
      }
      dtStart = `DTSTART:${formatDateTime(start.date, start.time)}`;
      dtEnd = `DTEND:${formatDateTime(end.date || start.date, endTime)}`;
    }

    icsContent += `BEGIN:VEVENT
UID:${activity.id}@studentkalendar
SUMMARY:${name} (${type})
DESCRIPTION:${description}
${dtStart}
${dtEnd}
END:VEVENT
`;
  });

  icsContent += 'END:VCALENDAR';
  return icsContent;
}

const Dashboard = ({ activities, setActivities }) => {
  const [showPopup, setShowPopup] = useState(false);
  const [currentTime, setCurrentTime] = useState(new Date());
  const [searchTerm, setSearchTerm] = useState('');
  const [studentName, setStudentName] = useState('');

  const [newActivity, setNewActivity] = useState({
    name: '',
    description: '',
    type: 'Exam',
    startDate: '',
    startTime: '',
    endDate: '',
    endTime: '',
  });

  useEffect(() => {
    const token = localStorage.getItem('token');
    fetch('http://localhost:8000/api/activities', {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((res) => res.json())
      .then((data) => setActivities(data))
      .catch((err) => console.error('Failed to fetch activities:', err));
  }, [setActivities]);

  const navigate = useNavigate();

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    // Dohvati ime studenta sa backend-a
    const fetchStudent = async () => {
      const token = localStorage.getItem('token');
      if (token) {
        try {
          const response = await fetch('http://localhost:8000/api/user', {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
          if (response.ok) {
            const userData = await response.json();
            setStudentName(userData.name);
          }
        } catch (error) {
          console.error('Failed to fetch student data:', error);
        }
      }
    };
    fetchStudent();

    return () => clearInterval(timer);
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewActivity({ ...newActivity, [name]: value });
  };

  const handleSave = async () => {
    const token = localStorage.getItem('token');
    const payload = {
      name: newActivity.name,
      description: newActivity.description,
      type: newActivity.type,
      start_date: newActivity.startDate,
      end_date: newActivity.endDate,
      start_time: newActivity.startTime,
      end_time: newActivity.endTime,
    };

    try {
      const response = await fetch('http://localhost:8000/api/activities', {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });
      if (response.ok) {
        setShowPopup(false);
        setNewActivity({
          name: '',
          description: '',
          type: 'Exam',
          startDate: '',
          startTime: '',
          endDate: '',
          endTime: '',
        });
        // Povuci sve aktivnosti iz baze
        fetch('http://localhost:8000/api/activities', {
          headers: { Authorization: `Bearer ${token}` },
        })
          .then((res) => res.json())
          .then((data) => setActivities(data));
      } else {
        alert('Failed to save activity!');
      }
    } catch (err) {
      alert('Error saving activity!');
    }
  };

  const handleCancel = () => {
    setShowPopup(false);
  };

  const handleEventClick = (eventInfo) => {
    navigate(`/activities/${eventInfo.event.id}`);
  };

  // ICS EXPORT HANDLER
  const handleExportICS = () => {
    console.log(activities);
    const ics = generateICS(activities);
    const blob = new Blob([ics], { type: 'text/calendar;charset=utf-8' });
    const url = URL.createObjectURL(blob);

    const link = document.createElement('a');
    link.href = url;
    link.download = 'activities.ics';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  const filteredEvents = activities
    .filter((activity) =>
      activity.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      activity.type.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (activity.description && activity.description.toLowerCase().includes(searchTerm.toLowerCase()))
    )
    .map((activity) => ({
      id: activity.id,
      title: activity.name ? `${activity.name} (${activity.type})` : activity.type,
      start: activity.start_date,
    }));

  return (
    <div className="dashboard">
      <Navbar />
      <div className="dashboard-content">
        <div>
          <div className="welcome-panel">
            <h2>Hello, {studentName ? studentName : 'student'}!</h2>
            <p>Success starts with good planning – let’s go!</p>
          </div>
          <div className="time-panel">
            <h3>Current Time</h3>
            <p>{currentTime.toLocaleTimeString()}</p>
          </div>

          {/* Polje za pretragu */}
          <div className="search-bar">
            <input
              type="text"
              placeholder="Search activities..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="search-input"
            />
          </div>

          <button className="new-activity-button" onClick={() => setShowPopup(true)}>
            + New Activity
          </button>
        </div>
        <div className="calendar-panel">
          <button onClick={handleExportICS} className="export-ics-button" style={{marginBottom: '15px'}}>
            Export as .ics
          </button>
          <FullCalendar
            plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
            initialView="dayGridMonth"
            headerToolbar={{
              left: 'prev,next today',
              center: 'title',
              right: 'dayGridMonth,timeGridWeek,timeGridDay',
            }}
            events={filteredEvents}
            eventClick={handleEventClick}
            height="540px"
            displayEventTime={false}
          />
        </div>
      </div>
      {showPopup && (
        <div className="popup-overlay">
          <div className="popup">
            <h2>New Activity</h2>
            <div className="popup-content">
              <label>Name</label>
              <input
                type="text"
                name="name"
                value={newActivity.name}
                onChange={handleInputChange}
              />
              <label>Description</label>
              <textarea
                name="description"
                value={newActivity.description}
                onChange={handleInputChange}
              />
              <label>Type</label>
              <select
                name="type"
                value={newActivity.type}
                onChange={handleInputChange}
              >
                <option value="Exam">Exam</option>
                <option value="Lecture">Lecture</option>
                <option value="Exercise">Exercise</option>
                <option value="Project">Project</option>
              </select>
              <label>Scheduling</label>
              <div className="date-picker-container">
                <div>
                  <label>Start Date</label>
                  <input
                    type="date"
                    name="startDate"
                    value={newActivity.startDate}
                    onChange={handleInputChange}
                  />
                  <label>Start Time</label>
                  <input
                    type="time"
                    name="startTime"
                    value={newActivity.startTime}
                    onChange={handleInputChange}
                  />
                </div>
                <div>
                  <label>End Date</label>
                  <input
                    type="date"
                    name="endDate"
                    value={newActivity.endDate}
                    onChange={handleInputChange}
                  />
                  <label>End Time</label>
                  <input
                    type="time"
                    name="endTime"
                    value={newActivity.endTime}
                    onChange={handleInputChange}
                  />
                </div>
              </div>
            </div>
            <div className="popup-actions">
              <button onClick={handleCancel}>Cancel</button>
              <button onClick={handleSave}>Save</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Dashboard;