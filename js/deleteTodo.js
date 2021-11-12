const deleteTodo = (sno) => {
  fetch(`${url}/api/delete-todo/${sno}`, {
    method: 'DELETE'
  })
  .then(data => {
    return data.json();
  })
  .then(response => {
    const alertMsg = `${response.status.charAt(0).toUpperCase() + response.status.slice(1)}: ${response.message}`
    alert(alertMsg);
  })
}