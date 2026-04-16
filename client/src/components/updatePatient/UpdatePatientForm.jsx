import React, { useState } from 'react';
import { journalService } from '../../container/container';

const UpdatePatientForm = ({ mountedPatient, setMountedPatient }) => {
  const contact = mountedPatient.contact ?? {};

  const [firstName, setFirstName] = useState(mountedPatient.firstName ?? '');
  const [lastName, setLastName] = useState(mountedPatient.lastName ?? '');
  const [city, setCity] = useState(contact.city ?? '');
  const [email, setEmail] = useState(contact.email ?? '');
  const [street, setStreet] = useState(contact.street ?? '');
  const [streetNumber, setStreetNumber] = useState(contact.streetNumber ?? '');
  const [zipCode, setZipCode] = useState(contact.zip ?? '');

  const buildUpdate = () => {
    const original = mountedPatient.contact ?? {};
    const update = {};

    if (firstName !== mountedPatient.firstName) update.firstName = firstName;
    if (lastName !== mountedPatient.lastName) update.lastName = lastName;

    const contact = {};
    if (city !== (original.city ?? '')) contact.city = city;
    if (email !== (original.email ?? '')) contact.email = email;
    if (street !== (original.street ?? '')) contact.street = street;
    if (streetNumber !== (original.streetNumber ?? '')) contact.streetNumber = streetNumber;
    if (zipCode !== (original.zip ?? '')) contact.zip = zipCode;

    if (Object.keys(contact).length > 0) update.contact = contact;
    return update;
  };

  const handleSubmit = async () => {
    const update = buildUpdate();
    if (Object.keys(update).length === 0) return;

    try {
      const result = await journalService.updatePatient(
        mountedPatient.patientId,
        update
      );
      console.log('result: ', result);
      if (result.success) {
        setMountedPatient(result.data);
      }
    } catch (error) {
      console.log('ERROR: ', error);
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
          <path d="M480-240Zm-320 80v-112q0-34 17.5-62.5T224-378q62-31 126-46.5T480-440q37 0 73 4.5t72 14.5l-67 68q-20-3-39-5t-39-2q-56 0-111 13.5T260-306q-9 5-14.5 14t-5.5 20v32h240v80H160Zm400 40v-123l221-220q9-9 20-13t22-4q12 0 23 4.5t20 13.5l37 37q8 9 12.5 20t4.5 22q0 11-4 22.5T903-340L683-120H560Zm300-263-37-37 37 37ZM620-180h38l121-122-18-19-19-18-122 121v38Zm141-141-19-18 37 37-18-19ZM367-527q-47-47-47-113t47-113q47-47 113-47t113 47q47 47 47 113t-47 113q-47 47-113 47t-113-47Zm169.5-56.5Q560-607 560-640t-23.5-56.5Q513-720 480-720t-56.5 23.5Q400-673 400-640t23.5 56.5Q447-560 480-560t56.5-23.5ZM480-640Z"></path>
        </svg>

        <h3>Ändra personuppgifter</h3>
      </div>

      <form action="" className="large-form">
        <h4>Personuppgifter</h4>

        <div className="input-wrapper">
          <label htmlFor="patientId">Personnummer</label>
          <input
            type="text"
            name="patientId"
            value={mountedPatient.patientId}
            autoComplete="off"
            disabled
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
          Spara ändringar
        </button>
      </form>
    </div>
  );
};

export default UpdatePatientForm;
