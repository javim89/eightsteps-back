import jwt from "jsonwebtoken";
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
    createUser: async (_, { alias, name, surname }, { res }) => {
      const user = new User({
        alias,
        name,
        surname,
      });

      const newUser = await user.save();

      const token = jwt.sign(
        { userId: newUser.id, alias: user.alias },
        process.env.JWT_PRIVATE_KEY,
        { expiresIn: process.env.TOKEN_EXPIRY_TIME },
      );

      res.cookie("auth-token", token, {
        httpOnly: true,
        secure: true,
        maxAge: 8600,
      });

      return {
        token,
      };
    },
  },
};

export default UserResolvers;
