<script>
    import '../../styles/global.css';
    import { onMount, onDestroy } from 'svelte';
    import Header from '$lib/header.svelte';
    import Button from '$lib/button.svelte';
    import Joueur from '$lib/joueur-gameweek.svelte';
    import { totalPoints } from '../../store.js';
    import PointsInfoModal from '$lib/pointsmatchInfoModal.svelte';
    import MenuBurger from '$lib/MenuBurger.svelte';
    import { goto } from '$app/navigation';
    import { getNextMatchByTeam } from '$lib/api';

    // Variables d'état pour gérer l'affichage et les données
    let isMobile = false;
    let showModal = false;
    let selectedPlayerIds = [];
    let userId = null;
    let upcomingMatches = [];

    // Fonction pour ouvrir la modal d'informations
    function openModal() {
        showModal = true;
    }

    // Fonction pour vérifier si l'utilisateur utilise un mobile
    function checkScreenSize() {
        if (typeof window !== 'undefined') {
            isMobile = window.innerWidth <= 768;
        }
    }

    // Fonction pour récupérer l'ID utilisateur depuis l'API
    async function fetchUserId() {
        try {
            const response = await fetch('/api/getUserId', { method: 'GET' });
            if (response.ok) {
                const data = await response.json();
                userId = data.userId;
            } else {
                goto('/');
            }
        } catch (err) {
            goto('/');
        }
    }

    // Fonction pour charger les joueurs sélectionnés depuis le stockage local
    async function loadSelectedPlayers() {
        if (userId) {
            const savedComposition = localStorage.getItem('userCompositions');
            if (savedComposition) {
                const compositions = JSON.parse(savedComposition);
                const userIdCompo = compositions[userId];
                if (userIdCompo) {
                    selectedPlayerIds = Object.values(userIdCompo).map(player => player.id);
                }
            }
        }
    }

    // Fonction pour gérer la réception des informations de l'équipe
    function handleTeamInfo(event) {
        const teamInfo = event.detail;
        fetchNextMatch(teamInfo.id);
    }

    // Fonction pour vérifier si un match existe déjà dans la liste des prochains matchs
    function matchExists(homeTeamId, awayTeamId) {
        return upcomingMatches.some(
            match =>
                (match.teams.home.id === homeTeamId && match.teams.away.id === awayTeamId) ||
                (match.teams.home.id === awayTeamId && match.teams.away.id === homeTeamId)
        );
    }

    // Fonction pour récupérer le prochain match d'une équipe
    async function fetchNextMatch(teamId) {
        try {
            const nextMatch = await getNextMatchByTeam(teamId);
            if (nextMatch) {
                const homeTeamId = nextMatch.teams.home.id;
                const awayTeamId = nextMatch.teams.away.id;

                if (!matchExists(homeTeamId, awayTeamId)) {
                    upcomingMatches = [...upcomingMatches, nextMatch];
                }
            }
        } catch (error) {
            console.error("Error fetching next match:", error);
        }
    }

    // Hook pour monter le composant, charger l'ID utilisateur et les joueurs sélectionnés
    onMount(async () => {
        await fetchUserId();
        if (userId) {
            await loadSelectedPlayers();
        }

        if (typeof window !== 'undefined') {
            checkScreenSize();
            window.addEventListener('resize', checkScreenSize);
        }
    });

    // Hook pour nettoyer les événements lors de la destruction du composant
    onDestroy(() => {
        if (typeof window !== 'undefined') {
            window.removeEventListener('resize', checkScreenSize);
        }
    });

    export let numero = "1"; // Numéro de la semaine de match

    // Réinitialisation des points totaux à chaque chargement de la page
    totalPoints.set(0);
</script>

