import { useParams } from 'react-router-dom';
import { EntryList } from './EntryList';
import { EntryListFilters } from './EntryListFilters';
import { Layout } from './Layout';

export const TeamPage = () => {
  const { team } = useParams();

  return (
    <Layout title={team}>
      <EntryListFilters type="person" />
      <EntryList type="person" team={team} />
    </Layout>
  );
};
