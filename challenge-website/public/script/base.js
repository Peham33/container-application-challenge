window.testCases = (window.testCases || []);

window.renderAll = function() {
    for (let testCase of testCases) {
        testCase.render()
    }
    runTests()
}

//execute all tests
async function runTests() {
    disableButtons();
    for (let testCase of testCases) {
        await testCase.execute();
    }
    enableButtons();
}

//button runs all tests
const runTestsBtn = document.getElementById("run-tests");
runTestsBtn.addEventListener("click", runTests);

//functions to enable/disable the runTest button
function disableButtons() {
    document.querySelectorAll("button:not(.always-enabled)")
        .forEach(b => b.setAttribute("disabled", true))
}

function enableButtons() {
    document.querySelectorAll("button:not(.always-disabled)")
        .forEach(b => b.removeAttribute("disabled"))
    enableSuccessButton();
}

//try to enable success button
function enableSuccessButton(){
    const compose = "compose";
    const kubernetes = "kubernetes";
    const siteNr = "3";

    let winName = window.location.pathname.split("/").pop();
    if(winName.includes(siteNr)){
        if(winName.includes(compose)){
            var res = checkSuccess(compose);
        }else if(winName.includes(kubernetes)){
            var res = checkSuccess(kubernetes);
        }
        document.getElementById("next").disabled = !res;
    }
}

//check if all tests for site are completed
function checkSuccess(site){
    var values = [];
    var keys = Object.keys(sessionStorage);
    keys = keys.filter(e => e.includes(site));
    keys.forEach(k => values.push(sessionStorage.getItem(k)));
    return values.every(v => v === 'true');
}

//function to allow clipboard copies
function copyToClipboard(text) {
    navigator.clipboard.writeText(text);
}
window.copyToClipboard = copyToClipboard;