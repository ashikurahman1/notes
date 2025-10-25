import React, { useEffect, useState } from 'react';
import { toast } from 'react-hot-toast';
import Navbar from '../components/Navbar';
import RateLimitedUI from '../components/RateLimitedUI';

import NoteCard from '../components/NoteCard';
import api from '../lib/axios';
import NotesNotFound from '../components/NotesNotFound';
const HomePage = () => {
  const [rateLimited, setRateLimited] = useState(false);
  const [notes, setNotes] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchNotes = async () => {
      try {
        const res = await api.get('/notes');
        setNotes(res.data);
      } catch (error) {
        console.log('Error Fetching', error);
        if (error.response?.status === 429) {
          setRateLimited(true);
        } else {
          toast.error('Faild to load Notes..');
        }
      } finally {
        setLoading(false);
      }
    };
    fetchNotes();
  }, []);

  return (
    <div className="min-h-screen ">
      <Navbar />

      {rateLimited && <RateLimitedUI />}

      <div className="max-w-7xl mx-auto p-4 m-6 ">
        {loading && (
          <div className="text-primary text-center py-10">
            {' '}
            Loading note....
          </div>
        )}

        {notes.length === 0 && !rateLimited && <NotesNotFound />}

        {notes.length > 0 && !rateLimited && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {notes.map((note, index) => (
              <NoteCard key={index} note={note} setNotes={setNotes} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default HomePage;
