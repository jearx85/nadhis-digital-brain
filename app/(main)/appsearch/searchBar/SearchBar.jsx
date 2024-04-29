"use client";
import React, { useState, useEffect } from 'react';
// import { useLocation } from 'react-router-dom';
// import logo from '../../img/logo_citra.png';
// import logo from '../../img/logo-nadhis.png';
import ShowResults from '../_components/results/ShowResults';
import Filtros from '../_components/filters/Filtros';
// import { useNavigate } from 'react-router-dom'
import './SearchBar.css';

export default function SearchBar() {
  const [showResults, setShowResults] = useState(false);
  const [ dataNadhis, setDataNadhis] = useState([]);
  const [, setSelectedFilters] = useState({});
  const [searchValue, setSearchValue] = useState('');
  const [filterdocs, setFilterdocs] = useState([]);
  const [, setDataVersion] = useState(0);
  const [isChecked, setIsChecked] = useState(false);
  // const navigate = useNavigate();
  // const location = useLocation();
  // const searchParams = new URLSearchParams(location.search);
  // const valorHome = searchParams.get('search');


  const [selectedExtensions, setSelectedExtensions] = useState(null);
  const [selectedCategory, setselectedCategory] = useState(null);

  const handleNewSearch = () => {
    resetFilters();
    // Incrementar la versión de los datos para restablecer la página
    setDataVersion((prevVersion) => prevVersion + 1);
  };

  const resetFilters = () => {
    // Resetear los estados de los filtros
    setSelectedFilters({});
    setFilterdocs([]);
    setIsChecked(false);
    setSelectedExtensions(null);
    setselectedCategory(null);
  };
//======================= Filtros ===========================================
  const handleFilterChange = (e, filter = "", filtro) => {
    const docFiltrados = dataNadhis.filter((doc) => doc[filtro] === e.target.value);

    setIsChecked(e.target.checked)

    setSelectedFilters((prevFilters) => ({
      ...prevFilters,
      [filter]: !prevFilters[filter],
    }));

    setFilterdocs(docFiltrados);
 
  };

  //=========================== Realiza la búsqueda con el valor de "valorHome" ==================================================
  useEffect(() => {
    // if (valorHome) {
      resetFilters();
      const urlNdhis = `http://192.168.50.230:8087/query2/informes`;
    fetch(urlNdhis)
      .then((response) => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then((docsData) => {
        const results = docsData.hits.map((item) => {
          const obj = {
            id: item._id,
            Title: item._source.Title,
            Content: item._source.Content,
            Path: item._source.Path,
            Categorias: item._source.Categorias.pop(),
            Extensión: item._source.Extensión,
            TitleH: item.highlight && item.highlight.Title ? item.highlight.Title[0] : null,
            ContentH: item.highlight && item.highlight.Content ? item.highlight.Content[0] : null,
          };
        
          return obj;
        });
        
        setDataNadhis(results);
        setShowResults(true);
        
    })
      .catch((error) => {
        console.error('Error:', error);
      });
    // }
  }, []);    


//=========================== Hacer petición y setear datos ================================================

const handleSearch = (event) => {
    event.preventDefault();
    const valorBusqueda = document.getElementById("search-box").value
    if(!valorBusqueda) return;//Validar input vacío.
    
    resetFilters();
    const urlNdhis = `http://192.168.50.230:8087/query2/${valorBusqueda}`;
      
      navigate(`/main?search=${valorBusqueda}`);
      fetch(urlNdhis)
        .then((response) => {
          if (!response.ok) {
            throw new Error('Network response was not ok');
          }
          return response.json();
        })
        .then((docsData) => {
        const results = docsData.hits.map((item) => {
          const obj = {
            id: item._id,
            Title: item._source.Title,
            Content: item._source.Content,
            Path: item._source.Path,
            Categorias: item._source.Categorias.pop(),
            Extensión: item._source.Extensión,
            TitleH: item.highlight && item.highlight.Title ? item.highlight.Title[0] : null,
            ContentH: item.highlight && item.highlight.Content ? item.highlight.Content[0] : null,
          };

          return obj;
        });
          setDataNadhis(results);
          setShowResults(true);
        })
        .catch((error) => {
          console.error('Error:', error);
        });
  };

  return (
    <>
      <nav className="navbar fixed-top bg-body-tertiary">
        <div className="container-fluid search-bar">
          <div className="imagen">
            <a href="/">
              {/* <img src={logo} alt="Logo" width="140" height="50" /> */}
            </a>
          </div>
          <form className="d-flex custom-form" onSubmit={handleSearch}>
            <div className="d-flex busqueda-main">
              <input
                id="search-box"
                className="form-control me-2"
                type="search"
                aria-label="Search"
                value={searchValue}
                onChange={(e) => setSearchValue(e.target.value)}
              />
              <button className="btn-search" type="button" onClick={handleSearch}>
                Buscar
              </button>
            </div>
          </form>
        </div>
      </nav>
      <div className="container">
        <div className="row">
          <div className="col-lg-3">
            <Filtros data={dataNadhis} handleFilterChange={handleFilterChange} onNewSearch={handleNewSearch} setSelectedExtensions={setSelectedExtensions} selectedExtensions={selectedExtensions} selectedCategory={selectedCategory} setselectedCategory={setselectedCategory}/>
          </div>
          <div className="col-sm-12 col-lg-9">
            {isChecked ? <ShowResults data={filterdocs} onNewSearch={handleNewSearch}/> :  showResults && <ShowResults data={dataNadhis} onNewSearch={handleNewSearch}/>} 
          </div>
        </div>
      </div>
    </>
  );
}
