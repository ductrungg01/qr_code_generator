const form = document.getElementById('qr-form');
const output = document.getElementById('qr-output');

form.addEventListener("submit", (e) => {
    e.preventDefault();
    console.log("submitted");
});