const { Users, Course } = require("../../db");
import { Request, Response } from "express";
/*import { initializeApp } from "firebase/app";
import {
  getAuth,
  updateEmail,
  updatePassword,
  updatePhoneNumber,
  updateProfile,
} from "firebase/auth";

const { REACT_APP_FIREBASE_CONFIG } = process.env;
const firebaseConfig = JSON.parse(REACT_APP_FIREBASE_CONFIG!);
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const user = auth.currentUser;*/

export async function updateUserProfile(req: Request, res: Response) {
  try {
    const { id, fullname, profileImg } = req.body;
    if (id) {
      /*await updateProfile(user, {
        displayName: fullname,
        photoURL: profileImg,
      });*/
      await Users.update(
        {
          fullname: fullname,
          profileImg: profileImg,
        },
        {
          where: {
            id: id,
          },
        }
      );
      res.status(200).send("Update successfully");
    }
  } catch (error) {
    res.status(400).send(`Cannot update profile ${error}`);
  }
}

export async function updateUserEmail(req: Request, res: Response) {
  try {
    const { id, email } = req.body;
    if (id) {
      /*if (user.email !== email) {
        await updateEmail(user, email);
      } else {
        throw new Error("Same Email");
      }*/
      await Users.update(
        {
          email: email,
        },
        {
          where: { id: id },
        }
      );
      res.status(200).send("Update email successfully");
    }
  } catch (error) {
    res.status(400).send(`Cannot update email ${error}`);
  }
}

/*export async function updateUserPassword(req: Request, res: Response) {
  try {
    const { password } = req.body;
    if (user) {
      await updatePassword(user, password);
      res.status(200).send("Update password successfully");
    }
  } catch (error) {
    res.status(400).send(`Cannot update password ${error}`);
  }
}*/

export async function updateUserPhone(req: Request, res: Response) {
  try {
    const { id, phoneNumber } = req.body;
    if (id) {
      /*await updatePhoneNumber(user, phoneNumber);*/
      await Users.update(
        {
          phoneNumber: phoneNumber,
        },
        {
          where: { id: id },
        }
      );
      res.status(200).send("Update phone number successfully");
    }
  } catch (error) {
    res.status(400).send(`Cannot update phone number ${error}`);
  }
}

export async function updateCart(req: Request, res: Response) {
  try {
    const { fullname, cart, buy } = req.body;
    let fullnameDB = fullname.split(" ").join("-").toLowerCase();
    let user = await Users.findOne({
      where: {
        fullname: fullnameDB
      },
      include: {
        model: Course,
        attributes: ["name"],
        through: {
          attributes: [],
        },
      },
    });
    if(buy){
      let nameCourses = cart.map((el: any)=>{
        return el.name.split(" ").join("-").toLowerCase();
      });
      let coursesDB = await Course.findAll({
        where: {
          name: nameCourses
        }
      });
      coursesDB.forEach((el: any)=>{
        user.addCourse(el);
      });
      await Users.update({
        cart: []
      },{
        where: {
          fullname: fullnameDB
        }
      })
      return res.status(200).send("The courses has been created");
    } else {
      await Users.update({
        cart: cart
      }, {
        where: {
          fullname: fullnameDB
        }
      });
      return res.status(200).send(`The cart of user ${fullname} has been updated`);
    }
  } catch (err) {
    return res.status(404).send(err)
  }
}