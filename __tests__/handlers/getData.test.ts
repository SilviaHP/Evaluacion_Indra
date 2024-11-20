import { handler } from '../../src/handlers/getData';
import { fetchPlanetUseCase } from '../../src/core/useCases';

jest.mock('../../src/core/useCases'); 

describe('getData handler', () => {
  const mockFetchPlanetUseCase = fetchPlanetUseCase as jest.Mock;

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('debería devolver un planeta con estado 200', async () => {
    // Simular respuesta del caso de uso
    mockFetchPlanetUseCase.mockResolvedValue({
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

    const event = { pathParameters: { id: '1' } };
    const result = await handler(event);

    expect(mockFetchPlanetUseCase).toHaveBeenCalledWith(expect.any(Object), 1);
    expect(result.statusCode).toBe(200);
    expect(JSON.parse(result.body)).toEqual({
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


  it('debería devolver error 500 si el caso de uso falla', async () => {
    mockFetchPlanetUseCase.mockRejectedValue(new Error('Error interno'));

    const event = { pathParameters: { id: '1' } };
    const result = await handler(event);

    expect(result.statusCode).toBe(500);
    expect(JSON.parse(result.body)).toEqual({
      error: 'Error al obtener el planeta',
    });
  });
});
