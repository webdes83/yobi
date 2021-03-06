/**
 * Yobi, Project Hosting SW
 *
 * Copyright 2013 NAVER Corp.
 * http://yobi.io
 *
 * @Author Jihan Kim
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
(function(ns){

    var oNS = $yobi.createNamespace(ns);
    oNS.container[oNS.name] = function(htOptions){

        var htVar = {};
        var htElement = {};

        /**
         * initialize
         */
        function _init(htOptions){
            var htOpt = htOptions || {};
            _initVar(htOpt);
            _initElement(htOpt);
            _attachEvent();
        }

        /**
         * initialize variables
         */
        function _initVar(htOptions){
            htVar.rxPrjName = /^[0-9A-Za-z-_\.]+$/;
            htVar.aReservedWords = [".", "..", ".git"];
        }

        /**
         * initialize element variables
         */
        function _initElement(htOptions){
            // 프로젝트 설정 관련
            htElement.welForm = $("form#saveSetting");
            htElement.welInputLogo = $("#logoPath");
            htElement.welInputName = $("input#project-name");
            htElement.welBtnSave   = $("#save");
            htElement.welReviewerCount = $("#welReviewerCount");
        }

        /**
         * attach event handlers
         */
        function _attachEvent(){
            htElement.welInputLogo.change(_onChangeLogoPath);
            htElement.welBtnSave.click(_onClickBtnSave);

            if(htElement.welReviewerCount.data("value") === true) {
                htElement.welReviewerCount.show();
            }

            $(".reviewer-count-wrap").on("click", '[data-toggle="reviewer-count"]', _toggleReviewerCount);
        }

        function _toggleReviewerCount(){
            var sAction = $(this).data("action");
            htElement.welReviewerCount[sAction]();
        }

        function _onChangeLogoPath(){
            var welTarget = $(this);

            if($yobi.isImageFile(welTarget) === false){
                $yobi.showAlert(Messages("project.logo.alert"));
                welTarget.val('');
                return;
            }

            htElement.welForm.submit();
        }

        function _onClickBtnSave(){
            var sPrjName = htElement.welInputName.val();
            if(!htVar.rxPrjName.test(sPrjName)){
                $yobi.showAlert(Messages("project.name.alert"));
                return false;
            }
            if(htVar.aReservedWords.indexOf(sPrjName) >= 0){
                $yobi.showAlert(Messages("project.name.reserved.alert"));
                return false;
            }

            return true;
        }

        _init(htOptions);
    };

})("yobi.project.Setting");
