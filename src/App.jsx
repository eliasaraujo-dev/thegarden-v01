import React, { useState, useEffect, useRef, useMemo } from 'react';
import {
  Instagram,
  MapPin,
  Phone,
  Clock,
  Music,
  Baby,
  Dog,
  ChevronRight,
  ChevronLeft,
  Menu as MenuIcon,
  X,
  Star,
  Utensils,
  Camera,
  MessageCircle,
  Trophy,
  CalendarHeart,
  Quote,
  User,
} from 'lucide-react';

const images = {
  hero: 'https://i.ibb.co/mrsWxd4P/88-The-Garden-Sessao-Maio-88-de-88-683x1024.jpg',
  sushi: 'https://i.ibb.co/v6xFgpQK/Prancheta-1-8.png',
  steak: 'https://i.ibb.co/zWt5QGMc/Prancheta-15.png',
  garden: 'Prancheta-1-7-1024x1024.jpg',
  kids: 'https://i.ibb.co/jkRtMD4j/Espaco-Kids.jpg',
  pet: 'Prancheta-1-5-1024x1024.jpg',
  skewers: 'https://i.ibb.co/Cs9PS5f6/Prancheta-14.png',
  fries: 'https://i.ibb.co/sd6XB6ft/Prancheta-12.png',
  bowl: 'https://i.ibb.co/tThTSg3D/Prancheta-13.png',
  confraternizacao: 'https://i.ibb.co/cSvP9GpW/619456181-17948212125085228-8615891190907755388-n.jpg',
  aniversario: 'https://i.ibb.co/bRb4j0D8/479182436-18343666981155811-6435112330426982923-n.jpg',
  drink_bento: 'https://i.ibb.co/mrMyfD4s/540464938-18365261011155811-8364663750639220854-n.jpg',
  drink_eventos: 'https://i.ibb.co/mF0Yhb1V/629136113-18425601418138780-2711873305708091748-n.jpg',
  finais_de_semana: 'https://i.ibb.co/ZprYR2d4/470167476-2343210259368275-5575340408099504688-n.jpg',
  sobremesa: 'https://i.ibb.co/9HCvDZ7V/550831556-18367569553155811-6670986320226288301-n.jpg',
};

const LOGO_URL = 'https://i.ibb.co/PZk2znqf/469224574-588547160329262-8839946697425987304-n.png';
const MENU_URL = 'https://drive.google.com/file/d/1SCSHF5bOwxmr2ao2gxHekw8OUjcIAcA1/view';
const RESERVAS_URL = 'https://thegarden.com.br';

