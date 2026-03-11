import { Registrable } from "./Registrable"

export enum ActivityType {
    carrera = "carrera",
    ciclismo = "ciclismo",
    natacion = "natacion"
}
export class Cardio implements Registrable<string> {
    /**
     * 
     * @param _activityName - nombre de la actividad
     * @param _activityType - tipo de actividad
     * @param _duration - duracion de la actividad
     * @param _distance - distancia recorrida
     * @param _calories - calorias quemadas
     */
    constructor(private readonly _activityName: string, 
        private readonly _activityType: ActivityType, 
        private readonly _duration: number, 
        private readonly _distance: number, 
        private readonly _calories: number) { }
    
    
    /**
     * getters de los atributos
     */

    get activityName(): string {
        return this._activityName
    }

    get activityType(): string {
        return this._activityType
    }

    get duration(): number {
        return this._duration
    }

    get distance(): number {
        return this._distance
    }
    
    /**
     * metodo de contrato registrable
     * @returns devueve resumen de la actividad
     */
    summary(): string {
        return `${this.activityName}, distancia: ${this._distance} km`
    }

    /**
     * metodo de contrato registrable
     * @returns numero de calorias quemadas
     */
    calories(): number {
        return this._calories
    }
}