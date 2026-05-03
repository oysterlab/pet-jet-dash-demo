const canvas = document.getElementById("game");
const ctx = canvas.getContext("2d");
const scoreEl = document.getElementById("score");
const overlay = document.getElementById("overlay");
const photoInput = document.getElementById("photoInput");
const avatarPreview = document.getElementById("avatarPreview");
const startButton = document.getElementById("startButton");
const jumpButton = document.getElementById("jumpButton");
const dashButton = document.getElementById("dashButton");
const restartButton = document.getElementById("restartButton");
const resultText = document.getElementById("resultText");
const stickerGrid = document.getElementById("stickerGrid");
const stickerProgress = document.getElementById("stickerProgress");

let W = canvas.width;
let H = canvas.height;
let groundY = 584;
let ceilingY = 104;
let mobileLayout = false;
const runLength = 30;
const storeKey = "petjet-stickers-v1";

const assetPaths = {
  bgRoom: "assets/generated/backgrounds/cozy_room_background.png",
  bgSky: "assets/generated/backgrounds/dreamy_sky_background.png",
  ground: "assets/generated/backgrounds/ground_strip.png",
  player: "assets/generated/pet/ingame_pet_player.png",
  capsule: "assets/generated/items/sticker_capsule.png",
  goldenCapsule: "assets/generated/items/golden_capsule.png",
  snack: "assets/generated/items/snack_item.png",
  boost: "assets/generated/items/boost_battery.png",
  lucky: "assets/generated/items/lucky_charm.png",
  jetFlame: "assets/generated/effects/jet_flame.png",
  speedLines: "assets/generated/effects/speed_lines.png",
  sparkles: "assets/generated/effects/sparkle_reward.png",
  playerFlightSheet: "assets/generated/sprites/player_flight_sheet.png",
  playerHitSheet: "assets/generated/sprites/player_hit_sheet.png",
  playerClearSheet: "assets/generated/sprites/player_clear_sheet.png",
  capsulePopSheet: "assets/generated/sprites/capsule_pop_sheet.png",
  goldenCapsulePopSheet: "assets/generated/sprites/golden_capsule_pop_sheet.png",
  collectSparkSheet: "assets/generated/sprites/collect_spark_sheet.png",
  obstacles: [
    "assets/generated/obstacles/vacuum_obstacle.png",
    "assets/generated/obstacles/bath_bubble_obstacle.png",
    "assets/generated/obstacles/cardboard_box_obstacle.png",
    "assets/generated/obstacles/slipper_obstacle.png",
    "assets/generated/obstacles/cucumber_obstacle.png",
    "assets/generated/obstacles/mail_package_obstacle.png",
  ],
};

const stickers = [
  { id: "happy", name: "Happy Pet", src: "assets/generated/stickers/01_happy_pet.png" },
  { id: "snack", name: "Snack Master", src: "assets/generated/stickers/02_snack_master.png" },
  { id: "pilot", name: "Tiny Pilot", src: "assets/generated/stickers/03_tiny_pilot.png" },
  { id: "brave", name: "Brave Baby", src: "assets/generated/stickers/04_brave_baby.png" },
  { id: "oops", name: "Dramatic Oops", src: "assets/generated/stickers/05_dramatic_oops.png" },
  { id: "golden", name: "Golden Pet", src: "assets/generated/stickers/06_golden_pet.png" },
];

const unlocked = new Set(JSON.parse(localStorage.getItem(storeKey) || "[]"));
const images = {};

const state = {
  ready: false,
  running: false,
  ended: false,
  pressing: false,
  time: 0,
  last: 0,
  speed: 500,
  score: 0,
  best: Number(localStorage.getItem("petdash-best") || 0),
  combo: 1,
  comboTimer: 0,
  nearMisses: 0,
  capsulesCollected: 0,
  snacksCollected: 0,
  boostCharge: 0.35,
  nextGolden: false,
  spawnTimer: 0,
  snackTimer: 0,
  capsuleTimer: 0,
  boostTimer: 0,
  shake: 0,
  flash: 0,
  toast: "",
  toastTimer: 0,
  fxClock: 0,
  endReason: "",
  endTimer: 0,
  particles: [],
  spriteFx: [],
  obstacles: [],
  snacks: [],
  capsules: [],
  boosts: [],
  player: {
    x: 226,
    y: groundY - 230,
    vy: 0,
    r: 64,
    dash: 0,
    invuln: 0,
    squash: 1,
  },
};

