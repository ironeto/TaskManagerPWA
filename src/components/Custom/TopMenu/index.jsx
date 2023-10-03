import React from 'react';
import { useNavigate } from 'react-router-dom';

import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';

const Menu = ({ hasMenu, hasArrowBack, pageName }) => {
  const navigate = useNavigate();

  const handleGoBack = () => {
    navigate(-1);
  };

  const arrowBack = (
    <div style={{ position: 'absolute', left: 10, top: 0 }}>
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
        <AppBar position="static" color='black'>
          <Toolbar>
            {hasArrowBack && arrowBack}
            {pageName}
          </Toolbar>
        </AppBar>
      )}
      {(!hasMenu && hasArrowBack) && (
        <>
          {arrowBack}
          <div style={{ marginLeft: '32px' }}> {/* Add margin to push down TypographyComponent */}
            {pageName}
          </div>
        </>
      )}
    </>
  );
};

export default Menu;
