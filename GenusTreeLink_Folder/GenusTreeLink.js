document.addEventListener("DOMContentLoaded", function () {

    // Function to toggle the visibility of children nodes
    function toggleChildren(button) {
        const childrenContainer = button.parentElement.querySelector('.children');
        if (childrenContainer.style.display === 'none' || !childrenContainer.style.display) {
            childrenContainer.style.display = 'block';
            button.textContent = 'Hide Children';
        } else {
            childrenContainer.style.display = 'none';
            button.textContent = 'Show Children';
        }
    }

    // Function to add a new child node
    function addChild(button) {
        const parentNode = button.parentElement;
        const childrenContainer = parentNode.querySelector('.children');

        const childName = prompt('Enter the name of the child:');
        const childBirth = prompt('Enter the year of birth:');
        if (!childName || !childBirth) {
            alert('Name and year of birth are required.');
            return;
        }

        const newChild = document.createElement('div');
        newChild.classList.add('node');
        newChild.innerHTML = `
            <div class="node-content">
                <img src="https://img.icons8.com/quill/100/name.png" alt="${childName}" class="node-image">
                <h2>${childName}</h2>
                <p>Born: ${childBirth}</p>
            </div>
            <button class="toggle-children">Show Children</button>
            <button class="view-profile" data-name="${childName}">View Profile</button>
            <button class="add-child">Add Child</button>
            <button class="delete-node">Delete</button>
            <div class="children" style="display: none;"></div>
        `;
        childrenContainer.appendChild(newChild);

        // Attach event listeners to the new node's buttons
        attachEventListeners(newChild);
    }

    // Function to delete a node
    function deleteNode(button) {
        if (confirm('Are you sure you want to delete this node?')) {
            const node = button.parentElement;
            node.remove();
        }
    }

    // Function to view the profile (just a placeholder for now)
    function viewProfile(button) {
        const name = button.dataset.name;
        alert(`Viewing profile for: ${name}`);
        // Implement your profile viewing logic here
    }

    // Function to attach event listeners to a node
    function attachEventListeners(node) {
        node.querySelector('.toggle-children').addEventListener('click', function () {
            toggleChildren(this);
        });
        node.querySelector('.add-child').addEventListener('click', function () {
            addChild(this);
        });
        node.querySelector('.delete-node').addEventListener('click', function () {
            deleteNode(this);
        });
        node.querySelector('.view-profile').addEventListener('click', function () {
            viewProfile(this);
        });
    }

    // Attach event listeners to the existing nodes
    document.querySelectorAll('.node').forEach(node => {
        attachEventListeners(node);
    });

    // Show form to add ancestor
    const addAncestorForm = document.getElementById('add-ancestor-form');
    document.getElementById('submit-ancestor').addEventListener('click', function (event) {
        event.preventDefault();

        const name = document.getElementById('ancestor-name').value;
        const birth = document.getElementById('ancestor-birth').value;
        const death = document.getElementById('ancestor-death').value;

        if (!name || !birth) {
            alert('Please fill out all required fields.');
            return;
        }

        const newAncestor = document.createElement('div');
        newAncestor.classList.add('node');
        newAncestor.innerHTML = `
            <div class="node-content">
                <img src="https://img.icons8.com/quill/100/name.png" alt="${name}" class="node-image">
                <h2>${name}</h2>
                <p>Born: ${birth}${death ? `, Died: ${death}` : ''}</p>
            </div>
            <button class="toggle-children">Show Children</button>
            <button class="view-profile" data-name="${name}">View Profile</button>
            <button class="add-child">Add Child</button>
            <button class="delete-node">Delete</button>
            <div class="children" style="display: none;"></div>
        `;
        document.getElementById('family-tree').appendChild(newAncestor);

        // Attach event listeners to the new ancestor node
        attachEventListeners(newAncestor);

        // Clear the form
        document.getElementById('ancestor-name').value = '';
        document.getElementById('ancestor-birth').value = '';
        document.getElementById('ancestor-death').value = '';

        addAncestorForm.style.display = 'none';
    });
});
