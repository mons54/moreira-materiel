'use strict';

var apiUrl = 'https://api.moreiramateriel.com';

var stylesheet = document.createElement('link');

stylesheet.href = 'https://fonts.googleapis.com/css?family=Roboto:300,400,500,700|Roboto+Slab:400,700|Material+Icons';
stylesheet.rel  = 'stylesheet';
document.getElementsByTagName('head')[0].appendChild(stylesheet);

$(document).ready(function() {
    $.fn.productBox = function() {

        this.each(function() {

            var productBox = $(this),
                className = 'selected';

            productBox.find('[data-product-thumbnail]').on('click', function () {

                productBox.addClass('clicked');
                
                var name = $(this).data('productThumbnail');

                productBox.find('[data-product-image]').removeClass(className);
                productBox.find('[data-product-thumb]').removeClass(className);
                productBox.find('[data-product-thumbnail]').removeClass(className);

                productBox.find('[data-product-image="' + name + '"]').addClass(className);
                productBox.find('[data-product-thumb="' + name + '"]').addClass(className);
                productBox.find('[data-product-thumbnail="' + name + '"]').addClass(className);
            });
        });
    };
 
    $('[data-product-box]').productBox();
});