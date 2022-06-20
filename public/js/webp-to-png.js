let webptoPng=document.querySelector("#webptopng");
let webptoPngBtn=document.querySelector("#webpBtn");
let previewWebtoPng=document.querySelector(".preview-image");
let WebtoPngDiv=document.querySelector(".preview-div");
let RemoveWebtoPng=document.querySelector("#removeImg");

webptoPngBtn.addEventListener('click',()=>{
    if(webptoPng.value == "") {
        toastr["warning"]("Please Select a File.", "Empty!");
        toastr.options = {
         "closeButton": true,
         "debug": false,
         "newestOnTop": false,
         "progressBar": false,
         "positionClass": "toast-top-right",
         "preventDuplicates": true,
         "onclick": null,
         "showDuration": "300",
         "hideDuration": "500",
         "timeOut": "3000",
         "extendedTimeOut": "1000",
         "showEasing": "swing",
         "hideEasing": "linear",
         "showMethod": "fadeIn",
         "hideMethod": "fadeOut"
       }  
    }
    else {
      toastr["success"]("Please wait, File is being downloading..", "Success");
    }
      });

  webptoPng.addEventListener('change',(e)=>{
  let allowedExtension = ['image/webp'];
  if(e.target.files.length == 0){
    return
  }
  const maxSize = 5242;
  let url = URL.createObjectURL(e.target.files[0]);
  let name=e.target.files[0].name;
  let size=e.target.files[0].size;
  let type=e.target.files[0].type;
  Totalsize =(size / 1048576).toFixed(2);

  //  type validation
  if(allowedExtension.indexOf(type)>-1)
  {
   previewWebtoPng.setAttribute('src',url);
   document.querySelector(".file-name").textContent=name;
   document.querySelector("#size").textContent= Totalsize + " MB";
   WebtoPngDiv.style.display="flex";
   document.getElementById('webptoPngBtn').removeAttribute("disabled", "disabled");
  }else{
    toastr["error"]("File type not Supported..", "Error!");
    webptoPng.value = "";
       }


    if (Totalsize > maxSize) {
      toastr["error"]("File Limit exceeded!.", "Error!");
      document.getElementById('webptoPngBtn').setAttribute("disabled", "disabled");
     }

  
})

//remove or emplty selected file || input field
RemoveWebtoPng.addEventListener("click",()=>{
  document.getElementById('webpBtn').removeAttribute("disabled", "disabled");
  webptoPng.value = "";
  document.querySelector(".file-name").textContent="";
  document.querySelector("#size").textContent="";
  previewWebtoPng.removeAttribute('src');
  WebtoPngDiv.style.display="none";

})
