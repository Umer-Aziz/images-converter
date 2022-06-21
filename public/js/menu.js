document.querySelector(".menu").addEventListener('click',()=>{
    document.querySelector(".mobile-menu").classList.toggle('hidden');
    document.querySelector('#bars').classList.toggle("hidden");
    document.querySelector('#cross').classList.toggle("hidden");
    document.body.classList.toggle("touch-action");

})