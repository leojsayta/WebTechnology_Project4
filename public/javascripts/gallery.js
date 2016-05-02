(function () {
    'use strict';

    var currentIndex = 0;
    var numPhotos = 0;
    var photos = [];
    var isInitialized = false;
    var $aNext, $aPrev, $img, $imgCntrlDiv;

    function processPhotos(photoCollection, jqImgCtrlDiv, jqANext, jqAPrev, jqImg) {
        photos = photoCollection;
        numPhotos = photos.length;
        currentIndex = 0;

        if (!isInitialized) {
            $imgCntrlDiv = jqImgCtrlDiv;
            $aNext = jqANext;
            $aPrev = jqAPrev;
            $img = jqImg;
            setUpImageHandlers();
        }

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

        $aNext.on('click', nextClickHandler());
        $aPrev.on('click', prevClickHandler());
        $imgCntrlDiv.show();

        isInitialized = true;
    }

    function showHideControls() {

        if (numPhotos === currentIndex + 1) {
            $aNext.hide();
        } else {
            $aNext.show();
        }

        if (currentIndex === 0) {
            $aPrev.hide();
        } else {
            $aPrev.show();
        }
    }

    function showImage() {

        if (!(currentIndex >= 0 && currentIndex < numPhotos)) {
            return false;
        }

        $img.attr('src', window.Flickr.buildPhotoLargeUrl(photos[currentIndex]));

        showHideControls();
    }

    window.Gallery = window.Utility.extend(window.Gallery || {}, {
        ProcessPhotos: processPhotos
    });

})();