const menuSections = [
  {
    title: 'Combinados & Sushi',
    items: [
      { name: 'Combinado 12 peças', price: 'R$ 47,90', description: '6 sashimis variados + 2 niguiris + 4 enrolados' },
      { name: 'Combinado 14 peças (Salmão maçaricado)', price: 'R$ 66,90', description: '8 sashimis + 6 niguiris' },
      { name: 'Combinado 18 peças', price: 'R$ 69,90', description: '8 sashimis variados + 6 niguiris + 4 enrolados' },
      { name: 'Combinado 40 peças variadas', price: 'R$ 159,90' },
      { name: 'Combinado 40 peças só salmão ou atum', price: 'R$ 169,90' },
      { name: 'Combinado 50 peças variadas', price: 'R$ 189,90' },
      { name: 'Combinado 50 peças só salmão ou atum', price: 'R$ 199,90', description: 'Shimeji cortesia nos combinados de 50 peças' },
      { name: 'Niguiris (8 un) - Peixe branco / Salmão / Atum', price: 'R$ 34,90' },
      { name: 'Sashimis (8 un) - Peixe branco / Salmão / Atum', price: 'R$ 25,90 a R$ 27,90' },
      { name: 'Hot roll (10 un)', price: 'R$ 34,90 a R$ 39,90' },
      { name: 'Temakis (com arroz)', price: 'R$ 26,90 a R$ 39,90' },
      { name: 'Temalis (arroz por fora, 10 un)', price: 'R$ 29,90 a R$ 36,90' },
    ],
  },
  {
    title: 'Grelhados & Rechaud',
    items: [
      { name: 'Rechaud Tipo I (650g)', price: 'R$ 179,00' },
      { name: 'Rechaud Tipo II (900g)', price: 'R$ 239,90' },
      { name: 'Rechaud Tipo III (1100g)', price: 'R$ 249,90' },
      { name: 'Rechaud Tipo IV (1300g)', price: 'R$ 279,90' },
      { name: 'Espetos tradicionais', price: 'R$ 10,90 a R$ 13,90', description: 'Alcatra, coração, frango, linguiças, tulipa, kafta' },
      { name: 'Espetos especiais', price: 'R$ 14,90 a R$ 26,90', description: 'Muçarela de búfala, medalhões, camarão, filet mignon c/ catupiry' },
      { name: 'Acompanhamentos', price: 'R$ 3,90 a R$ 23,90', description: 'Vinagrete, farofa, arroz, feijão, gohan, legumes, molhos' },
      { name: 'Tábuas The Garden', price: 'R$ 51,90 / R$ 125,90 / R$ 128,90' },
    ],
  },
  {
    title: 'Lanches & Pratos',
    items: [
      { name: 'Chicken Burger', price: 'R$ 35,00' },
      { name: 'Cheese Burger', price: 'R$ 39,00' },
      { name: 'Cheese Salad', price: 'R$ 42,00' },
      { name: 'Cheese Bacon', price: 'R$ 44,00' },
      { name: 'Cheese The Garden', price: 'R$ 49,00' },
      { name: 'Filé mignon à parmegiana', price: 'R$ 69,90' },
      { name: 'Filé mignon grelhado', price: 'R$ 64,90' },
      { name: 'Picanha The Garden', price: 'R$ 59,90' },
      { name: 'Picanha à brasileira', price: 'R$ 54,90' },
      { name: 'Filé de frango à parmegiana', price: 'R$ 54,90' },
      { name: 'Frango empanado ou grelhado', price: 'R$ 49,90' },
      { name: 'Strogonoff de frango', price: 'R$ 49,90' },
      { name: 'Strogonoff de filé mignon', price: 'R$ 63,90' },
      { name: 'Camarão do chef', price: 'R$ 129,90' },
    ],
  },
  {
    title: 'Porções, Yakissoba & Ceviche',
    items: [
      { name: 'Camarões Ebi Garden', price: 'R$ 84,90' },
      { name: 'Coxinhas creme (8 un)', price: 'R$ 44,90' },
      { name: 'Calabresa acebolada', price: 'R$ 54,90' },
      { name: 'Bolinho de bacalhau (10 un)', price: 'R$ 47,90' },
      { name: 'Frango à passarinho', price: 'R$ 54,90' },
      { name: 'Iscas de peixe', price: 'R$ 49,90' },
      { name: 'Batata / Mandioca / Polenta frita (grande)', price: 'R$ 42,90' },
      { name: 'Cebola gigante The Garden', price: 'R$ 59,90' },
      { name: 'Guiozas (10 un)', price: 'R$ 39,90' },
      { name: 'Yakissoba', price: 'R$ 89,90 a R$ 119,90', description: 'Legumes, frango, misto, filet mignon ou camarão' },
      { name: 'Ceviche The Garden (2 pessoas)', price: 'R$ 87,90', description: 'Peixe branco, salmão, atum ou misto' },
      { name: 'Tepannyaki (2 pessoas)', price: 'R$ 89,90 a R$ 119,90' },
      { name: 'Saladas família', price: 'R$ 54,90 a R$ 59,90' },
    ],
  },
  {
    title: 'Bebidas sem álcool & Sobremesas',
    items: [
      { name: 'Sucos naturais 500ml', price: 'R$ 11,90 a R$ 21,90' },
      { name: 'Sucos naturais 750ml', price: 'R$ 24,90 a R$ 39,90' },
      { name: 'Refrigerantes e águas', price: 'R$ 7,90 a R$ 9,50' },
      { name: 'Drinks sem álcool', price: 'R$ 26,90' },
      { name: 'Sodas italianas', price: 'R$ 16,90' },
      { name: 'Cafés', price: 'R$ 7,90 a R$ 11,90' },
      { name: 'Espetos doces com chocolate', price: 'R$ 19,90 a R$ 21,90' },
      { name: 'Taça de sorvete', price: 'R$ 10,90 / R$ 18,90' },
      { name: 'Abacaxi na brasa', price: 'R$ 21,90' },
      { name: 'Banana na brasa', price: 'R$ 19,90' },
      { name: 'Salada de frutas', price: 'R$ 24,90' },
      { name: 'Petit gateau', price: 'R$ 31,90' },
      { name: 'Creme de papaia com cassis', price: 'R$ 29,90' },
      { name: 'Açaí na tigela', price: 'R$ 23,90 / R$ 29,90' },
    ],
  },
  {
    title: 'Cervejas & Drinks',
    items: [
      { name: 'Cervejas 600ml', price: 'R$ 16,90 a R$ 22,90', description: 'Spaten, Corona, Heineken, Amstel, Original, Serra Malte e outras' },
      { name: 'Long neck e especiais', price: 'R$ 11,90 a R$ 27,90' },
      { name: 'Smirnoff Ice', price: 'R$ 14,90' },
      { name: 'Caipirinhas / Sakerita / Caipiroska', price: 'R$ 29,90 a R$ 42,90' },
      { name: 'Gin tônica', price: 'R$ 29,90 a R$ 41,90' },
      { name: 'Drinks autorais e clássicos', price: 'R$ 32,90 a R$ 49,90', description: 'Mojito, Negroni, Margarita, Aperol, Moscow Mule, Sangria e mais' },
    ],
  },
  {
    title: 'Destilados, Whiskies, Vinhos & Espumantes',
    items: [
      { name: 'Destilados (dose/garrafa)', price: 'R$ 9,90 a R$ 399,90' },
      { name: 'Aperitivos e licores', price: 'R$ 13,90 a R$ 39,90' },
      { name: 'Whiskies (dose/garrafa)', price: 'R$ 19,90 a R$ 499,90' },
      { name: 'Combos', price: 'R$ 179,90 a R$ 399,90' },
      { name: 'Vinhos Casillero del Diablo (750ml)', price: 'R$ 119,90' },
      { name: 'Concha y Toro (750ml)', price: 'R$ 79,90' },
      { name: 'Pata Negra Oro Tempranillo', price: 'R$ 119,90' },
      { name: 'Espumantes Salton', price: 'R$ 76,90 a R$ 79,90' },
      { name: 'Chandon Brut Reserve', price: 'R$ 179,90' },
    ],
  },
  {
    title: 'Vegetarianos e Veganos',
    items: [
      { name: 'Guioza de legumes (10 un)', price: 'R$ 39,90' },
      { name: 'Onion rings', price: 'R$ 34,90' },
      { name: 'Shimeji comum / especial', price: 'R$ 37,90 / R$ 44,90' },
      { name: 'Hot roll shimeji', price: 'R$ 34,90' },
      { name: 'Pokê vegetariano', price: 'R$ 34,90' },
      { name: 'Yakissoba de legumes grande', price: 'R$ 83,90' },
      { name: 'Temaki shimeji e cebolinha', price: 'R$ 27,90' },
      { name: 'Temaki california sem kani', price: 'R$ 26,90' },
      { name: 'Hossomaki pepino (10 un)', price: 'R$ 24,90' },
      { name: 'Salada The Garden família', price: 'R$ 54,90' },
      { name: 'Legumes e grelhados veganos', price: 'R$ 10,90 a R$ 17,90' },
    ],
  },
];

