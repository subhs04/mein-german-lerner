/**
 * German Learning Hub - Common JavaScript Functions
 * Shared functionality across all pages
 */

// Under Construction Alert
function showUnderConstructionAlert(sectionName) {
    alert(`🚧 ${sectionName} Section Under Construction 🚧\n\nThis section is currently being developed and will be available soon!\n\nStay tuned for exciting German learning tools and practice exercises.`);
}

// Mobile Menu Toggle
function toggleMobileMenu() {
    const hamburger = document.querySelector('.hamburger');
    const mobileMenu = document.getElementById('mobileMenu');
    
    hamburger.classList.toggle('active');
    mobileMenu.classList.toggle('active');
}

// Close mobile menu when clicking outside
document.addEventListener('click', function(event) {
    const mobileMenu = document.getElementById('mobileMenu');
    const hamburger = document.querySelector('.hamburger');
    const navContainer = document.querySelector('.nav-container');
    
    if (navContainer && !navContainer.contains(event.target) && mobileMenu && mobileMenu.classList.contains('active')) {
        hamburger.classList.remove('active');
        mobileMenu.classList.remove('active');
    }
});

// PWA Installation Functionality
let deferredPrompt;
let installPromptAvailable = false;

window.addEventListener('beforeinstallprompt', (e) => {
    console.log('✅ PWA install prompt available!');
    e.preventDefault();
    deferredPrompt = e;
    installPromptAvailable = true;
    showInstallBanner();
});

// Check if PWA can be installed
window.addEventListener('load', () => {
    setTimeout(() => {
        // Check if already installed
        if (window.navigator.standalone || window.matchMedia('(display-mode: standalone)').matches) {
            console.log('📱 App already installed or running in standalone mode');
            return;
        }
        
        // Try to trigger install prompt through user interaction
        if (!installPromptAvailable) {
            console.log('💡 Install prompt not automatically triggered - showing banner anyway');
            showInstallBanner();
            detectPWASupport();
        }
    }, 3000);
});

function detectPWASupport() {
    // Check various browser capabilities
    const isChrome = /Chrome/.test(navigator.userAgent) && /Google Inc/.test(navigator.vendor);
    const isEdge = /Edge/.test(navigator.userAgent);
    const isFirefox = /Firefox/.test(navigator.userAgent);
    const isSafari = /Safari/.test(navigator.userAgent) && /Apple Computer/.test(navigator.vendor);
    const isAndroid = /Android/.test(navigator.userAgent);
    const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent);
    
    console.log('🔍 Browser Detection:');
    console.log('Chrome:', isChrome);
    console.log('Edge:', isEdge);
    console.log('Firefox:', isFirefox);
    console.log('Safari:', isSafari);
    console.log('Android:', isAndroid);
    console.log('iOS:', isIOS);
    
    // Check if service worker is properly registered
    if ('serviceWorker' in navigator) {
        navigator.serviceWorker.ready.then(registration => {
            console.log('✅ Service Worker ready:', registration.scope);
            
            // For Chrome/Edge, try to manually check PWA criteria
            if (isChrome || isEdge) {
                checkChromeInstallability();
            }
        });
    }
}

function checkChromeInstallability() {
    // Check if the page meets PWA criteria
    const manifest = document.querySelector('link[rel="manifest"]');
    const serviceWorker = 'serviceWorker' in navigator;
    const isSecure = location.protocol === 'https:' || location.hostname === 'localhost';
    
    console.log('🔍 PWA Criteria Check:');
    console.log('Manifest:', manifest ? '✅' : '❌');
    console.log('Service Worker:', serviceWorker ? '✅' : '❌');
    console.log('Secure Context:', isSecure ? '✅' : '❌');
    
    if (manifest && serviceWorker && isSecure) {
        console.log('✅ PWA criteria met - browser should show install option');
        
        // Update install banner to be more prominent
        const banner = document.getElementById('installBanner');
        if (banner && banner.classList.contains('show')) {
            const installBtn = banner.querySelector('button');
            if (installBtn) {
                installBtn.textContent = '📱 Install App (PWA Ready!)';
                installBtn.style.animation = 'pulse 2s infinite';
            }
        }
    } else {
        console.log('❌ PWA criteria not fully met');
    }
}

