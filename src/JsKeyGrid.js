(function($, window, document, undefined) {
    var defaults = {
        keyboard: true,
        dblclick: true,
        button: true,
        addButton: "#btn-add-row",
        editButton: ".edit",
        deleteButton: ".btn-delete-row",
        saveButton: "#btn-save",
        maintainWidth: true,
        resetAfterAddition: true,
        dropdowns: {},
        tableType: {},
        tableTdClass: {},
        row_count: 2,
        theme: '',
        iconLibrary: 'font-awesome' 
    };

    $.fn.JsKeyGrid = function(options) {
        var that = this;
        this.element = $(this);
        this.options = $.extend({}, defaults, options);
        this._defaults = defaults;
        new grid(this.options, this.element, that);

    };




    function grid(options, element, that) {
        var curnt_this = this;

        $(options.addButton).on("click", function() {
            var index = element.find('tbody tr').length;
            var _actionAdd = curnt_this._actionAdd(index, options);
            element.find('tbody').append(_actionAdd);
            var _optionAdd = curnt_this._optionAdd(element, options, that);
        });


        $(options.saveButton).on("click", function() {
            curnt_this._saveAlldatas(element);
            options.onsaveData(curnt_this._saveAlldatas(element));
        });

        $(element).on("click", options.deleteButton, function() {
            var delete_elemnt = this;
            curnt_this._optionDelete(element, delete_elemnt);
        });


        $(element).on("change", '.select2', function() {
            $(this).parent().next().click();
            $(this).parent().next().children().focus();
        });


        $(options.addButton).on("click", function() {
            $('.select2').each(function(i, obj) {
                if (!$(obj).data("select2")) {
                    $(obj).select2();
                }
            });

            $(this).parent().parent().parent().next().find('tr:last').find('.dropDown').children('.select2:first').select2('open');
        });



    }

    grid.prototype = {
        _actionAdd: function(index, options) {
            tableTypes = options.tableType;
            options.row_count = tableTypes.length;
            var rowElemnt = '<tr index="' + index + '">';
            for (var iCount = 0; iCount < options.row_count; iCount++) {
                var xxx = 0;
                switch (options.tableType[iCount]) {
                    case 'textBox':
                        rowElemnt += '<td class="' + options.tableType[iCount] + [iCount] + ' ' + options.tableType[iCount] + '" sel_id=""><input type="text" class="xx ' + options.tableTdClass[iCount] + ' ' + options.tableTdClass[iCount] + [iCount] + '" style="border:none;"/></td>';
                        break;
                    case 'dropDown':
                        rowElemnt += '<td class="' + options.tableType[iCount] + [iCount] + ' ' + options.tableType[iCount] + '" sel_id="">' +
                            '<select class="select2 xx ' + options.tableTdClass[iCount] + ' ' + options.tableTdClass[iCount] + [iCount] + '">' +
                            '<option value="0">choose</option>';
                        var dropDetails = options.dropdowns;
                        for (i = 0; i < dropDetails.length; i++) {
                            rowElemnt += '<option value="' + dropDetails[i]['id'] + '">' + dropDetails[i]['text'] + '</option>';
                        }
                        rowElemnt += '</select>' +
                            '</td>';
                        break;
                    case 'dateBox':
                        rowElemnt += '<td class="' + options.tableType[iCount] + [iCount] + ' ' + options.tableType[iCount] + '" sel_id=""><input type="text" name="mydate' + [iCount] + index + '" bindstat="0" class="mydate xx ' + options.tableTdClass[iCount] + ' ' + options.tableTdClass[iCount] + [iCount] + '" style="border:none;" placeholder="M/d/Y" /></td>'
                        break;
                    case 'Box':
                        rowElemnt += '<td class="' + options.tableType[iCount] + [iCount] + ' ' + options.tableType[iCount] + '" sel_id=""><input type="text" class="' + options.tableTdClass[iCount] + ' ' + options.tableTdClass[iCount] + [iCount] + '" style="border:none;"/></td>'
                        break;
                }
                xxx++;
            }
            rowElemnt += '<td class="i-delete" sel_id=""><button class="btn btn-outline btn-default btn-xs btn-delete-row Dlt tooltip"><i aria-hidden="true" class="fa fa-times"></i><span class="tooltiptext">Delete</span></button></td>' +
                '</tr>';
            return (rowElemnt);



        },

        _optionAdd: function(element, options, that) {
            var datX = 0;
            var $tbody, max_x, max_y, y;
            $tbody = element.find('tbody');
            $tbody.find('.xx').off('keydown click');
            max_x = $tbody.find('tr:first-child').find('.xx').not(':hidden').length - 1;
            max_y = $tbody.find('tr').length - 1;
            y = 0;


            $tbody.find('tr').each(function() {
                var x;
                x = 0;
                $(this).find('.xx').not(':hidden').each(function() {
                    $(this).on('click', function() {
                        return $(this).select();
                    });
                    $(this).attr('data-x', x).attr('data-y', y);
                    $(this).on('keydown', function(e) {
                        var new_x, new_y, old_x, old_y;
                        old_x = parseInt($(this).attr('data-x'), 10);
                        old_y = parseInt($(this).attr('data-y'), 10);
                        new_x = old_x;
                        new_y = old_y;

                        switch (e.which) {
                            case 37: //left
                                if (datX == 0) {

                                    if ($(this).parent().prev().is('.dropDown')) {
                                        $(this).parent().prev().find('.select2').select2('open');
                                    }

                                    if ($(this).parent().is('.dateBox')) {
                                        var fid = $(this).attr('name');
                                        if ($('input[name="' + fid + '"]').attr('bindstat') == 0) {
                                            $('input[name="' + fid + '"]').datepicker({
                                                autoclose: true,
                                                todayHighlight: true
                                            });
                                            $('input[name="' + fid + '"]').datepicker("show");
                                        } else {
                                            $('input[name="' + fid + '"]').datepicker("remove");
                                            $('input[name="' + fid + '"]').attr('bindstat', 0);
                                            $('input[name="' + fid + '"]').datepicker({
                                                autoclose: true,
                                                todayHighlight: true
                                            });
                                            $('input[name="' + fid + '"]').datepicker("show");
                                        }
                                        //  if($('.datepicker').css('display') != 'block') {
                                        if ($('input[name="' + fid + '"]').datepicker().css('display') != 'block') {
                                            new_x = old_x - 1;
                                            datX = 0;

                                        } else {
                                            datX = 1;
                                        }
                                    } else {
                                        new_x = old_x - 1;
                                        datX = 0;
                                    }
                                } else if (datX == 2) {
                                    new_x = old_x - 1;
                                    datX = 0;
                                } else { }
                                break;
                            case 38: //up
                                if (datX == 0) {
                                    var fid = $(this).attr('name');
                                    if ($(this).parent().is('.dateBox')) {
                                        var fid = $(this).attr('name');
                                        if ($('input[name="' + fid + '"]').attr('bindstat') == 0) {
                                            $('input[name="' + fid + '"]').datepicker({
                                                autoclose: true,
                                                todayHighlight: true
                                            });
                                            $('input[name="' + fid + '"]').datepicker("show");
                                        } else {
                                            $('input[name="' + fid + '"]').datepicker("remove");
                                            $('input[name="' + fid + '"]').attr('bindstat', 0);
                                            $('input[name="' + fid + '"]').datepicker({
                                                autoclose: true,
                                                todayHighlight: true
                                            });
                                            $('input[name="' + fid + '"]').datepicker("show");
                                        }
                                        //  if($('.datepicker').css('display') != 'block') {
                                        if ($('input[name="' + fid + '"]').datepicker().css('display') != 'block') {
                                            new_y = old_y - 1;
                                            datX = 0;
                                        } else {
                                            datX = 1;
                                        }
                                    } else {
                                        new_y = old_y - 1;
                                        datX = 0;
                                    }
                                } else if (datX == 2) {
                                    new_y = old_y - 1;
                                    datX = 0;
                                } else { }
                                break;
                            case 39: //right
                                if (datX == 0) {
                                    if ($(this).parent().is('.dateBox')) {
                                        var fid = $(this).attr('name');
                                        if ($('input[name="' + fid + '"]').attr('bindstat') == 0) {
                                            $('input[name="' + fid + '"]').datepicker({
                                                autoclose: true,
                                                todayHighlight: true
                                            });
                                            $('input[name="' + fid + '"]').datepicker("show");
                                        } else {
                                            $('input[name="' + fid + '"]').datepicker("remove");
                                            $('input[name="' + fid + '"]').attr('bindstat', 0);
                                            $('input[name="' + fid + '"]').datepicker({
                                                autoclose: true,
                                                todayHighlight: true
                                            });
                                            $('input[name="' + fid + '"]').datepicker("show");
                                        }
                                        if ($('.datepicker').css('display') != 'block') {
                                            new_x = old_x + 1;
                                            datX = 0;
                                        } else {
                                            datX = 1;
                                        }
                                    } else {
                                        new_x = old_x + 1;
                                        datX = 0;
                                    }
                                } else if (datX == 2) {
                                    new_x = old_x + 1;
                                    datX = 0;
                                } else {}
                                if ($(this).parent().next().is('.dropDown')) {
                                    $(this).parent().next().find('.select2').select2('open');
                                }
                                break;
                            case 40: //down
                                if (datX == 0) {
                                    if ($(this).parent().is('.dateBox')) {
                                        var fid = $(this).attr('name');
                                        $('input[name="' + fid + '"]').datepicker("remove");
                                        if ($('input[name="' + fid + '"]').attr('bindstat') == 0) {
                                            $('input[name="' + fid + '"]').datepicker({
                                                autoclose: true,
                                                todayHighlight: true
                                            });
                                            $('input[name="' + fid + '"]').datepicker("show");
                                        } else {
                                            $('input[name="' + fid + '"]').datepicker("remove");
                                            $('input[name="' + fid + '"]').attr('bindstat', 0);
                                            $('input[name="' + fid + '"]').datepicker({
                                                autoclose: true,
                                                todayHighlight: true
                                            });
                                            $('input[name="' + fid + '"]').datepicker("show");
                                        }
                                        if ($('input[name="' + fid + '"]').datepicker().css('display') != 'block') {
                                            new_y = old_y + 1;
                                            datX = 0;
                                        } else {
                                            datX = 1;
                                        }
                                    } else {
                                        new_y = old_y + 1;
                                        datX = 0;
                                    }
                                } else if (datX == 2) {
                                    new_y = old_y + 1;
                                    datX = 0;
                                } else {
                                  // var fid = $(this).attr('name');
                                }
                                break;
                            case 13:

                                if ($(this).parent().is(':nth-last-child(2)')) {
                                    if ($(this).parent().is('.dateBox')) {
                                        var fid = $(this).attr('name');
                                        if ($('.datepicker').css('display') == 'block') {
                                            $('input[name="' + fid + '"]').attr('bindstat', 1);
                                        } else {
                                            $('input[name="' + fid + '"]').attr('bindstat', 1);
                                            //  check 2nd last div
                                            if ($(this).parent().is(':nth-last-child(2)')) {
                                                if ($(this).parent().parent().next('tr').length) {
                                                    $(this).closest('tr').next('tr').find('.dropDown').children('.select2').select2('open');
                                                } else {
                                                    $(options.addButton).trigger('click');
                                                    $(this).closest('tr').next('tr').find('.dropDown').children('.select2').select2('open');
                                                }
                                            }

                                        }
                                        datX = 2;
                                    } else {
                                        if ($(this).parent().parent().next('tr').length) {
                                            $(this).closest('tr').next('tr').find('.dropDown').children('.select2').select2('open');
                                        } else {
                                            $(options.addButton).trigger('click');
                                            $(this).closest('tr').next('tr').find('.dropDown').children('.select2').select2('open');
                                        }
                                    }
                                } else if ($(this).parent().is('.dateBox')) {
                                    var fid = $(this).attr('name');
                                    if ($('.datepicker').css('display') == 'block') {
                                        $('input[name="' + fid + '"]').attr('bindstat', 1);
                                    } else {
                                        $('input[name="' + fid + '"]').attr('bindstat', 1);
                                        //  check 2nd last div
                                        if ($(this).parent().is(':nth-last-child(2)')) {
                                            if ($(this).parent().parent().next('tr').length) {
                                                $(this).closest('tr').next('tr').find('.dropDown').children('.select2').select2('open');
                                            } else {
                                                $(options.addButton).trigger('click');
                                                $(this).closest('tr').next('tr').find('.dropDown').children('.select2').select2('open');
                                            }
                                        }

                                    }
                                    datX = 2;
                                } else {
                                    // var fid = $(this).attr('name');
                                    // $('input[name="'+fid+'"]').attr('bindstat',1);
                                    // datX = 2;
                                }


                                break;
                            default:
                                return;
                        }
                        e.preventDefault();
                        new_x = new_x < 0 ? max_x : new_x;
                        new_x = new_x > max_x ? 0 : new_x;
                        new_y = new_y < 0 ? max_y : new_y;
                        new_y = new_y > max_y ? 0 : new_y;


                        return $tbody.find('.xx[data-x=' + new_x + '][data-y=' + new_y + ']').click();

                    });
                    return x++;
                });
                return y++;
            });
            //  return $(this);
            return element;
        },




        _saveAlldatas: function(element) {
            var $that = element;
            var data_array = [];
            var data_main = [];

            var thdArray = [];
            $(element).find('thead tr th').each(function() {
                thdArray.push($(this).text());
            })


            var trArray = [];
            $that.find("tbody tr").each(function() {
                var tdArray = [];
                var x = -1;
                $(this).find('td input:text,td select').each(function() {
                    tdArray.push({
                        name: thdArray[x],
                        value: this.value
                    });
                    x++;
                })
                tdArray.shift();
                trArray.push(tdArray);
            });

            data = JSON.stringify(trArray);
            // console.log(data);
            return data;
        },



        _optionDelete: function(element, delete_elemnt) {
            var indexId = $(delete_elemnt).parent().parent().attr('index');
            $(delete_elemnt).parent().parent().remove('tr');
        }



    };



})(jQuery, window, document);
