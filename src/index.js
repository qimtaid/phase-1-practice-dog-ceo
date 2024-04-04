console.log('%c HI', 'color: firebrick;');

document.addEventListener('DOMContentLoaded', () => {
    let allBreeds = [];
    //api points
    const imgUrl = "https://dog.ceo/api/breeds/image/random/4";
    const breedUrl = "https://dog.ceo/api/breeds/list/all";

    //DOMto attach event listeners
    const dogImgContainer = document.getElementById('dog-image-container');
    const dogBreedUl = document.getElementById('dog-breeds');
    const breedDropdown = document.getElementById('breed-dropdown');

    //listen for clicks
    dogBreedUl.addEventListener("click", function(event){
        event.target.style.color = 'red';
    });

    breedDropdown.addEventListener('change', (event)=>{
        const letter = event.target.value;
        const filteredBreeds = allBreeds.filter((breed) => breed.startsWith(letter));
        dogBreedUl.innerHTML = createDogList(filteredBreeds);
    });

    fetch(imgUrl, { method: 'GET'})
    .then((response) => {
        if (response.ok){
            return response.json();
        }
        throw new Error('Network response was not ok.');
    })
    .then((dogImgData)=>{
        dogImgContainer.innerHTML = dogImgData.message.map((imgUrl) => `<img src="${imgUrl}">`).join('');
    })
    .catch((error) => {
        console.error('Error fetching images:', error);
    });

    fetch(breedUrl, {method: 'GET'})
    .then((resp)=> resp.json())
    .then((breedData)=>{
        allBreeds = Object.keys(breedData.message);
        console.log(allBreeds);
        dogBreedUl.innerHTML = createDogList(allBreeds);
    })
    .catch((error) => {
        console.error('Error fetching breeds:', error);
    });
});

function createDogList(dogBreedArray){
    const dogLiStringArray = dogBreedArray.map((breed) => `<li>${breed}</li>`);
    return dogLiStringArray.join('');
}
