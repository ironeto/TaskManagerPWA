import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { verifyLogin } from '../../utils/auth';
import { TopComponent } from '../../components';
import { getTasks } from '../../utils/task';
import {
  ListItem,
  ListItemSecondaryAction,
  IconButton
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { DataModel } from "../../data/datamodel";

const Home = ({ setCurrentPath, loggoutRoutes, firebaseApp }) => {
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [tasks, setTasks] = useState([]);

  const listTasks = async () => {    
    const response = await getTasks(firebaseApp);
    setTasks(response);
  };

  const handleDeleteTask = async (taskId) => {
    const confirmed = window.confirm('Are you sure you want to delete this task?');
    if (confirmed) {
      const dataModel = new DataModel('user', firebaseApp, 'tasks', 'tasks');
      await dataModel.delete(taskId);
      listTasks();
    }
  };

  useEffect(() => {
    setCurrentPath(window.location.pathname);
    verifyLogin(loggoutRoutes, window.location.pathname, navigate, firebaseApp);
    listTasks();
  }, []);

  return (
    <>
      <TopComponent hasMenu={false} hasImage={false} title={`Tarefas`} subtitle={'Sua lista de tarefas...'} />
      <div style={{ maxHeight: '70vh', overflowY: 'scroll', padding: '16px' }}>
        <ul style={{ listStyleType: 'none', padding: 0 }}>
          {tasks.map((task, index) => (
            <ListItem key={index} style={{ marginBottom: '16px', borderBottom: '1px solid #ccc', paddingBottom: '8px' }}>
              <h1 style={{ fontSize: '18px', color: task.concluded ? 'blue' : 'red' }}>{task.title}</h1>
              <ListItemSecondaryAction>
                <Link to={`/task/${task.id}`}>
                  <IconButton edge="end" aria-label="Editar">
                    <EditIcon />
                  </IconButton>
                </Link>
                <IconButton edge="end" aria-label="Excluir" onClick={() => handleDeleteTask(task.id)}>
                  <DeleteIcon />
                </IconButton>
              </ListItemSecondaryAction>
            </ListItem>
          ))}
        </ul>
      </div>
    </>
  );
};

export default Home;
