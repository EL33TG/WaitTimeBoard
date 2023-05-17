<>
	<title>Login WaitTime - The James - The Ohio State Universty</title>
	<meta charSet='UTF-8' />
	<meta name='viewport' content='width=device-width, initial-scale=1' />
	<link rel='icon' type='image/png' href='images/icons/favosu.ico' />
	<link rel='stylesheet' type='text/css' href='vendor/bootstrap/css/bootstrap.min.css' />
	<link rel='stylesheet' type='text/css' href='fonts/font-awesome-4.7.0/css/font-awesome.min.css' />
	<link rel='stylesheet' type='text/css' href='fonts/Linearicons-Free-v1.0.0/icon-font.min.css' />
	<link rel='stylesheet' type='text/css' href='vendor/animate/animate.css' />
	<link rel='stylesheet' type='text/css' href='vendor/css-hamburgers/hamburgers.min.css' />
	<link rel='stylesheet' type='text/css' href='vendor/animsition/css/animsition.min.css' />
	<link rel='stylesheet' type='text/css' href='vendor/select2/select2.min.css' />
	<link rel='stylesheet' type='text/css' href='vendor/daterangepicker/daterangepicker.css' />
	<link rel='stylesheet' type='text/css' href='css/util.css' />
	<link rel='stylesheet' type='text/css' href='css/main.css' />
	<div className='limiter'>
		<div className='container-login100'>
			<div className='wrap-login100'>
				<div className='login100-form-title' style={{ backgroundImage: 'url(images/bg-02.jpg)' }}>
					<span className='login100-form-title-1'>Sign In</span>
				</div>
				<form className='login100-form validate-form'>
					<div className='wrap-input100 validate-input m-b-26' data-validate='Username is required'>
						<span className='label-input100'>Username</span>
						<input className='input100' type='text' name='username' placeholder='Enter username' />
						<span className='focus-input100' />
					</div>
					<div className='wrap-input100 validate-input m-b-18' data-validate='Password is required'>
						<span className='label-input100'>Password</span>
						<input className='input100' type='password' name='pass' placeholder='Enter password' />
						<span className='focus-input100' />
					</div>
					<div className='flex-sb-m w-full p-b-30'>
						<div className='contact100-form-checkbox'>
							<input className='input-checkbox100' id='ckb1' type='checkbox' name='remember-me' />
							<label className='label-checkbox100' htmlFor='ckb1'>
								Remember me
							</label>
						</div>
						<div>
							<a href='#' className='txt1'>
								SSO Sign-in
							</a>
						</div>
						<div>
							<a href='#' className='txt1'>
								Forgot Password?
							</a>
						</div>
					</div>
					<p></p>
					<div className='container-login100-form-btn'>
						<button className='login100-form-btn' onclick="location.href='admin.html';">
							Login
						</button>
					</div>
				</form>
			</div>
		</div>
	</div>
</>;
