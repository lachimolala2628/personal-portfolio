export const projects = [
    {
        slug: 'oraanj',
        name: 'Oraanj',
        role: 'Frontend Developer',
        dates: 'Month Year – Month Year',
        type: 'Freelance',
        visitUrl: '#',
        techStack: ['React', 'Tailwind CSS', 'Framer Motion'],
        tasks: ['Frontend Development', 'UI Implementation'],
        description: 'Placeholder description of the Oraanj project — what it does, the problem it solved, your role in it.',
        visuals: [
            { type: 'image', label: 'Slide 1 • Image' },
            { type: 'image', label: 'Slide 2 • Image' },
        ],
    },
    {
        slug: 'holyherbs',
        name: 'HolyHerbs',
        role: 'Frontend Developer',
        dates: 'Month Year – Month Year',
        type: 'Freelance',
        visitUrl: '#',
        techStack: ['WordPress', 'Razorpay'],
        tasks: ['Frontend Development', 'E-commerce Integration'],
        description: 'Placeholder description of the HolyHerbs project.',
        visuals: [
            { type: 'image', label: 'Slide 1 • Image' },
            { type: 'image', label: 'Slide 2 • Image' },
        ],
    },
    {
        slug: 'iphone-clone',
        name: 'iPhone Clone',
        role: 'Frontend Developer',
        dates: 'Month Year',
        type: 'Personal',
        visitUrl: '#',
        techStack: ['React', 'Three.js'],
        tasks: ['3D Development', 'Frontend Development'],
        description: 'Placeholder description of the iPhone clone project — Three.js exploration.',
        visuals: [
            { type: 'image', label: 'Slide 1 • Image' },
            { type: 'image', label: 'Slide 2 • Image' },
        ],
    },
];

export const getProjectBySlug = (slug) => projects.find((p) => p.slug === slug);