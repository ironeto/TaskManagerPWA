import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { verifyLogin } from '../../utils/auth';
import {
  BoxComponent,
  ButtonComponent,
  TextFieldComponent,
  TopComponent,
} from '../../components';
import { saveTask, loadTask } from '../../utils/task';
import {
  FormControlLabel,
  FormGroup,
  Switch,
} from '@material-ui/core';

const Task = ({ setCurrentPath, loggoutRoutes, firebaseApp }) => {
  const navigate = useNavigate();
  const params = useParams();
  const [title, setTitle] = useState('');
  const [day, setDay] = useState('');
  const [hour, setHour] = useState('');
  const [hourEnd, setHourEnd] = useState('');
  const [category, setCategory] = useState('');
  const [description, setDescription] = useState('');
  const [concluded, setConcluded] = useState(false);

  const _loadTask = async () => {
    const task = await loadTask(firebaseApp, params.id);
    setTitle(task.title);
    setDay(task.day);
    setHour(task.hour);
    setHourEnd(task.hourEnd);
    setCategory(task.category);
    setDescription(task.description);
    setConcluded(task.concluded || false);
  };

  useEffect(() => {
    setCurrentPath(window.location.pathname);
    verifyLogin(loggoutRoutes, window.location.pathname, firebaseApp);
    if (params.id) {
      _loadTask();
    }
  }, []);

  const saveOrUpdate = async () => {
    const data = {
      title,
      day,
      hour,
      hourEnd,
      category,
      description,
      concluded,
    };
    if (params.id) {
      data.id = params.id;
    }
    await saveTask(firebaseApp, data);
    navigate('/');
  };

  return (
    <>
      <TopComponent hasMenu={false} hasArrowBack={true} hasImage={false} title={`Nova Task`} subtitle={'Crie sua tarefa...'} />
      <BoxComponent
        component="div"
        sx={{ pl: 4, pr: 4, marginTop: 4, width: 'calc(100% - 64px)', float: 'left' }}
        noValidate={true}
        autoComplete={'off'}
      >
        <FormGroup>
          <FormControlLabel
            control={
              <Switch
                checked={concluded}
                onChange={(e) => setConcluded(e.target.checked)}
                name="concluded"
                color="primary"
              />
            }
            label="Concluída"
          />
        </FormGroup>
      </BoxComponent>
      <BoxComponent
        component="div"
        sx={{ pl: 4, pr: 4, marginTop: 4, width: 'calc(100% - 64px)', float: 'left' }}
        noValidate={true}
        autoComplete={'off'}
      >
        <TextFieldComponent variant="standard" fullWidth={true} label="Titulo" value={title} type="text" onChange={(e) => setTitle(e.target.value)}/>
      </BoxComponent>
      <BoxComponent
        component="div"
        sx={{ pl: 4, pr: 4, marginTop: 4, width: 'calc(100% - 64px)', float: 'left' }}
        noValidate={true}
        autoComplete={'off'}
      >
        <TextFieldComponent variant="standard" fullWidth={true} label="" value={day} type="date" onChange={(e) => setDay(e.target.value)}/>
      </BoxComponent>
      <BoxComponent
        component="div"
        sx={{ pl: 4, pr: 4, marginTop: 4, width: 'calc(50% - 64px)', float: 'left' }}
        noValidate={true}
        autoComplete={'off'}
      >
        <TextFieldComponent variant="standard" fullWidth={true} label="Hora Inicio" value={hour} type="time" onChange={(e) => setHour(e.target.value)}/>
      </BoxComponent>
      <BoxComponent
        component="div"
        sx={{ pl: 4, pr: 4, marginTop: 4, width: 'calc(50% - 64px)', float: 'left' }}
        noValidate={true}
        autoComplete={'off'}
      >
        <TextFieldComponent variant="standard" fullWidth={true} label="Hora Fim" value={hourEnd} type="time" onChange={(e) => setHourEnd(e.target.value)}/>
      </BoxComponent>
      <BoxComponent
        component="div"
        sx={{ pl: 4, pr: 4, marginTop: 4, width: 'calc(100% - 64px)', float: 'left' }}
        noValidate={true}
        autoComplete={'off'}
      >
        <TextFieldComponent variant="standard" fullWidth={true} label="Categoria" value={category} type="text" onChange={(e) => setCategory(e.target.value)}/>
      </BoxComponent>
      <BoxComponent
        component="div"
        sx={{ pl: 4, pr: 4, marginTop: 4, width: 'calc(100% - 64px)', float: 'left' }}
        noValidate={true}
        autoComplete={'off'}
      >
        <TextFieldComponent rows={4} multiline variant="standard" fullWidth={true} label="Descricao" value={description} type="text" onChange={(e) => setDescription(e.target.value)}/>
      </BoxComponent>
      <BoxComponent
        component="div"
        sx={{ pl: 4, pr: 4, marginTop: 4, width: 'calc(100% - 64px)', float: 'left' }}
        noValidate={true}
        autoComplete={'off'}
      >
        <ButtonComponent fullWidth={true} label={params.id ? 'ATUALIZAR' : 'SALVAR'} onClick={saveOrUpdate} />
      </BoxComponent>
    </>
  );
};

export default Task;
