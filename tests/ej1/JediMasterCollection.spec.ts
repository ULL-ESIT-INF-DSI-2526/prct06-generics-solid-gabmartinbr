import { describe, it, expect, beforeEach } from "vitest";
import {
  JediMaster,
  JediMasterCollection,
} from "../../src/ej1/JediMasterCollection";
import { affiliationType } from "../../src/ej1/GalacticRegistry";

describe("JediMasterCollection", () => {
  let collection: JediMasterCollection;

  const ahsoka: JediMaster = {
    id: "id1",
    name: "Ahsoka Tano",
    affiliation: affiliationType.Republic,
    powerLevel: "high",
    originPlanet: "Shili",
    formationYear: 36,
  };
  const yoda: JediMaster = {
    id: "id2",
    name: "Yoda",
    affiliation: affiliationType.Republic,
    powerLevel: "high",
    originPlanet: "Unknown",
    formationYear: -800,
  };
  const maul: JediMaster = {
    id: "id3",
    name: "Darth Maul",
    affiliation: affiliationType.Sith,
    powerLevel: "medium",
    originPlanet: "Dathomir",
    formationYear: 54,
  };

  beforeEach(() => {
    collection = new JediMasterCollection();
  });

  // 1. PROBAR CREATE Y READ (BASE)
  it("debería añadir y obtener todas las entidades (add & getAll)", () => {
    collection.add(ahsoka);
    collection.add(yoda);
    expect(collection.getAll()).toHaveLength(2);
    expect(collection.entities).toHaveLength(2); // Probar el getter 'entities'
  });

  // 2. PROBAR DELETE (BASE)
  it("debería eliminar una entidad por ID (remove)", () => {
    collection.add(ahsoka);
    collection.remove("id1");
    expect(collection.getAll()).toHaveLength(0);
  });

  it("no debería fallar al intentar eliminar un ID inexistente", () => {
    collection.add(ahsoka);
    collection.remove("non-existent");
    expect(collection.getAll()).toHaveLength(1);
  });

  // 3. PROBAR BÚSQUEDA POR ID (BASE)
  it("debería encontrar por ID exacto (searchById)", () => {
    collection.add(ahsoka);
    const result = collection.searchById("id1");
    expect(result[0]).toEqual(ahsoka);
  });

  // 4. PROBAR BÚSQUEDA POR NOMBRE (BASE - Case Insensitive)
  it("debería buscar por nombre parcialmente y sin importar mayúsculas", () => {
    collection.add(ahsoka);
    const result = collection.searchByName("AHSOKA");
    expect(result).toHaveLength(1);
    expect(result[0].name).toBe("Ahsoka Tano");
  });

  // 5. PROBAR BÚSQUEDA POR PLANETA (ABSTRACTO - Case Insensitive)
  it("debería buscar por planeta (searchByPlanet)", () => {
    collection.add(ahsoka);
    const result = collection.searchByPlanet("shili");
    expect(result[0].originPlanet).toBe("Shili");
  });

  // 6. PROBAR BÚSQUEDA POR NIVEL (ABSTRACTO)
  it("debería buscar por nivel de poder (searchByLevel)", () => {
    collection.add(maul);
    const result = collection.searchByLevel("medium");
    expect(result[0].powerLevel).toBe("medium");
  });

  // 7. PROBAR BÚSQUEDA POR AFILIACIÓN (INTERFACE)
  it("debería buscar por bando usando Enums (searchByAffiliation)", () => {
    collection.add(ahsoka);
    collection.add(maul);
    const republic = collection.searchByAffiliation(affiliationType.Republic);
    const sith = collection.searchByAffiliation(affiliationType.Sith);
    expect(republic).toContain(ahsoka);
    expect(sith).toContain(maul);
  });

  // 8. PROBAR BÚSQUEDA POR AÑO (INTERFACE)
  it("debería buscar por año exacto (searchByYear)", () => {
    collection.add(yoda);
    const result = collection.searchByYear(-800);
    expect(result[0].name).toBe("Yoda");
  });

  // 9. PROBAR CASOS VACÍOS (Critical for Coverage)
  it("debería devolver arrays vacíos si no hay coincidencias", () => {
    const resName = collection.searchByName("Vader");
    const resPlanet = collection.searchByPlanet("Tatooine");
    const resYear = collection.searchByYear(2024);

    expect(resName).toEqual([]);
    expect(resPlanet).toEqual([]);
    expect(resYear).toEqual([]);
  });
});
