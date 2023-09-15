// Capturando elementos
const characterList = document.getElementById('characterList')
const searchCharactersByName = document.getElementById('searchCharactersByName')

// Paginação
const pagination = document.getElementById('pagination')
const prevButton = document.getElementById('prevButton')
const nextButton = document.getElementById('nextButton')

let currentPage = 1

async function fetchCharacter(page = 1, name = '') {
  try {
    const params = {
      page,
      name
    }

    const response = await api.get('/character', {
      params
    })

    const characters = response.data.results
    const info = response.data.info

    console.log(response.data)

    showCharacter(characters)
    displayPagination(info)

  } catch (error) {
    console.log("Erro ao buscar personagens:", error)
  }
}

function showCharacter(characters) {
  characterList.innerHTML = ''

  characters.forEach(character => {
    const card = document.createElement('div')
    card.classList.add('card')

    card.innerHTML = `
      <img src="${character.image}" />
      <h2>${character.name}<h2>
      <p>${character.status} - ${character.species}</p>
      <p>última localização conhecida</p>
      <p>${character.location.name}</p>
    `

    characterList.appendChild(card)
  });
}

function displayPagination(info) {
  prevButton.addEventListener('click', () => {
    if (currentPage > 1) {
      currentPage--
      fetchCharacter(currentPage)
    }
  })

  nextButton.addEventListener('click', () => {
    if (currentPage < info.pages) {
      currentPage++
      fetchCharacter(currentPage)
    }
  })
}

searchCharactersByName.addEventListener('input', () => {
  currentPage = 1
  fetchCharacter(currentPage, searchCharactersByName.value)
})

fetchCharacter()