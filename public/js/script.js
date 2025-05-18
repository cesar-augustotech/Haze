

/*
async function carregarPerfilSteam(steamID) {
  const chaveAPI = 'BF89902DCE3643777283E1E85FAF7370';
  const url = `https://api.steampowered.com/ISteamUser/GetPlayerSummaries/v0002/?key=${chaveAPI}&steamids=${steamID}`;

  const resposta = await fetch(url);
  const dados = await resposta.json();

  const jogador = dados.response.players[0];
  document.getElementById("avatarSteam").src = jogador.avatarfull;
  document.getElementById("nomeSteam").innerText = jogador.personaname;
  document.getElementById("linkPerfil").href = jogador.profileurl;
}
*/




