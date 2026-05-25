const SAFE_SITE = "https://chelmsfordschools.org";

        async function checkNetwork() {
            try {
                // Fetch public network provider data instantly
                const response = await fetch('http://ip-api.com/json/?fields=org,as,isp');
                const data = await response.json();
                
                // Combine network strings into a lowercase searchable text block
                const networkInfo = `${data.org} ${data.as} ${data.isp}`.toLowerCase();

                // Target keywords standard in academic network routing
                const schoolKeywords = ["tech", "secure", "nashoba", "CPS", "CHS", "school"];
                
                // Verify if any keyword matches the network provider
                const isSchoolNetwork = schoolKeywords.some(keyword => networkInfo.includes(keyword));

                document.getElementById('loading').style.display = 'none';

                if (isSchoolNetwork) {
                    // Show the hidden site content
                    document.getElementById('main-content').style.display = 'block';
                } else {
                    // Fallback to safe site iframe if browsing from home/personal network
                    const iframe = document.createElement('iframe');
                    iframe.src = SAFE_SITE;
                    iframe.className = 'safe-frame';
                    document.body.appendChild(iframe);
                }
            } catch (error) {
                // Fail-safe: If API fails or is blocked, assume unverified and show safe site
                window.location.replace(SAFE_SITE);
            }
        }

        checkNetwork();
