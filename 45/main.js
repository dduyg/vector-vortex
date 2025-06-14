// ------ Konva.js canvas setup ---------
const width = Math.min(window.innerWidth - 40, 700);
const height = Math.min(window.innerHeight - 160, 500);

const stage = new Konva.Stage({
  container: 'sketchpad',
  width,
  height,
});
const layer = new Konva.Layer();
stage.add(layer);

let currentLine = null;
let userLines = [];
let modelLines = [];
let currentColor = "#000";
const COLORS = [
  "#000", "#f44336", "#E91E63", "#9C27B0", "#673AB7", "#3F51B5", "#2196F3",
  "#00BCD4", "#009688", "#4CAF50", "#8BC34A", "#CDDC39", "#FFEB3B", "#FFC107",
  "#FF9800", "#FF5722", "#795548", "#9E9E9E"
];

function setupColors() {
  const picker = document.getElementById('color-picker');
  picker.innerHTML = '';
  COLORS.forEach((c, idx) => {
    const btn = document.createElement('span');
    btn.className = 'color-btn' + (idx === 0 ? ' active' : '');
    btn.style.background = c;
    btn.onclick = () => {
      currentColor = c;
      document.querySelectorAll('.color-btn').forEach(el => el.classList.remove('active'));
      btn.classList.add('active');
    };
    picker.appendChild(btn);
  });
}
setupColors();

// --------- SketchRNN Model Setup -----------
const MODELS = [
  'bird', 'cat', 'face', 'flower', 'owl', 'rabbit', 'star', 'tree', 'alarm_clock', 'ambulance', 'angel',
  'ant', 'antyoga', 'backpack', 'barn', 'basket', 'bear', 'bee', 'beeflower', 'bicycle', 'book', 'brain',
  'bridge', 'bulldozer', 'bus', 'butterfly', 'cactus', 'calendar', 'castle', 'catbus', 'catpig', 'chair',
  'couch', 'crab', 'crabchair', 'crabrabbitfacepig', 'dog', 'dogbunny', 'dolphin', 'duck', 'elephant',
  'elephantpig', 'fan', 'firetruck', 'flamingo', 'floweryoga', 'frog', 'frogsofa', 'garden', 'hedgehog',
  'horse', 'horsecat', 'horsedog', 'hotairballoon', 'jackolantern', 'lion', 'lionsheep', 'lollipop',
  'mermaid', 'monapassport', 'monster', 'mosquito', 'octopus', 'paintbrush', 'paintbrushbench', 'palm_tree',
  'parrot', 'passport', 'pig', 'pigsheep', 'pineapple', 'pool', 'postcard', 'rabbitpig', 'radio', 'radioface',
  'rain', 'rhinoceros', 'rifle', 'rollercoaster', 'sandwich', 'scorpion', 'sea_turtle', 'sheep', 'skull',
  'snail', 'snowflake', 'speedboat', 'spider', 'squirrel', 'steak', 'stove', 'strawberry', 'swan', 'swing',
  'table', 'the_mona_lisa', 'tiger', 'toothbrush', 'toothbrushbench', 'tractor', 'trombone', 'truck', 'whale',
  'windmill', 'yoga'
];
const modelSelect = document.getElementById('model-select');
MODELS.forEach((m, i) => {
  const opt = document.createElement('option');
  opt.value = m;
  opt.textContent = m;
  modelSelect.appendChild(opt);
});
let sketchRNNModel = null;
let modelLoaded = false;
let lastStrokePoints = []; // For feeding to SketchRNN

function loadModel(selectedModel) {
  modelLoaded = false;
  sketchRNNModel = new ms.SketchRNN(`https://storage.googleapis.com/quickdraw-models/sketchRNN/models/${selectedModel}.gen.json`);
  sketchRNNModel.initialize().then(() => {
    modelLoaded = true;
    sketchRNNModel.setPixelFactor(5.0);
    console.log('SketchRNN model loaded:', selectedModel);
  });
}
loadModel(modelSelect.value);
modelSelect.onchange = () => loadModel(modelSelect.value);

// ----------- Konva Drawing logic -----------
stage.on('mousedown touchstart', function (e) {
  const pos = stage.getPointerPosition();
  currentLine = new Konva.Line({
    stroke: currentColor,
    strokeWidth: 3,
    points: [pos.x, pos.y],
    lineCap: 'round',
    lineJoin: 'round',
    globalCompositeOperation: 'source-over'
  });
  layer.add(currentLine);
  userLines.push(currentLine);
  lastStrokePoints = [[pos.x, pos.y]];
  layer.draw();
});
stage.on('mousemove touchmove', function (e) {
  if (!currentLine) return;
  const pos = stage.getPointerPosition();
  const newPoints = currentLine.points().concat([pos.x, pos.y]);
  currentLine.points(newPoints);
  lastStrokePoints.push([pos.x, pos.y]);
  layer.batchDraw();
});
stage.on('mouseup touchend', function (e) {
  currentLine = null;
  layer.batchDraw();
});

// ----------- Toolbar Buttons -----------
document.getElementById('clear-btn').onclick = () => {
  userLines.forEach(l => l.destroy());
  modelLines.forEach(l => l.destroy());
  userLines = [];
  modelLines = [];
  layer.draw();
};
document.getElementById('save-btn').onclick = () => {
  const uri = stage.toDataURL({ pixelRatio: 2 });
  const link = document.createElement('a');
  link.download = 'magic-sketchpad.png';
  link.href = uri;
  link.click();
};

document.getElementById('magic-btn').onclick = async () => {
  if (!modelLoaded || lastStrokePoints.length < 2) return;
  // Convert lastStrokePoints to SketchRNN's stroke format
  const simplified = sketchRNNModel.simplifyLine(lastStrokePoints);
  if (simplified.length < 2) return;
  const stroke = sketchRNNModel.lineToStroke(simplified, simplified[0]);
  let state = sketchRNNModel.zeroState();
  state = sketchRNNModel.update(sketchRNNModel.zeroInput(), state);
  state = sketchRNNModel.updateStrokes(stroke, state, stroke.length - 1);

  // Start from last point
  let [x, y] = simplified[simplified.length - 1];
  let pen = [stroke[stroke.length - 1][2], stroke[stroke.length - 1][3], stroke[stroke.length - 1][4]];
  let prevPen = pen;
  let dx = 0, dy = 0;

  // Remove previous model lines
  modelLines.forEach(l => l.destroy());
  modelLines = [];

  // Draw what the model predicts
  for (let i = 0; i < 70; i++) { // up to 70 steps
    state = sketchRNNModel.update([dx, dy, ...pen], state);
    const pdf = sketchRNNModel.getPDF(state, 0.1);
    [dx, dy, ...pen] = sketchRNNModel.sample(pdf);
    if (pen[2] === 1) break; // pen_end
    if (prevPen[0] === 1) { // pen_down
      // draw
      const modelLine = new Konva.Line({
        stroke: "#008ee3",
        strokeWidth: 2,
        points: [x, y, x + dx, y + dy],
        lineCap: 'round',
        lineJoin: 'round',
        dash: [8, 6],
        globalCompositeOperation: 'source-over'
      });
      layer.add(modelLine);
      modelLines.push(modelLine);
      x += dx;
      y += dy;
    } else {
      x += dx;
      y += dy;
    }
    prevPen = pen;
  }
  layer.draw();
};
