import React, { useState } from 'react';
import { journalService } from '../../container/container';

const AddPatientForm = ({ mountedPatient, setMountedPatient }) => {
  const [patientId, setPatientId] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');

  const [street, setStreet] = useState('');
  const [streetNumber, setStreetNumber] = useState('');
  const [zipCode, setZipCode] = useState('');
  const [city, setCity] = useState('');
  const [email, setEmail] = useState('');

  const handleSubmit = async () => {
    const patient = {
      patientId,
      firstName,
      lastName,
      contact: {
        street,
        streetNumber,
        zip: zipCode,
        city,
        email,
      },
    };

    const result = await journalService.createNewPatient(patient);

    console.log(result);
    if (result.success) {
      setMountedPatient(patient);
    }
  };

  return (
    <div className="card">
      <div className="icon-wrapper">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          height="24px"
          viewBox="0 -960 960 960"
          width="24px"
          fill="#1f1f1f">
          <path d="M720-400v-120H600v-80h120v-120h80v120h120v80H800v120h-80ZM247-527q-47-47-47-113t47-113q47-47 113-47t113 47q47 47 47 113t-47 113q-47 47-113 47t-113-47ZM40-160v-112q0-34 17.5-62.5T104-378q62-31 126-46.5T360-440q66 0 130 15.5T616-378q29 15 46.5 43.5T680-272v112H40Zm80-80h480v-32q0-11-5.5-20T580-306q-54-27-109-40.5T360-360q-56 0-111 13.5T140-306q-9 5-14.5 14t-5.5 20v32Zm296.5-343.5Q440-607 440-640t-23.5-56.5Q393-720 360-720t-56.5 23.5Q280-673 280-640t23.5 56.5Q327-560 360-560t56.5-23.5ZM360-640Zm0 400Z" />
        </svg>

        <h3>Ny patient</h3>
      </div>

      <form action="" className="large-form">
        <h4>Personuppgifter</h4>

        <div className="input-wrapper">
          <label htmlFor="patientId">Personnummer</label>
          <input
            type="text"
            name="patientId"
            value={patientId}
            onChange={(e) => setPatientId(e.target.value)}
            autoComplete="off"
          />
        </div>

        <div className="input-wrapper">
          <label htmlFor="firstName">Förnamn</label>
          <input
            type="text"
            name="firstName"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            autoComplete="off"
          />
        </div>

        <div className="input-wrapper">
          <label htmlFor="lastName">Efternamn</label>
          <input
            type="text"
            name="lastName"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            autoComplete="off"
          />
        </div>

        <h4>Kontakt</h4>

        <div className="input-wrapper">
          <label htmlFor="street">Adress</label>
          <div className="dual-input">
            <input
              type="text"
              name="street"
              value={street}
              onChange={(e) => setStreet(e.target.value)}
              autoComplete="off"
            />
            <label htmlFor="streetNumber">Nummer</label>
            <input
              className="street-number"
              type="text"
              name="streetNumber"
              value={streetNumber}
              onChange={(e) => setStreetNumber(e.target.value)}
              autoComplete="off"
            />
          </div>
        </div>

        <div className="input-wrapper">
          <label htmlFor="zipCode">Postnummer</label>
          <input
            type="text"
            name="zipCode"
            value={zipCode}
            onChange={(e) => setZipCode(e.target.value)}
            autoComplete="off"
          />
        </div>

        <div className="input-wrapper">
          <label htmlFor="city">Stad</label>
          <input
            type="text"
            name="city"
            value={city}
            onChange={(e) => setCity(e.target.value)}
            autoComplete="off"
          />
        </div>

        <div className="input-wrapper">
          <label htmlFor="email">Epost</label>
          <input
            type="text"
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            autoComplete="off"
          />
        </div>
        <button type="button" onClick={handleSubmit} className="icon-btn">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            height="24px"
            viewBox="0 -960 960 960"
            width="24px"
            fill="#FFFFFF">
            <path d="M840-680v480q0 33-23.5 56.5T760-120H200q-33 0-56.5-23.5T120-200v-560q0-33 23.5-56.5T200-840h480l160 160Zm-80 34L646-760H200v560h560v-446ZM565-275q35-35 35-85t-35-85q-35-35-85-35t-85 35q-35 35-35 85t35 85q35 35 85 35t85-35ZM240-560h360v-160H240v160Zm-40-86v446-560 114Z" />
          </svg>
          Spara
        </button>
      </form>
    </div>
  );
};

export default AddPatientForm;
