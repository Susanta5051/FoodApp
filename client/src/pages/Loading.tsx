import React, { useState, useEffect } from 'react';

const LoadingPage: React.FC = () => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 2000);
    return () => clearTimeout(timer);
  }, []);

  if (isLoading) {
    return (
      <div style={styles.container}>
        <div style={styles.spinner}></div>
        <h2 style={styles.text}>Preparing your experience...</h2>
      </div>
    );
  }

};

const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column' as const,
    alignItems: 'center',
    justifyContent: 'center',
    height: '100vh',
    backgroundColor: '#f9f9f9',
  },
  spinner: {
    width: '50px',
    height: '50px',
    border: '5px solid #ddd',
    borderTop: '5px solid #3498db',
    borderRadius: '50%',
    animation: 'spin 1s linear infinite',
  },
  text: {
    marginTop: '20px',
    fontFamily: 'sans-serif',
    color: '#555',
  }
};

export default LoadingPage;
