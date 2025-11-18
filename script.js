// Data Models
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
    if (this.photo) staffimg.src = this.photo;
    staffname.innerText = this.name;
    staffjob.innerText = this.role;
    cardscontainer.appendChild(newcard);
    editBtn.addEventListener("click", () => {
      dialogElem.showModal();
    });
  }
}
class Zone {
  constructor(id, name, allowedroles, nbmax, assigned) {
    this.id = id;
    this.name = name;
    this.allowedroles = allowedroles;
    this.nbmax = nbmax;
    this.assigned = assigned;
  }
}

// DOM Elements
const dialogElem = document.getElementById("addworker");
const showBtn = document.querySelector(".add");
const closeBtn = document.querySelector(".close");

const cardscontainer = document.querySelector(".cards-container");

const addnewexp = document.getElementById("addexp");
const experiences = document.querySelector(".experiences");
const experience = document.getElementById("experience");

const staffcardtmpl = document.getElementById("staffcard");

// Variables
let Workers = [];
const Zones = [];

const Reception = new Zone("1", "Reception", ["Receptionist"], "50", []);
const Conference = new Zone("2", "Conference Room", ["All"], "10", []);
const Server = new Zone("3", "Server Room", ["IT Technician"], "10", []);
const Security = new Zone("4", "Security Room", ["Security Agent"], "3", []);
const Staffroom = new Zone("5", "Staff Room", ["All"], "10", []);
const Archive = new Zone("6", "Archive Room", ["All"], "3", []);

Zones = [Reception, Conference, Server, Security, Staffroom, Archive];

// Functions
function addNewExperience() {
  const newexp = experience.cloneNode(true);
  experiences.appendChild(newexp);
}

// Main Execution loop
document.addEventListener("DOMContentLoaded", () => {
  Workers.push(new Worker("Yahia ABSI", "IT Engineer"));
  Workers.map((m) => m.show());
  showBtn.addEventListener("click", () => {
    dialogElem.showModal();
  });
  closeBtn.addEventListener("click", (e) => {
    e.preventDefault();
    dialogElem.close();
  });
  addnewexp.addEventListener("click", (e) => {
    e.preventDefault();
    addNewExperience();
  });
});
