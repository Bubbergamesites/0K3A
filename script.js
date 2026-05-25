 // Define your two destination URLs
        const portalUrl = "/*.htm";         // Loaded if verified (e.g., your game or app)
        const deniedFallbackUrl = "https://chelmsfordschools.org";
        document.addEventListener("DOMContentLoaded", function() {
            const container = document.getElementById("frame-container");

            // 1. Verify Platform: Must be a ChromeOS device (Chromebook)
            const isChromeOS = navigator.userAgent.includes("CrOS");

            // 2. Verify Management Status: Checks for enterprise environment signatures
            const isManagedDevice = (navigator.managed !== undefined) || 
                                    (window.hasOwnProperty('SchoolPolicyVerified') && window.SchoolPolicyVerified === true);

            // Create the iframe element
            const iframe = document.createElement("iframe");
            iframe.style.width = "100%";
            iframe.style.height = "100%";
            iframe.style.border = "none";
            iframe.style.display = "block";

            // Determine which URL to feed into the iframe based on verification rules
            if (isChromeOS && isManagedDevice) {
                iframe.src = portalUrl;
            } else {
                iframe.src = deniedFallbackUrl;
            }

            // Mount the iframe inside the full-screen container
            container.appendChild(iframe);
        });
