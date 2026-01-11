import { useEffect, useState } from 'react';
import './CharacterSearch.css';
import type { Character } from '../../interfaces/Character';

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
    const fetchCharacters = async () => {
      setLoading(true);
      setError(null);

      let characterResults = [];

      if (filters.location) {
          const locRes = await fetch(`https://rickandmortyapi.com/api/location?name=${filters.location.toString()}`);
          if (!locRes.ok) throw new Error('Localización no encontrada');
          const locData = await locRes.json();

          const residentUrls: string[] = [...new Set(locData.results.flatMap((loc: { residents: string[]; }) => loc.residents))] as string[];

          if (residentUrls.length === 0) {
            onResultsFound([]);
            return;
          }
          
          // Obtenemos los IDs de las URLs (ej: ".../character/1" -> "1")
          const ids = residentUrls.map((url: string) => url.split('/').pop()).join(',');
          const charRes = await fetch(`https://rickandmortyapi.com/api/character/${ids}`);
          const charData = await charRes.json();

           characterResults = Array.isArray(charData) ? charData : [charData];
          
          // Filtramos localmente por nombre y especie si también están presentes
          characterResults = characterResults.filter(char => {
            const matchName = filters.name ? char.name.toLowerCase().includes(filters.name.toLowerCase()) : true;
            const matchSpecies = filters.species ? char.species.toLowerCase().includes(filters.species.toLowerCase()) : true;
            return matchName && matchSpecies;
          });

          onResultsFound(characterResults);
      }else{
        const params = new URLSearchParams();
        if (filters.name) params.append('name', filters.name);
        if (filters.species) params.append('species', filters.species);
        if (filters.location) params.append('location', filters.location);
    
        try {
          const response = await fetch(`https://rickandmortyapi.com/api/character?${params.toString()}`);
          if (!response.ok) {
            throw new Error('Error fetching data');
          } 
          const data = await response.json();
          onResultsFound(data.results); 
  
        } catch (err: any) {
            setError(err.message);
            onResultsFound([]);
          } finally {
            setLoading(false);
          }  
      }
    };

    const timeoutId = setTimeout(fetchCharacters, 400);
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