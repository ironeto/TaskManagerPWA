import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { verifyLogin } from "../../utils/auth";
import { TopComponent } from "../../components";
import Scheduler from "react-mui-scheduler";
import { getTasks } from '../../utils/task';
import { DataModel } from "../../data/datamodel";

const Timeline = ({ setCurrentPath, loggoutRoutes, firebaseApp }) => {
    const navigate = useNavigate();
    const [tasks, setTasks] = useState([]);
    const dataModelUser = new DataModel('user', firebaseApp, 'user', 'user');

    const listTasks = async () => {
        debugger;
        const response = await getTasks(firebaseApp);
        const user = await dataModelUser.getLocal({ synced: false });
        const tasksCalendar = response.map((task, index) => {
            return {
                id: task.id,
                label: task.title,
                groupLabel: task.category,
                user: task.description,
                color: "#f28f6a",
                startHour: task.hour,
                endHour: "10:00 AM",
                date: task.day,
                createdBy: user.displayName
              }
        });

        setTasks(tasksCalendar);
    };

    useEffect(() => {
        setCurrentPath(window.location.pathname);
        verifyLogin(loggoutRoutes, window.location.pathname, navigate, firebaseApp);
        listTasks();
    }, []);


    const [state] = useState({
        options: {
          transitionMode: "zoom", // or fade
          startWeekOn: "Mon", // or Sun
          defaultMode: "month", // or week | day | timeline
          minWidth: 540,
          maxWidth: 540,
          minHeight: 540,
          maxHeight: 540
        },
        alertProps: {
          open: false,
          color: "info", // info | success | warning | error
          severity: "info", // info | success | warning | error
          message: "🚀 Let's start with awesome react-mui-scheduler 🔥 🔥 🔥",
          showActionButton: false,
          showNotification: false,
          delay: 1500
        },
        toolbarProps: {
          showSearchBar: true,
          showSwitchModeButtons: true,
          showDatePicker: true
        }
      });
        
      const handleCellClick = (event, row, day) => {
        // Do something...
      };
    
      const handleEventClick = (event, item) => {
        // Do something...
      };
    
      const handleEventsChange = (item) => {
        // Do something...
      };
    
      const handleAlertCloseButtonClicked = (item) => {
        // Do something...
      };

    useEffect(() => {
        setCurrentPath(window.location.pathname)
        verifyLogin(loggoutRoutes, window.location.pathname, navigate, firebaseApp)
    }, []);
     
    return <>
        <TopComponent hasMenu={true} hasArrowBack={true} hasImage={false} title={`Calendário`}/>
        <Scheduler
      locale="fr"
      events={tasks}
      legacyStyle={false}
      options={state?.options}
      alertProps={state?.alertProps}
      toolbarProps={state?.toolbarProps}
      onEventsChange={handleEventsChange}
      onCellClick={handleCellClick}
      onTaskClick={handleEventClick}
      onAlertCloseButtonClicked={handleAlertCloseButtonClicked}
    />
    </>
}

export default Timeline;