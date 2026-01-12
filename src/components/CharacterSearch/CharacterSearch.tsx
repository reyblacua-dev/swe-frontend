import { useEffect, useState } from 'react';
import './CharacterSearch.css';
import type { Character } from '../../interfaces/Character';
import { characterApi } from '../../api/characterApi';

const  CharaterSearch = ({ onResultsFound }: { onResultsFound: (results: Character[]) => void }) => {

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const [filters, setFilters] = useState({
        name: '',
        species: '',
        location: ''
    });

    const handleInputChange = (e: { target: { name: any; value: any; }; }) => {
        const { name, value } = e.target;
        setFilters(prev => ({ ...prev, [name]: value }));
    };

    useEffect(() => {
    const fetchAll = async () => {
      setLoading(true);
      setError(null);

      try {
        let results = [];
        
        if (filters.location) {
          // Usamos el método complejo del servicio
          results = await characterApi.getCharactersByLocation(filters.location);
          
          // Filtrado local adicional para nombre/especie
          if (filters.name || filters.species) {
            results = results.filter(char => {
              const matchName = filters.name ? char.name.toLowerCase().includes(filters.name.toLowerCase()) : true;
              const matchSpecies = filters.species ? char.species.toLowerCase().includes(filters.species.toLowerCase()) : true;
              return matchName && matchSpecies;
            });
          }
        } else {
          // Búsqueda estándar
          const data = await characterApi.getCharacters(filters);
          results = data.results || [];
        }

        onResultsFound(results);
      } catch (err) {
        console.log("Error fetching characters:", err);
        onResultsFound([]);
      } finally {
        setLoading(false);
      }
    };

    // Debounce de 500ms para no saturar la API mientras el usuario escribe
    const timeoutId = setTimeout(fetchAll, 500);
    return () => clearTimeout(timeoutId);

  }, [filters]);



    return (<>
        <div className='search-inputs'>
        <input
          type="text"
          name="name"
          placeholder="Buscar por nombre (ej. Rick)"
          value={filters.name}
          onChange={handleInputChange}
        />
        <input
          type="text"
          name="species"
          placeholder="Especie (ej. Human, Alien)"
          value={filters.species}
          onChange={handleInputChange}
        />
        <input
          type="text"
          name="location"
          placeholder="Location (ej. Earth, unknown)"
          value={filters.location}
          onChange={handleInputChange}
        />
      </div>

      {loading && <p>Cargando...</p>}
      {error && <p className='error-message'>{error}</p>}
    </>)   
}

export default CharaterSearch;