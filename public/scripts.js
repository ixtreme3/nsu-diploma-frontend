const getALlWorkspacesButton = document.querySelector('.get-all-workspaces-button');

getALlWorkspacesButton.addEventListener('click', () => {
  try {
    fetch('http://127.0.0.1:5000/getAllWorkspaces', { method: 'GET' })
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        console.log(data);
        let mainBlock = document.querySelector('.main-block');
        let html = "<ul class='workspaces-list'>";
        data.forEach(obj => html += `<li>${obj["workspaceName"]}</li>`)
        mainBlock.innerHTML = html + "</ul>";
      });
  } catch(err) {
    console.error(`Error: ${err}`);
  }
});

// const getAllUnitsButton = document.querySelector('.get-all-units-button');
// getAllUnitsButton.addEventListener('click', () => {
//   try {
//     fetch('http://127.0.0.1:5000/getAllWorkspaces', { method: 'GET' })
//         .then((response) => {
//           return response.json();
//         })
//         .then((data) => {
//           console.log(data);
//           let mainBlock = document.querySelector('.main-block');
//           let html = "<ul class='workspaces-list'>";
//           data.forEach(obj => html += `<li>${obj["workspaceName"]}</li>`)
//           mainBlock.innerHTML = html + "</ul>";
//         });
//   } catch(err) {
//     console.error(`Error: ${err}`);
//   }
// });