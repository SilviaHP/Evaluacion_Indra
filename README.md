# Serverless - AWS Node.js Typescript

Este proyecto ha sido generado utilizando la plantilla `aws-nodejs-typescript` del [framework Serverless](https://www.serverless.com/).

Para obtener instrucciones detalladas, consulte la [documentación] (https://www.serverless.com/framework/docs/providers/aws/).

## Instrucciones de instalación/despliegue

Dependiendo de tu gestor de paquetes preferido, sigue las instrucciones a continuación para desplegar tu proyecto.


### Usando NPM

- Ejecute `npm i` para instalar las dependencias del proyecto
- Ejecute `npx sls deploy` para desplegar esta pila en AWS

### Usando Yarn

- Ejecute `yarn` para instalar las dependencias del proyecto
- Ejecute `yarn sls deploy` para desplegar esta pila en AWS


## Para ejecutar pruebas

- Ejecute `npm test` para ejecutar las pruebas unitarias (solo para el caso de uso de obtener información de un planeta en específico en integración con SWAPI)


## Acerca de la aplicación

- La aplicación es un servicio que permite obtener información de un planeta en específico. Segun lo especificado existen 2 metodos para visualizar y registrar información de un planeta.

- Para verificar la Integración con SWAPI y obtener información de un planeta en específico se debe hacer una petición GET a la URL de la aplicación con un parámetro de consulta llamado `id` que debe recibir un número en el siguiente formato:
```
GET https://<url>/dev/data?id=<numero>
```

- Para verificar todos los planetas registrados en la base de datos de la aplicación se debe hacer una petición GET a la URL de la aplicación con el siguiente formato:
```
GET https://<url>/dev/data
```
- Para registrar un planeta en la base de datos de la aplicación se debe hacer una petición POST a la URL de la aplicación con el siguiente formato:
```
POST https://<url>/dev/data
```
El cuerpo de la petición debe incluir los siguientes atributos en formato JSON:
```json
{
    "nombre": "string",
    "periodoRotacion": "number",
    "periodoOrbital": "number",
    "diametro": "number",
    "clima": "string",
    "gravedad": "string",
    "terreno": "string",
    "superficieAgua": "number",
    "poblacion": "number"
}
```

### Estructura del proyecto

La base del código del proyecto esta principalmente ubicado en la carpeta `src` . Esta carpeta se divide en los siguientes directorios:

```
.
├── src/
│   ├── adapters/
│   │   ├── externalServiceAdapter.ts
│   │   ├── persistenceAdapter.ts
│   ├── core/
│   │   ├── planet.ts *
│   │   ├── useCases.ts
│   ├── handlers/
│   │   ├── getData.ts
│   │   ├── postData.ts
│   ├── schemas/
│   │   ├── planetSchema.ts *
│   ├── utils/
│   │   ├── response.ts *
├── serverless.ts
├── tsconfig.json
├── package.json
├── README.md

```

El código de pruebas se encuentra ubicado en la carpeta `__tests__` . Esta carpeta se divide en los siguientes directorios:
```
.
├── __tests__/
│   ├── core/
│   │   ├── fetchPlanetUseCase.test.ts
│   ├── handlers/
│   │   ├── getData.test.ts
```
