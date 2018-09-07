# Jot Down
### A Note taking app
[https://jot-test.herokuapp.com/](https://jot-test.herokuapp.com/)

---
## Build Locally
create ```config.js``` in root project directory
```javascript
exports.database = {
  connectionString: POSTGRES URL,
  ssl: TRUE IF USING HEROKU POSTGRES
}

exports.jwt_key = SECRET
```
Then run
```bash
npm install
npm run dev:front
```

## In Production
Add these environment variables
```bash
DATABASE_URL=POSTGRES URL
JWT_SECRET=SECRET
```
Then run
```bash
npm install
npm run webpack:prod
npm prune --production
npm run prod
```

## Heroku
Attach Heroku Postgres to app

Add this config variable
```bash
JWT_SECRET = SECRET
```
Then build with Node Buildpack
