import { Registrable } from "./Registrable"

export interface StrengthExercice {
    name: string
    weight: number
}

export class Strength implements Registrable<StrengthExercice> {
    /**
     * 
     * @param _name - nombre del ejercicio de fuerza
     * @param _weight - peso usado en el ejercicio
     * @param _numSeries - numero de series realizadas
     * @param _numReps - numero de repeticiones realizadas
     * @param _burnedCalories - calorias quemadas total
     */
    constructor(private readonly _name: string,
        private readonly _weight: number,
        private readonly _numSeries: number,
        private readonly _numReps: number,
        private readonly _burnedCalories: number
    ) {}

    
    /**
     * getters del nombre del ejericicio de fuerza
     * @returns string nombre del ejercicio
     */
    get name(): string {
        return this._name
    }

    /**
     * getters del peso del ejericicio de fuerza
     * @returns number peso del ejercicio
     */
    get weight(): number {
        return this._weight
    }

    /**
     * getters del numero de series del ejericicio de fuerza
     * @returns number series del ejercicio
     */
    get numSeries(): number {
        return this._numSeries
    }

    /**
     * getters del numero de repes del ejericicio de fuerza
     * @returns number repeticiones del ejercicio
     */
    get numReps(): number {
        return this._numReps
    }

    /**
     * getters de calorias quemadas del ejericicio de fuerza
     * @returns number calorias quemadas del ejercicio
     */
    get burnedCalories(): number {
        return this._burnedCalories
    }

    /**
    * metodo de resumen del ejercicio de fuerza
    * @returns objeto con resumen nombre y peso
    */
    summary(): StrengthExercice {
        return {name: this._name, weight: this._weight}
    }

    /**
     * metodo que calcula calorias totales del ejercicio
     * @returns number suma de calorias quemadas en total de todas las series
     */
    calories(): number {
        return this._burnedCalories*this._numSeries
    }
}