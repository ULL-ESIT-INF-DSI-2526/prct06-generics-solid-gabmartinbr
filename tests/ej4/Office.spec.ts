import { describe, it, expect, vi } from "vitest";
import { BasicPrinter, MultiFunctionMachine, FaxMachine } from "../../src/ej4/Office"; // Ajusta la ruta

describe("Office Machines - SOLID tests sin 'any'", () => {
  
  describe("BasicPrinter", () => {
    it("debería imprimir correctamente", () => {
      const consoleSpy = vi.spyOn(console, "log");
      const printer = new BasicPrinter();
      
      printer.print("Documento de prueba");
      
      expect(consoleSpy).toHaveBeenCalledWith("Printing:", "Documento de prueba");
      consoleSpy.mockRestore();
    });

    it("no debería tener los métodos de Scanner o FaxMachine", () => {
      const printer = new BasicPrinter();
      
      // Usamos el operador 'in' que es Type-Safe en TS para comprobar propiedades
      expect("scan" in printer).toBe(false);
      expect("fax" in printer).toBe(false);
    });
  });

  describe("MultiFunctionMachine", () => {
    it("debería cumplir con todos los contratos (Printer, Scanner, Fax)", () => {
      const mfm = new MultiFunctionMachine();
      const consoleSpy = vi.spyOn(console, "log");

      mfm.print("Texto");
      expect(mfm.scan("Foto")).toBe("Scanned: Foto");
      mfm.fax("Reporte");

      expect(consoleSpy).toHaveBeenCalledWith("Faxing:", "Reporte");
      consoleSpy.mockRestore();
    });
  });

  describe("Segregación de Interfaces (ISP)", () => {
    // Definimos una función que requiere estrictamente un Fax
    const enviarFaxSeguro = (dispositivo: FaxMachine, doc: string) => {
      dispositivo.fax(doc);
    };

    it("debería permitir que una MultiFunctionMachine actúe como FaxMachine", () => {
      const mfm = new MultiFunctionMachine();
      const consoleSpy = vi.spyOn(console, "log");

      enviarFaxSeguro(mfm, "Fax importante");

      expect(consoleSpy).toHaveBeenCalledWith("Faxing:", "Fax importante");
      consoleSpy.mockRestore();
    });

    /**
     * PRUEBA DE COMPILACIÓN (LSP/ISP):
     * Si intentaras hacer: 
     * enviarFaxSeguro(new BasicPrinter(), "doc");
     * * TypeScript daría error: "Argument of type 'BasicPrinter' is not 
     * assignable to parameter of type 'FaxMachine'."
     * * Esto demuestra que el diseño es robusto a nivel de tipos.
     */
  });
});