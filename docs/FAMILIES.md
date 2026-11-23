# Families and dynasties — option 2

## Implemented prototype
- Per-civilization noble houses and named adult members; 8 houses and 48 members maximum.
- Found houses, add members with optional parent reference, arrange marriages, name heirs, manually trigger succession.
- House prestige and abstract wealth progress every 10 civilization days.
- Designate a ruling house in monarchy/empire; this records dynastic identity in politics.
- All commands require ownership of the civilization; no control over another player's civilization.
- Commands:
  - `!civ house Oak Alden`
  - `!civ relative 1 Mira 1`
  - `!civ heir 1 2`
  - `!civ marry 1 2` (requires two unmarried eligible members)
  - `!civ succession 1`
  - `!civ dynasty 1`
  - `!civ families`

## Limitations
- Members are abstract adult representatives, not spawned NPCs, births or children.
- `succession` marks the former head inactive in the dynasty model, but does not subtract from society population; it is a manual dynastic transition, not a full mortality simulation.
- Ruling house selection stores dynasty fields; political ruler owner remains the player, and government succession is not automated.
- House wealth is separate from treasury and economy; no inheritance transfers between economic accounts.
- Family occupations are not yet connected to specialist records beyond a simple matching-name prestige bonus.
- Marriages are internal to one player's civilization; cross-country marriage diplomacy requires bilateral consent and is future work.
- Not tested in Minecraft Bedrock.
