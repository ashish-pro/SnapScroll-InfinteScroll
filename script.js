const imgContainer = document.getElementById('image-container');
const loader = document.getElementById('loader-xd');

let photoArray = [];

// Unsplash API
const count = 10;
const apiKey = 'sBhLcLSgNZK5IZmAKHgWGiJJVC695UdWcv3AuWUGad0';
const apiUrl = `https://api.unsplash.com/photos/random/?client_id=${apiKey}&count=${count}`

// Create elements for links and photos, add to dom




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

//On Loading
// getPhotos()