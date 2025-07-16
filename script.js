const table = document.querySelector("table > tbody");
const submitBtn = document.querySelector("form");
const query = document.querySelector('input[name="query"]');
//features
const sortBtnAtoZ = document.getElementById("AtoZ");
const sortBtnZtoA = document.getElementById("ZtoA");
const marks = document.getElementById("marks");
const passing = document.getElementById("passing");
const classes = document.getElementById("Class");
const genders = document.getElementById("gender");
const table_section = document.getElementById("tables");

let students_Data;

sortBtnAtoZ.addEventListener("click", () => {
  let data = sortingAtoZ(students_Data);
  renderTable(data);
});

sortBtnZtoA.addEventListener("click", () => {
  let data = sortingZtoA(students_Data);
  renderTable(data);
});

marks.addEventListener("click", () => {
  let data = sortByMarks(students_Data);
  renderTable(data);
});

passing.addEventListener("click", () => {
  let data = sortByPassing(students_Data);
  renderTable(data);
});

classes.addEventListener("click", () => {
  let data = sortByClass(students_Data);
  renderTable(data);
});

genders.addEventListener("click", () => {
  let data = sortByGenders(students_Data);
});

function isEmpty(e) {
  console.log(e.target.value);
  if (e.target.value === "") renderTable(students_Data);
  return;
}

function renderTable(students) {
  table.innerHTML = "";
  students.forEach((student, index) => {
    table.innerHTML += `<tr>
    <td>${index + 1}</td>
    <td>
      <div>
        <img src=${student.img_src} />${
      student.first_name + " " + student.last_name
    }
      </div>
    </td>
    <td>${student.gender}</td>
    <td>${student.class}</td>
    <td>${student.marks}</td>
    <td>${student.passing ? "passed" : "failed"}</td>
    <td>${student.email}</td>
  </tr>`;
  });
}

window.onload = () => {
  async function fillTable() {
    try {
      const data = await fetch("students.json");
      let res = await data.json();
      students_Data = res;
      renderTable(res);
    } catch (err) {
      alert(err);
      return;
    }
  }

  fillTable();
};

submitBtn.addEventListener("submit", (e) => {
  e.preventDefault();
  let filteredData = searchName(query.value);
  renderTable(filteredData);
});

//1.search by name

function searchName(query) {
  if (!students_Data) return;

  query = query.trim().toLowerCase();

  if (query === "") return students_Data;

  return students_Data.filter((student) => {
    return (
      student.first_name.toLowerCase().includes(query) ||
      student.last_name.toLowerCase().includes(query) ||
      student.email.toLowerCase().includes(query)
    );
  });
}

//2. sorting names of the student objects based on their lexicographical order
function sortingAtoZ(students) {
  if (!students) return;
  return students.toSorted((a, b) => a.first_name.localeCompare(b.first_name));
}
function sortingZtoA(students) {
  if (!students) return;
  return students.toSorted((b, a) => a.first_name.localeCompare(b.first_name));
}

//3.sort my marks
function sortByMarks(students) {
  if (!students) return;
  return students.toSorted((a, b) => a.marks - b.marks);
}

//4.sort by passing of the students
function sortByPassing(students) {
  if (!students) return;
  return students.filter((student) => student.passing === true);
}

//5.sort by ascending order of the class
function sortByClass(students) {
  if (!students) return;
  return students.toSorted((a, b) => a.class - b.class);
}

//6.sort by gender and apppend two tables
function sortByGenders(students) {
  if (!students) return;
  let males = students.filter((student) => student.gender === "Male");
  let females = students.filter((student) => student.gender === "Female");
  createSecondTable(males, females);
}

function createSecondTable(males, females) {
  let secTable = document.createElement("table");
  let table_Head_content = document.querySelector("thead");
  let table_Head = document.createElement("thead");
  let table_body = document.createElement("tbody");
  renderTable(males);
  table_Head.innerHTML = table_Head_content.innerHTML;
  secTable.appendChild(table_Head);
  females.forEach((student, index) => {
    table_body.innerHTML += `<tr>
    <td>${index + 1}</td>
    <td>
      <div>
        <img src=${student.img_src} />${
      student.first_name + " " + student.last_name
    }
      </div>
    </td>
    <td>${student.gender}</td>
    <td>${student.class}</td>
    <td>${student.marks}</td>
    <td>${student.passing ? "passed" : "failed"}</td>
    <td>${student.email}</td>
  </tr>`;
  });
  secTable.appendChild(table_body);
  table_section.appendChild(secTable);
  secTable.setAttribute("border", "1px");
  secTable.setAttribute("style", "border-collapse: collapse");
}
