document.addEventListener("DOMContentLoaded", function () {
    console.log("JavaScript loaded successfully!");

    /*================ Search Input & Clear Button =================*/
    const searchInput = document.getElementById("search");
    const clearBtn = document.getElementById("clearSearch");
    if (searchInput && clearBtn) {
        searchInput.addEventListener("input", function () {
            clearBtn.style.display = this.value.length > 0 ? "block" : "none"; // Toggle 'X'
        });
        clearBtn.addEventListener("click", function () {
            searchInput.value = "";
            clearBtn.style.display = "none"; // Hide 'X'
            searchInput.focus(); // Keep focus in input field
        });
    }

    

    /* ================Register Modal===================== */
    const openRegister = document.getElementById("openRegister");
    const registerModal = document.getElementById("register-section");
    const closeRegister = document.getElementById("closeRegister");
    const registerModalOverlay = document.getElementById("registerModalOverlay");
    if (openRegister && registerModal && closeRegister && registerModalOverlay) {
        openRegister.addEventListener("click", function (event) {
            event.preventDefault();
            registerModal.classList.add("active");
            registerModalOverlay.classList.add("active");
        });
        closeRegister.addEventListener("click", function () {
            registerModal.classList.remove("active");
            registerModalOverlay.classList.remove("active");
        });
    } else {
        console.warn("Register modal elements missing! Check your HTML.");
    }

    /* ===============Login Modal================ */
    const openLogin = document.getElementById("openLogin");
    const loginModal = document.getElementById("login-section");
    const closeLogin = document.getElementById("closeLogin");
    if (openLogin && loginModal && closeLogin && registerModalOverlay) {
        openLogin.addEventListener("click", function (event) {
            event.preventDefault();
            loginModal.classList.add("active");
            registerModalOverlay.classList.add("active");
        });
        closeLogin.addEventListener("click", function () {
            loginModal.classList.remove("active");
            registerModalOverlay.classList.remove("active");
        });
    } else {
        console.warn("Login modal elements missing! Check your HTML.");
    }




    /* ==========COUNTRY PHONE=========== */
    const phoneInput = document.querySelector("#phone");
    if (phoneInput) {
        window.intlTelInput(phoneInput, {
            initialCountry: "gh",
            preferredCountries: ["us", "gb", "in"],
            separateDialCode: false, 
            nationalMode: false
        });
    }



    // ======= Image Swiper =======
    new Swiper('#swiperContainer', {
        loop: true,
        slidesPerView: 1,
        spaceBetween: 10,
        pagination: {
            el: ".swiper-pagination",
            clickable: true
        },
        navigation: {
            nextEl: ".swiper-button-next",
            prevEl: ".swiper-button-prev"
        },
        autoplay: {
            delay: 3000,
            disableOnInteraction: false
        },
        breakpoints: {
            768: { slidesPerView: 1 },
            1024: { slidesPerView: 1 }
        }
    });



    // ======= Link Swiper (for nav links) =======
    new Swiper('#mySwiperLink', {
        slidesPerView: 'auto',
        spaceBetween: 8,
        freeMode: true,
        breakpoints: {
            0: {
              slidesPerView: 2.5, // Show 2.5 links on very small screens
            },
            480: {
              slidesPerView: 3.5,
            },
            768: {
              slidesPerView: 4.5, // Resume 'auto' layout from tablets up
            },
            992: {
                slidesPerView: 6,
            },
            1023: {
                slidesPerView: 6.5,
            },
            1200: {
                slidesPerView: 'auto'
            },
        }
    });




    /*==========SEARCH FOR MOBILE DEVICES===========*/

    const mobileSearchIcon = document.getElementById('mobileSearchIcon');
    const mobileSearch = document.getElementById('mobileSearch');
    const searchClose = document.getElementById('searchClose');

    if (mobileSearchIcon && mobileSearch) {
        mobileSearchIcon.addEventListener('click', () => {
            mobileSearch.classList.add('show-search');
        });
    }

    if (searchClose && mobileSearch) {
        searchClose.addEventListener('click', () => {
            mobileSearch.classList.remove('show-search');
        });
    }
    


    // ========== MOBILE LOGIN AND REGISTER LOGIC ==========

    // For mobile login
    const goToRegister = document.getElementById('desktopRegister');  // Switch to Register
    const goToLogin = document.getElementById('desktopLogin');  // Switch to Login


    //===== Desktop login and register modal switch
    const desktopLogin = document.getElementById('login-section');
    const desktopRegister = document.getElementById('register-section');


    //======= Switch: Login -> Register (Desktop)
    if (goToRegister && desktopLogin && desktopRegister) {
        goToRegister.addEventListener('click', (e) => {
            e.preventDefault();
            console.log('Switching to register form (Desktop)');
            desktopLogin.classList.remove('active');
            desktopRegister.classList.add('active');
        });
    }

    //====== Switch: Register -> Login (Desktop)
    if (goToLogin && desktopRegister && desktopLogin) {
        goToLogin.addEventListener('click', (e) => {
            e.preventDefault();
            console.log('Switching to login form (Desktop)');
            desktopRegister.classList.remove('active');
            desktopLogin.classList.add('active');
        });
    }


    //====== Define all DOM elements for mobile login/register
    const mobileUser = document.getElementById('mobileUser');

    const mobileLoginSection = document.getElementById('mobileLoginSection');

    const mobileRegisterSection = document.getElementById('mobileRegisterSection');

    const mobileCloseLogin = document.getElementById('mobileCloseLogin');

    const mobileCloseRegister = document.getElementById('mobileCloseRegister');


    //====== Open mobile login when the user icon is clicked
    if (mobileUser && mobileLoginSection) {
        mobileUser.addEventListener('click', () => {
            mobileLoginSection.classList.add('show-user');
            mobileRegisterSection.classList.remove('show-user');
        });
    }

    //====== Close mobile login
    if (mobileCloseLogin) {
        mobileCloseLogin.addEventListener('click', () => {
            mobileLoginSection.classList.remove('show-user');
        });
    }


    //===== Close mobile register
    if (mobileCloseRegister) {
        mobileCloseRegister.addEventListener('click', () => {
            mobileRegisterSection.classList.remove('show-user');
        });
    }


    // Switch from Login -> Register (Mobile)
    const goToRegisterMobile = document.getElementById('mobileGoToRegister');
    const goToLoginMobile = document.getElementById('mobileGoToLogin');

    if (goToRegisterMobile && goToLoginMobile && mobileLoginSection && mobileRegisterSection) {
        goToRegisterMobile.addEventListener('click', (e) => {
            e.preventDefault();
            console.log('Switching to register form (Mobile)');
            mobileLoginSection.classList.remove('show-user');
            mobileRegisterSection.classList.add('show-user');
        });
    


        goToLoginMobile.addEventListener('click', (e) => {
            e.preventDefault();
            console.log('Switching to login form (Mobile)');
            mobileRegisterSection.classList.remove('show-user');
            mobileLoginSection.classList.add('show-user');
        });
    }

    
    //======= LOGIC TO HANDLE REGISTER TO LOGIN & VICE-VERSA =======//
    async function handleRegistration(formId) {
        const form = document.getElementById(formId);
        if (!form) return;
    
        const isMobile = formId === 'mobileRegisterForm';
    
        form.addEventListener('submit', async (e) => {
            e.preventDefault();
    
            // Check for terms checkbox if it exists (mostly for mobile)
            const termsCheckbox = form.querySelector('#reg-terms-checkbox');
            if (termsCheckbox && !termsCheckbox.checked) {
                alert("You must accept the terms and privacy policy.");
                return;
            }
    
            const data = {
                surname: form.querySelector(isMobile ? '#mobile-reg-surname' : '#reg-surname')?.value,

                'other-names': form.querySelector(isMobile ? '#mobile-reg-other-names' : '#reg-other-names')?.value,

                email: form.querySelector(isMobile ? '#mobile-reg-email' : '#reg-email')?.value,

                password: form.querySelector(isMobile ? '#mobile-reg-password' : '#reg-password')?.value,

                phone: form.querySelector(isMobile ? '#mobile-phone' : '#phone')?.value,

                dob: form.querySelector(isMobile ? '#mobile-reg-dob' : '#reg-dob')?.value,

                gender: form.querySelector(isMobile ? '#mobile-reg-gender' : '#reg-gender')?.value,

                terms: form.querySelector(isMobile ? '#mobile-reg-terms' : '#reg-terms')?.value
            };
    
            try {
                const res = await fetch('/register', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(data)
                });
    
                if (res.ok) {
                    alert("Successfully registered! Please log in.");
                    form.reset();
    
                    // Switch modals: close register, open login
                    if (isMobile) {
                        document.getElementById("mobileRegisterSection")?.classList.remove("show-user");
                        document.getElementById("mobileLoginSection")?.classList.add("show-user");
                    } else {
                        document.getElementById("register-section")?.classList.remove("active");
                        document.getElementById("login-section")?.classList.add("active");
                        document.getElementById("modalOverlay")?.classList.add("active");
                    }
                } else {
                    const error = await res.json();
                    alert(error.message || 'Registration failed');
                }
            } catch (err) {
                console.error('Registration error:', err);
                alert('An error occurred. Please try again.');
            }
        });
    }

    //===== Initialize for both forms
    handleRegistration('desktopRegisterForm');
    handleRegistration('mobileRegisterForm');


    //==========HANDLING LOGIN

    async function handleLogin(formId) {
        const form = document.getElementById(formId);
        if (!form) return;
    
        form.addEventListener('submit', async (e) => {
            e.preventDefault();
    
            const email = document.querySelector('#user-email').value.trim();
            const password = document.querySelector('#user-password').value.trim();
    
            console.log("Login attempt with:", email, password);
    
            try {
                const res = await fetch('/login', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ email, password })
                });
    
                const data = await res.json();
    
                if (!res.ok) {
                    console.error("Login failed:", data.error || "Unknown error");
                    alert(data.error || "Login failed");
                    return;
                }

                console.log("Storing userId:", data.user_id);

                console.log("✅ Login successful:", data);

                localStorage.setItem('userLoggedIn', 'true');
                localStorage.setItem('userFullName', data.full_name);
                localStorage.setItem('userId', String(data.user_id));

                console.log("Redirecting to /sayItLoud.html now...");
                window.location.href = '/sayItLoud.html';

    
            } catch (err) {
                console.error("❌ Login request error:", err);
                alert("Network or server error");
            }
        });
    }
    
    
    handleLogin('desktopLoginForm');
    handleLogin('mobileLoginForm');
    


    /*========MOBILE MENU HANDLER=========*/
    const mobileMenu = document.getElementById('mobileMenu');
    const navLinks = document.getElementById('navLinks');
    const mobileMenuClose = document.getElementById('mobileMenuClose');

    if (mobileMenu && navLinks) {
        mobileMenu.addEventListener('click', () => {
            navLinks.classList.add('show-menu');
        });
    }

    if (mobileMenuClose && navLinks) {
        mobileMenuClose.addEventListener('click', () => {
            navLinks.classList.remove('show-menu');
        });
        
    }



    //===========GHANAWEB TV=============

    const videos = [
        {
        title: "Apologise for threats against journalists – GJA tells NPP's Alhaji Masawudu",
        
        
            sources: {
                mp4: "images/Ghanaweb TV/Apologise-for threats-against-journalists-GJA-tells-NPP's-Alhaji-Masawudu.mp4",
        
                webm: "images/Ghanaweb TV/Apologise-for threats-against-journalists-GJA-tells-NPP's-Alhaji-Masawudu.webm",
        
                ogg: "images/Ghanaweb TV/Apologise-for threats-against-journalists-GJA-tells-NPP's-Alhaji-Masawudu.ogg",
            }
        },
        
        {
            title: "BOG to begin cryptocurrency regulations in Ghana by september 2025",
        
            sources: {
                mp4: "/images/Ghanaweb TV/BOG-to-begin-cryptocurrency-regulations-in-Ghana-by-september-2025.mp4",
        
                webm: "/images/Ghanaweb TV/BOG-to-begin-cryptocurrency-regulations-in-Ghana-by-september-2025.webm",
        
                ogg: "/images/Ghanaweb TV/BOG-to-begin-cryptocurrency-regulations-in-Ghana-by-september-2025.ogg",
            }
        },
        
        {
            title: "Ecowas develops $131bn master plan covering four key infrastructure sectors - Dr Touray",

            sources: {
                mp4: "/images/Ghanaweb TV/ECOWAS-develops-$131bn-master-plan-covering-four-key -infrastructure-sectors – Dr Touray.mp4",
        
                webm: "/images/Ghanaweb TV/ECOWAS-develops-$131bn-master-plan-covering-four-key -infrastructure-sectors – Dr Touray.webm",
        
                ogg: "/images/Ghanaweb TV/ECOWAS-develops-$131bn-master-plan-covering-four-key -infrastructure-sectors – Dr Touray.ogg"
            }
        },
        
        {
            title: "Government to launch National Venture Capital Fund to empower women and youth",
        
            sources: {
                mp4: "images/Ghanaweb TV/Government-to-launch-National-Venture-Capital-Fund-to-empower-women-and-youth.mp4",
        
                webm: "images/Ghanaweb TV/Government-to-launch-National-Venture-Capital-Fund-to-empower-women-and-youth.webm",
        
                ogg: "images/Ghanaweb TV/Government-to-launch-National-Venture-Capital-Fund-to-empower-women-and-youth.ogg"
            }
        }
        
        
    ];

   
  
    let currentVideoIndex = 0;

    function loadVideo(index) {
        const video = videos[index];
        const player = document.getElementById("videoPlayer");
        const title = document.getElementById("videoTitle");
    
        // Ensure player exists
        if (!player) {
            console.error("Video player not found");
            return;
        }
    
        // Clear old sources
        while (player.firstChild) {
            player.removeChild(player.firstChild);
        }
    
        // Add new sources for the new video
        const sourceMp4 = document.createElement("source");
        sourceMp4.src = video.sources.mp4;
        sourceMp4.type = "video/mp4";
    
        const sourceWebm = document.createElement("source");
        sourceWebm.src = video.sources.webm;
        sourceWebm.type = "video/webm";
    
        const sourceOgg = document.createElement("source");
        sourceOgg.src = video.sources.ogg;
        sourceOgg.type = "video/ogg";
    
        player.appendChild(sourceMp4);
        player.appendChild(sourceWebm);
        player.appendChild(sourceOgg);
    
        title.textContent = video.title;
        player.load();
    
        // Wait for user to interact before playing
        const tryPlay = () => {
            player.play().catch(err => {
                console.warn("Autoplay blocked:", err.message);
            });
            // Remove listener after first interaction
            document.removeEventListener("click", tryPlay);
        };
    
        document.addEventListener("click", tryPlay);
    }
    
    const nextBtn = document.getElementById("nextBtn");
    if (nextBtn) {
        nextBtn.addEventListener("click", () => {
            currentVideoIndex = (currentVideoIndex + 1) % videos.length;
            loadVideo(currentVideoIndex);
        });
    } else {
        console.warn('Next button not found!');
    }




    // === =======Handle Login via URL Parameters ===
    
    
        const commentInput = document.getElementById('commentInput');
        const postCommentBtn = document.getElementById('postCommentBtn');
        const logoutBtn = document.getElementById('logoutBtn');
    
        // === Handle Login via URL Parameters ===
        const urlParams = new URLSearchParams(window.location.search);
        const userEmail = urlParams.get('user-email');
        const userPassword = urlParams.get('user-password');
        const userFullName = urlParams.get('user-name');
        const userId = urlParams.get('user-id');
    
        if (userId && userFullName && userEmail && userPassword && !checkLogin()) {
            localStorage.setItem('userLoggedIn', 'true');
            localStorage.setItem('userFullName', userFullName);
            localStorage.setItem('userId', userId);
            window.location.href = window.location.pathname;
        }
        
    
        // Function to check if the user is logged in
        function checkLogin() {
            return localStorage.getItem('userLoggedIn') === 'true';
        }
    
        // Show logout button if logged in
        if (checkLogin()) {
            if (logoutBtn) {
                logoutBtn.style.display = 'block';
            }
        }

        if (!checkLogin()) {
            logoutBtn.style.display = 'none'; // Hide logout button after logout
        }
        
    
        // Disable commenting if not logged in
        function disableCommenting() {
            if (commentInput) {
                commentInput.disabled = true;
                commentInput.setAttribute('readonly', true);
            }
            if (postCommentBtn) postCommentBtn.disabled = true;
        }
    
        // Enable commenting if logged in
        function enableCommenting() {
            if (commentInput) {
                commentInput.disabled = false;
                commentInput.removeAttribute('readonly');
            }
            if (postCommentBtn) postCommentBtn.disabled = false;
        }
    
        // Initialize comment inputs based on login state
        if (checkLogin()) {
            enableCommenting();
        } else {
            disableCommenting();
        }
    
        // Handle focus on the comment input
        if (commentInput) {
            commentInput.addEventListener('mousedown', (e) => {
                if (!checkLogin()) {
                    e.preventDefault();
                    alert("Please log in to write a comment.");
                }
            });
        }
    
        // Handle posting a comment
        if (postCommentBtn) {
            postCommentBtn.addEventListener('click', function (e) {
                e.preventDefault();

                if (!checkLogin()) {
                    alert("Please log in to post a comment");
                    return;
                }
                
                const comment = commentInput.value.trim();
            if (!comment) {
                alert("Please write a comment before posting");
                return;
            }

    
                const fullName = localStorage.getItem('userFullName');
                const userId = parseInt(localStorage.getItem('userId'), 10);

                if (!userId || isNaN(userId)) {
                    console.error("🚫 Invalid userId — make sure you're logged in");
                    return;
                }
                

                //console.log("Sending comment:", { comment, userId, fullName });


                fetch('/post-comment', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({ comment_text: comment, userId, fullName })
                })
                .then(response => {
                    if (!response.ok) throw new Error('Failed to post comment');
                    return response.json();
                })
                .then(data => {
                    appendComment(data.comment_text, fullName, data.created_at); 
                    commentInput.value = '';
                })
                .catch(error => {
                    console.error("❌ Error posting comment:", error);
                    alert('There was an issue posting your comment. Please try again.');
                });
                
                  
            });

        }


    

        
    // Handle logout
    if (logoutBtn) {
        logoutBtn.addEventListener('click', function () {
            fetch('/logout')
                .then(response => {
                    if (response.ok) {
                        localStorage.removeItem('userLoggedIn');

                        localStorage.removeItem('userFullName');

                        localStorage.removeItem('userId');
                            window.location.href = '/';
                    }
                    else {
                        throw new Error('Logout request failed');
                    }
                })
                .catch(err => {
                    console.error('Logout error:', err);
                    alert('Something went wrong while logging out.');
                });
        });
    }

   
    //=====APPENDING COMMENT AND HANDLING SHOW-MORE  LOGIC

   // Handle appending comments (separate from video logic)
