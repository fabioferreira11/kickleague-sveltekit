<script>
    import '../../styles/global.css';
    import { onMount, onDestroy } from 'svelte';
    import Header from '$lib/header.svelte';
    import Rank from '$lib/Rank.svelte';
    import MenuBurger from '$lib/MenuBurger.svelte';
    
    let couleurbarre = 'var(--white)'; // Variable pour définir la couleur de la barre du MenuBurger
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
  
  <main>
    {#if isMobile}
        <MenuBurger couleur={couleurbarre}/>
    {:else}
        <Header />
    {/if}
    <Rank />
  </main>
  
  <style>
    main {
        background-color: var(--black);
        color: var(--white);
        height: 100vh; 
        padding-top: 0;
    }
  
    @media (min-width: 768px) {
      main{
          padding-top: 2vh;
      }
    }
    
  </style>
  