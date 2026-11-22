# ZERO Civilization — military evolution

Approved goal: armies, generals, technology, logistics, sieges, fleets, territory conquest and autonomous tactics.

## Implemented prototype
- Unit types: militia, infantry, archers, cavalry, engineers.
- Recruit an abstract army from adult citizens using state treasury.
- Upkeep consumes treasury and economy food; shortage reduces morale and supply.
- Training raises experience, extreme shortages cause desertion.
- Doctrine setting and strength calculation; pure skirmish simulation function for future integration.
- Commands: `!civ recruitarmy militia 2`, `!civ army`, `!civ doctrine defensive`.
- Military state saved in each civilization's existing society record.
- Bounded armies (8/civilization), recruitment (100/order), no spawned entities.

## Not yet implemented
- Skirmish function is NOT exposed as player combat: no war declaration, target authorization or territory transfers.
- No actual military NPC entities, general AI, formations, navigation, castles, siege mechanics, fleets or research tree.
- Doctrines are stored but do not yet change simulation behavior.
- Food and treasury are the economic model's abstract resources.
- Society demographic model remains simplified; military recruitment reduces adults.
- Code not yet tested in Minecraft. Use disposable worlds for early tests.
