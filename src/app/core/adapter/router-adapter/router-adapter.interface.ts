export interface IRouterAdapter {
  getCurrentRoute(): string;
  navigate(url: string): void;
}
