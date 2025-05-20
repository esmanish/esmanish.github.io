/**
 * Adds a feature item to the features grid
 * @param {string} icon - SVG string for the feature icon
 * @param {string} name - Feature name
 * @param {string} value - Feature value/description
 */
function addFeatureItem(icon, name, value) {
    const featuresGrid = document.getElementById('features-grid');
    
    const featureItem = document.createElement('div');
    featureItem.className = 'feature-item';
    
    featureItem.innerHTML = `
        <div class="feature-icon">
            ${icon}
        </div>
        <div class="feature-details">
            <div class="feature-name">${name}</div>
            <div class="feature-value">${value}</div>
        </div>
    `;
    
    featuresGrid.appendChild(featureItem);
}

/**
 * Creates the feature summary at the top of the timeline
 * @param {number} fdpSessions - Number of faculty development sessions
 * @param {number} videoCount - Number of tutorial videos
 * @param {number} supportMonths - Number of support months
 * @param {boolean} aiIntegration - Whether AI integration is included
 */
function createFeatureSummary(fdpSessions, videoCount, supportMonths, aiIntegration) {
    const featuresGrid = document.getElementById('features-grid');
    featuresGrid.innerHTML = ''; // Clear existing content
    
    // Add base features that are always included
    addFeatureItem(
        '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"></path><polyline points="3.27 6.96 12 12.01 20.73 6.96"></polyline><line x1="12" y1="22.08" x2="12" y2="12"></line></svg>',
        'AR/VR Modules',
        '12 Interactive Modules'
    );
    
    addFeatureItem(
        '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"></path><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"></path></svg>',
        'GitHub Codebase',
        'Full Repository Access'
    );
    
    addFeatureItem(
        '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><polyline points="14 2 14 8 20 8"></polyline><line x1="16" y1="13" x2="8" y2="13"></line><line x1="16" y1="17" x2="8" y2="17"></line><polyline points="10 9 9 9 8 9"></polyline></svg>',
        'Documentation',
        'Comprehensive Guides'
    );
    
    // Add conditional features
    if (fdpSessions > 0) {
        addFeatureItem(
            '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 10v6M2 10l10-5 10 5-10 5z"></path><path d="M6 12v5c3 3 9 3 12 0v-5"></path></svg>',
            'Faculty Development',
            `${fdpSessions} Training Session${fdpSessions > 1 ? 's' : ''}`
        );
    }
    
    if (videoCount > 0) {
        let videoQuality = 'Basic';
        if (videoCount > 6) videoQuality = 'Advanced';
        else if (videoCount > 3) videoQuality = 'Standard';
        
        addFeatureItem(
            '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polygon points="23 7 16 12 23 17 23 7"></polygon><rect x="1" y="5" width="15" height="14" rx="2" ry="2"></rect></svg>',
            'Tutorial Videos',
            `${videoCount} ${videoQuality} Videos`
        );
    }
    
    if (supportMonths > 0) {
        addFeatureItem(
            '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"></path></svg>',
            'Technical Support',
            `${supportMonths} Month${supportMonths > 1 ? 's' : ''}`
        );
    }
    
    if (aiIntegration) {
        addFeatureItem(
            '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="4"></circle><path d="M16 8v5a3 3 0 0 0 6 0v-1a10 10 0 1 0-3.92 7.94"></path></svg>',
            'AI Integration',
            'Enhanced Learning Features'
        );
    }
}

/**
 * AR/VR Course Development Timeline JavaScript
 * This script handles the display and interaction for the timeline page.
 */

document.addEventListener('DOMContentLoaded', function() {
    // Parse URL parameters to get selected features
    const params = new URLSearchParams(window.location.search);
    const fdpSessions = parseInt(params.get('fdp')) || 0;
    const videoCount = parseInt(params.get('videos')) || 0;
    const supportMonths = parseInt(params.get('support')) || 0;
    const aiIntegration = params.get('ai') === '1';
    
    // Create feature summary
    createFeatureSummary(fdpSessions, videoCount, supportMonths, aiIntegration);
    
    // Update timeline based on selected features
    updateTimelineFeatures(fdpSessions, videoCount, supportMonths, aiIntegration);
    
    // Set up event listeners for phase selection
    document.querySelectorAll('.phase').forEach(phase => {
        phase.addEventListener('click', function() {
            const phaseId = this.getAttribute('data-phase');
            showPhase(phaseId);
        });
    });
});

/**
 * Updates the timeline content based on selected features
 * @param {number} fdpSessions - Number of faculty development sessions
 * @param {number} videoCount - Number of tutorial videos
 * @param {number} supportMonths - Number of support months
 * @param {boolean} aiIntegration - Whether AI integration is included
 */
