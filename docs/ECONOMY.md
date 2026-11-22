# Economy — approved: full simulation target

## Implemented prototype
- Five goods: food, wood, stone, ore, tools.
- Five industries: farm, lumberyard, quarry, mine, workshop.
- Treasury, dynamic market prices, abstract state-owned enterprises, production inputs/outputs, worker capacity and taxation.
- `!civ economy`, `!civ market`, `!civ enterprise farm`, `!civ trade buy wood 3`, `!civ trade sell stone 2`.
- One economy update per society simulation cycle; per-civilization persistence.
- Bounded resources, prices, 16 enterprises per civilization.

## Important limitations
- Trades are against a virtual unlimited counterparty, not other players; this is NOT a closed economy.
- Economy food stock and existing society food are currently separate. Construction wood/stone stock is also separate. Integration is required before claiming a unified economy.
- Banks, deposits and loans are placeholders, not functioning features.
- No NPC-owned companies, wages, caravans, trade treaties, credit, inflation modeling, unemployment or financial crises yet.
- Inflation index is only a rough price-level indicator against a fixed baseline, not measured inflation over time.
- No actual NPCs or buildings are spawned.
- Prototype has not been tested in Minecraft Bedrock.
