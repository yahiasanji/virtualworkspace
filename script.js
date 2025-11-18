const dialogElem = document.getElementById("addworker");
const showBtn = document.querySelector(".add");
const closeBtn = document.querySelector(".close");

const staffcardtmpl = document.getElementById("staffcard");

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
    const cardscontainer = document.querySelector(".cards-container");

    cardscontainer.appendChild(newcard);
    editBtn.addEventListener("click", () => {
      dialogElem.showModal();
    });
  }
}

class Zone {
  constructor(id, name, allowedroles, nbmax) {
    this.id = id;
    this.name = name;
    this.allowedroles = allowedroles;
    this.nbmax = nbmax;
  }
}

showBtn.addEventListener("click", () => {
  dialogElem.showModal();
});
closeBtn.addEventListener("click", (e) => {
  e.preventDefault();
  dialogElem.close();
});
