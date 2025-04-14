function openDialog(id) {
    let dialogref = document.getElementById(id);
    dialogref.classList.remove('d_none');
}

function closeAllOpenedElements() {
    const openElements = document.querySelectorAll('[open]');

    openElements.forEach(element => {
        if (element.getAttribute('closable') === 'true') {
            element.setAttribute('open', 'false');
        }
    });
}

function stopProp(event) {
    event.stopPropagation()
}

function closeDialog(id) {
    let dialogref = document.getElementById(id);
    dialogref.classList.add('d_none');
}

function toggleOpen(element) {
    const isOpen = element.getAttribute('open') === 'true';
    element.setAttribute('open', !isOpen);
}

function toggleOpenId(id) {
    element = document.getElementById(id)
    const isOpen = element.getAttribute('open') === 'true';
    element.setAttribute('open', !isOpen);
}

function closeOpenId(id) {
    element = document.getElementById(id)
    element.setAttribute('open', 'false');
}

function activateRadio(element) {
    const radioInput = element.querySelector('input[type="radio"]');
    if (radioInput) {
        radioInput.checked = true;
    }
}

function updateStars(star) {
    const starContainer = star.parentNode;
    const stars = starContainer.querySelectorAll('img');
    let index = Array.from(stars).indexOf(star);

    for (let i = 0; i < stars.length; i++) {
        if (i <= index) {
            stars[i].src = './assets/icons/kid_star.svg';
        } else {
            stars[i].src = './assets/icons/kid_star_empty.svg';
        }
    }
}

function formatToMonthYear(dateString) {
    const date = new Date(dateString);
    const month = date.toLocaleString('default', { month: 'long' });
    const year = date.getFullYear();
    return `${month} ${year}`;
}

function formatToMonthYearAndDay(dateString) {
    const date = new Date(dateString);
    const month = date.toLocaleString('default', { month: 'long' });
    const year = date.getFullYear();
    const day = date.getDate();
    return `${day}. ${month} ${year}`;
}

function formatDate(dateString) {
    const date = new Date(dateString);
    const options = { day: 'numeric', month: 'long', year: 'numeric' };
    const formattedDate = date.toLocaleDateString('de-DE', options);

    return formattedDate.replace(',', '');
}

function getPersonImgPath(filepath) {
    if (filepath) {
        return filepath.replace('http://127.0.0.1:8000', 'https://v2202411136713300836.megasrv.de');
    }
    else {
        return "./assets/icons/profile_pic.svg"
    }
}

function getOfferImgPath(filepath) {
    if (filepath) {
        if (filepath.startsWith('http')) {
            return filepath
        } else {
            return STATIC_BASE_URL + filepath
        }
    } else {
        return "./assets/img/placeholder.jpg"
    }
}

function showToastMessage(error = true, msg = []) {
    const toast = document.createElement('div');
    toast.className = 'toast_msg d_flex_cc_gm';
    toast.innerHTML = getToastHTML(msg, error);
    toast.setAttribute('error', error);
    document.body.appendChild(toast);

    setTimeout(() => {
        toast.remove();
    }, 2500);
}

function showToastHint(msg = []) {
    const toast = document.createElement('div');
    toast.className = 'toast_msg d_flex_cc_gm';
    toast.innerHTML = getToastHintHTML(msg);
    document.body.appendChild(toast);
    toast.setAttribute('hint', true);

    setTimeout(() => {
        toast.remove();
    }, 2500);
}

function getToastHintHTML(msg) {
    return `<div class="toast_msg_left d_flex_cc_gm">
                <img error="false" src="./assets/icons/check_circle_white.svg" alt="" srcset="">
            </div>
            <div class="toast_msg_hint">
                <h3>Hinweis</h3>
                <p class="w_full">
                    ${msg}
                </p>
            </div>`
}

function getToastHTML(msg, error) {
    let msglist = "";
    if (msg.length <= 0) {
        msglist = error ? "<li>Es ist ein Fehler aufgetreten</li>" : "<li>Das hat geklappt!</li>"
    }
    for (let i = 0; i < msg.length; i++) {
        msglist += `<li>${msg[i]}</li>`
    }

    return `<div class="toast_msg_left d_flex_cc_gm">
                <img error="false" src="./assets/icons/check_circle_white.svg" alt="" srcset="">
                <img error="true" src="./assets/icons/error_circle_white.svg" alt="" srcset="">
            </div>
            <div class="toast_msg_right">
                <h3 error="false">Success</h3>
                <h3 error="true">Error</h3>
                <ul class="w_full">
                    ${msglist}
                </ul>
            </div>`
}

function extractErrorMessages(errorObject) {
    let errorMessages = [];

    for (let key in errorObject) {
        if (errorObject.hasOwnProperty(key)) {
            const value = errorObject[key];
            if (typeof value === 'object' && value !== null) {
                errorMessages = errorMessages.concat(extractErrorMessages(value));
            } else {
                errorMessages = errorMessages.concat(value);
            }
        }
    }

    return errorMessages;
}


function toggleReviewAddBtn() {
    if (currentUser.type == "business") {
        document.getElementById('review_add_btn').classList.add('d_none')
    }
}

function togglePassword(element) {
    const parent = element.parentElement;
    const passwordField = parent.querySelector('input');
    const type = passwordField.type === 'password' ? 'text' : 'password';
    passwordField.type = type;
    element.innerHTML = type === 'password' ? '<img src="./assets/icons/visibility.svg" alt="" srcset="">' : '<img src="./assets/icons/visibility_off.svg" alt="" srcset="">';
}