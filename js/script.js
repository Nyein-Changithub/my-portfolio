/* ============================ typing animation =========================== */
var typed = new Typed(".typing",{
    strings:["", "Web Developer", "Web Designer", "Graphic Designer", "YouTuber"],
    typeSpeed:100,
    backSpeed:60,
    loop:true
})
/* ============================ Aside =========================== */

const nav = document.querySelector(".nav"),
      navList = nav.querySelectorAll("li"),
      totalNavList = navList.length,
      allSection = document.querySelectorAll(".section"),
      totalSection = allSection.length;
      for(let i=0; i<totalNavList; i++)
      {
            const a = navList[i].querySelector("a");
            a.addEventListener("click", function()
            {
                for( i=0; i<totalSection; i++)
                {
                    allSection[i].classList.remove("back-section");
                }

                for(let j=0; j < totalNavList; j++)
                {
                    if(navList[j].querySelector("a").classList.contains("active"))
                    {
                       allSection[j].classList.add("back-section");
                    }
                    navList[j].querySelector("a").classList.remove("active");
                }
                this.classList.add("active")
                showSection(this);
                if(window.innerWidth < 1200)
                {
                    asideSectionTogglerBtn();
                }
            })
      }
      function showSection(element)
      {
        for( i=0; i<totalSection; i++)
        {
            allSection[i].classList.remove("active");
        }
        const target = element.getAttribute("href").split("#")[1];
        document.querySelector("#" + target).classList.add("active");
      }
      function updateNav(element)
      {
        for(let i=0; i<totalNavList; i++)
        {
            navList[i].querySelector("a").classList.remove("active");
            const target = element.getAttribute("href").split("#")[1];
            if(target === navList[i].querySelector("a").getAttribute("href").split("#")[1])
            {
                navList[i].querySelector("a").classList.add("active");
            }
        }
      }
      document.querySelector(".hire-me").addEventListener("click" , function()
      {
        showSection(this);
        updateNav(this);
      })
      const navTogglerBtn = document.querySelector(".nav-toggler"),
            aside = document.querySelector(".aside");
            navTogglerBtn.addEventListener("click" , () =>
            {
                asideSectionTogglerBtn();
            })
            function asideSectionTogglerBtn()
            {
                aside.classList.toggle("open");
                navTogglerBtn.classList.toggle("open");
                for(let  i= 0; i < totalSection; i++)
                {
                    allSection[i].classList.toggle("open");
                }
            }

// Form Validation and Submission
document.getElementById('contactForm').addEventListener('submit', function(e) {
    e.preventDefault();
    
    if (validateForm()) {
        // Show loading state
        const submitBtn = this.querySelector('button[type="submit"]');
        const originalText = submitBtn.textContent;
        submitBtn.textContent = 'Sending...';
        submitBtn.disabled = true;

        // Submit form to Formspree
        fetch(this.action, {
            method: 'POST',
            body: new FormData(this),
            headers: {
                'Accept': 'application/json'
            }
        })
        .then(response => {
            if (response.ok) {
                // Success message
                alert('Thank you for your message! I will get back to you soon.');
                this.reset();
                resetFormStyles();
            } else {
                // Error message
                throw new Error('Form submission failed');
            }
        })
        .catch(error => {
            alert('Oops! There was a problem submitting your form. Please try again.');
        })
        .finally(() => {
            // Reset button
            submitBtn.textContent = originalText;
            submitBtn.disabled = false;
        });
    }
});

function validateForm() {
    const form = document.getElementById('contactForm');
    const name = form.querySelector('input[name="name"]');
    const email = form.querySelector('input[name="email"]');
    const subject = form.querySelector('input[name="subject"]');
    const message = form.querySelector('textarea[name="message"]');
    
    let isValid = true;

    // Reset previous errors
    resetFormStyles();

    // Name validation
    if (name.value.trim().length < 2) {
        showError(name, 'Name must be at least 2 characters');
        isValid = false;
    }

    // Email validation
    if (!isValidEmail(email.value)) {
        showError(email, 'Please enter a valid email address');
        isValid = false;
    }

    // Subject validation
    if (subject.value.trim().length < 3) {
        showError(subject, 'Subject must be at least 3 characters');
        isValid = false;
    }

    // Message validation
    if (message.value.trim().length < 10) {
        showError(message, 'Message must be at least 10 characters');
        isValid = false;
    }

    return isValid;
}

function isValidEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function showError(input, message) {
    const formGroup = input.parentElement;
    const errorDisplay = formGroup.querySelector('.error-message');
    input.classList.add('error');
    errorDisplay.textContent = message;
}

function resetFormStyles() {
    const form = document.getElementById('contactForm');
    const inputs = form.querySelectorAll('.form-control');
    const errors = form.querySelectorAll('.error-message');
    
    inputs.forEach(input => {
        input.classList.remove('error', 'success');
    });
    
    errors.forEach(error => {
        error.textContent = '';
    });
}