const substances = {LemonJuice: 2, Vinegar: 3, Soda: 3.2, Water: 7, BakingSoda: 9, HandSoap: 10, Bleach: 13}
const colors = {LemonJuice: 'hsla(60, 59%, 74%, 0.565)', Vinegar: 'hsla(0, 0%, 100%, 0.647)', Soda: 'hsla(0, 0%, 80%, 0.5)', Water: 'hsla(240, 100%, 78%, 0.464)', BakingSoda: 'hsla(0, 0%, 100%, 0.647)', HandSoap: 'hsla(120, 96%, 69%, 0.757', Bleach: 'hsla(240, 100%, 78%, 0.464'}

const liquid = document.getElementsByClassName("liquid")[0]

const slider1 = document.getElementById("slider1")
const amount1 = document.getElementById("amount1")
const substance1 = document.getElementById("substance1")
const choices1 = document.getElementsByClassName("substance-btn1")
const slider2 = document.getElementById("slider2")
const amount2 = document.getElementById("amount2")
const substance2 = document.getElementById("substance2")
const choices2 = document.getElementsByClassName("substance-btn2")
const phText = document.getElementById("PH")
const indicatorBtn = document.getElementById("AddIndicator")
const line = document.getElementById("line")

let currentSubstance1 = "Water"
let currentSubstance2 = "Water"
let ph = 7

function calculatePH(){
    return((((substances[currentSubstance1] * slider1.value / 100) + (substances[currentSubstance2] * slider2.value / 100)) / (slider1.value / 100 + slider2.value / 100)).toFixed(2))
}

indicatorBtn.addEventListener("click", function(){
    
    phText.innerHTML = calculatePH()
    let colorPH = (7 - calculatePH())
    const hue = Math.max(225, Math.min(285 + (colorPH * 15), 360));
    let saturation = 100;
    let lightness = 50; 
    if(calculatePH() >= 12){
        saturation = 2
        lightness = 90;
    } 

    const color = `hsl(${hue}, ${saturation}%, ${lightness}%)`;
    console.log(color)
    
    document.getElementsByClassName("liquid")[0].style.backgroundColor = color;
})

// SLIDERS

slider1.addEventListener('input', function() {
    liquid.style.height = `${(parseFloat(slider2.value) + parseFloat(slider1.value)) / 2}%`
    amount1.innerHTML = slider1.value / 2
    moveLine()
    phText.innerHTML = calculatePH()
})
slider2.addEventListener('input', function() {
    liquid.style.height = `${(parseFloat(slider2.value) + parseFloat(slider1.value)) / 2}%`
    amount2.innerHTML = slider2.value /2
    moveLine()
    phText.innerHTML = calculatePH()
})

// DROP DOWN

for (let i = 0; i < choices1.length; i++) {
    choices1[i].addEventListener("click", function() {
        currentSubstance1 = choices1[i].value
        substance1.innerHTML = choices1[i].innerHTML + '𝅏'
        changeColor()
        moveLine()
        phText.innerHTML = calculatePH()
    });
}
for (let i = 0; i < choices2.length; i++) {
    choices2[i].addEventListener("click", function() {
        currentSubstance2 = choices2[i].value
        substance2.innerHTML = choices2[i].innerHTML + '𝅏'
        changeColor()
        moveLine()
        phText.innerHTML = calculatePH()
    });
}

function changeColor(){
    const parseHSLA = (hsla) => {
        const [hue1, sat1, light1, alpha1] = hsla.slice(5, -1).split(',').map(parseFloat);
        return { hue: hue1, saturation: sat1, lightness: light1, alpha: alpha1 };
      };
    
      const color1 = parseHSLA(colors[currentSubstance1]);
      const color2 = parseHSLA(colors[currentSubstance2]);
    
      // Calculate the shortest distance in hue space
      let hueDiff = Math.abs(color1.hue - color2.hue);
      if (hueDiff > 180) {
        hueDiff = 360 - hueDiff;
      }
    
      // Calculate the average hue (handling circular nature)
      let middleHue = (color1.hue + color2.hue) / 2;
      if (Math.abs(color1.hue - color2.hue) > 180) {
        middleHue += 180;
        if (middleHue >= 360) {
          middleHue -= 360;
        }
      }
    
      // Calculate the midpoints for saturation, lightness, and alpha
      const middleSaturation = (color1.saturation + color2.saturation) / 2;
      const middleLightness = (color1.lightness + color2.lightness) / 2;
      const middleAlpha = (color1.alpha + color2.alpha) / 2;
    
      // Construct the middle color string
      const middleColor = `hsla(${middleHue}, ${middleSaturation}%, ${middleLightness}%, ${middleAlpha})`;
      liquid.style.background = middleColor

      console.log(middleColor)
    
}

function moveLine(){
    let position = (calculatePH() / 14) * 100
    line.style.left = `${position}%`
}
