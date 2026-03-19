
(function() {
  // The only link that matters
  var github = "https://cdn.jsdelivr.net/gh/goat-67/ugs-singlefile@main/UGS-Files/assets/";

  // This "kidnaps" every image request and sends it to your GitHub
  var originalSrc = Object.getOwnPropertyDescriptor(Image.prototype, 'src');
  Object.defineProperty(Image.prototype, 'src', {
    set: function(v) {
      if (typeof v === 'string' && !v.includes('jsdelivr')) {
        // Get just the filename (e.g., "bg_mid_b.webp") and add GitHub to the front
        var name = v.split('/').pop();
        v = github + name;
      }
      originalSrc.set.call(this, v);
    }
  });

  // This "kidnaps" the audio/music request
  var originalFetch = window.fetch;
  window.fetch = function(url, options) {
    var u = (typeof url === 'string') ? url : (url.url || "");
    if (u.includes('.ogg') || u.includes('.mp3')) {
      var name = u.split('/').pop();
      url = github + name;
    }
    return originalFetch(url, options);
  };
})();

var t=Object.defineProperty,e=(e,n,i)=>((e,n,i)=>n in e?t(e,n,{enumerable:!0,configurable:!0,writable:!0,value:i}):e[n]=i)(e,"symbol"!=typeof n?n+"":n,i);!function(){const t=document.createElement("link").relList;if(!(t&&t.supports&&t.supports("modulepreload"))){for(const t of document.querySelectorAll('link[rel="modulepreload"]'))e(t);new MutationObserver(t=>{for(const n of t)if("childList"===n.type)for(const t of n.addedNodes)"LINK"===t.tagName&&"modulepreload"===t.rel&&e(t)}).observe(document,{childList:!0,subtree:!0})}function e(t){if(t.ep)return;t.ep=!0;const e=function(t){const e={};return t.integrity&&(e.integrity=t.integrity),t.referrerPolicy&&(e.referrerPolicy=t.referrerPolicy),"use-credentials"===t.crossOrigin?e.credentials="include":"anonymous"===t.crossOrigin?e.credentials="omit":e.credentials="same-origin",e}(t);fetch(t.href,e)}}();const n={width:960,height:540},i={groundY:450,killY:760,cameraLeadX:260,pxPerMeter:10},s={width:24,height:52,startX:120,startY:325,gravity:1450,runSpeedStart:205,runSpeedMax:430,runSpeedRampPerSec:2.6},r={maxRangeX:380,maxYOffset:360,maxAnchorDrop:8,inputBufferMs:150,coyoteMs:110,minRopeLength:64,releaseBoost:164,releaseVerticalScale:.88,releaseLift:94},a={radius:16,baseBounce:860,lockMs:90},o={lookAhead:2600,keepBehind:700},h={warmupSec:0,intervalSec:30,baseMeters:500,stepMeters:650,stepGrowthPerStage:50},c={freezeDurationSec:.15,fadeInDurationSec:.5},l={durationSec:3,fadeOutSec:.8};class u{constructor(t="/assets/audio/last-swing/synthwavehouse.ogg"){e(this,"bgmPath"),e(this,"ctx",null),e(this,"masterGain",null),e(this,"compressor",null),e(this,"sfxGain",null),e(this,"bgmGain",null),e(this,"noiseBuffer",null),e(this,"bgmBuffer",null),e(this,"bgmSource",null),e(this,"bgmLoadPromise",null),e(this,"bgmShouldPlay",!1),e(this,"muted",!1),this.bgmPath=t}warmUp(){this.ensureContext()}startBgm(){this.bgmShouldPlay=!0;const t=this.ensureContext();this.ensureBgmGain(),!this.bgmBuffer||this.muted?this.bgmLoadPromise||(this.bgmLoadPromise=fetch(this.bgmPath).then(t=>t.arrayBuffer()).then(e=>t.decodeAudioData(e)).then(t=>{this.bgmBuffer=t,this.bgmShouldPlay&&!this.muted&&this.playBgmBuffer()}).catch(()=>{this.bgmBuffer=null}).finally(()=>{this.bgmLoadPromise=null})):this.playBgmBuffer()}stopBgm(){this.bgmShouldPlay=!1,this.stopBgmSource()}toggleMute(){return this.setMuted(!this.muted),this.muted}setMuted(t){this.muted=t,this.masterGain&&(this.masterGain.gain.value=this.muted?0:1),this.muted?this.stopBgmSource():this.bgmShouldPlay&&this.startBgm()}isMuted(){return this.muted}playGrappleAttach(){if(this.muted)return;if(this.sfxGain||this.ensureContext(),!this.ctx||!this.sfxGain)return;const t=this.ctx.currentTime,e=this.ctx.createOscillator(),n=this.ctx.createGain();e.type="triangle",e.frequency.setValueAtTime(620,t),e.frequency.exponentialRampToValueAtTime(980,t+.05),n.gain.setValueAtTime(.18,t),n.gain.exponentialRampToValueAtTime(.001,t+.1),e.connect(n).connect(this.sfxGain),e.start(t),e.stop(t+.11);const i=this.ctx.createOscillator(),s=this.ctx.createGain();i.type="sine",i.frequency.setValueAtTime(1420,t),i.frequency.exponentialRampToValueAtTime(2100,t+.05),s.gain.setValueAtTime(.06,t),s.gain.exponentialRampToValueAtTime(.001,t+.08),i.connect(s).connect(this.sfxGain),i.start(t),i.stop(t+.09)}playGrappleRelease(){if(this.muted)return;if(this.sfxGain||this.ensureContext(),!this.ctx||!this.sfxGain)return;const t=this.ctx.currentTime,e=this.ctx.createOscillator(),n=this.ctx.createGain();e.type="sawtooth",e.frequency.setValueAtTime(900,t),e.frequency.exponentialRampToValueAtTime(280,t+.13),n.gain.setValueAtTime(.12,t),n.gain.exponentialRampToValueAtTime(.001,t+.14),e.connect(n).connect(this.sfxGain),e.start(t),e.stop(t+.15),this.noiseBuffer||(this.noiseBuffer=this.createNoiseBuffer());const i=this.ctx.createBufferSource(),s=this.ctx.createBiquadFilter(),r=this.ctx.createGain();i.buffer=this.noiseBuffer,s.type="bandpass",s.frequency.setValueAtTime(2400,t),s.frequency.exponentialRampToValueAtTime(900,t+.12),s.Q.value=.8,r.gain.setValueAtTime(.07,t),r.gain.exponentialRampToValueAtTime(.001,t+.12),i.connect(s).connect(r).connect(this.sfxGain),i.start(t),i.stop(t+.13)}playBouncePad(){if(this.muted)return;if(this.sfxGain||this.ensureContext(),!this.ctx||!this.sfxGain)return;const t=this.ctx.currentTime,e=this.ctx.createOscillator(),n=this.ctx.createGain();e.type="sine",e.frequency.setValueAtTime(160,t),e.frequency.exponentialRampToValueAtTime(86,t+.2),n.gain.setValueAtTime(.2,t),n.gain.exponentialRampToValueAtTime(.001,t+.23),e.connect(n).connect(this.sfxGain),e.start(t),e.stop(t+.24);const i=this.ctx.createOscillator(),s=this.ctx.createGain();i.type="triangle",i.frequency.setValueAtTime(420,t),i.frequency.exponentialRampToValueAtTime(760,t+.08),i.frequency.exponentialRampToValueAtTime(520,t+.2),s.gain.setValueAtTime(.1,t),s.gain.exponentialRampToValueAtTime(.001,t+.22),i.connect(s).connect(this.sfxGain),i.start(t),i.stop(t+.23)}playStageAdvance(t=1){if(this.muted)return;if(this.sfxGain||this.ensureContext(),!this.ctx||!this.sfxGain)return;const e=this.ctx.currentTime,n=[523.25,659.25,783.99,987.77],i=Math.max(2,Math.min(n.length,t+1));for(let s=0;s<i;s+=1){const t=e+.09*s,i=this.ctx.createOscillator(),r=this.ctx.createGain();i.type="triangle",i.frequency.value=n[s],r.gain.setValueAtTime(0,t),r.gain.linearRampToValueAtTime(.11,t+.01),r.gain.exponentialRampToValueAtTime(.001,t+.21),i.connect(r).connect(this.sfxGain),i.start(t),i.stop(t+.22)}}playGameOver(t){if(this.muted)return;if(this.sfxGain||this.ensureContext(),!this.ctx||!this.sfxGain)return;const e=this.ctx.currentTime;if("timeout"===t){const t=this.ctx.createOscillator(),n=this.ctx.createGain();t.type="square",t.frequency.value=760,n.gain.setValueAtTime(.12,e),n.gain.exponentialRampToValueAtTime(.001,e+.22),t.connect(n).connect(this.sfxGain),t.start(e),t.stop(e+.23);const i=this.ctx.createOscillator(),s=this.ctx.createGain();return i.type="square",i.frequency.value=520,s.gain.setValueAtTime(.1,e+.12),s.gain.exponentialRampToValueAtTime(.001,e+.36),i.connect(s).connect(this.sfxGain),i.start(e+.12),void i.stop(e+.37)}if("spike"===t){this.noiseBuffer||(this.noiseBuffer=this.createNoiseBuffer());const t=this.ctx.createBufferSource(),n=this.ctx.createBiquadFilter(),i=this.ctx.createGain();t.buffer=this.noiseBuffer,n.type="highpass",n.frequency.value=1900,i.gain.setValueAtTime(.14,e),i.gain.exponentialRampToValueAtTime(.001,e+.3),t.connect(n).connect(i).connect(this.sfxGain),t.start(e),t.stop(e+.32);const s=this.ctx.createOscillator(),r=this.ctx.createGain();return s.type="sawtooth",s.frequency.setValueAtTime(420,e),s.frequency.exponentialRampToValueAtTime(180,e+.28),r.gain.setValueAtTime(.16,e),r.gain.exponentialRampToValueAtTime(.001,e+.31),s.connect(r).connect(this.sfxGain),s.start(e),void s.stop(e+.32)}const n=this.ctx.createOscillator(),i=this.ctx.createGain();n.type="sine",n.frequency.setValueAtTime(280,e),n.frequency.exponentialRampToValueAtTime(55,e+.62),i.gain.setValueAtTime(.2,e),i.gain.exponentialRampToValueAtTime(.001,e+.66),n.connect(i).connect(this.sfxGain),n.start(e),n.stop(e+.68)}dispose(){this.stopBgm(),this.bgmBuffer=null,this.bgmLoadPromise=null,this.noiseBuffer=null,this.bgmGain=null,this.sfxGain=null,this.compressor=null,this.masterGain=null,this.ctx&&"closed"!==this.ctx.state&&this.ctx.close(),this.ctx=null}ensureContext(){return this.ctx||(this.ctx=new AudioContext,this.compressor=this.ctx.createDynamicsCompressor(),this.compressor.threshold.value=-18,this.compressor.knee.value=22,this.compressor.ratio.value=4,this.compressor.attack.value=.004,this.compressor.release.value=.2,this.masterGain=this.ctx.createGain(),this.masterGain.gain.value=this.muted?0:1,this.compressor.connect(this.masterGain),this.masterGain.connect(this.ctx.destination),this.sfxGain=this.ctx.createGain(),this.sfxGain.gain.value=.72,this.sfxGain.connect(this.compressor),this.noiseBuffer=this.createNoiseBuffer()),"suspended"===this.ctx.state&&this.ctx.resume(),this.ctx}ensureBgmGain(){this.ctx&&this.masterGain&&(this.bgmGain||(this.bgmGain=this.ctx.createGain(),this.bgmGain.gain.value=.07,this.bgmGain.connect(this.masterGain)))}playBgmBuffer(){this.ctx&&this.bgmBuffer&&this.bgmGain&&(this.stopBgmSource(),this.bgmSource=this.ctx.createBufferSource(),this.bgmSource.buffer=this.bgmBuffer,this.bgmSource.loop=!0,this.bgmSource.connect(this.bgmGain),this.bgmSource.start(0))}stopBgmSource(){if(this.bgmSource){try{this.bgmSource.stop()}catch{}this.bgmSource.disconnect(),this.bgmSource=null}}createNoiseBuffer(){const t=this.ctx,e=2*t.sampleRate,n=t.createBuffer(1,e,t.sampleRate),i=n.getChannelData(0);for(let s=0;s<e;s+=1)i[s]=2*Math.random()-1;return n}}const d=class t{constructor(i,r,a,o){var l,d;e(this,"canvas"),e(this,"ctx"),e(this,"onScoreUpdate"),e(this,"onGameOver"),e(this,"uiText"),e(this,"mode","ready"),e(this,"running",!1),e(this,"animationFrameId",null),e(this,"lastTimestamp",0),e(this,"elapsedSec",0),e(this,"runSpeed",s.runSpeedStart),e(this,"score",0),e(this,"runPeakMeters",0),e(this,"bestMeters",0),e(this,"startX",s.startX),e(this,"missionActive",!1),e(this,"missionStage",0),e(this,"missionTargetMeters",h.baseMeters),e(this,"missionTimeLeftSec",h.intervalSec),e(this,"missionWarmupLeftSec",h.warmupSec),e(this,"player"),e(this,"grapple",{anchorId:null,ropeLength:0}),e(this,"anchors",[]),e(this,"spikes",[]),e(this,"bouncePads",[]),e(this,"nextId",1),e(this,"nextSegmentStartX",0),e(this,"inputBufferMsLeft",0),e(this,"coyoteMsLeft",0),e(this,"isActionHeld",!1),e(this,"activeTouchId",null),e(this,"bounceLockMs",0),e(this,"backgroundSets"),e(this,"backgroundSetIndex",0),e(this,"previousBackgroundSetIndex",null),e(this,"backgroundTransitionProgress",1),e(this,"backgroundTransitionDurationSec",.9),e(this,"currentMainStage",1),e(this,"stageAnnouncementMainStage",1),e(this,"stageAnnouncementTimerSec",0),e(this,"stageAnnouncementDurationSec",1.2),e(this,"mapTheme"),e(this,"visualProfile"),e(this,"backgroundProfile"),e(this,"audio"),e(this,"parkourSprite"),e(this,"parkourSpriteLoaded",!1),e(this,"deathCause","fall"),e(this,"gameOverStartTime",0),e(this,"cachedTargetAnchor",null),e(this,"keydownHandler"),e(this,"keyupHandler"),e(this,"mousedownHandler"),e(this,"mouseupHandler"),e(this,"touchstartHandler"),e(this,"touchendHandler"),e(this,"blurHandler"),e(this,"renderTextHook"),e(this,"advanceTimeHook"),e(this,"gameLoop",t=>{if(!this.running||"running"!==this.mode)return;const e=(t-this.lastTimestamp)/1e3;this.lastTimestamp=t;const n=Math.max(0,Math.min(.05,e));this.tick(n),this.render(),this.running&&"running"===this.mode&&this.requestNextFrame()}),e(this,"gameOverLoop",t=>{const e=(t-this.gameOverStartTime)/1e3,{freezeDurationSec:n,fadeInDurationSec:i}=c,s=n+i;this.render(),this.animationFrameId=e<s?requestAnimationFrame(this.gameOverLoop):null});const f=i.getContext("2d");if(!f)throw new Error("2D canvas context is required for LastSwingGame.");this.canvas=i,this.ctx=f,this.onScoreUpdate=r,this.onGameOver=a;const p=null==(l=null==o?void 0:o.lastSwing)?void 0:l.mapTheme;this.mapTheme="toy-sky-park"===p?"toy-sky-park":"blue-dusk",this.uiText={...t.DEFAULT_UI_TEXT,...(null==(d=null==o?void 0:o.lastSwing)?void 0:d.uiText)??{}},this.canvas.width=n.width,this.canvas.height=n.height,this.visualProfile=this.getVisualRenderProfile(),this.backgroundProfile=this.getBackgroundRenderProfile(),this.backgroundSets=this.loadBackgroundSets(),this.audio=new u(`${t.assetBasePath}/assets/audio/last-swing/synthwavehouse.ogg`),this.parkourSprite=this.loadParkourSprite(),this.player=this.createPlayer(),this.resetWorld(),this.setupInput(),this.render()}start(){this.resetWorld(),this.mode="running",this.running=!0,this.lastTimestamp=performance.now(),this.audio.warmUp(),this.audio.startBgm(),this.onScoreUpdate(this.score),this.render(),this.requestNextFrame()}pause(){this.running=!1,this.audio.stopBgm(),null!==this.animationFrameId&&(cancelAnimationFrame(this.animationFrameId),this.animationFrameId=null)}resume(){"running"!==this.mode||this.running||(this.running=!0,this.lastTimestamp=performance.now(),this.audio.warmUp(),this.audio.startBgm(),this.requestNextFrame())}stop(){this.pause(),this.mode="ready",this.audio.dispose(),this.detachInput(),this.detachSkillHooks()}toggleAudioMute(){return this.audio.toggleMute()}setAudioMuted(t){this.audio.setMuted(t)}isAudioMuted(){return this.audio.isMuted()}getState(){const t=this.getCameraX(),e=this.anchors.filter(t=>Math.abs(t.x-this.player.x)<=700).slice(0,6).map(t=>({id:t.id,x:Number(t.x.toFixed(2)),y:Number(t.y.toFixed(2))})),n=this.spikes.filter(t=>Math.abs(t.x-this.player.x)<=700).slice(0,6).map(t=>({id:t.id,x:Number(t.x.toFixed(2)),y:Number(t.y.toFixed(2))})),s=this.bouncePads.filter(t=>Math.abs(t.x-this.player.x)<=700).slice(0,6).map(t=>({id:t.id,x:Number(t.x.toFixed(2)),y:Number(t.y.toFixed(2))}));return{mode:this.mode,score:this.score,distanceMeters:this.score,bestMeters:this.bestMeters,elapsedSec:Number(this.elapsedSec.toFixed(2)),runSpeed:Number(this.runSpeed.toFixed(2)),player:{x:Number(this.player.x.toFixed(2)),y:Number(this.player.y.toFixed(2)),vx:Number(this.player.vx.toFixed(2)),vy:Number(this.player.vy.toFixed(2)),grounded:this.player.grounded,isGrappled:this.player.isGrappled},grapple:{anchorId:this.grapple.anchorId,ropeLength:Number(this.grapple.ropeLength.toFixed(2))},world:{cameraX:Number(t.toFixed(2)),groundY:i.groundY},mission:{active:this.missionActive,stage:this.missionStage,warmupLeftSec:Number(this.missionWarmupLeftSec.toFixed(2)),timeLeftSec:Number(this.missionTimeLeftSec.toFixed(2)),targetMeters:this.missionTargetMeters,peakMeters:this.runPeakMeters},nearby:{anchors:e,spikes:n,bouncePads:s}}}triggerJump(t,e){"release"!==e?this.handleActionPress():this.handleActionRelease()}advanceTime(t){if(!this.running||"running"!==this.mode)return;const e=Math.max(0,t),n=Math.max(1,Math.round(e/(1e3/60))),i=e/1e3/n;for(let s=0;s<n&&(this.tick(i),this.running&&"running"===this.mode);s+=1);this.lastTimestamp=performance.now(),this.render()}createPlayer(){return{x:s.startX,y:s.startY,vx:s.runSpeedStart,vy:0,width:s.width,height:s.height,grounded:!1,isGrappled:!1}}resetWorld(){this.elapsedSec=0,this.runSpeed=s.runSpeedStart,this.score=0,this.runPeakMeters=0,this.inputBufferMsLeft=0,this.coyoteMsLeft=r.coyoteMs,this.isActionHeld=!1,this.activeTouchId=null,this.bounceLockMs=0,this.missionActive=!0,this.missionStage=0,this.missionTargetMeters=this.getMissionTargetForStage(0),this.missionTimeLeftSec=h.intervalSec,this.missionWarmupLeftSec=0,this.currentMainStage=this.getMainStageNumberForMissionStage(this.missionStage),this.backgroundSetIndex=this.getBackgroundSetIndexForMainStage(this.currentMainStage),this.previousBackgroundSetIndex=null,this.backgroundTransitionProgress=1,this.stageAnnouncementMainStage=this.currentMainStage,this.stageAnnouncementTimerSec=0,this.player=this.createPlayer(),this.grapple={anchorId:null,ropeLength:0},this.anchors=[],this.spikes=[],this.bouncePads=[],this.startX=this.player.x,this.nextSegmentStartX=this.player.x+260,this.addAnchor(this.player.x+190,i.groundY-300),this.addAnchor(this.player.x+300,i.groundY-340),this.addBouncePad(this.player.x+185,i.groundY+12);const t=this.anchors[0];t&&(this.player.isGrappled=!0,this.grapple.anchorId=t.id,this.grapple.ropeLength=this.computeAttachRopeLength(t)),this.ensureWorldGenerated()}requestNextFrame(){this.animationFrameId=requestAnimationFrame(this.gameLoop)}tick(t){this.elapsedSec+=t,this.updateDifficulty(),this.ensureWorldGenerated(),this.isActionHeld&&!this.player.isGrappled&&this.tryAttachGrapple()&&(this.inputBufferMsLeft=0),!this.player.isGrappled&&this.inputBufferMsLeft>0&&(this.tryAttachGrapple()?this.inputBufferMsLeft=0:this.inputBufferMsLeft=Math.max(0,this.inputBufferMsLeft-1e3*t)),this.bounceLockMs=Math.max(0,this.bounceLockMs-1e3*t);const e=this.player.x,n=this.player.y;if(this.updatePlayerPhysics(t),this.updateAirState(t),this.resolveGrappleConstraint(),this.resolveBouncePads(e,n),this.cullWorld(),this.checkSpikeCollision())return void this.endRun("spike");const s=Math.max(i.killY,this.canvas.height+190)+(this.player.isGrappled?110:0);this.player.y-this.player.height/2>s?this.endRun("fall"):(this.updateDistanceScore(),this.updateDistanceMission(t),this.updateBackgroundSetTransition(t),this.cachedTargetAnchor=this.player.isGrappled?null:this.findAttachableAnchor())}updateDifficulty(){const t=s.runSpeedStart,e=this.elapsedSec*s.runSpeedRampPerSec,n=this.elapsedSec>55?65:this.elapsedSec>25?24:0;this.runSpeed=Math.min(s.runSpeedMax,t+e+n)}updatePlayerPhysics(t){this.player.vy+=s.gravity*t,this.player.x+=this.player.vx*t,this.player.y+=this.player.vy*t}updateAirState(t){this.player.grounded=!1,this.coyoteMsLeft=Math.max(0,this.coyoteMsLeft-1e3*t)}resolveGrappleConstraint(){if(!this.player.isGrappled||null===this.grapple.anchorId)return;const t=this.getAnchorById(this.grapple.anchorId);if(!t)return void this.detachGrapple(!1);const e=this.player.x-t.x,n=this.player.y-t.y,i=Math.hypot(e,n);if(i<.001)return;const s=e/i,r=n/i;i>this.grapple.ropeLength&&(this.player.x=t.x+s*this.grapple.ropeLength,this.player.y=t.y+r*this.grapple.ropeLength);const a=this.player.vx*s+this.player.vy*r;a>0&&(this.player.vx-=a*s,this.player.vy-=a*r)}resolveBouncePads(t,e){if(this.bounceLockMs>0||this.player.vy<=0)return;const n=this.player.x,i=e+this.player.height/2,s=this.player.y+this.player.height/2,r=Math.max(6,.34*this.player.width);for(const o of this.bouncePads){const e=o.radius+r+4,h=Math.min(t,n)-e-14,c=Math.max(t,n)+e+14;if(o.x<h||o.x>c)continue;const l=n-o.x,u=s-o.y,d=l*l+u*u<=e*e,f=this.segmentCircleIntersects(t,i,n,s,o.x,o.y,e);if(!d&&!f)continue;if(i<=o.y+.62*e){this.player.isGrappled&&this.detachGrapple(!1),this.player.y=o.y-o.radius-this.player.height/2+2,this.player.vy=-Math.max(o.bounceStrength,1.08*Math.abs(this.player.vy)),this.player.vx=Math.max(this.player.vx,.9*this.runSpeed),this.bounceLockMs=a.lockMs,this.player.grounded=!1,this.audio.playBouncePad();break}}}segmentCircleIntersects(t,e,n,i,s,r,a){const o=n-t,h=i-e,c=o*o+h*h;if(c<1e-4){const n=t-s,i=e-r;return n*n+i*i<=a*a}let l=((s-t)*o+(r-e)*h)/c;l=Math.max(0,Math.min(1,l));const u=t+o*l-s,d=e+h*l-r;return u*u+d*d<=a*a}checkSpikeCollision(){const t=this.player.x-this.player.width/2,e=this.player.x+this.player.width/2,n=this.player.y-this.player.height/2,i=this.player.y+this.player.height/2;return this.spikes.some(s=>{const r=s.x-s.width/2,a=s.x+s.width/2,o=s.y-s.height,h=s.y;return t<a&&e>r&&n<h&&i>o})}updateDistanceScore(){const t=Math.max(0,this.player.x-this.startX),e=Math.floor(t/i.pxPerMeter);this.runPeakMeters=Math.max(this.runPeakMeters,e),e!==this.score&&(this.score=e,this.bestMeters=Math.max(this.bestMeters,e),this.onScoreUpdate(e))}updateDistanceMission(t){"running"===this.mode&&this.running&&(this.missionActive||(this.missionActive=!0,this.missionTargetMeters=this.getMissionTargetForStage(this.missionStage),this.missionTimeLeftSec=this.getMissionIntervalSec()),this.runPeakMeters>=this.missionTargetMeters?this.advanceMissionStage():(this.missionTimeLeftSec=Math.max(0,this.missionTimeLeftSec-t),this.missionTimeLeftSec<=0&&this.endRun("timeout")))}getMissionTargetForStage(t){if(t<=0)return h.baseMeters;const e=h.baseMeters,n=t*h.stepMeters+h.stepGrowthPerStage*t*(t-1)/2;return Math.floor(e+n)}getMissionIntervalSec(){return h.intervalSec}advanceMissionStage(){let t=1;for(this.missionStage+=1,this.missionTargetMeters=this.getMissionTargetForStage(this.missionStage);this.runPeakMeters>=this.missionTargetMeters;)this.missionStage+=1,t+=1,this.missionTargetMeters=this.getMissionTargetForStage(this.missionStage);this.missionTimeLeftSec=this.getMissionIntervalSec(),this.audio.playStageAdvance(t)}endRun(t="fall"){"game-over"!==this.mode&&(this.mode="game-over",this.running=!1,this.deathCause=t,this.isActionHeld=!1,this.activeTouchId=null,this.inputBufferMsLeft=0,this.player.isGrappled=!1,this.grapple={anchorId:null,ropeLength:0},null!==this.animationFrameId&&(cancelAnimationFrame(this.animationFrameId),this.animationFrameId=null),this.audio.stopBgm(),this.audio.playGameOver(t),this.gameOverStartTime=performance.now(),this.onGameOver(this.score),this.animationFrameId=requestAnimationFrame(this.gameOverLoop))}ensureWorldGenerated(){const t=this.player.x+o.lookAhead;for(;this.nextSegmentStartX<t;)this.generateSegment()}generateSegment(){const t=this.getDifficultyPhase(),e=this.getSegmentParams(t),n=this.random(e.minWidth,e.maxWidth),s=this.random(e.minGap,e.maxGap),r=this.nextSegmentStartX+n,a=r+s*this.random(.44,.58),o=i.groundY-this.random(e.anchorMinHeight,e.anchorMaxHeight),h=Math.max(150,e.anchorMinHeight-15),c=Math.max(h+12,e.anchorMaxHeight+18);this.addAnchor(r+s*this.random(.24,.38),i.groundY-this.random(h,c)),this.addAnchor(a,o);const l="casual"===t?.8:"ramp"===t?.6:.45;Math.random()<l&&this.addBouncePad(r+s*this.random(.35,.75),i.groundY+this.random(-10,34));Math.random()<.65&&this.addAnchor(r+s*this.random(.72,.93),i.groundY-this.random(e.anchorMinHeight+18,e.anchorMaxHeight+40)),"hardcore"===t&&Math.random()<.65&&this.addAnchor(r+s*this.random(.56,.81),i.groundY-this.random(240,340)),this.nextSegmentStartX=r+s}getDifficultyPhase(){return this.elapsedSec<20?"casual":this.elapsedSec<50?"ramp":"hardcore"}getSegmentParams(t){return"casual"===t?{minWidth:200,maxWidth:290,minGap:155,maxGap:230,anchorMinHeight:235,anchorMaxHeight:335,spikeChance:0}:"ramp"===t?{minWidth:160,maxWidth:250,minGap:210,maxGap:300,anchorMinHeight:280,anchorMaxHeight:390,spikeChance:0}:{minWidth:120,maxWidth:210,minGap:250,maxGap:360,anchorMinHeight:330,anchorMaxHeight:460,spikeChance:0}}addAnchor(t,e){this.anchors.push({id:this.nextId,x:t,y:e,radius:10}),this.nextId+=1}addBouncePad(t,e){this.bouncePads.push({id:this.nextId,x:t,y:e,radius:a.radius,bounceStrength:a.baseBounce}),this.nextId+=1}cullWorld(){const t=this.player.x-o.keepBehind;this.anchors=this.anchors.filter(e=>e.x>=t-120),this.bouncePads=this.bouncePads.filter(e=>e.x>=t-120),this.spikes=this.spikes.filter(e=>e.x>=t-80)}handleActionPress(){"running"===this.mode&&this.running&&(this.audio.warmUp(),this.isActionHeld||(this.isActionHeld=!0,this.player.isGrappled||this.tryAttachGrapple()||(this.inputBufferMsLeft=r.inputBufferMs)))}handleActionRelease(){this.isActionHeld&&(this.isActionHeld=!1,this.inputBufferMsLeft=0,"running"===this.mode&&this.running&&this.player.isGrappled&&this.detachGrapple(!0))}tryAttachGrapple(){if(this.player.isGrappled)return!0;const t=this.findAttachableAnchor();if(!t)return!1;const e=this.computeAttachRopeLength(t);return this.player.isGrappled=!0,this.player.grounded=!1,this.grapple.anchorId=t.id,this.grapple.ropeLength=e,this.player.vy>0&&(this.player.vy*=.74),this.audio.playGrappleAttach(),!0}findAttachableAnchor(){let t=null,e=Number.POSITIVE_INFINITY;for(const n of this.anchors){const i=n.x-this.player.x,s=n.y-this.player.y;if(i<-24)continue;if(i>r.maxRangeX)continue;if(Math.abs(s)>r.maxYOffset)continue;if(s>r.maxAnchorDrop)continue;const a=(i*i+s*s)*(s<0?.7:1.35)+i*i*.12;a<e&&(t=n,e=a)}return t}computeAttachRopeLength(t){const e=this.player.x-t.x,n=this.player.y-t.y,i=Math.hypot(e,n);return Math.max(r.minRopeLength,i)}detachGrapple(t){if(!this.player.isGrappled)return;const e=null!==this.grapple.anchorId?this.getAnchorById(this.grapple.anchorId):null;if(this.player.isGrappled=!1,this.grapple.anchorId=null,this.grapple.ropeLength=0,this.coyoteMsLeft=r.coyoteMs,!t||!e)return;const n=this.player.x-e.x,i=this.player.y-e.y,s=Math.hypot(n,i);if(s<.001)return;const a=n/s,o=i/s,h={x:-o,y:a},c={x:o,y:-a},l=this.player.vx*h.x+this.player.vy*h.y>=this.player.vx*c.x+this.player.vy*c.y?h:c;this.player.vx+=l.x*r.releaseBoost,this.player.vy+=l.y*r.releaseBoost*r.releaseVerticalScale,this.player.vy-=r.releaseLift,this.audio.playGrappleRelease()}getAnchorById(t){return this.anchors.find(e=>e.id===t)??null}getCameraX(){return this.player.x-i.cameraLeadX}loadBackgroundSets(){const e=t.assetBasePath,n=`${e}/assets/images/last-swing/${this.mapTheme}`,i=`${e}/assets/images/last-swing/blue-dusk`;return["a","b","c","d","e"].map(t=>({far:this.createLayerImage(`${n}/bg_far_${t}.webp`,[`${i}/bg_far_${t}.webp`]),mid:this.createLayerImage(`${n}/bg_mid_${t}.webp`,[`${i}/bg_mid_${t}.webp`]),fx:this.createLayerImage(`${n}/bg_fx_${t}.webp`,[`${i}/bg_fx_${t}.webp`])}))}createLayerImage(t,e){const n=new Image,i=[t,...e].filter((t,e,n)=>n.indexOf(t)===e);let s=0;return n.onload=()=>{this.running||this.render()},n.onerror=()=>{s+=1,s<i.length&&(n.src=i[s])},n.src=i[0],n}getMainStageNumberForMissionStage(t){const e=Math.floor(Math.max(0,t)/3)+1;return Math.min(this.backgroundSets.length,e)}getSubStageNumberForMissionStage(t){return t>=Math.max(0,3*this.backgroundSets.length-1)?3:Math.max(0,t)%3+1}getBackgroundSetIndexForMainStage(t){return Math.max(0,Math.min(this.backgroundSets.length-1,t-1))}updateBackgroundSetTransition(t){const e=this.getMainStageNumberForMissionStage(this.missionStage);e!==this.currentMainStage&&(this.currentMainStage=e,this.stageAnnouncementMainStage=e,this.stageAnnouncementTimerSec=this.stageAnnouncementDurationSec);const n=this.getBackgroundSetIndexForMainStage(this.currentMainStage);n!==this.backgroundSetIndex&&(this.previousBackgroundSetIndex=this.backgroundSetIndex,this.backgroundSetIndex=n,this.backgroundTransitionProgress=0),this.backgroundTransitionProgress<1&&(this.backgroundTransitionProgress=Math.min(1,this.backgroundTransitionProgress+t/this.backgroundTransitionDurationSec),this.backgroundTransitionProgress>=1&&(this.previousBackgroundSetIndex=null)),this.stageAnnouncementTimerSec=Math.max(0,this.stageAnnouncementTimerSec-t)}isImageReady(t){return!!t&&(t.complete&&t.naturalWidth>0&&t.naturalHeight>0)}drawTiledLayer(t,e,n,i){if(!t.complete||t.naturalWidth<=0||t.naturalHeight<=0)return;const{ctx:s}=this,r=this.canvas.height,a=r*(t.naturalWidth/t.naturalHeight);if(a<=1)return;const o=-e*n%a-a,h=this.canvas.width+a;s.save(),s.globalAlpha=i;for(let c=o;c<=h;c+=a)s.drawImage(t,c,0,a,r);s.restore()}drawBackgroundLayerSet(t,e,n,i){const s=this.isImageReady(t.far),r=this.isImageReady(t.mid),a=this.isImageReady(t.fx);return s&&this.drawTiledLayer(t.far,e,i.farParallax,n),r&&this.drawTiledLayer(t.mid,e,i.midParallax,i.midAlpha*n),a&&this.drawTiledLayer(t.fx,e,i.fxParallax,i.fxAlpha*n),{farDrawn:s,midDrawn:r}}getBackgroundRenderProfile(){return"toy-sky-park"===this.mapTheme?{farParallax:.075,midParallax:.155,fxParallax:.275,midAlpha:.62,fxAlpha:.36,midFadeStartRatio:.78,midFadeEndAlpha:.82,gridAlphaWithFar:.1,gridAlphaFallback:.14}:{farParallax:.08,midParallax:.18,fxParallax:.32,midAlpha:.68,fxAlpha:.5,midFadeStartRatio:.74,midFadeEndAlpha:.92,gridAlphaWithFar:.14,gridAlphaFallback:.18}}easeInOut(t){const e=Math.max(0,Math.min(1,t));return e*e*(3-2*e)}getVisualRenderProfile(){return"toy-sky-park"===this.mapTheme?{anchorActiveStroke:"rgba(193, 221, 238, 0.96)",anchorTargetStroke:"rgba(156, 198, 224, 0.88)",anchorIdleStroke:"rgba(96, 147, 178, 0.72)",anchorActiveFill:"#cee4f0",anchorTargetFill:"#9cc4dd",anchorIdleFill:"#6d97b4",anchorCrossStroke:"rgba(218, 236, 247, 0.9)",bounceAuraFill:"rgba(117, 181, 224, 0.28)",bounceOuterStroke:"#9dd8ff",bounceInnerStroke:"rgba(236, 248, 255, 0.96)",ropePrimary:"#d9edf8",ropeOutline:"rgba(8, 16, 32, 0.88)",hudScore:"#dff0f8",hudPanelFill:"rgba(7, 14, 28, 0.58)",hudPanelStroke:"rgba(150, 197, 225, 0.33)",hudStageLabel:"#beddf1",hudRemainLabel:"#a7cee7",hudRemainValue:"#e8f5fb",hudTargetText:"#98b5c8",hudTimeLabel:"#b8d9ec",hudTimeNormal:"#a3cce5",hudBarTrack:"rgba(148, 163, 184, 0.26)",hudBarFill:"#8db8d4",hudBarStroke:"rgba(206, 230, 245, 0.62)",stagePanelFill:"rgba(9, 17, 32, 0.5)",stagePanelStroke:"rgba(152, 198, 224, 0.5)",stageText:"#e9f6fc"}:{anchorActiveStroke:"rgba(191, 219, 254, 0.95)",anchorTargetStroke:"rgba(125, 211, 252, 0.85)",anchorIdleStroke:"rgba(56, 189, 248, 0.45)",anchorActiveFill:"#bae6fd",anchorTargetFill:"#67e8f9",anchorIdleFill:"#38bdf8",anchorCrossStroke:"rgba(186, 230, 253, 0.85)",bounceAuraFill:"rgba(34, 211, 238, 0.16)",bounceOuterStroke:"#67e8f9",bounceInnerStroke:"rgba(186, 230, 253, 0.9)",ropePrimary:"#e2e8f0",ropeOutline:"rgba(15, 23, 42, 0.7)",hudScore:"#e2e8f0",hudPanelFill:"rgba(2, 6, 23, 0.5)",hudPanelStroke:"rgba(125, 211, 252, 0.22)",hudStageLabel:"#bfdbfe",hudRemainLabel:"#7dd3fc",hudRemainValue:"#f8fafc",hudTargetText:"#94a3b8",hudTimeLabel:"#93c5fd",hudTimeNormal:"#7dd3fc",hudBarTrack:"rgba(148, 163, 184, 0.24)",hudBarFill:"#38bdf8",hudBarStroke:"rgba(186, 230, 253, 0.55)",stagePanelFill:"rgba(7, 16, 32, 0.45)",stagePanelStroke:"rgba(125, 211, 252, 0.42)",stageText:"rgba(224, 242, 254, 1)"}}loadParkourSprite(){const e=new Image;return e.onload=()=>{this.parkourSpriteLoaded=!0,this.running||this.render()},e.onerror=()=>{this.parkourSpriteLoaded=!1,this.running||this.render()},e.src=`${t.assetBasePath}/assets/images/stickman-sprite.webp`,e}getParkourFrameIndex(){return"ready"===this.mode?0:this.player.isGrappled?5:"game-over"===this.mode||this.player.vy>460?6+Math.floor(11*this.elapsedSec)%3:Math.floor(13*this.elapsedSec)%5}render(){const{ctx:t}=this,e=this.canvas.width,n=this.canvas.height,i=this.getCameraX();if(t.fillStyle="#0f172a",t.fillRect(0,0,e,n),this.renderParallax(i),this.renderBouncePads(i),this.renderSpikes(i),this.renderAnchors(i),this.renderRope(i),this.renderPlayer(i),this.renderHud(),this.renderStageAnnouncement(),"game-over"===this.mode){const t=(performance.now()-this.gameOverStartTime)/1e3,{freezeDurationSec:e,fadeInDurationSec:n}=c;let i=0;t>e&&(i=Math.min(1,(t-e)/n)),this.renderGameOverOverlay(i)}}renderParallax(t){const{ctx:e}=this,n=this.backgroundProfile,i=this.backgroundSets[this.backgroundSetIndex]??this.backgroundSets[0],s=null!==this.previousBackgroundSetIndex?this.backgroundSets[this.previousBackgroundSetIndex]??null:null;let r=!1,a=!1;const o=null===this.previousBackgroundSetIndex?1:this.easeInOut(this.backgroundTransitionProgress);if(s&&this.backgroundTransitionProgress<1){const e=1-o,i=this.drawBackgroundLayerSet(s,t,e,n);r=r||i.farDrawn,a=a||i.midDrawn}if(i){const e=o,s=this.drawBackgroundLayerSet(i,t,e,n);r=r||s.farDrawn,a=a||s.midDrawn}if(a){const t=Math.floor(this.canvas.height*n.midFadeStartRatio),i=e.createLinearGradient(0,t,0,this.canvas.height);i.addColorStop(0,"rgba(15, 23, 42, 0)"),i.addColorStop(1,`rgba(15, 23, 42, ${n.midFadeEndAlpha})`),e.fillStyle=i,e.fillRect(0,t,this.canvas.width,this.canvas.height-t)}const h=-.3*t%140,c=r?n.gridAlphaWithFar:n.gridAlphaFallback;e.strokeStyle=`rgba(148, 163, 184, ${c})`,e.lineWidth=1;for(let l=h;l<=this.canvas.width+140;l+=140)e.beginPath(),e.moveTo(l,0),e.lineTo(l,this.canvas.height),e.stroke()}renderBouncePads(t){const{ctx:e}=this,n=this.visualProfile,i="toy-sky-park"===this.mapTheme;for(const s of this.bouncePads){const r=s.x-t;r<-40||r>this.canvas.width+40||(e.fillStyle=n.bounceAuraFill,e.beginPath(),e.ellipse(r,s.y+1,s.radius+(i?12:8),i?8.5:7,0,0,2*Math.PI),e.fill(),e.strokeStyle=n.bounceOuterStroke,e.lineWidth=i?3.4:2.4,e.beginPath(),e.arc(r,s.y,s.radius,0,2*Math.PI),e.stroke(),e.strokeStyle=n.bounceInnerStroke,e.lineWidth=i?2.2:1.6,e.beginPath(),e.arc(r,s.y,.58*s.radius,.12*Math.PI,.88*Math.PI),e.stroke(),i&&(e.fillStyle="rgba(233, 246, 255, 0.9)",e.beginPath(),e.arc(r,s.y,.3*s.radius,0,2*Math.PI),e.fill(),e.strokeStyle="rgba(10, 24, 40, 0.58)",e.lineWidth=1.1,e.beginPath(),e.arc(r,s.y,.3*s.radius,0,2*Math.PI),e.stroke()))}}renderAnchors(t){var e;const{ctx:n}=this,i=this.visualProfile,s=(null==(e=this.cachedTargetAnchor)?void 0:e.id)??null,r=this.grapple.anchorId,a=.85+.15*Math.sin(10*this.elapsedSec);for(const o of this.anchors){const e=o.x-t;if(e<-40||e>this.canvas.width+40)continue;const h=s===o.id,c=r===o.id,l=o.radius+(c?8:h?7*a:4);n.strokeStyle=c?i.anchorActiveStroke:h?i.anchorTargetStroke:i.anchorIdleStroke,n.lineWidth=c?3.6:h?3.2:2.6,n.beginPath(),n.arc(e,o.y,l,0,2*Math.PI),n.stroke(),n.fillStyle=c?i.anchorActiveFill:h?i.anchorTargetFill:i.anchorIdleFill,n.beginPath(),n.arc(e,o.y,o.radius,0,2*Math.PI),n.fill(),h&&!c&&(n.strokeStyle=i.anchorCrossStroke,n.lineWidth=1.5,n.beginPath(),n.moveTo(e-5,o.y),n.lineTo(e+5,o.y),n.moveTo(e,o.y-5),n.lineTo(e,o.y+5),n.stroke())}}renderSpikes(t){const{ctx:e}=this;e.fillStyle="#f43f5e";for(const n of this.spikes){const i=n.x-t;if(i<-60||i>this.canvas.width+60)continue;const s=i-n.width/2,r=i+n.width/2,a=n.y,o=n.y-n.height;e.beginPath(),e.moveTo(s,a),e.lineTo(i,o),e.lineTo(r,a),e.closePath(),e.fill()}}renderRope(t){if(!this.player.isGrappled||null===this.grapple.anchorId)return;const e=this.getAnchorById(this.grapple.anchorId);if(!e)return;const{ctx:n}=this,i=this.visualProfile,s=this.player.x-t,r=this.player.y-10,a=e.x-t,o=e.y,h=(s+a)/2,c=(r+o)/2,l=Math.hypot(a-s,o-r),u=Math.max(0,this.grapple.ropeLength-l),d=h,f=c+Math.min(.5*u,40);n.strokeStyle=i.ropeOutline,n.lineWidth=4,n.beginPath(),n.moveTo(s,r),n.quadraticCurveTo(d,f,a,o),n.stroke(),n.strokeStyle=i.ropePrimary,n.lineWidth=2,n.beginPath(),n.moveTo(s,r),n.quadraticCurveTo(d,f,a,o),n.stroke()}renderPlayer(e){const{ctx:n}=this,i=this.player.x-e,s=this.player.y+this.player.height/2+2,r=this.parkourSpriteLoaded&&this.parkourSprite.complete&&this.parkourSprite.naturalWidth>0&&this.parkourSprite.naturalHeight>0;n.save(),n.translate(i,s);const a=this.player.isGrappled?this.player.vx/720:this.player.vx/1350,o=Math.max(-.26,Math.min(.26,a));if(n.rotate(o),r){const e=t.SPRITE_FRAME_POSITIONS,i=t.SPRITE_FRAME_WIDTH,s=this.parkourSprite.naturalHeight,r=e[Math.max(0,Math.min(e.length-1,this.getParkourFrameIndex()))],a=.25,o=i*a,h=s*a,c=140,l=this.player.vx<-26?-1:1,u=n.imageSmoothingEnabled;return n.imageSmoothingEnabled=!1,n.scale(l,1),n.drawImage(this.parkourSprite,r,0,i,s,-o/2,-h+c,o,h),n.imageSmoothingEnabled=u,void n.restore()}n.fillStyle="#000000",n.fillRect(-4.8,-34,9.6,24),n.fillRect(-2.6,-10,5.2,13),n.beginPath(),n.arc(0,-42.5,10.2,0,2*Math.PI),n.fillStyle="#ffffff",n.fill(),n.restore()}renderHud(){const{ctx:t}=this,e=this.visualProfile;t.textAlign="left",t.fillStyle=e.hudScore,t.font="700 24px Arial",t.fillText(`${this.uiText.scoreLabel}: ${this.score}`,20,34);const n=this.missionStage,i=this.missionTargetMeters,s=n<=0?0:this.getMissionTargetForStage(n-1),r=Math.max(1,i-s),a=this.score,o=Math.max(0,Math.min(1,(a-s)/r)),h=Math.max(0,i-a),c=this.missionTimeLeftSec,u=c<=5?"#f87171":c<=10?"#fb923c":e.hudTimeNormal,d=380,f=(this.canvas.width-d)/2,p=14;t.fillStyle=e.hudPanelFill,t.fillRect(f,p,d,112),t.strokeStyle=e.hudPanelStroke,t.lineWidth=1,t.strokeRect(f+.5,14.5,379,111);const m=this.getMainStageNumberForMissionStage(this.missionStage),g=this.getSubStageNumberForMissionStage(this.missionStage);t.textAlign="center",t.fillStyle=e.hudStageLabel,t.font="700 12px Arial",t.fillText(`${this.uiText.stageLabel} ${m}-${g}`,f+190,32),t.textAlign="left",t.fillStyle=e.hudRemainLabel,t.font="700 12px Arial",t.fillText(this.uiText.remainLabel,f+18,52),t.fillStyle=e.hudRemainValue,t.font="800 30px Arial",t.fillText(`${h}m`,f+18,84),t.fillStyle=e.hudTargetText,t.font="600 11px Arial",t.fillText(`${this.uiText.targetLabel} ${i}m`,f+18,100),t.fillStyle=e.hudTimeLabel,t.font="700 12px Arial",t.fillText(this.uiText.timeLabel,f+d-130,52),t.fillStyle=u,t.font="800 30px Arial",t.fillText(`${c.toFixed(1)}s`,f+d-130,84);const y=f+18,v=108,w=344;t.fillStyle=e.hudBarTrack,t.fillRect(y,v,w,9),t.fillStyle=e.hudBarFill,t.fillRect(y,v,w*o,9),t.strokeStyle=e.hudBarStroke,t.lineWidth=1,t.strokeRect(y+.5,108.5,343,8);const b=y+w*o;if(this.renderHudRunnerSprite(b,118),t.textAlign="left","running"===this.mode&&this.elapsedSec<l.durationSec){const e=l.durationSec-l.fadeOutSec,n=this.elapsedSec>e?1-(this.elapsedSec-e)/l.fadeOutSec:1,i=this.uiText.controlHint;t.font="700 14px Arial";const s=16,r=8,a=t.measureText(i).width+2*s,o=14+2*r,h=(this.canvas.width-a)/2,c=this.canvas.height-o-28;t.fillStyle=`rgba(2, 6, 23, ${.55*n})`,t.fillRect(h,c,a,o),t.fillStyle=`rgba(248, 250, 252, ${n})`,t.textAlign="center",t.fillText(i,this.canvas.width/2,c+o/2+5),t.textAlign="left"}}renderStageAnnouncement(){if("running"!==this.mode||this.stageAnnouncementTimerSec<=0)return;const{ctx:t}=this,e=this.stageAnnouncementDurationSec-this.stageAnnouncementTimerSec,n=Math.min(1,e/.2),i=Math.min(1,this.stageAnnouncementTimerSec/.35),s=Math.min(n,i),r=1+.05*(1-s),a=this.visualProfile;t.save(),t.translate(this.canvas.width/2,Math.floor(.33*this.canvas.height)),t.scale(r,r),t.textAlign="center",t.fillStyle=this.withRuntimeAlpha(a.stagePanelFill,s),t.fillRect(-116,-34,232,56),t.strokeStyle=this.withRuntimeAlpha(a.stagePanelStroke,s),t.lineWidth=1,t.strokeRect(-115.5,-33.5,231,55),t.fillStyle=this.withRuntimeAlpha(a.stageText,s),t.font="800 34px Arial",t.fillText(`${this.uiText.stageLabel} ${this.stageAnnouncementMainStage}`,0,8),t.restore()}withRuntimeAlpha(t,e){const n=Math.max(0,Math.min(1,e)),i=t.match(/^rgba\(\s*(\d{1,3})\s*,\s*(\d{1,3})\s*,\s*(\d{1,3})\s*,\s*([0-9]*\.?[0-9]+)\s*\)$/);if(i){const[,t,e,s,r]=i;return`rgba(${t}, ${e}, ${s}, ${Math.max(0,Math.min(1,Number(r)*n))})`}const s=t.match(/^#([0-9a-f]{6})$/i);if(s){const t=s[1];return`rgba(${Number.parseInt(t.slice(0,2),16)}, ${Number.parseInt(t.slice(2,4),16)}, ${Number.parseInt(t.slice(4,6),16)}, ${n})`}return t}interpolateTemplate(t,e){return t.replace(/\{\{\s*(\w+)\s*\}\}/g,(t,n)=>{const i=e[n];return void 0===i?"":String(i)})}renderHudRunnerSprite(e,n){const{ctx:i}=this;if(this.parkourSpriteLoaded&&this.parkourSprite.complete&&this.parkourSprite.naturalWidth>0&&this.parkourSprite.naturalHeight>0){const s=t.SPRITE_FRAME_POSITIONS,r=t.SPRITE_FRAME_WIDTH,a=this.parkourSprite.naturalHeight,o=s[this.player.isGrappled?5:2],h=.11,c=r*h,l=a*h,u=h/.25*140,d=this.player.vx<-20?-1:1,f=i.imageSmoothingEnabled;return i.save(),i.translate(e,n),i.scale(d,1),i.imageSmoothingEnabled=!1,i.drawImage(this.parkourSprite,o,0,r,a,-c/2,-l+u,c,l),i.imageSmoothingEnabled=f,void i.restore()}i.fillStyle="#f8fafc",i.beginPath(),i.arc(e,n-12,4,0,2*Math.PI),i.fill(),i.fillRect(e-1.8,n-10,3.6,10)}renderGameOverOverlay(t=1){if(t<=0)return;const{ctx:e}=this;e.fillStyle=`rgba(2, 6, 23, ${.62*t})`,e.fillRect(0,0,this.canvas.width,this.canvas.height);const n="timeout"===this.deathCause?this.uiText.gameOverTitleTimeout:"spike"===this.deathCause?this.uiText.gameOverTitleSpike:this.uiText.gameOverTitle;e.textAlign="center",e.fillStyle=`rgba(248, 250, 252, ${t})`,e.font="800 56px Arial",e.fillText(n,this.canvas.width/2,this.canvas.height/2-10),e.fillStyle=`rgba(203, 213, 225, ${t})`,e.font="500 24px Arial",e.fillText(this.interpolateTemplate(this.uiText.gameOverEscapedTemplate,{meters:this.score}),this.canvas.width/2,this.canvas.height/2+28),e.fillText(this.uiText.gameOverRestartHint,this.canvas.width/2,this.canvas.height/2+60),e.textAlign="left"}setupInput(){this.keydownHandler=t=>{"Space"===t.code&&(t.repeat||(t.preventDefault(),this.handleActionPress()))},this.keyupHandler=t=>{"Space"===t.code&&(t.preventDefault(),this.handleActionRelease())},this.mousedownHandler=t=>{0===t.button&&(t.preventDefault(),this.handleActionPress())},this.mouseupHandler=t=>{0===t.button&&(t.preventDefault(),this.handleActionRelease())},this.touchstartHandler=t=>{var e;null===this.activeTouchId&&(t.preventDefault(),this.activeTouchId=(null==(e=t.changedTouches[0])?void 0:e.identifier)??null,this.handleActionPress())},this.touchendHandler=t=>{if(null!==this.activeTouchId)for(let e=0;e<t.changedTouches.length;e+=1)if(t.changedTouches[e].identifier===this.activeTouchId){t.preventDefault(),this.activeTouchId=null,this.handleActionRelease();break}},this.blurHandler=()=>{this.activeTouchId=null,this.handleActionRelease()},window.addEventListener("keydown",this.keydownHandler),window.addEventListener("keyup",this.keyupHandler),window.addEventListener("blur",this.blurHandler),window.addEventListener("mouseup",this.mouseupHandler),this.canvas.addEventListener("mousedown",this.mousedownHandler),this.canvas.addEventListener("touchstart",this.touchstartHandler,{passive:!1}),window.addEventListener("touchend",this.touchendHandler,{passive:!1}),window.addEventListener("touchcancel",this.touchendHandler,{passive:!1})}detachInput(){window.removeEventListener("keydown",this.keydownHandler),window.removeEventListener("keyup",this.keyupHandler),window.removeEventListener("blur",this.blurHandler),window.removeEventListener("mouseup",this.mouseupHandler),this.canvas.removeEventListener("mousedown",this.mousedownHandler),this.canvas.removeEventListener("touchstart",this.touchstartHandler),window.removeEventListener("touchend",this.touchendHandler),window.removeEventListener("touchcancel",this.touchendHandler)}setupSkillHooks(){const t=window;this.renderTextHook=()=>this.renderGameToText(),this.advanceTimeHook=t=>this.advanceTime(t),t.render_game_to_text=this.renderTextHook,t.advanceTime=this.advanceTimeHook}detachSkillHooks(){const t=window;t.render_game_to_text===this.renderTextHook&&delete t.render_game_to_text,t.advanceTime===this.advanceTimeHook&&delete t.advanceTime}renderGameToText(){const t=null!==this.grapple.anchorId?this.getAnchorById(this.grapple.anchorId):null,e=this.player.isGrappled?null:this.findAttachableAnchor();return JSON.stringify({game:"last-swing",mode:this.mode,score:this.score,elapsedSec:Number(this.elapsedSec.toFixed(2)),mission:{active:this.missionActive,stage:this.missionStage,warmupLeftSec:Number(this.missionWarmupLeftSec.toFixed(2)),timeLeftSec:Number(this.missionTimeLeftSec.toFixed(2)),targetMeters:this.missionTargetMeters,peakMeters:this.runPeakMeters},coordinateSystem:{origin:"top-left",xAxis:"right",yAxis:"down",unit:"px"},player:{x:Number(this.player.x.toFixed(2)),y:Number(this.player.y.toFixed(2)),vx:Number(this.player.vx.toFixed(2)),vy:Number(this.player.vy.toFixed(2)),grounded:this.player.grounded,grappled:this.player.isGrappled},activeAnchor:t?{id:t.id,x:Number(t.x.toFixed(2)),y:Number(t.y.toFixed(2)),ropeLength:Number(this.grapple.ropeLength.toFixed(2))}:null,targetAnchor:e?{id:e.id,x:Number(e.x.toFixed(2)),y:Number(e.y.toFixed(2))}:null,nearby:{anchors:this.anchors.filter(t=>t.x>=this.player.x-300&&t.x<=this.player.x+500).slice(0,4).map(t=>({id:t.id,x:Number(t.x.toFixed(2)),y:Number(t.y.toFixed(2))})),spikes:this.spikes.filter(t=>t.x>=this.player.x-300&&t.x<=this.player.x+500).slice(0,4).map(t=>({id:t.id,x:Number(t.x.toFixed(2)),y:Number(t.y.toFixed(2))})),bouncePads:this.bouncePads.filter(t=>t.x>=this.player.x-300&&t.x<=this.player.x+500).slice(0,4).map(t=>({id:t.id,x:Number(t.x.toFixed(2)),y:Number(t.y.toFixed(2))}))}})}random(t,e){return t+Math.random()*(e-t)}};e(d,"assetBasePath",""),e(d,"SPRITE_FRAME_POSITIONS",[34,232,451,650,899,1138,1369,1588,1820]),e(d,"SPRITE_FRAME_WIDTH",214),e(d,"DEFAULT_UI_TEXT",{scoreLabel:"SCORE",stageLabel:"STAGE",remainLabel:"REMAIN",targetLabel:"TARGET",timeLabel:"TIME",controlHint:"HOLD to grapple — RELEASE to launch",gameOverTitle:"FALLEN",gameOverTitleTimeout:"TIME OUT",gameOverTitleSpike:"SPIKED",gameOverEscapedTemplate:"{{meters}}m escaped",gameOverRestartHint:"Press Restart to run again"});let f=d;var p={};
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const m=function(t){const e=[];let n=0;for(let i=0;i<t.length;i++){let s=t.charCodeAt(i);s<128?e[n++]=s:s<2048?(e[n++]=s>>6|192,e[n++]=63&s|128):55296==(64512&s)&&i+1<t.length&&56320==(64512&t.charCodeAt(i+1))?(s=65536+((1023&s)<<10)+(1023&t.charCodeAt(++i)),e[n++]=s>>18|240,e[n++]=s>>12&63|128,e[n++]=s>>6&63|128,e[n++]=63&s|128):(e[n++]=s>>12|224,e[n++]=s>>6&63|128,e[n++]=63&s|128)}return e},g={byteToCharMap_:null,charToByteMap_:null,byteToCharMapWebSafe_:null,charToByteMapWebSafe_:null,ENCODED_VALS_BASE:"ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789",get ENCODED_VALS(){return this.ENCODED_VALS_BASE+"+/="},get ENCODED_VALS_WEBSAFE(){return this.ENCODED_VALS_BASE+"-_."},HAS_NATIVE_SUPPORT:"function"==typeof atob,encodeByteArray(t,e){if(!Array.isArray(t))throw Error("encodeByteArray takes an array as a parameter");this.init_();const n=e?this.byteToCharMapWebSafe_:this.byteToCharMap_,i=[];for(let s=0;s<t.length;s+=3){const e=t[s],r=s+1<t.length,a=r?t[s+1]:0,o=s+2<t.length,h=o?t[s+2]:0,c=e>>2,l=(3&e)<<4|a>>4;let u=(15&a)<<2|h>>6,d=63&h;o||(d=64,r||(u=64)),i.push(n[c],n[l],n[u],n[d])}return i.join("")},encodeString(t,e){return this.HAS_NATIVE_SUPPORT&&!e?btoa(t):this.encodeByteArray(m(t),e)},decodeString(t,e){return this.HAS_NATIVE_SUPPORT&&!e?atob(t):function(t){const e=[];let n=0,i=0;for(;n<t.length;){const s=t[n++];if(s<128)e[i++]=String.fromCharCode(s);else if(s>191&&s<224){const r=t[n++];e[i++]=String.fromCharCode((31&s)<<6|63&r)}else if(s>239&&s<365){const r=((7&s)<<18|(63&t[n++])<<12|(63&t[n++])<<6|63&t[n++])-65536;e[i++]=String.fromCharCode(55296+(r>>10)),e[i++]=String.fromCharCode(56320+(1023&r))}else{const r=t[n++],a=t[n++];e[i++]=String.fromCharCode((15&s)<<12|(63&r)<<6|63&a)}}return e.join("")}(this.decodeStringToByteArray(t,e))},decodeStringToByteArray(t,e){this.init_();const n=e?this.charToByteMapWebSafe_:this.charToByteMap_,i=[];for(let s=0;s<t.length;){const e=n[t.charAt(s++)],r=s<t.length?n[t.charAt(s)]:0;++s;const a=s<t.length?n[t.charAt(s)]:64;++s;const o=s<t.length?n[t.charAt(s)]:64;if(++s,null==e||null==r||null==a||null==o)throw new y;const h=e<<2|r>>4;if(i.push(h),64!==a){const t=r<<4&240|a>>2;if(i.push(t),64!==o){const t=a<<6&192|o;i.push(t)}}}return i},init_(){if(!this.byteToCharMap_){this.byteToCharMap_={},this.charToByteMap_={},this.byteToCharMapWebSafe_={},this.charToByteMapWebSafe_={};for(let t=0;t<this.ENCODED_VALS.length;t++)this.byteToCharMap_[t]=this.ENCODED_VALS.charAt(t),this.charToByteMap_[this.byteToCharMap_[t]]=t,this.byteToCharMapWebSafe_[t]=this.ENCODED_VALS_WEBSAFE.charAt(t),this.charToByteMapWebSafe_[this.byteToCharMapWebSafe_[t]]=t,t>=this.ENCODED_VALS_BASE.length&&(this.charToByteMap_[this.ENCODED_VALS_WEBSAFE.charAt(t)]=t,this.charToByteMapWebSafe_[this.ENCODED_VALS.charAt(t)]=t)}}};class y extends Error{constructor(){super(...arguments),this.name="DecodeBase64StringError"}}const v=function(t){return function(t){const e=m(t);return g.encodeByteArray(e,!0)}(t).replace(/\./g,"")};
/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
const w=()=>
/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
function(){if("undefined"!=typeof self)return self;if("undefined"!=typeof window)return window;if("undefined"!=typeof global)return global;throw new Error("Unable to locate global object.")}().__FIREBASE_DEFAULTS__,b=()=>{if("undefined"==typeof document)return;let t;try{t=document.cookie.match(/__FIREBASE_DEFAULTS__=([^;]+)/)}catch(n){return}const e=t&&function(t){try{return g.decodeString(t,!0)}catch(n){}return null}(t[1]);return e&&JSON.parse(e)},T=()=>{try{return w()||(()=>{if("undefined"==typeof process)return;const t=p.__FIREBASE_DEFAULTS__;return t?JSON.parse(t):void 0})()||b()}catch(t){return}},S=t=>{const e=(t=>{var e,n;return null===(n=null===(e=T())||void 0===e?void 0:e.emulatorHosts)||void 0===n?void 0:n[t]})(t);if(!e)return;const n=e.lastIndexOf(":");if(n<=0||n+1===e.length)throw new Error(`Invalid host ${e} with no separate hostname and port!`);const i=parseInt(e.substring(n+1),10);return"["===e[0]?[e.substring(1,n-1),i]:[e.substring(0,n),i]},_=()=>{var t;return null===(t=T())||void 0===t?void 0:t.config};
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
class E{constructor(){this.reject=()=>{},this.resolve=()=>{},this.promise=new Promise((t,e)=>{this.resolve=t,this.reject=e})}wrapCallback(t){return(e,n)=>{e?this.reject(e):this.resolve(n),"function"==typeof t&&(this.promise.catch(()=>{}),1===t.length?t(e):t(e,n))}}}
/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function I(){return!function(){var t;const e=null===(t=T())||void 0===t?void 0:t.forceEnvironment;if("node"===e)return!0;if("browser"===e)return!1;try{return"[object process]"===Object.prototype.toString.call(global.process)}catch(n){return!1}}()&&!!navigator.userAgent&&navigator.userAgent.includes("Safari")&&!navigator.userAgent.includes("Chrome")}class x extends Error{constructor(t,e,n){super(e),this.code=t,this.customData=n,this.name="FirebaseError",Object.setPrototypeOf(this,x.prototype),Error.captureStackTrace&&Error.captureStackTrace(this,A.prototype.create)}}class A{constructor(t,e,n){this.service=t,this.serviceName=e,this.errors=n}create(t,...e){const n=e[0]||{},i=`${this.service}/${t}`,s=this.errors[t],r=s?function(t,e){return t.replace(k,(t,n)=>{const i=e[n];return null!=i?String(i):`<${n}?>`})}(s,n):"Error",a=`${this.serviceName}: ${r} (${i}).`;return new x(i,a,n)}}const k=/\{\$([^}]+)}/g;function C(t,e){if(t===e)return!0;const n=Object.keys(t),i=Object.keys(e);for(const s of n){if(!i.includes(s))return!1;const n=t[s],r=e[s];if(D(n)&&D(r)){if(!C(n,r))return!1}else if(n!==r)return!1}for(const s of i)if(!n.includes(s))return!1;return!0}function D(t){return null!==t&&"object"==typeof t}
/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function M(t){return t&&t._delegate?t._delegate:t}class N{constructor(t,e,n){this.name=t,this.instanceFactory=e,this.type=n,this.multipleInstances=!1,this.serviceProps={},this.instantiationMode="LAZY",this.onInstanceCreated=null}setInstantiationMode(t){return this.instantiationMode=t,this}setMultipleInstances(t){return this.multipleInstances=t,this}setServiceProps(t){return this.serviceProps=t,this}setInstanceCreatedCallback(t){return this.onInstanceCreated=t,this}}
/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const L="[DEFAULT]";
/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class R{constructor(t,e){this.name=t,this.container=e,this.component=null,this.instances=new Map,this.instancesDeferred=new Map,this.instancesOptions=new Map,this.onInitCallbacks=new Map}get(t){const e=this.normalizeInstanceIdentifier(t);if(!this.instancesDeferred.has(e)){const t=new E;if(this.instancesDeferred.set(e,t),this.isInitialized(e)||this.shouldAutoInitialize())try{const n=this.getOrInitializeService({instanceIdentifier:e});n&&t.resolve(n)}catch(n){}}return this.instancesDeferred.get(e).promise}getImmediate(t){var e;const n=this.normalizeInstanceIdentifier(null==t?void 0:t.identifier),i=null!==(e=null==t?void 0:t.optional)&&void 0!==e&&e;if(!this.isInitialized(n)&&!this.shouldAutoInitialize()){if(i)return null;throw Error(`Service ${this.name} is not available`)}try{return this.getOrInitializeService({instanceIdentifier:n})}catch(s){if(i)return null;throw s}}getComponent(){return this.component}setComponent(t){if(t.name!==this.name)throw Error(`Mismatching Component ${t.name} for Provider ${this.name}.`);if(this.component)throw Error(`Component for ${this.name} has already been provided`);if(this.component=t,this.shouldAutoInitialize()){if(function(t){return"EAGER"===t.instantiationMode}
/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */(t))try{this.getOrInitializeService({instanceIdentifier:L})}catch(e){}for(const[t,n]of this.instancesDeferred.entries()){const i=this.normalizeInstanceIdentifier(t);try{const t=this.getOrInitializeService({instanceIdentifier:i});n.resolve(t)}catch(e){}}}}clearInstance(t=L){this.instancesDeferred.delete(t),this.instancesOptions.delete(t),this.instances.delete(t)}async delete(){const t=Array.from(this.instances.values());await Promise.all([...t.filter(t=>"INTERNAL"in t).map(t=>t.INTERNAL.delete()),...t.filter(t=>"_delete"in t).map(t=>t._delete())])}isComponentSet(){return null!=this.component}isInitialized(t=L){return this.instances.has(t)}getOptions(t=L){return this.instancesOptions.get(t)||{}}initialize(t={}){const{options:e={}}=t,n=this.normalizeInstanceIdentifier(t.instanceIdentifier);if(this.isInitialized(n))throw Error(`${this.name}(${n}) has already been initialized`);if(!this.isComponentSet())throw Error(`Component ${this.name} has not been registered yet`);const i=this.getOrInitializeService({instanceIdentifier:n,options:e});for(const[s,r]of this.instancesDeferred.entries()){n===this.normalizeInstanceIdentifier(s)&&r.resolve(i)}return i}onInit(t,e){var n;const i=this.normalizeInstanceIdentifier(e),s=null!==(n=this.onInitCallbacks.get(i))&&void 0!==n?n:new Set;s.add(t),this.onInitCallbacks.set(i,s);const r=this.instances.get(i);return r&&t(r,i),()=>{s.delete(t)}}invokeOnInitCallbacks(t,e){const n=this.onInitCallbacks.get(e);if(n)for(const s of n)try{s(t,e)}catch(i){}}getOrInitializeService({instanceIdentifier:t,options:e={}}){let n=this.instances.get(t);if(!n&&this.component&&(n=this.component.instanceFactory(this.container,{instanceIdentifier:(i=t,i===L?void 0:i),options:e}),this.instances.set(t,n),this.instancesOptions.set(t,e),this.invokeOnInitCallbacks(n,t),this.component.onInstanceCreated))try{this.component.onInstanceCreated(this.container,t,n)}catch(s){}var i;return n||null}normalizeInstanceIdentifier(t=L){return this.component?this.component.multipleInstances?t:L:t}shouldAutoInitialize(){return!!this.component&&"EXPLICIT"!==this.component.instantiationMode}}class P{constructor(t){this.name=t,this.providers=new Map}addComponent(t){const e=this.getProvider(t.name);if(e.isComponentSet())throw new Error(`Component ${t.name} has already been registered with ${this.name}`);e.setComponent(t)}addOrOverwriteComponent(t){this.getProvider(t.name).isComponentSet()&&this.providers.delete(t.name),this.addComponent(t)}getProvider(t){if(this.providers.has(t))return this.providers.get(t);const e=new R(t,this);return this.providers.set(t,e),e}getProviders(){return Array.from(this.providers.values())}}
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */var O,F;(F=O||(O={}))[F.DEBUG=0]="DEBUG",F[F.VERBOSE=1]="VERBOSE",F[F.INFO=2]="INFO",F[F.WARN=3]="WARN",F[F.ERROR=4]="ERROR",F[F.SILENT=5]="SILENT";const V={debug:O.DEBUG,verbose:O.VERBOSE,info:O.INFO,warn:O.WARN,error:O.ERROR,silent:O.SILENT},B=O.INFO,U={[O.DEBUG]:"log",[O.VERBOSE]:"log",[O.INFO]:"info",[O.WARN]:"warn",[O.ERROR]:"error"},$=(t,e,...n)=>{if(e<t.logLevel)return;(new Date).toISOString();if(!U[e])throw new Error(`Attempted to log a message with an invalid logType (value: ${e})`)};class G{constructor(t){this.name=t,this._logLevel=B,this._logHandler=$,this._userLogHandler=null}get logLevel(){return this._logLevel}set logLevel(t){if(!(t in O))throw new TypeError(`Invalid value "${t}" assigned to \`logLevel\``);this._logLevel=t}setLogLevel(t){this._logLevel="string"==typeof t?V[t]:t}get logHandler(){return this._logHandler}set logHandler(t){if("function"!=typeof t)throw new TypeError("Value assigned to `logHandler` must be a function");this._logHandler=t}get userLogHandler(){return this._userLogHandler}set userLogHandler(t){this._userLogHandler=t}debug(...t){this._userLogHandler&&this._userLogHandler(this,O.DEBUG,...t),this._logHandler(this,O.DEBUG,...t)}log(...t){this._userLogHandler&&this._userLogHandler(this,O.VERBOSE,...t),this._logHandler(this,O.VERBOSE,...t)}info(...t){this._userLogHandler&&this._userLogHandler(this,O.INFO,...t),this._logHandler(this,O.INFO,...t)}warn(...t){this._userLogHandler&&this._userLogHandler(this,O.WARN,...t),this._logHandler(this,O.WARN,...t)}error(...t){this._userLogHandler&&this._userLogHandler(this,O.ERROR,...t),this._logHandler(this,O.ERROR,...t)}}let q,j;const H=new WeakMap,z=new WeakMap,K=new WeakMap,W=new WeakMap,Q=new WeakMap;let X={get(t,e,n){if(t instanceof IDBTransaction){if("done"===e)return z.get(t);if("objectStoreNames"===e)return t.objectStoreNames||K.get(t);if("store"===e)return n.objectStoreNames[1]?void 0:n.objectStore(n.objectStoreNames[0])}return Z(t[e])},set:(t,e,n)=>(t[e]=n,!0),has:(t,e)=>t instanceof IDBTransaction&&("done"===e||"store"===e)||e in t};function Y(t){return t!==IDBDatabase.prototype.transaction||"objectStoreNames"in IDBTransaction.prototype?(j||(j=[IDBCursor.prototype.advance,IDBCursor.prototype.continue,IDBCursor.prototype.continuePrimaryKey])).includes(t)?function(...e){return t.apply(tt(this),e),Z(H.get(this))}:function(...e){return Z(t.apply(tt(this),e))}:function(e,...n){const i=t.call(tt(this),e,...n);return K.set(i,e.sort?e.sort():[e]),Z(i)}}function J(t){return"function"==typeof t?Y(t):(t instanceof IDBTransaction&&function(t){if(z.has(t))return;const e=new Promise((e,n)=>{const i=()=>{t.removeEventListener("complete",s),t.removeEventListener("error",r),t.removeEventListener("abort",r)},s=()=>{e(),i()},r=()=>{n(t.error||new DOMException("AbortError","AbortError")),i()};t.addEventListener("complete",s),t.addEventListener("error",r),t.addEventListener("abort",r)});z.set(t,e)}(t),e=t,(q||(q=[IDBDatabase,IDBObjectStore,IDBIndex,IDBCursor,IDBTransaction])).some(t=>e instanceof t)?new Proxy(t,X):t);var e}function Z(t){if(t instanceof IDBRequest)return function(t){const e=new Promise((e,n)=>{const i=()=>{t.removeEventListener("success",s),t.removeEventListener("error",r)},s=()=>{e(Z(t.result)),i()},r=()=>{n(t.error),i()};t.addEventListener("success",s),t.addEventListener("error",r)});return e.then(e=>{e instanceof IDBCursor&&H.set(e,t)}).catch(()=>{}),Q.set(e,t),e}(t);if(W.has(t))return W.get(t);const e=J(t);return e!==t&&(W.set(t,e),Q.set(e,t)),e}const tt=t=>Q.get(t);const et=["get","getKey","getAll","getAllKeys","count"],nt=["put","add","delete","clear"],it=new Map;function st(t,e){if(!(t instanceof IDBDatabase)||e in t||"string"!=typeof e)return;if(it.get(e))return it.get(e);const n=e.replace(/FromIndex$/,""),i=e!==n,s=nt.includes(n);if(!(n in(i?IDBIndex:IDBObjectStore).prototype)||!s&&!et.includes(n))return;const r=async function(t,...e){const r=this.transaction(t,s?"readwrite":"readonly");let a=r.store;return i&&(a=a.index(e.shift())),(await Promise.all([a[n](...e),s&&r.done]))[0]};return it.set(e,r),r}X=(t=>({...t,get:(e,n,i)=>st(e,n)||t.get(e,n,i),has:(e,n)=>!!st(e,n)||t.has(e,n)}))(X);
/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
class rt{constructor(t){this.container=t}getPlatformInfoString(){return this.container.getProviders().map(t=>{if(function(t){const e=t.getComponent();return"VERSION"===(null==e?void 0:e.type)}(t)){const e=t.getImmediate();return`${e.library}/${e.version}`}return null}).filter(t=>t).join(" ")}}const at="@firebase/app",ot="0.10.13",ht=new G("@firebase/app"),ct="@firebase/app-compat",lt="@firebase/analytics-compat",ut="@firebase/analytics",dt="@firebase/app-check-compat",ft="@firebase/app-check",pt="@firebase/auth",mt="@firebase/auth-compat",gt="@firebase/database",yt="@firebase/data-connect",vt="@firebase/database-compat",wt="@firebase/functions",bt="@firebase/functions-compat",Tt="@firebase/installations",St="@firebase/installations-compat",_t="@firebase/messaging",Et="@firebase/messaging-compat",It="@firebase/performance",xt="@firebase/performance-compat",At="@firebase/remote-config",kt="@firebase/remote-config-compat",Ct="@firebase/storage",Dt="@firebase/storage-compat",Mt="@firebase/firestore",Nt="@firebase/vertexai-preview",Lt="@firebase/firestore-compat",Rt="firebase",Pt="[DEFAULT]",Ot={[at]:"fire-core",[ct]:"fire-core-compat",[ut]:"fire-analytics",[lt]:"fire-analytics-compat",[ft]:"fire-app-check",[dt]:"fire-app-check-compat",[pt]:"fire-auth",[mt]:"fire-auth-compat",[gt]:"fire-rtdb",[yt]:"fire-data-connect",[vt]:"fire-rtdb-compat",[wt]:"fire-fn",[bt]:"fire-fn-compat",[Tt]:"fire-iid",[St]:"fire-iid-compat",[_t]:"fire-fcm",[Et]:"fire-fcm-compat",[It]:"fire-perf",[xt]:"fire-perf-compat",[At]:"fire-rc",[kt]:"fire-rc-compat",[Ct]:"fire-gcs",[Dt]:"fire-gcs-compat",[Mt]:"fire-fst",[Lt]:"fire-fst-compat",[Nt]:"fire-vertex","fire-js":"fire-js",[Rt]:"fire-js-all"},Ft=new Map,Vt=new Map,Bt=new Map;function Ut(t,e){try{t.container.addComponent(e)}catch(n){ht.debug(`Component ${e.name} failed to register with FirebaseApp ${t.name}`,n)}}function $t(t){const e=t.name;if(Bt.has(e))return ht.debug(`There were multiple attempts to register component ${e}.`),!1;Bt.set(e,t);for(const n of Ft.values())Ut(n,t);for(const n of Vt.values())Ut(n,t);return!0}
/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
const Gt=new A("app","Firebase",{"no-app":"No Firebase App '{$appName}' has been created - call initializeApp() first","bad-app-name":"Illegal App name: '{$appName}'","duplicate-app":"Firebase App named '{$appName}' already exists with different options or config","app-deleted":"Firebase App named '{$appName}' already deleted","server-app-deleted":"Firebase Server App has been deleted","no-options":"Need to provide options, when not being deployed to hosting via source.","invalid-app-argument":"firebase.{$appName}() takes either no argument or a Firebase App instance.","invalid-log-argument":"First argument to `onLog` must be null or a function.","idb-open":"Error thrown when opening IndexedDB. Original error: {$originalErrorMessage}.","idb-get":"Error thrown when reading from IndexedDB. Original error: {$originalErrorMessage}.","idb-set":"Error thrown when writing to IndexedDB. Original error: {$originalErrorMessage}.","idb-delete":"Error thrown when deleting from IndexedDB. Original error: {$originalErrorMessage}.","finalization-registry-not-supported":"FirebaseServerApp deleteOnDeref field defined but the JS runtime does not support FinalizationRegistry.","invalid-server-app-environment":"FirebaseServerApp is not for use in browser environments."});
/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
class qt{constructor(t,e,n){this._isDeleted=!1,this._options=Object.assign({},t),this._config=Object.assign({},e),this._name=e.name,this._automaticDataCollectionEnabled=e.automaticDataCollectionEnabled,this._container=n,this.container.addComponent(new N("app",()=>this,"PUBLIC"))}get automaticDataCollectionEnabled(){return this.checkDestroyed(),this._automaticDataCollectionEnabled}set automaticDataCollectionEnabled(t){this.checkDestroyed(),this._automaticDataCollectionEnabled=t}get name(){return this.checkDestroyed(),this._name}get options(){return this.checkDestroyed(),this._options}get config(){return this.checkDestroyed(),this._config}get container(){return this._container}get isDeleted(){return this._isDeleted}set isDeleted(t){this._isDeleted=t}checkDestroyed(){if(this.isDeleted)throw Gt.create("app-deleted",{appName:this._name})}}
/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function jt(t,e={}){let n=t;if("object"!=typeof e){e={name:e}}const i=Object.assign({name:Pt,automaticDataCollectionEnabled:!1},e),s=i.name;if("string"!=typeof s||!s)throw Gt.create("bad-app-name",{appName:String(s)});if(n||(n=_()),!n)throw Gt.create("no-options");const r=Ft.get(s);if(r){if(C(n,r.options)&&C(i,r.config))return r;throw Gt.create("duplicate-app",{appName:s})}const a=new P(s);for(const h of Bt.values())a.addComponent(h);const o=new qt(n,i,a);return Ft.set(s,o),o}function Ht(t,e,n){var i;let s=null!==(i=Ot[t])&&void 0!==i?i:t;n&&(s+=`-${n}`);const r=s.match(/\s|\//),a=e.match(/\s|\//);if(r||a){const t=[`Unable to register library "${s}" with version "${e}":`];return r&&t.push(`library name "${s}" contains illegal characters (whitespace or "/")`),r&&a&&t.push("and"),a&&t.push(`version name "${e}" contains illegal characters (whitespace or "/")`),void ht.warn(t.join(" "))}$t(new N(`${s}-version`,()=>({library:s,version:e}),"VERSION"))}
/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const zt="firebase-heartbeat-store";let Kt=null;function Wt(){return Kt||(Kt=function(t,e,{blocked:n,upgrade:i,blocking:s,terminated:r}={}){const a=indexedDB.open(t,e),o=Z(a);return i&&a.addEventListener("upgradeneeded",t=>{i(Z(a.result),t.oldVersion,t.newVersion,Z(a.transaction),t)}),n&&a.addEventListener("blocked",t=>n(t.oldVersion,t.newVersion,t)),o.then(t=>{r&&t.addEventListener("close",()=>r()),s&&t.addEventListener("versionchange",t=>s(t.oldVersion,t.newVersion,t))}).catch(()=>{}),o}("firebase-heartbeat-database",1,{upgrade:(t,e)=>{if(0===e)try{t.createObjectStore(zt)}catch(n){}}}).catch(t=>{throw Gt.create("idb-open",{originalErrorMessage:t.message})})),Kt}async function Qt(t,e){try{const n=(await Wt()).transaction(zt,"readwrite"),i=n.objectStore(zt);await i.put(e,Xt(t)),await n.done}catch(n){if(n instanceof x)ht.warn(n.message);else{const t=Gt.create("idb-set",{originalErrorMessage:null==n?void 0:n.message});ht.warn(t.message)}}}function Xt(t){return`${t.name}!${t.options.appId}`}
/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Yt{constructor(t){this.container=t,this._heartbeatsCache=null;const e=this.container.getProvider("app").getImmediate();this._storage=new Zt(e),this._heartbeatsCachePromise=this._storage.read().then(t=>(this._heartbeatsCache=t,t))}async triggerHeartbeat(){var t,e;try{const n=this.container.getProvider("platform-logger").getImmediate().getPlatformInfoString(),i=Jt();if(null==(null===(t=this._heartbeatsCache)||void 0===t?void 0:t.heartbeats)&&(this._heartbeatsCache=await this._heartbeatsCachePromise,null==(null===(e=this._heartbeatsCache)||void 0===e?void 0:e.heartbeats)))return;if(this._heartbeatsCache.lastSentHeartbeatDate===i||this._heartbeatsCache.heartbeats.some(t=>t.date===i))return;return this._heartbeatsCache.heartbeats.push({date:i,agent:n}),this._heartbeatsCache.heartbeats=this._heartbeatsCache.heartbeats.filter(t=>{const e=new Date(t.date).valueOf();return Date.now()-e<=2592e6}),this._storage.overwrite(this._heartbeatsCache)}catch(n){ht.warn(n)}}async getHeartbeatsHeader(){var t;try{if(null===this._heartbeatsCache&&await this._heartbeatsCachePromise,null==(null===(t=this._heartbeatsCache)||void 0===t?void 0:t.heartbeats)||0===this._heartbeatsCache.heartbeats.length)return"";const e=Jt(),{heartbeatsToSend:n,unsentEntries:i}=function(t,e=1024){const n=[];let i=t.slice();for(const s of t){const t=n.find(t=>t.agent===s.agent);if(t){if(t.dates.push(s.date),te(n)>e){t.dates.pop();break}}else if(n.push({agent:s.agent,dates:[s.date]}),te(n)>e){n.pop();break}i=i.slice(1)}return{heartbeatsToSend:n,unsentEntries:i}}(this._heartbeatsCache.heartbeats),s=v(JSON.stringify({version:2,heartbeats:n}));return this._heartbeatsCache.lastSentHeartbeatDate=e,i.length>0?(this._heartbeatsCache.heartbeats=i,await this._storage.overwrite(this._heartbeatsCache)):(this._heartbeatsCache.heartbeats=[],this._storage.overwrite(this._heartbeatsCache)),s}catch(e){return ht.warn(e),""}}}function Jt(){return(new Date).toISOString().substring(0,10)}class Zt{constructor(t){this.app=t,this._canUseIndexedDBPromise=this.runIndexedDBEnvironmentCheck()}async runIndexedDBEnvironmentCheck(){return!!function(){try{return"object"==typeof indexedDB}catch(t){return!1}}()&&new Promise((t,e)=>{try{let n=!0;const i="validate-browser-context-for-indexeddb-analytics-module",s=self.indexedDB.open(i);s.onsuccess=()=>{s.result.close(),n||self.indexedDB.deleteDatabase(i),t(!0)},s.onupgradeneeded=()=>{n=!1},s.onerror=()=>{var t;e((null===(t=s.error)||void 0===t?void 0:t.message)||"")}}catch(n){e(n)}}).then(()=>!0).catch(()=>!1)}async read(){if(await this._canUseIndexedDBPromise){const t=await async function(t){try{const e=(await Wt()).transaction(zt),n=await e.objectStore(zt).get(Xt(t));return await e.done,n}catch(e){if(e instanceof x)ht.warn(e.message);else{const t=Gt.create("idb-get",{originalErrorMessage:null==e?void 0:e.message});ht.warn(t.message)}}}(this.app);return(null==t?void 0:t.heartbeats)?t:{heartbeats:[]}}return{heartbeats:[]}}async overwrite(t){var e;if(await this._canUseIndexedDBPromise){const n=await this.read();return Qt(this.app,{lastSentHeartbeatDate:null!==(e=t.lastSentHeartbeatDate)&&void 0!==e?e:n.lastSentHeartbeatDate,heartbeats:t.heartbeats})}}async add(t){var e;if(await this._canUseIndexedDBPromise){const n=await this.read();return Qt(this.app,{lastSentHeartbeatDate:null!==(e=t.lastSentHeartbeatDate)&&void 0!==e?e:n.lastSentHeartbeatDate,heartbeats:[...n.heartbeats,...t.heartbeats]})}}}function te(t){return v(JSON.stringify({version:2,heartbeats:t})).length}
/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */var ee;ee="",$t(new N("platform-logger",t=>new rt(t),"PRIVATE")),$t(new N("heartbeat",t=>new Yt(t),"PRIVATE")),Ht(at,ot,ee),Ht(at,ot,"esm2017"),Ht("fire-js","");
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
Ht("firebase","10.14.1","app");var ne,ie,se="undefined"!=typeof globalThis?globalThis:"undefined"!=typeof window?window:"undefined"!=typeof global?global:"undefined"!=typeof self?self:{};
/** @license
Copyright The Closure Library Authors.
SPDX-License-Identifier: Apache-2.0
*/(function(){var t;
/** @license
  
   Copyright The Closure Library Authors.
   SPDX-License-Identifier: Apache-2.0
  */function e(){this.blockSize=-1,this.blockSize=64,this.g=Array(4),this.B=Array(this.blockSize),this.o=this.h=0,this.s()}function n(t,e,n){n||(n=0);var i=Array(16);if("string"==typeof e)for(var s=0;16>s;++s)i[s]=e.charCodeAt(n++)|e.charCodeAt(n++)<<8|e.charCodeAt(n++)<<16|e.charCodeAt(n++)<<24;else for(s=0;16>s;++s)i[s]=e[n++]|e[n++]<<8|e[n++]<<16|e[n++]<<24;e=t.g[0],n=t.g[1],s=t.g[2];var r=t.g[3],a=e+(r^n&(s^r))+i[0]+3614090360&4294967295;a=(n=(s=(r=(e=(n=(s=(r=(e=(n=(s=(r=(e=(n=(s=(r=(e=(n=(s=(r=(e=(n=(s=(r=(e=(n=(s=(r=(e=(n=(s=(r=(e=(n=(s=(r=(e=(n=(s=(r=(e=(n=(s=(r=(e=(n=(s=(r=(e=(n=(s=(r=(e=(n=(s=(r=(e=(n=(s=(r=(e=n+(a<<7&4294967295|a>>>25))+((a=r+(s^e&(n^s))+i[1]+3905402710&4294967295)<<12&4294967295|a>>>20))+((a=s+(n^r&(e^n))+i[2]+606105819&4294967295)<<17&4294967295|a>>>15))+((a=n+(e^s&(r^e))+i[3]+3250441966&4294967295)<<22&4294967295|a>>>10))+((a=e+(r^n&(s^r))+i[4]+4118548399&4294967295)<<7&4294967295|a>>>25))+((a=r+(s^e&(n^s))+i[5]+1200080426&4294967295)<<12&4294967295|a>>>20))+((a=s+(n^r&(e^n))+i[6]+2821735955&4294967295)<<17&4294967295|a>>>15))+((a=n+(e^s&(r^e))+i[7]+4249261313&4294967295)<<22&4294967295|a>>>10))+((a=e+(r^n&(s^r))+i[8]+1770035416&4294967295)<<7&4294967295|a>>>25))+((a=r+(s^e&(n^s))+i[9]+2336552879&4294967295)<<12&4294967295|a>>>20))+((a=s+(n^r&(e^n))+i[10]+4294925233&4294967295)<<17&4294967295|a>>>15))+((a=n+(e^s&(r^e))+i[11]+2304563134&4294967295)<<22&4294967295|a>>>10))+((a=e+(r^n&(s^r))+i[12]+1804603682&4294967295)<<7&4294967295|a>>>25))+((a=r+(s^e&(n^s))+i[13]+4254626195&4294967295)<<12&4294967295|a>>>20))+((a=s+(n^r&(e^n))+i[14]+2792965006&4294967295)<<17&4294967295|a>>>15))+((a=n+(e^s&(r^e))+i[15]+1236535329&4294967295)<<22&4294967295|a>>>10))+((a=e+(s^r&(n^s))+i[1]+4129170786&4294967295)<<5&4294967295|a>>>27))+((a=r+(n^s&(e^n))+i[6]+3225465664&4294967295)<<9&4294967295|a>>>23))+((a=s+(e^n&(r^e))+i[11]+643717713&4294967295)<<14&4294967295|a>>>18))+((a=n+(r^e&(s^r))+i[0]+3921069994&4294967295)<<20&4294967295|a>>>12))+((a=e+(s^r&(n^s))+i[5]+3593408605&4294967295)<<5&4294967295|a>>>27))+((a=r+(n^s&(e^n))+i[10]+38016083&4294967295)<<9&4294967295|a>>>23))+((a=s+(e^n&(r^e))+i[15]+3634488961&4294967295)<<14&4294967295|a>>>18))+((a=n+(r^e&(s^r))+i[4]+3889429448&4294967295)<<20&4294967295|a>>>12))+((a=e+(s^r&(n^s))+i[9]+568446438&4294967295)<<5&4294967295|a>>>27))+((a=r+(n^s&(e^n))+i[14]+3275163606&4294967295)<<9&4294967295|a>>>23))+((a=s+(e^n&(r^e))+i[3]+4107603335&4294967295)<<14&4294967295|a>>>18))+((a=n+(r^e&(s^r))+i[8]+1163531501&4294967295)<<20&4294967295|a>>>12))+((a=e+(s^r&(n^s))+i[13]+2850285829&4294967295)<<5&4294967295|a>>>27))+((a=r+(n^s&(e^n))+i[2]+4243563512&4294967295)<<9&4294967295|a>>>23))+((a=s+(e^n&(r^e))+i[7]+1735328473&4294967295)<<14&4294967295|a>>>18))+((a=n+(r^e&(s^r))+i[12]+2368359562&4294967295)<<20&4294967295|a>>>12))+((a=e+(n^s^r)+i[5]+4294588738&4294967295)<<4&4294967295|a>>>28))+((a=r+(e^n^s)+i[8]+2272392833&4294967295)<<11&4294967295|a>>>21))+((a=s+(r^e^n)+i[11]+1839030562&4294967295)<<16&4294967295|a>>>16))+((a=n+(s^r^e)+i[14]+4259657740&4294967295)<<23&4294967295|a>>>9))+((a=e+(n^s^r)+i[1]+2763975236&4294967295)<<4&4294967295|a>>>28))+((a=r+(e^n^s)+i[4]+1272893353&4294967295)<<11&4294967295|a>>>21))+((a=s+(r^e^n)+i[7]+4139469664&4294967295)<<16&4294967295|a>>>16))+((a=n+(s^r^e)+i[10]+3200236656&4294967295)<<23&4294967295|a>>>9))+((a=e+(n^s^r)+i[13]+681279174&4294967295)<<4&4294967295|a>>>28))+((a=r+(e^n^s)+i[0]+3936430074&4294967295)<<11&4294967295|a>>>21))+((a=s+(r^e^n)+i[3]+3572445317&4294967295)<<16&4294967295|a>>>16))+((a=n+(s^r^e)+i[6]+76029189&4294967295)<<23&4294967295|a>>>9))+((a=e+(n^s^r)+i[9]+3654602809&4294967295)<<4&4294967295|a>>>28))+((a=r+(e^n^s)+i[12]+3873151461&4294967295)<<11&4294967295|a>>>21))+((a=s+(r^e^n)+i[15]+530742520&4294967295)<<16&4294967295|a>>>16))+((a=n+(s^r^e)+i[2]+3299628645&4294967295)<<23&4294967295|a>>>9))+((a=e+(s^(n|~r))+i[0]+4096336452&4294967295)<<6&4294967295|a>>>26))+((a=r+(n^(e|~s))+i[7]+1126891415&4294967295)<<10&4294967295|a>>>22))+((a=s+(e^(r|~n))+i[14]+2878612391&4294967295)<<15&4294967295|a>>>17))+((a=n+(r^(s|~e))+i[5]+4237533241&4294967295)<<21&4294967295|a>>>11))+((a=e+(s^(n|~r))+i[12]+1700485571&4294967295)<<6&4294967295|a>>>26))+((a=r+(n^(e|~s))+i[3]+2399980690&4294967295)<<10&4294967295|a>>>22))+((a=s+(e^(r|~n))+i[10]+4293915773&4294967295)<<15&4294967295|a>>>17))+((a=n+(r^(s|~e))+i[1]+2240044497&4294967295)<<21&4294967295|a>>>11))+((a=e+(s^(n|~r))+i[8]+1873313359&4294967295)<<6&4294967295|a>>>26))+((a=r+(n^(e|~s))+i[15]+4264355552&4294967295)<<10&4294967295|a>>>22))+((a=s+(e^(r|~n))+i[6]+2734768916&4294967295)<<15&4294967295|a>>>17))+((a=n+(r^(s|~e))+i[13]+1309151649&4294967295)<<21&4294967295|a>>>11))+((r=(e=n+((a=e+(s^(n|~r))+i[4]+4149444226&4294967295)<<6&4294967295|a>>>26))+((a=r+(n^(e|~s))+i[11]+3174756917&4294967295)<<10&4294967295|a>>>22))^((s=r+((a=s+(e^(r|~n))+i[2]+718787259&4294967295)<<15&4294967295|a>>>17))|~e))+i[9]+3951481745&4294967295,t.g[0]=t.g[0]+e&4294967295,t.g[1]=t.g[1]+(s+(a<<21&4294967295|a>>>11))&4294967295,t.g[2]=t.g[2]+s&4294967295,t.g[3]=t.g[3]+r&4294967295}function i(t,e){this.h=e;for(var n=[],i=!0,s=t.length-1;0<=s;s--){var r=0|t[s];i&&r==e||(n[s]=r,i=!1)}this.g=n}!function(t,e){function n(){}n.prototype=e.prototype,t.D=e.prototype,t.prototype=new n,t.prototype.constructor=t,t.C=function(t,n,i){for(var s=Array(arguments.length-2),r=2;r<arguments.length;r++)s[r-2]=arguments[r];return e.prototype[n].apply(t,s)}}(e,function(){this.blockSize=-1}),e.prototype.s=function(){this.g[0]=1732584193,this.g[1]=4023233417,this.g[2]=2562383102,this.g[3]=271733878,this.o=this.h=0},e.prototype.u=function(t,e){void 0===e&&(e=t.length);for(var i=e-this.blockSize,s=this.B,r=this.h,a=0;a<e;){if(0==r)for(;a<=i;)n(this,t,a),a+=this.blockSize;if("string"==typeof t){for(;a<e;)if(s[r++]=t.charCodeAt(a++),r==this.blockSize){n(this,s),r=0;break}}else for(;a<e;)if(s[r++]=t[a++],r==this.blockSize){n(this,s),r=0;break}}this.h=r,this.o+=e},e.prototype.v=function(){var t=Array((56>this.h?this.blockSize:2*this.blockSize)-this.h);t[0]=128;for(var e=1;e<t.length-8;++e)t[e]=0;var n=8*this.o;for(e=t.length-8;e<t.length;++e)t[e]=255&n,n/=256;for(this.u(t),t=Array(16),e=n=0;4>e;++e)for(var i=0;32>i;i+=8)t[n++]=this.g[e]>>>i&255;return t};var s={};function r(t){return-128<=t&&128>t?function(t,e){var n=s;return Object.prototype.hasOwnProperty.call(n,t)?n[t]:n[t]=e(t)}(t,function(t){return new i([0|t],0>t?-1:0)}):new i([0|t],0>t?-1:0)}function a(t){if(isNaN(t)||!isFinite(t))return o;if(0>t)return d(a(-t));for(var e=[],n=1,s=0;t>=n;s++)e[s]=t/n|0,n*=4294967296;return new i(e,0)}var o=r(0),h=r(1),c=r(16777216);function l(t){if(0!=t.h)return!1;for(var e=0;e<t.g.length;e++)if(0!=t.g[e])return!1;return!0}function u(t){return-1==t.h}function d(t){for(var e=t.g.length,n=[],s=0;s<e;s++)n[s]=~t.g[s];return new i(n,~t.h).add(h)}function f(t,e){return t.add(d(e))}function p(t,e){for(;(65535&t[e])!=t[e];)t[e+1]+=t[e]>>>16,t[e]&=65535,e++}function m(t,e){this.g=t,this.h=e}function g(t,e){if(l(e))throw Error("division by zero");if(l(t))return new m(o,o);if(u(t))return e=g(d(t),e),new m(d(e.g),d(e.h));if(u(e))return e=g(t,d(e)),new m(d(e.g),e.h);if(30<t.g.length){if(u(t)||u(e))throw Error("slowDivide_ only works with positive integers.");for(var n=h,i=e;0>=i.l(t);)n=y(n),i=y(i);var s=v(n,1),r=v(i,1);for(i=v(i,2),n=v(n,2);!l(i);){var c=r.add(i);0>=c.l(t)&&(s=s.add(n),r=c),i=v(i,1),n=v(n,1)}return e=f(t,s.j(e)),new m(s,e)}for(s=o;0<=t.l(e);){for(n=Math.max(1,Math.floor(t.m()/e.m())),i=48>=(i=Math.ceil(Math.log(n)/Math.LN2))?1:Math.pow(2,i-48),c=(r=a(n)).j(e);u(c)||0<c.l(t);)c=(r=a(n-=i)).j(e);l(r)&&(r=h),s=s.add(r),t=f(t,c)}return new m(s,t)}function y(t){for(var e=t.g.length+1,n=[],s=0;s<e;s++)n[s]=t.i(s)<<1|t.i(s-1)>>>31;return new i(n,t.h)}function v(t,e){var n=e>>5;e%=32;for(var s=t.g.length-n,r=[],a=0;a<s;a++)r[a]=0<e?t.i(a+n)>>>e|t.i(a+n+1)<<32-e:t.i(a+n);return new i(r,t.h)}(t=i.prototype).m=function(){if(u(this))return-d(this).m();for(var t=0,e=1,n=0;n<this.g.length;n++){var i=this.i(n);t+=(0<=i?i:4294967296+i)*e,e*=4294967296}return t},t.toString=function(t){if(2>(t=t||10)||36<t)throw Error("radix out of range: "+t);if(l(this))return"0";if(u(this))return"-"+d(this).toString(t);for(var e=a(Math.pow(t,6)),n=this,i="";;){var s=g(n,e).g,r=((0<(n=f(n,s.j(e))).g.length?n.g[0]:n.h)>>>0).toString(t);if(l(n=s))return r+i;for(;6>r.length;)r="0"+r;i=r+i}},t.i=function(t){return 0>t?0:t<this.g.length?this.g[t]:this.h},t.l=function(t){return u(t=f(this,t))?-1:l(t)?0:1},t.abs=function(){return u(this)?d(this):this},t.add=function(t){for(var e=Math.max(this.g.length,t.g.length),n=[],s=0,r=0;r<=e;r++){var a=s+(65535&this.i(r))+(65535&t.i(r)),o=(a>>>16)+(this.i(r)>>>16)+(t.i(r)>>>16);s=o>>>16,a&=65535,o&=65535,n[r]=o<<16|a}return new i(n,-2147483648&n[n.length-1]?-1:0)},t.j=function(t){if(l(this)||l(t))return o;if(u(this))return u(t)?d(this).j(d(t)):d(d(this).j(t));if(u(t))return d(this.j(d(t)));if(0>this.l(c)&&0>t.l(c))return a(this.m()*t.m());for(var e=this.g.length+t.g.length,n=[],s=0;s<2*e;s++)n[s]=0;for(s=0;s<this.g.length;s++)for(var r=0;r<t.g.length;r++){var h=this.i(s)>>>16,f=65535&this.i(s),m=t.i(r)>>>16,g=65535&t.i(r);n[2*s+2*r]+=f*g,p(n,2*s+2*r),n[2*s+2*r+1]+=h*g,p(n,2*s+2*r+1),n[2*s+2*r+1]+=f*m,p(n,2*s+2*r+1),n[2*s+2*r+2]+=h*m,p(n,2*s+2*r+2)}for(s=0;s<e;s++)n[s]=n[2*s+1]<<16|n[2*s];for(s=e;s<2*e;s++)n[s]=0;return new i(n,0)},t.A=function(t){return g(this,t).h},t.and=function(t){for(var e=Math.max(this.g.length,t.g.length),n=[],s=0;s<e;s++)n[s]=this.i(s)&t.i(s);return new i(n,this.h&t.h)},t.or=function(t){for(var e=Math.max(this.g.length,t.g.length),n=[],s=0;s<e;s++)n[s]=this.i(s)|t.i(s);return new i(n,this.h|t.h)},t.xor=function(t){for(var e=Math.max(this.g.length,t.g.length),n=[],s=0;s<e;s++)n[s]=this.i(s)^t.i(s);return new i(n,this.h^t.h)},e.prototype.digest=e.prototype.v,e.prototype.reset=e.prototype.s,e.prototype.update=e.prototype.u,ie=e,i.prototype.add=i.prototype.add,i.prototype.multiply=i.prototype.j,i.prototype.modulo=i.prototype.A,i.prototype.compare=i.prototype.l,i.prototype.toNumber=i.prototype.m,i.prototype.toString=i.prototype.toString,i.prototype.getBits=i.prototype.i,i.fromNumber=a,i.fromString=function t(e,n){if(0==e.length)throw Error("number format error: empty string");if(2>(n=n||10)||36<n)throw Error("radix out of range: "+n);if("-"==e.charAt(0))return d(t(e.substring(1),n));if(0<=e.indexOf("-"))throw Error('number format error: interior "-" character');for(var i=a(Math.pow(n,8)),s=o,r=0;r<e.length;r+=8){var h=Math.min(8,e.length-r),c=parseInt(e.substring(r,r+h),n);8>h?(h=a(Math.pow(n,h)),s=s.j(h).add(a(c))):s=(s=s.j(i)).add(a(c))}return s},ne=i}).apply(void 0!==se?se:"undefined"!=typeof self?self:"undefined"!=typeof window?window:{});var re,ae,oe,he,ce,le,ue,de,fe="undefined"!=typeof globalThis?globalThis:"undefined"!=typeof window?window:"undefined"!=typeof global?global:"undefined"!=typeof self?self:{};
/** @license
Copyright The Closure Library Authors.
SPDX-License-Identifier: Apache-2.0
*/(function(){var t,e="function"==typeof Object.defineProperties?Object.defineProperty:function(t,e,n){return t==Array.prototype||t==Object.prototype||(t[e]=n.value),t};var n=function(t){t=["object"==typeof globalThis&&globalThis,t,"object"==typeof window&&window,"object"==typeof self&&self,"object"==typeof fe&&fe];for(var e=0;e<t.length;++e){var n=t[e];if(n&&n.Math==Math)return n}throw Error("Cannot find global object")}(this);!function(t,i){if(i)t:{var s=n;t=t.split(".");for(var r=0;r<t.length-1;r++){var a=t[r];if(!(a in s))break t;s=s[a]}(i=i(r=s[t=t[t.length-1]]))!=r&&null!=i&&e(s,t,{configurable:!0,writable:!0,value:i})}}("Array.prototype.values",function(t){return t||function(){return function(t,e){t instanceof String&&(t+="");var n=0,i=!1,s={next:function(){if(!i&&n<t.length){var s=n++;return{value:e(s,t[s]),done:!1}}return i=!0,{done:!0,value:void 0}}};return s[Symbol.iterator]=function(){return s},s}(this,function(t,e){return e})}});
/** @license
  
   Copyright The Closure Library Authors.
   SPDX-License-Identifier: Apache-2.0
  */
var i=i||{},s=this||self;function r(t){var e=typeof t;return"array"==(e="object"!=e?e:t?Array.isArray(t)?"array":e:"null")||"object"==e&&"number"==typeof t.length}function a(t){var e=typeof t;return"object"==e&&null!=t||"function"==e}function o(t,e,n){return t.call.apply(t.bind,arguments)}function h(t,e,n){if(!t)throw Error();if(2<arguments.length){var i=Array.prototype.slice.call(arguments,2);return function(){var n=Array.prototype.slice.call(arguments);return Array.prototype.unshift.apply(n,i),t.apply(e,n)}}return function(){return t.apply(e,arguments)}}function c(t,e,n){return(c=Function.prototype.bind&&-1!=Function.prototype.bind.toString().indexOf("native code")?o:h).apply(null,arguments)}function l(t,e){var n=Array.prototype.slice.call(arguments,1);return function(){var e=n.slice();return e.push.apply(e,arguments),t.apply(this,e)}}function u(t,e){function n(){}n.prototype=e.prototype,t.aa=e.prototype,t.prototype=new n,t.prototype.constructor=t,t.Qb=function(t,n,i){for(var s=Array(arguments.length-2),r=2;r<arguments.length;r++)s[r-2]=arguments[r];return e.prototype[n].apply(t,s)}}function d(t){const e=t.length;if(0<e){const n=Array(e);for(let i=0;i<e;i++)n[i]=t[i];return n}return[]}function f(t,e){for(let n=1;n<arguments.length;n++){const e=arguments[n];if(r(e)){const n=t.length||0,i=e.length||0;t.length=n+i;for(let s=0;s<i;s++)t[n+s]=e[s]}else t.push(e)}}function p(t){return/^[\s\xa0]*$/.test(t)}function m(){var t=s.navigator;return t&&(t=t.userAgent)?t:""}function g(t){return g[" "](t),t}g[" "]=function(){};var y=!(-1==m().indexOf("Gecko")||-1!=m().toLowerCase().indexOf("webkit")&&-1==m().indexOf("Edge")||-1!=m().indexOf("Trident")||-1!=m().indexOf("MSIE")||-1!=m().indexOf("Edge"));function v(t,e,n){for(const i in t)e.call(n,t[i],i,t)}function w(t){const e={};for(const n in t)e[n]=t[n];return e}const b="constructor hasOwnProperty isPrototypeOf propertyIsEnumerable toLocaleString toString valueOf".split(" ");function T(t,e){let n,i;for(let s=1;s<arguments.length;s++){for(n in i=arguments[s],i)t[n]=i[n];for(let e=0;e<b.length;e++)n=b[e],Object.prototype.hasOwnProperty.call(i,n)&&(t[n]=i[n])}}function S(t){var e=1;t=t.split(":");const n=[];for(;0<e&&t.length;)n.push(t.shift()),e--;return t.length&&n.push(t.join(":")),n}function _(t){s.setTimeout(()=>{throw t},0)}function E(){var t=C;let e=null;return t.g&&(e=t.g,t.g=t.g.next,t.g||(t.h=null),e.next=null),e}var I=new class{constructor(t,e){this.i=t,this.j=e,this.h=0,this.g=null}get(){let t;return 0<this.h?(this.h--,t=this.g,this.g=t.next,t.next=null):t=this.i(),t}}(()=>new x,t=>t.reset());class x{constructor(){this.next=this.g=this.h=null}set(t,e){this.h=t,this.g=e,this.next=null}reset(){this.next=this.g=this.h=null}}let A,k=!1,C=new class{constructor(){this.h=this.g=null}add(t,e){const n=I.get();n.set(t,e),this.h?this.h.next=n:this.g=n,this.h=n}},D=()=>{const t=s.Promise.resolve(void 0);A=()=>{t.then(M)}};var M=()=>{for(var t;t=E();){try{t.h.call(t.g)}catch(n){_(n)}var e=I;e.j(t),100>e.h&&(e.h++,t.next=e.g,e.g=t)}k=!1};function N(){this.s=this.s,this.C=this.C}function L(t,e){this.type=t,this.g=this.target=e,this.defaultPrevented=!1}N.prototype.s=!1,N.prototype.ma=function(){this.s||(this.s=!0,this.N())},N.prototype.N=function(){if(this.C)for(;this.C.length;)this.C.shift()()},L.prototype.h=function(){this.defaultPrevented=!0};var R=function(){if(!s.addEventListener||!Object.defineProperty)return!1;var t=!1,e=Object.defineProperty({},"passive",{get:function(){t=!0}});try{const t=()=>{};s.addEventListener("test",t,e),s.removeEventListener("test",t,e)}catch(n){}return t}();function P(t,e){if(L.call(this,t?t.type:""),this.relatedTarget=this.g=this.target=null,this.button=this.screenY=this.screenX=this.clientY=this.clientX=0,this.key="",this.metaKey=this.shiftKey=this.altKey=this.ctrlKey=!1,this.state=null,this.pointerId=0,this.pointerType="",this.i=null,t){var n=this.type=t.type,i=t.changedTouches&&t.changedTouches.length?t.changedTouches[0]:null;if(this.target=t.target||t.srcElement,this.g=e,e=t.relatedTarget){if(y){t:{try{g(e.nodeName);var s=!0;break t}catch(r){}s=!1}s||(e=null)}}else"mouseover"==n?e=t.fromElement:"mouseout"==n&&(e=t.toElement);this.relatedTarget=e,i?(this.clientX=void 0!==i.clientX?i.clientX:i.pageX,this.clientY=void 0!==i.clientY?i.clientY:i.pageY,this.screenX=i.screenX||0,this.screenY=i.screenY||0):(this.clientX=void 0!==t.clientX?t.clientX:t.pageX,this.clientY=void 0!==t.clientY?t.clientY:t.pageY,this.screenX=t.screenX||0,this.screenY=t.screenY||0),this.button=t.button,this.key=t.key||"",this.ctrlKey=t.ctrlKey,this.altKey=t.altKey,this.shiftKey=t.shiftKey,this.metaKey=t.metaKey,this.pointerId=t.pointerId||0,this.pointerType="string"==typeof t.pointerType?t.pointerType:O[t.pointerType]||"",this.state=t.state,this.i=t,t.defaultPrevented&&P.aa.h.call(this)}}u(P,L);var O={2:"touch",3:"pen",4:"mouse"};P.prototype.h=function(){P.aa.h.call(this);var t=this.i;t.preventDefault?t.preventDefault():t.returnValue=!1};var F="closure_listenable_"+(1e6*Math.random()|0),V=0;function B(t,e,n,i,s){this.listener=t,this.proxy=null,this.src=e,this.type=n,this.capture=!!i,this.ha=s,this.key=++V,this.da=this.fa=!1}function U(t){t.da=!0,t.listener=null,t.proxy=null,t.src=null,t.ha=null}function $(t){this.src=t,this.g={},this.h=0}function G(t,e){var n=e.type;if(n in t.g){var i,s=t.g[n],r=Array.prototype.indexOf.call(s,e,void 0);(i=0<=r)&&Array.prototype.splice.call(s,r,1),i&&(U(e),0==t.g[n].length&&(delete t.g[n],t.h--))}}function q(t,e,n,i){for(var s=0;s<t.length;++s){var r=t[s];if(!r.da&&r.listener==e&&r.capture==!!n&&r.ha==i)return s}return-1}$.prototype.add=function(t,e,n,i,s){var r=t.toString();(t=this.g[r])||(t=this.g[r]=[],this.h++);var a=q(t,e,i,s);return-1<a?(e=t[a],n||(e.fa=!1)):((e=new B(e,this.src,r,!!i,s)).fa=n,t.push(e)),e};var j="closure_lm_"+(1e6*Math.random()|0),H={};function z(t,e,n,i,s){if(Array.isArray(e)){for(var r=0;r<e.length;r++)z(t,e[r],n,i,s);return null}return n=Z(n),t&&t[F]?t.K(e,n,!!a(i)&&!!i.capture,s):function(t,e,n,i,s,r){if(!e)throw Error("Invalid event type");var o=a(s)?!!s.capture:!!s,h=Y(t);if(h||(t[j]=h=new $(t)),n=h.add(e,n,i,o,r),n.proxy)return n;if(i=function(){function t(n){return e.call(t.src,t.listener,n)}const e=X;return t}(),n.proxy=i,i.src=t,i.listener=n,t.addEventListener)R||(s=o),void 0===s&&(s=!1),t.addEventListener(e.toString(),i,s);else if(t.attachEvent)t.attachEvent(Q(e.toString()),i);else{if(!t.addListener||!t.removeListener)throw Error("addEventListener and attachEvent are unavailable.");t.addListener(i)}return n}(t,e,n,!1,i,s)}function K(t,e,n,i,s){if(Array.isArray(e))for(var r=0;r<e.length;r++)K(t,e[r],n,i,s);else i=a(i)?!!i.capture:!!i,n=Z(n),t&&t[F]?(t=t.i,(e=String(e).toString())in t.g&&(-1<(n=q(r=t.g[e],n,i,s))&&(U(r[n]),Array.prototype.splice.call(r,n,1),0==r.length&&(delete t.g[e],t.h--)))):t&&(t=Y(t))&&(e=t.g[e.toString()],t=-1,e&&(t=q(e,n,i,s)),(n=-1<t?e[t]:null)&&W(n))}function W(t){if("number"!=typeof t&&t&&!t.da){var e=t.src;if(e&&e[F])G(e.i,t);else{var n=t.type,i=t.proxy;e.removeEventListener?e.removeEventListener(n,i,t.capture):e.detachEvent?e.detachEvent(Q(n),i):e.addListener&&e.removeListener&&e.removeListener(i),(n=Y(e))?(G(n,t),0==n.h&&(n.src=null,e[j]=null)):U(t)}}}function Q(t){return t in H?H[t]:H[t]="on"+t}function X(t,e){if(t.da)t=!0;else{e=new P(e,this);var n=t.listener,i=t.ha||t.src;t.fa&&W(t),t=n.call(i,e)}return t}function Y(t){return(t=t[j])instanceof $?t:null}var J="__closure_events_fn_"+(1e9*Math.random()>>>0);function Z(t){return"function"==typeof t?t:(t[J]||(t[J]=function(e){return t.handleEvent(e)}),t[J])}function tt(){N.call(this),this.i=new $(this),this.M=this,this.F=null}function et(t,e){var n,i=t.F;if(i)for(n=[];i;i=i.F)n.push(i);if(t=t.M,i=e.type||e,"string"==typeof e)e=new L(e,t);else if(e instanceof L)e.target=e.target||t;else{var s=e;T(e=new L(i,t),s)}if(s=!0,n)for(var r=n.length-1;0<=r;r--){var a=e.g=n[r];s=nt(a,i,!0,e)&&s}if(s=nt(a=e.g=t,i,!0,e)&&s,s=nt(a,i,!1,e)&&s,n)for(r=0;r<n.length;r++)s=nt(a=e.g=n[r],i,!1,e)&&s}function nt(t,e,n,i){if(!(e=t.i.g[String(e)]))return!0;e=e.concat();for(var s=!0,r=0;r<e.length;++r){var a=e[r];if(a&&!a.da&&a.capture==n){var o=a.listener,h=a.ha||a.src;a.fa&&G(t.i,a),s=!1!==o.call(h,i)&&s}}return s&&!i.defaultPrevented}function it(t,e,n){if("function"==typeof t)n&&(t=c(t,n));else{if(!t||"function"!=typeof t.handleEvent)throw Error("Invalid listener argument");t=c(t.handleEvent,t)}return 2147483647<Number(e)?-1:s.setTimeout(t,e||0)}function st(t){t.g=it(()=>{t.g=null,t.i&&(t.i=!1,st(t))},t.l);const e=t.h;t.h=null,t.m.apply(null,e)}u(tt,N),tt.prototype[F]=!0,tt.prototype.removeEventListener=function(t,e,n,i){K(this,t,e,n,i)},tt.prototype.N=function(){if(tt.aa.N.call(this),this.i){var t,e=this.i;for(t in e.g){for(var n=e.g[t],i=0;i<n.length;i++)U(n[i]);delete e.g[t],e.h--}}this.F=null},tt.prototype.K=function(t,e,n,i){return this.i.add(String(t),e,!1,n,i)},tt.prototype.L=function(t,e,n,i){return this.i.add(String(t),e,!0,n,i)};class rt extends N{constructor(t,e){super(),this.m=t,this.l=e,this.h=null,this.i=!1,this.g=null}j(t){this.h=arguments,this.g?this.i=!0:st(this)}N(){super.N(),this.g&&(s.clearTimeout(this.g),this.g=null,this.i=!1,this.h=null)}}function at(t){N.call(this),this.h=t,this.g={}}u(at,N);var ot=[];function ht(t){v(t.g,function(t,e){this.g.hasOwnProperty(e)&&W(t)},t),t.g={}}at.prototype.N=function(){at.aa.N.call(this),ht(this)},at.prototype.handleEvent=function(){throw Error("EventHandler.handleEvent not implemented")};var ct=s.JSON.stringify,lt=s.JSON.parse,ut=class{stringify(t){return s.JSON.stringify(t,void 0)}parse(t){return s.JSON.parse(t,void 0)}};function dt(){}function ft(t){return t.h||(t.h=t.i())}function pt(){}dt.prototype.h=null;var mt={OPEN:"a",kb:"b",Ja:"c",wb:"d"};function gt(){L.call(this,"d")}function yt(){L.call(this,"c")}u(gt,L),u(yt,L);var vt={},wt=null;function bt(){return wt=wt||new tt}function Tt(t){L.call(this,vt.La,t)}function St(t){const e=bt();et(e,new Tt(e))}function _t(t,e){L.call(this,vt.STAT_EVENT,t),this.stat=e}function Et(t){const e=bt();et(e,new _t(e,t))}function It(t,e){L.call(this,vt.Ma,t),this.size=e}function xt(t,e){if("function"!=typeof t)throw Error("Fn must not be null and must be a function");return s.setTimeout(function(){t()},e)}function At(){this.g=!0}function kt(t,e,n,i){t.info(function(){return"XMLHTTP TEXT ("+e+"): "+function(t,e){if(!t.g)return e;if(!e)return null;try{var n=JSON.parse(e);if(n)for(t=0;t<n.length;t++)if(Array.isArray(n[t])){var i=n[t];if(!(2>i.length)){var s=i[1];if(Array.isArray(s)&&!(1>s.length)){var r=s[0];if("noop"!=r&&"stop"!=r&&"close"!=r)for(var a=1;a<s.length;a++)s[a]=""}}}return ct(n)}catch(o){return e}}(t,n)+(i?" "+i:"")})}vt.La="serverreachability",u(Tt,L),vt.STAT_EVENT="statevent",u(_t,L),vt.Ma="timingevent",u(It,L),At.prototype.xa=function(){this.g=!1},At.prototype.info=function(){};var Ct,Dt={NO_ERROR:0,gb:1,tb:2,sb:3,nb:4,rb:5,ub:6,Ia:7,TIMEOUT:8,xb:9},Mt={lb:"complete",Hb:"success",Ja:"error",Ia:"abort",zb:"ready",Ab:"readystatechange",TIMEOUT:"timeout",vb:"incrementaldata",yb:"progress",ob:"downloadprogress",Pb:"uploadprogress"};function Nt(){}function Lt(t,e,n,i){this.j=t,this.i=e,this.l=n,this.R=i||1,this.U=new at(this),this.I=45e3,this.H=null,this.o=!1,this.m=this.A=this.v=this.L=this.F=this.S=this.B=null,this.D=[],this.g=null,this.C=0,this.s=this.u=null,this.X=-1,this.J=!1,this.O=0,this.M=null,this.W=this.K=this.T=this.P=!1,this.h=new Rt}function Rt(){this.i=null,this.g="",this.h=!1}u(Nt,dt),Nt.prototype.g=function(){return new XMLHttpRequest},Nt.prototype.i=function(){return{}},Ct=new Nt;var Pt={},Ot={};function Ft(t,e,n){t.L=1,t.v=ve(se(e)),t.m=n,t.P=!0,Vt(t,null)}function Vt(t,e){t.F=Date.now(),$t(t),t.A=se(t.v);var n=t.A,i=t.R;Array.isArray(i)||(i=[String(i)]),Me(n.i,"t",i),t.C=0,n=t.j.J,t.h=new Rt,t.g=wn(t.j,n?e:null,!t.m),0<t.O&&(t.M=new rt(c(t.Y,t,t.g),t.O)),e=t.U,n=t.g,i=t.ca;var s="readystatechange";Array.isArray(s)||(s&&(ot[0]=s.toString()),s=ot);for(var r=0;r<s.length;r++){var a=z(n,s[r],i||e.handleEvent,!1,e.h||e);if(!a)break;e.g[a.key]=a}e=t.H?w(t.H):{},t.m?(t.u||(t.u="POST"),e["Content-Type"]="application/x-www-form-urlencoded",t.g.ea(t.A,t.u,t.m,e)):(t.u="GET",t.g.ea(t.A,t.u,null,e)),St(),function(t,e,n,i,s,r){t.info(function(){if(t.g)if(r)for(var a="",o=r.split("&"),h=0;h<o.length;h++){var c=o[h].split("=");if(1<c.length){var l=c[0];c=c[1];var u=l.split("_");a=2<=u.length&&"type"==u[1]?a+(l+"=")+c+"&":a+(l+"=redacted&")}}else a=null;else a=r;return"XMLHTTP REQ ("+i+") [attempt "+s+"]: "+e+"\n"+n+"\n"+a})}(t.i,t.u,t.A,t.l,t.R,t.m)}function Bt(t){return!!t.g&&("GET"==t.u&&2!=t.L&&t.j.Ca)}function Ut(t,e){var n=t.C,i=e.indexOf("\n",n);return-1==i?Ot:(n=Number(e.substring(n,i)),isNaN(n)?Pt:(i+=1)+n>e.length?Ot:(e=e.slice(i,i+n),t.C=i+n,e))}function $t(t){t.S=Date.now()+t.I,Gt(t,t.I)}function Gt(t,e){if(null!=t.B)throw Error("WatchDog timer not null");t.B=xt(c(t.ba,t),e)}function qt(t){t.B&&(s.clearTimeout(t.B),t.B=null)}function jt(t){0==t.j.G||t.J||pn(t.j,t)}function Ht(t){qt(t);var e=t.M;e&&"function"==typeof e.ma&&e.ma(),t.M=null,ht(t.U),t.g&&(e=t.g,t.g=null,e.abort(),e.ma())}function zt(t,e){try{var n=t.j;if(0!=n.G&&(n.g==t||Yt(n.h,t)))if(!t.K&&Yt(n.h,t)&&3==n.G){try{var i=n.Da.g.parse(e)}catch(l){i=null}if(Array.isArray(i)&&3==i.length){var s=i;if(0==s[0]){t:if(!n.u){if(n.g){if(!(n.g.F+3e3<t.F))break t;fn(n),nn(n)}ln(n),Et(18)}}else n.za=s[1],0<n.za-n.T&&37500>s[2]&&n.F&&0==n.v&&!n.C&&(n.C=xt(c(n.Za,n),6e3));if(1>=Xt(n.h)&&n.ca){try{n.ca()}catch(l){}n.ca=void 0}}else gn(n,11)}else if((t.K||n.g==t)&&fn(n),!p(e))for(s=n.Da.g.parse(e),e=0;e<s.length;e++){let c=s[e];if(n.T=c[0],c=c[1],2==n.G)if("c"==c[0]){n.K=c[1],n.ia=c[2];const e=c[3];null!=e&&(n.la=e,n.j.info("VER="+n.la));const s=c[4];null!=s&&(n.Aa=s,n.j.info("SVER="+n.Aa));const l=c[5];null!=l&&"number"==typeof l&&0<l&&(i=1.5*l,n.L=i,n.j.info("backChannelRequestTimeoutMs_="+i)),i=n;const u=t.g;if(u){const t=u.g?u.g.getResponseHeader("X-Client-Wire-Protocol"):null;if(t){var r=i.h;r.g||-1==t.indexOf("spdy")&&-1==t.indexOf("quic")&&-1==t.indexOf("h2")||(r.j=r.l,r.g=new Set,r.h&&(Jt(r,r.h),r.h=null))}if(i.D){const t=u.g?u.g.getResponseHeader("X-HTTP-Session-Id"):null;t&&(i.ya=t,ye(i.I,i.D,t))}}n.G=3,n.l&&n.l.ua(),n.ba&&(n.R=Date.now()-t.F,n.j.info("Handshake RTT: "+n.R+"ms"));var a=t;if((i=n).qa=vn(i,i.J?i.ia:null,i.W),a.K){Zt(i.h,a);var o=a,h=i.L;h&&(o.I=h),o.B&&(qt(o),$t(o)),i.g=a}else cn(i);0<n.i.length&&rn(n)}else"stop"!=c[0]&&"close"!=c[0]||gn(n,7);else 3==n.G&&("stop"==c[0]||"close"==c[0]?"stop"==c[0]?gn(n,7):en(n):"noop"!=c[0]&&n.l&&n.l.ta(c),n.v=0)}St()}catch(l){}}Lt.prototype.ca=function(t){t=t.target;const e=this.M;e&&3==Ye(t)?e.j():this.Y(t)},Lt.prototype.Y=function(t){try{if(t==this.g)t:{const d=Ye(this.g);var e=this.g.Ba();this.g.Z();if(!(3>d)&&(3!=d||this.g&&(this.h.h||this.g.oa()||Je(this.g)))){this.J||4!=d||7==e||St(),qt(this);var n=this.g.Z();this.X=n;e:if(Bt(this)){var i=Je(this.g);t="";var r=i.length,a=4==Ye(this.g);if(!this.h.i){if("undefined"==typeof TextDecoder){Ht(this),jt(this);var o="";break e}this.h.i=new s.TextDecoder}for(e=0;e<r;e++)this.h.h=!0,t+=this.h.i.decode(i[e],{stream:!(a&&e==r-1)});i.length=0,this.h.g+=t,this.C=0,o=this.h.g}else o=this.g.oa();if(this.o=200==n,function(t,e,n,i,s,r,a){t.info(function(){return"XMLHTTP RESP ("+i+") [ attempt "+s+"]: "+e+"\n"+n+"\n"+r+" "+a})}(this.i,this.u,this.A,this.l,this.R,d,n),this.o){if(this.T&&!this.K){e:{if(this.g){var h,c=this.g;if((h=c.g?c.g.getResponseHeader("X-HTTP-Initial-Response"):null)&&!p(h)){var l=h;break e}}l=null}if(!(n=l)){this.o=!1,this.s=3,Et(12),Ht(this),jt(this);break t}kt(this.i,this.l,n,"Initial handshake response via X-HTTP-Initial-Response"),this.K=!0,zt(this,n)}if(this.P){let t;for(n=!0;!this.J&&this.C<o.length;){if(t=Ut(this,o),t==Ot){4==d&&(this.s=4,Et(14),n=!1),kt(this.i,this.l,null,"[Incomplete Response]");break}if(t==Pt){this.s=4,Et(15),kt(this.i,this.l,o,"[Invalid Chunk]"),n=!1;break}kt(this.i,this.l,t,null),zt(this,t)}if(Bt(this)&&0!=this.C&&(this.h.g=this.h.g.slice(this.C),this.C=0),4!=d||0!=o.length||this.h.h||(this.s=1,Et(16),n=!1),this.o=this.o&&n,n){if(0<o.length&&!this.W){this.W=!0;var u=this.j;u.g==this&&u.ba&&!u.M&&(u.j.info("Great, no buffering proxy detected. Bytes received: "+o.length),un(u),u.M=!0,Et(11))}}else kt(this.i,this.l,o,"[Invalid Chunked Response]"),Ht(this),jt(this)}else kt(this.i,this.l,o,null),zt(this,o);4==d&&Ht(this),this.o&&!this.J&&(4==d?pn(this.j,this):(this.o=!1,$t(this)))}else(function(t){const e={};t=(t.g&&2<=Ye(t)&&t.g.getAllResponseHeaders()||"").split("\r\n");for(let i=0;i<t.length;i++){if(p(t[i]))continue;var n=S(t[i]);const s=n[0];if("string"!=typeof(n=n[1]))continue;n=n.trim();const r=e[s]||[];e[s]=r,r.push(n)}!function(t,e){for(const n in t)e.call(void 0,t[n],n,t)}(e,function(t){return t.join(", ")})})(this.g),400==n&&0<o.indexOf("Unknown SID")?(this.s=3,Et(12)):(this.s=0,Et(13)),Ht(this),jt(this)}}}catch(d){}},Lt.prototype.cancel=function(){this.J=!0,Ht(this)},Lt.prototype.ba=function(){this.B=null;const t=Date.now();0<=t-this.S?(function(t,e){t.info(function(){return"TIMEOUT: "+e})}(this.i,this.A),2!=this.L&&(St(),Et(17)),Ht(this),this.s=2,jt(this)):Gt(this,this.S-t)};var Kt=class{constructor(t,e){this.g=t,this.map=e}};function Wt(t){this.l=t||10,s.PerformanceNavigationTiming?t=0<(t=s.performance.getEntriesByType("navigation")).length&&("hq"==t[0].nextHopProtocol||"h2"==t[0].nextHopProtocol):t=!!(s.chrome&&s.chrome.loadTimes&&s.chrome.loadTimes()&&s.chrome.loadTimes().wasFetchedViaSpdy),this.j=t?this.l:1,this.g=null,1<this.j&&(this.g=new Set),this.h=null,this.i=[]}function Qt(t){return!!t.h||!!t.g&&t.g.size>=t.j}function Xt(t){return t.h?1:t.g?t.g.size:0}function Yt(t,e){return t.h?t.h==e:!!t.g&&t.g.has(e)}function Jt(t,e){t.g?t.g.add(e):t.h=e}function Zt(t,e){t.h&&t.h==e?t.h=null:t.g&&t.g.has(e)&&t.g.delete(e)}function te(t){if(null!=t.h)return t.i.concat(t.h.D);if(null!=t.g&&0!==t.g.size){let e=t.i;for(const n of t.g.values())e=e.concat(n.D);return e}return d(t.i)}function ee(t,e){if(t.forEach&&"function"==typeof t.forEach)t.forEach(e,void 0);else if(r(t)||"string"==typeof t)Array.prototype.forEach.call(t,e,void 0);else for(var n=function(t){if(t.na&&"function"==typeof t.na)return t.na();if(!t.V||"function"!=typeof t.V){if("undefined"!=typeof Map&&t instanceof Map)return Array.from(t.keys());if(!("undefined"!=typeof Set&&t instanceof Set)){if(r(t)||"string"==typeof t){var e=[];t=t.length;for(var n=0;n<t;n++)e.push(n);return e}e=[],n=0;for(const i in t)e[n++]=i;return e}}}(t),i=function(t){if(t.V&&"function"==typeof t.V)return t.V();if("undefined"!=typeof Map&&t instanceof Map||"undefined"!=typeof Set&&t instanceof Set)return Array.from(t.values());if("string"==typeof t)return t.split("");if(r(t)){for(var e=[],n=t.length,i=0;i<n;i++)e.push(t[i]);return e}for(i in e=[],n=0,t)e[n++]=t[i];return e}(t),s=i.length,a=0;a<s;a++)e.call(void 0,i[a],n&&n[a],t)}Wt.prototype.cancel=function(){if(this.i=te(this),this.h)this.h.cancel(),this.h=null;else if(this.g&&0!==this.g.size){for(const t of this.g.values())t.cancel();this.g.clear()}};var ne=RegExp("^(?:([^:/?#.]+):)?(?://(?:([^\\\\/?#]*)@)?([^\\\\/?#]*?)(?::([0-9]+))?(?=[\\\\/?#]|$))?([^?#]+)?(?:\\?([^#]*))?(?:#([\\s\\S]*))?$");function ie(t){if(this.g=this.o=this.j="",this.s=null,this.m=this.l="",this.h=!1,t instanceof ie){this.h=t.h,pe(this,t.j),this.o=t.o,this.g=t.g,me(this,t.s),this.l=t.l;var e=t.i,n=new Ae;n.i=e.i,e.g&&(n.g=new Map(e.g),n.h=e.h),ge(this,n),this.m=t.m}else t&&(e=String(t).match(ne))?(this.h=!1,pe(this,e[1]||"",!0),this.o=we(e[2]||""),this.g=we(e[3]||"",!0),me(this,e[4]),this.l=we(e[5]||"",!0),ge(this,e[6]||"",!0),this.m=we(e[7]||"")):(this.h=!1,this.i=new Ae(null,this.h))}function se(t){return new ie(t)}function pe(t,e,n){t.j=n?we(e,!0):e,t.j&&(t.j=t.j.replace(/:$/,""))}function me(t,e){if(e){if(e=Number(e),isNaN(e)||0>e)throw Error("Bad port number "+e);t.s=e}else t.s=null}function ge(t,e,n){e instanceof Ae?(t.i=e,function(t,e){e&&!t.j&&(ke(t),t.i=null,t.g.forEach(function(t,e){var n=e.toLowerCase();e!=n&&(Ce(this,e),Me(this,n,t))},t)),t.j=e}(t.i,t.h)):(n||(e=be(e,Ie)),t.i=new Ae(e,t.h))}function ye(t,e,n){t.i.set(e,n)}function ve(t){return ye(t,"zx",Math.floor(2147483648*Math.random()).toString(36)+Math.abs(Math.floor(2147483648*Math.random())^Date.now()).toString(36)),t}function we(t,e){return t?e?decodeURI(t.replace(/%25/g,"%2525")):decodeURIComponent(t):""}function be(t,e,n){return"string"==typeof t?(t=encodeURI(t).replace(e,Te),n&&(t=t.replace(/%25([0-9a-fA-F]{2})/g,"%$1")),t):null}function Te(t){return"%"+((t=t.charCodeAt(0))>>4&15).toString(16)+(15&t).toString(16)}ie.prototype.toString=function(){var t=[],e=this.j;e&&t.push(be(e,Se,!0),":");var n=this.g;return(n||"file"==e)&&(t.push("//"),(e=this.o)&&t.push(be(e,Se,!0),"@"),t.push(encodeURIComponent(String(n)).replace(/%25([0-9a-fA-F]{2})/g,"%$1")),null!=(n=this.s)&&t.push(":",String(n))),(n=this.l)&&(this.g&&"/"!=n.charAt(0)&&t.push("/"),t.push(be(n,"/"==n.charAt(0)?Ee:_e,!0))),(n=this.i.toString())&&t.push("?",n),(n=this.m)&&t.push("#",be(n,xe)),t.join("")};var Se=/[#\/\?@]/g,_e=/[#\?:]/g,Ee=/[#\?]/g,Ie=/[#\?@]/g,xe=/#/g;function Ae(t,e){this.h=this.g=null,this.i=t||null,this.j=!!e}function ke(t){t.g||(t.g=new Map,t.h=0,t.i&&function(t,e){if(t){t=t.split("&");for(var n=0;n<t.length;n++){var i=t[n].indexOf("="),s=null;if(0<=i){var r=t[n].substring(0,i);s=t[n].substring(i+1)}else r=t[n];e(r,s?decodeURIComponent(s.replace(/\+/g," ")):"")}}}(t.i,function(e,n){t.add(decodeURIComponent(e.replace(/\+/g," ")),n)}))}function Ce(t,e){ke(t),e=Ne(t,e),t.g.has(e)&&(t.i=null,t.h-=t.g.get(e).length,t.g.delete(e))}function De(t,e){return ke(t),e=Ne(t,e),t.g.has(e)}function Me(t,e,n){Ce(t,e),0<n.length&&(t.i=null,t.g.set(Ne(t,e),d(n)),t.h+=n.length)}function Ne(t,e){return e=String(e),t.j&&(e=e.toLowerCase()),e}function Le(t,e,n,i,s){try{s&&(s.onload=null,s.onerror=null,s.onabort=null,s.ontimeout=null),i(n)}catch(r){}}function Re(){this.g=new ut}function Pe(t,e,n){const i=n||"";try{ee(t,function(t,n){let s=t;a(t)&&(s=ct(t)),e.push(i+n+"="+encodeURIComponent(s))})}catch(s){throw e.push(i+"type="+encodeURIComponent("_badmap")),s}}function Oe(t){this.l=t.Ub||null,this.j=t.eb||!1}function Fe(t,e){tt.call(this),this.D=t,this.o=e,this.m=void 0,this.status=this.readyState=0,this.responseType=this.responseText=this.response=this.statusText="",this.onreadystatechange=null,this.u=new Headers,this.h=null,this.B="GET",this.A="",this.g=!1,this.v=this.j=this.l=null}function Ve(t){t.j.read().then(t.Pa.bind(t)).catch(t.ga.bind(t))}function Be(t){t.readyState=4,t.l=null,t.j=null,t.v=null,Ue(t)}function Ue(t){t.onreadystatechange&&t.onreadystatechange.call(t)}function $e(t){let e="";return v(t,function(t,n){e+=n,e+=":",e+=t,e+="\r\n"}),e}function Ge(t,e,n){t:{for(i in n){var i=!1;break t}i=!0}i||(n=$e(n),"string"==typeof t?null!=n&&encodeURIComponent(String(n)):ye(t,e,n))}function qe(t){tt.call(this),this.headers=new Map,this.o=t||null,this.h=!1,this.v=this.g=null,this.D="",this.m=0,this.l="",this.j=this.B=this.u=this.A=!1,this.I=null,this.H="",this.J=!1}(t=Ae.prototype).add=function(t,e){ke(this),this.i=null,t=Ne(this,t);var n=this.g.get(t);return n||this.g.set(t,n=[]),n.push(e),this.h+=1,this},t.forEach=function(t,e){ke(this),this.g.forEach(function(n,i){n.forEach(function(n){t.call(e,n,i,this)},this)},this)},t.na=function(){ke(this);const t=Array.from(this.g.values()),e=Array.from(this.g.keys()),n=[];for(let i=0;i<e.length;i++){const s=t[i];for(let t=0;t<s.length;t++)n.push(e[i])}return n},t.V=function(t){ke(this);let e=[];if("string"==typeof t)De(this,t)&&(e=e.concat(this.g.get(Ne(this,t))));else{t=Array.from(this.g.values());for(let n=0;n<t.length;n++)e=e.concat(t[n])}return e},t.set=function(t,e){return ke(this),this.i=null,De(this,t=Ne(this,t))&&(this.h-=this.g.get(t).length),this.g.set(t,[e]),this.h+=1,this},t.get=function(t,e){return t&&0<(t=this.V(t)).length?String(t[0]):e},t.toString=function(){if(this.i)return this.i;if(!this.g)return"";const t=[],e=Array.from(this.g.keys());for(var n=0;n<e.length;n++){var i=e[n];const r=encodeURIComponent(String(i)),a=this.V(i);for(i=0;i<a.length;i++){var s=r;""!==a[i]&&(s+="="+encodeURIComponent(String(a[i]))),t.push(s)}}return this.i=t.join("&")},u(Oe,dt),Oe.prototype.g=function(){return new Fe(this.l,this.j)},Oe.prototype.i=function(t){return function(){return t}}({}),u(Fe,tt),(t=Fe.prototype).open=function(t,e){if(0!=this.readyState)throw this.abort(),Error("Error reopening a connection");this.B=t,this.A=e,this.readyState=1,Ue(this)},t.send=function(t){if(1!=this.readyState)throw this.abort(),Error("need to call open() first. ");this.g=!0;const e={headers:this.u,method:this.B,credentials:this.m,cache:void 0};t&&(e.body=t),(this.D||s).fetch(new Request(this.A,e)).then(this.Sa.bind(this),this.ga.bind(this))},t.abort=function(){this.response=this.responseText="",this.u=new Headers,this.status=0,this.j&&this.j.cancel("Request was aborted.").catch(()=>{}),1<=this.readyState&&this.g&&4!=this.readyState&&(this.g=!1,Be(this)),this.readyState=0},t.Sa=function(t){if(this.g&&(this.l=t,this.h||(this.status=this.l.status,this.statusText=this.l.statusText,this.h=t.headers,this.readyState=2,Ue(this)),this.g&&(this.readyState=3,Ue(this),this.g)))if("arraybuffer"===this.responseType)t.arrayBuffer().then(this.Qa.bind(this),this.ga.bind(this));else if(void 0!==s.ReadableStream&&"body"in t){if(this.j=t.body.getReader(),this.o){if(this.responseType)throw Error('responseType must be empty for "streamBinaryChunks" mode responses.');this.response=[]}else this.response=this.responseText="",this.v=new TextDecoder;Ve(this)}else t.text().then(this.Ra.bind(this),this.ga.bind(this))},t.Pa=function(t){if(this.g){if(this.o&&t.value)this.response.push(t.value);else if(!this.o){var e=t.value?t.value:new Uint8Array(0);(e=this.v.decode(e,{stream:!t.done}))&&(this.response=this.responseText+=e)}t.done?Be(this):Ue(this),3==this.readyState&&Ve(this)}},t.Ra=function(t){this.g&&(this.response=this.responseText=t,Be(this))},t.Qa=function(t){this.g&&(this.response=t,Be(this))},t.ga=function(){this.g&&Be(this)},t.setRequestHeader=function(t,e){this.u.append(t,e)},t.getResponseHeader=function(t){return this.h&&this.h.get(t.toLowerCase())||""},t.getAllResponseHeaders=function(){if(!this.h)return"";const t=[],e=this.h.entries();for(var n=e.next();!n.done;)n=n.value,t.push(n[0]+": "+n[1]),n=e.next();return t.join("\r\n")},Object.defineProperty(Fe.prototype,"withCredentials",{get:function(){return"include"===this.m},set:function(t){this.m=t?"include":"same-origin"}}),u(qe,tt);var je=/^https?$/i,He=["POST","PUT"];function ze(t,e){t.h=!1,t.g&&(t.j=!0,t.g.abort(),t.j=!1),t.l=e,t.m=5,Ke(t),Qe(t)}function Ke(t){t.A||(t.A=!0,et(t,"complete"),et(t,"error"))}function We(t){if(t.h&&void 0!==i&&(!t.v[1]||4!=Ye(t)||2!=t.Z()))if(t.u&&4==Ye(t))it(t.Ea,0,t);else if(et(t,"readystatechange"),4==Ye(t)){t.h=!1;try{const i=t.Z();t:switch(i){case 200:case 201:case 202:case 204:case 206:case 304:case 1223:var e=!0;break t;default:e=!1}var n;if(!(n=e)){var r;if(r=0===i){var a=String(t.D).match(ne)[1]||null;!a&&s.self&&s.self.location&&(a=s.self.location.protocol.slice(0,-1)),r=!je.test(a?a.toLowerCase():"")}n=r}if(n)et(t,"complete"),et(t,"success");else{t.m=6;try{var o=2<Ye(t)?t.g.statusText:""}catch(h){o=""}t.l=o+" ["+t.Z()+"]",Ke(t)}}finally{Qe(t)}}}function Qe(t,e){if(t.g){Xe(t);const i=t.g,s=t.v[0]?()=>{}:null;t.g=null,t.v=null,e||et(t,"ready");try{i.onreadystatechange=s}catch(n){}}}function Xe(t){t.I&&(s.clearTimeout(t.I),t.I=null)}function Ye(t){return t.g?t.g.readyState:0}function Je(t){try{if(!t.g)return null;if("response"in t.g)return t.g.response;switch(t.H){case"":case"text":return t.g.responseText;case"arraybuffer":if("mozResponseArrayBuffer"in t.g)return t.g.mozResponseArrayBuffer}return null}catch(e){return null}}function Ze(t,e,n){return n&&n.internalChannelParams&&n.internalChannelParams[t]||e}function tn(t){this.Aa=0,this.i=[],this.j=new At,this.ia=this.qa=this.I=this.W=this.g=this.ya=this.D=this.H=this.m=this.S=this.o=null,this.Ya=this.U=0,this.Va=Ze("failFast",!1,t),this.F=this.C=this.u=this.s=this.l=null,this.X=!0,this.za=this.T=-1,this.Y=this.v=this.B=0,this.Ta=Ze("baseRetryDelayMs",5e3,t),this.cb=Ze("retryDelaySeedMs",1e4,t),this.Wa=Ze("forwardChannelMaxRetries",2,t),this.wa=Ze("forwardChannelRequestTimeoutMs",2e4,t),this.pa=t&&t.xmlHttpFactory||void 0,this.Xa=t&&t.Tb||void 0,this.Ca=t&&t.useFetchStreams||!1,this.L=void 0,this.J=t&&t.supportsCrossDomainXhr||!1,this.K="",this.h=new Wt(t&&t.concurrentRequestLimit),this.Da=new Re,this.P=t&&t.fastHandshake||!1,this.O=t&&t.encodeInitMessageHeaders||!1,this.P&&this.O&&(this.O=!1),this.Ua=t&&t.Rb||!1,t&&t.xa&&this.j.xa(),t&&t.forceLongPolling&&(this.X=!1),this.ba=!this.P&&this.X&&t&&t.detectBufferingProxy||!1,this.ja=void 0,t&&t.longPollingTimeout&&0<t.longPollingTimeout&&(this.ja=t.longPollingTimeout),this.ca=void 0,this.R=0,this.M=!1,this.ka=this.A=null}function en(t){if(sn(t),3==t.G){var e=t.U++,n=se(t.I);if(ye(n,"SID",t.K),ye(n,"RID",e),ye(n,"TYPE","terminate"),on(t,n),(e=new Lt(t,t.j,e)).L=2,e.v=ve(se(n)),n=!1,s.navigator&&s.navigator.sendBeacon)try{n=s.navigator.sendBeacon(e.v.toString(),"")}catch(i){}!n&&s.Image&&((new Image).src=e.v,n=!0),n||(e.g=wn(e.j,null),e.g.ea(e.v)),e.F=Date.now(),$t(e)}yn(t)}function nn(t){t.g&&(un(t),t.g.cancel(),t.g=null)}function sn(t){nn(t),t.u&&(s.clearTimeout(t.u),t.u=null),fn(t),t.h.cancel(),t.s&&("number"==typeof t.s&&s.clearTimeout(t.s),t.s=null)}function rn(t){if(!Qt(t.h)&&!t.s){t.s=!0;var e=t.Ga;A||D(),k||(A(),k=!0),C.add(e,t),t.B=0}}function an(t,e){var n;n=e?e.l:t.U++;const i=se(t.I);ye(i,"SID",t.K),ye(i,"RID",n),ye(i,"AID",t.T),on(t,i),t.m&&t.o&&Ge(i,t.m,t.o),n=new Lt(t,t.j,n,t.B+1),null===t.m&&(n.H=t.o),e&&(t.i=e.D.concat(t.i)),e=hn(t,n,1e3),n.I=Math.round(.5*t.wa)+Math.round(.5*t.wa*Math.random()),Jt(t.h,n),Ft(n,i,e)}function on(t,e){t.H&&v(t.H,function(t,n){ye(e,n,t)}),t.l&&ee({},function(t,n){ye(e,n,t)})}function hn(t,e,n){n=Math.min(t.i.length,n);var i=t.l?c(t.l.Na,t.l,t):null;t:{var s=t.i;let e=-1;for(;;){const t=["count="+n];-1==e?0<n?(e=s[0].g,t.push("ofs="+e)):e=0:t.push("ofs="+e);let a=!0;for(let o=0;o<n;o++){let n=s[o].g;const h=s[o].map;if(n-=e,0>n)e=Math.max(0,s[o].g-100),a=!1;else try{Pe(h,t,"req"+n+"_")}catch(r){i&&i(h)}}if(a){i=t.join("&");break t}}}return t=t.i.splice(0,n),e.D=t,i}function cn(t){if(!t.g&&!t.u){t.Y=1;var e=t.Fa;A||D(),k||(A(),k=!0),C.add(e,t),t.v=0}}function ln(t){return!(t.g||t.u||3<=t.v)&&(t.Y++,t.u=xt(c(t.Fa,t),mn(t,t.v)),t.v++,!0)}function un(t){null!=t.A&&(s.clearTimeout(t.A),t.A=null)}function dn(t){t.g=new Lt(t,t.j,"rpc",t.Y),null===t.m&&(t.g.H=t.o),t.g.O=0;var e=se(t.qa);ye(e,"RID","rpc"),ye(e,"SID",t.K),ye(e,"AID",t.T),ye(e,"CI",t.F?"0":"1"),!t.F&&t.ja&&ye(e,"TO",t.ja),ye(e,"TYPE","xmlhttp"),on(t,e),t.m&&t.o&&Ge(e,t.m,t.o),t.L&&(t.g.I=t.L);var n=t.g;t=t.ia,n.L=1,n.v=ve(se(e)),n.m=null,n.P=!0,Vt(n,t)}function fn(t){null!=t.C&&(s.clearTimeout(t.C),t.C=null)}function pn(t,e){var n=null;if(t.g==e){fn(t),un(t),t.g=null;var i=2}else{if(!Yt(t.h,e))return;n=e.D,Zt(t.h,e),i=1}if(0!=t.G)if(e.o)if(1==i){n=e.m?e.m.length:0,e=Date.now()-e.F;var s=t.B;et(i=bt(),new It(i,n)),rn(t)}else cn(t);else if(3==(s=e.s)||0==s&&0<e.X||!(1==i&&function(t,e){return!(Xt(t.h)>=t.h.j-(t.s?1:0)||(t.s?(t.i=e.D.concat(t.i),0):1==t.G||2==t.G||t.B>=(t.Va?0:t.Wa)||(t.s=xt(c(t.Ga,t,e),mn(t,t.B)),t.B++,0)))}(t,e)||2==i&&ln(t)))switch(n&&0<n.length&&(e=t.h,e.i=e.i.concat(n)),s){case 1:gn(t,5);break;case 4:gn(t,10);break;case 3:gn(t,6);break;default:gn(t,2)}}function mn(t,e){let n=t.Ta+Math.floor(Math.random()*t.cb);return t.isActive()||(n*=2),n*e}function gn(t,e){if(t.j.info("Error code "+e),2==e){var n=c(t.fb,t),i=t.Xa;const e=!i;i=new ie(i||"//www.google.com/images/cleardot.gif"),s.location&&"http"==s.location.protocol||pe(i,"https"),ve(i),e?function(t,e){const n=new At;if(s.Image){const i=new Image;i.onload=l(Le,n,"TestLoadImage: loaded",!0,e,i),i.onerror=l(Le,n,"TestLoadImage: error",!1,e,i),i.onabort=l(Le,n,"TestLoadImage: abort",!1,e,i),i.ontimeout=l(Le,n,"TestLoadImage: timeout",!1,e,i),s.setTimeout(function(){i.ontimeout&&i.ontimeout()},1e4),i.src=t}else e(!1)}(i.toString(),n):function(t,e){new At;const n=new AbortController,i=setTimeout(()=>{n.abort(),Le(0,0,!1,e)},1e4);fetch(t,{signal:n.signal}).then(t=>{clearTimeout(i),t.ok?Le(0,0,!0,e):Le(0,0,!1,e)}).catch(()=>{clearTimeout(i),Le(0,0,!1,e)})}(i.toString(),n)}else Et(2);t.G=0,t.l&&t.l.sa(e),yn(t),sn(t)}function yn(t){if(t.G=0,t.ka=[],t.l){const e=te(t.h);0==e.length&&0==t.i.length||(f(t.ka,e),f(t.ka,t.i),t.h.i.length=0,d(t.i),t.i.length=0),t.l.ra()}}function vn(t,e,n){var i=n instanceof ie?se(n):new ie(n);if(""!=i.g)e&&(i.g=e+"."+i.g),me(i,i.s);else{var r=s.location;i=r.protocol,e=e?e+"."+r.hostname:r.hostname,r=+r.port;var a=new ie(null);i&&pe(a,i),e&&(a.g=e),r&&me(a,r),n&&(a.l=n),i=a}return n=t.D,e=t.ya,n&&e&&ye(i,n,e),ye(i,"VER",t.la),on(t,i),i}function wn(t,e,n){if(e&&!t.J)throw Error("Can't create secondary domain capable XhrIo object.");return(e=t.Ca&&!t.pa?new qe(new Oe({eb:n})):new qe(t.pa)).Ha(t.J),e}function bn(){}function Tn(){}function Sn(t,e){tt.call(this),this.g=new tn(e),this.l=t,this.h=e&&e.messageUrlParams||null,t=e&&e.messageHeaders||null,e&&e.clientProtocolHeaderRequired&&(t?t["X-Client-Protocol"]="webchannel":t={"X-Client-Protocol":"webchannel"}),this.g.o=t,t=e&&e.initMessageHeaders||null,e&&e.messageContentType&&(t?t["X-WebChannel-Content-Type"]=e.messageContentType:t={"X-WebChannel-Content-Type":e.messageContentType}),e&&e.va&&(t?t["X-WebChannel-Client-Profile"]=e.va:t={"X-WebChannel-Client-Profile":e.va}),this.g.S=t,(t=e&&e.Sb)&&!p(t)&&(this.g.m=t),this.v=e&&e.supportsCrossDomainXhr||!1,this.u=e&&e.sendRawJson||!1,(e=e&&e.httpSessionIdParam)&&!p(e)&&(this.g.D=e,null!==(t=this.h)&&e in t&&(e in(t=this.h)&&delete t[e])),this.j=new In(this)}function _n(t){gt.call(this),t.__headers__&&(this.headers=t.__headers__,this.statusCode=t.__status__,delete t.__headers__,delete t.__status__);var e=t.__sm__;if(e){t:{for(const n in e){t=n;break t}t=void 0}(this.i=t)&&(t=this.i,e=null!==e&&t in e?e[t]:void 0),this.data=e}else this.data=t}function En(){yt.call(this),this.status=1}function In(t){this.g=t}(t=qe.prototype).Ha=function(t){this.J=t},t.ea=function(t,e,n,i){if(this.g)throw Error("[goog.net.XhrIo] Object is active with another request="+this.D+"; newUri="+t);e=e?e.toUpperCase():"GET",this.D=t,this.l="",this.m=0,this.A=!1,this.h=!0,this.g=this.o?this.o.g():Ct.g(),this.v=this.o?ft(this.o):ft(Ct),this.g.onreadystatechange=c(this.Ea,this);try{this.B=!0,this.g.open(e,String(t),!0),this.B=!1}catch(a){return void ze(this,a)}if(t=n||"",n=new Map(this.headers),i)if(Object.getPrototypeOf(i)===Object.prototype)for(var r in i)n.set(r,i[r]);else{if("function"!=typeof i.keys||"function"!=typeof i.get)throw Error("Unknown input type for opt_headers: "+String(i));for(const t of i.keys())n.set(t,i.get(t))}i=Array.from(n.keys()).find(t=>"content-type"==t.toLowerCase()),r=s.FormData&&t instanceof s.FormData,!(0<=Array.prototype.indexOf.call(He,e,void 0))||i||r||n.set("Content-Type","application/x-www-form-urlencoded;charset=utf-8");for(const[s,o]of n)this.g.setRequestHeader(s,o);this.H&&(this.g.responseType=this.H),"withCredentials"in this.g&&this.g.withCredentials!==this.J&&(this.g.withCredentials=this.J);try{Xe(this),this.u=!0,this.g.send(t),this.u=!1}catch(a){ze(this,a)}},t.abort=function(t){this.g&&this.h&&(this.h=!1,this.j=!0,this.g.abort(),this.j=!1,this.m=t||7,et(this,"complete"),et(this,"abort"),Qe(this))},t.N=function(){this.g&&(this.h&&(this.h=!1,this.j=!0,this.g.abort(),this.j=!1),Qe(this,!0)),qe.aa.N.call(this)},t.Ea=function(){this.s||(this.B||this.u||this.j?We(this):this.bb())},t.bb=function(){We(this)},t.isActive=function(){return!!this.g},t.Z=function(){try{return 2<Ye(this)?this.g.status:-1}catch(t){return-1}},t.oa=function(){try{return this.g?this.g.responseText:""}catch(t){return""}},t.Oa=function(t){if(this.g){var e=this.g.responseText;return t&&0==e.indexOf(t)&&(e=e.substring(t.length)),lt(e)}},t.Ba=function(){return this.m},t.Ka=function(){return"string"==typeof this.l?this.l:String(this.l)},(t=tn.prototype).la=8,t.G=1,t.connect=function(t,e,n,i){Et(0),this.W=t,this.H=e||{},n&&void 0!==i&&(this.H.OSID=n,this.H.OAID=i),this.F=this.X,this.I=vn(this,null,this.W),rn(this)},t.Ga=function(t){if(this.s)if(this.s=null,1==this.G){if(!t){this.U=Math.floor(1e5*Math.random()),t=this.U++;const s=new Lt(this,this.j,t);let r=this.o;if(this.S&&(r?(r=w(r),T(r,this.S)):r=this.S),null!==this.m||this.O||(s.H=r,r=null),this.P)t:{for(var e=0,n=0;n<this.i.length;n++){var i=this.i[n];if(void 0===(i="__data__"in i.map&&"string"==typeof(i=i.map.__data__)?i.length:void 0))break;if(4096<(e+=i)){e=n;break t}if(4096===e||n===this.i.length-1){e=n+1;break t}}e=1e3}else e=1e3;e=hn(this,s,e),ye(n=se(this.I),"RID",t),ye(n,"CVER",22),this.D&&ye(n,"X-HTTP-Session-Id",this.D),on(this,n),r&&(this.O?e="headers="+encodeURIComponent(String($e(r)))+"&"+e:this.m&&Ge(n,this.m,r)),Jt(this.h,s),this.Ua&&ye(n,"TYPE","init"),this.P?(ye(n,"$req",e),ye(n,"SID","null"),s.T=!0,Ft(s,n,null)):Ft(s,n,e),this.G=2}}else 3==this.G&&(t?an(this,t):0==this.i.length||Qt(this.h)||an(this))},t.Fa=function(){if(this.u=null,dn(this),this.ba&&!(this.M||null==this.g||0>=this.R)){var t=2*this.R;this.j.info("BP detection timer enabled: "+t),this.A=xt(c(this.ab,this),t)}},t.ab=function(){this.A&&(this.A=null,this.j.info("BP detection timeout reached."),this.j.info("Buffering proxy detected and switch to long-polling!"),this.F=!1,this.M=!0,Et(10),nn(this),dn(this))},t.Za=function(){null!=this.C&&(this.C=null,nn(this),ln(this),Et(19))},t.fb=function(t){t?(this.j.info("Successfully pinged google.com"),Et(2)):(this.j.info("Failed to ping google.com"),Et(1))},t.isActive=function(){return!!this.l&&this.l.isActive(this)},(t=bn.prototype).ua=function(){},t.ta=function(){},t.sa=function(){},t.ra=function(){},t.isActive=function(){return!0},t.Na=function(){},Tn.prototype.g=function(t,e){return new Sn(t,e)},u(Sn,tt),Sn.prototype.m=function(){this.g.l=this.j,this.v&&(this.g.J=!0),this.g.connect(this.l,this.h||void 0)},Sn.prototype.close=function(){en(this.g)},Sn.prototype.o=function(t){var e=this.g;if("string"==typeof t){var n={};n.__data__=t,t=n}else this.u&&((n={}).__data__=ct(t),t=n);e.i.push(new Kt(e.Ya++,t)),3==e.G&&rn(e)},Sn.prototype.N=function(){this.g.l=null,delete this.j,en(this.g),delete this.g,Sn.aa.N.call(this)},u(_n,gt),u(En,yt),u(In,bn),In.prototype.ua=function(){et(this.g,"a")},In.prototype.ta=function(t){et(this.g,new _n(t))},In.prototype.sa=function(t){et(this.g,new En)},In.prototype.ra=function(){et(this.g,"b")},Tn.prototype.createWebChannel=Tn.prototype.g,Sn.prototype.send=Sn.prototype.o,Sn.prototype.open=Sn.prototype.m,Sn.prototype.close=Sn.prototype.close,de=function(){return new Tn},ue=function(){return bt()},le=vt,ce={mb:0,pb:1,qb:2,Jb:3,Ob:4,Lb:5,Mb:6,Kb:7,Ib:8,Nb:9,PROXY:10,NOPROXY:11,Gb:12,Cb:13,Db:14,Bb:15,Eb:16,Fb:17,ib:18,hb:19,jb:20},Dt.NO_ERROR=0,Dt.TIMEOUT=8,Dt.HTTP_ERROR=6,he=Dt,Mt.COMPLETE="complete",oe=Mt,pt.EventType=mt,mt.OPEN="a",mt.CLOSE="b",mt.ERROR="c",mt.MESSAGE="d",tt.prototype.listen=tt.prototype.K,ae=pt,qe.prototype.listenOnce=qe.prototype.L,qe.prototype.getLastError=qe.prototype.Ka,qe.prototype.getLastErrorCode=qe.prototype.Ba,qe.prototype.getStatus=qe.prototype.Z,qe.prototype.getResponseJson=qe.prototype.Oa,qe.prototype.getResponseText=qe.prototype.oa,qe.prototype.send=qe.prototype.ea,qe.prototype.setWithCredentials=qe.prototype.Ha,re=qe}).apply(void 0!==fe?fe:"undefined"!=typeof self?self:"undefined"!=typeof window?window:{});const pe="@firebase/firestore";
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class me{constructor(t){this.uid=t}isAuthenticated(){return null!=this.uid}toKey(){return this.isAuthenticated()?"uid:"+this.uid:"anonymous-user"}isEqual(t){return t.uid===this.uid}}me.UNAUTHENTICATED=new me(null),me.GOOGLE_CREDENTIALS=new me("google-credentials-uid"),me.FIRST_PARTY=new me("first-party-uid"),me.MOCK_USER=new me("mock-user");
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
let ge="10.14.0";
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const ye=new G("@firebase/firestore");function ve(){return ye.logLevel}function we(t,...e){if(ye.logLevel<=O.DEBUG){const n=e.map(Se);ye.debug(`Firestore (${ge}): ${t}`,...n)}}function be(t,...e){if(ye.logLevel<=O.ERROR){const n=e.map(Se);ye.error(`Firestore (${ge}): ${t}`,...n)}}function Te(t,...e){if(ye.logLevel<=O.WARN){const n=e.map(Se);ye.warn(`Firestore (${ge}): ${t}`,...n)}}function Se(t){if("string"==typeof t)return t;try{
/**
    * @license
    * Copyright 2020 Google LLC
    *
    * Licensed under the Apache License, Version 2.0 (the "License");
    * you may not use this file except in compliance with the License.
    * You may obtain a copy of the License at
    *
    *   http://www.apache.org/licenses/LICENSE-2.0
    *
    * Unless required by applicable law or agreed to in writing, software
    * distributed under the License is distributed on an "AS IS" BASIS,
    * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
    * See the License for the specific language governing permissions and
    * limitations under the License.
    */
return e=t,JSON.stringify(e)}catch(n){return t}var e}
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function _e(t="Unexpected state"){const e=`FIRESTORE (${ge}) INTERNAL ASSERTION FAILED: `+t;throw be(e),new Error(e)}function Ee(t,e){t||_e()}function Ie(t,e){return t}
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const xe={OK:"ok",CANCELLED:"cancelled",UNKNOWN:"unknown",INVALID_ARGUMENT:"invalid-argument",DEADLINE_EXCEEDED:"deadline-exceeded",NOT_FOUND:"not-found",ALREADY_EXISTS:"already-exists",PERMISSION_DENIED:"permission-denied",UNAUTHENTICATED:"unauthenticated",RESOURCE_EXHAUSTED:"resource-exhausted",FAILED_PRECONDITION:"failed-precondition",ABORTED:"aborted",OUT_OF_RANGE:"out-of-range",UNIMPLEMENTED:"unimplemented",INTERNAL:"internal",UNAVAILABLE:"unavailable",DATA_LOSS:"data-loss"};class Ae extends x{constructor(t,e){super(t,e),this.code=t,this.message=e,this.toString=()=>`${this.name}: [code=${this.code}]: ${this.message}`}}
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ke{constructor(){this.promise=new Promise((t,e)=>{this.resolve=t,this.reject=e})}}
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Ce{constructor(t,e){this.user=e,this.type="OAuth",this.headers=new Map,this.headers.set("Authorization",`Bearer ${t}`)}}class De{getToken(){return Promise.resolve(null)}invalidateToken(){}start(t,e){t.enqueueRetryable(()=>e(me.UNAUTHENTICATED))}shutdown(){}}class Me{constructor(t){this.token=t,this.changeListener=null}getToken(){return Promise.resolve(this.token)}invalidateToken(){}start(t,e){this.changeListener=e,t.enqueueRetryable(()=>e(this.token.user))}shutdown(){this.changeListener=null}}class Ne{constructor(t){this.t=t,this.currentUser=me.UNAUTHENTICATED,this.i=0,this.forceRefresh=!1,this.auth=null}start(t,e){Ee(void 0===this.o);let n=this.i;const i=t=>this.i!==n?(n=this.i,e(t)):Promise.resolve();let s=new ke;this.o=()=>{this.i++,this.currentUser=this.u(),s.resolve(),s=new ke,t.enqueueRetryable(()=>i(this.currentUser))};const r=()=>{const e=s;t.enqueueRetryable(async()=>{await e.promise,await i(this.currentUser)})},a=t=>{we("FirebaseAuthCredentialsProvider","Auth detected"),this.auth=t,this.o&&(this.auth.addAuthTokenListener(this.o),r())};this.t.onInit(t=>a(t)),setTimeout(()=>{if(!this.auth){const t=this.t.getImmediate({optional:!0});t?a(t):(we("FirebaseAuthCredentialsProvider","Auth not yet detected"),s.resolve(),s=new ke)}},0),r()}getToken(){const t=this.i,e=this.forceRefresh;return this.forceRefresh=!1,this.auth?this.auth.getToken(e).then(e=>this.i!==t?(we("FirebaseAuthCredentialsProvider","getToken aborted due to token change."),this.getToken()):e?(Ee("string"==typeof e.accessToken),new Ce(e.accessToken,this.currentUser)):null):Promise.resolve(null)}invalidateToken(){this.forceRefresh=!0}shutdown(){this.auth&&this.o&&this.auth.removeAuthTokenListener(this.o),this.o=void 0}u(){const t=this.auth&&this.auth.getUid();return Ee(null===t||"string"==typeof t),new me(t)}}class Le{constructor(t,e,n){this.l=t,this.h=e,this.P=n,this.type="FirstParty",this.user=me.FIRST_PARTY,this.I=new Map}T(){return this.P?this.P():null}get headers(){this.I.set("X-Goog-AuthUser",this.l);const t=this.T();return t&&this.I.set("Authorization",t),this.h&&this.I.set("X-Goog-Iam-Authorization-Token",this.h),this.I}}class Re{constructor(t,e,n){this.l=t,this.h=e,this.P=n}getToken(){return Promise.resolve(new Le(this.l,this.h,this.P))}start(t,e){t.enqueueRetryable(()=>e(me.FIRST_PARTY))}shutdown(){}invalidateToken(){}}class Pe{constructor(t){this.value=t,this.type="AppCheck",this.headers=new Map,t&&t.length>0&&this.headers.set("x-firebase-appcheck",this.value)}}class Oe{constructor(t){this.A=t,this.forceRefresh=!1,this.appCheck=null,this.R=null}start(t,e){Ee(void 0===this.o);const n=t=>{null!=t.error&&we("FirebaseAppCheckTokenProvider",`Error getting App Check token; using placeholder token instead. Error: ${t.error.message}`);const n=t.token!==this.R;return this.R=t.token,we("FirebaseAppCheckTokenProvider",`Received ${n?"new":"existing"} token.`),n?e(t.token):Promise.resolve()};this.o=e=>{t.enqueueRetryable(()=>n(e))};const i=t=>{we("FirebaseAppCheckTokenProvider","AppCheck detected"),this.appCheck=t,this.o&&this.appCheck.addTokenListener(this.o)};this.A.onInit(t=>i(t)),setTimeout(()=>{if(!this.appCheck){const t=this.A.getImmediate({optional:!0});t?i(t):we("FirebaseAppCheckTokenProvider","AppCheck not yet detected")}},0)}getToken(){const t=this.forceRefresh;return this.forceRefresh=!1,this.appCheck?this.appCheck.getToken(t).then(t=>t?(Ee("string"==typeof t.token),this.R=t.token,new Pe(t.token)):null):Promise.resolve(null)}invalidateToken(){this.forceRefresh=!0}shutdown(){this.appCheck&&this.o&&this.appCheck.removeTokenListener(this.o),this.o=void 0}}
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Fe(t){const e="undefined"!=typeof self&&(self.crypto||self.msCrypto),n=new Uint8Array(t);if(e&&"function"==typeof e.getRandomValues)e.getRandomValues(n);else for(let i=0;i<t;i++)n[i]=Math.floor(256*Math.random());return n}
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Ve{static newId(){const t="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789",e=62*Math.floor(256/62);let n="";for(;n.length<20;){const i=Fe(40);for(let s=0;s<i.length;++s)n.length<20&&i[s]<e&&(n+=t.charAt(i[s]%62))}return n}}function Be(t,e){return t<e?-1:t>e?1:0}function Ue(t,e,n){return t.length===e.length&&t.every((t,i)=>n(t,e[i]))}
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class $e{constructor(t,e){if(this.seconds=t,this.nanoseconds=e,e<0)throw new Ae(xe.INVALID_ARGUMENT,"Timestamp nanoseconds out of range: "+e);if(e>=1e9)throw new Ae(xe.INVALID_ARGUMENT,"Timestamp nanoseconds out of range: "+e);if(t<-62135596800)throw new Ae(xe.INVALID_ARGUMENT,"Timestamp seconds out of range: "+t);if(t>=253402300800)throw new Ae(xe.INVALID_ARGUMENT,"Timestamp seconds out of range: "+t)}static now(){return $e.fromMillis(Date.now())}static fromDate(t){return $e.fromMillis(t.getTime())}static fromMillis(t){const e=Math.floor(t/1e3),n=Math.floor(1e6*(t-1e3*e));return new $e(e,n)}toDate(){return new Date(this.toMillis())}toMillis(){return 1e3*this.seconds+this.nanoseconds/1e6}_compareTo(t){return this.seconds===t.seconds?Be(this.nanoseconds,t.nanoseconds):Be(this.seconds,t.seconds)}isEqual(t){return t.seconds===this.seconds&&t.nanoseconds===this.nanoseconds}toString(){return"Timestamp(seconds="+this.seconds+", nanoseconds="+this.nanoseconds+")"}toJSON(){return{seconds:this.seconds,nanoseconds:this.nanoseconds}}valueOf(){const t=this.seconds- -62135596800;return String(t).padStart(12,"0")+"."+String(this.nanoseconds).padStart(9,"0")}}
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Ge{constructor(t){this.timestamp=t}static fromTimestamp(t){return new Ge(t)}static min(){return new Ge(new $e(0,0))}static max(){return new Ge(new $e(253402300799,999999999))}compareTo(t){return this.timestamp._compareTo(t.timestamp)}isEqual(t){return this.timestamp.isEqual(t.timestamp)}toMicroseconds(){return 1e6*this.timestamp.seconds+this.timestamp.nanoseconds/1e3}toString(){return"SnapshotVersion("+this.timestamp.toString()+")"}toTimestamp(){return this.timestamp}}
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class qe{constructor(t,e,n){void 0===e?e=0:e>t.length&&_e(),void 0===n?n=t.length-e:n>t.length-e&&_e(),this.segments=t,this.offset=e,this.len=n}get length(){return this.len}isEqual(t){return 0===qe.comparator(this,t)}child(t){const e=this.segments.slice(this.offset,this.limit());return t instanceof qe?t.forEach(t=>{e.push(t)}):e.push(t),this.construct(e)}limit(){return this.offset+this.length}popFirst(t){return t=void 0===t?1:t,this.construct(this.segments,this.offset+t,this.length-t)}popLast(){return this.construct(this.segments,this.offset,this.length-1)}firstSegment(){return this.segments[this.offset]}lastSegment(){return this.get(this.length-1)}get(t){return this.segments[this.offset+t]}isEmpty(){return 0===this.length}isPrefixOf(t){if(t.length<this.length)return!1;for(let e=0;e<this.length;e++)if(this.get(e)!==t.get(e))return!1;return!0}isImmediateParentOf(t){if(this.length+1!==t.length)return!1;for(let e=0;e<this.length;e++)if(this.get(e)!==t.get(e))return!1;return!0}forEach(t){for(let e=this.offset,n=this.limit();e<n;e++)t(this.segments[e])}toArray(){return this.segments.slice(this.offset,this.limit())}static comparator(t,e){const n=Math.min(t.length,e.length);for(let i=0;i<n;i++){const n=t.get(i),s=e.get(i);if(n<s)return-1;if(n>s)return 1}return t.length<e.length?-1:t.length>e.length?1:0}}class je extends qe{construct(t,e,n){return new je(t,e,n)}canonicalString(){return this.toArray().join("/")}toString(){return this.canonicalString()}toUriEncodedString(){return this.toArray().map(encodeURIComponent).join("/")}static fromString(...t){const e=[];for(const n of t){if(n.indexOf("//")>=0)throw new Ae(xe.INVALID_ARGUMENT,`Invalid segment (${n}). Paths must not contain // in them.`);e.push(...n.split("/").filter(t=>t.length>0))}return new je(e)}static emptyPath(){return new je([])}}const He=/^[_a-zA-Z][_a-zA-Z0-9]*$/;class ze extends qe{construct(t,e,n){return new ze(t,e,n)}static isValidIdentifier(t){return He.test(t)}canonicalString(){return this.toArray().map(t=>(t=t.replace(/\\/g,"\\\\").replace(/`/g,"\\`"),ze.isValidIdentifier(t)||(t="`"+t+"`"),t)).join(".")}toString(){return this.canonicalString()}isKeyField(){return 1===this.length&&"__name__"===this.get(0)}static keyField(){return new ze(["__name__"])}static fromServerFormat(t){const e=[];let n="",i=0;const s=()=>{if(0===n.length)throw new Ae(xe.INVALID_ARGUMENT,`Invalid field path (${t}). Paths must not be empty, begin with '.', end with '.', or contain '..'`);e.push(n),n=""};let r=!1;for(;i<t.length;){const e=t[i];if("\\"===e){if(i+1===t.length)throw new Ae(xe.INVALID_ARGUMENT,"Path has trailing escape character: "+t);const e=t[i+1];if("\\"!==e&&"."!==e&&"`"!==e)throw new Ae(xe.INVALID_ARGUMENT,"Path has invalid escape sequence: "+t);n+=e,i+=2}else"`"===e?(r=!r,i++):"."!==e||r?(n+=e,i++):(s(),i++)}if(s(),r)throw new Ae(xe.INVALID_ARGUMENT,"Unterminated ` in path: "+t);return new ze(e)}static emptyPath(){return new ze([])}}
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Ke{constructor(t){this.path=t}static fromPath(t){return new Ke(je.fromString(t))}static fromName(t){return new Ke(je.fromString(t).popFirst(5))}static empty(){return new Ke(je.emptyPath())}get collectionGroup(){return this.path.popLast().lastSegment()}hasCollectionId(t){return this.path.length>=2&&this.path.get(this.path.length-2)===t}getCollectionGroup(){return this.path.get(this.path.length-2)}getCollectionPath(){return this.path.popLast()}isEqual(t){return null!==t&&0===je.comparator(this.path,t.path)}toString(){return this.path.toString()}static comparator(t,e){return je.comparator(t.path,e.path)}static isDocumentKey(t){return t.length%2==0}static fromSegments(t){return new Ke(new je(t.slice()))}}function We(t){return new Qe(t.readTime,t.key,-1)}class Qe{constructor(t,e,n){this.readTime=t,this.documentKey=e,this.largestBatchId=n}static min(){return new Qe(Ge.min(),Ke.empty(),-1)}static max(){return new Qe(Ge.max(),Ke.empty(),-1)}}function Xe(t,e){let n=t.readTime.compareTo(e.readTime);return 0!==n?n:(n=Ke.comparator(t.documentKey,e.documentKey),0!==n?n:Be(t.largestBatchId,e.largestBatchId)
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */)}class Ye{constructor(){this.onCommittedListeners=[]}addOnCommittedListener(t){this.onCommittedListeners.push(t)}raiseOnCommittedEvent(){this.onCommittedListeners.forEach(t=>t())}}
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function Je(t){if(t.code!==xe.FAILED_PRECONDITION||"The current tab is not in the required state to perform this operation. It might be necessary to refresh the browser tab."!==t.message)throw t;we("LocalStore","Unexpectedly lost primary lease")}
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Ze{constructor(t){this.nextCallback=null,this.catchCallback=null,this.result=void 0,this.error=void 0,this.isDone=!1,this.callbackAttached=!1,t(t=>{this.isDone=!0,this.result=t,this.nextCallback&&this.nextCallback(t)},t=>{this.isDone=!0,this.error=t,this.catchCallback&&this.catchCallback(t)})}catch(t){return this.next(void 0,t)}next(t,e){return this.callbackAttached&&_e(),this.callbackAttached=!0,this.isDone?this.error?this.wrapFailure(e,this.error):this.wrapSuccess(t,this.result):new Ze((n,i)=>{this.nextCallback=e=>{this.wrapSuccess(t,e).next(n,i)},this.catchCallback=t=>{this.wrapFailure(e,t).next(n,i)}})}toPromise(){return new Promise((t,e)=>{this.next(t,e)})}wrapUserFunction(t){try{const e=t();return e instanceof Ze?e:Ze.resolve(e)}catch(e){return Ze.reject(e)}}wrapSuccess(t,e){return t?this.wrapUserFunction(()=>t(e)):Ze.resolve(e)}wrapFailure(t,e){return t?this.wrapUserFunction(()=>t(e)):Ze.reject(e)}static resolve(t){return new Ze((e,n)=>{e(t)})}static reject(t){return new Ze((e,n)=>{n(t)})}static waitFor(t){return new Ze((e,n)=>{let i=0,s=0,r=!1;t.forEach(t=>{++i,t.next(()=>{++s,r&&s===i&&e()},t=>n(t))}),r=!0,s===i&&e()})}static or(t){let e=Ze.resolve(!1);for(const n of t)e=e.next(t=>t?Ze.resolve(t):n());return e}static forEach(t,e){const n=[];return t.forEach((t,i)=>{n.push(e.call(this,t,i))}),this.waitFor(n)}static mapArray(t,e){return new Ze((n,i)=>{const s=t.length,r=new Array(s);let a=0;for(let o=0;o<s;o++){const h=o;e(t[h]).next(t=>{r[h]=t,++a,a===s&&n(r)},t=>i(t))}})}static doWhile(t,e){return new Ze((n,i)=>{const s=()=>{!0===t()?e().next(()=>{s()},i):n()};s()})}}function tn(t){return"IndexedDbTransactionError"===t.name}
/**
 * @license
 * Copyright 2018 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class en{constructor(t,e){this.previousValue=t,e&&(e.sequenceNumberHandler=t=>this.ie(t),this.se=t=>e.writeSequenceNumber(t))}ie(t){return this.previousValue=Math.max(t,this.previousValue),this.previousValue}next(){const t=++this.previousValue;return this.se&&this.se(t),t}}function nn(t){return null==t}function sn(t){return 0===t&&1/t==-1/0}
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
function rn(t){let e=0;for(const n in t)Object.prototype.hasOwnProperty.call(t,n)&&e++;return e}function an(t,e){for(const n in t)Object.prototype.hasOwnProperty.call(t,n)&&e(n,t[n])}function on(t){for(const e in t)if(Object.prototype.hasOwnProperty.call(t,e))return!1;return!0}
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */en.oe=-1;class hn{constructor(t,e){this.comparator=t,this.root=e||ln.EMPTY}insert(t,e){return new hn(this.comparator,this.root.insert(t,e,this.comparator).copy(null,null,ln.BLACK,null,null))}remove(t){return new hn(this.comparator,this.root.remove(t,this.comparator).copy(null,null,ln.BLACK,null,null))}get(t){let e=this.root;for(;!e.isEmpty();){const n=this.comparator(t,e.key);if(0===n)return e.value;n<0?e=e.left:n>0&&(e=e.right)}return null}indexOf(t){let e=0,n=this.root;for(;!n.isEmpty();){const i=this.comparator(t,n.key);if(0===i)return e+n.left.size;i<0?n=n.left:(e+=n.left.size+1,n=n.right)}return-1}isEmpty(){return this.root.isEmpty()}get size(){return this.root.size}minKey(){return this.root.minKey()}maxKey(){return this.root.maxKey()}inorderTraversal(t){return this.root.inorderTraversal(t)}forEach(t){this.inorderTraversal((e,n)=>(t(e,n),!1))}toString(){const t=[];return this.inorderTraversal((e,n)=>(t.push(`${e}:${n}`),!1)),`{${t.join(", ")}}`}reverseTraversal(t){return this.root.reverseTraversal(t)}getIterator(){return new cn(this.root,null,this.comparator,!1)}getIteratorFrom(t){return new cn(this.root,t,this.comparator,!1)}getReverseIterator(){return new cn(this.root,null,this.comparator,!0)}getReverseIteratorFrom(t){return new cn(this.root,t,this.comparator,!0)}}class cn{constructor(t,e,n,i){this.isReverse=i,this.nodeStack=[];let s=1;for(;!t.isEmpty();)if(s=e?n(t.key,e):1,e&&i&&(s*=-1),s<0)t=this.isReverse?t.left:t.right;else{if(0===s){this.nodeStack.push(t);break}this.nodeStack.push(t),t=this.isReverse?t.right:t.left}}getNext(){let t=this.nodeStack.pop();const e={key:t.key,value:t.value};if(this.isReverse)for(t=t.left;!t.isEmpty();)this.nodeStack.push(t),t=t.right;else for(t=t.right;!t.isEmpty();)this.nodeStack.push(t),t=t.left;return e}hasNext(){return this.nodeStack.length>0}peek(){if(0===this.nodeStack.length)return null;const t=this.nodeStack[this.nodeStack.length-1];return{key:t.key,value:t.value}}}class ln{constructor(t,e,n,i,s){this.key=t,this.value=e,this.color=null!=n?n:ln.RED,this.left=null!=i?i:ln.EMPTY,this.right=null!=s?s:ln.EMPTY,this.size=this.left.size+1+this.right.size}copy(t,e,n,i,s){return new ln(null!=t?t:this.key,null!=e?e:this.value,null!=n?n:this.color,null!=i?i:this.left,null!=s?s:this.right)}isEmpty(){return!1}inorderTraversal(t){return this.left.inorderTraversal(t)||t(this.key,this.value)||this.right.inorderTraversal(t)}reverseTraversal(t){return this.right.reverseTraversal(t)||t(this.key,this.value)||this.left.reverseTraversal(t)}min(){return this.left.isEmpty()?this:this.left.min()}minKey(){return this.min().key}maxKey(){return this.right.isEmpty()?this.key:this.right.maxKey()}insert(t,e,n){let i=this;const s=n(t,i.key);return i=s<0?i.copy(null,null,null,i.left.insert(t,e,n),null):0===s?i.copy(null,e,null,null,null):i.copy(null,null,null,null,i.right.insert(t,e,n)),i.fixUp()}removeMin(){if(this.left.isEmpty())return ln.EMPTY;let t=this;return t.left.isRed()||t.left.left.isRed()||(t=t.moveRedLeft()),t=t.copy(null,null,null,t.left.removeMin(),null),t.fixUp()}remove(t,e){let n,i=this;if(e(t,i.key)<0)i.left.isEmpty()||i.left.isRed()||i.left.left.isRed()||(i=i.moveRedLeft()),i=i.copy(null,null,null,i.left.remove(t,e),null);else{if(i.left.isRed()&&(i=i.rotateRight()),i.right.isEmpty()||i.right.isRed()||i.right.left.isRed()||(i=i.moveRedRight()),0===e(t,i.key)){if(i.right.isEmpty())return ln.EMPTY;n=i.right.min(),i=i.copy(n.key,n.value,null,null,i.right.removeMin())}i=i.copy(null,null,null,null,i.right.remove(t,e))}return i.fixUp()}isRed(){return this.color}fixUp(){let t=this;return t.right.isRed()&&!t.left.isRed()&&(t=t.rotateLeft()),t.left.isRed()&&t.left.left.isRed()&&(t=t.rotateRight()),t.left.isRed()&&t.right.isRed()&&(t=t.colorFlip()),t}moveRedLeft(){let t=this.colorFlip();return t.right.left.isRed()&&(t=t.copy(null,null,null,null,t.right.rotateRight()),t=t.rotateLeft(),t=t.colorFlip()),t}moveRedRight(){let t=this.colorFlip();return t.left.left.isRed()&&(t=t.rotateRight(),t=t.colorFlip()),t}rotateLeft(){const t=this.copy(null,null,ln.RED,null,this.right.left);return this.right.copy(null,null,this.color,t,null)}rotateRight(){const t=this.copy(null,null,ln.RED,this.left.right,null);return this.left.copy(null,null,this.color,null,t)}colorFlip(){const t=this.left.copy(null,null,!this.left.color,null,null),e=this.right.copy(null,null,!this.right.color,null,null);return this.copy(null,null,!this.color,t,e)}checkMaxDepth(){const t=this.check();return Math.pow(2,t)<=this.size+1}check(){if(this.isRed()&&this.left.isRed())throw _e();if(this.right.isRed())throw _e();const t=this.left.check();if(t!==this.right.check())throw _e();return t+(this.isRed()?0:1)}}ln.EMPTY=null,ln.RED=!0,ln.BLACK=!1,ln.EMPTY=new class{constructor(){this.size=0}get key(){throw _e()}get value(){throw _e()}get color(){throw _e()}get left(){throw _e()}get right(){throw _e()}copy(t,e,n,i,s){return this}insert(t,e,n){return new ln(t,e)}remove(t,e){return this}isEmpty(){return!0}inorderTraversal(t){return!1}reverseTraversal(t){return!1}minKey(){return null}maxKey(){return null}isRed(){return!1}checkMaxDepth(){return!0}check(){return 0}};
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
class un{constructor(t){this.comparator=t,this.data=new hn(this.comparator)}has(t){return null!==this.data.get(t)}first(){return this.data.minKey()}last(){return this.data.maxKey()}get size(){return this.data.size}indexOf(t){return this.data.indexOf(t)}forEach(t){this.data.inorderTraversal((e,n)=>(t(e),!1))}forEachInRange(t,e){const n=this.data.getIteratorFrom(t[0]);for(;n.hasNext();){const i=n.getNext();if(this.comparator(i.key,t[1])>=0)return;e(i.key)}}forEachWhile(t,e){let n;for(n=void 0!==e?this.data.getIteratorFrom(e):this.data.getIterator();n.hasNext();)if(!t(n.getNext().key))return}firstAfterOrEqual(t){const e=this.data.getIteratorFrom(t);return e.hasNext()?e.getNext().key:null}getIterator(){return new dn(this.data.getIterator())}getIteratorFrom(t){return new dn(this.data.getIteratorFrom(t))}add(t){return this.copy(this.data.remove(t).insert(t,!0))}delete(t){return this.has(t)?this.copy(this.data.remove(t)):this}isEmpty(){return this.data.isEmpty()}unionWith(t){let e=this;return e.size<t.size&&(e=t,t=this),t.forEach(t=>{e=e.add(t)}),e}isEqual(t){if(!(t instanceof un))return!1;if(this.size!==t.size)return!1;const e=this.data.getIterator(),n=t.data.getIterator();for(;e.hasNext();){const t=e.getNext().key,i=n.getNext().key;if(0!==this.comparator(t,i))return!1}return!0}toArray(){const t=[];return this.forEach(e=>{t.push(e)}),t}toString(){const t=[];return this.forEach(e=>t.push(e)),"SortedSet("+t.toString()+")"}copy(t){const e=new un(this.comparator);return e.data=t,e}}class dn{constructor(t){this.iter=t}getNext(){return this.iter.getNext().key}hasNext(){return this.iter.hasNext()}}
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class fn{constructor(t){this.fields=t,t.sort(ze.comparator)}static empty(){return new fn([])}unionWith(t){let e=new un(ze.comparator);for(const n of this.fields)e=e.add(n);for(const n of t)e=e.add(n);return new fn(e.toArray())}covers(t){for(const e of this.fields)if(e.isPrefixOf(t))return!0;return!1}isEqual(t){return Ue(this.fields,t.fields,(t,e)=>t.isEqual(e))}}
/**
 * @license
 * Copyright 2023 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class pn extends Error{constructor(){super(...arguments),this.name="Base64DecodeError"}}
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class mn{constructor(t){this.binaryString=t}static fromBase64String(t){const e=function(t){try{return atob(t)}catch(e){throw"undefined"!=typeof DOMException&&e instanceof DOMException?new pn("Invalid base64 string: "+e):e}}(t);return new mn(e)}static fromUint8Array(t){const e=function(t){let e="";for(let n=0;n<t.length;++n)e+=String.fromCharCode(t[n]);return e}(t);return new mn(e)}[Symbol.iterator](){let t=0;return{next:()=>t<this.binaryString.length?{value:this.binaryString.charCodeAt(t++),done:!1}:{value:void 0,done:!0}}}toBase64(){return t=this.binaryString,btoa(t);var t}toUint8Array(){return function(t){const e=new Uint8Array(t.length);for(let n=0;n<t.length;n++)e[n]=t.charCodeAt(n);return e}(this.binaryString)}approximateByteSize(){return 2*this.binaryString.length}compareTo(t){return Be(this.binaryString,t.binaryString)}isEqual(t){return this.binaryString===t.binaryString}}mn.EMPTY_BYTE_STRING=new mn("");const gn=new RegExp(/^\d{4}-\d\d-\d\dT\d\d:\d\d:\d\d(?:\.(\d+))?Z$/);function yn(t){if(Ee(!!t),"string"==typeof t){let e=0;const n=gn.exec(t);if(Ee(!!n),n[1]){let t=n[1];t=(t+"000000000").substr(0,9),e=Number(t)}const i=new Date(t);return{seconds:Math.floor(i.getTime()/1e3),nanos:e}}return{seconds:vn(t.seconds),nanos:vn(t.nanos)}}function vn(t){return"number"==typeof t?t:"string"==typeof t?Number(t):0}function wn(t){return"string"==typeof t?mn.fromBase64String(t):mn.fromUint8Array(t)}
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function bn(t){var e,n;return"server_timestamp"===(null===(n=((null===(e=null==t?void 0:t.mapValue)||void 0===e?void 0:e.fields)||{}).__type__)||void 0===n?void 0:n.stringValue)}function Tn(t){const e=t.mapValue.fields.__previous_value__;return bn(e)?Tn(e):e}function Sn(t){const e=yn(t.mapValue.fields.__local_write_time__.timestampValue);return new $e(e.seconds,e.nanos)}
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class _n{constructor(t,e,n,i,s,r,a,o,h){this.databaseId=t,this.appId=e,this.persistenceKey=n,this.host=i,this.ssl=s,this.forceLongPolling=r,this.autoDetectLongPolling=a,this.longPollingOptions=o,this.useFetchStreams=h}}class En{constructor(t,e){this.projectId=t,this.database=e||"(default)"}static empty(){return new En("","")}get isDefaultDatabase(){return"(default)"===this.database}isEqual(t){return t instanceof En&&t.projectId===this.projectId&&t.database===this.database}}
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const In={};function xn(t){return"nullValue"in t?0:"booleanValue"in t?1:"integerValue"in t||"doubleValue"in t?2:"timestampValue"in t?3:"stringValue"in t?5:"bytesValue"in t?6:"referenceValue"in t?7:"geoPointValue"in t?8:"arrayValue"in t?9:"mapValue"in t?bn(t)?4:function(t){return"__max__"===(((t.mapValue||{}).fields||{}).__type__||{}).stringValue}
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */(t)?9007199254740991:function(t){var e,n;return"__vector__"===(null===(n=((null===(e=null==t?void 0:t.mapValue)||void 0===e?void 0:e.fields)||{}).__type__)||void 0===n?void 0:n.stringValue)}(t)?10:11:_e()}function An(t,e){if(t===e)return!0;const n=xn(t);if(n!==xn(e))return!1;switch(n){case 0:case 9007199254740991:return!0;case 1:return t.booleanValue===e.booleanValue;case 4:return Sn(t).isEqual(Sn(e));case 3:return function(t,e){if("string"==typeof t.timestampValue&&"string"==typeof e.timestampValue&&t.timestampValue.length===e.timestampValue.length)return t.timestampValue===e.timestampValue;const n=yn(t.timestampValue),i=yn(e.timestampValue);return n.seconds===i.seconds&&n.nanos===i.nanos}(t,e);case 5:return t.stringValue===e.stringValue;case 6:return i=e,wn(t.bytesValue).isEqual(wn(i.bytesValue));case 7:return t.referenceValue===e.referenceValue;case 8:return function(t,e){return vn(t.geoPointValue.latitude)===vn(e.geoPointValue.latitude)&&vn(t.geoPointValue.longitude)===vn(e.geoPointValue.longitude)}(t,e);case 2:return function(t,e){if("integerValue"in t&&"integerValue"in e)return vn(t.integerValue)===vn(e.integerValue);if("doubleValue"in t&&"doubleValue"in e){const n=vn(t.doubleValue),i=vn(e.doubleValue);return n===i?sn(n)===sn(i):isNaN(n)&&isNaN(i)}return!1}(t,e);case 9:return Ue(t.arrayValue.values||[],e.arrayValue.values||[],An);case 10:case 11:return function(t,e){const n=t.mapValue.fields||{},i=e.mapValue.fields||{};if(rn(n)!==rn(i))return!1;for(const s in n)if(n.hasOwnProperty(s)&&(void 0===i[s]||!An(n[s],i[s])))return!1;return!0}(t,e);default:return _e()}var i}function kn(t,e){return void 0!==(t.values||[]).find(t=>An(t,e))}function Cn(t,e){if(t===e)return 0;const n=xn(t),i=xn(e);if(n!==i)return Be(n,i);switch(n){case 0:case 9007199254740991:return 0;case 1:return Be(t.booleanValue,e.booleanValue);case 2:return function(t,e){const n=vn(t.integerValue||t.doubleValue),i=vn(e.integerValue||e.doubleValue);return n<i?-1:n>i?1:n===i?0:isNaN(n)?isNaN(i)?0:-1:1}(t,e);case 3:return Dn(t.timestampValue,e.timestampValue);case 4:return Dn(Sn(t),Sn(e));case 5:return Be(t.stringValue,e.stringValue);case 6:return function(t,e){const n=wn(t),i=wn(e);return n.compareTo(i)}(t.bytesValue,e.bytesValue);case 7:return function(t,e){const n=t.split("/"),i=e.split("/");for(let s=0;s<n.length&&s<i.length;s++){const t=Be(n[s],i[s]);if(0!==t)return t}return Be(n.length,i.length)}(t.referenceValue,e.referenceValue);case 8:return function(t,e){const n=Be(vn(t.latitude),vn(e.latitude));return 0!==n?n:Be(vn(t.longitude),vn(e.longitude))}(t.geoPointValue,e.geoPointValue);case 9:return Mn(t.arrayValue,e.arrayValue);case 10:return function(t,e){var n,i,s,r;const a=t.fields||{},o=e.fields||{},h=null===(n=a.value)||void 0===n?void 0:n.arrayValue,c=null===(i=o.value)||void 0===i?void 0:i.arrayValue,l=Be((null===(s=null==h?void 0:h.values)||void 0===s?void 0:s.length)||0,(null===(r=null==c?void 0:c.values)||void 0===r?void 0:r.length)||0);return 0!==l?l:Mn(h,c)}(t.mapValue,e.mapValue);case 11:return function(t,e){if(t===In&&e===In)return 0;if(t===In)return 1;if(e===In)return-1;const n=t.fields||{},i=Object.keys(n),s=e.fields||{},r=Object.keys(s);i.sort(),r.sort();for(let a=0;a<i.length&&a<r.length;++a){const t=Be(i[a],r[a]);if(0!==t)return t;const e=Cn(n[i[a]],s[r[a]]);if(0!==e)return e}return Be(i.length,r.length)}(t.mapValue,e.mapValue);default:throw _e()}}function Dn(t,e){if("string"==typeof t&&"string"==typeof e&&t.length===e.length)return Be(t,e);const n=yn(t),i=yn(e),s=Be(n.seconds,i.seconds);return 0!==s?s:Be(n.nanos,i.nanos)}function Mn(t,e){const n=t.values||[],i=e.values||[];for(let s=0;s<n.length&&s<i.length;++s){const t=Cn(n[s],i[s]);if(t)return t}return Be(n.length,i.length)}function Nn(t){return Ln(t)}function Ln(t){return"nullValue"in t?"null":"booleanValue"in t?""+t.booleanValue:"integerValue"in t?""+t.integerValue:"doubleValue"in t?""+t.doubleValue:"timestampValue"in t?function(t){const e=yn(t);return`time(${e.seconds},${e.nanos})`}(t.timestampValue):"stringValue"in t?t.stringValue:"bytesValue"in t?wn(t.bytesValue).toBase64():"referenceValue"in t?function(t){return Ke.fromName(t).toString()}(t.referenceValue):"geoPointValue"in t?function(t){return`geo(${t.latitude},${t.longitude})`}(t.geoPointValue):"arrayValue"in t?function(t){let e="[",n=!0;for(const i of t.values||[])n?n=!1:e+=",",e+=Ln(i);return e+"]"}(t.arrayValue):"mapValue"in t?function(t){const e=Object.keys(t.fields||{}).sort();let n="{",i=!0;for(const s of e)i?i=!1:n+=",",n+=`${s}:${Ln(t.fields[s])}`;return n+"}"}(t.mapValue):_e()}function Rn(t,e){return{referenceValue:`projects/${t.projectId}/databases/${t.database}/documents/${e.path.canonicalString()}`}}function Pn(t){return!!t&&"integerValue"in t}function On(t){return!!t&&"arrayValue"in t}function Fn(t){return!!t&&"nullValue"in t}function Vn(t){return!!t&&"doubleValue"in t&&isNaN(Number(t.doubleValue))}function Bn(t){return!!t&&"mapValue"in t}function Un(t){if(t.geoPointValue)return{geoPointValue:Object.assign({},t.geoPointValue)};if(t.timestampValue&&"object"==typeof t.timestampValue)return{timestampValue:Object.assign({},t.timestampValue)};if(t.mapValue){const e={mapValue:{fields:{}}};return an(t.mapValue.fields,(t,n)=>e.mapValue.fields[t]=Un(n)),e}if(t.arrayValue){const e={arrayValue:{values:[]}};for(let n=0;n<(t.arrayValue.values||[]).length;++n)e.arrayValue.values[n]=Un(t.arrayValue.values[n]);return e}return Object.assign({},t)}class $n{constructor(t){this.value=t}static empty(){return new $n({mapValue:{}})}field(t){if(t.isEmpty())return this.value;{let e=this.value;for(let n=0;n<t.length-1;++n)if(e=(e.mapValue.fields||{})[t.get(n)],!Bn(e))return null;return e=(e.mapValue.fields||{})[t.lastSegment()],e||null}}set(t,e){this.getFieldsMap(t.popLast())[t.lastSegment()]=Un(e)}setAll(t){let e=ze.emptyPath(),n={},i=[];t.forEach((t,s)=>{if(!e.isImmediateParentOf(s)){const t=this.getFieldsMap(e);this.applyChanges(t,n,i),n={},i=[],e=s.popLast()}t?n[s.lastSegment()]=Un(t):i.push(s.lastSegment())});const s=this.getFieldsMap(e);this.applyChanges(s,n,i)}delete(t){const e=this.field(t.popLast());Bn(e)&&e.mapValue.fields&&delete e.mapValue.fields[t.lastSegment()]}isEqual(t){return An(this.value,t.value)}getFieldsMap(t){let e=this.value;e.mapValue.fields||(e.mapValue={fields:{}});for(let n=0;n<t.length;++n){let i=e.mapValue.fields[t.get(n)];Bn(i)&&i.mapValue.fields||(i={mapValue:{fields:{}}},e.mapValue.fields[t.get(n)]=i),e=i}return e.mapValue.fields}applyChanges(t,e,n){an(e,(e,n)=>t[e]=n);for(const i of n)delete t[i]}clone(){return new $n(Un(this.value))}}function Gn(t){const e=[];return an(t.fields,(t,n)=>{const i=new ze([t]);if(Bn(n)){const t=Gn(n.mapValue).fields;if(0===t.length)e.push(i);else for(const n of t)e.push(i.child(n))}else e.push(i)}),new fn(e)
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */}class qn{constructor(t,e,n,i,s,r,a){this.key=t,this.documentType=e,this.version=n,this.readTime=i,this.createTime=s,this.data=r,this.documentState=a}static newInvalidDocument(t){return new qn(t,0,Ge.min(),Ge.min(),Ge.min(),$n.empty(),0)}static newFoundDocument(t,e,n,i){return new qn(t,1,e,Ge.min(),n,i,0)}static newNoDocument(t,e){return new qn(t,2,e,Ge.min(),Ge.min(),$n.empty(),0)}static newUnknownDocument(t,e){return new qn(t,3,e,Ge.min(),Ge.min(),$n.empty(),2)}convertToFoundDocument(t,e){return!this.createTime.isEqual(Ge.min())||2!==this.documentType&&0!==this.documentType||(this.createTime=t),this.version=t,this.documentType=1,this.data=e,this.documentState=0,this}convertToNoDocument(t){return this.version=t,this.documentType=2,this.data=$n.empty(),this.documentState=0,this}convertToUnknownDocument(t){return this.version=t,this.documentType=3,this.data=$n.empty(),this.documentState=2,this}setHasCommittedMutations(){return this.documentState=2,this}setHasLocalMutations(){return this.documentState=1,this.version=Ge.min(),this}setReadTime(t){return this.readTime=t,this}get hasLocalMutations(){return 1===this.documentState}get hasCommittedMutations(){return 2===this.documentState}get hasPendingWrites(){return this.hasLocalMutations||this.hasCommittedMutations}isValidDocument(){return 0!==this.documentType}isFoundDocument(){return 1===this.documentType}isNoDocument(){return 2===this.documentType}isUnknownDocument(){return 3===this.documentType}isEqual(t){return t instanceof qn&&this.key.isEqual(t.key)&&this.version.isEqual(t.version)&&this.documentType===t.documentType&&this.documentState===t.documentState&&this.data.isEqual(t.data)}mutableCopy(){return new qn(this.key,this.documentType,this.version,this.readTime,this.createTime,this.data.clone(),this.documentState)}toString(){return`Document(${this.key}, ${this.version}, ${JSON.stringify(this.data.value)}, {createTime: ${this.createTime}}), {documentType: ${this.documentType}}), {documentState: ${this.documentState}})`}}
/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class jn{constructor(t,e){this.position=t,this.inclusive=e}}function Hn(t,e,n){let i=0;for(let s=0;s<t.position.length;s++){const r=e[s],a=t.position[s];if(i=r.field.isKeyField()?Ke.comparator(Ke.fromName(a.referenceValue),n.key):Cn(a,n.data.field(r.field)),"desc"===r.dir&&(i*=-1),0!==i)break}return i}function zn(t,e){if(null===t)return null===e;if(null===e)return!1;if(t.inclusive!==e.inclusive||t.position.length!==e.position.length)return!1;for(let n=0;n<t.position.length;n++)if(!An(t.position[n],e.position[n]))return!1;return!0}
/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Kn{constructor(t,e="asc"){this.field=t,this.dir=e}}function Wn(t,e){return t.dir===e.dir&&t.field.isEqual(e.field)}
/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Qn{}class Xn extends Qn{constructor(t,e,n){super(),this.field=t,this.op=e,this.value=n}static create(t,e,n){return t.isKeyField()?"in"===e||"not-in"===e?this.createKeyFieldInFilter(t,e,n):new ii(t,e,n):"array-contains"===e?new oi(t,n):"in"===e?new hi(t,n):"not-in"===e?new ci(t,n):"array-contains-any"===e?new li(t,n):new Xn(t,e,n)}static createKeyFieldInFilter(t,e,n){return"in"===e?new si(t,n):new ri(t,n)}matches(t){const e=t.data.field(this.field);return"!="===this.op?null!==e&&this.matchesComparison(Cn(e,this.value)):null!==e&&xn(this.value)===xn(e)&&this.matchesComparison(Cn(e,this.value))}matchesComparison(t){switch(this.op){case"<":return t<0;case"<=":return t<=0;case"==":return 0===t;case"!=":return 0!==t;case">":return t>0;case">=":return t>=0;default:return _e()}}isInequality(){return["<","<=",">",">=","!=","not-in"].indexOf(this.op)>=0}getFlattenedFilters(){return[this]}getFilters(){return[this]}}class Yn extends Qn{constructor(t,e){super(),this.filters=t,this.op=e,this.ae=null}static create(t,e){return new Yn(t,e)}matches(t){return Jn(this)?void 0===this.filters.find(e=>!e.matches(t)):void 0!==this.filters.find(e=>e.matches(t))}getFlattenedFilters(){return null!==this.ae||(this.ae=this.filters.reduce((t,e)=>t.concat(e.getFlattenedFilters()),[])),this.ae}getFilters(){return Object.assign([],this.filters)}}function Jn(t){return"and"===t.op}function Zn(t){return function(t){for(const e of t.filters)if(e instanceof Yn)return!1;return!0}(t)&&Jn(t)}function ti(t){if(t instanceof Xn)return t.field.canonicalString()+t.op.toString()+Nn(t.value);if(Zn(t))return t.filters.map(t=>ti(t)).join(",");{const e=t.filters.map(t=>ti(t)).join(",");return`${t.op}(${e})`}}function ei(t,e){return t instanceof Xn?(n=t,(i=e)instanceof Xn&&n.op===i.op&&n.field.isEqual(i.field)&&An(n.value,i.value)):t instanceof Yn?function(t,e){return e instanceof Yn&&t.op===e.op&&t.filters.length===e.filters.length&&t.filters.reduce((t,n,i)=>t&&ei(n,e.filters[i]),!0)}(t,e):void _e();var n,i}function ni(t){return t instanceof Xn?`${(e=t).field.canonicalString()} ${e.op} ${Nn(e.value)}`:t instanceof Yn?function(t){return t.op.toString()+" {"+t.getFilters().map(ni).join(" ,")+"}"}(t):"Filter";var e}class ii extends Xn{constructor(t,e,n){super(t,e,n),this.key=Ke.fromName(n.referenceValue)}matches(t){const e=Ke.comparator(t.key,this.key);return this.matchesComparison(e)}}class si extends Xn{constructor(t,e){super(t,"in",e),this.keys=ai("in",e)}matches(t){return this.keys.some(e=>e.isEqual(t.key))}}class ri extends Xn{constructor(t,e){super(t,"not-in",e),this.keys=ai("not-in",e)}matches(t){return!this.keys.some(e=>e.isEqual(t.key))}}function ai(t,e){var n;return((null===(n=e.arrayValue)||void 0===n?void 0:n.values)||[]).map(t=>Ke.fromName(t.referenceValue))}class oi extends Xn{constructor(t,e){super(t,"array-contains",e)}matches(t){const e=t.data.field(this.field);return On(e)&&kn(e.arrayValue,this.value)}}class hi extends Xn{constructor(t,e){super(t,"in",e)}matches(t){const e=t.data.field(this.field);return null!==e&&kn(this.value.arrayValue,e)}}class ci extends Xn{constructor(t,e){super(t,"not-in",e)}matches(t){if(kn(this.value.arrayValue,{nullValue:"NULL_VALUE"}))return!1;const e=t.data.field(this.field);return null!==e&&!kn(this.value.arrayValue,e)}}class li extends Xn{constructor(t,e){super(t,"array-contains-any",e)}matches(t){const e=t.data.field(this.field);return!(!On(e)||!e.arrayValue.values)&&e.arrayValue.values.some(t=>kn(this.value.arrayValue,t))}}
/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ui{constructor(t,e=null,n=[],i=[],s=null,r=null,a=null){this.path=t,this.collectionGroup=e,this.orderBy=n,this.filters=i,this.limit=s,this.startAt=r,this.endAt=a,this.ue=null}}function di(t,e=null,n=[],i=[],s=null,r=null,a=null){return new ui(t,e,n,i,s,r,a)}function fi(t){const e=Ie(t);if(null===e.ue){let t=e.path.canonicalString();null!==e.collectionGroup&&(t+="|cg:"+e.collectionGroup),t+="|f:",t+=e.filters.map(t=>ti(t)).join(","),t+="|ob:",t+=e.orderBy.map(t=>{return(e=t).field.canonicalString()+e.dir;var e}).join(","),nn(e.limit)||(t+="|l:",t+=e.limit),e.startAt&&(t+="|lb:",t+=e.startAt.inclusive?"b:":"a:",t+=e.startAt.position.map(t=>Nn(t)).join(",")),e.endAt&&(t+="|ub:",t+=e.endAt.inclusive?"a:":"b:",t+=e.endAt.position.map(t=>Nn(t)).join(",")),e.ue=t}return e.ue}function pi(t,e){if(t.limit!==e.limit)return!1;if(t.orderBy.length!==e.orderBy.length)return!1;for(let n=0;n<t.orderBy.length;n++)if(!Wn(t.orderBy[n],e.orderBy[n]))return!1;if(t.filters.length!==e.filters.length)return!1;for(let n=0;n<t.filters.length;n++)if(!ei(t.filters[n],e.filters[n]))return!1;return t.collectionGroup===e.collectionGroup&&!!t.path.isEqual(e.path)&&!!zn(t.startAt,e.startAt)&&zn(t.endAt,e.endAt)}function mi(t){return Ke.isDocumentKey(t.path)&&null===t.collectionGroup&&0===t.filters.length}
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class gi{constructor(t,e=null,n=[],i=[],s=null,r="F",a=null,o=null){this.path=t,this.collectionGroup=e,this.explicitOrderBy=n,this.filters=i,this.limit=s,this.limitType=r,this.startAt=a,this.endAt=o,this.ce=null,this.le=null,this.he=null,this.startAt,this.endAt}}function yi(t){return new gi(t)}function vi(t){return 0===t.filters.length&&null===t.limit&&null==t.startAt&&null==t.endAt&&(0===t.explicitOrderBy.length||1===t.explicitOrderBy.length&&t.explicitOrderBy[0].field.isKeyField())}function wi(t){return null!==t.collectionGroup}function bi(t){const e=Ie(t);if(null===e.ce){e.ce=[];const t=new Set;for(const i of e.explicitOrderBy)e.ce.push(i),t.add(i.field.canonicalString());const n=e.explicitOrderBy.length>0?e.explicitOrderBy[e.explicitOrderBy.length-1].dir:"asc";(function(t){let e=new un(ze.comparator);return t.filters.forEach(t=>{t.getFlattenedFilters().forEach(t=>{t.isInequality()&&(e=e.add(t.field))})}),e})(e).forEach(i=>{t.has(i.canonicalString())||i.isKeyField()||e.ce.push(new Kn(i,n))}),t.has(ze.keyField().canonicalString())||e.ce.push(new Kn(ze.keyField(),n))}return e.ce}function Ti(t){const e=Ie(t);return e.le||(e.le=function(t,e){if("F"===t.limitType)return di(t.path,t.collectionGroup,e,t.filters,t.limit,t.startAt,t.endAt);{e=e.map(t=>{const e="desc"===t.dir?"asc":"desc";return new Kn(t.field,e)});const n=t.endAt?new jn(t.endAt.position,t.endAt.inclusive):null,i=t.startAt?new jn(t.startAt.position,t.startAt.inclusive):null;return di(t.path,t.collectionGroup,e,t.filters,t.limit,n,i)}}(e,bi(t))),e.le}function Si(t,e){const n=t.filters.concat([e]);return new gi(t.path,t.collectionGroup,t.explicitOrderBy.slice(),n,t.limit,t.limitType,t.startAt,t.endAt)}function _i(t,e,n){return new gi(t.path,t.collectionGroup,t.explicitOrderBy.slice(),t.filters.slice(),e,n,t.startAt,t.endAt)}function Ei(t,e){return pi(Ti(t),Ti(e))&&t.limitType===e.limitType}function Ii(t){return`${fi(Ti(t))}|lt:${t.limitType}`}function xi(t){return`Query(target=${function(t){let e=t.path.canonicalString();return null!==t.collectionGroup&&(e+=" collectionGroup="+t.collectionGroup),t.filters.length>0&&(e+=`, filters: [${t.filters.map(t=>ni(t)).join(", ")}]`),nn(t.limit)||(e+=", limit: "+t.limit),t.orderBy.length>0&&(e+=`, orderBy: [${t.orderBy.map(t=>{return`${(e=t).field.canonicalString()} (${e.dir})`;var e}).join(", ")}]`),t.startAt&&(e+=", startAt: ",e+=t.startAt.inclusive?"b:":"a:",e+=t.startAt.position.map(t=>Nn(t)).join(",")),t.endAt&&(e+=", endAt: ",e+=t.endAt.inclusive?"a:":"b:",e+=t.endAt.position.map(t=>Nn(t)).join(",")),`Target(${e})`}(Ti(t))}; limitType=${t.limitType})`}function Ai(t,e){return e.isFoundDocument()&&function(t,e){const n=e.key.path;return null!==t.collectionGroup?e.key.hasCollectionId(t.collectionGroup)&&t.path.isPrefixOf(n):Ke.isDocumentKey(t.path)?t.path.isEqual(n):t.path.isImmediateParentOf(n)}(t,e)&&function(t,e){for(const n of bi(t))if(!n.field.isKeyField()&&null===e.data.field(n.field))return!1;return!0}(t,e)&&function(t,e){for(const n of t.filters)if(!n.matches(e))return!1;return!0}(t,e)&&(i=e,!((n=t).startAt&&!function(t,e,n){const i=Hn(t,e,n);return t.inclusive?i<=0:i<0}(n.startAt,bi(n),i)||n.endAt&&!function(t,e,n){const i=Hn(t,e,n);return t.inclusive?i>=0:i>0}(n.endAt,bi(n),i)));var n,i}function ki(t){return(e,n)=>{let i=!1;for(const s of bi(t)){const t=Ci(s,e,n);if(0!==t)return t;i=i||s.field.isKeyField()}return 0}}function Ci(t,e,n){const i=t.field.isKeyField()?Ke.comparator(e.key,n.key):function(t,e,n){const i=e.data.field(t),s=n.data.field(t);return null!==i&&null!==s?Cn(i,s):_e()}(t.field,e,n);switch(t.dir){case"asc":return i;case"desc":return-1*i;default:return _e()}}
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Di{constructor(t,e){this.mapKeyFn=t,this.equalsFn=e,this.inner={},this.innerSize=0}get(t){const e=this.mapKeyFn(t),n=this.inner[e];if(void 0!==n)for(const[i,s]of n)if(this.equalsFn(i,t))return s}has(t){return void 0!==this.get(t)}set(t,e){const n=this.mapKeyFn(t),i=this.inner[n];if(void 0===i)return this.inner[n]=[[t,e]],void this.innerSize++;for(let s=0;s<i.length;s++)if(this.equalsFn(i[s][0],t))return void(i[s]=[t,e]);i.push([t,e]),this.innerSize++}delete(t){const e=this.mapKeyFn(t),n=this.inner[e];if(void 0===n)return!1;for(let i=0;i<n.length;i++)if(this.equalsFn(n[i][0],t))return 1===n.length?delete this.inner[e]:n.splice(i,1),this.innerSize--,!0;return!1}forEach(t){an(this.inner,(e,n)=>{for(const[i,s]of n)t(i,s)})}isEmpty(){return on(this.inner)}size(){return this.innerSize}}
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Mi=new hn(Ke.comparator);function Ni(){return Mi}const Li=new hn(Ke.comparator);function Ri(...t){let e=Li;for(const n of t)e=e.insert(n.key,n);return e}function Pi(t){let e=Li;return t.forEach((t,n)=>e=e.insert(t,n.overlayedDocument)),e}function Oi(){return Vi()}function Fi(){return Vi()}function Vi(){return new Di(t=>t.toString(),(t,e)=>t.isEqual(e))}const Bi=new hn(Ke.comparator),Ui=new un(Ke.comparator);function $i(...t){let e=Ui;for(const n of t)e=e.add(n);return e}const Gi=new un(Be);
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
function qi(t,e){if(t.useProto3Json){if(isNaN(e))return{doubleValue:"NaN"};if(e===1/0)return{doubleValue:"Infinity"};if(e===-1/0)return{doubleValue:"-Infinity"}}return{doubleValue:sn(e)?"-0":e}}function ji(t){return{integerValue:""+t}}function Hi(t,e){return function(t){return"number"==typeof t&&Number.isInteger(t)&&!sn(t)&&t<=Number.MAX_SAFE_INTEGER&&t>=Number.MIN_SAFE_INTEGER}(e)?ji(e):qi(t,e)}
/**
 * @license
 * Copyright 2018 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class zi{constructor(){this._=void 0}}function Ki(t,e,n){return t instanceof Xi?function(t,e){const n={fields:{__type__:{stringValue:"server_timestamp"},__local_write_time__:{timestampValue:{seconds:t.seconds,nanos:t.nanoseconds}}}};return e&&bn(e)&&(e=Tn(e)),e&&(n.fields.__previous_value__=e),{mapValue:n}}(n,e):t instanceof Yi?Ji(t,e):t instanceof Zi?ts(t,e):function(t,e){const n=Qi(t,e),i=ns(n)+ns(t.Pe);return Pn(n)&&Pn(t.Pe)?ji(i):qi(t.serializer,i)}(t,e)}function Wi(t,e,n){return t instanceof Yi?Ji(t,e):t instanceof Zi?ts(t,e):n}function Qi(t,e){return t instanceof es?Pn(n=e)||(i=n)&&"doubleValue"in i?e:{integerValue:0}:null;var n,i}class Xi extends zi{}class Yi extends zi{constructor(t){super(),this.elements=t}}function Ji(t,e){const n=is(e);for(const i of t.elements)n.some(t=>An(t,i))||n.push(i);return{arrayValue:{values:n}}}class Zi extends zi{constructor(t){super(),this.elements=t}}function ts(t,e){let n=is(e);for(const i of t.elements)n=n.filter(t=>!An(t,i));return{arrayValue:{values:n}}}class es extends zi{constructor(t,e){super(),this.serializer=t,this.Pe=e}}function ns(t){return vn(t.integerValue||t.doubleValue)}function is(t){return On(t)&&t.arrayValue.values?t.arrayValue.values.slice():[]}
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ss{constructor(t,e){this.field=t,this.transform=e}}class rs{constructor(t,e){this.version=t,this.transformResults=e}}class as{constructor(t,e){this.updateTime=t,this.exists=e}static none(){return new as}static exists(t){return new as(void 0,t)}static updateTime(t){return new as(t)}get isNone(){return void 0===this.updateTime&&void 0===this.exists}isEqual(t){return this.exists===t.exists&&(this.updateTime?!!t.updateTime&&this.updateTime.isEqual(t.updateTime):!t.updateTime)}}function os(t,e){return void 0!==t.updateTime?e.isFoundDocument()&&e.version.isEqual(t.updateTime):void 0===t.exists||t.exists===e.isFoundDocument()}class hs{}function cs(t,e){if(!t.hasLocalMutations||e&&0===e.fields.length)return null;if(null===e)return t.isNoDocument()?new ws(t.key,as.none()):new ps(t.key,t.data,as.none());{const n=t.data,i=$n.empty();let s=new un(ze.comparator);for(let t of e.fields)if(!s.has(t)){let e=n.field(t);null===e&&t.length>1&&(t=t.popLast(),e=n.field(t)),null===e?i.delete(t):i.set(t,e),s=s.add(t)}return new ms(t.key,i,new fn(s.toArray()),as.none())}}function ls(t,e,n){var i;t instanceof ps?function(t,e,n){const i=t.value.clone(),s=ys(t.fieldTransforms,e,n.transformResults);i.setAll(s),e.convertToFoundDocument(n.version,i).setHasCommittedMutations()}(t,e,n):t instanceof ms?function(t,e,n){if(!os(t.precondition,e))return void e.convertToUnknownDocument(n.version);const i=ys(t.fieldTransforms,e,n.transformResults),s=e.data;s.setAll(gs(t)),s.setAll(i),e.convertToFoundDocument(n.version,s).setHasCommittedMutations()}(t,e,n):(i=n,e.convertToNoDocument(i.version).setHasCommittedMutations())}function us(t,e,n,i){return t instanceof ps?function(t,e,n,i){if(!os(t.precondition,e))return n;const s=t.value.clone(),r=vs(t.fieldTransforms,i,e);return s.setAll(r),e.convertToFoundDocument(e.version,s).setHasLocalMutations(),null}(t,e,n,i):t instanceof ms?function(t,e,n,i){if(!os(t.precondition,e))return n;const s=vs(t.fieldTransforms,i,e),r=e.data;return r.setAll(gs(t)),r.setAll(s),e.convertToFoundDocument(e.version,r).setHasLocalMutations(),null===n?null:n.unionWith(t.fieldMask.fields).unionWith(t.fieldTransforms.map(t=>t.field))}(t,e,n,i):(s=e,r=n,os(t.precondition,s)?(s.convertToNoDocument(s.version).setHasLocalMutations(),null):r);var s,r}function ds(t,e){let n=null;for(const i of t.fieldTransforms){const t=e.data.field(i.field),s=Qi(i.transform,t||null);null!=s&&(null===n&&(n=$n.empty()),n.set(i.field,s))}return n||null}function fs(t,e){return t.type===e.type&&!!t.key.isEqual(e.key)&&!!t.precondition.isEqual(e.precondition)&&(n=t.fieldTransforms,i=e.fieldTransforms,!!(void 0===n&&void 0===i||n&&i&&Ue(n,i,(t,e)=>function(t,e){return t.field.isEqual(e.field)&&(n=t.transform,i=e.transform,n instanceof Yi&&i instanceof Yi||n instanceof Zi&&i instanceof Zi?Ue(n.elements,i.elements,An):n instanceof es&&i instanceof es?An(n.Pe,i.Pe):n instanceof Xi&&i instanceof Xi);var n,i}(t,e)))&&(0===t.type?t.value.isEqual(e.value):1!==t.type||t.data.isEqual(e.data)&&t.fieldMask.isEqual(e.fieldMask)));var n,i}class ps extends hs{constructor(t,e,n,i=[]){super(),this.key=t,this.value=e,this.precondition=n,this.fieldTransforms=i,this.type=0}getFieldMask(){return null}}class ms extends hs{constructor(t,e,n,i,s=[]){super(),this.key=t,this.data=e,this.fieldMask=n,this.precondition=i,this.fieldTransforms=s,this.type=1}getFieldMask(){return this.fieldMask}}function gs(t){const e=new Map;return t.fieldMask.fields.forEach(n=>{if(!n.isEmpty()){const i=t.data.field(n);e.set(n,i)}}),e}function ys(t,e,n){const i=new Map;Ee(t.length===n.length);for(let s=0;s<n.length;s++){const r=t[s],a=r.transform,o=e.data.field(r.field);i.set(r.field,Wi(a,o,n[s]))}return i}function vs(t,e,n){const i=new Map;for(const s of t){const t=s.transform,r=n.data.field(s.field);i.set(s.field,Ki(t,r,e))}return i}class ws extends hs{constructor(t,e){super(),this.key=t,this.precondition=e,this.type=2,this.fieldTransforms=[]}getFieldMask(){return null}}class bs extends hs{constructor(t,e){super(),this.key=t,this.precondition=e,this.type=3,this.fieldTransforms=[]}getFieldMask(){return null}}
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Ts{constructor(t,e,n,i){this.batchId=t,this.localWriteTime=e,this.baseMutations=n,this.mutations=i}applyToRemoteDocument(t,e){const n=e.mutationResults;for(let i=0;i<this.mutations.length;i++){const e=this.mutations[i];e.key.isEqual(t.key)&&ls(e,t,n[i])}}applyToLocalView(t,e){for(const n of this.baseMutations)n.key.isEqual(t.key)&&(e=us(n,t,e,this.localWriteTime));for(const n of this.mutations)n.key.isEqual(t.key)&&(e=us(n,t,e,this.localWriteTime));return e}applyToLocalDocumentSet(t,e){const n=Fi();return this.mutations.forEach(i=>{const s=t.get(i.key),r=s.overlayedDocument;let a=this.applyToLocalView(r,s.mutatedFields);a=e.has(i.key)?null:a;const o=cs(r,a);null!==o&&n.set(i.key,o),r.isValidDocument()||r.convertToNoDocument(Ge.min())}),n}keys(){return this.mutations.reduce((t,e)=>t.add(e.key),$i())}isEqual(t){return this.batchId===t.batchId&&Ue(this.mutations,t.mutations,(t,e)=>fs(t,e))&&Ue(this.baseMutations,t.baseMutations,(t,e)=>fs(t,e))}}class Ss{constructor(t,e,n,i){this.batch=t,this.commitVersion=e,this.mutationResults=n,this.docVersions=i}static from(t,e,n){Ee(t.mutations.length===n.length);let i=function(){return Bi}();const s=t.mutations;for(let r=0;r<s.length;r++)i=i.insert(s[r].key,n[r].version);return new Ss(t,e,n,i)}}
/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class _s{constructor(t,e){this.largestBatchId=t,this.mutation=e}getKey(){return this.mutation.key}isEqual(t){return null!==t&&this.mutation===t.mutation}toString(){return`Overlay{\n      largestBatchId: ${this.largestBatchId},\n      mutation: ${this.mutation.toString()}\n    }`}}
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Es{constructor(t,e){this.count=t,this.unchangedNames=e}}
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */var Is,xs;function As(t){if(void 0===t)return be("GRPC error has no .code"),xe.UNKNOWN;switch(t){case Is.OK:return xe.OK;case Is.CANCELLED:return xe.CANCELLED;case Is.UNKNOWN:return xe.UNKNOWN;case Is.DEADLINE_EXCEEDED:return xe.DEADLINE_EXCEEDED;case Is.RESOURCE_EXHAUSTED:return xe.RESOURCE_EXHAUSTED;case Is.INTERNAL:return xe.INTERNAL;case Is.UNAVAILABLE:return xe.UNAVAILABLE;case Is.UNAUTHENTICATED:return xe.UNAUTHENTICATED;case Is.INVALID_ARGUMENT:return xe.INVALID_ARGUMENT;case Is.NOT_FOUND:return xe.NOT_FOUND;case Is.ALREADY_EXISTS:return xe.ALREADY_EXISTS;case Is.PERMISSION_DENIED:return xe.PERMISSION_DENIED;case Is.FAILED_PRECONDITION:return xe.FAILED_PRECONDITION;case Is.ABORTED:return xe.ABORTED;case Is.OUT_OF_RANGE:return xe.OUT_OF_RANGE;case Is.UNIMPLEMENTED:return xe.UNIMPLEMENTED;case Is.DATA_LOSS:return xe.DATA_LOSS;default:return _e()}}(xs=Is||(Is={}))[xs.OK=0]="OK",xs[xs.CANCELLED=1]="CANCELLED",xs[xs.UNKNOWN=2]="UNKNOWN",xs[xs.INVALID_ARGUMENT=3]="INVALID_ARGUMENT",xs[xs.DEADLINE_EXCEEDED=4]="DEADLINE_EXCEEDED",xs[xs.NOT_FOUND=5]="NOT_FOUND",xs[xs.ALREADY_EXISTS=6]="ALREADY_EXISTS",xs[xs.PERMISSION_DENIED=7]="PERMISSION_DENIED",xs[xs.UNAUTHENTICATED=16]="UNAUTHENTICATED",xs[xs.RESOURCE_EXHAUSTED=8]="RESOURCE_EXHAUSTED",xs[xs.FAILED_PRECONDITION=9]="FAILED_PRECONDITION",xs[xs.ABORTED=10]="ABORTED",xs[xs.OUT_OF_RANGE=11]="OUT_OF_RANGE",xs[xs.UNIMPLEMENTED=12]="UNIMPLEMENTED",xs[xs.INTERNAL=13]="INTERNAL",xs[xs.UNAVAILABLE=14]="UNAVAILABLE",xs[xs.DATA_LOSS=15]="DATA_LOSS";
/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
const ks=new ne([4294967295,4294967295],0);function Cs(t){const e=(new TextEncoder).encode(t),n=new ie;return n.update(e),new Uint8Array(n.digest())}function Ds(t){const e=new DataView(t.buffer),n=e.getUint32(0,!0),i=e.getUint32(4,!0),s=e.getUint32(8,!0),r=e.getUint32(12,!0);return[new ne([n,i],0),new ne([s,r],0)]}class Ms{constructor(t,e,n){if(this.bitmap=t,this.padding=e,this.hashCount=n,e<0||e>=8)throw new Ns(`Invalid padding: ${e}`);if(n<0)throw new Ns(`Invalid hash count: ${n}`);if(t.length>0&&0===this.hashCount)throw new Ns(`Invalid hash count: ${n}`);if(0===t.length&&0!==e)throw new Ns(`Invalid padding when bitmap length is 0: ${e}`);this.Ie=8*t.length-e,this.Te=ne.fromNumber(this.Ie)}Ee(t,e,n){let i=t.add(e.multiply(ne.fromNumber(n)));return 1===i.compare(ks)&&(i=new ne([i.getBits(0),i.getBits(1)],0)),i.modulo(this.Te).toNumber()}de(t){return!!(this.bitmap[Math.floor(t/8)]&1<<t%8)}mightContain(t){if(0===this.Ie)return!1;const e=Cs(t),[n,i]=Ds(e);for(let s=0;s<this.hashCount;s++){const t=this.Ee(n,i,s);if(!this.de(t))return!1}return!0}static create(t,e,n){const i=t%8==0?0:8-t%8,s=new Uint8Array(Math.ceil(t/8)),r=new Ms(s,i,e);return n.forEach(t=>r.insert(t)),r}insert(t){if(0===this.Ie)return;const e=Cs(t),[n,i]=Ds(e);for(let s=0;s<this.hashCount;s++){const t=this.Ee(n,i,s);this.Ae(t)}}Ae(t){const e=Math.floor(t/8),n=t%8;this.bitmap[e]|=1<<n}}class Ns extends Error{constructor(){super(...arguments),this.name="BloomFilterError"}}
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Ls{constructor(t,e,n,i,s){this.snapshotVersion=t,this.targetChanges=e,this.targetMismatches=n,this.documentUpdates=i,this.resolvedLimboDocuments=s}static createSynthesizedRemoteEventForCurrentChange(t,e,n){const i=new Map;return i.set(t,Rs.createSynthesizedTargetChangeForCurrentChange(t,e,n)),new Ls(Ge.min(),i,new hn(Be),Ni(),$i())}}class Rs{constructor(t,e,n,i,s){this.resumeToken=t,this.current=e,this.addedDocuments=n,this.modifiedDocuments=i,this.removedDocuments=s}static createSynthesizedTargetChangeForCurrentChange(t,e,n){return new Rs(n,e,$i(),$i(),$i())}}
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Ps{constructor(t,e,n,i){this.Re=t,this.removedTargetIds=e,this.key=n,this.Ve=i}}class Os{constructor(t,e){this.targetId=t,this.me=e}}class Fs{constructor(t,e,n=mn.EMPTY_BYTE_STRING,i=null){this.state=t,this.targetIds=e,this.resumeToken=n,this.cause=i}}class Vs{constructor(){this.fe=0,this.ge=$s(),this.pe=mn.EMPTY_BYTE_STRING,this.ye=!1,this.we=!0}get current(){return this.ye}get resumeToken(){return this.pe}get Se(){return 0!==this.fe}get be(){return this.we}De(t){t.approximateByteSize()>0&&(this.we=!0,this.pe=t)}ve(){let t=$i(),e=$i(),n=$i();return this.ge.forEach((i,s)=>{switch(s){case 0:t=t.add(i);break;case 2:e=e.add(i);break;case 1:n=n.add(i);break;default:_e()}}),new Rs(this.pe,this.ye,t,e,n)}Ce(){this.we=!1,this.ge=$s()}Fe(t,e){this.we=!0,this.ge=this.ge.insert(t,e)}Me(t){this.we=!0,this.ge=this.ge.remove(t)}xe(){this.fe+=1}Oe(){this.fe-=1,Ee(this.fe>=0)}Ne(){this.we=!0,this.ye=!0}}class Bs{constructor(t){this.Le=t,this.Be=new Map,this.ke=Ni(),this.qe=Us(),this.Qe=new hn(Be)}Ke(t){for(const e of t.Re)t.Ve&&t.Ve.isFoundDocument()?this.$e(e,t.Ve):this.Ue(e,t.key,t.Ve);for(const e of t.removedTargetIds)this.Ue(e,t.key,t.Ve)}We(t){this.forEachTarget(t,e=>{const n=this.Ge(e);switch(t.state){case 0:this.ze(e)&&n.De(t.resumeToken);break;case 1:n.Oe(),n.Se||n.Ce(),n.De(t.resumeToken);break;case 2:n.Oe(),n.Se||this.removeTarget(e);break;case 3:this.ze(e)&&(n.Ne(),n.De(t.resumeToken));break;case 4:this.ze(e)&&(this.je(e),n.De(t.resumeToken));break;default:_e()}})}forEachTarget(t,e){t.targetIds.length>0?t.targetIds.forEach(e):this.Be.forEach((t,n)=>{this.ze(n)&&e(n)})}He(t){const e=t.targetId,n=t.me.count,i=this.Je(e);if(i){const s=i.target;if(mi(s))if(0===n){const t=new Ke(s.path);this.Ue(e,t,qn.newNoDocument(t,Ge.min()))}else Ee(1===n);else{const i=this.Ye(e);if(i!==n){const n=this.Ze(t),s=n?this.Xe(n,t,i):1;if(0!==s){this.je(e);const t=2===s?"TargetPurposeExistenceFilterMismatchBloom":"TargetPurposeExistenceFilterMismatch";this.Qe=this.Qe.insert(e,t)}}}}}Ze(t){const e=t.me.unchangedNames;if(!e||!e.bits)return null;const{bits:{bitmap:n="",padding:i=0},hashCount:s=0}=e;let r,a;try{r=wn(n).toUint8Array()}catch(o){if(o instanceof pn)return Te("Decoding the base64 bloom filter in existence filter failed ("+o.message+"); ignoring the bloom filter and falling back to full re-query."),null;throw o}try{a=new Ms(r,i,s)}catch(o){return Te(o instanceof Ns?"BloomFilter error: ":"Applying bloom filter failed: ",o),null}return 0===a.Ie?null:a}Xe(t,e,n){return e.me.count===n-this.nt(t,e.targetId)?0:2}nt(t,e){const n=this.Le.getRemoteKeysForTarget(e);let i=0;return n.forEach(n=>{const s=this.Le.tt(),r=`projects/${s.projectId}/databases/${s.database}/documents/${n.path.canonicalString()}`;t.mightContain(r)||(this.Ue(e,n,null),i++)}),i}rt(t){const e=new Map;this.Be.forEach((n,i)=>{const s=this.Je(i);if(s){if(n.current&&mi(s.target)){const e=new Ke(s.target.path);null!==this.ke.get(e)||this.it(i,e)||this.Ue(i,e,qn.newNoDocument(e,t))}n.be&&(e.set(i,n.ve()),n.Ce())}});let n=$i();this.qe.forEach((t,e)=>{let i=!0;e.forEachWhile(t=>{const e=this.Je(t);return!e||"TargetPurposeLimboResolution"===e.purpose||(i=!1,!1)}),i&&(n=n.add(t))}),this.ke.forEach((e,n)=>n.setReadTime(t));const i=new Ls(t,e,this.Qe,this.ke,n);return this.ke=Ni(),this.qe=Us(),this.Qe=new hn(Be),i}$e(t,e){if(!this.ze(t))return;const n=this.it(t,e.key)?2:0;this.Ge(t).Fe(e.key,n),this.ke=this.ke.insert(e.key,e),this.qe=this.qe.insert(e.key,this.st(e.key).add(t))}Ue(t,e,n){if(!this.ze(t))return;const i=this.Ge(t);this.it(t,e)?i.Fe(e,1):i.Me(e),this.qe=this.qe.insert(e,this.st(e).delete(t)),n&&(this.ke=this.ke.insert(e,n))}removeTarget(t){this.Be.delete(t)}Ye(t){const e=this.Ge(t).ve();return this.Le.getRemoteKeysForTarget(t).size+e.addedDocuments.size-e.removedDocuments.size}xe(t){this.Ge(t).xe()}Ge(t){let e=this.Be.get(t);return e||(e=new Vs,this.Be.set(t,e)),e}st(t){let e=this.qe.get(t);return e||(e=new un(Be),this.qe=this.qe.insert(t,e)),e}ze(t){const e=null!==this.Je(t);return e||we("WatchChangeAggregator","Detected inactive target",t),e}Je(t){const e=this.Be.get(t);return e&&e.Se?null:this.Le.ot(t)}je(t){this.Be.set(t,new Vs),this.Le.getRemoteKeysForTarget(t).forEach(e=>{this.Ue(t,e,null)})}it(t,e){return this.Le.getRemoteKeysForTarget(t).has(e)}}function Us(){return new hn(Ke.comparator)}function $s(){return new hn(Ke.comparator)}const Gs=(()=>({asc:"ASCENDING",desc:"DESCENDING"}))(),qs=(()=>({"<":"LESS_THAN","<=":"LESS_THAN_OR_EQUAL",">":"GREATER_THAN",">=":"GREATER_THAN_OR_EQUAL","==":"EQUAL","!=":"NOT_EQUAL","array-contains":"ARRAY_CONTAINS",in:"IN","not-in":"NOT_IN","array-contains-any":"ARRAY_CONTAINS_ANY"}))(),js=(()=>({and:"AND",or:"OR"}))();class Hs{constructor(t,e){this.databaseId=t,this.useProto3Json=e}}function zs(t,e){return t.useProto3Json||nn(e)?e:{value:e}}function Ks(t,e){return t.useProto3Json?`${new Date(1e3*e.seconds).toISOString().replace(/\.\d*/,"").replace("Z","")}.${("000000000"+e.nanoseconds).slice(-9)}Z`:{seconds:""+e.seconds,nanos:e.nanoseconds}}function Ws(t,e){return t.useProto3Json?e.toBase64():e.toUint8Array()}function Qs(t,e){return Ks(t,e.toTimestamp())}function Xs(t){return Ee(!!t),Ge.fromTimestamp(function(t){const e=yn(t);return new $e(e.seconds,e.nanos)}(t))}function Ys(t,e){return Js(t,e).canonicalString()}function Js(t,e){const n=(i=t,new je(["projects",i.projectId,"databases",i.database])).child("documents");var i;return void 0===e?n:n.child(e)}function Zs(t){const e=je.fromString(t);return Ee(yr(e)),e}function tr(t,e){return Ys(t.databaseId,e.path)}function er(t,e){const n=Zs(e);if(n.get(1)!==t.databaseId.projectId)throw new Ae(xe.INVALID_ARGUMENT,"Tried to deserialize key from different project: "+n.get(1)+" vs "+t.databaseId.projectId);if(n.get(3)!==t.databaseId.database)throw new Ae(xe.INVALID_ARGUMENT,"Tried to deserialize key from different database: "+n.get(3)+" vs "+t.databaseId.database);return new Ke(sr(n))}function nr(t,e){return Ys(t.databaseId,e)}function ir(t){return new je(["projects",t.databaseId.projectId,"databases",t.databaseId.database]).canonicalString()}function sr(t){return Ee(t.length>4&&"documents"===t.get(4)),t.popFirst(5)}function rr(t,e,n){return{name:tr(t,e),fields:n.value.mapValue.fields}}function ar(t,e){return{documents:[nr(t,e.path)]}}function or(t,e){const n={structuredQuery:{}},i=e.path;let s;null!==e.collectionGroup?(s=i,n.structuredQuery.from=[{collectionId:e.collectionGroup,allDescendants:!0}]):(s=i.popLast(),n.structuredQuery.from=[{collectionId:i.lastSegment()}]),n.parent=nr(t,s);const r=function(t){if(0!==t.length)return mr(Yn.create(t,"and"))}(e.filters);r&&(n.structuredQuery.where=r);const a=function(t){if(0!==t.length)return t.map(t=>{return{field:fr((e=t).field),direction:lr(e.dir)};var e})}(e.orderBy);a&&(n.structuredQuery.orderBy=a);const o=zs(t,e.limit);return null!==o&&(n.structuredQuery.limit=o),e.startAt&&(n.structuredQuery.startAt={before:(h=e.startAt).inclusive,values:h.position}),e.endAt&&(n.structuredQuery.endAt=function(t){return{before:!t.inclusive,values:t.position}}(e.endAt)),{_t:n,parent:s};var h}function hr(t){let e=function(t){const e=Zs(t);return 4===e.length?je.emptyPath():sr(e)}(t.parent);const n=t.structuredQuery,i=n.from?n.from.length:0;let s=null;if(i>0){Ee(1===i);const t=n.from[0];t.allDescendants?s=t.collectionId:e=e.child(t.collectionId)}let r=[];n.where&&(r=function(t){const e=cr(t);return e instanceof Yn&&Zn(e)?e.getFilters():[e]}(n.where));let a=[];n.orderBy&&(a=n.orderBy.map(t=>{return new Kn(pr((e=t).field),function(t){switch(t){case"ASCENDING":return"asc";case"DESCENDING":return"desc";default:return}}(e.direction));var e}));let o=null;n.limit&&(o=function(t){let e;return e="object"==typeof t?t.value:t,nn(e)?null:e}(n.limit));let h=null;n.startAt&&(h=function(t){const e=!!t.before,n=t.values||[];return new jn(n,e)}(n.startAt));let c=null;return n.endAt&&(c=function(t){const e=!t.before,n=t.values||[];return new jn(n,e)}(n.endAt)),function(t,e,n,i,s,r,a,o){return new gi(t,e,n,i,s,r,a,o)}(e,s,a,r,o,"F",h,c)}function cr(t){return void 0!==t.unaryFilter?function(t){switch(t.unaryFilter.op){case"IS_NAN":const e=pr(t.unaryFilter.field);return Xn.create(e,"==",{doubleValue:NaN});case"IS_NULL":const n=pr(t.unaryFilter.field);return Xn.create(n,"==",{nullValue:"NULL_VALUE"});case"IS_NOT_NAN":const i=pr(t.unaryFilter.field);return Xn.create(i,"!=",{doubleValue:NaN});case"IS_NOT_NULL":const s=pr(t.unaryFilter.field);return Xn.create(s,"!=",{nullValue:"NULL_VALUE"});default:return _e()}}(t):void 0!==t.fieldFilter?(e=t,Xn.create(pr(e.fieldFilter.field),function(t){switch(t){case"EQUAL":return"==";case"NOT_EQUAL":return"!=";case"GREATER_THAN":return">";case"GREATER_THAN_OR_EQUAL":return">=";case"LESS_THAN":return"<";case"LESS_THAN_OR_EQUAL":return"<=";case"ARRAY_CONTAINS":return"array-contains";case"IN":return"in";case"NOT_IN":return"not-in";case"ARRAY_CONTAINS_ANY":return"array-contains-any";default:return _e()}}(e.fieldFilter.op),e.fieldFilter.value)):void 0!==t.compositeFilter?function(t){return Yn.create(t.compositeFilter.filters.map(t=>cr(t)),function(t){switch(t){case"AND":return"and";case"OR":return"or";default:return _e()}}(t.compositeFilter.op))}(t):_e();var e}function lr(t){return Gs[t]}function ur(t){return qs[t]}function dr(t){return js[t]}function fr(t){return{fieldPath:t.canonicalString()}}function pr(t){return ze.fromServerFormat(t.fieldPath)}function mr(t){return t instanceof Xn?function(t){if("=="===t.op){if(Vn(t.value))return{unaryFilter:{field:fr(t.field),op:"IS_NAN"}};if(Fn(t.value))return{unaryFilter:{field:fr(t.field),op:"IS_NULL"}}}else if("!="===t.op){if(Vn(t.value))return{unaryFilter:{field:fr(t.field),op:"IS_NOT_NAN"}};if(Fn(t.value))return{unaryFilter:{field:fr(t.field),op:"IS_NOT_NULL"}}}return{fieldFilter:{field:fr(t.field),op:ur(t.op),value:t.value}}}(t):t instanceof Yn?function(t){const e=t.getFilters().map(t=>mr(t));return 1===e.length?e[0]:{compositeFilter:{op:dr(t.op),filters:e}}}(t):_e()}function gr(t){const e=[];return t.fields.forEach(t=>e.push(t.canonicalString())),{fieldPaths:e}}function yr(t){return t.length>=4&&"projects"===t.get(0)&&"databases"===t.get(2)}
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class vr{constructor(t,e,n,i,s=Ge.min(),r=Ge.min(),a=mn.EMPTY_BYTE_STRING,o=null){this.target=t,this.targetId=e,this.purpose=n,this.sequenceNumber=i,this.snapshotVersion=s,this.lastLimboFreeSnapshotVersion=r,this.resumeToken=a,this.expectedCount=o}withSequenceNumber(t){return new vr(this.target,this.targetId,this.purpose,t,this.snapshotVersion,this.lastLimboFreeSnapshotVersion,this.resumeToken,this.expectedCount)}withResumeToken(t,e){return new vr(this.target,this.targetId,this.purpose,this.sequenceNumber,e,this.lastLimboFreeSnapshotVersion,t,null)}withExpectedCount(t){return new vr(this.target,this.targetId,this.purpose,this.sequenceNumber,this.snapshotVersion,this.lastLimboFreeSnapshotVersion,this.resumeToken,t)}withLastLimboFreeSnapshotVersion(t){return new vr(this.target,this.targetId,this.purpose,this.sequenceNumber,this.snapshotVersion,t,this.resumeToken,this.expectedCount)}}
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class wr{constructor(t){this.ct=t}}function br(t){const e=hr({parent:t.parent,structuredQuery:t.structuredQuery});return"LAST"===t.limitType?_i(e,e.limit,"L"):e}
/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Tr{constructor(){this.un=new Sr}addToCollectionParentIndex(t,e){return this.un.add(e),Ze.resolve()}getCollectionParents(t,e){return Ze.resolve(this.un.getEntries(e))}addFieldIndex(t,e){return Ze.resolve()}deleteFieldIndex(t,e){return Ze.resolve()}deleteAllFieldIndexes(t){return Ze.resolve()}createTargetIndexes(t,e){return Ze.resolve()}getDocumentsMatchingTarget(t,e){return Ze.resolve(null)}getIndexType(t,e){return Ze.resolve(0)}getFieldIndexes(t,e){return Ze.resolve([])}getNextCollectionGroupToUpdate(t){return Ze.resolve(null)}getMinOffset(t,e){return Ze.resolve(Qe.min())}getMinOffsetFromCollectionGroup(t,e){return Ze.resolve(Qe.min())}updateCollectionGroup(t,e,n){return Ze.resolve()}updateIndexEntries(t,e){return Ze.resolve()}}class Sr{constructor(){this.index={}}add(t){const e=t.lastSegment(),n=t.popLast(),i=this.index[e]||new un(je.comparator),s=!i.has(n);return this.index[e]=i.add(n),s}has(t){const e=t.lastSegment(),n=t.popLast(),i=this.index[e];return i&&i.has(n)}getEntries(t){return(this.index[t]||new un(je.comparator)).toArray()}}
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class _r{constructor(t){this.Ln=t}next(){return this.Ln+=2,this.Ln}static Bn(){return new _r(0)}static kn(){return new _r(-1)}}
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Er{constructor(){this.changes=new Di(t=>t.toString(),(t,e)=>t.isEqual(e)),this.changesApplied=!1}addEntry(t){this.assertNotApplied(),this.changes.set(t.key,t)}removeEntry(t,e){this.assertNotApplied(),this.changes.set(t,qn.newInvalidDocument(t).setReadTime(e))}getEntry(t,e){this.assertNotApplied();const n=this.changes.get(e);return void 0!==n?Ze.resolve(n):this.getFromCache(t,e)}getEntries(t,e){return this.getAllFromCache(t,e)}apply(t){return this.assertNotApplied(),this.changesApplied=!0,this.applyChanges(t)}assertNotApplied(){}}
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Ir{constructor(t,e){this.overlayedDocument=t,this.mutatedFields=e}}
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class xr{constructor(t,e,n,i){this.remoteDocumentCache=t,this.mutationQueue=e,this.documentOverlayCache=n,this.indexManager=i}getDocument(t,e){let n=null;return this.documentOverlayCache.getOverlay(t,e).next(i=>(n=i,this.remoteDocumentCache.getEntry(t,e))).next(t=>(null!==n&&us(n.mutation,t,fn.empty(),$e.now()),t))}getDocuments(t,e){return this.remoteDocumentCache.getEntries(t,e).next(e=>this.getLocalViewOfDocuments(t,e,$i()).next(()=>e))}getLocalViewOfDocuments(t,e,n=$i()){const i=Oi();return this.populateOverlays(t,i,e).next(()=>this.computeViews(t,e,i,n).next(t=>{let e=Ri();return t.forEach((t,n)=>{e=e.insert(t,n.overlayedDocument)}),e}))}getOverlayedDocuments(t,e){const n=Oi();return this.populateOverlays(t,n,e).next(()=>this.computeViews(t,e,n,$i()))}populateOverlays(t,e,n){const i=[];return n.forEach(t=>{e.has(t)||i.push(t)}),this.documentOverlayCache.getOverlays(t,i).next(t=>{t.forEach((t,n)=>{e.set(t,n)})})}computeViews(t,e,n,i){let s=Ni();const r=Vi(),a=Vi();return e.forEach((t,e)=>{const a=n.get(e.key);i.has(e.key)&&(void 0===a||a.mutation instanceof ms)?s=s.insert(e.key,e):void 0!==a?(r.set(e.key,a.mutation.getFieldMask()),us(a.mutation,e,a.mutation.getFieldMask(),$e.now())):r.set(e.key,fn.empty())}),this.recalculateAndSaveOverlays(t,s).next(t=>(t.forEach((t,e)=>r.set(t,e)),e.forEach((t,e)=>{var n;return a.set(t,new Ir(e,null!==(n=r.get(t))&&void 0!==n?n:null))}),a))}recalculateAndSaveOverlays(t,e){const n=Vi();let i=new hn((t,e)=>t-e),s=$i();return this.mutationQueue.getAllMutationBatchesAffectingDocumentKeys(t,e).next(t=>{for(const s of t)s.keys().forEach(t=>{const r=e.get(t);if(null===r)return;let a=n.get(t)||fn.empty();a=s.applyToLocalView(r,a),n.set(t,a);const o=(i.get(s.batchId)||$i()).add(t);i=i.insert(s.batchId,o)})}).next(()=>{const r=[],a=i.getReverseIterator();for(;a.hasNext();){const i=a.getNext(),o=i.key,h=i.value,c=Fi();h.forEach(t=>{if(!s.has(t)){const i=cs(e.get(t),n.get(t));null!==i&&c.set(t,i),s=s.add(t)}}),r.push(this.documentOverlayCache.saveOverlays(t,o,c))}return Ze.waitFor(r)}).next(()=>n)}recalculateAndSaveOverlaysForDocumentKeys(t,e){return this.remoteDocumentCache.getEntries(t,e).next(e=>this.recalculateAndSaveOverlays(t,e))}getDocumentsMatchingQuery(t,e,n,i){return s=e,Ke.isDocumentKey(s.path)&&null===s.collectionGroup&&0===s.filters.length?this.getDocumentsMatchingDocumentQuery(t,e.path):wi(e)?this.getDocumentsMatchingCollectionGroupQuery(t,e,n,i):this.getDocumentsMatchingCollectionQuery(t,e,n,i);var s}getNextDocuments(t,e,n,i){return this.remoteDocumentCache.getAllFromCollectionGroup(t,e,n,i).next(s=>{const r=i-s.size>0?this.documentOverlayCache.getOverlaysForCollectionGroup(t,e,n.largestBatchId,i-s.size):Ze.resolve(Oi());let a=-1,o=s;return r.next(e=>Ze.forEach(e,(e,n)=>(a<n.largestBatchId&&(a=n.largestBatchId),s.get(e)?Ze.resolve():this.remoteDocumentCache.getEntry(t,e).next(t=>{o=o.insert(e,t)}))).next(()=>this.populateOverlays(t,e,s)).next(()=>this.computeViews(t,o,e,$i())).next(t=>({batchId:a,changes:Pi(t)})))})}getDocumentsMatchingDocumentQuery(t,e){return this.getDocument(t,new Ke(e)).next(t=>{let e=Ri();return t.isFoundDocument()&&(e=e.insert(t.key,t)),e})}getDocumentsMatchingCollectionGroupQuery(t,e,n,i){const s=e.collectionGroup;let r=Ri();return this.indexManager.getCollectionParents(t,s).next(a=>Ze.forEach(a,a=>{const o=(h=e,c=a.child(s),new gi(c,null,h.explicitOrderBy.slice(),h.filters.slice(),h.limit,h.limitType,h.startAt,h.endAt));var h,c;return this.getDocumentsMatchingCollectionQuery(t,o,n,i).next(t=>{t.forEach((t,e)=>{r=r.insert(t,e)})})}).next(()=>r))}getDocumentsMatchingCollectionQuery(t,e,n,i){let s;return this.documentOverlayCache.getOverlaysForCollection(t,e.path,n.largestBatchId).next(r=>(s=r,this.remoteDocumentCache.getDocumentsMatchingQuery(t,e,n,s,i))).next(t=>{s.forEach((e,n)=>{const i=n.getKey();null===t.get(i)&&(t=t.insert(i,qn.newInvalidDocument(i)))});let n=Ri();return t.forEach((t,i)=>{const r=s.get(t);void 0!==r&&us(r.mutation,i,fn.empty(),$e.now()),Ai(e,i)&&(n=n.insert(t,i))}),n})}}
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Ar{constructor(t){this.serializer=t,this.hr=new Map,this.Pr=new Map}getBundleMetadata(t,e){return Ze.resolve(this.hr.get(e))}saveBundleMetadata(t,e){return this.hr.set(e.id,{id:(n=e).id,version:n.version,createTime:Xs(n.createTime)}),Ze.resolve();var n}getNamedQuery(t,e){return Ze.resolve(this.Pr.get(e))}saveNamedQuery(t,e){return this.Pr.set(e.name,{name:(n=e).name,query:br(n.bundledQuery),readTime:Xs(n.readTime)}),Ze.resolve();var n}}
/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class kr{constructor(){this.overlays=new hn(Ke.comparator),this.Ir=new Map}getOverlay(t,e){return Ze.resolve(this.overlays.get(e))}getOverlays(t,e){const n=Oi();return Ze.forEach(e,e=>this.getOverlay(t,e).next(t=>{null!==t&&n.set(e,t)})).next(()=>n)}saveOverlays(t,e,n){return n.forEach((n,i)=>{this.ht(t,e,i)}),Ze.resolve()}removeOverlaysForBatchId(t,e,n){const i=this.Ir.get(n);return void 0!==i&&(i.forEach(t=>this.overlays=this.overlays.remove(t)),this.Ir.delete(n)),Ze.resolve()}getOverlaysForCollection(t,e,n){const i=Oi(),s=e.length+1,r=new Ke(e.child("")),a=this.overlays.getIteratorFrom(r);for(;a.hasNext();){const t=a.getNext().value,r=t.getKey();if(!e.isPrefixOf(r.path))break;r.path.length===s&&t.largestBatchId>n&&i.set(t.getKey(),t)}return Ze.resolve(i)}getOverlaysForCollectionGroup(t,e,n,i){let s=new hn((t,e)=>t-e);const r=this.overlays.getIterator();for(;r.hasNext();){const t=r.getNext().value;if(t.getKey().getCollectionGroup()===e&&t.largestBatchId>n){let e=s.get(t.largestBatchId);null===e&&(e=Oi(),s=s.insert(t.largestBatchId,e)),e.set(t.getKey(),t)}}const a=Oi(),o=s.getIterator();for(;o.hasNext()&&(o.getNext().value.forEach((t,e)=>a.set(t,e)),!(a.size()>=i)););return Ze.resolve(a)}ht(t,e,n){const i=this.overlays.get(n.key);if(null!==i){const t=this.Ir.get(i.largestBatchId).delete(n.key);this.Ir.set(i.largestBatchId,t)}this.overlays=this.overlays.insert(n.key,new _s(e,n));let s=this.Ir.get(e);void 0===s&&(s=$i(),this.Ir.set(e,s)),this.Ir.set(e,s.add(n.key))}}
/**
 * @license
 * Copyright 2024 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Cr{constructor(){this.sessionToken=mn.EMPTY_BYTE_STRING}getSessionToken(t){return Ze.resolve(this.sessionToken)}setSessionToken(t,e){return this.sessionToken=e,Ze.resolve()}}
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Dr{constructor(){this.Tr=new un(Mr.Er),this.dr=new un(Mr.Ar)}isEmpty(){return this.Tr.isEmpty()}addReference(t,e){const n=new Mr(t,e);this.Tr=this.Tr.add(n),this.dr=this.dr.add(n)}Rr(t,e){t.forEach(t=>this.addReference(t,e))}removeReference(t,e){this.Vr(new Mr(t,e))}mr(t,e){t.forEach(t=>this.removeReference(t,e))}gr(t){const e=new Ke(new je([])),n=new Mr(e,t),i=new Mr(e,t+1),s=[];return this.dr.forEachInRange([n,i],t=>{this.Vr(t),s.push(t.key)}),s}pr(){this.Tr.forEach(t=>this.Vr(t))}Vr(t){this.Tr=this.Tr.delete(t),this.dr=this.dr.delete(t)}yr(t){const e=new Ke(new je([])),n=new Mr(e,t),i=new Mr(e,t+1);let s=$i();return this.dr.forEachInRange([n,i],t=>{s=s.add(t.key)}),s}containsKey(t){const e=new Mr(t,0),n=this.Tr.firstAfterOrEqual(e);return null!==n&&t.isEqual(n.key)}}class Mr{constructor(t,e){this.key=t,this.wr=e}static Er(t,e){return Ke.comparator(t.key,e.key)||Be(t.wr,e.wr)}static Ar(t,e){return Be(t.wr,e.wr)||Ke.comparator(t.key,e.key)}}
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Nr{constructor(t,e){this.indexManager=t,this.referenceDelegate=e,this.mutationQueue=[],this.Sr=1,this.br=new un(Mr.Er)}checkEmpty(t){return Ze.resolve(0===this.mutationQueue.length)}addMutationBatch(t,e,n,i){const s=this.Sr;this.Sr++,this.mutationQueue.length>0&&this.mutationQueue[this.mutationQueue.length-1];const r=new Ts(s,e,n,i);this.mutationQueue.push(r);for(const a of i)this.br=this.br.add(new Mr(a.key,s)),this.indexManager.addToCollectionParentIndex(t,a.key.path.popLast());return Ze.resolve(r)}lookupMutationBatch(t,e){return Ze.resolve(this.Dr(e))}getNextMutationBatchAfterBatchId(t,e){const n=e+1,i=this.vr(n),s=i<0?0:i;return Ze.resolve(this.mutationQueue.length>s?this.mutationQueue[s]:null)}getHighestUnacknowledgedBatchId(){return Ze.resolve(0===this.mutationQueue.length?-1:this.Sr-1)}getAllMutationBatches(t){return Ze.resolve(this.mutationQueue.slice())}getAllMutationBatchesAffectingDocumentKey(t,e){const n=new Mr(e,0),i=new Mr(e,Number.POSITIVE_INFINITY),s=[];return this.br.forEachInRange([n,i],t=>{const e=this.Dr(t.wr);s.push(e)}),Ze.resolve(s)}getAllMutationBatchesAffectingDocumentKeys(t,e){let n=new un(Be);return e.forEach(t=>{const e=new Mr(t,0),i=new Mr(t,Number.POSITIVE_INFINITY);this.br.forEachInRange([e,i],t=>{n=n.add(t.wr)})}),Ze.resolve(this.Cr(n))}getAllMutationBatchesAffectingQuery(t,e){const n=e.path,i=n.length+1;let s=n;Ke.isDocumentKey(s)||(s=s.child(""));const r=new Mr(new Ke(s),0);let a=new un(Be);return this.br.forEachWhile(t=>{const e=t.key.path;return!!n.isPrefixOf(e)&&(e.length===i&&(a=a.add(t.wr)),!0)},r),Ze.resolve(this.Cr(a))}Cr(t){const e=[];return t.forEach(t=>{const n=this.Dr(t);null!==n&&e.push(n)}),e}removeMutationBatch(t,e){Ee(0===this.Fr(e.batchId,"removed")),this.mutationQueue.shift();let n=this.br;return Ze.forEach(e.mutations,i=>{const s=new Mr(i.key,e.batchId);return n=n.delete(s),this.referenceDelegate.markPotentiallyOrphaned(t,i.key)}).next(()=>{this.br=n})}On(t){}containsKey(t,e){const n=new Mr(e,0),i=this.br.firstAfterOrEqual(n);return Ze.resolve(e.isEqual(i&&i.key))}performConsistencyCheck(t){return this.mutationQueue.length,Ze.resolve()}Fr(t,e){return this.vr(t)}vr(t){return 0===this.mutationQueue.length?0:t-this.mutationQueue[0].batchId}Dr(t){const e=this.vr(t);return e<0||e>=this.mutationQueue.length?null:this.mutationQueue[e]}}
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Lr{constructor(t){this.Mr=t,this.docs=new hn(Ke.comparator),this.size=0}setIndexManager(t){this.indexManager=t}addEntry(t,e){const n=e.key,i=this.docs.get(n),s=i?i.size:0,r=this.Mr(e);return this.docs=this.docs.insert(n,{document:e.mutableCopy(),size:r}),this.size+=r-s,this.indexManager.addToCollectionParentIndex(t,n.path.popLast())}removeEntry(t){const e=this.docs.get(t);e&&(this.docs=this.docs.remove(t),this.size-=e.size)}getEntry(t,e){const n=this.docs.get(e);return Ze.resolve(n?n.document.mutableCopy():qn.newInvalidDocument(e))}getEntries(t,e){let n=Ni();return e.forEach(t=>{const e=this.docs.get(t);n=n.insert(t,e?e.document.mutableCopy():qn.newInvalidDocument(t))}),Ze.resolve(n)}getDocumentsMatchingQuery(t,e,n,i){let s=Ni();const r=e.path,a=new Ke(r.child("")),o=this.docs.getIteratorFrom(a);for(;o.hasNext();){const{key:t,value:{document:a}}=o.getNext();if(!r.isPrefixOf(t.path))break;t.path.length>r.length+1||Xe(We(a),n)<=0||(i.has(a.key)||Ai(e,a))&&(s=s.insert(a.key,a.mutableCopy()))}return Ze.resolve(s)}getAllFromCollectionGroup(t,e,n,i){_e()}Or(t,e){return Ze.forEach(this.docs,t=>e(t))}newChangeBuffer(t){return new Rr(this)}getSize(t){return Ze.resolve(this.size)}}class Rr extends Er{constructor(t){super(),this.cr=t}applyChanges(t){const e=[];return this.changes.forEach((n,i)=>{i.isValidDocument()?e.push(this.cr.addEntry(t,i)):this.cr.removeEntry(n)}),Ze.waitFor(e)}getFromCache(t,e){return this.cr.getEntry(t,e)}getAllFromCache(t,e){return this.cr.getEntries(t,e)}}
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Pr{constructor(t){this.persistence=t,this.Nr=new Di(t=>fi(t),pi),this.lastRemoteSnapshotVersion=Ge.min(),this.highestTargetId=0,this.Lr=0,this.Br=new Dr,this.targetCount=0,this.kr=_r.Bn()}forEachTarget(t,e){return this.Nr.forEach((t,n)=>e(n)),Ze.resolve()}getLastRemoteSnapshotVersion(t){return Ze.resolve(this.lastRemoteSnapshotVersion)}getHighestSequenceNumber(t){return Ze.resolve(this.Lr)}allocateTargetId(t){return this.highestTargetId=this.kr.next(),Ze.resolve(this.highestTargetId)}setTargetsMetadata(t,e,n){return n&&(this.lastRemoteSnapshotVersion=n),e>this.Lr&&(this.Lr=e),Ze.resolve()}Kn(t){this.Nr.set(t.target,t);const e=t.targetId;e>this.highestTargetId&&(this.kr=new _r(e),this.highestTargetId=e),t.sequenceNumber>this.Lr&&(this.Lr=t.sequenceNumber)}addTargetData(t,e){return this.Kn(e),this.targetCount+=1,Ze.resolve()}updateTargetData(t,e){return this.Kn(e),Ze.resolve()}removeTargetData(t,e){return this.Nr.delete(e.target),this.Br.gr(e.targetId),this.targetCount-=1,Ze.resolve()}removeTargets(t,e,n){let i=0;const s=[];return this.Nr.forEach((r,a)=>{a.sequenceNumber<=e&&null===n.get(a.targetId)&&(this.Nr.delete(r),s.push(this.removeMatchingKeysForTargetId(t,a.targetId)),i++)}),Ze.waitFor(s).next(()=>i)}getTargetCount(t){return Ze.resolve(this.targetCount)}getTargetData(t,e){const n=this.Nr.get(e)||null;return Ze.resolve(n)}addMatchingKeys(t,e,n){return this.Br.Rr(e,n),Ze.resolve()}removeMatchingKeys(t,e,n){this.Br.mr(e,n);const i=this.persistence.referenceDelegate,s=[];return i&&e.forEach(e=>{s.push(i.markPotentiallyOrphaned(t,e))}),Ze.waitFor(s)}removeMatchingKeysForTargetId(t,e){return this.Br.gr(e),Ze.resolve()}getMatchingKeysForTargetId(t,e){const n=this.Br.yr(e);return Ze.resolve(n)}containsKey(t,e){return Ze.resolve(this.Br.containsKey(e))}}
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Or{constructor(t,e){this.qr={},this.overlays={},this.Qr=new en(0),this.Kr=!1,this.Kr=!0,this.$r=new Cr,this.referenceDelegate=t(this),this.Ur=new Pr(this),this.indexManager=new Tr,this.remoteDocumentCache=new Lr(t=>this.referenceDelegate.Wr(t)),this.serializer=new wr(e),this.Gr=new Ar(this.serializer)}start(){return Promise.resolve()}shutdown(){return this.Kr=!1,Promise.resolve()}get started(){return this.Kr}setDatabaseDeletedListener(){}setNetworkEnabled(){}getIndexManager(t){return this.indexManager}getDocumentOverlayCache(t){let e=this.overlays[t.toKey()];return e||(e=new kr,this.overlays[t.toKey()]=e),e}getMutationQueue(t,e){let n=this.qr[t.toKey()];return n||(n=new Nr(e,this.referenceDelegate),this.qr[t.toKey()]=n),n}getGlobalsCache(){return this.$r}getTargetCache(){return this.Ur}getRemoteDocumentCache(){return this.remoteDocumentCache}getBundleCache(){return this.Gr}runTransaction(t,e,n){we("MemoryPersistence","Starting transaction:",t);const i=new Fr(this.Qr.next());return this.referenceDelegate.zr(),n(i).next(t=>this.referenceDelegate.jr(i).next(()=>t)).toPromise().then(t=>(i.raiseOnCommittedEvent(),t))}Hr(t,e){return Ze.or(Object.values(this.qr).map(n=>()=>n.containsKey(t,e)))}}class Fr extends Ye{constructor(t){super(),this.currentSequenceNumber=t}}class Vr{constructor(t){this.persistence=t,this.Jr=new Dr,this.Yr=null}static Zr(t){return new Vr(t)}get Xr(){if(this.Yr)return this.Yr;throw _e()}addReference(t,e,n){return this.Jr.addReference(n,e),this.Xr.delete(n.toString()),Ze.resolve()}removeReference(t,e,n){return this.Jr.removeReference(n,e),this.Xr.add(n.toString()),Ze.resolve()}markPotentiallyOrphaned(t,e){return this.Xr.add(e.toString()),Ze.resolve()}removeTarget(t,e){this.Jr.gr(e.targetId).forEach(t=>this.Xr.add(t.toString()));const n=this.persistence.getTargetCache();return n.getMatchingKeysForTargetId(t,e.targetId).next(t=>{t.forEach(t=>this.Xr.add(t.toString()))}).next(()=>n.removeTargetData(t,e))}zr(){this.Yr=new Set}jr(t){const e=this.persistence.getRemoteDocumentCache().newChangeBuffer();return Ze.forEach(this.Xr,n=>{const i=Ke.fromPath(n);return this.ei(t,i).next(t=>{t||e.removeEntry(i,Ge.min())})}).next(()=>(this.Yr=null,e.apply(t)))}updateLimboDocument(t,e){return this.ei(t,e).next(t=>{t?this.Xr.delete(e.toString()):this.Xr.add(e.toString())})}Wr(t){return 0}ei(t,e){return Ze.or([()=>Ze.resolve(this.Jr.containsKey(e)),()=>this.persistence.getTargetCache().containsKey(t,e),()=>this.persistence.Hr(t,e)])}}
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Br{constructor(t,e,n,i){this.targetId=t,this.fromCache=e,this.$i=n,this.Ui=i}static Wi(t,e){let n=$i(),i=$i();for(const s of e.docChanges)switch(s.type){case 0:n=n.add(s.doc.key);break;case 1:i=i.add(s.doc.key)}return new Br(t,e.fromCache,n,i)}}
/**
 * @license
 * Copyright 2023 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Ur{constructor(){this._documentReadCount=0}get documentReadCount(){return this._documentReadCount}incrementDocumentReadCount(t){this._documentReadCount+=t}}
/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class $r{constructor(){this.Gi=!1,this.zi=!1,this.ji=100,this.Hi=I()?8:function(t){const e=t.match(/Android ([\d.]+)/i),n=e?e[1].split(".").slice(0,2).join("."):"-1";return Number(n)}("undefined"!=typeof navigator&&"string"==typeof navigator.userAgent?navigator.userAgent:"")>0?6:4}initialize(t,e){this.Ji=t,this.indexManager=e,this.Gi=!0}getDocumentsMatchingQuery(t,e,n,i){const s={result:null};return this.Yi(t,e).next(t=>{s.result=t}).next(()=>{if(!s.result)return this.Zi(t,e,i,n).next(t=>{s.result=t})}).next(()=>{if(s.result)return;const n=new Ur;return this.Xi(t,e,n).next(i=>{if(s.result=i,this.zi)return this.es(t,e,n,i.size)})}).next(()=>s.result)}es(t,e,n,i){return n.documentReadCount<this.ji?(ve()<=O.DEBUG&&we("QueryEngine","SDK will not create cache indexes for query:",xi(e),"since it only creates cache indexes for collection contains","more than or equal to",this.ji,"documents"),Ze.resolve()):(ve()<=O.DEBUG&&we("QueryEngine","Query:",xi(e),"scans",n.documentReadCount,"local documents and returns",i,"documents as results."),n.documentReadCount>this.Hi*i?(ve()<=O.DEBUG&&we("QueryEngine","The SDK decides to create cache indexes for query:",xi(e),"as using cache indexes may help improve performance."),this.indexManager.createTargetIndexes(t,Ti(e))):Ze.resolve())}Yi(t,e){if(vi(e))return Ze.resolve(null);let n=Ti(e);return this.indexManager.getIndexType(t,n).next(i=>0===i?null:(null!==e.limit&&1===i&&(e=_i(e,null,"F"),n=Ti(e)),this.indexManager.getDocumentsMatchingTarget(t,n).next(i=>{const s=$i(...i);return this.Ji.getDocuments(t,s).next(i=>this.indexManager.getMinOffset(t,n).next(n=>{const r=this.ts(e,i);return this.ns(e,r,s,n.readTime)?this.Yi(t,_i(e,null,"F")):this.rs(t,r,e,n)}))})))}Zi(t,e,n,i){return vi(e)||i.isEqual(Ge.min())?Ze.resolve(null):this.Ji.getDocuments(t,n).next(s=>{const r=this.ts(e,s);return this.ns(e,r,n,i)?Ze.resolve(null):(ve()<=O.DEBUG&&we("QueryEngine","Re-using previous result from %s to execute query: %s",i.toString(),xi(e)),this.rs(t,r,e,function(t,e){const n=t.toTimestamp().seconds,i=t.toTimestamp().nanoseconds+1,s=Ge.fromTimestamp(1e9===i?new $e(n+1,0):new $e(n,i));return new Qe(s,Ke.empty(),e)}(i,-1)).next(t=>t))})}ts(t,e){let n=new un(ki(t));return e.forEach((e,i)=>{Ai(t,i)&&(n=n.add(i))}),n}ns(t,e,n,i){if(null===t.limit)return!1;if(n.size!==e.size)return!0;const s="F"===t.limitType?e.last():e.first();return!!s&&(s.hasPendingWrites||s.version.compareTo(i)>0)}Xi(t,e,n){return ve()<=O.DEBUG&&we("QueryEngine","Using full collection scan to execute query:",xi(e)),this.Ji.getDocumentsMatchingQuery(t,e,Qe.min(),n)}rs(t,e,n,i){return this.Ji.getDocumentsMatchingQuery(t,n,i).next(t=>(e.forEach(e=>{t=t.insert(e.key,e)}),t))}}
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Gr{constructor(t,e,n,i){this.persistence=t,this.ss=e,this.serializer=i,this.os=new hn(Be),this._s=new Di(t=>fi(t),pi),this.us=new Map,this.cs=t.getRemoteDocumentCache(),this.Ur=t.getTargetCache(),this.Gr=t.getBundleCache(),this.ls(n)}ls(t){this.documentOverlayCache=this.persistence.getDocumentOverlayCache(t),this.indexManager=this.persistence.getIndexManager(t),this.mutationQueue=this.persistence.getMutationQueue(t,this.indexManager),this.localDocuments=new xr(this.cs,this.mutationQueue,this.documentOverlayCache,this.indexManager),this.cs.setIndexManager(this.indexManager),this.ss.initialize(this.localDocuments,this.indexManager)}collectGarbage(t){return this.persistence.runTransaction("Collect garbage","readwrite-primary",e=>t.collect(e,this.os))}}async function qr(t,e){const n=Ie(t);return await n.persistence.runTransaction("Handle user change","readonly",t=>{let i;return n.mutationQueue.getAllMutationBatches(t).next(s=>(i=s,n.ls(e),n.mutationQueue.getAllMutationBatches(t))).next(e=>{const s=[],r=[];let a=$i();for(const t of i){s.push(t.batchId);for(const e of t.mutations)a=a.add(e.key)}for(const t of e){r.push(t.batchId);for(const e of t.mutations)a=a.add(e.key)}return n.localDocuments.getDocuments(t,a).next(t=>({hs:t,removedBatchIds:s,addedBatchIds:r}))})})}function jr(t){const e=Ie(t);return e.persistence.runTransaction("Get last remote snapshot version","readonly",t=>e.Ur.getLastRemoteSnapshotVersion(t))}function Hr(t,e){const n=Ie(t),i=e.snapshotVersion;let s=n.os;return n.persistence.runTransaction("Apply remote event","readwrite-primary",t=>{const r=n.cs.newChangeBuffer({trackRemovals:!0});s=n.os;const a=[];e.targetChanges.forEach((r,o)=>{const h=s.get(o);if(!h)return;a.push(n.Ur.removeMatchingKeys(t,r.removedDocuments,o).next(()=>n.Ur.addMatchingKeys(t,r.addedDocuments,o)));let c=h.withSequenceNumber(t.currentSequenceNumber);var l,u,d;null!==e.targetMismatches.get(o)?c=c.withResumeToken(mn.EMPTY_BYTE_STRING,Ge.min()).withLastLimboFreeSnapshotVersion(Ge.min()):r.resumeToken.approximateByteSize()>0&&(c=c.withResumeToken(r.resumeToken,i)),s=s.insert(o,c),u=c,d=r,(0===(l=h).resumeToken.approximateByteSize()||u.snapshotVersion.toMicroseconds()-l.snapshotVersion.toMicroseconds()>=3e8||d.addedDocuments.size+d.modifiedDocuments.size+d.removedDocuments.size>0)&&a.push(n.Ur.updateTargetData(t,c))});let o=Ni(),h=$i();if(e.documentUpdates.forEach(i=>{e.resolvedLimboDocuments.has(i)&&a.push(n.persistence.referenceDelegate.updateLimboDocument(t,i))}),a.push(function(t,e,n){let i=$i(),s=$i();return n.forEach(t=>i=i.add(t)),e.getEntries(t,i).next(t=>{let i=Ni();return n.forEach((n,r)=>{const a=t.get(n);r.isFoundDocument()!==a.isFoundDocument()&&(s=s.add(n)),r.isNoDocument()&&r.version.isEqual(Ge.min())?(e.removeEntry(n,r.readTime),i=i.insert(n,r)):!a.isValidDocument()||r.version.compareTo(a.version)>0||0===r.version.compareTo(a.version)&&a.hasPendingWrites?(e.addEntry(r),i=i.insert(n,r)):we("LocalStore","Ignoring outdated watch update for ",n,". Current version:",a.version," Watch version:",r.version)}),{Ps:i,Is:s}})}(t,r,e.documentUpdates).next(t=>{o=t.Ps,h=t.Is})),!i.isEqual(Ge.min())){const e=n.Ur.getLastRemoteSnapshotVersion(t).next(e=>n.Ur.setTargetsMetadata(t,t.currentSequenceNumber,i));a.push(e)}return Ze.waitFor(a).next(()=>r.apply(t)).next(()=>n.localDocuments.getLocalViewOfDocuments(t,o,h)).next(()=>o)}).then(t=>(n.os=s,t))}function zr(t,e){const n=Ie(t);return n.persistence.runTransaction("Get next mutation batch","readonly",t=>(void 0===e&&(e=-1),n.mutationQueue.getNextMutationBatchAfterBatchId(t,e)))}async function Kr(t,e,n){const i=Ie(t),s=i.os.get(e),r=n?"readwrite":"readwrite-primary";try{n||await i.persistence.runTransaction("Release target",r,t=>i.persistence.referenceDelegate.removeTarget(t,s))}catch(a){if(!tn(a))throw a;we("LocalStore",`Failed to update sequence numbers for target ${e}: ${a}`)}i.os=i.os.remove(e),i._s.delete(s.target)}function Wr(t,e,n){const i=Ie(t);let s=Ge.min(),r=$i();return i.persistence.runTransaction("Execute query","readwrite",t=>function(t,e,n){const i=Ie(t),s=i._s.get(n);return void 0!==s?Ze.resolve(i.os.get(s)):i.Ur.getTargetData(e,n)}(i,t,Ti(e)).next(e=>{if(e)return s=e.lastLimboFreeSnapshotVersion,i.Ur.getMatchingKeysForTargetId(t,e.targetId).next(t=>{r=t})}).next(()=>i.ss.getDocumentsMatchingQuery(t,e,n?s:Ge.min(),n?r:$i())).next(t=>(function(t,e,n){let i=t.us.get(e)||Ge.min();n.forEach((t,e)=>{e.readTime.compareTo(i)>0&&(i=e.readTime)}),t.us.set(e,i)}(i,function(t){return t.collectionGroup||(t.path.length%2==1?t.path.lastSegment():t.path.get(t.path.length-2))}(e),t),{documents:t,Ts:r})))}class Qr{constructor(){this.activeTargetIds=Gi}fs(t){this.activeTargetIds=this.activeTargetIds.add(t)}gs(t){this.activeTargetIds=this.activeTargetIds.delete(t)}Vs(){const t={activeTargetIds:this.activeTargetIds.toArray(),updateTimeMs:Date.now()};return JSON.stringify(t)}}class Xr{constructor(){this.so=new Qr,this.oo={},this.onlineStateHandler=null,this.sequenceNumberHandler=null}addPendingMutation(t){}updateMutationState(t,e,n){}addLocalQueryTarget(t,e=!0){return e&&this.so.fs(t),this.oo[t]||"not-current"}updateQueryState(t,e,n){this.oo[t]=e}removeLocalQueryTarget(t){this.so.gs(t)}isLocalQueryTarget(t){return this.so.activeTargetIds.has(t)}clearQueryState(t){delete this.oo[t]}getAllActiveQueryTargets(){return this.so.activeTargetIds}isActiveQueryTarget(t){return this.so.activeTargetIds.has(t)}start(){return this.so=new Qr,Promise.resolve()}handleUserChange(t,e,n){}setOnlineState(t){}shutdown(){}writeSequenceNumber(t){}notifyBundleLoaded(t){}}
/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Yr{_o(t){}shutdown(){}}
/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Jr{constructor(){this.ao=()=>this.uo(),this.co=()=>this.lo(),this.ho=[],this.Po()}_o(t){this.ho.push(t)}shutdown(){window.removeEventListener("online",this.ao),window.removeEventListener("offline",this.co)}Po(){window.addEventListener("online",this.ao),window.addEventListener("offline",this.co)}uo(){we("ConnectivityMonitor","Network connectivity changed: AVAILABLE");for(const t of this.ho)t(0)}lo(){we("ConnectivityMonitor","Network connectivity changed: UNAVAILABLE");for(const t of this.ho)t(1)}static D(){return"undefined"!=typeof window&&void 0!==window.addEventListener&&void 0!==window.removeEventListener}}
/**
 * @license
 * Copyright 2023 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */let Zr=null;function ta(){return null===Zr?Zr=268435456+Math.round(2147483648*Math.random()):Zr++,"0x"+Zr.toString(16)
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */}const ea={BatchGetDocuments:"batchGet",Commit:"commit",RunQuery:"runQuery",RunAggregationQuery:"runAggregationQuery"};
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class na{constructor(t){this.Io=t.Io,this.To=t.To}Eo(t){this.Ao=t}Ro(t){this.Vo=t}mo(t){this.fo=t}onMessage(t){this.po=t}close(){this.To()}send(t){this.Io(t)}yo(){this.Ao()}wo(){this.Vo()}So(t){this.fo(t)}bo(t){this.po(t)}}
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const ia="WebChannelConnection";class sa extends class{constructor(t){this.databaseInfo=t,this.databaseId=t.databaseId;const e=t.ssl?"https":"http",n=encodeURIComponent(this.databaseId.projectId),i=encodeURIComponent(this.databaseId.database);this.Do=e+"://"+t.host,this.vo=`projects/${n}/databases/${i}`,this.Co="(default)"===this.databaseId.database?`project_id=${n}`:`project_id=${n}&database_id=${i}`}get Fo(){return!1}Mo(t,e,n,i,s){const r=ta(),a=this.xo(t,e.toUriEncodedString());we("RestConnection",`Sending RPC '${t}' ${r}:`,a,n);const o={"google-cloud-resource-prefix":this.vo,"x-goog-request-params":this.Co};return this.Oo(o,i,s),this.No(t,a,o,n).then(e=>(we("RestConnection",`Received RPC '${t}' ${r}: `,e),e),e=>{throw Te("RestConnection",`RPC '${t}' ${r} failed with error: `,e,"url: ",a,"request:",n),e})}Lo(t,e,n,i,s,r){return this.Mo(t,e,n,i,s)}Oo(t,e,n){t["X-Goog-Api-Client"]="gl-js/ fire/"+ge,t["Content-Type"]="text/plain",this.databaseInfo.appId&&(t["X-Firebase-GMPID"]=this.databaseInfo.appId),e&&e.headers.forEach((e,n)=>t[n]=e),n&&n.headers.forEach((e,n)=>t[n]=e)}xo(t,e){const n=ea[t];return`${this.Do}/v1/${e}:${n}`}terminate(){}}{constructor(t){super(t),this.forceLongPolling=t.forceLongPolling,this.autoDetectLongPolling=t.autoDetectLongPolling,this.useFetchStreams=t.useFetchStreams,this.longPollingOptions=t.longPollingOptions}No(t,e,n,i){const s=ta();return new Promise((r,a)=>{const o=new re;o.setWithCredentials(!0),o.listenOnce(oe.COMPLETE,()=>{try{switch(o.getLastErrorCode()){case he.NO_ERROR:const e=o.getResponseJson();we(ia,`XHR for RPC '${t}' ${s} received:`,JSON.stringify(e)),r(e);break;case he.TIMEOUT:we(ia,`RPC '${t}' ${s} timed out`),a(new Ae(xe.DEADLINE_EXCEEDED,"Request time out"));break;case he.HTTP_ERROR:const n=o.getStatus();if(we(ia,`RPC '${t}' ${s} failed with status:`,n,"response text:",o.getResponseText()),n>0){let t=o.getResponseJson();Array.isArray(t)&&(t=t[0]);const e=null==t?void 0:t.error;if(e&&e.status&&e.message){const t=function(t){const e=t.toLowerCase().replace(/_/g,"-");return Object.values(xe).indexOf(e)>=0?e:xe.UNKNOWN}(e.status);a(new Ae(t,e.message))}else a(new Ae(xe.UNKNOWN,"Server responded with status "+o.getStatus()))}else a(new Ae(xe.UNAVAILABLE,"Connection failed."));break;default:_e()}}finally{we(ia,`RPC '${t}' ${s} completed.`)}});const h=JSON.stringify(i);we(ia,`RPC '${t}' ${s} sending request:`,i),o.send(e,"POST",h,n,15)})}Bo(t,e,n){const i=ta(),s=[this.Do,"/","google.firestore.v1.Firestore","/",t,"/channel"],r=de(),a=ue(),o={httpSessionIdParam:"gsessionid",initMessageHeaders:{},messageUrlParams:{database:`projects/${this.databaseId.projectId}/databases/${this.databaseId.database}`},sendRawJson:!0,supportsCrossDomainXhr:!0,internalChannelParams:{forwardChannelRequestTimeoutMs:6e5},forceLongPolling:this.forceLongPolling,detectBufferingProxy:this.autoDetectLongPolling},h=this.longPollingOptions.timeoutSeconds;void 0!==h&&(o.longPollingTimeout=Math.round(1e3*h)),this.useFetchStreams&&(o.useFetchStreams=!0),this.Oo(o.initMessageHeaders,e,n),o.encodeInitMessageHeaders=!0;const c=s.join("");we(ia,`Creating RPC '${t}' stream ${i}: ${c}`,o);const l=r.createWebChannel(c,o);let u=!1,d=!1;const f=new na({Io:e=>{d?we(ia,`Not sending because RPC '${t}' stream ${i} is closed:`,e):(u||(we(ia,`Opening RPC '${t}' stream ${i} transport.`),l.open(),u=!0),we(ia,`RPC '${t}' stream ${i} sending:`,e),l.send(e))},To:()=>l.close()}),p=(t,e,n)=>{t.listen(e,t=>{try{n(t)}catch(e){setTimeout(()=>{throw e},0)}})};return p(l,ae.EventType.OPEN,()=>{d||(we(ia,`RPC '${t}' stream ${i} transport opened.`),f.yo())}),p(l,ae.EventType.CLOSE,()=>{d||(d=!0,we(ia,`RPC '${t}' stream ${i} transport closed`),f.So())}),p(l,ae.EventType.ERROR,e=>{d||(d=!0,Te(ia,`RPC '${t}' stream ${i} transport errored:`,e),f.So(new Ae(xe.UNAVAILABLE,"The operation could not be completed")))}),p(l,ae.EventType.MESSAGE,e=>{var n;if(!d){const s=e.data[0];Ee(!!s);const r=s,a=r.error||(null===(n=r[0])||void 0===n?void 0:n.error);if(a){we(ia,`RPC '${t}' stream ${i} received error:`,a);const e=a.status;let n=function(t){const e=Is[t];if(void 0!==e)return As(e)}(e),s=a.message;void 0===n&&(n=xe.INTERNAL,s="Unknown error status: "+e+" with message "+a.message),d=!0,f.So(new Ae(n,s)),l.close()}else we(ia,`RPC '${t}' stream ${i} received:`,s),f.bo(s)}}),p(a,le.STAT_EVENT,e=>{e.stat===ce.PROXY?we(ia,`RPC '${t}' stream ${i} detected buffering proxy`):e.stat===ce.NOPROXY&&we(ia,`RPC '${t}' stream ${i} detected no buffering proxy`)}),setTimeout(()=>{f.wo()},0),f}}function ra(){return"undefined"!=typeof document?document:null}
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function aa(t){return new Hs(t,!0)}
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class oa{constructor(t,e,n=1e3,i=1.5,s=6e4){this.ui=t,this.timerId=e,this.ko=n,this.qo=i,this.Qo=s,this.Ko=0,this.$o=null,this.Uo=Date.now(),this.reset()}reset(){this.Ko=0}Wo(){this.Ko=this.Qo}Go(t){this.cancel();const e=Math.floor(this.Ko+this.zo()),n=Math.max(0,Date.now()-this.Uo),i=Math.max(0,e-n);i>0&&we("ExponentialBackoff",`Backing off for ${i} ms (base delay: ${this.Ko} ms, delay with jitter: ${e} ms, last attempt: ${n} ms ago)`),this.$o=this.ui.enqueueAfterDelay(this.timerId,i,()=>(this.Uo=Date.now(),t())),this.Ko*=this.qo,this.Ko<this.ko&&(this.Ko=this.ko),this.Ko>this.Qo&&(this.Ko=this.Qo)}jo(){null!==this.$o&&(this.$o.skipDelay(),this.$o=null)}cancel(){null!==this.$o&&(this.$o.cancel(),this.$o=null)}zo(){return(Math.random()-.5)*this.Ko}}
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ha{constructor(t,e,n,i,s,r,a,o){this.ui=t,this.Ho=n,this.Jo=i,this.connection=s,this.authCredentialsProvider=r,this.appCheckCredentialsProvider=a,this.listener=o,this.state=0,this.Yo=0,this.Zo=null,this.Xo=null,this.stream=null,this.e_=0,this.t_=new oa(t,e)}n_(){return 1===this.state||5===this.state||this.r_()}r_(){return 2===this.state||3===this.state}start(){this.e_=0,4!==this.state?this.auth():this.i_()}async stop(){this.n_()&&await this.close(0)}s_(){this.state=0,this.t_.reset()}o_(){this.r_()&&null===this.Zo&&(this.Zo=this.ui.enqueueAfterDelay(this.Ho,6e4,()=>this.__()))}a_(t){this.u_(),this.stream.send(t)}async __(){if(this.r_())return this.close(0)}u_(){this.Zo&&(this.Zo.cancel(),this.Zo=null)}c_(){this.Xo&&(this.Xo.cancel(),this.Xo=null)}async close(t,e){this.u_(),this.c_(),this.t_.cancel(),this.Yo++,4!==t?this.t_.reset():e&&e.code===xe.RESOURCE_EXHAUSTED?(be(e.toString()),be("Using maximum backoff delay to prevent overloading the backend."),this.t_.Wo()):e&&e.code===xe.UNAUTHENTICATED&&3!==this.state&&(this.authCredentialsProvider.invalidateToken(),this.appCheckCredentialsProvider.invalidateToken()),null!==this.stream&&(this.l_(),this.stream.close(),this.stream=null),this.state=t,await this.listener.mo(e)}l_(){}auth(){this.state=1;const t=this.h_(this.Yo),e=this.Yo;Promise.all([this.authCredentialsProvider.getToken(),this.appCheckCredentialsProvider.getToken()]).then(([t,n])=>{this.Yo===e&&this.P_(t,n)},e=>{t(()=>{const t=new Ae(xe.UNKNOWN,"Fetching auth token failed: "+e.message);return this.I_(t)})})}P_(t,e){const n=this.h_(this.Yo);this.stream=this.T_(t,e),this.stream.Eo(()=>{n(()=>this.listener.Eo())}),this.stream.Ro(()=>{n(()=>(this.state=2,this.Xo=this.ui.enqueueAfterDelay(this.Jo,1e4,()=>(this.r_()&&(this.state=3),Promise.resolve())),this.listener.Ro()))}),this.stream.mo(t=>{n(()=>this.I_(t))}),this.stream.onMessage(t=>{n(()=>1==++this.e_?this.E_(t):this.onNext(t))})}i_(){this.state=5,this.t_.Go(async()=>{this.state=0,this.start()})}I_(t){return we("PersistentStream",`close with error: ${t}`),this.stream=null,this.close(4,t)}h_(t){return e=>{this.ui.enqueueAndForget(()=>this.Yo===t?e():(we("PersistentStream","stream callback skipped by getCloseGuardedDispatcher."),Promise.resolve()))}}}class ca extends ha{constructor(t,e,n,i,s,r){super(t,"listen_stream_connection_backoff","listen_stream_idle","health_check_timeout",e,n,i,r),this.serializer=s}T_(t,e){return this.connection.Bo("Listen",t,e)}E_(t){return this.onNext(t)}onNext(t){this.t_.reset();const e=function(t,e){let n;if("targetChange"in e){e.targetChange;const s="NO_CHANGE"===(i=e.targetChange.targetChangeType||"NO_CHANGE")?0:"ADD"===i?1:"REMOVE"===i?2:"CURRENT"===i?3:"RESET"===i?4:_e(),r=e.targetChange.targetIds||[],a=function(t,e){return t.useProto3Json?(Ee(void 0===e||"string"==typeof e),mn.fromBase64String(e||"")):(Ee(void 0===e||e instanceof Buffer||e instanceof Uint8Array),mn.fromUint8Array(e||new Uint8Array))}(t,e.targetChange.resumeToken),o=e.targetChange.cause,h=o&&function(t){const e=void 0===t.code?xe.UNKNOWN:As(t.code);return new Ae(e,t.message||"")}(o);n=new Fs(s,r,a,h||null)}else if("documentChange"in e){e.documentChange;const i=e.documentChange;i.document,i.document.name,i.document.updateTime;const s=er(t,i.document.name),r=Xs(i.document.updateTime),a=i.document.createTime?Xs(i.document.createTime):Ge.min(),o=new $n({mapValue:{fields:i.document.fields}}),h=qn.newFoundDocument(s,r,a,o),c=i.targetIds||[],l=i.removedTargetIds||[];n=new Ps(c,l,h.key,h)}else if("documentDelete"in e){e.documentDelete;const i=e.documentDelete;i.document;const s=er(t,i.document),r=i.readTime?Xs(i.readTime):Ge.min(),a=qn.newNoDocument(s,r),o=i.removedTargetIds||[];n=new Ps([],o,a.key,a)}else if("documentRemove"in e){e.documentRemove;const i=e.documentRemove;i.document;const s=er(t,i.document),r=i.removedTargetIds||[];n=new Ps([],r,s,null)}else{if(!("filter"in e))return _e();{e.filter;const t=e.filter;t.targetId;const{count:i=0,unchangedNames:s}=t,r=new Es(i,s),a=t.targetId;n=new Os(a,r)}}var i;return n}(this.serializer,t),n=function(t){if(!("targetChange"in t))return Ge.min();const e=t.targetChange;return e.targetIds&&e.targetIds.length?Ge.min():e.readTime?Xs(e.readTime):Ge.min()}(t);return this.listener.d_(e,n)}A_(t){const e={};e.database=ir(this.serializer),e.addTarget=function(t,e){let n;const i=e.target;if(n=mi(i)?{documents:ar(t,i)}:{query:or(t,i)._t},n.targetId=e.targetId,e.resumeToken.approximateByteSize()>0){n.resumeToken=Ws(t,e.resumeToken);const i=zs(t,e.expectedCount);null!==i&&(n.expectedCount=i)}else if(e.snapshotVersion.compareTo(Ge.min())>0){n.readTime=Ks(t,e.snapshotVersion.toTimestamp());const i=zs(t,e.expectedCount);null!==i&&(n.expectedCount=i)}return n}(this.serializer,t);const n=function(t,e){const n=function(t){switch(t){case"TargetPurposeListen":return null;case"TargetPurposeExistenceFilterMismatch":return"existence-filter-mismatch";case"TargetPurposeExistenceFilterMismatchBloom":return"existence-filter-mismatch-bloom";case"TargetPurposeLimboResolution":return"limbo-document";default:return _e()}}(e.purpose);return null==n?null:{"goog-listen-tags":n}}(this.serializer,t);n&&(e.labels=n),this.a_(e)}R_(t){const e={};e.database=ir(this.serializer),e.removeTarget=t,this.a_(e)}}class la extends ha{constructor(t,e,n,i,s,r){super(t,"write_stream_connection_backoff","write_stream_idle","health_check_timeout",e,n,i,r),this.serializer=s}get V_(){return this.e_>0}start(){this.lastStreamToken=void 0,super.start()}l_(){this.V_&&this.m_([])}T_(t,e){return this.connection.Bo("Write",t,e)}E_(t){return Ee(!!t.streamToken),this.lastStreamToken=t.streamToken,Ee(!t.writeResults||0===t.writeResults.length),this.listener.f_()}onNext(t){Ee(!!t.streamToken),this.lastStreamToken=t.streamToken,this.t_.reset();const e=function(t,e){return t&&t.length>0?(Ee(void 0!==e),t.map(t=>function(t,e){let n=t.updateTime?Xs(t.updateTime):Xs(e);return n.isEqual(Ge.min())&&(n=Xs(e)),new rs(n,t.transformResults||[])}(t,e))):[]}(t.writeResults,t.commitTime),n=Xs(t.commitTime);return this.listener.g_(n,e)}p_(){const t={};t.database=ir(this.serializer),this.a_(t)}m_(t){const e={streamToken:this.lastStreamToken,writes:t.map(t=>function(t,e){let n;if(e instanceof ps)n={update:rr(t,e.key,e.value)};else if(e instanceof ws)n={delete:tr(t,e.key)};else if(e instanceof ms)n={update:rr(t,e.key,e.data),updateMask:gr(e.fieldMask)};else{if(!(e instanceof bs))return _e();n={verify:tr(t,e.key)}}return e.fieldTransforms.length>0&&(n.updateTransforms=e.fieldTransforms.map(t=>function(t,e){const n=e.transform;if(n instanceof Xi)return{fieldPath:e.field.canonicalString(),setToServerValue:"REQUEST_TIME"};if(n instanceof Yi)return{fieldPath:e.field.canonicalString(),appendMissingElements:{values:n.elements}};if(n instanceof Zi)return{fieldPath:e.field.canonicalString(),removeAllFromArray:{values:n.elements}};if(n instanceof es)return{fieldPath:e.field.canonicalString(),increment:n.Pe};throw _e()}(0,t))),e.precondition.isNone||(n.currentDocument=(i=t,void 0!==(s=e.precondition).updateTime?{updateTime:Qs(i,s.updateTime)}:void 0!==s.exists?{exists:s.exists}:_e())),n;var i,s}(this.serializer,t))};this.a_(e)}}
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ua extends class{}{constructor(t,e,n,i){super(),this.authCredentials=t,this.appCheckCredentials=e,this.connection=n,this.serializer=i,this.y_=!1}w_(){if(this.y_)throw new Ae(xe.FAILED_PRECONDITION,"The client has already been terminated.")}Mo(t,e,n,i){return this.w_(),Promise.all([this.authCredentials.getToken(),this.appCheckCredentials.getToken()]).then(([s,r])=>this.connection.Mo(t,Js(e,n),i,s,r)).catch(t=>{throw"FirebaseError"===t.name?(t.code===xe.UNAUTHENTICATED&&(this.authCredentials.invalidateToken(),this.appCheckCredentials.invalidateToken()),t):new Ae(xe.UNKNOWN,t.toString())})}Lo(t,e,n,i,s){return this.w_(),Promise.all([this.authCredentials.getToken(),this.appCheckCredentials.getToken()]).then(([r,a])=>this.connection.Lo(t,Js(e,n),i,r,a,s)).catch(t=>{throw"FirebaseError"===t.name?(t.code===xe.UNAUTHENTICATED&&(this.authCredentials.invalidateToken(),this.appCheckCredentials.invalidateToken()),t):new Ae(xe.UNKNOWN,t.toString())})}terminate(){this.y_=!0,this.connection.terminate()}}class da{constructor(t,e){this.asyncQueue=t,this.onlineStateHandler=e,this.state="Unknown",this.S_=0,this.b_=null,this.D_=!0}v_(){0===this.S_&&(this.C_("Unknown"),this.b_=this.asyncQueue.enqueueAfterDelay("online_state_timeout",1e4,()=>(this.b_=null,this.F_("Backend didn't respond within 10 seconds."),this.C_("Offline"),Promise.resolve())))}M_(t){"Online"===this.state?this.C_("Unknown"):(this.S_++,this.S_>=1&&(this.x_(),this.F_(`Connection failed 1 times. Most recent error: ${t.toString()}`),this.C_("Offline")))}set(t){this.x_(),this.S_=0,"Online"===t&&(this.D_=!1),this.C_(t)}C_(t){t!==this.state&&(this.state=t,this.onlineStateHandler(t))}F_(t){const e=`Could not reach Cloud Firestore backend. ${t}\nThis typically indicates that your device does not have a healthy Internet connection at the moment. The client will operate in offline mode until it is able to successfully connect to the backend.`;this.D_?(be(e),this.D_=!1):we("OnlineStateTracker",e)}x_(){null!==this.b_&&(this.b_.cancel(),this.b_=null)}}
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class fa{constructor(t,e,n,i,s){this.localStore=t,this.datastore=e,this.asyncQueue=n,this.remoteSyncer={},this.O_=[],this.N_=new Map,this.L_=new Set,this.B_=[],this.k_=s,this.k_._o(t=>{n.enqueueAndForget(async()=>{Sa(this)&&(we("RemoteStore","Restarting streams for network reachability change."),await async function(t){const e=Ie(t);e.L_.add(4),await ma(e),e.q_.set("Unknown"),e.L_.delete(4),await pa(e)}(this))})}),this.q_=new da(n,i)}}async function pa(t){if(Sa(t))for(const e of t.B_)await e(!0)}async function ma(t){for(const e of t.B_)await e(!1)}function ga(t,e){const n=Ie(t);n.N_.has(e.targetId)||(n.N_.set(e.targetId,e),Ta(n)?ba(n):Ua(n).r_()&&va(n,e))}function ya(t,e){const n=Ie(t),i=Ua(n);n.N_.delete(e),i.r_()&&wa(n,e),0===n.N_.size&&(i.r_()?i.o_():Sa(n)&&n.q_.set("Unknown"))}function va(t,e){if(t.Q_.xe(e.targetId),e.resumeToken.approximateByteSize()>0||e.snapshotVersion.compareTo(Ge.min())>0){const n=t.remoteSyncer.getRemoteKeysForTarget(e.targetId).size;e=e.withExpectedCount(n)}Ua(t).A_(e)}function wa(t,e){t.Q_.xe(e),Ua(t).R_(e)}function ba(t){t.Q_=new Bs({getRemoteKeysForTarget:e=>t.remoteSyncer.getRemoteKeysForTarget(e),ot:e=>t.N_.get(e)||null,tt:()=>t.datastore.serializer.databaseId}),Ua(t).start(),t.q_.v_()}function Ta(t){return Sa(t)&&!Ua(t).n_()&&t.N_.size>0}function Sa(t){return 0===Ie(t).L_.size}function _a(t){t.Q_=void 0}async function Ea(t){t.q_.set("Online")}async function Ia(t){t.N_.forEach((e,n)=>{va(t,e)})}async function xa(t,e){_a(t),Ta(t)?(t.q_.M_(e),ba(t)):t.q_.set("Unknown")}async function Aa(t,e,n){if(t.q_.set("Online"),e instanceof Fs&&2===e.state&&e.cause)try{await async function(t,e){const n=e.cause;for(const i of e.targetIds)t.N_.has(i)&&(await t.remoteSyncer.rejectListen(i,n),t.N_.delete(i),t.Q_.removeTarget(i))}(t,e)}catch(i){we("RemoteStore","Failed to remove targets %s: %s ",e.targetIds.join(","),i),await ka(t,i)}else if(e instanceof Ps?t.Q_.Ke(e):e instanceof Os?t.Q_.He(e):t.Q_.We(e),!n.isEqual(Ge.min()))try{const e=await jr(t.localStore);n.compareTo(e)>=0&&await function(t,e){const n=t.Q_.rt(e);return n.targetChanges.forEach((n,i)=>{if(n.resumeToken.approximateByteSize()>0){const s=t.N_.get(i);s&&t.N_.set(i,s.withResumeToken(n.resumeToken,e))}}),n.targetMismatches.forEach((e,n)=>{const i=t.N_.get(e);if(!i)return;t.N_.set(e,i.withResumeToken(mn.EMPTY_BYTE_STRING,i.snapshotVersion)),wa(t,e);const s=new vr(i.target,e,n,i.sequenceNumber);va(t,s)}),t.remoteSyncer.applyRemoteEvent(n)}(t,n)}catch(s){we("RemoteStore","Failed to raise snapshot:",s),await ka(t,s)}}async function ka(t,e,n){if(!tn(e))throw e;t.L_.add(1),await ma(t),t.q_.set("Offline"),n||(n=()=>jr(t.localStore)),t.asyncQueue.enqueueRetryable(async()=>{we("RemoteStore","Retrying IndexedDB access"),await n(),t.L_.delete(1),await pa(t)})}function Ca(t,e){return e().catch(n=>ka(t,n,e))}async function Da(t){const e=Ie(t),n=$a(e);let i=e.O_.length>0?e.O_[e.O_.length-1].batchId:-1;for(;Ma(e);)try{const t=await zr(e.localStore,i);if(null===t){0===e.O_.length&&n.o_();break}i=t.batchId,Na(e,t)}catch(s){await ka(e,s)}La(e)&&Ra(e)}function Ma(t){return Sa(t)&&t.O_.length<10}function Na(t,e){t.O_.push(e);const n=$a(t);n.r_()&&n.V_&&n.m_(e.mutations)}function La(t){return Sa(t)&&!$a(t).n_()&&t.O_.length>0}function Ra(t){$a(t).start()}async function Pa(t){$a(t).p_()}async function Oa(t){const e=$a(t);for(const n of t.O_)e.m_(n.mutations)}async function Fa(t,e,n){const i=t.O_.shift(),s=Ss.from(i,e,n);await Ca(t,()=>t.remoteSyncer.applySuccessfulWrite(s)),await Da(t)}async function Va(t,e){e&&$a(t).V_&&await async function(t,e){if(function(t){switch(t){default:return _e();case xe.CANCELLED:case xe.UNKNOWN:case xe.DEADLINE_EXCEEDED:case xe.RESOURCE_EXHAUSTED:case xe.INTERNAL:case xe.UNAVAILABLE:case xe.UNAUTHENTICATED:return!1;case xe.INVALID_ARGUMENT:case xe.NOT_FOUND:case xe.ALREADY_EXISTS:case xe.PERMISSION_DENIED:case xe.FAILED_PRECONDITION:case xe.ABORTED:case xe.OUT_OF_RANGE:case xe.UNIMPLEMENTED:case xe.DATA_LOSS:return!0}}(n=e.code)&&n!==xe.ABORTED){const n=t.O_.shift();$a(t).s_(),await Ca(t,()=>t.remoteSyncer.rejectFailedWrite(n.batchId,e)),await Da(t)}var n}(t,e),La(t)&&Ra(t)}async function Ba(t,e){const n=Ie(t);n.asyncQueue.verifyOperationInProgress(),we("RemoteStore","RemoteStore received new credentials");const i=Sa(n);n.L_.add(3),await ma(n),i&&n.q_.set("Unknown"),await n.remoteSyncer.handleCredentialChange(e),n.L_.delete(3),await pa(n)}function Ua(t){return t.K_||(t.K_=function(t,e,n){const i=Ie(t);return i.w_(),new ca(e,i.connection,i.authCredentials,i.appCheckCredentials,i.serializer,n)}(t.datastore,t.asyncQueue,{Eo:Ea.bind(null,t),Ro:Ia.bind(null,t),mo:xa.bind(null,t),d_:Aa.bind(null,t)}),t.B_.push(async e=>{e?(t.K_.s_(),Ta(t)?ba(t):t.q_.set("Unknown")):(await t.K_.stop(),_a(t))})),t.K_}function $a(t){return t.U_||(t.U_=function(t,e,n){const i=Ie(t);return i.w_(),new la(e,i.connection,i.authCredentials,i.appCheckCredentials,i.serializer,n)}(t.datastore,t.asyncQueue,{Eo:()=>Promise.resolve(),Ro:Pa.bind(null,t),mo:Va.bind(null,t),f_:Oa.bind(null,t),g_:Fa.bind(null,t)}),t.B_.push(async e=>{e?(t.U_.s_(),await Da(t)):(await t.U_.stop(),t.O_.length>0&&(we("RemoteStore",`Stopping write stream with ${t.O_.length} pending writes`),t.O_=[]))})),t.U_
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */}class Ga{constructor(t,e,n,i,s){this.asyncQueue=t,this.timerId=e,this.targetTimeMs=n,this.op=i,this.removalCallback=s,this.deferred=new ke,this.then=this.deferred.promise.then.bind(this.deferred.promise),this.deferred.promise.catch(t=>{})}get promise(){return this.deferred.promise}static createAndSchedule(t,e,n,i,s){const r=Date.now()+n,a=new Ga(t,e,r,i,s);return a.start(n),a}start(t){this.timerHandle=setTimeout(()=>this.handleDelayElapsed(),t)}skipDelay(){return this.handleDelayElapsed()}cancel(t){null!==this.timerHandle&&(this.clearTimeout(),this.deferred.reject(new Ae(xe.CANCELLED,"Operation cancelled"+(t?": "+t:""))))}handleDelayElapsed(){this.asyncQueue.enqueueAndForget(()=>null!==this.timerHandle?(this.clearTimeout(),this.op().then(t=>this.deferred.resolve(t))):Promise.resolve())}clearTimeout(){null!==this.timerHandle&&(this.removalCallback(this),clearTimeout(this.timerHandle),this.timerHandle=null)}}function qa(t,e){if(be("AsyncQueue",`${e}: ${t}`),tn(t))return new Ae(xe.UNAVAILABLE,`${e}: ${t}`);throw t}
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ja{constructor(t){this.comparator=t?(e,n)=>t(e,n)||Ke.comparator(e.key,n.key):(t,e)=>Ke.comparator(t.key,e.key),this.keyedMap=Ri(),this.sortedSet=new hn(this.comparator)}static emptySet(t){return new ja(t.comparator)}has(t){return null!=this.keyedMap.get(t)}get(t){return this.keyedMap.get(t)}first(){return this.sortedSet.minKey()}last(){return this.sortedSet.maxKey()}isEmpty(){return this.sortedSet.isEmpty()}indexOf(t){const e=this.keyedMap.get(t);return e?this.sortedSet.indexOf(e):-1}get size(){return this.sortedSet.size}forEach(t){this.sortedSet.inorderTraversal((e,n)=>(t(e),!1))}add(t){const e=this.delete(t.key);return e.copy(e.keyedMap.insert(t.key,t),e.sortedSet.insert(t,null))}delete(t){const e=this.get(t);return e?this.copy(this.keyedMap.remove(t),this.sortedSet.remove(e)):this}isEqual(t){if(!(t instanceof ja))return!1;if(this.size!==t.size)return!1;const e=this.sortedSet.getIterator(),n=t.sortedSet.getIterator();for(;e.hasNext();){const t=e.getNext().key,i=n.getNext().key;if(!t.isEqual(i))return!1}return!0}toString(){const t=[];return this.forEach(e=>{t.push(e.toString())}),0===t.length?"DocumentSet ()":"DocumentSet (\n  "+t.join("  \n")+"\n)"}copy(t,e){const n=new ja;return n.comparator=this.comparator,n.keyedMap=t,n.sortedSet=e,n}}
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Ha{constructor(){this.W_=new hn(Ke.comparator)}track(t){const e=t.doc.key,n=this.W_.get(e);n?0!==t.type&&3===n.type?this.W_=this.W_.insert(e,t):3===t.type&&1!==n.type?this.W_=this.W_.insert(e,{type:n.type,doc:t.doc}):2===t.type&&2===n.type?this.W_=this.W_.insert(e,{type:2,doc:t.doc}):2===t.type&&0===n.type?this.W_=this.W_.insert(e,{type:0,doc:t.doc}):1===t.type&&0===n.type?this.W_=this.W_.remove(e):1===t.type&&2===n.type?this.W_=this.W_.insert(e,{type:1,doc:n.doc}):0===t.type&&1===n.type?this.W_=this.W_.insert(e,{type:2,doc:t.doc}):_e():this.W_=this.W_.insert(e,t)}G_(){const t=[];return this.W_.inorderTraversal((e,n)=>{t.push(n)}),t}}class za{constructor(t,e,n,i,s,r,a,o,h){this.query=t,this.docs=e,this.oldDocs=n,this.docChanges=i,this.mutatedKeys=s,this.fromCache=r,this.syncStateChanged=a,this.excludesMetadataChanges=o,this.hasCachedResults=h}static fromInitialDocuments(t,e,n,i,s){const r=[];return e.forEach(t=>{r.push({type:0,doc:t})}),new za(t,e,ja.emptySet(e),r,n,i,!0,!1,s)}get hasPendingWrites(){return!this.mutatedKeys.isEmpty()}isEqual(t){if(!(this.fromCache===t.fromCache&&this.hasCachedResults===t.hasCachedResults&&this.syncStateChanged===t.syncStateChanged&&this.mutatedKeys.isEqual(t.mutatedKeys)&&Ei(this.query,t.query)&&this.docs.isEqual(t.docs)&&this.oldDocs.isEqual(t.oldDocs)))return!1;const e=this.docChanges,n=t.docChanges;if(e.length!==n.length)return!1;for(let i=0;i<e.length;i++)if(e[i].type!==n[i].type||!e[i].doc.isEqual(n[i].doc))return!1;return!0}}
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Ka{constructor(){this.z_=void 0,this.j_=[]}H_(){return this.j_.some(t=>t.J_())}}class Wa{constructor(){this.queries=Qa(),this.onlineState="Unknown",this.Y_=new Set}terminate(){!function(t,e){const n=Ie(t),i=n.queries;n.queries=Qa(),i.forEach((t,n)=>{for(const i of n.j_)i.onError(e)})}(this,new Ae(xe.ABORTED,"Firestore shutting down"))}}function Qa(){return new Di(t=>Ii(t),Ei)}function Xa(t,e){const n=Ie(t);let i=!1;for(const s of e){const t=s.query,e=n.queries.get(t);if(e){for(const t of e.j_)t.X_(s)&&(i=!0);e.z_=s}}i&&Ja(n)}function Ya(t,e,n){const i=Ie(t),s=i.queries.get(e);if(s)for(const r of s.j_)r.onError(n);i.queries.delete(e)}function Ja(t){t.Y_.forEach(t=>{t.next()})}var Za,to;(to=Za||(Za={})).ea="default",to.Cache="cache";class eo{constructor(t,e,n){this.query=t,this.ta=e,this.na=!1,this.ra=null,this.onlineState="Unknown",this.options=n||{}}X_(t){if(!this.options.includeMetadataChanges){const e=[];for(const n of t.docChanges)3!==n.type&&e.push(n);t=new za(t.query,t.docs,t.oldDocs,e,t.mutatedKeys,t.fromCache,t.syncStateChanged,!0,t.hasCachedResults)}let e=!1;return this.na?this.ia(t)&&(this.ta.next(t),e=!0):this.sa(t,this.onlineState)&&(this.oa(t),e=!0),this.ra=t,e}onError(t){this.ta.error(t)}Z_(t){this.onlineState=t;let e=!1;return this.ra&&!this.na&&this.sa(this.ra,t)&&(this.oa(this.ra),e=!0),e}sa(t,e){if(!t.fromCache)return!0;if(!this.J_())return!0;const n="Offline"!==e;return(!this.options._a||!n)&&(!t.docs.isEmpty()||t.hasCachedResults||"Offline"===e)}ia(t){if(t.docChanges.length>0)return!0;const e=this.ra&&this.ra.hasPendingWrites!==t.hasPendingWrites;return!(!t.syncStateChanged&&!e)&&!0===this.options.includeMetadataChanges}oa(t){t=za.fromInitialDocuments(t.query,t.docs,t.mutatedKeys,t.fromCache,t.hasCachedResults),this.na=!0,this.ta.next(t)}J_(){return this.options.source!==Za.Cache}}
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class no{constructor(t){this.key=t}}class io{constructor(t){this.key=t}}class so{constructor(t,e){this.query=t,this.Ta=e,this.Ea=null,this.hasCachedResults=!1,this.current=!1,this.da=$i(),this.mutatedKeys=$i(),this.Aa=ki(t),this.Ra=new ja(this.Aa)}get Va(){return this.Ta}ma(t,e){const n=e?e.fa:new Ha,i=e?e.Ra:this.Ra;let s=e?e.mutatedKeys:this.mutatedKeys,r=i,a=!1;const o="F"===this.query.limitType&&i.size===this.query.limit?i.last():null,h="L"===this.query.limitType&&i.size===this.query.limit?i.first():null;if(t.inorderTraversal((t,e)=>{const c=i.get(t),l=Ai(this.query,e)?e:null,u=!!c&&this.mutatedKeys.has(c.key),d=!!l&&(l.hasLocalMutations||this.mutatedKeys.has(l.key)&&l.hasCommittedMutations);let f=!1;c&&l?c.data.isEqual(l.data)?u!==d&&(n.track({type:3,doc:l}),f=!0):this.ga(c,l)||(n.track({type:2,doc:l}),f=!0,(o&&this.Aa(l,o)>0||h&&this.Aa(l,h)<0)&&(a=!0)):!c&&l?(n.track({type:0,doc:l}),f=!0):c&&!l&&(n.track({type:1,doc:c}),f=!0,(o||h)&&(a=!0)),f&&(l?(r=r.add(l),s=d?s.add(t):s.delete(t)):(r=r.delete(t),s=s.delete(t)))}),null!==this.query.limit)for(;r.size>this.query.limit;){const t="F"===this.query.limitType?r.last():r.first();r=r.delete(t.key),s=s.delete(t.key),n.track({type:1,doc:t})}return{Ra:r,fa:n,ns:a,mutatedKeys:s}}ga(t,e){return t.hasLocalMutations&&e.hasCommittedMutations&&!e.hasLocalMutations}applyChanges(t,e,n,i){const s=this.Ra;this.Ra=t.Ra,this.mutatedKeys=t.mutatedKeys;const r=t.fa.G_();r.sort((t,e)=>function(t,e){const n=t=>{switch(t){case 0:return 1;case 2:case 3:return 2;case 1:return 0;default:return _e()}};return n(t)-n(e)}(t.type,e.type)||this.Aa(t.doc,e.doc)),this.pa(n),i=null!=i&&i;const a=e&&!i?this.ya():[],o=0===this.da.size&&this.current&&!i?1:0,h=o!==this.Ea;return this.Ea=o,0!==r.length||h?{snapshot:new za(this.query,t.Ra,s,r,t.mutatedKeys,0===o,h,!1,!!n&&n.resumeToken.approximateByteSize()>0),wa:a}:{wa:a}}Z_(t){return this.current&&"Offline"===t?(this.current=!1,this.applyChanges({Ra:this.Ra,fa:new Ha,mutatedKeys:this.mutatedKeys,ns:!1},!1)):{wa:[]}}Sa(t){return!this.Ta.has(t)&&!!this.Ra.has(t)&&!this.Ra.get(t).hasLocalMutations}pa(t){t&&(t.addedDocuments.forEach(t=>this.Ta=this.Ta.add(t)),t.modifiedDocuments.forEach(t=>{}),t.removedDocuments.forEach(t=>this.Ta=this.Ta.delete(t)),this.current=t.current)}ya(){if(!this.current)return[];const t=this.da;this.da=$i(),this.Ra.forEach(t=>{this.Sa(t.key)&&(this.da=this.da.add(t.key))});const e=[];return t.forEach(t=>{this.da.has(t)||e.push(new io(t))}),this.da.forEach(n=>{t.has(n)||e.push(new no(n))}),e}ba(t){this.Ta=t.Ts,this.da=$i();const e=this.ma(t.documents);return this.applyChanges(e,!0)}Da(){return za.fromInitialDocuments(this.query,this.Ra,this.mutatedKeys,0===this.Ea,this.hasCachedResults)}}class ro{constructor(t,e,n){this.query=t,this.targetId=e,this.view=n}}class ao{constructor(t){this.key=t,this.va=!1}}class oo{constructor(t,e,n,i,s,r){this.localStore=t,this.remoteStore=e,this.eventManager=n,this.sharedClientState=i,this.currentUser=s,this.maxConcurrentLimboResolutions=r,this.Ca={},this.Fa=new Di(t=>Ii(t),Ei),this.Ma=new Map,this.xa=new Set,this.Oa=new hn(Ke.comparator),this.Na=new Map,this.La=new Dr,this.Ba={},this.ka=new Map,this.qa=_r.kn(),this.onlineState="Unknown",this.Qa=void 0}get isPrimaryClient(){return!0===this.Qa}}async function ho(t,e,n=!0){const i=Do(t);let s;const r=i.Fa.get(e);return r?(i.sharedClientState.addLocalQueryTarget(r.targetId),s=r.view.Da()):s=await lo(i,e,n,!0),s}async function co(t,e){const n=Do(t);await lo(n,e,!0,!1)}async function lo(t,e,n,i){const s=await function(t,e){const n=Ie(t);return n.persistence.runTransaction("Allocate target","readwrite",t=>{let i;return n.Ur.getTargetData(t,e).next(s=>s?(i=s,Ze.resolve(i)):n.Ur.allocateTargetId(t).next(s=>(i=new vr(e,s,"TargetPurposeListen",t.currentSequenceNumber),n.Ur.addTargetData(t,i).next(()=>i))))}).then(t=>{const i=n.os.get(t.targetId);return(null===i||t.snapshotVersion.compareTo(i.snapshotVersion)>0)&&(n.os=n.os.insert(t.targetId,t),n._s.set(e,t.targetId)),t})}(t.localStore,Ti(e)),r=s.targetId,a=t.sharedClientState.addLocalQueryTarget(r,n);let o;return i&&(o=await async function(t,e,n,i,s){t.Ka=(e,n,i)=>async function(t,e,n,i){let s=e.view.ma(n);s.ns&&(s=await Wr(t.localStore,e.query,!1).then(({documents:t})=>e.view.ma(t,s)));const r=i&&i.targetChanges.get(e.targetId),a=i&&null!=i.targetMismatches.get(e.targetId),o=e.view.applyChanges(s,t.isPrimaryClient,r,a);return Eo(t,e.targetId,o.wa),o.snapshot}(t,e,n,i);const r=await Wr(t.localStore,e,!0),a=new so(e,r.Ts),o=a.ma(r.documents),h=Rs.createSynthesizedTargetChangeForCurrentChange(n,i&&"Offline"!==t.onlineState,s),c=a.applyChanges(o,t.isPrimaryClient,h);Eo(t,n,c.wa);const l=new ro(e,n,a);return t.Fa.set(e,l),t.Ma.has(n)?t.Ma.get(n).push(e):t.Ma.set(n,[e]),c.snapshot}(t,e,r,"current"===a,s.resumeToken)),t.isPrimaryClient&&n&&ga(t.remoteStore,s),o}async function uo(t,e,n){const i=Ie(t),s=i.Fa.get(e),r=i.Ma.get(s.targetId);if(r.length>1)return i.Ma.set(s.targetId,r.filter(t=>!Ei(t,e))),void i.Fa.delete(e);i.isPrimaryClient?(i.sharedClientState.removeLocalQueryTarget(s.targetId),i.sharedClientState.isActiveQueryTarget(s.targetId)||await Kr(i.localStore,s.targetId,!1).then(()=>{i.sharedClientState.clearQueryState(s.targetId),n&&ya(i.remoteStore,s.targetId),So(i,s.targetId)}).catch(Je)):(So(i,s.targetId),await Kr(i.localStore,s.targetId,!0))}async function fo(t,e){const n=Ie(t),i=n.Fa.get(e),s=n.Ma.get(i.targetId);n.isPrimaryClient&&1===s.length&&(n.sharedClientState.removeLocalQueryTarget(i.targetId),ya(n.remoteStore,i.targetId))}async function po(t,e,n){const i=function(t){const e=Ie(t);return e.remoteStore.remoteSyncer.applySuccessfulWrite=vo.bind(null,e),e.remoteStore.remoteSyncer.rejectFailedWrite=wo.bind(null,e),e}(t);try{const t=await function(t,e){const n=Ie(t),i=$e.now(),s=e.reduce((t,e)=>t.add(e.key),$i());let r,a;return n.persistence.runTransaction("Locally write mutations","readwrite",t=>{let o=Ni(),h=$i();return n.cs.getEntries(t,s).next(t=>{o=t,o.forEach((t,e)=>{e.isValidDocument()||(h=h.add(t))})}).next(()=>n.localDocuments.getOverlayedDocuments(t,o)).next(s=>{r=s;const a=[];for(const t of e){const e=ds(t,r.get(t.key).overlayedDocument);null!=e&&a.push(new ms(t.key,e,Gn(e.value.mapValue),as.exists(!0)))}return n.mutationQueue.addMutationBatch(t,i,a,e)}).next(e=>{a=e;const i=e.applyToLocalDocumentSet(r,h);return n.documentOverlayCache.saveOverlays(t,e.batchId,i)})}).then(()=>({batchId:a.batchId,changes:Pi(r)}))}(i.localStore,e);i.sharedClientState.addPendingMutation(t.batchId),function(t,e,n){let i=t.Ba[t.currentUser.toKey()];i||(i=new hn(Be)),i=i.insert(e,n),t.Ba[t.currentUser.toKey()]=i}(i,t.batchId,n),await Ao(i,t.changes),await Da(i.remoteStore)}catch(s){const t=qa(s,"Failed to persist write");n.reject(t)}}async function mo(t,e){const n=Ie(t);try{const t=await Hr(n.localStore,e);e.targetChanges.forEach((t,e)=>{const i=n.Na.get(e);i&&(Ee(t.addedDocuments.size+t.modifiedDocuments.size+t.removedDocuments.size<=1),t.addedDocuments.size>0?i.va=!0:t.modifiedDocuments.size>0?Ee(i.va):t.removedDocuments.size>0&&(Ee(i.va),i.va=!1))}),await Ao(n,t,e)}catch(i){await Je(i)}}function go(t,e,n){const i=Ie(t);if(i.isPrimaryClient&&0===n||!i.isPrimaryClient&&1===n){const t=[];i.Fa.forEach((n,i)=>{const s=i.view.Z_(e);s.snapshot&&t.push(s.snapshot)}),function(t,e){const n=Ie(t);n.onlineState=e;let i=!1;n.queries.forEach((t,n)=>{for(const s of n.j_)s.Z_(e)&&(i=!0)}),i&&Ja(n)}(i.eventManager,e),t.length&&i.Ca.d_(t),i.onlineState=e,i.isPrimaryClient&&i.sharedClientState.setOnlineState(e)}}async function yo(t,e,n){const i=Ie(t);i.sharedClientState.updateQueryState(e,"rejected",n);const s=i.Na.get(e),r=s&&s.key;if(r){let t=new hn(Ke.comparator);t=t.insert(r,qn.newNoDocument(r,Ge.min()));const n=$i().add(r),s=new Ls(Ge.min(),new Map,new hn(Be),t,n);await mo(i,s),i.Oa=i.Oa.remove(r),i.Na.delete(e),xo(i)}else await Kr(i.localStore,e,!1).then(()=>So(i,e,n)).catch(Je)}async function vo(t,e){const n=Ie(t),i=e.batch.batchId;try{const t=await function(t,e){const n=Ie(t);return n.persistence.runTransaction("Acknowledge batch","readwrite-primary",t=>{const i=e.batch.keys(),s=n.cs.newChangeBuffer({trackRemovals:!0});return function(t,e,n,i){const s=n.batch,r=s.keys();let a=Ze.resolve();return r.forEach(t=>{a=a.next(()=>i.getEntry(e,t)).next(e=>{const r=n.docVersions.get(t);Ee(null!==r),e.version.compareTo(r)<0&&(s.applyToRemoteDocument(e,n),e.isValidDocument()&&(e.setReadTime(n.commitVersion),i.addEntry(e)))})}),a.next(()=>t.mutationQueue.removeMutationBatch(e,s))}(n,t,e,s).next(()=>s.apply(t)).next(()=>n.mutationQueue.performConsistencyCheck(t)).next(()=>n.documentOverlayCache.removeOverlaysForBatchId(t,i,e.batch.batchId)).next(()=>n.localDocuments.recalculateAndSaveOverlaysForDocumentKeys(t,function(t){let e=$i();for(let n=0;n<t.mutationResults.length;++n)t.mutationResults[n].transformResults.length>0&&(e=e.add(t.batch.mutations[n].key));return e}(e))).next(()=>n.localDocuments.getDocuments(t,i))})}(n.localStore,e);To(n,i,null),bo(n,i),n.sharedClientState.updateMutationState(i,"acknowledged"),await Ao(n,t)}catch(s){await Je(s)}}async function wo(t,e,n){const i=Ie(t);try{const t=await function(t,e){const n=Ie(t);return n.persistence.runTransaction("Reject batch","readwrite-primary",t=>{let i;return n.mutationQueue.lookupMutationBatch(t,e).next(e=>(Ee(null!==e),i=e.keys(),n.mutationQueue.removeMutationBatch(t,e))).next(()=>n.mutationQueue.performConsistencyCheck(t)).next(()=>n.documentOverlayCache.removeOverlaysForBatchId(t,i,e)).next(()=>n.localDocuments.recalculateAndSaveOverlaysForDocumentKeys(t,i)).next(()=>n.localDocuments.getDocuments(t,i))})}(i.localStore,e);To(i,e,n),bo(i,e),i.sharedClientState.updateMutationState(e,"rejected",n),await Ao(i,t)}catch(s){await Je(s)}}function bo(t,e){(t.ka.get(e)||[]).forEach(t=>{t.resolve()}),t.ka.delete(e)}function To(t,e,n){const i=Ie(t);let s=i.Ba[i.currentUser.toKey()];if(s){const t=s.get(e);t&&(n?t.reject(n):t.resolve(),s=s.remove(e)),i.Ba[i.currentUser.toKey()]=s}}function So(t,e,n=null){t.sharedClientState.removeLocalQueryTarget(e);for(const i of t.Ma.get(e))t.Fa.delete(i),n&&t.Ca.$a(i,n);t.Ma.delete(e),t.isPrimaryClient&&t.La.gr(e).forEach(e=>{t.La.containsKey(e)||_o(t,e)})}function _o(t,e){t.xa.delete(e.path.canonicalString());const n=t.Oa.get(e);null!==n&&(ya(t.remoteStore,n),t.Oa=t.Oa.remove(e),t.Na.delete(n),xo(t))}function Eo(t,e,n){for(const i of n)i instanceof no?(t.La.addReference(i.key,e),Io(t,i)):i instanceof io?(we("SyncEngine","Document no longer in limbo: "+i.key),t.La.removeReference(i.key,e),t.La.containsKey(i.key)||_o(t,i.key)):_e()}function Io(t,e){const n=e.key,i=n.path.canonicalString();t.Oa.get(n)||t.xa.has(i)||(we("SyncEngine","New document in limbo: "+n),t.xa.add(i),xo(t))}function xo(t){for(;t.xa.size>0&&t.Oa.size<t.maxConcurrentLimboResolutions;){const e=t.xa.values().next().value;t.xa.delete(e);const n=new Ke(je.fromString(e)),i=t.qa.next();t.Na.set(i,new ao(n)),t.Oa=t.Oa.insert(n,i),ga(t.remoteStore,new vr(Ti(yi(n.path)),i,"TargetPurposeLimboResolution",en.oe))}}async function Ao(t,e,n){const i=Ie(t),s=[],r=[],a=[];i.Fa.isEmpty()||(i.Fa.forEach((t,o)=>{a.push(i.Ka(o,e,n).then(t=>{var e;if((t||n)&&i.isPrimaryClient){const s=t?!t.fromCache:null===(e=null==n?void 0:n.targetChanges.get(o.targetId))||void 0===e?void 0:e.current;i.sharedClientState.updateQueryState(o.targetId,s?"current":"not-current")}if(t){s.push(t);const e=Br.Wi(o.targetId,t);r.push(e)}}))}),await Promise.all(a),i.Ca.d_(s),await async function(t,e){const n=Ie(t);try{await n.persistence.runTransaction("notifyLocalViewChanges","readwrite",t=>Ze.forEach(e,e=>Ze.forEach(e.$i,i=>n.persistence.referenceDelegate.addReference(t,e.targetId,i)).next(()=>Ze.forEach(e.Ui,i=>n.persistence.referenceDelegate.removeReference(t,e.targetId,i)))))}catch(i){if(!tn(i))throw i;we("LocalStore","Failed to update sequence numbers: "+i)}for(const s of e){const t=s.targetId;if(!s.fromCache){const e=n.os.get(t),i=e.snapshotVersion,s=e.withLastLimboFreeSnapshotVersion(i);n.os=n.os.insert(t,s)}}}(i.localStore,r))}async function ko(t,e){const n=Ie(t);if(!n.currentUser.isEqual(e)){we("SyncEngine","User change. New user:",e.toKey());const t=await qr(n.localStore,e);n.currentUser=e,s="'waitForPendingWrites' promise is rejected due to a user change.",(i=n).ka.forEach(t=>{t.forEach(t=>{t.reject(new Ae(xe.CANCELLED,s))})}),i.ka.clear(),n.sharedClientState.handleUserChange(e,t.removedBatchIds,t.addedBatchIds),await Ao(n,t.hs)}var i,s}function Co(t,e){const n=Ie(t),i=n.Na.get(e);if(i&&i.va)return $i().add(i.key);{let t=$i();const i=n.Ma.get(e);if(!i)return t;for(const e of i){const i=n.Fa.get(e);t=t.unionWith(i.view.Va)}return t}}function Do(t){const e=Ie(t);return e.remoteStore.remoteSyncer.applyRemoteEvent=mo.bind(null,e),e.remoteStore.remoteSyncer.getRemoteKeysForTarget=Co.bind(null,e),e.remoteStore.remoteSyncer.rejectListen=yo.bind(null,e),e.Ca.d_=Xa.bind(null,e.eventManager),e.Ca.$a=Ya.bind(null,e.eventManager),e}class Mo{constructor(){this.kind="memory",this.synchronizeTabs=!1}async initialize(t){this.serializer=aa(t.databaseInfo.databaseId),this.sharedClientState=this.Wa(t),this.persistence=this.Ga(t),await this.persistence.start(),this.localStore=this.za(t),this.gcScheduler=this.ja(t,this.localStore),this.indexBackfillerScheduler=this.Ha(t,this.localStore)}ja(t,e){return null}Ha(t,e){return null}za(t){return function(t,e,n,i){return new Gr(t,e,n,i)}(this.persistence,new $r,t.initialUser,this.serializer)}Ga(t){return new Or(Vr.Zr,this.serializer)}Wa(t){return new Xr}async terminate(){var t,e;null===(t=this.gcScheduler)||void 0===t||t.stop(),null===(e=this.indexBackfillerScheduler)||void 0===e||e.stop(),this.sharedClientState.shutdown(),await this.persistence.shutdown()}}Mo.provider={build:()=>new Mo};class No{async initialize(t,e){this.localStore||(this.localStore=t.localStore,this.sharedClientState=t.sharedClientState,this.datastore=this.createDatastore(e),this.remoteStore=this.createRemoteStore(e),this.eventManager=this.createEventManager(e),this.syncEngine=this.createSyncEngine(e,!t.synchronizeTabs),this.sharedClientState.onlineStateHandler=t=>go(this.syncEngine,t,1),this.remoteStore.remoteSyncer.handleCredentialChange=ko.bind(null,this.syncEngine),await async function(t,e){const n=Ie(t);e?(n.L_.delete(2),await pa(n)):e||(n.L_.add(2),await ma(n),n.q_.set("Unknown"))}(this.remoteStore,this.syncEngine.isPrimaryClient))}createEventManager(t){return new Wa}createDatastore(t){const e=aa(t.databaseInfo.databaseId),n=(i=t.databaseInfo,new sa(i));var i;return function(t,e,n,i){return new ua(t,e,n,i)}(t.authCredentials,t.appCheckCredentials,n,e)}createRemoteStore(t){return e=this.localStore,n=this.datastore,i=t.asyncQueue,s=t=>go(this.syncEngine,t,0),r=Jr.D()?new Jr:new Yr,new fa(e,n,i,s,r);var e,n,i,s,r}createSyncEngine(t,e){return function(t,e,n,i,s,r,a){const o=new oo(t,e,n,i,s,r);return a&&(o.Qa=!0),o}(this.localStore,this.remoteStore,this.eventManager,this.sharedClientState,t.initialUser,t.maxConcurrentLimboResolutions,e)}async terminate(){var t,e;await async function(t){const e=Ie(t);we("RemoteStore","RemoteStore shutting down."),e.L_.add(5),await ma(e),e.k_.shutdown(),e.q_.set("Unknown")}(this.remoteStore),null===(t=this.datastore)||void 0===t||t.terminate(),null===(e=this.eventManager)||void 0===e||e.terminate()}}No.provider={build:()=>new No};
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
class Lo{constructor(t){this.observer=t,this.muted=!1}next(t){this.muted||this.observer.next&&this.Ya(this.observer.next,t)}error(t){this.muted||(this.observer.error?this.Ya(this.observer.error,t):be("Uncaught Error in snapshot listener:",t.toString()))}Za(){this.muted=!0}Ya(t,e){setTimeout(()=>{this.muted||t(e)},0)}}
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Ro{constructor(t,e,n,i,s){this.authCredentials=t,this.appCheckCredentials=e,this.asyncQueue=n,this.databaseInfo=i,this.user=me.UNAUTHENTICATED,this.clientId=Ve.newId(),this.authCredentialListener=()=>Promise.resolve(),this.appCheckCredentialListener=()=>Promise.resolve(),this._uninitializedComponentsProvider=s,this.authCredentials.start(n,async t=>{we("FirestoreClient","Received user=",t.uid),await this.authCredentialListener(t),this.user=t}),this.appCheckCredentials.start(n,t=>(we("FirestoreClient","Received new app check token=",t),this.appCheckCredentialListener(t,this.user)))}get configuration(){return{asyncQueue:this.asyncQueue,databaseInfo:this.databaseInfo,clientId:this.clientId,authCredentials:this.authCredentials,appCheckCredentials:this.appCheckCredentials,initialUser:this.user,maxConcurrentLimboResolutions:100}}setCredentialChangeListener(t){this.authCredentialListener=t}setAppCheckTokenChangeListener(t){this.appCheckCredentialListener=t}terminate(){this.asyncQueue.enterRestrictedMode();const t=new ke;return this.asyncQueue.enqueueAndForgetEvenWhileRestricted(async()=>{try{this._onlineComponents&&await this._onlineComponents.terminate(),this._offlineComponents&&await this._offlineComponents.terminate(),this.authCredentials.shutdown(),this.appCheckCredentials.shutdown(),t.resolve()}catch(e){const n=qa(e,"Failed to shutdown persistence");t.reject(n)}}),t.promise}}async function Po(t,e){t.asyncQueue.verifyOperationInProgress(),we("FirestoreClient","Initializing OfflineComponentProvider");const n=t.configuration;await e.initialize(n);let i=n.initialUser;t.setCredentialChangeListener(async t=>{i.isEqual(t)||(await qr(e.localStore,t),i=t)}),e.persistence.setDatabaseDeletedListener(()=>t.terminate()),t._offlineComponents=e}async function Oo(t,e){t.asyncQueue.verifyOperationInProgress();const n=await async function(t){if(!t._offlineComponents)if(t._uninitializedComponentsProvider){we("FirestoreClient","Using user provided OfflineComponentProvider");try{await Po(t,t._uninitializedComponentsProvider._offline)}catch(e){const s=e;if(!("FirebaseError"===(n=s).name?n.code===xe.FAILED_PRECONDITION||n.code===xe.UNIMPLEMENTED:!("undefined"!=typeof DOMException&&n instanceof DOMException)||22===n.code||20===n.code||11===n.code))throw s;Te("Error using user provided cache. Falling back to memory cache: "+s),await Po(t,new Mo)}}else we("FirestoreClient","Using default OfflineComponentProvider"),await Po(t,new Mo);var n;return t._offlineComponents}(t);we("FirestoreClient","Initializing OnlineComponentProvider"),await e.initialize(n,t.configuration),t.setCredentialChangeListener(t=>Ba(e.remoteStore,t)),t.setAppCheckTokenChangeListener((t,n)=>Ba(e.remoteStore,n)),t._onlineComponents=e}async function Fo(t){return t._onlineComponents||(t._uninitializedComponentsProvider?(we("FirestoreClient","Using user provided OnlineComponentProvider"),await Oo(t,t._uninitializedComponentsProvider._online)):(we("FirestoreClient","Using default OnlineComponentProvider"),await Oo(t,new No))),t._onlineComponents}async function Vo(t){const e=await Fo(t),n=e.eventManager;return n.onListen=ho.bind(null,e.syncEngine),n.onUnlisten=uo.bind(null,e.syncEngine),n.onFirstRemoteStoreListen=co.bind(null,e.syncEngine),n.onLastRemoteStoreUnlisten=fo.bind(null,e.syncEngine),n}function Bo(t,e,n={}){const i=new ke;return t.asyncQueue.enqueueAndForget(async()=>function(t,e,n,i,s){const r=new Lo({next:n=>{r.Za(),e.enqueueAndForget(()=>async function(t,e){const n=Ie(t),i=e.query;let s=3;const r=n.queries.get(i);if(r){const t=r.j_.indexOf(e);t>=0&&(r.j_.splice(t,1),0===r.j_.length?s=e.J_()?0:1:!r.H_()&&e.J_()&&(s=2))}switch(s){case 0:return n.queries.delete(i),n.onUnlisten(i,!0);case 1:return n.queries.delete(i),n.onUnlisten(i,!1);case 2:return n.onLastRemoteStoreUnlisten(i);default:return}}(t,a)),n.fromCache&&"server"===i.source?s.reject(new Ae(xe.UNAVAILABLE,'Failed to get documents from server. (However, these documents may exist in the local cache. Run again without setting source to "server" to retrieve the cached documents.)')):s.resolve(n)},error:t=>s.reject(t)}),a=new eo(n,r,{includeMetadataChanges:!0,_a:!0});return async function(e,n){const i=Ie(e);let s=3;const r=n.query;let a=i.queries.get(r);a?!a.H_()&&n.J_()&&(s=2):(a=new Ka,s=n.J_()?0:1);try{switch(s){case 0:a.z_=await i.onListen(r,!0);break;case 1:a.z_=await i.onListen(r,!1);break;case 2:await i.onFirstRemoteStoreListen(r)}}catch(t){const i=qa(t,`Initialization of query '${xi(n.query)}' failed`);return void n.onError(i)}i.queries.set(r,a),a.j_.push(n),n.Z_(i.onlineState),a.z_&&n.X_(a.z_)&&Ja(i)}(t,a)}(await Vo(t),t.asyncQueue,e,n,i)),i.promise
/**
 * @license
 * Copyright 2023 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */}function Uo(t){const e={};return void 0!==t.timeoutSeconds&&(e.timeoutSeconds=t.timeoutSeconds),e
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */}const $o=new Map;
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Go(t,e,n){if(!n)throw new Ae(xe.INVALID_ARGUMENT,`Function ${t}() cannot be called with an empty ${e}.`)}function qo(t){if(!Ke.isDocumentKey(t))throw new Ae(xe.INVALID_ARGUMENT,`Invalid document reference. Document references must have an even number of segments, but ${t} has ${t.length}.`)}function jo(t){if(Ke.isDocumentKey(t))throw new Ae(xe.INVALID_ARGUMENT,`Invalid collection reference. Collection references must have an odd number of segments, but ${t} has ${t.length}.`)}function Ho(t){if(void 0===t)return"undefined";if(null===t)return"null";if("string"==typeof t)return t.length>20&&(t=`${t.substring(0,20)}...`),JSON.stringify(t);if("number"==typeof t||"boolean"==typeof t)return""+t;if("object"==typeof t){if(t instanceof Array)return"an array";{const n=(e=t).constructor?e.constructor.name:null;return n?`a custom ${n} object`:"an object"}}var e;return"function"==typeof t?"a function":_e()}function zo(t,e){if("_delegate"in t&&(t=t._delegate),!(t instanceof e)){if(e.name===t.constructor.name)throw new Ae(xe.INVALID_ARGUMENT,"Type does not match the expected instance. Did you pass a reference from a different Firestore SDK?");{const n=Ho(t);throw new Ae(xe.INVALID_ARGUMENT,`Expected type '${e.name}', but it was: ${n}`)}}return t}
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Ko{constructor(t){var e,n;if(void 0===t.host){if(void 0!==t.ssl)throw new Ae(xe.INVALID_ARGUMENT,"Can't provide ssl option if host option is not set");this.host="firestore.googleapis.com",this.ssl=!0}else this.host=t.host,this.ssl=null===(e=t.ssl)||void 0===e||e;if(this.credentials=t.credentials,this.ignoreUndefinedProperties=!!t.ignoreUndefinedProperties,this.localCache=t.localCache,void 0===t.cacheSizeBytes)this.cacheSizeBytes=41943040;else{if(-1!==t.cacheSizeBytes&&t.cacheSizeBytes<1048576)throw new Ae(xe.INVALID_ARGUMENT,"cacheSizeBytes must be at least 1048576");this.cacheSizeBytes=t.cacheSizeBytes}(function(t,e,n,i){if(!0===e&&!0===i)throw new Ae(xe.INVALID_ARGUMENT,`${t} and ${n} cannot be used together.`)})("experimentalForceLongPolling",t.experimentalForceLongPolling,"experimentalAutoDetectLongPolling",t.experimentalAutoDetectLongPolling),this.experimentalForceLongPolling=!!t.experimentalForceLongPolling,this.experimentalForceLongPolling?this.experimentalAutoDetectLongPolling=!1:void 0===t.experimentalAutoDetectLongPolling?this.experimentalAutoDetectLongPolling=!0:this.experimentalAutoDetectLongPolling=!!t.experimentalAutoDetectLongPolling,this.experimentalLongPollingOptions=Uo(null!==(n=t.experimentalLongPollingOptions)&&void 0!==n?n:{}),function(t){if(void 0!==t.timeoutSeconds){if(isNaN(t.timeoutSeconds))throw new Ae(xe.INVALID_ARGUMENT,`invalid long polling timeout: ${t.timeoutSeconds} (must not be NaN)`);if(t.timeoutSeconds<5)throw new Ae(xe.INVALID_ARGUMENT,`invalid long polling timeout: ${t.timeoutSeconds} (minimum allowed value is 5)`);if(t.timeoutSeconds>30)throw new Ae(xe.INVALID_ARGUMENT,`invalid long polling timeout: ${t.timeoutSeconds} (maximum allowed value is 30)`)}}(this.experimentalLongPollingOptions),this.useFetchStreams=!!t.useFetchStreams}isEqual(t){return this.host===t.host&&this.ssl===t.ssl&&this.credentials===t.credentials&&this.cacheSizeBytes===t.cacheSizeBytes&&this.experimentalForceLongPolling===t.experimentalForceLongPolling&&this.experimentalAutoDetectLongPolling===t.experimentalAutoDetectLongPolling&&(e=this.experimentalLongPollingOptions,n=t.experimentalLongPollingOptions,e.timeoutSeconds===n.timeoutSeconds)&&this.ignoreUndefinedProperties===t.ignoreUndefinedProperties&&this.useFetchStreams===t.useFetchStreams;var e,n}}class Wo{constructor(t,e,n,i){this._authCredentials=t,this._appCheckCredentials=e,this._databaseId=n,this._app=i,this.type="firestore-lite",this._persistenceKey="(lite)",this._settings=new Ko({}),this._settingsFrozen=!1,this._terminateTask="notTerminated"}get app(){if(!this._app)throw new Ae(xe.FAILED_PRECONDITION,"Firestore was not initialized using the Firebase SDK. 'app' is not available");return this._app}get _initialized(){return this._settingsFrozen}get _terminated(){return"notTerminated"!==this._terminateTask}_setSettings(t){if(this._settingsFrozen)throw new Ae(xe.FAILED_PRECONDITION,"Firestore has already been started and its settings can no longer be changed. You can only modify settings before calling any other methods on a Firestore object.");this._settings=new Ko(t),void 0!==t.credentials&&(this._authCredentials=function(t){if(!t)return new De;switch(t.type){case"firstParty":return new Re(t.sessionIndex||"0",t.iamToken||null,t.authTokenFactory||null);case"provider":return t.client;default:throw new Ae(xe.INVALID_ARGUMENT,"makeAuthCredentialsProvider failed due to invalid credential type")}}(t.credentials))}_getSettings(){return this._settings}_freezeSettings(){return this._settingsFrozen=!0,this._settings}_delete(){return"notTerminated"===this._terminateTask&&(this._terminateTask=this._terminate()),this._terminateTask}async _restart(){"notTerminated"===this._terminateTask?await this._terminate():this._terminateTask="notTerminated"}toJSON(){return{app:this._app,databaseId:this._databaseId,settings:this._settings}}_terminate(){return function(t){const e=$o.get(t);e&&(we("ComponentProvider","Removing Datastore"),$o.delete(t),e.terminate())}(this),Promise.resolve()}}function Qo(t,e,n,i={}){var s;const r=(t=zo(t,Wo))._getSettings(),a=`${e}:${n}`;if("firestore.googleapis.com"!==r.host&&r.host!==a&&Te("Host has been set in both settings() and connectFirestoreEmulator(), emulator host will be used."),t._setSettings(Object.assign(Object.assign({},r),{host:a,ssl:!1})),i.mockUserToken){let e,n;if("string"==typeof i.mockUserToken)e=i.mockUserToken,n=me.MOCK_USER;else{e=function(t,e){if(t.uid)throw new Error('The "uid" field is no longer supported by mockUserToken. Please use "sub" instead for Firebase Auth User ID.');const n=e||"demo-project",i=t.iat||0,s=t.sub||t.user_id;if(!s)throw new Error("mockUserToken must contain 'sub' or 'user_id' field!");const r=Object.assign({iss:`https://securetoken.google.com/${n}`,aud:n,iat:i,exp:i+3600,auth_time:i,sub:s,user_id:s,firebase:{sign_in_provider:"custom",identities:{}}},t);return[v(JSON.stringify({alg:"none",type:"JWT"})),v(JSON.stringify(r)),""].join(".")}
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */(i.mockUserToken,null===(s=t._app)||void 0===s?void 0:s.options.projectId);const r=i.mockUserToken.sub||i.mockUserToken.user_id;if(!r)throw new Ae(xe.INVALID_ARGUMENT,"mockUserToken must contain 'sub' or 'user_id' field!");n=new me(r)}t._authCredentials=new Me(new Ce(e,n))}}
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Xo{constructor(t,e,n){this.converter=e,this._query=n,this.type="query",this.firestore=t}withConverter(t){return new Xo(this.firestore,t,this._query)}}class Yo{constructor(t,e,n){this.converter=e,this._key=n,this.type="document",this.firestore=t}get _path(){return this._key.path}get id(){return this._key.path.lastSegment()}get path(){return this._key.path.canonicalString()}get parent(){return new Jo(this.firestore,this.converter,this._key.path.popLast())}withConverter(t){return new Yo(this.firestore,t,this._key)}}class Jo extends Xo{constructor(t,e,n){super(t,e,yi(n)),this._path=n,this.type="collection"}get id(){return this._query.path.lastSegment()}get path(){return this._query.path.canonicalString()}get parent(){const t=this._path.popLast();return t.isEmpty()?null:new Yo(this.firestore,null,new Ke(t))}withConverter(t){return new Jo(this.firestore,t,this._path)}}function Zo(t,e,...n){if(t=M(t),Go("collection","path",e),t instanceof Wo){const i=je.fromString(e,...n);return jo(i),new Jo(t,null,i)}{if(!(t instanceof Yo||t instanceof Jo))throw new Ae(xe.INVALID_ARGUMENT,"Expected first argument to collection() to be a CollectionReference, a DocumentReference or FirebaseFirestore");const i=t._path.child(je.fromString(e,...n));return jo(i),new Jo(t.firestore,null,i)}}function th(t,e,...n){if(t=M(t),1===arguments.length&&(e=Ve.newId()),Go("doc","path",e),t instanceof Wo){const i=je.fromString(e,...n);return qo(i),new Yo(t,null,new Ke(i))}{if(!(t instanceof Yo||t instanceof Jo))throw new Ae(xe.INVALID_ARGUMENT,"Expected first argument to collection() to be a CollectionReference, a DocumentReference or FirebaseFirestore");const i=t._path.child(je.fromString(e,...n));return qo(i),new Yo(t.firestore,t instanceof Jo?t.converter:null,new Ke(i))}}
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class eh{constructor(t=Promise.resolve()){this.Pu=[],this.Iu=!1,this.Tu=[],this.Eu=null,this.du=!1,this.Au=!1,this.Ru=[],this.t_=new oa(this,"async_queue_retry"),this.Vu=()=>{const t=ra();t&&we("AsyncQueue","Visibility state changed to "+t.visibilityState),this.t_.jo()},this.mu=t;const e=ra();e&&"function"==typeof e.addEventListener&&e.addEventListener("visibilitychange",this.Vu)}get isShuttingDown(){return this.Iu}enqueueAndForget(t){this.enqueue(t)}enqueueAndForgetEvenWhileRestricted(t){this.fu(),this.gu(t)}enterRestrictedMode(t){if(!this.Iu){this.Iu=!0,this.Au=t||!1;const e=ra();e&&"function"==typeof e.removeEventListener&&e.removeEventListener("visibilitychange",this.Vu)}}enqueue(t){if(this.fu(),this.Iu)return new Promise(()=>{});const e=new ke;return this.gu(()=>this.Iu&&this.Au?Promise.resolve():(t().then(e.resolve,e.reject),e.promise)).then(()=>e.promise)}enqueueRetryable(t){this.enqueueAndForget(()=>(this.Pu.push(t),this.pu()))}async pu(){if(0!==this.Pu.length){try{await this.Pu[0](),this.Pu.shift(),this.t_.reset()}catch(t){if(!tn(t))throw t;we("AsyncQueue","Operation failed with retryable error: "+t)}this.Pu.length>0&&this.t_.Go(()=>this.pu())}}gu(t){const e=this.mu.then(()=>(this.du=!0,t().catch(t=>{this.Eu=t,this.du=!1;throw be("INTERNAL UNHANDLED ERROR: ",function(t){let e=t.message||"";return t.stack&&(e=t.stack.includes(t.message)?t.stack:t.message+"\n"+t.stack),e}(t)),t}).then(t=>(this.du=!1,t))));return this.mu=e,e}enqueueAfterDelay(t,e,n){this.fu(),this.Ru.indexOf(t)>-1&&(e=0);const i=Ga.createAndSchedule(this,t,e,n,t=>this.yu(t));return this.Tu.push(i),i}fu(){this.Eu&&_e()}verifyOperationInProgress(){}async wu(){let t;do{t=this.mu,await t}while(t!==this.mu)}Su(t){for(const e of this.Tu)if(e.timerId===t)return!0;return!1}bu(t){return this.wu().then(()=>{this.Tu.sort((t,e)=>t.targetTimeMs-e.targetTimeMs);for(const e of this.Tu)if(e.skipDelay(),"all"!==t&&e.timerId===t)break;return this.wu()})}Du(t){this.Ru.push(t)}yu(t){const e=this.Tu.indexOf(t);this.Tu.splice(e,1)}}class nh extends Wo{constructor(t,e,n,i){super(t,e,n,i),this.type="firestore",this._queue=new eh,this._persistenceKey=(null==i?void 0:i.name)||"[DEFAULT]"}async _terminate(){if(this._firestoreClient){const t=this._firestoreClient.terminate();this._queue=new eh(t),this._firestoreClient=void 0,await t}}}function ih(t){if(t._terminated)throw new Ae(xe.FAILED_PRECONDITION,"The client has already been terminated.");return t._firestoreClient||function(t){var e,n,i;const s=t._freezeSettings(),r=(a=t._databaseId,o=(null===(e=t._app)||void 0===e?void 0:e.options.appId)||"",h=t._persistenceKey,c=s,new _n(a,o,h,c.host,c.ssl,c.experimentalForceLongPolling,c.experimentalAutoDetectLongPolling,Uo(c.experimentalLongPollingOptions),c.useFetchStreams));var a,o,h,c;t._componentsProvider||(null===(n=s.localCache)||void 0===n?void 0:n._offlineComponentProvider)&&(null===(i=s.localCache)||void 0===i?void 0:i._onlineComponentProvider)&&(t._componentsProvider={_offline:s.localCache._offlineComponentProvider,_online:s.localCache._onlineComponentProvider}),t._firestoreClient=new Ro(t._authCredentials,t._appCheckCredentials,t._queue,r,t._componentsProvider&&function(t){const e=null==t?void 0:t._online.build();return{_offline:null==t?void 0:t._offline.build(e),_online:e}}(t._componentsProvider))}
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */(t),t._firestoreClient}class sh{constructor(t){this._byteString=t}static fromBase64String(t){try{return new sh(mn.fromBase64String(t))}catch(e){throw new Ae(xe.INVALID_ARGUMENT,"Failed to construct data from Base64 string: "+e)}}static fromUint8Array(t){return new sh(mn.fromUint8Array(t))}toBase64(){return this._byteString.toBase64()}toUint8Array(){return this._byteString.toUint8Array()}toString(){return"Bytes(base64: "+this.toBase64()+")"}isEqual(t){return this._byteString.isEqual(t._byteString)}}
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class rh{constructor(...t){for(let e=0;e<t.length;++e)if(0===t[e].length)throw new Ae(xe.INVALID_ARGUMENT,"Invalid field name at argument $(i + 1). Field names must not be empty.");this._internalPath=new ze(t)}isEqual(t){return this._internalPath.isEqual(t._internalPath)}}
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ah{constructor(t){this._methodName=t}}
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class oh{constructor(t,e){if(!isFinite(t)||t<-90||t>90)throw new Ae(xe.INVALID_ARGUMENT,"Latitude must be a number between -90 and 90, but was: "+t);if(!isFinite(e)||e<-180||e>180)throw new Ae(xe.INVALID_ARGUMENT,"Longitude must be a number between -180 and 180, but was: "+e);this._lat=t,this._long=e}get latitude(){return this._lat}get longitude(){return this._long}isEqual(t){return this._lat===t._lat&&this._long===t._long}toJSON(){return{latitude:this._lat,longitude:this._long}}_compareTo(t){return Be(this._lat,t._lat)||Be(this._long,t._long)}}
/**
 * @license
 * Copyright 2024 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class hh{constructor(t){this._values=(t||[]).map(t=>t)}toArray(){return this._values.map(t=>t)}isEqual(t){return function(t,e){if(t.length!==e.length)return!1;for(let n=0;n<t.length;++n)if(t[n]!==e[n])return!1;return!0}(this._values,t._values)}}
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const ch=/^__.*__$/;class lh{constructor(t,e,n){this.data=t,this.fieldMask=e,this.fieldTransforms=n}toMutation(t,e){return null!==this.fieldMask?new ms(t,this.data,this.fieldMask,e,this.fieldTransforms):new ps(t,this.data,e,this.fieldTransforms)}}function uh(t){switch(t){case 0:case 2:case 1:return!0;case 3:case 4:return!1;default:throw _e()}}class dh{constructor(t,e,n,i,s,r){this.settings=t,this.databaseId=e,this.serializer=n,this.ignoreUndefinedProperties=i,void 0===s&&this.vu(),this.fieldTransforms=s||[],this.fieldMask=r||[]}get path(){return this.settings.path}get Cu(){return this.settings.Cu}Fu(t){return new dh(Object.assign(Object.assign({},this.settings),t),this.databaseId,this.serializer,this.ignoreUndefinedProperties,this.fieldTransforms,this.fieldMask)}Mu(t){var e;const n=null===(e=this.path)||void 0===e?void 0:e.child(t),i=this.Fu({path:n,xu:!1});return i.Ou(t),i}Nu(t){var e;const n=null===(e=this.path)||void 0===e?void 0:e.child(t),i=this.Fu({path:n,xu:!1});return i.vu(),i}Lu(t){return this.Fu({path:void 0,xu:!0})}Bu(t){return Ih(t,this.settings.methodName,this.settings.ku||!1,this.path,this.settings.qu)}contains(t){return void 0!==this.fieldMask.find(e=>t.isPrefixOf(e))||void 0!==this.fieldTransforms.find(e=>t.isPrefixOf(e.field))}vu(){if(this.path)for(let t=0;t<this.path.length;t++)this.Ou(this.path.get(t))}Ou(t){if(0===t.length)throw this.Bu("Document fields must not be empty");if(uh(this.Cu)&&ch.test(t))throw this.Bu('Document fields cannot begin and end with "__"')}}class fh{constructor(t,e,n){this.databaseId=t,this.ignoreUndefinedProperties=e,this.serializer=n||aa(t)}Qu(t,e,n,i=!1){return new dh({Cu:t,methodName:e,qu:n,path:ze.emptyPath(),xu:!1,ku:i},this.databaseId,this.serializer,this.ignoreUndefinedProperties)}}function ph(t){const e=t._freezeSettings(),n=aa(t._databaseId);return new fh(t._databaseId,!!e.ignoreUndefinedProperties,n)}function mh(t,e,n,i,s,r={}){const a=t.Qu(r.merge||r.mergeFields?2:0,e,n,s);Th("Data must be an object, but it was:",a,i);const o=wh(i,a);let h,c;if(r.merge)h=new fn(a.fieldMask),c=a.fieldTransforms;else if(r.mergeFields){const t=[];for(const i of r.mergeFields){const s=Sh(e,i,n);if(!a.contains(s))throw new Ae(xe.INVALID_ARGUMENT,`Field '${s}' is specified in your field mask but missing from your input data.`);xh(t,s)||t.push(s)}h=new fn(t),c=a.fieldTransforms.filter(t=>h.covers(t.field))}else h=null,c=a.fieldTransforms;return new lh(new $n(o),h,c)}class gh extends ah{_toFieldTransform(t){return new ss(t.path,new Xi)}isEqual(t){return t instanceof gh}}class yh extends ah{constructor(t,e){super(t),this.$u=e}_toFieldTransform(t){const e=new es(t.serializer,Hi(t.serializer,this.$u));return new ss(t.path,e)}isEqual(t){return t instanceof yh&&this.$u===t.$u}}function vh(t,e){if(bh(t=M(t)))return Th("Unsupported field value:",e,t),wh(t,e);if(t instanceof ah)return function(t,e){if(!uh(e.Cu))throw e.Bu(`${t._methodName}() can only be used with update() and set()`);if(!e.path)throw e.Bu(`${t._methodName}() is not currently supported inside arrays`);const n=t._toFieldTransform(e);n&&e.fieldTransforms.push(n)}(t,e),null;if(void 0===t&&e.ignoreUndefinedProperties)return null;if(e.path&&e.fieldMask.push(e.path),t instanceof Array){if(e.settings.xu&&4!==e.Cu)throw e.Bu("Nested arrays are not supported");return function(t,e){const n=[];let i=0;for(const s of t){let t=vh(s,e.Lu(i));null==t&&(t={nullValue:"NULL_VALUE"}),n.push(t),i++}return{arrayValue:{values:n}}}(t,e)}return function(t,e){if(null===(t=M(t)))return{nullValue:"NULL_VALUE"};if("number"==typeof t)return Hi(e.serializer,t);if("boolean"==typeof t)return{booleanValue:t};if("string"==typeof t)return{stringValue:t};if(t instanceof Date){const n=$e.fromDate(t);return{timestampValue:Ks(e.serializer,n)}}if(t instanceof $e){const n=new $e(t.seconds,1e3*Math.floor(t.nanoseconds/1e3));return{timestampValue:Ks(e.serializer,n)}}if(t instanceof oh)return{geoPointValue:{latitude:t.latitude,longitude:t.longitude}};if(t instanceof sh)return{bytesValue:Ws(e.serializer,t._byteString)};if(t instanceof Yo){const n=e.databaseId,i=t.firestore._databaseId;if(!i.isEqual(n))throw e.Bu(`Document reference is for database ${i.projectId}/${i.database} but should be for database ${n.projectId}/${n.database}`);return{referenceValue:Ys(t.firestore._databaseId||e.databaseId,t._key.path)}}if(t instanceof hh)return n=e,{mapValue:{fields:{__type__:{stringValue:"__vector__"},value:{arrayValue:{values:t.toArray().map(t=>{if("number"!=typeof t)throw n.Bu("VectorValues must only contain numeric values.");return qi(n.serializer,t)})}}}}};var n;throw e.Bu(`Unsupported field value: ${Ho(t)}`)}(t,e)}function wh(t,e){const n={};return on(t)?e.path&&e.path.length>0&&e.fieldMask.push(e.path):an(t,(t,i)=>{const s=vh(i,e.Mu(t));null!=s&&(n[t]=s)}),{mapValue:{fields:n}}}function bh(t){return!("object"!=typeof t||null===t||t instanceof Array||t instanceof Date||t instanceof $e||t instanceof oh||t instanceof sh||t instanceof Yo||t instanceof ah||t instanceof hh)}function Th(t,e,n){if(!bh(n)||("object"!=typeof(i=n)||null===i||Object.getPrototypeOf(i)!==Object.prototype&&null!==Object.getPrototypeOf(i))){const i=Ho(n);throw"an object"===i?e.Bu(t+" a custom object"):e.Bu(t+" "+i)}var i}function Sh(t,e,n){if((e=M(e))instanceof rh)return e._internalPath;if("string"==typeof e)return Eh(t,e);throw Ih("Field path arguments must be of type string or ",t,!1,void 0,n)}const _h=new RegExp("[~\\*/\\[\\]]");function Eh(t,e,n){if(e.search(_h)>=0)throw Ih(`Invalid field path (${e}). Paths must not contain '~', '*', '/', '[', or ']'`,t,!1,void 0,n);try{return new rh(...e.split("."))._internalPath}catch(i){throw Ih(`Invalid field path (${e}). Paths must not be empty, begin with '.', end with '.', or contain '..'`,t,!1,void 0,n)}}function Ih(t,e,n,i,s){const r=i&&!i.isEmpty(),a=void 0!==s;let o=`Function ${e}() called with invalid data`;n&&(o+=" (via `toFirestore()`)"),o+=". ";let h="";return(r||a)&&(h+=" (found",r&&(h+=` in field ${i}`),a&&(h+=` in document ${s}`),h+=")"),new Ae(xe.INVALID_ARGUMENT,o+t+h)}function xh(t,e){return t.some(t=>t.isEqual(e))}
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Ah{constructor(t,e,n,i,s){this._firestore=t,this._userDataWriter=e,this._key=n,this._document=i,this._converter=s}get id(){return this._key.path.lastSegment()}get ref(){return new Yo(this._firestore,this._converter,this._key)}exists(){return null!==this._document}data(){if(this._document){if(this._converter){const t=new kh(this._firestore,this._userDataWriter,this._key,this._document,null);return this._converter.fromFirestore(t)}return this._userDataWriter.convertValue(this._document.data.value)}}get(t){if(this._document){const e=this._document.data.field(Ch("DocumentSnapshot.get",t));if(null!==e)return this._userDataWriter.convertValue(e)}}}class kh extends Ah{data(){return super.data()}}function Ch(t,e){return"string"==typeof e?Eh(t,e):e instanceof rh?e._internalPath:e._delegate._internalPath}
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Dh{}class Mh extends Dh{}class Nh extends Mh{constructor(t,e,n){super(),this._field=t,this._op=e,this._value=n,this.type="where"}static _create(t,e,n){return new Nh(t,e,n)}_apply(t){const e=this._parse(t);return Bh(t._query,e),new Xo(t.firestore,t.converter,Si(t._query,e))}_parse(t){const e=ph(t.firestore),n=function(t,e,n,i,s,r,a){let o;if(s.isKeyField()){if("array-contains"===r||"array-contains-any"===r)throw new Ae(xe.INVALID_ARGUMENT,`Invalid Query. You can't perform '${r}' queries on documentId().`);if("in"===r||"not-in"===r){Vh(a,r);const e=[];for(const n of a)e.push(Fh(i,t,n));o={arrayValue:{values:e}}}else o=Fh(i,t,a)}else"in"!==r&&"not-in"!==r&&"array-contains-any"!==r||Vh(a,r),o=function(t,e,n,i=!1){return vh(n,t.Qu(i?4:3,e))}(n,e,a,"in"===r||"not-in"===r);return Xn.create(s,r,o)}(t._query,"where",e,t.firestore._databaseId,this._field,this._op,this._value);return n}}class Lh extends Dh{constructor(t,e){super(),this.type=t,this._queryConstraints=e}static _create(t,e){return new Lh(t,e)}_parse(t){const e=this._queryConstraints.map(e=>e._parse(t)).filter(t=>t.getFilters().length>0);return 1===e.length?e[0]:Yn.create(e,this._getOperator())}_apply(t){const e=this._parse(t);return 0===e.getFilters().length?t:(function(t,e){let n=t;const i=e.getFlattenedFilters();for(const s of i)Bh(n,s),n=Si(n,s)}(t._query,e),new Xo(t.firestore,t.converter,Si(t._query,e)))}_getQueryConstraints(){return this._queryConstraints}_getOperator(){return"and"===this.type?"and":"or"}}class Rh extends Mh{constructor(t,e){super(),this._field=t,this._direction=e,this.type="orderBy"}static _create(t,e){return new Rh(t,e)}_apply(t){const e=function(t,e,n){if(null!==t.startAt)throw new Ae(xe.INVALID_ARGUMENT,"Invalid query. You must not call startAt() or startAfter() before calling orderBy().");if(null!==t.endAt)throw new Ae(xe.INVALID_ARGUMENT,"Invalid query. You must not call endAt() or endBefore() before calling orderBy().");return new Kn(e,n)}(t._query,this._field,this._direction);return new Xo(t.firestore,t.converter,function(t,e){const n=t.explicitOrderBy.concat([e]);return new gi(t.path,t.collectionGroup,n,t.filters.slice(),t.limit,t.limitType,t.startAt,t.endAt)}(t._query,e))}}function Ph(t,e="asc"){const n=e,i=Ch("orderBy",t);return Rh._create(i,n)}class Oh extends Mh{constructor(t,e,n){super(),this.type=t,this._limit=e,this._limitType=n}static _create(t,e,n){return new Oh(t,e,n)}_apply(t){return new Xo(t.firestore,t.converter,_i(t._query,this._limit,this._limitType))}}function Fh(t,e,n){if("string"==typeof(n=M(n))){if(""===n)throw new Ae(xe.INVALID_ARGUMENT,"Invalid query. When querying with documentId(), you must provide a valid document ID, but it was an empty string.");if(!wi(e)&&-1!==n.indexOf("/"))throw new Ae(xe.INVALID_ARGUMENT,`Invalid query. When querying a collection by documentId(), you must provide a plain document ID, but '${n}' contains a '/' character.`);const i=e.path.child(je.fromString(n));if(!Ke.isDocumentKey(i))throw new Ae(xe.INVALID_ARGUMENT,`Invalid query. When querying a collection group by documentId(), the value provided must result in a valid document path, but '${i}' is not because it has an odd number of segments (${i.length}).`);return Rn(t,new Ke(i))}if(n instanceof Yo)return Rn(t,n._key);throw new Ae(xe.INVALID_ARGUMENT,`Invalid query. When querying with documentId(), you must provide a valid string or a DocumentReference, but it was: ${Ho(n)}.`)}function Vh(t,e){if(!Array.isArray(t)||0===t.length)throw new Ae(xe.INVALID_ARGUMENT,`Invalid Query. A non-empty array is required for '${e.toString()}' filters.`)}function Bh(t,e){const n=function(t,e){for(const n of t)for(const t of n.getFlattenedFilters())if(e.indexOf(t.op)>=0)return t.op;return null}(t.filters,function(t){switch(t){case"!=":return["!=","not-in"];case"array-contains-any":case"in":return["not-in"];case"not-in":return["array-contains-any","in","not-in","!="];default:return[]}}(e.op));if(null!==n)throw n===e.op?new Ae(xe.INVALID_ARGUMENT,`Invalid query. You cannot use more than one '${e.op.toString()}' filter.`):new Ae(xe.INVALID_ARGUMENT,`Invalid query. You cannot use '${e.op.toString()}' filters with '${n.toString()}' filters.`)}class Uh{convertValue(t,e="none"){switch(xn(t)){case 0:return null;case 1:return t.booleanValue;case 2:return vn(t.integerValue||t.doubleValue);case 3:return this.convertTimestamp(t.timestampValue);case 4:return this.convertServerTimestamp(t,e);case 5:return t.stringValue;case 6:return this.convertBytes(wn(t.bytesValue));case 7:return this.convertReference(t.referenceValue);case 8:return this.convertGeoPoint(t.geoPointValue);case 9:return this.convertArray(t.arrayValue,e);case 11:return this.convertObject(t.mapValue,e);case 10:return this.convertVectorValue(t.mapValue);default:throw _e()}}convertObject(t,e){return this.convertObjectMap(t.fields,e)}convertObjectMap(t,e="none"){const n={};return an(t,(t,i)=>{n[t]=this.convertValue(i,e)}),n}convertVectorValue(t){var e,n,i;const s=null===(i=null===(n=null===(e=t.fields)||void 0===e?void 0:e.value.arrayValue)||void 0===n?void 0:n.values)||void 0===i?void 0:i.map(t=>vn(t.doubleValue));return new hh(s)}convertGeoPoint(t){return new oh(vn(t.latitude),vn(t.longitude))}convertArray(t,e){return(t.values||[]).map(t=>this.convertValue(t,e))}convertServerTimestamp(t,e){switch(e){case"previous":const n=Tn(t);return null==n?null:this.convertValue(n,e);case"estimate":return this.convertTimestamp(Sn(t));default:return null}}convertTimestamp(t){const e=yn(t);return new $e(e.seconds,e.nanos)}convertDocumentKey(t,e){const n=je.fromString(t);Ee(yr(n));const i=new En(n.get(1),n.get(3)),s=new Ke(n.popFirst(5));return i.isEqual(e)||be(`Document ${s} contains a document reference within a different database (${i.projectId}/${i.database}) which is not supported. It will be treated as a reference in the current database (${e.projectId}/${e.database}) instead.`),s}}
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function $h(t,e,n){let i;return i=t?n&&(n.merge||n.mergeFields)?t.toFirestore(e,n):t.toFirestore(e):e,i
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */}class Gh{constructor(t,e){this.hasPendingWrites=t,this.fromCache=e}isEqual(t){return this.hasPendingWrites===t.hasPendingWrites&&this.fromCache===t.fromCache}}class qh extends Ah{constructor(t,e,n,i,s,r){super(t,e,n,i,r),this._firestore=t,this._firestoreImpl=t,this.metadata=s}exists(){return super.exists()}data(t={}){if(this._document){if(this._converter){const e=new jh(this._firestore,this._userDataWriter,this._key,this._document,this.metadata,null);return this._converter.fromFirestore(e,t)}return this._userDataWriter.convertValue(this._document.data.value,t.serverTimestamps)}}get(t,e={}){if(this._document){const n=this._document.data.field(Ch("DocumentSnapshot.get",t));if(null!==n)return this._userDataWriter.convertValue(n,e.serverTimestamps)}}}class jh extends qh{data(t={}){return super.data(t)}}class Hh{constructor(t,e,n,i){this._firestore=t,this._userDataWriter=e,this._snapshot=i,this.metadata=new Gh(i.hasPendingWrites,i.fromCache),this.query=n}get docs(){const t=[];return this.forEach(e=>t.push(e)),t}get size(){return this._snapshot.docs.size}get empty(){return 0===this.size}forEach(t,e){this._snapshot.docs.forEach(n=>{t.call(e,new jh(this._firestore,this._userDataWriter,n.key,n,new Gh(this._snapshot.mutatedKeys.has(n.key),this._snapshot.fromCache),this.query.converter))})}docChanges(t={}){const e=!!t.includeMetadataChanges;if(e&&this._snapshot.excludesMetadataChanges)throw new Ae(xe.INVALID_ARGUMENT,"To include metadata changes with your document changes, you must also pass { includeMetadataChanges:true } to onSnapshot().");return this._cachedChanges&&this._cachedChangesIncludeMetadataChanges===e||(this._cachedChanges=function(t,e){if(t._snapshot.oldDocs.isEmpty()){let e=0;return t._snapshot.docChanges.map(n=>{const i=new jh(t._firestore,t._userDataWriter,n.doc.key,n.doc,new Gh(t._snapshot.mutatedKeys.has(n.doc.key),t._snapshot.fromCache),t.query.converter);return n.doc,{type:"added",doc:i,oldIndex:-1,newIndex:e++}})}{let n=t._snapshot.oldDocs;return t._snapshot.docChanges.filter(t=>e||3!==t.type).map(e=>{const i=new jh(t._firestore,t._userDataWriter,e.doc.key,e.doc,new Gh(t._snapshot.mutatedKeys.has(e.doc.key),t._snapshot.fromCache),t.query.converter);let s=-1,r=-1;return 0!==e.type&&(s=n.indexOf(e.doc.key),n=n.delete(e.doc.key)),1!==e.type&&(n=n.add(e.doc),r=n.indexOf(e.doc.key)),{type:zh(e.type),doc:i,oldIndex:s,newIndex:r}})}}(this,e),this._cachedChangesIncludeMetadataChanges=e),this._cachedChanges}}function zh(t){switch(t){case 0:return"added";case 2:case 3:return"modified";case 1:return"removed";default:return _e()}}class Kh extends Uh{constructor(t){super(),this.firestore=t}convertBytes(t){return new sh(t)}convertReference(t){const e=this.convertDocumentKey(t,this.firestore._databaseId);return new Yo(this.firestore,null,e)}}function Wh(t){t=zo(t,Xo);const e=zo(t.firestore,nh),n=ih(e),i=new Kh(e);return function(t){if("L"===t.limitType&&0===t.explicitOrderBy.length)throw new Ae(xe.UNIMPLEMENTED,"limitToLast() queries require specifying at least one orderBy() clause")}(t._query),Bo(n,t._query).then(n=>new Hh(e,i,t,n))}function Qh(t,e){return function(t,e){const n=new ke;return t.asyncQueue.enqueueAndForget(async()=>po(await function(t){return Fo(t).then(t=>t.syncEngine)}(t),e,n)),n.promise}(ih(t),e)}function Xh(){return new gh("serverTimestamp")}!function(t,e=!0){ge="10.14.1",$t(new N("firestore",(t,{instanceIdentifier:n,options:i})=>{const s=t.getProvider("app").getImmediate(),r=new nh(new Ne(t.getProvider("auth-internal")),new Oe(t.getProvider("app-check-internal")),function(t,e){if(!Object.prototype.hasOwnProperty.apply(t.options,["projectId"]))throw new Ae(xe.INVALID_ARGUMENT,'"projectId" not provided in firebase.initializeApp.');return new En(t.options.projectId,e)}(s,n),s);return i=Object.assign({useFetchStreams:e},i),r._setSettings(i),r},"PUBLIC").setMultipleInstances(!0)),Ht(pe,"4.7.3",t),Ht(pe,"4.7.3","esm2017")}();const Yh=function(t){const e="string"==typeof t?t:"(default)",n=function(t,e){const n=t.container.getProvider("heartbeat").getImmediate({optional:!0});return n&&n.triggerHeartbeat(),t.container.getProvider(e)}("object"==typeof t?t:function(t=Pt){const e=Ft.get(t);if(!e&&t===Pt&&_())return jt();if(!e)throw Gt.create("no-app",{appName:t});return e}(),"firestore").getImmediate({identifier:e});if(!n._initialized){const t=S("firestore");t&&Qo(n,...t)}return n}(jt({apiKey:"AIzaSyBfDhpe5AyyuJ4bGF5mRAj1Zt-Jku4MON4",authDomain:"game-ranking-b951c.firebaseapp.com",projectId:"game-ranking-b951c",storageBucket:"game-ranking-b951c.firebasestorage.app",messagingSenderId:"722137590578",appId:"1:722137590578:web:03a21f1a9e76611ea8852b"})),Jh="last-swing";function Zh(t){return t&&2===t.length?t.toUpperCase().split("").map(t=>String.fromCodePoint(127397+t.charCodeAt(0))).join(""):"🌍"}let tc=null;function ec(){return tc||(tc=fetch("https://ipapi.co/json/",{signal:AbortSignal.timeout(5e3)}).then(t=>t.json()).then(t=>t.country_code||"").catch(()=>"")),tc}ec();const nc=document.getElementById("game-container"),ic=document.createElement("canvas");ic.id="game-canvas",nc.appendChild(ic);const sc=document.createElement("div");sc.id="score-overlay",sc.textContent="",nc.appendChild(sc);const rc=document.createElement("div");rc.id="gameover-overlay",rc.style.display="none",rc.addEventListener("click",t=>t.stopPropagation()),rc.addEventListener("touchstart",t=>t.stopPropagation()),nc.appendChild(rc),window.addEventListener("keydown",t=>{"none"===rc.style.display||"Space"!==t.code&&" "!==t.key||(t.stopImmediatePropagation(),t.preventDefault())},!0),f.assetBasePath=".";let ac="blue-dusk";try{const t=localStorage.getItem("lastSwing.mapTheme");"blue-dusk"!==t&&"toy-sky-park"!==t||(ac=t)}catch{}async function oc(){try{const e=function(t,e,...n){let i=[];e instanceof Dh&&i.push(e),i=i.concat(n),function(t){const e=t.filter(t=>t instanceof Lh).length,n=t.filter(t=>t instanceof Nh).length;if(e>1||e>0&&n>0)throw new Ae(xe.INVALID_ARGUMENT,"InvalidQuery. When using composite filters, you cannot use more than one filter at the top level. Consider nesting the multiple filters within an `and(...)` statement. For example: change `query(query, where(...), or(...))` to `query(query, and(where(...), or(...)))`.")}(i);for(const s of i)t=s._apply(t);return t}(Zo(Yh,"scores"),function(t,e,n){const i=e,s=Ch("where",t);return Nh._create(s,i,n)}("gameId","==",Jh),Ph("score","desc"),Ph("playedAt","asc"),(t=10,Oh._create("limit",t,"F")));return(await Wh(e)).docs.map((t,e)=>({userName:t.data().userName,score:t.data().score,countryCode:t.data().countryCode||"",rank:e+1}))}catch{return[]}var t}async function hc(t,e){try{const n=Zo(Yh,"scores");return await function(t,e){const n=zo(t.firestore,nh),i=th(t),s=$h(t.converter,e);return Qh(n,[mh(ph(t.firestore),"addDoc",i._key,s,null!==t.converter,{}).toMutation(i._key,as.exists(!1))]).then(()=>i)}(n,{userName:t,gameId:Jh,score:e,playedAt:Xh(),countryCode:await ec()}),!0}catch{return!1}}function cc(){var t;(function(t,e,n){t=zo(t,Yo);const i=zo(t.firestore,nh),s=$h(t.converter,e,n);return Qh(i,[mh(ph(i),"setDoc",t._key,s,null!==t.converter,n).toMutation(t._key,as.none())])})(th(Yh,"gamePlayCounts",Jh),{count:(t=1,new yh("increment",t)),lastPlayedAt:Xh()},{merge:!0}).catch(()=>{})}const lc=document.createElement("div");lc.id="title-overlay",nc.appendChild(lc);const uc=document.createElement("div");uc.id="map-picker-overlay",uc.style.display="none",nc.appendChild(uc);let dc=0,fc=null;const pc={"blue-dusk":"Blue Dusk","toy-sky-park":"Toy Sky Park"};function mc(){ic.style.display="none",sc.style.display="none",rc.style.display="none",lc.style.display="flex",lc.innerHTML=`\n    <div class="title-bg" style="background-image:url('./assets/images/last-swing/title_page.webp')"></div>\n    <div class="title-gradient"></div>\n    <div class="title-bottom">\n      <div class="title-map-label">MAP: ${pc[ac]}</div>\n      <div id="title-asset-status"></div>\n      <div class="title-buttons">\n        <button id="title-map-btn" class="title-btn-map">Change Map</button>\n        <button id="title-start-btn" class="title-btn-start">START</button>\n      </div>\n    </div>\n  `,document.getElementById("title-map-btn").addEventListener("click",()=>gc()),document.getElementById("title-start-btn").addEventListener("click",()=>function(){const t=document.getElementById("title-start-btn"),e=document.getElementById("title-asset-status");t&&(t.disabled=!0,t.textContent="Loading...");const n=`./assets/images/last-swing/${ac}`,i=["./assets/images/stickman-sprite.webp",...["a","b","c","d","e"].flatMap(t=>[`${n}/bg_far_${t}.webp`,`${n}/bg_mid_${t}.webp`,`${n}/bg_fx_${t}.webp`])];let s=0;const r=i.length,a=()=>{s++;const t=Math.round(s/r*100);e.textContent=`Loading assets... ${t}%`,s>=r&&(lc.style.display="none",ic.style.display="block",sc.style.display="",Tc())};i.forEach(t=>{if(/\.(ogg|mp3|wav)$/i.test(t))fetch(t,{cache:"force-cache"}).then(()=>a()).catch(()=>a());else{const e=new Image;e.onload=a,e.onerror=a,e.src=t}})}())}function gc(){uc.style.display="flex";const t={"blue-dusk":"A neon-lit twilight city","toy-sky-park":"A colorful aerial playground"};uc.innerHTML=`\n    <div class="picker-panel">\n      <h3 class="picker-title">Choose Map Theme</h3>\n      <div class="picker-grid">\n        ${["blue-dusk","toy-sky-park"].map(e=>{return`\n          <button class="picker-card${e===ac?" selected":""}" data-theme="${e}">\n            <img src="${n=e,`./assets/images/last-swing/${n}/bg_far_a.webp`}" alt="${pc[e]}" />\n            <div class="picker-card-overlay"></div>\n            <div class="picker-card-info">\n              <div class="picker-card-name">${pc[e]}</div>\n              <div class="picker-card-sub">${t[e]}</div>\n            </div>\n            ${e===ac?'<div class="picker-badge">SELECTED</div>':""}\n          </button>\n        `;var n}).join("")}\n      </div>\n      <div class="picker-actions">\n        <button id="picker-cancel" class="picker-btn-cancel">Cancel</button>\n        <button id="picker-confirm" class="picker-btn-confirm">Confirm</button>\n      </div>\n    </div>\n  `,uc.querySelectorAll(".picker-card").forEach(t=>{t.addEventListener("click",()=>{ac=t.dataset.theme;try{localStorage.setItem("lastSwing.mapTheme",ac)}catch{}gc()})}),document.getElementById("picker-cancel").addEventListener("click",()=>{uc.style.display="none"}),document.getElementById("picker-confirm").addEventListener("click",()=>{uc.style.display="none",mc()})}function yc(t){dc=t;const e=function(){try{return localStorage.getItem("ggrank_nickname")||""}catch{return""}}();rc.innerHTML=`\n    <div class="go-box">\n      <h2>GAME OVER</h2>\n      <p class="go-score">Score: <strong>${t}</strong></p>\n      <div class="go-form">\n        <input id="nickname-input" type="text" placeholder="Nickname (max 10)" maxlength="10" value="${e}" />\n        <button id="submit-score-btn">Submit Score</button>\n      </div>\n      <div id="submit-status"></div>\n      <div id="leaderboard-section">\n        <h3>Loading leaderboard...</h3>\n      </div>\n      <div class="go-buttons">\n        <button id="restart-btn" class="restart-btn">Play Again</button>\n        <button id="back-title-btn" class="switch-map-btn">Title</button>\n      </div>\n    </div>\n  `,rc.style.display="flex",oc().then(e=>{const n=document.getElementById("leaderboard-section");if(0===e.length)return void(n.innerHTML='<h3>Leaderboard</h3><p style="color:#aaa;">No scores yet</p>');const i=e.map(e=>`<tr${e.score===t?' class="highlight"':""}><td>${e.rank}</td><td>${e.countryCode?Zh(e.countryCode):"🌍"} ${vc(e.userName)}</td><td>${e.score}</td></tr>`).join("");n.innerHTML=`\n      <h3>Top 10 Leaderboard</h3>\n      <table><thead><tr><th>#</th><th>Name</th><th>Score</th></tr></thead><tbody>${i}</tbody></table>\n    `}),setTimeout(()=>{var t,e;const n=document.getElementById("submit-score-btn"),i=document.getElementById("nickname-input");n&&i&&n.addEventListener("click",async()=>{const t=i.value.trim();if(!t)return void i.focus();n.disabled=!0,n.textContent="Submitting...",function(t){try{localStorage.setItem("ggrank_nickname",t)}catch{}}(t);const e=await hc(t,dc),s=document.getElementById("submit-status");if(e){s.innerHTML='<span style="color:#4ade80;">Score saved!</span>';const e=await oc(),n=document.getElementById("leaderboard-section");if(e.length>0){const i=e.map(e=>`<tr${e.userName===t&&e.score===dc?' class="highlight"':""}><td>${e.rank}</td><td>${e.countryCode?Zh(e.countryCode):"🌍"} ${vc(e.userName)}</td><td>${e.score}</td></tr>`).join("");n.innerHTML=`\n              <h3>Top 10 Leaderboard</h3>\n              <table><thead><tr><th>#</th><th>Name</th><th>Score</th></tr></thead><tbody>${i}</tbody></table>\n            `}}else s.innerHTML='<span style="color:#f87171;">Failed to save. Try again.</span>',n.disabled=!1,n.textContent="Submit Score"}),null==(t=document.getElementById("restart-btn"))||t.addEventListener("click",()=>{rc.style.display="none",Tc()}),null==(e=document.getElementById("back-title-btn"))||e.addEventListener("click",()=>{rc.style.display="none",fc&&(fc.stop(),fc=null),mc()})},0)}function vc(t){const e=document.createElement("div");return e.textContent=t,e.innerHTML}function wc(t){sc.textContent=`${t}`}function bc(t){sc.textContent="",cc(),yc(t)}function Tc(){fc&&fc.stop(),ic.style.display="block",sc.style.display="",fc=new f(ic,wc,bc,{lastSwing:{mapTheme:ac}}),fc.start()}var Sc;(Sc="./assets/images/last-swing/title_page.webp",new Promise(t=>{const e=new Image;e.onload=()=>t(),e.onerror=()=>t(),e.src=Sc})).then(()=>{const t=document.getElementById("loading-screen");t&&(t.style.display="none"),mc()});
