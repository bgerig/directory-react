import { useSelector } from 'react-redux';

import { Header } from './Header';
import { Sidebar } from './Sidebar';

export const Layout = ({ children, title }) => {
  const isSidebarOpen = useSelector((state) => state.tools.sidebar === 'open');

  return (
    <div className={`app-container ${isSidebarOpen ? 'w-sidebar-open' : ''}`}>
      <Header />
      <div className="main">
        <Sidebar />
        <div className="content">
          <div className="page-title">
            <h2>{title}</h2>
          </div>
          {children}
        </div>
      </div>
    </div>
  );
};
