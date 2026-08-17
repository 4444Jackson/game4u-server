const MAP=38, STEP=1.5, SUPPORT_R=0.25, GRAVITY=24, JUMP_V=9.5, COYOTE=0.10, MOVE=12, dt=1/60;
const clamp=(v,a,b)=>Math.max(a,Math.min(b,v));

// 忠实复刻当前 map-core.moveCircle（gate: y>=top-0.01 不挡）
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
// supportMode: 'fixed'(客户端现状) | 'scaled'(与服务器同口径)；snapGuard: 落地守卫，防贴边误瞬移上顶
function step(p, inp, obs, supportMode, snapGuard, LAND_SNAP=0.5){
  let mx=inp.mx,mz=inp.mz;const ml=Math.hypot(mx,mz);if(ml>1){mx/=ml;mz/=ml;}
  const sa=inp.ax,ca=inp.az;
  const fwd=-mz,strafe=mx; const dx=fwd*sa-strafe*ca, dz=fwd*ca+strafe*sa;
  const nx=clamp(p.x+dx*MOVE*dt,-MAP+1,MAP-1);
  const nz=clamp(p.z+dz*MOVE*dt,-MAP+1,MAP-1);
  const mv=moveCircle(obs,p.x,p.z,nx,nz,p.radius,p.y);p.x=mv.x;p.z=mv.z;
  const supR = supportMode==='scaled' ? Math.min(SUPPORT_R, p.radius*0.5) : SUPPORT_R;
  const sup=topAt(obs,p.x,p.z,supR);
  if(p.grounded)p.coyoteT=COYOTE;else if(p.coyoteT>0)p.coyoteT-=dt;
  if(p.jumpBuf>0&&(p.grounded||p.coyoteT>0)){p.vy=JUMP_V;p.grounded=false;p.jumpBuf=0;p.coyoteT=0;}
  else if(p.jumpBuf>0)p.jumpBuf-=dt;
  if(p.grounded&&p.y>sup+0.01)p.grounded=false;
  if(!p.grounded){p.vy-=GRAVITY*dt;p.y+=p.vy*dt;if(p.y<=sup&&p.vy<=0){p.y=sup;p.vy=0;p.grounded=true;}}
  else { if(snapGuard){ if(p.y>=sup-LAND_SNAP)p.y=sup; } else { p.y=sup; } }
  depenetratePlayer(obs,p,p.radius);
}
function run(name, supportMode, snapGuard, start, inp, frames=140){
  const obs=[{x:0,z:0,w:6,d:3,t:1}]; // 1档顶=1.5
  const p={x:start.x,z:start.z,y:start.y!=null?start.y:0,vy:0,grounded:start.grounded!=null?start.grounded:true,
           coyoteT:0,jumpBuf:start.jumpBuf!=null?start.jumpBuf:0,aim:Math.PI,radius:start.radius||0.12};
  const ys=[];
  for(let f=0;f<frames;f++){step(p,inp,obs,supportMode,snapGuard);ys.push(+p.y.toFixed(2));}
  const maxY=Math.max(...ys),minY=Math.min(...ys);
  const pops=ys.filter(y=>y>0.5).length;
  console.log(`${name}: finalY=${p.y.toFixed(2)} maxY=${maxY} minY=${minY} popFrames=${pops} x=${p.x.toFixed(2)} z=${p.z.toFixed(2)}`);
}

console.log('=== 缩小玩家(r=0.12) 走近障碍(直上, 不跳) ===');
run('A.客户端现状 固定SUPPORT_R=0.25', 'fixed', false, {x:0,z:5}, {mx:0,mz:-1,ax:0,az:-1});
run('B.客户端修 缩放SUPPORT_R', 'scaled', false, {x:0,z:5}, {mx:0,mz:-1,ax:0,az:-1});
run('C.客户端修+迟滞守卫', 'scaled', true, {x:0,z:5}, {mx:0,mz:-1,ax:0,az:-1});
console.log('=== 缩小玩家 斜向顶到角(不跳) ===');
run('D.客户端现状 角', 'fixed', false, {x:2.4,z:5}, {mx:0.7,mz:-1,ax:0.7,az:-1});
run('E.客户端修 角', 'scaled', false, {x:2.4,z:5}, {mx:0.7,mz:-1,ax:0.7,az:-1});
run('F.客户端修+迟滞 角', 'scaled', true, {x:2.4,z:5}, {mx:0.7,mz:-1,ax:0.7,az:-1});
console.log('=== 对照: 正常体型(r=0.6) 直上不跳 ===');
run('G.正常体型-现状', 'fixed', false, {x:0,z:5,radius:0.6}, {mx:0,mz:-1,ax:0,az:-1});
console.log('=== 跳上顶面应成功(缩放+迟滞) ===');
run('H.跳上顶面', 'scaled', true, {x:0,z:5,jumpBuf:1}, {mx:0,mz:-1,ax:0,az:-1});
