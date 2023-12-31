import * as React from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import { useNavigate } from 'react-router-dom';
import StackComponent from '../Stack';

const Menu = ({ routes, currentPath }) => {
  const navigate = useNavigate();

  const [width, setWidth] = React.useState(390);
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  // Add a function to update the width based on the screen size
  const updateWidth = () => {
    const screenWidth = window.innerWidth;
    // Adjust the width value as needed for responsiveness
    if (screenWidth < 768) {
      setWidth(screenWidth);
    } else {
      setWidth(390); // Set your default width here
    }
  };

  // Attach the updateWidth function to the window resize event
  React.useEffect(() => {
    updateWidth();
    window.addEventListener('resize', updateWidth);
    return () => {
      window.removeEventListener('resize', updateWidth);
    };
  }, []);

  return (
    <StackComponent
      style={{
        position: 'fixed',
        left: 0,
        bottom: 0,
      }}
    >
      <Tabs
        style={{
          width: `${width}px`,
          borderRadius: '50px 50px 0 0',
          boxShadow: '-1px -1px 1px 1px rgba(0, 0, 0, 0.1)',
          paddingLeft: '5%',
          paddingRight: '5%',
          boxSizing: 'border-box',
          overflow: 'visible',
        }}
        value={value}
        onChange={handleChange}
        aria-label="icon tabs example"
      >
        {routes.map((route, idx) => {
          if (route.tab) {
            return (
              <Tab
                className={`tab-menu-button ${route.extraCss}`}
                style={{
                  padding: 0,
                }}
                key={idx}
                icon={<route.icon />}
                aria-label="phone"
                onClick={() => {
                  if (route.getLastRoute) {
                    navigate(`${route.path}?last-route=${currentPath}`);
                  } else {
                    navigate(`${route.path}`);
                  }
                }}
              />
            );
          }
          return null;
        })}
      </Tabs>
    </StackComponent>
  );
};

export default Menu;
