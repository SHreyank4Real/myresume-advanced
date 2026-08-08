export type Skill = {
  name: string;
  tools: string[];
  years: string;
};

export type Experience = {
  id: string;
  period: string;
  active?: boolean;
  title: string;
  company: string;
  location: string;
  bullets: { tag: string; text: string }[];
};

export type CertOrAward = {
  kind: "cert" | "award";
  path: string;
  badge: string;
  title: string;
  org: string;
};

export type Education = {
  degree: string;
  school: string;
  date: string;
  location: string;
};

export type Pod = {
  name: string;
  type: string;
  age: string;
};

export const profile = {
  name: "M S Shreyank Sharma",
  shortName: "shreyank",
  host: "prod-01",
  role: "DevOps / Site Reliability Engineer",
  credential: "CKA",
  experienceYears: "6+ years",
  location: "Udupi, India",
  email: "sharma.shreyank6@gmail.com",
  phone: "+91 94489 55246",
  github: "SHreyank4Real",
  githubUrl: "https://github.com/SHreyank4Real",
  linkedin: "shreyank-sharma",
  linkedinUrl: "https://linkedin.com/in/shreyank-sharma",
  about:
    "DevOps / SRE with 6+ years of experience in AWS, Kubernetes, and cloud migrations. Expert in IaC, automation, and observability. Certified Kubernetes Administrator. Strong record in production incident response and cluster reliability engineering.",
  tagline:
    "Building reliable cloud systems — AWS, Kubernetes, and observability at scale.",
};

export const asciiName = ` ____  _                          _    
/ ___|| |__  _ __ ___ _   _  __ _| | __
\\___ \\| '_ \\| '__/ _ \\ | | |/ _\` | |/ /
 ___) | | | | | |  __/ |_| | (_| |   < 
|____/|_| |_|_|  \\___|\\__, |\\__,_|_|\\_\\
                      |___/            `;

export const pods: Pod[] = [
  { name: "cloud-infra", type: "aws", age: "6y" },
  { name: "kubernetes", type: "orchestration", age: "5y" },
  { name: "helm-charts", type: "deploy", age: "3y" },
  { name: "prometheus-grafana", type: "observability", age: "4y" },
  { name: "argocd-gitops", type: "cicd", age: "1y" },
  { name: "elk-logging", type: "observability", age: "4y" },
  { name: "terraform-iac", type: "infra", age: "5y" },
];

export const experience: Experience[] = [
  {
    id: "teksystems",
    period: "Oct 2025 → Present",
    active: true,
    title: "DBA — L3",
    company: "TEKsystems // Client: Cisco",
    location: "Bengaluru",
    bullets: [
      {
        tag: "HELM",
        text: "Designed and maintained custom Helm charts for Redis clusters — standardized, scalable deployments.",
      },
      {
        tag: "OPS",
        text: "Planned and executed Redis upgrade strategies; validated backup/restore APIs to ensure data integrity.",
      },
      {
        tag: "LOG",
        text: "Implemented Redis log forwarding to AWS S3 via Fluent Bit for centralized logging and audit compliance.",
      },
      {
        tag: "INC",
        text: "Resolved complex L3 production incidents across Redis and Kubernetes environments.",
      },
      {
        tag: "CD",
        text: "Worked with Argo CD for GitOps deployments and Istio for service mesh management.",
      },
    ],
  },
  {
    id: "avin",
    period: "Apr 2020 → Sep 2025",
    title: "Senior Technical Leader — DevOps Cloud",
    company: "Avin Systems Pvt. Ltd.",
    location: "Bengaluru",
    bullets: [
      {
        tag: "K8S",
        text: "Designed production-grade Kubernetes clusters with ELK/EFK logging, Prometheus-Grafana monitoring, Velero backups.",
      },
      {
        tag: "AWS",
        text: "Built scalable AWS architectures via CDK across EC2, ECS, RDS, EBS, S3, VPC.",
      },
      {
        tag: "DR",
        text: "Led dedicated DR team; delivered end-to-end Kubernetes disaster recovery on AWS.",
      },
      {
        tag: "ES",
        text: "Optimized Elasticsearch stability through shard/replica tuning and automated index lifecycle management.",
      },
      {
        tag: "AUTO",
        text: "Developed large-scale S3 migration and automation scripts — improved scalability and operational efficiency.",
      },
    ],
  },
];

export const skills: Skill[] = [
  {
    name: "Cloud / AWS",
    tools: ["EC2", "ECS", "EKS", "S3", "RDS", "Lambda", "VPC", "IAM", "GCP"],
    years: "6y",
  },
  {
    name: "Kubernetes",
    tools: ["Helm", "Velero", "Argo CD", "Istio", "EKS"],
    years: "5y",
  },
  {
    name: "Observability",
    tools: ["Prometheus", "Grafana", "ELK Stack", "Fluent Bit"],
    years: "4y",
  },
  {
    name: "IaC / CI·CD",
    tools: ["Terraform", "AWS CDK", "Jenkins", "GitHub Actions", "Bitbucket"],
    years: "5y",
  },
  {
    name: "Containers",
    tools: ["Docker", "Docker Compose"],
    years: "6y",
  },
  {
    name: "Programming",
    tools: ["Python (boto3)", "Bash/Shell", "Go [troubleshoot]", "TypeScript [troubleshoot]"],
    years: "6y",
  },
  {
    name: "Databases",
    tools: ["Redis", "PostgreSQL", "Elasticsearch", "OrientDB"],
    years: "4y",
  },
];

export const certsAndAwards: CertOrAward[] = [
  {
    kind: "cert",
    path: "cert/kubernetes",
    badge: "VALID",
    title: "Certified Kubernetes Administrator",
    org: "CNCF — Linux Foundation",
  },
  {
    kind: "award",
    path: "award/performance",
    badge: "★ AWARDED",
    title: "Above and Beyonders Award",
    org: "Avin Systems Pvt. Ltd.",
  },
  {
    kind: "award",
    path: "award/client",
    badge: "★★★★★",
    title: "5-Star Client Rating",
    org: "Direct client recognition — project delivery excellence",
  },
];

export const education: Education[] = [
  {
    degree: "M.ENG · CLOUD COMPUTING",
    school: "Manipal University",
    date: "June 2020",
    location: "Manipal, India",
  },
  {
    degree: "B.ENG · COMPUTER SCIENCE",
    school: "NMAMIT, Nitte",
    date: "June 2018",
    location: "Nitte, India",
  },
];

export const navLinks = [
  { href: "#experience", label: "./experience" },
  { href: "#skills", label: "./skills" },
  { href: "#certs", label: "./certs" },
  { href: "#edu", label: "./edu" },
  { href: "#contact", label: "./contact" },
  { href: "#terminal", label: "./terminal" },
] as const;
