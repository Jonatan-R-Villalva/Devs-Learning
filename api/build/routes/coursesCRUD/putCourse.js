"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.putRating = exports.putCourse = void 0;
const { Course, Category } = require("../../db");
function putCourse(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            let { name, img, level, description, descriptionComplete, duration, instructor, price, category, } = req.body;
            if (!name) {
                return res.status(404).send("The name has not been recognized or has not been entered, please try again.");
            }
            let nameDB = name.split(" ").join("-").toLowerCase();
            let course = yield Course.findOne({
                where: { name: nameDB },
                include: {
                    model: Category,
                    attributes: ["name"],
                    through: {
                        attributes: []
                    }
                }
            });
            if (course === undefined)
                return res.status(404).send(`El curso ${name} no existe`);
            yield Course.update({
                level: level ? level : course.level,
                img: img ? img : course.img,
                descriptionComplete: descriptionComplete
                    ? descriptionComplete
                    : course.descriptionComplete,
                duration: duration ? duration : course.duration,
                instructor: instructor ? instructor : course.instructor,
                description: description ? description : course.description,
                price: price,
            }, {
                where: {
                    name: nameDB,
                },
            });
            if (category) {
                let newCategories = category.map((el) => {
                    return el.split(" ").join("-").toLowerCase();
                });
                let categoriesArr = course.categories.map((category) => {
                    return category.name;
                });
                let oldCategories = yield Category.findAll({
                    where: {
                        name: categoriesArr
                    }
                });
                oldCategories.forEach((el) => {
                    course.removeCategory(el);
                });
                let categoriesDB = yield Category.findAll({
                    where: { name: newCategories },
                });
                categoriesDB.forEach((el) => {
                    course.addCategory(el);
                });
            }
            ;
            return res.status(200).send(`The course ${name} has been updated`);
        }
        catch (err) {
            const errName = err.name;
            const errCode = err.code;
            const errMessage = err.message;
            return res.status(404).send(errName ?
                `Error ${errCode}: ${errName} - ${errMessage}` :
                "Something went wrong, please try again.");
        }
    });
}
exports.putCourse = putCourse;
function putRating(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            let { rating, nameCourse } = req.body;
            if (!nameCourse) {
                return res.status(404).send("The name has not been recognized or has not been entered, please try again.");
            }
            let nameCourseDb = nameCourse.split(" ").join("-").toLowerCase();
            let course = yield Course.findOne({
                where: {
                    name: nameCourseDb
                }
            });
            rating.course = nameCourse;
            let oldRating = yield course.rating.filter((rat) => rating.user !== rat.user);
            let newRating = [...oldRating, rating];
            yield Course.update({
                rating: newRating
            }, {
                where: {
                    name: nameCourseDb
                }
            });
            return res.status(200).send(`The rating has been updated.`);
        }
        catch (err) {
            const errName = err.name;
            const errCode = err.code;
            const errMessage = err.message;
            return res.status(404).send(errName ?
                `Error ${errCode}: ${errName} - ${errMessage}` :
                "Something went wrong, please try again.");
        }
    });
}
exports.putRating = putRating;
