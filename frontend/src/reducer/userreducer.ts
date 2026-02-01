import { useReducer, useState } from "react";
import type {User } from "../../../backend/types/user";

type UserAction = {type: "GET_USERS"; payload: User[]}
                | {type: "ADD_USER"; payload: User}
                | {type: "UPDATE_USER"; payload: User}
                | {type: "DELETE_USER"; payload: string};

const userReducer = (state: User[], action: UserAction) : User[] => {
  switch(action.type) {
    case "GET_USERS":
      return action.payload;
    case "ADD_USER":
      return [...state, action.payload];
    case "UPDATE_USER":
            return state.map(user => user.id === action.payload.id ? action.payload : user);
    case "DELETE_USER":
      return state.filter(user => user.id !== action.payload);
    default:
        return state;
    };
};

export { userReducer };