const spaceGallery = [
  { url: 'https://i.ibb.co/cK9C7zWp/Entrada-2.jpg', category: 'Entrada' },
  { url: 'https://i.ibb.co/rf0Jf50j/Entrada.jpg', category: 'Entrada' },
  { url: 'https://i.ibb.co/7t6qXXsN/Deck-principal-2.jpg', category: 'Deck Principal' },
  { url: 'https://i.ibb.co/RppHQmn0/Deck-principal-3.jpg', category: 'Deck Principal' },
  { url: 'https://i.ibb.co/gMWLwGwZ/Deck-principal-4.jpg', category: 'Deck Principal' },
  { url: 'https://i.ibb.co/HLtPLDL1/Deck-principal.jpg', category: 'Deck Principal' },
  { url: 'https://i.ibb.co/PsHcBNSG/Deck-Pet-e-Rua-3.jpg', category: 'Deck Pet e Rua' },
  { url: 'https://i.ibb.co/6JGnk6Sd/Deck-Pet-e-Rua-4.jpg', category: 'Deck Pet e Rua' },
  { url: 'https://i.ibb.co/gZBtZN29/Deck-Pet-e-Rua-5.jpg', category: 'Deck Pet e Rua' },
  { url: 'https://i.ibb.co/N6bHT7LN/Deck-Pet-e-Rua-6.jpg', category: 'Deck Pet e Rua' },
  { url: 'https://i.ibb.co/FbdKySpK/Deck-Pet-e-Rua.jpg', category: 'Deck Pet e Rua' },
  { url: 'https://i.ibb.co/9m1CNT3J/Deck-do-Lago-2.jpg', category: 'Deck do Lago' },
  { url: 'https://i.ibb.co/twHh28xS/Deck-do-Lago-3.jpg', category: 'Deck do Lago' },
  { url: 'https://i.ibb.co/jZ1dWGY9/Deck-do-Lago-4.jpg', category: 'Deck do Lago' },
  { url: 'https://i.ibb.co/d4VvcPfM/Deck-do-Lago.jpg', category: 'Deck do Lago' },
  { url: 'https://i.ibb.co/0wgXDrb/Deck-da-rvore.jpg', category: 'Deck da Árvore' },
  { url: 'https://i.ibb.co/N4SH3Hb/rea-Fumantes.jpg', category: 'Área Fumantes' },
];

const foodGallery = [
  'https://i.ibb.co/277z8WNN/57-scaled.jpg',
  'https://i.ibb.co/V0C6s9hp/2-scaled.jpg',
  'https://i.ibb.co/xtvdbfnL/42-scaled.jpg',
  'https://i.ibb.co/HpLG83ds/33-scaled-1.jpg',
  'https://i.ibb.co/mnxvKzs/31-scaled.jpg',
  'https://i.ibb.co/Jw63Ggzz/24-scaled.jpg',
  'https://i.ibb.co/7Jq4bcRy/14-scaled.jpg',
  'https://i.ibb.co/fGBsXkL7/7-scaled.jpg',
  'https://i.ibb.co/F4vMGGZk/35-scaled-1.jpg',
  'https://i.ibb.co/hFMmDP2L/49-scaled-1.jpg',
  'https://i.ibb.co/MxCkH7p8/53-scaled.jpg',
  'https://i.ibb.co/FkFBqWMt/66-scaled.jpg',
  'https://i.ibb.co/wN6wpTBD/69-scaled.jpg',
];

const eventosData = [
  {
    img: images.confraternizacao,
    title: 'Confraternizações',
    desc: 'O ambiente perfeito para celebrar conquistas com sua equipe ou amigos. Pacotes especiais e cardápio adaptável.',
  },
  {
    img: images.aniversario,
    title: 'Aniversários',
    desc: 'Comemore mais um ano de vida com estilo. Condições exclusivas, drinks autorais e muita animação.',
  },
  {
    img: images.drink_eventos,
    title: 'Mixologia & Coquetéis',
    desc: 'Drinks autorais e clássicos executados com perfeição. A melhor energia do Rio para curtir a noite.',
  },
  {
    img: images.finais_de_semana,
    title: 'Finais de Semana',
    desc: 'Programação com atrações diferenciadas. De feijoada com roda de samba a eventos temáticos imperdíveis.',
  },
];

const _depoimentos = [
  {
    nome: 'Mariana Costa',
    texto: 'Ambiente incrível! A área kids é super segura e as crianças adoraram. O sushi é de altíssima qualidade e o atendimento perfeito.',
    estrelas: 5,
    guia: 'Guia Local',
  },
  {
    nome: 'Roberto Almeida',
    texto: 'Fui assistir ao jogo do Flamengo e a energia do lugar é surreal. A batata com cheddar e a parrilla estavam perfeitas.',
    estrelas: 5,
    guia: '12 avaliações',
  },
  {
    nome: 'Fernanda Lima',
    texto: 'Melhor gastrobar de Jacarepaguá. Atendimento impecável e o espaço para pets fez toda a diferença.',
    estrelas: 5,
    guia: 'Guia Local',
  },
];

const locations = {
  the_garden: {
    name: 'The Garden - Vila Mariana',
    address: 'Av. Engenheiro Luís Gomes Cardim Sangirardi, 20 - Vila Mariana, São Paulo - SP, 04112-080',
    phone: '(11) 5082-2520',
    description: 'Bar amplo com deque ao ar livre cercado por árvores, oferece um cardápio de pratos brasileiros e japoneses.',
    serviceOptions: 'Pratos para happy hour · Espaço privativo para eventos · Ótimos coquetéis',
    serviceHours: [
      {
        title: 'Horário de funcionamento',
        lines: [
          'terça-feira: 18:00–22:30',
          'quarta-feira: 18:00–22:30',
          'quinta-feira: 18:00–23:30',
          'sexta-feira: 18:00–00:30',
          'sábado: 12:00–00:30',
          'domingo: 12:00–22:30',
          'segunda-feira: Fechado',
        ],
      },
      {
        title: 'Entrega',
        lines: [
          'terça-feira: 18:00–22:30',
          'quarta-feira: 18:00–22:30',
          'quinta-feira: 18:00–22:30',
          'sexta-feira: 12:00–23:00',
          'sábado: 12:00–23:00',
          'domingo: 12:00–22:00',
          'segunda-feira: Fechado',
        ],
      },
      {
        title: 'Para viagem',
        lines: [
          'terça-feira: 18:00–23:00',
          'quarta-feira: 18:00–23:00',
          'quinta-feira: 18:00–23:00',
          'sexta-feira: 12:00–23:00',
          'sábado: 12:00–23:00',
          'domingo: 12:00–22:00',
          'segunda-feira: Fechado',
        ],
      },
    ],
    schedule: {
      0: [{ start: 12 * 60, end: 22 * 60 + 30 }],
      1: [],
      2: [{ start: 18 * 60, end: 22 * 60 + 30 }],
      3: [{ start: 18 * 60, end: 22 * 60 + 30 }],
      4: [{ start: 18 * 60, end: 23 * 60 + 30 }],
      5: [{ start: 18 * 60, end: 24 * 60 + 30 }],
      6: [{ start: 12 * 60, end: 24 * 60 + 30 }],
    },
  },
};

