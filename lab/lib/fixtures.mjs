export function inspection() {
 return {id:'I-10', revision:1, observaciones:[{id:'O-1',texto:'La lámpara parpadea.'},{id:'O-2',texto:'No se revisó la instalación eléctrica.'}], manualNotes:'Revisar con personal autorizado', savedReport:null, pendingSync:true, requestId:0, draft:null, aiState:'idle'};
}
export function validDraft() {
 return {resumen:'Se observó parpadeo de una lámpara; falta revisar la instalación.',hallazgos:[{observacionId:'O-1',cita:'La lámpara parpadea.'}],datosFaltantes:['Resultado de la revisión eléctrica']};
}
export function releaseState() {
 return {serverVersion:'B',workerVersion:'B',shellVersion:'B',schemaVersion:1,assetCaches:['pwa-shell-A','pwa-shell-B','other-app-cache'],records:[inspection()]};
}
export const stableRelease={id:'A',cacheName:'pwa-shell-A',supportedSchemas:[1]};
export function deferred() {
 let resolve,reject;const promise=new Promise((ok,fail)=>{resolve=ok;reject=fail;});return {promise,resolve,reject};
}
export function provider(mode='valid') {
 return {async generate() {
  if(mode==='failure')throw new Error('PROVIDER_UNAVAILABLE');
  if(mode==='invented')return {...validDraft(),hallazgos:[{observacionId:'O-1',cita:'Existe un cortocircuito.'}]};
  return validDraft();
 }};
}
