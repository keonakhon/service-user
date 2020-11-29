import app from "./app";

const server = app;
server.listen().then(() => {
  console.log(`
    Server is running!
    Listening on port 4000
    Query at https://studio.apollographql.com/dev
  `);
});
