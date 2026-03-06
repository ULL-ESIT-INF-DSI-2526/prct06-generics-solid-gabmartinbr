import {
  BasicGalacticCollection,
  GalacticEntity,
} from "./BasicGalacticCollection";
import {
  affiliationType,
  Levels,
  powerLevels,
  SearchByAffiliation,
  SearchByYear,
} from "./GalacticRegistry";

export interface JediMaster extends GalacticEntity {
  affiliation: affiliationType;
  powerLevel: Levels;
  originPlanet: string;
  formationYear: number;
}

export class JediMasterCollection
  extends BasicGalacticCollection<JediMaster>
  implements SearchByAffiliation<JediMaster>, SearchByYear<JediMaster>
{
  constructor() {
    super();
  }
  // metodos abstractos
  searchByPlanet(planet: string): JediMaster[] {
    return this._entities.filter(
      (jedi) => jedi.originPlanet.toLowerCase() === planet.toLowerCase(),
    );
  }
  searchByLevel(level: powerLevels): JediMaster[] {
    return this._entities.filter((jedi) => jedi.powerLevel === level);
  }

  // metodos de interfaces para jedi
  searchByAffiliation(aff: affiliationType): JediMaster[] {
    return this._entities.filter((jedi) => jedi.affiliation === aff);
  }

  searchByYear(year: number): JediMaster[] {
    return this._entities.filter((jedi) => jedi.formationYear == year);
  }
}

/*
 * const nuevoJedi: JediMaster = {
  id: "abc",
  name: "Ahsoka Tano",
  affiliation: "Independent",
  powerLevel: "high",
  originPlanet: "Shili",
  formationYear: 36
};

academia.add(nuevoJedi);
 */