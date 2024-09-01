document.addEventListener('DOMContentLoaded', () => {
    const buttons = document.querySelectorAll('.toggle-children');
    const profileButtons = document.querySelectorAll('.view-profile');
    const addChildButtons = document.querySelectorAll('.add-child');
    const deleteButtons = document.querySelectorAll('.delete-node');
    const submitAncestorButton = document.getElementById('submit-ancestor');
    const addAncestorForm = document.getElementById('add-ancestor-form');

    buttons.forEach(button => {
        button.addEventListener('click', () => {
            const childrenContainer = button.nextElementSibling;

            if (childrenContainer.style.display === 'none' || childrenContainer.style.display === '') {
                childrenContainer.style.display = 'flex';
                button.textContent = 'Hide Children';
            } else {
                childrenContainer.style.display = 'none';
                button.textContent = 'Show Children';
            }
        });
    });

    profileButtons.forEach(button => {
        button.addEventListener('click', () => {
            const userName = button.getAttribute('data-name');
            window.location.href = `profile.html?name=${encodeURIComponent(userName)}`;
        });
    });

    addChildButtons.forEach(button => {
        button.addEventListener('click', () => {
            const parentId = button.getAttribute('data-parent');
            const parentNode = document.getElementById(parentId);
            const childrenContainer = parentNode.querySelector('.children');

            // Create a new node element
            const newNode = document.createElement('div');
            newNode.className = 'node';
            newNode.innerHTML = `
                <div class="node-content">
                    <img src="path/to/default.jpg" alt="New Child" class="node-image">
                    <h2>New Child</h2>
                    <p>Born: [Year]</p>
                </div>
                <button class="toggle-children">Show Children</button>
                <button class="view-profile" data-name="New Child">View Profile</button>
                <button class="add-child" data-parent="new-child">Add Child</button>
                <button class="delete-node">Delete</button>
                <div class="children"></div>
            `;

            // Add new node to the children container
            childrenContainer.appendChild(newNode);

            // Reattach event listeners to newly added nodes
            attachEventListeners(newNode);
        });
    });

    submitAncestorButton.addEventListener('click', () => {
        const name = document.getElementById('ancestor-name').value;
        const birth = document.getElementById('ancestor-birth').value;
        const death = document.getElementById('ancestor-death').value;

        if (name) {
            // Add a new ancestor at the root of the tree (customize as needed)
            const familyTree = document.getElementById('family-tree');

            const newAncestorNode = document.createElement('div');
            newAncestorNode.className = 'node';
            newAncestorNode.innerHTML = `
                <div class="node-content">
                    <img src="path/to/default.jpg" alt="${name}" class="node-image">
                    <h2>${name}</h2>
                    <p>Born: ${birth}</p>
                    ${death ? `<p>Died: ${death}</p>` : ''}
                </div>
                <button class="toggle-children">Show Children</button>
                <button class="view-profile" data-name="${name}">View Profile</button>
                <button class="add-child" data-parent="${name}">Add Child</button>
                <button class="delete-node">Delete</button>
                <div class="children"></div>
            `;

            familyTree.appendChild(newAncestorNode);
            addAncestorForm.style.display = 'none'; // Hide form after adding

            // Reattach event listeners to newly added nodes
            attachEventListeners(newAncestorNode);
        }
    });

    // Show form to add new ancestor
    document.querySelector('#add-ancestor').addEventListener('click', () => {
        addAncestorForm.style.display = 'block';
    });

    // Function to attach event listeners to a node
    function attachEventListeners(node) {
        const toggleButtons = node.querySelectorAll('.toggle-children');
        const profileButtons = node.querySelectorAll('.view-profile');
        const addChildButtons = node.querySelectorAll('.add-child');
        const deleteButtons = node.querySelectorAll('.delete-node');

        toggleButtons.forEach(button => {
            button.addEventListener('click', () => {
                const childrenContainer = button.nextElementSibling;

                if (childrenContainer.style.display === 'none' || childrenContainer.style.display === '') {
                    childrenContainer.style.display = 'flex';
                    button.textContent = 'Hide Children';
                } else {
                    childrenContainer.style.display = 'none';
                    button.textContent = 'Show Children';
                }
            });
        });

        profileButtons.forEach(button => {
            button.addEventListener('click', () => {
                const userName = button.getAttribute('data-name');
                window.location.href = `profile.html?name=${encodeURIComponent(userName)}`;
            });
        });

        addChildButtons.forEach(button => {
            button.addEventListener('click', () => {
                const parentId = button.getAttribute('data-parent');
                const parentNode = document.getElementById(parentId);
                const childrenContainer = parentNode.querySelector('.children');

                // Create a new node element
                const newNode = document.createElement('div');
                newNode.className = 'node';
                newNode.innerHTML = `
                    <div class="node-content">
                        <img src="path/to/default.jpg" alt="New Child" class="node-image">
                        <h2>New Child</h2>
                        <p>Born: [Year]</p>
                    </div>
                    <button class="toggle-children">Show Children</button>
                    <button class="view-profile" data-name="New Child">View Profile</button>
                    <button class="add-child" data-parent="new-child">Add Child</button>
                    <button class="delete-node">Delete</button>
                    <div class="children"></div>
                `;

                // Add new node to the children container
                childrenContainer.appendChild(newNode);

                // Reattach event listeners to newly added nodes
                attachEventListeners(newNode);
            });
        });

        deleteButtons.forEach(button => {
            button.addEventListener('click', () => {
                const node = button.parentElement;
                if (confirm('Are you sure you want to delete this node?')) {
                    node.remove();
                }
            });
        });
    }
    // Dropdowns.
    $('#nav > ul').dropotron({
        mode: 'fade',
        noOpenerFade: true,
        speed: 300
    });
// Nav.

		// Toggle.
        $(
            '<div id="navToggle">' +
                '<a href="#navPanel" class="toggle"></a>' +
            '</div>'
        )
            .appendTo($body);

    // Panel.
        $(
            '<div id="navPanel">' +
                '<nav>' +
                    $('#nav').navList() +
                '</nav>' +
            '</div>'
        )
            .appendTo($body)
            .panel({
                delay: 500,
                hideOnClick: true,
                hideOnSwipe: true,
                resetScroll: true,
                resetForms: true,
                side: 'left',
                target: $body,
                visibleClass: 'navPanel-visible'
            });


    // Initialize event listeners for existing nodes
    attachEventListeners(document.getElementById('family-tree'));
});

const express = require('express');
const bcrypt = require('bcryptjs');
const bodyParser = require('body-parser');
const app = express();
const port = 3000;

// Middleware
app.use(bodyParser.json());

// Mock database (replace with a real database in production)
const users = {}; // Stores user data with hashed passwords

// Register endpoint
app.post('/register', async (req, res) => {
    const { username, password } = req.body;

    if (users[username]) {
        return res.status(400).send('User already exists');
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    users[username] = hashedPassword; // Save hashed password

    res.send('User registered');
});

// Login endpoint
app.post('/login', async (req, res) => {
    const { username, password } = req.body;
    const hashedPassword = users[username];

    if (hashedPassword && await bcrypt.compare(password, hashedPassword)) {
        // Authentication successful
        res.send('Login successful');
    } else {
        res.status(401).send('Invalid credentials');
    }
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});

(jQuery);