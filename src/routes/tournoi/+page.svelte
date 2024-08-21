<script>
    import'../../styles/global.css';
    import { onMount, onDestroy } from 'svelte';
    import { get } from 'svelte/store';
    import { rank } from '$lib/rankStore.js'; 
    import Header from '$lib/header.svelte';
    import Tournoi from '$lib/tournoi.svelte';
    import Voircompo from '$lib/voircompo.svelte';
    import MenuBurger from '$lib/MenuBurger.svelte';

    let isMobile = false;
    let selectedRankTournoi = 'all'; 
    let selectedRankCompo = 'all'; 
    let isOpenTournoi = false; 
    let isOpenCompo = false; 
    let filterTextTournoi = "Rank"; 
    let filterTextCompo = "Rank"; 

    // Hiérarchie des rangs utilisée pour filtrer les composants visibles
    const rankHierarchy = ['Réserve', 'Titulaire', 'Prime'];

    // Filtrage des rangs disponibles pour le tournoi et la composition en fonction du rang de l'utilisateur
    $: availableTournoiRanks = rankHierarchy.filter(r => shouldShowComponent(r));
    $: availableCompoRanks = rankHierarchy.filter(r => shouldShowComponent(r));

    // Fonction pour déterminer si un composant doit être affiché en fonction du rang de l'utilisateur
    function shouldShowComponent(componentRank) {
        const userRank = get(rank);

        if (userRank === 'Réserve' || userRank === 'Remplaçant') {
            return componentRank === 'Réserve';
        } else if (userRank === 'Star' || userRank === 'Pro' || userRank === 'Titulaire') {
            return componentRank === 'Réserve' || componentRank === 'Titulaire';
        } else if (userRank === 'Prime' || userRank === 'G.O.A.T') {
            return true; // Affiche tous les composants
        }

        return false;
    }

    // Vérifie la taille de l'écran pour adapter l'affichage mobile
    function checkScreenSize() {
        if (typeof window !== 'undefined') {
            isMobile = window.innerWidth <= 768;
        }
    }

    // Ajuste la largeur des options de filtre pour correspondre aux boutons de filtre
    function adjustOptionsWidth() {
        requestAnimationFrame(() => {
            const filterButtons = document.querySelectorAll('.filter-label');
            filterButtons.forEach(filterButton => {
                const optionsContainer = filterButton.nextElementSibling;
                if (optionsContainer && filterButton.offsetWidth) {
                    optionsContainer.style.width = `${filterButton.offsetWidth}px`;
                }
            });
        });
    }

    // Gestion de l'ouverture et de la fermeture des dropdowns de filtres pour le tournoi et la composition
    function toggleDropdownTournoi() {
        isOpenTournoi = !isOpenTournoi;
        if (isOpenTournoi) {
            adjustOptionsWidth();
        }
        if (isOpenCompo) {
            isOpenCompo = false;
            adjustOptionsWidth();
        }
    }

    function toggleDropdownCompo() {
        isOpenCompo = !isOpenCompo;
        if (isOpenCompo) {
            adjustOptionsWidth();
        }
        if (isOpenTournoi) {
            isOpenTournoi = false;
            adjustOptionsWidth();
        }
    }

    // Mise à jour des filtres sélectionnés pour le tournoi et la composition
    function selectRankTournoi(rank) {
        selectedRankTournoi = rank;
        filterTextTournoi = rank === 'all' ? 'Rank' : rank;
        isOpenTournoi = false;
        adjustOptionsWidth();
    }

    function selectRankCompo(rank) {
        selectedRankCompo = rank;
        filterTextCompo = rank === 'all' ? 'Rank' : rank;
        isOpenCompo = false;
        adjustOptionsWidth();
    }

    // Lifecycle hooks pour gérer les événements de montage et de démontage du composant
    onMount(() => {
        if (typeof window !== 'undefined') {
            checkScreenSize();
            window.addEventListener('resize', checkScreenSize);
        }
    });

    onDestroy(() => {
        if (typeof window !== 'undefined') {
            window.removeEventListener('resize', checkScreenSize);
        }
    });
</script>

