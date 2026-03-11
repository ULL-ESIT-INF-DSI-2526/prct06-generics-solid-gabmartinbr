export interface Shape {
  calculateArea(): number
}

export class Circle implements Shape {
  constructor(protected _radius: number) {}

  calculateArea(): number {
    return Math.PI * this._radius * this._radius
  }
}

export class Rectangle implements Shape {
  constructor(protected _height: number, protected _width: number) {}

  calculateArea(): number {
    return this._height * this._width
  }
}

export class Triangle implements Shape {
  constructor(protected _base: number, protected _height: number) {}
  
  calculateArea(): number {
    return (this._base * this._height) / 2
  }
}

export class AreaCalculator {
  getTotalArea(shapes: Shape[]): number {
    return shapes.reduce((acc, shape) => acc + shape.calculateArea(), 0);
  }
}