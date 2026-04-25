import { useState, useEffect, useRef, useCallback } from "react";

type Screen = "menu" | "shop" | "game";
type ShopTab = "skins" | "upgrades" | "content";

const HERO_IMG = "https://cdn.poehali.dev/projects/23becf85-d033-44ce-b0ad-13db59a1c9ab/files/80a8ec5f-07ed-4e25-b085-659628426e00.jpg";

const skins = [
  { id: 1, name: "Пиратский кот", price: 120, coins: "🪙", rarity: "rare", emoji: "🏴‍☠️" },
  { id: 2, name: "Космонавт", price: 200, coins: "💎", rarity: "epic", emoji: "🚀" },
  { id: 3, name: "Ниндзя", price: 80, coins: "🪙", rarity: "common", emoji: "🥷" },
  { id: 4, name: "Волшебник", price: 350, coins: "💎", rarity: "legendary", emoji: "🧙" },
];
const upgrades = [
  { id: 5, name: "Скорость x2", price: 50, coins: "🪙", level: 3, maxLevel: 5, emoji: "⚡", desc: "Двигайся быстрее" },
  { id: 6, name: "Броня", price: 75, coins: "🪙", level: 1, maxLevel: 5, emoji: "🛡️", desc: "Больше защиты" },
  { id: 7, name: "Суперудар", price: 120, coins: "💎", level: 0, maxLevel: 3, emoji: "💥", desc: "Мощный удар" },
  { id: 8, name: "Удача", price: 60, coins: "🪙", level: 2, maxLevel: 5, emoji: "🍀", desc: "Больше монет" },
];
const content = [
  { id: 9, name: "Мир льда", price: 500, coins: "💎", emoji: "❄️", desc: "Новая локация" },
  { id: 10, name: "Пак монет x500", price: 99, coins: "💰", emoji: "💰", desc: "Пополнение кошелька" },
  { id: 11, name: "Тайная карта", price: 150, coins: "💎", emoji: "🗺️", desc: "Секретный уровень" },
  { id: 12, name: "Пак монет x200", price: 49, coins: "💰", emoji: "🪙", desc: "Пополнение кошелька" },
];
const rarityGrad: Record<string, string> = {
  common: "linear-gradient(135deg,#9ca3af,#6b7280)",
  rare: "linear-gradient(135deg,#60a5fa,#2563eb)",
  epic: "linear-gradient(135deg,#a855f7,#7e22ce)",
  legendary: "linear-gradient(135deg,#facc15,#f97316)",
};
const rarityLabel: Record<string, string> = {
  common: "Обычный", rare: "Редкий", epic: "Эпический", legendary: "Легендарный",
};

