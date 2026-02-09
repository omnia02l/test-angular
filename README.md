# Gestion des demandes

Application de gestion des demandes : création, liste et mise à jour du statut. Backend Laravel (API REST) + Frontend Angular.

---

## Étapes pour lancer le projet

### Prérequis

- **PHP 8.1+** (XAMPP recommandé)
- **Composer**
- **Node.js 18+** et npm
- **MongoDB** (localhost par défaut, port 27017)
- **Angular CLI 17** : `npm install -g @angular/cli@17`

### 1. Backend Laravel

```bash
cd crud-excel-pdf_laravel
composer install
copy .env.example .env
php artisan key:generate
```

Configurer MongoDB dans `.env` :
```env
DB_CONNECTION=mongodb
MONGODB_HOST=127.0.0.1
MONGODB_PORT=27017
MONGODB_DATABASE=crud-excel-pdf
```

Lancer le serveur :
```bash
php artisan serve
```

L’API est disponible sur `http://127.0.0.1:8000/api`.

Sous Windows avec XAMPP : `demarrer-serveur.bat`

### 2. Frontend Angular

```bash
cd crud-excel-pdf_angular
npm install
ng serve
```

L’application est disponible sur `http://localhost:4200`.

### 3. Vérification

- MongoDB doit être en cours d’exécution.
- Le frontend doit être configuré pour appeler `http://127.0.0.1:8000/api` (défini dans `src/app/core/env.ts`).

---

## Choix techniques

### Backend (Laravel)

| Choix | Justification |
|-------|---------------|
| **Laravel 10** | Framework PHP adapté aux API REST. |
| **MongoDB** (jenssegers/mongodb) | Stockage NoSQL, collections `demandes` sans migrations SQL. |
| **Form Requests** | Validation côté serveur (`StoreDemandeRequest`, `UpdateDemandeStatusRequest`). |
| **API REST JSON** | Réponses JSON, sans authentification pour simplifier. |

### Frontend (Angular)

| Choix | Justification |
|-------|---------------|
| **Angular 17** | SPA avec routing, composants standalone. |
| **Reactive Forms** | Validation sur le formulaire de création. |
| **HttpClient** | Appels HTTP vers l’API Laravel. |
| **Composants standalone** | Pas de NgModule, structure légère. |

### Entité Demande

- **titre** : obligatoire, max 255 caractères
- **description** : optionnelle, max 5000 caractères
- **statut** : `new` ou `approved` (défaut : `new`)

---

## Limites du travail réalisé

1. **Pas d’authentification** : L’API est ouverte.
2. **Pas de pagination** : Toutes les demandes sont chargées d’un coup.
3. **Pas de recherche, tri ou filtre** : Liste brute uniquement.
4. **MongoDB abandonné** : Le package `jenssegers/mongodb` est déprécié ; migration vers `mongodb/laravel-mongodb` recommandée.
5. **Pas de tests** : Pas de tests unitaires ou fonctionnels.


---

## Améliorations possibles

- **Authentification** : Laravel Sanctum pour sécuriser l’API.
- **Pagination** : Pagination côté Laravel + UI côté Angular.
- **Recherche / filtres** : Recherche sur titre/description, filtre par statut.

- **Gestion d’erreurs** : Intercepteur HTTP global, messages plus explicites.
- **Validation des erreurs API** : Affichage des erreurs de validation Laravel par champ.

