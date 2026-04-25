import { HERO_IMG } from "./gameTypes";

interface CurrencyBarProps { coins: number; gems: number; }

export function CurrencyBar({ coins, gems }: CurrencyBarProps) {
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

function MenuTile({ icon, label }: { icon: string; label: string }) {
  return (
    <button className="card-game rounded-xl py-3 flex flex-col items-center gap-1 text-white/75 font-nunito text-sm font-bold hover:bg-white/10 transition-colors">
      <span style={{ fontSize: 26 }}>{icon}</span>
      <span>{label}</span>
    </button>
  );
}

interface MenuScreenProps {
  onPlay: () => void;
  onShop: () => void;
  coins: number;
  gems: number;
}

export default function MenuScreen({ onPlay, onShop, coins, gems }: MenuScreenProps) {
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
