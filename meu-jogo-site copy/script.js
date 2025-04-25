const config = {
    scenes: {
      intro: {
        background: 'darkroom.png',
        // área do portal na intro: se o player entrar nela, vai para o lobby
        portalArea: { x: 280, y: 180, w: 80, h: 80 },
        next: 'lobby'
      },
      lobby: {
        background: 'lobby.png',
        // cada porta tem uma área clicável ou de colisão e o nome da cena-alvo
        doors: [
          { icon: '💻', area: { x: 100, y: 240, w: 64, h: 96 }, target: 'codeLab' },
          { icon: '🎮', area: { x: 240, y: 240, w: 64, h: 96 }, target: 'gameRoom' },
          { icon: '📚', area: { x: 380, y: 240, w: 64, h: 96 }, target: 'library' },
          { icon: '🌱', area: { x: 120, y: 120, w: 64, h: 96 }, target: 'garden' },
          { icon: '🏰', area: { x: 320, y: 120, w: 64, h: 96 }, target: 'tower' },
          { icon: '🪞', area: { x: 200, y: 60,  w: 64, h: 96 }, target: 'mirror' },
        ]
      },
      codeLab:    { background: 'codelab.png',   exitArea: { x: 10, y: 150, w: 64, h: 96 }, next: 'lobby' },
      gameRoom:   { background: 'gameroom.png',  exitArea: { x: 10, y: 150, w: 64, h: 96 }, next: 'lobby' },
      library:    { background: 'library.png',   exitArea: { x: 10, y: 150, w: 64, h: 96 }, next: 'lobby' },
      garden:     { background: 'garden.png',    exitArea: { x: 10, y: 150, w: 64, h: 96 }, next: 'lobby' },
      tower:      { background: 'tower.png',     exitArea: { x: 10, y: 150, w: 64, h: 96 }, next: 'lobby' },
      mirror:     { background: 'mirror.png',    exitArea: { x: 10, y: 150, w: 64, h: 96 }, next: 'lobby' },
    }

    
  };
  
  let currentScene = 'intro';
let player = { x: 300, y: 180, w: 32, h: 32 };

// carrega e desenha a cena atual
function loadScene(name) {
  currentScene = name;
  const scene = config.scenes[name];
  // atualiza background
  document.getElementById('game').style.backgroundImage = `url('${scene.background}')`;
  // reposiciona player: introdução no centro, salas à beira da porta de saída
  if (name === 'intro') player = { x: 300, y: 180, w:32, h:32 };
  else player = { x: scene.exitArea.x + scene.exitArea.w + 10, y: scene.exitArea.y, w:32, h:32 };
  renderPlayer();
}

// desenha o player na tela
function renderPlayer() {
  const p = document.getElementById('player');
  p.style.left = player.x + 'px';
  p.style.top  = player.y + 'px';
}

// checa colisão com portal ou portas
function checkTransition() {
  const scene = config.scenes[currentScene];
  // intro → lobby
  if (scene.portalArea && rectOverlap(player, scene.portalArea)) {
    loadScene(scene.next);
  }
  // lobby → salas
  if (scene.doors) {
    for (let door of scene.doors) {
      if (rectOverlap(player, door.area)) {
        loadScene(door.target);
        break;
      }
    }
  }
  // sala → lobby
  if (scene.exitArea && rectOverlap(player, scene.exitArea)) {
    loadScene(scene.next);
  }
}

// utilitário de colisão AABB
function rectOverlap(a, b) {
  return !(a.x + a.w < b.x || a.x > b.x + b.w ||
           a.y + a.h < b.y || a.y > b.y + b.h);
}

// movimento e loop principal
document.addEventListener('keydown', e => {
  const step = 10;
  if (e.key === 'ArrowUp')    player.y -= step;
  if (e.key === 'ArrowDown')  player.y += step;
  if (e.key === 'ArrowLeft')  player.x -= step;
  if (e.key === 'ArrowRight') player.x += step;
  renderPlayer();
  checkTransition();
});

// inicializa
loadScene('intro');
