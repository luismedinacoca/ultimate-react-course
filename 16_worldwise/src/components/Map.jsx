import { useSearchParams } from 'react-router-dom'

import styles from './Map.module.css'

const Map = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const lat = searchParams.get('lat');
  const lng = searchParams.get('lng');
    return (
        <div className={styles.mapContainer}>
          <h1>Map</h1>
          <p>Latitude: {lat}</p>
          <p>Longitude: {lng}</p>
          <button onClick={() => setSearchParams({lat:15, lng:45})}>Change Position</button>
        </div>
    )
}

export default Map
