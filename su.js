
$(document).ready(function () {

    console.log("Here We Go");

    getUSTjoblisitng();
    getsearchfilter();
 
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
            var job = new Array(); 
            
            var ref_location= loc;
            var ref_department=dep;
            var ref_jobType=pt;
            var ref_titlejob=title;
//practice*********************************************************************************************************************************************************************************
            var d = new Array(); 
            var ddepp = new Array();
            var ddjoptype = new Array(); 

            var ref_loci= dope;
            var ref_depi= 1;
            var ref_typi= 2;
        
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
                if (!job.includes(value["Position Title"])){
                    job.push(value["Position Title"]);
                }
                //practice appending in the top dropdown
                if (!d.includes(value['Campus : Location'])){
                    d.push(value['Campus : Location']);
                }
                if (!ddepp.includes(value['Department/Unit'])){
                    ddepp.push(value['Department/Unit']);
                }
                if (!ddjoptype.includes(value["Position Title"])){
                    ddjoptype.push(value["Position Title"]);
                }
                
            }); 

            $.each(jsonformat, function(key, value){

            //object literal
            //console.log(value.ID);
            //console.log( value["Job URL (Linked)"]);
 
            //apending inside the job directory
                $('#Job').append(
                    '<div id=style>'+ 
                    '<ul>' +
                    '<a href="' + value['Job URL (Linked)'] + '" target="_blank">' + 
                    '<h4>' + value['Position Title'] + '</h4>'+'</a>'+
                    '<div>'+'<button>'+ value['Campus : Location'] +'</button>'+'</div>'+
                    '<div>'+'<button>'+ value["Department/Unit"] +'</button>' +'</div>'+
                    '<div>'+'<button>'+ value["Position Type"] +'</button>'+'</div>'+ 
                    '<div>'+'<button>'+ '<br>'+value["Closing Date"] +'</button>'+'</div>' 
                ) 

                });

               

//appending in the dropdown button************************************************************************************************************************************************
                 //console.log(job);
                $.each(job, function (key, value){
                     $('#title').append('<a href="' + value['Job URL (Linked)'] + '" target="_blank">'  + value +'</a>')
                });
                $.each(location, function (key, value){
                    //console.log(value);
                    $('#loc').append('<a  id=arrow>'+value+'</a>')
                });
               
                $.each(department, function (key, value){
                    $('#dep').append('<a id=arrow>'+value+'</a>')
                });
                $.each(positionType, function (key, value){
                    $('#pt').append('<a id=arrow>'+value+'</a>')
                });
//practice************************************************************************************************************************************************************************
                $.each(d, function (key, value){
                    //console.log(value);
                    $('#dope').append( '<option value = "#FFFFFF">'+value+'</option>')
                })
                $.each(ddepp, function (key, value){
                    //console.log(value);
                    $('#1').append( '<option value = "#FFFFFF">'+value+'</option>')
                })
                $.each(ddjoptype, function (key, value){
                    //console.log(value);
                    $('#2').append( '<option value = "#FFFFFF">'+value+'</option>')
                })  
        }
    })

}

function getsearchfilter(){
    var csvfile = '/jobsample.csv';
    var jsonformat;
    console.log("(ajax-call)Starting from filter function.........");
//converting the csv file into json data
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
            var ref_titlejob=title;

//practice*****************************************************************************************************************************************************************************************
            var d = new Array(); 
            var ddepp = new Array();
            var ddjoptype = new Array(); 

            var ref_loci= dope;
            var ref_depi= 1;
            var ref_typi= 2;
            
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
                if (!job.includes(value["Position Title"])){
                    job.push(value["Position Title"]);
                }
/******************************************************************************************************************************************************** */
                if (!d.includes(value['Campus : Location'])){
                    d.push(value['Campus : Location']);
                }
                if (!ddepp.includes(value['Department/Unit'])){
                    ddepp.push(value['Department/Unit']);
                }
                if (!ddjoptype.includes(value["Position Title"])){
                    ddjoptype.push(value["Position Title"]);
                }
                
 
            }); 
            
        }
    });
}
