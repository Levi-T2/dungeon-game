let heroes = [
    {
        name: 'jerms',
        type: 'dwarf',
        damage: 5,
        gold: 20,
        health: 100
    },
    {
        name: 'mick',
        type: 'elf',
        damage: 10,
        gold: 0,
        health: 50
    }
]

let boss = {
    health: 100,
    maxHealth: 100,
    damage: 5,
    level: 1,
    defeats: 0,
    rewards: 10
}



function attackBoss() {

    let totalDamage = 0
    heroes.forEach(hero => {
        totalDamage += (hero.damage)
        console.log(totalDamage)
    })
    // let bossHealthBar = boss.health - totalDamage
    if (boss.health > 0) {
        boss.health -= totalDamage
        console.log(boss.health)
    }

    heroes.forEach(hero => {
        if (hero.health <= 0) {
            hero.damage = 0
        }
    })



    bossLevelUp()
    drawBossHealthBar()
}

function drawBossHealthBar() {
    const healthBarElement = document.getElementById('health bar')
    healthBarElement.innerText = boss.health
}

function attackHeroes() {

    heroes.forEach(hero => hero.health -= boss.damage)

    heroes.forEach(hero => {
        if (hero.health <= 0) {
            hero.health = 0
            // const heroElement = document.getElementById(hero.name.toLowerCase)
            // const deadHeroElement = heroElement.querySelector(".hero-image")
            // deadHeroElement.classList.add("hidden")
        }
    })

    heroes.forEach(hero => {
        if (hero.health <= 0) {
            let fighter = hero.name.toLowerCase()
            deleteHero(fighter)
        }
    })

    drawHeroHealth()
}

function deleteHero(fighter) {
    console.log('fighter', fighter);
    let content = ""
    const deleteMickElement = document.getElementById(fighter)
    // const deleteJermsElement = document.getElementById("jerms")

    // deleteJermsElement.innerHTML = content
    deleteMickElement.innerHTML = content
}

function drawHeroHealth() {
    const heroHealthBar1 = document.getElementById('hero1')
    heroHealthBar1.innerText = heroes[0].health

    const heroHealthBar2 = document.getElementById('hero2')
    heroHealthBar2.innerText = heroes[1].health
}

function bossLevelUp() {
    if (boss.health <= 0) {
        heroes.forEach(hero => hero.gold += boss.rewards)
        boss.defeats++
        boss.maxHealth += 20
        boss.damage += 5
        boss.level++
        boss.health = boss.maxHealth
        boss.reward += 5
    }
    drawDefeats()
    drawBossHealthBar()
}


function drawDefeats() {
    const defeatElement = document.getElementById('defeat counter')
    defeatElement.innerText = boss.defeats

    const levelElement = document.getElementById('boss level')
    levelElement.innerText = boss.level

    const addGoldElement1 = document.getElementById('hero1 gold')
    addGoldElement1.innerText = heroes[0].gold

    const addGoldElement2 = document.getElementById('hero2 gold')
    addGoldElement2.innerText = heroes[1].gold
}

function buyPotion(fighter) {
    const foundHero = heroes.find(hero => hero.name == fighter)
    if (foundHero.gold >= 20) {
        foundHero.gold -= 20
        foundHero.health += 30
    } else {
        return
    }
    drawHeroHealth()
    drawDefeats()
}

function reset() {
    heroes = [
        {
            name: 'jerms',
            type: 'dwarf',
            damage: 5,
            gold: 20,
            health: 100
        },
        {
            name: 'mick',
            type: 'elf',
            damage: 10,
            gold: 0,
            health: 50
        }
    ]

    boss = {
        health: 100,
        maxHealth: 100,
        damage: 5,
        level: 1,
        defeats: 0,
        rewards: 10
    }

    const heroImageElement1 = document.getElementById('jerms')
    heroImageElement1.innerHTML = '<img class="img-fluid" src="hero1.png">'

    const heroImageElement2 = document.getElementById('mick')
    heroImageElement2.innerHTML = '<img id="mick" class="img-fluid" src="hero2.png">'

    drawDefeats()
    drawHeroHealth()
    drawBossHealthBar()
}

// function drawBossLevel() {
//     const levelElement = document.getElementById('boss level')
//     levelElement.innerText = boss.level
// }



drawDefeats()
drawHeroHealth()
drawBossHealthBar()

setInterval(attackHeroes, 5000)
