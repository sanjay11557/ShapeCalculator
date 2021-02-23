function shapeFactory() {
  this.createShape = function (type) {
    switch (type) {
      case "square":
        return new squareShape();
      case "rectangle":
        return new rectangleShape();
      case "circle":
        return new circleShape();
      case "ellipse":
        return new ellipseShape();
      default:
        return undefined;
    }
  };
}

function squareShape() {
  this.parameters = ["side"];
  this.getArea = function (a) {
    return a * a;
  };
}
function rectangleShape() {
  this.parameters = ["side A", "side B"];
  this.getArea = function (a, b) {
    return a * b;
  };
}
function circleShape() {
  this.parameters = ["diameter"];
  this.getArea = function (a) {
    return (Math.PI * a * a).toFixed(2);
  };
}
function ellipseShape() {
  this.parameters = ["diameter A", "diameter B"];
  this.getArea = function (a, b) {
    return (Math.PI * a * b).toFixed(2);
  };
}

var fobj = new shapeFactory();
var choice;
var shape;
var cParams = [];

// setup click handlers
function gotoStep2() {
  var options = document.getElementsByName("shape");
  for (opt of options) {
    if (opt.checked) {
      choice = opt.value;
    }
  }
  if (typeof choice == "undefined") {
    alert("Select a shape to proceed.");
  } else {
    shape = fobj.createShape(choice);
    document.getElementById("step-1").style.display = "none";
    var step2Ele = document.getElementById("step-2");
    var elePara = document.createElement("p");
    elePara.innerHTML = `You have selected a ${choice}, please input the required variables.`;
    step2Ele.appendChild(elePara);
    var eleDivArgs = document.createElement("div");
    for (param of shape.parameters) {
      var eleInput = document.createElement("input");
      var eleLabel = document.createElement("label");
      eleInput.type = "text";
      eleInput.name = "parameters";
      eleLabel.innerHTML = param;
      eleLabel.setAttribute("class", "arg__params");
      eleDivArgs.appendChild(eleLabel);
      eleDivArgs.appendChild(eleInput);
      eleDivArgs.appendChild(document.createElement("br"));
    }
    eleDivArgs.setAttribute("class", "args");
    step2Ele.appendChild(eleDivArgs);
    var elDivActions = document.createElement("div");
    var elBtn = document.createElement("button");
    elBtn.innerHTML = "Go to step 3.";
    elBtn.onclick = gotoStep3;
    var elLink = document.createElement("a");
    elLink.onclick = resetCalculator;
    elLink.innerHTML = "or Cancel";
    elDivActions.setAttribute("class", "actions");
    elDivActions.appendChild(elBtn);
    elDivActions.appendChild(elLink);
    step2Ele.appendChild(elDivActions);
    document.getElementById("step-2").style.display = "block";
  }
}

function gotoStep3() {
  document.getElementById("step-2").style.display = "none";
  var elStep3 = document.getElementById("step-3");
  var ps = document.getElementsByName("parameters");
  for (p of ps) {
    cParams.push(p.value);
  }
  var elePara = document.createElement("p");
  var elH3 = document.createElement("div");

  if (cParams.length === 1) {
    elePara.innerHTML = `You have caculated area of a ${choice} with ${shape.parameters[0]} of ${cParams[0]}. Below is your result.`;
    elH3.innerHTML = `The area is ${shape.getArea(cParams[0])}.`;
  } else {
    elePara.innerHTML = `You have caculated area of a ${choice} with ${shape.parameters[0]} of ${cParams[0]} and ${shape.parameters[1]} of ${cParams[1]}. Below is your result.`;
    elH3.innerHTML = `The area is ${shape.getArea(cParams[0], cParams[1])}.`;
  }

  elStep3.appendChild(elePara);
  elH3.setAttribute("class", "emph");
  elStep3.appendChild(elH3);
  var elBtn = document.createElement("button");
  elBtn.innerHTML = "Start over";
  elBtn.onclick = resetCalculator;
  elStep3.appendChild(elBtn);
  document.getElementById("step-3").style.display = "block";
}

function resetCalculator() {
  window.location.reload();
}
