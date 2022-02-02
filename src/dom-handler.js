//refernce https://stackoverflow.com/questions/16483560/how-to-implement-dom-data-binding-in-javascript

function dataBind(domElement, obj) {
    var bind = domElement.getAttribute("bind").split(":");
    var domAttr = bind[0].trim(); // the attribute on the DOM element
    var itemAttr = bind[1].trim(); // the attribute the object

    // when the object changes - update the DOM
    Object.observe(obj, function (change) {
        domElement[domAttr] = obj[itemAttr];
    });
    // when the dom changes - update the object
    new MutationObserver(updateObj).observe(domElement, {
        attributes: true,
        childList: true,
        characterData: true,
    });
    domElement.addEventListener("keyup", updateObj);
    domElement.addEventListener("click", updateObj);
    function updateObj() {
        obj[itemAttr] = domElement[domAttr];
    }
    // start the cycle by taking the attribute from the object and updating it.
    domElement[domAttr] = obj[itemAttr];
}
