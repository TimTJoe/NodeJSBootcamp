const db = window.localStorage;
const form = document.getElementById("form");
const content = document.getElementById("content");
const articleContainer = document.getElementById("content");
const submitBtn = document.getElementById("button");
const toaster = document.getElementById("snackbar");

/**
 * Adds a value to history.state
 *
 * @param {value} prop value to add to history.state
 * @param {value} name
 */
function setState(value) {
  //set the state.id with pushState
  window.history.pushState({ id: value }, { name: null });
  //return newest
  return window.history.state.id;
}

/**
 * clear current history.state value
 */
function clearState() {
  //check if state.id is set
  if (window.history.state?.id) {
    //if so, re-set it to null
    window.history.state.id = null;
  } else {
    //else, set the value to null using history pushState method
    window.history.pushState({ id: null }, { name: null });
  }
  //return false
  return false;
}

/**
 *
 * Return all note from localstorage.
 * return false if note note exist
 * @returns all notes from localstorage
 *
 */
function getAllNotes() {
  //get notes for localStorage
  let allNotes = JSON.parse(db.getItem("notes"));
  if (allNotes !== null || allNotes?.length !== 0) {
    return allNotes;
  } else {
    return false;
  }
}

/**
 *  return the note from the localstorage that matches param noteId
 *
 * @param {String} noteId Id of the note to return
 * @returns return a single note that matches the param
 */
function findNote(noteId) {
  //returns all the notes from localstorage
  let allNotes = getAllNotes();
  //container for the note that will be found
  let foundNote;
  //check if there is a note in localstorage
  if (allNotes) {
    //return the note that martches the param id
    //an return it as object instead of object in an array
    foundNote = allNotes.filter((note) => note.id == noteId)[0];
    //check if a note was found
    if (foundNote !== null) {
      //return that note
      return foundNote;
    } else {
      //if no note was found, return the false
      return false;
    }
  } else {
    //if localstorage is empty, return false
    return false;
  }
}

/**
 * run codes when page loads
 */
window.onload = () => {
  renderNotes(getAllNotes());
  window.history.pushState({ id: null }, { name: "init" });
  console.log("on load....")
};

/**
 * add new or update a note when form is submitted
 */
form.addEventListener("submit", (e) => {
  //prevent submission from reloading
  e.preventDefault();
  //get the note next from the textarea
  const noteText = document.getElementById("textarea").value;

  let newNote = {
    //make id equals the milliseconds elapsed since jan. 1, 1970
    id: Date.now(),
    //assign text value
    text: noteText,
    //create date equal the current date
    createdAt: getDate(),
    //modified date equal to the current date
    modifiedAt: getDate(),
  };

  //check if state.id isn't null
  //if it is, then create new note in localstorage
  if (window.history.state?.id !== null) {
    //update the note whose id is state.id
    updateNotes(window.history.state.id, newNote);
    showToaster("Note updated successfully.");
    setTimeout(() => {
      // renderNotes(getAllNotes());
    window.location.reload();
    }, 1000);
  } else {
    //add the new note and return the newest note
     createNote(newNote);
    //render all notes on page
    showToaster("Note created successfully.");
    console.log("created...")
    setTimeout(() => {
      // renderNotes(getAllNotes());
    window.location.reload();
    }, 1000);
  }
  //reloads page
});

/**
 * Create a new note in localstorage
 *
 * @param {Object} newNote note object to add to local stroage
 * @returns Newly created note
 */

function createNote(newNote) {
  //return all not from localstroage
  let allNotes = getAllNotes();

  //check if no note was return
  if (allNotes == null) {
    //add new note to localstorage as string array
    db.setItem("notes", JSON.stringify([newNote]));
    //return the note just created
    return findNote(newNote.id);
    // return getAllNotes();
  } else {
    //add new note without deleting others
    allNotes.push(newNote);
    //add updated note to localstorage
    db.setItem("notes", JSON.stringify(allNotes));
    //return the note just created
    return findNote(newNote.id);
    // return getAllNotes();
  }
}

/**
 *
 * @param {String} noteId Id of the note to delete
 * @returns
 */

function deleteNotes(noteId) {
  //return all notes from localstorage
  let allNotes = getAllNotes();
  //check if note isn't empty
  if (allNotes) {
    //return all notes whose id doesn't march the param id
    let updatedNotes = allNotes.filter((note) => note.id !== noteId);
    //add this update note to the localstorage as string
    db.setItem("notes", JSON.stringify(updatedNotes));
    //display the update localstorage note data
    showToaster("Note was deleted.");
    // renderNotes(getAllNotes());
    setTimeout(() => {
      window.location.reload();
    }, 1000);
    //reload the page to update the DOM
  } else {
    //display message if not is empty
    console.log("no note in localstorage.");
    clearState();
  }
}

