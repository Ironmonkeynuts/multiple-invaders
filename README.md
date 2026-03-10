Multiple Invaders
# Game design and maths rules

## Project Goal

### Game title: Multiple Invaders

### Game type: Educational maths action game inspired by Space Invaders

### Learning goal:
Help students recognise:

- factors
- multiples
- prime factors
- repeated prime factors

### Core idea:
Alien ships are labelled with numbers.
The player fires number bombs.
A bomb damages a ship only if the bomb number is a factor of the ship number.


## First version learning scope

For the first playable version, keep the maths simple.

Use numbers such as:

10
12
15
18
20
24
30

Use bomb values such as:

1
2
3
5

Later we can add:

4
6
7
8
9
10

For the first version, it is better to keep bomb choices limited so the player can quickly learn the pattern.


## Game rules for MVP

Here is a strong simple rule set for version 1.

### Player

- controls a cannon at the bottom of the screen
- moves left and right
- fires one bomb upward at a time
- can switch between bomb values

### Enemy ships

- move side to side across the screen
- gradually descend like Space Invaders
- each ship displays a number, such as 20 or 24
- each ship has health

### Bomb rules

When a bomb hits a ship:

- if the bomb value is not a factor, it does 0 damage
- if the bomb value is a factor, it does 1 damage
- if the bomb value is a prime factor, it does 2 damage

That keeps the game easy to understand and rewards better maths choices.

### Example

For ship 20:

- 1 works, but weakly
- 2 works strongly
- 5 works strongly
- 3 does nothing

For ship 24:

- 2 works strongly
- 3 works strongly
- 1 works weakly
- 5 does nothing


## Health model

For the first version, do not overcomplicate repeated factor counts yet.

Use this simple model:

- each ship starts with 4 health
- normal factor hit = 1 damage
- prime factor hit = 2 damage

That means:

- weak but correct choices still help
- prime factors are rewarded
- players are encouraged to think more carefully

Later we can make the health system more mathematical, such as:

- requiring all prime factors to be used
- each ship has health equal to the number of factors it has


## Score system

For the first version, keep the score system simple.

Simple scoring for the prototype:

- +10 for correct factor hit
- +20 for prime factor hit
- +50 for destroying a ship
- 0 for incorrect hit

Optional later:

- combo bonus
- speed bonus
- accuracy bonus


## Win and lose conditions

### Win
- all enemy ships destroyed

### Lose
- any ship reaches the player line
- or player loses all lives

For the first prototype, the easiest lose condition is:
- game over when any ship reaches the bottom area


## Feedback messages

To make learning visible, the game should display short messages.

Examples:
- “2 is a factor of 20”
- “Prime factor hit!”
- “3 is not a factor of 20”

This is important because the game is educational, not just mechanical.


## Player controls

For the prototype:
- Left Arrow = move left
- Right Arrow = move right
- Spacebar = fire
- 1 / 2 / 3 / 5 keys = switch selected bomb

This is enough for a first playable version.


## Visual layout for prototype

The screen can be divided like this:

### Top
- game title
- score
- selected bomb
- message area

### Middle
- game area / canvas
- enemy ships moving

### Bottom
- player cannon

### Side or below
- bomb selection buttons
- instructions

Bootstrap 5 will help organise this around the game area.


## Planning phase deliverables

At the end of this Phase, we want these decisions locked in:

### Final MVP rules

- factor hits work
- prime factor hits do extra damage
- incorrect hits do no damage

### Initial number set

- ships: 10, 12, 20, 24, 30
- bombs: 1, 2, 3, 5

### Controls

- arrows
- space
- number keys

### Screens

- one page only for now
- score display
- selected bomb display
- learning feedback text