// Provide resolver functions for your schema fields
interface FacebookLogin {
  fb_token: { fb_token: string };
}

const resolvers = {
  hello: () => "Hello world!",
  fbLogin: ({ fb_token }: FacebookLogin): object => {
    return { refresh_token: fb_token };
  }
};

export default resolvers;
