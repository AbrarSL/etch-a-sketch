const gridTotalSize = 960;
let penMode = true;

updateGridSize();

const gridSizeInput = document.querySelector('#gridSizeInput');
gridSizeInput.addEventListener('change', updateGridSize);

const resetBtn = document.querySelector('#resetBtn');
resetBtn.addEventListener('click', updateGridSize);

const brushMode = document.querySelectorAll('input[name="brushMode"');
brushMode.forEach((brush) => brush.addEventListener('change', changePenMode));

function updateGridSize() {
  const gridSizeInput = document.querySelector('#gridSizeInput');
  const gridSizeLabel = gridSizeInput.previousElementSibling;
  const drawingGrid = document.querySelector('.drawing-grid');

  gridSizeLabel.textContent = `${gridSizeInput.value}×${gridSizeInput.value}`;

  removeAllChildElements(drawingGrid);
  generateDivGrid(drawingGrid, gridSizeInput.value);
}

function generateDivGrid(parentElement, sideLength) {
  for (let i = 0; i < sideLength; i++) {
    const pixelRow = document.createElement('div');

    pixelRow.classList.add('pixel-row');

    for (let i = 0; i < sideLength; i++) {
      const pixel = document.createElement('div');

      pixel.classList.add('pixel');
      pixel.style.width = (gridTotalSize / sideLength) + 'px';
      pixel.style.height = pixel.style.width;

      pixel.addEventListener('mouseover', paintDiv);

      pixelRow.appendChild(pixel);
    }

    parentElement.appendChild(pixelRow);
  }
}

function removeAllChildElements(parentElement) {
  while (parentElement.lastElementChild) {
    parentElement.removeChild(parentElement.lastElementChild);
  }
}

function paintDiv(event) {
  const divElement = event.target;

  if (penMode) {
    divElement.classList.add('painted');
  } else {
    divElement.classList.remove('painted');
  }
}

function changePenMode(event) {
  let radioBtn = event.target;

  if (radioBtn.checked) {
    if (radioBtn.id === 'penMode') {
      penMode = true;
    } else {
      penMode = false;
    }
  }
}