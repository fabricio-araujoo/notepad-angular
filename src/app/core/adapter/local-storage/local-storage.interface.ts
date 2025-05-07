export interface ILocalStorageService {
  get(key: string): string | null;
  set(key: string, value: unknown): void;
  remove(key: string): void;
}
