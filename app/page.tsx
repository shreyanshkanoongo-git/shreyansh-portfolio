"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";

// ── TYPES ──
interface Project {
  id: number;
  number: string;
  name: string;
  badge: string;
  badgeColor: string;
  tagline: string;
  description: string;
  stack: string[];
  role: string;
  link?: string;
  featured?: boolean;
}

interface Service {
  icon: string;
  title: string;
  description: string;
}

// ── DATA ──
const projects: Project[] = [
  {
    id: 1,
    number: "01",
    name: "GutBut Trigger Tool",
    badge: "Live Product",
    badgeColor: "live",
    tagline: "Full-stack health intelligence app. Built and deployed in 5 days.",
    description:
      "Users log meals, symptoms, sleep, stress, and supplements daily. After 7 to 14 days, the system analyzes patterns, identifies potential triggers, and runs structured elimination experiments to confirm or rule each one out. Every verdict is backed by the user's own data. Built with multi-user auth, Row Level Security, insight caching, and deployed live on Vercel.",
    stack: ["Next.js 16", "TypeScript", "Tailwind CSS", "Supabase", "OpenAI GPT-4o-mini", "Vercel"],
    role: "Full-stack development, AI prompt engineering, database architecture, RLS security, deployment",
    link: "https://gutbut-trigger-tool.vercel.app",
    featured: true,
  },
  {
    id: 2,
    number: "02",
    name: "TalentScope: AI Talent Intelligence",
    badge: "Team Project",
    badgeColor: "team",
    tagline: "Candidate evaluation platform using Gemini and Claude.",
    description:
      "A platform that assesses job applicants using two AI models running in parallel, detecting contradictions in outputs and calibrating confidence scores. Handled GitHub version control, all Vercel deployments, QA testing on AI outputs, and researched company distress signal data used in the predictive hiring engine.",
    stack: ["Next.js", "Supabase", "Google Gemini", "Anthropic Claude", "Vercel"],
    role: "Collaborator, AI Systems & QA",
  },
  {
    id: 3,
    number: "03",
    name: "Inventory & Sales Automation System",
    badge: "Client Work",
    badgeColor: "client",
    tagline: "Live inventory and sales management for a retail jewellery brand.",
    description:
      "Built for Soul Bands, a retail jewellery business, and actively used in daily operations. Tracks stock levels, records every sale, auto-updates inventory after each transaction, tracks profit and loss, and sends automated notifications to customers via email and Instagram DM. Handed off and running without manual intervention.",
    stack: ["Google AppSheet", "Google Sheets", "n8n", "Email APIs", "Instagram Messaging"],
    role: "Designed and built full system",
  },
  {
    id: 4,
    number: "04",
    name: "AI Voice Receptionist & Telegram Assistant",
    badge: "Multi-System Build",
    badgeColor: "multi",
    tagline: "Two connected agents handling calls, tasks, and communications.",
    description:
      "The voice agent handles real inbound calls. It greets callers, identifies intent, answers business queries, checks live calendar availability, books appointments, and logs every call to a Google Sheet. The Telegram assistant accepts text and voice commands and executes tasks: sends emails, replies to threads, organizes the inbox, creates calendar events, and extracts structured candidate data from uploaded resumes into Google Sheets. When instructions are unclear, it asks follow-up questions.",
    stack: ["ElevenLabs", "n8n", "Google Calendar API", "Gmail API", "Telegram Bot API", "LLM"],
    role: "Designed and built end-to-end",
  },
  {
    id: 5,
    number: "05",
    name: "Gyanodaya Institute Content Strategy",
    badge: "Client Work",
    badgeColor: "client",
    tagline: "Full AI-driven content campaign for a coaching institute.",
    description:
      "Directed and executed a complete digital marketing strategy for a coaching institute targeting student enrollment in Jaipur. Generated 20+ visual assets using precise image-generation prompts with a consistent dark and gold brand aesthetic. Paired every visual with optimized copy, targeted local hashtags, and clear calls to action. Delivered as a ready-to-publish system the client could run independently.",
    stack: ["Google Gemini", "Social Media Platforms"],
    role: "AI Content Strategist",
  },
  {
    id: 6,
    number: "06",
    name: "AI Gmail Inbox Organizer",
    badge: "Automation",
    badgeColor: "auto",
    tagline: "Classifies, sorts, and drafts replies automatically.",
    description:
      "Connects to Gmail and classifies every incoming email into Personal, Sales, Social, Promotions, or Miscellaneous using a hybrid rule-based and AI system. Low-priority emails are marked as read. Sales emails are forwarded to the right person. Personal emails get a drafted reply. The inbox stays clean without any manual sorting.",
    stack: ["n8n", "Gmail API", "LLM"],
    role: "Designed and built using n8n",
  },
  {
    id: 7,
    number: "07",
    name: "AI Stock Market Analysis Agent",
    badge: "AI Agent",
    badgeColor: "agent",
    tagline: "Multi-source analysis with a Buy, Sell, or Hold recommendation.",
    description:
      "User inputs a stock name. The system converts it to the right ticker symbol, fetches real-time price data across multiple timeframes, analyzes recent news sentiment, and outputs a Buy, Sell, or Hold recommendation with a confidence score out of 10. Includes a chart visualization. For analysis and decision support only, not financial advice.",
    stack: ["n8n", "OpenAI", "Market Data APIs", "News APIs", "Chart Generation"],
    role: "Designed and built multi-source system",
  },
  {
    id: 8,
    number: "08",
    name: "RAG HR Knowledge Chatbot",
    badge: "RAG System",
    badgeColor: "rag",
    tagline: "Internal HR assistant that answers from company documents, not from guesswork.",
    description:
      "An internal chatbot that retrieves answers from a company's own knowledge base: policies, handbooks, and procedures. Built on a RAG pipeline so every answer comes from actual source material. Context-aware and memory-enabled across the conversation. Domain-adaptable to any organization's documents.",
    stack: ["VectorShift", "GPT-4", "Semantic Search", "Chat Memory"],
    role: "Designed and built RAG pipeline",
  },
  {
    id: 9,
    number: "09",
    name: "AI Resume Parser",
    badge: "Automation",
    badgeColor: "auto",
    tagline: "Extracts structured candidate data from any resume format.",
    description:
      "User uploads a resume via Telegram in any format: PDF, DOC, or image. The system extracts all key candidate data: name, email, phone, skills, work experience, education, projects, and certifications. Everything lands as a single structured row in Google Sheets. Confirmation sent back via Telegram instantly.",
    stack: ["n8n", "Telegram Bot API", "LLM", "Google Sheets", "CloudConvert"],
    role: "Designed and built full parsing pipeline",
  },
];

