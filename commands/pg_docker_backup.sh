#!/bin/bash

# Uso:
#   ./pg_docker_backup.sh export <contenedor> <usuario> <basedatos> <archivo_backup>
#   ./pg_docker_backup.sh import <contenedor> <usuario> <archivo_backup>

if [ "$#" -lt 4 ]; then
  echo "Uso:"
  echo "  $0 export <contenedor> <usuario> <basedatos> <archivo_backup>"
  echo "  $0 import <contenedor> <usuario> <archivo_backup>"
  exit 1
fi

COMMAND=$1
CONTAINER=$2
USER=$3

if [ "$COMMAND" == "export" ]; then
  DB_NAME=$4
  BACKUP_FILE=$5

  echo "Exportando base de datos '$DB_NAME' desde el contenedor '$CONTAINER'..."
  docker exec -t "$CONTAINER" pg_dump -U "$USER" -d "$DB_NAME" -F c -f /tmp/backup.dump
  docker cp "$CONTAINER":/tmp/backup.dump "$BACKUP_FILE"
  echo "Exportación completa: $BACKUP_FILE"

elif [ "$COMMAND" == "import" ]; then
  BACKUP_FILE=$4

  echo "Importando base de datos desde '$BACKUP_FILE' al contenedor '$CONTAINER'..."
  docker cp "$BACKUP_FILE" "$CONTAINER":/tmp/backup.dump
  docker exec -t "$CONTAINER" pg_restore -U "$USER" --clean --create -d postgres /tmp/backup.dump
  echo "Importación completa."

else
  echo "Comando no reconocido: $COMMAND"
  echo "Usa 'export' o 'import'"
  exit 1
fi
