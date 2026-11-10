# Práctica de clase · La demo funciona, pero no se puede liberar

**Semana 10 · Ingeniería · 65 minutos de laboratorio dentro de la clase de 3 horas.** Equipos vigentes y excepciones autorizadas. Material formativo integrado en la actividad 10 de 8 puntos; no agrega puntos, fecha de entrega o proyecto nuevo. El quiz semanal existente sigue siendo individual, de 3 puntos.

## Escenario y objetivo

Una PWA de inspecciones incorpora generación de borradores. La integración devuelve un resultado y health responde 200, pero el equipo de operación reporta contenido no sustentado, respuestas antiguas, pérdida de notas y recuperación incompleta. Deben demostrar cada defecto, corregirlo y establecer qué evidencia permite afirmar que la corrección funciona.

Primaria C07; se ejercitan C09/C12/C13/C14/C15. La dificultad está en contratos, fallos, consistencia y operación, no en escribir un prompt más largo. No se asume dominio de offline o sincronización por haberlos entregado antes.

## Preparación y alcance

Necesitan Node >=22. Desde lab/ ejecuten `node --version`; si usan nvm, `nvm use 22`. No necesitan npm install, cuentas de pago, claves ni internet. Conserven los mismos equipos y el repositorio de la PWA; este sandbox permite practicar invariantes y no reemplaza el producto. Si lo copian al repositorio, usen una carpeta auxiliar y ajusten working-directory del workflow.

Los datos y las respuestas son sintéticos. La recuperación de versiones se modela con un objeto en memoria, no con un navegador. El smoke HTTP sí levanta y prueba un servidor local real. Ni uno ni otro acredita automáticamente actualización de una PWA publicada.

## Contrato de trabajo

Modifiquen src/implementation.mjs. No borren escenarios, debiliten aserciones ni ajusten las respuestas fijas del proveedor para ocultar defectos. Pueden agregar pruebas de una variante relevante. Lean lib/store.mjs para entender las primitivas disponibles; no asuman que un Map de memoria es una transacción distribuida.

Invariantes que deben conservar:

1. Un hallazgo del ejemplo tiene referencia a una observación existente y una cita literal no vacía de su texto. Se validan también estructura/tipos. Esto no demuestra verdad de todo resumen libre; la revisión humana sigue siendo necesaria.
2. Generar no sustituye observaciones, notas manuales o un reporte confirmado; solo crea un borrador. Guardar requiere confirmación separada.
3. Una respuesta corresponde a una revisión de entrada y una solicitud vigente. Una edición o solicitud nueva puede volver obsoleta a la anterior. Un error antiguo tampoco debe modificar el estado de una solicitud nueva.
4. Recuperar requiere assets disponibles y compatibilidad de esquema; conserva datos pendientes. No basta cambiar serverVersion mientras worker/shell siguen en una versión no verificada.

El esquema observacionId/cita es un ejemplo pedagógico; no añade una migración obligatoria a la PWA del equipo. El caso de concurrencia es práctica formativa de un problema que se profundiza en semana 12; no cambia la rúbrica semanal publicada.

## Paso 1 · Reproducir y predecir (10 minutos)

Desde lab/:

```sh
node scripts/evaluate.mjs --out evidence/before.json
```

Se espera salida con fallos y código 1. Guarden el reporte original; no lo editen para cambiar resultados. El evaluador registra hash del módulo y resultados, no una calificación.

Antes de cambiar código, cada integrante elige un incidente y escribe: hipótesis, invariante violada y qué resultado espera después de corregir. Repartan diagnóstico, implementación y verificación; roten una responsabilidad durante la sesión. Equipos de dos/cuatro redistribuyen los mismos casos.

## Paso 2 · Detectar y corregir (50 minutos)

| Incidente | Cómo se reproduce | Qué debe quedar demostrado |
|---|---|---|
| C · JSON válido con cita inventada | Casos C-01 a C-03 y provider('invented'). | Se acepta entrada sustentada y se rechazan forma inválida, referencia inexistente y cita no sustentada. |
| D · Fallo y pérdida de datos | D-01/D-02: generación válida y proveedor caído con notas/reporte anteriores. | La fuente y lo confirmado se conservan; generar no confirma; caída permite continuar manualmente. |
| R · Respuestas fuera de orden | R-01 a R-03 usan promesas diferidas para fijar edición, resolución y error. | No se aplica respuesta obsoleta ni se degrada un estado nuevo por un error antiguo. |
| L · Rollback incompleto | L-01 a L-03: servidor/worker/shell B, destino A, datos pendientes; después faltan assets o cambia esquema. | Recuperación compatible preserva datos; la operación incompatible se rechaza sin destruir el estado anterior. |

