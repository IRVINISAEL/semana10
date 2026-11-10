# Registro de diagnóstico · clase de semana 10

Material formativo dentro de actividad 10. No añade puntos ni otra entrega. Enlazar o incorporar en la evidencia personal existente del equipo.

## Equipo

- Grupo y equipo vigente: Grupo: 10B, Equipo: Linares Cortés María José, Martinez Alejo Irvin Isael y Martínez Bolaños German Yair
- Repositorio común y carpeta auxiliar del laboratorio: https://github.com/IRVINISAEL/semana10
- Baseline (reporte real y hash del módulo): lab/evidence/before.json, 1/11 casos aprobados, SHA256 121c15c6f47ac155ceb189d9df95ec4ce0ded400f8e44a23f5477aa5dbd06e76
- Resultado posterior (reporte real y hash del módulo): lab/evidence/after.json, 11/11 casos aprobados, SHA256 e7d316d193e915b96a9e02ee59f5d9cf644bddfac402aa864da791859767b2b4
- Casos pendientes y razón: Ninguno en el sandbox. La verificación en la PWA real queda pendiente.
- Qué se transfirió a la PWA y referencia: Pendiente
- Recuperación real de navegador: pendiente; no se ejecutó en navegador. El modelo L no la sustituye.

| Incidente | Hipótesis inicial | Invariante | Cambio y enlace | Caso ejecutado | Resultado observado | Límite |
|---|---|---|---|---|---|---|
| C | El validador solo revisa la forma del JSON, no si la cita existe | Cada hallazgo cita texto literal de una observación existente | validateDraft en lab/src/implementation.mjs | C-01 a C-03 | Pasaron | No prueba que todo resumen libre sea verdadero |
| D | Generar borra los datos antes de llamar a la IA y guarda el reporte sin confirmar | Generar solo crea borrador y se conserva lo original | generateDraft ya no borra datos ni guarda el reporte | D-01, D-02 | Pasaron | Es un modelo en memoria |
| R | Una respuesta vieja puede pisar una nueva | Una respuesta corresponde a una revisión y solicitud vigentes | commitDraft y failIfCurrent comparan revisión y requestId | R-01 a R-03 | Pasaron | Solo funciona dentro de un proceso |
| L | La recuperación solo cambia serverVersion y borra los datos | Recuperar exige assets y esquema compatibles, y conserva los datos pendientes | recoverRelease valida antes de cambiar y alinea servidor, worker y shell | L-01 a L-03 | Pasaron | No es un navegador real |

## Integrante: Martinez Alejo Irvin Isael

