const $ = (selectName) => {
   return document.querySelector(selectName)
}
const $$ = (selectName) => {
 return document.querySelectoAll(selectName);
};

// DYNAMIC CREATE ELEMENT=========//


const createElement = (tagName, className, content) => {
 const newEelement = document.createElement(tagName);
 if (className) {
   newEelement.setAttribute("class", className);
 }
 if (content) {
   newEelement.innerHTML = content;
 }
 return newEelement;
};