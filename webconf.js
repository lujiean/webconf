angular.module('demo', [])
.controller('ExampleCtrl', function($scope) {
    // $scope.what = "kk";
    // $scope.people = [
    //     {name:'Jon', age: 30, title: 'Developer'},
    //     {name:'Mike', age: 37, title: 'Manager'},
    //     {name:'Allen', age: 50, title: 'CEO'},
    //     {name:'', age: '', title: ''}
    //     ];
    $scope.model=[
        {type:'Jon', hb: '30', bdesc: 'Developer', ele: 'eleme1'},
        {type:'Mike', hb: '37', bdesc: 'Manager', ele: 'eleme2'},
        {type:'Allen', hb: '50', bdesc: 'CEO', ele: 'eleme3'},
        {type:'', hb: '', bdesc: '', ele: ''}
    ];
    // $scope.name=['Jon','Mike','Allen',null];
    // $scope.age=[30, 37, 50, null];
    // $scope.title=['Developer','Manager','CEO'];
    
    $scope.addPerson = function(){
      // if (isUndefinedOrNull($scope.name[index]))
      //   return;
      var m = {
        type: '',
        hb: '',
        bdesc: '',
        ele: ''
      };
  
      // $scope.people.pop();
      // $scope.people.push(person);
      // $scope.people.push({name:'', age: '', title: ''});
      // $scope.name.splice(1, 0, null);
      // $scope.age.splice(1, 0, null);
      // $scope.title.splice(1, 0, null);
      // $scope.model.splice($scope.model.length - 1, 0, null);
      $scope.model.push(m);
      // $scope.age.splice($scope.age.length - 1, 0, null);
      // $scope.title.splice($scope.title.length - 1, 0, null);
      
    }; 
    
    $scope.removePerson = function(index){
      $scope.model.splice(index, 1);
      // $scope.age.splice(index, 1);
      // $scope.title.splice(index, 1);
    };

    // $scope.updatePerson = function(index){
    //   var person = {
    //     name: $scope.name,
    //     age: $scope.age,
    //     title: $scope.title,
    // };
      // $scope.people[index] = person;
    // };

    // $scope.checkHide = function (index) {
      // if(!isUndefinedOrNull($scope.people[index].name))
    //   if(!isUndefinedOrNull($scope.name[index]))
    //     return true;
    //   else
    //     return false;
    // }
    // $scope.readfile = function () {
    //   var fso, ts, s ; 
    //   var ForReading = 1; 

    //   fso = new ActiveXObject("Scripting.FileSystemObject"); 
    //   // ts = fso.OpenTextFile("d:\\testfile.txt", ForReading); 
    //   ts = fso.OpenTextFile(".\\config.cfg", ForReading); 
    //   s = ts.ReadLine(); 
    //   document.getElementById("aa").innerHTML=s; 
    // }

    function readSingleFile(e) {
      var file = e.target.files[0];
      if (!file) {
          return;
      }
      var reader = new FileReader();
      reader.onload = function(e) {
          var contents = e.target.result;
          displayContents(contents);
      };
      reader.readAsText(file);
    }

    function displayContents(contents) {
        var element = document.getElementById('file-content');
        element.textContent = contents;
    }

    document.getElementById('file-input')
    .addEventListener('change', readSingleFile, false);

    //test my file
    $scope.filename="C:\\Users\\sqpz\\Documents\\Java\\webconf\\config.cfg";
    $scope.rf = function () {
      var element = document.getElementById('file-content');
      element.textContent = $scope.filename;
      readFileByFilePath($scope.filename);
    }

    function readFileByFilePath(f) {
      // var file = e.target.files[0];
      // if (!file) {
      //     return;
      // }

      // var blob = new Blob(byteArrays, { type: contentType });
      var blob = new Blob();
      var file = new File([blob], f, {type: "text", lastModified: Date.now()});

      // var file = new File(f);
      var reader = new FileReader();
      reader.onload = function(e) {
          var contents = e.target.result;
          displayContents(contents);
      };

      reader.readAsText(file);
    }
    //test my file
})

// function isUndefinedOrNull(a){
//   if (!a || typeof(a) == 'undefined' ){
//       return true;
//   } else {
//       return false;
//   }
// };