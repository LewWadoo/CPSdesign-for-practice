import '../scss/style.scss';

import Swiper from '../../node_modules/swiper/js/swiper.min.js';

import {
    classHeader,
    modifierHidden,
    modifierVisible,
    elementSeparator,
    classHeaderButtonIcon
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

import {classContent} from '../blocks/content/content.js'
import {createSelector, destroySelector} from '../blocks/selector/selector.js'
import {classButtonIcon, classButtonIconChat, classButtonIconCross, classButtonIconBurger, classButtonIconCall
} from "../blocks/button-icon/button-icon";
import {classBurgerMenu, classBurgerMenuHeader} from "../blocks/burger-menu/burger-menu";
import {
    classFormFeedback,
    classFormFeedbackHidden,
    classFormFeedbackVisible,
    // formFeedback
} from "../blocks/form-feedback/form-feedback";
import {
    classFormCall,
    classFormCallHidden,
    classFormCallVisible
} from "../blocks/form-call/form-call";

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
const classSwiperPaginationClickable = classSwiperPagination + prefix + "clickable"
const classSwiperSlide = classSwiperPrefix + 'slide';

// const moreAndContent = document.querySelector(classPrefix + classContent + ' > ' + classPrefix + classMore)
const moreAndContent = document.getElementById("more-content")
// console.log(moreAndContent)
// const moreBrands = document.getElementById('more-brands');
// const moreDevices = document.getElementById('more-devices');

const swipers = document.querySelectorAll(classPrefix + classSwiper);
// console.log(swipers)
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
    // console.log("in createSwipers")
    for (let i = 0; i < swipers.length; i++) {
        // console.log(swiperWrappers[i])
        if (!swiperWrappers[i].classList.contains(classSwiperWrapper)) {
            swiperWrappers[i].classList.add(classSwiperWrapper);
        }
        // console.log(swiperWrappers[i])
        // console.log(swiperPaginations[i])
        if (!swiperPaginations[i].classList.contains(classSwiperPagination)) {
            swiperPaginations[i].classList.add(classSwiperPagination);
        }
        // console.log(swiperPaginations[i])
        // console.log(swiperSlides[i])
        swiperSlides[i].forEach(slide => {
            if (!slide.classList.contains(classSwiperSlide)) {
                slide.classList.add(classSwiperSlide);
            }
        });
        // console.log(swiperSlides[i])
        // console.log(swiperObject);
    }
    swiperObject = new Swiper(classPrefix + classSwiperContainer, swiperOptions);
};

const destroySwipers = function () {
    for (let i = 0; i < swipers.length; i++) {
        if (typeof (swiperObject) != 'undefined') {
            // console.log(swiperObject[i])
            swiperObject[i].destroy(true, true);
        }
        // console.log(swiperWrappers[i])
        if (swiperWrappers[i].classList.contains(classSwiperWrapper)) {
            swiperWrappers[i].classList.remove(classSwiperWrapper);
        }
        // console.log(swiperWrappers[i])
        // console.log(swiperPaginations[i])
        if (swiperPaginations[i].classList.contains(classSwiperPagination)) {
            swiperPaginations[i].classList.remove(classSwiperPagination);
        }
        // if (swiperPaginations[i].classList.contains(classSwiperPaginationClickable)) {
        //     swiperPaginations[i].classList.remove(classSwiperPaginationClickable);
        // }
        // console.log(swiperPaginations[i])
        // console.log(swiperSlides[i])
        swiperSlides[i].forEach(slide => {
            if (slide.classList.contains(classSwiperSlide)) {
                slide.classList.remove(classSwiperSlide);
            }
        });
    }
};

let clientWidthCurrent = document.body.clientWidth;
let clientWidthPrevious = clientWidthCurrent;

const moreAndSwipers = document.querySelectorAll(classPrefix + classSwiper + classPrefix + classMore);
const swiperServices = document.getElementById("swiper-services")
// const classPriceListTable = "price-list__table"
// const priceListTable = swiperServices.querySelector(classPrefix + classPriceListTable)

// const destroyPriceListTable = function () {
//     if (priceListTable.classList.contains(classPriceListTable)) {
//         priceListTable.classList.remove(classPriceListTable)
//     }
// }

const toggleSwiperResolution = function () {
    createSwipers();
    moreAndSwipers.forEach(moreAndSwiper => {
        if (moreAndSwiper.classList.contains(classMore)) {
            destroyMore(moreAndSwiper)
            // destroySelector(moreAndSwiper)
            // destroyPriceListTable()
        }
    })
}

