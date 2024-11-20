import {
  DynamoDBClient,
  ScanCommand,
  PutItemCommand,
} from "@aws-sdk/client-dynamodb";
import { unmarshall } from "@aws-sdk/util-dynamodb";
import { v4 as uuidv4 } from "uuid";
import { IPlanet, IPersistencePort } from "../core/planet";

const client = new DynamoDBClient({ region: "us-east-1" });

export const persistenceAdapter = (): IPersistencePort => ({
  savePlanet: async (planet: IPlanet): Promise<void> => {

    const params = {
      TableName: process.env.PLANET_TABLE,
      Item: {
        id: { S: uuidv4() },
        nombre: { S: planet.nombre },
        periodoRotacion: { N: planet.periodoRotacion.toString() },
        periodoOrbital: { N: planet.periodoOrbital.toString() },
        diametro: { N: planet.diametro.toString() },
        clima: { S: planet.clima },
        gravedad: { S: planet.gravedad },
        terreno: { S: planet.terreno },
        superficieAgua: {
          N: planet.superficieAgua ? planet.superficieAgua.toString() : "0",
        },
        poblacion: { N: planet.poblacion ? planet.poblacion.toString() : "0" },
      },
    };

    try {
      const command = new PutItemCommand(params);
      await client.send(command);
    } catch (error) {
      throw new Error("No se pudo registrar el planeta");
    }
  },

  getAllPlanets: async (): Promise<IPlanet[]> => {
    const params = {
      TableName: process.env.PLANET_TABLE,
    };
    try {
      const command = new ScanCommand(params);
      const response = await client.send(command);

      //pasar de formato DynamoDB a json y para finalmente obtener un array de planetas
      const result = response.Items?.map((item) => unmarshall(item)) || [];
      const planets: IPlanet[] = result.map((item: any) => ({
        nombre: item.nombre,
        periodoRotacion: item.periodoRotacion,
        periodoOrbital: item.periodoOrbital,
        diametro: item.diametro,
        clima: item.clima,
        gravedad: item.gravedad,
        terreno: item.terreno,
        superficieAgua: item.superficieAgua,
        poblacion: item.poblacion,
      }));
      return planets;
    } catch (error) {
      throw new Error("No se pudo obtener los planetas");
    }
  },
});
