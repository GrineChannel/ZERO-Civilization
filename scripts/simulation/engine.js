import { world } from "@minecraft/server";
const KEY = "zero:civilization:settlements";
const MAX = 40;
export class CivilizationEngine {
  constructor() { this.elapsed = 0; }
  list() {
    try {
      const value = world.getDynamicProperty(KEY);
      const data = value ? JSON.parse(value) : [];
      return Array.isArray(data) ? data : [];
    } catch { return []; }
  }
  save(data) { world.setDynamicProperty(KEY, JSON.stringify(data)); }
  found(player, name) {
    const data = this.list();
    if (data.length >= MAX) throw new Error("Settlement limit reached");
    if (name.length > 32) throw new Error("Name must be 32 characters or fewer");
    const location = player.location;
    if (data.some(s => s.dimension === player.dimension.id && Math.hypot(s.x-location.x,s.z-location.z)<128)) throw new Error("Another settlement is too close (128 blocks)");
    const id = data.reduce((max,s)=>Math.max(max,s.id),0)+1;
    const settlement = {id,name,population:5,food:60,wood:20,stone:10,level:1,x:Math.floor(location.x),y:Math.floor(location.y),z:Math.floor(location.z),dimension:player.dimension.id};
    data.push(settlement);
    this.save(data);
    return settlement;
  }
  tick() {
    // Each simulation cycle is 10 seconds at 20 TPS.
    const data = this.list();
    if (!data.length) return;
    for (const s of data) {
      s.food += Math.max(1,Math.floor(s.population/3)) - Math.ceil(s.population/4);
      s.wood += Math.max(1,Math.floor(s.population/5));
      if (s.food < 0) { s.population=Math.max(1,s.population-1); s.food=0; }
      if (s.food > s.population*12 && s.population < 100) { s.population++; s.food-=s.population*2; }
      if (s.wood >= 80 && s.population >= 12 && s.level < 5) {s.level++;s.wood-=80;}
    }
    try { this.save(data); } catch (e) { console.warn("[ZERO Civilization] save failed: "+e); }
  }
}
