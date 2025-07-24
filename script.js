// Global Variables
let currentTab = 'dashboard';
let systemData = {
    startTime: new Date(),
    logs: [],
    weather: {},
    radarActive: false,
    networkScanActive: false
};

// Brazilian States Data
const brazilianStates = {
    'AC': { name: 'Acre', capital: 'Rio Branco', region: 'Norte', population: 906876 },
    'AL': { name: 'Alagoas', capital: 'Maceió', region: 'Nordeste', population: 3365351 },
    'AP': { name: 'Amapá', capital: 'Macapá', region: 'Norte', population: 877613 },
    'AM': { name: 'Amazonas', capital: 'Manaus', region: 'Norte', population: 4269995 },
    'BA': { name: 'Bahia', capital: 'Salvador', region: 'Nordeste', population: 14985284 },
    'CE': { name: 'Ceará', capital: 'Fortaleza', region: 'Nordeste', population: 9240580 },
    'DF': { name: 'Distrito Federal', capital: 'Brasília', region: 'Centro-Oeste', population: 3094325 },
    'ES': { name: 'Espírito Santo', capital: 'Vitória', region: 'Sudeste', population: 4108508 },
    'GO': { name: 'Goiás', capital: 'Goiânia', region: 'Centro-Oeste', population: 7206589 },
    'MA': { name: 'Maranhão', capital: 'São Luís', region: 'Nordeste', population: 7153262 },
    'MT': { name: 'Mato Grosso', capital: 'Cuiabá', region: 'Centro-Oeste', population: 3567234 },
    'MS': { name: 'Mato Grosso do Sul', capital: 'Campo Grande', region: 'Centro-Oeste', population: 2839188 },
    'MG': { name: 'Minas Gerais', capital: 'Belo Horizonte', region: 'Sudeste', population: 21411923 },
    'PA': { name: 'Pará', capital: 'Belém', region: 'Norte', population: 8777124 },
    'PB': { name: 'Paraíba', capital: 'João Pessoa', region: 'Nordeste', population: 4059905 },
    'PR': { name: 'Paraná', capital: 'Curitiba', region: 'Sul', population: 11597484 },
    'PE': { name: 'Pernambuco', capital: 'Recife', region: 'Nordeste', population: 9674793 },
    'PI': { name: 'Piauí', capital: 'Teresina', region: 'Nordeste', population: 3289290 },
    'RJ': { name: 'Rio de Janeiro', capital: 'Rio de Janeiro', region: 'Sudeste', population: 17463349 },
    'RN': { name: 'Rio Grande do Norte', capital: 'Natal', region: 'Nordeste', population: 3560903 },
    'RS': { name: 'Rio Grande do Sul', capital: 'Porto Alegre', region: 'Sul', population: 11466630 },
    'RO': { name: 'Rondônia', capital: 'Porto Velho', region: 'Norte', population: 1815278 },
    'RR': { name: 'Roraima', capital: 'Boa Vista', region: 'Norte', population: 652713 },
    'SC': { name: 'Santa Catarina', capital: 'Florianópolis', region: 'Sul', population: 7338473 },
    'SP': { name: 'São Paulo', capital: 'São Paulo', region: 'Sudeste', population: 46649132 },
    'SE': { name: 'Sergipe', capital: 'Aracaju', region: 'Nordeste', population: 2338474 },
    'TO': { name: 'Tocantins', capital: 'Palmas', region: 'Norte', population: 1607363 }
};

// Major Brazilian Cities
const majorCities = {
    'SP': ['São Paulo', 'Campinas', 'Santos', 'São Bernardo do Campo', 'Guarulhos'],
    'RJ': ['Rio de Janeiro', 'Niterói', 'Nova Iguaçu', 'Duque de Caxias'],
    'MG': ['Belo Horizonte', 'Uberlândia', 'Contagem', 'Juiz de Fora'],
    'RS': ['Porto Alegre', 'Caxias do Sul', 'Canoas', 'Pelotas'],
    'PR': ['Curitiba', 'Londrina', 'Maringá', 'Ponta Grossa'],
    'BA': ['Salvador', 'Feira de Santana', 'Vitória da Conquista'],
    'SC': ['Florianópolis', 'Joinville', 'Blumenau', 'São José'],
    'GO': ['Goiânia', 'Aparecida de Goiânia', 'Anápolis'],
    'PE': ['Recife', 'Jaboatão dos Guararapes', 'Olinda', 'Caruaru'],
    'CE': ['Fortaleza', 'Caucaia', 'Juazeiro do Norte', 'Maracanaú']
};

