/// <reference path="jquery-3.5.0.js" />

(function (jQuery) {
    jQuery.ErrorMsgOnSpanOrAlert = function (ctrl, msg) {
        var thisObj = $(ctrl);
        var ErrorSpanCtrl = $("[data-valmsg-for='" + thisObj.attr("name") + "']");
        if (!IsNullOrEmpty(msg)) { thisObj.addClass('input-validation-error');
            if (ErrorSpanCtrl.length > 0) $(ErrorSpanCtrl[0]).text(msg);
            else alert(msg);
        }
        else { thisObj.removeClass('input-validation-error'); $(ErrorSpanCtrl[0]).text(null);}
    }
}(jQuery));

(function (jQuery) {
    jQuery.fn.IsEmptyOrNull = function () {
        var obj = $(this);
        switch (obj.val()) {
            case "":
            case null:
            case typeof this == "undefined":
                return true;
            default:
                return false;
        }
    }
}(jQuery));

$('.NumberOnly').keydown(function (e) {
    // Allow: backspace, delete, tab, escape, enter
    if ($.inArray(e.keyCode, [46, 8, 9, 27, 13, 110]) !== -1 ||
        // Allow: Ctrl+A, Command+A
        (e.keyCode === 65 && (e.ctrlKey === true || e.metaKey === true)) ||
        // Allow: home, end, left, right, down, up
        (e.keyCode >= 35 && e.keyCode <= 40)) {
        // let it happen, don't do anything
        return;
    }
    // Ensure that it is a number and stop the keypress
    if ((e.shiftKey || (e.keyCode < 48 || e.keyCode > 57)) && (e.keyCode < 96 || e.keyCode > 105)) {
        e.preventDefault();
    }
    if ($(this).val() != null && $(this).val().length > 9) {
        e.preventDefault();
    }
});
$('.NumberOnly').focusout(function (e) {
    var thisObj = $(this);
    if (thisObj.val() == null || thisObj.val().trim() == '') { thisObj.val('0'); }
});

$('.NumberWithDot').keydown(function (e) {
    // Allow: backspace, delete, tab, escape, enter and .
    if ($.inArray(e.keyCode, [46, 8, 9, 27, 13, 110, 190]) !== -1 ||
        // Allow: Ctrl+A, Command+A
        (e.keyCode === 65 && (e.ctrlKey === true || e.metaKey === true)) ||
        // Allow: home, end, left, right, down, up
        (e.keyCode >= 35 && e.keyCode <= 40)) {
        // let it happen, don't do anything
        return;
    }
    // Ensure that it is a number and stop the keypress
    if ((e.shiftKey || (e.keyCode < 48 || e.keyCode > 57)) && (e.keyCode < 96 || e.keyCode > 105)) {
        e.preventDefault();
    }
});

$('.NumberWithDotWithBackSlesh').keydown(function (e) {
    // Allow: backspace, delete, tab, escape, enter and .
    if ($.inArray(e.keyCode, [46, 47, 8, 9, 27, 13, 110, 190]) !== -1 ||
        // Allow: Ctrl+A, Command+A
        (e.keyCode === 65 && (e.ctrlKey === true || e.metaKey === true)) ||
        // Allow: home, end, left, right, down, up
        (e.keyCode >= 35 && e.keyCode <= 40)) {
        // let it happen, don't do anything
        return;
    }
    // Ensure that it is a number and stop the keypress
    if ((e.shiftKey || (e.keyCode < 48 || e.keyCode > 57)) && (e.keyCode < 96 || e.keyCode > 105)) {
        e.preventDefault();
    }
});

$('.PanOrTan').focusout(function (event) {
    var thisObj = $(this);
    if (thisObj.val() == null || thisObj.val() == '') {
        ErrorMsgOnSpanOrAlert(thisObj, null);
        return;
    }
    var result = IsValidPanOrTan(thisObj.val());
    if (result) {
        ErrorMsgOnSpanOrAlert(thisObj, null);
    }
    else {
        ErrorMsgOnSpanOrAlert(thisObj, 'Invalid TAN/PAN No.');
        thisObj.focus();
    }
});

$('.PanNo').focusout(function (event) {
    var thisObj = $(this);
    if (thisObj.val() == null || thisObj.val() == '') {
        ErrorMsgOnSpanOrAlert(thisObj, null);
        return;
    }
    var result = IsValidPanOrTan(thisObj.val());
    if (result) {
        ErrorMsgOnSpanOrAlert(thisObj, null);
    }
    else {
        ErrorMsgOnSpanOrAlert(thisObj, 'Invalid PAN No.');
        thisObj.focus();
    }
});

$('.UpperCase').keyup(function (e) {
    this.value = this.value.toUpperCase();
});

