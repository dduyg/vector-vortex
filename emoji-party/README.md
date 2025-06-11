# 🪸 Emoji Reef 🐙
Generates grid-based "oceanscapes". The oceanscape is a 2D array of aquatic emojis, randomly populated according to your settings.
> [Live Demo](https://dduyg.github.io/tomagotchi/emoji-party/index.html)

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
