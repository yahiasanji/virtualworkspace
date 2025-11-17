const dialogElem = document.getElementById("addworker");
const showBtn = document.querySelector(".add");
const closeBtn = document.querySelector(".close");
const editBtn = document.querySelector(".edit-btn");

showBtn.addEventListener("click", () => {
  dialogElem.showModal();
});
editBtn.addEventListener("click", () => {
  dialogElem.showModal();
});

closeBtn.addEventListener("click", () => {
  dialogElem.close();
});
