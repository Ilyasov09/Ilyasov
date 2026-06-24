import {
  useState, useEffect, useRef, useCallback, useMemo
} from "react";
import {
  Github, ExternalLink, Sun, Moon, Home, User, Zap,
  FolderOpen, Clock, Mail, ArrowUpRight, ChevronRight
} from "lucide-react";
import WaveEmoji from "./components/WaveEmoji";
import avatar from "../assets/images/avatar.jpg";

/* ══════════════════════════════════════════════════════════════════
   CONSTANTS & TYPES
══════════════════════════════════════════════════════════════════ */
const CYAN   = "#22d3ee";
const VIOLET = "#a78bfa";
const PINK   = "#f472b6";
const GRAD   = "linear-gradient(135deg, #22d3ee, #a78bfa)";

type Theme = {
  bgPrimary: string; bgSurface: string; bgCard: string;
  textPrimary: string; textMuted: string; textSubtle: string;
  glassBg: string; navbarBg: string;
  borderAccent: string; borderHover: string;
  inputBg: string; particleOpacity: number;
};

const DARK: Theme = {
  bgPrimary:"#080810", bgSurface:"#0f0f1a", bgCard:"#13131f",
  textPrimary:"#f0f4ff", textMuted:"#8892aa", textSubtle:"#3d4460",
  glassBg:"rgba(15,15,30,0.65)", navbarBg:"rgba(8,8,16,0.88)",
  borderAccent:"rgba(34,211,238,0.12)", borderHover:"rgba(34,211,238,0.45)",
  inputBg:"#13131f", particleOpacity:0.18,
};

const LIGHT: Theme = {
  bgPrimary:"#f8f9fc", bgSurface:"#ffffff", bgCard:"#f0f2f8",
  textPrimary:"#0d1117", textMuted:"#5a6478", textSubtle:"#b0bac8",
  glassBg:"rgba(240,242,248,0.75)", navbarBg:"rgba(255,255,255,0.92)",
  borderAccent:"rgba(34,211,238,0.18)", borderHover:"rgba(34,211,238,0.55)",
  inputBg:"#e8eaf2", particleOpacity:0.07,
};

/* ══════════════════════════════════════════════════════════════════
   TRANSLATIONS
══════════════════════════════════════════════════════════════════ */
const T = {
  uz: {
    nav: ["Bosh sahifa","Men haqimda","Ko'nikmalar","Loyihalar","Qiziqishlar","Tarix","Aloqa"],
    ids: ["hero","about","skills","projects","interests","timeline","contact"],
    badge: "Junior Developer",
    hi: "Salom, men",
    name: "Javlon Ilyasov",
    typing: ["Junior Developer","React Developer","Ilyasov","vibe coder"],
    bio: "Tashrif buyurganingiz uchun rahmat!.",
    cta1: "Loyihalarni ko'rish",
    cta2: "CV yuklab olish",
    stat1: "5+ Loyihalar", stat2: "2+ Yil", stat3: "3 Aktiv",
    aboutLabel:"— Men haqimda", aboutTitle:"Ilyasov Javlon",
    p1: "Men Ilyasov Javlon, 2009-yilda O'zbekiston, Samarqand viloyati, Jomboy tumanida tug'ilganman. Dasturlashga 2023-yilda qiziqishim uyg'ondi — YouTube'da Anvar Narzullayevning Python darslarini ko'rib, birinchi kodimni yozdim. O'zim o'rganib, asta-sekin web dunyosiga o'tdim: HTML, CSS, JavaScript, va endi React.",
    p2: "Hozirda IELTS uchun ingliz tilini o'rganayapman va 2027-yilda chet el universitetlariga — kiberxavfsizlik yoki CS yo'nalishida — topshirmoqchiman.",
    dekuQ: "Just be yourself",
    dekuA: "  ",
    skillsTitle:"Ko'nikmalarim", skillsSub:"Vibe coder sifatida",
    toolsLabel:"Ishlatadigan vositalar",
    projTitle:"Loyihalar", projAll:"Barcha loyihalar",
    interestsTitle:"Hobbylarim",
    musicTitle:"Eshitaman",
    musicSub:"Spotify pleylistim",
    musicLink:"Spotify'da ko'rish →",
    interests: [
      { emoji:"🎮", label:"Gaming" },
      { emoji:"💻", label:"Vibe Coding" },
      { emoji:"🧑‍💻", label:"Coding" },
      { emoji:"🎵", label:"Musiqa" },
      { emoji:"🎨", label:"Dizayn" },
      { emoji:"🔐", label:"Kiberxavfsizlik" },
    ],
    timelineTitle:"Tarix", timelineSub:"Dasturlashni organgan vaqtlarim",
    items: [
      {year:"2023",title:"Python boshlandi",desc:"YouTube video darsliklar",icon:"🐍"},
      {year:"2023",title:"Web (HTML/CSS)",desc:"Birinchi veb sahifalar",icon:"🌐"},
      {year:"2024",title:"JavaScript",desc:"Interaktiv ilovalar",icon:"⚡"},
      {year:"2024",title:"React",desc:"Komponent asosidagi UI",icon:"⚛️"},
      {year:"2024",title:"Deku AI Bot",desc:"Telegram AI bot yaratildi",icon:"🤖"},
      {year:"2025",title:"Deku AI & Dekuboard",desc:"To'liq stack loyihalar",icon:"🚀"},
      {year:"2027",title:"Chet el universiteti",desc:"Maqsad: Kiberxavfsizlik / CS",icon:"🎓"},
    ],
    projects: [
      {name:"Deku AI",desc:"React va AI API bilan qurilgan aqlli assistent. Foydalanuvchilarga real vaqtda javoblar beradi va murakkab savollarni tahlil qiladi.",tech:["React","API","Vercel","TailwindCSS"],live:"https://deku-ai.vercel.app"},
      {name:"Dekuboard",desc:"Shaxsiy dashboard loyihasi — ma'lumotlar vizualizatsiyasi, tezkor kirish va zamonaviy UI bilan jihozlangan.",tech:["React","Tailwind","Vercel","TypeScript"],live:"https://dekuboard.vercel.app"},
      {name:"Portfolio v1",desc:"Next.js bilan qurilgan shaxsiy portfolio sayti. Javlon Ilyasovning loyihalari va ko'nikmalari haqida ma'lumot beradi va aloqa imkoniyatini taqdim etadi..",tech:["Next.js", "TypeScript", "Tailwind CSS"],live:"https://javlon07.vercel.app/"},
    ],
    contactTitle:"Aloqa", contactSub:"Loyiha",
    footerSub:"Junior Developer ·  Samarqand",
    footerCopy:"© 2026 Javlon Ilyasov",
  },
  en: {
    nav: ["Home","About","Skills","Projects","Interests","Timeline","Contact"],
    ids: ["hero","about","skills","projects","interests","timeline","contact"],
    badge: "Junior Developer",
    hi: "Hi, I'm",
    name: "Javlon Ilyasov",
    typing: ["Junior Developer","React Developer","Future Cybersecurity Specialist","Creator of brand Deku"],
    bio: "Thank you for visiting!.",
    cta1: "View Projects",
    cta2: "Download CV",
    stat1: "5+ Projects", stat2: "2+ Years", stat3: "3 Active",
    aboutLabel:"— About Me", aboutTitle:"Who am I?",
    p1: "I'm Ilyasov Javlon, born in 2009 in Jomboy district, Samarkand, Uzbekistan. My coding journey started in 2023 — I watched Python tutorials by Anvar Narzullayev on YouTube and wrote my very first lines of code. Fully self-taught, I moved into web development: HTML, CSS, JavaScript, and now React.",
    p2: "Currently learning English for IELTS, planning to apply to foreign universities in 2027, majoring in cybersecurity or computer science.",
    dekuQ: "Just be yourself",
    dekuA: "  ",
    skillsTitle:"My Skills", skillsSub:"Technologies I have taught myself",
    toolsLabel:"Tools I use",
    projTitle:"Projects", projAll:"All projects",
    interestsTitle:"My Interests",
    musicTitle:"I Listen To",
    musicSub:"My Spotify playlists",
    musicLink:"View on Spotify →",
    interests: [
      { emoji:"🎮", label:"Gaming" },
      { emoji:"💻", label:"Vibe Coding" },
      { emoji:"🧑‍💻", label:"Coding" },
      { emoji:"🎵", label:"Music" },
      { emoji:"🎨", label:"Design" },
      { emoji:"🔐", label:"Cybersecurity" },
    ],
    timelineTitle:"My Timeline", timelineSub:"The coding journey so far",
    items: [
      {year:"2023",title:"Started Python",desc:"Self-taught via YouTube",icon:"🐍"},
      {year:"2023",title:"Web (HTML/CSS)",desc:"First web pages",icon:"🌐"},
      {year:"2024",title:"JavaScript",desc:"Interactive web apps",icon:"⚡"},
      {year:"2024",title:"React",desc:"Component-based UI",icon:"⚛️"},
      {year:"2024",title:"Deku AI Bot",desc:"Created Telegram AI bot",icon:"🤖"},
      {year:"2025",title:"Deku AI & Dekuboard",desc:"Full-stack projects",icon:"🚀"},
      {year:"2027",title:"Foreign University",desc:"Goal: Cybersecurity / CS",icon:"🎓"},
    ],
    projects: [
      {name:"Deku AI",desc:"AI-powered smart assistant built with React and AI API. Provides real-time responses and analyzes complex questions with elegant UI.",tech:["React","API","Vercel","TailwindCSS"],live:"https://deku-ai.vercel.app"},
      {name:"Dekuboard",desc:"Personal dashboard project featuring data visualization, quick access tools, and a modern dark UI. A hub for productivity and monitoring.",tech:["React","Tailwind","Vercel","TypeScript"],live:"https://dekuboard.vercel.app"},
      {name:"Portfolio v1",desc:"Personal portfolio site built with Next.js. Provides information about Javlon Ilyasov's projects and skills, and offers a contact option.",tech:["Next.js","TypeScript","Tailwind CSS"],live:"https://javlon07.vercel.app/"},
    ],
    contactTitle:"Contact", contactSub:"Project",
    footerSub:"Junior Developer · Jomboy, Samarkand",
    footerCopy:"© 202 Javlon Ilyasov",
  },
} as const;

