/*
 * @description Script para obtenção de dados a partir da API da Rádio Afonso Santos
 *
 * Painel de Administração da Rádio Afonso Santos
 * https://github.com/radio-afonso-santos/painel
 *
 * Uma rádio criada com ajuda do software Open Source AzuraCast
 * https://azuracast.com
 * https://github.com/AzuraCast/AzuraCast
 *
 * @author Afonso Santos
 * http://afonsosantos-dev.tk
 * https://github.com/afonsosantos
 *
 * Criado em 08/2019
 *
 * @license Apache-2.0
 */

$(document).ready(function() {
  /*
   *  Variáveis Globais
   */

  const sub = new NchanSubscriber('https://painel.radio-afonsosantos.tk/api/live/nowplaying/radioafonsosantos');
  let resposta;

  /*
   *  Elementos da DOM
   */

  // A Tocar
  const musica = document.getElementById('musica');
  const artista = document.getElementById('artista');

  //   Ouvintes
  const numero_ouvintes = document.getElementById('numero_ouvintes');
  const palavra_ouvintes = document.getElementById('palavra_ouvintes');

  // Obtém os dados a partir da API (através do nChan)
  sub.on('message', function(message) {
    // Transforma a resposta da API num formato JSON padrão
    resposta = JSON.parse(message);

    /*
     *  Atualiza sempre estes dados abaixo
     */

    // A Tocar
    $(musica).text(resposta.now_playing.song.title);
    $(artista).text(resposta.now_playing.song.artist);

    // Ouvintes
    let ouvintes = resposta.listeners.unique;
    $(numero_ouvintes).text(ouvintes);

    /*
     *  Verifica o número de ouvintes e atualiza
     *  o texto de acordo
     */
    if (ouvintes > 1) {
      // Caso sejam mais que 1 ouvinte
      $(numero_ouvintes).show();
      $(palavra_ouvintes).text('ouvintes');
    } else if (ouvintes == 1) {
      // Caso seja apenas 1 ouvinte
      $(numero_ouvintes).show();
      $(palavra_ouvintes).html('ouvinte');
    } else if (ouvintes == 0) {
      // Caso não haja ouvintes
      $(numero_ouvintes).hide();
      $(palavra_ouvintes).text('Nenhum Ouvinte');
    }
  });

  // Inicia o nchan para obter dados da API
  sub.start();
});
