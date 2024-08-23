type Default = {
  url: string;
  config?: Record<string, unknown>;
};

export type HttpServiceGet = Default & {
  queryParams?: Record<string, unknown>;
};

export type HttpServicePost = Default & {
  body: Record<string, unknown>;
};
