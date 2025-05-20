// Initialize price calculation and UI interactions
document.addEventListener('DOMContentLoaded', function() {
    // Initialize with enterprise package selected without auto-scrolling
    selectPackage('enterprise', false);
    
    // Add hover effects to summary items
    document.querySelectorAll('.summary-item').forEach(item => {
        item.addEventListener('mouseenter', function() {
            this.style.backgroundColor = 'rgba(255, 255, 255, 0.05)';
        });
        
        item.addEventListener('mouseleave', function() {
            this.style.backgroundColor = 'transparent';
        });
    });
    
    // Add event listener to save config button
    document.getElementById('save-config-btn').addEventListener('click', function() {
        // Show the final summary section
        showFinalSummary();
    });

    // Add event listener to back to customize button (in the final summary)
    document.addEventListener('click', function(e) {
        if (e.target && e.target.id === 'back-to-customize-btn') {
            hideFinalSummary();
        }
    });
    
    // Add event listener for view timeline button (in the final summary section)
    document.addEventListener('click', function(e) {
      if (e.target && (e.target.id === 'view-timeline-btn' || e.target.parentElement.id === 'view-timeline-btn')) {
        showTimeline();
      }
      
      // Handle back to summary button
      if (e.target && (e.target.id === 'back-to-summary-btn' || e.target.parentElement.id === 'back-to-summary-btn')) {
        hideTimeline();
      }
      
      // Phase selection in timeline
      if (e.target && e.target.classList.contains('phase')) {
        const phase = e.target.getAttribute('data-phase');
        showPhase(phase);
      }
    });
});

/**
 * Selects a Tutorial Video option
 * @param {number} videos - Number of tutorial videos
 */
function selectVideos(videos) {
    // Update pills
    document.querySelectorAll('.option-pills').forEach((pillGroup, groupIndex) => {
        if (groupIndex === 1) { // Second group is Tutorial Videos
            pillGroup.querySelectorAll('.option-pill').forEach((pill, index) => {
                pill.classList.remove('selected');
                if ((videos === 0 && index === 0) || 
                    (videos === 3 && index === 1) || 
                    (videos === 6 && index === 2) ||
                    (videos === 12 && index === 3)) {
                    pill.classList.add('selected');
                }
            });
        }
    });
    
    // Update values
    document.getElementById('tutorial-videos').value = videos;
    document.getElementById('video-value').textContent = videos;
    
    // Update price
    updatePrice();
}

/**
 * Shows the final summary section with animation
 */
function showFinalSummary() {
    // Get selected features and prices
    const selectedFeatures = getSelectedFeatures();
    const priceBreakdown = getPriceBreakdown();
    const totalPrice = calculateTotalPrice();
    const fdpSessions = parseInt(document.getElementById('fdp-sessions').value);
    const videoCount = parseInt(document.getElementById('tutorial-videos').value);
    const supportMonths = parseInt(document.getElementById('support-months').value);
    const aiIntegration = document.getElementById('ai-integration').checked;
    
    // Populate the final features list
    const finalFeaturesList = document.getElementById('final-features-list');
    finalFeaturesList.innerHTML = '';
    
    selectedFeatures.forEach(feature => {
        const li = document.createElement('li');
        li.innerHTML = `
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <polyline points="20 6 9 17 4 12"></polyline>
            </svg>
            ${feature}
        `;
        finalFeaturesList.appendChild(li);
    });
    
    // Populate the price breakdown
    const priceBreakdownEl = document.getElementById('price-breakdown');
    priceBreakdownEl.innerHTML = '';

    // Create URL with parameters for the timeline
    const timelineURL = `timeline.html?fdp=${fdpSessions}&videos=${videoCount}&support=${supportMonths}&ai=${aiIntegration ? 1 : 0}`;
    if (document.getElementById('view-timeline-btn')) {
        document.getElementById('view-timeline-btn').href = timelineURL;
    }
    
    priceBreakdown.forEach(item => {
        const div = document.createElement('div');
        div.className = 'price-item';
        div.innerHTML = `
            <div class="price-item-name">${item.name}</div>
            <div class="price-item-value">₹${item.price.toLocaleString()}</div>
        `;
        priceBreakdownEl.appendChild(div);
    });
    
    // Set the final total price
    document.getElementById('final-total-price').textContent = totalPrice.toLocaleString();
    
    // Show the final summary section with animation
    const finalSummarySection = document.getElementById('final-summary-section');
    finalSummarySection.style.display = 'block';
    
    // Force a reflow before adding the visible class for the animation
    void finalSummarySection.offsetWidth;
    
    finalSummarySection.classList.add('visible');
    
    // Scroll to the final summary section
    finalSummarySection.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
    });
}

