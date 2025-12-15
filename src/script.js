document.addEventListener('DOMContentLoaded', () => {
    const scheduleContainer = document.getElementById('schedule-container');
    const searchInput = document.getElementById('category-search');
    let allTalks = [];

    // In a real app, you'd fetch from a URL. For bundling, we'll replace this.
    fetch('talks.json')
        .then(response => response.json())
        .then(data => {
            allTalks = data;
            renderSchedule(allTalks);
        })
        .catch(error => {
            console.error('Error fetching schedule:', error);
            scheduleContainer.innerHTML = '<p>Could not load schedule. Please try again later.</p>';
        });

    searchInput.addEventListener('input', (e) => {
        const searchTerm = e.target.value.toLowerCase();
        const filteredTalks = allTalks.filter(item => {
            if (item.type === 'break') {
                return true; // Always show breaks
            }
            if (!item.category || item.category.length === 0) {
                return false;
            }
            return item.category.some(cat => cat.toLowerCase().includes(searchTerm));
        });
        renderSchedule(filteredTalks);
    });

    function renderSchedule(scheduleData) {
        if (!scheduleContainer) return;
        
        scheduleContainer.innerHTML = ''; // Clear existing schedule

        if (scheduleData.length === 0) {
            scheduleContainer.innerHTML = '<p>No talks match your search.</p>';
            return;
        }

        scheduleData.forEach(item => {
            const scheduleItem = document.createElement('div');
            scheduleItem.classList.add('schedule-item');

            const timeDiv = document.createElement('div');
            timeDiv.classList.add('time');
            timeDiv.textContent = `${item.startTime} - ${item.endTime}`;

            const detailsDiv = document.createElement('div');
            detailsDiv.classList.add('details');

            if (item.type === 'talk') {
                scheduleItem.classList.add('talk');
                
                const title = document.createElement('h2');
                title.textContent = item.title;

                const speakers = document.createElement('p');
                speakers.classList.add('speakers');
                speakers.textContent = `By: ${item.speakers.join(', ')}`;

                const description = document.createElement('p');
                description.textContent = item.description;

                const category = document.createElement('div');
                category.classList.add('category');
                item.category.forEach(cat => {
                    const span = document.createElement('span');
                    span.textContent = cat;
                    category.appendChild(span);
                });
                
                detailsDiv.appendChild(title);
                detailsDiv.appendChild(speakers);
                detailsDiv.appendChild(description);
                detailsDiv.appendChild(category);

            } else if (item.type === 'break') {
                scheduleItem.classList.add('break');
                const title = document.createElement('h2');
                title.textContent = item.title;
                detailsDiv.appendChild(title);
            }

            scheduleItem.appendChild(timeDiv);
            scheduleItem.appendChild(detailsDiv);
            scheduleContainer.appendChild(scheduleItem);
        });
    }
});
