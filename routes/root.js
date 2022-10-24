
import screenshots from "../controller/screenshots.js"
import fs from "fs"
async function routes(fastify,options){
    fastify.get('/',async (request,reply)=>{
        const data= fs.readFileSync('./tets.pdf')
        reply.type('application/pdf').send(data)
    });

    fastify.post('/api/screenshots', async(request,reply)=>{
    const result =await screenshots()
    reply.type('application/pdf').send(result)
    })

}

export default routes