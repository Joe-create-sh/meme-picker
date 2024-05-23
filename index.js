import { catsData } from '/data.js';

const emotionSelector = document.getElementById('emotion-selector');
const getImageBtn = document.getElementById('get-image-btn');
const gifsOnlyOption = document.getElementById('gifs-only-option');
const memeModalInner = document.getElementById('meme-modal-inner');
const memeModal = document.getElementById('meme-modal');
const memeOverlay = document.getElementById('meme-overlay');
const memeModalCloseBtn = document.getElementById('meme-modal-close-btn');


emotionSelector.addEventListener('change', highlightCheckedOption);

memeModalCloseBtn.addEventListener('click', closeModal);

getImageBtn.addEventListener('click', function (e) { 

    e.preventDefault();
    renderCatGallery();
    clearSelections();

});

window.addEventListener('click', function (e) { 

    if (e.target == memeOverlay) {
        
        closeModal();

    }

});

function closeModal() {

    memeModal.style.display = 'none';
    memeOverlay.style.display = 'none';

}


function highlightCheckedOption(e) {

    const options = document.getElementsByClassName('option');

    for (let option of options) {

        option.classList.remove('highlight');
    }
    
    document.getElementById(e.target.id).parentElement.classList.add('highlight');
}   

function getMatchingCatsArray() {    

    const selectEl = document.querySelector('.emotion-selector');
    const selectedOptions = Array.from(selectEl.selectedOptions);
    const selectedValues = selectedOptions.map(option => option.value);
    const isGif = gifsOnlyOption.checked; 

    console.log('Selected Options:', selectedValues);
    console.log('GIF Only Option:', isGif);

    const matchingCatsArray = catsData.filter(cat => { 

        const matchesAllEmotions = selectedValues.some(value => cat.emotionTags.includes(value));
        const isGifMatch = isGif ? cat.isGif : true;
        return matchesAllEmotions && isGifMatch;

    });
        
    console.log('Matching Cats Array:', matchingCatsArray);
    return matchingCatsArray;
}



function renderCatGallery() {

    const catsArray = getMatchingCatsArray();

    if (catsArray.length > 0) {
        
        memeModalInner.innerHTML = catsArray.map(cat => {

            return  `<div class="thumbnail">                      
                        <a target="_blank" href="./images/${cat.image}">
                            <img class="cat-img" src="./images/${cat.image}" alt="${cat.alt}">
                        </a>            
                    </div>`;         
                        
        }).join('');

        memeModal.style.display = 'flex';
        memeOverlay.style.display = 'block';

    } else {

        memeModalInner.innerHTML = `<p>No matching cats found.</p>`;
        memeModal.style.display = 'flex';
        memeOverlay.style.display = 'block';

    }

  
}

function getEmotionsArray(cats) {  

    const emotionsArray = []; 

    for (let cat of cats) {

        for (let emotion of cat.emotionTags) {

            if (!emotionsArray.includes(emotion)) { 
                emotionsArray.push(emotion); 

            }
        }
    }

    return emotionsArray;  
}

function renderEmotionsSelection(cats) { 

    let selectItems = ``;  

    const emotions = getEmotionsArray(cats);
    
    for (let emotion of emotions) { 

        selectItems += `<option class="option" value="${emotion}">${emotion}</option>`;

    }

    emotionSelector.innerHTML = selectItems;

}

function clearSelections() {
    
    emotionSelector.selectedIndex = -1;

}

renderEmotionsSelection(catsData);