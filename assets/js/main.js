const pokemonList = document.getElementById('pokemonList')
const loadMoreButton = document.getElementById('loadMoreButton')

const maxRecords = 151
const limit = 10
let offset = 0;

function convertPokemonToLi(pokemon) {
    return `
        <li class="pokemon ${pokemon.type}">
            <span class="number">#${pokemon.number}</span>
            <span class="name">${pokemon.name}</span>

            <div class="detail">
                <ol class="types">
                    ${pokemon.types.map((type) => `<li class="type ${type}">${type}</li>`).join('')}
                </ol>

                <img src="${pokemon.photo}"
                     alt="${pokemon.name}">
            </div>
            <div class="container-skills">
                <div class="skills" title="Vida">
                    <span class="material-symbols-outlined">
                    favorite
                    </span>
                    ${pokemon.hp}
                </div>
                <div class="skills" title="Ataque">
                    <span class="material-symbols-outlined">
                        swords
                    </span>
                    ${pokemon.attack}
                </div>
                <div class="skills" title="Defesa">
                    <span class="material-symbols-outlined">
                    shield
                    </span>
                    ${pokemon.defense}
                </div>
                <div class="skills" title="Velocidade">
                    <span class="material-symbols-outlined">
                    sprint
                    </span>
                    ${pokemon.speed}
                </div>
            </div>
        </li>
    `
}

function loadPokemonItens(offset, limit) {
    pokeApi.getPokemons(offset, limit).then((pokemons = []) => {
        const newHtml = pokemons.map(convertPokemonToLi).join('')
        pokemonList.innerHTML += newHtml
    })
}

loadPokemonItens(offset, limit)

loadMoreButton.addEventListener('click', () => {
    offset += limit
    const qtdRecordsWithNexPage = offset + limit

    if (qtdRecordsWithNexPage >= maxRecords) {
        const newLimit = maxRecords - offset
        loadPokemonItens(offset, newLimit)

        loadMoreButton.parentElement.removeChild(loadMoreButton)
    } else {
        loadPokemonItens(offset, limit)
    }
})