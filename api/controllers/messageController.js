import Message from "../models/messageModel.js"
import Conversation from "../models/conversationModel.js"

export const createMessage = async (req, res, next) => {
  const newMessage = new Message({
    conversationId: req.body.conversationId,
    userId: req.userId,
    desc: req.body.desc,
  })

  try {
    const savedMessage = await newMessage.save()

    await Conversation.findOneAndUpdate(
      { id: req.body.conversationId },
      {
        $set: {
          readByBuyer: !req.isSelller,
          readBySeller: req.isSelller,
          lastMessage: req.body.desc,
        },
      },
      { new: true }
    )

    res.status(201).send(savedMessage)
  } catch (error) {
    next(error)
  }
}

export const getMessages = async (req, res, next) => {
  try {
    const messages = await Message.find({ conversationId: req.params.id })
    res.status(200).send(messages)
  } catch (error) {
    next(error)
  }
}