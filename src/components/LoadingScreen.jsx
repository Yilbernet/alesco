import React, { useState, useEffect } from 'react';
import { Image, Progress } from 'semantic-ui-react';

const LoadingScreen = () => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      
      if (progress < 100) {
        setProgress(prevProgress => prevProgress + 25);
      } else {
        clearInterval(interval);
      }
    }, 1000); 
    return () => clearInterval(interval);
  }, [progress]);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', height: '100vh', background: 'linear-gradient(rgba(229, 255, 0, 0.81), rgba(100, 100, 100, 0.91))', border: "none", padding: "0.5rem", marginTop: "0rem", }}>
    <Image src='./Fondos/Loagin.gif' size='medium' centered style={{ background: 'linear-gradient(rgba(229, 255, 0, 0.81), rgba(100, 100, 100, 0.91))', border: "none", padding: "0.5rem", marginTop: "0rem", }} />
    
    <Progress percent={progress} size='medium' indicating style={{ marginTop: "0.5rem", width: "50%" }} />
    <span style={{ marginTop: "-2.3rem", color: "white" }}>{progress}%</span>
  </div>
  
  );
};

export default LoadingScreen;
