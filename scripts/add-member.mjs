// Crée ou met à jour un compte de l'espace membres.
//   npm run membre:ajouter -- prenom.nom@exemple.fr "Prénom Nom"
// Le mot de passe est demandé de façon masquée (ou généré s'il est laissé vide).
// Le script affiche la nouvelle valeur complète de la variable MEMBERS à coller
// dans Vercel (Settings → Environment Variables), en partant de la valeur actuelle
// de MEMBERS si elle est présente dans .env.local.
import bcrypt from "bcryptjs";
import crypto from "node:crypto";
import fs from "node:fs";
import readline from "node:readline";

const [email, ...nameParts] = process.argv.slice(2);
if (!email || !email.includes("@")) {
  console.error('Usage : npm run membre:ajouter -- prenom.nom@exemple.fr "Prénom Nom"');
  process.exit(1);
}
const name = nameParts.join(" ") || email;

function readEnvMembers() {
  if (process.env.MEMBERS) return process.env.MEMBERS;
  if (!fs.existsSync(".env.local")) return "[]";
  const line = fs.readFileSync(".env.local", "utf8").split(/\r?\n/).find((l) => l.startsWith("MEMBERS="));
  if (!line) return "[]";
  return line.slice("MEMBERS=".length).replace(/^'(.*)'$/, "$1").replaceAll("\\$", "$");
}

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

const members = JSON.parse(readEnvMembers()).filter((m) => m.email.toLowerCase() !== email.toLowerCase());
members.push({ email: email.toLowerCase(), name, hash: bcrypt.hashSync(password, 12) });

console.log(`\nCompte prêt pour ${name} <${email.toLowerCase()}>.`);
if (generated) console.log(`Mot de passe généré (à transmettre au membre) : ${password}`);
console.log("\nNouvelle valeur de la variable MEMBERS (" + members.length + " compte(s)) :\n");
console.log(JSON.stringify(members));
// Next.js interprète les « $ » dans .env.local : ils doivent y être échappés (pas dans Vercel)
console.log("\nEn local, ligne à mettre dans .env.local :\n");
console.log("MEMBERS='" + JSON.stringify(members).replaceAll("$", "\\$") + "'");
