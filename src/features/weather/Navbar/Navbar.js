import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Logo } from './Logo';
import { InputLocationSearch } from './InputLocationSearch';
import { InputErrorMessage } from './InputErrorMessage';
import { ToggleMetricUnitsButton } from './ToggleMetricUnitsButton';
import '../../../styles/Navbar/Navbar.scss';

export const Navbar = () => {
  const [showInputError, setShowInputError] = useState(0);
  const [showErrorMessage, setShowErrorMessage] = useState(0);

  return (
    <nav className="navbar">
      <div className="navbar-content">
        <Link to="/">
          <Logo />
        </Link>
        <div className="navbar-input-temp-wrapper">
          <div className="navbar-input-error-wrapper">
            <InputLocationSearch 
              showErrorMessage={showErrorMessage}
              setShowErrorMessage={setShowErrorMessage}
              showInputError={showInputError}
              setShowInputError={setShowInputError}
            />
            <InputErrorMessage 
              showErrorMessage={showErrorMessage}
              showInputError={showInputError}
            />
          </div>
          <ToggleMetricUnitsButton />
        </div>
      </div>
    </nav>
  )
}
