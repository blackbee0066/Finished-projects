/*====================SHOW MENU===================== */
const navMenu = document.getElementById('navMenu');
const navClose = document.getElementById('navClose');
const navToggle = document.getElementById('navToggle');

navToggle.addEventListener('click', () => {
    navMenu.classList.add('show-menu')
});

/*============REMOVE MENU============== */
navClose.addEventListener("click", () => {
    navMenu.classList.remove('show-menu')
})


/*================ Search Input & Clear Button =================*/
const searchInput = document.getElementById("searchInput"); // Fix: Get the input field
    const clearBtn = document.getElementById("clearSearch");

    if (searchInput && clearBtn) {
        searchInput.addEventListener("input", function () {
            clearBtn.style.display = this.value.length > 0 ? "block" : "none"; // Show/hide 'X'
        });

        // Clear the input when 'X' is clicked
        clearBtn.addEventListener("click", function () {
            searchInput.value = "";
            clearBtn.style.display = "none"; // Hide 'X'
            searchInput.focus(); // Keep focus in input field
        });
    }

    /*===============SEARCH MOBILE DEVICES ==================*/

    /*-----------SHOW SEARCH------------- */
    const search = document.getElementById('search');
          searchBtn = document.getElementById('searchBtn');
          searchClose = document.getElementById('searchClose');

          searchBtn.addEventListener('click', () => {
            search.classList.add('show-search');
          });

    /*-----------HIDE SEARCH-------------*/
          searchClose.addEventListener('click', () => {
            search.classList.remove('show-search');
          })



/*============LOGIN==============*/

const login = document.getElementById('login'),
      loginBtn = document.getElementById('loginBtn'),
      closeLogin = document.getElementById('closeLogin')
      
      /*----------show login----------- */
      loginBtn.addEventListener('click', () => {
        login.classList.add('show-login')
      });

      /*------hide login--------*/
      closeLogin.addEventListener("click", () => {
        login.classList.remove('show-login')
      })