import { useNavigate } from 'react-router-dom';
import { useProjectWindowStore } from '../store/projectWindowStore';
import { projects } from '../constants/projectsConfig';

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
                    Selected projects — freelance client work and personal builds.
                </p>
            </div>

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
        </div>
    );
}

export default Work;