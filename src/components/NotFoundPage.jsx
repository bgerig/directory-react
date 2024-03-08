import { Header } from './Header';
import { Sidebar } from './Sidebar';

export const NotFoundPage = () => (
  <div className="app-container">
    <Header />
    <div className="main">
      <Sidebar />
      <div className="page-not-found">
        <div className="page-not-found__message">
          <h2>Oops, sorry mate</h2>
          <h2>you&apos;re in the wrong place</h2>
        </div>
        <div className="page-not-found__bg"></div>
      </div>
    </div>
  </div>
);
