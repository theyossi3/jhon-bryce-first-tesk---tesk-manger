// create an empty array
let Task = [];
//check local storage if empty if not putin the Task array
if (localStorage != "null") {
  Task = JSON.parse(localStorage.getItem("Task") || "[]");

}

function save_task() {
  var teskname = document.getElementById("new_task").value;
  var theTask = document.getElementById("task").value;
  var saveDate = document.getElementById("date").value;
  var saveTime = document.getElementById("time").value;

  if ((teskname.value == "") || (theTask.value == "") || (saveDate == "") || (saveTime.value == "")) {
    alert("u must fill all inputs");
    return
  }
  else {
    let tesk_obj = {
      name: teskname,
      task: theTask,
      date: saveDate,
      time: saveTime,
    };
    let i = Task.push(tesk_obj) - 1;

    let json = JSON.stringify(Task);
    localStorage.setItem("Task", json);
    const task_info = ' <label>' + tesk_obj.name + ' </label> <div><textarea id=id_text>' + tesk_obj.task + '</textarea></div>' + '<p style="height:10px;padding: auto;">' + tesk_obj.date + "</p>" + "<p>" + tesk_obj.time + "</p>";

    create_note(task_info, i);
  }


}
// read  tasks from local storage 
function read_local() {
  var today = new Date();
  var now_d = today.getFullYear() + "-" + (today.getMonth() + 1) + "-" + today.getDate();
  var now_t = today.getHours() + ":" + today.getMinutes();

  for (var i = 0; i < Task.length; i++) {

    var date = new Date(Task[i].date)
    console.log(date.getMonth() + 1);
    // check if date or time as past 
    if (((date.getMonth() + 1) <= (today.getMonth() + 1) && date.getFullYear() <= today.getFullYear() && date.getDate() <= today.getDate()) && (now_t > Task[i].time)) {
      console.log(Task[i].date + "<=" + now_d + "///" + Task[i].time + "<=" + now_t);
      deletefromlocal(i);
    }
    else {
      // create note format 
      const task_info = ' </br><label>' + Task[i].name + '</br></br> </label></br>  <p> task:' + Task[i].task + '</p>' + '<p style="height:10px;padding: auto;"> due date:' + Task[i].date + "</p>" + "<p>due time:" + Task[i].time + "</p>";
      create_note(task_info, i);
    }
  }
}
// create notes  thet comes from local storage or the user
function create_note(task_info, i) {

  let div = document.createElement("div");
  div.className = "new_note";
  div.innerHTML = '<button class="btn-close" id="btn" name="btn" onclick="deleteitme( this  ,' + i + ')"> </button>' + task_info;
  let d = document.getElementById("notebook");
  console.log(div);
  d.appendChild(div);

}
// remove the note from the local storge and the web page
function deleteitme(note, loction) {
  deletefromlocal(loction);
  let parent = document.getElementById("notebook");
  parent.removeChild(note.parentNode);
}


function deletefromlocal(loction) {
  Task.splice(loction, 1);
  let json = JSON.stringify(Task);
  localStorage.setItem("Task", json);
}







