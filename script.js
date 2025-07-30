@import url('https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;500;700&display=swap');

:root {
    --terminal-green: #00ff41;
    --terminal-green-dim: #00cc33;
    --terminal-bg: #0f172a;
    --terminal-amber: #fbbf24;
    --terminal-red: #ef4444;
    --terminal-blue: #3b82f6;
}

* {
    box-sizing: border-box;
}

body {
    font-family: 'JetBrains Mono', 'Courier New', monospace;
    background: var(--terminal-bg);
    color: var(--terminal-green);
    margin: 0;
    padding: 0;
}

/* CRT Effect */
.crt-effect {
    position: relative;
    background: linear-gradient(
        transparent 50%, 
        rgba(0, 255, 65, 0.02) 50%
    );
    background-size: 100% 4px;
    animation: flicker 0.15s infinite linear;
}

.crt-effect::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: radial-gradient(
        ellipse at center,
        transparent 40%,
        rgba(0, 0, 0, 0.3) 100%
    );
    pointer-events: none;
    z-index: 10;
}

@keyframes flicker {
    0%, 100% { opacity: 1; }
    50% { opacity: 0.98; }
}

/* Loading Animation */
.loading-bar {
    background: #1e293b;
    border-radius: 4px;
    overflow: hidden;
}

.loading-progress {
    transition: width 0.3s ease;
}

/* Tab System */
.tab-button {
    padding: 12px 16px;
    border: none;
    background: transparent;
    color: #64748b;
    border-bottom: 2px solid transparent;
    cursor: pointer;
    font-family: inherit;
    font-size: 14px;
    white-space: nowrap;
    transition: all 0.3s ease;
}

.tab-button:hover {
    color: var(--terminal-green);
    background: rgba(0, 255, 65, 0.1);
}

.tab-button.active {
    color: var(--terminal-green);
    border-bottom-color: var(--terminal-green);
    background: rgba(0, 255, 65, 0.1);
}

.tab-content {
    display: none;
}

.tab-content.active {
    display: block;
}

/* Widgets */
.widget {
    border-radius: 8px;
    background: #1e293b;
    border: 1px solid var(--terminal-green);
    padding: 16px;
    transition: all 0.3s ease;
}

.widget:hover {
    border-color: var(--terminal-amber);
    box-shadow: 0 0 10px rgba(0, 255, 65, 0.3);
}

/* Progress Bars */
.progress-bar {
    width: 100%;
    height: 8px;
    background: #374151;
    border-radius: 4px;
    overflow: hidden;
}

.progress-fill {
    height: 100%;
    border-radius: 4px;
    transition: width 0.3s ease;
}

/* Status Indicators */
.status-indicator {
    padding: 2px 8px;
    border-radius: 4px;
    font-size: 10px;
    font-weight: bold;
}

.status-indicator.online {
    background: #22c55e;
    color: #000;
}

.status-indicator.offline {
    background: #ef4444;
    color: #fff;
}

.status-indicator.warning {
    background: #f59e0b;
    color: #000;
}

/* Map Styles */
#mapContainer {
    border-radius: 8px;
    overflow: hidden;
}

.leaflet-container {
    background: #1e293b !important;
}

/* Radar Styles */
#radarCanvas {
    border-radius: 8px;
}

.radar-sweep {
    animation: radar-sweep 3s linear infinite;
}

@keyframes radar-sweep {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
}

/* Terminal Styles */
#terminalOutput {
    font-family: 'JetBrains Mono', monospace;
    font-size: 14px;
    line-height: 1.4;
}

#terminalInput {
    font-family: 'JetBrains Mono', monospace;
    font-size: 14px;
}

.terminal-line {
    margin: 2px 0;
    word-wrap: break-word;
}

.terminal-prompt {
    color: var(--terminal-amber);
}

.terminal-error {
    color: var(--terminal-red);
}

.terminal-success {
    color: var(--terminal-green);
}

.terminal-info {
    color: var(--terminal-blue);
}

/* Animations */
@keyframes pulse {
    0%, 100% { opacity: 1; }
    50% { opacity: 0.5; }
}

.pulse {
    animation: pulse 2s infinite;
}

@keyframes slideIn {
    from { transform: translateX(-100%); opacity: 0; }
    to { transform: translateX(0); opacity: 1; }
}

.slide-in {
    animation: slideIn 0.5s ease-out;
}

/* Responsive Design */
@media (max-width: 768px) {
    .grid {
        grid-template-columns: 1fr;
    }
    
    .tab-button {
        padding: 8px 12px;
        font-size: 12px;
    }
    
    .widget {
        padding: 12px;
    }
    
    #terminalOutput {
        font-size: 12px;
    }
}

/* Dark mode enhancements */
.dark .widget {
    background: #0f172a;
    border-color: var(--terminal-green);
}

.dark input, .dark select {
    background: #1e293b;
    border-color: var(--terminal-green);
    color: var(--terminal-green);
}

.dark input::placeholder {
    color: #64748b;
}

/* Scrollbar Styling */
::-webkit-scrollbar {
    width: 8px;
}

::-webkit-scrollbar-track {
    background: #1e293b;
}

::-webkit-scrollbar-thumb {
    background: var(--terminal-green);
    border-radius: 4px;
}

::-webkit-scrollbar-thumb:hover {
    background: var(--terminal-green-dim);
}

/* Form Elements */
input, select, button {
    font-family: 'JetBrains Mono', monospace;
}

button:hover {
    transform: translateY(-1px);
    transition: transform 0.2s ease;
}

/* Special Effects */
.glitch {
    animation: glitch 0.3s ease-in-out;
}

@keyframes glitch {
    0% { transform: translate(0); }
    20% { transform: translate(-2px, 2px); }
    40% { transform: translate(-2px, -2px); }
    60% { transform: translate(2px, 2px); }
    80% { transform: translate(2px, -2px); }
    100% { transform: translate(0); }
}

.scan-line {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 2px;
    background: linear-gradient(90deg, transparent, var(--terminal-green), transparent);
    animation: scan 3s linear infinite;
}

@keyframes scan {
    0% { top: 0; }
    100% { top: 100%; }
}
