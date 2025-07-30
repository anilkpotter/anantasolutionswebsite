       document.addEventListener('DOMContentLoaded', function() {
            const slider = document.querySelector('.slider');
            const slides = document.querySelectorAll('.slide');
            const dots = document.querySelectorAll('.dot');
            const prevBtn = document.querySelector('.arrow.prev');
            const nextBtn = document.querySelector('.arrow.next');
            let currentIndex = 0;
            let autoSlideInterval;
            const slideCount = slides.length;
            
            // Initialize the slider
            function initSlider() {
                updateSlider();
                startAutoSlide();
            }
            
            // Update slider position and active states
            function updateSlider() {
                slider.style.transform = `translateX(-${currentIndex * 25}%)`;
                
                // Update active states
                slides.forEach((slide, index) => {
                    slide.classList.toggle('active', index === currentIndex);
                });
                
                dots.forEach((dot, index) => {
                    dot.classList.toggle('active', index === currentIndex);
                });
            }
            
            // Go to specific slide
            function goToSlide(index) {
                currentIndex = (index + slideCount) % slideCount;
                updateSlider();
                resetAutoSlide();
            }
            
            // Next slide
            function nextSlide() {
                goToSlide(currentIndex + 1);
            }
            
            // Previous slide
            function prevSlide() {
                goToSlide(currentIndex - 1);
            }
            
            // Auto slide functionality
            function startAutoSlide() {
                autoSlideInterval = setInterval(nextSlide, 5000);
            }
            
            function resetAutoSlide() {
                clearInterval(autoSlideInterval);
                startAutoSlide();
            }
            
            // Event listeners
            nextBtn.addEventListener('click', () => {
                nextSlide();
            });
            
            prevBtn.addEventListener('click', () => {
                prevSlide();
            });
            
            dots.forEach((dot, index) => {
                dot.addEventListener('click', () => {
                    goToSlide(index);
                });
            });
            
            // Pause auto slide on hover
            slider.addEventListener('mouseenter', () => {
                clearInterval(autoSlideInterval);
            });
            
            slider.addEventListener('mouseleave', () => {
                resetAutoSlide();
            });
            
            // Touch events for mobile
            let touchStartX = 0;
            let touchEndX = 0;
            
            slider.addEventListener('touchstart', (e) => {
                touchStartX = e.changedTouches[0].screenX;
                clearInterval(autoSlideInterval);
            }, {passive: true});
            
            slider.addEventListener('touchend', (e) => {
                touchEndX = e.changedTouches[0].screenX;
                handleSwipe();
                resetAutoSlide();
            }, {passive: true});
            
            function handleSwipe() {
                const threshold = 50;
                if (touchEndX < touchStartX - threshold) {
                    nextSlide();
                } else if (touchEndX > touchStartX + threshold) {
                    prevSlide();
                }
            }
            
            // Initialize
            initSlider();
        });