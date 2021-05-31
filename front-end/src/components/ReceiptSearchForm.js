import React, { useState } from 'react'
import { getAllReceiptsForVehicle, getAllvehicles } from '../Api';
import ActionButton from './ActionButton';
import ReceiptDetails from './ReceiptDetails'

const ReceiptSearchForm = () => {
  const [registrationNumber, updateRegistrationNumber] = useState('');
  const [receipts, updateReceipts] = useState([]);

  var getValidReceipts = async (event) => {
    try {
      event.preventDefault();
      let receipts = await getAllReceiptsForVehicle(registrationNumber);
      updateReceipts(receipts);
    } catch(err) {}
  }

  return (
    <>
      <form style={{ margin: '10em' }}>
        <input type="text"
          value={registrationNumber}
          onChange={(event) => updateRegistrationNumber(event.target.value)}
          placeholder="Registration Number" />
        <input type="submit" value="Search" onClick={getValidReceipts} />
      </form>
      <ReceiptDetails receipts={receipts} />
      <ActionButton receipts={receipts} registrationNumber={registrationNumber} />
    </>
  )
}

export const getValidTickets = async () => {
  try {

  } catch (err) {

  }
}

export default ReceiptSearchForm;
