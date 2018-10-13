(function ($) {
    let character;
    let userChoice;


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
        $(".choice").empty()
        $("#characters").empty()
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
        showCharacter()
    }
    //call initial
    initial()



})(jQuery);