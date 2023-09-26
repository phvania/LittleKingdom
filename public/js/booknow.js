const newFormHandler = async (event) => {
    event.preventDefault();
    const bookDate = document.querySelector('#book-date').value.trim();
    const bookTime = document.querySelector('#book-time').value.trim();
    const userId = document.getElementById('userId').value.trim();

    let checkedOptions = {
        daycare_id: '',
        user_id: userId,
        kid_id: '',
        bookings_time: bookTime,
        bookings_date: bookDate,
        bookings_type: "PT"
    };

    for (let i = 0; i < event.target.children[0].children[1].children.length; i++) {
        if (event.target.children[0].children[1].children[i].checked) {

            checkedOptions.daycare_id = event.target.children[0].children[1].children[i].value;
        }
    }
    // console.log(checkedOptions);
    console.log(event.target.children[1].children[1].children.length);
    for (let i = 0; i < event.target.children[1].children[1].children.length; i++) {
        if (event.target.children[1].children[1].children[i].checked) {

            checkedOptions.kid_id = event.target.children[1].children[1].children[i].value;
        }
    }
    console.log(checkedOptions);

    if (bookDate && bookTime && userId && checkedOptions.kid_id && checkedOptions.daycare_id) {
        const response = await fetch(`/api/bookings`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(checkedOptions),
        });

        if (response.ok) {
            document.location.replace('/profile');
        } else {
            alert(response.statusText);
        }
    } else {
        alert("All fields are mandatory!");
        return;
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
