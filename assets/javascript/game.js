(function ($) {
    let character;

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

            'stormtroop': {
                name: "Stormtroop",
                health: 180,
                attack: 7,
                imgUrl: 'assets/images/stormtroop.png',
                enemyAttackBack: 25
            }

        }
    }

    //create character select section
    function createChar(character, key) {
        let charDiv = $("<div class='column center' data-name='" + key + "'>")
        let charName = $("<div class='name'>").text(character.name)
        let charImage = $("<img>").attr('src', character.imgUrl)
        let charHealth = $("<p>").text(character.health)
        charDiv.append(charName).append(charImage).append(charHealth)
        return charDiv
    }



})(jQuery);