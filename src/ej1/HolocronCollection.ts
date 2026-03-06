import {
  BasicGalacticCollection,
  GalacticEntity,
} from "./BasicGalacticCollection";
import { Levels, powerLevels } from "./GalacticRegistry";

export interface Holocron extends GalacticEntity {
  knowledgeLevel: Levels;
  originPlanet: string;
  subject: string;
}

export class HolocronCollection extends BasicGalacticCollection<Holocron> {
  constructor() {
    super();
  }

  // metodos obligatorios de basic galactic
  searchByPlanet(planet: string): Holocron[] {
    return this._entities.filter(
      (h) => h.originPlanet.toLowerCase() === planet.toLowerCase(),
    );
  }

  searchByLevel(level: powerLevels): Holocron[] {
    return this._entities.filter((h) => h.knowledgeLevel === level);
  }

  // metodos especificos
  searchBySubject(subject: string): Holocron[] {
    return this._entities.filter((h) =>
      h.subject.toLowerCase().includes(subject.toLowerCase()),
    );
  }
}
