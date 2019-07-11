
$(document).ready(function () {

    console.log("Here We Go");

    getUSTjoblisitng();
    searchFilter();
    dropdown();
    //clearFilter();
 
}); 

function getUSTjoblisitng() {
    var csvfile = '/jobsample.csv';
    var jsonformat;
    //console.log("(ajax-call)Starting.........");
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
             var job = new Array(); 
            
            // var ref_location= loc;
            // var ref_department=dep;
            // var ref_jobType=pt;
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

               


    /*appending in the top dropdown********************************************************************************/
              
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
        }
    })

}
/***********************************************************************************************/
function searchFilter(){

    var csvfile = '/jobsample.csv';
    var jsonformat;
   
    $('#Job').empty();

    //console.log("(ajax-call)Starting from filter function.........");
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
        
            var text = document.getElementById("searchInput").value;
            // var cap= text.toUpperCase();
         
            console.log(text);

            $.each(jsonformat, function (index, value){
                match = 0;
                $.each(value, function (i, j){
                    //console.log(j);
                    if(j.includes(text)){
                        match = 1;
                    }
                });

                if (match ==1){
                    //console.log(value['Position Title']);

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

/*****************************************************************************************************/
function dropdown(){

        var csvfile = '/jobsample.csv';
        var jsonformat;
        $('#Job').empty();

        console.log("(ajax-call)Starting..dropdown.......");
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

                var d = new Array(); 
                var ddepp = new Array();
                var ddjoptype = new Array(); 
    
                var ref_loci= dope;
                var ref_depi= 1;
                var ref_typi= 2;

                var loc_input = document.getElementById('dope').value;
                var emp_input = document.getElementById('2').value;
                var dep_input = document.getElementById('1').value;
        
                // console.log(loc_input);
                // console.log(emp_input);
                // console.log(dep_input);

                jsonformat = $.csv.toObjects(data);

                var filterConsidered = new Map(
                    [
                        ["Employment Type", loc_input], 
                        ["Department/Unit", emp_input], 
                        ["Campus : Location", dep_input]
                    ]
                    
                );
                var filterResult = new Array();

                $.each(filterConsidered, function (i, j){
                    match=0;
                    if (j == ""){
                        filterConsidered.delete(k);
                    }
                });

                 
                $.each(jsonformat, function (index, value){
                    $.each(filterConsidered, function(i,j){
                        if(value[i] == v){
                            match++;
                        }
                        if(match == filterConsidered.size){
                            filterResult.push(value);
                        }
                    });
        

                    if (filterResult.length !=0){
                        //console.log(value['Department/Unit']
        
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
                    else{
                        $('#Job').append(
                            '<div'+ 'Try Again'+'</div>'
                        )
                    }
                    

            });  

                } 
        });
    
}     

function clearFilter(){
   
    //console.log("(ajax-call)Starting..clear filter.......");
       //converting the csv file into json format
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
                $('#dope').val("");
                $('#1').val("");
                $('#2').val("");
                getUSTjoblisitng(jsonformat);

            }
        });
}