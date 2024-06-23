//let titulo = document.querySelector('h1');
//titulo.innerHTML = 'Jogo do número secreto'
//let paragrafo  = document.querySelector('p');
//paragrafo.innerHTML = "Escolha um número entre 1 e 10";
let listaDeNumerosSorteados=[];
let numeroLimite = 10;
let numeroSecreto = gerarNumeroAletorio();
let tentativas = 1;
mensagemInicial();


function exibirTextoNaTela(tag, texto){
    let campo = document.querySelector(tag);
    campo.innerHTML = texto;
    responsiveVoice.speak(texto,'Brazilian Portuguese Female',{rate:1.2});
}
function mensagemInicial(){
  exibirTextoNaTela('h1','Jogo do número secreto');
  exibirTextoNaTela('p', `Escolha um número entre 1 e ${numeroLimite}`);
}
function verificarChute(){
    let chute = document.querySelector('input').value;
    if(chute == numeroSecreto){
      exibirTextoNaTela('h1', 'ACERTOU!');
      let palavraTentativas = tentativas > 1 ? 'tentativas' : 'tentatativa';
      let mensagemTentativas = `Você acertou o numero secreto com ${tentativas} ${palavraTentativas}`;
      exibirTextoNaTela('p',  mensagemTentativas);
      document.getElementById('reiniciar').removeAttribute('disabled');
    }else{
      if(chute < numeroSecreto){
        exibirTextoNaTela('p', 'O numero secreto é maior');
      }
      if(chute > numeroSecreto){
        exibirTextoNaTela('p', 'O numero secreto é menor');
      }
      tentativas++;
      limparCampo();
    }

}
function gerarNumeroAletorio(){
   let numeroEscolhido = parseInt(Math.random()*numeroLimite + 1);
   let quantidadeDeElementosNaLista = listaDeNumerosSorteados.length;

    if(quantidadeDeElementosNaLista == numeroLimite){
      listaDeNumerosSorteados = [];
    }

    if(listaDeNumerosSorteados.includes(numeroEscolhido)){
      return gerarNumeroAletorio();
    }else{
      listaDeNumerosSorteados.push(numeroEscolhido);
      console.log(listaDeNumerosSorteados);
      return numeroEscolhido;
    }
}
function limparCampo(){
  chute =  document.querySelector('input');
  chute.value = '';
}
function reiniciarJogo(){
    numeroSecreto = gerarNumeroAletorio();
    limparCampo();
    tentativas = 1;
    mensagemInicial();
    document.getElementById('reiniciar').setAttribute('disabled', true);
}