
$(document).ready(function () {

    console.log("Here We Go");

    getUSTjoblisitng();
    searchFilter();
    dropdown();
 
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

            // var location=  new Array();     
            // var department=  new Array();  
            // var positionType=  new Array();  
            // var job = new Array(); 
            
            // var ref_location= loc;
            // var ref_department=dep;
            // var ref_jobType=pt;
            // var ref_titlejob=title;
//practice*********************************************************************************************************************************************************************************
        
            console.log(jsonformat)
            
            $.each(jsonformat, function (index, value){
                // if (!positionType.includes(value['Employment Type'])){
                //     positionType.push(value['Employment Type']);
                // }
                // if (!department.includes(value['Department/Unit'])){
                //     department.push(value['Department/Unit']);
                // }
                // if (!location.includes(value['Campus : Location'])){
                //     location.push(value['Campus : Location']);
                // }
                // if (!job.includes(value["Position Type"])){
                //     job.push(value["Position Type"]);
                // }

                
            }); 

            $.each(jsonformat, function(key, value){

            //object literal
            //console.log(value.ID);
            //console.log( value["Job URL (Linked)"]);
 
            //appending inside the job directory
                $('#Job').append(
                    '<div id=style>'+ '<ul>'+
                    '<a href="' + value['Job URL (Linked)'] + '" target="_blank">' + 
                    '<h4>'    + value['Position Title'] + '</h4>'+'</a>'+
                    '<button>'+ value['Campus : Location'] +'</button>'+
                    '<button>'+ value["Department/Unit"] +'</button>' +
                    '<button>'+ value["Position Type"] +'</button>'+ 
                    '<button>'+ value["Closing Date"] +'</button>' +
                    '<button>'+ value['Campus : Location'] +'</button>'+
                    '<button>'+'No of Opening:'+" "+ value['# of Openings'] +'</button>'+
                    '<button>'+ value['FLSA Status'] +'</button>'+
                    '<button>'+'ID:'+' '+ value['ID'] +'</button>'+
                    '<button>'+ value['Who May Apply'] +'</button>'+'</ul'

                ) 

                });

               

//appending in the dropdown button************************************************************************************************************************************************
                 //console.log(job);
                // $.each(job, function (key, value){
                //      $('#title').append('<a href="' + value['Job URL (Linked)'] + '" target="_blank">'  + value +'</a>')
                // });
                // $.each(location, function (key, value){
                //     //console.log(value);
                //     $('#loc').append('<a  id=arrow>'+value+'</a>')
                // });
               
                // $.each(department, function (key, value){
                //     $('#dep').append('<a id=arrow>'+value+'</a>')
                // });
                // $.each(positionType, function (key, value){
                //     $('#pt').append('<a id=arrow>'+value+'</a>')
                // });

        }
    })

}
/***********************************************************************************************/
function searchFilter(){
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
            var searchResult= new Array();
            var text = document.getElementById("searchInput").value;
            filter = text.toUpperCase();
         
            console.log(text);
            //$('#Job').empty();

            $.each(jsonformat, function (index, value){
                match = 0;
                $.each(value, function (index, value){
                    
                    if(text== value){
                        match = 1;
                    }
                
                    if (match ==1){
                        $('#Job').append(
                            '<div id=style>'+ '<ul>'+
                            '<a href="' + value['Job URL (Linked)'] + '" target="_blank">' + 
                            '<h4>'    + value['Position Title'] + '</h4>'+'</a>'+
                            '<button>'+ value['Campus : Location'] +'</button>'+
                            '<button>'+ value["Department/Unit"] +'</button>' +
                            '<button>'+ value["Position Type"] +'</button>'+ 
                            '<button>'+ value["Closing Date"] +'</button>' +
                            '<button>'+ value['Campus : Location'] +'</button>'+
                            '<button>'+'No of Opening:'+" "+ value['# of Openings'] +'</button>'+
                            '<button>'+ value['FLSA Status'] +'</button>'+
                            '<button>'+'ID:'+' '+ value['ID'] +'</button>'+
                            '<button>'+ value['Who May Apply'] +'</button>'+'</ul'
        
                        ) 
                    }
                    else{
                        $('#Job').append(
                            '<div id=style>'+ 'Try Again!!'+'</div>'
                        )
                    }

            
                });

            
            });
            
        }
    });
    
}       

/*****************************************************************************************************/
function dropdown(){

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
    
                var d = new Array(); 
                var ddepp = new Array();
                var ddjoptype = new Array(); 
    
                var ref_loci= dope;
                var ref_depi= 1;
                var ref_typi= 2;
                
                $.each(jsonformat, function (index, value){
                    
    /*appending in the top dropdown********************************************************************************/
                    if (!d.includes(value['Campus : Location'])){
                        d.push(value['Campus : Location']);
                    }
                    if (!ddepp.includes(value['Department/Unit'])){
                        ddepp.push(value['Department/Unit']);
                    }
                    if (!ddjoptype.includes(value["Position Type"])){
                        ddjoptype.push(value["Position Type"]);
                    }
                    
                }); 
    
                    $.each(d, function (key, value){
                        //console.log(value);
                        $('#dope').append( '<option>'+value+'</option>')
                    })
                    $.each(ddepp, function (key, value){
                        //console.log(value);
                        $('#1').append( '<option>'+value+'</option>')
                    })
                    $.each(ddjoptype, function (key, value){
                        //console.log(value);
                        $('#2').append( '<option>'+value+'</option>')
                    })  
                    
                    var loc_input = document.getElementById('dope').value;
                    var emp_input = document.getElementById('2').value;
                    var dep_input = document.getElementById('1').value;

                    console.log(loc_input);
                    //console.log(emp_input);
                    //console.log(dep_input);
                } 
        });
    
}     