function showInstallBanner() {
    const banner = document.getElementById('installBanner');
    if (banner) {
        banner.classList.add('show');
        console.log('📱 Install banner shown');
    }
}

function dismissInstallBanner() {
    const banner = document.getElementById('installBanner');
    if (banner) {
        banner.classList.remove('show');
        localStorage.setItem('installBannerDismissed', 'true');
    }
}

async function installPWA() {
    if (deferredPrompt) {
        // Native installation prompt available
        deferredPrompt.prompt();
        const { outcome } = await deferredPrompt.userChoice;
        console.log(`User response to the install prompt: ${outcome}`);
        deferredPrompt = null;
        dismissInstallBanner();
    } else {
        // No native prompt - try alternative methods
        console.log('❌ No native install prompt available.');
        
        // Check if we can trigger installation through other means
        if (window.navigator.standalone !== undefined) {
            // iOS Safari
            showIOSInstallInstructions();
        } else if (window.chrome && window.chrome.webstore) {
            // Chrome - check if install button might be available
            showChromeInstallHelp();
        } else {
            // Generic fallback
            showGenericInstallHelp();
        }
    }
}

function showIOSInstallInstructions() {
    const modal = createInstallModal(`
        <div style="text-align: center; padding: 20px;">
            <h3>📱 Install on iOS</h3>
            <p>To install this app on your iPhone/iPad:</p>
            <ol style="text-align: left; margin: 20px 0;">
                <li>Tap the <strong>Share</strong> button <span style="font-size: 20px;">⬆️</span></li>
                <li>Scroll down and tap <strong>"Add to Home Screen"</strong></li>
                <li>Tap <strong>"Add"</strong> to confirm</li>
            </ol>
            <p>The app will appear on your home screen like a native app!</p>
        </div>
    `);
}

function showChromeInstallHelp() {
    const modal = createInstallModal(`
        <div style="text-align: center; padding: 20px;">
            <h3>🔧 Install on Chrome</h3>
            <p>To install this app:</p>
            <ol style="text-align: left; margin: 20px 0;">
                <li>Look for an <strong>Install</strong> icon in the address bar</li>
                <li>Or click the <strong>⋮</strong> menu → <strong>"Install German Hub"</strong></li>
                <li>Click <strong>"Install"</strong> to confirm</li>
            </ol>
            <p>If you don't see these options, try refreshing the page!</p>
        </div>
    `);
}

function showGenericInstallHelp() {
    const modal = createInstallModal(`
        <div style="text-align: center; padding: 20px;">
            <h3>📱 Install This App</h3>
            <p>To install this app on your device:</p>
            <div style="text-align: left; margin: 20px 0;">
                <p><strong>Chrome/Edge:</strong> Look for "Install" button in address bar or Menu → "Install App"</p>
                <p><strong>Firefox:</strong> Menu → "Install This Site as App"</p>
                <p><strong>Safari (iOS):</strong> Share button → "Add to Home Screen"</p>
                <p><strong>Samsung Internet:</strong> Menu → "Add page to" → "Home screen"</p>
            </div>
            <p>This will create a standalone app icon on your device!</p>
        </div>
    `);
}