type Lang = keyof typeof T;
type Tr = typeof T.en | typeof T.uz;

const LINKS = {
  github: "https://github.com/Ilyasov09",
  telegram: "https://t.me/ilyasov09",
  channel: "https://t.me/cyberdevuz",
  email: "mailto:javlonilyasov97@gmail.com",
  instagram: "https://instagram.com/javlon070409",
  spotify: "https://open.spotify.com/user/",
};

/* ── Skill icons (SVG-based real icons, not emoji) ─────────────────── */
const SKILL_ICON_URLS: Record<string, string> = {
  HTML:       "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg",
  CSS:        "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original.svg",
  JavaScript: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg",
  React:      "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg",
  Python:     "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg",
  Git:        "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg",
  Figma:      "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/figma/figma-original.svg",
};

const SKILLS = [
  {name:"HTML",    pct:85, color:"#e34c26"},
  {name:"CSS",     pct:80, color:"#264de4"},
  {name:"JavaScript",pct:65,color:"#f7df1e"},
  {name:"React",   pct:55, color:"#61dafb"},
  {name:"Python",  pct:60, color:"#3776ab"},
  {name:"Git",     pct:70, color:"#f05032"},
  {name:"Figma",   pct:60, color:"#a259ff"},
];

const TOOLS = ["VS Code","Vercel","GitHub","Tailwind CSS","Node.js"];

const GRAD_CARDS = [
  "linear-gradient(135deg,rgba(34,211,238,0.35),rgba(167,139,250,0.35))",
  "linear-gradient(135deg,rgba(167,139,250,0.35),rgba(244,114,182,0.3))",
  "linear-gradient(135deg,rgba(244,114,182,0.3),rgba(34,211,238,0.35))",
];

/* ── Spotify playlists ─────────────────────────────────────────────── */
const SPOTIFY_PLAYLISTS = [
  {
    id: "7npUa7F0wedFQmGu3SuSXC",
    label_uz: "1-chi Pleylist",
    label_en: "Playlist 1",
  },
  {
    id: "4yASU6tjv6FbgBVxfmbsS8",
    label_uz: "2-chi Pleylist",
    label_en: "Playlist 2",
  },
];

/* ── Particles ─────────────────────────────────────────────────────── */
const isMobile = typeof window !== "undefined" && window.innerWidth < 768;
const PARTICLE_COUNT = isMobile ? 10 : 28;
const PARTICLES = Array.from({length:PARTICLE_COUNT}, (_,i)=>({
  w: ((i*37)%3)+1, h: ((i*53)%3)+1,
  left:`${(i*3.7+2)%100}%`, top:`${(i*5.3+7)%100}%`,
  mult:((i*0.13)%1)+0.5,
  dur:4+((i*0.7)%6), delay:(i*0.4)%4,
  color: i%3===0 ? CYAN : i%3===1 ? VIOLET : PINK,
}));

/* ══════════════════════════════════════════════════════════════════
   HOOKS
══════════════════════════════════════════════════════════════════ */
function useTypewriter(words: readonly string[], speed=80, pause=1800) {
  const [shown,setShown]=useState("");
  const [wi,setWi]=useState(0);
  const [ci,setCi]=useState(0);
  const [del,setDel]=useState(false);
  useEffect(()=>{
    const word=words[wi];
    let t:ReturnType<typeof setTimeout>;
    if(!del&&ci<word.length) t=setTimeout(()=>setCi(c=>c+1),speed);
    else if(!del&&ci===word.length) t=setTimeout(()=>setDel(true),pause);
    else if(del&&ci>0) t=setTimeout(()=>setCi(c=>c-1),speed/2);
    else { setDel(false); setWi(i=>(i+1)%words.length); }
    setShown(word.slice(0,ci));
    return ()=>clearTimeout(t);
  },[ci,del,wi,words,speed,pause]);
  return shown;
}

function useScrollReveal(threshold=0.12) {
  const ref=useRef<HTMLDivElement>(null);
  const [vis,setVis]=useState(false);
  useEffect(()=>{
    const el=ref.current; if(!el)return;
    const obs=new IntersectionObserver(([e])=>{
      if(e.isIntersecting){setVis(true);obs.disconnect();}
    },{threshold});
    obs.observe(el);
    return ()=>obs.disconnect();
  },[threshold]);
  return {ref,vis};
}

function useActiveSection(ids: readonly string[]) {
  const [active,setActive]=useState(ids[0]);
  useEffect(()=>{
    const obs=new IntersectionObserver(entries=>{
      entries.forEach(e=>{if(e.isIntersecting)setActive(e.target.id);});
    },{threshold:0.4});
    ids.forEach(id=>{ const el=document.getElementById(id); if(el)obs.observe(el); });
    return ()=>obs.disconnect();
  },[ids]);
  return active;
}

/* ══════════════════════════════════════════════════════════════════
   PRIMITIVES
══════════════════════════════════════════════════════════════════ */
function GradText({children,className=""}:{children:React.ReactNode;className?:string}) {
  return <span className={`gradient-text ${className}`}>{children}</span>;
}

function Reveal({children,className="",delay=0}:{children:React.ReactNode;className?:string;delay?:number}) {
  const {ref,vis}=useScrollReveal();
  return (
    <div ref={ref} className={className} style={{
      opacity:vis?1:0, transform:vis?"translateY(0)":"translateY(32px)",
      transition:`opacity 0.65s ease ${delay}ms, transform 0.65s ease ${delay}ms`,
    }}>
      {children}
    </div>
  );
}

function GlassCard({children,className="",hover=true,theme,style:sx}:{
  children:React.ReactNode;className?:string;hover?:boolean;theme:Theme;style?:React.CSSProperties;
}) {
  const [h,setH]=useState(false);
  return (
    <div
      onMouseEnter={()=>setH(true)} onMouseLeave={()=>setH(false)}
      className={`rounded-2xl transition-all duration-300 ${className}`}
      style={{
        background:theme.glassBg, backdropFilter:"blur(16px)",
        border:`1px solid ${h&&hover?theme.borderHover:theme.borderAccent}`,
        transform:h&&hover?"translateY(-6px)":"translateY(0)",
        boxShadow:h&&hover?"0 16px 48px rgba(34,211,238,0.1)":"none",
        ...sx,
      }}
    >
      {children}
    </div>
  );
}

