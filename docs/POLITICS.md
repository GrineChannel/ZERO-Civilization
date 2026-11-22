# Political system — approved: free government selection

## Implemented prototype
- Six forms: monarchy, republic, democracy, empire, council and tribal confederation.
- `!civ government <type>` selects a government.
- `!civ politics` shows stability, legitimacy and election count.
- `!civ laws` shows laws; `!civ law tax 20` changes a law.
- Laws: tax (0–40), freedom, military and welfare (0–100).
- Political stability responds to morale and taxation.
- Republic/democracy/council have periodic abstract election cycles.
- Political state persists within the existing civilization record.

## Limitations
Election cycles are simulated indicators, not real voting. No candidates, advisors, dynasty, succession, revolutions, provinces, legal enforcement, actual ruler replacement or transfer of player ownership yet. Some laws are stored but do not affect gameplay. Society advances once per 1200-tick cycle for one civilization at a time, not by Minecraft calendar day. This is not tested in-game.

## Planned
Political offices and delegated governance; election candidates and voting; dynastic succession; factions and protests; law enforcement and constitutional reform.
