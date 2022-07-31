//start-popup without reload
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
const answer = Math.floor(Math.random() * (9999 - 1000 + 1) + 1000);
var moves = 1, number = [];
console.log(answer);
var flagShowAnswer = true;

//popup rules
popup(".btn-rules", ".popup-rules", ".popup-close");

//start button
document.querySelector(".btn-start").onclick = (e) => {
  pushEffect(e.target);
  location.reload();
};

//show answer
document.querySelector(".btn-show-answer").onclick = (e) => {
  flagShowAnswer = false;
  pushEffect(e.target);
  const showAnswer = document.createElement("div");
  showAnswer.innerText = answer;
  showAnswer.classList.add("showAnswer");
  document.querySelector(".game-block").appendChild(showAnswer);
  //check scroll
  gameBlock.scrollTop = gameBlock.scrollHeight;

};

inputBoxes.forEach((inputBox) => {
  inputBox.onclick = (e) => {
    //delete selected input-boxes
    inputBoxes.forEach((inputBox) => {
      inputBox.classList.remove("input-box-active");
    });

    //select active input-box
    e.target.classList.add("input-box-active");

    //listener click of numbers
    numbersBtn.forEach((btn) => {
      btn.onclick = () => {
        pushEffect(btn);
        // load value in input-box
        e.target.innerText = btn.innerText;
        number[e.target.dataset.id] = btn.innerText;
      };
    });

    //listener btn check
    btnCheckNumber.onclick = (e) => {
      pushEffect(e.target);

      if (number[0] && number[1] && number[2] && number[3]) {
        //clear input-boxes
        inputBoxes.forEach((inputBox) => {
          inputBox.classList.remove("input-box-active");
          inputBox.innerText = "-";
        });

        //check if win
        if (number.join("") == answer && flagShowAnswer) {
          Swal.fire({
            title: "Win!!!",
            text: `You guessed the number on the ${moves} move`,
            imageUrl: "/img/win-cow.jpeg",
            imageWidth: 400,
            imageAlt: "Win cow",
          });
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
          //check scroll
          gameBlock.scrollTop = gameBlock.scrollHeight;
        }
        //clear number
        number = [];
      } else {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "You did not fill all the numbers! :)",
        });
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
  arrAnswerCows = [...new Set(arrAnswerCows)];
  arrCurrentNumberBulls = [...new Set(arrCurrentNumberBulls)];
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