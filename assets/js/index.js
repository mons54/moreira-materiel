'use strict';

$(document).ready(function() {


    $('[data-contact-form]').on('submit', function (e) {
        
        var email = $(this).find(''),
            reg = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        
        if (!reg.test(String(email).toLowerCase())) {
            e.preventDefault();
        }

        $.ajax({
            type: 'POST',
            url: $(this).attr('action'),
            data: $(this).serialize(),
            success: function(data) {
            },
            error: function() {
            }
        });

        e.preventDefault();
    });
    
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