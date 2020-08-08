// Provide resolver functions for your schema fields
interface FacebookLogin {
  status: { status: string };
}

const resolvers = {
  hello: () => "Hello world!",
  fbLogin: ({ status }: FacebookLogin): object => {
    return { status };
  }
};

export default resolvers;
