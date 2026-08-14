(function(){"use strict";var Fo=document.createElement("style");Fo.textContent=`:root{--bg: #0d1117;--panel: rgba(18, 24, 33, .92);--primary: #4caf50;--primary-d: #388e3c;--danger: #e53935;--text: #e6edf3;--muted: #8b98a5}*{box-sizing:border-box;-webkit-tap-highlight-color:transparent}html,body{margin:0;padding:0;width:100%;height:100%;overflow:hidden;background:var(--bg);color:var(--text);font-family:-apple-system,PingFang SC,Microsoft YaHei,system-ui,sans-serif;user-select:none;-webkit-user-select:none;touch-action:none;overscroll-behavior:none}#game-canvas{position:fixed;top:0;right:0;bottom:0;left:0;width:100%;height:100%;display:block}.hidden{display:none!important}.overlay{position:fixed;top:0;right:0;bottom:0;left:0;display:flex;align-items:center;justify-content:center;align-items:safe center;overflow-y:auto;-webkit-overflow-scrolling:touch;background:radial-gradient(circle at 50% 30%,#161b22,#0d1117 70%);z-index:20;padding:max(16px,env(safe-area-inset-top)) max(16px,env(safe-area-inset-right)) max(16px,env(safe-area-inset-bottom)) max(16px,env(safe-area-inset-left))}.panel{width:100%;max-width:420px;margin:auto;background:var(--panel);border:1px solid #232c38;border-radius:18px;padding:28px 22px;text-align:center;box-shadow:0 12px 40px #00000080}.panel h1{margin:0 0 6px;font-size:34px;letter-spacing:1px}.panel h2{margin:0 0 14px;font-size:22px}.sub{color:var(--muted);font-size:13px;margin:0 0 22px}.tip{color:var(--muted);font-size:12px;margin-top:18px;line-height:1.6}.compat-warn{color:#f0a23b;background:#f0a23b14;border:1px solid rgba(240,162,59,.35);border-radius:8px;padding:8px 10px}.big-btn{display:block;width:100%;margin:10px 0;padding:15px;font-size:16px;font-weight:600;color:var(--text);background:#1f2733;border:1px solid #2c3744;border-radius:12px;cursor:pointer;transition:transform .05s ease,background .15s ease}.big-btn:active{transform:scale(.98)}.big-btn.primary{background:var(--primary);border-color:var(--primary-d);color:#fff}.big-btn.ghost{background:transparent;color:var(--muted)}.mode-btn{display:flex;flex-direction:column;gap:4px;width:100%;margin:10px 0;padding:16px 18px;text-align:left;background:#161d27;border:2px solid #2a3543;border-radius:14px;color:var(--text);cursor:pointer;transition:border-color .15s ease,background .15s ease,transform .05s ease}.mode-btn:active{transform:scale(.99)}.mode-btn.active{border-color:var(--primary);background:#18241c}.mode-ico{font-size:26px;line-height:1}.mode-title{font-size:17px;font-weight:700;margin-top:4px}.mode-desc{font-size:12px;color:var(--muted);line-height:1.5}.lives-row{display:flex;align-items:center;justify-content:space-between;margin:14px 2px 4px}.lives-text{font-size:14px;color:var(--text)}.lives-stepper{display:flex;align-items:center;gap:14px}.step-btn{width:38px;height:38px;font-size:22px;line-height:1;border-radius:10px;background:#1f2733;border:1px solid #2c3744;color:var(--text);cursor:pointer}.step-btn:active{transform:scale(.94)}.lives-num{min-width:28px;text-align:center;font-size:20px;font-weight:700}.opt-row{display:flex;align-items:center;justify-content:space-between;gap:12px;margin:12px 2px 2px;padding:10px 12px;background:#161d27;border:1px solid #2a3543;border-radius:12px}.opt-text{font-size:14px;color:var(--text);text-align:left}.opt-sub{display:block;font-size:11px;color:var(--muted);margin-top:2px}.switch{position:relative;display:inline-block;width:46px;height:26px;flex:0 0 auto}.switch input{display:none}.switch .slider{position:absolute;top:0;right:0;bottom:0;left:0;background:#2c3744;border-radius:999px;cursor:pointer;transition:background .15s ease}.switch .slider:before{content:"";position:absolute;left:3px;top:3px;width:20px;height:20px;background:#fff;border-radius:50%;transition:transform .15s ease}.switch input:checked+.slider{background:var(--primary)}.switch input:checked+.slider:before{transform:translate(20px)}.seg{display:inline-flex;background:#0f141b;border:1px solid #2c3744;border-radius:10px;overflow:hidden;flex:0 0 auto}.seg-btn{padding:8px 16px;font-size:13px;font-weight:600;color:var(--muted);background:transparent;border:none;cursor:pointer}.seg-btn.active{background:var(--primary);color:#fff}.room-list{max-height:320px;overflow-y:auto;margin:8px 0 16px}.room-item{display:flex;align-items:center;justify-content:space-between;padding:14px 16px;margin:8px 0;background:#161d27;border:1px solid #2a3543;border-radius:12px;cursor:pointer;text-align:left}.room-item:active{background:#1d2733}.room-item .r-name{font-size:16px;font-weight:600}.room-item .r-meta{font-size:12px;color:var(--muted);margin-top:3px}.room-item .r-join{color:var(--primary);font-weight:700;font-size:14px}.empty{color:var(--muted);font-size:14px;padding:24px 0}.hud{position:fixed;top:0;right:0;bottom:0;left:0;z-index:50;pointer-events:none}#hud-top{position:absolute;top:max(14px,env(safe-area-inset-top));left:0;right:0;display:flex;justify-content:center;gap:14px;font-size:15px;font-weight:700;text-shadow:0 1px 3px #000}#hud-players{position:absolute;top:max(50px,calc(env(safe-area-inset-top) + 40px));left:12px;display:flex;flex-direction:column;gap:6px}#crosshair{position:absolute;top:50%;left:50%;width:26px;height:26px;transform:translate(-50%,-50%);pointer-events:none;z-index:12}#crosshair:before,#crosshair:after{content:"";position:absolute;background:#ffffffd9;box-shadow:0 0 3px #000000e6}#crosshair:before{left:50%;top:0;width:2px;height:100%;transform:translate(-50%)}#crosshair:after{top:50%;left:0;height:2px;width:100%;transform:translateY(-50%)}.ph{display:flex;align-items:center;gap:6px;font-size:13px;text-shadow:0 1px 2px #000}.ph .dot{width:10px;height:10px;border-radius:50%}.bar{width:84px;height:8px;background:#333;border-radius:4px;overflow:hidden}.bar>i{display:block;height:100%;background:var(--primary)}.lives-badge{font-size:11px;color:var(--muted);background:#1c2530;border-radius:6px;padding:1px 6px;margin-left:2px}.result{position:absolute;top:0;right:0;bottom:0;left:0;display:flex;flex-direction:column;align-items:center;justify-content:center;justify-content:safe center;overflow-y:auto;-webkit-overflow-scrolling:touch;padding:18px 12px;background:#05080cb8;pointer-events:auto;gap:18px}.result h2{font-size:30px;margin:0}.controls{position:fixed;top:0;right:0;bottom:0;left:0;z-index:15;pointer-events:none}.joystick{position:absolute;left:14%;top:72%;width:120px;height:120px;border-radius:50%;background:#ffffff0f;border:2px solid rgba(255,255,255,.18);pointer-events:auto;touch-action:none;transform:translate(-50%,-50%)}.joystick .knob{position:absolute;left:50%;top:50%;width:52px;height:52px;margin:-26px 0 0 -26px;border-radius:50%;background:#ffffff8c;border:2px solid rgba(255,255,255,.8)}.joystick .label{position:absolute;bottom:-22px;left:0;right:0;text-align:center;font-size:11px;color:var(--muted)}.look-zone{position:fixed;top:0;right:0;width:50%;height:100%;z-index:13;pointer-events:auto;touch-action:none;background:transparent}.fire-btn{position:fixed;left:88%;top:64%;width:84px;height:84px;border-radius:50%;display:flex;align-items:center;justify-content:center;background:#e53935d1;border:2px solid rgba(255,255,255,.7);color:#fff;font-size:16px;font-weight:700;letter-spacing:1px;z-index:16;pointer-events:auto;touch-action:none;-webkit-user-select:none;user-select:none;box-shadow:0 4px 14px #00000080;transform:translate(-50%,-50%)}.fire-btn:active{transform:translate(-50%,-50%) scale(.92);background:#e53935}.pc-help{position:fixed;bottom:12px;left:50%;transform:translate(-50%);display:flex;gap:16px;align-items:center;z-index:14;pointer-events:none;background:#121821b8;border:1px solid #2c3744;border-radius:10px;padding:8px 16px;font-size:12px;color:var(--muted);text-shadow:0 1px 2px #000}.pc-help b{color:var(--text)}.pc-help .dim{opacity:.7}.host-info{position:absolute;bottom:calc(56px + env(safe-area-inset-bottom));left:50%;transform:translate(-50%);background:#121821eb;border:1px solid #2c3744;border-radius:10px;padding:8px 14px;font-size:12px;color:var(--text);text-align:center;max-width:92vw;z-index:14;pointer-events:none}.host-info b{color:var(--primary)}.row{display:flex;gap:8px;margin-top:10px}.row input{flex:1;min-width:0;padding:12px;font-size:15px;border-radius:10px;border:1px solid #2c3744;background:#0f141b;color:var(--text);outline:none}.row input:focus{border-color:var(--primary)}.wave-overlay{position:absolute;top:54px;right:12px;display:flex;flex-direction:column;align-items:flex-end;gap:4px;pointer-events:none;z-index:16}.wave-btn{pointer-events:auto;padding:7px 14px;font-size:13px;font-weight:600;color:#fff;background:var(--primary);border:1px solid var(--primary-d);border-radius:999px;cursor:pointer;box-shadow:0 2px 8px #0006}.wave-btn:active{transform:scale(.97)}.wave-overlay .wave-hint{color:var(--muted);font-size:11px;text-shadow:0 1px 2px #000}.fs-btn{position:fixed;top:12px;right:12px;z-index:30;pointer-events:auto;padding:6px 12px;font-size:12px;font-weight:600;color:var(--text);background:#121821b8;border:1px solid #2c3744;border-radius:999px;cursor:pointer;box-shadow:0 2px 8px #0006}.fs-btn:active{transform:scale(.97)}.jump-btn{position:fixed;left:88%;top:86%;width:76px;height:76px;border-radius:50%;display:flex;align-items:center;justify-content:center;background:#4caf50d1;border:2px solid rgba(255,255,255,.7);color:#fff;font-size:18px;font-weight:700;z-index:16;pointer-events:auto;touch-action:none;-webkit-user-select:none;user-select:none;box-shadow:0 4px 14px #00000080;transform:translate(-50%,-50%)}.jump-btn:active{transform:translate(-50%,-50%) scale(.92);background:#4caf50}.settings-btn{position:fixed;top:12px;left:12px;z-index:30;pointer-events:auto;padding:6px 12px;font-size:12px;font-weight:600;color:var(--text);background:#121821b8;border:1px solid #2c3744;border-radius:999px;cursor:pointer;box-shadow:0 2px 8px #0006}.settings-btn:active{transform:scale(.97)}.settings-panel{position:fixed;top:50%;left:50%;transform:translate(-50%,-50%);width:min(92vw,360px);max-height:84vh;overflow-y:auto;background:var(--panel);border:1px solid #2c3744;border-radius:16px;padding:20px;z-index:40;display:flex;flex-direction:column;gap:10px;box-shadow:0 12px 40px #0009}.settings-panel h3{margin:0 0 6px;font-size:18px;text-align:center}.settings-panel label{font-size:13px;color:var(--muted);display:flex;justify-content:space-between}.settings-panel label span{color:var(--text);font-weight:700}.settings-panel input[type=range]{width:100%;accent-color:var(--primary)}.settings-panel .tip{color:var(--muted);font-size:11px;margin:4px 0 0;line-height:1.5}.set-section{display:flex;flex-direction:column;gap:10px;padding:12px;background:#ffffff0a;border:1px solid #2a3543;border-radius:12px}.set-section-title{font-size:12px;font-weight:700;color:var(--primary);letter-spacing:1px}.set-row{display:flex;flex-direction:column;gap:6px}.set-row.keys{gap:8px}.key-btn{flex:1 1 auto;min-width:0;padding:10px 6px;font-size:13px;font-weight:600;color:var(--text);background:#1f2733;border:1px solid #2c3744;border-radius:10px;cursor:pointer;display:flex;align-items:center;justify-content:center;gap:6px;transition:background .15s ease}.key-btn b{color:var(--primary);font-size:14px;min-width:18px;display:inline-block;text-align:center}.key-btn:active{transform:scale(.97)}.key-btn.listening{background:var(--primary);border-color:var(--primary-d);color:#fff;animation:kpulse 1s ease-in-out infinite}.key-btn.listening b{color:#fff}@keyframes kpulse{0%,to{opacity:1}50%{opacity:.6}}.editing{outline:2px dashed var(--primary);outline-offset:2px}.dragging{will-change:transform}.layout-hint{position:fixed;top:max(10px,env(safe-area-inset-top));left:50%;transform:translate(-50%);display:flex;align-items:center;gap:12px;z-index:45;pointer-events:auto;max-width:min(92vw,460px);background:#121821f0;border:1px solid var(--primary);border-radius:999px;padding:7px 8px 7px 16px;box-shadow:0 4px 18px #0000008c}.layout-hint .lh-text{font-size:12px;color:var(--text);white-space:nowrap}.layout-hint .lh-text b{color:var(--primary)}.lh-done{flex:0 0 auto;padding:6px 14px;font-size:13px;font-weight:700;color:#fff;background:var(--primary);border:1px solid var(--primary-d);border-radius:999px;cursor:pointer}.lh-done:active{transform:scale(.96)}.name-row{margin:0 0 8px}.name-input{width:100%;padding:13px 14px;font-size:15px;border-radius:10px;border:1px solid #2c3744;background:#0f141b;color:var(--text);outline:none;text-align:center}.name-input:focus{border-color:var(--primary)}.mode-title-sm{margin:4px 0 12px;font-size:15px;color:var(--muted);font-weight:600}.rooms-title{margin:18px 0 8px;font-size:15px;color:var(--muted);font-weight:600;text-align:left}.room-list{display:flex;flex-direction:column;gap:10px;max-height:42vh;overflow-y:auto;margin-bottom:6px}.room-list .empty{color:var(--muted);font-size:13px;padding:20px 0;text-align:center}.room-card{display:flex;align-items:center;justify-content:space-between;gap:10px;padding:12px 14px;background:#141b24;border:1px solid #2a3543;border-radius:12px;text-align:left}.room-card .rc-main{min-width:0;flex:1}.room-card .rc-name{font-size:15px;font-weight:700;color:var(--text);display:flex;align-items:center;gap:8px}.room-card .rc-sub{font-size:12px;color:var(--muted);margin-top:4px;overflow:hidden;text-overflow:ellipsis;white-space:nowrap}.room-card .rc-opt{font-size:12px;color:var(--primary);margin-top:3px;font-weight:600}.room-card .mode-badge{font-size:11px;font-weight:700;padding:2px 8px;border-radius:999px;background:#4caf502e;color:var(--primary);border:1px solid rgba(76,175,80,.4)}.room-card .mode-badge.versus{background:#e539352e;color:#ff6b6b;border-color:#e5393566}.room-card .join-btn{flex:0 0 auto;padding:9px 16px;font-size:14px;font-weight:700;color:#fff;background:var(--primary);border:1px solid var(--primary-d);border-radius:10px;cursor:pointer}.room-card .join-btn:active{transform:scale(.96)}.room-card .join-btn:disabled{opacity:.5;cursor:default}.kills-badge{font-size:11px;color:#ffb74d;background:#2a2015;border-radius:6px;padding:1px 6px;margin:0 4px;white-space:nowrap}.adv-config{margin:10px 0;border:1px solid #26303c;border-radius:10px;background:#10161d;padding:6px 10px;text-align:left}.adv-config summary{cursor:pointer;font-size:14px;color:var(--muted);padding:6px 2px;-webkit-user-select:none;user-select:none}.adv-config[open] summary{color:#e3f2fd}.adv-grid{display:grid;grid-template-columns:1fr 1fr;gap:8px;margin:8px 0}.adv-grid label{display:flex;flex-direction:column;font-size:12px;color:var(--muted);gap:3px}.adv-grid label small{font-size:10px;color:#5b6b7c}.adv-grid input{width:100%;box-sizing:border-box;background:#182028;border:1px solid #2b3947;border-radius:8px;color:#eee;padding:6px 8px;font-size:14px}.killfeed{position:absolute;top:52px;left:50%;transform:translate(-50%);display:flex;flex-direction:column;align-items:center;gap:3px;pointer-events:none;z-index:30}.kf-line{font-size:13px;color:#eee;background:#0a0e13b8;border:1px solid #26303c;border-radius:8px;padding:3px 10px;animation:kfIn .18s ease-out}.kf-line b{color:#ffb74d}@keyframes kfIn{0%{opacity:0;transform:translateY(-6px)}to{opacity:1;transform:none}}.hitflash{position:absolute;top:0;right:0;bottom:0;left:0;pointer-events:none;z-index:25;opacity:0;transition:opacity .22s ease-out;background:radial-gradient(ellipse at center,transparent 55%,rgba(229,57,53,.55) 100%)}.hitflash.on{opacity:1;transition:none}.center-notify{position:absolute;top:34%;left:50%;transform:translate(-50%,-50%) scale(.9);pointer-events:none;z-index:30;font-size:26px;font-weight:700;opacity:0;transition:opacity .25s,transform .25s;text-shadow:0 2px 8px rgba(0,0,0,.7)}.center-notify.show{opacity:1;transform:translate(-50%,-50%) scale(1)}.center-notify.kill{color:#ffd54f}.center-notify.death{color:#ef9a9a}.hp-num{font-size:11px;font-weight:700;min-width:24px;text-align:right;color:#cfd8dc;text-shadow:0 1px 2px #000;font-variant-numeric:tabular-nums}.talent-panel{position:fixed;left:50%;top:50%;transform:translate(-50%,-50%);background:#0d1218f5;border:1px solid #2b3947;border-radius:14px;padding:14px 18px;width:min(92vw,400px);pointer-events:auto;z-index:40;max-height:calc(100vh - 20px);max-height:calc(100dvh - 20px);overflow-y:auto;-webkit-overflow-scrolling:touch;box-shadow:0 10px 40px #00000080}.tp-head{font-size:15px;font-weight:700;color:#e3f2fd;display:flex;justify-content:space-between;align-items:center;margin-bottom:8px}.tp-head span{font-size:13px;color:#ffd54f;font-weight:600}.tp-rows{display:flex;flex-direction:column;gap:6px}.tp-row{display:grid;grid-template-columns:64px 1fr 30px 22px 30px 42px;align-items:center;gap:4px}.tp-name{font-size:13px;color:#eee;white-space:nowrap}.tp-desc{font-size:10px;color:#5b6b7c;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}.tp-lv{text-align:center;font-size:15px;color:#ffd54f}.tp-btn{width:30px;height:30px;border-radius:8px;border:1px solid #2b3947;background:#182028;color:#eee;font-size:16px;line-height:1;cursor:pointer;touch-action:manipulation}.tp-btn:disabled{opacity:.3}.tp-cost{font-size:10px;color:#5b6b7c;text-align:right}.tp-tip{display:block;margin-top:8px;font-size:10px;color:#5b6b7c;text-align:center}.tp-close{display:block;width:100%;margin-top:10px;padding:9px 0;font-size:15px;font-weight:700;color:#0d1218;background:#4caf50;border:none;border-radius:9px;cursor:pointer}.tp-close:hover{background:#5fc463}.result-board{margin:10px auto 14px;width:min(88vw,340px);background:#0d1218eb;border:1px solid #26303c;border-radius:12px;padding:8px 12px;display:flex;flex-direction:column;gap:4px}.rb-row{display:flex;align-items:center;gap:8px;font-size:14px;color:#eee;padding:4px 2px;border-radius:8px}.rb-row.me{background:#ffd54f1a}.rb-rank{width:18px;text-align:center;font-weight:700;color:#5b6b7c}.rb-row:first-child .rb-rank{color:#ffd54f}.rb-name{flex:1;text-align:left;overflow:hidden;text-overflow:ellipsis;white-space:nowrap}.rb-stat{font-size:13px;color:#ffb74d;white-space:nowrap;min-width:44px;text-align:right}.rb-stat:last-child{color:#ef9a9a}@media (max-height: 460px){.panel{padding:14px 16px;border-radius:14px}.panel h1{font-size:24px;margin-bottom:2px}.panel h2{font-size:18px;margin-bottom:8px}.sub{font-size:11px;margin-bottom:12px}.tip{margin-top:10px;font-size:11px}.big-btn{padding:10px;font-size:14px;margin:7px 0;border-radius:10px}.mode-btn{padding:10px 14px;margin:7px 0}.mode-ico{font-size:20px}.mode-title{font-size:15px;margin-top:2px}.mode-desc{font-size:11px}.lives-row{margin:8px 2px 2px}.step-btn{width:32px;height:32px;font-size:19px}.opt-row{margin:8px 2px 2px;padding:7px 10px}.name-input{padding:10px 12px;font-size:14px}.rooms-title{margin:12px 0 6px}.room-list{max-height:34vh}.room-card{padding:9px 12px}.settings-panel{padding:14px;gap:8px;max-height:94vh}.settings-panel h3{font-size:16px}.set-section{padding:10px;gap:8px}.talent-panel{padding:10px 12px}.tp-head{margin-bottom:5px;font-size:14px}.tp-rows{gap:4px}.tp-row{grid-template-columns:58px 1fr 28px 20px 28px 36px}.tp-name{font-size:12px}.tp-btn{width:28px;height:28px;font-size:15px}.tp-tip{margin-top:5px}.tp-close{margin-top:7px;padding:8px 0;font-size:14px}.result{gap:10px;padding:12px}.result h2{font-size:22px}.result-board{margin:6px auto 8px;padding:6px 10px}.rb-row{font-size:13px;padding:2px}}
/*$vite$:1*/`,document.head.appendChild(Fo);/**
 * @license
 * Copyright 2010-2023 Three.js Authors
 * SPDX-License-Identifier: MIT
 */const ur="160",Pc=0,zo=1,Dc=2,Bo=1,ko=2,ln=3,Tn=0,Ut=1,cn=2,wn=0,ri=1,Ho=2,Go=3,Vo=4,Uc=5,Hn=100,Ic=101,Nc=102,Wo=103,Xo=104,Oc=200,Fc=201,zc=202,Bc=203,dr=204,hr=205,kc=206,Hc=207,Gc=208,Vc=209,Wc=210,Xc=211,jc=212,qc=213,Yc=214,$c=0,Zc=1,Kc=2,os=3,Jc=4,Qc=5,eu=6,tu=7,jo=0,nu=1,iu=2,An=0,su=1,ru=2,ou=3,au=4,lu=5,cu=6,qo=300,oi=301,ai=302,fr=303,pr=304,as=306,ls=1e3,Gt=1001,mr=1002,wt=1003,Yo=1004,gr=1005,Vt=1006,uu=1007,Gi=1008,Rn=1009,du=1010,hu=1011,_r=1012,$o=1013,Cn=1014,Ln=1015,Vi=1016,Zo=1017,Ko=1018,Gn=1020,fu=1021,$t=1023,pu=1024,mu=1025,Vn=1026,li=1027,gu=1028,Jo=1029,_u=1030,Qo=1031,ea=1033,xr=33776,vr=33777,Mr=33778,yr=33779,ta=35840,na=35841,ia=35842,sa=35843,ra=36196,oa=37492,aa=37496,la=37808,ca=37809,ua=37810,da=37811,ha=37812,fa=37813,pa=37814,ma=37815,ga=37816,_a=37817,xa=37818,va=37819,Ma=37820,ya=37821,Sr=36492,Sa=36494,Ea=36495,xu=36283,ba=36284,Ta=36285,wa=36286,Aa=3e3,Wn=3001,vu=3200,Mu=3201,Ra=0,yu=1,Wt="",ft="srgb",un="srgb-linear",Er="display-p3",cs="display-p3-linear",us="linear",tt="srgb",ds="rec709",hs="p3",ci=7680,Ca=519,Su=512,Eu=513,bu=514,La=515,Tu=516,wu=517,Au=518,Ru=519,Pa=35044,Da="300 es",br=1035,dn=2e3,fs=2001;class ui{addEventListener(e,t){this._listeners===void 0&&(this._listeners={});const n=this._listeners;n[e]===void 0&&(n[e]=[]),n[e].indexOf(t)===-1&&n[e].push(t)}hasEventListener(e,t){if(this._listeners===void 0)return!1;const n=this._listeners;return n[e]!==void 0&&n[e].indexOf(t)!==-1}removeEventListener(e,t){if(this._listeners===void 0)return;const s=this._listeners[e];if(s!==void 0){const r=s.indexOf(t);r!==-1&&s.splice(r,1)}}dispatchEvent(e){if(this._listeners===void 0)return;const n=this._listeners[e.type];if(n!==void 0){e.target=this;const s=n.slice(0);for(let r=0,a=s.length;r<a;r++)s[r].call(this,e);e.target=null}}}const St=["00","01","02","03","04","05","06","07","08","09","0a","0b","0c","0d","0e","0f","10","11","12","13","14","15","16","17","18","19","1a","1b","1c","1d","1e","1f","20","21","22","23","24","25","26","27","28","29","2a","2b","2c","2d","2e","2f","30","31","32","33","34","35","36","37","38","39","3a","3b","3c","3d","3e","3f","40","41","42","43","44","45","46","47","48","49","4a","4b","4c","4d","4e","4f","50","51","52","53","54","55","56","57","58","59","5a","5b","5c","5d","5e","5f","60","61","62","63","64","65","66","67","68","69","6a","6b","6c","6d","6e","6f","70","71","72","73","74","75","76","77","78","79","7a","7b","7c","7d","7e","7f","80","81","82","83","84","85","86","87","88","89","8a","8b","8c","8d","8e","8f","90","91","92","93","94","95","96","97","98","99","9a","9b","9c","9d","9e","9f","a0","a1","a2","a3","a4","a5","a6","a7","a8","a9","aa","ab","ac","ad","ae","af","b0","b1","b2","b3","b4","b5","b6","b7","b8","b9","ba","bb","bc","bd","be","bf","c0","c1","c2","c3","c4","c5","c6","c7","c8","c9","ca","cb","cc","cd","ce","cf","d0","d1","d2","d3","d4","d5","d6","d7","d8","d9","da","db","dc","dd","de","df","e0","e1","e2","e3","e4","e5","e6","e7","e8","e9","ea","eb","ec","ed","ee","ef","f0","f1","f2","f3","f4","f5","f6","f7","f8","f9","fa","fb","fc","fd","fe","ff"],Tr=Math.PI/180,wr=180/Math.PI;function Wi(){const i=Math.random()*4294967295|0,e=Math.random()*4294967295|0,t=Math.random()*4294967295|0,n=Math.random()*4294967295|0;return(St[i&255]+St[i>>8&255]+St[i>>16&255]+St[i>>24&255]+"-"+St[e&255]+St[e>>8&255]+"-"+St[e>>16&15|64]+St[e>>24&255]+"-"+St[t&63|128]+St[t>>8&255]+"-"+St[t>>16&255]+St[t>>24&255]+St[n&255]+St[n>>8&255]+St[n>>16&255]+St[n>>24&255]).toLowerCase()}function It(i,e,t){return Math.max(e,Math.min(t,i))}function Cu(i,e){return(i%e+e)%e}function Ar(i,e,t){return(1-t)*i+t*e}function Ua(i){return(i&i-1)===0&&i!==0}function Rr(i){return Math.pow(2,Math.floor(Math.log(i)/Math.LN2))}function Xi(i,e){switch(e.constructor){case Float32Array:return i;case Uint32Array:return i/4294967295;case Uint16Array:return i/65535;case Uint8Array:return i/255;case Int32Array:return Math.max(i/2147483647,-1);case Int16Array:return Math.max(i/32767,-1);case Int8Array:return Math.max(i/127,-1);default:throw new Error("Invalid component type.")}}function Nt(i,e){switch(e.constructor){case Float32Array:return i;case Uint32Array:return Math.round(i*4294967295);case Uint16Array:return Math.round(i*65535);case Uint8Array:return Math.round(i*255);case Int32Array:return Math.round(i*2147483647);case Int16Array:return Math.round(i*32767);case Int8Array:return Math.round(i*127);default:throw new Error("Invalid component type.")}}class qe{constructor(e=0,t=0){qe.prototype.isVector2=!0,this.x=e,this.y=t}get width(){return this.x}set width(e){this.x=e}get height(){return this.y}set height(e){this.y=e}set(e,t){return this.x=e,this.y=t,this}setScalar(e){return this.x=e,this.y=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;default:throw new Error("index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;default:throw new Error("index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y)}copy(e){return this.x=e.x,this.y=e.y,this}add(e){return this.x+=e.x,this.y+=e.y,this}addScalar(e){return this.x+=e,this.y+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this}subScalar(e){return this.x-=e,this.y-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this}multiply(e){return this.x*=e.x,this.y*=e.y,this}multiplyScalar(e){return this.x*=e,this.y*=e,this}divide(e){return this.x/=e.x,this.y/=e.y,this}divideScalar(e){return this.multiplyScalar(1/e)}applyMatrix3(e){const t=this.x,n=this.y,s=e.elements;return this.x=s[0]*t+s[3]*n+s[6],this.y=s[1]*t+s[4]*n+s[7],this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this}clamp(e,t){return this.x=Math.max(e.x,Math.min(t.x,this.x)),this.y=Math.max(e.y,Math.min(t.y,this.y)),this}clampScalar(e,t){return this.x=Math.max(e,Math.min(t,this.x)),this.y=Math.max(e,Math.min(t,this.y)),this}clampLength(e,t){const n=this.length();return this.divideScalar(n||1).multiplyScalar(Math.max(e,Math.min(t,n)))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this}negate(){return this.x=-this.x,this.y=-this.y,this}dot(e){return this.x*e.x+this.y*e.y}cross(e){return this.x*e.y-this.y*e.x}lengthSq(){return this.x*this.x+this.y*this.y}length(){return Math.sqrt(this.x*this.x+this.y*this.y)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)}normalize(){return this.divideScalar(this.length()||1)}angle(){return Math.atan2(-this.y,-this.x)+Math.PI}angleTo(e){const t=Math.sqrt(this.lengthSq()*e.lengthSq());if(t===0)return Math.PI/2;const n=this.dot(e)/t;return Math.acos(It(n,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){const t=this.x-e.x,n=this.y-e.y;return t*t+n*n}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this}lerpVectors(e,t,n){return this.x=e.x+(t.x-e.x)*n,this.y=e.y+(t.y-e.y)*n,this}equals(e){return e.x===this.x&&e.y===this.y}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this}rotateAround(e,t){const n=Math.cos(t),s=Math.sin(t),r=this.x-e.x,a=this.y-e.y;return this.x=r*n-a*s+e.x,this.y=r*s+a*n+e.y,this}random(){return this.x=Math.random(),this.y=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y}}class He{constructor(e,t,n,s,r,a,o,c,l){He.prototype.isMatrix3=!0,this.elements=[1,0,0,0,1,0,0,0,1],e!==void 0&&this.set(e,t,n,s,r,a,o,c,l)}set(e,t,n,s,r,a,o,c,l){const d=this.elements;return d[0]=e,d[1]=s,d[2]=o,d[3]=t,d[4]=r,d[5]=c,d[6]=n,d[7]=a,d[8]=l,this}identity(){return this.set(1,0,0,0,1,0,0,0,1),this}copy(e){const t=this.elements,n=e.elements;return t[0]=n[0],t[1]=n[1],t[2]=n[2],t[3]=n[3],t[4]=n[4],t[5]=n[5],t[6]=n[6],t[7]=n[7],t[8]=n[8],this}extractBasis(e,t,n){return e.setFromMatrix3Column(this,0),t.setFromMatrix3Column(this,1),n.setFromMatrix3Column(this,2),this}setFromMatrix4(e){const t=e.elements;return this.set(t[0],t[4],t[8],t[1],t[5],t[9],t[2],t[6],t[10]),this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,t){const n=e.elements,s=t.elements,r=this.elements,a=n[0],o=n[3],c=n[6],l=n[1],d=n[4],h=n[7],f=n[2],m=n[5],g=n[8],_=s[0],p=s[3],u=s[6],M=s[1],x=s[4],T=s[7],C=s[2],w=s[5],A=s[8];return r[0]=a*_+o*M+c*C,r[3]=a*p+o*x+c*w,r[6]=a*u+o*T+c*A,r[1]=l*_+d*M+h*C,r[4]=l*p+d*x+h*w,r[7]=l*u+d*T+h*A,r[2]=f*_+m*M+g*C,r[5]=f*p+m*x+g*w,r[8]=f*u+m*T+g*A,this}multiplyScalar(e){const t=this.elements;return t[0]*=e,t[3]*=e,t[6]*=e,t[1]*=e,t[4]*=e,t[7]*=e,t[2]*=e,t[5]*=e,t[8]*=e,this}determinant(){const e=this.elements,t=e[0],n=e[1],s=e[2],r=e[3],a=e[4],o=e[5],c=e[6],l=e[7],d=e[8];return t*a*d-t*o*l-n*r*d+n*o*c+s*r*l-s*a*c}invert(){const e=this.elements,t=e[0],n=e[1],s=e[2],r=e[3],a=e[4],o=e[5],c=e[6],l=e[7],d=e[8],h=d*a-o*l,f=o*c-d*r,m=l*r-a*c,g=t*h+n*f+s*m;if(g===0)return this.set(0,0,0,0,0,0,0,0,0);const _=1/g;return e[0]=h*_,e[1]=(s*l-d*n)*_,e[2]=(o*n-s*a)*_,e[3]=f*_,e[4]=(d*t-s*c)*_,e[5]=(s*r-o*t)*_,e[6]=m*_,e[7]=(n*c-l*t)*_,e[8]=(a*t-n*r)*_,this}transpose(){let e;const t=this.elements;return e=t[1],t[1]=t[3],t[3]=e,e=t[2],t[2]=t[6],t[6]=e,e=t[5],t[5]=t[7],t[7]=e,this}getNormalMatrix(e){return this.setFromMatrix4(e).invert().transpose()}transposeIntoArray(e){const t=this.elements;return e[0]=t[0],e[1]=t[3],e[2]=t[6],e[3]=t[1],e[4]=t[4],e[5]=t[7],e[6]=t[2],e[7]=t[5],e[8]=t[8],this}setUvTransform(e,t,n,s,r,a,o){const c=Math.cos(r),l=Math.sin(r);return this.set(n*c,n*l,-n*(c*a+l*o)+a+e,-s*l,s*c,-s*(-l*a+c*o)+o+t,0,0,1),this}scale(e,t){return this.premultiply(Cr.makeScale(e,t)),this}rotate(e){return this.premultiply(Cr.makeRotation(-e)),this}translate(e,t){return this.premultiply(Cr.makeTranslation(e,t)),this}makeTranslation(e,t){return e.isVector2?this.set(1,0,e.x,0,1,e.y,0,0,1):this.set(1,0,e,0,1,t,0,0,1),this}makeRotation(e){const t=Math.cos(e),n=Math.sin(e);return this.set(t,-n,0,n,t,0,0,0,1),this}makeScale(e,t){return this.set(e,0,0,0,t,0,0,0,1),this}equals(e){const t=this.elements,n=e.elements;for(let s=0;s<9;s++)if(t[s]!==n[s])return!1;return!0}fromArray(e,t=0){for(let n=0;n<9;n++)this.elements[n]=e[n+t];return this}toArray(e=[],t=0){const n=this.elements;return e[t]=n[0],e[t+1]=n[1],e[t+2]=n[2],e[t+3]=n[3],e[t+4]=n[4],e[t+5]=n[5],e[t+6]=n[6],e[t+7]=n[7],e[t+8]=n[8],e}clone(){return new this.constructor().fromArray(this.elements)}}const Cr=new He;function Ia(i){for(let e=i.length-1;e>=0;--e)if(i[e]>=65535)return!0;return!1}function ji(i){return document.createElementNS("http://www.w3.org/1999/xhtml",i)}function Lu(){const i=ji("canvas");return i.style.display="block",i}const Na={};function qi(i){i in Na||(Na[i]=!0,console.warn(i))}const Oa=new He().set(.8224621,.177538,0,.0331941,.9668058,0,.0170827,.0723974,.9105199),Fa=new He().set(1.2249401,-.2249404,0,-.0420569,1.0420571,0,-.0196376,-.0786361,1.0982735),ps={[un]:{transfer:us,primaries:ds,toReference:i=>i,fromReference:i=>i},[ft]:{transfer:tt,primaries:ds,toReference:i=>i.convertSRGBToLinear(),fromReference:i=>i.convertLinearToSRGB()},[cs]:{transfer:us,primaries:hs,toReference:i=>i.applyMatrix3(Fa),fromReference:i=>i.applyMatrix3(Oa)},[Er]:{transfer:tt,primaries:hs,toReference:i=>i.convertSRGBToLinear().applyMatrix3(Fa),fromReference:i=>i.applyMatrix3(Oa).convertLinearToSRGB()}},Pu=new Set([un,cs]),$e={enabled:!0,_workingColorSpace:un,get workingColorSpace(){return this._workingColorSpace},set workingColorSpace(i){if(!Pu.has(i))throw new Error(`Unsupported working color space, "${i}".`);this._workingColorSpace=i},convert:function(i,e,t){if(this.enabled===!1||e===t||!e||!t)return i;const n=ps[e].toReference,s=ps[t].fromReference;return s(n(i))},fromWorkingColorSpace:function(i,e){return this.convert(i,this._workingColorSpace,e)},toWorkingColorSpace:function(i,e){return this.convert(i,e,this._workingColorSpace)},getPrimaries:function(i){return ps[i].primaries},getTransfer:function(i){return i===Wt?us:ps[i].transfer}};function di(i){return i<.04045?i*.0773993808:Math.pow(i*.9478672986+.0521327014,2.4)}function Lr(i){return i<.0031308?i*12.92:1.055*Math.pow(i,.41666)-.055}let hi;class za{static getDataURL(e){if(/^data:/i.test(e.src)||typeof HTMLCanvasElement>"u")return e.src;let t;if(e instanceof HTMLCanvasElement)t=e;else{hi===void 0&&(hi=ji("canvas")),hi.width=e.width,hi.height=e.height;const n=hi.getContext("2d");e instanceof ImageData?n.putImageData(e,0,0):n.drawImage(e,0,0,e.width,e.height),t=hi}return t.width>2048||t.height>2048?(console.warn("THREE.ImageUtils.getDataURL: Image converted to jpg for performance reasons",e),t.toDataURL("image/jpeg",.6)):t.toDataURL("image/png")}static sRGBToLinear(e){if(typeof HTMLImageElement<"u"&&e instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&e instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&e instanceof ImageBitmap){const t=ji("canvas");t.width=e.width,t.height=e.height;const n=t.getContext("2d");n.drawImage(e,0,0,e.width,e.height);const s=n.getImageData(0,0,e.width,e.height),r=s.data;for(let a=0;a<r.length;a++)r[a]=di(r[a]/255)*255;return n.putImageData(s,0,0),t}else if(e.data){const t=e.data.slice(0);for(let n=0;n<t.length;n++)t instanceof Uint8Array||t instanceof Uint8ClampedArray?t[n]=Math.floor(di(t[n]/255)*255):t[n]=di(t[n]);return{data:t,width:e.width,height:e.height}}else return console.warn("THREE.ImageUtils.sRGBToLinear(): Unsupported image type. No color space conversion applied."),e}}let Du=0;class Ba{constructor(e=null){this.isSource=!0,Object.defineProperty(this,"id",{value:Du++}),this.uuid=Wi(),this.data=e,this.version=0}set needsUpdate(e){e===!0&&this.version++}toJSON(e){const t=e===void 0||typeof e=="string";if(!t&&e.images[this.uuid]!==void 0)return e.images[this.uuid];const n={uuid:this.uuid,url:""},s=this.data;if(s!==null){let r;if(Array.isArray(s)){r=[];for(let a=0,o=s.length;a<o;a++)s[a].isDataTexture?r.push(Pr(s[a].image)):r.push(Pr(s[a]))}else r=Pr(s);n.url=r}return t||(e.images[this.uuid]=n),n}}function Pr(i){return typeof HTMLImageElement<"u"&&i instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&i instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&i instanceof ImageBitmap?za.getDataURL(i):i.data?{data:Array.from(i.data),width:i.width,height:i.height,type:i.data.constructor.name}:(console.warn("THREE.Texture: Unable to serialize Texture."),{})}let Uu=0;class At extends ui{constructor(e=At.DEFAULT_IMAGE,t=At.DEFAULT_MAPPING,n=Gt,s=Gt,r=Vt,a=Gi,o=$t,c=Rn,l=At.DEFAULT_ANISOTROPY,d=Wt){super(),this.isTexture=!0,Object.defineProperty(this,"id",{value:Uu++}),this.uuid=Wi(),this.name="",this.source=new Ba(e),this.mipmaps=[],this.mapping=t,this.channel=0,this.wrapS=n,this.wrapT=s,this.magFilter=r,this.minFilter=a,this.anisotropy=l,this.format=o,this.internalFormat=null,this.type=c,this.offset=new qe(0,0),this.repeat=new qe(1,1),this.center=new qe(0,0),this.rotation=0,this.matrixAutoUpdate=!0,this.matrix=new He,this.generateMipmaps=!0,this.premultiplyAlpha=!1,this.flipY=!0,this.unpackAlignment=4,typeof d=="string"?this.colorSpace=d:(qi("THREE.Texture: Property .encoding has been replaced by .colorSpace."),this.colorSpace=d===Wn?ft:Wt),this.userData={},this.version=0,this.onUpdate=null,this.isRenderTargetTexture=!1,this.needsPMREMUpdate=!1}get image(){return this.source.data}set image(e=null){this.source.data=e}updateMatrix(){this.matrix.setUvTransform(this.offset.x,this.offset.y,this.repeat.x,this.repeat.y,this.rotation,this.center.x,this.center.y)}clone(){return new this.constructor().copy(this)}copy(e){return this.name=e.name,this.source=e.source,this.mipmaps=e.mipmaps.slice(0),this.mapping=e.mapping,this.channel=e.channel,this.wrapS=e.wrapS,this.wrapT=e.wrapT,this.magFilter=e.magFilter,this.minFilter=e.minFilter,this.anisotropy=e.anisotropy,this.format=e.format,this.internalFormat=e.internalFormat,this.type=e.type,this.offset.copy(e.offset),this.repeat.copy(e.repeat),this.center.copy(e.center),this.rotation=e.rotation,this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrix.copy(e.matrix),this.generateMipmaps=e.generateMipmaps,this.premultiplyAlpha=e.premultiplyAlpha,this.flipY=e.flipY,this.unpackAlignment=e.unpackAlignment,this.colorSpace=e.colorSpace,this.userData=JSON.parse(JSON.stringify(e.userData)),this.needsUpdate=!0,this}toJSON(e){const t=e===void 0||typeof e=="string";if(!t&&e.textures[this.uuid]!==void 0)return e.textures[this.uuid];const n={metadata:{version:4.6,type:"Texture",generator:"Texture.toJSON"},uuid:this.uuid,name:this.name,image:this.source.toJSON(e).uuid,mapping:this.mapping,channel:this.channel,repeat:[this.repeat.x,this.repeat.y],offset:[this.offset.x,this.offset.y],center:[this.center.x,this.center.y],rotation:this.rotation,wrap:[this.wrapS,this.wrapT],format:this.format,internalFormat:this.internalFormat,type:this.type,colorSpace:this.colorSpace,minFilter:this.minFilter,magFilter:this.magFilter,anisotropy:this.anisotropy,flipY:this.flipY,generateMipmaps:this.generateMipmaps,premultiplyAlpha:this.premultiplyAlpha,unpackAlignment:this.unpackAlignment};return Object.keys(this.userData).length>0&&(n.userData=this.userData),t||(e.textures[this.uuid]=n),n}dispose(){this.dispatchEvent({type:"dispose"})}transformUv(e){if(this.mapping!==qo)return e;if(e.applyMatrix3(this.matrix),e.x<0||e.x>1)switch(this.wrapS){case ls:e.x=e.x-Math.floor(e.x);break;case Gt:e.x=e.x<0?0:1;break;case mr:Math.abs(Math.floor(e.x)%2)===1?e.x=Math.ceil(e.x)-e.x:e.x=e.x-Math.floor(e.x);break}if(e.y<0||e.y>1)switch(this.wrapT){case ls:e.y=e.y-Math.floor(e.y);break;case Gt:e.y=e.y<0?0:1;break;case mr:Math.abs(Math.floor(e.y)%2)===1?e.y=Math.ceil(e.y)-e.y:e.y=e.y-Math.floor(e.y);break}return this.flipY&&(e.y=1-e.y),e}set needsUpdate(e){e===!0&&(this.version++,this.source.needsUpdate=!0)}get encoding(){return qi("THREE.Texture: Property .encoding has been replaced by .colorSpace."),this.colorSpace===ft?Wn:Aa}set encoding(e){qi("THREE.Texture: Property .encoding has been replaced by .colorSpace."),this.colorSpace=e===Wn?ft:Wt}}At.DEFAULT_IMAGE=null,At.DEFAULT_MAPPING=qo,At.DEFAULT_ANISOTROPY=1;class pt{constructor(e=0,t=0,n=0,s=1){pt.prototype.isVector4=!0,this.x=e,this.y=t,this.z=n,this.w=s}get width(){return this.z}set width(e){this.z=e}get height(){return this.w}set height(e){this.w=e}set(e,t,n,s){return this.x=e,this.y=t,this.z=n,this.w=s,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this.w=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setW(e){return this.w=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;case 2:this.z=t;break;case 3:this.w=t;break;default:throw new Error("index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;case 3:return this.w;default:throw new Error("index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y,this.z,this.w)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this.w=e.w!==void 0?e.w:1,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this.w+=e.w,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this.w+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this.z=e.z+t.z,this.w=e.w+t.w,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this.z+=e.z*t,this.w+=e.w*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this.w-=e.w,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this.w-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this.z=e.z-t.z,this.w=e.w-t.w,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this.w*=e.w,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this.w*=e,this}applyMatrix4(e){const t=this.x,n=this.y,s=this.z,r=this.w,a=e.elements;return this.x=a[0]*t+a[4]*n+a[8]*s+a[12]*r,this.y=a[1]*t+a[5]*n+a[9]*s+a[13]*r,this.z=a[2]*t+a[6]*n+a[10]*s+a[14]*r,this.w=a[3]*t+a[7]*n+a[11]*s+a[15]*r,this}divideScalar(e){return this.multiplyScalar(1/e)}setAxisAngleFromQuaternion(e){this.w=2*Math.acos(e.w);const t=Math.sqrt(1-e.w*e.w);return t<1e-4?(this.x=1,this.y=0,this.z=0):(this.x=e.x/t,this.y=e.y/t,this.z=e.z/t),this}setAxisAngleFromRotationMatrix(e){let t,n,s,r;const c=e.elements,l=c[0],d=c[4],h=c[8],f=c[1],m=c[5],g=c[9],_=c[2],p=c[6],u=c[10];if(Math.abs(d-f)<.01&&Math.abs(h-_)<.01&&Math.abs(g-p)<.01){if(Math.abs(d+f)<.1&&Math.abs(h+_)<.1&&Math.abs(g+p)<.1&&Math.abs(l+m+u-3)<.1)return this.set(1,0,0,0),this;t=Math.PI;const x=(l+1)/2,T=(m+1)/2,C=(u+1)/2,w=(d+f)/4,A=(h+_)/4,X=(g+p)/4;return x>T&&x>C?x<.01?(n=0,s=.707106781,r=.707106781):(n=Math.sqrt(x),s=w/n,r=A/n):T>C?T<.01?(n=.707106781,s=0,r=.707106781):(s=Math.sqrt(T),n=w/s,r=X/s):C<.01?(n=.707106781,s=.707106781,r=0):(r=Math.sqrt(C),n=A/r,s=X/r),this.set(n,s,r,t),this}let M=Math.sqrt((p-g)*(p-g)+(h-_)*(h-_)+(f-d)*(f-d));return Math.abs(M)<.001&&(M=1),this.x=(p-g)/M,this.y=(h-_)/M,this.z=(f-d)/M,this.w=Math.acos((l+m+u-1)/2),this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this.w=Math.min(this.w,e.w),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this.w=Math.max(this.w,e.w),this}clamp(e,t){return this.x=Math.max(e.x,Math.min(t.x,this.x)),this.y=Math.max(e.y,Math.min(t.y,this.y)),this.z=Math.max(e.z,Math.min(t.z,this.z)),this.w=Math.max(e.w,Math.min(t.w,this.w)),this}clampScalar(e,t){return this.x=Math.max(e,Math.min(t,this.x)),this.y=Math.max(e,Math.min(t,this.y)),this.z=Math.max(e,Math.min(t,this.z)),this.w=Math.max(e,Math.min(t,this.w)),this}clampLength(e,t){const n=this.length();return this.divideScalar(n||1).multiplyScalar(Math.max(e,Math.min(t,n)))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this.w=Math.floor(this.w),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this.w=Math.ceil(this.w),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this.w=Math.round(this.w),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this.w=Math.trunc(this.w),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this.w=-this.w,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z+this.w*e.w}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)+Math.abs(this.w)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this.z+=(e.z-this.z)*t,this.w+=(e.w-this.w)*t,this}lerpVectors(e,t,n){return this.x=e.x+(t.x-e.x)*n,this.y=e.y+(t.y-e.y)*n,this.z=e.z+(t.z-e.z)*n,this.w=e.w+(t.w-e.w)*n,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z&&e.w===this.w}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this.z=e[t+2],this.w=e[t+3],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e[t+2]=this.z,e[t+3]=this.w,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this.z=e.getZ(t),this.w=e.getW(t),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this.w=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z,yield this.w}}class Iu extends ui{constructor(e=1,t=1,n={}){super(),this.isRenderTarget=!0,this.width=e,this.height=t,this.depth=1,this.scissor=new pt(0,0,e,t),this.scissorTest=!1,this.viewport=new pt(0,0,e,t);const s={width:e,height:t,depth:1};n.encoding!==void 0&&(qi("THREE.WebGLRenderTarget: option.encoding has been replaced by option.colorSpace."),n.colorSpace=n.encoding===Wn?ft:Wt),n=Object.assign({generateMipmaps:!1,internalFormat:null,minFilter:Vt,depthBuffer:!0,stencilBuffer:!1,depthTexture:null,samples:0},n),this.texture=new At(s,n.mapping,n.wrapS,n.wrapT,n.magFilter,n.minFilter,n.format,n.type,n.anisotropy,n.colorSpace),this.texture.isRenderTargetTexture=!0,this.texture.flipY=!1,this.texture.generateMipmaps=n.generateMipmaps,this.texture.internalFormat=n.internalFormat,this.depthBuffer=n.depthBuffer,this.stencilBuffer=n.stencilBuffer,this.depthTexture=n.depthTexture,this.samples=n.samples}setSize(e,t,n=1){(this.width!==e||this.height!==t||this.depth!==n)&&(this.width=e,this.height=t,this.depth=n,this.texture.image.width=e,this.texture.image.height=t,this.texture.image.depth=n,this.dispose()),this.viewport.set(0,0,e,t),this.scissor.set(0,0,e,t)}clone(){return new this.constructor().copy(this)}copy(e){this.width=e.width,this.height=e.height,this.depth=e.depth,this.scissor.copy(e.scissor),this.scissorTest=e.scissorTest,this.viewport.copy(e.viewport),this.texture=e.texture.clone(),this.texture.isRenderTargetTexture=!0;const t=Object.assign({},e.texture.image);return this.texture.source=new Ba(t),this.depthBuffer=e.depthBuffer,this.stencilBuffer=e.stencilBuffer,e.depthTexture!==null&&(this.depthTexture=e.depthTexture.clone()),this.samples=e.samples,this}dispose(){this.dispatchEvent({type:"dispose"})}}class Xn extends Iu{constructor(e=1,t=1,n={}){super(e,t,n),this.isWebGLRenderTarget=!0}}class ka extends At{constructor(e=null,t=1,n=1,s=1){super(null),this.isDataArrayTexture=!0,this.image={data:e,width:t,height:n,depth:s},this.magFilter=wt,this.minFilter=wt,this.wrapR=Gt,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}}class Nu extends At{constructor(e=null,t=1,n=1,s=1){super(null),this.isData3DTexture=!0,this.image={data:e,width:t,height:n,depth:s},this.magFilter=wt,this.minFilter=wt,this.wrapR=Gt,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}}class Yi{constructor(e=0,t=0,n=0,s=1){this.isQuaternion=!0,this._x=e,this._y=t,this._z=n,this._w=s}static slerpFlat(e,t,n,s,r,a,o){let c=n[s+0],l=n[s+1],d=n[s+2],h=n[s+3];const f=r[a+0],m=r[a+1],g=r[a+2],_=r[a+3];if(o===0){e[t+0]=c,e[t+1]=l,e[t+2]=d,e[t+3]=h;return}if(o===1){e[t+0]=f,e[t+1]=m,e[t+2]=g,e[t+3]=_;return}if(h!==_||c!==f||l!==m||d!==g){let p=1-o;const u=c*f+l*m+d*g+h*_,M=u>=0?1:-1,x=1-u*u;if(x>Number.EPSILON){const C=Math.sqrt(x),w=Math.atan2(C,u*M);p=Math.sin(p*w)/C,o=Math.sin(o*w)/C}const T=o*M;if(c=c*p+f*T,l=l*p+m*T,d=d*p+g*T,h=h*p+_*T,p===1-o){const C=1/Math.sqrt(c*c+l*l+d*d+h*h);c*=C,l*=C,d*=C,h*=C}}e[t]=c,e[t+1]=l,e[t+2]=d,e[t+3]=h}static multiplyQuaternionsFlat(e,t,n,s,r,a){const o=n[s],c=n[s+1],l=n[s+2],d=n[s+3],h=r[a],f=r[a+1],m=r[a+2],g=r[a+3];return e[t]=o*g+d*h+c*m-l*f,e[t+1]=c*g+d*f+l*h-o*m,e[t+2]=l*g+d*m+o*f-c*h,e[t+3]=d*g-o*h-c*f-l*m,e}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get w(){return this._w}set w(e){this._w=e,this._onChangeCallback()}set(e,t,n,s){return this._x=e,this._y=t,this._z=n,this._w=s,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._w)}copy(e){return this._x=e.x,this._y=e.y,this._z=e.z,this._w=e.w,this._onChangeCallback(),this}setFromEuler(e,t=!0){const n=e._x,s=e._y,r=e._z,a=e._order,o=Math.cos,c=Math.sin,l=o(n/2),d=o(s/2),h=o(r/2),f=c(n/2),m=c(s/2),g=c(r/2);switch(a){case"XYZ":this._x=f*d*h+l*m*g,this._y=l*m*h-f*d*g,this._z=l*d*g+f*m*h,this._w=l*d*h-f*m*g;break;case"YXZ":this._x=f*d*h+l*m*g,this._y=l*m*h-f*d*g,this._z=l*d*g-f*m*h,this._w=l*d*h+f*m*g;break;case"ZXY":this._x=f*d*h-l*m*g,this._y=l*m*h+f*d*g,this._z=l*d*g+f*m*h,this._w=l*d*h-f*m*g;break;case"ZYX":this._x=f*d*h-l*m*g,this._y=l*m*h+f*d*g,this._z=l*d*g-f*m*h,this._w=l*d*h+f*m*g;break;case"YZX":this._x=f*d*h+l*m*g,this._y=l*m*h+f*d*g,this._z=l*d*g-f*m*h,this._w=l*d*h-f*m*g;break;case"XZY":this._x=f*d*h-l*m*g,this._y=l*m*h-f*d*g,this._z=l*d*g+f*m*h,this._w=l*d*h+f*m*g;break;default:console.warn("THREE.Quaternion: .setFromEuler() encountered an unknown order: "+a)}return t===!0&&this._onChangeCallback(),this}setFromAxisAngle(e,t){const n=t/2,s=Math.sin(n);return this._x=e.x*s,this._y=e.y*s,this._z=e.z*s,this._w=Math.cos(n),this._onChangeCallback(),this}setFromRotationMatrix(e){const t=e.elements,n=t[0],s=t[4],r=t[8],a=t[1],o=t[5],c=t[9],l=t[2],d=t[6],h=t[10],f=n+o+h;if(f>0){const m=.5/Math.sqrt(f+1);this._w=.25/m,this._x=(d-c)*m,this._y=(r-l)*m,this._z=(a-s)*m}else if(n>o&&n>h){const m=2*Math.sqrt(1+n-o-h);this._w=(d-c)/m,this._x=.25*m,this._y=(s+a)/m,this._z=(r+l)/m}else if(o>h){const m=2*Math.sqrt(1+o-n-h);this._w=(r-l)/m,this._x=(s+a)/m,this._y=.25*m,this._z=(c+d)/m}else{const m=2*Math.sqrt(1+h-n-o);this._w=(a-s)/m,this._x=(r+l)/m,this._y=(c+d)/m,this._z=.25*m}return this._onChangeCallback(),this}setFromUnitVectors(e,t){let n=e.dot(t)+1;return n<Number.EPSILON?(n=0,Math.abs(e.x)>Math.abs(e.z)?(this._x=-e.y,this._y=e.x,this._z=0,this._w=n):(this._x=0,this._y=-e.z,this._z=e.y,this._w=n)):(this._x=e.y*t.z-e.z*t.y,this._y=e.z*t.x-e.x*t.z,this._z=e.x*t.y-e.y*t.x,this._w=n),this.normalize()}angleTo(e){return 2*Math.acos(Math.abs(It(this.dot(e),-1,1)))}rotateTowards(e,t){const n=this.angleTo(e);if(n===0)return this;const s=Math.min(1,t/n);return this.slerp(e,s),this}identity(){return this.set(0,0,0,1)}invert(){return this.conjugate()}conjugate(){return this._x*=-1,this._y*=-1,this._z*=-1,this._onChangeCallback(),this}dot(e){return this._x*e._x+this._y*e._y+this._z*e._z+this._w*e._w}lengthSq(){return this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w}length(){return Math.sqrt(this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w)}normalize(){let e=this.length();return e===0?(this._x=0,this._y=0,this._z=0,this._w=1):(e=1/e,this._x=this._x*e,this._y=this._y*e,this._z=this._z*e,this._w=this._w*e),this._onChangeCallback(),this}multiply(e){return this.multiplyQuaternions(this,e)}premultiply(e){return this.multiplyQuaternions(e,this)}multiplyQuaternions(e,t){const n=e._x,s=e._y,r=e._z,a=e._w,o=t._x,c=t._y,l=t._z,d=t._w;return this._x=n*d+a*o+s*l-r*c,this._y=s*d+a*c+r*o-n*l,this._z=r*d+a*l+n*c-s*o,this._w=a*d-n*o-s*c-r*l,this._onChangeCallback(),this}slerp(e,t){if(t===0)return this;if(t===1)return this.copy(e);const n=this._x,s=this._y,r=this._z,a=this._w;let o=a*e._w+n*e._x+s*e._y+r*e._z;if(o<0?(this._w=-e._w,this._x=-e._x,this._y=-e._y,this._z=-e._z,o=-o):this.copy(e),o>=1)return this._w=a,this._x=n,this._y=s,this._z=r,this;const c=1-o*o;if(c<=Number.EPSILON){const m=1-t;return this._w=m*a+t*this._w,this._x=m*n+t*this._x,this._y=m*s+t*this._y,this._z=m*r+t*this._z,this.normalize(),this}const l=Math.sqrt(c),d=Math.atan2(l,o),h=Math.sin((1-t)*d)/l,f=Math.sin(t*d)/l;return this._w=a*h+this._w*f,this._x=n*h+this._x*f,this._y=s*h+this._y*f,this._z=r*h+this._z*f,this._onChangeCallback(),this}slerpQuaternions(e,t,n){return this.copy(e).slerp(t,n)}random(){const e=Math.random(),t=Math.sqrt(1-e),n=Math.sqrt(e),s=2*Math.PI*Math.random(),r=2*Math.PI*Math.random();return this.set(t*Math.cos(s),n*Math.sin(r),n*Math.cos(r),t*Math.sin(s))}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._w===this._w}fromArray(e,t=0){return this._x=e[t],this._y=e[t+1],this._z=e[t+2],this._w=e[t+3],this._onChangeCallback(),this}toArray(e=[],t=0){return e[t]=this._x,e[t+1]=this._y,e[t+2]=this._z,e[t+3]=this._w,e}fromBufferAttribute(e,t){return this._x=e.getX(t),this._y=e.getY(t),this._z=e.getZ(t),this._w=e.getW(t),this._onChangeCallback(),this}toJSON(){return this.toArray()}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._w}}class U{constructor(e=0,t=0,n=0){U.prototype.isVector3=!0,this.x=e,this.y=t,this.z=n}set(e,t,n){return n===void 0&&(n=this.z),this.x=e,this.y=t,this.z=n,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;case 2:this.z=t;break;default:throw new Error("index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;default:throw new Error("index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y,this.z)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this.z=e.z+t.z,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this.z+=e.z*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this.z=e.z-t.z,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this}multiplyVectors(e,t){return this.x=e.x*t.x,this.y=e.y*t.y,this.z=e.z*t.z,this}applyEuler(e){return this.applyQuaternion(Ha.setFromEuler(e))}applyAxisAngle(e,t){return this.applyQuaternion(Ha.setFromAxisAngle(e,t))}applyMatrix3(e){const t=this.x,n=this.y,s=this.z,r=e.elements;return this.x=r[0]*t+r[3]*n+r[6]*s,this.y=r[1]*t+r[4]*n+r[7]*s,this.z=r[2]*t+r[5]*n+r[8]*s,this}applyNormalMatrix(e){return this.applyMatrix3(e).normalize()}applyMatrix4(e){const t=this.x,n=this.y,s=this.z,r=e.elements,a=1/(r[3]*t+r[7]*n+r[11]*s+r[15]);return this.x=(r[0]*t+r[4]*n+r[8]*s+r[12])*a,this.y=(r[1]*t+r[5]*n+r[9]*s+r[13])*a,this.z=(r[2]*t+r[6]*n+r[10]*s+r[14])*a,this}applyQuaternion(e){const t=this.x,n=this.y,s=this.z,r=e.x,a=e.y,o=e.z,c=e.w,l=2*(a*s-o*n),d=2*(o*t-r*s),h=2*(r*n-a*t);return this.x=t+c*l+a*h-o*d,this.y=n+c*d+o*l-r*h,this.z=s+c*h+r*d-a*l,this}project(e){return this.applyMatrix4(e.matrixWorldInverse).applyMatrix4(e.projectionMatrix)}unproject(e){return this.applyMatrix4(e.projectionMatrixInverse).applyMatrix4(e.matrixWorld)}transformDirection(e){const t=this.x,n=this.y,s=this.z,r=e.elements;return this.x=r[0]*t+r[4]*n+r[8]*s,this.y=r[1]*t+r[5]*n+r[9]*s,this.z=r[2]*t+r[6]*n+r[10]*s,this.normalize()}divide(e){return this.x/=e.x,this.y/=e.y,this.z/=e.z,this}divideScalar(e){return this.multiplyScalar(1/e)}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this}clamp(e,t){return this.x=Math.max(e.x,Math.min(t.x,this.x)),this.y=Math.max(e.y,Math.min(t.y,this.y)),this.z=Math.max(e.z,Math.min(t.z,this.z)),this}clampScalar(e,t){return this.x=Math.max(e,Math.min(t,this.x)),this.y=Math.max(e,Math.min(t,this.y)),this.z=Math.max(e,Math.min(t,this.z)),this}clampLength(e,t){const n=this.length();return this.divideScalar(n||1).multiplyScalar(Math.max(e,Math.min(t,n)))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this.z+=(e.z-this.z)*t,this}lerpVectors(e,t,n){return this.x=e.x+(t.x-e.x)*n,this.y=e.y+(t.y-e.y)*n,this.z=e.z+(t.z-e.z)*n,this}cross(e){return this.crossVectors(this,e)}crossVectors(e,t){const n=e.x,s=e.y,r=e.z,a=t.x,o=t.y,c=t.z;return this.x=s*c-r*o,this.y=r*a-n*c,this.z=n*o-s*a,this}projectOnVector(e){const t=e.lengthSq();if(t===0)return this.set(0,0,0);const n=e.dot(this)/t;return this.copy(e).multiplyScalar(n)}projectOnPlane(e){return Dr.copy(this).projectOnVector(e),this.sub(Dr)}reflect(e){return this.sub(Dr.copy(e).multiplyScalar(2*this.dot(e)))}angleTo(e){const t=Math.sqrt(this.lengthSq()*e.lengthSq());if(t===0)return Math.PI/2;const n=this.dot(e)/t;return Math.acos(It(n,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){const t=this.x-e.x,n=this.y-e.y,s=this.z-e.z;return t*t+n*n+s*s}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)+Math.abs(this.z-e.z)}setFromSpherical(e){return this.setFromSphericalCoords(e.radius,e.phi,e.theta)}setFromSphericalCoords(e,t,n){const s=Math.sin(t)*e;return this.x=s*Math.sin(n),this.y=Math.cos(t)*e,this.z=s*Math.cos(n),this}setFromCylindrical(e){return this.setFromCylindricalCoords(e.radius,e.theta,e.y)}setFromCylindricalCoords(e,t,n){return this.x=e*Math.sin(t),this.y=n,this.z=e*Math.cos(t),this}setFromMatrixPosition(e){const t=e.elements;return this.x=t[12],this.y=t[13],this.z=t[14],this}setFromMatrixScale(e){const t=this.setFromMatrixColumn(e,0).length(),n=this.setFromMatrixColumn(e,1).length(),s=this.setFromMatrixColumn(e,2).length();return this.x=t,this.y=n,this.z=s,this}setFromMatrixColumn(e,t){return this.fromArray(e.elements,t*4)}setFromMatrix3Column(e,t){return this.fromArray(e.elements,t*3)}setFromEuler(e){return this.x=e._x,this.y=e._y,this.z=e._z,this}setFromColor(e){return this.x=e.r,this.y=e.g,this.z=e.b,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this.z=e[t+2],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e[t+2]=this.z,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this.z=e.getZ(t),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this}randomDirection(){const e=(Math.random()-.5)*2,t=Math.random()*Math.PI*2,n=Math.sqrt(1-e**2);return this.x=n*Math.cos(t),this.y=n*Math.sin(t),this.z=e,this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z}}const Dr=new U,Ha=new Yi;class $i{constructor(e=new U(1/0,1/0,1/0),t=new U(-1/0,-1/0,-1/0)){this.isBox3=!0,this.min=e,this.max=t}set(e,t){return this.min.copy(e),this.max.copy(t),this}setFromArray(e){this.makeEmpty();for(let t=0,n=e.length;t<n;t+=3)this.expandByPoint(Zt.fromArray(e,t));return this}setFromBufferAttribute(e){this.makeEmpty();for(let t=0,n=e.count;t<n;t++)this.expandByPoint(Zt.fromBufferAttribute(e,t));return this}setFromPoints(e){this.makeEmpty();for(let t=0,n=e.length;t<n;t++)this.expandByPoint(e[t]);return this}setFromCenterAndSize(e,t){const n=Zt.copy(t).multiplyScalar(.5);return this.min.copy(e).sub(n),this.max.copy(e).add(n),this}setFromObject(e,t=!1){return this.makeEmpty(),this.expandByObject(e,t)}clone(){return new this.constructor().copy(this)}copy(e){return this.min.copy(e.min),this.max.copy(e.max),this}makeEmpty(){return this.min.x=this.min.y=this.min.z=1/0,this.max.x=this.max.y=this.max.z=-1/0,this}isEmpty(){return this.max.x<this.min.x||this.max.y<this.min.y||this.max.z<this.min.z}getCenter(e){return this.isEmpty()?e.set(0,0,0):e.addVectors(this.min,this.max).multiplyScalar(.5)}getSize(e){return this.isEmpty()?e.set(0,0,0):e.subVectors(this.max,this.min)}expandByPoint(e){return this.min.min(e),this.max.max(e),this}expandByVector(e){return this.min.sub(e),this.max.add(e),this}expandByScalar(e){return this.min.addScalar(-e),this.max.addScalar(e),this}expandByObject(e,t=!1){e.updateWorldMatrix(!1,!1);const n=e.geometry;if(n!==void 0){const r=n.getAttribute("position");if(t===!0&&r!==void 0&&e.isInstancedMesh!==!0)for(let a=0,o=r.count;a<o;a++)e.isMesh===!0?e.getVertexPosition(a,Zt):Zt.fromBufferAttribute(r,a),Zt.applyMatrix4(e.matrixWorld),this.expandByPoint(Zt);else e.boundingBox!==void 0?(e.boundingBox===null&&e.computeBoundingBox(),ms.copy(e.boundingBox)):(n.boundingBox===null&&n.computeBoundingBox(),ms.copy(n.boundingBox)),ms.applyMatrix4(e.matrixWorld),this.union(ms)}const s=e.children;for(let r=0,a=s.length;r<a;r++)this.expandByObject(s[r],t);return this}containsPoint(e){return!(e.x<this.min.x||e.x>this.max.x||e.y<this.min.y||e.y>this.max.y||e.z<this.min.z||e.z>this.max.z)}containsBox(e){return this.min.x<=e.min.x&&e.max.x<=this.max.x&&this.min.y<=e.min.y&&e.max.y<=this.max.y&&this.min.z<=e.min.z&&e.max.z<=this.max.z}getParameter(e,t){return t.set((e.x-this.min.x)/(this.max.x-this.min.x),(e.y-this.min.y)/(this.max.y-this.min.y),(e.z-this.min.z)/(this.max.z-this.min.z))}intersectsBox(e){return!(e.max.x<this.min.x||e.min.x>this.max.x||e.max.y<this.min.y||e.min.y>this.max.y||e.max.z<this.min.z||e.min.z>this.max.z)}intersectsSphere(e){return this.clampPoint(e.center,Zt),Zt.distanceToSquared(e.center)<=e.radius*e.radius}intersectsPlane(e){let t,n;return e.normal.x>0?(t=e.normal.x*this.min.x,n=e.normal.x*this.max.x):(t=e.normal.x*this.max.x,n=e.normal.x*this.min.x),e.normal.y>0?(t+=e.normal.y*this.min.y,n+=e.normal.y*this.max.y):(t+=e.normal.y*this.max.y,n+=e.normal.y*this.min.y),e.normal.z>0?(t+=e.normal.z*this.min.z,n+=e.normal.z*this.max.z):(t+=e.normal.z*this.max.z,n+=e.normal.z*this.min.z),t<=-e.constant&&n>=-e.constant}intersectsTriangle(e){if(this.isEmpty())return!1;this.getCenter(Zi),gs.subVectors(this.max,Zi),fi.subVectors(e.a,Zi),pi.subVectors(e.b,Zi),mi.subVectors(e.c,Zi),Pn.subVectors(pi,fi),Dn.subVectors(mi,pi),jn.subVectors(fi,mi);let t=[0,-Pn.z,Pn.y,0,-Dn.z,Dn.y,0,-jn.z,jn.y,Pn.z,0,-Pn.x,Dn.z,0,-Dn.x,jn.z,0,-jn.x,-Pn.y,Pn.x,0,-Dn.y,Dn.x,0,-jn.y,jn.x,0];return!Ur(t,fi,pi,mi,gs)||(t=[1,0,0,0,1,0,0,0,1],!Ur(t,fi,pi,mi,gs))?!1:(_s.crossVectors(Pn,Dn),t=[_s.x,_s.y,_s.z],Ur(t,fi,pi,mi,gs))}clampPoint(e,t){return t.copy(e).clamp(this.min,this.max)}distanceToPoint(e){return this.clampPoint(e,Zt).distanceTo(e)}getBoundingSphere(e){return this.isEmpty()?e.makeEmpty():(this.getCenter(e.center),e.radius=this.getSize(Zt).length()*.5),e}intersect(e){return this.min.max(e.min),this.max.min(e.max),this.isEmpty()&&this.makeEmpty(),this}union(e){return this.min.min(e.min),this.max.max(e.max),this}applyMatrix4(e){return this.isEmpty()?this:(hn[0].set(this.min.x,this.min.y,this.min.z).applyMatrix4(e),hn[1].set(this.min.x,this.min.y,this.max.z).applyMatrix4(e),hn[2].set(this.min.x,this.max.y,this.min.z).applyMatrix4(e),hn[3].set(this.min.x,this.max.y,this.max.z).applyMatrix4(e),hn[4].set(this.max.x,this.min.y,this.min.z).applyMatrix4(e),hn[5].set(this.max.x,this.min.y,this.max.z).applyMatrix4(e),hn[6].set(this.max.x,this.max.y,this.min.z).applyMatrix4(e),hn[7].set(this.max.x,this.max.y,this.max.z).applyMatrix4(e),this.setFromPoints(hn),this)}translate(e){return this.min.add(e),this.max.add(e),this}equals(e){return e.min.equals(this.min)&&e.max.equals(this.max)}}const hn=[new U,new U,new U,new U,new U,new U,new U,new U],Zt=new U,ms=new $i,fi=new U,pi=new U,mi=new U,Pn=new U,Dn=new U,jn=new U,Zi=new U,gs=new U,_s=new U,qn=new U;function Ur(i,e,t,n,s){for(let r=0,a=i.length-3;r<=a;r+=3){qn.fromArray(i,r);const o=s.x*Math.abs(qn.x)+s.y*Math.abs(qn.y)+s.z*Math.abs(qn.z),c=e.dot(qn),l=t.dot(qn),d=n.dot(qn);if(Math.max(-Math.max(c,l,d),Math.min(c,l,d))>o)return!1}return!0}const Ou=new $i,Ki=new U,Ir=new U;class xs{constructor(e=new U,t=-1){this.isSphere=!0,this.center=e,this.radius=t}set(e,t){return this.center.copy(e),this.radius=t,this}setFromPoints(e,t){const n=this.center;t!==void 0?n.copy(t):Ou.setFromPoints(e).getCenter(n);let s=0;for(let r=0,a=e.length;r<a;r++)s=Math.max(s,n.distanceToSquared(e[r]));return this.radius=Math.sqrt(s),this}copy(e){return this.center.copy(e.center),this.radius=e.radius,this}isEmpty(){return this.radius<0}makeEmpty(){return this.center.set(0,0,0),this.radius=-1,this}containsPoint(e){return e.distanceToSquared(this.center)<=this.radius*this.radius}distanceToPoint(e){return e.distanceTo(this.center)-this.radius}intersectsSphere(e){const t=this.radius+e.radius;return e.center.distanceToSquared(this.center)<=t*t}intersectsBox(e){return e.intersectsSphere(this)}intersectsPlane(e){return Math.abs(e.distanceToPoint(this.center))<=this.radius}clampPoint(e,t){const n=this.center.distanceToSquared(e);return t.copy(e),n>this.radius*this.radius&&(t.sub(this.center).normalize(),t.multiplyScalar(this.radius).add(this.center)),t}getBoundingBox(e){return this.isEmpty()?(e.makeEmpty(),e):(e.set(this.center,this.center),e.expandByScalar(this.radius),e)}applyMatrix4(e){return this.center.applyMatrix4(e),this.radius=this.radius*e.getMaxScaleOnAxis(),this}translate(e){return this.center.add(e),this}expandByPoint(e){if(this.isEmpty())return this.center.copy(e),this.radius=0,this;Ki.subVectors(e,this.center);const t=Ki.lengthSq();if(t>this.radius*this.radius){const n=Math.sqrt(t),s=(n-this.radius)*.5;this.center.addScaledVector(Ki,s/n),this.radius+=s}return this}union(e){return e.isEmpty()?this:this.isEmpty()?(this.copy(e),this):(this.center.equals(e.center)===!0?this.radius=Math.max(this.radius,e.radius):(Ir.subVectors(e.center,this.center).setLength(e.radius),this.expandByPoint(Ki.copy(e.center).add(Ir)),this.expandByPoint(Ki.copy(e.center).sub(Ir))),this)}equals(e){return e.center.equals(this.center)&&e.radius===this.radius}clone(){return new this.constructor().copy(this)}}const fn=new U,Nr=new U,vs=new U,Un=new U,Or=new U,Ms=new U,Fr=new U;class Ga{constructor(e=new U,t=new U(0,0,-1)){this.origin=e,this.direction=t}set(e,t){return this.origin.copy(e),this.direction.copy(t),this}copy(e){return this.origin.copy(e.origin),this.direction.copy(e.direction),this}at(e,t){return t.copy(this.origin).addScaledVector(this.direction,e)}lookAt(e){return this.direction.copy(e).sub(this.origin).normalize(),this}recast(e){return this.origin.copy(this.at(e,fn)),this}closestPointToPoint(e,t){t.subVectors(e,this.origin);const n=t.dot(this.direction);return n<0?t.copy(this.origin):t.copy(this.origin).addScaledVector(this.direction,n)}distanceToPoint(e){return Math.sqrt(this.distanceSqToPoint(e))}distanceSqToPoint(e){const t=fn.subVectors(e,this.origin).dot(this.direction);return t<0?this.origin.distanceToSquared(e):(fn.copy(this.origin).addScaledVector(this.direction,t),fn.distanceToSquared(e))}distanceSqToSegment(e,t,n,s){Nr.copy(e).add(t).multiplyScalar(.5),vs.copy(t).sub(e).normalize(),Un.copy(this.origin).sub(Nr);const r=e.distanceTo(t)*.5,a=-this.direction.dot(vs),o=Un.dot(this.direction),c=-Un.dot(vs),l=Un.lengthSq(),d=Math.abs(1-a*a);let h,f,m,g;if(d>0)if(h=a*c-o,f=a*o-c,g=r*d,h>=0)if(f>=-g)if(f<=g){const _=1/d;h*=_,f*=_,m=h*(h+a*f+2*o)+f*(a*h+f+2*c)+l}else f=r,h=Math.max(0,-(a*f+o)),m=-h*h+f*(f+2*c)+l;else f=-r,h=Math.max(0,-(a*f+o)),m=-h*h+f*(f+2*c)+l;else f<=-g?(h=Math.max(0,-(-a*r+o)),f=h>0?-r:Math.min(Math.max(-r,-c),r),m=-h*h+f*(f+2*c)+l):f<=g?(h=0,f=Math.min(Math.max(-r,-c),r),m=f*(f+2*c)+l):(h=Math.max(0,-(a*r+o)),f=h>0?r:Math.min(Math.max(-r,-c),r),m=-h*h+f*(f+2*c)+l);else f=a>0?-r:r,h=Math.max(0,-(a*f+o)),m=-h*h+f*(f+2*c)+l;return n&&n.copy(this.origin).addScaledVector(this.direction,h),s&&s.copy(Nr).addScaledVector(vs,f),m}intersectSphere(e,t){fn.subVectors(e.center,this.origin);const n=fn.dot(this.direction),s=fn.dot(fn)-n*n,r=e.radius*e.radius;if(s>r)return null;const a=Math.sqrt(r-s),o=n-a,c=n+a;return c<0?null:o<0?this.at(c,t):this.at(o,t)}intersectsSphere(e){return this.distanceSqToPoint(e.center)<=e.radius*e.radius}distanceToPlane(e){const t=e.normal.dot(this.direction);if(t===0)return e.distanceToPoint(this.origin)===0?0:null;const n=-(this.origin.dot(e.normal)+e.constant)/t;return n>=0?n:null}intersectPlane(e,t){const n=this.distanceToPlane(e);return n===null?null:this.at(n,t)}intersectsPlane(e){const t=e.distanceToPoint(this.origin);return t===0||e.normal.dot(this.direction)*t<0}intersectBox(e,t){let n,s,r,a,o,c;const l=1/this.direction.x,d=1/this.direction.y,h=1/this.direction.z,f=this.origin;return l>=0?(n=(e.min.x-f.x)*l,s=(e.max.x-f.x)*l):(n=(e.max.x-f.x)*l,s=(e.min.x-f.x)*l),d>=0?(r=(e.min.y-f.y)*d,a=(e.max.y-f.y)*d):(r=(e.max.y-f.y)*d,a=(e.min.y-f.y)*d),n>a||r>s||((r>n||isNaN(n))&&(n=r),(a<s||isNaN(s))&&(s=a),h>=0?(o=(e.min.z-f.z)*h,c=(e.max.z-f.z)*h):(o=(e.max.z-f.z)*h,c=(e.min.z-f.z)*h),n>c||o>s)||((o>n||n!==n)&&(n=o),(c<s||s!==s)&&(s=c),s<0)?null:this.at(n>=0?n:s,t)}intersectsBox(e){return this.intersectBox(e,fn)!==null}intersectTriangle(e,t,n,s,r){Or.subVectors(t,e),Ms.subVectors(n,e),Fr.crossVectors(Or,Ms);let a=this.direction.dot(Fr),o;if(a>0){if(s)return null;o=1}else if(a<0)o=-1,a=-a;else return null;Un.subVectors(this.origin,e);const c=o*this.direction.dot(Ms.crossVectors(Un,Ms));if(c<0)return null;const l=o*this.direction.dot(Or.cross(Un));if(l<0||c+l>a)return null;const d=-o*Un.dot(Fr);return d<0?null:this.at(d/a,r)}applyMatrix4(e){return this.origin.applyMatrix4(e),this.direction.transformDirection(e),this}equals(e){return e.origin.equals(this.origin)&&e.direction.equals(this.direction)}clone(){return new this.constructor().copy(this)}}class lt{constructor(e,t,n,s,r,a,o,c,l,d,h,f,m,g,_,p){lt.prototype.isMatrix4=!0,this.elements=[1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1],e!==void 0&&this.set(e,t,n,s,r,a,o,c,l,d,h,f,m,g,_,p)}set(e,t,n,s,r,a,o,c,l,d,h,f,m,g,_,p){const u=this.elements;return u[0]=e,u[4]=t,u[8]=n,u[12]=s,u[1]=r,u[5]=a,u[9]=o,u[13]=c,u[2]=l,u[6]=d,u[10]=h,u[14]=f,u[3]=m,u[7]=g,u[11]=_,u[15]=p,this}identity(){return this.set(1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1),this}clone(){return new lt().fromArray(this.elements)}copy(e){const t=this.elements,n=e.elements;return t[0]=n[0],t[1]=n[1],t[2]=n[2],t[3]=n[3],t[4]=n[4],t[5]=n[5],t[6]=n[6],t[7]=n[7],t[8]=n[8],t[9]=n[9],t[10]=n[10],t[11]=n[11],t[12]=n[12],t[13]=n[13],t[14]=n[14],t[15]=n[15],this}copyPosition(e){const t=this.elements,n=e.elements;return t[12]=n[12],t[13]=n[13],t[14]=n[14],this}setFromMatrix3(e){const t=e.elements;return this.set(t[0],t[3],t[6],0,t[1],t[4],t[7],0,t[2],t[5],t[8],0,0,0,0,1),this}extractBasis(e,t,n){return e.setFromMatrixColumn(this,0),t.setFromMatrixColumn(this,1),n.setFromMatrixColumn(this,2),this}makeBasis(e,t,n){return this.set(e.x,t.x,n.x,0,e.y,t.y,n.y,0,e.z,t.z,n.z,0,0,0,0,1),this}extractRotation(e){const t=this.elements,n=e.elements,s=1/gi.setFromMatrixColumn(e,0).length(),r=1/gi.setFromMatrixColumn(e,1).length(),a=1/gi.setFromMatrixColumn(e,2).length();return t[0]=n[0]*s,t[1]=n[1]*s,t[2]=n[2]*s,t[3]=0,t[4]=n[4]*r,t[5]=n[5]*r,t[6]=n[6]*r,t[7]=0,t[8]=n[8]*a,t[9]=n[9]*a,t[10]=n[10]*a,t[11]=0,t[12]=0,t[13]=0,t[14]=0,t[15]=1,this}makeRotationFromEuler(e){const t=this.elements,n=e.x,s=e.y,r=e.z,a=Math.cos(n),o=Math.sin(n),c=Math.cos(s),l=Math.sin(s),d=Math.cos(r),h=Math.sin(r);if(e.order==="XYZ"){const f=a*d,m=a*h,g=o*d,_=o*h;t[0]=c*d,t[4]=-c*h,t[8]=l,t[1]=m+g*l,t[5]=f-_*l,t[9]=-o*c,t[2]=_-f*l,t[6]=g+m*l,t[10]=a*c}else if(e.order==="YXZ"){const f=c*d,m=c*h,g=l*d,_=l*h;t[0]=f+_*o,t[4]=g*o-m,t[8]=a*l,t[1]=a*h,t[5]=a*d,t[9]=-o,t[2]=m*o-g,t[6]=_+f*o,t[10]=a*c}else if(e.order==="ZXY"){const f=c*d,m=c*h,g=l*d,_=l*h;t[0]=f-_*o,t[4]=-a*h,t[8]=g+m*o,t[1]=m+g*o,t[5]=a*d,t[9]=_-f*o,t[2]=-a*l,t[6]=o,t[10]=a*c}else if(e.order==="ZYX"){const f=a*d,m=a*h,g=o*d,_=o*h;t[0]=c*d,t[4]=g*l-m,t[8]=f*l+_,t[1]=c*h,t[5]=_*l+f,t[9]=m*l-g,t[2]=-l,t[6]=o*c,t[10]=a*c}else if(e.order==="YZX"){const f=a*c,m=a*l,g=o*c,_=o*l;t[0]=c*d,t[4]=_-f*h,t[8]=g*h+m,t[1]=h,t[5]=a*d,t[9]=-o*d,t[2]=-l*d,t[6]=m*h+g,t[10]=f-_*h}else if(e.order==="XZY"){const f=a*c,m=a*l,g=o*c,_=o*l;t[0]=c*d,t[4]=-h,t[8]=l*d,t[1]=f*h+_,t[5]=a*d,t[9]=m*h-g,t[2]=g*h-m,t[6]=o*d,t[10]=_*h+f}return t[3]=0,t[7]=0,t[11]=0,t[12]=0,t[13]=0,t[14]=0,t[15]=1,this}makeRotationFromQuaternion(e){return this.compose(Fu,e,zu)}lookAt(e,t,n){const s=this.elements;return zt.subVectors(e,t),zt.lengthSq()===0&&(zt.z=1),zt.normalize(),In.crossVectors(n,zt),In.lengthSq()===0&&(Math.abs(n.z)===1?zt.x+=1e-4:zt.z+=1e-4,zt.normalize(),In.crossVectors(n,zt)),In.normalize(),ys.crossVectors(zt,In),s[0]=In.x,s[4]=ys.x,s[8]=zt.x,s[1]=In.y,s[5]=ys.y,s[9]=zt.y,s[2]=In.z,s[6]=ys.z,s[10]=zt.z,this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,t){const n=e.elements,s=t.elements,r=this.elements,a=n[0],o=n[4],c=n[8],l=n[12],d=n[1],h=n[5],f=n[9],m=n[13],g=n[2],_=n[6],p=n[10],u=n[14],M=n[3],x=n[7],T=n[11],C=n[15],w=s[0],A=s[4],X=s[8],S=s[12],b=s[1],k=s[5],$=s[9],se=s[13],L=s[2],z=s[6],G=s[10],Y=s[14],V=s[3],D=s[7],W=s[11],q=s[15];return r[0]=a*w+o*b+c*L+l*V,r[4]=a*A+o*k+c*z+l*D,r[8]=a*X+o*$+c*G+l*W,r[12]=a*S+o*se+c*Y+l*q,r[1]=d*w+h*b+f*L+m*V,r[5]=d*A+h*k+f*z+m*D,r[9]=d*X+h*$+f*G+m*W,r[13]=d*S+h*se+f*Y+m*q,r[2]=g*w+_*b+p*L+u*V,r[6]=g*A+_*k+p*z+u*D,r[10]=g*X+_*$+p*G+u*W,r[14]=g*S+_*se+p*Y+u*q,r[3]=M*w+x*b+T*L+C*V,r[7]=M*A+x*k+T*z+C*D,r[11]=M*X+x*$+T*G+C*W,r[15]=M*S+x*se+T*Y+C*q,this}multiplyScalar(e){const t=this.elements;return t[0]*=e,t[4]*=e,t[8]*=e,t[12]*=e,t[1]*=e,t[5]*=e,t[9]*=e,t[13]*=e,t[2]*=e,t[6]*=e,t[10]*=e,t[14]*=e,t[3]*=e,t[7]*=e,t[11]*=e,t[15]*=e,this}determinant(){const e=this.elements,t=e[0],n=e[4],s=e[8],r=e[12],a=e[1],o=e[5],c=e[9],l=e[13],d=e[2],h=e[6],f=e[10],m=e[14],g=e[3],_=e[7],p=e[11],u=e[15];return g*(+r*c*h-s*l*h-r*o*f+n*l*f+s*o*m-n*c*m)+_*(+t*c*m-t*l*f+r*a*f-s*a*m+s*l*d-r*c*d)+p*(+t*l*h-t*o*m-r*a*h+n*a*m+r*o*d-n*l*d)+u*(-s*o*d-t*c*h+t*o*f+s*a*h-n*a*f+n*c*d)}transpose(){const e=this.elements;let t;return t=e[1],e[1]=e[4],e[4]=t,t=e[2],e[2]=e[8],e[8]=t,t=e[6],e[6]=e[9],e[9]=t,t=e[3],e[3]=e[12],e[12]=t,t=e[7],e[7]=e[13],e[13]=t,t=e[11],e[11]=e[14],e[14]=t,this}setPosition(e,t,n){const s=this.elements;return e.isVector3?(s[12]=e.x,s[13]=e.y,s[14]=e.z):(s[12]=e,s[13]=t,s[14]=n),this}invert(){const e=this.elements,t=e[0],n=e[1],s=e[2],r=e[3],a=e[4],o=e[5],c=e[6],l=e[7],d=e[8],h=e[9],f=e[10],m=e[11],g=e[12],_=e[13],p=e[14],u=e[15],M=h*p*l-_*f*l+_*c*m-o*p*m-h*c*u+o*f*u,x=g*f*l-d*p*l-g*c*m+a*p*m+d*c*u-a*f*u,T=d*_*l-g*h*l+g*o*m-a*_*m-d*o*u+a*h*u,C=g*h*c-d*_*c-g*o*f+a*_*f+d*o*p-a*h*p,w=t*M+n*x+s*T+r*C;if(w===0)return this.set(0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0);const A=1/w;return e[0]=M*A,e[1]=(_*f*r-h*p*r-_*s*m+n*p*m+h*s*u-n*f*u)*A,e[2]=(o*p*r-_*c*r+_*s*l-n*p*l-o*s*u+n*c*u)*A,e[3]=(h*c*r-o*f*r-h*s*l+n*f*l+o*s*m-n*c*m)*A,e[4]=x*A,e[5]=(d*p*r-g*f*r+g*s*m-t*p*m-d*s*u+t*f*u)*A,e[6]=(g*c*r-a*p*r-g*s*l+t*p*l+a*s*u-t*c*u)*A,e[7]=(a*f*r-d*c*r+d*s*l-t*f*l-a*s*m+t*c*m)*A,e[8]=T*A,e[9]=(g*h*r-d*_*r-g*n*m+t*_*m+d*n*u-t*h*u)*A,e[10]=(a*_*r-g*o*r+g*n*l-t*_*l-a*n*u+t*o*u)*A,e[11]=(d*o*r-a*h*r-d*n*l+t*h*l+a*n*m-t*o*m)*A,e[12]=C*A,e[13]=(d*_*s-g*h*s+g*n*f-t*_*f-d*n*p+t*h*p)*A,e[14]=(g*o*s-a*_*s-g*n*c+t*_*c+a*n*p-t*o*p)*A,e[15]=(a*h*s-d*o*s+d*n*c-t*h*c-a*n*f+t*o*f)*A,this}scale(e){const t=this.elements,n=e.x,s=e.y,r=e.z;return t[0]*=n,t[4]*=s,t[8]*=r,t[1]*=n,t[5]*=s,t[9]*=r,t[2]*=n,t[6]*=s,t[10]*=r,t[3]*=n,t[7]*=s,t[11]*=r,this}getMaxScaleOnAxis(){const e=this.elements,t=e[0]*e[0]+e[1]*e[1]+e[2]*e[2],n=e[4]*e[4]+e[5]*e[5]+e[6]*e[6],s=e[8]*e[8]+e[9]*e[9]+e[10]*e[10];return Math.sqrt(Math.max(t,n,s))}makeTranslation(e,t,n){return e.isVector3?this.set(1,0,0,e.x,0,1,0,e.y,0,0,1,e.z,0,0,0,1):this.set(1,0,0,e,0,1,0,t,0,0,1,n,0,0,0,1),this}makeRotationX(e){const t=Math.cos(e),n=Math.sin(e);return this.set(1,0,0,0,0,t,-n,0,0,n,t,0,0,0,0,1),this}makeRotationY(e){const t=Math.cos(e),n=Math.sin(e);return this.set(t,0,n,0,0,1,0,0,-n,0,t,0,0,0,0,1),this}makeRotationZ(e){const t=Math.cos(e),n=Math.sin(e);return this.set(t,-n,0,0,n,t,0,0,0,0,1,0,0,0,0,1),this}makeRotationAxis(e,t){const n=Math.cos(t),s=Math.sin(t),r=1-n,a=e.x,o=e.y,c=e.z,l=r*a,d=r*o;return this.set(l*a+n,l*o-s*c,l*c+s*o,0,l*o+s*c,d*o+n,d*c-s*a,0,l*c-s*o,d*c+s*a,r*c*c+n,0,0,0,0,1),this}makeScale(e,t,n){return this.set(e,0,0,0,0,t,0,0,0,0,n,0,0,0,0,1),this}makeShear(e,t,n,s,r,a){return this.set(1,n,r,0,e,1,a,0,t,s,1,0,0,0,0,1),this}compose(e,t,n){const s=this.elements,r=t._x,a=t._y,o=t._z,c=t._w,l=r+r,d=a+a,h=o+o,f=r*l,m=r*d,g=r*h,_=a*d,p=a*h,u=o*h,M=c*l,x=c*d,T=c*h,C=n.x,w=n.y,A=n.z;return s[0]=(1-(_+u))*C,s[1]=(m+T)*C,s[2]=(g-x)*C,s[3]=0,s[4]=(m-T)*w,s[5]=(1-(f+u))*w,s[6]=(p+M)*w,s[7]=0,s[8]=(g+x)*A,s[9]=(p-M)*A,s[10]=(1-(f+_))*A,s[11]=0,s[12]=e.x,s[13]=e.y,s[14]=e.z,s[15]=1,this}decompose(e,t,n){const s=this.elements;let r=gi.set(s[0],s[1],s[2]).length();const a=gi.set(s[4],s[5],s[6]).length(),o=gi.set(s[8],s[9],s[10]).length();this.determinant()<0&&(r=-r),e.x=s[12],e.y=s[13],e.z=s[14],Kt.copy(this);const l=1/r,d=1/a,h=1/o;return Kt.elements[0]*=l,Kt.elements[1]*=l,Kt.elements[2]*=l,Kt.elements[4]*=d,Kt.elements[5]*=d,Kt.elements[6]*=d,Kt.elements[8]*=h,Kt.elements[9]*=h,Kt.elements[10]*=h,t.setFromRotationMatrix(Kt),n.x=r,n.y=a,n.z=o,this}makePerspective(e,t,n,s,r,a,o=dn){const c=this.elements,l=2*r/(t-e),d=2*r/(n-s),h=(t+e)/(t-e),f=(n+s)/(n-s);let m,g;if(o===dn)m=-(a+r)/(a-r),g=-2*a*r/(a-r);else if(o===fs)m=-a/(a-r),g=-a*r/(a-r);else throw new Error("THREE.Matrix4.makePerspective(): Invalid coordinate system: "+o);return c[0]=l,c[4]=0,c[8]=h,c[12]=0,c[1]=0,c[5]=d,c[9]=f,c[13]=0,c[2]=0,c[6]=0,c[10]=m,c[14]=g,c[3]=0,c[7]=0,c[11]=-1,c[15]=0,this}makeOrthographic(e,t,n,s,r,a,o=dn){const c=this.elements,l=1/(t-e),d=1/(n-s),h=1/(a-r),f=(t+e)*l,m=(n+s)*d;let g,_;if(o===dn)g=(a+r)*h,_=-2*h;else if(o===fs)g=r*h,_=-1*h;else throw new Error("THREE.Matrix4.makeOrthographic(): Invalid coordinate system: "+o);return c[0]=2*l,c[4]=0,c[8]=0,c[12]=-f,c[1]=0,c[5]=2*d,c[9]=0,c[13]=-m,c[2]=0,c[6]=0,c[10]=_,c[14]=-g,c[3]=0,c[7]=0,c[11]=0,c[15]=1,this}equals(e){const t=this.elements,n=e.elements;for(let s=0;s<16;s++)if(t[s]!==n[s])return!1;return!0}fromArray(e,t=0){for(let n=0;n<16;n++)this.elements[n]=e[n+t];return this}toArray(e=[],t=0){const n=this.elements;return e[t]=n[0],e[t+1]=n[1],e[t+2]=n[2],e[t+3]=n[3],e[t+4]=n[4],e[t+5]=n[5],e[t+6]=n[6],e[t+7]=n[7],e[t+8]=n[8],e[t+9]=n[9],e[t+10]=n[10],e[t+11]=n[11],e[t+12]=n[12],e[t+13]=n[13],e[t+14]=n[14],e[t+15]=n[15],e}}const gi=new U,Kt=new lt,Fu=new U(0,0,0),zu=new U(1,1,1),In=new U,ys=new U,zt=new U,Va=new lt,Wa=new Yi;class Ss{constructor(e=0,t=0,n=0,s=Ss.DEFAULT_ORDER){this.isEuler=!0,this._x=e,this._y=t,this._z=n,this._order=s}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get order(){return this._order}set order(e){this._order=e,this._onChangeCallback()}set(e,t,n,s=this._order){return this._x=e,this._y=t,this._z=n,this._order=s,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._order)}copy(e){return this._x=e._x,this._y=e._y,this._z=e._z,this._order=e._order,this._onChangeCallback(),this}setFromRotationMatrix(e,t=this._order,n=!0){const s=e.elements,r=s[0],a=s[4],o=s[8],c=s[1],l=s[5],d=s[9],h=s[2],f=s[6],m=s[10];switch(t){case"XYZ":this._y=Math.asin(It(o,-1,1)),Math.abs(o)<.9999999?(this._x=Math.atan2(-d,m),this._z=Math.atan2(-a,r)):(this._x=Math.atan2(f,l),this._z=0);break;case"YXZ":this._x=Math.asin(-It(d,-1,1)),Math.abs(d)<.9999999?(this._y=Math.atan2(o,m),this._z=Math.atan2(c,l)):(this._y=Math.atan2(-h,r),this._z=0);break;case"ZXY":this._x=Math.asin(It(f,-1,1)),Math.abs(f)<.9999999?(this._y=Math.atan2(-h,m),this._z=Math.atan2(-a,l)):(this._y=0,this._z=Math.atan2(c,r));break;case"ZYX":this._y=Math.asin(-It(h,-1,1)),Math.abs(h)<.9999999?(this._x=Math.atan2(f,m),this._z=Math.atan2(c,r)):(this._x=0,this._z=Math.atan2(-a,l));break;case"YZX":this._z=Math.asin(It(c,-1,1)),Math.abs(c)<.9999999?(this._x=Math.atan2(-d,l),this._y=Math.atan2(-h,r)):(this._x=0,this._y=Math.atan2(o,m));break;case"XZY":this._z=Math.asin(-It(a,-1,1)),Math.abs(a)<.9999999?(this._x=Math.atan2(f,l),this._y=Math.atan2(o,r)):(this._x=Math.atan2(-d,m),this._y=0);break;default:console.warn("THREE.Euler: .setFromRotationMatrix() encountered an unknown order: "+t)}return this._order=t,n===!0&&this._onChangeCallback(),this}setFromQuaternion(e,t,n){return Va.makeRotationFromQuaternion(e),this.setFromRotationMatrix(Va,t,n)}setFromVector3(e,t=this._order){return this.set(e.x,e.y,e.z,t)}reorder(e){return Wa.setFromEuler(this),this.setFromQuaternion(Wa,e)}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._order===this._order}fromArray(e){return this._x=e[0],this._y=e[1],this._z=e[2],e[3]!==void 0&&(this._order=e[3]),this._onChangeCallback(),this}toArray(e=[],t=0){return e[t]=this._x,e[t+1]=this._y,e[t+2]=this._z,e[t+3]=this._order,e}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._order}}Ss.DEFAULT_ORDER="XYZ";class Xa{constructor(){this.mask=1}set(e){this.mask=(1<<e|0)>>>0}enable(e){this.mask|=1<<e|0}enableAll(){this.mask=-1}toggle(e){this.mask^=1<<e|0}disable(e){this.mask&=~(1<<e|0)}disableAll(){this.mask=0}test(e){return(this.mask&e.mask)!==0}isEnabled(e){return(this.mask&(1<<e|0))!==0}}let Bu=0;const ja=new U,_i=new Yi,pn=new lt,Es=new U,Ji=new U,ku=new U,Hu=new Yi,qa=new U(1,0,0),Ya=new U(0,1,0),$a=new U(0,0,1),Gu={type:"added"},Vu={type:"removed"};class mt extends ui{constructor(){super(),this.isObject3D=!0,Object.defineProperty(this,"id",{value:Bu++}),this.uuid=Wi(),this.name="",this.type="Object3D",this.parent=null,this.children=[],this.up=mt.DEFAULT_UP.clone();const e=new U,t=new Ss,n=new Yi,s=new U(1,1,1);function r(){n.setFromEuler(t,!1)}function a(){t.setFromQuaternion(n,void 0,!1)}t._onChange(r),n._onChange(a),Object.defineProperties(this,{position:{configurable:!0,enumerable:!0,value:e},rotation:{configurable:!0,enumerable:!0,value:t},quaternion:{configurable:!0,enumerable:!0,value:n},scale:{configurable:!0,enumerable:!0,value:s},modelViewMatrix:{value:new lt},normalMatrix:{value:new He}}),this.matrix=new lt,this.matrixWorld=new lt,this.matrixAutoUpdate=mt.DEFAULT_MATRIX_AUTO_UPDATE,this.matrixWorldAutoUpdate=mt.DEFAULT_MATRIX_WORLD_AUTO_UPDATE,this.matrixWorldNeedsUpdate=!1,this.layers=new Xa,this.visible=!0,this.castShadow=!1,this.receiveShadow=!1,this.frustumCulled=!0,this.renderOrder=0,this.animations=[],this.userData={}}onBeforeShadow(){}onAfterShadow(){}onBeforeRender(){}onAfterRender(){}applyMatrix4(e){this.matrixAutoUpdate&&this.updateMatrix(),this.matrix.premultiply(e),this.matrix.decompose(this.position,this.quaternion,this.scale)}applyQuaternion(e){return this.quaternion.premultiply(e),this}setRotationFromAxisAngle(e,t){this.quaternion.setFromAxisAngle(e,t)}setRotationFromEuler(e){this.quaternion.setFromEuler(e,!0)}setRotationFromMatrix(e){this.quaternion.setFromRotationMatrix(e)}setRotationFromQuaternion(e){this.quaternion.copy(e)}rotateOnAxis(e,t){return _i.setFromAxisAngle(e,t),this.quaternion.multiply(_i),this}rotateOnWorldAxis(e,t){return _i.setFromAxisAngle(e,t),this.quaternion.premultiply(_i),this}rotateX(e){return this.rotateOnAxis(qa,e)}rotateY(e){return this.rotateOnAxis(Ya,e)}rotateZ(e){return this.rotateOnAxis($a,e)}translateOnAxis(e,t){return ja.copy(e).applyQuaternion(this.quaternion),this.position.add(ja.multiplyScalar(t)),this}translateX(e){return this.translateOnAxis(qa,e)}translateY(e){return this.translateOnAxis(Ya,e)}translateZ(e){return this.translateOnAxis($a,e)}localToWorld(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4(this.matrixWorld)}worldToLocal(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4(pn.copy(this.matrixWorld).invert())}lookAt(e,t,n){e.isVector3?Es.copy(e):Es.set(e,t,n);const s=this.parent;this.updateWorldMatrix(!0,!1),Ji.setFromMatrixPosition(this.matrixWorld),this.isCamera||this.isLight?pn.lookAt(Ji,Es,this.up):pn.lookAt(Es,Ji,this.up),this.quaternion.setFromRotationMatrix(pn),s&&(pn.extractRotation(s.matrixWorld),_i.setFromRotationMatrix(pn),this.quaternion.premultiply(_i.invert()))}add(e){if(arguments.length>1){for(let t=0;t<arguments.length;t++)this.add(arguments[t]);return this}return e===this?(console.error("THREE.Object3D.add: object can't be added as a child of itself.",e),this):(e&&e.isObject3D?(e.parent!==null&&e.parent.remove(e),e.parent=this,this.children.push(e),e.dispatchEvent(Gu)):console.error("THREE.Object3D.add: object not an instance of THREE.Object3D.",e),this)}remove(e){if(arguments.length>1){for(let n=0;n<arguments.length;n++)this.remove(arguments[n]);return this}const t=this.children.indexOf(e);return t!==-1&&(e.parent=null,this.children.splice(t,1),e.dispatchEvent(Vu)),this}removeFromParent(){const e=this.parent;return e!==null&&e.remove(this),this}clear(){return this.remove(...this.children)}attach(e){return this.updateWorldMatrix(!0,!1),pn.copy(this.matrixWorld).invert(),e.parent!==null&&(e.parent.updateWorldMatrix(!0,!1),pn.multiply(e.parent.matrixWorld)),e.applyMatrix4(pn),this.add(e),e.updateWorldMatrix(!1,!0),this}getObjectById(e){return this.getObjectByProperty("id",e)}getObjectByName(e){return this.getObjectByProperty("name",e)}getObjectByProperty(e,t){if(this[e]===t)return this;for(let n=0,s=this.children.length;n<s;n++){const a=this.children[n].getObjectByProperty(e,t);if(a!==void 0)return a}}getObjectsByProperty(e,t,n=[]){this[e]===t&&n.push(this);const s=this.children;for(let r=0,a=s.length;r<a;r++)s[r].getObjectsByProperty(e,t,n);return n}getWorldPosition(e){return this.updateWorldMatrix(!0,!1),e.setFromMatrixPosition(this.matrixWorld)}getWorldQuaternion(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(Ji,e,ku),e}getWorldScale(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(Ji,Hu,e),e}getWorldDirection(e){this.updateWorldMatrix(!0,!1);const t=this.matrixWorld.elements;return e.set(t[8],t[9],t[10]).normalize()}raycast(){}traverse(e){e(this);const t=this.children;for(let n=0,s=t.length;n<s;n++)t[n].traverse(e)}traverseVisible(e){if(this.visible===!1)return;e(this);const t=this.children;for(let n=0,s=t.length;n<s;n++)t[n].traverseVisible(e)}traverseAncestors(e){const t=this.parent;t!==null&&(e(t),t.traverseAncestors(e))}updateMatrix(){this.matrix.compose(this.position,this.quaternion,this.scale),this.matrixWorldNeedsUpdate=!0}updateMatrixWorld(e){this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||e)&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix),this.matrixWorldNeedsUpdate=!1,e=!0);const t=this.children;for(let n=0,s=t.length;n<s;n++){const r=t[n];(r.matrixWorldAutoUpdate===!0||e===!0)&&r.updateMatrixWorld(e)}}updateWorldMatrix(e,t){const n=this.parent;if(e===!0&&n!==null&&n.matrixWorldAutoUpdate===!0&&n.updateWorldMatrix(!0,!1),this.matrixAutoUpdate&&this.updateMatrix(),this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix),t===!0){const s=this.children;for(let r=0,a=s.length;r<a;r++){const o=s[r];o.matrixWorldAutoUpdate===!0&&o.updateWorldMatrix(!1,!0)}}}toJSON(e){const t=e===void 0||typeof e=="string",n={};t&&(e={geometries:{},materials:{},textures:{},images:{},shapes:{},skeletons:{},animations:{},nodes:{}},n.metadata={version:4.6,type:"Object",generator:"Object3D.toJSON"});const s={};s.uuid=this.uuid,s.type=this.type,this.name!==""&&(s.name=this.name),this.castShadow===!0&&(s.castShadow=!0),this.receiveShadow===!0&&(s.receiveShadow=!0),this.visible===!1&&(s.visible=!1),this.frustumCulled===!1&&(s.frustumCulled=!1),this.renderOrder!==0&&(s.renderOrder=this.renderOrder),Object.keys(this.userData).length>0&&(s.userData=this.userData),s.layers=this.layers.mask,s.matrix=this.matrix.toArray(),s.up=this.up.toArray(),this.matrixAutoUpdate===!1&&(s.matrixAutoUpdate=!1),this.isInstancedMesh&&(s.type="InstancedMesh",s.count=this.count,s.instanceMatrix=this.instanceMatrix.toJSON(),this.instanceColor!==null&&(s.instanceColor=this.instanceColor.toJSON())),this.isBatchedMesh&&(s.type="BatchedMesh",s.perObjectFrustumCulled=this.perObjectFrustumCulled,s.sortObjects=this.sortObjects,s.drawRanges=this._drawRanges,s.reservedRanges=this._reservedRanges,s.visibility=this._visibility,s.active=this._active,s.bounds=this._bounds.map(o=>({boxInitialized:o.boxInitialized,boxMin:o.box.min.toArray(),boxMax:o.box.max.toArray(),sphereInitialized:o.sphereInitialized,sphereRadius:o.sphere.radius,sphereCenter:o.sphere.center.toArray()})),s.maxGeometryCount=this._maxGeometryCount,s.maxVertexCount=this._maxVertexCount,s.maxIndexCount=this._maxIndexCount,s.geometryInitialized=this._geometryInitialized,s.geometryCount=this._geometryCount,s.matricesTexture=this._matricesTexture.toJSON(e),this.boundingSphere!==null&&(s.boundingSphere={center:s.boundingSphere.center.toArray(),radius:s.boundingSphere.radius}),this.boundingBox!==null&&(s.boundingBox={min:s.boundingBox.min.toArray(),max:s.boundingBox.max.toArray()}));function r(o,c){return o[c.uuid]===void 0&&(o[c.uuid]=c.toJSON(e)),c.uuid}if(this.isScene)this.background&&(this.background.isColor?s.background=this.background.toJSON():this.background.isTexture&&(s.background=this.background.toJSON(e).uuid)),this.environment&&this.environment.isTexture&&this.environment.isRenderTargetTexture!==!0&&(s.environment=this.environment.toJSON(e).uuid);else if(this.isMesh||this.isLine||this.isPoints){s.geometry=r(e.geometries,this.geometry);const o=this.geometry.parameters;if(o!==void 0&&o.shapes!==void 0){const c=o.shapes;if(Array.isArray(c))for(let l=0,d=c.length;l<d;l++){const h=c[l];r(e.shapes,h)}else r(e.shapes,c)}}if(this.isSkinnedMesh&&(s.bindMode=this.bindMode,s.bindMatrix=this.bindMatrix.toArray(),this.skeleton!==void 0&&(r(e.skeletons,this.skeleton),s.skeleton=this.skeleton.uuid)),this.material!==void 0)if(Array.isArray(this.material)){const o=[];for(let c=0,l=this.material.length;c<l;c++)o.push(r(e.materials,this.material[c]));s.material=o}else s.material=r(e.materials,this.material);if(this.children.length>0){s.children=[];for(let o=0;o<this.children.length;o++)s.children.push(this.children[o].toJSON(e).object)}if(this.animations.length>0){s.animations=[];for(let o=0;o<this.animations.length;o++){const c=this.animations[o];s.animations.push(r(e.animations,c))}}if(t){const o=a(e.geometries),c=a(e.materials),l=a(e.textures),d=a(e.images),h=a(e.shapes),f=a(e.skeletons),m=a(e.animations),g=a(e.nodes);o.length>0&&(n.geometries=o),c.length>0&&(n.materials=c),l.length>0&&(n.textures=l),d.length>0&&(n.images=d),h.length>0&&(n.shapes=h),f.length>0&&(n.skeletons=f),m.length>0&&(n.animations=m),g.length>0&&(n.nodes=g)}return n.object=s,n;function a(o){const c=[];for(const l in o){const d=o[l];delete d.metadata,c.push(d)}return c}}clone(e){return new this.constructor().copy(this,e)}copy(e,t=!0){if(this.name=e.name,this.up.copy(e.up),this.position.copy(e.position),this.rotation.order=e.rotation.order,this.quaternion.copy(e.quaternion),this.scale.copy(e.scale),this.matrix.copy(e.matrix),this.matrixWorld.copy(e.matrixWorld),this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrixWorldAutoUpdate=e.matrixWorldAutoUpdate,this.matrixWorldNeedsUpdate=e.matrixWorldNeedsUpdate,this.layers.mask=e.layers.mask,this.visible=e.visible,this.castShadow=e.castShadow,this.receiveShadow=e.receiveShadow,this.frustumCulled=e.frustumCulled,this.renderOrder=e.renderOrder,this.animations=e.animations.slice(),this.userData=JSON.parse(JSON.stringify(e.userData)),t===!0)for(let n=0;n<e.children.length;n++){const s=e.children[n];this.add(s.clone())}return this}}mt.DEFAULT_UP=new U(0,1,0),mt.DEFAULT_MATRIX_AUTO_UPDATE=!0,mt.DEFAULT_MATRIX_WORLD_AUTO_UPDATE=!0;const Jt=new U,mn=new U,zr=new U,gn=new U,xi=new U,vi=new U,Za=new U,Br=new U,kr=new U,Hr=new U;let bs=!1;class Qt{constructor(e=new U,t=new U,n=new U){this.a=e,this.b=t,this.c=n}static getNormal(e,t,n,s){s.subVectors(n,t),Jt.subVectors(e,t),s.cross(Jt);const r=s.lengthSq();return r>0?s.multiplyScalar(1/Math.sqrt(r)):s.set(0,0,0)}static getBarycoord(e,t,n,s,r){Jt.subVectors(s,t),mn.subVectors(n,t),zr.subVectors(e,t);const a=Jt.dot(Jt),o=Jt.dot(mn),c=Jt.dot(zr),l=mn.dot(mn),d=mn.dot(zr),h=a*l-o*o;if(h===0)return r.set(0,0,0),null;const f=1/h,m=(l*c-o*d)*f,g=(a*d-o*c)*f;return r.set(1-m-g,g,m)}static containsPoint(e,t,n,s){return this.getBarycoord(e,t,n,s,gn)===null?!1:gn.x>=0&&gn.y>=0&&gn.x+gn.y<=1}static getUV(e,t,n,s,r,a,o,c){return bs===!1&&(console.warn("THREE.Triangle.getUV() has been renamed to THREE.Triangle.getInterpolation()."),bs=!0),this.getInterpolation(e,t,n,s,r,a,o,c)}static getInterpolation(e,t,n,s,r,a,o,c){return this.getBarycoord(e,t,n,s,gn)===null?(c.x=0,c.y=0,"z"in c&&(c.z=0),"w"in c&&(c.w=0),null):(c.setScalar(0),c.addScaledVector(r,gn.x),c.addScaledVector(a,gn.y),c.addScaledVector(o,gn.z),c)}static isFrontFacing(e,t,n,s){return Jt.subVectors(n,t),mn.subVectors(e,t),Jt.cross(mn).dot(s)<0}set(e,t,n){return this.a.copy(e),this.b.copy(t),this.c.copy(n),this}setFromPointsAndIndices(e,t,n,s){return this.a.copy(e[t]),this.b.copy(e[n]),this.c.copy(e[s]),this}setFromAttributeAndIndices(e,t,n,s){return this.a.fromBufferAttribute(e,t),this.b.fromBufferAttribute(e,n),this.c.fromBufferAttribute(e,s),this}clone(){return new this.constructor().copy(this)}copy(e){return this.a.copy(e.a),this.b.copy(e.b),this.c.copy(e.c),this}getArea(){return Jt.subVectors(this.c,this.b),mn.subVectors(this.a,this.b),Jt.cross(mn).length()*.5}getMidpoint(e){return e.addVectors(this.a,this.b).add(this.c).multiplyScalar(1/3)}getNormal(e){return Qt.getNormal(this.a,this.b,this.c,e)}getPlane(e){return e.setFromCoplanarPoints(this.a,this.b,this.c)}getBarycoord(e,t){return Qt.getBarycoord(e,this.a,this.b,this.c,t)}getUV(e,t,n,s,r){return bs===!1&&(console.warn("THREE.Triangle.getUV() has been renamed to THREE.Triangle.getInterpolation()."),bs=!0),Qt.getInterpolation(e,this.a,this.b,this.c,t,n,s,r)}getInterpolation(e,t,n,s,r){return Qt.getInterpolation(e,this.a,this.b,this.c,t,n,s,r)}containsPoint(e){return Qt.containsPoint(e,this.a,this.b,this.c)}isFrontFacing(e){return Qt.isFrontFacing(this.a,this.b,this.c,e)}intersectsBox(e){return e.intersectsTriangle(this)}closestPointToPoint(e,t){const n=this.a,s=this.b,r=this.c;let a,o;xi.subVectors(s,n),vi.subVectors(r,n),Br.subVectors(e,n);const c=xi.dot(Br),l=vi.dot(Br);if(c<=0&&l<=0)return t.copy(n);kr.subVectors(e,s);const d=xi.dot(kr),h=vi.dot(kr);if(d>=0&&h<=d)return t.copy(s);const f=c*h-d*l;if(f<=0&&c>=0&&d<=0)return a=c/(c-d),t.copy(n).addScaledVector(xi,a);Hr.subVectors(e,r);const m=xi.dot(Hr),g=vi.dot(Hr);if(g>=0&&m<=g)return t.copy(r);const _=m*l-c*g;if(_<=0&&l>=0&&g<=0)return o=l/(l-g),t.copy(n).addScaledVector(vi,o);const p=d*g-m*h;if(p<=0&&h-d>=0&&m-g>=0)return Za.subVectors(r,s),o=(h-d)/(h-d+(m-g)),t.copy(s).addScaledVector(Za,o);const u=1/(p+_+f);return a=_*u,o=f*u,t.copy(n).addScaledVector(xi,a).addScaledVector(vi,o)}equals(e){return e.a.equals(this.a)&&e.b.equals(this.b)&&e.c.equals(this.c)}}const Ka={aliceblue:15792383,antiquewhite:16444375,aqua:65535,aquamarine:8388564,azure:15794175,beige:16119260,bisque:16770244,black:0,blanchedalmond:16772045,blue:255,blueviolet:9055202,brown:10824234,burlywood:14596231,cadetblue:6266528,chartreuse:8388352,chocolate:13789470,coral:16744272,cornflowerblue:6591981,cornsilk:16775388,crimson:14423100,cyan:65535,darkblue:139,darkcyan:35723,darkgoldenrod:12092939,darkgray:11119017,darkgreen:25600,darkgrey:11119017,darkkhaki:12433259,darkmagenta:9109643,darkolivegreen:5597999,darkorange:16747520,darkorchid:10040012,darkred:9109504,darksalmon:15308410,darkseagreen:9419919,darkslateblue:4734347,darkslategray:3100495,darkslategrey:3100495,darkturquoise:52945,darkviolet:9699539,deeppink:16716947,deepskyblue:49151,dimgray:6908265,dimgrey:6908265,dodgerblue:2003199,firebrick:11674146,floralwhite:16775920,forestgreen:2263842,fuchsia:16711935,gainsboro:14474460,ghostwhite:16316671,gold:16766720,goldenrod:14329120,gray:8421504,green:32768,greenyellow:11403055,grey:8421504,honeydew:15794160,hotpink:16738740,indianred:13458524,indigo:4915330,ivory:16777200,khaki:15787660,lavender:15132410,lavenderblush:16773365,lawngreen:8190976,lemonchiffon:16775885,lightblue:11393254,lightcoral:15761536,lightcyan:14745599,lightgoldenrodyellow:16448210,lightgray:13882323,lightgreen:9498256,lightgrey:13882323,lightpink:16758465,lightsalmon:16752762,lightseagreen:2142890,lightskyblue:8900346,lightslategray:7833753,lightslategrey:7833753,lightsteelblue:11584734,lightyellow:16777184,lime:65280,limegreen:3329330,linen:16445670,magenta:16711935,maroon:8388608,mediumaquamarine:6737322,mediumblue:205,mediumorchid:12211667,mediumpurple:9662683,mediumseagreen:3978097,mediumslateblue:8087790,mediumspringgreen:64154,mediumturquoise:4772300,mediumvioletred:13047173,midnightblue:1644912,mintcream:16121850,mistyrose:16770273,moccasin:16770229,navajowhite:16768685,navy:128,oldlace:16643558,olive:8421376,olivedrab:7048739,orange:16753920,orangered:16729344,orchid:14315734,palegoldenrod:15657130,palegreen:10025880,paleturquoise:11529966,palevioletred:14381203,papayawhip:16773077,peachpuff:16767673,peru:13468991,pink:16761035,plum:14524637,powderblue:11591910,purple:8388736,rebeccapurple:6697881,red:16711680,rosybrown:12357519,royalblue:4286945,saddlebrown:9127187,salmon:16416882,sandybrown:16032864,seagreen:3050327,seashell:16774638,sienna:10506797,silver:12632256,skyblue:8900331,slateblue:6970061,slategray:7372944,slategrey:7372944,snow:16775930,springgreen:65407,steelblue:4620980,tan:13808780,teal:32896,thistle:14204888,tomato:16737095,turquoise:4251856,violet:15631086,wheat:16113331,white:16777215,whitesmoke:16119285,yellow:16776960,yellowgreen:10145074},Nn={h:0,s:0,l:0},Ts={h:0,s:0,l:0};function Gr(i,e,t){return t<0&&(t+=1),t>1&&(t-=1),t<1/6?i+(e-i)*6*t:t<1/2?e:t<2/3?i+(e-i)*6*(2/3-t):i}class De{constructor(e,t,n){return this.isColor=!0,this.r=1,this.g=1,this.b=1,this.set(e,t,n)}set(e,t,n){if(t===void 0&&n===void 0){const s=e;s&&s.isColor?this.copy(s):typeof s=="number"?this.setHex(s):typeof s=="string"&&this.setStyle(s)}else this.setRGB(e,t,n);return this}setScalar(e){return this.r=e,this.g=e,this.b=e,this}setHex(e,t=ft){return e=Math.floor(e),this.r=(e>>16&255)/255,this.g=(e>>8&255)/255,this.b=(e&255)/255,$e.toWorkingColorSpace(this,t),this}setRGB(e,t,n,s=$e.workingColorSpace){return this.r=e,this.g=t,this.b=n,$e.toWorkingColorSpace(this,s),this}setHSL(e,t,n,s=$e.workingColorSpace){if(e=Cu(e,1),t=It(t,0,1),n=It(n,0,1),t===0)this.r=this.g=this.b=n;else{const r=n<=.5?n*(1+t):n+t-n*t,a=2*n-r;this.r=Gr(a,r,e+1/3),this.g=Gr(a,r,e),this.b=Gr(a,r,e-1/3)}return $e.toWorkingColorSpace(this,s),this}setStyle(e,t=ft){function n(r){r!==void 0&&parseFloat(r)<1&&console.warn("THREE.Color: Alpha component of "+e+" will be ignored.")}let s;if(s=/^(\w+)\(([^\)]*)\)/.exec(e)){let r;const a=s[1],o=s[2];switch(a){case"rgb":case"rgba":if(r=/^\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return n(r[4]),this.setRGB(Math.min(255,parseInt(r[1],10))/255,Math.min(255,parseInt(r[2],10))/255,Math.min(255,parseInt(r[3],10))/255,t);if(r=/^\s*(\d+)\%\s*,\s*(\d+)\%\s*,\s*(\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return n(r[4]),this.setRGB(Math.min(100,parseInt(r[1],10))/100,Math.min(100,parseInt(r[2],10))/100,Math.min(100,parseInt(r[3],10))/100,t);break;case"hsl":case"hsla":if(r=/^\s*(\d*\.?\d+)\s*,\s*(\d*\.?\d+)\%\s*,\s*(\d*\.?\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return n(r[4]),this.setHSL(parseFloat(r[1])/360,parseFloat(r[2])/100,parseFloat(r[3])/100,t);break;default:console.warn("THREE.Color: Unknown color model "+e)}}else if(s=/^\#([A-Fa-f\d]+)$/.exec(e)){const r=s[1],a=r.length;if(a===3)return this.setRGB(parseInt(r.charAt(0),16)/15,parseInt(r.charAt(1),16)/15,parseInt(r.charAt(2),16)/15,t);if(a===6)return this.setHex(parseInt(r,16),t);console.warn("THREE.Color: Invalid hex color "+e)}else if(e&&e.length>0)return this.setColorName(e,t);return this}setColorName(e,t=ft){const n=Ka[e.toLowerCase()];return n!==void 0?this.setHex(n,t):console.warn("THREE.Color: Unknown color "+e),this}clone(){return new this.constructor(this.r,this.g,this.b)}copy(e){return this.r=e.r,this.g=e.g,this.b=e.b,this}copySRGBToLinear(e){return this.r=di(e.r),this.g=di(e.g),this.b=di(e.b),this}copyLinearToSRGB(e){return this.r=Lr(e.r),this.g=Lr(e.g),this.b=Lr(e.b),this}convertSRGBToLinear(){return this.copySRGBToLinear(this),this}convertLinearToSRGB(){return this.copyLinearToSRGB(this),this}getHex(e=ft){return $e.fromWorkingColorSpace(Et.copy(this),e),Math.round(It(Et.r*255,0,255))*65536+Math.round(It(Et.g*255,0,255))*256+Math.round(It(Et.b*255,0,255))}getHexString(e=ft){return("000000"+this.getHex(e).toString(16)).slice(-6)}getHSL(e,t=$e.workingColorSpace){$e.fromWorkingColorSpace(Et.copy(this),t);const n=Et.r,s=Et.g,r=Et.b,a=Math.max(n,s,r),o=Math.min(n,s,r);let c,l;const d=(o+a)/2;if(o===a)c=0,l=0;else{const h=a-o;switch(l=d<=.5?h/(a+o):h/(2-a-o),a){case n:c=(s-r)/h+(s<r?6:0);break;case s:c=(r-n)/h+2;break;case r:c=(n-s)/h+4;break}c/=6}return e.h=c,e.s=l,e.l=d,e}getRGB(e,t=$e.workingColorSpace){return $e.fromWorkingColorSpace(Et.copy(this),t),e.r=Et.r,e.g=Et.g,e.b=Et.b,e}getStyle(e=ft){$e.fromWorkingColorSpace(Et.copy(this),e);const t=Et.r,n=Et.g,s=Et.b;return e!==ft?`color(${e} ${t.toFixed(3)} ${n.toFixed(3)} ${s.toFixed(3)})`:`rgb(${Math.round(t*255)},${Math.round(n*255)},${Math.round(s*255)})`}offsetHSL(e,t,n){return this.getHSL(Nn),this.setHSL(Nn.h+e,Nn.s+t,Nn.l+n)}add(e){return this.r+=e.r,this.g+=e.g,this.b+=e.b,this}addColors(e,t){return this.r=e.r+t.r,this.g=e.g+t.g,this.b=e.b+t.b,this}addScalar(e){return this.r+=e,this.g+=e,this.b+=e,this}sub(e){return this.r=Math.max(0,this.r-e.r),this.g=Math.max(0,this.g-e.g),this.b=Math.max(0,this.b-e.b),this}multiply(e){return this.r*=e.r,this.g*=e.g,this.b*=e.b,this}multiplyScalar(e){return this.r*=e,this.g*=e,this.b*=e,this}lerp(e,t){return this.r+=(e.r-this.r)*t,this.g+=(e.g-this.g)*t,this.b+=(e.b-this.b)*t,this}lerpColors(e,t,n){return this.r=e.r+(t.r-e.r)*n,this.g=e.g+(t.g-e.g)*n,this.b=e.b+(t.b-e.b)*n,this}lerpHSL(e,t){this.getHSL(Nn),e.getHSL(Ts);const n=Ar(Nn.h,Ts.h,t),s=Ar(Nn.s,Ts.s,t),r=Ar(Nn.l,Ts.l,t);return this.setHSL(n,s,r),this}setFromVector3(e){return this.r=e.x,this.g=e.y,this.b=e.z,this}applyMatrix3(e){const t=this.r,n=this.g,s=this.b,r=e.elements;return this.r=r[0]*t+r[3]*n+r[6]*s,this.g=r[1]*t+r[4]*n+r[7]*s,this.b=r[2]*t+r[5]*n+r[8]*s,this}equals(e){return e.r===this.r&&e.g===this.g&&e.b===this.b}fromArray(e,t=0){return this.r=e[t],this.g=e[t+1],this.b=e[t+2],this}toArray(e=[],t=0){return e[t]=this.r,e[t+1]=this.g,e[t+2]=this.b,e}fromBufferAttribute(e,t){return this.r=e.getX(t),this.g=e.getY(t),this.b=e.getZ(t),this}toJSON(){return this.getHex()}*[Symbol.iterator](){yield this.r,yield this.g,yield this.b}}const Et=new De;De.NAMES=Ka;let Wu=0;class Mi extends ui{constructor(){super(),this.isMaterial=!0,Object.defineProperty(this,"id",{value:Wu++}),this.uuid=Wi(),this.name="",this.type="Material",this.blending=ri,this.side=Tn,this.vertexColors=!1,this.opacity=1,this.transparent=!1,this.alphaHash=!1,this.blendSrc=dr,this.blendDst=hr,this.blendEquation=Hn,this.blendSrcAlpha=null,this.blendDstAlpha=null,this.blendEquationAlpha=null,this.blendColor=new De(0,0,0),this.blendAlpha=0,this.depthFunc=os,this.depthTest=!0,this.depthWrite=!0,this.stencilWriteMask=255,this.stencilFunc=Ca,this.stencilRef=0,this.stencilFuncMask=255,this.stencilFail=ci,this.stencilZFail=ci,this.stencilZPass=ci,this.stencilWrite=!1,this.clippingPlanes=null,this.clipIntersection=!1,this.clipShadows=!1,this.shadowSide=null,this.colorWrite=!0,this.precision=null,this.polygonOffset=!1,this.polygonOffsetFactor=0,this.polygonOffsetUnits=0,this.dithering=!1,this.alphaToCoverage=!1,this.premultipliedAlpha=!1,this.forceSinglePass=!1,this.visible=!0,this.toneMapped=!0,this.userData={},this.version=0,this._alphaTest=0}get alphaTest(){return this._alphaTest}set alphaTest(e){this._alphaTest>0!=e>0&&this.version++,this._alphaTest=e}onBuild(){}onBeforeRender(){}onBeforeCompile(){}customProgramCacheKey(){return this.onBeforeCompile.toString()}setValues(e){if(e!==void 0)for(const t in e){const n=e[t];if(n===void 0){console.warn(`THREE.Material: parameter '${t}' has value of undefined.`);continue}const s=this[t];if(s===void 0){console.warn(`THREE.Material: '${t}' is not a property of THREE.${this.type}.`);continue}s&&s.isColor?s.set(n):s&&s.isVector3&&n&&n.isVector3?s.copy(n):this[t]=n}}toJSON(e){const t=e===void 0||typeof e=="string";t&&(e={textures:{},images:{}});const n={metadata:{version:4.6,type:"Material",generator:"Material.toJSON"}};n.uuid=this.uuid,n.type=this.type,this.name!==""&&(n.name=this.name),this.color&&this.color.isColor&&(n.color=this.color.getHex()),this.roughness!==void 0&&(n.roughness=this.roughness),this.metalness!==void 0&&(n.metalness=this.metalness),this.sheen!==void 0&&(n.sheen=this.sheen),this.sheenColor&&this.sheenColor.isColor&&(n.sheenColor=this.sheenColor.getHex()),this.sheenRoughness!==void 0&&(n.sheenRoughness=this.sheenRoughness),this.emissive&&this.emissive.isColor&&(n.emissive=this.emissive.getHex()),this.emissiveIntensity&&this.emissiveIntensity!==1&&(n.emissiveIntensity=this.emissiveIntensity),this.specular&&this.specular.isColor&&(n.specular=this.specular.getHex()),this.specularIntensity!==void 0&&(n.specularIntensity=this.specularIntensity),this.specularColor&&this.specularColor.isColor&&(n.specularColor=this.specularColor.getHex()),this.shininess!==void 0&&(n.shininess=this.shininess),this.clearcoat!==void 0&&(n.clearcoat=this.clearcoat),this.clearcoatRoughness!==void 0&&(n.clearcoatRoughness=this.clearcoatRoughness),this.clearcoatMap&&this.clearcoatMap.isTexture&&(n.clearcoatMap=this.clearcoatMap.toJSON(e).uuid),this.clearcoatRoughnessMap&&this.clearcoatRoughnessMap.isTexture&&(n.clearcoatRoughnessMap=this.clearcoatRoughnessMap.toJSON(e).uuid),this.clearcoatNormalMap&&this.clearcoatNormalMap.isTexture&&(n.clearcoatNormalMap=this.clearcoatNormalMap.toJSON(e).uuid,n.clearcoatNormalScale=this.clearcoatNormalScale.toArray()),this.iridescence!==void 0&&(n.iridescence=this.iridescence),this.iridescenceIOR!==void 0&&(n.iridescenceIOR=this.iridescenceIOR),this.iridescenceThicknessRange!==void 0&&(n.iridescenceThicknessRange=this.iridescenceThicknessRange),this.iridescenceMap&&this.iridescenceMap.isTexture&&(n.iridescenceMap=this.iridescenceMap.toJSON(e).uuid),this.iridescenceThicknessMap&&this.iridescenceThicknessMap.isTexture&&(n.iridescenceThicknessMap=this.iridescenceThicknessMap.toJSON(e).uuid),this.anisotropy!==void 0&&(n.anisotropy=this.anisotropy),this.anisotropyRotation!==void 0&&(n.anisotropyRotation=this.anisotropyRotation),this.anisotropyMap&&this.anisotropyMap.isTexture&&(n.anisotropyMap=this.anisotropyMap.toJSON(e).uuid),this.map&&this.map.isTexture&&(n.map=this.map.toJSON(e).uuid),this.matcap&&this.matcap.isTexture&&(n.matcap=this.matcap.toJSON(e).uuid),this.alphaMap&&this.alphaMap.isTexture&&(n.alphaMap=this.alphaMap.toJSON(e).uuid),this.lightMap&&this.lightMap.isTexture&&(n.lightMap=this.lightMap.toJSON(e).uuid,n.lightMapIntensity=this.lightMapIntensity),this.aoMap&&this.aoMap.isTexture&&(n.aoMap=this.aoMap.toJSON(e).uuid,n.aoMapIntensity=this.aoMapIntensity),this.bumpMap&&this.bumpMap.isTexture&&(n.bumpMap=this.bumpMap.toJSON(e).uuid,n.bumpScale=this.bumpScale),this.normalMap&&this.normalMap.isTexture&&(n.normalMap=this.normalMap.toJSON(e).uuid,n.normalMapType=this.normalMapType,n.normalScale=this.normalScale.toArray()),this.displacementMap&&this.displacementMap.isTexture&&(n.displacementMap=this.displacementMap.toJSON(e).uuid,n.displacementScale=this.displacementScale,n.displacementBias=this.displacementBias),this.roughnessMap&&this.roughnessMap.isTexture&&(n.roughnessMap=this.roughnessMap.toJSON(e).uuid),this.metalnessMap&&this.metalnessMap.isTexture&&(n.metalnessMap=this.metalnessMap.toJSON(e).uuid),this.emissiveMap&&this.emissiveMap.isTexture&&(n.emissiveMap=this.emissiveMap.toJSON(e).uuid),this.specularMap&&this.specularMap.isTexture&&(n.specularMap=this.specularMap.toJSON(e).uuid),this.specularIntensityMap&&this.specularIntensityMap.isTexture&&(n.specularIntensityMap=this.specularIntensityMap.toJSON(e).uuid),this.specularColorMap&&this.specularColorMap.isTexture&&(n.specularColorMap=this.specularColorMap.toJSON(e).uuid),this.envMap&&this.envMap.isTexture&&(n.envMap=this.envMap.toJSON(e).uuid,this.combine!==void 0&&(n.combine=this.combine)),this.envMapIntensity!==void 0&&(n.envMapIntensity=this.envMapIntensity),this.reflectivity!==void 0&&(n.reflectivity=this.reflectivity),this.refractionRatio!==void 0&&(n.refractionRatio=this.refractionRatio),this.gradientMap&&this.gradientMap.isTexture&&(n.gradientMap=this.gradientMap.toJSON(e).uuid),this.transmission!==void 0&&(n.transmission=this.transmission),this.transmissionMap&&this.transmissionMap.isTexture&&(n.transmissionMap=this.transmissionMap.toJSON(e).uuid),this.thickness!==void 0&&(n.thickness=this.thickness),this.thicknessMap&&this.thicknessMap.isTexture&&(n.thicknessMap=this.thicknessMap.toJSON(e).uuid),this.attenuationDistance!==void 0&&this.attenuationDistance!==1/0&&(n.attenuationDistance=this.attenuationDistance),this.attenuationColor!==void 0&&(n.attenuationColor=this.attenuationColor.getHex()),this.size!==void 0&&(n.size=this.size),this.shadowSide!==null&&(n.shadowSide=this.shadowSide),this.sizeAttenuation!==void 0&&(n.sizeAttenuation=this.sizeAttenuation),this.blending!==ri&&(n.blending=this.blending),this.side!==Tn&&(n.side=this.side),this.vertexColors===!0&&(n.vertexColors=!0),this.opacity<1&&(n.opacity=this.opacity),this.transparent===!0&&(n.transparent=!0),this.blendSrc!==dr&&(n.blendSrc=this.blendSrc),this.blendDst!==hr&&(n.blendDst=this.blendDst),this.blendEquation!==Hn&&(n.blendEquation=this.blendEquation),this.blendSrcAlpha!==null&&(n.blendSrcAlpha=this.blendSrcAlpha),this.blendDstAlpha!==null&&(n.blendDstAlpha=this.blendDstAlpha),this.blendEquationAlpha!==null&&(n.blendEquationAlpha=this.blendEquationAlpha),this.blendColor&&this.blendColor.isColor&&(n.blendColor=this.blendColor.getHex()),this.blendAlpha!==0&&(n.blendAlpha=this.blendAlpha),this.depthFunc!==os&&(n.depthFunc=this.depthFunc),this.depthTest===!1&&(n.depthTest=this.depthTest),this.depthWrite===!1&&(n.depthWrite=this.depthWrite),this.colorWrite===!1&&(n.colorWrite=this.colorWrite),this.stencilWriteMask!==255&&(n.stencilWriteMask=this.stencilWriteMask),this.stencilFunc!==Ca&&(n.stencilFunc=this.stencilFunc),this.stencilRef!==0&&(n.stencilRef=this.stencilRef),this.stencilFuncMask!==255&&(n.stencilFuncMask=this.stencilFuncMask),this.stencilFail!==ci&&(n.stencilFail=this.stencilFail),this.stencilZFail!==ci&&(n.stencilZFail=this.stencilZFail),this.stencilZPass!==ci&&(n.stencilZPass=this.stencilZPass),this.stencilWrite===!0&&(n.stencilWrite=this.stencilWrite),this.rotation!==void 0&&this.rotation!==0&&(n.rotation=this.rotation),this.polygonOffset===!0&&(n.polygonOffset=!0),this.polygonOffsetFactor!==0&&(n.polygonOffsetFactor=this.polygonOffsetFactor),this.polygonOffsetUnits!==0&&(n.polygonOffsetUnits=this.polygonOffsetUnits),this.linewidth!==void 0&&this.linewidth!==1&&(n.linewidth=this.linewidth),this.dashSize!==void 0&&(n.dashSize=this.dashSize),this.gapSize!==void 0&&(n.gapSize=this.gapSize),this.scale!==void 0&&(n.scale=this.scale),this.dithering===!0&&(n.dithering=!0),this.alphaTest>0&&(n.alphaTest=this.alphaTest),this.alphaHash===!0&&(n.alphaHash=!0),this.alphaToCoverage===!0&&(n.alphaToCoverage=!0),this.premultipliedAlpha===!0&&(n.premultipliedAlpha=!0),this.forceSinglePass===!0&&(n.forceSinglePass=!0),this.wireframe===!0&&(n.wireframe=!0),this.wireframeLinewidth>1&&(n.wireframeLinewidth=this.wireframeLinewidth),this.wireframeLinecap!=="round"&&(n.wireframeLinecap=this.wireframeLinecap),this.wireframeLinejoin!=="round"&&(n.wireframeLinejoin=this.wireframeLinejoin),this.flatShading===!0&&(n.flatShading=!0),this.visible===!1&&(n.visible=!1),this.toneMapped===!1&&(n.toneMapped=!1),this.fog===!1&&(n.fog=!1),Object.keys(this.userData).length>0&&(n.userData=this.userData);function s(r){const a=[];for(const o in r){const c=r[o];delete c.metadata,a.push(c)}return a}if(t){const r=s(e.textures),a=s(e.images);r.length>0&&(n.textures=r),a.length>0&&(n.images=a)}return n}clone(){return new this.constructor().copy(this)}copy(e){this.name=e.name,this.blending=e.blending,this.side=e.side,this.vertexColors=e.vertexColors,this.opacity=e.opacity,this.transparent=e.transparent,this.blendSrc=e.blendSrc,this.blendDst=e.blendDst,this.blendEquation=e.blendEquation,this.blendSrcAlpha=e.blendSrcAlpha,this.blendDstAlpha=e.blendDstAlpha,this.blendEquationAlpha=e.blendEquationAlpha,this.blendColor.copy(e.blendColor),this.blendAlpha=e.blendAlpha,this.depthFunc=e.depthFunc,this.depthTest=e.depthTest,this.depthWrite=e.depthWrite,this.stencilWriteMask=e.stencilWriteMask,this.stencilFunc=e.stencilFunc,this.stencilRef=e.stencilRef,this.stencilFuncMask=e.stencilFuncMask,this.stencilFail=e.stencilFail,this.stencilZFail=e.stencilZFail,this.stencilZPass=e.stencilZPass,this.stencilWrite=e.stencilWrite;const t=e.clippingPlanes;let n=null;if(t!==null){const s=t.length;n=new Array(s);for(let r=0;r!==s;++r)n[r]=t[r].clone()}return this.clippingPlanes=n,this.clipIntersection=e.clipIntersection,this.clipShadows=e.clipShadows,this.shadowSide=e.shadowSide,this.colorWrite=e.colorWrite,this.precision=e.precision,this.polygonOffset=e.polygonOffset,this.polygonOffsetFactor=e.polygonOffsetFactor,this.polygonOffsetUnits=e.polygonOffsetUnits,this.dithering=e.dithering,this.alphaTest=e.alphaTest,this.alphaHash=e.alphaHash,this.alphaToCoverage=e.alphaToCoverage,this.premultipliedAlpha=e.premultipliedAlpha,this.forceSinglePass=e.forceSinglePass,this.visible=e.visible,this.toneMapped=e.toneMapped,this.userData=JSON.parse(JSON.stringify(e.userData)),this}dispose(){this.dispatchEvent({type:"dispose"})}set needsUpdate(e){e===!0&&this.version++}}class Ja extends Mi{constructor(e){super(),this.isMeshBasicMaterial=!0,this.type="MeshBasicMaterial",this.color=new De(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.combine=jo,this.reflectivity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.specularMap=e.specularMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.combine=e.combine,this.reflectivity=e.reflectivity,this.refractionRatio=e.refractionRatio,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.fog=e.fog,this}}const ct=new U,ws=new qe;class tn{constructor(e,t,n=!1){if(Array.isArray(e))throw new TypeError("THREE.BufferAttribute: array should be a Typed Array.");this.isBufferAttribute=!0,this.name="",this.array=e,this.itemSize=t,this.count=e!==void 0?e.length/t:0,this.normalized=n,this.usage=Pa,this._updateRange={offset:0,count:-1},this.updateRanges=[],this.gpuType=Ln,this.version=0}onUploadCallback(){}set needsUpdate(e){e===!0&&this.version++}get updateRange(){return console.warn("THREE.BufferAttribute: updateRange() is deprecated and will be removed in r169. Use addUpdateRange() instead."),this._updateRange}setUsage(e){return this.usage=e,this}addUpdateRange(e,t){this.updateRanges.push({start:e,count:t})}clearUpdateRanges(){this.updateRanges.length=0}copy(e){return this.name=e.name,this.array=new e.array.constructor(e.array),this.itemSize=e.itemSize,this.count=e.count,this.normalized=e.normalized,this.usage=e.usage,this.gpuType=e.gpuType,this}copyAt(e,t,n){e*=this.itemSize,n*=t.itemSize;for(let s=0,r=this.itemSize;s<r;s++)this.array[e+s]=t.array[n+s];return this}copyArray(e){return this.array.set(e),this}applyMatrix3(e){if(this.itemSize===2)for(let t=0,n=this.count;t<n;t++)ws.fromBufferAttribute(this,t),ws.applyMatrix3(e),this.setXY(t,ws.x,ws.y);else if(this.itemSize===3)for(let t=0,n=this.count;t<n;t++)ct.fromBufferAttribute(this,t),ct.applyMatrix3(e),this.setXYZ(t,ct.x,ct.y,ct.z);return this}applyMatrix4(e){for(let t=0,n=this.count;t<n;t++)ct.fromBufferAttribute(this,t),ct.applyMatrix4(e),this.setXYZ(t,ct.x,ct.y,ct.z);return this}applyNormalMatrix(e){for(let t=0,n=this.count;t<n;t++)ct.fromBufferAttribute(this,t),ct.applyNormalMatrix(e),this.setXYZ(t,ct.x,ct.y,ct.z);return this}transformDirection(e){for(let t=0,n=this.count;t<n;t++)ct.fromBufferAttribute(this,t),ct.transformDirection(e),this.setXYZ(t,ct.x,ct.y,ct.z);return this}set(e,t=0){return this.array.set(e,t),this}getComponent(e,t){let n=this.array[e*this.itemSize+t];return this.normalized&&(n=Xi(n,this.array)),n}setComponent(e,t,n){return this.normalized&&(n=Nt(n,this.array)),this.array[e*this.itemSize+t]=n,this}getX(e){let t=this.array[e*this.itemSize];return this.normalized&&(t=Xi(t,this.array)),t}setX(e,t){return this.normalized&&(t=Nt(t,this.array)),this.array[e*this.itemSize]=t,this}getY(e){let t=this.array[e*this.itemSize+1];return this.normalized&&(t=Xi(t,this.array)),t}setY(e,t){return this.normalized&&(t=Nt(t,this.array)),this.array[e*this.itemSize+1]=t,this}getZ(e){let t=this.array[e*this.itemSize+2];return this.normalized&&(t=Xi(t,this.array)),t}setZ(e,t){return this.normalized&&(t=Nt(t,this.array)),this.array[e*this.itemSize+2]=t,this}getW(e){let t=this.array[e*this.itemSize+3];return this.normalized&&(t=Xi(t,this.array)),t}setW(e,t){return this.normalized&&(t=Nt(t,this.array)),this.array[e*this.itemSize+3]=t,this}setXY(e,t,n){return e*=this.itemSize,this.normalized&&(t=Nt(t,this.array),n=Nt(n,this.array)),this.array[e+0]=t,this.array[e+1]=n,this}setXYZ(e,t,n,s){return e*=this.itemSize,this.normalized&&(t=Nt(t,this.array),n=Nt(n,this.array),s=Nt(s,this.array)),this.array[e+0]=t,this.array[e+1]=n,this.array[e+2]=s,this}setXYZW(e,t,n,s,r){return e*=this.itemSize,this.normalized&&(t=Nt(t,this.array),n=Nt(n,this.array),s=Nt(s,this.array),r=Nt(r,this.array)),this.array[e+0]=t,this.array[e+1]=n,this.array[e+2]=s,this.array[e+3]=r,this}onUpload(e){return this.onUploadCallback=e,this}clone(){return new this.constructor(this.array,this.itemSize).copy(this)}toJSON(){const e={itemSize:this.itemSize,type:this.array.constructor.name,array:Array.from(this.array),normalized:this.normalized};return this.name!==""&&(e.name=this.name),this.usage!==Pa&&(e.usage=this.usage),e}}class Qa extends tn{constructor(e,t,n){super(new Uint16Array(e),t,n)}}class el extends tn{constructor(e,t,n){super(new Uint32Array(e),t,n)}}class en extends tn{constructor(e,t,n){super(new Float32Array(e),t,n)}}let Xu=0;const Xt=new lt,Vr=new mt,yi=new U,Bt=new $i,Qi=new $i,gt=new U;class _n extends ui{constructor(){super(),this.isBufferGeometry=!0,Object.defineProperty(this,"id",{value:Xu++}),this.uuid=Wi(),this.name="",this.type="BufferGeometry",this.index=null,this.attributes={},this.morphAttributes={},this.morphTargetsRelative=!1,this.groups=[],this.boundingBox=null,this.boundingSphere=null,this.drawRange={start:0,count:1/0},this.userData={}}getIndex(){return this.index}setIndex(e){return Array.isArray(e)?this.index=new(Ia(e)?el:Qa)(e,1):this.index=e,this}getAttribute(e){return this.attributes[e]}setAttribute(e,t){return this.attributes[e]=t,this}deleteAttribute(e){return delete this.attributes[e],this}hasAttribute(e){return this.attributes[e]!==void 0}addGroup(e,t,n=0){this.groups.push({start:e,count:t,materialIndex:n})}clearGroups(){this.groups=[]}setDrawRange(e,t){this.drawRange.start=e,this.drawRange.count=t}applyMatrix4(e){const t=this.attributes.position;t!==void 0&&(t.applyMatrix4(e),t.needsUpdate=!0);const n=this.attributes.normal;if(n!==void 0){const r=new He().getNormalMatrix(e);n.applyNormalMatrix(r),n.needsUpdate=!0}const s=this.attributes.tangent;return s!==void 0&&(s.transformDirection(e),s.needsUpdate=!0),this.boundingBox!==null&&this.computeBoundingBox(),this.boundingSphere!==null&&this.computeBoundingSphere(),this}applyQuaternion(e){return Xt.makeRotationFromQuaternion(e),this.applyMatrix4(Xt),this}rotateX(e){return Xt.makeRotationX(e),this.applyMatrix4(Xt),this}rotateY(e){return Xt.makeRotationY(e),this.applyMatrix4(Xt),this}rotateZ(e){return Xt.makeRotationZ(e),this.applyMatrix4(Xt),this}translate(e,t,n){return Xt.makeTranslation(e,t,n),this.applyMatrix4(Xt),this}scale(e,t,n){return Xt.makeScale(e,t,n),this.applyMatrix4(Xt),this}lookAt(e){return Vr.lookAt(e),Vr.updateMatrix(),this.applyMatrix4(Vr.matrix),this}center(){return this.computeBoundingBox(),this.boundingBox.getCenter(yi).negate(),this.translate(yi.x,yi.y,yi.z),this}setFromPoints(e){const t=[];for(let n=0,s=e.length;n<s;n++){const r=e[n];t.push(r.x,r.y,r.z||0)}return this.setAttribute("position",new en(t,3)),this}computeBoundingBox(){this.boundingBox===null&&(this.boundingBox=new $i);const e=this.attributes.position,t=this.morphAttributes.position;if(e&&e.isGLBufferAttribute){console.error('THREE.BufferGeometry.computeBoundingBox(): GLBufferAttribute requires a manual bounding box. Alternatively set "mesh.frustumCulled" to "false".',this),this.boundingBox.set(new U(-1/0,-1/0,-1/0),new U(1/0,1/0,1/0));return}if(e!==void 0){if(this.boundingBox.setFromBufferAttribute(e),t)for(let n=0,s=t.length;n<s;n++){const r=t[n];Bt.setFromBufferAttribute(r),this.morphTargetsRelative?(gt.addVectors(this.boundingBox.min,Bt.min),this.boundingBox.expandByPoint(gt),gt.addVectors(this.boundingBox.max,Bt.max),this.boundingBox.expandByPoint(gt)):(this.boundingBox.expandByPoint(Bt.min),this.boundingBox.expandByPoint(Bt.max))}}else this.boundingBox.makeEmpty();(isNaN(this.boundingBox.min.x)||isNaN(this.boundingBox.min.y)||isNaN(this.boundingBox.min.z))&&console.error('THREE.BufferGeometry.computeBoundingBox(): Computed min/max have NaN values. The "position" attribute is likely to have NaN values.',this)}computeBoundingSphere(){this.boundingSphere===null&&(this.boundingSphere=new xs);const e=this.attributes.position,t=this.morphAttributes.position;if(e&&e.isGLBufferAttribute){console.error('THREE.BufferGeometry.computeBoundingSphere(): GLBufferAttribute requires a manual bounding sphere. Alternatively set "mesh.frustumCulled" to "false".',this),this.boundingSphere.set(new U,1/0);return}if(e){const n=this.boundingSphere.center;if(Bt.setFromBufferAttribute(e),t)for(let r=0,a=t.length;r<a;r++){const o=t[r];Qi.setFromBufferAttribute(o),this.morphTargetsRelative?(gt.addVectors(Bt.min,Qi.min),Bt.expandByPoint(gt),gt.addVectors(Bt.max,Qi.max),Bt.expandByPoint(gt)):(Bt.expandByPoint(Qi.min),Bt.expandByPoint(Qi.max))}Bt.getCenter(n);let s=0;for(let r=0,a=e.count;r<a;r++)gt.fromBufferAttribute(e,r),s=Math.max(s,n.distanceToSquared(gt));if(t)for(let r=0,a=t.length;r<a;r++){const o=t[r],c=this.morphTargetsRelative;for(let l=0,d=o.count;l<d;l++)gt.fromBufferAttribute(o,l),c&&(yi.fromBufferAttribute(e,l),gt.add(yi)),s=Math.max(s,n.distanceToSquared(gt))}this.boundingSphere.radius=Math.sqrt(s),isNaN(this.boundingSphere.radius)&&console.error('THREE.BufferGeometry.computeBoundingSphere(): Computed radius is NaN. The "position" attribute is likely to have NaN values.',this)}}computeTangents(){const e=this.index,t=this.attributes;if(e===null||t.position===void 0||t.normal===void 0||t.uv===void 0){console.error("THREE.BufferGeometry: .computeTangents() failed. Missing required attributes (index, position, normal or uv)");return}const n=e.array,s=t.position.array,r=t.normal.array,a=t.uv.array,o=s.length/3;this.hasAttribute("tangent")===!1&&this.setAttribute("tangent",new tn(new Float32Array(4*o),4));const c=this.getAttribute("tangent").array,l=[],d=[];for(let b=0;b<o;b++)l[b]=new U,d[b]=new U;const h=new U,f=new U,m=new U,g=new qe,_=new qe,p=new qe,u=new U,M=new U;function x(b,k,$){h.fromArray(s,b*3),f.fromArray(s,k*3),m.fromArray(s,$*3),g.fromArray(a,b*2),_.fromArray(a,k*2),p.fromArray(a,$*2),f.sub(h),m.sub(h),_.sub(g),p.sub(g);const se=1/(_.x*p.y-p.x*_.y);isFinite(se)&&(u.copy(f).multiplyScalar(p.y).addScaledVector(m,-_.y).multiplyScalar(se),M.copy(m).multiplyScalar(_.x).addScaledVector(f,-p.x).multiplyScalar(se),l[b].add(u),l[k].add(u),l[$].add(u),d[b].add(M),d[k].add(M),d[$].add(M))}let T=this.groups;T.length===0&&(T=[{start:0,count:n.length}]);for(let b=0,k=T.length;b<k;++b){const $=T[b],se=$.start,L=$.count;for(let z=se,G=se+L;z<G;z+=3)x(n[z+0],n[z+1],n[z+2])}const C=new U,w=new U,A=new U,X=new U;function S(b){A.fromArray(r,b*3),X.copy(A);const k=l[b];C.copy(k),C.sub(A.multiplyScalar(A.dot(k))).normalize(),w.crossVectors(X,k);const se=w.dot(d[b])<0?-1:1;c[b*4]=C.x,c[b*4+1]=C.y,c[b*4+2]=C.z,c[b*4+3]=se}for(let b=0,k=T.length;b<k;++b){const $=T[b],se=$.start,L=$.count;for(let z=se,G=se+L;z<G;z+=3)S(n[z+0]),S(n[z+1]),S(n[z+2])}}computeVertexNormals(){const e=this.index,t=this.getAttribute("position");if(t!==void 0){let n=this.getAttribute("normal");if(n===void 0)n=new tn(new Float32Array(t.count*3),3),this.setAttribute("normal",n);else for(let f=0,m=n.count;f<m;f++)n.setXYZ(f,0,0,0);const s=new U,r=new U,a=new U,o=new U,c=new U,l=new U,d=new U,h=new U;if(e)for(let f=0,m=e.count;f<m;f+=3){const g=e.getX(f+0),_=e.getX(f+1),p=e.getX(f+2);s.fromBufferAttribute(t,g),r.fromBufferAttribute(t,_),a.fromBufferAttribute(t,p),d.subVectors(a,r),h.subVectors(s,r),d.cross(h),o.fromBufferAttribute(n,g),c.fromBufferAttribute(n,_),l.fromBufferAttribute(n,p),o.add(d),c.add(d),l.add(d),n.setXYZ(g,o.x,o.y,o.z),n.setXYZ(_,c.x,c.y,c.z),n.setXYZ(p,l.x,l.y,l.z)}else for(let f=0,m=t.count;f<m;f+=3)s.fromBufferAttribute(t,f+0),r.fromBufferAttribute(t,f+1),a.fromBufferAttribute(t,f+2),d.subVectors(a,r),h.subVectors(s,r),d.cross(h),n.setXYZ(f+0,d.x,d.y,d.z),n.setXYZ(f+1,d.x,d.y,d.z),n.setXYZ(f+2,d.x,d.y,d.z);this.normalizeNormals(),n.needsUpdate=!0}}normalizeNormals(){const e=this.attributes.normal;for(let t=0,n=e.count;t<n;t++)gt.fromBufferAttribute(e,t),gt.normalize(),e.setXYZ(t,gt.x,gt.y,gt.z)}toNonIndexed(){function e(o,c){const l=o.array,d=o.itemSize,h=o.normalized,f=new l.constructor(c.length*d);let m=0,g=0;for(let _=0,p=c.length;_<p;_++){o.isInterleavedBufferAttribute?m=c[_]*o.data.stride+o.offset:m=c[_]*d;for(let u=0;u<d;u++)f[g++]=l[m++]}return new tn(f,d,h)}if(this.index===null)return console.warn("THREE.BufferGeometry.toNonIndexed(): BufferGeometry is already non-indexed."),this;const t=new _n,n=this.index.array,s=this.attributes;for(const o in s){const c=s[o],l=e(c,n);t.setAttribute(o,l)}const r=this.morphAttributes;for(const o in r){const c=[],l=r[o];for(let d=0,h=l.length;d<h;d++){const f=l[d],m=e(f,n);c.push(m)}t.morphAttributes[o]=c}t.morphTargetsRelative=this.morphTargetsRelative;const a=this.groups;for(let o=0,c=a.length;o<c;o++){const l=a[o];t.addGroup(l.start,l.count,l.materialIndex)}return t}toJSON(){const e={metadata:{version:4.6,type:"BufferGeometry",generator:"BufferGeometry.toJSON"}};if(e.uuid=this.uuid,e.type=this.type,this.name!==""&&(e.name=this.name),Object.keys(this.userData).length>0&&(e.userData=this.userData),this.parameters!==void 0){const c=this.parameters;for(const l in c)c[l]!==void 0&&(e[l]=c[l]);return e}e.data={attributes:{}};const t=this.index;t!==null&&(e.data.index={type:t.array.constructor.name,array:Array.prototype.slice.call(t.array)});const n=this.attributes;for(const c in n){const l=n[c];e.data.attributes[c]=l.toJSON(e.data)}const s={};let r=!1;for(const c in this.morphAttributes){const l=this.morphAttributes[c],d=[];for(let h=0,f=l.length;h<f;h++){const m=l[h];d.push(m.toJSON(e.data))}d.length>0&&(s[c]=d,r=!0)}r&&(e.data.morphAttributes=s,e.data.morphTargetsRelative=this.morphTargetsRelative);const a=this.groups;a.length>0&&(e.data.groups=JSON.parse(JSON.stringify(a)));const o=this.boundingSphere;return o!==null&&(e.data.boundingSphere={center:o.center.toArray(),radius:o.radius}),e}clone(){return new this.constructor().copy(this)}copy(e){this.index=null,this.attributes={},this.morphAttributes={},this.groups=[],this.boundingBox=null,this.boundingSphere=null;const t={};this.name=e.name;const n=e.index;n!==null&&this.setIndex(n.clone(t));const s=e.attributes;for(const l in s){const d=s[l];this.setAttribute(l,d.clone(t))}const r=e.morphAttributes;for(const l in r){const d=[],h=r[l];for(let f=0,m=h.length;f<m;f++)d.push(h[f].clone(t));this.morphAttributes[l]=d}this.morphTargetsRelative=e.morphTargetsRelative;const a=e.groups;for(let l=0,d=a.length;l<d;l++){const h=a[l];this.addGroup(h.start,h.count,h.materialIndex)}const o=e.boundingBox;o!==null&&(this.boundingBox=o.clone());const c=e.boundingSphere;return c!==null&&(this.boundingSphere=c.clone()),this.drawRange.start=e.drawRange.start,this.drawRange.count=e.drawRange.count,this.userData=e.userData,this}dispose(){this.dispatchEvent({type:"dispose"})}}const tl=new lt,Yn=new Ga,As=new xs,nl=new U,Si=new U,Ei=new U,bi=new U,Wr=new U,Rs=new U,Cs=new qe,Ls=new qe,Ps=new qe,il=new U,sl=new U,rl=new U,Ds=new U,Us=new U;class jt extends mt{constructor(e=new _n,t=new Ja){super(),this.isMesh=!0,this.type="Mesh",this.geometry=e,this.material=t,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),e.morphTargetInfluences!==void 0&&(this.morphTargetInfluences=e.morphTargetInfluences.slice()),e.morphTargetDictionary!==void 0&&(this.morphTargetDictionary=Object.assign({},e.morphTargetDictionary)),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}updateMorphTargets(){const t=this.geometry.morphAttributes,n=Object.keys(t);if(n.length>0){const s=t[n[0]];if(s!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let r=0,a=s.length;r<a;r++){const o=s[r].name||String(r);this.morphTargetInfluences.push(0),this.morphTargetDictionary[o]=r}}}}getVertexPosition(e,t){const n=this.geometry,s=n.attributes.position,r=n.morphAttributes.position,a=n.morphTargetsRelative;t.fromBufferAttribute(s,e);const o=this.morphTargetInfluences;if(r&&o){Rs.set(0,0,0);for(let c=0,l=r.length;c<l;c++){const d=o[c],h=r[c];d!==0&&(Wr.fromBufferAttribute(h,e),a?Rs.addScaledVector(Wr,d):Rs.addScaledVector(Wr.sub(t),d))}t.add(Rs)}return t}raycast(e,t){const n=this.geometry,s=this.material,r=this.matrixWorld;s!==void 0&&(n.boundingSphere===null&&n.computeBoundingSphere(),As.copy(n.boundingSphere),As.applyMatrix4(r),Yn.copy(e.ray).recast(e.near),!(As.containsPoint(Yn.origin)===!1&&(Yn.intersectSphere(As,nl)===null||Yn.origin.distanceToSquared(nl)>(e.far-e.near)**2))&&(tl.copy(r).invert(),Yn.copy(e.ray).applyMatrix4(tl),!(n.boundingBox!==null&&Yn.intersectsBox(n.boundingBox)===!1)&&this._computeIntersections(e,t,Yn)))}_computeIntersections(e,t,n){let s;const r=this.geometry,a=this.material,o=r.index,c=r.attributes.position,l=r.attributes.uv,d=r.attributes.uv1,h=r.attributes.normal,f=r.groups,m=r.drawRange;if(o!==null)if(Array.isArray(a))for(let g=0,_=f.length;g<_;g++){const p=f[g],u=a[p.materialIndex],M=Math.max(p.start,m.start),x=Math.min(o.count,Math.min(p.start+p.count,m.start+m.count));for(let T=M,C=x;T<C;T+=3){const w=o.getX(T),A=o.getX(T+1),X=o.getX(T+2);s=Is(this,u,e,n,l,d,h,w,A,X),s&&(s.faceIndex=Math.floor(T/3),s.face.materialIndex=p.materialIndex,t.push(s))}}else{const g=Math.max(0,m.start),_=Math.min(o.count,m.start+m.count);for(let p=g,u=_;p<u;p+=3){const M=o.getX(p),x=o.getX(p+1),T=o.getX(p+2);s=Is(this,a,e,n,l,d,h,M,x,T),s&&(s.faceIndex=Math.floor(p/3),t.push(s))}}else if(c!==void 0)if(Array.isArray(a))for(let g=0,_=f.length;g<_;g++){const p=f[g],u=a[p.materialIndex],M=Math.max(p.start,m.start),x=Math.min(c.count,Math.min(p.start+p.count,m.start+m.count));for(let T=M,C=x;T<C;T+=3){const w=T,A=T+1,X=T+2;s=Is(this,u,e,n,l,d,h,w,A,X),s&&(s.faceIndex=Math.floor(T/3),s.face.materialIndex=p.materialIndex,t.push(s))}}else{const g=Math.max(0,m.start),_=Math.min(c.count,m.start+m.count);for(let p=g,u=_;p<u;p+=3){const M=p,x=p+1,T=p+2;s=Is(this,a,e,n,l,d,h,M,x,T),s&&(s.faceIndex=Math.floor(p/3),t.push(s))}}}}function ju(i,e,t,n,s,r,a,o){let c;if(e.side===Ut?c=n.intersectTriangle(a,r,s,!0,o):c=n.intersectTriangle(s,r,a,e.side===Tn,o),c===null)return null;Us.copy(o),Us.applyMatrix4(i.matrixWorld);const l=t.ray.origin.distanceTo(Us);return l<t.near||l>t.far?null:{distance:l,point:Us.clone(),object:i}}function Is(i,e,t,n,s,r,a,o,c,l){i.getVertexPosition(o,Si),i.getVertexPosition(c,Ei),i.getVertexPosition(l,bi);const d=ju(i,e,t,n,Si,Ei,bi,Ds);if(d){s&&(Cs.fromBufferAttribute(s,o),Ls.fromBufferAttribute(s,c),Ps.fromBufferAttribute(s,l),d.uv=Qt.getInterpolation(Ds,Si,Ei,bi,Cs,Ls,Ps,new qe)),r&&(Cs.fromBufferAttribute(r,o),Ls.fromBufferAttribute(r,c),Ps.fromBufferAttribute(r,l),d.uv1=Qt.getInterpolation(Ds,Si,Ei,bi,Cs,Ls,Ps,new qe),d.uv2=d.uv1),a&&(il.fromBufferAttribute(a,o),sl.fromBufferAttribute(a,c),rl.fromBufferAttribute(a,l),d.normal=Qt.getInterpolation(Ds,Si,Ei,bi,il,sl,rl,new U),d.normal.dot(n.direction)>0&&d.normal.multiplyScalar(-1));const h={a:o,b:c,c:l,normal:new U,materialIndex:0};Qt.getNormal(Si,Ei,bi,h.normal),d.face=h}return d}class On extends _n{constructor(e=1,t=1,n=1,s=1,r=1,a=1){super(),this.type="BoxGeometry",this.parameters={width:e,height:t,depth:n,widthSegments:s,heightSegments:r,depthSegments:a};const o=this;s=Math.floor(s),r=Math.floor(r),a=Math.floor(a);const c=[],l=[],d=[],h=[];let f=0,m=0;g("z","y","x",-1,-1,n,t,e,a,r,0),g("z","y","x",1,-1,n,t,-e,a,r,1),g("x","z","y",1,1,e,n,t,s,a,2),g("x","z","y",1,-1,e,n,-t,s,a,3),g("x","y","z",1,-1,e,t,n,s,r,4),g("x","y","z",-1,-1,e,t,-n,s,r,5),this.setIndex(c),this.setAttribute("position",new en(l,3)),this.setAttribute("normal",new en(d,3)),this.setAttribute("uv",new en(h,2));function g(_,p,u,M,x,T,C,w,A,X,S){const b=T/A,k=C/X,$=T/2,se=C/2,L=w/2,z=A+1,G=X+1;let Y=0,V=0;const D=new U;for(let W=0;W<G;W++){const q=W*k-se;for(let le=0;le<z;le++){const H=le*b-$;D[_]=H*M,D[p]=q*x,D[u]=L,l.push(D.x,D.y,D.z),D[_]=0,D[p]=0,D[u]=w>0?1:-1,d.push(D.x,D.y,D.z),h.push(le/A),h.push(1-W/X),Y+=1}}for(let W=0;W<X;W++)for(let q=0;q<A;q++){const le=f+q+z*W,H=f+q+z*(W+1),j=f+(q+1)+z*(W+1),ue=f+(q+1)+z*W;c.push(le,H,ue),c.push(H,j,ue),V+=6}o.addGroup(m,V,S),m+=V,f+=Y}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new On(e.width,e.height,e.depth,e.widthSegments,e.heightSegments,e.depthSegments)}}function Ti(i){const e={};for(const t in i){e[t]={};for(const n in i[t]){const s=i[t][n];s&&(s.isColor||s.isMatrix3||s.isMatrix4||s.isVector2||s.isVector3||s.isVector4||s.isTexture||s.isQuaternion)?s.isRenderTargetTexture?(console.warn("UniformsUtils: Textures of render targets cannot be cloned via cloneUniforms() or mergeUniforms()."),e[t][n]=null):e[t][n]=s.clone():Array.isArray(s)?e[t][n]=s.slice():e[t][n]=s}}return e}function Rt(i){const e={};for(let t=0;t<i.length;t++){const n=Ti(i[t]);for(const s in n)e[s]=n[s]}return e}function qu(i){const e=[];for(let t=0;t<i.length;t++)e.push(i[t].clone());return e}function ol(i){return i.getRenderTarget()===null?i.outputColorSpace:$e.workingColorSpace}const Yu={clone:Ti,merge:Rt};var $u=`void main() {
	gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
}`,Zu=`void main() {
	gl_FragColor = vec4( 1.0, 0.0, 0.0, 1.0 );
}`;class $n extends Mi{constructor(e){super(),this.isShaderMaterial=!0,this.type="ShaderMaterial",this.defines={},this.uniforms={},this.uniformsGroups=[],this.vertexShader=$u,this.fragmentShader=Zu,this.linewidth=1,this.wireframe=!1,this.wireframeLinewidth=1,this.fog=!1,this.lights=!1,this.clipping=!1,this.forceSinglePass=!0,this.extensions={derivatives:!1,fragDepth:!1,drawBuffers:!1,shaderTextureLOD:!1,clipCullDistance:!1},this.defaultAttributeValues={color:[1,1,1],uv:[0,0],uv1:[0,0]},this.index0AttributeName=void 0,this.uniformsNeedUpdate=!1,this.glslVersion=null,e!==void 0&&this.setValues(e)}copy(e){return super.copy(e),this.fragmentShader=e.fragmentShader,this.vertexShader=e.vertexShader,this.uniforms=Ti(e.uniforms),this.uniformsGroups=qu(e.uniformsGroups),this.defines=Object.assign({},e.defines),this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.fog=e.fog,this.lights=e.lights,this.clipping=e.clipping,this.extensions=Object.assign({},e.extensions),this.glslVersion=e.glslVersion,this}toJSON(e){const t=super.toJSON(e);t.glslVersion=this.glslVersion,t.uniforms={};for(const s in this.uniforms){const a=this.uniforms[s].value;a&&a.isTexture?t.uniforms[s]={type:"t",value:a.toJSON(e).uuid}:a&&a.isColor?t.uniforms[s]={type:"c",value:a.getHex()}:a&&a.isVector2?t.uniforms[s]={type:"v2",value:a.toArray()}:a&&a.isVector3?t.uniforms[s]={type:"v3",value:a.toArray()}:a&&a.isVector4?t.uniforms[s]={type:"v4",value:a.toArray()}:a&&a.isMatrix3?t.uniforms[s]={type:"m3",value:a.toArray()}:a&&a.isMatrix4?t.uniforms[s]={type:"m4",value:a.toArray()}:t.uniforms[s]={value:a}}Object.keys(this.defines).length>0&&(t.defines=this.defines),t.vertexShader=this.vertexShader,t.fragmentShader=this.fragmentShader,t.lights=this.lights,t.clipping=this.clipping;const n={};for(const s in this.extensions)this.extensions[s]===!0&&(n[s]=!0);return Object.keys(n).length>0&&(t.extensions=n),t}}class al extends mt{constructor(){super(),this.isCamera=!0,this.type="Camera",this.matrixWorldInverse=new lt,this.projectionMatrix=new lt,this.projectionMatrixInverse=new lt,this.coordinateSystem=dn}copy(e,t){return super.copy(e,t),this.matrixWorldInverse.copy(e.matrixWorldInverse),this.projectionMatrix.copy(e.projectionMatrix),this.projectionMatrixInverse.copy(e.projectionMatrixInverse),this.coordinateSystem=e.coordinateSystem,this}getWorldDirection(e){return super.getWorldDirection(e).negate()}updateMatrixWorld(e){super.updateMatrixWorld(e),this.matrixWorldInverse.copy(this.matrixWorld).invert()}updateWorldMatrix(e,t){super.updateWorldMatrix(e,t),this.matrixWorldInverse.copy(this.matrixWorld).invert()}clone(){return new this.constructor().copy(this)}}class qt extends al{constructor(e=50,t=1,n=.1,s=2e3){super(),this.isPerspectiveCamera=!0,this.type="PerspectiveCamera",this.fov=e,this.zoom=1,this.near=n,this.far=s,this.focus=10,this.aspect=t,this.view=null,this.filmGauge=35,this.filmOffset=0,this.updateProjectionMatrix()}copy(e,t){return super.copy(e,t),this.fov=e.fov,this.zoom=e.zoom,this.near=e.near,this.far=e.far,this.focus=e.focus,this.aspect=e.aspect,this.view=e.view===null?null:Object.assign({},e.view),this.filmGauge=e.filmGauge,this.filmOffset=e.filmOffset,this}setFocalLength(e){const t=.5*this.getFilmHeight()/e;this.fov=wr*2*Math.atan(t),this.updateProjectionMatrix()}getFocalLength(){const e=Math.tan(Tr*.5*this.fov);return .5*this.getFilmHeight()/e}getEffectiveFOV(){return wr*2*Math.atan(Math.tan(Tr*.5*this.fov)/this.zoom)}getFilmWidth(){return this.filmGauge*Math.min(this.aspect,1)}getFilmHeight(){return this.filmGauge/Math.max(this.aspect,1)}setViewOffset(e,t,n,s,r,a){this.aspect=e/t,this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=t,this.view.offsetX=n,this.view.offsetY=s,this.view.width=r,this.view.height=a,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const e=this.near;let t=e*Math.tan(Tr*.5*this.fov)/this.zoom,n=2*t,s=this.aspect*n,r=-.5*s;const a=this.view;if(this.view!==null&&this.view.enabled){const c=a.fullWidth,l=a.fullHeight;r+=a.offsetX*s/c,t-=a.offsetY*n/l,s*=a.width/c,n*=a.height/l}const o=this.filmOffset;o!==0&&(r+=e*o/this.getFilmWidth()),this.projectionMatrix.makePerspective(r,r+s,t,t-n,e,this.far,this.coordinateSystem),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){const t=super.toJSON(e);return t.object.fov=this.fov,t.object.zoom=this.zoom,t.object.near=this.near,t.object.far=this.far,t.object.focus=this.focus,t.object.aspect=this.aspect,this.view!==null&&(t.object.view=Object.assign({},this.view)),t.object.filmGauge=this.filmGauge,t.object.filmOffset=this.filmOffset,t}}const wi=-90,Ai=1;class Ku extends mt{constructor(e,t,n){super(),this.type="CubeCamera",this.renderTarget=n,this.coordinateSystem=null,this.activeMipmapLevel=0;const s=new qt(wi,Ai,e,t);s.layers=this.layers,this.add(s);const r=new qt(wi,Ai,e,t);r.layers=this.layers,this.add(r);const a=new qt(wi,Ai,e,t);a.layers=this.layers,this.add(a);const o=new qt(wi,Ai,e,t);o.layers=this.layers,this.add(o);const c=new qt(wi,Ai,e,t);c.layers=this.layers,this.add(c);const l=new qt(wi,Ai,e,t);l.layers=this.layers,this.add(l)}updateCoordinateSystem(){const e=this.coordinateSystem,t=this.children.concat(),[n,s,r,a,o,c]=t;for(const l of t)this.remove(l);if(e===dn)n.up.set(0,1,0),n.lookAt(1,0,0),s.up.set(0,1,0),s.lookAt(-1,0,0),r.up.set(0,0,-1),r.lookAt(0,1,0),a.up.set(0,0,1),a.lookAt(0,-1,0),o.up.set(0,1,0),o.lookAt(0,0,1),c.up.set(0,1,0),c.lookAt(0,0,-1);else if(e===fs)n.up.set(0,-1,0),n.lookAt(-1,0,0),s.up.set(0,-1,0),s.lookAt(1,0,0),r.up.set(0,0,1),r.lookAt(0,1,0),a.up.set(0,0,-1),a.lookAt(0,-1,0),o.up.set(0,-1,0),o.lookAt(0,0,1),c.up.set(0,-1,0),c.lookAt(0,0,-1);else throw new Error("THREE.CubeCamera.updateCoordinateSystem(): Invalid coordinate system: "+e);for(const l of t)this.add(l),l.updateMatrixWorld()}update(e,t){this.parent===null&&this.updateMatrixWorld();const{renderTarget:n,activeMipmapLevel:s}=this;this.coordinateSystem!==e.coordinateSystem&&(this.coordinateSystem=e.coordinateSystem,this.updateCoordinateSystem());const[r,a,o,c,l,d]=this.children,h=e.getRenderTarget(),f=e.getActiveCubeFace(),m=e.getActiveMipmapLevel(),g=e.xr.enabled;e.xr.enabled=!1;const _=n.texture.generateMipmaps;n.texture.generateMipmaps=!1,e.setRenderTarget(n,0,s),e.render(t,r),e.setRenderTarget(n,1,s),e.render(t,a),e.setRenderTarget(n,2,s),e.render(t,o),e.setRenderTarget(n,3,s),e.render(t,c),e.setRenderTarget(n,4,s),e.render(t,l),n.texture.generateMipmaps=_,e.setRenderTarget(n,5,s),e.render(t,d),e.setRenderTarget(h,f,m),e.xr.enabled=g,n.texture.needsPMREMUpdate=!0}}class ll extends At{constructor(e,t,n,s,r,a,o,c,l,d){e=e!==void 0?e:[],t=t!==void 0?t:oi,super(e,t,n,s,r,a,o,c,l,d),this.isCubeTexture=!0,this.flipY=!1}get images(){return this.image}set images(e){this.image=e}}class Ju extends Xn{constructor(e=1,t={}){super(e,e,t),this.isWebGLCubeRenderTarget=!0;const n={width:e,height:e,depth:1},s=[n,n,n,n,n,n];t.encoding!==void 0&&(qi("THREE.WebGLCubeRenderTarget: option.encoding has been replaced by option.colorSpace."),t.colorSpace=t.encoding===Wn?ft:Wt),this.texture=new ll(s,t.mapping,t.wrapS,t.wrapT,t.magFilter,t.minFilter,t.format,t.type,t.anisotropy,t.colorSpace),this.texture.isRenderTargetTexture=!0,this.texture.generateMipmaps=t.generateMipmaps!==void 0?t.generateMipmaps:!1,this.texture.minFilter=t.minFilter!==void 0?t.minFilter:Vt}fromEquirectangularTexture(e,t){this.texture.type=t.type,this.texture.colorSpace=t.colorSpace,this.texture.generateMipmaps=t.generateMipmaps,this.texture.minFilter=t.minFilter,this.texture.magFilter=t.magFilter;const n={uniforms:{tEquirect:{value:null}},vertexShader:`

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
			`},s=new On(5,5,5),r=new $n({name:"CubemapFromEquirect",uniforms:Ti(n.uniforms),vertexShader:n.vertexShader,fragmentShader:n.fragmentShader,side:Ut,blending:wn});r.uniforms.tEquirect.value=t;const a=new jt(s,r),o=t.minFilter;return t.minFilter===Gi&&(t.minFilter=Vt),new Ku(1,10,this).update(e,a),t.minFilter=o,a.geometry.dispose(),a.material.dispose(),this}clear(e,t,n,s){const r=e.getRenderTarget();for(let a=0;a<6;a++)e.setRenderTarget(this,a),e.clear(t,n,s);e.setRenderTarget(r)}}const Xr=new U,Qu=new U,ed=new He;class Zn{constructor(e=new U(1,0,0),t=0){this.isPlane=!0,this.normal=e,this.constant=t}set(e,t){return this.normal.copy(e),this.constant=t,this}setComponents(e,t,n,s){return this.normal.set(e,t,n),this.constant=s,this}setFromNormalAndCoplanarPoint(e,t){return this.normal.copy(e),this.constant=-t.dot(this.normal),this}setFromCoplanarPoints(e,t,n){const s=Xr.subVectors(n,t).cross(Qu.subVectors(e,t)).normalize();return this.setFromNormalAndCoplanarPoint(s,e),this}copy(e){return this.normal.copy(e.normal),this.constant=e.constant,this}normalize(){const e=1/this.normal.length();return this.normal.multiplyScalar(e),this.constant*=e,this}negate(){return this.constant*=-1,this.normal.negate(),this}distanceToPoint(e){return this.normal.dot(e)+this.constant}distanceToSphere(e){return this.distanceToPoint(e.center)-e.radius}projectPoint(e,t){return t.copy(e).addScaledVector(this.normal,-this.distanceToPoint(e))}intersectLine(e,t){const n=e.delta(Xr),s=this.normal.dot(n);if(s===0)return this.distanceToPoint(e.start)===0?t.copy(e.start):null;const r=-(e.start.dot(this.normal)+this.constant)/s;return r<0||r>1?null:t.copy(e.start).addScaledVector(n,r)}intersectsLine(e){const t=this.distanceToPoint(e.start),n=this.distanceToPoint(e.end);return t<0&&n>0||n<0&&t>0}intersectsBox(e){return e.intersectsPlane(this)}intersectsSphere(e){return e.intersectsPlane(this)}coplanarPoint(e){return e.copy(this.normal).multiplyScalar(-this.constant)}applyMatrix4(e,t){const n=t||ed.getNormalMatrix(e),s=this.coplanarPoint(Xr).applyMatrix4(e),r=this.normal.applyMatrix3(n).normalize();return this.constant=-s.dot(r),this}translate(e){return this.constant-=e.dot(this.normal),this}equals(e){return e.normal.equals(this.normal)&&e.constant===this.constant}clone(){return new this.constructor().copy(this)}}const Kn=new xs,Ns=new U;class jr{constructor(e=new Zn,t=new Zn,n=new Zn,s=new Zn,r=new Zn,a=new Zn){this.planes=[e,t,n,s,r,a]}set(e,t,n,s,r,a){const o=this.planes;return o[0].copy(e),o[1].copy(t),o[2].copy(n),o[3].copy(s),o[4].copy(r),o[5].copy(a),this}copy(e){const t=this.planes;for(let n=0;n<6;n++)t[n].copy(e.planes[n]);return this}setFromProjectionMatrix(e,t=dn){const n=this.planes,s=e.elements,r=s[0],a=s[1],o=s[2],c=s[3],l=s[4],d=s[5],h=s[6],f=s[7],m=s[8],g=s[9],_=s[10],p=s[11],u=s[12],M=s[13],x=s[14],T=s[15];if(n[0].setComponents(c-r,f-l,p-m,T-u).normalize(),n[1].setComponents(c+r,f+l,p+m,T+u).normalize(),n[2].setComponents(c+a,f+d,p+g,T+M).normalize(),n[3].setComponents(c-a,f-d,p-g,T-M).normalize(),n[4].setComponents(c-o,f-h,p-_,T-x).normalize(),t===dn)n[5].setComponents(c+o,f+h,p+_,T+x).normalize();else if(t===fs)n[5].setComponents(o,h,_,x).normalize();else throw new Error("THREE.Frustum.setFromProjectionMatrix(): Invalid coordinate system: "+t);return this}intersectsObject(e){if(e.boundingSphere!==void 0)e.boundingSphere===null&&e.computeBoundingSphere(),Kn.copy(e.boundingSphere).applyMatrix4(e.matrixWorld);else{const t=e.geometry;t.boundingSphere===null&&t.computeBoundingSphere(),Kn.copy(t.boundingSphere).applyMatrix4(e.matrixWorld)}return this.intersectsSphere(Kn)}intersectsSprite(e){return Kn.center.set(0,0,0),Kn.radius=.7071067811865476,Kn.applyMatrix4(e.matrixWorld),this.intersectsSphere(Kn)}intersectsSphere(e){const t=this.planes,n=e.center,s=-e.radius;for(let r=0;r<6;r++)if(t[r].distanceToPoint(n)<s)return!1;return!0}intersectsBox(e){const t=this.planes;for(let n=0;n<6;n++){const s=t[n];if(Ns.x=s.normal.x>0?e.max.x:e.min.x,Ns.y=s.normal.y>0?e.max.y:e.min.y,Ns.z=s.normal.z>0?e.max.z:e.min.z,s.distanceToPoint(Ns)<0)return!1}return!0}containsPoint(e){const t=this.planes;for(let n=0;n<6;n++)if(t[n].distanceToPoint(e)<0)return!1;return!0}clone(){return new this.constructor().copy(this)}}function cl(){let i=null,e=!1,t=null,n=null;function s(r,a){t(r,a),n=i.requestAnimationFrame(s)}return{start:function(){e!==!0&&t!==null&&(n=i.requestAnimationFrame(s),e=!0)},stop:function(){i.cancelAnimationFrame(n),e=!1},setAnimationLoop:function(r){t=r},setContext:function(r){i=r}}}function td(i,e){const t=e.isWebGL2,n=new WeakMap;function s(l,d){const h=l.array,f=l.usage,m=h.byteLength,g=i.createBuffer();i.bindBuffer(d,g),i.bufferData(d,h,f),l.onUploadCallback();let _;if(h instanceof Float32Array)_=i.FLOAT;else if(h instanceof Uint16Array)if(l.isFloat16BufferAttribute)if(t)_=i.HALF_FLOAT;else throw new Error("THREE.WebGLAttributes: Usage of Float16BufferAttribute requires WebGL2.");else _=i.UNSIGNED_SHORT;else if(h instanceof Int16Array)_=i.SHORT;else if(h instanceof Uint32Array)_=i.UNSIGNED_INT;else if(h instanceof Int32Array)_=i.INT;else if(h instanceof Int8Array)_=i.BYTE;else if(h instanceof Uint8Array)_=i.UNSIGNED_BYTE;else if(h instanceof Uint8ClampedArray)_=i.UNSIGNED_BYTE;else throw new Error("THREE.WebGLAttributes: Unsupported buffer data format: "+h);return{buffer:g,type:_,bytesPerElement:h.BYTES_PER_ELEMENT,version:l.version,size:m}}function r(l,d,h){const f=d.array,m=d._updateRange,g=d.updateRanges;if(i.bindBuffer(h,l),m.count===-1&&g.length===0&&i.bufferSubData(h,0,f),g.length!==0){for(let _=0,p=g.length;_<p;_++){const u=g[_];t?i.bufferSubData(h,u.start*f.BYTES_PER_ELEMENT,f,u.start,u.count):i.bufferSubData(h,u.start*f.BYTES_PER_ELEMENT,f.subarray(u.start,u.start+u.count))}d.clearUpdateRanges()}m.count!==-1&&(t?i.bufferSubData(h,m.offset*f.BYTES_PER_ELEMENT,f,m.offset,m.count):i.bufferSubData(h,m.offset*f.BYTES_PER_ELEMENT,f.subarray(m.offset,m.offset+m.count)),m.count=-1),d.onUploadCallback()}function a(l){return l.isInterleavedBufferAttribute&&(l=l.data),n.get(l)}function o(l){l.isInterleavedBufferAttribute&&(l=l.data);const d=n.get(l);d&&(i.deleteBuffer(d.buffer),n.delete(l))}function c(l,d){if(l.isGLBufferAttribute){const f=n.get(l);(!f||f.version<l.version)&&n.set(l,{buffer:l.buffer,type:l.type,bytesPerElement:l.elementSize,version:l.version});return}l.isInterleavedBufferAttribute&&(l=l.data);const h=n.get(l);if(h===void 0)n.set(l,s(l,d));else if(h.version<l.version){if(h.size!==l.array.byteLength)throw new Error("THREE.WebGLAttributes: The size of the buffer attribute's array buffer does not match the original size. Resizing buffer attributes is not supported.");r(h.buffer,l,d),h.version=l.version}}return{get:a,remove:o,update:c}}class Os extends _n{constructor(e=1,t=1,n=1,s=1){super(),this.type="PlaneGeometry",this.parameters={width:e,height:t,widthSegments:n,heightSegments:s};const r=e/2,a=t/2,o=Math.floor(n),c=Math.floor(s),l=o+1,d=c+1,h=e/o,f=t/c,m=[],g=[],_=[],p=[];for(let u=0;u<d;u++){const M=u*f-a;for(let x=0;x<l;x++){const T=x*h-r;g.push(T,-M,0),_.push(0,0,1),p.push(x/o),p.push(1-u/c)}}for(let u=0;u<c;u++)for(let M=0;M<o;M++){const x=M+l*u,T=M+l*(u+1),C=M+1+l*(u+1),w=M+1+l*u;m.push(x,T,w),m.push(T,C,w)}this.setIndex(m),this.setAttribute("position",new en(g,3)),this.setAttribute("normal",new en(_,3)),this.setAttribute("uv",new en(p,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new Os(e.width,e.height,e.widthSegments,e.heightSegments)}}var nd=`#ifdef USE_ALPHAHASH
	if ( diffuseColor.a < getAlphaHashThreshold( vPosition ) ) discard;
#endif`,id=`#ifdef USE_ALPHAHASH
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
#endif`,sd=`#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, vAlphaMapUv ).g;
#endif`,rd=`#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,od=`#ifdef USE_ALPHATEST
	if ( diffuseColor.a < alphaTest ) discard;
#endif`,ad=`#ifdef USE_ALPHATEST
	uniform float alphaTest;
#endif`,ld=`#ifdef USE_AOMAP
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
#endif`,cd=`#ifdef USE_AOMAP
	uniform sampler2D aoMap;
	uniform float aoMapIntensity;
#endif`,ud=`#ifdef USE_BATCHING
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
#endif`,dd=`#ifdef USE_BATCHING
	mat4 batchingMatrix = getBatchingMatrix( batchId );
#endif`,hd=`vec3 transformed = vec3( position );
#ifdef USE_ALPHAHASH
	vPosition = vec3( position );
#endif`,fd=`vec3 objectNormal = vec3( normal );
#ifdef USE_TANGENT
	vec3 objectTangent = vec3( tangent.xyz );
#endif`,pd=`float G_BlinnPhong_Implicit( ) {
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
} // validated`,md=`#ifdef USE_IRIDESCENCE
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
#endif`,gd=`#ifdef USE_BUMPMAP
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
#endif`,_d=`#if NUM_CLIPPING_PLANES > 0
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
#endif`,xd=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
	uniform vec4 clippingPlanes[ NUM_CLIPPING_PLANES ];
#endif`,vd=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
#endif`,Md=`#if NUM_CLIPPING_PLANES > 0
	vClipPosition = - mvPosition.xyz;
#endif`,yd=`#if defined( USE_COLOR_ALPHA )
	diffuseColor *= vColor;
#elif defined( USE_COLOR )
	diffuseColor.rgb *= vColor;
#endif`,Sd=`#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR )
	varying vec3 vColor;
#endif`,Ed=`#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR ) || defined( USE_INSTANCING_COLOR )
	varying vec3 vColor;
#endif`,bd=`#if defined( USE_COLOR_ALPHA )
	vColor = vec4( 1.0 );
#elif defined( USE_COLOR ) || defined( USE_INSTANCING_COLOR )
	vColor = vec3( 1.0 );
#endif
#ifdef USE_COLOR
	vColor *= color;
#endif
#ifdef USE_INSTANCING_COLOR
	vColor.xyz *= instanceColor.xyz;
#endif`,Td=`#define PI 3.141592653589793
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
} // validated`,wd=`#ifdef ENVMAP_TYPE_CUBE_UV
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
#endif`,Ad=`vec3 transformedNormal = objectNormal;
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
#endif`,Rd=`#ifdef USE_DISPLACEMENTMAP
	uniform sampler2D displacementMap;
	uniform float displacementScale;
	uniform float displacementBias;
#endif`,Cd=`#ifdef USE_DISPLACEMENTMAP
	transformed += normalize( objectNormal ) * ( texture2D( displacementMap, vDisplacementMapUv ).x * displacementScale + displacementBias );
#endif`,Ld=`#ifdef USE_EMISSIVEMAP
	vec4 emissiveColor = texture2D( emissiveMap, vEmissiveMapUv );
	totalEmissiveRadiance *= emissiveColor.rgb;
#endif`,Pd=`#ifdef USE_EMISSIVEMAP
	uniform sampler2D emissiveMap;
#endif`,Dd="gl_FragColor = linearToOutputTexel( gl_FragColor );",Ud=`
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
}`,Id=`#ifdef USE_ENVMAP
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
#endif`,Nd=`#ifdef USE_ENVMAP
	uniform float envMapIntensity;
	uniform float flipEnvMap;
	#ifdef ENVMAP_TYPE_CUBE
		uniform samplerCube envMap;
	#else
		uniform sampler2D envMap;
	#endif
	
#endif`,Od=`#ifdef USE_ENVMAP
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
#endif`,Fd=`#ifdef USE_ENVMAP
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		
		varying vec3 vWorldPosition;
	#else
		varying vec3 vReflect;
		uniform float refractionRatio;
	#endif
#endif`,zd=`#ifdef USE_ENVMAP
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
#endif`,Bd=`#ifdef USE_FOG
	vFogDepth = - mvPosition.z;
#endif`,kd=`#ifdef USE_FOG
	varying float vFogDepth;
#endif`,Hd=`#ifdef USE_FOG
	#ifdef FOG_EXP2
		float fogFactor = 1.0 - exp( - fogDensity * fogDensity * vFogDepth * vFogDepth );
	#else
		float fogFactor = smoothstep( fogNear, fogFar, vFogDepth );
	#endif
	gl_FragColor.rgb = mix( gl_FragColor.rgb, fogColor, fogFactor );
#endif`,Gd=`#ifdef USE_FOG
	uniform vec3 fogColor;
	varying float vFogDepth;
	#ifdef FOG_EXP2
		uniform float fogDensity;
	#else
		uniform float fogNear;
		uniform float fogFar;
	#endif
#endif`,Vd=`#ifdef USE_GRADIENTMAP
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
}`,Wd=`#ifdef USE_LIGHTMAP
	vec4 lightMapTexel = texture2D( lightMap, vLightMapUv );
	vec3 lightMapIrradiance = lightMapTexel.rgb * lightMapIntensity;
	reflectedLight.indirectDiffuse += lightMapIrradiance;
#endif`,Xd=`#ifdef USE_LIGHTMAP
	uniform sampler2D lightMap;
	uniform float lightMapIntensity;
#endif`,jd=`LambertMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularStrength = specularStrength;`,qd=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Lambert`,Yd=`uniform bool receiveShadow;
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
#endif`,$d=`#ifdef USE_ENVMAP
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
#endif`,Zd=`ToonMaterial material;
material.diffuseColor = diffuseColor.rgb;`,Kd=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Toon`,Jd=`BlinnPhongMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularColor = specular;
material.specularShininess = shininess;
material.specularStrength = specularStrength;`,Qd=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_BlinnPhong`,eh=`PhysicalMaterial material;
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
#endif`,th=`struct PhysicalMaterial {
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
}`,nh=`
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
#endif`,ih=`#if defined( RE_IndirectDiffuse )
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
#endif`,sh=`#if defined( RE_IndirectDiffuse )
	RE_IndirectDiffuse( irradiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif
#if defined( RE_IndirectSpecular )
	RE_IndirectSpecular( radiance, iblIrradiance, clearcoatRadiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif`,rh=`#if defined( USE_LOGDEPTHBUF ) && defined( USE_LOGDEPTHBUF_EXT )
	gl_FragDepthEXT = vIsPerspective == 0.0 ? gl_FragCoord.z : log2( vFragDepth ) * logDepthBufFC * 0.5;
#endif`,oh=`#if defined( USE_LOGDEPTHBUF ) && defined( USE_LOGDEPTHBUF_EXT )
	uniform float logDepthBufFC;
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,ah=`#ifdef USE_LOGDEPTHBUF
	#ifdef USE_LOGDEPTHBUF_EXT
		varying float vFragDepth;
		varying float vIsPerspective;
	#else
		uniform float logDepthBufFC;
	#endif
#endif`,lh=`#ifdef USE_LOGDEPTHBUF
	#ifdef USE_LOGDEPTHBUF_EXT
		vFragDepth = 1.0 + gl_Position.w;
		vIsPerspective = float( isPerspectiveMatrix( projectionMatrix ) );
	#else
		if ( isPerspectiveMatrix( projectionMatrix ) ) {
			gl_Position.z = log2( max( EPSILON, gl_Position.w + 1.0 ) ) * logDepthBufFC - 1.0;
			gl_Position.z *= gl_Position.w;
		}
	#endif
#endif`,ch=`#ifdef USE_MAP
	vec4 sampledDiffuseColor = texture2D( map, vMapUv );
	#ifdef DECODE_VIDEO_TEXTURE
		sampledDiffuseColor = vec4( mix( pow( sampledDiffuseColor.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), sampledDiffuseColor.rgb * 0.0773993808, vec3( lessThanEqual( sampledDiffuseColor.rgb, vec3( 0.04045 ) ) ) ), sampledDiffuseColor.w );
	
	#endif
	diffuseColor *= sampledDiffuseColor;
#endif`,uh=`#ifdef USE_MAP
	uniform sampler2D map;
#endif`,dh=`#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
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
#endif`,hh=`#if defined( USE_POINTS_UV )
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
#endif`,fh=`float metalnessFactor = metalness;
#ifdef USE_METALNESSMAP
	vec4 texelMetalness = texture2D( metalnessMap, vMetalnessMapUv );
	metalnessFactor *= texelMetalness.b;
#endif`,ph=`#ifdef USE_METALNESSMAP
	uniform sampler2D metalnessMap;
#endif`,mh=`#if defined( USE_MORPHCOLORS ) && defined( MORPHTARGETS_TEXTURE )
	vColor *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		#if defined( USE_COLOR_ALPHA )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ) * morphTargetInfluences[ i ];
		#elif defined( USE_COLOR )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ).rgb * morphTargetInfluences[ i ];
		#endif
	}
#endif`,gh=`#ifdef USE_MORPHNORMALS
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
#endif`,_h=`#ifdef USE_MORPHTARGETS
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
#endif`,xh=`#ifdef USE_MORPHTARGETS
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
#endif`,vh=`float faceDirection = gl_FrontFacing ? 1.0 : - 1.0;
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
vec3 nonPerturbedNormal = normal;`,Mh=`#ifdef USE_NORMALMAP_OBJECTSPACE
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
#endif`,yh=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,Sh=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,Eh=`#ifndef FLAT_SHADED
	vNormal = normalize( transformedNormal );
	#ifdef USE_TANGENT
		vTangent = normalize( transformedTangent );
		vBitangent = normalize( cross( vNormal, vTangent ) * tangent.w );
	#endif
#endif`,bh=`#ifdef USE_NORMALMAP
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
#endif`,Th=`#ifdef USE_CLEARCOAT
	vec3 clearcoatNormal = nonPerturbedNormal;
#endif`,wh=`#ifdef USE_CLEARCOAT_NORMALMAP
	vec3 clearcoatMapN = texture2D( clearcoatNormalMap, vClearcoatNormalMapUv ).xyz * 2.0 - 1.0;
	clearcoatMapN.xy *= clearcoatNormalScale;
	clearcoatNormal = normalize( tbn2 * clearcoatMapN );
#endif`,Ah=`#ifdef USE_CLEARCOATMAP
	uniform sampler2D clearcoatMap;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform sampler2D clearcoatNormalMap;
	uniform vec2 clearcoatNormalScale;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform sampler2D clearcoatRoughnessMap;
#endif`,Rh=`#ifdef USE_IRIDESCENCEMAP
	uniform sampler2D iridescenceMap;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform sampler2D iridescenceThicknessMap;
#endif`,Ch=`#ifdef OPAQUE
diffuseColor.a = 1.0;
#endif
#ifdef USE_TRANSMISSION
diffuseColor.a *= material.transmissionAlpha;
#endif
gl_FragColor = vec4( outgoingLight, diffuseColor.a );`,Lh=`vec3 packNormalToRGB( const in vec3 normal ) {
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
}`,Ph=`#ifdef PREMULTIPLIED_ALPHA
	gl_FragColor.rgb *= gl_FragColor.a;
#endif`,Dh=`vec4 mvPosition = vec4( transformed, 1.0 );
#ifdef USE_BATCHING
	mvPosition = batchingMatrix * mvPosition;
#endif
#ifdef USE_INSTANCING
	mvPosition = instanceMatrix * mvPosition;
#endif
mvPosition = modelViewMatrix * mvPosition;
gl_Position = projectionMatrix * mvPosition;`,Uh=`#ifdef DITHERING
	gl_FragColor.rgb = dithering( gl_FragColor.rgb );
#endif`,Ih=`#ifdef DITHERING
	vec3 dithering( vec3 color ) {
		float grid_position = rand( gl_FragCoord.xy );
		vec3 dither_shift_RGB = vec3( 0.25 / 255.0, -0.25 / 255.0, 0.25 / 255.0 );
		dither_shift_RGB = mix( 2.0 * dither_shift_RGB, -2.0 * dither_shift_RGB, grid_position );
		return color + dither_shift_RGB;
	}
#endif`,Nh=`float roughnessFactor = roughness;
#ifdef USE_ROUGHNESSMAP
	vec4 texelRoughness = texture2D( roughnessMap, vRoughnessMapUv );
	roughnessFactor *= texelRoughness.g;
#endif`,Oh=`#ifdef USE_ROUGHNESSMAP
	uniform sampler2D roughnessMap;
#endif`,Fh=`#if NUM_SPOT_LIGHT_COORDS > 0
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
#endif`,zh=`#if NUM_SPOT_LIGHT_COORDS > 0
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
#endif`,Bh=`#if ( defined( USE_SHADOWMAP ) && ( NUM_DIR_LIGHT_SHADOWS > 0 || NUM_POINT_LIGHT_SHADOWS > 0 ) ) || ( NUM_SPOT_LIGHT_COORDS > 0 )
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
#endif`,kh=`float getShadowMask() {
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
}`,Hh=`#ifdef USE_SKINNING
	mat4 boneMatX = getBoneMatrix( skinIndex.x );
	mat4 boneMatY = getBoneMatrix( skinIndex.y );
	mat4 boneMatZ = getBoneMatrix( skinIndex.z );
	mat4 boneMatW = getBoneMatrix( skinIndex.w );
#endif`,Gh=`#ifdef USE_SKINNING
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
#endif`,Vh=`#ifdef USE_SKINNING
	vec4 skinVertex = bindMatrix * vec4( transformed, 1.0 );
	vec4 skinned = vec4( 0.0 );
	skinned += boneMatX * skinVertex * skinWeight.x;
	skinned += boneMatY * skinVertex * skinWeight.y;
	skinned += boneMatZ * skinVertex * skinWeight.z;
	skinned += boneMatW * skinVertex * skinWeight.w;
	transformed = ( bindMatrixInverse * skinned ).xyz;
#endif`,Wh=`#ifdef USE_SKINNING
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
#endif`,Xh=`float specularStrength;
#ifdef USE_SPECULARMAP
	vec4 texelSpecular = texture2D( specularMap, vSpecularMapUv );
	specularStrength = texelSpecular.r;
#else
	specularStrength = 1.0;
#endif`,jh=`#ifdef USE_SPECULARMAP
	uniform sampler2D specularMap;
#endif`,qh=`#if defined( TONE_MAPPING )
	gl_FragColor.rgb = toneMapping( gl_FragColor.rgb );
#endif`,Yh=`#ifndef saturate
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
vec3 CustomToneMapping( vec3 color ) { return color; }`,$h=`#ifdef USE_TRANSMISSION
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
#endif`,Zh=`#ifdef USE_TRANSMISSION
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
#endif`,Kh=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,Jh=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,Qh=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,ef=`#if defined( USE_ENVMAP ) || defined( DISTANCE ) || defined ( USE_SHADOWMAP ) || defined ( USE_TRANSMISSION ) || NUM_SPOT_LIGHT_COORDS > 0
	vec4 worldPosition = vec4( transformed, 1.0 );
	#ifdef USE_BATCHING
		worldPosition = batchingMatrix * worldPosition;
	#endif
	#ifdef USE_INSTANCING
		worldPosition = instanceMatrix * worldPosition;
	#endif
	worldPosition = modelMatrix * worldPosition;
#endif`;const Ne={alphahash_fragment:nd,alphahash_pars_fragment:id,alphamap_fragment:sd,alphamap_pars_fragment:rd,alphatest_fragment:od,alphatest_pars_fragment:ad,aomap_fragment:ld,aomap_pars_fragment:cd,batching_pars_vertex:ud,batching_vertex:dd,begin_vertex:hd,beginnormal_vertex:fd,bsdfs:pd,iridescence_fragment:md,bumpmap_pars_fragment:gd,clipping_planes_fragment:_d,clipping_planes_pars_fragment:xd,clipping_planes_pars_vertex:vd,clipping_planes_vertex:Md,color_fragment:yd,color_pars_fragment:Sd,color_pars_vertex:Ed,color_vertex:bd,common:Td,cube_uv_reflection_fragment:wd,defaultnormal_vertex:Ad,displacementmap_pars_vertex:Rd,displacementmap_vertex:Cd,emissivemap_fragment:Ld,emissivemap_pars_fragment:Pd,colorspace_fragment:Dd,colorspace_pars_fragment:Ud,envmap_fragment:Id,envmap_common_pars_fragment:Nd,envmap_pars_fragment:Od,envmap_pars_vertex:Fd,envmap_physical_pars_fragment:$d,envmap_vertex:zd,fog_vertex:Bd,fog_pars_vertex:kd,fog_fragment:Hd,fog_pars_fragment:Gd,gradientmap_pars_fragment:Vd,lightmap_fragment:Wd,lightmap_pars_fragment:Xd,lights_lambert_fragment:jd,lights_lambert_pars_fragment:qd,lights_pars_begin:Yd,lights_toon_fragment:Zd,lights_toon_pars_fragment:Kd,lights_phong_fragment:Jd,lights_phong_pars_fragment:Qd,lights_physical_fragment:eh,lights_physical_pars_fragment:th,lights_fragment_begin:nh,lights_fragment_maps:ih,lights_fragment_end:sh,logdepthbuf_fragment:rh,logdepthbuf_pars_fragment:oh,logdepthbuf_pars_vertex:ah,logdepthbuf_vertex:lh,map_fragment:ch,map_pars_fragment:uh,map_particle_fragment:dh,map_particle_pars_fragment:hh,metalnessmap_fragment:fh,metalnessmap_pars_fragment:ph,morphcolor_vertex:mh,morphnormal_vertex:gh,morphtarget_pars_vertex:_h,morphtarget_vertex:xh,normal_fragment_begin:vh,normal_fragment_maps:Mh,normal_pars_fragment:yh,normal_pars_vertex:Sh,normal_vertex:Eh,normalmap_pars_fragment:bh,clearcoat_normal_fragment_begin:Th,clearcoat_normal_fragment_maps:wh,clearcoat_pars_fragment:Ah,iridescence_pars_fragment:Rh,opaque_fragment:Ch,packing:Lh,premultiplied_alpha_fragment:Ph,project_vertex:Dh,dithering_fragment:Uh,dithering_pars_fragment:Ih,roughnessmap_fragment:Nh,roughnessmap_pars_fragment:Oh,shadowmap_pars_fragment:Fh,shadowmap_pars_vertex:zh,shadowmap_vertex:Bh,shadowmask_pars_fragment:kh,skinbase_vertex:Hh,skinning_pars_vertex:Gh,skinning_vertex:Vh,skinnormal_vertex:Wh,specularmap_fragment:Xh,specularmap_pars_fragment:jh,tonemapping_fragment:qh,tonemapping_pars_fragment:Yh,transmission_fragment:$h,transmission_pars_fragment:Zh,uv_pars_fragment:Kh,uv_pars_vertex:Jh,uv_vertex:Qh,worldpos_vertex:ef,background_vert:`varying vec2 vUv;
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
}`},te={common:{diffuse:{value:new De(16777215)},opacity:{value:1},map:{value:null},mapTransform:{value:new He},alphaMap:{value:null},alphaMapTransform:{value:new He},alphaTest:{value:0}},specularmap:{specularMap:{value:null},specularMapTransform:{value:new He}},envmap:{envMap:{value:null},flipEnvMap:{value:-1},reflectivity:{value:1},ior:{value:1.5},refractionRatio:{value:.98}},aomap:{aoMap:{value:null},aoMapIntensity:{value:1},aoMapTransform:{value:new He}},lightmap:{lightMap:{value:null},lightMapIntensity:{value:1},lightMapTransform:{value:new He}},bumpmap:{bumpMap:{value:null},bumpMapTransform:{value:new He},bumpScale:{value:1}},normalmap:{normalMap:{value:null},normalMapTransform:{value:new He},normalScale:{value:new qe(1,1)}},displacementmap:{displacementMap:{value:null},displacementMapTransform:{value:new He},displacementScale:{value:1},displacementBias:{value:0}},emissivemap:{emissiveMap:{value:null},emissiveMapTransform:{value:new He}},metalnessmap:{metalnessMap:{value:null},metalnessMapTransform:{value:new He}},roughnessmap:{roughnessMap:{value:null},roughnessMapTransform:{value:new He}},gradientmap:{gradientMap:{value:null}},fog:{fogDensity:{value:25e-5},fogNear:{value:1},fogFar:{value:2e3},fogColor:{value:new De(16777215)}},lights:{ambientLightColor:{value:[]},lightProbe:{value:[]},directionalLights:{value:[],properties:{direction:{},color:{}}},directionalLightShadows:{value:[],properties:{shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},directionalShadowMap:{value:[]},directionalShadowMatrix:{value:[]},spotLights:{value:[],properties:{color:{},position:{},direction:{},distance:{},coneCos:{},penumbraCos:{},decay:{}}},spotLightShadows:{value:[],properties:{shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},spotLightMap:{value:[]},spotShadowMap:{value:[]},spotLightMatrix:{value:[]},pointLights:{value:[],properties:{color:{},position:{},decay:{},distance:{}}},pointLightShadows:{value:[],properties:{shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{},shadowCameraNear:{},shadowCameraFar:{}}},pointShadowMap:{value:[]},pointShadowMatrix:{value:[]},hemisphereLights:{value:[],properties:{direction:{},skyColor:{},groundColor:{}}},rectAreaLights:{value:[],properties:{color:{},position:{},width:{},height:{}}},ltc_1:{value:null},ltc_2:{value:null}},points:{diffuse:{value:new De(16777215)},opacity:{value:1},size:{value:1},scale:{value:1},map:{value:null},alphaMap:{value:null},alphaMapTransform:{value:new He},alphaTest:{value:0},uvTransform:{value:new He}},sprite:{diffuse:{value:new De(16777215)},opacity:{value:1},center:{value:new qe(.5,.5)},rotation:{value:0},map:{value:null},mapTransform:{value:new He},alphaMap:{value:null},alphaMapTransform:{value:new He},alphaTest:{value:0}}},nn={basic:{uniforms:Rt([te.common,te.specularmap,te.envmap,te.aomap,te.lightmap,te.fog]),vertexShader:Ne.meshbasic_vert,fragmentShader:Ne.meshbasic_frag},lambert:{uniforms:Rt([te.common,te.specularmap,te.envmap,te.aomap,te.lightmap,te.emissivemap,te.bumpmap,te.normalmap,te.displacementmap,te.fog,te.lights,{emissive:{value:new De(0)}}]),vertexShader:Ne.meshlambert_vert,fragmentShader:Ne.meshlambert_frag},phong:{uniforms:Rt([te.common,te.specularmap,te.envmap,te.aomap,te.lightmap,te.emissivemap,te.bumpmap,te.normalmap,te.displacementmap,te.fog,te.lights,{emissive:{value:new De(0)},specular:{value:new De(1118481)},shininess:{value:30}}]),vertexShader:Ne.meshphong_vert,fragmentShader:Ne.meshphong_frag},standard:{uniforms:Rt([te.common,te.envmap,te.aomap,te.lightmap,te.emissivemap,te.bumpmap,te.normalmap,te.displacementmap,te.roughnessmap,te.metalnessmap,te.fog,te.lights,{emissive:{value:new De(0)},roughness:{value:1},metalness:{value:0},envMapIntensity:{value:1}}]),vertexShader:Ne.meshphysical_vert,fragmentShader:Ne.meshphysical_frag},toon:{uniforms:Rt([te.common,te.aomap,te.lightmap,te.emissivemap,te.bumpmap,te.normalmap,te.displacementmap,te.gradientmap,te.fog,te.lights,{emissive:{value:new De(0)}}]),vertexShader:Ne.meshtoon_vert,fragmentShader:Ne.meshtoon_frag},matcap:{uniforms:Rt([te.common,te.bumpmap,te.normalmap,te.displacementmap,te.fog,{matcap:{value:null}}]),vertexShader:Ne.meshmatcap_vert,fragmentShader:Ne.meshmatcap_frag},points:{uniforms:Rt([te.points,te.fog]),vertexShader:Ne.points_vert,fragmentShader:Ne.points_frag},dashed:{uniforms:Rt([te.common,te.fog,{scale:{value:1},dashSize:{value:1},totalSize:{value:2}}]),vertexShader:Ne.linedashed_vert,fragmentShader:Ne.linedashed_frag},depth:{uniforms:Rt([te.common,te.displacementmap]),vertexShader:Ne.depth_vert,fragmentShader:Ne.depth_frag},normal:{uniforms:Rt([te.common,te.bumpmap,te.normalmap,te.displacementmap,{opacity:{value:1}}]),vertexShader:Ne.meshnormal_vert,fragmentShader:Ne.meshnormal_frag},sprite:{uniforms:Rt([te.sprite,te.fog]),vertexShader:Ne.sprite_vert,fragmentShader:Ne.sprite_frag},background:{uniforms:{uvTransform:{value:new He},t2D:{value:null},backgroundIntensity:{value:1}},vertexShader:Ne.background_vert,fragmentShader:Ne.background_frag},backgroundCube:{uniforms:{envMap:{value:null},flipEnvMap:{value:-1},backgroundBlurriness:{value:0},backgroundIntensity:{value:1}},vertexShader:Ne.backgroundCube_vert,fragmentShader:Ne.backgroundCube_frag},cube:{uniforms:{tCube:{value:null},tFlip:{value:-1},opacity:{value:1}},vertexShader:Ne.cube_vert,fragmentShader:Ne.cube_frag},equirect:{uniforms:{tEquirect:{value:null}},vertexShader:Ne.equirect_vert,fragmentShader:Ne.equirect_frag},distanceRGBA:{uniforms:Rt([te.common,te.displacementmap,{referencePosition:{value:new U},nearDistance:{value:1},farDistance:{value:1e3}}]),vertexShader:Ne.distanceRGBA_vert,fragmentShader:Ne.distanceRGBA_frag},shadow:{uniforms:Rt([te.lights,te.fog,{color:{value:new De(0)},opacity:{value:1}}]),vertexShader:Ne.shadow_vert,fragmentShader:Ne.shadow_frag}};nn.physical={uniforms:Rt([nn.standard.uniforms,{clearcoat:{value:0},clearcoatMap:{value:null},clearcoatMapTransform:{value:new He},clearcoatNormalMap:{value:null},clearcoatNormalMapTransform:{value:new He},clearcoatNormalScale:{value:new qe(1,1)},clearcoatRoughness:{value:0},clearcoatRoughnessMap:{value:null},clearcoatRoughnessMapTransform:{value:new He},iridescence:{value:0},iridescenceMap:{value:null},iridescenceMapTransform:{value:new He},iridescenceIOR:{value:1.3},iridescenceThicknessMinimum:{value:100},iridescenceThicknessMaximum:{value:400},iridescenceThicknessMap:{value:null},iridescenceThicknessMapTransform:{value:new He},sheen:{value:0},sheenColor:{value:new De(0)},sheenColorMap:{value:null},sheenColorMapTransform:{value:new He},sheenRoughness:{value:1},sheenRoughnessMap:{value:null},sheenRoughnessMapTransform:{value:new He},transmission:{value:0},transmissionMap:{value:null},transmissionMapTransform:{value:new He},transmissionSamplerSize:{value:new qe},transmissionSamplerMap:{value:null},thickness:{value:0},thicknessMap:{value:null},thicknessMapTransform:{value:new He},attenuationDistance:{value:0},attenuationColor:{value:new De(0)},specularColor:{value:new De(1,1,1)},specularColorMap:{value:null},specularColorMapTransform:{value:new He},specularIntensity:{value:1},specularIntensityMap:{value:null},specularIntensityMapTransform:{value:new He},anisotropyVector:{value:new qe},anisotropyMap:{value:null},anisotropyMapTransform:{value:new He}}]),vertexShader:Ne.meshphysical_vert,fragmentShader:Ne.meshphysical_frag};const Fs={r:0,b:0,g:0};function tf(i,e,t,n,s,r,a){const o=new De(0);let c=r===!0?0:1,l,d,h=null,f=0,m=null;function g(p,u){let M=!1,x=u.isScene===!0?u.background:null;x&&x.isTexture&&(x=(u.backgroundBlurriness>0?t:e).get(x)),x===null?_(o,c):x&&x.isColor&&(_(x,1),M=!0);const T=i.xr.getEnvironmentBlendMode();T==="additive"?n.buffers.color.setClear(0,0,0,1,a):T==="alpha-blend"&&n.buffers.color.setClear(0,0,0,0,a),(i.autoClear||M)&&i.clear(i.autoClearColor,i.autoClearDepth,i.autoClearStencil),x&&(x.isCubeTexture||x.mapping===as)?(d===void 0&&(d=new jt(new On(1,1,1),new $n({name:"BackgroundCubeMaterial",uniforms:Ti(nn.backgroundCube.uniforms),vertexShader:nn.backgroundCube.vertexShader,fragmentShader:nn.backgroundCube.fragmentShader,side:Ut,depthTest:!1,depthWrite:!1,fog:!1})),d.geometry.deleteAttribute("normal"),d.geometry.deleteAttribute("uv"),d.onBeforeRender=function(C,w,A){this.matrixWorld.copyPosition(A.matrixWorld)},Object.defineProperty(d.material,"envMap",{get:function(){return this.uniforms.envMap.value}}),s.update(d)),d.material.uniforms.envMap.value=x,d.material.uniforms.flipEnvMap.value=x.isCubeTexture&&x.isRenderTargetTexture===!1?-1:1,d.material.uniforms.backgroundBlurriness.value=u.backgroundBlurriness,d.material.uniforms.backgroundIntensity.value=u.backgroundIntensity,d.material.toneMapped=$e.getTransfer(x.colorSpace)!==tt,(h!==x||f!==x.version||m!==i.toneMapping)&&(d.material.needsUpdate=!0,h=x,f=x.version,m=i.toneMapping),d.layers.enableAll(),p.unshift(d,d.geometry,d.material,0,0,null)):x&&x.isTexture&&(l===void 0&&(l=new jt(new Os(2,2),new $n({name:"BackgroundMaterial",uniforms:Ti(nn.background.uniforms),vertexShader:nn.background.vertexShader,fragmentShader:nn.background.fragmentShader,side:Tn,depthTest:!1,depthWrite:!1,fog:!1})),l.geometry.deleteAttribute("normal"),Object.defineProperty(l.material,"map",{get:function(){return this.uniforms.t2D.value}}),s.update(l)),l.material.uniforms.t2D.value=x,l.material.uniforms.backgroundIntensity.value=u.backgroundIntensity,l.material.toneMapped=$e.getTransfer(x.colorSpace)!==tt,x.matrixAutoUpdate===!0&&x.updateMatrix(),l.material.uniforms.uvTransform.value.copy(x.matrix),(h!==x||f!==x.version||m!==i.toneMapping)&&(l.material.needsUpdate=!0,h=x,f=x.version,m=i.toneMapping),l.layers.enableAll(),p.unshift(l,l.geometry,l.material,0,0,null))}function _(p,u){p.getRGB(Fs,ol(i)),n.buffers.color.setClear(Fs.r,Fs.g,Fs.b,u,a)}return{getClearColor:function(){return o},setClearColor:function(p,u=1){o.set(p),c=u,_(o,c)},getClearAlpha:function(){return c},setClearAlpha:function(p){c=p,_(o,c)},render:g}}function nf(i,e,t,n){const s=i.getParameter(i.MAX_VERTEX_ATTRIBS),r=n.isWebGL2?null:e.get("OES_vertex_array_object"),a=n.isWebGL2||r!==null,o={},c=p(null);let l=c,d=!1;function h(L,z,G,Y,V){let D=!1;if(a){const W=_(Y,G,z);l!==W&&(l=W,m(l.object)),D=u(L,Y,G,V),D&&M(L,Y,G,V)}else{const W=z.wireframe===!0;(l.geometry!==Y.id||l.program!==G.id||l.wireframe!==W)&&(l.geometry=Y.id,l.program=G.id,l.wireframe=W,D=!0)}V!==null&&t.update(V,i.ELEMENT_ARRAY_BUFFER),(D||d)&&(d=!1,X(L,z,G,Y),V!==null&&i.bindBuffer(i.ELEMENT_ARRAY_BUFFER,t.get(V).buffer))}function f(){return n.isWebGL2?i.createVertexArray():r.createVertexArrayOES()}function m(L){return n.isWebGL2?i.bindVertexArray(L):r.bindVertexArrayOES(L)}function g(L){return n.isWebGL2?i.deleteVertexArray(L):r.deleteVertexArrayOES(L)}function _(L,z,G){const Y=G.wireframe===!0;let V=o[L.id];V===void 0&&(V={},o[L.id]=V);let D=V[z.id];D===void 0&&(D={},V[z.id]=D);let W=D[Y];return W===void 0&&(W=p(f()),D[Y]=W),W}function p(L){const z=[],G=[],Y=[];for(let V=0;V<s;V++)z[V]=0,G[V]=0,Y[V]=0;return{geometry:null,program:null,wireframe:!1,newAttributes:z,enabledAttributes:G,attributeDivisors:Y,object:L,attributes:{},index:null}}function u(L,z,G,Y){const V=l.attributes,D=z.attributes;let W=0;const q=G.getAttributes();for(const le in q)if(q[le].location>=0){const j=V[le];let ue=D[le];if(ue===void 0&&(le==="instanceMatrix"&&L.instanceMatrix&&(ue=L.instanceMatrix),le==="instanceColor"&&L.instanceColor&&(ue=L.instanceColor)),j===void 0||j.attribute!==ue||ue&&j.data!==ue.data)return!0;W++}return l.attributesNum!==W||l.index!==Y}function M(L,z,G,Y){const V={},D=z.attributes;let W=0;const q=G.getAttributes();for(const le in q)if(q[le].location>=0){let j=D[le];j===void 0&&(le==="instanceMatrix"&&L.instanceMatrix&&(j=L.instanceMatrix),le==="instanceColor"&&L.instanceColor&&(j=L.instanceColor));const ue={};ue.attribute=j,j&&j.data&&(ue.data=j.data),V[le]=ue,W++}l.attributes=V,l.attributesNum=W,l.index=Y}function x(){const L=l.newAttributes;for(let z=0,G=L.length;z<G;z++)L[z]=0}function T(L){C(L,0)}function C(L,z){const G=l.newAttributes,Y=l.enabledAttributes,V=l.attributeDivisors;G[L]=1,Y[L]===0&&(i.enableVertexAttribArray(L),Y[L]=1),V[L]!==z&&((n.isWebGL2?i:e.get("ANGLE_instanced_arrays"))[n.isWebGL2?"vertexAttribDivisor":"vertexAttribDivisorANGLE"](L,z),V[L]=z)}function w(){const L=l.newAttributes,z=l.enabledAttributes;for(let G=0,Y=z.length;G<Y;G++)z[G]!==L[G]&&(i.disableVertexAttribArray(G),z[G]=0)}function A(L,z,G,Y,V,D,W){W===!0?i.vertexAttribIPointer(L,z,G,V,D):i.vertexAttribPointer(L,z,G,Y,V,D)}function X(L,z,G,Y){if(n.isWebGL2===!1&&(L.isInstancedMesh||Y.isInstancedBufferGeometry)&&e.get("ANGLE_instanced_arrays")===null)return;x();const V=Y.attributes,D=G.getAttributes(),W=z.defaultAttributeValues;for(const q in D){const le=D[q];if(le.location>=0){let H=V[q];if(H===void 0&&(q==="instanceMatrix"&&L.instanceMatrix&&(H=L.instanceMatrix),q==="instanceColor"&&L.instanceColor&&(H=L.instanceColor)),H!==void 0){const j=H.normalized,ue=H.itemSize,me=t.get(H);if(me===void 0)continue;const xe=me.buffer,Ue=me.type,Oe=me.bytesPerElement,Te=n.isWebGL2===!0&&(Ue===i.INT||Ue===i.UNSIGNED_INT||H.gpuType===$o);if(H.isInterleavedBufferAttribute){const je=H.data,I=je.stride,Lt=H.offset;if(je.isInstancedInterleavedBuffer){for(let Me=0;Me<le.locationSize;Me++)C(le.location+Me,je.meshPerAttribute);L.isInstancedMesh!==!0&&Y._maxInstanceCount===void 0&&(Y._maxInstanceCount=je.meshPerAttribute*je.count)}else for(let Me=0;Me<le.locationSize;Me++)T(le.location+Me);i.bindBuffer(i.ARRAY_BUFFER,xe);for(let Me=0;Me<le.locationSize;Me++)A(le.location+Me,ue/le.locationSize,Ue,j,I*Oe,(Lt+ue/le.locationSize*Me)*Oe,Te)}else{if(H.isInstancedBufferAttribute){for(let je=0;je<le.locationSize;je++)C(le.location+je,H.meshPerAttribute);L.isInstancedMesh!==!0&&Y._maxInstanceCount===void 0&&(Y._maxInstanceCount=H.meshPerAttribute*H.count)}else for(let je=0;je<le.locationSize;je++)T(le.location+je);i.bindBuffer(i.ARRAY_BUFFER,xe);for(let je=0;je<le.locationSize;je++)A(le.location+je,ue/le.locationSize,Ue,j,ue*Oe,ue/le.locationSize*je*Oe,Te)}}else if(W!==void 0){const j=W[q];if(j!==void 0)switch(j.length){case 2:i.vertexAttrib2fv(le.location,j);break;case 3:i.vertexAttrib3fv(le.location,j);break;case 4:i.vertexAttrib4fv(le.location,j);break;default:i.vertexAttrib1fv(le.location,j)}}}}w()}function S(){$();for(const L in o){const z=o[L];for(const G in z){const Y=z[G];for(const V in Y)g(Y[V].object),delete Y[V];delete z[G]}delete o[L]}}function b(L){if(o[L.id]===void 0)return;const z=o[L.id];for(const G in z){const Y=z[G];for(const V in Y)g(Y[V].object),delete Y[V];delete z[G]}delete o[L.id]}function k(L){for(const z in o){const G=o[z];if(G[L.id]===void 0)continue;const Y=G[L.id];for(const V in Y)g(Y[V].object),delete Y[V];delete G[L.id]}}function $(){se(),d=!0,l!==c&&(l=c,m(l.object))}function se(){c.geometry=null,c.program=null,c.wireframe=!1}return{setup:h,reset:$,resetDefaultState:se,dispose:S,releaseStatesOfGeometry:b,releaseStatesOfProgram:k,initAttributes:x,enableAttribute:T,disableUnusedAttributes:w}}function sf(i,e,t,n){const s=n.isWebGL2;let r;function a(d){r=d}function o(d,h){i.drawArrays(r,d,h),t.update(h,r,1)}function c(d,h,f){if(f===0)return;let m,g;if(s)m=i,g="drawArraysInstanced";else if(m=e.get("ANGLE_instanced_arrays"),g="drawArraysInstancedANGLE",m===null){console.error("THREE.WebGLBufferRenderer: using THREE.InstancedBufferGeometry but hardware does not support extension ANGLE_instanced_arrays.");return}m[g](r,d,h,f),t.update(h,r,f)}function l(d,h,f){if(f===0)return;const m=e.get("WEBGL_multi_draw");if(m===null)for(let g=0;g<f;g++)this.render(d[g],h[g]);else{m.multiDrawArraysWEBGL(r,d,0,h,0,f);let g=0;for(let _=0;_<f;_++)g+=h[_];t.update(g,r,1)}}this.setMode=a,this.render=o,this.renderInstances=c,this.renderMultiDraw=l}function rf(i,e,t){let n;function s(){if(n!==void 0)return n;if(e.has("EXT_texture_filter_anisotropic")===!0){const A=e.get("EXT_texture_filter_anisotropic");n=i.getParameter(A.MAX_TEXTURE_MAX_ANISOTROPY_EXT)}else n=0;return n}function r(A){if(A==="highp"){if(i.getShaderPrecisionFormat(i.VERTEX_SHADER,i.HIGH_FLOAT).precision>0&&i.getShaderPrecisionFormat(i.FRAGMENT_SHADER,i.HIGH_FLOAT).precision>0)return"highp";A="mediump"}return A==="mediump"&&i.getShaderPrecisionFormat(i.VERTEX_SHADER,i.MEDIUM_FLOAT).precision>0&&i.getShaderPrecisionFormat(i.FRAGMENT_SHADER,i.MEDIUM_FLOAT).precision>0?"mediump":"lowp"}const a=typeof WebGL2RenderingContext<"u"&&i.constructor.name==="WebGL2RenderingContext";let o=t.precision!==void 0?t.precision:"highp";const c=r(o);c!==o&&(console.warn("THREE.WebGLRenderer:",o,"not supported, using",c,"instead."),o=c);const l=a||e.has("WEBGL_draw_buffers"),d=t.logarithmicDepthBuffer===!0,h=i.getParameter(i.MAX_TEXTURE_IMAGE_UNITS),f=i.getParameter(i.MAX_VERTEX_TEXTURE_IMAGE_UNITS),m=i.getParameter(i.MAX_TEXTURE_SIZE),g=i.getParameter(i.MAX_CUBE_MAP_TEXTURE_SIZE),_=i.getParameter(i.MAX_VERTEX_ATTRIBS),p=i.getParameter(i.MAX_VERTEX_UNIFORM_VECTORS),u=i.getParameter(i.MAX_VARYING_VECTORS),M=i.getParameter(i.MAX_FRAGMENT_UNIFORM_VECTORS),x=f>0,T=a||e.has("OES_texture_float"),C=x&&T,w=a?i.getParameter(i.MAX_SAMPLES):0;return{isWebGL2:a,drawBuffers:l,getMaxAnisotropy:s,getMaxPrecision:r,precision:o,logarithmicDepthBuffer:d,maxTextures:h,maxVertexTextures:f,maxTextureSize:m,maxCubemapSize:g,maxAttributes:_,maxVertexUniforms:p,maxVaryings:u,maxFragmentUniforms:M,vertexTextures:x,floatFragmentTextures:T,floatVertexTextures:C,maxSamples:w}}function of(i){const e=this;let t=null,n=0,s=!1,r=!1;const a=new Zn,o=new He,c={value:null,needsUpdate:!1};this.uniform=c,this.numPlanes=0,this.numIntersection=0,this.init=function(h,f){const m=h.length!==0||f||n!==0||s;return s=f,n=h.length,m},this.beginShadows=function(){r=!0,d(null)},this.endShadows=function(){r=!1},this.setGlobalState=function(h,f){t=d(h,f,0)},this.setState=function(h,f,m){const g=h.clippingPlanes,_=h.clipIntersection,p=h.clipShadows,u=i.get(h);if(!s||g===null||g.length===0||r&&!p)r?d(null):l();else{const M=r?0:n,x=M*4;let T=u.clippingState||null;c.value=T,T=d(g,f,x,m);for(let C=0;C!==x;++C)T[C]=t[C];u.clippingState=T,this.numIntersection=_?this.numPlanes:0,this.numPlanes+=M}};function l(){c.value!==t&&(c.value=t,c.needsUpdate=n>0),e.numPlanes=n,e.numIntersection=0}function d(h,f,m,g){const _=h!==null?h.length:0;let p=null;if(_!==0){if(p=c.value,g!==!0||p===null){const u=m+_*4,M=f.matrixWorldInverse;o.getNormalMatrix(M),(p===null||p.length<u)&&(p=new Float32Array(u));for(let x=0,T=m;x!==_;++x,T+=4)a.copy(h[x]).applyMatrix4(M,o),a.normal.toArray(p,T),p[T+3]=a.constant}c.value=p,c.needsUpdate=!0}return e.numPlanes=_,e.numIntersection=0,p}}function af(i){let e=new WeakMap;function t(a,o){return o===fr?a.mapping=oi:o===pr&&(a.mapping=ai),a}function n(a){if(a&&a.isTexture){const o=a.mapping;if(o===fr||o===pr)if(e.has(a)){const c=e.get(a).texture;return t(c,a.mapping)}else{const c=a.image;if(c&&c.height>0){const l=new Ju(c.height/2);return l.fromEquirectangularTexture(i,a),e.set(a,l),a.addEventListener("dispose",s),t(l.texture,a.mapping)}else return null}}return a}function s(a){const o=a.target;o.removeEventListener("dispose",s);const c=e.get(o);c!==void 0&&(e.delete(o),c.dispose())}function r(){e=new WeakMap}return{get:n,dispose:r}}class ul extends al{constructor(e=-1,t=1,n=1,s=-1,r=.1,a=2e3){super(),this.isOrthographicCamera=!0,this.type="OrthographicCamera",this.zoom=1,this.view=null,this.left=e,this.right=t,this.top=n,this.bottom=s,this.near=r,this.far=a,this.updateProjectionMatrix()}copy(e,t){return super.copy(e,t),this.left=e.left,this.right=e.right,this.top=e.top,this.bottom=e.bottom,this.near=e.near,this.far=e.far,this.zoom=e.zoom,this.view=e.view===null?null:Object.assign({},e.view),this}setViewOffset(e,t,n,s,r,a){this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=t,this.view.offsetX=n,this.view.offsetY=s,this.view.width=r,this.view.height=a,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const e=(this.right-this.left)/(2*this.zoom),t=(this.top-this.bottom)/(2*this.zoom),n=(this.right+this.left)/2,s=(this.top+this.bottom)/2;let r=n-e,a=n+e,o=s+t,c=s-t;if(this.view!==null&&this.view.enabled){const l=(this.right-this.left)/this.view.fullWidth/this.zoom,d=(this.top-this.bottom)/this.view.fullHeight/this.zoom;r+=l*this.view.offsetX,a=r+l*this.view.width,o-=d*this.view.offsetY,c=o-d*this.view.height}this.projectionMatrix.makeOrthographic(r,a,o,c,this.near,this.far,this.coordinateSystem),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){const t=super.toJSON(e);return t.object.zoom=this.zoom,t.object.left=this.left,t.object.right=this.right,t.object.top=this.top,t.object.bottom=this.bottom,t.object.near=this.near,t.object.far=this.far,this.view!==null&&(t.object.view=Object.assign({},this.view)),t}}const Ri=4,dl=[.125,.215,.35,.446,.526,.582],Jn=20,qr=new ul,hl=new De;let Yr=null,$r=0,Zr=0;const Qn=(1+Math.sqrt(5))/2,Ci=1/Qn,fl=[new U(1,1,1),new U(-1,1,1),new U(1,1,-1),new U(-1,1,-1),new U(0,Qn,Ci),new U(0,Qn,-Ci),new U(Ci,0,Qn),new U(-Ci,0,Qn),new U(Qn,Ci,0),new U(-Qn,Ci,0)];class pl{constructor(e){this._renderer=e,this._pingPongRenderTarget=null,this._lodMax=0,this._cubeSize=0,this._lodPlanes=[],this._sizeLods=[],this._sigmas=[],this._blurMaterial=null,this._cubemapMaterial=null,this._equirectMaterial=null,this._compileMaterial(this._blurMaterial)}fromScene(e,t=0,n=.1,s=100){Yr=this._renderer.getRenderTarget(),$r=this._renderer.getActiveCubeFace(),Zr=this._renderer.getActiveMipmapLevel(),this._setSize(256);const r=this._allocateTargets();return r.depthBuffer=!0,this._sceneToCubeUV(e,n,s,r),t>0&&this._blur(r,0,0,t),this._applyPMREM(r),this._cleanup(r),r}fromEquirectangular(e,t=null){return this._fromTexture(e,t)}fromCubemap(e,t=null){return this._fromTexture(e,t)}compileCubemapShader(){this._cubemapMaterial===null&&(this._cubemapMaterial=_l(),this._compileMaterial(this._cubemapMaterial))}compileEquirectangularShader(){this._equirectMaterial===null&&(this._equirectMaterial=gl(),this._compileMaterial(this._equirectMaterial))}dispose(){this._dispose(),this._cubemapMaterial!==null&&this._cubemapMaterial.dispose(),this._equirectMaterial!==null&&this._equirectMaterial.dispose()}_setSize(e){this._lodMax=Math.floor(Math.log2(e)),this._cubeSize=Math.pow(2,this._lodMax)}_dispose(){this._blurMaterial!==null&&this._blurMaterial.dispose(),this._pingPongRenderTarget!==null&&this._pingPongRenderTarget.dispose();for(let e=0;e<this._lodPlanes.length;e++)this._lodPlanes[e].dispose()}_cleanup(e){this._renderer.setRenderTarget(Yr,$r,Zr),e.scissorTest=!1,zs(e,0,0,e.width,e.height)}_fromTexture(e,t){e.mapping===oi||e.mapping===ai?this._setSize(e.image.length===0?16:e.image[0].width||e.image[0].image.width):this._setSize(e.image.width/4),Yr=this._renderer.getRenderTarget(),$r=this._renderer.getActiveCubeFace(),Zr=this._renderer.getActiveMipmapLevel();const n=t||this._allocateTargets();return this._textureToCubeUV(e,n),this._applyPMREM(n),this._cleanup(n),n}_allocateTargets(){const e=3*Math.max(this._cubeSize,112),t=4*this._cubeSize,n={magFilter:Vt,minFilter:Vt,generateMipmaps:!1,type:Vi,format:$t,colorSpace:un,depthBuffer:!1},s=ml(e,t,n);if(this._pingPongRenderTarget===null||this._pingPongRenderTarget.width!==e||this._pingPongRenderTarget.height!==t){this._pingPongRenderTarget!==null&&this._dispose(),this._pingPongRenderTarget=ml(e,t,n);const{_lodMax:r}=this;({sizeLods:this._sizeLods,lodPlanes:this._lodPlanes,sigmas:this._sigmas}=lf(r)),this._blurMaterial=cf(r,e,t)}return s}_compileMaterial(e){const t=new jt(this._lodPlanes[0],e);this._renderer.compile(t,qr)}_sceneToCubeUV(e,t,n,s){const o=new qt(90,1,t,n),c=[1,-1,1,1,1,1],l=[1,1,1,-1,-1,-1],d=this._renderer,h=d.autoClear,f=d.toneMapping;d.getClearColor(hl),d.toneMapping=An,d.autoClear=!1;const m=new Ja({name:"PMREM.Background",side:Ut,depthWrite:!1,depthTest:!1}),g=new jt(new On,m);let _=!1;const p=e.background;p?p.isColor&&(m.color.copy(p),e.background=null,_=!0):(m.color.copy(hl),_=!0);for(let u=0;u<6;u++){const M=u%3;M===0?(o.up.set(0,c[u],0),o.lookAt(l[u],0,0)):M===1?(o.up.set(0,0,c[u]),o.lookAt(0,l[u],0)):(o.up.set(0,c[u],0),o.lookAt(0,0,l[u]));const x=this._cubeSize;zs(s,M*x,u>2?x:0,x,x),d.setRenderTarget(s),_&&d.render(g,o),d.render(e,o)}g.geometry.dispose(),g.material.dispose(),d.toneMapping=f,d.autoClear=h,e.background=p}_textureToCubeUV(e,t){const n=this._renderer,s=e.mapping===oi||e.mapping===ai;s?(this._cubemapMaterial===null&&(this._cubemapMaterial=_l()),this._cubemapMaterial.uniforms.flipEnvMap.value=e.isRenderTargetTexture===!1?-1:1):this._equirectMaterial===null&&(this._equirectMaterial=gl());const r=s?this._cubemapMaterial:this._equirectMaterial,a=new jt(this._lodPlanes[0],r),o=r.uniforms;o.envMap.value=e;const c=this._cubeSize;zs(t,0,0,3*c,2*c),n.setRenderTarget(t),n.render(a,qr)}_applyPMREM(e){const t=this._renderer,n=t.autoClear;t.autoClear=!1;for(let s=1;s<this._lodPlanes.length;s++){const r=Math.sqrt(this._sigmas[s]*this._sigmas[s]-this._sigmas[s-1]*this._sigmas[s-1]),a=fl[(s-1)%fl.length];this._blur(e,s-1,s,r,a)}t.autoClear=n}_blur(e,t,n,s,r){const a=this._pingPongRenderTarget;this._halfBlur(e,a,t,n,s,"latitudinal",r),this._halfBlur(a,e,n,n,s,"longitudinal",r)}_halfBlur(e,t,n,s,r,a,o){const c=this._renderer,l=this._blurMaterial;a!=="latitudinal"&&a!=="longitudinal"&&console.error("blur direction must be either latitudinal or longitudinal!");const d=3,h=new jt(this._lodPlanes[s],l),f=l.uniforms,m=this._sizeLods[n]-1,g=isFinite(r)?Math.PI/(2*m):2*Math.PI/(2*Jn-1),_=r/g,p=isFinite(r)?1+Math.floor(d*_):Jn;p>Jn&&console.warn(`sigmaRadians, ${r}, is too large and will clip, as it requested ${p} samples when the maximum is set to ${Jn}`);const u=[];let M=0;for(let A=0;A<Jn;++A){const X=A/_,S=Math.exp(-X*X/2);u.push(S),A===0?M+=S:A<p&&(M+=2*S)}for(let A=0;A<u.length;A++)u[A]=u[A]/M;f.envMap.value=e.texture,f.samples.value=p,f.weights.value=u,f.latitudinal.value=a==="latitudinal",o&&(f.poleAxis.value=o);const{_lodMax:x}=this;f.dTheta.value=g,f.mipInt.value=x-n;const T=this._sizeLods[s],C=3*T*(s>x-Ri?s-x+Ri:0),w=4*(this._cubeSize-T);zs(t,C,w,3*T,2*T),c.setRenderTarget(t),c.render(h,qr)}}function lf(i){const e=[],t=[],n=[];let s=i;const r=i-Ri+1+dl.length;for(let a=0;a<r;a++){const o=Math.pow(2,s);t.push(o);let c=1/o;a>i-Ri?c=dl[a-i+Ri-1]:a===0&&(c=0),n.push(c);const l=1/(o-2),d=-l,h=1+l,f=[d,d,h,d,h,h,d,d,h,h,d,h],m=6,g=6,_=3,p=2,u=1,M=new Float32Array(_*g*m),x=new Float32Array(p*g*m),T=new Float32Array(u*g*m);for(let w=0;w<m;w++){const A=w%3*2/3-1,X=w>2?0:-1,S=[A,X,0,A+2/3,X,0,A+2/3,X+1,0,A,X,0,A+2/3,X+1,0,A,X+1,0];M.set(S,_*g*w),x.set(f,p*g*w);const b=[w,w,w,w,w,w];T.set(b,u*g*w)}const C=new _n;C.setAttribute("position",new tn(M,_)),C.setAttribute("uv",new tn(x,p)),C.setAttribute("faceIndex",new tn(T,u)),e.push(C),s>Ri&&s--}return{lodPlanes:e,sizeLods:t,sigmas:n}}function ml(i,e,t){const n=new Xn(i,e,t);return n.texture.mapping=as,n.texture.name="PMREM.cubeUv",n.scissorTest=!0,n}function zs(i,e,t,n,s){i.viewport.set(e,t,n,s),i.scissor.set(e,t,n,s)}function cf(i,e,t){const n=new Float32Array(Jn),s=new U(0,1,0);return new $n({name:"SphericalGaussianBlur",defines:{n:Jn,CUBEUV_TEXEL_WIDTH:1/e,CUBEUV_TEXEL_HEIGHT:1/t,CUBEUV_MAX_MIP:`${i}.0`},uniforms:{envMap:{value:null},samples:{value:1},weights:{value:n},latitudinal:{value:!1},dTheta:{value:0},mipInt:{value:0},poleAxis:{value:s}},vertexShader:Kr(),fragmentShader:`

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
		`,blending:wn,depthTest:!1,depthWrite:!1})}function gl(){return new $n({name:"EquirectangularToCubeUV",uniforms:{envMap:{value:null}},vertexShader:Kr(),fragmentShader:`

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
		`,blending:wn,depthTest:!1,depthWrite:!1})}function _l(){return new $n({name:"CubemapToCubeUV",uniforms:{envMap:{value:null},flipEnvMap:{value:-1}},vertexShader:Kr(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			uniform float flipEnvMap;

			varying vec3 vOutputDirection;

			uniform samplerCube envMap;

			void main() {

				gl_FragColor = textureCube( envMap, vec3( flipEnvMap * vOutputDirection.x, vOutputDirection.yz ) );

			}
		`,blending:wn,depthTest:!1,depthWrite:!1})}function Kr(){return`

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
	`}function uf(i){let e=new WeakMap,t=null;function n(o){if(o&&o.isTexture){const c=o.mapping,l=c===fr||c===pr,d=c===oi||c===ai;if(l||d)if(o.isRenderTargetTexture&&o.needsPMREMUpdate===!0){o.needsPMREMUpdate=!1;let h=e.get(o);return t===null&&(t=new pl(i)),h=l?t.fromEquirectangular(o,h):t.fromCubemap(o,h),e.set(o,h),h.texture}else{if(e.has(o))return e.get(o).texture;{const h=o.image;if(l&&h&&h.height>0||d&&h&&s(h)){t===null&&(t=new pl(i));const f=l?t.fromEquirectangular(o):t.fromCubemap(o);return e.set(o,f),o.addEventListener("dispose",r),f.texture}else return null}}}return o}function s(o){let c=0;const l=6;for(let d=0;d<l;d++)o[d]!==void 0&&c++;return c===l}function r(o){const c=o.target;c.removeEventListener("dispose",r);const l=e.get(c);l!==void 0&&(e.delete(c),l.dispose())}function a(){e=new WeakMap,t!==null&&(t.dispose(),t=null)}return{get:n,dispose:a}}function df(i){const e={};function t(n){if(e[n]!==void 0)return e[n];let s;switch(n){case"WEBGL_depth_texture":s=i.getExtension("WEBGL_depth_texture")||i.getExtension("MOZ_WEBGL_depth_texture")||i.getExtension("WEBKIT_WEBGL_depth_texture");break;case"EXT_texture_filter_anisotropic":s=i.getExtension("EXT_texture_filter_anisotropic")||i.getExtension("MOZ_EXT_texture_filter_anisotropic")||i.getExtension("WEBKIT_EXT_texture_filter_anisotropic");break;case"WEBGL_compressed_texture_s3tc":s=i.getExtension("WEBGL_compressed_texture_s3tc")||i.getExtension("MOZ_WEBGL_compressed_texture_s3tc")||i.getExtension("WEBKIT_WEBGL_compressed_texture_s3tc");break;case"WEBGL_compressed_texture_pvrtc":s=i.getExtension("WEBGL_compressed_texture_pvrtc")||i.getExtension("WEBKIT_WEBGL_compressed_texture_pvrtc");break;default:s=i.getExtension(n)}return e[n]=s,s}return{has:function(n){return t(n)!==null},init:function(n){n.isWebGL2?(t("EXT_color_buffer_float"),t("WEBGL_clip_cull_distance")):(t("WEBGL_depth_texture"),t("OES_texture_float"),t("OES_texture_half_float"),t("OES_texture_half_float_linear"),t("OES_standard_derivatives"),t("OES_element_index_uint"),t("OES_vertex_array_object"),t("ANGLE_instanced_arrays")),t("OES_texture_float_linear"),t("EXT_color_buffer_half_float"),t("WEBGL_multisampled_render_to_texture")},get:function(n){const s=t(n);return s===null&&console.warn("THREE.WebGLRenderer: "+n+" extension not supported."),s}}}function hf(i,e,t,n){const s={},r=new WeakMap;function a(h){const f=h.target;f.index!==null&&e.remove(f.index);for(const g in f.attributes)e.remove(f.attributes[g]);for(const g in f.morphAttributes){const _=f.morphAttributes[g];for(let p=0,u=_.length;p<u;p++)e.remove(_[p])}f.removeEventListener("dispose",a),delete s[f.id];const m=r.get(f);m&&(e.remove(m),r.delete(f)),n.releaseStatesOfGeometry(f),f.isInstancedBufferGeometry===!0&&delete f._maxInstanceCount,t.memory.geometries--}function o(h,f){return s[f.id]===!0||(f.addEventListener("dispose",a),s[f.id]=!0,t.memory.geometries++),f}function c(h){const f=h.attributes;for(const g in f)e.update(f[g],i.ARRAY_BUFFER);const m=h.morphAttributes;for(const g in m){const _=m[g];for(let p=0,u=_.length;p<u;p++)e.update(_[p],i.ARRAY_BUFFER)}}function l(h){const f=[],m=h.index,g=h.attributes.position;let _=0;if(m!==null){const M=m.array;_=m.version;for(let x=0,T=M.length;x<T;x+=3){const C=M[x+0],w=M[x+1],A=M[x+2];f.push(C,w,w,A,A,C)}}else if(g!==void 0){const M=g.array;_=g.version;for(let x=0,T=M.length/3-1;x<T;x+=3){const C=x+0,w=x+1,A=x+2;f.push(C,w,w,A,A,C)}}else return;const p=new(Ia(f)?el:Qa)(f,1);p.version=_;const u=r.get(h);u&&e.remove(u),r.set(h,p)}function d(h){const f=r.get(h);if(f){const m=h.index;m!==null&&f.version<m.version&&l(h)}else l(h);return r.get(h)}return{get:o,update:c,getWireframeAttribute:d}}function ff(i,e,t,n){const s=n.isWebGL2;let r;function a(m){r=m}let o,c;function l(m){o=m.type,c=m.bytesPerElement}function d(m,g){i.drawElements(r,g,o,m*c),t.update(g,r,1)}function h(m,g,_){if(_===0)return;let p,u;if(s)p=i,u="drawElementsInstanced";else if(p=e.get("ANGLE_instanced_arrays"),u="drawElementsInstancedANGLE",p===null){console.error("THREE.WebGLIndexedBufferRenderer: using THREE.InstancedBufferGeometry but hardware does not support extension ANGLE_instanced_arrays.");return}p[u](r,g,o,m*c,_),t.update(g,r,_)}function f(m,g,_){if(_===0)return;const p=e.get("WEBGL_multi_draw");if(p===null)for(let u=0;u<_;u++)this.render(m[u]/c,g[u]);else{p.multiDrawElementsWEBGL(r,g,0,o,m,0,_);let u=0;for(let M=0;M<_;M++)u+=g[M];t.update(u,r,1)}}this.setMode=a,this.setIndex=l,this.render=d,this.renderInstances=h,this.renderMultiDraw=f}function pf(i){const e={geometries:0,textures:0},t={frame:0,calls:0,triangles:0,points:0,lines:0};function n(r,a,o){switch(t.calls++,a){case i.TRIANGLES:t.triangles+=o*(r/3);break;case i.LINES:t.lines+=o*(r/2);break;case i.LINE_STRIP:t.lines+=o*(r-1);break;case i.LINE_LOOP:t.lines+=o*r;break;case i.POINTS:t.points+=o*r;break;default:console.error("THREE.WebGLInfo: Unknown draw mode:",a);break}}function s(){t.calls=0,t.triangles=0,t.points=0,t.lines=0}return{memory:e,render:t,programs:null,autoReset:!0,reset:s,update:n}}function mf(i,e){return i[0]-e[0]}function gf(i,e){return Math.abs(e[1])-Math.abs(i[1])}function _f(i,e,t){const n={},s=new Float32Array(8),r=new WeakMap,a=new pt,o=[];for(let l=0;l<8;l++)o[l]=[l,0];function c(l,d,h){const f=l.morphTargetInfluences;if(e.isWebGL2===!0){const m=d.morphAttributes.position||d.morphAttributes.normal||d.morphAttributes.color,g=m!==void 0?m.length:0;let _=r.get(d);if(_===void 0||_.count!==g){let L=function(){$.dispose(),r.delete(d),d.removeEventListener("dispose",L)};_!==void 0&&_.texture.dispose();const M=d.morphAttributes.position!==void 0,x=d.morphAttributes.normal!==void 0,T=d.morphAttributes.color!==void 0,C=d.morphAttributes.position||[],w=d.morphAttributes.normal||[],A=d.morphAttributes.color||[];let X=0;M===!0&&(X=1),x===!0&&(X=2),T===!0&&(X=3);let S=d.attributes.position.count*X,b=1;S>e.maxTextureSize&&(b=Math.ceil(S/e.maxTextureSize),S=e.maxTextureSize);const k=new Float32Array(S*b*4*g),$=new ka(k,S,b,g);$.type=Ln,$.needsUpdate=!0;const se=X*4;for(let z=0;z<g;z++){const G=C[z],Y=w[z],V=A[z],D=S*b*4*z;for(let W=0;W<G.count;W++){const q=W*se;M===!0&&(a.fromBufferAttribute(G,W),k[D+q+0]=a.x,k[D+q+1]=a.y,k[D+q+2]=a.z,k[D+q+3]=0),x===!0&&(a.fromBufferAttribute(Y,W),k[D+q+4]=a.x,k[D+q+5]=a.y,k[D+q+6]=a.z,k[D+q+7]=0),T===!0&&(a.fromBufferAttribute(V,W),k[D+q+8]=a.x,k[D+q+9]=a.y,k[D+q+10]=a.z,k[D+q+11]=V.itemSize===4?a.w:1)}}_={count:g,texture:$,size:new qe(S,b)},r.set(d,_),d.addEventListener("dispose",L)}let p=0;for(let M=0;M<f.length;M++)p+=f[M];const u=d.morphTargetsRelative?1:1-p;h.getUniforms().setValue(i,"morphTargetBaseInfluence",u),h.getUniforms().setValue(i,"morphTargetInfluences",f),h.getUniforms().setValue(i,"morphTargetsTexture",_.texture,t),h.getUniforms().setValue(i,"morphTargetsTextureSize",_.size)}else{const m=f===void 0?0:f.length;let g=n[d.id];if(g===void 0||g.length!==m){g=[];for(let x=0;x<m;x++)g[x]=[x,0];n[d.id]=g}for(let x=0;x<m;x++){const T=g[x];T[0]=x,T[1]=f[x]}g.sort(gf);for(let x=0;x<8;x++)x<m&&g[x][1]?(o[x][0]=g[x][0],o[x][1]=g[x][1]):(o[x][0]=Number.MAX_SAFE_INTEGER,o[x][1]=0);o.sort(mf);const _=d.morphAttributes.position,p=d.morphAttributes.normal;let u=0;for(let x=0;x<8;x++){const T=o[x],C=T[0],w=T[1];C!==Number.MAX_SAFE_INTEGER&&w?(_&&d.getAttribute("morphTarget"+x)!==_[C]&&d.setAttribute("morphTarget"+x,_[C]),p&&d.getAttribute("morphNormal"+x)!==p[C]&&d.setAttribute("morphNormal"+x,p[C]),s[x]=w,u+=w):(_&&d.hasAttribute("morphTarget"+x)===!0&&d.deleteAttribute("morphTarget"+x),p&&d.hasAttribute("morphNormal"+x)===!0&&d.deleteAttribute("morphNormal"+x),s[x]=0)}const M=d.morphTargetsRelative?1:1-u;h.getUniforms().setValue(i,"morphTargetBaseInfluence",M),h.getUniforms().setValue(i,"morphTargetInfluences",s)}}return{update:c}}function xf(i,e,t,n){let s=new WeakMap;function r(c){const l=n.render.frame,d=c.geometry,h=e.get(c,d);if(s.get(h)!==l&&(e.update(h),s.set(h,l)),c.isInstancedMesh&&(c.hasEventListener("dispose",o)===!1&&c.addEventListener("dispose",o),s.get(c)!==l&&(t.update(c.instanceMatrix,i.ARRAY_BUFFER),c.instanceColor!==null&&t.update(c.instanceColor,i.ARRAY_BUFFER),s.set(c,l))),c.isSkinnedMesh){const f=c.skeleton;s.get(f)!==l&&(f.update(),s.set(f,l))}return h}function a(){s=new WeakMap}function o(c){const l=c.target;l.removeEventListener("dispose",o),t.remove(l.instanceMatrix),l.instanceColor!==null&&t.remove(l.instanceColor)}return{update:r,dispose:a}}class xl extends At{constructor(e,t,n,s,r,a,o,c,l,d){if(d=d!==void 0?d:Vn,d!==Vn&&d!==li)throw new Error("DepthTexture format must be either THREE.DepthFormat or THREE.DepthStencilFormat");n===void 0&&d===Vn&&(n=Cn),n===void 0&&d===li&&(n=Gn),super(null,s,r,a,o,c,d,n,l),this.isDepthTexture=!0,this.image={width:e,height:t},this.magFilter=o!==void 0?o:wt,this.minFilter=c!==void 0?c:wt,this.flipY=!1,this.generateMipmaps=!1,this.compareFunction=null}copy(e){return super.copy(e),this.compareFunction=e.compareFunction,this}toJSON(e){const t=super.toJSON(e);return this.compareFunction!==null&&(t.compareFunction=this.compareFunction),t}}const vl=new At,Ml=new xl(1,1);Ml.compareFunction=La;const yl=new ka,Sl=new Nu,El=new ll,bl=[],Tl=[],wl=new Float32Array(16),Al=new Float32Array(9),Rl=new Float32Array(4);function Li(i,e,t){const n=i[0];if(n<=0||n>0)return i;const s=e*t;let r=bl[s];if(r===void 0&&(r=new Float32Array(s),bl[s]=r),e!==0){n.toArray(r,0);for(let a=1,o=0;a!==e;++a)o+=t,i[a].toArray(r,o)}return r}function dt(i,e){if(i.length!==e.length)return!1;for(let t=0,n=i.length;t<n;t++)if(i[t]!==e[t])return!1;return!0}function ht(i,e){for(let t=0,n=e.length;t<n;t++)i[t]=e[t]}function Bs(i,e){let t=Tl[e];t===void 0&&(t=new Int32Array(e),Tl[e]=t);for(let n=0;n!==e;++n)t[n]=i.allocateTextureUnit();return t}function vf(i,e){const t=this.cache;t[0]!==e&&(i.uniform1f(this.addr,e),t[0]=e)}function Mf(i,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(i.uniform2f(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(dt(t,e))return;i.uniform2fv(this.addr,e),ht(t,e)}}function yf(i,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(i.uniform3f(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else if(e.r!==void 0)(t[0]!==e.r||t[1]!==e.g||t[2]!==e.b)&&(i.uniform3f(this.addr,e.r,e.g,e.b),t[0]=e.r,t[1]=e.g,t[2]=e.b);else{if(dt(t,e))return;i.uniform3fv(this.addr,e),ht(t,e)}}function Sf(i,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(i.uniform4f(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(dt(t,e))return;i.uniform4fv(this.addr,e),ht(t,e)}}function Ef(i,e){const t=this.cache,n=e.elements;if(n===void 0){if(dt(t,e))return;i.uniformMatrix2fv(this.addr,!1,e),ht(t,e)}else{if(dt(t,n))return;Rl.set(n),i.uniformMatrix2fv(this.addr,!1,Rl),ht(t,n)}}function bf(i,e){const t=this.cache,n=e.elements;if(n===void 0){if(dt(t,e))return;i.uniformMatrix3fv(this.addr,!1,e),ht(t,e)}else{if(dt(t,n))return;Al.set(n),i.uniformMatrix3fv(this.addr,!1,Al),ht(t,n)}}function Tf(i,e){const t=this.cache,n=e.elements;if(n===void 0){if(dt(t,e))return;i.uniformMatrix4fv(this.addr,!1,e),ht(t,e)}else{if(dt(t,n))return;wl.set(n),i.uniformMatrix4fv(this.addr,!1,wl),ht(t,n)}}function wf(i,e){const t=this.cache;t[0]!==e&&(i.uniform1i(this.addr,e),t[0]=e)}function Af(i,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(i.uniform2i(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(dt(t,e))return;i.uniform2iv(this.addr,e),ht(t,e)}}function Rf(i,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(i.uniform3i(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else{if(dt(t,e))return;i.uniform3iv(this.addr,e),ht(t,e)}}function Cf(i,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(i.uniform4i(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(dt(t,e))return;i.uniform4iv(this.addr,e),ht(t,e)}}function Lf(i,e){const t=this.cache;t[0]!==e&&(i.uniform1ui(this.addr,e),t[0]=e)}function Pf(i,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(i.uniform2ui(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(dt(t,e))return;i.uniform2uiv(this.addr,e),ht(t,e)}}function Df(i,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(i.uniform3ui(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else{if(dt(t,e))return;i.uniform3uiv(this.addr,e),ht(t,e)}}function Uf(i,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(i.uniform4ui(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(dt(t,e))return;i.uniform4uiv(this.addr,e),ht(t,e)}}function If(i,e,t){const n=this.cache,s=t.allocateTextureUnit();n[0]!==s&&(i.uniform1i(this.addr,s),n[0]=s);const r=this.type===i.SAMPLER_2D_SHADOW?Ml:vl;t.setTexture2D(e||r,s)}function Nf(i,e,t){const n=this.cache,s=t.allocateTextureUnit();n[0]!==s&&(i.uniform1i(this.addr,s),n[0]=s),t.setTexture3D(e||Sl,s)}function Of(i,e,t){const n=this.cache,s=t.allocateTextureUnit();n[0]!==s&&(i.uniform1i(this.addr,s),n[0]=s),t.setTextureCube(e||El,s)}function Ff(i,e,t){const n=this.cache,s=t.allocateTextureUnit();n[0]!==s&&(i.uniform1i(this.addr,s),n[0]=s),t.setTexture2DArray(e||yl,s)}function zf(i){switch(i){case 5126:return vf;case 35664:return Mf;case 35665:return yf;case 35666:return Sf;case 35674:return Ef;case 35675:return bf;case 35676:return Tf;case 5124:case 35670:return wf;case 35667:case 35671:return Af;case 35668:case 35672:return Rf;case 35669:case 35673:return Cf;case 5125:return Lf;case 36294:return Pf;case 36295:return Df;case 36296:return Uf;case 35678:case 36198:case 36298:case 36306:case 35682:return If;case 35679:case 36299:case 36307:return Nf;case 35680:case 36300:case 36308:case 36293:return Of;case 36289:case 36303:case 36311:case 36292:return Ff}}function Bf(i,e){i.uniform1fv(this.addr,e)}function kf(i,e){const t=Li(e,this.size,2);i.uniform2fv(this.addr,t)}function Hf(i,e){const t=Li(e,this.size,3);i.uniform3fv(this.addr,t)}function Gf(i,e){const t=Li(e,this.size,4);i.uniform4fv(this.addr,t)}function Vf(i,e){const t=Li(e,this.size,4);i.uniformMatrix2fv(this.addr,!1,t)}function Wf(i,e){const t=Li(e,this.size,9);i.uniformMatrix3fv(this.addr,!1,t)}function Xf(i,e){const t=Li(e,this.size,16);i.uniformMatrix4fv(this.addr,!1,t)}function jf(i,e){i.uniform1iv(this.addr,e)}function qf(i,e){i.uniform2iv(this.addr,e)}function Yf(i,e){i.uniform3iv(this.addr,e)}function $f(i,e){i.uniform4iv(this.addr,e)}function Zf(i,e){i.uniform1uiv(this.addr,e)}function Kf(i,e){i.uniform2uiv(this.addr,e)}function Jf(i,e){i.uniform3uiv(this.addr,e)}function Qf(i,e){i.uniform4uiv(this.addr,e)}function ep(i,e,t){const n=this.cache,s=e.length,r=Bs(t,s);dt(n,r)||(i.uniform1iv(this.addr,r),ht(n,r));for(let a=0;a!==s;++a)t.setTexture2D(e[a]||vl,r[a])}function tp(i,e,t){const n=this.cache,s=e.length,r=Bs(t,s);dt(n,r)||(i.uniform1iv(this.addr,r),ht(n,r));for(let a=0;a!==s;++a)t.setTexture3D(e[a]||Sl,r[a])}function np(i,e,t){const n=this.cache,s=e.length,r=Bs(t,s);dt(n,r)||(i.uniform1iv(this.addr,r),ht(n,r));for(let a=0;a!==s;++a)t.setTextureCube(e[a]||El,r[a])}function ip(i,e,t){const n=this.cache,s=e.length,r=Bs(t,s);dt(n,r)||(i.uniform1iv(this.addr,r),ht(n,r));for(let a=0;a!==s;++a)t.setTexture2DArray(e[a]||yl,r[a])}function sp(i){switch(i){case 5126:return Bf;case 35664:return kf;case 35665:return Hf;case 35666:return Gf;case 35674:return Vf;case 35675:return Wf;case 35676:return Xf;case 5124:case 35670:return jf;case 35667:case 35671:return qf;case 35668:case 35672:return Yf;case 35669:case 35673:return $f;case 5125:return Zf;case 36294:return Kf;case 36295:return Jf;case 36296:return Qf;case 35678:case 36198:case 36298:case 36306:case 35682:return ep;case 35679:case 36299:case 36307:return tp;case 35680:case 36300:case 36308:case 36293:return np;case 36289:case 36303:case 36311:case 36292:return ip}}class rp{constructor(e,t,n){this.id=e,this.addr=n,this.cache=[],this.type=t.type,this.setValue=zf(t.type)}}class op{constructor(e,t,n){this.id=e,this.addr=n,this.cache=[],this.type=t.type,this.size=t.size,this.setValue=sp(t.type)}}class ap{constructor(e){this.id=e,this.seq=[],this.map={}}setValue(e,t,n){const s=this.seq;for(let r=0,a=s.length;r!==a;++r){const o=s[r];o.setValue(e,t[o.id],n)}}}const Jr=/(\w+)(\])?(\[|\.)?/g;function Cl(i,e){i.seq.push(e),i.map[e.id]=e}function lp(i,e,t){const n=i.name,s=n.length;for(Jr.lastIndex=0;;){const r=Jr.exec(n),a=Jr.lastIndex;let o=r[1];const c=r[2]==="]",l=r[3];if(c&&(o=o|0),l===void 0||l==="["&&a+2===s){Cl(t,l===void 0?new rp(o,i,e):new op(o,i,e));break}else{let h=t.map[o];h===void 0&&(h=new ap(o),Cl(t,h)),t=h}}}class ks{constructor(e,t){this.seq=[],this.map={};const n=e.getProgramParameter(t,e.ACTIVE_UNIFORMS);for(let s=0;s<n;++s){const r=e.getActiveUniform(t,s),a=e.getUniformLocation(t,r.name);lp(r,a,this)}}setValue(e,t,n,s){const r=this.map[t];r!==void 0&&r.setValue(e,n,s)}setOptional(e,t,n){const s=t[n];s!==void 0&&this.setValue(e,n,s)}static upload(e,t,n,s){for(let r=0,a=t.length;r!==a;++r){const o=t[r],c=n[o.id];c.needsUpdate!==!1&&o.setValue(e,c.value,s)}}static seqWithValue(e,t){const n=[];for(let s=0,r=e.length;s!==r;++s){const a=e[s];a.id in t&&n.push(a)}return n}}function Ll(i,e,t){const n=i.createShader(e);return i.shaderSource(n,t),i.compileShader(n),n}const cp=37297;let up=0;function dp(i,e){const t=i.split(`
`),n=[],s=Math.max(e-6,0),r=Math.min(e+6,t.length);for(let a=s;a<r;a++){const o=a+1;n.push(`${o===e?">":" "} ${o}: ${t[a]}`)}return n.join(`
`)}function hp(i){const e=$e.getPrimaries($e.workingColorSpace),t=$e.getPrimaries(i);let n;switch(e===t?n="":e===hs&&t===ds?n="LinearDisplayP3ToLinearSRGB":e===ds&&t===hs&&(n="LinearSRGBToLinearDisplayP3"),i){case un:case cs:return[n,"LinearTransferOETF"];case ft:case Er:return[n,"sRGBTransferOETF"];default:return console.warn("THREE.WebGLProgram: Unsupported color space:",i),[n,"LinearTransferOETF"]}}function Pl(i,e,t){const n=i.getShaderParameter(e,i.COMPILE_STATUS),s=i.getShaderInfoLog(e).trim();if(n&&s==="")return"";const r=/ERROR: 0:(\d+)/.exec(s);if(r){const a=parseInt(r[1]);return t.toUpperCase()+`

`+s+`

`+dp(i.getShaderSource(e),a)}else return s}function fp(i,e){const t=hp(e);return`vec4 ${i}( vec4 value ) { return ${t[0]}( ${t[1]}( value ) ); }`}function pp(i,e){let t;switch(e){case su:t="Linear";break;case ru:t="Reinhard";break;case ou:t="OptimizedCineon";break;case au:t="ACESFilmic";break;case cu:t="AgX";break;case lu:t="Custom";break;default:console.warn("THREE.WebGLProgram: Unsupported toneMapping:",e),t="Linear"}return"vec3 "+i+"( vec3 color ) { return "+t+"ToneMapping( color ); }"}function mp(i){return[i.extensionDerivatives||i.envMapCubeUVHeight||i.bumpMap||i.normalMapTangentSpace||i.clearcoatNormalMap||i.flatShading||i.shaderID==="physical"?"#extension GL_OES_standard_derivatives : enable":"",(i.extensionFragDepth||i.logarithmicDepthBuffer)&&i.rendererExtensionFragDepth?"#extension GL_EXT_frag_depth : enable":"",i.extensionDrawBuffers&&i.rendererExtensionDrawBuffers?"#extension GL_EXT_draw_buffers : require":"",(i.extensionShaderTextureLOD||i.envMap||i.transmission)&&i.rendererExtensionShaderTextureLod?"#extension GL_EXT_shader_texture_lod : enable":""].filter(Pi).join(`
`)}function gp(i){return[i.extensionClipCullDistance?"#extension GL_ANGLE_clip_cull_distance : require":""].filter(Pi).join(`
`)}function _p(i){const e=[];for(const t in i){const n=i[t];n!==!1&&e.push("#define "+t+" "+n)}return e.join(`
`)}function xp(i,e){const t={},n=i.getProgramParameter(e,i.ACTIVE_ATTRIBUTES);for(let s=0;s<n;s++){const r=i.getActiveAttrib(e,s),a=r.name;let o=1;r.type===i.FLOAT_MAT2&&(o=2),r.type===i.FLOAT_MAT3&&(o=3),r.type===i.FLOAT_MAT4&&(o=4),t[a]={type:r.type,location:i.getAttribLocation(e,a),locationSize:o}}return t}function Pi(i){return i!==""}function Dl(i,e){const t=e.numSpotLightShadows+e.numSpotLightMaps-e.numSpotLightShadowsWithMaps;return i.replace(/NUM_DIR_LIGHTS/g,e.numDirLights).replace(/NUM_SPOT_LIGHTS/g,e.numSpotLights).replace(/NUM_SPOT_LIGHT_MAPS/g,e.numSpotLightMaps).replace(/NUM_SPOT_LIGHT_COORDS/g,t).replace(/NUM_RECT_AREA_LIGHTS/g,e.numRectAreaLights).replace(/NUM_POINT_LIGHTS/g,e.numPointLights).replace(/NUM_HEMI_LIGHTS/g,e.numHemiLights).replace(/NUM_DIR_LIGHT_SHADOWS/g,e.numDirLightShadows).replace(/NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS/g,e.numSpotLightShadowsWithMaps).replace(/NUM_SPOT_LIGHT_SHADOWS/g,e.numSpotLightShadows).replace(/NUM_POINT_LIGHT_SHADOWS/g,e.numPointLightShadows)}function Ul(i,e){return i.replace(/NUM_CLIPPING_PLANES/g,e.numClippingPlanes).replace(/UNION_CLIPPING_PLANES/g,e.numClippingPlanes-e.numClipIntersection)}const vp=/^[ \t]*#include +<([\w\d./]+)>/gm;function Qr(i){return i.replace(vp,yp)}const Mp=new Map([["encodings_fragment","colorspace_fragment"],["encodings_pars_fragment","colorspace_pars_fragment"],["output_fragment","opaque_fragment"]]);function yp(i,e){let t=Ne[e];if(t===void 0){const n=Mp.get(e);if(n!==void 0)t=Ne[n],console.warn('THREE.WebGLRenderer: Shader chunk "%s" has been deprecated. Use "%s" instead.',e,n);else throw new Error("Can not resolve #include <"+e+">")}return Qr(t)}const Sp=/#pragma unroll_loop_start\s+for\s*\(\s*int\s+i\s*=\s*(\d+)\s*;\s*i\s*<\s*(\d+)\s*;\s*i\s*\+\+\s*\)\s*{([\s\S]+?)}\s+#pragma unroll_loop_end/g;function Il(i){return i.replace(Sp,Ep)}function Ep(i,e,t,n){let s="";for(let r=parseInt(e);r<parseInt(t);r++)s+=n.replace(/\[\s*i\s*\]/g,"[ "+r+" ]").replace(/UNROLLED_LOOP_INDEX/g,r);return s}function Nl(i){let e="precision "+i.precision+` float;
precision `+i.precision+" int;";return i.precision==="highp"?e+=`
#define HIGH_PRECISION`:i.precision==="mediump"?e+=`
#define MEDIUM_PRECISION`:i.precision==="lowp"&&(e+=`
#define LOW_PRECISION`),e}function bp(i){let e="SHADOWMAP_TYPE_BASIC";return i.shadowMapType===Bo?e="SHADOWMAP_TYPE_PCF":i.shadowMapType===ko?e="SHADOWMAP_TYPE_PCF_SOFT":i.shadowMapType===ln&&(e="SHADOWMAP_TYPE_VSM"),e}function Tp(i){let e="ENVMAP_TYPE_CUBE";if(i.envMap)switch(i.envMapMode){case oi:case ai:e="ENVMAP_TYPE_CUBE";break;case as:e="ENVMAP_TYPE_CUBE_UV";break}return e}function wp(i){let e="ENVMAP_MODE_REFLECTION";if(i.envMap)switch(i.envMapMode){case ai:e="ENVMAP_MODE_REFRACTION";break}return e}function Ap(i){let e="ENVMAP_BLENDING_NONE";if(i.envMap)switch(i.combine){case jo:e="ENVMAP_BLENDING_MULTIPLY";break;case nu:e="ENVMAP_BLENDING_MIX";break;case iu:e="ENVMAP_BLENDING_ADD";break}return e}function Rp(i){const e=i.envMapCubeUVHeight;if(e===null)return null;const t=Math.log2(e)-2,n=1/e;return{texelWidth:1/(3*Math.max(Math.pow(2,t),7*16)),texelHeight:n,maxMip:t}}function Cp(i,e,t,n){const s=i.getContext(),r=t.defines;let a=t.vertexShader,o=t.fragmentShader;const c=bp(t),l=Tp(t),d=wp(t),h=Ap(t),f=Rp(t),m=t.isWebGL2?"":mp(t),g=gp(t),_=_p(r),p=s.createProgram();let u,M,x=t.glslVersion?"#version "+t.glslVersion+`
`:"";t.isRawShaderMaterial?(u=["#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,_].filter(Pi).join(`
`),u.length>0&&(u+=`
`),M=[m,"#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,_].filter(Pi).join(`
`),M.length>0&&(M+=`
`)):(u=[Nl(t),"#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,_,t.extensionClipCullDistance?"#define USE_CLIP_DISTANCE":"",t.batching?"#define USE_BATCHING":"",t.instancing?"#define USE_INSTANCING":"",t.instancingColor?"#define USE_INSTANCING_COLOR":"",t.useFog&&t.fog?"#define USE_FOG":"",t.useFog&&t.fogExp2?"#define FOG_EXP2":"",t.map?"#define USE_MAP":"",t.envMap?"#define USE_ENVMAP":"",t.envMap?"#define "+d:"",t.lightMap?"#define USE_LIGHTMAP":"",t.aoMap?"#define USE_AOMAP":"",t.bumpMap?"#define USE_BUMPMAP":"",t.normalMap?"#define USE_NORMALMAP":"",t.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",t.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",t.displacementMap?"#define USE_DISPLACEMENTMAP":"",t.emissiveMap?"#define USE_EMISSIVEMAP":"",t.anisotropy?"#define USE_ANISOTROPY":"",t.anisotropyMap?"#define USE_ANISOTROPYMAP":"",t.clearcoatMap?"#define USE_CLEARCOATMAP":"",t.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",t.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",t.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",t.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",t.specularMap?"#define USE_SPECULARMAP":"",t.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",t.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",t.roughnessMap?"#define USE_ROUGHNESSMAP":"",t.metalnessMap?"#define USE_METALNESSMAP":"",t.alphaMap?"#define USE_ALPHAMAP":"",t.alphaHash?"#define USE_ALPHAHASH":"",t.transmission?"#define USE_TRANSMISSION":"",t.transmissionMap?"#define USE_TRANSMISSIONMAP":"",t.thicknessMap?"#define USE_THICKNESSMAP":"",t.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",t.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",t.mapUv?"#define MAP_UV "+t.mapUv:"",t.alphaMapUv?"#define ALPHAMAP_UV "+t.alphaMapUv:"",t.lightMapUv?"#define LIGHTMAP_UV "+t.lightMapUv:"",t.aoMapUv?"#define AOMAP_UV "+t.aoMapUv:"",t.emissiveMapUv?"#define EMISSIVEMAP_UV "+t.emissiveMapUv:"",t.bumpMapUv?"#define BUMPMAP_UV "+t.bumpMapUv:"",t.normalMapUv?"#define NORMALMAP_UV "+t.normalMapUv:"",t.displacementMapUv?"#define DISPLACEMENTMAP_UV "+t.displacementMapUv:"",t.metalnessMapUv?"#define METALNESSMAP_UV "+t.metalnessMapUv:"",t.roughnessMapUv?"#define ROUGHNESSMAP_UV "+t.roughnessMapUv:"",t.anisotropyMapUv?"#define ANISOTROPYMAP_UV "+t.anisotropyMapUv:"",t.clearcoatMapUv?"#define CLEARCOATMAP_UV "+t.clearcoatMapUv:"",t.clearcoatNormalMapUv?"#define CLEARCOAT_NORMALMAP_UV "+t.clearcoatNormalMapUv:"",t.clearcoatRoughnessMapUv?"#define CLEARCOAT_ROUGHNESSMAP_UV "+t.clearcoatRoughnessMapUv:"",t.iridescenceMapUv?"#define IRIDESCENCEMAP_UV "+t.iridescenceMapUv:"",t.iridescenceThicknessMapUv?"#define IRIDESCENCE_THICKNESSMAP_UV "+t.iridescenceThicknessMapUv:"",t.sheenColorMapUv?"#define SHEEN_COLORMAP_UV "+t.sheenColorMapUv:"",t.sheenRoughnessMapUv?"#define SHEEN_ROUGHNESSMAP_UV "+t.sheenRoughnessMapUv:"",t.specularMapUv?"#define SPECULARMAP_UV "+t.specularMapUv:"",t.specularColorMapUv?"#define SPECULAR_COLORMAP_UV "+t.specularColorMapUv:"",t.specularIntensityMapUv?"#define SPECULAR_INTENSITYMAP_UV "+t.specularIntensityMapUv:"",t.transmissionMapUv?"#define TRANSMISSIONMAP_UV "+t.transmissionMapUv:"",t.thicknessMapUv?"#define THICKNESSMAP_UV "+t.thicknessMapUv:"",t.vertexTangents&&t.flatShading===!1?"#define USE_TANGENT":"",t.vertexColors?"#define USE_COLOR":"",t.vertexAlphas?"#define USE_COLOR_ALPHA":"",t.vertexUv1s?"#define USE_UV1":"",t.vertexUv2s?"#define USE_UV2":"",t.vertexUv3s?"#define USE_UV3":"",t.pointsUvs?"#define USE_POINTS_UV":"",t.flatShading?"#define FLAT_SHADED":"",t.skinning?"#define USE_SKINNING":"",t.morphTargets?"#define USE_MORPHTARGETS":"",t.morphNormals&&t.flatShading===!1?"#define USE_MORPHNORMALS":"",t.morphColors&&t.isWebGL2?"#define USE_MORPHCOLORS":"",t.morphTargetsCount>0&&t.isWebGL2?"#define MORPHTARGETS_TEXTURE":"",t.morphTargetsCount>0&&t.isWebGL2?"#define MORPHTARGETS_TEXTURE_STRIDE "+t.morphTextureStride:"",t.morphTargetsCount>0&&t.isWebGL2?"#define MORPHTARGETS_COUNT "+t.morphTargetsCount:"",t.doubleSided?"#define DOUBLE_SIDED":"",t.flipSided?"#define FLIP_SIDED":"",t.shadowMapEnabled?"#define USE_SHADOWMAP":"",t.shadowMapEnabled?"#define "+c:"",t.sizeAttenuation?"#define USE_SIZEATTENUATION":"",t.numLightProbes>0?"#define USE_LIGHT_PROBES":"",t.useLegacyLights?"#define LEGACY_LIGHTS":"",t.logarithmicDepthBuffer?"#define USE_LOGDEPTHBUF":"",t.logarithmicDepthBuffer&&t.rendererExtensionFragDepth?"#define USE_LOGDEPTHBUF_EXT":"","uniform mat4 modelMatrix;","uniform mat4 modelViewMatrix;","uniform mat4 projectionMatrix;","uniform mat4 viewMatrix;","uniform mat3 normalMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;","#ifdef USE_INSTANCING","	attribute mat4 instanceMatrix;","#endif","#ifdef USE_INSTANCING_COLOR","	attribute vec3 instanceColor;","#endif","attribute vec3 position;","attribute vec3 normal;","attribute vec2 uv;","#ifdef USE_UV1","	attribute vec2 uv1;","#endif","#ifdef USE_UV2","	attribute vec2 uv2;","#endif","#ifdef USE_UV3","	attribute vec2 uv3;","#endif","#ifdef USE_TANGENT","	attribute vec4 tangent;","#endif","#if defined( USE_COLOR_ALPHA )","	attribute vec4 color;","#elif defined( USE_COLOR )","	attribute vec3 color;","#endif","#if ( defined( USE_MORPHTARGETS ) && ! defined( MORPHTARGETS_TEXTURE ) )","	attribute vec3 morphTarget0;","	attribute vec3 morphTarget1;","	attribute vec3 morphTarget2;","	attribute vec3 morphTarget3;","	#ifdef USE_MORPHNORMALS","		attribute vec3 morphNormal0;","		attribute vec3 morphNormal1;","		attribute vec3 morphNormal2;","		attribute vec3 morphNormal3;","	#else","		attribute vec3 morphTarget4;","		attribute vec3 morphTarget5;","		attribute vec3 morphTarget6;","		attribute vec3 morphTarget7;","	#endif","#endif","#ifdef USE_SKINNING","	attribute vec4 skinIndex;","	attribute vec4 skinWeight;","#endif",`
`].filter(Pi).join(`
`),M=[m,Nl(t),"#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,_,t.useFog&&t.fog?"#define USE_FOG":"",t.useFog&&t.fogExp2?"#define FOG_EXP2":"",t.map?"#define USE_MAP":"",t.matcap?"#define USE_MATCAP":"",t.envMap?"#define USE_ENVMAP":"",t.envMap?"#define "+l:"",t.envMap?"#define "+d:"",t.envMap?"#define "+h:"",f?"#define CUBEUV_TEXEL_WIDTH "+f.texelWidth:"",f?"#define CUBEUV_TEXEL_HEIGHT "+f.texelHeight:"",f?"#define CUBEUV_MAX_MIP "+f.maxMip+".0":"",t.lightMap?"#define USE_LIGHTMAP":"",t.aoMap?"#define USE_AOMAP":"",t.bumpMap?"#define USE_BUMPMAP":"",t.normalMap?"#define USE_NORMALMAP":"",t.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",t.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",t.emissiveMap?"#define USE_EMISSIVEMAP":"",t.anisotropy?"#define USE_ANISOTROPY":"",t.anisotropyMap?"#define USE_ANISOTROPYMAP":"",t.clearcoat?"#define USE_CLEARCOAT":"",t.clearcoatMap?"#define USE_CLEARCOATMAP":"",t.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",t.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",t.iridescence?"#define USE_IRIDESCENCE":"",t.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",t.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",t.specularMap?"#define USE_SPECULARMAP":"",t.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",t.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",t.roughnessMap?"#define USE_ROUGHNESSMAP":"",t.metalnessMap?"#define USE_METALNESSMAP":"",t.alphaMap?"#define USE_ALPHAMAP":"",t.alphaTest?"#define USE_ALPHATEST":"",t.alphaHash?"#define USE_ALPHAHASH":"",t.sheen?"#define USE_SHEEN":"",t.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",t.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",t.transmission?"#define USE_TRANSMISSION":"",t.transmissionMap?"#define USE_TRANSMISSIONMAP":"",t.thicknessMap?"#define USE_THICKNESSMAP":"",t.vertexTangents&&t.flatShading===!1?"#define USE_TANGENT":"",t.vertexColors||t.instancingColor?"#define USE_COLOR":"",t.vertexAlphas?"#define USE_COLOR_ALPHA":"",t.vertexUv1s?"#define USE_UV1":"",t.vertexUv2s?"#define USE_UV2":"",t.vertexUv3s?"#define USE_UV3":"",t.pointsUvs?"#define USE_POINTS_UV":"",t.gradientMap?"#define USE_GRADIENTMAP":"",t.flatShading?"#define FLAT_SHADED":"",t.doubleSided?"#define DOUBLE_SIDED":"",t.flipSided?"#define FLIP_SIDED":"",t.shadowMapEnabled?"#define USE_SHADOWMAP":"",t.shadowMapEnabled?"#define "+c:"",t.premultipliedAlpha?"#define PREMULTIPLIED_ALPHA":"",t.numLightProbes>0?"#define USE_LIGHT_PROBES":"",t.useLegacyLights?"#define LEGACY_LIGHTS":"",t.decodeVideoTexture?"#define DECODE_VIDEO_TEXTURE":"",t.logarithmicDepthBuffer?"#define USE_LOGDEPTHBUF":"",t.logarithmicDepthBuffer&&t.rendererExtensionFragDepth?"#define USE_LOGDEPTHBUF_EXT":"","uniform mat4 viewMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;",t.toneMapping!==An?"#define TONE_MAPPING":"",t.toneMapping!==An?Ne.tonemapping_pars_fragment:"",t.toneMapping!==An?pp("toneMapping",t.toneMapping):"",t.dithering?"#define DITHERING":"",t.opaque?"#define OPAQUE":"",Ne.colorspace_pars_fragment,fp("linearToOutputTexel",t.outputColorSpace),t.useDepthPacking?"#define DEPTH_PACKING "+t.depthPacking:"",`
`].filter(Pi).join(`
`)),a=Qr(a),a=Dl(a,t),a=Ul(a,t),o=Qr(o),o=Dl(o,t),o=Ul(o,t),a=Il(a),o=Il(o),t.isWebGL2&&t.isRawShaderMaterial!==!0&&(x=`#version 300 es
`,u=[g,"precision mediump sampler2DArray;","#define attribute in","#define varying out","#define texture2D texture"].join(`
`)+`
`+u,M=["precision mediump sampler2DArray;","#define varying in",t.glslVersion===Da?"":"layout(location = 0) out highp vec4 pc_fragColor;",t.glslVersion===Da?"":"#define gl_FragColor pc_fragColor","#define gl_FragDepthEXT gl_FragDepth","#define texture2D texture","#define textureCube texture","#define texture2DProj textureProj","#define texture2DLodEXT textureLod","#define texture2DProjLodEXT textureProjLod","#define textureCubeLodEXT textureLod","#define texture2DGradEXT textureGrad","#define texture2DProjGradEXT textureProjGrad","#define textureCubeGradEXT textureGrad"].join(`
`)+`
`+M);const T=x+u+a,C=x+M+o,w=Ll(s,s.VERTEX_SHADER,T),A=Ll(s,s.FRAGMENT_SHADER,C);s.attachShader(p,w),s.attachShader(p,A),t.index0AttributeName!==void 0?s.bindAttribLocation(p,0,t.index0AttributeName):t.morphTargets===!0&&s.bindAttribLocation(p,0,"position"),s.linkProgram(p);function X($){if(i.debug.checkShaderErrors){const se=s.getProgramInfoLog(p).trim(),L=s.getShaderInfoLog(w).trim(),z=s.getShaderInfoLog(A).trim();let G=!0,Y=!0;if(s.getProgramParameter(p,s.LINK_STATUS)===!1)if(G=!1,typeof i.debug.onShaderError=="function")i.debug.onShaderError(s,p,w,A);else{const V=Pl(s,w,"vertex"),D=Pl(s,A,"fragment");console.error("THREE.WebGLProgram: Shader Error "+s.getError()+" - VALIDATE_STATUS "+s.getProgramParameter(p,s.VALIDATE_STATUS)+`

Program Info Log: `+se+`
`+V+`
`+D)}else se!==""?console.warn("THREE.WebGLProgram: Program Info Log:",se):(L===""||z==="")&&(Y=!1);Y&&($.diagnostics={runnable:G,programLog:se,vertexShader:{log:L,prefix:u},fragmentShader:{log:z,prefix:M}})}s.deleteShader(w),s.deleteShader(A),S=new ks(s,p),b=xp(s,p)}let S;this.getUniforms=function(){return S===void 0&&X(this),S};let b;this.getAttributes=function(){return b===void 0&&X(this),b};let k=t.rendererExtensionParallelShaderCompile===!1;return this.isReady=function(){return k===!1&&(k=s.getProgramParameter(p,cp)),k},this.destroy=function(){n.releaseStatesOfProgram(this),s.deleteProgram(p),this.program=void 0},this.type=t.shaderType,this.name=t.shaderName,this.id=up++,this.cacheKey=e,this.usedTimes=1,this.program=p,this.vertexShader=w,this.fragmentShader=A,this}let Lp=0;class Pp{constructor(){this.shaderCache=new Map,this.materialCache=new Map}update(e){const t=e.vertexShader,n=e.fragmentShader,s=this._getShaderStage(t),r=this._getShaderStage(n),a=this._getShaderCacheForMaterial(e);return a.has(s)===!1&&(a.add(s),s.usedTimes++),a.has(r)===!1&&(a.add(r),r.usedTimes++),this}remove(e){const t=this.materialCache.get(e);for(const n of t)n.usedTimes--,n.usedTimes===0&&this.shaderCache.delete(n.code);return this.materialCache.delete(e),this}getVertexShaderID(e){return this._getShaderStage(e.vertexShader).id}getFragmentShaderID(e){return this._getShaderStage(e.fragmentShader).id}dispose(){this.shaderCache.clear(),this.materialCache.clear()}_getShaderCacheForMaterial(e){const t=this.materialCache;let n=t.get(e);return n===void 0&&(n=new Set,t.set(e,n)),n}_getShaderStage(e){const t=this.shaderCache;let n=t.get(e);return n===void 0&&(n=new Dp(e),t.set(e,n)),n}}class Dp{constructor(e){this.id=Lp++,this.code=e,this.usedTimes=0}}function Up(i,e,t,n,s,r,a){const o=new Xa,c=new Pp,l=[],d=s.isWebGL2,h=s.logarithmicDepthBuffer,f=s.vertexTextures;let m=s.precision;const g={MeshDepthMaterial:"depth",MeshDistanceMaterial:"distanceRGBA",MeshNormalMaterial:"normal",MeshBasicMaterial:"basic",MeshLambertMaterial:"lambert",MeshPhongMaterial:"phong",MeshToonMaterial:"toon",MeshStandardMaterial:"physical",MeshPhysicalMaterial:"physical",MeshMatcapMaterial:"matcap",LineBasicMaterial:"basic",LineDashedMaterial:"dashed",PointsMaterial:"points",ShadowMaterial:"shadow",SpriteMaterial:"sprite"};function _(S){return S===0?"uv":`uv${S}`}function p(S,b,k,$,se){const L=$.fog,z=se.geometry,G=S.isMeshStandardMaterial?$.environment:null,Y=(S.isMeshStandardMaterial?t:e).get(S.envMap||G),V=Y&&Y.mapping===as?Y.image.height:null,D=g[S.type];S.precision!==null&&(m=s.getMaxPrecision(S.precision),m!==S.precision&&console.warn("THREE.WebGLProgram.getParameters:",S.precision,"not supported, using",m,"instead."));const W=z.morphAttributes.position||z.morphAttributes.normal||z.morphAttributes.color,q=W!==void 0?W.length:0;let le=0;z.morphAttributes.position!==void 0&&(le=1),z.morphAttributes.normal!==void 0&&(le=2),z.morphAttributes.color!==void 0&&(le=3);let H,j,ue,me;if(D){const Pt=nn[D];H=Pt.vertexShader,j=Pt.fragmentShader}else H=S.vertexShader,j=S.fragmentShader,c.update(S),ue=c.getVertexShaderID(S),me=c.getFragmentShaderID(S);const xe=i.getRenderTarget(),Ue=se.isInstancedMesh===!0,Oe=se.isBatchedMesh===!0,Te=!!S.map,je=!!S.matcap,I=!!Y,Lt=!!S.aoMap,Me=!!S.lightMap,Le=!!S.bumpMap,pe=!!S.normalMap,nt=!!S.displacementMap,ze=!!S.emissiveMap,E=!!S.metalnessMap,v=!!S.roughnessMap,O=S.anisotropy>0,Q=S.clearcoat>0,K=S.iridescence>0,ee=S.sheen>0,ge=S.transmission>0,ce=O&&!!S.anisotropyMap,he=Q&&!!S.clearcoatMap,be=Q&&!!S.clearcoatNormalMap,Be=Q&&!!S.clearcoatRoughnessMap,Z=K&&!!S.iridescenceMap,Ze=K&&!!S.iridescenceThicknessMap,We=ee&&!!S.sheenColorMap,Ce=ee&&!!S.sheenRoughnessMap,ve=!!S.specularMap,fe=!!S.specularColorMap,Fe=!!S.specularIntensityMap,Ye=ge&&!!S.transmissionMap,st=ge&&!!S.thicknessMap,Ge=!!S.gradientMap,ie=!!S.alphaMap,R=S.alphaTest>0,oe=!!S.alphaHash,ae=!!S.extensions,we=!!z.attributes.uv1,ye=!!z.attributes.uv2,Je=!!z.attributes.uv3;let Qe=An;return S.toneMapped&&(xe===null||xe.isXRRenderTarget===!0)&&(Qe=i.toneMapping),{isWebGL2:d,shaderID:D,shaderType:S.type,shaderName:S.name,vertexShader:H,fragmentShader:j,defines:S.defines,customVertexShaderID:ue,customFragmentShaderID:me,isRawShaderMaterial:S.isRawShaderMaterial===!0,glslVersion:S.glslVersion,precision:m,batching:Oe,instancing:Ue,instancingColor:Ue&&se.instanceColor!==null,supportsVertexTextures:f,outputColorSpace:xe===null?i.outputColorSpace:xe.isXRRenderTarget===!0?xe.texture.colorSpace:un,map:Te,matcap:je,envMap:I,envMapMode:I&&Y.mapping,envMapCubeUVHeight:V,aoMap:Lt,lightMap:Me,bumpMap:Le,normalMap:pe,displacementMap:f&&nt,emissiveMap:ze,normalMapObjectSpace:pe&&S.normalMapType===yu,normalMapTangentSpace:pe&&S.normalMapType===Ra,metalnessMap:E,roughnessMap:v,anisotropy:O,anisotropyMap:ce,clearcoat:Q,clearcoatMap:he,clearcoatNormalMap:be,clearcoatRoughnessMap:Be,iridescence:K,iridescenceMap:Z,iridescenceThicknessMap:Ze,sheen:ee,sheenColorMap:We,sheenRoughnessMap:Ce,specularMap:ve,specularColorMap:fe,specularIntensityMap:Fe,transmission:ge,transmissionMap:Ye,thicknessMap:st,gradientMap:Ge,opaque:S.transparent===!1&&S.blending===ri,alphaMap:ie,alphaTest:R,alphaHash:oe,combine:S.combine,mapUv:Te&&_(S.map.channel),aoMapUv:Lt&&_(S.aoMap.channel),lightMapUv:Me&&_(S.lightMap.channel),bumpMapUv:Le&&_(S.bumpMap.channel),normalMapUv:pe&&_(S.normalMap.channel),displacementMapUv:nt&&_(S.displacementMap.channel),emissiveMapUv:ze&&_(S.emissiveMap.channel),metalnessMapUv:E&&_(S.metalnessMap.channel),roughnessMapUv:v&&_(S.roughnessMap.channel),anisotropyMapUv:ce&&_(S.anisotropyMap.channel),clearcoatMapUv:he&&_(S.clearcoatMap.channel),clearcoatNormalMapUv:be&&_(S.clearcoatNormalMap.channel),clearcoatRoughnessMapUv:Be&&_(S.clearcoatRoughnessMap.channel),iridescenceMapUv:Z&&_(S.iridescenceMap.channel),iridescenceThicknessMapUv:Ze&&_(S.iridescenceThicknessMap.channel),sheenColorMapUv:We&&_(S.sheenColorMap.channel),sheenRoughnessMapUv:Ce&&_(S.sheenRoughnessMap.channel),specularMapUv:ve&&_(S.specularMap.channel),specularColorMapUv:fe&&_(S.specularColorMap.channel),specularIntensityMapUv:Fe&&_(S.specularIntensityMap.channel),transmissionMapUv:Ye&&_(S.transmissionMap.channel),thicknessMapUv:st&&_(S.thicknessMap.channel),alphaMapUv:ie&&_(S.alphaMap.channel),vertexTangents:!!z.attributes.tangent&&(pe||O),vertexColors:S.vertexColors,vertexAlphas:S.vertexColors===!0&&!!z.attributes.color&&z.attributes.color.itemSize===4,vertexUv1s:we,vertexUv2s:ye,vertexUv3s:Je,pointsUvs:se.isPoints===!0&&!!z.attributes.uv&&(Te||ie),fog:!!L,useFog:S.fog===!0,fogExp2:L&&L.isFogExp2,flatShading:S.flatShading===!0,sizeAttenuation:S.sizeAttenuation===!0,logarithmicDepthBuffer:h,skinning:se.isSkinnedMesh===!0,morphTargets:z.morphAttributes.position!==void 0,morphNormals:z.morphAttributes.normal!==void 0,morphColors:z.morphAttributes.color!==void 0,morphTargetsCount:q,morphTextureStride:le,numDirLights:b.directional.length,numPointLights:b.point.length,numSpotLights:b.spot.length,numSpotLightMaps:b.spotLightMap.length,numRectAreaLights:b.rectArea.length,numHemiLights:b.hemi.length,numDirLightShadows:b.directionalShadowMap.length,numPointLightShadows:b.pointShadowMap.length,numSpotLightShadows:b.spotShadowMap.length,numSpotLightShadowsWithMaps:b.numSpotLightShadowsWithMaps,numLightProbes:b.numLightProbes,numClippingPlanes:a.numPlanes,numClipIntersection:a.numIntersection,dithering:S.dithering,shadowMapEnabled:i.shadowMap.enabled&&k.length>0,shadowMapType:i.shadowMap.type,toneMapping:Qe,useLegacyLights:i._useLegacyLights,decodeVideoTexture:Te&&S.map.isVideoTexture===!0&&$e.getTransfer(S.map.colorSpace)===tt,premultipliedAlpha:S.premultipliedAlpha,doubleSided:S.side===cn,flipSided:S.side===Ut,useDepthPacking:S.depthPacking>=0,depthPacking:S.depthPacking||0,index0AttributeName:S.index0AttributeName,extensionDerivatives:ae&&S.extensions.derivatives===!0,extensionFragDepth:ae&&S.extensions.fragDepth===!0,extensionDrawBuffers:ae&&S.extensions.drawBuffers===!0,extensionShaderTextureLOD:ae&&S.extensions.shaderTextureLOD===!0,extensionClipCullDistance:ae&&S.extensions.clipCullDistance&&n.has("WEBGL_clip_cull_distance"),rendererExtensionFragDepth:d||n.has("EXT_frag_depth"),rendererExtensionDrawBuffers:d||n.has("WEBGL_draw_buffers"),rendererExtensionShaderTextureLod:d||n.has("EXT_shader_texture_lod"),rendererExtensionParallelShaderCompile:n.has("KHR_parallel_shader_compile"),customProgramCacheKey:S.customProgramCacheKey()}}function u(S){const b=[];if(S.shaderID?b.push(S.shaderID):(b.push(S.customVertexShaderID),b.push(S.customFragmentShaderID)),S.defines!==void 0)for(const k in S.defines)b.push(k),b.push(S.defines[k]);return S.isRawShaderMaterial===!1&&(M(b,S),x(b,S),b.push(i.outputColorSpace)),b.push(S.customProgramCacheKey),b.join()}function M(S,b){S.push(b.precision),S.push(b.outputColorSpace),S.push(b.envMapMode),S.push(b.envMapCubeUVHeight),S.push(b.mapUv),S.push(b.alphaMapUv),S.push(b.lightMapUv),S.push(b.aoMapUv),S.push(b.bumpMapUv),S.push(b.normalMapUv),S.push(b.displacementMapUv),S.push(b.emissiveMapUv),S.push(b.metalnessMapUv),S.push(b.roughnessMapUv),S.push(b.anisotropyMapUv),S.push(b.clearcoatMapUv),S.push(b.clearcoatNormalMapUv),S.push(b.clearcoatRoughnessMapUv),S.push(b.iridescenceMapUv),S.push(b.iridescenceThicknessMapUv),S.push(b.sheenColorMapUv),S.push(b.sheenRoughnessMapUv),S.push(b.specularMapUv),S.push(b.specularColorMapUv),S.push(b.specularIntensityMapUv),S.push(b.transmissionMapUv),S.push(b.thicknessMapUv),S.push(b.combine),S.push(b.fogExp2),S.push(b.sizeAttenuation),S.push(b.morphTargetsCount),S.push(b.morphAttributeCount),S.push(b.numDirLights),S.push(b.numPointLights),S.push(b.numSpotLights),S.push(b.numSpotLightMaps),S.push(b.numHemiLights),S.push(b.numRectAreaLights),S.push(b.numDirLightShadows),S.push(b.numPointLightShadows),S.push(b.numSpotLightShadows),S.push(b.numSpotLightShadowsWithMaps),S.push(b.numLightProbes),S.push(b.shadowMapType),S.push(b.toneMapping),S.push(b.numClippingPlanes),S.push(b.numClipIntersection),S.push(b.depthPacking)}function x(S,b){o.disableAll(),b.isWebGL2&&o.enable(0),b.supportsVertexTextures&&o.enable(1),b.instancing&&o.enable(2),b.instancingColor&&o.enable(3),b.matcap&&o.enable(4),b.envMap&&o.enable(5),b.normalMapObjectSpace&&o.enable(6),b.normalMapTangentSpace&&o.enable(7),b.clearcoat&&o.enable(8),b.iridescence&&o.enable(9),b.alphaTest&&o.enable(10),b.vertexColors&&o.enable(11),b.vertexAlphas&&o.enable(12),b.vertexUv1s&&o.enable(13),b.vertexUv2s&&o.enable(14),b.vertexUv3s&&o.enable(15),b.vertexTangents&&o.enable(16),b.anisotropy&&o.enable(17),b.alphaHash&&o.enable(18),b.batching&&o.enable(19),S.push(o.mask),o.disableAll(),b.fog&&o.enable(0),b.useFog&&o.enable(1),b.flatShading&&o.enable(2),b.logarithmicDepthBuffer&&o.enable(3),b.skinning&&o.enable(4),b.morphTargets&&o.enable(5),b.morphNormals&&o.enable(6),b.morphColors&&o.enable(7),b.premultipliedAlpha&&o.enable(8),b.shadowMapEnabled&&o.enable(9),b.useLegacyLights&&o.enable(10),b.doubleSided&&o.enable(11),b.flipSided&&o.enable(12),b.useDepthPacking&&o.enable(13),b.dithering&&o.enable(14),b.transmission&&o.enable(15),b.sheen&&o.enable(16),b.opaque&&o.enable(17),b.pointsUvs&&o.enable(18),b.decodeVideoTexture&&o.enable(19),S.push(o.mask)}function T(S){const b=g[S.type];let k;if(b){const $=nn[b];k=Yu.clone($.uniforms)}else k=S.uniforms;return k}function C(S,b){let k;for(let $=0,se=l.length;$<se;$++){const L=l[$];if(L.cacheKey===b){k=L,++k.usedTimes;break}}return k===void 0&&(k=new Cp(i,b,S,r),l.push(k)),k}function w(S){if(--S.usedTimes===0){const b=l.indexOf(S);l[b]=l[l.length-1],l.pop(),S.destroy()}}function A(S){c.remove(S)}function X(){c.dispose()}return{getParameters:p,getProgramCacheKey:u,getUniforms:T,acquireProgram:C,releaseProgram:w,releaseShaderCache:A,programs:l,dispose:X}}function Ip(){let i=new WeakMap;function e(r){let a=i.get(r);return a===void 0&&(a={},i.set(r,a)),a}function t(r){i.delete(r)}function n(r,a,o){i.get(r)[a]=o}function s(){i=new WeakMap}return{get:e,remove:t,update:n,dispose:s}}function Np(i,e){return i.groupOrder!==e.groupOrder?i.groupOrder-e.groupOrder:i.renderOrder!==e.renderOrder?i.renderOrder-e.renderOrder:i.material.id!==e.material.id?i.material.id-e.material.id:i.z!==e.z?i.z-e.z:i.id-e.id}function Ol(i,e){return i.groupOrder!==e.groupOrder?i.groupOrder-e.groupOrder:i.renderOrder!==e.renderOrder?i.renderOrder-e.renderOrder:i.z!==e.z?e.z-i.z:i.id-e.id}function Fl(){const i=[];let e=0;const t=[],n=[],s=[];function r(){e=0,t.length=0,n.length=0,s.length=0}function a(h,f,m,g,_,p){let u=i[e];return u===void 0?(u={id:h.id,object:h,geometry:f,material:m,groupOrder:g,renderOrder:h.renderOrder,z:_,group:p},i[e]=u):(u.id=h.id,u.object=h,u.geometry=f,u.material=m,u.groupOrder=g,u.renderOrder=h.renderOrder,u.z=_,u.group=p),e++,u}function o(h,f,m,g,_,p){const u=a(h,f,m,g,_,p);m.transmission>0?n.push(u):m.transparent===!0?s.push(u):t.push(u)}function c(h,f,m,g,_,p){const u=a(h,f,m,g,_,p);m.transmission>0?n.unshift(u):m.transparent===!0?s.unshift(u):t.unshift(u)}function l(h,f){t.length>1&&t.sort(h||Np),n.length>1&&n.sort(f||Ol),s.length>1&&s.sort(f||Ol)}function d(){for(let h=e,f=i.length;h<f;h++){const m=i[h];if(m.id===null)break;m.id=null,m.object=null,m.geometry=null,m.material=null,m.group=null}}return{opaque:t,transmissive:n,transparent:s,init:r,push:o,unshift:c,finish:d,sort:l}}function Op(){let i=new WeakMap;function e(n,s){const r=i.get(n);let a;return r===void 0?(a=new Fl,i.set(n,[a])):s>=r.length?(a=new Fl,r.push(a)):a=r[s],a}function t(){i=new WeakMap}return{get:e,dispose:t}}function Fp(){const i={};return{get:function(e){if(i[e.id]!==void 0)return i[e.id];let t;switch(e.type){case"DirectionalLight":t={direction:new U,color:new De};break;case"SpotLight":t={position:new U,direction:new U,color:new De,distance:0,coneCos:0,penumbraCos:0,decay:0};break;case"PointLight":t={position:new U,color:new De,distance:0,decay:0};break;case"HemisphereLight":t={direction:new U,skyColor:new De,groundColor:new De};break;case"RectAreaLight":t={color:new De,position:new U,halfWidth:new U,halfHeight:new U};break}return i[e.id]=t,t}}}function zp(){const i={};return{get:function(e){if(i[e.id]!==void 0)return i[e.id];let t;switch(e.type){case"DirectionalLight":t={shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new qe};break;case"SpotLight":t={shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new qe};break;case"PointLight":t={shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new qe,shadowCameraNear:1,shadowCameraFar:1e3};break}return i[e.id]=t,t}}}let Bp=0;function kp(i,e){return(e.castShadow?2:0)-(i.castShadow?2:0)+(e.map?1:0)-(i.map?1:0)}function Hp(i,e){const t=new Fp,n=zp(),s={version:0,hash:{directionalLength:-1,pointLength:-1,spotLength:-1,rectAreaLength:-1,hemiLength:-1,numDirectionalShadows:-1,numPointShadows:-1,numSpotShadows:-1,numSpotMaps:-1,numLightProbes:-1},ambient:[0,0,0],probe:[],directional:[],directionalShadow:[],directionalShadowMap:[],directionalShadowMatrix:[],spot:[],spotLightMap:[],spotShadow:[],spotShadowMap:[],spotLightMatrix:[],rectArea:[],rectAreaLTC1:null,rectAreaLTC2:null,point:[],pointShadow:[],pointShadowMap:[],pointShadowMatrix:[],hemi:[],numSpotLightShadowsWithMaps:0,numLightProbes:0};for(let d=0;d<9;d++)s.probe.push(new U);const r=new U,a=new lt,o=new lt;function c(d,h){let f=0,m=0,g=0;for(let $=0;$<9;$++)s.probe[$].set(0,0,0);let _=0,p=0,u=0,M=0,x=0,T=0,C=0,w=0,A=0,X=0,S=0;d.sort(kp);const b=h===!0?Math.PI:1;for(let $=0,se=d.length;$<se;$++){const L=d[$],z=L.color,G=L.intensity,Y=L.distance,V=L.shadow&&L.shadow.map?L.shadow.map.texture:null;if(L.isAmbientLight)f+=z.r*G*b,m+=z.g*G*b,g+=z.b*G*b;else if(L.isLightProbe){for(let D=0;D<9;D++)s.probe[D].addScaledVector(L.sh.coefficients[D],G);S++}else if(L.isDirectionalLight){const D=t.get(L);if(D.color.copy(L.color).multiplyScalar(L.intensity*b),L.castShadow){const W=L.shadow,q=n.get(L);q.shadowBias=W.bias,q.shadowNormalBias=W.normalBias,q.shadowRadius=W.radius,q.shadowMapSize=W.mapSize,s.directionalShadow[_]=q,s.directionalShadowMap[_]=V,s.directionalShadowMatrix[_]=L.shadow.matrix,T++}s.directional[_]=D,_++}else if(L.isSpotLight){const D=t.get(L);D.position.setFromMatrixPosition(L.matrixWorld),D.color.copy(z).multiplyScalar(G*b),D.distance=Y,D.coneCos=Math.cos(L.angle),D.penumbraCos=Math.cos(L.angle*(1-L.penumbra)),D.decay=L.decay,s.spot[u]=D;const W=L.shadow;if(L.map&&(s.spotLightMap[A]=L.map,A++,W.updateMatrices(L),L.castShadow&&X++),s.spotLightMatrix[u]=W.matrix,L.castShadow){const q=n.get(L);q.shadowBias=W.bias,q.shadowNormalBias=W.normalBias,q.shadowRadius=W.radius,q.shadowMapSize=W.mapSize,s.spotShadow[u]=q,s.spotShadowMap[u]=V,w++}u++}else if(L.isRectAreaLight){const D=t.get(L);D.color.copy(z).multiplyScalar(G),D.halfWidth.set(L.width*.5,0,0),D.halfHeight.set(0,L.height*.5,0),s.rectArea[M]=D,M++}else if(L.isPointLight){const D=t.get(L);if(D.color.copy(L.color).multiplyScalar(L.intensity*b),D.distance=L.distance,D.decay=L.decay,L.castShadow){const W=L.shadow,q=n.get(L);q.shadowBias=W.bias,q.shadowNormalBias=W.normalBias,q.shadowRadius=W.radius,q.shadowMapSize=W.mapSize,q.shadowCameraNear=W.camera.near,q.shadowCameraFar=W.camera.far,s.pointShadow[p]=q,s.pointShadowMap[p]=V,s.pointShadowMatrix[p]=L.shadow.matrix,C++}s.point[p]=D,p++}else if(L.isHemisphereLight){const D=t.get(L);D.skyColor.copy(L.color).multiplyScalar(G*b),D.groundColor.copy(L.groundColor).multiplyScalar(G*b),s.hemi[x]=D,x++}}M>0&&(e.isWebGL2?i.has("OES_texture_float_linear")===!0?(s.rectAreaLTC1=te.LTC_FLOAT_1,s.rectAreaLTC2=te.LTC_FLOAT_2):(s.rectAreaLTC1=te.LTC_HALF_1,s.rectAreaLTC2=te.LTC_HALF_2):i.has("OES_texture_float_linear")===!0?(s.rectAreaLTC1=te.LTC_FLOAT_1,s.rectAreaLTC2=te.LTC_FLOAT_2):i.has("OES_texture_half_float_linear")===!0?(s.rectAreaLTC1=te.LTC_HALF_1,s.rectAreaLTC2=te.LTC_HALF_2):console.error("THREE.WebGLRenderer: Unable to use RectAreaLight. Missing WebGL extensions.")),s.ambient[0]=f,s.ambient[1]=m,s.ambient[2]=g;const k=s.hash;(k.directionalLength!==_||k.pointLength!==p||k.spotLength!==u||k.rectAreaLength!==M||k.hemiLength!==x||k.numDirectionalShadows!==T||k.numPointShadows!==C||k.numSpotShadows!==w||k.numSpotMaps!==A||k.numLightProbes!==S)&&(s.directional.length=_,s.spot.length=u,s.rectArea.length=M,s.point.length=p,s.hemi.length=x,s.directionalShadow.length=T,s.directionalShadowMap.length=T,s.pointShadow.length=C,s.pointShadowMap.length=C,s.spotShadow.length=w,s.spotShadowMap.length=w,s.directionalShadowMatrix.length=T,s.pointShadowMatrix.length=C,s.spotLightMatrix.length=w+A-X,s.spotLightMap.length=A,s.numSpotLightShadowsWithMaps=X,s.numLightProbes=S,k.directionalLength=_,k.pointLength=p,k.spotLength=u,k.rectAreaLength=M,k.hemiLength=x,k.numDirectionalShadows=T,k.numPointShadows=C,k.numSpotShadows=w,k.numSpotMaps=A,k.numLightProbes=S,s.version=Bp++)}function l(d,h){let f=0,m=0,g=0,_=0,p=0;const u=h.matrixWorldInverse;for(let M=0,x=d.length;M<x;M++){const T=d[M];if(T.isDirectionalLight){const C=s.directional[f];C.direction.setFromMatrixPosition(T.matrixWorld),r.setFromMatrixPosition(T.target.matrixWorld),C.direction.sub(r),C.direction.transformDirection(u),f++}else if(T.isSpotLight){const C=s.spot[g];C.position.setFromMatrixPosition(T.matrixWorld),C.position.applyMatrix4(u),C.direction.setFromMatrixPosition(T.matrixWorld),r.setFromMatrixPosition(T.target.matrixWorld),C.direction.sub(r),C.direction.transformDirection(u),g++}else if(T.isRectAreaLight){const C=s.rectArea[_];C.position.setFromMatrixPosition(T.matrixWorld),C.position.applyMatrix4(u),o.identity(),a.copy(T.matrixWorld),a.premultiply(u),o.extractRotation(a),C.halfWidth.set(T.width*.5,0,0),C.halfHeight.set(0,T.height*.5,0),C.halfWidth.applyMatrix4(o),C.halfHeight.applyMatrix4(o),_++}else if(T.isPointLight){const C=s.point[m];C.position.setFromMatrixPosition(T.matrixWorld),C.position.applyMatrix4(u),m++}else if(T.isHemisphereLight){const C=s.hemi[p];C.direction.setFromMatrixPosition(T.matrixWorld),C.direction.transformDirection(u),p++}}}return{setup:c,setupView:l,state:s}}function zl(i,e){const t=new Hp(i,e),n=[],s=[];function r(){n.length=0,s.length=0}function a(h){n.push(h)}function o(h){s.push(h)}function c(h){t.setup(n,h)}function l(h){t.setupView(n,h)}return{init:r,state:{lightsArray:n,shadowsArray:s,lights:t},setupLights:c,setupLightsView:l,pushLight:a,pushShadow:o}}function Gp(i,e){let t=new WeakMap;function n(r,a=0){const o=t.get(r);let c;return o===void 0?(c=new zl(i,e),t.set(r,[c])):a>=o.length?(c=new zl(i,e),o.push(c)):c=o[a],c}function s(){t=new WeakMap}return{get:n,dispose:s}}class Vp extends Mi{constructor(e){super(),this.isMeshDepthMaterial=!0,this.type="MeshDepthMaterial",this.depthPacking=vu,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.wireframe=!1,this.wireframeLinewidth=1,this.setValues(e)}copy(e){return super.copy(e),this.depthPacking=e.depthPacking,this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this}}class Wp extends Mi{constructor(e){super(),this.isMeshDistanceMaterial=!0,this.type="MeshDistanceMaterial",this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.setValues(e)}copy(e){return super.copy(e),this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this}}const Xp=`void main() {
	gl_Position = vec4( position, 1.0 );
}`,jp=`uniform sampler2D shadow_pass;
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
}`;function qp(i,e,t){let n=new jr;const s=new qe,r=new qe,a=new pt,o=new Vp({depthPacking:Mu}),c=new Wp,l={},d=t.maxTextureSize,h={[Tn]:Ut,[Ut]:Tn,[cn]:cn},f=new $n({defines:{VSM_SAMPLES:8},uniforms:{shadow_pass:{value:null},resolution:{value:new qe},radius:{value:4}},vertexShader:Xp,fragmentShader:jp}),m=f.clone();m.defines.HORIZONTAL_PASS=1;const g=new _n;g.setAttribute("position",new tn(new Float32Array([-1,-1,.5,3,-1,.5,-1,3,.5]),3));const _=new jt(g,f),p=this;this.enabled=!1,this.autoUpdate=!0,this.needsUpdate=!1,this.type=Bo;let u=this.type;this.render=function(w,A,X){if(p.enabled===!1||p.autoUpdate===!1&&p.needsUpdate===!1||w.length===0)return;const S=i.getRenderTarget(),b=i.getActiveCubeFace(),k=i.getActiveMipmapLevel(),$=i.state;$.setBlending(wn),$.buffers.color.setClear(1,1,1,1),$.buffers.depth.setTest(!0),$.setScissorTest(!1);const se=u!==ln&&this.type===ln,L=u===ln&&this.type!==ln;for(let z=0,G=w.length;z<G;z++){const Y=w[z],V=Y.shadow;if(V===void 0){console.warn("THREE.WebGLShadowMap:",Y,"has no shadow.");continue}if(V.autoUpdate===!1&&V.needsUpdate===!1)continue;s.copy(V.mapSize);const D=V.getFrameExtents();if(s.multiply(D),r.copy(V.mapSize),(s.x>d||s.y>d)&&(s.x>d&&(r.x=Math.floor(d/D.x),s.x=r.x*D.x,V.mapSize.x=r.x),s.y>d&&(r.y=Math.floor(d/D.y),s.y=r.y*D.y,V.mapSize.y=r.y)),V.map===null||se===!0||L===!0){const q=this.type!==ln?{minFilter:wt,magFilter:wt}:{};V.map!==null&&V.map.dispose(),V.map=new Xn(s.x,s.y,q),V.map.texture.name=Y.name+".shadowMap",V.camera.updateProjectionMatrix()}i.setRenderTarget(V.map),i.clear();const W=V.getViewportCount();for(let q=0;q<W;q++){const le=V.getViewport(q);a.set(r.x*le.x,r.y*le.y,r.x*le.z,r.y*le.w),$.viewport(a),V.updateMatrices(Y,q),n=V.getFrustum(),T(A,X,V.camera,Y,this.type)}V.isPointLightShadow!==!0&&this.type===ln&&M(V,X),V.needsUpdate=!1}u=this.type,p.needsUpdate=!1,i.setRenderTarget(S,b,k)};function M(w,A){const X=e.update(_);f.defines.VSM_SAMPLES!==w.blurSamples&&(f.defines.VSM_SAMPLES=w.blurSamples,m.defines.VSM_SAMPLES=w.blurSamples,f.needsUpdate=!0,m.needsUpdate=!0),w.mapPass===null&&(w.mapPass=new Xn(s.x,s.y)),f.uniforms.shadow_pass.value=w.map.texture,f.uniforms.resolution.value=w.mapSize,f.uniforms.radius.value=w.radius,i.setRenderTarget(w.mapPass),i.clear(),i.renderBufferDirect(A,null,X,f,_,null),m.uniforms.shadow_pass.value=w.mapPass.texture,m.uniforms.resolution.value=w.mapSize,m.uniforms.radius.value=w.radius,i.setRenderTarget(w.map),i.clear(),i.renderBufferDirect(A,null,X,m,_,null)}function x(w,A,X,S){let b=null;const k=X.isPointLight===!0?w.customDistanceMaterial:w.customDepthMaterial;if(k!==void 0)b=k;else if(b=X.isPointLight===!0?c:o,i.localClippingEnabled&&A.clipShadows===!0&&Array.isArray(A.clippingPlanes)&&A.clippingPlanes.length!==0||A.displacementMap&&A.displacementScale!==0||A.alphaMap&&A.alphaTest>0||A.map&&A.alphaTest>0){const $=b.uuid,se=A.uuid;let L=l[$];L===void 0&&(L={},l[$]=L);let z=L[se];z===void 0&&(z=b.clone(),L[se]=z,A.addEventListener("dispose",C)),b=z}if(b.visible=A.visible,b.wireframe=A.wireframe,S===ln?b.side=A.shadowSide!==null?A.shadowSide:A.side:b.side=A.shadowSide!==null?A.shadowSide:h[A.side],b.alphaMap=A.alphaMap,b.alphaTest=A.alphaTest,b.map=A.map,b.clipShadows=A.clipShadows,b.clippingPlanes=A.clippingPlanes,b.clipIntersection=A.clipIntersection,b.displacementMap=A.displacementMap,b.displacementScale=A.displacementScale,b.displacementBias=A.displacementBias,b.wireframeLinewidth=A.wireframeLinewidth,b.linewidth=A.linewidth,X.isPointLight===!0&&b.isMeshDistanceMaterial===!0){const $=i.properties.get(b);$.light=X}return b}function T(w,A,X,S,b){if(w.visible===!1)return;if(w.layers.test(A.layers)&&(w.isMesh||w.isLine||w.isPoints)&&(w.castShadow||w.receiveShadow&&b===ln)&&(!w.frustumCulled||n.intersectsObject(w))){w.modelViewMatrix.multiplyMatrices(X.matrixWorldInverse,w.matrixWorld);const se=e.update(w),L=w.material;if(Array.isArray(L)){const z=se.groups;for(let G=0,Y=z.length;G<Y;G++){const V=z[G],D=L[V.materialIndex];if(D&&D.visible){const W=x(w,D,S,b);w.onBeforeShadow(i,w,A,X,se,W,V),i.renderBufferDirect(X,null,se,W,w,V),w.onAfterShadow(i,w,A,X,se,W,V)}}}else if(L.visible){const z=x(w,L,S,b);w.onBeforeShadow(i,w,A,X,se,z,null),i.renderBufferDirect(X,null,se,z,w,null),w.onAfterShadow(i,w,A,X,se,z,null)}}const $=w.children;for(let se=0,L=$.length;se<L;se++)T($[se],A,X,S,b)}function C(w){w.target.removeEventListener("dispose",C);for(const X in l){const S=l[X],b=w.target.uuid;b in S&&(S[b].dispose(),delete S[b])}}}function Yp(i,e,t){const n=t.isWebGL2;function s(){let R=!1;const oe=new pt;let ae=null;const we=new pt(0,0,0,0);return{setMask:function(ye){ae!==ye&&!R&&(i.colorMask(ye,ye,ye,ye),ae=ye)},setLocked:function(ye){R=ye},setClear:function(ye,Je,Qe,xt,Pt){Pt===!0&&(ye*=xt,Je*=xt,Qe*=xt),oe.set(ye,Je,Qe,xt),we.equals(oe)===!1&&(i.clearColor(ye,Je,Qe,xt),we.copy(oe))},reset:function(){R=!1,ae=null,we.set(-1,0,0,0)}}}function r(){let R=!1,oe=null,ae=null,we=null;return{setTest:function(ye){ye?Oe(i.DEPTH_TEST):Te(i.DEPTH_TEST)},setMask:function(ye){oe!==ye&&!R&&(i.depthMask(ye),oe=ye)},setFunc:function(ye){if(ae!==ye){switch(ye){case $c:i.depthFunc(i.NEVER);break;case Zc:i.depthFunc(i.ALWAYS);break;case Kc:i.depthFunc(i.LESS);break;case os:i.depthFunc(i.LEQUAL);break;case Jc:i.depthFunc(i.EQUAL);break;case Qc:i.depthFunc(i.GEQUAL);break;case eu:i.depthFunc(i.GREATER);break;case tu:i.depthFunc(i.NOTEQUAL);break;default:i.depthFunc(i.LEQUAL)}ae=ye}},setLocked:function(ye){R=ye},setClear:function(ye){we!==ye&&(i.clearDepth(ye),we=ye)},reset:function(){R=!1,oe=null,ae=null,we=null}}}function a(){let R=!1,oe=null,ae=null,we=null,ye=null,Je=null,Qe=null,xt=null,Pt=null;return{setTest:function(et){R||(et?Oe(i.STENCIL_TEST):Te(i.STENCIL_TEST))},setMask:function(et){oe!==et&&!R&&(i.stencilMask(et),oe=et)},setFunc:function(et,Dt,an){(ae!==et||we!==Dt||ye!==an)&&(i.stencilFunc(et,Dt,an),ae=et,we=Dt,ye=an)},setOp:function(et,Dt,an){(Je!==et||Qe!==Dt||xt!==an)&&(i.stencilOp(et,Dt,an),Je=et,Qe=Dt,xt=an)},setLocked:function(et){R=et},setClear:function(et){Pt!==et&&(i.clearStencil(et),Pt=et)},reset:function(){R=!1,oe=null,ae=null,we=null,ye=null,Je=null,Qe=null,xt=null,Pt=null}}}const o=new s,c=new r,l=new a,d=new WeakMap,h=new WeakMap;let f={},m={},g=new WeakMap,_=[],p=null,u=!1,M=null,x=null,T=null,C=null,w=null,A=null,X=null,S=new De(0,0,0),b=0,k=!1,$=null,se=null,L=null,z=null,G=null;const Y=i.getParameter(i.MAX_COMBINED_TEXTURE_IMAGE_UNITS);let V=!1,D=0;const W=i.getParameter(i.VERSION);W.indexOf("WebGL")!==-1?(D=parseFloat(/^WebGL (\d)/.exec(W)[1]),V=D>=1):W.indexOf("OpenGL ES")!==-1&&(D=parseFloat(/^OpenGL ES (\d)/.exec(W)[1]),V=D>=2);let q=null,le={};const H=i.getParameter(i.SCISSOR_BOX),j=i.getParameter(i.VIEWPORT),ue=new pt().fromArray(H),me=new pt().fromArray(j);function xe(R,oe,ae,we){const ye=new Uint8Array(4),Je=i.createTexture();i.bindTexture(R,Je),i.texParameteri(R,i.TEXTURE_MIN_FILTER,i.NEAREST),i.texParameteri(R,i.TEXTURE_MAG_FILTER,i.NEAREST);for(let Qe=0;Qe<ae;Qe++)n&&(R===i.TEXTURE_3D||R===i.TEXTURE_2D_ARRAY)?i.texImage3D(oe,0,i.RGBA,1,1,we,0,i.RGBA,i.UNSIGNED_BYTE,ye):i.texImage2D(oe+Qe,0,i.RGBA,1,1,0,i.RGBA,i.UNSIGNED_BYTE,ye);return Je}const Ue={};Ue[i.TEXTURE_2D]=xe(i.TEXTURE_2D,i.TEXTURE_2D,1),Ue[i.TEXTURE_CUBE_MAP]=xe(i.TEXTURE_CUBE_MAP,i.TEXTURE_CUBE_MAP_POSITIVE_X,6),n&&(Ue[i.TEXTURE_2D_ARRAY]=xe(i.TEXTURE_2D_ARRAY,i.TEXTURE_2D_ARRAY,1,1),Ue[i.TEXTURE_3D]=xe(i.TEXTURE_3D,i.TEXTURE_3D,1,1)),o.setClear(0,0,0,1),c.setClear(1),l.setClear(0),Oe(i.DEPTH_TEST),c.setFunc(os),ze(!1),E(zo),Oe(i.CULL_FACE),pe(wn);function Oe(R){f[R]!==!0&&(i.enable(R),f[R]=!0)}function Te(R){f[R]!==!1&&(i.disable(R),f[R]=!1)}function je(R,oe){return m[R]!==oe?(i.bindFramebuffer(R,oe),m[R]=oe,n&&(R===i.DRAW_FRAMEBUFFER&&(m[i.FRAMEBUFFER]=oe),R===i.FRAMEBUFFER&&(m[i.DRAW_FRAMEBUFFER]=oe)),!0):!1}function I(R,oe){let ae=_,we=!1;if(R)if(ae=g.get(oe),ae===void 0&&(ae=[],g.set(oe,ae)),R.isWebGLMultipleRenderTargets){const ye=R.texture;if(ae.length!==ye.length||ae[0]!==i.COLOR_ATTACHMENT0){for(let Je=0,Qe=ye.length;Je<Qe;Je++)ae[Je]=i.COLOR_ATTACHMENT0+Je;ae.length=ye.length,we=!0}}else ae[0]!==i.COLOR_ATTACHMENT0&&(ae[0]=i.COLOR_ATTACHMENT0,we=!0);else ae[0]!==i.BACK&&(ae[0]=i.BACK,we=!0);we&&(t.isWebGL2?i.drawBuffers(ae):e.get("WEBGL_draw_buffers").drawBuffersWEBGL(ae))}function Lt(R){return p!==R?(i.useProgram(R),p=R,!0):!1}const Me={[Hn]:i.FUNC_ADD,[Ic]:i.FUNC_SUBTRACT,[Nc]:i.FUNC_REVERSE_SUBTRACT};if(n)Me[Wo]=i.MIN,Me[Xo]=i.MAX;else{const R=e.get("EXT_blend_minmax");R!==null&&(Me[Wo]=R.MIN_EXT,Me[Xo]=R.MAX_EXT)}const Le={[Oc]:i.ZERO,[Fc]:i.ONE,[zc]:i.SRC_COLOR,[dr]:i.SRC_ALPHA,[Wc]:i.SRC_ALPHA_SATURATE,[Gc]:i.DST_COLOR,[kc]:i.DST_ALPHA,[Bc]:i.ONE_MINUS_SRC_COLOR,[hr]:i.ONE_MINUS_SRC_ALPHA,[Vc]:i.ONE_MINUS_DST_COLOR,[Hc]:i.ONE_MINUS_DST_ALPHA,[Xc]:i.CONSTANT_COLOR,[jc]:i.ONE_MINUS_CONSTANT_COLOR,[qc]:i.CONSTANT_ALPHA,[Yc]:i.ONE_MINUS_CONSTANT_ALPHA};function pe(R,oe,ae,we,ye,Je,Qe,xt,Pt,et){if(R===wn){u===!0&&(Te(i.BLEND),u=!1);return}if(u===!1&&(Oe(i.BLEND),u=!0),R!==Uc){if(R!==M||et!==k){if((x!==Hn||w!==Hn)&&(i.blendEquation(i.FUNC_ADD),x=Hn,w=Hn),et)switch(R){case ri:i.blendFuncSeparate(i.ONE,i.ONE_MINUS_SRC_ALPHA,i.ONE,i.ONE_MINUS_SRC_ALPHA);break;case Ho:i.blendFunc(i.ONE,i.ONE);break;case Go:i.blendFuncSeparate(i.ZERO,i.ONE_MINUS_SRC_COLOR,i.ZERO,i.ONE);break;case Vo:i.blendFuncSeparate(i.ZERO,i.SRC_COLOR,i.ZERO,i.SRC_ALPHA);break;default:console.error("THREE.WebGLState: Invalid blending: ",R);break}else switch(R){case ri:i.blendFuncSeparate(i.SRC_ALPHA,i.ONE_MINUS_SRC_ALPHA,i.ONE,i.ONE_MINUS_SRC_ALPHA);break;case Ho:i.blendFunc(i.SRC_ALPHA,i.ONE);break;case Go:i.blendFuncSeparate(i.ZERO,i.ONE_MINUS_SRC_COLOR,i.ZERO,i.ONE);break;case Vo:i.blendFunc(i.ZERO,i.SRC_COLOR);break;default:console.error("THREE.WebGLState: Invalid blending: ",R);break}T=null,C=null,A=null,X=null,S.set(0,0,0),b=0,M=R,k=et}return}ye=ye||oe,Je=Je||ae,Qe=Qe||we,(oe!==x||ye!==w)&&(i.blendEquationSeparate(Me[oe],Me[ye]),x=oe,w=ye),(ae!==T||we!==C||Je!==A||Qe!==X)&&(i.blendFuncSeparate(Le[ae],Le[we],Le[Je],Le[Qe]),T=ae,C=we,A=Je,X=Qe),(xt.equals(S)===!1||Pt!==b)&&(i.blendColor(xt.r,xt.g,xt.b,Pt),S.copy(xt),b=Pt),M=R,k=!1}function nt(R,oe){R.side===cn?Te(i.CULL_FACE):Oe(i.CULL_FACE);let ae=R.side===Ut;oe&&(ae=!ae),ze(ae),R.blending===ri&&R.transparent===!1?pe(wn):pe(R.blending,R.blendEquation,R.blendSrc,R.blendDst,R.blendEquationAlpha,R.blendSrcAlpha,R.blendDstAlpha,R.blendColor,R.blendAlpha,R.premultipliedAlpha),c.setFunc(R.depthFunc),c.setTest(R.depthTest),c.setMask(R.depthWrite),o.setMask(R.colorWrite);const we=R.stencilWrite;l.setTest(we),we&&(l.setMask(R.stencilWriteMask),l.setFunc(R.stencilFunc,R.stencilRef,R.stencilFuncMask),l.setOp(R.stencilFail,R.stencilZFail,R.stencilZPass)),O(R.polygonOffset,R.polygonOffsetFactor,R.polygonOffsetUnits),R.alphaToCoverage===!0?Oe(i.SAMPLE_ALPHA_TO_COVERAGE):Te(i.SAMPLE_ALPHA_TO_COVERAGE)}function ze(R){$!==R&&(R?i.frontFace(i.CW):i.frontFace(i.CCW),$=R)}function E(R){R!==Pc?(Oe(i.CULL_FACE),R!==se&&(R===zo?i.cullFace(i.BACK):R===Dc?i.cullFace(i.FRONT):i.cullFace(i.FRONT_AND_BACK))):Te(i.CULL_FACE),se=R}function v(R){R!==L&&(V&&i.lineWidth(R),L=R)}function O(R,oe,ae){R?(Oe(i.POLYGON_OFFSET_FILL),(z!==oe||G!==ae)&&(i.polygonOffset(oe,ae),z=oe,G=ae)):Te(i.POLYGON_OFFSET_FILL)}function Q(R){R?Oe(i.SCISSOR_TEST):Te(i.SCISSOR_TEST)}function K(R){R===void 0&&(R=i.TEXTURE0+Y-1),q!==R&&(i.activeTexture(R),q=R)}function ee(R,oe,ae){ae===void 0&&(q===null?ae=i.TEXTURE0+Y-1:ae=q);let we=le[ae];we===void 0&&(we={type:void 0,texture:void 0},le[ae]=we),(we.type!==R||we.texture!==oe)&&(q!==ae&&(i.activeTexture(ae),q=ae),i.bindTexture(R,oe||Ue[R]),we.type=R,we.texture=oe)}function ge(){const R=le[q];R!==void 0&&R.type!==void 0&&(i.bindTexture(R.type,null),R.type=void 0,R.texture=void 0)}function ce(){try{i.compressedTexImage2D.apply(i,arguments)}catch(R){console.error("THREE.WebGLState:",R)}}function he(){try{i.compressedTexImage3D.apply(i,arguments)}catch(R){console.error("THREE.WebGLState:",R)}}function be(){try{i.texSubImage2D.apply(i,arguments)}catch(R){console.error("THREE.WebGLState:",R)}}function Be(){try{i.texSubImage3D.apply(i,arguments)}catch(R){console.error("THREE.WebGLState:",R)}}function Z(){try{i.compressedTexSubImage2D.apply(i,arguments)}catch(R){console.error("THREE.WebGLState:",R)}}function Ze(){try{i.compressedTexSubImage3D.apply(i,arguments)}catch(R){console.error("THREE.WebGLState:",R)}}function We(){try{i.texStorage2D.apply(i,arguments)}catch(R){console.error("THREE.WebGLState:",R)}}function Ce(){try{i.texStorage3D.apply(i,arguments)}catch(R){console.error("THREE.WebGLState:",R)}}function ve(){try{i.texImage2D.apply(i,arguments)}catch(R){console.error("THREE.WebGLState:",R)}}function fe(){try{i.texImage3D.apply(i,arguments)}catch(R){console.error("THREE.WebGLState:",R)}}function Fe(R){ue.equals(R)===!1&&(i.scissor(R.x,R.y,R.z,R.w),ue.copy(R))}function Ye(R){me.equals(R)===!1&&(i.viewport(R.x,R.y,R.z,R.w),me.copy(R))}function st(R,oe){let ae=h.get(oe);ae===void 0&&(ae=new WeakMap,h.set(oe,ae));let we=ae.get(R);we===void 0&&(we=i.getUniformBlockIndex(oe,R.name),ae.set(R,we))}function Ge(R,oe){const we=h.get(oe).get(R);d.get(oe)!==we&&(i.uniformBlockBinding(oe,we,R.__bindingPointIndex),d.set(oe,we))}function ie(){i.disable(i.BLEND),i.disable(i.CULL_FACE),i.disable(i.DEPTH_TEST),i.disable(i.POLYGON_OFFSET_FILL),i.disable(i.SCISSOR_TEST),i.disable(i.STENCIL_TEST),i.disable(i.SAMPLE_ALPHA_TO_COVERAGE),i.blendEquation(i.FUNC_ADD),i.blendFunc(i.ONE,i.ZERO),i.blendFuncSeparate(i.ONE,i.ZERO,i.ONE,i.ZERO),i.blendColor(0,0,0,0),i.colorMask(!0,!0,!0,!0),i.clearColor(0,0,0,0),i.depthMask(!0),i.depthFunc(i.LESS),i.clearDepth(1),i.stencilMask(4294967295),i.stencilFunc(i.ALWAYS,0,4294967295),i.stencilOp(i.KEEP,i.KEEP,i.KEEP),i.clearStencil(0),i.cullFace(i.BACK),i.frontFace(i.CCW),i.polygonOffset(0,0),i.activeTexture(i.TEXTURE0),i.bindFramebuffer(i.FRAMEBUFFER,null),n===!0&&(i.bindFramebuffer(i.DRAW_FRAMEBUFFER,null),i.bindFramebuffer(i.READ_FRAMEBUFFER,null)),i.useProgram(null),i.lineWidth(1),i.scissor(0,0,i.canvas.width,i.canvas.height),i.viewport(0,0,i.canvas.width,i.canvas.height),f={},q=null,le={},m={},g=new WeakMap,_=[],p=null,u=!1,M=null,x=null,T=null,C=null,w=null,A=null,X=null,S=new De(0,0,0),b=0,k=!1,$=null,se=null,L=null,z=null,G=null,ue.set(0,0,i.canvas.width,i.canvas.height),me.set(0,0,i.canvas.width,i.canvas.height),o.reset(),c.reset(),l.reset()}return{buffers:{color:o,depth:c,stencil:l},enable:Oe,disable:Te,bindFramebuffer:je,drawBuffers:I,useProgram:Lt,setBlending:pe,setMaterial:nt,setFlipSided:ze,setCullFace:E,setLineWidth:v,setPolygonOffset:O,setScissorTest:Q,activeTexture:K,bindTexture:ee,unbindTexture:ge,compressedTexImage2D:ce,compressedTexImage3D:he,texImage2D:ve,texImage3D:fe,updateUBOMapping:st,uniformBlockBinding:Ge,texStorage2D:We,texStorage3D:Ce,texSubImage2D:be,texSubImage3D:Be,compressedTexSubImage2D:Z,compressedTexSubImage3D:Ze,scissor:Fe,viewport:Ye,reset:ie}}function $p(i,e,t,n,s,r,a){const o=s.isWebGL2,c=e.has("WEBGL_multisampled_render_to_texture")?e.get("WEBGL_multisampled_render_to_texture"):null,l=typeof navigator>"u"?!1:/OculusBrowser/g.test(navigator.userAgent),d=new WeakMap;let h;const f=new WeakMap;let m=!1;try{m=typeof OffscreenCanvas<"u"&&new OffscreenCanvas(1,1).getContext("2d")!==null}catch{}function g(E,v){return m?new OffscreenCanvas(E,v):ji("canvas")}function _(E,v,O,Q){let K=1;if((E.width>Q||E.height>Q)&&(K=Q/Math.max(E.width,E.height)),K<1||v===!0)if(typeof HTMLImageElement<"u"&&E instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&E instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&E instanceof ImageBitmap){const ee=v?Rr:Math.floor,ge=ee(K*E.width),ce=ee(K*E.height);h===void 0&&(h=g(ge,ce));const he=O?g(ge,ce):h;return he.width=ge,he.height=ce,he.getContext("2d").drawImage(E,0,0,ge,ce),console.warn("THREE.WebGLRenderer: Texture has been resized from ("+E.width+"x"+E.height+") to ("+ge+"x"+ce+")."),he}else return"data"in E&&console.warn("THREE.WebGLRenderer: Image in DataTexture is too big ("+E.width+"x"+E.height+")."),E;return E}function p(E){return Ua(E.width)&&Ua(E.height)}function u(E){return o?!1:E.wrapS!==Gt||E.wrapT!==Gt||E.minFilter!==wt&&E.minFilter!==Vt}function M(E,v){return E.generateMipmaps&&v&&E.minFilter!==wt&&E.minFilter!==Vt}function x(E){i.generateMipmap(E)}function T(E,v,O,Q,K=!1){if(o===!1)return v;if(E!==null){if(i[E]!==void 0)return i[E];console.warn("THREE.WebGLRenderer: Attempt to use non-existing WebGL internal format '"+E+"'")}let ee=v;if(v===i.RED&&(O===i.FLOAT&&(ee=i.R32F),O===i.HALF_FLOAT&&(ee=i.R16F),O===i.UNSIGNED_BYTE&&(ee=i.R8)),v===i.RED_INTEGER&&(O===i.UNSIGNED_BYTE&&(ee=i.R8UI),O===i.UNSIGNED_SHORT&&(ee=i.R16UI),O===i.UNSIGNED_INT&&(ee=i.R32UI),O===i.BYTE&&(ee=i.R8I),O===i.SHORT&&(ee=i.R16I),O===i.INT&&(ee=i.R32I)),v===i.RG&&(O===i.FLOAT&&(ee=i.RG32F),O===i.HALF_FLOAT&&(ee=i.RG16F),O===i.UNSIGNED_BYTE&&(ee=i.RG8)),v===i.RGBA){const ge=K?us:$e.getTransfer(Q);O===i.FLOAT&&(ee=i.RGBA32F),O===i.HALF_FLOAT&&(ee=i.RGBA16F),O===i.UNSIGNED_BYTE&&(ee=ge===tt?i.SRGB8_ALPHA8:i.RGBA8),O===i.UNSIGNED_SHORT_4_4_4_4&&(ee=i.RGBA4),O===i.UNSIGNED_SHORT_5_5_5_1&&(ee=i.RGB5_A1)}return(ee===i.R16F||ee===i.R32F||ee===i.RG16F||ee===i.RG32F||ee===i.RGBA16F||ee===i.RGBA32F)&&e.get("EXT_color_buffer_float"),ee}function C(E,v,O){return M(E,O)===!0||E.isFramebufferTexture&&E.minFilter!==wt&&E.minFilter!==Vt?Math.log2(Math.max(v.width,v.height))+1:E.mipmaps!==void 0&&E.mipmaps.length>0?E.mipmaps.length:E.isCompressedTexture&&Array.isArray(E.image)?v.mipmaps.length:1}function w(E){return E===wt||E===Yo||E===gr?i.NEAREST:i.LINEAR}function A(E){const v=E.target;v.removeEventListener("dispose",A),S(v),v.isVideoTexture&&d.delete(v)}function X(E){const v=E.target;v.removeEventListener("dispose",X),k(v)}function S(E){const v=n.get(E);if(v.__webglInit===void 0)return;const O=E.source,Q=f.get(O);if(Q){const K=Q[v.__cacheKey];K.usedTimes--,K.usedTimes===0&&b(E),Object.keys(Q).length===0&&f.delete(O)}n.remove(E)}function b(E){const v=n.get(E);i.deleteTexture(v.__webglTexture);const O=E.source,Q=f.get(O);delete Q[v.__cacheKey],a.memory.textures--}function k(E){const v=E.texture,O=n.get(E),Q=n.get(v);if(Q.__webglTexture!==void 0&&(i.deleteTexture(Q.__webglTexture),a.memory.textures--),E.depthTexture&&E.depthTexture.dispose(),E.isWebGLCubeRenderTarget)for(let K=0;K<6;K++){if(Array.isArray(O.__webglFramebuffer[K]))for(let ee=0;ee<O.__webglFramebuffer[K].length;ee++)i.deleteFramebuffer(O.__webglFramebuffer[K][ee]);else i.deleteFramebuffer(O.__webglFramebuffer[K]);O.__webglDepthbuffer&&i.deleteRenderbuffer(O.__webglDepthbuffer[K])}else{if(Array.isArray(O.__webglFramebuffer))for(let K=0;K<O.__webglFramebuffer.length;K++)i.deleteFramebuffer(O.__webglFramebuffer[K]);else i.deleteFramebuffer(O.__webglFramebuffer);if(O.__webglDepthbuffer&&i.deleteRenderbuffer(O.__webglDepthbuffer),O.__webglMultisampledFramebuffer&&i.deleteFramebuffer(O.__webglMultisampledFramebuffer),O.__webglColorRenderbuffer)for(let K=0;K<O.__webglColorRenderbuffer.length;K++)O.__webglColorRenderbuffer[K]&&i.deleteRenderbuffer(O.__webglColorRenderbuffer[K]);O.__webglDepthRenderbuffer&&i.deleteRenderbuffer(O.__webglDepthRenderbuffer)}if(E.isWebGLMultipleRenderTargets)for(let K=0,ee=v.length;K<ee;K++){const ge=n.get(v[K]);ge.__webglTexture&&(i.deleteTexture(ge.__webglTexture),a.memory.textures--),n.remove(v[K])}n.remove(v),n.remove(E)}let $=0;function se(){$=0}function L(){const E=$;return E>=s.maxTextures&&console.warn("THREE.WebGLTextures: Trying to use "+E+" texture units while this GPU supports only "+s.maxTextures),$+=1,E}function z(E){const v=[];return v.push(E.wrapS),v.push(E.wrapT),v.push(E.wrapR||0),v.push(E.magFilter),v.push(E.minFilter),v.push(E.anisotropy),v.push(E.internalFormat),v.push(E.format),v.push(E.type),v.push(E.generateMipmaps),v.push(E.premultiplyAlpha),v.push(E.flipY),v.push(E.unpackAlignment),v.push(E.colorSpace),v.join()}function G(E,v){const O=n.get(E);if(E.isVideoTexture&&nt(E),E.isRenderTargetTexture===!1&&E.version>0&&O.__version!==E.version){const Q=E.image;if(Q===null)console.warn("THREE.WebGLRenderer: Texture marked for update but no image data found.");else if(Q.complete===!1)console.warn("THREE.WebGLRenderer: Texture marked for update but image is incomplete");else{ue(O,E,v);return}}t.bindTexture(i.TEXTURE_2D,O.__webglTexture,i.TEXTURE0+v)}function Y(E,v){const O=n.get(E);if(E.version>0&&O.__version!==E.version){ue(O,E,v);return}t.bindTexture(i.TEXTURE_2D_ARRAY,O.__webglTexture,i.TEXTURE0+v)}function V(E,v){const O=n.get(E);if(E.version>0&&O.__version!==E.version){ue(O,E,v);return}t.bindTexture(i.TEXTURE_3D,O.__webglTexture,i.TEXTURE0+v)}function D(E,v){const O=n.get(E);if(E.version>0&&O.__version!==E.version){me(O,E,v);return}t.bindTexture(i.TEXTURE_CUBE_MAP,O.__webglTexture,i.TEXTURE0+v)}const W={[ls]:i.REPEAT,[Gt]:i.CLAMP_TO_EDGE,[mr]:i.MIRRORED_REPEAT},q={[wt]:i.NEAREST,[Yo]:i.NEAREST_MIPMAP_NEAREST,[gr]:i.NEAREST_MIPMAP_LINEAR,[Vt]:i.LINEAR,[uu]:i.LINEAR_MIPMAP_NEAREST,[Gi]:i.LINEAR_MIPMAP_LINEAR},le={[Su]:i.NEVER,[Ru]:i.ALWAYS,[Eu]:i.LESS,[La]:i.LEQUAL,[bu]:i.EQUAL,[Au]:i.GEQUAL,[Tu]:i.GREATER,[wu]:i.NOTEQUAL};function H(E,v,O){if(O?(i.texParameteri(E,i.TEXTURE_WRAP_S,W[v.wrapS]),i.texParameteri(E,i.TEXTURE_WRAP_T,W[v.wrapT]),(E===i.TEXTURE_3D||E===i.TEXTURE_2D_ARRAY)&&i.texParameteri(E,i.TEXTURE_WRAP_R,W[v.wrapR]),i.texParameteri(E,i.TEXTURE_MAG_FILTER,q[v.magFilter]),i.texParameteri(E,i.TEXTURE_MIN_FILTER,q[v.minFilter])):(i.texParameteri(E,i.TEXTURE_WRAP_S,i.CLAMP_TO_EDGE),i.texParameteri(E,i.TEXTURE_WRAP_T,i.CLAMP_TO_EDGE),(E===i.TEXTURE_3D||E===i.TEXTURE_2D_ARRAY)&&i.texParameteri(E,i.TEXTURE_WRAP_R,i.CLAMP_TO_EDGE),(v.wrapS!==Gt||v.wrapT!==Gt)&&console.warn("THREE.WebGLRenderer: Texture is not power of two. Texture.wrapS and Texture.wrapT should be set to THREE.ClampToEdgeWrapping."),i.texParameteri(E,i.TEXTURE_MAG_FILTER,w(v.magFilter)),i.texParameteri(E,i.TEXTURE_MIN_FILTER,w(v.minFilter)),v.minFilter!==wt&&v.minFilter!==Vt&&console.warn("THREE.WebGLRenderer: Texture is not power of two. Texture.minFilter should be set to THREE.NearestFilter or THREE.LinearFilter.")),v.compareFunction&&(i.texParameteri(E,i.TEXTURE_COMPARE_MODE,i.COMPARE_REF_TO_TEXTURE),i.texParameteri(E,i.TEXTURE_COMPARE_FUNC,le[v.compareFunction])),e.has("EXT_texture_filter_anisotropic")===!0){const Q=e.get("EXT_texture_filter_anisotropic");if(v.magFilter===wt||v.minFilter!==gr&&v.minFilter!==Gi||v.type===Ln&&e.has("OES_texture_float_linear")===!1||o===!1&&v.type===Vi&&e.has("OES_texture_half_float_linear")===!1)return;(v.anisotropy>1||n.get(v).__currentAnisotropy)&&(i.texParameterf(E,Q.TEXTURE_MAX_ANISOTROPY_EXT,Math.min(v.anisotropy,s.getMaxAnisotropy())),n.get(v).__currentAnisotropy=v.anisotropy)}}function j(E,v){let O=!1;E.__webglInit===void 0&&(E.__webglInit=!0,v.addEventListener("dispose",A));const Q=v.source;let K=f.get(Q);K===void 0&&(K={},f.set(Q,K));const ee=z(v);if(ee!==E.__cacheKey){K[ee]===void 0&&(K[ee]={texture:i.createTexture(),usedTimes:0},a.memory.textures++,O=!0),K[ee].usedTimes++;const ge=K[E.__cacheKey];ge!==void 0&&(K[E.__cacheKey].usedTimes--,ge.usedTimes===0&&b(v)),E.__cacheKey=ee,E.__webglTexture=K[ee].texture}return O}function ue(E,v,O){let Q=i.TEXTURE_2D;(v.isDataArrayTexture||v.isCompressedArrayTexture)&&(Q=i.TEXTURE_2D_ARRAY),v.isData3DTexture&&(Q=i.TEXTURE_3D);const K=j(E,v),ee=v.source;t.bindTexture(Q,E.__webglTexture,i.TEXTURE0+O);const ge=n.get(ee);if(ee.version!==ge.__version||K===!0){t.activeTexture(i.TEXTURE0+O);const ce=$e.getPrimaries($e.workingColorSpace),he=v.colorSpace===Wt?null:$e.getPrimaries(v.colorSpace),be=v.colorSpace===Wt||ce===he?i.NONE:i.BROWSER_DEFAULT_WEBGL;i.pixelStorei(i.UNPACK_FLIP_Y_WEBGL,v.flipY),i.pixelStorei(i.UNPACK_PREMULTIPLY_ALPHA_WEBGL,v.premultiplyAlpha),i.pixelStorei(i.UNPACK_ALIGNMENT,v.unpackAlignment),i.pixelStorei(i.UNPACK_COLORSPACE_CONVERSION_WEBGL,be);const Be=u(v)&&p(v.image)===!1;let Z=_(v.image,Be,!1,s.maxTextureSize);Z=ze(v,Z);const Ze=p(Z)||o,We=r.convert(v.format,v.colorSpace);let Ce=r.convert(v.type),ve=T(v.internalFormat,We,Ce,v.colorSpace,v.isVideoTexture);H(Q,v,Ze);let fe;const Fe=v.mipmaps,Ye=o&&v.isVideoTexture!==!0&&ve!==ra,st=ge.__version===void 0||K===!0,Ge=C(v,Z,Ze);if(v.isDepthTexture)ve=i.DEPTH_COMPONENT,o?v.type===Ln?ve=i.DEPTH_COMPONENT32F:v.type===Cn?ve=i.DEPTH_COMPONENT24:v.type===Gn?ve=i.DEPTH24_STENCIL8:ve=i.DEPTH_COMPONENT16:v.type===Ln&&console.error("WebGLRenderer: Floating point depth texture requires WebGL2."),v.format===Vn&&ve===i.DEPTH_COMPONENT&&v.type!==_r&&v.type!==Cn&&(console.warn("THREE.WebGLRenderer: Use UnsignedShortType or UnsignedIntType for DepthFormat DepthTexture."),v.type=Cn,Ce=r.convert(v.type)),v.format===li&&ve===i.DEPTH_COMPONENT&&(ve=i.DEPTH_STENCIL,v.type!==Gn&&(console.warn("THREE.WebGLRenderer: Use UnsignedInt248Type for DepthStencilFormat DepthTexture."),v.type=Gn,Ce=r.convert(v.type))),st&&(Ye?t.texStorage2D(i.TEXTURE_2D,1,ve,Z.width,Z.height):t.texImage2D(i.TEXTURE_2D,0,ve,Z.width,Z.height,0,We,Ce,null));else if(v.isDataTexture)if(Fe.length>0&&Ze){Ye&&st&&t.texStorage2D(i.TEXTURE_2D,Ge,ve,Fe[0].width,Fe[0].height);for(let ie=0,R=Fe.length;ie<R;ie++)fe=Fe[ie],Ye?t.texSubImage2D(i.TEXTURE_2D,ie,0,0,fe.width,fe.height,We,Ce,fe.data):t.texImage2D(i.TEXTURE_2D,ie,ve,fe.width,fe.height,0,We,Ce,fe.data);v.generateMipmaps=!1}else Ye?(st&&t.texStorage2D(i.TEXTURE_2D,Ge,ve,Z.width,Z.height),t.texSubImage2D(i.TEXTURE_2D,0,0,0,Z.width,Z.height,We,Ce,Z.data)):t.texImage2D(i.TEXTURE_2D,0,ve,Z.width,Z.height,0,We,Ce,Z.data);else if(v.isCompressedTexture)if(v.isCompressedArrayTexture){Ye&&st&&t.texStorage3D(i.TEXTURE_2D_ARRAY,Ge,ve,Fe[0].width,Fe[0].height,Z.depth);for(let ie=0,R=Fe.length;ie<R;ie++)fe=Fe[ie],v.format!==$t?We!==null?Ye?t.compressedTexSubImage3D(i.TEXTURE_2D_ARRAY,ie,0,0,0,fe.width,fe.height,Z.depth,We,fe.data,0,0):t.compressedTexImage3D(i.TEXTURE_2D_ARRAY,ie,ve,fe.width,fe.height,Z.depth,0,fe.data,0,0):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()"):Ye?t.texSubImage3D(i.TEXTURE_2D_ARRAY,ie,0,0,0,fe.width,fe.height,Z.depth,We,Ce,fe.data):t.texImage3D(i.TEXTURE_2D_ARRAY,ie,ve,fe.width,fe.height,Z.depth,0,We,Ce,fe.data)}else{Ye&&st&&t.texStorage2D(i.TEXTURE_2D,Ge,ve,Fe[0].width,Fe[0].height);for(let ie=0,R=Fe.length;ie<R;ie++)fe=Fe[ie],v.format!==$t?We!==null?Ye?t.compressedTexSubImage2D(i.TEXTURE_2D,ie,0,0,fe.width,fe.height,We,fe.data):t.compressedTexImage2D(i.TEXTURE_2D,ie,ve,fe.width,fe.height,0,fe.data):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()"):Ye?t.texSubImage2D(i.TEXTURE_2D,ie,0,0,fe.width,fe.height,We,Ce,fe.data):t.texImage2D(i.TEXTURE_2D,ie,ve,fe.width,fe.height,0,We,Ce,fe.data)}else if(v.isDataArrayTexture)Ye?(st&&t.texStorage3D(i.TEXTURE_2D_ARRAY,Ge,ve,Z.width,Z.height,Z.depth),t.texSubImage3D(i.TEXTURE_2D_ARRAY,0,0,0,0,Z.width,Z.height,Z.depth,We,Ce,Z.data)):t.texImage3D(i.TEXTURE_2D_ARRAY,0,ve,Z.width,Z.height,Z.depth,0,We,Ce,Z.data);else if(v.isData3DTexture)Ye?(st&&t.texStorage3D(i.TEXTURE_3D,Ge,ve,Z.width,Z.height,Z.depth),t.texSubImage3D(i.TEXTURE_3D,0,0,0,0,Z.width,Z.height,Z.depth,We,Ce,Z.data)):t.texImage3D(i.TEXTURE_3D,0,ve,Z.width,Z.height,Z.depth,0,We,Ce,Z.data);else if(v.isFramebufferTexture){if(st)if(Ye)t.texStorage2D(i.TEXTURE_2D,Ge,ve,Z.width,Z.height);else{let ie=Z.width,R=Z.height;for(let oe=0;oe<Ge;oe++)t.texImage2D(i.TEXTURE_2D,oe,ve,ie,R,0,We,Ce,null),ie>>=1,R>>=1}}else if(Fe.length>0&&Ze){Ye&&st&&t.texStorage2D(i.TEXTURE_2D,Ge,ve,Fe[0].width,Fe[0].height);for(let ie=0,R=Fe.length;ie<R;ie++)fe=Fe[ie],Ye?t.texSubImage2D(i.TEXTURE_2D,ie,0,0,We,Ce,fe):t.texImage2D(i.TEXTURE_2D,ie,ve,We,Ce,fe);v.generateMipmaps=!1}else Ye?(st&&t.texStorage2D(i.TEXTURE_2D,Ge,ve,Z.width,Z.height),t.texSubImage2D(i.TEXTURE_2D,0,0,0,We,Ce,Z)):t.texImage2D(i.TEXTURE_2D,0,ve,We,Ce,Z);M(v,Ze)&&x(Q),ge.__version=ee.version,v.onUpdate&&v.onUpdate(v)}E.__version=v.version}function me(E,v,O){if(v.image.length!==6)return;const Q=j(E,v),K=v.source;t.bindTexture(i.TEXTURE_CUBE_MAP,E.__webglTexture,i.TEXTURE0+O);const ee=n.get(K);if(K.version!==ee.__version||Q===!0){t.activeTexture(i.TEXTURE0+O);const ge=$e.getPrimaries($e.workingColorSpace),ce=v.colorSpace===Wt?null:$e.getPrimaries(v.colorSpace),he=v.colorSpace===Wt||ge===ce?i.NONE:i.BROWSER_DEFAULT_WEBGL;i.pixelStorei(i.UNPACK_FLIP_Y_WEBGL,v.flipY),i.pixelStorei(i.UNPACK_PREMULTIPLY_ALPHA_WEBGL,v.premultiplyAlpha),i.pixelStorei(i.UNPACK_ALIGNMENT,v.unpackAlignment),i.pixelStorei(i.UNPACK_COLORSPACE_CONVERSION_WEBGL,he);const be=v.isCompressedTexture||v.image[0].isCompressedTexture,Be=v.image[0]&&v.image[0].isDataTexture,Z=[];for(let ie=0;ie<6;ie++)!be&&!Be?Z[ie]=_(v.image[ie],!1,!0,s.maxCubemapSize):Z[ie]=Be?v.image[ie].image:v.image[ie],Z[ie]=ze(v,Z[ie]);const Ze=Z[0],We=p(Ze)||o,Ce=r.convert(v.format,v.colorSpace),ve=r.convert(v.type),fe=T(v.internalFormat,Ce,ve,v.colorSpace),Fe=o&&v.isVideoTexture!==!0,Ye=ee.__version===void 0||Q===!0;let st=C(v,Ze,We);H(i.TEXTURE_CUBE_MAP,v,We);let Ge;if(be){Fe&&Ye&&t.texStorage2D(i.TEXTURE_CUBE_MAP,st,fe,Ze.width,Ze.height);for(let ie=0;ie<6;ie++){Ge=Z[ie].mipmaps;for(let R=0;R<Ge.length;R++){const oe=Ge[R];v.format!==$t?Ce!==null?Fe?t.compressedTexSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+ie,R,0,0,oe.width,oe.height,Ce,oe.data):t.compressedTexImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+ie,R,fe,oe.width,oe.height,0,oe.data):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .setTextureCube()"):Fe?t.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+ie,R,0,0,oe.width,oe.height,Ce,ve,oe.data):t.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+ie,R,fe,oe.width,oe.height,0,Ce,ve,oe.data)}}}else{Ge=v.mipmaps,Fe&&Ye&&(Ge.length>0&&st++,t.texStorage2D(i.TEXTURE_CUBE_MAP,st,fe,Z[0].width,Z[0].height));for(let ie=0;ie<6;ie++)if(Be){Fe?t.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+ie,0,0,0,Z[ie].width,Z[ie].height,Ce,ve,Z[ie].data):t.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+ie,0,fe,Z[ie].width,Z[ie].height,0,Ce,ve,Z[ie].data);for(let R=0;R<Ge.length;R++){const ae=Ge[R].image[ie].image;Fe?t.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+ie,R+1,0,0,ae.width,ae.height,Ce,ve,ae.data):t.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+ie,R+1,fe,ae.width,ae.height,0,Ce,ve,ae.data)}}else{Fe?t.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+ie,0,0,0,Ce,ve,Z[ie]):t.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+ie,0,fe,Ce,ve,Z[ie]);for(let R=0;R<Ge.length;R++){const oe=Ge[R];Fe?t.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+ie,R+1,0,0,Ce,ve,oe.image[ie]):t.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+ie,R+1,fe,Ce,ve,oe.image[ie])}}}M(v,We)&&x(i.TEXTURE_CUBE_MAP),ee.__version=K.version,v.onUpdate&&v.onUpdate(v)}E.__version=v.version}function xe(E,v,O,Q,K,ee){const ge=r.convert(O.format,O.colorSpace),ce=r.convert(O.type),he=T(O.internalFormat,ge,ce,O.colorSpace);if(!n.get(v).__hasExternalTextures){const Be=Math.max(1,v.width>>ee),Z=Math.max(1,v.height>>ee);K===i.TEXTURE_3D||K===i.TEXTURE_2D_ARRAY?t.texImage3D(K,ee,he,Be,Z,v.depth,0,ge,ce,null):t.texImage2D(K,ee,he,Be,Z,0,ge,ce,null)}t.bindFramebuffer(i.FRAMEBUFFER,E),pe(v)?c.framebufferTexture2DMultisampleEXT(i.FRAMEBUFFER,Q,K,n.get(O).__webglTexture,0,Le(v)):(K===i.TEXTURE_2D||K>=i.TEXTURE_CUBE_MAP_POSITIVE_X&&K<=i.TEXTURE_CUBE_MAP_NEGATIVE_Z)&&i.framebufferTexture2D(i.FRAMEBUFFER,Q,K,n.get(O).__webglTexture,ee),t.bindFramebuffer(i.FRAMEBUFFER,null)}function Ue(E,v,O){if(i.bindRenderbuffer(i.RENDERBUFFER,E),v.depthBuffer&&!v.stencilBuffer){let Q=o===!0?i.DEPTH_COMPONENT24:i.DEPTH_COMPONENT16;if(O||pe(v)){const K=v.depthTexture;K&&K.isDepthTexture&&(K.type===Ln?Q=i.DEPTH_COMPONENT32F:K.type===Cn&&(Q=i.DEPTH_COMPONENT24));const ee=Le(v);pe(v)?c.renderbufferStorageMultisampleEXT(i.RENDERBUFFER,ee,Q,v.width,v.height):i.renderbufferStorageMultisample(i.RENDERBUFFER,ee,Q,v.width,v.height)}else i.renderbufferStorage(i.RENDERBUFFER,Q,v.width,v.height);i.framebufferRenderbuffer(i.FRAMEBUFFER,i.DEPTH_ATTACHMENT,i.RENDERBUFFER,E)}else if(v.depthBuffer&&v.stencilBuffer){const Q=Le(v);O&&pe(v)===!1?i.renderbufferStorageMultisample(i.RENDERBUFFER,Q,i.DEPTH24_STENCIL8,v.width,v.height):pe(v)?c.renderbufferStorageMultisampleEXT(i.RENDERBUFFER,Q,i.DEPTH24_STENCIL8,v.width,v.height):i.renderbufferStorage(i.RENDERBUFFER,i.DEPTH_STENCIL,v.width,v.height),i.framebufferRenderbuffer(i.FRAMEBUFFER,i.DEPTH_STENCIL_ATTACHMENT,i.RENDERBUFFER,E)}else{const Q=v.isWebGLMultipleRenderTargets===!0?v.texture:[v.texture];for(let K=0;K<Q.length;K++){const ee=Q[K],ge=r.convert(ee.format,ee.colorSpace),ce=r.convert(ee.type),he=T(ee.internalFormat,ge,ce,ee.colorSpace),be=Le(v);O&&pe(v)===!1?i.renderbufferStorageMultisample(i.RENDERBUFFER,be,he,v.width,v.height):pe(v)?c.renderbufferStorageMultisampleEXT(i.RENDERBUFFER,be,he,v.width,v.height):i.renderbufferStorage(i.RENDERBUFFER,he,v.width,v.height)}}i.bindRenderbuffer(i.RENDERBUFFER,null)}function Oe(E,v){if(v&&v.isWebGLCubeRenderTarget)throw new Error("Depth Texture with cube render targets is not supported");if(t.bindFramebuffer(i.FRAMEBUFFER,E),!(v.depthTexture&&v.depthTexture.isDepthTexture))throw new Error("renderTarget.depthTexture must be an instance of THREE.DepthTexture");(!n.get(v.depthTexture).__webglTexture||v.depthTexture.image.width!==v.width||v.depthTexture.image.height!==v.height)&&(v.depthTexture.image.width=v.width,v.depthTexture.image.height=v.height,v.depthTexture.needsUpdate=!0),G(v.depthTexture,0);const Q=n.get(v.depthTexture).__webglTexture,K=Le(v);if(v.depthTexture.format===Vn)pe(v)?c.framebufferTexture2DMultisampleEXT(i.FRAMEBUFFER,i.DEPTH_ATTACHMENT,i.TEXTURE_2D,Q,0,K):i.framebufferTexture2D(i.FRAMEBUFFER,i.DEPTH_ATTACHMENT,i.TEXTURE_2D,Q,0);else if(v.depthTexture.format===li)pe(v)?c.framebufferTexture2DMultisampleEXT(i.FRAMEBUFFER,i.DEPTH_STENCIL_ATTACHMENT,i.TEXTURE_2D,Q,0,K):i.framebufferTexture2D(i.FRAMEBUFFER,i.DEPTH_STENCIL_ATTACHMENT,i.TEXTURE_2D,Q,0);else throw new Error("Unknown depthTexture format")}function Te(E){const v=n.get(E),O=E.isWebGLCubeRenderTarget===!0;if(E.depthTexture&&!v.__autoAllocateDepthBuffer){if(O)throw new Error("target.depthTexture not supported in Cube render targets");Oe(v.__webglFramebuffer,E)}else if(O){v.__webglDepthbuffer=[];for(let Q=0;Q<6;Q++)t.bindFramebuffer(i.FRAMEBUFFER,v.__webglFramebuffer[Q]),v.__webglDepthbuffer[Q]=i.createRenderbuffer(),Ue(v.__webglDepthbuffer[Q],E,!1)}else t.bindFramebuffer(i.FRAMEBUFFER,v.__webglFramebuffer),v.__webglDepthbuffer=i.createRenderbuffer(),Ue(v.__webglDepthbuffer,E,!1);t.bindFramebuffer(i.FRAMEBUFFER,null)}function je(E,v,O){const Q=n.get(E);v!==void 0&&xe(Q.__webglFramebuffer,E,E.texture,i.COLOR_ATTACHMENT0,i.TEXTURE_2D,0),O!==void 0&&Te(E)}function I(E){const v=E.texture,O=n.get(E),Q=n.get(v);E.addEventListener("dispose",X),E.isWebGLMultipleRenderTargets!==!0&&(Q.__webglTexture===void 0&&(Q.__webglTexture=i.createTexture()),Q.__version=v.version,a.memory.textures++);const K=E.isWebGLCubeRenderTarget===!0,ee=E.isWebGLMultipleRenderTargets===!0,ge=p(E)||o;if(K){O.__webglFramebuffer=[];for(let ce=0;ce<6;ce++)if(o&&v.mipmaps&&v.mipmaps.length>0){O.__webglFramebuffer[ce]=[];for(let he=0;he<v.mipmaps.length;he++)O.__webglFramebuffer[ce][he]=i.createFramebuffer()}else O.__webglFramebuffer[ce]=i.createFramebuffer()}else{if(o&&v.mipmaps&&v.mipmaps.length>0){O.__webglFramebuffer=[];for(let ce=0;ce<v.mipmaps.length;ce++)O.__webglFramebuffer[ce]=i.createFramebuffer()}else O.__webglFramebuffer=i.createFramebuffer();if(ee)if(s.drawBuffers){const ce=E.texture;for(let he=0,be=ce.length;he<be;he++){const Be=n.get(ce[he]);Be.__webglTexture===void 0&&(Be.__webglTexture=i.createTexture(),a.memory.textures++)}}else console.warn("THREE.WebGLRenderer: WebGLMultipleRenderTargets can only be used with WebGL2 or WEBGL_draw_buffers extension.");if(o&&E.samples>0&&pe(E)===!1){const ce=ee?v:[v];O.__webglMultisampledFramebuffer=i.createFramebuffer(),O.__webglColorRenderbuffer=[],t.bindFramebuffer(i.FRAMEBUFFER,O.__webglMultisampledFramebuffer);for(let he=0;he<ce.length;he++){const be=ce[he];O.__webglColorRenderbuffer[he]=i.createRenderbuffer(),i.bindRenderbuffer(i.RENDERBUFFER,O.__webglColorRenderbuffer[he]);const Be=r.convert(be.format,be.colorSpace),Z=r.convert(be.type),Ze=T(be.internalFormat,Be,Z,be.colorSpace,E.isXRRenderTarget===!0),We=Le(E);i.renderbufferStorageMultisample(i.RENDERBUFFER,We,Ze,E.width,E.height),i.framebufferRenderbuffer(i.FRAMEBUFFER,i.COLOR_ATTACHMENT0+he,i.RENDERBUFFER,O.__webglColorRenderbuffer[he])}i.bindRenderbuffer(i.RENDERBUFFER,null),E.depthBuffer&&(O.__webglDepthRenderbuffer=i.createRenderbuffer(),Ue(O.__webglDepthRenderbuffer,E,!0)),t.bindFramebuffer(i.FRAMEBUFFER,null)}}if(K){t.bindTexture(i.TEXTURE_CUBE_MAP,Q.__webglTexture),H(i.TEXTURE_CUBE_MAP,v,ge);for(let ce=0;ce<6;ce++)if(o&&v.mipmaps&&v.mipmaps.length>0)for(let he=0;he<v.mipmaps.length;he++)xe(O.__webglFramebuffer[ce][he],E,v,i.COLOR_ATTACHMENT0,i.TEXTURE_CUBE_MAP_POSITIVE_X+ce,he);else xe(O.__webglFramebuffer[ce],E,v,i.COLOR_ATTACHMENT0,i.TEXTURE_CUBE_MAP_POSITIVE_X+ce,0);M(v,ge)&&x(i.TEXTURE_CUBE_MAP),t.unbindTexture()}else if(ee){const ce=E.texture;for(let he=0,be=ce.length;he<be;he++){const Be=ce[he],Z=n.get(Be);t.bindTexture(i.TEXTURE_2D,Z.__webglTexture),H(i.TEXTURE_2D,Be,ge),xe(O.__webglFramebuffer,E,Be,i.COLOR_ATTACHMENT0+he,i.TEXTURE_2D,0),M(Be,ge)&&x(i.TEXTURE_2D)}t.unbindTexture()}else{let ce=i.TEXTURE_2D;if((E.isWebGL3DRenderTarget||E.isWebGLArrayRenderTarget)&&(o?ce=E.isWebGL3DRenderTarget?i.TEXTURE_3D:i.TEXTURE_2D_ARRAY:console.error("THREE.WebGLTextures: THREE.Data3DTexture and THREE.DataArrayTexture only supported with WebGL2.")),t.bindTexture(ce,Q.__webglTexture),H(ce,v,ge),o&&v.mipmaps&&v.mipmaps.length>0)for(let he=0;he<v.mipmaps.length;he++)xe(O.__webglFramebuffer[he],E,v,i.COLOR_ATTACHMENT0,ce,he);else xe(O.__webglFramebuffer,E,v,i.COLOR_ATTACHMENT0,ce,0);M(v,ge)&&x(ce),t.unbindTexture()}E.depthBuffer&&Te(E)}function Lt(E){const v=p(E)||o,O=E.isWebGLMultipleRenderTargets===!0?E.texture:[E.texture];for(let Q=0,K=O.length;Q<K;Q++){const ee=O[Q];if(M(ee,v)){const ge=E.isWebGLCubeRenderTarget?i.TEXTURE_CUBE_MAP:i.TEXTURE_2D,ce=n.get(ee).__webglTexture;t.bindTexture(ge,ce),x(ge),t.unbindTexture()}}}function Me(E){if(o&&E.samples>0&&pe(E)===!1){const v=E.isWebGLMultipleRenderTargets?E.texture:[E.texture],O=E.width,Q=E.height;let K=i.COLOR_BUFFER_BIT;const ee=[],ge=E.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT,ce=n.get(E),he=E.isWebGLMultipleRenderTargets===!0;if(he)for(let be=0;be<v.length;be++)t.bindFramebuffer(i.FRAMEBUFFER,ce.__webglMultisampledFramebuffer),i.framebufferRenderbuffer(i.FRAMEBUFFER,i.COLOR_ATTACHMENT0+be,i.RENDERBUFFER,null),t.bindFramebuffer(i.FRAMEBUFFER,ce.__webglFramebuffer),i.framebufferTexture2D(i.DRAW_FRAMEBUFFER,i.COLOR_ATTACHMENT0+be,i.TEXTURE_2D,null,0);t.bindFramebuffer(i.READ_FRAMEBUFFER,ce.__webglMultisampledFramebuffer),t.bindFramebuffer(i.DRAW_FRAMEBUFFER,ce.__webglFramebuffer);for(let be=0;be<v.length;be++){ee.push(i.COLOR_ATTACHMENT0+be),E.depthBuffer&&ee.push(ge);const Be=ce.__ignoreDepthValues!==void 0?ce.__ignoreDepthValues:!1;if(Be===!1&&(E.depthBuffer&&(K|=i.DEPTH_BUFFER_BIT),E.stencilBuffer&&(K|=i.STENCIL_BUFFER_BIT)),he&&i.framebufferRenderbuffer(i.READ_FRAMEBUFFER,i.COLOR_ATTACHMENT0,i.RENDERBUFFER,ce.__webglColorRenderbuffer[be]),Be===!0&&(i.invalidateFramebuffer(i.READ_FRAMEBUFFER,[ge]),i.invalidateFramebuffer(i.DRAW_FRAMEBUFFER,[ge])),he){const Z=n.get(v[be]).__webglTexture;i.framebufferTexture2D(i.DRAW_FRAMEBUFFER,i.COLOR_ATTACHMENT0,i.TEXTURE_2D,Z,0)}i.blitFramebuffer(0,0,O,Q,0,0,O,Q,K,i.NEAREST),l&&i.invalidateFramebuffer(i.READ_FRAMEBUFFER,ee)}if(t.bindFramebuffer(i.READ_FRAMEBUFFER,null),t.bindFramebuffer(i.DRAW_FRAMEBUFFER,null),he)for(let be=0;be<v.length;be++){t.bindFramebuffer(i.FRAMEBUFFER,ce.__webglMultisampledFramebuffer),i.framebufferRenderbuffer(i.FRAMEBUFFER,i.COLOR_ATTACHMENT0+be,i.RENDERBUFFER,ce.__webglColorRenderbuffer[be]);const Be=n.get(v[be]).__webglTexture;t.bindFramebuffer(i.FRAMEBUFFER,ce.__webglFramebuffer),i.framebufferTexture2D(i.DRAW_FRAMEBUFFER,i.COLOR_ATTACHMENT0+be,i.TEXTURE_2D,Be,0)}t.bindFramebuffer(i.DRAW_FRAMEBUFFER,ce.__webglMultisampledFramebuffer)}}function Le(E){return Math.min(s.maxSamples,E.samples)}function pe(E){const v=n.get(E);return o&&E.samples>0&&e.has("WEBGL_multisampled_render_to_texture")===!0&&v.__useRenderToTexture!==!1}function nt(E){const v=a.render.frame;d.get(E)!==v&&(d.set(E,v),E.update())}function ze(E,v){const O=E.colorSpace,Q=E.format,K=E.type;return E.isCompressedTexture===!0||E.isVideoTexture===!0||E.format===br||O!==un&&O!==Wt&&($e.getTransfer(O)===tt?o===!1?e.has("EXT_sRGB")===!0&&Q===$t?(E.format=br,E.minFilter=Vt,E.generateMipmaps=!1):v=za.sRGBToLinear(v):(Q!==$t||K!==Rn)&&console.warn("THREE.WebGLTextures: sRGB encoded textures have to use RGBAFormat and UnsignedByteType."):console.error("THREE.WebGLTextures: Unsupported texture color space:",O)),v}this.allocateTextureUnit=L,this.resetTextureUnits=se,this.setTexture2D=G,this.setTexture2DArray=Y,this.setTexture3D=V,this.setTextureCube=D,this.rebindTextures=je,this.setupRenderTarget=I,this.updateRenderTargetMipmap=Lt,this.updateMultisampleRenderTarget=Me,this.setupDepthRenderbuffer=Te,this.setupFrameBufferTexture=xe,this.useMultisampledRTT=pe}function Zp(i,e,t){const n=t.isWebGL2;function s(r,a=Wt){let o;const c=$e.getTransfer(a);if(r===Rn)return i.UNSIGNED_BYTE;if(r===Zo)return i.UNSIGNED_SHORT_4_4_4_4;if(r===Ko)return i.UNSIGNED_SHORT_5_5_5_1;if(r===du)return i.BYTE;if(r===hu)return i.SHORT;if(r===_r)return i.UNSIGNED_SHORT;if(r===$o)return i.INT;if(r===Cn)return i.UNSIGNED_INT;if(r===Ln)return i.FLOAT;if(r===Vi)return n?i.HALF_FLOAT:(o=e.get("OES_texture_half_float"),o!==null?o.HALF_FLOAT_OES:null);if(r===fu)return i.ALPHA;if(r===$t)return i.RGBA;if(r===pu)return i.LUMINANCE;if(r===mu)return i.LUMINANCE_ALPHA;if(r===Vn)return i.DEPTH_COMPONENT;if(r===li)return i.DEPTH_STENCIL;if(r===br)return o=e.get("EXT_sRGB"),o!==null?o.SRGB_ALPHA_EXT:null;if(r===gu)return i.RED;if(r===Jo)return i.RED_INTEGER;if(r===_u)return i.RG;if(r===Qo)return i.RG_INTEGER;if(r===ea)return i.RGBA_INTEGER;if(r===xr||r===vr||r===Mr||r===yr)if(c===tt)if(o=e.get("WEBGL_compressed_texture_s3tc_srgb"),o!==null){if(r===xr)return o.COMPRESSED_SRGB_S3TC_DXT1_EXT;if(r===vr)return o.COMPRESSED_SRGB_ALPHA_S3TC_DXT1_EXT;if(r===Mr)return o.COMPRESSED_SRGB_ALPHA_S3TC_DXT3_EXT;if(r===yr)return o.COMPRESSED_SRGB_ALPHA_S3TC_DXT5_EXT}else return null;else if(o=e.get("WEBGL_compressed_texture_s3tc"),o!==null){if(r===xr)return o.COMPRESSED_RGB_S3TC_DXT1_EXT;if(r===vr)return o.COMPRESSED_RGBA_S3TC_DXT1_EXT;if(r===Mr)return o.COMPRESSED_RGBA_S3TC_DXT3_EXT;if(r===yr)return o.COMPRESSED_RGBA_S3TC_DXT5_EXT}else return null;if(r===ta||r===na||r===ia||r===sa)if(o=e.get("WEBGL_compressed_texture_pvrtc"),o!==null){if(r===ta)return o.COMPRESSED_RGB_PVRTC_4BPPV1_IMG;if(r===na)return o.COMPRESSED_RGB_PVRTC_2BPPV1_IMG;if(r===ia)return o.COMPRESSED_RGBA_PVRTC_4BPPV1_IMG;if(r===sa)return o.COMPRESSED_RGBA_PVRTC_2BPPV1_IMG}else return null;if(r===ra)return o=e.get("WEBGL_compressed_texture_etc1"),o!==null?o.COMPRESSED_RGB_ETC1_WEBGL:null;if(r===oa||r===aa)if(o=e.get("WEBGL_compressed_texture_etc"),o!==null){if(r===oa)return c===tt?o.COMPRESSED_SRGB8_ETC2:o.COMPRESSED_RGB8_ETC2;if(r===aa)return c===tt?o.COMPRESSED_SRGB8_ALPHA8_ETC2_EAC:o.COMPRESSED_RGBA8_ETC2_EAC}else return null;if(r===la||r===ca||r===ua||r===da||r===ha||r===fa||r===pa||r===ma||r===ga||r===_a||r===xa||r===va||r===Ma||r===ya)if(o=e.get("WEBGL_compressed_texture_astc"),o!==null){if(r===la)return c===tt?o.COMPRESSED_SRGB8_ALPHA8_ASTC_4x4_KHR:o.COMPRESSED_RGBA_ASTC_4x4_KHR;if(r===ca)return c===tt?o.COMPRESSED_SRGB8_ALPHA8_ASTC_5x4_KHR:o.COMPRESSED_RGBA_ASTC_5x4_KHR;if(r===ua)return c===tt?o.COMPRESSED_SRGB8_ALPHA8_ASTC_5x5_KHR:o.COMPRESSED_RGBA_ASTC_5x5_KHR;if(r===da)return c===tt?o.COMPRESSED_SRGB8_ALPHA8_ASTC_6x5_KHR:o.COMPRESSED_RGBA_ASTC_6x5_KHR;if(r===ha)return c===tt?o.COMPRESSED_SRGB8_ALPHA8_ASTC_6x6_KHR:o.COMPRESSED_RGBA_ASTC_6x6_KHR;if(r===fa)return c===tt?o.COMPRESSED_SRGB8_ALPHA8_ASTC_8x5_KHR:o.COMPRESSED_RGBA_ASTC_8x5_KHR;if(r===pa)return c===tt?o.COMPRESSED_SRGB8_ALPHA8_ASTC_8x6_KHR:o.COMPRESSED_RGBA_ASTC_8x6_KHR;if(r===ma)return c===tt?o.COMPRESSED_SRGB8_ALPHA8_ASTC_8x8_KHR:o.COMPRESSED_RGBA_ASTC_8x8_KHR;if(r===ga)return c===tt?o.COMPRESSED_SRGB8_ALPHA8_ASTC_10x5_KHR:o.COMPRESSED_RGBA_ASTC_10x5_KHR;if(r===_a)return c===tt?o.COMPRESSED_SRGB8_ALPHA8_ASTC_10x6_KHR:o.COMPRESSED_RGBA_ASTC_10x6_KHR;if(r===xa)return c===tt?o.COMPRESSED_SRGB8_ALPHA8_ASTC_10x8_KHR:o.COMPRESSED_RGBA_ASTC_10x8_KHR;if(r===va)return c===tt?o.COMPRESSED_SRGB8_ALPHA8_ASTC_10x10_KHR:o.COMPRESSED_RGBA_ASTC_10x10_KHR;if(r===Ma)return c===tt?o.COMPRESSED_SRGB8_ALPHA8_ASTC_12x10_KHR:o.COMPRESSED_RGBA_ASTC_12x10_KHR;if(r===ya)return c===tt?o.COMPRESSED_SRGB8_ALPHA8_ASTC_12x12_KHR:o.COMPRESSED_RGBA_ASTC_12x12_KHR}else return null;if(r===Sr||r===Sa||r===Ea)if(o=e.get("EXT_texture_compression_bptc"),o!==null){if(r===Sr)return c===tt?o.COMPRESSED_SRGB_ALPHA_BPTC_UNORM_EXT:o.COMPRESSED_RGBA_BPTC_UNORM_EXT;if(r===Sa)return o.COMPRESSED_RGB_BPTC_SIGNED_FLOAT_EXT;if(r===Ea)return o.COMPRESSED_RGB_BPTC_UNSIGNED_FLOAT_EXT}else return null;if(r===xu||r===ba||r===Ta||r===wa)if(o=e.get("EXT_texture_compression_rgtc"),o!==null){if(r===Sr)return o.COMPRESSED_RED_RGTC1_EXT;if(r===ba)return o.COMPRESSED_SIGNED_RED_RGTC1_EXT;if(r===Ta)return o.COMPRESSED_RED_GREEN_RGTC2_EXT;if(r===wa)return o.COMPRESSED_SIGNED_RED_GREEN_RGTC2_EXT}else return null;return r===Gn?n?i.UNSIGNED_INT_24_8:(o=e.get("WEBGL_depth_texture"),o!==null?o.UNSIGNED_INT_24_8_WEBGL:null):i[r]!==void 0?i[r]:null}return{convert:s}}class Kp extends qt{constructor(e=[]){super(),this.isArrayCamera=!0,this.cameras=e}}class Di extends mt{constructor(){super(),this.isGroup=!0,this.type="Group"}}const Jp={type:"move"};class eo{constructor(){this._targetRay=null,this._grip=null,this._hand=null}getHandSpace(){return this._hand===null&&(this._hand=new Di,this._hand.matrixAutoUpdate=!1,this._hand.visible=!1,this._hand.joints={},this._hand.inputState={pinching:!1}),this._hand}getTargetRaySpace(){return this._targetRay===null&&(this._targetRay=new Di,this._targetRay.matrixAutoUpdate=!1,this._targetRay.visible=!1,this._targetRay.hasLinearVelocity=!1,this._targetRay.linearVelocity=new U,this._targetRay.hasAngularVelocity=!1,this._targetRay.angularVelocity=new U),this._targetRay}getGripSpace(){return this._grip===null&&(this._grip=new Di,this._grip.matrixAutoUpdate=!1,this._grip.visible=!1,this._grip.hasLinearVelocity=!1,this._grip.linearVelocity=new U,this._grip.hasAngularVelocity=!1,this._grip.angularVelocity=new U),this._grip}dispatchEvent(e){return this._targetRay!==null&&this._targetRay.dispatchEvent(e),this._grip!==null&&this._grip.dispatchEvent(e),this._hand!==null&&this._hand.dispatchEvent(e),this}connect(e){if(e&&e.hand){const t=this._hand;if(t)for(const n of e.hand.values())this._getHandJoint(t,n)}return this.dispatchEvent({type:"connected",data:e}),this}disconnect(e){return this.dispatchEvent({type:"disconnected",data:e}),this._targetRay!==null&&(this._targetRay.visible=!1),this._grip!==null&&(this._grip.visible=!1),this._hand!==null&&(this._hand.visible=!1),this}update(e,t,n){let s=null,r=null,a=null;const o=this._targetRay,c=this._grip,l=this._hand;if(e&&t.session.visibilityState!=="visible-blurred"){if(l&&e.hand){a=!0;for(const _ of e.hand.values()){const p=t.getJointPose(_,n),u=this._getHandJoint(l,_);p!==null&&(u.matrix.fromArray(p.transform.matrix),u.matrix.decompose(u.position,u.rotation,u.scale),u.matrixWorldNeedsUpdate=!0,u.jointRadius=p.radius),u.visible=p!==null}const d=l.joints["index-finger-tip"],h=l.joints["thumb-tip"],f=d.position.distanceTo(h.position),m=.02,g=.005;l.inputState.pinching&&f>m+g?(l.inputState.pinching=!1,this.dispatchEvent({type:"pinchend",handedness:e.handedness,target:this})):!l.inputState.pinching&&f<=m-g&&(l.inputState.pinching=!0,this.dispatchEvent({type:"pinchstart",handedness:e.handedness,target:this}))}else c!==null&&e.gripSpace&&(r=t.getPose(e.gripSpace,n),r!==null&&(c.matrix.fromArray(r.transform.matrix),c.matrix.decompose(c.position,c.rotation,c.scale),c.matrixWorldNeedsUpdate=!0,r.linearVelocity?(c.hasLinearVelocity=!0,c.linearVelocity.copy(r.linearVelocity)):c.hasLinearVelocity=!1,r.angularVelocity?(c.hasAngularVelocity=!0,c.angularVelocity.copy(r.angularVelocity)):c.hasAngularVelocity=!1));o!==null&&(s=t.getPose(e.targetRaySpace,n),s===null&&r!==null&&(s=r),s!==null&&(o.matrix.fromArray(s.transform.matrix),o.matrix.decompose(o.position,o.rotation,o.scale),o.matrixWorldNeedsUpdate=!0,s.linearVelocity?(o.hasLinearVelocity=!0,o.linearVelocity.copy(s.linearVelocity)):o.hasLinearVelocity=!1,s.angularVelocity?(o.hasAngularVelocity=!0,o.angularVelocity.copy(s.angularVelocity)):o.hasAngularVelocity=!1,this.dispatchEvent(Jp)))}return o!==null&&(o.visible=s!==null),c!==null&&(c.visible=r!==null),l!==null&&(l.visible=a!==null),this}_getHandJoint(e,t){if(e.joints[t.jointName]===void 0){const n=new Di;n.matrixAutoUpdate=!1,n.visible=!1,e.joints[t.jointName]=n,e.add(n)}return e.joints[t.jointName]}}class Qp extends ui{constructor(e,t){super();const n=this;let s=null,r=1,a=null,o="local-floor",c=1,l=null,d=null,h=null,f=null,m=null,g=null;const _=t.getContextAttributes();let p=null,u=null;const M=[],x=[],T=new qe;let C=null;const w=new qt;w.layers.enable(1),w.viewport=new pt;const A=new qt;A.layers.enable(2),A.viewport=new pt;const X=[w,A],S=new Kp;S.layers.enable(1),S.layers.enable(2);let b=null,k=null;this.cameraAutoUpdate=!0,this.enabled=!1,this.isPresenting=!1,this.getController=function(H){let j=M[H];return j===void 0&&(j=new eo,M[H]=j),j.getTargetRaySpace()},this.getControllerGrip=function(H){let j=M[H];return j===void 0&&(j=new eo,M[H]=j),j.getGripSpace()},this.getHand=function(H){let j=M[H];return j===void 0&&(j=new eo,M[H]=j),j.getHandSpace()};function $(H){const j=x.indexOf(H.inputSource);if(j===-1)return;const ue=M[j];ue!==void 0&&(ue.update(H.inputSource,H.frame,l||a),ue.dispatchEvent({type:H.type,data:H.inputSource}))}function se(){s.removeEventListener("select",$),s.removeEventListener("selectstart",$),s.removeEventListener("selectend",$),s.removeEventListener("squeeze",$),s.removeEventListener("squeezestart",$),s.removeEventListener("squeezeend",$),s.removeEventListener("end",se),s.removeEventListener("inputsourceschange",L);for(let H=0;H<M.length;H++){const j=x[H];j!==null&&(x[H]=null,M[H].disconnect(j))}b=null,k=null,e.setRenderTarget(p),m=null,f=null,h=null,s=null,u=null,le.stop(),n.isPresenting=!1,e.setPixelRatio(C),e.setSize(T.width,T.height,!1),n.dispatchEvent({type:"sessionend"})}this.setFramebufferScaleFactor=function(H){r=H,n.isPresenting===!0&&console.warn("THREE.WebXRManager: Cannot change framebuffer scale while presenting.")},this.setReferenceSpaceType=function(H){o=H,n.isPresenting===!0&&console.warn("THREE.WebXRManager: Cannot change reference space type while presenting.")},this.getReferenceSpace=function(){return l||a},this.setReferenceSpace=function(H){l=H},this.getBaseLayer=function(){return f!==null?f:m},this.getBinding=function(){return h},this.getFrame=function(){return g},this.getSession=function(){return s},this.setSession=async function(H){if(s=H,s!==null){if(p=e.getRenderTarget(),s.addEventListener("select",$),s.addEventListener("selectstart",$),s.addEventListener("selectend",$),s.addEventListener("squeeze",$),s.addEventListener("squeezestart",$),s.addEventListener("squeezeend",$),s.addEventListener("end",se),s.addEventListener("inputsourceschange",L),_.xrCompatible!==!0&&await t.makeXRCompatible(),C=e.getPixelRatio(),e.getSize(T),s.renderState.layers===void 0||e.capabilities.isWebGL2===!1){const j={antialias:s.renderState.layers===void 0?_.antialias:!0,alpha:!0,depth:_.depth,stencil:_.stencil,framebufferScaleFactor:r};m=new XRWebGLLayer(s,t,j),s.updateRenderState({baseLayer:m}),e.setPixelRatio(1),e.setSize(m.framebufferWidth,m.framebufferHeight,!1),u=new Xn(m.framebufferWidth,m.framebufferHeight,{format:$t,type:Rn,colorSpace:e.outputColorSpace,stencilBuffer:_.stencil})}else{let j=null,ue=null,me=null;_.depth&&(me=_.stencil?t.DEPTH24_STENCIL8:t.DEPTH_COMPONENT24,j=_.stencil?li:Vn,ue=_.stencil?Gn:Cn);const xe={colorFormat:t.RGBA8,depthFormat:me,scaleFactor:r};h=new XRWebGLBinding(s,t),f=h.createProjectionLayer(xe),s.updateRenderState({layers:[f]}),e.setPixelRatio(1),e.setSize(f.textureWidth,f.textureHeight,!1),u=new Xn(f.textureWidth,f.textureHeight,{format:$t,type:Rn,depthTexture:new xl(f.textureWidth,f.textureHeight,ue,void 0,void 0,void 0,void 0,void 0,void 0,j),stencilBuffer:_.stencil,colorSpace:e.outputColorSpace,samples:_.antialias?4:0});const Ue=e.properties.get(u);Ue.__ignoreDepthValues=f.ignoreDepthValues}u.isXRRenderTarget=!0,this.setFoveation(c),l=null,a=await s.requestReferenceSpace(o),le.setContext(s),le.start(),n.isPresenting=!0,n.dispatchEvent({type:"sessionstart"})}},this.getEnvironmentBlendMode=function(){if(s!==null)return s.environmentBlendMode};function L(H){for(let j=0;j<H.removed.length;j++){const ue=H.removed[j],me=x.indexOf(ue);me>=0&&(x[me]=null,M[me].disconnect(ue))}for(let j=0;j<H.added.length;j++){const ue=H.added[j];let me=x.indexOf(ue);if(me===-1){for(let Ue=0;Ue<M.length;Ue++)if(Ue>=x.length){x.push(ue),me=Ue;break}else if(x[Ue]===null){x[Ue]=ue,me=Ue;break}if(me===-1)break}const xe=M[me];xe&&xe.connect(ue)}}const z=new U,G=new U;function Y(H,j,ue){z.setFromMatrixPosition(j.matrixWorld),G.setFromMatrixPosition(ue.matrixWorld);const me=z.distanceTo(G),xe=j.projectionMatrix.elements,Ue=ue.projectionMatrix.elements,Oe=xe[14]/(xe[10]-1),Te=xe[14]/(xe[10]+1),je=(xe[9]+1)/xe[5],I=(xe[9]-1)/xe[5],Lt=(xe[8]-1)/xe[0],Me=(Ue[8]+1)/Ue[0],Le=Oe*Lt,pe=Oe*Me,nt=me/(-Lt+Me),ze=nt*-Lt;j.matrixWorld.decompose(H.position,H.quaternion,H.scale),H.translateX(ze),H.translateZ(nt),H.matrixWorld.compose(H.position,H.quaternion,H.scale),H.matrixWorldInverse.copy(H.matrixWorld).invert();const E=Oe+nt,v=Te+nt,O=Le-ze,Q=pe+(me-ze),K=je*Te/v*E,ee=I*Te/v*E;H.projectionMatrix.makePerspective(O,Q,K,ee,E,v),H.projectionMatrixInverse.copy(H.projectionMatrix).invert()}function V(H,j){j===null?H.matrixWorld.copy(H.matrix):H.matrixWorld.multiplyMatrices(j.matrixWorld,H.matrix),H.matrixWorldInverse.copy(H.matrixWorld).invert()}this.updateCamera=function(H){if(s===null)return;S.near=A.near=w.near=H.near,S.far=A.far=w.far=H.far,(b!==S.near||k!==S.far)&&(s.updateRenderState({depthNear:S.near,depthFar:S.far}),b=S.near,k=S.far);const j=H.parent,ue=S.cameras;V(S,j);for(let me=0;me<ue.length;me++)V(ue[me],j);ue.length===2?Y(S,w,A):S.projectionMatrix.copy(w.projectionMatrix),D(H,S,j)};function D(H,j,ue){ue===null?H.matrix.copy(j.matrixWorld):(H.matrix.copy(ue.matrixWorld),H.matrix.invert(),H.matrix.multiply(j.matrixWorld)),H.matrix.decompose(H.position,H.quaternion,H.scale),H.updateMatrixWorld(!0),H.projectionMatrix.copy(j.projectionMatrix),H.projectionMatrixInverse.copy(j.projectionMatrixInverse),H.isPerspectiveCamera&&(H.fov=wr*2*Math.atan(1/H.projectionMatrix.elements[5]),H.zoom=1)}this.getCamera=function(){return S},this.getFoveation=function(){if(!(f===null&&m===null))return c},this.setFoveation=function(H){c=H,f!==null&&(f.fixedFoveation=H),m!==null&&m.fixedFoveation!==void 0&&(m.fixedFoveation=H)};let W=null;function q(H,j){if(d=j.getViewerPose(l||a),g=j,d!==null){const ue=d.views;m!==null&&(e.setRenderTargetFramebuffer(u,m.framebuffer),e.setRenderTarget(u));let me=!1;ue.length!==S.cameras.length&&(S.cameras.length=0,me=!0);for(let xe=0;xe<ue.length;xe++){const Ue=ue[xe];let Oe=null;if(m!==null)Oe=m.getViewport(Ue);else{const je=h.getViewSubImage(f,Ue);Oe=je.viewport,xe===0&&(e.setRenderTargetTextures(u,je.colorTexture,f.ignoreDepthValues?void 0:je.depthStencilTexture),e.setRenderTarget(u))}let Te=X[xe];Te===void 0&&(Te=new qt,Te.layers.enable(xe),Te.viewport=new pt,X[xe]=Te),Te.matrix.fromArray(Ue.transform.matrix),Te.matrix.decompose(Te.position,Te.quaternion,Te.scale),Te.projectionMatrix.fromArray(Ue.projectionMatrix),Te.projectionMatrixInverse.copy(Te.projectionMatrix).invert(),Te.viewport.set(Oe.x,Oe.y,Oe.width,Oe.height),xe===0&&(S.matrix.copy(Te.matrix),S.matrix.decompose(S.position,S.quaternion,S.scale)),me===!0&&S.cameras.push(Te)}}for(let ue=0;ue<M.length;ue++){const me=x[ue],xe=M[ue];me!==null&&xe!==void 0&&xe.update(me,j,l||a)}W&&W(H,j),j.detectedPlanes&&n.dispatchEvent({type:"planesdetected",data:j}),g=null}const le=new cl;le.setAnimationLoop(q),this.setAnimationLoop=function(H){W=H},this.dispose=function(){}}}function em(i,e){function t(p,u){p.matrixAutoUpdate===!0&&p.updateMatrix(),u.value.copy(p.matrix)}function n(p,u){u.color.getRGB(p.fogColor.value,ol(i)),u.isFog?(p.fogNear.value=u.near,p.fogFar.value=u.far):u.isFogExp2&&(p.fogDensity.value=u.density)}function s(p,u,M,x,T){u.isMeshBasicMaterial||u.isMeshLambertMaterial?r(p,u):u.isMeshToonMaterial?(r(p,u),h(p,u)):u.isMeshPhongMaterial?(r(p,u),d(p,u)):u.isMeshStandardMaterial?(r(p,u),f(p,u),u.isMeshPhysicalMaterial&&m(p,u,T)):u.isMeshMatcapMaterial?(r(p,u),g(p,u)):u.isMeshDepthMaterial?r(p,u):u.isMeshDistanceMaterial?(r(p,u),_(p,u)):u.isMeshNormalMaterial?r(p,u):u.isLineBasicMaterial?(a(p,u),u.isLineDashedMaterial&&o(p,u)):u.isPointsMaterial?c(p,u,M,x):u.isSpriteMaterial?l(p,u):u.isShadowMaterial?(p.color.value.copy(u.color),p.opacity.value=u.opacity):u.isShaderMaterial&&(u.uniformsNeedUpdate=!1)}function r(p,u){p.opacity.value=u.opacity,u.color&&p.diffuse.value.copy(u.color),u.emissive&&p.emissive.value.copy(u.emissive).multiplyScalar(u.emissiveIntensity),u.map&&(p.map.value=u.map,t(u.map,p.mapTransform)),u.alphaMap&&(p.alphaMap.value=u.alphaMap,t(u.alphaMap,p.alphaMapTransform)),u.bumpMap&&(p.bumpMap.value=u.bumpMap,t(u.bumpMap,p.bumpMapTransform),p.bumpScale.value=u.bumpScale,u.side===Ut&&(p.bumpScale.value*=-1)),u.normalMap&&(p.normalMap.value=u.normalMap,t(u.normalMap,p.normalMapTransform),p.normalScale.value.copy(u.normalScale),u.side===Ut&&p.normalScale.value.negate()),u.displacementMap&&(p.displacementMap.value=u.displacementMap,t(u.displacementMap,p.displacementMapTransform),p.displacementScale.value=u.displacementScale,p.displacementBias.value=u.displacementBias),u.emissiveMap&&(p.emissiveMap.value=u.emissiveMap,t(u.emissiveMap,p.emissiveMapTransform)),u.specularMap&&(p.specularMap.value=u.specularMap,t(u.specularMap,p.specularMapTransform)),u.alphaTest>0&&(p.alphaTest.value=u.alphaTest);const M=e.get(u).envMap;if(M&&(p.envMap.value=M,p.flipEnvMap.value=M.isCubeTexture&&M.isRenderTargetTexture===!1?-1:1,p.reflectivity.value=u.reflectivity,p.ior.value=u.ior,p.refractionRatio.value=u.refractionRatio),u.lightMap){p.lightMap.value=u.lightMap;const x=i._useLegacyLights===!0?Math.PI:1;p.lightMapIntensity.value=u.lightMapIntensity*x,t(u.lightMap,p.lightMapTransform)}u.aoMap&&(p.aoMap.value=u.aoMap,p.aoMapIntensity.value=u.aoMapIntensity,t(u.aoMap,p.aoMapTransform))}function a(p,u){p.diffuse.value.copy(u.color),p.opacity.value=u.opacity,u.map&&(p.map.value=u.map,t(u.map,p.mapTransform))}function o(p,u){p.dashSize.value=u.dashSize,p.totalSize.value=u.dashSize+u.gapSize,p.scale.value=u.scale}function c(p,u,M,x){p.diffuse.value.copy(u.color),p.opacity.value=u.opacity,p.size.value=u.size*M,p.scale.value=x*.5,u.map&&(p.map.value=u.map,t(u.map,p.uvTransform)),u.alphaMap&&(p.alphaMap.value=u.alphaMap,t(u.alphaMap,p.alphaMapTransform)),u.alphaTest>0&&(p.alphaTest.value=u.alphaTest)}function l(p,u){p.diffuse.value.copy(u.color),p.opacity.value=u.opacity,p.rotation.value=u.rotation,u.map&&(p.map.value=u.map,t(u.map,p.mapTransform)),u.alphaMap&&(p.alphaMap.value=u.alphaMap,t(u.alphaMap,p.alphaMapTransform)),u.alphaTest>0&&(p.alphaTest.value=u.alphaTest)}function d(p,u){p.specular.value.copy(u.specular),p.shininess.value=Math.max(u.shininess,1e-4)}function h(p,u){u.gradientMap&&(p.gradientMap.value=u.gradientMap)}function f(p,u){p.metalness.value=u.metalness,u.metalnessMap&&(p.metalnessMap.value=u.metalnessMap,t(u.metalnessMap,p.metalnessMapTransform)),p.roughness.value=u.roughness,u.roughnessMap&&(p.roughnessMap.value=u.roughnessMap,t(u.roughnessMap,p.roughnessMapTransform)),e.get(u).envMap&&(p.envMapIntensity.value=u.envMapIntensity)}function m(p,u,M){p.ior.value=u.ior,u.sheen>0&&(p.sheenColor.value.copy(u.sheenColor).multiplyScalar(u.sheen),p.sheenRoughness.value=u.sheenRoughness,u.sheenColorMap&&(p.sheenColorMap.value=u.sheenColorMap,t(u.sheenColorMap,p.sheenColorMapTransform)),u.sheenRoughnessMap&&(p.sheenRoughnessMap.value=u.sheenRoughnessMap,t(u.sheenRoughnessMap,p.sheenRoughnessMapTransform))),u.clearcoat>0&&(p.clearcoat.value=u.clearcoat,p.clearcoatRoughness.value=u.clearcoatRoughness,u.clearcoatMap&&(p.clearcoatMap.value=u.clearcoatMap,t(u.clearcoatMap,p.clearcoatMapTransform)),u.clearcoatRoughnessMap&&(p.clearcoatRoughnessMap.value=u.clearcoatRoughnessMap,t(u.clearcoatRoughnessMap,p.clearcoatRoughnessMapTransform)),u.clearcoatNormalMap&&(p.clearcoatNormalMap.value=u.clearcoatNormalMap,t(u.clearcoatNormalMap,p.clearcoatNormalMapTransform),p.clearcoatNormalScale.value.copy(u.clearcoatNormalScale),u.side===Ut&&p.clearcoatNormalScale.value.negate())),u.iridescence>0&&(p.iridescence.value=u.iridescence,p.iridescenceIOR.value=u.iridescenceIOR,p.iridescenceThicknessMinimum.value=u.iridescenceThicknessRange[0],p.iridescenceThicknessMaximum.value=u.iridescenceThicknessRange[1],u.iridescenceMap&&(p.iridescenceMap.value=u.iridescenceMap,t(u.iridescenceMap,p.iridescenceMapTransform)),u.iridescenceThicknessMap&&(p.iridescenceThicknessMap.value=u.iridescenceThicknessMap,t(u.iridescenceThicknessMap,p.iridescenceThicknessMapTransform))),u.transmission>0&&(p.transmission.value=u.transmission,p.transmissionSamplerMap.value=M.texture,p.transmissionSamplerSize.value.set(M.width,M.height),u.transmissionMap&&(p.transmissionMap.value=u.transmissionMap,t(u.transmissionMap,p.transmissionMapTransform)),p.thickness.value=u.thickness,u.thicknessMap&&(p.thicknessMap.value=u.thicknessMap,t(u.thicknessMap,p.thicknessMapTransform)),p.attenuationDistance.value=u.attenuationDistance,p.attenuationColor.value.copy(u.attenuationColor)),u.anisotropy>0&&(p.anisotropyVector.value.set(u.anisotropy*Math.cos(u.anisotropyRotation),u.anisotropy*Math.sin(u.anisotropyRotation)),u.anisotropyMap&&(p.anisotropyMap.value=u.anisotropyMap,t(u.anisotropyMap,p.anisotropyMapTransform))),p.specularIntensity.value=u.specularIntensity,p.specularColor.value.copy(u.specularColor),u.specularColorMap&&(p.specularColorMap.value=u.specularColorMap,t(u.specularColorMap,p.specularColorMapTransform)),u.specularIntensityMap&&(p.specularIntensityMap.value=u.specularIntensityMap,t(u.specularIntensityMap,p.specularIntensityMapTransform))}function g(p,u){u.matcap&&(p.matcap.value=u.matcap)}function _(p,u){const M=e.get(u).light;p.referencePosition.value.setFromMatrixPosition(M.matrixWorld),p.nearDistance.value=M.shadow.camera.near,p.farDistance.value=M.shadow.camera.far}return{refreshFogUniforms:n,refreshMaterialUniforms:s}}function tm(i,e,t,n){let s={},r={},a=[];const o=t.isWebGL2?i.getParameter(i.MAX_UNIFORM_BUFFER_BINDINGS):0;function c(M,x){const T=x.program;n.uniformBlockBinding(M,T)}function l(M,x){let T=s[M.id];T===void 0&&(g(M),T=d(M),s[M.id]=T,M.addEventListener("dispose",p));const C=x.program;n.updateUBOMapping(M,C);const w=e.render.frame;r[M.id]!==w&&(f(M),r[M.id]=w)}function d(M){const x=h();M.__bindingPointIndex=x;const T=i.createBuffer(),C=M.__size,w=M.usage;return i.bindBuffer(i.UNIFORM_BUFFER,T),i.bufferData(i.UNIFORM_BUFFER,C,w),i.bindBuffer(i.UNIFORM_BUFFER,null),i.bindBufferBase(i.UNIFORM_BUFFER,x,T),T}function h(){for(let M=0;M<o;M++)if(a.indexOf(M)===-1)return a.push(M),M;return console.error("THREE.WebGLRenderer: Maximum number of simultaneously usable uniforms groups reached."),0}function f(M){const x=s[M.id],T=M.uniforms,C=M.__cache;i.bindBuffer(i.UNIFORM_BUFFER,x);for(let w=0,A=T.length;w<A;w++){const X=Array.isArray(T[w])?T[w]:[T[w]];for(let S=0,b=X.length;S<b;S++){const k=X[S];if(m(k,w,S,C)===!0){const $=k.__offset,se=Array.isArray(k.value)?k.value:[k.value];let L=0;for(let z=0;z<se.length;z++){const G=se[z],Y=_(G);typeof G=="number"||typeof G=="boolean"?(k.__data[0]=G,i.bufferSubData(i.UNIFORM_BUFFER,$+L,k.__data)):G.isMatrix3?(k.__data[0]=G.elements[0],k.__data[1]=G.elements[1],k.__data[2]=G.elements[2],k.__data[3]=0,k.__data[4]=G.elements[3],k.__data[5]=G.elements[4],k.__data[6]=G.elements[5],k.__data[7]=0,k.__data[8]=G.elements[6],k.__data[9]=G.elements[7],k.__data[10]=G.elements[8],k.__data[11]=0):(G.toArray(k.__data,L),L+=Y.storage/Float32Array.BYTES_PER_ELEMENT)}i.bufferSubData(i.UNIFORM_BUFFER,$,k.__data)}}}i.bindBuffer(i.UNIFORM_BUFFER,null)}function m(M,x,T,C){const w=M.value,A=x+"_"+T;if(C[A]===void 0)return typeof w=="number"||typeof w=="boolean"?C[A]=w:C[A]=w.clone(),!0;{const X=C[A];if(typeof w=="number"||typeof w=="boolean"){if(X!==w)return C[A]=w,!0}else if(X.equals(w)===!1)return X.copy(w),!0}return!1}function g(M){const x=M.uniforms;let T=0;const C=16;for(let A=0,X=x.length;A<X;A++){const S=Array.isArray(x[A])?x[A]:[x[A]];for(let b=0,k=S.length;b<k;b++){const $=S[b],se=Array.isArray($.value)?$.value:[$.value];for(let L=0,z=se.length;L<z;L++){const G=se[L],Y=_(G),V=T%C;V!==0&&C-V<Y.boundary&&(T+=C-V),$.__data=new Float32Array(Y.storage/Float32Array.BYTES_PER_ELEMENT),$.__offset=T,T+=Y.storage}}}const w=T%C;return w>0&&(T+=C-w),M.__size=T,M.__cache={},this}function _(M){const x={boundary:0,storage:0};return typeof M=="number"||typeof M=="boolean"?(x.boundary=4,x.storage=4):M.isVector2?(x.boundary=8,x.storage=8):M.isVector3||M.isColor?(x.boundary=16,x.storage=12):M.isVector4?(x.boundary=16,x.storage=16):M.isMatrix3?(x.boundary=48,x.storage=48):M.isMatrix4?(x.boundary=64,x.storage=64):M.isTexture?console.warn("THREE.WebGLRenderer: Texture samplers can not be part of an uniforms group."):console.warn("THREE.WebGLRenderer: Unsupported uniform value type.",M),x}function p(M){const x=M.target;x.removeEventListener("dispose",p);const T=a.indexOf(x.__bindingPointIndex);a.splice(T,1),i.deleteBuffer(s[x.id]),delete s[x.id],delete r[x.id]}function u(){for(const M in s)i.deleteBuffer(s[M]);a=[],s={},r={}}return{bind:c,update:l,dispose:u}}class Bl{constructor(e={}){const{canvas:t=Lu(),context:n=null,depth:s=!0,stencil:r=!0,alpha:a=!1,antialias:o=!1,premultipliedAlpha:c=!0,preserveDrawingBuffer:l=!1,powerPreference:d="default",failIfMajorPerformanceCaveat:h=!1}=e;this.isWebGLRenderer=!0;let f;n!==null?f=n.getContextAttributes().alpha:f=a;const m=new Uint32Array(4),g=new Int32Array(4);let _=null,p=null;const u=[],M=[];this.domElement=t,this.debug={checkShaderErrors:!0,onShaderError:null},this.autoClear=!0,this.autoClearColor=!0,this.autoClearDepth=!0,this.autoClearStencil=!0,this.sortObjects=!0,this.clippingPlanes=[],this.localClippingEnabled=!1,this._outputColorSpace=ft,this._useLegacyLights=!1,this.toneMapping=An,this.toneMappingExposure=1;const x=this;let T=!1,C=0,w=0,A=null,X=-1,S=null;const b=new pt,k=new pt;let $=null;const se=new De(0);let L=0,z=t.width,G=t.height,Y=1,V=null,D=null;const W=new pt(0,0,z,G),q=new pt(0,0,z,G);let le=!1;const H=new jr;let j=!1,ue=!1,me=null;const xe=new lt,Ue=new qe,Oe=new U,Te={background:null,fog:null,environment:null,overrideMaterial:null,isScene:!0};function je(){return A===null?Y:1}let I=n;function Lt(y,P){for(let F=0;F<y.length;F++){const B=y[F],N=t.getContext(B,P);if(N!==null)return N}return null}try{const y={alpha:!0,depth:s,stencil:r,antialias:o,premultipliedAlpha:c,preserveDrawingBuffer:l,powerPreference:d,failIfMajorPerformanceCaveat:h};if("setAttribute"in t&&t.setAttribute("data-engine",`three.js r${ur}`),t.addEventListener("webglcontextlost",ie,!1),t.addEventListener("webglcontextrestored",R,!1),t.addEventListener("webglcontextcreationerror",oe,!1),I===null){const P=["webgl2","webgl","experimental-webgl"];if(x.isWebGL1Renderer===!0&&P.shift(),I=Lt(P,y),I===null)throw Lt(P)?new Error("Error creating WebGL context with your selected attributes."):new Error("Error creating WebGL context.")}typeof WebGLRenderingContext<"u"&&I instanceof WebGLRenderingContext&&console.warn("THREE.WebGLRenderer: WebGL 1 support was deprecated in r153 and will be removed in r163."),I.getShaderPrecisionFormat===void 0&&(I.getShaderPrecisionFormat=function(){return{rangeMin:1,rangeMax:1,precision:1}})}catch(y){throw console.error("THREE.WebGLRenderer: "+y.message),y}let Me,Le,pe,nt,ze,E,v,O,Q,K,ee,ge,ce,he,be,Be,Z,Ze,We,Ce,ve,fe,Fe,Ye;function st(){Me=new df(I),Le=new rf(I,Me,e),Me.init(Le),fe=new Zp(I,Me,Le),pe=new Yp(I,Me,Le),nt=new pf(I),ze=new Ip,E=new $p(I,Me,pe,ze,Le,fe,nt),v=new af(x),O=new uf(x),Q=new td(I,Le),Fe=new nf(I,Me,Q,Le),K=new hf(I,Q,nt,Fe),ee=new xf(I,K,Q,nt),We=new _f(I,Le,E),Be=new of(ze),ge=new Up(x,v,O,Me,Le,Fe,Be),ce=new em(x,ze),he=new Op,be=new Gp(Me,Le),Ze=new tf(x,v,O,pe,ee,f,c),Z=new qp(x,ee,Le),Ye=new tm(I,nt,Le,pe),Ce=new sf(I,Me,nt,Le),ve=new ff(I,Me,nt,Le),nt.programs=ge.programs,x.capabilities=Le,x.extensions=Me,x.properties=ze,x.renderLists=he,x.shadowMap=Z,x.state=pe,x.info=nt}st();const Ge=new Qp(x,I);this.xr=Ge,this.getContext=function(){return I},this.getContextAttributes=function(){return I.getContextAttributes()},this.forceContextLoss=function(){const y=Me.get("WEBGL_lose_context");y&&y.loseContext()},this.forceContextRestore=function(){const y=Me.get("WEBGL_lose_context");y&&y.restoreContext()},this.getPixelRatio=function(){return Y},this.setPixelRatio=function(y){y!==void 0&&(Y=y,this.setSize(z,G,!1))},this.getSize=function(y){return y.set(z,G)},this.setSize=function(y,P,F=!0){if(Ge.isPresenting){console.warn("THREE.WebGLRenderer: Can't change size while VR device is presenting.");return}z=y,G=P,t.width=Math.floor(y*Y),t.height=Math.floor(P*Y),F===!0&&(t.style.width=y+"px",t.style.height=P+"px"),this.setViewport(0,0,y,P)},this.getDrawingBufferSize=function(y){return y.set(z*Y,G*Y).floor()},this.setDrawingBufferSize=function(y,P,F){z=y,G=P,Y=F,t.width=Math.floor(y*F),t.height=Math.floor(P*F),this.setViewport(0,0,y,P)},this.getCurrentViewport=function(y){return y.copy(b)},this.getViewport=function(y){return y.copy(W)},this.setViewport=function(y,P,F,B){y.isVector4?W.set(y.x,y.y,y.z,y.w):W.set(y,P,F,B),pe.viewport(b.copy(W).multiplyScalar(Y).floor())},this.getScissor=function(y){return y.copy(q)},this.setScissor=function(y,P,F,B){y.isVector4?q.set(y.x,y.y,y.z,y.w):q.set(y,P,F,B),pe.scissor(k.copy(q).multiplyScalar(Y).floor())},this.getScissorTest=function(){return le},this.setScissorTest=function(y){pe.setScissorTest(le=y)},this.setOpaqueSort=function(y){V=y},this.setTransparentSort=function(y){D=y},this.getClearColor=function(y){return y.copy(Ze.getClearColor())},this.setClearColor=function(){Ze.setClearColor.apply(Ze,arguments)},this.getClearAlpha=function(){return Ze.getClearAlpha()},this.setClearAlpha=function(){Ze.setClearAlpha.apply(Ze,arguments)},this.clear=function(y=!0,P=!0,F=!0){let B=0;if(y){let N=!1;if(A!==null){const de=A.texture.format;N=de===ea||de===Qo||de===Jo}if(N){const de=A.texture.type,_e=de===Rn||de===Cn||de===_r||de===Gn||de===Zo||de===Ko,Se=Ze.getClearColor(),Ae=Ze.getClearAlpha(),ke=Se.r,Pe=Se.g,Ie=Se.b;_e?(m[0]=ke,m[1]=Pe,m[2]=Ie,m[3]=Ae,I.clearBufferuiv(I.COLOR,0,m)):(g[0]=ke,g[1]=Pe,g[2]=Ie,g[3]=Ae,I.clearBufferiv(I.COLOR,0,g))}else B|=I.COLOR_BUFFER_BIT}P&&(B|=I.DEPTH_BUFFER_BIT),F&&(B|=I.STENCIL_BUFFER_BIT,this.state.buffers.stencil.setMask(4294967295)),I.clear(B)},this.clearColor=function(){this.clear(!0,!1,!1)},this.clearDepth=function(){this.clear(!1,!0,!1)},this.clearStencil=function(){this.clear(!1,!1,!0)},this.dispose=function(){t.removeEventListener("webglcontextlost",ie,!1),t.removeEventListener("webglcontextrestored",R,!1),t.removeEventListener("webglcontextcreationerror",oe,!1),he.dispose(),be.dispose(),ze.dispose(),v.dispose(),O.dispose(),ee.dispose(),Fe.dispose(),Ye.dispose(),ge.dispose(),Ge.dispose(),Ge.removeEventListener("sessionstart",Pt),Ge.removeEventListener("sessionend",et),me&&(me.dispose(),me=null),Dt.stop()};function ie(y){y.preventDefault(),console.log("THREE.WebGLRenderer: Context Lost."),T=!0}function R(){console.log("THREE.WebGLRenderer: Context Restored."),T=!1;const y=nt.autoReset,P=Z.enabled,F=Z.autoUpdate,B=Z.needsUpdate,N=Z.type;st(),nt.autoReset=y,Z.enabled=P,Z.autoUpdate=F,Z.needsUpdate=B,Z.type=N}function oe(y){console.error("THREE.WebGLRenderer: A WebGL context could not be created. Reason: ",y.statusMessage)}function ae(y){const P=y.target;P.removeEventListener("dispose",ae),we(P)}function we(y){ye(y),ze.remove(y)}function ye(y){const P=ze.get(y).programs;P!==void 0&&(P.forEach(function(F){ge.releaseProgram(F)}),y.isShaderMaterial&&ge.releaseShaderCache(y))}this.renderBufferDirect=function(y,P,F,B,N,de){P===null&&(P=Te);const _e=N.isMesh&&N.matrixWorld.determinant()<0,Se=_g(y,P,F,B,N);pe.setMaterial(B,_e);let Ae=F.index,ke=1;if(B.wireframe===!0){if(Ae=K.getWireframeAttribute(F),Ae===void 0)return;ke=2}const Pe=F.drawRange,Ie=F.attributes.position;let at=Pe.start*ke,Ht=(Pe.start+Pe.count)*ke;de!==null&&(at=Math.max(at,de.start*ke),Ht=Math.min(Ht,(de.start+de.count)*ke)),Ae!==null?(at=Math.max(at,0),Ht=Math.min(Ht,Ae.count)):Ie!=null&&(at=Math.max(at,0),Ht=Math.min(Ht,Ie.count));const vt=Ht-at;if(vt<0||vt===1/0)return;Fe.setup(N,B,Se,F,Ae);let bn,it=Ce;if(Ae!==null&&(bn=Q.get(Ae),it=ve,it.setIndex(bn)),N.isMesh)B.wireframe===!0?(pe.setLineWidth(B.wireframeLinewidth*je()),it.setMode(I.LINES)):it.setMode(I.TRIANGLES);else if(N.isLine){let Ve=B.linewidth;Ve===void 0&&(Ve=1),pe.setLineWidth(Ve*je()),N.isLineSegments?it.setMode(I.LINES):N.isLineLoop?it.setMode(I.LINE_LOOP):it.setMode(I.LINE_STRIP)}else N.isPoints?it.setMode(I.POINTS):N.isSprite&&it.setMode(I.TRIANGLES);if(N.isBatchedMesh)it.renderMultiDraw(N._multiDrawStarts,N._multiDrawCounts,N._multiDrawCount);else if(N.isInstancedMesh)it.renderInstances(at,vt,N.count);else if(F.isInstancedBufferGeometry){const Ve=F._maxInstanceCount!==void 0?F._maxInstanceCount:1/0,Uo=Math.min(F.instanceCount,Ve);it.renderInstances(at,vt,Uo)}else it.render(at,vt)};function Je(y,P,F){y.transparent===!0&&y.side===cn&&y.forceSinglePass===!1?(y.side=Ut,y.needsUpdate=!0,cr(y,P,F),y.side=Tn,y.needsUpdate=!0,cr(y,P,F),y.side=cn):cr(y,P,F)}this.compile=function(y,P,F=null){F===null&&(F=y),p=be.get(F),p.init(),M.push(p),F.traverseVisible(function(N){N.isLight&&N.layers.test(P.layers)&&(p.pushLight(N),N.castShadow&&p.pushShadow(N))}),y!==F&&y.traverseVisible(function(N){N.isLight&&N.layers.test(P.layers)&&(p.pushLight(N),N.castShadow&&p.pushShadow(N))}),p.setupLights(x._useLegacyLights);const B=new Set;return y.traverse(function(N){const de=N.material;if(de)if(Array.isArray(de))for(let _e=0;_e<de.length;_e++){const Se=de[_e];Je(Se,F,N),B.add(Se)}else Je(de,F,N),B.add(de)}),M.pop(),p=null,B},this.compileAsync=function(y,P,F=null){const B=this.compile(y,P,F);return new Promise(N=>{function de(){if(B.forEach(function(_e){ze.get(_e).currentProgram.isReady()&&B.delete(_e)}),B.size===0){N(y);return}setTimeout(de,10)}Me.get("KHR_parallel_shader_compile")!==null?de():setTimeout(de,10)})};let Qe=null;function xt(y){Qe&&Qe(y)}function Pt(){Dt.stop()}function et(){Dt.start()}const Dt=new cl;Dt.setAnimationLoop(xt),typeof self<"u"&&Dt.setContext(self),this.setAnimationLoop=function(y){Qe=y,Ge.setAnimationLoop(y),y===null?Dt.stop():Dt.start()},Ge.addEventListener("sessionstart",Pt),Ge.addEventListener("sessionend",et),this.render=function(y,P){if(P!==void 0&&P.isCamera!==!0){console.error("THREE.WebGLRenderer.render: camera is not an instance of THREE.Camera.");return}if(T===!0)return;y.matrixWorldAutoUpdate===!0&&y.updateMatrixWorld(),P.parent===null&&P.matrixWorldAutoUpdate===!0&&P.updateMatrixWorld(),Ge.enabled===!0&&Ge.isPresenting===!0&&(Ge.cameraAutoUpdate===!0&&Ge.updateCamera(P),P=Ge.getCamera()),y.isScene===!0&&y.onBeforeRender(x,y,P,A),p=be.get(y,M.length),p.init(),M.push(p),xe.multiplyMatrices(P.projectionMatrix,P.matrixWorldInverse),H.setFromProjectionMatrix(xe),ue=this.localClippingEnabled,j=Be.init(this.clippingPlanes,ue),_=he.get(y,u.length),_.init(),u.push(_),an(y,P,0,x.sortObjects),_.finish(),x.sortObjects===!0&&_.sort(V,D),this.info.render.frame++,j===!0&&Be.beginShadows();const F=p.state.shadowsArray;if(Z.render(F,y,P),j===!0&&Be.endShadows(),this.info.autoReset===!0&&this.info.reset(),Ze.render(_,y),p.setupLights(x._useLegacyLights),P.isArrayCamera){const B=P.cameras;for(let N=0,de=B.length;N<de;N++){const _e=B[N];Tc(_,y,_e,_e.viewport)}}else Tc(_,y,P);A!==null&&(E.updateMultisampleRenderTarget(A),E.updateRenderTargetMipmap(A)),y.isScene===!0&&y.onAfterRender(x,y,P),Fe.resetDefaultState(),X=-1,S=null,M.pop(),M.length>0?p=M[M.length-1]:p=null,u.pop(),u.length>0?_=u[u.length-1]:_=null};function an(y,P,F,B){if(y.visible===!1)return;if(y.layers.test(P.layers)){if(y.isGroup)F=y.renderOrder;else if(y.isLOD)y.autoUpdate===!0&&y.update(P);else if(y.isLight)p.pushLight(y),y.castShadow&&p.pushShadow(y);else if(y.isSprite){if(!y.frustumCulled||H.intersectsSprite(y)){B&&Oe.setFromMatrixPosition(y.matrixWorld).applyMatrix4(xe);const _e=ee.update(y),Se=y.material;Se.visible&&_.push(y,_e,Se,F,Oe.z,null)}}else if((y.isMesh||y.isLine||y.isPoints)&&(!y.frustumCulled||H.intersectsObject(y))){const _e=ee.update(y),Se=y.material;if(B&&(y.boundingSphere!==void 0?(y.boundingSphere===null&&y.computeBoundingSphere(),Oe.copy(y.boundingSphere.center)):(_e.boundingSphere===null&&_e.computeBoundingSphere(),Oe.copy(_e.boundingSphere.center)),Oe.applyMatrix4(y.matrixWorld).applyMatrix4(xe)),Array.isArray(Se)){const Ae=_e.groups;for(let ke=0,Pe=Ae.length;ke<Pe;ke++){const Ie=Ae[ke],at=Se[Ie.materialIndex];at&&at.visible&&_.push(y,_e,at,F,Oe.z,Ie)}}else Se.visible&&_.push(y,_e,Se,F,Oe.z,null)}}const de=y.children;for(let _e=0,Se=de.length;_e<Se;_e++)an(de[_e],P,F,B)}function Tc(y,P,F,B){const N=y.opaque,de=y.transmissive,_e=y.transparent;p.setupLightsView(F),j===!0&&Be.setGlobalState(x.clippingPlanes,F),de.length>0&&gg(N,de,P,F),B&&pe.viewport(b.copy(B)),N.length>0&&lr(N,P,F),de.length>0&&lr(de,P,F),_e.length>0&&lr(_e,P,F),pe.buffers.depth.setTest(!0),pe.buffers.depth.setMask(!0),pe.buffers.color.setMask(!0),pe.setPolygonOffset(!1)}function gg(y,P,F,B){if((F.isScene===!0?F.overrideMaterial:null)!==null)return;const de=Le.isWebGL2;me===null&&(me=new Xn(1,1,{generateMipmaps:!0,type:Me.has("EXT_color_buffer_half_float")?Vi:Rn,minFilter:Gi,samples:de?4:0})),x.getDrawingBufferSize(Ue),de?me.setSize(Ue.x,Ue.y):me.setSize(Rr(Ue.x),Rr(Ue.y));const _e=x.getRenderTarget();x.setRenderTarget(me),x.getClearColor(se),L=x.getClearAlpha(),L<1&&x.setClearColor(16777215,.5),x.clear();const Se=x.toneMapping;x.toneMapping=An,lr(y,F,B),E.updateMultisampleRenderTarget(me),E.updateRenderTargetMipmap(me);let Ae=!1;for(let ke=0,Pe=P.length;ke<Pe;ke++){const Ie=P[ke],at=Ie.object,Ht=Ie.geometry,vt=Ie.material,bn=Ie.group;if(vt.side===cn&&at.layers.test(B.layers)){const it=vt.side;vt.side=Ut,vt.needsUpdate=!0,wc(at,F,B,Ht,vt,bn),vt.side=it,vt.needsUpdate=!0,Ae=!0}}Ae===!0&&(E.updateMultisampleRenderTarget(me),E.updateRenderTargetMipmap(me)),x.setRenderTarget(_e),x.setClearColor(se,L),x.toneMapping=Se}function lr(y,P,F){const B=P.isScene===!0?P.overrideMaterial:null;for(let N=0,de=y.length;N<de;N++){const _e=y[N],Se=_e.object,Ae=_e.geometry,ke=B===null?_e.material:B,Pe=_e.group;Se.layers.test(F.layers)&&wc(Se,P,F,Ae,ke,Pe)}}function wc(y,P,F,B,N,de){y.onBeforeRender(x,P,F,B,N,de),y.modelViewMatrix.multiplyMatrices(F.matrixWorldInverse,y.matrixWorld),y.normalMatrix.getNormalMatrix(y.modelViewMatrix),N.onBeforeRender(x,P,F,B,y,de),N.transparent===!0&&N.side===cn&&N.forceSinglePass===!1?(N.side=Ut,N.needsUpdate=!0,x.renderBufferDirect(F,P,B,N,y,de),N.side=Tn,N.needsUpdate=!0,x.renderBufferDirect(F,P,B,N,y,de),N.side=cn):x.renderBufferDirect(F,P,B,N,y,de),y.onAfterRender(x,P,F,B,N,de)}function cr(y,P,F){P.isScene!==!0&&(P=Te);const B=ze.get(y),N=p.state.lights,de=p.state.shadowsArray,_e=N.state.version,Se=ge.getParameters(y,N.state,de,P,F),Ae=ge.getProgramCacheKey(Se);let ke=B.programs;B.environment=y.isMeshStandardMaterial?P.environment:null,B.fog=P.fog,B.envMap=(y.isMeshStandardMaterial?O:v).get(y.envMap||B.environment),ke===void 0&&(y.addEventListener("dispose",ae),ke=new Map,B.programs=ke);let Pe=ke.get(Ae);if(Pe!==void 0){if(B.currentProgram===Pe&&B.lightsStateVersion===_e)return Rc(y,Se),Pe}else Se.uniforms=ge.getUniforms(y),y.onBuild(F,Se,x),y.onBeforeCompile(Se,x),Pe=ge.acquireProgram(Se,Ae),ke.set(Ae,Pe),B.uniforms=Se.uniforms;const Ie=B.uniforms;return(!y.isShaderMaterial&&!y.isRawShaderMaterial||y.clipping===!0)&&(Ie.clippingPlanes=Be.uniform),Rc(y,Se),B.needsLights=vg(y),B.lightsStateVersion=_e,B.needsLights&&(Ie.ambientLightColor.value=N.state.ambient,Ie.lightProbe.value=N.state.probe,Ie.directionalLights.value=N.state.directional,Ie.directionalLightShadows.value=N.state.directionalShadow,Ie.spotLights.value=N.state.spot,Ie.spotLightShadows.value=N.state.spotShadow,Ie.rectAreaLights.value=N.state.rectArea,Ie.ltc_1.value=N.state.rectAreaLTC1,Ie.ltc_2.value=N.state.rectAreaLTC2,Ie.pointLights.value=N.state.point,Ie.pointLightShadows.value=N.state.pointShadow,Ie.hemisphereLights.value=N.state.hemi,Ie.directionalShadowMap.value=N.state.directionalShadowMap,Ie.directionalShadowMatrix.value=N.state.directionalShadowMatrix,Ie.spotShadowMap.value=N.state.spotShadowMap,Ie.spotLightMatrix.value=N.state.spotLightMatrix,Ie.spotLightMap.value=N.state.spotLightMap,Ie.pointShadowMap.value=N.state.pointShadowMap,Ie.pointShadowMatrix.value=N.state.pointShadowMatrix),B.currentProgram=Pe,B.uniformsList=null,Pe}function Ac(y){if(y.uniformsList===null){const P=y.currentProgram.getUniforms();y.uniformsList=ks.seqWithValue(P.seq,y.uniforms)}return y.uniformsList}function Rc(y,P){const F=ze.get(y);F.outputColorSpace=P.outputColorSpace,F.batching=P.batching,F.instancing=P.instancing,F.instancingColor=P.instancingColor,F.skinning=P.skinning,F.morphTargets=P.morphTargets,F.morphNormals=P.morphNormals,F.morphColors=P.morphColors,F.morphTargetsCount=P.morphTargetsCount,F.numClippingPlanes=P.numClippingPlanes,F.numIntersection=P.numClipIntersection,F.vertexAlphas=P.vertexAlphas,F.vertexTangents=P.vertexTangents,F.toneMapping=P.toneMapping}function _g(y,P,F,B,N){P.isScene!==!0&&(P=Te),E.resetTextureUnits();const de=P.fog,_e=B.isMeshStandardMaterial?P.environment:null,Se=A===null?x.outputColorSpace:A.isXRRenderTarget===!0?A.texture.colorSpace:un,Ae=(B.isMeshStandardMaterial?O:v).get(B.envMap||_e),ke=B.vertexColors===!0&&!!F.attributes.color&&F.attributes.color.itemSize===4,Pe=!!F.attributes.tangent&&(!!B.normalMap||B.anisotropy>0),Ie=!!F.morphAttributes.position,at=!!F.morphAttributes.normal,Ht=!!F.morphAttributes.color;let vt=An;B.toneMapped&&(A===null||A.isXRRenderTarget===!0)&&(vt=x.toneMapping);const bn=F.morphAttributes.position||F.morphAttributes.normal||F.morphAttributes.color,it=bn!==void 0?bn.length:0,Ve=ze.get(B),Uo=p.state.lights;if(j===!0&&(ue===!0||y!==S)){const Yt=y===S&&B.id===X;Be.setState(B,y,Yt)}let rt=!1;B.version===Ve.__version?(Ve.needsLights&&Ve.lightsStateVersion!==Uo.state.version||Ve.outputColorSpace!==Se||N.isBatchedMesh&&Ve.batching===!1||!N.isBatchedMesh&&Ve.batching===!0||N.isInstancedMesh&&Ve.instancing===!1||!N.isInstancedMesh&&Ve.instancing===!0||N.isSkinnedMesh&&Ve.skinning===!1||!N.isSkinnedMesh&&Ve.skinning===!0||N.isInstancedMesh&&Ve.instancingColor===!0&&N.instanceColor===null||N.isInstancedMesh&&Ve.instancingColor===!1&&N.instanceColor!==null||Ve.envMap!==Ae||B.fog===!0&&Ve.fog!==de||Ve.numClippingPlanes!==void 0&&(Ve.numClippingPlanes!==Be.numPlanes||Ve.numIntersection!==Be.numIntersection)||Ve.vertexAlphas!==ke||Ve.vertexTangents!==Pe||Ve.morphTargets!==Ie||Ve.morphNormals!==at||Ve.morphColors!==Ht||Ve.toneMapping!==vt||Le.isWebGL2===!0&&Ve.morphTargetsCount!==it)&&(rt=!0):(rt=!0,Ve.__version=B.version);let ii=Ve.currentProgram;rt===!0&&(ii=cr(B,P,N));let Cc=!1,rs=!1,Io=!1;const Tt=ii.getUniforms(),si=Ve.uniforms;if(pe.useProgram(ii.program)&&(Cc=!0,rs=!0,Io=!0),B.id!==X&&(X=B.id,rs=!0),Cc||S!==y){Tt.setValue(I,"projectionMatrix",y.projectionMatrix),Tt.setValue(I,"viewMatrix",y.matrixWorldInverse);const Yt=Tt.map.cameraPosition;Yt!==void 0&&Yt.setValue(I,Oe.setFromMatrixPosition(y.matrixWorld)),Le.logarithmicDepthBuffer&&Tt.setValue(I,"logDepthBufFC",2/(Math.log(y.far+1)/Math.LN2)),(B.isMeshPhongMaterial||B.isMeshToonMaterial||B.isMeshLambertMaterial||B.isMeshBasicMaterial||B.isMeshStandardMaterial||B.isShaderMaterial)&&Tt.setValue(I,"isOrthographic",y.isOrthographicCamera===!0),S!==y&&(S=y,rs=!0,Io=!0)}if(N.isSkinnedMesh){Tt.setOptional(I,N,"bindMatrix"),Tt.setOptional(I,N,"bindMatrixInverse");const Yt=N.skeleton;Yt&&(Le.floatVertexTextures?(Yt.boneTexture===null&&Yt.computeBoneTexture(),Tt.setValue(I,"boneTexture",Yt.boneTexture,E)):console.warn("THREE.WebGLRenderer: SkinnedMesh can only be used with WebGL 2. With WebGL 1 OES_texture_float and vertex textures support is required."))}N.isBatchedMesh&&(Tt.setOptional(I,N,"batchingTexture"),Tt.setValue(I,"batchingTexture",N._matricesTexture,E));const No=F.morphAttributes;if((No.position!==void 0||No.normal!==void 0||No.color!==void 0&&Le.isWebGL2===!0)&&We.update(N,F,ii),(rs||Ve.receiveShadow!==N.receiveShadow)&&(Ve.receiveShadow=N.receiveShadow,Tt.setValue(I,"receiveShadow",N.receiveShadow)),B.isMeshGouraudMaterial&&B.envMap!==null&&(si.envMap.value=Ae,si.flipEnvMap.value=Ae.isCubeTexture&&Ae.isRenderTargetTexture===!1?-1:1),rs&&(Tt.setValue(I,"toneMappingExposure",x.toneMappingExposure),Ve.needsLights&&xg(si,Io),de&&B.fog===!0&&ce.refreshFogUniforms(si,de),ce.refreshMaterialUniforms(si,B,Y,G,me),ks.upload(I,Ac(Ve),si,E)),B.isShaderMaterial&&B.uniformsNeedUpdate===!0&&(ks.upload(I,Ac(Ve),si,E),B.uniformsNeedUpdate=!1),B.isSpriteMaterial&&Tt.setValue(I,"center",N.center),Tt.setValue(I,"modelViewMatrix",N.modelViewMatrix),Tt.setValue(I,"normalMatrix",N.normalMatrix),Tt.setValue(I,"modelMatrix",N.matrixWorld),B.isShaderMaterial||B.isRawShaderMaterial){const Yt=B.uniformsGroups;for(let Oo=0,Mg=Yt.length;Oo<Mg;Oo++)if(Le.isWebGL2){const Lc=Yt[Oo];Ye.update(Lc,ii),Ye.bind(Lc,ii)}else console.warn("THREE.WebGLRenderer: Uniform Buffer Objects can only be used with WebGL 2.")}return ii}function xg(y,P){y.ambientLightColor.needsUpdate=P,y.lightProbe.needsUpdate=P,y.directionalLights.needsUpdate=P,y.directionalLightShadows.needsUpdate=P,y.pointLights.needsUpdate=P,y.pointLightShadows.needsUpdate=P,y.spotLights.needsUpdate=P,y.spotLightShadows.needsUpdate=P,y.rectAreaLights.needsUpdate=P,y.hemisphereLights.needsUpdate=P}function vg(y){return y.isMeshLambertMaterial||y.isMeshToonMaterial||y.isMeshPhongMaterial||y.isMeshStandardMaterial||y.isShadowMaterial||y.isShaderMaterial&&y.lights===!0}this.getActiveCubeFace=function(){return C},this.getActiveMipmapLevel=function(){return w},this.getRenderTarget=function(){return A},this.setRenderTargetTextures=function(y,P,F){ze.get(y.texture).__webglTexture=P,ze.get(y.depthTexture).__webglTexture=F;const B=ze.get(y);B.__hasExternalTextures=!0,B.__hasExternalTextures&&(B.__autoAllocateDepthBuffer=F===void 0,B.__autoAllocateDepthBuffer||Me.has("WEBGL_multisampled_render_to_texture")===!0&&(console.warn("THREE.WebGLRenderer: Render-to-texture extension was disabled because an external texture was provided"),B.__useRenderToTexture=!1))},this.setRenderTargetFramebuffer=function(y,P){const F=ze.get(y);F.__webglFramebuffer=P,F.__useDefaultFramebuffer=P===void 0},this.setRenderTarget=function(y,P=0,F=0){A=y,C=P,w=F;let B=!0,N=null,de=!1,_e=!1;if(y){const Ae=ze.get(y);Ae.__useDefaultFramebuffer!==void 0?(pe.bindFramebuffer(I.FRAMEBUFFER,null),B=!1):Ae.__webglFramebuffer===void 0?E.setupRenderTarget(y):Ae.__hasExternalTextures&&E.rebindTextures(y,ze.get(y.texture).__webglTexture,ze.get(y.depthTexture).__webglTexture);const ke=y.texture;(ke.isData3DTexture||ke.isDataArrayTexture||ke.isCompressedArrayTexture)&&(_e=!0);const Pe=ze.get(y).__webglFramebuffer;y.isWebGLCubeRenderTarget?(Array.isArray(Pe[P])?N=Pe[P][F]:N=Pe[P],de=!0):Le.isWebGL2&&y.samples>0&&E.useMultisampledRTT(y)===!1?N=ze.get(y).__webglMultisampledFramebuffer:Array.isArray(Pe)?N=Pe[F]:N=Pe,b.copy(y.viewport),k.copy(y.scissor),$=y.scissorTest}else b.copy(W).multiplyScalar(Y).floor(),k.copy(q).multiplyScalar(Y).floor(),$=le;if(pe.bindFramebuffer(I.FRAMEBUFFER,N)&&Le.drawBuffers&&B&&pe.drawBuffers(y,N),pe.viewport(b),pe.scissor(k),pe.setScissorTest($),de){const Ae=ze.get(y.texture);I.framebufferTexture2D(I.FRAMEBUFFER,I.COLOR_ATTACHMENT0,I.TEXTURE_CUBE_MAP_POSITIVE_X+P,Ae.__webglTexture,F)}else if(_e){const Ae=ze.get(y.texture),ke=P||0;I.framebufferTextureLayer(I.FRAMEBUFFER,I.COLOR_ATTACHMENT0,Ae.__webglTexture,F||0,ke)}X=-1},this.readRenderTargetPixels=function(y,P,F,B,N,de,_e){if(!(y&&y.isWebGLRenderTarget)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");return}let Se=ze.get(y).__webglFramebuffer;if(y.isWebGLCubeRenderTarget&&_e!==void 0&&(Se=Se[_e]),Se){pe.bindFramebuffer(I.FRAMEBUFFER,Se);try{const Ae=y.texture,ke=Ae.format,Pe=Ae.type;if(ke!==$t&&fe.convert(ke)!==I.getParameter(I.IMPLEMENTATION_COLOR_READ_FORMAT)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in RGBA or implementation defined format.");return}const Ie=Pe===Vi&&(Me.has("EXT_color_buffer_half_float")||Le.isWebGL2&&Me.has("EXT_color_buffer_float"));if(Pe!==Rn&&fe.convert(Pe)!==I.getParameter(I.IMPLEMENTATION_COLOR_READ_TYPE)&&!(Pe===Ln&&(Le.isWebGL2||Me.has("OES_texture_float")||Me.has("WEBGL_color_buffer_float")))&&!Ie){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in UnsignedByteType or implementation defined type.");return}P>=0&&P<=y.width-B&&F>=0&&F<=y.height-N&&I.readPixels(P,F,B,N,fe.convert(ke),fe.convert(Pe),de)}finally{const Ae=A!==null?ze.get(A).__webglFramebuffer:null;pe.bindFramebuffer(I.FRAMEBUFFER,Ae)}}},this.copyFramebufferToTexture=function(y,P,F=0){const B=Math.pow(2,-F),N=Math.floor(P.image.width*B),de=Math.floor(P.image.height*B);E.setTexture2D(P,0),I.copyTexSubImage2D(I.TEXTURE_2D,F,0,0,y.x,y.y,N,de),pe.unbindTexture()},this.copyTextureToTexture=function(y,P,F,B=0){const N=P.image.width,de=P.image.height,_e=fe.convert(F.format),Se=fe.convert(F.type);E.setTexture2D(F,0),I.pixelStorei(I.UNPACK_FLIP_Y_WEBGL,F.flipY),I.pixelStorei(I.UNPACK_PREMULTIPLY_ALPHA_WEBGL,F.premultiplyAlpha),I.pixelStorei(I.UNPACK_ALIGNMENT,F.unpackAlignment),P.isDataTexture?I.texSubImage2D(I.TEXTURE_2D,B,y.x,y.y,N,de,_e,Se,P.image.data):P.isCompressedTexture?I.compressedTexSubImage2D(I.TEXTURE_2D,B,y.x,y.y,P.mipmaps[0].width,P.mipmaps[0].height,_e,P.mipmaps[0].data):I.texSubImage2D(I.TEXTURE_2D,B,y.x,y.y,_e,Se,P.image),B===0&&F.generateMipmaps&&I.generateMipmap(I.TEXTURE_2D),pe.unbindTexture()},this.copyTextureToTexture3D=function(y,P,F,B,N=0){if(x.isWebGL1Renderer){console.warn("THREE.WebGLRenderer.copyTextureToTexture3D: can only be used with WebGL2.");return}const de=y.max.x-y.min.x+1,_e=y.max.y-y.min.y+1,Se=y.max.z-y.min.z+1,Ae=fe.convert(B.format),ke=fe.convert(B.type);let Pe;if(B.isData3DTexture)E.setTexture3D(B,0),Pe=I.TEXTURE_3D;else if(B.isDataArrayTexture||B.isCompressedArrayTexture)E.setTexture2DArray(B,0),Pe=I.TEXTURE_2D_ARRAY;else{console.warn("THREE.WebGLRenderer.copyTextureToTexture3D: only supports THREE.DataTexture3D and THREE.DataTexture2DArray.");return}I.pixelStorei(I.UNPACK_FLIP_Y_WEBGL,B.flipY),I.pixelStorei(I.UNPACK_PREMULTIPLY_ALPHA_WEBGL,B.premultiplyAlpha),I.pixelStorei(I.UNPACK_ALIGNMENT,B.unpackAlignment);const Ie=I.getParameter(I.UNPACK_ROW_LENGTH),at=I.getParameter(I.UNPACK_IMAGE_HEIGHT),Ht=I.getParameter(I.UNPACK_SKIP_PIXELS),vt=I.getParameter(I.UNPACK_SKIP_ROWS),bn=I.getParameter(I.UNPACK_SKIP_IMAGES),it=F.isCompressedTexture?F.mipmaps[N]:F.image;I.pixelStorei(I.UNPACK_ROW_LENGTH,it.width),I.pixelStorei(I.UNPACK_IMAGE_HEIGHT,it.height),I.pixelStorei(I.UNPACK_SKIP_PIXELS,y.min.x),I.pixelStorei(I.UNPACK_SKIP_ROWS,y.min.y),I.pixelStorei(I.UNPACK_SKIP_IMAGES,y.min.z),F.isDataTexture||F.isData3DTexture?I.texSubImage3D(Pe,N,P.x,P.y,P.z,de,_e,Se,Ae,ke,it.data):F.isCompressedArrayTexture?(console.warn("THREE.WebGLRenderer.copyTextureToTexture3D: untested support for compressed srcTexture."),I.compressedTexSubImage3D(Pe,N,P.x,P.y,P.z,de,_e,Se,Ae,it.data)):I.texSubImage3D(Pe,N,P.x,P.y,P.z,de,_e,Se,Ae,ke,it),I.pixelStorei(I.UNPACK_ROW_LENGTH,Ie),I.pixelStorei(I.UNPACK_IMAGE_HEIGHT,at),I.pixelStorei(I.UNPACK_SKIP_PIXELS,Ht),I.pixelStorei(I.UNPACK_SKIP_ROWS,vt),I.pixelStorei(I.UNPACK_SKIP_IMAGES,bn),N===0&&B.generateMipmaps&&I.generateMipmap(Pe),pe.unbindTexture()},this.initTexture=function(y){y.isCubeTexture?E.setTextureCube(y,0):y.isData3DTexture?E.setTexture3D(y,0):y.isDataArrayTexture||y.isCompressedArrayTexture?E.setTexture2DArray(y,0):E.setTexture2D(y,0),pe.unbindTexture()},this.resetState=function(){C=0,w=0,A=null,pe.reset(),Fe.reset()},typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}get coordinateSystem(){return dn}get outputColorSpace(){return this._outputColorSpace}set outputColorSpace(e){this._outputColorSpace=e;const t=this.getContext();t.drawingBufferColorSpace=e===Er?"display-p3":"srgb",t.unpackColorSpace=$e.workingColorSpace===cs?"display-p3":"srgb"}get outputEncoding(){return console.warn("THREE.WebGLRenderer: Property .outputEncoding has been removed. Use .outputColorSpace instead."),this.outputColorSpace===ft?Wn:Aa}set outputEncoding(e){console.warn("THREE.WebGLRenderer: Property .outputEncoding has been removed. Use .outputColorSpace instead."),this.outputColorSpace=e===Wn?ft:un}get useLegacyLights(){return console.warn("THREE.WebGLRenderer: The property .useLegacyLights has been deprecated. Migrate your lighting according to the following guide: https://discourse.threejs.org/t/updates-to-lighting-in-three-js-r155/53733."),this._useLegacyLights}set useLegacyLights(e){console.warn("THREE.WebGLRenderer: The property .useLegacyLights has been deprecated. Migrate your lighting according to the following guide: https://discourse.threejs.org/t/updates-to-lighting-in-three-js-r155/53733."),this._useLegacyLights=e}}class nm extends Bl{}nm.prototype.isWebGL1Renderer=!0;class to{constructor(e,t=1,n=1e3){this.isFog=!0,this.name="",this.color=new De(e),this.near=t,this.far=n}clone(){return new to(this.color,this.near,this.far)}toJSON(){return{type:"Fog",name:this.name,color:this.color.getHex(),near:this.near,far:this.far}}}class im extends mt{constructor(){super(),this.isScene=!0,this.type="Scene",this.background=null,this.environment=null,this.fog=null,this.backgroundBlurriness=0,this.backgroundIntensity=1,this.overrideMaterial=null,typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}copy(e,t){return super.copy(e,t),e.background!==null&&(this.background=e.background.clone()),e.environment!==null&&(this.environment=e.environment.clone()),e.fog!==null&&(this.fog=e.fog.clone()),this.backgroundBlurriness=e.backgroundBlurriness,this.backgroundIntensity=e.backgroundIntensity,e.overrideMaterial!==null&&(this.overrideMaterial=e.overrideMaterial.clone()),this.matrixAutoUpdate=e.matrixAutoUpdate,this}toJSON(e){const t=super.toJSON(e);return this.fog!==null&&(t.object.fog=this.fog.toJSON()),this.backgroundBlurriness>0&&(t.object.backgroundBlurriness=this.backgroundBlurriness),this.backgroundIntensity!==1&&(t.object.backgroundIntensity=this.backgroundIntensity),t}}class kl extends Mi{constructor(e){super(),this.isLineBasicMaterial=!0,this.type="LineBasicMaterial",this.color=new De(16777215),this.map=null,this.linewidth=1,this.linecap="round",this.linejoin="round",this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.linewidth=e.linewidth,this.linecap=e.linecap,this.linejoin=e.linejoin,this.fog=e.fog,this}}const Hl=new U,Gl=new U,Vl=new lt,no=new Ga,Hs=new xs;class sm extends mt{constructor(e=new _n,t=new kl){super(),this.isLine=!0,this.type="Line",this.geometry=e,this.material=t,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}computeLineDistances(){const e=this.geometry;if(e.index===null){const t=e.attributes.position,n=[0];for(let s=1,r=t.count;s<r;s++)Hl.fromBufferAttribute(t,s-1),Gl.fromBufferAttribute(t,s),n[s]=n[s-1],n[s]+=Hl.distanceTo(Gl);e.setAttribute("lineDistance",new en(n,1))}else console.warn("THREE.Line.computeLineDistances(): Computation only possible with non-indexed BufferGeometry.");return this}raycast(e,t){const n=this.geometry,s=this.matrixWorld,r=e.params.Line.threshold,a=n.drawRange;if(n.boundingSphere===null&&n.computeBoundingSphere(),Hs.copy(n.boundingSphere),Hs.applyMatrix4(s),Hs.radius+=r,e.ray.intersectsSphere(Hs)===!1)return;Vl.copy(s).invert(),no.copy(e.ray).applyMatrix4(Vl);const o=r/((this.scale.x+this.scale.y+this.scale.z)/3),c=o*o,l=new U,d=new U,h=new U,f=new U,m=this.isLineSegments?2:1,g=n.index,p=n.attributes.position;if(g!==null){const u=Math.max(0,a.start),M=Math.min(g.count,a.start+a.count);for(let x=u,T=M-1;x<T;x+=m){const C=g.getX(x),w=g.getX(x+1);if(l.fromBufferAttribute(p,C),d.fromBufferAttribute(p,w),no.distanceSqToSegment(l,d,f,h)>c)continue;f.applyMatrix4(this.matrixWorld);const X=e.ray.origin.distanceTo(f);X<e.near||X>e.far||t.push({distance:X,point:h.clone().applyMatrix4(this.matrixWorld),index:x,face:null,faceIndex:null,object:this})}}else{const u=Math.max(0,a.start),M=Math.min(p.count,a.start+a.count);for(let x=u,T=M-1;x<T;x+=m){if(l.fromBufferAttribute(p,x),d.fromBufferAttribute(p,x+1),no.distanceSqToSegment(l,d,f,h)>c)continue;f.applyMatrix4(this.matrixWorld);const w=e.ray.origin.distanceTo(f);w<e.near||w>e.far||t.push({distance:w,point:h.clone().applyMatrix4(this.matrixWorld),index:x,face:null,faceIndex:null,object:this})}}}updateMorphTargets(){const t=this.geometry.morphAttributes,n=Object.keys(t);if(n.length>0){const s=t[n[0]];if(s!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let r=0,a=s.length;r<a;r++){const o=s[r].name||String(r);this.morphTargetInfluences.push(0),this.morphTargetDictionary[o]=r}}}}}const Wl=new U,Xl=new U;class rm extends sm{constructor(e,t){super(e,t),this.isLineSegments=!0,this.type="LineSegments"}computeLineDistances(){const e=this.geometry;if(e.index===null){const t=e.attributes.position,n=[];for(let s=0,r=t.count;s<r;s+=2)Wl.fromBufferAttribute(t,s),Xl.fromBufferAttribute(t,s+1),n[s]=s===0?0:n[s-1],n[s+1]=n[s]+Wl.distanceTo(Xl);e.setAttribute("lineDistance",new en(n,1))}else console.warn("THREE.LineSegments.computeLineDistances(): Computation only possible with non-indexed BufferGeometry.");return this}}class om extends At{constructor(e,t,n,s,r,a,o,c,l){super(e,t,n,s,r,a,o,c,l),this.isCanvasTexture=!0,this.needsUpdate=!0}}class Gs extends Mi{constructor(e){super(),this.isMeshStandardMaterial=!0,this.defines={STANDARD:""},this.type="MeshStandardMaterial",this.color=new De(16777215),this.roughness=1,this.metalness=0,this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.emissive=new De(0),this.emissiveIntensity=1,this.emissiveMap=null,this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=Ra,this.normalScale=new qe(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.roughnessMap=null,this.metalnessMap=null,this.alphaMap=null,this.envMap=null,this.envMapIntensity=1,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.flatShading=!1,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.defines={STANDARD:""},this.color.copy(e.color),this.roughness=e.roughness,this.metalness=e.metalness,this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.emissive.copy(e.emissive),this.emissiveMap=e.emissiveMap,this.emissiveIntensity=e.emissiveIntensity,this.bumpMap=e.bumpMap,this.bumpScale=e.bumpScale,this.normalMap=e.normalMap,this.normalMapType=e.normalMapType,this.normalScale.copy(e.normalScale),this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.roughnessMap=e.roughnessMap,this.metalnessMap=e.metalnessMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.envMapIntensity=e.envMapIntensity,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.flatShading=e.flatShading,this.fog=e.fog,this}}const jl={enabled:!1,files:{},add:function(i,e){this.enabled!==!1&&(this.files[i]=e)},get:function(i){if(this.enabled!==!1)return this.files[i]},remove:function(i){delete this.files[i]},clear:function(){this.files={}}};class am{constructor(e,t,n){const s=this;let r=!1,a=0,o=0,c;const l=[];this.onStart=void 0,this.onLoad=e,this.onProgress=t,this.onError=n,this.itemStart=function(d){o++,r===!1&&s.onStart!==void 0&&s.onStart(d,a,o),r=!0},this.itemEnd=function(d){a++,s.onProgress!==void 0&&s.onProgress(d,a,o),a===o&&(r=!1,s.onLoad!==void 0&&s.onLoad())},this.itemError=function(d){s.onError!==void 0&&s.onError(d)},this.resolveURL=function(d){return c?c(d):d},this.setURLModifier=function(d){return c=d,this},this.addHandler=function(d,h){return l.push(d,h),this},this.removeHandler=function(d){const h=l.indexOf(d);return h!==-1&&l.splice(h,2),this},this.getHandler=function(d){for(let h=0,f=l.length;h<f;h+=2){const m=l[h],g=l[h+1];if(m.global&&(m.lastIndex=0),m.test(d))return g}return null}}}const lm=new am;class io{constructor(e){this.manager=e!==void 0?e:lm,this.crossOrigin="anonymous",this.withCredentials=!1,this.path="",this.resourcePath="",this.requestHeader={}}load(){}loadAsync(e,t){const n=this;return new Promise(function(s,r){n.load(e,s,t,r)})}parse(){}setCrossOrigin(e){return this.crossOrigin=e,this}setWithCredentials(e){return this.withCredentials=e,this}setPath(e){return this.path=e,this}setResourcePath(e){return this.resourcePath=e,this}setRequestHeader(e){return this.requestHeader=e,this}}io.DEFAULT_MATERIAL_NAME="__DEFAULT";class cm extends io{constructor(e){super(e)}load(e,t,n,s){this.path!==void 0&&(e=this.path+e),e=this.manager.resolveURL(e);const r=this,a=jl.get(e);if(a!==void 0)return r.manager.itemStart(e),setTimeout(function(){t&&t(a),r.manager.itemEnd(e)},0),a;const o=ji("img");function c(){d(),jl.add(e,this),t&&t(this),r.manager.itemEnd(e)}function l(h){d(),s&&s(h),r.manager.itemError(e),r.manager.itemEnd(e)}function d(){o.removeEventListener("load",c,!1),o.removeEventListener("error",l,!1)}return o.addEventListener("load",c,!1),o.addEventListener("error",l,!1),e.slice(0,5)!=="data:"&&this.crossOrigin!==void 0&&(o.crossOrigin=this.crossOrigin),r.manager.itemStart(e),o.src=e,o}}class um extends io{constructor(e){super(e)}load(e,t,n,s){const r=new At,a=new cm(this.manager);return a.setCrossOrigin(this.crossOrigin),a.setPath(this.path),a.load(e,function(o){r.image=o,r.needsUpdate=!0,t!==void 0&&t(r)},n,s),r}}class ql extends mt{constructor(e,t=1){super(),this.isLight=!0,this.type="Light",this.color=new De(e),this.intensity=t}dispose(){}copy(e,t){return super.copy(e,t),this.color.copy(e.color),this.intensity=e.intensity,this}toJSON(e){const t=super.toJSON(e);return t.object.color=this.color.getHex(),t.object.intensity=this.intensity,this.groundColor!==void 0&&(t.object.groundColor=this.groundColor.getHex()),this.distance!==void 0&&(t.object.distance=this.distance),this.angle!==void 0&&(t.object.angle=this.angle),this.decay!==void 0&&(t.object.decay=this.decay),this.penumbra!==void 0&&(t.object.penumbra=this.penumbra),this.shadow!==void 0&&(t.object.shadow=this.shadow.toJSON()),t}}class dm extends ql{constructor(e,t,n){super(e,n),this.isHemisphereLight=!0,this.type="HemisphereLight",this.position.copy(mt.DEFAULT_UP),this.updateMatrix(),this.groundColor=new De(t)}copy(e,t){return super.copy(e,t),this.groundColor.copy(e.groundColor),this}}const so=new lt,Yl=new U,$l=new U;class hm{constructor(e){this.camera=e,this.bias=0,this.normalBias=0,this.radius=1,this.blurSamples=8,this.mapSize=new qe(512,512),this.map=null,this.mapPass=null,this.matrix=new lt,this.autoUpdate=!0,this.needsUpdate=!1,this._frustum=new jr,this._frameExtents=new qe(1,1),this._viewportCount=1,this._viewports=[new pt(0,0,1,1)]}getViewportCount(){return this._viewportCount}getFrustum(){return this._frustum}updateMatrices(e){const t=this.camera,n=this.matrix;Yl.setFromMatrixPosition(e.matrixWorld),t.position.copy(Yl),$l.setFromMatrixPosition(e.target.matrixWorld),t.lookAt($l),t.updateMatrixWorld(),so.multiplyMatrices(t.projectionMatrix,t.matrixWorldInverse),this._frustum.setFromProjectionMatrix(so),n.set(.5,0,0,.5,0,.5,0,.5,0,0,.5,.5,0,0,0,1),n.multiply(so)}getViewport(e){return this._viewports[e]}getFrameExtents(){return this._frameExtents}dispose(){this.map&&this.map.dispose(),this.mapPass&&this.mapPass.dispose()}copy(e){return this.camera=e.camera.clone(),this.bias=e.bias,this.radius=e.radius,this.mapSize.copy(e.mapSize),this}clone(){return new this.constructor().copy(this)}toJSON(){const e={};return this.bias!==0&&(e.bias=this.bias),this.normalBias!==0&&(e.normalBias=this.normalBias),this.radius!==1&&(e.radius=this.radius),(this.mapSize.x!==512||this.mapSize.y!==512)&&(e.mapSize=this.mapSize.toArray()),e.camera=this.camera.toJSON(!1).object,delete e.camera.matrix,e}}class fm extends hm{constructor(){super(new ul(-5,5,5,-5,.5,500)),this.isDirectionalLightShadow=!0}}class pm extends ql{constructor(e,t){super(e,t),this.isDirectionalLight=!0,this.type="DirectionalLight",this.position.copy(mt.DEFAULT_UP),this.updateMatrix(),this.target=new mt,this.shadow=new fm}dispose(){this.shadow.dispose()}copy(e){return super.copy(e),this.target=e.target.clone(),this.shadow=e.shadow.clone(),this}}class mm extends rm{constructor(e=10,t=10,n=4473924,s=8947848){n=new De(n),s=new De(s);const r=t/2,a=e/t,o=e/2,c=[],l=[];for(let f=0,m=0,g=-o;f<=t;f++,g+=a){c.push(-o,0,g,o,0,g),c.push(g,0,-o,g,0,o);const _=f===r?n:s;_.toArray(l,m),m+=3,_.toArray(l,m),m+=3,_.toArray(l,m),m+=3,_.toArray(l,m),m+=3}const d=new _n;d.setAttribute("position",new en(c,3)),d.setAttribute("color",new en(l,3));const h=new kl({vertexColors:!0,toneMapped:!1});super(d,h),this.type="GridHelper"}dispose(){this.geometry.dispose(),this.material.dispose()}}typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("register",{detail:{revision:ur}})),typeof window<"u"&&(window.__THREE__?console.warn("WARNING: Multiple instances of Three.js being imported."):window.__THREE__=ur);const Re=38,xn=1.5,gm=4,_m=13,Zl=3,Ui=2,ei=Math.ceil(Re*2/Ui),ro=.6,Kl=.12,_t=(i,e,t)=>Math.max(e,Math.min(t,i));function xm(i=24){const e=[];let t=0;const n=s=>Math.round(s/xn)*xn;for(;e.length<i&&t<500;){t++;const s=n(3+Math.random()*5),r=n(3+Math.random()*5),a=n((Math.random()*2-1)*(Re-5)),o=n((Math.random()*2-1)*(Re-5)),c=1+Math.floor(Math.random()*gm);if(Math.hypot(a,o)<_m+Math.max(s,r)/2||Math.abs(a)+s/2>Re-Zl||Math.abs(o)+r/2>Re-Zl)continue;let l=!0;for(const d of e)if(Math.abs(a-d.x)<(s+d.w)/2+1.6&&Math.abs(o-d.z)<(r+d.d)/2+1.6){l=!1;break}l&&e.push({x:+a.toFixed(2),z:+o.toFixed(2),w:+s.toFixed(2),d:+r.toFixed(2),t:c})}return e}function oo(i,e,t,n=0){let s=0;for(const r of i)if(e>r.x-r.w/2-n&&e<r.x+r.w/2+n&&t>r.z-r.d/2-n&&t<r.z+r.d/2+n){const a=r.t*xn;a>s&&(s=a)}return s}function ao(i,e,t,n,s,r,a,o,c,l){const d=Math.cos(s),h=Math.sin(s),f=Math.cos(l),m=Math.sin(l),g=[[d,h],[-h,d],[f,m],[-m,f]],_=i-r,p=e-a;for(const[u,M]of g){const x=t*Math.abs(d*u+h*M)+n*Math.abs(-h*u+d*M),T=o*Math.abs(f*u+m*M)+c*Math.abs(-m*u+f*M);if(Math.abs(_*u+p*M)>x+T)return!1}return!0}function vm(i,e,t,n,s=0){for(const r of i)if(s<r.t*xn-.01){const a=_t(e,r.x-r.w/2,r.x+r.w/2),o=_t(t,r.z-r.d/2,r.z+r.d/2),c=e-a,l=t-o;if(c*c+l*l<n*n)return!0}return!1}function Vs(i,e,t,n,s,r,a=0){const o=d=>_t(d,-Re+1,Re-1);let c=n,l=s;for(let d=0;d<4;d++){let h=0,f=0,m=0;for(const u of i){if(a>=u.t*xn-.01)continue;const M=_t(c,u.x-u.w/2,u.x+u.w/2),x=_t(l,u.z-u.d/2,u.z+u.d/2),T=c-M,C=l-x,w=T*T+C*C;if(w<r*r){let A,X,S;if(w<1e-9)if(Math.abs(e-u.x)>=Math.abs(t-u.z)){A=e<=u.x?-1:1,X=0;const b=e<=u.x?u.x-u.w/2:u.x+u.w/2;S=Math.abs(c-b)+r}else{A=0,X=t<=u.z?-1:1;const b=t<=u.z?u.z-u.d/2:u.z+u.d/2;S=Math.abs(l-b)+r}else{const b=Math.sqrt(w);S=r-b,A=T/b,X=C/b}S>m&&(m=S,h=A,f=X)}}if(m<=0)break;c+=h*m,l+=f*m;let g=n-c,_=s-l;const p=g*h+_*f;if(g-=p*h,_-=p*f,c+=g,l+=_,g*g+_*_<1e-6)break}return{x:o(c),z:o(l)}}function Jl(i,e,t=ro){for(let n=0;n<6;n++){let s=0,r=0,a=0;for(const o of i){if(e.y>=o.t*xn-.01)continue;const c=o.x-o.w/2,l=o.x+o.w/2,d=o.z-o.d/2,h=o.z+o.d/2,f=_t(e.x,c,l),m=_t(e.z,d,h),g=e.x-f,_=e.z-m,p=g*g+_*_;if(p>=t*t)continue;let u,M,x;if(p>1e-9){const T=Math.sqrt(p);u=g/T,M=_/T,x=t-T}else{const T=Math.hypot(e.x,e.z)||1;u=-e.x/T,M=-e.z/T,x=t}x>a&&(s=u*x,r=M*x,a=x)}if(a<=0)break;e.x=_t(e.x+s,-Re+1,Re-1),e.z=_t(e.z+r,-Re+1,Re-1)}}function Mm(i,e,t,n,s,r=1.1){for(const a of i)if(!(a.t*xn<=r)&&ym(e,t,n,s,a.x-a.w/2,a.z-a.d/2,a.x+a.w/2,a.z+a.d/2))return!1;return!0}function ym(i,e,t,n,s,r,a,o){let c=0,l=1;const d=t-i,h=n-e,f=[[i,d,s,a],[e,h,r,o]];for(const[m,g,_,p]of f)if(Math.abs(g)<1e-9){if(m<_||m>p)return!1}else{let u=(_-m)/g,M=(p-m)/g;if(u>M){const x=u;u=M,M=x}if(u>c&&(c=u),M<l&&(l=M),c>l)return!1}return!0}function Sm(i){const e=new Uint8Array(ei*ei);for(let t=0;t<ei;t++)for(let n=0;n<ei;n++){const s=-Re+(n+.5)*Ui,r=-Re+(t+.5)*Ui;vm(i,s,r,.9,0)&&(e[t*ei+n]=1)}return{n:ei,cells:e}}const Ws=i=>_t(Math.floor((i+Re)/Ui),0,ei-1);function Em(i,e,t,n,s){const r=i.n,a=i.cells,o=Ws(e),c=Ws(t),l=Ws(n),d=Ws(s),h=c*r+o,f=d*r+l;if(h===f)return null;const m=new Int32Array(r*r).fill(-1);m[h]=h;const g=[h];let _=0,p=-1;for(;_<g.length;){const T=g[_++];if(T===f){p=T;break}const C=T%r,w=(T-C)/r;C+1<r&&u(w*r+C+1,T),C-1>=0&&u(w*r+C-1,T),w+1<r&&u((w+1)*r+C,T),w-1>=0&&u((w-1)*r+C,T)}function u(T,C){!a[T]&&m[T]===-1&&(m[T]=C,g.push(T))}if(p<0)return null;const M=[];let x=p;for(;x!==h;){const T=x%r,C=(x-T)/r;M.push({x:-Re+(T+.5)*Ui,z:-Re+(C+.5)*Ui}),x=m[x]}return M.reverse(),M}function bm(i,e,t,n,s){const r=Re-.4;if(Math.abs(e.x)>r){if(!s)return!0;e.x=Math.sign(e.x)*2*r-e.x,e.vx=-e.vx}if(Math.abs(e.z)>r){if(!s)return!0;e.z=Math.sign(e.z)*2*r-e.z,e.vz=-e.vz}const a=e.y==null?1.2:e.y;for(const o of i){if(a>=o.t*xn)continue;const c=_t(e.x,o.x-o.w/2,o.x+o.w/2),l=_t(e.z,o.z-o.d/2,o.z+o.d/2),d=e.x-c,h=e.z-l;if(d*d+h*h>=Kl*Kl)continue;if(!s)return!0;const f=o.x-o.w/2,m=o.x+o.w/2,g=o.z-o.d/2,_=o.z+o.d/2,p=t>f&&t<m,u=n>g&&n<_;if(p&&u)return!0;p||(e.x=t<=f?2*f-e.x:2*m-e.x,e.vx=-e.vx),u||(e.z=n<=g?2*g-e.z:2*_-e.z,e.vz=-e.vz)}return!1}function Tm(i,e){if(e==="mix"){const n=Math.random();return n<.5?"walker":n<.8?"seeker":"flyer"}const t=["walker"];return i>=8&&t.push("seeker"),i>=20&&t.push("flyer"),t[Math.floor(Math.random()*t.length)]}const wm={walker:{hp:3,spd:1},seeker:{hp:4,spd:.95},flyer:{hp:2,spd:1.05}},es=.9,Am=1.7,Rm=1.6;function Cm(i,e,t){const{obs:n,grid:s,players:r}=t;let a=null,o=1e9;for(const m in r){const g=r[m];if(!g.alive)continue;const _=Math.hypot(g.x-i.x,g.z-i.z);_<o&&(o=_,a=g)}if(i.atkCd-=e,!a)return null;const c=ao(i.x,i.z,es,es,0,a.x,a.z,ro,ro,a.aim);if(i.k==="flyer"){const m=Math.atan2(a.x-i.x,a.z-i.z);i.x=_t(i.x+Math.sin(m)*i.speed*e,-Re+1,Re-1),i.z=_t(i.z+Math.cos(m)*i.speed*e,-Re+1,Re-1);const g=Math.max(oo(n,i.x,i.z,es)+.5,a.y);return i.y=(i.y||0)+(g-(i.y||0))*Math.min(1,6*e),c&&Math.abs((i.y||0)-a.y)<Rm&&i.atkCd<=0?(i.atkCd=.8,a):null}let l;if(i.k==="seeker"){i.pt=(i.pt||0)-e,(i.pt<=0||!i.path||!i.path.length)&&(i.pt=.6,i.path=s&&Em(s,i.x,i.z,a.x,a.z)||[]),i.path.length&&Math.hypot(i.path[0].x-i.x,i.path[0].z-i.z)<1&&i.path.shift();const m=i.path[0];l=m?Math.atan2(m.x-i.x,m.z-i.z):Math.atan2(a.x-i.x,a.z-i.z)}else if(Mm(n,i.x,i.z,a.x,a.z))l=Math.atan2(a.x-i.x,a.z-i.z);else{i.wt=(i.wt||0)-e,i.wt<=0&&(i.wt=1.5+Math.random()*2,i.wa=Math.random()*Math.PI*2);const m=i.x+Math.sin(i.wa)*i.speed*.45*e,g=i.z+Math.cos(i.wa)*i.speed*.45*e,_=Vs(n,i.x,i.z,m,g,es,0);return i.x=_t(_.x,-Re+1,Re-1),i.z=_t(_.z,-Re+1,Re-1),null}const d=i.x+Math.sin(l)*i.speed*e,h=i.z+Math.cos(l)*i.speed*e,f=Vs(n,i.x,i.z,d,h,es,0);return i.x=_t(f.x,-Re+1,Re-1),i.z=_t(f.z,-Re+1,Re-1),c&&a.y<Am&&i.atkCd<=0?(i.atkCd=.8,a):null}const Ii={COMBAT:{baseDamage:34,baseMoveSpeed:12,baseHP:100,bulletSpeed:32,fireRate:6.25,jumpForce:9.5},TALENT:{pointsPerPlayer:10,attackPerLevel:3,defensePerLevel:2,speedPerLevel:.3,scalePerLevel:.05,livesPerLevel:1,costTable:[1,1,2,2,3,4],maxLevel:6},ROOM:{timeLimit:10,maxPlayers:8,mapSize:50,baseLives:3,playerScale:1}};function lo(i){const e=i||{},t={COMBAT:{...Ii.COMBAT},TALENT:{...Ii.TALENT,costTable:[...Ii.TALENT.costTable]},ROOM:{...Ii.ROOM}};return e.COMBAT&&Object.assign(t.COMBAT,e.COMBAT),e.TALENT&&Object.assign(t.TALENT,e.TALENT),e.ROOM&&Object.assign(t.ROOM,e.ROOM),t}function vn(i){const e=Ii.TALENT.costTable;let t=0;const n=Math.max(0,Math.min(i|0,e.length));for(let s=0;s<n;s++)t+=e[s];return t}function co(i){return i=i||{},vn(i.atk|0)+vn(i.def|0)+vn(i.spd|0)+vn(i.size|0)+vn(i.lives|0)}function Ni(i,e){const t=i.COMBAT,n=i.TALENT,s=e||{},r=s.atk|0,a=s.def|0,o=s.spd|0,c=s.size|0,l=s.lives|0;return{damage:t.baseDamage+r*n.attackPerLevel,defense:a*n.defensePerLevel,moveSpeed:t.baseMoveSpeed+o*n.speedPerLevel,scale:Math.max(.2,(i.ROOM&&i.ROOM.playerScale||1)*(1-c*n.scalePerLevel)),extraLives:l*n.livesPerLevel}}const Fn=.6,Ql=.25,ec=.9,Xs=.12,Lm=1.3,Pm=1.6,Dm=4.4,Um=9,tc=100,Im=22,Nm=1.1,uo=2.5,nc=24,ho=.15,ic=.1,Om=1.8,fo=[5217279,16752451,3066993,16735870,11889663,4642518],po={player:{tintByPlayer:!0,parts:[{size:[1.2,1.8,1.2],pos:[0,.9,0],color:"#4f9bff",roughness:.55,metalness:.1},{size:[1.18,.3,1.18],pos:[0,1.95,0],color:"#3b2a1a",noTint:!0,roughness:.9,metalness:0}]},zombie_walker:{parts:[{size:[1.8,1.55,1.8],pos:[0,.775,0],color:"#6fae4f",roughness:.85,metalness:0}]},zombie_seeker:{parts:[{size:[1.8,1.6,1.8],pos:[0,.8,0],color:"#d98b3a",roughness:.8,metalness:.05}]},zombie_flyer:{parts:[{size:[1.8,1.2,1.8],pos:[0,.6,0],color:"#8e6bd6",roughness:.5,metalness:.2}]},zombie:{parts:[{size:[1.8,1.55,1.8],pos:[0,.775,0],color:"#6fae4f",roughness:.85,metalness:0}]},bullet:{parts:[{size:[.24,.24,.24],pos:[0,0,0],color:"#fff2a0",emissive:"#ffd000",emissiveIntensity:1.4}]}},js=(i,e,t)=>Math.max(e,Math.min(t,i));class Fm{constructor(e){this.canvas=e;const t=(()=>{try{return/Quark|UCBrowser|UCWEB/i.test(navigator.userAgent||"")}catch{return!1}})();let n=null,s=!1;if(t){const r={alpha:!1,antialias:!1,depth:!0,stencil:!0,powerPreference:"high-performance",gameMode:!0};try{n=e.getContext("webgl2",r)||e.getContext("webgl",r)}catch{n=null}if(n)try{s=!!(n.getContextAttributes()||{}).gameMode}catch{s=!1}}this._gl=n,this._gameMode=s,this.renderer=new Bl(n?{canvas:e,context:n,antialias:!1,alpha:!1,powerPreference:"high-performance"}:t?{canvas:e,antialias:!1,alpha:!1,powerPreference:"high-performance"}:{canvas:e,antialias:!0}),this.renderer.setPixelRatio(Math.min(window.devicePixelRatio||1,2)),this.renderer.shadowMap.enabled=!0,this.renderer.shadowMap.type=ko,this.scene=new im,this.scene.background=new De(8900331),this.scene.fog=new to(8900331,60,170),this.camera=new qt(70,1,.1,400),this.camera.position.set(0,1.6,0),this.scene.add(this.camera),this._buildWorld(),this.playerMeshes=new Map,this.zombieMeshes=new Map,this.bulletMeshes=new Map,this.myId="host",this.state=this._emptyState(),this.config=lo(),this.snaps=[],this.clientInterp=!1,this.myPitch=0,this.myYaw=null,this.pred=null,this.predInput=null,this.predHist=[],this._lastRT=0,this._predAcc=0,this._simT=0,this._predStates=[],this._cmdSeq=0,this._unacked=[],this._pendingCmds=[],this._jumpLatch=!1,this.onCmds=null,this.resize(),window.addEventListener("resize",()=>this.resize()),this.assetBase=new URL("assets/entities/",document.baseURI).href,this.entityMod=null,this._texCache={},this._loadEntityMod()}_emptyState(){return{players:{},zombies:[],bullets:[],obstacles:[],grid:null,bounce:!1,zmix:"progress",score:0,target:tc,status:"waiting",mode:"wave",livesMax:1,winner:null,nextZid:1,nextBid:1,spawnCd:0,matchTime:0,nextEventId:1,events:[]}}_buildWorld(){const e=new dm(13625087,9411237,.95);this.scene.add(e);const t=new pm(16777215,1.15);t.position.set(22,42,18),t.castShadow=!0,t.shadow.mapSize.set(1024,1024);const n=52,s=t.shadow.camera;s.left=-n,s.right=n,s.top=n,s.bottom=-n,s.near=1,s.far=130,this.scene.add(t);const r=new jt(new Os(Re*2,Re*2),new Gs({color:15921906,roughness:.95,metalness:0}));r.rotation.x=-Math.PI/2,r.receiveShadow=!0,this.scene.add(r);const a=new mm(Re*2,Re,7041664,10134445);a.position.y=.02,this.scene.add(a);const o=document.createElement("canvas");o.width=128,o.height=128;{const f=o.getContext("2d");f.fillStyle="#a7adb5",f.fillRect(0,0,128,128),f.strokeStyle="#7e848c",f.lineWidth=5;for(let m=0;m<=128;m+=32)f.beginPath(),f.moveTo(0,m),f.lineTo(128,m),f.stroke();for(let m=0;m<4;m++){const g=m%2?32:0;for(let _=g;_<=128;_+=64)f.beginPath(),f.moveTo(_,m*32),f.lineTo(_,m*32+32),f.stroke()}}const c=6,l=1,d=Re,h=(f,m,g,_)=>{const p=new om(o);p.wrapS=p.wrapT=ls,p.repeat.set(Math.max(f,m)/4,c/4);const u=new Gs({map:p,roughness:.95,metalness:0}),M=new jt(new On(f,c,m),u);M.position.set(g,c/2,_),M.castShadow=!0,M.receiveShadow=!0,this.scene.add(M)};h(d*2+l,l,0,-d),h(d*2+l,l,0,d),h(l,d*2+l,-d,0),h(l,d*2+l,d,0),this.obstacleGroup=new Di,this.scene.add(this.obstacleGroup)}_rebuildObstacles(e){if(!this.obstacleGroup)return;for(const n of[...this.obstacleGroup.children])this.obstacleGroup.remove(n),n.traverse(s=>{s.geometry&&s.geometry.dispose(),s.material&&s.material.dispose()});const t=new Gs({color:13715775,roughness:.85,metalness:.05});for(const n of e||[]){const s=n.t*xn,r=new jt(new On(n.w,s,n.d),t);r.position.set(n.x,s/2,n.z),r.castShadow=!0,r.receiveShadow=!0,this.obstacleGroup.add(r)}}resize(){const e=window.innerWidth,t=window.innerHeight;this.renderer.setSize(e,t,!1),this.camera.aspect=e/t,this.camera.updateProjectionMatrix()}async _loadEntityMod(){try{const e=await fetch(this.assetBase+"mod.json");e.ok&&(this.entityMod=await e.json(),this._collectTextures(),this._clearMeshes())}catch(e){console.warn("[assets] mod.json 加载失败，使用内置默认建模",e)}}_collectTextures(){const e=this.entityMod;if(e)for(const t in e){if(t.startsWith("zombie"))continue;const n=e[t];if(!(!n||!n.parts))for(const s of n.parts)s.texture&&this._loadTexture(s.texture)}}_loadTexture(e){const t=this.assetBase+e;if(this._texCache[t])return this._texCache[t];const n=new um().load(t);return n.colorSpace=ft,n.wrapS=n.wrapT=Gt,n.anisotropy=4,this._texCache[t]=n,n}_buildMaterial(e,t){const n={roughness:e.roughness??.6,metalness:e.metalness??.1};return e.texture?(n.map=this._loadTexture(e.texture),n.color=16777215):n.color=e.color?new De(e.color):new De(8947848),t&&(n.color=new De(t)),e.emissive&&(n.emissive=new De(e.emissive),n.emissiveIntensity=e.emissiveIntensity??1),new Gs(n)}_makeBoxPart(e,t){var s,r,a;const n=new jt(new On(e.size[0],e.size[1],e.size[2]),this._buildMaterial(e,t));return n.position.set(((s=e.pos)==null?void 0:s[0])||0,((r=e.pos)==null?void 0:r[1])||0,((a=e.pos)==null?void 0:a[2])||0),n.castShadow=!0,n}_buildEntityFor(e,t){const n=this.entityMod&&this.entityMod[e]||po[e]||po.zombie,s=new Di,r=n&&n.parts||po.zombie.parts,a=t&&n&&n.tintByPlayer;for(const o of r){const c=a&&!o.noTint?t:null;s.add(this._makeBoxPart(o,c))}return s}_playerMesh(e){return this._buildEntityFor("player",e)}_zombieMesh(e){const t=e==="walker"||e==="seeker"||e==="flyer"?"zombie_"+e:"zombie";return this._buildEntityFor(t,null)}_bulletMesh(){return this._buildEntityFor("bullet",null)}hostInit(e="主机"){this.state=this._emptyState(),this.config=lo(),this.myId="host",this.state.players.host=this._mkPlayer("host",e,fo[0]),this._clearMeshes()}setConfig(e){return this.config=lo(e),this.state&&(this.state.config=this.config),this.config}_mkPlayer(e,t,n){return{id:e,name:t,color:n,x:(Math.random()*2-1)*10,z:(Math.random()*2-1)*10,y:0,vy:0,grounded:!0,jumpBuf:0,coyoteT:0,hp:100,maxHp:100,aim:0,alive:!0,state:1,out:!1,ready:0,lives:1,respawnCd:0,input:{mx:0,mz:0,ax:0,az:0,pitch:0,fire:!1,jump:!1},fireCd:0,kills:0,talent:{atk:0,def:0,spd:0,size:0,lives:0},stats:null,radius:Fn}}setTalent(e,t){const n=this.state.players[e];if(!n)return;const s={atk:0,def:0,spd:0,size:0,lives:0};for(const a in s)s[a]=Math.max(0,Math.min(t&&t[a]|0,this.config.TALENT.maxLevel));if(co(s)>this.config.TALENT.pointsPerPlayer)return;n.talent=s;const r=Ni(this.config,n.talent);n.stats=r,n.radius=Fn*r.scale}hostAddPlayer(e,t){const n=fo[Object.keys(this.state.players).length%fo.length],s=this._mkPlayer(e,t,n);this.state.status==="playing"&&(s.alive=!1,s.respawnCd=uo,s.lives=this.state.livesMax),this.state.players[e]=s}hostSetOffline(e){const t=this.state.players[e];!t||t.state===0||(t.state=0,t.alive=!1,t.respawnCd=0,t.ready=0,t.vy=0,t.grounded=!0,t.jumpBuf=0,t.coyoteT=0,t.fireCd=0,t.input={mx:0,mz:0,ax:0,az:0,pitch:0,fire:!1,jump:!1},t.cmdQueue=[],t.lastAckSeq=0,t.useCmdStream=!1)}hostSetOnline(e){const t=this.state.players[e];if(!t)return;t.state=1,t.cmdQueue=[],t.lastAckSeq=0,t.useCmdStream=!1,t.input={mx:0,mz:0,ax:0,az:0,pitch:0,fire:!1,jump:!1},t.respawnCd=0;const n=Ni(this.config,t.talent);if(t.stats=n,t.radius=Fn*n.scale,t.out){t.alive=!1;return}t.maxHp=this.config.COMBAT.baseHP,t.hp=t.maxHp,t.alive=!0,t.y=0,t.vy=0,t.grounded=!0,t.jumpBuf=0,t.coyoteT=0,t.fireCd=0,t.x=(Math.random()*2-1)*10,t.z=(Math.random()*2-1)*10,t.aim=0}hostPurgePlayer(e){delete this.state.players[e]}hostClaimSeat(e){if(!e||!this._pids)return null;const t=this._pids.get(e);return(t?this.state.players[t]:null)?t:null}hostBindPid(e,t){this._pids||(this._pids=new Map),e&&this._pids.set(e,t)}hostRoster(){return Object.values(this.state.players).filter(e=>e.state===1)}hostSetReady(e,t){const n=this.state.players[e];n&&(n.ready=t===!1?0:1)}hostVersusCanStart(){const e=this.hostRoster();return e.length<2?!1:e.every(t=>t.ready===1)}startGame(e,t,n){const s=n||{},r=this.state;s.config&&this.setConfig(s.config),r.mode=e==="versus"?"versus":"wave";let a;t==null?a=e==="versus"?this.config.ROOM.baseLives:1:a=t|0,r.livesMax=Math.max(0,a),r.winner=null,r.bounce=!!s.bounce,r.zmix=s.zmix==="mix"?"mix":"progress";let o=tc;s.target!==void 0&&s.target!==null&&(o=s.target|0),r.target=o,r.matchTime=0,r.events=[],r.nextEventId=1,r.obstacles=xm(24),r.grid=Sm(r.obstacles),this._rebuildObstacles(r.obstacles);for(const c in r.players){const l=r.players[c],d=Ni(this.config,l.talent);if(l.stats=d,l.radius=Fn*d.scale,l.maxHp=this.config.COMBAT.baseHP,l.hp=l.maxHp,l.lives=r.livesMax===0?0:r.livesMax+d.extraLives,l.out=!1,l.ready=0,l.respawnCd=0,l.input={mx:0,mz:0,ax:0,az:0,pitch:0,fire:!1,jump:!1},l.cmdQueue=[],l.lastAckSeq=0,l.fireCd=0,l.kills=0,l.state===0){l.alive=!1;continue}l.alive=!0,l.y=0,l.vy=0,l.grounded=!0,l.jumpBuf=0,l.coyoteT=0,l.x=(Math.random()*2-1)*10,l.z=(Math.random()*2-1)*10,l.aim=0}r.zombies=[],r.bullets=[],r.score=0,r.spawnCd=.6,r.status="playing"}backToWaiting(){const e=this.state,t={mode:e.mode,livesMax:e.livesMax,bounce:e.bounce,zmix:e.zmix,target:e.target,config:this.config},n=[];for(const r in e.players){const a=e.players[r];n.push({id:r,name:a.name,color:a.color,state:a.state,talent:a.talent})}this.state=this._emptyState();const s=this.state;s.mode=t.mode,s.livesMax=t.livesMax,s.bounce=t.bounce,s.zmix=t.zmix,s.target=t.target,this.config=t.config;for(const r of n){const a=this._mkPlayer(r.id,r.name,r.color);a.state=r.state,a.talent=r.talent,r.state===0&&(a.alive=!1),s.players[r.id]=a}this._rebuildObstacles(s.obstacles)}_killPlayer(e){e.alive=!1,e.ready=0,this.state.livesMax===0?(e.lives=0,e.respawnCd=uo):(e.lives-=1,e.lives>0?e.respawnCd=uo:(e.lives=0,e.out=!0,e.respawnCd=0))}hostSetInput(e,t){const n=this.state.players[e];n&&(n.input=t)}hostQueueCmds(e,t){const n=this.state.players[e];if(!(!n||!Array.isArray(t))){n.cmdQueue||(n.cmdQueue=[],n.lastAckSeq=0);for(const s of t){const r=s&&s.seq|0;if(r<=n.lastAckSeq)continue;const a=n.cmdQueue.length?n.cmdQueue[n.cmdQueue.length-1].seq:n.lastAckSeq;r<=a||(n.cmdQueue.length>=120&&n.cmdQueue.shift(),n.cmdQueue.push({seq:r,mx:+s.mx||0,mz:+s.mz||0,ax:+s.ax||0,az:+s.az||0,pitch:+s.pitch||0,fire:!!s.fire,jump:!!s.jump}))}n.useCmdStream=!0}}hostStep(e){const t=this.state,n=t.obstacles,s=1/this.config.COMBAT.fireRate,r=this.config.COMBAT.jumpForce;for(const a in t.players){const o=t.players[a];if(o.state!==0){if(!o.alive){o.cmdQueue&&o.cmdQueue.length&&(o.lastAckSeq=o.cmdQueue[o.cmdQueue.length-1].seq,o.cmdQueue.length=0);continue}if(o.useCmdStream){let c=0;for(;o.cmdQueue&&o.cmdQueue.length&&c<3;){const l=o.cmdQueue.shift();o.input=l,l.jump&&(o.jumpBuf=ho),this._hostStepPlayerOnce(o,l,1/60,n,s,r),o.lastAckSeq=l.seq,c++}continue}o.input&&o.input.jump&&(o.jumpBuf=ho),this._hostStepPlayerOnce(o,o.input,e,n,s,r)}}this._hostStepWorld(e)}_hostStepPlayerOnce(e,t,n,s,r,a){{let o=t.mx,c=t.mz;const l=Math.hypot(o,c);l>1&&(o/=l,c/=l);const d=Math.abs(t.ax)+Math.abs(t.az)>.001?t.ax:Math.sin(e.aim),h=Math.abs(t.ax)+Math.abs(t.az)>.001?t.az:Math.cos(e.aim),f=d,m=h,g=-c,_=o,p=g*f-_*m,u=g*m+_*f,M=e.stats?e.stats.moveSpeed:this.config.COMBAT.baseMoveSpeed,x=js(e.x+p*M*n,-Re+1,Re-1),T=js(e.z+u*M*n,-Re+1,Re-1),C=Vs(s,e.x,e.z,x,T,e.radius||Fn,e.y);e.x=C.x,e.z=C.z;const w=oo(s,e.x,e.z,Ql);e.grounded?e.coyoteT=ic:e.coyoteT>0&&(e.coyoteT-=n),e.jumpBuf>0&&(e.grounded||e.coyoteT>0)?(e.vy=a,e.grounded=!1,e.jumpBuf=0,e.coyoteT=0):e.jumpBuf>0&&(e.jumpBuf-=n),e.grounded&&e.y>w+.01&&(e.grounded=!1),e.grounded?e.y=w:(e.vy-=nc*n,e.y+=e.vy*n,e.y<=w&&e.vy<=0&&(e.y=w,e.vy=0,e.grounded=!0)),Jl(s,e),Math.hypot(t.ax,t.az)>.15&&(e.aim=Math.atan2(t.ax,t.az)),e.fireCd-=n,t.fire&&e.fireCd<=0&&(e.fireCd=r,this._spawnBullet(e))}}_hostStepWorld(e){const t=this.state,n=t.obstacles;for(let s=t.bullets.length-1;s>=0;s--){const r=t.bullets[s],a=r.x,o=r.z;r.x+=r.vx*e,r.z+=r.vz*e,r.y+=(r.vy||0)*e,r.life-=e;const c=Math.atan2(r.vx,r.vz);let l=!1;if(t.mode==="versus"&&t.status==="playing")for(const d in t.players){const h=t.players[d];if(!h.alive||h.id===r.owner)continue;const f=h.radius||Fn;if(ao(r.x,r.z,Xs,Xs,c,h.x,h.z,f,f,h.aim)&&r.y>h.y-.2&&r.y<h.y+Om*(h.stats?h.stats.scale:1)+.5){const m=Math.max((r.dmg||this.config.COMBAT.baseDamage)-(h.stats?h.stats.defense:0),1);h.hp-=m,l=!0,h.hp<=0&&(h.hp=0,r.owner&&t.players[r.owner]&&(t.players[r.owner].kills+=1,t.events.push({id:t.nextEventId++,killer:r.owner,victim:h.id,t:t.matchTime}),t.events.length>12&&t.events.shift()),this._killPlayer(h));break}}else for(const d of t.zombies){const h=d.y||0;if(ao(r.x,r.z,Xs,Xs,c,d.x,d.z,ec,ec,0)&&r.y>h-.3&&r.y<h+2){d.hp-=1,l=!0,d.hp<=0&&(d.dead=!0,t.score+=1,r.owner&&t.players[r.owner]&&(t.players[r.owner].kills+=1));break}}!l&&bm(n,r,a,o,t.bounce)&&(l=!0),!l&&r.y<=0&&(t.bounce?(r.y=-r.y,r.vy=-(r.vy||0)):l=!0),(l||r.life<=0)&&t.bullets.splice(s,1)}if(t.zombies=t.zombies.filter(s=>!s.dead),t.status==="playing"){if(t.mode==="versus"&&(t.matchTime+=e),t.mode==="wave"){const s={obs:n,grid:t.grid,players:t.players};for(const r of t.zombies){const a=Cm(r,e,s);a&&(a.hp-=Um,a.hp<=0&&(a.hp=0,this._killPlayer(a)))}t.spawnCd-=e,t.spawnCd<=0&&t.zombies.length<Im&&(t.spawnCd=Nm,this._spawnZombie())}for(const s in t.players){const r=t.players[s];if(!(r.state===0||r.out)&&!r.alive&&r.respawnCd>0&&(r.respawnCd-=e,r.respawnCd<=0)){const a=Ni(this.config,r.talent);r.stats=a,r.radius=Fn*a.scale,r.hp=r.maxHp,r.alive=!0,r.y=0,r.vy=0,r.grounded=!0,r.jumpBuf=0,r.coyoteT=0,r.x=(Math.random()*2-1)*10,r.z=(Math.random()*2-1)*10,r.aim=0,r.fireCd=0}}if(t.mode==="versus")this._versusWin();else{const s=Object.values(t.players).filter(r=>r.state===1);t.target>0&&t.score>=t.target?t.status="win":s.length>0&&s.every(r=>r.out)&&(t.status="lose")}}}_versusWin(){const e=this.state,t=Object.values(e.players);if(t.length!==0){if(this.config.ROOM.timeLimit>0&&e.matchTime>=this.config.ROOM.timeLimit*60){e.status="win";return}e.livesMax>0&&t.filter(s=>!s.out).length<=1&&(e.status="win")}}_spawnBullet(e){const t=e.aim,n=Math.PI/2-.05,s=Math.max(-n,Math.min(n,e.input&&e.input.pitch||0)),r=Math.cos(s),a=Math.sin(s),o=this.config.COMBAT.bulletSpeed,c=e.stats||Ni(this.config,e.talent);this.state.bullets.push({id:this.state.nextBid++,x:e.x+Math.sin(t)*r*1.1,z:e.z+Math.cos(t)*r*1.1,y:e.y+Pm+a*1.1,vx:Math.sin(t)*r*o,vz:Math.cos(t)*r*o,vy:a*o,life:Lm,owner:e.id,dmg:c.damage})}_spawnZombie(){const e=Re-1,t=Math.floor(Math.random()*4);let n,s;t===0?(n=-e+Math.random()*2*e,s=-e):t===1?(n=-e+Math.random()*2*e,s=e):t===2?(n=-e,s=-e+Math.random()*2*e):(n=e,s=-e+Math.random()*2*e);const r=Tm(this.state.score,this.state.zmix),a=wm[r];this.state.zombies.push({id:this.state.nextZid++,k:r,x:n,z:s,y:0,hp:a.hp,speed:Dm*a.spd*(.85+Math.random()*.4),atkCd:0})}hostSnapshot(){const e=this.state;return e.canStart=e.mode==="versus"?this.hostVersusCanStart():!0,{type:"state",st:Date.now(),mode:e.mode,livesMax:e.livesMax,winner:e.winner||null,bounce:e.bounce,config:this.config,matchTime:e.matchTime||0,events:(e.events||[]).slice(),map:e.obstacles,players:Object.values(e.players).map(t=>t.state===0?{id:t.id,name:t.name,color:t.color,on:0,lives:t.lives,kills:t.kills||0,out:!!t.out,alive:!1,ready:t.ready|0}:{on:1,out:!!t.out,ready:t.ready|0,id:t.id,name:t.name,x:t.x,z:t.z,y:t.y,hp:t.hp,maxHp:t.maxHp,ack:t.lastAckSeq||0,vy:t.vy||0,gr:t.grounded?1:0,jb:t.jumpBuf||0,ct:t.coyoteT||0,fcd:t.fireCd||0,aim:t.aim,alive:t.alive,color:t.color,kills:t.kills||0,lives:t.lives,respawnCd:t.respawnCd||0,scale:t.stats?t.stats.scale:1,talent:t.talent}),zombies:e.zombies.map(t=>({id:t.id,k:t.k||"walker",x:t.x,z:t.z,y:t.y||0,hp:t.hp})),bullets:e.bullets.map(t=>({id:t.id,x:t.x,z:t.z,y:t.y||0})),canStart:e.canStart,score:e.score,target:e.target,status:e.status}}applyStatic(e){if(!e||typeof e!="object")return;const t=this.state;if(e.config&&(this.config=e.config,t.config=e.config),e.map&&Array.isArray(e.map)){const n=JSON.stringify(e.map);n!==this._mapSig&&(this._mapSig=n,t.obstacles=e.map,this._rebuildObstacles(e.map))}}applySnapshot(e){if(!e||!Array.isArray(e.players)||!Array.isArray(e.zombies)||!Array.isArray(e.bullets)){console.warn("[applySnapshot] 丢弃残缺快照（缺少 players/zombies/bullets 数组）");return}const t=this.state;this.clientInterp=!0;const n=performance.now();let s=n;if(e.st!=null){this._stOff==null?this._stOff=n-e.st:this._stOff+=(n-e.st-this._stOff)*.05,s=this._stOff+e.st;const a=this.snaps[this.snaps.length-1];a&&s<=a.t&&(s=a.t+.1)}for(this.snaps.push({t:s,snap:e});this.snaps.length>2&&this.snaps[0].t<n-1e3;)this.snaps.shift();if(t.mode=e.mode||"wave",t.livesMax=e.livesMax===void 0||e.livesMax===null?1:e.livesMax|0,t.winner=e.winner||null,t.bounce=!!e.bounce,t.zmix=e.zmix||"progress",t.matchTime=e.matchTime||0,t.events=e.events||[],t.canStart=e.canStart===void 0?!0:!!e.canStart,e.owner&&(t.owner=e.owner),e.config&&(this.config=e.config,t.config=e.config),e.map){const a=JSON.stringify(e.map);a!==this._mapSig&&(this._mapSig=a,t.obstacles=e.map,this._rebuildObstacles(e.map))}t.players={};for(const a of e.players)t.players[a.id]={...a,input:{mx:0,mz:0,ax:0,az:0,fire:!1},fireCd:0,on:a.on===void 0?1:a.on,out:!!a.out,x:a.x||0,y:a.y||0,z:a.z||0,aim:a.aim||0,kills:a.kills||0,lives:a.lives??1,respawnCd:a.respawnCd||0};t.zombies=e.zombies.map(a=>({...a,speed:0,atkCd:0})),t.bullets=e.bullets.map(a=>({...a,vx:0,vz:0,vy:0,life:1,owner:null})),t.score=e.score,t.target=e.target,t.status=e.status;const r=e.players.find(a=>a.id===this.myId);if(r){if(!r.alive||(r.respawnCd||0)>0)this.pred=null,this.predHist.length=0,this._predStates.length=0,this._unacked.length=0;else if(this.pred&&r.ack!=null&&r.ack>0){const a=r.ack|0;for(;this._unacked.length&&this._unacked[0].seq<=a;)this._unacked.shift();const o={x:r.x,z:r.z,y:r.y||0,vy:r.vy||0,grounded:!!r.gr,jumpBuf:r.jb||0,coyoteT:r.ct||0,fireCd:r.fcd||0};for(const c of this._unacked)this._stepPredCmd(o,c,1/60,r);this.pred=o}}}interpolate(e){if(!this.clientInterp||this.snaps.length===0)return;const n=e-50,s=this.snaps;let r=s[0],a=s[s.length-1];for(let p=0;p<s.length;p++)if(s[p].t>n){a=s[p],r=p>0?s[p-1]:s[p];break}const o=a.t-r.t||1,c=Math.max(0,Math.min(1,(n-r.t)/o)),l=r.snap,d=a.snap,h=(p,u)=>p+(u-p)*c,f=(p,u)=>{let M=u-p;for(;M>Math.PI;)M-=2*Math.PI;for(;M<-Math.PI;)M+=2*Math.PI;return p+M*c},m=new Map(l.players.map(p=>[p.id,p]));for(const p in this.state.players){const u=d.players.find(T=>T.id===p),M=m.get(p),x=this.state.players[p];x.on!==0&&(u&&M&&u.on!==0&&M.on!==0?(x.x=h(M.x,u.x),x.y=h(M.y||0,u.y||0),x.z=h(M.z,u.z),x.aim=f(M.aim,u.aim)):u&&u.on!==0&&(x.x=u.x,x.y=u.y||0,x.z=u.z,x.aim=u.aim))}const g=new Map(l.zombies.map(p=>[p.id,p]));for(const p of this.state.zombies){const u=d.zombies.find(x=>x.id===p.id),M=g.get(p.id);u&&M?(p.x=h(M.x,u.x),p.z=h(M.z,u.z)):u&&(p.x=u.x,p.z=u.z)}const _=new Map(l.bullets.map(p=>[p.id,p]));for(const p of this.state.bullets){const u=d.bullets.find(x=>x.id===p.id),M=_.get(p.id);u&&M?(p.x=h(M.x,u.x),p.y=h(M.y||0,u.y||0),p.z=h(M.z,u.z)):u&&(p.x=u.x,p.y=u.y||0,p.z=u.z)}}_ensure(e,t,n){let s=e.get(t);return s||(s=n(),s.userData.first=!0,e.set(t,s),this.scene.add(s)),s}syncMeshes(){const e=this.state,t=new Set;for(const r in e.players){const a=e.players[r];t.add(r);const o=this._ensure(this.playerMeshes,r,()=>this._playerMesh(a.color));if(o.visible=a.on!==0&&a.alive,a.on===0)continue;const c=a.scale!=null?a.scale:a.stats?a.stats.scale:1;o.scale.x!==c&&o.scale.setScalar(c),o.userData.first?(o.position.set(a.x,a.y,a.z),o.userData.first=!1):this.clientInterp?o.position.set(a.x,a.y,a.z):(o.position.x+=(a.x-o.position.x)*.35,o.position.z+=(a.z-o.position.z)*.35,o.position.y=a.y),o.rotation.y=a.aim}for(const[r,a]of this.playerMeshes)t.has(r)||(this.scene.remove(a),this.playerMeshes.delete(r));const n=new Set;for(const r of e.zombies){n.add(r.id);const a=r.y||0,o=this._ensure(this.zombieMeshes,r.id,()=>this._zombieMesh(r.k));o.userData.first?(o.position.set(r.x,a,r.z),o.userData.first=!1):this.clientInterp?o.position.set(r.x,a,r.z):(o.position.x+=(r.x-o.position.x)*.4,o.position.z+=(r.z-o.position.z)*.4),o.position.y=a}for(const[r,a]of this.zombieMeshes)n.has(r)||(this.scene.remove(a),this.zombieMeshes.delete(r));const s=new Set;for(const r of e.bullets)s.add(r.id),this._ensure(this.bulletMeshes,r.id,()=>this._bulletMesh()).position.set(r.x,r.y||1,r.z);for(const[r,a]of this.bulletMeshes)s.has(r)||(this.scene.remove(a),this.bulletMeshes.delete(r))}feedLocalInput(e){e&&e.jump&&(this._jumpLatch=!0),this.predInput=e}predictTick(e){const t=.016666666666666666;this._predAcc+=e,this._predAcc>.25&&(this._predAcc=.25);let n=0;for(;this._predAcc>=t&&n<5;)this._simT+=t,this._predStepOnce(t),this.pred&&this._predStates.push({t:this._simT,x:this.pred.x,z:this.pred.z,y:this.pred.y}),this._predAcc-=t,n++;for(;this._predStates.length&&this._predStates[0].t<this._simT-.5;)this._predStates.shift();this._pendingCmds.length&&this.onCmds&&this.onCmds(this._pendingCmds.splice(0))}_predRender(){if(!this.pred)return null;const e=this._predStates;if(e.length===0)return{x:this.pred.x,z:this.pred.z,y:this.pred.y};const t=this._simT-1/60+this._predAcc;if(t<=e[0].t)return{x:e[0].x,z:e[0].z,y:e[0].y};let n=e[0],s=e[e.length-1];for(let o=e.length-1;o>=0;o--)if(e[o].t<=t){n=e[o],s=e[o+1]||e[o];break}const r=s.t-n.t||1,a=Math.max(0,Math.min(1,(t-n.t)/r));return{x:n.x+(s.x-n.x)*a,z:n.z+(s.z-n.z)*a,y:n.y+(s.y-n.y)*a}}_predStepOnce(e){if(!this.clientInterp||!this.myId)return;const t=this.state.players[this.myId];if(!t||!t.alive){this.pred=null,this.predHist.length=0,this._predStates.length=0,this._unacked.length=0,this._pendingCmds.length=0,this._jumpLatch=!1;return}this.pred||(this.pred={x:t.x,z:t.z,y:t.y||0,vy:0,grounded:!0,jumpBuf:0,coyoteT:0,fireCd:0});const n=this.predInput||{mx:0,mz:0},s=this.myYaw!=null?this.myYaw:t.aim,r={seq:++this._cmdSeq,mx:n.mx||0,mz:n.mz||0,ax:Math.sin(s),az:Math.cos(s),pitch:this.myPitch!=null?this.myPitch:n.pitch||0,fire:!!n.fire,jump:this._jumpLatch};this._jumpLatch=!1,this._stepPredCmd(this.pred,r,e,t),this._unacked.push(r),this._unacked.length>180&&this._unacked.shift(),this._pendingCmds.push(r)}_stepPredCmd(e,t,n,s){t.jump&&(e.jumpBuf=ho);let r=t.mx||0,a=t.mz||0;const o=Math.hypot(r,a);o>1&&(r/=o,a/=o);const c=t.ax,l=t.az,d=-a,h=r,f=d*c-h*l,m=d*l+h*c,g=this.state.obstacles||[],_=Ni(this.config,s.talent),p=_.moveSpeed,u=Fn*(s.scale||_.scale||1),M=js(e.x+f*p*n,-Re+1,Re-1),x=js(e.z+m*p*n,-Re+1,Re-1),T=Vs(g,e.x,e.z,M,x,u,e.y);e.x=T.x,e.z=T.z;const C=oo(g,e.x,e.z,Ql);e.grounded?e.coyoteT=ic:e.coyoteT>0&&(e.coyoteT-=n),e.jumpBuf>0&&(e.grounded||e.coyoteT>0)?(e.vy=this.config.COMBAT.jumpForce,e.grounded=!1,e.jumpBuf=0,e.coyoteT=0):e.jumpBuf>0&&(e.jumpBuf-=n),e.grounded&&e.y>C+.01&&(e.grounded=!1),e.grounded?e.y=C:(e.vy-=nc*n,e.y+=e.vy*n,e.y<=C&&e.vy<=0&&(e.y=C,e.vy=0,e.grounded=!0)),Jl(g,e,u)}updateCamera(){const e=this.state.players[this.myId],t=this._predRender(),n=t?t.x:e?e.x:0,s=t?t.z:e?e.z:0,r=this.myYaw!=null?this.myYaw:e?e.aim:0,o=1.6+(t?t.y:e?e.y:0);this.clientInterp?this.camera.position.set(n,o,s):this.camera.position.lerp(new U(n,o,s),.25);const c=this.myPitch||0,l=Math.sin(r)*Math.cos(c),d=Math.sin(c),h=Math.cos(r)*Math.cos(c);this.camera.lookAt(this.camera.position.x+l*12,o+d*12,this.camera.position.z+h*12);const f=this.playerMeshes.get(this.myId);f&&(f.visible=!1)}render(){const e=performance.now();let t=(e-(this._lastRT||e))/1e3;if(this._lastRT=e,t>.25&&(t=.25),this.clientInterp&&(this.predictTick(t),this.interpolate(e)),this.syncMeshes(),this.updateCamera(),this.renderer.render(this.scene,this.camera),this._gameMode&&this._gl&&this._gl.submit)try{this._gl.submit()}catch{}}_clearMeshes(){for(const e of this.playerMeshes.values())this.scene.remove(e);for(const e of this.zombieMeshes.values())this.scene.remove(e);for(const e of this.bulletMeshes.values())this.scene.remove(e);this.playerMeshes.clear(),this.zombieMeshes.clear(),this.bulletMeshes.clear()}}const mo=typeof window<"u"?window.ZombieLan:null,Ke=!!mo,zm=Ke,go=5e3,sc=5001,qs=8123;typeof window<"u"&&(window.ZB=window.ZB||{});function Ot(i,e){if(!mo)return null;const t=mo[i](e?JSON.stringify(e):"");if(typeof t=="string"&&t.length)try{return JSON.parse(t)}catch{return t}return t}function rc(){if(typeof window>"u")return null;const i=new URLSearchParams(window.location.search);return i.get("host")?`ws://${i.get("host")}:${qs}`:window.__RELAY_WS__?window.__RELAY_WS__:null}function _o(i){return new Promise((e,t)=>{let n;try{n=new WebSocket(i)}catch(r){t(r);return}const s=setTimeout(()=>{try{n.close()}catch{}t(new Error("relay 连接超时"))},4e3);n.onopen=()=>{clearTimeout(s),e(n)},n.onerror=()=>{clearTimeout(s),t(new Error("relay 连接失败（确认服务器已运行 relay）"))}})}class Bm{constructor(){this.ip="dev",this.port=go,this.ws=null,this._name="玩家"+Math.floor(Math.random()*900+100),this.connected=!1,this._onState=null,this._onRoomList=null,this._onRoomFound=null,this._onHostDropped=null,this._onClientConnected=null,this._onClientDisconnected=null,this._onClientMessage=null}async start(e,t=go,n=sc){if(Ke){const r=Ot("startHost",{roomName:e,port:t,broadcastPort:n});return this.ip=r.ip,this.port=r.port,r}const s=rc()||`ws://localhost:${qs}`;return this.ws=await _o(s),this._bindWs(),this.ip=typeof location<"u"?location.hostname:"localhost",this.port=qs,console.log("[net-relay] 主机(玩家)接入中继",s),{ip:this.ip,port:this.port}}_bindWs(){this.ws&&(this.ws.onmessage=e=>{let t;try{t=JSON.parse(e.data)}catch{return}t.type==="welcome"?(this._onState&&this._onState(t),this._welcomeResolver&&(this._welcomeResolver(t),this._welcomeResolver=null)):t.type==="state"&&this._onState&&this._onState(t)})}onState(e){this._onState=e,Ke&&(window.ZB.onState=t=>{try{e(JSON.parse(t))}catch{}})}onRtt(e){this._onRtt=e}onRoomList(e){this._onRoomList=e}listRooms(){}setName(e){this._name=e}onRoomFound(e){this._onRoomFound=e,Ke&&(window.ZB.onRoomFound=t=>{try{e(JSON.parse(t))}catch{}})}onHostDropped(e){this._onHostDropped=e}scan(){Ke&&Ot("startScan",{broadcastPort:sc})}stopScan(){Ke&&Ot("stopScan")}connectClient(e,t=go){return new Promise((n,s)=>{if(!Ke){s(new Error("仅原生支持"));return}this.connected=!1,window.ZB._connectResolve=()=>{this.connected=!0,n()},window.ZB._connectReject=r=>{this.connected?this._onHostDropped&&this._onHostDropped():s(new Error(r||"connect-failed"))},Ot("connect",{ip:e,port:t,name:this._name})})}onClientConnected(e){this._onClientConnected=e,Ke&&(window.ZB.onClientConnected=e)}onClientDisconnected(e){this._onClientDisconnected=e,Ke&&(window.ZB.onClientDisconnected=e)}onClientMessage(e){this._onClientMessage=e,Ke&&(window.ZB.onClientMessage=(t,n)=>{try{e(t,JSON.parse(n))}catch{e(t,n)}})}broadcast(e){if(Ke){Ot("broadcast",{data:JSON.stringify(e)});return}this.ws&&this.ws.readyState===1&&this.ws.send(JSON.stringify(e))}sendTo(e,t){if(Ke){Ot("sendTo",{clientId:e,data:JSON.stringify(t)});return}this.ws&&this.ws.readyState===1&&this.ws.send(JSON.stringify(t))}send(e){if(Ke){Ot("send",{data:JSON.stringify(e)});return}this.ws&&this.ws.readyState===1&&this.ws.send(JSON.stringify(e))}stop(){if(Ke){Ot("stopHost");return}if(this.ws){try{this.ws.close()}catch{}this.ws=null}}close(){if(Ke){Ot("disconnect"),Ot("stopHost");return}if(this.ws){try{this.ws.close()}catch{}this.ws=null}}pushWsState(e){Ke&&e&&Ot("pushWsState",{data:e})}}class km{constructor(){this.connected=!1,this.ws=null,this.clientId="bc-"+Math.random().toString(36).slice(2,9),this._name="玩家"+Math.floor(Math.random()*900+100),this._onState=null,this._onRoomList=null,this._welcomeResolver=null,this._welcomeRejecter=null,this._leftIntent=!1,this._reconnectTimer=null,this._joinInfo=null,this._pingTimer=null,this._onRtt=null,this._relayUrl=null}setName(e){this._name=e}async connect(e,t=qs){if(Ke)return new Promise((s,r)=>{this._resolve=s,this._reject=r,typeof window<"u"&&(window.ZB._connectResolve=()=>{this.connected=!0,s()},window.ZB._connectReject=a=>{this.connected=!1,r(new Error(a||"connect-failed"))}),Ot("connect",{ip:e,port:t,name:this._name})});const n=e&&e!=="localhost"&&e!=="127.0.0.1"?`ws://${e}:${t}`:rc()||`ws://localhost:${t}`;this._relayUrl=n,this.ws=await _o(n),this._pingTimer=setInterval(()=>{this.ws&&this.ws.readyState===1&&this.send({type:"ping",t:typeof performance<"u"?performance.now():Date.now()})},1e3),this._bindWs(),this.connected=!0}_bindWs(){this.ws&&(this.ws.onmessage=e=>this._handleMessage(e),this.ws.onclose=()=>this._handleClose())}_handleMessage(e){let t;try{t=JSON.parse(e.data)}catch{return}if(t.type==="welcome")this._onState&&this._onState(t),this._joinInfo&&(this._joinInfo.roomId=t.roomId||this._joinInfo.roomId||null),this._welcomeResolver&&(this._welcomeResolver(t),this._welcomeResolver=null,this._welcomeRejecter=null);else if(t.type==="state")this._onState&&this._onState(t);else if(t.type==="static")this._onState&&this._onState(t);else if(t.type==="roomList")this._onRoomList&&this._onRoomList(t.rooms||[]);else if(t.type==="error")this._welcomeRejecter&&(this._welcomeRejecter(new Error(t.msg||"操作被拒绝")),this._welcomeRejecter=null,this._welcomeResolver=null);else if(t.type==="nudgeHost")this._onState&&this._onState(t);else if(t.type==="hostChanged")this._onState&&this._onState(t);else if(t.type==="pong"){const n=t.t;if(n!=null){const s=typeof performance<"u"?performance.now():Date.now();this._onRtt&&this._onRtt(s-n)}}}_handleClose(){this.connected=!1,this._pingTimer&&(clearInterval(this._pingTimer),this._pingTimer=null),!this._leftIntent&&this._scheduleReconnect()}_scheduleReconnect(){this._reconnectTimer||this._leftIntent||!this._joinInfo||(this._reconnectTimer=setTimeout(async()=>{if(this._reconnectTimer=null,!(this._leftIntent||!this._joinInfo))try{this.ws=await _o(this._relayUrl),this._bindWs(),this.connected=!0;const e=this._joinInfo;e.roomId?this.send({type:"joinRoom",roomId:e.roomId,name:e.name,pid:e.pid||null}):e.type==="create"&&this.send({type:"createRoom",name:e.name,playerName:e.name,mode:e.opts&&e.opts.mode,lives:e.opts&&e.opts.lives,target:e.opts&&e.opts.target,bounce:e.opts&&e.opts.bounce,zmix:e.opts&&e.opts.zmix,config:e.opts&&e.opts.config||null,pid:e.pid})}catch{this._scheduleReconnect()}},1500))}onState(e){this._onState=e,Ke&&(window.ZB.onState=t=>{try{e(JSON.parse(t))}catch{}})}onRtt(e){this._onRtt=e}onRoomList(e){this._onRoomList=e}listRooms(){this.send({type:"listRooms"})}createRoom(e){return new Promise((t,n)=>{this._welcomeResolver=t,this._welcomeRejecter=n,this._joinInfo={type:"create",name:e.name,pid:e.pid||null,roomId:null,opts:e},this.send({type:"createRoom",name:e.name,playerName:e.playerName||e.name,mode:e.mode,lives:e.lives,target:e.target,bounce:e.bounce,zmix:e.zmix,config:e.config||null,pid:e.pid})})}sendTalent(e){this.send({type:"talent",talent:e})}joinRoom(e,t,n){return new Promise((s,r)=>{this._welcomeResolver=s,this._welcomeRejecter=r,this._joinInfo={type:"join",roomId:e,name:t,pid:n||null},this.send({type:"joinRoom",roomId:e,name:t,pid:n||null})})}leaveRoom(){this.send({type:"leaveRoom"}),this._joinInfo=null}sendReady(e){this.send({type:"ready",ready:!!e})}send(e){if(Ke){Ot("send",{data:JSON.stringify(e)});return}this.ws&&this.ws.readyState===1&&this.ws.send(JSON.stringify(e))}close(){if(this._leftIntent=!0,this.connected=!1,this._pingTimer&&(clearInterval(this._pingTimer),this._pingTimer=null),this._reconnectTimer&&(clearTimeout(this._reconnectTimer),this._reconnectTimer=null),Ke){Ot("disconnect");return}if(this.ws){try{this.ws.close()}catch{}this.ws=null}}}function Hm(i){const e=()=>"wb"+Math.random().toString(36).slice(2,9),t=n=>typeof n=="string"?JSON.parse(n):n||{};return{listRooms(){const n=i.getGame();if(!n||!n.state)return[];const s=n.state,r=Object.values(s.players).filter(a=>a.state!==0);return[{id:"r1",name:i.getRoomName()||"房间",mode:s.mode,lives:s.livesMax,target:s.target,status:s.status,count:r.length,players:r.map(a=>a.name),bounce:s.bounce,zmix:s.zmix}]},createRoom(n){return this.joinRoom(n)},joinRoom(n){const s=i.getGame(),r=t(n),a=(r.pid||"").toString().slice(0,64),o=(r.name||i.getRoomName()||"浏览器").toString().slice(0,16);if(s&&s.hostClaimSeat){const l=s.hostClaimSeat(a);if(l){const d=s.state.players[l];return d&&(d.name=o),d&&d.state===0&&s.hostSetOnline(l),{cid:l,roomId:"r1",resumed:!!(d&&d.state===0)}}}const c=e();return s&&s.hostAddPlayer&&s.hostAddPlayer(c,o),s&&s.hostBindPid&&s.hostBindPid(a,c),{cid:c,roomId:"r1"}},input(n,s){const r=i.getGame();if(!r)return;const a=t(s);a&&Array.isArray(a.cmds)?r.hostQueueCmds(n,a.cmds):a&&r.hostSetInput(n,a)},talent(n,s){const r=i.getGame();if(!r||!r.setTalent)return;const a=t(s);r.setTalent(n,a&&a.talent||{})},ready(n,s){const r=i.getGame();if(!r||!r.hostSetReady)return;const a=t(s);r.hostSetReady(n,a.ready!==!1)},startGame(n,s){const r=i.getGame();if(!r||!i.getIsHost())return;const a=t(s),o=a.mode||"wave";o==="versus"&&r.hostVersusCanStart&&!r.hostVersusCanStart()||r.startGame(o,a.lives,{bounce:a.bounce,zmix:a.zmix,target:a.target,config:a.config})},nudge(n,s){const r=t(s);i.onNudge&&i.onNudge(r&&r.name||"玩家")},leaveRoom(n){this.removePlayer(n)},removePlayer(n){const s=i.getGame();s&&s.hostSetOffline&&s.hostSetOffline(n)}}}let Oi=!1;function Ys(){if(typeof window>"u")return"landscape";const i=window.innerWidth||0,e=window.innerHeight||0;return i>=e?"landscape":"portrait"}function oc(){if(typeof screen>"u")return!1;try{const i=screen.orientation;if(i&&typeof i.lock=="function"){const t=i.lock("landscape");return t&&typeof t.catch=="function"&&t.catch(()=>{}),!0}const e=screen.lockOrientation||screen.mozLockOrientation||screen.msLockOrientation;if(typeof e=="function")return e.call(screen,"landscape"),!0}catch{}return!1}function Gm(){if(!(typeof screen>"u"))try{const i=screen.orientation;if(i&&typeof i.unlock=="function"){i.unlock();return}const e=screen.unlockOrientation||screen.mozUnlockOrientation||screen.msUnlockOrientation;typeof e=="function"&&e.call(screen)}catch{}}let xo=0,$s=null;const Vm=1400;typeof document<"u"&&(document.addEventListener("pointerlockchange",()=>{document.pointerLockElement||(xo=Date.now())}),document.addEventListener("pointerlockerror",()=>{},!1));function vo(i,e){if(!i||typeof document>"u"||document.pointerLockElement===i)return;const t=Vm-(Date.now()-xo);if(t>0&&!e){clearTimeout($s),$s=setTimeout(()=>vo(i,!0),t);return}try{const n=i.requestPointerLock();n&&typeof n.catch=="function"&&n.catch(()=>{})}catch{}}function Wm(){if(!(typeof document>"u")&&(xo=Date.now(),clearTimeout($s),$s=null,!!document.pointerLockElement))try{const i=document.exitPointerLock();i&&typeof i.catch=="function"&&i.catch(()=>{})}catch{}}class Xm{constructor(e,t=1){this.el=e,this.sens=t,this.knob=e.querySelector(".knob"),this.x=0,this.y=0,this.active=!1,this.pointerId=null,this._lastMoveT=0,this._bind()}_bind(){const e=this.el,t=o=>{Oi||this.pointerId===null&&(this.pointerId=o.pointerId,this.active=!0,this._lastMoveT=performance.now(),this._move(o),o.cancelable&&o.preventDefault())},n=o=>{if(!this.active)return;if(o.pointerId!==this.pointerId){const l=this.el.getBoundingClientRect(),d=l.left+l.width/2,h=l.top+l.height/2;if(!(Math.hypot(o.clientX-d,o.clientY-h)<=l.width*1.5))return;this.pointerId=o.pointerId}const c=performance.now();this._lastMoveT=c,this._move(o),o.cancelable&&o.preventDefault()},s=o=>{o.pointerId===this.pointerId&&(this.pointerId=null,this.active=!1,this.x=0,this.y=0,this._lastMoveT=0,this.knob.style.transform="translate(0,0)")},r=o=>{s(o)},a=o=>{s(o)};e.addEventListener("pointerdown",t),window.addEventListener("pointermove",n),window.addEventListener("pointerup",s),window.addEventListener("pointercancel",r),window.addEventListener("lostpointercapture",a)}_move(e){const t=this.el.getBoundingClientRect(),n=t.left+t.width/2,s=t.top+t.height/2;let r=e.clientX-n,a=e.clientY-s;const c=t.width/2/(this.sens||1);let l=Math.hypot(r,a);l>c&&(r=r/l*c,a=a/l*c,l=c);const d=c>0?l/c:0,h=.12;let f=0;d>h&&(f=(d-h)/(1-h),f=Math.pow(f,1.5));const m=l>0?r/l:0,g=l>0?a/l:0;this.x=m*f,this.y=g*f,this.knob.style.transform=`translate(${r}px, ${a}px)`}get vec(){return{x:this.x,y:this.y}}}class ac{constructor({mode:e,canvas:t,moveEl:n,lookEl:s,fireEl:r,jumpEl:a,settings:o}){this.mode=e,this.canvas=t,this.settings=o||ts(),this.lookSens=this.settings.lookSens,this.joySens=this.settings.joySens,this.mouseSens=this.settings.mouseSens,this.keysMap=this.settings.keys,this.aimYaw=0,this.aimPitch=0,this.jumpQueued=!1,this.fire=!1,this.keys={},this.moveEl=n,this.lookEl=s,this.fireEl=r,this.jumpEl=a,this._dragStops=[],this._orient=Ys(),e==="touch"?(this.move=new Xm(n,this.joySens),this._bindTouchLook(s),this._bindTouchFire(r),this._bindTouchJump(a),this._enableDrag(n,"joy"),this._enableDrag(r,"fire"),this._enableDrag(a,"jump"),this._bindOrientation(),this._applyLayout()):this._bindPC()}_bindPC(){const e=this.keysMap;window.addEventListener("keydown",r=>{this.keys[r.code]=!0,r.code===e.jump&&!r.repeat&&(this.jumpQueued=!0,r.preventDefault())}),window.addEventListener("keyup",r=>{this.keys[r.code]=!1});const t=this.canvas;t&&(t.addEventListener("mousedown",r=>{const a=document.getElementById("talent-panel");a&&!a.classList.contains("hidden")||(r.button===0&&(this.fire=!0),vo(t))}),window.addEventListener("mouseup",r=>{r.button===0&&(this.fire=!1)}));const n=Math.PI/2-.05,s=.0025*this.mouseSens;document.addEventListener("mousemove",r=>{typeof r.movementX=="number"&&(this.aimYaw-=r.movementX*s),typeof r.movementY=="number"&&(this.aimPitch-=r.movementY*s,this.aimPitch=Math.max(-n,Math.min(n,this.aimPitch)))})}_bindTouchLook(e){if(!e)return;const t=Math.PI/2-.05;let n=null,s=0,r=0;const a=m=>{n===null&&(n=m.pointerId,s=m.clientX,r=m.clientY,m.cancelable&&m.preventDefault())};let o=0,c=0;const l=.5,d=m=>{if(n===null)return;if(m.pointerId!==n){const p=m.clientX-s,u=m.clientY-r;if(Math.hypot(p,u)>150)return;n=m.pointerId}const g=m.clientX-s,_=m.clientY-r;s=m.clientX,r=m.clientY,o=o*(1-l)+g*l,c=c*(1-l)+_*l,this.aimYaw-=o*(.005*this.lookSens),this.aimPitch-=c*(.005*this.lookSens),this.aimPitch=Math.max(-t,Math.min(t,this.aimPitch)),m.cancelable&&m.preventDefault()},h=m=>{m.pointerId===n&&(n=null)},f=m=>{m.pointerId===n&&(n=null)};e.addEventListener("pointerdown",a),window.addEventListener("pointermove",d),window.addEventListener("pointerup",h),window.addEventListener("pointercancel",f)}_bindTouchFire(e){if(!e)return;let t=null;const n=o=>{o&&(o.cancelable&&o.preventDefault(),o.stopPropagation())},s=o=>{n(o),t===null&&(t=o.pointerId,!Oi&&(this.fire=!0))},r=o=>{t!==null&&o.pointerId!==t||(t=null,n(o),this.fire=!1)},a=o=>{o.pointerId===t&&r(o)};e.addEventListener("pointerdown",s),window.addEventListener("pointerup",r),window.addEventListener("pointercancel",a)}_bindTouchJump(e){if(!e)return;let t=null;const n=o=>{o&&(o.cancelable&&o.preventDefault(),o.stopPropagation())},s=o=>{n(o),t===null&&(t=o.pointerId,!Oi&&(this.jumpQueued=!0))},r=o=>{t!==null&&o.pointerId!==t||(t=null,n(o))},a=o=>{o.pointerId===t&&r(o)};e.addEventListener("pointerdown",s),window.addEventListener("pointerup",r),window.addEventListener("pointercancel",a)}_layout(){const e=this.settings;e.layouts||(e.layouts={landscape:zn("landscape"),portrait:zn("portrait")});const t=Ys();e.layouts[t]||(e.layouts[t]=zn(t));const n=e.layouts[t];for(const s of["joy","fire","jump"])n[s]||(n[s]=zn(t)[s]);return e.joy=n.joy,e.fire=n.fire,e.jump=n.jump,n}_applyLayout(){const e=this._layout(),t=(n,s)=>{if(!n||!s)return;const r=jm(n,s);s.xPct=r.xPct,s.yPct=r.yPct,n.style&&(n.style.left=r.xPct+"%",n.style.top=r.yPct+"%",n.style.bottom="auto",n.style.right="auto")};t(this.moveEl,e.joy),t(this.fireEl,e.fire),t(this.jumpEl,e.jump)}_bindOrientation(){if(typeof window>"u"||!window.addEventListener)return;let e=null;const t=()=>{clearTimeout(e),e=setTimeout(()=>{const n=Ys(),s=n!==this._orient;this._orient=n,this._applyLayout(),s&&(this._stopAllDrags(),Mn(this.settings))},150)};window.addEventListener("orientationchange",t),window.addEventListener("resize",t),this._onOrientChange=t}_stopAllDrags(){for(const e of this._dragStops||[])try{e()}catch{}}_enableDrag(e,t){if(!e||!e.addEventListener)return;let n=null,s=!1,r=0,a=null,o=null;const c=()=>{if(r=0,!a||!o)return;const m=window.innerWidth||1,g=window.innerHeight||1,_=4,p=Math.max(_,Math.min(100-_,a.x/m*100)),u=Math.max(_,Math.min(100-_,a.y/g*100));o[t]={xPct:p,yPct:u};const M=p/100*m,x=u/100*g;e.style.transform=`translate3d(${M}px, ${x}px, 0) translate(-50%, -50%)`},l=m=>{if(s){if(m.pointerId!==n){const g=e.getBoundingClientRect(),_=g.left+g.width/2,p=g.top+g.height/2;if(Math.hypot(m.clientX-_,m.clientY-p)>Math.max(g.width,g.height)*2)return;n=m.pointerId}m.cancelable&&m.preventDefault(),a={x:m.clientX,y:m.clientY},r||(r=requestAnimationFrame(c))}},d=()=>{if(s){if(s=!1,r&&(cancelAnimationFrame(r),r=0),a=null,e.removeEventListener("pointermove",l),e.removeEventListener("pointerup",h),e.removeEventListener("pointercancel",h),e.removeEventListener("lostpointercapture",h),window.removeEventListener("blur",d),n!=null)try{e.releasePointerCapture(n)}catch{}n=null,e.classList.remove("dragging"),e.style.transform="",e.style.left="",e.style.top="",this._applyLayout(),Mn(this.settings)}},h=m=>{if(m&&n!=null&&m.pointerId!==n){const g=e.getBoundingClientRect(),_=g.left+g.width/2,p=g.top+g.height/2;if(Math.hypot(m.clientX-_,m.clientY-p)>Math.max(g.width,g.height)*2)return;n=m.pointerId}d()},f=m=>{if(!Oi||s)return;m.cancelable&&m.preventDefault(),m.stopPropagation(),s=!0,n=m.pointerId,o=this._layout();try{e.setPointerCapture(m.pointerId)}catch{}const g=window.innerWidth||1,_=window.innerHeight||1,p=o[t]||{xPct:50,yPct:50};e.style.left="0px",e.style.top="0px",e.style.transform=`translate3d(${p.xPct/100*g}px, ${p.yPct/100*_}px, 0) translate(-50%, -50%)`,e.classList.add("dragging"),e.addEventListener("pointermove",l),e.addEventListener("pointerup",h),e.addEventListener("pointercancel",h),e.addEventListener("lostpointercapture",h),window.addEventListener("blur",d)};e.addEventListener("pointerdown",f,{capture:!0}),(this._dragStops||(this._dragStops=[])).push(d)}getAimPitch(){return this.aimPitch||0}getInput(){if(this.mode==="touch"){const o=this.move.vec,c=o.x,l=o.y,d=Math.sin(this.aimYaw),h=Math.cos(this.aimYaw),f=this.jumpQueued;return this.jumpQueued=!1,{mx:c,mz:l,ax:d,az:h,pitch:this.aimPitch||0,fire:this.fire,jump:f}}const e=this.keysMap;let t=0,n=0;this.keys[e.forward]&&(n-=1),this.keys[e.back]&&(n+=1),this.keys[e.left]&&(t-=1),this.keys[e.right]&&(t+=1);const s=Math.sin(this.aimYaw),r=Math.cos(this.aimYaw),a=this.jumpQueued;return this.jumpQueued=!1,{mx:t,mz:n,ax:s,az:r,pitch:this.aimPitch||0,fire:this.fire,jump:a}}}ac.prototype.setLayoutEdit=function(i){Oi=!!i,Oi?(this.fire=!1,this.jumpQueued=!1,this.move&&(this.move.active=!1,this.move.x=0,this.move.y=0,this.move.knob&&this.move.knob.style&&(this.move.knob.style.transform="translate(0,0)"))):this._stopAllDrags&&this._stopAllDrags()};function jm(i,e){const t=typeof window<"u"&&window.innerWidth||800,n=typeof window<"u"&&window.innerHeight||600,s=i&&i.offsetWidth||84,r=i&&i.offsetHeight||84,a=Math.min(s/2/t*100,4),o=Math.min(r/2/n*100,4),c=Math.max(a,Math.min(100-a,Number(e.xPct))),l=Math.max(o,Math.min(100-o,Number(e.yPct)));return{xPct:Number.isFinite(c)?c:50,yPct:Number.isFinite(l)?l:50}}const lc="zombie-ui-settings",Mo=2;function zn(i){return i==="portrait"?{joy:{xPct:21,yPct:80},fire:{xPct:80,yPct:71},jump:{xPct:80,yPct:87}}:{joy:{xPct:14,yPct:72},fire:{xPct:88,yPct:64},jump:{xPct:88,yPct:86}}}function ts(){const i=zn("landscape");return{lookSens:1,joySens:1,mouseSens:1,keys:{forward:"KeyW",back:"KeyS",left:"KeyA",right:"KeyD",jump:"Space"},layoutVer:Mo,layouts:{landscape:i,portrait:zn("portrait")},joy:i.joy,fire:i.fire,jump:i.jump,editMode:!1}}function cc(i,e){const t={};for(const n of["joy","fire","jump"]){const s=i[n],r=e&&e[n]||null;t[n]={xPct:r&&typeof r.xPct=="number"?r.xPct:s.xPct,yPct:r&&typeof r.yPct=="number"?r.yPct:s.yPct}}return t}function qm(){try{const i=localStorage.getItem(lc);if(i){const e=ts(),t=JSON.parse(i)||{},n=Object.assign({},e,t);n.keys=Object.assign({},e.keys,t.keys||{}),typeof n.mouseSens!="number"&&(n.mouseSens=e.mouseSens),(t.layoutVer|0)>=Mo&&t.layouts?n.layouts={landscape:cc(e.layouts.landscape,t.layouts.landscape),portrait:cc(e.layouts.portrait,t.layouts.portrait)}:n.layouts={landscape:zn("landscape"),portrait:zn("portrait")},n.layoutVer=Mo;const s=n.layouts[Ys()]||n.layouts.landscape;return n.joy=s.joy,n.fire=s.fire,n.jump=s.jump,n}}catch{}return ts()}function Mn(i){try{localStorage.setItem(lc,JSON.stringify(i))}catch{}}const ot={lastHp:null,lastKills:null,lastAlive:!0,lastEvent:0,lastStatus:""};function Ym(){const i=document.getElementById("hitflash");i&&(i.classList.add("on"),clearTimeout(ot._hfT),ot._hfT=setTimeout(()=>i.classList.remove("on"),220))}function yo(i,e){const t=document.getElementById("center-notify");t&&(t.textContent=i,t.className="center-notify show"+(e?" "+e:""),clearTimeout(ot._cnT),ot._cnT=setTimeout(()=>{t.className="center-notify"},1600))}const yn=yo;function $m(i){const e=document.getElementById("killfeed");if(!e)return;const t=document.createElement("div");for(t.className="kf-line",t.innerHTML=i,e.appendChild(t);e.children.length>5;)e.removeChild(e.firstChild);setTimeout(()=>{t.parentNode&&t.parentNode.removeChild(t)},4e3)}let uc="";function Zm(i,e){const t=i.mode||"wave",n=document.getElementById("hud-wave"),s=document.getElementById("hud-status"),r=document.getElementById("hud-players");if(n)if(t==="versus"){const f=i.players[e],m=f?f.lives??1:0,g=f&&f.kills||0,_=i.config||null,p=_&&_.ROOM?_.ROOM.timeLimit:0,u=(i.livesMax|0)===0;let M=`⚔ ${g} 杀 · 命 ${u?"∞":m}`;if(p>0&&i.status==="playing"){const x=Math.max(0,p*60-(i.matchTime||0)),T=Math.floor(x/60),C=Math.floor(x%60);M+=` · ⏱ ${T}:${String(C).padStart(2,"0")}`}n.textContent=M}else{const f=i.target>0?`${i.score}/${i.target}`:`${i.score}/∞`,m=i.livesMax===0?"∞":i.livesMax;n.textContent=`击杀 ${f} · 命 ${m}`}const a=i.players[e];if(a){if(ot.lastHp!=null&&a.hp<ot.lastHp&&a.alive&&Ym(),ot.lastKills!=null&&a.kills>ot.lastKills&&t==="versus"&&yo(`⚔ 击杀 +${a.kills-ot.lastKills}！`,"kill"),ot.lastAlive&&!a.alive&&i.status==="playing"){const f=(a.lives??0)>0||(i.livesMax|0)===0;yo(f?"💀 你被击杀了，即将重生…":"💀 你已出局","death")}ot.lastHp=a.hp,ot.lastKills=a.kills,ot.lastAlive=a.alive}if(t==="versus"&&i.events&&i.events.length)for(const f of i.events){if(f.id<=ot.lastEvent)continue;ot.lastEvent=f.id;const m=i.players[f.killer]?i.players[f.killer].name:"?",g=i.players[f.victim]?i.players[f.victim].name:"?";$m(`<b>${Zs(m)}</b> ⚔ ${Zs(g)}`)}if(i.status==="playing"&&ot.lastStatus!=="playing"&&(ot.lastEvent=0,ot.lastHp=null,ot.lastKills=null,ot.lastAlive=!0),ot.lastStatus=i.status,s){let f="等待中";i.status==="playing"?f="进行中":i.status==="win"?f=t==="versus"?"本局结束":"胜利":i.status==="lose"&&(f=t==="versus"?"团灭出局":"失败"),s.textContent=f}if(r){let f=Object.keys(i.players).map(g=>i.players[g]);t==="versus"&&f.sort((g,_)=>(_.kills||0)-(g.kills||0));const m=f.map(g=>`${g.id}:${g.hp|0}:${g.maxHp|0}:${g.alive?1:0}:${g.lives??0}:${g.kills||0}:${(g.color>>>0).toString(16)}`).join("|")+"#"+e+"#"+t;if(m!==uc){uc=m,r.innerHTML="";for(const g of f){const _=g.id,p=Math.max(0,g.hp)/g.maxHp*100,u="#"+(g.color>>>0).toString(16).padStart(6,"0");let M="";t==="versus"?!g.alive&&(g.lives??0)>0?M=" 💀重生":g.alive||(M=" 💀出局"):g.alive||(M=" 💀");const x=(i.livesMax|0)===0,T=t==="versus"&&(x||(i.livesMax||1)>1)?` <span class="lives-badge">${x?"x∞":"x"+(g.lives??1)}</span>`:"",C=t==="versus"?`<span class="kills-badge">⚔${g.kills||0}</span>`:"",w=document.createElement("div");w.className="ph",w.innerHTML=`<span class="dot" style="background:${u}"></span><span>${Zs(g.name)}${_===e?"(你)":""}${M}${T}</span>`+C+`<span class="bar"><i style="width:${p}%;background:${p<30?"#e53935":"#4caf50"}"></i></span><span class="hp-num">${g.alive?Math.max(0,Math.round(g.hp)):"—"}</span>`,r.appendChild(w)}}}const o=document.getElementById("wave-overlay"),c=document.getElementById("btn-start-wave");if(o){if(i.status==="playing")o.classList.add("hidden"),c&&(c.disabled=!1);else if(i.status==="waiting")if(o.classList.remove("hidden"),t==="versus"){const f=Object.values(i.players).filter(_=>_.on!==0),m=f.filter(_=>_.ready!==1).map(_=>_.name),g=document.getElementById("wave-hint");g&&(g.style.display="",f.length<2?g.textContent="⚔ 对战至少需要 2 人，邀请好友加入…":m.length?g.textContent="⏳ 等待配置天赋："+m.join("、"):g.textContent="✅ 全员已备好，房主可开始！"),c&&(c.disabled=!i.canStart)}else c&&(c.disabled=!1)}const l=document.getElementById("result"),d=document.getElementById("result-text"),h=document.getElementById("result-board");if(l&&d)if(i.status==="win"){if(l.classList.remove("hidden"),d.textContent=t==="versus"?"本局结束":"🎉 清场胜利！",h)if(t==="versus"){const f=(i.livesMax|0)===0,m=Object.values(i.players).slice().sort((g,_)=>(_.kills||0)-(g.kills||0)||(_.lives||0)-(g.lives||0));h.innerHTML=m.map((g,_)=>{const p="#"+(g.color>>>0).toString(16).padStart(6,"0"),u=f?"∞":g.lives??0;return`<div class="rb-row${g.id===e?" me":""}"><span class="rb-rank">${_+1}</span><span class="dot" style="background:${p}"></span><span class="rb-name">${Zs(g.name)}${g.id===e?"(你)":""}</span><span class="rb-stat">⚔ ${g.kills||0}</span><span class="rb-stat">❤ ${u}</span></div>`}).join(""),h.classList.remove("hidden")}else h.classList.add("hidden")}else i.status==="lose"?(l.classList.remove("hidden"),d.textContent=t==="versus"?"💀 团灭出局":"💀 全员阵亡",h&&h.classList.add("hidden")):(l.classList.add("hidden"),h&&h.classList.add("hidden"))}function Zs(i){return String(i).replace(/[&<>"']/g,e=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"})[e])}const Km=/pointer\s*lock|exited the lock|requestPointerLock|fullscreen|Permissions check failed|user gesture/i,Ks=new Map;let Js=null;function dc(){const i=document.getElementById("errbox");i&&i.remove(),Ks.clear(),clearTimeout(Js),Js=null}function hc(i){if(i=String(i??""),!i||Km.test(i))return;let e=document.getElementById("errbox");e||(e=document.createElement("div"),e.id="errbox",e.title="点击关闭",e.style.cssText="position:fixed;left:0;right:0;top:0;z-index:9999;background:#b71c1c;color:#fff;font:12px/1.5 monospace;padding:8px 10px;white-space:pre-wrap;max-height:45vh;overflow:auto;cursor:pointer;",e.addEventListener("click",dc),(document.body||document.documentElement).appendChild(e)),Ks.set(i,(Ks.get(i)||0)+1),e.textContent=[...Ks].map(([t,n])=>n>1?`${t}  ×${n}`:t).join(`
`),clearTimeout(Js),Js=setTimeout(dc,12e3)}window.addEventListener("error",i=>hc("[error] "+(i.message||i.error)+(i.error&&i.error.stack?`
`+i.error.stack:""))),window.addEventListener("unhandledrejection",i=>hc("[reject] "+(i.reason&&(i.reason.stack||i.reason.message)||i.reason)));const Fi=typeof window<"u"&&window.matchMedia&&(window.matchMedia("(pointer: coarse)").matches||!window.matchMedia("(pointer: fine)").matches&&"ontouchstart"in window)?"touch":"pc";let re,Xe;const J=i=>document.getElementById(i),sn=i=>J(i).classList.remove("hidden"),bt=i=>J(i).classList.add("hidden");function rn(){bt("settings-panel"),bt("layout-hint")}let Qs=null,ne=null,Bn="host";const ti=()=>Ke&&Qs==="host";let kt=!1,zi=!1;function Jm(){try{const i=localStorage.getItem("zlan_name");if(i&&i.trim())return i.trim().slice(0,12)}catch{}return"玩家"+Math.floor(Math.random()*900+100)}function fc(i){try{localStorage.setItem("zlan_name",(i||"").toString().slice(0,12))}catch{}}function Qm(){try{let i=localStorage.getItem("zlan_pid");return i||(i="u"+Date.now().toString(36)+Math.random().toString(36).slice(2,10),localStorage.setItem("zlan_pid",i)),i}catch{return"u"+Math.random().toString(36).slice(2,12)}}let Mt=Jm();const So=Qm();let Bi=!1,er=null,ut="wave",yt=1,Ct=100,Sn=!1,on="progress";const eg=3;function tg(){const i=(e,t)=>{const n=J(e);if(!n)return t;const s=parseFloat(n.value);return Number.isFinite(s)?s:t};return{COMBAT:{baseHP:i("cfg-baseHP",100),baseDamage:i("cfg-baseDamage",34),baseMoveSpeed:i("cfg-baseMoveSpeed",12),fireRate:i("cfg-fireRate",6.25),bulletSpeed:i("cfg-bulletSpeed",32),jumpForce:i("cfg-jumpForce",9.5)},TALENT:{pointsPerPlayer:i("cfg-talentPoints",10)|0},ROOM:{timeLimit:i("cfg-timeLimit",10)|0,playerScale:i("cfg-playerScale",1),maxPlayers:i("cfg-maxPlayers",8)|0,baseLives:yt}}}const ki=()=>ut==="versus"?tg():null,pc=()=>zi?{type:"startGame"}:{type:"startGame",mode:ut,lives:yt,target:ut==="wave"?Ct:0,bounce:Sn,zmix:on,config:ki()},Ft={atk:0,def:0,spd:0,size:0,lives:0};let Eo=!1,tr="";function mc(){const i=re&&re.state&&re.state.config;return i&&i.TALENT?i.TALENT:Ii.TALENT}function gc(){const i={...Ft};ti()?re&&re.setTalent&&re.setTalent("host",i):ne&&ne.sendTalent&&ne.sendTalent(i)}let bo=0;function To(i){const e=J("talent-panel");if(!e||!i)return;const t=mc(),n=t.pointsPerPlayer|0,s=i.players&&i.players[Bn],r=s&&!s.alive&&(s.respawnCd||0)>0,a=n>0&&i.mode==="versus"&&(i.status==="waiting"||r),o=!!(s&&s.ready);(o||!a)&&(bo=0);const c=a&&!o&&Date.now()>=bo,l=co(Ft),d=`${c}|${r}|${n}|${l}|${Ft.atk},${Ft.def},${Ft.spd},${Ft.size},${Ft.lives}`;if(d===tr)return;const h=e.classList.contains("hidden");tr=d;const f=J("tp-title");if(f&&(f.textContent=r?"⚔ 趁复活改配装":"🎖 天赋加点"),e.classList.toggle("hidden",!c),!c)return;h&&Wm();const m=n-l,g=J("tp-points");g&&(g.textContent=`剩余 ${m} 点`),e.querySelectorAll(".tp-row").forEach(_=>{const p=_.dataset.t,u=Ft[p]|0,M=_.querySelector(".tp-lv");M&&(M.textContent=String(u));const x=vn(u+1)-vn(u),T=_.querySelector(".tp-cost");T&&(T.textContent=u>=(t.maxLevel|0)?"MAX":`+${x}点`);const C=_.querySelector(".tp-plus"),w=_.querySelector(".tp-minus");C&&(C.disabled=u>=(t.maxLevel|0)||x>m),w&&(w.disabled=u<=0)})}const Ee=qm();async function wo(){if(ne=Ke?new Bm:new km,ne.setName&&ne.setName(Mt),ne.onState(i=>{if(!(!i||typeof i!="object")){if(i.type==="welcome"){if(Bn=i.id,re&&(re.myId=Bn),i.owner!==void 0&&i.owner!==null){const e=kt;kt=i.owner===Bn,kt&&i.resumed&&(zi=!0);const t=J("btn-restart");t&&(t.textContent=kt?"再来一局":"催房主重开"),nr(),e&&!kt&&yn("房主已移交给他人 👑")}Eo=!1,i.resumed&&yn("已接回原席位（命数/战绩保留）🔄");return}if(i.type==="static"){re&&re.applyStatic(i);return}if(i.type!=="leftRoom"){if(i.type==="error"){yn(i.msg||"操作被拒绝");return}if(i.type==="nudgeHost"){yn(`${i.name||"玩家"} 催你再来一局 🔁`);return}if(i.type==="hostChanged"){if(i.hostId===Bn){kt=!0,zi=!0;const e=J("btn-restart");e&&(e.textContent="再来一局"),nr(),yn("原房主已退出，你成为新房主 👑")}else yn(`${i.name||"玩家"} 成为新房主 👑`);return}if(i.type==="state"){if(!Eo&&Array.isArray(i.players)){const e=i.players.find(t=>t.id===Bn);e&&e.talent&&(Object.assign(Ft,e.talent),Eo=!0,tr="")}re.applySnapshot(i)}}}}),ne.onRoomList(i=>lg(i)),ne.onRtt(i=>hg(i)),Ke)if(Qs==="client")ne.onRoomFound(i=>rg(i)),ne.onHostDropped(()=>{alert("与主机断开连接"),ne.stopScan&&ne.stopScan(),sn("menu"),bt("hud")}),J("hud-status").textContent="搜索房间中…";else{const i=await ne.start(Mt);let e=!1;const t=Hm({getGame:()=>re,getRoomName:()=>Mt,getIsHost:()=>e,setIsHost:a=>{e=a},onNudge:a=>yn(`${a} 催你再来一局 🔁`)});window.ZB.wsListRooms=()=>JSON.stringify(t.listRooms()),window.ZB.wsCreateRoom=(a,o,c,l,d,h,f)=>JSON.stringify(t.createRoom({name:a,mode:o,lives:c,target:l,bounce:d,zmix:h,config:f})),window.ZB.wsJoinRoom=(a,o,c)=>JSON.stringify(t.joinRoom({roomId:a,name:o,pid:c})),window.ZB.wsInput=(a,o)=>t.input(a,o),window.ZB.wsTalent=(a,o)=>t.talent(a,o),window.ZB.wsReady=(a,o)=>t.ready(a,o),window.ZB.wsStartGame=(a,o)=>t.startGame(a,o),window.ZB.wsNudge=(a,o)=>t.nudge(a,o),window.ZB.wsLeaveRoom=a=>t.leaveRoom(a),window.ZB.wsRemovePlayer=a=>t.removePlayer(a),ne.onClientConnected&&ne.onClientConnected(()=>{});const n=new Map,s=new Set;ne.onClientDisconnected&&ne.onClientDisconnected(a=>{if(!re)return;if(s.has(a)){s.delete(a);return}const o=n.get(a)||a;o&&(re.hostSetOffline(o),n.delete(a))}),ne.onClientMessage&&ne.onClientMessage((a,o)=>{if(!re||!o||typeof o!="object")return;const c=n.get(a)||a;if(o.type==="joinRoom"||o.type==="createRoom"){const l=(o.name||o.playerName||"玩家").toString().slice(0,16),d=(o.pid||"").toString().slice(0,64),h=re.hostClaimSeat(d);if(h){for(const[m,g]of n)g===h&&m!==a&&(s.add(m),n.delete(m));const f=re.state.players[h];f&&(f.name=l),f&&f.state===0&&re.hostSetOnline(h),n.set(a,h),ne.sendTo&&ne.sendTo(a,{type:"welcome",id:h,roomId:"r1",resumed:!!(f&&f.state===0)});return}re.state.players[a]||re.hostAddPlayer(a,l),re.hostBindPid(d,a),n.set(a,a),ne.sendTo&&ne.sendTo(a,{type:"welcome",id:a,roomId:"r1"});return}if(o.type==="ready"){re.hostSetReady(c,o.ready!==!1);return}if(o.type==="leaveRoom"){re.hostSetOffline(c),n.delete(a),ne.sendTo&&ne.sendTo(a,{type:"leftRoom"});return}o.type==="input"?Array.isArray(o.cmds)?re.hostQueueCmds(c,o.cmds):re.hostSetInput(c,o):o.type==="talent"&&re.setTalent?re.setTalent(c,o.talent||{}):o.type==="nudgeHost"&&yn(`${o.name||"玩家"} 催你再来一局 🔁`)}),J("hud-status").textContent=`主机 ${i.ip}:${i.port}`;const r=J("host-info");r&&(i.wsPort,r.classList.remove("hidden"),r.innerHTML=`游戏地址：<b>${location.origin}</b>　·　把这个地址发给好友，他们打开即可搜索并加入你的房间`)}else{await ne.connect(null),J("hud-status").textContent="已连接房间";try{const t=await(await fetch("/__lanip")).json(),n=J("host-info");n&&(n.classList.remove("hidden"),n.innerHTML=`游戏地址：<b>${location.origin}</b>　·　把这个地址发给好友，他们打开即可搜索并加入你的房间`)}catch{}}}function _c(){if(mg(),ne){if(ne.leaveRoom)try{ne.leaveRoom()}catch{}if(ne.close)try{ne.close()}catch{}}ne=null,kt=!1,zi=!1,J("hud-status").textContent="",bt("hud"),bt("result"),bt("talent-panel"),rn(),sn("menu")}function nr(i){const e=i===void 0?kt:!!i,t=J("btn-start-wave"),n=J("wave-hint"),s=re&&re.state&&re.state.mode||ut;e?(t&&(t.style.display="",t.disabled=!1,t.textContent=s==="versus"?"⚔️ 开始对战":"🧟 开始僵尸浪潮"),n&&s!=="versus"&&(n.style.display="none")):(t&&(t.style.display="none"),n&&(n.style.display="",s!=="versus"&&(n.textContent="等待房主开始游戏…")))}function Ao(i){const e=J("wave-overlay");e&&(e.classList.remove("hidden"),nr(i)),ti()||re&&(re.onCmds=t=>{ne&&ne.send&&ne.send({type:"input",cmds:t})}),pg()}async function xc(i,e,t){Qs="host",Bn="host",kt=!0,zi=!1;{const r=J("btn-restart");r&&(r.textContent="再来一局")}i&&(ut=i),e!=null&&(yt=e),t&&("bounce"in t&&(Sn=!!t.bounce),t.zmix&&(on=t.zmix),"target"in t&&t.target!=null&&(Ct=t.target|0));const n=J("player-name-create")?J("player-name-create").value.trim():"";n&&(Mt=n.slice(0,12),fc(Mt)),bt("menu"),bt("join"),bt("mode-select"),rn(),sn("hud"),Co(),re.hostInit(Mt),re.state.mode=ut;const s=ki();s&&re.setConfig&&re.setConfig(s);try{await wo(),Ke||await ne.createRoom({name:Mt,mode:ut,lives:yt,target:ut==="wave"?Ct:0,bounce:Sn,zmix:on,config:ki(),pid:So}),Ao(!0)}catch(r){alert("建房失败："+r.message),sn("menu"),bt("hud")}}function ng(){if(ut="wave",yt=1,Ct=100,Sn=!1,on="progress",!J("mode-select")){xc("wave",1,{bounce:!1,zmix:"progress",target:100});return}const e=J("mode-wave"),t=J("mode-versus");e&&e.classList.add("active"),t&&t.classList.remove("active");const n=J("bounce-toggle");n&&(n.checked=!1);const s=J("player-name-create");s&&!s.value&&(s.value=Mt);const r=J("zmix-progress"),a=J("zmix-mix");r&&r.classList.add("active"),a&&a.classList.remove("active"),ns(),ir(),Ro(),rn(),bt("menu"),sn("mode-select")}function ns(){const i=J("lives-label");i&&(i.textContent=yt===0?"∞":String(yt))}function ir(){const i=J("target-label");i&&(i.textContent=Ct===0?"∞":String(Ct))}function Ro(){const i=ut==="versus",e=J("lives-row");e&&e.classList.toggle("hidden",!1);const t=J("target-row");t&&t.classList.toggle("hidden",i);const n=J("zmix-row");n&&n.classList.toggle("hidden",i);const s=J("adv-config");s&&s.classList.toggle("hidden",!i)}async function ig(){Qs="client",kt=!1,zi=!1;{const t=J("btn-restart");t&&(t.textContent="催房主再来一局")}rn(),bt("menu"),sn("join");const i=J("room-list");i&&(i.innerHTML='<div class="empty">尚未搜索房间。点「搜索房间」查看可加入的房间。</div>');const e=J("player-name-join");e&&!e.value&&(e.value=Mt)}async function sg(){const i=J("player-name-join");i&&i.value.trim()&&(Mt=i.value.trim().slice(0,12),fc(Mt),ne&&ne.setName&&ne.setName(Mt));try{await wo(),Ke?ne.scan():ne.listRooms()}catch(e){alert("连接失败："+e.message+`
请确认服务器已开 relay 且两台设备在同一网络。`)}}const sr=[];function rg(i){!i||!i.ip||sr.some(e=>e.ip===i.ip)||(sr.push(i),og(sr))}function og(i){const e=J("room-list");if(e){if(!i||i.length===0){e.innerHTML='<div class="empty">正在搜索房间…</div>';return}e.innerHTML="";for(const t of i){const n=document.createElement("div");n.className="room-card",n.innerHTML='<div class="rc-main"><div class="rc-name">'+Hi(t.name||"主机")+'<span class="mode-badge">主机</span></div><div class="rc-sub">房主地址 '+Hi(t.ip)+":"+(t.port||5e3)+'</div></div><button class="join-btn" data-ip="'+Hi(t.ip)+'">加入</button>',e.appendChild(n)}e.querySelectorAll(".join-btn").forEach(t=>{t.onclick=()=>ag(t.getAttribute("data-ip"))})}}async function ag(i){try{await ne.connectClient(i),ne.stopScan&&ne.stopScan(),ne.send({type:"joinRoom",roomId:"r1",name:Mt,pid:So}),bt("join"),rn(),sn("hud"),Co(),Ao(!1)}catch(e){alert("加入失败："+e.message)}}function lg(i){const e=J("room-list");if(e){if(!i||i.length===0){e.innerHTML='<div class="empty">暂无房间。让好友先「创建房间」吧。</div>';return}e.innerHTML="";for(const t of i){const n=document.createElement("div");n.className="room-card";const s=t.mode==="versus",r=s?"对战":"僵尸浪潮",a=t.players&&t.players.length?t.players.join("、"):"（暂无玩家）",o=s?"命 "+(t.lives===0?"∞":t.lives):"命 "+(t.lives===0?"∞":t.lives)+" · 目标 "+(t.target===0?"∞":t.target);n.innerHTML='<div class="rc-main"><div class="rc-name">'+Hi(t.name)+'<span class="mode-badge'+(s?" versus":"")+'">'+r+'</span></div><div class="rc-sub">'+t.count+" 人 · "+Hi(a)+" · "+(t.status==="playing"?"进行中":"等待中")+'</div><div class="rc-opt">'+o+'</div></div><button class="join-btn" data-room="'+Hi(t.id)+'">加入</button>',e.appendChild(n)}e.querySelectorAll(".join-btn").forEach(t=>{t.onclick=()=>cg(t.getAttribute("data-room"))})}}async function cg(i){try{ne||await wo(),await ne.joinRoom(i,Mt,So),bt("join"),rn(),sn("hud"),Co(),Ao(!1)}catch(e){alert("加入失败："+e.message)}}function Co(){const i=J("controls"),e=J("look-zone"),t=J("btn-fire"),n=J("btn-jump"),s=J("pc-help");Fi==="touch"?([i,e,t,n].forEach(r=>r&&r.classList.remove("hidden")),s&&s.classList.add("hidden")):([i,e,t,n].forEach(r=>r&&r.classList.add("hidden")),s&&s.classList.remove("hidden"))}let rr=null,Lo=!1,kn=null,or=0,ar=0,is=0;function ug(){kn||typeof document>"u"||(kn=document.createElement("div"),kn.id="fps-hud",kn.textContent="-- FPS",kn.style.cssText="position:fixed;top:4px;right:6px;z-index:30;font:600 12px/1.3 ui-monospace,Menlo,Consolas,monospace;color:#7CFFB2;background:rgba(0,0,0,.42);padding:2px 7px;border-radius:7px;pointer-events:none;-webkit-user-select:none;user-select:none;letter-spacing:.3px;",document.body.appendChild(kn))}let En=null,ss=null;function dg(){En||typeof document>"u"||(En=document.createElement("div"),En.id="ping-hud",En.textContent="📶 --",En.style.cssText="position:fixed;top:26px;right:6px;z-index:30;font:600 12px/1.3 ui-monospace,Menlo,Consolas,monospace;color:#9aa0a6;background:rgba(0,0,0,.42);padding:2px 7px;border-radius:7px;pointer-events:none;-webkit-user-select:none;user-select:none;letter-spacing:.3px;",document.body.appendChild(En))}function hg(i){if(!En)return;ss=ss==null?i:ss*.7+i*.3;const e=Math.round(ss);let t,n;e<=80?(t="#7CFFB2",n="📶 "+e+"ms"):e<=180?(t="#FFD166",n="📶 "+e+"ms"):(t="#FF5C5C",n="⚠ "+e+"ms 高延迟"),En.textContent=n,En.style.color=t}const Po=(()=>{try{return/Quark|UCBrowser|UCWEB/i.test(navigator.userAgent||"")}catch{return!1}})(),fg=1e3/60,vc=Po?100:0;let ni=null,Do=0;function pg(){if(Bi)return;Bi=!0,ni&&(clearTimeout(ni),ni=null),Do=0,or=0,ar=0,is=0,ss=null,ug(),dg();function i(n){if(Bi){if(or&&(is+=n-or,ar++,is>=500)){const s=Math.round(ar*1e3/is);kn&&(kn.textContent=s+" FPS"),is=0,ar=0}if(or=n,re&&(re.myPitch=Xe&&Xe.getAimPitch?Xe.getAimPitch():0,re.myYaw=Xe&&Xe.aimYaw!=null?Xe.aimYaw:null,Xe&&Xe.getInput)){const s=Xe.getInput();rr=s,s.jump&&(Lo=!0),re.feedLocalInput&&re.feedLocalInput(s)}re.render(),(!vc||n-Do>=vc)&&(Do=n,Zm(re.state,Bn),To(re.state)),t()}}let e=performance.now();function t(){if(!Bi)return;if(!Po){requestAnimationFrame(i);return}const n=performance.now(),s=Math.max(0,fg-(n-e));e=n,ni=setTimeout(()=>{Bi&&i(performance.now())},s)}if(t(),ti()){const n=.016666666666666666;let s=0,r=performance.now(),a=0;er=setInterval(()=>{const o=performance.now(),c=Math.min(.1,(o-r)/1e3);for(r=o,s+=c;s>=n;)re.hostStep(n),s-=n;if(rr&&(re.hostSetInput("host",Lo?{...rr,jump:!0}:rr),Lo=!1),o-a>50){a=o;const l=re.hostSnapshot();ne.broadcast(l),Ke&&ne.pushWsState&&ne.pushWsState(JSON.stringify(l))}},1e3/60)}}function mg(){Bi=!1,ni&&(clearTimeout(ni),ni=null),er&&(clearInterval(er),er=null)}function Mc(){const i=document.documentElement,t=!(document.fullscreenElement||document.webkitFullscreenElement);try{const n=t?(i.requestFullscreen||i.webkitRequestFullscreen||function(){}).call(i):(document.exitFullscreen||document.webkitExitFullscreen||function(){}).call(document);n&&typeof n.catch=="function"?n.then(()=>{t&&Fi==="touch"&&oc()}).catch(()=>{}):t&&Fi==="touch"&&setTimeout(()=>oc(),60),t||Gm()}catch{}setTimeout(()=>re&&re.resize(),80)}function yc(){const i=document.getElementById("game-canvas");re=new Fm(i);const e={mode:Fi,canvas:i,moveEl:document.getElementById("joy-move"),lookEl:document.getElementById("look-zone"),fireEl:document.getElementById("btn-fire"),jumpEl:document.getElementById("btn-jump"),settings:Ee};Xe=new ac(e),J("btn-create").onclick=()=>ng(),J("btn-join").onclick=()=>ig(),J("btn-search-rooms").onclick=()=>sg(),J("btn-back").onclick=()=>{if(ne&&ne.stopScan&&ne.stopScan(),ne&&ne.close)try{ne.close()}catch{}ne=null,sr.length=0,rn(),sn("menu"),bt("join")};const t=J("player-name-join");t&&!t.value&&(t.value=Mt);const n=J("player-name-create");n&&!n.value&&(n.value=Mt);const s=J("mode-wave"),r=J("mode-versus");s&&(s.onclick=()=>{ut="wave",yt=1,Ct=100,s.classList.add("active"),r&&r.classList.remove("active"),ns(),ir(),Ro()}),r&&(r.onclick=()=>{ut="versus",yt=eg,r.classList.add("active"),s&&s.classList.remove("active"),ns(),Ro()});const a=J("lives-less"),o=J("lives-more");a&&(a.onclick=()=>{yt=Math.max(0,yt-1),ns()}),o&&(o.onclick=()=>{yt=Math.min(20,yt+1),ns()});const c=J("target-less"),l=J("target-more");c&&(c.onclick=()=>{Ct=Math.max(0,Ct-10),ir()}),l&&(l.onclick=()=>{Ct=Math.min(500,Ct+10),ir()});const d=J("btn-mode-start");d&&(d.onclick=()=>xc(ut,yt,{bounce:Sn,zmix:on,target:ut==="wave"?Ct:0}));const h=J("btn-mode-back");h&&(h.onclick=()=>{bt("mode-select"),rn(),sn("menu")});const f=J("bounce-toggle");f&&(f.onchange=()=>{Sn=!!f.checked});const m=J("zmix-progress"),g=J("zmix-mix");m&&(m.onclick=()=>{on="progress",m.classList.add("active"),g&&g.classList.remove("active")}),g&&(g.onclick=()=>{on="mix",g.classList.add("active"),m&&m.classList.remove("active")});const _=J("btn-restart");_.textContent=kt?"再来一局":"催房主再来一局",_.onclick=()=>{if(rn(),kt){if((re&&re.state&&re.state.mode||ut)==="versus"){ti()&&re?re.backToWaiting():ne&&ne.send&&ne.send({type:"backToWaiting"}),nr();return}ti()&&re?re.startGame(ut,yt,{bounce:Sn,zmix:on,target:Ct,config:ki()}):ne&&ne.send&&ne.send(pc());return}ne&&ne.send&&(ne.send({type:"nudgeHost",action:"restart",name:Mt}),yn("已催房主再来一局 🔁"),J("hud-status").textContent="已催房主再来一局，等待房主重开…")},J("btn-start-wave").onclick=()=>{rn(),kt?ti()&&re?re.startGame(ut,yt,{bounce:Sn,zmix:on,target:ut==="wave"?Ct:0,config:ki()}):ne&&ne.send&&ne.send(pc()):ne&&ne.send&&ne.send({type:"startGame",mode:ut,lives:yt,target:ut==="wave"?Ct:0,bounce:Sn,zmix:on,config:ki()}),J("wave-overlay").classList.add("hidden")},document.querySelectorAll("#talent-panel .tp-row").forEach(D=>{const W=D.dataset.t,q=D.querySelector(".tp-plus"),le=D.querySelector(".tp-minus");q&&(q.onclick=()=>{const H=mc(),j=Ft[W]|0;if(j>=(H.maxLevel|0))return;const ue=vn(j+1)-vn(j),me=(H.pointsPerPlayer|0)-co(Ft);ue>me||(Ft[W]=j+1,gc(),re&&re.state&&To(re.state))}),le&&(le.onclick=()=>{(Ft[W]|0)<=0||(Ft[W]-=1,gc(),re&&re.state&&To(re.state))})});const p=J("tp-close");p&&(p.onclick=()=>{bo=Date.now()+1500;const D=J("talent-panel");D&&D.classList.add("hidden"),tr="",ti()?re&&re.hostSetReady&&re.hostSetReady("host",!0):ne&&ne.send&&ne.send({type:"ready",ready:!0}),re&&re.state&&re.state.status==="playing"&&vo(document.getElementById("game-canvas"))});const u=J("btn-fullscreen");u&&(u.onclick=()=>Mc()),window.addEventListener("keydown",D=>{D.code==="KeyF"&&(D.preventDefault(),Mc())}),["fullscreenchange","webkitfullscreenchange"].forEach(D=>document.addEventListener(D,()=>re&&re.resize()));const M=J("settings-panel"),x=()=>{const D=J("set-pc"),W=J("set-touch");Fi==="touch"?(D&&D.classList.add("hidden"),W&&W.classList.remove("hidden")):(D&&D.classList.remove("hidden"),W&&W.classList.add("hidden"))};J("btn-settings").onclick=()=>{M.classList.toggle("hidden"),x()};const T=J("btn-leave-lobby");T&&(T.onclick=()=>_c()),J("btn-result-menu").onclick=()=>_c(),J("set-close").onclick=()=>M.classList.add("hidden");const C=J("set-look"),w=J("set-joy"),A=J("val-look"),X=J("val-joy");C.value=Ee.lookSens,A.textContent=Ee.lookSens.toFixed(1),w.value=Ee.joySens,X.textContent=Ee.joySens.toFixed(1),C.oninput=()=>{Ee.lookSens=parseFloat(C.value),A.textContent=Ee.lookSens.toFixed(1),Xe&&(Xe.lookSens=Ee.lookSens),Mn(Ee)},w.oninput=()=>{Ee.joySens=parseFloat(w.value),X.textContent=Ee.joySens.toFixed(1),Xe&&(Xe.joySens=Ee.joySens,Xe.move&&(Xe.move.sens=Ee.joySens)),Mn(Ee)};const S=J("set-edit"),b=J("layout-hint"),k=()=>{if(S.textContent="拖动布置："+(Ee.editMode?"开":"关"),S.classList.toggle("primary",Ee.editMode),[J("joy-move"),J("btn-fire"),J("btn-jump")].forEach(D=>D&&D.classList.toggle("editing",Ee.editMode)),b){b.classList.toggle("hidden",!Ee.editMode);const D=J("lh-orient");D&&(D.textContent=window.innerWidth>=window.innerHeight?"横屏":"竖屏")}Ee.editMode&&M.classList.add("hidden")},$=D=>{Ee.editMode=!!D,Xe&&Xe.setLayoutEdit&&Xe.setLayoutEdit(Ee.editMode),k(),Mn(Ee)};S.onclick=()=>$(!Ee.editMode);const se=J("lh-done");se&&(se.onclick=()=>$(!1)),window.addEventListener("orientationchange",()=>setTimeout(k,200)),window.addEventListener("resize",()=>{Ee.editMode&&k()}),J("set-reset").onclick=()=>{Object.assign(Ee,ts()),Xe&&(Xe.lookSens=Ee.lookSens,Xe.joySens=Ee.joySens,Xe.move&&(Xe.move.sens=Ee.joySens),Xe._applyLayout()),C.value=Ee.lookSens,A.textContent=Ee.lookSens.toFixed(1),w.value=Ee.joySens,X.textContent=Ee.joySens.toFixed(1),k(),Mn(Ee)},k(),Ee.editMode&&Xe&&Xe.setLayoutEdit&&Xe.setLayoutEdit(!0);const L=J("set-mouse"),z=J("val-mouse");L.value=Ee.mouseSens,z.textContent=Ee.mouseSens.toFixed(1),L.oninput=()=>{Ee.mouseSens=parseFloat(L.value),z.textContent=Ee.mouseSens.toFixed(1),Xe&&(Xe.mouseSens=Ee.mouseSens),Mn(Ee)};const G=["forward","back","left","right","jump"],Y=()=>{G.forEach(D=>{const W=document.querySelector('.key-btn[data-act="'+D+'"]'),q=W&&W.querySelector("b");q&&(q.textContent=Sc(Ee.keys[D]))})};Y();let V=null;if(document.querySelectorAll(".key-btn").forEach(D=>{D.addEventListener("click",()=>{if(V)return;const W=D.dataset.act;V=W;const q=D.querySelector("b");D.classList.add("listening");const le=q?q.textContent:"";q&&(q.textContent="…");const H=j=>{j.preventDefault(),j.stopPropagation(),Ee.keys[W]=j.code,Xe&&(Xe.keysMap=Ee.keys),q&&(q.textContent=Sc(j.code)),D.classList.remove("listening"),V=null,Mn(Ee)};window.addEventListener("keydown",H,{capture:!0,once:!0}),setTimeout(()=>{V===W&&(window.removeEventListener("keydown",H,{capture:!0}),q&&(q.textContent=le),D.classList.remove("listening"),V=null)},5e3)})}),J("set-keys-reset").onclick=()=>{Object.assign(Ee.keys,ts().keys),Xe&&(Xe.keysMap=Ee.keys),Y(),Mn(Ee)},Po){const D=document.getElementById("u4-warn");D&&(D.hidden=!1)}}document.readyState==="loading"?document.addEventListener("DOMContentLoaded",yc):yc();function Hi(i){return String(i).replace(/[&<>"']/g,e=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"})[e])}function Sc(i){if(!i)return"?";let e;return(e=/^Key([A-Z])$/.exec(i))||(e=/^Digit(\d)$/.exec(i))?e[1]:(e=/^Arrow(Up|Down|Left|Right)$/.exec(i))?{Up:"↑",Down:"↓",Left:"←",Right:"→"}[e[1]]:{Space:"␣",ShiftLeft:"LShift",ShiftRight:"RShift",ControlLeft:"LCtrl",ControlRight:"RCtrl",AltLeft:"LAlt",AltRight:"RAlt",Tab:"Tab",Enter:"Enter",Backquote:"`"}[i]||i}let Ec=!1;function bc(i){if(!Ke&&!(i&&i.persisted)&&!Ec){Ec=!0;try{ne&&ne.close&&ne.close()}catch{}}}window.addEventListener("pagehide",bc),window.addEventListener("beforeunload",bc),console.log("[Game4U] 就绪。模式:",zm?"Capacitor(真机)":"桌面/HTML","| 控制:",Fi)})();
