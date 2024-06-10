document.addEventListener('DOMContentLoaded', () => {
    const randomButton = document.querySelector('.random');
    const breedDropdown = document.getElementById('breedDropdown');
    const breedButton = document.querySelector('.breed');
    
    randomButton.addEventListener('click', fetchRandomDog);
    breedButton.addEventListener('click', fetchBreedImages);
    
    populateBreeds();
    fetchDogInfo();
  
    function fetchDogInfo() {
      fetch('https://en.wikipedia.org/w/api.php?action=opensearch&origin=*&search=dog&formatversion=2')
        .then(response => response.json())
        .then(data => {
          document.getElementById('dogInfo').innerHTML = `<strong>${capitalize(data[0])}:</strong> ${data[2][0]} <a href="${data[3][0]}" alt="read more on wikipedia">Read more on Wikipedia</a>`;
        })
        .catch(error => console.error('Error fetching dog info:', error));
    }
  
    function fetchRandomDog() {
      fetch('https://dog.ceo/api/breeds/image/random')
        .then(response => response.json())
        .then(data => {
          document.getElementById('randomImageContainer').innerHTML = `<img src="${data.message}" alt="Random Dog"/>`;
        })
        .catch(error => console.error('Error fetching random dog:', error));
    }
  
    function populateBreeds() {
      fetch('https://dog.ceo/api/breeds/list/all')
        .then(response => response.json())
        .then(data => {
          const breeds = Object.keys(data.message);
          breeds.forEach(breed => {
            const option = document.createElement('option');
            option.value = breed;
            option.textContent = capitalize(breed);
            breedDropdown.appendChild(option);
          });
        })
        .catch(error => console.error('Error fetching breed list:', error));
    }
  
    function fetchBreedImages() {
      const selectedBreed = breedDropdown.value;
      fetch(`https://dog.ceo/api/breed/${selectedBreed}/images`)
        .then(response => response.json())
        .then(data => {
          const breedImages = data.message;
          const randomImage = breedImages[Math.floor(Math.random() * breedImages.length)];
          document.getElementById('breedImageContainer').innerHTML = `<img src="${randomImage}" alt="${capitalize(selectedBreed)}"/>`;
        })
        .catch(error => console.error('Error fetching breed images:', error));
    }
  
    function capitalize(str) {
      return str.replace(/\-/g, ' ')
        .split(' ')
        .map(word => word.charAt(0).toUpperCase() + word.slice(1))
        .join(' ');
    }
  });
  