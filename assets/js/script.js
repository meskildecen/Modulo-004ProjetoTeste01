// Variável global para armazenar a escolha do usuário
let selectedCharacters = [];

// Seleciona todas as imagens
const images = document.querySelectorAll('.square img');

// Adiciona um evento de clique para cada imagem
images.forEach(image => {
  image.addEventListener('click', function() {
    const characterName = this.alt;

    // Verifica se o personagem já foi selecionado antes de adicioná-lo à lista
    if (selectedCharacters.includes(characterName)) {
      alert('Você já selecionou esse personagem.');
    } else {
      // Adiciona o personagem à lista
      selectedCharacters.push(characterName);
      alert(`Personagem ${characterName} selecionado.`);

      // Redireciona o usuário para a nova página quando dois personagens são selecionados
      if (selectedCharacters.length === 2) {
        const url = `newpage.html?char1=${selectedCharacters[0]}&char2=${selectedCharacters[1]}`;
        window.location.href = url;
      }
    }
  });
});

// Obtém os parâmetros de consulta da URL
const params = new URLSearchParams(window.location.search);

// Obtém os nomes dos personagens selecionados a partir dos parâmetros de consulta
const char1 = params.get('char1');
const char2 = params.get('char2');

// Exibe os personagens selecionados na página
const selectedChars = document.querySelector('.selectedChars');

const char1Div = document.createElement('div');
char1Div.classList.add('square', 'square-player1');
const char1Img = document.createElement('img');
char1Img.src = `https://assets.pokemon.com/assets/cms2/img/pokedex/full/${getPokedexNumber(char1)}.png`;
char1Img.alt = char1;
char1Img.classList.add(char1);
const char1Name = document.createElement('h2');
char1Name.textContent = char1;
char1Div.appendChild(char1Img);
char1Div.appendChild(char1Name);
selectedChars.appendChild(char1Div);

const char2Div = document.createElement('div');
char2Div.classList.add('square', 'square-player2');
const char2Img = document.createElement('img');
char2Img.src = `https://assets.pokemon.com/assets/cms2/img/pokedex/full/${getPokedexNumber(char2)}.png`;
char2Img.alt = char2;
char2Img.classList.add(char2);
const char2Name = document.createElement('h2');
char2Name.textContent = char2;
char2Div.appendChild(char2Img);
char2Div.appendChild(char2Name);
selectedChars.appendChild(char2Div);

// Função para obter o número da Pokédex de um personagem
function getPokedexNumber(character) {
  switch(character) {
    case 'Charmander':
      return '004';
    case 'Squirtle':
      return '007';    
    case 'Bulbasaur':
      return '001';
    case 'Pikachu':
      return '025';
    // Adicione outros personagens aqui conforme necessário
    default:
      return '000';
  }
}