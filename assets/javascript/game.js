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
        $(".enemyChar").on("click",function() {
            let userSelectedEnemy = $(this).attr('data-name')
            game.userChoiceEnemy = character[userSelectedEnemy]
            $("#defender").append(this)
            $("#attack").show()
            $("#enemies").off('click')
        })
    }

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
            alert("You were defeated by " + game.userChoiceEnemy.name + ". Click reset to play again.")
            $("#reset").show()
        } else if (isDead(game.userChoiceEnemy)) {
            game.enemiesLeft--
            $("#defender").empty()

            if (isGameWon()) {
                alert("You win! Click reset to play again!")
                $("#reset").show()
            } else {
                alert("You defeated " + game.userChoiceEnemy.name + "! Select another enemy to fight!")
                attackEnemy()
            }
        }
    }

    //attack
    $("#attack").on("click", function() {
        game.numberClick++
        game.userChoiceEnemy.health -= game.userChoiceChar.attack * game.numberClick
        game.userChoiceChar.health -= game.userChoiceEnemy.enemyAttackBack
        $('#character p').text(game.userChoiceChar.health)
        $('#defender p').text(game.userChoiceEnemy.health)
        attackStart()

        if (isDead(game.userChoiceEnemy) || isDead(game.userChoiceChar)) {
            $(this).hide()
        }
    })

    //reset
    $("#reset").on("click", function() {
        disappear()
        $(this).hide()
        initial()
    })

    //select char
    $("#characters").on("click", ".column", function() {
        let userSelectedChar = $(this).attr("data-name")
        game.userChoiceChar = character[userSelectedChar]
        $("#character").append(this)
        showEnemy(userSelectedChar)
        $(".choose").hide()
        game.enemiesLeft = Object.keys(character).length - 1
        attackEnemy()
    })
    
    //ball background
    const colors = ["#3CC157", "#2AA7FF", "#1B1B1B", "#FCBC0F", "#F85F36"];

    const numBalls = 50;
    const balls = [];

    for (let i = 0; i < numBalls; i++) {
    let ball = document.createElement("div");
    ball.classList.add("ball");
    ball.style.background = colors[Math.floor(Math.random() * colors.length)];
    ball.style.left = `${Math.floor(Math.random() * 100)}vw`;
    ball.style.top = `${Math.floor(Math.random() * 100)}vh`;
    ball.style.transform = `scale(${Math.random()})`;
    ball.style.width = `${Math.random()}em`;
    ball.style.height = ball.style.width;
    
    balls.push(ball);
    document.body.append(ball);
    }

    // Keyframes
    balls.forEach((el, i, ra) => {
    let to = {
        x: Math.random() * (i % 2 === 0 ? -11 : 11),
        y: Math.random() * 12
    };

    let anim = el.animate(
        [
        { transform: "translate(0, 0)" },
        { transform: `translate(${to.x}rem, ${to.y}rem)` }
        ],
        {
        duration: (Math.random() + 1) * 2000, // random duration
        direction: "alternate",
        fill: "both",
        iterations: Infinity,
        easing: "ease-in-out"
        }
    );
    });



    



})(jQuery);
