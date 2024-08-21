import { writable } from 'svelte/store';

// Création du store points
export const points = writable(0);

// Fonction pour calculer le rang
export function calculateRank(points) {
    if (points < 100) return 'Réserve';
    if (points < 200) return 'Remplaçant';
    if (points < 300) return 'Titulaire';
    if (points < 400) return 'Pro';
    if (points < 500) return 'Star';
    if (points < 600) return 'Prime';
    return 'G.O.A.T'; // Considérer tout au-delà de 699 comme "G.O.A.T"
}

// Création du store rank basé sur la valeur actuelle de points
export const rank = writable(calculateRank(0)); // 80 est la valeur initiale de points

// Abonnement au store points pour mettre à jour le rank à chaque changement
points.subscribe(value => {
    rank.set(calculateRank(value));
});