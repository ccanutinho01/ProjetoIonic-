import {useEffect,useState} from "react";
import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import './ConsultaCep.css';

async function consultaCEP(){

    const resposta=
    await fetch(
        "https://viacep.com.br/ws/49045010/json/"
    );
    const dados =
    await resposta.json();

    console.log(dados);


export default App;
