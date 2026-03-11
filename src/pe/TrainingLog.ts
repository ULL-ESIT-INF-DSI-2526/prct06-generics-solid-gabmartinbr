import { Cardio } from "./Cardio";
import { Strength } from "./Strength";

export type typeTraining = Cardio | Strength

/**
 * clase generica de almacenamiento de entrenamientos
 */
export class TrainingLog<T> {
    public logStorage: T[]
    /**
     * constructor que inicializa el almacenamiento vacio
     */
    constructor() {this.logStorage = []}

    /**
     * metodo que añade al almacenamiento y un entreno nuevo
     * @param train - entreno a añadir al almacenamiento
     */
    add(train: T): void {
        this.logStorage.push(train)
    }

    /**
     * metodo que elimina del almacenamiento un entreno 
     * @param index - indice de entreno a eliminar del almacenamiento
     */
    remove(index: number): void {
        this.logStorage.splice(index, 1)
    }

    /**
     * metodo para obtener un entreno por su indice
     * @param index - indice del entreno a obtener
     * @returns entreno en la posicion indice
     */
    get(index: number): T {
        return this.logStorage[index]
    }

    /**
     * 
     * @returns tamaño del almacen/numero de entrenos almacenados
     */
    size(): number {
        return this.logStorage.length
    }

    /**
     * metodo que filtra los entrenos mediante un predicado
     * @param predicado condicion que se debe cumplir al buscar en los entrenos
     * @returns un almacen nuevo con los entrenos que cumplen dicha condicion
     */
    filter(predicado: (item: T) => boolean): TrainingLog<T> {
    const result = new TrainingLog<T>();
    // Filtramos el array y añadimos los que cumplen al nuevo TrainingLog
    this.logStorage.filter(predicado).forEach(item => result.add(item));
    return result;
    }

    /**
     * metodo que devuelve el numero total de calorias quemadas
     * @returns number total de calorias
     */
    totalBurn(): number {
    return this.logStorage.reduce((acc, train) => acc + train.burnedCalories, 0);
    }
}
