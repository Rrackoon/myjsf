function updateTime() {
    let timeElement = document.querySelector(".time");
    const options = { day: 'numeric', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: false };
    timeElement.textContent = new Date().toLocaleString('en-GB', options).replace(',', '');
}

updateTime();
setInterval(updateTime, 11000);

