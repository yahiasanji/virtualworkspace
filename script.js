// DOM Elements
// Add Worker stuff
const dialogElem = document.getElementById("addworker");
const showBtn = document.querySelector(".add");
const closeBtn = document.querySelector(".close");
const addnewexp = document.getElementById("addexp");
const experiences = document.querySelector(".experiences");
const experience = document.getElementById("experience");
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
let UnassignedWorkers = [];

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
    const editBtn = newcard.querySelector(".edit-btn");
    if (this.photo) staffimg.src = this.photo;
    staffname.innerText = this.name;
    staffjob.innerText = this.role;
    cardscontainer.appendChild(newcard);
    editBtn.addEventListener("click", () => {
      dialogElem.showModal();
    });
  }
  assign() {
    this.assigned = !this.assigned;
  }
  hide() {
    this.card.remove();
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
    if (list.length === 0) {
      assignmodal.innerHTML = "There are no Workers Available for this region";
    }
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
const Server = new Zone("server", "Server Room", ["IT Engineer"], "10", []);
const Security = new Zone(
  "security",
  "Security Room",
  ["Security Agent"],
  "3",
  []
);
const Staffroom = new Zone("staffroom", "Staff Room", ["All"], "10", []);
const Archive = new Zone("archiveroom", "Archive Room", ["All"], "3", []);

const Zones = [Reception, Conference, Server, Security, Staffroom, Archive];

// Functions
function addNewExperience() {
  const newexp = experience.cloneNode(true);
  experiences.appendChild(newexp);
}

function showUnassigned() {
  UnassignedWorkers = Workers.filter((w) => w.assigned === false);

  UnassignedWorkers.map((m) => m.show());
}

const regions = workspace.querySelectorAll(".workspace > div");
let receptionlist = [];
let conferencelist = [];
let serverlist = [];
let securitylist = [];
let staffroomlist = [];
let archivelist = [];

/* function populateRegion(region, list) {
  let assignedcontainer = document.createElement("div");
  assignedcontainer.className = "assigned";
  list.forEach((w) => {
    const avatardiv = document.createElement("div");
    avatardiv.className = "assigned-avatar";
    const avatarimg = document.createElement("img");
    avatarimg.src = w.photo;
    avatardiv.appendChild(avatarimg);
    assignedcontainer.appendChild(avatardiv);
  });
  region.appendChild(assignedcontainer);
} */

/* function availableworkers() {
  receptionlist = Workers.filter(
    (w) => Reception.allowedroles.includes[w.role]
  );
  conferencelist = Workers.filter(
    (w) => Conference.allowedroles.includes[w.role]
  );
  serverlist = Workers.filter((w) => Server.allowedroles.includes[w.role]);
  securitylist = Workers.filter((w) => Security.allowedroles.includes[w.role]);
  staffroomlist = Workers.filter(
    (w) => Staffroom.allowedroles.includes[w.role]
  );
  archivelist = Workers.filter((w) => Archive.allowedroles.includes[w.role]);
} */

/* function addtozone(region){
    region.push(selected Item from available workers)
    populateRegion(region,Region.assigned);
}
   maybe make populateRegion a class method
*/

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
      []
    ),
  ];
  showUnassigned();
  Zones.forEach((Z) => {
    Z.populate();
    Z.selectpopup();
  });

  showBtn.addEventListener("click", () => {
    dialogElem.showModal();
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
  });

  addworkerform.addEventListener("submit", (e) => {
    e.preventDefault();
    let newworker = new Worker(
      false,
      addworkerform.name.value,
      addworkerform.role.value,
      addworkerform.imageurl.value,
      addworkerform.email.value,
      addworkerform.phone.value,
      [
        addworkerform.exrole.value,
        addworkerform.company.value,
        addworkerform.expstart.value,
        addworkerform.expend.value,
      ]
    );
    Workers.push(newworker);
    newworker.show();
    dialogElem.close();
    addworkerform.reset();
    console.log(Workers);
  });

  Zones.forEach((z) => z.selectpopup());
});
