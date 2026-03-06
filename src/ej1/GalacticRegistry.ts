export enum affiliationType {
  Republic = "Republic",
  Imperio = "Imperio",
  Sith = "Sith",
  Independent = "Independent"
}

export type Levels = "low" | "medium" | "high"
export type Classes = "caza" | "carguero" | "destructor"
export type powerLevels = Levels | Classes

export interface GalacticRegistry<T> {
  entities: T[]
  add(entity: T): void
  remove(id: string): void
  getAll(): T[]
}

export interface SearchByName<T> {
  searchByName(name: string): T[]
}

export interface SearchByAffiliation<T> {
  searchByAffiliation(affiliation: affiliationType): T[]
}

export interface SearchByLevel<T> {
  searchByLevel(level: powerLevels): T[]
}

export interface SearchByYear<T> {
  searchByYear(year: number): T[]
}

export interface SearchByPlanet<T> {
  searchByPlanet(planet: string): T[]
}