# modal-bootstrap-5.3.1class
Simple InfoModal class for creating and managing informational modals.

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
