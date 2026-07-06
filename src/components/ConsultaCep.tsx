import { useEffect, useState } from 'react';

export default function ConsultaCep() {
  const [dados, setDados] = useState<any>(null);

  useEffect(() => {
    async function carregarDados() {
      const resposta = await fetch('https://viacep.com.br/ws/49045010/json/');
      const dadosApi = await resposta.json();
      setDados(dadosApi);
    }

    carregarDados();
  }, []);

  return <div>{dados?.localidade}</div>;
}
