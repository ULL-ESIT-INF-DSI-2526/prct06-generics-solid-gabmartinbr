import { describe, it, expect } from "vitest";
import { Strength } from "../../src/pe/Strength";

describe("Clase Strength", () => {
    const fuerza1 = new Strength("deadlift", 100, 3, 8, 1500)
    it("Getters", () => {
        expect(fuerza1.name).toBe("deadlift")
        expect(fuerza1.weight).toBe(100)
        expect(fuerza1.numSeries).toBe(3)
        expect(fuerza1.numReps).toBe(8)
        expect(fuerza1.burnedCalories).toBe(1500)
        
    })

    it("Summary y calories", () => {
            expect(fuerza1.summary()).toMatchObject({name:"deadlift", weight: 100})
            expect(fuerza1.calories()).toBe(4500)
        })
    
});