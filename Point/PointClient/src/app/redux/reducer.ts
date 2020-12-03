import { Action } from './action';
import { ActionType } from './action-type';
import { AppState } from './app-state';

export function reducer(currentState: AppState, action: Action): AppState {

  const newState: AppState = { ...currentState };

  switch (action.type) {
    case ActionType.GetAllFleetVehicles:
      newState.fleetVehicles = action.payload;
      break;
    case ActionType.AddCarToFleet:
      newState.fleetVehicles.push(action.payload);
      break;
    case ActionType.UpdateCarFromFleet: {
      const index = newState.fleetVehicles.findIndex(f => f.iD === action.payload.id);
      newState.fleetVehicles[index] = action.payload;
      break;
    }
    case ActionType.DeleteCarFromFleet:
      const index = newState.fleetVehicles.findIndex(f => f.iD === action.payload);
      newState.fleetVehicles.splice(index, 1);
      break;

  }

  return newState;
}
