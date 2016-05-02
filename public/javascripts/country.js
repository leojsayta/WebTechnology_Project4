
(function () {
    "use strict";

    var classes = 'list-group-item';
    var countryItem = {};

    function insertHandler() {

        if ($('#inputAreaName').val().length > 0) {
            var countryName = $('#inputAreaName').val();
            var countryFlckrSrchTxt = $('#inputFlickrQryTxt').val();
            var countryInfo = $('#inputCountryInfo').val();

            var newCountry = {
                AreaName: countryName,
                ImageQueryTxt: countryFlckrSrchTxt,
                InfoTxt: countryInfo
            };

            $.post("putItem", newCountry, function (result) {
                console.log(result);

                $('#inputAreaName').val("");
                $('#inputFlickrQryTxt').val('');
                $('#inputCountryInfo').val('');

                searchHandler(newCountry.AreaName);
            }).fail(function () {
                console.log("DB item insertion failed.\n");
            });
        }
        else {
            
        }
    }

    function searchHandler(areaName) {

//        var areaNameQueryParam = 'geo_area_name';
//        var url = 'getItem?' + areaNameQueryParam + '=' + areaName;
//        countryItem = {};

        var url = 'getItem';

        var requestParameters = {
            geo_area_name: areaName
        };

        $.getJSON(url, requestParameters)
                .success(function (json) {
                    console.log("Client found:" + json.AreaName);
//                    countryItem = json;
                    populateCountryInfoList(json);
                    searchPhotos(json.ImageQueryTxt);
                    updateAfterSearch(json.AreaName);
                })
//                    .done(function (json) {
//                        var foundItem = json;
//                        console.log("Client found:" + foundItem);
//                    })
                .fail(function (jqxhr, textStatus, error) {
                    var err = textStatus + ", " + error;
                    console.log("Request Failed: " + err);
//                    countryItem = null;
                });
//                    .always(function () {
//                        console.log("complete");
//                    });
    }

    function updateAfterSearch(countryName) {
        $('#h3CountryInfo').text(countryName + " Information");
        $('div.page-header h3').text(countryName);
        $('#jumbotronAreaImage').show();
        $('#jumboTronCountryInfo').show();
        $('#inputAreaQuery').val(countryName);
    }

    function searchPhotos(searchText, page) {
        if (searchText.length === 0) {
            alert('Error: the field is required');
        }

        page = page > 0 ? page : 1;
        window.Flickr.searchText(searchText, page);
    }

    function showPhotos(data) {
        window.Gallery.ProcessPhotos(
                data.photos.photo,
                $('#imgControlsDiv').first(),
                $('a.next').first(),
                $('a.previous').first(),
                $('#imgCountry').first());
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

        // search box event handling
        $("query-area-form").on('submit', function (event) {
            event.preventDefault();

            if ($('#inputAreaQuery').length > 0) {
                var country = $('#inputAreaQuery').val();
                searchHandler(country);
                $('#jumbotronNewCountryForm').hide();
            }
        });

        $('#buttonToggleNewCountryForm').on('click', function (event) {
            $('#jumbotronNewCountryForm').toggle();
            
            return false;
        });

        $("#formInsertNewCountry").on('submit', function (event) {
            event.preventDefault();
            insertHandler();
        });

        $('#buttonInsertNewCountry').on('click', function (event) {
            insertHandler();
            return false;
        });

        /*
         $('#area-query-button').on('click', function (event) {
         event.preventDefault();
         
         if ($('#inputAreaQuery').length > 0)
         searchHandler($('#inputAreaQuery').val());
         });
         
         $('button.country').click(function (event) {
         var countryName = this.value;
         searchHandler(countryName);
         return false;
         });
         
         $("#inputAreaQuery").keypress(function (event) {
         if (event.which == 13) {
         event.preventDefault();
         
         searchHandler();
         }
         }); */

    }

    var app = angular.module('ngCountryApp', []);
    app.controller('ngCountryCntr', ['$scope', '$http', function ($scope, $http) {
            $scope.countryHeader = 'Country';
            $scope.countryInfoList = [];
            $scope.getCountryInfo = function (country) {

                if (!country)
                    return "";
                
                var areaNameQueryParam = 'geo_area_name';
                var url = 'getItem?' + areaNameQueryParam + '=' + country;

                $http.get(url).then(
                        function successCallback(response) {
                            console.log(response.data.InfoTxt);
//                            $scope.countryHeader = response.data.AreaName;
                            $scope.countryName = response.data.AreaName;
                            $scope.countryInfoList = response.data.InfoTxt;
                            searchPhotos(response.data.ImageQueryTxt);
                            updateAfterSearch($scope.countryName);
                            $('#jumbotronNewCountryForm').hide();
                        },
                        function errorCallback(response) {
                            console.log(response);
                        });

            };
        }]);

    window.Website = window.Utility.extend(window.Website || {}, {
        Country: {
            showPhotos: showPhotos,
            main: main
        }
    });

})();