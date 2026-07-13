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
  IonList,
  IonNote,
} from '@ionic/react';
import ExploreContainer from '../components/ExploreContainer';
import { useState } from 'react';

const Home: React.FC = () => {
  const [cepInput, setCepInput] = useState('');
  const [cidade, setCidade] = useState('');
  const [estado, setEstado] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [produtos, setProdutos] = useState<Array<{ nome: string; quantidade: number; valorUnitario: number }>>([]);
  const [loadingProdutos, setLoadingProdutos] = useState(false);
  const [errorProdutos, setErrorProdutos] = useState<string | null>(null);
  const [nomeProduto, setNomeProduto] = useState('');
  const [quantidadeProduto, setQuantidadeProduto] = useState('');
  const [valorProduto, setValorProduto] = useState('');
  const [cadastrando, setCadastrando] = useState(false);

  const requestProdutos = async (method: 'GET' | 'POST' = 'GET', body?: unknown) => {
    const response = await fetch('/api/produtos', {
      method,
      headers: body ? { 'Content-Type': 'application/json' } : undefined,
      body: body ? JSON.stringify(body) : undefined,
    });

    if (!response.ok) {
      const texto = await response.text();
      throw new Error(texto || `Erro na requisição: ${response.status}`);
    }

    return response;
  };

  const handleConsultarCEP = async () => {
    if (!cepInput) {
      setError('Digite um CEP válido');
      return;
    }

    setLoading(true);
    setError(null);
    setCidade('');
    setEstado('');

    try {
      const sanitized = cepInput.replace(/\D/g, '');
      const resposta = await fetch(`https://viacep.com.br/ws/${sanitized}/json/`);

      if (!resposta.ok) {
        throw new Error(`Erro na requisição: ${resposta.status}`);
      }

      const data = await resposta.json();

      if (data.erro) {
        setError('CEP não encontrado');
      } else {
        setCidade(data.localidade || '');
        setEstado(data.uf || '');
      }
    } catch (erro) {
      console.error('Erro', erro);
      setError(String(erro));
    } finally {
      setLoading(false);
    }
  };

  const handleBuscarProdutos = async () => {
    setLoadingProdutos(true);
    setErrorProdutos(null);

    try {
      const resposta = await requestProdutos('GET');
      const data = await resposta.json();
      setProdutos(data);
    } catch (erro) {
      console.error('Erro ao buscar produtos', erro);
      setErrorProdutos(String(erro));
    } finally {
      setLoadingProdutos(false);
    }
  };

  const handleCadastrarProduto = async (event: React.FormEvent) => {
    event.preventDefault();
    setCadastrando(true);
    setErrorProdutos(null);

    try {
      const resposta = await requestProdutos('POST', {
        nome: nomeProduto,
        quantidade: Number(quantidadeProduto),
        valorUnitario: Number(valorProduto),
      });

      setNomeProduto('');
      setQuantidadeProduto('');
      setValorProduto('');
      await handleBuscarProdutos();
    } catch (erro) {
      console.error('Erro ao cadastrar produto', erro);
      setErrorProdutos(String(erro));
    } finally {
      setCadastrando(false);
    }
  };

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

        <div style={{ padding: '16px' }}>
          <h2>Produtos da API</h2>

          <form onSubmit={handleCadastrarProduto}>
            <IonItem>
              <IonLabel position="stacked">Nome</IonLabel>
              <IonInput
                value={nomeProduto}
                onIonInput={(e) => setNomeProduto(e.detail.value ?? '')}
                required
              />
            </IonItem>

            <IonItem>
              <IonLabel position="stacked">Quantidade</IonLabel>
              <IonInput
                type="number"
                value={quantidadeProduto}
                onIonInput={(e) => setQuantidadeProduto(e.detail.value ?? '')}
                required
              />
            </IonItem>

            <IonItem>
              <IonLabel position="stacked">Valor unitário</IonLabel>
              <IonInput
                type="number"
                value={valorProduto}
                onIonInput={(e) => setValorProduto(e.detail.value ?? '')}
                required
              />
            </IonItem>

            <div style={{ marginTop: '12px' }}>
              <IonButton type="submit" expand="block" disabled={cadastrando}>
                {cadastrando ? <IonSpinner name="dots" /> : 'Cadastrar produto'}
              </IonButton>
            </div>
          </form>

          <div style={{ marginTop: '16px' }}>
            <IonButton expand="block" onClick={handleBuscarProdutos} disabled={loadingProdutos}>
              {loadingProdutos ? <IonSpinner name="dots" /> : 'Buscar produtos'}
            </IonButton>
          </div>

          {errorProdutos && (
            <IonText color="danger">
              <p>Erro: {errorProdutos}</p>
            </IonText>
          )}

          {produtos.length > 0 && (
            <IonList>
              {produtos.map((produto, index) => (
                <IonItem key={`${produto.nome}-${index}`}>
                  <IonLabel>
                    <h3>{produto.nome}</h3>
                    <p>Quantidade: {produto.quantidade}</p>
                  </IonLabel>
                  <IonNote slot="end">R$ {produto.valorUnitario.toFixed(2)}</IonNote>
                </IonItem>
              ))}
            </IonList>
          )}
        </div>

        <ExploreContainer />
      </IonContent>
    </IonPage>
  );
};

export default Home;