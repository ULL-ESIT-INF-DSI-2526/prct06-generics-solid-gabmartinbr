// contrato de bbdd user repo
export interface UserRepository {
  findById(id: string): { id: string; name: string } | null;
}

// clase concreta que implementa findbyid de contrato user repo
export class MySqlUserRepository implements UserRepository {
  findById(id: string): { id: string; name: string } | null {
    console.log("Querying MySQL...");
    return { id, name: "Ada" };
  }
}

// clase servicio que depende de la abstraccion
export class UserService {
  // se inyecta dependencia por constructor
  constructor(private repo: UserRepository) {}

  getUserName(id: string): string {
    const user = this.repo.findById(id);
    if (!user) throw new Error("User not found");
    return user.name.toUpperCase();
  }
}
