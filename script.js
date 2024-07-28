const apiKey = 'anwRXynQSZmpsDyHzdYibQ6OF4TcmBrf';

document.addEventListener('DOMContentLoaded', () => {
    if (window.location.pathname.includes('events.html')) {
        fetchEvents();

        const filterButton = document.getElementById('filterButton');
        filterButton.addEventListener('click', fetchEvents);
    } else {
        document.getElementById('loginForm').addEventListener('submit', (e) => {
            e.preventDefault();
            // Add your authentication logic here
            window.location.href = 'events.html';
        });

        document.getElementById('registerForm').addEventListener('submit', (e) => {
            e.preventDefault();
            // Add your registration logic here
            window.location.href = 'events.html';
        });
    }
});

async function fetchEvents() {
    const eventType = document.getElementById('eventType').value;
    const startDate = document.getElementById('startDate').value;
    const endDate = document.getElementById('endDate').value;

    let url = `https://app.ticketmaster.com/discovery/v2/events.json?apikey=${apiKey}&city=Kansas%20City`;

    if (eventType) {
        url += `&classificationName=${eventType}`;
    }
    if (startDate) {
        url += `&startDateTime=${startDate}T00:00:00Z`;
    }
    if (endDate) {
        url += `&endDateTime=${endDate}T23:59:59Z`;
    }

    try {
        const response = await fetch(url);
        const data = await response.json();
        displayEvents(data._embedded.events);
    } catch (error) {
        console.error('Error fetching events:', error);
    }
}

function displayEvents(events) {
    const eventsList = document.getElementById('eventsList');
    eventsList.innerHTML = '';

    events.forEach(event => {
        const eventTile = document.createElement('div');
        eventTile.className = 'eventTile';

        const eventImage = document.createElement('img');
        eventImage.src = event.images[0].url;
        eventTile.appendChild(eventImage);

        const eventName = document.createElement('h3');
        eventName.textContent = event.name;
        eventTile.appendChild(eventName);

        const eventDate = document.createElement('p');
        eventDate.textContent = new Date(event.dates.start.dateTime).toLocaleString();
        eventTile.appendChild(eventDate);

        const eventLink = document.createElement('a');
        eventLink.href = event.url;
        eventLink.textContent = 'More Info';
        eventTile.appendChild(eventLink);

        const notifyButton = document.createElement('button');
        notifyButton.textContent = 'Notify Me';
        notifyButton.addEventListener('click', () => notifyMe(event));
        eventTile.appendChild(notifyButton);

        eventsList.appendChild(eventTile);
    });
}

function notifyMe(event) {
    // Here you can implement the logic to notify the user about the event
    alert(`You will be notified about the event: ${event.name}`);
}
