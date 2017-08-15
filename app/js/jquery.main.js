( function(){

    "use strict";

    $( function(){

        new SearchPanel ( $( '#search' ) );

        new Menu ( $( '#menu' ) );

        if ( $( '#anchor' ).length == 1 ){
            new Anchor( $( '#anchor' ) );
        };

        if ( $( '#single-game__info' ).length == 1 ){
            new Sliders( $( '#single-game__info' ) );
        };

        if ( $( '#revision__note' ).length == 1 ){
            new RevisionNote( $( '#revision__note' ) );
        };

        if ( $( '#notification' ).length == 1 ){
            new Notification( $( '#notification' ) );
        };

        if ( $( '#intro__content' ).length == 1 ){
            new PageInfoContent( $( '#intro__content' ) );
        };

        if ( $( '#search-bonus' ).length == 1 ){
            new SearchBonus( $( '#search-bonus' ) );
        };

        if ( $( '#sort' ).length == 1 ){
            new SortPopup( $( '#sort' ) );
        };

        if ( $( '#filter' ).length == 1 ){
            new Filter( $( '#filter' ) );
        };

        if ( $( '#filter' ).length == 1 ){
            new DataCollection( $( '#filter' ) );
        };

        if ( $( '#revision' ).length == 1 ){
            new Revision( $( '#revision' ) );
        };

        $.each( $('.anchor'), function () {

            new Anchor( $(this) );

        } );

        $.each( $('.search-result__wrap'), function () {

            new PageSearchResult( $(this) );

        } );

    } );

    var Anchor = function ( obj ) {
        var _obj = obj,
            _body = $( 'html, body' );

        var _onEvents = function() {

                _obj.on( {
                    click: function() {

                        _body.animate( {
                            scrollTop: $( $.attr(this, 'href') ).offset().top
                        }, 600);

                        return false;
                    }
                } );

            },
            _construct = function() {
                _onEvents();
            };

        _construct()
    };

    var Notification = function ( obj ) {
        var _obj = obj,
            _btnClose = _obj.find( '.notification__close' );

        var _onEvents = function() {

                _btnClose.on( {
                    click: function() {
                        _closePopup();
                        return false;
                    }
                } );

            },
            _closePopup = function () {

                _obj.addClass( 'hide' );

                setTimeout( function () {
                    _obj.remove();
                }, 500 )

            },
            _construct = function() {
                _onEvents();
            };

        _construct()
    };

    var Revision = function ( obj ) {
        var _self = this,
            _obj = obj,
            _page = 0,
            _filter = $( '#filter' ),
            _form = _filter.find( '#filter__wrap' ),
            _filterResultHead = _filter.find( '#filter__result' ),
            _filterResult = _filterResultHead.find( '#filter__result-find' ),
            _resultframe = _obj.find( '#revision__result' ),
            _allCasinosBody = _obj.find( '#revision__body' ),
            _allBtnMoreWrap = _allCasinosBody.find( '#revision__btn-wrap' ),
            _result = _resultframe.find( 'b' ),
            _noResult = _obj.find( '#revision__no-result' ),
            _reset = _noResult.find( '#revision__reset' ),
            _btnLoadMore = _obj.find( '#revision__load' ),
            _revisionNote = _obj.find( '#revision__note' ),
            _revisionNoteBtn = _revisionNote.find( '#revision__note-btn' ),
            _revisionNotePopup = _revisionNote.find( '#revision__note-popup' ),
            _window = $( window ),
            _url, _allCasinosWrap,
            _site = $( '#site' ),
            _request = new XMLHttpRequest();

        var _onEvents = function() {

                _site.on(
                    'click', function ( e ) {

                        if ( _revisionNotePopup.hasClass( 'visible' )&& $( e.target ).closest( _revisionNotePopup ).length == 0 ){
                            _hideNotePopup();
                        }

                    }
                );

                _btnLoadMore.on( 'click', function () {
                    _ajaxRequest();
                    return false;
                } );

                _reset.on( 'click', function () {
                    _form[0].reset();
                    _page = 0;
                    _ajaxRequest( _page );
                    return false;
                } );

                _revisionNoteBtn.on( 'click', function () {

                    if ( !_revisionNotePopup.hasClass( 'visible' ) && _window.outerWidth() < 1200 ) {
                        _showNotePopup();
                    } else {
                        _hideNotePopup();
                    }

                    return false;
                } );

            },
            _construct = function() {
                _ajaxRequest( _page );
                _onEvents();
                _obj[0].obj = _self;
            },
            _ajaxRequest = function(){

                if ( _obj.hasClass( 'all-casinos' ) ){
                    _url = 'php/all-casinos.php'
                } else  if ( _obj.hasClass( 'all-games' ) ){
                    _url = 'php/all-games.php'
                }

                _request = $.ajax( {
                    url: _url,
                    data: {
                        page: _page,
                        filter: $( '#filter' )[0].obj.dataCollection()
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
            _loadData = function ( data ) {

                var data = JSON.parse( data ),
                    content = data.html,
                    allResult = data.count,
                    leftPage = data.page;

                _showResults( allResult );

                _noResult.removeClass( 'show' );
                _allCasinosBody.removeClass( 'hide' );

                if ( content == '' || content == undefined ) {
                    _noResult.addClass( 'show' );
                    _allCasinosBody.addClass( 'hide' );
                } else {
                    _addNewItems( content );
                }

                if ( leftPage <= 0 ){
                    _allBtnMoreWrap.addClass( 'hide' );
                }

            },
            _addNewItems = function ( data ) {

                if ( _obj.hasClass( 'all-casinos' ) ){
                    _allCasinosWrap = _obj.find( '#online-casinos__content-body' );
                } else  if ( _obj.hasClass( 'all-games' ) ){
                    _allCasinosWrap = _obj.find( '#games__wrap' );
                }

                var content = data;

                if ( _page == 0 ){
                    _allCasinosWrap.html( content );
                } else {
                    _allCasinosWrap.append( content );
                }

                _page = _page + 1;

                var newItem = _allCasinosWrap.find( '.new' );

                newItem.each( function ( i ) {

                    var curItem = $( this );

                    _showNewItems( curItem, i );

                } );

            },
            _showResults = function ( numser ) {

                var allResult = +numser;

                _filterResult.removeClass( 'active' );
                _filterResultHead.removeClass( 'null' );
                _resultframe.removeClass( 'null' );

                if ( allResult > 0 ) {
                    _filterResult.text( allResult );
                    _filterResult.addClass( 'active' );

                    _result.text( allResult );
                } else if ( allResult == 0 ){
                    _filterResult.text( allResult );
                    _filterResult.addClass( 'active' );
                    _filterResultHead.addClass( 'null' );

                    _result.text( allResult );
                    _resultframe.addClass( 'null' );
                } else{
                    _filterResult.removeClass( 'active' );
                    _filterResultHead.removeClass( 'null' );
                    _resultframe.removeClass( 'null' );
                }

            },
            _showNewItems = function ( item, index ) {

                    var curItem = item;

                    setTimeout( function() {
                        curItem.removeClass( 'new' );
                    }, 50 * index );

            },
            _showNotePopup = function () {
                _revisionNotePopup.addClass( 'visible' )
            },
            _hideNotePopup = function () {
                _revisionNotePopup.removeClass( 'visible' )
            };

        //public methods
        _self.reload = function () {
            _page = 0;
            _ajaxRequest( _page );
        };

        _construct()
    };

    var DataCollection = function ( obj ) {
        var _self = this,
            _obj = obj,
            _filterForm = $( '#filter__wrap' ),
            _filterFormCheckboxes = _filterForm.find( 'input[type=checkbox]' ),
            _sort = $( '#sort' ),
            _demo = $( '#revision__note input' ),
            _collectionArr = {};

        var _onEvents = function() {

            },
            _dataCollection = function () {

                var arr = [];

                _collectionArr = {};

                _filterFormCheckboxes.filter( ':checked' ).each( function () {

                    var curInputs = $( this ),
                        curInputsVal = curInputs.val();

                    arr.push( curInputsVal );

                } );

                var sortBy = _sort.find( 'input[type=radio]:checked' );

                _collectionArr['filter'] = arr;
                _collectionArr['sort'] = sortBy.val();

                if ( _demo.is( ':checked' ) ){
                    _collectionArr['demo'] = _demo.val();
                }

                return _collectionArr;

            },
            _filterContent = function () {

                if ( $( '#revision' ).length == 1 ){
                    $( '#revision' )[0].obj.reload();
                };

            },
            _construct = function() {
                _onEvents();
                _obj[0].obj = _self;
            };

        //public methods
        _self.dataCollection = function () {
            return JSON.stringify( _dataCollection() );
        };
        _self.reloadFrame = function () {
            _filterContent();
        };

        _construct()
    };

    var Filter = function ( obj ) {
        var _obj = obj,
            _mobileOpenBtn = $( '#filter-mobile-btn' ),
            _form = _obj.find( '#filter__wrap' ),
            _mobileBtn = _obj.find( '#filter__done' ),
            _resetBtn = _obj.find( '#filter__result-reset' ),
            _inputs = _form.find( 'input[type=checkbox]' ),
            _closeFrameBtn = _form.find( '.filter__frame-topic' ),
            _btnShowMore = _form.find( '.filter__more' ),
            _filterFrame = _obj.find( '.filter__frame' ),
            _site = $( '#site' ),
            _window = $( window );

        var _onEvents = function() {

                _site.on(
                    'click', function ( e ) {

                        if ( _obj.hasClass( 'show' ) && $( e.target ).closest( _obj ).length == 0 && _window.width() <= 1200 ){
                            _hideMobileFilter();
                        }

                    }
                );

                _inputs.on( 'change', function() {

                    if ( _window.outerWidth() >= 1200 ) {
                        _filterContent();


                        if (_inputs.filter(':checked').length > 0) {
                            _showResetBtn();
                        } else {
                            _hideResetBtn();
                        }

                    }

                } );

                _mobileBtn.on( 'click', function() {
                    _filterContent();
                    _hideMobileFilter
                    return false;
                } );

                _resetBtn.on( 'click', function() {
                    _form[0].reset();
                    _filterContent();

                    if ( _window.outerWidth() >= 1200 ) {
                        _hideResetBtn();
                    }

                    return false;
                } );

                _closeFrameBtn.on( 'click', function() {

                    var curElem = $( this );

                    if ( curElem.hasClass( 'close' ) ){
                        _showFrame( curElem );
                    } else {
                        _hideFrame( curElem );
                    }

                    return false;
                } );

                _mobileOpenBtn.on( 'click', function() {

                    if ( !_obj.hasClass( 'show' ) && _window.outerWidth() <= 1200 ){
                        _showMobileFilter();
                    } else {
                        _hideMobileFilter();
                    }

                    return false;
                } );

                _btnShowMore.on( 'click', function() {

                    var curBtn = $( this );

                    if ( !curBtn.hasClass( 'less' ) ){
                        _showLess( curBtn );
                    } else {
                        _showMore( curBtn );
                    }

                    return false;
                } );

            },
            _showMore = function ( elment ) {

                var curBtn = elment,
                    curParent = curBtn.parents( '.filter__frame' );

                curBtn.removeClass( 'less' );

                curParent.find( 'label' ).filter( '.visible' ).addClass( 'hide' ).removeClass( 'visible' );
                curBtn.find( 'span' ).html( 'Show <i></i> More' )

                _countLabels();

            },
            _showLess = function ( elment ) {

                var curBtn = elment,
                    curParent = curBtn.parents( '.filter__frame' );

                curBtn.addClass( 'less' );

                curParent.find( 'label' ).filter( '.hide' ).addClass( 'visible' ).removeClass( 'hide' );
                curBtn.find( 'span' ).text( 'Show Less' );

            },
            _countLabels = function () {

                var hideLength = _filterFrame.find( 'label' ).filter( '.hide' ).length;

                _btnShowMore.find( 'i' ).text( hideLength );

            },
            _showMobileFilter = function () {

                _obj.addClass( 'show' );
                _site.addClass( 'hide-for-filter' );

            },
            _hideMobileFilter = function () {

                _obj.removeClass( 'show' );
                _site.removeClass( 'hide-for-filter' );

            },
            _showFrame = function ( elem ) {

                var curBtn = elem,
                    curFrame = curBtn.next( 'dd' );

                curBtn.removeClass( 'close' );
                curFrame.css( 'height', curFrame.attr( 'data-height' ) );

            },
            _hideFrame = function ( elem ) {

                var curBtn = elem,
                    curFrame = curBtn.next( 'dd' );

                curFrame.css( 'height', curFrame.outerHeight() );
                curFrame.attr( 'data-height', curFrame.outerHeight() )

                curBtn.addClass( 'close' );
                curFrame.css( 'height', 0 );

            },
            _showResetBtn = function () {

                if( !_resetBtn.hasClass( 'visible' ) ){
                    _resetBtn.addClass( 'visible' );
                }

            },
            _hideResetBtn = function () {

                _resetBtn.removeClass( 'visible' );

            },
            _filterContent = function () {
                $( '#filter' )[0].obj.reloadFrame();
            },
            _construct = function() {
                _countLabels();
                _onEvents();
            };

        //public methods

        _construct()
    };

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
            _construct = function() {
                _onEvent();
            };

        //public properties

        //public methods

        _construct();
    };

    var PageInfoContent = function( obj ) {

        //private properties
        var _obj = obj,
            _content = _obj.find( '#intro__text' ),
            _btnMore = _obj.find( '#intro__more' ),
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
            _construct = function() {
                _onEvent();
            };

        //public properties

        //public methods

        _construct();
    };

    var PageSearchResult = function( obj ) {

        //private properties
        var _obj = obj,
            _btnForShow = _obj.find( '.search-result__more' ),
            _frame = _obj.find( '.search-result__frame' ),
            _viewNum = 6;

        //private methods
        var _onEvent = function() {

                _btnForShow.on( 'click', function () {

                    var curBtn = $( this );

                    if ( curBtn.hasClass( 'hide-links' ) ){
                        _showLessLinks( curBtn );
                    } else{
                        _showMoreLinks( curBtn );
                    }

                    return false;

                } );

            },
            _showMoreLinks = function ( object ) {

                var curBtn = object,
                    curBtnText = curBtn.find( 'span' ),
                    curLinksWrap = curBtn.prev( '.search-result__frame' ),
                    curWrapLinks = curLinksWrap.find( '.search-result__item' ),
                    curLinksWrapHeight = curLinksWrap.find( 'div' ).outerHeight();

                curBtn.addClass( 'hide-links' );
                curBtnText.html( 'Show '+ ( curWrapLinks.length - _viewNum ) +' Less' );

                curLinksWrap.css( 'height', curLinksWrapHeight );

            },
            _showLessLinks = function ( object ) {

                if ( object.length > 0 ){

                    var curBtn = object;

                    _frame = curBtn.prev( '.search-result__frame' );

                    curBtn.removeClass( 'hide-links' );

                }

                _frame.each( function () {
                    var curFrame = $( this ),
                        curWrapLinks = curFrame.find( '.search-result__item' ),
                        curHeight = 0,
                        curBtn = curFrame.next( '.search-result__more' ),
                        curBtnText = curBtn.find( 'span' );

                    console.log(curWrapLinks.length - _viewNum)
                    for ( var i = 0; i < _viewNum; i++ ){

                        curHeight = curHeight + curWrapLinks.eq( i ).outerHeight();

                    }

                    for ( i = _viewNum; i < curWrapLinks.length; i++ ){

                        curWrapLinks.eq( i ).addClass( 'hide' );

                    }

                    curBtnText.html( 'Show '+ ( curWrapLinks.length - _viewNum ) +' More' );
                    curFrame.css( 'height', curHeight );

                } );

            },
            _construct = function() {
                _showLessLinks( 0 );
                _onEvent();
            };

        //public properties

        //public methods

        _construct();
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

                _resultWrap.perfectScrollbar('update');

            },
            _scrollContent = function () {
                _resultWrap.perfectScrollbar();
            },
            _construct = function() {
                _ajaxRequest();
                _scrollContent();
                _onEvent();
            };

        //public properties

        //public methods

        _construct();
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
                        _checkShow();
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
            _checkShow = function () {

                if ( _searchForm.hasClass( 'show' ) ){
                    _showPanel();

                    var popup = _obj.find( '#search__popup' );

                    if ( popup.hasClass( 'show' ) ){
                        _showPopup();
                    }

                }

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
            _construct = function() {
                _checkShow();
                _onEvent();
            };

        //public properties

        //public methods

        _construct();
    };

    var Sliders = function( obj ) {

        //private properties
        var _obj = obj,
            _subMenuSwiper = _obj.find( '#single-game__swiper' ),
            _subMenuPrev = _obj.find( '#single-game__swiper-prev' ),
            _subMenuNext = _obj.find( '#single-game__swiper-next' ),
            _subMenu,
            _window = $( window );

        //private methods
        var _initSlider = function() {

                _subMenu = new Swiper ( _subMenuSwiper, {
                    autoplay: false,
                    speed: 500,
                    effect: 'slide',
                    slidesPerView: 2,
                    nextButton: _subMenuPrev,
                    prevButton: _subMenuNext,
                    onSlideChangeStart: function() {
                        _obj.removeClass( 'start' );
                        _obj.removeClass( 'end' );
                    },
                    onReachBeginning: function() {
                        setTimeout( function () {
                            _obj.addClass('start');
                        }, 300 )
                    },
                    onReachEnd: function() {
                        setTimeout( function () {
                            _obj.addClass('end');
                        }, 300 )
                    }
                } );

            },
            _onEvent = function() {

                _window.on( {
                    'resize': function() {

                        if ( _window.outerWidth() > 768  ){
                            _destroySlider();
                        } else {
                            _initSlider();
                        }

                    }
                } )

            },
            _destroySlider = function() {

                _subMenu[ 0 ].swiper.destroy( false, true );

            },
            _init = function() {
                _onEvent();

                if ( _window.outerWidth() < 768  ){
                    _initSlider ();
                }

            };

        //public properties

        //public methods

        _init();
    };

    var SortPopup = function ( obj ) {
        var _sort = obj,
            _sortBtn = _sort.find( '#sort__select' ),
            _sortPopup = _sort.find( '#sort__popup' ),
            _sortRadio = _sortPopup.find( 'input' ),
            _site = $( '#site' );

        var _onEvents = function() {

                _site.on(
                    'click', function ( e ) {

                        if ( _sort.hasClass( 'show' )&& $( e.target ).closest( _sort ).length == 0 ){
                            _hideSortPopup();
                        }

                    }
                );

                _sortBtn.on( 'click', function () {

                    if ( _sort.hasClass( 'show' ) ){
                        _hideSortPopup();
                    } else {
                        _showSortPopup();
                    }

                } );

                _sortRadio.on( 'change', function() {

                    var curItem = $( this );

                    _sortContent();
                    _changeTitle( curItem );
                    _hideSortPopup();

                } );

            },
            _sortContent = function () {
                $( '#filter' )[0].obj.reloadFrame();
            },
            _changeTitle = function ( elem ) {

                var curItem = elem,
                    curText = curItem.next( 'span' ).html();

                _sortBtn.find( 'i' ).text( curText );

            },
            _showSortPopup = function() {

                _sort.addClass( 'show' );

            },
            _hideSortPopup = function() {

                _sort.removeClass( 'show' );

            },
            _construct = function() {
                _onEvents();
            };

        _construct()
    };

    var RevisionNote = function ( obj ) {
        var _obj = obj,
            _chooser = _obj.find( 'input' ),
            _label = _obj.find( '#revision__note-label' );

        var _onEvents = function() {

                _chooser.on( 'change', function() {

                    _addContent();

                    if ( _chooser.is( ':checked' ) ){
                        _label.text( 'Hide games without demo play' );
                    } else {
                        _label.text( 'Add games without demo play' );
                    }


                } );

            },
            _addContent = function () {
                $( '#filter' )[0].obj.reloadFrame();
            },
            _construct = function() {
                _onEvents();
            };

        _construct()
    };

} )();