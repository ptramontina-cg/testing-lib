var l=["JPEG","JPG","PNG","GIF"];function d(a){return(a.includes("/")?a.split("/")[1]:a).toUpperCase()}var i=class{constructor(e){this.file=e}async validate(){return console.log("frontend validate image",this.file),!0}validateSize(){return this.file.size>1e8}async validateResolution(){let e=await this.getImageFromFile(this.file);return e.width>2e3||e.width<50||e.height>2e3||e.height<50}validateType(){return l.includes(d(this.file.type))}async getImageFromFile(e){return new Promise((t,c)=>{e.arrayBuffer().then(m=>{let p=new Blob([m],{type:e.type}),v=URL.createObjectURL(p),r=new Image;r.src=v,r.onload=()=>t(r),r.onerror=c})})}};var o=class{constructor(e){this.file=e}async validate(){return console.log("frontend validate image",this.file),!0}};var n=class{constructor(e){this.file=e}async validate(){return console.log("frontend validate image",this.file),!0}};var s=class{async validate(e,t){if(t instanceof String&&e!=="vast")throw new Error("Invalid type for frontend validation.");switch(e){case"image":return await this.validateImage(t);case"video":return await this.validateVideo(t);case"vast":return await this.validateVast(t)}}async validateVideo(e){return await new n(e).validate()}async validateImage(e){return await new i(e).validate()}async validateVast(e){return await new o(e).validate()}};export{s as CreativeValidator};
