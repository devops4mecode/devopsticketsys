// dashboard.js
document.addEventListener('DOMContentLoaded', () => {
    fetch('/api/tickets/stats')
        .then(response => response.json())
        .then(data => {
            document.getElementById('total-tickets').innerText = data.totalTickets;
            document.getElementById('open-tickets').innerText = data.openTickets;
            document.getElementById('in-progress-tickets').innerText = data.inProgressTickets;
            document.getElementById('closed-tickets').innerText = data.closedTickets;
        });
});
