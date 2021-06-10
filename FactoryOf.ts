type FactoryOf<Type, WithArgs extends any[] = []> =
  | Type
  | ((...args: WithArgs) => Type);
