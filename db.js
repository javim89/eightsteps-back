import { connect } from "mongoose";

const connectDB = async () => {
  try {
    await connect("mongodb://localhost/eight-steps");
    console.log("mongo conencted");
  } catch (error) {
    console.error(error);
  }
};

export { connectDB };
