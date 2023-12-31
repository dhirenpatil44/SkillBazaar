import jwt from "jsonwebtoken";
import User from "../models/userModel.js"
import bcrypt from "bcrypt"
import createError from "../utils/createError.js";

export const register = async (req, res, next) => {
  try {
    const hash = bcrypt.hashSync(req.body.password, 10);

    const newUser = new User({
      ...req.body,
      password: hash
    })

    await newUser.save();
    res.status(201).send("User has been created.")
  } catch (error) {
    // res.status(500).send("Something went wrong.")
    next(error)
  }
}

export const login = async (req, res, next) => {
  try {
    const user = await User?.findOne({ username: req?.body?.username })
    if (!user) {
      return next(createError(404, "User not found!"))
    }

    const isCorrect = bcrypt?.compareSync(req?.body?.password, user?.password)
    if (!isCorrect) {
      return next(createError(400, "Wrong Password!"))
    }

    const token = jwt?.sign(
      {
        id: user?._id,
        isSeller: user?.isSeller
      },
      process.env.JWT_KEY
    );

    const { password, ...info } = user?._doc
    res
      .cookie("access_token", token, {
        httpOnly: true,
        sameSite: "none",
        secure: true
      })
      .status(200)
      .send(info)

  } catch (error) {
    next(error)
  }
}

export const logout = async (req, res, next) => {

  try {
    res.clearCookie("access_token", {
      sameSite: "none",
      secure: true,
    })
      .status(200)
      .send("User has been loged out!")
  } catch (error) {
    next(error)
  }
}