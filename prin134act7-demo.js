class Player {
    constructor(name, team) {
        this.name = name;
        this.score = 0;
        this.team = team;
    }
}

function calculateSuccessRate() {
    return Math.random();
}

function shootBall(player, attempts) {
    for (let i = 0; i < attempts; i++) {
        if (calculateSuccessRate() > 0.5) {
            player.score += 1;
        }
    }
}

function rankPlayers(players) {
    return players.sort((a, b) => b.score - a.score);
}

function isTie(players) {
    const topScore = players[0].score;
    return players.filter(player => player.score === topScore).length > 1;
}

function resetTiedPlayersScores(players) {
    const topScore = players[0].score;
    players.forEach(player => {
        if (player.score === topScore) {
            player.score = 0;
        }
    });
}

function tieBreakerRound(players, attempts) {
    console.log("🏀 Tie-breaker round! 🏀");
    resetTiedPlayersScores(players);
    players.forEach(player => {
        if (player.score === 0) {
            shootBall(player, attempts);
        }
    });
}

function runGame() {
    const players = [
        new Player("LeBron", "Lakers"),
        new Player("Curry", "Warriors"),
        new Player("Durant", "Nets"),
        new Player("Giannis", "Bucks"),
        new Player("Jokic", "Nuggets")
    ];

    const attemptsPerRound = 5; 

    players.forEach(player => shootBall(player, attemptsPerRound));

    let rankedPlayers = rankPlayers(players);

    while (isTie(rankedPlayers)) {
        tieBreakerRound(rankedPlayers, attemptsPerRound);
        rankedPlayers = rankPlayers(rankedPlayers);
    }


    console.log("🏆 Final Rankings �");
    rankedPlayers.forEach((player, index) => {
        console.log(`${index + 1}. ${player.name} (${player.team}) - Score: ${player.score}`);
    });

    console.log(`\n🎉 Winner: ${rankedPlayers[0].name} ${String.fromCodePoint(0x1F3C6)}`);
}

runGame();