// DOM Elements
// Add Worker stuff
const dialogElem = document.getElementById("addworker");
const showBtn = document.querySelector(".add");
const closeBtn = document.querySelector(".close");
const addnewexp = document.getElementById("addexp");
const experiences = document.querySelector(".experiences");
const experience = document.querySelector(".experience");
// Add Worker Form
const addworkerform = document.getElementById("Addworker");

// Sidebar stuff
const cardscontainer = document.querySelector(".cards-container");
const staffcardtmpl = document.getElementById("staffcard");
// Zones Stuff
const receptiondiv = document.querySelector(".reception");
const conferencediv = document.querySelector(".conference");
const serverdiv = document.querySelector(".server");
const securitydiv = document.querySelector(".security");
const staffroomdiv = document.querySelector(".staffroom");
const archiveroomdiv = document.querySelector(".archiveroom");

const workspace = document.querySelector(".workspace");
const assignedavatar = document.querySelectorAll(".assigned img");
const assignmodal = document.getElementById("assignworkermodal");
const assignmodalcont = assignmodal.firstElementChild;
const assignmodaldonebtn = assignmodal.lastElementChild;

let popupTimeout;

// Variables
let Workers = [];

// Data Models
class Worker {
  constructor(assigned, name, role, photo, email, tel, experiences) {
    this.assigned = assigned;
    this.name = name;
    this.role = role;
    photo
      ? (this.photo = photo)
      : (this.photo = "https://avatar.iran.liara.run/public/");
    this.email = email;
    this.tel = tel;
    this.experiences = experiences;
    this.avatar = null;
  }

  show() {
    const newcard = staffcardtmpl.content.cloneNode(true);
    console.log(newcard.querySelector(".staff-card"));
    this.card = newcard.querySelector(".staff-card");

    const staffimg = newcard.querySelector(".staff-card img");
    const staffname = newcard.querySelector(".em-name");
    const staffjob = newcard.querySelector(".em-job");
    const editBtn = newcard.querySelector(".edit-btn :first-child");
    const deletebtn = newcard.querySelector(".edit-btn :last-child");
    if (this.photo) staffimg.src = this.photo;
    staffname.innerText = this.name;
    staffjob.innerText = this.role;
    cardscontainer.appendChild(newcard);
    editBtn.addEventListener("click", () => {
      dialogElem.showModal();
    });
    deletebtn.addEventListener("click", () => {
      this.delete();
    });
  }
  assign() {
    this.assigned = !this.assigned;
  }
  hide() {
    this.card.remove();
  }
  delete() {
    const index = Workers.findIndex((w) => w === this);
    if (index != -1) Workers.splice(index, 1);
    this.hide();
  }
}
class Zone {
  constructor(id, name, allowedroles, nbmax, assigned) {
    this.id = id;
    this.name = name;
    this.allowedroles = allowedroles;
    this.nbmax = nbmax;
    this.assigned = assigned;
    this.region = document.querySelector("." + this.id);
    this.addbtn = this.region.firstElementChild.lastElementChild;
    this.assignedcontainer = this.region.lastElementChild;
    this.avatartobedeleted = null;
  }

  createavatar(elem) {
    const avatardiv = document.createElement("div");
    avatardiv.className = "assigned-avatar";
    const avatarimg = document.createElement("img");
    avatarimg.src = elem.photo;
    avatardiv.appendChild(avatarimg);
    this.assignedcontainer.appendChild(avatardiv);
    elem.avatar = avatardiv;
    const unassignbtn = document.createElement("span");
    unassignbtn.innerHTML = `<i style="color: #ef4444" class="fa-solid fa-circle-minus"></i>`;
    avatardiv.appendChild(unassignbtn);
    unassignbtn.addEventListener("click", () => {
      this.unassign(elem);
    });
  }

  assign(elem) {
    this.assigned.push(elem);
    elem.hide();
    elem.assign();
    this.createavatar(elem);
  }

  unassign(elem) {
    this.assigned = this.assigned.filter((a) => a.name !== elem.name);
    console.log(elem.avatar);
    elem.avatar.remove();
    elem.assigned = false;
    elem.show();
    this.populateassignmodal(this.filterallowed(Workers));
  }
  populate() {
    this.assigned.forEach((w) => {
      this.createavatar(w);
    });
    this.region.appendChild(this.assignedcontainer);
  }

  filterallowed(list) {
    if (this.allowedroles.includes("All")) {
      return list.filter((w) => w.assigned === false);
    } else {
      return list.filter(
        (w) => this.allowedroles.includes(w.role) && w.assigned === false
      );
    }
  }
  populateassignmodal(list) {
    assignmodalcont.innerHTML = "";
    list.forEach((l) => {
      const newcard = document.createElement("div");
      newcard.innerHTML = `
            <div>
              <img src=${l.photo} />
              <span style="font-weight: 700">${l.name}</span>
              <span>${l.role}</span>
            </div>
        `;
      assignmodalcont.appendChild(newcard);

      newcard.addEventListener("click", () => {
        this.assign(l);

        console.log(this.assigned);
        assignmodal.close();
        //something like that
      });
    });
  }
  selectpopup() {
    this.addbtn.addEventListener("click", () => {
      if (this.filterallowed(Workers).length === 0) {
        alert("There are no available workers to assign to this region");
        return;
      }
      this.populateassignmodal(this.filterallowed(Workers));
      assignmodal.showModal();
    });
  }
}

