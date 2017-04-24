<?php
$structureJsonMap = array(
    array(
        'name' => 'Loja Estados Unidos',
        'location' => array(
            'country' => array(
                'name' => 'Estados Unidos',
                'slug' => 'estados-unidos'
            ),
            'state' => array(
                'name' => 'Kansas',
                'slug' => 'kansas'
            ),
            'city' => array(
                'name' => 'Dighton',
                'slug' => 'dightons'
            ),
            'district' => array(
                'name' => 'W Long St',
                'slug' => 'w-long-st'
            ),
            'coordinates' => array(
                'lat' => 38.482035,
                'lng' => -100.466882
            ),
            'full_address' => 'Endereço Completo aqui #1'
        ),
        'phone' => '66 666666',
        'type' => array(
            'name' => 'Loja',
            'slug' => 'loja'
        )
    )
);

$fp = fopen('stores-generated-with-php.json', 'w');
fwrite($fp, json_encode($structureJsonMap));
fclose($fp);
