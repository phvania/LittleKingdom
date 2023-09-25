const newFormHandler = async (event) => {
    event.preventDefault();

    const bookDaycare = document.querySelector('#daycare-name').value.trim();
    const bookDate = document.querySelector('#book-date').value.trim();
    const bookTime = document.querySelector('#book-time').value.trim();
    // const bookType = document.querySelector('#book-type').value.trim();
    const bookKidAge = document.querySelector('#kid-age').value.trim();
    const bookKidFname = document.querySelector('#kid-firstname').value.trim();
    const bookKidLname = document.querySelector('#kid-lastname').value.trim();

    // GET all Daycares and get ID
    if (bookDaycare) {
        const response = await fetch(`/api/daycares`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        });

        if (!  response.ok) {
            alert('Failed to get a daycare named: ',bookDaycare);
            return;
        }

        
    }
    // GET all Kids

    // Validate that the kid belongs to user
    // If not -> ask to add -> add -> continue -> else profile page

    // POST booking req.body = booking parameters

    if (bookDaycare && bookKidFname && bookKidLname) {
        const response = await fetch(`/api/projects`, {
            method: 'POST',
            body: JSON.stringify({ daycareToBook, needed_funding, description }),
            headers: {
                'Content-Type': 'application/json',
            },
        });

        if (response.ok) {
            document.location.replace('/profile');
        } else {
            alert('Failed to create project');
        }
    }
};

const delButtonHandler = async (event) => {
    if (event.target.hasAttribute('data-id')) {
        const id = event.target.getAttribute('data-id');

        const response = await fetch(`/api/bookings/${id}`, {
            method: 'DELETE',
        });

        if (response.ok) {
            document.location.replace('/profile');
        } else {
            alert('Failed to delete booking');
        }
    }
};

document
    .querySelector('.new-booking-form')
    .addEventListener('submit', newFormHandler);

document
    .querySelector('.bookings-list')
    .addEventListener('click', delButtonHandler);
