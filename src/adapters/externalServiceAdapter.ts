import axios from 'axios';
import { IPlanet, IExternalServicePort } from '../core/planet';

export const externalServiceAdapter = (): IExternalServicePort => ({
  
  fetchPlanetById: async (id: number): Promise<IPlanet> => {
    try {
      const response = await axios.get(`https://swapi.py4e.com/api/planets/${id}`);
      const data = response.data;

      return {
        nombre: data.name,
        periodoRotacion: data.rotation_period,
        periodoOrbital: data.orbital_period,
        diametro: data.diameter,
        clima: data.climate,
        gravedad: data.gravity,
        terreno: data.terrain,
        superficieAgua: data.surface_water,
        poblacion: data.population,
      };
    } catch (error) {
     
      throw new Error('No se pudo obtener el planeta');
    }
  },
});
