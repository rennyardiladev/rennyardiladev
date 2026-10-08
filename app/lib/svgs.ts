import { Project } from '../types/project';

export function getToySvg(type: Project['toy'], c: string, fill: boolean): string {
  const s = `stroke="#16181D" stroke-width="3" ${fill ? '' : 'stroke-dasharray="7 5"'}`;
  const f = fill ? c : 'none', l = fill ? 'rgba(255,255,255,.55)' : 'none', eye = fill ? '#16181D' : 'none';
  let b = '', ey = 90;

  if(type === 'bear') {
    b = `<circle cx="55" cy="52" r="22" fill="${f}" ${s}/><circle cx="145" cy="52" r="22" fill="${f}" ${s}/>
         <ellipse cx="100" cy="152" rx="40" ry="40" fill="${f}" ${s}/><circle cx="100" cy="85" r="48" fill="${f}" ${s}/><ellipse cx="100" cy="100" rx="20" ry="15" fill="${l}" ${s}/>`;
  } else if(type === 'mascot') {
    ey = 100;
    b = `<ellipse cx="100" cy="112" rx="64" ry="72" fill="${f}" ${s}/><ellipse cx="70" cy="182" rx="20" ry="9" fill="${f}" ${s}/><ellipse cx="130" cy="182" rx="20" ry="9" fill="${f}" ${s}/><path d="M60 40 Q100 5 140 40" fill="${f}" ${s}/>`;
  } else if(type === 'sticker') {
    ey = 92;
    b = `<path d="M100 18C150 12 188 50 182 100C188 150 150 188 100 182C50 188 12 150 18 100C12 50 50 12 100 18Z" fill="${fill ? '#fff' : 'none'}" stroke="${fill ? '#C9CED8' : '#F0237A'}" stroke-width="3" ${fill ? '' : 'stroke-dasharray="6 4"'}/><circle cx="100" cy="100" r="62" fill="${f}" ${s}/>`;
  } else {
    b = `<path d="M72 78C72 22 128 22 128 78" fill="none" ${s} stroke-width="5"/><path d="M42 74H158L170 186H30Z" fill="${f}" ${s}/><rect x="70" y="112" width="60" height="42" rx="6" fill="${l}" ${s}/><circle cx="100" cy="133" r="9" fill="${fill ? c : 'none'}" ${s}/>`;
  }

  if(type !== 'bag') {
    b += `<circle cx="80" cy="${ey}" r="6" fill="${eye}" ${s}/><circle cx="120" cy="${ey}" r="6" fill="${eye}" ${s}/><path d="M88 ${ey+22} Q100 ${ey+32} 112 ${ey+22}" fill="none" ${s}/>`;
  }
  if(fill && type !== 'bag') {
    b += `<ellipse cx="78" cy="68" rx="14" ry="7" fill="#fff" opacity=".3" transform="rotate(-25 78 68)"/>`;
  }

  return `<svg viewBox="0 0 200 200" role="img" aria-label="${fill ? 'Peluche terminado' : 'Boceto vectorial'}">${fill ? `<rect width="200" height="200" fill="${c}" opacity=".18"/><ellipse cx="100" cy="194" rx="70" ry="8" fill="#16181D" opacity=".12"/>` : ''}${b}</svg>`;
}

export function getWebSvg(p: Project): string {
  return `<svg viewBox="0 0 200 200" role="img" aria-label="Vista de ${p.name}"><rect width="200" height="200" fill="${p.color}" opacity=".18"/><rect x="20" y="40" width="160" height="120" rx="10" fill="#fff" stroke="#16181D" stroke-width="3"/><path d="M20 62H180" stroke="#16181D" stroke-width="3"/><circle cx="34" cy="51" r="4" fill="#F0237A"/><circle cx="48" cy="51" r="4" fill="#FFC93C"/><circle cx="62" cy="51" r="4" fill="#3158FF"/><rect x="34" y="76" width="70" height="10" rx="5" fill="${p.color}"/><rect x="34" y="94" width="110" height="6" rx="3" fill="#D5D9E0"/><rect x="34" y="106" width="90" height="6" rx="3" fill="#D5D9E0"/><rect x="34" y="124" width="40" height="18" rx="9" fill="#16181D"/><rect x="120" y="76" width="46" height="66" rx="8" fill="${p.color}" opacity=".6"/></svg>`;
}
