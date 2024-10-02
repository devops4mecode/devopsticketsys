// comments.js
document.addEventListener('DOMContentLoaded', () => {
    document.querySelectorAll('.ticket-comments').forEach(commentSection => {
        const ticketId = commentSection.dataset.id;
        
        fetch(`/api/tickets/${ticketId}/comments`)
            .then(response => response.json())
            .then(comments => {
                comments.forEach(comment => {
                    addCommentToSection(comment, commentSection);
                });
            });

        commentSection.querySelector('.add-comment-form').addEventListener('submit', event => {
            event.preventDefault();
            const commentText = event.target.querySelector('textarea').value;

            fetch(`/api/tickets/${ticketId}/comments`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ text: commentText })
            })
            .then(response => response.json())
            .then(comment => {
                addCommentToSection(comment, commentSection);
            });
        });
    });

    function addCommentToSection(comment, section) {
        const commentItem = document.createElement('div');
        commentItem.classList.add('comment');
        commentItem.innerText = comment.text;
        section.querySelector('.comments-list').appendChild(commentItem);
    }
});
