let tiff=document.querySelector("#tiff");
let tiffBtn=document.querySelector("#webpBtn");
let previewtiff=document.querySelector(".preview-image");
let tiffDiv=document.querySelector(".preview-div");
let Rmtiff=document.querySelector("#removeImg");

tiffBtn.addEventListener('click',()=>{
    if(tiff.value == "") {
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

  tiff.addEventListener('change',(e)=>{
  let allowedExtension = ['image/png','image/jpeg','image/webp','image/gif','image/avif','image/svg+xml','image/jpg'];
  if(e.target.files.length == 0){
    return
  }
  const maxSize = 10;
  let url = URL.createObjectURL(e.target.files[0]);
  let name=e.target.files[0].name;
  let size=e.target.files[0].size;
  let type=e.target.files[0].type;
  Totalsize =(size / 1048576).toFixed(2);

  //  type validation
  if(allowedExtension.indexOf(type)>-1)
  {
   previewtiff.setAttribute('src',url);
   document.querySelector(".file-name").textContent=name;
   document.querySelector("#size").textContent= Totalsize + " MB";
   tiffDiv.style.display="flex";
   document.getElementById('webpBtn').removeAttribute("disabled", "disabled");
  }else{
    toastr["error"]("File type not Supported..", "Error!");
    tiff.value = "";
       }

    if (Totalsize > maxSize) {
      toastr["error"]("File Limit exceeded!.", "Error!");
      document.getElementById('webpBtn').setAttribute("disabled", "disabled");
     }

  
})

//remove or emplty selected file || input field
Rmtiff.addEventListener("click",()=>{
  document.getElementById('webpBtn').removeAttribute("disabled", "disabled");
  tiff.value = "";
  document.querySelector(".file-name").textContent="";
  document.querySelector("#size").textContent="";
  previewtiff.removeAttribute('src');
  tiffDiv.style.display="none";

})
