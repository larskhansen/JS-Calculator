calc = new Calculation();

document.getElementById("erase").addEventListener("click", function () {
  calc.eraseDisplay();
});

let numbers = [
  "zero",
  "one",
  "two",
  "three",
  "four",
  "five",
  "six",
  "seven",
  "eight",
  "nine",
  "comma"
];

let numberClasses = document.getElementsByClassName("number");
for (var i = 0; i < numberClasses.length; i++) {
  numberClasses[i].addEventListener("click", function () {
    calc.addNumber(numbers.indexOf(this.id));
  });
}

let actionClasses = document.getElementsByClassName("action");
for (var i = 0; i < actionClasses.length; i++) {
  actionClasses[i].addEventListener("click", function () {
    calc.addAction(this.id);
  });
}

function Calculation() {

  this.firstDigit = "";
  this.secondDigit = "";
  this.action = "";
  this.actionChoosen = false;
  this.result = 0;
  this.displayedAmount = "";

  this.addNumber = function (number) {
    if (number < 10) {
      if (this.actionChoosen) {
        this.secondDigit += number.toString();
      } else {
        this.firstDigit += number.toString();
      }
    } else {
      if (this.actionChoosen) {
        this.secondDigit += ".";
      } else {
        this.firstDigit += ".";
      }
    }
    if (this.actionChoosen) {
      this.addToDisplay(this.secondDigit);
    } else {
      this.addToDisplay(this.firstDigit);
    }
  };

  this.addAction = function (action) {

    if (this.firstDigit !== "" && this.secondDigit === "") {
      this.actionChoosen = true;
      document.getElementById(action).classList.add("bold");

      this.action = action;

    } else if (this.firstDigit !== "" && this.secondDigit !== "") {

      if (this.action !== "" && this.firstDigit !== "" && this.secondDigit !== "") {
        let first = parseFloat(this.firstDigit);
        let second = parseFloat(this.secondDigit);
        if (this.action === "plus") {
          this.result = first + second;
        } else if (this.action === "minus") {
          this.result = first - second;
        } else if (this.action === "multiply") {
          this.result = first * second;
        } else if (this.action === "divide") {
          this.result = first / second;
        }
        this.addToDisplay(this.result.toString());
        this.resetCalc();
      }
    }
  }

  this.eraseDisplay = function () {
    document.getElementById("display").innerHTML = "0";
  }

  this.addToDisplay = function (element) {
    elements = element.split(".");
    var firstElement = elements[0].split("").reverse();
    if (elements[0].length > 3) {
      for (var i = 0; i < firstElement.length; i++) {
        if (i % 3 === 0 && i !== 0 && firstElement.contains('.') === false) {
          firstElement.splice(i, 0, ".");
        } else if (firstElement.contains('.') && i > 6) {
          if (firstElement[i - 1] !== ".") {
            var lastDot = firstElement.indexOf('.', i - 4);
            var nextDot = lastDot + 4;
            firstElement.splice(nextDot, 0, ".");
            if (firstElement[firstElement.length - 1] === ".") {
              firstElement.splice(firstElement.length - 1, 1);
            } else if (firstElement[i + 1] === ".") {
              firstElement.splice(i + 1, 1);
            }
            continue;
          }
        }
      }
    }

    elements[0] = firstElement.reverse().join("");
    //      console.log(elements);

    if (elements[1] !== undefined) {
      element = elements[0] + "," + elements[1];
      console.log('comma lige her');
    } else {
      element = elements[0];
      console.log('ingen komma')
    }
    document.getElementById("display").innerHTML = element;
  }

  this.resetCalc = function () {
    document.getElementById(this.action).classList.remove("bold");
    this.firstDigit = this.secondDigit = this.action = "";
    this.actionChoosen = false;
    this.result = 0;
    this.displayedAmount = "";
  }
}

Array.prototype.contains = function (needle) {
  for (i in this) {
    if (this[i] == needle) return true;
  }
  return false;
}
