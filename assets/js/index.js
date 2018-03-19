'use strict';

function checkFormContactName() {

    var input = $('[data-contact-form]').find('[name="name"]'),
        isValid = String(input.val()).length > 2;

    if (!isValid) {
        if (!input.is(':focus')) {
            input.closest('.form-group').addClass('has-danger');
        }
    } else {
        input.closest('.form-group').removeClass('has-danger');
    }

    return isValid;
}

function checkFormContactEmail() {

    var reg = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    var input = $('[data-contact-form]').find('[name="email"]'),
        isValid = reg.test(String(input.val()).toLowerCase());

    if (!isValid) {
        if (!input.is(':focus')) {
            input.closest('.form-group').addClass('has-danger');
        }
    } else {
        input.closest('.form-group').removeClass('has-danger');
    }

    return isValid;
}

function checkFormContactMessage() {

    var input = $('[data-contact-form]').find('[name="message"]'),
        isValid = String(input.val()).length > 9;

    if (!isValid) {
        if (!input.is(':focus')) {
            input.closest('.form-group').addClass('has-danger');
        }
    } else {
        input.closest('.form-group').removeClass('has-danger');
    }

    return isValid;
}

function getTimeFormContact() {
    $.get('./time.php', function (response) {
        $('[data-contact-form]').find('[name="time"]').val(response);
    });
}

$(document).ready(function() {

    getTimeFormContact();

    var formContact = $('[data-contact-form]');

    formContact.find('[name="name"]').on('blur', checkFormContactName);
    formContact.find('[name="email"]').on('blur', checkFormContactEmail);
    formContact.find('[name="message"]').on('blur', checkFormContactMessage);

    $('[data-contact-form]').on('submit', function (e) {

        e.preventDefault();

        if (!checkFormContactName() || 
            !checkFormContactEmail() || 
            !checkFormContactMessage()) {
            return false;
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