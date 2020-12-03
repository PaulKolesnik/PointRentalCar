import { createStore } from "redux";
import { AppState } from "./app-state";
import { reducer } from "./reducer";

export const store = createStore(reducer, new AppState());
