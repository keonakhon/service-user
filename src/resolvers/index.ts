/* Index Resolver */
// Resolvers
import { fbLogin } from "./user";

const resolvers = {
  hello: () => "Hello world!",
  // Facebook Login
  fbLogin
};

export default resolvers;
