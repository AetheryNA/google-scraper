export abstract class IGenericRepository<entity> {
  abstract getAll(): Promise<entity[]>;

  abstract get(id: string): Promise<entity>;

  abstract create(item: entity): Promise<entity>;

  abstract update(id: string, item: entity): Promise<entity>;
}