const services: Service[] = [
  {
    icon: "⟳",
    title: "AI Workflow Automation",
    description:
      "Repetitive processes mapped, then replaced with workflows that run on their own. No human in the loop required.",
  },
  {
    icon: "◈",
    title: "Agentic AI Systems",
    description:
      "Systems that reason, make decisions, and take action. Built for tasks that require judgment, not just pattern matching.",
  },
  {
    icon: "⬡",
    title: "Full-Stack AI Application Development",
    description:
      "End-to-end products, built and deployed. Database, UI, AI integration. If it needs to ship, this is it.",
  },
  {
    icon: "◎",
    title: "RAG & Knowledge Base Systems",
    description:
      "AI that answers from your actual documents. Policies, specs, handbooks. Your data becomes a queryable system.",
  },
  {
    icon: "◉",
    title: "Voice AI Agents",
    description:
      "AI agents built for real conversations: inbound calls, outbound follow-ups, appointment booking, query handling. Any voice interaction that currently needs a human.",
  },
  {
    icon: "◫",
    title: "Telegram & Messaging Bots",
    description:
      "Bots that do real work inside messaging apps. Send emails, manage calendars, parse documents, route tasks. All from a chat interface.",
  },
  {
    icon: "◱",
    title: "Business Process Automation",
    description:
      "Manual workflows replaced with automated pipelines. Inventory, notifications, data entry. If it happens repeatedly, it can be automated.",
  },
  {
    icon: "◲",
    title: "AI Content Strategy & Production",
    description:
      "Content campaigns built with AI at the core. Visual assets, copy, platform strategy. Delivered as a system, not a one-off batch.",
  },
];

const skills = {
  "AI & LLMS": [
    "OpenAI GPT", "Anthropic Claude", "Google Gemini", "ElevenLabs",
    "Llama", "DeepSeek", "Groq", "Perplexity", "Prompt Engineering", "RAG Pipelines",
  ],
  "AUTOMATION": [
    "n8n", "Zapier", "Make.com", "VectorShift", "Webhooks",
    "REST APIs", "Telegram Bot API", "Google Workspace", "Google AppSheet",
  ],
  "DEVELOPMENT": [
    "Next.js", "React", "TypeScript", "JavaScript", "Python",
    "Tailwind CSS", "Supabase", "PostgreSQL", "Vercel", "Hostinger",
    "GitHub", "Git", "Cursor", "Claude Code", "Google Antigravity",
    "Google Stitch", "Lovable", "Bolt", "Replit",
  ],
  "MCP & AGENTS": [
    "MCP Servers", "Goose", "Claude with MCP", "Agentic Pipelines",
  ],
  "BUSINESS": [
    "Sales", "Marketing", "Client Relations", "Project Management",
    "Content Strategy", "Campaign Planning",
  ],
};

const certifications = [
  { issuer: "Anthropic", name: "Claude 101", date: "Mar 2026" },
  { issuer: "Anthropic", name: "Claude with Google Cloud Vertex AI", date: "Mar 2026" },
  { issuer: "Google", name: "AI for Brainstorming and Planning", date: "Mar 2026" },
  { issuer: "Google", name: "AI Fundamentals", date: "Mar 2026" },
  { issuer: "upGrad", name: "Generative AI Foundations Certificate Program", date: "Feb 2026" },
];

// ── BADGE COLORS ──
function getBadgeStyle(color: string) {
  const styles: Record<string, string> = {
    live: "border-[#e8d5b0] text-[#e8d5b0]",
    team: "border-[rgba(255,255,255,0.2)] text-[#888888]",
    client: "border-[rgba(255,255,255,0.2)] text-[#888888]",
    multi: "border-[rgba(255,255,255,0.2)] text-[#888888]",
    auto: "border-[rgba(255,255,255,0.2)] text-[#888888]",
    agent: "border-[rgba(255,255,255,0.2)] text-[#888888]",
    rag: "border-[rgba(255,255,255,0.2)] text-[#888888]",
  };
  return styles[color] || styles.team;
}

