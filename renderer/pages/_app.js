import React from 'react';
import "../styles/globals.css";
import { GlobalProvider } from '../context/GlobalContext';

function MyApp({ Component, pageProps }) {
  return (
    <React.Fragment>
      <GlobalProvider>
        <Component {...pageProps} />
      </GlobalProvider>
    </React.Fragment>
  );
}

export default MyApp;
