import {useEffect,} from "react";
function App() {
    useEffect(() => {

        fetch("https://viacep.com.br/ws/49045000/json/")
        .then(res => res.json())
        .then(data => {
            console.log(data);
        });
    }, []);
    return (
        <div>
            <h1>Consulta CEP</h1>  
        </div>
    );

}


export default App;