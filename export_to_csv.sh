#!/bin/bash
# postgres://neondb_owner:kaJPG3U9dhis@ep-blue-rice-a5kx7yns-pooler.us-east-2.aws.neon.tech/neondb?sslmode=require

# Configuración de la base de datos en Neon
NEON_HOST="<neon-host>"
NEON_PORT="<neon-port>"
NEON_USER="<neon-user>"
NEON_PASSWORD="<neon-password>"
NEON_DBNAME="<neon-dbname>"

TABLE_NAME="expenses"
CSV_FILE="/c/archivo/output.csv"  # Usa una ruta absoluta en formato Bash

# Nombre de la tabla y archivo CSV
TABLE_NAME="expenses"
CSV_FILE="/c/archivo/output.csv"  # Ruta absoluta en formato Bash

# Crear un archivo temporal con el comando \COPY
TMP_FILE=$(mktemp)
echo "\COPY (SELECT * FROM $TABLE_NAME) TO '$CSV_FILE' WITH CSV HEADER;" > "$TMP_FILE"

# Paso 1: Exportar datos desde Neon a un archivo CSV
echo "Exporting data from Neon to CSV..."
psql "postgres://neondb_owner:kaJPG3U9dhis@ep-blue-rice-a5kx7yns-pooler.us-east-2.aws.neon.tech/neondb?sslmode=require" -f "$TMP_FILE"

# Verificar si la exportación fue exitosa
if [ $? -eq 0 ]; then
  echo "Data exported successfully to $CSV_FILE."
else
  echo "Error exporting data."
  exit 1
fi

# Eliminar el archivo temporal
rm "$TMP_FILE"
