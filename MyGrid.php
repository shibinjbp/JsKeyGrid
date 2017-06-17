<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta http-equiv="X-UA-Compatible" content="IE=edge">
<meta name="viewport" content="width=device-width, initial-scale=1">
<meta name="description" content="">
<meta name="author" content="">
<!-- Bootstrap Core CSS -->
<link href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css" rel="stylesheet">
<!-- Menu CSS -->
<link href="https://cdn.datatables.net/1.10.15/css/jquery.dataTables.min.css" rel="stylesheet" type="text/css" />
<link href="https://cdnjs.cloudflare.com/ajax/libs/bootstrap-datepicker/1.6.4/css/bootstrap-datepicker.min.css" rel="stylesheet" type="text/css" />


<link href="./src/style.css" rel="stylesheet">
<link href="https://cdnjs.cloudflare.com/ajax/libs/select2/4.0.3/css/select2.min.css" rel="stylesheet">

<link href="./src/js/custom-select.css" rel="stylesheet" type="text/css" />
<script src="https://ajax.googleapis.com/ajax/libs/jquery/3.2.1/jquery.min.js"></script>
<script src="./src/js/custom-select.min.js" type="text/javascript"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/bootstrap-select/1.12.2/js/bootstrap-select.min.js" type="text/javascript"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/bootstrap-datepicker/1.6.4/js/bootstrap-datepicker.min.js"></script>
<script src="./src/JsKeyGrid.js" type="text/javascript"></script>

</head>
<body>
<div id="wrapper">
  <!-- Page Content -->
  <div id="page-wrapper">


<script type="text/javascript">

$(document).ready(function(){


       $('#tbl-entry').JsKeyGrid({
          addButton:'#btn-add-row',
          saveButton: '#btn-save',
          deleteButton: '.btn-delete-row',
          tableType: ["dropDown", "textBox", "textBox", "Box", "dateBox"],
          tableTdClass: ["drp", "txt", "txt", "txt", "dte"],
          dropdowns : [{id:"1",text:"chair"},{id:"2",text:"table"}],
          onsaveData: function(sData) {
            console.log(sData);
          }
       });


       $( "#btn-add-row" ).on( "click", function() {
         $('.select2').each(function (i, obj) {
            if (!$(obj).data("select2")) { $(obj).select2(); }
         });
       });





// manual functions

 $( "#btn-add-row" ).one( "click", function() {
      $(this).parent().parent().parent().next().find('tr').find('.dropDown').children('.select2').select2('open');
 });
 $('#tbl-entry').on("focusout",'.txt1', function(){
    var cur_val = $(this).val();
    var prev_val = $(this).parent().next().children('.xx').val();
    if(prev_val == "") { prev_val = 0; }
    if(cur_val == "") { cur_val = 0; }
    var total = parseFloat(cur_val) * parseFloat(prev_val);
    $(this).parent().next().next().children('.txt3').val(total);
 });
 $('#tbl-entry').on("focusout",'.txt2', function(){
    var cur_val = $(this).val();
    var prev_val = $(this).parent().prev().children('.xx').val();
    if(prev_val == "") { prev_val = 0; }
    if(cur_val == "") { cur_val = 0; }
    var total = parseFloat(cur_val) * parseFloat(prev_val);
    $(this).parent().next().children('.txt3').val(total);
 });

});



</script>
<style>
.select2 {width:100%;border:none;}
#tbl-entry tbody tr td input { width: 50%; float: left;}
</style>

<div class="container-fluid">
	<div class="row bg-title">
		<div class="col-lg-3 col-md-4 col-sm-4 col-xs-12">
		</div>
	</div>
	<div class="row">
		<div class="col-md-12">
			<div class="white-box">
					<div class="row" id="toplevel">
						<form class="form-horizontal">
							<div class="form-group">
								<label for="txtDate" class="col-sm-1 control-label" style="width:100px;"> </label>
								<div class="col-sm-2">
									<!-- <input class="form-control mydatepicker" id="txtDate" placeholder="Enter Date" value=""> -->
								 	</div>
								</div>
							</form>
						</div>

            <div class="jsContainer">
  						<table id="tbl-entry">
  							<thead>
  								<tr>
  								  <th width="20%">Item</th>
    								<th width="15%">Kg</th>
    								<th width="15%">Rs</th>
    								<th width="15%">Total</th>
    								<th width="30%">Date</th>
    								<th width="5%"><button class="btn btn-success btn-sm" id="btn-add-row"> + Add </button></th>
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
                  <input type="hidden" name="clndrDv" class="clndrDv" value="1"/>
									<input type="button" class="btn btn-info waves-effect waves-light m-t-10" id="btn-save" value="Save"/>
								</div>
							</div>
						</form>
					</div>
				</div>
			</div>
		</div>
	</div>


<!-- footer -->
<!-- /.container-fluid -->
  </div>
  <!-- /#page-wrapper -->
</div>
<!-- /#wrapper -->


<script>
$(document).ready(function(){
		// Animate loader off screen
		$(".se-pre-con").addClass('nojsload');
});
</script>
</body>
</html>
