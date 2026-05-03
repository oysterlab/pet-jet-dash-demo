const CACHE_NAME = "pet-jet-dash-v3";
const ASSETS = [
  "./",
  "./index.html",
  "./styles.css",
  "./main.js",
  "./manifest.webmanifest",
  "./assets/pwa/icon-192.png",
  "./assets/pwa/icon-512.png",
  "./assets/pwa/maskable-192.png",
  "./assets/pwa/maskable-512.png",
  "./assets/generated/backgrounds/cozy_room_background.png",
  "./assets/generated/backgrounds/dreamy_sky_background.png",
  "./assets/generated/backgrounds/ground_strip.png",
  "./assets/generated/effects/jet_flame.png",
  "./assets/generated/effects/sparkle_reward.png",
  "./assets/generated/effects/speed_lines.png",
  "./assets/generated/sprites/player_flight_sheet.png",
  "./assets/generated/sprites/player_hit_sheet.png",
  "./assets/generated/sprites/player_clear_sheet.png",
  "./assets/generated/sprites/capsule_pop_sheet.png",
  "./assets/generated/sprites/golden_capsule_pop_sheet.png",
  "./assets/generated/sprites/collect_spark_sheet.png",
  "./assets/generated/items/boost_battery.png",
  "./assets/generated/items/golden_capsule.png",
  "./assets/generated/items/lucky_charm.png",
  "./assets/generated/items/snack_item.png",
  "./assets/generated/items/sticker_capsule.png",
  "./assets/generated/obstacles/bath_bubble_obstacle.png",
  "./assets/generated/obstacles/cardboard_box_obstacle.png",
  "./assets/generated/obstacles/cucumber_obstacle.png",
  "./assets/generated/obstacles/mail_package_obstacle.png",
  "./assets/generated/obstacles/slipper_obstacle.png",
  "./assets/generated/obstacles/vacuum_obstacle.png",
  "./assets/generated/pet/base_pet_mascot.png",
  "./assets/generated/pet/ingame_pet_player.png",
  "./assets/generated/stickers/01_happy_pet.png",
  "./assets/generated/stickers/02_snack_master.png",
  "./assets/generated/stickers/03_tiny_pilot.png",
  "./assets/generated/stickers/04_brave_baby.png",
  "./assets/generated/stickers/05_dramatic_oops.png",
  "./assets/generated/stickers/06_golden_pet.png",
  "./assets/generated/ui/collected_sticker_slot.png",
  "./assets/generated/ui/locked_sticker_slot.png",
  "./assets/generated/ui/sticker_book_icon.png"
];

self.addEventListener("install", (event) => {
  event.waitUntil(caches.open(CACHE_NAME).then((cache) => cache.addAll(ASSETS)));
  self.skipWaiting();
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches
      .keys()
      .then((keys) => Promise.all(keys.filter((key) => key !== CACHE_NAME).map((key) => caches.delete(key))))
  );
  self.clients.claim();
});

self.addEventListener("fetch", (event) => {
  if (event.request.method !== "GET") return;
  event.respondWith(caches.match(event.request).then((cached) => cached || fetch(event.request)));
});