/**
 * Hides the final summary section
 */
function hideFinalSummary() {
    const finalSummarySection = document.getElementById('final-summary-section');
    finalSummarySection.classList.remove('visible');
    
    // Add a small delay before hiding completely to allow animation to finish
    setTimeout(() => {
        finalSummarySection.style.display = 'none';
    }, 300);
    
    // Scroll back to the customizer section
    document.querySelector('.customizer-section').scrollIntoView({
        behavior: 'smooth',
        block: 'start'
    });
}

/**
 * Returns an array of selected features as strings
 */
function getSelectedFeatures() {
    const features = ['12 AR/VR Modules', 'GitHub Codebase', 'Course Documentation'];
    
    // FDP Sessions
    const fdpSessions = parseInt(document.getElementById('fdp-sessions').value);
    if (fdpSessions > 0) {
        features.push(`${fdpSessions} Faculty Development Session${fdpSessions > 1 ? 's' : ''}`);
    }
    
    // Tutorial Videos
    const videoCount = parseInt(document.getElementById('tutorial-videos').value);
    if (videoCount > 0) {
        let videoText = '';
        if (videoCount <= 3) videoText = 'Basic';
        else if (videoCount <= 6) videoText = 'Standard';
        else videoText = 'Advanced';
        
        features.push(`${videoCount} ${videoText} Tutorial Videos`);
    }
    
    // AI Integration
    if (document.getElementById('ai-integration').checked) {
        features.push('AI Integration Features');
    }
    
    // Support
    const supportMonths = parseInt(document.getElementById('support-months').value);
    if (supportMonths > 0) {
        features.push(`${supportMonths} Month${supportMonths > 1 ? 's' : ''} Tech Support`);
    }
    
    return features;
}

/**
 * Returns an array of price breakdown items
 */
function getPriceBreakdown() {
    const breakdown = [
        { name: 'Base AR/VR Course with Documentation', price: 150000 }
    ];
    
    // FDP Sessions
    const fdpSessions = parseInt(document.getElementById('fdp-sessions').value);
    if (fdpSessions > 0) {
        const fdpPrice = fdpSessions * 20000;
        breakdown.push({ name: `Faculty Development Program (${fdpSessions} session${fdpSessions > 1 ? 's' : ''})`, price: fdpPrice });
    }
    
    // Tutorial Videos
    const videoCount = parseInt(document.getElementById('tutorial-videos').value);
    if (videoCount > 0) {
        const videoPrice = videoCount * 5000;
        let videoText = '';
        
        if (videoCount <= 3) videoText = 'Basic';
        else if (videoCount <= 6) videoText = 'Standard';
        else videoText = 'Advanced';
        
        breakdown.push({ name: `${videoText} Tutorial Videos (${videoCount})`, price: videoPrice });
    }
    
    // AI Integration
    if (document.getElementById('ai-integration').checked) {
        breakdown.push({ name: 'AI Integration Features', price: 30000 });
    }
    
    // Support
    const supportMonths = parseInt(document.getElementById('support-months').value);
    if (supportMonths > 0) {
        const supportPrice = supportMonths * 10000;
        breakdown.push({ name: `Tech Support (${supportMonths} month${supportMonths > 1 ? 's' : ''})`, price: supportPrice });
    }
    
    return breakdown;
}

/**
 * Calculates the total price based on selected options
 */