const toggleMoreResolution = function () {
    moreAndSwipers.forEach(moreAndSwiper => {
        if (!moreAndSwiper.classList.contains(classMore)) {
            createMore(moreAndSwiper, classSwiperContainer)
            // createSelector(moreAndSwiper)
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
        // console.log(moreContent)
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

// for (let i = 0; i < mores.length; i++) {
//     // moreTexts[i] = mores[i].querySelector(classPrefix + classMoreText);
//     moreContents[i] = mores[i].querySelector(classPrefix + classMoreContent);
//     moreImages[i] = mores[i].querySelector(classPrefix + classMoreImage);
//     addMoreClickListener(mores[i], moreImages[i], moreTexts[i], moreContents[i])
// }


// const hideHeaderItem = function (item) {
//     if (item.classList.contains(classHeaderItem + modifierVisible)) {
//         item.classList.replace(classHeaderItem + modifierVisible, classHeaderItem + modifierHidden)
//     } else if (!(item.classList.contains(classHeaderItem + modifierVisible) || (item.classList.contains(classHeaderItem + modifierHidden)))) {
//         item.classList.add(classHeaderItem + modifierHidden)
//     }
// }

// const hideSearch = function () {
//     if (headerSearch.classList.contains(classHeaderItem + modifierVisible)) {
//         headerSearch.classList.replace(classHeaderItem + modifierVisible, classHeaderItem + modifierHidden)
//     } else if (!(headerSearch.classList.contains(classHeaderItem + modifierVisible) || (headerSearch.classList.contains(classHeaderItem + modifierHidden)))) {
//         headerSearch.classList.add(classHeaderItem + modifierHidden)
//     }
// }

const classPage = "page"
const classPageHeader = classPage + elementSeparator + "header"
const pageHeader = document.querySelector(classPrefix + classHeader + classPrefix + classPageHeader);
const burger = pageHeader.querySelector(classPrefix + classButtonIconBurger);
const burgerMenu = document.querySelector(classPrefix + classBurgerMenu)
const cross = burgerMenu.querySelector(classPrefix + classButtonIconCross)

const hideMenu = function () {
    burgerMenu.classList.replace(classBurgerMenu + modifierVisible, classBurgerMenu + modifierHidden)
    document.removeEventListener("mouseup", closeMenuEventListener)
}

const showMenu = function () {
    burgerMenu.classList.replace(classBurgerMenu + modifierHidden, classBurgerMenu + modifierVisible)
    const headerButtonIconCross = burgerMenu.querySelector(classPrefix + classHeaderButtonIcon + classPrefix + classButtonIconCross)
    if (clientWidthCurrent >= resolutionPadToPC) {
        headerButtonIconCross.classList.replace(classHeaderButtonIcon + modifierVisible, classHeaderButtonIcon + modifierHidden)
    } else {
        headerButtonIconCross.classList.replace(classHeaderButtonIcon + modifierHidden, classHeaderButtonIcon + modifierVisible)
        document.addEventListener('mouseup', closeMenuEventListener)
    }
}

const closeMenuEventListener = function (evt) {
    if (clientWidthCurrent >= resolutionPadToPC) {
        return;
    }
    let targetElement = evt.target; // clicked element

    do {
        if (targetElement === burgerMenu) {
            // This is a click inside. Do nothing, just return.
            // document.getElementById("flyout-debug").textContent = "Clicked inside!";
            return;
        }
        // Go up the DOM
        targetElement = targetElement.parentNode;
    } while (targetElement);
    // if (evt.target !== burgerMenu && evt.target.parentNode !== burgerMenu) {
        hideMenu()
    // }
}

const formFeedback = document.querySelector(classPrefix + classFormFeedback)
const crossFormFeedback = formFeedback.querySelector(classPrefix + classButtonIconCross)

crossFormFeedback.addEventListener('click', function (evt) {
    hideFormFeedback()
})

const showFormFeedback = function () {
    formFeedback.classList.replace(classFormFeedbackHidden, classFormFeedbackVisible)
    document.addEventListener("mouseup", closeFormFeedbackListener)
}

const hideFormFeedback = function () {
    formFeedback.classList.replace(classFormFeedbackVisible, classFormFeedbackHidden)
    document.removeEventListener("mouseup", closeFormFeedbackListener)
}

const closeFormFeedbackListener = function (evt) {
    let targetElement = evt.target; // clicked element

    do {
        if (targetElement === formFeedback) {
            // This is a click inside. Do nothing, just return.
            // document.getElementById("flyout-debug").textContent = "Clicked inside!";
            return;
        }
        // Go up the DOM
        targetElement = targetElement.parentNode;
    } while (targetElement);
    // if (evt.target !== burgerMenu && evt.target.parentNode !== burgerMenu) {
    hideFormFeedback()
    // }
}

const formCall = document.querySelector(classPrefix + classFormCall)
const crossFormCall = formCall.querySelector(classPrefix + classButtonIconCross)

crossFormCall.addEventListener('click', function (evt) {
    hideFormCall()
})

const showFormCall = function () {
    formCall.classList.replace(classFormCallHidden, classFormCallVisible)
    document.addEventListener("mouseup", closeFormCallListener)
}

const hideFormCall = function () {
    formCall.classList.replace(classFormCallVisible, classFormCallHidden)
    document.removeEventListener("mouseup", closeFormCallListener)
}

const closeFormCallListener = function (evt) {
    let targetElement = evt.target; // clicked element

    do {
        if (targetElement === formCall) {
            // This is a click inside. Do nothing, just return.
            // document.getElementById("flyout-debug").textContent = "Clicked inside!";
            return;
        }
        // Go up the DOM
        targetElement = targetElement.parentNode;
    } while (targetElement);
    // if (evt.target !== burgerMenu && evt.target.parentNode !== burgerMenu) {
    hideFormCall()
    // }
}

burger.addEventListener('click', function (evt) {
    showMenu()
})

cross.addEventListener('click', function (evt) {
    hideMenu()
})

document.addEventListener('keydown', function (evt) {
    if (evt.key == 'Escape') {
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
    // console.log(clientWidthPrevious)
    // console.log(clientWidthCurrent)
    if ((clientWidthCurrent <= resolutionMobileToPad && clientWidthPrevious > resolutionMobileToPad) || (clientWidthCurrent > resolutionMobileToPad && clientWidthPrevious <= resolutionMobileToPad)) {
        clientWidthPrevious = clientWidthCurrent
        toggleResolution()
    }
    if ((clientWidthCurrent <= resolutionPadToPC && clientWidthPrevious > resolutionPadToPC) || (clientWidthCurrent > resolutionPadToPC && clientWidthPrevious <= resolutionPadToPC)) {
        clientWidthPrevious = clientWidthCurrent
        toggleResolution()
    }
}
