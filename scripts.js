// scripts.js

document.addEventListener('DOMContentLoaded', () => {
    const certDonorName = document.getElementById('certDonorName');
    const certDonationAmount = document.getElementById('certDonationAmount');
    const certDonationDate = document.getElementById('certDonationDate');
    const certDonorName2 = document.getElementById('certDonorName2');
    const certIssueDate = document.getElementById('certIssueDate');
    const certificate = document.getElementById('certificate');
    const printButton = document.getElementById('printButton');
    const downloadButton = document.getElementById('downloadButton');
    const certificateForm = document.getElementById('certificateForm');
    const resetButton = document.getElementById('resetButton');
    const sendEmailButton = document.getElementById('sendEmailButton');

    // Print button functionality
    printButton.addEventListener('click', () => {
        window.print();
    });

    // Download button functionality using html2canvas
    downloadButton.addEventListener('click', () => {
        html2canvas(certificate).then(canvas => {
            const link = document.createElement('a');
            link.download = 'certificate.png';
            link.href = canvas.toDataURL();
            link.click();
        });
    });

    // Function to set certificate values
    function setCertificateValues(donorName, donationAmount, donationDate, issueDate) {
        certDonorName.textContent = donorName;
        certDonationAmount.textContent = donationAmount;
        certDonationDate.textContent = donationDate;
        certIssueDate.textContent = issueDate;
        certDonorName2.textContent = donorName;
    }

    // Function to toggle certificate visibility
    function toggleCertificateVisibility(visible) {
        if (visible) {
            certificate.classList.remove('hidden');
            certificate.classList.add('show');
        } else {
            certificate.classList.remove('show');
            certificate.classList.add('hidden');
        }
    }

    // Handle form submission and display the certificate
    certificateForm.addEventListener('submit', function(event) {
        event.preventDefault(); // Prevent the default form submission

        // Get form values
        const donorName = document.getElementById('donorName').value;
        const donationAmount = document.getElementById('donationAmount').value;
        const donationDate = document.getElementById('donationDate').value;
        const issueDate = document.getElementById('issueDate').value;

        // Set certificate values
        setCertificateValues(donorName, donationAmount, donationDate, issueDate);

        // Show the certificate
        toggleCertificateVisibility(true);
    });

    // Reset the form and hide the certificate
    resetButton.addEventListener('click', function() {
        certificateForm.reset();
        toggleCertificateVisibility(false);
    });

    // Example of sending email using EmailJS
    sendEmailButton.addEventListener('click', function() {
        // Replace with your EmailJS service details
        emailjs.init('YOUR_USER_ID');

        const templateParams = {
            to_email: 'recipient@example.com',
            from_name: 'Your Name',
            message_html: 'Message content'
        };

        emailjs.send('YOUR_SERVICE_ID', 'YOUR_TEMPLATE_ID', templateParams)
            .then(function(response) {
                console.log('SUCCESS!', response.status, response.text);
            }, function(error) {
                console.error('FAILED...', error);
            });
    });
});
