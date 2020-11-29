import { CARGAR_DATOS, GUARDAR_FILTRADO } from '../actions/covidAction';
const State_default = {
  pais: [],
  paisFiltrado: null,
}

export default (state = State_default, action) => {
  switch (action.type) {
    case CARGAR_DATOS:
      return {
        ...state,
        pais: action.payload
      }
    case GUARDAR_FILTRADO:
      return {
        ...state,
        paisFiltrado: action.payload.pop()
      }
    default:
      return state;
  }
}