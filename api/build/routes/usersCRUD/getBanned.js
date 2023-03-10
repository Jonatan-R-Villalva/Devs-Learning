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
exports.getBanned = void 0;
const { Course, Users } = require("../../db");
function getBanned(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const { email } = req.query;
            if (email) {
                let user = yield Users.findAll({
                    where: {
                        email: email,
                    },
                    include: {
                        model: Course,
                        attributes: ["name"],
                        through: {
                            attributes: [],
                        },
                    },
                });
                if (user.length === 0) {
                    return res.status(400).send(`The User has not been found`);
                }
                else if (user[0].banned)
                    return res.status(200).send(true);
                else
                    return res.status(200).send(false);
            }
            else {
                return res.status(404).send("The email has not been recognized or has not been entered, please try again.");
            }
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
exports.getBanned = getBanned;
