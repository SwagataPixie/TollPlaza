import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import { addVehicle, addReceipt, getVehicleByRegistrationNumber, updateReceipt } from '../Api';
import moment from 'moment';

const ActionButton = props => {
  const [type, updateType] = useState(props.receipts.length > 0 ? 'pass' : 'create');
  const [receiptId, updateReceipt] = useState(props.receipts[0]?.id);

  useEffect(() => {
    for(let receipt of props.receipts) {
      let today = moment();
      let createdOn = moment(receipt.createdOn);
      let isExperied = !today.isSame(createdOn, 'date');
      if (isExperied) updateType('create')
    }
  }, [])

  let createReceipt = async (event) => {
    event.preventDefault();
    try {
      let exisitingVehicle = await getVehicleByRegistrationNumber(props.registrationNumber);
      exisitingVehicle = isEmptyObject(exisitingVehicle) ? null : exisitingVehicle;
      if (!exisitingVehicle) {
        exisitingVehicle = await addVehicle(props.registrationNumber);
      }
      let receipt = await addReceipt(props.registrationNumber);
      updateReceipt(receipt.id);
      letPass();
    } catch (err) {}
  }

  let letPass = async (event) => {
    if (event) event.preventDefault();
    try {
      let pass = await updateReceipt(receiptId);
    } catch(err) {}
  }

  if (type === 'create') {
    return <input style={{ margin: '10px' }} type="submit" value="Create Recipt" onClick={createReceipt} />
  } else if (type === 'pass') {
    return <input style={{ margin: '10px' }} type="submit" value="Pass" onClick={letPass} />
  } else {
    return null
  }
}

function isEmptyObject (obj) {
  return Object.keys(obj).length === 0 && obj.constructor === Object;
}

ActionButton.propTypes = {

}

export default ActionButton