// Terminal Commands
const terminalCommands = {
    help: () => {
        return `
╭─────────────────── SISFRON COMANDOS ───────────────────╮
│ SISTEMA:                                               │
│   help          - Mostra esta ajuda                   │
│   clear         - Limpa o terminal                    │
│   status        - Status do sistema                   │
│   info          - Informações do SISFRON              │
│                                                        │
│ BRASIL:                                                │
│   estados       - Lista todos os estados              │
│   capitais      - Lista as capitais                   │
│   regioes       - Informações das regiões             │
│   cep [codigo]  - Consulta CEP                        │
│   clima [cidade]- Clima de uma cidade                 │
│                                                        │
│ UTILIDADES:                                            │
│   calc [expr]   - Calculadora                         │
│   data          - Data e hora atual                   │
│   radar         - Ativa/desativa radar                │
│   scan          - Escaneia a rede                     │
│   moeda [valor] - Conversor de moedas                 │
│                                                        │
│ EASTER EGGS:                                           │
│   brasil        - Hino Nacional                       │
│   futebol       - Estatísticas do futebol             │
│   carnaval      - Informações do carnaval             │
╰────────────────────────────────────────────────────────╯`;
    },
    
    clear: () => {
        document.getElementById('terminalOutput').innerHTML = `
            <div class="text-green-400 font-mono text-sm">
                <div>SISFRON Terminal v2.0 - Sistema Integrado de Fronteiras</div>
                <div>Digite 'help' para ver os comandos disponíveis</div>
                <div class="mt-2"></div>
            </div>`;
        return '';
    },
    
    status: () => {
        const uptime = Math.floor((new Date() - systemData.startTime) / 1000);
        const hours = Math.floor(uptime / 3600);
        const minutes = Math.floor((uptime % 3600) / 60);
        const seconds = uptime % 60;
        
        return `
╭─────────────────── STATUS DO SISTEMA ─────────────────╮
│ Sistema: SISFRON v2.0                                  │
│ Uptime: ${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}                                      │
│ CPU: ${Math.floor(Math.random() * 30 + 40)}%                                       │
│ Memória: ${Math.floor(Math.random() * 40 + 30)}%                                   │
│ Rede: ONLINE                                           │
│ Logs: ${systemData.logs.length} entradas                               │
│ Radar: ${systemData.radarActive ? 'ATIVO' : 'INATIVO'}                                     │
╰────────────────────────────────────────────────────────╯`;
    },
    
    info: () => {
        return `
╭─────────────────── SOBRE O SISFRON ───────────────────╮
│ Sistema Integrado de Fronteiras e Observação Nacional │
│                                                        │
│ Desenvolvido para monitoramento e análise de dados    │
│ relacionados ao território brasileiro, incluindo:     │
│                                                        │
│ • Monitoramento meteorológico                         │
│ • Análise geográfica e cartográfica                   │
│ • Sistema de radar e detecção                         │
│ • Indicadores econômicos nacionais                    │
│ • Informações estaduais e municipais                  │
│ • Ferramentas de segurança e rede                     │
│                                                        │
│ Versão: 2.0                                           │
│ Última atualização: ${new Date().toLocaleDateString('pt-BR')}                     │
╰────────────────────────────────────────────────────────╯`;
    },
    
    estados: () => {
        let result = '╭─────────────────── ESTADOS DO BRASIL ─────────────────╮\n';
        Object.entries(brazilianStates).forEach(([code, state]) => {
            result += `│ ${code} - ${state.name.padEnd(20)} | ${state.region.padEnd(12)} │\n`;
        });
        result += '╰────────────────────────────────────────────────────────╯';
        return result;
    },
    
    capitais: () => {
        let result = '╭─────────────────── CAPITAIS BRASILEIRAS ──────────────╮\n';
        Object.entries(brazilianStates).forEach(([code, state]) => {
            result += `│ ${state.capital.padEnd(20)} - ${state.name.padEnd(20)} │\n`;
        });
        result += '╰────────────────────────────────────────────────────────╯';
        return result;
    },
    
    regioes: () => {
        const regions = {
            'Norte': ['AC', 'AM', 'AP', 'PA', 'RO', 'RR', 'TO'],
            'Nordeste': ['AL', 'BA', 'CE', 'MA', 'PB', 'PE', 'PI', 'RN', 'SE'],
            'Centro-Oeste': ['DF', 'GO', 'MT', 'MS'],
            'Sudeste': ['ES', 'MG', 'RJ', 'SP'],
            'Sul': ['PR', 'RS', 'SC']
        };
        
        let result = '╭─────────────────── REGIÕES DO BRASIL ─────────────────╮\n';
        Object.entries(regions).forEach(([region, states]) => {
            result += `│ ${region.padEnd(15)}: ${states.join(', ').padEnd(30)} │\n`;
        });
        result += '╰────────────────────────────────────────────────────────╯';
        return result;
    },
    
    calc: (expression) => {
        if (!expression) return 'Uso: calc [expressão]\nExemplo: calc 2+2*3';
        
        try {
            const result = Function('"use strict"; return (' + expression.replace(/[^0-9+\-*/().\s]/g, '') + ')')();
            return `Resultado: ${expression} = ${result}`;
        } catch (e) {
            return 'Erro: Expressão inválida';
        }
    },
    
    data: () => {
        const now = new Date();
        return `Data: ${now.toLocaleDateString('pt-BR')}\nHora: ${now.toLocaleTimeString('pt-BR')}`;
    },
    
    radar: () => {
        systemData.radarActive = !systemData.radarActive;
        if (systemData.radarActive) {
            startRadarScan();
            return 'Radar ATIVADO - Iniciando varredura...';
        } else {
            stopRadarScan();
            return 'Radar DESATIVADO';
        }
    },
    
    scan: () => {
        scanNetwork();
        return 'Iniciando escaneamento da rede...';
    },
    
    moeda: (value) => {
        if (!value) return 'Uso: moeda [valor]\nExemplo: moeda 100';
        
        const val = parseFloat(value);
        if (isNaN(val)) return 'Valor inválido';
        
        return `
Conversão de R$ ${val.toFixed(2)}:
USD: $ ${(val / 5.20).toFixed(2)}
EUR: € ${(val / 5.65).toFixed(2)}
GBP: £ ${(val / 6.45).toFixed(2)}`;
    },
    
    brasil: () => {
        return `
🇧🇷 HINO NACIONAL BRASILEIRO 🇧🇷

"Ouviram do Ipiranga as margens plácidas
De um povo heroico o brado retumbante,
E o sol da liberdade, em raios fúlgidos,
Brilhou no céu da pátria nesse instante."

🎵 "Pátria amada, Brasil!" 🎵`;
    },
    
    futebol: () => {
        return `
⚽ ESTATÍSTICAS DO FUTEBOL BRASILEIRO ⚽

Copas do Mundo: 5 (1958, 1962, 1970, 1994, 2002)
Copas América: 9 títulos
Confederações: 4 títulos
Olimpíadas: 1 ouro (2016)

Maior artilheiro: Pelé (77 gols)
Maior ídolo: Pelé, Rei do Futebol
Estádios icônicos: Maracanã, Morumbi, Mineirão`;
    },
    
    carnaval: () => {
        return `
🎭 CARNAVAL BRASILEIRO 🎭

Rio de Janeiro: Sambódromo da Marquês de Sapucaí
Salvador: Circuito Osmar (Campo Grande)
Recife/Olinda: Frevo e Maracatu
São Paulo: Sambódromo do Anhembi

Próximo Carnaval: ${new Date().getFullYear() + 1}
"O maior show da Terra!" 🎉`;
    },
    
    cep: (code) => {
        if (!code) return 'Uso: cep [código]\nExemplo: cep 01310-100';
        
        // Simular busca de CEP
        return `
Consultando CEP: ${code}
Logradouro: Av. Paulista
Bairro: Bela Vista
Cidade: São Paulo
Estado: SP
Região: Sudeste`;
    },
    
    clima: (city) => {
        if (!city) return 'Uso: clima [cidade]\nExemplo: clima São Paulo';
        
        const temp = Math.floor(Math.random() * 15 + 15);
        const conditions = ['Ensolarado', 'Nublado', 'Chuvoso', 'Parcialmente nublado'];
        const condition = conditions[Math.floor(Math.random() * conditions.length)];
        
        return `
Clima em ${city}:
Temperatura: ${temp}°C
Condição: ${condition}
Umidade: ${Math.floor(Math.random() * 40 + 40)}%
Vento: ${Math.floor(Math.random() * 20 + 5)} km/h`;
    }
};