function configureCanvas() {
  const shouldUseMobile = window.innerWidth <= 720 && window.innerHeight >= window.innerWidth;
  if (shouldUseMobile === mobileLayout && canvas.width === W && canvas.height === H) return;
  mobileLayout = shouldUseMobile;
  W = mobileLayout ? 900 : 1280;
  H = mobileLayout ? 1200 : 720;
  groundY = mobileLayout ? 1036 : 584;
  ceilingY = mobileLayout ? 126 : 104;
  canvas.width = W;
  canvas.height = H;
  if (!state.running) {
    state.player.x = mobileLayout ? 178 : 226;
    state.player.y = groundY - (mobileLayout ? 330 : 230);
  }
}

function loadImage(src) {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => resolve(img);
    img.onerror = () => reject(new Error(`Failed to load ${src}`));
    img.src = src;
  });
}

async function loadAssets() {
  const entries = [
    ...Object.entries(assetPaths).filter(([, value]) => !Array.isArray(value)),
    ...assetPaths.obstacles.map((src, i) => [`obstacle${i}`, src]),
    ...stickers.map((sticker) => [`sticker_${sticker.id}`, sticker.src]),
  ];
  const loaded = await Promise.all(entries.map(async ([key, src]) => [key, await loadImage(src)]));
  for (const [key, img] of loaded) images[key] = img;
  state.ready = true;
  avatarPreview.classList.add("has-image");
  avatarPreview.style.backgroundImage = `url("${assetPaths.player}")`;
  renderStickerBook();
  if (new URLSearchParams(window.location.search).get("autoplay") === "1") {
    resetGame();
    state.pressing = true;
    setTimeout(() => {
      state.pressing = false;
    }, 900);
  }
}

function resetGame() {
  if (!state.ready) return;
  state.running = true;
  state.ended = false;
  state.time = 0;
  state.last = performance.now();
  state.speed = 500;
  state.score = 0;
  state.combo = 1;
  state.comboTimer = 0;
  state.nearMisses = 0;
  state.capsulesCollected = 0;
  state.snacksCollected = 0;
  state.boostCharge = 0.35;
  state.nextGolden = unlocked.size >= 5;
  state.spawnTimer = 0.72;
  state.snackTimer = 0.4;
  state.capsuleTimer = 1.35;
  state.boostTimer = 3.2;
  state.shake = 0;
  state.flash = 0;
  state.toast = "";
  state.toastTimer = 0;
  state.endReason = "";
  state.endTimer = 0;
  state.particles = [];
  state.spriteFx = [];
  state.obstacles = [];
  state.snacks = [];
  state.capsules = [];
  state.boosts = [];
  Object.assign(state.player, {
    x: mobileLayout ? 178 : 226,
    y: groundY - (mobileLayout ? 330 : 230),
    vy: 0,
    dash: 0,
    invuln: 0,
    squash: 1,
  });
  overlay.classList.add("hidden");
  resultText.textContent = "Collect capsules to unlock this pet's sticker book.";
  scoreEl.textContent = "0";
}

function endGame(reason = "time") {
  if (state.ended) return;
  state.running = false;
  state.ended = true;
  state.pressing = false;
  state.endReason = reason;
  state.endTimer = 1.8;
  state.shake = reason === "hit" ? 18 : 0;
  state.flash = reason === "hit" ? 0.24 : 0.08;
  state.best = Math.max(state.best, Math.floor(state.score));
  localStorage.setItem("petdash-best", String(state.best));
  const collected = state.capsulesCollected;
  const unlockedCount = unlocked.size;
  resultText.textContent =
    reason === "time"
      ? `Run complete. ${collected} capsule${collected === 1 ? "" : "s"} collected. Sticker book: ${unlockedCount}/6.`
      : `Try again. You still keep progress. Sticker book: ${unlockedCount}/6.`;
  if (reason === "time") {
    state.spriteFx.push({
      sheet: "playerClearSheet",
      x: state.player.x,
      y: state.player.y,
      w: 240,
      h: 240,
      frames: 6,
      fps: 12,
      age: 0,
      life: 1.2,
    });
    showToast("Run complete");
  } else {
    state.spriteFx.push({
      sheet: "playerHitSheet",
      x: state.player.x,
      y: state.player.y,
      w: 220,
      h: 220,
      frames: 6,
      fps: 13,
      age: 0,
      life: 0.9,
    });
    showToast("Ouch. Try again");
  }
  setTimeout(() => overlay.classList.remove("hidden"), 520);
}

