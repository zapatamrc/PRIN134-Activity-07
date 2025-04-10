class Player {
    constructor(name, team) {
        this.name = name;
        this.team = team;
        this.score = 0;
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

function getTiedPlayers(players) {
    const topScore = players[0].score;
    return players.filter(player => player.score === topScore);
}

function resetTiedPlayersScores(players) {
    players.forEach(player => {
        player.score = 0;
    });
}

function tieBreakerRound(players, attempts, roundNumber) {
    console.log("\n", String.fromCodePoint(0x1F525), `Tiebreaker Round needed between:`, players.map(p => p.name).join(", "));
    console.log("\n", String.fromCodePoint(0x1F3C0), `Round ${roundNumber+1} Begins!`);
    resetTiedPlayersScores(players);
    players.forEach(player => {
        shootBall(player, attempts);
        console.log(`${player.name} (${player.team}) scored ${player.score} successful shots.`);
    });
}

function runGame() {
    const players = [
        new Player("James", "Lakers"),
        new Player("Curry", "Warriors"),
        new Player("Shai", "Thunder"),
        new Player("Zion", "Pelicans"),
        new Player("Durant", "Suns"),
        new Player("Giannis", "Bucks"),
        new Player("Kyrie", "Mavericks"),
        new Player("Tatum", "Celtics")
    ];

    const attemptsPerRound = 5; 

    players.forEach(player => shootBall(player, attemptsPerRound));

    let rankedPlayers = rankPlayers(players);

    console.log(String.fromCodePoint(0x1F3C6), " Rankings after this round:");
    rankedPlayers.forEach((player, index) => {
        console.log(`${index + 1}. ${player.name} (${player.team}) - ${player.score} points`);
    });

    let tieBreakerCount = 1;
    while (isTie(rankedPlayers)) {
        let tiedPlayers = getTiedPlayers(rankedPlayers);
        tieBreakerRound(tiedPlayers, attemptsPerRound, tieBreakerCount);
        rankedPlayers = rankPlayers(tiedPlayers);
        console.log(String.fromCodePoint(0x1F3C6), " Rankings after this round:");
        rankedPlayers.forEach((player, index) => {
            console.log(`${index + 1}. ${player.name} (${player.team}) - ${player.score} points`);
        });
        tieBreakerCount++;
    }

    console.log(`\n${String.fromCodePoint(0x1F3C6)} The champion is ${rankedPlayers[0].name} (${rankedPlayers[0].team}) with ${rankedPlayers[0].score} points!`);
}

runGame();
