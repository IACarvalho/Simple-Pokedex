function calcHpPercent(hp){
  return (hp * 100 )/255
}

function calcAttackPercent(attack){
  return (attack * 100)/190
}

function calcDefensePercent(defense){
  return (defense * 100)/230
}

function calcSpAttackPercent(spAttack){
  return (spAttack * 100)/180
}

function calcSpDefensePercent(spDefense){
  return (spDefense * 100)/230
}

function calcSpeedPercent(speed){
  return (speed * 100)/200
}

function showImages(front, back){
  const imagesDiv = document.querySelector('#pokemon-image')

  const html = `
    <img src='${front}' alt='pokemon front image' />
    <img src='${back}' alt='pokemon back image' />
  `

  imagesDiv.innerHTML = html;
}

function showStats(data) {
  const pokemonInfo = document.querySelector('#pokemon-info')
  pokemonInfo.style.display = 'block'

  const pokemonName = document.querySelector('#name')
  pokemonName.innerHTML = data.name

  const pokemonType = document.querySelector('#type')

  if(data.types.length === 1)
    pokemonType.innerHTML = data.types[0]
  else
    pokemonType.innerHTML = `${data.types[0]}/${data.types[1]}`

  const stats = document.querySelector('#stats')

  const html = `
    <span class="container"> <span id="hp">${data.hp}</span> </span>
    <span class="container"> <span id="attack">${data.attack}</span> </span>
    <span class="container"> <span id="defense">${data.defense}</span> </span>
    <span class="container"> <span id="sp-attack">${data.spAttack}</span> </span>
    <span class="container"> <span id="sp-defense">${data.spDefense}</span> </span>
    <span class="container"> <span id="speed">${data.speed}</span> </span>
  `

  stats.innerHTML = html

  // Status bar style
  const hp = document.querySelector('#hp')
  hp.style.width = `${calcHpPercent(data.hp)}%`
  hp.style.backgroundColor = '#E5202A'
  hp.style.color = '#FFFFFF'
  hp.style.textAlign = 'right'
  hp.style.textWeight = 'bold'
  hp.style.padding =  '0.5rem'

  const attack = document.querySelector('#attack')
  attack.style.width = `${calcAttackPercent(data.attack)}%`
  attack.style.backgroundColor = '#E5202A'
  attack.style.color = '#FFFFFF'
  attack.style.textAlign = 'right'
  attack.style.textWeight = 'bold'
  attack.style.padding =  '0.5rem'

  const defense = document.querySelector('#defense')
  defense.style.width = `${calcDefensePercent(data.defense)}%`
  defense.style.backgroundColor = '#E5202A'
  defense.style.color = '#FFFFFF'
  defense.style.textAlign = 'right'
  defense.style.textWeight = 'bold'
  defense.style.padding =  '0.5rem'

  const spAttack = document.querySelector('#sp-attack')
  spAttack.style.width = `${calcSpAttackPercent(data.spAttack)}%`
  spAttack.style.backgroundColor = '#E5202A'
  spAttack.style.color = '#FFFFFF'
  spAttack.style.textAlign = 'right'
  spAttack.style.textWeight = 'bold'
  spAttack.style.padding =  '0.5rem'

  const spDefense = document.querySelector('#sp-defense')
  spDefense.style.width = `${calcSpDefensePercent(data.spDefense)}%`
  spDefense.style.backgroundColor = '#E5202A'
  spDefense.style.color = '#FFFFFF'
  spDefense.style.textAlign = 'right'
  spDefense.style.textWeight = 'bold'
  spDefense.style.padding =  '0.5rem'

  const speed = document.querySelector('#speed')
  speed.style.width = `${calcSpeedPercent(data.speed)}%`
  speed.style.backgroundColor = '#E5202A'
  speed.style.color = '#FFFFFF'
  speed.style.textAlign = 'right'
  speed.style.textWeight = 'bold'
  speed.style.padding =  '0.5rem'
}

function mountHtml(data) {
  showImages(data.frontImageUrl, data.backImageUrl)
  showStats(data)
}

const form = document.querySelector('form')

const pokemonData= {}

function setPokemonData(data) {
  pokemonData['name'] = data.name
  const types = []
  data.types.map(slot => types.push(slot.type.name))
  pokemonData['types'] = types
  pokemonData['frontImageUrl'] = data.sprites.front_default
  pokemonData['backImageUrl'] = data.sprites.back_default
  pokemonData['hp'] = data.stats.map(stat => {
    if(stat.stat.name === 'hp')
      return stat.base_stat
  })[0]

  pokemonData['attack'] = data.stats.map(stat => {
    if(stat.stat.name === 'attack')
      return stat.base_stat
  })[1]

  pokemonData['defense'] = data.stats.map(stat => {
    if(stat.stat.name === 'defense')
      return stat.base_stat
  })[2]

  pokemonData['spAttack'] = data.stats.map(stat => {
    if(stat.stat.name === 'special-attack')
      return stat.base_stat
  })[3]

  pokemonData['spDefense'] = data.stats.map(stat => {
    if(stat.stat.name === 'special-defense')
      return stat.base_stat
  })[4]

  pokemonData['speed'] = data.stats.map(stat => {
    if(stat.stat.name === 'speed')
      return stat.base_stat
  })[5]

  mountHtml(pokemonData)
}

form.addEventListener('submit', e => {
  e.preventDefault()

  const name = document.querySelector('#pokemon-name')
  const apiUrl = `https://pokeapi.co/api/v2/pokemon/${name.value.toLowerCase()}`
  
  fetch(apiUrl)
    .then(response => response.json())
    .then(data => {
      setPokemonData(data)
    })
    .catch(err => console.log(err))
})