---
title: "Shortcuts de Terminal: Historial"
desc: "Buscá, navegá y reutilizá tus comandos anteriores como un pro."
date: 2023-05-03
tags: terminal
---

El historial de comandos es una mina de oro — si sabés cómo aprovecharlo. Estos atajos permiten buscar, revisar y reutilizar comandos sin volver a tipear nada.

## Buscar en el historial

| Atajo | Acción |
|---|---|
| `Ctrl + R` | Búsqueda inversa **incremental** — los resultados se actualizan mientras escribís |
| `Ctrl + J` | Detener la búsqueda y conservar el comando encontrado |
| `Ctrl + G` | Cancelar la búsqueda y volver al input original |
| `Alt + P` | Búsqueda inversa **no incremental** — muestra el resultado solo al presionar Enter |

## Navegar el historial

| Atajo | Acción |
|---|---|
| `Ctrl + P` / `↑` | Mostrar el comando anterior |
| `Ctrl + N` / `↓` | Mostrar el comando siguiente |
| `Ctrl + O` | Ejecutar la entrada actual del historial y avanzar a la siguiente |

## Re-ejecutar y modificar comandos

| Atajo | Acción |
|---|---|
| `!!` | Re-ejecutar el último comando |
| `!x` | Re-ejecutar el comando más reciente que empiece con `x` |
| `!fi` | Re-ejecutar el comando más reciente que coincida con el patrón `fi` |
| `!n` | Re-ejecutar el comando número `n` del historial |
| `^123^abc` | Re-ejecutar el último comando reemplazando `123` por `abc` |

## Referenciar argumentos

| Atajo | Acción |
|---|---|
| `!$` | Último argumento del comando anterior |
| `!^` | Primer argumento del comando anterior |
| `!*` | Todos los argumentos del comando anterior |
| `!n:$` | Último argumento del comando `n` del historial |
| `!n:m` | Argumentos desde la posición `m` del comando `n` |

> **Ejemplo rápido:** `mkdir projects/demo` y luego `cd !$` — `!$` se expande a `projects/demo`.

## El modificador `:p` — mostrar sin ejecutar

Agregá `:p` a cualquier expansión del historial para previsualizar el resultado antes de ejecutarlo:

| Expresión | Qué muestra |
|---|---|
| `!x:p` | El comando que ejecutaría `!x` |
| `!n:p` | El comando número `n` |
| `!$:p` | El valor al que hace referencia `!$` |
| `!*:p` | Todos los argumentos a los que se expande `!*` |

## Deshacer

| Atajo | Acción |
|---|---|
| `Ctrl + _` | Deshacer el último cambio en la línea de comando |

---
