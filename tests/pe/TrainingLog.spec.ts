import { describe, it, expect } from "vitest";
import { TrainingLog } from "../../src/pe/TrainingLog";
import { Strength } from "../../src/pe/Strength";
import { ActivityType, Cardio } from "../../src/pe/Cardio";

describe("Clase Strength", () => {
    const log1 = new TrainingLog()
    const fuerza1 = new Strength("deadlift", 100, 3, 8, 1500)
    const cardio1 = new Cardio("correr por la mañana", ActivityType.carrera, 2, 5, 2500)

    // it("metodos", () => {
    //     log1.add(cardio1)
    //     expect(log1.size).toBe(1)
    //     log1.add(fuerza1)
    //     expect(log1.size).toBe(2)
    //     log1.remove(1)
    //     expect(log1.size).toBe(1)
    //     expect(log1.get(0)).toBe(cardio1)
    //     expect(fuerza1.burnedCalories).toBe(1500)
        
    // })

    
});