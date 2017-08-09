( function(){

    "use strict";

    $( function(){

        new SearchPanel ( $( '#search' ) );

        new Menu ( $( '#menu' ) );

        if ( $( '#page-info__content' ).length == 1 ){
            new PageInfoContent( $( '#page-info__content' ) );
        };


        if ( $( '#search-bonus' ).length == 1 ){
            new SearchBonus( $( '#search-bonus' ) );
        };

    } );

    var Menu = function( obj ) {

        //private properties
        var _obj = obj,
            _subMenuBtn = _obj.find( '.menu__open-sub-menu' ),
            _btnShowMobile = $( '#mobile-menu-btn' ),
            _site = $( '#site' ),
            _body = $( 'body' ),
            _window = $( window );

        //private methods
        var _onEvent = function() {

                _site.on(
                    'click', function ( e ) {

                        if ( _obj.hasClass( 'show' ) && $( e.target ).closest( _subMenuBtn ).length != 0  ){
                            return false;
                        }

                        if ( _obj.hasClass( 'show' ) && $( e.target ).closest( _obj ).length == 0 && _window.width() <= 1200 ){
                            _hideMenuOnMobile();
                        }

                    }
                );

                _btnShowMobile.on (
                    'click', function () {

                        if ( !_obj.hasClass( 'show' ) ) {
                            _showMenuOnMobile();
                        } else {
                            _hideMenuOnMobile();
                        }

                        return false;
                    }
                );

                _subMenuBtn.on (
                    'click', function () {

                        var curBtn = $( this );

                        if ( !curBtn.hasClass( 'active' ) && _window.width() <= 1200 ){
                            _showSubMenu( curBtn );
                        } else if ( _window.width() <= 1200 ) {
                            _hideSubMenu( curBtn );
                        }

                        return false;
                    }
                );

            },
            _showSubMenu = function ( btn ) {

                var curBtn = btn,
                    curSubMenu = curBtn.next( '.menu__sub-menu' ),
                    curSubMenuHeight = curSubMenu.find( 'ul' ).outerHeight();

                curBtn.addClass( 'active' );
                curSubMenu.addClass( 'visible' );

                if ( _window.width() <= 1200 ){
                    curSubMenu.css( 'height', curSubMenuHeight )
                };

            },
            _hideSubMenu = function ( btn ) {

                var curBtn = btn,
                    curSubMenu = curBtn.next( '.menu__sub-menu' ),
                    curSubMenuHeight = curSubMenu.find( 'ul' ).outerHeight();

                curBtn.removeClass( 'active' );
                curSubMenu.removeClass( 'visible' );

                if ( _window.width() <= 1200 ){
                    curSubMenu.css( 'height', 0 )
                };

            },
            _showMenuOnMobile = function () {

                if ( _window.width() < 1200 ){
                    _body.css( 'overflow-y', 'hidden' );
                }

                _site.addClass( 'hide' );
                _obj.addClass( 'show' );
                _btnShowMobile.addClass( 'close' );

            },
            _hideMenuOnMobile = function () {

                if ( _window.width() < 1200 ){
                    _body.css( 'overflow-y', 'auto' );
                }

                _site.removeClass( 'hide' );
                _obj.removeClass( 'show' );
                _btnShowMobile.removeClass( 'close' );

            },
            _init = function() {
                _onEvent();
            };

        //public properties

        //public methods

        _init();
    };

    var PageInfoContent = function( obj ) {

        //private properties
        var _obj = obj,
            _content = _obj.find( '#page-info__text' ),
            _btnMore = _obj.find( '#page-info__more' ),
            _contentHeight;

        //private methods
        var _onEvent = function() {

                _btnMore.on(
                    'click', function () {

                        if ( !_content.hasClass( 'visible' ) ) {
                            _showAllContent();
                        } else {
                            _showLessContent();
                        }

                        return false;

                    }
                );

            },
            _showAllContent = function () {

                _content.addClass( 'visible' );

                _contentHeight = _content.outerHeight();
                _content.css( 'height', _content.find( 'div' ).outerHeight() );

                _btnMore.html( 'Read Less' );

            },
            _showLessContent = function () {

                _content.removeClass( 'visible' );

                _content.css( 'height', _contentHeight );

                _btnMore.html( 'Read More' );

            },
            _init = function() {
                _onEvent();
            };

        //public properties

        //public methods

        _init();
    };

    var SearchBonus = function( obj ) {

        //private properties
        var _obj = obj,
            _searchForm = _obj.find( '#search-bonus__form' ),
            _searchInput = _searchForm.find( 'input' ),
            _btnCancel = _searchForm.find( '#search-bonus__search-cancel' ),
            _resultWrap = _obj.find( '#search-bonus__result' ),
            _noResults = _obj.find( '#search-bonus__no-results' ),
            _request = new XMLHttpRequest();

        //private methods
        var _onEvent = function() {

                _searchInput.on(
                    'keyup', function( e ) {
                        if( e.keyCode == 27 ){

                        } else if( e.keyCode == 40 ){

                        } else if( e.keyCode == 38 ){

                        } else if ( e.keyCode == 13 ) {
                            return false;
                        } else {
                            _ajaxRequest( 1 );

                            if ( $( this ).val() == '' ){
                                _btnCancel.removeClass( 'visible' )
                            } else {
                                _btnCancel.addClass( 'visible' )
                            }

                        }
                    }
                );

                _btnCancel.on(
                    'click', function() {

                        _searchForm[0].reset();
                        _btnCancel.removeClass( 'visible' );

                        _ajaxRequest();

                        return false;

                    }
                );

            },
            _ajaxRequest = function( ){

                _obj.addClass( 'load' );

                _request = $.ajax( {
                    url: 'php/search-results.php',
                    data: {
                        value: _searchInput.val(),
                        loadedCount: _searchInput.val().length
                    },
                    dataType: 'json',
                    type: 'GET',
                    success: function ( data ) {

                        _loadData( data );

                    },
                    error: function ( XMLHttpRequest ) {
                        if ( XMLHttpRequest.statusText != "abort" ) {
                            console.log( 'err' );
                        }
                    }
                } );

            },
            _loadData = function ( data ) {

                _resultWrap.empty();

                var arr = data.items,
                    number = arr.length;

                for ( var i = 0; i < number; i++ ){

                    if ( i == 0 ){
                        _resultWrap.html( '<a href="'+ arr[i].href +'" class="search-bonus__item"><i>'+ arr[i].title +'</i><span>'+ arr[i].countNew +'</span></a>' );
                    } else {
                        _resultWrap.append( '<a href="'+ arr[i].href +'" class="search-bonus__item"><i>'+ arr[i].title +'</i><span>'+ arr[i].countNew +'</span></a>' );
                    }

                }

                if ( data == undefined || data.items == undefined || data.items.length == 0 ) {

                    _resultWrap.find( '.search__popup-title' ).hide( 300 );
                    _noResults.show( 300 );

                } else {

                    _resultWrap.find( '.search__popup-title' ).show( 300 );
                    _noResults.hide( 300 );

                };

                _obj.removeClass( 'load' );

                _resultWrap.mCustomScrollbar();

            },
            _init = function() {
                _ajaxRequest();
                _onEvent();
            };

        //public properties

        //public methods

        _init();
    };

    var SearchPanel = function( obj ) {

        //private properties
        var _obj = obj,
            _btnShowMobile = _obj.find( '#search__btn-open' ),
            _searchForm = _obj.find( '#search__form' ),
            _searchInput = _searchForm.find( 'input' ),
            _btnCancel = _searchForm.find( '#search__btn-cancel' ),
            _searchUpdate = _searchForm.find( '#search__btn-update' ),
            _body = $( 'html, body' ),
            _site = $( '#site' ),
            _window = $( window ),
            _loadNewContent = true,
            _request = new XMLHttpRequest();

        //private methods
        var _onEvent = function() {

                _window.on (
                    'resize', function () {

                    }
                );

                _site.on(
                    'click', function ( e ) {

                        if ( _searchForm.hasClass( 'show' ) && $( e.target ).closest( _obj ).length == 0 ){
                            _hidePanel();
                            _searchForm[0].reset();
                        }

                    }
                );

                _btnShowMobile.on (
                    'click', function () {
                        _showPanel();
                    }
                );

                _btnCancel.on (
                    'click', function () {

                        _hidePanel();

                        _searchForm[0].reset();
                        _showUpdate();

                        return false;
                    }
                );

                _searchInput.on ( {
                    'focus': function () {

                        _ajaxRequest();

                    },
                    'keyup': function( e ) {
                        if( e.keyCode == 27 ){

                        } else if( e.keyCode == 40 ){

                        } else if( e.keyCode == 38 ){

                        } else if ( e.keyCode == 13 ) {

                        } else {

                            var searchPopup = _obj.find( '#search__popup' );
                            searchPopup.addClass( 'load' );
                            _showUpdate();
                            _ajaxRequest();

                        }
                    }
                } );

                _searchUpdate.on (
                    'click', function () {

                        _searchForm[0].reset();
                        _ajaxRequest();
                        _showUpdate();

                        return false;

                    }
                );

            },
            _ajaxRequest = function(){

                _request = $.ajax( {
                    url: 'php/header-search.php',
                    data: {
                        value: _searchInput.val(),
                        loadedCount: _searchInput.val().length
                    },
                    dataType: 'html',
                    type: 'GET',
                    success: function ( data ) {

                        _loadData( data );

                    },
                    error: function ( XMLHttpRequest ) {
                        if ( XMLHttpRequest.statusText != "abort" ) {
                            console.log( 'err' );
                        }
                    }
                } );

            },
            _showPopup = function () {

                var searchPopup = _obj.find( '#search__popup' );

                searchPopup.addClass( 'show' );

                if ( _body.width() < 768 ) {
                    searchPopup.css( {
                        'left': _obj.offset().left * -1 + 10,
                        'width': _body.outerWidth() - 20
                    } );
                } else if ( _body.width() < 1200 ) {
                    searchPopup.css( {
                        'left': _obj.offset().left * -1 + 20,
                        'width': _body.outerWidth() - 40
                    } );
                }

                searchPopup.removeClass( 'load' );

            },
            _hidePopup = function () {

                var searchPopup = _obj.find( '#search__popup' );

                searchPopup.remove( );

                _loadNewContent = true;

            },
            _searchMoreLink = function () {

                var searchPopup = _obj.find( '#search__popup' ),
                    searchLinksResults =  searchPopup.find( '#search__popup-links' );

                if ( _searchInput.val().length > 0 ) {
                    searchLinksResults.find( 'span' ).html( _searchInput.val() );
                };

            },
            _showUpdate = function () {

                if ( _searchInput.val().length > 0 ) {
                    _searchUpdate.addClass( 'show' );
                } else {
                    _searchUpdate.removeClass( 'show' );
                }

            },
            _showPanel = function () {

                _searchForm.addClass( 'show' );

                if ( _body.width() < 1200 ) {
                    _searchForm.css( {
                        'left': _obj.offset().left * -1,
                        'width': _body.outerWidth()
                    } );
                }

            },
            _hidePanel = function () {

                if ( _body.width() < 1200 ) {
                    _searchForm.css( {
                        'left': 0,
                        'width': 0
                    } );
                }

                _searchForm.removeClass( 'show' );

                _hidePopup();

            },
            _loadData = function ( data ) {

                if ( _loadNewContent ){

                    _obj.append( '<div id="search__popup" class="load"><div id="search__preload"><div id="search__preload-element"></div></div></div>' )

                }

                var searchPopup = _obj.find( '#search__popup' ),
                    arr = data;

                if ( _loadNewContent ){

                    searchPopup.prepend( arr );
                    _loadNewContent = false;

                } else {

                    searchPopup.empty();
                    searchPopup.append( '<div id="search__preload"><div id="search__preload-element"></div></div>' );
                    searchPopup.prepend( arr );

                }

                _illumination();
                _searchMoreLink();
                _showPopup();

            },
            _illumination = function () {

                var searchItems = _obj.find( '.search__popup-item i' );

                searchItems.each( function () {

                    $( this ).html(function( _, html ) {
                        return html.replace( new RegExp( _searchInput.val().toLowerCase(), 'i\g' ), '<b>$&</b>' )
                    } );

                } );

            },
            _init = function() {
                _onEvent();
            };

        //public properties

        //public methods

        _init();
    };

} )();