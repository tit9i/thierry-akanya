'use strict';


//Validation forms
function validateForm(selector) {
    Array.from(document.querySelectorAll(selector)).forEach(item => {
        item.addEventListener('input', (e) => {
            if(e.target.value === ''){
            item.dataset.touched = false;
            }
        });
        item.addEventListener('invalid', () => {
            item.dataset.touched = true;
        });
        item.addEventListener('blur', () => {
            if (item.value !== '') item.dataset.touched = true;
        });
    });
};

validateForm('.js-form .form-field');

var form = document.querySelector('.js-form');
var formName = '.js-form';

form.addEventListener('submit', function(e){
    submitForm(e, formName);
});


function submitForm(e, formName) {
    e.preventDefault();
    var name = $(formName + ' .js-field-name').val();
    var email = $(formName + ' .js-field-email').val();
    var objet = $(formName + ' .js-field-objet').val();
    var message = $(formName + ' .js-field-message').val();

    var formData = {
        nom: name,
        email: email,
        objet: objet,
        message: message
    };
    $("#loadSendMail").show();
    $.ajax({
        type: "POST",
        url: 'http://realafricalifeword.org/tprofile/mail.php',
        data: formData,
        dataType: 'application/json', 
        success: function (response) {
            $("#loadSendMail").hide();
            $("#msgBlack").show();
            $("#blockAlert").show();
            $('.js-form')[0].reset();
        },
        error: function () {
            $("#loadSendMail").hide();
            $("#msgBlack").show();
            $("#blockAlert").show();
            $('.js-form')[0].reset();
        }
    });
}