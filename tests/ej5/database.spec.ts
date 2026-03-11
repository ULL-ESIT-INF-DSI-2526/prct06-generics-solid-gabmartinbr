import { describe, it, expect, vi } from "vitest";
import { UserService, UserRepository } from "../../src/ej5/database";

describe("UserService - DIP Tests", () => {
  it("debería devolver el nombre en mayúsculas usando un Mock", () => {
    // Creamos un mock rápido que cumpla la interfaz
    const mockRepo: UserRepository = {
      findById: vi.fn().mockReturnValue({ id: "1", name: "Ada" })
    };

    const service = new UserService(mockRepo);
    
    expect(service.getUserName("1")).toBe("ADA");
    expect(mockRepo.findById).toHaveBeenCalledWith("1");
  });

  it("debería lanzar un error si el repositorio no encuentra al usuario", () => {
    const mockRepo: UserRepository = {
      findById: vi.fn().mockReturnValue(null)
    };

    const service = new UserService(mockRepo);

    expect(() => service.getUserName("99")).toThrow("User not found");
  });
});