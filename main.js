import "./style.css";

const colorInput = document.getElementById("color-input");
const schemeEl = document.getElementById("color-scheme");
const colorContainer = document.getElementById("color-container");
const submitBtn = document.getElementById("get-colors-btn");

let selectedColor = localStorage.getItem("color")
  ? localStorage.getItem("color")
  : "0662E0";

let selectedScheme = schemeEl.value;

colorInput.value = `#${selectedColor}`;

const fetchFn = () => {
  fetch(
    `https://www.thecolorapi.com/scheme?hex=${selectedColor}&mode=${selectedScheme}&count=4`
  )
    .then((res) => res.json())
    .then((data) => {
      let html = "";
      data.colors.forEach((color) => {
        html += `
        <div class="color" style="background-color: ${color.hex.value}">
            <div class="hex-color" data-color="${color.hex.value}">${color.hex.value}</div>
          </div>
        `;
      });
      colorContainer.innerHTML = html;
    });
};

submitBtn.addEventListener("click", (e) => {
  e.preventDefault();

  selectedColor = colorInput.value.substring(1);
  selectedScheme = schemeEl.value;

  localStorage.setItem("color", selectedColor);

  fetchFn();
});

document.addEventListener("click", (e) => {
  const color = e.target.dataset.color;
  if (color) {
    navigator.clipboard.writeText(color);
    alert(`Copied HEX value ${color}`);
  }
});

fetchFn();
