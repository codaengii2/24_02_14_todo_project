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
let tabs = document.querySelectorAll(".task-tabs div");
let plus = document.querySelector(".task-plus");
let taskList = [];
let mode = "all";
// 처음에 모드는 항상 모두 이니까
let filterList = [];
let list = [];

taskInput.addEventListener("keydown", function (event) {
  if (event.key === "Enter") {
    event.preventDefault();
    addButton.click();
    // plus.disabled = true;
  }
});

for (let i = 1; i < tabs.length; i++) {
  tabs[i].addEventListener("click", function (event) {
    filter(event);
  });
}

//task-area div 중 뒤에 세개만 가져옴
// console.log(tabs);

addButton.addEventListener("click", addTask);

function addTask() {
  // console.log("clicked");
  // let taskContent = taskInput.value;
  if (taskInput.value === "") {
    alert("할 일을 적어주세요!");
    return;
  }
  let task = {
    id: randomIDGenerate(),
    taskContent: taskInput.value,
    isComplete: false,
  };
  taskList.push(task);
  // console.log(taskList);
  render();
  taskInput.value = "";
}

//그림그리는 부분
function render() {
  //1. 내가 선택한 탭에 따라서
  list = [];
  if (mode === "all") {
    // all taskLisk
    list = taskList;
    console.log(list);
  } else if (mode === "ongoing" || mode === "done") {
    // ongoing, done filterList
    list = filterList;
  }
  // 2. 리스트를 달리 보여줌 taskList => list
  let resultHTML = "";

  for (let i = 0; i < list.length; i++) {
    if (list[i].isComplete == true) {
      resultHTML += `<div class="task">
      <div id="taskDetail">${list[i].taskContent}</div>
      <div class="taskBtn">
        <button id="checkBtn" onClick="toggleComplete('${list[i].id}')"><i class="fa-solid fa-rotate-right"></i></button>
        <button id="removeBtn" onClick="deleteTask('${list[i].id}')"><i class="fa-solid fa-xmark"></i></button>
      </div>
    </div>`;
    } else {
      resultHTML += `<div class="task">
      <div>${list[i].taskContent}</div>
      <div class="taskBtn">
        <button id="checkBtn" onClick="toggleComplete('${list[i].id}')"><i class="fa-solid fa-check"></i></button>
        <button id="removeBtn" onClick="deleteTask('${list[i].id}')"><i class="fa-solid fa-xmark"></i></button>
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
  // render();
  filter();
}

function deleteTask(id) {
  for (let i = 0; i < taskList.length; i++) {
    if (taskList[i].id == id) {
      taskList.splice(i, 1);
      break;
    }
  }
  //값이 업데이트 되면 UI도 업데이트 돼야한다!
  // render();
  filter();
}

function filter(event) {
  if (event) {
    mode = event.target.id;
    tabs[0].style.left = event.currentTarget.offsetLeft + "px";
    tabs[0].style.width = event.currentTarget.offsetWidth + "px";
    tabs[0].style.top =
      event.currentTarget.offsetTop +
      event.currentTarget.offsetHeight +
      "px" -
      4;
  }

  // console.log("filter", event.target.id);
  //target의 id 값만 들고옴
  filterList = [];

  /*   if (mode === "all") {
    //전체리스트 보여줌
    // render();
    for (let i = 0; i < taskList.length; i++) {
      if (taskList[i] === false || taskList[i] === true) {
        filterList.push(taskList[i]);
      }
    }
  } else  */
  if (mode === "ongoing") {
    //진행중 아이템 보여줌
    //task.isComplete = false
    for (let i = 0; i < taskList.length; i++) {
      if (taskList[i].isComplete === false) {
        filterList.push(taskList[i]);
      }
    }
    // console.log("진행중", filterList);
  } else if (mode === "done") {
    //끝나는 케이스
    //task.isComplete = true
    for (let i = 0; i < taskList.length; i++) {
      if (taskList[i].isComplete === true) {
        filterList.push(taskList[i]);
      }
    }
  }
  render();
}

function randomIDGenerate() {
  return "_" + Math.random().toString(36).substr(2, 9);
}
//정보에는 id값이 필요
