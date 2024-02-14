// 유저가 값을 입력
// + 버튼 클릭하면, 할일이 쿠가
// delete 버튼을 누르면 할일이 삭제
// check버튼을 누르면 할일이 끝나면서 밑줄
// 1. check버튼을 클릭하는 순간 true false
// 2. true 면 끝난걸로 간주하고 밑줄
// 3. false면 안 끝난걸로 간주하고 그대로

// 진행중 끝남 탭 누르면 언더바 이동
// 끝남 탭은, 끝난 아이템만, 진행중인 탭은 진행중인 아이템만
// 전체탭을 누르면 다시 전체아이템으로 돌아옴

let taskInput = document.getElementById("task-input");
// console.log(taskInput);
let addButton = document.getElementById("add-button");
let taskList = [];

addButton.addEventListener("click", addTask);

function addTask() {
  // console.log("clicked");
  // let taskContent = taskInput.value;
  let task = {
    id: randomIDGenerate(),
    taskContent: taskInput.value,
    isComplete: false,
  };
  taskList.push(task);
  // console.log(taskList);
  render();
}

//그림그리는 부분
function render() {
  let resultHTML = "";

  for (let i = 0; i < taskList.length; i++) {
    if (taskList[i].isComplete == true) {
      resultHTML += `<div class="task">
      <div id="taskDetail">${taskList[i].taskContent}</div>
      <div class="taskBtn">
        <button id="checkBtn" onClick="toggleComplete('${taskList[i].id}')"><i class="fa-solid fa-rotate-right"></i></button>
        <button id="removeBtn" onClick="deleteTask('${taskList[i].id}')"><i class="fa-solid fa-xmark"></i></button>
      </div>
    </div>`;
    } else {
      resultHTML += `<div class="task">
      <div>${taskList[i].taskContent}</div>
      <div class="taskBtn">
        <button id="checkBtn" onClick="toggleComplete('${taskList[i].id}')"><i class="fa-solid fa-check"></i></button>
        <button id="removeBtn" onClick="deleteTask('${taskList[i].id}')"><i class="fa-solid fa-xmark"></i></button>
      </div>
    </div>`;
    }
  }

  document.getElementById("task-board").innerHTML = resultHTML;
  // let checkBtn = document.getElementById("checkBtn");
  // let taskDetail = document.getElementById("taskDetail");
  // let removeBtn = document.getElementById("removeBtn");
  // checkBtn.addEventListener("click", () => {
  //   taskDetail.style.textDecoration = "line-through";
  //   taskDetail.style.backgroundColor = "gray";
  // });
  // removeBtn.addEventListener("click", () => {
  //   resultHTML = "";
  //   console.log(resultHTML);
  // });
}

function toggleComplete(id) {
  // console.log("id", id);
  for (let i = 0; i < taskList.length; i++) {
    if (taskList[i].id == id) {
      taskList[i].isComplete = !taskList[i].isComplete;
      break;
      //for문이 돌지않고 true 되자마자 다시 나오게
    }
  }
  render();
}

function deleteTask(id) {
  for (let i = 0; i < taskList.length; i++) {
    if (taskList[i].id == id) {
      taskList.splice(i, 1);
      break;
    }
  }
  render();
  //값이 업데이트 되면 UI도 업데이트 돼야한다!
}

function randomIDGenerate() {
  return "_" + Math.random().toString(36).substr(2, 9);
}
//정보에는 id값이 필요
