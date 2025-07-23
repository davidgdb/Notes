import { useState, useRef, useEffect } from 'react';
import { Link, useNavigate, useParams } from 'react-router';
import { ArrowLeftIcon, LoaderIcon, Trash2Icon } from 'lucide-react';
import toast from 'react-hot-toast';
import api from '../lib/axios.js';

const NoteDetailPage = () => {
  const [note, setNote] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  // Ref for the textarea to control its height
  const textareaRef = useRef(null);

  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    const fetchNote = async () => {
      try {
        const res = await api.get(`/notes/${id}`);
        setNote(res.data);
      } catch (error) {
        console.log('Error in fetching note', error);
        toast.error('Failed to fetch the note');
      } finally {
        setLoading(false);
      }
    };

    fetchNote();
  }, [id]);

  // Effect to auto-expand textarea height when content changes
  useEffect(() => {
    const textarea = textareaRef.current;
    if (textarea && note?.content) {
      textarea.style.height = 'auto'; // Reset to auto to shrink if needed
      textarea.style.height = textarea.scrollHeight + 'px'; // Set to the actual content height
    }
  }, [note?.content]);

  const handleDelete = async () => {
    if (!window.confirm('Are you sure you want to delete this note?')) return;

    try {
      await api.delete(`/notes/${id}`);
      toast.success('Note deleted');
      navigate('/');
    } catch (error) {
      console.log('Error deleting the note:', error);
      toast.error('Failed to delete note');
    }
  };

  const handleSave = async (e) => {
    e.preventDefault();

    if (!note.title.trim() || !note.content.trim()) {
      toast.error('Please fill in all fields');
      return;
    }

    setSaving(true);

    try {
      await api.put(`/notes/${id}`, note);
      toast.success('Note updated successfully');
      navigate('/');
    } catch (error) {
      console.log('Error saving the note:', error);
      toast.error('Failed to update note');
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-base-200 flex items-center justify-center">
        <LoaderIcon className="animate-spin size-10" />
      </div>
    );
  }

  return (
    // Main background and container
    <div className="min-h-screen bg-base-200 flex items-center px-2">
      <div className="container mx-auto py-8">
        <div className="max-w-xl mx-auto w-full">
          {/* Back button and delete button: outside the card */}
          <div className="mb-8 flex justify-between items-center">
            <Link
              to="/"
              className="btn btn-ghost flex gap-2 items-center"
              tabIndex={0}
            >
              <ArrowLeftIcon className="size-5" />
              Back to Dashboard
            </Link>
            <button 
              onClick={handleDelete} 
              className="btn btn-error btn-outline flex gap-2 items-center"
            >
              <Trash2Icon className="size-4" />
              Delete Note
            </button>
          </div>

          {/* Card for the note editing form */}
          <div className="card bg-base-100 shadow-md">
            <div className="card-body px-6 sm:px-8 py-8">
              <h2 className="card-title text-2xl font-bold mb-2">
                Edit Note
              </h2>
              <p className="text-base-content/70 mb-6">
                Update your note with new ideas and insights!
              </p>
              <form onSubmit={handleSave} className="space-y-6">
                {/* Title Field */}
                <div className="form-control">
                  <label className="label mb-2" htmlFor="note-title">
                    <span className="label-text font-semibold">Title</span>
                  </label>
                  <input
                    id="note-title"
                    type="text"
                    className="input input-bordered w-full px-4 py-3 text-base rounded-lg"
                    placeholder="Note Title"
                    value={note?.title || ''}
                    onChange={(e) => setNote({ ...note, title: e.target.value })}
                    disabled={saving}
                    maxLength={80}
                    required
                  />
                </div>

                {/* Content Field with auto-expanding textarea */}
                <div className="form-control">
                  <label className="label mb-2" htmlFor="note-content">
                    <span className="label-text font-semibold">Content</span>
                  </label>
                  <textarea
                    id="note-content"
                    ref={textareaRef}
                    className="textarea textarea-bordered w-full px-4 py-3 text-base rounded-lg resize-none"
                    style={{
                      minHeight: '7rem',
                      maxHeight: '45vh',
                      overflowY: 'auto',
                    }}
                    placeholder="Write your note here..."
                    value={note?.content || ''}
                    onChange={(e) => setNote({ ...note, content: e.target.value })}
                    disabled={saving}
                    required
                  />
                </div>

                {/* Form actions */}
                <div className="flex justify-end pt-1">
                  <button
                    type="submit"
                    className={`btn btn-primary btn-lg px-8 transition-all duration-100 ${
                      saving ? 'btn-disabled loading' : ''
                    }`}
                    disabled={saving}
                  >
                    {saving ? 'Saving...' : 'Save Changes'}
                  </button>
                </div>
              </form>
            </div>
          </div>

          {/* Friendly footer; subtle and out of the way */}
          <div className="text-center mt-10 text-base-content/50 text-sm">
            Your changes are saved securely &mdash; keep your ideas flowing!
          </div>
        </div>
      </div>
    </div>
  );
};

export default NoteDetailPage;