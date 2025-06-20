document.addEventListener('DOMContentLoaded', () => {
    // Initialize QR code
    const qrCode = new QRCode(document.getElementById('qr-code'), {
        width: 300,  // Increased for better quality
        height: 300,
        colorDark: '#000000',
        colorLight: '#ffffff',
        correctLevel: QRCode.CorrectLevel.H
    });

    const downloadLink = document.getElementById('qr-download');

    // Function to download QR code as PNG
    function downloadQRCode() {
        const canvas = document.querySelector('#qr-code canvas');
        if (canvas) {
            const pngUrl = canvas.toDataURL('image/png');
            const link = document.createElement('a');
            link.download = 'qr-code.png';
            link.href = pngUrl;
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
        }
    }

    // Add download event listener
    downloadLink.addEventListener('click', (e) => {
        e.preventDefault();
        downloadQRCode();
    });

    const baseInput = document.getElementById('base-url');
    const sourceInput = document.getElementById('utm-source');
    const mediumInput = document.getElementById('utm-medium');
    const campaignInput = document.getElementById('utm-campaign');
    const contentInput = document.getElementById('utm-content');
    const termInput = document.getElementById('utm-term');
    const generatedUrlInput = document.getElementById('generated-url');
    const copyButton = document.getElementById('copy-button');

    // Function to generate UTM parameters
    function generateUTMUrl() {
        const base = baseInput.value.trim();
        if (!base) return '';

        const params = [];
        
        if (sourceInput.value) params.push(`utm_source=${encodeURIComponent(sourceInput.value)}`);
        if (mediumInput.value) params.push(`utm_medium=${encodeURIComponent(mediumInput.value)}`);
        if (campaignInput.value) params.push(`utm_campaign=${encodeURIComponent(campaignInput.value)}`);
        if (contentInput.value) params.push(`utm_content=${encodeURIComponent(contentInput.value)}`);
        if (termInput.value) params.push(`utm_term=${encodeURIComponent(termInput.value)}`);

        return params.length > 0 
            ? `${base}?${params.join('&')}`
            : base;
    }

    // Function to update the generated URL
    function updateGeneratedUrl() {
        const url = generateUTMUrl();
        generatedUrlInput.value = url;
    }

    // Function to copy URL to clipboard
    function copyToClipboard() {
        if (generatedUrlInput.value) {
            navigator.clipboard.writeText(generatedUrlInput.value)
                .then(() => {
                    copyButton.textContent = 'Copied!';
                    setTimeout(() => {
                        copyButton.textContent = 'Copy URL';
                    }, 2000);
                })
                .catch(err => {
                    console.error('Failed to copy text: ', err);
                });
        }
    }

    // Function to update QR code
    function updateQRCode() {
        const baseUrl = baseInput.value.trim();
        if (baseUrl) {
            // Create URL with all UTM parameters
            const params = [];
            if (sourceInput.value) params.push(`utm_source=${encodeURIComponent(sourceInput.value)}`);
            if (mediumInput.value) params.push(`utm_medium=${encodeURIComponent(mediumInput.value)}`);
            if (campaignInput.value) params.push(`utm_campaign=${encodeURIComponent(campaignInput.value)}`);
            if (termInput.value) params.push(`utm_term=${encodeURIComponent(termInput.value)}`);
            params.push(`utm_content=QRcode`); // Always include QRcode as content

            const url = `${baseUrl}?${params.join('&')}`;
            qrCode.makeCode(url);
        } else {
            qrCode.clear();
        }
    }

    // Event listeners
    baseInput.addEventListener('input', (e) => {
        updateGeneratedUrl();
        updateQRCode();
    });
    sourceInput.addEventListener('input', (e) => {
        updateGeneratedUrl();
        updateQRCode();
    });
    mediumInput.addEventListener('input', (e) => {
        updateGeneratedUrl();
        updateQRCode();
    });
    campaignInput.addEventListener('input', (e) => {
        updateGeneratedUrl();
        updateQRCode();
    });
    contentInput.addEventListener('input', (e) => {
        updateGeneratedUrl();
        updateQRCode();
    });
    termInput.addEventListener('input', (e) => {
        updateGeneratedUrl();
        updateQRCode();
    });
    copyButton.addEventListener('click', copyToClipboard);

    // Initialize with placeholder values
    baseInput.value = 'https://example.com';
    sourceInput.value = 'google';
    mediumInput.value = 'cpc';
    campaignInput.value = 'spring_sale';
    termInput.value = 'shoes';
    contentInput.value = '';

    // Initial URL generation
    updateGeneratedUrl();
    updateQRCode();
});
