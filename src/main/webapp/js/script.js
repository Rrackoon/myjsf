
function validateInput() {
    const xInput = document.getElementById("pointForm:x");
    const yInput = document.getElementById('pointForm:y');
    const rInput = document.getElementById('pointForm:r');
    const errorMessage = document.getElementById('pointForm:error-message');
    const submitButton = document.getElementById('pointForm:submit-btn');
    const x = parseFloat(xInput.value);
    const y = parseFloat(yInput.value);
    const r = parseFloat(rInput.value);
    let error = "";

    if (isNaN(r) || r < 1 || r > 5) {
        error += "R должно быть в диапазоне от 1 до 5. ";
    }

    if (!error) {
        if (isNaN(x) || Math.abs(x) > 5) {
            error += " X должно быть в диапазоне от "+"-5"+" до "+"5";
        }
        if (isNaN(y) || Math.abs(y) > 5) {
            error += " Y должно быть в диапазоне от "+"-5"+" до "+"5" ;
        }
    }

    if (error) {
        errorMessage.textContent = error;
        submitButton.disabled = true;

        return false;
    } else {
        errorMessage.textContent = "";
        submitButton.disabled = false;
        return true;
    }
}

function handleComplete(xhr, status, args) {
    if(args.validationFailed) {
        validateInput();
    }
}


