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
    document.querySelectorAll("button").forEach(b => b.setAttribute("disabled", true))
}

function enableButtons() {
    document.querySelectorAll("button").forEach(b => b.removeAttribute("disabled"))
}

//function to allow clipboard copies
function copyToClipboard(text) {
    navigator.clipboard.writeText(text);
}
window.copyToClipboard = copyToClipboard;