const GLOBAL_STYLES = `
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

interface Meteor {
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
interface Bullet {
  id: number;
  x: number;
  y: number;
}
interface FloatText { id: number; x: number; y: number; text: string; big?: boolean; }
interface Particle { id: number; x: number; y: number; dx: number; dy: number; color: string; }

// 3D цвета метеоритов по уровню HP
const METEOR_THEMES = [
  { base: "#8B4513", light: "#D2691E", dark: "#4A1A00", shadow: "rgba(139,69,19,.8)", glow: "rgba(255,100,0,.6)" },   // hp1 — коричневый
  { base: "#2E5BBA", light: "#5B8FFF", dark: "#0D2E6E", shadow: "rgba(46,91,186,.8)", glow: "rgba(91,143,255,.7)" },  // hp2 — синий
  { base: "#8B008B", light: "#DD44DD", dark: "#440044", shadow: "rgba(139,0,139,.8)", glow: "rgba(221,68,221,.7)" },   // hp3 — фиолетовый
  { base: "#8B6914", light: "#FFD700", dark: "#4A3000", shadow: "rgba(255,180,0,.9)", glow: "rgba(255,230,0,.9)" },    // hp4 — золотой (босс)
];

export default function Index() {
  const [screen, setScreen] = useState<Screen>("menu");
  const [shopTab, setShopTab] = useState<ShopTab>("skins");
  const [coins, setCoins] = useState(1000);
  const [gems, setGems] = useState(1468);
  const [purchased, setPurchased] = useState<number[]>([2]);
  const [notification, setNotification] = useState<string | null>(null);



  const showNotif = (msg: string) => {
    setNotification(msg);
    setTimeout(() => setNotification(null), 2000);
  };

  const handleBuy = (price: number, currency: string, name: string, id: number) => {
    if (currency === "🪙") {
      if (coins >= price) { setCoins(c => c - price); setPurchased(p => [...p, id]); showNotif(`🎉 Куплено: ${name}!`); }
      else showNotif("Не хватает монет! 😢");
    } else if (currency === "💎") {
      if (gems >= price) { setGems(g => g - price); setPurchased(p => [...p, id]); showNotif(`🎉 Куплено: ${name}!`); }
      else showNotif("Не хватает кристаллов! 😢");
    } else {
      showNotif(`💰 Открывается оплата для: ${name}`);
    }
  };

  return (
    <div className="min-h-screen font-nunito overflow-x-hidden" style={{ background: "linear-gradient(160deg,#1a1a2e 0%,#16213e 40%,#0f3460 100%)" }}>
      <style>{GLOBAL_STYLES}</style>
      <div className="stars-bg" />

      {notification && (
        <div className="fixed top-6 left-1/2 -translate-x-1/2 z-50 notif-anim" style={{ zIndex: 999 }}>
          <div className="font-fredoka text-lg px-6 py-3 rounded-2xl text-white"
            style={{ background: "linear-gradient(135deg,#1a1a2e,#0f3460)", boxShadow: "0 8px 32px rgba(0,0,0,.6)", border: "2px solid rgba(255,255,255,.2)" }}>
            {notification}
          </div>
        </div>
      )}

      <div style={{ maxWidth: 420, margin: "0 auto" }}>
        {screen === "menu" && <MenuScreen onPlay={() => setScreen("game")} onShop={() => setScreen("shop")} coins={coins} gems={gems} />}
        {screen === "shop" && <ShopScreen tab={shopTab} onTab={setShopTab} onBack={() => setScreen("menu")} coins={coins} gems={gems} purchased={purchased} onBuy={handleBuy} />}
        {screen === "game" && <GameScreen onBack={() => setScreen("menu")} onEarnCoins={(c) => setCoins(prev => prev + c)} onEarnGems={(g) => setGems(prev => prev + g)} />}
      </div>
    </div>
  );
}

function CurrencyBar({ coins, gems }: { coins: number; gems: number }) {
  return (
    <div className="flex gap-2 justify-end">
      <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-2xl font-fredoka text-base"
        style={{ background: "rgba(0,0,0,.45)", border: "2px solid rgba(255,230,0,.4)", color: "#FFE600" }}>
        🪙 {coins}
      </div>
      <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-2xl font-fredoka text-base"
        style={{ background: "rgba(0,0,0,.45)", border: "2px solid rgba(200,100,255,.4)", color: "#DD88FF" }}>
        💎 {gems}
      </div>
    </div>
  );
}

function MenuScreen({ onPlay, onShop, coins, gems }: { onPlay: () => void; onShop: () => void; coins: number; gems: number }) {
  return (
    <div className="relative min-h-screen flex flex-col items-center justify-between px-4 py-6" style={{ zIndex: 1 }}>
      <div className="w-full flex justify-end bounce-in" style={{ animationDelay: ".1s" }}>
        <CurrencyBar coins={coins} gems={gems} />
      </div>
      <div className="flex flex-col items-center gap-1 mt-2 bounce-in" style={{ animationDelay: ".2s" }}>
        <h1 className="font-fredoka title-stroke leading-tight text-center" style={{ fontSize: 58, color: "#FFE600", letterSpacing: 2 }}>
          КОТОВОЯЖ
        </h1>
        <p className="font-nunito font-bold text-white/60 text-base">Приключение ждёт! 🌟</p>
      </div>
      <div className="relative w-60 h-60 flex items-center justify-center float-hero">
        <div className="spin-bg absolute inset-0 rounded-full opacity-25" style={{ background: "radial-gradient(circle,rgba(255,230,0,.5) 0%,transparent 70%)" }} />
        <img src={HERO_IMG} alt="Герой" className="w-52 h-52 object-contain hero-glow rounded-full" />
      </div>
      <div className="flex flex-col gap-4 w-full mb-2">
        <button onClick={onPlay} className="cloud-btn w-full py-4 rounded-2xl font-fredoka text-2xl flex items-center justify-center gap-3 slide-up" style={{ animationDelay: ".3s" }}>
          ▶&nbsp; ИГРАТЬ
        </button>
        <div className="grid grid-cols-2 gap-3 slide-up" style={{ animationDelay: ".4s" }}>
          <button onClick={onShop} className="shop-btn py-3 rounded-2xl font-fredoka text-lg flex items-center justify-center gap-2">🛒 Магазин</button>
          <button className="rank-btn py-3 rounded-2xl font-fredoka text-lg flex items-center justify-center gap-2">🏆 Рейтинг</button>
        </div>
        <div className="grid grid-cols-3 gap-3 slide-up" style={{ animationDelay: ".5s" }}>
          <MenuTile icon="⚙️" label="Настройки" />
          <MenuTile icon="🎁" label="Бонус" />
          <MenuTile icon="👥" label="Друзья" />
        </div>
      </div>
    </div>
  );
}

function MenuTile({ icon, label }: { icon: string; label: string }) {
  return (
    <button className="card-game rounded-xl py-3 flex flex-col items-center gap-1 text-white/75 font-nunito text-sm font-bold hover:bg-white/10 transition-colors">
      <span style={{ fontSize: 26 }}>{icon}</span>
      <span>{label}</span>
    </button>
  );
}

// ─── GAME SCREEN ────────────────────────────────────────────────────────────

// 3D Кот-тушка (без картинки, чистый CSS)
function Cat3D({ x, level }: { x: number; level: number }) {
  const lvlColor = level < 5 ? "#FF9500" : level < 10 ? "#FF2D78" : level < 20 ? "#CC44FF" : "#FFE600";
  return (
    <div style={{ position: "absolute", bottom: "3%", left: `${x}%`, transform: "translateX(-50%)", zIndex: 8, pointerEvents: "none" }}>
      {/* Тело кота — 3D сфера */}
      <div style={{ position: "relative", width: 60, height: 60 }}>
        {/* Тело */}
        <div style={{
          width: 54, height: 48, borderRadius: "50% 50% 45% 45%",
          background: "radial-gradient(circle at 38% 30%, #f5c07a 0%, #e8923a 45%, #a0510e 100%)",
          boxShadow: "inset -6px -6px 14px rgba(0,0,0,.5), inset 4px 4px 10px rgba(255,255,255,.25), 0 0 20px rgba(255,149,0,.6), 0 6px 16px rgba(0,0,0,.5)",
          position: "absolute", bottom: 0, left: 3,
        }}>
          {/* Блик на теле */}
          <div style={{ position: "absolute", top: "14%", left: "20%", width: "32%", height: "24%", borderRadius: "50%", background: "radial-gradient(circle,rgba(255,255,255,.5) 0%,transparent 100%)" }} />
          {/* Полоски */}
          <div style={{ position: "absolute", top: "35%", left: "15%", width: "70%", height: 2, background: "rgba(120,50,0,.3)", borderRadius: 2 }} />
          <div style={{ position: "absolute", top: "55%", left: "20%", width: "60%", height: 2, background: "rgba(120,50,0,.3)", borderRadius: 2 }} />
        </div>
        {/* Голова */}
        <div style={{
          width: 44, height: 40, borderRadius: "50% 50% 40% 40%",
          background: "radial-gradient(circle at 40% 30%, #f7ca88 0%, #e8923a 50%, #a0510e 100%)",
          boxShadow: "inset -5px -5px 12px rgba(0,0,0,.45), inset 3px 3px 8px rgba(255,255,255,.2), 0 0 16px rgba(255,149,0,.5)",
          position: "absolute", top: -10, left: 8,
        }}>
          {/* Глаза */}
          <div style={{ position: "absolute", top: "30%", left: "18%", width: 9, height: 9, borderRadius: "50%", background: "radial-gradient(circle at 35% 30%,#44eeff,#006688)", boxShadow: "0 0 6px #00ccff" }} />
          <div style={{ position: "absolute", top: "30%", right: "18%", width: 9, height: 9, borderRadius: "50%", background: "radial-gradient(circle at 35% 30%,#44eeff,#006688)", boxShadow: "0 0 6px #00ccff" }} />
          {/* Нос */}
          <div style={{ position: "absolute", top: "55%", left: "43%", width: 6, height: 5, borderRadius: "40% 40% 50% 50%", background: "#ff69b4" }} />
          {/* Блик на голове */}
          <div style={{ position: "absolute", top: "10%", left: "25%", width: "28%", height: "20%", borderRadius: "50%", background: "radial-gradient(circle,rgba(255,255,255,.45) 0%,transparent 100%)" }} />
        </div>
        {/* Уши */}
        <div style={{ position: "absolute", top: -18, left: 6, width: 0, height: 0, borderLeft: "8px solid transparent", borderRight: "8px solid transparent", borderBottom: "14px solid #e8923a", filter: "drop-shadow(0 -2px 4px rgba(255,149,0,.5))" }} />
        <div style={{ position: "absolute", top: -18, right: 6, width: 0, height: 0, borderLeft: "8px solid transparent", borderRight: "8px solid transparent", borderBottom: "14px solid #e8923a", filter: "drop-shadow(0 -2px 4px rgba(255,149,0,.5))" }} />
        {/* Хвост */}
        <div style={{ position: "absolute", bottom: 4, right: -14, width: 16, height: 28, borderRadius: "0 50% 50% 0", background: "radial-gradient(circle at 30% 50%,#f5c07a,#a0510e)", transform: "rotate(20deg)", boxShadow: "inset -3px 0 6px rgba(0,0,0,.3)" }} />
        {/* Лапки */}
        <div style={{ position: "absolute", bottom: -4, left: 8, width: 13, height: 8, borderRadius: "50% 50% 40% 40%", background: "radial-gradient(circle at 40% 30%,#f7ca88,#c06020)", boxShadow: "0 3px 6px rgba(0,0,0,.4)" }} />
        <div style={{ position: "absolute", bottom: -4, right: 8, width: 13, height: 8, borderRadius: "50% 50% 40% 40%", background: "radial-gradient(circle at 40% 30%,#f7ca88,#c06020)", boxShadow: "0 3px 6px rgba(0,0,0,.4)" }} />
        {/* Уровень */}
        <div style={{ position: "absolute", top: -32, left: "50%", transform: "translateX(-50%)", fontFamily: "'Fredoka One',cursive", fontSize: 12, color: lvlColor, textShadow: `0 0 8px ${lvlColor}, 0 1px 4px #000`, whiteSpace: "nowrap", WebkitTextStroke: "0.5px #111" }}>
          LVL {level}
        </div>
        {/* Ореол */}
        <div style={{ position: "absolute", inset: -8, borderRadius: "50%", border: `2px solid ${lvlColor}44`, boxShadow: `0 0 18px ${lvlColor}44` }} />
      </div>
      {/* Луч выстрела */}
      <div style={{ position: "absolute", bottom: 62, left: "50%", transform: "translateX(-50%)", width: 3, height: 28, background: "linear-gradient(0deg,rgba(255,200,0,.9),transparent)", borderRadius: 2 }} />
    </div>
  );
}

