document.addEventListener('DOMContentLoaded', () => {
    const form = document.querySelector('form');
    const togglePassword = document.getElementById('toggle-password');
    const passwordField = document.getElementById('password');
    const loadingSpinner = document.getElementById('loading-spinner');

    // Dummy account data
    const dummyAccounts = [
        { username: 'Devansh', password: '1243' },
        { username: 'user2', password: 'password2' }
    ];

    form.addEventListener('submit', (event) => {
        event.preventDefault();
        loadingSpinner.style.display = 'block'; // Show spinner

        setTimeout(() => {
            const username = document.getElementById('username').value;
            const password = document.getElementById('password').value;
            const rememberMe = document.getElementById('remember-me').checked;

            // Remove existing error message
            const existingError = form.querySelector('.error-message');
            if (existingError) {
                existingError.remove();
            }

            // Check against dummy accounts
            const account = dummyAccounts.find(acc => acc.username === username && acc.password === password);

            if (account) {
                if (rememberMe) {
                    localStorage.setItem('username', username);
                }
                window.location.href = 'chat.html'; // Replace 'chat.html' with the actual path
            } else {
                const errorMessage = document.createElement('div');
                errorMessage.textContent = 'Invalid username or password!';
                errorMessage.className = 'error-message';
                form.appendChild(errorMessage);
            }
            loadingSpinner.style.display = 'none'; // Hide spinner
        }, 1000); // Simulate network delay
    });

    // Toggle password visibility
    togglePassword.addEventListener('click', () => {
        const type = passwordField.type === 'password' ? 'text' : 'password';
        passwordField.type = type;
        togglePassword.classList.toggle('hide-password');
    });

    // Create the dot element
    const cursorDot = document.createElement('div');
    cursorDot.className = 'cursor-dot';
    document.body.appendChild(cursorDot);

    // Move the dot with the cursor
    document.addEventListener('mousemove', (event) => {
        const x = event.clientX;
        const y = event.clientY;
        cursorDot.style.left = `${x}px`;
        cursorDot.style.top = `${y}px`;
    });

    // Add hover effect to the cursor dot when over the button
    document.addEventListener('mouseover', (event) => {
        if (event.target.tagName === 'BUTTON') {
            cursorDot.classList.add('hover'); // Add hover class
        }
    });

    document.addEventListener('mouseout', (event) => {
        if (event.target.tagName === 'BUTTON') {
            cursorDot.classList.remove('hover'); // Remove hover class
        }
    });

    // Remove the click animation logic
    document.addEventListener('mousedown', () => {
        cursorDot.classList.add('clicked'); // Optional: if you want to keep the click effect
    });

    document.addEventListener('mouseup', () => {
        cursorDot.classList.remove('clicked'); // Optional: if you want to keep the click effect
    });

    // Disable the context menu
    document.addEventListener('contextmenu', (event) => {
        event.preventDefault(); // Prevent the default context menu
    });

    // Remember Me functionality
    const rememberedUsername = localStorage.getItem('username');
    if (rememberedUsername) {
        document.getElementById('username').value = rememberedUsername;
        document.getElementById('remember-me').checked = true;
    }
});
