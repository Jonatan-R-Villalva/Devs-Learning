const {Course, Category} = require('../../db');

export async function postCourse (req: any, res: any) {
    try {
        const {name, level, description, price, category} = req.body;
        let nameDB = name.split(" ").join("-").toLowerCase();
        let courseExist = await Course.findOne({
            where: {"name": nameDB}
        });
        if (courseExist) return res.status(404).send("El curso ya existe");
        let categoriesArr = category.map((el: string)=>{
            return el.split(" ").join("-").toLowerCase();
        });
        categoriesArr.forEach((cat: string) => {
            Category.findOrCreate({
                where: { "name": cat }
            })
        });
        let courseCreated = await Course.create({name: nameDB, level, description, price});
        let categoriesDB = await Category.findAll({
            where: { "name": categoriesArr }
        });
        categoriesDB.forEach((el: any) => {
            courseCreated.addCategory(el)
        });
        return res.status(200).send(`The Course ${name} has been created`);
    } catch (err) {
        return res.status(404).send(err);
    }
}