'use strict';

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