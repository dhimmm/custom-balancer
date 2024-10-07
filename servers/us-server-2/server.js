const fastify = require("fastify")({ logger: true });
const dotenv = require("dotenv");
dotenv.config();

fastify.get("/", async () => {
  return { server: `${process.env.SERVER_NAME} Server` };
});

fastify.listen({ port: 3000, host: "0.0.0.0" }, () => {
  console.log(`${process.env.SERVER_NAME} Server is running on port 3000`);
});
