/*

Will need to adapt this to work with your backend or data storage solution.

*/

document.addEventListener('DOMContentLoaded', () => {
    // Get the user's name from query parameters
    const urlParams = new URLSearchParams(window.location.search);
    const userName = urlParams.get('name');

    // Set profile name
    document.getElementById('profile-name').textContent = userName;

    // Example logic to set profile image and achievements (should be replaced with real data loading)
    document.getElementById('profile-image').src = `path/to/${userName.toLowerCase()}.jpg`;

    // Handle save achievements button click
    document.getElementById('save-achievements').addEventListener('click', () => {
        const achievements = document.getElementById('achievements-text').value;
        // Save achievements (you need to implement the actual save functionality)
        console.log(`Saving achievements for ${userName}: ${achievements}`);
    });

    // Back to family tree
    document.getElementById('back-to-tree').addEventListener('click', () => {
        window.location.href = '/GenusTreeLink_Folder/GenusTreeLink.index.html';
    });
});