// ── FADE IN HOOK ──
function useFadeIn() {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.style.opacity = "1";
          el.style.transform = "translateY(0)";
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);
  return ref;
}

// ── MAIN COMPONENT ──
export default function Home() {
  const [openProject, setOpenProject] = useState<number | null>(1);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const toggleProject = (id: number) => {
    setOpenProject(openProject === id ? null : id);
  };

  // Section refs for fade-in
  const aboutRef = useFadeIn();
  const projectsRef = useFadeIn();
  const servicesRef = useFadeIn();
  const skillsRef = useFadeIn();
  const certRef = useFadeIn();
  const contactRef = useFadeIn();

  return (
    <main
      style={{
        backgroundColor: "#0a0a0a",
        color: "#ffffff",
        fontFamily: "'Inter', sans-serif",
        minHeight: "100vh",
      }}
    >
      {/* ── NAVIGATION ── */}
      <nav
        style={{
          position: "fixed",
          top: "20px",
          left: "50%",
          transform: "translateX(-50%)",
          zIndex: 50,
          width: "min(660px, calc(100% - 40px))",
          background: scrolled
            ? "rgba(255,255,255,0.06)"
            : "rgba(255,255,255,0.03)",
          border: "0.5px solid rgba(255,255,255,0.1)",
          borderRadius: "100px",
          padding: "10px 20px",
          backdropFilter: "blur(12px)",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          transition: "background 0.3s ease",
        }}
      >
        <span style={{ color: "#f2f2f2", fontSize: "15px", fontWeight: 400 }}>
          Shreyansh Kanoongo
        </span>
        <div style={{ display: "flex", alignItems: "center", gap: "24px" }}>
          {["About", "Projects", "Skills", "Contact"].map((item) => (
            <a
              key={item}
              href={`#${item.toLowerCase()}`}
              style={{
                color: "#777777",
                fontSize: "15px",
                textDecoration: "none",
                transition: "color 0.2s ease",
              }}
              onMouseEnter={(e) =>
                ((e.target as HTMLElement).style.color = "#cccccc")
              }
              onMouseLeave={(e) =>
                ((e.target as HTMLElement).style.color = "#777777")
              }
            >
              {item}
            </a>
          ))}
          <a
            href="#contact"
            style={{
              color: "#e8d5b0",
              fontSize: "15px",
              textDecoration: "none",
              border: "0.5px solid rgba(232,213,176,0.4)",
              borderRadius: "100px",
              padding: "5px 16px",
              transition: "all 0.2s ease",
            }}
            onMouseEnter={(e) => {
              (e.target as HTMLElement).style.borderColor =
                "rgba(232,213,176,0.8)";
              (e.target as HTMLElement).style.background =
                "rgba(232,213,176,0.05)";
            }}
            onMouseLeave={(e) => {
              (e.target as HTMLElement).style.borderColor =
                "rgba(232,213,176,0.4)";
              (e.target as HTMLElement).style.background = "transparent";
            }}
          >
            Hire Me
          </a>
        </div>
      </nav>

      {/* ── HERO ── */}
      <section
        id="home"
        style={{
          minHeight: "100vh",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: "120px clamp(20px, 5vw, 80px) 80px",
          maxWidth: "1200px",
          margin: "0 auto",
          width: "100%",
          boxSizing: "border-box",
        }}
      >
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr clamp(180px, 22vw, 280px)",
            gap: "clamp(20px, 4vw, 80px)",
            alignItems: "center",
          }}
        >
          {/* Left */}
          <div>
            <p
              style={{
                color: "#666666",
                fontSize: "11px",
                letterSpacing: "3px",
                textTransform: "uppercase",
                marginBottom: "16px",
                whiteSpace: "nowrap",
              }}
            >
              AI Automation &amp; Systems Developer · Jaipur, India
            </p>

            <div
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "6px",
                background: "rgba(255,255,255,0.04)",
                border: "0.5px solid rgba(255,255,255,0.08)",
                borderRadius: "100px",
                padding: "5px 12px",
                marginBottom: "28px",
              }}
            >
              <span
                style={{
                  width: "6px",
                  height: "6px",
                  borderRadius: "50%",
                  background: "#4ade80",
                  display: "inline-block",
                }}
              />
              <span style={{ color: "#999999", fontSize: "15px" }}>
                Open to work · Immediately
              </span>
            </div>

            <h1
              style={{
                fontSize: "clamp(42px, 5vw, 66px)",
                fontWeight: 300,
                letterSpacing: "-2px",
                lineHeight: 1.1,
                color: "#ffffff",
                marginBottom: "20px",
              }}
            >
              I build AI systems that{" "}
              <span style={{ color: "#e8d5b0" }}>actually</span> work.
            </h1>

            <p
              style={{
                fontSize: "16px",
                color: "#999999",
                marginBottom: "6px",
                fontWeight: 400,
              }}
            >
              Not demos. Not experiments.
            </p>
            <p
              style={{
                fontSize: "16px",
                color: "#aaaaaa",
                marginBottom: "40px",
                fontWeight: 400,
              }}
            >
              Systems that execute.
            </p>

            <div style={{ display: "flex", gap: "12px", flexWrap: "wrap" }}>
              <a
                href="#projects"
                style={{
                  background: "#ffffff",
                  color: "#0a0a0a",
                  borderRadius: "100px",
                  padding: "11px 28px",
                  fontSize: "15px",
                  fontWeight: 500,
                  textDecoration: "none",
                  transition: "opacity 0.2s ease",
                  display: "inline-block",
                }}
                onMouseEnter={(e) =>
                  ((e.target as HTMLElement).style.opacity = "0.85")
                }
                onMouseLeave={(e) =>
                  ((e.target as HTMLElement).style.opacity = "1")
                }
              >
                See My Work
              </a>
              <a
                href="#contact"
                style={{
                  border: "0.5px solid rgba(255,255,255,0.15)",
                  color: "#888888",
                  borderRadius: "100px",
                  padding: "11px 28px",
                  fontSize: "15px",
                  textDecoration: "none",
                  transition: "all 0.2s ease",
                  display: "inline-block",
                }}
                onMouseEnter={(e) => {
                  (e.target as HTMLElement).style.borderColor =
                    "rgba(255,255,255,0.3)";
                  (e.target as HTMLElement).style.color = "#cccccc";
                }}
                onMouseLeave={(e) => {
                  (e.target as HTMLElement).style.borderColor =
                    "rgba(255,255,255,0.15)";
                  (e.target as HTMLElement).style.color = "#cccccc";
                }}
              >
                Let&apos;s Talk
              </a>
            </div>
          </div>

          {/* Right: Photo + Stats */}
          <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
            <div
              style={{
                width: "100%",
                aspectRatio: "4/5",
                borderRadius: "16px",
                overflow: "hidden",
                border: "0.5px solid rgba(255,255,255,0.08)",
                background: "#141414",
              }}
            >
              <Image
                src="/photo.jpg"
                alt="Shreyansh Kanoongo"
                width={280}
                height={350}
                style={{
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                  objectPosition: "center top",
                }}
                priority
              />
            </div>

            {/* Stats */}
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr 1fr",
                borderTop: "0.5px solid rgba(255,255,255,0.06)",
                paddingTop: "16px",
              }}
            >
              {[
                { num: "15+", label: "Systems Built" },
                { num: "5", label: "Certifications" },
                { num: "1", label: "Live Product" },
              ].map((stat, i) => (
                <div
                  key={i}
                  style={{
                    textAlign: "center",
                    borderRight:
                      i < 2
                        ? "0.5px solid rgba(255,255,255,0.06)"
                        : "none",
                    padding: "0 8px",
                  }}
                >
                  <div
                    style={{
                      fontSize: "26px",
                      fontWeight: 300,
                      color: "#ffffff",
                      lineHeight: 1,
                      marginBottom: "4px",
                    }}
                  >
                    {stat.num}
                  </div>
                  <div
                    style={{
                      fontSize: "11px",
                      color: "#aaaaaa",
                      textTransform: "uppercase",
                      letterSpacing: "1.5px",
                    }}
                  >
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── ABOUT ── */}
      <section
        id="about"
        ref={aboutRef}
        style={{
          background: "#0f0f0f",
          borderTop: "0.5px solid rgba(255,255,255,0.06)",
          borderBottom: "0.5px solid rgba(255,255,255,0.06)",
          padding: "80px clamp(20px, 5vw, 80px)",
          opacity: 0,
          transform: "translateY(20px)",
          transition: "opacity 0.6s ease, transform 0.6s ease",
        }}
      >
        <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
          <p
            style={{
              color: "#aaaaaa",
              fontSize: "15px",
              letterSpacing: "4px",
              textTransform: "uppercase",
              marginBottom: "40px",
            }}
          >
            About
          </p>

          {/* Philosophy flow */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "12px",
              flexWrap: "wrap",
              marginBottom: "40px",
            }}
          >
            {["Input", "Understanding", "Decision", "Action", "Output"].map(
              (word, i, arr) => (
                <span key={word} style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                  <span
                    style={{
                      fontSize: "clamp(16px, 2.5vw, 22px)",
                      fontWeight: 300,
                      color: "#ffffff",
                    }}
                  >
                    {word}
                  </span>
                  {i < arr.length - 1 && (
                    <span style={{ color: "#e8d5b0", fontSize: "18px" }}>
                      →
                    </span>
                  )}
                </span>
              )
            )}
          </div>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: "60px",
              alignItems: "start",
            }}
          >
            <div>
              <p
                style={{
                  color: "#888888",
                  fontSize: "14px",
                  lineHeight: 1.9,
                  marginBottom: "16px",
                }}
              >
                I started in sales and marketing, which means before I write a
                single line of code, I ask what problem this solves, who feels
                it, and what fixed actually looks like. That background shapes
                everything I build.
              </p>
              <p
                style={{
                  color: "#888888",
                  fontSize: "14px",
                  lineHeight: 1.9,
                  marginBottom: "16px",
                }}
              >
                I come from two years of working directly with clients and
                businesses. I understand how operations run, where things break,
                and what people actually need from a system. The technical part
                is how I get there. The outcome is all that matters.
              </p>
              <p
                style={{
                  color: "#777777",
                  fontSize: "15px",
                  lineHeight: 1.9,
                }}
              >
                Outside of work, I am figuring out how to make AI do my
                laundry. Still in progress.
              </p>
            </div>

            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "0",
                borderTop: "0.5px solid rgba(255,255,255,0.05)",
              }}
            >
              {[
                { label: "Location", value: "Jaipur, Rajasthan, India" },
                { label: "Available", value: "Immediately · Remote or On-site" },
                { label: "Open to", value: "Full-time · Freelance · Contract" },
                { label: "Education", value: "BBA · Manipal University Jaipur" },
              ].map((item) => (
                <div
                  key={item.label}
                  style={{
                    display: "grid",
                    gridTemplateColumns: "110px 1fr",
                    gap: "20px",
                    padding: "16px 0",
                    borderBottom: "0.5px solid rgba(255,255,255,0.05)",
                    alignItems: "start",
                  }}
                >
                  <span
                    style={{
                      color: "#666666",
                      fontSize: "11px",
                      textTransform: "uppercase",
                      letterSpacing: "2px",
                      paddingTop: "2px",
                    }}
                  >
                    {item.label}
                  </span>
                  <span style={{ color: "#aaaaaa", fontSize: "14px", whiteSpace: "nowrap" }}>
                    {item.value}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── PROJECTS ── */}
      <section
        id="projects"
        ref={projectsRef}
        style={{
          padding: "80px clamp(20px, 5vw, 80px)",
          maxWidth: "1200px",
          margin: "0 auto",
          opacity: 0,
          transform: "translateY(20px)",
          transition: "opacity 0.6s ease, transform 0.6s ease",
        }}
      >
        <p
          style={{
            color: "#aaaaaa",
            fontSize: "15px",
            letterSpacing: "4px",
            textTransform: "uppercase",
            marginBottom: "12px",
          }}
        >
          Projects
        </p>
        <h2
          style={{
            fontSize: "clamp(32px, 4vw, 48px)",
            fontWeight: 300,
            letterSpacing: "-1.5px",
            color: "#ffffff",
            marginBottom: "8px",
          }}
        >
          Systems I&apos;ve{" "}
          <span style={{ color: "#e8d5b0" }}>built.</span>
        </h2>
        <p
          style={{
            color: "#999999",
            fontSize: "14px",
            marginBottom: "48px",
          }}
        >
          Not demos. Not experiments. Each one designed to run in the real
          world.
        </p>

        {/* Header row */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "48px 1fr 160px 60px 24px",
            gap: "16px",
            padding: "0 20px 12px",
            borderBottom: "0.5px solid rgba(255,255,255,0.06)",
            marginBottom: "4px",
          }}
        >
          {["No.", "Project", "Category", "Year", ""].map((h) => (
            <span
              key={h}
              style={{
                color: "#aaaaaa",
                fontSize: "15px",
                letterSpacing: "3px",
                textTransform: "uppercase",
              }}
            >
              {h}
            </span>
          ))}
        </div>

        {/* Project rows */}
        {projects.map((project) => {
          const isOpen = openProject === project.id;
          return (
            <div
              key={project.id}
              style={{
                borderBottom: "0.5px solid rgba(255,255,255,0.06)",
                background: isOpen
                  ? "rgba(255,255,255,0.015)"
                  : "transparent",
                transition: "background 0.3s ease",
              }}
            >
              {/* Row header */}
              <button
                onClick={() => toggleProject(project.id)}
                style={{
                  width: "100%",
                  display: "grid",
                  gridTemplateColumns: "48px 1fr 160px 60px 24px",
                  gap: "16px",
                  padding: "20px",
                  background: "none",
                  border: "none",
                  cursor: "pointer",
                  textAlign: "left",
                  alignItems: "center",
                }}
              >
                <span
                  style={{
                    color: project.id === 1 ? "#e8d5b0" : "#777777",
                    fontSize: "15px",
                    fontWeight: 400,
                  }}
                >
                  {project.number}
                </span>
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "10px",
                    flexWrap: "wrap",
                  }}
                >
                  <span
                    style={{
                      color: "#ffffff",
                      fontSize: project.id === 1 ? "16px" : "14px",
                      fontWeight: 400,
                    }}
                  >
                    {project.name}
                  </span>
                  <span
                    style={{
                      border: "0.5px solid",
                      borderRadius: "100px",
                      padding: "2px 8px",
                      fontSize: "15px",
                    }}
                    className={getBadgeStyle(project.badgeColor)}
                  >
                    {project.id === 1 && (
                      <span
                        style={{
                          width: "5px",
                          height: "5px",
                          borderRadius: "50%",
                          background: "#4ade80",
                          display: "inline-block",
                          marginRight: "5px",
                          verticalAlign: "middle",
                        }}
                      />
                    )}
                    {project.badge}
                  </span>
                </div>
                <span style={{ color: "#777777", fontSize: "14px" }}>
                  {project.tagline.split(".")[0]}
                </span>
                <span style={{ color: "#aaaaaa", fontSize: "14px" }}>
                  2026
                </span>
                <span
                  style={{
                    color: "#777777",
                    fontSize: "14px",
                    transition: "transform 0.2s ease",
                    display: "inline-block",
                    transform: isOpen ? "rotate(180deg)" : "rotate(0deg)",
                  }}
                >
                  ↓
                </span>
              </button>

              {/* Expanded content */}
              <div
                style={{
                  maxHeight: isOpen ? "600px" : "0",
                  overflow: "hidden",
                  transition: "max-height 0.35s ease",
                }}
              >
                <div
                  style={{
                    padding: "0 20px 28px",
                    display: "grid",
                    gridTemplateColumns: "1fr 280px",
                    gap: "40px",
                  }}
                >
                  <div>
                    <p
                      style={{
                        color: "#888888",
                        fontSize: "15px",
                        lineHeight: 1.8,
                        marginBottom: "16px",
                      }}
                    >
                      {project.description}
                    </p>
                    <p style={{ color: "#777777", fontSize: "14px" }}>
                      <span style={{ color: "#aaaaaa" }}>Role: </span>
                      {project.role}
                    </p>
                  </div>
                  <div>
                    <div
                      style={{
                        display: "flex",
                        flexWrap: "wrap",
                        gap: "6px",
                        marginBottom: "20px",
                      }}
                    >
                      {project.stack.map((tech) => (
                        <span
                          key={tech}
                          style={{
                            border: "0.5px solid rgba(255,255,255,0.1)",
                            color: "#888888",
                            fontSize: "15px",
                            borderRadius: "100px",
                            padding: "4px 10px",
                          }}
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                    {project.link && (
                      <a
                        href={project.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        style={{
                          color: "#e8d5b0",
                          fontSize: "15px",
                          textDecoration: "none",
                          display: "inline-flex",
                          alignItems: "center",
                          gap: "6px",
                        }}
                        onMouseEnter={(e) =>
                          ((e.target as HTMLElement).style.opacity = "0.7")
                        }
                        onMouseLeave={(e) =>
                          ((e.target as HTMLElement).style.opacity = "1")
                        }
                      >
                        View Live Project →
                      </a>
                    )}
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </section>

      {/* ── SERVICES ── */}
      <section
        id="services"
        style={{
          background: "#0f0f0f",
          borderTop: "0.5px solid rgba(255,255,255,0.06)",
          borderBottom: "0.5px solid rgba(255,255,255,0.06)",
          padding: "80px clamp(20px, 5vw, 80px)",
        }}
      >
        <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
          <p
            style={{
              color: "#aaaaaa",
              fontSize: "15px",
              letterSpacing: "4px",
              textTransform: "uppercase",
              marginBottom: "12px",
            }}
          >
            Services
          </p>
          <h2
            style={{
              fontSize: "clamp(28px, 3.5vw, 40px)",
              fontWeight: 300,
              letterSpacing: "-1px",
              color: "#ffffff",
              marginBottom: "48px",
            }}
          >
            What I can build for you.
          </h2>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(4, 1fr)",
              gap: "0",
              border: "0.5px solid rgba(255,255,255,0.06)",
              borderRadius: "12px",
              overflow: "hidden",
            }}
          >
            {services.map((service, i) => (
              <div
                key={i}
                style={{
                  padding: "28px 24px",
                  borderRight:
                    (i + 1) % 4 !== 0
                      ? "0.5px solid rgba(255,255,255,0.06)"
                      : "none",
                  borderBottom:
                    i < 4
                      ? "0.5px solid rgba(255,255,255,0.06)"
                      : "none",
                  transition: "background 0.2s ease",
                  cursor: "default",
                }}
                onMouseEnter={(e) =>
                  ((e.currentTarget as HTMLElement).style.background =
                    "rgba(255,255,255,0.02)")
                }
                onMouseLeave={(e) =>
                  ((e.currentTarget as HTMLElement).style.background =
                    "transparent")
                }
              >
                <div
                  style={{
                    color: "#e8d5b0",
                    fontSize: "18px",
                    marginBottom: "12px",
                    lineHeight: 1,
                  }}
                >
                  {service.icon}
                </div>
                <h3
                  style={{
                    color: "#cccccc",
                    fontSize: "15px",
                    fontWeight: 400,
                    marginBottom: "8px",
                    lineHeight: 1.4,
                  }}
                >
                  {service.title}
                </h3>
                <p
                  style={{
                    color: "#999999",
                    fontSize: "15px",
                    lineHeight: 1.7,
                  }}
                >
                  {service.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── SKILLS ── */}
      <section
        id="skills"
        ref={skillsRef}
        style={{
          padding: "80px clamp(20px, 5vw, 80px)",
          maxWidth: "1200px",
          margin: "0 auto",
          opacity: 0,
          transform: "translateY(20px)",
          transition: "opacity 0.6s ease, transform 0.6s ease",
        }}
      >
        <p
          style={{
            color: "#aaaaaa",
            fontSize: "15px",
            letterSpacing: "4px",
            textTransform: "uppercase",
            marginBottom: "12px",
          }}
        >
          Skills
        </p>
        <h2
          style={{
            fontSize: "clamp(28px, 3.5vw, 40px)",
            fontWeight: 300,
            letterSpacing: "-1px",
            color: "#ffffff",
            marginBottom: "48px",
          }}
        >
          What I work with.
        </h2>

        <div
          style={{
            borderTop: "0.5px solid rgba(255,255,255,0.05)",
          }}
        >
          {Object.entries(skills).map(([category, items]) => (
            <div
              key={category}
              style={{
                display: "grid",
                gridTemplateColumns: "160px 1fr",
                gap: "24px",
                padding: "20px 0",
                borderBottom: "0.5px solid rgba(255,255,255,0.05)",
                alignItems: "start",
              }}
            >
              <span
                style={{
                  color: "#aaaaaa",
                  fontSize: "15px",
                  letterSpacing: "3px",
                  textTransform: "uppercase",
                  paddingTop: "2px",
                }}
              >
                {category}
              </span>
              <div
                style={{
                  display: "flex",
                  flexWrap: "wrap",
                  alignItems: "center",
                  gap: "4px 0",
                }}
              >
                {items.map((item, i) => (
                  <span key={item}>
                    <span style={{ color: "#aaaaaa", fontSize: "15px" }}>
                      {item}
                    </span>
                    {i < items.length - 1 && (
                      <span
                        style={{
                          color: "#555555",
                          fontSize: "15px",
                          margin: "0 10px",
                        }}
                      >
                        ·
                      </span>
                    )}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── CERTIFICATIONS ── */}
      <section
        id="certifications"
        ref={certRef}
        style={{
          background: "#0f0f0f",
          borderTop: "0.5px solid rgba(255,255,255,0.06)",
          padding: "80px clamp(20px, 5vw, 80px)",
          opacity: 0,
          transform: "translateY(20px)",
          transition: "opacity 0.6s ease, transform 0.6s ease",
        }}
      >
        <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
          <p
            style={{
              color: "#aaaaaa",
              fontSize: "15px",
              letterSpacing: "4px",
              textTransform: "uppercase",
              marginBottom: "40px",
            }}
          >
            Certifications
          </p>
          <div
            style={{
              borderTop: "0.5px solid rgba(255,255,255,0.05)",
            }}
          >
            {certifications.map((cert) => (
              <div
                key={cert.name}
                style={{
                  display: "grid",
                  gridTemplateColumns: "110px 1fr auto",
                  gap: "20px",
                  padding: "20px 0",
                  borderBottom: "0.5px solid rgba(255,255,255,0.05)",
                  alignItems: "center",
                }}
              >
                <span
                  style={{
                    color: "#aaaaaa",
                    fontSize: "15px",
                    letterSpacing: "2px",
                    textTransform: "uppercase",
                  }}
                >
                  {cert.issuer}
                </span>
                <span style={{ color: "#cccccc", fontSize: "15px" }}>
                  {cert.name}
                </span>
                <span style={{ color: "#777777", fontSize: "14px" }}>
                  {cert.date}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CONTACT ── */}
      <section
        id="contact"
        ref={contactRef}
        style={{
          padding: "100px clamp(20px, 5vw, 80px)",
          textAlign: "center",
          opacity: 0,
          transform: "translateY(20px)",
          transition: "opacity 0.6s ease, transform 0.6s ease",
        }}
      >
        <div style={{ maxWidth: "640px", margin: "0 auto" }}>
          <div
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "6px",
              marginBottom: "24px",
            }}
          >
            <span
              style={{
                width: "6px",
                height: "6px",
                borderRadius: "50%",
                background: "#4ade80",
                display: "inline-block",
              }}
            />
            <span style={{ color: "#999999", fontSize: "14px" }}>
              Open to work · Immediately available
            </span>
          </div>

          <p
            style={{
              color: "#aaaaaa",
              fontSize: "15px",
              letterSpacing: "4px",
              textTransform: "uppercase",
              marginBottom: "16px",
            }}
          >
            Contact
          </p>

          <h2
            style={{
              fontSize: "clamp(28px, 4vw, 48px)",
              fontWeight: 300,
              letterSpacing: "-1.5px",
              color: "#ffffff",
              marginBottom: "16px",
              lineHeight: 1.15,
            }}
          >
            Let&apos;s build something that{" "}
            <span style={{ color: "#e8d5b0" }}>actually</span> works.
          </h2>

          <p
            style={{
              color: "#999999",
              fontSize: "14px",
              lineHeight: 1.7,
              marginBottom: "40px",
            }}
          >
            Open to full-time roles, freelance projects, contracts, and
            consulting. Globally flexible and immediately available.
          </p>

          {/* Work With Me */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr 1fr",
              gap: "12px",
              marginBottom: "40px",
            }}
          >
            {[
              {
                title: "Full-Time Roles",
                desc: "Looking for a team where I can build and ship AI systems.",
              },
              {
                title: "Freelance Projects",
                desc: "Short or long-term. I work fast and deliver.",
              },
              {
                title: "Contract & Consulting",
                desc: "Advisory, audits, and hands-on contract work.",
              },
            ].map((item) => (
              <div
                key={item.title}
                style={{
                  border: "0.5px solid rgba(255,255,255,0.07)",
                  borderRadius: "10px",
                  padding: "20px 16px",
                  textAlign: "center",
                }}
              >
                <h3
                  style={{
                    color: "#ffffff",
                    fontSize: "15px",
                    fontWeight: 400,
                    marginBottom: "8px",
                  }}
                >
                  {item.title}
                </h3>
                <p
                  style={{
                    color: "#999999",
                    fontSize: "15px",
                    lineHeight: 1.6,
                  }}
                >
                  {item.desc}
                </p>
              </div>
            ))}
          </div>

          {/* Buttons */}
          <div
            style={{
              display: "flex",
              gap: "12px",
              justifyContent: "center",
              marginBottom: "32px",
              flexWrap: "wrap",
            }}
          >
            <a
              href="https://mail.google.com/mail/?view=cm&to=shreyansh.kanoongo@gmail.com"
              target="_blank"
              rel="noopener noreferrer"
              style={{
                background: "#ffffff",
                color: "#0a0a0a",
                borderRadius: "100px",
                padding: "12px 32px",
                fontSize: "15px",
                fontWeight: 500,
                textDecoration: "none",
                transition: "opacity 0.2s ease",
                display: "inline-block",
              }}
              onMouseEnter={(e) =>
                ((e.target as HTMLElement).style.opacity = "0.85")
              }
              onMouseLeave={(e) =>
                ((e.target as HTMLElement).style.opacity = "1")
              }
            >
              Send an Email
            </a>
            <a
              href="https://calendly.com/shreyansh-kanoongo"
              target="_blank"
              rel="noopener noreferrer"
              style={{
                border: "0.5px solid rgba(255,255,255,0.15)",
                color: "#888888",
                borderRadius: "100px",
                padding: "12px 32px",
                fontSize: "15px",
                textDecoration: "none",
                transition: "all 0.2s ease",
                display: "inline-block",
              }}
              onMouseEnter={(e) => {
                (e.target as HTMLElement).style.borderColor =
                  "rgba(255,255,255,0.3)";
                (e.target as HTMLElement).style.color = "#cccccc";
              }}
              onMouseLeave={(e) => {
                (e.target as HTMLElement).style.borderColor =
                  "rgba(255,255,255,0.15)";
                (e.target as HTMLElement).style.color = "#cccccc";
              }}
            >
              Book a Call
            </a>
          </div>

          {/* Phone */}
          <p style={{ color: "#777777", fontSize: "15px", marginBottom: "24px" }}>
            +91-7357182862
          </p>

          {/* Social links with icons */}
          <div
            style={{
              display: "flex",
              gap: "10px",
              justifyContent: "center",
              flexWrap: "wrap",
              marginBottom: "16px",
            }}
          >
            {[
              {
                label: "LinkedIn",
                href: "https://linkedin.com/in/shreyansh-kanoongo2005",
                icon: (
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/>
                    <rect x="2" y="9" width="4" height="12"/>
                    <circle cx="4" cy="4" r="2"/>
                  </svg>
                ),
              },
              {
                label: "Instagram",
                href: "https://instagram.com/_shreyanshh._",
                icon: (
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
                    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
                    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/>
                  </svg>
                ),
              },
              {
                label: "GitHub",
                href: "https://github.com/shreyanshkanoongo-git",
                icon: (
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"/>
                  </svg>
                ),
              },
              {
                label: "Email",
                href: "https://mail.google.com/mail/?view=cm&to=shreyansh.kanoongo@gmail.com",
                icon: (
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
                    <polyline points="22,6 12,13 2,6"/>
                  </svg>
                ),
              },
              {
                label: "Download CV",
                href: "/shreyansh-cv.pdf",
                icon: (
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
                    <polyline points="7 10 12 15 17 10"/>
                    <line x1="12" y1="15" x2="12" y2="3"/>
                  </svg>
                ),
              },
            ].map((link) => (
              <a
                key={link.label}
                href={link.href}
                target={link.href.startsWith("mailto") || link.href.startsWith("/") ? undefined : "_blank"}
                rel={link.href.startsWith("mailto") || link.href.startsWith("/") ? undefined : "noopener noreferrer"}
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "7px",
                  color: "#888888",
                  fontSize: "13px",
                  textDecoration: "none",
                  border: "0.5px solid rgba(255,255,255,0.1)",
                  borderRadius: "100px",
                  padding: "8px 16px",
                  transition: "all 0.2s ease",
                }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLElement).style.color = "#ffffff";
                  (e.currentTarget as HTMLElement).style.borderColor = "rgba(255,255,255,0.25)";
                  (e.currentTarget as HTMLElement).style.background = "rgba(255,255,255,0.04)";
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLElement).style.color = "#888888";
                  (e.currentTarget as HTMLElement).style.borderColor = "rgba(255,255,255,0.1)";
                  (e.currentTarget as HTMLElement).style.background = "transparent";
                }}
              >
                {link.icon}
                {link.label}
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer
        style={{
          borderTop: "0.5px solid rgba(255,255,255,0.06)",
          padding: "24px clamp(20px, 5vw, 80px)",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          background: "#0a0a0a",
        }}
      >
        <span style={{ color: "#555555", fontSize: "13px" }}>
          © 2026 Shreyansh Kanoongo
        </span>
        <span style={{ color: "#444444", fontSize: "12px", letterSpacing: "1px" }}>
          Built by Shreyansh
        </span>
      </footer>
    </main>
  );
}
