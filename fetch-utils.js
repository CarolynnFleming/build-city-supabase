
const SUPABASE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlIjoiYW5vbiIsImlhdCI6MTY0MTMzNzM5MywiZXhwIjoxOTU2OTEzMzkzfQ.5E636TNNCxoTJtTExSwOutzpIBjtS4WLgOnqfXdnvvM';

const SUPABASE_URL = 'https://igyvpimxugpyxqzzyuep.supabase.co';


const client = supabase.createClient(SUPABASE_URL, SUPABASE_KEY);

export async function getUser() {
    return client.auth.session();
}

export async function createDefaultWorld() {
    const response = await client
        .from('world')
        .insert([
            {
                name: 'Portland',
                ocean_id: 1,
                magic_id: 1,
                sky_id: 1,
                slogans: [],
                user_id: client.auth.user().id
            }
        ]);

    return checkError(response);
}

export async function updateName(newName) {
   
    const user = await getUser();

    const response = await client
    
        .from('world')

        .update({ name: newName })

        .match({ user_id: user.user.id })
   
        .single();
  
   
    return checkError(response);
}

export async function updateOceanId(newId) {
   
    const user = await getUser();

    const response = await client
    
        .from('world')
   
        .update({ ocean_id: newId })
  
        .match({ user_id: user.user.id })
    
        .single();
 
    return checkError(response);
}

export async function updateMagicId(newId) {
    
    const user = await getUser();

    const response = await client

        .from('world')
    
        .update({ magic_id: newId })
    
        .match({ user_id: user.user.id })
    
        .single();
   
    return checkError(response);
}

export async function updateSkyId(newId) {
    
    const user = await getUser();

    const response = await client
    
        .from('world')
    
        .update({ sky_id: newId })
   
        .match({ user_id: user.user.id })
   
        .single();
  
    
    return checkError(response);
}

export async function updateSlogans(slogansArray) {
    
    const user = await getUser();

    const response = await client
  
        .from('world')
 
        .update({ slogans: slogansArray })
    
        .match({ user_id: user.user.id })
   
        .single();
  
    return checkError(response);
}


export async function getWorld() {
    const response = await client
        .from('world')
        .select()
        .single();

    return checkError(response);
}


export async function checkAuth() {
    const user = await getUser();

    if (!user) location.replace('../'); 
}

export async function redirectIfLoggedIn() {
    if (await getUser()) {
        location.replace('./world');
    }
}

export async function signupUser(email, password){
    const response = await client.auth.signUp({ email, password });
    
    return response.user;
}

export async function signInUser(email, password){
    const response = await client.auth.signIn({ email, password });

    return response.user;
}

export async function logout() {
    await client.auth.signOut();

    return window.location.href = '/';
}

function checkError({ data, error }) {
    return error ? console.error(error) : data;
}
