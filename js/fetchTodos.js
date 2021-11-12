const url = "https://api-tch-todos.herokuapp.com/";

const fillDetails = (sno) => {
  fetch(`${url}/api/specific-todo/${sno}`).then(data => {
    return data.json();
  })
  .then(response => {
    document.getElementById("newTitle").value = response.todo.title;
    document.getElementById("newDescription").value = response.todo.description;
    document.getElementById("sno").value = response.todo.sno;
  })
}

const onSubmit = () => {
  let myForm = document.getElementById('updateForm');
  let formData = new FormData(myForm);
  const sno = formData.get('sno');
  const title = formData.get('newTitle');
  const description = formData.get('newDescription');
  updateTodo(sno, title, description);
}

const fetchTodos = () => {
  fetch(`${url}/api/fetch-todos`)
  .then(data => {
    return data.json();
  })
  .then(response => {
    if (Object.keys(response).length !== 0) {
      for (const key in response) {
        if (Object.hasOwnProperty.call(response, key)) {
          const element = response[key];
          const html = `
          <div class="card my-2">
            <div class="card-header">
              <strong>Added On: </strong>${element.added_on} <strong>Last Updated On: </strong>${element.last_update}
            </div>
            <div class="card-body">
              <h5 class="card-title">${element.title}</h5>
              <p class="card-text">${element.description}</p>
              <button type="button" class="btn-sm btn btn-primary mx-1" data-bs-toggle="modal" data-bs-target="#exampleModal" data-bs-whatever="@mdo" onclick="fillDetails(${element.sno})">Edit</button>
              <button class="btn btn-danger btn-sm" onclick="deleteTodo(${element.sno})">Delete</button>
              <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div class="modal-dialog">
                  <div class="modal-content">
                    <div class="modal-header">
                      <h5 class="modal-title" id="exampleModalLabel">Update Todo</h5>
                      <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div class="modal-body">
                      <form id="updateForm">
                        <div class="mb-3 d-none">
                          <label for="sno" class="col-form-label">Sno:</label>
                          <input type="text" class="form-control" id="sno" name="sno" readonly>
                        </div>
                        <div class="mb-3">
                          <label for="newTitle" class="col-form-label">Title:</label>
                          <input type="text" class="form-control" id="newTitle" name="newTitle">
                        </div>
                        <div class="mb-3">
                          <label for="newDescription" class="col-form-label">Description:</label>
                          <input type="text" class="form-control" id="newDescription" name="newDescription">
                        </div>
                      </form>
                    </div>
                    <div class="modal-footer">
                      <button type="button" class="btn btn-primary" onclick="onSubmit()">Submit</button>
                      <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          `
          document.getElementById("todos").innerHTML += html;
        }
      }
    }
    else {
      document.getElementById("todos").innerHTML += "No todos to display!";
    }
  })
}

fetchTodos();