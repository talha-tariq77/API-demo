

let btn = document.querySelector('button');

let body = document.querySelector('body');


function removePastErrorMessages() {
    let oldErrorMssges = document.querySelectorAll('h4.errorMessage');

    for (errorMessage of oldErrorMssges) {
        body.removeChild(errorMessage);
    }
}

function removeImage() {
    body.removeChild(document.querySelector('img'));
}


function generateAPIImage(query) {
    fetch('https://api.giphy.com/v1/gifs/translate?api_key=NyycM2kXfoX2fBgZUY39b2GdZSm0EJvT&s=' + query,
        {mode: 'cors'}
    )
    .then(
        (response) => {
            return response.json();
        }
    )
    .then(
        (response) => {
            
            removeImage();
            
            console.log('2nd then', response.meta.status);

            if (response.meta.status != 200 || response.data.length == 0) {
                throw new Error('Error: ' + response.meta.status);
            }
            else {
                removePastErrorMessages();
            }

            let gif = document.createElement('img');
            console.log(response);
            console.log(gif);
            console.log(gif);
            gif.setAttribute('src', response.data.images.original.url);

            body.appendChild(gif);
            // 
        }
    )
    .catch((msg) => {

        removePastErrorMessages();

        console.log(msg);
        console.log('at catch');
        console.log(msg);
        let errorMessage = document.createElement('h4');
        errorMessage.setAttribute('class', 'errorMessage');

        errorMessage.textContent = 'Error: Gif not found';

        body.appendChild(errorMessage);
    })
}

function search(e) {
    e.preventDefault();
    let searchVal = document.querySelector('#searchBox').value;
    generateAPIImage(searchVal);
}


btn.addEventListener('click', search);


// live server auto reloads often (?)
// so is sending > 100 requests?
