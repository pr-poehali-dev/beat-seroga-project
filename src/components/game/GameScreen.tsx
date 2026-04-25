import { useState, useEffect, useRef, useCallback } from "react";
import {
  Meteor, Bullet, FloatText, Particle,
  METEOR_THEMES, XP_PER_LEVEL, MAX_LEVEL, BASE_METEOR_HP, HP_PER_LEVEL, BASE_CAT_DAMAGE,
} from "./gameTypes";

// ─── 3D Кот ──────────────────────────────────────────────────────────────────

function Cat3D({ x, level }: { x: number; level: number }) {
  const lvlColor = level < 5 ? "#FF9500" : level < 10 ? "#FF2D78" : level < 20 ? "#CC44FF" : "#FFE600";
  return (
    <div style={{ position: "absolute", bottom: "3%", left: `${x}%`, transform: "translateX(-50%)", zIndex: 8, pointerEvents: "none" }}>
      <div style={{ position: "relative", width: 60, height: 60 }}>
        <div style={{ width: 54, height: 48, borderRadius: "50% 50% 45% 45%", background: "radial-gradient(circle at 38% 30%, #f5c07a 0%, #e8923a 45%, #a0510e 100%)", boxShadow: "inset -6px -6px 14px rgba(0,0,0,.5), inset 4px 4px 10px rgba(255,255,255,.25), 0 0 20px rgba(255,149,0,.6), 0 6px 16px rgba(0,0,0,.5)", position: "absolute", bottom: 0, left: 3 }}>
          <div style={{ position: "absolute", top: "14%", left: "20%", width: "32%", height: "24%", borderRadius: "50%", background: "radial-gradient(circle,rgba(255,255,255,.5) 0%,transparent 100%)" }} />
          <div style={{ position: "absolute", top: "35%", left: "15%", width: "70%", height: 2, background: "rgba(120,50,0,.3)", borderRadius: 2 }} />
          <div style={{ position: "absolute", top: "55%", left: "20%", width: "60%", height: 2, background: "rgba(120,50,0,.3)", borderRadius: 2 }} />
        </div>
        <div style={{ width: 44, height: 40, borderRadius: "50% 50% 40% 40%", background: "radial-gradient(circle at 40% 30%, #f7ca88 0%, #e8923a 50%, #a0510e 100%)", boxShadow: "inset -5px -5px 12px rgba(0,0,0,.45), inset 3px 3px 8px rgba(255,255,255,.2), 0 0 16px rgba(255,149,0,.5)", position: "absolute", top: -10, left: 8 }}>
          <div style={{ position: "absolute", top: "30%", left: "18%", width: 9, height: 9, borderRadius: "50%", background: "radial-gradient(circle at 35% 30%,#44eeff,#006688)", boxShadow: "0 0 6px #00ccff" }} />
          <div style={{ position: "absolute", top: "30%", right: "18%", width: 9, height: 9, borderRadius: "50%", background: "radial-gradient(circle at 35% 30%,#44eeff,#006688)", boxShadow: "0 0 6px #00ccff" }} />
          <div style={{ position: "absolute", top: "55%", left: "43%", width: 6, height: 5, borderRadius: "40% 40% 50% 50%", background: "#ff69b4" }} />
          <div style={{ position: "absolute", top: "10%", left: "25%", width: "28%", height: "20%", borderRadius: "50%", background: "radial-gradient(circle,rgba(255,255,255,.45) 0%,transparent 100%)" }} />
        </div>
        <div style={{ position: "absolute", top: -18, left: 6, width: 0, height: 0, borderLeft: "8px solid transparent", borderRight: "8px solid transparent", borderBottom: "14px solid #e8923a", filter: "drop-shadow(0 -2px 4px rgba(255,149,0,.5))" }} />
        <div style={{ position: "absolute", top: -18, right: 6, width: 0, height: 0, borderLeft: "8px solid transparent", borderRight: "8px solid transparent", borderBottom: "14px solid #e8923a", filter: "drop-shadow(0 -2px 4px rgba(255,149,0,.5))" }} />
        <div style={{ position: "absolute", bottom: 4, right: -14, width: 16, height: 28, borderRadius: "0 50% 50% 0", background: "radial-gradient(circle at 30% 50%,#f5c07a,#a0510e)", transform: "rotate(20deg)", boxShadow: "inset -3px 0 6px rgba(0,0,0,.3)" }} />
        <div style={{ position: "absolute", bottom: -4, left: 8, width: 13, height: 8, borderRadius: "50% 50% 40% 40%", background: "radial-gradient(circle at 40% 30%,#f7ca88,#c06020)", boxShadow: "0 3px 6px rgba(0,0,0,.4)" }} />
        <div style={{ position: "absolute", bottom: -4, right: 8, width: 13, height: 8, borderRadius: "50% 50% 40% 40%", background: "radial-gradient(circle at 40% 30%,#f7ca88,#c06020)", boxShadow: "0 3px 6px rgba(0,0,0,.4)" }} />
        <div style={{ position: "absolute", top: -32, left: "50%", transform: "translateX(-50%)", fontFamily: "'Fredoka One',cursive", fontSize: 12, color: lvlColor, textShadow: `0 0 8px ${lvlColor}, 0 1px 4px #000`, whiteSpace: "nowrap", WebkitTextStroke: "0.5px #111" }}>
          LVL {level}
        </div>
        <div style={{ position: "absolute", inset: -8, borderRadius: "50%", border: `2px solid ${lvlColor}44`, boxShadow: `0 0 18px ${lvlColor}44` }} />
      </div>
      <div style={{ position: "absolute", bottom: 62, left: "50%", transform: "translateX(-50%)", width: 3, height: 28, background: "linear-gradient(0deg,rgba(255,200,0,.9),transparent)", borderRadius: 2 }} />
    </div>
  );
}

