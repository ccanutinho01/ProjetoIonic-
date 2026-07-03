import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import './Home.css';
import ConsultaCep from './ConsultaCep';

const Home: React.FC = () => {
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Consulta CEP</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">Consulta CEP</IonTitle>
          </IonToolbar>
        </IonHeader>
        <ConsultaCep />
      </IonContent>
    </IonPage>
  );
};

export default Home;
