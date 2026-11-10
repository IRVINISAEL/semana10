import test from 'node:test';
import {pathToFileURL} from 'node:url';
import {resolve} from 'node:path';
import {scenarios} from './scenarios.mjs';
const path=resolve(process.env.LAB_TARGET||'src/implementation.mjs');
const implementation=await import(pathToFileURL(path).href);
for(const scenario of scenarios)test(scenario.id+' '+scenario.name,()=>scenario.run(implementation));
