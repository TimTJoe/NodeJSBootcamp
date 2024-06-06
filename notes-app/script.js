const db = window.localStorage;
const form = document.getElementById("form");
const content = document.getElementById("content");
const time = document.getElementById("time");
const body = document.getElementById("body");

window.addEventListener("DOMContentLoaded", () => {
  const deleteBtn = document.querySelectorAll(".deleteButton");

  console.log(deleteBtn);
  displayNotes(JSON.parse(db.getItem("notes")));
  deleteBtn?.forEach((button) => {
    button.addEventListener("click", (e) => {
      console.log(button.value);
    });
  });
});

form.addEventListener("submit", (e) => {
  e.preventDefault();
  let text = document.getElementById("textarea").value;
  let date = new Date();
  date = date.toISOString().substring(0, 10);
  let note = { id: Date.now(), text, date };
  let response = createNote(note);
  displayNotes(response);
  window.location.reload();
});

function createNote(note) {
  let allNotes = JSON.parse(db.getItem("notes"));
  if (allNotes == null) {
    db.setItem("notes", JSON.stringify([note]));
    return JSON.parse(db.getItem("notes"));
  } else {
    allNotes.push(note);
    db.setItem("notes", JSON.stringify(allNotes));
    return JSON.parse(db.getItem("notes"));
  }
}

function deleteNote(id) {
  let notes = db.getItem("notes");
  if (notes == null) {
    return false;
  } else {
    notes.filter((note) => note.id == id).splice(0, 1);
    return true;
  }
}

function displayNotes(notes) {
  notes
    ?.sort()
    ?.reverse()
    .map((note) => {
      let article = `
      <article class="note" id="note">
            <time id="note-time" id="time">${note.date}</time>
            <p class="note-body" id="body">${note.text}</p>
            <footer class="note-footer" >
              <button class="deleteButton" id=${note.id}>Delete</button>
            </footer>
          </article>
    `;

      content.insertAdjacentHTML("beforeend", article);
      document.getElementById(note.id).addEventListener("click", (e) => {
        // e.preventDefault()
        deleteNote(note.id);
        window.location.reload();
        console.log("clicked: " + note.id);
      });
    });
}
