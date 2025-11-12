function openNav() {
  document.getElementById("mySidebar").style.width = "250px";
  document.getElementById("main").style.marginLeft = "250px";
}

function closeNav() {
  document.getElementById("mySidebar").style.width = "0";
  document.getElementById("main").style.marginLeft = "0";
}

function mudarFonte(fonte) {
  document.getElementById("pagina").style.fontFamily = fonte;
}

// Carrossel de imagens
const imagens = [
  {
    src: "imagem/7.png",
    titulo: "Logo do Jogo Terra de Sol e Sangue",
    data: "Abril de 2025",
    descricao:
      "Projeto 1. O jogo se baseia em uma realidade onde o player principal é um nativo indígena de uma aldeia tupiniquim. Jogo produzido em grupo para a conclusão de curso.",
    largura: "20%",
    altura: "auto",
  },
  {
    src: "imagem/bolin.png",
    titulo: "Logo do jogo Confeitaria Bolinhos",
    data: "Dezembro de 2024",
    descricao:
      "Projeto 2. O jogo se baseia em uma realidade onde o player principal é um confeiteiro, onde lutando contra o tempo ele precisa realizar suas encomendas de acordo com a vontade do cliente. Jogo produzido em grupo para a matéria de Turma especial.",
    largura: "20%",
    altura: "auto",
  },
  {
    src: "imagem/gessily.png",
    titulo: "Logo do Jogo Gessily's Head",
    data: "Setembro de 2024",
    descricao:
      "Projeto 3. O jogo se baseia em um scape room, onde o player principal se prende em uma sala onde seus maiores medos o atingem, e ele precisa encontrar formas de escapar das salas.",
    largura: "20%",
    altura: "auto",
  },
  {
    src: "imagem/Robert Dream.png",
    titulo: "Logo do Jogo Robert Dream",
    data: "Janeiro de 2025",
    descricao:
      "Projeto 4. O jogo se baseia em uma realidade onde Robert a raposa está prestes a entrar no inverno, e para hibernar como sempre sonhou, ele tem algumas tarefas. Jogo Produzido em grupo para a matéria de Jogos Digitais 3D.",
    largura: "20%",
    altura: "auto",
  },
  {
    src: "imagem/HoneyBee.png",
    titulo: "Logo do Jogo Honey Bee",
    data: "Outubro de 2025",
    descricao:
      "Projeto bônus — O jogador controla uma abelha e deve polinizar flores enquanto evita obstáculos.",
    largura: "20%",
    altura: "auto",
  },
];

let indiceAtual = 0;
const imagensPorTela = 3;

function exibirImagens() {
  const container = document.getElementById("carrossel-imagens");
  container.innerHTML = "";

  for (let i = 0; i < imagensPorTela; i++) {
    const index = (indiceAtual + i) % imagens.length;
    const imagemInfo = imagens[index];
    const img = document.createElement("img");

    img.src = imagemInfo.src;
    img.alt = imagemInfo.titulo;
    img.title = imagemInfo.descricao;
    img.style.cursor = "pointer";

    // Clique na imagem
    img.onclick = function () {
      if (imagemInfo.src.includes("HoneyBee.png")) {
        // Cria o popup
        const popup = document.createElement("div");
        popup.classList.add("popup");
        popup.innerHTML = `
          <div class="popup-conteudo">
            <span class="fechar" onclick="this.parentElement.parentElement.remove()">&times;</span>
            <h2>${imagemInfo.titulo}</h2>
            <p>${imagemInfo.descricao}</p>
            <button id="btnJogar">Jogar</button>
          </div>
        `;
        document.body.appendChild(popup);
        popup.style.display = "block";

        // Redireciona para o jogo
        document.getElementById("btnJogar").addEventListener("click", () => {
          popup.remove();
          window.location.href = "abelhuda.html"; // 🔹 AQUI ESTÁ O CAMINHO CORRETO
        });
      } else {
        // Caso contrário, mostra o popup informativo
        const popup = window.open(
          "",
          `popup${index}`,
          "width=850,height=700,resizable=yes,scrollbars=yes"
        );
        if (popup) {
          popup.document.write(`
            <html>
              <head>
                <title>${imagemInfo.titulo}</title>
                <style>
                  body {
                    font-family: Arial, sans-serif;
                    padding: 20px;
                  }
                  img {
                    width: ${imagemInfo.largura};
                    height: ${imagemInfo.altura};
                    border-radius: 8px;
                    display: block;
                    margin-bottom: 15px;
                  }
                  h1 {
                    margin-top: 0;
                  }
                  .info {
                    margin-bottom: 10px;
                  }
                </style>
              </head>
              <body>
                <h1>${imagemInfo.titulo}</h1>
                <div class="info"><strong>Data de criação:</strong> ${imagemInfo.data}</div>
                <img src="${imagemInfo.src}" alt="${imagemInfo.titulo}">
                <p><strong>Descrição:</strong> ${imagemInfo.descricao}</p>
              </body>
            </html>
          `);
          popup.document.close();
          popup.focus();
        } else {
          alert("Por favor, permita pop-ups para visualizar as informações.");
        }
      }
    };

    container.appendChild(img);
  }
}

function mudarImagens(direcao) {
  indiceAtual = (indiceAtual + direcao * imagensPorTela + imagens.length) % imagens.length;
  exibirImagens();
}

document.addEventListener("DOMContentLoaded", exibirImagens);

