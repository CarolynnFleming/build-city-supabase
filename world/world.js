import { checkAuth, logout } from '../fetch-utils.js';

checkAuth();

const oceanDropdown = document.querySelector('.ocean-dropdown');
const magicDropdown = document.querySelector('.magic-dropdown');
const skyDropdown = document.querySelector('.sky-dropdown');

const oceanImgEl = document.querySelector('.ocean-img');
const magicImgEl = document.querySelector('.magic-img');
const skyImgEl = document.querySelector('.sky-img');

const nameForm = document.querySelector('.mame-form');
const worldNameEl = document.querySelector('.world-name');

const sloganForm = document.querySelector('.slogan-form');
const sloganListEl = document.querySelector('.slogan-list');

const logoutButton = document.getElementById('logout');

logoutButton.addEventListener('click', () => {
    logout();
});

oceanDropdown.addEventListener('change', async() => {
    // e.target.value would have worked here too :)
    const updatedWorld = await updateOceanId(oceanDropdown.value);

    displayWorld(updatedWorld);
});

// if i understood the water dropdown, i understand this one
magicDropdown.addEventListener('change', async() => {
    // e.target.value would have worked here too :)
    const updatedWorld = await updateMagicId(MagicDropdown.value);

    displayWorld(updatedWorld);
});

// if i understood the previous two dropdowns, i get this one for free too
skyDropdown.addEventListener('change', async() => {
    // e.target.value would have worked here too :)
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
    // - check to see if this user has a city already
    // (try to fetch it from supabase--
    const world = await getWorld();
    // if there is no city already, create a new one and display that)
    if (!world) {
        // make a city and display it
        const newWorld = await createDefaultWorld();
        
        displayCity(newWorld);
    } else {
        // display that city
        displayCity(world);
    }
});

function displayCity(world) {
    // change textContent of city name span to the city name
    worldNameEl.textContent = world.name;
    // change the image src waterfront image
    oceanImgEl.src = `../assets/ocean-${world.ocean_id}.jpeg`;
    // change the image src skyline image
    magicImgEl.src = `../assets/magic-${world.magic_id}.jpeg`;
    // change the image src castle image
    skyImgEl.src = `../assets/sky-${world.sky_id}.jpeg`;

    // loop through slogans and render and append each slogan to the slogan div
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

    // go get the new slogan from the form
    const newSlogan = data.get('slogan');

    // go get the old city (and its many slogans) from supabase
    const city = await getWorld();

    // that city has an array of slogans living on city.slogans
    // push the new slogan in the array of all the existing slogans
    city.slogans.push(newSlogan);

    const updatedWorld = await updateSlogans(world.slogans);
    
    displayCity(updatedWorld);
});