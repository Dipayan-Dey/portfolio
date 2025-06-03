  // Default skills data
        const defaultSkills = [
            { id: 1, name: 'Python', level: 90, category: 'Languages', image: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg', color: 'linear-gradient(135deg, #3776ab, #4584b6)' },
            { id: 2, name: 'C', level: 75, category: 'Languages', image: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/c/c-original.svg', color: 'linear-gradient(135deg, #00599c, #004481)' },
            { id: 3, name: 'Java', level: 70, category: 'Languages', image: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/java/java-original.svg', color: 'linear-gradient(135deg, #ed8b00, #f89820)' },
            { id: 4, name: 'JavaScript', level: 85, category: 'Languages', image: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg', color: 'linear-gradient(135deg, #f7df1e, #f0d000)' },
            { id: 5, name: 'NumPy', level: 85, category: 'Libraries', image: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/numpy/numpy-original.svg', color: 'linear-gradient(135deg, #013243, #4dabcf)' },
            { id: 6, name: 'Pandas', level: 90, category: 'Libraries', image: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/pandas/pandas-original.svg', color: 'linear-gradient(135deg, #150458, #3776ab)' },
            { id: 7, name: 'Seaborn', level: 80, category: 'Libraries', image: 'https://seaborn.pydata.org/_images/logo-mark-lightbg.svg', color: 'linear-gradient(135deg, #4c72b0, #55a3ff)' },
            { id: 8, name: 'Matplotlib', level: 85, category: 'Libraries', image: 'https://matplotlib.org/_static/images/logo2.svg', color: 'linear-gradient(135deg, #11557c, #4c72b0)' },
            { id: 9, name: 'Jupyter Notebook', level: 90, category: 'Tools', image: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/jupyter/jupyter-original.svg', color: 'linear-gradient(135deg, #f37626, #f57c00)' },
            { id: 10, name: 'GitHub', level: 80, category: 'Tools', image: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/github/github-original.svg', color: 'linear-gradient(135deg, #24292e, #586069)' },
            { id: 11, name: 'Excel', level: 85, category: 'Tools', image: 'https://img.icons8.com/color/96/microsoft-excel-2019.png', color: 'linear-gradient(135deg, #217346, #0f5132)' },
            { id: 12, name: 'Power BI', level: 75, category: 'Tools', image: 'https://img.icons8.com/color/96/power-bi.png', color: 'linear-gradient(135deg, #f2c811, #f8d616)' },
            { id: 13, name: 'MySQL', level: 70, category: 'Database', image: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mysql/mysql-original.svg', color: 'linear-gradient(135deg, #00758f, #f29111)' },
            { id: 14, name: 'CSV Files', level: 95, category: 'Data Formats', image: 'https://img.icons8.com/color/96/csv.png', color: 'linear-gradient(135deg, #10b981, #059669)' },
            { id: 15, name: 'XLSX Files', level: 85, category: 'Data Formats', image: 'https://img.icons8.com/color/96/microsoft-excel-2019.png', color: 'linear-gradient(135deg, #217346, #0f5132)' },
            { id: 16, name: 'JSON Files', level: 85, category: 'Data Formats', image: 'https://img.icons8.com/color/96/json.png', color: 'linear-gradient(135deg, #0ea5e9, #0284c7)' }
        ];

        // Use in-memory storage instead of localStorage
        let skills = [...defaultSkills];
        let currentFilter = 'All';
        let editingSkillId = null;

        // Initialize particles
        function createParticles() {
            const container = document.getElementById('particles');
            for (let i = 0; i < 50; i++) {
                const particle = document.createElement('div');
                particle.className = 'particle';
                particle.style.left = Math.random() * 100 + '%';
                particle.style.top = Math.random() * 100 + '%';
                particle.style.animationDelay = Math.random() * 6 + 's';
                container.appendChild(particle);
            }
        }

        function getSkillLevelInfo(level) {
            if (level >= 85) return { text: 'Expert', color: '#10b981' };
            if (level >= 70) return { text: 'Advanced', color: '#3b82f6' };
            if (level >= 50) return { text: 'Proficient', color: '#f59e0b' };
            return { text: 'Beginner', color: '#6b7280' };
        }

        function renderSkills() {
            const grid = document.getElementById('skillsGrid');
            const filteredSkills = currentFilter === 'All' ? skills : skills.filter(skill => skill.category === currentFilter);
            
            grid.innerHTML = filteredSkills.map((skill, index) => {
                const levelInfo = getSkillLevelInfo(skill.level);
                return `
                    <div class="skill-card" 
                         style="--skill-color: ${skill.color}; --skill-level-color: ${levelInfo.color}"
                         data-aos="fade-up"
                         data-aos-duration="300"
                         data-aos-delay="${index * 100}"
                         >
                        <div class="skill-header">
                            <img src="${skill.image}" alt="${skill.name}" class="skill-icon" onerror="this.style.display='none'; this.nextElementSibling.style.display='block';">
                            <div style="display:none; font-size: 2.5rem;">⚡</div>
                            <div class="skill-actions">
                                <button class="action-btn edit-btn" onclick="openEditModal(${skill.id})">✏️</button>
                                <button class="action-btn delete-btn" onclick="deleteSkill(${skill.id})">🗑️</button>
                            </div>
                        </div>
                        <div class="skill-info">
                            <h3>${skill.name}</h3>
                            <div class="skill-level" style="color: ${levelInfo.color}">${levelInfo.text}</div>
                            <div class="skill-progress">
                                <div class="skill-progress-fill" style="width: ${skill.level}%; background: ${skill.color}"></div>
                            </div>
                            <div class="skill-percentage" style="color: ${levelInfo.color}">${skill.level}%</div>
                        </div>
                    </div>
                `;
            }).join('');

            // Refresh AOS after rendering
            AOS.refresh();
        }

        function setFilter(category) {
            currentFilter = category;
            document.querySelectorAll('.filter-tab').forEach(tab => {
                tab.classList.toggle('active', tab.dataset.category === category);
            });
            renderSkills();
        }

        function openEditModal(skillId) {
            const skill = skills.find(s => s.id === skillId);
            if (skill) {
                editingSkillId = skillId;
                document.getElementById('editSkillName').value = skill.name;
                document.getElementById('editSkillImage').value = skill.image || '';
                document.getElementById('editSkillLevel').value = skill.level;
                document.getElementById('editSkillCategory').value = skill.category;
                document.getElementById('editLevelDisplay').textContent = skill.level + '%';
                document.getElementById('editModal').style.display = 'block';
            }
        }

        function closeEditModal() {
            document.getElementById('editModal').style.display = 'none';
            editingSkillId = null;
        }

        function saveEditSkill() {
            const skill = skills.find(s => s.id === editingSkillId);
            if (skill) {
                skill.name = document.getElementById('editSkillName').value;
                skill.image = document.getElementById('editSkillImage').value || 'https://img.icons8.com/color/96/code.png';
                skill.level = parseInt(document.getElementById('editSkillLevel').value);
                skill.category = document.getElementById('editSkillCategory').value;
                renderSkills();
                closeEditModal();
            }
        }

        function deleteSkill(skillId) {
            if (confirm('Are you sure you want to delete this skill?')) {
                skills = skills.filter(s => s.id !== skillId);
                renderSkills();
            }
        }

        function openAddModal() {
            document.getElementById('addSkillName').value = '';
            document.getElementById('addSkillImage').value = '';
            document.getElementById('addSkillLevel').value = 50;
            document.getElementById('addSkillCategory').value = 'Languages';
            document.getElementById('addLevelDisplay').textContent = '50%';
            document.getElementById('addModal').style.display = 'block';
        }

        function closeAddModal() {
            document.getElementById('addModal').style.display = 'none';
        }

        function addNewSkill() {
            const name = document.getElementById('addSkillName').value.trim();
            const imageUrl = document.getElementById('addSkillImage').value.trim();
            const level = parseInt(document.getElementById('addSkillLevel').value);
            const category = document.getElementById('addSkillCategory').value;

            if (name) {
                const colors = [
                    'linear-gradient(135deg, #8b5cf6, #a855f7)',
                    'linear-gradient(135deg, #ec4899, #f43f5e)',
                    'linear-gradient(135deg, #06b6d4, #0891b2)',
                    'linear-gradient(135deg, #84cc16, #65a30d)',
                    'linear-gradient(135deg, #f59e0b, #d97706)'
                ];
                
                const newSkill = {
                    id: Math.max(...skills.map(s => s.id)) + 1,
                    name,
                    level,
                    category,
                    image: imageUrl || 'https://img.icons8.com/color/96/code.png',
                    color: colors[Math.floor(Math.random() * colors.length)]
                };

                skills.push(newSkill);
                renderSkills();
                closeAddModal();
                
                // Show success message
                showNotification('Skill added successfully!', 'success');
            }
        }

        function updateLevelDisplay(type) {
            const slider = document.getElementById(type + 'SkillLevel');
            const display = document.getElementById(type + 'LevelDisplay');
            display.textContent = slider.value + '%';
        }

        // Notification system
        function showNotification(message, type = 'success') {
            const notification = document.createElement('div');
            notification.className = `notification ${type}`;
            notification.textContent = message;
            notification.style.cssText = `
                position: fixed;
                top: 20px;
                right: 20px;
                padding: 1rem 1.5rem;
                background: ${type === 'success' ? 'linear-gradient(135deg, #10b981, #059669)' : 'linear-gradient(135deg, #ef4444, #dc2626)'};
                color: white;
                border-radius: 8px;
                z-index: 3000;
                transform: translateX(100%);
                transition: transform 0.3s ease;
                box-shadow: 0 10px 25px rgba(0,0,0,0.3);
            `;
            document.body.appendChild(notification);
            
            setTimeout(() => notification.style.transform = 'translateX(0)', 100);
            setTimeout(() => {
                notification.style.transform = 'translateX(100%)';
                setTimeout(() => document.body.removeChild(notification), 300);
            }, 3000);
        }

        // Reset to defaults function
        function resetToDefaults() {
            if (confirm('Are you sure you want to reset all skills to default? This will remove all your custom skills.')) {
                skills = [...defaultSkills];
                renderSkills();
                showNotification('Skills reset to defaults!', 'success');
            }
        }

        // Event listeners
        document.querySelectorAll('.filter-tab').forEach(tab => {
            tab.addEventListener('click', () => setFilter(tab.dataset.category));
        });

        // Close modals when clicking outside
        window.addEventListener('click', (e) => {
            if (e.target.classList.contains('modal')) {
                e.target.style.display = 'none';
            }
        });

        // Initialize
        createParticles();
        renderSkills();