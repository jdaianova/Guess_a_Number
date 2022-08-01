//start-popup
document.querySelector(".new-game-tip").classList.remove("inactive");
document.querySelector(".new-game-tip-ok").onclick = () => {
  document.querySelector(".new-game-tip").classList.add("inactive");
};

const btnRules = document.querySelector(".btn-rules");
const btnStart = document.querySelector(".btn-start");
const inputBoxes = document.querySelectorAll(".input-box");
const numbersBtn = document.querySelectorAll(".number-btn");
const btnCheckNumber = document.querySelector(".btn-check-number");
const gameBlock = document.querySelector(".game-block");
var moves = 1;
var number = [];
var answer;
var flagShowAnswer = false;
getTheAnswer();
//console.log(answer);

popup(".btn-rules", ".popup-rules", ".popup-close"); //popup rules

//start button
document.querySelector(".btn-start").onclick = (e) => {
  pushEffect(e.target);
  location.reload();
};

// btn showAnswer;
document.querySelector(".btn-show-answer").onclick = (e) => {
  flagShowAnswer = true;
  pushEffect(e.target);
  const showAnswer = document.createElement("div");
  showAnswer.innerText = answer;
  showAnswer.classList.add("showAnswer");
  document.querySelector(".game-block").appendChild(showAnswer);
  gameBlock.scrollTop = gameBlock.scrollHeight; //check scroll
};

inputBoxes.forEach((inputBox) => {
  inputBox.onclick = (e) => {
    allBoxNotSelected();
    e.target.classList.add("input-box-active"); //select active input-box
    //listener click of numbers
    numbersBtn.forEach((btn) => {
      btn.onclick = () => {
        pushEffect(btn);
        e.target.innerText = btn.innerText; // load value in input-box
        number[e.target.dataset.id] = btn.innerText; // load value in array 'number'
      };
    });

    //listener btn check number
    btnCheckNumber.onclick = (e) => {
      pushEffect(e.target);

      if (
        allDigitsIsFill(number) &&
        firstDigitNotZero(number[0]) &&
        allDigitsDifferent(number)
      ) {
        //clear input-boxes
        inputBoxes.forEach((inputBox) => {
          inputBox.classList.remove("input-box-active");
          inputBox.innerText = "-";
        });

        //check if win
        if (number.join("") == answer) {
          if (flagShowAnswer) {
            console.log("enter if");
            popupError(
              `You have already seen the answer! :) 
                       Start a new game!`
            );
            popupStartNewGame();
          } else {
            popupWin();
            popupStartNewGame();
            //popup new game after win
            // document.querySelector(".new-game-tip-text").textContent =
            //   "Start new game!";
            // document
            //   .querySelector(".new-game-tip")
            //   .classList.remove("inactive");
            // document.querySelector(".new-game-tip-ok").onclick = () => {
            //   document.querySelector(".new-game-tip").classList.add("inactive");
            //   location.reload();
            // };
          }
        } else {
          // template string
          const moveRowHTML = `
        <div class="moves-row">
            <div class="moves-row-column">${moves++}</div>
            <div class="moves-row-column">${number.join("")}</div>
            <div class="moves-row-column column-cow">${
              CowsAndBulls(number).cows
            }</div>
            <div class="moves-row-column column-bull">${
              CowsAndBulls(number).bulls
            }</div>
        </div>`;
          // create row of game
          gameBlock.appendChild(
            new DOMParser()
              .parseFromString(moveRowHTML, "text/html")
              .querySelector(".moves-row")
          );
          gameBlock.scrollTop = gameBlock.scrollHeight; //check scroll
        }
        number = []; //clear  current array 'number'
        if (moves == 11) {
          popupLose();
          //popup new game after lose
          document.querySelector(".new-game-tip-text").textContent =
            "Start new game!";
          document.querySelector(".new-game-tip").classList.remove("inactive");
          document.querySelector(".new-game-tip-ok").onclick = () => {
            document.querySelector(".new-game-tip").classList.add("inactive");
            location.reload();
          };
        }
      }
    };
  };
});

