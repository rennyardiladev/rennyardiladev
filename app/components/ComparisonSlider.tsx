'use client';

import { useState } from 'react';
import { getToySvg } from '@/lib/svgs';
import { Project } from '@/types/project';

interface ComparisonSliderProps {
  project: Project;
}

export default function ComparisonSlider({
  project,
}: ComparisonSliderProps) {
  const [sliderPos, setSliderPos] = useState(50);

  const getMediaMarkup = (type: 'before' | 'after') => {
    if (type === 'before' && project.before) {
      return (
        <img
          src={project.before}
          alt="Boceto vectorial"
          className="absolute inset-0 w-full h-full object-cover"
          draggable={false}
        />
      );
    }

    if (type === 'after' && project.after) {
      return (
        <img
          src={project.after}
          alt="Peluche terminado"
          className="absolute inset-0 w-full h-full object-cover"
          draggable={false}
        />
      );
    }

    const svgString = getToySvg(
      project.toy,
      project.color,
      type === 'after'
    );

    return (
      <div
        dangerouslySetInnerHTML={{ __html: svgString }}
        className="absolute inset-0 w-full h-full"
      />
    );
  };

  return (
    <div
      className="cmp relative overflow-hidden"
      style={
        {
          '--p': `${sliderPos}%`,
        } as React.CSSProperties
      }
    >
      {/* VECTOR — queda visible a la izquierda */}
      <div
        className="layer before absolute inset-0 overflow-hidden"
        style={{
          clipPath: `inset(0 ${100 - sliderPos}% 0 0)`,
        }}
      >
        {getMediaMarkup('before')}
      </div>

      {/* PELUCHE — queda visible a la derecha */}
      <div
        className="layer after absolute inset-0 overflow-hidden"
        style={{
          clipPath: `inset(0 0 0 ${sliderPos}%)`,
        }}
      >
        {getMediaMarkup('after')}
      </div>

      {/* ETIQUETAS */}
      <span className="tag l">Vector</span>
      <span className="tag r">Peluche</span>

      {/* BARRA */}
      <div
        className="bar absolute top-0 bottom-0"
        style={{ left: 'var(--p)' }}
      />

      {/* BOTÓN */}
      <div
        className="knob absolute"
        style={{
          left: 'var(--p)',
          transform: 'translate(-50%, -50%)',
        }}
        aria-hidden="true"
      >
        ◂▸
      </div>

      {/* SLIDER */}
      <input
        type="range"
        min="0"
        max="100"
        value={sliderPos}
        onChange={(e) => setSliderPos(Number(e.target.value))}
        aria-label={`Comparar vector y peluche de ${project.name}`}
        className="absolute inset-0 w-full h-full opacity-0 cursor-ew-resize"
      />
    </div>
  );
}