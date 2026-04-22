# Guía de contenido del blog

Referencia para crear y mantener artículos en el portfolio.

---

## Crear un artículo nuevo

Crear dos archivos `.md`, uno por idioma:

```
src/content/blog/en/mi-titulo.md
src/content/blog/es/mi-titulo.md
```

### Frontmatter obligatorio

```yaml
---
title: "Título del artículo"
desc: "Una línea descriptiva que aparece en la lista y bajo el título."
date: 2026-04-22
tags: python          # categoría en el acordeón: python | terminal | (nueva)
---
```

### Frontmatter opcional

```yaml
url: "https://..."       # si el artículo vive en otro sitio; omitir para hostearlo aquí
translationKey: my-key   # ver sección "Vincular traducciones" más abajo
```

---

## Vincular traducciones (cambio de idioma en el artículo)

Cuando el lector presiona el botón de idioma dentro de un artículo, el sitio lo
lleva a la versión traducida del mismo artículo. El emparejamiento funciona de
dos formas:

### 1. Mismo nombre de archivo → automático

Si los archivos EN y ES tienen el mismo nombre, se vinculan solos:

```
src/content/blog/en/terminal-nav.md   ← se emparejan automáticamente
src/content/blog/es/terminal-nav.md
```

No hace falta ningún campo extra.

### 2. Nombres distintos → usar `translationKey`

Si los nombres difieren entre idiomas, agregar el mismo valor de `translationKey`
en ambos archivos. El valor puede ser cualquier string; usá algo descriptivo.

```yaml
# en/my-first-post.md
translationKey: python-automation
```

```yaml
# es/mi-primer-post.md
translationKey: python-automation
```

Si no existe traducción (artículo solo en un idioma), el botón redirige a `/#blog`.

---

## Tablas de atajos (keycaps)

Las tablas Markdown cuyo encabezado de primera columna sea `Atajo` o `Shortcut`
(sin importar mayúsculas) se convierten automáticamente en filas con teclas
estilizadas. No hace falta MDX ni sintaxis especial.

```markdown
| Atajo          | Acción                              |
|----------------|-------------------------------------|
| `Ctrl + A`     | Ir al principio del renglón         |
| `Ctrl + E`     | Ir al final del renglón             |
| `Alt + F` / `Esc + F` | Mover una palabra adelante   |
```

**Reglas de sintaxis dentro de la celda de atajo:**

| Necesito…                          | Escribir                          | Resultado          |
|------------------------------------|-----------------------------------|--------------------|
| Una combinación de teclas          | `` `Ctrl + A` ``                  | `Ctrl` + `A`       |
| Teclas separadas por +             | `` `Ctrl + Shift + P` ``          | `Ctrl` + `Shift` + `P` |
| Dos teclas seguidas sin +          | `` `Tab Tab` ``                   | `Tab` `Tab`        |
| Alternativas (una u otra)          | `` `Alt + F` / `Esc + F` ``       | `Alt`+`F` / `Esc`+`F` |

Las demás tablas Markdown (encabezado distinto a `Atajo`/`Shortcut`) se renderizan
como tablas HTML normales.

---

## Estructura del artículo hosteado

```markdown
---
title: "..."
desc: "..."
date: 2026-04-22
tags: python
translationKey: mi-clave   # solo si los filenames difieren entre EN y ES
---

Primer párrafo — se muestra como call-out destacado con borde accent.

## Sección 1

Contenido normal...

## Sección 2

Contenido normal...
```

- El **primer párrafo** recibe estilo de lede automáticamente (fondo accent-dim, borde izquierdo).
- Los **H2** aparecen numerados (01, 02…) y con anchor `#` al hover.
- Los H2 se listan automáticamente en el **TOC** lateral izquierdo.
- El **"siguiente artículo"** al pie se elige por fecha ascendente dentro del mismo idioma.
