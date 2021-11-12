const updateTodo = (sno, title, description) => {
  fetch(`${url}/api/update-todo/${sno}`, {
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