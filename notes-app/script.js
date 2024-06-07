const db = window.localStorage;
const form = document.getElementById("form");
const content = document.getElementById("content");
const submit = document.getElementById("button");

window.onload = () => {
  displayNotes(JSON.parse(db.getItem("notes")));
  window.history.pushState({ id: null }, { name: "init" });
};

form.addEventListener("submit", (e) => {
  e.preventDefault();
  const text = document.getElementById("textarea").value;

  let date = getDate();
  let note = { id: Date.now(), text, date };

  if (window.history.state.id !== null) {
    updatedNotes(window.history.state.id, note);
  } else {
    let response = createNote(note);
    displayNotes(response);
  }
  window.location.reload();
});

function createNote(note) {
  let notes = JSON.parse(db.getItem("notes"));

  if (notes == null) {
    db.setItem("notes", JSON.stringify([note]));
    return JSON.parse(db.getItem("notes"));
  } else {
    notes.push(note);
    db.setItem("notes", JSON.stringify(notes));
    return JSON.parse(db.getItem("notes"));
  }
}

function deleteNotes(id) {
  let notes = JSON.parse(db.getItem("notes"));
  if (notes == null) {
    return false;
  } else {
    let updatedNotes = notes.filter((note) => note.id !== id);
    db.setItem("notes", JSON.stringify(updatedNotes));
    displayNotes(JSON.parse(db.getItem("notes")));
  }
}

function displayNotes(notes) {
  notes
    ?.sort((a, b) => new Date(a.date) - new Date(b.date))
    ?.reverse()
    .map((note) => {
      let article = `
      <article class="note" id="note">
        <header>
            <time class="time" id="time">${note.date}</time>
        </header>
        <p class="body" id="body">
            ${note.text}
        </p>
        <footer class="actions" >
          <button class="edit" id="e${note.id}">
            Edit
          </button>
          <button class="delete" id=${note.id}>
            Delete
          </button>
        
        </footer>
      </article>
    `;

      content.insertAdjacentHTML("beforeend", article);
      //add delete event to all items
      document.getElementById(note.id).addEventListener("click", (e) => {
        deleteNotes(note.id);
        window.location.reload();
      });
      document.getElementById(`e${note.id}`).addEventListener("click", (e) => {
        let id = e.target.id.substring(1);
        textarea.value = note.text;
        submit.style.backgroundColor = "var(--orange)";
        textarea.style.outline = "solid var(--xlite-gray)";

        window.history.pushState({ id }, { name: "edit note" });
      });
    });
}

function getDate() {
  let _date = new Date();
  let date = new Intl.DateTimeFormat("us-EN", {
    year: "numeric",
    month: "short",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
  }).format(_date);

  return date;
}

function updatedNotes(id, note) {
  let notes = JSON.parse(db.getItem("notes"));
  let index = notes?.findIndex((item) => item.id == id);

  notes[index].text = note.text;
  notes[index].date = getDate();

  db.setItem("notes", JSON.stringify(notes));
  window.history.pushState({ id: null }, { name: "no note" });
  console.log(JSON.parse(db.getItem("notes")));
}
