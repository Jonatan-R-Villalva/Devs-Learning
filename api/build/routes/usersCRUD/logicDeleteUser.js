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
exports.deleteLogicUser = void 0;
const { Users } = require("../../db");
function deleteLogicUser(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const { id } = req.query;
            if (id) {
                yield Users.update({
                    banned: true,
                }, {
                    where: {
                        id: id,
                    },
                });
                return res.status(200).send("Update successfully");
            }
            else {
                return res.status(404).send("The ID has not been recognized or has not been entered, please try again.");
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
exports.deleteLogicUser = deleteLogicUser;
