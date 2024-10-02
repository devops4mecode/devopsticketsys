let selectedTicketId = null; // Declare the variable globally

document.addEventListener("DOMContentLoaded", function() {
    loadTickets();
});
// Load all ticket 1st load
function loadTickets() {
    fetch('http://localhost:3000/api/tickets', {
        headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
    })
    .then(response => response.json())
    .then(tickets => {
        const ticketList = document.getElementById('ticket-list');
        ticketList.innerHTML = ''; // Clear the list before adding new items
        tickets.forEach(ticket => {
            const ticketItem = document.createElement('div');
            ticketItem.className = 'ticket-item';
            ticketItem.id = `ticket-${ticket.id}`;
            ticketItem.innerHTML = `
                <div class="ticket-content">
                    <div class="ticket-title">${ticket.title}</div>
                    <div class="ticket-description">${ticket.description}</div>
                </div>
                <div class="ticket-actions">
                    <button onclick="openEditModal(${ticket.id})">View/Edit</button>
                    <button class="delete-button" onclick="deleteTicket(${ticket.id})">Delete</button>
                </div>
            `;
            ticketList.appendChild(ticketItem);
        });
    })
    .catch(error => console.error('Error loading tickets:', error));
}

// Create new ticket
function createTicket() {
    const titleInput = document.getElementById('title');
    const descriptionInput = document.getElementById('description');
    const title = titleInput.value.trim(); // Remove leading/trailing whitespace
    const description = descriptionInput.value.trim(); // Remove leading/trailing whitespace

    // Validation for empty title and description
    if (!title) {
        alert('Please enter a title for the ticket.');
        return;
    }

    if (!description) {
        alert('Please enter a description for the ticket.');
        return;
    }

    const ticket = {
        title: title,
        description: description,
    };

    fetch('/api/tickets', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
        body: JSON.stringify({ title, description })
    })
    .then(response => response.json())
    .then(ticket => {
        loadTickets(); // Refresh the ticket list
        clearForm();
    })
    .catch(error => console.error('Error creating ticket:', error));
}
// Delete ticket by ID
function deleteTicket(id) {
    fetch(`/api/tickets/${id}`, {
        method: 'DELETE',
        headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
    })
    .then(() => {
        loadTickets(); // Refresh the ticket list after deletion
    })
    .catch(error => console.error('Error deleting ticket:', error));
}

// Open ModalView
function openEditModal(ticketId) {
    selectedTicketId = ticketId;

    fetch(`http://localhost:3000/api/tickets/${ticketId}`)
        .then(response => response.json())
        .then(ticket => {
            if (ticket.comments && !Array.isArray(ticket.comments)) {
                console.error('Expected an array of comments, but got:', ticket.comments);
                alert('Failed to load comments properly.');
                return;
            }

            // Populate modal fields with ticket data
            document.getElementById('edit-title').value = ticket.title;
            document.getElementById('edit-description').value = ticket.description;
            // Clear the comment textbox
             document.getElementById('newComment').value = '';
            // Handle comments
            if (ticket.comments && Array.isArray(ticket.comments) && ticket.comments.length > 0) {
            updateCommentList(ticket.comments);
            } else {
            document.getElementById('commentList').innerHTML = '<li>No comments yet.</li>';
            }
            // Show the modalview
            document.getElementById('ticketModal').style.display = 'block';
        })
        .catch(error => {
            console.error('Error opening edit modal:', error.message);
            alert('Failed to open the edit modal. Please try again.');
        });
}
// Update comment list
function updateCommentList(comments) {
    const commentListContainer = document.getElementById('commentList');
    commentListContainer.innerHTML = ''; // Clear any existing comments

    if (comments.length === 0) {
        commentListContainer.innerHTML = '<li>No comments yet.</li>';
        return;
    }

    comments.forEach(comment => {
        const listItem = document.createElement('li');
        listItem.textContent = comment;
        commentListContainer.appendChild(listItem);
    });
}

// Function to add a new comment
async function addComment() {
    const comment = document.getElementById('newComment').value;

    if (!comment) {
        alert('Comment cannot be empty');
        return;
    }

    if (!selectedTicketId) {
        console.error('No ticketId found for adding a comment.');
        alert('Failed to add comment. Please try again.');
        return;
    }

    try {
        const response = await fetch(`http://localhost:3000/api/tickets/${selectedTicketId}/comments`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ comment })
        });

        if (!response.ok) {
            throw new Error('Failed to add comment');
        }

        const result = await response.json();

        if (result.error) {
            throw new Error(result.error);
        }

        updateCommentList(result.comments);
        alert('Comment added successfully!');
    } catch (error) {
        console.error('Error adding comment:', error.message);
        alert('Failed to add comment. Please try again.');
    }
}

// Save Changes by TicketID
async function saveChanges() {
    const title = document.getElementById('edit-title').value.trim();
    const description = document.getElementById('edit-description').value.trim();

    if (!selectedTicketId) {
        console.error('No ticketId available for saving changes.');
        alert('Cannot save changes. Please try again.');
        return;
    }

    if (!title || !description) {
        alert('Title and description cannot be empty.');
        return;
    }

    try {
        const response = await fetch(`http://localhost:3000/api/tickets/${selectedTicketId}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ title, description })
        });

        if (!response.ok) {
            throw new Error('Failed to save changes');
        }

        const result = await response.json();

        if (result.success) {
            alert('Changes saved successfully!');
            loadTickets(); // Reload the tickets list
            closeModal();  // Close the modal after saving
        } else {
            alert('Failed to save changes. Please try again.');
        }
    } catch (error) {
        console.error('Error saving changes:', error.message);
        alert('An error occurred while saving changes. Please try again.');
    }
}


function closeModal() {
    const modal = document.getElementById('ticketModal');
    modal.style.display = 'none';
}

function logout() {
    localStorage.removeItem('token');
    window.location.href = '/login.html';
}

function clearForm() {
    document.getElementById('title').value = '';
    document.getElementById('description').value = '';
}
