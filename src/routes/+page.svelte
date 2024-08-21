<script>
    import'../styles/global.css';
    import { onMount } from 'svelte';
    import Footer from '$lib/footer.svelte';
    import Button from '$lib/button.svelte';
    let gsap, ScrollTrigger;
    
    onMount(() => {
      if (typeof window !== "undefined") {
        // Chargement dynamique de GSAP et du plugin ScrollTrigger après le montage du composant
        import('gsap').then(module => {
          gsap = module.gsap;
          import('gsap/ScrollTrigger').then(stModule => {
            ScrollTrigger = stModule.default;
            gsap.registerPlugin(ScrollTrigger); // Enregistrement du plugin
    
            // Vérification si l'utilisateur est sur un appareil mobile
            const isMobile = window.innerWidth <= 768;
            const start = isMobile ? "top 90%" : "top 80%";
            const start2 = isMobile ? "top 70%" : "top 60%";
            const end = isMobile ? "bottom 70%" : "bottom 60%";
            const end2 = isMobile ? "bottom 50%" : "bottom 40%";
            const x1 = isMobile ? -50 : -250;
            const x2 = isMobile ? 50 : 250;
    
            // Animation pour le logo et le texte de la section "hero"
            gsap.from(".logo, .text-hero", {
              duration: 1,
              x: x1,
              opacity: 0,
              scrollTrigger: {
                  trigger: ".hero",
                  start: start,
                  end: end,
              }
            });
    
            // Animation pour l'image de la section "hero"
            gsap.from(".divimghero", {
              duration: 1,
              x: x2,
              opacity: 0,
              delay: 0.3,
              scrollTrigger: {
                  trigger: ".divimghero",
                  start: start,
                  end: end,
              }
            });
    
            // Animation pour la première section de texte et d'image
            gsap.from(".home-section1", {
              duration: 1,
              x: x1,
              opacity: 0,
              scrollTrigger: {
                  trigger: ".home-section1",
                  start: start2,
                  end: end2,
              }
            });
    
            // Animation pour le texte explicatif du fantasy football
            gsap.from(".text-fantasy", {
              duration: 1,
              x: x2,
              opacity: 0,
              scrollTrigger: {
                  trigger: ".text-fantasy",
                  start: start2,
                  end: end2,
              }
            });
    
            // Animation pour les différentes étapes du jeu
            gsap.fromTo(".comment-fonctionne", { opacity: 0 }, {
              duration: 1,
              opacity: 1,
              scrollTrigger: {
                  trigger: ".comment-fonctionne",
                  start: start2,
                  end: end2,
              }
            });
    
            gsap.fromTo(".titre-comment-fonctionne", { opacity: 0 }, {
              duration: 1,
              opacity: 1,
              delay: 0.3,
              scrollTrigger: {
                  trigger: ".titre-comment-fonctionne",
                  start: start2,
                  end: end2,
              }
            });
    
            gsap.fromTo(".equipe", { opacity: 0 }, {
              duration: 1,
              opacity: 1,
              delay: 0.7,
              scrollTrigger: {
                  trigger: ".equipe",
                  start: start2,
                  end: end2,
              }
            });
    
            gsap.fromTo(".participer-tournoi", { opacity: 0 }, {
              duration: 1,
              opacity: 1,
              delay: 1.0,
              scrollTrigger: {
                  trigger: ".participer-tournoi",
                  start: start2,
                  end: end2,
              }
            });
    
            gsap.fromTo(".recup-recompense", { opacity: 0 }, {
              duration: 1,
              opacity: 1,
              delay: 1.3,
              scrollTrigger: {
                  trigger: ".recup-recompense",
                  start: start2,
                  end: end2,
              }
            });
    
            // Animation pour le texte de l'objectif
            gsap.from(".text-fantasy-objectif", {
              duration: 1,
              x: x1,
              opacity: 0,
              scrollTrigger: {
                  trigger: ".text-fantasy-objectif",
                  start: start2,
                  end: end2,
              }
            });
    
            // Animation pour la deuxième section de texte et d'image
            gsap.from(".home-section2", {
              duration: 1,
              x: x2,
              opacity: 0,
              scrollTrigger: {
                  trigger: ".home-section2",
                  start: start2,
                  end: end2,
              }
            });
          });
        });
      }
    });
</script>

