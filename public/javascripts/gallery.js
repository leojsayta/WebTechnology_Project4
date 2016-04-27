(function () {
    'use strict';

    var currentIndex = 0;
    var numPhotos = 0;
    var photos = [];
    var isInitialized = false;

    function processPhotos(photoCollection) {
        photos = photoCollection;
        numPhotos = photos.length;
        currentIndex = 0;

        if (!isInitialized)
            setUpImageHandlers();
        
        showImage();
    }

    function showPrevious() {
        if (currentIndex > 0) {
            currentIndex--;
        }
        showImage();
    }

    function showNext() {
        if (currentIndex < numPhotos - 1) {
            currentIndex++;
        }
        showImage();
    }

    function setUpImageHandlers() {

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

        $('a.next').on('click', nextClickHandler());
        $('a.previous').on('click', prevClickHandler());
        $('#imgControlsDiv').show();

        isInitialized = true;
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

    function showImage() {

        if (!(currentIndex >= 0 && currentIndex < numPhotos)) {
            return false;
        }

        $('#imgCountry').attr('src', window.Flickr.buildPhotoLargeUrl(photos[currentIndex]));

        showHideControls();
    }

    window.Gallery = window.Utility.extend(window.Gallery || {}, {
        ProcessPhotos: processPhotos
    });
    
})();