import test from 'node:test';
import assert from 'node:assert/strict';
import {once} from 'node:events';
import {resolve} from 'node:path';
import {pathToFileURL} from 'node:url';
import {makeServer} from '../scripts/server.mjs';
const m=await import(pathToFileURL(resolve(process.env.LAB_TARGET||'src/implementation.mjs')).href);
test('HTTP: health y generación con revisión humana y datos conservados',async()=>{
 const {server}=makeServer(m);server.listen(0,'127.0.0.1');await once(server,'listening');
 const base=`http://127.0.0.1:${server.address().port}`;
 try{
  assert.equal((await fetch(base+'/health')).status,200);
  const before=await (await fetch(base+'/inspection')).json();
  const response=await fetch(base+'/draft',{method:'POST'});assert.equal(response.status,200);
  const after=await (await fetch(base+'/inspection')).json();
  assert.deepEqual(after.observaciones,before.observaciones);assert.equal(after.savedReport,null);assert.ok(after.draft);
  assert.equal((await fetch(base+'/confirm',{method:'POST'})).status,200);
  assert.ok((await (await fetch(base+'/inspection')).json()).savedReport);
 }finally{server.closeAllConnections();await new Promise(ok=>server.close(ok));}
});
