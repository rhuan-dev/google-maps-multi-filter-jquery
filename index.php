<!DOCTYPE html>
<html lang="pt-BR">
<head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>Google Maps</title>

    <!-- bootstrap css -->
    <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css">

    <!--style page-->
    <link rel="stylesheet" type="text/css" href="style.css">
</head>
<body>

<!-- mapa iframe -->
<div id="mapgoogle"></div>
<!-- fim mapa iframe -->

<!-- filters -->
<div class="container">
    <form action="" id="buscar-locais">
        <div class="row">
            <div class="col-xs-2">
                <select class="form-control" id="pais">
                    <option value="">Pais</option>
                    <option value="brasil">Brasil</option>
                    <option value="estados-unidos">Estados Unidos</option>
                    <option value="espanha">Espanha</option>
                </select>
            </div>

            <div class="col-xs-2">
                <select class="form-control" id="estado">
                    <option value="">Estado</option>
                    <option value="goias">Goiás</option>
                    <option value="rio-de-janeiro">Rio de Janeiro</option>
                    <option value="california">Califórnia</option>
                    <option value="madrid">Madrid</option>
                </select>
            </div>

            <div class="col-xs-2">
                <select class="form-control" id="cidade">
                    <option value="">Cidade</option>
                    <option value="goiania">Goiânia</option>
                    <option value="sao-francisco">São Francisco</option>
                    <option value="fuelanbrada">Fuelanbrada</option>
                </select>
            </div>

            <div class="col-xs-2">
                <select class="form-control" id="setor">
                    <option value="">Setor</option>
                    <option value="alto-da-serra">Alto da Serra</option>
                    <option value="castro">Castro</option>
                    <option value="calle-montecarlo">Calle Montecarlo</option>
                </select>
            </div>

            <div class="col-xs-2">
                <select class="form-control" id="tipo">
                    <option value="">Tipo</option>
                    <option value="loja">Loja</option>
                    <option value="ponto">Ponto de Venda</option>
                </select>
            </div>

            <div class="col-xs-2">
                <button type="submit" class=" btn btn-default btn-success" style="width: 100%;">
                    Pesquisar
                </button>
            </div>
        </div>
    </form>
</div>
<!-- end filters -->

<!--jquery-->
<script defer src="https://ajax.googleapis.com/ajax/libs/jquery/1.11.1/jquery.min.js"></script>

<!-- script mapa api google -->
<script defer src="https://maps.google.com/maps/api/js?sensor=false"></script>

<!--cluster-->
<script defer src="https://cdn.rawgit.com/googlemaps/v3-utility-library/master/markerclustererplus/src/markerclusterer.js"></script>

<!-- mapa -->
<script defer src="js/mapa.js"></script>


</body>
</html>