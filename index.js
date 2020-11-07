var player1 = {
    name: 1,
    globalScore: 0,
    currentScore: 0,
    currentDice1: 0,
    currentDice2: 0,
    active: true,
    penaltyScore: 0
}
var player2 = {
    name: 2,
    globalScore: 0,
    currentScore: 0,
    currentDice1: 0,
    currentDice2: 0,
    active: false,
    penaltyScore: 0
}




//Dice rolling
function run(){
    checkActive()
    rollDice(currentPlayer)
    checkDice(currentPlayer)
    addCurrentScore(currentPlayer)
}

function checkActive(){
    if(player1.active){
        return currentPlayer = player1
    }
    else if(player2.active){
        return currentPlayer = player2
    }
}

function rollDice(player){
    player.currentDice1 = Math.floor(Math.random() * 6) + 1
    player.currentDice2 = Math.floor(Math.random() * 6) + 1
}

function checkDice(player){
    //Update UI: dice img
    $('.dice').removeClass('display-none').removeClass('display-darken')
    $("#dice-1").attr("src", "dice-" + player.currentDice1 + ".png")
    $("#dice-2").attr("src", "dice-" + player.currentDice2 + ".png")

    //Change players if dice = 1
    if(player.currentDice1 == 1 || player.currentDice2 == 1){       
        player.currentDice1 = 0
        player.currentDice2 = 0
        player.currentScore = 0

        changePlayers(player)    
    }
    else{
        //Penalty for same dices in row
        if(player.currentDice1 == player.currentDice2){
            player.penaltyScore++
    
            if(player.penaltyScore == 2){
                player.globalScore = 0
                player.currentScore = 0
                player.currentDice1 = 0
                player.currentDice2 = 0
                player.penaltyScore = 0
    
                changePlayers(player)
            }
            else{}
        }
        else{
            removePenaltyScore(player)
        }
    }
}

function addCurrentScore(player){
    player.currentScore = player.currentScore + player.currentDice1 + player.currentDice2
}




//Score holding
function hold(){
    checkActive()
    removePenaltyScore(currentPlayer)
    addGlobalScore(currentPlayer)
    checkGlobalScore(currentPlayer)
    changePlayers(currentPlayer)
}

function addGlobalScore(player){
    player.globalScore = player.globalScore + player.currentScore

    player.currentDice = 0
    player.currentScore = 0


}

function checkGlobalScore(player){
    //Receiving value from 'final-score' input
    var input = document.querySelector('.final-score').value;
    var finalScore;

    if(input){
        finalScore = input    
    }
    else{
        finalScore = 100
    }

    //Checking winning status
    if(player.globalScore >= finalScore){
        $('.active .player-name').addClass('winner').text('WINNER')

        //Preventing button usage
        $('.btn-roll').attr('onclick', '')
        $('.btn-hold').attr('onclick', '')
    }
    else{}
}




//Init
function newGame(){
    player1.name = 1
    player1.globalScore = 0
    player1.currentScore = 0
    player1.currentDice1 = 0
    player1.currentDice2 = 0
    player1.active = true
    
    player2.name = 2
    player2.globalScore = 0
    player2.currentScore = 0
    player1.currentDice1 = 0
    player1.currentDice2 = 0
    player2.active = false

    $(".player-1-panel").removeClass("active")
    $(".player-2-panel").removeClass("active")
    $(".player-1-panel").addClass("active")

    $(".player-1-panel .player-name").removeClass("winner").text('PLAYER 1')
    $(".player-2-panel .player-name").removeClass("winner").text('PLAYER 2')

    $('.btn-roll').attr('onclick', 'run()')
    $('.btn-hold').attr('onclick', 'hold()')

    $('.dice').addClass('display-none')
}




function changePlayers(player){
    //Update UI: 'active' class
    $(".player-1-panel").toggleClass("active")
    $(".player-2-panel").toggleClass("active")
    $(".dice").addClass("display-darken")

    removePenaltyScore(player)

    if(player1.active){
        player1.active = false
        player2.active = true
    }
    else if(player2.active){
        player1.active = true
        player2.active = false      
    }

    player.currentDice1 = 0
    player.currentDice2 = 0
}

function removePenaltyScore(player){
    player.penaltyScore = 0
}

window.onclick = function() {
    $('#player1-global-score').text(player1.globalScore)
    $('#player2-global-score').text(player2.globalScore)

    $('#player1-current-score').text(player1.currentScore)
    $('#player2-current-score').text(player2.currentScore)
}