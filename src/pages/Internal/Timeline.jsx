import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { verifyLogin } from "../../utils/auth";
import { TopComponent } from "../../components";
import Scheduler from "react-mui-scheduler";
import { getTasks } from '../../utils/task';
import { DataModel } from "../../data/datamodel";
import { Calendar, momentLocalizer } from 'react-big-calendar'
import moment from 'moment'
import 'react-big-calendar/lib/addons/dragAndDrop/styles.css';
import 'react-big-calendar/lib/css/react-big-calendar.css';

const localizer = momentLocalizer(moment)

const Timeline = ({ setCurrentPath, loggoutRoutes, firebaseApp }) => {
    const navigate = useNavigate();
    const [tasks, setTasks] = useState([]);
    const dataModelUser = new DataModel('user', firebaseApp, 'user', 'user');

    const listTasks = async () => {
        const response = await getTasks(firebaseApp);
        const tasksCalendar = response.map((task, index) => {
            return {
                id: task.id,
                title: task.title,
                start: new Date(`${task.day}T${task.hour}`),
                end:  new Date(`${task.day}T${task.hourEnd}`),
                desc: task.description
              }
        });

        setTasks(tasksCalendar);
    };

    useEffect(() => {
        setCurrentPath(window.location.pathname);
        verifyLogin(loggoutRoutes, window.location.pathname, navigate, firebaseApp);
        listTasks();
    }, []);
     
      const handleEventClick = (event) => {
        navigate(`/task/${event.id}`);
      };      
     
    return <>
        <TopComponent hasMenu={true} hasArrowBack={true} hasImage={false} title={`Calendário`}/>
        <div style={{ marginTop: '20px' }}>
        <div>
    <Calendar
      localizer={localizer}
      defaultView="month"
      events={tasks}
      startAccessor="start"
      endAccessor="end"
      onSelectEvent={handleEventClick}
      style={{ height: 600 }}
    />
  </div>
    </div>
    </>
}

export default Timeline;