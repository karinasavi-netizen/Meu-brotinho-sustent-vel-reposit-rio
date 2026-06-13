// ========================================== //
// VARIÁVEIS DO JOGO (STATUS DO BROTINHO)     //
// ========================================== //
let nutricao = 60;
let hidratacao = 60;
let saudeSolo = 60;
let felicidade = 60;
let xp = 0;
let nivel = 1;

// Configurações de Animação e Expressão
let expressao = "😐";
let corBrotinho;
let statusMensagem = "Bem-vindo ao Agrinho! Ajude o seu brotinho a virar uma linda Laranjeira!";
let jogoFinalizado = false;

function setup() {
  createCanvas(600, 500);
  corBrotinho = color(46, 213, 115); // Verde inicial do brotinho
}

function draw() {
  // Se o jogo foi finalizado, mostra a tela de vitória e para a execução normal
  if (jogoFinalizado) {
    desenharTelaFinal();
    return;
  }

  // 1. Fundo do Cenário (Muda de cor conforme o humor do Brotinho)
  let corCeuFeliz = color(30, 48, 42);
  let corCeuTriste = color(40, 40, 40);
  background(lerpColor(corCeuTriste, corCeuFeliz, felicidade / 100));

  // 2. Desgaste natural com o passar do tempo
  if (frameCount % 60 === 0) {
    nutricao = max(0, nutricao - 1.0);
    hidratacao = max(0, hidratacao - 1.5);
    saudeSolo = max(0, saudeSolo - 0.5);
  }

  // 3. Cálculos de Inteligência do Jogo (Humor e Evolução)
  felicidade = (nutricao + hidratacao + saudeSolo) / 3;
  atualizarHumorEEvolucao();

  // 4. Desenhar os Elementos Visuais
  desenharChao();
  desenharPersonagem(170, 280); // Posicionado estrategicamente no cenário
  desenharPainelStatus();
  desenharBotoesInterface();
  desenharBalaoTexto();
}

// ========================================== //
// DESENHO DOS COMPONENTES VISUAIS            //
// ========================================== //
function desenharChao() {
  noStroke();
  let soloSeco = color(120, 90, 70);
  let soloFertil = color(39, 174, 96);
  fill(lerpColor(soloSeco, soloFertil, saudeSolo / 100));
  rect(0, 340, width, 160);
}

