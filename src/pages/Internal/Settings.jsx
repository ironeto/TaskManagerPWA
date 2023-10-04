import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { logout, verifyLogin } from "../../utils/auth";
import { makeStyles } from "@mui/styles";
import { Button, Container } from "@mui/material";
import { TopComponent } from '../../components';

const useStyles = makeStyles((theme) => ({
  title: {
    marginBottom: "16px", // Defina o valor diretamente
  },
  logoutButton: {
    marginTop: "16px",
    width: "100%", // Defina a largura como 100% para centralizar
  },
  marginBetween: {
    marginTop: "150px",
  },
}));

const Settings = ({ setCurrentPath, loggoutRoutes, firebaseApp }) => {
  const navigate = useNavigate();
  const classes = useStyles();

  const handleLogout = () => {
    logout(firebaseApp, navigate);
  };

  return <>
  <TopComponent hasImage={true} title={`Configurações`} subtitle={'Configure seu App...'}/>
  {
    <Container component="main" maxWidth="xs">
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