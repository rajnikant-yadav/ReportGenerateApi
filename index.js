import fastify from "fastify";
import rout from "./routes/root.js"
const app= fastify()


app.register(rout,{prefix:'/report'})

// Run the server!
app.listen({ port: 3000 }, (err, address) => {
    if (err) throw err
    // Server is now listening on ${address}
    console.log(address)
  })