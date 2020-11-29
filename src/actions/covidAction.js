export const CARGAR_DATOS = 'CARGAR_DATOS';
export const GUARDAR_FILTRADO = 'GUARDAR_FILTRADO';

export const cargarDatosAction = (datos) => {
    return {
        type: CARGAR_DATOS,
        payload: datos
    }
}

export const guardarPaisFiltrado = (datos)=>{
    return{
        type: GUARDAR_FILTRADO,
        payload: datos,
    }
}