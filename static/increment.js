class card {
    constructor(count){
        this.cardNumber = count;
    }
};

let cardCount = 0;
let cardCount1 = new card(0);
let cardsMap = new Map();
let sum = [];
let ace = 1;
let face = 1;
let two = 1;
let three = 1;
let four = 1
let five = 1;
let six = 1;
let seven = 1;
let eight = 1;
let nine = 1;


function incrementButton() {
    fetch('/increment', {
        method: 'POST'
    })
    .then(response => response.json())
    .then(data => {
        let element = document.getElementById('incrementText');
        element.innerHTML = data.counter;  
        console.log('Counter updated to:', data.counter);
        cardCount = data.counter; 
    })
    .catch(error => {
        console.error('Error during increment:', error);
    })
    .finally(() => {
        // After this fetch is done (whether it succeeds or fails), wait 5 seconds and fetch again
        setTimeout(incrementButton, 5000);  // 5000 milliseconds = 5 seconds
    });
}

// Start the loop immediately when the page loads
window.onload = function() {
    incrementButton();
};


function reset() {
        let holder = '';
        if(cardCount >= 2 && cardCount <= 6){
            cardCount1.cardNumber += 1;
            if(cardCount == 2){
                holder = cardCount + '(' + two + ')';  
                cardsMap.set(holder, 1);
                two++;
            }
            if(cardCount == 3){
                holder = cardCount + '(' + three + ')';  
                cardsMap.set(holder, 1);
                three++;
            }
            if(cardCount == 4){
                holder = cardCount + '(' + four + ')';  
                cardsMap.set(holder, 1);
                four++;
            }
            if(cardCount == 5){
                holder = cardCount + '(' + five + ')';  
                cardsMap.set(holder, 1);
                five++;
            }
            if(cardCount == 6){
                holder = cardCount + '(' + six+ ')';  
                cardsMap.set(holder, 1);
                six++;
            }
        }
        else if(cardCount == 1 || cardCount == 10){
            cardCount1.cardNumber += -1;   
            if(cardCount == 1){
                holder = cardCount + '(' + ace + ')';  
                cardsMap.set(holder, -1);
                ace++;
            }
            if(cardCount == 10){
                holder = cardCount + '(' + face + ')';  
                cardsMap.set(holder, -1);
                face++;
            }
        }
        else if(cardCount > 6 && cardCount < 10){
            cardCount1.cardNumber += 0;
            if(cardCount == 7){
                holder = cardCount + '(' + seven + ')';  
                cardsMap.set(holder, 0);
                seven++;
            }
            if(cardCount == 8){
                holder = cardCount + '(' + eight + ')';  
                cardsMap.set(holder, 0);
                eight++;
            }
            if(cardCount == 9){
                holder = cardCount + '(' + nine + ')';  
                cardsMap.set(holder, 0);
                nine++;
            }
        }else{
            console.log('Out of bounds.');
            document.getElementById("displayCard").innerHTML = "<p>Out of bounds.</p>";
            return;
        }


        document.getElementById('displayCard').innerHTML = cardCount1.cardNumber;
        sum.push(cardCount1.cardNumber);
        document.getElementById('incrementText').innerHTML = 0;
        cardCount = 0;

        /*Chances of Ace*/
        let numAces = 4;
        let numTen = 16;
        let deck = 52 - ace - two - three - four- five - six - seven - eight - nine - face;
        let aceProb = ((numAces-ace)/deck) * 100;
        aceProb = Math.round(aceProb*100)/100;
        let faceProb = ((numTen-face)/deck) * 100;
        faceProb = Math.round(faceProb*100)/100;
        let printAceProb = "The probability of an Ace is: ";
        let printFaceProb = "The probability of a face/10 is: ";

        document.getElementById("displayAceProb").innerHTML = printAceProb + aceProb + '%.';
        document.getElementById("displayFaceProb").innerHTML = printFaceProb + faceProb + '%.';
}

function finish(){
    let displayTrain = "Card Count Training <br>";
    document.getElementById('replace').innerHTML = displayTrain;
    let displayText = "All Card Values:<br>";
    let i = 0;
    if(cardsMap.size == 0){
        let print = "No cards were entered.";
        document.getElementById("replace").innerHTML = print;
        return;
    }else{
        cardsMap.forEach((value, key) => {
            displayText += `Card at hand ${key} and the value is ${value}. The sum at this point is ${sum[i]}<br>`;
            i++;
        });
    }
    document.getElementById('replace').innerHTML = displayText;
    cardCount1.cardNumber = 0;
    cardsMap.clear();
    sum = [];
    ace = 1;
    face = 1;
    two = 1;
    three = 1;
    four = 1
    five = 1;
    six = 1;
    seven = 1;
    eight = 1;
    nine = 1;
}