<main>
    <a href="/"><img src="/img/kl-logo.png" alt="Logo Kick League" class="logo"></a>
    
    <div class="hero">
        <div class="text-hero">
            <h1 class="h1-hero">Kick League</h1>
            <h3 class="slogan">Maitriser votre équipe, dominez la ligue</h3>
            <p class="p-hero">Bienvenue sur Kick League, où votre passion pour le football prend vie. Formez votre équipe de champions, participez à des tournois épiques, et progressez vers la légende. Stratégie et compétition vous attendent. Prêt pour l'aventure ? Inscrivez-vous et façonnez votre destinée footballistique dès maintenant.</p>
            <div class="btn-hero">
                <Button text="S'inscrire" url="/creationdecompte" />
                <Button text="Se connecter" url="/connexion" buttonStyle="alternative" />
            </div>
        </div>
        <div class="divimghero"></div>
       
    </div>

    <section class="fantasy">
        <div class="divimgsection home-section1"></div>
        <div class="text-fantasy">
            <h2>Qu'est ce que le fantasy football ?</h2>
            <p>Le fantasy football vous invite à créer et gérer votre propre équipe virtuelle, en choisissant des joueurs réels dont les performances influencent vos résultats. La Kick League incarne cette passionnante aventure.</p> 
            <p>Endossez le rôle de manager, sélectionnez vos talents en fonction de leurs exploits sur le terrain, et guidez-les vers le triomphe. Chaque choix est crucial, fusionnant votre expertise footballistique avec des stratégies victorieuses.</p>
        </div>
    </section>

    <section class="comment-fonctionne">
        <div class="titre-comment-fonctionne">
            <h2>Comment jouer ?</h2>
        </div>
        <div class="etape-jeu">
            <div class="etape equipe">
                <img src="/img/icon-terrain.png" class="imgicon" alt=" icone terrain">
                <h3>créer votre équipe</h3>
                <p>créer une équipe de 5 joueurs contenant 1 gardien, 1 defenseurs, 1 millieu, 1 attaquant et 1 position au choix</p>
            </div>
            <div class="etape participer-tournoi">
                <img src="/img/icon-tournoi.png" class="imgicon" alt="icone tournoi">
                <h3>Participer à un tournoi </h3>
                <p>Participer au tournoi hebdomadaire pour recevoir des récompenses en fonction de vos résultats</p>
            </div>
            <div class="etape recup-recompense">
                <img src="/img/icon-reconpemseV2.png" class="imgicon" alt="icone récompense">
                <h3>Récuperer vos récompenses</h3>
                <p>Aller dans votre boutique pour récuperer vos récompenses et améliorer vos prochaines équipes</p>
            </div>
        </div>
    </section>

    <section class="objectif"> 
        <div class="text-fantasy-objectif">
            <h2>Quel est l'objectif ?</h2>
            <p>L'objectif de Kick League est simple : partir du statut de réserviste et viser le rang ultime de GOAT, tout en savourant chaque instant de jeu hebdomadaire. Notre mission est de vous immerger dans une expérience où la passion du football et la finesse de la stratégie fusionnent, vous permettant de forger l'équipe de vos rêves.</p>
            <p>Chaque match est une étape de cette quête enthousiasmante, chaque victoire vous propulse vers la légende. Embarquez dans Kick League, le terrain où votre histoire de fantasy football prend vie, dans la joie de jouer et l'art de gagner.</p>
        </div>
        <div class="divimgsection home-section2"></div>
    </section>
</main>
<Footer />
        

