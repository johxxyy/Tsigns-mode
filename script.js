
const canvas = document.getElementById("designerCanvas");
const ctx = canvas.getContext("2d");
const productSelect = document.getElementById("product");
const colorPicker = document.getElementById("colorPicker");
const designUpload = document.getElementById("designUpload");

let baseImage = new Image();
let overlayImage = null;

function loadBaseImage() {
    const product = productSelect.value;
    baseImage.src = product === "hoodie" ? "hoodie.png" : "tshirt.png";
    baseImage.onload = drawCanvas;
}

function drawCanvas() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = colorPicker.value;
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.drawImage(baseImage, 0, 0, canvas.width, canvas.height);
    if (overlayImage) {
        ctx.drawImage(overlayImage, 100, 100, 300, 300);
    }
}

productSelect.addEventListener("change", loadBaseImage);
colorPicker.addEventListener("input", drawCanvas);

designUpload.addEventListener("change", function (e) {
    const reader = new FileReader();
    reader.onload = function (event) {
        overlayImage = new Image();
        overlayImage.onload = drawCanvas;
        overlayImage.src = event.target.result;
    };
    reader.readAsDataURL(e.target.files[0]);
});

loadBaseImage();
