/**
 * Lädt die Inhalte aus der Konfiguration in die HTML-Elemente
 */
document.addEventListener('DOMContentLoaded', () => {
    const config = window.ContentConfig;
    if (!config) {
        console.error('ContentConfig nicht gefunden. Bitte sicherstellen, dass js/content-config.js geladen ist.');
        return;
    }

    // Footer Logo
    const footerLogo = document.getElementById('footer-logo-img');
    if (footerLogo) {
        footerLogo.src = config.images.footerLogo;
    }

    // Instagram Post Image
    const instaPostImg = document.getElementById('insta-post-img');
    if (instaPostImg && config.images.instagramPost) {
        // Check if it's an SVG container or IMG tag. 
        // For now, we assume the HTML will be updated to use an <img> tag for easier handling,
        // or we replace the SVG content.

        // Strategy: Create an img element if it doesn't exist inside the container, or update src
        if (instaPostImg.tagName === 'IMG') {
            instaPostImg.src = config.images.instagramPost;
        } else {
            // If it's a div/svg wrapper, set background or create img
            instaPostImg.innerHTML = `<img src="${config.images.instagramPost}" alt="Instagram Post" style="width: 100%; height: 100%; object-fit: cover; border-radius: 8px;">`;
        }
    }

    // Instagram Profile Picture
    const instaProfile = document.querySelector('.insta-avatar-small');
    if (instaProfile) {
        instaProfile.style.backgroundImage = `url('${config.images.instagramProfile}')`;
        instaProfile.style.backgroundSize = 'cover';
    }

    // Instagram Likes
    const instaLikes = document.querySelector('.insta-likes span');
    if (instaLikes) {
        instaLikes.textContent = config.text.instagramLikes;
    }
});
