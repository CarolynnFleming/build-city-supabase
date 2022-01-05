import { checkAuth, logout, getWorld, createDefaultWorld, updateSlogans, updateMagicId, updateOceanId, updateSkyId, updateName } from '../fetch-utils.js';

checkAuth();

const oceanDropdown = document.querySelector('.ocean-dropdown');
const magicDropdown = document.querySelector('.magic-dropdown');
const skyDropdown = document.querySelector('.sky-dropdown');

const oceanImgEl = document.querySelector('.ocean-img');
const magicImgEl = document.querySelector('.magic-img');
const skyImgEl = document.querySelector('.sky-img');

const nameForm = document.querySelector('.name-form');
const worldNameEl = document.querySelector('.world-name');

const sloganForm = document.querySelector('.slogan-form');
const sloganListEl = document.querySelector('.slogan-list');

const logoutButton = document.getElementById('logout');

logoutButton.addEventListener('click', () => {
    logout();
});

oceanDropdown.addEventListener('change', async() => {
   
    const updatedWorld = await updateOceanId(oceanDropdown.value);

    displayWorld(updatedWorld);
});


magicDropdown.addEventListener('change', async() => {
 
    const updatedWorld = await updateMagicId(magicDropdown.value);

    displayWorld(updatedWorld);
});

skyDropdown.addEventListener('change', async() => {
   
    const updatedWorld = await updateSkyId(skyDropdown.value);

    displayWorld(updatedWorld);
});

nameForm.addEventListener('submit', async(e) => {
    e.preventDefault();
    
    const data = new FormData(nameForm);

    const name = data.get('name');

    const updatedWorld = await updateName(name);
    
    displayWorld(updatedWorld);
});

window.addEventListener('load', async() => {
    
    const world = await getWorld();
    
    if (!world) {
        
        const newWorld = await createDefaultWorld();
        
        displayWorld(newWorld);
    } else {
       
        displayWorld(world);
    }
});

function displayWorld(world) {
    
    worldNameEl.textContent = world.name;
   
    oceanImgEl.src = `../assets/ocean-${world.ocean_id}.jpeg`;
    
    magicImgEl.src = `../assets/magic-${world.magic_id}.jpeg`;
   
    skyImgEl.src = `../assets/sky-${world.sky_id}.jpeg`;

    
    sloganListEl.textContent = '';

    for (let slogan of world.slogans) {
        const sloganEl = document.createElement('p');

        sloganEl.classList.add('slogan');

        sloganEl.textContent = slogan;

        sloganListEl.append(sloganEl);
    }
}

sloganForm.addEventListener('submit', async(e) => {
    e.preventDefault();

    const data = new FormData(sloganForm);

    
    const newSlogan = data.get('slogan');

    
    const world = await getWorld();

    world.slogans.push(newSlogan);

    const updatedWorld = await updateSlogans(world.slogans);
    
    displayWorld(updatedWorld);
});