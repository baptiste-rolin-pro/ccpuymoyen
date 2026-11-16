// Ajoute ou met à jour un compte de l'espace membres dans data/members.json.
//   npm run membre:ajouter -- prenom.nom@exemple.fr "Prénom Nom"
// Le mot de passe est demandé (saisie masquée) ou généré s'il est laissé vide.
// Ensuite : git add data/members.json && git commit && git push → Vercel redéploie.
// Retirer un membre : supprimer son bloc dans data/members.json, puis commiter.
import bcrypt from "bcryptjs";
import crypto from "node:crypto";
import fs from "node:fs";
import readline from "node:readline";

const FILE = "data/members.json";
const [email, ...nameParts] = process.argv.slice(2);
if (!email || !email.includes("@")) {
  console.error('Usage : npm run membre:ajouter -- prenom.nom@exemple.fr "Prénom Nom"');
  process.exit(1);
}
const name = nameParts.join(" ") || email;

function askHidden(question) {
  return new Promise((resolve) => {
    const rl = readline.createInterface({ input: process.stdin, output: process.stdout, terminal: true });
    rl._writeToOutput = (s) => { if (s.includes(question)) rl.output.write(s); };
    rl.question(question, (answer) => { rl.close(); process.stdout.write("\n"); resolve(answer); });
  });
}

let password = await askHidden("Mot de passe (laisser vide pour en générer un) : ");
let generated = false;
if (!password) {
  password = crypto.randomBytes(9).toString("base64url");
  generated = true;
}
if (password.length < 10) {
  console.error("Mot de passe trop court (10 caractères minimum).");
  process.exit(1);
}

const members = fs.existsSync(FILE) ? JSON.parse(fs.readFileSync(FILE, "utf8")) : [];
const list = members.filter((m) => m.email.toLowerCase() !== email.toLowerCase());
list.push({ email: email.toLowerCase(), name, hash: bcrypt.hashSync(password, 12) });
list.sort((a, b) => a.name.localeCompare(b.name, "fr"));
fs.writeFileSync(FILE, JSON.stringify(list, null, 2) + "\n");

console.log(`\nCompte enregistré pour ${name} <${email.toLowerCase()}> (${list.length} membre(s) dans ${FILE}).`);
if (generated) console.log(`Mot de passe généré (à transmettre au membre) : ${password}`);
console.log("\nPour l'activer en ligne : git add data/members.json && git commit -m \"Ajout membre\" && git push");