function desenharPersonagem(x, y) {
  push();
  translate(x, y);

  // Animação suave de respiração (pulsação)
  let pulso = sin(frameCount * 0.08) * 3;
  let tamanhoBase = 90 + (nivel * 10);

  // ========================================== //
  //            TRANSFORMAÇÃO EM ÁRVORE         //
  // ========================================== //
  noStroke();

  if (nivel === 1) {
    // FASE 1: Formato original de Sementinha/Bichinho Verde
    fill(corBrotinho);
    ellipse(0, 0, tamanhoBase + pulso, tamanhoBase - pulso);
    
    // Folha única na cabeça
    fill(34, 139, 34);
    ellipse(0, -tamanhoBase / 2, 16, 26);
  } 
  else if (nivel === 2) {
    // FASE 2: Começa a criar tronco na base e copa de folhas no topo
    // Tronco marrom surgindo embaixo
    fill(101, 67, 33);
    rect(-20, 10, 40, 60, 5);
    
    // Corpo virando arbusto central
    fill(corBrotinho);
    ellipse(0, -10, tamanhoBase + pulso, tamanhoBase - pulso);
    
    // Copa de folhas ao redor
    fill(34, 139, 34);
    ellipse(-25, -tamanhoBase / 2, 35, 45);
    ellipse(25, -tamanhoBase / 2, 35, 45);
    ellipse(0, -tamanhoBase / 2 - 10, 40, 50);
    
    // Flores de laranjeira
    fill(255);
    ellipse(-15, -tamanhoBase / 2, 8, 8);
    ellipse(15, -tamanhoBase / 2, 8, 8);
    fill(255, 200, 0);
    ellipse(-15, -tamanhoBase / 2, 3, 3);
    ellipse(15, -tamanhoBase / 2, 3, 3);
  } 
  else if (nivel >= 3) {
    // FASE 3: Uma grande Árvore Laranjeira adulta e majestosa!
    // Tronco robusto de árvore sustentável
    fill(80, 50, 25);
    rect(-25, 0, 50, 90, 8);
    
    // Copa gigante de folhas verdes
    fill(34, 110, 34);
    ellipse(-40, -40, 75, 85);
    ellipse(40, -40, 75, 85);
    fill(40, 130, 40); // Camada dupla para profundidade visual
    ellipse(0, -65, 110, 115);
    ellipse(-20, -75, 80, 80);
    ellipse(25, -75, 80, 80);
    
    // Laranjas grandes e maduras brotando na copa! 
    fill(255, 127, 14);
    ellipse(-45, -50, 18, 18);
    ellipse(45, -50, 18, 18);
    ellipse(0, -95, 20, 20);
    ellipse(-15, -30, 16, 16);
    ellipse(20, -30, 16, 16);
    ellipse(-10, -75, 18, 18);
    ellipse(25, -75, 18, 18);
  }

  // Olhos do Personagem (Adaptam-se à altura conforme ele vira árvore)
  let deslocamentoY = (nivel === 3) ? -40 : (nivel === 2) ? -15 : -10;
  fill(255);
  ellipse(-20, deslocamentoY, 22, 22);
  ellipse(20, deslocamentoY, 22, 22);

  // Pupilas inteligentes acompanhando o mouse
  fill(15);
  let olharX = map(mouseX, 0, width, -2, 2);
  ellipse(-20 + olharX, deslocamentoY, 10, 10);
  ellipse(20 + olharX, deslocamentoY, 10, 10);

  // Expressão da Boca acompanhando o deslocamento do rosto
  stroke(20);
  strokeWeight(3.5);
  noFill();
  if (expressao === "😊") arc(0, deslocamentoY + 25, 24, 14, 0, PI);
  else if (expressao === "😐") line(-10, deslocamentoY + 28, 10, deslocamentoY + 28);
  else if (expressao === "😢") arc(0, deslocamentoY + 35, 24, 14, PI, 0);
  pop();
}

function desenharPainelStatus() {
  noStroke();
  fill(20, 30, 25, 180);
  rect(15, 15, 570, 80, 12);

  fill(46, 213, 115);
  textAlign(LEFT, TOP);
  textSize(16);
  textStyle(BOLD);
  
  if (nivel === 1) text("🌱 MEU BROTINHO DE LARANJA", 35, 28);
  else if (nivel === 2) text("🌳 CRESCENDO... QUASE UMA ÁRVORE!", 35, 28);
  else text("🍊 LARANJEIRA ADULTA E PRONTA!", 35, 28);

  fill(220);
  textSize(11);
  textStyle(NORMAL);
  text("Fase de Crescimento: " + nivel + " | XP: " + int(xp) + "/100", 35, 54);

  desenharBarra(360, 30, nutricao, "🍎 Nutrição", color(255, 159, 67));
  desenharBarra(360, 52, hidratacao, "💧 Água", color(0, 210, 211));
  desenharBarra(360, 74, saudeSolo, "🌿 Solo", color(16, 172, 132));
}

function desenharBarra(x, y, valor, nome, cor) {
  noStroke();
  fill(200);
  textSize(10);
  textAlign(LEFT, CENTER);
  text(nome, x, y);
  fill(40, 50, 45);
  rect(x + 65, y - 5, 130, 10, 5);
  fill(cor);
  rect(x + 65, y - 5, map(valor, 0, 100, 0, 130), 10, 5);
}

