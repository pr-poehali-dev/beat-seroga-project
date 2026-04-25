import { useState, useEffect } from "react";

type Screen = "menu" | "shop";
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
  common: "linear-gradient(135deg, #9ca3af, #6b7280)",
  rare: "linear-gradient(135deg, #60a5fa, #2563eb)",
  epic: "linear-gradient(135deg, #a855f7, #7e22ce)",
  legendary: "linear-gradient(135deg, #facc15, #f97316)",
};

const rarityLabel: Record<string, string> = {
  common: "Обычный",
  rare: "Редкий",
  epic: "Эпический",
  legendary: "Легендарный",
};

export default function Index() {
  const [screen, setScreen] = useState<Screen>("menu");
  const [shopTab, setShopTab] = useState<ShopTab>("skins");
  const [coins, setCoins] = useState(1000);
  const [gems, setGems] = useState(1468);
  const [purchased, setPurchased] = useState<number[]>([2]);
  const [notification, setNotification] = useState<string | null>(null);

  useEffect(() => {
    const timer = setInterval(() => {
      setCoins(c => c + 100);
      setGems(g => g + 50);
    }, 1000);
    return () => clearInterval(timer);
  }, []);

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
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Fredoka+One&family=Nunito:wght@400;600;700;800;900&display=swap');
        .font-fredoka { font-family: 'Fredoka One', cursive; }
        .font-nunito { font-family: 'Nunito', sans-serif; }
        .cloud-btn {
          background: linear-gradient(180deg,#FFE600 0%,#FF9500 100%);
          border: 4px solid #111;
          box-shadow: 0 6px 0 #111, 0 8px 20px rgba(255,149,0,.5);
          transition: all .1s;
          color: #1a1a2e;
        }
        .cloud-btn:active { transform: translateY(4px); box-shadow: 0 2px 0 #111; }
        .cloud-btn:hover { filter: brightness(1.08); }
        .shop-btn {
          background: linear-gradient(180deg,#00D4FF 0%,#0090CC 100%);
          border: 4px solid #111;
          box-shadow: 0 5px 0 #111, 0 8px 20px rgba(0,212,255,.4);
          transition: all .1s; color: #fff;
        }
        .shop-btn:active { transform: translateY(3px); box-shadow: 0 2px 0 #111; }
        .rank-btn {
          background: linear-gradient(180deg,#FF2D78 0%,#CC0044 100%);
          border: 4px solid #111;
          box-shadow: 0 5px 0 #111;
          transition: all .1s; color: #fff;
        }
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
        @keyframes float-anim { 0%,100% { transform: translateY(0); } 50% { transform: translateY(-14px); } }
        .float-hero { animation: float-anim 3s ease-in-out infinite; }
        @keyframes bounce-in { 0% { transform: scale(.3); opacity: 0; } 55% { transform: scale(1.1); } 75% { transform: scale(.95); } 100% { transform: scale(1); opacity: 1; } }
        .bounce-in { animation: bounce-in .6s cubic-bezier(.36,.07,.19,.97) both; }
        @keyframes slide-up { 0% { transform: translateY(28px); opacity: 0; } 100% { transform: translateY(0); opacity: 1; } }
        .slide-up { animation: slide-up .4s ease-out both; }
        @keyframes notif { 0% { transform: translateY(-20px) scale(.9); opacity: 0; } 100% { transform: translateY(0) scale(1); opacity: 1; } }
        .notif-anim { animation: notif .3s ease-out; }
        @keyframes spin-bg { 0% { transform: rotate(0deg); } 100% { transform: rotate(360deg); } }
        .spin-bg { animation: spin-bg 8s linear infinite; }
        .level-bar { background: linear-gradient(90deg, #39FF14, #00FF88); box-shadow: 0 0 8px rgba(57,255,20,.6); }
        .stars-bg {
          position: fixed; inset: 0; pointer-events: none; z-index: 0;
          background-image:
            radial-gradient(1px 1px at 8% 15%, rgba(255,255,255,.9) 0%,transparent 100%),
            radial-gradient(1px 1px at 25% 60%, rgba(255,255,255,.7) 0%,transparent 100%),
            radial-gradient(2px 2px at 48% 12%, rgba(255,230,0,.8) 0%,transparent 100%),
            radial-gradient(1px 1px at 72% 42%, rgba(255,255,255,.9) 0%,transparent 100%),
            radial-gradient(1px 1px at 88% 78%, rgba(255,255,255,.6) 0%,transparent 100%),
            radial-gradient(1px 1px at 18% 82%, rgba(255,255,255,.7) 0%,transparent 100%),
            radial-gradient(2px 2px at 92% 8%, rgba(0,212,255,.7) 0%,transparent 100%),
            radial-gradient(1px 1px at 55% 92%, rgba(255,255,255,.5) 0%,transparent 100%),
            radial-gradient(1px 1px at 35% 35%, rgba(200,100,255,.6) 0%,transparent 100%),
            radial-gradient(1px 1px at 65% 70%, rgba(255,255,255,.8) 0%,transparent 100%);
        }
      `}</style>

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
        {screen === "menu" && (
          <MenuScreen
            onPlay={() => showNotif("🎮 Начинаем игру!")}
            onShop={() => setScreen("shop")}
            coins={coins} gems={gems}
          />
        )}
        {screen === "shop" && (
          <ShopScreen
            tab={shopTab} onTab={setShopTab}
            onBack={() => setScreen("menu")}
            coins={coins} gems={gems}
            purchased={purchased} onBuy={handleBuy}
          />
        )}
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
        <div className="spin-bg absolute inset-0 rounded-full opacity-25"
          style={{ background: "radial-gradient(circle,rgba(255,230,0,.5) 0%,transparent 70%)" }} />
        <img src={HERO_IMG} alt="Герой" className="w-52 h-52 object-contain hero-glow rounded-full" />
      </div>

      <div className="flex flex-col gap-4 w-full mb-2">
        <button onClick={onPlay} className="cloud-btn w-full py-4 rounded-2xl font-fredoka text-2xl flex items-center justify-center gap-3 slide-up" style={{ animationDelay: ".3s" }}>
          ▶&nbsp; ИГРАТЬ
        </button>
        <div className="grid grid-cols-2 gap-3 slide-up" style={{ animationDelay: ".4s" }}>
          <button onClick={onShop} className="shop-btn py-3 rounded-2xl font-fredoka text-lg flex items-center justify-center gap-2">
            🛒 Магазин
          </button>
          <button className="rank-btn py-3 rounded-2xl font-fredoka text-lg flex items-center justify-center gap-2">
            🏆 Рейтинг
          </button>
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

function ShopScreen({ tab, onTab, onBack, coins, gems, purchased, onBuy }: {
  tab: ShopTab; onTab: (t: ShopTab) => void; onBack: () => void;
  coins: number; gems: number; purchased: number[];
  onBuy: (p: number, c: string, n: string, id: number) => void;
}) {
  return (
    <div className="relative min-h-screen flex flex-col" style={{ zIndex: 1 }}>
      <div className="flex items-center gap-3 px-4 pt-5 pb-3">
        <button onClick={onBack} className="w-10 h-10 rounded-xl flex items-center justify-center text-white font-fredoka text-xl flex-shrink-0"
          style={{ background: "rgba(255,255,255,.1)", border: "2px solid rgba(255,255,255,.2)" }}>
          ←
        </button>
        <h2 className="font-fredoka text-3xl title-stroke flex-1" style={{ color: "#FFE600" }}>МАГАЗИН</h2>
        <CurrencyBar coins={coins} gems={gems} />
      </div>

      <div className="flex gap-2 px-4 mb-4">
        {(["skins", "upgrades", "content"] as ShopTab[]).map(t => (
          <button key={t} onClick={() => onTab(t)}
            className={`flex-1 py-2 rounded-xl font-fredoka text-sm transition-all ${tab === t ? "tab-active" : "tab-inactive"}`}>
            {t === "skins" ? "👗 Скины" : t === "upgrades" ? "⚡ Апгрейды" : "🌍 Контент"}
          </button>
        ))}
      </div>

      <div className="flex-1 overflow-y-auto px-4 pb-10">
        {tab === "skins" && (
          <div className="grid grid-cols-2 gap-3">
            {skins.map(item => (
              <SkinCard key={item.id} item={item} isOwned={purchased.includes(item.id)} onBuy={onBuy} />
            ))}
          </div>
        )}
        {tab === "upgrades" && (
          <div className="flex flex-col gap-3">
            {upgrades.map(item => (
              <UpgradeCard key={item.id} item={item} onBuy={onBuy} />
            ))}
          </div>
        )}
        {tab === "content" && (
          <div className="flex flex-col gap-3">
            {content.map(item => (
              <ContentCard key={item.id} item={item} isOwned={purchased.includes(item.id)} onBuy={onBuy} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

function SkinCard({ item, isOwned, onBuy }: { item: typeof skins[0]; isOwned: boolean; onBuy: (p: number, c: string, n: string, id: number) => void }) {
  return (
    <div className="card-game rounded-2xl overflow-hidden flex flex-col bounce-in">
      <div className="h-28 flex items-center justify-center relative" style={{ background: rarityGrad[item.rarity] }}>
        <span style={{ fontSize: 52 }}>{item.emoji}</span>
        <span className="absolute bottom-1 left-2 font-fredoka text-xs text-white px-2 py-0.5 rounded-lg" style={{ background: "rgba(0,0,0,.5)" }}>
          {rarityLabel[item.rarity]}
        </span>
      </div>
      <div className="p-3 flex flex-col gap-2">
        <p className="font-fredoka text-white text-base leading-tight">{item.name}</p>
        {isOwned ? (
          <button className="owned-btn w-full py-1.5 rounded-xl font-fredoka text-sm">✓ Есть</button>
        ) : (
          <button onClick={() => onBuy(item.price, item.coins, item.name, item.id)}
            className={`w-full py-1.5 rounded-xl font-fredoka text-sm ${item.coins === "🪙" ? "buy-btn" : "gem-btn"}`}>
            {item.coins} {item.price}
          </button>
        )}
      </div>
    </div>
  );
}

function UpgradeCard({ item, onBuy }: { item: typeof upgrades[0]; onBuy: (p: number, c: string, n: string, id: number) => void }) {
  const pct = (item.level / item.maxLevel) * 100;
  const maxed = item.level >= item.maxLevel;
  return (
    <div className="card-game rounded-2xl p-4 flex items-center gap-4 slide-up">
      <div className="w-13 h-13 rounded-2xl flex items-center justify-center flex-shrink-0"
        style={{ background: "rgba(255,255,255,.1)", border: "2px solid rgba(255,255,255,.2)", width: 52, height: 52, fontSize: 28 }}>
        {item.emoji}
      </div>
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
      <button onClick={() => !maxed && onBuy(item.price, item.coins, item.name, item.id)}
        className={`px-3 py-2 rounded-xl font-fredoka text-sm flex-shrink-0 ${maxed ? "owned-btn" : "buy-btn"}`}
        disabled={maxed}>
        {maxed ? "MAX" : `${item.coins}${item.price}`}
      </button>
    </div>
  );
}

function ContentCard({ item, isOwned, onBuy }: { item: typeof content[0]; isOwned: boolean; onBuy: (p: number, c: string, n: string, id: number) => void }) {
  return (
    <div className="card-game rounded-2xl p-4 flex items-center gap-4 slide-up">
      <div className="rounded-2xl flex items-center justify-center flex-shrink-0"
        style={{ background: "rgba(255,255,255,.1)", border: "2px solid rgba(255,255,255,.2)", width: 52, height: 52, fontSize: 28 }}>
        {item.emoji}
      </div>
      <div className="flex-1 min-w-0">
        <p className="font-fredoka text-white text-base">{item.name}</p>
        <p className="font-nunito text-white/50 text-xs">{item.desc}</p>
      </div>
      {isOwned ? (
        <button className="owned-btn px-3 py-2 rounded-xl font-fredoka text-sm">✓ Куплено</button>
      ) : (
        <button onClick={() => onBuy(item.price, item.coins, item.name, item.id)}
          className={`px-3 py-2 rounded-xl font-fredoka text-sm ${item.coins === "💰" ? "real-btn" : "gem-btn"}`}>
          {item.coins} {item.price}
        </button>
      )}
    </div>
  );
}