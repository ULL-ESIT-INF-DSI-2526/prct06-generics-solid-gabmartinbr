import { describe, it, expect } from "vitest";
import { ActivityType, Cardio } from "../../src/pe/Cardio";

describe("Clase Cardio", () => {
    const cardio1 = new Cardio("correr por la mañana", ActivityType.carrera, 2, 5, 2500)
    it("Getters", () => {
        expect(cardio1.activityName).toBe("correr por la mañana")
        expect(cardio1.activityType).toBe("carrera")
        expect(cardio1.duration).toBe(2)
        expect(cardio1.distance).toBe(5)
        
    })

    it("Summary y calories", () => {
            expect(cardio1.summary()).toBe("correr por la mañana, distancia: 5 km")
            expect(cardio1.calories()).toBe(2500)
        })
    
});