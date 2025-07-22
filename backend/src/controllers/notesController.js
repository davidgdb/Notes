import Note from '../models/Note.js';

export const getNotes = async (req, res) => {
  try {
    const notes = await Note.find().sort('-updatedAt');
    res.status(200).json(notes);
  } catch (err) {
    console.error('Error getting notes from database', err);
    res.status(500).json({ message: err.message });
  }
};

export const getNoteById = async (req, res) => {
  try {
    const note = await Note.findById(req.params.id);
    if(!note) return res.status(404).json({message: 'Note not Found'});
    res.status(200).json(note);
  } catch (err) {
    console.error('Error getting note from database', err);
    res.status(500).json({ message: err.message });
  }
};

export const createNote = async (req, res) => {
  try {
    const { title, content } = req.body;
    const newNote = new Note({ title, content });

    await newNote.save();
    res.status(201).json({ message: 'New note created successfully', note: newNote });
  } catch (err) {
    console.error('Error creating note', err);
    res.status(500).json({ message: err.message });
  }
};

export const updateNote = async (req, res) => {
  try {
    const { title, content } = req.body;
    const updatedNote = await Note.findByIdAndUpdate(
      req.params.id,
      { title, content },
      { new: true }
    );

    if (!updatedNote) return res.status(404).json({ message: 'Note not found' });
    res.status(200).json({message: 'Note updated successfully'});
  } catch (err) {
    console.error('Error updating note', err);
    res.status(500).json({ message: err.message });
  }
};

export const deleteNote = async (req, res) => {
  try {
    const deletedNote = await Note.findByIdAndDelete(req.params.id);

    if (!deletedNote) return res.status(404).json({ message: 'Note not found' });
    res.status(200).json({message: 'Note deleted successfully'});
  } catch (err) {
    console.error('Error deleting note', err);
    res.status(500).json({ message: err.message });
  }
};