import test from 'node:test';
import assert from 'node:assert/strict';
import {pathToFileURL} from 'node:url';
import {resolve} from 'node:path';
import {createStore} from '../lib/store.mjs';
import {inspection,provider} from '../lib/fixtures.mjs';
const implementation=await import(pathToFileURL(resolve(process.env.LAB_TARGET||'src/implementation.mjs')).href);

// Variante propia (incidente D): proveedor caído después de confirmar un reporte.
test('D-04 variante: si el proveedor cae tras confirmar, se conserva el reporte y se puede seguir a mano',async()=>{
 const s=createStore([inspection()]);
 await implementation.generateDraft(s,'I-10',provider());
 implementation.confirmDraft(s,'I-10');
 const confirmado=s.read('I-10').savedReport;
 assert.ok(confirmado);
 const res=await implementation.generateDraft(s,'I-10',provider('failure'));
 assert.equal(res.ok,false);
 const despues=s.read('I-10');
 assert.deepEqual(despues.savedReport,confirmado);
 assert.equal(despues.manualNotes,'Revisar con personal autorizado');
 assert.equal(despues.aiState,'error');
 s.edit('I-10',{manualNotes:'Nota manual después de la caída'});
 assert.equal(s.read('I-10').manualNotes,'Nota manual después de la caída');
});