function dash() {
  const p = state.player;
  if (!state.running || p.dash > 0 || state.boostCharge < 0.34) return;
  p.dash = 0.24;
  p.invuln = 0.3;
  state.boostCharge = Math.max(0, state.boostCharge - 0.34);
  state.speed += 62;
  state.comboTimer = Math.max(state.comboTimer, 1.1);
  burst(p.x - 52, p.y, "#0f9f9a", 22, 2);
}

function spawnObstacle() {
  const top = Math.random() > 0.52;
  const imgIndex = Math.floor(Math.random() * assetPaths.obstacles.length);
  const size = (mobileLayout ? 92 : 78) + Math.random() * (mobileLayout ? 42 : 34);
  state.obstacles.push({
    x: W + 90,
    y: top ? ceilingY + 16 : groundY - size * 0.82,
    w: size * 1.05,
    h: size,
    top,
    imgIndex,
    passed: false,
    grazed: false,
  });
}

function spawnSnacks() {
  const y = ceilingY + 110 + Math.random() * (groundY - ceilingY - 230);
  const count = Math.random() > 0.5 ? 4 : 3;
  for (let i = 0; i < count; i += 1) {
    state.snacks.push({
      x: W + 70 + i * 58,
      y: y + Math.sin(i * 1.05) * 26,
      r: 18,
      spin: Math.random() * Math.PI,
    });
  }
}

function spawnCapsule() {
  const y = ceilingY + 125 + Math.random() * (groundY - ceilingY - 260);
  const golden = state.nextGolden || (unlocked.size >= 4 && Math.random() > 0.74);
  state.capsules.push({
    x: W + 110,
    y,
    r: golden ? 36 : 32,
    golden,
    bob: Math.random() * Math.PI * 2,
  });
  state.nextGolden = false;
}

function spawnBoost() {
  state.boosts.push({
    x: W + 90,
    y: ceilingY + 110 + Math.random() * (groundY - ceilingY - 230),
    r: 26,
    spin: Math.random() * Math.PI,
  });
}

function unlockNextSticker(golden = false) {
  const next = stickers.find((sticker) => !unlocked.has(sticker.id));
  if (!next) {
    state.score += golden ? 220 : 110;
    showToast("Sticker book complete");
    return;
  }
  unlocked.add(next.id);
  localStorage.setItem(storeKey, JSON.stringify([...unlocked]));
  state.score += golden ? 320 : 180;
  state.capsulesCollected += 1;
  renderStickerBook();
  showToast(`${next.name} unlocked`);
}

function showToast(text) {
  state.toast = text;
  state.toastTimer = 2.2;
}

function burst(x, y, color, count, power) {
  for (let i = 0; i < count; i += 1) {
    const a = Math.random() * Math.PI * 2;
    const s = (70 + Math.random() * 160) * power;
    state.particles.push({
      x,
      y,
      vx: Math.cos(a) * s,
      vy: Math.sin(a) * s - 40,
      life: 0.45 + Math.random() * 0.3,
      max: 0.75,
      color,
      size: 3 + Math.random() * 5,
    });
  }
}

