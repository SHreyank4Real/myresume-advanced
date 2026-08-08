"use client";

import {
  useCallback,
  useEffect,
  useImperativeHandle,
  useRef,
  useState,
  forwardRef,
} from "react";
import { profile } from "@/data/resume";
import { runCommand } from "@/lib/commands";
import styles from "./Terminal.module.css";

type Line = {
  id: number;
  type: "in" | "out" | "sys";
  text: string;
};

export type TerminalHandle = {
  focus: () => void;
};

type TerminalProps = {
  collapsed?: boolean;
  onToggle?: () => void;
};

let lineId = 0;

const Terminal = forwardRef<TerminalHandle, TerminalProps>(function Terminal(
  { collapsed = false, onToggle },
  ref
) {
  const [lines, setLines] = useState<Line[]>([
    {
      id: lineId++,
      type: "sys",
      text: "Interactive shell ready. Type 'help' to explore this resume.",
    },
  ]);
  const [input, setInput] = useState("");
  const [history, setHistory] = useState<string[]>([]);
  const [histIndex, setHistIndex] = useState(-1);
  const inputRef = useRef<HTMLInputElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  useImperativeHandle(ref, () => ({
    focus: () => inputRef.current?.focus(),
  }));

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight });
  }, [lines]);

  const append = useCallback((entries: Omit<Line, "id">[]) => {
    setLines((prev) => [
      ...prev,
      ...entries.map((e) => ({ ...e, id: lineId++ })),
    ]);
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const cmd = input.trim();
    if (!cmd) return;

    setHistory((h) => [cmd, ...h]);
    setHistIndex(-1);
    setInput("");
    append([{ type: "in", text: cmd }]);

    const result = runCommand(cmd);
    if (result.clear) {
      setLines([]);
      return;
    }

    if (result.lines.length) {
      append(result.lines.map((text) => ({ type: "out" as const, text })));
    }

    if (result.fetchStats) {
      try {
        const res = await fetch("/api/stats");
        const data = (await res.json()) as {
          total: number;
          unique: number;
          configured: boolean;
        };
        if (!data.configured) {
          append([
            {
              type: "out",
              text: "visit counter offline — set REDIS_URL (or REDIS_HOST)",
            },
          ]);
        } else {
          append([
            { type: "out", text: `pageviews   ${data.total}` },
            { type: "out", text: `unique      ${data.unique}` },
            { type: "out", text: `status      healthy` },
          ]);
        }
      } catch {
        append([{ type: "out", text: "failed to reach /api/stats" }]);
      }
    }
  };

  const onKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "ArrowUp") {
      e.preventDefault();
      const next = Math.min(histIndex + 1, history.length - 1);
      if (history[next]) {
        setHistIndex(next);
        setInput(history[next]);
      }
    } else if (e.key === "ArrowDown") {
      e.preventDefault();
      const next = histIndex - 1;
      if (next < 0) {
        setHistIndex(-1);
        setInput("");
      } else {
        setHistIndex(next);
        setInput(history[next] ?? "");
      }
    }
  };

  return (
    <section id="terminal" className={styles.wrap}>
      <div className={styles.header}>
        <div className={styles.dots}>
          <span />
          <span />
          <span />
        </div>
        <span className={styles.title}>
          {profile.shortName}@{profile.host} — interactive shell
        </span>
        {onToggle ? (
          <button type="button" className={styles.toggle} onClick={onToggle}>
            {collapsed ? "expand" : "collapse"}
          </button>
        ) : null}
      </div>

      {!collapsed ? (
        <>
          <div
            className={styles.body}
            ref={scrollRef}
            onClick={() => inputRef.current?.focus()}
          >
            {lines.map((line) => (
              <div
                key={line.id}
                className={
                  line.type === "in"
                    ? styles.in
                    : line.type === "sys"
                      ? styles.sys
                      : styles.out
                }
              >
                {line.type === "in" ? (
                  <>
                    <span className={styles.prompt}>
                      <span className={styles.user}>{profile.shortName}</span>@
                      <span className={styles.host}>{profile.host}</span>:~$
                    </span>{" "}
                    {line.text}
                  </>
                ) : (
                  line.text
                )}
              </div>
            ))}
          </div>
          <form className={styles.inputRow} onSubmit={handleSubmit}>
            <span className={styles.prompt}>
              <span className={styles.user}>{profile.shortName}</span>@
              <span className={styles.host}>{profile.host}</span>:~$
            </span>
            <input
              ref={inputRef}
              className={styles.input}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={onKeyDown}
              aria-label="Terminal command"
              autoComplete="off"
              spellCheck={false}
            />
          </form>
        </>
      ) : (
        <p className={styles.collapsedHint}>
          Terminal collapsed — click expand or use nav ./terminal
        </p>
      )}
    </section>
  );
});

export default Terminal;
