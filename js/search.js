$(function(){
	
		$(".search-nav-text li").click(function(){
			var arrow=''
			var val = $(this).attr("val");
			if(val=='jc'){
				arrow='dr'
			}else{
				arrow='jc'
			}
			console.log(arrow)
			console.log(val)
			$("#arrow_point").removeClass("arrow-"+arrow);
			$("#arrow_point").addClass("arrow-"+val);
		})
	
})