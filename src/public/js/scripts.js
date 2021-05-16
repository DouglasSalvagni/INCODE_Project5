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

console.log('message')





