
(function () {
    "use strict";

    var classes = 'list-group-item';
    var countryItem;

    function searchHandler(areaName) {

//            var areaNameQueryParam = 'geo_area_name';
//            var url = 'getItem?' + areaNameQueryParam + '=' + areaName;

        var url = 'getItem';
        
        var requestParameters = {
            geo_area_name: areaName
        };

        $.getJSON(url, requestParameters)
                .success(function (json) {
                    console.log("Client found:" + json.AreaName);
                    countryItem = json;
                    populateCountryInfoList(json);
                    searchPhotos(json.ImageQueryTxt);
                })
//                    .done(function (json) {
//                        var foundItem = json;
//                        console.log("Client found:" + foundItem);
//                    })
                .fail(function (jqxhr, textStatus, error) {
                    var err = textStatus + ", " + error;
                    console.log("Request Failed: " + err);
                    countryItem = null;
                });
//                    .always(function () {
//                        console.log("complete");
//                    });

    }

    function searchPhotos(searchText, page) {
        if (searchText.length === 0) {
            alert('Error: the field is required');
        }

        page = page > 0 ? page : 1;
        window.Flickr.searchText(searchText, page);
    }

    function showPhotos(data) {
        window.Gallery.ProcessPhotos(data.photos.photo);
    }

    function populateCountryInfoList(areaInfo) {
        var $container = $('#area-info-ul');
        if ($container.length === 0)
            return;

        $container.empty();

        var $listItem;
        for (var i = 0; i < areaInfo.InfoTxt.length; i++) {

            $listItem = $('<li/>', {
                "class": classes
            });
            $listItem.text(areaInfo.InfoTxt[i]);
            $container.append($listItem);
        }
    }

    function main() {

        $('#imgControlsDiv').hide();


        $('#area-query-button').on('click', function (event) {
            event.preventDefault();

            if ($('#area-query-input').length > 0)
                searchHandler($('#area-query-input').val());
        });

        // search box event handling
        $("query-area-form").on('submit', function (event) {
            event.preventDefault();

            if ($('#area-query-input').length > 0)
                searchHandler($('#area-query-input').val());
//            return false;
        });
        
        $('button.country').click(function (event) {
            var countryName = this.value;
            searchHandler(countryName);
            return false;
        });

//        $("#area-query-input").keypress(function (event) {
//            if (event.which == 13) {
//                event.preventDefault();
//                
//                searchHandler();
//            }
//        });
    }

    window.Website = window.Utility.extend(window.Website || {}, {
        Country: {
            showPhotos: showPhotos,
            main: main
        }
    });

})();