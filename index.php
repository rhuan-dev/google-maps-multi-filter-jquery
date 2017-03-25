<!DOCTYPE html>
<html lang="pt-BR">
<head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>Google Maps</title>

    <!-- Latest compiled and minified CSS -->
    <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css">

    <link rel="stylesheet" type="text/css" href="style.css">
</head>
<body>

<!-- mapa iframe -->
<div id="mapa"></div>
<!-- fim mapa iframe -->

<!-- filters -->
<div class="container">
    <div class="row">
        <div class="col-xs-2">
            <select class="form-control" onchange="filterMarkers(this.value);">
                <option value="br">Brasil</option>
                <option value="eua">Estados Unidos</option>
            </select>
        </div>

        <div class="col-xs-2">
            <select class="form-control">
                <option value="">Estado</option>
                <option value="goias">Goiás</option>
            </select>
        </div>

        <div class="col-xs-2">
            <select class="form-control">
                <option value="">Cidade</option>
                <option value="goiania">Goiânia</option>
            </select>
        </div>

        <div class="col-xs-2">
            <select class="form-control">
                <option value="">Setor</option>
                <option value="cidade_jardim">Cidade Jardim</option>
                <option value="parque_oeste">Parque Oeste</option>
            </select>
        </div>

        <div class="col-xs-2">
            <select class="form-control">
                <option value="">Tipo</option>
                <option value="estados_unidos">Loja</option>
                <option value="ponto_de_venda">Ponto de Venda</option>
            </select>
        </div>

        <div class="col-xs-2">
            <button type="submit" class=" btn btn-default btn-success" style="width: 100%;">
                Pesquisar
            </button>
        </div>
    </div>
</div>
<!-- end filters -->

<script src="https://ajax.googleapis.com/ajax/libs/jquery/1.11.1/jquery.min.js"></script>

<!-- Latest compiled and minified JavaScript -->
<script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/js/bootstrap.min.js"></script>

<!-- script mapa api google -->
<script async src="http://maps.googleapis.com/maps/api/js?key=AIzaSyCS2P2STjwd6KEIvL0MjFijB_76OJVkToA"></script>

<!-- mapa -->
<script src="js/mapa.js" async></script>


</body>
</html>