function Meteor3D({ m }: { m: Meteor }) {
  const theme = METEOR_THEMES[Math.min(m.maxHp - 1, METEOR_THEMES.length - 1)];
  const hpPct = m.hp / m.maxHp;
  const crackLevel = Math.round((1 - hpPct) * 3); // 0-3 степень трещин
  const s = m.size;
  // Цвет меняется при уроне
  const damageShift = (1 - hpPct) * 40;
  return (
    <div style={{
      position: "absolute", left: `${m.x}%`, top: `${m.y}%`,
      width: s, height: s,
      transform: `translate(-50%,-50%) rotate(${m.rotAngle}deg)`,
      zIndex: 5,
      pointerEvents: m.exploding ? "none" : "auto",
    }}>
      {m.exploding ? (
        <div className="explode3d" style={{ position: "absolute", inset: 0, display: "flex", alignItems: "center", justifyContent: "center", fontSize: s * 1.4 }}>💥</div>
      ) : (
        <>
          {/* 3D сфера */}
          <div style={{
            width: "100%", height: "100%", borderRadius: "50%",
            background: `radial-gradient(circle at 35% 28%, ${theme.light} 0%, ${theme.base} 42%, ${theme.dark} 100%)`,
            boxShadow: `inset -${s*.13}px -${s*.13}px ${s*.28}px rgba(0,0,0,.65),
              inset ${s*.07}px ${s*.07}px ${s*.16}px rgba(255,255,255,.28),
              0 0 ${s*.6}px ${theme.glow},
              0 ${s*.18}px ${s*.35}px rgba(0,0,0,.55)`,
            position: "relative", overflow: "hidden",
            filter: crackLevel > 0 ? `hue-rotate(${damageShift}deg) brightness(${1 + crackLevel * 0.15})` : "none",
            transition: "filter .1s",
          }}>
            {/* Главный блик */}
            <div style={{ position: "absolute", top: "10%", left: "16%", width: "38%", height: "30%", borderRadius: "50%", background: "radial-gradient(circle,rgba(255,255,255,.6) 0%,transparent 100%)" }} />
            {/* Маленький блик */}
            <div style={{ position: "absolute", top: "18%", left: "55%", width: "16%", height: "14%", borderRadius: "50%", background: "radial-gradient(circle,rgba(255,255,255,.35) 0%,transparent 100%)" }} />
            {/* Тёмное пятно (объём) */}
            <div style={{ position: "absolute", bottom: "8%", right: "10%", width: "35%", height: "30%", borderRadius: "50%", background: "radial-gradient(circle,rgba(0,0,0,.45) 0%,transparent 100%)" }} />
            {/* Трещины — SVG-линии через clip */}
            {crackLevel >= 1 && <div style={{ position: "absolute", inset: 0, background: `repeating-linear-gradient(${45 + crackLevel * 30}deg, transparent 0%, transparent 48%, rgba(0,0,0,.6) 49%, transparent 50%)`, opacity: crackLevel * 0.35 }} />}
            {crackLevel >= 2 && <div style={{ position: "absolute", inset: 0, background: `repeating-linear-gradient(${-30 + crackLevel * 20}deg, transparent 0%, transparent 44%, rgba(255,80,0,.5) 45%, transparent 46%)`, opacity: crackLevel * 0.3 }} />}
            {crackLevel >= 3 && <div style={{ position: "absolute", inset: 0, background: "radial-gradient(circle at 50% 50%, rgba(255,50,0,.4) 0%, transparent 60%)", animation: "hp-pulse .4s ease-in-out infinite" }} />}
          </div>

          {/* HP бар */}
          <div style={{ position: "absolute", bottom: -10, left: "8%", width: "84%", height: 6, background: "rgba(0,0,0,.7)", borderRadius: 4, border: "1px solid rgba(255,255,255,.25)", overflow: "hidden" }}>
            <div style={{
              width: `${hpPct * 100}%`, height: "100%", borderRadius: 4,
              background: hpPct > 0.6 ? "linear-gradient(90deg,#39FF14,#00FF88)" : hpPct > 0.3 ? "linear-gradient(90deg,#FFE600,#FF9500)" : "linear-gradient(90deg,#FF2D78,#FF0000)",
              boxShadow: `0 0 8px ${hpPct > 0.6 ? "#39FF14" : hpPct > 0.3 ? "#FFE600" : "#FF2D78"}`,
              transition: "width .08s, background .2s",
            }} />
          </div>

          {/* HP сердечки */}
          <div style={{ position: "absolute", top: -20, left: "50%", transform: "translateX(-50%)", fontFamily: "'Fredoka One',cursive", fontSize: 10, textShadow: "0 1px 4px #000", whiteSpace: "nowrap", letterSpacing: 1 }}>
            {Array.from({ length: m.maxHp }, (_, i) => (
              <span key={i} style={{ opacity: i < m.hp ? 1 : 0.2, transition: "opacity .15s" }}>❤️</span>
            ))}
          </div>
        </>
      )}
    </div>
  );
}

