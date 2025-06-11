const searchParams = new URLSearchParams(window.location.search);

document.addEventListener('DOMContentLoaded', async () => {
    const userSearchParam = searchParams.get('user');
    const userInfo = await getUserInfo(userSearchParam);
    const UUID = userInfo.uuid;
    const username = userInfo.username;
    const statsJSON = await pullStats(UUID);

    // General
    const xp = statsJSON.xp;
    const kills = statsJSON.kills;
    const deaths = statsJSON.deaths;
    const killDeathRatio = (kills / deaths).toFixed(1);
    const currentKillStreak = statsJSON.currentKillStreak;
    const highestKillStreak = statsJSON.highestKillStreak;
    const bounty = statsJSON.bounty;

    document.getElementById("title").innerText = username + "'s stats";
    document.getElementById("username-text").innerText = username;
    document.getElementById("skull").src = document.getElementById("skull").src.replace(/uuid/g, UUID);
    document.getElementById("skin").src = document.getElementById("skin").src.replace(/uuid/g, UUID);

    document.getElementById("xp").innerHTML = document.getElementById("xp").innerHTML + " " + xp;
    document.getElementById("kills").innerHTML = document.getElementById("kills").innerHTML + " " + kills;
    document.getElementById("deaths").innerHTML = document.getElementById("deaths").innerHTML + " " + deaths;
    document.getElementById("killDeathRatio").innerHTML = document.getElementById("killDeathRatio").innerHTML + " " + killDeathRatio;
    document.getElementById("currentKillstreak").innerHTML = document.getElementById("currentKillstreak").innerHTML + " " + currentKillStreak;
    document.getElementById("highestKillstreak").innerHTML = document.getElementById("highestKillstreak").innerHTML + " " + highestKillStreak;
    document.getElementById("bounty").innerHTML = document.getElementById("bounty").innerHTML + " " + bounty;

    document.getElementById("stats-container").style.visibility = "visible";
    document.getElementById("stats-container").style.opacity = "1";
    document.getElementById("not-found").remove();
    document.getElementById("loading").remove();
})

function getUserInfo(userSearchParam) {
    return fetch("https://api.ashcon.app/mojang/v2/user/" + userSearchParam)
        .then(response => response.json())
        .then(body => body);
}

function pullStats(UUID) {
    return fetch("https://api.hglabor.de/stats/FFA/" + UUID)
        .then(response => {
            if (!response.ok) {
                console.log("hglabor api request failed");
                document.getElementById("not-found").style.visibility = "visible";
                document.getElementById("not-found").style.opacity = "1";
                document.getElementById("stats-container").remove();
                document.getElementById("loading").remove();
            }
            return response.json();
        })
}