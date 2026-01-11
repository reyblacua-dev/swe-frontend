import type { Character } from "../interfaces/Character";



const BASE_URL = "https://rickandmortyapi.com/api";

export const characterApi = {

    /**
     * Obtiene una lista de personajes con filtros opcionales. 
     */
  async getCharacters(filters = {}) {
    const params = new URLSearchParams(filters);
    
    const response = await fetch(`${BASE_URL}/character/?${params}`);
    
    if (!response.ok) {
      if (response.status === 404) return { results: [] };
      throw new Error("Error at fetching characters");
    }
    
    return response.json();
  },

  /**
   * Busca un personaje específico por su ID.
   */
  async getCharacterByIds(id: string) {
    const response = await fetch(`${BASE_URL}/character/${id}`);
    if (!response.ok) throw new Error("Personaje no encontrado");
    return response.json();
  },

    /**
     * Obtiene personajes basados en el nombre de una localización.
    */
  async getCharactersByLocation(locationName:string) {
    // 1. Buscar la localización
    const locRes = await fetch(`${BASE_URL}/location/?name=${locationName}`);
    if (!locRes.ok) return [];

    const locData = await locRes.json();
    
    // 2. Extraer IDs de todos los residentes de las localizaciones encontradas
    // Usamos Set para que los IDs sean únicos
    const residentUrls = locData.results.flatMap((loc: { residents: Character; }) => loc.residents);
    const ids = residentUrls.map((url: string) => url.split('/').pop()).join(',');

    if (!ids) return [];

    // 3. Obtener los personajes de esos IDs
    const charRes = await fetch(`${BASE_URL}/character/${ids}`);
    if (!charRes.ok) return [];

    const charData = await charRes.json();
    
    // Si la API devuelve un solo objeto, lo convertimos en array para mantener consistencia
    return Array.isArray(charData) ? charData : [charData];
  }
};
