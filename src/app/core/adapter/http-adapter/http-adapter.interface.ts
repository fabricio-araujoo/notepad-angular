type IDefault = {
  url: string;
  config?: Record<string, unknown>;
};

export type IHttpServiceGet = IDefault & {
  queryParams?: Record<string, unknown>;
};

export type IHttpServicePost = IDefault & {
  body?: Record<string, unknown>;
};
