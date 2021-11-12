const url = "https://api-tch-todos.herokuapp.com/";

const addTodo = () => {
  let myForm = document.getElementById('addForm');
  let formData = new FormData(myForm);
  const title = formData.get('title');
  const description = formData.get('description');
  fetch(`${url}/api/create-todo`, {
    method: 'POST',
    headers: {
      "content-type": "application/json"
    },
    body: JSON.stringify({
      "title": title,
      "description": description
    })
  })
  .then(data => {
    return data.json();
  })
  .then(response => {
    const alertMsg = `${response.status.charAt(0).toUpperCase() + response.status.slice(1)}: ${response.message}`
    alert(alertMsg);
  })
}