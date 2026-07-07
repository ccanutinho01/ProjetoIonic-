import { useEffect, useState } from "react";

async function consultaCEP() {
    const resposta = await fetch("https://viacep.com.br/ws/49045010/json/");
    const dados = await resposta.json();
    console.log(dados);
    return dados;
}

const ConsultaCep = () => {
    const [dados, setDados] = useState(null);

    useEffect(() => {
        consultaCEP().then(setDados);
    }, []);

    return <div>{dados ? JSON.stringify(dados) : "Carregando..."}</div>;
};

export default ConsultaCep;
