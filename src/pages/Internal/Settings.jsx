import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { logout, verifyLogin } from "../../utils/auth";
import { makeStyles } from "@mui/styles";
import { Button, Container, CssBaseline, MenuItem, Paper, Select, Typography } from "@mui/material";
import { useTheme } from "../../utils/themeContext"; // Importe o useTheme
import { TopComponent } from '../../components';

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    minHeight: "100vh",
  },
  paper: {
    padding: "16px", // Defina o valor diretamente
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  title: {
    marginBottom: "16px", // Defina o valor diretamente
  },
  logoutButton: {
    marginTop: "16px",
    width: "100%", // Defina a largura como 100% para centralizar
  },
  select: {
    marginTop: "50px",
    width: "100%",
  },
  // Adicione uma classe para adicionar margem entre o dropdown e o botão
  marginBetween: {
    marginTop: "16px",
  },
}));

const Settings = ({ setCurrentPath, loggoutRoutes, firebaseApp }) => {
  const navigate = useNavigate();
  const classes = useStyles();
  const { theme, toggleTheme } = useTheme(); // Use o tema do contexto

  const handleLogout = () => {
    logout(firebaseApp, navigate);
  };

  const handleThemeChange = (event) => {
    toggleTheme(); // Altere o tema ao selecionar uma opção no dropdown
  };


  return <>
  <TopComponent hasMenu={true} hasImage={true} title={`Configure seu App`} subtitle={'Organize suas ideias...'}/>
  {
    <Container component="main" maxWidth="xs">
        <Select
          variant="outlined"
          value={theme}
          onChange={handleThemeChange}
          className={classes.select}
        >
          <MenuItem value="light">Tema Claro</MenuItem>
          <MenuItem value="dark">Tema Escuro</MenuItem>
        </Select>
        {/* Adicione a classe marginBetween para criar margem entre o dropdown e o botão */}
        <div className={classes.marginBetween}>
          <Button
            variant="contained"
            color="primary"
            className={classes.logoutButton}
            onClick={handleLogout}
          >
            Sair
          </Button>
        </div>
      </Container>
  }
</>
};

export default Settings;