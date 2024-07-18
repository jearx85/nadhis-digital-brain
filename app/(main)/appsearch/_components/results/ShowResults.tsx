"use client";
import React, { useState, useEffect } from "react";
import "./ShowResults.css";
import parse from "html-react-parser";
import { useMediaQuery } from "usehooks-ts";

export default function ShowResults({ data, onNewSearch }: any) {
  const documentsPerPage = 5;
  const [currentPage, setCurrentPage] = useState(1);
  const [dataVersion] = useState(0);
  const isMobile = useMediaQuery("(max-width: 768px)");

  const indexOfLastDocument = currentPage * documentsPerPage;
  const indexOfFirstDocument = indexOfLastDocument - documentsPerPage;
  const currentDocuments = data.slice(
    indexOfFirstDocument,
    indexOfLastDocument
  );

  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber);

    onNewSearch();
  };

  useEffect(() => {
    // Cuando los datos cambian, restablecer la página a 1
    setCurrentPage(1);
  }, [dataVersion, data]);

  const shouldShowPagination = data.length > documentsPerPage;

  return (
    <div className="container">
      <div className={isMobile ? "first:mt-[5px]" : "cont-card flex flex-col first:mt-[70px] last:mt-[80px]"}>
        {currentDocuments.map(
          ({ id, Title, Content, Path, TitleH, ContentH, Categorias }: any) => (
            <div className="card border p-4 rounded-xl dark:bg-gray-900" key={id}>
              <h5 className="card-header bg-gray-100 dark:bg-gray-800 text-xl p-5 rounded-xl text-wrap">
                <b>{TitleH ? parse(TitleH) : Title}</b>
              </h5>
              <div className="card-body mt-4">
                <h5 className="card-title text-lg font-bold">Categoría: </h5>
                <p>{Categorias}</p>
                <h5 className="card-title mt-2 text-lg font-bold">Contenido</h5>
                <p className="content text-wrap ">
                  {ContentH
                    ? parse(`${ContentH.slice(0, 1000)}...`)
                    : `${Content.slice(0, 1000)}...`}
                </p>
                <button
                  className="card-button mt-5 p-2 border bg-gray-300 dark:bg-gray-900 dark:hover:bg-slate-700"
                  onClick={() =>
                    window.open(
                      `http://localhost:3008/${Path.replace(
                        "C:/Users/user/Dropbox/nadhis_pruebas/Folder_monitoring",
                        ""
                      )}`,
                      "_blank"
                    )
                  }
                >
                  Ver documento
                </button>
              </div>
            </div>
          )
        )}
      </div>
      {shouldShowPagination && (
        <div className="pagination justify-between mb-10">
          <nav aria-label="Page navigation example">
            <ul className="pagination justify-content-center">
              <li
                className={`page-item ${currentPage === 1 ? "disabled" : ""}`}
              >
                <button
                  className="page-link border p-2 rounded-xl"
                  onClick={() => handlePageChange(currentPage - 1)}
                >
                  {"<<"}
                </button>
              </li>
              {Array.from({
                length: Math.ceil(data.length / documentsPerPage),
              }).map((_, index) => (
                <li
                  key={index}
                  className={`page-item border p-2 rounded-xl ${
                    currentPage === index + 1 ? "active" : ""
                  }`}
                >
                  <button
                    className="page-link"
                    onClick={() => handlePageChange(index + 1)}
                  >
                    {index + 1}
                  </button>
                </li>
              ))}
              <li
                className={`page-item border p-2 rounded-xl${
                  currentPage === Math.ceil(data.length / documentsPerPage)
                    ? "disabled"
                    : ""
                }`}
              >
                <button
                  className="page-link"
                  onClick={() => handlePageChange(currentPage + 1)}
                >
                 { ">>"}
                </button>
              </li>
            </ul>
          </nav>
        </div>
      )}
    </div>
  );
}
