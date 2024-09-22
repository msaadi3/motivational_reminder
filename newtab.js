function calculateTimeRemaining(deadline) {
  const now = new Date();
  const timeRemaining = deadline - now;

  if (timeRemaining <= 0) {
    return "TIME'S UP. DID YOU ACHIEVE YOUR GOAL?";
  }

  const seconds = Math.floor(timeRemaining / 1000);
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);
  const months = Math.floor(days / 30);
  const years = Math.floor(months / 12);

  let result = [];

  if (years > 0) result.push(`${years} YEAR${years > 1 ? 'S' : ''}`);
  if (months % 12 > 0)
    result.push(`${months % 12} MONTH${months % 12 > 1 ? 'S' : ''}`);
  if (days % 30 > 0) result.push(`${days % 30} DAY${days % 30 > 1 ? 'S' : ''}`);
  if (hours % 24 > 0)
    result.push(`${hours % 24} HOUR${hours % 24 > 1 ? 'S' : ''}`);
  if (minutes % 60 > 0)
    result.push(`${minutes % 60} MINUTE${minutes % 60 > 1 ? 'S' : ''}`);

  return result.slice(0, 2).join(' ') + ' REMAINING';
}

function updatePage() {
  chrome.storage.sync.get(
    ['name', 'birthdate', 'goal', 'deadline'],
    function (items) {
      if (items.name && items.goal && items.deadline) {
        document.getElementById(
          'wake-up'
        ).textContent = `WAKE UP ${items.name.toUpperCase()}!`;
        document.getElementById('goal').textContent = items.goal;

        const deadline = new Date(items.deadline);
        document.getElementById('timeRemaining').textContent =
          calculateTimeRemaining(deadline);
      } else {
        document.getElementById('content').innerHTML =
          '<p>SET YOUR DAMN GOALS IN THE EXTENSION OPTIONS!</p>';
      }
    }
  );
}

document.addEventListener('DOMContentLoaded', function () {
  updatePage();
  setInterval(updatePage, 60000); // Update every minute
});
