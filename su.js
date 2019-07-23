$(document).ready(function () {

    console.log("Here We Go");

    getUSTjoblisitng();
    searchFilter();
    dropdown();
 
}); 

function getUSTjoblisitng() {
    var csvfile = './jobsample.csv';
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

    /*appending in dropdown****************************************************************************************************************************************/
              
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
             var number = 0;

            $.each(jsonformat, function (index, value){
            
                var locationFix = value['Campus : Location'].split('-');
                var loc=locationFix .pop()
                var LocDot = loc.split('.').join("");
            
                //console.log(LocDot);

                var lowercasePosiType  =  value['Position Title'].toLowerCase();
                var lowercaseEmpType =  value['Employment Type'].toLowerCase();
                var lowercaseLocType =  LocDot.toLowerCase();
            
    
                match = 0;
                
                if(lowercasePosiType.includes(userInput)){
                    match = 1;
                    
                }
                if(lowercaseEmpType.includes(userInput)){
                    match = 1;
                   
                }
                if(lowercaseLocType.includes(userInput)){
                    match = 1;
                   
                }
                console.log(value['Job URL (Linked)']);
                if (match ==1 && value['Job URL (Linked)'] != "" ){
                        //console.log(value['Job URL (Linked)']);
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
                    number = number+1;
                }  
                
            });

            if(number==0)
            {
                $('#Job').append('Try again')
            }
            
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
                   
                           // console.log(idx);
                        
                            if(val == ""){
                                filterConsidered.delete(idx);
                            }
                    
                        }); 
                        
            } 
        });
}     

function clearFilter(){
    $('#Job').empty();
    
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
               
                $('#location').val("");
                $('#department').val("");
                $('#employementType').val("");
                $('#searchInput').val("");
                getUSTjoblisitng(jsonformat);

            }
        });
}
