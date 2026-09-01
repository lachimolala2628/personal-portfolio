export const projects = [
    {
        slug: 'oraanj',
        name: 'Oraanj',
        role: 'Frontend Developer',
        dates: 'April 2023 - June 2023',
        type: 'Freelance',
        visitUrl: '#',
        techStack: ['HTML5', 'CSS3', 'Bootstrap 5', 'JavaScript', 'PHP', 'jQuery'],
        tasks: ['Frontend Development', 'Accessibility', 'Performance Optimization'],
        sections: [
            {
                heading: 'What It Does',
                body: "A responsive website for a UK-based interior design company, built with their largely older, less tech-savvy user base in mind — fast to load, easy to navigate, and consistent across browsers.",
            },
            {
                heading: 'Origin',
                body: 'Multigraphics Group brought me on for this project through a referral. It was a 3-month engagement, April to June 2023, designing and developing the site end-to-end from Figma to production.',
            },
            {
                heading: 'Tech & Architecture',
                body: 'Built with HTML5, CSS3, Bootstrap 5, JavaScript, PHP, and jQuery to match the existing workflow. Restructured semantic HTML and applied lazy-loading and layout-shift reduction, raising the accessibility score to 97/100.',
            },
            {
                heading: 'Challenges',
                body: 'The old codebase was messy and I had to work around its existing structure. The client changed content and design direction frequently mid-project, all within a tight 3-month deadline that required daily communication.',
            },
        ],
        visuals: [
            { type: 'image', label: 'Slide 1 • Image' },
            { type: 'image', label: 'Slide 2 • Image' },
            { type: 'image', label: 'Slide 3 • Image' },
            { type: 'image', label: 'Slide 4 • Image' },
        ],
    },
    {
        slug: 'lume-studio',
        name: 'Lume-Studio',
        role: 'Frontend Developer',
        dates: '',
        type: 'Personal',
        visitUrl: '#',
        techStack: ['React', 'Vite', 'TypeScript', 'Puter', 'Claude API', 'Gemini API'],
        tasks: ['Frontend Development', 'AI Integration'],
        features: [
            '2D → 3D AI Rendering',
            'Multi-Model AI Integration',
            'Serverless Workers (Puter)',
            'Authentication System',
            'Minimal UI Design',
            'Fully Responsive',
        ],
        sections: [
            {
                heading: 'What It Does',
                body: 'An AI-powered architectural visualization platform that transforms 2D floor plans into photorealistic 3D renders using advanced AI models, built for performance, scalability, and modern cloud architecture.',
            },
            {
                heading: 'Origin',
                body: 'Turning a flat floor plan into a photorealistic render usually means hours of manual 3D modeling. I wanted to see if AI could shortcut that process entirely.',
            },
            {
                heading: 'Tech & Architecture',
                body: 'Built with React, Vite, and TypeScript on the frontend. Puter handles serverless workers and KV storage, with Claude and Gemini integrated for the AI rendering pipeline, all running on persistent cloud hosting.',
            },
            {
                heading: 'Challenges',
                body: "Integrating multiple AI models (Claude and Gemini) reliably, and building on Puter's serverless workers and KV storage architecture for the first time.",
            },
        ],
        visuals: [
            { type: 'image', label: 'Slide 1 • Image' },
            { type: 'image', label: 'Slide 2 • Image' },
            { type: 'image', label: 'Slide 3 • Image' },
            { type: 'image', label: 'Slide 4 • Image' },
        ],
    },
    {
        slug: 'inkwell',
        name: 'Inkwell',
        role: 'Frontend Developer',
        dates: '',
        type: 'Personal',
        visitUrl: '#',
        techStack: ['Next.js', 'TypeScript', 'Tailwind CSS', 'Clerk', 'Vapi AI', 'Vercel Blob', 'MongoDB'],
        tasks: ['Frontend Development', 'AI Integration', 'Full Stack Development'],
        features: [
            'PDF Upload & Ingestion',
            'Voice-First Conversations',
            'AI Voice Personas',
            'Smart Summaries & Insights',
            'Session Transcripts',
            'Library Management',
            'Authentication & Subscription',
        ],
        sections: [
            {
                heading: 'What It Does',
                body: 'An AI-powered platform for real-time voice conversations with your PDFs and e-books — ask a question out loud, get a spoken answer back, cutting document review time by 70% per session.',
            },
            {
                heading: 'Origin',
                body: "Reading long documents cover to cover is slow. I wanted a way to just talk to a document instead — ask questions out loud and get real answers back.",
            },
            {
                heading: 'Tech & Architecture',
                body: 'Built with Next.js, TypeScript, and Tailwind CSS. Clerk handles authentication, Vapi AI powers real-time voice interaction, Vercel Blob handles scalable file storage, and MongoDB stores session and library data.',
            },
            {
                heading: 'Challenges',
                body: 'Resolved 5+ critical deployment blockers to ship a production-ready app, including Turbopack/Webpack conflicts, pdfjs-dist v5 incompatibility, and Clerk auth redirect loops.',
            },
        ],
        visuals: [
            { type: 'image', label: 'Slide 1 • Image' },
            { type: 'image', label: 'Slide 2 • Image' },
            { type: 'image', label: 'Slide 3 • Image' },
            { type: 'image', label: 'Slide 4 • Image' },
        ],
    },
    {
        slug: 'ai-resume-analyzer',
        name: 'AI Resume Analyzer',
        role: 'Frontend Developer',
        dates: '',
        type: 'Personal',
        visitUrl: '#',
        techStack: ['React', 'Vite', 'Puter.js', 'Zustand', 'TypeScript', 'Tailwind CSS', 'React Router v7'],
        tasks: ['Frontend Development', 'AI Integration'],
        features: [
            'AI-powered resume analysis',
            'Fully responsive design',
            'ATS score with section-by-section feedback',
        ],
        sections: [
            {
                heading: 'What It Does',
                body: 'An AI-powered resume analyzer with a fully responsive UI and smooth animations, reducing resume review time to under 15 seconds. Gives users an ATS score along with feedback on exactly which sections need work.',
            },
            {
                heading: 'Origin',
                body: 'Resume feedback is usually slow or vague. I wanted something that gives instant, specific feedback tied to what actually gets flagged by ATS systems.',
            },
            {
                heading: 'Tech & Architecture',
                body: 'Built with React, Vite, and TypeScript. Puter.js handles file handling and AI-driven feedback through a modular, type-safe architecture. Zustand manages global state, keeping the bundle size minimal instead of reaching for a heavier state library.',
            },
            {
                heading: 'Challenges',
                body: 'First time combining Zustand, Puter for storage, and AI integration together in one architecture.',
            },
        ],
        visuals: [
            { type: 'image', label: 'Slide 1 • Image' },
            { type: 'image', label: 'Slide 2 • Image' },
            { type: 'image', label: 'Slide 3 • Image' },
            { type: 'image', label: 'Slide 4 • Image' },
        ],
    },
    {
        slug: 'lynk',
        name: 'Lynk',
        role: 'Frontend Developer',
        dates: '',
        type: 'Personal',
        visitUrl: '#',
        techStack: ['React', 'Node.js', 'MongoDB', 'TanStack Query'],
        tasks: ['Full Stack Development'],
        features: ['Shorten URLs', 'Custom URLs', 'Authentication', 'Responsive Design', 'Minimal UI'],
        sections: [
            {
                heading: 'What It Does',
                body: 'A modern URL shortener that lets users create shortened and custom links, protected by secure authentication, with tracking on link performance and reliability.',
            },
            {
                heading: 'Origin',
                body: 'A classic project to build, but a good excuse to work with authentication and server-state caching for the first time.',
            },
            {
                heading: 'Tech & Architecture',
                body: 'Built with React and Node.js on top of MongoDB. A JWT and Bcrypt-based authentication system secures user accounts, and TanStack Query handles server-state caching, cutting redundant network requests by 35% and improving perceived load time across devices.',
            },
            {
                heading: 'Challenges',
                body: 'First time working with JWT-based authentication and TanStack Query together — both took some getting used to.',
            },
        ],
        visuals: [
            { type: 'image', label: 'Slide 1 • Image' },
            { type: 'image', label: 'Slide 2 • Image' },
            { type: 'image', label: 'Slide 3 • Image' },
            { type: 'image', label: 'Slide 4 • Image' },
        ],
    },
    {
        slug: 'iphone-clone',
        name: 'iPhone Clone',
        role: 'Frontend Developer',
        dates: '',
        type: 'Personal',
        visitUrl: '#',
        techStack: ['React', 'Vite', 'Tailwind CSS', 'Three.js', 'GSAP', 'JavaScript'],
        tasks: ['Frontend Development', '3D Development'],
        description: 'A personal recreation of the iPhone marketing site, exploring 3D web development with Three.js alongside React and GSAP for animation.',
        visuals: [
            { type: 'image', label: 'Slide 1 • Image' },
            { type: 'image', label: 'Slide 2 • Image' },
            { type: 'image', label: 'Slide 3 • Image' },
            { type: 'image', label: 'Slide 4 • Image' },
        ],
    },
];

export const getProjectBySlug = (slug) => projects.find((p) => p.slug === slug);