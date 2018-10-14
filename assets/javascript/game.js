(function ($) {
    let character;
    let game;

    //reset character
    function resetCharacter() {
        character = {
            'luke': {
                name: "Luke Skywalker",
                health: 100,
                attack: 14,
                imgUrl: 'assets/images/luke.png',
                enemyAttackBack: 5
            },

            'kylo': {
                name: "Kylo Ren",
                health: 150,
                attack: 5,
                imgUrl: 'assets/images/kylo.png',
                enemyAttackBack: 20
            },

            'rey': {
                name: "Rey",
                health: 120,
                attack: 8,
                imgUrl: 'assets/images/rey.png',
                enemyAttackBack: 15
            },

            'stormtrooper': {
                name: "Stormtrooper",
                health: 180,
                attack: 7,
                imgUrl: 'assets/images/stormtrooper.png',
                enemyAttackBack: 25
            }
        }
    }

    //reset the game status
    function resetGame() {
        game = {
            userChoiceChar : null,
            userChoiceEnemy : null,
            enemiesLeft : 0,
            numberClick : 0
        }
    }

    //create character select section
    function createChar(char, charKey) {
        let charDiv = $("<div class='column center' data-name='" + charKey + "'>")
        let charName = $("<div class='name'>").text(char.name)
        let charImage = $("<img>").attr('src', char.imgUrl)
        let charHealth = $("<p>").text(char.health)
        charDiv.append(charName).append(charImage).append(charHealth)
        return charDiv
    }


    //show character
    function showCharacter() {
        let charArr = Object.keys(character)
        for (let i = 0; i < charArr.length; i++) {
            let charKey = charArr[i]
            let char = character[charKey]
            let charDiv = createChar(char, charKey)
            $("#characters").append(charDiv)
        }
    }

    //disappear show charcter
    function disappear() {
        $("#character").empty()
        $("#defender").empty()
        $("#enemies").empty()
        $("#characters").empty()
        $(".defend").empty()
        $(".choose").show()
    }

    //show enemy charcter
    function showEnemy(userChoice) {
        let enemyCharArr = Object.keys(character)
        for (let j = 0; j < enemyCharArr.length; j++) {
            if (enemyCharArr[j] !== userChoice) {
                let enemyCharKey = enemyCharArr[j]
                let enemyChar = character[enemyCharKey]
                let enemyDiv = createChar(enemyChar, enemyCharKey)
                $(enemyDiv).addClass("enemyChar")
                $("#enemies").append(enemyDiv)
            }
        }
    }

    //reset the game
    function initial() {
        resetCharacter()
        resetGame()
        showCharacter()
    }
    //call initial
    initial()

    //select attack enemy
    function attackEnemy() {
        $(".enemyChar").on("click.enemySelect",function() {
            let userSelectedEnemy = $(this).attr('data-name')
            game.userChoiceEnemy = character[userSelectedEnemy]
            $("#defender").append(this)
            $("#attack").show()
            $("#enemies").off('click.enemySelect')
        })
    }

    //attack
    $("#attack").on("click.attack", function() {
        game.numberClick++
        game.userChoiceEnemy.health -= game.userChoiceChar.attack * game.numberClick
        game.userChoiceChar.health -= game.userChoiceEnemy.enemyAttackBack
        $("#")
    })

    //checkHealth
    let isDead = function(char) {
        if (char.health <= 0) return true
        else return false
    }

    //check enemy left
    function isGameWon() {
        if (game.enemiesLeft === 0) return true
        else return false
    }

    //attack stat
    function attackStart() {
        if (isDead(game.userChoiceChar)) {
            alert("You were defeated by " + game.userChoiceEnemy + ". Click reset to play again.")
            $("#character").empty()
            $("#reset").show()
        } else if (isDead(game.userChoiceEnemy)) {
            game.enemiesLeft--
            $("#defender").empty()

            if (isGameWon()) {
                alert("You win! Click reset to play again!")
                $("#reset").show()
            } else {
                alert("You defeated " + game.userChoiceEnemy + "! Select another enemy to fight!")
                // attackEnemy()
            }
        }
    }

    //select char
    $("#characters").on("click", ".column", function() {
        let userSelectedChar = $(this).attr("data-name")
        game.userChoiceChar = character[userChoiceChar]
        $("#character").append(this)
        showEnemy(userSelectedChar)
        $(".choose").hide()
        game.enemiesLeft = Object.keys(character).length - 1
        // attackEnemy()
    })



    



})(jQuery);