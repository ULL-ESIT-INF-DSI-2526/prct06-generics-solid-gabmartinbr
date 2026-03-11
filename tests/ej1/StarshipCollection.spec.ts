import { describe, it, expect, beforeEach } from "vitest";
import { Starship, StarshipCollection } from "../../src/ej1/StarshipCollection"; // Ajusta la ruta
import { affiliationType } from "../../src/ej1/GalacticRegistry";

describe("StarshipCollection - 100% Coverage", () => {
  let shipCollection: StarshipCollection;

  // Objetos de prueba
  const xWing: Starship = {
    id: "x-01",
    name: "X-Wing",
    affiliation: affiliationType.Republic,
    shipClass: "caza",
    originPlanet: "Incom",
    constructionYear: 35
  };

  const falcon: Starship = {
    id: "f-01",
    name: "Millennium Falcon",
    affiliation: affiliationType.Independent,
    shipClass: "carguero",
    originPlanet: "Corellia",
    constructionYear: 60
  };

  const starDestroyer: Starship = {
    id: "d-01",
    name: "Imperial Star Destroyer",
    affiliation: affiliationType.Imperio,
    shipClass: "destructor",
    originPlanet: "Kuat",
    constructionYear: 10
  };

  beforeEach(() => {
    shipCollection = new StarshipCollection();
  });

  // 1. Probar ADD y GETALL (Heredados)
  it("debería añadir naves y obtener la lista completa", () => {
    shipCollection.add(xWing);
    shipCollection.add(falcon);
    expect(shipCollection.getAll()).toHaveLength(2);
    expect(shipCollection.entities).toContain(xWing); // Probar el getter 'entities'
  });

  // 2. Probar REMOVE (Heredado)
  it("debería eliminar una nave por su ID", () => {
    shipCollection.add(xWing);
    shipCollection.remove("x-01");
    expect(shipCollection.getAll()).toHaveLength(0);
  });

  it("no debería hacer nada si se intenta borrar un ID inexistente", () => {
    shipCollection.add(xWing);
    shipCollection.remove("id-falso");
    expect(shipCollection.getAll()).toHaveLength(1);
  });

  // 3. Probar BÚSQUEDA POR NOMBRE (Heredado)
  it("debería buscar por nombre (case insensitive)", () => {
    shipCollection.add(xWing);
    const results = shipCollection.searchByName("wing");
    expect(results[0].name).toBe("X-Wing");
  });

  // 4. Probar BÚSQUEDA POR PLANETA (Abstracto)
  it("debería buscar por planeta de origen ignorando mayúsculas", () => {
    shipCollection.add(falcon);
    const results = shipCollection.searchByPlanet("CORELLIA");
    expect(results).toHaveLength(1);
    expect(results[0].id).toBe("f-01");
  });

  // 5. Probar BÚSQUEDA POR CLASE (Abstracto - searchByLevel)
  it("debería buscar por clase de nave (searchByLevel)", () => {
    shipCollection.add(xWing);
    shipCollection.add(starDestroyer);
    const cazas = shipCollection.searchByLevel("caza");
    const destructores = shipCollection.searchByLevel("destructor");
    
    expect(cazas).toContain(xWing);
    expect(destructores).toContain(starDestroyer);
  });

  it("debería devolver array vacío si el nivel es válido pero no hay naves de esa clase", () => {
    shipCollection.add(xWing);
    // "high" es un powerLevel válido por tipo, pero no existe como shipClass en este objeto
    const results = shipCollection.searchByLevel("carguero"); 
    expect(results).toEqual([]);
  });

  // 6. Probar BÚSQUEDA POR AFILIACIÓN (Interfaz)
  it("debería filtrar naves por afiliación usando el Enum", () => {
    shipCollection.add(xWing);
    shipCollection.add(starDestroyer);
    const empireShips = shipCollection.searchByAffiliation(affiliationType.Imperio);
    expect(empireShips).toHaveLength(1);
    expect(empireShips[0].name).toBe("Imperial Star Destroyer");
  });

  // 7. Probar BÚSQUEDA POR AÑO (Interfaz)
  it("debería buscar naves por su año de construcción", () => {
    shipCollection.add(falcon);
    const results = shipCollection.searchByYear(60);
    expect(results[0].id).toBe("f-01");
  });

  // 8. BÚSQUEDA POR ID (Heredado)
  it("debería encontrar una nave específica por su ID", () => {
    shipCollection.add(xWing);
    const result = shipCollection.searchById("x-01");
    expect(result[0]).toEqual(xWing);
  });
});