import { PenSquareIcon, Trash2Icon } from 'lucide-react';
import React from 'react';
import { Link } from 'react-router';
import { formatDate } from '../lib/utils';
import api from '../lib/axios';
import toast from 'react-hot-toast';

const NoteCard = ({ note, setNotes }) => {
  const { _id, title, content, createdAt } = note;

  const handleDelete = async (e, id) => {
    e.preventDefault();
    if (!window.confirm('Are you sure to delete this note?')) return;

    try {
      await api.delete(`/notes/${id}`);
      setNotes(prev => prev.filter(note => note._id !== id));
      toast.success('Note deleted successfully');
    } catch (error) {
      console.log('Error in handleDelete', error);
      toast.error('Failed to delete note');
    }
  };

  return (
    <Link
      to={`/note/${_id}`}
      className="bg-base-100 card hover:shadow-lg transition-all duration-200 border-t-4 border-solid border-[#00FF90]"
    >
      <div className="card-body ">
        <h3 className="card-title text-base-content">{title}</h3>
        <p className="text-base-content/70 line-clamp-3">{content}</p>
        <div className="card-actions justify-between items-center mt-4">
          <span className="text-sm text-base-content/60">
            {formatDate(new Date(createdAt))}
          </span>
          <div className="flex items-center gap-3">
            <PenSquareIcon className="size-4" />
            <button
              onClick={e => handleDelete(e, _id)}
              className="btn btn-ghost btn-xs text-error"
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
