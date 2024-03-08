import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import { startAddEntry } from '../actions/entries';
import { Layout } from './Layout';
import { EntryForm } from './EntryForm';

export const AddEntryPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  return (
    <Layout title="Add New Entry">
      <EntryForm
        onSubmit={(entry) => {
          dispatch(startAddEntry(entry));
          navigate('/');
        }}
      />
    </Layout>
  );
};
