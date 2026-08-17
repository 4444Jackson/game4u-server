const MAP=38, STEP=1.5, SUPPORT_R=0.25, GRAVITY=24, JUMP_V=9.5, COYOTE=0.10, MOVE=12, dt=1/60;
const LAND_SNAP=0.5;
const clamp=(v,a,b)=>Math.max(a,Math.min(b,v));

function moveCircle(obs,px,pz,nx,nz,r,y){
  let x=nx,z=nz;
  for(let it=0;it<4;it++){
    let hnx=0,hnz=0,push=0;
    for(const o of obs){
      if(y>=o.t*STEP-0.01) continue;
      const cx=clamp(x,o.x-o.w/2,o.x+o.w/2), cz=clamp(z,o.z-o.d/2,o.z+o.d/2);
      const ddx=x-cx,ddz=z-cz,d2=ddx*ddx+ddz*ddz;
      if(d2<r*r){
        let nnx,nnz,pp;
        if(d2<1e-9){
          const dL=x-(o.x-o.w/2),dR=(o.x+o.w/2)-x,dD=z-(o.z-o.d/2),dU=(o.z+o.d/2)-z;
          const m=Math.min(dL,dR,dD,dU);
          if(m===dL){nnx=-1;nnz=0;pp=dL+r;}
          else if(m===dR){nnx=1;nnz=0;pp=dR+r;}
          else if(m===dD){nnx=0;nnz=-1;pp=dD+r;}
          else{nnx=0;nnz=1;pp=dU+r;}
        } else {const d=Math.sqrt(d2);nnx=ddx/d;nnz=ddz/d;pp=r-d;}
        if(pp>push){push=pp;hnx=nnx;hnz=nnz;}
      }
    }
    if(push<=0) break;
    x+=hnx*push;z+=hnz*push;
    let rx=nx-x,rz=nz-z;const dot=rx*hnx+rz*hnz;rx-=dot*hnx;rz-=dot*hnz;x+=rx;z+=rz;
    if(rx*rx+rz*rz<1e-6) break;
  }
  return {x:clamp(x,-MAP+1,MAP-1),z:clamp(z,-MAP+1,MAP-1)};
}
function topAt(obs,x,z,r=0){
  let top=0;
  for(const o of obs){
    if(x>o.x-o.w/2-r && x<o.x+o.w/2+r && z>o.z-o.d/2-r && z<o.z+o.d/2+r){
      const h=o.t*STEP; if(h>top) top=h;
    }
  }
  return top;
}
function depenetratePlayer(obs,p,r=0.6){
  for(let it=0;it<6;it++){
    let bx=0,bz=0,bp=0;
    for(const o of obs){
      if(p.y>=o.t*STEP-0.01) continue;
      const minx=o.x-o.w/2,maxx=o.x+o.w/2,minz=o.z-o.d/2,maxz=o.z+o.d/2;
      const cx=clamp(p.x,minx,maxx),cz=clamp(p.z,minz,maxz);
      const dx=p.x-cx,dz=p.z-cz,d2=dx*dx+dz*dz;
      if(d2>=r*r) continue;
      let nx,nz,push;
      if(d2>1e-9){const d=Math.sqrt(d2);nx=dx/d;nz=dz/d;push=r-d;}
      else{const dL=p.x-minx,dR=maxx-p.x,dD=p.z-minz,dU=maxz-p.z;const m=Math.min(dL,dR,dD,dU);
        if(m===dL){nx=-1;nz=0;push=dL+r;}else if(m===dR){nx=1;nz=0;push=dR+r;}
        else if(m===dD){nx=0;nz=-1;push=dD+r;}else{nx=0;nz=1;push=dU+r;}}
      if(push>bp){bx=nx*push;bz=nz*push;bp=push;}
    }
    if(bp<=0) break;
    p.x=clamp(p.x+bx,-MAP+1,MAP-1);p.z=clamp(p.z+bz,-MAP+1,MAP-1);
  }
}
// 现状：竖直 snap 不做守卫（grounded 直接 p.y=sup）
function stepCurrent(p, inp, obs, P){
  let mx=inp.mx,mz=inp.mz;const ml=Math.hypot(mx,mz);if(ml>1){mx/=ml;mz/=ml;}
  const sa=inp.ax,ca=inp.az;const fwd=-mz,strafe=mx;const dx=fwd*sa-strafe*ca,dz=fwd*ca+strafe*sa;
  const nx=clamp(p.x+dx*P.spd*dt,-MAP+1,MAP-1),nz=clamp(p.z+dz*P.spd*dt,-MAP+1,MAP-1);
  const mv=moveCircle(obs,p.x,p.z,nx,nz,p.radius,p.y);p.x=mv.x;p.z=mv.z;
  const sup=topAt(obs,p.x,p.z,P.edgeMargin);
  if(p.grounded)p.coyoteT=COYOTE;else if(p.coyoteT>0)p.coyoteT-=dt;
  if(p.jumpBuf>0&&(p.grounded||p.coyoteT>0)){p.vy=JUMP_V;p.grounded=false;p.jumpBuf=0;p.coyoteT=0;}
  else if(p.jumpBuf>0)p.jumpBuf-=dt;
  if(p.grounded&&p.y>sup+0.01)p.grounded=false;
  if(!p.grounded){p.vy-=GRAVITY*dt;p.y+=p.vy*dt;if(p.y<=sup&&p.vy<=0){p.y=sup;p.vy=0;p.grounded=true;}}
  else { p.y=sup; }
  depenetratePlayer(obs,p,p.radius);
}
// 统一（L2 目标）：竖直 snap 加守卫——grounded 且离顶面 >LAND_SNAP 时不瞬移上顶；客户端/服务器同一份
function stepUnified(p, inp, obs, P){
  let mx=inp.mx,mz=inp.mz;const ml=Math.hypot(mx,mz);if(ml>1){mx/=ml;mz/=ml;}
  const sa=inp.ax,ca=inp.az;const fwd=-mz,strafe=mx;const dx=fwd*sa-strafe*ca,dz=fwd*ca+strafe*sa;
  const nx=clamp(p.x+dx*P.spd*dt,-MAP+1,MAP-1),nz=clamp(p.z+dz*P.spd*dt,-MAP+1,MAP-1);
  const mv=moveCircle(obs,p.x,p.z,nx,nz,p.radius,p.y);p.x=mv.x;p.z=mv.z;
  const sup=topAt(obs,p.x,p.z,P.edgeMargin);
  if(p.grounded)p.coyoteT=COYOTE;else if(p.coyoteT>0)p.coyoteT-=dt;
  if(p.jumpBuf>0&&(p.grounded||p.coyoteT>0)){p.vy=JUMP_V;p.grounded=false;p.jumpBuf=0;p.coyoteT=0;}
  else if(p.jumpBuf>0)p.jumpBuf-=dt;
  if(p.grounded){
    if(p.y>sup+0.01)p.grounded=false;                       // 走出顶边 → 下落
    else if(Math.abs(sup-p.y)<LAND_SNAP)p.y=sup;            // 已在顶面附近 → 贴顶(含边角余量)
    // else: grounded 在地面、贴着更高障碍的侧面 → 不瞬移上顶
  }
  if(!p.grounded){p.vy-=GRAVITY*dt;p.y+=p.vy*dt;if(p.y<=sup&&p.vy<=0){p.y=sup;p.vy=0;p.grounded=true;}}
  depenetratePlayer(obs,p,p.radius);
}
function run(name, stepFn, start, inp, obs, frames=150){
  const p={x:start.x,z:start.z,y:start.y!=null?start.y:0,vy:0,grounded:start.grounded!=null?start.grounded:true,
           coyoteT:0,jumpBuf:start.jumpBuf!=null?start.jumpBuf:0,aim:Math.PI,radius:start.r};
  const P={spd:MOVE, edgeMargin:Math.min(SUPPORT_R, p.radius*0.5)};
  const ys=[];
  for(let f=0;f<frames;f++){stepFn(p,inp,obs,P);ys.push(+p.y.toFixed(2));}
  const pops=ys.filter(y=>y>0.5).length;
  return {name, pops, finalY:+p.y.toFixed(2), x:+p.x.toFixed(2), z:+p.z.toFixed(2)};
}
function cmp(label, start, inp, obs, frames=150){
  const a=run(label+' 现状', stepCurrent, start, inp, obs, frames);
  const b=run(label+' 统一', stepUnified, start, inp, obs, frames);
  const ok = a.pops===0 && b.pops===0 && Math.abs(a.finalY-b.finalY)<0.01;
  console.log(`${ok?'OK ':'!! '}${label}: 现状[pops=${a.pops},y=${a.finalY}] 统一[pops=${b.pops},y=${b.finalY}]  x=${b.x} z=${b.z}`);
  return ok;
}