(function (window, document) {
    document.addEventListener("DOMContentLoaded", init);



    document.addEventListener('DOMContentLoaded', function () {
        const xInput = document.getElementById("pointForm:x");
        const yInput = document.getElementById('pointForm:y');
        const rInput = document.getElementById('pointForm:r');
        const errorMessage = document.getElementById('pointForm:error-message');
        const submitButton = document.getElementById('pointForm:submit-btn');
        [xInput, yInput, rInput].forEach(input => {
            input.addEventListener('keyup', function () {
                validateInput();
            });
        });


    });


    function init() {
        const canvas = document.getElementById("example");
        canvas.width = canvas.parentElement.clientWidth;
        canvas.height = canvas.parentElement.clientHeight;
        clearCanvas();
        drawShapes();
        drawAxes();
        document.getElementById("example").addEventListener("click", handleCanvasClick);
        drawDotsFromBeanTableData();
        drawPoint(0, 0, 0);
    }

    function clearCanvas() {
        const canvas = document.getElementById("example");
        const ctx = canvas.getContext("2d");
        ctx.clearRect(0, 0, canvas.width, canvas.height);
    }

    function drawAxes() {
        const canvas = document.getElementById("example");
        const ctx = canvas.getContext("2d");
        ctx.save();
        ctx.translate(canvas.width / 2, canvas.height / 2);
        ctx.beginPath();

        ctx.moveTo(-canvas.width / 2, 0);
        ctx.lineTo(canvas.width / 2, 0);
        ctx.lineTo(canvas.width / 2 - 5, -5);
        ctx.moveTo(canvas.width / 2, 0);
        ctx.lineTo(canvas.width / 2 - 5, 5);

        ctx.moveTo(0, canvas.height / 2);
        ctx.lineTo(0, -canvas.height / 2);
        ctx.lineTo(5, -canvas.height / 2 + 5);
        ctx.moveTo(0, -canvas.height / 2);
        ctx.lineTo(-5, -canvas.height / 2 + 5);

        const stepX = canvas.width / 3;
        const stepY = canvas.height / 3;

        for (let i = -2; i <= 2; i++) {
            if (i !== 0) {
                ctx.moveTo(i * stepX / 2, -5);
                ctx.lineTo(i * stepX / 2, 5);
            }
        }

        for (let i = -2; i <= 2; i++) {
            if (i !== 0) {
                ctx.moveTo(-5, i * stepY / 2);
                ctx.lineTo(5, i * stepY / 2);
            }
        }

        ctx.strokeStyle = "black";
        ctx.lineWidth = 1;
        ctx.stroke();
        ctx.restore();

        ctx.font = '12px Arial';
        ctx.fillStyle = 'black';

        ctx.font = '12px Arial';
        ctx.fillStyle = 'black';

        ctx.fillText('x', canvas.width / 2 - 15, canvas.height / 2 - 10);
        ctx.fillText('y', canvas.width / 2 + 10, 15 - canvas.height / 2);

        ctx.fillText('R', canvas.width / 3 + canvas.width / 2 - 5, canvas.height / 2 - 10);
        ctx.fillText('R/2', canvas.width / 6 + canvas.width / 2 - 5, canvas.height / 2 - 10);
        ctx.fillText('-R', -canvas.width / 3 + canvas.width / 2 - 15, canvas.height / 2 - 10);
        ctx.fillText('-R/2', -canvas.width / 6 + canvas.width / 2 - 15, canvas.height / 2 - 10);

        ctx.fillText('R', canvas.width / 2 + 10, -canvas.height / 3 + canvas.height / 2 + 5);
        ctx.fillText('R/2', canvas.width / 2 + 10, -canvas.height / 6 + canvas.height / 2 + 5);
        ctx.fillText('-R', canvas.width / 2 + 10, canvas.height / 3 + canvas.height / 2 + 5);
        ctx.fillText('-R/2', canvas.width / 2 + 10, canvas.height / 6 + canvas.height / 2 + 5);
    }

    function drawShapes() {
        const canvas = document.getElementById("example");
        const ctx = canvas.getContext("2d");
        ctx.save();
        ctx.translate(canvas.width / 2, canvas.height / 2);
        ctx.beginPath();
        ctx.moveTo(0, canvas.height / 3);
        ctx.lineTo(canvas.width / 3, 0);
        ctx.lineTo(0, 0);
        ctx.closePath();
        ctx.fillStyle = "rgba(255, 105, 180, 0.7)";
        ctx.fill();
        ctx.fillStyle = "rgba(255, 105, 180, 0.7)";
        ctx.fillRect(0, -canvas.height / 3, canvas.width / 6, canvas.height / 3);
        ctx.beginPath();
        ctx.arc(0, 0, canvas.height / 3, Math.PI / 2, Math.PI);
        ctx.lineTo(0, 0);
        ctx.closePath();
        ctx.fillStyle = "rgba(255, 105, 180, 0.7)";
        ctx.fill();
        ctx.restore();
    }

    function handleCanvasClick(event) {
        const canvas = document.getElementById("example");
        const rect = canvas.getBoundingClientRect();
        const R = document.getElementById("pointForm:r")
        let r = parseFloat(R.value);
        const errorMessage = document.getElementById("pointForm:error-message");
        if (!r || r <= 0) {
            errorMessage.textContent = "Радиус больше нуля";
            return;
        }
        errorMessage.textContent = "";
        const canvasX = event.clientX - rect.left;
        const canvasY = event.clientY - rect.top;
        const centerX = canvas.width / 2;
        const centerY = canvas.height / 2;
        const scaledX = (((canvasX - centerX) / (rect.width / (3 * r)))).toFixed(2);
        const scaledY = (((centerY - canvasY) / (rect.height / (3 * r)))).toFixed(2);
        clearCanvas();
        drawShapes();
        drawAxes();

        drawPoint(scaledX, scaledY, r);

        document.getElementById('pointForm:x').value=scaledX;
        document.getElementById('pointForm:y').value=scaledY;
        document.getElementById('pointForm:submit-btn');
        // sendRequest(scaledX, scaledY, r);
        if(validateInput()){
            document.getElementById('pointForm:submit-btn').click();}
    }

    function drawPoint(x, y, r) {
        const canvas = document.getElementById("example");
        const ctx = canvas.getContext("2d");
        ctx.save();
        ctx.translate(canvas.width / 2, canvas.height / 2);
        const c = canvas.width / 3;
        let pointX = x * (c / r);
        let pointY = -(y * (c / r));
        ctx.beginPath();
        ctx.arc(pointX, pointY, 4, 0, 2 * Math.PI);
        ctx.fillStyle = "white";
        ctx.fill();
        ctx.restore();
    }

    function drawDotsFromBeanTableData() {
        const tbody = document.querySelector("#results_data");
        const canvas = document.getElementById("example");
        const ctx = canvas.getContext("2d");
        ctx.save();
        ctx.translate(canvas.width / 2, canvas.height / 2);
        const c = canvas.width / 3;
        tbody.childNodes.forEach((tr) => {
            const data = Array.from(tr.childNodes)
                .map((th) => th.textContent.trim())
                .filter((text) => text !== "");
            if (data.length === 4) {
                const x = (Number(data[0]) * c) / Number(data[2]);
                const y = -(Number(data[1]) * c) / Number(data[2]);
                const isHit = data[3] === "true";
                ctx.beginPath();
                ctx.arc(x, y, 4, 0, 2 * Math.PI);
                ctx.fillStyle = isHit ? "green" : "red";
                ctx.fill();
            }
        });
        ctx.restore();
    }
})(window, document);
