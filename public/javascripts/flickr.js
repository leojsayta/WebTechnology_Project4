(function () {
    'use strict';

    var apiKey = '4dbc029f6413e6cf09acec75ff63c70c';
    var apiURL = 'https://api.flickr.com/services/rest/';

    function searchText(searchText, page) {
        
        var flickrAPI_RequestParams = {
            method: 'flickr.photos.search',
            text: searchText,
            page: page,
//                    'tags': 'monument,statue,historical',
//                    'has_geo': true,
//                    'lat': searchLat,
//                    'lon': searchLon,
//                    //'place_id': place.place_id,
//                    'accuracy': 11,
//                    'safe_search': 1,
//                    'privacy_filter': 1,
            per_page: 15,
            format: 'json',
//            jsoncallback: 'showFlickrPhotos',
            api_key: apiKey
        };
        
        var jQueryAPI_RequestParams = {
            type: 'GET',
            url: apiURL,
            dataType: 'jsonp',
            cache: true,
            crossDomain: true,
            jsonp: false,
            jsonpCallback: 'jsonFlickrApi',
            data: flickrAPI_RequestParams,
            success: function (data) {
                if (data.photos.photo.length > 0) {
                    window.Website.Homepage.showPhotos(data);
                } else {
                    console.log(data.photos);
                }

            }
        };

        // Get the photo feed from flickr
        $.ajax(jQueryAPI_RequestParams).fail(
                function (jqXHR, textStatus, errorThrown) {
                    console.log('req failed');
                    console.log('textStatus: ', textStatus, ' code: ', jqXHR.status);
                });
                    
//        $.getJSON(apiURL, requestParameters).done(function(data){
//            window.Website.Homepage.showPhotos(data);
//        });
        
//        var script = document.createElement('script');
//        script.src = Utility.buildUrl(apiURL, requestParameters);
//        document.head.appendChild(script);
//        document.head.removeChild(script);
    }
    
    function buildThumbnailUrl(photo) {
        return 'https://farm' + photo.farm + '.staticflickr.com/' + photo.server +
                '/' + photo.id + '_' + photo.secret + '_q.jpg';
    }

    function buildPhotoUrl(photo) {
        return 'https://farm' + photo.farm + '.staticflickr.com/' + photo.server +
                '/' + photo.id + '_' + photo.secret + '.jpg';
    }

    function buildPhotoLargeUrl(photo) {
        return 'https://farm' + photo.farm + '.staticflickr.com/' + photo.server +
                '/' + photo.id + '_' + photo.secret + '_b.jpg';
    }

    window.Flickr = window.Utility.extend(window.Flickr || {}, {
        buildThumbnailUrl: buildThumbnailUrl,
        buildPhotoUrl: buildPhotoUrl,
        buildPhotoLargeUrl: buildPhotoLargeUrl,
        searchText: searchText
    });
})();