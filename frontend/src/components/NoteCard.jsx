import { Link } from 'react-router';
import { PenSquareIcon, Trash2Icon } from 'lucide-react';
import { formatedDate } from '../lib/utils.js';
import api from '../lib/axios.js';
import toast from 'react-hot-toast';

const NoteCard = ({ note, setNotes }) => {
  const handleDelete = async (e, id) => {
    e.preventDefault(); //get rid of the navigation behavior

    if (!window.confirm('Are you sure you want to delete this note?')) return;

    try {
      await api.delete(`/notes/${id}`);
      setNotes((prev) => prev.filter((note) => note._id !== id)); //get rid of the deleted
      toast.success('Note deleted successfully');
    } catch (err) {
      console.error(err);
      toast.error('Error deleting note');
    }
  };

  return (
    <Link
      to={`/note/${note._id}`}
      className={
        'card bg-base-100 hover:shadow-lg shadow-amber-400 transition-all duration-300 border-t-4 border-solid border-orange-400'
      }
    >
      <div className="card-body">
        <h3 className="card-title text-base-content">{note.title}</h3>
        <p className="card-text text-base-content/70 line-clamp-3">
          {note.content}
        </p>
        <div className="card-actions justify-between items-center mt-4">
          <span className="text-sm text-base-content/60">
            {formatedDate(note.updatedAt)}
          </span>
          <div className="flex items-center gap-1">
            {/*TODO add button for edit similar to delete button and routing*/}
            {/*TODO difference between viewing and editing a note*/}
            <PenSquareIcon className="size-4" />
            <button
              className="btn btn-ghost btn-xs text-error"
              onClick={(e) => handleDelete(e, note._id)}
            >
              <Trash2Icon className="size-4" />
            </button>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default NoteCard;
