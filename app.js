// -------------------------------------------------------------
// XAU/USD SIGNAL TERMINAL STATE & LOGIC
// -------------------------------------------------------------

document.addEventListener('DOMContentLoaded', () => {
    // Current application state
    const state = {
        lang: 'en', // Default language is English
        apiKey: localStorage.getItem('finnhub_api_key') || '',

        // Step 1: Trend
        trendMn: 'Bullish',
        trendW1: 'Bearish',
        trendD1: 'Bearish',
        trendH4: 'Bearish',
        trendH1: 'Bearish',

        // Step 2: Support and Resistance
        r1: 4173.0,
        r1Strength: 'Medium',
        r2: 4200.0,
        r2Strength: 'Strong',
        s1: 4145.0,
        s1Strength: 'Medium',
        s2: 4120.0,
        s2Strength: 'Strong',

        // Step 3: Supply & Demand
        supplyTop: 4190.0,
        supplyBottom: 4175.0,
        demandTop: 4135.0,
        demandBottom: 4120.0,

        // Step 4 & 5: SMC Toggles
        bslSweep: false,
        sslSweep: false,
        bos: false,
        choch: false,

        // Step 6: Confirmation
        candleConfirmation: 'None',

        // Step 7: Fundamentals
        dxyStrength: 'Strong',
        fedStance: 'Hawkish',
        geoRisk: 'Supporting',

        // Step 8: Risk Management
        currentPrice: 4138.2,
        entryZone: 4140.0,
        stopLoss: 4125.0,
        tp1: 4170.0,
        tp2: 4195.0,

        // Chart parameters
        chartTimeframe: '4h',
        historicalCandles: []
    };

    // Dictionary mappings for English and Khmer
    const i18n = {
        en: {
            "logo-sub": "INSTITUTIONAL SIGNAL TERMINAL",
            "header-time": "TIME",
            "header-feed": "FEED",
            "header-live": "LIVE DATA",
            "header-lang": "LANGUAGE / ភាសា",
            "panel-title": "Analysis Parameters",
            "btn-reset": "Reset Defaults",
            "tab-trend": "Trend & S/R",
            "tab-smc": "SMC & Liquidity",
            "tab-risk": "Risk & Fund",
            "sec-trend": "Trend Analysis (Timeframes)",
            "label-mn": "Monthly (MN)",
            "label-w1": "Weekly (W1)",
            "label-d1": "Daily (D1)",
            "label-h4": "4-Hour (H4)",
            "label-h1": "1-Hour (H1)",
            "val-bull": "BULL",
            "val-bear": "BEAR",
            "val-range": "RANGE",
            "sec-sr": "Support & Resistance Levels",
            "label-r1": "Resistance 1 Level",
            "label-r2": "Resistance 2 Level",
            "label-s1": "Support 1 Level",
            "label-s2": "Support 2 Level",
            "label-strength": "Strength",
            "opt-strong": "Strong",
            "opt-medium": "Medium",
            "opt-weak": "Weak",
            "sec-zones": "Supply & Demand Zones",
            "label-supply-top": "Supply Zone (Top)",
            "label-supply-bottom": "Supply Zone (Bottom)",
            "label-demand-top": "Demand Zone (Top)",
            "label-demand-bottom": "Demand Zone (Bottom)",
            "sec-smc": "SMC Indicators",
            "label-liquidity": "Liquidity Sweeps",
            "label-bsl": "Buy-Side Liquidity (BSL) Swept",
            "label-ssl": "Sell-Side Liquidity (SSL) Swept",
            "label-mss": "Market Structure Shifts",
            "label-bos": "Break of Structure (BOS)",
            "label-choch": "Change of Character (CHOCH)",
            "sec-candle": "Candlestick Confirmation",
            "label-pattern": "Confirmation Pattern",
            "opt-none": "None / No Confirmation",
            "opt-bull-eng": "Bullish Engulfing",
            "opt-bear-eng": "Bearish Engulfing",
            "opt-pinbar": "Pin Bar (Rejection)",
            "opt-momentum": "Momentum Candle",
            "sec-fundamentals": "Fundamental Filters",
            "label-dxy": "USD Index Trend (DXY)",
            "label-fed": "Fed Stance",
            "label-geo": "Geopolitical Risk",
            "val-strong": "STRONG",
            "val-weak": "WEAK",
            "val-hawk": "HAWKISH",
            "val-dov": "DOVISH",
            "val-opp": "OPPOSING",
            "val-supp": "SUPPORTING",
            "sec-risk": "Risk Management & Entry",
            "label-price": "Current Price",
            "label-entry": "Entry Zone Limit",
            "label-sl": "Stop Loss (SL)",
            "label-tp1": "Take Profit 1 (TP1)",
            "label-tp2": "Take Profit 2 (TP2)",
            "label-rr": "Calculated RR Ratio",
            "sec-chart-title": "Live Technical Setup",
            "legend-supply": "Supply",
            "legend-demand": "Demand",
            "legend-entry": "Entry",
            "legend-sl": "SL",
            "legend-tp": "TP",
            "card-signal": "SIGNAL OUTPUT",
            "label-confidence": "Signal Confidence",
            "card-rationale": "SYSTEM STATUS & RATIONALE",
            "card-report": "INSTITUTIONAL SIGNAL REPORT",
            "btn-copy": "Copy Signal Report",
            "badge-live": "● Live",
            "badge-offline": "● Offline",
            "badge-live-finnhub": "● Live (Finnhub)",
            "badge-live-paxg": "● Live (PAXG)",
            "sec-api-config": "API Settings",
            "label-finnhub-key": "Finnhub API Key (Optional)"
        },
        kh: {
            "logo-sub": "ប្រព័ន្ធវិភាគសញ្ញាជួញដូរកម្រិតស្ថាប័ន",
            "header-time": "ម៉ោង",
            "header-feed": "ប្រភពទិន្នន័យ",
            "header-live": "ទិន្នន័យផ្សាយផ្ទាល់",
            "header-lang": "ភាសា / LANGUAGE",
            "panel-title": "ប៉ារ៉ាម៉ែត្រវិភាគ",
            "btn-reset": "កំណត់ឡើងវិញ",
            "tab-trend": "និន្នាការ & របាំងគាំទ្រ/រំខាន",
            "tab-smc": "SMC & លំហូរលុយ",
            "tab-risk": "ហានិភ័យ & ព័ត៌មានម៉ាក្រូ",
            "sec-trend": "ការវិភាគនិន្នាការ (ពេលវេលា)",
            "label-mn": "ប្រចាំខែ (MN)",
            "label-w1": "ប្រចាំសប្តាហ៍ (W1)",
            "label-d1": "ប្រចាំថ្ងៃ (D1)",
            "label-h4": "៤ ម៉ោង (H4)",
            "label-h1": "១ ម៉ោង (H1)",
            "val-bull": "កើនឡើង",
            "val-bear": "ធ្លាក់ចុះ",
            "val-range": "ចំហៀង",
            "sec-sr": "កម្រិតគាំទ្រ និង របាំងរំខាន",
            "label-r1": "កម្រិតរបាំងរំខាន ១ (R1)",
            "label-r2": "កម្រិតរបាំងរំខាន ២ (R2)",
            "label-s1": "កម្រិតគាំទ្រ ១ (S1)",
            "label-s2": "កម្រិតគាំទ្រ ២ (S2)",
            "label-strength": "កម្លាំង",
            "opt-strong": "ខ្លាំង",
            "opt-medium": "មធ្យម",
            "opt-weak": "ខ្សោយ",
            "sec-zones": "តំបន់ផ្គត់ផ្គង់ និង តម្រូវការ",
            "label-supply-top": "តំបន់ផ្គត់ផ្គង់ (ខ្ពស់)",
            "label-supply-bottom": "តំបន់ផ្គត់ផ្គង់ (ទាប)",
            "label-demand-top": "តំបន់តម្រូវការ (ខ្ពស់)",
            "label-demand-bottom": "តំបន់តម្រូវការ (ទាប)",
            "sec-smc": "សូចនាករស្ថាប័ន SMC",
            "label-liquidity": "ការប្រមូលលំហូរលុយ (Sweeps)",
            "label-bsl": "ការប្រមូលទិញ (BSL) រួចរាល់",
            "label-ssl": "ការប្រមូលលក់ (SSL) រួចរាល់",
            "label-mss": "ការផ្លាស់ប្តូររចនាសម្ព័ន្ធទីផ្សារ",
            "label-bos": "ការបំបែករចនាសម្ព័ន្ធ (BOS)",
            "label-choch": "ការប្តូរលក្ខណៈនិន្នាការ (CHOCH)",
            "sec-candle": "ការបញ្ជាក់ដោយទម្រង់ទៀន",
            "label-pattern": "ទម្រង់ទៀនបញ្ជាក់",
            "opt-none": "គ្មានការបញ្ជាក់",
            "opt-bull-eng": "ទៀនលេបឡើង (Bullish Engulfing)",
            "opt-bear-eng": "ទៀនលេបចុះ (Bearish Engulfing)",
            "opt-pinbar": "ទៀនច្រានថ្លៃ (Pin Bar / Rejection)",
            "opt-momentum": "ទៀនកម្លាំងខ្លាំង (Momentum)",
            "sec-fundamentals": "តម្រងព័ត៌មានម៉ាក្រូសេដ្ឋកិច្ច",
            "label-dxy": "និន្នាការដុល្លារ (DXY)",
            "label-fed": "ជំហរធនាគារកណ្តាល Fed",
            "label-geo": "ហានិភ័យភូមិសាស្ត្រនយោបាយ",
            "val-strong": "ឡើងខ្លាំង",
            "val-weak": "ចុះខ្សោយ",
            "val-hawk": "ដំឡើងការប្រាក់",
            "val-dov": "បញ្ចុះការប្រាក់",
            "val-opp": "ប្រឆាំងបច្ចេកទេស",
            "val-supp": "គាំទ្របច្ចេកទេស",
            "sec-risk": "ការគ្រប់គ្រងហានិភ័យ & ចំណុចចូល",
            "label-price": "តម្លៃបច្ចុប្បន្ន",
            "label-entry": "ដែនកំណត់ចំណុចចូល",
            "label-sl": "ចំណុចកាត់ខាត (SL)",
            "label-tp1": "ចំណុចយកចំណេញ ១ (TP1)",
            "label-tp2": "ចំណុចយកចំណេញ ២ (TP2)",
            "label-rr": "ផលធៀប R:R គណនាឃើញ",
            "sec-chart-title": "ការរៀបចំគំនូសតាងបច្ចេកទេស",
            "legend-supply": "ផ្គត់ផ្គង់",
            "legend-demand": "តម្រូវការ",
            "legend-entry": "ចំណុចចូល",
            "legend-sl": "កាត់ខាត",
            "legend-tp": "យកចំណេញ",
            "card-signal": "លទ្ធផលសញ្ញាជួញដូរ",
            "label-confidence": "កម្រិតទំនុកចិត្តសញ្ញា",
            "card-rationale": "ស្ថានភាពប្រព័ន្ធ & ហេតុផលវិភាគ",
            "card-report": "របាយការណ៍សញ្ញាជួញដូរកម្រិតស្ថាប័ន",
            "btn-copy": "ចម្លងរបាយការណ៍សញ្ញា",
            "badge-live": "● ផ្សាយផ្ទាល់",
            "badge-offline": "● គ្មានសេវា",
            "badge-live-finnhub": "● ផ្សាយផ្ទាល់ (Finnhub)",
            "badge-live-paxg": "● ផ្សាយផ្ទាល់ (PAXG)",
            "sec-api-config": "ការកំណត់ API",
            "label-finnhub-key": "កូនសោ Finnhub API (ស្រេចចិត្ត)"
        }
    };

    const valueTranslations = {
        en: {
            "Strong": "Strong",
            "Medium": "Medium",
            "Weak": "Weak",
            "Bullish": "Bullish",
            "Bearish": "Bearish",
            "Neutral": "Neutral"
        },
        kh: {
            "Strong": "ខ្លាំង",
            "Medium": "មធ្យម",
            "Weak": "ខ្សោយ",
            "Bullish": "កើនឡើង (Bullish)",
            "Bearish": "ធ្លាក់ចុះ (Bearish)",
            "Neutral": "ឥតនិន្នាការ (Neutral)"
        }
    };

    // DOM Elements
    const elements = {
        time: document.getElementById('current-time'),
        resetBtn: document.getElementById('reset-btn'),
        tabBtns: document.querySelectorAll('.tab-btn'),
        tabContents: document.querySelectorAll('.tab-content'),
        langSelect: document.getElementById('lang-select'),
        feedStatusVal: document.getElementById('feed-status-val'),
        
        // Inputs S/R
        inputR1: document.getElementById('input-r1'),
        strengthR1: document.getElementById('strength-r1'),
        inputR2: document.getElementById('input-r2'),
        strengthR2: document.getElementById('strength-r2'),
        inputS1: document.getElementById('input-s1'),
        strengthS1: document.getElementById('strength-s1'),
        inputS2: document.getElementById('input-s2'),
        strengthS2: document.getElementById('strength-s2'),

        // Inputs Supply/Demand
        inputSupplyTop: document.getElementById('input-supply-top'),
        inputSupplyBottom: document.getElementById('input-supply-bottom'),
        inputDemandTop: document.getElementById('input-demand-top'),
        inputDemandBottom: document.getElementById('input-demand-bottom'),

        // Inputs Checks
        checkBslSweep: document.getElementById('check-bsl-sweep'),
        checkSslSweep: document.getElementById('check-ssl-sweep'),
        checkBos: document.getElementById('check-bos'),
        checkChoch: document.getElementById('check-choch'),

        // Inputs Candle
        candleConfirmation: document.getElementById('candle-confirmation'),

        // Inputs Risk
        inputCurrentPrice: document.getElementById('input-current-price'),
        inputEntryZone: document.getElementById('input-entry-zone'),
        inputStopLoss: document.getElementById('input-stop-loss'),
        inputTp1: document.getElementById('input-tp1'),
        inputTp2: document.getElementById('input-tp2'),
        inputApiKey: document.getElementById('input-api-key'),

        // Outputs
        valRrRatio: document.getElementById('val-rr-ratio'),
        valRrStatus: document.getElementById('val-rr-status'),
        signalBadge: document.getElementById('signal-badge'),
        signalText: document.getElementById('signal-text'),
        confidencePercentage: document.getElementById('confidence-percentage'),
        confidenceBar: document.getElementById('confidence-bar'),
        signalRationale: document.getElementById('signal-rationale'),
        exportText: document.getElementById('export-text'),
        copyBtn: document.getElementById('copy-signal-btn'),

        // Chart
        svgChart: document.getElementById('svg-chart'),
        chartOverlay: document.getElementById('chart-overlay'),
        chartTfSelect: document.getElementById('chart-tf-select')
    };

    // Initialize clock
    function updateClock() {
        const now = new Date();
        const utcStr = now.toISOString().replace('T', ' ').substring(0, 19) + ' UTC';
        elements.time.textContent = utcStr;
    }
    setInterval(updateClock, 1000);
    updateClock();

    // Reset Defaults
    const defaultState = JSON.parse(JSON.stringify(state));
    elements.resetBtn.addEventListener('click', () => {
        const activeLang = state.lang; // preserve language
        Object.assign(state, JSON.parse(JSON.stringify(defaultState)));
        state.lang = activeLang;
        syncUIFromState();
        evaluateAndRender();
    });

    // Tab Navigation
    elements.tabBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            elements.tabBtns.forEach(b => b.classList.remove('active'));
            elements.tabContents.forEach(c => c.classList.add('hidden'));
            
            btn.classList.add('active');
            const tabId = btn.getAttribute('data-tab');
            document.getElementById(tabId).classList.remove('hidden');
        });
    });

    // Language Selector Event
    elements.langSelect.addEventListener('change', () => {
        state.lang = elements.langSelect.value;
        applyTranslations(state.lang);
        evaluateAndRender();
    });

    // Translate statically marked DOM elements
    function applyTranslations(lang) {
        document.querySelectorAll('[data-i18n]').forEach(el => {
            const key = el.getAttribute('data-i18n');
            if (i18n[lang] && i18n[lang][key]) {
                el.textContent = i18n[lang][key];
            }
        });

        // Translate the input placeholder dynamically
        const apiKeyInput = document.getElementById('input-api-key');
        if (apiKeyInput) {
            apiKeyInput.placeholder = lang === 'kh' ? 'បញ្ចូលកូនសោ Finnhub API...' : 'Enter Finnhub API Key...';
        }
        
        // Also sync the live ticker badge translations manually based on online/offline state
        const badge = document.getElementById('live-ticker-badge');
        if (badge) {
            const isOffline = badge.classList.contains('offline');
            if (isOffline) {
                badge.setAttribute('data-i18n', 'badge-offline');
                badge.textContent = i18n[lang]['badge-offline'];
            } else {
                const text = badge.textContent;
                const isFinnhub = text.includes('Finnhub');
                badge.setAttribute('data-i18n', isFinnhub ? 'badge-live-finnhub' : 'badge-live-paxg');
                badge.textContent = i18n[lang][isFinnhub ? 'badge-live-finnhub' : 'badge-live-paxg'];
            }
        }
        
        // Handle copy button dynamic state resetting
        elements.copyBtn.innerHTML = `
            <svg class="icon" viewBox="0 0 24 24"><path d="M16 1H4c-1.1 0-2 .9-2 2v14h2V3h12V1zm3 4H8c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h11c1.1 0 2-.9 2-2V7c0-1.1-.9-2-2-2zm0 16H8V7h11v14z"/></svg>
            <span>${i18n[lang]["btn-copy"]}</span>
        `;
    }

    // Handle Toggle Buttons (Trend & Fundamentals)
    document.querySelectorAll('.toggle-group').forEach(group => {
        const param = group.getAttribute('data-param');
        const buttons = group.querySelectorAll('.toggle-btn');
        
        buttons.forEach(btn => {
            btn.addEventListener('click', () => {
                buttons.forEach(b => b.classList.remove('active'));
                btn.classList.add('active');
                
                const val = btn.getAttribute('data-val');
                const key = paramToStateKey(param);
                state[key] = val;
                
                evaluateAndRender();
            });
        });
    });

    function paramToStateKey(param) {
        return param.replace(/-([a-z0-9])/g, g => g[1].toUpperCase());
    }

    // Input Sync Handlers
    function setupInputSync(elem, stateKey, isNumber = true, isCheckbox = false) {
        elem.addEventListener('input', () => {
            if (isCheckbox) {
                state[stateKey] = elem.checked;
            } else if (isNumber) {
                state[stateKey] = parseFloat(elem.value) || 0;
            } else {
                state[stateKey] = elem.value;
            }
            evaluateAndRender();
        });
    }

    setupInputSync(elements.inputR1, 'r1');
    setupInputSync(elements.strengthR1, 'r1Strength', false);
    setupInputSync(elements.inputR2, 'r2');
    setupInputSync(elements.strengthR2, 'r2Strength', false);
    setupInputSync(elements.inputS1, 's1');
    setupInputSync(elements.strengthS1, 's1Strength', false);
    setupInputSync(elements.inputS2, 's2');
    setupInputSync(elements.strengthS2, 's2Strength', false);

    setupInputSync(elements.inputSupplyTop, 'supplyTop');
    setupInputSync(elements.inputSupplyBottom, 'supplyBottom');
    setupInputSync(elements.inputDemandTop, 'demandTop');
    setupInputSync(elements.inputDemandBottom, 'demandBottom');

    setupInputSync(elements.checkBslSweep, 'bslSweep', false, true);
    setupInputSync(elements.checkSslSweep, 'sslSweep', false, true);
    setupInputSync(elements.checkBos, 'bos', false, true);
    setupInputSync(elements.checkChoch, 'choch', false, true);

    setupInputSync(elements.candleConfirmation, 'candleConfirmation', false);

    setupInputSync(elements.inputCurrentPrice, 'currentPrice');
    setupInputSync(elements.inputEntryZone, 'entryZone');
    setupInputSync(elements.inputStopLoss, 'stopLoss');
    setupInputSync(elements.inputTp1, 'tp1');
    setupInputSync(elements.inputTp2, 'tp2');

    // Custom API Key event listener
    elements.inputApiKey.addEventListener('input', () => {
        const val = elements.inputApiKey.value.trim();
        state.apiKey = val;
        localStorage.setItem('finnhub_api_key', val);
        fetchLivePrice();
    });

    if (elements.chartTfSelect) {
        elements.chartTfSelect.addEventListener('change', () => {
            state.chartTimeframe = elements.chartTfSelect.value;
            fetchHistoricalCandles();
        });
    }

    // Synchronize UI inputs to match internal state (for resets/init)
    function syncUIFromState() {
        elements.langSelect.value = state.lang;
        elements.inputApiKey.value = state.apiKey;
        elements.inputR1.value = state.r1;
        elements.strengthR1.value = state.r1Strength;
        elements.inputR2.value = state.r2;
        elements.strengthR2.value = state.r2Strength;
        elements.inputS1.value = state.s1;
        elements.strengthS1.value = state.s1Strength;
        elements.inputS2.value = state.s2;
        elements.strengthS2.value = state.s2Strength;

        elements.inputSupplyTop.value = state.supplyTop;
        elements.inputSupplyBottom.value = state.supplyBottom;
        elements.inputDemandTop.value = state.demandTop;
        elements.inputDemandBottom.value = state.demandBottom;

        elements.checkBslSweep.checked = state.bslSweep;
        elements.checkSslSweep.checked = state.sslSweep;
        elements.checkBos.checked = state.bos;
        elements.checkChoch.checked = state.choch;

        elements.candleConfirmation.value = state.candleConfirmation;

        elements.inputCurrentPrice.value = state.currentPrice;
        elements.inputEntryZone.value = state.entryZone;
        elements.inputStopLoss.value = state.stopLoss;
        elements.inputTp1.value = state.tp1;
        elements.inputTp2.value = state.tp2;

        if (elements.chartTfSelect) {
            elements.chartTfSelect.value = state.chartTimeframe;
        }

        // Reset toggles visual state
        document.querySelectorAll('.toggle-group').forEach(group => {
            const param = group.getAttribute('data-param');
            const key = paramToStateKey(param);
            const val = state[key];
            const buttons = group.querySelectorAll('.toggle-btn');
            buttons.forEach(btn => {
                if (btn.getAttribute('data-val') === val) {
                    btn.classList.add('active');
                } else {
                    btn.classList.remove('active');
                }
            });
        });
        
        applyTranslations(state.lang);
    }

    // Copy to clipboard
    elements.copyBtn.addEventListener('click', () => {
        const text = elements.exportText.textContent;
        navigator.clipboard.writeText(text).then(() => {
            const originalText = elements.copyBtn.innerHTML;
            elements.copyBtn.innerHTML = `
                <svg class="icon" viewBox="0 0 24 24"><path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/></svg>
                <span>${state.lang === 'kh' ? 'ចម្លងរួចរាល់!' : 'Copied Report!'}</span>
            `;
            elements.copyBtn.style.background = 'var(--color-buy)';
            elements.copyBtn.style.color = '#000';
            setTimeout(() => {
                elements.copyBtn.innerHTML = originalText;
                elements.copyBtn.style.background = '';
                elements.copyBtn.style.color = '';
            }, 2000);
        });
    });

    // -------------------------------------------------------------
    // SIGNAL ENGINE CALCULATIONS & RENDER
    // -------------------------------------------------------------

    function evaluateAndRender() {
        // Calculate Trend Bias
        const weights = { Mn: 1.0, W1: 1.5, D1: 3.0, H4: 2.0, H1: 1.0 };
        let trendScore = 0;
        
        ['Mn', 'W1', 'D1', 'H4', 'H1'].forEach(tf => {
            const stateVal = state['trend' + tf];
            const w = weights[tf];
            if (stateVal === 'Bullish') trendScore += w;
            if (stateVal === 'Bearish') trendScore -= w;
        });
        
        let overallBias = 'Neutral';
        if (trendScore >= 2.0) overallBias = 'Bullish';
        else if (trendScore <= -2.0) overallBias = 'Bearish';

        // Calculate Risk/Reward
        let rrRatioVal = 0;
        let isRrValid = false;
        const entryPrice = state.entryZone;
        const stopLoss = state.stopLoss;
        const takeProfit2 = state.tp2;

        if (entryPrice > stopLoss) { // Bullish context
            rrRatioVal = (takeProfit2 - entryPrice) / (entryPrice - stopLoss);
        } else if (entryPrice < stopLoss) { // Bearish context
            rrRatioVal = (entryPrice - takeProfit2) / (stopLoss - entryPrice);
        }

        const isRrMinimum = rrRatioVal >= 2.0;
        const isRrPreferred = rrRatioVal >= 3.0;
        
        // Format RR output text
        if (rrRatioVal <= 0 || isNaN(rrRatioVal) || !isFinite(rrRatioVal)) {
            elements.valRrRatio.textContent = state.lang === 'kh' ? 'ការកំណត់មិនត្រឹមត្រូវ' : 'Invalid Setup';
            elements.valRrStatus.textContent = state.lang === 'kh' ? '✗ ចំណុចកាត់ខាត & គោលដៅ មិនត្រូវគ្នាទេ' : '✗ Stop Loss & Targets out of alignment';
            elements.valRrStatus.className = 'rr-status invalid';
            isRrValid = false;
        } else {
            elements.valRrRatio.textContent = `1:${rrRatioVal.toFixed(2)}`;
            if (isRrPreferred) {
                elements.valRrStatus.textContent = state.lang === 'kh' ? '✓ ល្អបំផុត លើសពីផលធៀប ១:៣' : '✓ Exceeds 1:3 Preferred Setup';
                elements.valRrStatus.className = 'rr-status valid';
                isRrValid = true;
            } else if (isRrMinimum) {
                elements.valRrStatus.textContent = state.lang === 'kh' ? '✓ អាចជួញដូរបាន ដល់កម្រិតអប្បបរមា ១:២' : '✓ Meets 1:2 Minimum Risk Reward';
                elements.valRrStatus.className = 'rr-status valid';
                isRrValid = true;
            } else {
                elements.valRrStatus.textContent = state.lang === 'kh' ? '✗ ទាបជាងលក្ខខណ្ឌអប្បបរមា ១:២' : '✗ Below 1:2 Minimum Requirement';
                elements.valRrStatus.className = 'rr-status invalid';
                isRrValid = false;
            }
        }

        // Toggle the visual Chart Overlay based on setup validity
        if (elements.chartOverlay) {
            if (rrRatioVal <= 0 || isNaN(rrRatioVal) || !isFinite(rrRatioVal)) {
                elements.chartOverlay.textContent = state.lang === 'kh' ? 'ការកំណត់កាត់ខាត ឬយកចំណេញ មិនត្រឹមត្រូវដើម្បីគូរតារាង។' : 'Invalid Stop Loss or Take Profit parameters to draw chart.';
                elements.chartOverlay.classList.remove('hidden');
            } else {
                elements.chartOverlay.classList.add('hidden');
            }
        }

        // Checklist confirmations
        const validations = [];

        // Trend validation
        const trendPassed = (overallBias === 'Bullish' && entryPrice > stopLoss) || 
                            (overallBias === 'Bearish' && entryPrice < stopLoss);
        
        const translatedBias = valueTranslations[state.lang][overallBias] || overallBias;
        validations.push({
            name: state.lang === 'kh' ? `តម្រឹមនិន្នាការរួម៖ ${translatedBias}` : `Overall Bias aligns: ${overallBias}`,
            pass: trendPassed && overallBias !== 'Neutral',
            desc: state.lang === 'kh' 
                ? `និន្នាការរួមគឺ ${translatedBias}។ ការរៀបចំជួញដូរ៖ ${entryPrice > stopLoss ? 'ទិញ (BUY)' : 'លក់ (SELL)'}។` 
                : `Bias is ${overallBias}. Setup is ${entryPrice > stopLoss ? 'BUY' : 'SELL'}.`
        });

        // Zone validation
        let priceInZone = false;
        let zoneType = '';
        if (entryPrice > stopLoss) { // BUY -> Demand
            priceInZone = state.currentPrice >= state.demandBottom && state.currentPrice <= (state.demandTop + 2.5);
            zoneType = 'Demand Zone';
        } else { // SELL -> Supply
            priceInZone = state.currentPrice >= (state.supplyBottom - 2.5) && state.currentPrice <= state.supplyTop;
            zoneType = 'Supply Zone';
        }
        validations.push({
            name: state.lang === 'kh' 
                ? `ពិនិត្យតំបន់ ${zoneType === 'Demand Zone' ? 'តម្រូវការ (Demand)' : 'ផ្គត់ផ្គង់ (Supply)'}` 
                : `${zoneType} check`,
            pass: priceInZone,
            desc: state.lang === 'kh'
                ? (priceInZone ? `តម្លៃស្ថិតនៅក្នុង/ក្បែរព្រំដែនតំបន់ ${zoneType === 'Demand Zone' ? 'តម្រូវការ' : 'ផ្គត់ផ្គង់'}។` : `តម្លៃស្ថិតនៅក្រៅតំបន់ ${zoneType === 'Demand Zone' ? 'តម្រូវការ' : 'ផ្គត់ផ្គង់'} បច្ចេកទេស។`)
                : (priceInZone ? `Price inside/near ${zoneType} boundaries.` : `Price outside critical ${zoneType} zone.`)
        });

        // Liquidity validation
        const sweepCompleted = (entryPrice > stopLoss && state.sslSweep) || 
                               (entryPrice < stopLoss && state.bslSweep);
        validations.push({
            name: state.lang === 'kh' ? 'ការប្រមូលលំហូរលុយ (Liquidity Sweep) រួចរាល់' : 'Liquidity Sweep completed',
            pass: sweepCompleted,
            desc: state.lang === 'kh'
                ? (sweepCompleted ? 'រកឃើញការច្រានថ្លៃប្រមូលលំហូរលុយស្ថាប័ន (Stop Hunt)។' : 'មិនទាន់រកឃើញការបោសសម្អាតលំហូរលុយឡើយ។')
                : (sweepCompleted ? 'Institutional Stop Hunt / Sweep detected.' : 'No sweep detected. Orders pending.')
        });

        // Structure Shift validation (BOS/CHOCH)
        const structurePassed = state.bos || state.choch;
        validations.push({
            name: state.lang === 'kh' ? 'ការផ្លាស់ប្តូររចនាសម្ព័ន្ធទីផ្សារ (BOS/CHOCH)' : 'Market Structure Shift (BOS/CHOCH)',
            pass: structurePassed,
            desc: state.lang === 'kh'
                ? (structurePassed ? 'ការផ្លាស់ប្តូររចនាសម្ព័ន្ធបង្ហាញពីសន្ទុះទិសដៅកម្លាំង។' : 'មិនទាន់រកឃើញការបំបែករចនាសម្ព័ន្ធ BOS ឬ CHOCH។')
                : (structurePassed ? 'Structure shift indicates momentum direction.' : 'Missing BOS or CHOCH verification.')
        });

        // Candle validation
        let candleConfirmed = false;
        if (entryPrice > stopLoss) {
            candleConfirmed = ['Bullish Engulfing', 'Pin Bar', 'Momentum Candle'].includes(state.candleConfirmation);
        } else {
            candleConfirmed = ['Bearish Engulfing', 'Pin Bar', 'Momentum Candle'].includes(state.candleConfirmation);
        }
        
        const translatedPattern = i18n[state.lang]['opt-' + (state.candleConfirmation === 'Bullish Engulfing' ? 'bull-eng' : (state.candleConfirmation === 'Bearish Engulfing' ? 'bear-eng' : (state.candleConfirmation === 'Pin Bar' ? 'pinbar' : (state.candleConfirmation === 'Momentum Candle' ? 'momentum' : 'none'))))] || state.candleConfirmation;

        validations.push({
            name: state.lang === 'kh' ? `ទៀនបញ្ជាក់៖ ${translatedPattern}` : `Candle confirmation: ${state.candleConfirmation}`,
            pass: candleConfirmed,
            desc: state.lang === 'kh'
                ? (candleConfirmed ? 'បានបញ្ជាក់សញ្ញាច្រានតម្លៃបដិសេធចលនាពីតំបន់សំខាន់។' : 'ខ្វះទម្រង់ទៀនបញ្ជាក់សញ្ញាជួញដូរ។')
                : (candleConfirmed ? 'Confirmed price action rejection.' : 'Lacks candle confirmation pattern.')
        });

        // Fundamentals validation
        let fundamentalsSupporting = false;
        if (entryPrice > stopLoss) { // BUY
            fundamentalsSupporting = state.dxyStrength === 'Weak' || state.fedStance === 'Dovish' || state.geoRisk === 'Supporting';
        } else { // SELL
            fundamentalsSupporting = state.dxyStrength === 'Strong' || state.fedStance === 'Hawkish' || state.geoRisk === 'Supporting';
        }
        validations.push({
            name: state.lang === 'kh' ? 'តម្រងព័ត៌មានម៉ាក្រូសេដ្ឋកិច្ចរួម' : 'Fundamental support filters',
            pass: fundamentalsSupporting,
            desc: state.lang === 'kh'
                ? (fundamentalsSupporting ? 'ព័ត៌មានសេដ្ឋកិច្ចគាំទ្រដល់ទិសដៅជួញដូរ។' : 'ព័ត៌មានសេដ្ឋកិច្ចកំពុងប្រឆាំងនឹងការរៀបចំជួញដូរនេះ។')
                : (fundamentalsSupporting ? 'Fundamentals support trade direction.' : 'Opposing fundamental macro forces.')
        });

        // Risk Reward validation
        validations.push({
            name: state.lang === 'kh' ? 'សុពលភាពផលធៀបហានិភ័យ/ផលចំណេញ' : 'Risk/Reward ratio validity',
            pass: isRrValid,
            desc: state.lang === 'kh'
                ? (isRrValid ? `ផលធៀប R:R ស្មើ ${elements.valRrRatio.textContent} ស្ថិតក្នុងលក្ខខណ្ឌសុវត្ថិភាព។` : 'ផលធៀប R:R ទាបពេក ហានិភ័យខ្ពស់។')
                : (isRrValid ? `RR Ratio of ${elements.valRrRatio.textContent} matches limits.` : 'RR is inadequate.')
        });

        // Determine Final Signal
        let tradeDirection = 'NO TRADE';
        let confidence = 0;
        
        // Sum passed criteria for confidence
        const totalChecks = validations.length;
        const passedChecks = validations.filter(v => v.pass).length;
        confidence = Math.round((passedChecks / totalChecks) * 100);

        // Core Signal Rules
        const canBuy = overallBias === 'Bullish' && priceInZone && sweepCompleted && candleConfirmed && fundamentalsSupporting && isRrValid;
        const canSell = overallBias === 'Bearish' && priceInZone && sweepCompleted && candleConfirmed && fundamentalsSupporting && isRrValid;

        if (canBuy && (entryPrice > stopLoss)) {
            tradeDirection = 'BUY';
        } else if (canSell && (entryPrice < stopLoss)) {
            tradeDirection = 'SELL';
        } else {
            tradeDirection = 'NO TRADE';
        }

        // Render Rationale in UI
        elements.signalRationale.innerHTML = '';
        validations.forEach(val => {
            const item = document.createElement('div');
            item.className = `validation-item ${val.pass ? 'pass' : 'fail'}`;
            item.innerHTML = `
                <div class="val-icon">${val.pass ? '✓' : '✗'}</div>
                <div>
                    <strong>${val.name}</strong>
                    <div style="font-size: 0.65rem; color: var(--text-muted);">${val.desc}</div>
                </div>
            `;
            elements.signalRationale.appendChild(item);
        });

        // Update Signal Badge
        elements.signalBadge.className = 'signal-direction';
        if (tradeDirection === 'BUY') {
            elements.signalBadge.classList.add('buy');
            elements.signalText.textContent = state.lang === 'kh' ? 'ទិញ (BUY)' : 'BUY';
        } else if (tradeDirection === 'SELL') {
            elements.signalBadge.classList.add('sell');
            elements.signalText.textContent = state.lang === 'kh' ? 'លក់ (SELL)' : 'SELL';
        } else {
            elements.signalBadge.classList.add('no-trade');
            elements.signalText.textContent = state.lang === 'kh' ? 'រង់ចាំសញ្ញា (NO TRADE)' : 'NO TRADE - WAIT';
        }

        // Update Confidence
        elements.confidencePercentage.textContent = `${confidence}%`;
        elements.confidenceBar.style.width = `${confidence}%`;

        // Render Report Output Text
        const reportTime = elements.time.textContent;
        let reasonsText = validations
            .filter(v => v.pass)
            .map(v => `* ${v.name}: ${v.desc.replace(/✓|✗/g, '').trim()}`)
            .join('\n');
        
        let warningsList = validations
            .filter(v => !v.pass)
            .map(v => state.lang === 'kh' ? `* ការព្រមាន៖ កំពុងរង់ចាំ ${v.name} (${v.desc.replace(/✓|✗/g, '').trim()})` : `* WARNING: Pending ${v.name} (${v.desc.replace(/✓|✗/g, '').trim()})`);
        
        // Add default macro warnings
        if (state.geoRisk === 'Opposing') {
            warningsList.push(state.lang === 'kh' ? '* ការព្រមាន៖ ហានិភ័យភូមិសាស្ត្រនយោបាយ កំពុងប្រឆាំងនឹងការរៀបចំនេះ។' : '* WARNING: Geopolitical headwinds are opposing this setup.');
        }
        if (tradeDirection !== 'NO TRADE' && confidence < 90) {
            warningsList.push(state.lang === 'kh' ? '* ការព្រមាន៖ កម្រិតទំនុកចិត្តមធ្យម។ សូមគ្រប់គ្រងទំហំទុនឱ្យបានល្អ។' : '* WARNING: Mid-level confidence setup. Proper position sizing required.');
        }
        
        let warningsText = warningsList.join('\n');

        let generatedReport = '';
        if (state.lang === 'kh') {
            if (!reasonsText) reasonsText = '* កំពុងរង់ចាំការស្របគ្នានៃសូចនាករស្ថាប័នកម្រិតខ្ពស់។';
            if (!warningsText) warningsText = 'គ្មាន។ ការរៀបចំបច្ចេកទេសមានភាពច្បាស់លាស់ និងស្របគ្នាទាំងស្រុង។';
            
            generatedReport = `និន្នាការទីផ្សាររួម៖
${translatedBias}

កម្រិតទំនុកចិត្ត៖
${confidence}%

ទិសដៅជួញដូរ៖
${tradeDirection === 'NO TRADE' ? 'កុំទាន់ជួញដូរ (NO TRADE)' : (tradeDirection === 'BUY' ? 'ទិញ (BUY)' : 'លក់ (SELL)')}

តំបន់ចូលជួញដូរ៖
${tradeDirection === 'NO TRADE' ? 'N/A' : state.entryZone.toFixed(2)}

ចំណុចកាត់ខាត (SL)៖
${tradeDirection === 'NO TRADE' ? 'N/A' : state.stopLoss.toFixed(2)}

ចំណុចយកចំណេញ ១ (TP1)៖
${tradeDirection === 'NO TRADE' ? 'N/A' : state.tp1.toFixed(2)}

ចំណុចយកចំណេញ ២ (TP2)៖
${tradeDirection === 'NO TRADE' ? 'N/A' : state.tp2.toFixed(2)}

ផលធៀបហានិភ័យ/ផលចំណេញ៖
${tradeDirection === 'NO TRADE' ? 'N/A' : elements.valRrRatio.textContent}

សេចក្តីសង្ខេបនៃការវិភាគ៖
${overallBias === 'Neutral' ? 'ទីផ្សារស្ថិតក្នុងចន្លោះទ្វាររបាំងសំខាន់ៗប្រចាំថ្ងៃ' : 'រចនាសម្ព័ន្ធនិន្នាការ ' + (overallBias === 'Bullish' ? 'កើនឡើង' : 'ធ្លាក់ចុះ') + ' ប្រចាំថ្ងៃ ជាមួយនឹងការផ្ទៀងផ្ទាត់តំបន់ ' + (overallBias === 'Bullish' ? 'តម្រូវការ (Demand)' : 'ផ្គត់ផ្គង់ (Supply)') + ' នៅលើតារាង H4' }។

ហេតុផល Confluences៖
${reasonsText}

ការព្រមានពីហានិភ័យ៖
${warningsText}

នេះគ្រាន់តែជាការវិភាគទីផ្សារហិរញ្ញវត្ថុប៉ុណ្ណោះ មិនមែនជាការណែនាំអំពីការវិនិយោគឡើយ។`;
        } else {
            if (!reasonsText) reasonsText = '* Waiting for high-probability structural confluence.';
            if (!warningsText) warningsText = 'None. Technical setup is highly clean and fully aligned.';
            
            generatedReport = `Market Bias:
${overallBias}

Confidence:
${confidence}%

Trade Direction:
${tradeDirection === 'NO TRADE' ? 'NO TRADE' : tradeDirection}

Entry Zone:
${tradeDirection === 'NO TRADE' ? 'N/A' : state.entryZone.toFixed(2)}

Stop Loss:
${tradeDirection === 'NO TRADE' ? 'N/A' : state.stopLoss.toFixed(2)}

Take Profit 1:
${tradeDirection === 'NO TRADE' ? 'N/A' : state.tp1.toFixed(2)}

Take Profit 2:
${tradeDirection === 'NO TRADE' ? 'N/A' : state.tp2.toFixed(2)}

Risk Reward:
${tradeDirection === 'NO TRADE' ? 'N/A' : elements.valRrRatio.textContent}

Analysis Summary:
${overallBias === 'Neutral' ? 'Market is range-bound across primary daily blocks' : 'Daily ' + overallBias.toLowerCase() + ' trend structure with H4 ' + (overallBias === 'Bullish' ? 'demand' : 'supply') + ' zone validation'}.

Reasons:
${reasonsText}

Warnings:
${warningsText}

This is financial market analysis only and not financial advice.`;
        }

        elements.exportText.textContent = generatedReport;

        // Render SVG Chart Visualizer
        renderSvgChart(overallBias);
    }

    // Draw dynamic chart
    function renderSvgChart(overallBias) {
        // Clear previous SVG content
        elements.svgChart.innerHTML = '';
        
        const w = 800;
        const h = 400;

        // Setup chart candles (real historical or mock fallback)
        const totalCandles = 16;
        let candlesToRender = [];
        if (state.historicalCandles && state.historicalCandles.length >= totalCandles) {
            candlesToRender = state.historicalCandles.slice(-totalCandles);
        } else {
            // Setup mock prices that fit the bias trend
            const isBullishBias = overallBias === 'Bullish';
            let runningPrice = state.currentPrice - 20;
            
            for (let i = 0; i < totalCandles; i++) {
                const trendDir = isBullishBias ? (i > 9 ? 1.4 : -0.7) : (i > 9 ? -1.4 : 0.7);
                const noise = (Math.random() - 0.5) * 10;
                const open = runningPrice;
                const close = runningPrice + trendDir * 5 + noise;
                
                const high = Math.max(open, close) + Math.random() * 3;
                const low = Math.min(open, close) - Math.random() * 3;
                
                candlesToRender.push({ open, close, high, low });
                runningPrice = close;
            }
        }

        // Adjust last candle close to currentPrice
        const lastCandle = candlesToRender[candlesToRender.length - 1];
        if (lastCandle) {
            lastCandle.close = state.currentPrice;
            if (state.currentPrice > lastCandle.high) lastCandle.high = state.currentPrice;
            if (state.currentPrice < lastCandle.low) lastCandle.low = state.currentPrice;
        }
        
        // Find min and max values to dynamically scale price coordinates to SVG height
        const prices = [
            state.r1, state.r2, state.s1, state.s2,
            state.supplyTop, state.supplyBottom,
            state.demandTop, state.demandBottom,
            state.currentPrice, state.entryZone,
            state.stopLoss, state.tp1, state.tp2
        ];
        candlesToRender.forEach(c => {
            prices.push(c.high);
            prices.push(c.low);
        });
        
        const minVal = Math.min(...prices) - 5;
        const maxVal = Math.max(...prices) + 5;
        const range = maxVal - minVal;

        // Helper to convert price to SVG Y coordinate
        function valToY(val) {
            const padding = 40; // Pixels margin top and bottom
            return h - (padding + ((val - minVal) / range) * (h - 2 * padding));
        }

        // Draw grid lines
        for (let i = 1; i < 5; i++) {
            const gridY = (h / 5) * i;
            const line = document.createElementNS('http://www.w3.org/2000/svg', 'line');
            line.setAttribute('x1', 0);
            line.setAttribute('y1', gridY);
            line.setAttribute('x2', w);
            line.setAttribute('y2', gridY);
            line.setAttribute('stroke', 'rgba(255, 255, 255, 0.03)');
            line.setAttribute('stroke-width', 1);
            elements.svgChart.appendChild(line);
        }

        // Draw Supply Zone
        const supplyYTop = valToY(state.supplyTop);
        const supplyYBottom = valToY(state.supplyBottom);
        const supplyHeight = Math.abs(supplyYBottom - supplyYTop);
        
        const supplyRect = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
        supplyRect.setAttribute('x', 50);
        supplyRect.setAttribute('y', Math.min(supplyYTop, supplyYBottom));
        supplyRect.setAttribute('width', w - 100);
        supplyRect.setAttribute('height', Math.max(supplyHeight, 2));
        supplyRect.setAttribute('fill', 'rgba(239, 68, 68, 0.08)');
        supplyRect.setAttribute('stroke', 'rgba(239, 68, 68, 0.25)');
        supplyRect.setAttribute('stroke-dasharray', '4, 4');
        elements.svgChart.appendChild(supplyRect);
        
        const supplyLabel = document.createElementNS('http://www.w3.org/2000/svg', 'text');
        supplyLabel.setAttribute('x', 60);
        supplyLabel.setAttribute('y', Math.min(supplyYTop, supplyYBottom) + 16);
        supplyLabel.setAttribute('fill', 'rgba(239, 68, 68, 0.75)');
        supplyLabel.setAttribute('font-size', '10px');
        supplyLabel.setAttribute('font-weight', 'bold');
        supplyLabel.textContent = state.lang === 'kh' 
            ? `តំបន់ផ្គត់ផ្គង់ (Supply): ${state.supplyBottom.toFixed(1)} - ${state.supplyTop.toFixed(1)}` 
            : `Supply Zone (${state.supplyBottom.toFixed(1)} - ${state.supplyTop.toFixed(1)})`;
        elements.svgChart.appendChild(supplyLabel);

        // Draw Demand Zone
        const demandYTop = valToY(state.demandTop);
        const demandYBottom = valToY(state.demandBottom);
        const demandHeight = Math.abs(demandYBottom - demandYTop);
        
        const demandRect = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
        demandRect.setAttribute('x', 50);
        demandRect.setAttribute('y', Math.min(demandYTop, demandYBottom));
        demandRect.setAttribute('width', w - 100);
        demandRect.setAttribute('height', Math.max(demandHeight, 2));
        demandRect.setAttribute('fill', 'rgba(16, 185, 129, 0.08)');
        demandRect.setAttribute('stroke', 'rgba(16, 185, 129, 0.25)');
        demandRect.setAttribute('stroke-dasharray', '4, 4');
        elements.svgChart.appendChild(demandRect);
        
        const demandLabel = document.createElementNS('http://www.w3.org/2000/svg', 'text');
        demandLabel.setAttribute('x', 60);
        demandLabel.setAttribute('y', Math.min(demandYTop, demandYBottom) + 16);
        demandLabel.setAttribute('fill', 'rgba(16, 185, 129, 0.75)');
        demandLabel.setAttribute('font-size', '10px');
        demandLabel.setAttribute('font-weight', 'bold');
        demandLabel.textContent = state.lang === 'kh' 
            ? `តំបន់តម្រូវការ (Demand): ${state.demandBottom.toFixed(1)} - ${state.demandTop.toFixed(1)}` 
            : `Demand Zone (${state.demandBottom.toFixed(1)} - ${state.demandTop.toFixed(1)})`;
        elements.svgChart.appendChild(demandLabel);

        // Draw Support and Resistance Levels
        const levels = [
            { val: state.r2, label: state.lang === 'kh' ? `របាំង R2 (${valueTranslations.kh[state.r2Strength]})` : `R2 (${state.r2Strength})`, color: 'rgba(239, 68, 68, 0.4)' },
            { val: state.r1, label: state.lang === 'kh' ? `របាំង R1 (${valueTranslations.kh[state.r1Strength]})` : `R1 (${state.r1Strength})`, color: 'rgba(239, 68, 68, 0.4)' },
            { val: state.s1, label: state.lang === 'kh' ? `គាំទ្រ S1 (${valueTranslations.kh[state.s1Strength]})` : `S1 (${state.s1Strength})`, color: 'rgba(16, 185, 129, 0.4)' },
            { val: state.s2, label: state.lang === 'kh' ? `គាំទ្រ S2 (${valueTranslations.kh[state.s2Strength]})` : `S2 (${state.s2Strength})`, color: 'rgba(16, 185, 129, 0.4)' }
        ];

        levels.forEach(lvl => {
            const levelY = valToY(lvl.val);
            const line = document.createElementNS('http://www.w3.org/2000/svg', 'line');
            line.setAttribute('x1', 30);
            line.setAttribute('y1', levelY);
            line.setAttribute('x2', w - 30);
            line.setAttribute('y2', levelY);
            line.setAttribute('stroke', lvl.color);
            line.setAttribute('stroke-width', 1);
            elements.svgChart.appendChild(line);
            
            const txt = document.createElementNS('http://www.w3.org/2000/svg', 'text');
            txt.setAttribute('x', w - 100);
            txt.setAttribute('y', levelY - 5);
            txt.setAttribute('fill', lvl.color);
            txt.setAttribute('font-size', '9px');
            txt.textContent = `${lvl.label}: ${lvl.val.toFixed(1)}`;
            elements.svgChart.appendChild(txt);
        });

        // Draw Candlestick Chart data
        const startX = 80;
        const spacing = (w - 180) / totalCandles;

        // Render candles
        candlesToRender.forEach((candle, idx) => {
            const cx = startX + idx * spacing;
            const yOpen = valToY(candle.open);
            const yClose = valToY(candle.close);
            const yHigh = valToY(candle.high);
            const yLow = valToY(candle.low);
            
            const isBull = candle.close >= candle.open;
            const candleColor = isBull ? 'var(--color-buy)' : 'var(--color-sell)';
            
            // Draw wick
            const wick = document.createElementNS('http://www.w3.org/2000/svg', 'line');
            wick.setAttribute('x1', cx);
            wick.setAttribute('y1', yHigh);
            wick.setAttribute('x2', cx);
            wick.setAttribute('y2', yLow);
            wick.setAttribute('stroke', candleColor);
            wick.setAttribute('stroke-width', 1.5);
            elements.svgChart.appendChild(wick);
            
            // Draw body
            const bodyH = Math.max(Math.abs(yOpen - yClose), 2);
            const body = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
            body.setAttribute('x', cx - 5);
            body.setAttribute('y', Math.min(yOpen, yClose));
            body.setAttribute('width', 10);
            body.setAttribute('height', bodyH);
            body.setAttribute('fill', isBull ? 'rgba(16, 185, 129, 0.45)' : 'rgba(239, 68, 68, 0.45)');
            body.setAttribute('stroke', candleColor);
            body.setAttribute('stroke-width', 1);
            elements.svgChart.appendChild(body);

            // Draw sweeps indicators on the chart
            if (idx === totalCandles - 3) {
                if (state.sslSweep) {
                    const arrow = document.createElementNS('http://www.w3.org/2000/svg', 'text');
                    arrow.setAttribute('x', cx - 6);
                    arrow.setAttribute('y', yLow + 15);
                    arrow.setAttribute('fill', 'var(--color-buy)');
                    arrow.setAttribute('font-size', '10px');
                    arrow.setAttribute('font-weight', 'bold');
                    arrow.textContent = '▲ SSL';
                    elements.svgChart.appendChild(arrow);
                }
                if (state.bslSweep) {
                    const arrow = document.createElementNS('http://www.w3.org/2000/svg', 'text');
                    arrow.setAttribute('x', cx - 6);
                    arrow.setAttribute('y', yHigh - 8);
                    arrow.setAttribute('fill', 'var(--color-sell)');
                    arrow.setAttribute('font-size', '10px');
                    arrow.setAttribute('font-weight', 'bold');
                    arrow.textContent = '▼ BSL';
                    elements.svgChart.appendChild(arrow);
                }
            }
        });

        // Draw Entry, SL and TP Setup Lines
        const drawLevels = [
            { val: state.entryZone, label: state.lang === 'kh' ? 'ចំណុចចូលជួញដូរ' : 'Entry Limit', color: '#3b82f6', dash: '0' },
            { val: state.stopLoss, label: state.lang === 'kh' ? 'កាត់ខាត (SL)' : 'SL', color: 'var(--color-sell)', dash: '4, 4' },
            { val: state.tp1, label: state.lang === 'kh' ? 'យកចំណេញ ១ (TP1)' : 'TP1', color: 'var(--color-buy)', dash: '2, 2' },
            { val: state.tp2, label: state.lang === 'kh' ? 'យកចំណេញ ២ (TP2)' : 'TP2', color: 'var(--color-buy)', dash: '2, 2' }
        ];

        drawLevels.forEach(lvl => {
            const levelY = valToY(lvl.val);
            const line = document.createElementNS('http://www.w3.org/2000/svg', 'line');
            line.setAttribute('x1', 40);
            line.setAttribute('y1', levelY);
            line.setAttribute('x2', w - 40);
            line.setAttribute('y2', levelY);
            line.setAttribute('stroke', lvl.color);
            line.setAttribute('stroke-width', 2);
            if (lvl.dash !== '0') {
                line.setAttribute('stroke-dasharray', lvl.dash);
            }
            elements.svgChart.appendChild(line);

            // Level text card
            const textBg = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
            textBg.setAttribute('x', w - 130);
            textBg.setAttribute('y', levelY - 8);
            textBg.setAttribute('width', 90);
            textBg.setAttribute('height', 16);
            textBg.setAttribute('rx', 3);
            textBg.setAttribute('fill', '#161a23');
            textBg.setAttribute('stroke', lvl.color);
            textBg.setAttribute('stroke-width', 1);
            elements.svgChart.appendChild(textBg);

            const txt = document.createElementNS('http://www.w3.org/2000/svg', 'text');
            txt.setAttribute('x', w - 85);
            txt.setAttribute('y', levelY + 4);
            txt.setAttribute('fill', 'var(--text-primary)');
            txt.setAttribute('font-size', '9px');
            txt.setAttribute('font-family', 'var(--font-mono)');
            txt.setAttribute('text-anchor', 'middle');
            txt.textContent = `${lvl.label}: ${lvl.val.toFixed(1)}`;
            elements.svgChart.appendChild(txt);
        });

        // Draw Current Price overlay line
        const currentY = valToY(state.currentPrice);
        const curLine = document.createElementNS('http://www.w3.org/2000/svg', 'line');
        curLine.setAttribute('x1', 0);
        curLine.setAttribute('y1', currentY);
        curLine.setAttribute('x2', w);
        curLine.setAttribute('y2', currentY);
        curLine.setAttribute('stroke', 'var(--gold)');
        curLine.setAttribute('stroke-width', 1);
        curLine.setAttribute('stroke-dasharray', '1, 3');
        elements.svgChart.appendChild(curLine);

        // Current Price Label right side
        const curTextBg = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
        curTextBg.setAttribute('x', 10);
        curTextBg.setAttribute('y', currentY - 9);
        curTextBg.setAttribute('width', 95);
        curTextBg.setAttribute('height', 18);
        curTextBg.setAttribute('rx', 4);
        curTextBg.setAttribute('fill', 'var(--gold)');
        elements.svgChart.appendChild(curTextBg);

        const curTxt = document.createElementNS('http://www.w3.org/2000/svg', 'text');
        curTxt.setAttribute('x', 57);
        curTxt.setAttribute('y', currentY + 3);
        curTxt.setAttribute('fill', '#000');
        curTxt.setAttribute('font-size', '9px');
        curTxt.setAttribute('font-weight', 'bold');
        curTxt.setAttribute('font-family', 'var(--font-mono)');
        curTxt.setAttribute('text-anchor', 'middle');
        curTxt.textContent = state.lang === 'kh' ? `ផ្សាយផ្ទាល់: ${state.currentPrice.toFixed(2)}` : `Live: ${state.currentPrice.toFixed(2)}`;
        elements.svgChart.appendChild(curTxt);
    }

    // Fetch live Gold spot price from Finnhub (fallback to Binance PAXGUSDT)
    async function fetchLivePrice() {
        // If the user has not configured their Finnhub API Key, skip directly to Binance PAXGUSDT
        if (!state.apiKey) {
            await fetchBinanceFallback("No Finnhub Key");
            return;
        }

        try {
            const res = await fetch(`https://finnhub.io/api/v1/quote?symbol=OANDA:XAU_USD&token=${state.apiKey}`);
            if (!res.ok) throw new Error('Finnhub connection error');
            const data = await res.json();
            const price = parseFloat(data.c);
            
            if (price && !isNaN(price)) {
                state.currentPrice = price;
                
                // Update text input if user is not actively typing
                if (document.activeElement !== elements.inputCurrentPrice) {
                    elements.inputCurrentPrice.value = price.toFixed(2);
                }
                
                // Show badge as active (Finnhub)
                const badge = document.getElementById('live-ticker-badge');
                if (badge) {
                    badge.classList.remove('offline');
                    badge.setAttribute('data-i18n', 'badge-live-finnhub');
                    badge.textContent = i18n[state.lang]['badge-live-finnhub'];
                }
                
                evaluateAndRender();
            } else {
                throw new Error('Invalid price data from Finnhub');
            }
        } catch (err) {
            console.warn('Finnhub failed, falling back to Binance PAXGUSDT:', err);
            await fetchBinanceFallback(err);
        }
    }

    // Helper to query Binance Pax Gold ticker when Finnhub is offline or keyless
    async function fetchBinanceFallback(reason) {
        try {
            const res = await fetch('https://api.binance.com/api/v3/ticker/price?symbol=PAXGUSDT');
            if (!res.ok) throw new Error('Binance connection error');
            const data = await res.json();
            const price = parseFloat(data.price);
            
            if (price && !isNaN(price)) {
                state.currentPrice = price;
                
                if (document.activeElement !== elements.inputCurrentPrice) {
                    elements.inputCurrentPrice.value = price.toFixed(2);
                }
                
                const badge = document.getElementById('live-ticker-badge');
                if (badge) {
                    badge.classList.remove('offline');
                    badge.setAttribute('data-i18n', 'badge-live-paxg');
                    badge.textContent = i18n[state.lang]['badge-live-paxg'];
                }
                
                evaluateAndRender();
            } else {
                throw new Error('Invalid price data from Binance');
            }
        } catch (binanceErr) {
            console.error('All price feeds failed. Reason:', reason, 'Binance err:', binanceErr);
            const badge = document.getElementById('live-ticker-badge');
            if (badge) {
                badge.classList.add('offline');
                badge.setAttribute('data-i18n', 'badge-offline');
                badge.textContent = i18n[state.lang]['badge-offline'];
            }
        }
    }

    // Fetch actual historical Gold candles from Binance
    async function fetchHistoricalCandles() {
        try {
            const res = await fetch(`https://api.binance.com/api/v3/klines?symbol=PAXGUSDT&interval=${state.chartTimeframe}&limit=16`);
            if (!res.ok) throw new Error('Binance klines connection error');
            const data = await res.json();
            
            if (data && Array.isArray(data)) {
                state.historicalCandles = data.map(k => ({
                    open: parseFloat(k[1]),
                    high: parseFloat(k[2]),
                    low: parseFloat(k[3]),
                    close: parseFloat(k[4])
                }));
                evaluateAndRender();
            }
        } catch (err) {
            console.error('Error fetching historical candles:', err);
        }
    }

    // Run first evaluation
    syncUIFromState();
    evaluateAndRender();
    fetchHistoricalCandles();

    // Start live pricing feed (every 5 seconds)
    fetchLivePrice();
    setInterval(() => {
        fetchLivePrice();
        fetchHistoricalCandles();
    }, 5000);
});
