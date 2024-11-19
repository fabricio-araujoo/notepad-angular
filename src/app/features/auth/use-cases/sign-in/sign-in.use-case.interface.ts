export type ISignInUseCaseInput = {
  email: string;
  password: string;
};

export type ISignInUseCaseOutput = {
  error?: string;
};
