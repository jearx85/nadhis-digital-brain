// components/EmbeddedPage.js

import React from 'react';

const EmbeddedPage = ({ url, onClose }: any) => {
  return (
    <div className="embedded-page-container">
      <div className="embedded-page-header">
        <button onClick={onClose} className="close-button">Cerrar</button>
      </div>
      <iframe src={url} title="Embedded Page" className="embedded-page-iframe" />
      <style jsx>{`
        .embedded-page-container {
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background-color: white;
          z-index: 1000;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
        }

        .embedded-page-header {
          width: 100%;
          padding: 10px;
          text-align: right;
        }

        .close-button {
          background: none;
          border: none;
          cursor: pointer;
          color: #333;
          font-size: 16px;
        }

        .embedded-page-iframe {
          width: 80%;
          height: 80%;
          border: none;
        }
      `}</style>
    </div>
  );
};

export default EmbeddedPage;
