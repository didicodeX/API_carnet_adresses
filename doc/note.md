les controllers permettene tde faire le pont entre les routes et les models

# Le flux de données

## le flux commence dans l'index
une requette vas arriver dans l'index, puis express vas devoir trouver une route, il vas donc passer par le dossier routes

```js
app.use('/api', apiRoutes);
// consulter toute les routes qui commencent par /api
// et vas donc passer par le dossier routes
```

## le dossier routes
ou on vas creer la route qui vas reconnaitre la route post contact, a parti de cette route on vas passer par un controller

## le controller
qui lui mm vas creer le contact en appellant le model

