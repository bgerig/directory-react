import { useDispatch, useSelector } from 'react-redux';
import { useParams, Navigate } from 'react-router-dom';

import { startEditEntry } from '../actions/entries';
import { EntryForm } from './EntryForm';
import { Layout } from './Layout';

export const EditEntryPage = () => {
  const { id } = useParams();

  const dispatch = useDispatch();
  const entry = useSelector((state) => state.entries.find((entry) => entry.id === id));

  if (!entry) {
    return <Navigate to="/" replace />;
  }

  const handleOnSubmit = (updatedEntry) => {
    dispatch(startEditEntry({ id: entry.id, updates: updatedEntry }));
  };

  return (
    <Layout title={`Editing ${entry.firstName} ${entry.lastName}`}>
      <EntryForm entry={entry} onSubmit={handleOnSubmit} />
    </Layout>
  );
};
