# NPC education and professional development

Approved target: individual aptitudes, practice, professions, mentorship, knowledge inheritance and autonomous learning.

## Implemented prototype
- Up to 24 abstract specialists per civilization, never more than current adult population when enrolling.
- Seven professions: farmer, builder, smith, merchant, scholar, soldier, teacher.
- Experience and skill 1-100, school/university learning bonus, academy bonus for military/science.
- Mentorship requires matching profession, higher skill and at least 30 skill.
- Bounded inherited knowledge index gives a small initial skill bonus to newly enrolled specialists.
- Commands: `!civ education`, `!civ train Alex farmer`, `!civ specialists`, `!civ mentor 1 2`.
- One daily simulation step per civilization through existing scheduler.

## Limitations
- Specialist records represent adults abstractly; they are not physical NPCs.
- Skills do not yet affect production, building, combat or teaching institutions beyond mentoring.
- No births tied to named families, death of specialists, personal aptitudes or actual generations yet.
- Workforce allocation across economy, military, research and education remains uncoordinated.
- Institution bonuses depend on active flags, not whether the institution could afford upkeep that day.
- No game runtime validation performed.
