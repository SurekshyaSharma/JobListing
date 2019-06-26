
$(document).ready(function () {

    console.log("Here We Go");

    getUSTjoblisitng();
    getshowdata();

}); 

function getUSTjoblisitng() {
    var csvfile = '/jobsample.csv';
    var jsonformat;
    console.log("(ajax-call)Starting.........");
//converting the csv file into json format
    $.ajax({
        type: "GET",
        url: csvfile,
        dataType: "text",

        error: function(error){
            alert("Error Occurred");
            console.log("Failed ajax call" , error);
        },
        
        success: function(data){
            jsonformat = $.csv.toObjects(data);

            var location=  new Array();     
            var department=  new Array();  
            var positionType=  new Array();  

            var ref_location= loc;
            var ref_department=dep;
            var ref_jobType=pt;


            console.log(jsonformat)
            $.each(jsonformat, function(key, value){

                //object literal
                //console.log(value.ID);
                //console.log( value["Position Type"]);
                //console.log( value["Department/Unit"])
                console.log(value["Campus : Location"]);

                $('#Job').append(
                    '<div id=style>'+ 
                    '<a href=" '+value['Job URL (Linked)']+'")">'+value["Position Title"]+'</a>'+
                    '<div>'+'<button>'+value['Campus : Location']+'</button>'+'</div>'+
                    '<div>'+'<button>'+value["Department/Unit"]+'</button>' +'</div>'+
                    '<div>'+'<button>'+value["Position Type"] +'</button>'+'</div>'+ 
                    '<div>'+'<button>'+'<br>'+value["Closing Date"]+'</button>'+'</div>'+
                    '</div>'+'<br>'
                    
                )
                    

                $('#loc').append( '<a href="#">'+value['Campus : Location']+ '</a>'
                )

                $('#pt').append('<a href="#">'+value["Position Title"]+ '</a>'
                )

                $('#dep').append('<a href="#">'+value["Department/Unit"]+ '</a>'
                )
            });

        }

    })
}
