import '../scss/style.scss';

import Swiper from '../../node_modules/swiper/js/swiper.min.js';

import {
    classHeader,
    classHeaderButtonIcon,
    elementSeparator,
    modifierHidden,
    modifierVisible
} from "../blocks/header/header.js";

import {
    classMore,
    classMoreButton,
    classMoreContent,
    classMoreContentShrinked,
    classMoreText,
    classPrefix,
    createMore,
    destroyMore
} from "../blocks/more/more";

import {
    classButtonIconBurger,
    classButtonIconCall,
    classButtonIconChat,
    classButtonIconCross
} from "../blocks/button-icon/button-icon";
import {classBurgerMenu} from "../blocks/burger-menu/burger-menu";
import {classFormHidden, classFormVisible,} from "../blocks/form-feedback/form";
import {classScreenBlurHidden, classScreenBlurVisible} from "../blocks/screen-blur/screen-blur";

const resolutionMobileToPad = 768;
const resolutionPadToPC = 1366;
const swiperOptions = {
    slidesPerView: 1,
    spaceBetween: 16,
    grabCursor: true,
    pagination: {
        el: '.swiper-pagination',
        clickable: true,
    },
}

const classSwiper = 'swiper';
const prefix = '-'
const classSwiperPrefix = classSwiper + prefix;
const classSwiperContainer = classSwiperPrefix + 'container';
const classSwiperWrapper = classSwiperPrefix + 'wrapper';
const classSwiperPagination = classSwiperPrefix + 'pagination';
const classSwiperSlide = classSwiperPrefix + 'slide';

const swipers = document.querySelectorAll(classPrefix + classSwiper);
let swiperObject;
let swiperContainers = [];
let swiperWrappers = [];
let swiperPaginations = [];
let swiperSlides = [];
for (let i = 0; i < swipers.length; i++) {
    swiperContainers[i] = swipers[i].querySelector(classPrefix + classSwiperContainer);
    swiperWrappers[i] = swipers[i].querySelector(classPrefix + classSwiperWrapper);
    swiperPaginations[i] = swipers[i].querySelector(classPrefix + classSwiperPagination);
    swiperSlides[i] = swipers[i].querySelectorAll(classPrefix + classSwiperSlide);
}

const createSwipers = function () {
    for (let i = 0; i < swipers.length; i++) {
        if (!swiperWrappers[i].classList.contains(classSwiperWrapper)) {
            swiperWrappers[i].classList.add(classSwiperWrapper);
        }
        if (!swiperPaginations[i].classList.contains(classSwiperPagination)) {
            swiperPaginations[i].classList.add(classSwiperPagination);
        }
        swiperSlides[i].forEach(slide => {
            if (!slide.classList.contains(classSwiperSlide)) {
                slide.classList.add(classSwiperSlide);
            }
        });
    }
    swiperObject = new Swiper(classPrefix + classSwiperContainer, swiperOptions);
};

const destroySwipers = function () {
    for (let i = 0; i < swipers.length; i++) {
        if (typeof (swiperObject) != 'undefined') {
            swiperObject[i].destroy(true, true);
        }
        if (swiperWrappers[i].classList.contains(classSwiperWrapper)) {
            swiperWrappers[i].classList.remove(classSwiperWrapper);
        }
        if (swiperPaginations[i].classList.contains(classSwiperPagination)) {
            swiperPaginations[i].classList.remove(classSwiperPagination);
        }
        swiperSlides[i].forEach(slide => {
            if (slide.classList.contains(classSwiperSlide)) {
                slide.classList.remove(classSwiperSlide);
            }
        });
    }
};

let clientWidthCurrent = document.body.clientWidth;
let clientWidthPrevious = clientWidthCurrent;

const moreAndContent = document.getElementById("more-content")
const moreAndSwipers = document.querySelectorAll(classPrefix + classSwiper + classPrefix + classMore);

const toggleSwiperResolution = function () {
    createSwipers();
    moreAndSwipers.forEach(moreAndSwiper => {
        if (moreAndSwiper.classList.contains(classMore)) {
            destroyMore(moreAndSwiper)
        }
    })
}

