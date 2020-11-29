import React, { Fragment, useState, useEffect } from 'react';
import { guardarPaisFiltrado } from '../../actions/covidAction.js'
import { connect } from 'react-redux';
import './search.scss';


function Search(props) {
  const [paisesFiltrados, setPaisesFiltrados] = useState([])

  const handleChange = (e) => {
    const value = e.target.value.toLocaleLowerCase();
    if (value == '') {
      return setPaisesFiltrados([])
    }
    setPaisesFiltrados(props.covid19.filter(pais => {
      return pais.Country.toLocaleLowerCase().indexOf(value) == 0;
    }));
  };

  const guardarPaisFiltrado = (pais) => {
    fetch(`https://api.covid19api.com/country/${pais}`)
      .then(res => res.json())
      .then(data => {
        props.savePaisFiltrado(data)
      });
  }
  return (
    <Fragment>
      <div className='search'>
        <div className='search__div'>
          <input className='search__div__Serch' onChange={handleChange} placeholder=' Search Country..' />
        </div>
        {paisesFiltrados.length > 0 &&
          <div className='search__resultados'>
            {paisesFiltrados.map((pais) => {
              return (
                <div onClick={() => guardarPaisFiltrado(pais.Country)} className='search__resultados__country-map'>
                  <img className='search__resultados__flat' width='100px' src={`https://www.countryflags.io/${pais.ISO2}/flat/64.png`} />
                  <h1 className='search__resultados__country'>{pais.Country}</h1>
                </div>
              )
            })}
          </div>
        }

      </div>
    </Fragment>
  )
}

const mapStateToProps = (state) => {
  return {
    paisFiltrado: state.paisFiltrado,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    savePaisFiltrado: (datos) => dispatch(guardarPaisFiltrado(datos)),
  };
};


export default connect(mapStateToProps, mapDispatchToProps)(Search);


