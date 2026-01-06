// Year 13 CS Calendar - Current Week Highlighter
// This script automatically highlights the current week in the calendar

(function() {
    'use strict';
    
    /**
     * Initialize the calendar when DOM is ready
     */
    function initCalendar() {
        highlightCurrentWeek();
        addScrollToCurrentWeek();
    }
    
    /**
     * Highlight the current week based on today's date
     */
    function highlightCurrentWeek() {
        const currentDate = new Date();
        const weekBlocks = document.querySelectorAll('.week-block');
        
        weekBlocks.forEach(block => {
            const weekDate = getWeekDate(block);
            
            if (weekDate) {
                const diffDays = getDaysDifference(currentDate, weekDate);
                
                // Highlight if within the current week (0-6 days from week start)
                if (diffDays >= 0 && diffDays < 7) {
                    block.classList.add('current-week');
                    block.setAttribute('data-current', 'true');
                }
            }
        });
    }
    
    /**
     * Extract and parse the week date from a week block
     * @param {HTMLElement} block - The week block element
     * @returns {Date|null} - The parsed date or null if invalid
     */
    function getWeekDate(block) {
        const dateElement = block.querySelector('.week-date');
        if (!dateElement) return null;
        
        const dateText = dateElement.textContent.trim();
        const [day, month, year] = dateText.split('/').map(num => parseInt(num, 10));
        
        if (!day || !month || !year) return null;
        
        // JavaScript months are 0-indexed
        return new Date(year, month - 1, day);
    }
    
    /**
     * Calculate the difference in days between two dates
     * @param {Date} date1 - The first date (usually today)
     * @param {Date} date2 - The second date (week start date)
     * @returns {number} - Number of days difference
     */
    function getDaysDifference(date1, date2) {
        const oneDay = 24 * 60 * 60 * 1000; // milliseconds in a day
        return Math.floor((date1 - date2) / oneDay);
    }
    
    /**
     * Add smooth scroll to current week functionality
     */
    function addScrollToCurrentWeek() {
        const currentWeek = document.querySelector('.current-week');
        
        if (currentWeek) {
            // Add a "Jump to Current Week" button
            createJumpButton(currentWeek);
            
            // Optional: Auto-scroll on load (commented out by default)
            // setTimeout(() => {
            //     currentWeek.scrollIntoView({ behavior: 'smooth', block: 'center' });
            // }, 500);
        }
    }
    
    /**
     * Create a button to jump to current week
     * @param {HTMLElement} currentWeek - The current week element
     */
    function createJumpButton(currentWeek) {
        const timeline = document.querySelector('.timeline');
        if (!timeline) return;
        
        const button = document.createElement('button');
        button.textContent = '📍 Jump to Current Week';
        button.className = 'jump-to-current';
        button.style.cssText = `
            position: fixed;
            bottom: 30px;
            right: 30px;
            padding: 12px 24px;
            background: #e74c3c;
            color: white;
            border: none;
            border-radius: 25px;
            font-size: 1em;
            font-weight: 600;
            cursor: pointer;
            box-shadow: 0 4px 15px rgba(231, 76, 60, 0.4);
            transition: all 0.3s ease;
            z-index: 1000;
        `;
        
        // Hover effect
        button.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-3px)';
            this.style.boxShadow = '0 6px 20px rgba(231, 76, 60, 0.6)';
        });
        
        button.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
            this.style.boxShadow = '0 4px 15px rgba(231, 76, 60, 0.4)';
        });
        
        // Click handler
        button.addEventListener('click', function() {
            currentWeek.scrollIntoView({ behavior: 'smooth', block: 'center' });
        });
        
        document.body.appendChild(button);
    }
    
    /**
     * Add date utilities for debugging or future features
     */
    const DateUtils = {
        /**
         * Format a date as DD/MM/YYYY
         * @param {Date} date
         * @returns {string}
         */
        formatDate: function(date) {
            const day = String(date.getDate()).padStart(2, '0');
            const month = String(date.getMonth() + 1).padStart(2, '0');
            const year = date.getFullYear();
            return `${day}/${month}/${year}`;
        },
        
        /**
         * Get the week number of the year
         * @param {Date} date
         * @returns {number}
         */
        getWeekNumber: function(date) {
            const d = new Date(Date.UTC(date.getFullYear(), date.getMonth(), date.getDate()));
            const dayNum = d.getUTCDay() || 7;
            d.setUTCDate(d.getUTCDate() + 4 - dayNum);
            const yearStart = new Date(Date.UTC(d.getUTCFullYear(), 0, 1));
            return Math.ceil((((d - yearStart) / 86400000) + 1) / 7);
        }
    };
    
    // Make DateUtils available globally for console debugging
    window.CalendarUtils = DateUtils;
    
    // Initialize when DOM is loaded
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initCalendar);
    } else {
        initCalendar();
    }
    
    // Log initialization for debugging
    console.log('📅 Year 13 CS Calendar initialized');
    console.log('Current date:', DateUtils.formatDate(new Date()));
    
})();