const Reception = new Zone(
  "reception",
  "Reception",
  ["Receptionist", "Manager", "Cleaner"],
  "50",
  []
);
const Conference = new Zone("conference", "Conference Room", ["All"], "10", []);
const Server = new Zone(
  "server",
  "Server Room",
  ["IT Engineer", "Manager", "Cleaner"],
  "10",
  []
);
const Security = new Zone(
  "security",
  "Security Room",
  ["Security Agent", "Manager", "Cleaner"],
  "3",
  []
);
const Staffroom = new Zone("staffroom", "Staff Room", ["All"], "10", []);
const Archive = new Zone(
  "archiveroom",
  "Archive Room",
  ["IT Engineer", "Manager", "Security Agent"],
  "3",
  []
);

const Zones = [Reception, Conference, Server, Security, Staffroom, Archive];

// Functions
function addNewExperience() {
  const newexp = experience.cloneNode(true);
  experiences.appendChild(newexp);
}

function rmExperience() {
  experiences.querySelectorAll(".experiences>div").forEach((e) => {
    console.log(e);
    const rmexperience = e.firstElementChild.lastElementChild;
    rmexperience.addEventListener("click", () => {
      e.remove();
    });
  });
}

function parseExperiences() {
  return Array.from(experiences.querySelectorAll(".experience")).map((exp) => ({
    Role: exp.querySelector('input[name="exrole"]').value,
    Company: exp.querySelector('input[name="company"]').value,
    StartDate: exp.querySelector('input[name="expstart"]').value,
    EndDate: exp.querySelector('input[name="expend"]').value,
  }));
}

// Validation stuff
const nameregex = /^[A-Z][a-z]+\s[A-Za-z]+$/gm;
const rolecompanyregex = /^([A-Z]+[a-z]*){1,30}\s?[A-za-z]{1,30}$/gm;
const phoneregex = /^((\+212|0)|(6|5|7))+\d{8}/gm;
const emailregex = /^[a-zA-Z].[^@]*@\w+\.(\w){3}$/gm;
function showinputError(input, msg) {
  const inputerr = document.createElement("span");
  inputerr.textContent = msg;
  inputerr.className = "inputerrmsg";
  input.after(inputerr);
  input.classList.toggle("inputerr");
}

// Main Execution loop
document.addEventListener("DOMContentLoaded", () => {
  Workers = [
    new Worker(
      false,
      "Yahia ABSI",
      "IT Engineer",
      "https://avatar.iran.liara.run/public/1",
      "yahiasanji@gmail.com",
      "+212648388903",
      []
    ),
    new Worker(
      false,
      "Khallad Al-Joufi",
      "Security Agent",
      "https://avatar.iran.liara.run/public/2",
      "yahiasanji@gmail.com",
      "+212648388903",
      []
    ),
    new Worker(
      false,
      "Hamza Rifai",
      "Cleaner",
      "https://avatar.iran.liara.run/public/4",
      "yahiasanji@gmail.com",
      "+212648388903",
      []
    ),
    new Worker(
      false,
      "Nada Sabir",
      "Receptionist",
      "https://avatar.iran.liara.run/public/6",
      "yahiasanji@gmail.com",
      "+212648388903",
      []
    ),
    new Worker(
      false,
      "Ahmad Aboutaha",
      "Manager",
      "https://avatar.iran.liara.run/public/10",
      "yahiasanji@gmail.com",
      "+212648388903",
      [
        {
          Role: "Cloud Engineer",
          Company: "IBM",
          StartDate: "2020-02-15",
          EndDate: "2024-06-30",
        },
      ]
    ),
  ];
  Workers.map((m) => m.show());

  showBtn.addEventListener("click", () => {
    dialogElem.showModal();
    addworkerform.reset();
    while (experiences.childNodes.length > 2) {
      experiences.removeChild(experiences.lastChild);
    }
    rmExperience();
  });
  closeBtn.addEventListener("click", (e) => {
    e.preventDefault();
    dialogElem.close();
  });

  dialogElem.addEventListener("click", (e) => {
    if (e.target === dialogElem) {
      dialogElem.close();
    }
  });
  assignworkermodal.addEventListener("click", (e) => {
    if (e.target === assignworkermodal) {
      assignworkermodal.close();
    }
  });

  addnewexp.addEventListener("click", (e) => {
    e.preventDefault();
    addNewExperience();
    rmExperience();
  });
  // input validation, show error on input
  showinputError(addworkerform.name, "Khalid");
  // form submission
  addworkerform.addEventListener("submit", (e) => {
    e.preventDefault();
    let newworker = new Worker(
      false,
      addworkerform.name.value,
      addworkerform.role.value,
      addworkerform.imageurl.value,
      addworkerform.email.value,
      addworkerform.phone.value,
      parseExperiences()
    );
    Workers.push(newworker);
    newworker.show();
    addworkerform.reset();
    dialogElem.close();
  });

  Zones.forEach((z) => z.selectpopup());
});
