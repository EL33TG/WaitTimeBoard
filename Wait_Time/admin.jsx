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
	<style
		dangerouslySetInnerHTML={{
			__html:
				'\n    .grid-container {\n      display: grid;\n      grid-template: 300px / auto auto auto;\n      grid-gap: 10px;\n      background-color: #ebeeef;\n      padding: 10px;\n    }\n    .grid-container2 {\n      display: grid;\n      grid-template: 140px / auto auto auto;\n      grid-gap: 10px;\n      background-color: #ebeeef;\n      padding: 10px;\n    }\n    .grid-container > div {\n      background-color: rgba(255, 255, 255, 0.8);\n      text-align: center;\n      padding: 20px 0;\n      font-size: 30px;\n    }\n      .grid-container2 > div {\n      background-color: #ffffffcc;\n      text-align: center;\n      padding: 20px 0;\n      font-size: 30px;\n    }\n    '
		}}
	/>
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
	<div className='container-fluid'>
		<div className='jumbotron'>
			<center>
				{' '}
				<h1>WaitTime DashBoard</h1>{' '}
			</center>
			<hr />
			<div className='container-main100'>
				<div className='main'>
					<div className='grid-container'>
						<div className='item1'>
							TOTAL PATIENTS
							<br />
							16
							<br />
							<br />
							<img src='images/block_o_trd.png' height={85} />{' '}
						</div>
						<div className='item2'>
							WAITING
							<br />3<br />
							<br />
							<i className='fa fa-fw fa-hourglass-end' style={{ fontSize: '1.25em' }} />
						</div>
						<div className='item3'>
							SERVICING
							<br /> 13
							<br />
							<br />
							<i className='fa fa-fw fa-stethoscope' style={{ fontSize: '1.25em' }} />{' '}
						</div>
						<div className='item4'>2 no shows</div>
						<div className='item5'>---</div>
						<div className='item6'>---</div>
					</div>
					<br />
					<br />
					<div className='grid-container2'>
						<div className='item1'>
							AVG. WAIT TIME
							<br />
							16min{' '}
						</div>
						<div className='item2'>
							DAILY AVG.
							<br /> 18min
						</div>
						<div className='item3'>
							WEEKLY AVG.
							<br /> 36min
						</div>
					</div>
					<div className='row'>
						<div
							className='col-lg-4'
							style={{
								backgroundColor: '#ffffffc7',
								fontSize: 30,
								gridGap: 10,
								padding: 10
							}}
						>
							AVG. WAIT TIME
							<br />
							16min
						</div>
						<div
							className='col-lg-4'
							style={{
								backgroundColor: '#ffffffc7',
								fontSize: 30,
								gridGap: 10,
								padding: 10
							}}
						>
							DAILY AVG.
							<br /> 18min
						</div>
						<div className='col-lg-4' style={{ backgroundColor: '#ffffffc7', fontSize: 30 }}>
							WEEKLY AVG.
							<br /> 36min
						</div>
					</div>
				</div>
			</div>
			<br />
			<hr />
			<br />
			<br />
			<p>Waitime dashboard data would need to be filled in boexes</p>
			<p>Not all grid boxes are needed and is only used as filler until we start to grab data</p>
			<p>
				Ideally, we would add things like How many customers waiting, how many doctors are busy vs how many are not.
				Wait Times etc.{' '}
			</p>
		</div>
	</div>
</>;
