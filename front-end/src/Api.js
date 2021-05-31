const API_PATH = 'http://localhost:8080/';
const VEHICLE_TYPES = ['SEDAN', 'HATCHBACK', 'SUV'];
const RECEIPT_TYPES = ['ONE_WAY', 'RETURN'];
const TYPE_AMOUNT = {
  ONE_WAY: 100,
  RETURN: 200
}

var moment = require('moment');

const addVehicle = async (registrationNumber, type = 'HATCHBACK') => {
  return new Promise(async (resolve, reject) => {
    try {
      let response = await fetch(`${API_PATH}vehicles`, {
        method: 'POST',
        body: JSON.stringify({
          id: registrationNumber,
          type: type
        }),
        headers: {
          "Content-Type": "application/json"
        }
      });
      let responseJson = await response.json();
      resolve(responseJson);
    } catch (err) {
      reject(err);
    }
  })
}

const addReceipt = async (vehicleId, type = 'ONE_WAY', used = true) => {
  return new Promise(async (resolve, reject) => {
    try {
      let response = await fetch(`${API_PATH}receipts`, {
        method: 'POST',
        body: JSON.stringify({
          vehicleId: vehicleId,
          type: type,
          amount: TYPE_AMOUNT[type],
          used: used,
          createdOn: moment().format()
        }),
        headers: {
          "Content-Type": "application/json"
        }
      });
      let responseJson = await response.json();
      resolve(responseJson);
    } catch (err) {
      reject(err);
    }
  })
}

const updateReceipt = async (receiptId, used = true) => {
  return new Promise(async (resolve, reject) => {
    try {
      let response = await fetch(`${API_PATH}receipts/${receiptId}`, {
        method: 'PUT',
        body: JSON.stringify({
          used: used
        })
      });
      let responseJson = await response.json();
      resolve(responseJson);
    } catch (err) {
      reject(err);
    }
  })
}

const getVehicleByRegistrationNumber = async (registrationNumber) => {
  return new Promise(async (resolve, reject) => {
    try {
      let response = await fetch(`${API_PATH}vehicles/${registrationNumber}`);
      let responseJson = await response.json();
      resolve(responseJson);
    } catch (err) {
      reject(err);
    }
  })
}

const getAllvehicles = async () => {
  return new Promise(async (resolve, reject) => {
    try {
      let response = await fetch(`${API_PATH}vehicles`);
      let responseJson = await response.json();
      resolve(responseJson);
    } catch (err) {
      reject(err);
    }
  })
}

const getAllReceiptsForVehicle = async (vehicleId) => {
  return new Promise(async (resolve, reject) => {
    try {
      let response = await fetch(`${API_PATH}receipts?vehicleId=${vehicleId}&used=false`);
      let responseJson = await response.json();
      resolve(responseJson);
    } catch (err) {
      reject(err);
    }
  })
}

export { addVehicle, addReceipt, updateReceipt, getVehicleByRegistrationNumber, getAllvehicles, getAllReceiptsForVehicle }