const isLocationOpenNow = (schedule) => {
  const nowInSaoPaulo = new Date(new Date().toLocaleString('en-US', { timeZone: 'America/Sao_Paulo' }));
  const day = nowInSaoPaulo.getDay();
  const minutesNow = nowInSaoPaulo.getHours() * 60 + nowInSaoPaulo.getMinutes();

  const todayRanges = schedule?.[day] ?? [];
  const isOpenToday = todayRanges.some((range) => {
    if (range.end <= 24 * 60) {
      return minutesNow >= range.start && minutesNow < range.end;
    }

    return minutesNow >= range.start;
  });

  if (isOpenToday) {
    return true;
  }

  const previousDay = (day + 6) % 7;
  const previousDayRanges = schedule?.[previousDay] ?? [];

  return previousDayRanges.some((range) => range.end > 24 * 60 && minutesNow < range.end - 24 * 60);
};

const WORDS = ['da comida brasileira', 'da comida oriental', 'dos espetinhos'];

const ChatbotAvatar = ({ size = 'w-10 h-10' }) => {
  const [imgError, setImgError] = useState(false);

  return (
    <div className={`relative ${size}`}>
      <div className="w-full h-full bg-[#050505] rounded-full overflow-hidden border-[2.5px] border-[#25D366] shadow-[0_0_15px_rgba(37,211,102,0.3)] flex items-center justify-center p-2 relative z-0">
        {!imgError ? (
          <img
            src={LOGO_URL}
            alt="The Garden Atendimento"
            className="w-full h-full object-contain filter drop-shadow-[0_0_5px_rgba(255,255,255,0.2)]"
            onError={() => setImgError(true)}
          />
        ) : (
          <div className="w-full h-full bg-gradient-to-br from-amber-600 to-amber-900 flex items-center justify-center rounded-full">
            <User className="w-2/3 h-2/3 text-white" />
          </div>
        )}
      </div>
      <span className="absolute bottom-0 right-0 w-3.5 h-3.5 bg-[#25D366] border-2 border-white rounded-full z-10 shadow-sm translate-x-[10%] translate-y-[10%]"></span>
    </div>
  );
};