function Btn({children,onClick,href,variant="solid",size="md",className="",disabled=false}:{
  children:React.ReactNode;onClick?:()=>void;href?:string;
  variant?:"solid"|"outline";size?:"sm"|"md"|"lg";className?:string;disabled?:boolean;
}) {
  const [h,setH]=useState(false);
  const [p,setP]=useState(false);
  const pad={sm:"px-4 py-2 text-xs",md:"px-6 py-3 text-sm",lg:"px-8 py-4 text-base"}[size];
  const st:React.CSSProperties={
    position:"relative",display:"inline-flex",alignItems:"center",gap:8,
    fontWeight:600,borderRadius:12,cursor:disabled?"not-allowed":"pointer",
    transition:"all 0.2s cubic-bezier(.4,0,.2,1)",outline:"none",
    textDecoration:"none",overflow:"hidden",
    transform:p?"scale(0.96)":h?"scale(1.04)":"scale(1)",
    opacity:disabled?0.5:1,
    ...(variant==="solid"
      ? {background:GRAD,color:"#fff",boxShadow:h?"0 8px 32px rgba(34,211,238,0.35)":"0 2px 8px rgba(0,0,0,0.2)"}
      : {background:h?"rgba(34,211,238,0.1)":"transparent",color:CYAN,
         border:`2px solid ${CYAN}`,boxShadow:h?"0 0 0 3px rgba(34,211,238,0.15)":"none"}),
  };
  const handlers={onMouseEnter:()=>setH(true),onMouseLeave:()=>{setH(false);setP(false);},
    onMouseDown:()=>setP(true),onMouseUp:()=>setP(false)};
  const shine=variant==="solid"&&(
    <span style={{position:"absolute",inset:0,background:"linear-gradient(135deg,rgba(255,255,255,0.18) 0%,transparent 60%)",
      opacity:h?1:0,transition:"opacity 0.3s",pointerEvents:"none"}}/>
  );
  if(href) return <a href={href} target="_blank" rel="noopener noreferrer" className={`${pad} ${className}`} style={st} {...handlers}>{shine}{children}</a>;
  return <button onClick={onClick} className={`${pad} ${className}`} style={st} disabled={disabled} {...handlers}>{shine}{children}</button>;
}

/* ══════════════════════════════════════════════════════════════════
   DARK/LIGHT TOGGLE — 3D LIGHT BURST EFFECT
══════════════════════════════════════════════════════════════════ */
function ThemeToggle({isDark,setIsDark,theme}:{isDark:boolean;setIsDark:(v:boolean)=>void;theme:Theme}) {
  const [burst,setBurst]=useState(false);
  const [burstPos,setBurstPos]=useState({x:0,y:0});
  const btnRef=useRef<HTMLButtonElement>(null);

  const handleToggle=()=>{
    if(btnRef.current){
      const r=btnRef.current.getBoundingClientRect();
      setBurstPos({x:r.left+r.width/2,y:r.top+r.height/2});
    }
    setBurst(true);
    setTimeout(()=>{
      setIsDark(!isDark);
      setTimeout(()=>setBurst(false),600);
    },100);
  };

  return (
    <>
      {/* 3D burst overlay */}
      {burst&&(
        <div style={{
          position:"fixed",inset:0,zIndex:9997,pointerEvents:"none",overflow:"hidden",
        }}>
          <div style={{
            position:"absolute",
            left:burstPos.x,top:burstPos.y,
            width:0,height:0,
            animation:"theme-burst 0.7s cubic-bezier(0.2,0,0,1) forwards",
          }}>
            {/* Radial rings */}
            {[0,1,2].map(i=>(
              <div key={i} style={{
                position:"absolute",
                borderRadius:"50%",
                background:isDark
                  ? `radial-gradient(circle, rgba(255,200,50,0.${7-i*2}) 0%, rgba(255,140,0,0.${4-i}) 40%, transparent 70%)`
                  : `radial-gradient(circle, rgba(34,211,238,0.${6-i*2}) 0%, rgba(167,139,250,0.${4-i}) 50%, transparent 70%)`,
                width:`${(i+1)*200}vw`,height:`${(i+1)*200}vw`,
                left:`-${(i+1)*100}vw`,top:`-${(i+1)*100}vw`,
                animation:`burst-ring-${i} 0.7s cubic-bezier(0.2,0,0,1) forwards`,
                animationDelay:`${i*60}ms`,
              }}/>
            ))}
          </div>
        </div>
      )}
      <button
        ref={btnRef}
        onClick={handleToggle}
        className="w-9 h-9 flex items-center justify-center rounded-xl cursor-pointer transition-all"
        style={{
          background:isDark?"rgba(34,211,238,0.1)":"rgba(167,139,250,0.1)",
          color:isDark?CYAN:VIOLET,
          border:`1px solid ${theme.borderAccent}`,
          position:"relative",overflow:"hidden",
        }}
        aria-label="Toggle theme"
      >
        <div style={{
          transition:"transform 0.4s cubic-bezier(0.34,1.56,0.64,1), opacity 0.3s",
          transform:isDark?"rotate(0deg) scale(1)":"rotate(180deg) scale(0.8)",
          opacity:1,
        }}>
          {isDark?<Sun size={15}/>:<Moon size={15}/>}
        </div>
        {/* Inner glow pulse */}
        <span style={{
          position:"absolute",inset:0,borderRadius:"inherit",
          background:isDark?"radial-gradient(circle,rgba(34,211,238,0.15) 0%,transparent 70%)"
            :"radial-gradient(circle,rgba(167,139,250,0.15) 0%,transparent 70%)",
          opacity:0,animation:"theme-btn-pulse 2s ease-in-out infinite",
        }}/>
      </button>
    </>
  );
}

/* ══════════════════════════════════════════════════════════════════
   CUSTOM CURSOR (desktop only)
══════════════════════════════════════════════════════════════════ */
function CustomCursor() {
  const dot=useRef<HTMLDivElement>(null);
  const ring=useRef<HTMLDivElement>(null);
  const mouse=useRef({x:0,y:0});
  const pos=useRef({x:0,y:0});
  const [touch]=useState(()=>"ontouchstart" in window);

  useEffect(()=>{
    if(touch)return;
    const move=(e:MouseEvent)=>{
      mouse.current={x:e.clientX,y:e.clientY};
      if(dot.current){dot.current.style.left=`${e.clientX}px`;dot.current.style.top=`${e.clientY}px`;}
    };
    window.addEventListener("mousemove",move);
    let raf:number;
    const anim=()=>{
      pos.current.x+=(mouse.current.x-pos.current.x)*0.1;
      pos.current.y+=(mouse.current.y-pos.current.y)*0.1;
      if(ring.current){ring.current.style.left=`${pos.current.x}px`;ring.current.style.top=`${pos.current.y}px`;}
      raf=requestAnimationFrame(anim);
    };
    raf=requestAnimationFrame(anim);
    return ()=>{window.removeEventListener("mousemove",move);cancelAnimationFrame(raf);};
  },[touch]);

  if(touch)return null;
  return (
    <>
      <div ref={dot} className="fixed z-[9999] pointer-events-none hidden md:block"
        style={{width:7,height:7,background:CYAN,borderRadius:"50%",transform:"translate(-50%,-50%)",mixBlendMode:"difference"}}/>
      <div ref={ring} className="fixed z-[9998] pointer-events-none hidden md:block"
        style={{width:30,height:30,border:`2px solid ${VIOLET}`,borderRadius:"50%",transform:"translate(-50%,-50%)",opacity:0.6}}/>
    </>
  );
}

/* ══════════════════════════════════════════════════════════════════
   LOADING SCREEN
══════════════════════════════════════════════════════════════════ */
const LOAD_LINES = [
  "Initializing Portfolio...",
  "Loading Components...",
  "Loading Projects...",
  "Connecting Creativity...",
  "Optimizing Experience...",
  "Ready.",
];

function LoadingScreen({onDone}:{onDone:()=>void}) {
  const [prog,setProg]=useState(0);
  const [lineIdx,setLineIdx]=useState(0);
  useEffect(()=>{
    let cur=0;
    const iv=setInterval(()=>{
      cur+=Math.random()*5+2;
      if(cur>=100){cur=100;clearInterval(iv);setTimeout(onDone,400);}
      setProg(Math.floor(cur));
      setLineIdx(Math.floor((cur/100)*(LOAD_LINES.length-1)));
    },60);
    return ()=>clearInterval(iv);
  },[onDone]);
  return (
    <div className="loading-screen" style={{fontFamily:"var(--font-mono)"}}>
      <div style={{position:"relative",marginBottom:28}}>
        <img src={avatar} alt="avatar" draggable={false}
          style={{width:72,height:72,borderRadius:18,objectFit:"cover",display:"block",
            boxShadow:"0 0 32px rgba(34,211,238,0.32)",border:`2px solid ${CYAN}`}}/>
        <svg style={{position:"absolute",top:-6,left:-6,animation:"rotate-ring 1.8s linear infinite"}} width={84} height={84} viewBox="0 0 84 84">
          <circle cx={42} cy={42} r={40} fill="none" stroke={CYAN} strokeWidth={2} strokeDasharray="60 200" strokeLinecap="round"/>
        </svg>
      </div>
      <div className="gradient-text" style={{fontSize:22,fontWeight:800,marginBottom:4}}>Javlon Ilyasov</div>
      <div style={{fontSize:12,color:"#8892aa",marginBottom:24,fontFamily:"var(--font-mono)"}}>
        <span style={{color:CYAN}}>$</span> npm run dev
      </div>
      <div style={{width:240,height:2,borderRadius:4,background:"rgba(255,255,255,0.06)",marginBottom:10,overflow:"hidden"}}>
        <div style={{height:"100%",borderRadius:4,background:GRAD,width:`${prog}%`,transition:"width 80ms linear"}}/>
      </div>
      <div style={{fontSize:11,color:"#8892aa",fontFamily:"var(--font-mono)",minHeight:16,textAlign:"center"}}>
        <span style={{color:CYAN}}>✓ </span>{LOAD_LINES[lineIdx]}
      </div>
    </div>
  );
}

