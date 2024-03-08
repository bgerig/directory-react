import spinner from '../assets/images/loader.gif';

export const LoadingScreen = () => (
  <div className="loading-screen">
    <div className="loading-screen__loader">
      <img src={spinner} alt="Loader Icon" />
    </div>
    <h3>Loading...</h3>
  </div>
);