function update(dt) {
  updateFx(dt);
  if (!state.running) return;
  state.time += dt;
  if (state.time >= runLength) {
    endGame("time");
    return;
  }

  state.speed = Math.min(780, state.speed + dt * 8);
  state.comboTimer = Math.max(0, state.comboTimer - dt);
  if (state.comboTimer <= 0) state.combo = 1;
  state.score += dt * 8 + state.speed * dt * 0.016 * state.combo;
  state.boostCharge = Math.min(1, state.boostCharge + dt * 0.045);
  scoreEl.textContent = Math.floor(state.score).toString();

  const p = state.player;
  const thrust = state.pressing ? -1780 : 0;
  p.vy += (1160 + thrust) * dt;
  p.vy *= state.pressing ? 0.985 : 0.995;
  p.y += p.vy * dt;
  if (p.y > groundY - 70) {
    p.y = groundY - 70;
    p.vy = Math.min(0, p.vy) * -0.16;
    p.squash = 0.82;
  }
  if (p.y < ceilingY + 68) {
    p.y = ceilingY + 68;
    p.vy = Math.max(0, p.vy);
    p.squash = 1.12;
  }
  p.dash = Math.max(0, p.dash - dt);
  p.invuln = Math.max(0, p.invuln - dt);
  p.squash += (1 - p.squash) * Math.min(1, dt * 12);

  state.spawnTimer -= dt;
  if (state.spawnTimer <= 0) {
    spawnObstacle();
    state.spawnTimer = 0.78 + Math.random() * 0.42 - Math.min(0.16, state.time * 0.004);
  }

  state.snackTimer -= dt;
  if (state.snackTimer <= 0) {
    spawnSnacks();
    state.snackTimer = 0.48 + Math.random() * 0.55;
  }

  state.capsuleTimer -= dt;
  if (state.capsuleTimer <= 0) {
    spawnCapsule();
    state.capsuleTimer = 4.2 + Math.random() * 2.4;
  }

  state.boostTimer -= dt;
  if (state.boostTimer <= 0) {
    spawnBoost();
    state.boostTimer = 5.2 + Math.random() * 3.2;
  }

  moveAndCollide(dt);
  updateParticles(dt);
  state.shake = Math.max(0, state.shake - dt * 45);
  state.flash = Math.max(0, state.flash - dt);
}

function moveAndCollide(dt) {
  const p = state.player;
  const move = state.speed * dt * (p.dash > 0 ? 1.65 : 1);

  for (const o of state.obstacles) {
    o.x -= move;
    if (!o.passed && o.x + o.w < p.x) {
      o.passed = true;
      state.score += 18 * state.combo;
    }
    const gap = circleRectDistance(p.x, p.y, p.r * 0.72, o);
    if (gap < 0 && p.invuln <= 0) endGame("hit");
    if (!o.grazed && gap > 0 && gap < 18) {
      o.grazed = true;
      state.nearMisses += 1;
      state.score += 28 * state.combo;
      state.combo = Math.min(5, state.combo + 1);
      state.comboTimer = 1.2;
      burst(p.x + 48, p.y, "#8bd1e8", 10, 1);
    }
  }
  state.obstacles = state.obstacles.filter((o) => o.x > -160);

  for (const s of state.snacks) {
    s.x -= move;
    s.spin += dt * 7;
    if (dist(p.x, p.y, s.x, s.y) < p.r + s.r) {
      s.taken = true;
      state.snacksCollected += 1;
      state.combo = Math.min(5, state.combo + 0.25);
      state.comboTimer = 1.35;
      state.score += 32 * state.combo;
      state.spriteFx.push({
        sheet: "collectSparkSheet",
        x: s.x,
        y: s.y,
        w: 130,
        h: 130,
        frames: 6,
        fps: 18,
        age: 0,
        life: 0.38,
      });
      burst(s.x, s.y, "#f2bc47", 12, 1.15);
    }
  }
  state.snacks = state.snacks.filter((s) => s.x > -70 && !s.taken);

  for (const c of state.capsules) {
    c.x -= move;
    c.bob += dt * 4;
    if (dist(p.x, p.y, c.x, c.y) < p.r + c.r) {
      c.taken = true;
      state.spriteFx.push({
        sheet: c.golden ? "goldenCapsulePopSheet" : "capsulePopSheet",
        x: c.x,
        y: c.y,
        w: c.golden ? 180 : 160,
        h: c.golden ? 180 : 160,
        frames: 6,
        fps: 16,
        age: 0,
        life: 0.55,
      });
      unlockNextSticker(c.golden);
      burst(c.x, c.y, c.golden ? "#f2bc47" : "#0f9f9a", c.golden ? 30 : 20, 1.8);
    }
  }
  state.capsules = state.capsules.filter((c) => c.x > -90 && !c.taken);

  for (const b of state.boosts) {
    b.x -= move;
    b.spin += dt * 6;
    if (dist(p.x, p.y, b.x, b.y) < p.r + b.r) {
      b.taken = true;
      state.boostCharge = Math.min(1, state.boostCharge + 0.45);
      state.score += 45;
      showToast("Boost charged");
      state.spriteFx.push({
        sheet: "collectSparkSheet",
        x: b.x,
        y: b.y,
        w: 150,
        h: 150,
        frames: 6,
        fps: 18,
        age: 0,
        life: 0.38,
      });
      burst(b.x, b.y, "#0f9f9a", 14, 1.2);
    }
  }
  state.boosts = state.boosts.filter((b) => b.x > -70 && !b.taken);
}

