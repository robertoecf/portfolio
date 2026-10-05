import React from 'react';
import { ArrowUpRight, Github } from 'lucide-react';
import { useLanguage } from '../../contexts/LanguageContext';
import { GITHUB_URL, PROJECTS, type Project } from '../../content/profile';

const ProjectLinks = ({ project }: { project: Project }) => (
  <div className="flex flex-wrap gap-3">
    {project.links.map((link) => (
      <a
        key={link.url}
        href={link.url}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={`${project.name} ${link.label}`}
        className="inline-flex items-center gap-1.5 text-xs font-mono text-slate-400 hover:text-white transition-colors"
      >
        {link.label}
        <ArrowUpRight className="w-3.5 h-3.5" />
      </a>
    ))}
  </div>
);

const Tags = ({ tags }: { tags: string[] }) => (
  <ul className="flex flex-wrap gap-2">
    {tags.map((tag) => (
      <li key={tag} className="px-2 py-0.5 rounded-md bg-white/5 border border-white/5 text-[10px] font-mono text-slate-400">
        {tag}
      </li>
    ))}
  </ul>
);

export const Projects: React.FC = () => {
  const { t, language } = useLanguage();
  const featured = PROJECTS.filter((p) => p.featured);
  const rest = PROJECTS.filter((p) => !p.featured);

  return (
    <section id="projects" className="py-32 px-6 relative z-10">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-8 border-b border-ethereal-border pb-8">
          <div className="max-w-2xl">
            <h2 className="text-xs font-mono text-ethereal-orange mb-4 tracking-[0.2em] uppercase">{t('projects.label')}</h2>
            <h3 className="text-3xl md:text-5xl font-bold text-white leading-tight">{t('projects.title')}</h3>
          </div>
          <p className="text-slate-400 max-w-xs text-sm leading-relaxed">{t('projects.desc')}</p>
        </div>

        <div className="space-y-6">
          {featured.map((project) => (
            <article key={project.id} className="glass-panel rounded-2xl p-8 md:p-10 grid md:grid-cols-12 gap-8 group">
              <div className="md:col-span-8 space-y-4">
                <div className="flex flex-wrap items-center gap-3 text-[10px] font-mono uppercase tracking-widest">
                  <span className="px-2 py-1 rounded-full bg-ethereal-orange/10 border border-ethereal-orange/30 text-ethereal-orange">
                    {t('projects.featured')}
                  </span>
                  <span className="text-slate-500">{project.category[language]}</span>
                </div>
                <h4 className="text-2xl md:text-3xl font-bold text-white group-hover:text-emerald-300 transition-colors">
                  {project.name}
                </h4>
                <p className="text-slate-300 leading-relaxed font-light">{project.description[language]}</p>
              </div>
              <div className="md:col-span-4 flex flex-col justify-between gap-6 md:border-l md:border-ethereal-border md:pl-8">
                <div className="space-y-4">
                  {project.status && <div className="text-xs font-mono text-emerald-400">{project.status}</div>}
                  <Tags tags={project.tags} />
                </div>
                <ProjectLinks project={project} />
              </div>
            </article>
          ))}

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {rest.map((project) => (
              <article
                key={project.id}
                className="glass-panel rounded-2xl p-6 flex flex-col gap-4 transition-all duration-500 hover:-translate-y-1"
              >
                <div className="flex items-start justify-between gap-4">
                  <span className="text-[10px] font-mono uppercase tracking-widest text-slate-500">{project.category[language]}</span>
                  {project.status && <span className="text-[10px] font-mono text-emerald-400 whitespace-nowrap">{project.status}</span>}
                </div>
                <h4 className="text-lg font-bold text-white">{project.name}</h4>
                <p className="text-sm text-slate-400 leading-relaxed flex-grow">{project.description[language]}</p>
                <Tags tags={project.tags} />
                <ProjectLinks project={project} />
              </article>
            ))}
          </div>
        </div>

        <div className="mt-12 text-center">
          <a
            href={GITHUB_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full border border-white/10 bg-white/5 text-sm text-slate-300 hover:text-white hover:bg-white/10 hover:border-white/30 transition-all duration-300"
          >
            <Github className="w-4 h-4" />
            {t('projects.all')}
            <ArrowUpRight className="w-4 h-4" />
          </a>
        </div>
      </div>
    </section>
  );
};
