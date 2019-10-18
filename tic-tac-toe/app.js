$( () => {
    //global turn tracker
    let currentTurn = "x";

    //toggles turn indicator
    const showTurn = () => {
        //resets turn indicator brightness
        $('#x').css('opacity','.25');
        $('#o').css('opacity','.25');
        //if x's turn, makes x indicator bright, otherwise o indicator
        currentTurn === "x" ? 
            $('#x').css('opacity','1') : $('#o').css('opacity','1');  
    }

    //toggles player markers
    const togglePlayers = () => {
        //stores player marker template into variables
        const $x = $('<h1>').addClass('blue').text("X").addClass('full');
        const $o = $('<h1>').addClass('red').text("O").addClass('full');
        //removes square event once marker is placed
        $(event.currentTarget).off('click');
        //if x's turn, places marker X, otherwise marker O
        currentTurn === "x" ? 
            $(event.currentTarget).append($x) :
            $(event.currentTarget).append($o);
        //updates global turn tracker
        currentTurn === "x" ? currentTurn = "o" : currentTurn = "x";
    }

    //checks for win or tie
    const checkForWinner = () => {
        //stores possible win patterns
        const winCombinations = [ 
                [0,1,2],[3,4,5],[6,7,8],
                [0,3,6],[1,4,7],[2,5,8],
                [0,4,8],[2,4,6]
        ];
        //checks each win pattern 
        let winner = false; 
        winCombinations.forEach(combo => {
            //and stores their current markers into an array
            const squareCheck = [];
            [0,1,2].forEach(index => {
                squareCheck.push($('.square').eq(combo[index]).children().text());
            });
            //and records a winner
            squareCheck.filter(square => square === "X").length === 3 ? winner = "X" :  
            squareCheck.filter(square => square === "O").length === 3 ? winner = "O" : false;
        });
        //checks for win or tie
        winner === "X" ? endGame("X") : winner === "O" ? endGame("O") : 
            ($('.full').length === 9) && (winner === false) ? endGame("tie") : false;
    }

    //ends the game based on winner
    endGame = (winner) => {
        //removes events from all squares
        $('.square').off('click');
        //swaps title with game result
        $('#title').children().remove(); 
        winner === "tie" ? $('#title').append($('<h1>').text('tie game')) : winner === "X" ?
            $('#title').append($('<h1>').addClass('blue').text('x wins')) :
            $('#title').append($('<h1>').addClass('red').text('o wins'));
        //reveals restart
        $('#restart').css('display','block').on('click',()=>location.reload());
    }

    //add event listener
    $('.square').on('click', () => {
        togglePlayers();
        checkForWinner();
        showTurn(); 
    });

    //starts game with player x's turn 
    showTurn(); 

})
