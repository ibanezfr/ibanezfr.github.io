---
title: "Automating repetitive tasks with Python"
desc: "A practical intro to scripting daily workflows using Python's standard library."
date: 2026-04-15
tags: python
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

## Why automate?

Every developer has a set of tasks they repeat daily: renaming files, parsing logs, sending reports, moving data between services. Python is one of the best tools for turning those manual steps into a single command.

In this post I'll walk through a real example: a script that watches a folder, renames incoming files according to a pattern, and logs every action.

---

## The script

```python
import time
import logging
from pathlib import Path
from watchdog.observers import Observer
from watchdog.events import FileSystemEventHandler

LOG_FILE = Path("watcher.log")
WATCH_DIR = Path("~/Downloads").expanduser()

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
        logging.info(f"Renamed: {src.name} → {dst.name}")
        print(f"[+] {dst.name}")


if __name__ == "__main__":
    observer = Observer()
    observer.schedule(RenameHandler(), str(WATCH_DIR), recursive=False)
    observer.start()
    print(f"Watching {WATCH_DIR} — press Ctrl+C to stop")
    try:
        while True:
            time.sleep(1)
    except KeyboardInterrupt:
        observer.stop()
    observer.join()
```

---

## Breaking it down

### `watchdog`

[watchdog](https://pypi.org/project/watchdog/) is a cross-platform library that wraps OS-level filesystem events (inotify on Linux, FSEvents on macOS, ReadDirectoryChangesW on Windows). No polling — the OS notifies Python the moment something changes.

Install it with:

```bash
pip install watchdog
```

### `FileSystemEventHandler`

We subclass it and override `on_created`. Other hooks you can use:

| Method | Trigger |
|---|---|
| `on_created` | New file or folder |
| `on_modified` | File content changed |
| `on_deleted` | File or folder removed |
| `on_moved` | File renamed or moved |

### Logging

`logging.basicConfig` writes every rename to `watcher.log` with a timestamp. Useful for auditing or debugging later.

---

## Running it as a background service

On Linux/macOS you can use `nohup`:

```bash
nohup python watcher.py &
```

On Windows, wrap it in a `.bat` file and schedule it with Task Scheduler, or use [NSSM](https://nssm.cc/) to run it as a Windows service.

---

## What's next

- Add a config file (`config.toml`) so the rename pattern is configurable without editing code
- Send a desktop notification via `plyer` when a file is renamed
- Filter by extension — only rename `.pdf` files, for example

The full code is available on [GitHub](https://github.com/ibanezfr).