function calculateTotalPrice() {
    let totalPrice = 150000; // Base price with documentation
    
    // FDP Sessions
    const fdpSessions = parseInt(document.getElementById('fdp-sessions').value);
    totalPrice += fdpSessions * 20000;
    
    // Tutorial Videos
    const videoCount = parseInt(document.getElementById('tutorial-videos').value);
    totalPrice += videoCount * 5000;
    
    // AI Integration
    if (document.getElementById('ai-integration').checked) {
        totalPrice += 30000;
    }
    
    // Support
    const supportMonths = parseInt(document.getElementById('support-months').value);
    totalPrice += supportMonths * 10000;
    
    return Math.round(totalPrice); // Round to avoid decimal issues
}

/**
 * Updates the price based on selected options
 * And updates the summary panel
 */
function updatePrice() {
    // Base price including course documentation and GitHub codebase
    let basePrice = 150000;
    let totalPrice = basePrice;
    
    // Documentation is now constant as "Course Documentation"
    document.getElementById('documentation-item').innerHTML = `
        <div class="item-details">
            <div class="item-name">Course Documentation</div>
            <div class="item-description">Comprehensive guides with detailed explanations</div>
        </div>
    `;
    
    // FDP Sessions
    const fdpSessions = parseInt(document.getElementById('fdp-sessions').value);
    const fdpPrice = fdpSessions * 20000;
    
    if (fdpSessions > 0) {
        document.getElementById('fdp-item').style.display = 'flex';
        document.getElementById('fdp-item').innerHTML = `
            <div class="item-details">
                <div class="item-name">Faculty Development Program</div>
                <div class="item-description">${fdpSessions} training session${fdpSessions > 1 ? 's' : ''} for institution staff</div>
            </div>
        `;
    } else {
        document.getElementById('fdp-item').style.display = 'none';
    }
    totalPrice += fdpPrice;
    
    // Tutorial Videos
    const videoCount = parseInt(document.getElementById('tutorial-videos').value);
    const videoPrice = videoCount * 5000; // 5000 per video
    let videoText = '';
    
    if (videoCount === 0) {
        document.getElementById('videos-item').style.display = 'none';
    } else {
        if (videoCount <= 3) videoText = 'Basic';
        else if (videoCount <= 6) videoText = 'Standard';
        else videoText = 'Advanced';
        
        document.getElementById('videos-item').style.display = 'flex';
        document.getElementById('videos-item').innerHTML = `
            <div class="item-details">
                <div class="item-name">${videoText} Tutorial Videos</div>
                <div class="item-description">${videoCount} tutorial videos for student learning</div>
            </div>
        `;
    }
    totalPrice += videoPrice;
    
    // AI Integration
    const aiIntegration = document.getElementById('ai-integration').checked;
    const aiPrice = aiIntegration ? 30000 : 0;
    
    if (aiIntegration) {
        document.getElementById('ai-item').style.display = 'flex';
        document.getElementById('ai-item').innerHTML = `
            <div class="item-details">
                <div class="item-name">AI Integration Features</div>
                <div class="item-description">Enhanced learning with AI capabilities</div>
            </div>
        `;
    } else {
        document.getElementById('ai-item').style.display = 'none';
    }
    totalPrice += aiPrice;
    
    // Support
    const supportMonths = parseInt(document.getElementById('support-months').value);
    const supportPrice = supportMonths * 10000; // 10000 per month
    
    if (supportMonths > 0) {
        document.getElementById('support-item').style.display = 'flex';
        document.getElementById('support-item').innerHTML = `
            <div class="item-details">
                <div class="item-name">Tech Support</div>
                <div class="item-description">${supportMonths} month${supportMonths > 1 ? 's' : ''} of technical assistance</div>
            </div>
        `;
    } else {
        document.getElementById('support-item').style.display = 'none';
    }
    totalPrice += supportPrice;
    
    // Make sure customization item is not displayed
    document.getElementById('customization-item').style.display = 'none';
    
    // Update feature count instead of price
    const featureCount = getSelectedFeatures().length;
    document.getElementById('feature-count').textContent = featureCount;
    
    // If final summary is visible, update it as well
    if (document.getElementById('final-summary-section').classList.contains('visible')) {
        showFinalSummary();
    }
}

/**
 * Selects a package and updates UI accordingly
 * @param {string} package - The package to select ('standard', 'professional', or 'enterprise')
 * @param {boolean} scrollToCustomizer - Whether to scroll to customizer section (default: true)
 */
