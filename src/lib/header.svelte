<script>
    import { page } from "$app/stores";  // Importation du store de la page pour accéder aux informations de la route

    // Réactif : routeId est mis à jour lorsque l'ID de la route change
    $: routeId = $page.route.id;

    // Fonction déclenchée lors du clic sur le logo
    function handleLogoClick() {
        routeId = '/club';  // Redirige vers la route '/club'
    }

    // Fonction pour gérer la déconnexion de l'utilisateur
    async function handleLogout() {
        const response = await fetch('/logout', { method: 'POST' });  
        if (response.ok) {
            console.log('Logout successful, redirecting...');
            // Redirection vers la page d'accueil après déconnexion réussie
            window.location.href = '/';
        } else {
            console.error('Failed to logout');  // Gestion d'erreur si la déconnexion échoue
        }
    }

    export let style = "";  // Propriété exportée permettant de personnaliser le style du header
</script>

<header style={style}>
    <div class="logoh">
        <a href="/club" on:click={handleLogoClick}><img src="/img/kl-logo.png" alt="Logo Kick League"></a>
    </div>
    <nav>
        <ul>
          <li><a href="/club" class:active={routeId === '/club'}>Club</a></li>
          <li><a href="/tournoi" class:active={routeId === '/tournoi'}>Tournoi</a></li>
          <li><a href="/rank" class:active={routeId === '/rank'}>Rank</a></li>
          <li><a href="/pack" class:active={routeId === '/pack'}>Pack</a></li>
          <li><a href="/contact" class:active={routeId === '/contact'}>Contact</a></li>
        </ul>
    </nav>
    <a href="/" class="deconnexion" on:click|preventDefault={handleLogout}>Déconnexion</a>
</header>

<style>
    header {
        height: 10vh;
        width: 94vw;
        margin: auto;
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: 2vh 3vw;
        font-weight: 600;
        background: linear-gradient(-180deg,rgba(97, 197, 62, 1) 0%, rgba(25, 127, 60, 1) 100%);
        border-radius: 20px;
    }

    .logoh img {
        width: 3vw; 
    }

    nav ul {
        list-style: none;
        margin: 0;
        padding: 0;
        display: flex;
    }

    nav li {
        margin: 0 10px;
        cursor: pointer;
    }

    nav a {
        text-decoration: none;
        color: var(--white);
        font-weight: 300;
    }

    nav a:hover {
        border-bottom: 2px solid var(--white);
    }

    nav a.active {
        color: var(--black);
        border-bottom: 2px solid var(--black);
    }

    .deconnexion {
        text-decoration: none;
        padding: 5px 10px;
        color: red;
        border: 1px solid red;
        background-color: var(--white);
        border-radius: 20px;
    }

    .deconnexion:hover{
        color: var(--white);
        background-color: red;
    }
</style>