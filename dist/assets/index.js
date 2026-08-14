(function(){"use strict";var ua=document.createElement("style");ua.textContent=`:root{--bg: #0d1117;--panel: rgba(18, 24, 33, .92);--primary: #4caf50;--primary-d: #388e3c;--danger: #e53935;--text: #e6edf3;--muted: #8b98a5}*{box-sizing:border-box;-webkit-tap-highlight-color:transparent}html,body{margin:0;padding:0;width:100%;height:100%;overflow:hidden;background:var(--bg);color:var(--text);font-family:-apple-system,PingFang SC,Microsoft YaHei,system-ui,sans-serif;user-select:none;-webkit-user-select:none;touch-action:none;overscroll-behavior:none}#game-canvas{position:fixed;top:0;right:0;bottom:0;left:0;width:100%;height:100%;display:block}.hidden{display:none!important}.overlay{position:fixed;top:0;right:0;bottom:0;left:0;display:flex;align-items:center;justify-content:center;align-items:safe center;overflow-y:auto;-webkit-overflow-scrolling:touch;background:radial-gradient(circle at 50% 30%,#161b22,#0d1117 70%);z-index:20;padding:max(16px,env(safe-area-inset-top)) max(16px,env(safe-area-inset-right)) max(16px,env(safe-area-inset-bottom)) max(16px,env(safe-area-inset-left))}.panel{width:100%;max-width:420px;margin:auto;background:var(--panel);border:1px solid #232c38;border-radius:18px;padding:28px 22px;text-align:center;box-shadow:0 12px 40px #00000080}.panel h1{margin:0 0 6px;font-size:34px;letter-spacing:1px}.panel h2{margin:0 0 14px;font-size:22px}.sub{color:var(--muted);font-size:13px;margin:0 0 22px}.tip{color:var(--muted);font-size:12px;margin-top:18px;line-height:1.6}.compat-warn{color:#f0a23b;background:#f0a23b14;border:1px solid rgba(240,162,59,.35);border-radius:8px;padding:8px 10px}.big-btn{display:block;width:100%;margin:10px 0;padding:15px;font-size:16px;font-weight:600;color:var(--text);background:#1f2733;border:1px solid #2c3744;border-radius:12px;cursor:pointer;transition:transform .05s ease,background .15s ease}.big-btn:active{transform:scale(.98)}.big-btn.primary{background:var(--primary);border-color:var(--primary-d);color:#fff}.big-btn.ghost{background:transparent;color:var(--muted)}.mode-btn{display:flex;flex-direction:column;gap:4px;width:100%;margin:10px 0;padding:16px 18px;text-align:left;background:#161d27;border:2px solid #2a3543;border-radius:14px;color:var(--text);cursor:pointer;transition:border-color .15s ease,background .15s ease,transform .05s ease}.mode-btn:active{transform:scale(.99)}.mode-btn.active{border-color:var(--primary);background:#18241c}.mode-ico{font-size:26px;line-height:1}.mode-title{font-size:17px;font-weight:700;margin-top:4px}.mode-desc{font-size:12px;color:var(--muted);line-height:1.5}.lives-row{display:flex;align-items:center;justify-content:space-between;margin:14px 2px 4px}.lives-text{font-size:14px;color:var(--text)}.lives-stepper{display:flex;align-items:center;gap:14px}.step-btn{width:38px;height:38px;font-size:22px;line-height:1;border-radius:10px;background:#1f2733;border:1px solid #2c3744;color:var(--text);cursor:pointer}.step-btn:active{transform:scale(.94)}.lives-num{min-width:28px;text-align:center;font-size:20px;font-weight:700}.opt-row{display:flex;align-items:center;justify-content:space-between;gap:12px;margin:12px 2px 2px;padding:10px 12px;background:#161d27;border:1px solid #2a3543;border-radius:12px}.opt-text{font-size:14px;color:var(--text);text-align:left}.opt-sub{display:block;font-size:11px;color:var(--muted);margin-top:2px}.switch{position:relative;display:inline-block;width:46px;height:26px;flex:0 0 auto}.switch input{display:none}.switch .slider{position:absolute;top:0;right:0;bottom:0;left:0;background:#2c3744;border-radius:999px;cursor:pointer;transition:background .15s ease}.switch .slider:before{content:"";position:absolute;left:3px;top:3px;width:20px;height:20px;background:#fff;border-radius:50%;transition:transform .15s ease}.switch input:checked+.slider{background:var(--primary)}.switch input:checked+.slider:before{transform:translate(20px)}.seg{display:inline-flex;background:#0f141b;border:1px solid #2c3744;border-radius:10px;overflow:hidden;flex:0 0 auto}.seg-btn{padding:8px 16px;font-size:13px;font-weight:600;color:var(--muted);background:transparent;border:none;cursor:pointer}.seg-btn.active{background:var(--primary);color:#fff}.room-list{max-height:320px;overflow-y:auto;margin:8px 0 16px}.room-item{display:flex;align-items:center;justify-content:space-between;padding:14px 16px;margin:8px 0;background:#161d27;border:1px solid #2a3543;border-radius:12px;cursor:pointer;text-align:left}.room-item:active{background:#1d2733}.room-item .r-name{font-size:16px;font-weight:600}.room-item .r-meta{font-size:12px;color:var(--muted);margin-top:3px}.room-item .r-join{color:var(--primary);font-weight:700;font-size:14px}.empty{color:var(--muted);font-size:14px;padding:24px 0}.hud{position:fixed;top:0;right:0;bottom:0;left:0;z-index:50;pointer-events:none}#hud-top{position:absolute;top:max(14px,env(safe-area-inset-top));left:0;right:0;display:flex;justify-content:space-between;gap:14px;padding:0 72px;font-size:15px;font-weight:700;text-shadow:0 1px 3px #000}#hud-players{position:absolute;top:max(50px,calc(env(safe-area-inset-top) + 40px));left:12px;display:flex;flex-direction:column;gap:6px}#crosshair{position:absolute;top:50%;left:50%;width:26px;height:26px;transform:translate(-50%,-50%);pointer-events:none;z-index:12}#crosshair:before,#crosshair:after{content:"";position:absolute;background:#ffffffd9;box-shadow:0 0 3px #000000e6}#crosshair:before{left:50%;top:0;width:2px;height:100%;transform:translate(-50%)}#crosshair:after{top:50%;left:0;height:2px;width:100%;transform:translateY(-50%)}.ph{display:flex;align-items:center;gap:6px;font-size:13px;text-shadow:0 1px 2px #000}.ph .dot{width:10px;height:10px;border-radius:50%}.bar{width:84px;height:8px;background:#333;border-radius:4px;overflow:hidden}.bar>i{display:block;height:100%;background:var(--primary)}.lives-badge{font-size:11px;color:var(--muted);background:#1c2530;border-radius:6px;padding:1px 6px;margin-left:2px}.result{position:absolute;top:0;right:0;bottom:0;left:0;display:flex;flex-direction:column;align-items:center;justify-content:center;justify-content:safe center;overflow-y:auto;-webkit-overflow-scrolling:touch;padding:18px 12px;background:#05080cb8;pointer-events:auto;gap:18px}.result h2{font-size:30px;margin:0}.controls{position:fixed;top:0;right:0;bottom:0;left:0;z-index:15;pointer-events:none}.joystick{position:absolute;left:14%;top:72%;width:120px;height:120px;border-radius:50%;background:#ffffff0f;border:2px solid rgba(255,255,255,.18);pointer-events:auto;touch-action:none;transform:translate(-50%,-50%)}.joystick .knob{position:absolute;left:50%;top:50%;width:52px;height:52px;margin:-26px 0 0 -26px;border-radius:50%;background:#ffffff8c;border:2px solid rgba(255,255,255,.8)}.joystick .label{position:absolute;bottom:-22px;left:0;right:0;text-align:center;font-size:11px;color:var(--muted)}.look-zone{position:fixed;top:0;right:0;width:50%;height:100%;z-index:13;pointer-events:auto;touch-action:none;background:transparent}.fire-btn{position:fixed;left:88%;top:64%;width:84px;height:84px;border-radius:50%;display:flex;align-items:center;justify-content:center;background:#e53935d1;border:2px solid rgba(255,255,255,.7);color:#fff;font-size:16px;font-weight:700;letter-spacing:1px;z-index:16;pointer-events:auto;touch-action:none;-webkit-user-select:none;user-select:none;box-shadow:0 4px 14px #00000080;transform:translate(-50%,-50%)}.fire-btn:active{transform:translate(-50%,-50%) scale(.92);background:#e53935}.pc-help{position:fixed;bottom:12px;left:50%;transform:translate(-50%);display:flex;gap:16px;align-items:center;z-index:14;pointer-events:none;background:#121821b8;border:1px solid #2c3744;border-radius:10px;padding:8px 16px;font-size:12px;color:var(--muted);text-shadow:0 1px 2px #000}.pc-help b{color:var(--text)}.pc-help .dim{opacity:.7}.host-info{position:absolute;bottom:calc(56px + env(safe-area-inset-bottom));left:50%;transform:translate(-50%);background:#121821eb;border:1px solid #2c3744;border-radius:10px;padding:8px 14px;font-size:12px;color:var(--text);text-align:center;max-width:92vw;z-index:14;pointer-events:none}.host-info b{color:var(--primary)}.row{display:flex;gap:8px;margin-top:10px}.row input{flex:1;min-width:0;padding:12px;font-size:15px;border-radius:10px;border:1px solid #2c3744;background:#0f141b;color:var(--text);outline:none}.row input:focus{border-color:var(--primary)}.wave-overlay{position:absolute;top:54px;right:12px;display:flex;flex-direction:column;align-items:flex-end;gap:4px;pointer-events:none;z-index:16}.wave-btn{pointer-events:auto;padding:7px 14px;font-size:13px;font-weight:600;color:#fff;background:var(--primary);border:1px solid var(--primary-d);border-radius:999px;cursor:pointer;box-shadow:0 2px 8px #0006}.wave-btn:active{transform:scale(.97)}.wave-overlay .wave-hint{color:var(--muted);font-size:11px;text-shadow:0 1px 2px #000}.fs-btn{position:fixed;top:12px;right:12px;z-index:30;pointer-events:auto;padding:6px 12px;font-size:12px;font-weight:600;color:var(--text);background:#121821b8;border:1px solid #2c3744;border-radius:999px;cursor:pointer;box-shadow:0 2px 8px #0006}.fs-btn:active{transform:scale(.97)}.jump-btn{position:fixed;left:88%;top:86%;width:76px;height:76px;border-radius:50%;display:flex;align-items:center;justify-content:center;background:#4caf50d1;border:2px solid rgba(255,255,255,.7);color:#fff;font-size:18px;font-weight:700;z-index:16;pointer-events:auto;touch-action:none;-webkit-user-select:none;user-select:none;box-shadow:0 4px 14px #00000080;transform:translate(-50%,-50%)}.jump-btn:active{transform:translate(-50%,-50%) scale(.92);background:#4caf50}.settings-btn{position:fixed;top:12px;left:12px;z-index:30;pointer-events:auto;padding:6px 12px;font-size:12px;font-weight:600;color:var(--text);background:#121821b8;border:1px solid #2c3744;border-radius:999px;cursor:pointer;box-shadow:0 2px 8px #0006}.settings-btn:active{transform:scale(.97)}.settings-panel{position:fixed;top:50%;left:50%;transform:translate(-50%,-50%);width:min(92vw,360px);max-height:84vh;overflow-y:auto;background:var(--panel);border:1px solid #2c3744;border-radius:16px;padding:20px;z-index:60;display:flex;flex-direction:column;gap:10px;box-shadow:0 12px 40px #0009}.settings-panel h3{margin:0 0 6px;font-size:18px;text-align:center}.settings-panel label{font-size:13px;color:var(--muted);display:flex;justify-content:space-between}.settings-panel label span{color:var(--text);font-weight:700}.settings-panel input[type=range]{width:100%;accent-color:var(--primary)}.settings-panel .tip{color:var(--muted);font-size:11px;margin:4px 0 0;line-height:1.5}.set-section{display:flex;flex-direction:column;gap:10px;padding:12px;background:#ffffff0a;border:1px solid #2a3543;border-radius:12px}.set-section-title{font-size:12px;font-weight:700;color:var(--primary);letter-spacing:1px}.set-row{display:flex;flex-direction:column;gap:6px}.set-row.keys{gap:8px}.key-btn{flex:1 1 auto;min-width:0;padding:10px 6px;font-size:13px;font-weight:600;color:var(--text);background:#1f2733;border:1px solid #2c3744;border-radius:10px;cursor:pointer;display:flex;align-items:center;justify-content:center;gap:6px;transition:background .15s ease}.key-btn b{color:var(--primary);font-size:14px;min-width:18px;display:inline-block;text-align:center}.key-btn:active{transform:scale(.97)}.key-btn.listening{background:var(--primary);border-color:var(--primary-d);color:#fff;animation:kpulse 1s ease-in-out infinite}.key-btn.listening b{color:#fff}@keyframes kpulse{0%,to{opacity:1}50%{opacity:.6}}.editing{outline:2px dashed var(--primary);outline-offset:2px}.dragging{will-change:transform}.layout-hint{position:fixed;top:max(10px,env(safe-area-inset-top));left:50%;transform:translate(-50%);display:flex;align-items:center;gap:12px;z-index:45;pointer-events:auto;max-width:min(92vw,460px);background:#121821f0;border:1px solid var(--primary);border-radius:999px;padding:7px 8px 7px 16px;box-shadow:0 4px 18px #0000008c}.layout-hint .lh-text{font-size:12px;color:var(--text);white-space:nowrap}.layout-hint .lh-text b{color:var(--primary)}.lh-done{flex:0 0 auto;padding:6px 14px;font-size:13px;font-weight:700;color:#fff;background:var(--primary);border:1px solid var(--primary-d);border-radius:999px;cursor:pointer}.lh-done:active{transform:scale(.96)}.name-row{margin:0 0 8px}.name-input{width:100%;padding:13px 14px;font-size:15px;border-radius:10px;border:1px solid #2c3744;background:#0f141b;color:var(--text);outline:none;text-align:center}.name-input:focus{border-color:var(--primary)}.mode-title-sm{margin:4px 0 12px;font-size:15px;color:var(--muted);font-weight:600}.rooms-title{margin:18px 0 8px;font-size:15px;color:var(--muted);font-weight:600;text-align:left}.room-list{display:flex;flex-direction:column;gap:10px;max-height:42vh;overflow-y:auto;margin-bottom:6px}.room-list .empty{color:var(--muted);font-size:13px;padding:20px 0;text-align:center}.room-card{display:flex;align-items:center;justify-content:space-between;gap:10px;padding:12px 14px;background:#141b24;border:1px solid #2a3543;border-radius:12px;text-align:left}.room-card .rc-main{min-width:0;flex:1}.room-card .rc-name{font-size:15px;font-weight:700;color:var(--text);display:flex;align-items:center;gap:8px}.room-card .rc-sub{font-size:12px;color:var(--muted);margin-top:4px;overflow:hidden;text-overflow:ellipsis;white-space:nowrap}.room-card .rc-opt{font-size:12px;color:var(--primary);margin-top:3px;font-weight:600}.room-card .mode-badge{font-size:11px;font-weight:700;padding:2px 8px;border-radius:999px;background:#4caf502e;color:var(--primary);border:1px solid rgba(76,175,80,.4)}.room-card .mode-badge.versus{background:#e539352e;color:#ff6b6b;border-color:#e5393566}.room-card .join-btn{flex:0 0 auto;padding:9px 16px;font-size:14px;font-weight:700;color:#fff;background:var(--primary);border:1px solid var(--primary-d);border-radius:10px;cursor:pointer}.room-card .join-btn:active{transform:scale(.96)}.room-card .join-btn:disabled{opacity:.5;cursor:default}.kills-badge{font-size:11px;color:#ffb74d;background:#2a2015;border-radius:6px;padding:1px 6px;margin:0 4px;white-space:nowrap}.adv-config{margin:10px 0;border:1px solid #26303c;border-radius:10px;background:#10161d;padding:6px 10px;text-align:left}.adv-config summary{cursor:pointer;font-size:14px;color:var(--muted);padding:6px 2px;-webkit-user-select:none;user-select:none}.adv-config[open] summary{color:#e3f2fd}.adv-grid{display:grid;grid-template-columns:1fr 1fr;gap:8px;margin:8px 0}.adv-grid label{display:flex;flex-direction:column;font-size:12px;color:var(--muted);gap:3px}.adv-grid label small{font-size:10px;color:#5b6b7c}.adv-grid input{width:100%;box-sizing:border-box;background:#182028;border:1px solid #2b3947;border-radius:8px;color:#eee;padding:6px 8px;font-size:14px}.killfeed{position:absolute;top:52px;left:50%;transform:translate(-50%);display:flex;flex-direction:column;align-items:center;gap:3px;pointer-events:none;z-index:30}.kf-line{font-size:13px;color:#eee;background:#0a0e13b8;border:1px solid #26303c;border-radius:8px;padding:3px 10px;animation:kfIn .18s ease-out}.kf-line b{color:#ffb74d}@keyframes kfIn{0%{opacity:0;transform:translateY(-6px)}to{opacity:1;transform:none}}.hitflash{position:absolute;top:0;right:0;bottom:0;left:0;pointer-events:none;z-index:25;opacity:0;transition:opacity .22s ease-out;background:radial-gradient(ellipse at center,transparent 55%,rgba(229,57,53,.55) 100%)}.hitflash.on{opacity:1;transition:none}.center-notify{position:absolute;top:34%;left:50%;transform:translate(-50%,-50%) scale(.9);pointer-events:none;z-index:30;font-size:26px;font-weight:700;opacity:0;transition:opacity .25s,transform .25s;text-shadow:0 2px 8px rgba(0,0,0,.7)}.center-notify.show{opacity:1;transform:translate(-50%,-50%) scale(1)}.center-notify.kill{color:#ffd54f}.center-notify.death{color:#ef9a9a}.hp-num{font-size:11px;font-weight:700;min-width:24px;text-align:right;color:#cfd8dc;text-shadow:0 1px 2px #000;font-variant-numeric:tabular-nums}.talent-panel{position:fixed;left:50%;top:50%;transform:translate(-50%,-50%);background:#0d1218f5;border:1px solid #2b3947;border-radius:14px;padding:14px 18px;width:min(92vw,400px);pointer-events:auto;z-index:40;max-height:calc(100vh - 20px);max-height:calc(100dvh - 20px);overflow-y:auto;-webkit-overflow-scrolling:touch;box-shadow:0 10px 40px #00000080}.tp-head{font-size:15px;font-weight:700;color:#e3f2fd;display:flex;justify-content:space-between;align-items:center;margin-bottom:8px}.tp-head span{font-size:13px;color:#ffd54f;font-weight:600}.tp-rows{display:flex;flex-direction:column;gap:6px}.tp-row{display:grid;grid-template-columns:64px 1fr 30px 22px 30px 42px;align-items:center;gap:4px}.tp-name{font-size:13px;color:#eee;white-space:nowrap}.tp-desc{font-size:10px;color:#5b6b7c;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}.tp-lv{text-align:center;font-size:15px;color:#ffd54f}.tp-btn{width:30px;height:30px;border-radius:8px;border:1px solid #2b3947;background:#182028;color:#eee;font-size:16px;line-height:1;cursor:pointer;touch-action:manipulation}.tp-btn:disabled{opacity:.3}.tp-cost{font-size:10px;color:#5b6b7c;text-align:right}.tp-tip{display:block;margin-top:8px;font-size:10px;color:#5b6b7c;text-align:center}.tp-close{display:block;width:100%;margin-top:10px;padding:9px 0;font-size:15px;font-weight:700;color:#0d1218;background:#4caf50;border:none;border-radius:9px;cursor:pointer}.tp-close:hover{background:#5fc463}.result-board{margin:10px auto 14px;width:min(88vw,340px);background:#0d1218eb;border:1px solid #26303c;border-radius:12px;padding:8px 12px;display:flex;flex-direction:column;gap:4px}.rb-row{display:flex;align-items:center;gap:8px;font-size:14px;color:#eee;padding:4px 2px;border-radius:8px}.rb-row.me{background:#ffd54f1a}.rb-rank{width:18px;text-align:center;font-weight:700;color:#5b6b7c}.rb-row:first-child .rb-rank{color:#ffd54f}.rb-name{flex:1;text-align:left;overflow:hidden;text-overflow:ellipsis;white-space:nowrap}.rb-stat{font-size:13px;color:#ffb74d;white-space:nowrap;min-width:44px;text-align:right}.rb-stat:last-child{color:#ef9a9a}@media (max-height: 460px){.panel{padding:14px 16px;border-radius:14px}.panel h1{font-size:24px;margin-bottom:2px}.panel h2{font-size:18px;margin-bottom:8px}.sub{font-size:11px;margin-bottom:12px}.tip{margin-top:10px;font-size:11px}.big-btn{padding:10px;font-size:14px;margin:7px 0;border-radius:10px}.mode-btn{padding:10px 14px;margin:7px 0}.mode-ico{font-size:20px}.mode-title{font-size:15px;margin-top:2px}.mode-desc{font-size:11px}.lives-row{margin:8px 2px 2px}.step-btn{width:32px;height:32px;font-size:19px}.opt-row{margin:8px 2px 2px;padding:7px 10px}.name-input{padding:10px 12px;font-size:14px}.rooms-title{margin:12px 0 6px}.room-list{max-height:34vh}.room-card{padding:9px 12px}.settings-panel{padding:14px;gap:8px;max-height:94vh}.settings-panel h3{font-size:16px}.set-section{padding:10px;gap:8px}.talent-panel{padding:10px 12px}.tp-head{margin-bottom:5px;font-size:14px}.tp-rows{gap:4px}.tp-row{grid-template-columns:58px 1fr 28px 20px 28px 36px}.tp-name{font-size:12px}.tp-btn{width:28px;height:28px;font-size:15px}.tp-tip{margin-top:5px}.tp-close{margin-top:7px;padding:8px 0;font-size:14px}.result{gap:10px;padding:12px}.result h2{font-size:22px}.result-board{margin:6px auto 8px;padding:6px 10px}.rb-row{font-size:13px;padding:2px}}
/*$vite$:1*/`,document.head.appendChild(ua);/**
 * @license
 * Copyright 2010-2023 Three.js Authors
 * SPDX-License-Identifier: MIT
 */const $s="160",sc=0,da=1,rc=2,ha=1,fa=2,tn=3,xn=0,Rt=1,nn=2,vn=0,ei=1,pa=2,ma=3,ga=4,ac=5,Nn=100,oc=101,lc=102,_a=103,xa=104,cc=200,uc=201,dc=202,hc=203,Ks=204,Zs=205,fc=206,pc=207,mc=208,gc=209,_c=210,xc=211,vc=212,Mc=213,Sc=214,yc=0,Ec=1,bc=2,Zi=3,Tc=4,wc=5,Ac=6,Rc=7,va=0,Cc=1,Lc=2,Mn=0,Pc=1,Dc=2,Uc=3,Ic=4,Nc=5,Fc=6,Ma=300,ti=301,ni=302,Js=303,Qs=304,Ji=306,Qi=1e3,Bt=1001,er=1002,St=1003,Sa=1004,tr=1005,kt=1006,Oc=1007,Ii=1008,Sn=1009,zc=1010,Bc=1011,nr=1012,ya=1013,yn=1014,En=1015,Ni=1016,Ea=1017,ba=1018,Fn=1020,kc=1021,qt=1023,Hc=1024,Gc=1025,On=1026,ii=1027,Vc=1028,Ta=1029,Wc=1030,wa=1031,Aa=1033,ir=33776,sr=33777,rr=33778,ar=33779,Ra=35840,Ca=35841,La=35842,Pa=35843,Da=36196,Ua=37492,Ia=37496,Na=37808,Fa=37809,Oa=37810,za=37811,Ba=37812,ka=37813,Ha=37814,Ga=37815,Va=37816,Wa=37817,Xa=37818,qa=37819,ja=37820,Ya=37821,or=36492,$a=36494,Ka=36495,Xc=36283,Za=36284,Ja=36285,Qa=36286,eo=3e3,zn=3001,qc=3200,jc=3201,to=0,Yc=1,Ht="",dt="srgb",sn="srgb-linear",lr="display-p3",es="display-p3-linear",ts="linear",Qe="srgb",ns="rec709",is="p3",si=7680,no=519,$c=512,Kc=513,Zc=514,io=515,Jc=516,Qc=517,eu=518,tu=519,so=35044,ro="300 es",cr=1035,rn=2e3,ss=2001;class ri{addEventListener(e,t){this._listeners===void 0&&(this._listeners={});const n=this._listeners;n[e]===void 0&&(n[e]=[]),n[e].indexOf(t)===-1&&n[e].push(t)}hasEventListener(e,t){if(this._listeners===void 0)return!1;const n=this._listeners;return n[e]!==void 0&&n[e].indexOf(t)!==-1}removeEventListener(e,t){if(this._listeners===void 0)return;const s=this._listeners[e];if(s!==void 0){const r=s.indexOf(t);r!==-1&&s.splice(r,1)}}dispatchEvent(e){if(this._listeners===void 0)return;const n=this._listeners[e.type];if(n!==void 0){e.target=this;const s=n.slice(0);for(let r=0,o=s.length;r<o;r++)s[r].call(this,e);e.target=null}}}const xt=["00","01","02","03","04","05","06","07","08","09","0a","0b","0c","0d","0e","0f","10","11","12","13","14","15","16","17","18","19","1a","1b","1c","1d","1e","1f","20","21","22","23","24","25","26","27","28","29","2a","2b","2c","2d","2e","2f","30","31","32","33","34","35","36","37","38","39","3a","3b","3c","3d","3e","3f","40","41","42","43","44","45","46","47","48","49","4a","4b","4c","4d","4e","4f","50","51","52","53","54","55","56","57","58","59","5a","5b","5c","5d","5e","5f","60","61","62","63","64","65","66","67","68","69","6a","6b","6c","6d","6e","6f","70","71","72","73","74","75","76","77","78","79","7a","7b","7c","7d","7e","7f","80","81","82","83","84","85","86","87","88","89","8a","8b","8c","8d","8e","8f","90","91","92","93","94","95","96","97","98","99","9a","9b","9c","9d","9e","9f","a0","a1","a2","a3","a4","a5","a6","a7","a8","a9","aa","ab","ac","ad","ae","af","b0","b1","b2","b3","b4","b5","b6","b7","b8","b9","ba","bb","bc","bd","be","bf","c0","c1","c2","c3","c4","c5","c6","c7","c8","c9","ca","cb","cc","cd","ce","cf","d0","d1","d2","d3","d4","d5","d6","d7","d8","d9","da","db","dc","dd","de","df","e0","e1","e2","e3","e4","e5","e6","e7","e8","e9","ea","eb","ec","ed","ee","ef","f0","f1","f2","f3","f4","f5","f6","f7","f8","f9","fa","fb","fc","fd","fe","ff"],ur=Math.PI/180,dr=180/Math.PI;function Fi(){const i=Math.random()*4294967295|0,e=Math.random()*4294967295|0,t=Math.random()*4294967295|0,n=Math.random()*4294967295|0;return(xt[i&255]+xt[i>>8&255]+xt[i>>16&255]+xt[i>>24&255]+"-"+xt[e&255]+xt[e>>8&255]+"-"+xt[e>>16&15|64]+xt[e>>24&255]+"-"+xt[t&63|128]+xt[t>>8&255]+"-"+xt[t>>16&255]+xt[t>>24&255]+xt[n&255]+xt[n>>8&255]+xt[n>>16&255]+xt[n>>24&255]).toLowerCase()}function Ct(i,e,t){return Math.max(e,Math.min(t,i))}function nu(i,e){return(i%e+e)%e}function hr(i,e,t){return(1-t)*i+t*e}function ao(i){return(i&i-1)===0&&i!==0}function fr(i){return Math.pow(2,Math.floor(Math.log(i)/Math.LN2))}function Oi(i,e){switch(e.constructor){case Float32Array:return i;case Uint32Array:return i/4294967295;case Uint16Array:return i/65535;case Uint8Array:return i/255;case Int32Array:return Math.max(i/2147483647,-1);case Int16Array:return Math.max(i/32767,-1);case Int8Array:return Math.max(i/127,-1);default:throw new Error("Invalid component type.")}}function Lt(i,e){switch(e.constructor){case Float32Array:return i;case Uint32Array:return Math.round(i*4294967295);case Uint16Array:return Math.round(i*65535);case Uint8Array:return Math.round(i*255);case Int32Array:return Math.round(i*2147483647);case Int16Array:return Math.round(i*32767);case Int8Array:return Math.round(i*127);default:throw new Error("Invalid component type.")}}class qe{constructor(e=0,t=0){qe.prototype.isVector2=!0,this.x=e,this.y=t}get width(){return this.x}set width(e){this.x=e}get height(){return this.y}set height(e){this.y=e}set(e,t){return this.x=e,this.y=t,this}setScalar(e){return this.x=e,this.y=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;default:throw new Error("index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;default:throw new Error("index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y)}copy(e){return this.x=e.x,this.y=e.y,this}add(e){return this.x+=e.x,this.y+=e.y,this}addScalar(e){return this.x+=e,this.y+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this}subScalar(e){return this.x-=e,this.y-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this}multiply(e){return this.x*=e.x,this.y*=e.y,this}multiplyScalar(e){return this.x*=e,this.y*=e,this}divide(e){return this.x/=e.x,this.y/=e.y,this}divideScalar(e){return this.multiplyScalar(1/e)}applyMatrix3(e){const t=this.x,n=this.y,s=e.elements;return this.x=s[0]*t+s[3]*n+s[6],this.y=s[1]*t+s[4]*n+s[7],this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this}clamp(e,t){return this.x=Math.max(e.x,Math.min(t.x,this.x)),this.y=Math.max(e.y,Math.min(t.y,this.y)),this}clampScalar(e,t){return this.x=Math.max(e,Math.min(t,this.x)),this.y=Math.max(e,Math.min(t,this.y)),this}clampLength(e,t){const n=this.length();return this.divideScalar(n||1).multiplyScalar(Math.max(e,Math.min(t,n)))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this}negate(){return this.x=-this.x,this.y=-this.y,this}dot(e){return this.x*e.x+this.y*e.y}cross(e){return this.x*e.y-this.y*e.x}lengthSq(){return this.x*this.x+this.y*this.y}length(){return Math.sqrt(this.x*this.x+this.y*this.y)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)}normalize(){return this.divideScalar(this.length()||1)}angle(){return Math.atan2(-this.y,-this.x)+Math.PI}angleTo(e){const t=Math.sqrt(this.lengthSq()*e.lengthSq());if(t===0)return Math.PI/2;const n=this.dot(e)/t;return Math.acos(Ct(n,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){const t=this.x-e.x,n=this.y-e.y;return t*t+n*n}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this}lerpVectors(e,t,n){return this.x=e.x+(t.x-e.x)*n,this.y=e.y+(t.y-e.y)*n,this}equals(e){return e.x===this.x&&e.y===this.y}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this}rotateAround(e,t){const n=Math.cos(t),s=Math.sin(t),r=this.x-e.x,o=this.y-e.y;return this.x=r*n-o*s+e.x,this.y=r*s+o*n+e.y,this}random(){return this.x=Math.random(),this.y=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y}}class ke{constructor(e,t,n,s,r,o,a,l,c){ke.prototype.isMatrix3=!0,this.elements=[1,0,0,0,1,0,0,0,1],e!==void 0&&this.set(e,t,n,s,r,o,a,l,c)}set(e,t,n,s,r,o,a,l,c){const d=this.elements;return d[0]=e,d[1]=s,d[2]=a,d[3]=t,d[4]=r,d[5]=l,d[6]=n,d[7]=o,d[8]=c,this}identity(){return this.set(1,0,0,0,1,0,0,0,1),this}copy(e){const t=this.elements,n=e.elements;return t[0]=n[0],t[1]=n[1],t[2]=n[2],t[3]=n[3],t[4]=n[4],t[5]=n[5],t[6]=n[6],t[7]=n[7],t[8]=n[8],this}extractBasis(e,t,n){return e.setFromMatrix3Column(this,0),t.setFromMatrix3Column(this,1),n.setFromMatrix3Column(this,2),this}setFromMatrix4(e){const t=e.elements;return this.set(t[0],t[4],t[8],t[1],t[5],t[9],t[2],t[6],t[10]),this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,t){const n=e.elements,s=t.elements,r=this.elements,o=n[0],a=n[3],l=n[6],c=n[1],d=n[4],p=n[7],f=n[2],m=n[5],g=n[8],_=s[0],h=s[3],u=s[6],y=s[1],x=s[4],T=s[7],L=s[2],w=s[5],A=s[8];return r[0]=o*_+a*y+l*L,r[3]=o*h+a*x+l*w,r[6]=o*u+a*T+l*A,r[1]=c*_+d*y+p*L,r[4]=c*h+d*x+p*w,r[7]=c*u+d*T+p*A,r[2]=f*_+m*y+g*L,r[5]=f*h+m*x+g*w,r[8]=f*u+m*T+g*A,this}multiplyScalar(e){const t=this.elements;return t[0]*=e,t[3]*=e,t[6]*=e,t[1]*=e,t[4]*=e,t[7]*=e,t[2]*=e,t[5]*=e,t[8]*=e,this}determinant(){const e=this.elements,t=e[0],n=e[1],s=e[2],r=e[3],o=e[4],a=e[5],l=e[6],c=e[7],d=e[8];return t*o*d-t*a*c-n*r*d+n*a*l+s*r*c-s*o*l}invert(){const e=this.elements,t=e[0],n=e[1],s=e[2],r=e[3],o=e[4],a=e[5],l=e[6],c=e[7],d=e[8],p=d*o-a*c,f=a*l-d*r,m=c*r-o*l,g=t*p+n*f+s*m;if(g===0)return this.set(0,0,0,0,0,0,0,0,0);const _=1/g;return e[0]=p*_,e[1]=(s*c-d*n)*_,e[2]=(a*n-s*o)*_,e[3]=f*_,e[4]=(d*t-s*l)*_,e[5]=(s*r-a*t)*_,e[6]=m*_,e[7]=(n*l-c*t)*_,e[8]=(o*t-n*r)*_,this}transpose(){let e;const t=this.elements;return e=t[1],t[1]=t[3],t[3]=e,e=t[2],t[2]=t[6],t[6]=e,e=t[5],t[5]=t[7],t[7]=e,this}getNormalMatrix(e){return this.setFromMatrix4(e).invert().transpose()}transposeIntoArray(e){const t=this.elements;return e[0]=t[0],e[1]=t[3],e[2]=t[6],e[3]=t[1],e[4]=t[4],e[5]=t[7],e[6]=t[2],e[7]=t[5],e[8]=t[8],this}setUvTransform(e,t,n,s,r,o,a){const l=Math.cos(r),c=Math.sin(r);return this.set(n*l,n*c,-n*(l*o+c*a)+o+e,-s*c,s*l,-s*(-c*o+l*a)+a+t,0,0,1),this}scale(e,t){return this.premultiply(pr.makeScale(e,t)),this}rotate(e){return this.premultiply(pr.makeRotation(-e)),this}translate(e,t){return this.premultiply(pr.makeTranslation(e,t)),this}makeTranslation(e,t){return e.isVector2?this.set(1,0,e.x,0,1,e.y,0,0,1):this.set(1,0,e,0,1,t,0,0,1),this}makeRotation(e){const t=Math.cos(e),n=Math.sin(e);return this.set(t,-n,0,n,t,0,0,0,1),this}makeScale(e,t){return this.set(e,0,0,0,t,0,0,0,1),this}equals(e){const t=this.elements,n=e.elements;for(let s=0;s<9;s++)if(t[s]!==n[s])return!1;return!0}fromArray(e,t=0){for(let n=0;n<9;n++)this.elements[n]=e[n+t];return this}toArray(e=[],t=0){const n=this.elements;return e[t]=n[0],e[t+1]=n[1],e[t+2]=n[2],e[t+3]=n[3],e[t+4]=n[4],e[t+5]=n[5],e[t+6]=n[6],e[t+7]=n[7],e[t+8]=n[8],e}clone(){return new this.constructor().fromArray(this.elements)}}const pr=new ke;function oo(i){for(let e=i.length-1;e>=0;--e)if(i[e]>=65535)return!0;return!1}function zi(i){return document.createElementNS("http://www.w3.org/1999/xhtml",i)}function iu(){const i=zi("canvas");return i.style.display="block",i}const lo={};function Bi(i){i in lo||(lo[i]=!0,console.warn(i))}const co=new ke().set(.8224621,.177538,0,.0331941,.9668058,0,.0170827,.0723974,.9105199),uo=new ke().set(1.2249401,-.2249404,0,-.0420569,1.0420571,0,-.0196376,-.0786361,1.0982735),rs={[sn]:{transfer:ts,primaries:ns,toReference:i=>i,fromReference:i=>i},[dt]:{transfer:Qe,primaries:ns,toReference:i=>i.convertSRGBToLinear(),fromReference:i=>i.convertLinearToSRGB()},[es]:{transfer:ts,primaries:is,toReference:i=>i.applyMatrix3(uo),fromReference:i=>i.applyMatrix3(co)},[lr]:{transfer:Qe,primaries:is,toReference:i=>i.convertSRGBToLinear().applyMatrix3(uo),fromReference:i=>i.applyMatrix3(co).convertLinearToSRGB()}},su=new Set([sn,es]),Ye={enabled:!0,_workingColorSpace:sn,get workingColorSpace(){return this._workingColorSpace},set workingColorSpace(i){if(!su.has(i))throw new Error(`Unsupported working color space, "${i}".`);this._workingColorSpace=i},convert:function(i,e,t){if(this.enabled===!1||e===t||!e||!t)return i;const n=rs[e].toReference,s=rs[t].fromReference;return s(n(i))},fromWorkingColorSpace:function(i,e){return this.convert(i,this._workingColorSpace,e)},toWorkingColorSpace:function(i,e){return this.convert(i,e,this._workingColorSpace)},getPrimaries:function(i){return rs[i].primaries},getTransfer:function(i){return i===Ht?ts:rs[i].transfer}};function ai(i){return i<.04045?i*.0773993808:Math.pow(i*.9478672986+.0521327014,2.4)}function mr(i){return i<.0031308?i*12.92:1.055*Math.pow(i,.41666)-.055}let oi;class ho{static getDataURL(e){if(/^data:/i.test(e.src)||typeof HTMLCanvasElement>"u")return e.src;let t;if(e instanceof HTMLCanvasElement)t=e;else{oi===void 0&&(oi=zi("canvas")),oi.width=e.width,oi.height=e.height;const n=oi.getContext("2d");e instanceof ImageData?n.putImageData(e,0,0):n.drawImage(e,0,0,e.width,e.height),t=oi}return t.width>2048||t.height>2048?(console.warn("THREE.ImageUtils.getDataURL: Image converted to jpg for performance reasons",e),t.toDataURL("image/jpeg",.6)):t.toDataURL("image/png")}static sRGBToLinear(e){if(typeof HTMLImageElement<"u"&&e instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&e instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&e instanceof ImageBitmap){const t=zi("canvas");t.width=e.width,t.height=e.height;const n=t.getContext("2d");n.drawImage(e,0,0,e.width,e.height);const s=n.getImageData(0,0,e.width,e.height),r=s.data;for(let o=0;o<r.length;o++)r[o]=ai(r[o]/255)*255;return n.putImageData(s,0,0),t}else if(e.data){const t=e.data.slice(0);for(let n=0;n<t.length;n++)t instanceof Uint8Array||t instanceof Uint8ClampedArray?t[n]=Math.floor(ai(t[n]/255)*255):t[n]=ai(t[n]);return{data:t,width:e.width,height:e.height}}else return console.warn("THREE.ImageUtils.sRGBToLinear(): Unsupported image type. No color space conversion applied."),e}}let ru=0;class fo{constructor(e=null){this.isSource=!0,Object.defineProperty(this,"id",{value:ru++}),this.uuid=Fi(),this.data=e,this.version=0}set needsUpdate(e){e===!0&&this.version++}toJSON(e){const t=e===void 0||typeof e=="string";if(!t&&e.images[this.uuid]!==void 0)return e.images[this.uuid];const n={uuid:this.uuid,url:""},s=this.data;if(s!==null){let r;if(Array.isArray(s)){r=[];for(let o=0,a=s.length;o<a;o++)s[o].isDataTexture?r.push(gr(s[o].image)):r.push(gr(s[o]))}else r=gr(s);n.url=r}return t||(e.images[this.uuid]=n),n}}function gr(i){return typeof HTMLImageElement<"u"&&i instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&i instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&i instanceof ImageBitmap?ho.getDataURL(i):i.data?{data:Array.from(i.data),width:i.width,height:i.height,type:i.data.constructor.name}:(console.warn("THREE.Texture: Unable to serialize Texture."),{})}let au=0;class yt extends ri{constructor(e=yt.DEFAULT_IMAGE,t=yt.DEFAULT_MAPPING,n=Bt,s=Bt,r=kt,o=Ii,a=qt,l=Sn,c=yt.DEFAULT_ANISOTROPY,d=Ht){super(),this.isTexture=!0,Object.defineProperty(this,"id",{value:au++}),this.uuid=Fi(),this.name="",this.source=new fo(e),this.mipmaps=[],this.mapping=t,this.channel=0,this.wrapS=n,this.wrapT=s,this.magFilter=r,this.minFilter=o,this.anisotropy=c,this.format=a,this.internalFormat=null,this.type=l,this.offset=new qe(0,0),this.repeat=new qe(1,1),this.center=new qe(0,0),this.rotation=0,this.matrixAutoUpdate=!0,this.matrix=new ke,this.generateMipmaps=!0,this.premultiplyAlpha=!1,this.flipY=!0,this.unpackAlignment=4,typeof d=="string"?this.colorSpace=d:(Bi("THREE.Texture: Property .encoding has been replaced by .colorSpace."),this.colorSpace=d===zn?dt:Ht),this.userData={},this.version=0,this.onUpdate=null,this.isRenderTargetTexture=!1,this.needsPMREMUpdate=!1}get image(){return this.source.data}set image(e=null){this.source.data=e}updateMatrix(){this.matrix.setUvTransform(this.offset.x,this.offset.y,this.repeat.x,this.repeat.y,this.rotation,this.center.x,this.center.y)}clone(){return new this.constructor().copy(this)}copy(e){return this.name=e.name,this.source=e.source,this.mipmaps=e.mipmaps.slice(0),this.mapping=e.mapping,this.channel=e.channel,this.wrapS=e.wrapS,this.wrapT=e.wrapT,this.magFilter=e.magFilter,this.minFilter=e.minFilter,this.anisotropy=e.anisotropy,this.format=e.format,this.internalFormat=e.internalFormat,this.type=e.type,this.offset.copy(e.offset),this.repeat.copy(e.repeat),this.center.copy(e.center),this.rotation=e.rotation,this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrix.copy(e.matrix),this.generateMipmaps=e.generateMipmaps,this.premultiplyAlpha=e.premultiplyAlpha,this.flipY=e.flipY,this.unpackAlignment=e.unpackAlignment,this.colorSpace=e.colorSpace,this.userData=JSON.parse(JSON.stringify(e.userData)),this.needsUpdate=!0,this}toJSON(e){const t=e===void 0||typeof e=="string";if(!t&&e.textures[this.uuid]!==void 0)return e.textures[this.uuid];const n={metadata:{version:4.6,type:"Texture",generator:"Texture.toJSON"},uuid:this.uuid,name:this.name,image:this.source.toJSON(e).uuid,mapping:this.mapping,channel:this.channel,repeat:[this.repeat.x,this.repeat.y],offset:[this.offset.x,this.offset.y],center:[this.center.x,this.center.y],rotation:this.rotation,wrap:[this.wrapS,this.wrapT],format:this.format,internalFormat:this.internalFormat,type:this.type,colorSpace:this.colorSpace,minFilter:this.minFilter,magFilter:this.magFilter,anisotropy:this.anisotropy,flipY:this.flipY,generateMipmaps:this.generateMipmaps,premultiplyAlpha:this.premultiplyAlpha,unpackAlignment:this.unpackAlignment};return Object.keys(this.userData).length>0&&(n.userData=this.userData),t||(e.textures[this.uuid]=n),n}dispose(){this.dispatchEvent({type:"dispose"})}transformUv(e){if(this.mapping!==Ma)return e;if(e.applyMatrix3(this.matrix),e.x<0||e.x>1)switch(this.wrapS){case Qi:e.x=e.x-Math.floor(e.x);break;case Bt:e.x=e.x<0?0:1;break;case er:Math.abs(Math.floor(e.x)%2)===1?e.x=Math.ceil(e.x)-e.x:e.x=e.x-Math.floor(e.x);break}if(e.y<0||e.y>1)switch(this.wrapT){case Qi:e.y=e.y-Math.floor(e.y);break;case Bt:e.y=e.y<0?0:1;break;case er:Math.abs(Math.floor(e.y)%2)===1?e.y=Math.ceil(e.y)-e.y:e.y=e.y-Math.floor(e.y);break}return this.flipY&&(e.y=1-e.y),e}set needsUpdate(e){e===!0&&(this.version++,this.source.needsUpdate=!0)}get encoding(){return Bi("THREE.Texture: Property .encoding has been replaced by .colorSpace."),this.colorSpace===dt?zn:eo}set encoding(e){Bi("THREE.Texture: Property .encoding has been replaced by .colorSpace."),this.colorSpace=e===zn?dt:Ht}}yt.DEFAULT_IMAGE=null,yt.DEFAULT_MAPPING=Ma,yt.DEFAULT_ANISOTROPY=1;class ht{constructor(e=0,t=0,n=0,s=1){ht.prototype.isVector4=!0,this.x=e,this.y=t,this.z=n,this.w=s}get width(){return this.z}set width(e){this.z=e}get height(){return this.w}set height(e){this.w=e}set(e,t,n,s){return this.x=e,this.y=t,this.z=n,this.w=s,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this.w=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setW(e){return this.w=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;case 2:this.z=t;break;case 3:this.w=t;break;default:throw new Error("index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;case 3:return this.w;default:throw new Error("index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y,this.z,this.w)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this.w=e.w!==void 0?e.w:1,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this.w+=e.w,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this.w+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this.z=e.z+t.z,this.w=e.w+t.w,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this.z+=e.z*t,this.w+=e.w*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this.w-=e.w,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this.w-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this.z=e.z-t.z,this.w=e.w-t.w,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this.w*=e.w,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this.w*=e,this}applyMatrix4(e){const t=this.x,n=this.y,s=this.z,r=this.w,o=e.elements;return this.x=o[0]*t+o[4]*n+o[8]*s+o[12]*r,this.y=o[1]*t+o[5]*n+o[9]*s+o[13]*r,this.z=o[2]*t+o[6]*n+o[10]*s+o[14]*r,this.w=o[3]*t+o[7]*n+o[11]*s+o[15]*r,this}divideScalar(e){return this.multiplyScalar(1/e)}setAxisAngleFromQuaternion(e){this.w=2*Math.acos(e.w);const t=Math.sqrt(1-e.w*e.w);return t<1e-4?(this.x=1,this.y=0,this.z=0):(this.x=e.x/t,this.y=e.y/t,this.z=e.z/t),this}setAxisAngleFromRotationMatrix(e){let t,n,s,r;const l=e.elements,c=l[0],d=l[4],p=l[8],f=l[1],m=l[5],g=l[9],_=l[2],h=l[6],u=l[10];if(Math.abs(d-f)<.01&&Math.abs(p-_)<.01&&Math.abs(g-h)<.01){if(Math.abs(d+f)<.1&&Math.abs(p+_)<.1&&Math.abs(g+h)<.1&&Math.abs(c+m+u-3)<.1)return this.set(1,0,0,0),this;t=Math.PI;const x=(c+1)/2,T=(m+1)/2,L=(u+1)/2,w=(d+f)/4,A=(p+_)/4,X=(g+h)/4;return x>T&&x>L?x<.01?(n=0,s=.707106781,r=.707106781):(n=Math.sqrt(x),s=w/n,r=A/n):T>L?T<.01?(n=.707106781,s=0,r=.707106781):(s=Math.sqrt(T),n=w/s,r=X/s):L<.01?(n=.707106781,s=.707106781,r=0):(r=Math.sqrt(L),n=A/r,s=X/r),this.set(n,s,r,t),this}let y=Math.sqrt((h-g)*(h-g)+(p-_)*(p-_)+(f-d)*(f-d));return Math.abs(y)<.001&&(y=1),this.x=(h-g)/y,this.y=(p-_)/y,this.z=(f-d)/y,this.w=Math.acos((c+m+u-1)/2),this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this.w=Math.min(this.w,e.w),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this.w=Math.max(this.w,e.w),this}clamp(e,t){return this.x=Math.max(e.x,Math.min(t.x,this.x)),this.y=Math.max(e.y,Math.min(t.y,this.y)),this.z=Math.max(e.z,Math.min(t.z,this.z)),this.w=Math.max(e.w,Math.min(t.w,this.w)),this}clampScalar(e,t){return this.x=Math.max(e,Math.min(t,this.x)),this.y=Math.max(e,Math.min(t,this.y)),this.z=Math.max(e,Math.min(t,this.z)),this.w=Math.max(e,Math.min(t,this.w)),this}clampLength(e,t){const n=this.length();return this.divideScalar(n||1).multiplyScalar(Math.max(e,Math.min(t,n)))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this.w=Math.floor(this.w),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this.w=Math.ceil(this.w),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this.w=Math.round(this.w),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this.w=Math.trunc(this.w),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this.w=-this.w,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z+this.w*e.w}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)+Math.abs(this.w)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this.z+=(e.z-this.z)*t,this.w+=(e.w-this.w)*t,this}lerpVectors(e,t,n){return this.x=e.x+(t.x-e.x)*n,this.y=e.y+(t.y-e.y)*n,this.z=e.z+(t.z-e.z)*n,this.w=e.w+(t.w-e.w)*n,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z&&e.w===this.w}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this.z=e[t+2],this.w=e[t+3],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e[t+2]=this.z,e[t+3]=this.w,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this.z=e.getZ(t),this.w=e.getW(t),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this.w=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z,yield this.w}}class ou extends ri{constructor(e=1,t=1,n={}){super(),this.isRenderTarget=!0,this.width=e,this.height=t,this.depth=1,this.scissor=new ht(0,0,e,t),this.scissorTest=!1,this.viewport=new ht(0,0,e,t);const s={width:e,height:t,depth:1};n.encoding!==void 0&&(Bi("THREE.WebGLRenderTarget: option.encoding has been replaced by option.colorSpace."),n.colorSpace=n.encoding===zn?dt:Ht),n=Object.assign({generateMipmaps:!1,internalFormat:null,minFilter:kt,depthBuffer:!0,stencilBuffer:!1,depthTexture:null,samples:0},n),this.texture=new yt(s,n.mapping,n.wrapS,n.wrapT,n.magFilter,n.minFilter,n.format,n.type,n.anisotropy,n.colorSpace),this.texture.isRenderTargetTexture=!0,this.texture.flipY=!1,this.texture.generateMipmaps=n.generateMipmaps,this.texture.internalFormat=n.internalFormat,this.depthBuffer=n.depthBuffer,this.stencilBuffer=n.stencilBuffer,this.depthTexture=n.depthTexture,this.samples=n.samples}setSize(e,t,n=1){(this.width!==e||this.height!==t||this.depth!==n)&&(this.width=e,this.height=t,this.depth=n,this.texture.image.width=e,this.texture.image.height=t,this.texture.image.depth=n,this.dispose()),this.viewport.set(0,0,e,t),this.scissor.set(0,0,e,t)}clone(){return new this.constructor().copy(this)}copy(e){this.width=e.width,this.height=e.height,this.depth=e.depth,this.scissor.copy(e.scissor),this.scissorTest=e.scissorTest,this.viewport.copy(e.viewport),this.texture=e.texture.clone(),this.texture.isRenderTargetTexture=!0;const t=Object.assign({},e.texture.image);return this.texture.source=new fo(t),this.depthBuffer=e.depthBuffer,this.stencilBuffer=e.stencilBuffer,e.depthTexture!==null&&(this.depthTexture=e.depthTexture.clone()),this.samples=e.samples,this}dispose(){this.dispatchEvent({type:"dispose"})}}class Bn extends ou{constructor(e=1,t=1,n={}){super(e,t,n),this.isWebGLRenderTarget=!0}}class po extends yt{constructor(e=null,t=1,n=1,s=1){super(null),this.isDataArrayTexture=!0,this.image={data:e,width:t,height:n,depth:s},this.magFilter=St,this.minFilter=St,this.wrapR=Bt,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}}class lu extends yt{constructor(e=null,t=1,n=1,s=1){super(null),this.isData3DTexture=!0,this.image={data:e,width:t,height:n,depth:s},this.magFilter=St,this.minFilter=St,this.wrapR=Bt,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}}class ki{constructor(e=0,t=0,n=0,s=1){this.isQuaternion=!0,this._x=e,this._y=t,this._z=n,this._w=s}static slerpFlat(e,t,n,s,r,o,a){let l=n[s+0],c=n[s+1],d=n[s+2],p=n[s+3];const f=r[o+0],m=r[o+1],g=r[o+2],_=r[o+3];if(a===0){e[t+0]=l,e[t+1]=c,e[t+2]=d,e[t+3]=p;return}if(a===1){e[t+0]=f,e[t+1]=m,e[t+2]=g,e[t+3]=_;return}if(p!==_||l!==f||c!==m||d!==g){let h=1-a;const u=l*f+c*m+d*g+p*_,y=u>=0?1:-1,x=1-u*u;if(x>Number.EPSILON){const L=Math.sqrt(x),w=Math.atan2(L,u*y);h=Math.sin(h*w)/L,a=Math.sin(a*w)/L}const T=a*y;if(l=l*h+f*T,c=c*h+m*T,d=d*h+g*T,p=p*h+_*T,h===1-a){const L=1/Math.sqrt(l*l+c*c+d*d+p*p);l*=L,c*=L,d*=L,p*=L}}e[t]=l,e[t+1]=c,e[t+2]=d,e[t+3]=p}static multiplyQuaternionsFlat(e,t,n,s,r,o){const a=n[s],l=n[s+1],c=n[s+2],d=n[s+3],p=r[o],f=r[o+1],m=r[o+2],g=r[o+3];return e[t]=a*g+d*p+l*m-c*f,e[t+1]=l*g+d*f+c*p-a*m,e[t+2]=c*g+d*m+a*f-l*p,e[t+3]=d*g-a*p-l*f-c*m,e}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get w(){return this._w}set w(e){this._w=e,this._onChangeCallback()}set(e,t,n,s){return this._x=e,this._y=t,this._z=n,this._w=s,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._w)}copy(e){return this._x=e.x,this._y=e.y,this._z=e.z,this._w=e.w,this._onChangeCallback(),this}setFromEuler(e,t=!0){const n=e._x,s=e._y,r=e._z,o=e._order,a=Math.cos,l=Math.sin,c=a(n/2),d=a(s/2),p=a(r/2),f=l(n/2),m=l(s/2),g=l(r/2);switch(o){case"XYZ":this._x=f*d*p+c*m*g,this._y=c*m*p-f*d*g,this._z=c*d*g+f*m*p,this._w=c*d*p-f*m*g;break;case"YXZ":this._x=f*d*p+c*m*g,this._y=c*m*p-f*d*g,this._z=c*d*g-f*m*p,this._w=c*d*p+f*m*g;break;case"ZXY":this._x=f*d*p-c*m*g,this._y=c*m*p+f*d*g,this._z=c*d*g+f*m*p,this._w=c*d*p-f*m*g;break;case"ZYX":this._x=f*d*p-c*m*g,this._y=c*m*p+f*d*g,this._z=c*d*g-f*m*p,this._w=c*d*p+f*m*g;break;case"YZX":this._x=f*d*p+c*m*g,this._y=c*m*p+f*d*g,this._z=c*d*g-f*m*p,this._w=c*d*p-f*m*g;break;case"XZY":this._x=f*d*p-c*m*g,this._y=c*m*p-f*d*g,this._z=c*d*g+f*m*p,this._w=c*d*p+f*m*g;break;default:console.warn("THREE.Quaternion: .setFromEuler() encountered an unknown order: "+o)}return t===!0&&this._onChangeCallback(),this}setFromAxisAngle(e,t){const n=t/2,s=Math.sin(n);return this._x=e.x*s,this._y=e.y*s,this._z=e.z*s,this._w=Math.cos(n),this._onChangeCallback(),this}setFromRotationMatrix(e){const t=e.elements,n=t[0],s=t[4],r=t[8],o=t[1],a=t[5],l=t[9],c=t[2],d=t[6],p=t[10],f=n+a+p;if(f>0){const m=.5/Math.sqrt(f+1);this._w=.25/m,this._x=(d-l)*m,this._y=(r-c)*m,this._z=(o-s)*m}else if(n>a&&n>p){const m=2*Math.sqrt(1+n-a-p);this._w=(d-l)/m,this._x=.25*m,this._y=(s+o)/m,this._z=(r+c)/m}else if(a>p){const m=2*Math.sqrt(1+a-n-p);this._w=(r-c)/m,this._x=(s+o)/m,this._y=.25*m,this._z=(l+d)/m}else{const m=2*Math.sqrt(1+p-n-a);this._w=(o-s)/m,this._x=(r+c)/m,this._y=(l+d)/m,this._z=.25*m}return this._onChangeCallback(),this}setFromUnitVectors(e,t){let n=e.dot(t)+1;return n<Number.EPSILON?(n=0,Math.abs(e.x)>Math.abs(e.z)?(this._x=-e.y,this._y=e.x,this._z=0,this._w=n):(this._x=0,this._y=-e.z,this._z=e.y,this._w=n)):(this._x=e.y*t.z-e.z*t.y,this._y=e.z*t.x-e.x*t.z,this._z=e.x*t.y-e.y*t.x,this._w=n),this.normalize()}angleTo(e){return 2*Math.acos(Math.abs(Ct(this.dot(e),-1,1)))}rotateTowards(e,t){const n=this.angleTo(e);if(n===0)return this;const s=Math.min(1,t/n);return this.slerp(e,s),this}identity(){return this.set(0,0,0,1)}invert(){return this.conjugate()}conjugate(){return this._x*=-1,this._y*=-1,this._z*=-1,this._onChangeCallback(),this}dot(e){return this._x*e._x+this._y*e._y+this._z*e._z+this._w*e._w}lengthSq(){return this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w}length(){return Math.sqrt(this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w)}normalize(){let e=this.length();return e===0?(this._x=0,this._y=0,this._z=0,this._w=1):(e=1/e,this._x=this._x*e,this._y=this._y*e,this._z=this._z*e,this._w=this._w*e),this._onChangeCallback(),this}multiply(e){return this.multiplyQuaternions(this,e)}premultiply(e){return this.multiplyQuaternions(e,this)}multiplyQuaternions(e,t){const n=e._x,s=e._y,r=e._z,o=e._w,a=t._x,l=t._y,c=t._z,d=t._w;return this._x=n*d+o*a+s*c-r*l,this._y=s*d+o*l+r*a-n*c,this._z=r*d+o*c+n*l-s*a,this._w=o*d-n*a-s*l-r*c,this._onChangeCallback(),this}slerp(e,t){if(t===0)return this;if(t===1)return this.copy(e);const n=this._x,s=this._y,r=this._z,o=this._w;let a=o*e._w+n*e._x+s*e._y+r*e._z;if(a<0?(this._w=-e._w,this._x=-e._x,this._y=-e._y,this._z=-e._z,a=-a):this.copy(e),a>=1)return this._w=o,this._x=n,this._y=s,this._z=r,this;const l=1-a*a;if(l<=Number.EPSILON){const m=1-t;return this._w=m*o+t*this._w,this._x=m*n+t*this._x,this._y=m*s+t*this._y,this._z=m*r+t*this._z,this.normalize(),this}const c=Math.sqrt(l),d=Math.atan2(c,a),p=Math.sin((1-t)*d)/c,f=Math.sin(t*d)/c;return this._w=o*p+this._w*f,this._x=n*p+this._x*f,this._y=s*p+this._y*f,this._z=r*p+this._z*f,this._onChangeCallback(),this}slerpQuaternions(e,t,n){return this.copy(e).slerp(t,n)}random(){const e=Math.random(),t=Math.sqrt(1-e),n=Math.sqrt(e),s=2*Math.PI*Math.random(),r=2*Math.PI*Math.random();return this.set(t*Math.cos(s),n*Math.sin(r),n*Math.cos(r),t*Math.sin(s))}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._w===this._w}fromArray(e,t=0){return this._x=e[t],this._y=e[t+1],this._z=e[t+2],this._w=e[t+3],this._onChangeCallback(),this}toArray(e=[],t=0){return e[t]=this._x,e[t+1]=this._y,e[t+2]=this._z,e[t+3]=this._w,e}fromBufferAttribute(e,t){return this._x=e.getX(t),this._y=e.getY(t),this._z=e.getZ(t),this._w=e.getW(t),this._onChangeCallback(),this}toJSON(){return this.toArray()}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._w}}class U{constructor(e=0,t=0,n=0){U.prototype.isVector3=!0,this.x=e,this.y=t,this.z=n}set(e,t,n){return n===void 0&&(n=this.z),this.x=e,this.y=t,this.z=n,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;case 2:this.z=t;break;default:throw new Error("index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;default:throw new Error("index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y,this.z)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this.z=e.z+t.z,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this.z+=e.z*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this.z=e.z-t.z,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this}multiplyVectors(e,t){return this.x=e.x*t.x,this.y=e.y*t.y,this.z=e.z*t.z,this}applyEuler(e){return this.applyQuaternion(mo.setFromEuler(e))}applyAxisAngle(e,t){return this.applyQuaternion(mo.setFromAxisAngle(e,t))}applyMatrix3(e){const t=this.x,n=this.y,s=this.z,r=e.elements;return this.x=r[0]*t+r[3]*n+r[6]*s,this.y=r[1]*t+r[4]*n+r[7]*s,this.z=r[2]*t+r[5]*n+r[8]*s,this}applyNormalMatrix(e){return this.applyMatrix3(e).normalize()}applyMatrix4(e){const t=this.x,n=this.y,s=this.z,r=e.elements,o=1/(r[3]*t+r[7]*n+r[11]*s+r[15]);return this.x=(r[0]*t+r[4]*n+r[8]*s+r[12])*o,this.y=(r[1]*t+r[5]*n+r[9]*s+r[13])*o,this.z=(r[2]*t+r[6]*n+r[10]*s+r[14])*o,this}applyQuaternion(e){const t=this.x,n=this.y,s=this.z,r=e.x,o=e.y,a=e.z,l=e.w,c=2*(o*s-a*n),d=2*(a*t-r*s),p=2*(r*n-o*t);return this.x=t+l*c+o*p-a*d,this.y=n+l*d+a*c-r*p,this.z=s+l*p+r*d-o*c,this}project(e){return this.applyMatrix4(e.matrixWorldInverse).applyMatrix4(e.projectionMatrix)}unproject(e){return this.applyMatrix4(e.projectionMatrixInverse).applyMatrix4(e.matrixWorld)}transformDirection(e){const t=this.x,n=this.y,s=this.z,r=e.elements;return this.x=r[0]*t+r[4]*n+r[8]*s,this.y=r[1]*t+r[5]*n+r[9]*s,this.z=r[2]*t+r[6]*n+r[10]*s,this.normalize()}divide(e){return this.x/=e.x,this.y/=e.y,this.z/=e.z,this}divideScalar(e){return this.multiplyScalar(1/e)}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this}clamp(e,t){return this.x=Math.max(e.x,Math.min(t.x,this.x)),this.y=Math.max(e.y,Math.min(t.y,this.y)),this.z=Math.max(e.z,Math.min(t.z,this.z)),this}clampScalar(e,t){return this.x=Math.max(e,Math.min(t,this.x)),this.y=Math.max(e,Math.min(t,this.y)),this.z=Math.max(e,Math.min(t,this.z)),this}clampLength(e,t){const n=this.length();return this.divideScalar(n||1).multiplyScalar(Math.max(e,Math.min(t,n)))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this.z+=(e.z-this.z)*t,this}lerpVectors(e,t,n){return this.x=e.x+(t.x-e.x)*n,this.y=e.y+(t.y-e.y)*n,this.z=e.z+(t.z-e.z)*n,this}cross(e){return this.crossVectors(this,e)}crossVectors(e,t){const n=e.x,s=e.y,r=e.z,o=t.x,a=t.y,l=t.z;return this.x=s*l-r*a,this.y=r*o-n*l,this.z=n*a-s*o,this}projectOnVector(e){const t=e.lengthSq();if(t===0)return this.set(0,0,0);const n=e.dot(this)/t;return this.copy(e).multiplyScalar(n)}projectOnPlane(e){return _r.copy(this).projectOnVector(e),this.sub(_r)}reflect(e){return this.sub(_r.copy(e).multiplyScalar(2*this.dot(e)))}angleTo(e){const t=Math.sqrt(this.lengthSq()*e.lengthSq());if(t===0)return Math.PI/2;const n=this.dot(e)/t;return Math.acos(Ct(n,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){const t=this.x-e.x,n=this.y-e.y,s=this.z-e.z;return t*t+n*n+s*s}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)+Math.abs(this.z-e.z)}setFromSpherical(e){return this.setFromSphericalCoords(e.radius,e.phi,e.theta)}setFromSphericalCoords(e,t,n){const s=Math.sin(t)*e;return this.x=s*Math.sin(n),this.y=Math.cos(t)*e,this.z=s*Math.cos(n),this}setFromCylindrical(e){return this.setFromCylindricalCoords(e.radius,e.theta,e.y)}setFromCylindricalCoords(e,t,n){return this.x=e*Math.sin(t),this.y=n,this.z=e*Math.cos(t),this}setFromMatrixPosition(e){const t=e.elements;return this.x=t[12],this.y=t[13],this.z=t[14],this}setFromMatrixScale(e){const t=this.setFromMatrixColumn(e,0).length(),n=this.setFromMatrixColumn(e,1).length(),s=this.setFromMatrixColumn(e,2).length();return this.x=t,this.y=n,this.z=s,this}setFromMatrixColumn(e,t){return this.fromArray(e.elements,t*4)}setFromMatrix3Column(e,t){return this.fromArray(e.elements,t*3)}setFromEuler(e){return this.x=e._x,this.y=e._y,this.z=e._z,this}setFromColor(e){return this.x=e.r,this.y=e.g,this.z=e.b,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this.z=e[t+2],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e[t+2]=this.z,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this.z=e.getZ(t),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this}randomDirection(){const e=(Math.random()-.5)*2,t=Math.random()*Math.PI*2,n=Math.sqrt(1-e**2);return this.x=n*Math.cos(t),this.y=n*Math.sin(t),this.z=e,this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z}}const _r=new U,mo=new ki;class Hi{constructor(e=new U(1/0,1/0,1/0),t=new U(-1/0,-1/0,-1/0)){this.isBox3=!0,this.min=e,this.max=t}set(e,t){return this.min.copy(e),this.max.copy(t),this}setFromArray(e){this.makeEmpty();for(let t=0,n=e.length;t<n;t+=3)this.expandByPoint(jt.fromArray(e,t));return this}setFromBufferAttribute(e){this.makeEmpty();for(let t=0,n=e.count;t<n;t++)this.expandByPoint(jt.fromBufferAttribute(e,t));return this}setFromPoints(e){this.makeEmpty();for(let t=0,n=e.length;t<n;t++)this.expandByPoint(e[t]);return this}setFromCenterAndSize(e,t){const n=jt.copy(t).multiplyScalar(.5);return this.min.copy(e).sub(n),this.max.copy(e).add(n),this}setFromObject(e,t=!1){return this.makeEmpty(),this.expandByObject(e,t)}clone(){return new this.constructor().copy(this)}copy(e){return this.min.copy(e.min),this.max.copy(e.max),this}makeEmpty(){return this.min.x=this.min.y=this.min.z=1/0,this.max.x=this.max.y=this.max.z=-1/0,this}isEmpty(){return this.max.x<this.min.x||this.max.y<this.min.y||this.max.z<this.min.z}getCenter(e){return this.isEmpty()?e.set(0,0,0):e.addVectors(this.min,this.max).multiplyScalar(.5)}getSize(e){return this.isEmpty()?e.set(0,0,0):e.subVectors(this.max,this.min)}expandByPoint(e){return this.min.min(e),this.max.max(e),this}expandByVector(e){return this.min.sub(e),this.max.add(e),this}expandByScalar(e){return this.min.addScalar(-e),this.max.addScalar(e),this}expandByObject(e,t=!1){e.updateWorldMatrix(!1,!1);const n=e.geometry;if(n!==void 0){const r=n.getAttribute("position");if(t===!0&&r!==void 0&&e.isInstancedMesh!==!0)for(let o=0,a=r.count;o<a;o++)e.isMesh===!0?e.getVertexPosition(o,jt):jt.fromBufferAttribute(r,o),jt.applyMatrix4(e.matrixWorld),this.expandByPoint(jt);else e.boundingBox!==void 0?(e.boundingBox===null&&e.computeBoundingBox(),as.copy(e.boundingBox)):(n.boundingBox===null&&n.computeBoundingBox(),as.copy(n.boundingBox)),as.applyMatrix4(e.matrixWorld),this.union(as)}const s=e.children;for(let r=0,o=s.length;r<o;r++)this.expandByObject(s[r],t);return this}containsPoint(e){return!(e.x<this.min.x||e.x>this.max.x||e.y<this.min.y||e.y>this.max.y||e.z<this.min.z||e.z>this.max.z)}containsBox(e){return this.min.x<=e.min.x&&e.max.x<=this.max.x&&this.min.y<=e.min.y&&e.max.y<=this.max.y&&this.min.z<=e.min.z&&e.max.z<=this.max.z}getParameter(e,t){return t.set((e.x-this.min.x)/(this.max.x-this.min.x),(e.y-this.min.y)/(this.max.y-this.min.y),(e.z-this.min.z)/(this.max.z-this.min.z))}intersectsBox(e){return!(e.max.x<this.min.x||e.min.x>this.max.x||e.max.y<this.min.y||e.min.y>this.max.y||e.max.z<this.min.z||e.min.z>this.max.z)}intersectsSphere(e){return this.clampPoint(e.center,jt),jt.distanceToSquared(e.center)<=e.radius*e.radius}intersectsPlane(e){let t,n;return e.normal.x>0?(t=e.normal.x*this.min.x,n=e.normal.x*this.max.x):(t=e.normal.x*this.max.x,n=e.normal.x*this.min.x),e.normal.y>0?(t+=e.normal.y*this.min.y,n+=e.normal.y*this.max.y):(t+=e.normal.y*this.max.y,n+=e.normal.y*this.min.y),e.normal.z>0?(t+=e.normal.z*this.min.z,n+=e.normal.z*this.max.z):(t+=e.normal.z*this.max.z,n+=e.normal.z*this.min.z),t<=-e.constant&&n>=-e.constant}intersectsTriangle(e){if(this.isEmpty())return!1;this.getCenter(Gi),os.subVectors(this.max,Gi),li.subVectors(e.a,Gi),ci.subVectors(e.b,Gi),ui.subVectors(e.c,Gi),bn.subVectors(ci,li),Tn.subVectors(ui,ci),kn.subVectors(li,ui);let t=[0,-bn.z,bn.y,0,-Tn.z,Tn.y,0,-kn.z,kn.y,bn.z,0,-bn.x,Tn.z,0,-Tn.x,kn.z,0,-kn.x,-bn.y,bn.x,0,-Tn.y,Tn.x,0,-kn.y,kn.x,0];return!xr(t,li,ci,ui,os)||(t=[1,0,0,0,1,0,0,0,1],!xr(t,li,ci,ui,os))?!1:(ls.crossVectors(bn,Tn),t=[ls.x,ls.y,ls.z],xr(t,li,ci,ui,os))}clampPoint(e,t){return t.copy(e).clamp(this.min,this.max)}distanceToPoint(e){return this.clampPoint(e,jt).distanceTo(e)}getBoundingSphere(e){return this.isEmpty()?e.makeEmpty():(this.getCenter(e.center),e.radius=this.getSize(jt).length()*.5),e}intersect(e){return this.min.max(e.min),this.max.min(e.max),this.isEmpty()&&this.makeEmpty(),this}union(e){return this.min.min(e.min),this.max.max(e.max),this}applyMatrix4(e){return this.isEmpty()?this:(an[0].set(this.min.x,this.min.y,this.min.z).applyMatrix4(e),an[1].set(this.min.x,this.min.y,this.max.z).applyMatrix4(e),an[2].set(this.min.x,this.max.y,this.min.z).applyMatrix4(e),an[3].set(this.min.x,this.max.y,this.max.z).applyMatrix4(e),an[4].set(this.max.x,this.min.y,this.min.z).applyMatrix4(e),an[5].set(this.max.x,this.min.y,this.max.z).applyMatrix4(e),an[6].set(this.max.x,this.max.y,this.min.z).applyMatrix4(e),an[7].set(this.max.x,this.max.y,this.max.z).applyMatrix4(e),this.setFromPoints(an),this)}translate(e){return this.min.add(e),this.max.add(e),this}equals(e){return e.min.equals(this.min)&&e.max.equals(this.max)}}const an=[new U,new U,new U,new U,new U,new U,new U,new U],jt=new U,as=new Hi,li=new U,ci=new U,ui=new U,bn=new U,Tn=new U,kn=new U,Gi=new U,os=new U,ls=new U,Hn=new U;function xr(i,e,t,n,s){for(let r=0,o=i.length-3;r<=o;r+=3){Hn.fromArray(i,r);const a=s.x*Math.abs(Hn.x)+s.y*Math.abs(Hn.y)+s.z*Math.abs(Hn.z),l=e.dot(Hn),c=t.dot(Hn),d=n.dot(Hn);if(Math.max(-Math.max(l,c,d),Math.min(l,c,d))>a)return!1}return!0}const cu=new Hi,Vi=new U,vr=new U;class cs{constructor(e=new U,t=-1){this.isSphere=!0,this.center=e,this.radius=t}set(e,t){return this.center.copy(e),this.radius=t,this}setFromPoints(e,t){const n=this.center;t!==void 0?n.copy(t):cu.setFromPoints(e).getCenter(n);let s=0;for(let r=0,o=e.length;r<o;r++)s=Math.max(s,n.distanceToSquared(e[r]));return this.radius=Math.sqrt(s),this}copy(e){return this.center.copy(e.center),this.radius=e.radius,this}isEmpty(){return this.radius<0}makeEmpty(){return this.center.set(0,0,0),this.radius=-1,this}containsPoint(e){return e.distanceToSquared(this.center)<=this.radius*this.radius}distanceToPoint(e){return e.distanceTo(this.center)-this.radius}intersectsSphere(e){const t=this.radius+e.radius;return e.center.distanceToSquared(this.center)<=t*t}intersectsBox(e){return e.intersectsSphere(this)}intersectsPlane(e){return Math.abs(e.distanceToPoint(this.center))<=this.radius}clampPoint(e,t){const n=this.center.distanceToSquared(e);return t.copy(e),n>this.radius*this.radius&&(t.sub(this.center).normalize(),t.multiplyScalar(this.radius).add(this.center)),t}getBoundingBox(e){return this.isEmpty()?(e.makeEmpty(),e):(e.set(this.center,this.center),e.expandByScalar(this.radius),e)}applyMatrix4(e){return this.center.applyMatrix4(e),this.radius=this.radius*e.getMaxScaleOnAxis(),this}translate(e){return this.center.add(e),this}expandByPoint(e){if(this.isEmpty())return this.center.copy(e),this.radius=0,this;Vi.subVectors(e,this.center);const t=Vi.lengthSq();if(t>this.radius*this.radius){const n=Math.sqrt(t),s=(n-this.radius)*.5;this.center.addScaledVector(Vi,s/n),this.radius+=s}return this}union(e){return e.isEmpty()?this:this.isEmpty()?(this.copy(e),this):(this.center.equals(e.center)===!0?this.radius=Math.max(this.radius,e.radius):(vr.subVectors(e.center,this.center).setLength(e.radius),this.expandByPoint(Vi.copy(e.center).add(vr)),this.expandByPoint(Vi.copy(e.center).sub(vr))),this)}equals(e){return e.center.equals(this.center)&&e.radius===this.radius}clone(){return new this.constructor().copy(this)}}const on=new U,Mr=new U,us=new U,wn=new U,Sr=new U,ds=new U,yr=new U;class go{constructor(e=new U,t=new U(0,0,-1)){this.origin=e,this.direction=t}set(e,t){return this.origin.copy(e),this.direction.copy(t),this}copy(e){return this.origin.copy(e.origin),this.direction.copy(e.direction),this}at(e,t){return t.copy(this.origin).addScaledVector(this.direction,e)}lookAt(e){return this.direction.copy(e).sub(this.origin).normalize(),this}recast(e){return this.origin.copy(this.at(e,on)),this}closestPointToPoint(e,t){t.subVectors(e,this.origin);const n=t.dot(this.direction);return n<0?t.copy(this.origin):t.copy(this.origin).addScaledVector(this.direction,n)}distanceToPoint(e){return Math.sqrt(this.distanceSqToPoint(e))}distanceSqToPoint(e){const t=on.subVectors(e,this.origin).dot(this.direction);return t<0?this.origin.distanceToSquared(e):(on.copy(this.origin).addScaledVector(this.direction,t),on.distanceToSquared(e))}distanceSqToSegment(e,t,n,s){Mr.copy(e).add(t).multiplyScalar(.5),us.copy(t).sub(e).normalize(),wn.copy(this.origin).sub(Mr);const r=e.distanceTo(t)*.5,o=-this.direction.dot(us),a=wn.dot(this.direction),l=-wn.dot(us),c=wn.lengthSq(),d=Math.abs(1-o*o);let p,f,m,g;if(d>0)if(p=o*l-a,f=o*a-l,g=r*d,p>=0)if(f>=-g)if(f<=g){const _=1/d;p*=_,f*=_,m=p*(p+o*f+2*a)+f*(o*p+f+2*l)+c}else f=r,p=Math.max(0,-(o*f+a)),m=-p*p+f*(f+2*l)+c;else f=-r,p=Math.max(0,-(o*f+a)),m=-p*p+f*(f+2*l)+c;else f<=-g?(p=Math.max(0,-(-o*r+a)),f=p>0?-r:Math.min(Math.max(-r,-l),r),m=-p*p+f*(f+2*l)+c):f<=g?(p=0,f=Math.min(Math.max(-r,-l),r),m=f*(f+2*l)+c):(p=Math.max(0,-(o*r+a)),f=p>0?r:Math.min(Math.max(-r,-l),r),m=-p*p+f*(f+2*l)+c);else f=o>0?-r:r,p=Math.max(0,-(o*f+a)),m=-p*p+f*(f+2*l)+c;return n&&n.copy(this.origin).addScaledVector(this.direction,p),s&&s.copy(Mr).addScaledVector(us,f),m}intersectSphere(e,t){on.subVectors(e.center,this.origin);const n=on.dot(this.direction),s=on.dot(on)-n*n,r=e.radius*e.radius;if(s>r)return null;const o=Math.sqrt(r-s),a=n-o,l=n+o;return l<0?null:a<0?this.at(l,t):this.at(a,t)}intersectsSphere(e){return this.distanceSqToPoint(e.center)<=e.radius*e.radius}distanceToPlane(e){const t=e.normal.dot(this.direction);if(t===0)return e.distanceToPoint(this.origin)===0?0:null;const n=-(this.origin.dot(e.normal)+e.constant)/t;return n>=0?n:null}intersectPlane(e,t){const n=this.distanceToPlane(e);return n===null?null:this.at(n,t)}intersectsPlane(e){const t=e.distanceToPoint(this.origin);return t===0||e.normal.dot(this.direction)*t<0}intersectBox(e,t){let n,s,r,o,a,l;const c=1/this.direction.x,d=1/this.direction.y,p=1/this.direction.z,f=this.origin;return c>=0?(n=(e.min.x-f.x)*c,s=(e.max.x-f.x)*c):(n=(e.max.x-f.x)*c,s=(e.min.x-f.x)*c),d>=0?(r=(e.min.y-f.y)*d,o=(e.max.y-f.y)*d):(r=(e.max.y-f.y)*d,o=(e.min.y-f.y)*d),n>o||r>s||((r>n||isNaN(n))&&(n=r),(o<s||isNaN(s))&&(s=o),p>=0?(a=(e.min.z-f.z)*p,l=(e.max.z-f.z)*p):(a=(e.max.z-f.z)*p,l=(e.min.z-f.z)*p),n>l||a>s)||((a>n||n!==n)&&(n=a),(l<s||s!==s)&&(s=l),s<0)?null:this.at(n>=0?n:s,t)}intersectsBox(e){return this.intersectBox(e,on)!==null}intersectTriangle(e,t,n,s,r){Sr.subVectors(t,e),ds.subVectors(n,e),yr.crossVectors(Sr,ds);let o=this.direction.dot(yr),a;if(o>0){if(s)return null;a=1}else if(o<0)a=-1,o=-o;else return null;wn.subVectors(this.origin,e);const l=a*this.direction.dot(ds.crossVectors(wn,ds));if(l<0)return null;const c=a*this.direction.dot(Sr.cross(wn));if(c<0||l+c>o)return null;const d=-a*wn.dot(yr);return d<0?null:this.at(d/o,r)}applyMatrix4(e){return this.origin.applyMatrix4(e),this.direction.transformDirection(e),this}equals(e){return e.origin.equals(this.origin)&&e.direction.equals(this.direction)}clone(){return new this.constructor().copy(this)}}class ot{constructor(e,t,n,s,r,o,a,l,c,d,p,f,m,g,_,h){ot.prototype.isMatrix4=!0,this.elements=[1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1],e!==void 0&&this.set(e,t,n,s,r,o,a,l,c,d,p,f,m,g,_,h)}set(e,t,n,s,r,o,a,l,c,d,p,f,m,g,_,h){const u=this.elements;return u[0]=e,u[4]=t,u[8]=n,u[12]=s,u[1]=r,u[5]=o,u[9]=a,u[13]=l,u[2]=c,u[6]=d,u[10]=p,u[14]=f,u[3]=m,u[7]=g,u[11]=_,u[15]=h,this}identity(){return this.set(1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1),this}clone(){return new ot().fromArray(this.elements)}copy(e){const t=this.elements,n=e.elements;return t[0]=n[0],t[1]=n[1],t[2]=n[2],t[3]=n[3],t[4]=n[4],t[5]=n[5],t[6]=n[6],t[7]=n[7],t[8]=n[8],t[9]=n[9],t[10]=n[10],t[11]=n[11],t[12]=n[12],t[13]=n[13],t[14]=n[14],t[15]=n[15],this}copyPosition(e){const t=this.elements,n=e.elements;return t[12]=n[12],t[13]=n[13],t[14]=n[14],this}setFromMatrix3(e){const t=e.elements;return this.set(t[0],t[3],t[6],0,t[1],t[4],t[7],0,t[2],t[5],t[8],0,0,0,0,1),this}extractBasis(e,t,n){return e.setFromMatrixColumn(this,0),t.setFromMatrixColumn(this,1),n.setFromMatrixColumn(this,2),this}makeBasis(e,t,n){return this.set(e.x,t.x,n.x,0,e.y,t.y,n.y,0,e.z,t.z,n.z,0,0,0,0,1),this}extractRotation(e){const t=this.elements,n=e.elements,s=1/di.setFromMatrixColumn(e,0).length(),r=1/di.setFromMatrixColumn(e,1).length(),o=1/di.setFromMatrixColumn(e,2).length();return t[0]=n[0]*s,t[1]=n[1]*s,t[2]=n[2]*s,t[3]=0,t[4]=n[4]*r,t[5]=n[5]*r,t[6]=n[6]*r,t[7]=0,t[8]=n[8]*o,t[9]=n[9]*o,t[10]=n[10]*o,t[11]=0,t[12]=0,t[13]=0,t[14]=0,t[15]=1,this}makeRotationFromEuler(e){const t=this.elements,n=e.x,s=e.y,r=e.z,o=Math.cos(n),a=Math.sin(n),l=Math.cos(s),c=Math.sin(s),d=Math.cos(r),p=Math.sin(r);if(e.order==="XYZ"){const f=o*d,m=o*p,g=a*d,_=a*p;t[0]=l*d,t[4]=-l*p,t[8]=c,t[1]=m+g*c,t[5]=f-_*c,t[9]=-a*l,t[2]=_-f*c,t[6]=g+m*c,t[10]=o*l}else if(e.order==="YXZ"){const f=l*d,m=l*p,g=c*d,_=c*p;t[0]=f+_*a,t[4]=g*a-m,t[8]=o*c,t[1]=o*p,t[5]=o*d,t[9]=-a,t[2]=m*a-g,t[6]=_+f*a,t[10]=o*l}else if(e.order==="ZXY"){const f=l*d,m=l*p,g=c*d,_=c*p;t[0]=f-_*a,t[4]=-o*p,t[8]=g+m*a,t[1]=m+g*a,t[5]=o*d,t[9]=_-f*a,t[2]=-o*c,t[6]=a,t[10]=o*l}else if(e.order==="ZYX"){const f=o*d,m=o*p,g=a*d,_=a*p;t[0]=l*d,t[4]=g*c-m,t[8]=f*c+_,t[1]=l*p,t[5]=_*c+f,t[9]=m*c-g,t[2]=-c,t[6]=a*l,t[10]=o*l}else if(e.order==="YZX"){const f=o*l,m=o*c,g=a*l,_=a*c;t[0]=l*d,t[4]=_-f*p,t[8]=g*p+m,t[1]=p,t[5]=o*d,t[9]=-a*d,t[2]=-c*d,t[6]=m*p+g,t[10]=f-_*p}else if(e.order==="XZY"){const f=o*l,m=o*c,g=a*l,_=a*c;t[0]=l*d,t[4]=-p,t[8]=c*d,t[1]=f*p+_,t[5]=o*d,t[9]=m*p-g,t[2]=g*p-m,t[6]=a*d,t[10]=_*p+f}return t[3]=0,t[7]=0,t[11]=0,t[12]=0,t[13]=0,t[14]=0,t[15]=1,this}makeRotationFromQuaternion(e){return this.compose(uu,e,du)}lookAt(e,t,n){const s=this.elements;return It.subVectors(e,t),It.lengthSq()===0&&(It.z=1),It.normalize(),An.crossVectors(n,It),An.lengthSq()===0&&(Math.abs(n.z)===1?It.x+=1e-4:It.z+=1e-4,It.normalize(),An.crossVectors(n,It)),An.normalize(),hs.crossVectors(It,An),s[0]=An.x,s[4]=hs.x,s[8]=It.x,s[1]=An.y,s[5]=hs.y,s[9]=It.y,s[2]=An.z,s[6]=hs.z,s[10]=It.z,this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,t){const n=e.elements,s=t.elements,r=this.elements,o=n[0],a=n[4],l=n[8],c=n[12],d=n[1],p=n[5],f=n[9],m=n[13],g=n[2],_=n[6],h=n[10],u=n[14],y=n[3],x=n[7],T=n[11],L=n[15],w=s[0],A=s[4],X=s[8],S=s[12],b=s[1],k=s[5],$=s[9],ie=s[13],C=s[2],z=s[6],G=s[10],Y=s[14],V=s[3],D=s[7],W=s[11],j=s[15];return r[0]=o*w+a*b+l*C+c*V,r[4]=o*A+a*k+l*z+c*D,r[8]=o*X+a*$+l*G+c*W,r[12]=o*S+a*ie+l*Y+c*j,r[1]=d*w+p*b+f*C+m*V,r[5]=d*A+p*k+f*z+m*D,r[9]=d*X+p*$+f*G+m*W,r[13]=d*S+p*ie+f*Y+m*j,r[2]=g*w+_*b+h*C+u*V,r[6]=g*A+_*k+h*z+u*D,r[10]=g*X+_*$+h*G+u*W,r[14]=g*S+_*ie+h*Y+u*j,r[3]=y*w+x*b+T*C+L*V,r[7]=y*A+x*k+T*z+L*D,r[11]=y*X+x*$+T*G+L*W,r[15]=y*S+x*ie+T*Y+L*j,this}multiplyScalar(e){const t=this.elements;return t[0]*=e,t[4]*=e,t[8]*=e,t[12]*=e,t[1]*=e,t[5]*=e,t[9]*=e,t[13]*=e,t[2]*=e,t[6]*=e,t[10]*=e,t[14]*=e,t[3]*=e,t[7]*=e,t[11]*=e,t[15]*=e,this}determinant(){const e=this.elements,t=e[0],n=e[4],s=e[8],r=e[12],o=e[1],a=e[5],l=e[9],c=e[13],d=e[2],p=e[6],f=e[10],m=e[14],g=e[3],_=e[7],h=e[11],u=e[15];return g*(+r*l*p-s*c*p-r*a*f+n*c*f+s*a*m-n*l*m)+_*(+t*l*m-t*c*f+r*o*f-s*o*m+s*c*d-r*l*d)+h*(+t*c*p-t*a*m-r*o*p+n*o*m+r*a*d-n*c*d)+u*(-s*a*d-t*l*p+t*a*f+s*o*p-n*o*f+n*l*d)}transpose(){const e=this.elements;let t;return t=e[1],e[1]=e[4],e[4]=t,t=e[2],e[2]=e[8],e[8]=t,t=e[6],e[6]=e[9],e[9]=t,t=e[3],e[3]=e[12],e[12]=t,t=e[7],e[7]=e[13],e[13]=t,t=e[11],e[11]=e[14],e[14]=t,this}setPosition(e,t,n){const s=this.elements;return e.isVector3?(s[12]=e.x,s[13]=e.y,s[14]=e.z):(s[12]=e,s[13]=t,s[14]=n),this}invert(){const e=this.elements,t=e[0],n=e[1],s=e[2],r=e[3],o=e[4],a=e[5],l=e[6],c=e[7],d=e[8],p=e[9],f=e[10],m=e[11],g=e[12],_=e[13],h=e[14],u=e[15],y=p*h*c-_*f*c+_*l*m-a*h*m-p*l*u+a*f*u,x=g*f*c-d*h*c-g*l*m+o*h*m+d*l*u-o*f*u,T=d*_*c-g*p*c+g*a*m-o*_*m-d*a*u+o*p*u,L=g*p*l-d*_*l-g*a*f+o*_*f+d*a*h-o*p*h,w=t*y+n*x+s*T+r*L;if(w===0)return this.set(0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0);const A=1/w;return e[0]=y*A,e[1]=(_*f*r-p*h*r-_*s*m+n*h*m+p*s*u-n*f*u)*A,e[2]=(a*h*r-_*l*r+_*s*c-n*h*c-a*s*u+n*l*u)*A,e[3]=(p*l*r-a*f*r-p*s*c+n*f*c+a*s*m-n*l*m)*A,e[4]=x*A,e[5]=(d*h*r-g*f*r+g*s*m-t*h*m-d*s*u+t*f*u)*A,e[6]=(g*l*r-o*h*r-g*s*c+t*h*c+o*s*u-t*l*u)*A,e[7]=(o*f*r-d*l*r+d*s*c-t*f*c-o*s*m+t*l*m)*A,e[8]=T*A,e[9]=(g*p*r-d*_*r-g*n*m+t*_*m+d*n*u-t*p*u)*A,e[10]=(o*_*r-g*a*r+g*n*c-t*_*c-o*n*u+t*a*u)*A,e[11]=(d*a*r-o*p*r-d*n*c+t*p*c+o*n*m-t*a*m)*A,e[12]=L*A,e[13]=(d*_*s-g*p*s+g*n*f-t*_*f-d*n*h+t*p*h)*A,e[14]=(g*a*s-o*_*s-g*n*l+t*_*l+o*n*h-t*a*h)*A,e[15]=(o*p*s-d*a*s+d*n*l-t*p*l-o*n*f+t*a*f)*A,this}scale(e){const t=this.elements,n=e.x,s=e.y,r=e.z;return t[0]*=n,t[4]*=s,t[8]*=r,t[1]*=n,t[5]*=s,t[9]*=r,t[2]*=n,t[6]*=s,t[10]*=r,t[3]*=n,t[7]*=s,t[11]*=r,this}getMaxScaleOnAxis(){const e=this.elements,t=e[0]*e[0]+e[1]*e[1]+e[2]*e[2],n=e[4]*e[4]+e[5]*e[5]+e[6]*e[6],s=e[8]*e[8]+e[9]*e[9]+e[10]*e[10];return Math.sqrt(Math.max(t,n,s))}makeTranslation(e,t,n){return e.isVector3?this.set(1,0,0,e.x,0,1,0,e.y,0,0,1,e.z,0,0,0,1):this.set(1,0,0,e,0,1,0,t,0,0,1,n,0,0,0,1),this}makeRotationX(e){const t=Math.cos(e),n=Math.sin(e);return this.set(1,0,0,0,0,t,-n,0,0,n,t,0,0,0,0,1),this}makeRotationY(e){const t=Math.cos(e),n=Math.sin(e);return this.set(t,0,n,0,0,1,0,0,-n,0,t,0,0,0,0,1),this}makeRotationZ(e){const t=Math.cos(e),n=Math.sin(e);return this.set(t,-n,0,0,n,t,0,0,0,0,1,0,0,0,0,1),this}makeRotationAxis(e,t){const n=Math.cos(t),s=Math.sin(t),r=1-n,o=e.x,a=e.y,l=e.z,c=r*o,d=r*a;return this.set(c*o+n,c*a-s*l,c*l+s*a,0,c*a+s*l,d*a+n,d*l-s*o,0,c*l-s*a,d*l+s*o,r*l*l+n,0,0,0,0,1),this}makeScale(e,t,n){return this.set(e,0,0,0,0,t,0,0,0,0,n,0,0,0,0,1),this}makeShear(e,t,n,s,r,o){return this.set(1,n,r,0,e,1,o,0,t,s,1,0,0,0,0,1),this}compose(e,t,n){const s=this.elements,r=t._x,o=t._y,a=t._z,l=t._w,c=r+r,d=o+o,p=a+a,f=r*c,m=r*d,g=r*p,_=o*d,h=o*p,u=a*p,y=l*c,x=l*d,T=l*p,L=n.x,w=n.y,A=n.z;return s[0]=(1-(_+u))*L,s[1]=(m+T)*L,s[2]=(g-x)*L,s[3]=0,s[4]=(m-T)*w,s[5]=(1-(f+u))*w,s[6]=(h+y)*w,s[7]=0,s[8]=(g+x)*A,s[9]=(h-y)*A,s[10]=(1-(f+_))*A,s[11]=0,s[12]=e.x,s[13]=e.y,s[14]=e.z,s[15]=1,this}decompose(e,t,n){const s=this.elements;let r=di.set(s[0],s[1],s[2]).length();const o=di.set(s[4],s[5],s[6]).length(),a=di.set(s[8],s[9],s[10]).length();this.determinant()<0&&(r=-r),e.x=s[12],e.y=s[13],e.z=s[14],Yt.copy(this);const c=1/r,d=1/o,p=1/a;return Yt.elements[0]*=c,Yt.elements[1]*=c,Yt.elements[2]*=c,Yt.elements[4]*=d,Yt.elements[5]*=d,Yt.elements[6]*=d,Yt.elements[8]*=p,Yt.elements[9]*=p,Yt.elements[10]*=p,t.setFromRotationMatrix(Yt),n.x=r,n.y=o,n.z=a,this}makePerspective(e,t,n,s,r,o,a=rn){const l=this.elements,c=2*r/(t-e),d=2*r/(n-s),p=(t+e)/(t-e),f=(n+s)/(n-s);let m,g;if(a===rn)m=-(o+r)/(o-r),g=-2*o*r/(o-r);else if(a===ss)m=-o/(o-r),g=-o*r/(o-r);else throw new Error("THREE.Matrix4.makePerspective(): Invalid coordinate system: "+a);return l[0]=c,l[4]=0,l[8]=p,l[12]=0,l[1]=0,l[5]=d,l[9]=f,l[13]=0,l[2]=0,l[6]=0,l[10]=m,l[14]=g,l[3]=0,l[7]=0,l[11]=-1,l[15]=0,this}makeOrthographic(e,t,n,s,r,o,a=rn){const l=this.elements,c=1/(t-e),d=1/(n-s),p=1/(o-r),f=(t+e)*c,m=(n+s)*d;let g,_;if(a===rn)g=(o+r)*p,_=-2*p;else if(a===ss)g=r*p,_=-1*p;else throw new Error("THREE.Matrix4.makeOrthographic(): Invalid coordinate system: "+a);return l[0]=2*c,l[4]=0,l[8]=0,l[12]=-f,l[1]=0,l[5]=2*d,l[9]=0,l[13]=-m,l[2]=0,l[6]=0,l[10]=_,l[14]=-g,l[3]=0,l[7]=0,l[11]=0,l[15]=1,this}equals(e){const t=this.elements,n=e.elements;for(let s=0;s<16;s++)if(t[s]!==n[s])return!1;return!0}fromArray(e,t=0){for(let n=0;n<16;n++)this.elements[n]=e[n+t];return this}toArray(e=[],t=0){const n=this.elements;return e[t]=n[0],e[t+1]=n[1],e[t+2]=n[2],e[t+3]=n[3],e[t+4]=n[4],e[t+5]=n[5],e[t+6]=n[6],e[t+7]=n[7],e[t+8]=n[8],e[t+9]=n[9],e[t+10]=n[10],e[t+11]=n[11],e[t+12]=n[12],e[t+13]=n[13],e[t+14]=n[14],e[t+15]=n[15],e}}const di=new U,Yt=new ot,uu=new U(0,0,0),du=new U(1,1,1),An=new U,hs=new U,It=new U,_o=new ot,xo=new ki;class fs{constructor(e=0,t=0,n=0,s=fs.DEFAULT_ORDER){this.isEuler=!0,this._x=e,this._y=t,this._z=n,this._order=s}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get order(){return this._order}set order(e){this._order=e,this._onChangeCallback()}set(e,t,n,s=this._order){return this._x=e,this._y=t,this._z=n,this._order=s,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._order)}copy(e){return this._x=e._x,this._y=e._y,this._z=e._z,this._order=e._order,this._onChangeCallback(),this}setFromRotationMatrix(e,t=this._order,n=!0){const s=e.elements,r=s[0],o=s[4],a=s[8],l=s[1],c=s[5],d=s[9],p=s[2],f=s[6],m=s[10];switch(t){case"XYZ":this._y=Math.asin(Ct(a,-1,1)),Math.abs(a)<.9999999?(this._x=Math.atan2(-d,m),this._z=Math.atan2(-o,r)):(this._x=Math.atan2(f,c),this._z=0);break;case"YXZ":this._x=Math.asin(-Ct(d,-1,1)),Math.abs(d)<.9999999?(this._y=Math.atan2(a,m),this._z=Math.atan2(l,c)):(this._y=Math.atan2(-p,r),this._z=0);break;case"ZXY":this._x=Math.asin(Ct(f,-1,1)),Math.abs(f)<.9999999?(this._y=Math.atan2(-p,m),this._z=Math.atan2(-o,c)):(this._y=0,this._z=Math.atan2(l,r));break;case"ZYX":this._y=Math.asin(-Ct(p,-1,1)),Math.abs(p)<.9999999?(this._x=Math.atan2(f,m),this._z=Math.atan2(l,r)):(this._x=0,this._z=Math.atan2(-o,c));break;case"YZX":this._z=Math.asin(Ct(l,-1,1)),Math.abs(l)<.9999999?(this._x=Math.atan2(-d,c),this._y=Math.atan2(-p,r)):(this._x=0,this._y=Math.atan2(a,m));break;case"XZY":this._z=Math.asin(-Ct(o,-1,1)),Math.abs(o)<.9999999?(this._x=Math.atan2(f,c),this._y=Math.atan2(a,r)):(this._x=Math.atan2(-d,m),this._y=0);break;default:console.warn("THREE.Euler: .setFromRotationMatrix() encountered an unknown order: "+t)}return this._order=t,n===!0&&this._onChangeCallback(),this}setFromQuaternion(e,t,n){return _o.makeRotationFromQuaternion(e),this.setFromRotationMatrix(_o,t,n)}setFromVector3(e,t=this._order){return this.set(e.x,e.y,e.z,t)}reorder(e){return xo.setFromEuler(this),this.setFromQuaternion(xo,e)}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._order===this._order}fromArray(e){return this._x=e[0],this._y=e[1],this._z=e[2],e[3]!==void 0&&(this._order=e[3]),this._onChangeCallback(),this}toArray(e=[],t=0){return e[t]=this._x,e[t+1]=this._y,e[t+2]=this._z,e[t+3]=this._order,e}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._order}}fs.DEFAULT_ORDER="XYZ";class vo{constructor(){this.mask=1}set(e){this.mask=(1<<e|0)>>>0}enable(e){this.mask|=1<<e|0}enableAll(){this.mask=-1}toggle(e){this.mask^=1<<e|0}disable(e){this.mask&=~(1<<e|0)}disableAll(){this.mask=0}test(e){return(this.mask&e.mask)!==0}isEnabled(e){return(this.mask&(1<<e|0))!==0}}let hu=0;const Mo=new U,hi=new ki,ln=new ot,ps=new U,Wi=new U,fu=new U,pu=new ki,So=new U(1,0,0),yo=new U(0,1,0),Eo=new U(0,0,1),mu={type:"added"},gu={type:"removed"};class ft extends ri{constructor(){super(),this.isObject3D=!0,Object.defineProperty(this,"id",{value:hu++}),this.uuid=Fi(),this.name="",this.type="Object3D",this.parent=null,this.children=[],this.up=ft.DEFAULT_UP.clone();const e=new U,t=new fs,n=new ki,s=new U(1,1,1);function r(){n.setFromEuler(t,!1)}function o(){t.setFromQuaternion(n,void 0,!1)}t._onChange(r),n._onChange(o),Object.defineProperties(this,{position:{configurable:!0,enumerable:!0,value:e},rotation:{configurable:!0,enumerable:!0,value:t},quaternion:{configurable:!0,enumerable:!0,value:n},scale:{configurable:!0,enumerable:!0,value:s},modelViewMatrix:{value:new ot},normalMatrix:{value:new ke}}),this.matrix=new ot,this.matrixWorld=new ot,this.matrixAutoUpdate=ft.DEFAULT_MATRIX_AUTO_UPDATE,this.matrixWorldAutoUpdate=ft.DEFAULT_MATRIX_WORLD_AUTO_UPDATE,this.matrixWorldNeedsUpdate=!1,this.layers=new vo,this.visible=!0,this.castShadow=!1,this.receiveShadow=!1,this.frustumCulled=!0,this.renderOrder=0,this.animations=[],this.userData={}}onBeforeShadow(){}onAfterShadow(){}onBeforeRender(){}onAfterRender(){}applyMatrix4(e){this.matrixAutoUpdate&&this.updateMatrix(),this.matrix.premultiply(e),this.matrix.decompose(this.position,this.quaternion,this.scale)}applyQuaternion(e){return this.quaternion.premultiply(e),this}setRotationFromAxisAngle(e,t){this.quaternion.setFromAxisAngle(e,t)}setRotationFromEuler(e){this.quaternion.setFromEuler(e,!0)}setRotationFromMatrix(e){this.quaternion.setFromRotationMatrix(e)}setRotationFromQuaternion(e){this.quaternion.copy(e)}rotateOnAxis(e,t){return hi.setFromAxisAngle(e,t),this.quaternion.multiply(hi),this}rotateOnWorldAxis(e,t){return hi.setFromAxisAngle(e,t),this.quaternion.premultiply(hi),this}rotateX(e){return this.rotateOnAxis(So,e)}rotateY(e){return this.rotateOnAxis(yo,e)}rotateZ(e){return this.rotateOnAxis(Eo,e)}translateOnAxis(e,t){return Mo.copy(e).applyQuaternion(this.quaternion),this.position.add(Mo.multiplyScalar(t)),this}translateX(e){return this.translateOnAxis(So,e)}translateY(e){return this.translateOnAxis(yo,e)}translateZ(e){return this.translateOnAxis(Eo,e)}localToWorld(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4(this.matrixWorld)}worldToLocal(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4(ln.copy(this.matrixWorld).invert())}lookAt(e,t,n){e.isVector3?ps.copy(e):ps.set(e,t,n);const s=this.parent;this.updateWorldMatrix(!0,!1),Wi.setFromMatrixPosition(this.matrixWorld),this.isCamera||this.isLight?ln.lookAt(Wi,ps,this.up):ln.lookAt(ps,Wi,this.up),this.quaternion.setFromRotationMatrix(ln),s&&(ln.extractRotation(s.matrixWorld),hi.setFromRotationMatrix(ln),this.quaternion.premultiply(hi.invert()))}add(e){if(arguments.length>1){for(let t=0;t<arguments.length;t++)this.add(arguments[t]);return this}return e===this?(console.error("THREE.Object3D.add: object can't be added as a child of itself.",e),this):(e&&e.isObject3D?(e.parent!==null&&e.parent.remove(e),e.parent=this,this.children.push(e),e.dispatchEvent(mu)):console.error("THREE.Object3D.add: object not an instance of THREE.Object3D.",e),this)}remove(e){if(arguments.length>1){for(let n=0;n<arguments.length;n++)this.remove(arguments[n]);return this}const t=this.children.indexOf(e);return t!==-1&&(e.parent=null,this.children.splice(t,1),e.dispatchEvent(gu)),this}removeFromParent(){const e=this.parent;return e!==null&&e.remove(this),this}clear(){return this.remove(...this.children)}attach(e){return this.updateWorldMatrix(!0,!1),ln.copy(this.matrixWorld).invert(),e.parent!==null&&(e.parent.updateWorldMatrix(!0,!1),ln.multiply(e.parent.matrixWorld)),e.applyMatrix4(ln),this.add(e),e.updateWorldMatrix(!1,!0),this}getObjectById(e){return this.getObjectByProperty("id",e)}getObjectByName(e){return this.getObjectByProperty("name",e)}getObjectByProperty(e,t){if(this[e]===t)return this;for(let n=0,s=this.children.length;n<s;n++){const o=this.children[n].getObjectByProperty(e,t);if(o!==void 0)return o}}getObjectsByProperty(e,t,n=[]){this[e]===t&&n.push(this);const s=this.children;for(let r=0,o=s.length;r<o;r++)s[r].getObjectsByProperty(e,t,n);return n}getWorldPosition(e){return this.updateWorldMatrix(!0,!1),e.setFromMatrixPosition(this.matrixWorld)}getWorldQuaternion(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(Wi,e,fu),e}getWorldScale(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(Wi,pu,e),e}getWorldDirection(e){this.updateWorldMatrix(!0,!1);const t=this.matrixWorld.elements;return e.set(t[8],t[9],t[10]).normalize()}raycast(){}traverse(e){e(this);const t=this.children;for(let n=0,s=t.length;n<s;n++)t[n].traverse(e)}traverseVisible(e){if(this.visible===!1)return;e(this);const t=this.children;for(let n=0,s=t.length;n<s;n++)t[n].traverseVisible(e)}traverseAncestors(e){const t=this.parent;t!==null&&(e(t),t.traverseAncestors(e))}updateMatrix(){this.matrix.compose(this.position,this.quaternion,this.scale),this.matrixWorldNeedsUpdate=!0}updateMatrixWorld(e){this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||e)&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix),this.matrixWorldNeedsUpdate=!1,e=!0);const t=this.children;for(let n=0,s=t.length;n<s;n++){const r=t[n];(r.matrixWorldAutoUpdate===!0||e===!0)&&r.updateMatrixWorld(e)}}updateWorldMatrix(e,t){const n=this.parent;if(e===!0&&n!==null&&n.matrixWorldAutoUpdate===!0&&n.updateWorldMatrix(!0,!1),this.matrixAutoUpdate&&this.updateMatrix(),this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix),t===!0){const s=this.children;for(let r=0,o=s.length;r<o;r++){const a=s[r];a.matrixWorldAutoUpdate===!0&&a.updateWorldMatrix(!1,!0)}}}toJSON(e){const t=e===void 0||typeof e=="string",n={};t&&(e={geometries:{},materials:{},textures:{},images:{},shapes:{},skeletons:{},animations:{},nodes:{}},n.metadata={version:4.6,type:"Object",generator:"Object3D.toJSON"});const s={};s.uuid=this.uuid,s.type=this.type,this.name!==""&&(s.name=this.name),this.castShadow===!0&&(s.castShadow=!0),this.receiveShadow===!0&&(s.receiveShadow=!0),this.visible===!1&&(s.visible=!1),this.frustumCulled===!1&&(s.frustumCulled=!1),this.renderOrder!==0&&(s.renderOrder=this.renderOrder),Object.keys(this.userData).length>0&&(s.userData=this.userData),s.layers=this.layers.mask,s.matrix=this.matrix.toArray(),s.up=this.up.toArray(),this.matrixAutoUpdate===!1&&(s.matrixAutoUpdate=!1),this.isInstancedMesh&&(s.type="InstancedMesh",s.count=this.count,s.instanceMatrix=this.instanceMatrix.toJSON(),this.instanceColor!==null&&(s.instanceColor=this.instanceColor.toJSON())),this.isBatchedMesh&&(s.type="BatchedMesh",s.perObjectFrustumCulled=this.perObjectFrustumCulled,s.sortObjects=this.sortObjects,s.drawRanges=this._drawRanges,s.reservedRanges=this._reservedRanges,s.visibility=this._visibility,s.active=this._active,s.bounds=this._bounds.map(a=>({boxInitialized:a.boxInitialized,boxMin:a.box.min.toArray(),boxMax:a.box.max.toArray(),sphereInitialized:a.sphereInitialized,sphereRadius:a.sphere.radius,sphereCenter:a.sphere.center.toArray()})),s.maxGeometryCount=this._maxGeometryCount,s.maxVertexCount=this._maxVertexCount,s.maxIndexCount=this._maxIndexCount,s.geometryInitialized=this._geometryInitialized,s.geometryCount=this._geometryCount,s.matricesTexture=this._matricesTexture.toJSON(e),this.boundingSphere!==null&&(s.boundingSphere={center:s.boundingSphere.center.toArray(),radius:s.boundingSphere.radius}),this.boundingBox!==null&&(s.boundingBox={min:s.boundingBox.min.toArray(),max:s.boundingBox.max.toArray()}));function r(a,l){return a[l.uuid]===void 0&&(a[l.uuid]=l.toJSON(e)),l.uuid}if(this.isScene)this.background&&(this.background.isColor?s.background=this.background.toJSON():this.background.isTexture&&(s.background=this.background.toJSON(e).uuid)),this.environment&&this.environment.isTexture&&this.environment.isRenderTargetTexture!==!0&&(s.environment=this.environment.toJSON(e).uuid);else if(this.isMesh||this.isLine||this.isPoints){s.geometry=r(e.geometries,this.geometry);const a=this.geometry.parameters;if(a!==void 0&&a.shapes!==void 0){const l=a.shapes;if(Array.isArray(l))for(let c=0,d=l.length;c<d;c++){const p=l[c];r(e.shapes,p)}else r(e.shapes,l)}}if(this.isSkinnedMesh&&(s.bindMode=this.bindMode,s.bindMatrix=this.bindMatrix.toArray(),this.skeleton!==void 0&&(r(e.skeletons,this.skeleton),s.skeleton=this.skeleton.uuid)),this.material!==void 0)if(Array.isArray(this.material)){const a=[];for(let l=0,c=this.material.length;l<c;l++)a.push(r(e.materials,this.material[l]));s.material=a}else s.material=r(e.materials,this.material);if(this.children.length>0){s.children=[];for(let a=0;a<this.children.length;a++)s.children.push(this.children[a].toJSON(e).object)}if(this.animations.length>0){s.animations=[];for(let a=0;a<this.animations.length;a++){const l=this.animations[a];s.animations.push(r(e.animations,l))}}if(t){const a=o(e.geometries),l=o(e.materials),c=o(e.textures),d=o(e.images),p=o(e.shapes),f=o(e.skeletons),m=o(e.animations),g=o(e.nodes);a.length>0&&(n.geometries=a),l.length>0&&(n.materials=l),c.length>0&&(n.textures=c),d.length>0&&(n.images=d),p.length>0&&(n.shapes=p),f.length>0&&(n.skeletons=f),m.length>0&&(n.animations=m),g.length>0&&(n.nodes=g)}return n.object=s,n;function o(a){const l=[];for(const c in a){const d=a[c];delete d.metadata,l.push(d)}return l}}clone(e){return new this.constructor().copy(this,e)}copy(e,t=!0){if(this.name=e.name,this.up.copy(e.up),this.position.copy(e.position),this.rotation.order=e.rotation.order,this.quaternion.copy(e.quaternion),this.scale.copy(e.scale),this.matrix.copy(e.matrix),this.matrixWorld.copy(e.matrixWorld),this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrixWorldAutoUpdate=e.matrixWorldAutoUpdate,this.matrixWorldNeedsUpdate=e.matrixWorldNeedsUpdate,this.layers.mask=e.layers.mask,this.visible=e.visible,this.castShadow=e.castShadow,this.receiveShadow=e.receiveShadow,this.frustumCulled=e.frustumCulled,this.renderOrder=e.renderOrder,this.animations=e.animations.slice(),this.userData=JSON.parse(JSON.stringify(e.userData)),t===!0)for(let n=0;n<e.children.length;n++){const s=e.children[n];this.add(s.clone())}return this}}ft.DEFAULT_UP=new U(0,1,0),ft.DEFAULT_MATRIX_AUTO_UPDATE=!0,ft.DEFAULT_MATRIX_WORLD_AUTO_UPDATE=!0;const $t=new U,cn=new U,Er=new U,un=new U,fi=new U,pi=new U,bo=new U,br=new U,Tr=new U,wr=new U;let ms=!1;class Kt{constructor(e=new U,t=new U,n=new U){this.a=e,this.b=t,this.c=n}static getNormal(e,t,n,s){s.subVectors(n,t),$t.subVectors(e,t),s.cross($t);const r=s.lengthSq();return r>0?s.multiplyScalar(1/Math.sqrt(r)):s.set(0,0,0)}static getBarycoord(e,t,n,s,r){$t.subVectors(s,t),cn.subVectors(n,t),Er.subVectors(e,t);const o=$t.dot($t),a=$t.dot(cn),l=$t.dot(Er),c=cn.dot(cn),d=cn.dot(Er),p=o*c-a*a;if(p===0)return r.set(0,0,0),null;const f=1/p,m=(c*l-a*d)*f,g=(o*d-a*l)*f;return r.set(1-m-g,g,m)}static containsPoint(e,t,n,s){return this.getBarycoord(e,t,n,s,un)===null?!1:un.x>=0&&un.y>=0&&un.x+un.y<=1}static getUV(e,t,n,s,r,o,a,l){return ms===!1&&(console.warn("THREE.Triangle.getUV() has been renamed to THREE.Triangle.getInterpolation()."),ms=!0),this.getInterpolation(e,t,n,s,r,o,a,l)}static getInterpolation(e,t,n,s,r,o,a,l){return this.getBarycoord(e,t,n,s,un)===null?(l.x=0,l.y=0,"z"in l&&(l.z=0),"w"in l&&(l.w=0),null):(l.setScalar(0),l.addScaledVector(r,un.x),l.addScaledVector(o,un.y),l.addScaledVector(a,un.z),l)}static isFrontFacing(e,t,n,s){return $t.subVectors(n,t),cn.subVectors(e,t),$t.cross(cn).dot(s)<0}set(e,t,n){return this.a.copy(e),this.b.copy(t),this.c.copy(n),this}setFromPointsAndIndices(e,t,n,s){return this.a.copy(e[t]),this.b.copy(e[n]),this.c.copy(e[s]),this}setFromAttributeAndIndices(e,t,n,s){return this.a.fromBufferAttribute(e,t),this.b.fromBufferAttribute(e,n),this.c.fromBufferAttribute(e,s),this}clone(){return new this.constructor().copy(this)}copy(e){return this.a.copy(e.a),this.b.copy(e.b),this.c.copy(e.c),this}getArea(){return $t.subVectors(this.c,this.b),cn.subVectors(this.a,this.b),$t.cross(cn).length()*.5}getMidpoint(e){return e.addVectors(this.a,this.b).add(this.c).multiplyScalar(1/3)}getNormal(e){return Kt.getNormal(this.a,this.b,this.c,e)}getPlane(e){return e.setFromCoplanarPoints(this.a,this.b,this.c)}getBarycoord(e,t){return Kt.getBarycoord(e,this.a,this.b,this.c,t)}getUV(e,t,n,s,r){return ms===!1&&(console.warn("THREE.Triangle.getUV() has been renamed to THREE.Triangle.getInterpolation()."),ms=!0),Kt.getInterpolation(e,this.a,this.b,this.c,t,n,s,r)}getInterpolation(e,t,n,s,r){return Kt.getInterpolation(e,this.a,this.b,this.c,t,n,s,r)}containsPoint(e){return Kt.containsPoint(e,this.a,this.b,this.c)}isFrontFacing(e){return Kt.isFrontFacing(this.a,this.b,this.c,e)}intersectsBox(e){return e.intersectsTriangle(this)}closestPointToPoint(e,t){const n=this.a,s=this.b,r=this.c;let o,a;fi.subVectors(s,n),pi.subVectors(r,n),br.subVectors(e,n);const l=fi.dot(br),c=pi.dot(br);if(l<=0&&c<=0)return t.copy(n);Tr.subVectors(e,s);const d=fi.dot(Tr),p=pi.dot(Tr);if(d>=0&&p<=d)return t.copy(s);const f=l*p-d*c;if(f<=0&&l>=0&&d<=0)return o=l/(l-d),t.copy(n).addScaledVector(fi,o);wr.subVectors(e,r);const m=fi.dot(wr),g=pi.dot(wr);if(g>=0&&m<=g)return t.copy(r);const _=m*c-l*g;if(_<=0&&c>=0&&g<=0)return a=c/(c-g),t.copy(n).addScaledVector(pi,a);const h=d*g-m*p;if(h<=0&&p-d>=0&&m-g>=0)return bo.subVectors(r,s),a=(p-d)/(p-d+(m-g)),t.copy(s).addScaledVector(bo,a);const u=1/(h+_+f);return o=_*u,a=f*u,t.copy(n).addScaledVector(fi,o).addScaledVector(pi,a)}equals(e){return e.a.equals(this.a)&&e.b.equals(this.b)&&e.c.equals(this.c)}}const To={aliceblue:15792383,antiquewhite:16444375,aqua:65535,aquamarine:8388564,azure:15794175,beige:16119260,bisque:16770244,black:0,blanchedalmond:16772045,blue:255,blueviolet:9055202,brown:10824234,burlywood:14596231,cadetblue:6266528,chartreuse:8388352,chocolate:13789470,coral:16744272,cornflowerblue:6591981,cornsilk:16775388,crimson:14423100,cyan:65535,darkblue:139,darkcyan:35723,darkgoldenrod:12092939,darkgray:11119017,darkgreen:25600,darkgrey:11119017,darkkhaki:12433259,darkmagenta:9109643,darkolivegreen:5597999,darkorange:16747520,darkorchid:10040012,darkred:9109504,darksalmon:15308410,darkseagreen:9419919,darkslateblue:4734347,darkslategray:3100495,darkslategrey:3100495,darkturquoise:52945,darkviolet:9699539,deeppink:16716947,deepskyblue:49151,dimgray:6908265,dimgrey:6908265,dodgerblue:2003199,firebrick:11674146,floralwhite:16775920,forestgreen:2263842,fuchsia:16711935,gainsboro:14474460,ghostwhite:16316671,gold:16766720,goldenrod:14329120,gray:8421504,green:32768,greenyellow:11403055,grey:8421504,honeydew:15794160,hotpink:16738740,indianred:13458524,indigo:4915330,ivory:16777200,khaki:15787660,lavender:15132410,lavenderblush:16773365,lawngreen:8190976,lemonchiffon:16775885,lightblue:11393254,lightcoral:15761536,lightcyan:14745599,lightgoldenrodyellow:16448210,lightgray:13882323,lightgreen:9498256,lightgrey:13882323,lightpink:16758465,lightsalmon:16752762,lightseagreen:2142890,lightskyblue:8900346,lightslategray:7833753,lightslategrey:7833753,lightsteelblue:11584734,lightyellow:16777184,lime:65280,limegreen:3329330,linen:16445670,magenta:16711935,maroon:8388608,mediumaquamarine:6737322,mediumblue:205,mediumorchid:12211667,mediumpurple:9662683,mediumseagreen:3978097,mediumslateblue:8087790,mediumspringgreen:64154,mediumturquoise:4772300,mediumvioletred:13047173,midnightblue:1644912,mintcream:16121850,mistyrose:16770273,moccasin:16770229,navajowhite:16768685,navy:128,oldlace:16643558,olive:8421376,olivedrab:7048739,orange:16753920,orangered:16729344,orchid:14315734,palegoldenrod:15657130,palegreen:10025880,paleturquoise:11529966,palevioletred:14381203,papayawhip:16773077,peachpuff:16767673,peru:13468991,pink:16761035,plum:14524637,powderblue:11591910,purple:8388736,rebeccapurple:6697881,red:16711680,rosybrown:12357519,royalblue:4286945,saddlebrown:9127187,salmon:16416882,sandybrown:16032864,seagreen:3050327,seashell:16774638,sienna:10506797,silver:12632256,skyblue:8900331,slateblue:6970061,slategray:7372944,slategrey:7372944,snow:16775930,springgreen:65407,steelblue:4620980,tan:13808780,teal:32896,thistle:14204888,tomato:16737095,turquoise:4251856,violet:15631086,wheat:16113331,white:16777215,whitesmoke:16119285,yellow:16776960,yellowgreen:10145074},Rn={h:0,s:0,l:0},gs={h:0,s:0,l:0};function Ar(i,e,t){return t<0&&(t+=1),t>1&&(t-=1),t<1/6?i+(e-i)*6*t:t<1/2?e:t<2/3?i+(e-i)*6*(2/3-t):i}class Pe{constructor(e,t,n){return this.isColor=!0,this.r=1,this.g=1,this.b=1,this.set(e,t,n)}set(e,t,n){if(t===void 0&&n===void 0){const s=e;s&&s.isColor?this.copy(s):typeof s=="number"?this.setHex(s):typeof s=="string"&&this.setStyle(s)}else this.setRGB(e,t,n);return this}setScalar(e){return this.r=e,this.g=e,this.b=e,this}setHex(e,t=dt){return e=Math.floor(e),this.r=(e>>16&255)/255,this.g=(e>>8&255)/255,this.b=(e&255)/255,Ye.toWorkingColorSpace(this,t),this}setRGB(e,t,n,s=Ye.workingColorSpace){return this.r=e,this.g=t,this.b=n,Ye.toWorkingColorSpace(this,s),this}setHSL(e,t,n,s=Ye.workingColorSpace){if(e=nu(e,1),t=Ct(t,0,1),n=Ct(n,0,1),t===0)this.r=this.g=this.b=n;else{const r=n<=.5?n*(1+t):n+t-n*t,o=2*n-r;this.r=Ar(o,r,e+1/3),this.g=Ar(o,r,e),this.b=Ar(o,r,e-1/3)}return Ye.toWorkingColorSpace(this,s),this}setStyle(e,t=dt){function n(r){r!==void 0&&parseFloat(r)<1&&console.warn("THREE.Color: Alpha component of "+e+" will be ignored.")}let s;if(s=/^(\w+)\(([^\)]*)\)/.exec(e)){let r;const o=s[1],a=s[2];switch(o){case"rgb":case"rgba":if(r=/^\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(a))return n(r[4]),this.setRGB(Math.min(255,parseInt(r[1],10))/255,Math.min(255,parseInt(r[2],10))/255,Math.min(255,parseInt(r[3],10))/255,t);if(r=/^\s*(\d+)\%\s*,\s*(\d+)\%\s*,\s*(\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(a))return n(r[4]),this.setRGB(Math.min(100,parseInt(r[1],10))/100,Math.min(100,parseInt(r[2],10))/100,Math.min(100,parseInt(r[3],10))/100,t);break;case"hsl":case"hsla":if(r=/^\s*(\d*\.?\d+)\s*,\s*(\d*\.?\d+)\%\s*,\s*(\d*\.?\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(a))return n(r[4]),this.setHSL(parseFloat(r[1])/360,parseFloat(r[2])/100,parseFloat(r[3])/100,t);break;default:console.warn("THREE.Color: Unknown color model "+e)}}else if(s=/^\#([A-Fa-f\d]+)$/.exec(e)){const r=s[1],o=r.length;if(o===3)return this.setRGB(parseInt(r.charAt(0),16)/15,parseInt(r.charAt(1),16)/15,parseInt(r.charAt(2),16)/15,t);if(o===6)return this.setHex(parseInt(r,16),t);console.warn("THREE.Color: Invalid hex color "+e)}else if(e&&e.length>0)return this.setColorName(e,t);return this}setColorName(e,t=dt){const n=To[e.toLowerCase()];return n!==void 0?this.setHex(n,t):console.warn("THREE.Color: Unknown color "+e),this}clone(){return new this.constructor(this.r,this.g,this.b)}copy(e){return this.r=e.r,this.g=e.g,this.b=e.b,this}copySRGBToLinear(e){return this.r=ai(e.r),this.g=ai(e.g),this.b=ai(e.b),this}copyLinearToSRGB(e){return this.r=mr(e.r),this.g=mr(e.g),this.b=mr(e.b),this}convertSRGBToLinear(){return this.copySRGBToLinear(this),this}convertLinearToSRGB(){return this.copyLinearToSRGB(this),this}getHex(e=dt){return Ye.fromWorkingColorSpace(vt.copy(this),e),Math.round(Ct(vt.r*255,0,255))*65536+Math.round(Ct(vt.g*255,0,255))*256+Math.round(Ct(vt.b*255,0,255))}getHexString(e=dt){return("000000"+this.getHex(e).toString(16)).slice(-6)}getHSL(e,t=Ye.workingColorSpace){Ye.fromWorkingColorSpace(vt.copy(this),t);const n=vt.r,s=vt.g,r=vt.b,o=Math.max(n,s,r),a=Math.min(n,s,r);let l,c;const d=(a+o)/2;if(a===o)l=0,c=0;else{const p=o-a;switch(c=d<=.5?p/(o+a):p/(2-o-a),o){case n:l=(s-r)/p+(s<r?6:0);break;case s:l=(r-n)/p+2;break;case r:l=(n-s)/p+4;break}l/=6}return e.h=l,e.s=c,e.l=d,e}getRGB(e,t=Ye.workingColorSpace){return Ye.fromWorkingColorSpace(vt.copy(this),t),e.r=vt.r,e.g=vt.g,e.b=vt.b,e}getStyle(e=dt){Ye.fromWorkingColorSpace(vt.copy(this),e);const t=vt.r,n=vt.g,s=vt.b;return e!==dt?`color(${e} ${t.toFixed(3)} ${n.toFixed(3)} ${s.toFixed(3)})`:`rgb(${Math.round(t*255)},${Math.round(n*255)},${Math.round(s*255)})`}offsetHSL(e,t,n){return this.getHSL(Rn),this.setHSL(Rn.h+e,Rn.s+t,Rn.l+n)}add(e){return this.r+=e.r,this.g+=e.g,this.b+=e.b,this}addColors(e,t){return this.r=e.r+t.r,this.g=e.g+t.g,this.b=e.b+t.b,this}addScalar(e){return this.r+=e,this.g+=e,this.b+=e,this}sub(e){return this.r=Math.max(0,this.r-e.r),this.g=Math.max(0,this.g-e.g),this.b=Math.max(0,this.b-e.b),this}multiply(e){return this.r*=e.r,this.g*=e.g,this.b*=e.b,this}multiplyScalar(e){return this.r*=e,this.g*=e,this.b*=e,this}lerp(e,t){return this.r+=(e.r-this.r)*t,this.g+=(e.g-this.g)*t,this.b+=(e.b-this.b)*t,this}lerpColors(e,t,n){return this.r=e.r+(t.r-e.r)*n,this.g=e.g+(t.g-e.g)*n,this.b=e.b+(t.b-e.b)*n,this}lerpHSL(e,t){this.getHSL(Rn),e.getHSL(gs);const n=hr(Rn.h,gs.h,t),s=hr(Rn.s,gs.s,t),r=hr(Rn.l,gs.l,t);return this.setHSL(n,s,r),this}setFromVector3(e){return this.r=e.x,this.g=e.y,this.b=e.z,this}applyMatrix3(e){const t=this.r,n=this.g,s=this.b,r=e.elements;return this.r=r[0]*t+r[3]*n+r[6]*s,this.g=r[1]*t+r[4]*n+r[7]*s,this.b=r[2]*t+r[5]*n+r[8]*s,this}equals(e){return e.r===this.r&&e.g===this.g&&e.b===this.b}fromArray(e,t=0){return this.r=e[t],this.g=e[t+1],this.b=e[t+2],this}toArray(e=[],t=0){return e[t]=this.r,e[t+1]=this.g,e[t+2]=this.b,e}fromBufferAttribute(e,t){return this.r=e.getX(t),this.g=e.getY(t),this.b=e.getZ(t),this}toJSON(){return this.getHex()}*[Symbol.iterator](){yield this.r,yield this.g,yield this.b}}const vt=new Pe;Pe.NAMES=To;let _u=0;class mi extends ri{constructor(){super(),this.isMaterial=!0,Object.defineProperty(this,"id",{value:_u++}),this.uuid=Fi(),this.name="",this.type="Material",this.blending=ei,this.side=xn,this.vertexColors=!1,this.opacity=1,this.transparent=!1,this.alphaHash=!1,this.blendSrc=Ks,this.blendDst=Zs,this.blendEquation=Nn,this.blendSrcAlpha=null,this.blendDstAlpha=null,this.blendEquationAlpha=null,this.blendColor=new Pe(0,0,0),this.blendAlpha=0,this.depthFunc=Zi,this.depthTest=!0,this.depthWrite=!0,this.stencilWriteMask=255,this.stencilFunc=no,this.stencilRef=0,this.stencilFuncMask=255,this.stencilFail=si,this.stencilZFail=si,this.stencilZPass=si,this.stencilWrite=!1,this.clippingPlanes=null,this.clipIntersection=!1,this.clipShadows=!1,this.shadowSide=null,this.colorWrite=!0,this.precision=null,this.polygonOffset=!1,this.polygonOffsetFactor=0,this.polygonOffsetUnits=0,this.dithering=!1,this.alphaToCoverage=!1,this.premultipliedAlpha=!1,this.forceSinglePass=!1,this.visible=!0,this.toneMapped=!0,this.userData={},this.version=0,this._alphaTest=0}get alphaTest(){return this._alphaTest}set alphaTest(e){this._alphaTest>0!=e>0&&this.version++,this._alphaTest=e}onBuild(){}onBeforeRender(){}onBeforeCompile(){}customProgramCacheKey(){return this.onBeforeCompile.toString()}setValues(e){if(e!==void 0)for(const t in e){const n=e[t];if(n===void 0){console.warn(`THREE.Material: parameter '${t}' has value of undefined.`);continue}const s=this[t];if(s===void 0){console.warn(`THREE.Material: '${t}' is not a property of THREE.${this.type}.`);continue}s&&s.isColor?s.set(n):s&&s.isVector3&&n&&n.isVector3?s.copy(n):this[t]=n}}toJSON(e){const t=e===void 0||typeof e=="string";t&&(e={textures:{},images:{}});const n={metadata:{version:4.6,type:"Material",generator:"Material.toJSON"}};n.uuid=this.uuid,n.type=this.type,this.name!==""&&(n.name=this.name),this.color&&this.color.isColor&&(n.color=this.color.getHex()),this.roughness!==void 0&&(n.roughness=this.roughness),this.metalness!==void 0&&(n.metalness=this.metalness),this.sheen!==void 0&&(n.sheen=this.sheen),this.sheenColor&&this.sheenColor.isColor&&(n.sheenColor=this.sheenColor.getHex()),this.sheenRoughness!==void 0&&(n.sheenRoughness=this.sheenRoughness),this.emissive&&this.emissive.isColor&&(n.emissive=this.emissive.getHex()),this.emissiveIntensity&&this.emissiveIntensity!==1&&(n.emissiveIntensity=this.emissiveIntensity),this.specular&&this.specular.isColor&&(n.specular=this.specular.getHex()),this.specularIntensity!==void 0&&(n.specularIntensity=this.specularIntensity),this.specularColor&&this.specularColor.isColor&&(n.specularColor=this.specularColor.getHex()),this.shininess!==void 0&&(n.shininess=this.shininess),this.clearcoat!==void 0&&(n.clearcoat=this.clearcoat),this.clearcoatRoughness!==void 0&&(n.clearcoatRoughness=this.clearcoatRoughness),this.clearcoatMap&&this.clearcoatMap.isTexture&&(n.clearcoatMap=this.clearcoatMap.toJSON(e).uuid),this.clearcoatRoughnessMap&&this.clearcoatRoughnessMap.isTexture&&(n.clearcoatRoughnessMap=this.clearcoatRoughnessMap.toJSON(e).uuid),this.clearcoatNormalMap&&this.clearcoatNormalMap.isTexture&&(n.clearcoatNormalMap=this.clearcoatNormalMap.toJSON(e).uuid,n.clearcoatNormalScale=this.clearcoatNormalScale.toArray()),this.iridescence!==void 0&&(n.iridescence=this.iridescence),this.iridescenceIOR!==void 0&&(n.iridescenceIOR=this.iridescenceIOR),this.iridescenceThicknessRange!==void 0&&(n.iridescenceThicknessRange=this.iridescenceThicknessRange),this.iridescenceMap&&this.iridescenceMap.isTexture&&(n.iridescenceMap=this.iridescenceMap.toJSON(e).uuid),this.iridescenceThicknessMap&&this.iridescenceThicknessMap.isTexture&&(n.iridescenceThicknessMap=this.iridescenceThicknessMap.toJSON(e).uuid),this.anisotropy!==void 0&&(n.anisotropy=this.anisotropy),this.anisotropyRotation!==void 0&&(n.anisotropyRotation=this.anisotropyRotation),this.anisotropyMap&&this.anisotropyMap.isTexture&&(n.anisotropyMap=this.anisotropyMap.toJSON(e).uuid),this.map&&this.map.isTexture&&(n.map=this.map.toJSON(e).uuid),this.matcap&&this.matcap.isTexture&&(n.matcap=this.matcap.toJSON(e).uuid),this.alphaMap&&this.alphaMap.isTexture&&(n.alphaMap=this.alphaMap.toJSON(e).uuid),this.lightMap&&this.lightMap.isTexture&&(n.lightMap=this.lightMap.toJSON(e).uuid,n.lightMapIntensity=this.lightMapIntensity),this.aoMap&&this.aoMap.isTexture&&(n.aoMap=this.aoMap.toJSON(e).uuid,n.aoMapIntensity=this.aoMapIntensity),this.bumpMap&&this.bumpMap.isTexture&&(n.bumpMap=this.bumpMap.toJSON(e).uuid,n.bumpScale=this.bumpScale),this.normalMap&&this.normalMap.isTexture&&(n.normalMap=this.normalMap.toJSON(e).uuid,n.normalMapType=this.normalMapType,n.normalScale=this.normalScale.toArray()),this.displacementMap&&this.displacementMap.isTexture&&(n.displacementMap=this.displacementMap.toJSON(e).uuid,n.displacementScale=this.displacementScale,n.displacementBias=this.displacementBias),this.roughnessMap&&this.roughnessMap.isTexture&&(n.roughnessMap=this.roughnessMap.toJSON(e).uuid),this.metalnessMap&&this.metalnessMap.isTexture&&(n.metalnessMap=this.metalnessMap.toJSON(e).uuid),this.emissiveMap&&this.emissiveMap.isTexture&&(n.emissiveMap=this.emissiveMap.toJSON(e).uuid),this.specularMap&&this.specularMap.isTexture&&(n.specularMap=this.specularMap.toJSON(e).uuid),this.specularIntensityMap&&this.specularIntensityMap.isTexture&&(n.specularIntensityMap=this.specularIntensityMap.toJSON(e).uuid),this.specularColorMap&&this.specularColorMap.isTexture&&(n.specularColorMap=this.specularColorMap.toJSON(e).uuid),this.envMap&&this.envMap.isTexture&&(n.envMap=this.envMap.toJSON(e).uuid,this.combine!==void 0&&(n.combine=this.combine)),this.envMapIntensity!==void 0&&(n.envMapIntensity=this.envMapIntensity),this.reflectivity!==void 0&&(n.reflectivity=this.reflectivity),this.refractionRatio!==void 0&&(n.refractionRatio=this.refractionRatio),this.gradientMap&&this.gradientMap.isTexture&&(n.gradientMap=this.gradientMap.toJSON(e).uuid),this.transmission!==void 0&&(n.transmission=this.transmission),this.transmissionMap&&this.transmissionMap.isTexture&&(n.transmissionMap=this.transmissionMap.toJSON(e).uuid),this.thickness!==void 0&&(n.thickness=this.thickness),this.thicknessMap&&this.thicknessMap.isTexture&&(n.thicknessMap=this.thicknessMap.toJSON(e).uuid),this.attenuationDistance!==void 0&&this.attenuationDistance!==1/0&&(n.attenuationDistance=this.attenuationDistance),this.attenuationColor!==void 0&&(n.attenuationColor=this.attenuationColor.getHex()),this.size!==void 0&&(n.size=this.size),this.shadowSide!==null&&(n.shadowSide=this.shadowSide),this.sizeAttenuation!==void 0&&(n.sizeAttenuation=this.sizeAttenuation),this.blending!==ei&&(n.blending=this.blending),this.side!==xn&&(n.side=this.side),this.vertexColors===!0&&(n.vertexColors=!0),this.opacity<1&&(n.opacity=this.opacity),this.transparent===!0&&(n.transparent=!0),this.blendSrc!==Ks&&(n.blendSrc=this.blendSrc),this.blendDst!==Zs&&(n.blendDst=this.blendDst),this.blendEquation!==Nn&&(n.blendEquation=this.blendEquation),this.blendSrcAlpha!==null&&(n.blendSrcAlpha=this.blendSrcAlpha),this.blendDstAlpha!==null&&(n.blendDstAlpha=this.blendDstAlpha),this.blendEquationAlpha!==null&&(n.blendEquationAlpha=this.blendEquationAlpha),this.blendColor&&this.blendColor.isColor&&(n.blendColor=this.blendColor.getHex()),this.blendAlpha!==0&&(n.blendAlpha=this.blendAlpha),this.depthFunc!==Zi&&(n.depthFunc=this.depthFunc),this.depthTest===!1&&(n.depthTest=this.depthTest),this.depthWrite===!1&&(n.depthWrite=this.depthWrite),this.colorWrite===!1&&(n.colorWrite=this.colorWrite),this.stencilWriteMask!==255&&(n.stencilWriteMask=this.stencilWriteMask),this.stencilFunc!==no&&(n.stencilFunc=this.stencilFunc),this.stencilRef!==0&&(n.stencilRef=this.stencilRef),this.stencilFuncMask!==255&&(n.stencilFuncMask=this.stencilFuncMask),this.stencilFail!==si&&(n.stencilFail=this.stencilFail),this.stencilZFail!==si&&(n.stencilZFail=this.stencilZFail),this.stencilZPass!==si&&(n.stencilZPass=this.stencilZPass),this.stencilWrite===!0&&(n.stencilWrite=this.stencilWrite),this.rotation!==void 0&&this.rotation!==0&&(n.rotation=this.rotation),this.polygonOffset===!0&&(n.polygonOffset=!0),this.polygonOffsetFactor!==0&&(n.polygonOffsetFactor=this.polygonOffsetFactor),this.polygonOffsetUnits!==0&&(n.polygonOffsetUnits=this.polygonOffsetUnits),this.linewidth!==void 0&&this.linewidth!==1&&(n.linewidth=this.linewidth),this.dashSize!==void 0&&(n.dashSize=this.dashSize),this.gapSize!==void 0&&(n.gapSize=this.gapSize),this.scale!==void 0&&(n.scale=this.scale),this.dithering===!0&&(n.dithering=!0),this.alphaTest>0&&(n.alphaTest=this.alphaTest),this.alphaHash===!0&&(n.alphaHash=!0),this.alphaToCoverage===!0&&(n.alphaToCoverage=!0),this.premultipliedAlpha===!0&&(n.premultipliedAlpha=!0),this.forceSinglePass===!0&&(n.forceSinglePass=!0),this.wireframe===!0&&(n.wireframe=!0),this.wireframeLinewidth>1&&(n.wireframeLinewidth=this.wireframeLinewidth),this.wireframeLinecap!=="round"&&(n.wireframeLinecap=this.wireframeLinecap),this.wireframeLinejoin!=="round"&&(n.wireframeLinejoin=this.wireframeLinejoin),this.flatShading===!0&&(n.flatShading=!0),this.visible===!1&&(n.visible=!1),this.toneMapped===!1&&(n.toneMapped=!1),this.fog===!1&&(n.fog=!1),Object.keys(this.userData).length>0&&(n.userData=this.userData);function s(r){const o=[];for(const a in r){const l=r[a];delete l.metadata,o.push(l)}return o}if(t){const r=s(e.textures),o=s(e.images);r.length>0&&(n.textures=r),o.length>0&&(n.images=o)}return n}clone(){return new this.constructor().copy(this)}copy(e){this.name=e.name,this.blending=e.blending,this.side=e.side,this.vertexColors=e.vertexColors,this.opacity=e.opacity,this.transparent=e.transparent,this.blendSrc=e.blendSrc,this.blendDst=e.blendDst,this.blendEquation=e.blendEquation,this.blendSrcAlpha=e.blendSrcAlpha,this.blendDstAlpha=e.blendDstAlpha,this.blendEquationAlpha=e.blendEquationAlpha,this.blendColor.copy(e.blendColor),this.blendAlpha=e.blendAlpha,this.depthFunc=e.depthFunc,this.depthTest=e.depthTest,this.depthWrite=e.depthWrite,this.stencilWriteMask=e.stencilWriteMask,this.stencilFunc=e.stencilFunc,this.stencilRef=e.stencilRef,this.stencilFuncMask=e.stencilFuncMask,this.stencilFail=e.stencilFail,this.stencilZFail=e.stencilZFail,this.stencilZPass=e.stencilZPass,this.stencilWrite=e.stencilWrite;const t=e.clippingPlanes;let n=null;if(t!==null){const s=t.length;n=new Array(s);for(let r=0;r!==s;++r)n[r]=t[r].clone()}return this.clippingPlanes=n,this.clipIntersection=e.clipIntersection,this.clipShadows=e.clipShadows,this.shadowSide=e.shadowSide,this.colorWrite=e.colorWrite,this.precision=e.precision,this.polygonOffset=e.polygonOffset,this.polygonOffsetFactor=e.polygonOffsetFactor,this.polygonOffsetUnits=e.polygonOffsetUnits,this.dithering=e.dithering,this.alphaTest=e.alphaTest,this.alphaHash=e.alphaHash,this.alphaToCoverage=e.alphaToCoverage,this.premultipliedAlpha=e.premultipliedAlpha,this.forceSinglePass=e.forceSinglePass,this.visible=e.visible,this.toneMapped=e.toneMapped,this.userData=JSON.parse(JSON.stringify(e.userData)),this}dispose(){this.dispatchEvent({type:"dispose"})}set needsUpdate(e){e===!0&&this.version++}}class wo extends mi{constructor(e){super(),this.isMeshBasicMaterial=!0,this.type="MeshBasicMaterial",this.color=new Pe(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.combine=va,this.reflectivity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.specularMap=e.specularMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.combine=e.combine,this.reflectivity=e.reflectivity,this.refractionRatio=e.refractionRatio,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.fog=e.fog,this}}const lt=new U,_s=new qe;class Jt{constructor(e,t,n=!1){if(Array.isArray(e))throw new TypeError("THREE.BufferAttribute: array should be a Typed Array.");this.isBufferAttribute=!0,this.name="",this.array=e,this.itemSize=t,this.count=e!==void 0?e.length/t:0,this.normalized=n,this.usage=so,this._updateRange={offset:0,count:-1},this.updateRanges=[],this.gpuType=En,this.version=0}onUploadCallback(){}set needsUpdate(e){e===!0&&this.version++}get updateRange(){return console.warn("THREE.BufferAttribute: updateRange() is deprecated and will be removed in r169. Use addUpdateRange() instead."),this._updateRange}setUsage(e){return this.usage=e,this}addUpdateRange(e,t){this.updateRanges.push({start:e,count:t})}clearUpdateRanges(){this.updateRanges.length=0}copy(e){return this.name=e.name,this.array=new e.array.constructor(e.array),this.itemSize=e.itemSize,this.count=e.count,this.normalized=e.normalized,this.usage=e.usage,this.gpuType=e.gpuType,this}copyAt(e,t,n){e*=this.itemSize,n*=t.itemSize;for(let s=0,r=this.itemSize;s<r;s++)this.array[e+s]=t.array[n+s];return this}copyArray(e){return this.array.set(e),this}applyMatrix3(e){if(this.itemSize===2)for(let t=0,n=this.count;t<n;t++)_s.fromBufferAttribute(this,t),_s.applyMatrix3(e),this.setXY(t,_s.x,_s.y);else if(this.itemSize===3)for(let t=0,n=this.count;t<n;t++)lt.fromBufferAttribute(this,t),lt.applyMatrix3(e),this.setXYZ(t,lt.x,lt.y,lt.z);return this}applyMatrix4(e){for(let t=0,n=this.count;t<n;t++)lt.fromBufferAttribute(this,t),lt.applyMatrix4(e),this.setXYZ(t,lt.x,lt.y,lt.z);return this}applyNormalMatrix(e){for(let t=0,n=this.count;t<n;t++)lt.fromBufferAttribute(this,t),lt.applyNormalMatrix(e),this.setXYZ(t,lt.x,lt.y,lt.z);return this}transformDirection(e){for(let t=0,n=this.count;t<n;t++)lt.fromBufferAttribute(this,t),lt.transformDirection(e),this.setXYZ(t,lt.x,lt.y,lt.z);return this}set(e,t=0){return this.array.set(e,t),this}getComponent(e,t){let n=this.array[e*this.itemSize+t];return this.normalized&&(n=Oi(n,this.array)),n}setComponent(e,t,n){return this.normalized&&(n=Lt(n,this.array)),this.array[e*this.itemSize+t]=n,this}getX(e){let t=this.array[e*this.itemSize];return this.normalized&&(t=Oi(t,this.array)),t}setX(e,t){return this.normalized&&(t=Lt(t,this.array)),this.array[e*this.itemSize]=t,this}getY(e){let t=this.array[e*this.itemSize+1];return this.normalized&&(t=Oi(t,this.array)),t}setY(e,t){return this.normalized&&(t=Lt(t,this.array)),this.array[e*this.itemSize+1]=t,this}getZ(e){let t=this.array[e*this.itemSize+2];return this.normalized&&(t=Oi(t,this.array)),t}setZ(e,t){return this.normalized&&(t=Lt(t,this.array)),this.array[e*this.itemSize+2]=t,this}getW(e){let t=this.array[e*this.itemSize+3];return this.normalized&&(t=Oi(t,this.array)),t}setW(e,t){return this.normalized&&(t=Lt(t,this.array)),this.array[e*this.itemSize+3]=t,this}setXY(e,t,n){return e*=this.itemSize,this.normalized&&(t=Lt(t,this.array),n=Lt(n,this.array)),this.array[e+0]=t,this.array[e+1]=n,this}setXYZ(e,t,n,s){return e*=this.itemSize,this.normalized&&(t=Lt(t,this.array),n=Lt(n,this.array),s=Lt(s,this.array)),this.array[e+0]=t,this.array[e+1]=n,this.array[e+2]=s,this}setXYZW(e,t,n,s,r){return e*=this.itemSize,this.normalized&&(t=Lt(t,this.array),n=Lt(n,this.array),s=Lt(s,this.array),r=Lt(r,this.array)),this.array[e+0]=t,this.array[e+1]=n,this.array[e+2]=s,this.array[e+3]=r,this}onUpload(e){return this.onUploadCallback=e,this}clone(){return new this.constructor(this.array,this.itemSize).copy(this)}toJSON(){const e={itemSize:this.itemSize,type:this.array.constructor.name,array:Array.from(this.array),normalized:this.normalized};return this.name!==""&&(e.name=this.name),this.usage!==so&&(e.usage=this.usage),e}}class Ao extends Jt{constructor(e,t,n){super(new Uint16Array(e),t,n)}}class Ro extends Jt{constructor(e,t,n){super(new Uint32Array(e),t,n)}}class Zt extends Jt{constructor(e,t,n){super(new Float32Array(e),t,n)}}let xu=0;const Gt=new ot,Rr=new ft,gi=new U,Nt=new Hi,Xi=new Hi,pt=new U;class dn extends ri{constructor(){super(),this.isBufferGeometry=!0,Object.defineProperty(this,"id",{value:xu++}),this.uuid=Fi(),this.name="",this.type="BufferGeometry",this.index=null,this.attributes={},this.morphAttributes={},this.morphTargetsRelative=!1,this.groups=[],this.boundingBox=null,this.boundingSphere=null,this.drawRange={start:0,count:1/0},this.userData={}}getIndex(){return this.index}setIndex(e){return Array.isArray(e)?this.index=new(oo(e)?Ro:Ao)(e,1):this.index=e,this}getAttribute(e){return this.attributes[e]}setAttribute(e,t){return this.attributes[e]=t,this}deleteAttribute(e){return delete this.attributes[e],this}hasAttribute(e){return this.attributes[e]!==void 0}addGroup(e,t,n=0){this.groups.push({start:e,count:t,materialIndex:n})}clearGroups(){this.groups=[]}setDrawRange(e,t){this.drawRange.start=e,this.drawRange.count=t}applyMatrix4(e){const t=this.attributes.position;t!==void 0&&(t.applyMatrix4(e),t.needsUpdate=!0);const n=this.attributes.normal;if(n!==void 0){const r=new ke().getNormalMatrix(e);n.applyNormalMatrix(r),n.needsUpdate=!0}const s=this.attributes.tangent;return s!==void 0&&(s.transformDirection(e),s.needsUpdate=!0),this.boundingBox!==null&&this.computeBoundingBox(),this.boundingSphere!==null&&this.computeBoundingSphere(),this}applyQuaternion(e){return Gt.makeRotationFromQuaternion(e),this.applyMatrix4(Gt),this}rotateX(e){return Gt.makeRotationX(e),this.applyMatrix4(Gt),this}rotateY(e){return Gt.makeRotationY(e),this.applyMatrix4(Gt),this}rotateZ(e){return Gt.makeRotationZ(e),this.applyMatrix4(Gt),this}translate(e,t,n){return Gt.makeTranslation(e,t,n),this.applyMatrix4(Gt),this}scale(e,t,n){return Gt.makeScale(e,t,n),this.applyMatrix4(Gt),this}lookAt(e){return Rr.lookAt(e),Rr.updateMatrix(),this.applyMatrix4(Rr.matrix),this}center(){return this.computeBoundingBox(),this.boundingBox.getCenter(gi).negate(),this.translate(gi.x,gi.y,gi.z),this}setFromPoints(e){const t=[];for(let n=0,s=e.length;n<s;n++){const r=e[n];t.push(r.x,r.y,r.z||0)}return this.setAttribute("position",new Zt(t,3)),this}computeBoundingBox(){this.boundingBox===null&&(this.boundingBox=new Hi);const e=this.attributes.position,t=this.morphAttributes.position;if(e&&e.isGLBufferAttribute){console.error('THREE.BufferGeometry.computeBoundingBox(): GLBufferAttribute requires a manual bounding box. Alternatively set "mesh.frustumCulled" to "false".',this),this.boundingBox.set(new U(-1/0,-1/0,-1/0),new U(1/0,1/0,1/0));return}if(e!==void 0){if(this.boundingBox.setFromBufferAttribute(e),t)for(let n=0,s=t.length;n<s;n++){const r=t[n];Nt.setFromBufferAttribute(r),this.morphTargetsRelative?(pt.addVectors(this.boundingBox.min,Nt.min),this.boundingBox.expandByPoint(pt),pt.addVectors(this.boundingBox.max,Nt.max),this.boundingBox.expandByPoint(pt)):(this.boundingBox.expandByPoint(Nt.min),this.boundingBox.expandByPoint(Nt.max))}}else this.boundingBox.makeEmpty();(isNaN(this.boundingBox.min.x)||isNaN(this.boundingBox.min.y)||isNaN(this.boundingBox.min.z))&&console.error('THREE.BufferGeometry.computeBoundingBox(): Computed min/max have NaN values. The "position" attribute is likely to have NaN values.',this)}computeBoundingSphere(){this.boundingSphere===null&&(this.boundingSphere=new cs);const e=this.attributes.position,t=this.morphAttributes.position;if(e&&e.isGLBufferAttribute){console.error('THREE.BufferGeometry.computeBoundingSphere(): GLBufferAttribute requires a manual bounding sphere. Alternatively set "mesh.frustumCulled" to "false".',this),this.boundingSphere.set(new U,1/0);return}if(e){const n=this.boundingSphere.center;if(Nt.setFromBufferAttribute(e),t)for(let r=0,o=t.length;r<o;r++){const a=t[r];Xi.setFromBufferAttribute(a),this.morphTargetsRelative?(pt.addVectors(Nt.min,Xi.min),Nt.expandByPoint(pt),pt.addVectors(Nt.max,Xi.max),Nt.expandByPoint(pt)):(Nt.expandByPoint(Xi.min),Nt.expandByPoint(Xi.max))}Nt.getCenter(n);let s=0;for(let r=0,o=e.count;r<o;r++)pt.fromBufferAttribute(e,r),s=Math.max(s,n.distanceToSquared(pt));if(t)for(let r=0,o=t.length;r<o;r++){const a=t[r],l=this.morphTargetsRelative;for(let c=0,d=a.count;c<d;c++)pt.fromBufferAttribute(a,c),l&&(gi.fromBufferAttribute(e,c),pt.add(gi)),s=Math.max(s,n.distanceToSquared(pt))}this.boundingSphere.radius=Math.sqrt(s),isNaN(this.boundingSphere.radius)&&console.error('THREE.BufferGeometry.computeBoundingSphere(): Computed radius is NaN. The "position" attribute is likely to have NaN values.',this)}}computeTangents(){const e=this.index,t=this.attributes;if(e===null||t.position===void 0||t.normal===void 0||t.uv===void 0){console.error("THREE.BufferGeometry: .computeTangents() failed. Missing required attributes (index, position, normal or uv)");return}const n=e.array,s=t.position.array,r=t.normal.array,o=t.uv.array,a=s.length/3;this.hasAttribute("tangent")===!1&&this.setAttribute("tangent",new Jt(new Float32Array(4*a),4));const l=this.getAttribute("tangent").array,c=[],d=[];for(let b=0;b<a;b++)c[b]=new U,d[b]=new U;const p=new U,f=new U,m=new U,g=new qe,_=new qe,h=new qe,u=new U,y=new U;function x(b,k,$){p.fromArray(s,b*3),f.fromArray(s,k*3),m.fromArray(s,$*3),g.fromArray(o,b*2),_.fromArray(o,k*2),h.fromArray(o,$*2),f.sub(p),m.sub(p),_.sub(g),h.sub(g);const ie=1/(_.x*h.y-h.x*_.y);isFinite(ie)&&(u.copy(f).multiplyScalar(h.y).addScaledVector(m,-_.y).multiplyScalar(ie),y.copy(m).multiplyScalar(_.x).addScaledVector(f,-h.x).multiplyScalar(ie),c[b].add(u),c[k].add(u),c[$].add(u),d[b].add(y),d[k].add(y),d[$].add(y))}let T=this.groups;T.length===0&&(T=[{start:0,count:n.length}]);for(let b=0,k=T.length;b<k;++b){const $=T[b],ie=$.start,C=$.count;for(let z=ie,G=ie+C;z<G;z+=3)x(n[z+0],n[z+1],n[z+2])}const L=new U,w=new U,A=new U,X=new U;function S(b){A.fromArray(r,b*3),X.copy(A);const k=c[b];L.copy(k),L.sub(A.multiplyScalar(A.dot(k))).normalize(),w.crossVectors(X,k);const ie=w.dot(d[b])<0?-1:1;l[b*4]=L.x,l[b*4+1]=L.y,l[b*4+2]=L.z,l[b*4+3]=ie}for(let b=0,k=T.length;b<k;++b){const $=T[b],ie=$.start,C=$.count;for(let z=ie,G=ie+C;z<G;z+=3)S(n[z+0]),S(n[z+1]),S(n[z+2])}}computeVertexNormals(){const e=this.index,t=this.getAttribute("position");if(t!==void 0){let n=this.getAttribute("normal");if(n===void 0)n=new Jt(new Float32Array(t.count*3),3),this.setAttribute("normal",n);else for(let f=0,m=n.count;f<m;f++)n.setXYZ(f,0,0,0);const s=new U,r=new U,o=new U,a=new U,l=new U,c=new U,d=new U,p=new U;if(e)for(let f=0,m=e.count;f<m;f+=3){const g=e.getX(f+0),_=e.getX(f+1),h=e.getX(f+2);s.fromBufferAttribute(t,g),r.fromBufferAttribute(t,_),o.fromBufferAttribute(t,h),d.subVectors(o,r),p.subVectors(s,r),d.cross(p),a.fromBufferAttribute(n,g),l.fromBufferAttribute(n,_),c.fromBufferAttribute(n,h),a.add(d),l.add(d),c.add(d),n.setXYZ(g,a.x,a.y,a.z),n.setXYZ(_,l.x,l.y,l.z),n.setXYZ(h,c.x,c.y,c.z)}else for(let f=0,m=t.count;f<m;f+=3)s.fromBufferAttribute(t,f+0),r.fromBufferAttribute(t,f+1),o.fromBufferAttribute(t,f+2),d.subVectors(o,r),p.subVectors(s,r),d.cross(p),n.setXYZ(f+0,d.x,d.y,d.z),n.setXYZ(f+1,d.x,d.y,d.z),n.setXYZ(f+2,d.x,d.y,d.z);this.normalizeNormals(),n.needsUpdate=!0}}normalizeNormals(){const e=this.attributes.normal;for(let t=0,n=e.count;t<n;t++)pt.fromBufferAttribute(e,t),pt.normalize(),e.setXYZ(t,pt.x,pt.y,pt.z)}toNonIndexed(){function e(a,l){const c=a.array,d=a.itemSize,p=a.normalized,f=new c.constructor(l.length*d);let m=0,g=0;for(let _=0,h=l.length;_<h;_++){a.isInterleavedBufferAttribute?m=l[_]*a.data.stride+a.offset:m=l[_]*d;for(let u=0;u<d;u++)f[g++]=c[m++]}return new Jt(f,d,p)}if(this.index===null)return console.warn("THREE.BufferGeometry.toNonIndexed(): BufferGeometry is already non-indexed."),this;const t=new dn,n=this.index.array,s=this.attributes;for(const a in s){const l=s[a],c=e(l,n);t.setAttribute(a,c)}const r=this.morphAttributes;for(const a in r){const l=[],c=r[a];for(let d=0,p=c.length;d<p;d++){const f=c[d],m=e(f,n);l.push(m)}t.morphAttributes[a]=l}t.morphTargetsRelative=this.morphTargetsRelative;const o=this.groups;for(let a=0,l=o.length;a<l;a++){const c=o[a];t.addGroup(c.start,c.count,c.materialIndex)}return t}toJSON(){const e={metadata:{version:4.6,type:"BufferGeometry",generator:"BufferGeometry.toJSON"}};if(e.uuid=this.uuid,e.type=this.type,this.name!==""&&(e.name=this.name),Object.keys(this.userData).length>0&&(e.userData=this.userData),this.parameters!==void 0){const l=this.parameters;for(const c in l)l[c]!==void 0&&(e[c]=l[c]);return e}e.data={attributes:{}};const t=this.index;t!==null&&(e.data.index={type:t.array.constructor.name,array:Array.prototype.slice.call(t.array)});const n=this.attributes;for(const l in n){const c=n[l];e.data.attributes[l]=c.toJSON(e.data)}const s={};let r=!1;for(const l in this.morphAttributes){const c=this.morphAttributes[l],d=[];for(let p=0,f=c.length;p<f;p++){const m=c[p];d.push(m.toJSON(e.data))}d.length>0&&(s[l]=d,r=!0)}r&&(e.data.morphAttributes=s,e.data.morphTargetsRelative=this.morphTargetsRelative);const o=this.groups;o.length>0&&(e.data.groups=JSON.parse(JSON.stringify(o)));const a=this.boundingSphere;return a!==null&&(e.data.boundingSphere={center:a.center.toArray(),radius:a.radius}),e}clone(){return new this.constructor().copy(this)}copy(e){this.index=null,this.attributes={},this.morphAttributes={},this.groups=[],this.boundingBox=null,this.boundingSphere=null;const t={};this.name=e.name;const n=e.index;n!==null&&this.setIndex(n.clone(t));const s=e.attributes;for(const c in s){const d=s[c];this.setAttribute(c,d.clone(t))}const r=e.morphAttributes;for(const c in r){const d=[],p=r[c];for(let f=0,m=p.length;f<m;f++)d.push(p[f].clone(t));this.morphAttributes[c]=d}this.morphTargetsRelative=e.morphTargetsRelative;const o=e.groups;for(let c=0,d=o.length;c<d;c++){const p=o[c];this.addGroup(p.start,p.count,p.materialIndex)}const a=e.boundingBox;a!==null&&(this.boundingBox=a.clone());const l=e.boundingSphere;return l!==null&&(this.boundingSphere=l.clone()),this.drawRange.start=e.drawRange.start,this.drawRange.count=e.drawRange.count,this.userData=e.userData,this}dispose(){this.dispatchEvent({type:"dispose"})}}const Co=new ot,Gn=new go,xs=new cs,Lo=new U,_i=new U,xi=new U,vi=new U,Cr=new U,vs=new U,Ms=new qe,Ss=new qe,ys=new qe,Po=new U,Do=new U,Uo=new U,Es=new U,bs=new U;class Vt extends ft{constructor(e=new dn,t=new wo){super(),this.isMesh=!0,this.type="Mesh",this.geometry=e,this.material=t,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),e.morphTargetInfluences!==void 0&&(this.morphTargetInfluences=e.morphTargetInfluences.slice()),e.morphTargetDictionary!==void 0&&(this.morphTargetDictionary=Object.assign({},e.morphTargetDictionary)),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}updateMorphTargets(){const t=this.geometry.morphAttributes,n=Object.keys(t);if(n.length>0){const s=t[n[0]];if(s!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let r=0,o=s.length;r<o;r++){const a=s[r].name||String(r);this.morphTargetInfluences.push(0),this.morphTargetDictionary[a]=r}}}}getVertexPosition(e,t){const n=this.geometry,s=n.attributes.position,r=n.morphAttributes.position,o=n.morphTargetsRelative;t.fromBufferAttribute(s,e);const a=this.morphTargetInfluences;if(r&&a){vs.set(0,0,0);for(let l=0,c=r.length;l<c;l++){const d=a[l],p=r[l];d!==0&&(Cr.fromBufferAttribute(p,e),o?vs.addScaledVector(Cr,d):vs.addScaledVector(Cr.sub(t),d))}t.add(vs)}return t}raycast(e,t){const n=this.geometry,s=this.material,r=this.matrixWorld;s!==void 0&&(n.boundingSphere===null&&n.computeBoundingSphere(),xs.copy(n.boundingSphere),xs.applyMatrix4(r),Gn.copy(e.ray).recast(e.near),!(xs.containsPoint(Gn.origin)===!1&&(Gn.intersectSphere(xs,Lo)===null||Gn.origin.distanceToSquared(Lo)>(e.far-e.near)**2))&&(Co.copy(r).invert(),Gn.copy(e.ray).applyMatrix4(Co),!(n.boundingBox!==null&&Gn.intersectsBox(n.boundingBox)===!1)&&this._computeIntersections(e,t,Gn)))}_computeIntersections(e,t,n){let s;const r=this.geometry,o=this.material,a=r.index,l=r.attributes.position,c=r.attributes.uv,d=r.attributes.uv1,p=r.attributes.normal,f=r.groups,m=r.drawRange;if(a!==null)if(Array.isArray(o))for(let g=0,_=f.length;g<_;g++){const h=f[g],u=o[h.materialIndex],y=Math.max(h.start,m.start),x=Math.min(a.count,Math.min(h.start+h.count,m.start+m.count));for(let T=y,L=x;T<L;T+=3){const w=a.getX(T),A=a.getX(T+1),X=a.getX(T+2);s=Ts(this,u,e,n,c,d,p,w,A,X),s&&(s.faceIndex=Math.floor(T/3),s.face.materialIndex=h.materialIndex,t.push(s))}}else{const g=Math.max(0,m.start),_=Math.min(a.count,m.start+m.count);for(let h=g,u=_;h<u;h+=3){const y=a.getX(h),x=a.getX(h+1),T=a.getX(h+2);s=Ts(this,o,e,n,c,d,p,y,x,T),s&&(s.faceIndex=Math.floor(h/3),t.push(s))}}else if(l!==void 0)if(Array.isArray(o))for(let g=0,_=f.length;g<_;g++){const h=f[g],u=o[h.materialIndex],y=Math.max(h.start,m.start),x=Math.min(l.count,Math.min(h.start+h.count,m.start+m.count));for(let T=y,L=x;T<L;T+=3){const w=T,A=T+1,X=T+2;s=Ts(this,u,e,n,c,d,p,w,A,X),s&&(s.faceIndex=Math.floor(T/3),s.face.materialIndex=h.materialIndex,t.push(s))}}else{const g=Math.max(0,m.start),_=Math.min(l.count,m.start+m.count);for(let h=g,u=_;h<u;h+=3){const y=h,x=h+1,T=h+2;s=Ts(this,o,e,n,c,d,p,y,x,T),s&&(s.faceIndex=Math.floor(h/3),t.push(s))}}}}function vu(i,e,t,n,s,r,o,a){let l;if(e.side===Rt?l=n.intersectTriangle(o,r,s,!0,a):l=n.intersectTriangle(s,r,o,e.side===xn,a),l===null)return null;bs.copy(a),bs.applyMatrix4(i.matrixWorld);const c=t.ray.origin.distanceTo(bs);return c<t.near||c>t.far?null:{distance:c,point:bs.clone(),object:i}}function Ts(i,e,t,n,s,r,o,a,l,c){i.getVertexPosition(a,_i),i.getVertexPosition(l,xi),i.getVertexPosition(c,vi);const d=vu(i,e,t,n,_i,xi,vi,Es);if(d){s&&(Ms.fromBufferAttribute(s,a),Ss.fromBufferAttribute(s,l),ys.fromBufferAttribute(s,c),d.uv=Kt.getInterpolation(Es,_i,xi,vi,Ms,Ss,ys,new qe)),r&&(Ms.fromBufferAttribute(r,a),Ss.fromBufferAttribute(r,l),ys.fromBufferAttribute(r,c),d.uv1=Kt.getInterpolation(Es,_i,xi,vi,Ms,Ss,ys,new qe),d.uv2=d.uv1),o&&(Po.fromBufferAttribute(o,a),Do.fromBufferAttribute(o,l),Uo.fromBufferAttribute(o,c),d.normal=Kt.getInterpolation(Es,_i,xi,vi,Po,Do,Uo,new U),d.normal.dot(n.direction)>0&&d.normal.multiplyScalar(-1));const p={a,b:l,c,normal:new U,materialIndex:0};Kt.getNormal(_i,xi,vi,p.normal),d.face=p}return d}class Cn extends dn{constructor(e=1,t=1,n=1,s=1,r=1,o=1){super(),this.type="BoxGeometry",this.parameters={width:e,height:t,depth:n,widthSegments:s,heightSegments:r,depthSegments:o};const a=this;s=Math.floor(s),r=Math.floor(r),o=Math.floor(o);const l=[],c=[],d=[],p=[];let f=0,m=0;g("z","y","x",-1,-1,n,t,e,o,r,0),g("z","y","x",1,-1,n,t,-e,o,r,1),g("x","z","y",1,1,e,n,t,s,o,2),g("x","z","y",1,-1,e,n,-t,s,o,3),g("x","y","z",1,-1,e,t,n,s,r,4),g("x","y","z",-1,-1,e,t,-n,s,r,5),this.setIndex(l),this.setAttribute("position",new Zt(c,3)),this.setAttribute("normal",new Zt(d,3)),this.setAttribute("uv",new Zt(p,2));function g(_,h,u,y,x,T,L,w,A,X,S){const b=T/A,k=L/X,$=T/2,ie=L/2,C=w/2,z=A+1,G=X+1;let Y=0,V=0;const D=new U;for(let W=0;W<G;W++){const j=W*k-ie;for(let ae=0;ae<z;ae++){const H=ae*b-$;D[_]=H*y,D[h]=j*x,D[u]=C,c.push(D.x,D.y,D.z),D[_]=0,D[h]=0,D[u]=w>0?1:-1,d.push(D.x,D.y,D.z),p.push(ae/A),p.push(1-W/X),Y+=1}}for(let W=0;W<X;W++)for(let j=0;j<A;j++){const ae=f+j+z*W,H=f+j+z*(W+1),q=f+(j+1)+z*(W+1),le=f+(j+1)+z*W;l.push(ae,H,le),l.push(H,q,le),V+=6}a.addGroup(m,V,S),m+=V,f+=Y}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new Cn(e.width,e.height,e.depth,e.widthSegments,e.heightSegments,e.depthSegments)}}function Mi(i){const e={};for(const t in i){e[t]={};for(const n in i[t]){const s=i[t][n];s&&(s.isColor||s.isMatrix3||s.isMatrix4||s.isVector2||s.isVector3||s.isVector4||s.isTexture||s.isQuaternion)?s.isRenderTargetTexture?(console.warn("UniformsUtils: Textures of render targets cannot be cloned via cloneUniforms() or mergeUniforms()."),e[t][n]=null):e[t][n]=s.clone():Array.isArray(s)?e[t][n]=s.slice():e[t][n]=s}}return e}function Et(i){const e={};for(let t=0;t<i.length;t++){const n=Mi(i[t]);for(const s in n)e[s]=n[s]}return e}function Mu(i){const e=[];for(let t=0;t<i.length;t++)e.push(i[t].clone());return e}function Io(i){return i.getRenderTarget()===null?i.outputColorSpace:Ye.workingColorSpace}const Su={clone:Mi,merge:Et};var yu=`void main() {
	gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
}`,Eu=`void main() {
	gl_FragColor = vec4( 1.0, 0.0, 0.0, 1.0 );
}`;class Vn extends mi{constructor(e){super(),this.isShaderMaterial=!0,this.type="ShaderMaterial",this.defines={},this.uniforms={},this.uniformsGroups=[],this.vertexShader=yu,this.fragmentShader=Eu,this.linewidth=1,this.wireframe=!1,this.wireframeLinewidth=1,this.fog=!1,this.lights=!1,this.clipping=!1,this.forceSinglePass=!0,this.extensions={derivatives:!1,fragDepth:!1,drawBuffers:!1,shaderTextureLOD:!1,clipCullDistance:!1},this.defaultAttributeValues={color:[1,1,1],uv:[0,0],uv1:[0,0]},this.index0AttributeName=void 0,this.uniformsNeedUpdate=!1,this.glslVersion=null,e!==void 0&&this.setValues(e)}copy(e){return super.copy(e),this.fragmentShader=e.fragmentShader,this.vertexShader=e.vertexShader,this.uniforms=Mi(e.uniforms),this.uniformsGroups=Mu(e.uniformsGroups),this.defines=Object.assign({},e.defines),this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.fog=e.fog,this.lights=e.lights,this.clipping=e.clipping,this.extensions=Object.assign({},e.extensions),this.glslVersion=e.glslVersion,this}toJSON(e){const t=super.toJSON(e);t.glslVersion=this.glslVersion,t.uniforms={};for(const s in this.uniforms){const o=this.uniforms[s].value;o&&o.isTexture?t.uniforms[s]={type:"t",value:o.toJSON(e).uuid}:o&&o.isColor?t.uniforms[s]={type:"c",value:o.getHex()}:o&&o.isVector2?t.uniforms[s]={type:"v2",value:o.toArray()}:o&&o.isVector3?t.uniforms[s]={type:"v3",value:o.toArray()}:o&&o.isVector4?t.uniforms[s]={type:"v4",value:o.toArray()}:o&&o.isMatrix3?t.uniforms[s]={type:"m3",value:o.toArray()}:o&&o.isMatrix4?t.uniforms[s]={type:"m4",value:o.toArray()}:t.uniforms[s]={value:o}}Object.keys(this.defines).length>0&&(t.defines=this.defines),t.vertexShader=this.vertexShader,t.fragmentShader=this.fragmentShader,t.lights=this.lights,t.clipping=this.clipping;const n={};for(const s in this.extensions)this.extensions[s]===!0&&(n[s]=!0);return Object.keys(n).length>0&&(t.extensions=n),t}}class No extends ft{constructor(){super(),this.isCamera=!0,this.type="Camera",this.matrixWorldInverse=new ot,this.projectionMatrix=new ot,this.projectionMatrixInverse=new ot,this.coordinateSystem=rn}copy(e,t){return super.copy(e,t),this.matrixWorldInverse.copy(e.matrixWorldInverse),this.projectionMatrix.copy(e.projectionMatrix),this.projectionMatrixInverse.copy(e.projectionMatrixInverse),this.coordinateSystem=e.coordinateSystem,this}getWorldDirection(e){return super.getWorldDirection(e).negate()}updateMatrixWorld(e){super.updateMatrixWorld(e),this.matrixWorldInverse.copy(this.matrixWorld).invert()}updateWorldMatrix(e,t){super.updateWorldMatrix(e,t),this.matrixWorldInverse.copy(this.matrixWorld).invert()}clone(){return new this.constructor().copy(this)}}class Wt extends No{constructor(e=50,t=1,n=.1,s=2e3){super(),this.isPerspectiveCamera=!0,this.type="PerspectiveCamera",this.fov=e,this.zoom=1,this.near=n,this.far=s,this.focus=10,this.aspect=t,this.view=null,this.filmGauge=35,this.filmOffset=0,this.updateProjectionMatrix()}copy(e,t){return super.copy(e,t),this.fov=e.fov,this.zoom=e.zoom,this.near=e.near,this.far=e.far,this.focus=e.focus,this.aspect=e.aspect,this.view=e.view===null?null:Object.assign({},e.view),this.filmGauge=e.filmGauge,this.filmOffset=e.filmOffset,this}setFocalLength(e){const t=.5*this.getFilmHeight()/e;this.fov=dr*2*Math.atan(t),this.updateProjectionMatrix()}getFocalLength(){const e=Math.tan(ur*.5*this.fov);return .5*this.getFilmHeight()/e}getEffectiveFOV(){return dr*2*Math.atan(Math.tan(ur*.5*this.fov)/this.zoom)}getFilmWidth(){return this.filmGauge*Math.min(this.aspect,1)}getFilmHeight(){return this.filmGauge/Math.max(this.aspect,1)}setViewOffset(e,t,n,s,r,o){this.aspect=e/t,this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=t,this.view.offsetX=n,this.view.offsetY=s,this.view.width=r,this.view.height=o,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const e=this.near;let t=e*Math.tan(ur*.5*this.fov)/this.zoom,n=2*t,s=this.aspect*n,r=-.5*s;const o=this.view;if(this.view!==null&&this.view.enabled){const l=o.fullWidth,c=o.fullHeight;r+=o.offsetX*s/l,t-=o.offsetY*n/c,s*=o.width/l,n*=o.height/c}const a=this.filmOffset;a!==0&&(r+=e*a/this.getFilmWidth()),this.projectionMatrix.makePerspective(r,r+s,t,t-n,e,this.far,this.coordinateSystem),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){const t=super.toJSON(e);return t.object.fov=this.fov,t.object.zoom=this.zoom,t.object.near=this.near,t.object.far=this.far,t.object.focus=this.focus,t.object.aspect=this.aspect,this.view!==null&&(t.object.view=Object.assign({},this.view)),t.object.filmGauge=this.filmGauge,t.object.filmOffset=this.filmOffset,t}}const Si=-90,yi=1;class bu extends ft{constructor(e,t,n){super(),this.type="CubeCamera",this.renderTarget=n,this.coordinateSystem=null,this.activeMipmapLevel=0;const s=new Wt(Si,yi,e,t);s.layers=this.layers,this.add(s);const r=new Wt(Si,yi,e,t);r.layers=this.layers,this.add(r);const o=new Wt(Si,yi,e,t);o.layers=this.layers,this.add(o);const a=new Wt(Si,yi,e,t);a.layers=this.layers,this.add(a);const l=new Wt(Si,yi,e,t);l.layers=this.layers,this.add(l);const c=new Wt(Si,yi,e,t);c.layers=this.layers,this.add(c)}updateCoordinateSystem(){const e=this.coordinateSystem,t=this.children.concat(),[n,s,r,o,a,l]=t;for(const c of t)this.remove(c);if(e===rn)n.up.set(0,1,0),n.lookAt(1,0,0),s.up.set(0,1,0),s.lookAt(-1,0,0),r.up.set(0,0,-1),r.lookAt(0,1,0),o.up.set(0,0,1),o.lookAt(0,-1,0),a.up.set(0,1,0),a.lookAt(0,0,1),l.up.set(0,1,0),l.lookAt(0,0,-1);else if(e===ss)n.up.set(0,-1,0),n.lookAt(-1,0,0),s.up.set(0,-1,0),s.lookAt(1,0,0),r.up.set(0,0,1),r.lookAt(0,1,0),o.up.set(0,0,-1),o.lookAt(0,-1,0),a.up.set(0,-1,0),a.lookAt(0,0,1),l.up.set(0,-1,0),l.lookAt(0,0,-1);else throw new Error("THREE.CubeCamera.updateCoordinateSystem(): Invalid coordinate system: "+e);for(const c of t)this.add(c),c.updateMatrixWorld()}update(e,t){this.parent===null&&this.updateMatrixWorld();const{renderTarget:n,activeMipmapLevel:s}=this;this.coordinateSystem!==e.coordinateSystem&&(this.coordinateSystem=e.coordinateSystem,this.updateCoordinateSystem());const[r,o,a,l,c,d]=this.children,p=e.getRenderTarget(),f=e.getActiveCubeFace(),m=e.getActiveMipmapLevel(),g=e.xr.enabled;e.xr.enabled=!1;const _=n.texture.generateMipmaps;n.texture.generateMipmaps=!1,e.setRenderTarget(n,0,s),e.render(t,r),e.setRenderTarget(n,1,s),e.render(t,o),e.setRenderTarget(n,2,s),e.render(t,a),e.setRenderTarget(n,3,s),e.render(t,l),e.setRenderTarget(n,4,s),e.render(t,c),n.texture.generateMipmaps=_,e.setRenderTarget(n,5,s),e.render(t,d),e.setRenderTarget(p,f,m),e.xr.enabled=g,n.texture.needsPMREMUpdate=!0}}class Fo extends yt{constructor(e,t,n,s,r,o,a,l,c,d){e=e!==void 0?e:[],t=t!==void 0?t:ti,super(e,t,n,s,r,o,a,l,c,d),this.isCubeTexture=!0,this.flipY=!1}get images(){return this.image}set images(e){this.image=e}}class Tu extends Bn{constructor(e=1,t={}){super(e,e,t),this.isWebGLCubeRenderTarget=!0;const n={width:e,height:e,depth:1},s=[n,n,n,n,n,n];t.encoding!==void 0&&(Bi("THREE.WebGLCubeRenderTarget: option.encoding has been replaced by option.colorSpace."),t.colorSpace=t.encoding===zn?dt:Ht),this.texture=new Fo(s,t.mapping,t.wrapS,t.wrapT,t.magFilter,t.minFilter,t.format,t.type,t.anisotropy,t.colorSpace),this.texture.isRenderTargetTexture=!0,this.texture.generateMipmaps=t.generateMipmaps!==void 0?t.generateMipmaps:!1,this.texture.minFilter=t.minFilter!==void 0?t.minFilter:kt}fromEquirectangularTexture(e,t){this.texture.type=t.type,this.texture.colorSpace=t.colorSpace,this.texture.generateMipmaps=t.generateMipmaps,this.texture.minFilter=t.minFilter,this.texture.magFilter=t.magFilter;const n={uniforms:{tEquirect:{value:null}},vertexShader:`

				varying vec3 vWorldDirection;

				vec3 transformDirection( in vec3 dir, in mat4 matrix ) {

					return normalize( ( matrix * vec4( dir, 0.0 ) ).xyz );

				}

				void main() {

					vWorldDirection = transformDirection( position, modelMatrix );

					#include <begin_vertex>
					#include <project_vertex>

				}
			`,fragmentShader:`

				uniform sampler2D tEquirect;

				varying vec3 vWorldDirection;

				#include <common>

				void main() {

					vec3 direction = normalize( vWorldDirection );

					vec2 sampleUV = equirectUv( direction );

					gl_FragColor = texture2D( tEquirect, sampleUV );

				}
			`},s=new Cn(5,5,5),r=new Vn({name:"CubemapFromEquirect",uniforms:Mi(n.uniforms),vertexShader:n.vertexShader,fragmentShader:n.fragmentShader,side:Rt,blending:vn});r.uniforms.tEquirect.value=t;const o=new Vt(s,r),a=t.minFilter;return t.minFilter===Ii&&(t.minFilter=kt),new bu(1,10,this).update(e,o),t.minFilter=a,o.geometry.dispose(),o.material.dispose(),this}clear(e,t,n,s){const r=e.getRenderTarget();for(let o=0;o<6;o++)e.setRenderTarget(this,o),e.clear(t,n,s);e.setRenderTarget(r)}}const Lr=new U,wu=new U,Au=new ke;class Wn{constructor(e=new U(1,0,0),t=0){this.isPlane=!0,this.normal=e,this.constant=t}set(e,t){return this.normal.copy(e),this.constant=t,this}setComponents(e,t,n,s){return this.normal.set(e,t,n),this.constant=s,this}setFromNormalAndCoplanarPoint(e,t){return this.normal.copy(e),this.constant=-t.dot(this.normal),this}setFromCoplanarPoints(e,t,n){const s=Lr.subVectors(n,t).cross(wu.subVectors(e,t)).normalize();return this.setFromNormalAndCoplanarPoint(s,e),this}copy(e){return this.normal.copy(e.normal),this.constant=e.constant,this}normalize(){const e=1/this.normal.length();return this.normal.multiplyScalar(e),this.constant*=e,this}negate(){return this.constant*=-1,this.normal.negate(),this}distanceToPoint(e){return this.normal.dot(e)+this.constant}distanceToSphere(e){return this.distanceToPoint(e.center)-e.radius}projectPoint(e,t){return t.copy(e).addScaledVector(this.normal,-this.distanceToPoint(e))}intersectLine(e,t){const n=e.delta(Lr),s=this.normal.dot(n);if(s===0)return this.distanceToPoint(e.start)===0?t.copy(e.start):null;const r=-(e.start.dot(this.normal)+this.constant)/s;return r<0||r>1?null:t.copy(e.start).addScaledVector(n,r)}intersectsLine(e){const t=this.distanceToPoint(e.start),n=this.distanceToPoint(e.end);return t<0&&n>0||n<0&&t>0}intersectsBox(e){return e.intersectsPlane(this)}intersectsSphere(e){return e.intersectsPlane(this)}coplanarPoint(e){return e.copy(this.normal).multiplyScalar(-this.constant)}applyMatrix4(e,t){const n=t||Au.getNormalMatrix(e),s=this.coplanarPoint(Lr).applyMatrix4(e),r=this.normal.applyMatrix3(n).normalize();return this.constant=-s.dot(r),this}translate(e){return this.constant-=e.dot(this.normal),this}equals(e){return e.normal.equals(this.normal)&&e.constant===this.constant}clone(){return new this.constructor().copy(this)}}const Xn=new cs,ws=new U;class Pr{constructor(e=new Wn,t=new Wn,n=new Wn,s=new Wn,r=new Wn,o=new Wn){this.planes=[e,t,n,s,r,o]}set(e,t,n,s,r,o){const a=this.planes;return a[0].copy(e),a[1].copy(t),a[2].copy(n),a[3].copy(s),a[4].copy(r),a[5].copy(o),this}copy(e){const t=this.planes;for(let n=0;n<6;n++)t[n].copy(e.planes[n]);return this}setFromProjectionMatrix(e,t=rn){const n=this.planes,s=e.elements,r=s[0],o=s[1],a=s[2],l=s[3],c=s[4],d=s[5],p=s[6],f=s[7],m=s[8],g=s[9],_=s[10],h=s[11],u=s[12],y=s[13],x=s[14],T=s[15];if(n[0].setComponents(l-r,f-c,h-m,T-u).normalize(),n[1].setComponents(l+r,f+c,h+m,T+u).normalize(),n[2].setComponents(l+o,f+d,h+g,T+y).normalize(),n[3].setComponents(l-o,f-d,h-g,T-y).normalize(),n[4].setComponents(l-a,f-p,h-_,T-x).normalize(),t===rn)n[5].setComponents(l+a,f+p,h+_,T+x).normalize();else if(t===ss)n[5].setComponents(a,p,_,x).normalize();else throw new Error("THREE.Frustum.setFromProjectionMatrix(): Invalid coordinate system: "+t);return this}intersectsObject(e){if(e.boundingSphere!==void 0)e.boundingSphere===null&&e.computeBoundingSphere(),Xn.copy(e.boundingSphere).applyMatrix4(e.matrixWorld);else{const t=e.geometry;t.boundingSphere===null&&t.computeBoundingSphere(),Xn.copy(t.boundingSphere).applyMatrix4(e.matrixWorld)}return this.intersectsSphere(Xn)}intersectsSprite(e){return Xn.center.set(0,0,0),Xn.radius=.7071067811865476,Xn.applyMatrix4(e.matrixWorld),this.intersectsSphere(Xn)}intersectsSphere(e){const t=this.planes,n=e.center,s=-e.radius;for(let r=0;r<6;r++)if(t[r].distanceToPoint(n)<s)return!1;return!0}intersectsBox(e){const t=this.planes;for(let n=0;n<6;n++){const s=t[n];if(ws.x=s.normal.x>0?e.max.x:e.min.x,ws.y=s.normal.y>0?e.max.y:e.min.y,ws.z=s.normal.z>0?e.max.z:e.min.z,s.distanceToPoint(ws)<0)return!1}return!0}containsPoint(e){const t=this.planes;for(let n=0;n<6;n++)if(t[n].distanceToPoint(e)<0)return!1;return!0}clone(){return new this.constructor().copy(this)}}function Oo(){let i=null,e=!1,t=null,n=null;function s(r,o){t(r,o),n=i.requestAnimationFrame(s)}return{start:function(){e!==!0&&t!==null&&(n=i.requestAnimationFrame(s),e=!0)},stop:function(){i.cancelAnimationFrame(n),e=!1},setAnimationLoop:function(r){t=r},setContext:function(r){i=r}}}function Ru(i,e){const t=e.isWebGL2,n=new WeakMap;function s(c,d){const p=c.array,f=c.usage,m=p.byteLength,g=i.createBuffer();i.bindBuffer(d,g),i.bufferData(d,p,f),c.onUploadCallback();let _;if(p instanceof Float32Array)_=i.FLOAT;else if(p instanceof Uint16Array)if(c.isFloat16BufferAttribute)if(t)_=i.HALF_FLOAT;else throw new Error("THREE.WebGLAttributes: Usage of Float16BufferAttribute requires WebGL2.");else _=i.UNSIGNED_SHORT;else if(p instanceof Int16Array)_=i.SHORT;else if(p instanceof Uint32Array)_=i.UNSIGNED_INT;else if(p instanceof Int32Array)_=i.INT;else if(p instanceof Int8Array)_=i.BYTE;else if(p instanceof Uint8Array)_=i.UNSIGNED_BYTE;else if(p instanceof Uint8ClampedArray)_=i.UNSIGNED_BYTE;else throw new Error("THREE.WebGLAttributes: Unsupported buffer data format: "+p);return{buffer:g,type:_,bytesPerElement:p.BYTES_PER_ELEMENT,version:c.version,size:m}}function r(c,d,p){const f=d.array,m=d._updateRange,g=d.updateRanges;if(i.bindBuffer(p,c),m.count===-1&&g.length===0&&i.bufferSubData(p,0,f),g.length!==0){for(let _=0,h=g.length;_<h;_++){const u=g[_];t?i.bufferSubData(p,u.start*f.BYTES_PER_ELEMENT,f,u.start,u.count):i.bufferSubData(p,u.start*f.BYTES_PER_ELEMENT,f.subarray(u.start,u.start+u.count))}d.clearUpdateRanges()}m.count!==-1&&(t?i.bufferSubData(p,m.offset*f.BYTES_PER_ELEMENT,f,m.offset,m.count):i.bufferSubData(p,m.offset*f.BYTES_PER_ELEMENT,f.subarray(m.offset,m.offset+m.count)),m.count=-1),d.onUploadCallback()}function o(c){return c.isInterleavedBufferAttribute&&(c=c.data),n.get(c)}function a(c){c.isInterleavedBufferAttribute&&(c=c.data);const d=n.get(c);d&&(i.deleteBuffer(d.buffer),n.delete(c))}function l(c,d){if(c.isGLBufferAttribute){const f=n.get(c);(!f||f.version<c.version)&&n.set(c,{buffer:c.buffer,type:c.type,bytesPerElement:c.elementSize,version:c.version});return}c.isInterleavedBufferAttribute&&(c=c.data);const p=n.get(c);if(p===void 0)n.set(c,s(c,d));else if(p.version<c.version){if(p.size!==c.array.byteLength)throw new Error("THREE.WebGLAttributes: The size of the buffer attribute's array buffer does not match the original size. Resizing buffer attributes is not supported.");r(p.buffer,c,d),p.version=c.version}}return{get:o,remove:a,update:l}}class As extends dn{constructor(e=1,t=1,n=1,s=1){super(),this.type="PlaneGeometry",this.parameters={width:e,height:t,widthSegments:n,heightSegments:s};const r=e/2,o=t/2,a=Math.floor(n),l=Math.floor(s),c=a+1,d=l+1,p=e/a,f=t/l,m=[],g=[],_=[],h=[];for(let u=0;u<d;u++){const y=u*f-o;for(let x=0;x<c;x++){const T=x*p-r;g.push(T,-y,0),_.push(0,0,1),h.push(x/a),h.push(1-u/l)}}for(let u=0;u<l;u++)for(let y=0;y<a;y++){const x=y+c*u,T=y+c*(u+1),L=y+1+c*(u+1),w=y+1+c*u;m.push(x,T,w),m.push(T,L,w)}this.setIndex(m),this.setAttribute("position",new Zt(g,3)),this.setAttribute("normal",new Zt(_,3)),this.setAttribute("uv",new Zt(h,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new As(e.width,e.height,e.widthSegments,e.heightSegments)}}var Cu=`#ifdef USE_ALPHAHASH
	if ( diffuseColor.a < getAlphaHashThreshold( vPosition ) ) discard;
#endif`,Lu=`#ifdef USE_ALPHAHASH
	const float ALPHA_HASH_SCALE = 0.05;
	float hash2D( vec2 value ) {
		return fract( 1.0e4 * sin( 17.0 * value.x + 0.1 * value.y ) * ( 0.1 + abs( sin( 13.0 * value.y + value.x ) ) ) );
	}
	float hash3D( vec3 value ) {
		return hash2D( vec2( hash2D( value.xy ), value.z ) );
	}
	float getAlphaHashThreshold( vec3 position ) {
		float maxDeriv = max(
			length( dFdx( position.xyz ) ),
			length( dFdy( position.xyz ) )
		);
		float pixScale = 1.0 / ( ALPHA_HASH_SCALE * maxDeriv );
		vec2 pixScales = vec2(
			exp2( floor( log2( pixScale ) ) ),
			exp2( ceil( log2( pixScale ) ) )
		);
		vec2 alpha = vec2(
			hash3D( floor( pixScales.x * position.xyz ) ),
			hash3D( floor( pixScales.y * position.xyz ) )
		);
		float lerpFactor = fract( log2( pixScale ) );
		float x = ( 1.0 - lerpFactor ) * alpha.x + lerpFactor * alpha.y;
		float a = min( lerpFactor, 1.0 - lerpFactor );
		vec3 cases = vec3(
			x * x / ( 2.0 * a * ( 1.0 - a ) ),
			( x - 0.5 * a ) / ( 1.0 - a ),
			1.0 - ( ( 1.0 - x ) * ( 1.0 - x ) / ( 2.0 * a * ( 1.0 - a ) ) )
		);
		float threshold = ( x < ( 1.0 - a ) )
			? ( ( x < a ) ? cases.x : cases.y )
			: cases.z;
		return clamp( threshold , 1.0e-6, 1.0 );
	}
#endif`,Pu=`#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, vAlphaMapUv ).g;
#endif`,Du=`#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,Uu=`#ifdef USE_ALPHATEST
	if ( diffuseColor.a < alphaTest ) discard;
#endif`,Iu=`#ifdef USE_ALPHATEST
	uniform float alphaTest;
#endif`,Nu=`#ifdef USE_AOMAP
	float ambientOcclusion = ( texture2D( aoMap, vAoMapUv ).r - 1.0 ) * aoMapIntensity + 1.0;
	reflectedLight.indirectDiffuse *= ambientOcclusion;
	#if defined( USE_CLEARCOAT ) 
		clearcoatSpecularIndirect *= ambientOcclusion;
	#endif
	#if defined( USE_SHEEN ) 
		sheenSpecularIndirect *= ambientOcclusion;
	#endif
	#if defined( USE_ENVMAP ) && defined( STANDARD )
		float dotNV = saturate( dot( geometryNormal, geometryViewDir ) );
		reflectedLight.indirectSpecular *= computeSpecularOcclusion( dotNV, ambientOcclusion, material.roughness );
	#endif
#endif`,Fu=`#ifdef USE_AOMAP
	uniform sampler2D aoMap;
	uniform float aoMapIntensity;
#endif`,Ou=`#ifdef USE_BATCHING
	attribute float batchId;
	uniform highp sampler2D batchingTexture;
	mat4 getBatchingMatrix( const in float i ) {
		int size = textureSize( batchingTexture, 0 ).x;
		int j = int( i ) * 4;
		int x = j % size;
		int y = j / size;
		vec4 v1 = texelFetch( batchingTexture, ivec2( x, y ), 0 );
		vec4 v2 = texelFetch( batchingTexture, ivec2( x + 1, y ), 0 );
		vec4 v3 = texelFetch( batchingTexture, ivec2( x + 2, y ), 0 );
		vec4 v4 = texelFetch( batchingTexture, ivec2( x + 3, y ), 0 );
		return mat4( v1, v2, v3, v4 );
	}
#endif`,zu=`#ifdef USE_BATCHING
	mat4 batchingMatrix = getBatchingMatrix( batchId );
#endif`,Bu=`vec3 transformed = vec3( position );
#ifdef USE_ALPHAHASH
	vPosition = vec3( position );
#endif`,ku=`vec3 objectNormal = vec3( normal );
#ifdef USE_TANGENT
	vec3 objectTangent = vec3( tangent.xyz );
#endif`,Hu=`float G_BlinnPhong_Implicit( ) {
	return 0.25;
}
float D_BlinnPhong( const in float shininess, const in float dotNH ) {
	return RECIPROCAL_PI * ( shininess * 0.5 + 1.0 ) * pow( dotNH, shininess );
}
vec3 BRDF_BlinnPhong( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in vec3 specularColor, const in float shininess ) {
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNH = saturate( dot( normal, halfDir ) );
	float dotVH = saturate( dot( viewDir, halfDir ) );
	vec3 F = F_Schlick( specularColor, 1.0, dotVH );
	float G = G_BlinnPhong_Implicit( );
	float D = D_BlinnPhong( shininess, dotNH );
	return F * ( G * D );
} // validated`,Gu=`#ifdef USE_IRIDESCENCE
	const mat3 XYZ_TO_REC709 = mat3(
		 3.2404542, -0.9692660,  0.0556434,
		-1.5371385,  1.8760108, -0.2040259,
		-0.4985314,  0.0415560,  1.0572252
	);
	vec3 Fresnel0ToIor( vec3 fresnel0 ) {
		vec3 sqrtF0 = sqrt( fresnel0 );
		return ( vec3( 1.0 ) + sqrtF0 ) / ( vec3( 1.0 ) - sqrtF0 );
	}
	vec3 IorToFresnel0( vec3 transmittedIor, float incidentIor ) {
		return pow2( ( transmittedIor - vec3( incidentIor ) ) / ( transmittedIor + vec3( incidentIor ) ) );
	}
	float IorToFresnel0( float transmittedIor, float incidentIor ) {
		return pow2( ( transmittedIor - incidentIor ) / ( transmittedIor + incidentIor ));
	}
	vec3 evalSensitivity( float OPD, vec3 shift ) {
		float phase = 2.0 * PI * OPD * 1.0e-9;
		vec3 val = vec3( 5.4856e-13, 4.4201e-13, 5.2481e-13 );
		vec3 pos = vec3( 1.6810e+06, 1.7953e+06, 2.2084e+06 );
		vec3 var = vec3( 4.3278e+09, 9.3046e+09, 6.6121e+09 );
		vec3 xyz = val * sqrt( 2.0 * PI * var ) * cos( pos * phase + shift ) * exp( - pow2( phase ) * var );
		xyz.x += 9.7470e-14 * sqrt( 2.0 * PI * 4.5282e+09 ) * cos( 2.2399e+06 * phase + shift[ 0 ] ) * exp( - 4.5282e+09 * pow2( phase ) );
		xyz /= 1.0685e-7;
		vec3 rgb = XYZ_TO_REC709 * xyz;
		return rgb;
	}
	vec3 evalIridescence( float outsideIOR, float eta2, float cosTheta1, float thinFilmThickness, vec3 baseF0 ) {
		vec3 I;
		float iridescenceIOR = mix( outsideIOR, eta2, smoothstep( 0.0, 0.03, thinFilmThickness ) );
		float sinTheta2Sq = pow2( outsideIOR / iridescenceIOR ) * ( 1.0 - pow2( cosTheta1 ) );
		float cosTheta2Sq = 1.0 - sinTheta2Sq;
		if ( cosTheta2Sq < 0.0 ) {
			return vec3( 1.0 );
		}
		float cosTheta2 = sqrt( cosTheta2Sq );
		float R0 = IorToFresnel0( iridescenceIOR, outsideIOR );
		float R12 = F_Schlick( R0, 1.0, cosTheta1 );
		float T121 = 1.0 - R12;
		float phi12 = 0.0;
		if ( iridescenceIOR < outsideIOR ) phi12 = PI;
		float phi21 = PI - phi12;
		vec3 baseIOR = Fresnel0ToIor( clamp( baseF0, 0.0, 0.9999 ) );		vec3 R1 = IorToFresnel0( baseIOR, iridescenceIOR );
		vec3 R23 = F_Schlick( R1, 1.0, cosTheta2 );
		vec3 phi23 = vec3( 0.0 );
		if ( baseIOR[ 0 ] < iridescenceIOR ) phi23[ 0 ] = PI;
		if ( baseIOR[ 1 ] < iridescenceIOR ) phi23[ 1 ] = PI;
		if ( baseIOR[ 2 ] < iridescenceIOR ) phi23[ 2 ] = PI;
		float OPD = 2.0 * iridescenceIOR * thinFilmThickness * cosTheta2;
		vec3 phi = vec3( phi21 ) + phi23;
		vec3 R123 = clamp( R12 * R23, 1e-5, 0.9999 );
		vec3 r123 = sqrt( R123 );
		vec3 Rs = pow2( T121 ) * R23 / ( vec3( 1.0 ) - R123 );
		vec3 C0 = R12 + Rs;
		I = C0;
		vec3 Cm = Rs - T121;
		for ( int m = 1; m <= 2; ++ m ) {
			Cm *= r123;
			vec3 Sm = 2.0 * evalSensitivity( float( m ) * OPD, float( m ) * phi );
			I += Cm * Sm;
		}
		return max( I, vec3( 0.0 ) );
	}
#endif`,Vu=`#ifdef USE_BUMPMAP
	uniform sampler2D bumpMap;
	uniform float bumpScale;
	vec2 dHdxy_fwd() {
		vec2 dSTdx = dFdx( vBumpMapUv );
		vec2 dSTdy = dFdy( vBumpMapUv );
		float Hll = bumpScale * texture2D( bumpMap, vBumpMapUv ).x;
		float dBx = bumpScale * texture2D( bumpMap, vBumpMapUv + dSTdx ).x - Hll;
		float dBy = bumpScale * texture2D( bumpMap, vBumpMapUv + dSTdy ).x - Hll;
		return vec2( dBx, dBy );
	}
	vec3 perturbNormalArb( vec3 surf_pos, vec3 surf_norm, vec2 dHdxy, float faceDirection ) {
		vec3 vSigmaX = normalize( dFdx( surf_pos.xyz ) );
		vec3 vSigmaY = normalize( dFdy( surf_pos.xyz ) );
		vec3 vN = surf_norm;
		vec3 R1 = cross( vSigmaY, vN );
		vec3 R2 = cross( vN, vSigmaX );
		float fDet = dot( vSigmaX, R1 ) * faceDirection;
		vec3 vGrad = sign( fDet ) * ( dHdxy.x * R1 + dHdxy.y * R2 );
		return normalize( abs( fDet ) * surf_norm - vGrad );
	}
#endif`,Wu=`#if NUM_CLIPPING_PLANES > 0
	vec4 plane;
	#pragma unroll_loop_start
	for ( int i = 0; i < UNION_CLIPPING_PLANES; i ++ ) {
		plane = clippingPlanes[ i ];
		if ( dot( vClipPosition, plane.xyz ) > plane.w ) discard;
	}
	#pragma unroll_loop_end
	#if UNION_CLIPPING_PLANES < NUM_CLIPPING_PLANES
		bool clipped = true;
		#pragma unroll_loop_start
		for ( int i = UNION_CLIPPING_PLANES; i < NUM_CLIPPING_PLANES; i ++ ) {
			plane = clippingPlanes[ i ];
			clipped = ( dot( vClipPosition, plane.xyz ) > plane.w ) && clipped;
		}
		#pragma unroll_loop_end
		if ( clipped ) discard;
	#endif
#endif`,Xu=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
	uniform vec4 clippingPlanes[ NUM_CLIPPING_PLANES ];
#endif`,qu=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
#endif`,ju=`#if NUM_CLIPPING_PLANES > 0
	vClipPosition = - mvPosition.xyz;
#endif`,Yu=`#if defined( USE_COLOR_ALPHA )
	diffuseColor *= vColor;
#elif defined( USE_COLOR )
	diffuseColor.rgb *= vColor;
#endif`,$u=`#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR )
	varying vec3 vColor;
#endif`,Ku=`#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR ) || defined( USE_INSTANCING_COLOR )
	varying vec3 vColor;
#endif`,Zu=`#if defined( USE_COLOR_ALPHA )
	vColor = vec4( 1.0 );
#elif defined( USE_COLOR ) || defined( USE_INSTANCING_COLOR )
	vColor = vec3( 1.0 );
#endif
#ifdef USE_COLOR
	vColor *= color;
#endif
#ifdef USE_INSTANCING_COLOR
	vColor.xyz *= instanceColor.xyz;
#endif`,Ju=`#define PI 3.141592653589793
#define PI2 6.283185307179586
#define PI_HALF 1.5707963267948966
#define RECIPROCAL_PI 0.3183098861837907
#define RECIPROCAL_PI2 0.15915494309189535
#define EPSILON 1e-6
#ifndef saturate
#define saturate( a ) clamp( a, 0.0, 1.0 )
#endif
#define whiteComplement( a ) ( 1.0 - saturate( a ) )
float pow2( const in float x ) { return x*x; }
vec3 pow2( const in vec3 x ) { return x*x; }
float pow3( const in float x ) { return x*x*x; }
float pow4( const in float x ) { float x2 = x*x; return x2*x2; }
float max3( const in vec3 v ) { return max( max( v.x, v.y ), v.z ); }
float average( const in vec3 v ) { return dot( v, vec3( 0.3333333 ) ); }
highp float rand( const in vec2 uv ) {
	const highp float a = 12.9898, b = 78.233, c = 43758.5453;
	highp float dt = dot( uv.xy, vec2( a,b ) ), sn = mod( dt, PI );
	return fract( sin( sn ) * c );
}
#ifdef HIGH_PRECISION
	float precisionSafeLength( vec3 v ) { return length( v ); }
#else
	float precisionSafeLength( vec3 v ) {
		float maxComponent = max3( abs( v ) );
		return length( v / maxComponent ) * maxComponent;
	}
#endif
struct IncidentLight {
	vec3 color;
	vec3 direction;
	bool visible;
};
struct ReflectedLight {
	vec3 directDiffuse;
	vec3 directSpecular;
	vec3 indirectDiffuse;
	vec3 indirectSpecular;
};
#ifdef USE_ALPHAHASH
	varying vec3 vPosition;
#endif
vec3 transformDirection( in vec3 dir, in mat4 matrix ) {
	return normalize( ( matrix * vec4( dir, 0.0 ) ).xyz );
}
vec3 inverseTransformDirection( in vec3 dir, in mat4 matrix ) {
	return normalize( ( vec4( dir, 0.0 ) * matrix ).xyz );
}
mat3 transposeMat3( const in mat3 m ) {
	mat3 tmp;
	tmp[ 0 ] = vec3( m[ 0 ].x, m[ 1 ].x, m[ 2 ].x );
	tmp[ 1 ] = vec3( m[ 0 ].y, m[ 1 ].y, m[ 2 ].y );
	tmp[ 2 ] = vec3( m[ 0 ].z, m[ 1 ].z, m[ 2 ].z );
	return tmp;
}
float luminance( const in vec3 rgb ) {
	const vec3 weights = vec3( 0.2126729, 0.7151522, 0.0721750 );
	return dot( weights, rgb );
}
bool isPerspectiveMatrix( mat4 m ) {
	return m[ 2 ][ 3 ] == - 1.0;
}
vec2 equirectUv( in vec3 dir ) {
	float u = atan( dir.z, dir.x ) * RECIPROCAL_PI2 + 0.5;
	float v = asin( clamp( dir.y, - 1.0, 1.0 ) ) * RECIPROCAL_PI + 0.5;
	return vec2( u, v );
}
vec3 BRDF_Lambert( const in vec3 diffuseColor ) {
	return RECIPROCAL_PI * diffuseColor;
}
vec3 F_Schlick( const in vec3 f0, const in float f90, const in float dotVH ) {
	float fresnel = exp2( ( - 5.55473 * dotVH - 6.98316 ) * dotVH );
	return f0 * ( 1.0 - fresnel ) + ( f90 * fresnel );
}
float F_Schlick( const in float f0, const in float f90, const in float dotVH ) {
	float fresnel = exp2( ( - 5.55473 * dotVH - 6.98316 ) * dotVH );
	return f0 * ( 1.0 - fresnel ) + ( f90 * fresnel );
} // validated`,Qu=`#ifdef ENVMAP_TYPE_CUBE_UV
	#define cubeUV_minMipLevel 4.0
	#define cubeUV_minTileSize 16.0
	float getFace( vec3 direction ) {
		vec3 absDirection = abs( direction );
		float face = - 1.0;
		if ( absDirection.x > absDirection.z ) {
			if ( absDirection.x > absDirection.y )
				face = direction.x > 0.0 ? 0.0 : 3.0;
			else
				face = direction.y > 0.0 ? 1.0 : 4.0;
		} else {
			if ( absDirection.z > absDirection.y )
				face = direction.z > 0.0 ? 2.0 : 5.0;
			else
				face = direction.y > 0.0 ? 1.0 : 4.0;
		}
		return face;
	}
	vec2 getUV( vec3 direction, float face ) {
		vec2 uv;
		if ( face == 0.0 ) {
			uv = vec2( direction.z, direction.y ) / abs( direction.x );
		} else if ( face == 1.0 ) {
			uv = vec2( - direction.x, - direction.z ) / abs( direction.y );
		} else if ( face == 2.0 ) {
			uv = vec2( - direction.x, direction.y ) / abs( direction.z );
		} else if ( face == 3.0 ) {
			uv = vec2( - direction.z, direction.y ) / abs( direction.x );
		} else if ( face == 4.0 ) {
			uv = vec2( - direction.x, direction.z ) / abs( direction.y );
		} else {
			uv = vec2( direction.x, direction.y ) / abs( direction.z );
		}
		return 0.5 * ( uv + 1.0 );
	}
	vec3 bilinearCubeUV( sampler2D envMap, vec3 direction, float mipInt ) {
		float face = getFace( direction );
		float filterInt = max( cubeUV_minMipLevel - mipInt, 0.0 );
		mipInt = max( mipInt, cubeUV_minMipLevel );
		float faceSize = exp2( mipInt );
		highp vec2 uv = getUV( direction, face ) * ( faceSize - 2.0 ) + 1.0;
		if ( face > 2.0 ) {
			uv.y += faceSize;
			face -= 3.0;
		}
		uv.x += face * faceSize;
		uv.x += filterInt * 3.0 * cubeUV_minTileSize;
		uv.y += 4.0 * ( exp2( CUBEUV_MAX_MIP ) - faceSize );
		uv.x *= CUBEUV_TEXEL_WIDTH;
		uv.y *= CUBEUV_TEXEL_HEIGHT;
		#ifdef texture2DGradEXT
			return texture2DGradEXT( envMap, uv, vec2( 0.0 ), vec2( 0.0 ) ).rgb;
		#else
			return texture2D( envMap, uv ).rgb;
		#endif
	}
	#define cubeUV_r0 1.0
	#define cubeUV_m0 - 2.0
	#define cubeUV_r1 0.8
	#define cubeUV_m1 - 1.0
	#define cubeUV_r4 0.4
	#define cubeUV_m4 2.0
	#define cubeUV_r5 0.305
	#define cubeUV_m5 3.0
	#define cubeUV_r6 0.21
	#define cubeUV_m6 4.0
	float roughnessToMip( float roughness ) {
		float mip = 0.0;
		if ( roughness >= cubeUV_r1 ) {
			mip = ( cubeUV_r0 - roughness ) * ( cubeUV_m1 - cubeUV_m0 ) / ( cubeUV_r0 - cubeUV_r1 ) + cubeUV_m0;
		} else if ( roughness >= cubeUV_r4 ) {
			mip = ( cubeUV_r1 - roughness ) * ( cubeUV_m4 - cubeUV_m1 ) / ( cubeUV_r1 - cubeUV_r4 ) + cubeUV_m1;
		} else if ( roughness >= cubeUV_r5 ) {
			mip = ( cubeUV_r4 - roughness ) * ( cubeUV_m5 - cubeUV_m4 ) / ( cubeUV_r4 - cubeUV_r5 ) + cubeUV_m4;
		} else if ( roughness >= cubeUV_r6 ) {
			mip = ( cubeUV_r5 - roughness ) * ( cubeUV_m6 - cubeUV_m5 ) / ( cubeUV_r5 - cubeUV_r6 ) + cubeUV_m5;
		} else {
			mip = - 2.0 * log2( 1.16 * roughness );		}
		return mip;
	}
	vec4 textureCubeUV( sampler2D envMap, vec3 sampleDir, float roughness ) {
		float mip = clamp( roughnessToMip( roughness ), cubeUV_m0, CUBEUV_MAX_MIP );
		float mipF = fract( mip );
		float mipInt = floor( mip );
		vec3 color0 = bilinearCubeUV( envMap, sampleDir, mipInt );
		if ( mipF == 0.0 ) {
			return vec4( color0, 1.0 );
		} else {
			vec3 color1 = bilinearCubeUV( envMap, sampleDir, mipInt + 1.0 );
			return vec4( mix( color0, color1, mipF ), 1.0 );
		}
	}
#endif`,ed=`vec3 transformedNormal = objectNormal;
#ifdef USE_TANGENT
	vec3 transformedTangent = objectTangent;
#endif
#ifdef USE_BATCHING
	mat3 bm = mat3( batchingMatrix );
	transformedNormal /= vec3( dot( bm[ 0 ], bm[ 0 ] ), dot( bm[ 1 ], bm[ 1 ] ), dot( bm[ 2 ], bm[ 2 ] ) );
	transformedNormal = bm * transformedNormal;
	#ifdef USE_TANGENT
		transformedTangent = bm * transformedTangent;
	#endif
#endif
#ifdef USE_INSTANCING
	mat3 im = mat3( instanceMatrix );
	transformedNormal /= vec3( dot( im[ 0 ], im[ 0 ] ), dot( im[ 1 ], im[ 1 ] ), dot( im[ 2 ], im[ 2 ] ) );
	transformedNormal = im * transformedNormal;
	#ifdef USE_TANGENT
		transformedTangent = im * transformedTangent;
	#endif
#endif
transformedNormal = normalMatrix * transformedNormal;
#ifdef FLIP_SIDED
	transformedNormal = - transformedNormal;
#endif
#ifdef USE_TANGENT
	transformedTangent = ( modelViewMatrix * vec4( transformedTangent, 0.0 ) ).xyz;
	#ifdef FLIP_SIDED
		transformedTangent = - transformedTangent;
	#endif
#endif`,td=`#ifdef USE_DISPLACEMENTMAP
	uniform sampler2D displacementMap;
	uniform float displacementScale;
	uniform float displacementBias;
#endif`,nd=`#ifdef USE_DISPLACEMENTMAP
	transformed += normalize( objectNormal ) * ( texture2D( displacementMap, vDisplacementMapUv ).x * displacementScale + displacementBias );
#endif`,id=`#ifdef USE_EMISSIVEMAP
	vec4 emissiveColor = texture2D( emissiveMap, vEmissiveMapUv );
	totalEmissiveRadiance *= emissiveColor.rgb;
#endif`,sd=`#ifdef USE_EMISSIVEMAP
	uniform sampler2D emissiveMap;
#endif`,rd="gl_FragColor = linearToOutputTexel( gl_FragColor );",ad=`
const mat3 LINEAR_SRGB_TO_LINEAR_DISPLAY_P3 = mat3(
	vec3( 0.8224621, 0.177538, 0.0 ),
	vec3( 0.0331941, 0.9668058, 0.0 ),
	vec3( 0.0170827, 0.0723974, 0.9105199 )
);
const mat3 LINEAR_DISPLAY_P3_TO_LINEAR_SRGB = mat3(
	vec3( 1.2249401, - 0.2249404, 0.0 ),
	vec3( - 0.0420569, 1.0420571, 0.0 ),
	vec3( - 0.0196376, - 0.0786361, 1.0982735 )
);
vec4 LinearSRGBToLinearDisplayP3( in vec4 value ) {
	return vec4( value.rgb * LINEAR_SRGB_TO_LINEAR_DISPLAY_P3, value.a );
}
vec4 LinearDisplayP3ToLinearSRGB( in vec4 value ) {
	return vec4( value.rgb * LINEAR_DISPLAY_P3_TO_LINEAR_SRGB, value.a );
}
vec4 LinearTransferOETF( in vec4 value ) {
	return value;
}
vec4 sRGBTransferOETF( in vec4 value ) {
	return vec4( mix( pow( value.rgb, vec3( 0.41666 ) ) * 1.055 - vec3( 0.055 ), value.rgb * 12.92, vec3( lessThanEqual( value.rgb, vec3( 0.0031308 ) ) ) ), value.a );
}
vec4 LinearToLinear( in vec4 value ) {
	return value;
}
vec4 LinearTosRGB( in vec4 value ) {
	return sRGBTransferOETF( value );
}`,od=`#ifdef USE_ENVMAP
	#ifdef ENV_WORLDPOS
		vec3 cameraToFrag;
		if ( isOrthographic ) {
			cameraToFrag = normalize( vec3( - viewMatrix[ 0 ][ 2 ], - viewMatrix[ 1 ][ 2 ], - viewMatrix[ 2 ][ 2 ] ) );
		} else {
			cameraToFrag = normalize( vWorldPosition - cameraPosition );
		}
		vec3 worldNormal = inverseTransformDirection( normal, viewMatrix );
		#ifdef ENVMAP_MODE_REFLECTION
			vec3 reflectVec = reflect( cameraToFrag, worldNormal );
		#else
			vec3 reflectVec = refract( cameraToFrag, worldNormal, refractionRatio );
		#endif
	#else
		vec3 reflectVec = vReflect;
	#endif
	#ifdef ENVMAP_TYPE_CUBE
		vec4 envColor = textureCube( envMap, vec3( flipEnvMap * reflectVec.x, reflectVec.yz ) );
	#else
		vec4 envColor = vec4( 0.0 );
	#endif
	#ifdef ENVMAP_BLENDING_MULTIPLY
		outgoingLight = mix( outgoingLight, outgoingLight * envColor.xyz, specularStrength * reflectivity );
	#elif defined( ENVMAP_BLENDING_MIX )
		outgoingLight = mix( outgoingLight, envColor.xyz, specularStrength * reflectivity );
	#elif defined( ENVMAP_BLENDING_ADD )
		outgoingLight += envColor.xyz * specularStrength * reflectivity;
	#endif
#endif`,ld=`#ifdef USE_ENVMAP
	uniform float envMapIntensity;
	uniform float flipEnvMap;
	#ifdef ENVMAP_TYPE_CUBE
		uniform samplerCube envMap;
	#else
		uniform sampler2D envMap;
	#endif
	
#endif`,cd=`#ifdef USE_ENVMAP
	uniform float reflectivity;
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		varying vec3 vWorldPosition;
		uniform float refractionRatio;
	#else
		varying vec3 vReflect;
	#endif
#endif`,ud=`#ifdef USE_ENVMAP
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		
		varying vec3 vWorldPosition;
	#else
		varying vec3 vReflect;
		uniform float refractionRatio;
	#endif
#endif`,dd=`#ifdef USE_ENVMAP
	#ifdef ENV_WORLDPOS
		vWorldPosition = worldPosition.xyz;
	#else
		vec3 cameraToVertex;
		if ( isOrthographic ) {
			cameraToVertex = normalize( vec3( - viewMatrix[ 0 ][ 2 ], - viewMatrix[ 1 ][ 2 ], - viewMatrix[ 2 ][ 2 ] ) );
		} else {
			cameraToVertex = normalize( worldPosition.xyz - cameraPosition );
		}
		vec3 worldNormal = inverseTransformDirection( transformedNormal, viewMatrix );
		#ifdef ENVMAP_MODE_REFLECTION
			vReflect = reflect( cameraToVertex, worldNormal );
		#else
			vReflect = refract( cameraToVertex, worldNormal, refractionRatio );
		#endif
	#endif
#endif`,hd=`#ifdef USE_FOG
	vFogDepth = - mvPosition.z;
#endif`,fd=`#ifdef USE_FOG
	varying float vFogDepth;
#endif`,pd=`#ifdef USE_FOG
	#ifdef FOG_EXP2
		float fogFactor = 1.0 - exp( - fogDensity * fogDensity * vFogDepth * vFogDepth );
	#else
		float fogFactor = smoothstep( fogNear, fogFar, vFogDepth );
	#endif
	gl_FragColor.rgb = mix( gl_FragColor.rgb, fogColor, fogFactor );
#endif`,md=`#ifdef USE_FOG
	uniform vec3 fogColor;
	varying float vFogDepth;
	#ifdef FOG_EXP2
		uniform float fogDensity;
	#else
		uniform float fogNear;
		uniform float fogFar;
	#endif
#endif`,gd=`#ifdef USE_GRADIENTMAP
	uniform sampler2D gradientMap;
#endif
vec3 getGradientIrradiance( vec3 normal, vec3 lightDirection ) {
	float dotNL = dot( normal, lightDirection );
	vec2 coord = vec2( dotNL * 0.5 + 0.5, 0.0 );
	#ifdef USE_GRADIENTMAP
		return vec3( texture2D( gradientMap, coord ).r );
	#else
		vec2 fw = fwidth( coord ) * 0.5;
		return mix( vec3( 0.7 ), vec3( 1.0 ), smoothstep( 0.7 - fw.x, 0.7 + fw.x, coord.x ) );
	#endif
}`,_d=`#ifdef USE_LIGHTMAP
	vec4 lightMapTexel = texture2D( lightMap, vLightMapUv );
	vec3 lightMapIrradiance = lightMapTexel.rgb * lightMapIntensity;
	reflectedLight.indirectDiffuse += lightMapIrradiance;
#endif`,xd=`#ifdef USE_LIGHTMAP
	uniform sampler2D lightMap;
	uniform float lightMapIntensity;
#endif`,vd=`LambertMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularStrength = specularStrength;`,Md=`varying vec3 vViewPosition;
struct LambertMaterial {
	vec3 diffuseColor;
	float specularStrength;
};
void RE_Direct_Lambert( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in LambertMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Lambert( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in LambertMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_Lambert
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Lambert`,Sd=`uniform bool receiveShadow;
uniform vec3 ambientLightColor;
#if defined( USE_LIGHT_PROBES )
	uniform vec3 lightProbe[ 9 ];
#endif
vec3 shGetIrradianceAt( in vec3 normal, in vec3 shCoefficients[ 9 ] ) {
	float x = normal.x, y = normal.y, z = normal.z;
	vec3 result = shCoefficients[ 0 ] * 0.886227;
	result += shCoefficients[ 1 ] * 2.0 * 0.511664 * y;
	result += shCoefficients[ 2 ] * 2.0 * 0.511664 * z;
	result += shCoefficients[ 3 ] * 2.0 * 0.511664 * x;
	result += shCoefficients[ 4 ] * 2.0 * 0.429043 * x * y;
	result += shCoefficients[ 5 ] * 2.0 * 0.429043 * y * z;
	result += shCoefficients[ 6 ] * ( 0.743125 * z * z - 0.247708 );
	result += shCoefficients[ 7 ] * 2.0 * 0.429043 * x * z;
	result += shCoefficients[ 8 ] * 0.429043 * ( x * x - y * y );
	return result;
}
vec3 getLightProbeIrradiance( const in vec3 lightProbe[ 9 ], const in vec3 normal ) {
	vec3 worldNormal = inverseTransformDirection( normal, viewMatrix );
	vec3 irradiance = shGetIrradianceAt( worldNormal, lightProbe );
	return irradiance;
}
vec3 getAmbientLightIrradiance( const in vec3 ambientLightColor ) {
	vec3 irradiance = ambientLightColor;
	return irradiance;
}
float getDistanceAttenuation( const in float lightDistance, const in float cutoffDistance, const in float decayExponent ) {
	#if defined ( LEGACY_LIGHTS )
		if ( cutoffDistance > 0.0 && decayExponent > 0.0 ) {
			return pow( saturate( - lightDistance / cutoffDistance + 1.0 ), decayExponent );
		}
		return 1.0;
	#else
		float distanceFalloff = 1.0 / max( pow( lightDistance, decayExponent ), 0.01 );
		if ( cutoffDistance > 0.0 ) {
			distanceFalloff *= pow2( saturate( 1.0 - pow4( lightDistance / cutoffDistance ) ) );
		}
		return distanceFalloff;
	#endif
}
float getSpotAttenuation( const in float coneCosine, const in float penumbraCosine, const in float angleCosine ) {
	return smoothstep( coneCosine, penumbraCosine, angleCosine );
}
#if NUM_DIR_LIGHTS > 0
	struct DirectionalLight {
		vec3 direction;
		vec3 color;
	};
	uniform DirectionalLight directionalLights[ NUM_DIR_LIGHTS ];
	void getDirectionalLightInfo( const in DirectionalLight directionalLight, out IncidentLight light ) {
		light.color = directionalLight.color;
		light.direction = directionalLight.direction;
		light.visible = true;
	}
#endif
#if NUM_POINT_LIGHTS > 0
	struct PointLight {
		vec3 position;
		vec3 color;
		float distance;
		float decay;
	};
	uniform PointLight pointLights[ NUM_POINT_LIGHTS ];
	void getPointLightInfo( const in PointLight pointLight, const in vec3 geometryPosition, out IncidentLight light ) {
		vec3 lVector = pointLight.position - geometryPosition;
		light.direction = normalize( lVector );
		float lightDistance = length( lVector );
		light.color = pointLight.color;
		light.color *= getDistanceAttenuation( lightDistance, pointLight.distance, pointLight.decay );
		light.visible = ( light.color != vec3( 0.0 ) );
	}
#endif
#if NUM_SPOT_LIGHTS > 0
	struct SpotLight {
		vec3 position;
		vec3 direction;
		vec3 color;
		float distance;
		float decay;
		float coneCos;
		float penumbraCos;
	};
	uniform SpotLight spotLights[ NUM_SPOT_LIGHTS ];
	void getSpotLightInfo( const in SpotLight spotLight, const in vec3 geometryPosition, out IncidentLight light ) {
		vec3 lVector = spotLight.position - geometryPosition;
		light.direction = normalize( lVector );
		float angleCos = dot( light.direction, spotLight.direction );
		float spotAttenuation = getSpotAttenuation( spotLight.coneCos, spotLight.penumbraCos, angleCos );
		if ( spotAttenuation > 0.0 ) {
			float lightDistance = length( lVector );
			light.color = spotLight.color * spotAttenuation;
			light.color *= getDistanceAttenuation( lightDistance, spotLight.distance, spotLight.decay );
			light.visible = ( light.color != vec3( 0.0 ) );
		} else {
			light.color = vec3( 0.0 );
			light.visible = false;
		}
	}
#endif
#if NUM_RECT_AREA_LIGHTS > 0
	struct RectAreaLight {
		vec3 color;
		vec3 position;
		vec3 halfWidth;
		vec3 halfHeight;
	};
	uniform sampler2D ltc_1;	uniform sampler2D ltc_2;
	uniform RectAreaLight rectAreaLights[ NUM_RECT_AREA_LIGHTS ];
#endif
#if NUM_HEMI_LIGHTS > 0
	struct HemisphereLight {
		vec3 direction;
		vec3 skyColor;
		vec3 groundColor;
	};
	uniform HemisphereLight hemisphereLights[ NUM_HEMI_LIGHTS ];
	vec3 getHemisphereLightIrradiance( const in HemisphereLight hemiLight, const in vec3 normal ) {
		float dotNL = dot( normal, hemiLight.direction );
		float hemiDiffuseWeight = 0.5 * dotNL + 0.5;
		vec3 irradiance = mix( hemiLight.groundColor, hemiLight.skyColor, hemiDiffuseWeight );
		return irradiance;
	}
#endif`,yd=`#ifdef USE_ENVMAP
	vec3 getIBLIrradiance( const in vec3 normal ) {
		#ifdef ENVMAP_TYPE_CUBE_UV
			vec3 worldNormal = inverseTransformDirection( normal, viewMatrix );
			vec4 envMapColor = textureCubeUV( envMap, worldNormal, 1.0 );
			return PI * envMapColor.rgb * envMapIntensity;
		#else
			return vec3( 0.0 );
		#endif
	}
	vec3 getIBLRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness ) {
		#ifdef ENVMAP_TYPE_CUBE_UV
			vec3 reflectVec = reflect( - viewDir, normal );
			reflectVec = normalize( mix( reflectVec, normal, roughness * roughness) );
			reflectVec = inverseTransformDirection( reflectVec, viewMatrix );
			vec4 envMapColor = textureCubeUV( envMap, reflectVec, roughness );
			return envMapColor.rgb * envMapIntensity;
		#else
			return vec3( 0.0 );
		#endif
	}
	#ifdef USE_ANISOTROPY
		vec3 getIBLAnisotropyRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness, const in vec3 bitangent, const in float anisotropy ) {
			#ifdef ENVMAP_TYPE_CUBE_UV
				vec3 bentNormal = cross( bitangent, viewDir );
				bentNormal = normalize( cross( bentNormal, bitangent ) );
				bentNormal = normalize( mix( bentNormal, normal, pow2( pow2( 1.0 - anisotropy * ( 1.0 - roughness ) ) ) ) );
				return getIBLRadiance( viewDir, bentNormal, roughness );
			#else
				return vec3( 0.0 );
			#endif
		}
	#endif
#endif`,Ed=`ToonMaterial material;
material.diffuseColor = diffuseColor.rgb;`,bd=`varying vec3 vViewPosition;
struct ToonMaterial {
	vec3 diffuseColor;
};
void RE_Direct_Toon( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in ToonMaterial material, inout ReflectedLight reflectedLight ) {
	vec3 irradiance = getGradientIrradiance( geometryNormal, directLight.direction ) * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Toon( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in ToonMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_Toon
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Toon`,Td=`BlinnPhongMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularColor = specular;
material.specularShininess = shininess;
material.specularStrength = specularStrength;`,wd=`varying vec3 vViewPosition;
struct BlinnPhongMaterial {
	vec3 diffuseColor;
	vec3 specularColor;
	float specularShininess;
	float specularStrength;
};
void RE_Direct_BlinnPhong( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in BlinnPhongMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
	reflectedLight.directSpecular += irradiance * BRDF_BlinnPhong( directLight.direction, geometryViewDir, geometryNormal, material.specularColor, material.specularShininess ) * material.specularStrength;
}
void RE_IndirectDiffuse_BlinnPhong( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in BlinnPhongMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_BlinnPhong
#define RE_IndirectDiffuse		RE_IndirectDiffuse_BlinnPhong`,Ad=`PhysicalMaterial material;
material.diffuseColor = diffuseColor.rgb * ( 1.0 - metalnessFactor );
vec3 dxy = max( abs( dFdx( nonPerturbedNormal ) ), abs( dFdy( nonPerturbedNormal ) ) );
float geometryRoughness = max( max( dxy.x, dxy.y ), dxy.z );
material.roughness = max( roughnessFactor, 0.0525 );material.roughness += geometryRoughness;
material.roughness = min( material.roughness, 1.0 );
#ifdef IOR
	material.ior = ior;
	#ifdef USE_SPECULAR
		float specularIntensityFactor = specularIntensity;
		vec3 specularColorFactor = specularColor;
		#ifdef USE_SPECULAR_COLORMAP
			specularColorFactor *= texture2D( specularColorMap, vSpecularColorMapUv ).rgb;
		#endif
		#ifdef USE_SPECULAR_INTENSITYMAP
			specularIntensityFactor *= texture2D( specularIntensityMap, vSpecularIntensityMapUv ).a;
		#endif
		material.specularF90 = mix( specularIntensityFactor, 1.0, metalnessFactor );
	#else
		float specularIntensityFactor = 1.0;
		vec3 specularColorFactor = vec3( 1.0 );
		material.specularF90 = 1.0;
	#endif
	material.specularColor = mix( min( pow2( ( material.ior - 1.0 ) / ( material.ior + 1.0 ) ) * specularColorFactor, vec3( 1.0 ) ) * specularIntensityFactor, diffuseColor.rgb, metalnessFactor );
#else
	material.specularColor = mix( vec3( 0.04 ), diffuseColor.rgb, metalnessFactor );
	material.specularF90 = 1.0;
#endif
#ifdef USE_CLEARCOAT
	material.clearcoat = clearcoat;
	material.clearcoatRoughness = clearcoatRoughness;
	material.clearcoatF0 = vec3( 0.04 );
	material.clearcoatF90 = 1.0;
	#ifdef USE_CLEARCOATMAP
		material.clearcoat *= texture2D( clearcoatMap, vClearcoatMapUv ).x;
	#endif
	#ifdef USE_CLEARCOAT_ROUGHNESSMAP
		material.clearcoatRoughness *= texture2D( clearcoatRoughnessMap, vClearcoatRoughnessMapUv ).y;
	#endif
	material.clearcoat = saturate( material.clearcoat );	material.clearcoatRoughness = max( material.clearcoatRoughness, 0.0525 );
	material.clearcoatRoughness += geometryRoughness;
	material.clearcoatRoughness = min( material.clearcoatRoughness, 1.0 );
#endif
#ifdef USE_IRIDESCENCE
	material.iridescence = iridescence;
	material.iridescenceIOR = iridescenceIOR;
	#ifdef USE_IRIDESCENCEMAP
		material.iridescence *= texture2D( iridescenceMap, vIridescenceMapUv ).r;
	#endif
	#ifdef USE_IRIDESCENCE_THICKNESSMAP
		material.iridescenceThickness = (iridescenceThicknessMaximum - iridescenceThicknessMinimum) * texture2D( iridescenceThicknessMap, vIridescenceThicknessMapUv ).g + iridescenceThicknessMinimum;
	#else
		material.iridescenceThickness = iridescenceThicknessMaximum;
	#endif
#endif
#ifdef USE_SHEEN
	material.sheenColor = sheenColor;
	#ifdef USE_SHEEN_COLORMAP
		material.sheenColor *= texture2D( sheenColorMap, vSheenColorMapUv ).rgb;
	#endif
	material.sheenRoughness = clamp( sheenRoughness, 0.07, 1.0 );
	#ifdef USE_SHEEN_ROUGHNESSMAP
		material.sheenRoughness *= texture2D( sheenRoughnessMap, vSheenRoughnessMapUv ).a;
	#endif
#endif
#ifdef USE_ANISOTROPY
	#ifdef USE_ANISOTROPYMAP
		mat2 anisotropyMat = mat2( anisotropyVector.x, anisotropyVector.y, - anisotropyVector.y, anisotropyVector.x );
		vec3 anisotropyPolar = texture2D( anisotropyMap, vAnisotropyMapUv ).rgb;
		vec2 anisotropyV = anisotropyMat * normalize( 2.0 * anisotropyPolar.rg - vec2( 1.0 ) ) * anisotropyPolar.b;
	#else
		vec2 anisotropyV = anisotropyVector;
	#endif
	material.anisotropy = length( anisotropyV );
	if( material.anisotropy == 0.0 ) {
		anisotropyV = vec2( 1.0, 0.0 );
	} else {
		anisotropyV /= material.anisotropy;
		material.anisotropy = saturate( material.anisotropy );
	}
	material.alphaT = mix( pow2( material.roughness ), 1.0, pow2( material.anisotropy ) );
	material.anisotropyT = tbn[ 0 ] * anisotropyV.x + tbn[ 1 ] * anisotropyV.y;
	material.anisotropyB = tbn[ 1 ] * anisotropyV.x - tbn[ 0 ] * anisotropyV.y;
#endif`,Rd=`struct PhysicalMaterial {
	vec3 diffuseColor;
	float roughness;
	vec3 specularColor;
	float specularF90;
	#ifdef USE_CLEARCOAT
		float clearcoat;
		float clearcoatRoughness;
		vec3 clearcoatF0;
		float clearcoatF90;
	#endif
	#ifdef USE_IRIDESCENCE
		float iridescence;
		float iridescenceIOR;
		float iridescenceThickness;
		vec3 iridescenceFresnel;
		vec3 iridescenceF0;
	#endif
	#ifdef USE_SHEEN
		vec3 sheenColor;
		float sheenRoughness;
	#endif
	#ifdef IOR
		float ior;
	#endif
	#ifdef USE_TRANSMISSION
		float transmission;
		float transmissionAlpha;
		float thickness;
		float attenuationDistance;
		vec3 attenuationColor;
	#endif
	#ifdef USE_ANISOTROPY
		float anisotropy;
		float alphaT;
		vec3 anisotropyT;
		vec3 anisotropyB;
	#endif
};
vec3 clearcoatSpecularDirect = vec3( 0.0 );
vec3 clearcoatSpecularIndirect = vec3( 0.0 );
vec3 sheenSpecularDirect = vec3( 0.0 );
vec3 sheenSpecularIndirect = vec3(0.0 );
vec3 Schlick_to_F0( const in vec3 f, const in float f90, const in float dotVH ) {
    float x = clamp( 1.0 - dotVH, 0.0, 1.0 );
    float x2 = x * x;
    float x5 = clamp( x * x2 * x2, 0.0, 0.9999 );
    return ( f - vec3( f90 ) * x5 ) / ( 1.0 - x5 );
}
float V_GGX_SmithCorrelated( const in float alpha, const in float dotNL, const in float dotNV ) {
	float a2 = pow2( alpha );
	float gv = dotNL * sqrt( a2 + ( 1.0 - a2 ) * pow2( dotNV ) );
	float gl = dotNV * sqrt( a2 + ( 1.0 - a2 ) * pow2( dotNL ) );
	return 0.5 / max( gv + gl, EPSILON );
}
float D_GGX( const in float alpha, const in float dotNH ) {
	float a2 = pow2( alpha );
	float denom = pow2( dotNH ) * ( a2 - 1.0 ) + 1.0;
	return RECIPROCAL_PI * a2 / pow2( denom );
}
#ifdef USE_ANISOTROPY
	float V_GGX_SmithCorrelated_Anisotropic( const in float alphaT, const in float alphaB, const in float dotTV, const in float dotBV, const in float dotTL, const in float dotBL, const in float dotNV, const in float dotNL ) {
		float gv = dotNL * length( vec3( alphaT * dotTV, alphaB * dotBV, dotNV ) );
		float gl = dotNV * length( vec3( alphaT * dotTL, alphaB * dotBL, dotNL ) );
		float v = 0.5 / ( gv + gl );
		return saturate(v);
	}
	float D_GGX_Anisotropic( const in float alphaT, const in float alphaB, const in float dotNH, const in float dotTH, const in float dotBH ) {
		float a2 = alphaT * alphaB;
		highp vec3 v = vec3( alphaB * dotTH, alphaT * dotBH, a2 * dotNH );
		highp float v2 = dot( v, v );
		float w2 = a2 / v2;
		return RECIPROCAL_PI * a2 * pow2 ( w2 );
	}
#endif
#ifdef USE_CLEARCOAT
	vec3 BRDF_GGX_Clearcoat( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in PhysicalMaterial material) {
		vec3 f0 = material.clearcoatF0;
		float f90 = material.clearcoatF90;
		float roughness = material.clearcoatRoughness;
		float alpha = pow2( roughness );
		vec3 halfDir = normalize( lightDir + viewDir );
		float dotNL = saturate( dot( normal, lightDir ) );
		float dotNV = saturate( dot( normal, viewDir ) );
		float dotNH = saturate( dot( normal, halfDir ) );
		float dotVH = saturate( dot( viewDir, halfDir ) );
		vec3 F = F_Schlick( f0, f90, dotVH );
		float V = V_GGX_SmithCorrelated( alpha, dotNL, dotNV );
		float D = D_GGX( alpha, dotNH );
		return F * ( V * D );
	}
#endif
vec3 BRDF_GGX( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in PhysicalMaterial material ) {
	vec3 f0 = material.specularColor;
	float f90 = material.specularF90;
	float roughness = material.roughness;
	float alpha = pow2( roughness );
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNL = saturate( dot( normal, lightDir ) );
	float dotNV = saturate( dot( normal, viewDir ) );
	float dotNH = saturate( dot( normal, halfDir ) );
	float dotVH = saturate( dot( viewDir, halfDir ) );
	vec3 F = F_Schlick( f0, f90, dotVH );
	#ifdef USE_IRIDESCENCE
		F = mix( F, material.iridescenceFresnel, material.iridescence );
	#endif
	#ifdef USE_ANISOTROPY
		float dotTL = dot( material.anisotropyT, lightDir );
		float dotTV = dot( material.anisotropyT, viewDir );
		float dotTH = dot( material.anisotropyT, halfDir );
		float dotBL = dot( material.anisotropyB, lightDir );
		float dotBV = dot( material.anisotropyB, viewDir );
		float dotBH = dot( material.anisotropyB, halfDir );
		float V = V_GGX_SmithCorrelated_Anisotropic( material.alphaT, alpha, dotTV, dotBV, dotTL, dotBL, dotNV, dotNL );
		float D = D_GGX_Anisotropic( material.alphaT, alpha, dotNH, dotTH, dotBH );
	#else
		float V = V_GGX_SmithCorrelated( alpha, dotNL, dotNV );
		float D = D_GGX( alpha, dotNH );
	#endif
	return F * ( V * D );
}
vec2 LTC_Uv( const in vec3 N, const in vec3 V, const in float roughness ) {
	const float LUT_SIZE = 64.0;
	const float LUT_SCALE = ( LUT_SIZE - 1.0 ) / LUT_SIZE;
	const float LUT_BIAS = 0.5 / LUT_SIZE;
	float dotNV = saturate( dot( N, V ) );
	vec2 uv = vec2( roughness, sqrt( 1.0 - dotNV ) );
	uv = uv * LUT_SCALE + LUT_BIAS;
	return uv;
}
float LTC_ClippedSphereFormFactor( const in vec3 f ) {
	float l = length( f );
	return max( ( l * l + f.z ) / ( l + 1.0 ), 0.0 );
}
vec3 LTC_EdgeVectorFormFactor( const in vec3 v1, const in vec3 v2 ) {
	float x = dot( v1, v2 );
	float y = abs( x );
	float a = 0.8543985 + ( 0.4965155 + 0.0145206 * y ) * y;
	float b = 3.4175940 + ( 4.1616724 + y ) * y;
	float v = a / b;
	float theta_sintheta = ( x > 0.0 ) ? v : 0.5 * inversesqrt( max( 1.0 - x * x, 1e-7 ) ) - v;
	return cross( v1, v2 ) * theta_sintheta;
}
vec3 LTC_Evaluate( const in vec3 N, const in vec3 V, const in vec3 P, const in mat3 mInv, const in vec3 rectCoords[ 4 ] ) {
	vec3 v1 = rectCoords[ 1 ] - rectCoords[ 0 ];
	vec3 v2 = rectCoords[ 3 ] - rectCoords[ 0 ];
	vec3 lightNormal = cross( v1, v2 );
	if( dot( lightNormal, P - rectCoords[ 0 ] ) < 0.0 ) return vec3( 0.0 );
	vec3 T1, T2;
	T1 = normalize( V - N * dot( V, N ) );
	T2 = - cross( N, T1 );
	mat3 mat = mInv * transposeMat3( mat3( T1, T2, N ) );
	vec3 coords[ 4 ];
	coords[ 0 ] = mat * ( rectCoords[ 0 ] - P );
	coords[ 1 ] = mat * ( rectCoords[ 1 ] - P );
	coords[ 2 ] = mat * ( rectCoords[ 2 ] - P );
	coords[ 3 ] = mat * ( rectCoords[ 3 ] - P );
	coords[ 0 ] = normalize( coords[ 0 ] );
	coords[ 1 ] = normalize( coords[ 1 ] );
	coords[ 2 ] = normalize( coords[ 2 ] );
	coords[ 3 ] = normalize( coords[ 3 ] );
	vec3 vectorFormFactor = vec3( 0.0 );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 0 ], coords[ 1 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 1 ], coords[ 2 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 2 ], coords[ 3 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 3 ], coords[ 0 ] );
	float result = LTC_ClippedSphereFormFactor( vectorFormFactor );
	return vec3( result );
}
#if defined( USE_SHEEN )
float D_Charlie( float roughness, float dotNH ) {
	float alpha = pow2( roughness );
	float invAlpha = 1.0 / alpha;
	float cos2h = dotNH * dotNH;
	float sin2h = max( 1.0 - cos2h, 0.0078125 );
	return ( 2.0 + invAlpha ) * pow( sin2h, invAlpha * 0.5 ) / ( 2.0 * PI );
}
float V_Neubelt( float dotNV, float dotNL ) {
	return saturate( 1.0 / ( 4.0 * ( dotNL + dotNV - dotNL * dotNV ) ) );
}
vec3 BRDF_Sheen( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, vec3 sheenColor, const in float sheenRoughness ) {
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNL = saturate( dot( normal, lightDir ) );
	float dotNV = saturate( dot( normal, viewDir ) );
	float dotNH = saturate( dot( normal, halfDir ) );
	float D = D_Charlie( sheenRoughness, dotNH );
	float V = V_Neubelt( dotNV, dotNL );
	return sheenColor * ( D * V );
}
#endif
float IBLSheenBRDF( const in vec3 normal, const in vec3 viewDir, const in float roughness ) {
	float dotNV = saturate( dot( normal, viewDir ) );
	float r2 = roughness * roughness;
	float a = roughness < 0.25 ? -339.2 * r2 + 161.4 * roughness - 25.9 : -8.48 * r2 + 14.3 * roughness - 9.95;
	float b = roughness < 0.25 ? 44.0 * r2 - 23.7 * roughness + 3.26 : 1.97 * r2 - 3.27 * roughness + 0.72;
	float DG = exp( a * dotNV + b ) + ( roughness < 0.25 ? 0.0 : 0.1 * ( roughness - 0.25 ) );
	return saturate( DG * RECIPROCAL_PI );
}
vec2 DFGApprox( const in vec3 normal, const in vec3 viewDir, const in float roughness ) {
	float dotNV = saturate( dot( normal, viewDir ) );
	const vec4 c0 = vec4( - 1, - 0.0275, - 0.572, 0.022 );
	const vec4 c1 = vec4( 1, 0.0425, 1.04, - 0.04 );
	vec4 r = roughness * c0 + c1;
	float a004 = min( r.x * r.x, exp2( - 9.28 * dotNV ) ) * r.x + r.y;
	vec2 fab = vec2( - 1.04, 1.04 ) * a004 + r.zw;
	return fab;
}
vec3 EnvironmentBRDF( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float roughness ) {
	vec2 fab = DFGApprox( normal, viewDir, roughness );
	return specularColor * fab.x + specularF90 * fab.y;
}
#ifdef USE_IRIDESCENCE
void computeMultiscatteringIridescence( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float iridescence, const in vec3 iridescenceF0, const in float roughness, inout vec3 singleScatter, inout vec3 multiScatter ) {
#else
void computeMultiscattering( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float roughness, inout vec3 singleScatter, inout vec3 multiScatter ) {
#endif
	vec2 fab = DFGApprox( normal, viewDir, roughness );
	#ifdef USE_IRIDESCENCE
		vec3 Fr = mix( specularColor, iridescenceF0, iridescence );
	#else
		vec3 Fr = specularColor;
	#endif
	vec3 FssEss = Fr * fab.x + specularF90 * fab.y;
	float Ess = fab.x + fab.y;
	float Ems = 1.0 - Ess;
	vec3 Favg = Fr + ( 1.0 - Fr ) * 0.047619;	vec3 Fms = FssEss * Favg / ( 1.0 - Ems * Favg );
	singleScatter += FssEss;
	multiScatter += Fms * Ems;
}
#if NUM_RECT_AREA_LIGHTS > 0
	void RE_Direct_RectArea_Physical( const in RectAreaLight rectAreaLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
		vec3 normal = geometryNormal;
		vec3 viewDir = geometryViewDir;
		vec3 position = geometryPosition;
		vec3 lightPos = rectAreaLight.position;
		vec3 halfWidth = rectAreaLight.halfWidth;
		vec3 halfHeight = rectAreaLight.halfHeight;
		vec3 lightColor = rectAreaLight.color;
		float roughness = material.roughness;
		vec3 rectCoords[ 4 ];
		rectCoords[ 0 ] = lightPos + halfWidth - halfHeight;		rectCoords[ 1 ] = lightPos - halfWidth - halfHeight;
		rectCoords[ 2 ] = lightPos - halfWidth + halfHeight;
		rectCoords[ 3 ] = lightPos + halfWidth + halfHeight;
		vec2 uv = LTC_Uv( normal, viewDir, roughness );
		vec4 t1 = texture2D( ltc_1, uv );
		vec4 t2 = texture2D( ltc_2, uv );
		mat3 mInv = mat3(
			vec3( t1.x, 0, t1.y ),
			vec3(    0, 1,    0 ),
			vec3( t1.z, 0, t1.w )
		);
		vec3 fresnel = ( material.specularColor * t2.x + ( vec3( 1.0 ) - material.specularColor ) * t2.y );
		reflectedLight.directSpecular += lightColor * fresnel * LTC_Evaluate( normal, viewDir, position, mInv, rectCoords );
		reflectedLight.directDiffuse += lightColor * material.diffuseColor * LTC_Evaluate( normal, viewDir, position, mat3( 1.0 ), rectCoords );
	}
#endif
void RE_Direct_Physical( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	#ifdef USE_CLEARCOAT
		float dotNLcc = saturate( dot( geometryClearcoatNormal, directLight.direction ) );
		vec3 ccIrradiance = dotNLcc * directLight.color;
		clearcoatSpecularDirect += ccIrradiance * BRDF_GGX_Clearcoat( directLight.direction, geometryViewDir, geometryClearcoatNormal, material );
	#endif
	#ifdef USE_SHEEN
		sheenSpecularDirect += irradiance * BRDF_Sheen( directLight.direction, geometryViewDir, geometryNormal, material.sheenColor, material.sheenRoughness );
	#endif
	reflectedLight.directSpecular += irradiance * BRDF_GGX( directLight.direction, geometryViewDir, geometryNormal, material );
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Physical( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectSpecular_Physical( const in vec3 radiance, const in vec3 irradiance, const in vec3 clearcoatRadiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight) {
	#ifdef USE_CLEARCOAT
		clearcoatSpecularIndirect += clearcoatRadiance * EnvironmentBRDF( geometryClearcoatNormal, geometryViewDir, material.clearcoatF0, material.clearcoatF90, material.clearcoatRoughness );
	#endif
	#ifdef USE_SHEEN
		sheenSpecularIndirect += irradiance * material.sheenColor * IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness );
	#endif
	vec3 singleScattering = vec3( 0.0 );
	vec3 multiScattering = vec3( 0.0 );
	vec3 cosineWeightedIrradiance = irradiance * RECIPROCAL_PI;
	#ifdef USE_IRIDESCENCE
		computeMultiscatteringIridescence( geometryNormal, geometryViewDir, material.specularColor, material.specularF90, material.iridescence, material.iridescenceFresnel, material.roughness, singleScattering, multiScattering );
	#else
		computeMultiscattering( geometryNormal, geometryViewDir, material.specularColor, material.specularF90, material.roughness, singleScattering, multiScattering );
	#endif
	vec3 totalScattering = singleScattering + multiScattering;
	vec3 diffuse = material.diffuseColor * ( 1.0 - max( max( totalScattering.r, totalScattering.g ), totalScattering.b ) );
	reflectedLight.indirectSpecular += radiance * singleScattering;
	reflectedLight.indirectSpecular += multiScattering * cosineWeightedIrradiance;
	reflectedLight.indirectDiffuse += diffuse * cosineWeightedIrradiance;
}
#define RE_Direct				RE_Direct_Physical
#define RE_Direct_RectArea		RE_Direct_RectArea_Physical
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Physical
#define RE_IndirectSpecular		RE_IndirectSpecular_Physical
float computeSpecularOcclusion( const in float dotNV, const in float ambientOcclusion, const in float roughness ) {
	return saturate( pow( dotNV + ambientOcclusion, exp2( - 16.0 * roughness - 1.0 ) ) - 1.0 + ambientOcclusion );
}`,Cd=`
vec3 geometryPosition = - vViewPosition;
vec3 geometryNormal = normal;
vec3 geometryViewDir = ( isOrthographic ) ? vec3( 0, 0, 1 ) : normalize( vViewPosition );
vec3 geometryClearcoatNormal = vec3( 0.0 );
#ifdef USE_CLEARCOAT
	geometryClearcoatNormal = clearcoatNormal;
#endif
#ifdef USE_IRIDESCENCE
	float dotNVi = saturate( dot( normal, geometryViewDir ) );
	if ( material.iridescenceThickness == 0.0 ) {
		material.iridescence = 0.0;
	} else {
		material.iridescence = saturate( material.iridescence );
	}
	if ( material.iridescence > 0.0 ) {
		material.iridescenceFresnel = evalIridescence( 1.0, material.iridescenceIOR, dotNVi, material.iridescenceThickness, material.specularColor );
		material.iridescenceF0 = Schlick_to_F0( material.iridescenceFresnel, 1.0, dotNVi );
	}
#endif
IncidentLight directLight;
#if ( NUM_POINT_LIGHTS > 0 ) && defined( RE_Direct )
	PointLight pointLight;
	#if defined( USE_SHADOWMAP ) && NUM_POINT_LIGHT_SHADOWS > 0
	PointLightShadow pointLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_POINT_LIGHTS; i ++ ) {
		pointLight = pointLights[ i ];
		getPointLightInfo( pointLight, geometryPosition, directLight );
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_POINT_LIGHT_SHADOWS )
		pointLightShadow = pointLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getPointShadow( pointShadowMap[ i ], pointLightShadow.shadowMapSize, pointLightShadow.shadowBias, pointLightShadow.shadowRadius, vPointShadowCoord[ i ], pointLightShadow.shadowCameraNear, pointLightShadow.shadowCameraFar ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_SPOT_LIGHTS > 0 ) && defined( RE_Direct )
	SpotLight spotLight;
	vec4 spotColor;
	vec3 spotLightCoord;
	bool inSpotLightMap;
	#if defined( USE_SHADOWMAP ) && NUM_SPOT_LIGHT_SHADOWS > 0
	SpotLightShadow spotLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHTS; i ++ ) {
		spotLight = spotLights[ i ];
		getSpotLightInfo( spotLight, geometryPosition, directLight );
		#if ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS )
		#define SPOT_LIGHT_MAP_INDEX UNROLLED_LOOP_INDEX
		#elif ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
		#define SPOT_LIGHT_MAP_INDEX NUM_SPOT_LIGHT_MAPS
		#else
		#define SPOT_LIGHT_MAP_INDEX ( UNROLLED_LOOP_INDEX - NUM_SPOT_LIGHT_SHADOWS + NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS )
		#endif
		#if ( SPOT_LIGHT_MAP_INDEX < NUM_SPOT_LIGHT_MAPS )
			spotLightCoord = vSpotLightCoord[ i ].xyz / vSpotLightCoord[ i ].w;
			inSpotLightMap = all( lessThan( abs( spotLightCoord * 2. - 1. ), vec3( 1.0 ) ) );
			spotColor = texture2D( spotLightMap[ SPOT_LIGHT_MAP_INDEX ], spotLightCoord.xy );
			directLight.color = inSpotLightMap ? directLight.color * spotColor.rgb : directLight.color;
		#endif
		#undef SPOT_LIGHT_MAP_INDEX
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
		spotLightShadow = spotLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getShadow( spotShadowMap[ i ], spotLightShadow.shadowMapSize, spotLightShadow.shadowBias, spotLightShadow.shadowRadius, vSpotLightCoord[ i ] ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_DIR_LIGHTS > 0 ) && defined( RE_Direct )
	DirectionalLight directionalLight;
	#if defined( USE_SHADOWMAP ) && NUM_DIR_LIGHT_SHADOWS > 0
	DirectionalLightShadow directionalLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_DIR_LIGHTS; i ++ ) {
		directionalLight = directionalLights[ i ];
		getDirectionalLightInfo( directionalLight, directLight );
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_DIR_LIGHT_SHADOWS )
		directionalLightShadow = directionalLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getShadow( directionalShadowMap[ i ], directionalLightShadow.shadowMapSize, directionalLightShadow.shadowBias, directionalLightShadow.shadowRadius, vDirectionalShadowCoord[ i ] ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_RECT_AREA_LIGHTS > 0 ) && defined( RE_Direct_RectArea )
	RectAreaLight rectAreaLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_RECT_AREA_LIGHTS; i ++ ) {
		rectAreaLight = rectAreaLights[ i ];
		RE_Direct_RectArea( rectAreaLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if defined( RE_IndirectDiffuse )
	vec3 iblIrradiance = vec3( 0.0 );
	vec3 irradiance = getAmbientLightIrradiance( ambientLightColor );
	#if defined( USE_LIGHT_PROBES )
		irradiance += getLightProbeIrradiance( lightProbe, geometryNormal );
	#endif
	#if ( NUM_HEMI_LIGHTS > 0 )
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_HEMI_LIGHTS; i ++ ) {
			irradiance += getHemisphereLightIrradiance( hemisphereLights[ i ], geometryNormal );
		}
		#pragma unroll_loop_end
	#endif
#endif
#if defined( RE_IndirectSpecular )
	vec3 radiance = vec3( 0.0 );
	vec3 clearcoatRadiance = vec3( 0.0 );
#endif`,Ld=`#if defined( RE_IndirectDiffuse )
	#ifdef USE_LIGHTMAP
		vec4 lightMapTexel = texture2D( lightMap, vLightMapUv );
		vec3 lightMapIrradiance = lightMapTexel.rgb * lightMapIntensity;
		irradiance += lightMapIrradiance;
	#endif
	#if defined( USE_ENVMAP ) && defined( STANDARD ) && defined( ENVMAP_TYPE_CUBE_UV )
		iblIrradiance += getIBLIrradiance( geometryNormal );
	#endif
#endif
#if defined( USE_ENVMAP ) && defined( RE_IndirectSpecular )
	#ifdef USE_ANISOTROPY
		radiance += getIBLAnisotropyRadiance( geometryViewDir, geometryNormal, material.roughness, material.anisotropyB, material.anisotropy );
	#else
		radiance += getIBLRadiance( geometryViewDir, geometryNormal, material.roughness );
	#endif
	#ifdef USE_CLEARCOAT
		clearcoatRadiance += getIBLRadiance( geometryViewDir, geometryClearcoatNormal, material.clearcoatRoughness );
	#endif
#endif`,Pd=`#if defined( RE_IndirectDiffuse )
	RE_IndirectDiffuse( irradiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif
#if defined( RE_IndirectSpecular )
	RE_IndirectSpecular( radiance, iblIrradiance, clearcoatRadiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif`,Dd=`#if defined( USE_LOGDEPTHBUF ) && defined( USE_LOGDEPTHBUF_EXT )
	gl_FragDepthEXT = vIsPerspective == 0.0 ? gl_FragCoord.z : log2( vFragDepth ) * logDepthBufFC * 0.5;
#endif`,Ud=`#if defined( USE_LOGDEPTHBUF ) && defined( USE_LOGDEPTHBUF_EXT )
	uniform float logDepthBufFC;
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,Id=`#ifdef USE_LOGDEPTHBUF
	#ifdef USE_LOGDEPTHBUF_EXT
		varying float vFragDepth;
		varying float vIsPerspective;
	#else
		uniform float logDepthBufFC;
	#endif
#endif`,Nd=`#ifdef USE_LOGDEPTHBUF
	#ifdef USE_LOGDEPTHBUF_EXT
		vFragDepth = 1.0 + gl_Position.w;
		vIsPerspective = float( isPerspectiveMatrix( projectionMatrix ) );
	#else
		if ( isPerspectiveMatrix( projectionMatrix ) ) {
			gl_Position.z = log2( max( EPSILON, gl_Position.w + 1.0 ) ) * logDepthBufFC - 1.0;
			gl_Position.z *= gl_Position.w;
		}
	#endif
#endif`,Fd=`#ifdef USE_MAP
	vec4 sampledDiffuseColor = texture2D( map, vMapUv );
	#ifdef DECODE_VIDEO_TEXTURE
		sampledDiffuseColor = vec4( mix( pow( sampledDiffuseColor.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), sampledDiffuseColor.rgb * 0.0773993808, vec3( lessThanEqual( sampledDiffuseColor.rgb, vec3( 0.04045 ) ) ) ), sampledDiffuseColor.w );
	
	#endif
	diffuseColor *= sampledDiffuseColor;
#endif`,Od=`#ifdef USE_MAP
	uniform sampler2D map;
#endif`,zd=`#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
	#if defined( USE_POINTS_UV )
		vec2 uv = vUv;
	#else
		vec2 uv = ( uvTransform * vec3( gl_PointCoord.x, 1.0 - gl_PointCoord.y, 1 ) ).xy;
	#endif
#endif
#ifdef USE_MAP
	diffuseColor *= texture2D( map, uv );
#endif
#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, uv ).g;
#endif`,Bd=`#if defined( USE_POINTS_UV )
	varying vec2 vUv;
#else
	#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
		uniform mat3 uvTransform;
	#endif
#endif
#ifdef USE_MAP
	uniform sampler2D map;
#endif
#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,kd=`float metalnessFactor = metalness;
#ifdef USE_METALNESSMAP
	vec4 texelMetalness = texture2D( metalnessMap, vMetalnessMapUv );
	metalnessFactor *= texelMetalness.b;
#endif`,Hd=`#ifdef USE_METALNESSMAP
	uniform sampler2D metalnessMap;
#endif`,Gd=`#if defined( USE_MORPHCOLORS ) && defined( MORPHTARGETS_TEXTURE )
	vColor *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		#if defined( USE_COLOR_ALPHA )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ) * morphTargetInfluences[ i ];
		#elif defined( USE_COLOR )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ).rgb * morphTargetInfluences[ i ];
		#endif
	}
#endif`,Vd=`#ifdef USE_MORPHNORMALS
	objectNormal *= morphTargetBaseInfluence;
	#ifdef MORPHTARGETS_TEXTURE
		for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
			if ( morphTargetInfluences[ i ] != 0.0 ) objectNormal += getMorph( gl_VertexID, i, 1 ).xyz * morphTargetInfluences[ i ];
		}
	#else
		objectNormal += morphNormal0 * morphTargetInfluences[ 0 ];
		objectNormal += morphNormal1 * morphTargetInfluences[ 1 ];
		objectNormal += morphNormal2 * morphTargetInfluences[ 2 ];
		objectNormal += morphNormal3 * morphTargetInfluences[ 3 ];
	#endif
#endif`,Wd=`#ifdef USE_MORPHTARGETS
	uniform float morphTargetBaseInfluence;
	#ifdef MORPHTARGETS_TEXTURE
		uniform float morphTargetInfluences[ MORPHTARGETS_COUNT ];
		uniform sampler2DArray morphTargetsTexture;
		uniform ivec2 morphTargetsTextureSize;
		vec4 getMorph( const in int vertexIndex, const in int morphTargetIndex, const in int offset ) {
			int texelIndex = vertexIndex * MORPHTARGETS_TEXTURE_STRIDE + offset;
			int y = texelIndex / morphTargetsTextureSize.x;
			int x = texelIndex - y * morphTargetsTextureSize.x;
			ivec3 morphUV = ivec3( x, y, morphTargetIndex );
			return texelFetch( morphTargetsTexture, morphUV, 0 );
		}
	#else
		#ifndef USE_MORPHNORMALS
			uniform float morphTargetInfluences[ 8 ];
		#else
			uniform float morphTargetInfluences[ 4 ];
		#endif
	#endif
#endif`,Xd=`#ifdef USE_MORPHTARGETS
	transformed *= morphTargetBaseInfluence;
	#ifdef MORPHTARGETS_TEXTURE
		for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
			if ( morphTargetInfluences[ i ] != 0.0 ) transformed += getMorph( gl_VertexID, i, 0 ).xyz * morphTargetInfluences[ i ];
		}
	#else
		transformed += morphTarget0 * morphTargetInfluences[ 0 ];
		transformed += morphTarget1 * morphTargetInfluences[ 1 ];
		transformed += morphTarget2 * morphTargetInfluences[ 2 ];
		transformed += morphTarget3 * morphTargetInfluences[ 3 ];
		#ifndef USE_MORPHNORMALS
			transformed += morphTarget4 * morphTargetInfluences[ 4 ];
			transformed += morphTarget5 * morphTargetInfluences[ 5 ];
			transformed += morphTarget6 * morphTargetInfluences[ 6 ];
			transformed += morphTarget7 * morphTargetInfluences[ 7 ];
		#endif
	#endif
#endif`,qd=`float faceDirection = gl_FrontFacing ? 1.0 : - 1.0;
#ifdef FLAT_SHADED
	vec3 fdx = dFdx( vViewPosition );
	vec3 fdy = dFdy( vViewPosition );
	vec3 normal = normalize( cross( fdx, fdy ) );
#else
	vec3 normal = normalize( vNormal );
	#ifdef DOUBLE_SIDED
		normal *= faceDirection;
	#endif
#endif
#if defined( USE_NORMALMAP_TANGENTSPACE ) || defined( USE_CLEARCOAT_NORMALMAP ) || defined( USE_ANISOTROPY )
	#ifdef USE_TANGENT
		mat3 tbn = mat3( normalize( vTangent ), normalize( vBitangent ), normal );
	#else
		mat3 tbn = getTangentFrame( - vViewPosition, normal,
		#if defined( USE_NORMALMAP )
			vNormalMapUv
		#elif defined( USE_CLEARCOAT_NORMALMAP )
			vClearcoatNormalMapUv
		#else
			vUv
		#endif
		);
	#endif
	#if defined( DOUBLE_SIDED ) && ! defined( FLAT_SHADED )
		tbn[0] *= faceDirection;
		tbn[1] *= faceDirection;
	#endif
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	#ifdef USE_TANGENT
		mat3 tbn2 = mat3( normalize( vTangent ), normalize( vBitangent ), normal );
	#else
		mat3 tbn2 = getTangentFrame( - vViewPosition, normal, vClearcoatNormalMapUv );
	#endif
	#if defined( DOUBLE_SIDED ) && ! defined( FLAT_SHADED )
		tbn2[0] *= faceDirection;
		tbn2[1] *= faceDirection;
	#endif
#endif
vec3 nonPerturbedNormal = normal;`,jd=`#ifdef USE_NORMALMAP_OBJECTSPACE
	normal = texture2D( normalMap, vNormalMapUv ).xyz * 2.0 - 1.0;
	#ifdef FLIP_SIDED
		normal = - normal;
	#endif
	#ifdef DOUBLE_SIDED
		normal = normal * faceDirection;
	#endif
	normal = normalize( normalMatrix * normal );
#elif defined( USE_NORMALMAP_TANGENTSPACE )
	vec3 mapN = texture2D( normalMap, vNormalMapUv ).xyz * 2.0 - 1.0;
	mapN.xy *= normalScale;
	normal = normalize( tbn * mapN );
#elif defined( USE_BUMPMAP )
	normal = perturbNormalArb( - vViewPosition, normal, dHdxy_fwd(), faceDirection );
#endif`,Yd=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,$d=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,Kd=`#ifndef FLAT_SHADED
	vNormal = normalize( transformedNormal );
	#ifdef USE_TANGENT
		vTangent = normalize( transformedTangent );
		vBitangent = normalize( cross( vNormal, vTangent ) * tangent.w );
	#endif
#endif`,Zd=`#ifdef USE_NORMALMAP
	uniform sampler2D normalMap;
	uniform vec2 normalScale;
#endif
#ifdef USE_NORMALMAP_OBJECTSPACE
	uniform mat3 normalMatrix;
#endif
#if ! defined ( USE_TANGENT ) && ( defined ( USE_NORMALMAP_TANGENTSPACE ) || defined ( USE_CLEARCOAT_NORMALMAP ) || defined( USE_ANISOTROPY ) )
	mat3 getTangentFrame( vec3 eye_pos, vec3 surf_norm, vec2 uv ) {
		vec3 q0 = dFdx( eye_pos.xyz );
		vec3 q1 = dFdy( eye_pos.xyz );
		vec2 st0 = dFdx( uv.st );
		vec2 st1 = dFdy( uv.st );
		vec3 N = surf_norm;
		vec3 q1perp = cross( q1, N );
		vec3 q0perp = cross( N, q0 );
		vec3 T = q1perp * st0.x + q0perp * st1.x;
		vec3 B = q1perp * st0.y + q0perp * st1.y;
		float det = max( dot( T, T ), dot( B, B ) );
		float scale = ( det == 0.0 ) ? 0.0 : inversesqrt( det );
		return mat3( T * scale, B * scale, N );
	}
#endif`,Jd=`#ifdef USE_CLEARCOAT
	vec3 clearcoatNormal = nonPerturbedNormal;
#endif`,Qd=`#ifdef USE_CLEARCOAT_NORMALMAP
	vec3 clearcoatMapN = texture2D( clearcoatNormalMap, vClearcoatNormalMapUv ).xyz * 2.0 - 1.0;
	clearcoatMapN.xy *= clearcoatNormalScale;
	clearcoatNormal = normalize( tbn2 * clearcoatMapN );
#endif`,eh=`#ifdef USE_CLEARCOATMAP
	uniform sampler2D clearcoatMap;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform sampler2D clearcoatNormalMap;
	uniform vec2 clearcoatNormalScale;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform sampler2D clearcoatRoughnessMap;
#endif`,th=`#ifdef USE_IRIDESCENCEMAP
	uniform sampler2D iridescenceMap;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform sampler2D iridescenceThicknessMap;
#endif`,nh=`#ifdef OPAQUE
diffuseColor.a = 1.0;
#endif
#ifdef USE_TRANSMISSION
diffuseColor.a *= material.transmissionAlpha;
#endif
gl_FragColor = vec4( outgoingLight, diffuseColor.a );`,ih=`vec3 packNormalToRGB( const in vec3 normal ) {
	return normalize( normal ) * 0.5 + 0.5;
}
vec3 unpackRGBToNormal( const in vec3 rgb ) {
	return 2.0 * rgb.xyz - 1.0;
}
const float PackUpscale = 256. / 255.;const float UnpackDownscale = 255. / 256.;
const vec3 PackFactors = vec3( 256. * 256. * 256., 256. * 256., 256. );
const vec4 UnpackFactors = UnpackDownscale / vec4( PackFactors, 1. );
const float ShiftRight8 = 1. / 256.;
vec4 packDepthToRGBA( const in float v ) {
	vec4 r = vec4( fract( v * PackFactors ), v );
	r.yzw -= r.xyz * ShiftRight8;	return r * PackUpscale;
}
float unpackRGBAToDepth( const in vec4 v ) {
	return dot( v, UnpackFactors );
}
vec2 packDepthToRG( in highp float v ) {
	return packDepthToRGBA( v ).yx;
}
float unpackRGToDepth( const in highp vec2 v ) {
	return unpackRGBAToDepth( vec4( v.xy, 0.0, 0.0 ) );
}
vec4 pack2HalfToRGBA( vec2 v ) {
	vec4 r = vec4( v.x, fract( v.x * 255.0 ), v.y, fract( v.y * 255.0 ) );
	return vec4( r.x - r.y / 255.0, r.y, r.z - r.w / 255.0, r.w );
}
vec2 unpackRGBATo2Half( vec4 v ) {
	return vec2( v.x + ( v.y / 255.0 ), v.z + ( v.w / 255.0 ) );
}
float viewZToOrthographicDepth( const in float viewZ, const in float near, const in float far ) {
	return ( viewZ + near ) / ( near - far );
}
float orthographicDepthToViewZ( const in float depth, const in float near, const in float far ) {
	return depth * ( near - far ) - near;
}
float viewZToPerspectiveDepth( const in float viewZ, const in float near, const in float far ) {
	return ( ( near + viewZ ) * far ) / ( ( far - near ) * viewZ );
}
float perspectiveDepthToViewZ( const in float depth, const in float near, const in float far ) {
	return ( near * far ) / ( ( far - near ) * depth - far );
}`,sh=`#ifdef PREMULTIPLIED_ALPHA
	gl_FragColor.rgb *= gl_FragColor.a;
#endif`,rh=`vec4 mvPosition = vec4( transformed, 1.0 );
#ifdef USE_BATCHING
	mvPosition = batchingMatrix * mvPosition;
#endif
#ifdef USE_INSTANCING
	mvPosition = instanceMatrix * mvPosition;
#endif
mvPosition = modelViewMatrix * mvPosition;
gl_Position = projectionMatrix * mvPosition;`,ah=`#ifdef DITHERING
	gl_FragColor.rgb = dithering( gl_FragColor.rgb );
#endif`,oh=`#ifdef DITHERING
	vec3 dithering( vec3 color ) {
		float grid_position = rand( gl_FragCoord.xy );
		vec3 dither_shift_RGB = vec3( 0.25 / 255.0, -0.25 / 255.0, 0.25 / 255.0 );
		dither_shift_RGB = mix( 2.0 * dither_shift_RGB, -2.0 * dither_shift_RGB, grid_position );
		return color + dither_shift_RGB;
	}
#endif`,lh=`float roughnessFactor = roughness;
#ifdef USE_ROUGHNESSMAP
	vec4 texelRoughness = texture2D( roughnessMap, vRoughnessMapUv );
	roughnessFactor *= texelRoughness.g;
#endif`,ch=`#ifdef USE_ROUGHNESSMAP
	uniform sampler2D roughnessMap;
#endif`,uh=`#if NUM_SPOT_LIGHT_COORDS > 0
	varying vec4 vSpotLightCoord[ NUM_SPOT_LIGHT_COORDS ];
#endif
#if NUM_SPOT_LIGHT_MAPS > 0
	uniform sampler2D spotLightMap[ NUM_SPOT_LIGHT_MAPS ];
#endif
#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
		uniform sampler2D directionalShadowMap[ NUM_DIR_LIGHT_SHADOWS ];
		varying vec4 vDirectionalShadowCoord[ NUM_DIR_LIGHT_SHADOWS ];
		struct DirectionalLightShadow {
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform DirectionalLightShadow directionalLightShadows[ NUM_DIR_LIGHT_SHADOWS ];
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
		uniform sampler2D spotShadowMap[ NUM_SPOT_LIGHT_SHADOWS ];
		struct SpotLightShadow {
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform SpotLightShadow spotLightShadows[ NUM_SPOT_LIGHT_SHADOWS ];
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		uniform sampler2D pointShadowMap[ NUM_POINT_LIGHT_SHADOWS ];
		varying vec4 vPointShadowCoord[ NUM_POINT_LIGHT_SHADOWS ];
		struct PointLightShadow {
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
			float shadowCameraNear;
			float shadowCameraFar;
		};
		uniform PointLightShadow pointLightShadows[ NUM_POINT_LIGHT_SHADOWS ];
	#endif
	float texture2DCompare( sampler2D depths, vec2 uv, float compare ) {
		return step( compare, unpackRGBAToDepth( texture2D( depths, uv ) ) );
	}
	vec2 texture2DDistribution( sampler2D shadow, vec2 uv ) {
		return unpackRGBATo2Half( texture2D( shadow, uv ) );
	}
	float VSMShadow (sampler2D shadow, vec2 uv, float compare ){
		float occlusion = 1.0;
		vec2 distribution = texture2DDistribution( shadow, uv );
		float hard_shadow = step( compare , distribution.x );
		if (hard_shadow != 1.0 ) {
			float distance = compare - distribution.x ;
			float variance = max( 0.00000, distribution.y * distribution.y );
			float softness_probability = variance / (variance + distance * distance );			softness_probability = clamp( ( softness_probability - 0.3 ) / ( 0.95 - 0.3 ), 0.0, 1.0 );			occlusion = clamp( max( hard_shadow, softness_probability ), 0.0, 1.0 );
		}
		return occlusion;
	}
	float getShadow( sampler2D shadowMap, vec2 shadowMapSize, float shadowBias, float shadowRadius, vec4 shadowCoord ) {
		float shadow = 1.0;
		shadowCoord.xyz /= shadowCoord.w;
		shadowCoord.z += shadowBias;
		bool inFrustum = shadowCoord.x >= 0.0 && shadowCoord.x <= 1.0 && shadowCoord.y >= 0.0 && shadowCoord.y <= 1.0;
		bool frustumTest = inFrustum && shadowCoord.z <= 1.0;
		if ( frustumTest ) {
		#if defined( SHADOWMAP_TYPE_PCF )
			vec2 texelSize = vec2( 1.0 ) / shadowMapSize;
			float dx0 = - texelSize.x * shadowRadius;
			float dy0 = - texelSize.y * shadowRadius;
			float dx1 = + texelSize.x * shadowRadius;
			float dy1 = + texelSize.y * shadowRadius;
			float dx2 = dx0 / 2.0;
			float dy2 = dy0 / 2.0;
			float dx3 = dx1 / 2.0;
			float dy3 = dy1 / 2.0;
			shadow = (
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx0, dy0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx1, dy0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx2, dy2 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy2 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx3, dy2 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx0, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx2, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy, shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx3, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx1, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx2, dy3 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy3 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx3, dy3 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx0, dy1 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy1 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx1, dy1 ), shadowCoord.z )
			) * ( 1.0 / 17.0 );
		#elif defined( SHADOWMAP_TYPE_PCF_SOFT )
			vec2 texelSize = vec2( 1.0 ) / shadowMapSize;
			float dx = texelSize.x;
			float dy = texelSize.y;
			vec2 uv = shadowCoord.xy;
			vec2 f = fract( uv * shadowMapSize + 0.5 );
			uv -= f * texelSize;
			shadow = (
				texture2DCompare( shadowMap, uv, shadowCoord.z ) +
				texture2DCompare( shadowMap, uv + vec2( dx, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, uv + vec2( 0.0, dy ), shadowCoord.z ) +
				texture2DCompare( shadowMap, uv + texelSize, shadowCoord.z ) +
				mix( texture2DCompare( shadowMap, uv + vec2( -dx, 0.0 ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, 0.0 ), shadowCoord.z ),
					 f.x ) +
				mix( texture2DCompare( shadowMap, uv + vec2( -dx, dy ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, dy ), shadowCoord.z ),
					 f.x ) +
				mix( texture2DCompare( shadowMap, uv + vec2( 0.0, -dy ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( 0.0, 2.0 * dy ), shadowCoord.z ),
					 f.y ) +
				mix( texture2DCompare( shadowMap, uv + vec2( dx, -dy ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( dx, 2.0 * dy ), shadowCoord.z ),
					 f.y ) +
				mix( mix( texture2DCompare( shadowMap, uv + vec2( -dx, -dy ), shadowCoord.z ),
						  texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, -dy ), shadowCoord.z ),
						  f.x ),
					 mix( texture2DCompare( shadowMap, uv + vec2( -dx, 2.0 * dy ), shadowCoord.z ),
						  texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, 2.0 * dy ), shadowCoord.z ),
						  f.x ),
					 f.y )
			) * ( 1.0 / 9.0 );
		#elif defined( SHADOWMAP_TYPE_VSM )
			shadow = VSMShadow( shadowMap, shadowCoord.xy, shadowCoord.z );
		#else
			shadow = texture2DCompare( shadowMap, shadowCoord.xy, shadowCoord.z );
		#endif
		}
		return shadow;
	}
	vec2 cubeToUV( vec3 v, float texelSizeY ) {
		vec3 absV = abs( v );
		float scaleToCube = 1.0 / max( absV.x, max( absV.y, absV.z ) );
		absV *= scaleToCube;
		v *= scaleToCube * ( 1.0 - 2.0 * texelSizeY );
		vec2 planar = v.xy;
		float almostATexel = 1.5 * texelSizeY;
		float almostOne = 1.0 - almostATexel;
		if ( absV.z >= almostOne ) {
			if ( v.z > 0.0 )
				planar.x = 4.0 - v.x;
		} else if ( absV.x >= almostOne ) {
			float signX = sign( v.x );
			planar.x = v.z * signX + 2.0 * signX;
		} else if ( absV.y >= almostOne ) {
			float signY = sign( v.y );
			planar.x = v.x + 2.0 * signY + 2.0;
			planar.y = v.z * signY - 2.0;
		}
		return vec2( 0.125, 0.25 ) * planar + vec2( 0.375, 0.75 );
	}
	float getPointShadow( sampler2D shadowMap, vec2 shadowMapSize, float shadowBias, float shadowRadius, vec4 shadowCoord, float shadowCameraNear, float shadowCameraFar ) {
		vec2 texelSize = vec2( 1.0 ) / ( shadowMapSize * vec2( 4.0, 2.0 ) );
		vec3 lightToPosition = shadowCoord.xyz;
		float dp = ( length( lightToPosition ) - shadowCameraNear ) / ( shadowCameraFar - shadowCameraNear );		dp += shadowBias;
		vec3 bd3D = normalize( lightToPosition );
		#if defined( SHADOWMAP_TYPE_PCF ) || defined( SHADOWMAP_TYPE_PCF_SOFT ) || defined( SHADOWMAP_TYPE_VSM )
			vec2 offset = vec2( - 1, 1 ) * shadowRadius * texelSize.y;
			return (
				texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xyy, texelSize.y ), dp ) +
				texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yyy, texelSize.y ), dp ) +
				texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xyx, texelSize.y ), dp ) +
				texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yyx, texelSize.y ), dp ) +
				texture2DCompare( shadowMap, cubeToUV( bd3D, texelSize.y ), dp ) +
				texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xxy, texelSize.y ), dp ) +
				texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yxy, texelSize.y ), dp ) +
				texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xxx, texelSize.y ), dp ) +
				texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yxx, texelSize.y ), dp )
			) * ( 1.0 / 9.0 );
		#else
			return texture2DCompare( shadowMap, cubeToUV( bd3D, texelSize.y ), dp );
		#endif
	}
#endif`,dh=`#if NUM_SPOT_LIGHT_COORDS > 0
	uniform mat4 spotLightMatrix[ NUM_SPOT_LIGHT_COORDS ];
	varying vec4 vSpotLightCoord[ NUM_SPOT_LIGHT_COORDS ];
#endif
#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
		uniform mat4 directionalShadowMatrix[ NUM_DIR_LIGHT_SHADOWS ];
		varying vec4 vDirectionalShadowCoord[ NUM_DIR_LIGHT_SHADOWS ];
		struct DirectionalLightShadow {
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform DirectionalLightShadow directionalLightShadows[ NUM_DIR_LIGHT_SHADOWS ];
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
		struct SpotLightShadow {
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform SpotLightShadow spotLightShadows[ NUM_SPOT_LIGHT_SHADOWS ];
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		uniform mat4 pointShadowMatrix[ NUM_POINT_LIGHT_SHADOWS ];
		varying vec4 vPointShadowCoord[ NUM_POINT_LIGHT_SHADOWS ];
		struct PointLightShadow {
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
			float shadowCameraNear;
			float shadowCameraFar;
		};
		uniform PointLightShadow pointLightShadows[ NUM_POINT_LIGHT_SHADOWS ];
	#endif
#endif`,hh=`#if ( defined( USE_SHADOWMAP ) && ( NUM_DIR_LIGHT_SHADOWS > 0 || NUM_POINT_LIGHT_SHADOWS > 0 ) ) || ( NUM_SPOT_LIGHT_COORDS > 0 )
	vec3 shadowWorldNormal = inverseTransformDirection( transformedNormal, viewMatrix );
	vec4 shadowWorldPosition;
#endif
#if defined( USE_SHADOWMAP )
	#if NUM_DIR_LIGHT_SHADOWS > 0
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_DIR_LIGHT_SHADOWS; i ++ ) {
			shadowWorldPosition = worldPosition + vec4( shadowWorldNormal * directionalLightShadows[ i ].shadowNormalBias, 0 );
			vDirectionalShadowCoord[ i ] = directionalShadowMatrix[ i ] * shadowWorldPosition;
		}
		#pragma unroll_loop_end
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_POINT_LIGHT_SHADOWS; i ++ ) {
			shadowWorldPosition = worldPosition + vec4( shadowWorldNormal * pointLightShadows[ i ].shadowNormalBias, 0 );
			vPointShadowCoord[ i ] = pointShadowMatrix[ i ] * shadowWorldPosition;
		}
		#pragma unroll_loop_end
	#endif
#endif
#if NUM_SPOT_LIGHT_COORDS > 0
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHT_COORDS; i ++ ) {
		shadowWorldPosition = worldPosition;
		#if ( defined( USE_SHADOWMAP ) && UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
			shadowWorldPosition.xyz += shadowWorldNormal * spotLightShadows[ i ].shadowNormalBias;
		#endif
		vSpotLightCoord[ i ] = spotLightMatrix[ i ] * shadowWorldPosition;
	}
	#pragma unroll_loop_end
#endif`,fh=`float getShadowMask() {
	float shadow = 1.0;
	#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
	DirectionalLightShadow directionalLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_DIR_LIGHT_SHADOWS; i ++ ) {
		directionalLight = directionalLightShadows[ i ];
		shadow *= receiveShadow ? getShadow( directionalShadowMap[ i ], directionalLight.shadowMapSize, directionalLight.shadowBias, directionalLight.shadowRadius, vDirectionalShadowCoord[ i ] ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
	SpotLightShadow spotLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHT_SHADOWS; i ++ ) {
		spotLight = spotLightShadows[ i ];
		shadow *= receiveShadow ? getShadow( spotShadowMap[ i ], spotLight.shadowMapSize, spotLight.shadowBias, spotLight.shadowRadius, vSpotLightCoord[ i ] ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
	PointLightShadow pointLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_POINT_LIGHT_SHADOWS; i ++ ) {
		pointLight = pointLightShadows[ i ];
		shadow *= receiveShadow ? getPointShadow( pointShadowMap[ i ], pointLight.shadowMapSize, pointLight.shadowBias, pointLight.shadowRadius, vPointShadowCoord[ i ], pointLight.shadowCameraNear, pointLight.shadowCameraFar ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#endif
	return shadow;
}`,ph=`#ifdef USE_SKINNING
	mat4 boneMatX = getBoneMatrix( skinIndex.x );
	mat4 boneMatY = getBoneMatrix( skinIndex.y );
	mat4 boneMatZ = getBoneMatrix( skinIndex.z );
	mat4 boneMatW = getBoneMatrix( skinIndex.w );
#endif`,mh=`#ifdef USE_SKINNING
	uniform mat4 bindMatrix;
	uniform mat4 bindMatrixInverse;
	uniform highp sampler2D boneTexture;
	mat4 getBoneMatrix( const in float i ) {
		int size = textureSize( boneTexture, 0 ).x;
		int j = int( i ) * 4;
		int x = j % size;
		int y = j / size;
		vec4 v1 = texelFetch( boneTexture, ivec2( x, y ), 0 );
		vec4 v2 = texelFetch( boneTexture, ivec2( x + 1, y ), 0 );
		vec4 v3 = texelFetch( boneTexture, ivec2( x + 2, y ), 0 );
		vec4 v4 = texelFetch( boneTexture, ivec2( x + 3, y ), 0 );
		return mat4( v1, v2, v3, v4 );
	}
#endif`,gh=`#ifdef USE_SKINNING
	vec4 skinVertex = bindMatrix * vec4( transformed, 1.0 );
	vec4 skinned = vec4( 0.0 );
	skinned += boneMatX * skinVertex * skinWeight.x;
	skinned += boneMatY * skinVertex * skinWeight.y;
	skinned += boneMatZ * skinVertex * skinWeight.z;
	skinned += boneMatW * skinVertex * skinWeight.w;
	transformed = ( bindMatrixInverse * skinned ).xyz;
#endif`,_h=`#ifdef USE_SKINNING
	mat4 skinMatrix = mat4( 0.0 );
	skinMatrix += skinWeight.x * boneMatX;
	skinMatrix += skinWeight.y * boneMatY;
	skinMatrix += skinWeight.z * boneMatZ;
	skinMatrix += skinWeight.w * boneMatW;
	skinMatrix = bindMatrixInverse * skinMatrix * bindMatrix;
	objectNormal = vec4( skinMatrix * vec4( objectNormal, 0.0 ) ).xyz;
	#ifdef USE_TANGENT
		objectTangent = vec4( skinMatrix * vec4( objectTangent, 0.0 ) ).xyz;
	#endif
#endif`,xh=`float specularStrength;
#ifdef USE_SPECULARMAP
	vec4 texelSpecular = texture2D( specularMap, vSpecularMapUv );
	specularStrength = texelSpecular.r;
#else
	specularStrength = 1.0;
#endif`,vh=`#ifdef USE_SPECULARMAP
	uniform sampler2D specularMap;
#endif`,Mh=`#if defined( TONE_MAPPING )
	gl_FragColor.rgb = toneMapping( gl_FragColor.rgb );
#endif`,Sh=`#ifndef saturate
#define saturate( a ) clamp( a, 0.0, 1.0 )
#endif
uniform float toneMappingExposure;
vec3 LinearToneMapping( vec3 color ) {
	return saturate( toneMappingExposure * color );
}
vec3 ReinhardToneMapping( vec3 color ) {
	color *= toneMappingExposure;
	return saturate( color / ( vec3( 1.0 ) + color ) );
}
vec3 OptimizedCineonToneMapping( vec3 color ) {
	color *= toneMappingExposure;
	color = max( vec3( 0.0 ), color - 0.004 );
	return pow( ( color * ( 6.2 * color + 0.5 ) ) / ( color * ( 6.2 * color + 1.7 ) + 0.06 ), vec3( 2.2 ) );
}
vec3 RRTAndODTFit( vec3 v ) {
	vec3 a = v * ( v + 0.0245786 ) - 0.000090537;
	vec3 b = v * ( 0.983729 * v + 0.4329510 ) + 0.238081;
	return a / b;
}
vec3 ACESFilmicToneMapping( vec3 color ) {
	const mat3 ACESInputMat = mat3(
		vec3( 0.59719, 0.07600, 0.02840 ),		vec3( 0.35458, 0.90834, 0.13383 ),
		vec3( 0.04823, 0.01566, 0.83777 )
	);
	const mat3 ACESOutputMat = mat3(
		vec3(  1.60475, -0.10208, -0.00327 ),		vec3( -0.53108,  1.10813, -0.07276 ),
		vec3( -0.07367, -0.00605,  1.07602 )
	);
	color *= toneMappingExposure / 0.6;
	color = ACESInputMat * color;
	color = RRTAndODTFit( color );
	color = ACESOutputMat * color;
	return saturate( color );
}
const mat3 LINEAR_REC2020_TO_LINEAR_SRGB = mat3(
	vec3( 1.6605, - 0.1246, - 0.0182 ),
	vec3( - 0.5876, 1.1329, - 0.1006 ),
	vec3( - 0.0728, - 0.0083, 1.1187 )
);
const mat3 LINEAR_SRGB_TO_LINEAR_REC2020 = mat3(
	vec3( 0.6274, 0.0691, 0.0164 ),
	vec3( 0.3293, 0.9195, 0.0880 ),
	vec3( 0.0433, 0.0113, 0.8956 )
);
vec3 agxDefaultContrastApprox( vec3 x ) {
	vec3 x2 = x * x;
	vec3 x4 = x2 * x2;
	return + 15.5 * x4 * x2
		- 40.14 * x4 * x
		+ 31.96 * x4
		- 6.868 * x2 * x
		+ 0.4298 * x2
		+ 0.1191 * x
		- 0.00232;
}
vec3 AgXToneMapping( vec3 color ) {
	const mat3 AgXInsetMatrix = mat3(
		vec3( 0.856627153315983, 0.137318972929847, 0.11189821299995 ),
		vec3( 0.0951212405381588, 0.761241990602591, 0.0767994186031903 ),
		vec3( 0.0482516061458583, 0.101439036467562, 0.811302368396859 )
	);
	const mat3 AgXOutsetMatrix = mat3(
		vec3( 1.1271005818144368, - 0.1413297634984383, - 0.14132976349843826 ),
		vec3( - 0.11060664309660323, 1.157823702216272, - 0.11060664309660294 ),
		vec3( - 0.016493938717834573, - 0.016493938717834257, 1.2519364065950405 )
	);
	const float AgxMinEv = - 12.47393;	const float AgxMaxEv = 4.026069;
	color = LINEAR_SRGB_TO_LINEAR_REC2020 * color;
	color *= toneMappingExposure;
	color = AgXInsetMatrix * color;
	color = max( color, 1e-10 );	color = log2( color );
	color = ( color - AgxMinEv ) / ( AgxMaxEv - AgxMinEv );
	color = clamp( color, 0.0, 1.0 );
	color = agxDefaultContrastApprox( color );
	color = AgXOutsetMatrix * color;
	color = pow( max( vec3( 0.0 ), color ), vec3( 2.2 ) );
	color = LINEAR_REC2020_TO_LINEAR_SRGB * color;
	return color;
}
vec3 CustomToneMapping( vec3 color ) { return color; }`,yh=`#ifdef USE_TRANSMISSION
	material.transmission = transmission;
	material.transmissionAlpha = 1.0;
	material.thickness = thickness;
	material.attenuationDistance = attenuationDistance;
	material.attenuationColor = attenuationColor;
	#ifdef USE_TRANSMISSIONMAP
		material.transmission *= texture2D( transmissionMap, vTransmissionMapUv ).r;
	#endif
	#ifdef USE_THICKNESSMAP
		material.thickness *= texture2D( thicknessMap, vThicknessMapUv ).g;
	#endif
	vec3 pos = vWorldPosition;
	vec3 v = normalize( cameraPosition - pos );
	vec3 n = inverseTransformDirection( normal, viewMatrix );
	vec4 transmitted = getIBLVolumeRefraction(
		n, v, material.roughness, material.diffuseColor, material.specularColor, material.specularF90,
		pos, modelMatrix, viewMatrix, projectionMatrix, material.ior, material.thickness,
		material.attenuationColor, material.attenuationDistance );
	material.transmissionAlpha = mix( material.transmissionAlpha, transmitted.a, material.transmission );
	totalDiffuse = mix( totalDiffuse, transmitted.rgb, material.transmission );
#endif`,Eh=`#ifdef USE_TRANSMISSION
	uniform float transmission;
	uniform float thickness;
	uniform float attenuationDistance;
	uniform vec3 attenuationColor;
	#ifdef USE_TRANSMISSIONMAP
		uniform sampler2D transmissionMap;
	#endif
	#ifdef USE_THICKNESSMAP
		uniform sampler2D thicknessMap;
	#endif
	uniform vec2 transmissionSamplerSize;
	uniform sampler2D transmissionSamplerMap;
	uniform mat4 modelMatrix;
	uniform mat4 projectionMatrix;
	varying vec3 vWorldPosition;
	float w0( float a ) {
		return ( 1.0 / 6.0 ) * ( a * ( a * ( - a + 3.0 ) - 3.0 ) + 1.0 );
	}
	float w1( float a ) {
		return ( 1.0 / 6.0 ) * ( a *  a * ( 3.0 * a - 6.0 ) + 4.0 );
	}
	float w2( float a ){
		return ( 1.0 / 6.0 ) * ( a * ( a * ( - 3.0 * a + 3.0 ) + 3.0 ) + 1.0 );
	}
	float w3( float a ) {
		return ( 1.0 / 6.0 ) * ( a * a * a );
	}
	float g0( float a ) {
		return w0( a ) + w1( a );
	}
	float g1( float a ) {
		return w2( a ) + w3( a );
	}
	float h0( float a ) {
		return - 1.0 + w1( a ) / ( w0( a ) + w1( a ) );
	}
	float h1( float a ) {
		return 1.0 + w3( a ) / ( w2( a ) + w3( a ) );
	}
	vec4 bicubic( sampler2D tex, vec2 uv, vec4 texelSize, float lod ) {
		uv = uv * texelSize.zw + 0.5;
		vec2 iuv = floor( uv );
		vec2 fuv = fract( uv );
		float g0x = g0( fuv.x );
		float g1x = g1( fuv.x );
		float h0x = h0( fuv.x );
		float h1x = h1( fuv.x );
		float h0y = h0( fuv.y );
		float h1y = h1( fuv.y );
		vec2 p0 = ( vec2( iuv.x + h0x, iuv.y + h0y ) - 0.5 ) * texelSize.xy;
		vec2 p1 = ( vec2( iuv.x + h1x, iuv.y + h0y ) - 0.5 ) * texelSize.xy;
		vec2 p2 = ( vec2( iuv.x + h0x, iuv.y + h1y ) - 0.5 ) * texelSize.xy;
		vec2 p3 = ( vec2( iuv.x + h1x, iuv.y + h1y ) - 0.5 ) * texelSize.xy;
		return g0( fuv.y ) * ( g0x * textureLod( tex, p0, lod ) + g1x * textureLod( tex, p1, lod ) ) +
			g1( fuv.y ) * ( g0x * textureLod( tex, p2, lod ) + g1x * textureLod( tex, p3, lod ) );
	}
	vec4 textureBicubic( sampler2D sampler, vec2 uv, float lod ) {
		vec2 fLodSize = vec2( textureSize( sampler, int( lod ) ) );
		vec2 cLodSize = vec2( textureSize( sampler, int( lod + 1.0 ) ) );
		vec2 fLodSizeInv = 1.0 / fLodSize;
		vec2 cLodSizeInv = 1.0 / cLodSize;
		vec4 fSample = bicubic( sampler, uv, vec4( fLodSizeInv, fLodSize ), floor( lod ) );
		vec4 cSample = bicubic( sampler, uv, vec4( cLodSizeInv, cLodSize ), ceil( lod ) );
		return mix( fSample, cSample, fract( lod ) );
	}
	vec3 getVolumeTransmissionRay( const in vec3 n, const in vec3 v, const in float thickness, const in float ior, const in mat4 modelMatrix ) {
		vec3 refractionVector = refract( - v, normalize( n ), 1.0 / ior );
		vec3 modelScale;
		modelScale.x = length( vec3( modelMatrix[ 0 ].xyz ) );
		modelScale.y = length( vec3( modelMatrix[ 1 ].xyz ) );
		modelScale.z = length( vec3( modelMatrix[ 2 ].xyz ) );
		return normalize( refractionVector ) * thickness * modelScale;
	}
	float applyIorToRoughness( const in float roughness, const in float ior ) {
		return roughness * clamp( ior * 2.0 - 2.0, 0.0, 1.0 );
	}
	vec4 getTransmissionSample( const in vec2 fragCoord, const in float roughness, const in float ior ) {
		float lod = log2( transmissionSamplerSize.x ) * applyIorToRoughness( roughness, ior );
		return textureBicubic( transmissionSamplerMap, fragCoord.xy, lod );
	}
	vec3 volumeAttenuation( const in float transmissionDistance, const in vec3 attenuationColor, const in float attenuationDistance ) {
		if ( isinf( attenuationDistance ) ) {
			return vec3( 1.0 );
		} else {
			vec3 attenuationCoefficient = -log( attenuationColor ) / attenuationDistance;
			vec3 transmittance = exp( - attenuationCoefficient * transmissionDistance );			return transmittance;
		}
	}
	vec4 getIBLVolumeRefraction( const in vec3 n, const in vec3 v, const in float roughness, const in vec3 diffuseColor,
		const in vec3 specularColor, const in float specularF90, const in vec3 position, const in mat4 modelMatrix,
		const in mat4 viewMatrix, const in mat4 projMatrix, const in float ior, const in float thickness,
		const in vec3 attenuationColor, const in float attenuationDistance ) {
		vec3 transmissionRay = getVolumeTransmissionRay( n, v, thickness, ior, modelMatrix );
		vec3 refractedRayExit = position + transmissionRay;
		vec4 ndcPos = projMatrix * viewMatrix * vec4( refractedRayExit, 1.0 );
		vec2 refractionCoords = ndcPos.xy / ndcPos.w;
		refractionCoords += 1.0;
		refractionCoords /= 2.0;
		vec4 transmittedLight = getTransmissionSample( refractionCoords, roughness, ior );
		vec3 transmittance = diffuseColor * volumeAttenuation( length( transmissionRay ), attenuationColor, attenuationDistance );
		vec3 attenuatedColor = transmittance * transmittedLight.rgb;
		vec3 F = EnvironmentBRDF( n, v, specularColor, specularF90, roughness );
		float transmittanceFactor = ( transmittance.r + transmittance.g + transmittance.b ) / 3.0;
		return vec4( ( 1.0 - F ) * attenuatedColor, 1.0 - ( 1.0 - transmittedLight.a ) * transmittanceFactor );
	}
#endif`,bh=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	varying vec2 vUv;
#endif
#ifdef USE_MAP
	varying vec2 vMapUv;
#endif
#ifdef USE_ALPHAMAP
	varying vec2 vAlphaMapUv;
#endif
#ifdef USE_LIGHTMAP
	varying vec2 vLightMapUv;
#endif
#ifdef USE_AOMAP
	varying vec2 vAoMapUv;
#endif
#ifdef USE_BUMPMAP
	varying vec2 vBumpMapUv;
#endif
#ifdef USE_NORMALMAP
	varying vec2 vNormalMapUv;
#endif
#ifdef USE_EMISSIVEMAP
	varying vec2 vEmissiveMapUv;
#endif
#ifdef USE_METALNESSMAP
	varying vec2 vMetalnessMapUv;
#endif
#ifdef USE_ROUGHNESSMAP
	varying vec2 vRoughnessMapUv;
#endif
#ifdef USE_ANISOTROPYMAP
	varying vec2 vAnisotropyMapUv;
#endif
#ifdef USE_CLEARCOATMAP
	varying vec2 vClearcoatMapUv;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	varying vec2 vClearcoatNormalMapUv;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	varying vec2 vClearcoatRoughnessMapUv;
#endif
#ifdef USE_IRIDESCENCEMAP
	varying vec2 vIridescenceMapUv;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	varying vec2 vIridescenceThicknessMapUv;
#endif
#ifdef USE_SHEEN_COLORMAP
	varying vec2 vSheenColorMapUv;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	varying vec2 vSheenRoughnessMapUv;
#endif
#ifdef USE_SPECULARMAP
	varying vec2 vSpecularMapUv;
#endif
#ifdef USE_SPECULAR_COLORMAP
	varying vec2 vSpecularColorMapUv;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	varying vec2 vSpecularIntensityMapUv;
#endif
#ifdef USE_TRANSMISSIONMAP
	uniform mat3 transmissionMapTransform;
	varying vec2 vTransmissionMapUv;
#endif
#ifdef USE_THICKNESSMAP
	uniform mat3 thicknessMapTransform;
	varying vec2 vThicknessMapUv;
#endif`,Th=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	varying vec2 vUv;
#endif
#ifdef USE_MAP
	uniform mat3 mapTransform;
	varying vec2 vMapUv;
#endif
#ifdef USE_ALPHAMAP
	uniform mat3 alphaMapTransform;
	varying vec2 vAlphaMapUv;
#endif
#ifdef USE_LIGHTMAP
	uniform mat3 lightMapTransform;
	varying vec2 vLightMapUv;
#endif
#ifdef USE_AOMAP
	uniform mat3 aoMapTransform;
	varying vec2 vAoMapUv;
#endif
#ifdef USE_BUMPMAP
	uniform mat3 bumpMapTransform;
	varying vec2 vBumpMapUv;
#endif
#ifdef USE_NORMALMAP
	uniform mat3 normalMapTransform;
	varying vec2 vNormalMapUv;
#endif
#ifdef USE_DISPLACEMENTMAP
	uniform mat3 displacementMapTransform;
	varying vec2 vDisplacementMapUv;
#endif
#ifdef USE_EMISSIVEMAP
	uniform mat3 emissiveMapTransform;
	varying vec2 vEmissiveMapUv;
#endif
#ifdef USE_METALNESSMAP
	uniform mat3 metalnessMapTransform;
	varying vec2 vMetalnessMapUv;
#endif
#ifdef USE_ROUGHNESSMAP
	uniform mat3 roughnessMapTransform;
	varying vec2 vRoughnessMapUv;
#endif
#ifdef USE_ANISOTROPYMAP
	uniform mat3 anisotropyMapTransform;
	varying vec2 vAnisotropyMapUv;
#endif
#ifdef USE_CLEARCOATMAP
	uniform mat3 clearcoatMapTransform;
	varying vec2 vClearcoatMapUv;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform mat3 clearcoatNormalMapTransform;
	varying vec2 vClearcoatNormalMapUv;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform mat3 clearcoatRoughnessMapTransform;
	varying vec2 vClearcoatRoughnessMapUv;
#endif
#ifdef USE_SHEEN_COLORMAP
	uniform mat3 sheenColorMapTransform;
	varying vec2 vSheenColorMapUv;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	uniform mat3 sheenRoughnessMapTransform;
	varying vec2 vSheenRoughnessMapUv;
#endif
#ifdef USE_IRIDESCENCEMAP
	uniform mat3 iridescenceMapTransform;
	varying vec2 vIridescenceMapUv;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform mat3 iridescenceThicknessMapTransform;
	varying vec2 vIridescenceThicknessMapUv;
#endif
#ifdef USE_SPECULARMAP
	uniform mat3 specularMapTransform;
	varying vec2 vSpecularMapUv;
#endif
#ifdef USE_SPECULAR_COLORMAP
	uniform mat3 specularColorMapTransform;
	varying vec2 vSpecularColorMapUv;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	uniform mat3 specularIntensityMapTransform;
	varying vec2 vSpecularIntensityMapUv;
#endif
#ifdef USE_TRANSMISSIONMAP
	uniform mat3 transmissionMapTransform;
	varying vec2 vTransmissionMapUv;
#endif
#ifdef USE_THICKNESSMAP
	uniform mat3 thicknessMapTransform;
	varying vec2 vThicknessMapUv;
#endif`,wh=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	vUv = vec3( uv, 1 ).xy;
#endif
#ifdef USE_MAP
	vMapUv = ( mapTransform * vec3( MAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ALPHAMAP
	vAlphaMapUv = ( alphaMapTransform * vec3( ALPHAMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_LIGHTMAP
	vLightMapUv = ( lightMapTransform * vec3( LIGHTMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_AOMAP
	vAoMapUv = ( aoMapTransform * vec3( AOMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_BUMPMAP
	vBumpMapUv = ( bumpMapTransform * vec3( BUMPMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_NORMALMAP
	vNormalMapUv = ( normalMapTransform * vec3( NORMALMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_DISPLACEMENTMAP
	vDisplacementMapUv = ( displacementMapTransform * vec3( DISPLACEMENTMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_EMISSIVEMAP
	vEmissiveMapUv = ( emissiveMapTransform * vec3( EMISSIVEMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_METALNESSMAP
	vMetalnessMapUv = ( metalnessMapTransform * vec3( METALNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ROUGHNESSMAP
	vRoughnessMapUv = ( roughnessMapTransform * vec3( ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ANISOTROPYMAP
	vAnisotropyMapUv = ( anisotropyMapTransform * vec3( ANISOTROPYMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOATMAP
	vClearcoatMapUv = ( clearcoatMapTransform * vec3( CLEARCOATMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	vClearcoatNormalMapUv = ( clearcoatNormalMapTransform * vec3( CLEARCOAT_NORMALMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	vClearcoatRoughnessMapUv = ( clearcoatRoughnessMapTransform * vec3( CLEARCOAT_ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_IRIDESCENCEMAP
	vIridescenceMapUv = ( iridescenceMapTransform * vec3( IRIDESCENCEMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	vIridescenceThicknessMapUv = ( iridescenceThicknessMapTransform * vec3( IRIDESCENCE_THICKNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SHEEN_COLORMAP
	vSheenColorMapUv = ( sheenColorMapTransform * vec3( SHEEN_COLORMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	vSheenRoughnessMapUv = ( sheenRoughnessMapTransform * vec3( SHEEN_ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULARMAP
	vSpecularMapUv = ( specularMapTransform * vec3( SPECULARMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULAR_COLORMAP
	vSpecularColorMapUv = ( specularColorMapTransform * vec3( SPECULAR_COLORMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	vSpecularIntensityMapUv = ( specularIntensityMapTransform * vec3( SPECULAR_INTENSITYMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_TRANSMISSIONMAP
	vTransmissionMapUv = ( transmissionMapTransform * vec3( TRANSMISSIONMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_THICKNESSMAP
	vThicknessMapUv = ( thicknessMapTransform * vec3( THICKNESSMAP_UV, 1 ) ).xy;
#endif`,Ah=`#if defined( USE_ENVMAP ) || defined( DISTANCE ) || defined ( USE_SHADOWMAP ) || defined ( USE_TRANSMISSION ) || NUM_SPOT_LIGHT_COORDS > 0
	vec4 worldPosition = vec4( transformed, 1.0 );
	#ifdef USE_BATCHING
		worldPosition = batchingMatrix * worldPosition;
	#endif
	#ifdef USE_INSTANCING
		worldPosition = instanceMatrix * worldPosition;
	#endif
	worldPosition = modelMatrix * worldPosition;
#endif`;const Ie={alphahash_fragment:Cu,alphahash_pars_fragment:Lu,alphamap_fragment:Pu,alphamap_pars_fragment:Du,alphatest_fragment:Uu,alphatest_pars_fragment:Iu,aomap_fragment:Nu,aomap_pars_fragment:Fu,batching_pars_vertex:Ou,batching_vertex:zu,begin_vertex:Bu,beginnormal_vertex:ku,bsdfs:Hu,iridescence_fragment:Gu,bumpmap_pars_fragment:Vu,clipping_planes_fragment:Wu,clipping_planes_pars_fragment:Xu,clipping_planes_pars_vertex:qu,clipping_planes_vertex:ju,color_fragment:Yu,color_pars_fragment:$u,color_pars_vertex:Ku,color_vertex:Zu,common:Ju,cube_uv_reflection_fragment:Qu,defaultnormal_vertex:ed,displacementmap_pars_vertex:td,displacementmap_vertex:nd,emissivemap_fragment:id,emissivemap_pars_fragment:sd,colorspace_fragment:rd,colorspace_pars_fragment:ad,envmap_fragment:od,envmap_common_pars_fragment:ld,envmap_pars_fragment:cd,envmap_pars_vertex:ud,envmap_physical_pars_fragment:yd,envmap_vertex:dd,fog_vertex:hd,fog_pars_vertex:fd,fog_fragment:pd,fog_pars_fragment:md,gradientmap_pars_fragment:gd,lightmap_fragment:_d,lightmap_pars_fragment:xd,lights_lambert_fragment:vd,lights_lambert_pars_fragment:Md,lights_pars_begin:Sd,lights_toon_fragment:Ed,lights_toon_pars_fragment:bd,lights_phong_fragment:Td,lights_phong_pars_fragment:wd,lights_physical_fragment:Ad,lights_physical_pars_fragment:Rd,lights_fragment_begin:Cd,lights_fragment_maps:Ld,lights_fragment_end:Pd,logdepthbuf_fragment:Dd,logdepthbuf_pars_fragment:Ud,logdepthbuf_pars_vertex:Id,logdepthbuf_vertex:Nd,map_fragment:Fd,map_pars_fragment:Od,map_particle_fragment:zd,map_particle_pars_fragment:Bd,metalnessmap_fragment:kd,metalnessmap_pars_fragment:Hd,morphcolor_vertex:Gd,morphnormal_vertex:Vd,morphtarget_pars_vertex:Wd,morphtarget_vertex:Xd,normal_fragment_begin:qd,normal_fragment_maps:jd,normal_pars_fragment:Yd,normal_pars_vertex:$d,normal_vertex:Kd,normalmap_pars_fragment:Zd,clearcoat_normal_fragment_begin:Jd,clearcoat_normal_fragment_maps:Qd,clearcoat_pars_fragment:eh,iridescence_pars_fragment:th,opaque_fragment:nh,packing:ih,premultiplied_alpha_fragment:sh,project_vertex:rh,dithering_fragment:ah,dithering_pars_fragment:oh,roughnessmap_fragment:lh,roughnessmap_pars_fragment:ch,shadowmap_pars_fragment:uh,shadowmap_pars_vertex:dh,shadowmap_vertex:hh,shadowmask_pars_fragment:fh,skinbase_vertex:ph,skinning_pars_vertex:mh,skinning_vertex:gh,skinnormal_vertex:_h,specularmap_fragment:xh,specularmap_pars_fragment:vh,tonemapping_fragment:Mh,tonemapping_pars_fragment:Sh,transmission_fragment:yh,transmission_pars_fragment:Eh,uv_pars_fragment:bh,uv_pars_vertex:Th,uv_vertex:wh,worldpos_vertex:Ah,background_vert:`varying vec2 vUv;
uniform mat3 uvTransform;
void main() {
	vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	gl_Position = vec4( position.xy, 1.0, 1.0 );
}`,background_frag:`uniform sampler2D t2D;
uniform float backgroundIntensity;
varying vec2 vUv;
void main() {
	vec4 texColor = texture2D( t2D, vUv );
	#ifdef DECODE_VIDEO_TEXTURE
		texColor = vec4( mix( pow( texColor.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), texColor.rgb * 0.0773993808, vec3( lessThanEqual( texColor.rgb, vec3( 0.04045 ) ) ) ), texColor.w );
	#endif
	texColor.rgb *= backgroundIntensity;
	gl_FragColor = texColor;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,backgroundCube_vert:`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,backgroundCube_frag:`#ifdef ENVMAP_TYPE_CUBE
	uniform samplerCube envMap;
#elif defined( ENVMAP_TYPE_CUBE_UV )
	uniform sampler2D envMap;
#endif
uniform float flipEnvMap;
uniform float backgroundBlurriness;
uniform float backgroundIntensity;
varying vec3 vWorldDirection;
#include <cube_uv_reflection_fragment>
void main() {
	#ifdef ENVMAP_TYPE_CUBE
		vec4 texColor = textureCube( envMap, vec3( flipEnvMap * vWorldDirection.x, vWorldDirection.yz ) );
	#elif defined( ENVMAP_TYPE_CUBE_UV )
		vec4 texColor = textureCubeUV( envMap, vWorldDirection, backgroundBlurriness );
	#else
		vec4 texColor = vec4( 0.0, 0.0, 0.0, 1.0 );
	#endif
	texColor.rgb *= backgroundIntensity;
	gl_FragColor = texColor;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,cube_vert:`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,cube_frag:`uniform samplerCube tCube;
uniform float tFlip;
uniform float opacity;
varying vec3 vWorldDirection;
void main() {
	vec4 texColor = textureCube( tCube, vec3( tFlip * vWorldDirection.x, vWorldDirection.yz ) );
	gl_FragColor = texColor;
	gl_FragColor.a *= opacity;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,depth_vert:`#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
varying vec2 vHighPrecisionZW;
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <skinbase_vertex>
	#ifdef USE_DISPLACEMENTMAP
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vHighPrecisionZW = gl_Position.zw;
}`,depth_frag:`#if DEPTH_PACKING == 3200
	uniform float opacity;
#endif
#include <common>
#include <packing>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
varying vec2 vHighPrecisionZW;
void main() {
	#include <clipping_planes_fragment>
	vec4 diffuseColor = vec4( 1.0 );
	#if DEPTH_PACKING == 3200
		diffuseColor.a = opacity;
	#endif
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <logdepthbuf_fragment>
	float fragCoordZ = 0.5 * vHighPrecisionZW[0] / vHighPrecisionZW[1] + 0.5;
	#if DEPTH_PACKING == 3200
		gl_FragColor = vec4( vec3( 1.0 - fragCoordZ ), opacity );
	#elif DEPTH_PACKING == 3201
		gl_FragColor = packDepthToRGBA( fragCoordZ );
	#endif
}`,distanceRGBA_vert:`#define DISTANCE
varying vec3 vWorldPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <skinbase_vertex>
	#ifdef USE_DISPLACEMENTMAP
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <worldpos_vertex>
	#include <clipping_planes_vertex>
	vWorldPosition = worldPosition.xyz;
}`,distanceRGBA_frag:`#define DISTANCE
uniform vec3 referencePosition;
uniform float nearDistance;
uniform float farDistance;
varying vec3 vWorldPosition;
#include <common>
#include <packing>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <clipping_planes_pars_fragment>
void main () {
	#include <clipping_planes_fragment>
	vec4 diffuseColor = vec4( 1.0 );
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	float dist = length( vWorldPosition - referencePosition );
	dist = ( dist - nearDistance ) / ( farDistance - nearDistance );
	dist = saturate( dist );
	gl_FragColor = packDepthToRGBA( dist );
}`,equirect_vert:`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
}`,equirect_frag:`uniform sampler2D tEquirect;
varying vec3 vWorldDirection;
#include <common>
void main() {
	vec3 direction = normalize( vWorldDirection );
	vec2 sampleUV = equirectUv( direction );
	gl_FragColor = texture2D( tEquirect, sampleUV );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,linedashed_vert:`uniform float scale;
attribute float lineDistance;
varying float vLineDistance;
#include <common>
#include <uv_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	vLineDistance = scale * lineDistance;
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphcolor_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
}`,linedashed_frag:`uniform vec3 diffuse;
uniform float opacity;
uniform float dashSize;
uniform float totalSize;
varying float vLineDistance;
#include <common>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	#include <clipping_planes_fragment>
	if ( mod( vLineDistance, totalSize ) > dashSize ) {
		discard;
	}
	vec3 outgoingLight = vec3( 0.0 );
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,meshbasic_vert:`#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#if defined ( USE_ENVMAP ) || defined ( USE_SKINNING )
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinbase_vertex>
		#include <skinnormal_vertex>
		#include <defaultnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <fog_vertex>
}`,meshbasic_frag:`uniform vec3 diffuse;
uniform float opacity;
#ifndef FLAT_SHADED
	varying vec3 vNormal;
#endif
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <fog_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	#include <clipping_planes_fragment>
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	#ifdef USE_LIGHTMAP
		vec4 lightMapTexel = texture2D( lightMap, vLightMapUv );
		reflectedLight.indirectDiffuse += lightMapTexel.rgb * lightMapIntensity * RECIPROCAL_PI;
	#else
		reflectedLight.indirectDiffuse += vec3( 1.0 );
	#endif
	#include <aomap_fragment>
	reflectedLight.indirectDiffuse *= diffuseColor.rgb;
	vec3 outgoingLight = reflectedLight.indirectDiffuse;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,meshlambert_vert:`#define LAMBERT
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,meshlambert_frag:`#define LAMBERT
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float opacity;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_lambert_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	#include <clipping_planes_fragment>
	vec4 diffuseColor = vec4( diffuse, opacity );
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_lambert_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + totalEmissiveRadiance;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,meshmatcap_vert:`#define MATCAP
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <color_pars_vertex>
#include <displacementmap_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
	vViewPosition = - mvPosition.xyz;
}`,meshmatcap_frag:`#define MATCAP
uniform vec3 diffuse;
uniform float opacity;
uniform sampler2D matcap;
varying vec3 vViewPosition;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <normal_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	#include <clipping_planes_fragment>
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	vec3 viewDir = normalize( vViewPosition );
	vec3 x = normalize( vec3( viewDir.z, 0.0, - viewDir.x ) );
	vec3 y = cross( viewDir, x );
	vec2 uv = vec2( dot( x, normal ), dot( y, normal ) ) * 0.495 + 0.5;
	#ifdef USE_MATCAP
		vec4 matcapColor = texture2D( matcap, uv );
	#else
		vec4 matcapColor = vec4( vec3( mix( 0.2, 0.8, uv.y ) ), 1.0 );
	#endif
	vec3 outgoingLight = diffuseColor.rgb * matcapColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,meshnormal_vert:`#define NORMAL
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	varying vec3 vViewPosition;
#endif
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	vViewPosition = - mvPosition.xyz;
#endif
}`,meshnormal_frag:`#define NORMAL
uniform float opacity;
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	varying vec3 vViewPosition;
#endif
#include <packing>
#include <uv_pars_fragment>
#include <normal_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	gl_FragColor = vec4( packNormalToRGB( normal ), opacity );
	#ifdef OPAQUE
		gl_FragColor.a = 1.0;
	#endif
}`,meshphong_vert:`#define PHONG
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,meshphong_frag:`#define PHONG
uniform vec3 diffuse;
uniform vec3 emissive;
uniform vec3 specular;
uniform float shininess;
uniform float opacity;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_phong_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	#include <clipping_planes_fragment>
	vec4 diffuseColor = vec4( diffuse, opacity );
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_phong_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + reflectedLight.directSpecular + reflectedLight.indirectSpecular + totalEmissiveRadiance;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,meshphysical_vert:`#define STANDARD
varying vec3 vViewPosition;
#ifdef USE_TRANSMISSION
	varying vec3 vWorldPosition;
#endif
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
#ifdef USE_TRANSMISSION
	vWorldPosition = worldPosition.xyz;
#endif
}`,meshphysical_frag:`#define STANDARD
#ifdef PHYSICAL
	#define IOR
	#define USE_SPECULAR
#endif
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float roughness;
uniform float metalness;
uniform float opacity;
#ifdef IOR
	uniform float ior;
#endif
#ifdef USE_SPECULAR
	uniform float specularIntensity;
	uniform vec3 specularColor;
	#ifdef USE_SPECULAR_COLORMAP
		uniform sampler2D specularColorMap;
	#endif
	#ifdef USE_SPECULAR_INTENSITYMAP
		uniform sampler2D specularIntensityMap;
	#endif
#endif
#ifdef USE_CLEARCOAT
	uniform float clearcoat;
	uniform float clearcoatRoughness;
#endif
#ifdef USE_IRIDESCENCE
	uniform float iridescence;
	uniform float iridescenceIOR;
	uniform float iridescenceThicknessMinimum;
	uniform float iridescenceThicknessMaximum;
#endif
#ifdef USE_SHEEN
	uniform vec3 sheenColor;
	uniform float sheenRoughness;
	#ifdef USE_SHEEN_COLORMAP
		uniform sampler2D sheenColorMap;
	#endif
	#ifdef USE_SHEEN_ROUGHNESSMAP
		uniform sampler2D sheenRoughnessMap;
	#endif
#endif
#ifdef USE_ANISOTROPY
	uniform vec2 anisotropyVector;
	#ifdef USE_ANISOTROPYMAP
		uniform sampler2D anisotropyMap;
	#endif
#endif
varying vec3 vViewPosition;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <iridescence_fragment>
#include <cube_uv_reflection_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_physical_pars_fragment>
#include <fog_pars_fragment>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_physical_pars_fragment>
#include <transmission_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <clearcoat_pars_fragment>
#include <iridescence_pars_fragment>
#include <roughnessmap_pars_fragment>
#include <metalnessmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	#include <clipping_planes_fragment>
	vec4 diffuseColor = vec4( diffuse, opacity );
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <roughnessmap_fragment>
	#include <metalnessmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <clearcoat_normal_fragment_begin>
	#include <clearcoat_normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_physical_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 totalDiffuse = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse;
	vec3 totalSpecular = reflectedLight.directSpecular + reflectedLight.indirectSpecular;
	#include <transmission_fragment>
	vec3 outgoingLight = totalDiffuse + totalSpecular + totalEmissiveRadiance;
	#ifdef USE_SHEEN
		float sheenEnergyComp = 1.0 - 0.157 * max3( material.sheenColor );
		outgoingLight = outgoingLight * sheenEnergyComp + sheenSpecularDirect + sheenSpecularIndirect;
	#endif
	#ifdef USE_CLEARCOAT
		float dotNVcc = saturate( dot( geometryClearcoatNormal, geometryViewDir ) );
		vec3 Fcc = F_Schlick( material.clearcoatF0, material.clearcoatF90, dotNVcc );
		outgoingLight = outgoingLight * ( 1.0 - material.clearcoat * Fcc ) + ( clearcoatSpecularDirect + clearcoatSpecularIndirect ) * material.clearcoat;
	#endif
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,meshtoon_vert:`#define TOON
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,meshtoon_frag:`#define TOON
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float opacity;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <gradientmap_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_toon_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	#include <clipping_planes_fragment>
	vec4 diffuseColor = vec4( diffuse, opacity );
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_toon_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + totalEmissiveRadiance;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,points_vert:`uniform float size;
uniform float scale;
#include <common>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
#ifdef USE_POINTS_UV
	varying vec2 vUv;
	uniform mat3 uvTransform;
#endif
void main() {
	#ifdef USE_POINTS_UV
		vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	#endif
	#include <color_vertex>
	#include <morphcolor_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <project_vertex>
	gl_PointSize = size;
	#ifdef USE_SIZEATTENUATION
		bool isPerspective = isPerspectiveMatrix( projectionMatrix );
		if ( isPerspective ) gl_PointSize *= ( scale / - mvPosition.z );
	#endif
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <worldpos_vertex>
	#include <fog_vertex>
}`,points_frag:`uniform vec3 diffuse;
uniform float opacity;
#include <common>
#include <color_pars_fragment>
#include <map_particle_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	#include <clipping_planes_fragment>
	vec3 outgoingLight = vec3( 0.0 );
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <logdepthbuf_fragment>
	#include <map_particle_fragment>
	#include <color_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,shadow_vert:`#include <common>
#include <batching_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <shadowmap_pars_vertex>
void main() {
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,shadow_frag:`uniform vec3 color;
uniform float opacity;
#include <common>
#include <packing>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <logdepthbuf_pars_fragment>
#include <shadowmap_pars_fragment>
#include <shadowmask_pars_fragment>
void main() {
	#include <logdepthbuf_fragment>
	gl_FragColor = vec4( color, opacity * ( 1.0 - getShadowMask() ) );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
}`,sprite_vert:`uniform float rotation;
uniform vec2 center;
#include <common>
#include <uv_pars_vertex>
#include <fog_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	vec4 mvPosition = modelViewMatrix * vec4( 0.0, 0.0, 0.0, 1.0 );
	vec2 scale;
	scale.x = length( vec3( modelMatrix[ 0 ].x, modelMatrix[ 0 ].y, modelMatrix[ 0 ].z ) );
	scale.y = length( vec3( modelMatrix[ 1 ].x, modelMatrix[ 1 ].y, modelMatrix[ 1 ].z ) );
	#ifndef USE_SIZEATTENUATION
		bool isPerspective = isPerspectiveMatrix( projectionMatrix );
		if ( isPerspective ) scale *= - mvPosition.z;
	#endif
	vec2 alignedPosition = ( position.xy - ( center - vec2( 0.5 ) ) ) * scale;
	vec2 rotatedPosition;
	rotatedPosition.x = cos( rotation ) * alignedPosition.x - sin( rotation ) * alignedPosition.y;
	rotatedPosition.y = sin( rotation ) * alignedPosition.x + cos( rotation ) * alignedPosition.y;
	mvPosition.xy += rotatedPosition;
	gl_Position = projectionMatrix * mvPosition;
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
}`,sprite_frag:`uniform vec3 diffuse;
uniform float opacity;
#include <common>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	#include <clipping_planes_fragment>
	vec3 outgoingLight = vec3( 0.0 );
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
}`},te={common:{diffuse:{value:new Pe(16777215)},opacity:{value:1},map:{value:null},mapTransform:{value:new ke},alphaMap:{value:null},alphaMapTransform:{value:new ke},alphaTest:{value:0}},specularmap:{specularMap:{value:null},specularMapTransform:{value:new ke}},envmap:{envMap:{value:null},flipEnvMap:{value:-1},reflectivity:{value:1},ior:{value:1.5},refractionRatio:{value:.98}},aomap:{aoMap:{value:null},aoMapIntensity:{value:1},aoMapTransform:{value:new ke}},lightmap:{lightMap:{value:null},lightMapIntensity:{value:1},lightMapTransform:{value:new ke}},bumpmap:{bumpMap:{value:null},bumpMapTransform:{value:new ke},bumpScale:{value:1}},normalmap:{normalMap:{value:null},normalMapTransform:{value:new ke},normalScale:{value:new qe(1,1)}},displacementmap:{displacementMap:{value:null},displacementMapTransform:{value:new ke},displacementScale:{value:1},displacementBias:{value:0}},emissivemap:{emissiveMap:{value:null},emissiveMapTransform:{value:new ke}},metalnessmap:{metalnessMap:{value:null},metalnessMapTransform:{value:new ke}},roughnessmap:{roughnessMap:{value:null},roughnessMapTransform:{value:new ke}},gradientmap:{gradientMap:{value:null}},fog:{fogDensity:{value:25e-5},fogNear:{value:1},fogFar:{value:2e3},fogColor:{value:new Pe(16777215)}},lights:{ambientLightColor:{value:[]},lightProbe:{value:[]},directionalLights:{value:[],properties:{direction:{},color:{}}},directionalLightShadows:{value:[],properties:{shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},directionalShadowMap:{value:[]},directionalShadowMatrix:{value:[]},spotLights:{value:[],properties:{color:{},position:{},direction:{},distance:{},coneCos:{},penumbraCos:{},decay:{}}},spotLightShadows:{value:[],properties:{shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},spotLightMap:{value:[]},spotShadowMap:{value:[]},spotLightMatrix:{value:[]},pointLights:{value:[],properties:{color:{},position:{},decay:{},distance:{}}},pointLightShadows:{value:[],properties:{shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{},shadowCameraNear:{},shadowCameraFar:{}}},pointShadowMap:{value:[]},pointShadowMatrix:{value:[]},hemisphereLights:{value:[],properties:{direction:{},skyColor:{},groundColor:{}}},rectAreaLights:{value:[],properties:{color:{},position:{},width:{},height:{}}},ltc_1:{value:null},ltc_2:{value:null}},points:{diffuse:{value:new Pe(16777215)},opacity:{value:1},size:{value:1},scale:{value:1},map:{value:null},alphaMap:{value:null},alphaMapTransform:{value:new ke},alphaTest:{value:0},uvTransform:{value:new ke}},sprite:{diffuse:{value:new Pe(16777215)},opacity:{value:1},center:{value:new qe(.5,.5)},rotation:{value:0},map:{value:null},mapTransform:{value:new ke},alphaMap:{value:null},alphaMapTransform:{value:new ke},alphaTest:{value:0}}},Qt={basic:{uniforms:Et([te.common,te.specularmap,te.envmap,te.aomap,te.lightmap,te.fog]),vertexShader:Ie.meshbasic_vert,fragmentShader:Ie.meshbasic_frag},lambert:{uniforms:Et([te.common,te.specularmap,te.envmap,te.aomap,te.lightmap,te.emissivemap,te.bumpmap,te.normalmap,te.displacementmap,te.fog,te.lights,{emissive:{value:new Pe(0)}}]),vertexShader:Ie.meshlambert_vert,fragmentShader:Ie.meshlambert_frag},phong:{uniforms:Et([te.common,te.specularmap,te.envmap,te.aomap,te.lightmap,te.emissivemap,te.bumpmap,te.normalmap,te.displacementmap,te.fog,te.lights,{emissive:{value:new Pe(0)},specular:{value:new Pe(1118481)},shininess:{value:30}}]),vertexShader:Ie.meshphong_vert,fragmentShader:Ie.meshphong_frag},standard:{uniforms:Et([te.common,te.envmap,te.aomap,te.lightmap,te.emissivemap,te.bumpmap,te.normalmap,te.displacementmap,te.roughnessmap,te.metalnessmap,te.fog,te.lights,{emissive:{value:new Pe(0)},roughness:{value:1},metalness:{value:0},envMapIntensity:{value:1}}]),vertexShader:Ie.meshphysical_vert,fragmentShader:Ie.meshphysical_frag},toon:{uniforms:Et([te.common,te.aomap,te.lightmap,te.emissivemap,te.bumpmap,te.normalmap,te.displacementmap,te.gradientmap,te.fog,te.lights,{emissive:{value:new Pe(0)}}]),vertexShader:Ie.meshtoon_vert,fragmentShader:Ie.meshtoon_frag},matcap:{uniforms:Et([te.common,te.bumpmap,te.normalmap,te.displacementmap,te.fog,{matcap:{value:null}}]),vertexShader:Ie.meshmatcap_vert,fragmentShader:Ie.meshmatcap_frag},points:{uniforms:Et([te.points,te.fog]),vertexShader:Ie.points_vert,fragmentShader:Ie.points_frag},dashed:{uniforms:Et([te.common,te.fog,{scale:{value:1},dashSize:{value:1},totalSize:{value:2}}]),vertexShader:Ie.linedashed_vert,fragmentShader:Ie.linedashed_frag},depth:{uniforms:Et([te.common,te.displacementmap]),vertexShader:Ie.depth_vert,fragmentShader:Ie.depth_frag},normal:{uniforms:Et([te.common,te.bumpmap,te.normalmap,te.displacementmap,{opacity:{value:1}}]),vertexShader:Ie.meshnormal_vert,fragmentShader:Ie.meshnormal_frag},sprite:{uniforms:Et([te.sprite,te.fog]),vertexShader:Ie.sprite_vert,fragmentShader:Ie.sprite_frag},background:{uniforms:{uvTransform:{value:new ke},t2D:{value:null},backgroundIntensity:{value:1}},vertexShader:Ie.background_vert,fragmentShader:Ie.background_frag},backgroundCube:{uniforms:{envMap:{value:null},flipEnvMap:{value:-1},backgroundBlurriness:{value:0},backgroundIntensity:{value:1}},vertexShader:Ie.backgroundCube_vert,fragmentShader:Ie.backgroundCube_frag},cube:{uniforms:{tCube:{value:null},tFlip:{value:-1},opacity:{value:1}},vertexShader:Ie.cube_vert,fragmentShader:Ie.cube_frag},equirect:{uniforms:{tEquirect:{value:null}},vertexShader:Ie.equirect_vert,fragmentShader:Ie.equirect_frag},distanceRGBA:{uniforms:Et([te.common,te.displacementmap,{referencePosition:{value:new U},nearDistance:{value:1},farDistance:{value:1e3}}]),vertexShader:Ie.distanceRGBA_vert,fragmentShader:Ie.distanceRGBA_frag},shadow:{uniforms:Et([te.lights,te.fog,{color:{value:new Pe(0)},opacity:{value:1}}]),vertexShader:Ie.shadow_vert,fragmentShader:Ie.shadow_frag}};Qt.physical={uniforms:Et([Qt.standard.uniforms,{clearcoat:{value:0},clearcoatMap:{value:null},clearcoatMapTransform:{value:new ke},clearcoatNormalMap:{value:null},clearcoatNormalMapTransform:{value:new ke},clearcoatNormalScale:{value:new qe(1,1)},clearcoatRoughness:{value:0},clearcoatRoughnessMap:{value:null},clearcoatRoughnessMapTransform:{value:new ke},iridescence:{value:0},iridescenceMap:{value:null},iridescenceMapTransform:{value:new ke},iridescenceIOR:{value:1.3},iridescenceThicknessMinimum:{value:100},iridescenceThicknessMaximum:{value:400},iridescenceThicknessMap:{value:null},iridescenceThicknessMapTransform:{value:new ke},sheen:{value:0},sheenColor:{value:new Pe(0)},sheenColorMap:{value:null},sheenColorMapTransform:{value:new ke},sheenRoughness:{value:1},sheenRoughnessMap:{value:null},sheenRoughnessMapTransform:{value:new ke},transmission:{value:0},transmissionMap:{value:null},transmissionMapTransform:{value:new ke},transmissionSamplerSize:{value:new qe},transmissionSamplerMap:{value:null},thickness:{value:0},thicknessMap:{value:null},thicknessMapTransform:{value:new ke},attenuationDistance:{value:0},attenuationColor:{value:new Pe(0)},specularColor:{value:new Pe(1,1,1)},specularColorMap:{value:null},specularColorMapTransform:{value:new ke},specularIntensity:{value:1},specularIntensityMap:{value:null},specularIntensityMapTransform:{value:new ke},anisotropyVector:{value:new qe},anisotropyMap:{value:null},anisotropyMapTransform:{value:new ke}}]),vertexShader:Ie.meshphysical_vert,fragmentShader:Ie.meshphysical_frag};const Rs={r:0,b:0,g:0};function Rh(i,e,t,n,s,r,o){const a=new Pe(0);let l=r===!0?0:1,c,d,p=null,f=0,m=null;function g(h,u){let y=!1,x=u.isScene===!0?u.background:null;x&&x.isTexture&&(x=(u.backgroundBlurriness>0?t:e).get(x)),x===null?_(a,l):x&&x.isColor&&(_(x,1),y=!0);const T=i.xr.getEnvironmentBlendMode();T==="additive"?n.buffers.color.setClear(0,0,0,1,o):T==="alpha-blend"&&n.buffers.color.setClear(0,0,0,0,o),(i.autoClear||y)&&i.clear(i.autoClearColor,i.autoClearDepth,i.autoClearStencil),x&&(x.isCubeTexture||x.mapping===Ji)?(d===void 0&&(d=new Vt(new Cn(1,1,1),new Vn({name:"BackgroundCubeMaterial",uniforms:Mi(Qt.backgroundCube.uniforms),vertexShader:Qt.backgroundCube.vertexShader,fragmentShader:Qt.backgroundCube.fragmentShader,side:Rt,depthTest:!1,depthWrite:!1,fog:!1})),d.geometry.deleteAttribute("normal"),d.geometry.deleteAttribute("uv"),d.onBeforeRender=function(L,w,A){this.matrixWorld.copyPosition(A.matrixWorld)},Object.defineProperty(d.material,"envMap",{get:function(){return this.uniforms.envMap.value}}),s.update(d)),d.material.uniforms.envMap.value=x,d.material.uniforms.flipEnvMap.value=x.isCubeTexture&&x.isRenderTargetTexture===!1?-1:1,d.material.uniforms.backgroundBlurriness.value=u.backgroundBlurriness,d.material.uniforms.backgroundIntensity.value=u.backgroundIntensity,d.material.toneMapped=Ye.getTransfer(x.colorSpace)!==Qe,(p!==x||f!==x.version||m!==i.toneMapping)&&(d.material.needsUpdate=!0,p=x,f=x.version,m=i.toneMapping),d.layers.enableAll(),h.unshift(d,d.geometry,d.material,0,0,null)):x&&x.isTexture&&(c===void 0&&(c=new Vt(new As(2,2),new Vn({name:"BackgroundMaterial",uniforms:Mi(Qt.background.uniforms),vertexShader:Qt.background.vertexShader,fragmentShader:Qt.background.fragmentShader,side:xn,depthTest:!1,depthWrite:!1,fog:!1})),c.geometry.deleteAttribute("normal"),Object.defineProperty(c.material,"map",{get:function(){return this.uniforms.t2D.value}}),s.update(c)),c.material.uniforms.t2D.value=x,c.material.uniforms.backgroundIntensity.value=u.backgroundIntensity,c.material.toneMapped=Ye.getTransfer(x.colorSpace)!==Qe,x.matrixAutoUpdate===!0&&x.updateMatrix(),c.material.uniforms.uvTransform.value.copy(x.matrix),(p!==x||f!==x.version||m!==i.toneMapping)&&(c.material.needsUpdate=!0,p=x,f=x.version,m=i.toneMapping),c.layers.enableAll(),h.unshift(c,c.geometry,c.material,0,0,null))}function _(h,u){h.getRGB(Rs,Io(i)),n.buffers.color.setClear(Rs.r,Rs.g,Rs.b,u,o)}return{getClearColor:function(){return a},setClearColor:function(h,u=1){a.set(h),l=u,_(a,l)},getClearAlpha:function(){return l},setClearAlpha:function(h){l=h,_(a,l)},render:g}}function Ch(i,e,t,n){const s=i.getParameter(i.MAX_VERTEX_ATTRIBS),r=n.isWebGL2?null:e.get("OES_vertex_array_object"),o=n.isWebGL2||r!==null,a={},l=h(null);let c=l,d=!1;function p(C,z,G,Y,V){let D=!1;if(o){const W=_(Y,G,z);c!==W&&(c=W,m(c.object)),D=u(C,Y,G,V),D&&y(C,Y,G,V)}else{const W=z.wireframe===!0;(c.geometry!==Y.id||c.program!==G.id||c.wireframe!==W)&&(c.geometry=Y.id,c.program=G.id,c.wireframe=W,D=!0)}V!==null&&t.update(V,i.ELEMENT_ARRAY_BUFFER),(D||d)&&(d=!1,X(C,z,G,Y),V!==null&&i.bindBuffer(i.ELEMENT_ARRAY_BUFFER,t.get(V).buffer))}function f(){return n.isWebGL2?i.createVertexArray():r.createVertexArrayOES()}function m(C){return n.isWebGL2?i.bindVertexArray(C):r.bindVertexArrayOES(C)}function g(C){return n.isWebGL2?i.deleteVertexArray(C):r.deleteVertexArrayOES(C)}function _(C,z,G){const Y=G.wireframe===!0;let V=a[C.id];V===void 0&&(V={},a[C.id]=V);let D=V[z.id];D===void 0&&(D={},V[z.id]=D);let W=D[Y];return W===void 0&&(W=h(f()),D[Y]=W),W}function h(C){const z=[],G=[],Y=[];for(let V=0;V<s;V++)z[V]=0,G[V]=0,Y[V]=0;return{geometry:null,program:null,wireframe:!1,newAttributes:z,enabledAttributes:G,attributeDivisors:Y,object:C,attributes:{},index:null}}function u(C,z,G,Y){const V=c.attributes,D=z.attributes;let W=0;const j=G.getAttributes();for(const ae in j)if(j[ae].location>=0){const q=V[ae];let le=D[ae];if(le===void 0&&(ae==="instanceMatrix"&&C.instanceMatrix&&(le=C.instanceMatrix),ae==="instanceColor"&&C.instanceColor&&(le=C.instanceColor)),q===void 0||q.attribute!==le||le&&q.data!==le.data)return!0;W++}return c.attributesNum!==W||c.index!==Y}function y(C,z,G,Y){const V={},D=z.attributes;let W=0;const j=G.getAttributes();for(const ae in j)if(j[ae].location>=0){let q=D[ae];q===void 0&&(ae==="instanceMatrix"&&C.instanceMatrix&&(q=C.instanceMatrix),ae==="instanceColor"&&C.instanceColor&&(q=C.instanceColor));const le={};le.attribute=q,q&&q.data&&(le.data=q.data),V[ae]=le,W++}c.attributes=V,c.attributesNum=W,c.index=Y}function x(){const C=c.newAttributes;for(let z=0,G=C.length;z<G;z++)C[z]=0}function T(C){L(C,0)}function L(C,z){const G=c.newAttributes,Y=c.enabledAttributes,V=c.attributeDivisors;G[C]=1,Y[C]===0&&(i.enableVertexAttribArray(C),Y[C]=1),V[C]!==z&&((n.isWebGL2?i:e.get("ANGLE_instanced_arrays"))[n.isWebGL2?"vertexAttribDivisor":"vertexAttribDivisorANGLE"](C,z),V[C]=z)}function w(){const C=c.newAttributes,z=c.enabledAttributes;for(let G=0,Y=z.length;G<Y;G++)z[G]!==C[G]&&(i.disableVertexAttribArray(G),z[G]=0)}function A(C,z,G,Y,V,D,W){W===!0?i.vertexAttribIPointer(C,z,G,V,D):i.vertexAttribPointer(C,z,G,Y,V,D)}function X(C,z,G,Y){if(n.isWebGL2===!1&&(C.isInstancedMesh||Y.isInstancedBufferGeometry)&&e.get("ANGLE_instanced_arrays")===null)return;x();const V=Y.attributes,D=G.getAttributes(),W=z.defaultAttributeValues;for(const j in D){const ae=D[j];if(ae.location>=0){let H=V[j];if(H===void 0&&(j==="instanceMatrix"&&C.instanceMatrix&&(H=C.instanceMatrix),j==="instanceColor"&&C.instanceColor&&(H=C.instanceColor)),H!==void 0){const q=H.normalized,le=H.itemSize,fe=t.get(H);if(fe===void 0)continue;const ge=fe.buffer,De=fe.type,Ne=fe.bytesPerElement,be=n.isWebGL2===!0&&(De===i.INT||De===i.UNSIGNED_INT||H.gpuType===ya);if(H.isInterleavedBufferAttribute){const Xe=H.data,I=Xe.stride,Tt=H.offset;if(Xe.isInstancedInterleavedBuffer){for(let ve=0;ve<ae.locationSize;ve++)L(ae.location+ve,Xe.meshPerAttribute);C.isInstancedMesh!==!0&&Y._maxInstanceCount===void 0&&(Y._maxInstanceCount=Xe.meshPerAttribute*Xe.count)}else for(let ve=0;ve<ae.locationSize;ve++)T(ae.location+ve);i.bindBuffer(i.ARRAY_BUFFER,ge);for(let ve=0;ve<ae.locationSize;ve++)A(ae.location+ve,le/ae.locationSize,De,q,I*Ne,(Tt+le/ae.locationSize*ve)*Ne,be)}else{if(H.isInstancedBufferAttribute){for(let Xe=0;Xe<ae.locationSize;Xe++)L(ae.location+Xe,H.meshPerAttribute);C.isInstancedMesh!==!0&&Y._maxInstanceCount===void 0&&(Y._maxInstanceCount=H.meshPerAttribute*H.count)}else for(let Xe=0;Xe<ae.locationSize;Xe++)T(ae.location+Xe);i.bindBuffer(i.ARRAY_BUFFER,ge);for(let Xe=0;Xe<ae.locationSize;Xe++)A(ae.location+Xe,le/ae.locationSize,De,q,le*Ne,le/ae.locationSize*Xe*Ne,be)}}else if(W!==void 0){const q=W[j];if(q!==void 0)switch(q.length){case 2:i.vertexAttrib2fv(ae.location,q);break;case 3:i.vertexAttrib3fv(ae.location,q);break;case 4:i.vertexAttrib4fv(ae.location,q);break;default:i.vertexAttrib1fv(ae.location,q)}}}}w()}function S(){$();for(const C in a){const z=a[C];for(const G in z){const Y=z[G];for(const V in Y)g(Y[V].object),delete Y[V];delete z[G]}delete a[C]}}function b(C){if(a[C.id]===void 0)return;const z=a[C.id];for(const G in z){const Y=z[G];for(const V in Y)g(Y[V].object),delete Y[V];delete z[G]}delete a[C.id]}function k(C){for(const z in a){const G=a[z];if(G[C.id]===void 0)continue;const Y=G[C.id];for(const V in Y)g(Y[V].object),delete Y[V];delete G[C.id]}}function $(){ie(),d=!0,c!==l&&(c=l,m(c.object))}function ie(){l.geometry=null,l.program=null,l.wireframe=!1}return{setup:p,reset:$,resetDefaultState:ie,dispose:S,releaseStatesOfGeometry:b,releaseStatesOfProgram:k,initAttributes:x,enableAttribute:T,disableUnusedAttributes:w}}function Lh(i,e,t,n){const s=n.isWebGL2;let r;function o(d){r=d}function a(d,p){i.drawArrays(r,d,p),t.update(p,r,1)}function l(d,p,f){if(f===0)return;let m,g;if(s)m=i,g="drawArraysInstanced";else if(m=e.get("ANGLE_instanced_arrays"),g="drawArraysInstancedANGLE",m===null){console.error("THREE.WebGLBufferRenderer: using THREE.InstancedBufferGeometry but hardware does not support extension ANGLE_instanced_arrays.");return}m[g](r,d,p,f),t.update(p,r,f)}function c(d,p,f){if(f===0)return;const m=e.get("WEBGL_multi_draw");if(m===null)for(let g=0;g<f;g++)this.render(d[g],p[g]);else{m.multiDrawArraysWEBGL(r,d,0,p,0,f);let g=0;for(let _=0;_<f;_++)g+=p[_];t.update(g,r,1)}}this.setMode=o,this.render=a,this.renderInstances=l,this.renderMultiDraw=c}function Ph(i,e,t){let n;function s(){if(n!==void 0)return n;if(e.has("EXT_texture_filter_anisotropic")===!0){const A=e.get("EXT_texture_filter_anisotropic");n=i.getParameter(A.MAX_TEXTURE_MAX_ANISOTROPY_EXT)}else n=0;return n}function r(A){if(A==="highp"){if(i.getShaderPrecisionFormat(i.VERTEX_SHADER,i.HIGH_FLOAT).precision>0&&i.getShaderPrecisionFormat(i.FRAGMENT_SHADER,i.HIGH_FLOAT).precision>0)return"highp";A="mediump"}return A==="mediump"&&i.getShaderPrecisionFormat(i.VERTEX_SHADER,i.MEDIUM_FLOAT).precision>0&&i.getShaderPrecisionFormat(i.FRAGMENT_SHADER,i.MEDIUM_FLOAT).precision>0?"mediump":"lowp"}const o=typeof WebGL2RenderingContext<"u"&&i.constructor.name==="WebGL2RenderingContext";let a=t.precision!==void 0?t.precision:"highp";const l=r(a);l!==a&&(console.warn("THREE.WebGLRenderer:",a,"not supported, using",l,"instead."),a=l);const c=o||e.has("WEBGL_draw_buffers"),d=t.logarithmicDepthBuffer===!0,p=i.getParameter(i.MAX_TEXTURE_IMAGE_UNITS),f=i.getParameter(i.MAX_VERTEX_TEXTURE_IMAGE_UNITS),m=i.getParameter(i.MAX_TEXTURE_SIZE),g=i.getParameter(i.MAX_CUBE_MAP_TEXTURE_SIZE),_=i.getParameter(i.MAX_VERTEX_ATTRIBS),h=i.getParameter(i.MAX_VERTEX_UNIFORM_VECTORS),u=i.getParameter(i.MAX_VARYING_VECTORS),y=i.getParameter(i.MAX_FRAGMENT_UNIFORM_VECTORS),x=f>0,T=o||e.has("OES_texture_float"),L=x&&T,w=o?i.getParameter(i.MAX_SAMPLES):0;return{isWebGL2:o,drawBuffers:c,getMaxAnisotropy:s,getMaxPrecision:r,precision:a,logarithmicDepthBuffer:d,maxTextures:p,maxVertexTextures:f,maxTextureSize:m,maxCubemapSize:g,maxAttributes:_,maxVertexUniforms:h,maxVaryings:u,maxFragmentUniforms:y,vertexTextures:x,floatFragmentTextures:T,floatVertexTextures:L,maxSamples:w}}function Dh(i){const e=this;let t=null,n=0,s=!1,r=!1;const o=new Wn,a=new ke,l={value:null,needsUpdate:!1};this.uniform=l,this.numPlanes=0,this.numIntersection=0,this.init=function(p,f){const m=p.length!==0||f||n!==0||s;return s=f,n=p.length,m},this.beginShadows=function(){r=!0,d(null)},this.endShadows=function(){r=!1},this.setGlobalState=function(p,f){t=d(p,f,0)},this.setState=function(p,f,m){const g=p.clippingPlanes,_=p.clipIntersection,h=p.clipShadows,u=i.get(p);if(!s||g===null||g.length===0||r&&!h)r?d(null):c();else{const y=r?0:n,x=y*4;let T=u.clippingState||null;l.value=T,T=d(g,f,x,m);for(let L=0;L!==x;++L)T[L]=t[L];u.clippingState=T,this.numIntersection=_?this.numPlanes:0,this.numPlanes+=y}};function c(){l.value!==t&&(l.value=t,l.needsUpdate=n>0),e.numPlanes=n,e.numIntersection=0}function d(p,f,m,g){const _=p!==null?p.length:0;let h=null;if(_!==0){if(h=l.value,g!==!0||h===null){const u=m+_*4,y=f.matrixWorldInverse;a.getNormalMatrix(y),(h===null||h.length<u)&&(h=new Float32Array(u));for(let x=0,T=m;x!==_;++x,T+=4)o.copy(p[x]).applyMatrix4(y,a),o.normal.toArray(h,T),h[T+3]=o.constant}l.value=h,l.needsUpdate=!0}return e.numPlanes=_,e.numIntersection=0,h}}function Uh(i){let e=new WeakMap;function t(o,a){return a===Js?o.mapping=ti:a===Qs&&(o.mapping=ni),o}function n(o){if(o&&o.isTexture){const a=o.mapping;if(a===Js||a===Qs)if(e.has(o)){const l=e.get(o).texture;return t(l,o.mapping)}else{const l=o.image;if(l&&l.height>0){const c=new Tu(l.height/2);return c.fromEquirectangularTexture(i,o),e.set(o,c),o.addEventListener("dispose",s),t(c.texture,o.mapping)}else return null}}return o}function s(o){const a=o.target;a.removeEventListener("dispose",s);const l=e.get(a);l!==void 0&&(e.delete(a),l.dispose())}function r(){e=new WeakMap}return{get:n,dispose:r}}class zo extends No{constructor(e=-1,t=1,n=1,s=-1,r=.1,o=2e3){super(),this.isOrthographicCamera=!0,this.type="OrthographicCamera",this.zoom=1,this.view=null,this.left=e,this.right=t,this.top=n,this.bottom=s,this.near=r,this.far=o,this.updateProjectionMatrix()}copy(e,t){return super.copy(e,t),this.left=e.left,this.right=e.right,this.top=e.top,this.bottom=e.bottom,this.near=e.near,this.far=e.far,this.zoom=e.zoom,this.view=e.view===null?null:Object.assign({},e.view),this}setViewOffset(e,t,n,s,r,o){this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=t,this.view.offsetX=n,this.view.offsetY=s,this.view.width=r,this.view.height=o,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const e=(this.right-this.left)/(2*this.zoom),t=(this.top-this.bottom)/(2*this.zoom),n=(this.right+this.left)/2,s=(this.top+this.bottom)/2;let r=n-e,o=n+e,a=s+t,l=s-t;if(this.view!==null&&this.view.enabled){const c=(this.right-this.left)/this.view.fullWidth/this.zoom,d=(this.top-this.bottom)/this.view.fullHeight/this.zoom;r+=c*this.view.offsetX,o=r+c*this.view.width,a-=d*this.view.offsetY,l=a-d*this.view.height}this.projectionMatrix.makeOrthographic(r,o,a,l,this.near,this.far,this.coordinateSystem),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){const t=super.toJSON(e);return t.object.zoom=this.zoom,t.object.left=this.left,t.object.right=this.right,t.object.top=this.top,t.object.bottom=this.bottom,t.object.near=this.near,t.object.far=this.far,this.view!==null&&(t.object.view=Object.assign({},this.view)),t}}const Ei=4,Bo=[.125,.215,.35,.446,.526,.582],qn=20,Dr=new zo,ko=new Pe;let Ur=null,Ir=0,Nr=0;const jn=(1+Math.sqrt(5))/2,bi=1/jn,Ho=[new U(1,1,1),new U(-1,1,1),new U(1,1,-1),new U(-1,1,-1),new U(0,jn,bi),new U(0,jn,-bi),new U(bi,0,jn),new U(-bi,0,jn),new U(jn,bi,0),new U(-jn,bi,0)];class Go{constructor(e){this._renderer=e,this._pingPongRenderTarget=null,this._lodMax=0,this._cubeSize=0,this._lodPlanes=[],this._sizeLods=[],this._sigmas=[],this._blurMaterial=null,this._cubemapMaterial=null,this._equirectMaterial=null,this._compileMaterial(this._blurMaterial)}fromScene(e,t=0,n=.1,s=100){Ur=this._renderer.getRenderTarget(),Ir=this._renderer.getActiveCubeFace(),Nr=this._renderer.getActiveMipmapLevel(),this._setSize(256);const r=this._allocateTargets();return r.depthBuffer=!0,this._sceneToCubeUV(e,n,s,r),t>0&&this._blur(r,0,0,t),this._applyPMREM(r),this._cleanup(r),r}fromEquirectangular(e,t=null){return this._fromTexture(e,t)}fromCubemap(e,t=null){return this._fromTexture(e,t)}compileCubemapShader(){this._cubemapMaterial===null&&(this._cubemapMaterial=Xo(),this._compileMaterial(this._cubemapMaterial))}compileEquirectangularShader(){this._equirectMaterial===null&&(this._equirectMaterial=Wo(),this._compileMaterial(this._equirectMaterial))}dispose(){this._dispose(),this._cubemapMaterial!==null&&this._cubemapMaterial.dispose(),this._equirectMaterial!==null&&this._equirectMaterial.dispose()}_setSize(e){this._lodMax=Math.floor(Math.log2(e)),this._cubeSize=Math.pow(2,this._lodMax)}_dispose(){this._blurMaterial!==null&&this._blurMaterial.dispose(),this._pingPongRenderTarget!==null&&this._pingPongRenderTarget.dispose();for(let e=0;e<this._lodPlanes.length;e++)this._lodPlanes[e].dispose()}_cleanup(e){this._renderer.setRenderTarget(Ur,Ir,Nr),e.scissorTest=!1,Cs(e,0,0,e.width,e.height)}_fromTexture(e,t){e.mapping===ti||e.mapping===ni?this._setSize(e.image.length===0?16:e.image[0].width||e.image[0].image.width):this._setSize(e.image.width/4),Ur=this._renderer.getRenderTarget(),Ir=this._renderer.getActiveCubeFace(),Nr=this._renderer.getActiveMipmapLevel();const n=t||this._allocateTargets();return this._textureToCubeUV(e,n),this._applyPMREM(n),this._cleanup(n),n}_allocateTargets(){const e=3*Math.max(this._cubeSize,112),t=4*this._cubeSize,n={magFilter:kt,minFilter:kt,generateMipmaps:!1,type:Ni,format:qt,colorSpace:sn,depthBuffer:!1},s=Vo(e,t,n);if(this._pingPongRenderTarget===null||this._pingPongRenderTarget.width!==e||this._pingPongRenderTarget.height!==t){this._pingPongRenderTarget!==null&&this._dispose(),this._pingPongRenderTarget=Vo(e,t,n);const{_lodMax:r}=this;({sizeLods:this._sizeLods,lodPlanes:this._lodPlanes,sigmas:this._sigmas}=Ih(r)),this._blurMaterial=Nh(r,e,t)}return s}_compileMaterial(e){const t=new Vt(this._lodPlanes[0],e);this._renderer.compile(t,Dr)}_sceneToCubeUV(e,t,n,s){const a=new Wt(90,1,t,n),l=[1,-1,1,1,1,1],c=[1,1,1,-1,-1,-1],d=this._renderer,p=d.autoClear,f=d.toneMapping;d.getClearColor(ko),d.toneMapping=Mn,d.autoClear=!1;const m=new wo({name:"PMREM.Background",side:Rt,depthWrite:!1,depthTest:!1}),g=new Vt(new Cn,m);let _=!1;const h=e.background;h?h.isColor&&(m.color.copy(h),e.background=null,_=!0):(m.color.copy(ko),_=!0);for(let u=0;u<6;u++){const y=u%3;y===0?(a.up.set(0,l[u],0),a.lookAt(c[u],0,0)):y===1?(a.up.set(0,0,l[u]),a.lookAt(0,c[u],0)):(a.up.set(0,l[u],0),a.lookAt(0,0,c[u]));const x=this._cubeSize;Cs(s,y*x,u>2?x:0,x,x),d.setRenderTarget(s),_&&d.render(g,a),d.render(e,a)}g.geometry.dispose(),g.material.dispose(),d.toneMapping=f,d.autoClear=p,e.background=h}_textureToCubeUV(e,t){const n=this._renderer,s=e.mapping===ti||e.mapping===ni;s?(this._cubemapMaterial===null&&(this._cubemapMaterial=Xo()),this._cubemapMaterial.uniforms.flipEnvMap.value=e.isRenderTargetTexture===!1?-1:1):this._equirectMaterial===null&&(this._equirectMaterial=Wo());const r=s?this._cubemapMaterial:this._equirectMaterial,o=new Vt(this._lodPlanes[0],r),a=r.uniforms;a.envMap.value=e;const l=this._cubeSize;Cs(t,0,0,3*l,2*l),n.setRenderTarget(t),n.render(o,Dr)}_applyPMREM(e){const t=this._renderer,n=t.autoClear;t.autoClear=!1;for(let s=1;s<this._lodPlanes.length;s++){const r=Math.sqrt(this._sigmas[s]*this._sigmas[s]-this._sigmas[s-1]*this._sigmas[s-1]),o=Ho[(s-1)%Ho.length];this._blur(e,s-1,s,r,o)}t.autoClear=n}_blur(e,t,n,s,r){const o=this._pingPongRenderTarget;this._halfBlur(e,o,t,n,s,"latitudinal",r),this._halfBlur(o,e,n,n,s,"longitudinal",r)}_halfBlur(e,t,n,s,r,o,a){const l=this._renderer,c=this._blurMaterial;o!=="latitudinal"&&o!=="longitudinal"&&console.error("blur direction must be either latitudinal or longitudinal!");const d=3,p=new Vt(this._lodPlanes[s],c),f=c.uniforms,m=this._sizeLods[n]-1,g=isFinite(r)?Math.PI/(2*m):2*Math.PI/(2*qn-1),_=r/g,h=isFinite(r)?1+Math.floor(d*_):qn;h>qn&&console.warn(`sigmaRadians, ${r}, is too large and will clip, as it requested ${h} samples when the maximum is set to ${qn}`);const u=[];let y=0;for(let A=0;A<qn;++A){const X=A/_,S=Math.exp(-X*X/2);u.push(S),A===0?y+=S:A<h&&(y+=2*S)}for(let A=0;A<u.length;A++)u[A]=u[A]/y;f.envMap.value=e.texture,f.samples.value=h,f.weights.value=u,f.latitudinal.value=o==="latitudinal",a&&(f.poleAxis.value=a);const{_lodMax:x}=this;f.dTheta.value=g,f.mipInt.value=x-n;const T=this._sizeLods[s],L=3*T*(s>x-Ei?s-x+Ei:0),w=4*(this._cubeSize-T);Cs(t,L,w,3*T,2*T),l.setRenderTarget(t),l.render(p,Dr)}}function Ih(i){const e=[],t=[],n=[];let s=i;const r=i-Ei+1+Bo.length;for(let o=0;o<r;o++){const a=Math.pow(2,s);t.push(a);let l=1/a;o>i-Ei?l=Bo[o-i+Ei-1]:o===0&&(l=0),n.push(l);const c=1/(a-2),d=-c,p=1+c,f=[d,d,p,d,p,p,d,d,p,p,d,p],m=6,g=6,_=3,h=2,u=1,y=new Float32Array(_*g*m),x=new Float32Array(h*g*m),T=new Float32Array(u*g*m);for(let w=0;w<m;w++){const A=w%3*2/3-1,X=w>2?0:-1,S=[A,X,0,A+2/3,X,0,A+2/3,X+1,0,A,X,0,A+2/3,X+1,0,A,X+1,0];y.set(S,_*g*w),x.set(f,h*g*w);const b=[w,w,w,w,w,w];T.set(b,u*g*w)}const L=new dn;L.setAttribute("position",new Jt(y,_)),L.setAttribute("uv",new Jt(x,h)),L.setAttribute("faceIndex",new Jt(T,u)),e.push(L),s>Ei&&s--}return{lodPlanes:e,sizeLods:t,sigmas:n}}function Vo(i,e,t){const n=new Bn(i,e,t);return n.texture.mapping=Ji,n.texture.name="PMREM.cubeUv",n.scissorTest=!0,n}function Cs(i,e,t,n,s){i.viewport.set(e,t,n,s),i.scissor.set(e,t,n,s)}function Nh(i,e,t){const n=new Float32Array(qn),s=new U(0,1,0);return new Vn({name:"SphericalGaussianBlur",defines:{n:qn,CUBEUV_TEXEL_WIDTH:1/e,CUBEUV_TEXEL_HEIGHT:1/t,CUBEUV_MAX_MIP:`${i}.0`},uniforms:{envMap:{value:null},samples:{value:1},weights:{value:n},latitudinal:{value:!1},dTheta:{value:0},mipInt:{value:0},poleAxis:{value:s}},vertexShader:Fr(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			varying vec3 vOutputDirection;

			uniform sampler2D envMap;
			uniform int samples;
			uniform float weights[ n ];
			uniform bool latitudinal;
			uniform float dTheta;
			uniform float mipInt;
			uniform vec3 poleAxis;

			#define ENVMAP_TYPE_CUBE_UV
			#include <cube_uv_reflection_fragment>

			vec3 getSample( float theta, vec3 axis ) {

				float cosTheta = cos( theta );
				// Rodrigues' axis-angle rotation
				vec3 sampleDirection = vOutputDirection * cosTheta
					+ cross( axis, vOutputDirection ) * sin( theta )
					+ axis * dot( axis, vOutputDirection ) * ( 1.0 - cosTheta );

				return bilinearCubeUV( envMap, sampleDirection, mipInt );

			}

			void main() {

				vec3 axis = latitudinal ? poleAxis : cross( poleAxis, vOutputDirection );

				if ( all( equal( axis, vec3( 0.0 ) ) ) ) {

					axis = vec3( vOutputDirection.z, 0.0, - vOutputDirection.x );

				}

				axis = normalize( axis );

				gl_FragColor = vec4( 0.0, 0.0, 0.0, 1.0 );
				gl_FragColor.rgb += weights[ 0 ] * getSample( 0.0, axis );

				for ( int i = 1; i < n; i++ ) {

					if ( i >= samples ) {

						break;

					}

					float theta = dTheta * float( i );
					gl_FragColor.rgb += weights[ i ] * getSample( -1.0 * theta, axis );
					gl_FragColor.rgb += weights[ i ] * getSample( theta, axis );

				}

			}
		`,blending:vn,depthTest:!1,depthWrite:!1})}function Wo(){return new Vn({name:"EquirectangularToCubeUV",uniforms:{envMap:{value:null}},vertexShader:Fr(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			varying vec3 vOutputDirection;

			uniform sampler2D envMap;

			#include <common>

			void main() {

				vec3 outputDirection = normalize( vOutputDirection );
				vec2 uv = equirectUv( outputDirection );

				gl_FragColor = vec4( texture2D ( envMap, uv ).rgb, 1.0 );

			}
		`,blending:vn,depthTest:!1,depthWrite:!1})}function Xo(){return new Vn({name:"CubemapToCubeUV",uniforms:{envMap:{value:null},flipEnvMap:{value:-1}},vertexShader:Fr(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			uniform float flipEnvMap;

			varying vec3 vOutputDirection;

			uniform samplerCube envMap;

			void main() {

				gl_FragColor = textureCube( envMap, vec3( flipEnvMap * vOutputDirection.x, vOutputDirection.yz ) );

			}
		`,blending:vn,depthTest:!1,depthWrite:!1})}function Fr(){return`

		precision mediump float;
		precision mediump int;

		attribute float faceIndex;

		varying vec3 vOutputDirection;

		// RH coordinate system; PMREM face-indexing convention
		vec3 getDirection( vec2 uv, float face ) {

			uv = 2.0 * uv - 1.0;

			vec3 direction = vec3( uv, 1.0 );

			if ( face == 0.0 ) {

				direction = direction.zyx; // ( 1, v, u ) pos x

			} else if ( face == 1.0 ) {

				direction = direction.xzy;
				direction.xz *= -1.0; // ( -u, 1, -v ) pos y

			} else if ( face == 2.0 ) {

				direction.x *= -1.0; // ( -u, v, 1 ) pos z

			} else if ( face == 3.0 ) {

				direction = direction.zyx;
				direction.xz *= -1.0; // ( -1, v, -u ) neg x

			} else if ( face == 4.0 ) {

				direction = direction.xzy;
				direction.xy *= -1.0; // ( -u, -1, v ) neg y

			} else if ( face == 5.0 ) {

				direction.z *= -1.0; // ( u, v, -1 ) neg z

			}

			return direction;

		}

		void main() {

			vOutputDirection = getDirection( uv, faceIndex );
			gl_Position = vec4( position, 1.0 );

		}
	`}function Fh(i){let e=new WeakMap,t=null;function n(a){if(a&&a.isTexture){const l=a.mapping,c=l===Js||l===Qs,d=l===ti||l===ni;if(c||d)if(a.isRenderTargetTexture&&a.needsPMREMUpdate===!0){a.needsPMREMUpdate=!1;let p=e.get(a);return t===null&&(t=new Go(i)),p=c?t.fromEquirectangular(a,p):t.fromCubemap(a,p),e.set(a,p),p.texture}else{if(e.has(a))return e.get(a).texture;{const p=a.image;if(c&&p&&p.height>0||d&&p&&s(p)){t===null&&(t=new Go(i));const f=c?t.fromEquirectangular(a):t.fromCubemap(a);return e.set(a,f),a.addEventListener("dispose",r),f.texture}else return null}}}return a}function s(a){let l=0;const c=6;for(let d=0;d<c;d++)a[d]!==void 0&&l++;return l===c}function r(a){const l=a.target;l.removeEventListener("dispose",r);const c=e.get(l);c!==void 0&&(e.delete(l),c.dispose())}function o(){e=new WeakMap,t!==null&&(t.dispose(),t=null)}return{get:n,dispose:o}}function Oh(i){const e={};function t(n){if(e[n]!==void 0)return e[n];let s;switch(n){case"WEBGL_depth_texture":s=i.getExtension("WEBGL_depth_texture")||i.getExtension("MOZ_WEBGL_depth_texture")||i.getExtension("WEBKIT_WEBGL_depth_texture");break;case"EXT_texture_filter_anisotropic":s=i.getExtension("EXT_texture_filter_anisotropic")||i.getExtension("MOZ_EXT_texture_filter_anisotropic")||i.getExtension("WEBKIT_EXT_texture_filter_anisotropic");break;case"WEBGL_compressed_texture_s3tc":s=i.getExtension("WEBGL_compressed_texture_s3tc")||i.getExtension("MOZ_WEBGL_compressed_texture_s3tc")||i.getExtension("WEBKIT_WEBGL_compressed_texture_s3tc");break;case"WEBGL_compressed_texture_pvrtc":s=i.getExtension("WEBGL_compressed_texture_pvrtc")||i.getExtension("WEBKIT_WEBGL_compressed_texture_pvrtc");break;default:s=i.getExtension(n)}return e[n]=s,s}return{has:function(n){return t(n)!==null},init:function(n){n.isWebGL2?(t("EXT_color_buffer_float"),t("WEBGL_clip_cull_distance")):(t("WEBGL_depth_texture"),t("OES_texture_float"),t("OES_texture_half_float"),t("OES_texture_half_float_linear"),t("OES_standard_derivatives"),t("OES_element_index_uint"),t("OES_vertex_array_object"),t("ANGLE_instanced_arrays")),t("OES_texture_float_linear"),t("EXT_color_buffer_half_float"),t("WEBGL_multisampled_render_to_texture")},get:function(n){const s=t(n);return s===null&&console.warn("THREE.WebGLRenderer: "+n+" extension not supported."),s}}}function zh(i,e,t,n){const s={},r=new WeakMap;function o(p){const f=p.target;f.index!==null&&e.remove(f.index);for(const g in f.attributes)e.remove(f.attributes[g]);for(const g in f.morphAttributes){const _=f.morphAttributes[g];for(let h=0,u=_.length;h<u;h++)e.remove(_[h])}f.removeEventListener("dispose",o),delete s[f.id];const m=r.get(f);m&&(e.remove(m),r.delete(f)),n.releaseStatesOfGeometry(f),f.isInstancedBufferGeometry===!0&&delete f._maxInstanceCount,t.memory.geometries--}function a(p,f){return s[f.id]===!0||(f.addEventListener("dispose",o),s[f.id]=!0,t.memory.geometries++),f}function l(p){const f=p.attributes;for(const g in f)e.update(f[g],i.ARRAY_BUFFER);const m=p.morphAttributes;for(const g in m){const _=m[g];for(let h=0,u=_.length;h<u;h++)e.update(_[h],i.ARRAY_BUFFER)}}function c(p){const f=[],m=p.index,g=p.attributes.position;let _=0;if(m!==null){const y=m.array;_=m.version;for(let x=0,T=y.length;x<T;x+=3){const L=y[x+0],w=y[x+1],A=y[x+2];f.push(L,w,w,A,A,L)}}else if(g!==void 0){const y=g.array;_=g.version;for(let x=0,T=y.length/3-1;x<T;x+=3){const L=x+0,w=x+1,A=x+2;f.push(L,w,w,A,A,L)}}else return;const h=new(oo(f)?Ro:Ao)(f,1);h.version=_;const u=r.get(p);u&&e.remove(u),r.set(p,h)}function d(p){const f=r.get(p);if(f){const m=p.index;m!==null&&f.version<m.version&&c(p)}else c(p);return r.get(p)}return{get:a,update:l,getWireframeAttribute:d}}function Bh(i,e,t,n){const s=n.isWebGL2;let r;function o(m){r=m}let a,l;function c(m){a=m.type,l=m.bytesPerElement}function d(m,g){i.drawElements(r,g,a,m*l),t.update(g,r,1)}function p(m,g,_){if(_===0)return;let h,u;if(s)h=i,u="drawElementsInstanced";else if(h=e.get("ANGLE_instanced_arrays"),u="drawElementsInstancedANGLE",h===null){console.error("THREE.WebGLIndexedBufferRenderer: using THREE.InstancedBufferGeometry but hardware does not support extension ANGLE_instanced_arrays.");return}h[u](r,g,a,m*l,_),t.update(g,r,_)}function f(m,g,_){if(_===0)return;const h=e.get("WEBGL_multi_draw");if(h===null)for(let u=0;u<_;u++)this.render(m[u]/l,g[u]);else{h.multiDrawElementsWEBGL(r,g,0,a,m,0,_);let u=0;for(let y=0;y<_;y++)u+=g[y];t.update(u,r,1)}}this.setMode=o,this.setIndex=c,this.render=d,this.renderInstances=p,this.renderMultiDraw=f}function kh(i){const e={geometries:0,textures:0},t={frame:0,calls:0,triangles:0,points:0,lines:0};function n(r,o,a){switch(t.calls++,o){case i.TRIANGLES:t.triangles+=a*(r/3);break;case i.LINES:t.lines+=a*(r/2);break;case i.LINE_STRIP:t.lines+=a*(r-1);break;case i.LINE_LOOP:t.lines+=a*r;break;case i.POINTS:t.points+=a*r;break;default:console.error("THREE.WebGLInfo: Unknown draw mode:",o);break}}function s(){t.calls=0,t.triangles=0,t.points=0,t.lines=0}return{memory:e,render:t,programs:null,autoReset:!0,reset:s,update:n}}function Hh(i,e){return i[0]-e[0]}function Gh(i,e){return Math.abs(e[1])-Math.abs(i[1])}function Vh(i,e,t){const n={},s=new Float32Array(8),r=new WeakMap,o=new ht,a=[];for(let c=0;c<8;c++)a[c]=[c,0];function l(c,d,p){const f=c.morphTargetInfluences;if(e.isWebGL2===!0){const m=d.morphAttributes.position||d.morphAttributes.normal||d.morphAttributes.color,g=m!==void 0?m.length:0;let _=r.get(d);if(_===void 0||_.count!==g){let C=function(){$.dispose(),r.delete(d),d.removeEventListener("dispose",C)};_!==void 0&&_.texture.dispose();const y=d.morphAttributes.position!==void 0,x=d.morphAttributes.normal!==void 0,T=d.morphAttributes.color!==void 0,L=d.morphAttributes.position||[],w=d.morphAttributes.normal||[],A=d.morphAttributes.color||[];let X=0;y===!0&&(X=1),x===!0&&(X=2),T===!0&&(X=3);let S=d.attributes.position.count*X,b=1;S>e.maxTextureSize&&(b=Math.ceil(S/e.maxTextureSize),S=e.maxTextureSize);const k=new Float32Array(S*b*4*g),$=new po(k,S,b,g);$.type=En,$.needsUpdate=!0;const ie=X*4;for(let z=0;z<g;z++){const G=L[z],Y=w[z],V=A[z],D=S*b*4*z;for(let W=0;W<G.count;W++){const j=W*ie;y===!0&&(o.fromBufferAttribute(G,W),k[D+j+0]=o.x,k[D+j+1]=o.y,k[D+j+2]=o.z,k[D+j+3]=0),x===!0&&(o.fromBufferAttribute(Y,W),k[D+j+4]=o.x,k[D+j+5]=o.y,k[D+j+6]=o.z,k[D+j+7]=0),T===!0&&(o.fromBufferAttribute(V,W),k[D+j+8]=o.x,k[D+j+9]=o.y,k[D+j+10]=o.z,k[D+j+11]=V.itemSize===4?o.w:1)}}_={count:g,texture:$,size:new qe(S,b)},r.set(d,_),d.addEventListener("dispose",C)}let h=0;for(let y=0;y<f.length;y++)h+=f[y];const u=d.morphTargetsRelative?1:1-h;p.getUniforms().setValue(i,"morphTargetBaseInfluence",u),p.getUniforms().setValue(i,"morphTargetInfluences",f),p.getUniforms().setValue(i,"morphTargetsTexture",_.texture,t),p.getUniforms().setValue(i,"morphTargetsTextureSize",_.size)}else{const m=f===void 0?0:f.length;let g=n[d.id];if(g===void 0||g.length!==m){g=[];for(let x=0;x<m;x++)g[x]=[x,0];n[d.id]=g}for(let x=0;x<m;x++){const T=g[x];T[0]=x,T[1]=f[x]}g.sort(Gh);for(let x=0;x<8;x++)x<m&&g[x][1]?(a[x][0]=g[x][0],a[x][1]=g[x][1]):(a[x][0]=Number.MAX_SAFE_INTEGER,a[x][1]=0);a.sort(Hh);const _=d.morphAttributes.position,h=d.morphAttributes.normal;let u=0;for(let x=0;x<8;x++){const T=a[x],L=T[0],w=T[1];L!==Number.MAX_SAFE_INTEGER&&w?(_&&d.getAttribute("morphTarget"+x)!==_[L]&&d.setAttribute("morphTarget"+x,_[L]),h&&d.getAttribute("morphNormal"+x)!==h[L]&&d.setAttribute("morphNormal"+x,h[L]),s[x]=w,u+=w):(_&&d.hasAttribute("morphTarget"+x)===!0&&d.deleteAttribute("morphTarget"+x),h&&d.hasAttribute("morphNormal"+x)===!0&&d.deleteAttribute("morphNormal"+x),s[x]=0)}const y=d.morphTargetsRelative?1:1-u;p.getUniforms().setValue(i,"morphTargetBaseInfluence",y),p.getUniforms().setValue(i,"morphTargetInfluences",s)}}return{update:l}}function Wh(i,e,t,n){let s=new WeakMap;function r(l){const c=n.render.frame,d=l.geometry,p=e.get(l,d);if(s.get(p)!==c&&(e.update(p),s.set(p,c)),l.isInstancedMesh&&(l.hasEventListener("dispose",a)===!1&&l.addEventListener("dispose",a),s.get(l)!==c&&(t.update(l.instanceMatrix,i.ARRAY_BUFFER),l.instanceColor!==null&&t.update(l.instanceColor,i.ARRAY_BUFFER),s.set(l,c))),l.isSkinnedMesh){const f=l.skeleton;s.get(f)!==c&&(f.update(),s.set(f,c))}return p}function o(){s=new WeakMap}function a(l){const c=l.target;c.removeEventListener("dispose",a),t.remove(c.instanceMatrix),c.instanceColor!==null&&t.remove(c.instanceColor)}return{update:r,dispose:o}}class qo extends yt{constructor(e,t,n,s,r,o,a,l,c,d){if(d=d!==void 0?d:On,d!==On&&d!==ii)throw new Error("DepthTexture format must be either THREE.DepthFormat or THREE.DepthStencilFormat");n===void 0&&d===On&&(n=yn),n===void 0&&d===ii&&(n=Fn),super(null,s,r,o,a,l,d,n,c),this.isDepthTexture=!0,this.image={width:e,height:t},this.magFilter=a!==void 0?a:St,this.minFilter=l!==void 0?l:St,this.flipY=!1,this.generateMipmaps=!1,this.compareFunction=null}copy(e){return super.copy(e),this.compareFunction=e.compareFunction,this}toJSON(e){const t=super.toJSON(e);return this.compareFunction!==null&&(t.compareFunction=this.compareFunction),t}}const jo=new yt,Yo=new qo(1,1);Yo.compareFunction=io;const $o=new po,Ko=new lu,Zo=new Fo,Jo=[],Qo=[],el=new Float32Array(16),tl=new Float32Array(9),nl=new Float32Array(4);function Ti(i,e,t){const n=i[0];if(n<=0||n>0)return i;const s=e*t;let r=Jo[s];if(r===void 0&&(r=new Float32Array(s),Jo[s]=r),e!==0){n.toArray(r,0);for(let o=1,a=0;o!==e;++o)a+=t,i[o].toArray(r,a)}return r}function ct(i,e){if(i.length!==e.length)return!1;for(let t=0,n=i.length;t<n;t++)if(i[t]!==e[t])return!1;return!0}function ut(i,e){for(let t=0,n=e.length;t<n;t++)i[t]=e[t]}function Ls(i,e){let t=Qo[e];t===void 0&&(t=new Int32Array(e),Qo[e]=t);for(let n=0;n!==e;++n)t[n]=i.allocateTextureUnit();return t}function Xh(i,e){const t=this.cache;t[0]!==e&&(i.uniform1f(this.addr,e),t[0]=e)}function qh(i,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(i.uniform2f(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(ct(t,e))return;i.uniform2fv(this.addr,e),ut(t,e)}}function jh(i,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(i.uniform3f(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else if(e.r!==void 0)(t[0]!==e.r||t[1]!==e.g||t[2]!==e.b)&&(i.uniform3f(this.addr,e.r,e.g,e.b),t[0]=e.r,t[1]=e.g,t[2]=e.b);else{if(ct(t,e))return;i.uniform3fv(this.addr,e),ut(t,e)}}function Yh(i,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(i.uniform4f(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(ct(t,e))return;i.uniform4fv(this.addr,e),ut(t,e)}}function $h(i,e){const t=this.cache,n=e.elements;if(n===void 0){if(ct(t,e))return;i.uniformMatrix2fv(this.addr,!1,e),ut(t,e)}else{if(ct(t,n))return;nl.set(n),i.uniformMatrix2fv(this.addr,!1,nl),ut(t,n)}}function Kh(i,e){const t=this.cache,n=e.elements;if(n===void 0){if(ct(t,e))return;i.uniformMatrix3fv(this.addr,!1,e),ut(t,e)}else{if(ct(t,n))return;tl.set(n),i.uniformMatrix3fv(this.addr,!1,tl),ut(t,n)}}function Zh(i,e){const t=this.cache,n=e.elements;if(n===void 0){if(ct(t,e))return;i.uniformMatrix4fv(this.addr,!1,e),ut(t,e)}else{if(ct(t,n))return;el.set(n),i.uniformMatrix4fv(this.addr,!1,el),ut(t,n)}}function Jh(i,e){const t=this.cache;t[0]!==e&&(i.uniform1i(this.addr,e),t[0]=e)}function Qh(i,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(i.uniform2i(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(ct(t,e))return;i.uniform2iv(this.addr,e),ut(t,e)}}function ef(i,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(i.uniform3i(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else{if(ct(t,e))return;i.uniform3iv(this.addr,e),ut(t,e)}}function tf(i,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(i.uniform4i(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(ct(t,e))return;i.uniform4iv(this.addr,e),ut(t,e)}}function nf(i,e){const t=this.cache;t[0]!==e&&(i.uniform1ui(this.addr,e),t[0]=e)}function sf(i,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(i.uniform2ui(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(ct(t,e))return;i.uniform2uiv(this.addr,e),ut(t,e)}}function rf(i,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(i.uniform3ui(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else{if(ct(t,e))return;i.uniform3uiv(this.addr,e),ut(t,e)}}function af(i,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(i.uniform4ui(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(ct(t,e))return;i.uniform4uiv(this.addr,e),ut(t,e)}}function of(i,e,t){const n=this.cache,s=t.allocateTextureUnit();n[0]!==s&&(i.uniform1i(this.addr,s),n[0]=s);const r=this.type===i.SAMPLER_2D_SHADOW?Yo:jo;t.setTexture2D(e||r,s)}function lf(i,e,t){const n=this.cache,s=t.allocateTextureUnit();n[0]!==s&&(i.uniform1i(this.addr,s),n[0]=s),t.setTexture3D(e||Ko,s)}function cf(i,e,t){const n=this.cache,s=t.allocateTextureUnit();n[0]!==s&&(i.uniform1i(this.addr,s),n[0]=s),t.setTextureCube(e||Zo,s)}function uf(i,e,t){const n=this.cache,s=t.allocateTextureUnit();n[0]!==s&&(i.uniform1i(this.addr,s),n[0]=s),t.setTexture2DArray(e||$o,s)}function df(i){switch(i){case 5126:return Xh;case 35664:return qh;case 35665:return jh;case 35666:return Yh;case 35674:return $h;case 35675:return Kh;case 35676:return Zh;case 5124:case 35670:return Jh;case 35667:case 35671:return Qh;case 35668:case 35672:return ef;case 35669:case 35673:return tf;case 5125:return nf;case 36294:return sf;case 36295:return rf;case 36296:return af;case 35678:case 36198:case 36298:case 36306:case 35682:return of;case 35679:case 36299:case 36307:return lf;case 35680:case 36300:case 36308:case 36293:return cf;case 36289:case 36303:case 36311:case 36292:return uf}}function hf(i,e){i.uniform1fv(this.addr,e)}function ff(i,e){const t=Ti(e,this.size,2);i.uniform2fv(this.addr,t)}function pf(i,e){const t=Ti(e,this.size,3);i.uniform3fv(this.addr,t)}function mf(i,e){const t=Ti(e,this.size,4);i.uniform4fv(this.addr,t)}function gf(i,e){const t=Ti(e,this.size,4);i.uniformMatrix2fv(this.addr,!1,t)}function _f(i,e){const t=Ti(e,this.size,9);i.uniformMatrix3fv(this.addr,!1,t)}function xf(i,e){const t=Ti(e,this.size,16);i.uniformMatrix4fv(this.addr,!1,t)}function vf(i,e){i.uniform1iv(this.addr,e)}function Mf(i,e){i.uniform2iv(this.addr,e)}function Sf(i,e){i.uniform3iv(this.addr,e)}function yf(i,e){i.uniform4iv(this.addr,e)}function Ef(i,e){i.uniform1uiv(this.addr,e)}function bf(i,e){i.uniform2uiv(this.addr,e)}function Tf(i,e){i.uniform3uiv(this.addr,e)}function wf(i,e){i.uniform4uiv(this.addr,e)}function Af(i,e,t){const n=this.cache,s=e.length,r=Ls(t,s);ct(n,r)||(i.uniform1iv(this.addr,r),ut(n,r));for(let o=0;o!==s;++o)t.setTexture2D(e[o]||jo,r[o])}function Rf(i,e,t){const n=this.cache,s=e.length,r=Ls(t,s);ct(n,r)||(i.uniform1iv(this.addr,r),ut(n,r));for(let o=0;o!==s;++o)t.setTexture3D(e[o]||Ko,r[o])}function Cf(i,e,t){const n=this.cache,s=e.length,r=Ls(t,s);ct(n,r)||(i.uniform1iv(this.addr,r),ut(n,r));for(let o=0;o!==s;++o)t.setTextureCube(e[o]||Zo,r[o])}function Lf(i,e,t){const n=this.cache,s=e.length,r=Ls(t,s);ct(n,r)||(i.uniform1iv(this.addr,r),ut(n,r));for(let o=0;o!==s;++o)t.setTexture2DArray(e[o]||$o,r[o])}function Pf(i){switch(i){case 5126:return hf;case 35664:return ff;case 35665:return pf;case 35666:return mf;case 35674:return gf;case 35675:return _f;case 35676:return xf;case 5124:case 35670:return vf;case 35667:case 35671:return Mf;case 35668:case 35672:return Sf;case 35669:case 35673:return yf;case 5125:return Ef;case 36294:return bf;case 36295:return Tf;case 36296:return wf;case 35678:case 36198:case 36298:case 36306:case 35682:return Af;case 35679:case 36299:case 36307:return Rf;case 35680:case 36300:case 36308:case 36293:return Cf;case 36289:case 36303:case 36311:case 36292:return Lf}}class Df{constructor(e,t,n){this.id=e,this.addr=n,this.cache=[],this.type=t.type,this.setValue=df(t.type)}}class Uf{constructor(e,t,n){this.id=e,this.addr=n,this.cache=[],this.type=t.type,this.size=t.size,this.setValue=Pf(t.type)}}class If{constructor(e){this.id=e,this.seq=[],this.map={}}setValue(e,t,n){const s=this.seq;for(let r=0,o=s.length;r!==o;++r){const a=s[r];a.setValue(e,t[a.id],n)}}}const Or=/(\w+)(\])?(\[|\.)?/g;function il(i,e){i.seq.push(e),i.map[e.id]=e}function Nf(i,e,t){const n=i.name,s=n.length;for(Or.lastIndex=0;;){const r=Or.exec(n),o=Or.lastIndex;let a=r[1];const l=r[2]==="]",c=r[3];if(l&&(a=a|0),c===void 0||c==="["&&o+2===s){il(t,c===void 0?new Df(a,i,e):new Uf(a,i,e));break}else{let p=t.map[a];p===void 0&&(p=new If(a),il(t,p)),t=p}}}class Ps{constructor(e,t){this.seq=[],this.map={};const n=e.getProgramParameter(t,e.ACTIVE_UNIFORMS);for(let s=0;s<n;++s){const r=e.getActiveUniform(t,s),o=e.getUniformLocation(t,r.name);Nf(r,o,this)}}setValue(e,t,n,s){const r=this.map[t];r!==void 0&&r.setValue(e,n,s)}setOptional(e,t,n){const s=t[n];s!==void 0&&this.setValue(e,n,s)}static upload(e,t,n,s){for(let r=0,o=t.length;r!==o;++r){const a=t[r],l=n[a.id];l.needsUpdate!==!1&&a.setValue(e,l.value,s)}}static seqWithValue(e,t){const n=[];for(let s=0,r=e.length;s!==r;++s){const o=e[s];o.id in t&&n.push(o)}return n}}function sl(i,e,t){const n=i.createShader(e);return i.shaderSource(n,t),i.compileShader(n),n}const Ff=37297;let Of=0;function zf(i,e){const t=i.split(`
`),n=[],s=Math.max(e-6,0),r=Math.min(e+6,t.length);for(let o=s;o<r;o++){const a=o+1;n.push(`${a===e?">":" "} ${a}: ${t[o]}`)}return n.join(`
`)}function Bf(i){const e=Ye.getPrimaries(Ye.workingColorSpace),t=Ye.getPrimaries(i);let n;switch(e===t?n="":e===is&&t===ns?n="LinearDisplayP3ToLinearSRGB":e===ns&&t===is&&(n="LinearSRGBToLinearDisplayP3"),i){case sn:case es:return[n,"LinearTransferOETF"];case dt:case lr:return[n,"sRGBTransferOETF"];default:return console.warn("THREE.WebGLProgram: Unsupported color space:",i),[n,"LinearTransferOETF"]}}function rl(i,e,t){const n=i.getShaderParameter(e,i.COMPILE_STATUS),s=i.getShaderInfoLog(e).trim();if(n&&s==="")return"";const r=/ERROR: 0:(\d+)/.exec(s);if(r){const o=parseInt(r[1]);return t.toUpperCase()+`

`+s+`

`+zf(i.getShaderSource(e),o)}else return s}function kf(i,e){const t=Bf(e);return`vec4 ${i}( vec4 value ) { return ${t[0]}( ${t[1]}( value ) ); }`}function Hf(i,e){let t;switch(e){case Pc:t="Linear";break;case Dc:t="Reinhard";break;case Uc:t="OptimizedCineon";break;case Ic:t="ACESFilmic";break;case Fc:t="AgX";break;case Nc:t="Custom";break;default:console.warn("THREE.WebGLProgram: Unsupported toneMapping:",e),t="Linear"}return"vec3 "+i+"( vec3 color ) { return "+t+"ToneMapping( color ); }"}function Gf(i){return[i.extensionDerivatives||i.envMapCubeUVHeight||i.bumpMap||i.normalMapTangentSpace||i.clearcoatNormalMap||i.flatShading||i.shaderID==="physical"?"#extension GL_OES_standard_derivatives : enable":"",(i.extensionFragDepth||i.logarithmicDepthBuffer)&&i.rendererExtensionFragDepth?"#extension GL_EXT_frag_depth : enable":"",i.extensionDrawBuffers&&i.rendererExtensionDrawBuffers?"#extension GL_EXT_draw_buffers : require":"",(i.extensionShaderTextureLOD||i.envMap||i.transmission)&&i.rendererExtensionShaderTextureLod?"#extension GL_EXT_shader_texture_lod : enable":""].filter(wi).join(`
`)}function Vf(i){return[i.extensionClipCullDistance?"#extension GL_ANGLE_clip_cull_distance : require":""].filter(wi).join(`
`)}function Wf(i){const e=[];for(const t in i){const n=i[t];n!==!1&&e.push("#define "+t+" "+n)}return e.join(`
`)}function Xf(i,e){const t={},n=i.getProgramParameter(e,i.ACTIVE_ATTRIBUTES);for(let s=0;s<n;s++){const r=i.getActiveAttrib(e,s),o=r.name;let a=1;r.type===i.FLOAT_MAT2&&(a=2),r.type===i.FLOAT_MAT3&&(a=3),r.type===i.FLOAT_MAT4&&(a=4),t[o]={type:r.type,location:i.getAttribLocation(e,o),locationSize:a}}return t}function wi(i){return i!==""}function al(i,e){const t=e.numSpotLightShadows+e.numSpotLightMaps-e.numSpotLightShadowsWithMaps;return i.replace(/NUM_DIR_LIGHTS/g,e.numDirLights).replace(/NUM_SPOT_LIGHTS/g,e.numSpotLights).replace(/NUM_SPOT_LIGHT_MAPS/g,e.numSpotLightMaps).replace(/NUM_SPOT_LIGHT_COORDS/g,t).replace(/NUM_RECT_AREA_LIGHTS/g,e.numRectAreaLights).replace(/NUM_POINT_LIGHTS/g,e.numPointLights).replace(/NUM_HEMI_LIGHTS/g,e.numHemiLights).replace(/NUM_DIR_LIGHT_SHADOWS/g,e.numDirLightShadows).replace(/NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS/g,e.numSpotLightShadowsWithMaps).replace(/NUM_SPOT_LIGHT_SHADOWS/g,e.numSpotLightShadows).replace(/NUM_POINT_LIGHT_SHADOWS/g,e.numPointLightShadows)}function ol(i,e){return i.replace(/NUM_CLIPPING_PLANES/g,e.numClippingPlanes).replace(/UNION_CLIPPING_PLANES/g,e.numClippingPlanes-e.numClipIntersection)}const qf=/^[ \t]*#include +<([\w\d./]+)>/gm;function zr(i){return i.replace(qf,Yf)}const jf=new Map([["encodings_fragment","colorspace_fragment"],["encodings_pars_fragment","colorspace_pars_fragment"],["output_fragment","opaque_fragment"]]);function Yf(i,e){let t=Ie[e];if(t===void 0){const n=jf.get(e);if(n!==void 0)t=Ie[n],console.warn('THREE.WebGLRenderer: Shader chunk "%s" has been deprecated. Use "%s" instead.',e,n);else throw new Error("Can not resolve #include <"+e+">")}return zr(t)}const $f=/#pragma unroll_loop_start\s+for\s*\(\s*int\s+i\s*=\s*(\d+)\s*;\s*i\s*<\s*(\d+)\s*;\s*i\s*\+\+\s*\)\s*{([\s\S]+?)}\s+#pragma unroll_loop_end/g;function ll(i){return i.replace($f,Kf)}function Kf(i,e,t,n){let s="";for(let r=parseInt(e);r<parseInt(t);r++)s+=n.replace(/\[\s*i\s*\]/g,"[ "+r+" ]").replace(/UNROLLED_LOOP_INDEX/g,r);return s}function cl(i){let e="precision "+i.precision+` float;
precision `+i.precision+" int;";return i.precision==="highp"?e+=`
#define HIGH_PRECISION`:i.precision==="mediump"?e+=`
#define MEDIUM_PRECISION`:i.precision==="lowp"&&(e+=`
#define LOW_PRECISION`),e}function Zf(i){let e="SHADOWMAP_TYPE_BASIC";return i.shadowMapType===ha?e="SHADOWMAP_TYPE_PCF":i.shadowMapType===fa?e="SHADOWMAP_TYPE_PCF_SOFT":i.shadowMapType===tn&&(e="SHADOWMAP_TYPE_VSM"),e}function Jf(i){let e="ENVMAP_TYPE_CUBE";if(i.envMap)switch(i.envMapMode){case ti:case ni:e="ENVMAP_TYPE_CUBE";break;case Ji:e="ENVMAP_TYPE_CUBE_UV";break}return e}function Qf(i){let e="ENVMAP_MODE_REFLECTION";if(i.envMap)switch(i.envMapMode){case ni:e="ENVMAP_MODE_REFRACTION";break}return e}function ep(i){let e="ENVMAP_BLENDING_NONE";if(i.envMap)switch(i.combine){case va:e="ENVMAP_BLENDING_MULTIPLY";break;case Cc:e="ENVMAP_BLENDING_MIX";break;case Lc:e="ENVMAP_BLENDING_ADD";break}return e}function tp(i){const e=i.envMapCubeUVHeight;if(e===null)return null;const t=Math.log2(e)-2,n=1/e;return{texelWidth:1/(3*Math.max(Math.pow(2,t),7*16)),texelHeight:n,maxMip:t}}function np(i,e,t,n){const s=i.getContext(),r=t.defines;let o=t.vertexShader,a=t.fragmentShader;const l=Zf(t),c=Jf(t),d=Qf(t),p=ep(t),f=tp(t),m=t.isWebGL2?"":Gf(t),g=Vf(t),_=Wf(r),h=s.createProgram();let u,y,x=t.glslVersion?"#version "+t.glslVersion+`
`:"";t.isRawShaderMaterial?(u=["#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,_].filter(wi).join(`
`),u.length>0&&(u+=`
`),y=[m,"#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,_].filter(wi).join(`
`),y.length>0&&(y+=`
`)):(u=[cl(t),"#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,_,t.extensionClipCullDistance?"#define USE_CLIP_DISTANCE":"",t.batching?"#define USE_BATCHING":"",t.instancing?"#define USE_INSTANCING":"",t.instancingColor?"#define USE_INSTANCING_COLOR":"",t.useFog&&t.fog?"#define USE_FOG":"",t.useFog&&t.fogExp2?"#define FOG_EXP2":"",t.map?"#define USE_MAP":"",t.envMap?"#define USE_ENVMAP":"",t.envMap?"#define "+d:"",t.lightMap?"#define USE_LIGHTMAP":"",t.aoMap?"#define USE_AOMAP":"",t.bumpMap?"#define USE_BUMPMAP":"",t.normalMap?"#define USE_NORMALMAP":"",t.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",t.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",t.displacementMap?"#define USE_DISPLACEMENTMAP":"",t.emissiveMap?"#define USE_EMISSIVEMAP":"",t.anisotropy?"#define USE_ANISOTROPY":"",t.anisotropyMap?"#define USE_ANISOTROPYMAP":"",t.clearcoatMap?"#define USE_CLEARCOATMAP":"",t.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",t.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",t.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",t.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",t.specularMap?"#define USE_SPECULARMAP":"",t.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",t.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",t.roughnessMap?"#define USE_ROUGHNESSMAP":"",t.metalnessMap?"#define USE_METALNESSMAP":"",t.alphaMap?"#define USE_ALPHAMAP":"",t.alphaHash?"#define USE_ALPHAHASH":"",t.transmission?"#define USE_TRANSMISSION":"",t.transmissionMap?"#define USE_TRANSMISSIONMAP":"",t.thicknessMap?"#define USE_THICKNESSMAP":"",t.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",t.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",t.mapUv?"#define MAP_UV "+t.mapUv:"",t.alphaMapUv?"#define ALPHAMAP_UV "+t.alphaMapUv:"",t.lightMapUv?"#define LIGHTMAP_UV "+t.lightMapUv:"",t.aoMapUv?"#define AOMAP_UV "+t.aoMapUv:"",t.emissiveMapUv?"#define EMISSIVEMAP_UV "+t.emissiveMapUv:"",t.bumpMapUv?"#define BUMPMAP_UV "+t.bumpMapUv:"",t.normalMapUv?"#define NORMALMAP_UV "+t.normalMapUv:"",t.displacementMapUv?"#define DISPLACEMENTMAP_UV "+t.displacementMapUv:"",t.metalnessMapUv?"#define METALNESSMAP_UV "+t.metalnessMapUv:"",t.roughnessMapUv?"#define ROUGHNESSMAP_UV "+t.roughnessMapUv:"",t.anisotropyMapUv?"#define ANISOTROPYMAP_UV "+t.anisotropyMapUv:"",t.clearcoatMapUv?"#define CLEARCOATMAP_UV "+t.clearcoatMapUv:"",t.clearcoatNormalMapUv?"#define CLEARCOAT_NORMALMAP_UV "+t.clearcoatNormalMapUv:"",t.clearcoatRoughnessMapUv?"#define CLEARCOAT_ROUGHNESSMAP_UV "+t.clearcoatRoughnessMapUv:"",t.iridescenceMapUv?"#define IRIDESCENCEMAP_UV "+t.iridescenceMapUv:"",t.iridescenceThicknessMapUv?"#define IRIDESCENCE_THICKNESSMAP_UV "+t.iridescenceThicknessMapUv:"",t.sheenColorMapUv?"#define SHEEN_COLORMAP_UV "+t.sheenColorMapUv:"",t.sheenRoughnessMapUv?"#define SHEEN_ROUGHNESSMAP_UV "+t.sheenRoughnessMapUv:"",t.specularMapUv?"#define SPECULARMAP_UV "+t.specularMapUv:"",t.specularColorMapUv?"#define SPECULAR_COLORMAP_UV "+t.specularColorMapUv:"",t.specularIntensityMapUv?"#define SPECULAR_INTENSITYMAP_UV "+t.specularIntensityMapUv:"",t.transmissionMapUv?"#define TRANSMISSIONMAP_UV "+t.transmissionMapUv:"",t.thicknessMapUv?"#define THICKNESSMAP_UV "+t.thicknessMapUv:"",t.vertexTangents&&t.flatShading===!1?"#define USE_TANGENT":"",t.vertexColors?"#define USE_COLOR":"",t.vertexAlphas?"#define USE_COLOR_ALPHA":"",t.vertexUv1s?"#define USE_UV1":"",t.vertexUv2s?"#define USE_UV2":"",t.vertexUv3s?"#define USE_UV3":"",t.pointsUvs?"#define USE_POINTS_UV":"",t.flatShading?"#define FLAT_SHADED":"",t.skinning?"#define USE_SKINNING":"",t.morphTargets?"#define USE_MORPHTARGETS":"",t.morphNormals&&t.flatShading===!1?"#define USE_MORPHNORMALS":"",t.morphColors&&t.isWebGL2?"#define USE_MORPHCOLORS":"",t.morphTargetsCount>0&&t.isWebGL2?"#define MORPHTARGETS_TEXTURE":"",t.morphTargetsCount>0&&t.isWebGL2?"#define MORPHTARGETS_TEXTURE_STRIDE "+t.morphTextureStride:"",t.morphTargetsCount>0&&t.isWebGL2?"#define MORPHTARGETS_COUNT "+t.morphTargetsCount:"",t.doubleSided?"#define DOUBLE_SIDED":"",t.flipSided?"#define FLIP_SIDED":"",t.shadowMapEnabled?"#define USE_SHADOWMAP":"",t.shadowMapEnabled?"#define "+l:"",t.sizeAttenuation?"#define USE_SIZEATTENUATION":"",t.numLightProbes>0?"#define USE_LIGHT_PROBES":"",t.useLegacyLights?"#define LEGACY_LIGHTS":"",t.logarithmicDepthBuffer?"#define USE_LOGDEPTHBUF":"",t.logarithmicDepthBuffer&&t.rendererExtensionFragDepth?"#define USE_LOGDEPTHBUF_EXT":"","uniform mat4 modelMatrix;","uniform mat4 modelViewMatrix;","uniform mat4 projectionMatrix;","uniform mat4 viewMatrix;","uniform mat3 normalMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;","#ifdef USE_INSTANCING","	attribute mat4 instanceMatrix;","#endif","#ifdef USE_INSTANCING_COLOR","	attribute vec3 instanceColor;","#endif","attribute vec3 position;","attribute vec3 normal;","attribute vec2 uv;","#ifdef USE_UV1","	attribute vec2 uv1;","#endif","#ifdef USE_UV2","	attribute vec2 uv2;","#endif","#ifdef USE_UV3","	attribute vec2 uv3;","#endif","#ifdef USE_TANGENT","	attribute vec4 tangent;","#endif","#if defined( USE_COLOR_ALPHA )","	attribute vec4 color;","#elif defined( USE_COLOR )","	attribute vec3 color;","#endif","#if ( defined( USE_MORPHTARGETS ) && ! defined( MORPHTARGETS_TEXTURE ) )","	attribute vec3 morphTarget0;","	attribute vec3 morphTarget1;","	attribute vec3 morphTarget2;","	attribute vec3 morphTarget3;","	#ifdef USE_MORPHNORMALS","		attribute vec3 morphNormal0;","		attribute vec3 morphNormal1;","		attribute vec3 morphNormal2;","		attribute vec3 morphNormal3;","	#else","		attribute vec3 morphTarget4;","		attribute vec3 morphTarget5;","		attribute vec3 morphTarget6;","		attribute vec3 morphTarget7;","	#endif","#endif","#ifdef USE_SKINNING","	attribute vec4 skinIndex;","	attribute vec4 skinWeight;","#endif",`
`].filter(wi).join(`
`),y=[m,cl(t),"#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,_,t.useFog&&t.fog?"#define USE_FOG":"",t.useFog&&t.fogExp2?"#define FOG_EXP2":"",t.map?"#define USE_MAP":"",t.matcap?"#define USE_MATCAP":"",t.envMap?"#define USE_ENVMAP":"",t.envMap?"#define "+c:"",t.envMap?"#define "+d:"",t.envMap?"#define "+p:"",f?"#define CUBEUV_TEXEL_WIDTH "+f.texelWidth:"",f?"#define CUBEUV_TEXEL_HEIGHT "+f.texelHeight:"",f?"#define CUBEUV_MAX_MIP "+f.maxMip+".0":"",t.lightMap?"#define USE_LIGHTMAP":"",t.aoMap?"#define USE_AOMAP":"",t.bumpMap?"#define USE_BUMPMAP":"",t.normalMap?"#define USE_NORMALMAP":"",t.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",t.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",t.emissiveMap?"#define USE_EMISSIVEMAP":"",t.anisotropy?"#define USE_ANISOTROPY":"",t.anisotropyMap?"#define USE_ANISOTROPYMAP":"",t.clearcoat?"#define USE_CLEARCOAT":"",t.clearcoatMap?"#define USE_CLEARCOATMAP":"",t.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",t.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",t.iridescence?"#define USE_IRIDESCENCE":"",t.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",t.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",t.specularMap?"#define USE_SPECULARMAP":"",t.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",t.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",t.roughnessMap?"#define USE_ROUGHNESSMAP":"",t.metalnessMap?"#define USE_METALNESSMAP":"",t.alphaMap?"#define USE_ALPHAMAP":"",t.alphaTest?"#define USE_ALPHATEST":"",t.alphaHash?"#define USE_ALPHAHASH":"",t.sheen?"#define USE_SHEEN":"",t.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",t.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",t.transmission?"#define USE_TRANSMISSION":"",t.transmissionMap?"#define USE_TRANSMISSIONMAP":"",t.thicknessMap?"#define USE_THICKNESSMAP":"",t.vertexTangents&&t.flatShading===!1?"#define USE_TANGENT":"",t.vertexColors||t.instancingColor?"#define USE_COLOR":"",t.vertexAlphas?"#define USE_COLOR_ALPHA":"",t.vertexUv1s?"#define USE_UV1":"",t.vertexUv2s?"#define USE_UV2":"",t.vertexUv3s?"#define USE_UV3":"",t.pointsUvs?"#define USE_POINTS_UV":"",t.gradientMap?"#define USE_GRADIENTMAP":"",t.flatShading?"#define FLAT_SHADED":"",t.doubleSided?"#define DOUBLE_SIDED":"",t.flipSided?"#define FLIP_SIDED":"",t.shadowMapEnabled?"#define USE_SHADOWMAP":"",t.shadowMapEnabled?"#define "+l:"",t.premultipliedAlpha?"#define PREMULTIPLIED_ALPHA":"",t.numLightProbes>0?"#define USE_LIGHT_PROBES":"",t.useLegacyLights?"#define LEGACY_LIGHTS":"",t.decodeVideoTexture?"#define DECODE_VIDEO_TEXTURE":"",t.logarithmicDepthBuffer?"#define USE_LOGDEPTHBUF":"",t.logarithmicDepthBuffer&&t.rendererExtensionFragDepth?"#define USE_LOGDEPTHBUF_EXT":"","uniform mat4 viewMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;",t.toneMapping!==Mn?"#define TONE_MAPPING":"",t.toneMapping!==Mn?Ie.tonemapping_pars_fragment:"",t.toneMapping!==Mn?Hf("toneMapping",t.toneMapping):"",t.dithering?"#define DITHERING":"",t.opaque?"#define OPAQUE":"",Ie.colorspace_pars_fragment,kf("linearToOutputTexel",t.outputColorSpace),t.useDepthPacking?"#define DEPTH_PACKING "+t.depthPacking:"",`
`].filter(wi).join(`
`)),o=zr(o),o=al(o,t),o=ol(o,t),a=zr(a),a=al(a,t),a=ol(a,t),o=ll(o),a=ll(a),t.isWebGL2&&t.isRawShaderMaterial!==!0&&(x=`#version 300 es
`,u=[g,"precision mediump sampler2DArray;","#define attribute in","#define varying out","#define texture2D texture"].join(`
`)+`
`+u,y=["precision mediump sampler2DArray;","#define varying in",t.glslVersion===ro?"":"layout(location = 0) out highp vec4 pc_fragColor;",t.glslVersion===ro?"":"#define gl_FragColor pc_fragColor","#define gl_FragDepthEXT gl_FragDepth","#define texture2D texture","#define textureCube texture","#define texture2DProj textureProj","#define texture2DLodEXT textureLod","#define texture2DProjLodEXT textureProjLod","#define textureCubeLodEXT textureLod","#define texture2DGradEXT textureGrad","#define texture2DProjGradEXT textureProjGrad","#define textureCubeGradEXT textureGrad"].join(`
`)+`
`+y);const T=x+u+o,L=x+y+a,w=sl(s,s.VERTEX_SHADER,T),A=sl(s,s.FRAGMENT_SHADER,L);s.attachShader(h,w),s.attachShader(h,A),t.index0AttributeName!==void 0?s.bindAttribLocation(h,0,t.index0AttributeName):t.morphTargets===!0&&s.bindAttribLocation(h,0,"position"),s.linkProgram(h);function X($){if(i.debug.checkShaderErrors){const ie=s.getProgramInfoLog(h).trim(),C=s.getShaderInfoLog(w).trim(),z=s.getShaderInfoLog(A).trim();let G=!0,Y=!0;if(s.getProgramParameter(h,s.LINK_STATUS)===!1)if(G=!1,typeof i.debug.onShaderError=="function")i.debug.onShaderError(s,h,w,A);else{const V=rl(s,w,"vertex"),D=rl(s,A,"fragment");console.error("THREE.WebGLProgram: Shader Error "+s.getError()+" - VALIDATE_STATUS "+s.getProgramParameter(h,s.VALIDATE_STATUS)+`

Program Info Log: `+ie+`
`+V+`
`+D)}else ie!==""?console.warn("THREE.WebGLProgram: Program Info Log:",ie):(C===""||z==="")&&(Y=!1);Y&&($.diagnostics={runnable:G,programLog:ie,vertexShader:{log:C,prefix:u},fragmentShader:{log:z,prefix:y}})}s.deleteShader(w),s.deleteShader(A),S=new Ps(s,h),b=Xf(s,h)}let S;this.getUniforms=function(){return S===void 0&&X(this),S};let b;this.getAttributes=function(){return b===void 0&&X(this),b};let k=t.rendererExtensionParallelShaderCompile===!1;return this.isReady=function(){return k===!1&&(k=s.getProgramParameter(h,Ff)),k},this.destroy=function(){n.releaseStatesOfProgram(this),s.deleteProgram(h),this.program=void 0},this.type=t.shaderType,this.name=t.shaderName,this.id=Of++,this.cacheKey=e,this.usedTimes=1,this.program=h,this.vertexShader=w,this.fragmentShader=A,this}let ip=0;class sp{constructor(){this.shaderCache=new Map,this.materialCache=new Map}update(e){const t=e.vertexShader,n=e.fragmentShader,s=this._getShaderStage(t),r=this._getShaderStage(n),o=this._getShaderCacheForMaterial(e);return o.has(s)===!1&&(o.add(s),s.usedTimes++),o.has(r)===!1&&(o.add(r),r.usedTimes++),this}remove(e){const t=this.materialCache.get(e);for(const n of t)n.usedTimes--,n.usedTimes===0&&this.shaderCache.delete(n.code);return this.materialCache.delete(e),this}getVertexShaderID(e){return this._getShaderStage(e.vertexShader).id}getFragmentShaderID(e){return this._getShaderStage(e.fragmentShader).id}dispose(){this.shaderCache.clear(),this.materialCache.clear()}_getShaderCacheForMaterial(e){const t=this.materialCache;let n=t.get(e);return n===void 0&&(n=new Set,t.set(e,n)),n}_getShaderStage(e){const t=this.shaderCache;let n=t.get(e);return n===void 0&&(n=new rp(e),t.set(e,n)),n}}class rp{constructor(e){this.id=ip++,this.code=e,this.usedTimes=0}}function ap(i,e,t,n,s,r,o){const a=new vo,l=new sp,c=[],d=s.isWebGL2,p=s.logarithmicDepthBuffer,f=s.vertexTextures;let m=s.precision;const g={MeshDepthMaterial:"depth",MeshDistanceMaterial:"distanceRGBA",MeshNormalMaterial:"normal",MeshBasicMaterial:"basic",MeshLambertMaterial:"lambert",MeshPhongMaterial:"phong",MeshToonMaterial:"toon",MeshStandardMaterial:"physical",MeshPhysicalMaterial:"physical",MeshMatcapMaterial:"matcap",LineBasicMaterial:"basic",LineDashedMaterial:"dashed",PointsMaterial:"points",ShadowMaterial:"shadow",SpriteMaterial:"sprite"};function _(S){return S===0?"uv":`uv${S}`}function h(S,b,k,$,ie){const C=$.fog,z=ie.geometry,G=S.isMeshStandardMaterial?$.environment:null,Y=(S.isMeshStandardMaterial?t:e).get(S.envMap||G),V=Y&&Y.mapping===Ji?Y.image.height:null,D=g[S.type];S.precision!==null&&(m=s.getMaxPrecision(S.precision),m!==S.precision&&console.warn("THREE.WebGLProgram.getParameters:",S.precision,"not supported, using",m,"instead."));const W=z.morphAttributes.position||z.morphAttributes.normal||z.morphAttributes.color,j=W!==void 0?W.length:0;let ae=0;z.morphAttributes.position!==void 0&&(ae=1),z.morphAttributes.normal!==void 0&&(ae=2),z.morphAttributes.color!==void 0&&(ae=3);let H,q,le,fe;if(D){const wt=Qt[D];H=wt.vertexShader,q=wt.fragmentShader}else H=S.vertexShader,q=S.fragmentShader,l.update(S),le=l.getVertexShaderID(S),fe=l.getFragmentShaderID(S);const ge=i.getRenderTarget(),De=ie.isInstancedMesh===!0,Ne=ie.isBatchedMesh===!0,be=!!S.map,Xe=!!S.matcap,I=!!Y,Tt=!!S.aoMap,ve=!!S.lightMap,Ce=!!S.bumpMap,he=!!S.normalMap,tt=!!S.displacementMap,Oe=!!S.emissiveMap,E=!!S.metalnessMap,v=!!S.roughnessMap,F=S.anisotropy>0,J=S.clearcoat>0,Z=S.iridescence>0,Q=S.sheen>0,pe=S.transmission>0,oe=F&&!!S.anisotropyMap,ue=J&&!!S.clearcoatMap,Ee=J&&!!S.clearcoatNormalMap,ze=J&&!!S.clearcoatRoughnessMap,K=Z&&!!S.iridescenceMap,$e=Z&&!!S.iridescenceThicknessMap,Ve=Q&&!!S.sheenColorMap,Ae=Q&&!!S.sheenRoughnessMap,xe=!!S.specularMap,de=!!S.specularColorMap,Fe=!!S.specularIntensityMap,je=pe&&!!S.transmissionMap,it=pe&&!!S.thicknessMap,He=!!S.gradientMap,ne=!!S.alphaMap,R=S.alphaTest>0,se=!!S.alphaHash,re=!!S.extensions,Te=!!z.attributes.uv1,Me=!!z.attributes.uv2,Ke=!!z.attributes.uv3;let Ze=Mn;return S.toneMapped&&(ge===null||ge.isXRRenderTarget===!0)&&(Ze=i.toneMapping),{isWebGL2:d,shaderID:D,shaderType:S.type,shaderName:S.name,vertexShader:H,fragmentShader:q,defines:S.defines,customVertexShaderID:le,customFragmentShaderID:fe,isRawShaderMaterial:S.isRawShaderMaterial===!0,glslVersion:S.glslVersion,precision:m,batching:Ne,instancing:De,instancingColor:De&&ie.instanceColor!==null,supportsVertexTextures:f,outputColorSpace:ge===null?i.outputColorSpace:ge.isXRRenderTarget===!0?ge.texture.colorSpace:sn,map:be,matcap:Xe,envMap:I,envMapMode:I&&Y.mapping,envMapCubeUVHeight:V,aoMap:Tt,lightMap:ve,bumpMap:Ce,normalMap:he,displacementMap:f&&tt,emissiveMap:Oe,normalMapObjectSpace:he&&S.normalMapType===Yc,normalMapTangentSpace:he&&S.normalMapType===to,metalnessMap:E,roughnessMap:v,anisotropy:F,anisotropyMap:oe,clearcoat:J,clearcoatMap:ue,clearcoatNormalMap:Ee,clearcoatRoughnessMap:ze,iridescence:Z,iridescenceMap:K,iridescenceThicknessMap:$e,sheen:Q,sheenColorMap:Ve,sheenRoughnessMap:Ae,specularMap:xe,specularColorMap:de,specularIntensityMap:Fe,transmission:pe,transmissionMap:je,thicknessMap:it,gradientMap:He,opaque:S.transparent===!1&&S.blending===ei,alphaMap:ne,alphaTest:R,alphaHash:se,combine:S.combine,mapUv:be&&_(S.map.channel),aoMapUv:Tt&&_(S.aoMap.channel),lightMapUv:ve&&_(S.lightMap.channel),bumpMapUv:Ce&&_(S.bumpMap.channel),normalMapUv:he&&_(S.normalMap.channel),displacementMapUv:tt&&_(S.displacementMap.channel),emissiveMapUv:Oe&&_(S.emissiveMap.channel),metalnessMapUv:E&&_(S.metalnessMap.channel),roughnessMapUv:v&&_(S.roughnessMap.channel),anisotropyMapUv:oe&&_(S.anisotropyMap.channel),clearcoatMapUv:ue&&_(S.clearcoatMap.channel),clearcoatNormalMapUv:Ee&&_(S.clearcoatNormalMap.channel),clearcoatRoughnessMapUv:ze&&_(S.clearcoatRoughnessMap.channel),iridescenceMapUv:K&&_(S.iridescenceMap.channel),iridescenceThicknessMapUv:$e&&_(S.iridescenceThicknessMap.channel),sheenColorMapUv:Ve&&_(S.sheenColorMap.channel),sheenRoughnessMapUv:Ae&&_(S.sheenRoughnessMap.channel),specularMapUv:xe&&_(S.specularMap.channel),specularColorMapUv:de&&_(S.specularColorMap.channel),specularIntensityMapUv:Fe&&_(S.specularIntensityMap.channel),transmissionMapUv:je&&_(S.transmissionMap.channel),thicknessMapUv:it&&_(S.thicknessMap.channel),alphaMapUv:ne&&_(S.alphaMap.channel),vertexTangents:!!z.attributes.tangent&&(he||F),vertexColors:S.vertexColors,vertexAlphas:S.vertexColors===!0&&!!z.attributes.color&&z.attributes.color.itemSize===4,vertexUv1s:Te,vertexUv2s:Me,vertexUv3s:Ke,pointsUvs:ie.isPoints===!0&&!!z.attributes.uv&&(be||ne),fog:!!C,useFog:S.fog===!0,fogExp2:C&&C.isFogExp2,flatShading:S.flatShading===!0,sizeAttenuation:S.sizeAttenuation===!0,logarithmicDepthBuffer:p,skinning:ie.isSkinnedMesh===!0,morphTargets:z.morphAttributes.position!==void 0,morphNormals:z.morphAttributes.normal!==void 0,morphColors:z.morphAttributes.color!==void 0,morphTargetsCount:j,morphTextureStride:ae,numDirLights:b.directional.length,numPointLights:b.point.length,numSpotLights:b.spot.length,numSpotLightMaps:b.spotLightMap.length,numRectAreaLights:b.rectArea.length,numHemiLights:b.hemi.length,numDirLightShadows:b.directionalShadowMap.length,numPointLightShadows:b.pointShadowMap.length,numSpotLightShadows:b.spotShadowMap.length,numSpotLightShadowsWithMaps:b.numSpotLightShadowsWithMaps,numLightProbes:b.numLightProbes,numClippingPlanes:o.numPlanes,numClipIntersection:o.numIntersection,dithering:S.dithering,shadowMapEnabled:i.shadowMap.enabled&&k.length>0,shadowMapType:i.shadowMap.type,toneMapping:Ze,useLegacyLights:i._useLegacyLights,decodeVideoTexture:be&&S.map.isVideoTexture===!0&&Ye.getTransfer(S.map.colorSpace)===Qe,premultipliedAlpha:S.premultipliedAlpha,doubleSided:S.side===nn,flipSided:S.side===Rt,useDepthPacking:S.depthPacking>=0,depthPacking:S.depthPacking||0,index0AttributeName:S.index0AttributeName,extensionDerivatives:re&&S.extensions.derivatives===!0,extensionFragDepth:re&&S.extensions.fragDepth===!0,extensionDrawBuffers:re&&S.extensions.drawBuffers===!0,extensionShaderTextureLOD:re&&S.extensions.shaderTextureLOD===!0,extensionClipCullDistance:re&&S.extensions.clipCullDistance&&n.has("WEBGL_clip_cull_distance"),rendererExtensionFragDepth:d||n.has("EXT_frag_depth"),rendererExtensionDrawBuffers:d||n.has("WEBGL_draw_buffers"),rendererExtensionShaderTextureLod:d||n.has("EXT_shader_texture_lod"),rendererExtensionParallelShaderCompile:n.has("KHR_parallel_shader_compile"),customProgramCacheKey:S.customProgramCacheKey()}}function u(S){const b=[];if(S.shaderID?b.push(S.shaderID):(b.push(S.customVertexShaderID),b.push(S.customFragmentShaderID)),S.defines!==void 0)for(const k in S.defines)b.push(k),b.push(S.defines[k]);return S.isRawShaderMaterial===!1&&(y(b,S),x(b,S),b.push(i.outputColorSpace)),b.push(S.customProgramCacheKey),b.join()}function y(S,b){S.push(b.precision),S.push(b.outputColorSpace),S.push(b.envMapMode),S.push(b.envMapCubeUVHeight),S.push(b.mapUv),S.push(b.alphaMapUv),S.push(b.lightMapUv),S.push(b.aoMapUv),S.push(b.bumpMapUv),S.push(b.normalMapUv),S.push(b.displacementMapUv),S.push(b.emissiveMapUv),S.push(b.metalnessMapUv),S.push(b.roughnessMapUv),S.push(b.anisotropyMapUv),S.push(b.clearcoatMapUv),S.push(b.clearcoatNormalMapUv),S.push(b.clearcoatRoughnessMapUv),S.push(b.iridescenceMapUv),S.push(b.iridescenceThicknessMapUv),S.push(b.sheenColorMapUv),S.push(b.sheenRoughnessMapUv),S.push(b.specularMapUv),S.push(b.specularColorMapUv),S.push(b.specularIntensityMapUv),S.push(b.transmissionMapUv),S.push(b.thicknessMapUv),S.push(b.combine),S.push(b.fogExp2),S.push(b.sizeAttenuation),S.push(b.morphTargetsCount),S.push(b.morphAttributeCount),S.push(b.numDirLights),S.push(b.numPointLights),S.push(b.numSpotLights),S.push(b.numSpotLightMaps),S.push(b.numHemiLights),S.push(b.numRectAreaLights),S.push(b.numDirLightShadows),S.push(b.numPointLightShadows),S.push(b.numSpotLightShadows),S.push(b.numSpotLightShadowsWithMaps),S.push(b.numLightProbes),S.push(b.shadowMapType),S.push(b.toneMapping),S.push(b.numClippingPlanes),S.push(b.numClipIntersection),S.push(b.depthPacking)}function x(S,b){a.disableAll(),b.isWebGL2&&a.enable(0),b.supportsVertexTextures&&a.enable(1),b.instancing&&a.enable(2),b.instancingColor&&a.enable(3),b.matcap&&a.enable(4),b.envMap&&a.enable(5),b.normalMapObjectSpace&&a.enable(6),b.normalMapTangentSpace&&a.enable(7),b.clearcoat&&a.enable(8),b.iridescence&&a.enable(9),b.alphaTest&&a.enable(10),b.vertexColors&&a.enable(11),b.vertexAlphas&&a.enable(12),b.vertexUv1s&&a.enable(13),b.vertexUv2s&&a.enable(14),b.vertexUv3s&&a.enable(15),b.vertexTangents&&a.enable(16),b.anisotropy&&a.enable(17),b.alphaHash&&a.enable(18),b.batching&&a.enable(19),S.push(a.mask),a.disableAll(),b.fog&&a.enable(0),b.useFog&&a.enable(1),b.flatShading&&a.enable(2),b.logarithmicDepthBuffer&&a.enable(3),b.skinning&&a.enable(4),b.morphTargets&&a.enable(5),b.morphNormals&&a.enable(6),b.morphColors&&a.enable(7),b.premultipliedAlpha&&a.enable(8),b.shadowMapEnabled&&a.enable(9),b.useLegacyLights&&a.enable(10),b.doubleSided&&a.enable(11),b.flipSided&&a.enable(12),b.useDepthPacking&&a.enable(13),b.dithering&&a.enable(14),b.transmission&&a.enable(15),b.sheen&&a.enable(16),b.opaque&&a.enable(17),b.pointsUvs&&a.enable(18),b.decodeVideoTexture&&a.enable(19),S.push(a.mask)}function T(S){const b=g[S.type];let k;if(b){const $=Qt[b];k=Su.clone($.uniforms)}else k=S.uniforms;return k}function L(S,b){let k;for(let $=0,ie=c.length;$<ie;$++){const C=c[$];if(C.cacheKey===b){k=C,++k.usedTimes;break}}return k===void 0&&(k=new np(i,b,S,r),c.push(k)),k}function w(S){if(--S.usedTimes===0){const b=c.indexOf(S);c[b]=c[c.length-1],c.pop(),S.destroy()}}function A(S){l.remove(S)}function X(){l.dispose()}return{getParameters:h,getProgramCacheKey:u,getUniforms:T,acquireProgram:L,releaseProgram:w,releaseShaderCache:A,programs:c,dispose:X}}function op(){let i=new WeakMap;function e(r){let o=i.get(r);return o===void 0&&(o={},i.set(r,o)),o}function t(r){i.delete(r)}function n(r,o,a){i.get(r)[o]=a}function s(){i=new WeakMap}return{get:e,remove:t,update:n,dispose:s}}function lp(i,e){return i.groupOrder!==e.groupOrder?i.groupOrder-e.groupOrder:i.renderOrder!==e.renderOrder?i.renderOrder-e.renderOrder:i.material.id!==e.material.id?i.material.id-e.material.id:i.z!==e.z?i.z-e.z:i.id-e.id}function ul(i,e){return i.groupOrder!==e.groupOrder?i.groupOrder-e.groupOrder:i.renderOrder!==e.renderOrder?i.renderOrder-e.renderOrder:i.z!==e.z?e.z-i.z:i.id-e.id}function dl(){const i=[];let e=0;const t=[],n=[],s=[];function r(){e=0,t.length=0,n.length=0,s.length=0}function o(p,f,m,g,_,h){let u=i[e];return u===void 0?(u={id:p.id,object:p,geometry:f,material:m,groupOrder:g,renderOrder:p.renderOrder,z:_,group:h},i[e]=u):(u.id=p.id,u.object=p,u.geometry=f,u.material=m,u.groupOrder=g,u.renderOrder=p.renderOrder,u.z=_,u.group=h),e++,u}function a(p,f,m,g,_,h){const u=o(p,f,m,g,_,h);m.transmission>0?n.push(u):m.transparent===!0?s.push(u):t.push(u)}function l(p,f,m,g,_,h){const u=o(p,f,m,g,_,h);m.transmission>0?n.unshift(u):m.transparent===!0?s.unshift(u):t.unshift(u)}function c(p,f){t.length>1&&t.sort(p||lp),n.length>1&&n.sort(f||ul),s.length>1&&s.sort(f||ul)}function d(){for(let p=e,f=i.length;p<f;p++){const m=i[p];if(m.id===null)break;m.id=null,m.object=null,m.geometry=null,m.material=null,m.group=null}}return{opaque:t,transmissive:n,transparent:s,init:r,push:a,unshift:l,finish:d,sort:c}}function cp(){let i=new WeakMap;function e(n,s){const r=i.get(n);let o;return r===void 0?(o=new dl,i.set(n,[o])):s>=r.length?(o=new dl,r.push(o)):o=r[s],o}function t(){i=new WeakMap}return{get:e,dispose:t}}function up(){const i={};return{get:function(e){if(i[e.id]!==void 0)return i[e.id];let t;switch(e.type){case"DirectionalLight":t={direction:new U,color:new Pe};break;case"SpotLight":t={position:new U,direction:new U,color:new Pe,distance:0,coneCos:0,penumbraCos:0,decay:0};break;case"PointLight":t={position:new U,color:new Pe,distance:0,decay:0};break;case"HemisphereLight":t={direction:new U,skyColor:new Pe,groundColor:new Pe};break;case"RectAreaLight":t={color:new Pe,position:new U,halfWidth:new U,halfHeight:new U};break}return i[e.id]=t,t}}}function dp(){const i={};return{get:function(e){if(i[e.id]!==void 0)return i[e.id];let t;switch(e.type){case"DirectionalLight":t={shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new qe};break;case"SpotLight":t={shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new qe};break;case"PointLight":t={shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new qe,shadowCameraNear:1,shadowCameraFar:1e3};break}return i[e.id]=t,t}}}let hp=0;function fp(i,e){return(e.castShadow?2:0)-(i.castShadow?2:0)+(e.map?1:0)-(i.map?1:0)}function pp(i,e){const t=new up,n=dp(),s={version:0,hash:{directionalLength:-1,pointLength:-1,spotLength:-1,rectAreaLength:-1,hemiLength:-1,numDirectionalShadows:-1,numPointShadows:-1,numSpotShadows:-1,numSpotMaps:-1,numLightProbes:-1},ambient:[0,0,0],probe:[],directional:[],directionalShadow:[],directionalShadowMap:[],directionalShadowMatrix:[],spot:[],spotLightMap:[],spotShadow:[],spotShadowMap:[],spotLightMatrix:[],rectArea:[],rectAreaLTC1:null,rectAreaLTC2:null,point:[],pointShadow:[],pointShadowMap:[],pointShadowMatrix:[],hemi:[],numSpotLightShadowsWithMaps:0,numLightProbes:0};for(let d=0;d<9;d++)s.probe.push(new U);const r=new U,o=new ot,a=new ot;function l(d,p){let f=0,m=0,g=0;for(let $=0;$<9;$++)s.probe[$].set(0,0,0);let _=0,h=0,u=0,y=0,x=0,T=0,L=0,w=0,A=0,X=0,S=0;d.sort(fp);const b=p===!0?Math.PI:1;for(let $=0,ie=d.length;$<ie;$++){const C=d[$],z=C.color,G=C.intensity,Y=C.distance,V=C.shadow&&C.shadow.map?C.shadow.map.texture:null;if(C.isAmbientLight)f+=z.r*G*b,m+=z.g*G*b,g+=z.b*G*b;else if(C.isLightProbe){for(let D=0;D<9;D++)s.probe[D].addScaledVector(C.sh.coefficients[D],G);S++}else if(C.isDirectionalLight){const D=t.get(C);if(D.color.copy(C.color).multiplyScalar(C.intensity*b),C.castShadow){const W=C.shadow,j=n.get(C);j.shadowBias=W.bias,j.shadowNormalBias=W.normalBias,j.shadowRadius=W.radius,j.shadowMapSize=W.mapSize,s.directionalShadow[_]=j,s.directionalShadowMap[_]=V,s.directionalShadowMatrix[_]=C.shadow.matrix,T++}s.directional[_]=D,_++}else if(C.isSpotLight){const D=t.get(C);D.position.setFromMatrixPosition(C.matrixWorld),D.color.copy(z).multiplyScalar(G*b),D.distance=Y,D.coneCos=Math.cos(C.angle),D.penumbraCos=Math.cos(C.angle*(1-C.penumbra)),D.decay=C.decay,s.spot[u]=D;const W=C.shadow;if(C.map&&(s.spotLightMap[A]=C.map,A++,W.updateMatrices(C),C.castShadow&&X++),s.spotLightMatrix[u]=W.matrix,C.castShadow){const j=n.get(C);j.shadowBias=W.bias,j.shadowNormalBias=W.normalBias,j.shadowRadius=W.radius,j.shadowMapSize=W.mapSize,s.spotShadow[u]=j,s.spotShadowMap[u]=V,w++}u++}else if(C.isRectAreaLight){const D=t.get(C);D.color.copy(z).multiplyScalar(G),D.halfWidth.set(C.width*.5,0,0),D.halfHeight.set(0,C.height*.5,0),s.rectArea[y]=D,y++}else if(C.isPointLight){const D=t.get(C);if(D.color.copy(C.color).multiplyScalar(C.intensity*b),D.distance=C.distance,D.decay=C.decay,C.castShadow){const W=C.shadow,j=n.get(C);j.shadowBias=W.bias,j.shadowNormalBias=W.normalBias,j.shadowRadius=W.radius,j.shadowMapSize=W.mapSize,j.shadowCameraNear=W.camera.near,j.shadowCameraFar=W.camera.far,s.pointShadow[h]=j,s.pointShadowMap[h]=V,s.pointShadowMatrix[h]=C.shadow.matrix,L++}s.point[h]=D,h++}else if(C.isHemisphereLight){const D=t.get(C);D.skyColor.copy(C.color).multiplyScalar(G*b),D.groundColor.copy(C.groundColor).multiplyScalar(G*b),s.hemi[x]=D,x++}}y>0&&(e.isWebGL2?i.has("OES_texture_float_linear")===!0?(s.rectAreaLTC1=te.LTC_FLOAT_1,s.rectAreaLTC2=te.LTC_FLOAT_2):(s.rectAreaLTC1=te.LTC_HALF_1,s.rectAreaLTC2=te.LTC_HALF_2):i.has("OES_texture_float_linear")===!0?(s.rectAreaLTC1=te.LTC_FLOAT_1,s.rectAreaLTC2=te.LTC_FLOAT_2):i.has("OES_texture_half_float_linear")===!0?(s.rectAreaLTC1=te.LTC_HALF_1,s.rectAreaLTC2=te.LTC_HALF_2):console.error("THREE.WebGLRenderer: Unable to use RectAreaLight. Missing WebGL extensions.")),s.ambient[0]=f,s.ambient[1]=m,s.ambient[2]=g;const k=s.hash;(k.directionalLength!==_||k.pointLength!==h||k.spotLength!==u||k.rectAreaLength!==y||k.hemiLength!==x||k.numDirectionalShadows!==T||k.numPointShadows!==L||k.numSpotShadows!==w||k.numSpotMaps!==A||k.numLightProbes!==S)&&(s.directional.length=_,s.spot.length=u,s.rectArea.length=y,s.point.length=h,s.hemi.length=x,s.directionalShadow.length=T,s.directionalShadowMap.length=T,s.pointShadow.length=L,s.pointShadowMap.length=L,s.spotShadow.length=w,s.spotShadowMap.length=w,s.directionalShadowMatrix.length=T,s.pointShadowMatrix.length=L,s.spotLightMatrix.length=w+A-X,s.spotLightMap.length=A,s.numSpotLightShadowsWithMaps=X,s.numLightProbes=S,k.directionalLength=_,k.pointLength=h,k.spotLength=u,k.rectAreaLength=y,k.hemiLength=x,k.numDirectionalShadows=T,k.numPointShadows=L,k.numSpotShadows=w,k.numSpotMaps=A,k.numLightProbes=S,s.version=hp++)}function c(d,p){let f=0,m=0,g=0,_=0,h=0;const u=p.matrixWorldInverse;for(let y=0,x=d.length;y<x;y++){const T=d[y];if(T.isDirectionalLight){const L=s.directional[f];L.direction.setFromMatrixPosition(T.matrixWorld),r.setFromMatrixPosition(T.target.matrixWorld),L.direction.sub(r),L.direction.transformDirection(u),f++}else if(T.isSpotLight){const L=s.spot[g];L.position.setFromMatrixPosition(T.matrixWorld),L.position.applyMatrix4(u),L.direction.setFromMatrixPosition(T.matrixWorld),r.setFromMatrixPosition(T.target.matrixWorld),L.direction.sub(r),L.direction.transformDirection(u),g++}else if(T.isRectAreaLight){const L=s.rectArea[_];L.position.setFromMatrixPosition(T.matrixWorld),L.position.applyMatrix4(u),a.identity(),o.copy(T.matrixWorld),o.premultiply(u),a.extractRotation(o),L.halfWidth.set(T.width*.5,0,0),L.halfHeight.set(0,T.height*.5,0),L.halfWidth.applyMatrix4(a),L.halfHeight.applyMatrix4(a),_++}else if(T.isPointLight){const L=s.point[m];L.position.setFromMatrixPosition(T.matrixWorld),L.position.applyMatrix4(u),m++}else if(T.isHemisphereLight){const L=s.hemi[h];L.direction.setFromMatrixPosition(T.matrixWorld),L.direction.transformDirection(u),h++}}}return{setup:l,setupView:c,state:s}}function hl(i,e){const t=new pp(i,e),n=[],s=[];function r(){n.length=0,s.length=0}function o(p){n.push(p)}function a(p){s.push(p)}function l(p){t.setup(n,p)}function c(p){t.setupView(n,p)}return{init:r,state:{lightsArray:n,shadowsArray:s,lights:t},setupLights:l,setupLightsView:c,pushLight:o,pushShadow:a}}function mp(i,e){let t=new WeakMap;function n(r,o=0){const a=t.get(r);let l;return a===void 0?(l=new hl(i,e),t.set(r,[l])):o>=a.length?(l=new hl(i,e),a.push(l)):l=a[o],l}function s(){t=new WeakMap}return{get:n,dispose:s}}class gp extends mi{constructor(e){super(),this.isMeshDepthMaterial=!0,this.type="MeshDepthMaterial",this.depthPacking=qc,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.wireframe=!1,this.wireframeLinewidth=1,this.setValues(e)}copy(e){return super.copy(e),this.depthPacking=e.depthPacking,this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this}}class _p extends mi{constructor(e){super(),this.isMeshDistanceMaterial=!0,this.type="MeshDistanceMaterial",this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.setValues(e)}copy(e){return super.copy(e),this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this}}const xp=`void main() {
	gl_Position = vec4( position, 1.0 );
}`,vp=`uniform sampler2D shadow_pass;
uniform vec2 resolution;
uniform float radius;
#include <packing>
void main() {
	const float samples = float( VSM_SAMPLES );
	float mean = 0.0;
	float squared_mean = 0.0;
	float uvStride = samples <= 1.0 ? 0.0 : 2.0 / ( samples - 1.0 );
	float uvStart = samples <= 1.0 ? 0.0 : - 1.0;
	for ( float i = 0.0; i < samples; i ++ ) {
		float uvOffset = uvStart + i * uvStride;
		#ifdef HORIZONTAL_PASS
			vec2 distribution = unpackRGBATo2Half( texture2D( shadow_pass, ( gl_FragCoord.xy + vec2( uvOffset, 0.0 ) * radius ) / resolution ) );
			mean += distribution.x;
			squared_mean += distribution.y * distribution.y + distribution.x * distribution.x;
		#else
			float depth = unpackRGBAToDepth( texture2D( shadow_pass, ( gl_FragCoord.xy + vec2( 0.0, uvOffset ) * radius ) / resolution ) );
			mean += depth;
			squared_mean += depth * depth;
		#endif
	}
	mean = mean / samples;
	squared_mean = squared_mean / samples;
	float std_dev = sqrt( squared_mean - mean * mean );
	gl_FragColor = pack2HalfToRGBA( vec2( mean, std_dev ) );
}`;function Mp(i,e,t){let n=new Pr;const s=new qe,r=new qe,o=new ht,a=new gp({depthPacking:jc}),l=new _p,c={},d=t.maxTextureSize,p={[xn]:Rt,[Rt]:xn,[nn]:nn},f=new Vn({defines:{VSM_SAMPLES:8},uniforms:{shadow_pass:{value:null},resolution:{value:new qe},radius:{value:4}},vertexShader:xp,fragmentShader:vp}),m=f.clone();m.defines.HORIZONTAL_PASS=1;const g=new dn;g.setAttribute("position",new Jt(new Float32Array([-1,-1,.5,3,-1,.5,-1,3,.5]),3));const _=new Vt(g,f),h=this;this.enabled=!1,this.autoUpdate=!0,this.needsUpdate=!1,this.type=ha;let u=this.type;this.render=function(w,A,X){if(h.enabled===!1||h.autoUpdate===!1&&h.needsUpdate===!1||w.length===0)return;const S=i.getRenderTarget(),b=i.getActiveCubeFace(),k=i.getActiveMipmapLevel(),$=i.state;$.setBlending(vn),$.buffers.color.setClear(1,1,1,1),$.buffers.depth.setTest(!0),$.setScissorTest(!1);const ie=u!==tn&&this.type===tn,C=u===tn&&this.type!==tn;for(let z=0,G=w.length;z<G;z++){const Y=w[z],V=Y.shadow;if(V===void 0){console.warn("THREE.WebGLShadowMap:",Y,"has no shadow.");continue}if(V.autoUpdate===!1&&V.needsUpdate===!1)continue;s.copy(V.mapSize);const D=V.getFrameExtents();if(s.multiply(D),r.copy(V.mapSize),(s.x>d||s.y>d)&&(s.x>d&&(r.x=Math.floor(d/D.x),s.x=r.x*D.x,V.mapSize.x=r.x),s.y>d&&(r.y=Math.floor(d/D.y),s.y=r.y*D.y,V.mapSize.y=r.y)),V.map===null||ie===!0||C===!0){const j=this.type!==tn?{minFilter:St,magFilter:St}:{};V.map!==null&&V.map.dispose(),V.map=new Bn(s.x,s.y,j),V.map.texture.name=Y.name+".shadowMap",V.camera.updateProjectionMatrix()}i.setRenderTarget(V.map),i.clear();const W=V.getViewportCount();for(let j=0;j<W;j++){const ae=V.getViewport(j);o.set(r.x*ae.x,r.y*ae.y,r.x*ae.z,r.y*ae.w),$.viewport(o),V.updateMatrices(Y,j),n=V.getFrustum(),T(A,X,V.camera,Y,this.type)}V.isPointLightShadow!==!0&&this.type===tn&&y(V,X),V.needsUpdate=!1}u=this.type,h.needsUpdate=!1,i.setRenderTarget(S,b,k)};function y(w,A){const X=e.update(_);f.defines.VSM_SAMPLES!==w.blurSamples&&(f.defines.VSM_SAMPLES=w.blurSamples,m.defines.VSM_SAMPLES=w.blurSamples,f.needsUpdate=!0,m.needsUpdate=!0),w.mapPass===null&&(w.mapPass=new Bn(s.x,s.y)),f.uniforms.shadow_pass.value=w.map.texture,f.uniforms.resolution.value=w.mapSize,f.uniforms.radius.value=w.radius,i.setRenderTarget(w.mapPass),i.clear(),i.renderBufferDirect(A,null,X,f,_,null),m.uniforms.shadow_pass.value=w.mapPass.texture,m.uniforms.resolution.value=w.mapSize,m.uniforms.radius.value=w.radius,i.setRenderTarget(w.map),i.clear(),i.renderBufferDirect(A,null,X,m,_,null)}function x(w,A,X,S){let b=null;const k=X.isPointLight===!0?w.customDistanceMaterial:w.customDepthMaterial;if(k!==void 0)b=k;else if(b=X.isPointLight===!0?l:a,i.localClippingEnabled&&A.clipShadows===!0&&Array.isArray(A.clippingPlanes)&&A.clippingPlanes.length!==0||A.displacementMap&&A.displacementScale!==0||A.alphaMap&&A.alphaTest>0||A.map&&A.alphaTest>0){const $=b.uuid,ie=A.uuid;let C=c[$];C===void 0&&(C={},c[$]=C);let z=C[ie];z===void 0&&(z=b.clone(),C[ie]=z,A.addEventListener("dispose",L)),b=z}if(b.visible=A.visible,b.wireframe=A.wireframe,S===tn?b.side=A.shadowSide!==null?A.shadowSide:A.side:b.side=A.shadowSide!==null?A.shadowSide:p[A.side],b.alphaMap=A.alphaMap,b.alphaTest=A.alphaTest,b.map=A.map,b.clipShadows=A.clipShadows,b.clippingPlanes=A.clippingPlanes,b.clipIntersection=A.clipIntersection,b.displacementMap=A.displacementMap,b.displacementScale=A.displacementScale,b.displacementBias=A.displacementBias,b.wireframeLinewidth=A.wireframeLinewidth,b.linewidth=A.linewidth,X.isPointLight===!0&&b.isMeshDistanceMaterial===!0){const $=i.properties.get(b);$.light=X}return b}function T(w,A,X,S,b){if(w.visible===!1)return;if(w.layers.test(A.layers)&&(w.isMesh||w.isLine||w.isPoints)&&(w.castShadow||w.receiveShadow&&b===tn)&&(!w.frustumCulled||n.intersectsObject(w))){w.modelViewMatrix.multiplyMatrices(X.matrixWorldInverse,w.matrixWorld);const ie=e.update(w),C=w.material;if(Array.isArray(C)){const z=ie.groups;for(let G=0,Y=z.length;G<Y;G++){const V=z[G],D=C[V.materialIndex];if(D&&D.visible){const W=x(w,D,S,b);w.onBeforeShadow(i,w,A,X,ie,W,V),i.renderBufferDirect(X,null,ie,W,w,V),w.onAfterShadow(i,w,A,X,ie,W,V)}}}else if(C.visible){const z=x(w,C,S,b);w.onBeforeShadow(i,w,A,X,ie,z,null),i.renderBufferDirect(X,null,ie,z,w,null),w.onAfterShadow(i,w,A,X,ie,z,null)}}const $=w.children;for(let ie=0,C=$.length;ie<C;ie++)T($[ie],A,X,S,b)}function L(w){w.target.removeEventListener("dispose",L);for(const X in c){const S=c[X],b=w.target.uuid;b in S&&(S[b].dispose(),delete S[b])}}}function Sp(i,e,t){const n=t.isWebGL2;function s(){let R=!1;const se=new ht;let re=null;const Te=new ht(0,0,0,0);return{setMask:function(Me){re!==Me&&!R&&(i.colorMask(Me,Me,Me,Me),re=Me)},setLocked:function(Me){R=Me},setClear:function(Me,Ke,Ze,mt,wt){wt===!0&&(Me*=mt,Ke*=mt,Ze*=mt),se.set(Me,Ke,Ze,mt),Te.equals(se)===!1&&(i.clearColor(Me,Ke,Ze,mt),Te.copy(se))},reset:function(){R=!1,re=null,Te.set(-1,0,0,0)}}}function r(){let R=!1,se=null,re=null,Te=null;return{setTest:function(Me){Me?Ne(i.DEPTH_TEST):be(i.DEPTH_TEST)},setMask:function(Me){se!==Me&&!R&&(i.depthMask(Me),se=Me)},setFunc:function(Me){if(re!==Me){switch(Me){case yc:i.depthFunc(i.NEVER);break;case Ec:i.depthFunc(i.ALWAYS);break;case bc:i.depthFunc(i.LESS);break;case Zi:i.depthFunc(i.LEQUAL);break;case Tc:i.depthFunc(i.EQUAL);break;case wc:i.depthFunc(i.GEQUAL);break;case Ac:i.depthFunc(i.GREATER);break;case Rc:i.depthFunc(i.NOTEQUAL);break;default:i.depthFunc(i.LEQUAL)}re=Me}},setLocked:function(Me){R=Me},setClear:function(Me){Te!==Me&&(i.clearDepth(Me),Te=Me)},reset:function(){R=!1,se=null,re=null,Te=null}}}function o(){let R=!1,se=null,re=null,Te=null,Me=null,Ke=null,Ze=null,mt=null,wt=null;return{setTest:function(Je){R||(Je?Ne(i.STENCIL_TEST):be(i.STENCIL_TEST))},setMask:function(Je){se!==Je&&!R&&(i.stencilMask(Je),se=Je)},setFunc:function(Je,At,en){(re!==Je||Te!==At||Me!==en)&&(i.stencilFunc(Je,At,en),re=Je,Te=At,Me=en)},setOp:function(Je,At,en){(Ke!==Je||Ze!==At||mt!==en)&&(i.stencilOp(Je,At,en),Ke=Je,Ze=At,mt=en)},setLocked:function(Je){R=Je},setClear:function(Je){wt!==Je&&(i.clearStencil(Je),wt=Je)},reset:function(){R=!1,se=null,re=null,Te=null,Me=null,Ke=null,Ze=null,mt=null,wt=null}}}const a=new s,l=new r,c=new o,d=new WeakMap,p=new WeakMap;let f={},m={},g=new WeakMap,_=[],h=null,u=!1,y=null,x=null,T=null,L=null,w=null,A=null,X=null,S=new Pe(0,0,0),b=0,k=!1,$=null,ie=null,C=null,z=null,G=null;const Y=i.getParameter(i.MAX_COMBINED_TEXTURE_IMAGE_UNITS);let V=!1,D=0;const W=i.getParameter(i.VERSION);W.indexOf("WebGL")!==-1?(D=parseFloat(/^WebGL (\d)/.exec(W)[1]),V=D>=1):W.indexOf("OpenGL ES")!==-1&&(D=parseFloat(/^OpenGL ES (\d)/.exec(W)[1]),V=D>=2);let j=null,ae={};const H=i.getParameter(i.SCISSOR_BOX),q=i.getParameter(i.VIEWPORT),le=new ht().fromArray(H),fe=new ht().fromArray(q);function ge(R,se,re,Te){const Me=new Uint8Array(4),Ke=i.createTexture();i.bindTexture(R,Ke),i.texParameteri(R,i.TEXTURE_MIN_FILTER,i.NEAREST),i.texParameteri(R,i.TEXTURE_MAG_FILTER,i.NEAREST);for(let Ze=0;Ze<re;Ze++)n&&(R===i.TEXTURE_3D||R===i.TEXTURE_2D_ARRAY)?i.texImage3D(se,0,i.RGBA,1,1,Te,0,i.RGBA,i.UNSIGNED_BYTE,Me):i.texImage2D(se+Ze,0,i.RGBA,1,1,0,i.RGBA,i.UNSIGNED_BYTE,Me);return Ke}const De={};De[i.TEXTURE_2D]=ge(i.TEXTURE_2D,i.TEXTURE_2D,1),De[i.TEXTURE_CUBE_MAP]=ge(i.TEXTURE_CUBE_MAP,i.TEXTURE_CUBE_MAP_POSITIVE_X,6),n&&(De[i.TEXTURE_2D_ARRAY]=ge(i.TEXTURE_2D_ARRAY,i.TEXTURE_2D_ARRAY,1,1),De[i.TEXTURE_3D]=ge(i.TEXTURE_3D,i.TEXTURE_3D,1,1)),a.setClear(0,0,0,1),l.setClear(1),c.setClear(0),Ne(i.DEPTH_TEST),l.setFunc(Zi),Oe(!1),E(da),Ne(i.CULL_FACE),he(vn);function Ne(R){f[R]!==!0&&(i.enable(R),f[R]=!0)}function be(R){f[R]!==!1&&(i.disable(R),f[R]=!1)}function Xe(R,se){return m[R]!==se?(i.bindFramebuffer(R,se),m[R]=se,n&&(R===i.DRAW_FRAMEBUFFER&&(m[i.FRAMEBUFFER]=se),R===i.FRAMEBUFFER&&(m[i.DRAW_FRAMEBUFFER]=se)),!0):!1}function I(R,se){let re=_,Te=!1;if(R)if(re=g.get(se),re===void 0&&(re=[],g.set(se,re)),R.isWebGLMultipleRenderTargets){const Me=R.texture;if(re.length!==Me.length||re[0]!==i.COLOR_ATTACHMENT0){for(let Ke=0,Ze=Me.length;Ke<Ze;Ke++)re[Ke]=i.COLOR_ATTACHMENT0+Ke;re.length=Me.length,Te=!0}}else re[0]!==i.COLOR_ATTACHMENT0&&(re[0]=i.COLOR_ATTACHMENT0,Te=!0);else re[0]!==i.BACK&&(re[0]=i.BACK,Te=!0);Te&&(t.isWebGL2?i.drawBuffers(re):e.get("WEBGL_draw_buffers").drawBuffersWEBGL(re))}function Tt(R){return h!==R?(i.useProgram(R),h=R,!0):!1}const ve={[Nn]:i.FUNC_ADD,[oc]:i.FUNC_SUBTRACT,[lc]:i.FUNC_REVERSE_SUBTRACT};if(n)ve[_a]=i.MIN,ve[xa]=i.MAX;else{const R=e.get("EXT_blend_minmax");R!==null&&(ve[_a]=R.MIN_EXT,ve[xa]=R.MAX_EXT)}const Ce={[cc]:i.ZERO,[uc]:i.ONE,[dc]:i.SRC_COLOR,[Ks]:i.SRC_ALPHA,[_c]:i.SRC_ALPHA_SATURATE,[mc]:i.DST_COLOR,[fc]:i.DST_ALPHA,[hc]:i.ONE_MINUS_SRC_COLOR,[Zs]:i.ONE_MINUS_SRC_ALPHA,[gc]:i.ONE_MINUS_DST_COLOR,[pc]:i.ONE_MINUS_DST_ALPHA,[xc]:i.CONSTANT_COLOR,[vc]:i.ONE_MINUS_CONSTANT_COLOR,[Mc]:i.CONSTANT_ALPHA,[Sc]:i.ONE_MINUS_CONSTANT_ALPHA};function he(R,se,re,Te,Me,Ke,Ze,mt,wt,Je){if(R===vn){u===!0&&(be(i.BLEND),u=!1);return}if(u===!1&&(Ne(i.BLEND),u=!0),R!==ac){if(R!==y||Je!==k){if((x!==Nn||w!==Nn)&&(i.blendEquation(i.FUNC_ADD),x=Nn,w=Nn),Je)switch(R){case ei:i.blendFuncSeparate(i.ONE,i.ONE_MINUS_SRC_ALPHA,i.ONE,i.ONE_MINUS_SRC_ALPHA);break;case pa:i.blendFunc(i.ONE,i.ONE);break;case ma:i.blendFuncSeparate(i.ZERO,i.ONE_MINUS_SRC_COLOR,i.ZERO,i.ONE);break;case ga:i.blendFuncSeparate(i.ZERO,i.SRC_COLOR,i.ZERO,i.SRC_ALPHA);break;default:console.error("THREE.WebGLState: Invalid blending: ",R);break}else switch(R){case ei:i.blendFuncSeparate(i.SRC_ALPHA,i.ONE_MINUS_SRC_ALPHA,i.ONE,i.ONE_MINUS_SRC_ALPHA);break;case pa:i.blendFunc(i.SRC_ALPHA,i.ONE);break;case ma:i.blendFuncSeparate(i.ZERO,i.ONE_MINUS_SRC_COLOR,i.ZERO,i.ONE);break;case ga:i.blendFunc(i.ZERO,i.SRC_COLOR);break;default:console.error("THREE.WebGLState: Invalid blending: ",R);break}T=null,L=null,A=null,X=null,S.set(0,0,0),b=0,y=R,k=Je}return}Me=Me||se,Ke=Ke||re,Ze=Ze||Te,(se!==x||Me!==w)&&(i.blendEquationSeparate(ve[se],ve[Me]),x=se,w=Me),(re!==T||Te!==L||Ke!==A||Ze!==X)&&(i.blendFuncSeparate(Ce[re],Ce[Te],Ce[Ke],Ce[Ze]),T=re,L=Te,A=Ke,X=Ze),(mt.equals(S)===!1||wt!==b)&&(i.blendColor(mt.r,mt.g,mt.b,wt),S.copy(mt),b=wt),y=R,k=!1}function tt(R,se){R.side===nn?be(i.CULL_FACE):Ne(i.CULL_FACE);let re=R.side===Rt;se&&(re=!re),Oe(re),R.blending===ei&&R.transparent===!1?he(vn):he(R.blending,R.blendEquation,R.blendSrc,R.blendDst,R.blendEquationAlpha,R.blendSrcAlpha,R.blendDstAlpha,R.blendColor,R.blendAlpha,R.premultipliedAlpha),l.setFunc(R.depthFunc),l.setTest(R.depthTest),l.setMask(R.depthWrite),a.setMask(R.colorWrite);const Te=R.stencilWrite;c.setTest(Te),Te&&(c.setMask(R.stencilWriteMask),c.setFunc(R.stencilFunc,R.stencilRef,R.stencilFuncMask),c.setOp(R.stencilFail,R.stencilZFail,R.stencilZPass)),F(R.polygonOffset,R.polygonOffsetFactor,R.polygonOffsetUnits),R.alphaToCoverage===!0?Ne(i.SAMPLE_ALPHA_TO_COVERAGE):be(i.SAMPLE_ALPHA_TO_COVERAGE)}function Oe(R){$!==R&&(R?i.frontFace(i.CW):i.frontFace(i.CCW),$=R)}function E(R){R!==sc?(Ne(i.CULL_FACE),R!==ie&&(R===da?i.cullFace(i.BACK):R===rc?i.cullFace(i.FRONT):i.cullFace(i.FRONT_AND_BACK))):be(i.CULL_FACE),ie=R}function v(R){R!==C&&(V&&i.lineWidth(R),C=R)}function F(R,se,re){R?(Ne(i.POLYGON_OFFSET_FILL),(z!==se||G!==re)&&(i.polygonOffset(se,re),z=se,G=re)):be(i.POLYGON_OFFSET_FILL)}function J(R){R?Ne(i.SCISSOR_TEST):be(i.SCISSOR_TEST)}function Z(R){R===void 0&&(R=i.TEXTURE0+Y-1),j!==R&&(i.activeTexture(R),j=R)}function Q(R,se,re){re===void 0&&(j===null?re=i.TEXTURE0+Y-1:re=j);let Te=ae[re];Te===void 0&&(Te={type:void 0,texture:void 0},ae[re]=Te),(Te.type!==R||Te.texture!==se)&&(j!==re&&(i.activeTexture(re),j=re),i.bindTexture(R,se||De[R]),Te.type=R,Te.texture=se)}function pe(){const R=ae[j];R!==void 0&&R.type!==void 0&&(i.bindTexture(R.type,null),R.type=void 0,R.texture=void 0)}function oe(){try{i.compressedTexImage2D.apply(i,arguments)}catch(R){console.error("THREE.WebGLState:",R)}}function ue(){try{i.compressedTexImage3D.apply(i,arguments)}catch(R){console.error("THREE.WebGLState:",R)}}function Ee(){try{i.texSubImage2D.apply(i,arguments)}catch(R){console.error("THREE.WebGLState:",R)}}function ze(){try{i.texSubImage3D.apply(i,arguments)}catch(R){console.error("THREE.WebGLState:",R)}}function K(){try{i.compressedTexSubImage2D.apply(i,arguments)}catch(R){console.error("THREE.WebGLState:",R)}}function $e(){try{i.compressedTexSubImage3D.apply(i,arguments)}catch(R){console.error("THREE.WebGLState:",R)}}function Ve(){try{i.texStorage2D.apply(i,arguments)}catch(R){console.error("THREE.WebGLState:",R)}}function Ae(){try{i.texStorage3D.apply(i,arguments)}catch(R){console.error("THREE.WebGLState:",R)}}function xe(){try{i.texImage2D.apply(i,arguments)}catch(R){console.error("THREE.WebGLState:",R)}}function de(){try{i.texImage3D.apply(i,arguments)}catch(R){console.error("THREE.WebGLState:",R)}}function Fe(R){le.equals(R)===!1&&(i.scissor(R.x,R.y,R.z,R.w),le.copy(R))}function je(R){fe.equals(R)===!1&&(i.viewport(R.x,R.y,R.z,R.w),fe.copy(R))}function it(R,se){let re=p.get(se);re===void 0&&(re=new WeakMap,p.set(se,re));let Te=re.get(R);Te===void 0&&(Te=i.getUniformBlockIndex(se,R.name),re.set(R,Te))}function He(R,se){const Te=p.get(se).get(R);d.get(se)!==Te&&(i.uniformBlockBinding(se,Te,R.__bindingPointIndex),d.set(se,Te))}function ne(){i.disable(i.BLEND),i.disable(i.CULL_FACE),i.disable(i.DEPTH_TEST),i.disable(i.POLYGON_OFFSET_FILL),i.disable(i.SCISSOR_TEST),i.disable(i.STENCIL_TEST),i.disable(i.SAMPLE_ALPHA_TO_COVERAGE),i.blendEquation(i.FUNC_ADD),i.blendFunc(i.ONE,i.ZERO),i.blendFuncSeparate(i.ONE,i.ZERO,i.ONE,i.ZERO),i.blendColor(0,0,0,0),i.colorMask(!0,!0,!0,!0),i.clearColor(0,0,0,0),i.depthMask(!0),i.depthFunc(i.LESS),i.clearDepth(1),i.stencilMask(4294967295),i.stencilFunc(i.ALWAYS,0,4294967295),i.stencilOp(i.KEEP,i.KEEP,i.KEEP),i.clearStencil(0),i.cullFace(i.BACK),i.frontFace(i.CCW),i.polygonOffset(0,0),i.activeTexture(i.TEXTURE0),i.bindFramebuffer(i.FRAMEBUFFER,null),n===!0&&(i.bindFramebuffer(i.DRAW_FRAMEBUFFER,null),i.bindFramebuffer(i.READ_FRAMEBUFFER,null)),i.useProgram(null),i.lineWidth(1),i.scissor(0,0,i.canvas.width,i.canvas.height),i.viewport(0,0,i.canvas.width,i.canvas.height),f={},j=null,ae={},m={},g=new WeakMap,_=[],h=null,u=!1,y=null,x=null,T=null,L=null,w=null,A=null,X=null,S=new Pe(0,0,0),b=0,k=!1,$=null,ie=null,C=null,z=null,G=null,le.set(0,0,i.canvas.width,i.canvas.height),fe.set(0,0,i.canvas.width,i.canvas.height),a.reset(),l.reset(),c.reset()}return{buffers:{color:a,depth:l,stencil:c},enable:Ne,disable:be,bindFramebuffer:Xe,drawBuffers:I,useProgram:Tt,setBlending:he,setMaterial:tt,setFlipSided:Oe,setCullFace:E,setLineWidth:v,setPolygonOffset:F,setScissorTest:J,activeTexture:Z,bindTexture:Q,unbindTexture:pe,compressedTexImage2D:oe,compressedTexImage3D:ue,texImage2D:xe,texImage3D:de,updateUBOMapping:it,uniformBlockBinding:He,texStorage2D:Ve,texStorage3D:Ae,texSubImage2D:Ee,texSubImage3D:ze,compressedTexSubImage2D:K,compressedTexSubImage3D:$e,scissor:Fe,viewport:je,reset:ne}}function yp(i,e,t,n,s,r,o){const a=s.isWebGL2,l=e.has("WEBGL_multisampled_render_to_texture")?e.get("WEBGL_multisampled_render_to_texture"):null,c=typeof navigator>"u"?!1:/OculusBrowser/g.test(navigator.userAgent),d=new WeakMap;let p;const f=new WeakMap;let m=!1;try{m=typeof OffscreenCanvas<"u"&&new OffscreenCanvas(1,1).getContext("2d")!==null}catch{}function g(E,v){return m?new OffscreenCanvas(E,v):zi("canvas")}function _(E,v,F,J){let Z=1;if((E.width>J||E.height>J)&&(Z=J/Math.max(E.width,E.height)),Z<1||v===!0)if(typeof HTMLImageElement<"u"&&E instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&E instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&E instanceof ImageBitmap){const Q=v?fr:Math.floor,pe=Q(Z*E.width),oe=Q(Z*E.height);p===void 0&&(p=g(pe,oe));const ue=F?g(pe,oe):p;return ue.width=pe,ue.height=oe,ue.getContext("2d").drawImage(E,0,0,pe,oe),console.warn("THREE.WebGLRenderer: Texture has been resized from ("+E.width+"x"+E.height+") to ("+pe+"x"+oe+")."),ue}else return"data"in E&&console.warn("THREE.WebGLRenderer: Image in DataTexture is too big ("+E.width+"x"+E.height+")."),E;return E}function h(E){return ao(E.width)&&ao(E.height)}function u(E){return a?!1:E.wrapS!==Bt||E.wrapT!==Bt||E.minFilter!==St&&E.minFilter!==kt}function y(E,v){return E.generateMipmaps&&v&&E.minFilter!==St&&E.minFilter!==kt}function x(E){i.generateMipmap(E)}function T(E,v,F,J,Z=!1){if(a===!1)return v;if(E!==null){if(i[E]!==void 0)return i[E];console.warn("THREE.WebGLRenderer: Attempt to use non-existing WebGL internal format '"+E+"'")}let Q=v;if(v===i.RED&&(F===i.FLOAT&&(Q=i.R32F),F===i.HALF_FLOAT&&(Q=i.R16F),F===i.UNSIGNED_BYTE&&(Q=i.R8)),v===i.RED_INTEGER&&(F===i.UNSIGNED_BYTE&&(Q=i.R8UI),F===i.UNSIGNED_SHORT&&(Q=i.R16UI),F===i.UNSIGNED_INT&&(Q=i.R32UI),F===i.BYTE&&(Q=i.R8I),F===i.SHORT&&(Q=i.R16I),F===i.INT&&(Q=i.R32I)),v===i.RG&&(F===i.FLOAT&&(Q=i.RG32F),F===i.HALF_FLOAT&&(Q=i.RG16F),F===i.UNSIGNED_BYTE&&(Q=i.RG8)),v===i.RGBA){const pe=Z?ts:Ye.getTransfer(J);F===i.FLOAT&&(Q=i.RGBA32F),F===i.HALF_FLOAT&&(Q=i.RGBA16F),F===i.UNSIGNED_BYTE&&(Q=pe===Qe?i.SRGB8_ALPHA8:i.RGBA8),F===i.UNSIGNED_SHORT_4_4_4_4&&(Q=i.RGBA4),F===i.UNSIGNED_SHORT_5_5_5_1&&(Q=i.RGB5_A1)}return(Q===i.R16F||Q===i.R32F||Q===i.RG16F||Q===i.RG32F||Q===i.RGBA16F||Q===i.RGBA32F)&&e.get("EXT_color_buffer_float"),Q}function L(E,v,F){return y(E,F)===!0||E.isFramebufferTexture&&E.minFilter!==St&&E.minFilter!==kt?Math.log2(Math.max(v.width,v.height))+1:E.mipmaps!==void 0&&E.mipmaps.length>0?E.mipmaps.length:E.isCompressedTexture&&Array.isArray(E.image)?v.mipmaps.length:1}function w(E){return E===St||E===Sa||E===tr?i.NEAREST:i.LINEAR}function A(E){const v=E.target;v.removeEventListener("dispose",A),S(v),v.isVideoTexture&&d.delete(v)}function X(E){const v=E.target;v.removeEventListener("dispose",X),k(v)}function S(E){const v=n.get(E);if(v.__webglInit===void 0)return;const F=E.source,J=f.get(F);if(J){const Z=J[v.__cacheKey];Z.usedTimes--,Z.usedTimes===0&&b(E),Object.keys(J).length===0&&f.delete(F)}n.remove(E)}function b(E){const v=n.get(E);i.deleteTexture(v.__webglTexture);const F=E.source,J=f.get(F);delete J[v.__cacheKey],o.memory.textures--}function k(E){const v=E.texture,F=n.get(E),J=n.get(v);if(J.__webglTexture!==void 0&&(i.deleteTexture(J.__webglTexture),o.memory.textures--),E.depthTexture&&E.depthTexture.dispose(),E.isWebGLCubeRenderTarget)for(let Z=0;Z<6;Z++){if(Array.isArray(F.__webglFramebuffer[Z]))for(let Q=0;Q<F.__webglFramebuffer[Z].length;Q++)i.deleteFramebuffer(F.__webglFramebuffer[Z][Q]);else i.deleteFramebuffer(F.__webglFramebuffer[Z]);F.__webglDepthbuffer&&i.deleteRenderbuffer(F.__webglDepthbuffer[Z])}else{if(Array.isArray(F.__webglFramebuffer))for(let Z=0;Z<F.__webglFramebuffer.length;Z++)i.deleteFramebuffer(F.__webglFramebuffer[Z]);else i.deleteFramebuffer(F.__webglFramebuffer);if(F.__webglDepthbuffer&&i.deleteRenderbuffer(F.__webglDepthbuffer),F.__webglMultisampledFramebuffer&&i.deleteFramebuffer(F.__webglMultisampledFramebuffer),F.__webglColorRenderbuffer)for(let Z=0;Z<F.__webglColorRenderbuffer.length;Z++)F.__webglColorRenderbuffer[Z]&&i.deleteRenderbuffer(F.__webglColorRenderbuffer[Z]);F.__webglDepthRenderbuffer&&i.deleteRenderbuffer(F.__webglDepthRenderbuffer)}if(E.isWebGLMultipleRenderTargets)for(let Z=0,Q=v.length;Z<Q;Z++){const pe=n.get(v[Z]);pe.__webglTexture&&(i.deleteTexture(pe.__webglTexture),o.memory.textures--),n.remove(v[Z])}n.remove(v),n.remove(E)}let $=0;function ie(){$=0}function C(){const E=$;return E>=s.maxTextures&&console.warn("THREE.WebGLTextures: Trying to use "+E+" texture units while this GPU supports only "+s.maxTextures),$+=1,E}function z(E){const v=[];return v.push(E.wrapS),v.push(E.wrapT),v.push(E.wrapR||0),v.push(E.magFilter),v.push(E.minFilter),v.push(E.anisotropy),v.push(E.internalFormat),v.push(E.format),v.push(E.type),v.push(E.generateMipmaps),v.push(E.premultiplyAlpha),v.push(E.flipY),v.push(E.unpackAlignment),v.push(E.colorSpace),v.join()}function G(E,v){const F=n.get(E);if(E.isVideoTexture&&tt(E),E.isRenderTargetTexture===!1&&E.version>0&&F.__version!==E.version){const J=E.image;if(J===null)console.warn("THREE.WebGLRenderer: Texture marked for update but no image data found.");else if(J.complete===!1)console.warn("THREE.WebGLRenderer: Texture marked for update but image is incomplete");else{le(F,E,v);return}}t.bindTexture(i.TEXTURE_2D,F.__webglTexture,i.TEXTURE0+v)}function Y(E,v){const F=n.get(E);if(E.version>0&&F.__version!==E.version){le(F,E,v);return}t.bindTexture(i.TEXTURE_2D_ARRAY,F.__webglTexture,i.TEXTURE0+v)}function V(E,v){const F=n.get(E);if(E.version>0&&F.__version!==E.version){le(F,E,v);return}t.bindTexture(i.TEXTURE_3D,F.__webglTexture,i.TEXTURE0+v)}function D(E,v){const F=n.get(E);if(E.version>0&&F.__version!==E.version){fe(F,E,v);return}t.bindTexture(i.TEXTURE_CUBE_MAP,F.__webglTexture,i.TEXTURE0+v)}const W={[Qi]:i.REPEAT,[Bt]:i.CLAMP_TO_EDGE,[er]:i.MIRRORED_REPEAT},j={[St]:i.NEAREST,[Sa]:i.NEAREST_MIPMAP_NEAREST,[tr]:i.NEAREST_MIPMAP_LINEAR,[kt]:i.LINEAR,[Oc]:i.LINEAR_MIPMAP_NEAREST,[Ii]:i.LINEAR_MIPMAP_LINEAR},ae={[$c]:i.NEVER,[tu]:i.ALWAYS,[Kc]:i.LESS,[io]:i.LEQUAL,[Zc]:i.EQUAL,[eu]:i.GEQUAL,[Jc]:i.GREATER,[Qc]:i.NOTEQUAL};function H(E,v,F){if(F?(i.texParameteri(E,i.TEXTURE_WRAP_S,W[v.wrapS]),i.texParameteri(E,i.TEXTURE_WRAP_T,W[v.wrapT]),(E===i.TEXTURE_3D||E===i.TEXTURE_2D_ARRAY)&&i.texParameteri(E,i.TEXTURE_WRAP_R,W[v.wrapR]),i.texParameteri(E,i.TEXTURE_MAG_FILTER,j[v.magFilter]),i.texParameteri(E,i.TEXTURE_MIN_FILTER,j[v.minFilter])):(i.texParameteri(E,i.TEXTURE_WRAP_S,i.CLAMP_TO_EDGE),i.texParameteri(E,i.TEXTURE_WRAP_T,i.CLAMP_TO_EDGE),(E===i.TEXTURE_3D||E===i.TEXTURE_2D_ARRAY)&&i.texParameteri(E,i.TEXTURE_WRAP_R,i.CLAMP_TO_EDGE),(v.wrapS!==Bt||v.wrapT!==Bt)&&console.warn("THREE.WebGLRenderer: Texture is not power of two. Texture.wrapS and Texture.wrapT should be set to THREE.ClampToEdgeWrapping."),i.texParameteri(E,i.TEXTURE_MAG_FILTER,w(v.magFilter)),i.texParameteri(E,i.TEXTURE_MIN_FILTER,w(v.minFilter)),v.minFilter!==St&&v.minFilter!==kt&&console.warn("THREE.WebGLRenderer: Texture is not power of two. Texture.minFilter should be set to THREE.NearestFilter or THREE.LinearFilter.")),v.compareFunction&&(i.texParameteri(E,i.TEXTURE_COMPARE_MODE,i.COMPARE_REF_TO_TEXTURE),i.texParameteri(E,i.TEXTURE_COMPARE_FUNC,ae[v.compareFunction])),e.has("EXT_texture_filter_anisotropic")===!0){const J=e.get("EXT_texture_filter_anisotropic");if(v.magFilter===St||v.minFilter!==tr&&v.minFilter!==Ii||v.type===En&&e.has("OES_texture_float_linear")===!1||a===!1&&v.type===Ni&&e.has("OES_texture_half_float_linear")===!1)return;(v.anisotropy>1||n.get(v).__currentAnisotropy)&&(i.texParameterf(E,J.TEXTURE_MAX_ANISOTROPY_EXT,Math.min(v.anisotropy,s.getMaxAnisotropy())),n.get(v).__currentAnisotropy=v.anisotropy)}}function q(E,v){let F=!1;E.__webglInit===void 0&&(E.__webglInit=!0,v.addEventListener("dispose",A));const J=v.source;let Z=f.get(J);Z===void 0&&(Z={},f.set(J,Z));const Q=z(v);if(Q!==E.__cacheKey){Z[Q]===void 0&&(Z[Q]={texture:i.createTexture(),usedTimes:0},o.memory.textures++,F=!0),Z[Q].usedTimes++;const pe=Z[E.__cacheKey];pe!==void 0&&(Z[E.__cacheKey].usedTimes--,pe.usedTimes===0&&b(v)),E.__cacheKey=Q,E.__webglTexture=Z[Q].texture}return F}function le(E,v,F){let J=i.TEXTURE_2D;(v.isDataArrayTexture||v.isCompressedArrayTexture)&&(J=i.TEXTURE_2D_ARRAY),v.isData3DTexture&&(J=i.TEXTURE_3D);const Z=q(E,v),Q=v.source;t.bindTexture(J,E.__webglTexture,i.TEXTURE0+F);const pe=n.get(Q);if(Q.version!==pe.__version||Z===!0){t.activeTexture(i.TEXTURE0+F);const oe=Ye.getPrimaries(Ye.workingColorSpace),ue=v.colorSpace===Ht?null:Ye.getPrimaries(v.colorSpace),Ee=v.colorSpace===Ht||oe===ue?i.NONE:i.BROWSER_DEFAULT_WEBGL;i.pixelStorei(i.UNPACK_FLIP_Y_WEBGL,v.flipY),i.pixelStorei(i.UNPACK_PREMULTIPLY_ALPHA_WEBGL,v.premultiplyAlpha),i.pixelStorei(i.UNPACK_ALIGNMENT,v.unpackAlignment),i.pixelStorei(i.UNPACK_COLORSPACE_CONVERSION_WEBGL,Ee);const ze=u(v)&&h(v.image)===!1;let K=_(v.image,ze,!1,s.maxTextureSize);K=Oe(v,K);const $e=h(K)||a,Ve=r.convert(v.format,v.colorSpace);let Ae=r.convert(v.type),xe=T(v.internalFormat,Ve,Ae,v.colorSpace,v.isVideoTexture);H(J,v,$e);let de;const Fe=v.mipmaps,je=a&&v.isVideoTexture!==!0&&xe!==Da,it=pe.__version===void 0||Z===!0,He=L(v,K,$e);if(v.isDepthTexture)xe=i.DEPTH_COMPONENT,a?v.type===En?xe=i.DEPTH_COMPONENT32F:v.type===yn?xe=i.DEPTH_COMPONENT24:v.type===Fn?xe=i.DEPTH24_STENCIL8:xe=i.DEPTH_COMPONENT16:v.type===En&&console.error("WebGLRenderer: Floating point depth texture requires WebGL2."),v.format===On&&xe===i.DEPTH_COMPONENT&&v.type!==nr&&v.type!==yn&&(console.warn("THREE.WebGLRenderer: Use UnsignedShortType or UnsignedIntType for DepthFormat DepthTexture."),v.type=yn,Ae=r.convert(v.type)),v.format===ii&&xe===i.DEPTH_COMPONENT&&(xe=i.DEPTH_STENCIL,v.type!==Fn&&(console.warn("THREE.WebGLRenderer: Use UnsignedInt248Type for DepthStencilFormat DepthTexture."),v.type=Fn,Ae=r.convert(v.type))),it&&(je?t.texStorage2D(i.TEXTURE_2D,1,xe,K.width,K.height):t.texImage2D(i.TEXTURE_2D,0,xe,K.width,K.height,0,Ve,Ae,null));else if(v.isDataTexture)if(Fe.length>0&&$e){je&&it&&t.texStorage2D(i.TEXTURE_2D,He,xe,Fe[0].width,Fe[0].height);for(let ne=0,R=Fe.length;ne<R;ne++)de=Fe[ne],je?t.texSubImage2D(i.TEXTURE_2D,ne,0,0,de.width,de.height,Ve,Ae,de.data):t.texImage2D(i.TEXTURE_2D,ne,xe,de.width,de.height,0,Ve,Ae,de.data);v.generateMipmaps=!1}else je?(it&&t.texStorage2D(i.TEXTURE_2D,He,xe,K.width,K.height),t.texSubImage2D(i.TEXTURE_2D,0,0,0,K.width,K.height,Ve,Ae,K.data)):t.texImage2D(i.TEXTURE_2D,0,xe,K.width,K.height,0,Ve,Ae,K.data);else if(v.isCompressedTexture)if(v.isCompressedArrayTexture){je&&it&&t.texStorage3D(i.TEXTURE_2D_ARRAY,He,xe,Fe[0].width,Fe[0].height,K.depth);for(let ne=0,R=Fe.length;ne<R;ne++)de=Fe[ne],v.format!==qt?Ve!==null?je?t.compressedTexSubImage3D(i.TEXTURE_2D_ARRAY,ne,0,0,0,de.width,de.height,K.depth,Ve,de.data,0,0):t.compressedTexImage3D(i.TEXTURE_2D_ARRAY,ne,xe,de.width,de.height,K.depth,0,de.data,0,0):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()"):je?t.texSubImage3D(i.TEXTURE_2D_ARRAY,ne,0,0,0,de.width,de.height,K.depth,Ve,Ae,de.data):t.texImage3D(i.TEXTURE_2D_ARRAY,ne,xe,de.width,de.height,K.depth,0,Ve,Ae,de.data)}else{je&&it&&t.texStorage2D(i.TEXTURE_2D,He,xe,Fe[0].width,Fe[0].height);for(let ne=0,R=Fe.length;ne<R;ne++)de=Fe[ne],v.format!==qt?Ve!==null?je?t.compressedTexSubImage2D(i.TEXTURE_2D,ne,0,0,de.width,de.height,Ve,de.data):t.compressedTexImage2D(i.TEXTURE_2D,ne,xe,de.width,de.height,0,de.data):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()"):je?t.texSubImage2D(i.TEXTURE_2D,ne,0,0,de.width,de.height,Ve,Ae,de.data):t.texImage2D(i.TEXTURE_2D,ne,xe,de.width,de.height,0,Ve,Ae,de.data)}else if(v.isDataArrayTexture)je?(it&&t.texStorage3D(i.TEXTURE_2D_ARRAY,He,xe,K.width,K.height,K.depth),t.texSubImage3D(i.TEXTURE_2D_ARRAY,0,0,0,0,K.width,K.height,K.depth,Ve,Ae,K.data)):t.texImage3D(i.TEXTURE_2D_ARRAY,0,xe,K.width,K.height,K.depth,0,Ve,Ae,K.data);else if(v.isData3DTexture)je?(it&&t.texStorage3D(i.TEXTURE_3D,He,xe,K.width,K.height,K.depth),t.texSubImage3D(i.TEXTURE_3D,0,0,0,0,K.width,K.height,K.depth,Ve,Ae,K.data)):t.texImage3D(i.TEXTURE_3D,0,xe,K.width,K.height,K.depth,0,Ve,Ae,K.data);else if(v.isFramebufferTexture){if(it)if(je)t.texStorage2D(i.TEXTURE_2D,He,xe,K.width,K.height);else{let ne=K.width,R=K.height;for(let se=0;se<He;se++)t.texImage2D(i.TEXTURE_2D,se,xe,ne,R,0,Ve,Ae,null),ne>>=1,R>>=1}}else if(Fe.length>0&&$e){je&&it&&t.texStorage2D(i.TEXTURE_2D,He,xe,Fe[0].width,Fe[0].height);for(let ne=0,R=Fe.length;ne<R;ne++)de=Fe[ne],je?t.texSubImage2D(i.TEXTURE_2D,ne,0,0,Ve,Ae,de):t.texImage2D(i.TEXTURE_2D,ne,xe,Ve,Ae,de);v.generateMipmaps=!1}else je?(it&&t.texStorage2D(i.TEXTURE_2D,He,xe,K.width,K.height),t.texSubImage2D(i.TEXTURE_2D,0,0,0,Ve,Ae,K)):t.texImage2D(i.TEXTURE_2D,0,xe,Ve,Ae,K);y(v,$e)&&x(J),pe.__version=Q.version,v.onUpdate&&v.onUpdate(v)}E.__version=v.version}function fe(E,v,F){if(v.image.length!==6)return;const J=q(E,v),Z=v.source;t.bindTexture(i.TEXTURE_CUBE_MAP,E.__webglTexture,i.TEXTURE0+F);const Q=n.get(Z);if(Z.version!==Q.__version||J===!0){t.activeTexture(i.TEXTURE0+F);const pe=Ye.getPrimaries(Ye.workingColorSpace),oe=v.colorSpace===Ht?null:Ye.getPrimaries(v.colorSpace),ue=v.colorSpace===Ht||pe===oe?i.NONE:i.BROWSER_DEFAULT_WEBGL;i.pixelStorei(i.UNPACK_FLIP_Y_WEBGL,v.flipY),i.pixelStorei(i.UNPACK_PREMULTIPLY_ALPHA_WEBGL,v.premultiplyAlpha),i.pixelStorei(i.UNPACK_ALIGNMENT,v.unpackAlignment),i.pixelStorei(i.UNPACK_COLORSPACE_CONVERSION_WEBGL,ue);const Ee=v.isCompressedTexture||v.image[0].isCompressedTexture,ze=v.image[0]&&v.image[0].isDataTexture,K=[];for(let ne=0;ne<6;ne++)!Ee&&!ze?K[ne]=_(v.image[ne],!1,!0,s.maxCubemapSize):K[ne]=ze?v.image[ne].image:v.image[ne],K[ne]=Oe(v,K[ne]);const $e=K[0],Ve=h($e)||a,Ae=r.convert(v.format,v.colorSpace),xe=r.convert(v.type),de=T(v.internalFormat,Ae,xe,v.colorSpace),Fe=a&&v.isVideoTexture!==!0,je=Q.__version===void 0||J===!0;let it=L(v,$e,Ve);H(i.TEXTURE_CUBE_MAP,v,Ve);let He;if(Ee){Fe&&je&&t.texStorage2D(i.TEXTURE_CUBE_MAP,it,de,$e.width,$e.height);for(let ne=0;ne<6;ne++){He=K[ne].mipmaps;for(let R=0;R<He.length;R++){const se=He[R];v.format!==qt?Ae!==null?Fe?t.compressedTexSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+ne,R,0,0,se.width,se.height,Ae,se.data):t.compressedTexImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+ne,R,de,se.width,se.height,0,se.data):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .setTextureCube()"):Fe?t.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+ne,R,0,0,se.width,se.height,Ae,xe,se.data):t.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+ne,R,de,se.width,se.height,0,Ae,xe,se.data)}}}else{He=v.mipmaps,Fe&&je&&(He.length>0&&it++,t.texStorage2D(i.TEXTURE_CUBE_MAP,it,de,K[0].width,K[0].height));for(let ne=0;ne<6;ne++)if(ze){Fe?t.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+ne,0,0,0,K[ne].width,K[ne].height,Ae,xe,K[ne].data):t.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+ne,0,de,K[ne].width,K[ne].height,0,Ae,xe,K[ne].data);for(let R=0;R<He.length;R++){const re=He[R].image[ne].image;Fe?t.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+ne,R+1,0,0,re.width,re.height,Ae,xe,re.data):t.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+ne,R+1,de,re.width,re.height,0,Ae,xe,re.data)}}else{Fe?t.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+ne,0,0,0,Ae,xe,K[ne]):t.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+ne,0,de,Ae,xe,K[ne]);for(let R=0;R<He.length;R++){const se=He[R];Fe?t.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+ne,R+1,0,0,Ae,xe,se.image[ne]):t.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+ne,R+1,de,Ae,xe,se.image[ne])}}}y(v,Ve)&&x(i.TEXTURE_CUBE_MAP),Q.__version=Z.version,v.onUpdate&&v.onUpdate(v)}E.__version=v.version}function ge(E,v,F,J,Z,Q){const pe=r.convert(F.format,F.colorSpace),oe=r.convert(F.type),ue=T(F.internalFormat,pe,oe,F.colorSpace);if(!n.get(v).__hasExternalTextures){const ze=Math.max(1,v.width>>Q),K=Math.max(1,v.height>>Q);Z===i.TEXTURE_3D||Z===i.TEXTURE_2D_ARRAY?t.texImage3D(Z,Q,ue,ze,K,v.depth,0,pe,oe,null):t.texImage2D(Z,Q,ue,ze,K,0,pe,oe,null)}t.bindFramebuffer(i.FRAMEBUFFER,E),he(v)?l.framebufferTexture2DMultisampleEXT(i.FRAMEBUFFER,J,Z,n.get(F).__webglTexture,0,Ce(v)):(Z===i.TEXTURE_2D||Z>=i.TEXTURE_CUBE_MAP_POSITIVE_X&&Z<=i.TEXTURE_CUBE_MAP_NEGATIVE_Z)&&i.framebufferTexture2D(i.FRAMEBUFFER,J,Z,n.get(F).__webglTexture,Q),t.bindFramebuffer(i.FRAMEBUFFER,null)}function De(E,v,F){if(i.bindRenderbuffer(i.RENDERBUFFER,E),v.depthBuffer&&!v.stencilBuffer){let J=a===!0?i.DEPTH_COMPONENT24:i.DEPTH_COMPONENT16;if(F||he(v)){const Z=v.depthTexture;Z&&Z.isDepthTexture&&(Z.type===En?J=i.DEPTH_COMPONENT32F:Z.type===yn&&(J=i.DEPTH_COMPONENT24));const Q=Ce(v);he(v)?l.renderbufferStorageMultisampleEXT(i.RENDERBUFFER,Q,J,v.width,v.height):i.renderbufferStorageMultisample(i.RENDERBUFFER,Q,J,v.width,v.height)}else i.renderbufferStorage(i.RENDERBUFFER,J,v.width,v.height);i.framebufferRenderbuffer(i.FRAMEBUFFER,i.DEPTH_ATTACHMENT,i.RENDERBUFFER,E)}else if(v.depthBuffer&&v.stencilBuffer){const J=Ce(v);F&&he(v)===!1?i.renderbufferStorageMultisample(i.RENDERBUFFER,J,i.DEPTH24_STENCIL8,v.width,v.height):he(v)?l.renderbufferStorageMultisampleEXT(i.RENDERBUFFER,J,i.DEPTH24_STENCIL8,v.width,v.height):i.renderbufferStorage(i.RENDERBUFFER,i.DEPTH_STENCIL,v.width,v.height),i.framebufferRenderbuffer(i.FRAMEBUFFER,i.DEPTH_STENCIL_ATTACHMENT,i.RENDERBUFFER,E)}else{const J=v.isWebGLMultipleRenderTargets===!0?v.texture:[v.texture];for(let Z=0;Z<J.length;Z++){const Q=J[Z],pe=r.convert(Q.format,Q.colorSpace),oe=r.convert(Q.type),ue=T(Q.internalFormat,pe,oe,Q.colorSpace),Ee=Ce(v);F&&he(v)===!1?i.renderbufferStorageMultisample(i.RENDERBUFFER,Ee,ue,v.width,v.height):he(v)?l.renderbufferStorageMultisampleEXT(i.RENDERBUFFER,Ee,ue,v.width,v.height):i.renderbufferStorage(i.RENDERBUFFER,ue,v.width,v.height)}}i.bindRenderbuffer(i.RENDERBUFFER,null)}function Ne(E,v){if(v&&v.isWebGLCubeRenderTarget)throw new Error("Depth Texture with cube render targets is not supported");if(t.bindFramebuffer(i.FRAMEBUFFER,E),!(v.depthTexture&&v.depthTexture.isDepthTexture))throw new Error("renderTarget.depthTexture must be an instance of THREE.DepthTexture");(!n.get(v.depthTexture).__webglTexture||v.depthTexture.image.width!==v.width||v.depthTexture.image.height!==v.height)&&(v.depthTexture.image.width=v.width,v.depthTexture.image.height=v.height,v.depthTexture.needsUpdate=!0),G(v.depthTexture,0);const J=n.get(v.depthTexture).__webglTexture,Z=Ce(v);if(v.depthTexture.format===On)he(v)?l.framebufferTexture2DMultisampleEXT(i.FRAMEBUFFER,i.DEPTH_ATTACHMENT,i.TEXTURE_2D,J,0,Z):i.framebufferTexture2D(i.FRAMEBUFFER,i.DEPTH_ATTACHMENT,i.TEXTURE_2D,J,0);else if(v.depthTexture.format===ii)he(v)?l.framebufferTexture2DMultisampleEXT(i.FRAMEBUFFER,i.DEPTH_STENCIL_ATTACHMENT,i.TEXTURE_2D,J,0,Z):i.framebufferTexture2D(i.FRAMEBUFFER,i.DEPTH_STENCIL_ATTACHMENT,i.TEXTURE_2D,J,0);else throw new Error("Unknown depthTexture format")}function be(E){const v=n.get(E),F=E.isWebGLCubeRenderTarget===!0;if(E.depthTexture&&!v.__autoAllocateDepthBuffer){if(F)throw new Error("target.depthTexture not supported in Cube render targets");Ne(v.__webglFramebuffer,E)}else if(F){v.__webglDepthbuffer=[];for(let J=0;J<6;J++)t.bindFramebuffer(i.FRAMEBUFFER,v.__webglFramebuffer[J]),v.__webglDepthbuffer[J]=i.createRenderbuffer(),De(v.__webglDepthbuffer[J],E,!1)}else t.bindFramebuffer(i.FRAMEBUFFER,v.__webglFramebuffer),v.__webglDepthbuffer=i.createRenderbuffer(),De(v.__webglDepthbuffer,E,!1);t.bindFramebuffer(i.FRAMEBUFFER,null)}function Xe(E,v,F){const J=n.get(E);v!==void 0&&ge(J.__webglFramebuffer,E,E.texture,i.COLOR_ATTACHMENT0,i.TEXTURE_2D,0),F!==void 0&&be(E)}function I(E){const v=E.texture,F=n.get(E),J=n.get(v);E.addEventListener("dispose",X),E.isWebGLMultipleRenderTargets!==!0&&(J.__webglTexture===void 0&&(J.__webglTexture=i.createTexture()),J.__version=v.version,o.memory.textures++);const Z=E.isWebGLCubeRenderTarget===!0,Q=E.isWebGLMultipleRenderTargets===!0,pe=h(E)||a;if(Z){F.__webglFramebuffer=[];for(let oe=0;oe<6;oe++)if(a&&v.mipmaps&&v.mipmaps.length>0){F.__webglFramebuffer[oe]=[];for(let ue=0;ue<v.mipmaps.length;ue++)F.__webglFramebuffer[oe][ue]=i.createFramebuffer()}else F.__webglFramebuffer[oe]=i.createFramebuffer()}else{if(a&&v.mipmaps&&v.mipmaps.length>0){F.__webglFramebuffer=[];for(let oe=0;oe<v.mipmaps.length;oe++)F.__webglFramebuffer[oe]=i.createFramebuffer()}else F.__webglFramebuffer=i.createFramebuffer();if(Q)if(s.drawBuffers){const oe=E.texture;for(let ue=0,Ee=oe.length;ue<Ee;ue++){const ze=n.get(oe[ue]);ze.__webglTexture===void 0&&(ze.__webglTexture=i.createTexture(),o.memory.textures++)}}else console.warn("THREE.WebGLRenderer: WebGLMultipleRenderTargets can only be used with WebGL2 or WEBGL_draw_buffers extension.");if(a&&E.samples>0&&he(E)===!1){const oe=Q?v:[v];F.__webglMultisampledFramebuffer=i.createFramebuffer(),F.__webglColorRenderbuffer=[],t.bindFramebuffer(i.FRAMEBUFFER,F.__webglMultisampledFramebuffer);for(let ue=0;ue<oe.length;ue++){const Ee=oe[ue];F.__webglColorRenderbuffer[ue]=i.createRenderbuffer(),i.bindRenderbuffer(i.RENDERBUFFER,F.__webglColorRenderbuffer[ue]);const ze=r.convert(Ee.format,Ee.colorSpace),K=r.convert(Ee.type),$e=T(Ee.internalFormat,ze,K,Ee.colorSpace,E.isXRRenderTarget===!0),Ve=Ce(E);i.renderbufferStorageMultisample(i.RENDERBUFFER,Ve,$e,E.width,E.height),i.framebufferRenderbuffer(i.FRAMEBUFFER,i.COLOR_ATTACHMENT0+ue,i.RENDERBUFFER,F.__webglColorRenderbuffer[ue])}i.bindRenderbuffer(i.RENDERBUFFER,null),E.depthBuffer&&(F.__webglDepthRenderbuffer=i.createRenderbuffer(),De(F.__webglDepthRenderbuffer,E,!0)),t.bindFramebuffer(i.FRAMEBUFFER,null)}}if(Z){t.bindTexture(i.TEXTURE_CUBE_MAP,J.__webglTexture),H(i.TEXTURE_CUBE_MAP,v,pe);for(let oe=0;oe<6;oe++)if(a&&v.mipmaps&&v.mipmaps.length>0)for(let ue=0;ue<v.mipmaps.length;ue++)ge(F.__webglFramebuffer[oe][ue],E,v,i.COLOR_ATTACHMENT0,i.TEXTURE_CUBE_MAP_POSITIVE_X+oe,ue);else ge(F.__webglFramebuffer[oe],E,v,i.COLOR_ATTACHMENT0,i.TEXTURE_CUBE_MAP_POSITIVE_X+oe,0);y(v,pe)&&x(i.TEXTURE_CUBE_MAP),t.unbindTexture()}else if(Q){const oe=E.texture;for(let ue=0,Ee=oe.length;ue<Ee;ue++){const ze=oe[ue],K=n.get(ze);t.bindTexture(i.TEXTURE_2D,K.__webglTexture),H(i.TEXTURE_2D,ze,pe),ge(F.__webglFramebuffer,E,ze,i.COLOR_ATTACHMENT0+ue,i.TEXTURE_2D,0),y(ze,pe)&&x(i.TEXTURE_2D)}t.unbindTexture()}else{let oe=i.TEXTURE_2D;if((E.isWebGL3DRenderTarget||E.isWebGLArrayRenderTarget)&&(a?oe=E.isWebGL3DRenderTarget?i.TEXTURE_3D:i.TEXTURE_2D_ARRAY:console.error("THREE.WebGLTextures: THREE.Data3DTexture and THREE.DataArrayTexture only supported with WebGL2.")),t.bindTexture(oe,J.__webglTexture),H(oe,v,pe),a&&v.mipmaps&&v.mipmaps.length>0)for(let ue=0;ue<v.mipmaps.length;ue++)ge(F.__webglFramebuffer[ue],E,v,i.COLOR_ATTACHMENT0,oe,ue);else ge(F.__webglFramebuffer,E,v,i.COLOR_ATTACHMENT0,oe,0);y(v,pe)&&x(oe),t.unbindTexture()}E.depthBuffer&&be(E)}function Tt(E){const v=h(E)||a,F=E.isWebGLMultipleRenderTargets===!0?E.texture:[E.texture];for(let J=0,Z=F.length;J<Z;J++){const Q=F[J];if(y(Q,v)){const pe=E.isWebGLCubeRenderTarget?i.TEXTURE_CUBE_MAP:i.TEXTURE_2D,oe=n.get(Q).__webglTexture;t.bindTexture(pe,oe),x(pe),t.unbindTexture()}}}function ve(E){if(a&&E.samples>0&&he(E)===!1){const v=E.isWebGLMultipleRenderTargets?E.texture:[E.texture],F=E.width,J=E.height;let Z=i.COLOR_BUFFER_BIT;const Q=[],pe=E.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT,oe=n.get(E),ue=E.isWebGLMultipleRenderTargets===!0;if(ue)for(let Ee=0;Ee<v.length;Ee++)t.bindFramebuffer(i.FRAMEBUFFER,oe.__webglMultisampledFramebuffer),i.framebufferRenderbuffer(i.FRAMEBUFFER,i.COLOR_ATTACHMENT0+Ee,i.RENDERBUFFER,null),t.bindFramebuffer(i.FRAMEBUFFER,oe.__webglFramebuffer),i.framebufferTexture2D(i.DRAW_FRAMEBUFFER,i.COLOR_ATTACHMENT0+Ee,i.TEXTURE_2D,null,0);t.bindFramebuffer(i.READ_FRAMEBUFFER,oe.__webglMultisampledFramebuffer),t.bindFramebuffer(i.DRAW_FRAMEBUFFER,oe.__webglFramebuffer);for(let Ee=0;Ee<v.length;Ee++){Q.push(i.COLOR_ATTACHMENT0+Ee),E.depthBuffer&&Q.push(pe);const ze=oe.__ignoreDepthValues!==void 0?oe.__ignoreDepthValues:!1;if(ze===!1&&(E.depthBuffer&&(Z|=i.DEPTH_BUFFER_BIT),E.stencilBuffer&&(Z|=i.STENCIL_BUFFER_BIT)),ue&&i.framebufferRenderbuffer(i.READ_FRAMEBUFFER,i.COLOR_ATTACHMENT0,i.RENDERBUFFER,oe.__webglColorRenderbuffer[Ee]),ze===!0&&(i.invalidateFramebuffer(i.READ_FRAMEBUFFER,[pe]),i.invalidateFramebuffer(i.DRAW_FRAMEBUFFER,[pe])),ue){const K=n.get(v[Ee]).__webglTexture;i.framebufferTexture2D(i.DRAW_FRAMEBUFFER,i.COLOR_ATTACHMENT0,i.TEXTURE_2D,K,0)}i.blitFramebuffer(0,0,F,J,0,0,F,J,Z,i.NEAREST),c&&i.invalidateFramebuffer(i.READ_FRAMEBUFFER,Q)}if(t.bindFramebuffer(i.READ_FRAMEBUFFER,null),t.bindFramebuffer(i.DRAW_FRAMEBUFFER,null),ue)for(let Ee=0;Ee<v.length;Ee++){t.bindFramebuffer(i.FRAMEBUFFER,oe.__webglMultisampledFramebuffer),i.framebufferRenderbuffer(i.FRAMEBUFFER,i.COLOR_ATTACHMENT0+Ee,i.RENDERBUFFER,oe.__webglColorRenderbuffer[Ee]);const ze=n.get(v[Ee]).__webglTexture;t.bindFramebuffer(i.FRAMEBUFFER,oe.__webglFramebuffer),i.framebufferTexture2D(i.DRAW_FRAMEBUFFER,i.COLOR_ATTACHMENT0+Ee,i.TEXTURE_2D,ze,0)}t.bindFramebuffer(i.DRAW_FRAMEBUFFER,oe.__webglMultisampledFramebuffer)}}function Ce(E){return Math.min(s.maxSamples,E.samples)}function he(E){const v=n.get(E);return a&&E.samples>0&&e.has("WEBGL_multisampled_render_to_texture")===!0&&v.__useRenderToTexture!==!1}function tt(E){const v=o.render.frame;d.get(E)!==v&&(d.set(E,v),E.update())}function Oe(E,v){const F=E.colorSpace,J=E.format,Z=E.type;return E.isCompressedTexture===!0||E.isVideoTexture===!0||E.format===cr||F!==sn&&F!==Ht&&(Ye.getTransfer(F)===Qe?a===!1?e.has("EXT_sRGB")===!0&&J===qt?(E.format=cr,E.minFilter=kt,E.generateMipmaps=!1):v=ho.sRGBToLinear(v):(J!==qt||Z!==Sn)&&console.warn("THREE.WebGLTextures: sRGB encoded textures have to use RGBAFormat and UnsignedByteType."):console.error("THREE.WebGLTextures: Unsupported texture color space:",F)),v}this.allocateTextureUnit=C,this.resetTextureUnits=ie,this.setTexture2D=G,this.setTexture2DArray=Y,this.setTexture3D=V,this.setTextureCube=D,this.rebindTextures=Xe,this.setupRenderTarget=I,this.updateRenderTargetMipmap=Tt,this.updateMultisampleRenderTarget=ve,this.setupDepthRenderbuffer=be,this.setupFrameBufferTexture=ge,this.useMultisampledRTT=he}function Ep(i,e,t){const n=t.isWebGL2;function s(r,o=Ht){let a;const l=Ye.getTransfer(o);if(r===Sn)return i.UNSIGNED_BYTE;if(r===Ea)return i.UNSIGNED_SHORT_4_4_4_4;if(r===ba)return i.UNSIGNED_SHORT_5_5_5_1;if(r===zc)return i.BYTE;if(r===Bc)return i.SHORT;if(r===nr)return i.UNSIGNED_SHORT;if(r===ya)return i.INT;if(r===yn)return i.UNSIGNED_INT;if(r===En)return i.FLOAT;if(r===Ni)return n?i.HALF_FLOAT:(a=e.get("OES_texture_half_float"),a!==null?a.HALF_FLOAT_OES:null);if(r===kc)return i.ALPHA;if(r===qt)return i.RGBA;if(r===Hc)return i.LUMINANCE;if(r===Gc)return i.LUMINANCE_ALPHA;if(r===On)return i.DEPTH_COMPONENT;if(r===ii)return i.DEPTH_STENCIL;if(r===cr)return a=e.get("EXT_sRGB"),a!==null?a.SRGB_ALPHA_EXT:null;if(r===Vc)return i.RED;if(r===Ta)return i.RED_INTEGER;if(r===Wc)return i.RG;if(r===wa)return i.RG_INTEGER;if(r===Aa)return i.RGBA_INTEGER;if(r===ir||r===sr||r===rr||r===ar)if(l===Qe)if(a=e.get("WEBGL_compressed_texture_s3tc_srgb"),a!==null){if(r===ir)return a.COMPRESSED_SRGB_S3TC_DXT1_EXT;if(r===sr)return a.COMPRESSED_SRGB_ALPHA_S3TC_DXT1_EXT;if(r===rr)return a.COMPRESSED_SRGB_ALPHA_S3TC_DXT3_EXT;if(r===ar)return a.COMPRESSED_SRGB_ALPHA_S3TC_DXT5_EXT}else return null;else if(a=e.get("WEBGL_compressed_texture_s3tc"),a!==null){if(r===ir)return a.COMPRESSED_RGB_S3TC_DXT1_EXT;if(r===sr)return a.COMPRESSED_RGBA_S3TC_DXT1_EXT;if(r===rr)return a.COMPRESSED_RGBA_S3TC_DXT3_EXT;if(r===ar)return a.COMPRESSED_RGBA_S3TC_DXT5_EXT}else return null;if(r===Ra||r===Ca||r===La||r===Pa)if(a=e.get("WEBGL_compressed_texture_pvrtc"),a!==null){if(r===Ra)return a.COMPRESSED_RGB_PVRTC_4BPPV1_IMG;if(r===Ca)return a.COMPRESSED_RGB_PVRTC_2BPPV1_IMG;if(r===La)return a.COMPRESSED_RGBA_PVRTC_4BPPV1_IMG;if(r===Pa)return a.COMPRESSED_RGBA_PVRTC_2BPPV1_IMG}else return null;if(r===Da)return a=e.get("WEBGL_compressed_texture_etc1"),a!==null?a.COMPRESSED_RGB_ETC1_WEBGL:null;if(r===Ua||r===Ia)if(a=e.get("WEBGL_compressed_texture_etc"),a!==null){if(r===Ua)return l===Qe?a.COMPRESSED_SRGB8_ETC2:a.COMPRESSED_RGB8_ETC2;if(r===Ia)return l===Qe?a.COMPRESSED_SRGB8_ALPHA8_ETC2_EAC:a.COMPRESSED_RGBA8_ETC2_EAC}else return null;if(r===Na||r===Fa||r===Oa||r===za||r===Ba||r===ka||r===Ha||r===Ga||r===Va||r===Wa||r===Xa||r===qa||r===ja||r===Ya)if(a=e.get("WEBGL_compressed_texture_astc"),a!==null){if(r===Na)return l===Qe?a.COMPRESSED_SRGB8_ALPHA8_ASTC_4x4_KHR:a.COMPRESSED_RGBA_ASTC_4x4_KHR;if(r===Fa)return l===Qe?a.COMPRESSED_SRGB8_ALPHA8_ASTC_5x4_KHR:a.COMPRESSED_RGBA_ASTC_5x4_KHR;if(r===Oa)return l===Qe?a.COMPRESSED_SRGB8_ALPHA8_ASTC_5x5_KHR:a.COMPRESSED_RGBA_ASTC_5x5_KHR;if(r===za)return l===Qe?a.COMPRESSED_SRGB8_ALPHA8_ASTC_6x5_KHR:a.COMPRESSED_RGBA_ASTC_6x5_KHR;if(r===Ba)return l===Qe?a.COMPRESSED_SRGB8_ALPHA8_ASTC_6x6_KHR:a.COMPRESSED_RGBA_ASTC_6x6_KHR;if(r===ka)return l===Qe?a.COMPRESSED_SRGB8_ALPHA8_ASTC_8x5_KHR:a.COMPRESSED_RGBA_ASTC_8x5_KHR;if(r===Ha)return l===Qe?a.COMPRESSED_SRGB8_ALPHA8_ASTC_8x6_KHR:a.COMPRESSED_RGBA_ASTC_8x6_KHR;if(r===Ga)return l===Qe?a.COMPRESSED_SRGB8_ALPHA8_ASTC_8x8_KHR:a.COMPRESSED_RGBA_ASTC_8x8_KHR;if(r===Va)return l===Qe?a.COMPRESSED_SRGB8_ALPHA8_ASTC_10x5_KHR:a.COMPRESSED_RGBA_ASTC_10x5_KHR;if(r===Wa)return l===Qe?a.COMPRESSED_SRGB8_ALPHA8_ASTC_10x6_KHR:a.COMPRESSED_RGBA_ASTC_10x6_KHR;if(r===Xa)return l===Qe?a.COMPRESSED_SRGB8_ALPHA8_ASTC_10x8_KHR:a.COMPRESSED_RGBA_ASTC_10x8_KHR;if(r===qa)return l===Qe?a.COMPRESSED_SRGB8_ALPHA8_ASTC_10x10_KHR:a.COMPRESSED_RGBA_ASTC_10x10_KHR;if(r===ja)return l===Qe?a.COMPRESSED_SRGB8_ALPHA8_ASTC_12x10_KHR:a.COMPRESSED_RGBA_ASTC_12x10_KHR;if(r===Ya)return l===Qe?a.COMPRESSED_SRGB8_ALPHA8_ASTC_12x12_KHR:a.COMPRESSED_RGBA_ASTC_12x12_KHR}else return null;if(r===or||r===$a||r===Ka)if(a=e.get("EXT_texture_compression_bptc"),a!==null){if(r===or)return l===Qe?a.COMPRESSED_SRGB_ALPHA_BPTC_UNORM_EXT:a.COMPRESSED_RGBA_BPTC_UNORM_EXT;if(r===$a)return a.COMPRESSED_RGB_BPTC_SIGNED_FLOAT_EXT;if(r===Ka)return a.COMPRESSED_RGB_BPTC_UNSIGNED_FLOAT_EXT}else return null;if(r===Xc||r===Za||r===Ja||r===Qa)if(a=e.get("EXT_texture_compression_rgtc"),a!==null){if(r===or)return a.COMPRESSED_RED_RGTC1_EXT;if(r===Za)return a.COMPRESSED_SIGNED_RED_RGTC1_EXT;if(r===Ja)return a.COMPRESSED_RED_GREEN_RGTC2_EXT;if(r===Qa)return a.COMPRESSED_SIGNED_RED_GREEN_RGTC2_EXT}else return null;return r===Fn?n?i.UNSIGNED_INT_24_8:(a=e.get("WEBGL_depth_texture"),a!==null?a.UNSIGNED_INT_24_8_WEBGL:null):i[r]!==void 0?i[r]:null}return{convert:s}}class bp extends Wt{constructor(e=[]){super(),this.isArrayCamera=!0,this.cameras=e}}class Ai extends ft{constructor(){super(),this.isGroup=!0,this.type="Group"}}const Tp={type:"move"};class Br{constructor(){this._targetRay=null,this._grip=null,this._hand=null}getHandSpace(){return this._hand===null&&(this._hand=new Ai,this._hand.matrixAutoUpdate=!1,this._hand.visible=!1,this._hand.joints={},this._hand.inputState={pinching:!1}),this._hand}getTargetRaySpace(){return this._targetRay===null&&(this._targetRay=new Ai,this._targetRay.matrixAutoUpdate=!1,this._targetRay.visible=!1,this._targetRay.hasLinearVelocity=!1,this._targetRay.linearVelocity=new U,this._targetRay.hasAngularVelocity=!1,this._targetRay.angularVelocity=new U),this._targetRay}getGripSpace(){return this._grip===null&&(this._grip=new Ai,this._grip.matrixAutoUpdate=!1,this._grip.visible=!1,this._grip.hasLinearVelocity=!1,this._grip.linearVelocity=new U,this._grip.hasAngularVelocity=!1,this._grip.angularVelocity=new U),this._grip}dispatchEvent(e){return this._targetRay!==null&&this._targetRay.dispatchEvent(e),this._grip!==null&&this._grip.dispatchEvent(e),this._hand!==null&&this._hand.dispatchEvent(e),this}connect(e){if(e&&e.hand){const t=this._hand;if(t)for(const n of e.hand.values())this._getHandJoint(t,n)}return this.dispatchEvent({type:"connected",data:e}),this}disconnect(e){return this.dispatchEvent({type:"disconnected",data:e}),this._targetRay!==null&&(this._targetRay.visible=!1),this._grip!==null&&(this._grip.visible=!1),this._hand!==null&&(this._hand.visible=!1),this}update(e,t,n){let s=null,r=null,o=null;const a=this._targetRay,l=this._grip,c=this._hand;if(e&&t.session.visibilityState!=="visible-blurred"){if(c&&e.hand){o=!0;for(const _ of e.hand.values()){const h=t.getJointPose(_,n),u=this._getHandJoint(c,_);h!==null&&(u.matrix.fromArray(h.transform.matrix),u.matrix.decompose(u.position,u.rotation,u.scale),u.matrixWorldNeedsUpdate=!0,u.jointRadius=h.radius),u.visible=h!==null}const d=c.joints["index-finger-tip"],p=c.joints["thumb-tip"],f=d.position.distanceTo(p.position),m=.02,g=.005;c.inputState.pinching&&f>m+g?(c.inputState.pinching=!1,this.dispatchEvent({type:"pinchend",handedness:e.handedness,target:this})):!c.inputState.pinching&&f<=m-g&&(c.inputState.pinching=!0,this.dispatchEvent({type:"pinchstart",handedness:e.handedness,target:this}))}else l!==null&&e.gripSpace&&(r=t.getPose(e.gripSpace,n),r!==null&&(l.matrix.fromArray(r.transform.matrix),l.matrix.decompose(l.position,l.rotation,l.scale),l.matrixWorldNeedsUpdate=!0,r.linearVelocity?(l.hasLinearVelocity=!0,l.linearVelocity.copy(r.linearVelocity)):l.hasLinearVelocity=!1,r.angularVelocity?(l.hasAngularVelocity=!0,l.angularVelocity.copy(r.angularVelocity)):l.hasAngularVelocity=!1));a!==null&&(s=t.getPose(e.targetRaySpace,n),s===null&&r!==null&&(s=r),s!==null&&(a.matrix.fromArray(s.transform.matrix),a.matrix.decompose(a.position,a.rotation,a.scale),a.matrixWorldNeedsUpdate=!0,s.linearVelocity?(a.hasLinearVelocity=!0,a.linearVelocity.copy(s.linearVelocity)):a.hasLinearVelocity=!1,s.angularVelocity?(a.hasAngularVelocity=!0,a.angularVelocity.copy(s.angularVelocity)):a.hasAngularVelocity=!1,this.dispatchEvent(Tp)))}return a!==null&&(a.visible=s!==null),l!==null&&(l.visible=r!==null),c!==null&&(c.visible=o!==null),this}_getHandJoint(e,t){if(e.joints[t.jointName]===void 0){const n=new Ai;n.matrixAutoUpdate=!1,n.visible=!1,e.joints[t.jointName]=n,e.add(n)}return e.joints[t.jointName]}}class wp extends ri{constructor(e,t){super();const n=this;let s=null,r=1,o=null,a="local-floor",l=1,c=null,d=null,p=null,f=null,m=null,g=null;const _=t.getContextAttributes();let h=null,u=null;const y=[],x=[],T=new qe;let L=null;const w=new Wt;w.layers.enable(1),w.viewport=new ht;const A=new Wt;A.layers.enable(2),A.viewport=new ht;const X=[w,A],S=new bp;S.layers.enable(1),S.layers.enable(2);let b=null,k=null;this.cameraAutoUpdate=!0,this.enabled=!1,this.isPresenting=!1,this.getController=function(H){let q=y[H];return q===void 0&&(q=new Br,y[H]=q),q.getTargetRaySpace()},this.getControllerGrip=function(H){let q=y[H];return q===void 0&&(q=new Br,y[H]=q),q.getGripSpace()},this.getHand=function(H){let q=y[H];return q===void 0&&(q=new Br,y[H]=q),q.getHandSpace()};function $(H){const q=x.indexOf(H.inputSource);if(q===-1)return;const le=y[q];le!==void 0&&(le.update(H.inputSource,H.frame,c||o),le.dispatchEvent({type:H.type,data:H.inputSource}))}function ie(){s.removeEventListener("select",$),s.removeEventListener("selectstart",$),s.removeEventListener("selectend",$),s.removeEventListener("squeeze",$),s.removeEventListener("squeezestart",$),s.removeEventListener("squeezeend",$),s.removeEventListener("end",ie),s.removeEventListener("inputsourceschange",C);for(let H=0;H<y.length;H++){const q=x[H];q!==null&&(x[H]=null,y[H].disconnect(q))}b=null,k=null,e.setRenderTarget(h),m=null,f=null,p=null,s=null,u=null,ae.stop(),n.isPresenting=!1,e.setPixelRatio(L),e.setSize(T.width,T.height,!1),n.dispatchEvent({type:"sessionend"})}this.setFramebufferScaleFactor=function(H){r=H,n.isPresenting===!0&&console.warn("THREE.WebXRManager: Cannot change framebuffer scale while presenting.")},this.setReferenceSpaceType=function(H){a=H,n.isPresenting===!0&&console.warn("THREE.WebXRManager: Cannot change reference space type while presenting.")},this.getReferenceSpace=function(){return c||o},this.setReferenceSpace=function(H){c=H},this.getBaseLayer=function(){return f!==null?f:m},this.getBinding=function(){return p},this.getFrame=function(){return g},this.getSession=function(){return s},this.setSession=async function(H){if(s=H,s!==null){if(h=e.getRenderTarget(),s.addEventListener("select",$),s.addEventListener("selectstart",$),s.addEventListener("selectend",$),s.addEventListener("squeeze",$),s.addEventListener("squeezestart",$),s.addEventListener("squeezeend",$),s.addEventListener("end",ie),s.addEventListener("inputsourceschange",C),_.xrCompatible!==!0&&await t.makeXRCompatible(),L=e.getPixelRatio(),e.getSize(T),s.renderState.layers===void 0||e.capabilities.isWebGL2===!1){const q={antialias:s.renderState.layers===void 0?_.antialias:!0,alpha:!0,depth:_.depth,stencil:_.stencil,framebufferScaleFactor:r};m=new XRWebGLLayer(s,t,q),s.updateRenderState({baseLayer:m}),e.setPixelRatio(1),e.setSize(m.framebufferWidth,m.framebufferHeight,!1),u=new Bn(m.framebufferWidth,m.framebufferHeight,{format:qt,type:Sn,colorSpace:e.outputColorSpace,stencilBuffer:_.stencil})}else{let q=null,le=null,fe=null;_.depth&&(fe=_.stencil?t.DEPTH24_STENCIL8:t.DEPTH_COMPONENT24,q=_.stencil?ii:On,le=_.stencil?Fn:yn);const ge={colorFormat:t.RGBA8,depthFormat:fe,scaleFactor:r};p=new XRWebGLBinding(s,t),f=p.createProjectionLayer(ge),s.updateRenderState({layers:[f]}),e.setPixelRatio(1),e.setSize(f.textureWidth,f.textureHeight,!1),u=new Bn(f.textureWidth,f.textureHeight,{format:qt,type:Sn,depthTexture:new qo(f.textureWidth,f.textureHeight,le,void 0,void 0,void 0,void 0,void 0,void 0,q),stencilBuffer:_.stencil,colorSpace:e.outputColorSpace,samples:_.antialias?4:0});const De=e.properties.get(u);De.__ignoreDepthValues=f.ignoreDepthValues}u.isXRRenderTarget=!0,this.setFoveation(l),c=null,o=await s.requestReferenceSpace(a),ae.setContext(s),ae.start(),n.isPresenting=!0,n.dispatchEvent({type:"sessionstart"})}},this.getEnvironmentBlendMode=function(){if(s!==null)return s.environmentBlendMode};function C(H){for(let q=0;q<H.removed.length;q++){const le=H.removed[q],fe=x.indexOf(le);fe>=0&&(x[fe]=null,y[fe].disconnect(le))}for(let q=0;q<H.added.length;q++){const le=H.added[q];let fe=x.indexOf(le);if(fe===-1){for(let De=0;De<y.length;De++)if(De>=x.length){x.push(le),fe=De;break}else if(x[De]===null){x[De]=le,fe=De;break}if(fe===-1)break}const ge=y[fe];ge&&ge.connect(le)}}const z=new U,G=new U;function Y(H,q,le){z.setFromMatrixPosition(q.matrixWorld),G.setFromMatrixPosition(le.matrixWorld);const fe=z.distanceTo(G),ge=q.projectionMatrix.elements,De=le.projectionMatrix.elements,Ne=ge[14]/(ge[10]-1),be=ge[14]/(ge[10]+1),Xe=(ge[9]+1)/ge[5],I=(ge[9]-1)/ge[5],Tt=(ge[8]-1)/ge[0],ve=(De[8]+1)/De[0],Ce=Ne*Tt,he=Ne*ve,tt=fe/(-Tt+ve),Oe=tt*-Tt;q.matrixWorld.decompose(H.position,H.quaternion,H.scale),H.translateX(Oe),H.translateZ(tt),H.matrixWorld.compose(H.position,H.quaternion,H.scale),H.matrixWorldInverse.copy(H.matrixWorld).invert();const E=Ne+tt,v=be+tt,F=Ce-Oe,J=he+(fe-Oe),Z=Xe*be/v*E,Q=I*be/v*E;H.projectionMatrix.makePerspective(F,J,Z,Q,E,v),H.projectionMatrixInverse.copy(H.projectionMatrix).invert()}function V(H,q){q===null?H.matrixWorld.copy(H.matrix):H.matrixWorld.multiplyMatrices(q.matrixWorld,H.matrix),H.matrixWorldInverse.copy(H.matrixWorld).invert()}this.updateCamera=function(H){if(s===null)return;S.near=A.near=w.near=H.near,S.far=A.far=w.far=H.far,(b!==S.near||k!==S.far)&&(s.updateRenderState({depthNear:S.near,depthFar:S.far}),b=S.near,k=S.far);const q=H.parent,le=S.cameras;V(S,q);for(let fe=0;fe<le.length;fe++)V(le[fe],q);le.length===2?Y(S,w,A):S.projectionMatrix.copy(w.projectionMatrix),D(H,S,q)};function D(H,q,le){le===null?H.matrix.copy(q.matrixWorld):(H.matrix.copy(le.matrixWorld),H.matrix.invert(),H.matrix.multiply(q.matrixWorld)),H.matrix.decompose(H.position,H.quaternion,H.scale),H.updateMatrixWorld(!0),H.projectionMatrix.copy(q.projectionMatrix),H.projectionMatrixInverse.copy(q.projectionMatrixInverse),H.isPerspectiveCamera&&(H.fov=dr*2*Math.atan(1/H.projectionMatrix.elements[5]),H.zoom=1)}this.getCamera=function(){return S},this.getFoveation=function(){if(!(f===null&&m===null))return l},this.setFoveation=function(H){l=H,f!==null&&(f.fixedFoveation=H),m!==null&&m.fixedFoveation!==void 0&&(m.fixedFoveation=H)};let W=null;function j(H,q){if(d=q.getViewerPose(c||o),g=q,d!==null){const le=d.views;m!==null&&(e.setRenderTargetFramebuffer(u,m.framebuffer),e.setRenderTarget(u));let fe=!1;le.length!==S.cameras.length&&(S.cameras.length=0,fe=!0);for(let ge=0;ge<le.length;ge++){const De=le[ge];let Ne=null;if(m!==null)Ne=m.getViewport(De);else{const Xe=p.getViewSubImage(f,De);Ne=Xe.viewport,ge===0&&(e.setRenderTargetTextures(u,Xe.colorTexture,f.ignoreDepthValues?void 0:Xe.depthStencilTexture),e.setRenderTarget(u))}let be=X[ge];be===void 0&&(be=new Wt,be.layers.enable(ge),be.viewport=new ht,X[ge]=be),be.matrix.fromArray(De.transform.matrix),be.matrix.decompose(be.position,be.quaternion,be.scale),be.projectionMatrix.fromArray(De.projectionMatrix),be.projectionMatrixInverse.copy(be.projectionMatrix).invert(),be.viewport.set(Ne.x,Ne.y,Ne.width,Ne.height),ge===0&&(S.matrix.copy(be.matrix),S.matrix.decompose(S.position,S.quaternion,S.scale)),fe===!0&&S.cameras.push(be)}}for(let le=0;le<y.length;le++){const fe=x[le],ge=y[le];fe!==null&&ge!==void 0&&ge.update(fe,q,c||o)}W&&W(H,q),q.detectedPlanes&&n.dispatchEvent({type:"planesdetected",data:q}),g=null}const ae=new Oo;ae.setAnimationLoop(j),this.setAnimationLoop=function(H){W=H},this.dispose=function(){}}}function Ap(i,e){function t(h,u){h.matrixAutoUpdate===!0&&h.updateMatrix(),u.value.copy(h.matrix)}function n(h,u){u.color.getRGB(h.fogColor.value,Io(i)),u.isFog?(h.fogNear.value=u.near,h.fogFar.value=u.far):u.isFogExp2&&(h.fogDensity.value=u.density)}function s(h,u,y,x,T){u.isMeshBasicMaterial||u.isMeshLambertMaterial?r(h,u):u.isMeshToonMaterial?(r(h,u),p(h,u)):u.isMeshPhongMaterial?(r(h,u),d(h,u)):u.isMeshStandardMaterial?(r(h,u),f(h,u),u.isMeshPhysicalMaterial&&m(h,u,T)):u.isMeshMatcapMaterial?(r(h,u),g(h,u)):u.isMeshDepthMaterial?r(h,u):u.isMeshDistanceMaterial?(r(h,u),_(h,u)):u.isMeshNormalMaterial?r(h,u):u.isLineBasicMaterial?(o(h,u),u.isLineDashedMaterial&&a(h,u)):u.isPointsMaterial?l(h,u,y,x):u.isSpriteMaterial?c(h,u):u.isShadowMaterial?(h.color.value.copy(u.color),h.opacity.value=u.opacity):u.isShaderMaterial&&(u.uniformsNeedUpdate=!1)}function r(h,u){h.opacity.value=u.opacity,u.color&&h.diffuse.value.copy(u.color),u.emissive&&h.emissive.value.copy(u.emissive).multiplyScalar(u.emissiveIntensity),u.map&&(h.map.value=u.map,t(u.map,h.mapTransform)),u.alphaMap&&(h.alphaMap.value=u.alphaMap,t(u.alphaMap,h.alphaMapTransform)),u.bumpMap&&(h.bumpMap.value=u.bumpMap,t(u.bumpMap,h.bumpMapTransform),h.bumpScale.value=u.bumpScale,u.side===Rt&&(h.bumpScale.value*=-1)),u.normalMap&&(h.normalMap.value=u.normalMap,t(u.normalMap,h.normalMapTransform),h.normalScale.value.copy(u.normalScale),u.side===Rt&&h.normalScale.value.negate()),u.displacementMap&&(h.displacementMap.value=u.displacementMap,t(u.displacementMap,h.displacementMapTransform),h.displacementScale.value=u.displacementScale,h.displacementBias.value=u.displacementBias),u.emissiveMap&&(h.emissiveMap.value=u.emissiveMap,t(u.emissiveMap,h.emissiveMapTransform)),u.specularMap&&(h.specularMap.value=u.specularMap,t(u.specularMap,h.specularMapTransform)),u.alphaTest>0&&(h.alphaTest.value=u.alphaTest);const y=e.get(u).envMap;if(y&&(h.envMap.value=y,h.flipEnvMap.value=y.isCubeTexture&&y.isRenderTargetTexture===!1?-1:1,h.reflectivity.value=u.reflectivity,h.ior.value=u.ior,h.refractionRatio.value=u.refractionRatio),u.lightMap){h.lightMap.value=u.lightMap;const x=i._useLegacyLights===!0?Math.PI:1;h.lightMapIntensity.value=u.lightMapIntensity*x,t(u.lightMap,h.lightMapTransform)}u.aoMap&&(h.aoMap.value=u.aoMap,h.aoMapIntensity.value=u.aoMapIntensity,t(u.aoMap,h.aoMapTransform))}function o(h,u){h.diffuse.value.copy(u.color),h.opacity.value=u.opacity,u.map&&(h.map.value=u.map,t(u.map,h.mapTransform))}function a(h,u){h.dashSize.value=u.dashSize,h.totalSize.value=u.dashSize+u.gapSize,h.scale.value=u.scale}function l(h,u,y,x){h.diffuse.value.copy(u.color),h.opacity.value=u.opacity,h.size.value=u.size*y,h.scale.value=x*.5,u.map&&(h.map.value=u.map,t(u.map,h.uvTransform)),u.alphaMap&&(h.alphaMap.value=u.alphaMap,t(u.alphaMap,h.alphaMapTransform)),u.alphaTest>0&&(h.alphaTest.value=u.alphaTest)}function c(h,u){h.diffuse.value.copy(u.color),h.opacity.value=u.opacity,h.rotation.value=u.rotation,u.map&&(h.map.value=u.map,t(u.map,h.mapTransform)),u.alphaMap&&(h.alphaMap.value=u.alphaMap,t(u.alphaMap,h.alphaMapTransform)),u.alphaTest>0&&(h.alphaTest.value=u.alphaTest)}function d(h,u){h.specular.value.copy(u.specular),h.shininess.value=Math.max(u.shininess,1e-4)}function p(h,u){u.gradientMap&&(h.gradientMap.value=u.gradientMap)}function f(h,u){h.metalness.value=u.metalness,u.metalnessMap&&(h.metalnessMap.value=u.metalnessMap,t(u.metalnessMap,h.metalnessMapTransform)),h.roughness.value=u.roughness,u.roughnessMap&&(h.roughnessMap.value=u.roughnessMap,t(u.roughnessMap,h.roughnessMapTransform)),e.get(u).envMap&&(h.envMapIntensity.value=u.envMapIntensity)}function m(h,u,y){h.ior.value=u.ior,u.sheen>0&&(h.sheenColor.value.copy(u.sheenColor).multiplyScalar(u.sheen),h.sheenRoughness.value=u.sheenRoughness,u.sheenColorMap&&(h.sheenColorMap.value=u.sheenColorMap,t(u.sheenColorMap,h.sheenColorMapTransform)),u.sheenRoughnessMap&&(h.sheenRoughnessMap.value=u.sheenRoughnessMap,t(u.sheenRoughnessMap,h.sheenRoughnessMapTransform))),u.clearcoat>0&&(h.clearcoat.value=u.clearcoat,h.clearcoatRoughness.value=u.clearcoatRoughness,u.clearcoatMap&&(h.clearcoatMap.value=u.clearcoatMap,t(u.clearcoatMap,h.clearcoatMapTransform)),u.clearcoatRoughnessMap&&(h.clearcoatRoughnessMap.value=u.clearcoatRoughnessMap,t(u.clearcoatRoughnessMap,h.clearcoatRoughnessMapTransform)),u.clearcoatNormalMap&&(h.clearcoatNormalMap.value=u.clearcoatNormalMap,t(u.clearcoatNormalMap,h.clearcoatNormalMapTransform),h.clearcoatNormalScale.value.copy(u.clearcoatNormalScale),u.side===Rt&&h.clearcoatNormalScale.value.negate())),u.iridescence>0&&(h.iridescence.value=u.iridescence,h.iridescenceIOR.value=u.iridescenceIOR,h.iridescenceThicknessMinimum.value=u.iridescenceThicknessRange[0],h.iridescenceThicknessMaximum.value=u.iridescenceThicknessRange[1],u.iridescenceMap&&(h.iridescenceMap.value=u.iridescenceMap,t(u.iridescenceMap,h.iridescenceMapTransform)),u.iridescenceThicknessMap&&(h.iridescenceThicknessMap.value=u.iridescenceThicknessMap,t(u.iridescenceThicknessMap,h.iridescenceThicknessMapTransform))),u.transmission>0&&(h.transmission.value=u.transmission,h.transmissionSamplerMap.value=y.texture,h.transmissionSamplerSize.value.set(y.width,y.height),u.transmissionMap&&(h.transmissionMap.value=u.transmissionMap,t(u.transmissionMap,h.transmissionMapTransform)),h.thickness.value=u.thickness,u.thicknessMap&&(h.thicknessMap.value=u.thicknessMap,t(u.thicknessMap,h.thicknessMapTransform)),h.attenuationDistance.value=u.attenuationDistance,h.attenuationColor.value.copy(u.attenuationColor)),u.anisotropy>0&&(h.anisotropyVector.value.set(u.anisotropy*Math.cos(u.anisotropyRotation),u.anisotropy*Math.sin(u.anisotropyRotation)),u.anisotropyMap&&(h.anisotropyMap.value=u.anisotropyMap,t(u.anisotropyMap,h.anisotropyMapTransform))),h.specularIntensity.value=u.specularIntensity,h.specularColor.value.copy(u.specularColor),u.specularColorMap&&(h.specularColorMap.value=u.specularColorMap,t(u.specularColorMap,h.specularColorMapTransform)),u.specularIntensityMap&&(h.specularIntensityMap.value=u.specularIntensityMap,t(u.specularIntensityMap,h.specularIntensityMapTransform))}function g(h,u){u.matcap&&(h.matcap.value=u.matcap)}function _(h,u){const y=e.get(u).light;h.referencePosition.value.setFromMatrixPosition(y.matrixWorld),h.nearDistance.value=y.shadow.camera.near,h.farDistance.value=y.shadow.camera.far}return{refreshFogUniforms:n,refreshMaterialUniforms:s}}function Rp(i,e,t,n){let s={},r={},o=[];const a=t.isWebGL2?i.getParameter(i.MAX_UNIFORM_BUFFER_BINDINGS):0;function l(y,x){const T=x.program;n.uniformBlockBinding(y,T)}function c(y,x){let T=s[y.id];T===void 0&&(g(y),T=d(y),s[y.id]=T,y.addEventListener("dispose",h));const L=x.program;n.updateUBOMapping(y,L);const w=e.render.frame;r[y.id]!==w&&(f(y),r[y.id]=w)}function d(y){const x=p();y.__bindingPointIndex=x;const T=i.createBuffer(),L=y.__size,w=y.usage;return i.bindBuffer(i.UNIFORM_BUFFER,T),i.bufferData(i.UNIFORM_BUFFER,L,w),i.bindBuffer(i.UNIFORM_BUFFER,null),i.bindBufferBase(i.UNIFORM_BUFFER,x,T),T}function p(){for(let y=0;y<a;y++)if(o.indexOf(y)===-1)return o.push(y),y;return console.error("THREE.WebGLRenderer: Maximum number of simultaneously usable uniforms groups reached."),0}function f(y){const x=s[y.id],T=y.uniforms,L=y.__cache;i.bindBuffer(i.UNIFORM_BUFFER,x);for(let w=0,A=T.length;w<A;w++){const X=Array.isArray(T[w])?T[w]:[T[w]];for(let S=0,b=X.length;S<b;S++){const k=X[S];if(m(k,w,S,L)===!0){const $=k.__offset,ie=Array.isArray(k.value)?k.value:[k.value];let C=0;for(let z=0;z<ie.length;z++){const G=ie[z],Y=_(G);typeof G=="number"||typeof G=="boolean"?(k.__data[0]=G,i.bufferSubData(i.UNIFORM_BUFFER,$+C,k.__data)):G.isMatrix3?(k.__data[0]=G.elements[0],k.__data[1]=G.elements[1],k.__data[2]=G.elements[2],k.__data[3]=0,k.__data[4]=G.elements[3],k.__data[5]=G.elements[4],k.__data[6]=G.elements[5],k.__data[7]=0,k.__data[8]=G.elements[6],k.__data[9]=G.elements[7],k.__data[10]=G.elements[8],k.__data[11]=0):(G.toArray(k.__data,C),C+=Y.storage/Float32Array.BYTES_PER_ELEMENT)}i.bufferSubData(i.UNIFORM_BUFFER,$,k.__data)}}}i.bindBuffer(i.UNIFORM_BUFFER,null)}function m(y,x,T,L){const w=y.value,A=x+"_"+T;if(L[A]===void 0)return typeof w=="number"||typeof w=="boolean"?L[A]=w:L[A]=w.clone(),!0;{const X=L[A];if(typeof w=="number"||typeof w=="boolean"){if(X!==w)return L[A]=w,!0}else if(X.equals(w)===!1)return X.copy(w),!0}return!1}function g(y){const x=y.uniforms;let T=0;const L=16;for(let A=0,X=x.length;A<X;A++){const S=Array.isArray(x[A])?x[A]:[x[A]];for(let b=0,k=S.length;b<k;b++){const $=S[b],ie=Array.isArray($.value)?$.value:[$.value];for(let C=0,z=ie.length;C<z;C++){const G=ie[C],Y=_(G),V=T%L;V!==0&&L-V<Y.boundary&&(T+=L-V),$.__data=new Float32Array(Y.storage/Float32Array.BYTES_PER_ELEMENT),$.__offset=T,T+=Y.storage}}}const w=T%L;return w>0&&(T+=L-w),y.__size=T,y.__cache={},this}function _(y){const x={boundary:0,storage:0};return typeof y=="number"||typeof y=="boolean"?(x.boundary=4,x.storage=4):y.isVector2?(x.boundary=8,x.storage=8):y.isVector3||y.isColor?(x.boundary=16,x.storage=12):y.isVector4?(x.boundary=16,x.storage=16):y.isMatrix3?(x.boundary=48,x.storage=48):y.isMatrix4?(x.boundary=64,x.storage=64):y.isTexture?console.warn("THREE.WebGLRenderer: Texture samplers can not be part of an uniforms group."):console.warn("THREE.WebGLRenderer: Unsupported uniform value type.",y),x}function h(y){const x=y.target;x.removeEventListener("dispose",h);const T=o.indexOf(x.__bindingPointIndex);o.splice(T,1),i.deleteBuffer(s[x.id]),delete s[x.id],delete r[x.id]}function u(){for(const y in s)i.deleteBuffer(s[y]);o=[],s={},r={}}return{bind:l,update:c,dispose:u}}class fl{constructor(e={}){const{canvas:t=iu(),context:n=null,depth:s=!0,stencil:r=!0,alpha:o=!1,antialias:a=!1,premultipliedAlpha:l=!0,preserveDrawingBuffer:c=!1,powerPreference:d="default",failIfMajorPerformanceCaveat:p=!1}=e;this.isWebGLRenderer=!0;let f;n!==null?f=n.getContextAttributes().alpha:f=o;const m=new Uint32Array(4),g=new Int32Array(4);let _=null,h=null;const u=[],y=[];this.domElement=t,this.debug={checkShaderErrors:!0,onShaderError:null},this.autoClear=!0,this.autoClearColor=!0,this.autoClearDepth=!0,this.autoClearStencil=!0,this.sortObjects=!0,this.clippingPlanes=[],this.localClippingEnabled=!1,this._outputColorSpace=dt,this._useLegacyLights=!1,this.toneMapping=Mn,this.toneMappingExposure=1;const x=this;let T=!1,L=0,w=0,A=null,X=-1,S=null;const b=new ht,k=new ht;let $=null;const ie=new Pe(0);let C=0,z=t.width,G=t.height,Y=1,V=null,D=null;const W=new ht(0,0,z,G),j=new ht(0,0,z,G);let ae=!1;const H=new Pr;let q=!1,le=!1,fe=null;const ge=new ot,De=new qe,Ne=new U,be={background:null,fog:null,environment:null,overrideMaterial:null,isScene:!0};function Xe(){return A===null?Y:1}let I=n;function Tt(M,P){for(let O=0;O<M.length;O++){const B=M[O],N=t.getContext(B,P);if(N!==null)return N}return null}try{const M={alpha:!0,depth:s,stencil:r,antialias:a,premultipliedAlpha:l,preserveDrawingBuffer:c,powerPreference:d,failIfMajorPerformanceCaveat:p};if("setAttribute"in t&&t.setAttribute("data-engine",`three.js r${$s}`),t.addEventListener("webglcontextlost",ne,!1),t.addEventListener("webglcontextrestored",R,!1),t.addEventListener("webglcontextcreationerror",se,!1),I===null){const P=["webgl2","webgl","experimental-webgl"];if(x.isWebGL1Renderer===!0&&P.shift(),I=Tt(P,M),I===null)throw Tt(P)?new Error("Error creating WebGL context with your selected attributes."):new Error("Error creating WebGL context.")}typeof WebGLRenderingContext<"u"&&I instanceof WebGLRenderingContext&&console.warn("THREE.WebGLRenderer: WebGL 1 support was deprecated in r153 and will be removed in r163."),I.getShaderPrecisionFormat===void 0&&(I.getShaderPrecisionFormat=function(){return{rangeMin:1,rangeMax:1,precision:1}})}catch(M){throw console.error("THREE.WebGLRenderer: "+M.message),M}let ve,Ce,he,tt,Oe,E,v,F,J,Z,Q,pe,oe,ue,Ee,ze,K,$e,Ve,Ae,xe,de,Fe,je;function it(){ve=new Oh(I),Ce=new Ph(I,ve,e),ve.init(Ce),de=new Ep(I,ve,Ce),he=new Sp(I,ve,Ce),tt=new kh(I),Oe=new op,E=new yp(I,ve,he,Oe,Ce,de,tt),v=new Uh(x),F=new Fh(x),J=new Ru(I,Ce),Fe=new Ch(I,ve,J,Ce),Z=new zh(I,J,tt,Fe),Q=new Wh(I,Z,J,tt),Ve=new Vh(I,Ce,E),ze=new Dh(Oe),pe=new ap(x,v,F,ve,Ce,Fe,ze),oe=new Ap(x,Oe),ue=new cp,Ee=new mp(ve,Ce),$e=new Rh(x,v,F,he,Q,f,l),K=new Mp(x,Q,Ce),je=new Rp(I,tt,Ce,he),Ae=new Lh(I,ve,tt,Ce),xe=new Bh(I,ve,tt,Ce),tt.programs=pe.programs,x.capabilities=Ce,x.extensions=ve,x.properties=Oe,x.renderLists=ue,x.shadowMap=K,x.state=he,x.info=tt}it();const He=new wp(x,I);this.xr=He,this.getContext=function(){return I},this.getContextAttributes=function(){return I.getContextAttributes()},this.forceContextLoss=function(){const M=ve.get("WEBGL_lose_context");M&&M.loseContext()},this.forceContextRestore=function(){const M=ve.get("WEBGL_lose_context");M&&M.restoreContext()},this.getPixelRatio=function(){return Y},this.setPixelRatio=function(M){M!==void 0&&(Y=M,this.setSize(z,G,!1))},this.getSize=function(M){return M.set(z,G)},this.setSize=function(M,P,O=!0){if(He.isPresenting){console.warn("THREE.WebGLRenderer: Can't change size while VR device is presenting.");return}z=M,G=P,t.width=Math.floor(M*Y),t.height=Math.floor(P*Y),O===!0&&(t.style.width=M+"px",t.style.height=P+"px"),this.setViewport(0,0,M,P)},this.getDrawingBufferSize=function(M){return M.set(z*Y,G*Y).floor()},this.setDrawingBufferSize=function(M,P,O){z=M,G=P,Y=O,t.width=Math.floor(M*O),t.height=Math.floor(P*O),this.setViewport(0,0,M,P)},this.getCurrentViewport=function(M){return M.copy(b)},this.getViewport=function(M){return M.copy(W)},this.setViewport=function(M,P,O,B){M.isVector4?W.set(M.x,M.y,M.z,M.w):W.set(M,P,O,B),he.viewport(b.copy(W).multiplyScalar(Y).floor())},this.getScissor=function(M){return M.copy(j)},this.setScissor=function(M,P,O,B){M.isVector4?j.set(M.x,M.y,M.z,M.w):j.set(M,P,O,B),he.scissor(k.copy(j).multiplyScalar(Y).floor())},this.getScissorTest=function(){return ae},this.setScissorTest=function(M){he.setScissorTest(ae=M)},this.setOpaqueSort=function(M){V=M},this.setTransparentSort=function(M){D=M},this.getClearColor=function(M){return M.copy($e.getClearColor())},this.setClearColor=function(){$e.setClearColor.apply($e,arguments)},this.getClearAlpha=function(){return $e.getClearAlpha()},this.setClearAlpha=function(){$e.setClearAlpha.apply($e,arguments)},this.clear=function(M=!0,P=!0,O=!0){let B=0;if(M){let N=!1;if(A!==null){const ce=A.texture.format;N=ce===Aa||ce===wa||ce===Ta}if(N){const ce=A.texture.type,me=ce===Sn||ce===yn||ce===nr||ce===Fn||ce===Ea||ce===ba,Se=$e.getClearColor(),we=$e.getClearAlpha(),Be=Se.r,Le=Se.g,Ue=Se.b;me?(m[0]=Be,m[1]=Le,m[2]=Ue,m[3]=we,I.clearBufferuiv(I.COLOR,0,m)):(g[0]=Be,g[1]=Le,g[2]=Ue,g[3]=we,I.clearBufferiv(I.COLOR,0,g))}else B|=I.COLOR_BUFFER_BIT}P&&(B|=I.DEPTH_BUFFER_BIT),O&&(B|=I.STENCIL_BUFFER_BIT,this.state.buffers.stencil.setMask(4294967295)),I.clear(B)},this.clearColor=function(){this.clear(!0,!1,!1)},this.clearDepth=function(){this.clear(!1,!0,!1)},this.clearStencil=function(){this.clear(!1,!1,!0)},this.dispose=function(){t.removeEventListener("webglcontextlost",ne,!1),t.removeEventListener("webglcontextrestored",R,!1),t.removeEventListener("webglcontextcreationerror",se,!1),ue.dispose(),Ee.dispose(),Oe.dispose(),v.dispose(),F.dispose(),Q.dispose(),Fe.dispose(),je.dispose(),pe.dispose(),He.dispose(),He.removeEventListener("sessionstart",wt),He.removeEventListener("sessionend",Je),fe&&(fe.dispose(),fe=null),At.stop()};function ne(M){M.preventDefault(),console.log("THREE.WebGLRenderer: Context Lost."),T=!0}function R(){console.log("THREE.WebGLRenderer: Context Restored."),T=!1;const M=tt.autoReset,P=K.enabled,O=K.autoUpdate,B=K.needsUpdate,N=K.type;it(),tt.autoReset=M,K.enabled=P,K.autoUpdate=O,K.needsUpdate=B,K.type=N}function se(M){console.error("THREE.WebGLRenderer: A WebGL context could not be created. Reason: ",M.statusMessage)}function re(M){const P=M.target;P.removeEventListener("dispose",re),Te(P)}function Te(M){Me(M),Oe.remove(M)}function Me(M){const P=Oe.get(M).programs;P!==void 0&&(P.forEach(function(O){pe.releaseProgram(O)}),M.isShaderMaterial&&pe.releaseShaderCache(M))}this.renderBufferDirect=function(M,P,O,B,N,ce){P===null&&(P=be);const me=N.isMesh&&N.matrixWorld.determinant()<0,Se=Om(M,P,O,B,N);he.setMaterial(B,me);let we=O.index,Be=1;if(B.wireframe===!0){if(we=Z.getWireframeAttribute(O),we===void 0)return;Be=2}const Le=O.drawRange,Ue=O.attributes.position;let at=Le.start*Be,zt=(Le.start+Le.count)*Be;ce!==null&&(at=Math.max(at,ce.start*Be),zt=Math.min(zt,(ce.start+ce.count)*Be)),we!==null?(at=Math.max(at,0),zt=Math.min(zt,we.count)):Ue!=null&&(at=Math.max(at,0),zt=Math.min(zt,Ue.count));const gt=zt-at;if(gt<0||gt===1/0)return;Fe.setup(N,B,Se,O,we);let _n,nt=Ae;if(we!==null&&(_n=J.get(we),nt=xe,nt.setIndex(_n)),N.isMesh)B.wireframe===!0?(he.setLineWidth(B.wireframeLinewidth*Xe()),nt.setMode(I.LINES)):nt.setMode(I.TRIANGLES);else if(N.isLine){let Ge=B.linewidth;Ge===void 0&&(Ge=1),he.setLineWidth(Ge*Xe()),N.isLineSegments?nt.setMode(I.LINES):N.isLineLoop?nt.setMode(I.LINE_LOOP):nt.setMode(I.LINE_STRIP)}else N.isPoints?nt.setMode(I.POINTS):N.isSprite&&nt.setMode(I.TRIANGLES);if(N.isBatchedMesh)nt.renderMultiDraw(N._multiDrawStarts,N._multiDrawCounts,N._multiDrawCount);else if(N.isInstancedMesh)nt.renderInstances(at,gt,N.count);else if(O.isInstancedBufferGeometry){const Ge=O._maxInstanceCount!==void 0?O._maxInstanceCount:1/0,aa=Math.min(O.instanceCount,Ge);nt.renderInstances(at,gt,aa)}else nt.render(at,gt)};function Ke(M,P,O){M.transparent===!0&&M.side===nn&&M.forceSinglePass===!1?(M.side=Rt,M.needsUpdate=!0,Ys(M,P,O),M.side=xn,M.needsUpdate=!0,Ys(M,P,O),M.side=nn):Ys(M,P,O)}this.compile=function(M,P,O=null){O===null&&(O=M),h=Ee.get(O),h.init(),y.push(h),O.traverseVisible(function(N){N.isLight&&N.layers.test(P.layers)&&(h.pushLight(N),N.castShadow&&h.pushShadow(N))}),M!==O&&M.traverseVisible(function(N){N.isLight&&N.layers.test(P.layers)&&(h.pushLight(N),N.castShadow&&h.pushShadow(N))}),h.setupLights(x._useLegacyLights);const B=new Set;return M.traverse(function(N){const ce=N.material;if(ce)if(Array.isArray(ce))for(let me=0;me<ce.length;me++){const Se=ce[me];Ke(Se,O,N),B.add(Se)}else Ke(ce,O,N),B.add(ce)}),y.pop(),h=null,B},this.compileAsync=function(M,P,O=null){const B=this.compile(M,P,O);return new Promise(N=>{function ce(){if(B.forEach(function(me){Oe.get(me).currentProgram.isReady()&&B.delete(me)}),B.size===0){N(M);return}setTimeout(ce,10)}ve.get("KHR_parallel_shader_compile")!==null?ce():setTimeout(ce,10)})};let Ze=null;function mt(M){Ze&&Ze(M)}function wt(){At.stop()}function Je(){At.start()}const At=new Oo;At.setAnimationLoop(mt),typeof self<"u"&&At.setContext(self),this.setAnimationLoop=function(M){Ze=M,He.setAnimationLoop(M),M===null?At.stop():At.start()},He.addEventListener("sessionstart",wt),He.addEventListener("sessionend",Je),this.render=function(M,P){if(P!==void 0&&P.isCamera!==!0){console.error("THREE.WebGLRenderer.render: camera is not an instance of THREE.Camera.");return}if(T===!0)return;M.matrixWorldAutoUpdate===!0&&M.updateMatrixWorld(),P.parent===null&&P.matrixWorldAutoUpdate===!0&&P.updateMatrixWorld(),He.enabled===!0&&He.isPresenting===!0&&(He.cameraAutoUpdate===!0&&He.updateCamera(P),P=He.getCamera()),M.isScene===!0&&M.onBeforeRender(x,M,P,A),h=Ee.get(M,y.length),h.init(),y.push(h),ge.multiplyMatrices(P.projectionMatrix,P.matrixWorldInverse),H.setFromProjectionMatrix(ge),le=this.localClippingEnabled,q=ze.init(this.clippingPlanes,le),_=ue.get(M,u.length),_.init(),u.push(_),en(M,P,0,x.sortObjects),_.finish(),x.sortObjects===!0&&_.sort(V,D),this.info.render.frame++,q===!0&&ze.beginShadows();const O=h.state.shadowsArray;if(K.render(O,M,P),q===!0&&ze.endShadows(),this.info.autoReset===!0&&this.info.reset(),$e.render(_,M),h.setupLights(x._useLegacyLights),P.isArrayCamera){const B=P.cameras;for(let N=0,ce=B.length;N<ce;N++){const me=B[N];Jl(_,M,me,me.viewport)}}else Jl(_,M,P);A!==null&&(E.updateMultisampleRenderTarget(A),E.updateRenderTargetMipmap(A)),M.isScene===!0&&M.onAfterRender(x,M,P),Fe.resetDefaultState(),X=-1,S=null,y.pop(),y.length>0?h=y[y.length-1]:h=null,u.pop(),u.length>0?_=u[u.length-1]:_=null};function en(M,P,O,B){if(M.visible===!1)return;if(M.layers.test(P.layers)){if(M.isGroup)O=M.renderOrder;else if(M.isLOD)M.autoUpdate===!0&&M.update(P);else if(M.isLight)h.pushLight(M),M.castShadow&&h.pushShadow(M);else if(M.isSprite){if(!M.frustumCulled||H.intersectsSprite(M)){B&&Ne.setFromMatrixPosition(M.matrixWorld).applyMatrix4(ge);const me=Q.update(M),Se=M.material;Se.visible&&_.push(M,me,Se,O,Ne.z,null)}}else if((M.isMesh||M.isLine||M.isPoints)&&(!M.frustumCulled||H.intersectsObject(M))){const me=Q.update(M),Se=M.material;if(B&&(M.boundingSphere!==void 0?(M.boundingSphere===null&&M.computeBoundingSphere(),Ne.copy(M.boundingSphere.center)):(me.boundingSphere===null&&me.computeBoundingSphere(),Ne.copy(me.boundingSphere.center)),Ne.applyMatrix4(M.matrixWorld).applyMatrix4(ge)),Array.isArray(Se)){const we=me.groups;for(let Be=0,Le=we.length;Be<Le;Be++){const Ue=we[Be],at=Se[Ue.materialIndex];at&&at.visible&&_.push(M,me,at,O,Ne.z,Ue)}}else Se.visible&&_.push(M,me,Se,O,Ne.z,null)}}const ce=M.children;for(let me=0,Se=ce.length;me<Se;me++)en(ce[me],P,O,B)}function Jl(M,P,O,B){const N=M.opaque,ce=M.transmissive,me=M.transparent;h.setupLightsView(O),q===!0&&ze.setGlobalState(x.clippingPlanes,O),ce.length>0&&Fm(N,ce,P,O),B&&he.viewport(b.copy(B)),N.length>0&&js(N,P,O),ce.length>0&&js(ce,P,O),me.length>0&&js(me,P,O),he.buffers.depth.setTest(!0),he.buffers.depth.setMask(!0),he.buffers.color.setMask(!0),he.setPolygonOffset(!1)}function Fm(M,P,O,B){if((O.isScene===!0?O.overrideMaterial:null)!==null)return;const ce=Ce.isWebGL2;fe===null&&(fe=new Bn(1,1,{generateMipmaps:!0,type:ve.has("EXT_color_buffer_half_float")?Ni:Sn,minFilter:Ii,samples:ce?4:0})),x.getDrawingBufferSize(De),ce?fe.setSize(De.x,De.y):fe.setSize(fr(De.x),fr(De.y));const me=x.getRenderTarget();x.setRenderTarget(fe),x.getClearColor(ie),C=x.getClearAlpha(),C<1&&x.setClearColor(16777215,.5),x.clear();const Se=x.toneMapping;x.toneMapping=Mn,js(M,O,B),E.updateMultisampleRenderTarget(fe),E.updateRenderTargetMipmap(fe);let we=!1;for(let Be=0,Le=P.length;Be<Le;Be++){const Ue=P[Be],at=Ue.object,zt=Ue.geometry,gt=Ue.material,_n=Ue.group;if(gt.side===nn&&at.layers.test(B.layers)){const nt=gt.side;gt.side=Rt,gt.needsUpdate=!0,Ql(at,O,B,zt,gt,_n),gt.side=nt,gt.needsUpdate=!0,we=!0}}we===!0&&(E.updateMultisampleRenderTarget(fe),E.updateRenderTargetMipmap(fe)),x.setRenderTarget(me),x.setClearColor(ie,C),x.toneMapping=Se}function js(M,P,O){const B=P.isScene===!0?P.overrideMaterial:null;for(let N=0,ce=M.length;N<ce;N++){const me=M[N],Se=me.object,we=me.geometry,Be=B===null?me.material:B,Le=me.group;Se.layers.test(O.layers)&&Ql(Se,P,O,we,Be,Le)}}function Ql(M,P,O,B,N,ce){M.onBeforeRender(x,P,O,B,N,ce),M.modelViewMatrix.multiplyMatrices(O.matrixWorldInverse,M.matrixWorld),M.normalMatrix.getNormalMatrix(M.modelViewMatrix),N.onBeforeRender(x,P,O,B,M,ce),N.transparent===!0&&N.side===nn&&N.forceSinglePass===!1?(N.side=Rt,N.needsUpdate=!0,x.renderBufferDirect(O,P,B,N,M,ce),N.side=xn,N.needsUpdate=!0,x.renderBufferDirect(O,P,B,N,M,ce),N.side=nn):x.renderBufferDirect(O,P,B,N,M,ce),M.onAfterRender(x,P,O,B,N,ce)}function Ys(M,P,O){P.isScene!==!0&&(P=be);const B=Oe.get(M),N=h.state.lights,ce=h.state.shadowsArray,me=N.state.version,Se=pe.getParameters(M,N.state,ce,P,O),we=pe.getProgramCacheKey(Se);let Be=B.programs;B.environment=M.isMeshStandardMaterial?P.environment:null,B.fog=P.fog,B.envMap=(M.isMeshStandardMaterial?F:v).get(M.envMap||B.environment),Be===void 0&&(M.addEventListener("dispose",re),Be=new Map,B.programs=Be);let Le=Be.get(we);if(Le!==void 0){if(B.currentProgram===Le&&B.lightsStateVersion===me)return tc(M,Se),Le}else Se.uniforms=pe.getUniforms(M),M.onBuild(O,Se,x),M.onBeforeCompile(Se,x),Le=pe.acquireProgram(Se,we),Be.set(we,Le),B.uniforms=Se.uniforms;const Ue=B.uniforms;return(!M.isShaderMaterial&&!M.isRawShaderMaterial||M.clipping===!0)&&(Ue.clippingPlanes=ze.uniform),tc(M,Se),B.needsLights=Bm(M),B.lightsStateVersion=me,B.needsLights&&(Ue.ambientLightColor.value=N.state.ambient,Ue.lightProbe.value=N.state.probe,Ue.directionalLights.value=N.state.directional,Ue.directionalLightShadows.value=N.state.directionalShadow,Ue.spotLights.value=N.state.spot,Ue.spotLightShadows.value=N.state.spotShadow,Ue.rectAreaLights.value=N.state.rectArea,Ue.ltc_1.value=N.state.rectAreaLTC1,Ue.ltc_2.value=N.state.rectAreaLTC2,Ue.pointLights.value=N.state.point,Ue.pointLightShadows.value=N.state.pointShadow,Ue.hemisphereLights.value=N.state.hemi,Ue.directionalShadowMap.value=N.state.directionalShadowMap,Ue.directionalShadowMatrix.value=N.state.directionalShadowMatrix,Ue.spotShadowMap.value=N.state.spotShadowMap,Ue.spotLightMatrix.value=N.state.spotLightMatrix,Ue.spotLightMap.value=N.state.spotLightMap,Ue.pointShadowMap.value=N.state.pointShadowMap,Ue.pointShadowMatrix.value=N.state.pointShadowMatrix),B.currentProgram=Le,B.uniformsList=null,Le}function ec(M){if(M.uniformsList===null){const P=M.currentProgram.getUniforms();M.uniformsList=Ps.seqWithValue(P.seq,M.uniforms)}return M.uniformsList}function tc(M,P){const O=Oe.get(M);O.outputColorSpace=P.outputColorSpace,O.batching=P.batching,O.instancing=P.instancing,O.instancingColor=P.instancingColor,O.skinning=P.skinning,O.morphTargets=P.morphTargets,O.morphNormals=P.morphNormals,O.morphColors=P.morphColors,O.morphTargetsCount=P.morphTargetsCount,O.numClippingPlanes=P.numClippingPlanes,O.numIntersection=P.numClipIntersection,O.vertexAlphas=P.vertexAlphas,O.vertexTangents=P.vertexTangents,O.toneMapping=P.toneMapping}function Om(M,P,O,B,N){P.isScene!==!0&&(P=be),E.resetTextureUnits();const ce=P.fog,me=B.isMeshStandardMaterial?P.environment:null,Se=A===null?x.outputColorSpace:A.isXRRenderTarget===!0?A.texture.colorSpace:sn,we=(B.isMeshStandardMaterial?F:v).get(B.envMap||me),Be=B.vertexColors===!0&&!!O.attributes.color&&O.attributes.color.itemSize===4,Le=!!O.attributes.tangent&&(!!B.normalMap||B.anisotropy>0),Ue=!!O.morphAttributes.position,at=!!O.morphAttributes.normal,zt=!!O.morphAttributes.color;let gt=Mn;B.toneMapped&&(A===null||A.isXRRenderTarget===!0)&&(gt=x.toneMapping);const _n=O.morphAttributes.position||O.morphAttributes.normal||O.morphAttributes.color,nt=_n!==void 0?_n.length:0,Ge=Oe.get(B),aa=h.state.lights;if(q===!0&&(le===!0||M!==S)){const Xt=M===S&&B.id===X;ze.setState(B,M,Xt)}let st=!1;B.version===Ge.__version?(Ge.needsLights&&Ge.lightsStateVersion!==aa.state.version||Ge.outputColorSpace!==Se||N.isBatchedMesh&&Ge.batching===!1||!N.isBatchedMesh&&Ge.batching===!0||N.isInstancedMesh&&Ge.instancing===!1||!N.isInstancedMesh&&Ge.instancing===!0||N.isSkinnedMesh&&Ge.skinning===!1||!N.isSkinnedMesh&&Ge.skinning===!0||N.isInstancedMesh&&Ge.instancingColor===!0&&N.instanceColor===null||N.isInstancedMesh&&Ge.instancingColor===!1&&N.instanceColor!==null||Ge.envMap!==we||B.fog===!0&&Ge.fog!==ce||Ge.numClippingPlanes!==void 0&&(Ge.numClippingPlanes!==ze.numPlanes||Ge.numIntersection!==ze.numIntersection)||Ge.vertexAlphas!==Be||Ge.vertexTangents!==Le||Ge.morphTargets!==Ue||Ge.morphNormals!==at||Ge.morphColors!==zt||Ge.toneMapping!==gt||Ce.isWebGL2===!0&&Ge.morphTargetsCount!==nt)&&(st=!0):(st=!0,Ge.__version=B.version);let Jn=Ge.currentProgram;st===!0&&(Jn=Ys(B,P,N));let nc=!1,Ki=!1,oa=!1;const Mt=Jn.getUniforms(),Qn=Ge.uniforms;if(he.useProgram(Jn.program)&&(nc=!0,Ki=!0,oa=!0),B.id!==X&&(X=B.id,Ki=!0),nc||S!==M){Mt.setValue(I,"projectionMatrix",M.projectionMatrix),Mt.setValue(I,"viewMatrix",M.matrixWorldInverse);const Xt=Mt.map.cameraPosition;Xt!==void 0&&Xt.setValue(I,Ne.setFromMatrixPosition(M.matrixWorld)),Ce.logarithmicDepthBuffer&&Mt.setValue(I,"logDepthBufFC",2/(Math.log(M.far+1)/Math.LN2)),(B.isMeshPhongMaterial||B.isMeshToonMaterial||B.isMeshLambertMaterial||B.isMeshBasicMaterial||B.isMeshStandardMaterial||B.isShaderMaterial)&&Mt.setValue(I,"isOrthographic",M.isOrthographicCamera===!0),S!==M&&(S=M,Ki=!0,oa=!0)}if(N.isSkinnedMesh){Mt.setOptional(I,N,"bindMatrix"),Mt.setOptional(I,N,"bindMatrixInverse");const Xt=N.skeleton;Xt&&(Ce.floatVertexTextures?(Xt.boneTexture===null&&Xt.computeBoneTexture(),Mt.setValue(I,"boneTexture",Xt.boneTexture,E)):console.warn("THREE.WebGLRenderer: SkinnedMesh can only be used with WebGL 2. With WebGL 1 OES_texture_float and vertex textures support is required."))}N.isBatchedMesh&&(Mt.setOptional(I,N,"batchingTexture"),Mt.setValue(I,"batchingTexture",N._matricesTexture,E));const la=O.morphAttributes;if((la.position!==void 0||la.normal!==void 0||la.color!==void 0&&Ce.isWebGL2===!0)&&Ve.update(N,O,Jn),(Ki||Ge.receiveShadow!==N.receiveShadow)&&(Ge.receiveShadow=N.receiveShadow,Mt.setValue(I,"receiveShadow",N.receiveShadow)),B.isMeshGouraudMaterial&&B.envMap!==null&&(Qn.envMap.value=we,Qn.flipEnvMap.value=we.isCubeTexture&&we.isRenderTargetTexture===!1?-1:1),Ki&&(Mt.setValue(I,"toneMappingExposure",x.toneMappingExposure),Ge.needsLights&&zm(Qn,oa),ce&&B.fog===!0&&oe.refreshFogUniforms(Qn,ce),oe.refreshMaterialUniforms(Qn,B,Y,G,fe),Ps.upload(I,ec(Ge),Qn,E)),B.isShaderMaterial&&B.uniformsNeedUpdate===!0&&(Ps.upload(I,ec(Ge),Qn,E),B.uniformsNeedUpdate=!1),B.isSpriteMaterial&&Mt.setValue(I,"center",N.center),Mt.setValue(I,"modelViewMatrix",N.modelViewMatrix),Mt.setValue(I,"normalMatrix",N.normalMatrix),Mt.setValue(I,"modelMatrix",N.matrixWorld),B.isShaderMaterial||B.isRawShaderMaterial){const Xt=B.uniformsGroups;for(let ca=0,km=Xt.length;ca<km;ca++)if(Ce.isWebGL2){const ic=Xt[ca];je.update(ic,Jn),je.bind(ic,Jn)}else console.warn("THREE.WebGLRenderer: Uniform Buffer Objects can only be used with WebGL 2.")}return Jn}function zm(M,P){M.ambientLightColor.needsUpdate=P,M.lightProbe.needsUpdate=P,M.directionalLights.needsUpdate=P,M.directionalLightShadows.needsUpdate=P,M.pointLights.needsUpdate=P,M.pointLightShadows.needsUpdate=P,M.spotLights.needsUpdate=P,M.spotLightShadows.needsUpdate=P,M.rectAreaLights.needsUpdate=P,M.hemisphereLights.needsUpdate=P}function Bm(M){return M.isMeshLambertMaterial||M.isMeshToonMaterial||M.isMeshPhongMaterial||M.isMeshStandardMaterial||M.isShadowMaterial||M.isShaderMaterial&&M.lights===!0}this.getActiveCubeFace=function(){return L},this.getActiveMipmapLevel=function(){return w},this.getRenderTarget=function(){return A},this.setRenderTargetTextures=function(M,P,O){Oe.get(M.texture).__webglTexture=P,Oe.get(M.depthTexture).__webglTexture=O;const B=Oe.get(M);B.__hasExternalTextures=!0,B.__hasExternalTextures&&(B.__autoAllocateDepthBuffer=O===void 0,B.__autoAllocateDepthBuffer||ve.has("WEBGL_multisampled_render_to_texture")===!0&&(console.warn("THREE.WebGLRenderer: Render-to-texture extension was disabled because an external texture was provided"),B.__useRenderToTexture=!1))},this.setRenderTargetFramebuffer=function(M,P){const O=Oe.get(M);O.__webglFramebuffer=P,O.__useDefaultFramebuffer=P===void 0},this.setRenderTarget=function(M,P=0,O=0){A=M,L=P,w=O;let B=!0,N=null,ce=!1,me=!1;if(M){const we=Oe.get(M);we.__useDefaultFramebuffer!==void 0?(he.bindFramebuffer(I.FRAMEBUFFER,null),B=!1):we.__webglFramebuffer===void 0?E.setupRenderTarget(M):we.__hasExternalTextures&&E.rebindTextures(M,Oe.get(M.texture).__webglTexture,Oe.get(M.depthTexture).__webglTexture);const Be=M.texture;(Be.isData3DTexture||Be.isDataArrayTexture||Be.isCompressedArrayTexture)&&(me=!0);const Le=Oe.get(M).__webglFramebuffer;M.isWebGLCubeRenderTarget?(Array.isArray(Le[P])?N=Le[P][O]:N=Le[P],ce=!0):Ce.isWebGL2&&M.samples>0&&E.useMultisampledRTT(M)===!1?N=Oe.get(M).__webglMultisampledFramebuffer:Array.isArray(Le)?N=Le[O]:N=Le,b.copy(M.viewport),k.copy(M.scissor),$=M.scissorTest}else b.copy(W).multiplyScalar(Y).floor(),k.copy(j).multiplyScalar(Y).floor(),$=ae;if(he.bindFramebuffer(I.FRAMEBUFFER,N)&&Ce.drawBuffers&&B&&he.drawBuffers(M,N),he.viewport(b),he.scissor(k),he.setScissorTest($),ce){const we=Oe.get(M.texture);I.framebufferTexture2D(I.FRAMEBUFFER,I.COLOR_ATTACHMENT0,I.TEXTURE_CUBE_MAP_POSITIVE_X+P,we.__webglTexture,O)}else if(me){const we=Oe.get(M.texture),Be=P||0;I.framebufferTextureLayer(I.FRAMEBUFFER,I.COLOR_ATTACHMENT0,we.__webglTexture,O||0,Be)}X=-1},this.readRenderTargetPixels=function(M,P,O,B,N,ce,me){if(!(M&&M.isWebGLRenderTarget)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");return}let Se=Oe.get(M).__webglFramebuffer;if(M.isWebGLCubeRenderTarget&&me!==void 0&&(Se=Se[me]),Se){he.bindFramebuffer(I.FRAMEBUFFER,Se);try{const we=M.texture,Be=we.format,Le=we.type;if(Be!==qt&&de.convert(Be)!==I.getParameter(I.IMPLEMENTATION_COLOR_READ_FORMAT)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in RGBA or implementation defined format.");return}const Ue=Le===Ni&&(ve.has("EXT_color_buffer_half_float")||Ce.isWebGL2&&ve.has("EXT_color_buffer_float"));if(Le!==Sn&&de.convert(Le)!==I.getParameter(I.IMPLEMENTATION_COLOR_READ_TYPE)&&!(Le===En&&(Ce.isWebGL2||ve.has("OES_texture_float")||ve.has("WEBGL_color_buffer_float")))&&!Ue){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in UnsignedByteType or implementation defined type.");return}P>=0&&P<=M.width-B&&O>=0&&O<=M.height-N&&I.readPixels(P,O,B,N,de.convert(Be),de.convert(Le),ce)}finally{const we=A!==null?Oe.get(A).__webglFramebuffer:null;he.bindFramebuffer(I.FRAMEBUFFER,we)}}},this.copyFramebufferToTexture=function(M,P,O=0){const B=Math.pow(2,-O),N=Math.floor(P.image.width*B),ce=Math.floor(P.image.height*B);E.setTexture2D(P,0),I.copyTexSubImage2D(I.TEXTURE_2D,O,0,0,M.x,M.y,N,ce),he.unbindTexture()},this.copyTextureToTexture=function(M,P,O,B=0){const N=P.image.width,ce=P.image.height,me=de.convert(O.format),Se=de.convert(O.type);E.setTexture2D(O,0),I.pixelStorei(I.UNPACK_FLIP_Y_WEBGL,O.flipY),I.pixelStorei(I.UNPACK_PREMULTIPLY_ALPHA_WEBGL,O.premultiplyAlpha),I.pixelStorei(I.UNPACK_ALIGNMENT,O.unpackAlignment),P.isDataTexture?I.texSubImage2D(I.TEXTURE_2D,B,M.x,M.y,N,ce,me,Se,P.image.data):P.isCompressedTexture?I.compressedTexSubImage2D(I.TEXTURE_2D,B,M.x,M.y,P.mipmaps[0].width,P.mipmaps[0].height,me,P.mipmaps[0].data):I.texSubImage2D(I.TEXTURE_2D,B,M.x,M.y,me,Se,P.image),B===0&&O.generateMipmaps&&I.generateMipmap(I.TEXTURE_2D),he.unbindTexture()},this.copyTextureToTexture3D=function(M,P,O,B,N=0){if(x.isWebGL1Renderer){console.warn("THREE.WebGLRenderer.copyTextureToTexture3D: can only be used with WebGL2.");return}const ce=M.max.x-M.min.x+1,me=M.max.y-M.min.y+1,Se=M.max.z-M.min.z+1,we=de.convert(B.format),Be=de.convert(B.type);let Le;if(B.isData3DTexture)E.setTexture3D(B,0),Le=I.TEXTURE_3D;else if(B.isDataArrayTexture||B.isCompressedArrayTexture)E.setTexture2DArray(B,0),Le=I.TEXTURE_2D_ARRAY;else{console.warn("THREE.WebGLRenderer.copyTextureToTexture3D: only supports THREE.DataTexture3D and THREE.DataTexture2DArray.");return}I.pixelStorei(I.UNPACK_FLIP_Y_WEBGL,B.flipY),I.pixelStorei(I.UNPACK_PREMULTIPLY_ALPHA_WEBGL,B.premultiplyAlpha),I.pixelStorei(I.UNPACK_ALIGNMENT,B.unpackAlignment);const Ue=I.getParameter(I.UNPACK_ROW_LENGTH),at=I.getParameter(I.UNPACK_IMAGE_HEIGHT),zt=I.getParameter(I.UNPACK_SKIP_PIXELS),gt=I.getParameter(I.UNPACK_SKIP_ROWS),_n=I.getParameter(I.UNPACK_SKIP_IMAGES),nt=O.isCompressedTexture?O.mipmaps[N]:O.image;I.pixelStorei(I.UNPACK_ROW_LENGTH,nt.width),I.pixelStorei(I.UNPACK_IMAGE_HEIGHT,nt.height),I.pixelStorei(I.UNPACK_SKIP_PIXELS,M.min.x),I.pixelStorei(I.UNPACK_SKIP_ROWS,M.min.y),I.pixelStorei(I.UNPACK_SKIP_IMAGES,M.min.z),O.isDataTexture||O.isData3DTexture?I.texSubImage3D(Le,N,P.x,P.y,P.z,ce,me,Se,we,Be,nt.data):O.isCompressedArrayTexture?(console.warn("THREE.WebGLRenderer.copyTextureToTexture3D: untested support for compressed srcTexture."),I.compressedTexSubImage3D(Le,N,P.x,P.y,P.z,ce,me,Se,we,nt.data)):I.texSubImage3D(Le,N,P.x,P.y,P.z,ce,me,Se,we,Be,nt),I.pixelStorei(I.UNPACK_ROW_LENGTH,Ue),I.pixelStorei(I.UNPACK_IMAGE_HEIGHT,at),I.pixelStorei(I.UNPACK_SKIP_PIXELS,zt),I.pixelStorei(I.UNPACK_SKIP_ROWS,gt),I.pixelStorei(I.UNPACK_SKIP_IMAGES,_n),N===0&&B.generateMipmaps&&I.generateMipmap(Le),he.unbindTexture()},this.initTexture=function(M){M.isCubeTexture?E.setTextureCube(M,0):M.isData3DTexture?E.setTexture3D(M,0):M.isDataArrayTexture||M.isCompressedArrayTexture?E.setTexture2DArray(M,0):E.setTexture2D(M,0),he.unbindTexture()},this.resetState=function(){L=0,w=0,A=null,he.reset(),Fe.reset()},typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}get coordinateSystem(){return rn}get outputColorSpace(){return this._outputColorSpace}set outputColorSpace(e){this._outputColorSpace=e;const t=this.getContext();t.drawingBufferColorSpace=e===lr?"display-p3":"srgb",t.unpackColorSpace=Ye.workingColorSpace===es?"display-p3":"srgb"}get outputEncoding(){return console.warn("THREE.WebGLRenderer: Property .outputEncoding has been removed. Use .outputColorSpace instead."),this.outputColorSpace===dt?zn:eo}set outputEncoding(e){console.warn("THREE.WebGLRenderer: Property .outputEncoding has been removed. Use .outputColorSpace instead."),this.outputColorSpace=e===zn?dt:sn}get useLegacyLights(){return console.warn("THREE.WebGLRenderer: The property .useLegacyLights has been deprecated. Migrate your lighting according to the following guide: https://discourse.threejs.org/t/updates-to-lighting-in-three-js-r155/53733."),this._useLegacyLights}set useLegacyLights(e){console.warn("THREE.WebGLRenderer: The property .useLegacyLights has been deprecated. Migrate your lighting according to the following guide: https://discourse.threejs.org/t/updates-to-lighting-in-three-js-r155/53733."),this._useLegacyLights=e}}class Cp extends fl{}Cp.prototype.isWebGL1Renderer=!0;class kr{constructor(e,t=1,n=1e3){this.isFog=!0,this.name="",this.color=new Pe(e),this.near=t,this.far=n}clone(){return new kr(this.color,this.near,this.far)}toJSON(){return{type:"Fog",name:this.name,color:this.color.getHex(),near:this.near,far:this.far}}}class Lp extends ft{constructor(){super(),this.isScene=!0,this.type="Scene",this.background=null,this.environment=null,this.fog=null,this.backgroundBlurriness=0,this.backgroundIntensity=1,this.overrideMaterial=null,typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}copy(e,t){return super.copy(e,t),e.background!==null&&(this.background=e.background.clone()),e.environment!==null&&(this.environment=e.environment.clone()),e.fog!==null&&(this.fog=e.fog.clone()),this.backgroundBlurriness=e.backgroundBlurriness,this.backgroundIntensity=e.backgroundIntensity,e.overrideMaterial!==null&&(this.overrideMaterial=e.overrideMaterial.clone()),this.matrixAutoUpdate=e.matrixAutoUpdate,this}toJSON(e){const t=super.toJSON(e);return this.fog!==null&&(t.object.fog=this.fog.toJSON()),this.backgroundBlurriness>0&&(t.object.backgroundBlurriness=this.backgroundBlurriness),this.backgroundIntensity!==1&&(t.object.backgroundIntensity=this.backgroundIntensity),t}}class pl extends mi{constructor(e){super(),this.isLineBasicMaterial=!0,this.type="LineBasicMaterial",this.color=new Pe(16777215),this.map=null,this.linewidth=1,this.linecap="round",this.linejoin="round",this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.linewidth=e.linewidth,this.linecap=e.linecap,this.linejoin=e.linejoin,this.fog=e.fog,this}}const ml=new U,gl=new U,_l=new ot,Hr=new go,Ds=new cs;class Pp extends ft{constructor(e=new dn,t=new pl){super(),this.isLine=!0,this.type="Line",this.geometry=e,this.material=t,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}computeLineDistances(){const e=this.geometry;if(e.index===null){const t=e.attributes.position,n=[0];for(let s=1,r=t.count;s<r;s++)ml.fromBufferAttribute(t,s-1),gl.fromBufferAttribute(t,s),n[s]=n[s-1],n[s]+=ml.distanceTo(gl);e.setAttribute("lineDistance",new Zt(n,1))}else console.warn("THREE.Line.computeLineDistances(): Computation only possible with non-indexed BufferGeometry.");return this}raycast(e,t){const n=this.geometry,s=this.matrixWorld,r=e.params.Line.threshold,o=n.drawRange;if(n.boundingSphere===null&&n.computeBoundingSphere(),Ds.copy(n.boundingSphere),Ds.applyMatrix4(s),Ds.radius+=r,e.ray.intersectsSphere(Ds)===!1)return;_l.copy(s).invert(),Hr.copy(e.ray).applyMatrix4(_l);const a=r/((this.scale.x+this.scale.y+this.scale.z)/3),l=a*a,c=new U,d=new U,p=new U,f=new U,m=this.isLineSegments?2:1,g=n.index,h=n.attributes.position;if(g!==null){const u=Math.max(0,o.start),y=Math.min(g.count,o.start+o.count);for(let x=u,T=y-1;x<T;x+=m){const L=g.getX(x),w=g.getX(x+1);if(c.fromBufferAttribute(h,L),d.fromBufferAttribute(h,w),Hr.distanceSqToSegment(c,d,f,p)>l)continue;f.applyMatrix4(this.matrixWorld);const X=e.ray.origin.distanceTo(f);X<e.near||X>e.far||t.push({distance:X,point:p.clone().applyMatrix4(this.matrixWorld),index:x,face:null,faceIndex:null,object:this})}}else{const u=Math.max(0,o.start),y=Math.min(h.count,o.start+o.count);for(let x=u,T=y-1;x<T;x+=m){if(c.fromBufferAttribute(h,x),d.fromBufferAttribute(h,x+1),Hr.distanceSqToSegment(c,d,f,p)>l)continue;f.applyMatrix4(this.matrixWorld);const w=e.ray.origin.distanceTo(f);w<e.near||w>e.far||t.push({distance:w,point:p.clone().applyMatrix4(this.matrixWorld),index:x,face:null,faceIndex:null,object:this})}}}updateMorphTargets(){const t=this.geometry.morphAttributes,n=Object.keys(t);if(n.length>0){const s=t[n[0]];if(s!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let r=0,o=s.length;r<o;r++){const a=s[r].name||String(r);this.morphTargetInfluences.push(0),this.morphTargetDictionary[a]=r}}}}}const xl=new U,vl=new U;class Dp extends Pp{constructor(e,t){super(e,t),this.isLineSegments=!0,this.type="LineSegments"}computeLineDistances(){const e=this.geometry;if(e.index===null){const t=e.attributes.position,n=[];for(let s=0,r=t.count;s<r;s+=2)xl.fromBufferAttribute(t,s),vl.fromBufferAttribute(t,s+1),n[s]=s===0?0:n[s-1],n[s+1]=n[s]+xl.distanceTo(vl);e.setAttribute("lineDistance",new Zt(n,1))}else console.warn("THREE.LineSegments.computeLineDistances(): Computation only possible with non-indexed BufferGeometry.");return this}}class Up extends yt{constructor(e,t,n,s,r,o,a,l,c){super(e,t,n,s,r,o,a,l,c),this.isCanvasTexture=!0,this.needsUpdate=!0}}class Us extends mi{constructor(e){super(),this.isMeshStandardMaterial=!0,this.defines={STANDARD:""},this.type="MeshStandardMaterial",this.color=new Pe(16777215),this.roughness=1,this.metalness=0,this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.emissive=new Pe(0),this.emissiveIntensity=1,this.emissiveMap=null,this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=to,this.normalScale=new qe(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.roughnessMap=null,this.metalnessMap=null,this.alphaMap=null,this.envMap=null,this.envMapIntensity=1,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.flatShading=!1,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.defines={STANDARD:""},this.color.copy(e.color),this.roughness=e.roughness,this.metalness=e.metalness,this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.emissive.copy(e.emissive),this.emissiveMap=e.emissiveMap,this.emissiveIntensity=e.emissiveIntensity,this.bumpMap=e.bumpMap,this.bumpScale=e.bumpScale,this.normalMap=e.normalMap,this.normalMapType=e.normalMapType,this.normalScale.copy(e.normalScale),this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.roughnessMap=e.roughnessMap,this.metalnessMap=e.metalnessMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.envMapIntensity=e.envMapIntensity,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.flatShading=e.flatShading,this.fog=e.fog,this}}const Ml={enabled:!1,files:{},add:function(i,e){this.enabled!==!1&&(this.files[i]=e)},get:function(i){if(this.enabled!==!1)return this.files[i]},remove:function(i){delete this.files[i]},clear:function(){this.files={}}};class Ip{constructor(e,t,n){const s=this;let r=!1,o=0,a=0,l;const c=[];this.onStart=void 0,this.onLoad=e,this.onProgress=t,this.onError=n,this.itemStart=function(d){a++,r===!1&&s.onStart!==void 0&&s.onStart(d,o,a),r=!0},this.itemEnd=function(d){o++,s.onProgress!==void 0&&s.onProgress(d,o,a),o===a&&(r=!1,s.onLoad!==void 0&&s.onLoad())},this.itemError=function(d){s.onError!==void 0&&s.onError(d)},this.resolveURL=function(d){return l?l(d):d},this.setURLModifier=function(d){return l=d,this},this.addHandler=function(d,p){return c.push(d,p),this},this.removeHandler=function(d){const p=c.indexOf(d);return p!==-1&&c.splice(p,2),this},this.getHandler=function(d){for(let p=0,f=c.length;p<f;p+=2){const m=c[p],g=c[p+1];if(m.global&&(m.lastIndex=0),m.test(d))return g}return null}}}const Np=new Ip;class Gr{constructor(e){this.manager=e!==void 0?e:Np,this.crossOrigin="anonymous",this.withCredentials=!1,this.path="",this.resourcePath="",this.requestHeader={}}load(){}loadAsync(e,t){const n=this;return new Promise(function(s,r){n.load(e,s,t,r)})}parse(){}setCrossOrigin(e){return this.crossOrigin=e,this}setWithCredentials(e){return this.withCredentials=e,this}setPath(e){return this.path=e,this}setResourcePath(e){return this.resourcePath=e,this}setRequestHeader(e){return this.requestHeader=e,this}}Gr.DEFAULT_MATERIAL_NAME="__DEFAULT";class Fp extends Gr{constructor(e){super(e)}load(e,t,n,s){this.path!==void 0&&(e=this.path+e),e=this.manager.resolveURL(e);const r=this,o=Ml.get(e);if(o!==void 0)return r.manager.itemStart(e),setTimeout(function(){t&&t(o),r.manager.itemEnd(e)},0),o;const a=zi("img");function l(){d(),Ml.add(e,this),t&&t(this),r.manager.itemEnd(e)}function c(p){d(),s&&s(p),r.manager.itemError(e),r.manager.itemEnd(e)}function d(){a.removeEventListener("load",l,!1),a.removeEventListener("error",c,!1)}return a.addEventListener("load",l,!1),a.addEventListener("error",c,!1),e.slice(0,5)!=="data:"&&this.crossOrigin!==void 0&&(a.crossOrigin=this.crossOrigin),r.manager.itemStart(e),a.src=e,a}}class Op extends Gr{constructor(e){super(e)}load(e,t,n,s){const r=new yt,o=new Fp(this.manager);return o.setCrossOrigin(this.crossOrigin),o.setPath(this.path),o.load(e,function(a){r.image=a,r.needsUpdate=!0,t!==void 0&&t(r)},n,s),r}}class Sl extends ft{constructor(e,t=1){super(),this.isLight=!0,this.type="Light",this.color=new Pe(e),this.intensity=t}dispose(){}copy(e,t){return super.copy(e,t),this.color.copy(e.color),this.intensity=e.intensity,this}toJSON(e){const t=super.toJSON(e);return t.object.color=this.color.getHex(),t.object.intensity=this.intensity,this.groundColor!==void 0&&(t.object.groundColor=this.groundColor.getHex()),this.distance!==void 0&&(t.object.distance=this.distance),this.angle!==void 0&&(t.object.angle=this.angle),this.decay!==void 0&&(t.object.decay=this.decay),this.penumbra!==void 0&&(t.object.penumbra=this.penumbra),this.shadow!==void 0&&(t.object.shadow=this.shadow.toJSON()),t}}class zp extends Sl{constructor(e,t,n){super(e,n),this.isHemisphereLight=!0,this.type="HemisphereLight",this.position.copy(ft.DEFAULT_UP),this.updateMatrix(),this.groundColor=new Pe(t)}copy(e,t){return super.copy(e,t),this.groundColor.copy(e.groundColor),this}}const Vr=new ot,yl=new U,El=new U;class Bp{constructor(e){this.camera=e,this.bias=0,this.normalBias=0,this.radius=1,this.blurSamples=8,this.mapSize=new qe(512,512),this.map=null,this.mapPass=null,this.matrix=new ot,this.autoUpdate=!0,this.needsUpdate=!1,this._frustum=new Pr,this._frameExtents=new qe(1,1),this._viewportCount=1,this._viewports=[new ht(0,0,1,1)]}getViewportCount(){return this._viewportCount}getFrustum(){return this._frustum}updateMatrices(e){const t=this.camera,n=this.matrix;yl.setFromMatrixPosition(e.matrixWorld),t.position.copy(yl),El.setFromMatrixPosition(e.target.matrixWorld),t.lookAt(El),t.updateMatrixWorld(),Vr.multiplyMatrices(t.projectionMatrix,t.matrixWorldInverse),this._frustum.setFromProjectionMatrix(Vr),n.set(.5,0,0,.5,0,.5,0,.5,0,0,.5,.5,0,0,0,1),n.multiply(Vr)}getViewport(e){return this._viewports[e]}getFrameExtents(){return this._frameExtents}dispose(){this.map&&this.map.dispose(),this.mapPass&&this.mapPass.dispose()}copy(e){return this.camera=e.camera.clone(),this.bias=e.bias,this.radius=e.radius,this.mapSize.copy(e.mapSize),this}clone(){return new this.constructor().copy(this)}toJSON(){const e={};return this.bias!==0&&(e.bias=this.bias),this.normalBias!==0&&(e.normalBias=this.normalBias),this.radius!==1&&(e.radius=this.radius),(this.mapSize.x!==512||this.mapSize.y!==512)&&(e.mapSize=this.mapSize.toArray()),e.camera=this.camera.toJSON(!1).object,delete e.camera.matrix,e}}class kp extends Bp{constructor(){super(new zo(-5,5,5,-5,.5,500)),this.isDirectionalLightShadow=!0}}class Hp extends Sl{constructor(e,t){super(e,t),this.isDirectionalLight=!0,this.type="DirectionalLight",this.position.copy(ft.DEFAULT_UP),this.updateMatrix(),this.target=new ft,this.shadow=new kp}dispose(){this.shadow.dispose()}copy(e){return super.copy(e),this.target=e.target.clone(),this.shadow=e.shadow.clone(),this}}class Gp extends Dp{constructor(e=10,t=10,n=4473924,s=8947848){n=new Pe(n),s=new Pe(s);const r=t/2,o=e/t,a=e/2,l=[],c=[];for(let f=0,m=0,g=-a;f<=t;f++,g+=o){l.push(-a,0,g,a,0,g),l.push(g,0,-a,g,0,a);const _=f===r?n:s;_.toArray(c,m),m+=3,_.toArray(c,m),m+=3,_.toArray(c,m),m+=3,_.toArray(c,m),m+=3}const d=new dn;d.setAttribute("position",new Zt(l,3)),d.setAttribute("color",new Zt(c,3));const p=new pl({vertexColors:!0,toneMapped:!1});super(d,p),this.type="GridHelper"}dispose(){this.geometry.dispose(),this.material.dispose()}}typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("register",{detail:{revision:$s}})),typeof window<"u"&&(window.__THREE__?console.warn("WARNING: Multiple instances of Three.js being imported."):window.__THREE__=$s);const et=38,Yn=1.5,Vp=4,Wp=13,bl=3,Wr=2,Ri=Math.ceil(et*2/Wr),Xp=.6,hn=(i,e,t)=>Math.max(e,Math.min(t,i));function qp(i=24){const e=[];let t=0;const n=s=>Math.round(s/Yn)*Yn;for(;e.length<i&&t<500;){t++;const s=n(3+Math.random()*5),r=n(3+Math.random()*5),o=n((Math.random()*2-1)*(et-5)),a=n((Math.random()*2-1)*(et-5)),l=1+Math.floor(Math.random()*Vp);if(Math.hypot(o,a)<Wp+Math.max(s,r)/2||Math.abs(o)+s/2>et-bl||Math.abs(a)+r/2>et-bl)continue;let c=!0;for(const d of e)if(Math.abs(o-d.x)<(s+d.w)/2+1.6&&Math.abs(a-d.z)<(r+d.d)/2+1.6){c=!1;break}c&&e.push({x:+o.toFixed(2),z:+a.toFixed(2),w:+s.toFixed(2),d:+r.toFixed(2),t:l})}return e}function jp(i,e,t,n=0){let s=0;for(const r of i)if(e>r.x-r.w/2-n&&e<r.x+r.w/2+n&&t>r.z-r.d/2-n&&t<r.z+r.d/2+n){const o=r.t*Yn;o>s&&(s=o)}return s}function Yp(i,e,t,n,s=0){for(const r of i)if(s<r.t*Yn-.01){const o=hn(e,r.x-r.w/2,r.x+r.w/2),a=hn(t,r.z-r.d/2,r.z+r.d/2),l=e-o,c=t-a;if(l*l+c*c<n*n)return!0}return!1}function $p(i,e,t,n,s,r,o=0){const a=d=>hn(d,-et+1,et-1);let l=n,c=s;for(let d=0;d<4;d++){let p=0,f=0,m=0;for(const u of i){if(o>=u.t*Yn-.01)continue;const y=hn(l,u.x-u.w/2,u.x+u.w/2),x=hn(c,u.z-u.d/2,u.z+u.d/2),T=l-y,L=c-x,w=T*T+L*L;if(w<r*r){let A,X,S;if(w<1e-9)if(Math.abs(e-u.x)>=Math.abs(t-u.z)){A=e<=u.x?-1:1,X=0;const b=e<=u.x?u.x-u.w/2:u.x+u.w/2;S=Math.abs(l-b)+r}else{A=0,X=t<=u.z?-1:1;const b=t<=u.z?u.z-u.d/2:u.z+u.d/2;S=Math.abs(c-b)+r}else{const b=Math.sqrt(w);S=r-b,A=T/b,X=L/b}S>m&&(m=S,p=A,f=X)}}if(m<=0)break;l+=p*m,c+=f*m;let g=n-l,_=s-c;const h=g*p+_*f;if(g-=h*p,_-=h*f,l+=g,c+=_,g*g+_*_<1e-6)break}return{x:a(l),z:a(c)}}function Kp(i,e,t=Xp){for(let n=0;n<6;n++){let s=0,r=0,o=0;for(const a of i){if(e.y>=a.t*Yn-.01)continue;const l=a.x-a.w/2,c=a.x+a.w/2,d=a.z-a.d/2,p=a.z+a.d/2,f=hn(e.x,l,c),m=hn(e.z,d,p),g=e.x-f,_=e.z-m,h=g*g+_*_;if(h>=t*t)continue;let u,y,x;if(h>1e-9){const T=Math.sqrt(h);u=g/T,y=_/T,x=t-T}else{const T=Math.hypot(e.x,e.z)||1;u=-e.x/T,y=-e.z/T,x=t}x>o&&(s=u*x,r=y*x,o=x)}if(o<=0)break;e.x=hn(e.x+s,-et+1,et-1),e.z=hn(e.z+r,-et+1,et-1)}}function Zp(i){const e=new Uint8Array(Ri*Ri);for(let t=0;t<Ri;t++)for(let n=0;n<Ri;n++){const s=-et+(n+.5)*Wr,r=-et+(t+.5)*Wr;Yp(i,s,r,.9,0)&&(e[t*Ri+n]=1)}return{n:Ri,cells:e}}function Jp(i,e){if(e==="mix"){const n=Math.random();return n<.5?"walker":n<.8?"seeker":"flyer"}const t=["walker"];return i>=8&&t.push("seeker"),i>=20&&t.push("flyer"),t[Math.floor(Math.random()*t.length)]}const Qp={walker:{hp:3,spd:1},seeker:{hp:4,spd:.95},flyer:{hp:2,spd:1.05}},Ci={COMBAT:{baseDamage:34,baseMoveSpeed:12,baseHP:100,bulletSpeed:32,fireRate:6.25,jumpForce:9.5},TALENT:{pointsPerPlayer:10,attackPerLevel:3,defensePerLevel:2,speedPerLevel:.3,scalePerLevel:.05,livesPerLevel:1,costTable:[1,1,2,2,3,4],maxLevel:6},ROOM:{timeLimit:10,maxPlayers:8,mapSize:50,baseLives:3,playerScale:1}};function Xr(i){const e=i||{},t={COMBAT:{...Ci.COMBAT},TALENT:{...Ci.TALENT,costTable:[...Ci.TALENT.costTable]},ROOM:{...Ci.ROOM}};return e.COMBAT&&Object.assign(t.COMBAT,e.COMBAT),e.TALENT&&Object.assign(t.TALENT,e.TALENT),e.ROOM&&Object.assign(t.ROOM,e.ROOM),t}function fn(i){const e=Ci.TALENT.costTable;let t=0;const n=Math.max(0,Math.min(i|0,e.length));for(let s=0;s<n;s++)t+=e[s];return t}function qr(i){return i=i||{},fn(i.atk|0)+fn(i.def|0)+fn(i.spd|0)+fn(i.size|0)+fn(i.lives|0)}function Is(i,e){const t=i.COMBAT,n=i.TALENT,s=e||{},r=s.atk|0,o=s.def|0,a=s.spd|0,l=s.size|0,c=s.lives|0;return{damage:t.baseDamage+r*n.attackPerLevel,defense:o*n.defensePerLevel,moveSpeed:t.baseMoveSpeed+a*n.speedPerLevel,scale:Math.max(.2,(i.ROOM&&i.ROOM.playerScale||1)*(1-l*n.scalePerLevel)),extraLives:c*n.livesPerLevel}}const Ns=.6,em=.25,tm=1.3,nm=1.6,im=4.4,Tl=100,wl=2.5,sm=24,rm=.15,am=.1,om=[5217279,16752451,3066993,16735870,11889663,4642518],jr={player:{tintByPlayer:!0,parts:[{size:[1.2,1.8,1.2],pos:[0,.9,0],color:"#4f9bff",roughness:.55,metalness:.1},{size:[1.18,.3,1.18],pos:[0,1.95,0],color:"#3b2a1a",noTint:!0,roughness:.9,metalness:0}]},zombie_walker:{parts:[{size:[1.8,1.55,1.8],pos:[0,.775,0],color:"#6fae4f",roughness:.85,metalness:0}]},zombie_seeker:{parts:[{size:[1.8,1.6,1.8],pos:[0,.8,0],color:"#d98b3a",roughness:.8,metalness:.05}]},zombie_flyer:{parts:[{size:[1.8,1.2,1.8],pos:[0,.6,0],color:"#8e6bd6",roughness:.5,metalness:.2}]},zombie:{parts:[{size:[1.8,1.55,1.8],pos:[0,.775,0],color:"#6fae4f",roughness:.85,metalness:0}]},bullet:{parts:[{size:[.24,.24,.24],pos:[0,0,0],color:"#fff2a0",emissive:"#ffd000",emissiveIntensity:1.4}]}},Al=(i,e,t)=>Math.max(e,Math.min(t,i));class lm{constructor(e){this.canvas=e;const t=(()=>{try{return/Quark|UCBrowser|UCWEB/i.test(navigator.userAgent||"")}catch{return!1}})();let n=null,s=!1;if(t){const r={alpha:!1,antialias:!1,depth:!0,stencil:!0,powerPreference:"high-performance",gameMode:!0};try{n=e.getContext("webgl2",r)||e.getContext("webgl",r)}catch{n=null}if(n)try{s=!!(n.getContextAttributes()||{}).gameMode}catch{s=!1}}this._gl=n,this._gameMode=s,this.renderer=new fl(n?{canvas:e,context:n,antialias:!1,alpha:!1,powerPreference:"high-performance"}:t?{canvas:e,antialias:!1,alpha:!1,powerPreference:"high-performance"}:{canvas:e,antialias:!0}),this.renderer.setPixelRatio(Math.min(window.devicePixelRatio||1,2)),this.renderer.shadowMap.enabled=!0,this.renderer.shadowMap.type=fa,this.scene=new Lp,this.scene.background=new Pe(8900331),this.scene.fog=new kr(8900331,60,170),this.camera=new Wt(70,1,.1,400),this.camera.position.set(0,1.6,0),this.scene.add(this.camera),this._buildWorld(),this.playerMeshes=new Map,this.zombieMeshes=new Map,this.bulletMeshes=new Map,this.myId="host",this.state=this._emptyState(),this.config=Xr(),this.snaps=[],this.clientInterp=!1,this.myPitch=0,this.myYaw=null,this.pred=null,this.predInput=null,this.predHist=[],this._lastRT=0,this._predAcc=0,this._simT=0,this._predStates=[],this._cmdSeq=0,this._unacked=[],this._pendingCmds=[],this._jumpLatch=!1,this.onCmds=null,this.resize(),window.addEventListener("resize",()=>this.resize()),this.assetBase=new URL("assets/entities/",document.baseURI).href,this.entityMod=null,this._texCache={},this._loadEntityMod()}_emptyState(){return{players:{},zombies:[],bullets:[],obstacles:[],grid:null,bounce:!1,zmix:"progress",score:0,target:Tl,status:"waiting",mode:"wave",livesMax:1,winner:null,nextZid:1,nextBid:1,spawnCd:0,matchTime:0,nextEventId:1,events:[]}}_buildWorld(){const e=new zp(13625087,9411237,.95);this.scene.add(e);const t=new Hp(16777215,1.15);t.position.set(22,42,18),t.castShadow=!0,t.shadow.mapSize.set(1024,1024);const n=52,s=t.shadow.camera;s.left=-n,s.right=n,s.top=n,s.bottom=-n,s.near=1,s.far=130,this.scene.add(t);const r=new Vt(new As(et*2,et*2),new Us({color:15921906,roughness:.95,metalness:0}));r.rotation.x=-Math.PI/2,r.receiveShadow=!0,this.scene.add(r);const o=new Gp(et*2,et,7041664,10134445);o.position.y=.02,this.scene.add(o);const a=document.createElement("canvas");a.width=128,a.height=128;{const f=a.getContext("2d");f.fillStyle="#a7adb5",f.fillRect(0,0,128,128),f.strokeStyle="#7e848c",f.lineWidth=5;for(let m=0;m<=128;m+=32)f.beginPath(),f.moveTo(0,m),f.lineTo(128,m),f.stroke();for(let m=0;m<4;m++){const g=m%2?32:0;for(let _=g;_<=128;_+=64)f.beginPath(),f.moveTo(_,m*32),f.lineTo(_,m*32+32),f.stroke()}}const l=6,c=1,d=et,p=(f,m,g,_)=>{const h=new Up(a);h.wrapS=h.wrapT=Qi,h.repeat.set(Math.max(f,m)/4,l/4);const u=new Us({map:h,roughness:.95,metalness:0}),y=new Vt(new Cn(f,l,m),u);y.position.set(g,l/2,_),y.castShadow=!0,y.receiveShadow=!0,this.scene.add(y)};p(d*2+c,c,0,-d),p(d*2+c,c,0,d),p(c,d*2+c,-d,0),p(c,d*2+c,d,0),this.obstacleGroup=new Ai,this.scene.add(this.obstacleGroup)}_rebuildObstacles(e){if(!this.obstacleGroup)return;for(const n of[...this.obstacleGroup.children])this.obstacleGroup.remove(n),n.traverse(s=>{s.geometry&&s.geometry.dispose(),s.material&&s.material.dispose()});const t=new Us({color:13715775,roughness:.85,metalness:.05});for(const n of e||[]){const s=n.t*Yn,r=new Vt(new Cn(n.w,s,n.d),t);r.position.set(n.x,s/2,n.z),r.castShadow=!0,r.receiveShadow=!0,this.obstacleGroup.add(r)}}resize(){const e=window.innerWidth,t=window.innerHeight;this.renderer.setSize(e,t,!1),this.camera.aspect=e/t,this.camera.updateProjectionMatrix()}async _loadEntityMod(){try{const e=await fetch(this.assetBase+"mod.json");e.ok&&(this.entityMod=await e.json(),this._collectTextures(),this._clearMeshes())}catch(e){console.warn("[assets] mod.json 加载失败，使用内置默认建模",e)}}_collectTextures(){const e=this.entityMod;if(e)for(const t in e){if(t.startsWith("zombie"))continue;const n=e[t];if(!(!n||!n.parts))for(const s of n.parts)s.texture&&this._loadTexture(s.texture)}}_loadTexture(e){const t=this.assetBase+e;if(this._texCache[t])return this._texCache[t];const n=new Op().load(t);return n.colorSpace=dt,n.wrapS=n.wrapT=Bt,n.anisotropy=4,this._texCache[t]=n,n}_buildMaterial(e,t){const n={roughness:e.roughness??.6,metalness:e.metalness??.1};return e.texture?(n.map=this._loadTexture(e.texture),n.color=16777215):n.color=e.color?new Pe(e.color):new Pe(8947848),t&&(n.color=new Pe(t)),e.emissive&&(n.emissive=new Pe(e.emissive),n.emissiveIntensity=e.emissiveIntensity??1),new Us(n)}_makeBoxPart(e,t){var s,r,o;const n=new Vt(new Cn(e.size[0],e.size[1],e.size[2]),this._buildMaterial(e,t));return n.position.set(((s=e.pos)==null?void 0:s[0])||0,((r=e.pos)==null?void 0:r[1])||0,((o=e.pos)==null?void 0:o[2])||0),n.castShadow=!0,n}_buildEntityFor(e,t){const n=this.entityMod&&this.entityMod[e]||jr[e]||jr.zombie,s=new Ai,r=n&&n.parts||jr.zombie.parts,o=t&&n&&n.tintByPlayer;for(const a of r){const l=o&&!a.noTint?t:null;s.add(this._makeBoxPart(a,l))}return s}_playerMesh(e){return this._buildEntityFor("player",e)}_zombieMesh(e){const t=e==="walker"||e==="seeker"||e==="flyer"?"zombie_"+e:"zombie";return this._buildEntityFor(t,null)}_bulletMesh(){return this._buildEntityFor("bullet",null)}hostInit(e="主机"){this.state=this._emptyState(),this.config=Xr(),this.myId="host",this.state.players.host=this._mkPlayer("host",e,om[0]),this._clearMeshes()}setConfig(e){return this.config=Xr(e),this.state&&(this.state.config=this.config),this.config}_mkPlayer(e,t,n){return{id:e,name:t,color:n,x:(Math.random()*2-1)*10,z:(Math.random()*2-1)*10,y:0,vy:0,grounded:!0,jumpBuf:0,coyoteT:0,hp:100,maxHp:100,aim:0,alive:!0,state:1,out:!1,ready:0,lives:1,respawnCd:0,input:{mx:0,mz:0,ax:0,az:0,pitch:0,fire:!1,jump:!1},fireCd:0,kills:0,talent:{atk:0,def:0,spd:0,size:0,lives:0},stats:null,radius:Ns}}setTalent(e,t){const n=this.state.players[e];if(!n)return;const s={atk:0,def:0,spd:0,size:0,lives:0};for(const o in s)s[o]=Math.max(0,Math.min(t&&t[o]|0,this.config.TALENT.maxLevel));if(qr(s)>this.config.TALENT.pointsPerPlayer)return;n.talent=s;const r=Is(this.config,n.talent);n.stats=r,n.radius=Ns*r.scale}startGame(e,t,n){const s=n||{},r=this.state;s.config&&this.setConfig(s.config),r.mode=e==="versus"?"versus":"wave";let o;t==null?o=e==="versus"?this.config.ROOM.baseLives:1:o=t|0,r.livesMax=Math.max(0,o),r.winner=null,r.bounce=!!s.bounce,r.zmix=s.zmix==="mix"?"mix":"progress";let a=Tl;s.target!==void 0&&s.target!==null&&(a=s.target|0),r.target=a,r.matchTime=0,r.events=[],r.nextEventId=1,r.obstacles=qp(24),r.grid=Zp(r.obstacles),this._rebuildObstacles(r.obstacles);for(const l in r.players){const c=r.players[l],d=Is(this.config,c.talent);if(c.stats=d,c.radius=Ns*d.scale,c.maxHp=this.config.COMBAT.baseHP,c.hp=c.maxHp,c.lives=r.livesMax===0?0:r.livesMax+d.extraLives,c.out=!1,c.ready=0,c.respawnCd=0,c.input={mx:0,mz:0,ax:0,az:0,pitch:0,fire:!1,jump:!1},c.cmdQueue=[],c.lastAckSeq=0,c.fireCd=0,c.kills=0,c.state===0){c.alive=!1;continue}c.alive=!0,c.y=0,c.vy=0,c.grounded=!0,c.jumpBuf=0,c.coyoteT=0,c.x=(Math.random()*2-1)*10,c.z=(Math.random()*2-1)*10,c.aim=0}r.zombies=[],r.bullets=[],r.score=0,r.spawnCd=.6,r.status="playing"}_killPlayer(e){e.alive=!1,e.ready=0,this.state.livesMax===0?(e.lives=0,e.respawnCd=wl):(e.lives-=1,e.lives>0?e.respawnCd=wl:(e.lives=0,e.out=!0,e.respawnCd=0))}_versusWin(){const e=this.state,t=Object.values(e.players);if(t.length!==0){if(this.config.ROOM.timeLimit>0&&e.matchTime>=this.config.ROOM.timeLimit*60){e.status="win";return}e.livesMax>0&&t.filter(s=>!s.out).length<=1&&(e.status="win")}}_spawnBullet(e){const t=e.aim,n=Math.PI/2-.05,s=Math.max(-n,Math.min(n,e.input&&e.input.pitch||0)),r=Math.cos(s),o=Math.sin(s),a=this.config.COMBAT.bulletSpeed,l=e.stats||Is(this.config,e.talent);this.state.bullets.push({id:this.state.nextBid++,x:e.x+Math.sin(t)*r*1.1,z:e.z+Math.cos(t)*r*1.1,y:e.y+nm+o*1.1,vx:Math.sin(t)*r*a,vz:Math.cos(t)*r*a,vy:o*a,life:tm,owner:e.id,dmg:l.damage})}_spawnZombie(){const e=et-1,t=Math.floor(Math.random()*4);let n,s;t===0?(n=-e+Math.random()*2*e,s=-e):t===1?(n=-e+Math.random()*2*e,s=e):t===2?(n=-e,s=-e+Math.random()*2*e):(n=e,s=-e+Math.random()*2*e);const r=Jp(this.state.score,this.state.zmix),o=Qp[r];this.state.zombies.push({id:this.state.nextZid++,k:r,x:n,z:s,y:0,hp:o.hp,speed:im*o.spd*(.85+Math.random()*.4),atkCd:0})}applyStatic(e){if(!e||typeof e!="object")return;const t=this.state;if(e.config&&(this.config=e.config,t.config=e.config),e.map&&Array.isArray(e.map)){const n=JSON.stringify(e.map);n!==this._mapSig&&(this._mapSig=n,t.obstacles=e.map,this._rebuildObstacles(e.map))}}applySnapshot(e){if(!e||!Array.isArray(e.players)||!Array.isArray(e.zombies)||!Array.isArray(e.bullets)){console.warn("[applySnapshot] 丢弃残缺快照（缺少 players/zombies/bullets 数组）");return}const t=this.state;this.clientInterp=!0;const n=performance.now();let s=n;if(e.st!=null){this._stOff==null?this._stOff=n-e.st:this._stOff+=(n-e.st-this._stOff)*.05,s=this._stOff+e.st;const o=this.snaps[this.snaps.length-1];o&&s<=o.t&&(s=o.t+.1)}for(this.snaps.push({t:s,snap:e});this.snaps.length>2&&this.snaps[0].t<n-1e3;)this.snaps.shift();if(t.mode=e.mode||"wave",t.livesMax=e.livesMax===void 0||e.livesMax===null?1:e.livesMax|0,t.winner=e.winner||null,t.bounce=!!e.bounce,t.zmix=e.zmix||"progress",t.matchTime=e.matchTime||0,t.events=e.events||[],t.canStart=e.canStart===void 0?!0:!!e.canStart,e.owner&&(t.owner=e.owner),e.config&&(this.config=e.config,t.config=e.config),e.map){const o=JSON.stringify(e.map);o!==this._mapSig&&(this._mapSig=o,t.obstacles=e.map,this._rebuildObstacles(e.map))}t.players={};for(const o of e.players)t.players[o.id]={...o,input:{mx:0,mz:0,ax:0,az:0,fire:!1},fireCd:0,on:o.on===void 0?1:o.on,out:!!o.out,x:o.x||0,y:o.y||0,z:o.z||0,aim:o.aim||0,kills:o.kills||0,lives:o.lives??1,respawnCd:o.respawnCd||0};t.zombies=e.zombies.map(o=>({...o,speed:0,atkCd:0})),t.bullets=e.bullets.map(o=>({...o,vx:0,vz:0,vy:0,life:1,owner:null})),t.score=e.score,t.target=e.target,t.status=e.status;const r=e.players.find(o=>o.id===this.myId);if(r){if(!r.alive||(r.respawnCd||0)>0)this.pred=null,this.predHist.length=0,this._predStates.length=0,this._unacked.length=0;else if(this.pred&&r.ack!=null&&r.ack>0){const o=r.ack|0;for(;this._unacked.length&&this._unacked[0].seq<=o;)this._unacked.shift();const a={x:r.x,z:r.z,y:r.y||0,vy:r.vy||0,grounded:!!r.gr,jumpBuf:r.jb||0,coyoteT:r.ct||0,fireCd:r.fcd||0};for(const l of this._unacked)this._stepPredCmd(a,l,1/60,r);this.pred=a}}}interpolate(e){if(!this.clientInterp||this.snaps.length===0)return;const n=e-50,s=this.snaps;let r=s[0],o=s[s.length-1];for(let h=0;h<s.length;h++)if(s[h].t>n){o=s[h],r=h>0?s[h-1]:s[h];break}const a=o.t-r.t||1,l=Math.max(0,Math.min(1,(n-r.t)/a)),c=r.snap,d=o.snap,p=(h,u)=>h+(u-h)*l,f=(h,u)=>{let y=u-h;for(;y>Math.PI;)y-=2*Math.PI;for(;y<-Math.PI;)y+=2*Math.PI;return h+y*l},m=new Map(c.players.map(h=>[h.id,h]));for(const h in this.state.players){const u=d.players.find(T=>T.id===h),y=m.get(h),x=this.state.players[h];x.on!==0&&(u&&y&&u.on!==0&&y.on!==0?(x.x=p(y.x,u.x),x.y=p(y.y||0,u.y||0),x.z=p(y.z,u.z),x.aim=f(y.aim,u.aim)):u&&u.on!==0&&(x.x=u.x,x.y=u.y||0,x.z=u.z,x.aim=u.aim))}const g=new Map(c.zombies.map(h=>[h.id,h]));for(const h of this.state.zombies){const u=d.zombies.find(x=>x.id===h.id),y=g.get(h.id);u&&y?(h.x=p(y.x,u.x),h.z=p(y.z,u.z)):u&&(h.x=u.x,h.z=u.z)}const _=new Map(c.bullets.map(h=>[h.id,h]));for(const h of this.state.bullets){const u=d.bullets.find(x=>x.id===h.id),y=_.get(h.id);u&&y?(h.x=p(y.x,u.x),h.y=p(y.y||0,u.y||0),h.z=p(y.z,u.z)):u&&(h.x=u.x,h.y=u.y||0,h.z=u.z)}}_ensure(e,t,n){let s=e.get(t);return s||(s=n(),s.userData.first=!0,e.set(t,s),this.scene.add(s)),s}syncMeshes(){const e=this.state,t=new Set;for(const r in e.players){const o=e.players[r];t.add(r);const a=this._ensure(this.playerMeshes,r,()=>this._playerMesh(o.color));if(a.visible=o.on!==0&&o.alive,o.on===0)continue;const l=o.scale!=null?o.scale:o.stats?o.stats.scale:1;a.scale.x!==l&&a.scale.setScalar(l),a.userData.first?(a.position.set(o.x,o.y,o.z),a.userData.first=!1):this.clientInterp?a.position.set(o.x,o.y,o.z):(a.position.x+=(o.x-a.position.x)*.35,a.position.z+=(o.z-a.position.z)*.35,a.position.y=o.y),a.rotation.y=o.aim}for(const[r,o]of this.playerMeshes)t.has(r)||(this.scene.remove(o),this.playerMeshes.delete(r));const n=new Set;for(const r of e.zombies){n.add(r.id);const o=r.y||0,a=this._ensure(this.zombieMeshes,r.id,()=>this._zombieMesh(r.k));a.userData.first?(a.position.set(r.x,o,r.z),a.userData.first=!1):this.clientInterp?a.position.set(r.x,o,r.z):(a.position.x+=(r.x-a.position.x)*.4,a.position.z+=(r.z-a.position.z)*.4),a.position.y=o}for(const[r,o]of this.zombieMeshes)n.has(r)||(this.scene.remove(o),this.zombieMeshes.delete(r));const s=new Set;for(const r of e.bullets)s.add(r.id),this._ensure(this.bulletMeshes,r.id,()=>this._bulletMesh()).position.set(r.x,r.y||1,r.z);for(const[r,o]of this.bulletMeshes)s.has(r)||(this.scene.remove(o),this.bulletMeshes.delete(r))}feedLocalInput(e){e&&e.jump&&(this._jumpLatch=!0),this.predInput=e}predictTick(e){const t=.016666666666666666;this._predAcc+=e,this._predAcc>.25&&(this._predAcc=.25);let n=0;for(;this._predAcc>=t&&n<5;)this._simT+=t,this._predStepOnce(t),this.pred&&this._predStates.push({t:this._simT,x:this.pred.x,z:this.pred.z,y:this.pred.y}),this._predAcc-=t,n++;for(;this._predStates.length&&this._predStates[0].t<this._simT-.5;)this._predStates.shift();this._pendingCmds.length&&this.onCmds&&this.onCmds(this._pendingCmds.splice(0))}_predRender(){if(!this.pred)return null;const e=this._predStates;if(e.length===0)return{x:this.pred.x,z:this.pred.z,y:this.pred.y};const t=this._simT-1/60+this._predAcc;if(t<=e[0].t)return{x:e[0].x,z:e[0].z,y:e[0].y};let n=e[0],s=e[e.length-1];for(let a=e.length-1;a>=0;a--)if(e[a].t<=t){n=e[a],s=e[a+1]||e[a];break}const r=s.t-n.t||1,o=Math.max(0,Math.min(1,(t-n.t)/r));return{x:n.x+(s.x-n.x)*o,z:n.z+(s.z-n.z)*o,y:n.y+(s.y-n.y)*o}}_predStepOnce(e){if(!this.clientInterp||!this.myId)return;const t=this.state.players[this.myId];if(!t||!t.alive){this.pred=null,this.predHist.length=0,this._predStates.length=0,this._unacked.length=0,this._pendingCmds.length=0,this._jumpLatch=!1;return}this.pred||(this.pred={x:t.x,z:t.z,y:t.y||0,vy:0,grounded:!0,jumpBuf:0,coyoteT:0,fireCd:0});const n=this.predInput||{mx:0,mz:0},s=this.myYaw!=null?this.myYaw:t.aim,r={seq:++this._cmdSeq,mx:n.mx||0,mz:n.mz||0,ax:Math.sin(s),az:Math.cos(s),pitch:this.myPitch!=null?this.myPitch:n.pitch||0,fire:!!n.fire,jump:this._jumpLatch};this._jumpLatch=!1,this._stepPredCmd(this.pred,r,e,t),this._unacked.push(r),this._unacked.length>180&&this._unacked.shift(),this._pendingCmds.push(r)}_stepPredCmd(e,t,n,s){t.jump&&(e.jumpBuf=rm);let r=t.mx||0,o=t.mz||0;const a=Math.hypot(r,o);a>1&&(r/=a,o/=a);const l=t.ax,c=t.az,d=-o,p=r,f=d*l-p*c,m=d*c+p*l,g=this.state.obstacles||[],_=Is(this.config,s.talent),h=_.moveSpeed,u=Ns*(s.scale||_.scale||1),y=Al(e.x+f*h*n,-et+1,et-1),x=Al(e.z+m*h*n,-et+1,et-1),T=$p(g,e.x,e.z,y,x,u,e.y);e.x=T.x,e.z=T.z;const L=jp(g,e.x,e.z,em);e.grounded?e.coyoteT=am:e.coyoteT>0&&(e.coyoteT-=n),e.jumpBuf>0&&(e.grounded||e.coyoteT>0)?(e.vy=this.config.COMBAT.jumpForce,e.grounded=!1,e.jumpBuf=0,e.coyoteT=0):e.jumpBuf>0&&(e.jumpBuf-=n),e.grounded&&e.y>L+.01&&(e.grounded=!1),e.grounded?e.y=L:(e.vy-=sm*n,e.y+=e.vy*n,e.y<=L&&e.vy<=0&&(e.y=L,e.vy=0,e.grounded=!0)),Kp(g,e,u)}updateCamera(){const e=this.state.players[this.myId],t=this._predRender(),n=t?t.x:e?e.x:0,s=t?t.z:e?e.z:0,r=this.myYaw!=null?this.myYaw:e?e.aim:0,a=1.6+(t?t.y:e?e.y:0);this.clientInterp?this.camera.position.set(n,a,s):this.camera.position.lerp(new U(n,a,s),.25);const l=this.myPitch||0,c=Math.sin(r)*Math.cos(l),d=Math.sin(l),p=Math.cos(r)*Math.cos(l);this.camera.lookAt(this.camera.position.x+c*12,a+d*12,this.camera.position.z+p*12);const f=this.playerMeshes.get(this.myId);f&&(f.visible=!1)}render(){const e=performance.now();let t=(e-(this._lastRT||e))/1e3;if(this._lastRT=e,t>.25&&(t=.25),this.clientInterp&&(this.predictTick(t),this.interpolate(e)),this.syncMeshes(),this.updateCamera(),this.renderer.render(this.scene,this.camera),this._gameMode&&this._gl&&this._gl.submit)try{this._gl.submit()}catch{}}_clearMeshes(){for(const e of this.playerMeshes.values())this.scene.remove(e);for(const e of this.zombieMeshes.values())this.scene.remove(e);for(const e of this.bulletMeshes.values())this.scene.remove(e);this.playerMeshes.clear(),this.zombieMeshes.clear(),this.bulletMeshes.clear()}}const Rl=8123;function cm(){if(typeof window>"u")return null;const i=new URLSearchParams(window.location.search);return i.get("host")?`ws://${i.get("host")}:${Rl}`:window.__RELAY_WS__?window.__RELAY_WS__:null}function Cl(i){return new Promise((e,t)=>{let n;try{n=new WebSocket(i)}catch(r){t(r);return}const s=setTimeout(()=>{try{n.close()}catch{}t(new Error("relay 连接超时"))},4e3);n.onopen=()=>{clearTimeout(s),e(n)},n.onerror=()=>{clearTimeout(s),t(new Error("relay 连接失败（确认服务器已运行 relay）"))}})}class um{constructor(){this.connected=!1,this.ws=null,this.clientId="bc-"+Math.random().toString(36).slice(2,9),this._name="玩家"+Math.floor(Math.random()*900+100),this._onState=null,this._onRoomList=null,this._welcomeResolver=null,this._welcomeRejecter=null,this._leftIntent=!1,this._reconnectTimer=null,this._joinInfo=null,this._pingTimer=null,this._onRtt=null,this._relayUrl=null}setName(e){this._name=e}async connect(e,t=Rl){const n=e&&e!=="localhost"&&e!=="127.0.0.1"?`ws://${e}:${t}`:cm()||`ws://localhost:${t}`;this._relayUrl=n,this.ws=await Cl(n),this._pingTimer=setInterval(()=>{this.ws&&this.ws.readyState===1&&this.send({type:"ping",t:typeof performance<"u"?performance.now():Date.now()})},1e3),this._bindWs(),this.connected=!0}_bindWs(){this.ws&&(this.ws.onmessage=e=>this._handleMessage(e),this.ws.onclose=()=>this._handleClose())}_handleMessage(e){let t;try{t=JSON.parse(e.data)}catch{return}if(t.type==="welcome")this._onState&&this._onState(t),this._joinInfo&&(this._joinInfo.roomId=t.roomId||this._joinInfo.roomId||null),this._welcomeResolver&&(this._welcomeResolver(t),this._welcomeResolver=null,this._welcomeRejecter=null);else if(t.type==="state")this._onState&&this._onState(t);else if(t.type==="static")this._onState&&this._onState(t);else if(t.type==="roomList")this._onRoomList&&this._onRoomList(t.rooms||[]);else if(t.type==="error")this._welcomeRejecter&&(this._welcomeRejecter(new Error(t.msg||"操作被拒绝")),this._welcomeRejecter=null,this._welcomeResolver=null);else if(t.type==="nudgeHost")this._onState&&this._onState(t);else if(t.type==="hostChanged")this._onState&&this._onState(t);else if(t.type==="pong"){const n=t.t;if(n!=null){const s=typeof performance<"u"?performance.now():Date.now();this._onRtt&&this._onRtt(s-n)}}}_handleClose(){this.connected=!1,this._pingTimer&&(clearInterval(this._pingTimer),this._pingTimer=null),!this._leftIntent&&this._scheduleReconnect()}_scheduleReconnect(){this._reconnectTimer||this._leftIntent||!this._joinInfo||(this._reconnectTimer=setTimeout(async()=>{if(this._reconnectTimer=null,!(this._leftIntent||!this._joinInfo))try{this.ws=await Cl(this._relayUrl),this._bindWs(),this.connected=!0;const e=this._joinInfo;e.roomId?this.send({type:"joinRoom",roomId:e.roomId,name:e.name,pid:e.pid||null}):e.type==="create"&&this.send({type:"createRoom",name:e.name,playerName:e.name,mode:e.opts&&e.opts.mode,lives:e.opts&&e.opts.lives,target:e.opts&&e.opts.target,bounce:e.opts&&e.opts.bounce,zmix:e.opts&&e.opts.zmix,config:e.opts&&e.opts.config||null,pid:e.pid})}catch{this._scheduleReconnect()}},1500))}onState(e){this._onState=e}onRtt(e){this._onRtt=e}onRoomList(e){this._onRoomList=e}listRooms(){this.send({type:"listRooms"})}createRoom(e){return new Promise((t,n)=>{this._welcomeResolver=t,this._welcomeRejecter=n,this._joinInfo={type:"create",name:e.name,pid:e.pid||null,roomId:null,opts:e},this.send({type:"createRoom",name:e.name,playerName:e.playerName||e.name,mode:e.mode,lives:e.lives,target:e.target,bounce:e.bounce,zmix:e.zmix,config:e.config||null,pid:e.pid})})}sendTalent(e){this.send({type:"talent",talent:e})}joinRoom(e,t,n){return new Promise((s,r)=>{this._welcomeResolver=s,this._welcomeRejecter=r,this._joinInfo={type:"join",roomId:e,name:t,pid:n||null},this.send({type:"joinRoom",roomId:e,name:t,pid:n||null})})}leaveRoom(){this.send({type:"leaveRoom"}),this._joinInfo=null}sendReady(e){this.send({type:"ready",ready:!!e})}send(e){this.ws&&this.ws.readyState===1&&this.ws.send(JSON.stringify(e))}close(){if(this._leftIntent=!0,this.connected=!1,this._pingTimer&&(clearInterval(this._pingTimer),this._pingTimer=null),this._reconnectTimer&&(clearTimeout(this._reconnectTimer),this._reconnectTimer=null),this.ws){try{this.ws.close()}catch{}this.ws=null}}}let Li=!1;function Fs(){if(typeof window>"u")return"landscape";const i=window.innerWidth||0,e=window.innerHeight||0;return i>=e?"landscape":"portrait"}function Ll(){if(typeof screen>"u")return!1;try{const i=screen.orientation;if(i&&typeof i.lock=="function"){const t=i.lock("landscape");return t&&typeof t.catch=="function"&&t.catch(()=>{}),!0}const e=screen.lockOrientation||screen.mozLockOrientation||screen.msLockOrientation;if(typeof e=="function")return e.call(screen,"landscape"),!0}catch{}return!1}function dm(){if(!(typeof screen>"u"))try{const i=screen.orientation;if(i&&typeof i.unlock=="function"){i.unlock();return}const e=screen.unlockOrientation||screen.mozUnlockOrientation||screen.msUnlockOrientation;typeof e=="function"&&e.call(screen)}catch{}}let Yr=0,Os=null;const hm=1400;typeof document<"u"&&(document.addEventListener("pointerlockchange",()=>{document.pointerLockElement||(Yr=Date.now())}),document.addEventListener("pointerlockerror",()=>{},!1));function $r(i,e){if(!i||typeof document>"u"||document.pointerLockElement===i)return;const t=hm-(Date.now()-Yr);if(t>0&&!e){clearTimeout(Os),Os=setTimeout(()=>$r(i,!0),t);return}try{const n=i.requestPointerLock();n&&typeof n.catch=="function"&&n.catch(()=>{})}catch{}}function fm(){if(!(typeof document>"u")&&(Yr=Date.now(),clearTimeout(Os),Os=null,!!document.pointerLockElement))try{const i=document.exitPointerLock();i&&typeof i.catch=="function"&&i.catch(()=>{})}catch{}}class pm{constructor(e,t=1){this.el=e,this.sens=t,this.knob=e.querySelector(".knob"),this.x=0,this.y=0,this.active=!1,this.pointerId=null,this._lastMoveT=0,this._bind()}_bind(){const e=this.el,t=a=>{Li||this.pointerId===null&&(this.pointerId=a.pointerId,this.active=!0,this._lastMoveT=performance.now(),this._move(a),a.cancelable&&a.preventDefault())},n=a=>{if(!this.active)return;if(a.pointerId!==this.pointerId){const c=this.el.getBoundingClientRect(),d=c.left+c.width/2,p=c.top+c.height/2;if(!(Math.hypot(a.clientX-d,a.clientY-p)<=c.width*1.5))return;this.pointerId=a.pointerId}const l=performance.now();this._lastMoveT=l,this._move(a),a.cancelable&&a.preventDefault()},s=a=>{a.pointerId===this.pointerId&&(this.pointerId=null,this.active=!1,this.x=0,this.y=0,this._lastMoveT=0,this.knob.style.transform="translate(0,0)")},r=a=>{s(a)},o=a=>{s(a)};e.addEventListener("pointerdown",t),window.addEventListener("pointermove",n),window.addEventListener("pointerup",s),window.addEventListener("pointercancel",r),window.addEventListener("lostpointercapture",o)}_move(e){const t=this.el.getBoundingClientRect(),n=t.left+t.width/2,s=t.top+t.height/2;let r=e.clientX-n,o=e.clientY-s;const l=t.width/2/(this.sens||1);let c=Math.hypot(r,o);c>l&&(r=r/c*l,o=o/c*l,c=l);const d=l>0?c/l:0,p=.12;let f=0;d>p&&(f=(d-p)/(1-p),f=Math.pow(f,1.5));const m=c>0?r/c:0,g=c>0?o/c:0;this.x=m*f,this.y=g*f,this.knob.style.transform=`translate(${r}px, ${o}px)`}get vec(){return{x:this.x,y:this.y}}}class Pl{constructor({mode:e,canvas:t,moveEl:n,lookEl:s,fireEl:r,jumpEl:o,settings:a}){this.mode=e,this.canvas=t,this.settings=a||qi(),this.lookSens=this.settings.lookSens,this.joySens=this.settings.joySens,this.mouseSens=this.settings.mouseSens,this.keysMap=this.settings.keys,this.aimYaw=0,this.aimPitch=0,this.jumpQueued=!1,this.fire=!1,this.keys={},this.moveEl=n,this.lookEl=s,this.fireEl=r,this.jumpEl=o,this._dragStops=[],this._orient=Fs(),e==="touch"?(this.move=new pm(n,this.joySens),this._bindTouchLook(s),this._bindTouchFire(r),this._bindTouchJump(o),this._enableDrag(n,"joy"),this._enableDrag(r,"fire"),this._enableDrag(o,"jump"),this._bindOrientation(),this._applyLayout()):this._bindPC()}_bindPC(){const e=this.keysMap;window.addEventListener("keydown",r=>{this.keys[r.code]=!0,r.code===e.jump&&!r.repeat&&(this.jumpQueued=!0,r.preventDefault())}),window.addEventListener("keyup",r=>{this.keys[r.code]=!1});const t=this.canvas;t&&(t.addEventListener("mousedown",r=>{const o=document.getElementById("talent-panel");o&&!o.classList.contains("hidden")||(r.button===0&&(this.fire=!0),$r(t))}),window.addEventListener("mouseup",r=>{r.button===0&&(this.fire=!1)}));const n=Math.PI/2-.05,s=.0025*this.mouseSens;document.addEventListener("mousemove",r=>{typeof r.movementX=="number"&&(this.aimYaw-=r.movementX*s),typeof r.movementY=="number"&&(this.aimPitch-=r.movementY*s,this.aimPitch=Math.max(-n,Math.min(n,this.aimPitch)))})}_bindTouchLook(e){if(!e)return;const t=Math.PI/2-.05;let n=null,s=0,r=0;const o=m=>{n===null&&(n=m.pointerId,s=m.clientX,r=m.clientY,m.cancelable&&m.preventDefault())};let a=0,l=0;const c=.5,d=m=>{if(n===null)return;if(m.pointerId!==n){const h=m.clientX-s,u=m.clientY-r;if(Math.hypot(h,u)>150)return;n=m.pointerId}const g=m.clientX-s,_=m.clientY-r;s=m.clientX,r=m.clientY,a=a*(1-c)+g*c,l=l*(1-c)+_*c,this.aimYaw-=a*(.005*this.lookSens),this.aimPitch-=l*(.005*this.lookSens),this.aimPitch=Math.max(-t,Math.min(t,this.aimPitch)),m.cancelable&&m.preventDefault()},p=m=>{m.pointerId===n&&(n=null)},f=m=>{m.pointerId===n&&(n=null)};e.addEventListener("pointerdown",o),window.addEventListener("pointermove",d),window.addEventListener("pointerup",p),window.addEventListener("pointercancel",f)}_bindTouchFire(e){if(!e)return;let t=null;const n=a=>{a&&(a.cancelable&&a.preventDefault(),a.stopPropagation())},s=a=>{n(a),t===null&&(t=a.pointerId,!Li&&(this.fire=!0))},r=a=>{t!==null&&a.pointerId!==t||(t=null,n(a),this.fire=!1)},o=a=>{a.pointerId===t&&r(a)};e.addEventListener("pointerdown",s),window.addEventListener("pointerup",r),window.addEventListener("pointercancel",o)}_bindTouchJump(e){if(!e)return;let t=null;const n=a=>{a&&(a.cancelable&&a.preventDefault(),a.stopPropagation())},s=a=>{n(a),t===null&&(t=a.pointerId,!Li&&(this.jumpQueued=!0))},r=a=>{t!==null&&a.pointerId!==t||(t=null,n(a))},o=a=>{a.pointerId===t&&r(a)};e.addEventListener("pointerdown",s),window.addEventListener("pointerup",r),window.addEventListener("pointercancel",o)}_layout(){const e=this.settings;e.layouts||(e.layouts={landscape:Ln("landscape"),portrait:Ln("portrait")});const t=Fs();e.layouts[t]||(e.layouts[t]=Ln(t));const n=e.layouts[t];for(const s of["joy","fire","jump"])n[s]||(n[s]=Ln(t)[s]);return e.joy=n.joy,e.fire=n.fire,e.jump=n.jump,n}_applyLayout(){const e=this._layout(),t=(n,s)=>{if(!n||!s)return;const r=mm(n,s);s.xPct=r.xPct,s.yPct=r.yPct,n.style&&(n.style.left=r.xPct+"%",n.style.top=r.yPct+"%",n.style.bottom="auto",n.style.right="auto")};t(this.moveEl,e.joy),t(this.fireEl,e.fire),t(this.jumpEl,e.jump)}_bindOrientation(){if(typeof window>"u"||!window.addEventListener)return;let e=null;const t=()=>{clearTimeout(e),e=setTimeout(()=>{const n=Fs(),s=n!==this._orient;this._orient=n,this._applyLayout(),s&&(this._stopAllDrags(),pn(this.settings))},150)};window.addEventListener("orientationchange",t),window.addEventListener("resize",t),this._onOrientChange=t}_stopAllDrags(){for(const e of this._dragStops||[])try{e()}catch{}}_enableDrag(e,t){if(!e||!e.addEventListener)return;let n=null,s=!1,r=0,o=null,a=null;const l=()=>{if(r=0,!o||!a)return;const m=window.innerWidth||1,g=window.innerHeight||1,_=4,h=Math.max(_,Math.min(100-_,o.x/m*100)),u=Math.max(_,Math.min(100-_,o.y/g*100));a[t]={xPct:h,yPct:u};const y=h/100*m,x=u/100*g;e.style.transform=`translate3d(${y}px, ${x}px, 0) translate(-50%, -50%)`},c=m=>{if(s){if(m.pointerId!==n){const g=e.getBoundingClientRect(),_=g.left+g.width/2,h=g.top+g.height/2;if(Math.hypot(m.clientX-_,m.clientY-h)>Math.max(g.width,g.height)*2)return;n=m.pointerId}m.cancelable&&m.preventDefault(),o={x:m.clientX,y:m.clientY},r||(r=requestAnimationFrame(l))}},d=()=>{if(s){if(s=!1,r&&(cancelAnimationFrame(r),r=0),o=null,e.removeEventListener("pointermove",c),e.removeEventListener("pointerup",p),e.removeEventListener("pointercancel",p),e.removeEventListener("lostpointercapture",p),window.removeEventListener("blur",d),n!=null)try{e.releasePointerCapture(n)}catch{}n=null,e.classList.remove("dragging"),e.style.transform="",e.style.left="",e.style.top="",this._applyLayout(),pn(this.settings)}},p=m=>{if(m&&n!=null&&m.pointerId!==n){const g=e.getBoundingClientRect(),_=g.left+g.width/2,h=g.top+g.height/2;if(Math.hypot(m.clientX-_,m.clientY-h)>Math.max(g.width,g.height)*2)return;n=m.pointerId}d()},f=m=>{if(!Li||s)return;m.cancelable&&m.preventDefault(),m.stopPropagation(),s=!0,n=m.pointerId,a=this._layout();try{e.setPointerCapture(m.pointerId)}catch{}const g=window.innerWidth||1,_=window.innerHeight||1,h=a[t]||{xPct:50,yPct:50};e.style.left="0px",e.style.top="0px",e.style.transform=`translate3d(${h.xPct/100*g}px, ${h.yPct/100*_}px, 0) translate(-50%, -50%)`,e.classList.add("dragging"),e.addEventListener("pointermove",c),e.addEventListener("pointerup",p),e.addEventListener("pointercancel",p),e.addEventListener("lostpointercapture",p),window.addEventListener("blur",d)};e.addEventListener("pointerdown",f,{capture:!0}),(this._dragStops||(this._dragStops=[])).push(d)}getAimPitch(){return this.aimPitch||0}getInput(){if(this.mode==="touch"){const a=this.move.vec,l=a.x,c=a.y,d=Math.sin(this.aimYaw),p=Math.cos(this.aimYaw),f=this.jumpQueued;return this.jumpQueued=!1,{mx:l,mz:c,ax:d,az:p,pitch:this.aimPitch||0,fire:this.fire,jump:f}}const e=this.keysMap;let t=0,n=0;this.keys[e.forward]&&(n-=1),this.keys[e.back]&&(n+=1),this.keys[e.left]&&(t-=1),this.keys[e.right]&&(t+=1);const s=Math.sin(this.aimYaw),r=Math.cos(this.aimYaw),o=this.jumpQueued;return this.jumpQueued=!1,{mx:t,mz:n,ax:s,az:r,pitch:this.aimPitch||0,fire:this.fire,jump:o}}}Pl.prototype.setLayoutEdit=function(i){Li=!!i,Li?(this.fire=!1,this.jumpQueued=!1,this.move&&(this.move.active=!1,this.move.x=0,this.move.y=0,this.move.knob&&this.move.knob.style&&(this.move.knob.style.transform="translate(0,0)"))):this._stopAllDrags&&this._stopAllDrags()};function mm(i,e){const t=typeof window<"u"&&window.innerWidth||800,n=typeof window<"u"&&window.innerHeight||600,s=i&&i.offsetWidth||84,r=i&&i.offsetHeight||84,o=Math.min(s/2/t*100,4),a=Math.min(r/2/n*100,4),l=Math.max(o,Math.min(100-o,Number(e.xPct))),c=Math.max(a,Math.min(100-a,Number(e.yPct)));return{xPct:Number.isFinite(l)?l:50,yPct:Number.isFinite(c)?c:50}}const Dl="zombie-ui-settings",Kr=2;function Ln(i){return i==="portrait"?{joy:{xPct:21,yPct:80},fire:{xPct:80,yPct:71},jump:{xPct:80,yPct:87}}:{joy:{xPct:14,yPct:72},fire:{xPct:88,yPct:64},jump:{xPct:88,yPct:86}}}function qi(){const i=Ln("landscape");return{lookSens:1,joySens:1,mouseSens:1,keys:{forward:"KeyW",back:"KeyS",left:"KeyA",right:"KeyD",jump:"Space"},layoutVer:Kr,layouts:{landscape:i,portrait:Ln("portrait")},joy:i.joy,fire:i.fire,jump:i.jump,editMode:!1}}function Ul(i,e){const t={};for(const n of["joy","fire","jump"]){const s=i[n],r=e&&e[n]||null;t[n]={xPct:r&&typeof r.xPct=="number"?r.xPct:s.xPct,yPct:r&&typeof r.yPct=="number"?r.yPct:s.yPct}}return t}function gm(){try{const i=localStorage.getItem(Dl);if(i){const e=qi(),t=JSON.parse(i)||{},n=Object.assign({},e,t);n.keys=Object.assign({},e.keys,t.keys||{}),typeof n.mouseSens!="number"&&(n.mouseSens=e.mouseSens),(t.layoutVer|0)>=Kr&&t.layouts?n.layouts={landscape:Ul(e.layouts.landscape,t.layouts.landscape),portrait:Ul(e.layouts.portrait,t.layouts.portrait)}:n.layouts={landscape:Ln("landscape"),portrait:Ln("portrait")},n.layoutVer=Kr;const s=n.layouts[Fs()]||n.layouts.landscape;return n.joy=s.joy,n.fire=s.fire,n.jump=s.jump,n}}catch{}return qi()}function pn(i){try{localStorage.setItem(Dl,JSON.stringify(i))}catch{}}const rt={lastHp:null,lastKills:null,lastAlive:!0,lastEvent:0,lastStatus:""};function _m(){const i=document.getElementById("hitflash");i&&(i.classList.add("on"),clearTimeout(rt._hfT),rt._hfT=setTimeout(()=>i.classList.remove("on"),220))}function Zr(i,e){const t=document.getElementById("center-notify");t&&(t.textContent=i,t.className="center-notify show"+(e?" "+e:""),clearTimeout(rt._cnT),rt._cnT=setTimeout(()=>{t.className="center-notify"},1600))}const $n=Zr;function xm(i){const e=document.getElementById("killfeed");if(!e)return;const t=document.createElement("div");for(t.className="kf-line",t.innerHTML=i,e.appendChild(t);e.children.length>5;)e.removeChild(e.firstChild);setTimeout(()=>{t.parentNode&&t.parentNode.removeChild(t)},4e3)}let Il="";function vm(i,e){const t=i.mode||"wave",n=document.getElementById("hud-wave"),s=document.getElementById("hud-status"),r=document.getElementById("hud-players");if(n)if(t==="versus"){const f=i.players[e],m=f?f.lives??1:0,g=f&&f.kills||0,_=i.config||null,h=_&&_.ROOM?_.ROOM.timeLimit:0,u=(i.livesMax|0)===0;let y=`⚔ ${g} 杀 · 命 ${u?"∞":m}`;if(h>0&&i.status==="playing"){const x=Math.max(0,h*60-(i.matchTime||0)),T=Math.floor(x/60),L=Math.floor(x%60);y+=` · ⏱ ${T}:${String(L).padStart(2,"0")}`}n.textContent=y}else{const f=i.target>0?`${i.score}/${i.target}`:`${i.score}/∞`,m=i.livesMax===0?"∞":i.livesMax;n.textContent=`击杀 ${f} · 命 ${m}`}const o=i.players[e];if(o){if(rt.lastHp!=null&&o.hp<rt.lastHp&&o.alive&&_m(),rt.lastKills!=null&&o.kills>rt.lastKills&&t==="versus"&&Zr(`⚔ 击杀 +${o.kills-rt.lastKills}！`,"kill"),rt.lastAlive&&!o.alive&&i.status==="playing"){const f=(o.lives??0)>0||(i.livesMax|0)===0;Zr(f?"💀 你被击杀了，即将重生…":"💀 你已出局","death")}rt.lastHp=o.hp,rt.lastKills=o.kills,rt.lastAlive=o.alive}if(t==="versus"&&i.events&&i.events.length)for(const f of i.events){if(f.id<=rt.lastEvent)continue;rt.lastEvent=f.id;const m=i.players[f.killer]?i.players[f.killer].name:"?",g=i.players[f.victim]?i.players[f.victim].name:"?";xm(`<b>${zs(m)}</b> ⚔ ${zs(g)}`)}if(i.status==="playing"&&rt.lastStatus!=="playing"&&(rt.lastEvent=0,rt.lastHp=null,rt.lastKills=null,rt.lastAlive=!0),rt.lastStatus=i.status,s){let f="等待中";i.status==="playing"?f="进行中":i.status==="win"?f=t==="versus"?"本局结束":"胜利":i.status==="lose"&&(f=t==="versus"?"团灭出局":"失败"),s.textContent=f}if(r){let f=Object.keys(i.players).map(g=>i.players[g]);t==="versus"&&f.sort((g,_)=>(_.kills||0)-(g.kills||0));const m=f.map(g=>`${g.id}:${g.hp|0}:${g.maxHp|0}:${g.alive?1:0}:${g.lives??0}:${g.kills||0}:${(g.color>>>0).toString(16)}`).join("|")+"#"+e+"#"+t;if(m!==Il){Il=m,r.innerHTML="";for(const g of f){const _=g.id,h=Math.max(0,g.hp)/g.maxHp*100,u="#"+(g.color>>>0).toString(16).padStart(6,"0");let y="";t==="versus"?!g.alive&&(g.lives??0)>0?y=" 💀重生":g.alive||(y=" 💀出局"):g.alive||(y=" 💀");const x=(i.livesMax|0)===0,T=t==="versus"&&(x||(i.livesMax||1)>1)?` <span class="lives-badge">${x?"x∞":"x"+(g.lives??1)}</span>`:"",L=t==="versus"?`<span class="kills-badge">⚔${g.kills||0}</span>`:"",w=document.createElement("div");w.className="ph",w.innerHTML=`<span class="dot" style="background:${u}"></span><span>${zs(g.name)}${_===e?"(你)":""}${y}${T}</span>`+L+`<span class="bar"><i style="width:${h}%;background:${h<30?"#e53935":"#4caf50"}"></i></span><span class="hp-num">${g.alive?Math.max(0,Math.round(g.hp)):"—"}</span>`,r.appendChild(w)}}}const a=document.getElementById("wave-overlay"),l=document.getElementById("btn-start-wave");if(a){if(i.status==="playing")a.classList.add("hidden"),l&&(l.disabled=!1);else if(i.status==="waiting")if(a.classList.remove("hidden"),t==="versus"){const f=Object.values(i.players).filter(_=>_.on!==0),m=f.filter(_=>_.ready!==1).map(_=>_.name),g=document.getElementById("wave-hint");g&&(g.style.display="",f.length<2?g.textContent="⚔ 对战至少需要 2 人，邀请好友加入…":m.length?g.textContent="⏳ 等待配置天赋："+m.join("、"):g.textContent="✅ 全员已备好，房主可开始！"),l&&(l.disabled=!i.canStart)}else l&&(l.disabled=!1)}const c=document.getElementById("result"),d=document.getElementById("result-text"),p=document.getElementById("result-board");if(c&&d)if(i.status==="win"){if(c.classList.remove("hidden"),d.textContent=t==="versus"?"本局结束":"🎉 清场胜利！",p)if(t==="versus"){const f=(i.livesMax|0)===0,m=Object.values(i.players).slice().sort((g,_)=>(_.kills||0)-(g.kills||0)||(_.lives||0)-(g.lives||0));p.innerHTML=m.map((g,_)=>{const h="#"+(g.color>>>0).toString(16).padStart(6,"0"),u=f?"∞":g.lives??0;return`<div class="rb-row${g.id===e?" me":""}"><span class="rb-rank">${_+1}</span><span class="dot" style="background:${h}"></span><span class="rb-name">${zs(g.name)}${g.id===e?"(你)":""}</span><span class="rb-stat">⚔ ${g.kills||0}</span><span class="rb-stat">❤ ${u}</span></div>`}).join(""),p.classList.remove("hidden")}else p.classList.add("hidden")}else i.status==="lose"?(c.classList.remove("hidden"),d.textContent=t==="versus"?"💀 团灭出局":"💀 全员阵亡",p&&p.classList.add("hidden")):(c.classList.add("hidden"),p&&p.classList.add("hidden"))}function zs(i){return String(i).replace(/[&<>"']/g,e=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"})[e])}const Mm=/pointer\s*lock|exited the lock|requestPointerLock|fullscreen|Permissions check failed|user gesture/i,Bs=new Map;let ks=null;function Nl(){const i=document.getElementById("errbox");i&&i.remove(),Bs.clear(),clearTimeout(ks),ks=null}function Fl(i){if(i=String(i??""),!i||Mm.test(i))return;let e=document.getElementById("errbox");e||(e=document.createElement("div"),e.id="errbox",e.title="点击关闭",e.style.cssText="position:fixed;left:0;right:0;top:0;z-index:9999;background:#b71c1c;color:#fff;font:12px/1.5 monospace;padding:8px 10px;white-space:pre-wrap;max-height:45vh;overflow:auto;cursor:pointer;",e.addEventListener("click",Nl),(document.body||document.documentElement).appendChild(e)),Bs.set(i,(Bs.get(i)||0)+1),e.textContent=[...Bs].map(([t,n])=>n>1?`${t}  ×${n}`:t).join(`
`),clearTimeout(ks),ks=setTimeout(Nl,12e3)}window.addEventListener("error",i=>Fl("[error] "+(i.message||i.error)+(i.error&&i.error.stack?`
`+i.error.stack:""))),window.addEventListener("unhandledrejection",i=>Fl("[reject] "+(i.reason&&(i.reason.stack||i.reason.message)||i.reason)));const Pi=typeof window<"u"&&window.matchMedia&&(window.matchMedia("(pointer: coarse)").matches||!window.matchMedia("(pointer: fine)").matches&&"ontouchstart"in window)?"touch":"pc";let Re,We;const ee=i=>document.getElementById(i),Pn=i=>ee(i).classList.remove("hidden"),Pt=i=>ee(i).classList.add("hidden");function mn(){Pt("settings-panel"),Pt("layout-hint")}let _e=null,Dn="host",Ft=!1,Di=!1;function Sm(){try{const i=localStorage.getItem("zlan_name");if(i&&i.trim())return i.trim().slice(0,12)}catch{}return"玩家"+Math.floor(Math.random()*900+100)}function Ol(i){try{localStorage.setItem("zlan_name",(i||"").toString().slice(0,12))}catch{}}function ym(){try{let i=localStorage.getItem("zlan_pid");return i||(i="u"+Date.now().toString(36)+Math.random().toString(36).slice(2,10),localStorage.setItem("zlan_pid",i)),i}catch{return"u"+Math.random().toString(36).slice(2,12)}}let Dt=Sm();const zl=ym();let Ui=!1,_t="wave",bt=1,Ot=100,Kn=!1,Un="progress";const Em=3;function bm(){const i=(e,t)=>{const n=ee(e);if(!n)return t;const s=parseFloat(n.value);return Number.isFinite(s)?s:t};return{COMBAT:{baseHP:i("cfg-baseHP",100),baseDamage:i("cfg-baseDamage",34),baseMoveSpeed:i("cfg-baseMoveSpeed",12),fireRate:i("cfg-fireRate",6.25),bulletSpeed:i("cfg-bulletSpeed",32),jumpForce:i("cfg-jumpForce",9.5)},TALENT:{pointsPerPlayer:i("cfg-talentPoints",10)|0},ROOM:{timeLimit:i("cfg-timeLimit",10)|0,playerScale:i("cfg-playerScale",1),maxPlayers:i("cfg-maxPlayers",8)|0,baseLives:bt}}}const Hs=()=>_t==="versus"?bm():null,Bl=()=>Di?{type:"startGame"}:{type:"startGame",mode:_t,lives:bt,target:_t==="wave"?Ot:0,bounce:Kn,zmix:Un,config:Hs()},Ut={atk:0,def:0,spd:0,size:0,lives:0};let Jr=!1,Gs="";function kl(){const i=Re&&Re.state&&Re.state.config;return i&&i.TALENT?i.TALENT:Ci.TALENT}function Hl(){const i={...Ut};_e&&_e.sendTalent&&_e.sendTalent(i)}let Qr=0;function ea(i){const e=ee("talent-panel");if(!e||!i)return;const t=kl(),n=t.pointsPerPlayer|0,s=i.players&&i.players[Dn],r=s&&!s.alive&&(s.respawnCd||0)>0,o=n>0&&i.mode==="versus"&&(i.status==="waiting"||r),a=!!(s&&s.ready);(a||!o)&&(Qr=0);const l=o&&!a&&Date.now()>=Qr,c=qr(Ut),d=`${l}|${r}|${n}|${c}|${Ut.atk},${Ut.def},${Ut.spd},${Ut.size},${Ut.lives}`;if(d===Gs)return;const p=e.classList.contains("hidden");Gs=d;const f=ee("tp-title");if(f&&(f.textContent=r?"⚔ 趁复活改配装":"🎖 天赋加点"),e.classList.toggle("hidden",!l),!l)return;p&&fm();const m=n-c,g=ee("tp-points");g&&(g.textContent=`剩余 ${m} 点`),e.querySelectorAll(".tp-row").forEach(_=>{const h=_.dataset.t,u=Ut[h]|0,y=_.querySelector(".tp-lv");y&&(y.textContent=String(u));const x=fn(u+1)-fn(u),T=_.querySelector(".tp-cost");T&&(T.textContent=u>=(t.maxLevel|0)?"MAX":`+${x}点`);const L=_.querySelector(".tp-plus"),w=_.querySelector(".tp-minus");L&&(L.disabled=u>=(t.maxLevel|0)||x>m),w&&(w.disabled=u<=0)})}const ye=gm();async function ta(){_e=new um,_e.setName&&_e.setName(Dt),_e.onState(t=>{if(!(!t||typeof t!="object")){if(t.type==="welcome"){if(Dn=t.id,Re&&(Re.myId=Dn),t.owner!==void 0&&t.owner!==null){const n=Ft;Ft=t.owner===Dn,Ft&&t.resumed&&(Di=!0);const s=ee("btn-restart");s&&(s.textContent=Ft?"再来一局":"催房主重开"),Vs(),n&&!Ft&&$n("房主已移交给他人 👑")}Jr=!1,t.resumed&&$n("已接回原席位（命数/战绩保留）🔄");return}if(t.type==="static"){Re&&Re.applyStatic(t);return}if(t.type!=="leftRoom"){if(t.type==="error"){$n(t.msg||"操作被拒绝");return}if(t.type==="nudgeHost"){$n(`${t.name||"玩家"} 催你再来一局 🔁`);return}if(t.type==="hostChanged"){if(t.hostId===Dn){Ft=!0,Di=!0;const n=ee("btn-restart");n&&(n.textContent="再来一局"),Vs(),$n("原房主已退出，你成为新房主 👑")}else $n(`${t.name||"玩家"} 成为新房主 👑`);return}if(t.type==="state"){if(!Jr&&Array.isArray(t.players)){const n=t.players.find(s=>s.id===Dn);n&&n.talent&&(Object.assign(Ut,n.talent),Jr=!0,Gs="")}Re.applySnapshot(t)}}}}),_e.onRoomList(t=>Rm(t)),_e.onRtt(t=>Dm(t)),await _e.connect(null),ee("hud-status").textContent="已连接房间";const e=ee("host-info");e&&(e.classList.remove("hidden"),e.innerHTML=`游戏地址：<b>${location.origin}</b>　·　把这个地址发给好友，他们打开即可搜索并加入你的房间`)}function Gl(){if(Nm(),_e){if(_e.leaveRoom)try{_e.leaveRoom()}catch{}if(_e.close)try{_e.close()}catch{}}_e=null,Ft=!1,Di=!1,ee("hud-status").textContent="",Pt("hud"),Pt("result"),Pt("talent-panel"),mn(),Pn("menu")}function Vs(i){const e=i===void 0?Ft:!!i,t=ee("btn-start-wave"),n=ee("wave-hint"),s=Re&&Re.state&&Re.state.mode||_t;e?(t&&(t.style.display="",t.disabled=!1,t.textContent=s==="versus"?"⚔️ 开始对战":"🧟 开始僵尸浪潮"),n&&s!=="versus"&&(n.style.display="none")):(t&&(t.style.display="none"),n&&(n.style.display="",s!=="versus"&&(n.textContent="等待房主开始游戏…")))}function Vl(i){const e=ee("wave-overlay");e&&(e.classList.remove("hidden"),Vs(i)),Re&&(Re.onCmds=t=>{_e&&_e.send&&_e.send({type:"input",cmds:t})}),Im()}async function Wl(i,e,t){Dn="host",Ft=!0,Di=!1;{const r=ee("btn-restart");r&&(r.textContent="再来一局")}i&&(_t=i),e!=null&&(bt=e),t&&("bounce"in t&&(Kn=!!t.bounce),t.zmix&&(Un=t.zmix),"target"in t&&t.target!=null&&(Ot=t.target|0));const n=ee("player-name-create")?ee("player-name-create").value.trim():"";n&&(Dt=n.slice(0,12),Ol(Dt)),Pt("menu"),Pt("join"),Pt("mode-select"),mn(),Pn("hud"),Xl(),Re.hostInit(Dt),Re.state.mode=_t;const s=Hs();s&&Re.setConfig&&Re.setConfig(s);try{await ta(),await _e.createRoom({name:Dt,mode:_t,lives:bt,target:_t==="wave"?Ot:0,bounce:Kn,zmix:Un,config:Hs(),pid:zl}),Vl(!0)}catch(r){alert("建房失败："+r.message),Pn("menu"),Pt("hud")}}function Tm(){if(_t="wave",bt=1,Ot=100,Kn=!1,Un="progress",!ee("mode-select")){Wl("wave",1,{bounce:!1,zmix:"progress",target:100});return}const e=ee("mode-wave"),t=ee("mode-versus");e&&e.classList.add("active"),t&&t.classList.remove("active");const n=ee("bounce-toggle");n&&(n.checked=!1);const s=ee("player-name-create");s&&!s.value&&(s.value=Dt);const r=ee("zmix-progress"),o=ee("zmix-mix");r&&r.classList.add("active"),o&&o.classList.remove("active"),ji(),Ws(),na(),mn(),Pt("menu"),Pn("mode-select")}function ji(){const i=ee("lives-label");i&&(i.textContent=bt===0?"∞":String(bt))}function Ws(){const i=ee("target-label");i&&(i.textContent=Ot===0?"∞":String(Ot))}function na(){const i=_t==="versus",e=ee("lives-row");e&&e.classList.toggle("hidden",!1);const t=ee("target-row");t&&t.classList.toggle("hidden",i);const n=ee("zmix-row");n&&n.classList.toggle("hidden",i);const s=ee("adv-config");s&&s.classList.toggle("hidden",!i)}async function wm(){Ft=!1,Di=!1;{const t=ee("btn-restart");t&&(t.textContent="催房主再来一局")}mn(),Pt("menu"),Pn("join");const i=ee("room-list");i&&(i.innerHTML='<div class="empty">尚未搜索房间。点「搜索房间」查看可加入的房间。</div>');const e=ee("player-name-join");e&&!e.value&&(e.value=Dt)}async function Am(){const i=ee("player-name-join");i&&i.value.trim()&&(Dt=i.value.trim().slice(0,12),Ol(Dt),_e&&_e.setName&&_e.setName(Dt));try{await ta(),_e.listRooms()}catch(e){alert("连接失败："+e.message+`
请确认服务器已开 relay 且两台设备在同一网络。`)}}function Rm(i){const e=ee("room-list");if(e){if(!i||i.length===0){e.innerHTML='<div class="empty">暂无房间。让好友先「创建房间」吧。</div>';return}e.innerHTML="";for(const t of i){const n=document.createElement("div");n.className="room-card";const s=t.mode==="versus",r=s?"对战":"僵尸浪潮",o=t.players&&t.players.length?t.players.join("、"):"（暂无玩家）",a=s?"命 "+(t.lives===0?"∞":t.lives):"命 "+(t.lives===0?"∞":t.lives)+" · 目标 "+(t.target===0?"∞":t.target);n.innerHTML='<div class="rc-main"><div class="rc-name">'+ra(t.name)+'<span class="mode-badge'+(s?" versus":"")+'">'+r+'</span></div><div class="rc-sub">'+t.count+" 人 · "+ra(o)+" · "+(t.status==="playing"?"进行中":"等待中")+'</div><div class="rc-opt">'+a+'</div></div><button class="join-btn" data-room="'+ra(t.id)+'">加入</button>',e.appendChild(n)}e.querySelectorAll(".join-btn").forEach(t=>{t.onclick=()=>Cm(t.getAttribute("data-room"))})}}async function Cm(i){try{_e||await ta(),await _e.joinRoom(i,Dt,zl),Pt("join"),mn(),Pn("hud"),Xl(),Vl(!1)}catch(e){alert("加入失败："+e.message)}}function Xl(){const i=ee("controls"),e=ee("look-zone"),t=ee("btn-fire"),n=ee("btn-jump"),s=ee("pc-help");Pi==="touch"?([i,e,t,n].forEach(r=>r&&r.classList.remove("hidden")),s&&s.classList.add("hidden")):([i,e,t,n].forEach(r=>r&&r.classList.add("hidden")),s&&s.classList.remove("hidden"))}let In=null,Xs=0,qs=0,Yi=0;function Lm(){In||typeof document>"u"||(In=document.createElement("div"),In.id="fps-hud",In.textContent="-- FPS",In.style.cssText="position:fixed;top:4px;left:50%;transform:translateX(-50%);z-index:55;font:600 12px/1.3 ui-monospace,Menlo,Consolas,monospace;color:#7CFFB2;background:rgba(0,0,0,.42);padding:2px 7px;border-radius:7px;pointer-events:none;-webkit-user-select:none;user-select:none;letter-spacing:.3px;",document.body.appendChild(In))}let gn=null,$i=null;function Pm(){gn||typeof document>"u"||(gn=document.createElement("div"),gn.id="ping-hud",gn.textContent="📶 --",gn.style.cssText="position:fixed;top:26px;left:50%;transform:translateX(-50%);z-index:55;font:600 12px/1.3 ui-monospace,Menlo,Consolas,monospace;color:#9aa0a6;background:rgba(0,0,0,.42);padding:2px 7px;border-radius:7px;pointer-events:none;-webkit-user-select:none;user-select:none;letter-spacing:.3px;",document.body.appendChild(gn))}function Dm(i){if(!gn)return;$i=$i==null?i:$i*.7+i*.3;const e=Math.round($i);let t,n;e<=80?(t="#7CFFB2",n="📶 "+e+"ms"):e<=180?(t="#FFD166",n="📶 "+e+"ms"):(t="#FF5C5C",n="⚠ "+e+"ms 高延迟"),gn.textContent=n,gn.style.color=t}const ia=(()=>{try{return/Quark|UCBrowser|UCWEB/i.test(navigator.userAgent||"")}catch{return!1}})(),Um=1e3/60,ql=ia?100:0;let Zn=null,sa=0;function Im(){if(Ui)return;Ui=!0,Zn&&(clearTimeout(Zn),Zn=null),sa=0,Xs=0,qs=0,Yi=0,$i=null,Lm(),Pm();function i(n){if(Ui){if(Xs&&(Yi+=n-Xs,qs++,Yi>=500)){const s=Math.round(qs*1e3/Yi);In&&(In.textContent=s+" FPS"),Yi=0,qs=0}if(Xs=n,Re&&(Re.myPitch=We&&We.getAimPitch?We.getAimPitch():0,Re.myYaw=We&&We.aimYaw!=null?We.aimYaw:null,We&&We.getInput)){const s=We.getInput();Re.feedLocalInput&&Re.feedLocalInput(s)}Re.render(),(!ql||n-sa>=ql)&&(sa=n,vm(Re.state,Dn),ea(Re.state)),t()}}let e=performance.now();function t(){if(!Ui)return;if(!ia){requestAnimationFrame(i);return}const n=performance.now(),s=Math.max(0,Um-(n-e));e=n,Zn=setTimeout(()=>{Ui&&i(performance.now())},s)}t()}function Nm(){Ui=!1,Zn&&(clearTimeout(Zn),Zn=null)}function jl(){const i=document.documentElement,t=!(document.fullscreenElement||document.webkitFullscreenElement);try{const n=t?(i.requestFullscreen||i.webkitRequestFullscreen||function(){}).call(i):(document.exitFullscreen||document.webkitExitFullscreen||function(){}).call(document);n&&typeof n.catch=="function"?n.then(()=>{t&&Pi==="touch"&&Ll()}).catch(()=>{}):t&&Pi==="touch"&&setTimeout(()=>Ll(),60),t||dm()}catch{}setTimeout(()=>Re&&Re.resize(),80)}function Yl(){const i=document.getElementById("game-canvas");Re=new lm(i);const e={mode:Pi,canvas:i,moveEl:document.getElementById("joy-move"),lookEl:document.getElementById("look-zone"),fireEl:document.getElementById("btn-fire"),jumpEl:document.getElementById("btn-jump"),settings:ye};We=new Pl(e),ee("btn-create").onclick=()=>Tm(),ee("btn-join").onclick=()=>wm(),ee("btn-search-rooms").onclick=()=>Am(),ee("btn-back").onclick=()=>{if(_e&&_e.close)try{_e.close()}catch{}_e=null,mn(),Pn("menu"),Pt("join")};const t=ee("player-name-join");t&&!t.value&&(t.value=Dt);const n=ee("player-name-create");n&&!n.value&&(n.value=Dt);const s=ee("mode-wave"),r=ee("mode-versus");s&&(s.onclick=()=>{_t="wave",bt=1,Ot=100,s.classList.add("active"),r&&r.classList.remove("active"),ji(),Ws(),na()}),r&&(r.onclick=()=>{_t="versus",bt=Em,r.classList.add("active"),s&&s.classList.remove("active"),ji(),na()});const o=ee("lives-less"),a=ee("lives-more");o&&(o.onclick=()=>{bt=Math.max(0,bt-1),ji()}),a&&(a.onclick=()=>{bt=Math.min(20,bt+1),ji()});const l=ee("target-less"),c=ee("target-more");l&&(l.onclick=()=>{Ot=Math.max(0,Ot-10),Ws()}),c&&(c.onclick=()=>{Ot=Math.min(500,Ot+10),Ws()});const d=ee("btn-mode-start");d&&(d.onclick=()=>Wl(_t,bt,{bounce:Kn,zmix:Un,target:_t==="wave"?Ot:0}));const p=ee("btn-mode-back");p&&(p.onclick=()=>{Pt("mode-select"),mn(),Pn("menu")});const f=ee("bounce-toggle");f&&(f.onchange=()=>{Kn=!!f.checked});const m=ee("zmix-progress"),g=ee("zmix-mix");m&&(m.onclick=()=>{Un="progress",m.classList.add("active"),g&&g.classList.remove("active")}),g&&(g.onclick=()=>{Un="mix",g.classList.add("active"),m&&m.classList.remove("active")});const _=ee("btn-restart");_.textContent=Ft?"再来一局":"催房主再来一局",_.onclick=()=>{if(mn(),Ft){if((Re&&Re.state&&Re.state.mode||_t)==="versus"){_e&&_e.send&&_e.send({type:"backToWaiting"}),Vs();return}_e&&_e.send&&_e.send(Bl());return}_e&&_e.send&&(_e.send({type:"nudgeHost",action:"restart",name:Dt}),$n("已催房主再来一局 🔁"),ee("hud-status").textContent="已催房主再来一局，等待房主重开…")},ee("btn-start-wave").onclick=()=>{mn(),Ft?_e&&_e.send&&_e.send(Bl()):_e&&_e.send&&_e.send({type:"startGame",mode:_t,lives:bt,target:_t==="wave"?Ot:0,bounce:Kn,zmix:Un,config:Hs()}),ee("wave-overlay").classList.add("hidden")},document.querySelectorAll("#talent-panel .tp-row").forEach(D=>{const W=D.dataset.t,j=D.querySelector(".tp-plus"),ae=D.querySelector(".tp-minus");j&&(j.onclick=()=>{const H=kl(),q=Ut[W]|0;if(q>=(H.maxLevel|0))return;const le=fn(q+1)-fn(q),fe=(H.pointsPerPlayer|0)-qr(Ut);le>fe||(Ut[W]=q+1,Hl(),Re&&Re.state&&ea(Re.state))}),ae&&(ae.onclick=()=>{(Ut[W]|0)<=0||(Ut[W]-=1,Hl(),Re&&Re.state&&ea(Re.state))})});const h=ee("tp-close");h&&(h.onclick=()=>{Qr=Date.now()+1500;const D=ee("talent-panel");D&&D.classList.add("hidden"),Gs="",_e&&_e.send&&_e.send({type:"ready",ready:!0}),Re&&Re.state&&Re.state.status==="playing"&&$r(document.getElementById("game-canvas"))});const u=ee("btn-fullscreen");u&&(u.onclick=()=>jl()),window.addEventListener("keydown",D=>{D.code==="KeyF"&&(D.preventDefault(),jl())}),["fullscreenchange","webkitfullscreenchange"].forEach(D=>document.addEventListener(D,()=>Re&&Re.resize()));const y=ee("settings-panel"),x=()=>{const D=ee("set-pc"),W=ee("set-touch");Pi==="touch"?(D&&D.classList.add("hidden"),W&&W.classList.remove("hidden")):(D&&D.classList.remove("hidden"),W&&W.classList.add("hidden"))};ee("btn-settings").onclick=()=>{y.classList.toggle("hidden"),x()};const T=ee("btn-leave-lobby");T&&(T.onclick=()=>Gl()),ee("btn-result-menu").onclick=()=>Gl(),ee("set-close").onclick=()=>y.classList.add("hidden");const L=ee("set-look"),w=ee("set-joy"),A=ee("val-look"),X=ee("val-joy");L.value=ye.lookSens,A.textContent=ye.lookSens.toFixed(1),w.value=ye.joySens,X.textContent=ye.joySens.toFixed(1),L.oninput=()=>{ye.lookSens=parseFloat(L.value),A.textContent=ye.lookSens.toFixed(1),We&&(We.lookSens=ye.lookSens),pn(ye)},w.oninput=()=>{ye.joySens=parseFloat(w.value),X.textContent=ye.joySens.toFixed(1),We&&(We.joySens=ye.joySens,We.move&&(We.move.sens=ye.joySens)),pn(ye)};const S=ee("set-edit"),b=ee("layout-hint"),k=()=>{if(S.textContent="拖动布置："+(ye.editMode?"开":"关"),S.classList.toggle("primary",ye.editMode),[ee("joy-move"),ee("btn-fire"),ee("btn-jump")].forEach(D=>D&&D.classList.toggle("editing",ye.editMode)),b){b.classList.toggle("hidden",!ye.editMode);const D=ee("lh-orient");D&&(D.textContent=window.innerWidth>=window.innerHeight?"横屏":"竖屏")}ye.editMode&&y.classList.add("hidden")},$=D=>{ye.editMode=!!D,We&&We.setLayoutEdit&&We.setLayoutEdit(ye.editMode),k(),pn(ye)};S.onclick=()=>$(!ye.editMode);const ie=ee("lh-done");ie&&(ie.onclick=()=>$(!1)),window.addEventListener("orientationchange",()=>setTimeout(k,200)),window.addEventListener("resize",()=>{ye.editMode&&k()}),ee("set-reset").onclick=()=>{Object.assign(ye,qi()),We&&(We.lookSens=ye.lookSens,We.joySens=ye.joySens,We.move&&(We.move.sens=ye.joySens),We._applyLayout()),L.value=ye.lookSens,A.textContent=ye.lookSens.toFixed(1),w.value=ye.joySens,X.textContent=ye.joySens.toFixed(1),k(),pn(ye)},k(),ye.editMode&&We&&We.setLayoutEdit&&We.setLayoutEdit(!0);const C=ee("set-mouse"),z=ee("val-mouse");C.value=ye.mouseSens,z.textContent=ye.mouseSens.toFixed(1),C.oninput=()=>{ye.mouseSens=parseFloat(C.value),z.textContent=ye.mouseSens.toFixed(1),We&&(We.mouseSens=ye.mouseSens),pn(ye)};const G=["forward","back","left","right","jump"],Y=()=>{G.forEach(D=>{const W=document.querySelector('.key-btn[data-act="'+D+'"]'),j=W&&W.querySelector("b");j&&(j.textContent=$l(ye.keys[D]))})};Y();let V=null;if(document.querySelectorAll(".key-btn").forEach(D=>{D.addEventListener("click",()=>{if(V)return;const W=D.dataset.act;V=W;const j=D.querySelector("b");D.classList.add("listening");const ae=j?j.textContent:"";j&&(j.textContent="…");const H=q=>{q.preventDefault(),q.stopPropagation(),ye.keys[W]=q.code,We&&(We.keysMap=ye.keys),j&&(j.textContent=$l(q.code)),D.classList.remove("listening"),V=null,pn(ye)};window.addEventListener("keydown",H,{capture:!0,once:!0}),setTimeout(()=>{V===W&&(window.removeEventListener("keydown",H,{capture:!0}),j&&(j.textContent=ae),D.classList.remove("listening"),V=null)},5e3)})}),ee("set-keys-reset").onclick=()=>{Object.assign(ye.keys,qi().keys),We&&(We.keysMap=ye.keys),Y(),pn(ye)},ia){const D=document.getElementById("u4-warn");D&&(D.hidden=!1)}}document.readyState==="loading"?document.addEventListener("DOMContentLoaded",Yl):Yl();function ra(i){return String(i).replace(/[&<>"']/g,e=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"})[e])}function $l(i){if(!i)return"?";let e;return(e=/^Key([A-Z])$/.exec(i))||(e=/^Digit(\d)$/.exec(i))?e[1]:(e=/^Arrow(Up|Down|Left|Right)$/.exec(i))?{Up:"↑",Down:"↓",Left:"←",Right:"→"}[e[1]]:{Space:"␣",ShiftLeft:"LShift",ShiftRight:"RShift",ControlLeft:"LCtrl",ControlRight:"RCtrl",AltLeft:"LAlt",AltRight:"RAlt",Tab:"Tab",Enter:"Enter",Backquote:"`"}[i]||i}let Kl=!1;function Zl(i){if(!(i&&i.persisted)&&!Kl){Kl=!0;try{_e&&_e.close&&_e.close()}catch{}}}window.addEventListener("pagehide",Zl),window.addEventListener("beforeunload",Zl),console.log("[Game4U] 就绪。模式: 桌面/HTML（中心化 relay 客户端）","| 控制:",Pi)})();
