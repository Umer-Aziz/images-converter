let gif=document.querySelector("#gif");
let gifBtn=document.querySelector("#webpBtn");
let previewgif=document.querySelector(".preview-image");
let gifDiv=document.querySelector(".preview-div");
let Rmgif=document.querySelector("#removeImg");

gifBtn.addEventListener('click',()=>{
    if(gif.value == "") {
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

  gif.addEventListener('change',(e)=>{
  let allowedExtension = ['image/png','image/jpeg','image/webp','image/tiff','image/avif','image/svg+xml','image/jpg'];
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
   previewgif.setAttribute('src',url);
   document.querySelector(".file-name").textContent=name;
   document.querySelector("#size").textContent= Totalsize + " MB";
   gifDiv.style.display="flex";
   document.getElementById('webpBtn').removeAttribute("disabled", "disabled");
  }else{
    toastr["error"]("File type not Supported..", "Error!");
    gif.value = "";
       }

    if (Totalsize > maxSize) {
      toastr["error"]("File Limit exceeded!.", "Error!");
      document.getElementById('webpBtn').setAttribute("disabled", "disabled");
     }

  
})

//remove or emplty selected file || input field
Rmgif.addEventListener("click",()=>{
  document.getElementById('webpBtn').removeAttribute("disabled", "disabled");
  gif.value = "";
  document.querySelector(".file-name").textContent="";
  document.querySelector("#size").textContent="";
  previewgif.removeAttribute('src');
  gifDiv.style.display="none";

})
