// 1. Segregación de Interfaces (ISP)
export interface Printer {
  print(doc: string): void;
}

export interface Scanner {
  scan(doc: string): string;
}

export interface FaxMachine {
  fax(doc: string): void;
}

// 2. Implementaciones específicas
// La impresora básica solo implementa lo que realmente hace
export class BasicPrinter implements Printer {
  print(doc: string): void {
    console.log("Printing:", doc);
  }
}

// Una máquina multifunción podría implementar varias
export class MultiFunctionMachine implements Printer, Scanner, FaxMachine {
  print(doc: string): void { console.log("Printing:", doc); }
  scan(doc: string): string { return `Scanned: ${doc}`; }
  fax(doc: string): void { console.log("Faxing:", doc); }
}

// 3. Cliente con Inversión de Dependencias y Liskov correcto
// Ahora la función solo pide lo MÍNIMO que necesita: alguien que sepa faxear
function sendFax(device: FaxMachine, doc: string) {
  device.fax(doc);
}