function CowsAndBulls(arrCurrentNumber) {
  let cows = 0,
    bulls = 0;
  let arrAnswer = answer.toString().split("");
  let arrAnswerCows = [],
    arrCurrentNumberBulls = [];

  //to count bulls
  for (let i = 0; i < arrAnswer.length; i++) {
    if (arrAnswer[i] == arrCurrentNumber[i]) {
      bulls++;
    } else {
      //new arrays for count cows (withuot bulls)
      arrAnswerCows.push(arrAnswer[i]);
      arrCurrentNumberBulls.push(arrCurrentNumber[i]);
    }
  }

  //to count cows
  // arrAnswerCows = [...new Set(arrAnswerCows)];
  // arrCurrentNumberBulls = [...new Set(arrCurrentNumberBulls)];
  for (let i = 0; i < arrAnswerCows.length; i++) {
    for (let j = 0; j < arrCurrentNumberBulls.length; j++) {
      if (arrAnswerCows[i] == arrCurrentNumberBulls[j]) {
        cows++;
      }
    }
  }

  return {
    cows: cows,
    bulls: bulls,
  };
}

function pushEffect(btn) {
  if (btn.outerHTML.charAt(1) == "p") {
    btn = btn.closest("div");
  }
  btn.classList.add("btn-click");
  setTimeout(() => {
    btn.classList.remove("btn-click");
  }, 100);
}

function popup(btnClass, popupClass, btnClose) {
  document.querySelector(btnClass).onclick = (e) => {
    pushEffect(e.target);
    document.querySelector(popupClass).classList.remove("inactive");
    //popup close
    document.querySelector(btnClose).onclick = (e) => {
      document.querySelector(popupClass).classList.add("inactive");
    };
  };
}

function popupError(dyscribingError) {
  Swal.fire({
    icon: "error",
    title: "Oops...",
    text: dyscribingError,
    confirmButtonColor: "rgb(30,30,30)",
  });
}

function allDigitsDifferent(arr) {
  let arrWithoutRepeats = [...new Set(arr)];
  if (arrWithoutRepeats.length === arr.length) {
    return true;
  } else {
    popupError("All digits in the number must be different.");
    return false;
  }
}

function allDigitsIsFill(arr) {
  if (arr[0] && arr[1] && arr[2] && arr[3]) {
    return true;
  } else {
    popupError("You did not fill all digits!");
    return false;
  }
}

function firstDigitNotZero(digit) {
  if (digit == 0) {
    popupError("The number must not start with 0.");
    return false;
  } else {
    return true;
  }
}

function allBoxNotSelected() {
  //delete selected from input-boxes
  inputBoxes.forEach((inputBox) => {
    inputBox.classList.remove("input-box-active");
  });
}

function popupWin() {
  Swal.fire({
    title: "Win!!!",
    text: `You guessed the number on the ${moves} move`,
    imageUrl: "img/pAVXmgu.gif",
    imageWidth: 300,
    imageAlt: "Win cow",
    confirmButtonColor: "rgb(30,30,30)",
  });
}

function popupLose() {
  Swal.fire({
    title: `Game over!`,
    text: `Answer is ${answer}`,
    imageUrl: "img/game_over-cow.gif",
    imageWidth: 300,
    imageAlt: "sad cow",
    confirmButtonColor: "rgb(30,30,30)",
  });
}

function getTheAnswer() {
  const array = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
  const shuffledArray = array.sort((a, b) => 0.5 - Math.random());
  if (shuffledArray[0] == 0) {
    getTheAnswer();
  } else {
    answer = shuffledArray.join("").slice(0, 4);
    return;
  }
}

function popupStartNewGame() {
  document.querySelector(".new-game-tip-text").textContent = "Start new game!";
  document.querySelector(".new-game-tip").classList.remove("inactive");
  document.querySelector(".new-game-tip-ok").onclick = () => {
    document.querySelector(".new-game-tip").classList.add("inactive");
    location.reload();
  };
}
