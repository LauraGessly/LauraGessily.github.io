var pincel = document.getElementById("canvas").getContext("2d");

var bg = new BG(0, 0, 900, 720, "IMG/bg.png");
var bg2 = new BG(0, -720, 900, 720, "IMG/bg.png");
var abelha = new Abelha(400, 600, 100, 100, "IMG/bee1.png");
var aranhas = [];
var flores = [];
var pontos = 0;
var vidas = 3;
var estadoJogo = "menu"; // menu | jogando | vitoria | derrota

var imgStart = new Image();
imgStart.src = "IMG/start.png";
var imgGameOver = new Image();
imgGameOver.src = "IMG/gameover.png";
var imgWin = new Image();
imgWin.src = "IMG/youwin.png";

document.addEventListener("keydown", (event) => {
  if (estadoJogo === "menu" && event.key === "Enter") {
    iniciarJogo();
    return;
  }

  if ((estadoJogo === "derrota" || estadoJogo === "vitoria") && event.key.toLowerCase() === "l") {
    iniciarJogo();
    return;
  }

  if (estadoJogo === "jogando") {
    if (event.key === "d" || event.key === "D" || event.key === "ArrowRight") {
      abelha.dir = 15;
    }
    if (event.key === "a" || event.key === "A" || event.key === "ArrowLeft") {
      abelha.dir = -15;
    }
  }
});

document.addEventListener("keyup", (event) => {
  if (
    event.key === "d" ||
    event.key === "D" ||
    event.key === "a" ||
    event.key === "A" ||
    event.key === "ArrowLeft" ||
    event.key === "ArrowRight"
  ) {
    abelha.dir = 0;
  }
});

function iniciarJogo() {
  estadoJogo = "jogando";
  pontos = 0;
  vidas = 3;
  abelha.x = 400;
  abelha.y = 600;
  aranhas = [
    new Aranha(Math.random() * 750, -100, 120, 120, "IMG/spider1.png"),
    new Aranha(Math.random() * 750, -400, 120, 120, "IMG/spider1.png"),
  ];
  flores = [
    new Flower(Math.random() * 800, -200, 60, 60, "IMG/flower1.png"),
    new Flower(Math.random() * 800, -600, 60, 60, "IMG/flower1.png"),
  ];
}

function voltarMenuAutomatico() {
  // Após 3 segundos, volta pro menu automaticamente
  setTimeout(() => {
    estadoJogo = "menu";
  }, 3000);
}

function Draw() {
  bg.desenha();
  bg2.desenha();

  if (estadoJogo === "menu") {
    desenharMenu();
    return;
  }

  if (estadoJogo === "jogando") {
    flores.forEach((f) => f.desenha());
    aranhas.forEach((a) => a.desenha());
    abelha.desenha();
    desenharHUD();
  }

  if (estadoJogo === "vitoria") {
    desenharVitoria();
  }

  if (estadoJogo === "derrota") {
    desenharGameOver();
  }
}

function desenharHUD() {
  pincel.font = "24px Arial";
  pincel.fillStyle = "white";
  pincel.fillText("Pontos: " + pontos, 20, 40);
  pincel.fillText("Vidas: " + vidas, 20, 70);
}

function desenharMenu() {
  pincel.drawImage(imgStart, 0, 0, 900, 720);
  pincel.font = "28px Arial";
  pincel.fillStyle = "white";
  pincel.textAlign = "center";
  pincel.fillText(" JOGO DA ABELHA ", 450, 85);
  pincel.fillText("PRESSIONE ENTER PARA COMEÇAR", 450, 585);
  pincel.font = "20px Arial";
  pincel.fillText("Use A / D ou ← / → para mover a abelha", 450, 640);
  pincel.fillText("Colete 5 flores e desvie das aranhas!", 450, 670);
  pincel.textAlign = "left";
}

function desenharGameOver() {
  pincel.drawImage(imgGameOver, 0, 0, 900, 720);
  pincel.font = "32px Arial";
  pincel.fillStyle = "white";
  pincel.textAlign = "center";
  pincel.fillText("VOCÊ PERDEU! ", 450, 90);
  pincel.font = "24px Arial";
  pincel.fillText("Voltando ao menu...", 450, 120);
  pincel.textAlign = "left";
}

function desenharVitoria() {
  pincel.drawImage(imgWin, 0, 0, 900, 720);
  pincel.font = "36px Arial";
  pincel.fillStyle = "white";
  pincel.textAlign = "center";
  pincel.fillText("VOCÊ VENCEU! ", 450, 90);
  pincel.font = "24px Arial";
  pincel.fillText("Pressione L para jogar novamente", 450, 120);
  pincel.textAlign = "left";
}

function Update() {
  if (estadoJogo !== "jogando") return;

  bg.move(12, 720, 0);
  bg2.move(12, 0, -720);

  abelha.animation("bee");
  aranhas.forEach((a) => a.animation("spider"));
  flores.forEach((f) => f.animation("flower"));

  abelha.move();
  aranhas.forEach((a) => a.move(8));
  flores.forEach((f) => f.move(6));

  // Colisão com flores
  flores.forEach((f) => {
    if (abelha.collide(f)) {
      pontos++;
      f.y = -Math.random() * 400 - 50;
      f.x = Math.random() * 800;
      if (pontos >= 10) {
        estadoJogo = "vitoria";
      }
    }
  });

  // Colisão com aranhas
  aranhas.forEach((a) => {
    if (abelha.collide(a)) {
      vidas--;
      a.y = -Math.random() * 400 - 100;
      a.x = Math.random() * 800;
      if (vidas <= 0) {
        estadoJogo = "derrota";
        voltarMenuAutomatico(); // ← volta automático após perder
      }
    }
  });
}

function Main() {
  pincel.clearRect(0, 0, 900, 720);
  Draw();
  Update();
}

setInterval(Main, 30);
