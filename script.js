const imgContainer = document.getElementById('image-container');
const loader = document.getElementById('loader-xd');

let ready = false;
let imagesLoaded = 0;
let totalImages = 0;

let photoArray = [];
// Unsplash API
const count = 32;
const apiKey = 'sBhLcLSgNZK5IZmAKHgWGiJJVC695UdWcv3AuWUGad0';
const apiUrl = `https://api.unsplash.com/photos/random/?client_id=${apiKey}&count=${count}`

// Check if all images were loaded
function imageLoaded(){
    imagesLoaded++;
    if(imagesLoaded === totalImages -2){
        ready = true;
        loader.hidden = true;
    }
}

// Helper Function to Set Attributes on DOM
function setAttributes(element,attributes){
    for(const key in attributes){
        element.setAttribute(key, attributes[key]);
    }
}

// Create elements for links and photos, add to dom
function displayPhoto(){
    imagesLoaded=0;
    totalImages = photoArray.length;
    // Run function for each element in photo array
    photoArray.forEach((photo) => {
        // create <a> item to link to full photo
        const item = document.createElement('a');
        setAttributes(item,{
            href: photo.links.html,
            target: '_blank',
        })

        // create <img> for photo
        const img = document.createElement('img')
        setAttributes(img,{
            src: photo.urls.regular,
            alt: photo.alt_description,
            title: photo.alt_description,
        })

        // Event Listeners, check when each is finished loading
        img.addEventListener('load',imageLoaded);

        // Put <img> inside <a> and then put both inside image container
        item.appendChild(img);
        imgContainer.appendChild(item);
    });
}



// Get photos from API
async function getPhotos(){
    try{
        const response = await fetch(apiUrl);
        photoArray = await response.json();
        displayPhoto()
    }catch(error){
    // error msg
    }
}

// Check if scrolling near bottom of page, load more photos
window.addEventListener('scroll', () =>{
    if(window.innerHeight + window.scrollY >= document.body.offsetHeight - 1000 && ready){
        ready = false;
        getPhotos();
    }
})

//On Loading
getPhotos()