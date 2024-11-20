import { fetchPlanetUseCase } from '../../src/core/useCases';
import { IExternalServicePort } from '../../src/core/planet';

describe('fetchPlanetUseCase', () => {
  let mockExternalService: jest.Mocked<IExternalServicePort>;

  beforeEach(() => {
    mockExternalService = {
      fetchPlanetById: jest.fn(),
    };
  });

  it('debería devolver un planeta traducido al español', async () => {
    // Simular una respuesta del adaptador
    mockExternalService.fetchPlanetById.mockResolvedValue({
      nombre: 'Tatooine',
      periodoRotacion: '23',
      periodoOrbital: '304',
      diametro: '10465',
      clima: 'arid',
      gravedad: '1 standard',
      terreno: 'desert',
      superficieAgua: '1',
      poblacion: '200000',
    });

    const result = await fetchPlanetUseCase(mockExternalService, 1);

    expect(mockExternalService.fetchPlanetById).toHaveBeenCalledWith(1);
    expect(result).toEqual({
      nombre: 'Tatooine',
      periodoRotacion: '23',
      periodoOrbital: '304',
      diametro: '10465',
      clima: 'arid',
      gravedad: '1 standard',
      terreno: 'desert',
      superficieAgua: '1',
      poblacion: '200000',
    });
  });

  it('debería lanzar un error si el adaptador externo falla', async () => {
    // Simular un error del adaptador
    mockExternalService.fetchPlanetById.mockRejectedValue(new Error('API Error'));

    await expect(fetchPlanetUseCase(mockExternalService, 1)).rejects.toThrow('API Error');

    expect(mockExternalService.fetchPlanetById).toHaveBeenCalledWith(1);
  });
});