function updateParticles(dt) {
  for (const part of state.particles) {
    part.life -= dt;
    part.x += part.vx * dt;
    part.y += part.vy * dt;
    part.vy += 520 * dt;
  }
  state.particles = state.particles.filter((part) => part.life > 0);
}

function updateFx(dt) {
  state.fxClock += dt;
  state.endTimer = Math.max(0, state.endTimer - dt);
  state.toastTimer = Math.max(0, state.toastTimer - dt);
  for (const fx of state.spriteFx) fx.age += dt;
  state.spriteFx = state.spriteFx.filter((fx) => fx.age < fx.life);
}

function draw() {
  ctx.save();
  if (state.shake > 0) {
    ctx.translate((Math.random() - 0.5) * state.shake, (Math.random() - 0.5) * state.shake);
  }

  drawBackground();
  drawTrack();
  drawCollectibles();
  drawObstacles();
  drawPlayer();
  drawSpriteFx();
  drawParticles();
  drawHud();
  drawToast();

  if (state.flash > 0) {
    ctx.fillStyle = `rgba(239, 107, 86, ${state.flash})`;
    ctx.fillRect(0, 0, W, H);
  }
  ctx.restore();
}

function drawBackground() {
  if (!state.ready) {
    ctx.fillStyle = "#bde4f0";
    ctx.fillRect(0, 0, W, H);
    return;
  }
  const bg = images.bgSky;
  if (mobileLayout) {
    drawCover(bg, 0, 0, W, H);
    ctx.fillStyle = "rgba(255,250,241,0.08)";
    ctx.fillRect(0, 0, W, H);
    return;
  }
  const offset = (state.time * (mobileLayout ? 14 : 22)) % W;
  drawCover(bg, -offset, 0, W, H);
  drawCover(bg, W - offset, 0, W, H);
  ctx.fillStyle = "rgba(255,250,241,0.12)";
  ctx.fillRect(0, 0, W, H);
}

function drawTrack() {
  if (!state.ready) return;
  const strip = images.ground;
  const tileW = mobileLayout ? 640 : 520;
  const tileH = mobileLayout ? 185 : 150;
  const y = groundY - 18;
  const offset = (-state.time * state.speed * 0.8) % tileW;
  for (let x = offset - tileW; x < W + tileW; x += tileW) {
    drawContain(strip, x, y, tileW, tileH);
  }
}

function drawPlayer() {
  if (!state.ready) return;
  if (state.endReason === "hit" && state.endTimer > 0) return;
  if (state.endReason === "time" && state.endTimer > 0) return;
  const p = state.player;
  const bob = Math.sin(state.time * 12) * 3;
  const stretch = p.dash > 0 ? 1.12 : 1;
  const sx = stretch * (2 - p.squash);
  const sy = p.squash;

  ctx.save();
  ctx.translate(p.x, p.y + bob);
  ctx.fillStyle = "rgba(23,32,39,0.18)";
  ctx.beginPath();
  ctx.ellipse(10, mobileLayout ? 96 : 86, mobileLayout ? 78 : 72, 16, 0, 0, Math.PI * 2);
  ctx.fill();
  ctx.scale(sx, sy);
  ctx.rotate(p.dash > 0 ? -0.12 : Math.max(-0.18, Math.min(0.18, p.vy / 2600)));
  const playerSize = mobileLayout ? 198 : 182;
  if (state.pressing || p.dash > 0) drawContain(images.jetFlame, -132, 4, 90, 90);
  if (p.dash > 0) drawContain(images.speedLines, -190, -64, 132, 132);
  const frame = Math.floor(state.fxClock * 13) % 6;
  drawSpriteFrame(images.playerFlightSheet, frame, 6, -playerSize / 2, -playerSize / 2, playerSize, playerSize);
  if (p.invuln > 0) {
    ctx.strokeStyle = "rgba(15,159,154,0.65)";
    ctx.lineWidth = 5;
    ctx.beginPath();
    ctx.arc(0, 0, 76, 0, Math.PI * 2);
    ctx.stroke();
  }
  ctx.restore();
}

