/* ==========================================================================
   PORTFOLIO CONTENT — edit this file only; the design never needs touching.
   - Images live in assets/img/ (a 1800px file "name.webp" and an 800px "name-sm.webp").
   - Leave a field out (or set it to "") and the site simply hides it.
   - Items marked  // VERIFY  were inferred from folder names — please confirm.
   ========================================================================== */
window.PORTFOLIO = {

  site: {
    name: "Rehan Janjua",
    role: "3D artist · designer · developer · writer",
    url: "https://rehanjanjua.github.io/Portfolio/",
    location: "Rawalpindi, Pakistan", // from your old site — VERIFY
    year: 2026
  },

  hero: {
    eyebrow: "Portfolio · 2026",
    headline: "From Blender renders to assembly language.",
    intro:
      "Six years of making things: 3D renders, graphic design, games, web apps, AI tools " +
      "and low-level code. I also write — a book on psychology, plus research on AI, finance and policy."
  },

  about: {
    lead: "I work across disciplines that rarely meet in one person.",
    paragraphs: [
      "I started with 3D modelling and animation, moved into graphic design, then writing, then code. " +
      "Each one changed how I approach the others — a render taught me about light, a logo about restraint, a program about structure.",
      "Today that spans Blender scenes and simulations, games and web apps, AI agents and automation, and projects in C, C++, C#, Go, Ruby, Java, Lua, Python, JavaScript and NASM assembly. " +
      "Alongside the creative and technical work I study business, finance, economics, accounting and management sciences, and I'm currently pursuing my education.",
      "I'm a freelancer. If you have something to model, design, build or write, I'd like to hear about it."
    ],
    facts: [
      ["Experience", "6 years"],
      ["Based in", "Rawalpindi, Pakistan"],
      ["Working as", "Freelancer"],
      ["Languages coded in", "13"]
    ]
  },

  /* ---------- Categories for the visual work filter ---------- */
  categories: [
    { id: "all", label: "All" },
    { id: "3d", label: "3D & Render" },
    { id: "vfx", label: "Simulation & VFX" },
    { id: "design", label: "Graphic Design" }
  ],

  /* ---------- Selected work (image-led). ratio = width/height of the cover ---------- */
  projects: [
    {
      id: "crystal-monolith", title: "Crystal Monolith", category: "3d", type: "3D scene · Render",
      cover: "crystal", ratio: 1.31, featured: true,
      alt: "A glowing green crystal cluster floating inside two curved dark arches, with a tiny human figure standing below for scale.",
      description: "A floating crystal cluster held inside a pair of monumental arches, with a small human figure for scale and green-lit fog behind.",
      tools: ["Blender"], role: "Concept, modelling, lighting and rendering"
    },
    {
      id: "porsche-911", title: "911 in Concrete Shadows", category: "3d", type: "3D vehicle · Render",
      cover: "porsche", ratio: 1.78,
      alt: "A white Porsche 911 parked on asphalt beneath a concrete beam structure casting long diagonal shadows.",
      description: "A white 911 under a concrete canopy, lit by low sun so the beams cut long diagonal shadows across the wall and road.",
      tools: ["Blender"], role: "Modelling, materials, lighting and rendering"
    },
    {
      id: "armoured-vehicle", title: "Eight-Wheeled Armoured Vehicle", category: "3d", type: "Hard-surface model · Render",
      cover: "armoured-vehicle", ratio: 1.78,
      alt: "A grey digital-camouflage eight-wheeled armoured vehicle with a turret gun, standing in dry grass in front of a blurred desert canyon.",
      description: "A hard-surface wheeled armoured vehicle with digital camouflage, hazard decals and detailed hull panels, set in dry grass.",
      tools: ["Blender"], role: "Modelling, texturing and rendering"
    },
    {
      id: "galaxy-particles", title: "Galaxy of Particles", category: "vfx", type: "Particle simulation",
      cover: "galaxy-particles", ratio: 1,
      alt: "A tilted spiral galaxy made of glowing red, yellow and blue particles on a black background.",
      description: "A spiral galaxy built from coloured particles, softly defocused for a lens-like feel.",
      tools: ["Blender"], role: "Simulation and rendering"
    },
    {
      id: "ember-ring", title: "Ember Ring", category: "vfx", type: "Dust & particle study",
      cover: "ember-ring", ratio: 1,
      alt: "A thin grey ring of smoke on black with bursts of orange ember particles at several points.",
      description: "A stylised ring of dust with bursts of glowing embers breaking off along its path.",
      tools: ["Blender"], role: "Simulation and rendering"
    },
    {
      id: "car-in-forest", title: "Car in Forest", category: "3d", type: "3D scene · Render",
      cover: "car-in-forest", ratio: 1.78,
      alt: "A blue sports car parked in a dense green forest, partly hidden behind a foreground tree.",
      description: "A blue sports car parked in a lush forest. Alloy rims and a glossy finish against earthy ground, with a foreground tree partly covering the car.",
      tools: ["Blender"], role: "Modelling, lighting and rendering"
    },
    {
      id: "lake-side", title: "Lake Side", category: "3d", type: "3D scene · Render",
      cover: "lake-side", ratio: 1.78,
      alt: "A weathered wooden dock extending over clear green water with a book and a water bottle resting on it.",
      description: "A wooden dock over clear green water, with a book and a bottle left behind. The study is in aged wood, rippling water and submerged rocks.",
      tools: ["Blender"], role: "Modelling, lighting and rendering"
    },
    {
      id: "tesla-model-x", title: "Tesla Model X", category: "3d", type: "3D vehicle · Render",
      cover: "tesla-model-x", ratio: 1.78,
      alt: "A silver Tesla Model X in a dim futuristic garage reflected in a polished floor.",
      description: "A silver Model X in a dimly lit, futuristic garage. The polished floor carries the reflections and the moody lighting does the rest.",
      tools: ["Blender"], role: "Modelling, lighting and rendering"
    },
    {
      id: "man-and-fears", title: "Man Standing in Front of His Fears", category: "3d", type: "Digital scene",
      cover: "man-and-fears", ratio: 1,
      alt: "A lone figure stands on rugged cliffs looking out at a vast ocean under a deep blue starry sky.",
      description: "A lone figure on rugged cliffs facing a vast ocean. Illuminated rock against shadowed terrain and a starry sky give the scene its quiet, surreal feel.",
      tools: ["Blender", "Photoshop"], role: "Scene creation and finishing" // VERIFY tools
    },
    {
      id: "calligraphy", title: "Arabic Calligraphy", category: "design", type: "Digital artwork",
      cover: "calligraphy", ratio: 1,
      alt: "Golden Arabic calligraphy on a dark geometric patterned background, split into three glowing panels.",
      description: "Golden Arabic calligraphy over a dark geometric pattern, split into three panels with an illuminated glow.",
      tools: ["Photoshop", "Illustrator"], role: "Design and composition" // VERIFY tools
    },
    {
      id: "name-logo", title: "3D Name Logo", category: "design", type: "Logo · 3D lettering",
      cover: "name-logo", ratio: 1,
      alt: "The name Rehan in futuristic golden 3D lettering on a background of glowing metallic cubes.",
      description: "A personal wordmark in futuristic golden 3D lettering, surrounded by reflective metallic cubes with glowing edges.",
      tools: ["Blender", "Illustrator"], role: "Design and rendering" // VERIFY tools
    }
  ],

  /* ---------- Code & systems — no screenshots yet, so shown as an index.
     Add  image: "filename-without-ext"  (+ link: "https://…") to any entry when you have one. ---------- */
  codeGroups: [
    { id: "systems", label: "Low-level · NASM", note: "Assembly is the hard way to do everything.",
      items: [
        { title: "Attempt at Simple OS", desc: "An attempt at building a simple operating system." },
        { title: "TalkASM", desc: "A communication project written in assembly." }, // VERIFY
        { title: "Terminal System Monitor", desc: "A system monitor that runs in the terminal." },
        { title: "Terminal Snake Game", desc: "The classic snake game, in the terminal." },
        { title: "Scientific Calculator", desc: "A scientific calculator." },
        { title: "Number Converter", desc: "A converter between number systems." }, // VERIFY
        { title: "CRUD", desc: "Create, read, update and delete operations." },
        { title: "19 Projects in 1 Day", desc: "A one-day sprint of nineteen small programs." }
      ] },
    { id: "games", label: "Games & Simulation",
      items: [
        { title: "FORGE FPS Builder", desc: "A first-person shooter builder." },
        { title: "EVOLVE", desc: "A life and evolution simulator." },
        { title: "Void OS", desc: "A web-based operating-system concept." }, // VERIFY
        { title: "Noir Grand", desc: "A game project." }, // VERIFY
        { title: "Physics Engine", desc: "A physics engine." },
        { title: "Audio Visualizer", desc: "Visuals driven by audio." },
        { title: "Fidget Spinner", desc: "An interactive fidget spinner." },
        { title: "Airdraw", desc: "Drawing in the air." } // VERIFY
      ] },
    { id: "ai", label: "AI & Automation",
      items: [
        { title: "Nexus AI", desc: "An AI project." }, // VERIFY
        { title: "AI Document Analyzer", desc: "Document analysis built on an AI API." },
        { title: "AI Summarizer", desc: "Summarises text with AI." },
        { title: "StudyAI", desc: "An AI study assistant." }, // VERIFY
        { title: "Real-Time Emotion Detector", desc: "Detects emotion in real time." },
        { title: "Handwritten Recognition", desc: "Optical recognition of handwriting." }, // VERIFY name
        { title: "AI Agents", desc: "Agent experiments." },
        { title: "n8n Templates and Workflows", desc: "Automation workflows built in n8n." },
        { title: "System Prompts of Popular Models", desc: "A collection of system prompts from popular models." }
      ] },
    { id: "apps", label: "Apps & Tools",
      items: [
        { title: "Cipher Vault", desc: "A cipher and vault tool." }, // VERIFY
        { title: "LifeOS", desc: "A life-management system." }, // VERIFY
        { title: "Life Plan", desc: "A planning tool." }, // VERIFY
        { title: "Stock Market Analyzer", desc: "Analysis of stock-market data." },
        { title: "Finance Projects", desc: "A set of finance-related programs." },
        { title: "PC Builder", desc: "A PC-building assistant." },
        { title: "Resume Generator", desc: "Generates resumes." },
        { title: "InkPad", desc: "A notes app." }, // VERIFY
        { title: "LAN Talk", desc: "Chat across a local network." }, // VERIFY
        { title: "Anonymous Voting System", desc: "A voting system that keeps voters anonymous." }
      ] },
    { id: "langs", label: "Language Experiments",
      items: [
        { title: "Casio Calculator in Go", desc: "A Casio-style calculator written in Go." },
        { title: "Bookshelf App in Ruby", desc: "A bookshelf app written in Ruby." },
        { title: "Weather App in Java", desc: "A weather app written in Java." },
        { title: "Lots of Python Projects", desc: "A large collection of Python programs." }
      ] }
  ],

  /* ---------- Writing & research (PDFs live in assets/docs/; delete a  link:  line to unpublish one) ---------- */
  writing: [
    { kind: "Book", link: "assets/docs/the-human-psyche.pdf", title: "The Human Psyche", sub: "Understanding Why We Feel, Think, and Act", date: "2026",
      desc: "A book on envy, jealousy, ego, cruelty, love and the rest of what makes us human, drawing on evolution, neuroscience and development." },
    { kind: "Research paper", link: "assets/docs/the-human-psyche-research-paper.pdf", title: "The Integrative Approach to Human Psychology", sub: "A methodological analysis of The Human Psyche", date: "2026",
      desc: "Examines the book's conclusions on emotional growth and authenticity and how they were reached." },
    { kind: "Research survey", link: "assets/docs/transformers-in-ai.pdf", title: "Transformers in Artificial Intelligence", sub: "Architecture, evolution and what they're actually used for", date: "March 2026",
      desc: "A survey from the 2017 original architecture to early 2026: how it evolved, where it falls short and what comes next." },
    { kind: "Research paper", link: "assets/docs/ai-in-education.pdf", title: "Artificial Intelligence in Education", sub: "Student learning, grading and academic integrity", date: "2026",
      desc: "A detailed paper on how AI tools are changing learning, assessment and academic integrity, with case studies." },
    { kind: "Literature review", link: "assets/docs/ai-in-finance.pdf", title: "Artificial Intelligence in Finance", sub: "A review of ten influential research papers", date: "",
      desc: "Covers the field's history, methods, applications, regulation and open problems, including explainability and governance." },
    { kind: "Policy analysis", link: "assets/docs/pakistan-28th-amendment-bill.pdf", title: "Constitution (Twenty-Eighth Amendment) Bill, 2026", sub: "Economic accountability, fiscal discipline and national development", date: "May 2026",
      desc: "A research paper with proposed legislation for Pakistan, built around Article 239 of the 1973 Constitution." }
  ],

  /* ---------- Skills (from your Skills.txt) ---------- */
  skills: [
    { group: "3D & visual", items: ["3D modelling", "3D animating", "Graphic designing", "Logo / PFP designing", "Image editing", "Video editing & VFX", "UI/UX improvement & layout", "Blender", "Photoshop", "Illustrator"] },
    { group: "Build", items: ["Web designing & developing", "Application development", "Game development (Godot)", "Product / SaaS thinking", "System design thinking", "Visual Studio"] },
    { group: "AI & automation", items: ["AI model development", "AI integration & development", "AI agent development", "Workflow automation", "Prompt engineering", "Model Context Protocol"] },
    { group: "Programming", items: ["HTML", "CSS", "JavaScript (React + Node.js)", "Bootstrap", "Python", "PHP", "C", "C++", "C#", "Java", "Go", "Lua", "Ruby", "NASM"] },
    { group: "Business & analysis", items: ["Finance & business", "Economics", "Accounting", "Management sciences", "Data science & analysis", "Critical thinking", "Tool optimisation"] },
    { group: "Writing & communication", items: ["Content writing", "Copywriting", "Communication", "Digital marketing (basic)", "Learning agility"] },
    { group: "Beyond work", items: ["Chess", "PC building"] }
  ],

  /* ---------- Courses & certificates (verify = link to the issuer's verification page) ---------- */
  certs: [
    { issuer: "Anthropic", items: [
      { title: "Model Context Protocol: Advanced Topics", date: "Mar 23, 2026", file: "assets/docs/certs/anthropic-mcp-advanced.pdf", verify: "https://verify.skilljar.com/c/46qkcwjv6f6u" },
      { title: "Introduction to Model Context Protocol", date: "Mar 23, 2026", file: "assets/docs/certs/anthropic-intro-to-mcp.pdf", verify: "https://verify.skilljar.com/c/jcfi9ujqvqgf" },
      { title: "Claude Code in Action", date: "", file: "assets/docs/certs/anthropic-claude-code-in-action.pdf" },
      { title: "AI Fluency for Creative Work", date: "", file: "assets/docs/certs/anthropic-ai-fluency-creative-work.pdf" } ] },
    { issuer: "Hugging Face", items: [
      { title: "Agents Course — Unit 1: Foundations of Agents", date: "Mar 24, 2026", file: "assets/docs/certs/huggingface-agents-unit1.webp" } ] },
    { issuer: "Microsoft Learn", items: [
      { title: "Understand Microsoft 365 Agents SDK", date: "Mar 24, 2026", file: "assets/docs/certs/microsoft-365-agents-sdk.pdf" } ] },
    { issuer: "Google Cloud", file: "assets/docs/certs/google-cloud-badges.png", fileLabel: "View badges", items: [
      { title: "Gen AI Agents: Transform Your Organization", date: "May 22, 2026" },
      { title: "Gen AI Apps: Transform Your Work", date: "May 22, 2026" },
      { title: "Gen AI: Navigate the Landscape", date: "May 22, 2026" },
      { title: "Gen AI: Unlock Foundational Concepts", date: "May 22, 2026" },
      { title: "Gen AI: Beyond the Chatbot", date: "May 22, 2026" },
      { title: "Introduction to Generative AI", date: "Mar 24, 2026" } ] }
  ],

  /* ---------- Services ---------- */
  services: [
    { title: "3D modelling & rendering", text: "Product, vehicle and environment models, stills and animation in Blender." },
    { title: "Graphic & logo design", text: "Logos, artwork and visual identities for people and small brands." },
    { title: "Web design & development", text: "Fast, responsive websites and web apps, built to be easy to maintain." },
    { title: "Content writing & research", text: "Articles, long-form writing and research-based analysis." }
  ],

  /* ---------- Journey. Years marked with a date come from your old site or your documents;
     undated entries say "Ongoing". Edit freely. ---------- */
  journey: [
    { when: "2021", title: "3D modelling & animation", text: "Started with Blender: scenes, vehicles and renders." },
    { when: "2022", title: "Graphic design", text: "Logos, artwork and digital design in Photoshop and Illustrator." },
    { when: "2023", title: "Content writing", text: "Began writing seriously, the start of the longer work to come." },
    { when: "2024", title: "Coding & web development", text: "Websites, then games, apps and tools." },
    { when: "2025", title: "More programming languages", text: "Went wide and deep, from Go and Ruby to Lua, Java and C#." },
    { when: "Ongoing", title: "Low-level systems in NASM", text: "Assembly projects from terminal tools to an attempt at a simple OS." },
    { when: "Ongoing", title: "Business, finance & economics", text: "Self-directed study across accounting, economics and management sciences." },
    { when: "2026", title: "AI agents & MCP", text: "Completed courses from Anthropic, Hugging Face, Microsoft and Google Cloud on agents, MCP and generative AI." },
    { when: "2026", title: "Research & publishing", text: "Wrote The Human Psyche, plus research papers on AI, finance and constitutional policy." }
  ],

  /* ---------- Contact (all approved by you) ---------- */
  contact: {
    email: "janjuarehan37@gmail.com",
    phone: "+92 330 527 6464",
    discord: "Trj82767",
    social: [
      { label: "Instagram", handle: "@rehan_janjua29", url: "https://www.instagram.com/rehan_janjua29" }
    ]
  }
};
