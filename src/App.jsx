import { useState, useEffect } from 'react';

import { store } from './main';
import { Router } from './Router';
import { startSetEntries } from './actions/entries';
import { LoadingScreen } from './components/LoadingScreen';

export function App() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    store.dispatch(startSetEntries()).then(() => {
      setIsLoading(false);
    });
  }, []);

  if (isLoading) {
    return <LoadingScreen />;
  }

  return <Router />;
}
