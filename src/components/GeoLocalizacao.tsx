import { IonButton, IonText } from '@ionic/react';
import { useState } from 'react';

const GeoLocalizacao: React.FC = () => {
  const [latitude, setLatitude] = useState<string | null>(null);
  const [longitude, setLongitude] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const obterLocalizacao = () => {
    if (!navigator.geolocation) {
      setError('Geolocalização não suportada pelo navegador');
      return;
    }

    setLoading(true);
    setError(null);

    navigator.geolocation.getCurrentPosition(
      (position) => {
        setLatitude(position.coords.latitude.toFixed(6));
        setLongitude(position.coords.longitude.toFixed(6));
        setLoading(false);
      },
      (err) => {
        setError(err.message);
        setLoading(false);
      },
      {
        enableHighAccuracy: true,
        timeout: 10000,
        maximumAge: 0,
      }
    );
  };

  return (
    <div>
      <IonButton expand="block" onClick={obterLocalizacao} disabled={loading}>
        {loading ? 'Obtendo localização...' : 'Obter geolocalização'}
      </IonButton>

      {error && (
        <IonText color="danger">
          <p style={{ marginTop: '12px' }}>Erro: {error}</p>
        </IonText>
      )}

      {latitude && longitude && (
        <div style={{ marginTop: '12px' }}>
          <p><strong>Latitude:</strong> {latitude}</p>
          <p><strong>Longitude:</strong> {longitude}</p>
        </div>
      )}
    </div>
  );
};

export default GeoLocalizacao;

