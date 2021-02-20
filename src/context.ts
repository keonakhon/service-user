// graphql context
const createContext = async ({ req }: any) => {
  const token = req?.headers?.authorization || "";
  const ip_address = req?.req?.ip || null;

  return { token };
};

export default createContext;
