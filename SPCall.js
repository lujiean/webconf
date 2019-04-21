angular.module('SPCall', [])
// .controller('ExampleCtrl', function($scope) {
//     $scope.model=[
//         {type:'Jon', hb: '30', bdesc: 'Developer', ele: 'eleme1'},
//         {type:'Mike', hb: '37', bdesc: 'Manager', ele: 'eleme2'},
//         {type:'Allen', hb: '50', bdesc: 'CEO', ele: 'eleme3'},
//         {type:'', hb: '', bdesc: '', ele: ''}
//     ];
    
//     $scope.addPerson = function(){
//       var m = {
//         type: '',
//         hb: '',
//         bdesc: '',
//         ele: ''
//       };
//       $scope.model.push(m);
//     }; 
    
//     $scope.removePerson = function(index){
//       $scope.model.splice(index, 1);
//     };

//     function readSingleFile(e) {
//       var file = e.target.files[0];
//       if (!file) {
//           return;
//       }
//       var reader = new FileReader();
//       reader.onload = function(e) {
//           var contents = e.target.result;
//           displayContents(contents);
//       };
//       reader.readAsText(file);
//     }

//     function displayContents(contents) {
//         var element = document.getElementById('file-content');
//         element.textContent = contents;
//     }

//     document.getElementById('file-input')
//     .addEventListener('change', readSingleFile, false);

//     //test my file
//     $scope.filename="C:\\Users\\sqpz\\Documents\\Java\\webconf\\config.cfg";
//     $scope.rf = function () {
//       var element = document.getElementById('file-content');
//       element.textContent = $scope.filename;
//       readFileByFilePath($scope.filename);
//     }

//     function readFileByFilePath(f) {
//       // var file = e.target.files[0];
//       // if (!file) {
//       //     return;
//       // }

//       // var blob = new Blob(byteArrays, { type: contentType });
//       var blob = new Blob();
//       var file = new File([blob], f, {type: "text", lastModified: Date.now()});

//       // var file = new File(f);
//       var reader = new FileReader();
//       reader.onload = function(e) {
//           var contents = e.target.result;
//           displayContents(contents);
//       };

//       reader.readAsText(file);
//     }
//     //test my file
// })
.controller('SPCtrl', function($scope, $http) {

    // json format need match html
    // ng-repeat --> []
    // dirct use --> no []
    $scope.lsps = [{
        "name":"sp_test",
        "listOfColumns":
        [
            {
                "seq":1,
                "name":"pol_no",
                "def":1,
                "optional":false
                },
            {
                "seq":2,
                "name":"mvmt_no",
                "def":2,
                "optional":false
                },
            {
                "seq":3,
                "name":"is_bb_define",
                "def":1,
                "optional":true
            }
        ]
    }];

    $http.get('SPInput.json').
    then(function(response) {
        // $scope.greeting = response.data;
        $scope.sps = response.data;
    });

    $scope.SavedQueries=[
        // {seq: 1, sql: "test"}
    ];
    $scope.LOCs = [

    ];
    $scope.AddQuery = function () {
        // get sql
        var lsql = "call " + $scope.selectedSP.name + " (";
        for (i = 0; i < $scope.selectedSP.listOfColumns.length; i++) {
            var def = $scope.selectedSP.listOfColumns[i];
            var v = $scope.LOCs[i];
            if (def.define == "text")
                lsql = lsql + "'";
            
            if(isUndefinedOrNull(v) && def.define == "number")
                lsql = lsql + "null";
            else
                if (isUndefinedOrNull(v))
                    lsql = lsql;
                else
                    lsql = lsql + v;

            if (def.define == "text")
                lsql = lsql + "'";

            if(i < ($scope.selectedSP.listOfColumns.length - 1))
                lsql = lsql + ",";
        }
        lsql = lsql + ");";

        //save
        var sq = {
            seq: $scope.SavedQueries.length+1,
            sql: lsql
        };

        $scope.SavedQueries.push(sq);
        $scope.selectedQuery = sq;
    }

    $scope.DelQuerys = function () {
        $scope.SavedQueries.splice(0);
    }

    // $scope.LOC_VAL = "abc";
    //     return "abc"
    //   };

    // $scope.LOC_VAL = function(index){
    //     if(isUndefinedOrNull($scope.LOCs[index].val))
    //         return "null"
    //     else
    //         return $scope.LOCs[index].val;
    //   };

    // function checkDefine(d){
    //     var rtn_type = "";
    //     switch (d) {
    //         case 1:
    //         rtn_type = "text";
    //             break;
        
    //             case 2:
    //             rtn_type = "number";
    //         default:
    //             break;
    //     }
    //     return rtn_type;
    // }

    // function checkQuoteShow(d){
    //     if (d == "text"){
    //         return true;
    //     }else{
    //         return false;
    //     }
    // }

    // AddElement("text");

    // function AddElement(mytype){  
    //     var mytype,TemO=document.getElementById("add");  
    //     var newInput = document.createElement("input");   
    //     newInput.type=mytype;   
    //     newInput.name="input1";  
    //     TemO.appendChild(newInput);  
    //     var newline= document.createElement("br");//创建一个BR标签是为能够换行！  
    //     TemO.appendChild(newline);  
    //     }  
})

function isUndefinedOrNull(a){
  if (!a || typeof(a) == 'undefined' ){
      return true;
  } else {
      return false;
  }
};