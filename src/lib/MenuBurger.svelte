<script>
    // imports, exports et variable
    import { page } from "$app/stores";
    export let couleur = 'var(--black)'; 
    let ouverte = false;

    $: routeId = $page.route.id;

    // function qui permet d'ouvrir ou fermerle menu
    function toggleMenu() {
        ouverte = !ouverte;
    }
    // function qui permet de nous ramener vers la page club quand on click sur le logo
    function handleLogoClick() {
        routeId = '/club';  
    }
</script>


<div class="header">
    <a href="/club" on:click={handleLogoClick} class="logo">
        <img src="/img/kl-logo.png" alt="Logo Kick League">
    </a>
    <button class="burger" on:click={toggleMenu}>
        <div class="burger-icon" style="background-color: {couleur}"></div>
        <div class="burger-icon" style="background-color: {couleur}"></div>
        <div class="burger-icon" style="background-color: {couleur}"></div>
    </button>
</div>

<div class={ouverte ? 'menu open' : 'menu'}>
    <button class="close-btn" on:click={toggleMenu}>x</button>
    <nav>
        <ul>
            <li><a href="/club" class:active={routeId === '/club'}>Club</a></li>
            <li><a href="/tournoi" class:active={routeId === '/tournoi'}>Tournoi</a></li>
            <li><a href="/rank" class:active={routeId === '/rank'}>Rank</a></li>
            <li><a href="/pack" class:active={routeId === '/pack'}>Pack</a></li>
            <li><a href="/contact" class:active={routeId === '/contact'}>Contact</a></li>
        </ul>
    </nav>
    <a href="/" class="deconnexion">Déconnexion</a>
</div>


<style>
    button, a{
        font-family: "Quicksand", sans-serif;	
		font-weight: 400;
    } 

    .header {
        display: flex;
        justify-content: flex-end;
        align-items: center;
        width: 100%;
        height: 8vh;
    }

    .logo img {
        width: 9vw; 
    }

    nav ul li{
        margin-bottom: 2vh;
    }

    nav ul li a, .deconnexion {
        font-family: "freiburgin_line_personal_use", sans-serif;
        font-size: 60px !important;
        margin-bottom: 1vh;
    }

    .burger {
        background: none;
        border: none;
        color: white;
        font-size: 24px;
        cursor: pointer;
        display: none;
    }

    .close-btn {
        position: absolute;
        top: 20px;
        right: 20px;
        font-size: 60px;
        background: none;
        border: none;
        color: var(--white);
        cursor: pointer;
    }

    .menu.open{
        overflow-y: hidden;
    }

    @media (max-width: 768px) {
        .burger {
            display: block;
            margin-right: 3%;
        }

        .menu {
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background-color: var(--green);
            transform: translateX(100%);
            transition: transform 0.3s ease;
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
        }

        .menu.open {
            transform: translateX(0);
            z-index: 100;
        }

        .close-btn {
            display: block; 
        }

        .burger-icon {
            display: block;
            width: 30px;
            height: 3px;
            margin: 6px 0;
            transition: 0.4s;
            border-radius: 10px;
        }

        nav ul {
            list-style: none;
            text-align: center;
            padding: 0;
        }

        nav a {
            text-decoration: none;
            color: var(--white);
            padding: 10px;
            font-size: 48px;  
        }

        .deconnexion {
            text-decoration: none;
            color: var(--white);
            border-color: var(--white);
            font-size: 48px;  
        }
    }
</style>
