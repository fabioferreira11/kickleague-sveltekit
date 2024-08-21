// bcryptTest.js
import bcrypt from 'bcrypt';

async function testBcrypt() {
    const password = 'fabio03'; // Le mot de passe en clair
    const hashedPassword = '$2b$10$6RMh9izL.WLc2uRF.T5H..r8yTqp4xSPMfegkezGdjt/Bk8xn4Om.'; // Le hash stocké dans votre base de données

    const match = await bcrypt.compare(password, hashedPassword);
    console.log('Match:', match); // Devrait afficher true si les mots de passe correspondent
}

testBcrypt();