// Initialization
document.addEventListener('DOMContentLoaded', function() {
    initializeSystem();
});

function initializeSystem() {
    // Show loading screen
    showLoadingScreen();
    
    // Initialize components after loading
    setTimeout(() => {
        hideLoadingScreen();
        initializeTabs();
        initializeMap();
        initializeCharts();
        updateSystemStats();
        populateSelectors();
        initializeTerminal();
        
        // Start periodic updates
        setInterval(updateSystemStats, 5000);
        setInterval(updateTime, 1000);
        
        // Log system start
        addLog('Sistema SISFRON iniciado com sucesso', 'success');
    }, 3000);
}

function showLoadingScreen() {
    const loadingTexts = [
        'Inicializando sistemas...',
        'Carregando módulos...',
        'Conectando à rede...',
        'Verificando segurança...',
        'Sincronizando dados...',
        'Sistema pronto!'
    ];
    
    let progress = 0;
    const loadingText = document.getElementById('loadingText');
    const loadingProgress = document.querySelector('.loading-progress');
    
    const interval = setInterval(() => {
        progress += 100 / loadingTexts.length;
        loadingProgress.style.width = `${Math.min(progress, 100)}%`;
        
        const textIndex = Math.floor(progress / (100 / loadingTexts.length));
        if (textIndex < loadingTexts.length) {
            loadingText.textContent = loadingTexts[textIndex];
        }
        
        if (progress >= 100) {
            clearInterval(interval);
        }
    }, 500);
}