Dedicar aproximadamente 20 minutos a C/D, 15 a R y 15 a L. Expliquen la causa raíz y el punto de control antes de escribir el parche. No añadan esperas arbitrarias para que una carrera deje de aparecer.

Pistas para razonar, no soluciones: ¿qué distingue una respuesta aplicable de una respuesta exitosa?, ¿cuándo se modifica el dato original?, ¿qué operación evita que cambie la revisión entre comprobar y escribir?, ¿cómo se detecta el cliente viejo después de recuperar el servidor?, ¿qué evidencia demuestra compatibilidad de esquema?

## Paso 3 · Verificar y registrar (5 minutos)

```sh
node scripts/evaluate.mjs --out evidence/after.json
node --test tests/*.test.mjs
```

El evaluador de escenarios debe terminar con código 0 y todos los casos publicados aprobados; la suite añade un smoke HTTP en localhost. Comparen before/after y el hash del módulo. Lean las aserciones: no basta entregar una captura verde. El workflow incluido proporciona feedback en CI; la evaluación final de su PWA sigue siendo independiente sobre SHA fijado.

Agreguen como máximo una variante técnica breve por integrante dentro del incidente que expliquen: por ejemplo otra observación, orden de finalización o dato pendiente. No multipliquen el laboratorio por el número de integrantes. Si algo queda pendiente, declárenlo con su evidencia real.

## Comprobación de navegador en la PWA del equipo

Esta parte corresponde a la entrega semanal ya existente; pueden ensayarla en la demostración docente y completarla dentro del mismo plazo. No la sustituyan por el objeto de simulación L.

1. Abran A en el mismo origen de prueba y guarden una inspección sintética pendiente. Registren su identificador, contenido y estado de sincronización.
2. Observen la versión de aplicación/build, el service worker controlador y las cachés de assets. Conserven una pestaña abierta para identificar clientes antiguos.
3. Publiquen B y apliquen su estrategia de actualización; comprueben datos pendientes y operación en el cliente. Inspeccionen qué código/controlador usa cada pestaña.
4. Induzcan el fallo en preview o Docker y comprueben que un smoke del flujo lo detecta. No provoquen fallos en servicios ajenos.
5. Recuperen la versión compatible siguiendo el runbook. No borren toda la base, no usen Clear site data ni eliminen cachés de otras aplicaciones como solución.
6. Comprueben servidor, worker, shell y dato pendiente después de la recuperación. Ejecuten el smoke contra esa versión, recarga/offline y sincronización sin pérdida/duplicación. Mantengan el mismo origen para evaluar almacenamiento: un preview con otro hostname no demuestra preservación del almacén anterior.
7. Registren preparación, acción, esperado, observado, versión y enlaces a reportes. Si no lo ejecutaron en navegador, anótenlo como pendiente; no lo marquen aprobado porque pasó el modelo L.

## Evidencia del equipo y de cada persona

Conserven src/implementation.mjs corregido, before.json, after.json y pruebas/reportes. Completen EVIDENCIA.md y enlacen la sección pertinente desde evidence/individual.md de su PWA, sin borrar semanas previas. El hash del módulo del laboratorio no reemplaza el SHA final común de la entrega.

Cada persona documenta contribución enlazada, decisión, predicción, prueba/comando, resultado real, qué demuestra/no demuestra, limitación y uso de IA. Puede apoyarse en IA para desarrollar si declara cómo verificó su resultado; durante el quiz no se permite IA ni dispositivos. No se usa conteo de commits como prueba de participación.

## Aceptación y relación con la rúbrica existente

| Evidencia de clase | Relación con actividad 10 | Qué falta para acreditar el criterio semanal |
|---|---|---|
| Ejecución reproducible del sandbox | AC-01, dentro de 2 puntos. | Instalar y compilar la PWA real; el sandbox no tiene build Next.js/Docker. |
| Generación controlada, conservación y recuperación modelada | AC-02, dentro de 3 puntos. | Integración real, demo identificable y actualización/recuperación del navegador. |
| Pruebas de regresión y smoke HTTP local | AC-03, dentro de 2 puntos. | Casos publicados de la PWA ejecutados contra la versión entregada. |
| Hipótesis, decisión y límites con evidencia personal | AC-04, dentro de 1 punto. | Contrato/instrucciones y proceso/runbook trazables a su producto y release. |

No se convierten 11/11 pruebas en 8/8 automáticamente. No hay nota adicional por completar el laboratorio ni penalización nueva por los casos formativos de concurrencia. Si hay evidencia personal ambigua se pide aclaración focalizada, sin cero inferido ni sanción a compañeros. Entrega semanal: mismo repositorio/SHA/CI por equipo y entrega individual en Classroom, sin tags; rige la fecha publicada, ventana máxima de 7 días. Se conserva la regla de ramas vigente y la rúbrica de la actividad 10.
