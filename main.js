// Gerar 60 números na área de sorteio
for(let i=1; i<=60; i++) {
  const numeroSorteio = document.createElement('div');
  numeroSorteio.classList.add('numero-sorteio');
  numeroSorteio.textContent = String(i).padStart(2, '0');
  numeroSorteio.setAttribute('data-value', String(i).padStart(2, '0'));
  numeroSorteio.addEventListener('click', sortearNumero, false);
  document.getElementById('areaSorteio').appendChild(numeroSorteio);
}

// Sortear número
function sortearNumero() {
  this.classList.toggle('sorteado');
  document.querySelectorAll('.numero-bilhete[data-value="' + this.textContent + '"]').forEach((numeroBilhete) => {
    numeroBilhete.classList.toggle('sorteado')
    contarAcertos(numeroBilhete.parentElement.parentElement);
  });
}

// Gerar 60 números no modal
for(let i=1; i<=60; i++) {
  const numeroModal = document.createElement('div');
  numeroModal.classList.add('numero-modal');
  numeroModal.textContent = String(i).padStart(2, '0');
  numeroModal.addEventListener('click', escolherNumero, false);
  document.getElementById('areaNumerosModal').appendChild(numeroModal);
}

// Escolher número
function escolherNumero() {
  this.classList.toggle('escolhido');
}

// Mostrar modal
document.getElementById('botaoAdicionarBilhete').addEventListener('click', mostrarModal, false);

function mostrarModal() {
  document.getElementById('areaModal').classList.add('mostrar');
}

// Esconder modal
document.getElementById('botaoCancelar').addEventListener('click', esconderModal, false);

function esconderModal() {
  document.querySelectorAll('.numero-modal').forEach((numeroModal) => numeroModal.classList.remove('escolhido'));
  document.getElementById('areaModal').classList.remove('mostrar');
}

// Salvar bilhete
document.getElementById('botaoSalvarBilhete').addEventListener('click', salvarBilhete, false);

function salvarBilhete() {
  // Criar bilhete
  const areaBilhetes = document.getElementById('areaBilhetes');
  const bilhete = document.createElement('div');
  bilhete.classList.add('bilhete');
  areaBilhetes.insertBefore(bilhete, areaBilhetes.lastElementChild);

  // Adicionar números do bilhete
  const areaNumerosBilhete = document.createElement('div');
  areaNumerosBilhete.classList.add('area-numeros-bilhete');
  bilhete.appendChild(areaNumerosBilhete);

  document.querySelectorAll('.numero-modal.escolhido').forEach((numeroModal) => {
    const numeroBilhete = document.createElement('div');
    numeroBilhete.classList.add('numero-bilhete');
    numeroBilhete.textContent = numeroModal.textContent;
    numeroBilhete.setAttribute('data-value', numeroModal.textContent);
    if (document.querySelector('.numero-sorteio[data-value="' + numeroBilhete.textContent + '"]').classList.contains('sorteado')) {
      numeroBilhete.classList.add('sorteado');
    }
    areaNumerosBilhete.appendChild(numeroBilhete);
  });

  // Criar oontador de acertos
  const contadorAcertos = document.createElement('div');
  contadorAcertos.classList.add('contador-acertos');
  bilhete.appendChild(contadorAcertos);

  contarAcertos(bilhete);

  // Adicionar botão que remove o bilhete
  const botaoRemoverBilhete = document.createElement('button');
  botaoRemoverBilhete.classList.add('botao-remover-bilhete');
  botaoRemoverBilhete.textContent = 'ˣ';
  botaoRemoverBilhete.addEventListener('click', removerBilhete, false);
  bilhete.appendChild(botaoRemoverBilhete);

  // Após criar o bilhete, esconder o modal
  esconderModal();
}

// Contar acertos
function contarAcertos(bilhete) {
  const acertos = bilhete.querySelectorAll('.numero-bilhete.sorteado').length;
  bilhete.querySelector('.contador-acertos').textContent = acertos === 1 ? "(1 Acerto)" : `(${acertos} Acertos)`;
}

// Remover bilhete
function removerBilhete() {
  const bilhete = this.parentElement;
  bilhete.parentElement.removeChild(bilhete);
}