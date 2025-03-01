document.getElementById('fetchJoke').addEventListener('click', async function() {
    const category = document.getElementById('category').value;
    const type = document.getElementById('type').value;
    const lang = document.getElementById('lang').value;

    const apiUrl = `https://v2.jokeapi.dev/joke/${category}?lang=${lang}&type=${type === 'Any' ? '' : type}`;
    
    try {
        const response = await fetch(apiUrl);
        const data = await response.json();
        
        if (data.error) {
            document.getElementById('jokeDisplay').innerText = 'Sorry, no jokes found.';
            return;
        }

        let joke = '';
        
        if (data.type === 'single') {
            joke = data.joke;
        } else if (data.type === 'twopart') {
            joke = `${data.setup}\n\n${data.delivery}`;
        }

        document.getElementById('jokeDisplay').innerText = joke;

    } catch (error) {
        document.getElementById('jokeDisplay').innerText = 'Failed to fetch joke. Please try again.';
        console.error(error);
    }
});
