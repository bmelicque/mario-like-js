## TODO

* OOP SCROLLING
* OOP KEYBOARD
* ITEM PICKUP
* SCREEN TITLE (START / STOP)
* BACKGROUND
* ENNEMIES
* MOVING PLATFORMS: TRAJECTORIES

## LEVEL DESIGN

### Level 1-1

Au début du niveau 1: petits block à sauter

Ensuite: plateforme "vide". Trop grande pour sauter dessus, il faut passer en-dessous.

=> Différence faite entre plate-forme "pleine" et "vide"

Plateforme pleine en hauteur, puis plateforme fine et pleine => On peut passer à travers les fines.

``..#_#`` \
``____#``

Trous

Escaliers?

### Level 1-2

Niveau souterrain ? => Plein de platformes pleines

Premiers ennemis ?

### Level 1-3

Niveau extérieur, plateformes mouvantes.

## ABOUT JUMP SPEED AND GRAVITY...

Here are some calculations that help us fine tune our game. More precisely, computing the values of gravity and jump speed according to the wanted values of jump height and jump duration.

Physics tells us that:

``velocity = GRAVITY * time + JUMP_SPEED `` \
``position = GRAVITY * (time ²) / 2 + JUMP_SPEED * time + INITIAL_POSITION``

Jump height is ``position - INITIAL_POSITION`` \
Max height is attained when the speed becomes null. So:

``0 = GRAVITY * timeToHighest + JUMP_SPEED`` \
``timeToHighest = -JUMP_SPEED / GRAVITY``

Injecting this into the previous equations:

``jumpHeight = GRAVITY * (timeToHighest ²) / 2 + JUMP_SPEED * timeToHeighest`` \
``jumpHeight = GRAVITY * (-JUMP_SPEED / GRAVITY)² / 2 + JUMP_SPEED * (-JUMP_SPEED / GRAVITY)`` \
``jumpHeight = JUMP_SPEED ² / (2 * GRAVITY) - JUMP_SPEED ² / GRAVITY`` \
``jumpHeight = -JUMP_SPEED ² / (2 * GRAVITY)``

Knowing that ``jumpDuration = 2 * timeToHighest``:

``jumpDuration = - 2 * JUMP_SPEED / GRAVITY``

Combining the equations above, we get:

``JUMP_SPEED = 4 * JUMP_HEIGHT / JUMP_DURATION`` \
``GRAVITY = -8 * JUMP_HEIGHT / (JUMP_DURATION ²)``

## VECTORIAL PRODUCT?

`` (a.x2-a.x1) * (b.x-a.x1) - (a.y2-a.y1) * (b.y-a.y1) < 0``
`` (a.x2-a.x1) * (b.x-a.x1) < (a.y2-a.y1) * (b.y-a.y1) ``