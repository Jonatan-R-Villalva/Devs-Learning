import { AnyAction, ThunkAction } from "@reduxjs/toolkit";
import axios from "axios";
import { CoursoBack } from "../../components/Cards/Card";
import { createCourse } from "../../interfaces/Course";
import { RootState } from "../store";
import { reducer } from "./slice";

const BACK =
  process.env.NODE_ENV === "production"
    ? "http://181.127.189.247:3001"
    : "http://localhost:3001";

export const getCourses = (): ThunkAction<
  void,
  RootState,
  unknown,
  AnyAction
> => {
  return (dispatch) => {
    axios.get(`${BACK}/courses`).then((response) => {
      response.data.map((course: any) => {
        course.name = course.name.replaceAll("-", " ");
        course.name = course.name[0].toUpperCase() + course.name.substring(1);
        course.categories.map((category: any) => {
          category.name = category.name.replaceAll("-", " ");
          category.name =
            category.name[0].toUpperCase() + category.name.substring(1);
        });
      });
      dispatch(reducer.allCourses(response.data));
    });
  };
};
export const getCategories = (): ThunkAction<
  void,
  RootState,
  unknown,
  AnyAction
> => {
  return (dispatch) => {
    axios.get(`${BACK}/categories`).then((response) => {
      response.data.map((category: any) => {
        category.name = category.name.replaceAll("-", " ");
        category.name =
          category.name[0].toUpperCase() + category.name.substring(1);
      });
      dispatch(reducer.allCategories(response.data));
    });
  };
};

export const searchCourses = (
  courses: Array<CoursoBack>,
  search: string
): ThunkAction<void, RootState, unknown, AnyAction> => {
  return (dispatch) => {
    try {
      let allcourses = [...courses];

      if (search !== "") {
        search = search.toLowerCase();

        allcourses = allcourses.filter((course) => {
          if (course.name.toLowerCase().includes(search)) return true;
        });

        if (allcourses.length < 1) search = "";
      }

      dispatch(reducer.searched({ allcourses, search }));
    } catch (error) {
      console.log("no se encontro el curso buscado, se muestran todos");

      dispatch(reducer.searched(error));
    }
  };
};

export const setCurrentCourse = (
  card: CoursoBack
): ThunkAction<void, RootState, unknown, AnyAction> => {
  return (dispatch) => {
    console.log(card);
    return dispatch(reducer.currentCourse(card));
  };
};

export const createCourseAction = (course: createCourse): ThunkAction<
  void,
  RootState,
  unknown,
  AnyAction
> => {
  // console.log(course);

  return (dispatch) => {
    axios.post(BACK + "/courses/", course).then((response) => {
      console.log(response);
      // dispatch(reducer.allCategories(response.data));
    });
  };
};

export const setFiltered = (
  order: string,
  courses: Array<CoursoBack>,
  coursesFiltered: Array<CoursoBack>,
  searched: string,
  category: string
): ThunkAction<void, RootState, unknown, AnyAction> => {
  return (dispatch) => {
    let filteredCourses: Array<CoursoBack> = [];

    // if (searched === "") {
    //   filteredCourses = [...courses];
    // } else {
    filteredCourses = [...coursesFiltered];
    // }

    //categories

    if (category !== "") {
      filteredCourses = filteredCourses.filter((course) => {
        if (
          course.categories[0].name === category ||
          course.categories[1].name === category
        ) {
          return true;
        } else {
          return false;
        }
      });
    }

    ///////////////////////////

    //order
    if (order === "A-Z") {
      filteredCourses.sort((a, b) => {
        return a.name.localeCompare(b.name);
      });
    }

    if (order === "Z-A") {
      filteredCourses
        .sort((a, b) => {
          return a.name.localeCompare(b.name);
        })
        .reverse();
    }

    if (order === "- Price") {
      filteredCourses.sort((a, b) => {
        return parseInt(a.price) - parseInt(b.price);
      });
    }

    if (order === "+ Price") {
      filteredCourses.sort((a, b) => {
        return parseInt(b.price) - parseInt(a.price);
      });
    }

    if (order === "- Duration") {
      filteredCourses.sort((a, b) => {
        return parseInt(a.duration) - parseInt(b.duration);
      });
    }

    if (order === "+ Duration") {
      filteredCourses.sort((a, b) => {
        return parseInt(b.duration) - parseInt(a.duration);
      });
    }

    ///////////////////////////

    return dispatch(reducer.setFiltered(filteredCourses));
  };
};
