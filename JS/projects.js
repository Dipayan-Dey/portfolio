  // Default project data (your existing projects)
        const defaultProjects = [
            {
                id: 1,
                title: "ALL IPL DATA",
                category: "data-analysis",
                description: "Comprehensive analysis of Indian Premier League cricket data including player statistics, team performance, and match outcomes across multiple seasons.",
                technologies: ["Python", "Pandas", "Matplotlib", "Seaborn"],
                date: "3 months ago",
                icon: "🏏",
                github: ""
            },
            {
                id: 2,
                title: "Apple Sales Analysis",
                category: "data-analysis",
                description: "In-depth analysis of Apple product sales data, exploring trends, seasonal patterns, and customer preferences across different product categories.",
                technologies: ["Python", "NumPy", "Plotly", "SQL"],
                date: "3 months ago",
                icon: "📱",
                github: ""
            },
            {
                id: 3,
                title: "Customer Churn Analysis",
                category: "machine-learning",
                description: "Predictive analysis to identify customers likely to churn, using machine learning algorithms to help businesses retain customers.",
                technologies: ["Python", "Scikit-learn", "XGBoost", "Pandas"],
                date: "3 months ago",
                icon: "📊",
                github: ""
            },
            {
                id: 4,
                title: "Netflix Analysis",
                category: "data-analysis",
                description: "Analysis of Netflix content library, exploring content trends, genre distributions, and viewing patterns across different regions.",
                technologies: ["Python", "Matplotlib", "Seaborn", "Pandas"],
                date: "2 months ago",
                icon: "🎬",
                github: ""
            },
            {
                id: 5,
                title: "Retail Sale Analysis",
                category: "data-analysis",
                description: "Comprehensive retail sales analysis examining customer behavior, product performance, and seasonal trends to optimize business strategies.",
                technologies: ["Python", "Pandas", "Tableau", "SQL"],
                date: "2 months ago",
                icon: "🛍️",
                github: ""
            },
            {
                id: 6,
                title: "Student Performance Analysis",
                category: "data-analysis",
                description: "Educational data analysis examining factors affecting student academic performance, identifying key predictors of success.",
                technologies: ["Python", "Pandas", "Matplotlib", "Statsmodels"],
                date: "1 month ago",
                icon: "🎓",
                github: ""
            },
            {
                id: 7,
                title: "World Population Analysis",
                category: "data-analysis",
                description: "Global demographic analysis exploring population trends, growth patterns, and demographic transitions across different countries and regions.",
                technologies: ["Python", "Geopandas", "Plotly", "Pandas"],
                date: "1 month ago",
                icon: "🌍",
                github: ""
            },
            {
                id: 8,
                title: "Zomato Analysis",
                category: "data-analysis",
                description: "Food delivery platform analysis examining restaurant ratings, customer preferences, and market trends in the food delivery industry.",
                technologies: ["Python", "Pandas", "Seaborn", "Folium"],
                date: "3 weeks ago",
                icon: "🍔",
                github: ""
            }
        ];

        // Load projects from localStorage or use default
        let projects = loadProjects();
        let filteredProjects = [...projects];

        // LocalStorage functions
        function saveProjects() {
            localStorage.setItem('portfolioProjects', JSON.stringify(projects));
        }

        function loadProjects() {
            const savedProjects = localStorage.getItem('portfolioProjects');
            if (savedProjects) {
                return JSON.parse(savedProjects);
            } else {
                // First time - save default projects to localStorage
                localStorage.setItem('portfolioProjects', JSON.stringify(defaultProjects));
                return [...defaultProjects];
            }
        }

        // Initialize the page
        document.addEventListener('DOMContentLoaded', function() {
            createParticles();
            renderProjects();
            setupEventListeners();
        });

        // Create animated background particles
        function createParticles() {
            const particlesContainer = document.getElementById('particles');
            const particleCount = 20;

            for (let i = 0; i < particleCount; i++) {
                const particle = document.createElement('div');
                particle.className = 'particle';
                
                const size = Math.random() * 4 + 2;
                const startX = Math.random() * window.innerWidth;
                const duration = Math.random() * 10 + 10;
                const delay = Math.random() * 5;

                particle.style.width = size + 'px';
                particle.style.height = size + 'px';
                particle.style.left = startX + 'px';
                particle.style.animationDuration = duration + 's';
                particle.style.animationDelay = delay + 's';

                particlesContainer.appendChild(particle);
            }
        }

        // Setup event listeners
        function setupEventListeners() {
            // Search functionality
            document.getElementById('searchInput').addEventListener('input', function() {
                const searchTerm = this.value.toLowerCase();
                filteredProjects = projects.filter(project => 
                    project.title.toLowerCase().includes(searchTerm) ||
                    project.description.toLowerCase().includes(searchTerm) ||
                    project.technologies.some(tech => tech.toLowerCase().includes(searchTerm))
                );
                renderProjects();
            });

            // Filter functionality
            document.querySelectorAll('.filter-btn').forEach(btn => {
                btn.addEventListener('click', function() {
                    // Update active filter
                    document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
                    this.classList.add('active');

                    const filter = this.dataset.filter;
                    if (filter === 'all') {
                        filteredProjects = [...projects];
                    } else {
                        filteredProjects = projects.filter(project => project.category === filter);
                    }
                    renderProjects();
                });
            });

            // Form submission
            document.getElementById('projectForm').addEventListener('submit', function(e) {
                e.preventDefault();
                addNewProject();
            });
        }

        // Render projects to the grid
        function renderProjects() {
            const grid = document.getElementById('projectsGrid');
            const noProjectsEl = document.getElementById('noProjects');

            if (filteredProjects.length === 0) {
                grid.style.display = 'none';
                noProjectsEl.style.display = 'block';
                return;
            }

            grid.style.display = 'grid';
            noProjectsEl.style.display = 'none';

            grid.innerHTML = filteredProjects.map(project => `
                <div class="project-card" onclick="viewProject(${project.id})">
                    <div class="project-image">
                        <div class="project-icon">${project.icon}</div>
                    </div>
                    <div class="project-content">
                        <div class="project-header">
                            <div>
                                <h3 class="project-title">${project.title}</h3>
                                <span class="project-category">${getCategoryLabel(project.category)}</span>
                            </div>
                        </div>
                        <p class="project-description">${project.description}</p>
                        <div class="project-tech">
                            ${project.technologies.map(tech => `<span class="tech-tag">${tech}</span>`).join('')}
                        </div>
                        <div class="project-footer">
                            <span class="project-date">${project.date}</span>
                            <div class="project-actions">
                                <button class="action-btn" onclick="event.stopPropagation(); viewProject(${project.id})" title="View Details">👁️</button>
                                <button class="action-btn" onclick="event.stopPropagation(); editProject(${project.id})" title="Edit Project" style="display:none">✏️</button>
                                <button class="action-btn" onclick="event.stopPropagation(); duplicateProject(${project.id})" title="Duplicate" style="display:none">📋</button>
                                ${project.github ? `<button class="action-btn" onclick="event.stopPropagation(); window.open('${project.github}', '_blank')" title="GitHub">🔗</button>` : ''}
                                <button class="action-btn" onclick="event.stopPropagation(); deleteProject(${project.id})" title="Delete" style="display:none">🗑️</button>
                            </div>
                        </div>
                    </div>
                </div>
            `).join('');
        }

        // Get category label
        function getCategoryLabel(category) {
            const labels = {
                'data-analysis': 'Data Analysis',
                'web-dev': 'Web Dev',
                'mobile': 'Mobile',
                'machine-learning': 'ML/AI'
            };
            return labels[category] || category;
        }

        // Modal state
        let isEditMode = false;
        let editingProjectId = null;

        // Modal functions
        function openModal() {
            isEditMode = false;
            editingProjectId = null;
            document.getElementById('modalTitle').textContent = 'Add New Project';
            document.getElementById('submitBtn').textContent = 'Add Project';
            document.getElementById('projectModal').style.display = 'flex';
        }

        function closeModal() {
            document.getElementById('projectModal').style.display = 'none';
            document.getElementById('projectForm').reset();
            isEditMode = false;
            editingProjectId = null;
        }

        // Add/Edit project
        function addNewProject() {
            const title = document.getElementById('projectTitle').value;
            const category = document.getElementById('projectCategory').value;
            const description = document.getElementById('projectDescription').value;
            const techInput = document.getElementById('projectTech').value;
            const github = document.getElementById('projectGithub').value;
            const icon = document.getElementById('projectIcon').value || getRandomIcon(category);

            const technologies = techInput.split(',').map(tech => tech.trim()).filter(tech => tech);
            
            if (isEditMode && editingProjectId) {
                // Edit existing project
                const projectIndex = projects.findIndex(p => p.id === editingProjectId);
                if (projectIndex !== -1) {
                    projects[projectIndex] = {
                        ...projects[projectIndex],
                        title,
                        category,
                        description,
                        technologies,
                        github,
                        icon,
                        date: projects[projectIndex].date // Keep original date
                    };
                    showNotification('Project updated successfully!', 'success');
                }
            } else {
                // Add new project
                const newProject = {
                    id: Date.now(),
                    title,
                    category,
                    description,
                    technologies,
                    github,
                    date: 'Just now',
                    icon
                };
                projects.unshift(newProject);
                showNotification('Project added successfully!', 'success');
            }

            filteredProjects = [...projects];
            saveProjects(); // Save to localStorage
            renderProjects();
            closeModal();
        }

        // Edit project
        function editProject(id) {
            const project = projects.find(p => p.id === id);
            if (!project) return;

            // Set edit mode
            isEditMode = true;
            editingProjectId = id;

            // Update modal title and button
            document.getElementById('modalTitle').textContent = 'Edit Project';
            document.getElementById('submitBtn').textContent = 'Update Project';

            // Populate form with existing data
            document.getElementById('projectTitle').value = project.title;
            document.getElementById('projectCategory').value = project.category;
            document.getElementById('projectDescription').value = project.description;
            document.getElementById('projectTech').value = project.technologies.join(', ');
            document.getElementById('projectIcon').value = project.icon;
            document.getElementById('projectGithub').value = project.github || '';

            // Open modal
            document.getElementById('projectModal').style.display = 'flex';
        }

        // Duplicate project
        function duplicateProject(id) {
            const project = projects.find(p => p.id === id);
            if (!project) return;

            const duplicatedProject = {
                ...project,
                id: Date.now(),
                title: project.title + ' (Copy)',
                date: 'Just now'
            };

            projects.unshift(duplicatedProject);
            filteredProjects = [...projects];
            saveProjects();
            renderProjects();
            showNotification('Project duplicated successfully!', 'success');
        }

        // Get random icon based on category
        function getRandomIcon(category) {
            const icons = {
                'data-analysis': ['📊', '📈', '📉', '🔍', '💹'],
                'web-dev': ['🌐', '💻', '🖥️', '⚡', '🚀'],
                'mobile': ['📱', '📲', '💾', '⚙️', '🔧'],
                'machine-learning': ['🤖', '🧠', '⚡', '🔬', '🎯']
            };
            const categoryIcons = icons[category] || ['💼'];
            return categoryIcons[Math.floor(Math.random() * categoryIcons.length)];
        }

        // View project details (Enhanced)
        function viewProject(id) {
            const project = projects.find(p => p.id === id);
            if (!project) return;

            const techList = project.technologies.join(', ');
            const githubLink = project.github ? `\n\nGitHub: ${project.github}` : '';
            
            const details = `
🎯 Project: ${project.title}
📂 Category: ${getCategoryLabel(project.category)}
📅 Date: ${project.date}
${project.icon} 

📝 Description:
${project.description}

🛠️ Technologies:
${techList}${githubLink}
            `.trim();

            alert(details);
        }

        // Delete project
        function deleteProject(id) {
            if (confirm('Are you sure you want to delete this project?')) {
                projects = projects.filter(p => p.id !== id);
                filteredProjects = filteredProjects.filter(p => p.id !== id);
                saveProjects(); // Save to localStorage
                renderProjects();
                showNotification('Project deleted successfully!', 'error');
            }
        }

        // Show notification
        function showNotification(message, type = 'success') {
            const notification = document.createElement('div');
            notification.className = `notification ${type}`;
            notification.innerHTML = `
                <span>${message}</span>
                <button onclick="this.parentElement.remove()">&times;</button>
            `;
            document.body.appendChild(notification);
            
            setTimeout(() => {
                if (notification.parentElement) {
                    notification.remove();
                }
            }, 3000);
        }

        // Reset to default projects
        function resetProjects() {
            if (confirm('Are you sure you want to reset all projects to default? This will delete all custom projects.')) {
                projects = [...defaultProjects];
                filteredProjects = [...projects];
                saveProjects();
                renderProjects();
                showNotification('Projects reset to default!', 'success');
            }
        }

        // Close modal when clicking outside
        window.onclick = function(event) {
            const modal = document.getElementById('projectModal');
            if (event.target === modal) {
                closeModal();
            }
        }