// ─── 3D Метеорит ─────────────────────────────────────────────────────────────

function Meteor3D({ m }: { m: Meteor }) {
  const theme = METEOR_THEMES[Math.min(m.maxHp - 1, METEOR_THEMES.length - 1)];
  const hpPct = m.hp / m.maxHp;
  const crackLevel = Math.round((1 - hpPct) * 3);
  const s = m.size;
  const damageShift = (1 - hpPct) * 40;
  return (
    <div style={{ position: "absolute", left: `${m.x}%`, top: `${m.y}%`, width: s, height: s, transform: `translate(-50%,-50%) rotate(${m.rotAngle}deg)`, zIndex: 5, pointerEvents: m.exploding ? "none" : "auto" }}>
      {m.exploding ? (
        <div className="explode3d" style={{ position: "absolute", inset: 0, display: "flex", alignItems: "center", justifyContent: "center", fontSize: s * 1.4 }}>💥</div>
      ) : (
        <>
          <div style={{ width: "100%", height: "100%", borderRadius: "50%", background: `radial-gradient(circle at 35% 28%, ${theme.light} 0%, ${theme.base} 42%, ${theme.dark} 100%)`, boxShadow: `inset -${s*.13}px -${s*.13}px ${s*.28}px rgba(0,0,0,.65), inset ${s*.07}px ${s*.07}px ${s*.16}px rgba(255,255,255,.28), 0 0 ${s*.6}px ${theme.glow}, 0 ${s*.18}px ${s*.35}px rgba(0,0,0,.55)`, position: "relative", overflow: "hidden", filter: crackLevel > 0 ? `hue-rotate(${damageShift}deg) brightness(${1 + crackLevel * 0.15})` : "none", transition: "filter .1s" }}>
            <div style={{ position: "absolute", top: "10%", left: "16%", width: "38%", height: "30%", borderRadius: "50%", background: "radial-gradient(circle,rgba(255,255,255,.6) 0%,transparent 100%)" }} />
            <div style={{ position: "absolute", top: "18%", left: "55%", width: "16%", height: "14%", borderRadius: "50%", background: "radial-gradient(circle,rgba(255,255,255,.35) 0%,transparent 100%)" }} />
            <div style={{ position: "absolute", bottom: "8%", right: "10%", width: "35%", height: "30%", borderRadius: "50%", background: "radial-gradient(circle,rgba(0,0,0,.45) 0%,transparent 100%)" }} />
            {crackLevel >= 1 && <div style={{ position: "absolute", inset: 0, background: `repeating-linear-gradient(${45 + crackLevel * 30}deg, transparent 0%, transparent 48%, rgba(0,0,0,.6) 49%, transparent 50%)`, opacity: crackLevel * 0.35 }} />}
            {crackLevel >= 2 && <div style={{ position: "absolute", inset: 0, background: `repeating-linear-gradient(${-30 + crackLevel * 20}deg, transparent 0%, transparent 44%, rgba(255,80,0,.5) 45%, transparent 46%)`, opacity: crackLevel * 0.3 }} />}
            {crackLevel >= 3 && <div style={{ position: "absolute", inset: 0, background: "radial-gradient(circle at 50% 50%, rgba(255,50,0,.4) 0%, transparent 60%)", animation: "hp-pulse .4s ease-in-out infinite" }} />}
          </div>
          <div style={{ position: "absolute", bottom: -10, left: "8%", width: "84%", height: 6, background: "rgba(0,0,0,.7)", borderRadius: 4, border: "1px solid rgba(255,255,255,.25)", overflow: "hidden" }}>
            <div style={{ width: `${hpPct * 100}%`, height: "100%", borderRadius: 4, background: hpPct > 0.6 ? "linear-gradient(90deg,#39FF14,#00FF88)" : hpPct > 0.3 ? "linear-gradient(90deg,#FFE600,#FF9500)" : "linear-gradient(90deg,#FF2D78,#FF0000)", boxShadow: `0 0 8px ${hpPct > 0.6 ? "#39FF14" : hpPct > 0.3 ? "#FFE600" : "#FF2D78"}`, transition: "width .08s, background .2s" }} />
          </div>
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

// ─── GameScreen ───────────────────────────────────────────────────────────────

interface GameScreenProps {
  onBack: () => void;
  onEarnCoins: (c: number) => void;
  onEarnGems: (g: number) => void;
}

export default function GameScreen({ onBack, onEarnCoins, onEarnGems }: GameScreenProps) {
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
    const maxHp = 3;
    const size = 44 + Math.min(lv * 0.5, 20) + Math.random() * 16;
    const themeIdx = lv <= 3 ? 0 : lv <= 10 ? 1 : lv <= 30 ? 2 : 3;
    const theme = METEOR_THEMES[themeIdx];
    setMeteors(prev => [...prev, {
      id: nextId.current++,
      x: 6 + Math.random() * 84, y: -8,
      size, speed: 0.4 + Math.random() * 0.5,
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
                const dmg = 2;
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
  }, [gameOver, paused, onEarnCoins, onEarnGems]);

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
        <div key={p.id} className="particle" style={{ position: "absolute", left: `${p.x}%`, top: `${p.y}%`, width: 10, height: 10, borderRadius: "50%", background: p.color, zIndex: 15, pointerEvents: "none", boxShadow: `0 0 6px ${p.color}`, ["--dx" as string]: `${p.dx}px`, ["--dy" as string]: `${p.dy}px` }} />
      ))}

      {/* Текст наград */}
      {floatTexts.map(ft => (
        <div key={ft.id}
          className={ft.big ? "billion-pop font-fredoka" : "score-pop font-fredoka"}
          style={{ position: "absolute", left: `${ft.x}%`, top: `${ft.y}%`, transform: "translate(-50%,-50%)", color: ft.text.includes("💎") ? "#DD88FF" : "#FFE600", fontSize: ft.big ? 22 : 18, zIndex: 25, textShadow: "0 2px 12px rgba(0,0,0,.9), 0 0 20px rgba(255,200,0,.6)", whiteSpace: "nowrap", fontWeight: 900, WebkitTextStroke: "1px #111" }}
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
