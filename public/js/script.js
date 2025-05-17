


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





function clicarLogin(){
    var email = document.getElementById("login-email").value;
    var senha = document.getElementById("login-senha").value;
    var steamID = document.getElementById("steamID").value;

    if (email == "" || senha == "" || steamID == "") {
        alert("Preencha todos os campos!");
        return;
    }

    fetch("/usuarios/autenticar", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            emailServer: email,
            senhaServer: senha,
            steamIDServer: steamID
        })
    })
    .then(res => res.json())
    .then(data => {
        if (data.status == 403) {
            alert(data.mensagem);
        } else {
            document.getElementById('iframeComunidade').style.display = 'block';
        }
    })
    .catch(err => console.error(err));
}


function clicarCadastro(){
    var nome = document.getElementById("cadastro-nome").value;
    var email = document.getElementById("cadastro-email").value;
    var senha = document.getElementById("cadastro-senha").value;
    var steamID = document.getElementById("steamID").value;

    if (nome == "" || email == "" || senha == "" || steamID == "") {
        alert("Preencha todos os campos!");
        return;
    }

    fetch("/usuarios/cadastrar", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            nomeServer: nome,
            emailServer: email,
            senhaServer: senha,
            steamIDServer: steamID
        })
    })
    .then(res => res.json())
    .then(data => {
        if (data.status == 403) {
            alert(data.mensagem);
        } else {
            alert("Usuário cadastrado com sucesso!");
        }
    })
    .catch(err => console.error(err));
}