function appendComment(commentText, userFullName = 'Unnamed User', commentTime = new Date()) {
    const postedComments = document.getElementById('postedComments');

    if (!postedComments) {
        console.warn('Comment container not found!');
        return;
    }

    const nameParts = userFullName.trim().split(' ');
    const initials = nameParts.slice(0, 2)
        .map(n => n[0]?.toUpperCase() || '')
        .join('');

    const now = new Date();
    const timeDiffMs = now - new Date(commentTime);
    const timeDiffMinutes = Math.floor(timeDiffMs / (1000 * 60));
    const timeDiffHours = Math.floor(timeDiffMs / (1000 * 60 * 60));

    let formattedDate;
    if (timeDiffHours < 24) {
        if (timeDiffMinutes < 1) {
            formattedDate = 'Just now';
        } else if (timeDiffMinutes < 60) {
            formattedDate = `${timeDiffMinutes} minute${timeDiffMinutes > 1 ? 's' : ''} ago`;
        } else {
            formattedDate = `${timeDiffHours} hour${timeDiffHours > 1 ? 's' : ''} ago`;
        }
    } else {
        formattedDate = new Date(commentTime).toLocaleDateString(undefined, {
            year: 'numeric',
            month: 'short',
            day: 'numeric'
        });
    }

    const commentDiv = document.createElement('div');
    commentDiv.classList.add('single-comment');
    commentDiv.innerHTML = `
        <div class="post-comment-box">
            <div class="comment-header">
                <div class="comment-initials">${initials}</div>
                <div class="comment-meta">
                    <div class="comment-name"><span class="comment-postby"> post by:</span> ${userFullName}</div>
                    <div class="comment-date">${formattedDate}</div>
                </div>
            </div>
            <div class="comment-space">
                <p class="comment-body show-truncated">${commentText}</p>
                <a href="#" class="show-more">Show more</a>
            </div>
            <div class="comment-actions">
                <i class='bx bxs-comment comment-icon'></i>
                <a href="#" class="reply-link">Add Comment</a>
                <i class='bx bxs-like comment-like' data-count="0" role="button" aria-pressed="false"></i>
                <span class="like-count">0</span>
                <i class='bx bxs-dislike comment-dislike' data-count="0" role="button" aria-pressed="false"></i>
                <span class="dislike-count">0</span>
            </div>
        </div>
    `;
    postedComments.appendChild(commentDiv);

        
        //========== Add Show More / Less toggle
         // Add event listener for "Show more"
    const showMoreLink = commentDiv.querySelector('.show-more');
    const commentBody = commentDiv.querySelector('.comment-body');
    showMoreLink.addEventListener('click', function(e) {
        e.preventDefault();
        commentBody.classList.toggle('show-truncated');
        showMoreLink.textContent = commentBody.classList.contains('show-truncated') ? 'Show more' : 'Show less';
    });

    // Hide "Show more" if comment is short
    if (commentBody.scrollHeight <= commentBody.clientHeight + 1) {
        showMoreLink.style.display = 'none';
    }
}


    /*========HANDLE FETCHING COMMENT==========*/
                  
    function fetchComments() {
        fetch('/get-comments')
            .then(res => res.json())
            .then(comments => {
                comments.forEach(comment => {
                    appendComment(comment.comment_text, comment.full_name, comment.created_at);
                    });
                })

            .catch(err => console.error("❌ Failed to fetch comments:", err));
    }

    fetchComments();
    
    
    //=======REACTION CONTAINER----HAVE TO BE UPDATE FROM DB STORAGE-----IN THE FUTURE
    const commentContainer = document.querySelector('#postedComments');

    if (!commentContainer) {
        console.warn('Comment container not found!');
        return;
    }

    commentContainer.addEventListener('click', (event) => {
        if (event.target.classList.contains('comment-like')) {
            toggleReaction(event.target, 'liked');
        }

        if (event.target.classList.contains('comment-dislike')) {
            toggleReaction(event.target, 'disliked');
        }
    });


    function toggleReaction(icon, toggleClass) {
    const countSpan = icon.nextElementSibling;
    const isActive = icon.classList.contains(toggleClass);
    let count = parseInt(icon.getAttribute('data-count')) || 0;

    if (isActive) {
        count = Math.max(0, count - 1);
        icon.classList.remove(toggleClass);
        icon.setAttribute('aria-pressed', 'false');
    } else {
        count += 1;
        icon.classList.add(toggleClass);
        icon.setAttribute('aria-pressed', 'true');
    }

    icon.setAttribute('data-count', count);
    countSpan.textContent = count;

    // Optionally: Update the server with the new reaction count
    const commentId = icon.getAttribute('data-comment-id');
    fetch(`/update-reaction/${commentId}`, {
        method: 'POST',
        body: JSON.stringify({ reactionType: toggleClass, count: count }),
        headers: {
            'Content-Type': 'application/json',
        },
    })
    .then(response => response.json())
    .then(data => {
        console.log('Reaction updated:', data);
    })
    .catch(err => console.error('Error updating reaction:', err));
}



       

});

    
