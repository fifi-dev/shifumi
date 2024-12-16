// Sélection des éléments du DOM
const buttons = document.querySelectorAll('button');
const resultDisplay = document.getElementById('result');
const scoreDisplay = document.getElementById('score');
const playerImage = document.getElementById('player-image');
const computerImage = document.getElementById('computer-image');
const computerDiv = document.getElementById('computer-choice');
const playerDiv = document.getElementById('player-choice');

// Initialisation des scores
let playerScore = 0;
let computerScore = 0;

// Dictionnaire des images correspondantes aux choix
const images = {
    'Pierre': '/assets/img/rock.png',    // Remplacez par les chemins réels de vos images
    'Feuille': '/assets/img/paper.png',
    'Ciseaux': '/assets/img/scissors.png'
};

// Fonction pour générer un choix aléatoire pour l'ordinateur
function getComputerChoice() {
    const choices = ['Pierre', 'Feuille', 'Ciseaux'];
    const randomIndex = Math.floor(Math.random() * choices.length);
    return choices[randomIndex];
}

// Fonction pour jouer un round et déterminer le gagnant
function playRound(playerChoice) {
    const computerChoice = getComputerChoice();
    let result = "";

    // Affiche les images des choix du joueur et de l'ordinateur
    playerImage.src = images[playerChoice];
    computerImage.src = images[computerChoice];

    // Remise à zéro des tailles des images
    playerImage.style.width = '150px';
    computerImage.style.width = '150px';
    computerDiv.style.borderBottom = 'none';
    playerDiv.style.borderBottom = 'none';

    // Détermination du gagnant
    if (playerChoice === computerChoice) {
        result = "Égalité ! Vous avez tous les deux choisi " + playerChoice;
    } else if (
        (playerChoice === 'Pierre' && computerChoice === 'Ciseaux') ||
        (playerChoice === 'Feuille' && computerChoice === 'Pierre') ||
        (playerChoice === 'Ciseaux' && computerChoice === 'Feuille')
    ) {
        result = "Vous gagnez ! " + playerChoice + " bat " + computerChoice;
        playerScore++;
        playerDiv.style.borderBottom = '5px solid green';
        //playerImage.style.width = '180px'; // Agrandit l'image du joueur s'il gagne
    } else {
        result = "Vous perdez... " + computerChoice + " bat " + playerChoice;
        computerScore++;
        //computerImage.style.width = '180px'; // Agrandit l'image de l'ordinateur s'il gagne
        computerDiv.style.borderBottom = '5px solid green';
    }

    // Mise à jour des résultats et du score
    resultDisplay.textContent = result;
    scoreDisplay.textContent = `Score : Joueur ${playerScore} - Ordinateur ${computerScore}`;
}

// Ajouter des écouteurs d'événements sur chaque bouton
buttons.forEach(button => {
    button.addEventListener('click', () => {
        if (button.id !== 'reset') {
            playRound(button.textContent);
        }
    });
});

// Réinitialisation du jeu
const resetButton = document.getElementById('reset');
resetButton.addEventListener('click', () => {
    playerScore = 0;
    computerScore = 0;
    resultDisplay.textContent = '';
    scoreDisplay.textContent = 'Score : Joueur 0 - Ordinateur 0';
    playerImage.src = '';
    computerImage.src = '';
});
