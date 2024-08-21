<script>
    import '../../styles/global.css';
    import { onMount, onDestroy } from 'svelte';
    import Header from '$lib/header.svelte';
    import MenuBurger from '$lib/MenuBurger.svelte';
    import Pack from '$lib/pack.svelte';
    
    let isMobile = false; // Gère l'état mobile ou non de la page

    // Vérifie la taille de l'écran et met à jour l'état isMobile en conséquence
    function checkScreenSize() {
        if (typeof window !== 'undefined') {
            isMobile = window.innerWidth <= 768;
        }
    }

    // Initialise les gestionnaires d'événements au montage du composant
    onMount(() => {
        if (typeof window !== 'undefined') {
            checkScreenSize();
            window.addEventListener('resize', checkScreenSize);
        }
    });

    // Nettoie les gestionnaires d'événements au démontage du composant
    onDestroy(() => {
        if (typeof window !== 'undefined') {
            window.removeEventListener('resize', checkScreenSize);
        }
    });
</script>
  
<main class="bg-pack">
    {#if isMobile}
    <MenuBurger/>
    {:else}
    <Header />
    {/if}
    <section class="pack-text">
        <h2>Pack</h2>
        <p>Bienvenue sur la page Pack, où vos récompenses vous attendent ! Après chaque match week, venez ici pour déballer les packs gagnés et découvrir vos nouveaux joueurs. Préparez-vous à enrichir votre club et à renforcer votre équipe pour les prochains tournois.</p>
    </section>
    <section class="section-pack">
        <div class="pack">
            <Pack />
        </div>
    </section>
</main>
    
<style>
    main{
        padding-top: 0;
    }

    .pack-text{
        width: 100%;
        padding: 0 5vw;
    }

    .pack-text h2,.pack-text p {
        text-align: center;
        margin:2vh auto;
    } 

    .pack{
        display: flex;
        flex-direction: column;
        align-items: center;
    }

    @media (min-width: 768px) {
    main{
        padding-top: 2vh;
    }

    .pack-text{
        width: 40%;
        padding: 0 3vw;
    }

    .pack-text h2,.pack-text p {
        text-align: left;
    }

    .pack-text h2{
            margin: 5vh 0 2vh 0 ;
        }

    .pack{
        margin: 20px auto 0 3%;
        align-items: flex-start;
    }

    }
</style>