const XP_PER_LEVEL = 10; // метеоритов на уровень
const MAX_LEVEL = 100;
const BASE_METEOR_HP = 100;
const HP_PER_LEVEL = 15;
const BASE_CAT_DAMAGE = 50;

function GameScreen({ onBack, onEarnCoins, onEarnGems }: { onBack: () => void; onEarnCoins: (c: number) => void; onEarnGems: (g: number) => void }) {
  const [meteors, setMeteors] = useState<Meteor[]>([]);
  const [bullets, setBullets] = useState<Bullet[]>([]);
  const [floatTexts, setFloatTexts] = useState<FloatText[]>([]);
  const [particles, setParticles] = useState<Particle[]>([]);
  const [score, setScore] = useState(0);
  const [hp, setHp] = useState(3);
  const [gameOver, setGameOver] = useState(false);
  const [catX, setCatX] = useState(50);
  const [shake, setShake] = useState(false);
  const [paused, setPaused] = useState(false);
  const [level, setLevel] = useState(1);
  const [xp, setXp] = useState(0);
  const [levelUp, setLevelUp] = useState(false);
  const [damage, setDamage] = useState(BASE_CAT_DAMAGE);
  const areaRef = useRef<HTMLDivElement>(null);
  const nextId = useRef(0);
  const catXRef = useRef(50);
  const pausedRef = useRef(false);
  const gameOverRef = useRef(false);
  const levelRef = useRef(1);
  const damageRef = useRef(BASE_CAT_DAMAGE);
  pausedRef.current = paused;
  gameOverRef.current = gameOver;
  catXRef.current = catX;
  levelRef.current = level;
  damageRef.current = damage;

  const spawnMeteor = useCallback(() => {
    if (pausedRef.current || gameOverRef.current) return;
    const lv = levelRef.current;
    const maxHp = BASE_METEOR_HP + (lv - 1) * HP_PER_LEVEL;
    // Размер зависит от уровня метеорита — визуально больше на высоких уровнях
    const size = 44 + Math.min(lv * 0.5, 20) + Math.random() * 16;
    const themeIdx = lv <= 3 ? 0 : lv <= 10 ? 1 : lv <= 30 ? 2 : 3;
    const theme = METEOR_THEMES[themeIdx];
    setMeteors(prev => [...prev, {
      id: nextId.current++,
      x: 6 + Math.random() * 84, y: -8,
      size,
      speed: 0.4 + Math.random() * 0.5, // медленнее
      color: theme.base, shadowColor: theme.shadow,
      hp: maxHp, maxHp, exploding: false,
      rotAngle: Math.random() * 360,
      rotSpeed: (Math.random() - 0.5) * 1.2,
    }]);
  }, []);

  const spawnBullet = useCallback(() => {
    if (pausedRef.current || gameOverRef.current) return;
    const cx = catXRef.current;
    setBullets(prev => [
      ...prev,
      { id: nextId.current++, x: cx, y: 86 },
      { id: nextId.current++, x: cx - 4, y: 86 },
      { id: nextId.current++, x: cx + 4, y: 86 },
      { id: nextId.current++, x: cx - 8, y: 88 },
      { id: nextId.current++, x: cx + 8, y: 88 },
    ]);
  }, []);

  useEffect(() => {
    if (gameOver) return;
    const mi = setInterval(spawnMeteor, 900);
    const bi = setInterval(spawnBullet, 250);
    return () => { clearInterval(mi); clearInterval(bi); };
  }, [gameOver, spawnMeteor, spawnBullet]);

  useEffect(() => {
    if (gameOver || paused) return;
    const tick = setInterval(() => {
      setMeteors(prev => {
        let missed = 0;
        const next = prev.map(m => {
          if (m.exploding) return m;
          const newY = m.y + m.speed;
          if (newY > 96) { missed++; return null; }
          return { ...m, y: newY, rotAngle: m.rotAngle + m.rotSpeed };
        }).filter(Boolean) as Meteor[];
        if (missed > 0) {
          setHp(h => { const n = h - missed; if (n <= 0) setGameOver(true); return Math.max(0, n); });
          setShake(true); setTimeout(() => setShake(false), 350);
        }
        return next;
      });

      setBullets(prev => prev.map(b => ({ ...b, y: b.y - 4 })).filter(b => b.y > -5));

      // Коллизии: читаем актуальные значения через ref
      setMeteors(mPrev => {
        setBullets(bPrev => {
          const hitBullets = new Set<number>();
          const newMeteors = mPrev.map(m => {
            if (m.exploding) return m;
            for (const b of bPrev) {
              if (hitBullets.has(b.id)) continue;
              const dx = Math.abs(b.x - m.x);
              const dy = Math.abs(b.y - m.y);
              if (dx < m.size * 0.4 && dy < m.size * 0.4) {
                hitBullets.add(b.id);
                const dmg = damageRef.current;
                const newHp = m.hp - dmg;
                if (newHp <= 0) {
                  const theme = METEOR_THEMES[Math.min(m.maxHp - 1, METEOR_THEMES.length - 1)];
                  const newParticles: Particle[] = Array.from({ length: 12 }, (_, i) => ({
                    id: Date.now() + i + Math.random(),
                    x: m.x, y: m.y,
                    dx: (Math.random() - 0.5) * 140,
                    dy: (Math.random() - 0.5) * 140,
                    color: [theme.base, theme.light, "#FFE600", "#FF9500", "#FF2D78"][Math.floor(Math.random() * 5)],
                  }));
                  setParticles(p => [...p, ...newParticles]);
                  setTimeout(() => setParticles(p => p.filter(pp => !newParticles.find(np => np.id === pp.id))), 700);
                  setScore(s => s + 15);
                  onEarnCoins(15);
                  onEarnGems(1);
                  setXp(prev => {
                    const newXp = prev + 1;
                    if (newXp >= XP_PER_LEVEL) {
                      setLevel(l => {
                        const nextLv = Math.min(l + 1, MAX_LEVEL);
                        // Каждый уровень +1 урон, стоит 1 монету (автоматически)
                        setDamage(BASE_CAT_DAMAGE + nextLv - 1);
                        return nextLv;
                      });
                      setLevelUp(true);
                      setTimeout(() => setLevelUp(false), 1600);
                      return 0;
                    }
                    return newXp;
                  });
                  setFloatTexts(ft => [
                    ...ft,
                    { id: Date.now() + Math.random(), x: m.x, y: m.y, text: `+15 🪙  +1 💎`, big: false },
                  ]);
                  setTimeout(() => setMeteors(p => p.filter(mm => mm.id !== m.id)), 450);
                  return { ...m, hp: 0, exploding: true };
                }
                return { ...m, hp: newHp };
              }
            }
            return m;
          });
          return bPrev.filter(b => !hitBullets.has(b.id));
        });
        return mPrev;
      });
    }, 40);
    return () => clearInterval(tick);
  }, [gameOver, paused, onEarnCoins]);

  const handleCatDrag = (e: React.TouchEvent | React.MouseEvent) => {
    if (!areaRef.current) return;
    const rect = areaRef.current.getBoundingClientRect();
    const clientX = "touches" in e ? e.touches[0].clientX : (e as React.MouseEvent).clientX;
    setCatX(Math.max(8, Math.min(92, ((clientX - rect.left) / rect.width) * 100)));
  };

  const restart = () => {
    setMeteors([]); setBullets([]); setScore(0); setHp(3);
    setGameOver(false); setFloatTexts([]); setCatX(50); setParticles([]);
    setLevel(1); setXp(0); setDamage(BASE_CAT_DAMAGE);
  };

  const FOOD = ["🍖","🐟","🥩","🍗","🫙","🍣","🦴"];
  const foodEmoji = FOOD[Math.floor(Date.now() / 200) % FOOD.length];
  const xpPct = (xp / XP_PER_LEVEL) * 100;
  const meteorHp = BASE_METEOR_HP + (level - 1) * HP_PER_LEVEL;

  return (
    <div
      ref={areaRef}
      className={`relative overflow-hidden select-none ${shake ? "shake" : ""}`}
      style={{ height: "100dvh", maxHeight: "100dvh", perspective: "600px", background: "radial-gradient(ellipse at 50% 0%,#0d2a5e 0%,#060d1e 60%,#020509 100%)", touchAction: "none", cursor: "none" }}
      onMouseMove={handleCatDrag}
      onTouchMove={handleCatDrag}
    >
      {/* Звёзды */}
      <div style={{ position: "absolute", inset: 0, backgroundImage: "radial-gradient(1px 1px at 5% 8%,#fff 0%,transparent 100%),radial-gradient(1px 1px at 22% 20%,rgba(255,255,255,.9) 0%,transparent 100%),radial-gradient(2px 2px at 45% 5%,rgba(255,230,0,.9) 0%,transparent 100%),radial-gradient(1px 1px at 70% 15%,#fff 0%,transparent 100%),radial-gradient(1px 1px at 88% 30%,#fff 0%,transparent 100%),radial-gradient(1px 1px at 12% 42%,rgba(200,150,255,.8) 0%,transparent 100%),radial-gradient(1px 1px at 35% 55%,#fff 0%,transparent 100%),radial-gradient(1px 1px at 60% 65%,rgba(0,212,255,.7) 0%,transparent 100%),radial-gradient(1px 1px at 80% 50%,#fff 0%,transparent 100%),radial-gradient(1px 1px at 95% 70%,#fff 0%,transparent 100%),radial-gradient(1px 1px at 18% 75%,#fff 0%,transparent 100%),radial-gradient(2px 2px at 50% 85%,rgba(200,100,255,.6) 0%,transparent 100%)", pointerEvents: "none" }} />

      {/* HUD */}
      <div className="absolute top-0 left-0 right-0 px-3 pt-3 pb-2" style={{ zIndex: 10, background: "linear-gradient(180deg,rgba(0,0,0,.75) 0%,transparent 100%)" }}>
        <div className="flex items-center justify-between mb-2">
          <button onClick={() => setPaused(p => !p)} className="font-fredoka text-white text-lg w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0" style={{ background: "rgba(255,255,255,.12)", border: "2px solid rgba(255,255,255,.2)" }}>
            {paused ? "▶" : "⏸"}
          </button>
          <div className="flex items-center gap-1">
            {[1,2,3].map(i => <span key={i} className={`text-xl transition-all ${hp >= i ? "" : "opacity-15"}`}>❤️</span>)}
          </div>
          <div className="flex flex-col items-end gap-0.5">
            <div className="font-fredoka text-sm" style={{ color: "#FFE600", textShadow: "0 0 10px rgba(255,220,0,.8)" }}>🪙 {score}</div>
            <div className="font-fredoka text-xs" style={{ color: "#FF9500" }}>⚔️ {damage} урон</div>
          </div>
        </div>
        {/* LVL + XP bar */}
        <div className="flex items-center gap-2">
          <div className="font-fredoka text-sm px-2 py-0.5 rounded-lg flex-shrink-0" style={{ background: "rgba(255,149,0,.25)", border: "1px solid rgba(255,149,0,.5)", color: "#FF9500" }}>
            LVL {level}/{MAX_LEVEL}
          </div>
          <div className="font-fredoka text-xs px-2 py-0.5 rounded-lg flex-shrink-0" style={{ background: "rgba(255,45,120,.2)", border: "1px solid rgba(255,45,120,.4)", color: "#FF2D78" }}>
            ☄️ {meteorHp} HP
          </div>
          <div className="flex-1 h-3 rounded-full overflow-hidden" style={{ background: "rgba(255,255,255,.1)", border: "1px solid rgba(255,255,255,.15)" }}>
            <div style={{ width: `${xpPct}%`, height: "100%", background: "linear-gradient(90deg,#FFE600,#FF9500)", boxShadow: "0 0 8px rgba(255,180,0,.7)", borderRadius: 999, transition: "width .2s" }} />
          </div>
          <div className="font-fredoka text-xs" style={{ color: "rgba(255,255,255,.5)", flexShrink: 0 }}>{xp}/{XP_PER_LEVEL}</div>
        </div>
      </div>

      {/* 3D Метеориты */}
      {meteors.map(m => <Meteor3D key={m.id} m={m} />)}

      {/* Снаряды — еда */}
      {bullets.map(b => (
        <div key={b.id} style={{ position: "absolute", left: `${b.x}%`, top: `${b.y}%`, fontSize: 16, transform: "translate(-50%,-50%)", zIndex: 6, pointerEvents: "none", filter: "drop-shadow(0 0 5px rgba(255,180,0,.9))" }}>
          {foodEmoji}
        </div>
      ))}

      {/* Частицы взрыва */}
      {particles.map(p => (
        <div key={p.id} className="particle" style={{
          position: "absolute", left: `${p.x}%`, top: `${p.y}%`,
          width: 10, height: 10, borderRadius: "50%",
          background: p.color, zIndex: 15, pointerEvents: "none",
          boxShadow: `0 0 6px ${p.color}`,
          ["--dx" as string]: `${p.dx}px`, ["--dy" as string]: `${p.dy}px`,
        }} />
      ))}

      {/* Текст наград */}
      {floatTexts.map(ft => (
        <div key={ft.id}
          className={ft.big ? "billion-pop font-fredoka" : "score-pop font-fredoka"}
          style={{
            position: "absolute", left: `${ft.x}%`, top: `${ft.y}%`,
            transform: "translate(-50%,-50%)",
            color: ft.text.includes("💎") ? "#DD88FF" : "#FFE600",
            fontSize: ft.big ? 22 : 18,
            zIndex: 25,
            textShadow: "0 2px 12px rgba(0,0,0,.9), 0 0 20px rgba(255,200,0,.6)",
            whiteSpace: "nowrap", fontWeight: 900,
            WebkitTextStroke: "1px #111",
          }}
          onAnimationEnd={() => setFloatTexts(p => p.filter(f => f.id !== ft.id))}>
          {ft.text}
        </div>
      ))}

      {/* 3D Кот */}
      <Cat3D x={catX} level={level} />

      {/* Level Up баннер */}
      {levelUp && (
        <div className="absolute left-1/2 billion-pop font-fredoka" style={{ top: "35%", transform: "translateX(-50%)", zIndex: 40, fontSize: 32, color: "#FFE600", textShadow: "0 0 30px rgba(255,200,0,.9), 0 2px 8px #000", WebkitTextStroke: "2px #111", whiteSpace: "nowrap", pointerEvents: "none" }}>
          ⬆️ LEVEL UP! LVL {level} ⬆️
        </div>
      )}

      {/* Пауза */}
      {paused && !gameOver && (
        <div className="absolute inset-0 flex flex-col items-center justify-center" style={{ background: "rgba(0,0,0,.75)", zIndex: 30, backdropFilter: "blur(4px)" }}>
          <div className="font-fredoka text-5xl title-stroke mb-6" style={{ color: "#FFE600" }}>ПАУЗА</div>
          <button onClick={() => setPaused(false)} className="cloud-btn px-10 py-4 rounded-2xl font-fredoka text-2xl mb-3">▶ Продолжить</button>
          <button onClick={onBack} className="font-fredoka text-white/70 text-lg px-6 py-2 rounded-xl" style={{ background: "rgba(255,255,255,.1)", border: "2px solid rgba(255,255,255,.2)" }}>← Меню</button>
        </div>
      )}

      {/* Game Over */}
      {gameOver && (
        <div className="absolute inset-0 flex flex-col items-center justify-center" style={{ background: "rgba(0,0,0,.85)", zIndex: 30, backdropFilter: "blur(6px)" }}>
          <div style={{ fontSize: 64 }}>💀</div>
          <div className="font-fredoka text-4xl title-stroke mt-2 mb-1" style={{ color: "#FF2D78" }}>GAME OVER</div>
          <div className="font-fredoka text-2xl mb-1" style={{ color: "#FFE600" }}>🪙 {score} монет</div>
          <div className="font-nunito text-white/55 text-sm mb-1">Уровень достигнут: {level} / {MAX_LEVEL}</div>
          <div className="font-nunito text-white/55 text-sm mb-5">Урон кота: ⚔️ {damage}</div>
          <button onClick={restart} className="cloud-btn px-10 py-4 rounded-2xl font-fredoka text-2xl mb-3">🔄 Заново</button>
          <button onClick={onBack} className="font-fredoka text-white/70 text-lg px-6 py-2 rounded-xl" style={{ background: "rgba(255,255,255,.1)", border: "2px solid rgba(255,255,255,.2)" }}>← Меню</button>
        </div>
      )}

      {!gameOver && !paused && (
        <div className="absolute bottom-0.5 left-0 right-0 text-center font-nunito text-white/25 text-xs" style={{ zIndex: 6 }}>
          Двигай пальцем влево / вправо
        </div>
      )}
    </div>
  );
}

