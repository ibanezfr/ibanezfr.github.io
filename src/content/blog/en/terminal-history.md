---
title: "Terminal Shortcuts: History"
desc: "Search, navigate, and reuse your command history like a pro."
date: 2024-03-30
tags: terminal
---

Your command history is a goldmine — if you know how to dig into it. These shortcuts let you search, revisit, and remix past commands without retyping a single character.

## Search the history

| Shortcut | Action |
|---|---|
| `Ctrl + R` | **Incremental** reverse search — results update as you type |
| `Ctrl + J` | Stop searching and keep the matched command |
| `Ctrl + G` | Cancel search, return to the original input |
| `Alt + P` | **Non-incremental** reverse search — shows result only on Enter |

## Navigate the history

| Shortcut | Action |
|---|---|
| `Ctrl + P` / `↑` | Show the previous command |
| `Ctrl + N` / `↓` | Show the next command |
| `Ctrl + O` | Run the current history entry, then advance to the next |

## Re-run & modify commands

| Shortcut | Action |
|---|---|
| `!!` | Re-run the last command |
| `!x` | Re-run the most recent command starting with `x` |
| `!fi` | Re-run the most recent command matching pattern `fi` |
| `!n` | Re-run command number `n` from the history |
| `^123^abc` | Re-run the last command with `123` replaced by `abc` |

## Reference arguments

| Shortcut | Action |
|---|---|
| `!$` | Last argument of the previous command |
| `!^` | First argument of the previous command |
| `!*` | All arguments of the previous command |
| `!n:$` | Last argument of command `n` in history |
| `!n:m` | Arguments from position `m` of command `n` |

> **Quick example:** `mkdir projects/demo` then `cd !$` — `!$` expands to `projects/demo`.

## The `:p` modifier — print, don't run

Append `:p` to any history expansion to preview the result before executing it:

| Expression | What it prints |
|---|---|
| `!x:p` | The command that `!x` would run |
| `!n:p` | Command number `n` |
| `!$:p` | The value that `!$` refers to |
| `!*:p` | All arguments that `!*` would expand to |

## Undo

| Shortcut | Action |
|---|---|
| `Ctrl + _` | Undo the last change to the command line |

---
