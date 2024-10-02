// ticket-management.js
document.addEventListener('DOMContentLoaded', () => {
    document.getElementById('ticket-container').addEventListener('click', event => {
        if (event.target.classList.contains('edit-ticket')) {
            const ticketId = event.target.parentElement.parentElement.dataset.id;
            // Logic to edit ticket
        }

        if (event.target.classList.contains('delete-ticket')) {
            const ticketId = event.target.parentElement.parentElement.dataset.id;
            deleteTicket(ticketId);
        }
    });

    function deleteTicket(ticketId) {
        fetch(`/api/tickets/${ticketId}`, {
            method: 'DELETE',
        })
        .then(response => {
            if (response.ok) {
                document.querySelector(`[data-id='${ticketId}']`).remove();
            }
        });
    }
});
