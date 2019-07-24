/* Carousel section */
$(document).ready(function() {

    $(document).on('doubletap', '.slick-current', function(e){
        if ($(this).find('.post-image-slider--title').css('display') == 'none') {
            $(this).find('.post-image-slider--title').show();
            $(this).find('.post-image-slider--overview').css('display', '');
        } else {
            $(this).find('.post-image-slider--title').hide();
            $(this).find('.post-image-slider--overview').hide();
        }
    });
    

});
/* End Carousel section */


