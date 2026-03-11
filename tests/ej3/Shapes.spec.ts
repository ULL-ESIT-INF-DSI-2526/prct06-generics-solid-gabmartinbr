import { describe, it, expect } from "vitest";
import { Circle, Rectangle, Triangle, AreaCalculator, Shape } from "../../src/ej3/Shapes"; // Ajusta la ruta

describe("Geometric Shapes & AreaCalculator - SOLID tests", () => {
  
  describe("Circle", () => {
    it("debería calcular el área de un círculo correctamente", () => {
      const radius = 5;
      const circle = new Circle(radius);
      // Área = π * r²
      expect(circle.calculateArea()).toBeCloseTo(Math.PI * 25);
    });
  });

  describe("Rectangle", () => {
    it("debería calcular el área de un rectángulo correctamente", () => {
      const rect = new Rectangle(10, 5);
      // Área = base * altura
      expect(rect.calculateArea()).toBe(50);
    });
  });

  describe("Triangle", () => {
    it("debería calcular el área de un triángulo correctamente", () => {
      const tri = new Triangle(10, 5);
      // Área = (base * altura) / 2
      expect(tri.calculateArea()).toBe(25);
    });
  });

  describe("AreaCalculator (OCP Compliance)", () => {
    it("debería sumar las áreas de múltiples figuras diferentes", () => {
      const calculator = new AreaCalculator();
      const shapes: Shape[] = [
        new Circle(2),      // Área ≈ 12.566
        new Rectangle(2, 4), // Área = 8
        new Triangle(3, 4)   // Área = 6
      ];

      const expectedTotal = (Math.PI * 4) + 8 + 6;
      expect(calculator.getTotalArea(shapes)).toBeCloseTo(expectedTotal);
    });

    it("debería devolver 0 si no se pasan figuras", () => {
      const calculator = new AreaCalculator();
      expect(calculator.getTotalArea([])).toBe(0);
    });
  });
});