export type timeRange = [tMin: number, tMax: number]

export interface Paso {
  nombre: string
  descripcion: string
  tiempoEstimado: number
  esOpcional: boolean
  etiquetas: string[]
}

// extensiones de paso 
export interface PasoConTemperatura extends Paso {
  temperaturaObjetivo: number;
}

export interface PasoConHerramienta extends Paso {
  herramientaNecesaria: string;
}

// contrato de receta
export interface Receta {
  id: string
  nombre: string
  añoCreacion: number
  pasos: Paso[]
}

// contrato de chef
export interface Chef {
  id: string
  nombre: string
  seguidores: number
  recetario: Receta[]
}

// renderizar tabla
export interface TableRenderer<T> {
  render(data: T[]): void
}

// interfaces de busqueda segregadas
export interface SearchByName<T> {
  searchByName(name: string): T[];
}
export interface SearchByTags<T> {
  searchByTags(tags: string[]): T[];
}
export interface SearchByYearRange<T> {
  searchByYearRange(start: number, end: number): T[];
}
export interface SearchByFollowers<T> {
  searchByMinFollowers(min: number): T[];
}
export interface SearchByOptionality<T> {
  searchByOptionality(isOptional: boolean): T[];
}

