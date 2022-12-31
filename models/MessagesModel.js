import mongoose from "mongoose";

const MsgSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
  },
  tipo: {
    type: String,
    required: true,
  },
  time:{type: String},
  message: {
    type: String,
    required: true,
  },
});

export default mongoose.model("Mensaje", MsgSchema);