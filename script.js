const dialogElem = document.getElementById("addworker");
const showBtn = document.querySelector(".add");
const closeBtn = document.querySelector(".close");

const cardscontainer = document.querySelector(".cards-container");
const staffcardtmpl = document.getElementById("staffcard");
const staff_card = document.querySelector(".staff-card");
const staffimg = document.querySelector(".staff-card img");

class Worker {
  constructor(name, role, photo, email, tel, experiences) {
    this.name = name;
    this.role = role;
    this.photo = photo;
    this.email = email;
    this.tel = tel;
    this.experiences = experiences;
  }
  show() {
    const newcard = staffcardtmpl.content.cloneNode(true);
    const staffimg = newcard.querySelector(".staff-card img");
    const staffname = newcard.querySelector(".em-name");
    const staffjob = newcard.querySelector(".em-job");
    const editBtn = newcard.querySelector(".edit-btn");

    staffname.innerText = this.name;
    staffjob.innerText = this.role;

    cardscontainer.appendChild(newcard);
    editBtn.addEventListener("click", () => {
      dialogElem.showModal();
    });
  }
}

showBtn.addEventListener("click", () => {
  dialogElem.showModal();
});
closeBtn.addEventListener("click", () => {
  dialogElem.close();
});
