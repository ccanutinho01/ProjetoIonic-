import {
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
  IonItem,
  IonLabel,
  IonInput,
  IonButton,
  IonSpinner,
  IonText,
} from '@ionic/react';
import ExploreContainer from '../components/ExploreContainer';
import { useState } from 'react';

const Home: React.FC = () => {
  const [cepInput, setCepInput] = useState('');
  const [cidade, setCidade] = useState('');
  const [estado, setEstado] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleConsultarCEP = async () => {
    setLoading(true);
    {loading && <p>Carregando...</p>}
    setLoading(false);
    {error && <p>Erro: {error}</p>}

    setError(null);
    setCidade('');
    setEstado('');

  try {
  const resposta = 
  await fetch(`https://viacep.com.br/ws/${cepInput}/json/`);}

  catch(erro) {
    console.error('Erro', erro);
  }
}

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Busca CEP</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">BUSCA CEP</IonTitle>
          </IonToolbar>
        </IonHeader>

        <IonItem>
          <IonLabel position="stacked">CEP</IonLabel>
          <IonInput
            value={cepInput}
            disabled={loading}
            onIonInput={(e) => setCepInput(e.detail.value ?? '')}
          />
        </IonItem>

        <div style={{ padding: '11px' }}>
          <IonButton
            expand="block"
            onClick={handleConsultarCEP}
            disabled={loading || !cepInput}
          >
            {loading ? <IonSpinner name="dots" /> : 'Consultar'}
          </IonButton>
        </div>

        {error && (
          <IonText color="danger">
            <p style={{ padding: '0 16px' }}>Erro: {error}</p>
          </IonText>
        )}

        {cidade && estado && (
          <div style={{ padding: '0 16px' }}>
            <h2>Resultado:</h2>
            <p><strong>Cidade:</strong> {cidade}</p>
            <p><strong>Estado:</strong> {estado}</p>
          </div>
        )}

        <ExploreContainer />
      </IonContent>
    </IonPage>
  );
};

export default Home;