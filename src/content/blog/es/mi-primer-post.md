---
title: "Automatizando tareas repetitivas con Python"
desc: "Una introducción práctica para convertir flujos de trabajo manuales en scripts de una sola línea."
date: 2026-04-15
tags: python
translationKey: python-automation
---

## Demo

<div style="position: relative; padding-bottom: 56.25%; height: 0; overflow: hidden; margin-bottom: 2rem;">
  <iframe
    src="https://www.youtube-nocookie.com/embed/oHjwlPlRZ6s?si=6MH7EWNOk4dPYLVa"
    title="YouTube video player"
    style="position: absolute; top: 0; left: 0; width: 100%; height: 100%; border: 0;"
    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
    referrerpolicy="strict-origin-when-cross-origin"
    allowfullscreen
  ></iframe>
</div>

## ¿Por qué automatizar?

Todo desarrollador tiene un conjunto de tareas que repite a diario: renombrar archivos, parsear logs, enviar reportes, mover datos entre servicios. Python es una de las mejores herramientas para convertir esos pasos manuales en un único comando.

En este post voy a recorrer un ejemplo real: un script que vigila una carpeta, renombra los archivos nuevos según un patrón y registra cada acción en un log.

---

## El script

```python
import time
import logging
from pathlib import Path
from watchdog.observers import Observer
from watchdog.events import FileSystemEventHandler

LOG_FILE = Path("watcher.log")
WATCH_DIR = Path("~/Descargas").expanduser()

logging.basicConfig(
    filename=LOG_FILE,
    level=logging.INFO,
    format="%(asctime)s  %(message)s",
    datefmt="%Y-%m-%d %H:%M:%S",
)


class RenameHandler(FileSystemEventHandler):
    def on_created(self, event):
        if event.is_directory:
            return

        src = Path(event.src_path)
        timestamp = time.strftime("%Y%m%d_%H%M%S")
        dst = src.with_name(f"{timestamp}_{src.name}")
        src.rename(dst)
        logging.info(f"Renombrado: {src.name} → {dst.name}")
        print(f"[+] {dst.name}")


if __name__ == "__main__":
    observer = Observer()
    observer.schedule(RenameHandler(), str(WATCH_DIR), recursive=False)
    observer.start()
    print(f"Vigilando {WATCH_DIR} — presioná Ctrl+C para detener")
    try:
        while True:
            time.sleep(1)
    except KeyboardInterrupt:
        observer.stop()
    observer.join()
```

---

## Analizando el código

### `watchdog`

[watchdog](https://pypi.org/project/watchdog/) es una librería multiplataforma que envuelve los eventos de filesystem del sistema operativo (inotify en Linux, FSEvents en macOS, ReadDirectoryChangesW en Windows). Sin polling — el OS le notifica a Python en el momento exacto en que algo cambia.

Instalala con:

```bash
pip install watchdog
```

### `FileSystemEventHandler`

Subclaseamos el handler y sobreescribimos `on_created`. Otros hooks disponibles:

| Método | Se dispara cuando… |
|---|---|
| `on_created` | Se crea un archivo o carpeta |
| `on_modified` | Cambia el contenido de un archivo |
| `on_deleted` | Se elimina un archivo o carpeta |
| `on_moved` | Se renombra o mueve un archivo |

### Logging

`logging.basicConfig` escribe cada renombre en `watcher.log` con timestamp. Útil para auditar o debuggear después.

---

## Ejecutarlo como servicio en segundo plano

En Linux/macOS podés usar `nohup`:

```bash
nohup python watcher.py &
```

En Windows, envolvelo en un `.bat` y programalo con el Programador de Tareas, o usá [NSSM](https://nssm.cc/) para correrlo como servicio de Windows.

---

## Próximos pasos

- Agregar un archivo de configuración (`config.toml`) para que el patrón de renombre sea configurable sin editar el código
- Enviar una notificación de escritorio con `plyer` cuando se renombre un archivo
- Filtrar por extensión — por ejemplo, solo renombrar archivos `.pdf`

El código completo está disponible en [GitHub](https://github.com/ibanezfr).