const Carousel = ({ title, subtitle, images }) => {
  const scrollRef = useRef(null);
  const scroll = (direction) => {
    if (scrollRef.current) {
      const scrollAmount = direction === 'left' ? -400 : 400;
      scrollRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };

  return (
    <div className="py-16">
      <div className="container mx-auto px-6 mb-8 flex justify-between items-end">
        <div>
          <h4 className="text-green-500 font-black tracking-widest text-xs uppercase mb-2">{subtitle}</h4>
          <h3 className="text-3xl md:text-5xl font-black text-white">{title}</h3>
        </div>
        <div className="hidden md:flex space-x-2">
          <button onClick={() => scroll('left')} className="cursor-pointer p-3 bg-white/5 hover:bg-green-600 rounded-full border border-white/10 transition-all"><ChevronLeft size={24} /></button>
          <button onClick={() => scroll('right')} className="cursor-pointer p-3 bg-white/5 hover:bg-green-600 rounded-full border border-white/10 transition-all"><ChevronRight size={24} /></button>
        </div>
      </div>
      <div ref={scrollRef} className="flex overflow-x-auto space-x-6 px-6 md:px-[10%] pb-8 scrollbar-hide snap-x" style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
        {images.map((item, idx) => (
          <div key={idx} className="flex-shrink-0 w-[85vw] md:w-[450px] aspect-[4/5] rounded-[32px] overflow-hidden border border-white/10 snap-center group relative bg-stone-900">
            <img src={typeof item === 'string' ? item : item.url} alt={title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" loading="lazy" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-8">
              <div className="translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                <Camera className="text-green-500 mb-2 w-6 h-6" />
                <p className="text-white font-bold tracking-widest uppercase text-xs">{typeof item === 'string' ? 'The Garden RJ' : item.category}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

const App = () => {
  const [currentPage, setCurrentPage] = useState('home');
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeLocation, setActiveLocation] = useState('the_garden');
  const [scrolled, setScrolled] = useState(false);

  const [isChatActive, setIsChatActive] = useState(false);
  const [chatStep, setChatStep] = useState(0);
  const [isLifted, setIsLifted] = useState(false);

  const _depoimentosRef = useRef(null);
  const footerRef = useRef(null);

  const [text, setText] = useState('');
  const [wordIndex, setWordIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const isInternalPage = currentPage !== 'home';

  const locationStatus = useMemo(
    () => Object.fromEntries(Object.entries(locations).map(([key, location]) => [key, isLocationOpenNow(location.schedule)])),
    []
  );

  useEffect(() => {
    let timer;
    const currentWord = WORDS[wordIndex];
    const nextWord = WORDS[(wordIndex + 1) % WORDS.length];
    let commonPrefixLen = 0;
    while (
      commonPrefixLen < currentWord.length &&
      commonPrefixLen < nextWord.length &&
      currentWord[commonPrefixLen] === nextWord[commonPrefixLen]
    ) {
      commonPrefixLen++;
    }
    if (isDeleting) {
      timer = setTimeout(() => {
        const nextText = currentWord.substring(0, text.length - 1);
        setText(nextText);
        if (nextText.length <= commonPrefixLen) {
          setIsDeleting(false);
          setWordIndex((prev) => (prev + 1) % WORDS.length);
        }
      }, 60);
    } else {
      timer = setTimeout(() => {
        setText(currentWord.substring(0, text.length + 1));
        if (text.length === currentWord.length) {
          timer = setTimeout(() => setIsDeleting(true), 2500);
        }
      }, 100);
    }
    return () => clearTimeout(timer);
  }, [text, isDeleting, wordIndex]);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);

      if (footerRef.current) {
        const footerRect = footerRef.current.getBoundingClientRect();
        const viewportHeight = window.innerHeight;
        setIsLifted(footerRect.top < viewportHeight);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const playNotificationSound = () => {
    try {
      const audioCtx = new (window.AudioContext || window.webkitAudioContext)();
      const oscillator = audioCtx.createOscillator();
      const gainNode = audioCtx.createGain();
      oscillator.connect(gainNode);
      gainNode.connect(audioCtx.destination);
      oscillator.type = 'sine';
      oscillator.frequency.setValueAtTime(800, audioCtx.currentTime);
      oscillator.frequency.exponentialRampToValueAtTime(300, audioCtx.currentTime + 0.1);
      gainNode.gain.setValueAtTime(0, audioCtx.currentTime);
      gainNode.gain.linearRampToValueAtTime(0.2, audioCtx.currentTime + 0.01);
      gainNode.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + 0.1);
      oscillator.start(audioCtx.currentTime);
      oscillator.stop(audioCtx.currentTime + 0.1);
    } catch {
      // no-op
    }
  };

  const handleOpenChat = () => {
    setIsChatActive(!isChatActive);
    if (chatStep === 0) {
      setChatStep(1);
      setTimeout(() => {
        setChatStep(2);
        playNotificationSound();
      }, 1200);
      setTimeout(() => {
        setChatStep(3);
        playNotificationSound();
      }, 3000);
    }
  };

  const getWhatsAppLink = (msg) =>
    `https://wa.me/55${locations[activeLocation].phone.replace(/\D/g, '')}?text=${encodeURIComponent(msg)}`;

  const goToHomeSection = (sectionId) => {
    setCurrentPage('home');
    requestAnimationFrame(() => {
      const section = document.getElementById(sectionId);
      if (section) {
        section.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  };

  const navLinks = [
    {
      label: 'Início',
      action: () => {
        setCurrentPage('home');
        window.scrollTo(0, 0);
      },
    },
    {
      label: 'Cardápio',
      action: () => {
        setCurrentPage('menu');
        window.scrollTo(0, 0);
      },
    },
    {
      label: 'Eventos',
      action: () => goToHomeSection('eventos'),
    },
    {
      label: 'Galeria',
      action: () => {
        setCurrentPage('gallery');
        window.scrollTo(0, 0);
      },
    },
    {
      label: 'Unidades',
      action: () => goToHomeSection('unidades'),
    },
  ];

  return (
    <div className="min-h-screen bg-[#050505] text-stone-100 font-sans selection:bg-green-500 selection:text-white scroll-smooth overflow-x-hidden">
      <div className={`fixed right-6 z-[120] flex flex-col items-end transition-all duration-700 ${isLifted ? 'bottom-80 md:bottom-64' : 'bottom-6'}`}>
        <div className={`transition-all duration-500 transform origin-bottom-right ${isChatActive ? 'scale-100 opacity-100 mb-6' : 'scale-0 opacity-0 h-0 pointer-events-none'}`}>
          <div className="w-[320px] md:w-[380px] bg-[#e5ddd5] rounded-[2rem] shadow-2xl overflow-hidden flex flex-col border border-stone-200 relative">
            <div className="bg-gradient-to-r from-[#008069] to-[#00a884] p-5 flex items-center justify-between relative z-20">
              <div className="flex items-center gap-4">
                <ChatbotAvatar size="w-12 h-12" />
                <div>
                  <div className="flex items-center gap-1">
                    <h4 className="text-white font-black text-lg leading-tight tracking-tight">The Garden</h4>
                    <div className="w-4 h-4 bg-white rounded-full flex items-center justify-center"><div className="w-2.5 h-2.5 bg-blue-500 rounded-full"></div></div>
                  </div>
                  <div className="flex items-center gap-1.5 mt-0.5">
                    <span className="w-2 h-2 rounded-full bg-green-300 animate-pulse"></span>
                    <p className="text-green-100 text-[11px] font-bold uppercase tracking-widest">Atendimento Oficial</p>
                  </div>
                </div>
              </div>
              <button onClick={() => setIsChatActive(false)} className="cursor-pointer text-white/80 hover:text-white bg-black/10 p-2 rounded-full"><X size={20} /></button>
            </div>
            <div className="p-5 h-[320px] overflow-y-auto flex flex-col gap-3 relative z-10 scrollbar-hide">
              <div className="absolute inset-0 opacity-[0.08] bg-[url('https://i.ibb.co/6H9PqQK/bg-whatsapp.png')] bg-repeat mix-blend-multiply z-0"></div>
              <div className="text-center mb-2 mt-2 relative z-10"><span className="text-[10px] text-stone-500 bg-white/80 px-4 py-1.5 rounded-full uppercase font-black shadow-sm">Hoje</span></div>
              {chatStep >= 2 && <div className="bg-white p-3.5 px-4 rounded-2xl rounded-tl-sm shadow-sm max-w-[85%] self-start relative z-10 animate-fade-in-up"><p className="text-[14px] text-stone-800 font-medium">Olá! 👋 Bem-vindo ao <b>The Garden</b>.</p></div>}
              {chatStep >= 3 && (
                <div className="relative z-10 animate-fade-in-up flex flex-col gap-3 w-full">
                  <div className="bg-white p-3.5 px-4 rounded-2xl rounded-tl-sm shadow-sm max-w-[90%] self-start"><p className="text-[14px] text-stone-800 font-medium">Como podemos ajudar hoje?</p></div>
                  <div className="flex flex-col gap-2 pl-2">
                    <a href={getWhatsAppLink('Olá! Gostaria de consultar a disponibilidade para fazer uma reserva.')} target="_blank" rel="noopener noreferrer" className="bg-green-50 hover:bg-green-500 hover:text-white text-green-900 border border-green-200 rounded-full py-2.5 px-5 text-xs font-black transition-all shadow-sm max-w-[85%] flex items-center gap-2">📅 Reserva</a>
                    <a href={getWhatsAppLink('Olá! Tenho interesse em comemorar meu aniversário no The Garden.')} target="_blank" rel="noopener noreferrer" className="bg-green-50 hover:bg-green-500 hover:text-white text-green-900 border border-green-200 rounded-full py-2.5 px-5 text-xs font-black transition-all shadow-sm max-w-[85%] flex items-center gap-2">🎉 Aniversário</a>
                  </div>
                </div>
              )}
            </div>
            <div className="p-3 bg-[#f0f2f5] border-t border-stone-200 flex items-center gap-2 relative z-20"><div className="flex-1 bg-white rounded-full py-2.5 px-4 text-stone-400 text-sm shadow-inner">Digite sua mensagem...</div></div>
          </div>
        </div>

        <button onClick={handleOpenChat} className={`cursor-pointer flex items-center justify-center w-16 h-16 md:w-[72px] md:h-[72px] rounded-full shadow-2xl transition-all duration-500 relative z-50 group ${isChatActive ? 'bg-stone-800 text-white rotate-90 scale-90' : 'bg-[#25D366] text-white hover:scale-105'}`}>
          {isChatActive ? <X size={32} /> : <><MessageCircle size={36} className="relative z-10" /><div className="absolute inset-0 bg-white/20 scale-0 group-hover:scale-100 rounded-full transition-transform duration-500"></div></>}
          {!isChatActive && chatStep === 0 && <span className="absolute top-0 right-0 flex h-4 w-4 -mt-0.5 -mr-0.5"><span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span><span className="relative inline-flex rounded-full h-full w-full bg-red-500 border-[2.5px] border-[#050505]"></span></span>}
        </button>
      </div>

      <nav className={`fixed w-full z-[100] transition-all duration-700 ${(scrolled || isInternalPage) ? 'bg-black/90 backdrop-blur-xl py-2 border-b border-white/5' : 'bg-transparent py-8'}`}>
        <div className="container mx-auto px-6 flex justify-between items-center">
          <div className="flex items-center cursor-pointer" onClick={() => setCurrentPage('home')}>
            <img src={LOGO_URL} alt="The Garden Logo" className={`object-contain transition-all duration-700 hover:scale-110 drop-shadow-[0_0_20px_rgba(255,255,255,0.15)] ${(scrolled || isInternalPage) ? 'h-14 md:h-20' : 'h-20 md:h-32'}`} />
          </div>
          <div className="hidden lg:flex space-x-10 items-center font-semibold text-xs tracking-widest uppercase text-white/70">
            {navLinks.map((link, i) => (
              <a key={i} href={link.href || '#'} onClick={(e) => { if (link.action) { e.preventDefault(); link.action(); } }} className="hover:text-green-400 transition-colors">{link.label}</a>
            ))}
            <a href={RESERVAS_URL} target="_blank" rel="noopener noreferrer" className="cursor-pointer bg-green-600 hover:bg-green-500 text-white px-8 py-3 rounded-full transition-all text-[10px] font-black tracking-widest shadow-lg shadow-green-900/40">RESERVAS</a>
          </div>
          <button className="cursor-pointer lg:hidden text-white" onClick={() => setIsMenuOpen(!isMenuOpen)}>{isMenuOpen ? <X size={32} /> : <MenuIcon size={32} />}</button>
        </div>
      </nav>

      {isMenuOpen && (
        <div className="fixed inset-0 z-[110] bg-black flex flex-col items-center justify-center space-y-10 text-3xl font-black tracking-tighter">
          <button className="cursor-pointer absolute top-8 right-8" onClick={() => setIsMenuOpen(false)}><X size={40} /></button>
          {navLinks.map((link, i) => (
            <a
              key={i}
              href={link.href || '#'}
              onClick={(e) => {
                if (link.action) {
                  e.preventDefault();
                }
                setIsMenuOpen(false);
                if (link.action) {
                  link.action();
                }
              }}
            >
              {link.label}
            </a>
          ))}
          <a href={RESERVAS_URL} target="_blank" rel="noopener noreferrer" className="cursor-pointer bg-green-600 text-white px-12 py-4 rounded-full text-xl">RESERVAR</a>
        </div>
      )}

      {currentPage === 'home' ? (
        <>
          <section className="relative h-screen flex items-center justify-center overflow-hidden">
            <div className="absolute inset-0 z-0">
              <img src={images.hero} alt="The Garden" className="w-full h-full object-cover opacity-50 scale-105" />
              <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-black/20 to-[#050505]"></div>
            </div>
            <div className="container mx-auto px-6 relative z-10 text-center">
              <div className="inline-flex items-center space-x-2 bg-green-500/10 backdrop-blur-md px-5 py-2 rounded-full border border-green-500/20 mb-8">
                <Star className="w-4 h-4 text-amber-500 fill-amber-500" /><span className="text-xs font-bold tracking-widest uppercase text-green-400 italic">Uma experiência única</span>
              </div>
              <h1 className="text-4xl md:text-8xl font-black mb-8 tracking-tighter leading-[1.1] text-white">
                O melhor <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-green-600 inline-block min-h-[1.2em]">
                  {text}<span className="text-green-500 animate-pulse ml-1">|</span>
                </span>
                <br /> em um só lugar.
              </h1>
              <div className="flex flex-col sm:flex-row justify-center gap-6 mt-8">
                <button onClick={() => { setCurrentPage('menu'); window.scrollTo(0, 0); }} className="cursor-pointer bg-green-600 text-white px-12 py-5 rounded-full font-black text-lg hover:bg-green-500 transition-all shadow-2xl flex items-center group">CARDÁPIO <ChevronRight className="ml-2 group-hover:translate-x-1" /></button>
                <button onClick={() => setCurrentPage('gallery')} className="cursor-pointer bg-white/5 hover:bg-white/10 border border-white/10 px-12 py-5 rounded-full font-black text-lg transition-all flex items-center group">GALERIA <Camera className="ml-2 w-5 h-5" /></button>
              </div>
            </div>
          </section>

          <section className="py-16 md:py-32 container mx-auto px-6">
            <div className="mb-10 md:mb-20">
              <h2 className="text-green-500 font-black tracking-widest text-sm mb-4 uppercase">Mix Gastronômico</h2>
              <h3 className="text-5xl md:text-7xl font-black text-white leading-none">Do Oriente à <br /> Brasa Carioca.</h3>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-12 gap-6 md:h-[700px]">
              <div className="md:col-span-7 relative rounded-[40px] overflow-hidden border border-white/5 group cursor-pointer aspect-[4/3] md:aspect-auto">
                <img src={images.sushi} className="w-full h-full object-cover object-center group-hover:scale-110 transition-transform duration-1000" alt="Sushi" />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent"></div>
                <h4 className="absolute bottom-6 left-6 md:bottom-10 md:left-10 text-2xl md:text-4xl font-black text-white uppercase tracking-tighter">Sushi Lounge</h4>
              </div>
              <div className="md:col-span-5 grid grid-rows-2 gap-4 md:gap-6">
                <div className="md:row-span-1 relative rounded-[40px] overflow-hidden border border-white/5 group cursor-pointer aspect-[4/3] md:aspect-auto">
                  <img src={images.steak} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000" alt="Parrilla" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent"></div>
                  <h4 className="absolute bottom-5 left-5 md:bottom-6 md:left-6 text-lg md:text-xl font-black text-white uppercase">Parrilla Argentina</h4>
                </div>
                <div className="grid grid-cols-2 gap-4 md:gap-6">
                  <div className="relative rounded-[40px] overflow-hidden border border-white/5 group cursor-pointer aspect-square md:aspect-auto">
                    <img src={images.drink_bento} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000" alt="Drink" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent"></div>
                    <h4 className="absolute bottom-3 left-3 md:bottom-4 md:left-4 text-[11px] md:text-sm font-black text-white uppercase">Mixologia</h4>
                  </div>
                  <div className="relative rounded-[40px] overflow-hidden border border-white/5 group cursor-pointer aspect-square md:aspect-auto">
                    <img src={images.sobremesa} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000" alt="Sobremesa" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent"></div>
                    <h4 className="absolute bottom-3 left-3 md:bottom-4 md:left-4 text-[11px] md:text-sm font-black text-white uppercase">Sobremesas</h4>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <section className="py-16 md:py-32 bg-[#080808] border-y border-white/5">
            <div className="container mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
              <div className="rounded-[60px] overflow-hidden border border-white/10 shadow-2xl relative">
                <img src={images.kids} className="w-full aspect-square object-cover" alt="Área Kids" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
              </div>
              <div className="space-y-8">
                <h2 className="text-green-500 font-black tracking-widest text-sm uppercase">Experiência Única</h2>
                <h3 className="text-5xl font-black text-white leading-tight">O ambiente perfeito para sua família.</h3>
                <div className="grid grid-cols-2 gap-6">
                  <div className="p-6 bg-white/5 rounded-3xl border border-white/5 hover:border-green-500/30"><Baby className="text-green-500 mb-4" size={32} /><p className="font-bold">Área Kids</p></div>
                  <div className="p-6 bg-white/5 rounded-3xl border border-white/5 hover:border-green-500/30"><Music className="text-green-500 mb-4" size={32} /><p className="font-bold">Música ao Vivo</p></div>
                  <div className="p-6 bg-white/5 rounded-3xl border border-white/5 hover:border-green-500/30"><Dog className="text-green-500 mb-4" size={32} /><p className="font-bold">Aceita Pets</p></div>
                  <div className="p-6 bg-white/5 rounded-3xl border border-white/5 hover:border-green-500/30"><Utensils className="text-green-500 mb-4" size={32} /><p className="font-bold">Cozinha Show</p></div>
                </div>
              </div>
            </div>
          </section>

          <section id="eventos" className="py-32 container mx-auto px-6">
            <div className="text-center mb-20">
              <h2 className="text-green-500 font-black tracking-widest text-sm mb-4 uppercase">Celebre Conosco</h2>
              <h3 className="text-5xl md:text-6xl font-black text-white">Eventos no Garden</h3>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
              {eventosData.map((ev, i) => (
                <div key={i} className="group relative rounded-[40px] overflow-hidden border border-white/10 aspect-[3/4] bg-stone-900">
                  <img src={ev.img} alt={ev.title} className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent"></div>
                  <div className="absolute inset-0 p-8 flex flex-col justify-end translate-y-8 group-hover:translate-y-0 transition-all duration-500">
                    <CalendarHeart className="text-green-500 mb-4 w-8 h-8 opacity-0 group-hover:opacity-100 transition-opacity" />
                    <h4 className="text-2xl font-black text-white uppercase mb-2">{ev.title}</h4>
                    <p className="text-stone-400 text-sm opacity-0 group-hover:opacity-100 transition-opacity">{ev.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>

          <section id="unidades" className="py-32 bg-[#050505]">
            <div className="container mx-auto px-6">
              <h3 className="text-5xl font-black text-white text-center mb-20">Informações da Casa</h3>
              <div className="grid grid-cols-1 gap-10">
                {Object.entries(locations).map(([key, loc]) => (
                  <div key={key} onClick={() => setActiveLocation(key)} className={`p-12 rounded-[50px] border transition-all cursor-pointer ${activeLocation === key ? 'bg-green-800/40 border-green-500 shadow-2xl' : 'bg-white/5 border-white/5 hover:border-white/20'}`}>
                    <div className="flex justify-between items-start mb-10">
                      <MapPin size={40} className={activeLocation === key ? 'text-white' : 'text-green-500'} />
                      <div className={`px-4 py-1 rounded-full text-[10px] font-black uppercase ${locationStatus[key] ? 'bg-green-500/20 text-green-300' : 'bg-red-500/20 text-red-300'}`}>
                        {locationStatus[key] ? 'Aberto Agora' : 'Fechado Agora'}
                      </div>
                    </div>
                    <h4 className="text-4xl font-black mb-6 text-white">{loc.name}</h4>
                    <div className="space-y-4 opacity-80 mb-10 font-medium">
                      <p><span className="text-white font-bold">Endereço:</span> {loc.address}</p>
                      <p><span className="text-white font-bold">Telefone:</span> {loc.phone}</p>
                      <p><span className="text-white font-bold">Funcionamento:</span> Ter-Qua 18:00–22:30 · Qui 18:00–23:30 · Sex 18:00–00:30 · Sáb 12:00–00:30 · Dom 12:00–22:30 · Seg fechado</p>
                    </div>
                    <a href={RESERVAS_URL} target="_blank" rel="noopener noreferrer" className={`cursor-pointer w-full py-4 rounded-full font-black uppercase text-sm transition-all text-center block ${activeLocation === key ? 'bg-white text-green-700' : 'bg-green-600 text-white'}`}>Reservar Mesa</a>
                  </div>
                ))}
              </div>
            </div>
          </section>
        </>
      ) : currentPage === 'menu' ? (
        <section id="menu" className="pt-40 md:pt-44 pb-20 md:pb-28 min-h-screen container mx-auto px-6">
          <div className="mb-8 md:mb-16 max-w-3xl">
            <h2 className="text-green-500 font-black tracking-widest text-sm mb-4 uppercase">Cardápio</h2>
            <h3 className="text-3xl sm:text-4xl md:text-6xl font-black text-white leading-[1.05]">Nossos Pratos <br /> e Bebidas.</h3>
          </div>
          <div className="grid grid-cols-1 xl:grid-cols-2 gap-5 md:gap-7">
            {menuSections.map((section) => (
              <div key={section.title} className="rounded-[24px] md:rounded-[28px] border border-white/10 bg-white/5 p-5 md:p-7">
                <h4 className="text-xl md:text-2xl font-black text-white mb-5">{section.title}</h4>
                <ul className="space-y-3">
                  {section.items.map((item) => (
                    <li key={`${section.title}-${item.name}`} className="pb-3 border-b border-white/10 last:border-b-0 last:pb-0">
                      <div className="flex items-start justify-between gap-3">
                        <p className="text-stone-100 font-semibold leading-snug text-[15px] md:text-base flex-1">{item.name}</p>
                        <span className="text-green-400 font-black whitespace-nowrap text-sm md:text-base">{item.price}</span>
                      </div>
                      {item.description && <p className="text-stone-400 text-sm mt-1">{item.description}</p>}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
          <div className="mt-8 flex justify-end">
            <a href={MENU_URL} target="_blank" rel="noopener noreferrer" className="bg-green-600 text-white px-8 py-3 rounded-full font-black text-xs tracking-widest uppercase hover:bg-green-500 transition-all">
              Ver PDF completo
            </a>
          </div>
        </section>
      ) : (
        <section className="pt-32 pb-32 min-h-screen">
          <div className="container mx-auto px-6 mb-24 text-center">
            <h2 className="text-green-500 font-black text-xs uppercase mb-4 tracking-[0.5em]">Galeria The Garden</h2>
            <h3 className="text-5xl md:text-8xl font-black text-white mb-16">Nossa Atmosfera.</h3>
            <div className="relative aspect-video rounded-[40px] md:rounded-[60px] overflow-hidden border border-white/10 shadow-2xl bg-stone-900">
              <iframe className="w-full h-full" src="https://www.youtube.com/embed/fDkZRUWA0S4?autoplay=1&mute=1&loop=1&playlist=fDkZRUWA0S4" title="Vídeo institucional" allowFullScreen></iframe>
            </div>
          </div>
          <Carousel title="Nossos Ambientes" subtitle="Descubra" images={spaceGallery} />
          <Carousel title="Nossa Gastronomia" subtitle="Sabor" images={foodGallery} />
          <div className="text-center mt-20"><button onClick={() => { setCurrentPage('home'); window.scrollTo(0, 0); }} className="cursor-pointer bg-white/5 hover:bg-white/10 hover:text-green-500 border border-white/10 px-12 py-4 rounded-full font-black text-sm uppercase">Voltar ao Início</button></div>
        </section>
      )}

      <footer ref={footerRef} className="py-24 bg-black border-t border-white/5 relative z-10">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-16 mb-20 text-center md:text-left">
            <div className="space-y-8 flex flex-col items-center md:items-start">
              <img src={LOGO_URL} alt="Logo" className="h-28 md:h-40 object-contain drop-shadow-[0_10px_30px_rgba(255,255,255,0.1)] hover:scale-105 transition-transform" />
              <p className="text-stone-500 text-sm max-w-xs">Bar amplo com deque ao ar livre cercado por árvores, com pratos brasileiros e japoneses.</p>
            </div>
            <div className="space-y-8 text-sm pt-4">
              <h5 className="font-black text-white uppercase tracking-widest border-l-2 border-green-600 pl-4">Contatos</h5>
              <ul className="space-y-4 text-stone-500 font-medium">
                <li className="flex items-center justify-center md:justify-start"><Phone size={14} className="mr-3 text-green-500" /> (11) 5082-2520</li>
                <li className="flex items-center justify-center md:justify-start"><MapPin size={14} className="mr-3 text-green-500" /> Vila Mariana, São Paulo - SP</li>
                <li className="flex items-center justify-center md:justify-start"><Clock size={14} className="mr-3 text-green-500" /> terça a domingo (segunda fechado)</li>
                <li className="flex items-center justify-center md:justify-start"><a href={MENU_URL} target="_blank" rel="noopener noreferrer" className="text-green-300 hover:text-green-200">Menu</a></li>
              </ul>
            </div>
            <div className="space-y-8 text-sm pt-4">
              <h5 className="font-black text-white uppercase tracking-widest border-l-2 border-green-600 pl-4">Conecte-se</h5>
              <div className="flex justify-center md:justify-start"><a href="#" className="w-14 h-14 rounded-2xl bg-white/5 flex items-center justify-center text-white hover:bg-green-600 shadow-xl border border-white/5"><Instagram size={24} /></a></div>
            </div>
          </div>
          <div className="pt-10 border-t border-white/5 flex flex-col md:flex-row justify-between items-center text-[9px] font-bold tracking-[0.3em] text-stone-700 uppercase">
            <p className="mb-4 md:mb-0">© {new Date().getFullYear()} THE GARDEN GASTROBAR. TODOS OS DIREITOS RESERVADOS.</p>
            <p>DESENVOLVIDO POR ELIAS ARAUJO</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default App;