const box1=[{x:0,z:0,w:6,d:3,t:1}];
console.log('=== L2 统一解算仿真对比（缩小 r=0.12 / 正常 r=0.6）===');
cmp('S1 缩小直走贴侧', {x:0,z:5,r:0.12}, {mx:0,mz:-1,ax:0,az:-1}, box1);
cmp('S2 缩小斜走顶角', {x:2.4,z:5,r:0.12}, {mx:0.7,mz:-1,ax:0.7,az:-1}, box1);
cmp('S3 在顶跳落回顶', {x:0,z:0,r:0.12,y:1.5,grounded:true,jumpBuf:1}, {mx:0,mz:0,ax:0,az:-1}, box1);
cmp('S4 走下顶边落地', {x:0,z:0,r:0.12,y:1.5,grounded:true}, {mx:0,mz:1,ax:0,az:1}, box1);
cmp('S5 正常直走贴侧', {x:0,z:5,r:0.6}, {mx:0,mz:-1,ax:0,az:-1}, box1);
cmp('S6 1档顶走向2档侧', {x:0,z:0,r:0.12,y:1.5,grounded:true}, {mx:0,mz:1,ax:0,az:1},
    [{x:0,z:0,w:6,d:3,t:1},{x:0,z:6,w:6,d:3,t:2}]);
cmp('S7 缩小沿侧平行滑', {x:-5,z:1.62,r:0.12}, {mx:1,mz:0,ax:1,az:0}, box1);
console.log('（OK=现状与统一均不闪、终点一致；!!=需复查）');
