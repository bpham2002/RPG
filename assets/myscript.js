$(document).ready(function() {
    var chosenHero
    var heroLife
    var heroAttack
    var chosenEnemy
    var enemyLife
    var enemyAttack
    var isHeroChosen
    var isEnemyChosen
    var isHeroAlive
    var isEnermyAlive
    var charArr = [{
        name: "Ben Kenobi",
        hp: "40",
        strength: "20",
        image: "./image/Ben Kenobi.jpg"
    }, {
        name: "Grand Moff Tarkin",
        hp: "35",
        strength: "25",
        image: "./image/Grand-moff-tarkin.jpg"
    }, {
        name: "Palpatine",
        hp: "45",
        strength: "15",
        image: "./image/Palpatine.jpg"
    }, {
        name: "Yoda",
        hp: "35",
        strength: "20",
        image: "./image/Yoda.jpg"
    }, {
        name: "CaptainPanaka",
        hp: "30",
        strength: "30",
        image: "./image/CaptainPanaka.jpg"
    }, {
        name: "Anakin",
        hp: "40",
        strength: "15",
        image: "./image/Anakin.jpg"
    }]

    var battleField = [chosenHero, chosenEnemy]
    initGame()

    function initGame() {
        isHeroChosen = false
        isEnemyChosen = false
            // generate character
        for (i = 0; i < charArr.length; i++) {
            var num = Math.floor(12 / charArr.length)
            var charThing = $("<div class='myChar col-md-" + num + "' value ='" + i + "'><img src='" + charArr[i].image + "'Style = 'width:150px; height: 150px;'/></div>")
            $("#characters").append(charThing)
        }
        $(".battle-field").hide()
    }
    $(document).on("click", ".myChar", function() {

        if (isHeroChosen === false) {
            chosenHero = charArr[$(this).attr("value")]
            heroLife = chosenHero.hp
            heroAttack = chosenHero.strength
            isHeroChosen = true
            isHeroAlive = true
            $(this).addClass("fader-hero")
            var myHero = $("<img src='" + chosenHero.image + "'style = 'width:250px; height: 250px;'/>")
            $(".my-hero").append(myHero)


        } else if ((isEnemyChosen === false) && (chosenHero.name !== charArr[$(this).attr("value")].name)) {
            chosenEnemy = charArr[$(this).attr("value")]
            $(".battle-field").show()
            enemyLife = chosenEnemy.hp
            enemyAttack = chosenEnemy.strength
            isEnemyChosen = true
            isEnemyAlive = true
            $(this).addClass("fader-enemy")
            var myEnemy = $("<img src='" + chosenEnemy.image + "'style = 'width:250px; height: 250px;'/>")
            $(".my-enemy").append(myEnemy)
        }

    })

    $(document).on("click", "#attack", function() {
        if ((isHeroChosen) && (isEnemyChosen)) {
            var attack = Math.floor(Math.random() * heroAttack)
            var counterAttack = Math.floor(Math.random() * enemyAttack)
            heroLife -= counterAttack
            enemyLife -= attack
            console.log(chosenHero)

            if ((isHeroAlive) && (heroLife <= 0)) {
                alert("You lose")
                $(".my-hero").empty()

                $(".my-enemy").empty()

                $("#characters").empty()
                initGame()
                isHeroAlive = false
                isEnemyAlive = false
                $("p").empty()
            } else if ((isEnemyAlive) && (enemyLife <= 0)) {
                alert("You win!")
                heroLife += 20
                console.log(heroLife)
                $(".my-enemy").empty()
                isEnemyChosen = false
                isEnemyAlive = false
                $("p").empty()
            } else {
                var disAttack = $("#dis-attack").text("Attack: " + attack)
                var disCounterAttack = $("#dis-counterAttack").text("Counter Atack: " + counterAttack)
                $(".battle-field").append(disAttack, disCounterAttack)
            }
        } else {
            alert("Please chose your next Enemy")
            $("p").empty()
        }


    })
})