<style>
    main{
        overflow-x: hidden;
        width: 90%;
        margin: auto;
    }
    
    .hero{
        display: flex;
        flex-direction: column;
        align-items: center;
    }

    .text-hero{
        width: 100%;
        padding: 0 5vw;
    }

    .divimghero{
        width: 100%;
        height: 50vh;
        background-image: url(/img/imgheroV2.jpg);
        background-repeat: no-repeat;
        background-position: center;
        background-size: cover;
        border-radius: 20px;
    }

    .h1-hero{
        text-align: center;
        margin-top: 10vh;
        margin-bottom: 1vh;
        line-height: 41px;
    }

    .slogan{
        text-align: center;
        margin-top: 1vh;
        margin-bottom: 3vh;
        line-height: 18px;
        font-family: "freiburgin_line_personal_use", sans-serif;
        font-weight: 400;
        background: linear-gradient(-180deg,rgba(97, 197, 62, 1) 0%, rgba(25, 127, 60, 1) 100%);
		background-clip: text;
		-webkit-background-clip: text;
		color: transparent;
    }

    .p-hero{
        text-align: center;
        width: 100%;
        margin-top: 0%;
    }

    .btn-hero{
        margin-block: 4vh;
        display: flex;
        justify-content: center;
        gap:2%;
    }

    .fantasy{
        margin-block: 10%;
        margin-inline: auto;
        display: flex;
        flex-direction: column-reverse;
        justify-content: space-evenly;
        align-items: center;
    }

    .divimgsection{
        height: 50vh;
        width: 100%;
        border-radius: 20px;
    }

    .home-section1{
        background-image: url(/img/imgheroS2V2.png);
        background-repeat: no-repeat;
        background-position: center;
        background-size: cover;
    }

    .text-fantasy-objectif, .text-fantasy{
        width: 100%;
        text-align: center;
        padding: 0 5vw; 
        margin-bottom: 5%;
        background-color:var(--green);
        border-radius: 20px;
    }

    .text-fantasy h2, .text-fantasy p, .text-fantasy-objectif h2, .text-fantasy-objectif p{
        color: var(--white);
    }

    .comment-fonctionne{
        height: 100vh;
        width: 100%;
        margin-inline: auto;
        background-color: var(--white);
        display: flex;
        flex-direction: column;
        align-items: center;
    }

    .titre-comment-fonctionne{
        width: 100%;
        height: 5vh;
        background-color: var(--gris);
        margin:0 0 1vh 0;
        border-radius: 15px;
    }

    .comment-fonctionne h2{
        width: 100%;
        text-align: center;
        padding: 0 5vw;
        background: linear-gradient(-180deg,rgba(97, 197, 62, 1) 0%, rgba(25, 127, 60, 1) 100%);
		background-clip: text;
		-webkit-background-clip: text;
		color: transparent;
    }

    .etape h3, .etape p{
        color: var(--white);
        padding: 0 5vw;
    }

    .etape-jeu{
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 1vh;
    }

    .etape{
        width:100% ;
        height: 30vh;
        border-radius: 20px;
        background: linear-gradient(-180deg,rgba(97, 197, 62, 1) 0%, rgba(25, 127, 60, 1) 100%);
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
    }

    .etape h3{
        margin-bottom: 0;
        font-weight: 500;
    }

    .etape p{
        margin-top: 1vh;
    }

    .home-section2{
        background-image: url(/img/imgheroS1_V2.jpg);
        background-repeat: no-repeat;
        background-position: center;
        background-size: cover;
    }

    .objectif{
        height: 80vh;
        margin-block: 5%;
        margin-inline: auto;
        display: flex;
        flex-direction: column;
        justify-content: space-evenly;
        align-items: center;
    }
    @media (min-width: 768px) {
        main{
        width: 100%;
    }

        .hero{
        flex-direction: row;
        margin-top: 10vh;
        width: 100vw;
        padding: 0 3vw;
    }

    .text-hero{
        width: 60vw;
        padding: 0 3vw;
        margin-right: 1vw;
        display: flex;
        flex-direction: column;
        justify-content: center;
        height: 70vh;
        background-color: var(--grisclair);
        border-radius: 20px;
    }

    .divimghero{
        width: 40vw;
        height: 70vh;
    }

    .h1-hero{
        text-align: left;
        padding-left: 5px;
        line-height: 82px;
        margin-top: 0%;
    }

    .slogan{
        text-align: left;
        margin: 0;
        padding-left: 5px;
        line-height: 26px;
    }

    .p-hero{
        text-align: left;
        width: 75%;
        margin: 3% 0 0 0;
    }

    .btn-hero{
        justify-content: flex-start;
    }

    .fantasy{
        height: 45vh;
        width: 100vw;
        padding: 0 3vw;
        margin: 0;
        gap: 1vw;
        display: flex;
        flex-direction: row;
    }

    .divimgsection{
        width: 25%;
        height: 40vh;
    }

    .text-fantasy-objectif, .text-fantasy{
        width: 75%;
        height: 40vh;
        text-align: left;
        background: linear-gradient(345deg, rgba(245,245,245,1) 0%, rgba(97,197,62,1) 25%, rgba(97,197,62,1) 100%);
        padding: 3vh 3vw;
        margin-bottom: 0%;
        border-radius: 20px;
        text-wrap: balance;
    }

    .comment-fonctionne{
        height: 50vh;
        padding: 0 10vw;
        margin-top: 0%;
        justify-content: center;
        color: var(--white);
    }

    .titre-comment-fonctionne{
        width: 93%;
        height: 8vh;
        margin:0 0 1vh 0;
        border-radius: 20px;
        display: flex;
        align-items: center;
    }

    .comment-fonctionne h2{
        margin-top: 0%;
        margin-bottom: 0;
    }

    .etape-jeu{
        flex-direction: row;
        justify-content: center;
        gap: 1vw;
    }

    .etape{
        width:30% ;
        height: 40vh;
    }
    .etape p{
        margin-bottom: 0%;
    }

    .comment-fonctionne h2, .etape h3, .etape p{
        padding: 0 3vw;
    }

    .objectif{
        height: 45vh;
        width: 100vw;
        padding: 0 3vw;
        margin-block: 0;
        gap: 1vw;
        flex-direction: row;
    }
    }
</style>