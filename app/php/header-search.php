<?php

$loadedCount = $_GET['loadedCount'];

if ( $loadedCount == 0 ){

echo " 
    <div class=\"search__popup-title\">
        <h2>BONUSES</h2>
    </div>

    <div class=\"search__popup-wrap search__popup_lists\">
        <a href=\"#\" class=\"search__popup-item\">
            <i>Casino Room Bonuses</i>
            <span>3 New</span>
        </a>
        <a href=\"#\" class=\"search__popup-item\">
            <i>Vegas Casino Bonuses</i>
            <span>2 new</span>
        </a>
        <a href=\"#\" class=\"search__popup-item\">
            <i>Very Vegas Mobile Casino</i>
            <span>1 new</span>
        </a>
    </div>

    <div class=\"search__popup-title\">
        <h2>CASINOS</h2>
    </div>

    <div class=\"search__popup-wrap search__popup_offers\">
        <a href=\"#\" class=\"search__popup-item\">
            <i>Cool Cat Casino</i>
        </a>
        <a href=\"#\" class=\"search__popup-item\">
            <i>Silver Oak Casino</i>
        </a>
        <a href=\"#\" class=\"search__popup-item\">
            <i>Very Vegas Mobile Casino</i>
        </a>
    </div>
     
    <div class=\"search__popup-title\">
        <h2>GAMES</h2>
    </div>

    <div class=\"search__popup-wrap search__popup_offers\">
        <a href=\"#\" class=\"search__popup-item\">
            <i>Starburst</i>
        </a>
        <a href=\"#\" class=\"search__popup-item\">
            <i>Cleopatra</i>
        </a>
        <a href=\"#\" class=\"search__popup-item\">
            <i>Fairytale Legends Red Riding Hood</i>
        </a>
    </div>
      
";

} else if ( $loadedCount >= 1 && $loadedCount < 7 ) {

echo " 
    <div class=\"search__popup-title\">
        <h2>BONUSES</h2>
    </div>

    <div class=\"search__popup-wrap search__popup_lists\">
        <a href=\"#\" class=\"search__popup-item\">
            <i>Casino Room Bonuses</i>
            <span>3 New</span>
        </a>
        <a href=\"#\" class=\"search__popup-item\">
            <i>Vegas Casino Bonuses</i>
            <span>2 new</span>
        </a>
        <a href=\"#\" class=\"search__popup-item\">
            <i>Very Vegas Mobile Casino</i>
            <span>1 new</span>
        </a>
    </div>

    <div class=\"search__popup-title\">
        <h2>CASINOS</h2>
    </div>

    <div class=\"search__popup-wrap search__popup_offers\">
        <a href=\"#\" class=\"search__popup-item\">
            <i>Cool Cat Casino</i>
        </a>
        <a href=\"#\" class=\"search__popup-item\">
            <i>Silver Oak Casino</i>
        </a>
        <a href=\"#\" class=\"search__popup-item\">
            <i>Very Vegas Mobile Casino</i>
        </a>
    </div>
     
    <div class=\"search__popup-title\">
        <h2>GAMES</h2>
    </div>

    <div class=\"search__popup-wrap search__popup_offers\">
        <a href=\"#\" class=\"search__popup-item\">
            <i>Starburst</i>
        </a>
        <a href=\"#\" class=\"search__popup-item\">
            <i>Cleopatra</i>
        </a>
        <a href=\"#\" class=\"search__popup-item\">
            <i>Fairytale Legends Red Riding Hood</i>
        </a>
    </div>

    <a href=\"#\" id=\"search__popup-links\">Show all results for \"<span></span>\"</a>          
";

} else if ( $loadedCount >= 5 ) {

    echo "
        <div id=\"search__popup-no-results\">There are no suggestions for your query</div>
        <a href=\"#\" id=\"search__popup-links\">Show all results for \"<span></span>\"</a>  
    ";

};

?>