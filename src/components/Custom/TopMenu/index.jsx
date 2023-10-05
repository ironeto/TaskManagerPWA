import React from 'react';
import { useNavigate } from 'react-router-dom';
import { TypographyComponent } from "../../"
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';

const Menu = ({ hasMenu, hasArrowBack, title }) => {
  const navigate = useNavigate();

  const handleGoBack = () => {
    navigate(-1);
  };

  const arrowBack = (
    <div style={{ position: 'absolute', left: 10 }}>
      <IconButton
        edge="start"
        color="inherit"
        aria-label="back"
        onClick={handleGoBack}
      >
        <ArrowBackIcon />
      </IconButton>
    </div>
  );

  return (
    <>
      {hasMenu && (
        <AppBar position="static" color='default'>
          <Toolbar>
            {hasArrowBack && arrowBack}
            <TypographyComponent variant="h1" component="h1" sx={{
                fontSize: "2rem",
                marginLeft: "50px",
            }}>
                {title}
            </TypographyComponent>
          </Toolbar>
        </AppBar>
      )}
      {(!hasMenu && hasArrowBack) && (
        <>
          {arrowBack}
        </>
      )}
    </>
  );
};

export default Menu;
