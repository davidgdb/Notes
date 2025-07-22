import mongoose from 'mongoose';

//1. Create schema
//2. Create model based off of schema

const noteSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    content: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const Note = mongoose.model('Note', noteSchema);

export default Note;
