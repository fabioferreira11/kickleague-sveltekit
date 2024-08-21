// Fonction pour charger les joueurs associés à un utilisateur spécifique
export async function loadPlayers(userId) {
    console.log("Attempting to load players for userId:", userId);

    // Vérification si le pack a déjà été ouvert pour cet utilisateur
    const packOpenedResponse = await fetch('/api/checkIfPackOpened', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userId })
    });
    const packOpenedData = await packOpenedResponse.json();
    console.log("Pack opened data:", packOpenedData);

    // Si le pack est déjà ouvert, récupérer les joueurs de l'utilisateur
    if (packOpenedData.opened) {
        const playersResponse = await fetch('/api/getUserPlayers', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ userId })
        });
        let players = await playersResponse.json();  // Utilisation de `let` pour permettre la modification
        console.log("Loaded players:", players);
        
        // Ajout d'un ordre aux joueurs pour les identifier dans l'ordre reçu
        players = players.map((player, index) => ({ ...player, order: index }));
        return players;  // Retourne la liste des joueurs avec l'ordre ajouté
    } else {
        console.log("Pack not opened for userId:", userId);
        return [];  // Retourne un tableau vide si le pack n'a pas été ouvert
    }
}