import { doc, setDoc } from 'firebase/firestore';
import { gameCollection } from '@/utils/firebase.browser';

export async function populateGameOfTheDay() {
  const today = new Date().toISOString().split('T')[0]; // formato YYYY-MM-DD
  await setDoc(doc(gameCollection, today), {
    distancia: 60,        // metros
    velocidade: 36,       // km/h
    tempo: 6,             // segundos (calculado)
  });
  console.log('Jogo do dia criado com sucesso!');
}
