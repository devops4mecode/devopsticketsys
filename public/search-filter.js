// search-filter.js
document.getElementById('search-bar').addEventListener('input', filterTickets);
document.getElementById('status-filter').addEventListener('change', filterTickets);
document.getElementById('priority-filter').addEventListener('change', filterTickets);

function filterTickets() {
    const searchTerm = document.getElementById('search-bar').value.toLowerCase();
    const statusFilter = document.getElementById('status-filter').value;
    const priorityFilter = document.getElementById('priority-filter').value;

    document.querySelectorAll('#ticket-container li').forEach(ticket => {
        const title = ticket.querySelector('strong').textContent.toLowerCase();
        const priority = ticket.querySelector('span').textContent.toLowerCase();
        const status = ticket.dataset.status.toLowerCase();

        if ((title.includes(searchTerm) || searchTerm === '') &&
            (status === statusFilter || statusFilter === 'all') &&
            (priority === priorityFilter || priorityFilter === 'all')) {
            ticket.style.display = 'flex';
        } else {
            ticket.style.display = 'none';
        }
    });
}
