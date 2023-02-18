console.log("script.js loaded");
$('#btnLoad').click(() => {
    // if (ok == true) {
    //     document.querySelector('body').removeChild(temp);
    //     ok = false;
    // }
    getName();
})

//getName();
let ok = false;

async function getName () {
    const response = await fetch('/playerName');
    const data = await response.json()
    let image = data.value[Math.floor(Math.random() * data.value.length)];
    let imageUrl = image.url;
    let imageName = image.title;

    if (document.querySelector('#idName') !== null) {
        document.querySelector('#idName').remove();
    }

    let img = document.createElement('img');
    img.src = imageUrl;
    img.alt = imageName;
    img.id = "idName"
    
    document.querySelector('.generator').appendChild(img);
    ok = true;
    // console.log(imageUrl); 
}