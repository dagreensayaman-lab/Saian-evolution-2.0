# Relais Grind ↔ Google Agenda

Un petit script Google qui tourne sur ton compte. L'appli lui demande les tâches de l'agenda « Grind » et lui dit quand tu en valides une. Plus de jeton qui expire, plus de reconnexion toutes les heures.

## Installation (une seule fois, ~5 minutes)
1. Va sur https://script.google.com, connecté avec ton compte Google, puis « Nouveau projet ».
2. Colle le contenu de `Code.gs` à la place du code existant.
3. Roue crantée « Paramètres du projet » → coche « Afficher le fichier manifeste appsscript.json », retourne dans l'éditeur, ouvre `appsscript.json` et remplace son contenu par celui du fichier du même nom ici.
4. Paramètres du projet → « Propriétés du script » → ajoute une propriété `KEY` avec une clé secrète de ton choix (longue, au hasard).
5. « Déployer » → « Nouveau déploiement » → type « Application Web » → Exécuter en tant que « Moi », Accès « Tout le monde » → Déployer. Autorise les accès demandés (agenda).
6. Copie l'URL de l'application Web (elle finit par `/exec`).
7. Dans l'appli Grind : carte Agenda → « Relais permanent » → colle l'URL et la clé → Enregistrer.

Si tu modifies le script plus tard : « Déployer » → « Gérer les déploiements » → modifier la version, pour garder la même URL.
