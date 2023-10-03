import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { verifyLogin } from '../../utils/auth';
import { TopComponent } from '../../components';
import { getTasks } from '../../utils/task';
import { ListItem, ListItemText, ListItemSecondaryAction, IconButton } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';

const Home = ({ setCurrentPath, loggoutRoutes, firebaseApp }) => {
    const navigate = useNavigate();
    const [username, setUsername] = useState("");
    const [tasks, setTasks] = useState([]);

    const listTasks = async () => {
        const response = await getTasks(firebaseApp);
        setTasks(response);
    };

    useEffect(() => {
        setCurrentPath(window.location.pathname);
        verifyLogin(loggoutRoutes, window.location.pathname, navigate, firebaseApp);
        listTasks();
    }, []);

    return (
        <>
            <TopComponent hasMenu={false} hasImage={false} title={`Tarefas`} subtitle={'Sua lista de tarefas...'}/>
            <div style={{ maxHeight: '70vh', overflowY: 'scroll', padding: '16px' }}>
                <ul style={{ listStyleType: 'none', padding: 0 }}>
                    {tasks.map((task, index) => (
                        <ListItem key={index} style={{ marginBottom: '16px', borderBottom: '1px solid #ccc', paddingBottom: '8px' }}>
                            <h1 style={{ fontSize: '18px' }}>{task.title}</h1>
                            <ListItemSecondaryAction>
                                <Link to={`/task/${task.id}`}>
                                    <IconButton edge="end" aria-label="Editar">
                                        <EditIcon />
                                    </IconButton>
                                </Link>
                            </ListItemSecondaryAction>
                        </ListItem>
                    ))}
                </ul>
            </div>
        </>
    );
};

export default Home;
