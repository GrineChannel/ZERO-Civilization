# ZERO: Civilization — Diplomacy

Approved long-term design: full international politics, alliances, treaties, embassies, influence, federations, vassalage, sanctions, espionage and autonomous NPC diplomacy.

## Implemented first stage
- Diplomacy between existing player-founded civilizations, identified by stable owner IDs.
- Offers must be accepted or rejected by the target civilization's owning player.
- Types: alliance, trade, nonaggression, federation, vassalage, peace.
- Persistent pending proposals, active treaties, trust and tension.
- Ending a treaty reduces trust.
- Commands:
  - `!civ civs`
  - `!civ diplomacy`
  - `!civ propose alliance Other Kingdom`
  - `!civ accept 1` / `!civ reject 1`
  - `!civ relations Other Kingdom`
  - `!civ breaktreaty alliance Other Kingdom`

## Current limitations
- Treaties are diplomatic records; they do NOT yet enforce trade benefits, military support, territory sharing or vassal tribute.
- No AI-controlled independent civilizations, autonomous negotiations, embassies, spies, sanctions or warfare integration.
- No automatic proposal expiry; limits: 60 pending proposals, 60 treaties, 150 relation pairs.
- All diplomacy records stored in a single world dynamic property, guarded by a conservative size check; sharding needed for larger servers.
- Names must match exactly (case-insensitive) for command target selection.
- Code not yet tested in Minecraft Bedrock.
