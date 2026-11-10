# Laboratorio de fallos · semana 10

Material formativo para la misma actividad semanal; no es otro proyecto ni otra nota. Requiere Node 22 o superior. Sin dependencias npm, cuentas, red externa o claves. No hace falta npm install; el evaluador usa APIs de Node.

Desde esta carpeta:

```sh
node --version
node scripts/evaluate.mjs --out evidence/before.json
```

El comando inicialmente termina con código 1: los defectos son intencionales. Conserve before.json. Lea ../PRACTICA.md, modifique src/implementation.mjs y ejecute:

```sh
node scripts/evaluate.mjs --out evidence/after.json
node --test tests/*.test.mjs
```

La segunda orden incluye un smoke HTTP real en un puerto efímero de localhost. No exige navegador. Para inspeccionar HTTP manualmente ejecute `node scripts/server.mjs` y, en otra terminal, `curl http://127.0.0.1:3100/health`, `curl -X POST http://127.0.0.1:3100/draft` y `curl http://127.0.0.1:3100/inspection`. Ctrl+C cierra el servidor; sus datos de memoria se pierden. No use ese Map como almacenamiento de producción.

src/implementation.mjs contiene contratos, generación/confirmación y recuperación defectuosos. lib/store.mjs proporciona primitivas de repositorio para practicar revisión y requestId. El proveedor devuelve datos sintéticos fijos; no genera texto real. Los casos R-* controlan el orden mediante promesas diferidas; no esperan milisegundos arbitrarios.

La recuperación L-* modela servidor, worker, shell, assets y registros como un objeto. No registra un service worker ni prueba IndexedDB. Complete la comprobación de navegador de PRACTICA.md en su PWA antes de afirmar que la recuperación funciona allí.

El formato de hallazgos del ejemplo usa observacionId/cita para demostrar trazabilidad. Es un contrato pedagógico acotado y no obliga a cambiar el esquema de su PWA. No comprueba la verdad del mundo ni garantiza fidelidad del resumen libre: este requiere revisión humana.

Los informes incluyen hash del módulo y resultados por escenario, sin convertirlos a una nota. La calificación de actividad 10 conserva su rúbrica existente; superar este laboratorio no demuestra por sí solo deploy, instalación PWA o rollback real.