function hideLoadingScreen() {
    document.getElementById('loadingScreen').classList.add('hidden');
    document.getElementById('mainInterface').classList.remove('hidden');
}

function initializeTabs() {
    const tabButtons = document.querySelectorAll('.tab-button');
    const tabContents = document.querySelectorAll('.tab-content');
    
    tabButtons.forEach(button => {
        button.addEventListener('click', () => {
            const tabId = button.getAttribute('data-tab');
            switchTab(tabId);
        });
    });
}

function switchTab(tabId) {
    // Update button states
    document.querySelectorAll('.tab-button').forEach(btn => {
        btn.classList.remove('active');
    });
    document.querySelector(`[data-tab="${tabId}"]`).classList.add('active');
    
    // Update content visibility
    document.querySelectorAll('.tab-content').forEach(content => {
        content.classList.remove('active');
    });
    document.getElementById(tabId).classList.add('active');
    
    currentTab = tabId;
    addLog(`Navegação: ${tabId}`, 'info');
}

function initializeMap() {
    // Initialize Leaflet map centered on Brazil
    const map = L.map('mapContainer').setView([-14.2400, -53.1800], 4);
    
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '© OpenStreetMap contributors'
    }).addTo(map);
    
    // Add markers for major Brazilian cities
    const cities = [
        { name: 'Brasília', lat: -15.7942, lng: -47.8822 },
        { name: 'São Paulo', lat: -23.5505, lng: -46.6333 },
        { name: 'Rio de Janeiro', lat: -22.9068, lng: -43.1729 },
        { name: 'Salvador', lat: -12.9714, lng: -38.5014 },
        { name: 'Fortaleza', lat: -3.7172, lng: -38.5433 }
    ];
    
    cities.forEach(city => {
        L.marker([city.lat, city.lng])
            .addTo(map)
            .bindPopup(`<strong>${city.name}</strong>`);
    });
    
    window.brazilMap = map;
}

