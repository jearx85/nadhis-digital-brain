"use client"
import React from 'react';

function EmbeddedPage() {

  return (
    <div className="container">
      <div className="embedded-page-container">
        <iframe src="http://localhost:3030/" title="Embedded Page" className="embedded-page-iframe" />
      </div>
      <style jsx>{`
        .container {
          display: flex;
          height: 100vh;
        }

        .embedded-page-container {
          width: 100%;
          height: 100%;
          background-color: white;
          display: flex;
          flex-direction: column;
          
          padding: 20px;
          box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1); 
        }

        .embedded-page-iframe {
          width: 100%; 
          height: 100%;
          border: none;
        }
      `}</style>
    </div>
  );
}

export default EmbeddedPage;
