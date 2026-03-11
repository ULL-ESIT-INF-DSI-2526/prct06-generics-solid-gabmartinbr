/**
 * interfaz generica que define el contrato que deben seguir todos los entrenamientos
 */
export interface Registrable<T> {
    /**
     * metodo que devuelve resumen del ejercicio registrable
     */
    summary(): T
    /**
     * metodo que devuelve el numero de calorias el ejercicio registrable
     */
    calories(): number
}


