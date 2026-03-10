import React from 'react';

const AppIcon = ({ name, icon }) => {
  return (
    <div className="patient-app">
      <div className="app-icon">
        <span>{icon}</span>
      </div>
      {name}
    </div>
  );
};

export default AppIcon;
