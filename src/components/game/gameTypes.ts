export type Screen = "menu" | "shop" | "game";
export type ShopTab = "skins" | "upgrades" | "content";

export interface Meteor {
  id: number;
  x: number;
  y: number;
  size: number;
  speed: number;
  color: string;
  shadowColor: string;
  hp: number;
  maxHp: number;
  exploding: boolean;
  rotAngle: number;
  rotSpeed: number;
}

export interface Bullet {
  id: number;
  x: number;
  y: number;
}

export interface FloatText {
  id: number;
  x: number;
  y: number;
  text: string;
  big?: boolean;
}

export interface Particle {
  id: number;
  x: number;
  y: number;
  dx: number;
  dy: number;
  color: string;
}

export const HERO_IMG = "https://cdn.poehali.dev/projects/23becf85-d033-44ce-b0ad-13db59a1c9ab/files/80a8ec5f-07ed-4e25-b085-659628426e00.jpg";

export const skins = [
  { id: 1, name: "Пиратский кот", price: 120, coins: "🪙", rarity: "rare", emoji: "🏴‍☠️" },
  { id: 2, name: "Космонавт", price: 200, coins: "💎", rarity: "epic", emoji: "🚀" },
  { id: 3, name: "Ниндзя", price: 80, coins: "🪙", rarity: "common", emoji: "🥷" },
  { id: 4, name: "Волшебник", price: 350, coins: "💎", rarity: "legendary", emoji: "🧙" },
];

export const upgrades = [
  { id: 5, name: "Скорость x2", price: 50, coins: "🪙", level: 3, maxLevel: 5, emoji: "⚡", desc: "Двигайся быстрее" },
  { id: 6, name: "Броня", price: 75, coins: "🪙", level: 1, maxLevel: 5, emoji: "🛡️", desc: "Больше защиты" },
  { id: 7, name: "Суперудар", price: 120, coins: "💎", level: 0, maxLevel: 3, emoji: "💥", desc: "Мощный удар" },
  { id: 8, name: "Удача", price: 60, coins: "🪙", level: 2, maxLevel: 5, emoji: "🍀", desc: "Больше монет" },
];

export const content = [
  { id: 9, name: "Мир льда", price: 500, coins: "💎", emoji: "❄️", desc: "Новая локация" },
  { id: 10, name: "Пак монет x500", price: 99, coins: "💰", emoji: "💰", desc: "Пополнение кошелька" },
  { id: 11, name: "Тайная карта", price: 150, coins: "💎", emoji: "🗺️", desc: "Секретный уровень" },
  { id: 12, name: "Пак монет x200", price: 49, coins: "💰", emoji: "🪙", desc: "Пополнение кошелька" },
];

export const rarityGrad: Record<string, string> = {
  common: "linear-gradient(135deg,#9ca3af,#6b7280)",
  rare: "linear-gradient(135deg,#60a5fa,#2563eb)",
  epic: "linear-gradient(135deg,#a855f7,#7e22ce)",
  legendary: "linear-gradient(135deg,#facc15,#f97316)",
};

export const rarityLabel: Record<string, string> = {
  common: "Обычный", rare: "Редкий", epic: "Эпический", legendary: "Легендарный",
};

export const METEOR_THEMES = [
  { base: "#8B4513", light: "#D2691E", dark: "#4A1A00", shadow: "rgba(139,69,19,.8)", glow: "rgba(255,100,0,.6)" },
  { base: "#2E5BBA", light: "#5B8FFF", dark: "#0D2E6E", shadow: "rgba(46,91,186,.8)", glow: "rgba(91,143,255,.7)" },
  { base: "#8B008B", light: "#DD44DD", dark: "#440044", shadow: "rgba(139,0,139,.8)", glow: "rgba(221,68,221,.7)" },
  { base: "#8B6914", light: "#FFD700", dark: "#4A3000", shadow: "rgba(255,180,0,.9)", glow: "rgba(255,230,0,.9)" },
];

export const XP_PER_LEVEL = 10;
export const MAX_LEVEL = 100;
export const BASE_METEOR_HP = 100;
export const HP_PER_LEVEL = 15;
export const BASE_CAT_DAMAGE = 50;

