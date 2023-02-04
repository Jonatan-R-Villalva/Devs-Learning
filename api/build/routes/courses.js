"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const getCourses_1 = require("./coursesCRUD/getCourses");
const postCourse_1 = require("./coursesCRUD/postCourse");
const putCourse_1 = require("./coursesCRUD/putCourse");
const deleteCourse_1 = require("./coursesCRUD/deleteCourse");
const express_1 = require("express");
const router = (0, express_1.Router)();
router.get("/", getCourses_1.getCourses);
router.post("/", postCourse_1.postCourse);
router.put("/", putCourse_1.putCourse);
router.delete("/", deleteCourse_1.deleteCourse);
module.exports = router;