const toggleMoreResolution = function () {
    moreAndSwipers.forEach(moreAndSwiper => {
        if (!moreAndSwiper.classList.contains(classMore)) {
            createMore(moreAndSwiper, classSwiperContainer)
        }
    });
    destroySwipers();
}

const textContentShowAll = 'Показать все';
const textContentReadMore = 'Читать далее';
const textContentHide = 'Скрыть';

const addMoreClickListener = function (more, textToShrink, textToExpand) {
    const moreButton = more.querySelector(classPrefix + classMoreButton);
    moreButton.addEventListener('click', function () {
        const moreText = more.querySelector(classPrefix + classMoreText)
        const moreContent = more.querySelector(classPrefix + classMoreContent)
        if (moreContent.classList.contains(classMoreContentShrinked)) {
            moreContent.classList.remove(classMoreContentShrinked);
            moreText.textContent = textToShrink;
        } else {
            moreContent.classList.add(classMoreContentShrinked);
            moreText.textContent = textToExpand;
        }
    })
}

addMoreClickListener(moreAndContent, textContentHide, textContentReadMore);
addMoreClickListener(moreAndSwipers[0], textContentHide, textContentShowAll);
addMoreClickListener(moreAndSwipers[1], textContentHide, textContentShowAll);

const classPage = "page"
const classPageHeader = classPage + elementSeparator + "header"
const pageHeader = document.querySelector(classPrefix + classHeader + classPrefix + classPageHeader);
const burger = pageHeader.querySelector(classPrefix + classButtonIconBurger);
const burgerMenu = document.querySelector(classPrefix + classBurgerMenu)
const cross = burgerMenu.querySelector(classPrefix + classButtonIconCross)

const hideMenu = function () {
    if (clientWidthCurrent >= resolutionPadToPC) {
        return
    }
    burgerMenu.classList.replace(classBurgerMenu + modifierVisible, classBurgerMenu + modifierHidden)
    // document.removeEventListener("mouseup", closeMenuEventListener)
}

const showMenu = function () {
    burgerMenu.classList.replace(classBurgerMenu + modifierHidden, classBurgerMenu + modifierVisible)
    const headerButtonIconCross = burgerMenu.querySelector(classPrefix + classHeaderButtonIcon + classPrefix + classButtonIconCross)
    if (clientWidthCurrent >= resolutionPadToPC) {
        headerButtonIconCross.classList.replace(classHeaderButtonIcon + modifierVisible, classHeaderButtonIcon + modifierHidden)
    } else if (clientWidthCurrent >= resolutionMobileToPad && clientWidthCurrent <= resolutionPadToPC) {
        showScreenBlur()
        headerButtonIconCross.classList.replace(classHeaderButtonIcon + modifierHidden, classHeaderButtonIcon + modifierVisible)
    } else {
        headerButtonIconCross.classList.replace(classHeaderButtonIcon + modifierHidden, classHeaderButtonIcon + modifierVisible)
        // document.addEventListener('mouseup', closeMenuEventListener)
    }
}

// const closeMenuEventListener = function (evt) {
//     if (clientWidthCurrent >= resolutionPadToPC) {
//         return;
//     }
//     let targetElement = evt.target; // clicked element
//
//     do {
//         if (targetElement === burgerMenu) {
//             // This is a click inside. Do nothing, just return.
//             return;
//         }
//         // Go up the DOM
//         targetElement = targetElement.parentNode;
//     } while (targetElement);
//     hideMenu()
// }

const formFeedback = document.getElementById("form-feedback")
const crossFormFeedback = formFeedback.querySelector(classPrefix + classButtonIconCross)

crossFormFeedback.addEventListener('click', function (evt) {
    hideFormFeedback()
})

// const showFormFeedback = function () {
//     formFeedback.classList.replace(classFormHidden, classFormVisible)
//     document.addEventListener("mouseup", closeFormFeedbackListener)
// }
//
// const hideFormFeedback = function () {
//     formFeedback.classList.replace(classFormVisible, classFormHidden)
//     document.removeEventListener("mouseup", closeFormFeedbackListener)
// }

