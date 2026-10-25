# Inteliun Academy

Academia abierta de microcursos con examen e insignia en PDF. Sin servidor y sin datos: el alumno se lleva su PDF y lo custodia.

## Añadir un curso
1. Copia `cursos/mif.json` a `cursos/<id>.json` y edita título, módulos y preguntas (el `id` debe coincidir con el nombre del archivo).
2. Añade una entrada en `cursos/index.json`.

## Publicar
Settings → Pages → Deploy from branch → `main` / root. En local: `python -m http.server`.

## Privacidad y límites
Todo ocurre en el navegador; Inteliun no guarda nada. Por eso las insignias **no son verificables** por terceros: son de autoformación, no certificaciones oficiales. El PDF lleva metadatos (curso, nivel, nota, fecha e ID) en sus propiedades.
