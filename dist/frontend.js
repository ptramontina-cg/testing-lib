var u=["JPEG","JPG","PNG","GIF"];var r=class extends Error{code;constructor(e,t){super(e),this.code=t,this.name="ValidationError"}get errorCode(){return this.code}};function s(o){return(o.includes("/")?o.split("/")[1]:o).toUpperCase()}var l=class{async validate(e){if(!e.type.includes("image/"))throw new r("Invalid File Input: File is not an image",103);let t=[this.validateSize(e),await this.validateResolution(e),this.validateType(e)].filter(i=>i);if(t.length)throw new r(`Invalid Image: ${t.join(", ")}`,100);return!0}validateSize(e){return e.size>1e8?`Invalid size. Maximum allowed is: ${1e8/1e6} MB.`:!1}async validateResolution(e){let t=await this.getImageFromFile(e);return t.width>2e3||t.width<50||t.height>2e3||t.height<50?`Invalid resolution - Min: ${50}x${50} - Max: ${2e3}x${2e3}`:!1}validateType(e){return u.includes(s(e.type))?!1:`Invalid format - Only the following are allowed: ${u.join(", ")}`}async getImageFromFile(e){return new Promise((t,i)=>{e.arrayBuffer().then(a=>{let m=new Blob([a],{type:e.type}),p=URL.createObjectURL(m),n=new Image;n.src=p,n.onload=()=>t(n),n.onerror=i})})}};import T from"axios";var d=class{async validate(e){return this.validateUrl(e),await this.validateXml(e),!0}validateUrl(e){try{return new URL(e),!0}catch{throw new r("Invalid Vast: Current input is not an url",102)}}async validateXml(e){if(!(await T.get(e)).data.includes("<?xml"))throw new r("Invalid Vast: Return from url is not XML",102);return!0}};var h=[15,30,60],A={2160:3e4,1280:13e3,1080:12e3,720:8e3,432:2e3},w=["WEBM","OGG","MP4"],v=1e8;var I=class{async validate(e){if(!e.type.includes("video/"))throw new r("Invalid File Input: File is not a video",103);let t=await this.getVideoFromFile(e);console.log(t.duration),console.log(t.duration/60),console.log("h",t.videoHeight,"x","w",t.videoWidth),console.log(e.size),console.log(e.size*8),console.log(e.size*8/1e3),console.log("bitrate kbps",e.size*8/1e3/t.duration);let i=[this.validateSize(e)];if(this.isVideoSupported(e)){let a=await this.getVideoFromFile(e);i.push(this.validateResolution(a.height),this.validateDuration(a.duration))}if(i=i.filter(a=>a),i.length)throw new r(`Invalid Video: ${i.join(", ")}`,101);return!0}validateSize(e){return e.size>v?`Invalid size - Maximum allowed is: ${v/1e6} MB.`:!1}validateBitRate(){return!1}validateResolution(e){return e in A?"Resolution not supported - Please use 2160p, 1280p, 1080p, 720p or 432p.":!1}validateDuration(e){return h.includes(e)?!1:`The uploaded video has duration ${e}sec which is not supported - Please use one of the following durations: 15s, 30s, 60s`}isVideoSupported(e){return w.includes(s(e.type))}async getVideoFromFile(e){return new Promise((t,i)=>{e.arrayBuffer().then(a=>{let m=new Blob([a]),p=URL.createObjectURL(m),n=document.createElement("video");n.onloadedmetadata=()=>t(n),n.src=p})})}};var V=class{async validate(e,t){if(t instanceof String&&e!=="vast")throw new r("Invalid File Input: String is only allowed for VAST.",103);switch(e){case"image":return await this.validateImage(t);case"video":return await this.validateVideo(t);case"vast":return await this.validateVast(t)}}async validateVideo(e){return await new I().validate(e)}async validateImage(e){return await new l().validate(e)}async validateVast(e){return await new d().validate(e)}};export{V as CreativeValidator};
