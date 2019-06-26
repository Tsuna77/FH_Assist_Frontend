#!/bin/bash

# les options :
#  --watch = Refresh dès que le code est modifié
#  --publicHost = Hostname autorisé à appelé le serveur (par défaut localhost)
#  --proxy-config = Redirection à appliqué pour atteindre l'API distante pour éviter le cross domain

ng serve \
  --port 80 \
  --publicHost=local.tsuna.fr \
  --watch \
  --proxy-config proxy-dev.conf.json
