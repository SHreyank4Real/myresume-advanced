"use client";

import { useCallback, useRef, useState } from "react";
import BootScreen from "@/components/BootScreen";
import Certs from "@/components/Certs";
import Contact from "@/components/Contact";
import Education from "@/components/Education";
import Experience from "@/components/Experience";
import Hero from "@/components/Hero";
import NavBar from "@/components/NavBar";
import Skills from "@/components/Skills";
import Terminal, { type TerminalHandle } from "@/components/Terminal";
import Ticker from "@/components/Ticker";
import styles from "./page.module.css";

export default function Home() {
  const [booted, setBooted] = useState(false);
  const [terminalCollapsed, setTerminalCollapsed] = useState(false);
  const terminalRef = useRef<TerminalHandle>(null);

  const onBootDone = useCallback(() => setBooted(true), []);

  const openTerminal = () => {
    setTerminalCollapsed(false);
    document.getElementById("terminal")?.scrollIntoView({ behavior: "smooth" });
    setTimeout(() => terminalRef.current?.focus(), 400);
  };

  return (
    <>
      {!booted ? <BootScreen onDone={onBootDone} /> : null}
      <Ticker />
      <NavBar visible={booted} />
      <main className={`${styles.main} ${booted ? styles.visible : ""}`}>
        <Hero onOpenTerminal={openTerminal} />
        <Experience />
        <Skills />
        <Certs />
        <Education />
        <Terminal
          ref={terminalRef}
          collapsed={terminalCollapsed}
          onToggle={() => setTerminalCollapsed((c) => !c)}
        />
        <Contact />
      </main>
    </>
  );
}