function selectPackage(package, scrollToCustomizer = true) {
    // Reset all package highlighting
    document.querySelectorAll('.package-card').forEach(card => {
        card.classList.remove('selected');
    });
    
    // Highlight selected package
    document.getElementById(`${package}-package`).classList.add('selected');
    
    // Reset option pills
    document.querySelectorAll('.option-pill').forEach(pill => {
        pill.classList.remove('selected');
    });
    
    // Set values based on package
    if (package === 'standard') {
        // FDP Sessions - select "1 Session" pill
        document.getElementById('fdp-sessions').value = 1;
        document.getElementById('fdp-value').textContent = 1;
        document.querySelectorAll('.option-pills').forEach((pillGroup, groupIndex) => {
            if (groupIndex === 0) { // First group is FDP
                pillGroup.querySelectorAll('.option-pill').forEach((pill, index) => {
                    if (index === 0) pill.classList.add('selected');
                });
            }
        });
        
        // Videos - No Videos
        document.getElementById('tutorial-videos').value = 0;
        document.getElementById('video-value').textContent = 0;
        document.querySelectorAll('.option-pills').forEach((pillGroup, groupIndex) => {
            if (groupIndex === 1) { // Second group is Videos
                pillGroup.querySelectorAll('.option-pill').forEach((pill, index) => {
                    if (index === 0) pill.classList.add('selected');
                });
            }
        });
        
        // Support - select "None" pill
        document.getElementById('support-months').value = 0;
        document.getElementById('support-value').textContent = 0;
        document.querySelectorAll('.option-pills').forEach((pillGroup, groupIndex) => {
            if (groupIndex === 2) { // Third group is Support
                pillGroup.querySelectorAll('.option-pill').forEach((pill, index) => {
                    if (index === 0) pill.classList.add('selected');
                });
            }
        });
        
        // Toggles
        document.getElementById('ai-integration').checked = false;
        
    } else if (package === 'professional') {
        // FDP Sessions - select "2 Sessions" pill
        document.getElementById('fdp-sessions').value = 2;
        document.getElementById('fdp-value').textContent = 2;
        document.querySelectorAll('.option-pills').forEach((pillGroup, groupIndex) => {
            if (groupIndex === 0) { // First group is FDP
                pillGroup.querySelectorAll('.option-pill').forEach((pill, index) => {
                    if (index === 1) pill.classList.add('selected');
                });
            }
        });
        
        // Videos - 6 Videos
        document.getElementById('tutorial-videos').value = 6;
        document.getElementById('video-value').textContent = 6;
        document.querySelectorAll('.option-pills').forEach((pillGroup, groupIndex) => {
            if (groupIndex === 1) { // Second group is Videos
                pillGroup.querySelectorAll('.option-pill').forEach((pill, index) => {
                    if (index === 2) pill.classList.add('selected');
                });
            }
        });
        
        // Support - select "3 Months" pill
        document.getElementById('support-months').value = 3;
        document.getElementById('support-value').textContent = 3;
        document.querySelectorAll('.option-pills').forEach((pillGroup, groupIndex) => {
            if (groupIndex === 2) { // Third group is Support
                pillGroup.querySelectorAll('.option-pill').forEach((pill, index) => {
                    if (index === 2) pill.classList.add('selected');
                });
            }
        });
        
        // Toggles
        document.getElementById('ai-integration').checked = false;
        
    } else if (package === 'enterprise') {
        // FDP Sessions - select "3 Sessions" pill
        document.getElementById('fdp-sessions').value = 3;
        document.getElementById('fdp-value').textContent = 3;
        document.querySelectorAll('.option-pills').forEach((pillGroup, groupIndex) => {
            if (groupIndex === 0) { // First group is FDP
                pillGroup.querySelectorAll('.option-pill').forEach((pill, index) => {
                    if (index === 2) pill.classList.add('selected');
                });
            }
        });
        
        // Videos - 12 Videos
        document.getElementById('tutorial-videos').value = 12;
        document.getElementById('video-value').textContent = 12;
        document.querySelectorAll('.option-pills').forEach((pillGroup, groupIndex) => {
            if (groupIndex === 1) { // Second group is Videos
                pillGroup.querySelectorAll('.option-pill').forEach((pill, index) => {
                    if (index === 3) pill.classList.add('selected');
                });
            }
        });
        
        // Support - select "6 Months" pill
        document.getElementById('support-months').value = 6;
        document.getElementById('support-value').textContent = 6;
        document.querySelectorAll('.option-pills').forEach((pillGroup, groupIndex) => {
            if (groupIndex === 2) { // Third group is Support
                pillGroup.querySelectorAll('.option-pill').forEach((pill, index) => {
                    if (index === 3) pill.classList.add('selected');
                });
            }
        });
        
        // Toggles
        document.getElementById('ai-integration').checked = true;
    }
    
    // Update pricing
    updatePrice();
    
    // Hide final summary if visible
    if (document.getElementById('final-summary-section').classList.contains('visible')) {
        hideFinalSummary();
    }
    
    // Only scroll to customizer if the parameter is true
    if (scrollToCustomizer) {
        document.getElementById('customizer-section').scrollIntoView({
            behavior: 'smooth',
            block: 'start'
        });
    }
}

