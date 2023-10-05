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
  Typography,
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

  const [titleError, setTitleError] = useState('');
  const [dayError, setDayError] = useState('');
  const [hourError, setHourError] = useState('');
  const [hourEndError, setHourEndError] = useState('');
  const [categoryError, setCategoryError] = useState('');

  const [formIsValid, setFormIsValid] = useState(true); // Track form validity

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

  // Validation function to check if all required fields are filled
  const validateForm = () => {
    let isValid = true;

    if (!title) {
      setTitleError('Título é obrigatório');
      isValid = false;
    } else {
      setTitleError('');
    }

    if (!day) {
      setDayError('Data é obrigatória');
      isValid = false;
    } else {
      setDayError('');
    }

    if (!hour) {
      setHourError('Hora Início é obrigatória');
      isValid = false;
    } else {
      setHourError('');
    }

    if (!hourEnd) {
      setHourEndError('Hora Fim é obrigatória');
      isValid = false;
    } else {
      setHourEndError('');
    }

    if (!category) {
      setCategoryError('Categoria é obrigatória');
      isValid = false;
    } else {
      setCategoryError('');
    }

    return isValid;
  };

  const saveOrUpdate = async () => {
    const isFormValid = validateForm();
    if (isFormValid) {
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
    } else {
      // Handle the case where the form is not valid
      setFormIsValid(false);
    }
  };

  return (
    <>
      <TopComponent
        hasMenu={false}
        hasArrowBack={true}
        hasImage={false}
        title={`Nova Task`}
        subtitle={'Crie sua tarefa...'}
      />
      <BoxComponent
        component="div"
        sx={{
          pl: 4,
          pr: 4,
          marginTop: 4,
          width: 'calc(100% - 64px)',
          float: 'left',
        }}
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
        sx={{
          pl: 4,
          pr: 4,
          marginTop: 4,
          width: 'calc(100% - 64px)',
          float: 'left',
        }}
        noValidate={true}
        autoComplete={'off'}
      >
        <TextFieldComponent
          variant="standard"
          fullWidth={true}
          label="Titulo"
          InputLabelProps={{ shrink: true }}
          value={title}
          type="text"
          onChange={(e) => setTitle(e.target.value)}
        />
        {!formIsValid && titleError && (
          <Typography variant="caption" color="error">
            {titleError}
          </Typography>
        )}
      </BoxComponent>
      <BoxComponent
        component="div"
        sx={{
          pl: 4,
          pr: 4,
          marginTop: 4,
          width: 'calc(100% - 64px)',
          float: 'left',
        }}
        noValidate={true}
        autoComplete={'off'}
      >
        <TextFieldComponent
          variant="standard"
          fullWidth={true}
          label="Data"
          InputLabelProps={{ shrink: true }}
          value={day}
          type="date"
          onChange={(e) => setDay(e.target.value)}
        />
        {!formIsValid && dayError && (
          <Typography variant="caption" color="error">
            {dayError}
          </Typography>
        )}
      </BoxComponent>
      <BoxComponent
        component="div"
        sx={{
          pl: 4,
          pr: 4,
          marginTop: 4,
          width: 'calc(50% - 64px)',
          float: 'left',
        }}
        noValidate={true}
        autoComplete={'off'}
      >
        <TextFieldComponent
          variant="standard"
          fullWidth={true}
          label="Hora Inicio"
          value={hour}
          InputLabelProps={{ shrink: true }}
          type="time"
          onChange={(e) => setHour(e.target.value)}
        />
        {!formIsValid && hourError && (
          <Typography variant="caption" color="error">
            {hourError}
          </Typography>
        )}
      </BoxComponent>
      <BoxComponent
        component="div"
        sx={{
          pl: 4,
          pr: 4,
          marginTop: 4,
          width: 'calc(50% - 64px)',
          float: 'left',
        }}
        noValidate={true}
        autoComplete={'off'}
      >
        <TextFieldComponent
          variant="standard"
          fullWidth={true}
          label="Hora Fim"
          InputLabelProps={{ shrink: true }}
          value={hourEnd}
          type="time"
          onChange={(e) => setHourEnd(e.target.value)}
        />
        {!formIsValid && hourEndError && (
          <Typography variant="caption" color="error">
            {hourEndError}
          </Typography>
        )}
      </BoxComponent>
      <BoxComponent
        component="div"
        sx={{
          pl: 4,
          pr: 4,
          marginTop: 4,
          width: 'calc(100% - 64px)',
          float: 'left',
        }}
        noValidate={true}
        autoComplete={'off'}
      >
        <TextFieldComponent
          variant="standard"
          fullWidth={true}
          label="Categoria"
          InputLabelProps={{ shrink: true }}
          value={category}
          type="text"
          onChange={(e) => setCategory(e.target.value)}
        />
        {!formIsValid && categoryError && (
          <Typography variant="caption" color="error">
            {categoryError}
          </Typography>
        )}
      </BoxComponent>
      {/* ... (other form components) */}
      <BoxComponent
        component="div"
        sx={{
          pl: 4,
          pr: 4,
          marginTop: 4,
          width: 'calc(100% - 64px)',
          float: 'left',
        }}
        noValidate={true}
        autoComplete={'off'}
      >
        <ButtonComponent
          fullWidth={true}
          label={params.id ? 'ATUALIZAR' : 'SALVAR'}
          onClick={saveOrUpdate}
        />
        {!formIsValid && (
          <Typography variant="body2" color="error">
            Please fill in all required fields.
          </Typography>
        )}
      </BoxComponent>
    </>
  );
};

export default Task;