function initializeCharts() {
    // Weather Chart
    const weatherCtx = document.getElementById('weatherChart');
    if (weatherCtx) {
        new Chart(weatherCtx, {
            type: 'line',
            data: {
                labels: ['6h', '9h', '12h', '15h', '18h', '21h'],
                datasets: [{
                    label: 'Temperatura (°C)',
                    data: [18, 22, 28, 31, 27, 23],
                    borderColor: '#00ff41',
                    backgroundColor: 'rgba(0, 255, 65, 0.1)',
                    tension: 0.4
                }]
            },
            options: {
                responsive: true,
                plugins: {
                    legend: {
                        labels: { color: '#00ff41' }
                    }
                },
                scales: {
                    x: { ticks: { color: '#00ff41' } },
                    y: { ticks: { color: '#00ff41' } }
                }
            }
        });
    }
    
    // Economic Chart
    const economicCtx = document.getElementById('economicChart');
    if (economicCtx) {
        new Chart(economicCtx, {
            type: 'bar',
            data: {
                labels: ['USD', 'EUR', 'GBP', 'JPY'],
                datasets: [{
                    label: 'Taxa de Câmbio (BRL)',
                    data: [5.20, 5.65, 6.45, 0.039],
                    backgroundColor: [
                        'rgba(34, 197, 94, 0.8)',
                        'rgba(59, 130, 246, 0.8)',
                        'rgba(251, 191, 36, 0.8)',
                        'rgba(239, 68, 68, 0.8)'
                    ]
                }]
            },
            options: {
                responsive: true,
                plugins: {
                    legend: {
                        labels: { color: '#00ff41' }
                    }
                },
                scales: {
                    x: { ticks: { color: '#00ff41' } },
                    y: { ticks: { color: '#00ff41' } }
                }
            }
        });
    }
}

function updateSystemStats() {
    // Update CPU usage
    const cpuUsage = Math.floor(Math.random() * 30 + 40);
    document.getElementById('cpuUsage').textContent = `${cpuUsage}%`;
    document.querySelector('#dashboard .progress-fill').style.width = `${cpuUsage}%`;
    
    // Update memory usage
    const memUsage = Math.floor(Math.random() * 40 + 30);
    document.getElementById('memUsage').textContent = `${memUsage}%`;
    
    // Update weather summary
    updateWeatherSummary();
    
    // Update economic data
    updateEconomicData();
}

function updateWeatherSummary() {
    const weatherSummary = document.getElementById('weatherSummary');
    const cities = ['São Paulo', 'Rio de Janeiro', 'Brasília', 'Salvador'];
    const conditions = ['☀️ Ensolarado', '☁️ Nublado', '🌧️ Chuvoso', '⛅ Parcialmente nublado'];
    
    let html = '';
    cities.forEach(city => {
        const temp = Math.floor(Math.random() * 15 + 15);
        const condition = conditions[Math.floor(Math.random() * conditions.length)];
        html += `
            <div class="flex justify-between text-xs">
                <span>${city}:</span>
                <span>${temp}°C ${condition}</span>
            </div>
        `;
    });
    
    weatherSummary.innerHTML = html;
}

function updateEconomicData() {
    // Simulate real-time exchange rate updates
    const usdRate = (5.20 + (Math.random() - 0.5) * 0.1).toFixed(2);
    const eurRate = (5.65 + (Math.random() - 0.5) * 0.1).toFixed(2);
    
    document.getElementById('usdRate').textContent = `R$ ${usdRate}`;
    document.getElementById('eurRate').textContent = `R$ ${eurRate}`;
}

function updateTime() {
    const now = new Date();
    document.getElementById('systemTime').textContent = now.toLocaleTimeString('pt-BR');
}

function populateSelectors() {
    // Populate state selectors
    const stateSelectors = ['stateSelect', 'stateInfoSelect'];
    stateSelectors.forEach(selectorId => {
        const selector = document.getElementById(selectorId);
        if (selector) {
            Object.entries(brazilianStates).forEach(([code, state]) => {
                const option = document.createElement('option');
                option.value = code;
                option.textContent = `${state.name} (${code})`;
                selector.appendChild(option);
            });
        }
    });
    
    // Add event listeners
    document.getElementById('stateSelect')?.addEventListener('change', updateCitySelector);
    document.getElementById('stateInfoSelect')?.addEventListener('change', updateStateInfo);
}

function updateCitySelector() {
    const stateCode = document.getElementById('stateSelect').value;
    const citySelector = document.getElementById('citySelect');
    
    citySelector.innerHTML = '<option value="">Selecione a Cidade</option>';
    
    if (stateCode && majorCities[stateCode]) {
        majorCities[stateCode].forEach(city => {
            const option = document.createElement('option');
            option.value = city;
            option.textContent = city;
            citySelector.appendChild(option);
        });
    }
}

