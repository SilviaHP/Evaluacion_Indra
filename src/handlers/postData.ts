import { APIGatewayProxyHandler } from 'aws-lambda';
import { IPersistencePort , IPlanet } from "../core/planet";
import { persistenceAdapter } from "../adapters/persistenceAdapter";
import { planetSchema } from '../schemas/planetSchema';


export const handler: APIGatewayProxyHandler = async (event: any) => {
  try {
    const body = JSON.parse(event.body);

    //validacion de datos
    const { error } = planetSchema.validate(body);
    if (error) {
      return {
        statusCode: 400,
        body: JSON.stringify({ message: `Los datos enviados no pasaron la validación : ${error.details.map(x => x.message).join(', ')}` }),
      };
    }

    const persistence: IPersistencePort = persistenceAdapter();
    await persistence.savePlanet(body as IPlanet);
    return {
      statusCode: 201,
      body: JSON.stringify({ message: "Planeta registrado con exito" }),
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: "Error al registrar el planeta" }),
    };
  }
};
