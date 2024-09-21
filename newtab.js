function updatePage() {
  chrome.storage.sync.get(
    ['name', 'birthdate', 'goal', 'deadline'],
    function (items) {
      if (items.name && items.goal && items.deadline) {
        document.getElementById(
          'name'
        ).textContent = `What's wrong with you ${items.name}!
         What are you doing with your life!
          You haven't met your goal yet! Have you remebered your goal?
        If not, let me remind you once again.`;
        document.getElementById(
          'goal'
        ).textContent = ` ${items.goal} Yeah that's what you promised with yourself `;

        const now = new Date();
        const deadline = new Date(items.deadline);
        const timeRemaining = deadline - now;

        const days = Math.floor(timeRemaining / (1000 * 60 * 60 * 24));
        const hours = Math.floor(
          (timeRemaining % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
        );

        document.getElementById(
          'timeRemaining'
        ).textContent = `Clock is ticking baby: ${days} days and ${hours} hours`;
      } else {
        document.getElementById('content').innerHTML =
          '<p>Please set your goals in the extension options.</p>';
      }
    }
  );
}

document.addEventListener('DOMContentLoaded', function () {
  updatePage();
});