// const closeFormFeedbackListener = function (evt) {
//     let targetElement = evt.target; // clicked element
//
//     do {
//         if (targetElement === formFeedback) {
//             // This is a click inside. Do nothing, just return.
//             return;
//         }
//         // Go up the DOM
//         targetElement = targetElement.parentNode;
//     } while (targetElement);
//     hideFormFeedback()
// }

const formCall = document.getElementById("form-call")
const crossFormCall = formCall.querySelector(classPrefix + classButtonIconCross)

crossFormCall.addEventListener('click', function (evt) {
    hideFormCall()
})

const hideScreenBlur = function () {
    screenBlur.classList.replace(classScreenBlurVisible, classScreenBlurHidden)
}

const showScreenBlur = function () {
    screenBlur.classList.replace(classScreenBlurHidden, classScreenBlurVisible)
}

const screenBlur = document.querySelector(classPrefix + "screen-blur")

const showFormCall = function () {
    formCall.classList.replace(classFormHidden, classFormVisible)
    showScreenBlur()
}

const hideFormCall = function () {
    formCall.classList.replace(classFormVisible, classFormHidden)
    hideScreenBlur()
}

const showFormFeedback = function () {
    formFeedback.classList.replace(classFormHidden, classFormVisible)
    showScreenBlur()
}

const hideFormFeedback = function () {
    formFeedback.classList.replace(classFormVisible, classFormHidden)
    hideScreenBlur()
}

screenBlur.addEventListener("mouseup", function (evt) {
// hideScreenBlur()
    hideFormCall()
    hideFormFeedback()
    hideMenu()
})

// const closeFormCallListener = function (evt) {
//     let targetElement = evt.target; // clicked element
//
//     do {
//         if (targetElement === formCall) {
//             // This is a click inside. Do nothing, just return.
//             return;
//         }
//         // Go up the DOM
//         targetElement = targetElement.parentNode;
//     } while (targetElement);
//     hideFormCall()
// }

burger.addEventListener('click', function (evt) {
    showMenu()
})

cross.addEventListener('click', function (evt) {
    hideMenu()
})

document.addEventListener('keydown', function (evt) {
    if (evt.key === 'Escape') {
        hideMenu()
    }
})

const feedbackButtons = document.querySelectorAll(classPrefix + classButtonIconChat);

const addFeedbackClickListener = function (feedbackButton) {
    feedbackButton.addEventListener('click', function () {
        showFormFeedback()
        if (clientWidthCurrent < resolutionPadToPC) {
            hideMenu()
        }
    })
}

for (let i = 0; i < feedbackButtons.length; i++) {
    addFeedbackClickListener(feedbackButtons[i])
}

const callButtons = document.querySelectorAll(classPrefix + classButtonIconCall);

const addCallClickListener = function (callButton) {
    callButton.addEventListener('click', function () {
        showFormCall()
        if (clientWidthCurrent < resolutionPadToPC) {
            hideMenu()
        }
    })
}

for (let i = 0; i < callButtons.length; i++) {
    addCallClickListener(callButtons[i])
}

const toggleResolution = function () {
    if (clientWidthCurrent <= resolutionMobileToPad) {
        toggleSwiperResolution()
    } else if (clientWidthCurrent > resolutionMobileToPad) {
        toggleMoreResolution()
    }
    if (clientWidthCurrent >= resolutionPadToPC) {
        showMenu()
    } else {
        hideMenu()
    }
}

toggleResolution()

window.onresize = function (event) {
    clientWidthCurrent = document.body.clientWidth;
    if ((clientWidthCurrent <= resolutionMobileToPad && clientWidthPrevious > resolutionMobileToPad) || (clientWidthCurrent > resolutionMobileToPad && clientWidthPrevious <= resolutionMobileToPad)) {
        clientWidthPrevious = clientWidthCurrent
        toggleResolution()
    }
    if ((clientWidthCurrent <= resolutionPadToPC && clientWidthPrevious > resolutionPadToPC) || (clientWidthCurrent > resolutionPadToPC && clientWidthPrevious <= resolutionPadToPC)) {
        clientWidthPrevious = clientWidthCurrent
        toggleResolution()
    }
}
