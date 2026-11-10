import test from 'node:test';
import {pathToFileURL} from 'node:url';
import {resolve} from 'node:path';
import {scenarios} from './scenarios.mjs';
const path=resolve(process.env.LAB_TARGET||'src/implementation.mjs');
const implementation=await import(pathToFileURL(path).href);
for(const scenario of scenarios)test(scenario.id+' '+scenario.name,()=>scenario.run(implementation));

// Variante propia (incidente C): usar otra observación y una cita vacía.
import assert from 'node:assert/strict';
import {inspection,validDraft} from '../lib/fixtures.mjs';
test('C-04 variante: acepta cita de O-2, rechaza cita de O-1 atribuida a O-2 y cita vacía',()=>{
 const ok=validDraft();
 ok.hallazgos=[{observacionId:'O-2',cita:'No se revisó la instalación eléctrica.'}];
 assert.deepEqual(implementation.validateDraft(ok,inspection()),ok);
 const cruzada=validDraft();
 cruzada.hallazgos=[{observacionId:'O-2',cita:'La lámpara parpadea.'}];
 assert.throws(()=>implementation.validateDraft(cruzada,inspection()));
 const vacia=validDraft();
 vacia.hallazgos=[{observacionId:'O-1',cita:''}];
 assert.throws(()=>implementation.validateDraft(vacia,inspection()));
});
