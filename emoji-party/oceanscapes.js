let NUM_ROWS = 10;
let NUM_COLS = 10;
let NUM_VISITORS = 10;
let NUM_TREASURES = 5;

loadWorld();

document.addEventListener('input', function(e) {
  updateWorld();
  doAnOcean();
});

function loadWorld() {
  const json = localStorage.getItem('__emoji_ocean__') || '{}';
  let state = JSON.parse(json);
  if (json == '{}') {
    // Save the defaults.
    const state = {rows:NUM_ROWS, cols:NUM_COLS, visitors:NUM_VISITORS, treasures:NUM_TREASURES};
    localStorage.setItem('__emoji_ocean__', JSON.stringify(state));
  } else {
    document.getElementById('rows').value = NUM_ROWS = state.rows;
    document.getElementById('cols').value = NUM_COLS = state.cols;
    document.getElementById('visitors').value = NUM_VISITORS = state.visitors;
    document.getElementById('treasures').value = NUM_TREASURES = state.treasures;
  }
}

function updateWorld() {
  NUM_ROWS = document.getElementById('rows').value;
  NUM_COLS = document.getElementById('cols').value;
  NUM_VISITORS = document.getElementById('visitors').value;
  NUM_TREASURES = document.getElementById('treasures').value;

  const state = {rows:NUM_ROWS, cols:NUM_COLS, visitors:NUM_VISITORS, treasures:NUM_TREASURES};
  localStorage.setItem('__emoji_ocean__', JSON.stringify(state));
}

function doAnOcean() {
  const world = {
      'v1': ['🐙', '🐠', '🧜🏽‍♀️', '🐬', '🐳', '🧜‍♀️', '🧜‍♂️', '🦑', '🦈', '🧜', '🐋'],
      'v2': ['🛟','🏝️','⚓️', '⚓️', '⚓️', '⚓️', '🛶', '🦀', '🛳', '🐡', '🛟', '💎'],
      'm1': ['🌊', '🌊', '▫️', '▫️'],
      'm2': ['🪸', '🪸', '▫️', '▫️'],
      'm3': ['🪼', '🪼', '▫️', '▫️'],
      'm4': ['🐚', '🐚', '▫️', '▫️'],
      'm5': ['⛵️', '⛵️', '▫️', '▫️'],
      'm6': ['🪨', '🪨', '▫️', '▫️'],
      'm7': ['🫧', '🫧', '▫️', '▫️'],
    }
  const grammar = window.tracery.createGrammar(world);

  // The initial pattern. 
  // m : main ocean tile
  // a : animal visitor
  // l : treasure
  const pattern = fillArray('m'.repeat(NUM_COLS), NUM_ROWS);

  // Add random animal visitors.
  for (let i = 0; i <= NUM_VISITORS; i++) {
    const row = getRandomInt(NUM_ROWS) - 1;
    const col = getRandomInt(NUM_COLS) - 1;
    pattern[row] = setCharAt(pattern[row], col, 'a');
  }

  // Add random treasures.
  for (let i = 0; i <= NUM_TREASURES; i++) {
    const row = getRandomInt(NUM_ROWS) - 1;
    const col = getRandomInt(NUM_COLS) - 1;
    pattern[row] = setCharAt(pattern[row], col, 'l');
  }

  const main = `#m${getRandomInt(7)}#`;
  for (let i = 0; i < pattern.length; i++) {
    pattern[i] = pattern[i].replace(/m/g, main);
    pattern[i] = pattern[i].replace(/a/g, '#v1#');
    pattern[i] = pattern[i].replace(/l/g, '#v2#');
  }

  const box = pattern.join('\n');
  const story = grammar.flatten(box);

  let output = document.getElementById('output');
  output.innerText = story;
}

function getRandomInt(max) {
  return Math.floor(Math.random() * Math.floor(max)) + 1;
}

function setCharAt(str, index, chr) {
    if(index > str.length-1) return str;
    return str.substr(0,index) + chr + str.substr(index+1);
}

function fillArray(value, len) {
  var arr = [];
  for (var i = 0; i < len; i++) {
    arr.push(value);
  }
  return arr;
}
