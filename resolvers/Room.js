import Room from "../models/Room.js";

const RoomResolvers = {
  Query: {
    getAllRooms: async () => {
      const rooms = Room.find();
      return rooms;
    },
    getRoomById: async (_, { id }) => {
      const room = Room.findById(id);
      return room;
    },
  },
  Mutation: {
    createRoom: async (_, { isPrivate }) => {
      const room = new Room({ isPrivate });
      const newRoom = await room.save();
      return newRoom;
    },
  },
};

export default RoomResolvers;
