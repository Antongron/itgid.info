const buttonYes = document.querySelector('.yes');
const buttonNo = document.querySelector('.no');
const container = document.querySelector('.container');
const popupMessages = document.querySelector('.popup-messages'); // Popup container
const popupCountMessages = document.querySelectorAll('.popup-count-1, .popup-count-2, .popup-count-3, .popup-count-4');

let buttonYesFontSize = 2;
let buttonNoFontSize = 2;
let counter = 0;

// Initially hide all popup messages
popupMessages.style.display = 'none';

buttonNo.addEventListener('click', function () {
    doYesMore();
    moveButtonNoRandomly();
});

buttonYes.addEventListener('click', function () {
    buttonYesPushed();
});

function doYesMore() {
    if (counter === 0) {
        container.setAttribute('class', 'container container-counter-1');
        showPopupMessage(0);
    } else if (counter === 1) {
        showPopupMessage(1);
        // Show popup message for count 2
    } else if (counter === 2) {
        // Show popup message for count 3
        showPopupMessage(2);
    } else if (counter === 3) {
        // Show popup message for count 4
        showPopupMessage(3);
        buttonNo.remove();
    }
    counter++;

    console.log('counter', counter);
    
    buttonYesFontSize += 0.4;
    buttonYes.style.fontSize = buttonYesFontSize + 'em';

    buttonNoFontSize = Math.max(1, buttonNoFontSize - 0.2); // Prevents it from becoming too small
    buttonNo.style.fontSize = buttonNoFontSize + 'em';
}

function moveButtonNoRandomly() {
    const viewportWidth = window.innerWidth;
    const viewportHeight = window.innerHeight;

    const buttonWidth = buttonNo.offsetWidth;
    const buttonHeight = buttonNo.offsetHeight;

    // Generate random positions within the viewport
    const randomX = Math.random() * (viewportWidth - buttonWidth);
    const randomY = Math.random() * (viewportHeight - buttonHeight);

    buttonNo.style.position = 'absolute'; // Ensure it's positioned absolutely
    buttonNo.style.left = `${randomX}px`;
    buttonNo.style.top = `${randomY}px`;
}

function buttonYesPushed() {
    location.href = './page2.html';
}

function showPopupMessage(index) {
    // Show popup messages container
    popupMessages.style.display = 'block';
    
    // Hide all popup count messages
    popupCountMessages.forEach(message => {
        message.style.display = 'none';
    });

    // Show the message corresponding to the current counter
    popupCountMessages[index].style.display = 'block';
}
