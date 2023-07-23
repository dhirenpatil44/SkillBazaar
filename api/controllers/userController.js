import User from "../models/userModel.js"
import createError from "../utils/createError.js";

export const deleteUser = async (req, res) => {
  const user = await User.findById(req.params.id)

  if (req.userId !== user?._id.toString()) {
    return next(createError(403, "You are not account owner"))
  }

  await User.findByIdAndDelete(req.params.id);
  res.status(200).send("Deleted")
};

export const getUser = async (req, res, next) => {
  const user = await User.findById(req.params.id)

  if(!user){
    return next(createError(403, "Something wrong"))
  }

  res.status(200).send(user)
};