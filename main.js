// 유저가 값을 입력
// + 버튼 클릭하면, 할일이 쿠가
// delete 버튼을 누르면 할일이 삭제
// check버튼을 누르면 할일이 끝나면서 밑줄
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
  let taskContent = taskInput.value;
  taskList.push(taskContent);
  // console.log(taskList);
}

function render() {
  let resultHTML = "";

  for (let i = 0; i < taskList.length; i++) {
    resultHTML += ` <div class="task">
    <div>${taskList[i]}</div>
    <div>
      <button>Check</button>
      <button>Delete</button>
    </div>
  </div>`;
  }

  document.getElementById("task-board").innerHTML = resultHTML;
}
