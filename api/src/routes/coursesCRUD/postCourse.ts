const { Course, Category } = require("../../db");

export async function postCourse(req: any, res: any) {
  try {
    const {
      name,
      img,
      level,
      description,
      descriptionComplete,
      duration,
      instructor,
      price,
      category,
    } = req.body;
    if(!name){
      return res.status(404).send("The name has not been recognized or has not been entered, please try again.")
    }
    let nameDB = name.split(" ").join("-").toLowerCase();
    let courseExist = await Course.findOne({
      where: { name: nameDB },
    });
    if (courseExist) return res.status(404).send("El curso ya existe");
    let categoriesArr = category.map((el: string) => {
      return el.split(" ").join("-").toLowerCase();
    });
    let categoriesDB = await Category.findAll({
      where: {
        name: categoriesArr
      }
    });
    let courseCreated = await Course.create({
      name: nameDB,
      img,
      level,
      description,
      descriptionComplete,
      duration,
      instructor,
      price,
      deleted: false
    });
    categoriesDB.forEach((el: any) => {
      courseCreated.addCategory(el);
    });
    return res.status(200).send(`The Course ${name} has been created`);
  } catch (err: any) {
    const errName = err.name;
    const errCode = err.code;
    const errMessage = err.message;
    return res.status(500).send(errName ? 
      `Error ${errCode}: ${errName} - ${errMessage}` : 
      "Something went wrong, please try again.");
  }
}
