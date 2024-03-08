import { Layout } from './Layout';
import { EntryList } from './EntryList';
import { EntryListFilters } from './EntryListFilters';

export const DirectoryDashboardPage = () => {
  return (
    <Layout title="dashboard">
      <EntryListFilters type="person" />
      <EntryList type="person" team="all" />
    </Layout>
  );
};