// ─── SHOP ────────────────────────────────────────────────────────────────────

function ShopScreen({ tab, onTab, onBack, coins, gems, purchased, onBuy }: {
  tab: ShopTab; onTab: (t: ShopTab) => void; onBack: () => void;
  coins: number; gems: number; purchased: number[];
  onBuy: (p: number, c: string, n: string, id: number) => void;
}) {
  return (
    <div className="relative min-h-screen flex flex-col" style={{ zIndex: 1 }}>
      <div className="flex items-center gap-3 px-4 pt-5 pb-3">
        <button onClick={onBack} className="w-10 h-10 rounded-xl flex items-center justify-center text-white font-fredoka text-xl flex-shrink-0"
          style={{ background: "rgba(255,255,255,.1)", border: "2px solid rgba(255,255,255,.2)" }}>←</button>
        <h2 className="font-fredoka text-3xl title-stroke flex-1" style={{ color: "#FFE600" }}>МАГАЗИН</h2>
        <CurrencyBar coins={coins} gems={gems} />
      </div>
      <div className="flex gap-2 px-4 mb-4">
        {(["skins", "upgrades", "content"] as ShopTab[]).map(t => (
          <button key={t} onClick={() => onTab(t)} className={`flex-1 py-2 rounded-xl font-fredoka text-sm transition-all ${tab === t ? "tab-active" : "tab-inactive"}`}>
            {t === "skins" ? "👗 Скины" : t === "upgrades" ? "⚡ Апгрейды" : "🌍 Контент"}
          </button>
        ))}
      </div>
      <div className="flex-1 overflow-y-auto px-4 pb-10">
        {tab === "skins" && <div className="grid grid-cols-2 gap-3">{skins.map(item => <SkinCard key={item.id} item={item} isOwned={purchased.includes(item.id)} onBuy={onBuy} />)}</div>}
        {tab === "upgrades" && <div className="flex flex-col gap-3">{upgrades.map(item => <UpgradeCard key={item.id} item={item} onBuy={onBuy} />)}</div>}
        {tab === "content" && <div className="flex flex-col gap-3">{content.map(item => <ContentCard key={item.id} item={item} isOwned={purchased.includes(item.id)} onBuy={onBuy} />)}</div>}
      </div>
    </div>
  );
}