function createInstallModal(content) {
    // Create modal overlay
    const modal = document.createElement('div');
    modal.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0, 0, 0, 0.5);
        display: flex;
        justify-content: center;
        align-items: center;
        z-index: 10000;
    `;
    
    // Create modal content
    const modalContent = document.createElement('div');
    modalContent.style.cssText = `
        background: white;
        border-radius: 15px;
        max-width: 400px;
        margin: 20px;
        box-shadow: 0 20px 60px rgba(0,0,0,0.3);
        animation: slideIn 0.3s ease;
    `;
    
    modalContent.innerHTML = content + `
        <div style="padding: 20px; text-align: center; border-top: 1px solid #eee;">
            <button onclick="this.closest('.install-modal').remove()" style="
                background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
                color: white;
                border: none;
                padding: 12px 24px;
                border-radius: 8px;
                font-size: 16px;
                cursor: pointer;
                font-weight: 600;
            ">Got It!</button>
        </div>
    `;
    
    modal.appendChild(modalContent);
    modal.className = 'install-modal';
    document.body.appendChild(modal);
    
    // Close on background click
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.remove();
        }
    });
    
    return modal;
}

// PWA Installation Status Check
function checkPWAStatus() {
    console.log('🔍 PWA Status Check:');
    console.log('HTTPS:', location.protocol === 'https:');
    console.log('Service Worker Support:', 'serviceWorker' in navigator);
    console.log('Manifest:', document.querySelector('link[rel="manifest"]') ? 'Found' : 'Missing');
    
    // Check if app is already installed
    window.addEventListener('appinstalled', () => {
        console.log('✅ PWA installed successfully!');
        dismissInstallBanner();
    });
    
    // Check service worker registration
    if ('serviceWorker' in navigator) {
        navigator.serviceWorker.getRegistrations().then(registrations => {
            console.log('Service Workers:', registrations.length > 0 ? 'Registered' : 'Not found');
            if (registrations.length === 0) {
                console.log('⚠️ Service worker not registered yet');
            }
        });
    }
}

// Check if install banner was previously dismissed
window.addEventListener('load', () => {
    checkPWAStatus();
    
    if (localStorage.getItem('installBannerDismissed') === 'true') {
        const banner = document.getElementById('installBanner');
        if (banner) {
            banner.style.display = 'none';
        }
    }
    
    // Enhanced debugging for PWA installation
    setTimeout(() => {
        if (!deferredPrompt) {
            console.log('💡 Install prompt not triggered. Possible reasons:');
            console.log('1. Site not served over HTTPS (except localhost)');
            console.log('2. App already installed');
            console.log('3. Browser doesn\'t support PWA installation');
            console.log('4. PWA criteria not fully met');
            console.log('Current URL:', window.location.href);
            console.log('Is HTTPS:', window.location.protocol === 'https:');
            console.log('Is localhost:', window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1');
        }
    }, 3000);
});

// Register Service Worker with better error handling
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('./service_worker.js')
            .then((registration) => {
                console.log('✅ SW registered successfully:', registration.scope);
                
                // Check for updates
                registration.addEventListener('updatefound', () => {
                    console.log('🔄 SW update found');
                    showUpdateNotification();
                });
            })
            .catch((registrationError) => {
                console.error('❌ SW registration failed:', registrationError);
            });
    });
}

// Cache refresh functionality
async function refreshCache() {
    if ('serviceWorker' in navigator) {
        try {
            const registration = await navigator.serviceWorker.ready;
            if (registration.active) {
                // Create a message channel
                const messageChannel = new MessageChannel();
                
                // Listen for response
                messageChannel.port1.onmessage = function(event) {
                    if (event.data.success) {
                        console.log('✅ Cache refreshed successfully');
                        showCacheRefreshSuccess();
                        // Reload page to get fresh content
                        setTimeout(() => window.location.reload(), 1000);
                    } else {
                        console.error('❌ Cache refresh failed:', event.data.error);
                        showCacheRefreshError();
                    }
                };
                
                // Send message to service worker
                registration.active.postMessage(
                    { type: 'FORCE_CACHE_REFRESH' },
                    [messageChannel.port2]
                );
            }
        } catch (error) {
            console.error('Cache refresh error:', error);
            showCacheRefreshError();
        }
    }
}

function showUpdateNotification() {
    const notification = document.createElement('div');
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
        color: white;
        padding: 15px 20px;
        border-radius: 10px;
        box-shadow: 0 5px 20px rgba(0,0,0,0.2);
        z-index: 10000;
        font-weight: 500;
        max-width: 300px;
    `;
    notification.innerHTML = `
        🔄 App updated! 
        <button onclick="refreshCache()" style="
            background: rgba(255,255,255,0.2);
            color: white;
            border: none;
            padding: 5px 10px;
            border-radius: 5px;
            margin-left: 10px;
            cursor: pointer;
        ">Refresh</button>
        <button onclick="this.parentElement.remove()" style="
            background: none;
            color: white;
            border: none;
            float: right;
            cursor: pointer;
            font-size: 18px;
        ">×</button>
    `;
    document.body.appendChild(notification);
}

