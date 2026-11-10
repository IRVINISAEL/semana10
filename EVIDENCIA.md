# Registro de diagnóstico · clase de semana 10

Material formativo dentro de actividad 10. No añade puntos ni otra entrega. Enlazar o incorporar en la evidencia personal existente del equipo.

## Equipo

- Grupo y equipo vigente: Grupo: 10B, Equipo: Linares Cortés María José, Martinez Alejo Irvin Isael y Martínez Bolaños German Yair
- Repositorio común y carpeta auxiliar del laboratorio: (escribe aquí el nombre o enlace del repositorio de su PWA); carpeta auxiliar: lab
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
- Responsabilidad inicial y rotación: (escribe qué te tocó al inicio y con quién rotaste; si no rotaron, dilo)
- Incidente y decisión propia: (elige un incidente y explica con tus palabras qué decidiste)
- Predicción antes de ejecutar: Esperaba 1/11 antes de corregir y 11/11 después.
- Preparación y comando exacto: Desde lab/ con Node 22: node scripts/evaluate.mjs --out evidence/after.json y node --test tests/*.test.mjs
- Resultado observado y enlace a prueba/reporte: Salió 1/11 antes y 11/11 después; la suite dio 12 pass y 0 fail. Reportes en lab/evidence/.
- Variante breve ejecutada y resultado, dentro del mismo incidente: Pendiente
- Qué demuestra y qué no demuestra: Demuestra que se cumplen las invariantes en el modelo del laboratorio. No demuestra que la PWA real, el build ni el navegador funcionen.
- ¿Se comprobó modelo/simulación, HTTP real o navegador? Distinga los tres: Modelo/simulación en memoria: sí. HTTP real: sí, smoke local en localhost. Navegador: no.
- Limitación y siguiente verificación: Probar la actualización y recuperación en el navegador con la PWA del equipo, con el mismo origen.
- IA de desarrollo: (escribe la verdad; por ejemplo: «Usé Claude para guiarme en la corrección; verifiqué ejecutando evaluate.mjs y las pruebas y comparando before y after»)

El evaluador no convierte este documento en puntos adicionales. El SHA final común se registra en Classroom después del último commit; no se intenta incluir dentro de ese mismo commit. La evidencia ambigua genera aclaración personal, no sanción automática al equipo.