$(document).on('keydown', '.ai-date-txt', function (e) {
    if ($.inArray(e.keyCode, [46, 8, 9, 27, 13, 110]) !== -1 || (e.keyCode === 65 && (e.ctrlKey === true || e.metaKey === true)) || (e.keyCode >= 35 && e.keyCode <= 40)) { return; }
    if ((e.shiftKey || (e.keyCode < 48 || e.keyCode > 57)) || (e.keyCode < 96 || e.keyCode > 105)) { e.preventDefault(); }
    if ($(this).val() != null && $(this).val().length > 9) { e.preventDefault(); }
})
$(document).on('keyup', '.ai-date-txt', function (e) {
    if ($(this).val() != null && $(this).val().length != 10) { $(this).val(null); }
})
$(document).on('keydown', '.NumberWithMinMax', function (e) {
    if ($.inArray(e.keyCode, [46, 8, 9, 27, 13, 110]) !== -1 || (e.keyCode === 65 && (e.ctrlKey === true || e.metaKey === true)) || (e.keyCode >= 35 && e.keyCode <= 40)) { return; }
    if ((e.shiftKey || (e.keyCode < 48 || e.keyCode > 57)) && (e.keyCode < 96 || e.keyCode > 105)) { e.preventDefault(); }
    if ($(this).val() != null && $(this).val().length > 9) { e.preventDefault(); }
    if (parseFloat($(this).prop('min')) > parseFloat($(this).val() + e.key) || parseFloat($(this).prop('max')) < parseFloat($(this).val() + e.key)) { e.preventDefault(); }
})

/* 
    Plugin for image preview. 
    Created by Anil.
*/
//Support function for image preview.
function IsValidImageType(extArray, ext) {
    for (var i = 0; i < extArray.length; i++) {
        if (extArray[i] == ext)
            return true;
    }
    return false;
}

// Support function for image preview.
function ImageTypeInString(extArray) {
    var str = "";
    for (var i = 0; i < extArray.length; i++) {
        str = str + ", " + extArray[i];
    }
    str = str.substring(1);
    return str;
}

(function ($) {
    $.ImagePreview = function (options) {

        var settings = $.extend({
            uploadControlName: '#Photo',
            imgControlName: '#imgPhoto',
            isValidateImageSize: true,
            imgSize: 30,   //kb
            isValidateImageResolution: true,
            imgWidth: 300,
            imgHeight: 90,
            imgTypes: ['gif', 'png', 'jpeg', 'jpg'],
            defaultNoImageUrl: '../../Images/no_image.jpg'
        }, options);

        var _uploadControlName = $(settings.uploadControlName)[0];
        var _imgControlName = $(settings.imgControlName);
        var _isValidateImageSize = settings.isValidateImageSize;
        var _imgSize = settings.imgSize;
        var _isValidateImageResolution = settings.isValidateImageResolution;
        var _imgWidth = settings.imgWidth;
        var _imgHeight = settings.imgHeight;
        var _imgTypes = settings.imgTypes;
        var _defaultNoImageUrl = settings.defaultNoImageUrl;

        $(settings.uploadControlName).change(function () {
            if (_uploadControlName.files && _uploadControlName.files[0]) {
                var ext = _uploadControlName.files[0].name.substring(_uploadControlName.files[0].name.lastIndexOf('.') + 1).toLowerCase();
                if (IsValidImageType(_imgTypes, ext)) {
                    if (_isValidateImageSize) {
                        if (_uploadControlName.files[0].size <= (_imgSize * 1024)) {
                            var reader = new FileReader();
                            reader.readAsDataURL(_uploadControlName.files[0]);
                            reader.onload = function (e) {
                                var i = new Image();
                                i.src = e.target.result;
                                i.onload = function () {
                                    if (_isValidateImageResolution) {
                                        if (this.width <= _imgWidth && this.height <= _imgHeight) {
                                            _imgControlName.attr('src', e.target.result);
                                        }
                                        else {
                                            alert("Image resolution should be appr. " + _imgWidth + " X " + _imgHeight + " , currently uploaded image resolution is " + this.width + " X " + this.height + " !");
                                            _imgControlName.attr('src', _defaultNoImageUrl);
                                            _uploadControlName.value = null;
                                        }
                                    }
                                    else {
                                        _imgControlName.attr('src', e.target.result);
                                    }
                                };
                            };
                        }
                        else {
                            alert("Image size should not be more then " + _imgSize + " kb ! ");
                            _imgControlName.attr('src', _defaultNoImageUrl);
                            _uploadControlName.value = null;
                        }
                    }
                    else {
                        var reader = new FileReader();
                        reader.readAsDataURL(_uploadControlName.files[0]);
                        reader.onload = function (e) {
                            var i = new Image();
                            i.src = e.target.result;
                            i.onload = function () {
                                if (_isValidateImageResolution) {
                                    if (this.width <= _imgWidth && this.height <= _imgHeight) {
                                        _imgControlName.attr('src', e.target.result);
                                    }
                                    else {
                                        alert("Image resolution should be appr. " + _imgWidth + " X " + _imgHeight + " , currently uploaded image resolution is " + this.width + " X " + this.height + " !");
                                        _imgControlName.attr('src', _defaultNoImageUrl);
                                        _uploadControlName.value = null;
                                    }
                                }
                                else {
                                    _imgControlName.attr('src', e.target.result);
                                }
                            };
                        };
                    }
                }
                else {
                    alert("File type should be " + ImageTypeInString(_imgTypes) + " !");
                    _imgControlName.attr('src', _defaultNoImageUrl);
                    _uploadControlName.value = null;
                }
            }
            else {
                _imgControlName.attr('src', _defaultNoImageUrl);
                _uploadControlName.value = null;
            }
        });
    };
}(jQuery));

