<?php

$loadedCount = $_GET['loadedCount'];

if ( $loadedCount < 2 ){

    $json_data = '{
    
        "items":[
        
            {
                "title": "007Slots Casino",
                "countNew": "4 NEW",
                "href": "#"
            },
            {
                "title": "African Palace Casino",
                "countNew": "32 NEW",
                "href": "#"
            },
            {
                "title": "Bet At Home Casino",
                "countNew": "1 NEW",
                "href": "#"
            },
            {
                "title": "African Palace Casino",
                "countNew": "2 NEW",
                "href": "#"
            },
            {
                "title": "Bet At Home Casino",
                "countNew": "1 NEW",
                "href": "#"
            },
            {
                "title": "African Palace Casino",
                "countNew": "2 NEW",
                "href": "#"
            },
            {
                "title": "Bet At Home Casino",
                "countNew": "1 NEW",
                "href": "#"
            },
            {
                "title": "Bet At Home Casino",
                "countNew": "1 NEW",
                "href": "#"
            },
            {
                "title": "007Slots Casino",
                "countNew": "4 NEW",
                "href": "#"
            },
            {
                "title": "African Palace Casino",
                "countNew": "32 NEW",
                "href": "#"
            },
            {
                "title": "Bet At Home Casino",
                "countNew": "1 NEW",
                "href": "#"
            },
            {
                "title": "African Palace Casino",
                "countNew": "2 NEW",
                "href": "#"
            },
            {
                "title": "Bet At Home Casino",
                "countNew": "1 NEW",
                "href": "#"
            },
            {
                "title": "African Palace Casino",
                "countNew": "2 NEW",
                "href": "#"
            },
            {
                "title": "Bet At Home Casino",
                "countNew": "1 NEW",
                "href": "#"
            },
            {
                "title": "Bet At Home Casino",
                "countNew": "1 NEW",
                "href": "#"
            }
        ]
    }';

} else if ( $loadedCount >= 2 && $loadedCount <= 5 ) {

    $json_data = '{

        "items":[

            {
                "title": "007Slots Casino",
                "countNew": "4 NEW",
                "href": "#"
            },
            {
                "title": "African Palace Casino",
                "countNew": "32 NEW",
                "href": "#"
            },
            {
                "title": "Bet At Home Casino",
                "countNew": "1 NEW",
                "href": "#"
            },
            {
                "title": "African Palace Casino",
                "countNew": "2 NEW",
                "href": "#"
            },
            {
                "title": "Bet At Home Casino",
                "countNew": "1 NEW",
                "href": "#"
            },
            {
                "title": "African Palace Casino",
                "countNew": "2 NEW",
                "href": "#"
            },
            {
                "title": "Bet At Home Casino",
                "countNew": "1 NEW",
                "href": "#"
            },
            {
                "title": "Bet At Home Casino",
                "countNew": "1 NEW",
                "href": "#"
            }

        ]
    }';

} else {
    $json_data = '{
        "items":[
       
        ]
    }';
};

echo $json_data;
exit;
?>