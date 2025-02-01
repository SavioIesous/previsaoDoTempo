const key = "7833e82ab12562770d038908ecdcd4fc";

async function buscarCidade(cidade) {
  try {
    const resposta = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${cidade}&appid=${key}&lang=pt_br&units=metric`);

    // Verifica se a resposta da API é válida
    if (!resposta.ok) {
      throw new Error('Cidade não encontrada');
    }

    const dados = await resposta.json();

    // Verifica se os dados essenciais estão presentes
    if (!dados.main || !dados.weather) {
      throw new Error('Dados incompletos retornados pela API');
    }

    colocarDadosNaTela(dados);

  } catch (erro) {
    console.error('Erro ao buscar a cidade:', erro);
    alert('Erro ao buscar a cidade. Verifique o nome da cidade e tente novamente.');
  }
}

function cliqueiNoBotao() {
  const cidade = document.querySelector(".input-cidade").value;

  // Verifica se a entrada não está vazia
  if (cidade.trim() === "") {
    alert('Por favor, insira o nome de uma cidade.');
    return;
  }

  buscarCidade(cidade);
}

function colocarDadosNaTela(dados) {
  document.querySelector(".cidade").innerHTML = "Tempo em " + dados.name;
  document.querySelector(".temp").innerHTML = Math.floor(dados.main.temp) + " °C";
  document.querySelector(".texto-previsao").innerHTML = dados.weather[0].description;
  document.querySelector(".umidade").innerHTML = "Umidade: " + dados.main.humidity + "%";
}

// Adiciona o evento de teclado para disparar a busca ao pressionar 'Enter'
document.querySelector(".input-cidade").addEventListener('keydown', function(event) {
  if (event.key === 'Enter') {
    cliqueiNoBotao(); // Chama a função quando Enter é pressionado
  }
});

// Adiciona o evento de clique no botão
document.querySelector('.botao-busca').addEventListener('click', cliqueiNoBotao);




//async    é para esperar a resposta da API
//then é significa: quando me responder