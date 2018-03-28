'use strict';

var apiUrl = 'https://api.moreiramateriel.com';

$(document).ready(function() {

    $.fn.contact = function() {

        var element = $(this);

        this.checkName = function () {

            var input = element.find('[name="name"]'),
                isValid = String(input.val()).length > 2;

            if (!isValid) {
                if (!input.is(':focus')) {
                    input.closest('.form-group').addClass('has-danger');
                }
            } else {
                input.closest('.form-group').removeClass('has-danger');
            }

            return isValid;
        };

        this.checkEmail = function () {

            var reg = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                input = element.find('[name="email"]'),
                isValid = reg.test(String(input.val()).toLowerCase());

            if (!isValid) {
                input.closest('.form-group').addClass('has-danger');
            } else {
                input.closest('.form-group').removeClass('has-danger');
            }

            return isValid;
        };

        this.checkMessage = function () {

            var input = element.find('[name="message"]'),
                isValid = String(input.val()).length > 9;

            if (!isValid) {
                if (!input.is(':focus')) {
                    input.closest('.form-group').addClass('has-danger');
                }
            } else {
                input.closest('.form-group').removeClass('has-danger');
            }

            return isValid;
        };

        this.generateToken = function () {
            $.ajax({
                type: 'GET',
                dataType: 'json',
                url: apiUrl + '/mail/token',
                xhrFields: { withCredentials: true },
                success: function(data) {
                    element.find('[name="token"]').val(data);
                }
            });
        };

        element.one('change', this.generateToken);

        element.find('[name="name"]').on('blur', this.checkName);
        element.find('[name="email"]').on('blur', this.checkEmail);
        element.find('[name="message"]').on('blur', this.checkMessage);

        element.on('submit', function (e) {

            e.preventDefault();

            if (!this.checkName() || 
                !this.checkEmail() || 
                !this.checkMessage()) {
                return false;
            }

            element.find('[data-success]').addClass('d-none');
            element.find('[data-error]').addClass('d-none');
            element.find('[type="submit"]').prop('disabled', true);

            $.ajax({
                type: 'POST',
                dataType: 'json',
                url: apiUrl + '/mail/' + $(this).find('[name="token"]').val(),
                data: $(this).serialize(),
                xhrFields: { withCredentials: true },
                success: function(data) {
                    var alert = element.find('[data-success]');
                    alert.removeClass('d-none');
                    alert.find('[data-dismiss]').one('click', function (e) {
                        e.stopImmediatePropagation();
                        alert.addClass('d-none');
                    });
                    element[0].reset();
                    this.generateToken();
                }.bind(this),
                error: function() {
                    var alert = element.find('[data-error]');
                    alert.removeClass('d-none');
                    alert.find('[data-dismiss]').one('click', function (e) {
                        e.stopImmediatePropagation();
                        alert.addClass('d-none');
                    });
                },
                complete: function () {
                    element.find('[type="submit"]').prop('disabled', false);
                }
            });
        }.bind(this));
    };
    
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
    $('[data-contact-form]').contact();
});