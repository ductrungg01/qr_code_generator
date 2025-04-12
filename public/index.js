const form = document.getElementById('qr-form');
const output = document.getElementById('qr-output');

form.addEventListener("submit", (e) => {
    e.preventDefault();
    const link = document.getElementById('link-input').value;
    output.innerHTML = `<img src="/generate?link-input=${link}" alt="QR Code">`;
});