// Provide resolver functions for your schema fields
interface FacebookLogin {
  status: string;
  authResponse: {
    accessToken: String;
    expiresIn: String;
    signedRequest: String;
    userID: String;
  };
}

const resolvers = {
  hello: () => "Hello world!",
  fbLogin: ({ status, authResponse }: FacebookLogin): object => {
    return { status };
  }
};

export default resolvers;
