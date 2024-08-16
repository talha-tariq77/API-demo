

let btn = document.querySelector('button');

let body = document.querySelector('body');


function removePastErrorMessages() {
    let oldErrorMssges = document.querySelectorAll('h4.errorMessage');

    for (errorMessage of oldErrorMssges) {
        body.removeChild(errorMessage);
    }
}

function removeImage() {
    if (document.querySelector('img')) {
        body.removeChild(document.querySelector('img'));
    }
}


async function generateAPIImage(query) {

    let response1 = await fetch('https://api.giphy.com/v1/gifs/translate?api_key=NyycM2kXfoX2fBgZUY39b2GdZSm0EJvT&s=' + query,
        {mode: 'cors'}
    );

    console.log('response1', response1);


    let response2 = await response1.json();

    console.log('response2', response2);

                
            console.log('2nd then', response2.meta.status);

            removePastErrorMessages();
            removeImage();

            if (response2.meta.status != 200 || response2.data.length == 0) {
                throw new Error('Error: ' + response2.meta.status);
            }

            let gif = document.createElement('img');
            console.log(response2);
            console.log(gif);
            console.log(gif);
            gif.setAttribute('src', response2.data.images.original.url);

            body.appendChild(gif);
}

function search(e) {
    e.preventDefault();
    let searchVal = document.querySelector('#searchBox').value;

    generateAPIImage(searchVal)
    .catch((msg) => {

        // console.log(msg);
        // console.log('at catch');
        // console.log(msg);
        let errorMessage = document.createElement('h4');
        errorMessage.setAttribute('class', 'errorMessage');

        errorMessage.textContent = 'Error: Gif not found';

        body.appendChild(errorMessage);
    });
}


btn.addEventListener('click', search);


// live server auto reloads often (?)
// so is sending > 100 requests?

// there is no large try-catch, such that the error would straight away be handled by the catch?