/**
 * Selects a Faculty Development Program option
 * @param {number} sessions - Number of FDP sessions
 */
function selectFDP(sessions) {
    // Update pills
    document.querySelectorAll('.option-pills').forEach((pillGroup, groupIndex) => {
        if (groupIndex === 0) { // First group is FDP
            pillGroup.querySelectorAll('.option-pill').forEach((pill, index) => {
                pill.classList.remove('selected');
                if ((sessions === 1 && index === 0) || 
                    (sessions === 2 && index === 1) || 
                    (sessions === 3 && index === 2)) {
                    pill.classList.add('selected');
                }
            });
        }
    });
    
    // Update values
    document.getElementById('fdp-sessions').value = sessions;
    document.getElementById('fdp-value').textContent = sessions;
    
    // Update price
    updatePrice();
}

/**
 * Selects a Technical Support option
 * @param {number} months - Number of support months
 */
function selectSupport(months) {
    // Update pills
    document.querySelectorAll('.option-pills').forEach((pillGroup, groupIndex) => {
        if (groupIndex === 2) { // Third group is Support (fixed index)
            pillGroup.querySelectorAll('.option-pill').forEach((pill, index) => {
                pill.classList.remove('selected');
                if ((months === 0 && index === 0) || 
                    (months === 1 && index === 1) || 
                    (months === 3 && index === 2) || 
                    (months === 6 && index === 3)) {
                    pill.classList.add('selected');
                }
            });
        }
    });
    
    // Update values
    document.getElementById('support-months').value = months;
    document.getElementById('support-value').textContent = months;
    
    // Update price
    updatePrice();
}

/**
 * Shows the timeline section with animation
 */
function showTimeline() {
  // Hide the final summary section if visible
  const finalSummarySection = document.getElementById('final-summary-section');
  finalSummarySection.classList.remove('visible');
  
  // Add a small delay before showing the timeline
  setTimeout(() => {
    const timelineSection = document.getElementById('timeline-section');
    if (timelineSection) {
      timelineSection.style.display = 'block';
      
      // Force a reflow before adding the visible class for the animation
      void timelineSection.offsetWidth;
      
      timelineSection.classList.add('visible');
      
      // Update timeline based on selected features
      if (typeof updateTimelineFeatures === 'function') {
        updateTimelineFeatures();
      }
      
      // Initialize with planning phase
      if (typeof showPhase === 'function') {
        showPhase('planning');
      }
      
      // Scroll to the timeline section
      timelineSection.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
    }
  }, 300);
}

/**
 * Hides the timeline section and shows the final summary
 */
function hideTimeline() {
  const timelineSection = document.getElementById('timeline-section');
  if (timelineSection) {
    timelineSection.classList.remove('visible');
    
    // Add a small delay before hiding completely
    setTimeout(() => {
      timelineSection.style.display = 'none';
      
      // Show the final summary section again (without scrolling)
      const finalSummarySection = document.getElementById('final-summary-section');
      finalSummarySection.classList.add('visible');
    }, 300);
  }
}
