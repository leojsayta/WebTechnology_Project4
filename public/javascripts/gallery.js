(function () {
    'use strict';

    var currentIndex = 0;
    var numPhotos = 0;
    var photos = [];
    var classes = 'col-lg-2 col-md-4 col-sm-3 col-xs-4 col-xxs-12';
    var classesArray = classes.split(" ");

    function Gallery(photoCollection, $thumbsContainer) {
        photos = photoCollection;
        numPhotos = photos.length;

        // Setup Modal
        createModalWrap();
        createThumbnailsGallery($thumbsContainer);

        function showPrevious() {
            if (currentIndex > 0) {
                currentIndex--;
            }
            nextPrevHandler();
        }

        function showNext() {
            if (currentIndex < numPhotos - 1) {
                currentIndex++;
            }
            nextPrevHandler();
        }

        function nextPrevHandler() {

            $('#bsPhotoGalleryModal .modal-body #bsModalImg').attr('src', window.Flickr.buildPhotoLargeUrl(photos[currentIndex]));

            showHideControls();
        }

        function insertClearFix(el, x) {
            var index = (x + 1);
            $.each(this.classesArray, function (e) {
                switch (this.classesArray[e]) {
                    //large
                    case "col-lg-1":
                        if ($(el).next('li.clearfix').length == 0) {
                            $(el).after('<li class="clearfix visible-lg-block"></li>');
                        }
                        break;
                    case "col-lg-2":
                        if (index % 6 === 0) {
                            $(el).after('<li class="clearfix visible-lg-block"></li>');
                        }
                        break;
                    case "col-lg-3":
                        if (index % 4 === 0) {
                            $(el).after('<li class="clearfix visible-lg-block"></li>');
                        }
                        break;
                    case "col-lg-4":
                        if (index % 3 === 0) {
                            $(el).after('<li class="clearfix visible-lg-block"></li>');
                        }
                        break;
                    case "col-lg-5":
                    case "col-lg-6":
                        if (index % 2 === 0) {
                            $(el).after('<li class="clearfix visible-lg-block"></li>');
                        }
                        break;
                        //medium
                    case "col-md-1":
                        if ($(el).next('li.clearfix').length == 0) {
                            $(el).after('<li class="clearfix visible-md-block"></li>');
                        }
                        break;
                    case "col-md-2":
                        if (index % 6 === 0) {
                            $(el).after('<li class="clearfix visible-md-block"></li>');
                        }
                        break;
                    case "col-md-3":
                        if (index % 4 === 0) {
                            $(el).after('<li class="clearfix visible-md-block"></li>');
                        }
                        break;
                    case "col-md-4":
                        if (index % 3 === 0) {
                            $(el).after('<li class="clearfix visible-md-block"></li>');
                        }
                        break;
                    case "col-md-5":
                    case "col-md-6":
                        if (index % 2 === 0) {
                            $(el).after('<li class="clearfix visible-md-block"></li>');
                        }
                        break;
                        //small
                    case "col-sm-1":
                        if ($(el).next('li.clearfix').length == 0) {
                            $(el).after('<li class="clearfix visible-sm-block"></li>');
                        }
                        break;
                    case "col-sm-2":
                        if (index % 6 === 0) {
                            $(el).after('<li class="clearfix visible-sm-block"></li>');
                        }
                        break;
                    case "col-sm-3":
                        if (index % 4 === 0) {
                            $(el).after('<li class="clearfix visible-sm-block"></li>');
                        }
                        break;
                    case "col-sm-4":
                        if (index % 3 === 0) {
                            $(el).after('<li class="clearfix visible-sm-block"></li>');
                        }
                        break;
                    case "col-sm-5":
                    case "col-sm-6":
                        if (index % 2 === 0) {
                            $(el).after('<li class="clearfix visible-sm-block"></li>');
                        }
                        break;
                        //x-small
                    case "col-xs-1":
                        if ($(el).next('li.clearfix').length == 0) {
                            $(el).after('<li class="clearfix visible-xs-block"></li>');
                        }
                        break;
                    case "col-xs-2":
                        if (index % 6 === 0) {
                            $(el).after('<li class="clearfix visible-xs-block"></li>');
                        }
                        break;
                    case "col-xs-3":
                        if (index % 4 === 0) {
                            $(el).after('<li class="clearfix visible-xs-block"></li>');
                        }
                        break;
                    case "col-xs-4":
                        if (index % 3 === 0) {
                            $(el).after('<li class="clearfix visible-xs-block"></li>');
                        }
                        break;
                    case "col-xs-5":
                    case "col-xs-6":
                        if (index % 2 === 0) {
                            $(el).after('<li class="clearfix visible-xs-block"></li>');
                        }
                        break;
                }
            });
        }

        function clearModalContent() {
            $('#bsPhotoGalleryModal .modal-body').empty;
        }

        function createModalWrap() {

            function nextClickHandler() {
                return function (event) {
                    event.preventDefault();

                    showNext();
                };
            }

            function prevClickHandler() {
                return function (event) {
                    event.preventDefault();

                    showPrevious();
                };
            }

            if ($('#bsPhotoGalleryModal').length !== 0) {
                return false;
            }

            var modal = '<div class="modal fade" id="bsPhotoGalleryModal" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">' +
                    '<div class="modal-dialog">' +
                    '<div class="modal-content">' +
                    '<div class="modal-body"></div>' +
                    '</div>' +
                    '</div>' +
                    '</div>';
            $('body').append(modal);

            var $img = $('<img/>').attr({
//            'src': src,
                'id': "bsModalImg",
                'class': "img-responsive"
            });
            var $span = $('<span/>').attr({
                'class': "glyphicon glyphicon-remove-circle",
                'style': "position: absolute; right: -14px; top: -11px; font-size: 30px; color:#fff; text-shadow: 1px 1px 18px #000;"
            });
            var $div = $('<div/>').attr({
                'style': "height:25px;clear:both;display:block;"
            });
            var $aNext = $('<a data-bsp-id=0>next &raquo;</a>').attr({
                'class': "controls next"
            }).on('click', nextClickHandler());
            var $aPrev = $('<a>&laquo; prev</a>').attr({
                'class': "controls previous"
            }).on('click', prevClickHandler());

            $div.append($aNext, $aPrev);
            $('#bsPhotoGalleryModal .modal-body').append($img, $span, $div);

            $('.glyphicon-remove-circle').on('click', closeModal);
            $(document).on('hidden.bs.modal', '#bsPhotoGalleryModal', clearModalContent);

        }

        function showHideControls() {

            if (numPhotos === currentIndex + 1) {
                $('a.next').hide();
            } else {
                $('a.next').show();
            }

            if (currentIndex === 0) {
                $('a.previous').hide();
            } else {
                $('a.previous').show();
            }
        }

        function showModal(index) {

            if (!(index >= 0 && index < numPhotos)) {
                return false;
            }

            currentIndex = index;

            $('#bsPhotoGalleryModal').modal();

            $('#bsPhotoGalleryModal .modal-body #bsModalImg').attr('src', window.Flickr.buildPhotoLargeUrl(photos[currentIndex]));

            showHideControls();
        }

        function closeModal() {
            $('#bsPhotoGalleryModal').modal('hide');
        }

        function createThumbnailsGallery ($container) {

            function clickHandler(index) {
                return function (event) {
                    event.preventDefault();

                    showModal(index);
                };
            }

            $container.empty();

            var $image, $link, $listItem;
            for (var i = 0; i < photos.length; i++) {
                $image = $('<img/>', {
                    "src": window.Flickr.buildThumbnailUrl(photos[i]),
                    "class": 'thumbnail',
                    "alt": photos[i].title,
                    "title": photos[i].title
                }).addClass('img-responsive');

                $link = $('<a/>', {
                    "href": $image.attr("src")
                }).on('click', clickHandler(i));

                $listItem = $('<li/>', {
                    "class": classes,
                    "data-bsp-li-index": i
                }).addClass('bspHasModal');

                $container.append($listItem.append($link.append($image)));

//            insertClearFix($listItem, i);
            }
        }
    }

    window.Gallery = Gallery;
})();