import { APIGatewayProxyHandler } from 'aws-lambda';
import { persistenceAdapter } from "../adapters/persistenceAdapter";
import { externalServiceAdapter } from "../adapters/externalServiceAdapter";
import { fetchPlanetUseCase, fetchAllPlanetUseCase } from "../core/useCases";


export const handler: APIGatewayProxyHandler = async (event: any) => {
  try {
    const idParam = event.queryStringParameters?.id;

    //Si no especifican un ID, se buscan todos los planetas registrados localmente en DynamoDB
    if (!idParam) {
      const persistenceService = persistenceAdapter();
      const planets = await fetchAllPlanetUseCase(persistenceService);
      return {
        statusCode: 200,
        body: JSON.stringify(planets),
      };
    }

    //Si hay un ID, se busca un planeta por su id en SWAPI    
    if (isNaN(Number(idParam)) || !Number.isInteger(Number(idParam))) {
      return {
        statusCode: 400,
        body: JSON.stringify({
          message: 'El parámetro id debe ser un número entero.',
        }),
      };
    }

    const id = Number(idParam);
    const externalService = externalServiceAdapter();
    const planet = await fetchPlanetUseCase(externalService,id);
    return {
      statusCode: 200,
      body: JSON.stringify(planet),
    };
  } catch (error) {

    return {
      statusCode: 500,
      body: JSON.stringify({
        error: "No pudo recuperarse la información del planeta. ",
      }),
    };
  }
};
