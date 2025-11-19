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
const assignbtns = document.querySelectorAll(".zoneheader span");
const assignmodal = document.getElementById("assignworkermodal");

let popupTimeout;

// Data Models
class Worker {
  constructor(assigned, name, role, photo, email, tel, experiences) {
    this.assigned = assigned;
    this.name = name;
    this.role = role;
    photo
      ? (this.photo = photo)
      : (this.photo = "https://avatar.iran.liara.run/public/30");
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
  assign() {
    this.assigned = true;
  }
}
class Zone {
  constructor(id, name, allowedroles, nbmax, assigned) {
    this.id = id;
    this.name = name;
    this.allowedroles = allowedroles;
    this.nbmax = nbmax;
    this.assigned = assigned;
    this.region = document.getElementsByClassName(this.id);
  }

  add(elem) {
    this.assigned.push(elem);
  }
  populate(list) {
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
    this.region.appendChild(assignedcontainer);
  }
}

// Variables
let Workers = [];
let UnassignedWorkers = [];

const Reception = new Zone(
  "reception",
  "Reception",
  ["Receptionist"],
  "50",
  []
);
const Conference = new Zone("conference", "Conference Room", ["All"], "10", []);
const Server = new Zone("server", "Server Room", ["IT Technician"], "10", []);
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
      "Security",
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

  assignbtns.forEach((a) => {
    a.addEventListener("click", (e) => {
      console.log(e.target.closest("div").parentElement);
      assignworkermodal.showModal();
    });
  });
});
