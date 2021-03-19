import json from "../../server/mockAPI";

function handleSubmit(event) {
    event.preventDefault()
    let objUrlElement = document.querySelector('#URL');
    let objLang = document.querySelector('#lang');
    let messageElement = document.createElement('div');
    let objForm = document.querySelector('.form');
    let objErrorElement = document.createElement('div');
    let objResult = document.querySelector('#results');
    objResult.innerHTML = "";
    if (objForm.lastChild.className == 'alert-error') {
        objForm.removeChild(objForm.lastChild);
    }
    objResult.appendChild(messageElement);
    if (!Client.ValidateURL(objUrlElement.value)) {
        objErrorElement.innerHTML = "Please provide a valid URL";
        objErrorElement.classList.add('alert-error')
        objForm.appendChild(objErrorElement);
        return;
    }
    messageElement.innerHTML = "Loading Data please wait...";
    messageElement.classList.add('message-section');
    let objData = {
        URL: objUrlElement.value,
        lang: objLang.value
    }    // Client.checkForName(formText)

    let promiseResult = getAritcleData(objData);
    promiseResult.then(function (responseData) {
        console.log(responseData);
        messageElement.innerHTML = responseData.message;
        if (responseData.object.status.code == '0') {
            let tblElement = document.createElement('table');
            tblElement.innerHTML = generateDataTable(responseData);
            tblElement.classList.add('results-table');
            objResult.appendChild(tblElement);
        }
    })
}
function generateDataTable(responseData) {
    return ` <table class="results-table">
    <thead>
<tr>
        <th>Field Name</th>
        <td>Field Value</td>
</tr>
</thead>
<tbody>
<tr>
    <th>Agreement</th>
    <td>${responseData.object.agreement}</td>
</tr>
<tr>
    <th>Confidence</th>
    <td>${responseData.object.confidence}</td>
 </tr>
 <tr>
    <th>Irony</th>
    <td>${responseData.object.irony}</td>
</tr>
<tr>
    <th>Model</th>
    <td>${responseData.object.model}</td>
 </tr>
 <tr>
    <th>Subjectivity</th>
    <td>${responseData.object.subjectivity}</td>
 </tr>
 <tbody>
</table> `;
}

async function getAritcleData(objData) {
    let promiseAPI = await fetch('http://localhost:8081/meaningCloud',
        {
            method: "POST",
            credentials: 'same-origin',
            mode: 'cors',
            headers: {
                'Content-Type': 'application/json',

            },
            body: JSON.stringify(objData)
        })
    return promiseAPI.json();
}
export { handleSubmit }
