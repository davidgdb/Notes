import { useState, useRef, useEffect } from 'react';
import { Link, useNavigate } from 'react-router';
import { ArrowLeftIcon } from 'lucide-react';
import toast from 'react-hot-toast';
import api from '../lib/axios.js';

const CreatePage = () => {
  // State for note fields and loading state
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [loading, setLoading] = useState(false);

  // Ref for the textarea to control its height
  const textareaRef = useRef(null);

  // Navigation hook
  const navigate = useNavigate();

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!title.trim() || !content.trim()) {
      toast.error('Please fill in all fields');
      return;
    }

    setLoading(true);
    try {
      await api.post('/notes', { title, content });
      toast.success('Note created successfully');
      navigate('/');
    } catch (err) {
      if (err.response?.status === 429) {
        toast.error('Too many requests', {
          duration: 5000,
          icon: '🤕',
        });
        return;
      }
      toast.error('Error creating note');
    } finally {
      setLoading(false);
    }
  };

  // Effect to auto-expand textarea height when content changes
  useEffect(() => {
    const textarea = textareaRef.current;
    if (textarea) {
      textarea.style.height = 'auto'; // Reset to auto to shrink if needed
      textarea.style.height = textarea.scrollHeight + 'px'; // Set to the actual content height
    }
  }, [content]);

  return (
    // Main background and container
    <div className="min-h-screen bg-base-200 flex items-center px-2">
      <div className="container mx-auto py-8">
        <div className="max-w-xl mx-auto w-full">
          {/* Back button: left aligned, outside the card */}
          <div className="mb-8 flex">
            <Link
              to="/"
              className="btn btn-ghost flex gap-2 items-center"
              tabIndex={0}
            >
              <ArrowLeftIcon className="size-5" />
              Back to Dashboard
            </Link>
          </div>

          {/* Card for the note creation form */}
          <div className="card bg-base-100 shadow-md">
            <div className="card-body px-6 sm:px-8 py-8">
              <h2 className="card-title text-2xl font-bold mb-2">
                Create New Note
              </h2>
              <p className="text-base-content/70 mb-6">
                Capture your ideas quickly and securely!
              </p>
              <form onSubmit={handleSubmit} className="space-y-6">
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
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    disabled={loading}
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
                    // resize-none since height is now dynamic via JS, not manual dragging
                    style={{
                      minHeight: '7rem',
                      maxHeight: '45vh',
                      overflowY: 'auto',
                    }}
                    placeholder="Write your note here..."
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    disabled={loading}
                    required
                  />
                </div>

                {/* Form actions */}
                <div className="flex justify-end pt-1">
                  <button
                    type="submit"
                    className={`btn btn-primary btn-lg px-8 transition-all duration-100 ${
                      loading ? 'btn-disabled loading' : ''
                    }`}
                    disabled={loading}
                  >
                    {loading ? 'Creating...' : 'Create Note'}
                  </button>
                </div>
              </form>
            </div>
          </div>

          {/* Friendly footer; subtle and out of the way */}
          <div className="text-center mt-10 text-base-content/50 text-sm">
            Your notes are stored safely &mdash; ready whenever inspiration
            strikes!
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreatePage;
