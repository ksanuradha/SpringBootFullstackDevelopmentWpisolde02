$( document ).ready(function() {
	
	// SUBMIT FORM
    $("#customerForm").submit(function(event) {
		// Prevent the form from submitting via the browser.
		event.preventDefault();
		ajaxPost();
	});
    $("#getAllCustomerId").click(function(event){
		event.preventDefault();
		ajaxGet();
	});
    
    function ajaxGet(){
    	$.ajax({
			type : "GET",
			url : window.location + "api/member/all",
			success: function(result){
				$.each(result, function(index, member){
					
					var customerRow = '<tr>' +
										'<td>' + index + '</td>' +
										'<td>' + member.id + '</td>' +
										'<td>' + member.name.toUpperCase() + '</td>' +
										'<td>' + member.age + '</td>' +
										'<td>' + member.address + '</td>' +
										'<td>' + member.joinDate + '</td>' +
								        '<td class="text-center">' +
								        	'<input type="hidden" value=' + member.id + '>' +
								        	'<a>' +
						          				'<span class="glyphicon glyphicon-remove"></span>' +
						        			'</a>' +
								        '</td>' +
									  '</tr>';
					
					$('#customerTable tbody').append(customerRow);
					
		        });
				
				$( "#customerTable tbody tr:odd" ).addClass("info");
				$( "#customerTable tbody tr:even" ).addClass("success");
			},
			error : function(e) {
				alert("ERROR: ", e);
				console.log("ERROR: ", e);
			}
		});	
    	
    }
    $(document).on("click","a",function() {
		
		var customerId = $(this).parent().find('input').val();
		//alert(customerId);003
		var workingObject = $(this);
		
		$.ajax({
			type : "DELETE",
			url : window.location + "api/member/delete/" + customerId,
			success: function(resultMsg){
				$("#resultMsgDiv").html("<p style='background-color:#67597E; color:white; padding:20px 20px 20px 20px'>" +
											"Member with Id=" + customerId + " is deleted successfully!"  +
										"</p>");
				
				workingObject.closest("tr").remove();
 
				// re-css for table
				$( "#customerTable tbody tr:odd" ).addClass("info");
				$( "#customerTable tbody tr:even" ).addClass("success");
			},
			error : function(e) {
				alert("ERROR: ", e);
				console.log("ERROR: ", e);
			}
		});
	});
    function ajaxPost(){	
    	// PREPARE FORM DATA
    	var today = new Date();
    	var formData = {
    			id : $("#Nic").val(),
    			name :  $("#Name").val(),
    			address : $("#Address").val(),
    			age :  $("#Age").val(),
    			joinDate : today
    	}
    	
    	// DO POST
    	$.ajax({
			type : "POST",
			contentType : "application/json",
			url : window.location + "api/member/save",
			data : JSON.stringify(formData),
			dataType : 'json',
			success : function(result) {
				if(result.status == "Done"){
					$("#postResultDiv").html("<p style='background-color:#7FA7B0; color:white; padding:20px 20px 20px 20px'>" + 
												"Post Successfully! <br>" +
												"---> Members's Info: Id = " + 
												result.data.id + " ,Name = " + result.data.name +"</p>");
				}else{
					$("#postResultDiv").html("<strong>Error</strong>");
				}
				console.log(result);
			},
			error : function(e) {
				alert("Error!")
				alert(today);
				console.log("ERROR: ", e);
			}
		});
    	
    	// Reset FormData after Posting
    	resetData();

    }
    function resetData(){
    	$("#Nic").val("");
    	$("#Name").val("");
    	$("#Address").val("");
    	$("#Age").val("");
    }
})