function desenharBotoesInterface() {
  textAlign(CENTER, CENTER);
  textSize(11);
  textStyle(BOLD);

  if (xp < 100) {
    // Botões Padrões de Ações Sustentáveis
    fill(255, 159, 67);
    rect(350, 120, 220, 40, 8);
    fill(255);
    text("🍎 ADUBO ORGÂNICO", 460, 140);

    fill(0, 210, 211);
    rect(350, 180, 220, 40, 8);
    fill(255);
    text("💧 GOTEJAMENTO INTELIGENTE", 460, 200);

    fill(16, 172, 132);
    rect(350, 240, 220, 40, 8);
    fill(255);
    text("🌿 COBERTURA DE PALHA", 460, 260);
  } else {
    // BOTÃO FINAL DE VITÓRIA APARECE DEPOIS DO NÍVEL MÁXIMO
    fill(255, 100, 0);
    rect(350, 150, 220, 60, 12);
    fill(255);
    textSize(12);
    text("🍊 COLHER AS LARANJAS", 460, 180);
  }
}

function desenharBalaoTexto() {
  fill(20, 30, 25, 200);
  stroke(46, 213, 115, 90);
  rect(20, 435, 560, 45, 8);
  noStroke();
  fill(240);
  textSize(12);
  textAlign(CENTER, CENTER);
  textStyle(NORMAL);
  text(statusMensagem, width / 2, 457.5);
}

function atualizarHumorEEvolucao() {
  if (xp >= 100) nivel = 3;
  else if (xp >= 40) nivel = 2;
  else nivel = 1;

  if (felicidade > 65) {
    expressao = "😊";
    corBrotinho = color(46, 213, 115);
  } else if (felicidade > 35) {
    expressao = "😐";
    corBrotinho = color(241, 196, 15);
  } else {
    expressao = "😢";
    corBrotinho = color(192, 57, 43);
  }
}

// ========================================== //
//             TELA DE FINAL DO JOGO          //
// ========================================== //
function desenharTelaFinal() {
  background(20, 40, 30);
  
  // Confetes Simples (Partículas Estáticas Cor de Laranja e Verde)
  for (let i = 0; i < 40; i++) {
    fill(i % 2 === 0 ? color(255, 150, 0) : color(46, 213, 115));
    ellipse(noise(i) * width, noise(i + 10) * height, 8, 8);
  }
  
  textAlign(CENTER, CENTER);
  
  // Título de Vitória
  fill(255, 165, 0);
  textSize(32);
  textStyle(BOLD);
  text("🍊 MISSÃO COMPLETA! 🍊", width / 2, 160);
  
  // Texto educativo final
  fill(240);
  textSize(15);
  textStyle(NORMAL);
  text("Parabéns! Sua laranjeira cresceu forte, saudável e cheia de frutos.", width / 2, 230);
  text("Suas escolhas e manejo agrícola sustentável protegeram o solo", width / 2, 260);
  text("e economizaram água através de tecnologia limpa.", width / 2, 290);
  
  fill(46, 213, 115);
  textSize(18);
  textStyle(BOLD);
  text("Você é um herói do meio ambiente no Agrinho! 🌟", width / 2, 350);
}

function mousePressed() {
  // Lógica se o botão final for clicado
  if (xp >= 100) {
    if (mouseX > 350 && mouseX < 570 && mouseY > 150 && mouseY < 210) {
      jogoFinalizado = true;
    }
    return;
  }

  // Cliques normais nas ações durante o jogo
  if (mouseX > 350 && mouseX < 570 && mouseY > 120 && mouseY < 160) {
    nutricao = min(100, nutricao + 20);
    saudeSolo = min(100, saudeSolo + 5);
    xp += 10;
    statusMensagem = "Você usou Adubo Orgânico! Fortalece e acelera a criação do tronco.";
  }

  if (mouseX > 350 && mouseX < 570 && mouseY > 180 && mouseY < 220) {
    hidratacao = min(100, hidratacao + 25);
    xp += 10;
    statusMensagem = "Irrigação por Gotejamento! Fornece força para o topo da copa crescer.";
  }

  if (mouseX > 350 && mouseX < 570 && mouseY > 240 && mouseY < 280) {
    saudeSolo = min(100, saudeSolo + 25);
    nutricao = min(100, nutricao + 2);
    xp += 10;
    statusMensagem = "Cobertura de palha aplicada! Deixando as raízes prontas para gerar frutos.";
  }
}
