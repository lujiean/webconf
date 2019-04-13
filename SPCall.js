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
    $http.get('SPInput.json').
    then(function(response) {
        // $scope.greeting = response.data;
        $scope.sps = response.data;
    });
})
