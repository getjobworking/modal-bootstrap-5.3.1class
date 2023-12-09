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
ver. 1.1

Updated to display HTML instead of just text in the "info" parameter.

		ModalInfo('myInfo1', {
			title: 'My info 1',
			info: '<p>This is the info message from myInfo1.</p>',
			icon: 'bi bi-info-square', // Bootstrap icon can be specified here
			autoCloseInterval: 9000 // Add the time interval in milliseconds
		});

Version 1.1.1 Update

Added support for creating custom buttons:

  		ModalInfo('myInfo1', {
    			title: 'My info 1',
    			info: '<p>This is the info message from myInfo1.</p>',
    			icon: 'bi bi-info-square', // Bootstrap icon can be specified here
    			autoCloseInterval: 9000, // Add the time interval in milliseconds
    			buttons: [
        			{
            				label: 'OK',
            				className: 'btn-success',
            				callback: () => {
                				console.log('OK button clicked');
                				// Add custom logic for the OK button here
                				window.myInfo1.close();
            				},
        			},
        			// Add other buttons as needed
    			],
		});

If no buttons are provided, a default "Cancel" button will be created:

Version History


    1.1: Updated to display HTML content in the "info" parameter.
    1.1.1: Added support for creating custom buttons.
    1.1.2: Bug fixes.
    1.1.3: Bug fixes.
    1.1.4: Default Cancel button name.

Note: Make sure to include the Bootstrap 5.3.1 library before using this modal class.

Feel free to customize the options according to your needs.
