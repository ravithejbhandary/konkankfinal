class CustomNavbar extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: "open" });

        // Fetch dataset attributes
        const homeURL = this.dataset.home;
        const aboutURL = this.dataset.about;
        const newsURL = this.dataset.news;
        const pastEventsURL = this.dataset.pastEvents;
        const upcomingEventsURL = this.dataset.upcomingEvents;
        const galleryURL = this.dataset.gallery;
        const contactURL = this.dataset.contact;
        const logoURL = this.dataset.logo;
        const menuIconURL = this.dataset.menuIcon;

        const isAuthenticated = this.dataset.authenticated === "true";
        const profileURL = this.dataset.profile;
        const logoutURL = this.dataset.logout;
        const loginURL = this.dataset.login;
        const joinURL = this.dataset.join;

        this.shadowRoot.innerHTML = `
            <style>
                :host {
                    --primary-bg: black;
                    --text-color: white;
                    --button-bg: #ffbb00;
                    --button-text: black;
                    --hover-color: #ffcc33;
                }

                .navbar {
                    position: fixed;
                    top: 0;
                    left: 0;
                    width: 100%;
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    background: var(--primary-bg);
                    height: 75px;
                    padding: 10px 30px;
                    box-sizing: border-box;
                    z-index: 1000;
                }

                .logo img {
                    height: 70px;
                    transform: scale(1.2);
                    cursor: pointer;
                }

                .nav-links {
                    display: flex;
                    align-items: center;
                    gap: 35px;
                    list-style: none;
                    margin: 0;
                    padding: 0;
                }

                .nav-links a {
                    text-decoration: none;
                    color: var(--text-color);
                    font-size: 16px;
                    font-weight: 500;
                    transition: color 0.3s ease-in-out;
                }

                .nav-links a:hover {
                    color: var(--hover-color);
                }

                .dropdown {
                    position: relative;
                }

                /* ✅ FIXED: Ensure dropdown works on desktop */
                .dropdown-content {
                    visibility: hidden;
                    opacity: 0;
                    position: absolute;
                    background: var(--primary-bg);
                    min-width: 150px;
                    top: 100%; /* Ensure it drops below the Events tab */
                    left: 0;
                    border-radius: 6px;
                    box-shadow: 0 3px 6px rgba(255, 255, 255, 0.2);
                    flex-direction: column;
                    transition: opacity 0.3s ease, visibility 0.3s ease;
                    z-index: 1001; /* Ensure it's above other elements */
                }

                .dropdown:hover .dropdown-content {
                    visibility: visible;
                    opacity: 1;
                }

                .dropdown-content a {
                    display: block;
                    padding: 10px;
                    color: white;
                    text-decoration: none;
                    cursor: pointer;
                    transition: background 0.3s ease-in-out;
                }

                .dropdown-content a:hover {
                    background: var(--hover-color);
                    color: black;
                }

                .action-button {
                    background: var(--button-bg);
                    color: var(--button-text);
                    padding: 6px 15px;
                    border-radius: 25px;
                    text-decoration: none;
                    font-weight: 600;
                    border: none;
                    cursor: pointer;
                    transition: background 0.3s ease-in-out;
                    height: 35px;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                }

                .action-button:hover {
                    background: var(--hover-color);
                }

                .menu-toggle {
                    display: none;
                    cursor: pointer;
                }

                .menu-toggle img {
                    height: 35px;
                }

                /* ✅ Mobile Responsive Menu */
                @media (max-width: 768px) {
                    .menu-toggle {
                        display: block;
                    }

                    .nav-links {
                        display: none;
                        flex-direction: column;
                        background: var(--primary-bg);
                        position: absolute;
                        top: 75px;
                        right: 10px;
                        width: 230px;
                        padding: 15px;
                        border-radius: 8px;
                        box-shadow: 0 3px 6px rgba(255, 255, 255, 0.2);
                        text-align: center;
                    }

                    .nav-links.active {
                        display: flex;
                    }

                    /* Ensure dropdown in mobile does not overlap */
                    .dropdown-content {
                        position: relative;
                        background: none;
                        box-shadow: none;
                    }
                }
            </style>

            <nav class="navbar">
                <div class="logo">
                    <a href="${homeURL}">
                        <img src="${logoURL}" alt="Logo">
                    </a>
                </div>

                <div class="menu-toggle">
                    <img src="${menuIconURL}" alt="Menu">
                </div>

                <ul class="nav-links">
                    <li><a href="${homeURL}">Home</a></li>
                    <li><a href="${aboutURL}">About Us</a></li>
                    <li><a href="${newsURL}">News</a></li>

                    <li class="dropdown">
                        <a href="#">Events ▼</a>
                        <div class="dropdown-content">
                            <a href="${pastEventsURL}">Past Events</a>
                            <a href="${upcomingEventsURL}">Upcoming Events</a>
                        </div>
                    </li>

                    <li><a href="${galleryURL}">Gallery</a></li>
                    <li><a href="${contactURL}">Contact</a></li>

                    <!-- Authentication Handling -->
                    ${isAuthenticated ? `
                        <li><a href="${profileURL}">Profile</a></li>
                        <li><button class="action-button" id="logout-btn">Logout</button></li>
                    ` : `
                        <li><button class="action-button" id="join-btn">Join</button></li>
                        <li><button class="action-button" id="login-btn">Login</button></li>
                    `}
                </ul>
            </nav>
        `;

        // Event Listeners
        const menuToggle = this.shadowRoot.querySelector('.menu-toggle');
        const navLinks = this.shadowRoot.querySelector('.nav-links');
        const logoutButton = this.shadowRoot.querySelector('#logout-btn');
        const loginButton = this.shadowRoot.querySelector('#login-btn');
        const joinButton = this.shadowRoot.querySelector('#join-btn');

        // ✅ Mobile menu toggle
        if (menuToggle) {
            menuToggle.addEventListener('click', () => {
                navLinks.classList.toggle('active');
            });
        }

        // ✅ Logout Button
        if (logoutButton) {
            logoutButton.addEventListener('click', () => {
                window.location.href = logoutURL;
            });
        }

        // ✅ Login Button
        if (loginButton) {
            loginButton.addEventListener('click', () => {
                window.location.href = loginURL;
            });
        }


        if (joinButton) {
            joinButton.addEventListener('click', () => {
                window.location.href = joinURL; // Redirect to the join page
            });
        }

    }
}

customElements.define("custom-navbar", CustomNavbar);
