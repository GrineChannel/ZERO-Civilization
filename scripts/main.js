import { world, system } from "@minecraft/server";
import { CivilizationEngine } from "./simulation/engine.js";
const engine = new CivilizationEngine();
system.runInterval(() => engine.tick(), 200);
world.afterEvents.playerSpawn.subscribe(({ player, initialSpawn }) => {
  if (initialSpawn) system.run(() => player.sendMessage("§6ZERO Civilization §7v0.1.0 loaded. Type !civ help"));
});
world.beforeEvents.chatSend.subscribe(event => {
  if (!event.message.startsWith("!civ")) return;
  event.cancel = true;
  const player = event.sender;
  const args = event.message.trim().split(/\s+/);
  system.run(() => {
    try {
      if (args[1] === "found") {
        const name = args.slice(2).join(" ") || "New Settlement";
        const s = engine.found(player, name);
        player.sendMessage("§aFounded " + s.name + " (#" + s.id + ")");
      } else if (args[1] === "list") {
        const settlements = engine.list();
        player.sendMessage(settlements.length ? settlements.map(s => s.name + " | population " + s.population + " | food " + s.food).join("\n") : "No settlements yet.");
      } else {
        player.sendMessage("§e!civ found <name> §7- found settlement; §e!civ list §7- list settlements");
      }
    } catch (error) { player.sendMessage("§c" + String(error)); }
  });
});
