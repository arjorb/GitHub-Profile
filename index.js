const APIURL = "https://api.github.com/users/";

const main = document.querySelector("main");
const form = document.querySelector("form");
const search = document.getElementById("search");

//Big part
getUser('arjorb');
async function getUser (username){
   const resp = await fetch(APIURL + username);
   const respData = await resp.json();


   createUserCard(respData);
}

getRepos('arjorb');

async function getRepos(username){
    const resp = await fetch(APIURL + username+'/repos');
    const resData = await resp.json();
    addReposToCard(resData);
}
function createUserCard(user){
    
    cardHTML = `
    <div class="card">
        <div>
            <img class="avatar" src="${user.avatar_url}" alt="${user.name}"/>
        </div>
        <div class="info">
            <h2>${user.name}</h2>
            <p>${user.bio}</p>

            <ul>
                <li>
                ${user.followers}
                <strong>Followers</strong>
                </li>
                <li>
                ${user.following}
                <strong>Following</strong>
                </li>
                <li>
                ${user.public_repos}
                <strong>Repos</strong>
                </li>
            </ul>
            <div class="repos" id="repos"></div>
        </div>
    </div>
    `
    main.innerHTML = cardHTML;
}

function addReposToCard(repos){
    const reposEl = document.getElementById("repos");
    repos.slice(0,7).forEach(repo =>{
        const repoEl = document.createElement("a");
        repoEl.classList.add("repo");
        
        repoEl.href = repo.html_url;
        repoEl.target = '_blank';
        repoEl.innerText = repo.name;
        reposEl.appendChild(repoEl);

    })
}
form.addEventListener('submit', (e) =>{
    e.preventDefault();
    const searchTerm = search.value;

    if(searchTerm){
        getUser(searchTerm);
        getRepos(searchTerm);
        search.value = '';
    }
})