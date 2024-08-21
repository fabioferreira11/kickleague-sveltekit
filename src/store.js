import { writable } from 'svelte/store';

// Crée un store `writable` pour gérer le total des points accumulés par l'utilisateur
export const totalPoints = writable(0);

/* 
   Crée un store `writable` pour gérer la liste des joueurs sélectionnés. `selectedPlayers` est initialisé en tant que tableau vide et peut être mis à jour avec la liste des joueurs choisis par l'utilisateur.
*/
export const selectedPlayers = writable([]);
