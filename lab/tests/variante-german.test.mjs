import test from 'node:test';
import assert from 'node:assert/strict';
import {pathToFileURL} from 'node:url';
import {resolve} from 'node:path';
import {createStore} from '../lib/store.mjs';
import {inspection,provider} from '../lib/fixtures.mjs';
const implementation=await import(pathToFileURL(resolve(process.env.LAB_TARGET||'src/implementation.mjs')).href);

// Variante propia (incidente R): edición después de que la respuesta ya estaba lista.
test('R-04 variante: una edición posterior invalida el borrador listo y no se puede confirmar',async()=>{
 const s=createStore([inspection()]);
 assert.equal((await implementation.generateDraft(s,'I-10',provider())).ok,true);
 assert.ok(s.read('I-10').draft);
 s.edit('I-10',{manualNotes:'Editado después de generar'});
 assert.equal(s.read('I-10').draft,null);
 assert.throws(()=>implementation.confirmDraft(s,'I-10'));
 assert.equal(s.read('I-10').savedReport,null);
 assert.equal(s.read('I-10').manualNotes,'Editado después de generar');
});