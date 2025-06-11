document.addEventListener('DOMContentLoaded', () => {
    const serverDomain = "hglabor.de";
    const apiURL = "https://api.mcsrvstat.us/3/" + serverDomain;

    let online = false;
    let players = 0;

    fetch(apiURL)
        .then(response => response.json())
        .then(body => {
            online = body.online;
            players = body.players.online;

            if (online) {
                document.getElementById("online-circle").style.borderColor = "#74ff7d";
                document.getElementById("online-circle").style.backgroundColor = "#74ff7d";
                document.getElementById("online-circle").style.boxShadow = "0 0 10px rgb(140, 255, 131)";

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

            document.getElementById("server-status").innerText = "fehler";
            document.getElementById("server-status").style.color = "red";
        });

    getLeaderboard("xp");

})

document.addEventListener('mousedown', (event) => {
    if (event.target.matches('img')) {
        event.preventDefault();
    }
})

function openPopup(popupName) {
    document.getElementById(popupName).style.visibility = "visible";
    document.getElementById(popupName).style.opacity = "1";
    document.getElementById("darken").style.visibility = "visible";
    document.getElementById("darken").style.opacity = "1";
}

function closePopup() {
    document.getElementById("darken").style.opacity = "0";
    document.getElementById("darken").style.visibility = "hidden";

    document.getElementById("playPopup").style.opacity = "0";
    document.getElementById("playPopup").style.visibility = "hidden";

    document.getElementById("eventsPopup").style.opacity = "0";
    document.getElementById("eventsPopup").style.visibility = "hidden";

    document.getElementById("leaderboardPopup").style.opacity = "0";
    document.getElementById("leaderboardPopup").style.visibility = "hidden";

    document.getElementById("imprintPopup").style.opacity = "0";
    document.getElementById("imprintPopup").style.visibility = "hidden";
}

function getLeaderboard(sort) {
    return fetch("https://api.hglabor.de/stats/FFA/top?sort=" + sort)
        .then(response => response.json())
        .then(async body => {
            console.log(body);
            let i = 1;
            for (const user of body) {
                const playerId = user.playerId;
                const userInfo = await getUserInfo(playerId);

                const username = userInfo.username;
                const kills = user.kills;
                const deaths = user.deaths;
                let killDeathRatio;
                if (deaths === 0) {
                    killDeathRatio = kills;
                } else {
                    killDeathRatio = (kills / deaths).toFixed(1);
                }
                const currentKillStreak = user.currentKillStreak;
                const highestKillStreak = user.highestKillStreak;
                const bounty = user.bounty;
                const xp = user.xp;


                const table = document.getElementById('leaderboardTable');
                const row = document.createElement('tr');

                const td1 = document.createElement('td');
                const td2 = document.createElement("td")
                const td3 = document.createElement("td")
                const td4 = document.createElement("td")
                const td5 = document.createElement("td")
                const td6 = document.createElement("td")
                const td7 = document.createElement("td")
                const td8 = document.createElement("td")
                const td9 = document.createElement("td")

                td1.innerText = i;
                td2.innerText = username;
                td3.innerText = kills;
                td4.innerText = deaths;
                td5.innerText = killDeathRatio;
                td6.innerText = currentKillStreak;
                td7.innerText = highestKillStreak;
                td8.innerText = bounty;
                td9.innerText = xp;

                table.appendChild(row)
                row.appendChild(td1);
                row.appendChild(td2);
                row.appendChild(td3);
                row.appendChild(td4);
                row.appendChild(td5);
                row.appendChild(td6);
                row.appendChild(td7);
                row.appendChild(td8);
                row.appendChild(td9);

                i++;
            }
        })
}

function getUserInfo(userSearchParam) {
    return fetch("https://api.ashcon.app/mojang/v2/user/" + userSearchParam)
        .then(response => response.json())
        .then(body => body);
}