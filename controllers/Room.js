import { Types } from "mongoose";
import { GraphQLError } from "graphql";
import Room from "../models/Room.js";

const getAllRooms = async () => {
  const rooms = await Room.find().populate({
    path: "steps",
    populate: {
      path: "participants",
      model: "User",
    },
  });
  return rooms;
};

const getUnfilledRoom = async () => {
  const unfilledRoom = await Room.find({
    status: "NEW",
  }).populate({
    path: "steps",
    populate: [{
      path: "participants",
      populate: {
        path: "user",
        model: "User",
      },
    },
    {
      path: "category",
      model: "Category",
    },
    {
      path: "question",
      model: "QuestionsAndAnswer",
    }],
  });
  return unfilledRoom;
};

const getRoomById = async (_, { id }) => {
  if (Types.ObjectId.isValid(id)) {
    return Room.findById(id).populate({
      path: "steps",
      populate: [{
        path: "participants",
        populate: {
          path: "user",
          model: "User",
        },
      },
      {
        path: "category",
        model: "Category",
      },
      {
        path: "question",
        model: "QuestionsAndAnswer",
      },
      ],
    });
  }
  throw new GraphQLError("Invalid ID", {
    extensions: { code: "404" },
  });
};

export {
  getAllRooms,
  getRoomById,
  getUnfilledRoom,
};
