import { initializeApp } from 'https://www.gstatic.com/firebasejs/10.13.2/firebase-app.js';
import {
  getDatabase,
  ref,
  push,
  onValue,
  remove,
} from 'https://www.gstatic.com/firebasejs/10.13.2/firebase-database.js';

const firebaseConfig = {
  databaseURL:
    'https://leads-tracker-app-49fec-default-rtdb.asia-southeast1.firebasedatabase.app/',
};

const app = initializeApp(firebaseConfig);
const database = getDatabase(app);
const referenceInDB = ref(database, 'Leads');

const inputEl = document.getElementById('input-el');
const inputBtn = document.getElementById('input-btn');
const ulEl = document.getElementById('ul-el');
const deleteBtn = document.getElementById('delete-btn');

// Render Input List
function render(leads) {
  let listItems = '';
  for (let i = 0; i < leads.length; i++) {
    listItems += `
            <li>
                <a target='_blank' href='${leads[i]}'>
                    ${leads[i]}
                </a>
            </li>
        `;
  }
  ulEl.innerHTML = listItems;
}

// Render List From Firebase
onValue(referenceInDB, function (snapshot) {
  const snapshotDoesExist = snapshot.exists();

  if (snapshotDoesExist) {
    const snapshotValues = snapshot.val();
    const leads = Object.values(snapshotValues);
    render(leads);
  }
});

// Delete All From Firebase and App
deleteBtn.addEventListener('dblclick', function () {
    remove(referenceInDB)
    ulEl.innerHTML = ''
});

// Push Inputs To Firebase
inputBtn.addEventListener('click', function () {
  push(referenceInDB, inputEl.value);
  inputEl.value = '';  
});
