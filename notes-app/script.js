const db = window.localStorage;
const form = document.getElementById("form");
const content = document.getElementById("content");
const time = document.getElementById("time");
const body = document.getElementById("body");

window.addEventListener("DOMContentLoaded", () => {
  displayNotes(JSON.parse(db.getItem("notes")));
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
    ?.sort()
    ?.reverse()
    .map((note) => {
      let article = `
      <article class="note note-section" id="note">
        <div class="note-content">
            <time class="note-time" id="time">${note.date}</time>
            <p class="note-body" id="body">${note.text}</p>
        </div>
        <footer class="note-footer" >
          <button class="deleteButton" id=${note.id}>Delete</button>
        </footer>
      </article>
    `;

      content.insertAdjacentHTML("beforeend", article);
      //add delete event to all items
      document.getElementById(note.id).addEventListener("click", (e) => {
        deleteNotes(note.id);
        window.location.reload();
      });
    });
}
