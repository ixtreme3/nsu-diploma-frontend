function buttonClickSimpleHandler(url) {
  try {
    fetch(url, { method: 'GET' })
        .then((response) => {
          return response.json();
        })
        .then((data) => {
          let key = "", className;
          if (url.includes("getAllWorkspaces")) {
            key = "workspaceName";
            className = "workspaces-list"
          } else if (url.includes("getAllUnits")) {
            key = "unitName";
            className = "units-list"
          } else {
            key = "employeeName";
            className = "employees-list"
          }
          let mainBlock = document.querySelector('.main-block');
          let html = `<ul class=${className}>`;
          data.forEach(obj => html += `<li>${obj[`${key}`]}</li>`)
          mainBlock.innerHTML = html + "</ul>";
        });
  } catch(err) {
    console.error(`Error: ${err}`);
  }
}

const getALlWorkspacesButton = document.querySelector('.get-all-workspaces-button');
const getALlUnitsButton = document.querySelector('.get-all-units-button');
const getALlEmployeesButton = document.querySelector('.get-all-employees-button');

getALlWorkspacesButton.addEventListener('click', () => buttonClickSimpleHandler("http://127.0.0.1:5000/getAllWorkspaces"));
getALlUnitsButton.addEventListener('click', () => buttonClickSimpleHandler("http://127.0.0.1:5000/getAllUnits"));
getALlEmployeesButton.addEventListener('click', () => buttonClickSimpleHandler("http://127.0.0.1:5000/getAllEmployees"));


function getUnitStaffButtonClickHandler(url) {
  fetch(url, {
    method: 'POST',
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({unit_name: document.querySelector('.get-unit-staff-input').value})
  })
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        let mainBlock = document.querySelector('.main-block');
        let html = `<ul class="units-list">`;
        data.forEach(obj => html += `<li>${obj[`employeeName`]}</li>`)
        mainBlock.innerHTML = html + "</ul>";
      });
}

function getEmployeeByPostButtonClickHandler(url) {
  fetch(url, {
    method: 'POST',
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({post_name: document.querySelector('.get-employee-by-post-input').value})
  })
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        let mainBlock = document.querySelector('.main-block');
        let html = `<ul class="employees-list">`;
        data.forEach(obj => html += `<li>${obj[`employeeName`]}</li>`)
        mainBlock.innerHTML = html + "</ul>";
      });
}

function getEntityLocationButtonClickHandler(url) {
  fetch(url, {
    method: 'POST',
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({entity_name: document.querySelector('.get-entity-location-input').value})
  })
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        let mainBlock = document.querySelector('.main-block');
        let html = `<ul class="location-list">`;
        for (let i = 0; i < data.length; i++) {
          html += `<li>${Object.values(data[i])[0]}</li>`
        }
        mainBlock.innerHTML = html + "</ul>";
      });
}

function getEmployeePostAndUnitButtonClickHandler(url) {
  fetch(url, {
    method: 'POST',
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({employee_name: document.querySelector('.get-employee-post-and-unit-input').value})
  })
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        let mainBlock = document.querySelector('.main-block');
        mainBlock.innerHTML = `<br> 
                               <p><b>Должность</b>: ${data[0].postName}</p> 
                               <p><b>Отдел</b>: ${data[1].unitName}</p>
        `;
      });
}

function getPostHeadButtonClickHandler(url) {
  fetch(url, {
    method: 'POST',
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({post_name: document.querySelector('.get-post-head-input').value})
  })
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        let mainBlock = document.querySelector('.main-block');
        mainBlock.innerHTML = `<br><p><b>Вышестоящая должность</b>: ${data[0].headPostName}</p>`;
      });
}

function getUnitSupportedOperationsButtonClickHandler(url) {
  fetch(url, {
    method: 'POST',
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({unit_name: document.querySelector('.get-unit-supported-operations-input').value})
  })
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        let mainBlock = document.querySelector('.main-block');
        let html = `<ul class="supported-operations-list">`;
        for (let i = 0; i < data.length; i++) {
          html += `<li>${Object.values(data[i])[0]}</li>`
        }
        mainBlock.innerHTML = html + "</ul>";
      });
}

function getUnitBusinessRulesButtonClickHandler(url) {
  fetch(url, {
    method: 'POST',
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({unit_name: document.querySelector('.get-unit-business-rules-input').value})
  })
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        let mainBlock = document.querySelector('.main-block');
        let html = `<ul class="supported-operations-list">`;

        html += `<li>Уровень доступа: ${data[0].accessRestrictionLevel} </li>
                 <li>Уровень популярности: ${data[0].popularityLevel} </li>
                 <li>Мощность: ${data[0].unitPower} </li>
                 <li>Уровень загруженности: ${data[0].workloadLevel} </li>
                 <br>
                 <li> Время работы <br>
        `;
        for (let i = 1; i < data.length; i++) {
          html += `День недели: ${Object.values(data[i])[0]} <br>
                   Время работы: ${Object.values(data[i])[1]}
                   <br><br>
          `;
        }
        mainBlock.innerHTML = html + "</li></ul>";
      });
}

const getUnitStaffButton = document.querySelector('.get-unit-staff-button');
getUnitStaffButton.addEventListener('click', () => getUnitStaffButtonClickHandler("http://127.0.0.1:5000/getUnitStaff"));

const getEmployeeByPostButton = document.querySelector('.get-employee-by-post-button');
getEmployeeByPostButton.addEventListener('click', () => getEmployeeByPostButtonClickHandler("http://127.0.0.1:5000/getEmployeeByPost"));

const getEmployeePostAndUnitButton = document.querySelector('.get-employee-post-and-unit-button');
getEmployeePostAndUnitButton.addEventListener('click', () => getEmployeePostAndUnitButtonClickHandler("http://127.0.0.1:5000/getEmployeePostAndUnit"));

const getPostHeadButton = document.querySelector('.get-post-head-button');
getPostHeadButton.addEventListener('click', () => getPostHeadButtonClickHandler("http://127.0.0.1:5000/getPostHead"));

const getUnitSupportedOperationsButton = document.querySelector('.get-unit-supported-operations-button');
getUnitSupportedOperationsButton.addEventListener('click', () => getUnitSupportedOperationsButtonClickHandler("http://127.0.0.1:5000/getUnitSupportedOperations"));

const getUnitBusinessRulesButton = document.querySelector('.get-unit-business-rules-button');
getUnitBusinessRulesButton.addEventListener('click', () => getUnitBusinessRulesButtonClickHandler("http://127.0.0.1:5000/getUnitBusinessRules"));

const getEntityLocationButton = document.querySelector('.get-entity-location-button');
getEntityLocationButton.addEventListener('click', () => getEntityLocationButtonClickHandler("http://127.0.0.1:5000/getEntityLocation"));

