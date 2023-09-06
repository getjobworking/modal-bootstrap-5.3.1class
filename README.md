# modal-bootstrap-5.3.1class
Simple InfoModal class for creating and managing informational modals.

Head Include:
	<link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css" rel="stylesheet">
	<link href="https://cdn.jsdelivr.net/npm/bootstrap-icons/font/bootstrap-icons.css" rel="stylesheet">
	<link href="css/classModal.css" rel="stylesheet">

Body include:
	<script src="https://code.jquery.com/jquery-3.7.0.min.js"></script>
	<script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/js/bootstrap.min.js"></script>
	<script src="js/classModal.js"></script>

 Use:
 		
		// Use with a time interval (e.g. 5000ms or 5 seconds):
		ModalInfo('myInfo1', {
			title: 'My info 1',
			info: 'This is the info message from myInfo1.',
			icon: 'bi bi-info-square', // Bootstrap icon can be specified here
			autoCloseInterval: 9000 // Add the time interval in milliseconds
		});

		// to close modal programmatically:
		// myInfo1.close();
