import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Entered from '../Entered/Entered';
import ButtonLogin from '../ButtonLogin/ButtonLogin';
import { useAppContext } from '../../context/AppContext';

function TokenChecker({onLoginClick}) {
  const { setRegist } = useAppContext(); // Используйте хук контекста
  const [isTokenValid, setIsTokenValid] = useState(false);
  const [loading, setLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState('');
  const [name, setName] = useState('name');
  const [firstElement, setFirstElement] = useState('N');
  
  const api = axios.create({
    withCredentials: true,
    baseURL: "http://localhost:3000/",
  });

  useEffect(() => {
    const checkToken = async () => {
      try {
        const accessTokens = localStorage.getItem("access");
        const cheackToken = await api.post('/validToken', { accessToken: accessTokens });
        const res = cheackToken.data;
        
        if (res.ok) {
          if(res.user) {
            const userName = res.user.name;
            const frirsElement = userName.split("")[0];
            setName(userName);
            setFirstElement(frirsElement);
            setIsTokenValid(true);
            setRegist(true);
            setErrorMessage('');
          }
        } else {
          const response = await api.get('/refresh');
          if (response.data && response.data.accessToken) {
            setIsTokenValid(true);
            setRegist(true);
            setErrorMessage('');
          } else {
            setIsTokenValid(false);
            setRegist(false);
            setErrorMessage('Не удается найти пользователя.');
          }
        }

      } catch (error) {
        setIsTokenValid(false);
        setErrorMessage('Ошибка валидации токена.');
      } finally {
        setLoading(false);
      }
    };

    checkToken();
  }, [setRegist]);

  if (loading) {
    return <div>Загрузка...</div>;
  }

  return (
    <>
      {isTokenValid ? (
        <Entered name={name} firstElement={firstElement} />
      ) : (
        <>
          <ButtonLogin  onLoginClick={onLoginClick}/>
        </>
      )}
    </>
  );
}

export default TokenChecker;