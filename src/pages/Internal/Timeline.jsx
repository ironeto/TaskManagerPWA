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
        const response = await getTasks(firebaseApp);
        const user = await dataModelUser.getLocal({ synced: true });
        const tasksCalendar = response.map((task, index) => {
            return {
                id: task.id,
                label: task.title,
                groupLabel: task.category,
                user: user[0].email,
                color: "#f28f6a",
                startHour: task.hour,
                endHour: task.hourEnd,
                date: task.day,
                createdBy: user[0].email
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
          message: "Task Calendar",
          showActionButton: false,
          showNotification: false,
          delay: 1500
        },
        toolbarProps: {
          showSearchBar: true,
          showSwitchModeButtons: false,
          showDatePicker: false
        }
      });
           
      const handleEventClick = (event, item) => {
        navigate(`/task/${item.id}`);
      };
        
    useEffect(() => {
        setCurrentPath(window.location.pathname)
        verifyLogin(loggoutRoutes, window.location.pathname, navigate, firebaseApp)
    }, []);
     
    return <>
        <TopComponent hasMenu={true} hasArrowBack={true} hasImage={false} title={`Calendário`}/>
        <div style={{ marginTop: '20px' }}> {/* Add margin top here */}
      <Scheduler
        locale="en"
        events={tasks}
        legacyStyle={false}
        options={state?.options}
        alertProps={state?.alertProps}
        toolbarProps={state?.toolbarProps}
        onTaskClick={handleEventClick}
      />
    </div>
    </>
}

export default Timeline;