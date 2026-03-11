import { Chef, Paso, Receta, SearchByFollowers, SearchByName, SearchByOptionality, SearchByTags, SearchByYearRange, TableRenderer, timeRange } from "./Receta";

// contrato de almacenamiento
export interface Repository<T, K> {
  add(item: T): void;
  remove(id: K): void;
  getById(id: K): T | undefined;
  getAll(): T[];
}



// clase base de repositorio
export abstract class BaseRepository<T extends { id: string }> implements Repository<T, string> {
  protected _items: T[] = []
  add(item: T): void { this._items.push(item) }
  remove(id: string): void { this._items = this._items.filter(i => i.id !== id) }
  getById(id: string): T | undefined { return this._items.find(i => i.id === id); }
  getAll(): T[] { return this._items; }
}

// clase repo chef que añade funcionalidad a base repository e implementa el contrato busqueda por nombre y seguidores
export class ChefRepository extends BaseRepository<Chef> implements SearchByName<Chef>, SearchByFollowers<Chef> {
  // metodos obligatorios del implements
  searchByMinFollowers(min: number): Chef[] {
    return this._items.filter(c => c.seguidores >= min)
  }

  searchByName(name: string): Chef[] {
    return this._items.filter(c => c.nombre.toLowerCase().includes(name.toLowerCase()))
  }
}

// clase repo receta que añade funcionalidad a base repository e implementa contrato busqueda por nombre y año
export class RecetaRepository extends BaseRepository<Receta> implements SearchByName<Receta>, SearchByYearRange<Receta> {
  searchByName(name: string): Receta[] {
    return this._items.filter(r => r.nombre.toLowerCase().includes(name.toLowerCase()));
  }
  searchByYearRange(start: number, end: number): Receta[] {
    return this._items.filter(r => r.añoCreacion >= start && r.añoCreacion <= end);
  }
}

// Búsqueda de pasos (se inyecta el array de pasos de una receta)
export class StepSearcher implements SearchByName<Paso>, SearchByTags<Paso>, SearchByOptionality<Paso> {
  constructor(private pasos: Paso[]) {}
  searchByName(name: string): Paso[] {
    return this.pasos.filter(p => p.nombre.toLowerCase().includes(name.toLowerCase()));
  }
  searchByTags(tags: string[]): Paso[] {
    return this.pasos.filter(p => p.etiquetas.some(t => tags.includes(t)));
  }
  searchByOptionality(isOptional: boolean): Paso[] {
    return this.pasos.filter(p => p.esOpcional === isOptional);
  }
}

export class RecipeTimeEstimator {
  countSteps(recipe: Receta): number {
    return recipe.pasos.length;
  }

  estimateTime(recipe: Receta): number | timeRange {
    let min = 0;
    let max = 0;
    const hasOptionals = recipe.pasos.some(p => p.esOpcional);

    recipe.pasos.forEach(p => {
      max += p.tiempoEstimado;
      if (!p.esOpcional) min += p.tiempoEstimado;
    });

    return hasOptionals ? [min, max] : max;
  }
}

// Implementación concreta de la presentación
export class ConsoleTableRenderer<T> implements TableRenderer<T> {
  render(data: T[]): void {
    if (data.length === 0) {
      console.log("No se encontraron resultados para mostrar.");
    } else {
      console.table(data);
    }
  }
}

/*
 * // 1. Instanciar repositorios y servicios
const chefRepo = new ChefRepository();
const presenter = new ConsoleTableRenderer<any>();
const estimator = new RecipeTimeEstimator();

// 2. Crear datos
const receta1: Receta = {
  id: "r1",
  nombre: "Tortilla de Patatas",
  añoCreacion: 2020,
  pasos: [
    { nombre: "Cortar patatas", descripcion: "...", tiempoEstimado: 10, esOpcional: false, etiquetas: ["preparacion"] },
    { nombre: "Echar cebolla", descripcion: "...", tiempoEstimado: 5, esOpcional: true, etiquetas: ["sabor"] }
  ]
};

const chef1: Chef = {
  id: "c1",
  nombre: "Karlitos Arguiñano",
  seguidores: 500000,
  recetario: [receta1]
};

chefRepo.add(chef1);

// 3. Buscar y Presentar
console.log("--- CHEFS CON MÁS DE 100K SEGUIDORES ---");
const famosos = chefRepo.searchByMinFollowers(100000);
presenter.render(famosos);

// 4. Calcular tiempos
const tiempo = estimator.estimateTime(receta1);
console.log(`Tiempo estimado para ${receta1.nombre}:`, tiempo);
 */