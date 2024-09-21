document.getElementById('optionsForm').addEventListener('submit', function (e) {
  e.preventDefault();

  const name = document.getElementById('name').value;
  const birthdate = document.getElementById('birthdate').value;
  const goal = document.getElementById('goal').value;
  const deadline = document.getElementById('deadline').value;

  chrome.storage.sync.set(
    {
      name: name,
      birthdate: birthdate,
      goal: goal,
      deadline: deadline,
    },
    function () {
      alert('Options saved!');
    }
  );
});

// Load saved options
document.addEventListener('DOMContentLoaded', function () {
  chrome.storage.sync.get(
    ['name', 'birthdate', 'goal', 'deadline'],
    function (items) {
      document.getElementById('name').value = items.name || '';
      document.getElementById('birthdate').value = items.birthdate || '';
      document.getElementById('goal').value = items.goal || '';
      document.getElementById('deadline').value = items.deadline || '';
    }
  );
});
