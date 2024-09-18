document.getElementById('expense-form').addEventListener('submit', function(event) {
    event.preventDefault();

    const description = document.querySelector('input[name="description"]').value;
    const amount = document.querySelector('input[name="amount"]').value;
    const category = document.querySelector('select[name="category"]').value;

    if (!description || !amount || !category) {
        alert('Please fill out all fields!');
        return;
    }

    const formData = { description, amount, category };

    fetch('/add', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData)
    })
    .then(response => response.json())
    .then(expenses => {
        const tbody = document.querySelector('#expense-report tbody');
        tbody.innerHTML = '';  // Clear the table

        expenses.forEach(expense => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${expense.description}</td>
                <td>${expense.amount}</td>
                <td>${expense.category}</td>
            `;
            tbody.appendChild(row);
        });

        document.getElementById('expense-form').reset();  // Clear the form fields
    })
    .catch(error => {
        console.error('Error:', error);
    });
});
