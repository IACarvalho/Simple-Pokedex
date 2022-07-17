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

console.log(`HP ${calcHpPercent(48)}`)
console.log(`Attack ${calcAttackPercent(48)}`)
console.log(`Defense ${calcDefensePercent(48)}`)
console.log(`Sp. Attack ${calcSpAttackPercent(48)}`)
console.log(`Sp. Defense ${calcSpDefensePercent(48)}`)
console.log(`HP ${calcSpeedPercent(48)}`)