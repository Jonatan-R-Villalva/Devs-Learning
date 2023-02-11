import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Course, CoursoBack } from "../../components/Cards/Card";
import { Category } from "../../interfaces/Category";

interface CoursesState {
  courses: CoursoBack[];
  coursesFiltered: CoursoBack[];
  categories: Category[];
  currentPage: number;
  currentCourse: CoursoBack;
  searched: string;
}

const initialState: CoursesState = {
  courses: [],
  coursesFiltered: [],
  categories: [],
  currentCourse: {
    description: "",
    id: "",
    level: "",
    name: "",
    price: "",
    duration: "",
    categories: [],
  },
  currentPage: 1,
  searched: "",
};

export const courses = createSlice({
  name: "courses",
  initialState, // defino initial state (state= initialState)
  reducers: {
    allCourses: (state, { payload }) => {
      state.courses = payload;
      state.coursesFiltered = payload;
    },
    allCategories: (state, { payload }) => {
      state.categories = payload;
    },
    setCurrent: (state, { payload }) => {
      state.currentCourse = payload;
    },
    currentCourse: (state, action: PayloadAction<CoursoBack>) => {
      state.currentCourse = action.payload;
    },
    searched: (state, { payload }) => {
      state.coursesFiltered = payload.allcourses;
      state.searched = payload.search;
    },
    setFiltered: (state, { payload }) => {
      state.coursesFiltered = payload;
    },
  },
});

export const reducer = courses.actions;
