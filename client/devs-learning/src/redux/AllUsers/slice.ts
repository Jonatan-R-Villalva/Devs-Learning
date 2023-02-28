import { createSlice } from "@reduxjs/toolkit";
import { CreateUserInterface, AllUsers } from '../../interfaces/CreateUserInterface';

const initialState: AllUsers = {
  users: []
};

export const allUsers = createSlice({
  name: "allUsers",
  initialState,
  reducers: {

    setAllUsers: (state, { payload }) => {
      state.users = payload.filter((user: any) => !user.banned);

    },
    BanUsers: (state, { payload }) => {
      state.users = state.users.filter((user) => !user.banned && user.id !== payload[0].id);

    },
    
    UpdateAllUsers: (state, { payload }) => {
      state.users = state.users.map((user) => {
        return !user.banned && user.id === payload.id ? { ...user, rank: payload.rank } : user;
      });
    }

    }
  },
);

export const reducer = allUsers.actions;