function drawSpriteFx() {
  if (!state.ready) return;
  for (const fx of state.spriteFx) {
    const frame = Math.min(fx.frames - 1, Math.floor(fx.age * fx.fps));
    const alpha = Math.min(1, Math.max(0, (fx.life - fx.age) / 0.18));
    ctx.save();
    ctx.globalAlpha = alpha;
    drawSpriteFrame(images[fx.sheet], frame, fx.frames, fx.x - fx.w / 2, fx.y - fx.h / 2, fx.w, fx.h);
    ctx.restore();
  }
}

function drawObstacles() {
  if (!state.ready) return;
  for (const o of state.obstacles) {
    ctx.fillStyle = "rgba(23,32,39,0.14)";
    ctx.beginPath();
    ctx.ellipse(o.x + o.w * 0.5, groundY + 18, o.w * 0.54, 12, 0, 0, Math.PI * 2);
    ctx.fill();
    drawContain(images[`obstacle${o.imgIndex}`], o.x - 16, o.y - 16, o.w + 32, o.h + 32);
  }
}

function drawCollectibles() {
  if (!state.ready) return;
  for (const s of state.snacks) {
    ctx.save();
    ctx.translate(s.x, s.y);
    ctx.rotate(s.spin * 0.15);
    drawContain(images.snack, -24, -24, 48, 48);
    ctx.restore();
  }
  for (const c of state.capsules) {
    const size = c.golden ? 78 : 68;
    const y = c.y + Math.sin(c.bob) * 8;
    drawContain(c.golden ? images.goldenCapsule : images.capsule, c.x - size / 2, y - size / 2, size, size);
  }
  for (const b of state.boosts) {
    ctx.save();
    ctx.translate(b.x, b.y);
    ctx.rotate(Math.sin(b.spin) * 0.08);
    drawContain(images.boost, -30, -30, 60, 60);
    ctx.restore();
  }
}

function drawParticles() {
  for (const p of state.particles) {
    ctx.globalAlpha = Math.max(0, p.life / p.max);
    ctx.fillStyle = p.color;
    ctx.beginPath();
    ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
    ctx.fill();
    ctx.globalAlpha = 1;
  }
}

function drawHud() {
  ctx.fillStyle = "rgba(255,250,241,0.86)";
  rounded(28, 26, mobileLayout ? 510 : 510, 62, 8);
  ctx.fill();
  ctx.fillStyle = "#172027";
  ctx.font = "800 21px system-ui, sans-serif";
  ctx.fillText(`Best ${state.best}`, 50, 64);
  ctx.fillStyle = state.combo > 1 ? "#ef6b56" : "#6f7b83";
  ctx.fillText(`x${state.combo.toFixed(state.combo % 1 ? 1 : 0)}`, 168, 64);
  ctx.fillStyle = "#172027";
  ctx.fillText(`${Math.max(0, Math.ceil(runLength - state.time))}s`, 238, 64);
  ctx.fillStyle = "#0f9f9a";
  ctx.fillText(`Caps ${state.capsulesCollected}`, 306, 64);
  ctx.fillStyle = "#172027";
  ctx.fillText(`Boost`, 414, 64);
  ctx.fillStyle = "rgba(23,32,39,0.14)";
  rounded(482, 46, 42, 12, 6);
  ctx.fill();
  ctx.fillStyle = state.boostCharge >= 0.34 ? "#0f9f9a" : "#ef6b56";
  rounded(482, 46, 42 * state.boostCharge, 12, 6);
  ctx.fill();
}

function drawToast() {
  if (state.toastTimer <= 0) return;
  ctx.save();
  ctx.globalAlpha = Math.min(1, state.toastTimer);
  ctx.fillStyle = "rgba(23,32,39,0.82)";
  rounded(W / 2 - 190, 104, 380, 54, 8);
  ctx.fill();
  ctx.fillStyle = "#fffaf1";
  ctx.font = "900 23px system-ui, sans-serif";
  ctx.textAlign = "center";
  ctx.fillText(state.toast, W / 2, 139);
  ctx.restore();
  ctx.textAlign = "left";
}

