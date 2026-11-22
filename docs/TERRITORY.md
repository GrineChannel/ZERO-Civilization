# Geopolitical territory — approved design

## First implemented phase
- World divided into 16x16 block chunks.
- `!civ claim` claims the chunk under the player.
- `!civ land` inspects the current chunk and the player's total claims.
- Claim requires an existing civilization.
- After first claim, further claims must touch an existing owned chunk in the same dimension.
- Claims cannot overwrite another player's claims.
- Stored persistently as a world dynamic property.
- Limits: 64 chunks per player civilization; 300 chunks world-wide.

## Known limitations
- First claim is unrestricted and can be made in any dimension.
- No claim costs, plot protections, chunk unloading policy, province creation, capitals relocation, roads, occupations, wars or independence yet.
- Existing construction system is NOT yet territory-restricted.
- Entire territory map is stored in one dynamic property and will need sharding for larger worlds.
- This is a code prototype, not tested in Minecraft.
