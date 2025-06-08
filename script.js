document.addEventListener('DOMContentLoaded', (event) => {
    const serverDomain = "hglabor.de";
    const apiURL = "https://api.mcsrvstat.us/3/" + serverDomain;

    let online = false;
    let players = 0;

    fetch(apiURL)
        .then(response => response.json()) // send response body to next then chain
        .then(body => {
            online = body.online;
            players = body.players.online;

            if (online) {
                document.getElementById("server-status").innerText = players + " online"
            } else {
                document.getElementById("online-circle").style.borderColor = "red";
                document.getElementById("online-circle").style.backgroundColor = "red";
                document.getElementById("online-circle").style.boxShadow = "0 0 10px rgb(255, 131, 131)";

                document.getElementById("server-status").innerText = "offline";
                document.getElementById("server-status").style.color = "#ffbec2"
            }
        }) // you can use response body here
        .catch(err => {
            console.log(err);
            document.getElementById("online-circle").style.borderColor = "red";
            document.getElementById("online-circle").style.backgroundColor = "red";
            document.getElementById("online-circle").style.boxShadow = "0 0 10px rgb(255, 131, 131)";

            document.getElementById("server-status").innerText = "error";
            document.getElementById("server-status").style.color = "red";
        });
})

document.addEventListener('mousedown', (event) => {
    if (event.target.matches('img')) {
        event.preventDefault();
    }
})