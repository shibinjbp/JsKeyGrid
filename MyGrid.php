<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <meta name="description" content="">
    <meta name="author" content="">
    <link href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css" rel="stylesheet">
    <link href="https://cdnjs.cloudflare.com/ajax/libs/bootstrap-datepicker/1.4.1/css/bootstrap-datepicker.min.css" rel="stylesheet" type="text/css" />
    <link href="./src/style.css" rel="stylesheet">
    <link href="https://cdnjs.cloudflare.com/ajax/libs/select2/4.0.3/css/select2.min.css" rel="stylesheet">
    <link href="./src/js/custom-select.css" rel="stylesheet" type="text/css" />

    <script src="./src/js/jquery.min.js"></script>
    <script src="./src/js/custom-select.min.js" type="text/javascript"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/bootstrap-select/1.12.2/js/bootstrap-select.min.js" type="text/javascript"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/bootstrap-datepicker/1.4.1/js/bootstrap-datepicker.min.js"></script>
    <script src="./src/JsKeyGrid.js" type="text/javascript"></script>

</head>

<body>


    <script type="text/javascript">
        $(document).ready(function() {

            $('#tbl-entry').JsKeyGrid({
                addButton: '#btn-add-row',
                saveButton: '#btn-save',
                deleteButton: '.btn-delete-row',
                tableType: ["dropDown", "textBox", "textBox", "Box", "dateBox"],
                tableTdClass: ["drp", "txt", "txt", "txt", "dte"],
                dropdowns: [{
                    id: "1",
                    text: "item 1"
                }, {
                    id: "2",
                    text: "item 2"
                }, {
                    id: "3",
                    text: "item 3"
                }, {
                    id: "4",
                    text: "item 4"
                }, {
                    id: "5",
                    text: "item 5"
                }],
                onsaveData: function(sData) {
                    console.log(sData);
                }
            });


            //  $( "#btn-add-row" ).on( "click", function() {
            //    $('.select2').each(function (i, obj) {
            //       if (!$(obj).data("select2")) { $(obj).select2(); }
            //    });
            //  });




            // manual functions

            // $( "#btn-add-row" ).one( "click", function() {
            //      $(this).parent().parent().parent().next().find('tr').find('.dropDown').children('.select2').select2('open');
            // });
            $('#tbl-entry').on("focusout", '.txt1', function() {
                var cur_val = $(this).val();
                var prev_val = $(this).parent().next().children('.xx').val();
                if (prev_val == "") {
                    prev_val = 0;
                }
                if (cur_val == "") {
                    cur_val = 0;
                }
                var total = parseFloat(cur_val) * parseFloat(prev_val);
                $(this).parent().next().next().children('.txt3').val(total);
            });
            $('#tbl-entry').on("focusout", '.txt2', function() {
                var cur_val = $(this).val();
                var prev_val = $(this).parent().prev().children('.xx').val();
                if (prev_val == "") {
                    prev_val = 0;
                }
                if (cur_val == "") {
                    cur_val = 0;
                }
                var total = parseFloat(cur_val) * parseFloat(prev_val);
                $(this).parent().next().children('.txt3').val(total);
            });

        });
    </script>

    <!--  -->
    <div class="jsContainerOuter">

        <div class="jsContainer">
            <table id="tbl-entry">
                <thead>
                    <tr>
                        <th width="20%">Item</th>
                        <th width="15%">Kg</th>
                        <th width="15%">Rs</th>
                        <th width="15%">Total</th>
                        <th width="30%">Date</th>
                        <th width="5%">
                            <button class="btn btn-success btn-sm" id="btn-add-row"> + Add </button>
                        </th>
                    </tr>
                </thead>
                <tbody>
                </tbody>
            </table>
        </div>
        <div class="row">
            <form class="form-horizontal">
                <div class="form-group" style="padding-top: 20px;">
                    <div class="form-group m-b-0">
                        <div class="col-sm-3">
                            <input type="hidden" name="clndrDv" class="clndrDv" value="1" />
                            <input type="button" class="btn btn-info waves-effect waves-light m-t-10" id="btn-save" value="Save" />
                        </div>
                    </div>
            </form>
            </div>
        </div>
    </div>
    <!--  -->

</body>

</html>
