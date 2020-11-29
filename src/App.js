// Packages
import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { cargarDatosAction } from './actions/covidAction.js';
import ReactTooltip from 'react-tooltip';
//Components
import Search from './components/search/Search.js';
//Assests
import logo from './assests/ll/logo3.png';
import infectado from './assests/ll/infectado.png';
import muerto from './assests/ll/muerto.png';
import recuperado from './assests/ll/recuperado.png';
import info from './assests/ll/info.png';
import stayalive from './assests/ll/stayalive.png';
//styles
import './App.scss';
import { Fragment } from 'react';

function App(props) {
  useEffect(() => {
    fetch('https://api.covid19api.com/countries')
      .then(res => res.json())
      .then(data => {
        props.guardarDatos(data)
      })
  }, []);

  const [datosGlobales, setDatosGlobales] = useState([])
  useEffect(() => {
    fetch('https://api.covid19api.com/summary')
      .then(res => res.json())
      .then(data => {
        setDatosGlobales(data.Global)
      })
  }, []);

  const [information, setInformation] = useState()
  return (
    <div className="master-div">
      <div className='izquierdo'>
        <div className='izquierdo__degradado'>
          {information ?
           <div className='izquierdo__informacion-amabie'>
             <h3 className='izquierdo__inf-amb'>
              <span className='izquierdo__amabie-span'>Amabie</span>
              <br/>
              A creature legendary in japan, of long hair,
              fish scales and bird beak, has come out of oblivion since the covid-19 crisis,
              since his image supposedly protects from epidemics.Just taking your portrait is enough to
              bring good harvest and save citizens from this pandemic.
              <br/>
              In it website in this website you gonna finde information about covid-19 in your country and
              how to prevent contagion to take care of yourself
              in the best way
             </h3>
             
             <a className='izquierdo__back' onClick={() => setInformation(false)}>﴾-back-﴿</a></div>
            :
            <Fragment>
              <div className='izquierdo__izq-top'>
                <img className='izquierdo__logo-amabie' src={logo}></img>
                <ReactTooltip />
                <img onClick={() => setInformation(true)} data-tip="Information" className='izquierdo__infoamabie' src={info} />
              </div>
              <div className='izquierdo__izq-bottom'>
                <Search
                  covid19={props.covid19}
                />
              </div>
            </Fragment>
          }


        </div>
      </div>
      <div className='derecho'>
        <div className={props.paiselegido ? 'derecho__top' : 'derecho__start'}>
          {props.paiselegido
            ? (
              <div className='derecho__flag' style={{ backgroundImage: `url(https://www.countryflags.io/${props.paiselegido.CountryCode}/flat/64.png)` }} >
                <div className='derecho__informacion'>
                  <div className='derecho__informacion__div'>
                    <h1 className='derecho__informacion__div__RES-H1'>{props.paiselegido.Country}</h1>
                    <h3 className='derecho__informacion__div__RES-H3'><span className='derecho__informacion__div__span'>Confirmed:</span> {props.paiselegido.Confirmed}</h3>
                    <h3 className='derecho__informacion__div__RES-H3'><span className='derecho__informacion__div__span'>Deaths:</span> {props.paiselegido.Deaths}</h3>
                    <h3 className='derecho__informacion__div__RES-H3'><span className='derecho__informacion__div__span'>Recovered:</span> {props.paiselegido.Recovered}</h3>
                    <h3 className='derecho__informacion__div__RES-H3'><span className='derecho__informacion__div__span'>Active:</span> {props.paiselegido.Active}</h3>
                    <h3 className='derecho__informacion__div__RES-H3' ><span className='derecho__informacion__div__span'>Date:</span> {props.paiselegido.Date}</h3>
                  </div>
                </div>
              </div>)
            : (
              <img className='derecho__informacion__stayalive' src={stayalive} />
            )
          }
        </div>
        <div className='derecho__bottom'>
          <div className='derecho__bottom__bot'>

            <div className='tip__container'>
              <div className='tip__container__image'>
                <img className='tip__container__imagenFlex' src={infectado} />
              </div>
              <div className='tip__container__info'>
                <h5 className='tip__container__dato'>New Confirmed: {datosGlobales.NewConfirmed}</h5>
                <h5 className='tip__container__dato'>Total Confirmed: {datosGlobales.TotalConfirmed}</h5>
              </div>
            </div>


            <div className='tip__container'>
              <div className='tip__container__image'>
                <img className='tip__container__imagenFlex' src={muerto} />
              </div>
              <div className='tip__container__info'>
                <h5 className='tip__container__dato'>New Deaths: {datosGlobales.NewDeaths}</h5>
                <h5 className='tip__container__dato'>Total Deaths: {datosGlobales.TotalDeaths}</h5>
              </div>
            </div>


            <div className='tip__container'>
              <div className='tip__container__image'>
                <img className='tip__container__imagenFlex' src={recuperado} />
              </div>
              <div className='tip__container__info'>
                <h5 className='tip__container__dato'>New Recovered: {datosGlobales.NewRecovered}</h5>
                <h5 className='tip__container__dato'>Total Recovered: {datosGlobales.TotalRecovered}</h5>
              </div>
            </div>
          </div>



        </div>
      </div>
    </div>
  );
}
const mapStateToProps = (state) => {
  return {
    covid19: state.pais,
    paiselegido: state.paisFiltrado,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    guardarDatos: (datos) => dispatch(cargarDatosAction(datos)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
