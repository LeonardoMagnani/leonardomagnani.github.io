let textUser = document.querySelector('#text-user');
let buttonUser = document.querySelector('#button-user');
let returnUsers = [];
let divData = document.getElementById('data');

class User {
    constructor (name) {
        this.name =  name;
    }
}

buttonUser.addEventListener('click', eventUser);
textUser.addEventListener('keypress', function keyPressed(e) {if (e.key == 'Enter') return eventUser()});

function eventUser () {
    fetch(`https://api.github.com/users/${textUser.value}`, {
        method: 'GET',
        headers: {
            Accept: 'application/vnd.github.v3+json',
        }
        })
        .then((response) => {
            return response.json();
        })
        .then((data) => {
            showScreen(data);
    });
    textUser.value = '';
}

function showScreen (user) {
   if (user.message == "Not Found") {
        document.getElementById("data").style.display = "none";
        document.getElementById("not-found").style.display = "flex";
        document.getElementById("not-found-p").innerHTML = "Ops... Parece que digitou um usuário inválido!";
        return "Not found user";
   } else if (user.documentation_url == "https://docs.github.com/rest/overview/resources-in-the-rest-api#rate-limiting") {
        document.getElementById("data").style.display = "none";
        document.getElementById("not-found").style.display = "flex";
        document.getElementById("not-found-p").innerHTML = "Ops... Parece que você atingiu o limite de buscas!";
        return "Rate limiting";
   } else {
        document.getElementById("not-found").style.display = "none";
        returnUsers.push(new User(user.name));
        let userName = document.getElementById("user-name");
        userName.innerHTML = user.name;
        let userBio = document.getElementById("user-bio");
        userBio.innerHTML = user.bio;
        let profileImg = document.getElementById("user-img");
        profileImg.src = user.avatar_url;
        let followers = document.getElementById("user-followers");
        followers.innerHTML = user.followers;
        let following = document.getElementById("user-following");
        following.innerHTML = user.following;
        let location = document.getElementById("user-location");
        location.innerHTML = user.location;
        let profileLink = document.getElementById("link");
        profileLink.href = user.html_url;
        let profileId = document.getElementById("user-id");
        profileId.innerHTML = user.id;
        document.getElementById("data").style.display = "flex";
   }
}

