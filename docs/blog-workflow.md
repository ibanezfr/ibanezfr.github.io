# Blog Workflow — Guía de creación de posts

## Estructura de carpetas

```
src/content/blog/
  en/   ← versión inglés
  es/   ← versión español
  de/   ← versión alemán (requiere cambios adicionales, ver sección 5)
```

Cada idioma tiene su propio archivo `.md` con el mismo nombre de archivo:

```
src/content/blog/en/mi-primer-post.md
src/content/blog/es/mi-primer-post.md
```

---

## Frontmatter obligatorio

```yaml
---
title: "Título del post"
desc: "Una línea descriptiva que aparece en el listado del blog."
date: 2026-04-15
tags: python          # determina en qué acordeón aparece el post
---
```

- **Sin campo `url`** → el post se aloja localmente en `/en/mi-primer-post` o `/es/mi-primer-post`
- **Con campo `url: "https://..."`** → aparece en el listado pero abre el link externo (LinkedIn, Medium, etc.) sin generar página local

El campo `tags` agrupa posts en acordeones. Un tag nuevo crea automáticamente un nuevo acordeón `#tag` en el blog.

---

## Ejemplo completo de post hosteado localmente

```markdown
---
title: "Automatizando tareas con Python"
desc: "Cómo usar schedule y subprocess para automatizar tu día a día."
date: 2026-04-15
tags: python
---

## Introducción

El texto va acá en Markdown normal. **Negrita**, *cursiva*, `código inline`.

## Bloques de código

\```python
import schedule
import time

def tarea():
    print("ejecutando...")

schedule.every(10).minutes.do(tarea)
while True:
    schedule.run_pending()
    time.sleep(1)
\```

## Listas

- Ítem 1
- Ítem 2
  - Subítem

## Links

[Documentación oficial](https://schedule.readthedocs.io)
```

---

## Multimedia

### Imágenes

Guardá la imagen en `public/assets/images/` y referenciala con ruta absoluta:

```markdown
![Descripción de la imagen](/assets/images/mi-diagrama.png)
```

Para controlar el tamaño, usá HTML crudo (Astro lo renderiza tal cual dentro de archivos `.md`):

```html
<img src="/assets/images/mi-diagrama.png" alt="Diagrama" style="max-width: 100%; border-radius: 8px;">
```

### YouTube

```html
<div style="position: relative; padding-bottom: 56.25%; height: 0; overflow: hidden;">
  <iframe
    src="https://www.youtube.com/embed/VIDEO_ID"
    style="position: absolute; top: 0; left: 0; width: 100%; height: 100%; border: 0;"
    allowfullscreen
  ></iframe>
</div>
```

### Vimeo

```html
<div style="position: relative; padding-bottom: 56.25%; height: 0; overflow: hidden;">
  <iframe
    src="https://player.vimeo.com/video/VIDEO_ID"
    style="position: absolute; top: 0; left: 0; width: 100%; height: 100%; border: 0;"
    allowfullscreen
  ></iframe>
</div>
```

> El `padding-bottom: 56.25%` mantiene el ratio 16:9 y hace el video responsive.

---

## Imágenes — formato y optimización

### Límites de GitHub Pages

No hay límite por imagen. Los únicos a tener en cuenta:
- Repo: recomendado **< 1 GB** en total
- Por archivo: warning en > 50 MB, bloqueo en > 100 MB (inalcanzable con imágenes web)
- Bandwidth: 100 GB/mes — irrelevante para un portfolio personal

El riesgo real es que el repo se vuelva pesado acumulando imágenes sin optimizar.

### Formato recomendado

| Formato | Cuándo usarlo |
|---|---|
| **WebP** | Caso general — fotos, capturas, diagramas. ~30% más liviano que JPG a igual calidad |
| **AVIF** | Aún mejor compresión, soporte de browsers algo más limitado |
| **PNG** | Solo si se necesita transparencia (logos, íconos) |
| **SVG** | Diagramas e íconos vectoriales — el más liviano |
| JPG | Evitarlo, WebP lo reemplaza en todos los casos |

**Tamaño objetivo:** < 200 KB por imagen. Capturas de pantalla o diagramas: < 100 KB.

### Herramientas para convertir/comprimir

**Browser (sin instalar nada):** [Squoosh](https://squoosh.app) — arrastrás la imagen, elegís WebP, calidad 80, descargás.

**Terminal:**
```bash
# Requiere libwebp
cwebp -q 80 imagen.png -o imagen.webp
```

### Dónde guardarlas — dos opciones

**Opción A — Simple (recomendada):**

Guardar en `public/assets/images/` y referenciar con ruta absoluta en el `.md`:

```markdown
![Descripción](/assets/images/mi-imagen.webp)
```

Astro copia todo lo que esté en `public/` al build sin procesarlo. Es el flujo más directo.

**Opción B — Optimización automática con Astro (`astro:assets`):**

Requiere convertir el archivo a `.mdx` (Markdown + JSX). Astro genera `srcset`, lazy loading y convierte cualquier formato a WebP en build time automáticamente.

```
src/content/blog/en/mi-post.mdx   ← cambiar extensión
```

```mdx
---
title: "Mi post"
desc: "..."
date: 2026-04-15
tags: python
---
import { Image } from 'astro:assets';
import miImagen from '../../assets/images/mi-imagen.png';

<Image src={miImagen} alt="Descripción" width={800} />

Texto del post...
```

> Usar Opción A + WebP optimizado con Squoosh es suficiente para un portfolio personal.
> La Opción B vale la pena si se quieren subir imágenes en formatos pesados y dejar que Astro haga el trabajo.

---

## Agregar alemán (requiere cambios en el código)

El idioma alemán no existe todavía — el sistema de i18n actual solo maneja `en`/`es`.
Para agregarlo hay que modificar 3 archivos:

| Archivo | Cambio necesario |
|---|---|
| `src/components/Navbar.astro` | Agregar `<li><a ... data-lang-code="de">Deutsch 🇩🇪</a></li>` al dropdown |
| `src/components/BlogSection.astro` | Agregar un tercer bloque `<div data-lang-section="de">` con posts filtrados por `de/` |
| `src/scripts/main.js` | Agregar `de` a `TITLES`, `DATE_STRINGS`, y la función `setLanguage()` |

---

## Checklist para un post nuevo

```
[ ] Crear src/content/blog/en/nombre-del-post.md
[ ] Crear src/content/blog/es/nombre-del-post.md
[ ] Frontmatter: title, desc, date, tags
[ ] Sin campo `url` para hostear localmente
[ ] Imágenes → public/assets/images/
[ ] npm run dev → verificar que aparece en el listado y la página carga
```
