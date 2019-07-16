
$(document).ready(function () {

    console.log("Here We Go");

    getUSTjoblisitng();
    searchFilter();
    dropdown();
 
}); 

function getUSTjoblisitng() {
    var csvfile = '/jobsample.csv';
    var jsonformat;
   
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
            //console.log("(ajax-call)Starting.........");
            //converting the csv file into json format

            var job = new Array(); 
            var ref_titlejob=title;

            var d = new Array(); 
            var ddepp = new Array();
            var ddjoptype = new Array(); 

            var ref_loci= location;
            var ref_depi= department;
            var ref_typi= employmentType;

            //console.log(jsonformat)
            
            $.each(jsonformat, function (index, value){
               
                if (!job.includes(value["Position Title"])){
                    job.push(value["Position Title"]);
                }
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

            $.each(jsonformat, function(key, value){
                //object literal
                //console.log(value.ID);
                //console.log( value["Job URL (Linked)"]);
    
                $('#Job').append(
                    '<div id=style>'+ '<ul>'+
                    '<a href="' + value['Job URL (Linked)'] + '" target="_blank">' + 
                    '<h4>'    + value['Position Title'] + '</h4>'+'</a>'+"  "+
                    '<button>'+ value['Campus : Location'] +'</button>'+"  "+
                    '<button>'+ value["Department/Unit"] +'</button>' +"  "+
                    '<button>'+ value["Position Type"] +'</button>'+ "  "+
                    '<button>'+ value["Closing Date"] +'</button>' +"  "+
                    '<button>'+ value['Campus : Location'] +'</button>'+"  "+
                    '<button>'+'No of Opening:'+" "+ value['# of Openings'] +'</button>'+"  "+
                    '<button>'+ value['FLSA Status'] +'</button>'+"  "+
                    '<button>'+'ID:'+' '+ value['ID'] +'</button>'+"  "+
                    '<button>'+ value['Who May Apply'] +'</button>'+'</ul'

                )

                //there is URl append if there is not URl create a new url and show
                if (value['Job URL (Linked)'] !== '') {
                    $('#title').append('<a href="' + value['Job URL (Linked)'] + '" target="_blank">'  + value['Position Title'] +'</a>')
                } else {
                    let id = value['ID'].split('-').pop()
                    $('#title').append(`<a href="https://studentemployment-stthomas.icims.com/jobs/${id}/job" target="_blank">${value['Position Title']}</a>`)
                }
            });

    /*appending in the top dropdown****************************************************************************************************************************************/
              
                $.each(d, function (key, value){
                    //console.log(value);
                    $('#location').append( '<option>'+value+'</option>')
                })
                $.each(ddepp, function (key, value){
                    //console.log(value);
                    $('#department').append( '<option>'+value+'</option>')
                })
                $.each(ddjoptype, function (key, value){
                    //console.log(value);
                    $('#employmentType').append( '<option>'+value+'</option>')
                })  
        }
    })

}
/***********************************************************************************************/
function searchFilter(){

    var csvfile = '/jobsample.csv';
    var jsonformat;
   
    $('#Job').empty();
    
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
        
            var text = document.getElementById("searchInput").value;
            var userInput = text.toLowerCase();
            

            $.each(jsonformat, function (index, value){
                var valueLowercase =  value['Position Title'].toLowerCase();
                match = 0;
                
                if(valueLowercase.includes(userInput)){
                    match = 1;
                    
                }

                if (match ==1){

                    $('#Job').append(
                        '<div>'+ '<ul>'+
                        '<a href="' + value['Job URL (Linked)'] + '" target="_blank">' + 
                        '<h4>'    + value['Position Title'] + '</h4>'+'</a>'+
                        '<button>'+ value['Campus : Location'] +'</button>'+"  "+
                        '<button>'+ value["Department/Unit"] +'</button>' +"  "+
                        '<button>'+ value["Position Type"] +'</button>'+ "  "+
                        '<button>'+ value["Closing Date"] +'</button>' +"  "+
                        '<button>'+ value['Campus : Location'] +'</button>'+"  "+
                        '<button>'+'No of Opening:'+" "+ value['# of Openings'] +'</button>'+"  "+
                        '<button>'+ value['FLSA Status'] +'</button>'+"  "+
                        '<button>'+'ID:'+' '+ value['ID'] +'</button>'+"  "+
                        '<button>'+ value['Who May Apply'] +'</button>'+'</ul'
    
                    ) 
                }  

            });
            
        }
    });
    
}       

function dropdown(){
    $('#job').empty();
        var csvfile = '/jobsample.csv';
        var jsonformat;
    
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

                    var ref_loci= location;
                    var ref_depi= department;
                    var ref_typi= employmentType;

                    var loc_input = document.getElementById('location').value;
                    var dep_input = document.getElementById('department').value;
                    var emp_input = document.getElementById('employmentType').value;
                    //console.log(loc_input);
                    var filterConsidered = new Map(
                        [ 
                            ["Employment Type", emp_input], 
                            ["Department/Unit", dep_input], 
                            ["Campus : Location", loc_input]
                        ]
                        
                        );
                    var filterresults = new Array(); 
                  
                        //console.log(filterConsidered);
                    filterConsidered.forEach( function (idx, val){
                   
                            console.log(idx);
                        
                            if(val == ""){
                                filterConsidered.delete(idx);
                            }
                    
                        }); 
                        

                    $.each(jsonformat, function (index, value){
                            $('#job').empty();

                           
                           
                    });  
            } 
        });
}     

function clearFilter(){
    
        $.ajax({
            type: "GET",
            url: '/jobsample.csv',
            dataType: "text",
    
            error: function(error){
                alert("Error Occurred");
                console.log("Failed ajax call" , error);
            },
            
            
            success: function(data){
            jsonformat = $.csv.toObjects(data);
            
                $('#Job').empty();
                $('#location').val("");
                $('#department').val("");
                $('#employementType').val("");
                getUSTjoblisitng(jsonformat);

            }
        });
}

