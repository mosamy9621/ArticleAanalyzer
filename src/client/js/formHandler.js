
function handleSubmit(event) {
    event.preventDefault()
    let objUrlElement = document.querySelector('#URL');
    let objLang = document.querySelector('#lang');
    let messageElement = document.createElement('div');
    let objForm = document.querySelector('.form');
    let objErrorElement = document.createElement('div');
    let objResult = document.querySelector('#results');
    // clearing result section
    objResult.innerHTML = "";
    // removing error section from DOM if exists
    if (objForm.lastChild.className == 'alert-error') {
        objForm.removeChild(objForm.lastChild);
    }
    // validating that URL is a valid one 
    if (!Client.validateURL(objUrlElement.value)) {
        objErrorElement.innerHTML = "Please provide a valid URL";
        objErrorElement.classList.add('alert-error')
        objForm.appendChild(objErrorElement);
        return;
    }
    // interacting with the user while calling API
    messageElement.innerHTML = "Loading Data please wait...";
    messageElement.classList.add('message-section');
    objResult.appendChild(messageElement);
    let objData = {
        URL: objUrlElement.value,
        lang: objLang.value
    } 
    // calling meaning cloud API and expec promise to be recieved
    let promiseResult = getAritcleData(objData);
    promiseResult.then(function (responseData) {
        console.log(responseData);
        messageElement.innerHTML = responseData.message;
        if (responseData.object.status.code == '0') {
            let tblElement = document.createElement('table');
            // after getting the correct data generating table to be added to DOM
            let strInnerHtml = generateDataTable(responseData);
            if (strInnerHtml == false) {
                return ;
            }
            tblElement.innerHTML = strInnerHtml;
            tblElement.classList.add('results-table');
            objResult.appendChild(tblElement);
        }
    })
}
function generateDataTable(responseData) {
    let arrKey = ['agreement', 'confidence', 'irony', 'model', 'subjectivity'];
    if (responseData == undefined || responseData.object == undefined) {
        return false;
    }
    let flagError = false;
    arrKey.forEach(function (strKey) {
        if (responseData.object[strKey] == undefined) {
            flagError = true;
            return;
        }
    })
    if (flagError) {
        return flase;
    }
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
