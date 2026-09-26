/**
 * Web Port Audio Autoplay Fix
 * Automatically resumes suspended AudioContext instances upon user interaction.
 */
(function () {
    'use strict';

    // 1. Register global event listeners for user gestures
    ['click', 'keydown', 'touchstart', 'mousedown'].forEach(function (eventName) {
        window.addEventListener(eventName, function () {
            resumeAudioContext();
        }, { passive: true });
    });

    function resumeAudioContext() {
        if (typeof Module !== 'undefined' && Module['SDL2'] && Module['SDL2'].audioContext) {
            var ctx = Module['SDL2'].audioContext;
            if (ctx.state === 'suspended') {
                ctx.resume().then(function () {
                    console.log('[AudioFix] AudioContext successfully resumed.');
                }).catch(function (err) {
                    console.warn('[AudioFix] Failed to resume AudioContext:', err);
                });
            }
        }
    }

    // 2. Intercept AudioContext creation if AudioContext is instantiated globally
    if (typeof window.AudioContext !== 'undefined' || typeof window.webkitAudioContext !== 'undefined') {
        const AudioCtx = window.AudioContext || window.webkitAudioContext;
        // Optional wrapper if needed to catch direct context instantiations
    }
})();