/* ══════════════════════════════════════════════════════════════════
   NAVBAR
══════════════════════════════════════════════════════════════════ */
function Navbar({lang,setLang,isDark,setIsDark,t,theme,activeSection}:{
  lang:Lang;setLang:(l:Lang)=>void;isDark:boolean;setIsDark:(v:boolean)=>void;
  t:Tr;theme:Theme;activeSection:string;
}) {
  const [scrolled,setScrolled]=useState(false);
  useEffect(()=>{
    const h=()=>setScrolled(window.scrollY>20);
    window.addEventListener("scroll",h);
    return ()=>window.removeEventListener("scroll",h);
  },[]);
  const scroll=(id:string)=>document.getElementById(id)?.scrollIntoView({behavior:"smooth"});
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 md:px-12 h-16 transition-all duration-300"
      style={{
        background:scrolled?theme.navbarBg:"transparent",
        backdropFilter:scrolled?"blur(20px)":"none",
        borderBottom:scrolled?`1px solid ${theme.borderAccent}`:"none",
      }}>
      <button onClick={()=>scroll("hero")} className="font-bold text-lg cursor-pointer">
        <GradText>Javlon.</GradText>
      </button>

      <div className="hidden md:flex items-center gap-6">
        {t.nav.map((item,i)=>(
          <button key={item} onClick={()=>scroll(t.ids[i])}
            className="text-sm relative cursor-pointer transition-colors group"
            style={{color:activeSection===t.ids[i]?CYAN:theme.textMuted}}
          >
            {item}
            <span className="absolute -bottom-0.5 left-0 h-[2px] rounded-full transition-all duration-300 group-hover:w-full"
              style={{width:activeSection===t.ids[i]?"100%":"0",background:CYAN}}/>
          </button>
        ))}
      </div>

      <div className="flex items-center gap-2">
        <div className="flex rounded-lg overflow-hidden" style={{border:`1px solid ${theme.borderAccent}`}}>
          {(["uz","en"] as const).map(l=>(
            <button key={l} onClick={()=>setLang(l)}
              className="px-3 py-1 text-xs font-semibold uppercase cursor-pointer transition-all"
              style={{background:lang===l?GRAD:"transparent",color:lang===l?"#fff":theme.textMuted}}>
              {l}
            </button>
          ))}
        </div>

        <ThemeToggle isDark={isDark} setIsDark={setIsDark} theme={theme}/>
      </div>
    </nav>
  );
}

/* ══════════════════════════════════════════════════════════════════
   BOTTOM NAV (mobile)
══════════════════════════════════════════════════════════════════ */
const BOTTOM_NAV = [
  {icon:Home,label:"Home",id:"hero"},
  {icon:User,label:"About",id:"about"},
  {icon:Zap,label:"Skills",id:"skills"},
  {icon:FolderOpen,label:"Projects",id:"projects"},
  {icon:Clock,label:"Timeline",id:"timeline"},
  {icon:Mail,label:"Contact",id:"contact"},
];

function BottomNav({theme,activeSection}:{theme:Theme;activeSection:string}) {
  const scroll=(id:string)=>document.getElementById(id)?.scrollIntoView({behavior:"smooth"});
  return (
    <nav className="bottom-nav md:hidden flex items-center justify-around px-2"
      style={{background:theme.navbarBg}} aria-label="Mobile navigation">
      {BOTTOM_NAV.map(({icon:Icon,label,id})=>{
        const isActive=activeSection===id;
        return (
          <button key={id} onClick={()=>scroll(id)}
            className="flex flex-col items-center gap-0.5 flex-1 py-2 min-h-[44px] cursor-pointer transition-all duration-200"
            style={{color:isActive?CYAN:theme.textMuted}} aria-label={label} aria-current={isActive?"page":undefined}>
            <div style={{position:"relative"}}>
              <Icon size={isActive?20:18} strokeWidth={isActive?2.5:1.75}/>
              {isActive&&<div style={{position:"absolute",top:-4,left:"50%",transform:"translateX(-50%)",
                width:4,height:4,borderRadius:"50%",background:CYAN,boxShadow:`0 0 6px ${CYAN}`}}/>}
            </div>
            <span style={{fontSize:9,fontWeight:isActive?700:500,letterSpacing:"0.02em",marginTop:1}}>{label}</span>
          </button>
        );
      })}
    </nav>
  );
}

