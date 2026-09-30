/**
 * SeaTechno Solutions - Microsoft 365 Specialist Platform
 * Replicating Microsoft Design Language & Focused Exclusively on Microsoft 365
 */

document.addEventListener('DOMContentLoaded', () => {
  // -------------------------------------------------------------------------
  // 1. Hero Carousel / Slider Functionality (Microsoft Style)
  // -------------------------------------------------------------------------
  const sliderTrack = document.querySelector('.ms-slider-track');
  const slides = document.querySelectorAll('.ms-slide');
  const dots = document.querySelectorAll('.ms-dot');
  const prevBtn = document.querySelector('.ms-slider-prev');
  const nextBtn = document.querySelector('.ms-slider-next');
  const playPauseBtn = document.querySelector('.ms-slider-playpause');
  
  let currentSlide = 0;
  const totalSlides = slides.length;
  let isPlaying = true;
  let slideInterval = null;

  function updateSlider(index) {
    if (!sliderTrack || totalSlides === 0) return;
    currentSlide = (index + totalSlides) % totalSlides;
    sliderTrack.style.transform = `translateX(-${currentSlide * 100}%)`;
    
    dots.forEach((dot, i) => {
      dot.classList.toggle('active', i === currentSlide);
    });
  }

  function startAutoplay() {
    if (slideInterval) clearInterval(slideInterval);
    slideInterval = setInterval(() => {
      if (isPlaying) {
        updateSlider(currentSlide + 1);
      }
    }, 6000);
  }

  if (prevBtn) {
    prevBtn.addEventListener('click', () => {
      updateSlider(currentSlide - 1);
    });
  }

  if (nextBtn) {
    nextBtn.addEventListener('click', () => {
      updateSlider(currentSlide + 1);
    });
  }

  dots.forEach(dot => {
    dot.addEventListener('click', () => {
      const targetIndex = parseInt(dot.getAttribute('data-index'), 10);
      updateSlider(targetIndex);
    });
  });

  if (playPauseBtn) {
    playPauseBtn.addEventListener('click', () => {
      isPlaying = !isPlaying;
      playPauseBtn.setAttribute('aria-label', isPlaying ? 'Pause slider' : 'Play slider');
      playPauseBtn.innerHTML = isPlaying 
        ? '<svg width="12" height="12" viewBox="0 0 16 16" fill="currentColor"><rect x="2" y="2" width="4" height="12"/><rect x="10" y="2" width="4" height="12"/></svg>'
        : '<svg width="12" height="12" viewBox="0 0 16 16" fill="currentColor"><polygon points="3,2 14,8 3,14"/></svg>';
    });
  }

  startAutoplay();

  // -------------------------------------------------------------------------
  // 2. All SeaTechno M365 Mega Menu Toggle
  // -------------------------------------------------------------------------
  const megaMenuTrigger = document.querySelector('#ms-all-menu-btn');
  const megaMenu = document.querySelector('#ms-mega-menu');

  if (megaMenuTrigger && megaMenu) {
    megaMenuTrigger.addEventListener('click', (e) => {
      e.stopPropagation();
      const isOpen = megaMenu.classList.toggle('open');
      megaMenuTrigger.setAttribute('aria-expanded', isOpen);
    });

    document.addEventListener('click', (e) => {
      if (!megaMenu.contains(e.target) && !megaMenuTrigger.contains(e.target)) {
        megaMenu.classList.remove('open');
      }
    });
  }

  // -------------------------------------------------------------------------
  // 3. Search Bar Overlay Toggle & Search Action
  // -------------------------------------------------------------------------
  const searchToggleBtn = document.querySelector('#ms-search-toggle');
  const searchWrap = document.querySelector('#ms-search-wrap');
  const searchInput = document.querySelector('#ms-search-input');

  if (searchToggleBtn && searchWrap) {
    searchToggleBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      searchWrap.classList.toggle('open');
      if (searchWrap.classList.contains('open') && searchInput) {
        searchInput.focus();
      }
    });

    document.addEventListener('click', (e) => {
      if (!searchWrap.contains(e.target) && !searchToggleBtn.contains(e.target)) {
        searchWrap.classList.remove('open');
      }
    });

    if (searchInput) {
      searchInput.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') {
          const query = searchInput.value.trim().toLowerCase();
          if (query) {
            if (query.includes('migrat') || query.includes('google') || query.includes('exchange') || query.includes('cpanel')) {
              window.location.href = 'migration.html';
            } else if (query.includes('copilot') || query.includes('ai')) {
              window.location.href = 'copilot.html';
            } else if (query.includes('secur') || query.includes('defender') || query.includes('intune') || query.includes('mfa')) {
              window.location.href = 'security.html';
            } else if (query.includes('support') || query.includes('manage') || query.includes('sla')) {
              window.location.href = 'managed.html';
            } else {
              window.location.href = 'plans.html';
            }
          }
        }
      });
    }
  }

  // -------------------------------------------------------------------------
  // 4. Interactive Microsoft 365 Plan & Migration Advisor
  // -------------------------------------------------------------------------
  const sizeBtns = document.querySelectorAll('[data-calc-size]');
  const needBtns = document.querySelectorAll('[data-calc-need]');
  const resultTitle = document.querySelector('#calc-result-title');
  const resultDesc = document.querySelector('#calc-result-desc');
  const resultSla = document.querySelector('#calc-result-sla');
  const resultApps = document.querySelector('#calc-result-apps');

  let selectedSize = '25-100';
  let selectedNeed = 'security';

  const m365PlanMatrix = {
    '1-25': {
      'migration': {
        title: 'Turnkey Google/cPanel to M365 Business Basic Migration',
        desc: 'Zero downtime mailbox migration to Exchange Online (50GB per user), 1TB OneDrive cloud storage, web versions of Word, Excel, PowerPoint, and Microsoft Teams.',
        sla: 'Setup Timeline: 2-3 Days | Zero Mail Loss SLA',
        apps: 'Exchange Online • Teams • OneDrive • SharePoint • Web Office'
      },
      'productivity': {
        title: 'Microsoft 365 Business Standard Deployment',
        desc: 'Full installable desktop Office apps for up to 5 PCs/Macs per user, business-class cloud email, automated Outlook calendar sync, and Teams video conferencing.',
        sla: 'Instant License Provisioning | 100% Cloud Backed',
        apps: 'Desktop Word, Excel, PPT, Outlook • Teams • 1TB OneDrive'
      },
      'security': {
        title: 'Microsoft 365 Business Premium + Endpoint Protection',
        desc: 'Comprehensive defense against phishing, ransomware, and identity theft. Includes Microsoft Defender for Business, Intune mobile management, and MFA conditional access.',
        sla: 'Zero Trust Certified | Enterprise Defense for Small Teams',
        apps: 'Full Office Apps • Defender for Business • Intune MDM • Entra ID P1'
      },
      'copilot': {
        title: 'Microsoft 365 Business Standard + Copilot AI Starter',
        desc: 'Unleash generative AI for your team. Draft emails in Outlook, summarize Teams meetings in real time, and analyze Excel financial data with Microsoft Copilot.',
        sla: 'Certified Copilot Adoption & Prompting Workshop Included',
        apps: 'Copilot for M365 • Word • Excel • PowerPoint • Teams • Outlook'
      }
    },
    '25-100': {
      'migration': {
        title: 'Enterprise M365 Hybrid & File Server Cloud Migration',
        desc: 'Migrate on-premise Exchange and Windows File Servers to SharePoint document libraries with permissions intact, Active Directory sync, and co-authoring.',
        sla: '100% Data Integrity Guarantee | Weekend Cutover SLA',
        apps: 'Exchange Online • SharePoint Modern Intranet • OneDrive • Teams'
      },
      'productivity': {
        title: 'Microsoft 365 Business Standard + Advanced Collaboration',
        desc: 'Standardize enterprise document creation, company-wide intranet on SharePoint, structured Teams channels, webinar hosting for up to 300 participants.',
        sla: '99.99% Financially-Backed SLA from Microsoft',
        apps: 'Full Desktop Suite • Teams Webinars • Bookings • Planner'
      },
      'security': {
        title: 'Microsoft 365 Business Premium (Recommended for Growing SMEs)',
        desc: 'The gold standard for Indian businesses. Protect all laptops and mobile devices with Microsoft Intune, deploy Defender endpoint detection, and secure corporate emails from spoofing.',
        sla: 'Meets ISO 27001 & Cyber Compliance Standards',
        apps: 'Defender for Business • Intune MDM/MAM • Azure Information Protection • Conditional Access'
      },
      'copilot': {
        title: 'Microsoft Copilot for M365 Enterprise Rollout',
        desc: 'Complete Copilot implementation: data permission hygiene audit, semantic index tuning, security boundaries verification, and team training modules.',
        sla: 'End-to-End Enterprise Copilot Implementation Roadmap',
        apps: 'Copilot Studio • Semantic Index • Teams Copilot • Outlook Copilot'
      }
    },
    '100-300': {
      'migration': {
        title: 'Large-Scale M365 Multi-Tenant / Enterprise Migration',
        desc: 'Staged migration of mailboxes, public folders, shared calendars, archives, and terabytes of file shares to Microsoft 365 with dedicated cutover management.',
        sla: '24/7 Dedicated Migration War Room & Zero Business Disruption',
        apps: 'Exchange Hybrid • SharePoint Migrations • Intune Enrollment'
      },
      'productivity': {
        title: 'Microsoft 365 E3 Enterprise Productivity Suite',
        desc: 'Enterprise capabilities for mid-market leaders. Unlimited cloud archiving, 100GB mailboxes, advanced compliance, and rights management for confidential contracts.',
        sla: 'Priority Tier-1 Enterprise CSP Support',
        apps: 'M365 Apps for Enterprise • Exchange Online Plan 2 • SharePoint Plan 2'
      },
      'security': {
        title: 'Microsoft 365 E3 + Microsoft Defender for Office 365 P2',
        desc: 'Automated threat investigation, attack simulation training, safe links & safe attachments protection, and unified device compliance across hybrid workforces.',
        sla: 'Sub-15 Minute Incident Response SLA by SeaTechno',
        apps: 'Defender P2 • Intune Enterprise • Cloud App Security • Purview DLP'
      },
      'copilot': {
        title: 'Full-Scale Enterprise Microsoft Copilot Transformation',
        desc: 'Organizational rollout with department-level AI champions, customized Copilot plugins, automated Power Platform workflows, and security compliance.',
        sla: 'Managed AI Adoption & Continuous Usage Telemetry',
        apps: 'Copilot for M365 • Power Automate • Copilot Studio Custom Agents'
      }
    },
    '300+': {
      'migration': {
        title: 'Enterprise Global M365 Consolidation & Tenant Re-Architecture',
        desc: 'Complex tenant consolidation, merger & acquisition (M&A) email integrations, multi-geo mailbox data residency, and enterprise compliance archiving.',
        sla: 'Custom Global Migration Architecture SLA',
        apps: 'Multi-Geo Capabilities • Hybrid Exchange • Advanced Discovery'
      },
      'productivity': {
        title: 'Microsoft 365 E5 Complete Modern Enterprise Platform',
        desc: 'The pinnacle of Microsoft cloud productivity. Enterprise voice calling via Teams Phone, advanced analytical intelligence, and boundless collaboration.',
        sla: 'Microsoft Tier-1 Direct Escalation SLA',
        apps: 'Full E5 Suite • Teams Phone System • Power BI Pro • Advanced Auditing'
      },
      'security': {
        title: 'Microsoft 365 E5 Security & Purview Compliance Center',
        desc: 'Ultimate enterprise cybersecurity defense. Microsoft Defender XDR, Microsoft Sentinel integration, Microsoft Purview eDiscovery, and Insider Risk Management.',
        sla: '24/7/365 Managed SOC & M365 Security Monitoring',
        apps: 'Defender for Endpoint/Office/Identity • Microsoft Purview eDiscovery • Entra ID P2'
      },
      'copilot': {
        title: 'Enterprise Copilot Center of Excellence (CoE)',
        desc: 'Transform enterprise knowledge retrieval. Custom AI agents with Microsoft Copilot Studio, Azure OpenAI integration, and strict DLP safeguards.',
        sla: 'Dedicated SeaTechno M365 Enterprise Solutions Architect',
        apps: 'Copilot for M365 • Custom Agents • Azure OpenAI • Purview AI Hub'
      }
    }
  };

  function updateAdvisor() {
    if (!resultTitle || !resultDesc) return;
    const recommendation = (m365PlanMatrix[selectedSize] && m365PlanMatrix[selectedSize][selectedNeed]) 
      || m365PlanMatrix['25-100']['security'];
    
    resultTitle.textContent = recommendation.title;
    resultDesc.textContent = recommendation.desc;
    if (resultSla) resultSla.textContent = recommendation.sla;
    if (resultApps) resultApps.textContent = recommendation.apps;
  }

  sizeBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      sizeBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      selectedSize = btn.getAttribute('data-calc-size');
      updateAdvisor();
    });
  });

  needBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      needBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      selectedNeed = btn.getAttribute('data-calc-need');
      updateAdvisor();
    });
  });

  // -------------------------------------------------------------------------
  // 5. Consultation Modal & Form Submission
  // -------------------------------------------------------------------------
  const modalBackdrop = document.querySelector('#ms-consult-modal');
  const openModalBtns = document.querySelectorAll('.open-consult-modal');
  const closeModalBtn = document.querySelector('#ms-modal-close-btn');
  const consultForm = document.querySelector('#ms-consult-form');
  const modalForm = document.querySelector('#ms-consult-form-modal');

  function openModal() {
    if (modalBackdrop) {
      modalBackdrop.classList.add('open');
      document.body.style.overflow = 'hidden';
    }
  }

  function closeModal() {
    if (modalBackdrop) {
      modalBackdrop.classList.remove('open');
      document.body.style.overflow = '';
    }
  }

  if (openModalBtns) {
    openModalBtns.forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.preventDefault();
        openModal();
      });
    });
  }

  if (closeModalBtn) {
    closeModalBtn.addEventListener('click', closeModal);
  }

  if (modalBackdrop) {
    modalBackdrop.addEventListener('click', (e) => {
      if (e.target === modalBackdrop) {
        closeModal();
      }
    });
  }

  function handleFormSubmit(form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const submitBtn = form.querySelector('button[type="submit"]');
      if (submitBtn) {
        submitBtn.textContent = 'Submitting Request...';
        submitBtn.disabled = true;
      }

      setTimeout(() => {
        form.innerHTML = `
          <div style="text-align:center; padding: 28px 10px;">
            <div style="width: 56px; height: 56px; background: #e8f5e9; border-radius: 50%; display: flex; align-items: center; justify-content: center; margin: 0 auto 16px; color: #107c41;">
              <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="20 6 9 17 4 12"/></svg>
            </div>
            <h3 style="font-size: 1.4rem; color: #242424; margin-bottom: 8px;">Request Received!</h3>
            <p style="font-size: 0.95rem; color: #505050; line-height: 1.5; margin-bottom: 20px;">
              Thank you for contacting <strong>Sea Techno Solutions</strong>. A certified Microsoft 365 Specialist will review your tenant requirements and reach out within 2 business hours.
            </p>
            <button type="button" class="ms-btn-primary" onclick="location.reload()">Done</button>
          </div>
        `;
      }, 800);
    });
  }

  if (consultForm) handleFormSubmit(consultForm);
  if (modalForm) handleFormSubmit(modalForm);

  // -------------------------------------------------------------------------
  // 6. Mobile Menu Drawer Toggle
  // -------------------------------------------------------------------------
  const mobileToggle = document.querySelector('#ms-mobile-toggle');
  const navContainer = document.querySelector('.ms-primary-nav');

  if (mobileToggle && navContainer) {
    mobileToggle.addEventListener('click', () => {
      if (navContainer.style.display === 'flex') {
        navContainer.style.display = '';
      } else {
        navContainer.style.display = 'flex';
        navContainer.style.flexDirection = 'column';
        navContainer.style.position = 'absolute';
        navContainer.style.top = '54px';
        navContainer.style.left = '0';
        navContainer.style.right = '0';
        navContainer.style.backgroundColor = '#ffffff';
        navContainer.style.padding = '16px 24px';
        navContainer.style.boxShadow = '0 8px 16px rgba(0,0,0,0.1)';
        navContainer.style.zIndex = '999';
      }
    });
  }

  // -------------------------------------------------------------------------
  // 7. Back To Top Button
  // -------------------------------------------------------------------------
  const backToTop = document.querySelector('#ms-back-to-top');
  if (backToTop) {
    backToTop.addEventListener('click', (e) => {
      e.preventDefault();
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }
});
