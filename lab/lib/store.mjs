// Modelo de repositorio EN MEMORIA. No sustituye IndexedDB ni transacciones de BD.
export function createStore(initial) {
 const rows=new Map(initial.map(x=>[x.id,structuredClone(x)]));
 const current=id=>{const row=rows.get(id);if(!row)throw new Error('NOT_FOUND');return row;};
 return {
  read(id){return structuredClone(current(id));},
  update(id,patch){Object.assign(current(id),structuredClone(patch));return this.read(id);},
  edit(id,patch){const r=current(id);Object.assign(r,structuredClone(patch));r.revision++;r.draft=null;return this.read(id);},
  beginRequest(id){const r=current(id);r.requestId++;r.aiState='generating';return this.read(id);},
  // Compare-and-swap síncrono solo en este proceso. En producción usar transacción/versionado real.
  commitDraft(id,{expectedRevision,requestId,draft}){
   const r=current(id);if(r.revision!==expectedRevision||r.requestId!==requestId)return false;
   r.draft=structuredClone(draft);r.aiState='ready';return true;
  },
  failIfCurrent(id,{expectedRevision,requestId}){
   const r=current(id);if(r.revision!==expectedRevision||r.requestId!==requestId)return false;
   r.aiState='error';return true;
  },
  confirm(id){
   const r=current(id);if(!r.draft||r.draft.sourceRevision!==r.revision||r.draft.requestId!==r.requestId)throw new Error('STALE_DRAFT');
   r.savedReport=structuredClone(r.draft.payload);r.draft=null;r.aiState='idle';return this.read(id);
  }
 };
}
