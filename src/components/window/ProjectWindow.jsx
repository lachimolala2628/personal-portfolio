import { useState } from 'react';
import { Rnd } from 'react-rnd';
import { useProjectWindowStore } from '../../store/projectWindowStore';
import { useZIndexStore } from '../../store/zIndexStore';
import { useIsMobile } from '../../hooks/useIsMobile';
import { getProjectBySlug } from '../../constants/projectsConfig';

const TITLEBAR_HEIGHT = 40;
const NAVBAR_HEIGHT = 48;
const SCREEN_MARGIN = 20;

const ProjectWindow = ({ slug }) => {

    const projectState = useProjectWindowStore((s) => s.openProjects[slug]);
    const closeProject = useProjectWindowStore((s) => s.closeProject);
    const focusProject = useProjectWindowStore((s) => s.focusProject);
    const minimizeProject = useProjectWindowStore((s) => s.minimizeProject);
    const restoreProject = useProjectWindowStore((s) => s.restoreProject);
    const toggleProjectMaximize = useProjectWindowStore((s) => s.toggleProjectMaximize);
    const updateProjectPosition = useProjectWindowStore((s) => s.updateProjectPosition);
    const updateProjectSize = useProjectWindowStore((s) => s.updateProjectSize);
    const activeType = useZIndexStore((s) => s.activeType);
    const activeId = useZIndexStore((s) => s.activeId);
    const { isMobile, windowWidth, windowHeight } = useIsMobile();

    const [mobileTab, setMobileTab] = useState('details');

    const project = getProjectBySlug(slug);

    if (!projectState || !project) return null;

    const isMaximized = projectState.state === 'maximized';
    const isMinimized = projectState.state === 'minimized';
    const isActive = activeType === 'project' && activeId === slug;
    const hasVisitLink = project.visitUrl && project.visitUrl !== '#';

    let currentSize;
    let currentPosition;

    if (isMobile) {
        currentSize = { width: windowWidth - 16, height: windowHeight - NAVBAR_HEIGHT - 16 };
        currentPosition = { x: 8, y: NAVBAR_HEIGHT + 8 };
    } else if (isMaximized) {
        currentSize = { width: '100%', height: '100%' };
        currentPosition = { x: 0, y: 0 };
    } else if (isMinimized) {
        currentSize = { width: projectState.size.width, height: TITLEBAR_HEIGHT };
        currentPosition = projectState.position;
    } else {
        const maxWidth = windowWidth - SCREEN_MARGIN * 2;
        const maxHeight = windowHeight - NAVBAR_HEIGHT - SCREEN_MARGIN * 2;
        const clampedWidth = Math.min(projectState.size.width, maxWidth);
        const clampedHeight = Math.min(projectState.size.height, maxHeight);
        currentSize = { width: clampedWidth, height: clampedHeight };
        currentPosition = projectState.position;
    }

    const handleMinimizeToggle = (e) => {
        e.stopPropagation();
        isMinimized ? restoreProject(slug) : minimizeProject(slug);
    };

    const openVisitLink = () => {
        window.open(project.visitUrl, '_blank', 'noopener,noreferrer');
    };

    const DetailsContent = () => (
        <div className="flex flex-col gap-4">
            <div>
                <h2 className="text-2xl font-display text-[var(--color-text-primary)]">{project.name}</h2>
                <p className="text-xs text-[var(--color-text-secondary)] tracking-wider mt-1">
                    {project.role.toUpperCase()} • {project.dates.toUpperCase()}
                </p>
            </div>

            {hasVisitLink && (
                <button
                    onClick={openVisitLink}
                    className="self-start px-3 py-1.5 border border-[var(--color-border)] rounded text-sm hover:bg-[var(--color-surface-elevated)] transition"
                >
                    Visit Project ↗
                </button>
            )}

            <div>
                <h3 className="text-xs tracking-wider text-[var(--color-text-secondary)] mb-2">TECH STACK</h3>
                <div className="flex flex-wrap gap-2">
                    {project.techStack.map((tech) => (
                        <span key={tech} className="px-2 py-1 border border-[var(--color-border)] rounded text-xs">
                            {tech}
                        </span>
                    ))}
                </div>
            </div>

            <div>
                <h3 className="text-xs tracking-wider text-[var(--color-text-secondary)] mb-2">TASKS</h3>
                <div className="flex flex-wrap gap-2">
                    {project.tasks.map((task) => (
                        <span key={task} className="px-2 py-1 border border-[var(--color-border)] rounded text-xs">
                            {task}
                        </span>
                    ))}
                </div>
            </div>

            <p className="text-[var(--color-text-secondary)] text-sm">{project.description}</p>
        </div>
    );

    const VisualsContent = () => (
        <div className="flex flex-col gap-4">
            {!isMobile && (
                <div className="text-xs tracking-wider text-[var(--color-text-secondary)]">
                    VISUALS &nbsp; {project.visuals.length} SLIDES
                </div>
            )}
            {project.visuals.map((visual, i) => (
                <div key={i} className="border border-[var(--color-border)] rounded overflow-hidden">
                    <div className="h-48 bg-[var(--color-surface-elevated)] flex items-center justify-center">
                        <span className="text-xs text-[var(--color-text-secondary)]">Image placeholder</span>
                    </div>
                    <div className="px-3 py-2 text-xs text-[var(--color-text-secondary)]">
                        Slide {i + 1} • {visual.type === 'image' ? 'Image' : 'Content'}
                    </div>
                </div>
            ))}
        </div>
    );

    return (
        <Rnd
            size={currentSize}
            position={currentPosition}
            onDragStop={(e, d) => { if (!isMobile) updateProjectPosition(slug, { x: d.x, y: d.y }); }}
            onResizeStop={(e, dir, ref, delta, pos) => {
                if (!isMobile) {
                    updateProjectSize(slug, { width: parseInt(ref.style.width), height: parseInt(ref.style.height) });
                    updateProjectPosition(slug, pos);
                }
            }}
            minWidth={isMobile ? undefined : 700}
            minHeight={isMinimized ? TITLEBAR_HEIGHT : 400}
            bounds="parent"
            dragHandleClassName="project-titlebar"
            cancel=".window-controls"
            disableDragging={isMobile || isMaximized}
            enableResizing={!isMobile && !isMaximized && !isMinimized}
            style={{ zIndex: projectState.zIndex }}
            onMouseDown={() => focusProject(slug)}
        >
            <div className="flex flex-col h-full min-h-0 bg-[var(--color-surface)] border border-[var(--color-border)] rounded-[var(--radius-window)] overflow-hidden shadow-[var(--shadow-window)]">
                <div className="project-titlebar flex items-center justify-between px-3 h-[var(--titlebar-height)] bg-[var(--color-surface-elevated)] cursor-move select-none shrink-0">
                    <div className="flex items-center gap-2">
                        <span className="text-sm text-[var(--color-text-primary)] font-medium font-display">{project.name}</span>
                        {isActive && <span className="w-2 h-2 rounded-full bg-orange-500" aria-label="Active window" />}
                    </div>
                    <div className="window-controls flex items-center gap-1">
                        <button onClick={handleMinimizeToggle} className="w-7 h-7 flex items-center justify-center border border-[var(--color-border)] bg-[var(--color-bg)] text-[var(--color-text-primary)] hover:brightness-110 transition" aria-label={isMinimized ? 'Expand' : 'Minimize'}>&minus;</button>
                        <button onClick={(e) => { e.stopPropagation(); toggleProjectMaximize(slug); }} className="w-7 h-7 flex items-center justify-center border border-[var(--color-border)] bg-[var(--color-bg)] text-[var(--color-text-primary)] hover:brightness-110 transition" aria-label="Maximize">
                            <span className="w-2.5 h-2.5 border border-current" />
                        </button>
                        <button onClick={(e) => { e.stopPropagation(); closeProject(slug); }} className="w-7 h-7 flex items-center justify-center border border-[var(--color-border)] bg-[var(--color-bg)] text-[var(--color-text-primary)] hover:brightness-110 transition" aria-label="Close">&times;</button>
                    </div>
                </div>

                {!isMinimized && (
                    isMobile ? (
                        <div className="flex flex-col h-full min-h-0 overflow-hidden">
                            <div className="flex border-b border-[var(--color-border)] shrink-0">
                                <button
                                    onClick={() => setMobileTab('details')}
                                    className={`flex-1 py-2 text-xs tracking-wider transition ${mobileTab === 'details'
                                        ? 'bg-[var(--color-surface)] text-[var(--color-text-primary)]'
                                        : 'bg-[var(--color-surface-elevated)] text-[var(--color-text-secondary)]'
                                        }`}
                                >
                                    DETAILS
                                </button>
                                <button
                                    onClick={() => setMobileTab('visuals')}
                                    className={`flex-1 py-2 text-xs tracking-wider transition ${mobileTab === 'visuals'
                                        ? 'bg-[var(--color-surface)] text-[var(--color-text-primary)]'
                                        : 'bg-[var(--color-surface-elevated)] text-[var(--color-text-secondary)]'
                                        }`}
                                >
                                    VISUALS
                                </button>
                            </div>
                            <div className="window-content flex-1 min-h-0 overflow-auto p-4">
                                {mobileTab === 'details' ? <DetailsContent /> : <VisualsContent />}
                            </div>
                        </div>
                    ) : (
                        <div className="flex h-full min-h-0 overflow-hidden">
                            <div className="window-content w-[38%] shrink-0 min-h-0 overflow-auto p-4 border-r border-[var(--color-border)]">
                                <DetailsContent />
                            </div>
                            <div className="window-content flex-1 min-h-0 overflow-auto p-4">
                                <VisualsContent />
                            </div>
                        </div>
                    )
                )}
            </div>
        </Rnd>
    );
}

export default ProjectWindow;