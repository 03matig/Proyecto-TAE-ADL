# Info.md

Este archivo se sube para asegurar la inclusión de esta carpeta en el repositorio y documentar la ejecución de las pruebas automatizadas con Newman.

## 🧪 Ejecución de pruebas con variables de entorno

El archivo **`ProyectoFinal-TAE-ADL.postman_collection_ENVIRONMENT-VARIABLES.json`** contiene la colección con pruebas que utilizan variables de entorno.

    ```bash
    newman run ProyectoFinal-TAE-ADL.postman_collection_ENVIRONMENT-VARIABLES.json \
    -e ProyectoFinal-TAE-ADL.FIRST_postman_environment.json
    -r htmlextra
    ```

Generando un reporte visual en HTML (requiere tener instalado newman-reporter-htmlextra)
Para ello, ejecutar el siguiente comando:

    ```bash
    npm install -g newman-reporter-htmlextra
    ```

## 🔁 Ejecución de pruebas con iteration data (Data-Driven Testing)

El archivo **`ProyectoFinal-TAE-ADL.postman_collection_ITERATION-DATA`** contiene la colección con pruebas que utilizan múltiples instancias de prueba para Data Driven Testing.
El archivo **`IterationData.csv`** se utiliza para simular múltiples entradas (DATA DRIVEN TESTING), como registros de usuarios.

    ```bash
    newman run ProyectoFinal-TAE-ADL.postman_collection_ITERATION-DATA.json \
        -e ProyectoFinal-TAE-ADL.postman_environment.json \
        --iteration-data IterationData.csv \
        -r htmlextra
    ```

Generando un reporte visual en HTML (requiere tener instalado newman-reporter-htmlextra)
Para ello, ejecutar el siguiente comando:

    ```bash
    npm install -g newman-reporter-htmlextra
    ```