'use client';

import { useState, useRef, FormEvent } from 'react';
import { Project, PROJECTS } from '@/types/project';
import { getToySvg, getWebSvg } from '@/lib/svgs';
import ComparisonSlider from '@/components/ComparisonSlider';
import LazyVideo from '@/components/LazyVideo';
import Button from '@/components/Button';

export default function Home() {
  const [selectedCol, setSelectedCol] = useState<string>('Todos');
  const [activeModalProject, setActiveModalProject] = useState<Project | null>(null);
  const [formStatus, setFormStatus] = useState<string>('');
  const modalRef = useRef<HTMLDialogElement>(null);

  const categories = ['Todos', ...Array.from(new Set(PROJECTS.map(p => p.col)))];
  const filteredProjects = selectedCol === 'Todos' 
    ? PROJECTS 
    : PROJECTS.filter(p => p.col === selectedCol);

  const openModal = (project: Project) => {
    setActiveModalProject(project);
    if (modalRef.current) modalRef.current.showModal();
  };

  const closeModal = () => {
    if (modalRef.current) modalRef.current.close();
    setActiveModalProject(null);
  };

  const handleFormSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const nombre = (formData.get('nombre') as string)?.trim() ?? '';
    const email = (formData.get('email') as string)?.trim() ?? '';
    const mensaje = (formData.get('mensaje') as string)?.trim() ?? '';

    const text = `Consulta de ${nombre}%0AEmail: ${email}%0AMensaje: ${mensaje}`;

    window.location.href = `https://wa.me/3161744421?text=${encodeURIComponent(text)}`;
    setFormStatus('Abriendo WhatsApp...');
  };

  return (
    <>
      <header className="sticky top-0 z-40 backdrop-blur" style={{ background: 'rgba(236,238,241,.85)' }}>
        <nav className="max-w-6xl mx-auto px-5 h-16 flex items-center justify-between" aria-label="Principal">
          <a href="#inicio" className="disp font-extrabold text-xl">Renny Ardila</a>
          <div className="hidden md:flex gap-8 font-medium">
            <a href="#proceso" className="hover:text-[color:var(--pink)]">Proceso</a>
            <a href="#proyectos" className="hover:text-[color:var(--pink)]">Proyectos</a>
            <a href="#sobre-mi" className="hover:text-[color:var(--pink)]">Sobre mí</a>
            <a href="#contacto" className="hover:text-[color:var(--pink)]">Contacto</a>
          </div>
          <Button href="#contacto" variant="pink" size="sm">Contactar</Button>
        </nav>
      </header>

      <main>
        {/* HERO */}
        <section id="inicio" className="max-w-6xl mx-auto px-5 pt-10 pb-20 grid md:grid-cols-[1.1fr_.9fr] gap-10 items-center">
          <div>
            <p className="inline-flex items-center gap-2 font-semibold mb-5 px-3 py-1 rounded-full bg-white">
              <span className="w-2 h-2 rounded-full" style={{ background: '#2BB673' }}></span>Disponible para proyectos
            </p>
            <h1 className="text-5xl md:text-7xl font-extrabold">Diseño el producto y construyo la tienda que lo vende</h1>
            <p className="mt-6 text-lg max-w-[34rem]" style={{ color: 'var(--muted)' }}>
              Soy diseñador gráfico y desarrollador web. Dibujo el personaje, preparo fichas técnicas y empaque, y desarrollo con Next.js y React el sitio que lo vende, con campañas en Meta, Google y TikTok.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Button href="#proyectos" variant="pink">Ver proyectos</Button>
              <Button href="#contacto" variant="line">Contactar</Button>
            </div>
          </div>
          <div>
            <ComparisonSlider project={PROJECTS[0]} />
            <p className="text-sm mt-3" style={{ color: 'var(--muted)' }}>Desliza para pasar del vector al peluche terminado.</p>
          </div>
        </section>

        {/* PROCESO */}
        <section id="proceso" className="py-20" style={{ background: 'var(--ink)', color: '#fff' }}>
          <div className="max-w-6xl mx-auto px-5">
            <h2 className="text-4xl md:text-5xl font-extrabold max-w-2xl">Del boceto al producto vendido en línea</h2>
            <p className="mt-4 max-w-xl" style={{ color: '#B8BDC8' }}>Cuatro etapas conectadas, aprendidas dentro de una fábrica, para que lo que se diseña sea lo que se produce.</p>
            <ol className="mt-12 grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
              <li className="step" style={{ '--c': 'var(--pink)' } as React.CSSProperties}>
                <span className="disp text-3xl font-bold" style={{ color: 'var(--pink)' }}>1</span>
                <h3 className="text-2xl font-bold mt-2">Concepto e ilustración 2D</h3>
                <p className="mt-3" style={{ color: '#B8BDC8' }}>Moodboards, diseño de personajes y paletas de color pensadas para tela real.</p>
              </li>
              <li className="step" style={{ '--c': 'var(--blue)' } as React.CSSProperties}>
                <span className="disp text-3xl font-bold" style={{ color: '#7C95FF' }}>2</span>
                <h3 className="text-2xl font-bold mt-2">Fichas técnicas y despiece</h3>
                <p className="mt-3" style={{ color: '#B8BDC8' }}>Patrones vectoriales, especificaciones de tela y bordado, y medidas listas para corte.</p>
              </li>
              <li className="step" style={{ '--c': 'var(--sun)' } as React.CSSProperties}>
                <span className="disp text-3xl font-bold" style={{ color: 'var(--sun)' }}>3</span>
                <h3 className="text-2xl font-bold mt-2">Branding y empaque</h3>
                <p className="mt-3" style={{ color: '#B8BDC8' }}>Etiquetas textiles, hangtags, cajas y catálogos con una identidad coherente.</p>
              </li>
              <li className="step" style={{ '--c': '#fff' } as React.CSSProperties}>
                <span className="disp text-3xl font-bold">4</span>
                <h3 className="text-2xl font-bold mt-2">Producto final</h3>
                <p className="mt-3" style={{ color: '#B8BDC8' }}>Control de calidad, fotografía de producción y una tienda en línea para venderlo.</p>
              </li>
            </ol>
          </div>
        </section>

        {/* PROYECTOS */}
        <section id="proyectos" className="max-w-6xl mx-auto px-5 py-20">
          <h2 className="text-4xl md:text-5xl font-extrabold">Proyectos</h2>
          <p className="mt-3 max-w-xl" style={{ color: 'var(--muted)' }}>Abre un proyecto de diseño para comparar el vector con el peluche terminado, o visita los sitios web en vivo.</p>
          
          <div className="mt-8 flex flex-wrap gap-2" role="group" aria-label="Filtrar proyectos">
            {categories.map((cat) => (
              <button 
                key={cat}
                className="chip"
                aria-pressed={selectedCol === cat}
                onClick={() => setSelectedCol(cat)}
              >
                {cat}
              </button>
            ))}
          </div>

          <div className="mt-8 grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProjects.map((p) => {
              const isWeb = !!p.url;
              return isWeb ? (
                 <a key={p.id} href={p.url} target="_blank" rel="noopener noreferrer" className="proj">
                   <div className="thumb">
                     {p.thumb ? (
                       <img
                         src={p.thumb}
                         alt={p.name}
                         className="w-full h-full object-cover"
                         draggable={false}
                       />
                     ) : (
                       <div dangerouslySetInnerHTML={{ __html: getWebSvg(p) }} className="w-full h-full" />
                     )}
                   </div>
                  <div className="px-3 pt-4 pb-3">
                    <p className="text-sm font-semibold" style={{ color: 'var(--pink)' }}>{p.col}</p>
                    <h3 className="text-xl font-bold mt-1">{p.name}</h3>
                    <p className="text-sm mt-1" style={{ color: 'var(--muted)' }}>{p.desc}</p>
                  </div>
                </a>
              ) : (
                <div key={p.id} onClick={() => openModal(p)} className="proj">
                 <div className="thumb">
                     {p.videosPreview && p.videosPreview.length > 0 ? (
                       <img
                         src={p.videosPreview[0]}
                         alt={p.name}
                         className="w-full h-full object-cover"
                         draggable={false}
                       />
                     ) : p.after ? (
                       <>
                         <img
                           src={p.after}
                           alt={p.name}
                           className="w-full h-full object-cover"
                           draggable={false}
                         />
                         <span className="proj-badge">clickaquí</span>
                       </>
                     ) : (
                       <div dangerouslySetInnerHTML={{ __html: getToySvg(p.toy, p.color, true) }} className="w-full h-full" />
                     )}
                    {p.videos && p.videos.length > 0 && (
                      <span className="play-hint" aria-label="Video">
                        <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M8 5v14l11-7z" /></svg>
                      </span>
                    )}
                  </div>
                  <div className="px-3 pt-4 pb-3">
                    <p className="text-sm font-semibold" style={{ color: 'var(--pink)' }}>{p.col}</p>
                    <h3 className="text-xl font-bold mt-1">{p.name}</h3>
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* SOBRE MÍ */}
        <section id="sobre-mi" className="py-20" style={{ background: '#fff' }}>
          <div className="max-w-6xl mx-auto px-5">
            <h2 className="text-4xl md:text-5xl font-extrabold max-w-3xl">Diseño, desarrollo y marketing en una sola persona</h2>
            <p className="mt-4 text-lg max-w-2xl" style={{ color: 'var(--muted)' }}>Llevo más de 10 años haciendo crecer marcas en redes sociales y construyendo sitios web. Trabajé en una fábrica de peluches, donde llevé ideas visuales hasta productos reales, y hoy conecto ese producto con su tienda en línea y sus campañas.</p>
            <div className="mt-10 grid md:grid-cols-3 gap-6">
              <div className="rounded-3xl p-6" style={{ background: 'var(--bg)', borderTop: '6px solid var(--pink)' }}>
                <h3 className="text-2xl font-bold">Diseño gráfico</h3>
                <p className="mt-2" style={{ color: 'var(--muted)' }}>Personajes, bocetos vectoriales, fichas técnicas, etiquetas, empaque y fotografía de producto.</p>
                <ul className="mt-4 flex flex-wrap gap-2"><li className="chip !text-sm">Illustrator</li><li className="chip !text-sm">Photoshop</li><li className="chip !text-sm">CorelDRAW</li><li className="chip !text-sm">Diseño con IA</li></ul>
              </div>
              <div className="rounded-3xl p-6" style={{ background: 'var(--bg)', borderTop: '6px solid var(--blue)' }}>
                <h3 className="text-2xl font-bold">Desarrollo web</h3>
                <p className="mt-2" style={{ color: 'var(--muted)' }}>Sitios, tiendas en línea y landing pages rápidas, con IA y chatbots de WhatsApp.</p>
                <ul className="mt-4 flex flex-wrap gap-2"><li className="chip !text-sm">Next.js</li><li className="chip !text-sm">React</li><li className="chip !text-sm">JavaScript</li><li className="chip !text-sm">Git y GitHub</li><li className="chip !text-sm">E-commerce</li></ul>
              </div>
              <div className="rounded-3xl p-6" style={{ background: 'var(--bg)', borderTop: '6px solid var(--sun)' }}>
                <h3 className="text-2xl font-bold">Marketing digital</h3>
                <p className="mt-2" style={{ color: 'var(--muted)' }}>Cuentas de más de 300.000 seguidores y campañas pagadas para clientes de Colombia y Estados Unidos.</p>
                <ul className="mt-4 flex flex-wrap gap-2"><li className="chip !text-sm">Meta Ads</li><li className="chip !text-sm">Google Ads</li><li className="chip !text-sm">TikTok Ads</li><li className="chip !text-sm">Contenido</li><li className="chip !text-sm">Community manager</li></ul>
              </div>
            </div>
          </div>
        </section>

        {/* CONTACTO */}
        <section id="contacto" className="max-w-6xl mx-auto px-5 py-20 grid md:grid-cols-2 gap-12">
          <div>
            <h2 className="text-4xl md:text-5xl font-extrabold">Trabajemos juntos</h2>
            <p className="mt-4" style={{ color: 'var(--muted)' }}>Escríbeme y cuéntame qué necesitas. Respondo en un día hábil.</p>
            <ul className="mt-8 space-y-2 font-medium">
              <li><a className="underline" href="mailto:rennyardiladev@gmail.com">rennyardiladev@gmail.com</a></li>
              <li><a className="underline" href="https://www.linkedin.com/in/tu-perfil" target="_blank" rel="noopener noreferrer">LinkedIn</a></li>
              <li><a className="underline" href="https://www.behance.net/tu-perfil" target="_blank" rel="noopener noreferrer">Behance</a></li>
              <li><a className="underline" href="https://github.com/tu-usuario" target="_blank" rel="noopener noreferrer">GitHub</a></li>
            </ul>
            <Button href="/cvRennyArdila.pdf" download variant="line" className="mt-8">Descargar CV (PDF)</Button>
          </div>
          <form onSubmit={handleFormSubmit} className="space-y-4">
            <label className="block"><span className="font-semibold">Nombre</span><input className="f mt-1" name="nombre" required autoComplete="name" /></label>
            <label className="block"><span className="font-semibold">Correo</span><input className="f mt-1" type="email" name="email" required autoComplete="email" /></label>
            <label className="block"><span className="font-semibold">Mensaje</span><textarea className="f mt-1" name="mensaje" rows={5} required></textarea></label>
            <Button type="submit" variant="pink">Enviar mensaje</Button>
            <p className="text-sm" role="status">{formStatus}</p>
          </form>
        </section>
      </main>

      <footer className="py-8 text-center text-sm" style={{ color: 'var(--muted)' }}>
        © {new Date().getFullYear()} Renny Ardila. Diseño gráfico, desarrollo web y marketing.
      </footer>

      {/* MODAL */}
      <dialog ref={modalRef} aria-labelledby="mTitle" className="border-0 rounded-[28px] p-0 max-w-[960px] w-[calc(100%-24px)] bg-[var(--bg)] text-[var(--ink)] max-h-[92vh]">
        {activeModalProject && (
          <div className="p-5 md:p-8">
            <div className="flex justify-end"><Button variant="line" size="sm" onClick={closeModal}>Cerrar</Button></div>
             <div className="grid md:grid-cols-2 gap-8 mt-2">
               {activeModalProject.videos && activeModalProject.videos.length > 0 ? (
                 <div className="grid grid-cols-1 gap-4">
                    {activeModalProject.videos.map((v, i) => (
                       <LazyVideo key={i} src={v} title={activeModalProject.name} story poster={activeModalProject.videosPreview?.[i]} />
                    ))}
                 </div>
                ) : (
                  <ComparisonSlider project={activeModalProject} />
                )}
                <div>
                <p id="mCol" className="font-semibold" style={{ color: 'var(--pink)' }}>{activeModalProject.col}</p>
                <h3 id="mTitle" className="text-3xl md:text-4xl font-extrabold mt-1">{activeModalProject.name}</h3>
                <h4 className="font-bold mt-6">Mi rol</h4>
                <ul className="flex flex-wrap gap-2 mt-2">
                  {activeModalProject.roles?.map(r => <li key={r} className="chip !text-sm">{r}</li>)}
                </ul>
                <h4 className="font-bold mt-6">El reto de producción</h4>
                <p className="mt-1" style={{ color: 'var(--muted)' }}>{activeModalProject.challenge}</p>
                <h4 className="font-bold mt-4">La solución gráfica</h4>
                <p className="mt-1" style={{ color: 'var(--muted)' }}>{activeModalProject.solution}</p>
              </div>
            </div>
          </div>
        )}
      </dialog>
    </>
  );
}
