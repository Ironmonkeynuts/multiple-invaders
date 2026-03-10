# Multiple Invaders

## Educational Mathematics Game Inspired by Space Invaders

Multiple Invaders is a browser-based educational game designed to help students develop a strong understanding of **multiples, factors, and prime numbers**. The gameplay is inspired by classic arcade games such as Space Invaders, but incorporates mathematical problem-solving into the core mechanics.

Players control a cannon at the bottom of the screen and must destroy alien spacecraft labelled with numbers. Instead of firing ordinary bullets, the player fires **number bombs**. A bomb damages a spacecraft only if the number on the bomb is a **factor** of the spacecraft’s number. If the bomb is a **prime factor**, it causes additional damage.

The game is intended to combine **fast-paced arcade gameplay with mathematical reasoning**, helping students practice factor recognition in an engaging and interactive way.

---

## Project Goals

The goal of Multiple Invaders is to create a fun educational tool that helps students:

* Recognise **factors of numbers**
* Understand **multiples**
* Identify **prime numbers**
* Recognise **prime factors**
* Develop speed and confidence with number relationships

The game encourages players to think strategically about which numbers to use rather than simply firing randomly.

---

## Target Audience

Multiple Invaders is designed primarily for students learning about factors and primes.

Typical audience:

* Upper primary school
* Lower secondary school
* Students reviewing factorisation skills
* Mathematics intervention groups

The game can also be used as a classroom activity or revision tool.

---

## Core Gameplay Concept

Enemy spacecraft are labelled with numbers such as **10, 12, 20, 24, or 30**.

The player fires bombs labelled with numbers such as **1, 2, 3, or 5**.

When a bomb hits a spacecraft, the game checks whether the bomb number is a **factor** of the spacecraft number.

### Bomb Results

| Bomb Result  | Effect    |
| ------------ | --------- |
| Not a factor | No damage |
| Factor       | 1 damage  |
| Prime factor | 2 damage  |

This encourages players to identify **prime factors** for faster destruction of enemy ships.

---

## Example Gameplay

### Ship: 20

Possible hits:

| Bomb | Result                       |
| ---- | ---------------------------- |
| 1    | Factor (weak damage)         |
| 2    | Prime factor (strong damage) |
| 5    | Prime factor (strong damage) |
| 3    | No damage                    |

---

### Ship: 24

Possible hits:

| Bomb | Result                       |
| ---- | ---------------------------- |
| 1    | Factor (weak damage)         |
| 2    | Prime factor (strong damage) |
| 3    | Prime factor (strong damage) |
| 5    | No damage                    |

---

### Ship: 30

Possible hits:

| Bomb | Result                       |
| ---- | ---------------------------- |
| 1    | Factor (weak damage)         |
| 2    | Prime factor (strong damage) |
| 3    | Prime factor (strong damage) |
| 5    | Prime factor (strong damage) |

---

## MVP Game Rules

The first version of the game will follow these simple rules.

### Player

* Controls a cannon at the bottom of the screen
* Moves left and right
* Selects a bomb number
* Fires bombs upward at enemy ships

### Enemy Ships

* Appear in rows near the top of the screen
* Move horizontally across the screen
* Gradually descend toward the player
* Each ship has a number label and health

### Health System

Each ship starts with **4 health points**.

| Hit Type         | Damage |
| ---------------- | ------ |
| Incorrect number | 0      |
| Correct factor   | 1      |
| Prime factor     | 2      |

Ships are destroyed when their health reaches zero.

---

## Score System

The scoring system rewards correct mathematical thinking.

| Event              | Score |
| ------------------ | ----- |
| Correct factor hit | +10   |
| Prime factor hit   | +20   |
| Destroy ship       | +50   |
| Incorrect hit      | 0     |

---

## Controls

| Key         | Action        |
| ----------- | ------------- |
| Left Arrow  | Move left     |
| Right Arrow | Move right    |
| Spacebar    | Fire bomb     |
| 1           | Select bomb 1 |
| 2           | Select bomb 2 |
| 3           | Select bomb 3 |
| 5           | Select bomb 5 |

---

## Win and Lose Conditions

### Win

All enemy ships are destroyed.

### Lose

An enemy ship reaches the player line.

---

## Initial Game Numbers

### Enemy Ship Numbers

The first version of the game will use the following spacecraft numbers:

* 10
* 12
* 20
* 24
* 30

These numbers were selected because they provide a clear range of factor patterns.

### Bomb Numbers

Players begin with the following bomb options:

* 1
* 2
* 3
* 5

These provide enough variety for meaningful decision making while keeping the interface simple.

---

## Educational Feedback

The game will provide feedback to reinforce learning.

Examples:

* “2 is a factor of 20”
* “Prime factor hit!”
* “3 is not a factor of 24”

This helps players understand *why* their actions succeed or fail.

---

## Technology Stack

The first prototype will be built using:

* **HTML**
* **CSS**
* **Bootstrap 5**
* **JavaScript**

Later versions will integrate:

* **Python**
* **Django**
* **Database storage for levels, scores, and media**

---

## Development Phases

The project will be developed in several phases.

### Phase 1 — Game Design

Define the mathematical rules, gameplay mechanics, and learning objectives.

### Phase 2 — Browser Prototype

Create a simple playable version using HTML, CSS, Bootstrap, and JavaScript.

### Phase 3 — Maths Engine

Implement factor checking, prime detection, and damage calculation.

### Phase 4 — Django Integration

Serve the game through a Django application.

### Phase 5 — Database Models

Store levels, ships, bombs, and scores.

### Phase 6 — User Accounts and Leaderboards

Add player profiles, progress tracking, and scoreboards.

### Phase 7 — Content Management

Allow administrators to manage levels and upload game assets.

---

## Future Enhancements

Planned future improvements include:

* Multiple levels and increasing difficulty
* Boss ships with complex factor structures
* Visual effects and animations
* Sound effects and music
* Achievements and rewards
* Teacher dashboards and progress reports
* Customisable levels

---

## MVP Objective

The initial goal of the project is to create a **single-page playable prototype** where players can:

* Move a cannon
* Select number bombs
* Destroy numbered spacecraft
* Learn factor relationships through gameplay

Once this prototype is complete, the game will be expanded into a full Django-powered educational platform.

---

## License

This project is intended as an **educational open project** and may be used for learning, teaching, or experimentation.
