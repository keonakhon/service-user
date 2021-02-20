// graphql context
const createContext = async ({ req }: any) => {
  const token = req?.headers?.authorization || "";
  const ip_server = req?.req?.ip || null;

  return { token };
};

export default createContext;
