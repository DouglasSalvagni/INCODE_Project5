const option = 
{
    animation: true,
    delay: 10000
}

function toasty() {

    const toastHTMLElement = document.getElementById("message");

    const toastElement = new bootstrap.Toast( toastHTMLElement, option );

    toastElement.show();

}

if(toast) {
    toasty()
}

function deleteSchedule(id){

    fetch('http://localhost:3000/userSchedules/delete/' + id, {
        method: 'DELETE',
    })
    .then(res => res.json())
    .then(res => location.href = "http://localhost:3000/userSchedules");
}