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
  const [curso, setCurso] = useState<{ titulo: string; cargaHoraria: number; preco: number } | null>(null);
  console.log('curso', curso);


  const requestProdutos = async (method: 'GET' | 'POST' = 'GET', body?: unknown) => {
    const response = await fetch('http://127.0.0.1:3000/produtos', {
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

  const [cursos, setCursos] = useState<Array<{ titulo: string; cargaHoraria: number; preco: number }>>([]);
const [loadingCursos, setLoadingCursos] = useState(false);
const [errorCursos, setErrorCursos] = useState<string | null>(null);

const [tituloCurso, setTituloCurso] = useState('');
const [cargaHorariaCurso, setCargaHorariaCurso] = useState('');
const [precoCurso, setPrecoCurso] = useState('');
const [cadastrandoCurso, setCadastrandoCurso] = useState(false);

const requestCursos = async (method: 'GET' | 'POST' = 'GET', body?: unknown) => {
  const response = await fetch('http://127.0.0.1:3001/cursos', {
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

const handleBuscarCursos = async () => {
  setLoadingCursos(true);
  setErrorCursos(null);

  try {
    const resposta = await requestCursos('GET');
    const data = await resposta.json();
    setCursos(data);
  } catch (erro) {
    setErrorCursos(String(erro));
  } finally {
    setLoadingCursos(false);
  }
};

const handleCadastrarCurso = async (event: React.FormEvent) => {
  event.preventDefault();
  setCadastrandoCurso(true);
  setErrorCursos(null);

  try {
    await requestCursos('POST', {
      titulo: tituloCurso,
      cargaHoraria: Number(cargaHorariaCurso),
      preco: Number(precoCurso),
    });

    setTituloCurso('');
    setCargaHorariaCurso('');
    setPrecoCurso('');
    await handleBuscarCursos();
  } catch (erro) {
    setErrorCursos(String(erro));
  } finally {
    setCadastrandoCurso(false);
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
        <div style={{ padding: '16px' }}>
          <h2>Cursos da API</h2>

          <form onSubmit={handleCadastrarCurso}>
            <IonItem>
              <IonLabel position="stacked">Título</IonLabel>
              <IonInput
                value={tituloCurso}
                onIonInput={(e) => setTituloCurso(e.detail.value ?? '')}
                required
              />
            </IonItem>

            <IonItem>
              <IonLabel position="stacked">Carga Horária</IonLabel>
              <IonInput
                type="number"
                value={cargaHorariaCurso}
                onIonInput={(e) => setCargaHorariaCurso(e.detail.value ?? '')}
                required
              />
            </IonItem>

            <IonItem>
              <IonLabel position="stacked">Preço</IonLabel>
              <IonInput
                type="number"
                value={precoCurso}
                onIonInput={(e) => setPrecoCurso(e.detail.value ?? '')}
                required
              />
            </IonItem>

            <div style={{ marginTop: '12px' }}>
              <IonButton type="submit" expand="block" disabled={cadastrandoCurso}>
                {cadastrandoCurso ? <IonSpinner name="dots" /> : 'Cadastrar curso'}
              </IonButton>
            </div>
          </form>

          <div style={{ marginTop: '16px' }}>
            <IonButton expand="block" onClick={handleBuscarCursos} disabled={loadingCursos}>
              {loadingCursos ? <IonSpinner name="dots" /> : 'Buscar cursos'}
            </IonButton>
          </div>

          {errorCursos && (
            <IonText color="danger">
              <p>Erro: {errorCursos}</p>
            </IonText>
          )}

          {cursos.length > 0 && (
            <IonList>
              {cursos.map((curso, index) => (
                <IonItem key={`${curso.titulo}-${index}`}>
                  <IonLabel>
                    <h3>{curso.titulo}</h3>
                    <p>Carga Horária: {curso.cargaHoraria} horas</p>
                  </IonLabel>
                  <IonNote slot="end">R$ {curso.preco.toFixed(2)}</IonNote>
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