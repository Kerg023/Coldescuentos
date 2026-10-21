'use strict';
const form = document.getElementById('publish-form');
const bindings = [['business-name','preview-name','El nombre de tu negocio'],['business-category','preview-category','Categoría de tu negocio'],['business-city','preview-city','Tu ciudad'],['business-description','preview-description','Aquí aparecerá lo que hace especial a tu negocio.'],['business-offer','preview-offer','']];
function updatePreview(){
 for(const [input,output,fallback] of bindings){const value=document.getElementById(input).value.trim();document.getElementById(output).textContent=value||fallback;}
 document.getElementById('preview-offer').hidden=!document.getElementById('business-offer').value.trim();
 document.getElementById('description-count').textContent=`${document.getElementById('business-description').value.length} / 500 caracteres`;
 document.getElementById('form-status').textContent='';
}
form.addEventListener('input',updatePreview);
form.addEventListener('change',updatePreview);
let imageUrl;
document.getElementById('business-image').addEventListener('change',event=>{
 const file=event.target.files[0];
 const status=document.getElementById('image-status');
 const image=document.getElementById('preview-image');
 const placeholder=document.getElementById('preview-placeholder');
 if(imageUrl){URL.revokeObjectURL(imageUrl);imageUrl=undefined;}
 image.hidden=true;image.removeAttribute('src');placeholder.hidden=false;status.textContent='';
 if(!file)return;
 if(!['image/jpeg','image/png','image/webp'].includes(file.type)||file.size>5*1024*1024){status.textContent='Elige una imagen JPG, PNG o WebP de hasta 5 MB.';event.target.value='';return;}
 image.onload=()=>{image.hidden=false;placeholder.hidden=true;status.textContent=file.name;};
 image.onerror=()=>{image.hidden=true;placeholder.hidden=false;status.textContent='No pudimos abrir esta imagen. Elige otro archivo.';event.target.value='';};
 imageUrl=URL.createObjectURL(file);image.src=imageUrl;
});
form.addEventListener('submit',event=>{
 event.preventDefault();
 for(const input of form.querySelectorAll('[required]')){input.setCustomValidity(input.value.trim()?'':'Completa este campo.');input.addEventListener('input',()=>input.setCustomValidity(''),{once:true});}
 if(!form.reportValidity())return;
 const data=Object.fromEntries(new FormData(form).entries());
 const file=document.getElementById('business-image').files[0];
 if(file)data.foto=file.name;
 const blob=new Blob([JSON.stringify(data,null,2)],{type:'application/json;charset=utf-8'});
 const url=URL.createObjectURL(blob);const link=document.createElement('a');link.href=url;link.download='registro-negocio-coldescuentos.json';document.body.append(link);link.click();link.remove();setTimeout(()=>URL.revokeObjectURL(url),1000);
 const status=document.getElementById('form-status');status.textContent='Tu registro está listo para descargar. Guarda también tu foto: el archivo incluye su nombre. La información todavía no ha sido enviada ni publicada.';status.focus();
});
const menu=document.querySelector('.mobile-menu');
menu.addEventListener('click',()=>{const nav=document.getElementById('publish-mobile-nav');nav.hidden=!nav.hidden;menu.setAttribute('aria-expanded',String(!nav.hidden));});
document.querySelectorAll('#publish-mobile-nav a').forEach(link=>link.addEventListener('click',()=>{document.getElementById('publish-mobile-nav').hidden=true;menu.setAttribute('aria-expanded','false');}));
