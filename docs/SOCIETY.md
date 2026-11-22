# ZERO: Civilization — society system

Approved goal: full society simulation, with families, professions, culture, politics, migration and crime.

## Implemented: lightweight aggregate demographic prototype
- One civilization per player, up to 24 civilizations in a world.
- Found with `!civ found My Kingdom`.
- View with `!civ society`; view recent events with `!civ events`.
- Tracks children/adults/elders, food, housing, morale, health, loyalty, wealth, education, security and culture.
- Periodic aggregate births, aging, food production/consumption, famine and events.
- Processes one civilization per simulation cycle, avoiding full-population entity scans.
- Stores each civilization in a separate world dynamic property.

## Not yet implemented
Individual residents, named families, actual births of Minecraft entities, physical NPC spawning, profession assignment, culture propagation, migration, elections, religion, crime or rebellions. Tracked education/security/culture are placeholders for future mechanics.

## Performance and safety
- This prototype advances one society day per processed cycle, not a shared global calendar.
- No offline progression. No entity spawning or world block changes from the society module.
- Storage is limited; no migration/version upgrade support yet.
- Society population is **not** yet connected to the virtual builder crews.
- Untested in Minecraft Bedrock; verify behavior pack scripting compatibility before using in a valuable world.
