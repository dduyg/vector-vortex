# 🪸 Emoji Reef 🐙
Generates a random emoji party. 


Generates a grid-based "oceanscapes" filled with aquatic emojis, distributed randomly.

 randomly-generated ocean scene.

It visually represents an underwater grid using emojis for creatures, treasures, and different sea elements. The grid is randomly populated each time, so every refresh creates a unique ocean scene.

# visualizing arrays, randomness, or 

- *Grid visualization:* The oceanscape is a 2D array of emojis, randomly populated according to your settings.
- *Emoji tilemap*: The grid is a 2D array, each cell visualized as an emoji.

[Live Demo](https://dduyg.github.io/tomagotchi/emoji-party/index.html)

## 🛟 How It Works
- Set your ocean's size using the input boxes labeled with 🌊 to set the number of columns and rows (e.g., 10 x 10).
- Choose how many 🧜‍♀️ "visitors" (sea creatures) and 🐚 "treasures" (objects) to include.
 - Click the generate button to create a new ocean scene.
The emoji grid will update with a unique pattern each time

> ### Controls:
> - 🌊 **Columns × Rows**: Set size of your ocean grid.
> - 🐟 **Creatures**: Choose number of sea creatures will appear.
> - 💎 **Treasures**: Decide how many treasures (special objects) are scattered.

## ⚓️ Technical Details
- Uses [*Tracery*](https://github.com/galaxykate/tracery) for emoji grammar and procedural generation.
- *garden.js*: Main logic for generating and displaying the oceanscape grid.
- *polyfill.js*: (Optional) For compatibility with older browsers.