function updateStateInfo() {
    const stateCode = document.getElementById('stateInfoSelect').value;
    const stateInfoDiv = document.getElementById('stateInfo');
    
    if (!stateCode) {
        stateInfoDiv.innerHTML = '<p class="text-gray-400">Selecione um estado para ver informações detalhadas</p>';
        return;
    }
    
    const state = brazilianStates[stateCode];
    stateInfoDiv.innerHTML = `
        <div class="space-y-2">
            <div class="flex justify-between">
                <span>Nome:</span>
                <span class="text-green-400">${state.name}</span>
            </div>
            <div class="flex justify-between">
                <span>Capital:</span>
                <span class="text-green-400">${state.capital}</span>
            </div>
            <div class="flex justify-between">
                <span>Região:</span>
                <span class="text-green-400">${state.region}</span>
            </div>
            <div class="flex justify-between">
                <span>População:</span>
                <span class="text-green-400">${state.population.toLocaleString('pt-BR')}</span>
            </div>
        </div>
    `;
}

function startRadarScan() {
    systemData.radarActive = true;
    const canvas = document.getElementById('radarCanvas');
    const ctx = canvas.getContext('2d');
    
    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;
    
    let angle = 0;
    const centerX = canvas.width / 2;
    const centerY = canvas.height / 2;
    const radius = Math.min(centerX, centerY) - 10;
    
    function drawRadar() {
        if (!systemData.radarActive) return;
        
        // Clear canvas
        ctx.fillStyle = '#0f172a';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        
        // Draw radar circles
        ctx.strokeStyle = '#00ff41';
        ctx.lineWidth = 1;
        for (let i = 1; i <= 3; i++) {
            ctx.beginPath();
            ctx.arc(centerX, centerY, (radius * i) / 3, 0, 2 * Math.PI);
            ctx.stroke();
        }
        
        // Draw cross lines
        ctx.beginPath();
        ctx.moveTo(centerX - radius, centerY);
        ctx.lineTo(centerX + radius, centerY);
        ctx.moveTo(centerX, centerY - radius);
        ctx.lineTo(centerX, centerY + radius);
        ctx.stroke();
        
        // Draw sweep line
        ctx.strokeStyle = '#00ff41';
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.moveTo(centerX, centerY);
        const sweepX = centerX + Math.cos(angle) * radius;
        const sweepY = centerY + Math.sin(angle) * radius;
        ctx.lineTo(sweepX, sweepY);
        ctx.stroke();
        
        // Draw sweep gradient
        const gradient = ctx.createRadialGradient(centerX, centerY, 0, centerX, centerY, radius);
        gradient.addColorStop(0, 'rgba(0, 255, 65, 0.3)');
        gradient.addColorStop(1, 'rgba(0, 255, 65, 0)');
        
        ctx.fillStyle = gradient;
        ctx.beginPath();
        ctx.moveTo(centerX, centerY);
        ctx.arc(centerX, centerY, radius, angle - 0.3, angle);
        ctx.closePath();
        ctx.fill();
        
        // Add random detection points
        if (Math.random() < 0.1) {
            const detectionAngle = Math.random() * 2 * Math.PI;
            const detectionRadius = Math.random() * radius;
            const detectionX = centerX + Math.cos(detectionAngle) * detectionRadius;
            const detectionY = centerY + Math.sin(detectionAngle) * detectionRadius;
            
            ctx.fillStyle = '#ff0000';
            ctx.beginPath();
            ctx.arc(detectionX, detectionY, 3, 0, 2 * Math.PI);
            ctx.fill();
            
            addRadarDetection(detectionAngle, detectionRadius);
        }
        
        angle += 0.05;
        requestAnimationFrame(drawRadar);
    }
    
    drawRadar();
    addLog('Sistema de radar ativado', 'success');
}

function stopRadarScan() {
    systemData.radarActive = false;
    addLog('Sistema de radar desativado', 'info');
}

function addRadarDetection(angle, radius) {
    const detectionsDiv = document.getElementById('radarDetections');
    const time = new Date().toLocaleTimeString('pt-BR');
    const distance = Math.floor((radius / 100) * 50); // Convert to km
    const bearing = Math.floor((angle * 180) / Math.PI);
    
    const detection = document.createElement('div');
    detection.className = 'text-xs p-2 bg-red-900 border border-red-500 rounded';
    detection.innerHTML = `
        <div class="text-red-400">${time}</div>
        <div>Distância: ${distance}km</div>
        <div>Direção: ${bearing}°</div>
    `;
    
    detectionsDiv.insertBefore(detection, detectionsDiv.firstChild);
    
    // Keep only last 10 detections
    while (detectionsDiv.children.length > 10) {
        detectionsDiv.removeChild(detectionsDiv.lastChild);
    }
}

