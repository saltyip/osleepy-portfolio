export const projects = [
  {
    id: 2,
    name: "JWT Redis Auth API",
    repo: "jwt-redis-auth-api",
    tags: ["Node.js", "Express", "JWT", "Redis", "REST API"],
    description: "Auth API built to understand session state tradeoffs. Implements short-lived access tokens and Redis-backed refresh token rotation to balance stateless speed with strict invalidation control.",
    github: "https://github.com/saltyip/jwt-redis-auth-api",
    hasLiveDemo: false,
    liveDemoUrl: "",
    hasDevlog: true,
    devlogUrl: "https://devlog-app-beta.vercel.app/project/jwt-redis-auth-api",
    highlights: [
      "Token Rotation: 15-min access / 7-day refresh lifecycle. Old tokens are SET-blacklisted in Redis with remaining-TTL expiry to bound memory growth.",
      "O(1) Blacklist: Blacklist check runs before any PostgreSQL hit, ensuring revoked sessions are dropped in sub-millisecond time.",
      "Distributed Rate Limiting: IP-based sliding window rate limits stored in Redis to prevent brute-force and DDoS attempts across multiple API instances."
    ]
  },
  {
    id: 3,
    name: "Email Queue Service",
    repo: "emailqueue",
    tags: ["Node.js", "Express", "BullMQ", "Redis", "PostgreSQL", "Nodemailer"],
    description: "Asynchronous job processing system designed to decouple slow third-party API calls (email delivery) from the main request thread, ensuring predictable API latency.",
    github: "https://github.com/saltyip/emailqueue",
    hasLiveDemo: false,
    liveDemoUrl: "",
    hasDevlog: true,
    devlogUrl: "https://devlog-app-beta.vercel.app/project/emailqueue",
    highlights: [
      "Resiliency: BullMQ worker implements exponential backoff with jitter to avoid thundering herd problems during SMTP outages.",
      "Auditability: Every job transition (active, failed, completed) is atomically logged to PostgreSQL for reliable dead-letter queue inspection.",
      "Concurrency Control: Tuned worker concurrency to prevent Redis connection pool exhaustion under heavy load spikes."
    ]
  },
  {
    id: 5,
    name: "URL Shortener",
    repo: "urlshortnercongential",
    tags: ["Node.js", "PostgreSQL", "Redis", "JWT"],
    description: "High-read URL redirector designed to handle heavy traffic loads by aggressively caching resolutions and minimizing database round-trips.",
    github: "https://github.com/saltyip/urlshortnercongential",
    hasLiveDemo: false,
    liveDemoUrl: "",
    hasDevlog: true,
    devlogUrl: "https://devlog-app-beta.vercel.app/project/urlshortnercongential",
    highlights: [
      "Cache-Aside Pattern: Redis handles 99% of read traffic for shortcode resolutions, gracefully degrading to PostgreSQL on cache misses.",
      "Indexing Strategy: B-Tree index on the shortcode column in PostgreSQL to ensure O(log N) lookups when the cache is cold.",
      "Collision Avoidance: Base-62 encoding using database auto-incrementing IDs to guarantee zero hash collisions, avoiding the birthday paradox."
    ]
  },
  {
    id: 4,
    name: "Nudge CLI Tool",
    repo: "nudge",
    tags: ["Node.js", "Shell", "CLI", "Arch Linux"],
    description: "A low-overhead CLI daemon built to run persistently in Linux environments without draining resources or relying on heavy electron/browser runtimes.",
    github: "https://github.com/saltyip/nudge",
    hasLiveDemo: false,
    liveDemoUrl: "",
    hasDevlog: false,
    devlogUrl: "https://devlog-app-beta.vercel.app/project/nudge",
    highlights: [
      "Zero-Dependency Daemon: Runs as a lightweight detached background process, communicating with the CLI via IPC.",
      "Deterministic Parsing: Rule-based natural language parser avoids ML overhead, instantly translating temporal phrases to strict cron schedules.",
      "System Integration: Hooks into Linux desktop environments using native bindings for non-blocking notifications."
    ]
  },
  {
    id: 1,
    name: "DNS Resolver",
    repo: "dns-resolver",
    tags: ["Node.js", "UDP", "Networking", "DNS"],
    description: "A custom DNS resolver implementation built from scratch using Node.js UDP sockets to understand packet parsing and low-level networking protocols.",
    github: "https://github.com/saltyip/dns-resolver",
    hasLiveDemo: false,
    liveDemoUrl: "",
    hasDevlog: true,
    devlogUrl: "https://devlog-app-beta.vercel.app/project/dns-resolver",
    highlights: [
      "Binary Protocol Parsing: Manually constructed and parsed DNS query/response packets at the byte level using Node.js Buffers.",
      "UDP Sockets: Implemented connectionless communication using the datagram (dgram) module to interact directly with authoritative nameservers.",
      "RFC Compliance: Adheres to RFC 1035 specifications for standard DNS message formats and header flag manipulation."
    ]
  },
  {
    id: 6,
    name: "Dotfiles & Linux Tooling",
    repo: "saltydotfiles",
    tags: ["Shell", "Lua", "Python", "Neovim"],
    description: "My personal developer environment, optimized for terminal-centric workflows and minimal latency. Focuses on composability over monolithic tools.",
    github: "https://github.com/saltyip/saltydotfiles",
    hasLiveDemo: false,
    liveDemoUrl: "",
    hasDevlog: false,
    devlogUrl: "https://devlog-app-beta.vercel.app/project/saltydotfiles",
    highlights: [
      "Neovim Architecture: Lazy-loaded plugin architecture utilizing lazy.nvim to maintain < 50ms startup times.",
      "Shell Optimization: Fish shell configured with asynchronous prompt rendering and command memoization.",
      "Tiling WM: Keyboard-driven tiling window management configured for zero-mouse navigation."
    ]
  }
];
