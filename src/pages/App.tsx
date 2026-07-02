import {useEffect,useState} from "react";

function App() {
    const [cidade, setCidade] = useState("");
    const [cep, setCep] = useState("");
    const [endereco, setEndereco] = useState("");
    const [estado, setEstado] = useState("");
    const [inputCep, setInputCep] = useState("");

    useEffect(() => {

        fetch("https://viacep.com.br/ws/49045000/json/")
        .then(res => res.json())
        .then(data => {
            setCidade(data.localidade);
            setCep(data.cep);
            setEndereco(data.logradouro);
            setEstado(data.uf);
        });
    }, []);
    return (
        <div>
            <h2>Cidade:</h2>
            <p>{cidade}</p>

            <h3>CEP:</h3>
            <p>{cep}</p>

            <h4>Endereço:</h4>
            <p>{endereco}</p>
            
            <h5>Estado:</h5>
            <p>{estado}</p>



            <input type="text" value={cep} onChange={(e) => setCep(e.target.value)} />


        </div>
    );
}


export default App;