/**
 * Display notes on page in desc date order.
 * sort note by date.
 * reverse note so that newest newest comes first
 * add each note object props to their specific tag in the article tag
 * return the first 250 characters in the text
 * and add the notes to the
 *
 * @param {Object} notes notes to display on the page
 */

function renderNotes(notes) {
  /**
   * sort note by date.
   * reverse note so that newest newest comes first
   * add each note object props to their specific tag in the article tag
   * return the first 250 characters in the text
   *
   */
  notes
    ?.sort((a, b) => new Date(a.modifiedAt) - new Date(b.modifiedAt))
    ?.reverse()
    .map((note) => {
      let article = `
      <article class="note" id="${note.id}">
        <header>
            <time class="time" id="time">${note.createdAt}</time>
        </header>
        <p class="body" id="body">
            ${note.text.substring(0, 250) + " ..."}
        </p>
        
      </article>
    `;

      //add note as child in the article container div
      articleContainer.insertAdjacentHTML("beforeend", article);

      document.getElementById(note.id).addEventListener("click", (e) => {
        //add the note id as state.id value
        // window.history.pushState({ id: note.id }, { name: null });
        //expend the note for reading
        readNote(note.id);
        //change the grid template colum values of the main container
        document.getElementById("grid").style.gridTemplateColumns =
          "270px auto 280px";
        //change display value of the viewer container
        document.getElementById("viewer").style.display = "flex";
      });
    });
  //clear state
  clearState();
}

/**
 * return the current, year, month, day, hour, and min
 *
 * @returns us-EN formated date string
 */
function getDate() {
  //create a new date
  let newDate = new Date();
  //formated date to us-EN formate
  let formatedDate = new Intl.DateTimeFormat("us-EN", {
    year: "numeric", //year should be number eg: 2024
    month: "short", //month should be string but abre. eg. Jan.
    day: "2-digit", //day shoud be two digit. eg: 02
    hour: "2-digit", //hour should be two digit eg: 01
    minute: "2-digit", //minute should be two digits. eg: 10
  }).format(newDate);

  //return the formated date
  return formatedDate;
}

/**
 * Update a specific note in the localstorage,
 * clear the state value,
 * and reload the page
 *
 * @param {String} noteId id of note to update
 * @param {Object} newNote new values for note
 */
function updateNotes(noteId, newNote) {
  //return all notes from localstorage
  let savedNotes = getAllNotes();
  //return the index of the note whose id  matches param noteId
  let index = savedNotes.findIndex((item) => item.id == noteId);
  //change the text value of the note at the given index
  savedNotes[index].text = newNote.text;
  //change the date value of the note at the given index
  savedNotes[index].modifiedAt = getDate();
  //save the updated note object to localstorage
  db.setItem("notes", JSON.stringify(savedNotes));
  //reloads the page
  // window.location.reload();
}

/**
 * Make specific note readible by displaying its content in the view pane
 * @param {String} id Id of note to read
 */
function readNote(noteId) {
  //set state.id
  setState(noteId);
  let copyDiv = document.getElementById("copy");
  //find note with the noteId
  let foundNote = findNote(noteId);
  //check if exist
  if (foundNote) {
    //add note to the viewer text container
    copyDiv.innerHTML = foundNote.text;
  } else {
    //display message is note empty
    console.log("note not found..");
  }
}

/**
 * add not to textarea for editing.
 * change form bground color.
 * change button submit button text, and
 * add outline to texaread
 */
document.getElementById("edit").addEventListener("click", (e) => {
  //return note that matches state.id value
  let foundNote = findNote(window.history.state.id);
  //add note to form textarea
  textarea.value = foundNote.text;
  //change form submit button color
  submitBtn.style.backgroundColor = "var(--orange)";
  //change form submit button text value
  submitBtn.innerHTML = "Update";
  //add orange outline to textarea
  textarea.style.outline = "solid var(--orange)";
});

/**
 * delete note that matches the state.id value
 * when the delete button is clicked.
 */
document.getElementById("delete").addEventListener("click", (e) => {
  //delete note that marches the state.id value
  deleteNotes(window.history.state?.id);
});

/**
 * display a toaster with message
 *
 * @param {String} message message to display in the toaster
 */
function showToaster(message) {
  const toasterDiv = document.getElementById("toaster");
  toasterDiv.innerHTML = message;
  toasterDiv.classList.remove("hidden");
  toasterDiv.classList.add("visible");
  setTimeout(() => {
    toasterDiv.classList.remove("visible");
  }, 1000);
}
