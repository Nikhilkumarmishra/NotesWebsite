const noteList = document.getElementById('noteList');
const noteEditor = document.getElementById('noteEditor');
const addNoteBtn = document.getElementById('addNoteBtn');
const saveNoteBtn = document.getElementById('saveNoteBtn');
const deleteNoteBtn = document.getElementById('deleteNoteBtn');

let notes = JSON.parse(localStorage.getItem('notes')) || [];
let currentNote = null;

function renderNotes() {
  noteList.innerHTML = '';
  notes.forEach((note, index) => {
    const li = document.createElement('li');
    li.textContent = `Note ${index + 1}`;
    li.addEventListener('click', () => {
      displayNote(index);
    });
    const deleteBtn = document.createElement('button');
    deleteBtn.innerHTML = '<i class="fas fa-times"></i>';
    deleteBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      deleteNote(index);
    });
    li.appendChild(deleteBtn);
    noteList.appendChild(li);
  });
}

function displayNote(index) {
  currentNote = index;
  noteEditor.value = notes[index] || '';
  const listItems = noteList.getElementsByTagName('li');
  for (let i = 0; i < listItems.length; i++) {
    listItems[i].classList.remove('active');
  }
  if (listItems[index]) {
    listItems[index].classList.add('active');
  }
  deleteNoteBtn.disabled = currentNote === null;
}

function addNote() {
  notes.push('');
  renderNotes();
  displayNote(notes.length - 1);
}

function saveNote() {
  if (currentNote !== null) {
    notes[currentNote] = noteEditor.value;
    localStorage.setItem('notes', JSON.stringify(notes));
    renderNotes(); // Re-render the notes after saving
  }
}

function deleteNote(index) {
  notes.splice(index, 1);
  localStorage.setItem('notes', JSON.stringify(notes));
  renderNotes();
  displayNote(null);
}

addNoteBtn.addEventListener('click', addNote);
saveNoteBtn.addEventListener('click', saveNote);
deleteNoteBtn.addEventListener('click', () => {
  deleteNote(currentNote);
});

renderNotes();