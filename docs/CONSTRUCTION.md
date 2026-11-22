# NPC construction — approved design

**Chosen:** Option 2, NPC workers build structures from blueprints.

## Prototype scope (0.1.0)
- `!civ start` grants a one-time test stock.
- `!civ build hut` queues a 5×5 builder hut three blocks east/south of the player.
- `!civ jobs` lists progress; `!civ stock` displays materials.
- One virtual construction worker places one block per second per active job.
- Job state and resource stock persist as world dynamic properties.

## Known limitations
- Virtual workers are **not NPC entities** yet; no pathfinding or deliveries.
- No building menu or previews.
- No ownership claims, collision scan for the entire footprint, refunds or multiplayer anti-grief protections yet.
- Only use in a disposable test world; blocks are modified.
- This code has not yet been tested inside Minecraft.

## Next milestones
1. Claimed plots and safe placement previews.
2. Physical worker NPCs, professions, material hauling.
3. Construction stages, repair, demolition and cancellation.
4. City planning, roads, walls, towers and castles.