function scanNetwork() {
    systemData.networkScanActive = true;
    const resultsDiv = document.getElementById('networkScanResults');
    
    resultsDiv.innerHTML = '<div class="text-yellow-400">Escaneando rede...</div>';
    
    setTimeout(() => {
        const devices = [
            { ip: '192.168.1.1', name: 'Router Principal', status: 'ONLINE', port: '80' },
            { ip: '192.168.1.10', name: 'SISFRON-MAIN', status: 'ONLINE', port: '22' },
            { ip: '192.168.1.15', name: 'Câmera Segurança 01', status: 'ONLINE', port: '554' },
            { ip: '192.168.1.20', name: 'Servidor Backup', status: 'STANDBY', port: '21' },
            { ip: '192.168.1.25', name: 'Estação Meteorológica', status: 'ONLINE', port: '80' },
            { ip: '192.168.1.??', name: 'Dispositivo Desconhecido', status: 'CRIPTOGRAFADO', port: '???' }
        ];
        
        let html = '';
        devices.forEach(device => {
            const statusClass = device.status === 'ONLINE' ? 'text-green-400' : 
                               device.status === 'STANDBY' ? 'text-yellow-400' : 'text-red-400';
            html += `
                <div class="text-xs p-2 border border-green-500 rounded mb-1">
                    <div class="flex justify-between">
                        <span>${device.name}</span>
                        <span class="${statusClass}">${device.status}</span>
                    </div>
                    <div class="text-gray-400">${device.ip}:${device.port}</div>
                </div>
            `;
        });
        
        resultsDiv.innerHTML = html;
        addLog('Escaneamento de rede concluído', 'success');
    }, 2000);
}

function calculateTaxes() {
    const salaryInput = document.getElementById('salaryInput');
    const resultsDiv = document.getElementById('taxResults');
    const salary = parseFloat(salaryInput.value);
    
    if (!salary || salary <= 0) {
        resultsDiv.innerHTML = '<div class="text-red-400">Digite um salário válido</div>';
        return;
    }
    
    // Simplified Brazilian tax calculation
    const inss = Math.min(salary * 0.11, 713.10);
    const irpf = salary > 4664.68 ? (salary - 4664.68) * 0.275 : 0;
    const netSalary = salary - inss - irpf;
    
    resultsDiv.innerHTML = `
        <div class="space-y-1">
            <div class="flex justify-between">
                <span>Salário Bruto:</span>
                <span class="text-green-400">R$ ${salary.toFixed(2)}</span>
            </div>
            <div class="flex justify-between">
                <span>INSS:</span>
                <span class="text-red-400">-R$ ${inss.toFixed(2)}</span>
            </div>
            <div class="flex justify-between">
                <span>IRPF:</span>
                <span class="text-red-400">-R$ ${irpf.toFixed(2)}</span>
            </div>
            <hr class="border-green-500">
            <div class="flex justify-between font-bold">
                <span>Salário Líquido:</span>
                <span class="text-green-400">R$ ${netSalary.toFixed(2)}</span>
            </div>
        </div>
    `;
}

function searchCEP() {
    const cepInput = document.getElementById('cepInput');
    const resultsDiv = document.getElementById('cepResults');
    const cep = cepInput.value.replace(/\D/g, '');
    
    if (cep.length !== 8) {
        resultsDiv.innerHTML = '<div class="text-red-400">CEP deve ter 8 dígitos</div>';
        return;
    }
    
    resultsDiv.innerHTML = '<div class="text-yellow-400">Consultando CEP...</div>';
    
    // Simulate CEP lookup
    setTimeout(() => {
        const mockData = {
            cep: `${cep.slice(0,5)}-${cep.slice(5)}`,
            logradouro: 'Avenida Paulista',
            bairro: 'Bela Vista',
            localidade: 'São Paulo',
            uf: 'SP',
            regiao: 'Sudeste'
        };
        
        resultsDiv.innerHTML = `
            <div class="space-y-1">
                <div class="flex justify-between">
                    <span>CEP:</span>
                    <span class="text-green-400">${mockData.cep}</span>
                </div>
                <div class="flex justify-between">
                    <span>Logradouro:</span>
                    <span class="text-green-400">${mockData.logradouro}</span>
                </div>
                <div class="flex justify-between">
                    <span>Bairro:</span>
                    <span class="text-green-400">${mockData.bairro}</span>
                </div>
                <div class="flex justify-between">
                    <span>Cidade:</span>
                    <span class="text-green-400">${mockData.localidade}</span>
                </div>
                <div class="flex justify-between">
                    <span>Estado:</span>
                    <span class="text-green-400">${mockData.uf}</span>
                </div>
            </div>
        `;
    }, 1000);
}

