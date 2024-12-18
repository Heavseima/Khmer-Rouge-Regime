document.addEventListener('DOMContentLoaded', function() {
    // Video scroll functionality
    const videoContainer = document.querySelector('.doc-vdo');
    const videos = videoContainer.querySelectorAll('figure');
    const scrollIndicator = document.createElement('div');
    scrollIndicator.className = 'scroll-indicator';
    
    // Create scroll dots
    videos.forEach((_, index) => {
        const dot = document.createElement('div');
        dot.className = 'scroll-dot' + (index === 0 ? ' active' : '');
        dot.setAttribute('data-index', index);
        
        // Make dots clickable
        dot.addEventListener('click', () => {
            // Calculate the scroll position for the specific video
            const itemWidth = videos[0].offsetWidth + 20; // Including gap
            const scrollPosition = index * itemWidth;
            
            // Smooth scroll to the selected video
            videoContainer.scrollTo({
                left: scrollPosition,
                behavior: 'smooth'
            });
        });
        
        scrollIndicator.appendChild(dot);
    });
    
    videoContainer.parentElement.appendChild(scrollIndicator);
    
    // Create scroll hint
    const scrollHint = document.createElement('div');
    scrollHint.className = 'scroll-hint';
    scrollHint.innerHTML = '→';
    videoContainer.parentElement.appendChild(scrollHint);
    
    // Check if this is the landing page
    const isLandingPage = window.location.pathname === '/' || window.location.pathname === '/index.html';
    
    // Show scroll hint only if there's horizontal scroll on landing page
    if (isLandingPage && videoContainer.scrollWidth > videoContainer.clientWidth) {
        scrollHint.style.opacity = '1';
        
        // Hide hint after 3 seconds
        setTimeout(() => {
            scrollHint.style.opacity = '0';
        }, 3000);
    } else {
        // Ensure hint is hidden
        scrollHint.style.opacity = '0';
    }
    
    // Update active dot on scroll
    let scrollTimeout;
    videoContainer.addEventListener('scroll', () => {
        clearTimeout(scrollTimeout);
        scrollTimeout = setTimeout(() => {
            const scrollPosition = videoContainer.scrollLeft;
            const itemWidth = videos[0].offsetWidth + 20; // Including gap
            const activeIndex = Math.round(scrollPosition / itemWidth);
            
            document.querySelectorAll('.scroll-dot').forEach((dot, index) => {
                dot.classList.toggle('active', index === activeIndex);
            });
        }, 50);
    });
    
    // Touch scroll handling for mobile
    let touchStartX = 0;
    let touchEndX = 0;
    
    videoContainer.addEventListener('touchstart', (e) => {
        touchStartX = e.touches[0].clientX;
    });
    
    videoContainer.addEventListener('touchmove', (e) => {
        touchEndX = e.touches[0].clientX;
        const diffX = touchStartX - touchEndX;
        videoContainer.scrollLeft += diffX;
        touchStartX = touchEndX;
    });
});

document.addEventListener('DOMContentLoaded', function() {
    // Article visibility toggle
    const articles = document.querySelectorAll('.article-1');
    const seeMoreBtn = document.querySelector('.see-more-btn');
    let isExpanded = false;
    
    // Initially hide all articles except first two
    articles.forEach((article, index) => {
        if (index > 1) {
            article.classList.add('hidden');
        }
    });
    
    seeMoreBtn.addEventListener('click', () => {
        isExpanded = !isExpanded;
        
        articles.forEach((article, index) => {
            if (index > 1) {
                article.classList.toggle('hidden', !isExpanded);
            }
        });
        
        // Only handle scroll back on "See Less"
        if (!isExpanded) {
            // Store the original position of the "See More" button
            const originalTop = seeMoreBtn.getBoundingClientRect().top + window.scrollY;
            
            // Scroll back to the original position, with a bit more offset
            window.scrollTo({
                top: originalTop - 250, // Increased offset to scroll higher
                behavior: 'smooth'
            });
        }
        
        seeMoreBtn.textContent = isExpanded ? 'See Less' : 'See More Articles';
    });
});

document.addEventListener('DOMContentLoaded', function() {
    const textContents = document.querySelectorAll('.text-content');
    
    textContents.forEach((content) => {
        const paragraph = content.querySelector('p');
        const parentCard = content.closest('.five-C-content > div');
        
        if (paragraph.scrollHeight > paragraph.clientHeight) {
            const expandButton = document.createElement('span');
            expandButton.classList.add('expand-button');
            expandButton.textContent = 'Read more';
            
            expandButton.addEventListener('click', function() {
                // Store the original position before expanding
                const originalTop = parentCard.getBoundingClientRect().top + window.scrollY;
                
                content.classList.toggle('expanded');
                parentCard.classList.toggle('expanded-card');
                
                // Smooth scroll to the card if expanded
                if (content.classList.contains('expanded')) {
                    parentCard.scrollIntoView({ behavior: 'smooth', block: 'start' });
                    expandButton.textContent = 'Read less';
                } else {
                    // Scroll back to the original position when collapsing
                    window.scrollTo({
                        top: originalTop - 250, // Slight offset to ensure the card is fully visible
                        behavior: 'smooth'
                    });
                    expandButton.textContent = 'Read more';
                }
            });
            
            content.appendChild(expandButton);
        }
    });
});

document.addEventListener('DOMContentLoaded', () => {
    const checkbox = document.getElementById('check');
    const menuIcon = document.getElementById('menu-icon');
    const closeIcon = document.getElementById('close-icon');
    const navBar = document.querySelector('.nav-bar');
    const navLinks = document.querySelectorAll('.nav-bar a');
    const icons = document.querySelector('.icons');

    function openNavbar() {
        checkbox.checked = true;
        menuIcon.style.display = 'none';
        closeIcon.style.display = 'inline-flex';
        navBar.style.height = '16.5rem';
        navLinks.forEach((link, index) => {
            link.style.opacity = '1';
            link.style.transform = 'translateY(0)';
            link.style.transitionDelay = `calc(0.12s * ${index})`;
        });
    }

    function closeNavbar() {
        checkbox.checked = false;
        menuIcon.style.display = 'inline-flex';
        closeIcon.style.display = 'none';
        navBar.style.height = '0';
        navLinks.forEach(link => {
            link.style.opacity = '0';
            link.style.transform = 'translateY(-10px)';
            link.style.transitionDelay = '0s';
        });
    }

    // Menu icon click
    menuIcon.addEventListener('click', (e) => {
        e.stopPropagation();
        openNavbar();
    });

    // Close icon click
    closeIcon.addEventListener('click', (e) => {
        e.stopPropagation();
        closeNavbar();
    });

    // Close when nav links clicked
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            closeNavbar();
        });
    });

    // Close when clicking outside
    document.addEventListener('click', (e) => {
        if (checkbox.checked && 
            !navBar.contains(e.target) && 
            !icons.contains(e.target)) {
            closeNavbar();
        }
    });

    // Initial setup
    closeIcon.style.display = 'none';
});