/* ══════════════════════════════════════════════════════════════════
   HERO
══════════════════════════════════════════════════════════════════ */
function Hero({t,theme}:{t:Tr;theme:Theme}) {
  const typed=useTypewriter(t.typing);
  return (
    <section id="hero" className="relative min-h-screen flex items-center pt-16 px-6 md:px-12 lg:px-20 overflow-hidden">
      {/* Aurora background */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div style={{position:"absolute",top:"-20%",left:"-10%",width:"60vw",height:"60vh",
          background:"radial-gradient(ellipse,rgba(34,211,238,0.07) 0%,transparent 70%)",
          animation:"aurora-1 16s ease-in-out infinite"}}/>
        <div style={{position:"absolute",top:"30%",right:"-10%",width:"50vw",height:"50vh",
          background:"radial-gradient(ellipse,rgba(167,139,250,0.07) 0%,transparent 70%)",
          animation:"aurora-2 20s ease-in-out infinite"}}/>
        <div style={{position:"absolute",bottom:"-10%",left:"30%",width:"40vw",height:"40vh",
          background:"radial-gradient(ellipse,rgba(244,114,182,0.05) 0%,transparent 70%)",
          animation:"aurora-3 14s ease-in-out infinite"}}/>
        {PARTICLES.map((p,i)=>(
          <div key={i} className="absolute rounded-full"
            style={{width:p.w,height:p.h,left:p.left,top:p.top,background:p.color,
              opacity:theme.particleOpacity*p.mult,
              animation:`float ${p.dur}s ease-in-out infinite`,animationDelay:`${p.delay}s`}}/>
        ))}
      </div>

      <div className="relative z-10 w-full max-w-7xl mx-auto">
        <div className="max-w-2xl">
          {/* Badge */}
          <div style={{animation:"slide-up 0.6s ease 0.1s both"}}>
            <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg border text-xs font-semibold mb-6"
              style={{borderColor:CYAN,color:CYAN,background:"rgba(34,211,238,0.08)"}}>
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"/>
              {t.badge}
            </span>
          </div>

          {/* Name */}
          <div style={{animation:"slide-up 0.6s ease 0.2s both"}}>
            <p className="text-lg md:text-xl font-medium mb-2" style={{color:theme.textMuted}}>{t.hi}</p>
            <h1 className="text-5xl md:text-7xl font-black leading-tight tracking-tight mb-4">
              <GradText>Javlon</GradText>
              <br/>
              <span style={{color:theme.textPrimary}}>Ilyasov</span>
            </h1>
          </div>

          {/* Typewriter */}
          <div style={{animation:"slide-up 0.6s ease 0.3s both",marginBottom:20}}>
            <div className="flex items-center gap-2 h-8">
              <span style={{color:theme.textMuted,fontSize:18,fontFamily:"var(--font-mono)"}}>
                {typed}<span style={{color:CYAN,animation:"blink 1s step-end infinite"}}>_</span>
              </span>
            </div>
          </div>

          {/* Bio */}
          <p style={{animation:"slide-up 0.6s ease 0.4s both",color:theme.textMuted,fontSize:16,
            lineHeight:1.75,maxWidth:520,marginBottom:28}}>
            {t.bio}
          </p>

          {/* CTAs */}
          <div style={{animation:"slide-up 0.6s ease 0.5s both",display:"flex",flexWrap:"wrap",gap:12,marginBottom:32}}>
            <Btn variant="solid" size="lg" onClick={()=>document.getElementById("projects")?.scrollIntoView({behavior:"smooth"})}>
              <FolderOpen size={16}/>{t.cta1}
            </Btn>
          </div>

          {/* Stats */}
          <div style={{animation:"slide-up 0.6s ease 0.6s both",display:"flex",flexWrap:"wrap",gap:12}}>
            {[t.stat1,t.stat2,t.stat3].map(s=>(
              <div key={s} className="px-4 py-2 rounded-xl text-sm font-semibold"
                style={{background:theme.glassBg,backdropFilter:"blur(8px)",color:theme.textPrimary,
                  border:`1px solid ${theme.borderAccent}`}}>
                {s}
              </div>
            ))}
          </div>

          {/* Social links */}
          <div style={{animation:"slide-up 0.6s ease 0.7s both",display:"flex",gap:12,marginTop:28}}>
            {[
              {href:LINKS.github,icon:<GithubSVG size={18}/>,label:"GitHub"},
              {href:LINKS.telegram,icon:<TgIcon size={18}/>,label:"Telegram"},
              {href:LINKS.email,icon:<Mail size={18}/>,label:"Email"},
            ].map(s=>(
              <a key={s.label} href={s.href} target="_blank" rel="noopener noreferrer" title={s.label}
                className="flex items-center justify-center w-10 h-10 rounded-xl transition-all duration-200"
                style={{background:theme.glassBg,backdropFilter:"blur(8px)",color:theme.textMuted,
                  border:`1px solid ${theme.borderAccent}`}}
                onMouseEnter={e=>{(e.currentTarget as HTMLElement).style.color=CYAN;
                  (e.currentTarget as HTMLElement).style.borderColor=theme.borderHover;}}
                onMouseLeave={e=>{(e.currentTarget as HTMLElement).style.color=theme.textMuted;
                  (e.currentTarget as HTMLElement).style.borderColor=theme.borderAccent;}}>
                {s.icon}
              </a>
            ))}
          </div>
        </div>

        {/* Profile card — desktop only */}
        <div className="hidden md:flex absolute right-0 top-1/2 -translate-y-1/2 items-center justify-center" style={{right:"5%"}}>
          <ProfileCard theme={theme}/>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
        style={{animation:"fade-in 1s ease 1.2s both"}}>
        <span style={{fontSize:11,color:theme.textSubtle,letterSpacing:"0.12em",textTransform:"uppercase",fontFamily:"var(--font-mono)"}}>
          scroll
        </span>
        <div style={{width:1,height:40,background:`linear-gradient(${CYAN},transparent)`,animation:"float 2s ease-in-out infinite"}}/>
      </div>
    </section>
  );
}

function ProfileCard({theme}:{theme:Theme}) {
  const cardRef=useRef<HTMLDivElement>(null);
  const [tilt,setTilt]=useState({x:0,y:0});
  const handleMove=(e:React.MouseEvent)=>{
    if(!cardRef.current)return;
    const r=cardRef.current.getBoundingClientRect();
    const cx=r.left+r.width/2, cy=r.top+r.height/2;
    setTilt({x:(e.clientY-cy)/r.height*14, y:-(e.clientX-cx)/r.width*14});
  };
  return (
    <div ref={cardRef} onMouseMove={handleMove} onMouseLeave={()=>setTilt({x:0,y:0})}
      style={{transform:`perspective(800px) rotateX(${tilt.x}deg) rotateY(${tilt.y}deg)`,
        transition:"transform 0.1s ease",width:260}}>
      <GlassCard className="p-7 flex flex-col items-center text-center" hover={false} theme={theme}
        style={{boxShadow:`0 24px 80px rgba(34,211,238,0.1), 0 0 0 1px ${theme.borderAccent}`}}>
        <div style={{position:"absolute",top:8,right:8,display:"flex",alignItems:"center",gap:4,
          padding:"4px 8px",borderRadius:8,background:"rgba(34,211,238,0.12)",
          border:"1px solid rgba(34,211,238,0.25)",fontSize:10,color:CYAN,fontFamily:"var(--font-mono)"}}>
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"/>ONLINE
        </div>

        {/* Avatar */}
        <div style={{position:"relative",marginBottom:16}}>
          <img src={avatar} alt="profile avatar" draggable={false}
            style={{width:84,height:84,borderRadius:"50%",objectFit:"cover",display:"block",
              boxShadow:"0 0 0 3px rgba(34,211,238,0.32), 0 0 32px rgba(34,211,238,0.2)",
              animation:"pulse-glow 3s ease-in-out infinite",border:`2px solid ${CYAN}`}}/>
          <div style={{position:"absolute",bottom:2,right:2,width:16,height:16,borderRadius:"50%",
            background:"#34d399",border:"2px solid #080810"}}/>
        </div>

        <p style={{fontWeight:700,fontSize:16,color:theme.textPrimary,marginBottom:4}}>Javlon Ilyasov</p>
        <p style={{fontSize:12,color:CYAN,marginBottom:16,fontFamily:"var(--font-mono)"}}>Junior Developer</p>

        <div style={{display:"flex",gap:8,flexWrap:"wrap",justifyContent:"center",marginBottom:12}}>
          {["React","Python","JS"].map(tag=>(
            <span key={tag} style={{padding:"2px 8px",borderRadius:20,fontSize:10,fontWeight:600,
              background:"rgba(34,211,238,0.08)",color:CYAN,border:"1px solid rgba(34,211,238,0.2)"}}>{tag}</span>
          ))}
        </div>

        <div style={{fontSize:11,color:CYAN,fontFamily:"var(--font-mono)",marginTop:6}}>
  @ilyasov09
</div>

        {[["top-3 left-3 border-t-2 border-l-2"],["top-3 right-3 border-t-2 border-r-2"],
          ["bottom-3 left-3 border-b-2 border-l-2"],["bottom-3 right-3 border-b-2 border-r-2"]].map((cls,i)=>(
          <div key={i} className={`absolute w-4 h-4 ${cls[0]}`} style={{borderColor:`${CYAN}60`}}/>
        ))}
      </GlassCard>
    </div>
  );
}

/* ══════════════════════════════════════════════════════════════════
   ABOUT
══════════════════════════════════════════════════════════════════ */
function About({t,theme}:{t:Tr;theme:Theme}) {
  return (
    <section id="about" className="py-24 px-6 md:px-12 lg:px-20" style={{background:`${theme.bgSurface}66`}}>
      <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-16 items-start">
        <Reveal>
          <p className="text-xs font-semibold uppercase tracking-widest mb-4" style={{color:theme.textMuted}}>{t.aboutLabel}</p>
          <h2 className="text-3xl md:text-4xl font-bold mb-3" style={{color:theme.textPrimary}}>{t.aboutTitle}</h2>
          <div style={{width:40,height:3,borderRadius:4,background:GRAD,marginBottom:24}}/>
          <p style={{color:theme.textMuted,lineHeight:1.8,marginBottom:16,fontSize:15}}>{t.p1}</p>
          <p style={{color:theme.textMuted,lineHeight:1.8,marginBottom:24,fontSize:15}}>{t.p2}</p>
          <GlassCard className="p-5" hover={false} theme={theme}>
            <p className="text-sm font-semibold mb-2 flex items-center gap-2" style={{color:theme.textPrimary}}>
              <WaveEmoji emoji="🤔" size={18}/>{t.dekuQ}
            </p>
            <p className="text-sm" style={{color:theme.textMuted,lineHeight:1.7}}>{t.dekuA}</p>
          </GlassCard>
        </Reveal>

        <Reveal delay={150}>
          <div className="grid grid-cols-2 gap-4">
            {[
              {icon:"🚀",title:"5+ Projects",desc:"Deployed & live"},
              {icon:"⚡",title:"Self-Taught",desc:"YouTube → Production"},
              {icon:"🔐",title:"Cybersecurity",desc:"Future specialization"},
              {icon:"🌍",title:"2027 Goal",desc:"Foreign university"},
            ].map(c=>(
              <GlassCard key={c.title} className="p-5" theme={theme}>
                <div style={{fontSize:24,marginBottom:10}}><WaveEmoji emoji={c.icon} size={28}/></div>
                <p style={{fontWeight:700,color:theme.textPrimary,marginBottom:4,fontSize:14}}>{c.title}</p>
                <p style={{color:theme.textMuted,fontSize:12}}>{c.desc}</p>
              </GlassCard>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/* ══════════════════════════════════════════════════════════════════
   SKILLS — with real devicon SVG icons
══════════════════════════════════════════════════════════════════ */
function SkillIcon({name,size=32}:{name:string;size?:number}) {
  const url=SKILL_ICON_URLS[name];
  const [errored,setErrored]=useState(false);
  if(!url||errored) return null;
  return (
    <img
      src={url}
      alt={name}
      width={size}
      height={size}
      onError={()=>setErrored(true)}
      style={{display:"block",objectFit:"contain",filter:"drop-shadow(0 2px 4px rgba(0,0,0,0.3))"}}
      draggable={false}
    />
  );
}

function Skills({t,theme}:{t:Tr;theme:Theme}) {
  const {ref,vis}=useScrollReveal();
  const [hov,setHov]=useState<string|null>(null);
  return (
    <section id="skills" className="py-24 px-6 md:px-12 lg:px-20">
      <div className="max-w-5xl mx-auto">
        <Reveal className="text-center mb-14">
          <h2 className="text-3xl md:text-4xl font-bold mb-3"><GradText>{t.skillsTitle}</GradText></h2>
          <p style={{color:theme.textMuted,fontSize:14}}>{t.skillsSub}</p>
        </Reveal>

        <div ref={ref} className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 mb-12">
          {SKILLS.map((sk,i)=>{
            const circ=2*Math.PI*34;
            const offset=circ-(vis?sk.pct/100:0)*circ;
            const isHov=hov===sk.name;
            return (
              <Reveal key={sk.name} delay={i*70}>
                <div onMouseEnter={()=>setHov(sk.name)} onMouseLeave={()=>setHov(null)}
                  className="flex flex-col items-center p-5 rounded-2xl cursor-default transition-all duration-300"
                  style={{
                    background:isHov?`${sk.color}12`:theme.glassBg,backdropFilter:"blur(12px)",
                    border:`1px solid ${isHov?sk.color+"55":theme.borderAccent}`,
                    transform:isHov?"translateY(-8px) scale(1.04)":"translateY(0) scale(1)",
                    boxShadow:isHov?`0 20px 50px ${sk.color}20`:"none",
                  }}>
                  {/* Circular progress */}
                  <div className="relative mb-3" style={{width:76,height:76}}>
                    <svg className="w-full h-full" style={{transform:"rotate(-90deg)"}} viewBox="0 0 76 76">
                      <circle cx={38} cy={38} r={34} fill="none" stroke={theme.borderAccent} strokeWidth={4}/>
                      <circle cx={38} cy={38} r={34} fill="none" stroke={sk.color} strokeWidth={4}
                        strokeLinecap="round" strokeDasharray={circ} strokeDashoffset={offset}
                        style={{transition:`stroke-dashoffset 1.4s cubic-bezier(.4,0,.2,1) ${i*80}ms`}}/>
                    </svg>
                    {/* Real devicon in center */}
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div style={{
                        width:32,height:32,display:"flex",alignItems:"center",justifyContent:"center",
                        filter:isHov?`drop-shadow(0 0 8px ${sk.color})`:"none",transition:"filter 0.3s",
                      }}>
                        <SkillIcon name={sk.name} size={28}/>
                      </div>
                    </div>
                  </div>
                  <p style={{fontSize:13,fontWeight:700,color:theme.textPrimary,marginBottom:4}}>{sk.name}</p>
                  <span style={{fontSize:11,fontWeight:600,padding:"2px 8px",borderRadius:20,
                    background:`${sk.color}18`,color:sk.color,border:`1px solid ${sk.color}35`,
                    fontFamily:"var(--font-mono)"}}>{sk.pct}%</span>
                </div>
              </Reveal>
            );
          })}
        </div>

        <Reveal className="text-center">
          <p style={{fontSize:11,textTransform:"uppercase",letterSpacing:"0.1em",color:theme.textMuted,marginBottom:16}}>{t.toolsLabel}</p>
          <div className="flex flex-wrap justify-center gap-3">
            {TOOLS.map(tool=>(
              <span key={tool} className="px-4 py-2 rounded-xl text-xs font-semibold transition-all duration-200 hover:scale-105"
                style={{background:theme.bgCard,color:theme.textMuted,border:`1px solid ${theme.borderAccent}`}}>
                {tool}
              </span>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/* ══════════════════════════════════════════════════════════════════
   PROJECTS
══════════════════════════════════════════════════════════════════ */
function Projects({t,theme}:{t:Tr;theme:Theme}) {
  return (
    <section id="projects" className="py-24 px-6 md:px-12 lg:px-20" style={{background:`${theme.bgSurface}66`}}>
      <div className="max-w-7xl mx-auto">
        <Reveal className="flex items-center justify-between mb-12">
          <div>
            <h2 className="text-3xl md:text-4xl font-bold"><GradText>{t.projTitle}</GradText></h2>
          </div>
          <a href={LINKS.github} target="_blank" rel="noopener noreferrer"
            className="flex items-center gap-1 text-sm font-medium transition-opacity hover:opacity-70"
            style={{color:CYAN}}>
            {t.projAll}<ChevronRight size={14}/>
          </a>
        </Reveal>

        <div className="grid md:grid-cols-3 gap-6">
          {t.projects.map((proj,idx)=>(
            <Reveal key={proj.name} delay={idx*100}>
              <ProjectCard proj={proj} idx={idx} theme={theme}/>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function ProjectCard({proj,idx,theme}:{
  proj:{name:string;desc:string;tech:readonly string[];live:string};idx:number;theme:Theme;
}) {
  const [h,setH]=useState(false);
  return (
    <a href={proj.live} target="_blank" rel="noopener noreferrer"
      className="block rounded-2xl overflow-hidden transition-all duration-300"
      style={{
        background:theme.glassBg,backdropFilter:"blur(12px)",
        border:`1px solid ${h?theme.borderHover:theme.borderAccent}`,
        transform:h?"translateY(-8px)":"translateY(0)",
        boxShadow:h?"0 24px 60px rgba(34,211,238,0.15)":"0 2px 8px rgba(0,0,0,0.1)",
        textDecoration:"none",display:"flex",flexDirection:"column",height:"100%",
      }}
      onMouseEnter={()=>setH(true)} onMouseLeave={()=>setH(false)}>
      <div className="relative overflow-hidden flex items-center justify-center" style={{height:160,background:GRAD_CARDS[idx]}}>
        <span style={{fontSize:60,fontWeight:900,color:"rgba(255,255,255,0.15)",
          transform:h?"scale(1.12)":"scale(1)",transition:"transform 0.3s"}}>
          {proj.name[0]}
        </span>
        <div className="absolute inset-0 flex items-center justify-center"
          style={{background:"rgba(0,0,0,0.4)",opacity:h?1:0,transition:"opacity 0.3s"}}>
          <div className="flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold text-white"
            style={{background:GRAD,transform:h?"translateY(0)":"translateY(4px)",transition:"transform 0.3s"}}>
            <ExternalLink size={14}/> Open
          </div>
        </div>
        <ArrowUpRight size={16} color="white" className="absolute top-3 right-3"
          style={{opacity:h?1:0.5,transform:h?"translate(0,0)":"translate(3px,-3px)",transition:"all 0.3s"}}/>
      </div>

      <div style={{padding:"16px 18px",display:"flex",flexDirection:"column",gap:10,flex:1}}>
        <div style={{display:"flex",flexWrap:"wrap",gap:6}}>
          {proj.tech.map(tc=>(
            <span key={tc} style={{padding:"2px 8px",borderRadius:4,fontSize:10,fontWeight:600,
              border:`1px solid rgba(34,211,238,0.35)`,color:CYAN,fontFamily:"var(--font-mono)"}}>
              {tc}
            </span>
          ))}
        </div>
        <h3 style={{fontSize:16,fontWeight:700,color:h?CYAN:theme.textPrimary,transition:"color 0.2s"}}>{proj.name}</h3>
        <p style={{fontSize:13,color:theme.textMuted,lineHeight:1.65,flex:1}}>{proj.desc}</p>
        <div style={{display:"flex",alignItems:"center",gap:6,fontSize:11,color:h?CYAN:theme.textSubtle,transition:"color 0.2s"}}>
          <ExternalLink size={11}/>
          <span style={{fontFamily:"var(--font-mono)"}}>{proj.live.replace("https://","")}</span>
        </div>
      </div>
    </a>
  );
}

/* ══════════════════════════════════════════════════════════════════
   INTERESTS + SPOTIFY (2 playlists)
══════════════════════════════════════════════════════════════════ */
function Interests({t,theme,lang}:{t:Tr;theme:Theme;lang:Lang}) {
  const [activePlaylist,setActivePlaylist]=useState(0);

  return (
    <section id="interests" className="py-24 px-6 md:px-12 lg:px-20">
      <div className="max-w-7xl mx-auto">
        <Reveal className="mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-3"><GradText>{t.interestsTitle}</GradText></h2>
        </Reveal>

        <div className="grid md:grid-cols-2 gap-12 items-start">
          {/* Left — interest cards */}
          <Reveal>
            <div className="grid grid-cols-3 gap-4">
              {t.interests.map((item)=>(
                <GlassCard key={item.label} className="p-4 flex flex-col items-center gap-2 text-center" theme={theme}>
                  <WaveEmoji emoji={item.emoji} size={36}/>
                  <span className="text-xs font-medium" style={{color:theme.textMuted}}>{item.label}</span>
                </GlassCard>
              ))}
            </div>
          </Reveal>

          {/* Right — Spotify dual playlist */}
          <Reveal delay={150}>
            <div className="flex items-center gap-3 mb-3">
              <h2 className="text-2xl font-bold"><GradText>{t.musicTitle}</GradText></h2>
              <WaveEmoji emoji="🎵" size={24}/>
            </div>

            <p className="text-xs mb-4 flex items-center gap-2" style={{color:theme.textMuted}}>
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse inline-block"/>
              {t.musicSub}
            </p>

            {/* Playlist switcher tabs */}
            <div className="flex gap-2 mb-4">
              {SPOTIFY_PLAYLISTS.map((pl,i)=>(
                <button
                  key={pl.id}
                  onClick={()=>setActivePlaylist(i)}
                  className="px-4 py-2 rounded-xl text-xs font-semibold transition-all duration-200 cursor-pointer"
                  style={{
                    background:activePlaylist===i?GRAD:"transparent",
                    color:activePlaylist===i?"#fff":theme.textMuted,
                    border:`1px solid ${activePlaylist===i?CYAN:theme.borderAccent}`,
                    boxShadow:activePlaylist===i?"0 4px 16px rgba(34,211,238,0.2)":"none",
                  }}
                >
                  <SpotifyIcon/>&nbsp;
                  {lang==="uz"?pl.label_uz:pl.label_en}
                </button>
              ))}
            </div>

            {/* Embedded Spotify player */}
            <GlassCard className="overflow-hidden" hover={false} theme={theme}
              style={{boxShadow:`0 8px 32px rgba(34,211,238,0.08)`}}>
              <iframe
                key={SPOTIFY_PLAYLISTS[activePlaylist].id}
                style={{borderRadius:12,display:"block"}}
                src={`https://open.spotify.com/embed/playlist/${SPOTIFY_PLAYLISTS[activePlaylist].id}?utm_source=generator&theme=0`}
                width="100%"
                height="352"
                frameBorder="0"
                allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
                loading="lazy"
                title="Spotify Playlist"
              />
            </GlassCard>

            <div className="flex items-center justify-end mt-3 px-1">
              <a href={`https://open.spotify.com/playlist/${SPOTIFY_PLAYLISTS[activePlaylist].id}`}
                target="_blank" rel="noopener noreferrer"
                className="flex items-center gap-2 text-xs font-medium transition-opacity hover:opacity-80"
                style={{color:"#1DB954"}}>
                <SpotifyIcon/>{t.musicLink}
              </a>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

/* ══════════════════════════════════════════════════════════════════
   TIMELINE
══════════════════════════════════════════════════════════════════ */
function Timeline({t,theme}:{t:Tr;theme:Theme}) {
  const {ref,vis}=useScrollReveal(0.1);
  return (
    <section id="timeline" className="py-24 px-6 md:px-12 lg:px-20" style={{background:`${theme.bgSurface}66`}}>
      <div className="max-w-3xl mx-auto">
        <Reveal className="text-center mb-14">
          <h2 className="text-3xl md:text-4xl font-bold mb-3"><GradText>{t.timelineTitle}</GradText></h2>
          <p style={{color:theme.textMuted,fontSize:14}}>{t.timelineSub}</p>
        </Reveal>

        <div ref={ref} className="relative">
          <div style={{position:"absolute",left:20,top:0,width:2,background:`linear-gradient(${CYAN},${VIOLET})`,
            height:vis?"100%":"0",transition:"height 2s ease",borderRadius:4,opacity:0.6}}/>

          {t.items.map((item,i)=>(
            <Reveal key={i} delay={i*90}>
              <div className="flex gap-5 mb-8 last:mb-0 relative">
                <div style={{position:"relative",flex:"0 0 42px",display:"flex",justifyContent:"center",paddingTop:4}}>
                  <div style={{width:14,height:14,borderRadius:"50%",background:GRAD,
                    border:`3px solid ${theme.bgPrimary}`,boxShadow:`0 0 12px rgba(34,211,238,0.4)`,
                    transition:`all 0.5s ease ${i*80}ms`,
                    transform:vis?"scale(1)":"scale(0)"}}/>
                </div>
                <GlassCard className="flex-1 p-4" theme={theme}>
                  <div style={{display:"flex",alignItems:"center",gap:8,marginBottom:6}}>
                    <WaveEmoji emoji={item.icon} size={18}/>
                    <span style={{fontSize:11,fontWeight:700,color:CYAN,fontFamily:"var(--font-mono)",
                      padding:"2px 6px",borderRadius:4,background:"rgba(34,211,238,0.1)"}}>{item.year}</span>
                  </div>
                  <p style={{fontWeight:700,color:theme.textPrimary,fontSize:14,marginBottom:2}}>{item.title}</p>
                  <p style={{color:theme.textMuted,fontSize:12}}>{item.desc}</p>
                </GlassCard>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ══════════════════════════════════════════════════════════════════
   CONTACT
══════════════════════════════════════════════════════════════════ */
const SOCIALS=[
  {icon:<GithubSVG size={22}/>,href:LINKS.github,label:"GitHub",color:"#fff",glow:"rgba(255,255,255,0.15)"},
  {icon:<TgIcon size={22}/>,href:LINKS.telegram,label:"Telegram",color:"#2AABEE",glow:"rgba(42,171,238,0.2)"},
  {icon:<TgIcon size={22}/>,href:LINKS.channel,label:"@cyberdevuz",color:"#2AABEE",glow:"rgba(42,171,238,0.2)"},
  {icon:<IgIcon size={22}/>,href:LINKS.instagram,label:"Instagram",color:"#e1306c",glow:"rgba(225,48,108,0.2)"},
  {icon:<Mail size={22}/>,href:LINKS.email,label:"Email",color:CYAN,glow:"rgba(34,211,238,0.2)"},
];

function Contact({t,theme}:{t:Tr;theme:Theme}) {
  return (
    <section id="contact" className="py-24 px-6 md:px-12 lg:px-20">
      <div className="max-w-2xl mx-auto text-center">
        <Reveal>
          <h2 className="text-3xl md:text-4xl font-bold mb-3"><GradText>{t.contactTitle}</GradText></h2>
          <p style={{color:theme.textMuted,marginBottom:40,fontSize:14,lineHeight:1.7}}>{t.contactSub}</p>

          <div style={{display:"flex",flexWrap:"wrap",justifyContent:"center",gap:16,marginBottom:40}}>
            {SOCIALS.map(s=><SocialBtn key={s.label} s={s} theme={theme}/>)}
          </div>

          <div style={{display:"flex",flexWrap:"wrap",justifyContent:"center",gap:12}}>
            <Btn variant="solid" size="lg" href={LINKS.telegram}>
              <TgIcon size={16}/>Let's Work Together
            </Btn>
            <Btn variant="outline" size="lg" href={LINKS.email}>
              <Mail size={16}/>Send Email
            </Btn>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

function SocialBtn({s,theme}:{s:typeof SOCIALS[0];theme:Theme}) {
  const [h,setH]=useState(false);
  return (
    <div className="flex flex-col items-center gap-2">
      <a href={s.href} target="_blank" rel="noopener noreferrer" title={s.label}
        onMouseEnter={()=>setH(true)} onMouseLeave={()=>setH(false)}
        style={{
          display:"flex",alignItems:"center",justifyContent:"center",
          width:56,height:56,minHeight:44,minWidth:44,borderRadius:16,
          background:h?`${s.color}20`:`${s.color}0a`,
          border:`1.5px solid ${h?s.color+"80":s.color+"25"}`,
          color:s.color,textDecoration:"none",
          transition:"all 0.2s cubic-bezier(.4,0,.2,1)",
          transform:h?"scale(1.1) translateY(-4px)":"scale(1)",
          boxShadow:h?`0 8px 32px ${s.glow}`:"none",
          backdropFilter:"blur(8px)",
        }}>
        {s.icon}
      </a>
      <span style={{fontSize:10,fontWeight:600,color:h?s.color:theme.textMuted,transition:"color 0.2s",letterSpacing:"0.04em"}}>
        {s.label}
      </span>
    </div>
  );
}

/* ══════════════════════════════════════════════════════════════════
   FOOTER
══════════════════════════════════════════════════════════════════ */
function Footer({t,theme}:{t:Tr;theme:Theme}) {
  return (
    <footer className="py-10 px-6 text-center" style={{background:theme.bgPrimary,borderTop:`1px solid ${theme.borderAccent}`}}>
      <div style={{width:40,height:40,borderRadius:12,background:GRAD,display:"flex",alignItems:"center",
        justifyContent:"center",fontSize:14,fontWeight:900,color:"#fff",margin:"0 auto 12px",letterSpacing:"-0.5px"}}>
        JI
      </div>
      <p style={{fontWeight:700,fontSize:14,color:theme.textPrimary,marginBottom:4}}>Javlon Ilyasov</p>
      <p style={{fontSize:12,color:theme.textMuted,marginBottom:20}}>{t.footerSub}</p>
      <div style={{display:"flex",justifyContent:"center",gap:16,marginBottom:20}}>
        {[
          {href:LINKS.github,icon:<GithubSVG size={16}/>},
          {href:LINKS.telegram,icon:<TgIcon size={16}/>},
          {href:LINKS.email,icon:<Mail size={16}/>},
        ].map((l,i)=>(
          <a key={i} href={l.href} target="_blank" rel="noopener noreferrer"
            style={{color:theme.textMuted,transition:"color 0.2s"}}
            onMouseEnter={e=>(e.currentTarget as HTMLElement).style.color=CYAN}
            onMouseLeave={e=>(e.currentTarget as HTMLElement).style.color=theme.textMuted}>
            {l.icon}
          </a>
        ))}
      </div>
      <p style={{fontSize:11,color:theme.textSubtle}}>{t.footerCopy}</p>
    </footer>
  );
}

/* ══════════════════════════════════════════════════════════════════
   FAB (mobile)
══════════════════════════════════════════════════════════════════ */
function FAB({theme}:{theme:Theme}) {
  const [open,setOpen]=useState(false);
  return (
    <div className="md:hidden fixed z-40" style={{bottom:"calc(80px + env(safe-area-inset-bottom))",right:16}}>
      {open&&(
        <div style={{position:"absolute",bottom:56,right:0,display:"flex",flexDirection:"column",gap:8,alignItems:"flex-end",marginBottom:4}}>
          {[
            {label:"Contact",icon:<Mail size={14}/>,href:LINKS.email},
          ].map(a=>(
            <a key={a.label} href={a.href} target="_blank" rel="noopener noreferrer"
              style={{display:"flex",alignItems:"center",gap:8,padding:"8px 14px",borderRadius:12,fontSize:12,fontWeight:600,
                background:GRAD,color:"#fff",whiteSpace:"nowrap",boxShadow:"0 4px 20px rgba(34,211,238,0.3)",
                textDecoration:"none"}}>
              {a.icon}{a.label}
            </a>
          ))}
        </div>
      )}
      <button onClick={()=>setOpen(o=>!o)} aria-label="Quick actions"
        style={{width:48,height:48,borderRadius:"50%",background:GRAD,display:"flex",alignItems:"center",justifyContent:"center",
          boxShadow:"0 4px 24px rgba(34,211,238,0.35)",border:"none",cursor:"pointer",
          transition:"transform 0.2s",transform:open?"rotate(45deg)":"rotate(0)"}}>
        <span style={{color:"#fff",fontSize:20,fontWeight:300,lineHeight:1}}>+</span>
      </button>
    </div>
  );
}

/* ══════════════════════════════════════════════════════════════════
   SVG ICON COMPONENTS
══════════════════════════════════════════════════════════════════ */
function SpotifyIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" style={{display:"inline-block",verticalAlign:"middle"}}>
      <path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.779-.179-.899-.539-.12-.421.18-.78.54-.9 4.56-1.021 8.52-.6 11.64 1.32.42.18.479.659.301 1.02zm1.44-3.3c-.301.42-.841.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141C9.6 9.9 15 10.561 18.72 12.84c.361.181.54.78.241 1.2zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.179-1.2-.181-1.38-.721-.18-.601.18-1.2.72-1.381 4.26-1.26 11.28-1.02 15.721 1.621.539.3.719 1.02.419 1.56-.299.421-1.02.599-1.559.3z"/>
    </svg>
  );
}

function TgIcon({size=22}:{size?:number}) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
      <path d="M11.944 0A12 12 0 000 12a12 12 0 0012 12 12 12 0 0012-12A12 12 0 0012 0a12 12 0 00-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 01.171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z"/>
    </svg>
  );
}

function IgIcon({size=22}:{size?:number}) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
    </svg>
  );
}

function GithubSVG({size=22}:{size?:number}) {
  return (
    <Github size={size}/>
  );
}

/* ══════════════════════════════════════════════════════════════════
   MAIN APP
══════════════════════════════════════════════════════════════════ */
export default function App() {
  const [loading,setLoading]=useState(true);
  const [lang,setLang]=useState<Lang>("uz");
  const [isDark,setIsDark]=useState(true);

  const theme=isDark?DARK:LIGHT;
  const t=T[lang];
  const ids=useMemo(()=>t.ids as readonly string[],[t.ids]);
  const activeSection=useActiveSection(ids);
  const onDone=useCallback(()=>setLoading(false),[]);

  /* Global styles + theme burst keyframes */
  useEffect(()=>{
    const st=document.createElement("style");
    st.id="app-global";
    st.textContent=`
      *{font-family:var(--font-sans);box-sizing:border-box;}
      @keyframes rotate-ring{from{transform:rotate(0deg)}to{transform:rotate(360deg)}}
      @keyframes float{0%,100%{transform:translateY(0)}50%{transform:translateY(-14px)}}
      @keyframes blink{0%,100%{opacity:1}50%{opacity:0}}
      @keyframes aurora-1{0%,100%{transform:translate(0,0) scale(1);opacity:0.4}33%{transform:translate(30px,-20px) scale(1.1);opacity:0.6}66%{transform:translate(-20px,15px) scale(0.9);opacity:0.3}}
      @keyframes aurora-2{0%,100%{transform:translate(0,0) scale(1);opacity:0.3}50%{transform:translate(-40px,30px) scale(1.15);opacity:0.5}}
      @keyframes aurora-3{0%,100%{transform:translate(0,0) scale(1);opacity:0.2}40%{transform:translate(25px,-35px) scale(1.2);opacity:0.45}}
      @keyframes slide-up{from{opacity:0;transform:translateY(24px)}to{opacity:1;transform:translateY(0)}}
      @keyframes fade-in{from{opacity:0}to{opacity:1}}
      @keyframes pulse-glow{0%,100%{box-shadow:0 0 20px rgba(34,211,238,0.2)}50%{box-shadow:0 0 40px rgba(34,211,238,0.5)}}
      @keyframes theme-burst{from{transform:scale(0);opacity:1}to{transform:scale(1);opacity:0}}
      @keyframes burst-ring-0{0%{transform:scale(0);opacity:0.8}100%{transform:scale(1.5);opacity:0}}
      @keyframes burst-ring-1{0%{transform:scale(0);opacity:0.5}100%{transform:scale(1.2);opacity:0}}
      @keyframes burst-ring-2{0%{transform:scale(0);opacity:0.3}100%{transform:scale(1);opacity:0}}
      @keyframes theme-btn-pulse{0%,100%{opacity:0}50%{opacity:1}}
      .gradient-text{background:linear-gradient(135deg,#22d3ee,#a78bfa);background-clip:text;-webkit-background-clip:text;-webkit-text-fill-color:transparent;color:transparent;}
    `;
    document.head.appendChild(st);
    return ()=>st.remove();
  },[]);

  /* Theme class on body */
  useEffect(()=>{
    document.body.classList.toggle("light-theme",!isDark);
  },[isDark]);

  return (
    <div style={{background:theme.bgPrimary,minHeight:"100vh",transition:"background 0.4s,color 0.4s",color:theme.textPrimary}}>
      <CustomCursor/>
      {loading&&<LoadingScreen onDone={onDone}/>}

      <div style={{opacity:loading?0:1,transition:"opacity 0.5s"}}>
        <Navbar lang={lang} setLang={setLang} isDark={isDark} setIsDark={setIsDark}
          t={t} theme={theme} activeSection={activeSection}/>

        <Hero t={t} theme={theme}/>
        <About t={t} theme={theme}/>
        <Skills t={t} theme={theme}/>
        <Projects t={t} theme={theme}/>
        <Interests t={t} theme={theme} lang={lang}/>
        <Timeline t={t} theme={theme}/>
        <Contact t={t} theme={theme}/>
        <Footer t={t} theme={theme}/>

        <BottomNav theme={theme} activeSection={activeSection}/>
        <FAB theme={theme}/>
      </div>
    </div>
  );
}
