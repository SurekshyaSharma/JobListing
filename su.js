
$(document).ready(function () {

    console.log("Here We Go");

    getUSTjoblisitng();
   getfilter();
 

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

            
            $.each(jsonformat, function (index, value){
                if (!positionType.includes(value['Employment Type'])){
                    positionType.push(value['Employment Type']);
                }
                if (!department.includes(value['Department/Unit'])){
                    department.push(value['Department/Unit']);
                }
                if (!location.includes(value['Campus : Location'])){
                    location.push(value['Campus : Location']);
                }
            }); 

            
            $.each(jsonformat, function(key, value){

                //object literal
                //console.log(value.ID);
                //console.log( value["Position Type"]);

           //showing the data of array
              
                $('#Job').append(
                    '<div id=style>'+ 
                    '<a href=" '+value['Job URL (Linked)']+'")">'+value["Position Title"]+'</a>'+
                    '<div>'+'<button>'+value['Campus : Location']+'</button>'+'</div>'+
                    '<div>'+'<button>'+value["Department/Unit"]+'</button>' +'</div>'+
                    '<div>'+'<button>'+value["Position Type"] +'</button>'+'</div>'+ 
                    '<div>'+'<button>'+'<br>'+value["Closing Date"]+'</button>'+'</div>'+
                    '</div>'+'<br>'  
                ) 

            });
             console.log(location);
            // console.log(department);
            // console.log(positionType);
         
//appending in the button
            $.each(location, function (key, value){
                //console.log(value);
                $('#loc').append('<a id="myDropdown href="locat">'+value+'</a>')
            });
            $.each(department, function (key, value){
                $('#dep').append('<a id="myDropdown href="depert">'+value+'</a>')
            });
            $.each(positionType, function (key, value){
                $('#pt').append('<a id="myDropdown href="posi">'+value+'</a>')
            });
        }
    

    })
}


function getfilter(){
    var csvfile = '/jobsample.csv';
    var jsonformat;
    console.log("(ajax-call)Starting from filter function.........");
//converting the csv file into json format
    $.ajax({
        type: "GET",
        url: csvfile,
        dataType: "text",

        error: function(error){
            alert("Error Occurred");
            console.log("Failed ajax call from filter function" , error);
        },
        
        success: function(data){
            jsonformat = $.csv.toObjects(data);

            var location=  new Array();     
            var department=  new Array();  
            var positionType=  new Array();
            var job = new Array();  

            var ref_location= loc;
            var ref_department=dep;
            var ref_jobType=pt;
            
            $.each(jsonformat, function (index, value){
                if (!positionType.includes(value['Employment Type'])){
                    positionType.push(value['Employment Type']);
                }
                if (!department.includes(value['Department/Unit'])){
                    department.push(value['Department/Unit']);
                }
                if (!location.includes(value['Campus : Location'])){
                    location.push(value['Campus : Location']);
                }
                if (!location.includes(value['Campus : Location'])){
                    location.push(value['Campus : Location']);
                }
                
 
            }); 
            
            fill_filter(positionTypes, ref_jobType);
            fill_filter(department, ref_department);
            fill_filter(location, ref_location);
        }
    });
}