function showCacheRefreshSuccess() {
    const message = document.createElement('div');
    message.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: linear-gradient(135deg, #28a745 0%, #20c997 100%);
        color: white;
        padding: 15px 20px;
        border-radius: 10px;
        box-shadow: 0 5px 20px rgba(0,0,0,0.2);
        z-index: 10000;
        font-weight: 500;
    `;
    message.innerHTML = '✅ Cache refreshed! Page will reload...';
    document.body.appendChild(message);
    
    setTimeout(() => {
        if (message.parentElement) {
            message.parentElement.removeChild(message);
        }
    }, 3000);
}

function showCacheRefreshError() {
    const message = document.createElement('div');
    message.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: linear-gradient(135deg, #dc3545 0%, #c82333 100%);
        color: white;
        padding: 15px 20px;
        border-radius: 10px;
        box-shadow: 0 5px 20px rgba(0,0,0,0.2);
        z-index: 10000;
        font-weight: 500;
    `;
    message.innerHTML = '❌ Cache refresh failed. Please try reloading the page.';
    document.body.appendChild(message);
    
    setTimeout(() => {
        if (message.parentElement) {
            message.parentElement.removeChild(message);
        }
    }, 5000);
}

// Offline Status Check
function checkOfflineStatus() {
    if (navigator.onLine) {
        alert('✅ Online: You\'re connected to the internet.\n🔄 The app will also work offline once cached!\n\n📊 PWA Status: Check browser console for details.');
    } else {
        alert('📱 Offline: You\'re browsing offline!\n✨ All content is still accessible thanks to PWA technology.\n\n🎉 This proves the offline functionality works!');
    }
    checkPWAStatus();
}

// Update online/offline status
window.addEventListener('online', () => {
    console.log('Back online');
});

window.addEventListener('offline', () => {
    console.log('Gone offline');
});

// Global Search Functionality
let searchIndex = null;
let searchTimeout = null;

// Content mapping for all pages in the application
const pageContent = {
    'index.html': {
        title: 'German Learning Hub - Home',
        content: 'German Learning Hub vocabulary grammar practice tools comprehensive platform learning words phrases pronunciation interactive content responsive tables offline access Guten Tag vocabulary words learning categories',
        url: 'index.html'
    },
    'content/vocabulary/index.html': {
        title: 'German Vocabulary Hub',
        content: 'vocabulary W-words professions food drinks city locations German words vocabulary sections browse',
        url: 'content/vocabulary/index.html'
    },
    'content/vocabulary/w-words-verbs.html': {
        title: 'German W-Words - Complete Reference',
        content: 'W-words Was what Wer who Wen whom accusative Wem whom dative Wessen whose Welche which Wie how Wie viel how much Wie viele how many Warum why Wieso why informal Weshalb why formal Wo where static Wohin where to Woher where from Wodurch through what Worauf on what Worin in what Wobei whereby Wann when specific Wenn when if conditional Wie lange how long Wie oft how often Wie spät what time Wochentag day week Während during Wegen because of Womöglich possibly Weder neither Weiter further Wieder again Wichtig important German question words interrogative pronouns relative pronouns verbs complete reference',
        url: 'content/vocabulary/w-words-verbs.html'
    },
    'content/vocabulary/professions.html': {
        title: 'German Professions',
        content: 'professions jobs careers Sekretär Sekretärin secretary Manager Managerin manager Lehrer Lehrerin teacher Arzt Ärztin doctor Ingenieur Ingenieurin engineer Polizist Polizistin police officer Verkäufer Verkäuferin salesperson Schriftsteller Schriftstellerin writer Journalist Journalistin journalist Bäcker Bäckerin baker Architekt Architektin architect Koch Köchin cook chef Krankenpfleger Krankenschwester nurse Geschäftsmann Geschäftsfrau businessperson Pilot Pilotin pilot Sänger Sängerin singer Friseur Friseurin hairdresser Taxifahrer Taxifahrerin taxi driver Kellner Kellnerin waiter server Flugbegleiter Flugbegleiterin flight attendant Bankangestellte bank employee Schüler Schülerin student Programmierer Programmiererin programmer German occupations work masculine feminine forms',
        url: 'content/vocabulary/professions.html'
    },
    'content/vocabulary/profession_page.html': {
        title: 'German Professions Page',
        content: 'professions jobs careers occupations German work professional vocabulary',
        url: 'content/vocabulary/profession_page.html'
    },
    'content/vocabulary/food_drinks_vehicles.html': {
        title: 'German Food, Drinks & Vehicles',
        content: 'food drinks vehicles Essen eat trinken drink Apfel apple Banane banana Orange orange Erdbeere strawberry Traube grape Birne pear Zitrone lemon Karotte carrot Tomate tomato Kartoffel potato Zwiebel onion Salat lettuce Kohl cabbage Fleisch meat Hähnchen chicken Rindfleisch beef Fisch fish Wurst sausage Ei egg Milch milk Käse cheese Butter butter Joghurt yogurt Brot bread Brötchen roll Reis rice Nudel pasta Wasser water Saft juice Kaffee coffee Tee tea Bier beer Wein wine Auto car Bus bus Zug train Flugzeug airplane Fahrrad bicycle Motorrad motorcycle Schiff ship Boot boat Taxi taxi Straßenbahn tram U-Bahn subway LKW truck lecker delicious gut good schlecht bad süß sweet sauer sour salzig salty scharf spicy heiß hot kalt cold frisch fresh hungrig hungry durstig thirsty satt full kochen cook German vocabulary',
        url: 'content/vocabulary/food_drinks_vehicles.html'
    },
    'content/vocabulary/city-locations.html': {
        title: 'German City Locations',
        content: 'city locations Stadt city Straße street Platz square Park park Bahnhof train station Flughafen airport Kirche church Brücke bridge Landungsbrücke landing bridge Kunsthalle art gallery Bank bank Insel island Bibliothek library Schule school Post post office Autobahn highway Haltestelle bus stop Museum museum Planetarium planetarium Rathaus town hall Theater theater Konzerthaus concert hall Einkaufszentrum shopping center Hotel hotel Krankenhaus hospital Restaurant restaurant Meer sea Denkmal monument Markt market Turm tower Tierpark zoo Zoo zoo Friedhof cemetery Hafen harbor Garten garden Spielplatz playground Fluss river Strand beach Parkplatz parking lot German places urban vocabulary der die das articles',
        url: 'content/vocabulary/city-locations.html'
    },
    'content/vocabulary/german_time_days.html': {
        title: 'German Time & Days',
        content: 'time days Zeit time Uhr clock Uhrzeit time Stunde hour Minute minute Sekunde second Montag Monday Dienstag Tuesday Mittwoch Wednesday Donnerstag Thursday Freitag Friday Samstag Saturday Sonntag Sunday Morgen morning Vormittag forenoon Mittag noon Nachmittag afternoon Abend evening Nacht night heute today gestern yesterday morgen tomorrow jetzt now früh early spät late pünktlich on time drei Uhr three oclock halb vier half past three Viertel nach quarter past Viertel vor quarter to German temporal vocabulary days week',
        url: 'content/vocabulary/german_time_days.html'
    },
    'content/vocabulary/family_classroomArticles.html': {
        title: 'German Family & Classroom Articles',
        content: 'family classroom articles Familie family Vater father Mutter mother Sohn son Tochter daughter Bruder brother Schwester sister Großvater grandfather Großmutter grandmother Onkel uncle Tante aunt Cousin male cousin Cousine female cousin Neffe nephew Nichte niece Ehemann husband Ehefrau wife Schwiegervater father-in-law Schwiegermutter mother-in-law Schwiegersohn son-in-law Schwiegertochter daughter-in-law Enkelsohn grandson Enkeltochter granddaughter Bleistift pencil Kuli ballpoint pen Filzstift felt-tip pen Marker marker Radiergummi eraser Spitzer pencil sharpener Ordner folder Stuhl chair Tisch table Computer computer Taschenrechner calculator Schere scissors Tafel blackboard Tasche bag Büroklammer paper clip Tür door Buch book Heft notebook Wörterbuch dictionary Lineal ruler Mäppchen pencil case Fenster window Name name Vorname first name Nachname last name Alter age Geburtsort birthplace Geburtsdatum date birth Adresse address ledig single verlobt engaged verheiratet married geschieden divorced verwitwet widowed Staatsangehörigkeit nationality Sprachen languages Muttersprache mother tongue Fremdsprache foreign language Beruf profession Ausbildung training Studium studies Student student arbeitslos unemployed German family classroom vocabulary der die das articles',
        url: 'content/vocabulary/family_classroomArticles.html'
    },
    'content/grammar/index.html': {
        title: 'German Grammar Hub',
        content: 'grammar German grammar articles cases irregular verbs sentence structure comprehensive guides examples conjugation tables',
        url: 'content/grammar/index.html'
    },
    'content/grammar/german_articles.html': {
        title: 'German Articles & Cases',
        content: 'articles cases der die das den einen eine ein kein keine keinen definite indefinite negative possessive mein meine meinen dein deine deinen sein seine seinen ihr ihre ihren unser unsere unseren euer eure euren Ihr Ihre Ihren nominative accusative dative genitive Nominativ Akkusativ Bestimmter Artikel Unbestimmter Artikel Negationsartikel Possessiv Artikel Wer oder was Wen oder was German articles cases possessive pronouns declension grammar',
        url: 'content/grammar/german_articles.html'
    },
    'content/grammar/german_irregular_verbs.html': {
        title: 'German Irregular Verbs',
        content: 'irregular verbs fahren drive ich fahre du fährst er fährt wir fahren ihr fahrt sie fahren schlafen sleep ich schlafe du schläfst er schläft wir schlafen ihr schlaft sie schlafen laufen run walk ich laufe du läufst er läuft wir laufen ihr lauft sie laufen sehen see ich sehe du siehst er sieht wir sehen ihr seht sie sehen lesen read ich lese du liest er liest wir lesen ihr lest sie lesen sprechen speak ich spreche du sprichst er spricht wir sprechen ihr sprecht sie sprechen essen eat ich esse du isst er isst wir essen ihr esst sie essen geben give ich gebe du gibst er gibt wir geben ihr gebt sie geben Unregelmäßige Verben Stammwechsel stem change Konjugation conjugation German irregular verbs verb forms strong verbs weak verbs',
        url: 'content/grammar/german_irregular_verbs.html'
    },
    'content/vocabulary/unified_vocabulary_reference.html': {
        title: 'Unified German Vocabulary Reference',
        content: 'unified vocabulary reference complete German words phrases expressions comprehensive guide W-words Wer who Was what Wo where Wann when Wie how Warum why question words interrogative pronouns food drinks Apfel apple Banane banana Wasser water Kaffee coffee vehicles Auto car Bus bus Zug train Flugzeug airplane city locations Bahnhof train station Museum museum Park park time days Montag Monday Dienstag Tuesday Mittwoch Wednesday heute today gestern yesterday morgen tomorrow family Vater father Mutter mother Bruder brother Schwester sister classroom Bleistift pencil Buch book Stuhl chair Tisch table professions Arzt doctor Lehrer teacher Koch chef Verkäufer salesperson pronunciation IPA phonetic transcription articles der die das grammar cases nominative accusative dative genitive German learning vocabulary tables reference guide all categories combined comprehensive complete unified',
        url: 'content/vocabulary/unified_vocabulary_reference.html'
    }
};

function performSearch(query) {
    clearTimeout(searchTimeout);
    
    if (!query || query.length < 2) {
        hideSearchResults();
        return;
    }

    searchTimeout = setTimeout(() => {
        const results = searchContent(query.toLowerCase());
        displaySearchResults(results, query);
    }, 300);
}

function searchContent(query) {
    const results = [];
    
    Object.entries(pageContent).forEach(([path, page]) => {
        const titleMatch = page.title.toLowerCase().includes(query);
        const contentMatch = page.content.toLowerCase().includes(query);
        
        if (titleMatch || contentMatch) {
            let relevanceScore = 0;
            
            // Higher score for title matches
            if (titleMatch) relevanceScore += 10;
            if (contentMatch) relevanceScore += 5;
            
            // Higher score for exact word matches
            const words = query.split(' ');
            words.forEach(word => {
                if (word.length > 1) {
                    const regex = new RegExp('\\b' + word + '\\b', 'i');
                    if (regex.test(page.title)) relevanceScore += 5;
                    if (regex.test(page.content)) relevanceScore += 2;
                }
            });

            // Extract relevant snippet
            const snippet = extractSnippet(page.content, query);
            
            results.push({
                title: page.title,
                content: snippet,
                url: page.url,
                score: relevanceScore
            });
        }
    });

    // Sort by relevance score
    return results.sort((a, b) => b.score - a.score).slice(0, 8);
}

function extractSnippet(content, query) {
    const words = content.split(' ');
    const queryWords = query.toLowerCase().split(' ');
    let bestStart = 0;
    let bestScore = 0;

    // Find the best 15-word snippet that contains query terms
    for (let i = 0; i <= words.length - 15; i++) {
        const snippet = words.slice(i, i + 15).join(' ').toLowerCase();
        let score = 0;
        
        queryWords.forEach(qWord => {
            if (qWord.length > 1 && snippet.includes(qWord)) {
                score++;
            }
        });

        if (score > bestScore) {
            bestScore = score;
            bestStart = i;
        }
    }

    const snippet = words.slice(bestStart, bestStart + 15).join(' ');
    return snippet.length > 100 ? snippet.substring(0, 100) + '...' : snippet;
}

function displaySearchResults(results, query) {
    const searchResults = document.getElementById('searchResults');
    
    if (!searchResults) return;
    
    if (results.length === 0) {
        searchResults.innerHTML = '<div class="no-results">No results found for "' + query + '"</div>';
    } else {
        searchResults.innerHTML = results.map(result => `
            <div class="search-result-item" onclick="navigateToPage('${result.url}')">
                <div class="search-result-title">${highlightQuery(result.title, query)}</div>
                <div class="search-result-content">${highlightQuery(result.content, query)}</div>
                <div class="search-result-page">${result.url}</div>
            </div>
        `).join('');
    }
    
    searchResults.style.display = 'block';
}

function highlightQuery(text, query) {
    const words = query.split(' ').filter(word => word.length > 1);
    let highlightedText = text;
    
    words.forEach(word => {
        const regex = new RegExp(`(${word})`, 'gi');
        highlightedText = highlightedText.replace(regex, '<strong style="background-color: #fff3cd; color: #856404;">$1</strong>');
    });
    
    return highlightedText;
}

function navigateToPage(url) {
    window.location.href = url;
}

function hideSearchResults() {
    const searchResults = document.getElementById('searchResults');
    if (searchResults) {
        searchResults.style.display = 'none';
    }
}

// Hide search results when clicking outside
document.addEventListener('click', function(event) {
    const searchContainer = document.querySelector('.search-container');
    if (searchContainer && !searchContainer.contains(event.target)) {
        hideSearchResults();
    }
});

// Handle search result navigation with keyboard
document.addEventListener('DOMContentLoaded', function() {
    const globalSearch = document.getElementById('globalSearch');
    if (globalSearch) {
        globalSearch.addEventListener('keydown', function(event) {
            const searchResults = document.getElementById('searchResults');
            const resultItems = searchResults ? searchResults.querySelectorAll('.search-result-item') : [];
            
            if (event.key === 'Escape') {
                hideSearchResults();
                this.blur();
            } else if (event.key === 'Enter' && resultItems.length > 0) {
                // Navigate to first result on Enter
                const firstResult = resultItems[0];
                const url = firstResult.getAttribute('onclick').match(/'([^']+)'/)[1];
                navigateToPage(url);
            }
        });
    }
});