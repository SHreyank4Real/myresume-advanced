import {
  certsAndAwards,
  education,
  experience,
  pods,
  profile,
  skills,
} from "@/data/resume";

export type CommandResult = {
  lines: string[];
  clear?: boolean;
  fetchStats?: boolean;
};

const HELP = [
  "Available commands:",
  "  help                 Show this help",
  "  whoami               Profile summary",
  "  cat about.txt        About blurb",
  "  experience           Work history",
  "  skills               Skills & stack",
  "  certs                Certifications & awards",
  "  edu                  Education",
  "  contact              Contact links",
  "  kubectl get pods     Running skill pods",
  "  ps aux               Process-style skill list",
  "  stats | uptime       Live visit metrics",
  "  clear                Clear the terminal",
  "  theme                Theme info",
];

function formatExperience(): string[] {
  const lines: string[] = [];
  for (const job of experience) {
    lines.push(`${job.period}${job.active ? "  ● ACTIVE" : ""}`);
    lines.push(`${job.title} @ ${job.company} · ${job.location}`);
    for (const b of job.bullets) {
      lines.push(`  [${b.tag}] ${b.text}`);
    }
    lines.push("");
  }
  return lines;
}

function formatSkills(): string[] {
  return skills.map(
    (s) => `${s.name.padEnd(16)} ${s.years.padEnd(4)}  ${s.tools.join(", ")}`
  );
}

function formatPods(): string[] {
  const header = "NAME                 TYPE            AGE";
  const rows = pods.map(
    (p) => `${p.name.padEnd(20)} ${p.type.padEnd(15)} ${p.age}`
  );
  return [header, ...rows];
}

export function runCommand(raw: string): CommandResult {
  const input = raw.trim().replace(/\s+/g, " ");
  const lower = input.toLowerCase();

  if (!input) {
    return { lines: [] };
  }

  if (lower === "help" || lower === "?" || lower === "ls") {
    return { lines: HELP };
  }

  if (lower === "clear" || lower === "cls") {
    return { lines: [], clear: true };
  }

  if (lower === "whoami") {
    return {
      lines: [
        `Name:       ${profile.name}`,
        `Role:       ${profile.role} (${profile.credential})`,
        `Experience: ${profile.experienceYears}`,
        `Location:   ${profile.location}`,
        `GitHub:     github.com/${profile.github}`,
      ],
    };
  }

  if (
    lower === "cat about.txt" ||
    lower === "about" ||
    lower === "cat about"
  ) {
    return { lines: [profile.about] };
  }

  if (
    lower === "experience" ||
    lower === "cat experience.log" ||
    lower === "cat experience.log | sort -r"
  ) {
    return { lines: formatExperience() };
  }

  if (
    lower === "skills" ||
    lower === "cat skills.json" ||
    lower === "cat skills.json | jq '.[]'" ||
    lower === `cat skills.json | jq '.[]'`
  ) {
    return { lines: formatSkills() };
  }

  if (lower === "certs" || lower === "ls ~/certs" || lower === "awards") {
    return {
      lines: certsAndAwards.map(
        (c) => `${c.path}  [${c.badge}]  ${c.title} — ${c.org}`
      ),
    };
  }

  if (lower === "edu" || lower === "education") {
    return {
      lines: education.map(
        (e) => `${e.degree} | ${e.school} | ${e.date} | ${e.location}`
      ),
    };
  }

  if (lower === "contact") {
    return {
      lines: [
        `email     ${profile.email}`,
        `github    ${profile.githubUrl}`,
        `linkedin  ${profile.linkedinUrl}`,
        `phone     ${profile.phone}`,
      ],
    };
  }

  if (
    lower === "kubectl get pods" ||
    lower === "kubectl get pod" ||
    lower === "k get pods"
  ) {
    return {
      lines: [
        "NAMESPACE   resume",
        ...formatPods(),
        "",
        "All pods Running — Ready 1/1",
      ],
    };
  }

  if (lower === "ps aux" || lower === "ps aux --format=name,type,age") {
    return {
      lines: ["USER       PID  %CPU  COMMAND", ...formatPods().slice(1).map((r, i) =>
        `${profile.shortName.padEnd(10)} ${(1000 + i).toString().padEnd(4)}  ${String(10 + i).padEnd(4)}  ${r}`
      )],
    };
  }

  if (lower === "stats" || lower === "uptime" || lower === "visitors") {
    return { lines: ["Fetching visit metrics..."], fetchStats: true };
  }

  if (lower === "theme") {
    return {
      lines: [
        "theme: phosphor-terminal",
        "palette: green-on-black (#00ff41 / #050a05)",
        "font: IBM Plex Mono",
        "status: all systems healthy",
      ],
    };
  }

  if (lower === "pwd") {
    return { lines: ["/home/shreyank/resume"] };
  }

  if (lower.startsWith("echo ")) {
    return { lines: [input.slice(5)] };
  }

  return {
    lines: [
      `command not found: ${input}`,
      "Type 'help' for available commands.",
    ],
  };
}
