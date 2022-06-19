let webp=document.querySelector("#webp");
let webpBtn=document.querySelector("#webpBtn");
let previewImage=document.querySelector(".preview-image");
let previewDiv=document.querySelector(".preview-div");
let removeImg=document.querySelector("#removeImg");

webpBtn.addEventListener('click',()=>{
    if(webp.value == "") {
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

webp.addEventListener('change',(e)=>{
  if(e.target.files.length == 0){
    return
  }
  const maxSize = 5242;
  let url = URL.createObjectURL(e.target.files[0]);
  let name=e.target.files[0].name;
  let size=e.target.files[0].size;
  Totalsize =(size / 1048576).toFixed(2);

  previewImage.setAttribute('src',url);
  document.querySelector(".file-name").textContent=name;
  document.querySelector("#size").textContent= Totalsize + " MB";
  previewDiv.style.display="flex";
  document.getElementById('webpBtn').removeAttribute("disabled", "disabled");


    if (Totalsize > maxSize) {
      toastr["error"]("File Limit exceeded!.", "Error!");
      document.getElementById('webpBtn').setAttribute("disabled", "disabled");
     }
  
  
})

//remove or emplty selected file || input field
removeImg.addEventListener("click",()=>{
  document.getElementById('webpBtn').removeAttribute("disabled", "disabled");
  webp.value = "";
  document.querySelector(".file-name").textContent="";
  document.querySelector("#size").textContent="";
  previewImage.removeAttribute('src');
  previewDiv.style.display="none";

})