{#if isMobile}
    <MenuBurger />
{:else}
    <Header style="margin-top: 2vh;"/>
{/if}
<section class="gameweek-text">
    <h2>Match week {numero}</h2>
    <p>Sur cette page, vous pouvez consulter et peaufiner la composition d'équipe que vous avez préparée pour la Match Week en cours. Avant le coup d'envoi, c'est l'endroit idéal pour apporter les ajustements nécessaires à votre formation. Assurez-vous que votre équipe est prête à briller sur le terrain.</p>
</section>
<section class="equipe-gameweek">
    <div class="composition">
        {#each selectedPlayerIds as playerId}
            <Joueur {playerId} on:teaminfo={handleTeamInfo}/>
        {/each}
    </div>
    <div class="button">
        <Button text="Modifier" url="/compo" />
    </div>
</section>
<div class="points-compo">
    <h3>Points de votre équipe : {$totalPoints}</h3>
    <div class="points-info">
        <h3 on:click={openModal}>i</h3>
    </div> 
    <PointsInfoModal bind:showModal={showModal} />
</div>
<section class="match-text">
    <h2>Matchs</h2>
    <p>Ici, vous avez l'opportunité unique de suivre les performances des équipes dont vous avez choisi les joueurs. Découvrez si vos équipes favorites ont brillé par une victoire, tenu bon dans un match nul, ou fait face à une défaite.</p>
</section>
<section class="match">
    {#each upcomingMatches as match}
        <div class="resultat">
            <div class="equipe1">
                <img src={match.teams.home.logo} alt="logo du club">
                <h2>{match.teams.home.name}</h2>
            </div>
            <div class="date-match">
                <h3>{new Date(match.fixture.date).toLocaleDateString('fr-FR', { weekday: 'long' })}</h3>
                <h2>{match.fixture.date.split('T')[1].slice(0, 5)}</h2>
            </div>
            <div class="equipe2">
                <img src={match.teams.away.logo} alt="logo du club">
                <h2>{match.teams.away.name}</h2>
            </div>
        </div>
    {/each}
</section>

<style>
    .gameweek-text, .match-text{
        text-align: center;
        padding: 0 5vw;
    }
    
    .gameweek-text h2,.gameweek-text p,.match-text h2,.match-text p{
        margin: 2vh auto;
    }

    .equipe-gameweek{
        width: 90vw;
        margin: auto;
        padding: 5vh 0 3vh 0;
        background: linear-gradient(-180deg,rgba(97, 197, 62, 1) 0%, rgba(25, 127, 60, 1) 100%);
        border-radius: 20px 20px 20px 0;
    }

    .composition{
        width: 100%;
        margin: auto;
        display: flex;
        flex-wrap: wrap;
        align-items: center;
        justify-content: center;
        gap: 10px;
    }

    .button{
        display: flex;
        justify-content: center;
        margin-top: 2vh;
    }

    .points-compo{
        width: 75vw;
        height: 5vh;
        margin: 0 0 5vh 5vw;
        padding: 0 3vw 2vh 3vw;
        background-color: rgba(25, 127, 60, 1);
        border-radius: 0 0 20px 20px;
        display: flex;
        justify-content: flex-start;
        align-items: center;
    }

    .points-compo h3{
        width: 100%;
        margin-block: 0;
        color: var(--white);
        font-weight: 300;
    }

    .points-info{
        z-index: 1;
    }

    .points-info h3{
        height: 25px;
        width: 25px;
        margin: 1vh 0 0 5vw;
        background-color: var(--white);
        color: var(--green);
        border-radius: 7px;
        display: flex;
        justify-content: center;
        align-items: center;
        cursor: pointer;
        font-family: "freiburgin_line_personal_use", sans-serif;
        font-size: var(--titremobil);
        font-weight: 300;
    }

    .match{
        width: 90vw;
        margin:  0 auto 2vh auto;
        padding: 2vh 5vw;
        background: linear-gradient(-180deg,rgba(97, 197, 62, 1) 0%, rgba(25, 127, 60, 1) 100%);
        display: flex;
        flex-direction: column;
        border-radius: 20px ;
    }

    .resultat{
        display: flex;
        justify-content: space-between;
        align-items: flex-end;
        width: 100%;
    }

    .equipe1,.equipe2{
        width: 40%;
        display: flex;
        flex-direction: column;
        align-items: center;
    }

    .equipe1 h2,.equipe2 h2,.resultat h2{
        color: var(--white);
        padding-top: 1vh;
    }

    .equipe1 img, .equipe2 img{
        height: 6vh;
    }

    .date-match h3{
        margin: 0;
        font-family: "freiburgin_line_personal_use", sans-serif;
        color: var(--white);
        font-weight: 300;
    }
    @media (min-width: 768px) {
    .gameweek-text,.match-text{
        width: 40%;
        padding: 0 3vw;
        text-align: left;
    }
    
    .gameweek-text h2{
        margin: 5vh 0 0 0;
    }
    
    .gameweek-text p{
        margin-bottom: 2vh;
    }

    .equipe-gameweek{
        width: 93vw;
        margin: auto;
    }

    .composition{
        width: 94%;
        flex-wrap: nowrap;
        gap: 0;
    }

    .button{
        justify-content: flex-end;
        margin-right: 5vh;
    }

    .points-compo{
        width: 28vw;
        height: 7vh;
        margin: 0 0 5vh 3vw;
        padding: 0 1vw 2vh 1vw;
    }

    .points-compo h3{
        margin-block: 0;
        color: var(--white);
    }

    .points-info h3{
        height: 35px;
        width: 35px;
        margin: 1vh 0 0 2vw;
        color: var(--green);
        border-radius: 10px;
    }

    .match{
        width: 50vw;
        margin:  0 auto 2vh 3vw;
        padding: 2vh 3vw;
    }

    .equipe1 h2,.equipe2 h2,.resultat h2{
        margin-bottom: 2vh;
    }

    .equipe1 img, .equipe2 img{
        height: 7vh;
    }
    }
</style>