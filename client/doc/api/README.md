# API Documentation

L'application est basée sur une API Rest. </br>
Nous avons mit en place un Swagger OpenAPI pour détailler les requêtes de notre application

# 1.Installez  
`npm install -g redoc-cli`
# 2. Afficher le Swagger
## Soit
### Générer la page HTML
`redoc-cli bundle openapi.yaml`
## Ou
### Lancer le serveur hébergeant le Swagger
`redoc-cli serve openapi.yaml`
