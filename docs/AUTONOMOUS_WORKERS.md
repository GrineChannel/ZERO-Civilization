# Autonomous NPC construction — approved design
Chosen: option 3. Player issues build orders; workers autonomously assign tasks, rest and improve.

## Implemented virtual crew prototype (v0.1.1)
- `!civ start` gives a one-time test stock.
- `!civ recruit` recruits a virtual builder (maximum 8 per player).
- `!civ crew` shows skill, energy and current assignment.
- `!civ build hut` queues a 5×5 structure. Jobs require a builder.
- `!civ jobs` shows progress; `!civ stock` shows resources.
- Crew assignment, fatigue/rest and experience/skill progression persist in world dynamic properties.
- One block placed per active job per second, subject to available worker.

## NOT implemented
No spawned NPC entities, walking, pathfinding, physical hauling, tool usage, food, sleep schedules or foremen. These are future phases, not working features.

## Safety / technical debt
This is not multiplayer-safe construction yet: no land claims, preview, full-volume collision scan, refunds, or robust atomic stock/job persistence. Test only in a disposable world. World dynamic property storage has size limits. Code not yet tested in Minecraft.

## Future phases
1. Plot claims, preview and construction cancellation.
2. Visible NPC worker entities and pathfinding.
3. Warehouses, hauling and material delivery.
4. Roles, wages, food, training, rest and work priorities.
5. Large-scale construction: roads, walls, towers and castles.
