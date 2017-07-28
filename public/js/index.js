lis = document.querySelectorAll("li");

lis.forEach(function(li){
	li.addEventListener("click",function(){
		li.classList.toggle("strikeThrough");
	});
});