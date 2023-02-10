"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const getCategories_1 = require("./categoriesCRUD/getCategories");
const postCategorie_1 = require("./categoriesCRUD/postCategorie");
const putCategorie_1 = require("./categoriesCRUD/putCategorie");
const deleteCategorie_1 = require("./categoriesCRUD/deleteCategorie");
const express_1 = require("express");
const router = (0, express_1.Router)();
<<<<<<< HEAD
router.get("/", getCategories_1.getCategories);
=======
router.get("/:name", getCategories_1.getCategories);
>>>>>>> development
router.post("/", postCategorie_1.postCategorie);
router.put("/", putCategorie_1.putCategorie);
router.delete("/:name", deleteCategorie_1.deleteCategorie);
module.exports = router;
