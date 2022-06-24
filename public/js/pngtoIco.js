let ico=document.querySelector("#ico");
let icoBtn=document.querySelector("#button");
let previewico=document.querySelector(".preview-image");
let icoDiv=document.querySelector(".preview-div");
let Rmico=document.querySelector("#removeImg");

var files
    var size = 256
      $('#pngtoIco').on('submit', function (e){
        e.preventDefault()
    //$('#upload-input').click();
    $('.progress-bar').text('0%');
    $("#button").text("Uploading File")
    $("#button").prop("disabled","true")
    $('.progress-bar').width('0%');

    convertFile();
});
$('#ico').on('change', function(e){
  files = $(this).get(0).files;
var fileExtension = ['png'];
        if ($.inArray($(this).val().split('.').pop().toLowerCase(), fileExtension) == -1) {
           $(this).val("") 
    
      toastr["error"]("Please Uplaod a PNG File.", "Error!");

        }
        let allowedExtension = ['image/png'];
        if(e.target.files.length == 0){
          return
        }
        const maxSize = 5;
        let url = URL.createObjectURL(e.target.files[0]);
        let name=e.target.files[0].name;
        let size=e.target.files[0].size;
        let type=e.target.files[0].type;
        Totalsize =(size / 1048576).toFixed(2);
      
        //  type validation
        if(allowedExtension.indexOf(type)>-1)
        {
         previewico.setAttribute('src',url);
         document.querySelector(".file-name").textContent=name;
         document.querySelector(".size").textContent= Totalsize + " MB";
         icoDiv.style.display="flex";
         document.getElementById('button').removeAttribute("disabled", "disabled");
        }else{
          toastr["error"]("File type not Supported..", "Error!");
          ico.value = "";
             }
      
          if (Totalsize > maxSize) {
            toastr["error"]("File Limit exceeded!.", "Error!");
            document.getElementById('button').setAttribute("disabled", "disabled");
           }
})

$("#size").on('change',function(){
        size= $(this).children("option:selected").val();
    });

function convertFile(){
  if (files.length > 0){
    // create a FormData object which will be sent as the data payload in the
    // AJAX request
    var formData = new FormData();
    // loop through all the selected files and add them to the formData object
    for (var i = 0; i < files.length; i++) {
      var file = files[i];
      // add the files to formData object for the data payload
      formData.append('file', file, file.name);
    }
    console.log(formData)
    var formdata2 = new FormData()
    $.ajax({
      url: '/uploadpngtoico',
      type: 'POST',
      data: formData,
      processData: false,
      contentType: false,
      success: function(data){
          var data2 = {path:data.path,size:size}
          console.log('upload successful!\n' + data.path);
          $("#button").text("File Uploaded Now Processing")
          $("#button").prop("disabled",true);
          formdata2.append('path',data.path)
          $.ajax({
              url:'/pngtoico',
              type:'POST',
              data:JSON.stringify(data2),
              contentType: "application/json",
              dataType:"json",
      success:function(data){

          window.open('/download?path='+data.path)
          $("#button").text("Upload File")
          $("#button").prop("disabled",false);
          location.reload();
      }
          })
      },
      xhr: function() {
        // create an XMLHttpRequest
        var xhr = new XMLHttpRequest();
        // listen to the 'progress' event
        xhr.upload.addEventListener('progress', function(evt) {
          if (evt.lengthComputable) {
            // calculate the percentage of upload completed
            var percentComplete = evt.loaded / evt.total;
            percentComplete = parseInt(percentComplete * 100);
            // update the Bootstrap progress bar with the new percentage
            $('.progress-bar').text(percentComplete + '%');
            $('.progress-bar').width(percentComplete + '%');
            // once the upload reaches 100%, set the progress bar text to done
            if (percentComplete === 100) {
              $('.progress-bar').html('Done');
            }
          }
        }, false);
        return xhr;
      }
    });
  }
}

//remove or emplty selected file || input field
Rmico.addEventListener("click",()=>{
  document.getElementById('button').removeAttribute("disabled", "disabled");
  ico.value = "";
  document.querySelector(".file-name").textContent="";
  document.querySelector(".size").textContent="";
  previewico.removeAttribute('src');
  icoDiv.style.display="none";

})

icoBtn.addEventListener("click",()=>{
  if(ico.value == "") {
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
})