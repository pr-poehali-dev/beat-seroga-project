import { useState } from "react";
import { Screen, ShopTab, GLOBAL_STYLES } from "@/components/game/gameTypes";
import MenuScreen from "@/components/game/MenuScreen";
import ShopScreen from "@/components/game/ShopScreen";
import GameScreen from "@/components/game/GameScreen";

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
        {screen === "menu" && (
          <MenuScreen
            onPlay={() => setScreen("game")}
            onShop={() => setScreen("shop")}
            coins={coins}
            gems={gems}
          />
        )}
        {screen === "shop" && (
          <ShopScreen
            tab={shopTab}
            onTab={setShopTab}
            onBack={() => setScreen("menu")}
            coins={coins}
            gems={gems}
            purchased={purchased}
            onBuy={handleBuy}
          />
        )}
        {screen === "game" && (
          <GameScreen
            onBack={() => setScreen("menu")}
            onEarnCoins={(c) => setCoins(prev => prev + c)}
            onEarnGems={(g) => setGems(prev => prev + g)}
          />
        )}
      </div>
    </div>
  );
}
