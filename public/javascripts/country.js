// Use jQuery post() and getJSON() methods to communicate with 
// the routes defined via server03.

(function () {
    "use strict";


    function main() {
        $('#insert').on('click', function () {
            var desc = $('#desc').val(),
                    sku = $('#sku').val(),
                    quantity = $('#quant').val(),
                    price = $('#price').val(),
                    newItem = {"description": desc,
                        "sku": sku,
                        "quantity": quantity,
                        "price": price
                    };
            $.post("putItem", newItem, function (result) {
                console.log(result);
            });
        });

        $('#retrieve').on('click', function () {
            var sku = $('#sku').val(),
                    url = 'getItem?sku=' + sku;
            $.getJSON(url, function (result) {
                var foundItem = result[0];
                $('#desc').val(foundItem.description);
                $('#sku').val(foundItem.sku);
                $('#quant').val(foundItem.quantity);
                $('#price').val(foundItem.price);
            });
        });
    }

    window.Website = window.Utility.extend(window.Website || {}, {
        Country: {
            main: main
        }
    });

}());