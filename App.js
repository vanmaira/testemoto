import React, {useState} from 'react';
import { StatusBar} from 'react-native';
import 'react-native-gesture-handler';
import { NavigationContainer} from '@react-navigation/native';
import Principal from './src/components/Principal';
import Login from './src/components/Login';
//arquivo que inicia um determinado contexto para ser Providenciado
import {UserContext} from './src/components/UserContext';


export default function App() {
  /**
   * isLogged - 
   * Constante (state) que será utilizada para realizar a troca de telas 
   * a Login e Principal.
   * Enquanto estiver falso, significa que não tem login sendo realizado. Logo ficará preso na tela Login, até logar.
   * Quando o usuário logar o state será mudado para true, revelando a tela Principal.
   */
  const [isLogged, setIsLogged] = useState(false);
  /**
   * user - 
   * Constante state que irá armazenar os dados do usuário logado na Autenticação.
   */
  const [user, setUser] = useState(null);
  /**
   * logado - 
   * Função assincrona para realizar as trocas de estados quando o usuário logar.
   * Alterando o isLogged para true e repassando o usuario logado.
   * Caso queira ver os dados do user, use console.log para ver o objeto montado
   */
  const logado = async (user) => {
    setIsLogged(true);
    setUser(user);
  }
  /**
   * deslogado - 
   * Função assincrona para realizar o desligamento do usuário, colocando o user como null 
   * e isLogged para false, fazendo a tela de Login ser mostrada novamente
   */
  const deslogado = async () =>{
    setIsLogged(false);
    setUser(null);
  }
  /**
   * o return - 
   * Dentro do retorno renderizável, teremos um Contexto sendo utilizado, ele foi importado na linha 8, 
   * o Contexto irá disponibilizar um objeto contendo o {user, logado e deslogado} para quem 
   * estiver dentro do contexto
   * -----
   * Condição de renderização, isLogged é usado para definir qual tela deve ser mostrada.
   * Por default, a tela de Login será mostrada,  quando um login for realizado, será trocada para a Principal.
   * Se o usuário fechar o App, com o usuário logado,  quando abrir novamente já irá para a Principal, devido
   * ao registro de login.
   */
  return (
    <NavigationContainer>
      <StatusBar/>
      <UserContext.Provider value={{user, logado, deslogado}}>
        {isLogged && user ? <Principal /> : <Login />}
      </UserContext.Provider>
      
    </NavigationContainer>
    
  );
}
