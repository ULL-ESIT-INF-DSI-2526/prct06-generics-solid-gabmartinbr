import { GalacticRegistry, SearchByName, powerLevels } from "./GalacticRegistry";

export interface GalacticEntity {
  id: string;
  name: string;
}

export abstract class BasicGalacticCollection<T extends GalacticEntity>
  implements GalacticRegistry<T>, SearchByName<T>
{
  protected _entities: T[] = [];

  get entities(): T[] {
    return this._entities;
  }

  add(entity: T): void {
    this._entities.push(entity);
  }

  remove(id: string): void {
    this._entities = this._entities.filter((entity) => entity.id != id);
  }

  getAll(): T[] {
    return this.entities;
  }

  searchByName(name: string): T[] {
    return this._entities.filter((entity) => entity.name.toLowerCase().includes(name.toLowerCase()));
  }

    searchById(id: string): T[] {
    return this._entities.filter((entity) => entity.id.toLowerCase().includes(id.toLowerCase()));
  }

  abstract searchByPlanet(planet: string): T[]
  abstract searchByLevel(level: powerLevels): T[]
}