function updateTimelineFeatures(fdpSessions, videoCount, supportMonths, aiIntegration) {
    // Count the number of extra features selected
    let featureCount = 0;
    let timelineWeeks = 4; // Base timeline length
    
    if (videoCount > 0) featureCount++;
    if (aiIntegration) featureCount++;
    
    // Calculate timeline length based on features
    if (featureCount === 0) {
        timelineWeeks = 4; // Base: just modules and GitHub
    } else if (featureCount === 1) {
        if (videoCount <= 3) {
            timelineWeeks = 5; // Base + few videos or Base + AI
        } else {
            timelineWeeks = 6; // Base + many videos
        }
    } else {
        if (videoCount <= 6) {
            timelineWeeks = 6; // Base + videos + AI (medium complexity)
        } else {
            timelineWeeks = 7; // Base + many videos + AI (most complex)
        }
    }
    
    // Update timeline weeks text
    document.getElementById('timeline-weeks').textContent = `${Math.min(4, timelineWeeks)}-${timelineWeeks}`;
    
    // Update development phase end week
    document.getElementById('dev-week-end').textContent = timelineWeeks - 1;
    
    // Update modules development end week
    document.getElementById('modules-week-end').textContent = timelineWeeks - 2;
    
    // Update GitHub development end week
    document.getElementById('github-week-end').textContent = timelineWeeks - 2;
    
    // Update finalization phase weeks
    document.getElementById('final-week-start').textContent = timelineWeeks - 1;
    document.getElementById('final-week-end').textContent = timelineWeeks;
    document.getElementById('testing-week').textContent = timelineWeeks - 1;
    document.getElementById('qa-week').textContent = timelineWeeks - 1;
    document.getElementById('delivery-week').textContent = timelineWeeks;
    if (fdpSessions > 0) {
        document.getElementById('fdp-week').textContent = timelineWeeks;
    }
    
    // Show/hide and update video-related content
    const videoElements = document.querySelectorAll('.video-item');
    if (videoCount > 0) {
        videoElements.forEach(element => {
            element.style.display = element.tagName.toLowerCase() === 'li' ? 'list-item' : 'flex';
        });
        
        // Update video counts
        document.querySelectorAll('#video-count, #video-deliv-count, #final-video-count').forEach(span => {
            span.textContent = videoCount;
        });
        
        // Calculate remaining videos (total - 1 sample)
        document.getElementById('video-remaining').textContent = videoCount - 1;
        
        // Update video development end week
        const videoEndWeek = videoCount <= 3 ? 4 : (videoCount <= 6 ? 5 : 6);
        document.getElementById('video-week-end').textContent = Math.min(videoEndWeek, timelineWeeks - 1);
    } else {
        videoElements.forEach(element => {
            element.style.display = 'none';
        });
    }
    
    // Show/hide AI-related content
    const aiElements = document.querySelectorAll('.ai-item');
    if (aiIntegration) {
        aiElements.forEach(element => {
            element.style.display = element.tagName.toLowerCase() === 'li' ? 'list-item' : 'flex';
        });
        
        // Update AI development end week
        document.getElementById('ai-week-end').textContent = timelineWeeks - 1;
    } else {
        aiElements.forEach(element => {
            element.style.display = 'none';
        });
    }
    
    // Show/hide and update FDP-related content
    const fdpElements = document.querySelectorAll('.faculty-item');
    if (fdpSessions > 0) {
        fdpElements.forEach(element => {
            element.style.display = element.tagName.toLowerCase() === 'li' ? 'list-item' : 'flex';
        });
        
        // Update FDP session counts
        document.querySelectorAll('#fdp-count, #fdp-final-count').forEach(span => {
            span.textContent = fdpSessions;
        });
    } else {
        fdpElements.forEach(element => {
            element.style.display = 'none';
        });
    }
}

/**
 * Shows a specific phase in the timeline
 * @param {string} phase - The phase to show ('planning', 'draft1', 'development', or 'finalization')
 */
function showPhase(phase) {
    // Update phase tabs
    document.querySelectorAll('.phase').forEach(tab => {
        tab.classList.remove('active');
    });
    document.querySelector(`.phase[data-phase="${phase}"]`).classList.add('active');
    
    // Update phase content
    document.querySelectorAll('.phase-content').forEach(content => {
        content.classList.remove('active');
    });
    
    const contentId = `${phase}-content`;
    document.getElementById(contentId).classList.add('active');
    
    // Update progress indicator
    let progressWidth = 0;
    switch (phase) {
        case 'planning': progressWidth = 25; break;
        case 'draft1': progressWidth = 50; break;
        case 'development': progressWidth = 75; break;
        case 'finalization': progressWidth = 100; break;
    }
    
    document.querySelector('.progress-indicator').style.width = `${progressWidth}%`;
}