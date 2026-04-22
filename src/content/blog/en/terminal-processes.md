---
title: "Terminal Shortcuts: Processes"
desc: "Control running processes and manage terminal output."
date: 2024-03-30
tags: terminal
---

These shortcuts put you in control of what's running — and what's displayed — in your terminal.

## Screen

| Shortcut | Action |
|---|---|
| `Ctrl + L` | Clear the terminal screen (same as running `clear`) |

## Output flow

| Shortcut | Action |
|---|---|
| `Ctrl + S` | Pause screen output — commands still run, output is buffered |
| `Ctrl + Q` | Resume output paused by `Ctrl + S` |

> **Heads up:** `Ctrl + S` is a classic source of "frozen terminal" panic. If your terminal suddenly stops responding, try `Ctrl + Q` before anything else.

## Process control

| Shortcut | Action |
|---|---|
| `Ctrl + C` | Interrupt the running command (sends `SIGINT`) |
| `Ctrl + Z` | Suspend the running process and return to the prompt (sends `SIGTSTP`) |
| `Ctrl + D` | Send EOF — closes the terminal if the prompt is empty |

> **Tip:** After `Ctrl + Z`, the process is paused in the background. Use `fg` to bring it back to the foreground, `bg` to keep it running in the background, and `jobs` to list all suspended processes.

---
