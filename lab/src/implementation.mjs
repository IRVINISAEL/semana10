export function validateDraft(raw, inspection) {
 const bad=()=>{throw new Error('INVALID_SHAPE');};
 if(!raw||typeof raw!=='object'||typeof raw.resumen!=='string'||!Array.isArray(raw.hallazgos)||!Array.isArray(raw.datosFaltantes))bad();
 if(!raw.datosFaltantes.every(x=>typeof x==='string'))bad();
 for(const h of raw.hallazgos){
  if(!h||typeof h!=='object'||typeof h.observacionId!=='string'||typeof h.cita!=='string')bad();
  if(h.cita.trim()==='')throw new Error('EMPTY_QUOTE');
  const obs=inspection.observaciones.find(o=>o.id===h.observacionId);
  if(!obs)throw new Error('UNKNOWN_OBSERVATION');
  if(!obs.texto.includes(h.cita))throw new Error('UNSUPPORTED_QUOTE');
 }
 return structuredClone(raw);
}

export async function generateDraft(store,id,provider) {
 const snapshot=store.beginRequest(id);
 const guard={expectedRevision:snapshot.revision,requestId:snapshot.requestId};
 try {
  const payload=validateDraft(await provider.generate(snapshot),snapshot);
  const ok=store.commitDraft(id,{...guard,draft:{payload,sourceRevision:snapshot.revision,requestId:snapshot.requestId}});
  return ok?{ok:true}:{ok:false,error:'STALE_RESPONSE'};
 }catch(error){
  store.failIfCurrent(id,guard);
  return {ok:false,error:error.message};
 }
}

export function confirmDraft(store,id){return store.confirm(id);}

export function recoverRelease(state,release) {
 if(!release.supportedSchemas.includes(state.schemaVersion))throw new Error('SCHEMA_INCOMPATIBLE');
 if(!state.assetCaches.includes(release.cacheName))throw new Error('ASSETS_MISSING');
 state.serverVersion=release.id;
 state.workerVersion=release.id;
 state.shellVersion=release.id;
 return state;
}