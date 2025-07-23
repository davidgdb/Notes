import NavBar from '../components/NavBar.jsx';
import { useEffect, useState } from 'react';
import RateLimitedUI from '../components/RateLimitedUI.jsx';
import toast from 'react-hot-toast';
import NoteCard from '../components/NoteCard.jsx';
import api from '../lib/axios.js';
import NotesNotFound from '../components/NotesNotFound.jsx';

const HomePage = () => {
  const [isRateLimited, setIsRateLimited] = useState(false);
  const [notes, setNotes] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchNotes = async () => {
      try {
        const res = await api.get('/notes');
        console.log(res.data);
        setNotes(res.data);
        setIsRateLimited(false);
      } catch (err) {
        console.log(err);
        if (err.response?.status === 429) {
          setIsRateLimited(true);
        } else {
          toast.error('Error fetching notes');
        }
      } finally {
        setLoading(false);
      }
    };

    fetchNotes();
  }, []);

  return (
    <div className="min-h-screen">
      <NavBar />
      {isRateLimited && <RateLimitedUI />}

      {notes.length === 0 && !isRateLimited && <NotesNotFound />}

      <div className="mx-auto max-w-7xl p-4 mt-6">
        {/*TODO replace loading icon with skeleton effect(youtube)*/}
        {loading && (
          <div className={'text-center text-primary py-10'}>
            <button className="btn">
              <span className="loading loading-spinner"></span>
              Loading
            </button>
          </div>
        )}

        {notes.length > 0 && !isRateLimited && (
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {notes.map((note) => (
              <NoteCard key={note._id} note={note} setNotes={setNotes} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default HomePage;
