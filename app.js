const count=10;
const acessKey='zwTgacSWTV4UweSL2G1cKFPtPMtKQyJG7hBmlYtNKBo';
const apiUrl=`https://api.unsplash.com/photos/random/?client_id=${acessKey}&count=${count}`;
let photoArray=[];
let ready=false;
let imagesLoaded=0;
let totalImages=0;
function setAttributes(element,attributes){
    for(let key in attributes){
        element.setAttribute(key,attributes[key]);
    }
}
function imageLoaded(){
    imagesLoaded++;
    if(imagesLoaded===totalImages){
        ready=true;
    }
}
function displayPhotos(){
    totalImages=photoArray.length;
    imagesLoaded=0;

    const top=document.getElementById('image-container');
    photoArray.forEach((photo)=>{
        const anchor=document.createElement('a');
        const img=document.createElement('img');
        setAttributes(anchor,{
            href:photo.links.html,
            target:'_blank',
        });
        setAttributes(img,{
            src:photo.urls.regular,
            alt:photo.alt_description,
            title:photo.alt_description,
        })
        img.addEventListener('load',imageLoaded);
    anchor.append(img);
    top.append(anchor);
    })
}
async function getPhotos(){
    try{
        const response =await fetch(apiUrl);
        photoArray=await response.json();
        console.log(photoArray);
        displayPhotos();
    }
    catch (error){
        console.log(error);
    }
}
getPhotos();
window.addEventListener('scroll',()=>{
    if(window.scrollY+window.innerHeight>=document.body.offsetHeight&&ready){
        getPhotos();
        ready=false;
        console.log('reachedEnd');
    }
})

