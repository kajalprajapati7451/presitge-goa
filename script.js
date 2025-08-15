  document.getElementById('current-year').textContent = new Date().getFullYear();
        
       
        document.getElementById('contactForm').addEventListener('submit', async function(e) {
            e.preventDefault();

            const formData = new FormData(this);
            const data = Object.fromEntries(formData.entries());

            try {
               
                const res = await fetch('https://your-web-service-url.vercel.app/contact', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(data)
                });

                const result = await res.json();
                document.getElementById('status').innerText = result.message;
                
                const successMsg = document.getElementById('form-success');
                successMsg.style.display = 'block';
                successMsg.classList.add('animate__animated', 'animate__fadeIn');
                
                this.reset();
                
                setTimeout(() => {
                    successMsg.style.display = 'none';
                }, 5000);
            } catch (error) {
                document.getElementById('status').innerText = 'Error submitting form. Please try again.';
            }
        });