{#if isMobile}
    <MenuBurger />
{:else}
    <Header style="margin-top: 2vh;" />
{/if}

<section class="tournoi">
    <div class="tournoi-text">
        <h2>Tournoi</h2>
        <p>Plongez au cœur de l'action sur la page Tournois, votre porte d'entrée vers les compétitions hebdomadaires palpitantes de la Kick League. Créez votre équipe de choc, composée de 5 joueurs clés, pour relever les défis.</p>
    </div>
    <section class="bg-tournoi">
        <div class="filter-container">
            <button class="filter-label {isOpenTournoi ? 'open' : ''}" on:click={toggleDropdownTournoi}>{filterTextTournoi}<div class={`fleche ${isOpenTournoi ? 'open' : ''}`}></div></button>
            {#if isOpenTournoi}
                <div class="filter-options">
                    <button on:click={() => selectRankTournoi('all')}>Tous</button>
                    {#each availableTournoiRanks as rankOption}
                        <button on:click={() => selectRankTournoi(rankOption)}>{rankOption}</button>
                    {/each}
                </div>
            {/if}
        </div>
        <div class="option-tournoicompo">
            {#each rankHierarchy as rank}
                {#if shouldShowComponent(rank) && (selectedRankTournoi === 'all' || selectedRankTournoi === rank)}
                    <Tournoi rank={rank}/>
                {/if}
            {/each}
        </div>
    </section>
</section>

<section class="composition">
    <div class="compo-text">
        <h2>Composition</h2>
        <p>Dans la partie composition, vous pourrez consulter l'escouade que vous avez composée. Si vous devez apporter des changements à celle-ci avant le début d'un tournoi, c'est ici que vous pouvez le faire. Alors préparez-vous à dominer le classement et que la bataille commence !</p>
    </div>
    <section class="bg-compo">
        <div class="filter-container">
            <button class="filter-label {isOpenCompo ? 'open' : ''}" on:click={toggleDropdownCompo}>{filterTextCompo}<div class={`fleche ${isOpenCompo ? 'open' : ''}`}></div></button>
            {#if isOpenCompo}
                <div class="filter-options">
                    <button on:click={() => selectRankCompo('all')}>Tous</button>
                    {#each availableCompoRanks as rankOption}
                        <button on:click={() => selectRankCompo(rankOption)}>{rankOption}</button>
                    {/each}
                </div>
            {/if}
        </div>
        <div class="option-tournoicompo">
            {#each rankHierarchy as rank}
                {#if shouldShowComponent(rank) && (selectedRankCompo === 'all' || selectedRankCompo === rank)}
                    <Voircompo rank={rank} />
                {/if}
            {/each}
        </div>
    </section>
</section>

<style>
    .tournoi-text, .compo-text{
        width: 100%;
        padding: 0 5vw;
    }

    .composition{
        padding: 3vh 0;
    }

    .tournoi-text h2,.compo-text h2, .tournoi-text p,.compo-text p{
        text-align: center;
        margin-bottom: 2vh;
    }

    .tournoi-text p{
        margin-bottom: 40px;
        margin:2vh auto;
    }

    .filter-container {
        position: relative;
        margin: 2vh 9vw;
    }

    .filter-label {
        display: flex;
        align-items: center;
        cursor: pointer;
        background-color: var(--white);
        padding: 1vh 4vw;
        border: 1px solid var(--green);
        border-bottom: none;
        border-radius: 20px;
        font-size: var(--textmobil);
        color: var(--green);
    }

    .filter-label.open {
        border-radius: 20px 20px 0 0; 
    }

    .fleche {
        margin-left: 3vw;
        height: 12px;
        width: 12px;
        border-top: 2px solid var(--green);
        border-left: 2px solid var(--green);
        transform: rotate(225deg);
        transition: transform 0.3s ease;
    }

    .fleche.open {
        transform: rotate(45deg);
    }

    .filter-options {
        display: flex;
        flex-direction: column;
        position: absolute;
        background-color: var(--white);
        border: 1px solid var(--green);
        border-top: none;
        border-radius: 0 0 20px 20px;
        padding: 0vh 2vw 1vh 2vw;
        box-shadow: 0px 15px 16px 0px rgba(0,0,0,0.2);
        z-index: 1;
    }

    .filter-options button {
        background: none;
        border: none;
        padding: 1vh 2vw;
        text-align: left;
        color: var(--green);
        cursor: pointer;
    }

    .bg-tournoi, .bg-compo{
        width: 90vw;
        height: 45vh;
        padding-top: 2vh;
        margin: auto;
        background: linear-gradient(0deg, rgba(240,240,240,1) 0%, rgba(97,197,62,1) 25%, rgba(97,197,62,1) 100%);
        border-radius: 20px;
    }

    .option-tournoicompo{
        padding-bottom: 10vh;
        display: flex;
        flex-wrap: wrap;
        justify-content: space-around;
    }
    @media (min-width: 768px) {
    .tournoi, .composition{
        width: 100%;
        padding: 5vh 3vw;
        display: flex;
    }

    .composition{
        flex-direction: row-reverse;
    }

    .tournoi-text{
        width: 52%;
        padding: 0 4vw 0 0;
    }

    .compo-text{
        width: 52%;
        padding: 0 0 0 4vw;
    }

    .tournoi-text h2,.tournoi-text p, .compo-text h2,.compo-text p {
        text-align: left;
        margin-top: 0;
    }

    .filter-container {
        margin: 2vh 4vw;
    }

    .filter-label {
        padding: 1vh 2vw;
        font-size: var(--text);
    }

    .fleche {
        margin-left: 1vw;
    }

    .filter-options button {
        font-size: var(--text);
        padding: 1vh 0;
    }

    .bg-tournoi, .bg-compo{
        width: 48%;
        height: 55vh;
        margin:0 auto 0 0;
    }

    .option-tournoicompo{
        width: 100%;
        flex-direction: column;
        padding: 1vh 3vw;
    }
    }
</style>