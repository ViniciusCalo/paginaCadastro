function cadastro() {
    //VALIDANDO CPF E CNPJ
    var inputcpf = document.getElementById('cpf');
    var padrao = /(^[0-9]{2}[\.][0-9]{3}[\.][0-9]{3}[\/][0-9]{4}[-][0-9]{2})|(^[0-9]{3}[\.][0-9]{3}[\.][0-9]{3}[-][0-9]{2})/;

    if(!padrao.test(inputcpf.value)){
        alert("Digite um CPF ou CNPJ válido!!!");
        return false;
    }

    gerarJson();
}
//VALIDANDO TELEFONE
$(function () {
    $('.mask-numeros').mask('(99)99999-9999'); //caracteres numéricos
    //VALIDANDO CEP
    $('.mask-cep').mask('99999-999'); //cep
});


//VALIDANDO E PREENCHENDO CEP
function limpa_formulário_cep() {
    //Limpa valores do formulário de cep.
    document.getElementById('log').value = ("");
    document.getElementById('bairro').value = ("");
    document.getElementById('cdd').value = ("");
    document.getElementById('est').value = ("");
}

function meu_callback(conteudo) {
    if (!("erro" in conteudo)) {
        //Atualiza os campos com os valores.
        document.getElementById('log').value = (conteudo.logradouro);
        document.getElementById('bairro').value = (conteudo.bairro);
        document.getElementById('cdd').value = (conteudo.localidade);
        document.getElementById('est').value = (conteudo.uf);
    } //end if.
    else {
        //CEP não Encontrado.
        limpa_formulário_cep();
        alert("CEP não encontrado.");
    }
}

function pesquisacep(valor) {

    //Nova variável "cep" somente com dígitos.
    var cep = valor.replace(/\D/g, '');

    //Verifica se campo cep possui valor informado.
    if (cep != "") {

        //Expressão regular para validar o CEP.
        var validacep = /^[0-9]{8}$/;

        //Valida o formato do CEP.
        if (validacep.test(cep)) {

            //Preenche os campos com "..." enquanto consulta webservice.
            document.getElementById('log').value = "...";
            document.getElementById('bairro').value = "...";
            document.getElementById('cdd').value = "...";
            document.getElementById('est').value = "...";

            //Cria um elemento javascript.
            var script = document.createElement('script');

            //Sincroniza com o callback.
            script.src = 'https://viacep.com.br/ws/' + cep + '/json/?callback=meu_callback';

            //Insere script no documento e carrega o conteúdo.
            document.body.appendChild(script);

        } //end if.
        else {
            //cep é inválido.
            limpa_formulário_cep();
            alert("Formato de CEP inválido.");
        }
    } //end if.
    else {
        //cep sem valor, limpa formulário.
        limpa_formulário_cep();
    }
};

//CRIANDO O JSON DO FORMULARIO
function gerarJson() {
    var obj_json = {
        nome: "",
        cpf_cnpj: "",
        telefone: "",
        cep: "",
        logradouro: "",
        complemento: "",
        numero: "",
        bairro: "",
        cidade: "",
        estado: "",
    }
    var inputnome = document.getElementById("nome");
    obj_json.nome = inputnome.value;

    var input_cpf = document.getElementById("cpf");
    obj_json.cpf_cnpj = input_cpf.value;

    var telefone = document.getElementById("tel");
    obj_json.telefone = telefone.value;

    var cep = document.getElementById("cep");
    obj_json.cep = cep.value;
    
    var logradouro = document.getElementById("log");
    obj_json.logradouro = logradouro.value;

    var comp = document.getElementById("compl");
    obj_json.complemento = comp.value;

    var num = document.getElementById("numero");
    obj_json.numero = num.value;

    var bairro = document.getElementById("bairro");
    obj_json.bairro = bairro.value;

    var city = document.getElementById("cdd");
    obj_json.cidade = city.value;

    var estado = document.getElementById("est");
    obj_json.estado = estado.value;

    var json = JSON.stringify(obj_json);
    console.log(json)
    document.write("<h1>Dados em Json</h1>");
    document.write(json);

    return json;
}
