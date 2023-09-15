Expand on client Asset Load function, implement a proper asset loader.

Current goal

Get the person to eat the chicken.

-   Pathfinding algorithm.

*   Heuristic - Manhattan Distance

    `function manhattanDistance(x1, y1, x2, y2) { return Math.abs(x1 - x2) + Math.abs(y1 - y2); }`

Give a list of behaviours.

Determine a behaviour based on priority. (This is complex). We might do this later.
Set a behaviour using a method of function. (This is less complex). We will do this now.

Find all the chickens, find closest position using manhattan.

<!--
Find the nearest chicken to the villager. (only works on the basis a tile is aware of what is on it.)

    - Create a zone of control. (An area to search the nodes of the graph, maybe a 10x10 square would be a good start?)
    - Search the zone of control nodes for chicken.
    - Did we find any chicken?
        - No
            - EXPAND THE ZONE OF CONTROL UNTIL WE FIND CHICKEN!!!!
        - Yes
            - Did we find more than one chicken?
                - No
                    - We found the nearest chicken!!!
                - Yes
                    - Get the path costs to the chickens from the pathfinder, and choose the lowest cost.
                    - We found the nearest chicken! -->

Villager calculate quickest route to the chicken (pathfinding)
Villager consumes the flesh of the chicken. (buffs)
