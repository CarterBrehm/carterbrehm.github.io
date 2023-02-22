// Select elements
const currentParty = document.getElementById('current-party-name');
const nextPartyButton = document.getElementById('nextPartyButton');
const addPartyForm = document.getElementById('addPartyForm');
const waitlist = document.getElementById('waitlist');
const nameInput = document.getElementById('nameInput');
const sizeInput = document.getElementById('sizeInput');

// Create party list
let partyList = [];

// Function to update waitlist
function updateWaitlist() {
  waitlist.innerHTML = ""; // clear the list

  for (var i = 1; i < partyList.length; i++) {
	if (partyList[i] !== currentParty) { // only add parties that aren't current party
	  var li = document.createElement("li");
	  li.innerText = partyList[i].name + " (" + partyList[i].size + ")";
	  waitlist.appendChild(li);
	}
  }
  
  if (partyList.length <= 1) {
	var li = document.createElement("li");
	li.innerText = "None";
	waitlist.appendChild(li);
  }
}


// Function to update current party
function updateCurrentParty() {
  if (partyList.length > 0) {
	currentParty.innerHTML = `${partyList[0].name} (${partyList[0].size})`;
  } else {
	currentParty.innerHTML = 'Waiting for Party';
  }
}

// Function to add party
function addParty(name, size) {
  partyList.push({ name, size });
  updateWaitlist();
  if (partyList.length === 1) {
	updateCurrentParty();
  }
}

// Function to remove current party and move to next party
function removeCurrentParty() {
  partyList.shift();
  updateWaitlist();
  updateCurrentParty();
}

// Event listener for "Add Party" form submit
addPartyForm.addEventListener('submit', (e) => {
  e.preventDefault();
  const name = nameInput.value.trim();
  const size = parseInt(sizeInput.value);
  if (name !== '' && !isNaN(size)) {
	addParty(name, size);
	nameInput.value = '';
	sizeInput.value = '';
  }
});

// Event listener for "Next Party" button click
nextPartyButton.addEventListener('click', () => {
  removeCurrentParty();
});
