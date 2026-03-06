import { describe, it, expect, beforeEach } from "vitest";
import { Holocron, HolocronCollection } from "../src/ej1/HolocronCollection"; // Ajusta la ruta

describe("HolocronCollection - 100% Coverage", () => {
  let holocronCollection: HolocronCollection;

  // Objetos de prueba
  const jediHolocron: Holocron = {
    id: "h-01",
    name: "Great Holocron",
    knowledgeLevel: "high",
    originPlanet: "Coruscant",
    subject: "Jedi Code"
  };

  const sithHolocron: Holocron = {
    id: "h-02",
    name: "Sith Holocron of King Adas",
    knowledgeLevel: "medium",
    originPlanet: "Korriban",
    subject: "Sith Alchemy"
  };

  beforeEach(() => {
    holocronCollection = new HolocronCollection();
  });

  // 1. Probar ADD y GETALL (Heredados de la base)
  it("debería añadir holocrones y obtener la lista completa", () => {
    holocronCollection.add(jediHolocron);
    holocronCollection.add(sithHolocron);
    expect(holocronCollection.getAll()).toHaveLength(2);
    expect(holocronCollection.entities).toContain(jediHolocron);
  });

  // 2. Probar REMOVE (Heredado)
  it("debería eliminar un holocrón por su ID", () => {
    holocronCollection.add(jediHolocron);
    holocronCollection.remove("h-01");
    expect(holocronCollection.getAll()).toHaveLength(0);
  });

  it("no debería afectar a la colección si el ID a eliminar no existe", () => {
    holocronCollection.add(jediHolocron);
    holocronCollection.remove("id-inexistente");
    expect(holocronCollection.getAll()).toHaveLength(1);
  });

  // 3. Probar BÚSQUEDA POR NOMBRE (Heredado)
  it("debería buscar por nombre (case insensitive)", () => {
    holocronCollection.add(sithHolocron);
    const results = holocronCollection.searchByName("KING ADAS");
    expect(results[0].name).toContain("Sith Holocron");
  });

  // 4. Probar BÚSQUEDA POR PLANETA (Abstracto implementado)
  it("debería filtrar por planeta de origen", () => {
    holocronCollection.add(jediHolocron);
    const results = holocronCollection.searchByPlanet("coruscant");
    expect(results).toHaveLength(1);
    expect(results[0].id).toBe("h-01");
  });

  // 5. Probar BÚSQUEDA POR NIVEL (Abstracto implementado - searchByLevel)
  it("debería buscar por nivel de conocimiento (searchByLevel)", () => {
    holocronCollection.add(jediHolocron);
    holocronCollection.add(sithHolocron);
    
    const highLevel = holocronCollection.searchByLevel("high");
    expect(highLevel).toContain(jediHolocron);
    expect(highLevel).not.toContain(sithHolocron);
  });

  it("debería retornar array vacío si se busca un nivel (clase de nave) que no aplica", () => {
    holocronCollection.add(jediHolocron);
    // "caza" es un powerLevel (Classes) válido por tipo, pero no existe en Holocron
    const results = holocronCollection.searchByLevel("caza");
    expect(results).toEqual([]);
  });

  // 6. Probar BÚSQUEDA POR TEMA (Método específico de Holocron)
  it("debería buscar por el tema del holocrón (searchBySubject)", () => {
    holocronCollection.add(sithHolocron);
    const results = holocronCollection.searchBySubject("Alchemy");
    expect(results).toHaveLength(1);
    expect(results[0].subject).toBe("Sith Alchemy");
  });

  it("debería devolver array vacío si no encuentra el tema buscado", () => {
    holocronCollection.add(jediHolocron);
    const results = holocronCollection.searchBySubject("Cooking");
    expect(results).toHaveLength(0);
  });

  // 7. BÚSQUEDA POR ID (Heredado)
  it("debería encontrar un holocrón específico por su ID", () => {
    holocronCollection.add(sithHolocron);
    const result = holocronCollection.searchById("h-02");
    expect(result[0]).toEqual(sithHolocron);
  });
});