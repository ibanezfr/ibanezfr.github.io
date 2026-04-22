---
title: "Shortcuts de Terminal: Procesos"
desc: "Controlá los procesos en ejecución y manejá la salida de la terminal."
date: 2023-05-05
tags: terminal
---

Estos atajos te dan control sobre lo que se está ejecutando — y lo que se muestra — en tu terminal.

## Pantalla

| Atajo | Acción |
|---|---|
| `Ctrl + L` | Limpiar la pantalla de la terminal (equivalente a ejecutar `clear`) |

## Flujo de salida

| Atajo | Acción |
|---|---|
| `Ctrl + S` | Pausar la salida en pantalla — los comandos siguen ejecutándose, la salida se almacena en buffer |
| `Ctrl + Q` | Reanudar la salida pausada con `Ctrl + S` |

> **Ojo:** `Ctrl + S` es la causa clásica del pánico por "terminal congelada". Si de repente tu terminal deja de responder, probá `Ctrl + Q` antes que cualquier otra cosa.

## Control de procesos

| Atajo | Acción |
|---|---|
| `Ctrl + C` | Interrumpir el comando en ejecución (envía `SIGINT`) |
| `Ctrl + Z` | Suspender el proceso en ejecución y volver al prompt (envía `SIGTSTP`) |
| `Ctrl + D` | Enviar EOF — cierra la terminal si el prompt está vacío |

> **Tip:** Después de `Ctrl + Z`, el proceso queda pausado en segundo plano. Usá `fg` para volver a primer plano, `bg` para que siga corriendo en segundo plano, y `jobs` para listar todos los procesos suspendidos.

---