export const GLOBAL_STYLES = `
  @import url('https://fonts.googleapis.com/css2?family=Fredoka+One&family=Nunito:wght@400;600;700;800;900&display=swap');
  .font-fredoka { font-family: 'Fredoka One', cursive; }
  .font-nunito { font-family: 'Nunito', sans-serif; }
  .cloud-btn { background: linear-gradient(180deg,#FFE600 0%,#FF9500 100%); border: 4px solid #111; box-shadow: 0 6px 0 #111,0 8px 20px rgba(255,149,0,.5); transition: all .1s; color: #1a1a2e; }
  .cloud-btn:active { transform: translateY(4px); box-shadow: 0 2px 0 #111; }
  .cloud-btn:hover { filter: brightness(1.08); }
  .shop-btn { background: linear-gradient(180deg,#00D4FF 0%,#0090CC 100%); border: 4px solid #111; box-shadow: 0 5px 0 #111,0 8px 20px rgba(0,212,255,.4); transition: all .1s; color: #fff; }
  .shop-btn:active { transform: translateY(3px); box-shadow: 0 2px 0 #111; }
  .rank-btn { background: linear-gradient(180deg,#FF2D78 0%,#CC0044 100%); border: 4px solid #111; box-shadow: 0 5px 0 #111; transition: all .1s; color: #fff; }
  .rank-btn:active { transform: translateY(3px); box-shadow: 0 2px 0 #111; }
  .buy-btn { background: linear-gradient(180deg,#39FF14 0%,#22AA00 100%); border: 3px solid #111; box-shadow: 0 4px 0 #111; transition: all .1s; color: #1a1a2e; font-weight: 800; }
  .buy-btn:active { transform: translateY(3px); box-shadow: 0 1px 0 #111; }
  .gem-btn { background: linear-gradient(180deg,#CC44FF 0%,#8800CC 100%); border: 3px solid #111; box-shadow: 0 4px 0 #111; transition: all .1s; color: #fff; font-weight: 800; }
  .gem-btn:active { transform: translateY(3px); box-shadow: 0 1px 0 #111; }
  .real-btn { background: linear-gradient(180deg,#FF2D78 0%,#CC0044 100%); border: 3px solid #111; box-shadow: 0 4px 0 #111; transition: all .1s; color: #fff; font-weight: 800; }
  .real-btn:active { transform: translateY(3px); box-shadow: 0 1px 0 #111; }
  .owned-btn { background: linear-gradient(180deg,#555 0%,#333 100%); border: 3px solid #111; box-shadow: 0 4px 0 #111; color: #aaa; }
  .card-game { background: rgba(255,255,255,.07); border: 2px solid rgba(255,255,255,.15); backdrop-filter: blur(10px); }
  .tab-active { background: linear-gradient(180deg,#FFE600 0%,#FF9500 100%); color: #1a1a2e; border: 3px solid #111; box-shadow: 0 3px 0 #111; font-weight: 900; }
  .tab-inactive { background: rgba(255,255,255,.08); color: rgba(255,255,255,.55); border: 2px solid rgba(255,255,255,.1); }
  .title-stroke { -webkit-text-stroke: 3px #111; paint-order: stroke fill; }
  .hero-glow { filter: drop-shadow(0 0 30px rgba(255,230,0,.5)) drop-shadow(0 0 60px rgba(255,149,0,.3)); }
  @keyframes float-anim { 0%,100%{transform:translateY(0);}50%{transform:translateY(-14px);} }
  .float-hero { animation: float-anim 3s ease-in-out infinite; }
  @keyframes bounce-in { 0%{transform:scale(.3);opacity:0;}55%{transform:scale(1.1);}75%{transform:scale(.95);}100%{transform:scale(1);opacity:1;} }
  .bounce-in { animation: bounce-in .6s cubic-bezier(.36,.07,.19,.97) both; }
  @keyframes slide-up { 0%{transform:translateY(28px);opacity:0;}100%{transform:translateY(0);opacity:1;} }
  .slide-up { animation: slide-up .4s ease-out both; }
  @keyframes notif { 0%{transform:translateY(-20px) scale(.9);opacity:0;}100%{transform:translateY(0) scale(1);opacity:1;} }
  .notif-anim { animation: notif .3s ease-out; }
  @keyframes spin-bg { 0%{transform:rotate(0deg);}100%{transform:rotate(360deg);} }
  .spin-bg { animation: spin-bg 8s linear infinite; }
  .level-bar { background: linear-gradient(90deg,#39FF14,#00FF88); box-shadow: 0 0 8px rgba(57,255,20,.6); }
  .stars-bg { position:fixed;inset:0;pointer-events:none;z-index:0;background-image:radial-gradient(1px 1px at 8% 15%,rgba(255,255,255,.9) 0%,transparent 100%),radial-gradient(1px 1px at 25% 60%,rgba(255,255,255,.7) 0%,transparent 100%),radial-gradient(2px 2px at 48% 12%,rgba(255,230,0,.8) 0%,transparent 100%),radial-gradient(1px 1px at 72% 42%,rgba(255,255,255,.9) 0%,transparent 100%),radial-gradient(1px 1px at 88% 78%,rgba(255,255,255,.6) 0%,transparent 100%),radial-gradient(1px 1px at 18% 82%,rgba(255,255,255,.7) 0%,transparent 100%),radial-gradient(2px 2px at 92% 8%,rgba(0,212,255,.7) 0%,transparent 100%),radial-gradient(1px 1px at 55% 92%,rgba(255,255,255,.5) 0%,transparent 100%),radial-gradient(1px 1px at 35% 35%,rgba(200,100,255,.6) 0%,transparent 100%),radial-gradient(1px 1px at 65% 70%,rgba(255,255,255,.8) 0%,transparent 100%); }
  @keyframes explode3d { 0%{transform:translate(-50%,-50%) scale(1) rotateX(0deg);opacity:1;} 60%{transform:translate(-50%,-60%) scale(2.5) rotateX(20deg);opacity:.7;} 100%{transform:translate(-50%,-70%) scale(4) rotateX(40deg);opacity:0;} }
  .explode3d { animation: explode3d .5s ease-out forwards; pointer-events:none; }
  @keyframes score-pop { 0%{transform:translateY(0) scale(1);opacity:1;}100%{transform:translateY(-60px) scale(1.4);opacity:0;} }
  .score-pop { animation: score-pop .9s ease-out forwards; pointer-events:none; }
  @keyframes shake { 0%,100%{transform:translateX(0);}25%{transform:translateX(-8px);}75%{transform:translateX(8px);} }
  .shake { animation: shake .3s ease-in-out; }
  @keyframes meteor-spin { 0%{transform:translate(-50%,-50%) rotateY(0deg) rotateZ(0deg);}100%{transform:translate(-50%,-50%) rotateY(360deg) rotateZ(360deg);} }
  @keyframes hit-flash { 0%,100%{filter:brightness(1);}50%{filter:brightness(3) saturate(2);} }
  .hit-flash { animation: hit-flash .15s ease-in-out; }
  @keyframes billion-pop { 0%{transform:translate(-50%,-50%) scale(0.5);opacity:0;} 20%{transform:translate(-50%,-60%) scale(1.4);opacity:1;} 80%{transform:translate(-50%,-120%) scale(1.1);opacity:1;} 100%{transform:translate(-50%,-150%) scale(1);opacity:0;} }
  .billion-pop { animation: billion-pop 1.4s ease-out forwards; pointer-events:none; }
  @keyframes ring-burst { 0%{transform:translate(-50%,-50%) scale(0.2);opacity:1;} 100%{transform:translate(-50%,-50%) scale(3);opacity:0;} }
  .ring-burst { animation: ring-burst .5s ease-out forwards; pointer-events:none; }
  @keyframes particle-fly { 0%{opacity:1;transform:translate(0,0) scale(1);} 100%{opacity:0;transform:translate(var(--dx),var(--dy)) scale(0);} }
  .particle { animation: particle-fly .6s ease-out forwards; pointer-events:none; }
`;
