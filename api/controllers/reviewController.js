import createError from "../utils/createError.js"
import Review from "../models/reviewModel.js"
import Gig from "../models/gigModel.js"

export const createReview = async (req, res, next) => {
  if (req.isSeller) {
    return next(createError(403, "Seller can't create review"))
  }

  const newReview = new Review({
    userId: req.userId,
    gigId: req.body.gigId,
    desc: req.body.desc,
    star: req.body.star
  })

  try {
    const review = await Review.findOne({
      gigId: req.body.gigId,
      userId: req.userId
    })

    if (review) {
      return next(createError(403, "You already created review for this Gig!"))
    }

    const savedReview = await newReview.save()

    await Gig.findByIdAndUpdate(req.body.gigId, {
      $inc: { totalStars: req.body.star, starNumber: 1 }
    })

    res.status(201).send(savedReview)

  } catch (error) {
    next(error)
  }
}

export const getReviews = async (req, res, next) => {
  try {
    const reviews = await Review.find({gigId: req.params.gigId })
    res.status(201).send(reviews)
  } catch (error) {
    next(error)
  }
}

export const deleteReview = async (req, res, next) => {
  try {

  } catch (error) {
    next(error)
  }
}