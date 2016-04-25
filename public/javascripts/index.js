/*
 * Based on:
 * --https://github.com/AurelioDeRosa/flickr-gallery-demo
 * --http://michaelsoriano.com/create-a-responsive-photo-gallery-with-bootstrap-framework/
 * --https://gist.github.com/virtualandy/5143871
 * --https://github.com/LukaszCzerwinski/jQuery-Nice-Gallery-Flickr
 * --https://gist.github.com/kylerush/1695549
 * --http://www.dotnetcurry.com/jquery/1137/jquery-lazy-loading-flickr-image-gallery
 */

(function () {
    'use strict';

    var lastSearch = 'kittens';

    function searchPhotos(searchText, page) {
        if (searchText.length === 0) {
            alert('Error: the field is required');
        }

        page = page > 0 ? page : 1;
        window.Flickr.searchText(searchText, page);
    }

    function showPhotos(data) {
        createPager($('.js-thumbnails__pager'), {
            query: lastSearch,
            currentPage: data.photos.page,
            pagesNumber: data.photos.pages
        }
        );

        window.Gallery(data.photos.photo, $('.js-thumbnails__list'));
    }

    function createPager($element, parameters) {
        var pagesToShow = 5;
        var url = '/search/' + parameters.query + '/';
        $element.empty();

        var previousLinks = {
            '&lt;&lt;': 1,
            '&lt;': (parameters.currentPage - 1 || parameters.currentPage)
        };

        for (var key in previousLinks) {
            $element.append(
                    $('<li>').append(
                    $('<a>').attr("href", url + previousLinks[key])
                    .html('<span class="js-page-number visually-hidden">' + previousLinks[key] + '</span>' + key)));
        }

        // Avoid showing less than 6 pages in the pager because the user reaches the end
        var pagesDifference = parameters.pagesNumber - parameters.currentPage;
        var startIndex = parameters.currentPage;
        if (pagesDifference < pagesToShow) {
            startIndex = parameters.currentPage - (pagesToShow - pagesDifference - 1) || 1;
        }

        for (var i = startIndex; (i < parameters.currentPage + pagesToShow) && (i <= parameters.pagesNumber); i++) {
            $element.append($('<li>')
                    .append($('<a>').attr("href", url + i).addClass(i === parameters.currentPage ? "current" : "")
                            .append($('<span>').addClass("js-page-number").text(i))));
        }

        var nextLinks = {
            '&gt;': (parameters.currentPage === parameters.pagesNumber ? parameters.pagesNumber : parameters.currentPage + 1),
            '&gt;&gt;': parameters.pagesNumber
        };

        for (key in nextLinks) {
            $element.append(
                    $('<li>').append(
                    $('<a>').attr("href", url + nextLinks[key])
                    .html('<span class="js-page-number visually-hidden">' + nextLinks[key] + '</span>' + key)));
        }
    }

    function init() {

        // search box event handling
        $(".js-form-search").on('submit', function (event) {
            event.preventDefault();

            lastSearch = $('#query').val();
            if (lastSearch.length > 0) {
                searchPhotos(lastSearch, 1);
            }
//            return false;
        });

        // page selection event handling
        $('.js-thumbnails__pager').on('click', 'a, span', function (event) {
            event.preventDefault();

            var pgNum;
            var $curLink = $('.current');
            var $target = $(event.target);
            if ($target.is('span'))
                pgNum = $target.text();
            else if ($target.is('a'))
                pgNum = $target.find('.js-page-number').text();

            // Avoid reloading the same page
            if (pgNum && (pgNum !== $curLink.find('.js-page-number').text()))
                searchPhotos(lastSearch, pgNum);
//            return false;
        });

        // Kickstart the page
        searchPhotos(lastSearch, 1);
    }

    function main() {
        
         // When the page is scrolled call the lazyLoadImage function
//         $(window).scroll(lazyLoadImage);
        
        init();
    }

    window.Website = window.Utility.extend(window.Website || {}, {
        Homepage: {
            init: init,
            showPhotos: showPhotos,
            main: main
        }
    });

})();