$(function(){
	function validateEmail(mail){
		var re = /\S+@\S+\.\S+/;
		return re.test(mail);
	}
	function succesAlert(){
		Swal.fire({
			title:'Thanks!',
			html:"<p style='font-size: 15px;font-weight: 300;color:$light--dark-color;'>Subscribing is completed succesfully.</p>",
			confirmButtonText:'Not At All',
			buttonsStyling:false,
			customClass: {
				title: 'alert-title',
				confirmButton:'alert-confirm-btn',
			},
			imageUrl:'assets/images/gif/alert-gif-2.gif',
			imageAlt:'Gif',
			imageWidth:'100px',
			imageHeight:'auto'

		});
	}
	$('#mail-form').submit((event) => {
		event.preventDefault();
		let email = $('#subscribe').val();
		let errorText = $('#error-text');

		if(!validateEmail(email)){
			errorText.text('*Geçersiz E-mail adresi!')
		}else{
			errorText.text('');
			succesAlert();
		}
	})
})