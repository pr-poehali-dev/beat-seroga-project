import { ShopTab, skins, upgrades, content, rarityGrad, rarityLabel } from "./gameTypes";
import { CurrencyBar } from "./MenuScreen";

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

interface ShopScreenProps {
  tab: ShopTab;
  onTab: (t: ShopTab) => void;
  onBack: () => void;
  coins: number;
  gems: number;
  purchased: number[];
  onBuy: (p: number, c: string, n: string, id: number) => void;
}

export default function ShopScreen({ tab, onTab, onBack, coins, gems, purchased, onBuy }: ShopScreenProps) {
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
