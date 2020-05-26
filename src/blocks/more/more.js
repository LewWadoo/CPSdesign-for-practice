export const classMore = 'more'
export const classPrefix = '.'
export const classMoreContent = classMore + '__content';
export const classMoreButton = classMore + '__button';
export const classMoreImage = classMore + '__image';
export const classMoreText = classMore + '__text';
const classModifierExpand = '--expand';
const classModifierHide = '--hide';
const classModifierHidden = '--hidden';
const classModifierShrinked = '--shrinked';
export const classMoreImageExpand = classMoreImage + classModifierExpand;
export const classMoreImageHide = classMoreImage + classModifierHide;
const classMoreButtonHidden = classMoreButton + classModifierHidden;
export const classMoreContentShrinked = classMoreContent + classModifierShrinked;

export let mores = document.querySelectorAll(classPrefix + classMore);
export let moreContents = []
export let moreImages = []
export let moreButtons = []
const addClickListener = function (moreButtons, moreImage) {
    moreButtons.addEventListener('click', function () {
        if (moreImage.classList.contains(classMoreImageExpand)) {
            moreImage.classList.replace(classMoreImageExpand, classMoreImageHide);
        } else if (moreImage.classList.contains(classMoreImageHide)) {
            moreImage.classList.replace(classMoreImageHide, classMoreImageExpand);
        }
    })
}
for (let i = 0; i < mores.length; i++) {
    moreButtons[i] = mores[i].querySelector(classPrefix + classMoreButton);
    moreImages[i] = mores[i].querySelector(classPrefix + classMoreImage);
    addClickListener(moreButtons[i], moreImages[i]);
}

export const destroyMore = function (more) {
    more.classList.remove(classMore)
    let moreContent = more.querySelector(classPrefix + classMoreContent);
    if (moreContent !== null) {
    moreContent.classList.remove(classMoreContent)
    }
    let moreContentShrinked = more.querySelector(classPrefix + classMoreContentShrinked);
    if (moreContentShrinked !== null) {
        moreContentShrinked.classList.remove(classMoreContentShrinked)
    }
    let moreButton = more.querySelector(classPrefix + classMoreButton);
    if ((moreButton !== null) && (!moreButton.classList.contains(classMoreButtonHidden))) {
        moreButton.classList.add(classMoreButtonHidden)
    }
}

export const createMore = function (more, moreContentPlaceholderClass) {
    more.classList.add(classMore)
    let moreContentPlaceholder = more.querySelector(classPrefix + moreContentPlaceholderClass);
    moreContentPlaceholder.classList.add(classMoreContent)
    moreContentPlaceholder.classList.add(classMoreContentShrinked)
    let moreButton = more.querySelector(classPrefix + classMoreButton);
    moreButton.classList.remove(classMoreButtonHidden)
}