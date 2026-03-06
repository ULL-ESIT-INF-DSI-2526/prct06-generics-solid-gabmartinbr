import { BasicGalacticCollection, GalacticEntity } from "./BasicGalacticCollection";
import { affiliationType, Classes, SearchByAffiliation, SearchByYear } from "./GalacticRegistry";

export interface Starship extends GalacticEntity{
  affiliation: affiliationType,
  shipClass: Classes,
  originPlanet: string
  constructionYear: number
}

export class StarshipCollection 
  extends BasicGalacticCollection<Starship> 
  implements SearchByAffiliation<Starship>, SearchByYear<Starship> {
    constructor() { super() }

    // metodos obligatorios de basicgalactic
    searchByPlanet(planet: string): Starship[] {
      return this._entities.filter(ship => ship.originPlanet.toLowerCase() === planet.toLowerCase()
      )
    }

    searchByLevel(level: Classes): Starship[] {
      return this._entities.filter(ship => ship.shipClass === level)
    }

    // metodos especificos de starship
    searchByAffiliation(affiliation: affiliationType): Starship[] {
      return this._entities.filter(ship => ship.affiliation === affiliation)
    }

    searchByYear(year: number): Starship[] {
      return this._entities.filter(ship => ship.constructionYear === year)
    }

  }
