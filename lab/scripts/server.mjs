// Servidor HTTP de laboratorio, solo localhost, sin cuentas, claves ni conexión a IA real.
import http from 'node:http';
import {pathToFileURL} from 'node:url';
import {resolve} from 'node:path';
import {createStore} from '../lib/store.mjs';
import {inspection,provider} from '../lib/fixtures.mjs';
export function makeServer(implementation) {
 const store=createStore([inspection()]);
 const server=http.createServer(async(req,res)=>{
  const send=(status,data)=>{res.writeHead(status,{'Content-Type':'application/json','Cache-Control':'no-store'});res.end(JSON.stringify(data));};
  try{
   if(req.method==='GET'&&req.url==='/health')return send(200,{ok:true,version:'B'});
   if(req.method==='GET'&&req.url==='/inspection')return send(200,store.read('I-10'));
   if(req.method==='POST'&&req.url==='/draft'){
    const result=await implementation.generateDraft(store,'I-10',provider());return send(result.ok?200:502,result);
   }
   if(req.method==='POST'&&req.url==='/confirm')return send(200,implementation.confirmDraft(store,'I-10'));
   return send(404,{error:'NOT_FOUND'});
  }catch{return send(500,{error:'LAB_ERROR'});}
 });
 return {server,store};
}
if(process.argv[1]&&import.meta.url===pathToFileURL(resolve(process.argv[1])).href){
 const target=resolve(process.env.LAB_TARGET||'src/implementation.mjs');
 const implementation=await import(pathToFileURL(target).href);
 const {server}=makeServer(implementation);
 server.listen(Number(process.env.PORT||3100),'127.0.0.1',()=>console.log(`LAB http://127.0.0.1:${server.address().port}; Ctrl+C para cerrar`));
}
