# 🎓 Inteliun Academy

**Aprende algo nuevo, demuestra que lo sabes y llévate tu insignia en PDF.**
Sin registro. Sin cuentas. Sin cookies. Sin que nadie guarde tus datos.

### 👉 [Empieza ahora: inteliun.github.io/academy](https://inteliun.github.io/academy/)

---

## ¿Por qué Inteliun?

- **Aprendes de verdad:** cada curso son lecciones con ejemplos resueltos y un examen de 15 preguntas. Necesitas un 80 % para aprobar.
- **Te llevas algo tangible:** al aprobar descargas una insignia en PDF (Bronce, Plata u Oro según tu nota) con tu nombre, el curso, la fecha y la puntuación.
- **Es tuya:** el PDF lo custodias tú y lo cuelgas donde quieras, por ejemplo en tu perfil de LinkedIn (sección *Destacados* o en una publicación).
- **Es privada:** todo ocurre en tu navegador. Inteliun no guarda tu nombre, tus respuestas ni tu resultado.
- **Es gratis y abierta:** el código y los contenidos se pueden reutilizar (ver licencia).

## Cursos disponibles

| Curso | Qué aprenderás |
|---|---|
| **Mantenimiento Industrial: Fundamentos** | Tipos de mantenimiento, MTBF/MTTR, disponibilidad y OEE, curva de la bañera, AMFE, RCM, 5 Porqués, TPM, ISO 9001, LOTO e ISO 55001 |
| **Fundamentos de Google DeepMind** | Historia, aprendizaje por refuerzo, AlphaGo y AlphaZero, AlphaFold y la IA aplicada a la ciencia |

¿Quieres que haya un curso sobre otro tema? Abre una *Issue* o créalo tú (es más fácil de lo que parece).

## Cómo funciona

1. **Elige un curso** y lee las lecciones a tu ritmo.
2. **Haz el examen.** Las preguntas y las opciones salen en orden aleatorio.
3. **Descarga tu PDF** con la insignia y compártelo.

## Crea tu propio curso

1. Copia `cursos/mif.json` a `cursos/<id>.json` y edita título, módulos, lecciones y preguntas (el `id` debe coincidir con el nombre del archivo).
2. Añade una entrada en `cursos/index.json`.
3. Listo: aparece en el catálogo.

Las lecciones admiten varios párrafos por módulo y un recuadro de ideas clave. Se aceptan *pull requests* con cursos nuevos.

## Publicar tu propia copia

`Settings → Pages → Deploy from branch → main / root`.
En local: `python -m http.server` y abre `http://localhost:8000`.

## Privacidad y límites

Todo se ejecuta en el navegador y no hay servidor ni base de datos. Por eso mismo **las insignias no son verificables por terceros**: son de autoformación, no certificaciones oficiales ni están avaladas por ninguna entidad. El PDF incluye en sus propiedades el curso, el nivel, la nota, la fecha y un identificador.

Los contenidos son divulgativos y pueden contener errores o quedar desactualizados; contrasta la información importante con fuentes oficiales.

## Licencia

- **Código** (`app.js`, `*.html`, `style.css`): [MIT](LICENSE).
- **Contenidos de los cursos** (`cursos/`): [CC BY 4.0](LICENSE-CONTENT.md). Puedes copiarlos y adaptarlos, también con fines comerciales, citando a Inteliun.
- **Marca:** el nombre y el logotipo de Inteliun no se incluyen en ninguna de las licencias anteriores.
- **Terceros:** `pdf-lib.min.js` es [pdf-lib](https://github.com/Hopding/pdf-lib), con licencia MIT.

---

*Hecho con cariño para que aprender sea más fácil que aplazarlo.* ✨
