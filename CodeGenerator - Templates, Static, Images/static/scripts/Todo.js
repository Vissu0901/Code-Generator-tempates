// on page loading
window.onload = ()=>{
    getTasks();
    document.getElementById('taskTitle').focus();
}

// show list of tasks function
function getTasks(){
    let keys = [];

    for(let i=0; i<localStorage.length; i++){
        keys.push(localStorage.key(i))
    }

    for(let i=0; i<keys.length; i++){
        let oldDivs = document.querySelector(".tasks-here").innerHTML;
        let localOptItems = localStorage.getItem(keys[i]);
        let optItems = "";
        let divStyleColor = "";

        if(localOptItems=="New"){
            optItems = `
                <option value="New">New</option>
                <option value="In Progress">In Progress</option>
                <option value="Completed">Completed</option>
                <option value="Postponed">Postponed</option>
            `;
            divStyleColor = "rgb(182, 231, 252)";
        } else if(localOptItems=="In Progress"){
            optItems = `
                <option value="In Progress">In Progress</option>
                <option value="New">New</option>
                <option value="Completed">Completed</option>
                <option value="Postponed">Postponed</option>
            `;
            divStyleColor = "rgb(242, 232, 153)";
        } else if(localOptItems=="Completed"){
            optItems = `
                <option value="Completed">Completed</option>
                <option value="In Progress">In Progress</option>
                <option value="New">New</option>
                <option value="Postponed">Postponed</option>
            `;
            divStyleColor = "rgb(141, 240, 151)";
        } else {
            optItems = `
                <option value="Postponed">Postponed</option>
                <option value="Completed">Completed</option>
                <option value="In Progress">In Progress</option>
                <option value="New">New</option> 
            `;
            divStyleColor = "rgb(242, 173, 162)";
        }

        document.querySelector(".tasks-here").innerHTML = oldDivs + `
            <div class="task" style="background-color:${divStyleColor}">
                <div class="task-title">
                    <b>
                        <span>${i+1}.</span>
                        <input type="text" id="${keys[i]}" value="${keys[i]}" class="editTextInput">
                    </b>
                </div>
                <div class="task-status">
                    <select name="status" id="${keys[i]+'status'}" class="form-control" style="background:transparent;">

        ` + optItems + `
            </select>
            <button class="btn btn-success" title="Save Changes" onclick="updateTaskStatus('${keys[i]}');">
                <span class="material-symbols-outlined">save</span>
            </button>
            <button class="btn btn-danger" title="Delete Task" onclick="deleteTask('${keys[i]}');">
                <span class="material-symbols-outlined">delete</span>
            </button>
        `;
    }
}

// add new task function
function addNewTask(){
    //taskKey = task title
    //taskValue = task status
    let taskKey = document.getElementById("taskTitle").value;
    let taskValue = "New";

    localStorage.setItem(taskKey,taskValue);

    location.reload();
}

// delete task function
function deleteTask(taskKey){
    const response = confirm('Are you sure want to delete "'+taskKey+'" task..?');
    if(response){
        localStorage.removeItem(taskKey);
    }

    location.reload();
}

// update task function
function updateTaskStatus(taskKey){
    let status = document.getElementById(taskKey+"status").value;
    let title = document.getElementById(taskKey).value;

    localStorage.removeItem(taskKey);
    localStorage.setItem(title,status);

    location.reload();
}