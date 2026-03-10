import React, { useState } from 'react';

const NewPatientForm = () => {
  const [patientId, setPatientId] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');

  const [street, setStreet] = useState('');
  const [streetNumber, setStreetNumber] = useState('');
  const [zipCode, setZipCode] = useState('');
  const [city, setCity] = useState('');
  const [email, setEmail] = useState('');

  const handleSubmit = () => {};

  return (
    <div className="">
      <h3>Ny patient</h3>
      <form action="" className="large-form">
        <h4>Personuppgifter</h4>

        <div className="input-wrapper">
          <label htmlFor="patientId">Personnummer</label>
          <input
            type="text"
            name="patientId"
            value={patientId}
            onChange={(e) => setPatientId(e.target.value)}
          />
        </div>

        <div className="input-wrapper">
          <label htmlFor="firstName">Förnamn</label>
          <input
            type="text"
            name="firstName"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
          />
        </div>

        <div className="input-wrapper">
          <label htmlFor="lastName">Efternamn</label>
          <input
            type="text"
            name="lastName"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
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
            />
            <label htmlFor="streetNumber">Nummer</label>
            <input
              className="street-number"
              type="text"
              name="streetNumber"
              value={streetNumber}
              onChange={(e) => setStreetNumber(e.target.value)}
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
          />
        </div>

        <div className="input-wrapper">
          <label htmlFor="city">Stad</label>
          <input
            type="text"
            name="city"
            value={city}
            onChange={(e) => setCity(e.target.value)}
          />
        </div>

        <div className="input-wrapper">
          <label htmlFor="email">Postnummer</label>
          <input
            type="text"
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
      </form>
    </div>
  );
};

export default NewPatientForm;
