document.addEventListener('DOMContentLoaded', function () {
    const urlInput = document.getElementById('url-input');
    const generateBtn = document.getElementById('generate-btn');
    const qrCodeContainer = document.getElementById('qr-code');
    const printBtn = document.getElementById('print-btn');

    let qrCode;
    let printBtnClickListener;

    generateBtn.addEventListener('click', function () {
        const url = urlInput.value.trim();
        if (!url) {
            alert('Please enter a URL');
            return;
        }

        // Clear previous QR code
        qrCodeContainer.innerHTML = '';

        // Generate new QR code
        qrCode = new QRCode(qrCodeContainer, {
            text: url,
            width:256,
            height:256,
        });

        // Show the print button
        printBtn.classList.remove('hidden');

        // Remove previous print button click listener
        if (printBtnClickListener) {
            printBtn.removeEventListener('click', printBtnClickListener);
        }

        // Add a new print button click listener
        printBtnClickListener = function () {
            const printWindow = window.open('', '_blank');
            printWindow.document.write('<html><head><title>Print QR Code</title>');
            printWindow.document.write('<style>body { text-align: center; } .qr-container { display: inline-block; }</style>');
            printWindow.document.write('</head><body>');
            printWindow.document.write('<div class="qr-container">');
            printWindow.document.write(qrCodeContainer.innerHTML);
            printWindow.document.write(`<p>${url}</p>`);
            printWindow.document.write('</div></body></html>');
            printWindow.document.close();
            printWindow.print();

        };

        printBtn.addEventListener('click', printBtnClickListener);
    });
});
