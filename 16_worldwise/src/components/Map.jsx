import { useNavigate, useSearchParams } from 'react-router-dom'

import styles from './Map.module.css'

const Map = () => {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();

  const lat = searchParams.get('lat');
  const lng = searchParams.get('lng');
    return (
      /* Programative Navigation => Imperative way */
        <div className={styles.mapContainer} onClick={() => navigate('form')}>
          <h1>Map</h1>
          <p>Latitude: {lat}</p>
          <p>Longitude: {lng}</p>
          <button onClick={() => setSearchParams({lat:15, lng:45})}>Change Position</button>
        </div>
    )
}

export default Map
