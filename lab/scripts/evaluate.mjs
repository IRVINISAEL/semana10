import {mkdir,writeFile} from 'node:fs/promises';
import {resolve,dirname} from 'node:path';
import {pathToFileURL} from 'node:url';
import {createHash} from 'node:crypto';
import {readFile} from 'node:fs/promises';
import {scenarios} from '../tests/scenarios.mjs';
const args=process.argv.slice(2);
function option(name,fallback){const i=args.indexOf(name);return i<0?fallback:args[i+1];}
const target=resolve(option('--module',process.env.LAB_TARGET||'src/implementation.mjs'));
const output=resolve(option('--out','evidence/results.json'));
const m=await import(pathToFileURL(target).href);const results=[];
for(const scenario of scenarios){
 try{await scenario.run(m);results.push({id:scenario.id,incident:scenario.incident,name:scenario.name,status:'passed'});}
 catch(error){results.push({id:scenario.id,incident:scenario.incident,name:scenario.name,status:'failed',message:error.message});}
}
const report={generatedAt:new Date().toISOString(),module:target,moduleSha256:createHash('sha256').update(await readFile(target)).digest('hex'),gradingPerformed:false,modelInferencePerformed:false,releaseSimulationOnly:true,results,passed:results.filter(x=>x.status==='passed').length,total:results.length};
await mkdir(dirname(output),{recursive:true});await writeFile(output,JSON.stringify(report,null,2)+'\n');
for(const r of results)console.log(`${r.status==='passed'?'PASS':'FAIL'} ${r.id} ${r.name}`);
console.log(`${report.passed}/${report.total}; reporte: ${output}; sin nota automática`);
process.exitCode=report.passed===report.total?0:1;
