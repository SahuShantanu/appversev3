document.addEventListener('alpine:init', () => {
  Alpine.data('appsCatalog', () => ({
    searchQuery: '',
    selectedCategory: 'All',
    modalOpen: false,
    activeApp: null,
    
    // Categories list for filtering UI
    categories: ['All', 'Productivity', 'Finance', 'Social', 'Utilities', 'Entertainment'],

    // Android Apps portfolio database
    appsList: [
      {
        id: 1,
        name: 'FocusFlow',
        category: 'Productivity',
        icon: 'ph-timer',
        color: 'from-violet-500 to-indigo-500',
        rating: 4.9,
        downloads: '250K+',
        fileSize: '14 MB',
        version: 'v3.2.0',
        releaseDate: 'May 12, 2026',
        description: 'Master your time with fluid Pomodoro cycles, project task tracking, and custom ambient sounds.',
        detailedDescription: 'FocusFlow is a high-performance productivity planner engineered for Android. It combines advanced time-boxing algorithms with sleek visual cues to keep your concentration locked. Features include customizable work-break intervals, seamless syncing with Google Calendar, and detailed productivity insights with beautiful charts.',
        changelog: [
          'Added native focus session analytics charts.',
          'Integrated Spotify API for background focus music.',
          'Optimized power usage for background countdown timer.'
        ],
        features: ['Smart Pomodoro Timer', 'Visual Work Insights', 'Ambient Sound Mixer', 'Google Calendar Sync']
      },
      {
        id: 2,
        name: 'ApexLauncher Pro',
        category: 'Utilities',
        icon: 'ph-squares-four',
        color: 'from-emerald-500 to-teal-500',
        rating: 4.8,
        downloads: '1.2M+',
        fileSize: '18 MB',
        version: 'v6.1.5',
        releaseDate: 'April 02, 2026',
        description: 'Reimagine your home screen with gesture commands, liquid-smooth transition effects, and dynamic widgets.',
        detailedDescription: 'ApexLauncher Pro gives Android users complete control over their operating system layout. Replacing the standard launcher with a responsive Tahoe-glass visual shell, users can personalize icons, construct hidden app folders, map multi-finger gestures, and implement custom interactive home widgets.',
        changelog: [
          'Refactored grid drawer performance, reducing RAM footprint by 30%.',
          'Introduced liquid glass custom icon themes.',
          'Added dual-swipe gestures to hide sensitive apps.'
        ],
        features: ['Custom Tahoe-Glass Shell', '3D Desktop Transition FX', 'Multi-Finger Gesture Actions', 'Hidden Secure Folders']
      },
      {
        id: 3,
        name: 'NovaWallet',
        category: 'Finance',
        icon: 'ph-wallet',
        color: 'from-blue-500 to-cyan-500',
        rating: 4.7,
        downloads: '450K+',
        fileSize: '22 MB',
        version: 'v1.8.9',
        releaseDate: 'June 01, 2026',
        description: 'A securely encrypted cryptocurrency and digital asset manager featuring instant swap protocols.',
        detailedDescription: 'NovaWallet is a non-custodial cryptographic finance vault designed for the Android platform. Providing double-layered biometrics and hardware-grade security, NovaWallet lets users store, send, receive, and swap major blockchain tokens securely with low gas fees and real-time ledger tracking.',
        changelog: [
          'Implemented Ethereum Layer 2 Arbitrum/Optimism support.',
          'Upgraded fingerprint/face biometrics hardware key integration.',
          'Added real-time crypto price desktop widget.'
        ],
        features: ['Non-Custodial Seed Encryption', 'Multi-Chain Asset Swaps', 'Biometric Lock Protection', 'Real-Time Price Widgets']
      },
      {
        id: 4,
        name: 'EchoChat',
        category: 'Social',
        icon: 'ph-chat-circle-dots',
        color: 'from-teal-400 to-cyan-500',
        rating: 4.6,
        downloads: '850K+',
        fileSize: '15 MB',
        version: 'v4.0.2',
        releaseDate: 'March 20, 2026',
        description: 'End-to-end encrypted messaging with HD voice calling, self-destructing media, and shared spaces.',
        detailedDescription: 'EchoChat is an ultra-secure messaging tool crafted for Android. Protecting your communications through double-ratchet peer-to-end encryption protocols, EchoChat supports private messaging, groups of up to 10k members, audio channels, and self-destructing file drops that leave no data footprint.',
        changelog: [
          'Optimized peer-to-peer HD VoIP calling under slow connections.',
          'Added self-destructing text chat timer (5s to 1 week).',
          'Introduced multi-device background message sync.'
        ],
        features: ['Double-Ratchet Encryption', 'HD Audio/Video Calls', 'Self-Destructing Media Drops', '10,000+ Group Channels']
      },
      {
        id: 5,
        name: 'ZenBeat',
        category: 'Entertainment',
        icon: 'ph-music-notes-simple',
        color: 'from-pink-500 to-rose-500',
        rating: 4.9,
        downloads: '300K+',
        fileSize: '28 MB',
        version: 'v2.5.4',
        releaseDate: 'April 28, 2026',
        description: 'Premium music synthesizer and player featuring a 10-band equalizer and 3D spatial audio.',
        detailedDescription: 'ZenBeat is an audio engine designed to deliver studio-quality musical rendering on Android. Built with a proprietary digital signal processing (DSP) core, ZenBeat offers users a 10-band manual equalizer, custom reverb chambers, high-fidelity lossless format decoding, and simulated 3D spatial surround sound.',
        changelog: [
          'Upgraded audio core engine to support FLAC lossless decoding.',
          'Added custom 10-band equalizer presets for headsets.',
          'Improved Bluetooth Latency sync for wireless earbuds.'
        ],
        features: ['10-Band EQ & Reverb Rooms', 'FLAC/WAV Lossless Engine', '3D Spatial Audio Surround', 'Advanced Bluetooth Audio Sync']
      },
      {
        id: 6,
        name: 'SkyRoute Map',
        category: 'Utilities',
        icon: 'ph-compass',
        color: 'from-amber-500 to-orange-500',
        rating: 4.5,
        downloads: '100K+',
        fileSize: '31 MB',
        version: 'v1.2.1',
        releaseDate: 'May 30, 2026',
        description: 'Offline GPS navigation, vector map graphics, and real-time transit schedule indicators.',
        detailedDescription: 'SkyRoute Map provides highly accurate offline vector map navigation designed for travelers and hikers. Utilizing low-power GPS signals, the app lets you download detailed country-wide geographical data offline, plan cycling and hiking routes, track elevation profiles, and view real-time public bus/train schedules.',
        changelog: [
          'Added full support for offline topography elevation layers.',
          'Optimized map vector drawing rendering speed by 40%.',
          'Updated municipal bus and subway tables.'
        ],
        features: ['Offline Topographic Vectors', 'Low-Power GPS Tracking', 'Transit Schedule Alerts', 'Elevation Gradient Profile']
      }
    ],

    // Search and category matching logic
    filteredApps() {
      // Dispatch scroll-reveal check when lists update
      window.dispatchEvent(new CustomEvent('refresh-scroll-reveal'));
      
      return this.appsList.filter(app => {
        const matchesSearch = app.name.toLowerCase().includes(this.searchQuery.toLowerCase()) || 
                              app.description.toLowerCase().includes(this.searchQuery.toLowerCase());
        const matchesCategory = this.selectedCategory === 'All' || app.category === this.selectedCategory;
        return matchesSearch && matchesCategory;
      });
    },

    openDetails(app) {
      this.activeApp = app;
      this.modalOpen = true;
    },

    closeDetails() {
      this.modalOpen = false;
      // Delay cleaning activeApp to allow close animation to finish
      setTimeout(() => {
        if (!this.modalOpen) this.activeApp = null;
      }, 300);
    }
  }));
});
