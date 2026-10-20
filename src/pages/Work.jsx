import { useNavigate } from 'react-router-dom';
import { useProjectWindowStore } from '../store/projectWindowStore';
import { projects } from '../constants/projectsConfig';

const skillGroups = [
    {
        label: 'Frontend',
        skills: ['React', 'Next.js', 'JavaScript', 'TypeScript', 'Tailwind CSS', 'Framer Motion', 'GSAP', 'Three.js', 'HTML', 'CSS'],
    },
    {
        label: 'Backend & Data',
        skills: ['Node.js', 'Express', 'MongoDB', 'JWT/Bcrypt', 'REST APIs'],
    },
    {
        label: 'CMS & Platforms',
        skills: ['Wix', 'WordPress', 'Shopify'],
    },
    {
        label: 'Tooling & Deployment',
        skills: ['Git', 'GitHub', 'Vite', 'Vercel', 'Render'],
    },
    {
        label: 'Design',
        skills: ['Figma', 'Responsive & Accessible UI', 'Lighthouse Audits'],
    },
];

const Work = () => {
    const navigate = useNavigate();
    const openProject = useProjectWindowStore((s) => s.openProject);

    const handleProjectClick = (slug) => {
        openProject(slug);
        navigate(`/work/${slug}`);
    };

    return (
        <div className="flex flex-col gap-6">
            <div>
                <h1 className="text-3xl font-display text-[var(--color-text-primary)] mb-2">Work</h1>
                <p className="text-[var(--color-text-secondary)]">
                    Explore selected projects with stack choices and delivery outcomes. This section highlights both client engagements and personal builds.
                </p>
            </div>

            {/* Project list */}
            <div className="border border-[var(--color-border)] rounded-md overflow-hidden">
                <div className="bg-[var(--color-surface-elevated)] px-4 py-2">
                    <span className="text-xs tracking-wider text-[var(--color-text-secondary)] font-medium">
                        PROJECT LIST
                    </span>
                </div>
                <div className="flex flex-col divide-y divide-[var(--color-border)]">
                    {projects.map((project) => (
                        <button
                            key={project.slug}
                            onClick={() => handleProjectClick(project.slug)}
                            className="px-4 py-3 text-left hover:bg-[var(--color-surface-elevated)] transition"
                        >
                            <span className="text-[var(--color-text-primary)]">{project.name}</span>
                            <span className="text-[var(--color-text-secondary)]">
                                {' '}
                                • {project.role}
                                {project.dates && ` • ${project.dates}`}
                                {' '}• {project.type}
                            </span>
                        </button>
                    ))}
                </div>
            </div>

            {/* Skills */}
            <div className="border border-[var(--color-border)] rounded-md overflow-hidden">
                <div className="bg-[var(--color-surface-elevated)] px-4 py-2">
                    <span className="text-xs tracking-wider text-[var(--color-text-secondary)] font-medium">
                        SKILLS
                    </span>
                </div>
                <div className="flex flex-col divide-y divide-[var(--color-border)]">
                    {skillGroups.map((group) => (
                        <div
                            key={group.label}
                            className="px-4 py-3 flex flex-col gap-2 sm:flex-row sm:gap-4"
                        >
                            <span className="text-xs tracking-wider text-[var(--color-text-secondary)] sm:w-40 sm:shrink-0 sm:pt-1">
                                {group.label.toUpperCase()}
                            </span>
                            <div className="flex flex-wrap gap-2">
                                {group.skills.map((skill) => (
                                    <span
                                        key={skill}
                                        className="px-2 py-1 border border-[var(--color-border)] rounded text-xs text-[var(--color-text-primary)]"
                                    >
                                        {skill}
                                    </span>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default Work;