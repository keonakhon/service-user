// graphql context
const createContext = async ({ req }: any) => {
  const token = req?.headers?.authorization || "";

  return { token };
};

export default createContext;
