let cards = Array.from(document.querySelectorAll('.cat__card__box'));

cards.forEach(el => { 
    el.addEventListener('click', function() {
        let select = Array.from(this.childNodes);
        select[1].classList.toggle('selected');
        select[3].classList.toggle('hidden');
        select[5].classList.toggle('hidden');

        let selectInside = Array.from(select[1].childNodes);
        selectInside[3].classList.toggle('selected');
    });

    el.addEventListener("mouseleave", function(evt) {
        let select = Array.from(this.childNodes);
        
        if(select[1].classList.contains('selected')){
            let arr1 = Array.from(select[1].childNodes);
            let arr2 = Array.from(arr1[1].childNodes);
            let arr3 = Array.from(arr2[1].childNodes);
            console.log(arr3);
            arr3[1].style.display = "none";
            arr3[3].style.display = "block";
    
        if (evt.target === this) {
            setTimeout(function() {
                arr3[1].style.display = "block";
                arr3[3].style.display = "none";        
            }, 3000);
          }
        }
      });
 });

 function disable(element) {
    element.classList.add('disabled');
    let arr = Array.from(element.childNodes);
    arr[7].classList.remove('hidden');
    arr[3].classList.add('hidden');
    arr[1].classList.add('dis-background');
    let arr2 = Array.from(arr[1].childNodes);
    arr2[3].classList.add('dis-background');
    arr2[1].style.opacity = "0.5";
 };

 disable(cards[2]);

