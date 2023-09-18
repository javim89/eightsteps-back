import User from "../models/User.js";

const UserResolvers = {
  Query: {
    getAllUsers: async () => {
      const users = await User.find();
      return users;
    },
    getUserById: async (_, { id }) => {
      const user = await User.findById(id);
      return user;
    },
  },
  Mutation: {
    createUser: async (_, { name, surname }) => {
      const user = new User({
        name,
        surname,
      });

      const newUser = await user.save();
      return newUser;
    },
  },
};

export default UserResolvers;
