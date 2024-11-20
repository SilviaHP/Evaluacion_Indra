export interface IPlanet {
    id?: string;
    nombre: string;
    periodoRotacion: string;
    periodoOrbital: string;
    diametro: string;
    clima: string;
    gravedad: string;
    terreno: string;
    superficieAgua?: string;
    poblacion?: string;
  }
  
  export interface IPersistencePort {
    savePlanet(planet: IPlanet): Promise<void>;
    
    getAllPlanets(): Promise<IPlanet[]>;
  }
  
  export interface IExternalServicePort {
    fetchPlanetById(id: number): Promise<IPlanet>;
  }
  