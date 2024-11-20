import { IExternalServicePort, IPersistencePort, IPlanet } from './planet'

// para registrar con base de datos local
export const savePlanetUseCase = async (
  persistence: IPersistencePort,
  planet: IPlanet
) => {
  await persistence.savePlanet(planet);
};


// para consultar la base de datos local
export const fetchAllPlanetUseCase = async (
  persistence: IPersistencePort
) => {
  return await persistence.getAllPlanets();
};


// para consultar en SWAPI
export const fetchPlanetUseCase = async (
  externalService: IExternalServicePort,
  id: number
) => {
  return await externalService.fetchPlanetById(id);
};

