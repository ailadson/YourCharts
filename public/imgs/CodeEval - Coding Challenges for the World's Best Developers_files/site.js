$(document).ready(function() {
    $('[data-element="dev-accept-invitations"], [data-element="dev-decline-invitations"]').click(function(){
        $.ajax({
            type: "POST",
            url: $(this).attr("x-data-url"),
            data: { action: $(this).attr("data-action") }
        })
        .done(function(data, textStatus, jqXHR) {
            if (data["success"] == true){
                location.reload();
            }
        })
        .fail(function() {
        })
        .always(function() {
        });
    });
});

//Custom select
$('.customSelect').customSelect();


//Search field
$('.search-input').on('focus', function () {
    $(this).parent().addClass('active');
});
$('.search-input').on('focusout', function () {
    $(this).parent().removeClass('active');
});