function SkinCard({ item, isOwned, onBuy }: { item: typeof skins[0]; isOwned: boolean; onBuy: (p: number, c: string, n: string, id: number) => void }) {
  return (
    <div className="card-game rounded-2xl overflow-hidden flex flex-col bounce-in">
      <div className="h-28 flex items-center justify-center relative" style={{ background: rarityGrad[item.rarity] }}>
        <span style={{ fontSize: 52 }}>{item.emoji}</span>
        <span className="absolute bottom-1 left-2 font-fredoka text-xs text-white px-2 py-0.5 rounded-lg" style={{ background: "rgba(0,0,0,.5)" }}>{rarityLabel[item.rarity]}</span>
      </div>
      <div className="p-3 flex flex-col gap-2">
        <p className="font-fredoka text-white text-base leading-tight">{item.name}</p>
        {isOwned
          ? <button className="owned-btn w-full py-1.5 rounded-xl font-fredoka text-sm">✓ Есть</button>
          : <button onClick={() => onBuy(item.price, item.coins, item.name, item.id)} className={`w-full py-1.5 rounded-xl font-fredoka text-sm ${item.coins === "🪙" ? "buy-btn" : "gem-btn"}`}>{item.coins} {item.price}</button>}
      </div>
    </div>
  );
}

function UpgradeCard({ item, onBuy }: { item: typeof upgrades[0]; onBuy: (p: number, c: string, n: string, id: number) => void }) {
  const pct = (item.level / item.maxLevel) * 100;
  const maxed = item.level >= item.maxLevel;
  return (
    <div className="card-game rounded-2xl p-4 flex items-center gap-4 slide-up">
      <div className="rounded-2xl flex items-center justify-center flex-shrink-0" style={{ background: "rgba(255,255,255,.1)", border: "2px solid rgba(255,255,255,.2)", width: 52, height: 52, fontSize: 28 }}>{item.emoji}</div>
      <div className="flex-1 min-w-0">
        <div className="flex items-center justify-between mb-0.5">
          <p className="font-fredoka text-white text-base">{item.name}</p>
          <span className="font-nunito text-xs text-white/50">{item.level}/{item.maxLevel}</span>
        </div>
        <p className="font-nunito text-white/50 text-xs mb-2">{item.desc}</p>
        <div className="h-2 rounded-full w-full" style={{ background: "rgba(255,255,255,.1)" }}>
          <div className="level-bar h-full rounded-full transition-all" style={{ width: `${pct}%` }} />
        </div>
      </div>
      <button onClick={() => !maxed && onBuy(item.price, item.coins, item.name, item.id)} className={`px-3 py-2 rounded-xl font-fredoka text-sm flex-shrink-0 ${maxed ? "owned-btn" : "buy-btn"}`} disabled={maxed}>
        {maxed ? "MAX" : `${item.coins}${item.price}`}
      </button>
    </div>
  );
}

function ContentCard({ item, isOwned, onBuy }: { item: typeof content[0]; isOwned: boolean; onBuy: (p: number, c: string, n: string, id: number) => void }) {
  return (
    <div className="card-game rounded-2xl p-4 flex items-center gap-4 slide-up">
      <div className="rounded-2xl flex items-center justify-center flex-shrink-0" style={{ background: "rgba(255,255,255,.1)", border: "2px solid rgba(255,255,255,.2)", width: 52, height: 52, fontSize: 28 }}>{item.emoji}</div>
      <div className="flex-1 min-w-0">
        <p className="font-fredoka text-white text-base">{item.name}</p>
        <p className="font-nunito text-white/50 text-xs">{item.desc}</p>
      </div>
      {isOwned
        ? <button className="owned-btn px-3 py-2 rounded-xl font-fredoka text-sm">✓ Куплено</button>
        : <button onClick={() => onBuy(item.price, item.coins, item.name, item.id)} className={`px-3 py-2 rounded-xl font-fredoka text-sm ${item.coins === "💰" ? "real-btn" : "gem-btn"}`}>{item.coins} {item.price}</button>}
    </div>
  );
}