// Plugin for image preview1.
(function ($) {
    $.ImagePreview1 = function (options) {
        var settings = $.extend({
            uploadControlName: '#Image',
            imgControlName: '#ImagePreview',
            imgSize: 30,   //kb
            imgMaxWidth: 100,
            imgMaxHeight: 100,
            imgMinWidth: 100,
            imgMinHeight: 100,
            imgTypes: ['gif', 'png', 'jpeg', 'jpg'],
            defaultNoImageUrl: '../../Images/no_image.jpg'
        }, options);

        var _uploadControlName = $(settings.uploadControlName)[0];
        var _imgControlName = $(settings.imgControlName);
        var _imgSize = settings.imgSize;
        var _imgMaxWidth = settings.imgMaxWidth;
        var _imgMaxHeight = settings.imgMaxHeight;
        var _imgMinWidth = settings.imgMinWidth;
        var _imgMinHeight = settings.imgMinHeight;
        var _imgTypes = settings.imgTypes;
        var _defaultNoImageUrl = settings.defaultNoImageUrl;

        $(settings.uploadControlName).change(function () {
            if (_uploadControlName.files && _uploadControlName.files[0]) {
                var ext = _uploadControlName.files[0].name.substring(_uploadControlName.files[0].name.lastIndexOf('.') + 1).toLowerCase();
                if (IsValidImageType(_imgTypes, ext)) {
                    if (_uploadControlName.files[0].size <= (_imgSize * 1024)) {
                        var reader = new FileReader();
                        reader.readAsDataURL(_uploadControlName.files[0]);
                        reader.onload = function (e) {
                            var i = new Image();
                            i.src = e.target.result;
                            i.onload = function () {
                                if ((_imgMinWidth <= this.width && this.width <= _imgMaxWidth) && (_imgMinHeight <= this.height && this.height <= _imgMaxHeight)) {
                                    _imgControlName.attr('src', e.target.result);
                                }
                                else {
                                    alert("Image resolution should be between " + _imgMinWidth + " X " + _imgMinHeight + " to " + _imgMaxWidth + " X " + _imgMaxHeight + " , currently uploaded image resolution is " + this.width + " X " + this.height + " !");
                                    _imgControlName.attr('src', _defaultNoImageUrl);
                                    _uploadControlName.value = null;
                                }
                            };
                        };
                    }
                    else {
                        alert("Image size should not be more then " + _imgSize + " kb ! ");
                        _imgControlName.attr('src', _defaultNoImageUrl);
                        _uploadControlName.value = null;
                    }
                }
                else {
                    alert("File type should be " + ImageTypeInString(_imgTypes) + " !");
                    _imgControlName.attr('src', _defaultNoImageUrl);
                    _uploadControlName.value = null;
                }
            }
            else {
                _imgControlName.attr('src', _defaultNoImageUrl);
                _uploadControlName.value = null;
            }
        });
    };
}(jQuery));

(function ($) {
    $.CheckFileUpload = function (options) {
        var settings = $.extend({
            uploadControlName: '#Image',
            imgTypes: ['gif', 'png', 'jpeg', 'jpg', 'pdf']
        }, options);

        var _uploadControlName = $(settings.uploadControlName)[0];
        var _imgTypes = settings.imgTypes;

        $(settings.uploadControlName).change(function () {
            if (_uploadControlName.files && _uploadControlName.files[0]) {
                var ext = _uploadControlName.files[0].name.substring(_uploadControlName.files[0].name.lastIndexOf('.') + 1).toLowerCase();
                if (!IsValidImageType(_imgTypes, ext)) {
                    alert("File type should be " + ImageTypeInString(_imgTypes) + " !");
                    _uploadControlName.value = null;
                }
            }
            else {
                _uploadControlName.value = null;
            }
        });
    };
}(jQuery));