import { Action } from './action';
import { ActionType } from './action-type';
import { AppState } from './app-state';

export function reducer(currentState: AppState, action: Action): AppState {

  const newState: AppState = { ...currentState };
  const EXPIRE_TIME = 5;

  switch (action.type) {
    // Register - Login
    case ActionType.Register:
    case ActionType.Login:
      newState.user = action.payload;
      sessionStorage.setItem("user", JSON.stringify(newState.user));
      // localStorage.setItem("user", JSON.stringify(newState.user));
      // setTimeout(() => {
      //   localStorage.removeItem('storedData');
      // }, EXPIRE_TIME); // after an hour it will delete the data from localStorage
      break;
    case ActionType.Logout:
      newState.user = null;
      sessionStorage.removeItem("user");
      break;
    case ActionType.GetAllUsers:
      newState.users = action.payload;
      break;
    case ActionType.DeleteUser: {
      const index = newState.users.findIndex(u => u.userID === action.payload);
      newState.users.splice(index, 1);
      break;
    }
    // Cases from Fleet
    case ActionType.GetAllFleetVehicles:
      newState.fleetVehicles = action.payload;
      break;
    case ActionType.GetOneCarFromFleet:
      newState.oneCarFromFleet = action.payload
      break;
    case ActionType.AddCarToFleet:
      newState.fleetVehicles.push(action.payload);
      break;
    case ActionType.UpdateCarFromFleet: {
      const index = newState.fleetVehicles.findIndex(f => f.id === action.payload.id);
      newState.fleetVehicles[index] = action.payload;
      break;
    }
    case ActionType.DeleteCarFromFleet: {
      const index = newState.fleetVehicles.findIndex(f => f.id === action.payload);
      newState.fleetVehicles.splice(index, 1);
      break;
    }
    // Cases From Car Models
    case ActionType.GetAllCarsModels:
      newState.carsModels = action.payload;
      break;
    case ActionType.GetOneCarModel:
      newState.carsModel = action.payload
      break;
    case ActionType.AddCarModel:
      newState.carsModels.push(action.payload);
      break;
    case ActionType.UpdateCarModel: {
      const index = newState.carsModels.findIndex(cm => cm.cModelID === action.payload.id);
      newState.carsModels[index] = action.payload;
      break;
    }
    case ActionType.DeleteCarModel:
      const index = newState.carsModels.findIndex(cm => cm.cModelID === action.payload);
      newState.carsModels.splice(index, 1);
      break;
  }

  return newState;
}