- Contribución técnica y enlace a código, prueba, depuración o revisión sustantiva: Corregí lab/src/implementation.mjs y ejecuté los reportes before.json y after.json.
- Responsabilidad inicial y rotación: Me tocó la implementación del parche en implementation.mjs. Durante la sesión rotamos tareas y también ayudé a verificar los resultados.
- Incidente y decisión propia: Incidente C. Decidí que cada hallazgo solo se acepta si apunta a una observación que existe y su cita aparece literalmente en el texto de esa observación, y que una cita vacía se rechaza, para que el JSON válido no deje pasar contenido inventado.
- Predicción antes de ejecutar: Esperaba 1/11 antes de corregir y 11/11 después.
- Preparación y comando exacto: Desde lab/ con Node 22: node scripts/evaluate.mjs --out evidence/after.json y node --test tests/*.test.mjs
- Resultado observado y enlace a prueba/reporte: Salió 1/11 antes y 11/11 después; la suite dio 13 pass y 0 fail (12 originales más mi variante C-04). Reportes en lab/evidence/.
- Variante breve ejecutada y resultado, dentro del mismo incidente: Incidente C. Agregué C-04 en lab/tests/behavior.test.mjs: acepta una cita de O-2, rechaza una cita de O-1 atribuida a O-2 y rechaza una cita vacía. Resultado: 13 pass, 0 fail.
- Qué demuestra y qué no demuestra: Demuestra que se cumplen las invariantes en el modelo del laboratorio. No demuestra que la PWA real, el build ni el navegador funcionen.
- ¿Se comprobó modelo/simulación, HTTP real o navegador? Distinga los tres: Modelo/simulación en memoria: sí. HTTP real: sí, smoke local en localhost. Navegador: no.
- Limitación y siguiente verificación: Probar la actualización y recuperación en el navegador con la PWA del equipo, con el mismo origen.
- IA de desarrollo: Martinez Alejo Irvin Isael usó Claude (Anthropic) como apoyo para guiarse en la corrección de implementation.mjs, en la variante C-04 y en la redacción de esta evidencia. Verificó el resultado ejecutando evaluate.mjs (1/11 antes y 11/11 después) y la suite de pruebas (13 pass, 0 fail), y revisando las aserciones de los casos.


## Integrante: Linares Cortés María José

- Contribución técnica y enlace a código, prueba, depuración o revisión sustantiva: Participé en [diagnóstico / implementación / verificación] del laboratorio. Evidencia: lab/src/implementation.mjs y lab/evidence/after.json.
- Responsabilidad inicial y rotación: Al inicio me tocó [diagnóstico / implementación / verificación] y después roté a [otra tarea] con [nombre del compañero].
- Incidente y decisión propia: Incidente [D / R / L]. Decidí que [completar con una frase propia: qué debe cumplirse y por qué].
- Predicción antes de ejecutar: Esperaba que antes de corregir fallaran los casos del incidente [D / R / L] y que después pasaran los 11/11.
- Preparación y comando exacto: Desde lab/ con Node 22: node scripts/evaluate.mjs --out evidence/after.json y node --test tests/*.test.mjs
- Resultado observado y enlace a prueba/reporte: Antes 1/11 y después 11/11; la suite dio [número] pass y 0 fail. Reportes en lab/evidence/.
- Variante breve ejecutada y resultado, dentro del mismo incidente: [nombre de mi variante y su resultado, o «pendiente»]
- Qué demuestra y qué no demuestra: Demuestra que se cumplen las invariantes en el modelo del laboratorio. No demuestra que la PWA real, el build ni el navegador funcionen.
- ¿Se comprobó modelo/simulación, HTTP real o navegador? Distinga los tres: Modelo/simulación en memoria: sí. HTTP real: sí, smoke local en localhost [solo si ejecuté la suite]. Navegador: no.
- Limitación y siguiente verificación: Probar la actualización y recuperación en el navegador con la PWA del equipo, con el mismo origen.
- IA de desarrollo: Linares Cortés María José usó Claude (Anthropic) como apoyo para entender los incidentes y guiarse en la corrección y en la evidencia de este laboratorio. Validó el resultado ejecutando evaluate.mjs (1/11 antes y 11/11 después) y node --test tests/*.test.mjs, y revisando las aserciones de los casos.

## Integrante: Martínez Bolaños German Yair

- Contribución técnica y enlace a código, prueba, depuración o revisión sustantiva: Participé en [diagnóstico / implementación / verificación] del laboratorio. Evidencia: lab/src/implementation.mjs y lab/evidence/after.json.
- Responsabilidad inicial y rotación: Al inicio me tocó [diagnóstico / implementación / verificación] y después roté a [otra tarea] con [nombre del compañero].
- Incidente y decisión propia: Incidente [D / R / L]. Decidí que [completar con una frase propia: qué debe cumplirse y por qué].
- Predicción antes de ejecutar: Esperaba que antes de corregir fallaran los casos del incidente [D / R / L] y que después pasaran los 11/11.
- Preparación y comando exacto: Desde lab/ con Node 22: node scripts/evaluate.mjs --out evidence/after.json y node --test tests/*.test.mjs
- Resultado observado y enlace a prueba/reporte: Antes 1/11 y después 11/11; la suite dio [número] pass y 0 fail. Reportes en lab/evidence/.
- Variante breve ejecutada y resultado, dentro del mismo incidente: [nombre de mi variante y su resultado, o «pendiente»]
- Qué demuestra y qué no demuestra: Demuestra que se cumplen las invariantes en el modelo del laboratorio. No demuestra que la PWA real, el build ni el navegador funcionen.
- ¿Se comprobó modelo/simulación, HTTP real o navegador? Distinga los tres: Modelo/simulación en memoria: sí. HTTP real: sí, smoke local en localhost [solo si ejecuté la suite]. Navegador: no.
- Limitación y siguiente verificación: Probar la actualización y recuperación en el navegador con la PWA del equipo, con el mismo origen.
- IA de desarrollo: Martínez Bolaños German Yair usó Claude (Anthropic) como apoyo para entender los incidentes y guiarse en la corrección y en la evidencia de este laboratorio. Validó el resultado ejecutando evaluate.mjs (1/11 antes y 11/11 después) y node --test tests/*.test.mjs, y revisando las aserciones de los casos.

El evaluador no convierte este documento en puntos adicionales. El SHA final común se registra en Classroom después del último commit; no se intenta incluir dentro de ese mismo commit. La evidencia ambigua genera aclaración personal, no sanción automática al equipo.