function initializeTerminal() {
    const terminalInput = document.getElementById('terminalInput');
    const terminalOutput = document.getElementById('terminalOutput');
    let commandHistory = [];
    let historyIndex = -1;
    
    terminalInput.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') {
            const command = e.target.value.trim();
            if (command) {
                executeTerminalCommand(command);
                commandHistory.push(command);
                historyIndex = commandHistory.length;
            }
            e.target.value = '';
        } else if (e.key === 'ArrowUp') {
            if (historyIndex > 0) {
                historyIndex--;
                e.target.value = commandHistory[historyIndex];
            }
            e.preventDefault();
        } else if (e.key === 'ArrowDown') {
            if (historyIndex < commandHistory.length - 1) {
                historyIndex++;
                e.target.value = commandHistory[historyIndex];
            } else {
                historyIndex = commandHistory.length;
                e.target.value = '';
            }
            e.preventDefault();
        }
    });
}

function executeTerminalCommand(input) {
    const terminalOutput = document.getElementById('terminalOutput');
    
    // Add command to output
    const commandLine = document.createElement('div');
    commandLine.className = 'terminal-line text-green-400';
    commandLine.innerHTML = `<span class="terminal-prompt">SISFRON@terminal:~$</span> ${input}`;
    terminalOutput.appendChild(commandLine);
    
    // Parse command
    const [command, ...args] = input.toLowerCase().split(' ');
    
    // Execute command
    let result = '';
    if (terminalCommands[command]) {
        result = terminalCommands[command](args.join(' '));
    } else {
        result = `Comando não encontrado: ${command}\nDigite 'help' para ver os comandos disponíveis.`;
    }
    
    // Add result to output
    if (result) {
        const resultDiv = document.createElement('div');
        resultDiv.className = 'terminal-line';
        resultDiv.innerHTML = result.replace(/\n/g, '<br>');
        terminalOutput.appendChild(resultDiv);
    }
    
    // Scroll to bottom
    terminalOutput.scrollTop = terminalOutput.scrollHeight;
    
    // Log command execution
    addLog(`Terminal: ${input}`, 'info');
}

function addLog(message, type = 'info') {
    const timestamp = new Date().toLocaleTimeString('pt-BR');
    const log = { timestamp, message, type };
    
    systemData.logs.push(log);
    
    // Update recent logs display
    const recentLogsDiv = document.getElementById('recentLogs');
    if (recentLogsDiv) {
        const logElement = document.createElement('div');
        logElement.className = `text-xs ${type === 'error' ? 'text-red-400' : type === 'success' ? 'text-green-400' : type === 'warning' ? 'text-yellow-400' : 'text-gray-400'}`;
        logElement.textContent = `${timestamp} - ${message}`;
        
        recentLogsDiv.insertBefore(logElement, recentLogsDiv.firstChild);
        
        // Keep only last 10 logs
        while (recentLogsDiv.children.length > 10) {
            recentLogsDiv.removeChild(recentLogsDiv.lastChild);
        }
    }
}

// Utility Functions
function showFullBrazil() {
    if (window.brazilMap) {
        window.brazilMap.setView([-14.2400, -53.1800], 4);
    }
    addLog('Visualização: Brasil completo', 'info');
}

function showStateCapitals() {
    addLog('Visualização: Capitais estaduais', 'info');
}

function showMajorCities() {
    addLog('Visualização: Grandes cidades', 'info');
}

function toggleFullscreen() {
    if (!document.fullscreenElement) {
        document.documentElement.requestFullscreen();
    } else {
        document.exitFullscreen();
    }
}

function showSettings() {
    document.getElementById('settingsModal').classList.remove('hidden');
}

function closeSettings() {
    document.getElementById('settingsModal').classList.add('hidden');
}

function saveSettings() {
    addLog('Configurações salvas', 'success');
    closeSettings();
}

// Dark mode detection
if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
    document.documentElement.classList.add('dark');
}

window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', event => {
    if (event.matches) {
        document.documentElement.classList.add('dark');
    } else {
        document.documentElement.classList.remove('dark');
    }
});
