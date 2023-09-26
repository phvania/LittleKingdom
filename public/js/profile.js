const createNewBookingBtn = document.getElementById("createBooking")

createNewBookingBtn.addEventListener('click', async (e) => {
    console.log(e);

    // const response = await fetch('/booknow', {
    //     method: 'POST',
    //     headers: { 'Content-Type': 'application/json' },
    // });

    // if (response.ok) {
    document.location.replace('/booknow');
    // } else {
    //     alert(response.statusText);
    // }
});
