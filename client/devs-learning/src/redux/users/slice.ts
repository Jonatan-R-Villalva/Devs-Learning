import { createSlice } from "@reduxjs/toolkit";
import { CreateUserInterface } from "../../interfaces/CreateUserInterface";

const initialState: CreateUserInterface = {
  fullname: "",
  password: "",
  rpassword: "",
  email: "",
  rank: 2,
  profileImg: "",
  status: "notLogged",
};

export const userSign = createSlice({
  name: "users",
  initialState,
  reducers: {
    signUp: (state, { payload }) => {},
    signIn: (state, { payload }) => {
      state.status = payload;
    },
    recover: (state) => {},
    logOut: (state) => {
      state.fullname = "";
      state.password = "";
      state.rpassword = "";
      state.email = "";
      state.rank = 2;
      state.profileImg = "";
      state.status = "notLogged";
    },
  },
});

export const reducer = userSign.actions;
