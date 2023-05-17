<>
	<meta name='viewport' content='width=device-width, initial-scale=1' />
	<link rel='stylesheet' href='https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css' />
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
	<title>The Ohio State Universty James - Wait Time - Backend</title>
	<div className='topbar'>Topbar</div>
	<div className='sidebar'>
		<img src='https://innovativenerds.com/WaitTime/images/bg-02.jpg' width={230} height={105} /> <br />
		<br />
		<a href='admin.html'>
			<i className='fa fa-fw fa-home' /> Home
		</a>
		<a href='add_patient.html'>
			<i className='fa fa-fw fa-user' /> Add Patient
		</a>
		<a href='reports.html'>
			<i className='fa fa-fw fa-database' /> Reports
		</a>
		<a href='live.html'>
			<i className='fa fa-fw fa-tv' /> Live View
		</a>
		<a href='settings.html'>
			<i className='fa fa-fw fa-sliders' /> Settings
		</a>
	</div>
	<div className='container-main100'>
		<div className='main'>
			<center>
				{' '}
				<h1>Add Patient</h1>{' '}
			</center>
			<br />
			<br />
			<hr />
			<form>
				<div className='form-row'>
					<div className='form-group col-md-6'>
						<label htmlFor='inputFName'>First Name</label>
						<input type='text' className='form-control' id='firstName' placeholder='Enter First Name' />
					</div>
					<div className='form-group col-md-6'>
						<label htmlFor='inputLName'>Last Name</label>
						<input type='text' className='form-control' id='lastName' placeholder='Enter Last Name' />
					</div>
				</div>
				<div className='form-group'>
					<label htmlFor='inputAddress'>Address</label>
					<input type='text' className='form-control' id='inputAddress' placeholder='1234 Main St' />
				</div>
				<div className='form-group'>
					<label htmlFor='inputAddress2'>Address 2</label>
					<input type='text' className='form-control' id='inputAddress2' placeholder='Apartment, studio, or floor' />
				</div>
				<div className='form-row'>
					<div className='form-group col-md-6'>
						<label htmlFor='inputCity'>City</label>
						<input type='text' className='form-control' id='inputCity' />
					</div>
					<div className='form-group col-md-4'>
						<label htmlFor='inputState'>State</label>
						<select id='inputState' className='form-control'>
							<option selected=''>Choose...</option>
							<option value='AL'>Alabama</option>
							<option value='AK'>Alaska</option>
							<option value='AZ'>Arizona</option>
							<option value='AR'>Arkansas</option>
							<option value='CA'>California</option>
							<option value='CO'>Colorado</option>
							<option value='CT'>Connecticut</option>
							<option value='DE'>Delaware</option>
							<option value='DC'>District Of Columbia</option>
							<option value='FL'>Florida</option>
							<option value='GA'>Georgia</option>
							<option value='HI'>Hawaii</option>
							<option value='ID'>Idaho</option>
							<option value='IL'>Illinois</option>
							<option value='IN'>Indiana</option>
							<option value='IA'>Iowa</option>
							<option value='KS'>Kansas</option>
							<option value='KY'>Kentucky</option>
							<option value='LA'>Louisiana</option>
							<option value='ME'>Maine</option>
							<option value='MD'>Maryland</option>
							<option value='MA'>Massachusetts</option>
							<option value='MI'>Michigan</option>
							<option value='MN'>Minnesota</option>
							<option value='MS'>Mississippi</option>
							<option value='MO'>Missouri</option>
							<option value='MT'>Montana</option>
							<option value='NE'>Nebraska</option>
							<option value='NV'>Nevada</option>
							<option value='NH'>New Hampshire</option>
							<option value='NJ'>New Jersey</option>
							<option value='NM'>New Mexico</option>
							<option value='NY'>New York</option>
							<option value='NC'>North Carolina</option>
							<option value='ND'>North Dakota</option>
							<option value='OH'>Ohio</option>
							<option value='OK'>Oklahoma</option>
							<option value='OR'>Oregon</option>
							<option value='PA'>Pennsylvania</option>
							<option value='RI'>Rhode Island</option>
							<option value='SC'>South Carolina</option>
							<option value='SD'>South Dakota</option>
							<option value='TN'>Tennessee</option>
							<option value='TX'>Texas</option>
							<option value='UT'>Utah</option>
							<option value='VT'>Vermont</option>
							<option value='VA'>Virginia</option>
							<option value='WA'>Washington</option>
							<option value='WV'>West Virginia</option>
							<option value='WI'>Wisconsin</option>
							<option value='WY'>Wyoming</option>
						</select>
					</div>
					<div className='form-group col-md-2'>
						<label htmlFor='inputZip'>Zip</label>
						<input type='text' className='form-control' id='inputZip' />
					</div>
					<div className='form-group col-md-4'>
						<label htmlFor='inputMStaff'>Medical Staff</label>
						<select id='inputMStaff' className='form-control'>
							<option selected=''>Choose...</option>
							<option>Jhon Doe, MD</option>
							<option>Jessica Doe, NP</option>
							<option>Tom Doe, RN</option>
						</select>
					</div>
					<div className='form-group col-md-4'>
						<label htmlFor='inputTime'>Appointement Time:</label>
						<select id='inputTime' className='form-control'>
							<option selected=''>Choose...</option>
							<option>2PM</option>
							<option>2:30PM</option>
							<option>3PM</option>
							<option>3:30PM</option>
							<option>4PM</option>
							<option>4:30PM</option>
						</select>
					</div>
				</div>
				<br />
				<hr />
				<button type='submit' className='login100-form-btn'>
					Add Patient
				</button>
			</form>
		</div>
	</div>
</>;
