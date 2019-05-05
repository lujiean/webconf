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

    $scope.copySelectData = $scope.sps;

    $http.get('SPInput.json').
    then(function(response) {
        // $scope.greeting = response.data;
        $scope.sps = response.data;
    });

    $scope.now = [];
    $scope.setNow = function (pidx,num) {
        $scope.now[pidx] = num;
    }

    $scope.SavedQueries=[
            {
                sp_name: "sp_test", 
                savedsqls: [
                    {seq: 1, sql: "test"},
                    {seq: 2, sql: "testsql2"}
                ]
            },
            {
                sp_name: "sp_test2", 
                savedsqls: [
                    {seq: 1, sql: "test"},
                    {seq: 2, sql: "testsql2"}
                ]
            }
    ];
    $scope.LOCs = [

    ];

    $scope.selectedSP = null;

    $scope.isColumnText = function (type) {
        if (type == "text"){
            return true;
        }
        return false;
    }
    $scope.isLastColumn = function (idx, length) {
        var max_idx = length - 1;
        if (idx == max_idx){
            return true;
        }
        return false;
    }

    $scope.AddQuery = function (idx) {
        // get sql
        // var lsql = "call " + $scope.selectedSP.name + " (";
        // for (i = 0; i < $scope.selectedSP.listOfColumns.length; i++) {
        //     var def = $scope.selectedSP.listOfColumns[i];
        //     var v = $scope.LOCs[i];
        //     if (def.define == "text")
        //         lsql = lsql + "'";
            
        //     if(isUndefinedOrNull(v) && def.define == "number")
        //         lsql = lsql + "null";
        //     else
        //         if (isUndefinedOrNull(v))
        //             lsql = lsql;
        //         else
        //             lsql = lsql + v;

        //     if (def.define == "text")
        //         lsql = lsql + "'";

        //     if(i < ($scope.selectedSP.listOfColumns.length - 1))
        //         lsql = lsql + ",";
        // }
        // lsql = lsql + ");";

        //save
        var sq = {
            seq: $scope.SavedQueries[idx].savedsqls.length+1,
            // sql: lsql
            sql: $scope.sp_dtl(idx)
        };

        $scope.SavedQueries[idx].savedsqls.push(sq);
        // $scope.selectedQuery = sq;
        $scope.now[idx] = $scope.SavedQueries[idx].savedsqls.length-1;
    }

    $scope.DelQuerys = function (idx) {
        $scope.SavedQueries[idx].savedsqls.splice(0);
    }

    // $scope.selectAction = function () {
    $scope.selectAction = function (idx) {
        // $scope.LOCs = [
        // ];
        // var ta=document.getElementById("t1"); 
        // var id="t[$index]"
        var id="tempID";
        var newID="t[" + idx + "]";
        var ta=document.getElementById(id);
        ta.setAttribute("rows",$scope.sps[idx].listOfColumns.length + 1);
        ta.setAttribute("id",newID);
    }
    // $scope.sp_dtl = set_sp_dtl();
    // $scope.sp_dtls = [{desc: "abc"}];
    $scope.sp_dtls = [
        
    ];
    $scope.setDTLText = function (idx) {
        // var sp_text = sp_dtl(idx);
        $scope.sp_dtls[idx] = $scope.sp_dtl(idx);
        // $scope.selectAction(idx);
    }
    $scope.sp_dtl = function (idx) {
    // function set_sp_dtl() {
        var f_sp = "";
        // if (isUndefinedOrNull($scope.selectedSP)){
        //     return f_sp;
        // }
        
        f_sp = "call " + $scope.sps[idx].name +"(" + "\n";
        for(i =0;i < $scope.sps[idx].listOfColumns.length;i++){
            var e = $scope.sps[idx].listOfColumns[i];
            if (e.define == "text"){
                f_sp = f_sp + "'";
            }
            if(e.define != "text" && isUndefinedOrNull($scope.SLCSP[idx].LOCs[i])){
                f_sp = f_sp + "null";
            } else if( !isUndefinedOrNull($scope.SLCSP[idx].LOCs[i])){
                f_sp = f_sp + $scope.SLCSP[idx].LOCs[i];
            }
            if (e.define == "text"){
                f_sp = f_sp + "'";
            }
            if(i < $scope.sps[idx].listOfColumns.length - 1){
                f_sp = f_sp + ",";
                f_sp = f_sp + "\n";
            }else{
                f_sp = f_sp + ");";
            }
        }
        
        return f_sp;
    };


    $scope.copyToClickBoard = function (idx) {
        // 文本框：<input type="text" id="text"/>
        var id = "t[" + idx + "]";
        var Url1=document.getElementById(id); 
        console.log(Url1.value);
        Url1.select(); //选择对象  
        var tag = document.execCommand("Copy"); //执行浏览器复制命令  
        if(tag){
            // alert("复制成功。")
            alert("Copy Successed.")
        };
    }

    $scope.searchTextInputClick = function () {
        if($scope.sps.length>1){
            $scope.showSelect = true;
        }
    };

    /**
     * 将下拉选的数据值赋值给文本框，并且隐藏下拉框
     */
    // $scope.selectOptionClick = function (selectValue) {
    //     //因为加了多选属性防止多选点击置空数组再加数据 //不加multiple多选属性不现实下拉范围
    //     $scope.selectedSPs = [];
    //     $scope.selectedSPs.push(selectValue);
    //     $scope.showSelect = false;  //下拉框隐藏
    //     $scope.selectedSP = $scope.selectedSPs[0];   //文本框中的值
        
    //     $scope.selectAction();
    // };
            /**
         * 获取的数据值与下拉选逐个比较，如果包含则放在临时变量副本，并用临时变量副本替换下拉选原先的数值，如果数据为空或找不到，就用初始下拉选项副本替换
         */
        // $scope.searchTextValueChange = function (searchTextValue) {
        //     if(searchTextValue === "" || searchTextValue === undefined){
        //         $scope.sps = $scope.copySelectData;
        //         return;
        //     }
        //     //正则匹配，不是中文不筛选数据
        //     if(new RegExp("[^\\u4E00-\\u9FA5]+").test(searchTextValue)){
        //         return;
        //     }
        //     var newData = [];  //创建一个临时下拉框副本
        //     angular.forEach($scope.sps, function (data) {
        //         if (data.indexOf(searchTextValue)>=0){
        //             newData.push(data);
        //         }
        //     });
        //     $scope.sps = newData; //newData中的数值赋值给$scope.selectData
        // };

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