function renderStickerBook() {
  stickerGrid.innerHTML = "";
  stickerProgress.textContent = `${unlocked.size}/6`;
  for (const sticker of stickers) {
    const isUnlocked = unlocked.has(sticker.id);
    const slot = document.createElement("article");
    slot.className = "sticker-slot";
    const art = document.createElement("div");
    art.className = "sticker-art";
    const img = document.createElement("img");
    img.src = isUnlocked ? sticker.src : "assets/generated/ui/locked_sticker_slot.png";
    img.alt = isUnlocked ? sticker.name : `${sticker.name} locked`;
    art.append(img);
    const name = document.createElement("div");
    name.className = "sticker-name";
    name.textContent = sticker.name;
    const link = document.createElement("a");
    link.className = `download-link${isUnlocked ? "" : " locked"}`;
    link.textContent = isUnlocked ? "Download" : "Locked";
    if (isUnlocked) {
      link.href = sticker.src;
      link.download = `${sticker.id}.png`;
    }
    slot.append(art, name, link);
    stickerGrid.append(slot);
  }
}

function rounded(x, y, w, h, r) {
  ctx.beginPath();
  ctx.roundRect(x, y, w, h, r);
}

function drawContain(img, x, y, w, h) {
  const scale = Math.min(w / img.width, h / img.height);
  const dw = img.width * scale;
  const dh = img.height * scale;
  ctx.drawImage(img, x + (w - dw) / 2, y + (h - dh) / 2, dw, dh);
}

function drawSpriteFrame(sheet, frame, frameCount, x, y, w, h) {
  const frameW = sheet.width / frameCount;
  ctx.drawImage(sheet, frame * frameW, 0, frameW, sheet.height, x, y, w, h);
}

function drawCover(img, x, y, w, h) {
  const scale = Math.max(w / img.width, h / img.height);
  const dw = img.width * scale;
  const dh = img.height * scale;
  ctx.drawImage(img, x + (w - dw) / 2, y + (h - dh) / 2, dw, dh);
}

function circleRectDistance(cx, cy, radius, rect) {
  const nx = Math.max(rect.x, Math.min(cx, rect.x + rect.w));
  const ny = Math.max(rect.y, Math.min(cy, rect.y + rect.h));
  return dist(cx, cy, nx, ny) - radius;
}

function dist(ax, ay, bx, by) {
  return Math.hypot(ax - bx, ay - by);
}

function loop(now) {
  const dt = Math.min(0.033, (now - state.last) / 1000 || 0);
  state.last = now;
  update(dt);
  draw();
  requestAnimationFrame(loop);
}

photoInput.addEventListener("change", () => {
  const file = photoInput.files?.[0];
  if (!file) return;
  const url = URL.createObjectURL(file);
  avatarPreview.classList.add("has-image");
  avatarPreview.style.backgroundImage = `url("${url}")`;
});

window.addEventListener("resize", configureCanvas);

startButton.addEventListener("click", resetGame);
for (const target of [jumpButton, canvas]) {
  target.addEventListener("pointerdown", (event) => {
    event.preventDefault();
    state.pressing = true;
  });
  target.addEventListener("pointerup", () => {
    state.pressing = false;
  });
  target.addEventListener("pointerleave", () => {
    state.pressing = false;
  });
}
dashButton.addEventListener("click", dash);
restartButton.addEventListener("click", resetGame);

window.addEventListener("keydown", (event) => {
  if (event.code === "Space" || event.code === "ArrowUp") {
    event.preventDefault();
    state.pressing = true;
  }
  if (event.code === "ShiftLeft" || event.code === "ArrowRight") dash();
  if (event.code === "Enter" && !state.running) resetGame();
});

window.addEventListener("keyup", (event) => {
  if (event.code === "Space" || event.code === "ArrowUp") state.pressing = false;
});

configureCanvas();
renderStickerBook();
loadAssets().catch((error) => {
  console.error(error);
  resultText.textContent = "Asset loading failed. Check generated asset paths.";
});
state.last = performance.now();
requestAnimationFrame(loop);
