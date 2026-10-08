export interface Project {
  id: number;
  col: string;
  name: string;
  toy?: 'bear' | 'mascot' | 'sticker' | 'bag';
  color: string;
  before?: string;
  after?: string;
  videos?: string[];
  videosPreview?: string[];
  roles?: string[];
  challenge?: string;
  solution?: string;
  url?: string;
  desc?: string;
  thumb?: string;
}

export const PROJECTS: Project[] = [
  {id:1, col:'Línea Infantil', name:'Diseño de los personajes Mia la Osa y San el Oso', toy:'bear', color:'#8FB8FF', before:'/mia.png', after:'/17.webp',
   roles:['Ilustración','Ficha técnica', 'Desarrollo Creativo', 'Fotografía'],
   challenge:'Creacion de personajes para los cojines.',
   solution:'Diseño en vector, y creacion desde todo el concepto.'},
  {id:2, col:'Línea Infantil', name:'Diseno y creacion de todo el concepto de Mia la Osa', toy:'mascot', color:'#FFD23C', before:'/mialaosa.jpeg', after:'/78.webp',
   roles:['Ilustración','Ficha técnica','Fotografía', 'Concepto', 'Paleta de Colores'],
   challenge:'Un diseño de un personaje de osa que se pudiera coser rápido en serie.',
   solution:'Patrón en pocas piezas y guía de ensamble para el taller y creacion del concepto completo del personaje.'},
  {id:3, col:'Ediciones de Temporada', name:'Diseño de ropa de peluches', toy:'mascot', color:'#FF5C8D', before:'/ropa.png', after:'/16.webp',
   roles:['Ilustración','Diseño de ropa','Fotografía'],
   challenge:'Una edición de ropa que se cambiaba cada 3 meses.',
   solution:'Construccion de vestidos en edicion para sublimacion.'},
  {id:4, col:'Ediciones de Temporada', name:'Diseño de zapatos para peluches', toy:'bear', color:'#E5483D', before:'/zapatos.png', after:'/10.webp',
   roles:['Ilustración','Ficha técnica','Diseño de zapato'],
   challenge:'Diseño y montaje para impresion de los zapatos para los personajes.',
   solution:'Patrones modulares y una guía ilustrada de ensamble produccion.'},
  {id:5, col:'Productos Nuevos', name:'Creacion en DTF para Hoddie', toy:'mascot', color:'#3FD0A0', before:'patronaje.jpeg', after:'/swatter.webp',
   roles:['Ilustración','Ficha técnica','Produccion','Fotografía'],
   challenge:'Fidelidad exacta a los colores de la marca del cliente.',
   solution:'Pleta calibrada contra muestras de tela y etiquetas textiles personalizadas y personajes.'},
  {id:6, col:'Productos Nuevos', name:'Creacion de Personajes y de producto', toy:'bear', color:'#FFB92E', before:'/vaca.jpg', after:'/3.webp',
   roles:['Ilustración','Diseño de personajes, Diseño de productos'],
   challenge:'Un obsequio para el dia de las madres con presupuesto ajustado y tiempo limitado.',
   solution:'Personajes creados desde el boceto y montada en un fondo llamativo.'},
  {id:11, col:'Montaje para Produccion', name:'Montaje para Mono', toy:'bear', color:'#FFB92E', before:'/cabezas.jpg', after:'/4.webp',
   roles:['Ilustración','Diseño, Montaje'],
   challenge:'Montaje para imprimir 100 metros en sublimado.',
   solution:'Cabezas, orejas, manos para la produccion de mono y mona.'},
  {id:12, col:'Montaje para Produccion', name:'Montaje para Jirafa', toy:'bear', color:'#FFB92E', before:'/cabezasontaje.png', after:'/13.webp',
   roles:['Ilustración','Diseño, Montaje'],
   challenge:'Montaje para imprimir 100 metros en sublimado.',
   solution:'Cabezas, orejas, manos para la produccion de jirafa.'},
    {id:13, col:'Piezas para Redes Sociales', name:'Videos del producto con personas modificado con IA para ADS', toy:'bear', color:'#FFB92E', videos:['/cojin.mp4'], videosPreview:['/p1.png'],
   roles:['Ilustración','Diseño, Montaje'],
   challenge:'Video del Producto moviendose.',
   solution:'Video humanizado del producto.'},
    {id:14, col:'Piezas para Redes Sociales', name:'Videos del personaje modificado con IA', toy:'bear', color:'#3FD0A0', videos:['/oso.mp4'], videosPreview:['/p2.png'],
   roles:['Video','Fotografía','Montaje'],
   challenge:'Crear piezas de video cortas para ADS.',
   solution:'Videos de 15-30s para ADS de Reels y TikTok.'},
   {id:7, col:'Desarrollo web', name:'Fábrica de Peluches Mundo Disney', url:'https://fabricadepeluchesmundodisney.com', thumb:'/fabricadepeluches.png', color:'#F0237A', desc:'Tienda en línea y presencia digital de un fabricante de peluches.'},
  {id:8, col:'Desarrollo web', name:'Tienda Latorre', url:'https://tienlatoree.vercel.app', color:'#3158FF', thumb:'/lato.png',desc:'Landing page con IA y app interactiva para ver prendas, colores y marcas y pequenos modelos de IA prediciendo la compra.'},
  {id:9, col:'Desarrollo web', name:'Tienda Texas', url:'https://rais-liart.vercel.app', color:'#3FD0A0', thumb:'/tex.png', desc:'Tienda en línea creada para un negocio en Estados Unidos encargado en ecommerce.'},
  {id:10, col:'Desarrollo web', name:'Hypersoporte', url:'https://hypersoporte.com', color:'#FFB92E', thumb:'/panel.png', desc:'E-commerce con panel de administración y compra de moneda de juego.'},
  {id:15, col:'Desarrollo web', name:'Aumento de Seguidores', url:'https://aumentodeseguidores.com', color:'#FFB92E', thumb:'/aumento.png', desc:'E-commerce con panel de administración y compra de moneda de juego.'}

];
